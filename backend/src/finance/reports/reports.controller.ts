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

    const accounts = await this.prisma.coaAccount.findMany({
      where: { tenantId: req.user.tenantId, isActive: true, isPosting: true },
      orderBy: { code: 'asc' },
    });

    const entries = await this.prisma.journalEntry.findMany({
      where: { tenantId: req.user.tenantId, status: 'POSTED', entryDate: { gte: start, lte: end } },
      select: { id: true, entryNo: true, description: true, referenceNo: true, entryDate: true },
    });
    const entryMap = new Map(entries.map(e => [e.id, e]));
    const entryIds = [...entryMap.keys()];

    const lineWhere: any = { tenantId: req.user.tenantId, journalEntryId: { in: entryIds } };
    if (accountCode) lineWhere.accountCode = accountCode;

    const journalLines = await this.prisma.journalEntryLine.findMany({
      where: lineWhere,
      orderBy: { accountCode: 'asc' },
    });

    const ccIds = [...new Set(journalLines.filter(l => l.costCenterId).map(l => l.costCenterId))];
    const costCenters = await this.prisma.costCenter.findMany({
      where: { id: { in: ccIds } },
      select: { id: true, code: true, name: true },
    });
    const ccMap = new Map(costCenters.map(c => [c.id, c]));

    const gl: any = {};

    for (const line of journalLines) {
      const code = line.accountCode;
      if (!gl[code]) {
        const acc = accounts.find(a => a.code === code);
        gl[code] = {
          code,
          name: acc?.name || code,
          type: acc?.type || 'UNKNOWN',
          openingBalance: 0,
          transactions: [],
          closingBalance: 0,
        };
      }

      const debit = Number(line.debit || 0);
      const credit = Number(line.credit || 0);

      if (gl[code].transactions.length === 0) {
        const priorEntryIds = await this.prisma.journalEntry.findMany({
          where: { tenantId: req.user.tenantId, status: 'POSTED', entryDate: { lt: start } },
          select: { id: true },
        });
        const priorIds = priorEntryIds.map(e => e.id);
        const priorLines = await this.prisma.journalEntryLine.findMany({
          where: { tenantId: req.user.tenantId, accountCode: code, journalEntryId: { in: priorIds } },
        });
        const priorDebit = priorLines.reduce((s, l) => s + Number(l.debit || 0), 0);
        const priorCredit = priorLines.reduce((s, l) => s + Number(l.credit || 0), 0);
        const accType = gl[code].type;
        gl[code].openingBalance = accType === 'ASSET' || accType === 'EXPENSE' 
          ? priorDebit - priorCredit 
          : priorCredit - priorDebit;
      }

      const accType = gl[code].type;
      const change = accType === 'ASSET' || accType === 'EXPENSE' ? debit - credit : credit - debit;
      gl[code].closingBalance = gl[code].openingBalance + change;

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

      gl[code].openingBalance = gl[code].closingBalance;
    }

    return { generalLedger: Object.values(gl), startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
  }

  @Get('balance-sheet')
  @RequirePermissions('finance.report.read')
  async balanceSheet(@Req() req: FastifyRequest & { user: AuthUser }, @Query('asOfDate') asOfDate?: string) {
    const endDate = asOfDate ? new Date(asOfDate + 'T23:59:59.999') : new Date();

    const accounts = await this.prisma.coaAccount.findMany({
      where: { tenantId: req.user.tenantId, isActive: true, isPosting: true },
      orderBy: { code: 'asc' },
    });

    const ledgers = await this.prisma.stockLedger.findMany({
      where: {
        tenantId: req.user.tenantId,
        postingDate: { lte: endDate },
      },
    });

    const journalLines = await this.prisma.journalEntryLine.findMany({
      where: {
        tenantId: req.user.tenantId,
        journalEntry: { status: 'POSTED', entryDate: { lte: endDate } },
      },
    });

    const balanceSheet: any = { assets: [], liabilities: [], equity: [] };
    let totalAssets = 0, totalLiabilities = 0, totalEquity = 0;

    for (const acc of accounts) {
      const debit = journalLines.filter(l => l.accountCode === acc.code).reduce((sum, l) => sum + Number(l.debit), 0);
      const credit = journalLines.filter(l => l.accountCode === acc.code).reduce((sum, l) => sum + Number(l.credit), 0);

      let balance = 0;
      if (acc.type === 'ASSET') balance = debit - credit;
      else if (acc.type === 'LIABILITY' || acc.type === 'EQUITY') balance = credit - debit;
      else if (acc.type === 'INCOME') balance = credit - debit;
      else if (acc.type === 'EXPENSE') balance = debit - credit;

      if (acc.type === 'ASSET') {
        totalAssets += balance;
        balanceSheet.assets.push({ code: acc.code, name: acc.name, balance });
      } else if (acc.type === 'LIABILITY') {
        totalLiabilities += balance;
        balanceSheet.liabilities.push({ code: acc.code, name: acc.name, balance });
      } else if (acc.type === 'EQUITY') {
        totalEquity += balance;
        balanceSheet.equity.push({ code: acc.code, name: acc.name, balance });
      }
    }

    balanceSheet.totalAssets = totalAssets;
    balanceSheet.totalLiabilities = totalLiabilities;
    balanceSheet.totalEquity = totalEquity;
    balanceSheet.check = totalAssets === totalLiabilities + totalEquity;

    return { balanceSheet, asOfDate: endDate.toISOString().slice(0, 10) };
  }

  @Get('profit-loss')
  @RequirePermissions('finance.report.read')
  async profitLoss(@Req() req: FastifyRequest & { user: AuthUser }, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    const start = startDate ? new Date(startDate + 'T00:00:00.000') : new Date(new Date().getFullYear(), 0, 1);
    const end = endDate ? new Date(endDate + 'T23:59:59.999') : new Date();

    const accounts = await this.prisma.coaAccount.findMany({
      where: { tenantId: req.user.tenantId, isActive: true, isPosting: true },
      orderBy: { code: 'asc' },
    });

    const journalLines = await this.prisma.journalEntryLine.findMany({
      where: {
        tenantId: req.user.tenantId,
        journalEntry: { status: 'POSTED', entryDate: { gte: start, lte: end } },
      },
    });

    const pl: any = { income: [], expenses: [], totalIncome: 0, totalExpenses: 0, netProfit: 0 };

    for (const acc of accounts) {
      const debit = journalLines.filter(l => l.accountCode === acc.code).reduce((sum, l) => sum + Number(l.debit), 0);
      const credit = journalLines.filter(l => l.accountCode === acc.code).reduce((sum, l) => sum + Number(l.credit), 0);

      if (acc.type === 'INCOME') {
        const amount = credit - debit;
        pl.income.push({ code: acc.code, name: acc.name, amount });
        pl.totalIncome += amount;
      } else if (acc.type === 'EXPENSE') {
        const amount = debit - credit;
        pl.expenses.push({ code: acc.code, name: acc.name, amount });
        pl.totalExpenses += amount;
      }
    }

    pl.netProfit = pl.totalIncome - pl.totalExpenses;
    pl.profitMargin = pl.totalIncome > 0 ? (pl.netProfit / pl.totalIncome) * 100 : 0;

    return { profitLoss: pl, startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
  }

  @Get('trial-balance')
  @RequirePermissions('finance.report.read')
  async trialBalance(@Req() req: FastifyRequest & { user: AuthUser }, @Query('asOfDate') asOfDate?: string) {
    const endDate = asOfDate 
      ? new Date(asOfDate + 'T23:59:59.999') 
      : new Date();

    const accounts = await this.prisma.coaAccount.findMany({
      where: { tenantId: req.user.tenantId, isActive: true, isPosting: true },
      orderBy: { code: 'asc' },
    });

    const journalLines = await this.prisma.journalEntryLine.findMany({
      where: {
        tenantId: req.user.tenantId,
        journalEntry: { status: 'POSTED', entryDate: { lte: endDate } },
      },
    });

    const trialBalance = [];
    let totalDebit = 0, totalCredit = 0;

    for (const acc of accounts) {
      const debit = journalLines.filter(l => l.accountCode === acc.code).reduce((sum, l) => sum + Number(l.debit), 0);
      const credit = journalLines.filter(l => l.accountCode === acc.code).reduce((sum, l) => sum + Number(l.credit), 0);

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
        where: { tenantId: req.user.tenantId, status: { in: ['OPEN', 'OVERDUE'] } },
      });

      const customers = await this.prisma.customer.findMany({
        where: { tenantId: req.user.tenantId },
      });
      const customerMap = new Map(customers.map(c => [c.code, c]));

      for (const inv of invoices) {
        const dueDate = inv.dueDate || new Date(inv.invoiceDate);
        const daysOverdue = Math.floor((endDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysOverdue <= 0) continue;

        const customer = customerMap.get(inv.customerCode);
        agingData.push({
          type: 'AR',
          customerCode: inv.customerCode,
          customerName: customer?.name || '',
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
        where: { tenantId: req.user.tenantId, status: { in: ['OPEN', 'OVERDUE'] } },
      });

      const suppliers = await this.prisma.supplier.findMany({
        where: { tenantId: req.user.tenantId },
      });
      const supplierMap = new Map(suppliers.map(s => [s.code, s]));

      for (const inv of invoices) {
        const dueDate = inv.dueDate || new Date(inv.invoiceDate);
        const daysOverdue = Math.floor((endDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysOverdue <= 0) continue;

        const supplier = supplierMap.get(inv.supplierCode);
        agingData.push({
          type: 'AP',
          supplierCode: inv.supplierCode,
          supplierName: supplier?.name || '',
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