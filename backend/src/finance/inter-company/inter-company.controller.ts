import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/inter-company')
export class InterCompanyController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('finance.interCompany.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const user = req.user;
    const where: any = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
    if (status) where.status = status;

    const transactions = await this.prisma.interCompanyTransaction.findMany({
      where,
      orderBy: { transDate: 'desc' },
    });
    return { transactions };
  }

  @Get(':id')
  @RequirePermissions('finance.interCompany.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const user = req.user;
    const where = user.isSuperAdmin ? { id } : { id, tenantId: user.tenantId };
    const transaction = await this.prisma.interCompanyTransaction.findFirst({
      where,
    });
    return { transaction };
  }

  @Post()
  @RequirePermissions('finance.interCompany.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { transNo: string; transDate: string; fromCompanyId: string; toCompanyId: string; description?: string; referenceNo?: string; transactionType?: string; amount: number }) {
    const transaction = await this.prisma.interCompanyTransaction.create({
      data: {
        tenantId: req.user.tenantId,
        transNo: body.transNo,
        transDate: new Date(body.transDate),
        fromCompanyId: body.fromCompanyId,
        toCompanyId: body.toCompanyId,
        description: body.description,
        referenceNo: body.referenceNo,
        transactionType: body.transactionType || 'FUND_TRANSFER',
        amount: body.amount,
        status: 'PENDING',
      },
    });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'InterCompanyTransaction', entityId: transaction.id, metadata: { transaction } });
    return { transaction };
  }

  @Post(':id/approve')
  @RequirePermissions('finance.interCompany.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const user = req.user;
    const transaction = await this.prisma.interCompanyTransaction.findFirst({ where: { id, tenantId: user.tenantId } });
    if (!transaction) throw new Error('Transaction not found');

    const fromBranch = await this.prisma.branch.findUnique({ where: { id: transaction.fromCompanyId } });
    const toBranch = await this.prisma.branch.findUnique({ where: { id: transaction.toCompanyId } });
    const amount = Number(transaction.amount);

    const icReceivable = await this.prisma.coaAccount.findFirst({
      where: { tenantId: user.tenantId, code: { startsWith: '190' } }
    });
    const icPayable = await this.prisma.coaAccount.findFirst({
      where: { tenantId: user.tenantId, code: { startsWith: '290' } }
    });
    const fromCoa = icReceivable?.code || '190-000';
    const toCoa = icPayable?.code || '290-000';

    const journalCount = await this.prisma.journalEntry.count({ where: { tenantId: user.tenantId } });
    const entryNo = `JE-IC-${String(journalCount + 1).padStart(6, '0')}`;

    await this.prisma.journalEntry.create({
      data: {
        tenantId: user.tenantId,
        entryNo,
        entryDate: new Date(),
        description: `Inter-Company Transfer: ${fromBranch?.code || 'A'} -> ${toBranch?.code || 'B'} (${transaction.transactionType})`,
        referenceNo: transaction.transNo,
        journalType: 'INTER_COMPANY',
        totalDebit: amount,
        totalCredit: amount,
        status: 'POSTED',
        lines: {
          create: [
            {
              tenantId: user.tenantId,
              lineNo: 1,
              accountCode: fromCoa,
              description: `Piutang ke ${toBranch?.code || 'Branch tujuan'}`,
              debit: amount,
              credit: 0,
              referenceType: 'InterCompanyTransaction',
              referenceId: transaction.id
            },
            {
              tenantId: user.tenantId,
              lineNo: 2,
              accountCode: toCoa,
              description: `Hutang ke ${fromBranch?.code || 'Branch asal'}`,
              debit: 0,
              credit: amount,
              referenceType: 'InterCompanyTransaction',
              referenceId: transaction.id
            }
          ]
        }
      }
    });

    const updated = await this.prisma.interCompanyTransaction.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    await this.audit.log({ tenantId: user.tenantId, actorUserId: user.id, action: 'APPROVE', entity: 'InterCompanyTransaction', entityId: id, metadata: { transaction: updated } });
    return { transaction: updated };
  }

  @Post(':id/reject')
  @RequirePermissions('finance.interCompany.approve')
  async reject(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const updated = await this.prisma.interCompanyTransaction.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'REJECT', entity: 'InterCompanyTransaction', entityId: id, metadata: { transaction: updated } });
    return { transaction: updated };
  }

  @Post(':id/delete')
  @RequirePermissions('finance.interCompany.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.interCompanyTransaction.deleteMany({ where: { id, tenantId: req.user.tenantId } });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'InterCompanyTransaction', entityId: id, metadata: { id } });
    return { success: true };
  }
}