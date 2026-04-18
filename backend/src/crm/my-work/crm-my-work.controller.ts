import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import {
  computeTicketSlaDueAt,
  isActivityOverdue,
  isTicketOverdue,
} from '../shared/crm-sla';

const activityStatuses = ['OPEN', 'DONE', 'CANCELED'] as const;
type ActivityStatus = (typeof activityStatuses)[number];
const isActivityStatus = (v: string): v is ActivityStatus =>
  (activityStatuses as readonly string[]).includes(v);

const ticketStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;
type TicketStatus = (typeof ticketStatuses)[number];
const isTicketStatus = (v: string): v is TicketStatus =>
  (ticketStatuses as readonly string[]).includes(v);

const dueFilters = ['all', 'today', 'overdue'] as const;
type DueFilter = (typeof dueFilters)[number];
const isDueFilter = (v: string): v is DueFilter =>
  (dueFilters as readonly string[]).includes(v);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('crm/my-work')
export class CrmMyWorkController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('crm.my_work.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('activitiesStatus') activitiesStatus?: string,
    @Query('ticketsStatus') ticketsStatus?: string,
    @Query('due') due?: string,
  ) {
    const tenantId = req.user.tenantId!;
    const userId = req.user.id;

    const activityStatusWhere: ActivityStatus[] =
      activitiesStatus && isActivityStatus(activitiesStatus)
        ? [activitiesStatus]
        : ['OPEN', 'DONE'];

    const ticketStatusWhere: TicketStatus[] =
      ticketsStatus && isTicketStatus(ticketsStatus)
        ? [ticketsStatus]
        : ['OPEN', 'IN_PROGRESS'];

    const dueFilter: DueFilter = due && isDueFilter(due) ? due : 'all';
    const now = new Date();
    const startToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const endToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );

    const dueWhere =
      dueFilter === 'today'
        ? { dueAt: { gte: startToday, lt: endToday } }
        : dueFilter === 'overdue'
          ? { dueAt: { lt: startToday } }
          : {};

    const [leads, opportunities, activities, tickets] = await Promise.all([
      this.prisma.lead.findMany({
        where: { tenantId, assignedToUserId: userId },
        orderBy: [{ createdAt: 'desc' }],
        include: { assignedTo: true },
        take: 100,
      }),
      this.prisma.opportunity.findMany({
        where: { tenantId, ownerUserId: userId },
        orderBy: [{ createdAt: 'desc' }],
        include: { lead: true, customer: true, owner: true },
        take: 100,
      }),
      this.prisma.salesActivity.findMany({
        where: {
          tenantId,
          assignedToId: userId,
          status: { in: activityStatusWhere },
          ...dueWhere,
        },
        orderBy: [{ createdAt: 'desc' }],
        include: {
          lead: true,
          customer: true,
          opportunity: true,
          assignedTo: true,
        },
        take: 100,
      }),
      this.prisma.serviceTicket.findMany({
        where: {
          tenantId,
          assignedToId: userId,
          status: { in: ticketStatusWhere },
        },
        orderBy: [{ createdAt: 'desc' }],
        include: { customer: true, assignedTo: true },
        take: 100,
      }),
    ]);

    return {
      leads,
      opportunities,
      activities: activities.map((a) => ({
        ...a,
        isOverdue: isActivityOverdue({
          now,
          status: a.status,
          dueAt: a.dueAt,
        }),
      })),
      tickets: tickets.map((t) => {
        const slaDueAt = computeTicketSlaDueAt(t.createdAt, t.priority);
        return {
          ...t,
          slaDueAt,
          isOverdue: isTicketOverdue({
            now,
            status: t.status,
            slaDueAt,
          }),
        };
      }),
    };
  }
}
