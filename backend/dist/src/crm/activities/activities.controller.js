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
exports.ActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const assign_user_dto_1 = require("../shared/dto/assign-user.dto");
const create_activity_dto_1 = require("./dto/create-activity.dto");
const update_activity_dto_1 = require("./dto/update-activity.dto");
const activityStatuses = ['OPEN', 'DONE', 'CANCELED'];
const isActivityStatus = (v) => activityStatuses.includes(v);
let ActivitiesController = class ActivitiesController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, leadId, customerId, opportunityId, status) {
        const activities = await this.prisma.salesActivity.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(leadId ? { leadId } : {}),
                ...(customerId ? { customerId } : {}),
                ...(opportunityId ? { opportunityId } : {}),
                ...(status && isActivityStatus(status) ? { status } : {}),
                ...(q
                    ? {
                        OR: [{ subject: { contains: q, mode: 'insensitive' } }],
                    }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: {
                lead: true,
                customer: true,
                opportunity: true,
                assignedTo: true,
            },
            take: 200,
        });
        return { activities };
    }
    async create(req, body) {
        if (body.leadId) {
            const lead = await this.prisma.lead.findFirst({
                where: { id: body.leadId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!lead)
                throw new common_1.NotFoundException('Lead not found');
        }
        if (body.customerId) {
            const customer = await this.prisma.customer.findFirst({
                where: { id: body.customerId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!customer)
                throw new common_1.NotFoundException('Customer not found');
        }
        if (body.opportunityId) {
            const opportunity = await this.prisma.opportunity.findFirst({
                where: { id: body.opportunityId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!opportunity)
                throw new common_1.NotFoundException('Opportunity not found');
        }
        const activity = await this.prisma.salesActivity.create({
            data: {
                tenantId: req.user.tenantId,
                type: body.type,
                subject: body.subject,
                dueAt: body.dueAt,
                status: body.status ?? 'OPEN',
                leadId: body.leadId,
                customerId: body.customerId,
                opportunityId: body.opportunityId,
                assignedToId: req.user.id,
                notes: body.notes,
            },
            include: {
                lead: true,
                customer: true,
                opportunity: true,
                assignedTo: true,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'SalesActivity',
            entityId: activity.id,
        });
        return { activity };
    }
    async update(req, id, body) {
        const exists = await this.prisma.salesActivity.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Activity not found');
        if (body.leadId) {
            const lead = await this.prisma.lead.findFirst({
                where: { id: body.leadId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!lead)
                throw new common_1.NotFoundException('Lead not found');
        }
        if (body.customerId) {
            const customer = await this.prisma.customer.findFirst({
                where: { id: body.customerId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!customer)
                throw new common_1.NotFoundException('Customer not found');
        }
        if (body.opportunityId) {
            const opportunity = await this.prisma.opportunity.findFirst({
                where: { id: body.opportunityId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!opportunity)
                throw new common_1.NotFoundException('Opportunity not found');
        }
        const activity = await this.prisma.salesActivity.update({
            where: { id },
            data: {
                type: body.type ?? undefined,
                subject: body.subject ?? undefined,
                dueAt: body.dueAt ?? undefined,
                status: body.status ?? undefined,
                leadId: body.leadId ?? undefined,
                customerId: body.customerId ?? undefined,
                opportunityId: body.opportunityId ?? undefined,
                notes: body.notes ?? undefined,
            },
            include: {
                lead: true,
                customer: true,
                opportunity: true,
                assignedTo: true,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'SalesActivity',
            entityId: activity.id,
        });
        return { activity };
    }
    async assign(req, id, body) {
        const exists = await this.prisma.salesActivity.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Activity not found');
        const userId = body.userId?.trim() || null;
        if (userId) {
            const assignee = await this.prisma.user.findFirst({
                where: { id: userId, tenantId: req.user.tenantId, isActive: true },
                select: { id: true },
            });
            if (!assignee)
                throw new common_1.NotFoundException('User not found');
        }
        const activity = await this.prisma.salesActivity.update({
            where: { id },
            data: { assignedToId: userId },
            include: {
                lead: true,
                customer: true,
                opportunity: true,
                assignedTo: true,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'assign',
            entity: 'SalesActivity',
            entityId: activity.id,
            metadata: { assignedToId: userId },
        });
        return { activity };
    }
};
exports.ActivitiesController = ActivitiesController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.activity.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('leadId')),
    __param(3, (0, common_1.Query)('customerId')),
    __param(4, (0, common_1.Query)('opportunityId')),
    __param(5, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.activity.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_activity_dto_1.CreateActivityDto]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('crm.activity.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_activity_dto_1.UpdateActivityDto]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/assign'),
    (0, permissions_decorator_1.RequirePermissions)('crm.activity.assign'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, assign_user_dto_1.AssignUserDto]),
    __metadata("design:returntype", Promise)
], ActivitiesController.prototype, "assign", null);
exports.ActivitiesController = ActivitiesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('crm/activities'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], ActivitiesController);
//# sourceMappingURL=activities.controller.js.map