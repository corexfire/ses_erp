import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/budget')
export class BudgetController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('finance.budget.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('fiscalYear') fiscalYear?: number) {
    const where: any = { tenantId: req.user.tenantId! };
    if (fiscalYear) where.fiscalYear = fiscalYear;

    const budgets = await this.prisma.budget.findMany({
      where,
      include: { costCenter: true },
      orderBy: { fiscalYear: 'desc' },
    });
    return { budgets };
  }

  @Get(':id')
  @RequirePermissions('finance.budget.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const budget = await this.prisma.budget.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { costCenter: true },
    });
    return { budget };
  }

  @Post()
  @RequirePermissions('finance.budget.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { budgetNo: string; fiscalYear: number; periodNo?: number; accountCode: string; costCenterId?: string; amount: number }) {
    const budget = await this.prisma.budget.create({
      data: {
        tenantId: req.user.tenantId!,
        budgetNo: body.budgetNo,
        fiscalYear: body.fiscalYear,
        periodNo: body.periodNo,
        accountCode: body.accountCode,
        costCenterId: body.costCenterId,
        amount: body.amount,
        spentAmount: 0,
        status: 'DRAFT',
      },
      include: { costCenter: true },
    });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'CREATE', entity: 'Budget', entityId: budget.id, metadata: { budget } });
    return { budget };
  }

  @Post(':id/approve')
  @RequirePermissions('finance.budget.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const budget = await this.prisma.budget.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!budget) throw new Error('Budget not found');

    const updated = await this.prisma.budget.update({
      where: { id },
      data: { status: 'APPROVED' },
      include: { costCenter: true },
    });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'APPROVE', entity: 'Budget', entityId: id, metadata: { budget: updated } });
    return { budget: updated };
  }

  @Post(':id')
  @RequirePermissions('finance.budget.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { amount?: number; accountCode?: string }) {
    const budget = await this.prisma.budget.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!budget) throw new Error('Budget not found');

    const updated = await this.prisma.budget.update({
      where: { id },
      data: {
        ...(body.amount !== undefined && { amount: body.amount }),
        ...(body.accountCode && { accountCode: body.accountCode }),
      },
      include: { costCenter: true },
    });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'UPDATE', entity: 'Budget', entityId: id, metadata: { budget: updated } });
    return { budget: updated };
  }

  @Post(':id/delete')
  @RequirePermissions('finance.budget.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.budget.deleteMany({ where: { id, tenantId: req.user.tenantId! } });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'DELETE', entity: 'Budget', entityId: id, metadata: { id } });
    return { success: true };
  }
}