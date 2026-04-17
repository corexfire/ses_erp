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
exports.CrmDashboardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const crm_sla_1 = require("../shared/crm-sla");
let CrmDashboardController = class CrmDashboardController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async get(req) {
        const tenantId = req.user.tenantId;
        const now = new Date();
        const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const [leadCount, customerCount, opportunityCount, activityOpenCount, activityOverdueCount, ticketOpenCount, ticketOverdueCount, opportunitiesByStage, leadsByStatus, ticketsByStatus, upcomingActivities,] = await Promise.all([
            this.prisma.lead.count({ where: { tenantId } }),
            this.prisma.customer.count({ where: { tenantId, isActive: true } }),
            this.prisma.opportunity.count({ where: { tenantId } }),
            this.prisma.salesActivity.count({ where: { tenantId, status: 'OPEN' } }),
            this.prisma.salesActivity.count({
                where: { tenantId, status: 'OPEN', dueAt: { lt: startToday } },
            }),
            this.prisma.serviceTicket.count({
                where: { tenantId, status: { in: ['OPEN', 'IN_PROGRESS'] } },
            }),
            this.prisma.serviceTicket
                .findMany({
                where: { tenantId, status: { in: ['OPEN', 'IN_PROGRESS'] } },
                select: { createdAt: true, priority: true, status: true },
            })
                .then((tickets) => {
                let count = 0;
                for (const t of tickets) {
                    const slaDueAt = (0, crm_sla_1.computeTicketSlaDueAt)(t.createdAt, t.priority);
                    if ((0, crm_sla_1.isTicketOverdue)({ now, status: t.status, slaDueAt }))
                        count += 1;
                }
                return count;
            }),
            this.prisma.opportunity.groupBy({
                by: ['stage'],
                where: { tenantId },
                _count: { _all: true },
            }),
            this.prisma.lead.groupBy({
                by: ['status'],
                where: { tenantId },
                _count: { _all: true },
            }),
            this.prisma.serviceTicket.groupBy({
                by: ['status'],
                where: { tenantId },
                _count: { _all: true },
            }),
            this.prisma.salesActivity.findMany({
                where: { tenantId, status: 'OPEN', dueAt: { not: null } },
                orderBy: [{ dueAt: 'asc' }],
                include: { lead: true, customer: true, opportunity: true },
                take: 10,
            }),
        ]);
        return {
            summary: {
                leadCount,
                customerCount,
                opportunityCount,
                activityOpenCount,
                activityOverdueCount,
                ticketOpenCount,
                ticketOverdueCount,
            },
            distributions: {
                opportunitiesByStage: opportunitiesByStage.map((x) => ({
                    stage: x.stage,
                    count: x._count._all,
                })),
                leadsByStatus: leadsByStatus.map((x) => ({
                    status: x.status,
                    count: x._count._all,
                })),
                ticketsByStatus: ticketsByStatus.map((x) => ({
                    status: x.status,
                    count: x._count._all,
                })),
            },
            upcomingActivities,
        };
    }
};
exports.CrmDashboardController = CrmDashboardController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.dashboard.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrmDashboardController.prototype, "get", null);
exports.CrmDashboardController = CrmDashboardController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('crm/dashboard'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CrmDashboardController);
//# sourceMappingURL=crm-dashboard.controller.js.map