import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics')
export class DashboardController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('dashboard')
  @RequirePermissions('logistics.dashboard.read')
  async getDashboard(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('date') date?: string,
  ) {
    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const tenantId = req.user.tenantId;

    const [doStatusCounts, tripStatusCounts, todayDeliveries, activeTrips, pendingPods] = await Promise.all([
      this.prisma.deliveryOrder.groupBy({
        by: ['status'],
        where: { tenantId },
        _count: { id: true },
      }),
      this.prisma.tripPlan.groupBy({
        by: ['status'],
        where: { tenantId },
        _count: { id: true },
      }),
      this.prisma.deliveryOrder.findMany({
        where: {
          tenantId,
          plannedShipDate: { gte: startOfDay, lte: endOfDay },
        },
        include: { customer: true, warehouse: true },
        orderBy: { plannedShipDate: 'asc' },
        take: 50,
      }),
      this.prisma.tripPlan.findMany({
        where: {
          tenantId,
          status: { in: ['DISPATCHED', 'IN_PROGRESS'] },
        },
        include: { vehicle: true, driver: true },
        take: 20,
      }),
      this.prisma.deliveryOrder.count({
        where: {
          tenantId,
          status: 'IN_TRANSIT',
          proofOfDelivery: null,
        },
      }),
    ]);

    const doStatusMap: Record<string, number> = {};
    for (const item of doStatusCounts) {
      doStatusMap[item.status] = item._count.id;
    }

    const tripStatusMap: Record<string, number> = {};
    for (const item of tripStatusCounts) {
      tripStatusMap[item.status] = item._count.id;
    }

    const totalDelivered = doStatusMap['DELIVERED'] || 0;
    const deliveredOnTime = await this.prisma.deliveryOrder.count({
      where: {
        tenantId,
        status: 'DELIVERED',
        actualDeliveredAt: { not: null },
      },
    });

    const otifRate = deliveredOnTime > 0 ? (totalDelivered / deliveredOnTime * 100).toFixed(1) : '0.0';

    const totalTrips = Object.values(tripStatusMap).reduce((a, b) => a + b, 0);
    const completedTrips = tripStatusMap['COMPLETED'] || 0;

    return {
      deliveryOrderStatusCount: doStatusMap,
      tripStatusCount: tripStatusMap,
      otifRate: parseFloat(otifRate),
      todayDeliveries: {
        count: todayDeliveries.length,
        items: todayDeliveries,
      },
      activeTrips: {
        count: activeTrips.length,
        items: activeTrips,
      },
      pendingPodCount: pendingPods,
      summary: {
        totalDo: Object.values(doStatusMap).reduce((a, b) => a + b, 0),
        pendingDo: (doStatusMap['DRAFT'] || 0) + (doStatusMap['PLANNED'] || 0) + (doStatusMap['RELEASED'] || 0),
        inTransitDo: doStatusMap['IN_TRANSIT'] || 0,
        deliveredDo: totalDelivered,
        failedDo: doStatusMap['FAILED'] || 0,
        totalTrips,
        completedTrips,
        activeTripsCount: activeTrips.length,
      },
    };
  }
}
