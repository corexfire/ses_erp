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
exports.WarehouseController = exports.UpdateStagingLoadDto = exports.CreateStagingLoadDto = exports.CreateWavePickingDto = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
class CreateWavePickingDto {
    warehouseId;
    plannedDate;
    deliveryOrderIds;
    notes;
}
exports.CreateWavePickingDto = CreateWavePickingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWavePickingDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWavePickingDto.prototype, "plannedDate", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateWavePickingDto.prototype, "deliveryOrderIds", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWavePickingDto.prototype, "notes", void 0);
class CreateStagingLoadDto {
    waveId;
    tripPlanId;
    warehouseId;
}
exports.CreateStagingLoadDto = CreateStagingLoadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStagingLoadDto.prototype, "waveId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStagingLoadDto.prototype, "tripPlanId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStagingLoadDto.prototype, "warehouseId", void 0);
class UpdateStagingLoadDto {
    waveId;
    tripPlanId;
    warehouseId;
}
exports.UpdateStagingLoadDto = UpdateStagingLoadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStagingLoadDto.prototype, "waveId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStagingLoadDto.prototype, "tripPlanId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStagingLoadDto.prototype, "warehouseId", void 0);
let WarehouseController = class WarehouseController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listWaves(req, status, warehouseId) {
        const waves = await this.prisma.wavePicking.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(status && { status: status }),
                ...(warehouseId && { warehouseId }),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { warehouse: true },
            take: 200,
        });
        return { waves };
    }
    async getWave(req, id) {
        const wave = await this.prisma.wavePicking.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                warehouse: true,
            },
        });
        if (!wave)
            throw new common_1.NotFoundException('Wave picking not found');
        const deliveryOrders = await this.prisma.deliveryOrder.findMany({
            where: {
                tenantId: req.user.tenantId,
                warehouseId: wave.warehouseId,
                status: 'RELEASED',
                plannedShipDate: { gte: new Date(wave.plannedDate + 'T00:00:00Z'), lt: new Date(wave.plannedDate + 'T23:59:59Z') },
            },
            include: { customer: true, items: true },
            take: 100,
        });
        return { wave, deliveryOrders };
    }
    async createWave(req, body) {
        const warehouse = await this.prisma.warehouse.findFirst({
            where: { id: body.warehouseId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        const deliveryOrders = await this.prisma.deliveryOrder.findMany({
            where: {
                id: { in: body.deliveryOrderIds },
                tenantId: req.user.tenantId,
                status: 'RELEASED',
            },
            select: { id: true, _count: { select: { items: true } } },
        });
        if (deliveryOrders.length !== body.deliveryOrderIds.length) {
            throw new Error('Some delivery orders not found or not eligible');
        }
        const count = await this.prisma.wavePicking.count({ where: { tenantId: req.user.tenantId } });
        const code = `WAVE-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(count + 1).padStart(4, '0')}`;
        const totalItemCount = deliveryOrders.reduce((sum, do_) => sum + do_._count.items, 0);
        const wave = await this.prisma.wavePicking.create({
            data: {
                tenantId: req.user.tenantId,
                code,
                warehouseId: body.warehouseId,
                plannedDate: new Date(body.plannedDate),
                status: 'DRAFT',
                totalDoCount: deliveryOrders.length,
                totalItemCount,
                notes: body.notes,
            },
            include: { warehouse: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'WavePicking',
            entityId: wave.id,
            metadata: { code, deliveryOrderCount: deliveryOrders.length },
        });
        return { wave };
    }
    async releaseWave(req, id) {
        const wave = await this.prisma.wavePicking.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true },
        });
        if (!wave)
            throw new common_1.NotFoundException('Wave picking not found');
        if (wave.status !== 'DRAFT') {
            throw new Error('Can only release draft waves');
        }
        const updated = await this.prisma.wavePicking.update({
            where: { id },
            data: { status: 'RELEASED' },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'RELEASE',
            entity: 'WavePicking',
            entityId: id,
            metadata: { code: wave.code },
        });
        return { wave: updated };
    }
    async completePicking(req, id) {
        const wave = await this.prisma.wavePicking.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true },
        });
        if (!wave)
            throw new common_1.NotFoundException('Wave picking not found');
        if (wave.status !== 'RELEASED' && wave.status !== 'IN_PROGRESS') {
            throw new Error('Can only complete released or in-progress waves');
        }
        const updated = await this.prisma.wavePicking.update({
            where: { id },
            data: { status: 'DONE' },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'COMPLETE_PICKING',
            entity: 'WavePicking',
            entityId: id,
            metadata: { code: wave.code },
        });
        return { wave: updated };
    }
    async listStaging(req, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        const stagings = await this.prisma.stagingLoad.findMany({
            where,
            include: {
                warehouse: true,
                tripPlan: true,
                wavePicking: true,
            },
            orderBy: [{ createdAt: 'desc' }],
            take: 200,
        });
        return { stagings };
    }
    async createStaging(req, body) {
        const warehouse = await this.prisma.warehouse.findFirst({
            where: { id: body.warehouseId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        const count = await this.prisma.stagingLoad.count({ where: { tenantId: req.user.tenantId } });
        const code = `STG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(count + 1).padStart(4, '0')}`;
        const staging = await this.prisma.stagingLoad.create({
            data: {
                tenantId: req.user.tenantId,
                code,
                waveId: body.waveId,
                tripPlanId: body.tripPlanId,
                warehouseId: body.warehouseId,
                status: 'PENDING',
            },
        });
        return { staging };
    }
    async confirmStaging(req, id) {
        const staging = await this.prisma.stagingLoad.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!staging)
            throw new common_1.NotFoundException('Staging load not found');
        const updated = await this.prisma.stagingLoad.update({
            where: { id },
            data: { status: 'CONFIRMED', loadedAt: new Date() },
        });
        return { staging: updated };
    }
    async updateStaging(req, id, body) {
        const staging = await this.prisma.stagingLoad.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true },
        });
        if (!staging)
            throw new common_1.NotFoundException('Staging load not found');
        const updated = await this.prisma.stagingLoad.update({
            where: { id },
            data: {
                ...(body.waveId !== undefined && { waveId: body.waveId }),
                ...(body.tripPlanId !== undefined && { tripPlanId: body.tripPlanId }),
                ...(body.warehouseId !== undefined && { warehouseId: body.warehouseId }),
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE',
            entity: 'StagingLoad',
            entityId: id,
            metadata: { code: staging.code, ...body },
        });
        return { staging: updated };
    }
    async getStaging(req, id) {
        const staging = await this.prisma.stagingLoad.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                warehouse: true,
                tripPlan: true,
                wavePicking: true,
            },
        });
        if (!staging)
            throw new common_1.NotFoundException('Staging load not found');
        return { staging };
    }
    async confirmLoading(req, tripId) {
        const trip = await this.prisma.tripPlan.findFirst({
            where: { id: tripId, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        await this.prisma.deliveryOrder.updateMany({
            where: { tripPlanId: tripId, status: 'STAGED' },
            data: { status: 'LOADED' },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CONFIRM_LOADING',
            entity: 'TripPlan',
            entityId: tripId,
            metadata: { tripId },
        });
        return { success: true };
    }
};
exports.WarehouseController = WarehouseController;
__decorate([
    (0, common_1.Get)('waves'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('warehouseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "listWaves", null);
__decorate([
    (0, common_1.Get)('waves/:id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "getWave", null);
__decorate([
    (0, common_1.Post)('waves'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateWavePickingDto]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "createWave", null);
__decorate([
    (0, common_1.Post)('waves/:id/release'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "releaseWave", null);
__decorate([
    (0, common_1.Post)('waves/:id/complete-picking'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "completePicking", null);
__decorate([
    (0, common_1.Get)('staging'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "listStaging", null);
__decorate([
    (0, common_1.Post)('staging'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateStagingLoadDto]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "createStaging", null);
__decorate([
    (0, common_1.Post)('staging/:id/confirm'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "confirmStaging", null);
__decorate([
    (0, common_1.Patch)('staging/:id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateStagingLoadDto]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "updateStaging", null);
__decorate([
    (0, common_1.Get)('staging/:id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "getStaging", null);
__decorate([
    (0, common_1.Post)('loading/:tripId/confirm'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.dispatch.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "confirmLoading", null);
exports.WarehouseController = WarehouseController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], WarehouseController);
//# sourceMappingURL=warehouse.controller.js.map