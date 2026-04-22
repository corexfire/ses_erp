import { Controller, Get, Query, Req, UseGuards, NotFoundException } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/reports')
export class ReportsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('general-ledger')
  @RequirePermissions('finance.report.read')
  async generalLedger(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('accountCode') accountCode?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const start = startDate ? new Date(startDate + 'T00:00:00.000') : new Date(new Date().getFullYear(), 0, 1);
    const end = endDate ? new Date(endDate + 'T23:59:59.999') : new Date();

    // 1. Get all relevant COA accounts
    const accounts = await this.prisma.coaAccount.findMany({
      where: { tenantId: req.user.tenantId!, isActive: true, isPosting: true },
      orderBy: { code: 'asc' },
    });

    // 2. Aggregate opening balances (balances before start date)
    const priorBalancesGrouped = await this.prisma.journalEntryLine.groupBy({
      by: ['accountCode'],
      where: {
        tenantId: req.user.tenantId!,
        journalEntry: { status: 'POSTED', entryDate: { lt: start } }
      },
      _sum: { debit: true, credit: true }
    });
    const priorMap = new Map(priorBalancesGrouped.map(l => [l.accountCode, l._sum]));

    // 3. Get transactions within period
    const entries = await this.prisma.journalEntry.findMany({
      where: { tenantId: req.user.tenantId!, status: 'POSTED', entryDate: { gte: start, lte: end } },
      select: { id: true, entryNo: true, description: true, referenceNo: true, entryDate: true },
    });
    const entryMap = new Map(entries.map(e => [e.id, e]));
    const entryIds = [...entryMap.keys()];

    const journalLines = await this.prisma.journalEntryLine.findMany({
      where: { tenantId: req.user.tenantId!, journalEntryId: { in: entryIds }, ...(accountCode ? { accountCode } : {}) },
      orderBy: { accountCode: 'asc' }
    });

    // 4. Get Cost Center names
    const ccIds = [...new Set(journalLines.filter(l => l.costCenterId).map(l => l.costCenterId!))];
    const ccMap = new Map((await this.prisma.costCenter.findMany({
      where: { id: { in: ccIds } }, select: { id: true, code: true, name: true }
    })).map(c => [c.id, c]));

    const gl: any = {};
    for (const acc of accounts) {
      if (accountCode && acc.code !== accountCode) continue;
      
      const sums = priorMap.get(acc.code) || { debit: 0, credit: 0 };
      const priorDebit = Number(sums.debit || 0);
      const priorCredit = Number(sums.credit || 0);
      
      let openingBalance = 0;
      if (['ASSET', 'EXPENSE'].includes(acc.type)) openingBalance = priorDebit - priorCredit;
      else openingBalance = priorCredit - priorDebit;

      gl[acc.code] = {
        code: acc.code,
        name: acc.name,
        type: acc.type,
        openingBalance,
        transactions: [],
        closingBalance: openingBalance
      };
    }

    for (const line of journalLines) {
      const code = line.accountCode;
      if (!gl[code]) continue;

      const debit = Number(line.debit || 0);
      const credit = Number(line.credit || 0);
      const accType = gl[code].type;
      const change = ['ASSET', 'EXPENSE'].includes(accType) ? debit - credit : credit - debit;
      
      gl[code].closingBalance += change;

      const entry = entryMap.get(line.journalEntryId);
      const cc = line.costCenterId ? ccMap.get(line.costCenterId) : null;

      gl[code].transactions.push({
        entryNo: entry?.entryNo,
        entryDate: entry?.entryDate,
        description: line.description || entry?.description,
        referenceNo: entry?.referenceNo,
        costCenter: cc ? `${cc.code} - ${cc.name}` : null,
        debit,
        credit,
        balance: gl[code].closingBalance,
      });
    }

    return { generalLedger: Object.values(gl).filter((acc: any) => acc.transactions.length > 0 || acc.openingBalance !== 0), startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
  }

  @Get('balance-sheet')
  @RequirePermissions('finance.report.read')
  async balanceSheet(@Req() req: FastifyRequest & { user: AuthUser }, @Query('asOfDate') asOfDate?: string) {
    const endDate = asOfDate ? new Date(asOfDate + 'T23:59:59.999') : new Date();

    const accounts = await this.prisma.coaAccount.findMany({
      where: { tenantId: req.user.tenantId!, isActive: true, isPosting: true, type: { in: ['ASSET', 'LIABILITY', 'EQUITY'] } },
      orderBy: { code: 'asc' },
    });

    const targetCodes = accounts.map(a => a.code);
    const linesGrouped = await this.prisma.journalEntryLine.groupBy({
      by: ['accountCode'],
      where: {
        tenantId: req.user.tenantId!,
        journalEntry: { status: 'POSTED', entryDate: { lte: endDate } },
        accountCode: { in: targetCodes }
      },
      _sum: { debit: true, credit: true }
    });

    const linesMap = new Map(linesGrouped.map(l => [l.accountCode, l._sum]));

    const balanceSheet: any = { assets: [], liabilities: [], equity: [] };
    let totalAssets = 0, totalLiabilities = 0, totalEquity = 0;

    for (const acc of accounts) {
      const sums = linesMap.get(acc.code) || { debit: 0, credit: 0 };
      const debit = Number(sums.debit || 0);
      const credit = Number(sums.credit || 0);

      let balance = 0;
      if (acc.type === 'ASSET') {
        balance = debit - credit;
        totalAssets += balance;
        balanceSheet.assets.push({ code: acc.code, name: acc.name, balance });
      } else if (acc.type === 'LIABILITY') {
        balance = credit - debit;
        totalLiabilities += balance;
        balanceSheet.liabilities.push({ code: acc.code, name: acc.name, balance });
      } else if (acc.type === 'EQUITY') {
        balance = credit - debit;
        totalEquity += balance;
        balanceSheet.equity.push({ code: acc.code, name: acc.name, balance });
      }
    }

    balanceSheet.totalAssets = totalAssets;
    balanceSheet.totalLiabilities = totalLiabilities;
    balanceSheet.totalEquity = totalEquity;
    balanceSheet.check = Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 0.01;

    return { balanceSheet, asOfDate: endDate.toISOString().slice(0, 10) };
  }

  @Get('profit-loss')
  @RequirePermissions('finance.report.read')
  async profitLoss(@Req() req: FastifyRequest & { user: AuthUser }, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    const start = startDate ? new Date(startDate + 'T00:00:00.000') : new Date(new Date().getFullYear(), 0, 1);
    const end = endDate ? new Date(endDate + 'T23:59:59.999') : new Date();

    const accounts = await this.prisma.coaAccount.findMany({
      where: { tenantId: req.user.tenantId!, isActive: true, isPosting: true, type: { in: ['INCOME', 'EXPENSE'] } },
      orderBy: { code: 'asc' },
    });

    const targetCodes = accounts.map(a => a.code);
    const linesGrouped = await this.prisma.journalEntryLine.groupBy({
      by: ['accountCode'],
      where: {
        tenantId: req.user.tenantId!,
        journalEntry: { status: 'POSTED', entryDate: { gte: start, lte: end } },
        accountCode: { in: targetCodes }
      },
      _sum: { debit: true, credit: true }
    });

    const linesMap = new Map(linesGrouped.map(l => [l.accountCode, l._sum]));

    const pl: any = { income: [], expenses: [], totalIncome: 0, totalExpenses: 0, netProfit: 0 };

    for (const acc of accounts) {
      const sums = linesMap.get(acc.code) || { debit: 0, credit: 0 };
      const debit = Number(sums.debit || 0);
      const credit = Number(sums.credit || 0);

      if (acc.type === 'INCOME') {
        const amount = credit - debit;
        if (amount !== 0) {
          pl.income.push({ code: acc.code, name: acc.name, amount });
          pl.totalIncome += amount;
        }
      } else if (acc.type === 'EXPENSE') {
        const amount = debit - credit;
        if (amount !== 0) {
          pl.expenses.push({ code: acc.code, name: acc.name, amount });
          pl.totalExpenses += amount;
        }
      }
    }

    pl.netProfit = pl.totalIncome - pl.totalExpenses;
    pl.profitMargin = pl.totalIncome > 0 ? (pl.netProfit / pl.totalIncome) * 100 : 0;

    return { profitLoss: pl, startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
  }

  @Get('trial-balance')
  @RequirePermissions('finance.report.read')
  async trialBalance(@Req() req: FastifyRequest & { user: AuthUser }, @Query('asOfDate') asOfDate?: string) {
    const endDate = asOfDate ? new Date(asOfDate + 'T23:59:59.999') : new Date();

    const accounts = await this.prisma.coaAccount.findMany({
      where: { tenantId: req.user.tenantId!, isActive: true, isPosting: true },
      orderBy: { code: 'asc' },
    });

    const linesGrouped = await this.prisma.journalEntryLine.groupBy({
      by: ['accountCode'],
      where: {
        tenantId: req.user.tenantId!,
        journalEntry: { status: 'POSTED', entryDate: { lte: endDate } }
      },
      _sum: { debit: true, credit: true }
    });
    const linesMap = new Map(linesGrouped.map(l => [l.accountCode, l._sum]));

    const trialBalance = [];
    let totalDebit = 0, totalCredit = 0;

    for (const acc of accounts) {
      const sums = linesMap.get(acc.code) || { debit: 0, credit: 0 };
      const debit = Number(sums.debit || 0);
      const credit = Number(sums.credit || 0);

      if (debit !== 0 || credit !== 0) {
        let balance = 0;
        if (['ASSET', 'EXPENSE'].includes(acc.type)) balance = debit - credit;
        else balance = credit - debit;

        trialBalance.push({ code: acc.code, name: acc.name, type: acc.type, debit, credit, balance });
        totalDebit += debit;
        totalCredit += credit;
      }
    }

    return { trialBalance, totalDebit, totalCredit, asOfDate: endDate.toISOString().slice(0, 10) };
  }

  @Get('aging')
  @RequirePermissions('finance.report.read')
  async agingReport(@Req() req: FastifyRequest & { user: AuthUser }, @Query('asOfDate') asOfDate?: string, @Query('type') type?: string) {
    const endDate = asOfDate ? new Date(asOfDate + 'T23:59:59.999') : new Date();

    const agingData: any[] = [];

    if (!type || type === 'AR') {
      const invoices = await this.prisma.customerInvoice.findMany({
        where: { tenantId: req.user.tenantId!, status: { in: ['OPEN', 'OVERDUE'] } },
        include: { customer: true }
      });

      for (const inv of invoices) {
        const dueDate = inv.dueDate || new Date(inv.invoiceDate);
        const daysOverdue = Math.floor((endDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysOverdue <= 0) continue;

        const customer = inv.customer;
        agingData.push({
          type: 'AR',
          customerId: inv.customerId,
          customerName: customer?.name || '',
          customerCode: customer?.code || '',
          invoiceNo: inv.invoiceNo,
          dueDate: inv.dueDate,
          amount: inv.totalAmount,
          daysOverdue,
          bucket: daysOverdue <= 30 ? 'CURRENT' : daysOverdue <= 60 ? '30_DAYS' : daysOverdue <= 90 ? '60_DAYS' : 'OVER_90_DAYS',
        });
      }
    }

    if (!type || type === 'AP') {
      const invoices = await this.prisma.supplierInvoice.findMany({
        where: { tenantId: req.user.tenantId!, status: { in: ['OPEN', 'OVERDUE'] } },
        include: { supplier: true }
      });

      for (const inv of invoices) {
        const dueDate = inv.dueDate || new Date(inv.invoiceDate);
        const daysOverdue = Math.floor((endDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysOverdue <= 0) continue;

        const supplier = inv.supplier;
        agingData.push({
          type: 'AP',
          supplierId: inv.supplierId,
          supplierName: supplier?.name || '',
          supplierCode: supplier?.code || '',
          invoiceNo: inv.invoiceNo,
          dueDate: inv.dueDate,
          amount: inv.totalAmount,
          daysOverdue,
          bucket: daysOverdue <= 30 ? 'CURRENT' : daysOverdue <= 60 ? '30_DAYS' : daysOverdue <= 90 ? '60_DAYS' : 'OVER_90_DAYS',
        });
      }
    }

    const summary: any = {
      current: agingData.filter(d => d.bucket === 'CURRENT').reduce((s, d) => s + Number(d.amount), 0),
      days30: agingData.filter(d => d.bucket === '30_DAYS').reduce((s, d) => s + Number(d.amount), 0),
      days60: agingData.filter(d => d.bucket === '60_DAYS').reduce((s, d) => s + Number(d.amount), 0),
      over90: agingData.filter(d => d.bucket === 'OVER_90_DAYS').reduce((s, d) => s + Number(d.amount), 0),
    };
    summary.total = summary.current + summary.days30 + summary.days60 + summary.over90;

    return { agingData, summary, asOfDate: endDate.toISOString().slice(0, 10) };
  }
}