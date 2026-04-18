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
exports.StockCountsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_stock_count_dto_1 = require("./dto/create-stock-count.dto");
const update_stock_count_dto_1 = require("./dto/update-stock-count.dto");
let StockCountsController = class StockCountsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    toNumber(value) {
        const n = parseFloat(String(value ?? '0'));
        return Number.isFinite(n) ? n : 0;
    }
    async currentQty(input) {
        const agg = await this.prisma.stockLedger.aggregate({
            where: {
                tenantId: input.tenantId,
                warehouseId: input.warehouseId,
                ...(input.binLocationId ? { binLocationId: input.binLocationId } : {}),
                ...(input.itemId ? { itemId: input.itemId } : {}),
                ...(input.batchId ? { batchId: input.batchId } : {}),
                ...(input.serialId ? { serialId: input.serialId } : {}),
            },
            _sum: { qtyIn: true, qtyOut: true },
        });
        return this.toNumber(agg._sum.qtyIn) - this.toNumber(agg._sum.qtyOut);
    }
    async list(req, q, status) {
        const stockCounts = await this.prisma.stockCount.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(status ? { status: status } : {}),
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { warehouse: true },
            take: 200,
        });
        return { stockCounts };
    }
    async get(req, id) {
        const stockCount = await this.prisma.stockCount.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { warehouse: true, items: { orderBy: [{ lineNo: 'asc' }], include: { item: true, binLocation: true } } },
        });
        if (!stockCount)
            throw new common_1.NotFoundException('Stock count not found');
        return { stockCount };
    }
    async create(req, body) {
        const wh = await this.prisma.warehouse.findFirst({ where: { id: body.warehouseId, tenantId: req.user.tenantId }, select: { id: true } });
        if (!wh)
            throw new common_1.NotFoundException('Warehouse not found');
        if (body.items.some((it) => it.itemId)) {
            const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean)));
            const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId, id: { in: itemIds } } });
            if (count !== itemIds.length)
                throw new common_1.NotFoundException('Item not found');
        }
        const stockCount = await this.prisma.$transaction(async (tx) => {
            const sc = await tx.stockCount.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    countDate: new Date(body.countDate),
                    warehouseId: body.warehouseId,
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.stockCountItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        stockCountId: sc.id,
                        lineNo: idx + 1,
                        itemId: it.itemId,
                        description: it.description,
                        countedQty: it.countedQty,
                        uomCode: it.uomCode,
                        binLocationId: it.binLocationId,
                        batchCode: it.batchCode,
                        serialNo: it.serialNo,
                    })),
                });
            }
            return sc;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'StockCount',
            entityId: stockCount.id,
        });
        return { stockCount };
    }
    async update(req, id, body) {
        const existing = await this.prisma.stockCount.findFirst({ where: { id, tenantId: req.user.tenantId }, select: { id: true, status: true, warehouseId: true } });
        if (!existing)
            throw new common_1.NotFoundException('Stock count not found');
        if (existing.status === 'POSTED')
            throw new common_1.ForbiddenException('Stock count already posted');
        if (body.items?.some((it) => it.itemId)) {
            const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean)));
            const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId, id: { in: itemIds } } });
            if (count !== itemIds.length)
                throw new common_1.NotFoundException('Item not found');
        }
        const stockCount = await this.prisma.$transaction(async (tx) => {
            const sc = await tx.stockCount.update({
                where: { id },
                data: { countDate: body.countDate ? new Date(body.countDate) : undefined, notes: body.notes ?? undefined },
            });
            if (body.items) {
                await tx.stockCountItem.deleteMany({ where: { tenantId: req.user.tenantId, stockCountId: id } });
                if (body.items.length > 0) {
                    await tx.stockCountItem.createMany({
                        data: body.items.map((it, idx) => ({
                            tenantId: req.user.tenantId,
                            stockCountId: id,
                            lineNo: idx + 1,
                            itemId: it.itemId,
                            description: it.description,
                            countedQty: it.countedQty,
                            uomCode: it.uomCode,
                            binLocationId: it.binLocationId,
                            batchCode: it.batchCode,
                            serialNo: it.serialNo,
                        })),
                    });
                }
            }
            return sc;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'StockCount',
            entityId: stockCount.id,
        });
        return { stockCount };
    }
    async post(req, id) {
        const stockCount = await this.prisma.stockCount.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { items: { orderBy: [{ lineNo: 'asc' }] } },
        });
        if (!stockCount)
            throw new common_1.NotFoundException('Stock count not found');
        if (stockCount.status === 'POSTED')
            throw new common_1.ForbiddenException('Stock count already posted');
        const posted = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.stockCount.update({ where: { id }, data: { status: 'POSTED' } });
            for (const it of stockCount.items) {
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
                const current = await this.currentQty({
                    tenantId: req.user.tenantId,
                    warehouseId: stockCount.warehouseId,
                    binLocationId: it.binLocationId,
                    itemId: it.itemId,
                    batchId,
                    serialId,
                });
                const target = this.toNumber(it.countedQty);
                const diff = target - current;
                if (Math.abs(diff) < 0.0000001)
                    continue;
                await tx.stockLedger.create({
                    data: {
                        tenantId: req.user.tenantId,
                        moveType: 'STOCK_COUNT_ADJUST',
                        refType: 'STOCK_COUNT',
                        refId: stockCount.id,
                        postingDate: stockCount.countDate,
                        itemId: it.itemId,
                        description: it.description,
                        qtyIn: diff > 0 ? diff.toFixed(4) : '0',
                        qtyOut: diff < 0 ? Math.abs(diff).toFixed(4) : '0',
                        uomCode: it.uomCode,
                        warehouseId: stockCount.warehouseId,
                        binLocationId: it.binLocationId,
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
            entity: 'StockCount',
            entityId: posted.id,
        });
        return { stockCount: posted };
    }
};
exports.StockCountsController = StockCountsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.stock_opname.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], StockCountsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.stock_opname.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StockCountsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.stock_opname.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_stock_count_dto_1.CreateStockCountDto]),
    __metadata("design:returntype", Promise)
], StockCountsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.stock_opname.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_stock_count_dto_1.UpdateStockCountDto]),
    __metadata("design:returntype", Promise)
], StockCountsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/post'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.stock_opname.post'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StockCountsController.prototype, "post", null);
exports.StockCountsController = StockCountsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/stock-counts'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], StockCountsController);
//# sourceMappingURL=stock-counts.controller.js.map