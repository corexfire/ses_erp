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
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

const opportunityStages = [
  'QUALIFICATION',
  'PROPOSAL',
  'NEGOTIATION',
  'CLOSED_WON',
  'CLOSED_LOST',
] as const;
type OpportunityStage = (typeof opportunityStages)[number];
const isOpportunityStage = (v: string): v is OpportunityStage =>
  (opportunityStages as readonly string[]).includes(v);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('crm/opportunities')
export class OpportunitiesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('crm.opportunity.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('leadId') leadId?: string,
    @Query('customerId') customerId?: string,
    @Query('stage') stage?: string,
  ) {
    const opportunities = await this.prisma.opportunity.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(leadId ? { leadId } : {}),
        ...(customerId ? { customerId } : {}),
        ...(stage && isOpportunityStage(stage) ? { stage } : {}),
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { lead: true, customer: true, owner: true },
      take: 200,
    });
    return { opportunities };
  }

  @Get(':id')
  @RequirePermissions('crm.opportunity.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const opportunity = await this.prisma.opportunity.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        lead: true,
        customer: true,
        owner: true,
        activities: {
          include: { lead: true, customer: true, assignedTo: true },
          orderBy: [{ createdAt: 'desc' }],
        },
      },
    });
    if (!opportunity) throw new NotFoundException('Opportunity not found');
    return { opportunity };
  }

  @Post()
  @RequirePermissions('crm.opportunity.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateOpportunityDto,
  ) {
    if (body.leadId) {
      const lead = await this.prisma.lead.findFirst({
        where: { id: body.leadId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!lead) throw new NotFoundException('Lead not found');
    }

    if (body.customerId) {
      const customer = await this.prisma.customer.findFirst({
        where: { id: body.customerId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!customer) throw new NotFoundException('Customer not found');
    }

    const opportunity = await this.prisma.opportunity.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
        leadId: body.leadId,
        customerId: body.customerId,
        expectedValue: body.expectedValue,
        closeDate: body.closeDate ? new Date(body.closeDate) : undefined,
        ownerUserId: req.user.id,
        notes: body.notes,
      },
      include: { lead: true, customer: true, owner: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Opportunity',
      entityId: opportunity.id,
    });

    return { opportunity };
  }

  @Patch(':id')
  @RequirePermissions('crm.opportunity.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateOpportunityDto,
  ) {
    const exists = await this.prisma.opportunity.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Opportunity not found');

    if (body.leadId) {
      const lead = await this.prisma.lead.findFirst({
        where: { id: body.leadId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!lead) throw new NotFoundException('Lead not found');
    }

    if (body.customerId) {
      const customer = await this.prisma.customer.findFirst({
        where: { id: body.customerId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!customer) throw new NotFoundException('Customer not found');
    }

    const opportunity = await this.prisma.opportunity.update({
      where: { id },
      data: {
        name: body.name ?? undefined,
        stage: body.stage ?? undefined,
        expectedValue: body.expectedValue ?? undefined,
        leadId: body.leadId ?? undefined,
        customerId: body.customerId ?? undefined,
        closeDate: body.closeDate ? new Date(body.closeDate) : undefined,
        notes: body.notes ?? undefined,
      },
      include: { lead: true, customer: true, owner: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'Opportunity',
      entityId: opportunity.id,
    });

    return { opportunity };
  }

  @Patch(':id/assign')
  @RequirePermissions('crm.opportunity.assign')
  async assign(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: AssignUserDto,
  ) {
    const exists = await this.prisma.opportunity.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Opportunity not found');

    const userId = body.userId?.trim() || null;
    if (userId) {
      const assignee = await this.prisma.user.findFirst({
        where: { id: userId, tenantId: req.user.tenantId!, isActive: true },
        select: { id: true },
      });
      if (!assignee) throw new NotFoundException('User not found');
    }

    const opportunity = await this.prisma.opportunity.update({
      where: { id },
      data: { ownerUserId: userId },
      include: { lead: true, customer: true, owner: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'assign',
      entity: 'Opportunity',
      entityId: opportunity.id,
      metadata: { ownerUserId: userId },
    });

    return { opportunity };
  }
}
