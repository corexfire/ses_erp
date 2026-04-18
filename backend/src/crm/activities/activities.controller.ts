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
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

const activityStatuses = ['OPEN', 'DONE', 'CANCELED'] as const;
type ActivityStatus = (typeof activityStatuses)[number];
const isActivityStatus = (v: string): v is ActivityStatus =>
  (activityStatuses as readonly string[]).includes(v);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('crm/activities')
export class ActivitiesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('crm.activity.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('leadId') leadId?: string,
    @Query('customerId') customerId?: string,
    @Query('opportunityId') opportunityId?: string,
    @Query('status') status?: string,
  ) {
    const activities = await this.prisma.salesActivity.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(leadId ? { leadId } : {}),
        ...(customerId ? { customerId } : {}),
        ...(opportunityId ? { opportunityId } : {}),
        ...(status && isActivityStatus(status) ? { status } : {}),
        ...(q
          ? {
              OR: [{ subject: { contains: q, mode: 'insensitive' } }],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: {
        lead: true,
        customer: true,
        opportunity: true,
        assignedTo: true,
      },
      take: 200,
    });
    return { activities };
  }

  @Post()
  @RequirePermissions('crm.activity.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateActivityDto,
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

    if (body.opportunityId) {
      const opportunity = await this.prisma.opportunity.findFirst({
        where: { id: body.opportunityId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!opportunity) throw new NotFoundException('Opportunity not found');
    }

    const activity = await this.prisma.salesActivity.create({
      data: {
        tenantId: req.user.tenantId!,
        type: body.type,
        subject: body.subject,
        dueAt: body.dueAt,
        status: body.status ?? 'OPEN',
        leadId: body.leadId,
        customerId: body.customerId,
        opportunityId: body.opportunityId,
        assignedToId: req.user.id,
        notes: body.notes,
      },
      include: {
        lead: true,
        customer: true,
        opportunity: true,
        assignedTo: true,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'SalesActivity',
      entityId: activity.id,
    });

    return { activity };
  }

  @Patch(':id')
  @RequirePermissions('crm.activity.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateActivityDto,
  ) {
    const exists = await this.prisma.salesActivity.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Activity not found');

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

    if (body.opportunityId) {
      const opportunity = await this.prisma.opportunity.findFirst({
        where: { id: body.opportunityId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!opportunity) throw new NotFoundException('Opportunity not found');
    }

    const activity = await this.prisma.salesActivity.update({
      where: { id },
      data: {
        type: body.type ?? undefined,
        subject: body.subject ?? undefined,
        dueAt: body.dueAt ?? undefined,
        status: body.status ?? undefined,
        leadId: body.leadId ?? undefined,
        customerId: body.customerId ?? undefined,
        opportunityId: body.opportunityId ?? undefined,
        notes: body.notes ?? undefined,
      },
      include: {
        lead: true,
        customer: true,
        opportunity: true,
        assignedTo: true,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'SalesActivity',
      entityId: activity.id,
    });

    return { activity };
  }

  @Patch(':id/assign')
  @RequirePermissions('crm.activity.assign')
  async assign(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: AssignUserDto,
  ) {
    const exists = await this.prisma.salesActivity.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Activity not found');

    const userId = body.userId?.trim() || null;
    if (userId) {
      const assignee = await this.prisma.user.findFirst({
        where: { id: userId, tenantId: req.user.tenantId!, isActive: true },
        select: { id: true },
      });
      if (!assignee) throw new NotFoundException('User not found');
    }

    const activity = await this.prisma.salesActivity.update({
      where: { id },
      data: { assignedToId: userId },
      include: {
        lead: true,
        customer: true,
        opportunity: true,
        assignedTo: true,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'assign',
      entity: 'SalesActivity',
      entityId: activity.id,
      metadata: { assignedToId: userId },
    });

    return { activity };
  }
}
