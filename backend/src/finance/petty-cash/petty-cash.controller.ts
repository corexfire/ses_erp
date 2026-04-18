import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/petty-cash')
export class PettyCashController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('finance.pettyCash.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const user = req.user;
    const where: any = user.isSuperAdmin ? {} : { tenantId: user.tenantId! };
    if (status) where.status = status;

    const replenishment = await this.prisma.pettyCashReplenishment.findMany({
      where,
      include: { cashAccount: true },
      orderBy: { requestDate: 'desc' },
    });
    return { replenishment };
  }

  @Get(':id')
  @RequirePermissions('finance.pettyCash.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const user = req.user;
    const where = user.isSuperAdmin ? { id } : { id, tenantId: user.tenantId! };
    const replenishment = await this.prisma.pettyCashReplenishment.findFirst({
      where,
      include: { cashAccount: true },
    });
    return { replenishment };
  }

  @Post()
  @RequirePermissions('finance.pettyCash.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { cashAccountId: string; requestNo: string; requestDate: string; amount: number; notes?: string; referenceNo?: string }) {
    const replenishment = await this.prisma.pettyCashReplenishment.create({
      data: {
        tenantId: req.user.tenantId!,
        cashAccountId: body.cashAccountId,
        requestNo: body.requestNo,
        requestDate: new Date(body.requestDate),
        amount: body.amount,
        notes: body.notes,
        referenceNo: body.referenceNo,
        status: 'PENDING',
      },
      include: { cashAccount: true },
    });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'CREATE', entity: 'PettyCashReplenishment', entityId: replenishment.id, metadata: { replenishment } });
    return { replenishment };
  }

  @Post(':id/approve')
  @RequirePermissions('finance.pettyCash.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const user = req.user;
    const replenishment = await this.prisma.pettyCashReplenishment.findFirst({ where: { id, tenantId: user.tenantId! } });
    if (!replenishment) throw new Error('Replenishment not found');

    // Get CashAccount with COA mapping
    const cashAccount = await this.prisma.cashAccount.findUnique({ 
      where: { id: replenishment.cashAccountId },
      include: { coaAccount: true }
    });
    const coaCode = cashAccount?.coaAccount?.code || '111-002';

    // Create cash transaction to record the replenishment
    await this.prisma.cashTransaction.create({
      data: {
        tenantId: user.tenantId!,
        cashAccountId: replenishment.cashAccountId,
        transDate: new Date(),
        transType: 'DEBIT',
        description: `Petty Cash Replenishment - ${replenishment.requestNo}`,
        amount: replenishment.amount,
        reference: replenishment.requestNo,
        status: 'POSTED',
      },
    });

    // Update cash account balance
    await this.prisma.cashAccount.update({
      where: { id: replenishment.cashAccountId },
      data: { balance: { increment: replenishment.amount } },
    });

    // === AUTO-CREATE JOURNAL ENTRY (DEBIT=Kas, CREDIT=Income/Expense) ===
    const journalCount = await this.prisma.journalEntry.count({ where: { tenantId: user.tenantId! } });
    const entryNo = `JE-PC-${String(journalCount + 1).padStart(6, '0')}`;
    
    // Find default credit account (income/revenue)
    const creditCoa = await this.prisma.coaAccount.findFirst({
      where: { tenantId: user.tenantId!, code: { startsWith: '4-' } }
    });
    const creditCode = creditCoa?.code || '4-1100-00';

    const journalEntry = await this.prisma.journalEntry.create({
      data: {
        tenantId: user.tenantId!,
        entryNo,
        entryDate: new Date(),
        description: `PC Replenishment - ${replenishment.requestNo} (${replenishment.notes || 'Kas Kecil'})`,
        referenceNo: replenishment.requestNo,
        journalType: 'PETTY_CASH',
        totalDebit: replenishment.amount,
        totalCredit: replenishment.amount,
        status: 'POSTED',
        lines: {
          create: [
            {
              tenantId: user.tenantId!,
              lineNo: 1,
              accountCode: coaCode, // DEBIT Kas (CashAccount COA)
              description: `${cashAccount?.name || 'Kas'} - ${replenishment.requestNo}`,
              debit: replenishment.amount,
              credit: 0,
              referenceId: replenishment.id
            },
            {
              tenantId: user.tenantId!,
              lineNo: 2,
              accountCode: creditCode, // CREDIT Income
              description: replenishment.notes || 'Pendapatan Jasa',
              debit: 0,
              credit: replenishment.amount,
              referenceId: replenishment.id
            }
          ]
        }
      }
    });

    const updated = await this.prisma.pettyCashReplenishment.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    await this.audit.log({ tenantId: user.tenantId!, actorUserId: user.id, action: 'APPROVE', entity: 'PettyCashReplenishment', entityId: id, metadata: { replenishment: updated, journalEntryId: journalEntry.id } });
    return { replenishment: updated, journalEntry };
  }

  @Post(':id/reject')
  @RequirePermissions('finance.pettyCash.approve')
  async reject(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const updated = await this.prisma.pettyCashReplenishment.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'REJECT', entity: 'PettyCashReplenishment', entityId: id, metadata: { replenishment: updated } });
    return { replenishment: updated };
  }

  @Post(':id/delete')
  @RequirePermissions('finance.pettyCash.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.pettyCashReplenishment.deleteMany({ where: { id, tenantId: req.user.tenantId! } });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'DELETE', entity: 'PettyCashReplenishment', entityId: id, metadata: { id } });
    return { success: true };
  }
}