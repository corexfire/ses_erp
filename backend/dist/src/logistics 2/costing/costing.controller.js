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
exports.CostingController = exports.UpdateTripCostDto = exports.CreateTripCostDto = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const tripCostStatusSet = new Set(['DRAFT', 'SUBMITTED', 'APPROVED', 'POSTED', 'VOID']);
const isTripCostStatus = (value) => Boolean(value) && tripCostStatusSet.has(value);
class CreateTripCostDto {
    tripPlanId;
    costType;
    description;
    amount;
    currencyCode;
    supplierId;
    notes;
}
exports.CreateTripCostDto = CreateTripCostDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTripCostDto.prototype, "tripPlanId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['FUEL', 'TOLL', 'PARKING', 'MEAL', 'REPAIR', 'OTHER']),
    __metadata("design:type", String)
], CreateTripCostDto.prototype, "costType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTripCostDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateTripCostDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTripCostDto.prototype, "currencyCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTripCostDto.prototype, "supplierId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTripCostDto.prototype, "notes", void 0);
class UpdateTripCostDto {
    costType;
    description;
    amount;
    notes;
}
exports.UpdateTripCostDto = UpdateTripCostDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['FUEL', 'TOLL', 'PARKING', 'MEAL', 'REPAIR', 'OTHER']),
    __metadata("design:type", String)
], UpdateTripCostDto.prototype, "costType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTripCostDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateTripCostDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTripCostDto.prototype, "notes", void 0);
let CostingController = class CostingController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, tripPlanId, status, costType) {
        const where = { tenantId: req.user.tenantId };
        if (tripPlanId)
            where.tripPlanId = tripPlanId;
        if (isTripCostStatus(status))
            where.status = status;
        if (costType)
            where.costType = costType;
        const costs = await this.prisma.tripCost.findMany({
            where,
            orderBy: [{ createdAt: 'desc' }],
            include: { tripPlan: true, supplier: true },
            take: 200,
        });
        return { costs };
    }
    async get(req, id) {
        const cost = await this.prisma.tripCost.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { tripPlan: true, supplier: true },
        });
        if (!cost)
            throw new common_1.NotFoundException('Trip cost not found');
        return { cost };
    }
    async create(req, body) {
        const trip = await this.prisma.tripPlan.findFirst({
            where: { id: body.tripPlanId, tenantId: req.user.tenantId },
            select: { id: true, code: true },
        });
        if (!trip)
            throw new common_1.NotFoundException('Trip plan not found');
        const cost = await this.prisma.tripCost.create({
            data: {
                tenantId: req.user.tenantId,
                tripPlanId: body.tripPlanId,
                costType: body.costType,
                description: body.description,
                amount: body.amount,
                currencyCode: body.currencyCode || 'IDR',
                supplierId: body.supplierId,
                notes: body.notes,
                status: 'DRAFT',
            },
            include: { tripPlan: true, supplier: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'TripCost',
            entityId: cost.id,
            metadata: { tripCode: trip.code, costType: body.costType, amount: body.amount },
        });
        return { cost };
    }
    async update(req, id, body) {
        const existing = await this.prisma.tripCost.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Trip cost not found');
        if (existing.status !== 'DRAFT') {
            throw new Error('Can only update draft trip costs');
        }
        const cost = await this.prisma.tripCost.update({
            where: { id },
            data: {
                ...(body.costType && { costType: body.costType }),
                ...(body.description !== undefined && { description: body.description }),
                ...(body.amount !== undefined && { amount: body.amount }),
                ...(body.notes !== undefined && { notes: body.notes }),
            },
            include: { tripPlan: true, supplier: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE',
            entity: 'TripCost',
            entityId: id,
            metadata: { amount: body.amount },
        });
        return { cost };
    }
    async submit(req, id) {
        const cost = await this.prisma.tripCost.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!cost)
            throw new common_1.NotFoundException('Trip cost not found');
        if (cost.status !== 'DRAFT') {
            throw new Error('Can only submit draft trip costs');
        }
        const updated = await this.prisma.tripCost.update({
            where: { id },
            data: { status: 'SUBMITTED', submittedBy: req.user.id, submittedAt: new Date() },
            include: { tripPlan: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'SUBMIT',
            entity: 'TripCost',
            entityId: id,
        });
        return { cost: updated };
    }
    async approve(req, id) {
        const cost = await this.prisma.tripCost.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!cost)
            throw new common_1.NotFoundException('Trip cost not found');
        if (cost.status !== 'SUBMITTED') {
            throw new Error('Can only approve submitted trip costs');
        }
        const updated = await this.prisma.tripCost.update({
            where: { id },
            data: { status: 'APPROVED', approvedBy: req.user.id, approvedAt: new Date() },
            include: { tripPlan: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'APPROVE',
            entity: 'TripCost',
            entityId: id,
        });
        return { cost: updated };
    }
    async post(req, id) {
        const cost = await this.prisma.tripCost.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { tripPlan: true },
        });
        if (!cost)
            throw new common_1.NotFoundException('Trip cost not found');
        if (cost.status !== 'APPROVED') {
            throw new Error('Can only post approved trip costs');
        }
        const updated = await this.prisma.tripCost.update({
            where: { id },
            data: { status: 'POSTED', postedToFinance: true },
            include: { tripPlan: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'POST',
            entity: 'TripCost',
            entityId: id,
            metadata: { amount: cost.amount, tripPlanId: cost.tripPlanId },
        });
        return { cost: updated };
    }
};
exports.CostingController = CostingController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.cost.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('tripPlanId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('costType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.cost.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.cost.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateTripCostDto]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.cost.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateTripCostDto]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.cost.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.cost.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/post'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.cost.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "post", null);
exports.CostingController = CostingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics/costs'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], CostingController);
//# sourceMappingURL=costing.controller.js.map