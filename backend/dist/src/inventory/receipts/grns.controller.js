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
exports.GrnsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_grn_dto_1 = require("./dto/create-grn.dto");
const update_grn_dto_1 = require("./dto/update-grn.dto");
const inventoryStatusSet = new Set([
    'DRAFT',
    'SUBMITTED',
    'POSTED',
    'VOID',
]);
const isInventoryDocStatus = (value) => Boolean(value) && inventoryStatusSet.has(value);
let GrnsController = class GrnsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const grns = await this.prisma.goodsReceiptNote.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(isInventoryDocStatus(status) ? { status } : {}),
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { supplier: true, purchaseOrder: true, purchaseInvoice: true, warehouse: true },
            take: 200,
        });
        return { grns };
    }
    async get(req, id) {
        const grn = await this.prisma.goodsReceiptNote.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                supplier: true,
                purchaseOrder: true,
                purchaseInvoice: true,
                warehouse: true,
                items: { orderBy: [{ lineNo: 'asc' }], include: { item: true, binLocation: true } },
                qcInspections: true,
            },
        });
        if (!grn)
            throw new common_1.NotFoundException('GRN not found');
        return { grn };
    }
    async create(req, body) {
        const warehouse = await this.prisma.warehouse.findFirst({
            where: { id: body.warehouseId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        if (body.supplierId) {
            const supplier = await this.prisma.supplier.findFirst({
                where: { id: body.supplierId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!supplier)
                throw new common_1.NotFoundException('Supplier not found');
        }
        if (body.purchaseOrderId) {
            const po = await this.prisma.purchaseOrder.findFirst({
                where: { id: body.purchaseOrderId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!po)
                throw new common_1.NotFoundException('Purchase order not found');
        }
        if (body.purchaseInvoiceId) {
            const inv = await this.prisma.purchaseInvoice.findFirst({
                where: { id: body.purchaseInvoiceId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!inv)
                throw new common_1.NotFoundException('Purchase invoice not found');
        }
        if (body.items.some((it) => it.binLocationId)) {
            const binIds = Array.from(new Set(body.items.map((it) => it.binLocationId).filter(Boolean)));
            const count = await this.prisma.binLocation.count({
                where: { tenantId: req.user.tenantId, warehouseId: body.warehouseId, id: { in: binIds } },
            });
            if (count !== binIds.length)
                throw new common_1.NotFoundException('Bin not found');
        }
        if (body.items.some((it) => it.itemId)) {
            const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean)));
            const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId, id: { in: itemIds } } });
            if (count !== itemIds.length)
                throw new common_1.NotFoundException('Item not found');
        }
        const grn = await this.prisma.$transaction(async (tx) => {
            const created = await tx.goodsReceiptNote.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    receiptDate: new Date(body.receiptDate),
                    warehouseId: body.warehouseId,
                    supplierId: body.supplierId,
                    purchaseOrderId: body.purchaseOrderId,
                    purchaseInvoiceId: body.purchaseInvoiceId,
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.goodsReceiptItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        grnId: created.id,
                        lineNo: idx + 1,
                        itemId: it.itemId,
                        description: it.description,
                        qty: it.qty,
                        uomCode: it.uomCode,
                        warehouseId: body.warehouseId,
                        binLocationId: it.binLocationId,
                        batchCode: it.batchCode,
                        serialNo: it.serialNo,
                    })),
                });
            }
            return created;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'GoodsReceiptNote',
            entityId: grn.id,
        });
        return { grn };
    }
    async update(req, id, body) {
        const existing = await this.prisma.goodsReceiptNote.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true, warehouseId: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('GRN not found');
        if (existing.status === 'POSTED')
            throw new common_1.ForbiddenException('GRN already posted');
        const nextWarehouseId = body.warehouseId ?? existing.warehouseId;
        if (body.warehouseId) {
            const warehouse = await this.prisma.warehouse.findFirst({
                where: { id: body.warehouseId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!warehouse)
                throw new common_1.NotFoundException('Warehouse not found');
        }
        if (body.supplierId) {
            const supplier = await this.prisma.supplier.findFirst({
                where: { id: body.supplierId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!supplier)
                throw new common_1.NotFoundException('Supplier not found');
        }
        if (body.purchaseOrderId) {
            const po = await this.prisma.purchaseOrder.findFirst({
                where: { id: body.purchaseOrderId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!po)
                throw new common_1.NotFoundException('Purchase order not found');
        }
        if (body.purchaseInvoiceId) {
            const inv = await this.prisma.purchaseInvoice.findFirst({
                where: { id: body.purchaseInvoiceId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!inv)
                throw new common_1.NotFoundException('Purchase invoice not found');
        }
        if (body.items?.some((it) => it.binLocationId)) {
            const binIds = Array.from(new Set(body.items.map((it) => it.binLocationId).filter(Boolean)));
            const count = await this.prisma.binLocation.count({
                where: { tenantId: req.user.tenantId, warehouseId: nextWarehouseId, id: { in: binIds } },
            });
            if (count !== binIds.length)
                throw new common_1.NotFoundException('Bin not found');
        }
        if (body.items?.some((it) => it.itemId)) {
            const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean)));
            const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId, id: { in: itemIds } } });
            if (count !== itemIds.length)
                throw new common_1.NotFoundException('Item not found');
        }
        const grn = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.goodsReceiptNote.update({
                where: { id },
                data: {
                    receiptDate: body.receiptDate ? new Date(body.receiptDate) : undefined,
                    warehouseId: body.warehouseId ?? undefined,
                    supplierId: body.supplierId ?? undefined,
                    purchaseOrderId: body.purchaseOrderId ?? undefined,
                    purchaseInvoiceId: body.purchaseInvoiceId ?? undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (body.items) {
                await tx.goodsReceiptItem.deleteMany({ where: { tenantId: req.user.tenantId, grnId: id } });
                if (body.items.length > 0) {
                    await tx.goodsReceiptItem.createMany({
                        data: body.items.map((it, idx) => ({
                            tenantId: req.user.tenantId,
                            grnId: id,
                            lineNo: idx + 1,
                            itemId: it.itemId,
                            description: it.description,
                            qty: it.qty,
                            uomCode: it.uomCode,
                            warehouseId: updated.warehouseId,
                            binLocationId: it.binLocationId,
                            batchCode: it.batchCode,
                            serialNo: it.serialNo,
                        })),
                    });
                }
            }
            return updated;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'GoodsReceiptNote',
            entityId: grn.id,
        });
        return { grn };
    }
    async post(req, id) {
        const grn = await this.prisma.goodsReceiptNote.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { items: true },
        });
        if (!grn)
            throw new common_1.NotFoundException('GRN not found');
        if (grn.status === 'POSTED')
            throw new common_1.ForbiddenException('GRN already posted');
        let totalGrnValue = 0;
        for (const it of grn.items) {
            const qty = parseFloat(String(it.qty || 0));
            const price = 0;
            totalGrnValue += qty * price;
        }
        const posted = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.goodsReceiptNote.update({ where: { id }, data: { status: 'POSTED' } });
            for (const it of grn.items) {
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
                        moveType: 'GRN_RECEIPT',
                        refType: 'GRN',
                        refId: grn.id,
                        postingDate: grn.receiptDate,
                        itemId: it.itemId,
                        description: it.description,
                        qtyIn: it.qty,
                        qtyOut: '0',
                        uomCode: it.uomCode,
                        warehouseId: grn.warehouseId,
                        binLocationId: it.binLocationId,
                        batchId,
                        serialId,
                    },
                });
            }
            const existingQc = await tx.qcInspection.findFirst({
                where: { tenantId: req.user.tenantId, grnId: grn.id },
                select: { id: true },
            });
            if (!existingQc) {
                await tx.qcInspection.create({
                    data: {
                        tenantId: req.user.tenantId,
                        grnId: grn.id,
                        status: 'DRAFT',
                        code: `QC-${grn.code}`,
                        inspectionDate: new Date()
                    },
                });
            }
            if (totalGrnValue > 0) {
                const jeCount = await tx.journalEntry.count({ where: { tenantId: req.user.tenantId } });
                const jeNo = `JE-GRN-${String(jeCount + 1).padStart(6, '0')}`;
                const journal = await tx.journalEntry.create({
                    data: {
                        tenantId: req.user.tenantId,
                        entryNo: jeNo,
                        entryDate: grn.receiptDate,
                        description: `GRN Receipt - ${grn.code}`,
                        referenceNo: grn.code,
                        journalType: 'INVENTORY',
                        totalDebit: totalGrnValue,
                        totalCredit: totalGrnValue,
                        status: 'POSTED',
                    }
                });
                await tx.journalEntryLine.createMany({
                    data: [
                        {
                            tenantId: req.user.tenantId,
                            journalEntryId: journal.id,
                            lineNo: 1,
                            accountCode: '1-1310-00',
                            description: 'Inventory - Stock In',
                            debit: totalGrnValue,
                            credit: 0,
                            referenceId: grn.id,
                        },
                        {
                            tenantId: req.user.tenantId,
                            journalEntryId: journal.id,
                            lineNo: 2,
                            accountCode: '2-1200-00',
                            description: 'Inventory Transit / GRN',
                            debit: 0,
                            credit: totalGrnValue,
                            referenceId: grn.id,
                        }
                    ]
                });
            }
            return updated;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'post',
            entity: 'GoodsReceiptNote',
            entityId: posted.id,
        });
        return { grn: posted };
    }
};
exports.GrnsController = GrnsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.grn.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], GrnsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.grn.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GrnsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.grn.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_grn_dto_1.CreateGrnDto]),
    __metadata("design:returntype", Promise)
], GrnsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.grn.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_grn_dto_1.UpdateGrnDto]),
    __metadata("design:returntype", Promise)
], GrnsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/post'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.grn.post'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GrnsController.prototype, "post", null);
exports.GrnsController = GrnsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/grns'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], GrnsController);
//# sourceMappingURL=grns.controller.js.map