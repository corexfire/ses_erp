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
exports.OpportunitiesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const assign_user_dto_1 = require("../shared/dto/assign-user.dto");
const create_opportunity_dto_1 = require("./dto/create-opportunity.dto");
const update_opportunity_dto_1 = require("./dto/update-opportunity.dto");
const opportunityStages = [
    'QUALIFICATION',
    'PROPOSAL',
    'NEGOTIATION',
    'CLOSED_WON',
    'CLOSED_LOST',
];
const isOpportunityStage = (v) => opportunityStages.includes(v);
let OpportunitiesController = class OpportunitiesController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, leadId, customerId, stage) {
        const opportunities = await this.prisma.opportunity.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(leadId ? { leadId } : {}),
                ...(customerId ? { customerId } : {}),
                ...(stage && isOpportunityStage(stage) ? { stage } : {}),
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { name: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { lead: true, customer: true, owner: true },
            take: 200,
        });
        return { opportunities };
    }
    async get(req, id) {
        const opportunity = await this.prisma.opportunity.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                lead: true,
                customer: true,
                owner: true,
                activities: {
                    include: { lead: true, customer: true, assignedTo: true },
                    orderBy: [{ createdAt: 'desc' }],
                },
            },
        });
        if (!opportunity)
            throw new common_1.NotFoundException('Opportunity not found');
        return { opportunity };
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
        const opportunity = await this.prisma.opportunity.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                leadId: body.leadId,
                customerId: body.customerId,
                expectedValue: body.expectedValue,
                closeDate: body.closeDate ? new Date(body.closeDate) : undefined,
                ownerUserId: req.user.id,
                notes: body.notes,
            },
            include: { lead: true, customer: true, owner: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Opportunity',
            entityId: opportunity.id,
        });
        return { opportunity };
    }
    async update(req, id, body) {
        const exists = await this.prisma.opportunity.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Opportunity not found');
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
        const opportunity = await this.prisma.opportunity.update({
            where: { id },
            data: {
                name: body.name ?? undefined,
                stage: body.stage ?? undefined,
                expectedValue: body.expectedValue ?? undefined,
                leadId: body.leadId ?? undefined,
                customerId: body.customerId ?? undefined,
                closeDate: body.closeDate ? new Date(body.closeDate) : undefined,
                notes: body.notes ?? undefined,
            },
            include: { lead: true, customer: true, owner: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'Opportunity',
            entityId: opportunity.id,
        });
        return { opportunity };
    }
    async assign(req, id, body) {
        const exists = await this.prisma.opportunity.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Opportunity not found');
        const userId = body.userId?.trim() || null;
        if (userId) {
            const assignee = await this.prisma.user.findFirst({
                where: { id: userId, tenantId: req.user.tenantId, isActive: true },
                select: { id: true },
            });
            if (!assignee)
                throw new common_1.NotFoundException('User not found');
        }
        const opportunity = await this.prisma.opportunity.update({
            where: { id },
            data: { ownerUserId: userId },
            include: { lead: true, customer: true, owner: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'assign',
            entity: 'Opportunity',
            entityId: opportunity.id,
            metadata: { ownerUserId: userId },
        });
        return { opportunity };
    }
};
exports.OpportunitiesController = OpportunitiesController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.opportunity.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('leadId')),
    __param(3, (0, common_1.Query)('customerId')),
    __param(4, (0, common_1.Query)('stage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('crm.opportunity.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.opportunity.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_opportunity_dto_1.CreateOpportunityDto]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('crm.opportunity.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_opportunity_dto_1.UpdateOpportunityDto]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/assign'),
    (0, permissions_decorator_1.RequirePermissions)('crm.opportunity.assign'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, assign_user_dto_1.AssignUserDto]),
    __metadata("design:returntype", Promise)
], OpportunitiesController.prototype, "assign", null);
exports.OpportunitiesController = OpportunitiesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('crm/opportunities'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], OpportunitiesController);
//# sourceMappingURL=opportunities.controller.js.map