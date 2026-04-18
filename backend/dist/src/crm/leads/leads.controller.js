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
exports.LeadsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const assign_user_dto_1 = require("../shared/dto/assign-user.dto");
const convert_lead_dto_1 = require("./dto/convert-lead.dto");
const create_lead_dto_1 = require("./dto/create-lead.dto");
const update_lead_dto_1 = require("./dto/update-lead.dto");
const leadStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'LOST', 'WON'];
const isLeadStatus = (v) => leadStatuses.includes(v);
let LeadsController = class LeadsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status, assignedToUserId) {
        const leads = await this.prisma.lead.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(status && isLeadStatus(status) ? { status } : {}),
                ...(assignedToUserId ? { assignedToUserId } : {}),
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { name: { contains: q, mode: 'insensitive' } },
                            { email: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { assignedTo: true },
            take: 200,
        });
        return { leads };
    }
    async get(req, id) {
        const lead = await this.prisma.lead.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                assignedTo: true,
                opportunities: {
                    include: { customer: true, owner: true },
                    orderBy: [{ createdAt: 'desc' }],
                },
                activities: {
                    include: { customer: true, opportunity: true, assignedTo: true },
                    orderBy: [{ createdAt: 'desc' }],
                },
            },
        });
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        return { lead };
    }
    async create(req, body) {
        const lead = await this.prisma.lead.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                email: body.email,
                phone: body.phone,
                source: body.source,
                notes: body.notes,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Lead',
            entityId: lead.id,
        });
        return { lead };
    }
    async update(req, id, body) {
        const exists = await this.prisma.lead.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Lead not found');
        const lead = await this.prisma.lead.update({
            where: { id },
            data: {
                name: body.name ?? undefined,
                email: body.email ?? undefined,
                phone: body.phone ?? undefined,
                source: body.source ?? undefined,
                notes: body.notes ?? undefined,
                status: body.status ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'Lead',
            entityId: lead.id,
        });
        return { lead };
    }
    async convert(req, id, body) {
        const lead = await this.prisma.lead.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        const customer = await this.prisma.customer.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.customerCode ?? lead.code,
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                countryCode: 'ID',
            },
        });
        await this.prisma.lead.update({
            where: { id: lead.id },
            data: { status: 'WON' },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'convert',
            entity: 'Lead',
            entityId: lead.id,
            metadata: { customerId: customer.id },
        });
        return { customer };
    }
    async assign(req, id, body) {
        const exists = await this.prisma.lead.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Lead not found');
        const userId = body.userId?.trim() || null;
        if (userId) {
            const assignee = await this.prisma.user.findFirst({
                where: { id: userId, tenantId: req.user.tenantId, isActive: true },
                select: { id: true },
            });
            if (!assignee)
                throw new common_1.NotFoundException('User not found');
        }
        const lead = await this.prisma.lead.update({
            where: { id },
            data: { assignedToUserId: userId },
            include: { assignedTo: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'assign',
            entity: 'Lead',
            entityId: lead.id,
            metadata: { assignedToUserId: userId },
        });
        return { lead };
    }
};
exports.LeadsController = LeadsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.lead.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('assignedToUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('crm.lead.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.lead.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_lead_dto_1.CreateLeadDto]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('crm.lead.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_lead_dto_1.UpdateLeadDto]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/convert'),
    (0, permissions_decorator_1.RequirePermissions)('crm.lead.convert'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, convert_lead_dto_1.ConvertLeadDto]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "convert", null);
__decorate([
    (0, common_1.Patch)(':id/assign'),
    (0, permissions_decorator_1.RequirePermissions)('crm.lead.assign'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, assign_user_dto_1.AssignUserDto]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "assign", null);
exports.LeadsController = LeadsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('crm/leads'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], LeadsController);
//# sourceMappingURL=leads.controller.js.map