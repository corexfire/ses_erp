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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const assign_user_dto_1 = require("../shared/dto/assign-user.dto");
const crm_sla_1 = require("../shared/crm-sla");
const create_ticket_dto_1 = require("./dto/create-ticket.dto");
const update_ticket_dto_1 = require("./dto/update-ticket.dto");
const ticketStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
const isTicketStatus = (v) => ticketStatuses.includes(v);
let TicketsController = class TicketsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, customerId, status) {
        const tickets = await this.prisma.serviceTicket.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(customerId ? { customerId } : {}),
                ...(status && isTicketStatus(status) ? { status } : {}),
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { subject: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { customer: true, assignedTo: true },
            take: 200,
        });
        const now = new Date();
        return {
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
    async create(req, body) {
        const customer = await this.prisma.customer.findFirst({
            where: { id: body.customerId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        const ticket = await this.prisma.serviceTicket.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                customerId: body.customerId,
                subject: body.subject,
                priority: body.priority ?? 'MEDIUM',
                status: body.status ?? 'OPEN',
                assignedToId: req.user.id,
                notes: body.notes,
            },
            include: { customer: true, assignedTo: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'ServiceTicket',
            entityId: ticket.id,
        });
        const slaDueAt = (0, crm_sla_1.computeTicketSlaDueAt)(ticket.createdAt, ticket.priority);
        return {
            ticket: {
                ...ticket,
                slaDueAt,
                isOverdue: (0, crm_sla_1.isTicketOverdue)({
                    now: new Date(),
                    status: ticket.status,
                    slaDueAt,
                }),
            },
        };
    }
    async update(req, id, body) {
        const exists = await this.prisma.serviceTicket.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Ticket not found');
        const ticket = await this.prisma.serviceTicket.update({
            where: { id },
            data: {
                subject: body.subject ?? undefined,
                priority: body.priority ?? undefined,
                status: body.status ?? undefined,
                notes: body.notes ?? undefined,
            },
            include: { customer: true, assignedTo: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'ServiceTicket',
            entityId: ticket.id,
        });
        const slaDueAt = (0, crm_sla_1.computeTicketSlaDueAt)(ticket.createdAt, ticket.priority);
        return {
            ticket: {
                ...ticket,
                slaDueAt,
                isOverdue: (0, crm_sla_1.isTicketOverdue)({
                    now: new Date(),
                    status: ticket.status,
                    slaDueAt,
                }),
            },
        };
    }
    async assign(req, id, body) {
        const exists = await this.prisma.serviceTicket.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Ticket not found');
        const userId = body.userId?.trim() || null;
        if (userId) {
            const assignee = await this.prisma.user.findFirst({
                where: { id: userId, tenantId: req.user.tenantId, isActive: true },
                select: { id: true },
            });
            if (!assignee)
                throw new common_1.NotFoundException('User not found');
        }
        const ticket = await this.prisma.serviceTicket.update({
            where: { id },
            data: { assignedToId: userId },
            include: { customer: true, assignedTo: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'assign',
            entity: 'ServiceTicket',
            entityId: ticket.id,
            metadata: { assignedToId: userId },
        });
        const slaDueAt = (0, crm_sla_1.computeTicketSlaDueAt)(ticket.createdAt, ticket.priority);
        return {
            ticket: {
                ...ticket,
                slaDueAt,
                isOverdue: (0, crm_sla_1.isTicketOverdue)({
                    now: new Date(),
                    status: ticket.status,
                    slaDueAt,
                }),
            },
        };
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.ticket.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('customerId')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.ticket.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_ticket_dto_1.CreateTicketDto]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('crm.ticket.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_ticket_dto_1.UpdateTicketDto]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/assign'),
    (0, permissions_decorator_1.RequirePermissions)('crm.ticket.assign'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, assign_user_dto_1.AssignUserDto]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "assign", null);
exports.TicketsController = TicketsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('crm/tickets'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map