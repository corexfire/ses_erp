import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/bank')
export class BankController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.bank.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const accounts = await this.prisma.bankAccount.findMany({
      where: { tenantId: req.user.tenantId! },
      include: { transactions: { orderBy: [{ transDate: 'desc' }], take: 50 } },
    });
    return { accounts };
  }

  @Get(':id')
  @RequirePermissions('finance.bank.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const account = await this.prisma.bankAccount.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { transactions: { orderBy: [{ transDate: 'desc' }] } },
    });
    return { account };
  }

  @Post()
  @RequirePermissions('finance.bank.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { accountNo: string; name: string; bankName?: string; accountType?: string }) {
    const account = await this.prisma.bankAccount.create({
      data: {
        tenantId: req.user.tenantId!,
        accountNo: body.accountNo,
        name: body.name,
        bankName: body.bankName,
        accountType: body.accountType || 'CHECKING',
        balance: 0,
        isActive: true,
      },
    });
    return { account };
  }

  @Post(':id/transactions')
  @RequirePermissions('finance.bank.transaction')
  async addTransaction(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { transDate: string; transType: string; description: string; amount: number; reference?: string }) {
    const account = await this.prisma.bankAccount.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!account) throw new Error('Bank account not found');

    const trans = await this.prisma.bankTransaction.create({
      data: {
        tenantId: req.user.tenantId!,
        bankAccountId: id,
        transDate: new Date(body.transDate),
        transType: body.transType,
        description: body.description,
        amount: body.amount,
        reference: body.reference,
        status: 'POSTED',
      },
    });

    const newBalance = Number(account.balance) + body.amount;
    await this.prisma.bankAccount.update({ where: { id }, data: { balance: newBalance } });

    return { transaction: trans };
  }
}