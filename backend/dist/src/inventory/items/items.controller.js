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
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_item_group_dto_1 = require("./dto/create-item-group.dto");
const create_item_dto_1 = require("./dto/create-item.dto");
const update_item_group_dto_1 = require("./dto/update-item-group.dto");
const update_item_dto_1 = require("./dto/update-item.dto");
const item_uom_dto_1 = require("./dto/item-uom.dto");
const item_barcode_dto_1 = require("./dto/item-barcode.dto");
let ItemsController = class ItemsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listItemGroups(req, q) {
        const itemGroups = await this.prisma.itemGroup.findMany({
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
            take: 200,
        });
        return { itemGroups };
    }
    async createItemGroup(req, body) {
        const itemGroup = await this.prisma.itemGroup.create({
            data: { tenantId: req.user.tenantId, code: body.code, name: body.name },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'ItemGroup',
            entityId: itemGroup.id,
        });
        return { itemGroup };
    }
    async updateItemGroup(req, id, body) {
        const exists = await this.prisma.itemGroup.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Item group not found');
        const itemGroup = await this.prisma.itemGroup.update({
            where: { id },
            data: { name: body.name ?? undefined },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'ItemGroup',
            entityId: itemGroup.id,
        });
        return { itemGroup };
    }
    async deactivateItemGroup(req, id) {
        const exists = await this.prisma.itemGroup.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Item group not found');
        const itemGroup = await this.prisma.itemGroup.update({
            where: { id },
            data: { isActive: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'ItemGroup',
            entityId: itemGroup.id,
        });
        return { itemGroup };
    }
    async listItems(req, q, isActive) {
        const items = await this.prisma.item.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(typeof isActive === 'string' ? { isActive: isActive === 'true' } : {}),
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
            include: { itemGroup: true, uoms: true, barcodes: true, stockBalances: true },
            take: 200,
        });
        return { items };
    }
    async getItem(req, id) {
        const item = await this.prisma.item.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { itemGroup: true, uoms: true, barcodes: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found');
        return { item };
    }
    async createItem(req, body) {
        if (body.itemGroupId) {
            const group = await this.prisma.itemGroup.findFirst({
                where: { id: body.itemGroupId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!group)
                throw new common_1.NotFoundException('Item group not found');
        }
        const item = await this.prisma.item.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                description: body.description,
                itemGroupId: body.itemGroupId,
                baseUomCode: body.baseUomCode,
                trackingType: body.trackingType ?? undefined,
                valuationMethod: body.valuationMethod ?? undefined,
                reorderPoint: body.reorderPoint,
                reorderQty: body.reorderQty,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Item',
            entityId: item.id,
        });
        return { item };
    }
    async updateItem(req, id, body) {
        const exists = await this.prisma.item.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Item not found');
        if (body.itemGroupId) {
            const group = await this.prisma.itemGroup.findFirst({
                where: { id: body.itemGroupId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!group)
                throw new common_1.NotFoundException('Item group not found');
        }
        const item = await this.prisma.item.update({
            where: { id },
            data: {
                name: body.name ?? undefined,
                description: body.description ?? undefined,
                itemGroupId: body.itemGroupId ?? undefined,
                baseUomCode: body.baseUomCode ?? undefined,
                trackingType: body.trackingType ?? undefined,
                valuationMethod: body.valuationMethod ?? undefined,
                reorderPoint: body.reorderPoint ?? undefined,
                reorderQty: body.reorderQty ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'Item',
            entityId: item.id,
        });
        return { item };
    }
    async deactivateItem(req, id) {
        const exists = await this.prisma.item.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Item not found');
        const item = await this.prisma.item.update({ where: { id }, data: { isActive: false } });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'Item',
            entityId: item.id,
        });
        return { item };
    }
    async listItemUoms(req, itemId) {
        const item = await this.prisma.item.findFirst({
            where: { id: itemId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found');
        const uoms = await this.prisma.itemUom.findMany({
            where: { itemId, tenantId: req.user.tenantId },
            orderBy: [{ isBase: 'desc' }, { uomCode: 'asc' }],
        });
        return { uoms };
    }
    async createItemUom(req, itemId, body) {
        const item = await this.prisma.item.findFirst({
            where: { id: itemId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found');
        if (body.isBase) {
            await this.prisma.itemUom.updateMany({
                where: { itemId, tenantId: req.user.tenantId },
                data: { isBase: false },
            });
        }
        const uom = await this.prisma.itemUom.create({
            data: {
                tenantId: req.user.tenantId,
                itemId,
                uomCode: body.uomCode,
                isBase: body.isBase ?? false,
                conversionRate: body.conversionRate ?? 1,
                price: body.price,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'ItemUom',
            entityId: uom.id,
        });
        return { uom };
    }
    async updateItemUom(req, itemId, uomId, body) {
        const uom = await this.prisma.itemUom.findFirst({
            where: { id: uomId, itemId, tenantId: req.user.tenantId },
        });
        if (!uom)
            throw new common_1.NotFoundException('ItemUom not found');
        if (body.isBase === true && !uom.isBase) {
            await this.prisma.itemUom.updateMany({
                where: { itemId, tenantId: req.user.tenantId },
                data: { isBase: false },
            });
        }
        const updated = await this.prisma.itemUom.update({
            where: { id: uomId },
            data: {
                isBase: body.isBase ?? undefined,
                conversionRate: body.conversionRate ?? undefined,
                price: body.price ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'ItemUom',
            entityId: uomId,
        });
        return { uom: updated };
    }
    async deleteItemUom(req, itemId, uomId) {
        const uom = await this.prisma.itemUom.findFirst({
            where: { id: uomId, itemId, tenantId: req.user.tenantId },
        });
        if (!uom)
            throw new common_1.NotFoundException('ItemUom not found');
        await this.prisma.itemUom.delete({ where: { id: uomId } });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'delete',
            entity: 'ItemUom',
            entityId: uomId,
        });
        return { success: true };
    }
    async listItemBarcodes(req, itemId) {
        const item = await this.prisma.item.findFirst({
            where: { id: itemId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found');
        const barcodes = await this.prisma.itemBarcode.findMany({
            where: { itemId, tenantId: req.user.tenantId },
            orderBy: { createdAt: 'desc' },
        });
        return { barcodes };
    }
    async createItemBarcode(req, itemId, body) {
        const item = await this.prisma.item.findFirst({
            where: { id: itemId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found');
        const existing = await this.prisma.itemBarcode.findFirst({
            where: { tenantId: req.user.tenantId, barcode: body.barcode },
        });
        if (existing)
            throw new common_1.NotFoundException('Barcode already exists for this tenant');
        const barcode = await this.prisma.itemBarcode.create({
            data: {
                tenantId: req.user.tenantId,
                itemId,
                barcode: body.barcode,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'ItemBarcode',
            entityId: barcode.id,
        });
        return { barcode };
    }
    async deleteItemBarcode(req, itemId, barcodeId) {
        const barcode = await this.prisma.itemBarcode.findFirst({
            where: { id: barcodeId, itemId, tenantId: req.user.tenantId },
        });
        if (!barcode)
            throw new common_1.NotFoundException('ItemBarcode not found');
        await this.prisma.itemBarcode.delete({ where: { id: barcodeId } });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'delete',
            entity: 'ItemBarcode',
            entityId: barcodeId,
        });
        return { success: true };
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Get)('item-groups'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item_group.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "listItemGroups", null);
__decorate([
    (0, common_1.Post)('item-groups'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item_group.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_item_group_dto_1.CreateItemGroupDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "createItemGroup", null);
__decorate([
    (0, common_1.Patch)('item-groups/:id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item_group.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_item_group_dto_1.UpdateItemGroupDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "updateItemGroup", null);
__decorate([
    (0, common_1.Patch)('item-groups/:id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item_group.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "deactivateItemGroup", null);
__decorate([
    (0, common_1.Get)('items'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "listItems", null);
__decorate([
    (0, common_1.Get)('items/:id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getItem", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_item_dto_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "createItem", null);
__decorate([
    (0, common_1.Patch)('items/:id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Patch)('items/:id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "deactivateItem", null);
__decorate([
    (0, common_1.Get)('items/:itemId/uoms'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "listItemUoms", null);
__decorate([
    (0, common_1.Post)('items/:itemId/uoms'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, item_uom_dto_1.CreateItemUomDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "createItemUom", null);
__decorate([
    (0, common_1.Patch)('items/:itemId/uoms/:uomId'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Param)('uomId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, item_uom_dto_1.UpdateItemUomDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "updateItemUom", null);
__decorate([
    (0, common_1.Delete)('items/:itemId/uoms/:uomId'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Param)('uomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "deleteItemUom", null);
__decorate([
    (0, common_1.Get)('items/:itemId/barcodes'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "listItemBarcodes", null);
__decorate([
    (0, common_1.Post)('items/:itemId/barcodes'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, item_barcode_dto_1.CreateItemBarcodeDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "createItemBarcode", null);
__decorate([
    (0, common_1.Delete)('items/:itemId/barcodes/:barcodeId'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.item.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Param)('barcodeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "deleteItemBarcode", null);
exports.ItemsController = ItemsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], ItemsController);
//# sourceMappingURL=items.controller.js.map