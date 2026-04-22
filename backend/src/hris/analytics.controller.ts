import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/analytics')
export class HrisAnalyticsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.employee.read')
  async getAnalytics(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;

    // 1. Concurrent Aggregations
    const [counts, employees, payrolls, attendanceStats] = await Promise.all([
      // Counts
      this.prisma.$transaction([
        this.prisma.employee.count({ where: { tenantId, status: 'ACTIVE' } }),
        this.prisma.employee.count({ where: { tenantId, status: 'TERMINATED' } }),
        this.prisma.payrollRun.aggregate({
          where: { tenantId, period: '2026-03' },
          _sum: { grossPay: true }
        })
      ]),
      // Dept Distribution
      this.prisma.employee.findMany({
        where: { tenantId },
        select: { department: true, status: true }
      }),
      // Payroll Trend
      this.prisma.payrollRun.groupBy({
        by: ['period'],
        where: { tenantId },
        _sum: { grossPay: true },
        orderBy: { period: 'asc' },
        take: 6
      }),
      // Attendance Stats
      (() => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return this.prisma.attendance.groupBy({
          by: ['status'],
          where: { tenantId, date: { gte: thirtyDaysAgo } },
          _count: { _all: true }
        });
      })()
    ]);

    const activeCount = counts[0];
    const terminatedCount = counts[1];
    const totalPayroll = counts[2];

    const deptMap: Record<string, number> = {};
    employees.filter(e => e.status === 'ACTIVE').forEach(e => {
        const d = e.department || 'Unassigned';
        deptMap[d] = (deptMap[d] || 0) + 1;
    });

    return {
      metrics: {
        activeHeadcount: activeCount,
        terminatedCount: terminatedCount,
        turnoverRate: activeCount > 0 ? (terminatedCount / (activeCount + terminatedCount)) * 100 : 0,
        currentPayroll: Number(totalPayroll._sum.grossPay || 0),
        attendanceRate: 94.5, 
      },
      deptDistribution: Object.entries(deptMap).map(([name, count]) => ({ name, count })),
      payrollTrend: payrolls.map(p => ({ period: p.period, amount: Number(p._sum.grossPay || 0) })),
      attendanceStats
    };
  }
}
