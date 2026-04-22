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
exports.HrisAnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let HrisAnalyticsController = class HrisAnalyticsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAnalytics(req) {
        const tenantId = req.user.tenantId;
        const [counts, employees, payrolls, attendanceStats] = await Promise.all([
            this.prisma.$transaction([
                this.prisma.employee.count({ where: { tenantId, status: 'ACTIVE' } }),
                this.prisma.employee.count({ where: { tenantId, status: 'TERMINATED' } }),
                this.prisma.payrollRun.aggregate({
                    where: { tenantId, period: '2026-03' },
                    _sum: { grossPay: true }
                })
            ]),
            this.prisma.employee.findMany({
                where: { tenantId },
                select: { department: true, status: true }
            }),
            this.prisma.payrollRun.groupBy({
                by: ['period'],
                where: { tenantId },
                _sum: { grossPay: true },
                orderBy: { period: 'asc' },
                take: 6
            }),
            (() => {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return this.prisma.attendance.groupBy({
                    by: ['status'],
                    where: { tenantId, date: { gte: thirtyDaysAgo } },
                    _count: { _all: true }
                });
            })()
        ]);
        const activeCount = counts[0];
        const terminatedCount = counts[1];
        const totalPayroll = counts[2];
        const deptMap = {};
        employees.filter(e => e.status === 'ACTIVE').forEach(e => {
            const d = e.department || 'Unassigned';
            deptMap[d] = (deptMap[d] || 0) + 1;
        });
        return {
            metrics: {
                activeHeadcount: activeCount,
                terminatedCount: terminatedCount,
                turnoverRate: activeCount > 0 ? (terminatedCount / (activeCount + terminatedCount)) * 100 : 0,
                currentPayroll: Number(totalPayroll._sum.grossPay || 0),
                attendanceRate: 94.5,
            },
            deptDistribution: Object.entries(deptMap).map(([name, count]) => ({ name, count })),
            payrollTrend: payrolls.map(p => ({ period: p.period, amount: Number(p._sum.grossPay || 0) })),
            attendanceStats
        };
    }
};
exports.HrisAnalyticsController = HrisAnalyticsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HrisAnalyticsController.prototype, "getAnalytics", null);
exports.HrisAnalyticsController = HrisAnalyticsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/analytics'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HrisAnalyticsController);
//# sourceMappingURL=analytics.controller.js.map