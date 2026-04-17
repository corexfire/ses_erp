"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReportsController = class ReportsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async balanceSheet(req, asOfDate) {
        const endDate = asOfDate ? new Date(asOfDate) : new Date();
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
        const balanceSheet = { assets: [], liabilities: [], equity: [] };
        let totalAssets = 0, totalLiabilities = 0, totalEquity = 0;
        for (const acc of accounts) {
            const debit = journalLines.filter(l => l.accountCode === acc.code).reduce((sum, l) => sum + Number(l.debit), 0);
            const credit = journalLines.filter(l => l.accountCode === acc.code).reduce((sum, l) => sum + Number(l.credit), 0);
            let balance = 0;
            if (acc.type === 'ASSET')
                balance = debit - credit;
            else if (acc.type === 'LIABILITY' || acc.type === 'EQUITY')
                balance = credit - debit;
            else if (acc.type === 'INCOME')
                balance = credit - debit;
            else if (acc.type === 'EXPENSE')
                balance = debit - credit;
            if (acc.type === 'ASSET') {
                totalAssets += balance;
                balanceSheet.assets.push({ code: acc.code, name: acc.name, balance });
            }
            else if (acc.type === 'LIABILITY') {
                totalLiabilities += balance;
                balanceSheet.liabilities.push({ code: acc.code, name: acc.name, balance });
            }
            else if (acc.type === 'EQUITY') {
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
    async profitLoss(req, startDate, endDate) {
        const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
        const end = endDate ? new Date(endDate) : new Date();
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
        const pl = { income: [], expenses: [], totalIncome: 0, totalExpenses: 0, netProfit: 0 };
        for (const acc of accounts) {
            const debit = journalLines.filter(l => l.accountCode === acc.code).reduce((sum, l) => sum + Number(l.debit), 0);
            const credit = journalLines.filter(l => l.accountCode === acc.code).reduce((sum, l) => sum + Number(l.credit), 0);
            if (acc.type === 'INCOME') {
                const amount = credit - debit;
                pl.income.push({ code: acc.code, name: acc.name, amount });
                pl.totalIncome += amount;
            }
            else if (acc.type === 'EXPENSE') {
                const amount = debit - credit;
                pl.expenses.push({ code: acc.code, name: acc.name, amount });
                pl.totalExpenses += amount;
            }
        }
        pl.netProfit = pl.totalIncome - pl.totalExpenses;
        pl.profitMargin = pl.totalIncome > 0 ? (pl.netProfit / pl.totalIncome) * 100 : 0;
        return { profitLoss: pl, startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
    }
    async trialBalance(req, asOfDate) {
        const endDate = asOfDate ? new Date(asOfDate) : new Date();
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
                if (['ASSET', 'EXPENSE'].includes(acc.type))
                    balance = debit - credit;
                else
                    balance = credit - debit;
                trialBalance.push({ code: acc.code, name: acc.name, type: acc.type, debit, credit, balance });
                totalDebit += debit;
                totalCredit += credit;
            }
        }
        return { trialBalance, totalDebit, totalCredit, asOfDate: endDate.toISOString().slice(0, 10) };
    }
    async agingReport(req, asOfDate, type) {
        const endDate = asOfDate ? new Date(asOfDate) : new Date();
        const agingData = [];
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
                if (daysOverdue <= 0)
                    continue;
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
                if (daysOverdue <= 0)
                    continue;
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
        const summary = {
            current: agingData.filter(d => d.bucket === 'CURRENT').reduce((s, d) => s + Number(d.amount), 0),
            days30: agingData.filter(d => d.bucket === '30_DAYS').reduce((s, d) => s + Number(d.amount), 0),
            days60: agingData.filter(d => d.bucket === '60_DAYS').reduce((s, d) => s + Number(d.amount), 0),
            over90: agingData.filter(d => d.bucket === 'OVER_90_DAYS').reduce((s, d) => s + Number(d.amount), 0),
        };
        summary.total = summary.current + summary.days30 + summary.days60 + summary.over90;
        return { agingData, summary, asOfDate: endDate.toISOString().slice(0, 10) };
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('balance-sheet'),
    (0, permissions_decorator_1.RequirePermissions)('finance.report.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('asOfDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "balanceSheet", null);
__decorate([
    (0, common_1.Get)('profit-loss'),
    (0, permissions_decorator_1.RequirePermissions)('finance.report.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "profitLoss", null);
__decorate([
    (0, common_1.Get)('trial-balance'),
    (0, permissions_decorator_1.RequirePermissions)('finance.report.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('asOfDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "trialBalance", null);
__decorate([
    (0, common_1.Get)('aging'),
    (0, permissions_decorator_1.RequirePermissions)('finance.report.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('asOfDate')),
    __param(2, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "agingReport", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/reports'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map