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
exports.PackingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_packing_dto_1 = require("./dto/create-packing.dto");
const inventoryStatusSet = new Set(['DRAFT', 'SUBMITTED', 'POSTED', 'VOID']);
const isInventoryDocStatus = (value) => Boolean(value) && inventoryStatusSet.has(value);
let PackingController = class PackingController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const packings = await this.prisma.packing.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(isInventoryDocStatus(status) ? { status } : {}),
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { warehouse: true, salesOrder: true },
            take: 200,
        });
        return { packings };
    }
    async get(req, id) {
        const packing = await this.prisma.packing.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                warehouse: true,
                salesOrder: true,
                items: { orderBy: [{ lineNo: 'asc' }], include: { item: true } },
            },
        });
        if (!packing)
            throw new common_1.NotFoundException('Packing not found');
        return { packing };
    }
    async create(req, body) {
        const warehouse = await this.prisma.warehouse.findFirst({ where: { id: body.warehouseId, tenantId: req.user.tenantId } });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        const count = await this.prisma.packing.count({ where: { tenantId: req.user.tenantId } });
        const code = `PKG-${String(count + 1).padStart(6, '0')}`;
        const packing = await this.prisma.packing.create({
            data: {
                tenantId: req.user.tenantId,
                code,
                packingDate: new Date(body.packingDate),
                warehouseId: body.warehouseId,
                salesOrderId: body.salesOrderId,
                notes: body.notes,
                status: 'DRAFT',
                items: {
                    create: body.items.map((item, index) => ({
                        tenantId: req.user.tenantId,
                        lineNo: index + 1,
                        itemId: item.itemId,
                        description: item.description,
                        qty: item.qty,
                        uomCode: item.uomCode,
                    })),
                },
            },
            include: { warehouse: true, salesOrder: true, items: { include: { item: true } } },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'Packing', entityId: packing.id, metadata: { code } });
        return { packing };
    }
    async update(req, id, body) {
        const existing = await this.prisma.packing.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!existing)
            throw new common_1.NotFoundException('Packing not found');
        if (existing.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only update draft documents');
        await this.prisma.packingItem.deleteMany({ where: { packingId: id } });
        const packing = await this.prisma.packing.update({
            where: { id },
            data: {
                ...(body.packingDate && { packingDate: new Date(body.packingDate) }),
                ...(body.warehouseId && { warehouseId: body.warehouseId }),
                ...(body.notes !== undefined && { notes: body.notes }),
                ...(body.items && {
                    items: {
                        create: body.items.map((item, index) => ({
                            tenantId: req.user.tenantId,
                            lineNo: index + 1,
                            itemId: item.itemId,
                            description: item.description,
                            qty: item.qty,
                            uomCode: item.uomCode,
                        })),
                    },
                }),
            },
            include: { warehouse: true, items: { include: { item: true } } },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'UPDATE', entity: 'Packing', entityId: packing.id, metadata: { code: packing.code } });
        return { packing };
    }
    async delete(req, id) {
        const existing = await this.prisma.packing.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!existing)
            throw new common_1.NotFoundException('Packing not found');
        if (existing.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only delete draft documents');
        await this.prisma.packing.delete({ where: { id } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'Packing', entityId: id, metadata: { code: existing.code } });
        return { success: true };
    }
    async submit(req, id) {
        const packing = await this.prisma.packing.findFirst({ where: { id, tenantId: req.user.tenantId }, include: { items: true, warehouse: true } });
        if (!packing)
            throw new common_1.NotFoundException('Packing not found');
        if (packing.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only submit draft documents');
        const updated = await this.prisma.packing.update({ where: { id }, data: { status: 'SUBMITTED' }, include: { warehouse: true, items: { include: { item: true } } } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'SUBMIT', entity: 'Packing', entityId: packing.id, metadata: { code: packing.code } });
        return { packing: updated };
    }
};
exports.PackingController = PackingController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.packing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PackingController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.packing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PackingController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.packing.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_packing_dto_1.CreatePackingDto]),
    __metadata("design:returntype", Promise)
], PackingController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.packing.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_packing_dto_1.UpdatePackingDto]),
    __metadata("design:returntype", Promise)
], PackingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.packing.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PackingController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.packing.submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PackingController.prototype, "submit", null);
exports.PackingController = PackingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/packings'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, audit_service_1.AuditService])
], PackingController);
//# sourceMappingURL=packing.controller.js.map