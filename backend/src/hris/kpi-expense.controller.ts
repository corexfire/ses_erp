import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/kpi')
export class KpiController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.kpi.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (period) where.period = period;

    const evaluations = await this.prisma.kpiEvaluation.findMany({
      where,
      include: { employee: true },
      orderBy: [{ period: 'desc' }],
    });
    return { evaluations };
  }

  @Post()
  @RequirePermissions('hris.kpi.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { employeeId: string; period: string; score: number; grade?: string; comments?: string }) {
    const evaluation = await this.prisma.kpiEvaluation.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeId: body.employeeId,
        period: body.period,
        score: body.score,
        grade: body.grade,
        comments: body.comments,
        status: 'DRAFT',
      },
      include: { employee: true },
    });
    return { evaluation };
  }

  @Post(':id/approve')
  @RequirePermissions('hris.kpi.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const evaluation = await this.prisma.kpiEvaluation.update({
      where: { id },
      data: { status: 'APPROVED' },
      include: { employee: true },
    });
    return { evaluation };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/expense')
export class ExpenseController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.expense.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (status) where.status = status;

    const claims = await this.prisma.expenseClaim.findMany({
      where,
      include: { employee: true },
      orderBy: [{ claimDate: 'desc' }],
    });
    return { claims };
  }

  @Get(':id')
  @RequirePermissions('hris.expense.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const claim = await this.prisma.expenseClaim.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { employee: true },
    });
    return { claim };
  }

  @Post()
  @RequirePermissions('hris.expense.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { employeeId: string; claimNo: string; claimDate: string; amount: number; description?: string; category: string }) {
    const claim = await this.prisma.expenseClaim.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeId: body.employeeId,
        claimNo: body.claimNo,
        claimDate: new Date(body.claimDate),
        amount: body.amount,
        description: body.description,
        category: body.category,
        status: 'PENDING',
      },
      include: { employee: true },
    });
    return { claim };
  }

  @Post(':id/approve')
  @RequirePermissions('hris.expense.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const claim = await this.prisma.expenseClaim.update({
      where: { id },
      data: { status: 'APPROVED', approvedBy: req.user.id, approvedAt: new Date() },
      include: { employee: true },
    });
    return { claim };
  }

  @Post(':id/reject')
  @RequirePermissions('hris.expense.approve')
  async reject(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const claim = await this.prisma.expenseClaim.update({
      where: { id },
      data: { status: 'REJECTED', approvedBy: req.user.id, approvedAt: new Date() },
      include: { employee: true },
    });
    return { claim };
  }
}