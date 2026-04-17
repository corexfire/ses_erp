import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignUserDto } from '../shared/dto/assign-user.dto';
import { ConvertLeadDto } from './dto/convert-lead.dto';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

const leadStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'LOST', 'WON'] as const;
type LeadStatus = (typeof leadStatuses)[number];
const isLeadStatus = (v: string): v is LeadStatus =>
  (leadStatuses as readonly string[]).includes(v);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('crm/leads')
export class LeadsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('crm.lead.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('status') status?: string,
    @Query('assignedToUserId') assignedToUserId?: string,
  ) {
    const leads = await this.prisma.lead.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(status && isLeadStatus(status) ? { status } : {}),
        ...(assignedToUserId ? { assignedToUserId } : {}),
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
                { email: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { assignedTo: true },
      take: 200,
    });
    return { leads };
  }

  @Get(':id')
  @RequirePermissions('crm.lead.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const lead = await this.prisma.lead.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        assignedTo: true,
        opportunities: {
          include: { customer: true, owner: true },
          orderBy: [{ createdAt: 'desc' }],
        },
        activities: {
          include: { customer: true, opportunity: true, assignedTo: true },
          orderBy: [{ createdAt: 'desc' }],
        },
      },
    });
    if (!lead) throw new NotFoundException('Lead not found');
    return { lead };
  }

  @Post()
  @RequirePermissions('crm.lead.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateLeadDto,
  ) {
    const lead = await this.prisma.lead.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        email: body.email,
        phone: body.phone,
        source: body.source,
        notes: body.notes,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Lead',
      entityId: lead.id,
    });

    return { lead };
  }

  @Patch(':id')
  @RequirePermissions('crm.lead.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateLeadDto,
  ) {
    const exists = await this.prisma.lead.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Lead not found');

    const lead = await this.prisma.lead.update({
      where: { id },
      data: {
        name: body.name ?? undefined,
        email: body.email ?? undefined,
        phone: body.phone ?? undefined,
        source: body.source ?? undefined,
        notes: body.notes ?? undefined,
        status: body.status ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'Lead',
      entityId: lead.id,
    });

    return { lead };
  }

  @Post(':id/convert')
  @RequirePermissions('crm.lead.convert')
  async convert(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: ConvertLeadDto,
  ) {
    const lead = await this.prisma.lead.findFirst({
      where: { id, tenantId: req.user.tenantId },
    });
    if (!lead) throw new NotFoundException('Lead not found');

    const customer = await this.prisma.customer.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.customerCode ?? lead.code,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        countryCode: 'ID',
      },
    });

    await this.prisma.lead.update({
      where: { id: lead.id },
      data: { status: 'WON' },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'convert',
      entity: 'Lead',
      entityId: lead.id,
      metadata: { customerId: customer.id },
    });

    return { customer };
  }

  @Patch(':id/assign')
  @RequirePermissions('crm.lead.assign')
  async assign(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: AssignUserDto,
  ) {
    const exists = await this.prisma.lead.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Lead not found');

    const userId = body.userId?.trim() || null;
    if (userId) {
      const assignee = await this.prisma.user.findFirst({
        where: { id: userId, tenantId: req.user.tenantId, isActive: true },
        select: { id: true },
      });
      if (!assignee) throw new NotFoundException('User not found');
    }

    const lead = await this.prisma.lead.update({
      where: { id },
      data: { assignedToUserId: userId },
      include: { assignedTo: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'assign',
      entity: 'Lead',
      entityId: lead.id,
      metadata: { assignedToUserId: userId },
    });

    return { lead };
  }
}
