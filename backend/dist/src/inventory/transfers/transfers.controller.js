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
exports.TransfersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_transfer_dto_1 = require("./dto/create-transfer.dto");
const update_transfer_dto_1 = require("./dto/update-transfer.dto");
const inventoryStatusSet = new Set([
    'DRAFT',
    'SUBMITTED',
    'POSTED',
    'VOID',
]);
const isInventoryDocStatus = (value) => Boolean(value) && inventoryStatusSet.has(value);
let TransfersController = class TransfersController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const transfers = await this.prisma.stockTransfer.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(isInventoryDocStatus(status) ? { status } : {}),
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { fromWarehouse: true, toWarehouse: true },
            take: 200,
        });
        return { transfers };
    }
    async get(req, id) {
        const transfer = await this.prisma.stockTransfer.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                fromWarehouse: true,
                toWarehouse: true,
                items: {
                    orderBy: [{ lineNo: 'asc' }],
                    include: { item: true, fromBinLocation: true, toBinLocation: true },
                },
            },
        });
        if (!transfer)
            throw new common_1.NotFoundException('Transfer not found');
        return { transfer };
    }
    async create(req, body) {
        const fromWh = await this.prisma.warehouse.findFirst({ where: { id: body.fromWarehouseId, tenantId: req.user.tenantId }, select: { id: true } });
        if (!fromWh)
            throw new common_1.NotFoundException('From warehouse not found');
        const toWh = await this.prisma.warehouse.findFirst({ where: { id: body.toWarehouseId, tenantId: req.user.tenantId }, select: { id: true } });
        if (!toWh)
            throw new common_1.NotFoundException('To warehouse not found');
        if (body.items.some((it) => it.itemId)) {
            const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean)));
            const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId, id: { in: itemIds } } });
            if (count !== itemIds.length)
                throw new common_1.NotFoundException('Item not found');
        }
        const transfer = await this.prisma.$transaction(async (tx) => {
            const tr = await tx.stockTransfer.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    transferDate: new Date(body.transferDate),
                    fromWarehouseId: body.fromWarehouseId,
                    toWarehouseId: body.toWarehouseId,
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.stockTransferItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        transferId: tr.id,
                        lineNo: idx + 1,
                        itemId: it.itemId,
                        description: it.description,
                        qty: it.qty,
                        uomCode: it.uomCode,
                        fromBinLocationId: it.fromBinLocationId,
                        toBinLocationId: it.toBinLocationId,
                        batchCode: it.batchCode,
                        serialNo: it.serialNo,
                    })),
                });
            }
            return tr;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'StockTransfer',
            entityId: transfer.id,
        });
        return { transfer };
    }
    async update(req, id, body) {
        const existing = await this.prisma.stockTransfer.findFirst({ where: { id, tenantId: req.user.tenantId }, select: { id: true, status: true } });
        if (!existing)
            throw new common_1.NotFoundException('Transfer not found');
        if (existing.status === 'POSTED')
            throw new common_1.ForbiddenException('Transfer already posted');
        if (body.items?.some((it) => it.itemId)) {
            const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean)));
            const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId, id: { in: itemIds } } });
            if (count !== itemIds.length)
                throw new common_1.NotFoundException('Item not found');
        }
        const transfer = await this.prisma.$transaction(async (tx) => {
            const tr = await tx.stockTransfer.update({
                where: { id },
                data: { transferDate: body.transferDate ? new Date(body.transferDate) : undefined, notes: body.notes ?? undefined },
            });
            if (body.items) {
                await tx.stockTransferItem.deleteMany({ where: { tenantId: req.user.tenantId, transferId: id } });
                if (body.items.length > 0) {
                    await tx.stockTransferItem.createMany({
                        data: body.items.map((it, idx) => ({
                            tenantId: req.user.tenantId,
                            transferId: id,
                            lineNo: idx + 1,
                            itemId: it.itemId,
                            description: it.description,
                            qty: it.qty,
                            uomCode: it.uomCode,
                            fromBinLocationId: it.fromBinLocationId,
                            toBinLocationId: it.toBinLocationId,
                            batchCode: it.batchCode,
                            serialNo: it.serialNo,
                        })),
                    });
                }
            }
            return tr;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'StockTransfer',
            entityId: transfer.id,
        });
        return { transfer };
    }
    async post(req, id) {
        const transfer = await this.prisma.stockTransfer.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { items: { orderBy: [{ lineNo: 'asc' }] } },
        });
        if (!transfer)
            throw new common_1.NotFoundException('Transfer not found');
        if (transfer.status === 'POSTED')
            throw new common_1.ForbiddenException('Transfer already posted');
        const posted = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.stockTransfer.update({ where: { id }, data: { status: 'POSTED' } });
            for (const it of transfer.items) {
                let batchId;
                let serialId;
                if (it.itemId && it.batchCode) {
                    const batch = await tx.itemBatch.upsert({
                        where: { tenantId_itemId_code: { tenantId: req.user.tenantId, itemId: it.itemId, code: it.batchCode } },
                        update: {},
                        create: { tenantId: req.user.tenantId, itemId: it.itemId, code: it.batchCode },
                        select: { id: true },
                    });
                    batchId = batch.id;
                }
                if (it.itemId && it.serialNo) {
                    const serial = await tx.itemSerial.upsert({
                        where: { tenantId_serialNo: { tenantId: req.user.tenantId, serialNo: it.serialNo } },
                        update: { itemId: it.itemId },
                        create: { tenantId: req.user.tenantId, itemId: it.itemId, serialNo: it.serialNo },
                        select: { id: true },
                    });
                    serialId = serial.id;
                }
                await tx.stockLedger.create({
                    data: {
                        tenantId: req.user.tenantId,
                        moveType: 'TRANSFER_OUT',
                        refType: 'TRANSFER',
                        refId: transfer.id,
                        postingDate: transfer.transferDate,
                        itemId: it.itemId,
                        description: it.description,
                        qtyIn: '0',
                        qtyOut: it.qty,
                        uomCode: it.uomCode,
                        warehouseId: transfer.fromWarehouseId,
                        binLocationId: it.fromBinLocationId,
                        batchId,
                        serialId,
                    },
                });
                await tx.stockLedger.create({
                    data: {
                        tenantId: req.user.tenantId,
                        moveType: 'TRANSFER_IN',
                        refType: 'TRANSFER',
                        refId: transfer.id,
                        postingDate: transfer.transferDate,
                        itemId: it.itemId,
                        description: it.description,
                        qtyIn: it.qty,
                        qtyOut: '0',
                        uomCode: it.uomCode,
                        warehouseId: transfer.toWarehouseId,
                        binLocationId: it.toBinLocationId,
                        batchId,
                        serialId,
                    },
                });
            }
            return updated;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'post',
            entity: 'StockTransfer',
            entityId: posted.id,
        });
        return { transfer: posted };
    }
};
exports.TransfersController = TransfersController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.transfer.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TransfersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.transfer.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TransfersController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.transfer.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_transfer_dto_1.CreateTransferDto]),
    __metadata("design:returntype", Promise)
], TransfersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.transfer.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_transfer_dto_1.UpdateTransferDto]),
    __metadata("design:returntype", Promise)
], TransfersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/post'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.transfer.post'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TransfersController.prototype, "post", null);
exports.TransfersController = TransfersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/transfers'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], TransfersController);
//# sourceMappingURL=transfers.controller.js.map