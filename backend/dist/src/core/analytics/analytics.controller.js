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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let AnalyticsController = class AnalyticsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getExecutiveSummary(req) {
        const tenantId = req.user.tenantId;
        const [incomeAccs, expenseAccs] = await Promise.all([
            this.prisma.coaAccount.findMany({ where: { tenantId, type: 'INCOME', isPosting: true }, select: { code: true } }),
            this.prisma.coaAccount.findMany({ where: { tenantId, type: 'EXPENSE', isPosting: true }, select: { code: true } }),
        ]);
        const incomeCodes = incomeAccs.map(a => a.code);
        const expenseCodes = expenseAccs.map(a => a.code);
        const [incomeLines, expenseLines] = await Promise.all([
            this.prisma.journalEntryLine.findMany({
                where: { tenantId, accountCode: { in: incomeCodes }, journalEntry: { status: 'POSTED' } },
                select: { debit: true, credit: true }
            }),
            this.prisma.journalEntryLine.findMany({
                where: { tenantId, accountCode: { in: expenseCodes }, journalEntry: { status: 'POSTED' } },
                select: { debit: true, credit: true }
            })
        ]);
        const totalRevenue = incomeLines.reduce((sum, l) => sum + (Number(l.credit) - Number(l.debit)), 0);
        const totalExpenses = expenseLines.reduce((sum, l) => sum + (Number(l.debit) - Number(l.credit)), 0);
        const netProfit = totalRevenue - totalExpenses;
        const [activeProjects, opportunityPipeline, serviceOrderOpen, complianceScoreRes, sustainabilityPulseRes] = await Promise.all([
            this.prisma.project.count({ where: { tenantId, status: 'ACTIVE' } }),
            this.prisma.opportunity.aggregate({ where: { tenantId }, _sum: { expectedValue: true } }),
            this.prisma.fsmServiceOrder.count({ where: { tenantId, status: { in: ['SUBMITTED', 'PENDING_SCHEDULE', 'SCHEDULED', 'IN_PROGRESS'] } } }),
            this.prisma.supportKpi.aggregate({
                where: { tenantId, code: 'COMPLIANCE_HEALTH' },
                _avg: { actualValue: true }
            }),
            this.prisma.supportSustainability.aggregate({
                where: { tenantId, type: 'EMISSION' },
                _sum: { value: true }
            })
        ]);
        const revenueTrend = [
            { period: 'Jan', value: totalRevenue * 0.8 },
            { period: 'Feb', value: totalRevenue * 0.85 },
            { period: 'Mar', value: totalRevenue * 0.95 },
            { period: 'Apr', value: totalRevenue }
        ];
        return {
            financials: {
                totalRevenue,
                totalExpenses,
                netProfit,
                profitMargin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0
            },
            operations: {
                activeProjects,
                pipelineValue: opportunityPipeline._sum.expectedValue || 0,
                inventoryValuation: 0,
                openServiceOrders: serviceOrderOpen,
            },
            governance: {
                complianceScore: complianceScoreRes?._avg?.actualValue || 0,
                carbonFootprint: sustainabilityPulseRes?._sum?.value || 0,
            },
            trends: {
                revenue: revenueTrend
            }
        };
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('executive-summary'),
    (0, permissions_decorator_1.RequirePermissions)('core.analytics.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getExecutiveSummary", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('core/analytics'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map