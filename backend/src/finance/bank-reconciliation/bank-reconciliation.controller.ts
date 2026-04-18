import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/bank-reconciliation')
export class BankReconciliationController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('finance.bankReconciliation.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('bankAccountId') bankAccountId?: string) {
    const user = req.user;
    const where: any = user.isSuperAdmin ? {} : { tenantId: user.tenantId! };
    if (bankAccountId) where.bankAccountId = bankAccountId;

    const reconciliations = await this.prisma.bankReconciliation.findMany({
      where,
      include: { bankAccount: true },
      orderBy: { reconcileDate: 'desc' },
    });
    return { reconciliations };
  }

  @Get(':id')
  @RequirePermissions('finance.bankReconciliation.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const user = req.user;
    const where = user.isSuperAdmin ? { id } : { id, tenantId: user.tenantId! };
    const reconciliation = await this.prisma.bankReconciliation.findFirst({
      where,
      include: { bankAccount: true },
    });
    return { reconciliation };
  }

  @Post()
  @RequirePermissions('finance.bankReconciliation.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { bankAccountId: string; reconcileDate: string; statementDate: string; statementBalance: number; bookBalance: number }) {
    const difference = body.statementBalance - body.bookBalance;
    const reconciliation = await this.prisma.bankReconciliation.create({
      data: {
        tenantId: req.user.tenantId!,
        bankAccountId: body.bankAccountId,
        reconcileDate: new Date(body.reconcileDate),
        statementDate: new Date(body.statementDate),
        statementBalance: body.statementBalance,
        bookBalance: body.bookBalance,
        difference,
        status: 'DRAFT',
      },
      include: { bankAccount: true },
    });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'CREATE', entity: 'BankReconciliation', entityId: reconciliation.id, metadata: { reconciliation } });
    return { reconciliation };
  }

  @Post(':id/approve')
  @RequirePermissions('finance.bankReconciliation.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const user = req.user;
    const reconciliation = await this.prisma.bankReconciliation.findFirst({ where: { id, tenantId: user.tenantId! } });
    if (!reconciliation) throw new Error('Reconciliation not found');

    const bankAccount = await this.prisma.bankAccount.findUnique({
      where: { id: reconciliation.bankAccountId },
      include: { coaAccount: true }
    });
    const coaCode = bankAccount?.coaAccount?.code || '111-101';
    const bankName = bankAccount?.name || 'Bank';

    const difference = Number(reconciliation.difference);
    const journalCount = await this.prisma.journalEntry.count({ where: { tenantId: user.tenantId! } });
    const entryNo = `JE-BR-${String(journalCount + 1).padStart(6, '0')}`;
    
    const creditCoa = await this.prisma.coaAccount.findFirst({
      where: { tenantId: user.tenantId!, code: { startsWith: '600' } }
    });
    const expenseCode = creditCoa?.code || '600-000';

    await this.prisma.journalEntry.create({
      data: {
        tenantId: user.tenantId!,
        entryNo,
        entryDate: new Date(),
        description: `Bank Reconciliation - ${bankName} (${reconciliation.reconcileDate?.toISOString().split('T')[0]})`,
        referenceNo: `BR-${id.slice(-6)}`,
        journalType: 'BANK_RECONCILIATION',
        totalDebit: Math.abs(difference),
        totalCredit: Math.abs(difference),
        status: 'POSTED',
        lines: {
          create: difference !== 0 ? [
            {
              tenantId: user.tenantId!,
              lineNo: 1,
              accountCode: coaCode,
              description: bankName,
              debit: difference > 0 ? Math.abs(difference) : 0,
              credit: difference < 0 ? Math.abs(difference) : 0,
              referenceId: reconciliation.id
            },
            {
              tenantId: user.tenantId!,
              lineNo: 2,
              accountCode: expenseCode,
              description: 'Bank Charges/Adjustment',
              debit: difference < 0 ? Math.abs(difference) : 0,
              credit: difference > 0 ? Math.abs(difference) : 0,
              referenceId: reconciliation.id
            }
          ] : [
            {
              tenantId: user.tenantId!,
              lineNo: 1,
              accountCode: coaCode,
              description: bankName,
              debit: 0,
              credit: 0,
              referenceId: reconciliation.id
            }
          ]
        }
      }
    });

    const updated = await this.prisma.bankReconciliation.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    await this.audit.log({ tenantId: user.tenantId!, actorUserId: user.id, action: 'APPROVE', entity: 'BankReconciliation', entityId: id, metadata: { reconciliation: updated } });
    return { reconciliation: updated };
  }

  @Post(':id/delete')
  @RequirePermissions('finance.bankReconciliation.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.bankReconciliation.deleteMany({ where: { id, tenantId: req.user.tenantId! } });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'DELETE', entity: 'BankReconciliation', entityId: id, metadata: { id } });
    return { success: true };
  }
}