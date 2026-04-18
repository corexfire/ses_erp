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
exports.QualityController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const quality_dto_1 = require("./dto/quality.dto");
let QualityController = class QualityController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, status) {
        const inspections = await this.prisma.inProcessQc.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(status ? { status } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { workOrder: { include: { finishedGood: true } } },
            take: 200,
        });
        return { inspections };
    }
    async get(req, id) {
        const inspection = await this.prisma.inProcessQc.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { workOrder: { include: { finishedGood: true } } },
        });
        if (!inspection)
            throw new common_1.NotFoundException('Quality inspection not found');
        return { inspection };
    }
    async create(req, body) {
        const wo = await this.prisma.workOrder.findFirst({
            where: { id: body.workOrderId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!wo)
            throw new common_1.NotFoundException('Work Order not found');
        const inspection = await this.prisma.inProcessQc.create({
            data: {
                tenantId: req.user.tenantId,
                workOrderId: body.workOrderId,
                qtyInspected: body.qtyInspected,
                qtyPassed: body.qtyPassed,
                qtyFailed: body.qtyFailed,
                notes: body.notes,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'InProcessQc',
            entityId: inspection.id,
        });
        return { inspection };
    }
    async update(req, id, body) {
        const existing = await this.prisma.inProcessQc.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Quality inspection not found');
        const inspection = await this.prisma.inProcessQc.update({
            where: { id },
            data: {
                status: body.status ?? undefined,
                qtyInspected: body.qtyInspected ?? undefined,
                qtyPassed: body.qtyPassed ?? undefined,
                qtyFailed: body.qtyFailed ?? undefined,
                notes: body.notes ?? undefined,
                inspectedAt: body.status ? new Date() : undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'InProcessQc',
            entityId: id,
        });
        return { inspection };
    }
};
exports.QualityController = QualityController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.quality.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.quality.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.quality.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, quality_dto_1.CreateInProcessQcDto]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.quality.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, quality_dto_1.UpdateInProcessQcDto]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "update", null);
exports.QualityController = QualityController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('manufacturing/quality'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], QualityController);
//# sourceMappingURL=quality.controller.js.map