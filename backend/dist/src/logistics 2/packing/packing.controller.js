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
exports.PackingController = exports.CreatePackingListDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
class CreatePackingListDto {
    deliveryOrderId;
    warehouseId;
    notes;
    totalWeight;
    totalVolume;
    packageCount;
    shippingMark;
    sealNumber;
    carrierId;
}
exports.CreatePackingListDto = CreatePackingListDto;
let PackingController = class PackingController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, search, status) {
        const where = { tenantId: req.user.tenantId };
        if (search) {
            where.OR = [
                { code: { contains: search, mode: 'insensitive' } },
                { shippingMark: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status) {
            where.status = status;
        }
        const packingLists = await this.prisma.packingList.findMany({
            where,
            include: {
                deliveryOrder: { include: { customer: true } },
                carrier: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return { data: packingLists };
    }
    async get(req, id) {
        const packing = await this.prisma.packingList.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                deliveryOrder: {
                    include: {
                        customer: true,
                        items: { include: { item: true } },
                    },
                },
                carrier: true,
            },
        });
        if (!packing)
            throw new common_1.NotFoundException('Packing list not found');
        return packing;
    }
    async create(req, body) {
        const warehouse = await this.prisma.warehouse.findFirst({
            where: { id: body.warehouseId, tenantId: req.user.tenantId },
            select: { id: true, name: true },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        const count = await this.prisma.packingList.count({ where: { tenantId: req.user.tenantId } });
        const code = `PKL-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(count + 1).padStart(4, '0')}`;
        const packing = await this.prisma.packingList.create({
            data: {
                tenantId: req.user.tenantId,
                code,
                deliveryOrderId: body.deliveryOrderId,
                warehouseId: body.warehouseId,
                packingDate: new Date(),
                notes: body.notes,
                status: 'DRAFT',
                totalWeight: body.totalWeight,
                totalVolume: body.totalVolume,
                packageCount: body.packageCount,
                shippingMark: body.shippingMark,
                sealNumber: body.sealNumber,
                carrierId: body.carrierId,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'PackingList',
            entityId: packing.id,
            metadata: { code, warehouseId: body.warehouseId },
        });
        return { packing };
    }
    async confirm(req, id) {
        const packing = await this.prisma.packingList.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true },
        });
        if (!packing)
            throw new common_1.NotFoundException('Packing list not found');
        if (packing.status !== 'DRAFT') {
            throw new Error('Can only confirm draft packing');
        }
        const updated = await this.prisma.packingList.update({
            where: { id },
            data: {
                status: 'CONFIRMED',
                packedBy: req.user.id,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CONFIRM',
            entity: 'PackingList',
            entityId: id,
            metadata: { code: packing.code },
        });
        return { packing: updated };
    }
};
exports.PackingController = PackingController;
__decorate([
    (0, common_1.Get)('packing-lists'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.packing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PackingController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('packing-lists/:id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.packing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PackingController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('packing-lists'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreatePackingListDto]),
    __metadata("design:returntype", Promise)
], PackingController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('packing-lists/:id/confirm'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.warehouse.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PackingController.prototype, "confirm", null);
exports.PackingController = PackingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], PackingController);
//# sourceMappingURL=packing.controller.js.map