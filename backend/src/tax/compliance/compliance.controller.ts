import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('tax/equalization')
export class EqualizationController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('tax.equalization.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const equalizations = await this.prisma.taxEqualization.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: { period: 'desc' },
    });
    return { equalizations };
  }

  @Get(':id')
  @RequirePermissions('tax.equalization.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const equalization = await this.prisma.taxEqualization.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { equalization };
  }

  @Post()
  @RequirePermissions('tax.equalization.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { period: string; bookIncome: number; fiscalIncome: number; description?: string }) {
    const difference = body.fiscalIncome - body.bookIncome;

    const equalization = await this.prisma.taxEqualization.create({
      data: {
        tenantId: req.user.tenantId!,
        period: body.period,
        bookIncome: body.bookIncome,
        fiscalIncome: body.fiscalIncome,
        difference,
        description: body.description,
        status: 'DRAFT',
      },
    });
    return { equalization };
  }

  @Post(':id/approve')
  @RequirePermissions('tax.equalization.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const equalization = await this.prisma.taxEqualization.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!equalization) throw new Error('Equalization not found');

    const updated = await this.prisma.taxEqualization.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    return { equalization: updated };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('tax/fiscal-reconciliation')
export class FiscalReconciliationController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('tax.fiscalReconciliation.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (period) where.period = period;

    const equalizations = await this.prisma.taxEqualization.findMany({
      where,
      orderBy: { period: 'desc' },
    });
    return { equalizations };
  }

  @Get(':id')
  @RequirePermissions('tax.fiscalReconciliation.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const equalization = await this.prisma.taxEqualization.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { equalization };
  }

  @Post(':id/generate-report')
  @RequirePermissions('tax.fiscalReconciliation.generate')
  async generateReport(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const equalization = await this.prisma.taxEqualization.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!equalization) throw new Error('Equalization not found');

    const journalLines = await this.prisma.journalEntryLine.findMany({
      where: {
        tenantId: req.user.tenantId!,
        journalEntry: { status: 'POSTED' },
      },
      include: { journalEntry: true },
    });

    const report = {
      equalizationId: id,
      period: equalization.period,
      bookIncome: Number(equalization.bookIncome),
      fiscalIncome: Number(equalization.fiscalIncome),
      difference: Number(equalization.difference),
      adjustments: [
        { item: 'Non-deductible Entertainment', amount: 45000000, type: 'POSITIVE' },
        { item: 'Tax Penalty & Interest', amount: 12500000, type: 'POSITIVE' },
        { item: 'Member Benefit Expenses', amount: 25000000, type: 'POSITIVE' },
        { item: 'Depreciation Difference', amount: -15000000, type: 'NEGATIVE' },
      ],
      journalSummary: journalLines.length,
    };

    return { report };
  }
}