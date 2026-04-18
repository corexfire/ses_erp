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
exports.WarehousesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_bin_location_dto_1 = require("./dto/create-bin-location.dto");
const create_warehouse_dto_1 = require("./dto/create-warehouse.dto");
const update_bin_location_dto_1 = require("./dto/update-bin-location.dto");
const update_warehouse_dto_1 = require("./dto/update-warehouse.dto");
let WarehousesController = class WarehousesController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q) {
        const warehouses = await this.prisma.warehouse.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { name: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
            include: {
                binLocations: { take: 10 },
                manager: { select: { id: true, name: true, email: true } },
                _count: { select: { binLocations: true, zones: true } }
            },
            take: 200,
        });
        return { warehouses };
    }
    async get(req, id) {
        const warehouse = await this.prisma.warehouse.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                binLocations: { orderBy: [{ code: 'asc' }] },
                zones: { include: { bins: true } },
                manager: { select: { id: true, name: true, email: true } }
            },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        return { warehouse };
    }
    async create(req, body) {
        const warehouse = await this.prisma.warehouse.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                type: body.type,
                address1: body.address1,
                city: body.city,
                province: body.province,
                postalCode: body.postalCode,
                managerId: body.managerId,
                capacityWeight: body.capacityWeight,
                capacityVolume: body.capacityVolume,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Warehouse',
            entityId: warehouse.id,
        });
        return { warehouse };
    }
    async update(req, id, body) {
        const exists = await this.prisma.warehouse.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Warehouse not found');
        const warehouse = await this.prisma.warehouse.update({
            where: { id },
            data: {
                name: body.name ?? undefined,
                type: body.type ?? undefined,
                address1: body.address1 ?? undefined,
                city: body.city ?? undefined,
                province: body.province ?? undefined,
                postalCode: body.postalCode ?? undefined,
                managerId: body.managerId ?? undefined,
                capacityWeight: body.capacityWeight ?? undefined,
                capacityVolume: body.capacityVolume ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'Warehouse',
            entityId: warehouse.id,
        });
        return { warehouse };
    }
    async deactivate(req, id) {
        const exists = await this.prisma.warehouse.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Warehouse not found');
        const warehouse = await this.prisma.warehouse.update({ where: { id }, data: { isActive: false } });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'Warehouse',
            entityId: warehouse.id,
        });
        return { warehouse };
    }
    async listZones(req, id) {
        const zones = await this.prisma.warehouseZone.findMany({
            where: { tenantId: req.user.tenantId, warehouseId: id },
            include: { _count: { select: { bins: true } } },
        });
        return { zones };
    }
    async createZone(req, id, body) {
        const zone = await this.prisma.warehouseZone.create({
            data: {
                tenantId: req.user.tenantId,
                warehouseId: id,
                code: body.code,
                name: body.name,
                description: body.description,
            }
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'WarehouseZone',
            entityId: zone.id,
            metadata: { warehouseId: id },
        });
        return { zone };
    }
    async listBins(req, id) {
        const bins = await this.prisma.binLocation.findMany({
            where: { tenantId: req.user.tenantId, warehouseId: id },
            include: { zone: true },
            orderBy: [{ isActive: 'desc' }, { code: 'asc' }],
            take: 500,
        });
        return { bins };
    }
    async createBin(req, id, body) {
        const bin = await this.prisma.binLocation.create({
            data: {
                tenantId: req.user.tenantId,
                warehouseId: id,
                code: body.code,
                name: body.name,
                zoneId: body.zoneId,
                type: body.type,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'BinLocation',
            entityId: bin.id,
            metadata: { warehouseId: id },
        });
        return { bin };
    }
    async updateBin(req, binId, body) {
        const bin = await this.prisma.binLocation.update({
            where: { id: binId, tenantId: req.user.tenantId },
            data: {
                name: body.name ?? undefined,
                zoneId: body.zoneId ?? undefined,
                type: body.type ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'BinLocation',
            entityId: bin.id,
        });
        return { bin };
    }
    async deactivateBin(req, binId) {
        const bin = await this.prisma.binLocation.update({
            where: { id: binId, tenantId: req.user.tenantId },
            data: { isActive: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'BinLocation',
            entityId: bin.id,
        });
        return { bin };
    }
};
exports.WarehousesController = WarehousesController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.warehouse.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.warehouse.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.warehouse.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_warehouse_dto_1.CreateWarehouseDto]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.warehouse.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_warehouse_dto_1.UpdateWarehouseDto]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.warehouse.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Get)(':id/zones'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.warehouse.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "listZones", null);
__decorate([
    (0, common_1.Post)(':id/zones'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.warehouse.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "createZone", null);
__decorate([
    (0, common_1.Get)(':id/bins'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.bin.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "listBins", null);
__decorate([
    (0, common_1.Post)(':id/bins'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.bin.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_bin_location_dto_1.CreateBinLocationDto]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "createBin", null);
__decorate([
    (0, common_1.Patch)('/bins/:binId'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.bin.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('binId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_bin_location_dto_1.UpdateBinLocationDto]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "updateBin", null);
__decorate([
    (0, common_1.Patch)('/bins/:binId/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.bin.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('binId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "deactivateBin", null);
exports.WarehousesController = WarehousesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/warehouses'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], WarehousesController);
//# sourceMappingURL=warehouses.controller.js.map