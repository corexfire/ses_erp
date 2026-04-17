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
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let StockController = class StockController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toNumber(value) {
        const n = parseFloat(String(value ?? '0'));
        return Number.isFinite(n) ? n : 0;
    }
    async ledger(req, itemId, warehouseId, binLocationId, refType, refId) {
        const lines = await this.prisma.stockLedger.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(itemId ? { itemId } : {}),
                ...(warehouseId ? { warehouseId } : {}),
                ...(binLocationId ? { binLocationId } : {}),
                ...(refType ? { refType } : {}),
                ...(refId ? { refId } : {}),
            },
            orderBy: [{ postingDate: 'desc' }, { createdAt: 'desc' }],
            include: { item: true, warehouse: true, binLocation: true },
            take: 500,
        });
        return { lines };
    }
    async summary(req, warehouseId, itemId) {
        const grouped = await this.prisma.stockLedger.groupBy({
            by: ['itemId', 'warehouseId', 'binLocationId'],
            where: {
                tenantId: req.user.tenantId,
                ...(warehouseId ? { warehouseId } : {}),
                ...(itemId ? { itemId } : {}),
            },
            _sum: { qtyIn: true, qtyOut: true },
            orderBy: [{ warehouseId: 'asc' }, { itemId: 'asc' }],
            take: 500,
        });
        const itemIds = grouped.map((g) => g.itemId).filter(Boolean);
        const warehouseIds = grouped.map((g) => g.warehouseId).filter(Boolean);
        const binIds = grouped.map((g) => g.binLocationId).filter(Boolean);
        const [items, warehouses, bins] = await Promise.all([
            itemIds.length > 0
                ? this.prisma.item.findMany({
                    where: { tenantId: req.user.tenantId, id: { in: Array.from(new Set(itemIds)) } },
                    select: { id: true, code: true, name: true },
                })
                : Promise.resolve([]),
            warehouseIds.length > 0
                ? this.prisma.warehouse.findMany({
                    where: { tenantId: req.user.tenantId, id: { in: Array.from(new Set(warehouseIds)) } },
                    select: { id: true, code: true, name: true },
                })
                : Promise.resolve([]),
            binIds.length > 0
                ? this.prisma.binLocation.findMany({
                    where: { tenantId: req.user.tenantId, id: { in: Array.from(new Set(binIds)) } },
                    select: { id: true, code: true, name: true, warehouseId: true },
                })
                : Promise.resolve([]),
        ]);
        const itemById = new Map(items.map((x) => [x.id, x]));
        const warehouseById = new Map(warehouses.map((x) => [x.id, x]));
        const binById = new Map(bins.map((x) => [x.id, x]));
        const rows = grouped.map((g) => {
            const qtyIn = g._sum.qtyIn ?? '0';
            const qtyOut = g._sum.qtyOut ?? '0';
            const qtyOnHand = (this.toNumber(qtyIn) - this.toNumber(qtyOut)).toFixed(4);
            return {
                itemId: g.itemId,
                warehouseId: g.warehouseId,
                binLocationId: g.binLocationId,
                item: g.itemId ? itemById.get(g.itemId) ?? null : null,
                warehouse: warehouseById.get(g.warehouseId) ?? null,
                binLocation: g.binLocationId ? binById.get(g.binLocationId) ?? null : null,
                qtyIn: String(qtyIn),
                qtyOut: String(qtyOut),
                qtyOnHand,
            };
        });
        return { rows };
    }
};
exports.StockController = StockController;
__decorate([
    (0, common_1.Get)('ledger'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.stock.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('itemId')),
    __param(2, (0, common_1.Query)('warehouseId')),
    __param(3, (0, common_1.Query)('binLocationId')),
    __param(4, (0, common_1.Query)('refType')),
    __param(5, (0, common_1.Query)('refId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "ledger", null);
__decorate([
    (0, common_1.Get)('summary'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.stock.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('warehouseId')),
    __param(2, (0, common_1.Query)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "summary", null);
exports.StockController = StockController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/stock'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockController);
//# sourceMappingURL=stock.controller.js.map