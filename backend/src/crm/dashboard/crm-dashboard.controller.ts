import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { computeTicketSlaDueAt, isTicketOverdue } from '../shared/crm-sla';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('crm/dashboard')
export class CrmDashboardController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('crm.dashboard.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId;
    const now = new Date();
    const startToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const [
      leadCount,
      customerCount,
      opportunityCount,
      activityOpenCount,
      activityOverdueCount,
      ticketOpenCount,
      ticketOverdueCount,
      opportunitiesByStage,
      leadsByStatus,
      ticketsByStatus,
      upcomingActivities,
    ] = await Promise.all([
      this.prisma.lead.count({ where: { tenantId } }),
      this.prisma.customer.count({ where: { tenantId, isActive: true } }),
      this.prisma.opportunity.count({ where: { tenantId } }),
      this.prisma.salesActivity.count({ where: { tenantId, status: 'OPEN' } }),
      this.prisma.salesActivity.count({
        where: { tenantId, status: 'OPEN', dueAt: { lt: startToday } },
      }),
      this.prisma.serviceTicket.count({
        where: { tenantId, status: { in: ['OPEN', 'IN_PROGRESS'] } },
      }),
      this.prisma.serviceTicket
        .findMany({
          where: { tenantId, status: { in: ['OPEN', 'IN_PROGRESS'] } },
          select: { createdAt: true, priority: true, status: true },
        })
        .then((tickets) => {
          let count = 0;
          for (const t of tickets) {
            const slaDueAt = computeTicketSlaDueAt(t.createdAt, t.priority);
            if (isTicketOverdue({ now, status: t.status, slaDueAt }))
              count += 1;
          }
          return count;
        }),
      this.prisma.opportunity.groupBy({
        by: ['stage'],
        where: { tenantId },
        _count: { _all: true },
      }),
      this.prisma.lead.groupBy({
        by: ['status'],
        where: { tenantId },
        _count: { _all: true },
      }),
      this.prisma.serviceTicket.groupBy({
        by: ['status'],
        where: { tenantId },
        _count: { _all: true },
      }),
      this.prisma.salesActivity.findMany({
        where: { tenantId, status: 'OPEN', dueAt: { not: null } },
        orderBy: [{ dueAt: 'asc' }],
        include: { lead: true, customer: true, opportunity: true },
        take: 10,
      }),
    ]);

    return {
      summary: {
        leadCount,
        customerCount,
        opportunityCount,
        activityOpenCount,
        activityOverdueCount,
        ticketOpenCount,
        ticketOverdueCount,
      },
      distributions: {
        opportunitiesByStage: opportunitiesByStage.map((x) => ({
          stage: x.stage,
          count: x._count._all,
        })),
        leadsByStatus: leadsByStatus.map((x) => ({
          status: x.status,
          count: x._count._all,
        })),
        ticketsByStatus: ticketsByStatus.map((x) => ({
          status: x.status,
          count: x._count._all,
        })),
      },
      upcomingActivities,
    };
  }
}
