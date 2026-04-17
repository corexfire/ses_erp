import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/fiscal')
export class FiscalController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.fiscal.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const years = await this.prisma.fiscalYear.findMany({
      where: { tenantId: req.user.tenantId },
      include: { periods: { orderBy: [{ periodNo: 'asc' }] } },
    });
    return { fiscalYears: years };
  }

  @Post()
  @RequirePermissions('finance.fiscal.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { code: string; name: string; startDate: string; endDate: string }) {
    const year = await this.prisma.fiscalYear.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        isActive: true,
        periods: {
          create: Array.from({ length: 12 }, (_, i) => {
            const start = new Date(body.startDate);
            start.setMonth(start.getMonth() + i);
            const end = new Date(start);
            end.setMonth(end.getMonth() + 1);
            end.setDate(end.getDate() - 1);
            return {
              tenantId: req.user.tenantId,
              fiscalYearId: '',
              periodNo: i + 1,
              startDate: start,
              endDate: end,
              isOpen: true,
            };
          }),
        },
      },
      include: { periods: true },
    });
    return { fiscalYear: year };
  }

  @Post(':id/close')
  @RequirePermissions('finance.fiscal.close')
  async close(@Param('id') id: string) {
    const year = await this.prisma.fiscalYear.update({
      where: { id },
      data: { isClosed: true },
    });
    await this.prisma.accountingPeriod.updateMany({
      where: { fiscalYearId: id },
      data: { isOpen: false },
    });
    return { fiscalYear: year };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/periods')
export class PeriodController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.period.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const periods = await this.prisma.accountingPeriod.findMany({
      where: { tenantId: req.user.tenantId },
      include: { fiscalYear: true },
      orderBy: [{ startDate: 'desc' }],
    });
    return { periods };
  }

  @Post(':id/close')
  @RequirePermissions('finance.period.close')
  async close(@Param('id') id: string) {
    const period = await this.prisma.accountingPeriod.update({
      where: { id },
      data: { isOpen: false },
    });
    return { period };
  }

  @Post(':id/open')
  @RequirePermissions('finance.period.open')
  async open(@Param('id') id: string) {
    const period = await this.prisma.accountingPeriod.update({
      where: { id },
      data: { isOpen: true },
    });
    return { period };
  }
}