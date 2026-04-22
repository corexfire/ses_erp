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
exports.CrmMyWorkController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const crm_sla_1 = require("../shared/crm-sla");
const activityStatuses = ['OPEN', 'DONE', 'CANCELED'];
const isActivityStatus = (v) => activityStatuses.includes(v);
const ticketStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
const isTicketStatus = (v) => ticketStatuses.includes(v);
const dueFilters = ['all', 'today', 'overdue'];
const isDueFilter = (v) => dueFilters.includes(v);
let CrmMyWorkController = class CrmMyWorkController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async get(req, activitiesStatus, ticketsStatus, due) {
        const tenantId = req.user.tenantId;
        const userId = req.user.id;
        const activityStatusWhere = activitiesStatus && isActivityStatus(activitiesStatus)
            ? [activitiesStatus]
            : ['OPEN', 'DONE'];
        const ticketStatusWhere = ticketsStatus && isTicketStatus(ticketsStatus)
            ? [ticketsStatus]
            : ['OPEN', 'IN_PROGRESS'];
        const dueFilter = due && isDueFilter(due) ? due : 'all';
        const now = new Date();
        const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const dueWhere = dueFilter === 'today'
            ? { dueAt: { gte: startToday, lt: endToday } }
            : dueFilter === 'overdue'
                ? { dueAt: { lt: startToday } }
                : {};
        const [leads, opportunities, activities, tickets] = await Promise.all([
            this.prisma.lead.findMany({
                where: { tenantId, assignedToUserId: userId },
                orderBy: [{ createdAt: 'desc' }],
                include: { assignedTo: true },
                take: 100,
            }),
            this.prisma.opportunity.findMany({
                where: { tenantId, ownerUserId: userId },
                orderBy: [{ createdAt: 'desc' }],
                include: { lead: true, customer: true, owner: true },
                take: 100,
            }),
            this.prisma.salesActivity.findMany({
                where: {
                    tenantId,
                    assignedToId: userId,
                    status: { in: activityStatusWhere },
                    ...dueWhere,
                },
                orderBy: [{ createdAt: 'desc' }],
                include: {
                    lead: true,
                    customer: true,
                    opportunity: true,
                    assignedTo: true,
                },
                take: 100,
            }),
            this.prisma.serviceTicket.findMany({
                where: {
                    tenantId,
                    assignedToId: userId,
                    status: { in: ticketStatusWhere },
                },
                orderBy: [{ createdAt: 'desc' }],
                include: { customer: true, assignedTo: true },
                take: 100,
            }),
        ]);
        return {
            leads,
            opportunities,
            activities: activities.map((a) => ({
                ...a,
                isOverdue: (0, crm_sla_1.isActivityOverdue)({
                    now,
                    status: a.status,
                    dueAt: a.dueAt,
                }),
            })),
            tickets: tickets.map((t) => {
                const slaDueAt = (0, crm_sla_1.computeTicketSlaDueAt)(t.createdAt, t.priority);
                return {
                    ...t,
                    slaDueAt,
                    isOverdue: (0, crm_sla_1.isTicketOverdue)({
                        now,
                        status: t.status,
                        slaDueAt,
                    }),
                };
            }),
        };
    }
};
exports.CrmMyWorkController = CrmMyWorkController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.my_work.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('activitiesStatus')),
    __param(2, (0, common_1.Query)('ticketsStatus')),
    __param(3, (0, common_1.Query)('due')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CrmMyWorkController.prototype, "get", null);
exports.CrmMyWorkController = CrmMyWorkController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('crm/my-work'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CrmMyWorkController);
//# sourceMappingURL=crm-my-work.controller.js.map