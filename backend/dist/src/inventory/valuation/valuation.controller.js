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
exports.ValuationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let ValuationController = class ValuationController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    activeJobs = new Map();
    async getValuation(req, warehouseId, itemId) {
        const where = { tenantId: req.user.tenantId };
        if (warehouseId)
            where.warehouseId = warehouseId;
        if (itemId)
            where.itemId = itemId;
        const stockLedgers = await this.prisma.stockLedger.findMany({
            where,
            include: { item: true, warehouse: true, binLocation: true },
            orderBy: [{ postingDate: 'asc' }],
        });
        const itemMap = new Map();
        for (const ledger of stockLedgers) {
            const key = ledger.itemId || 'unknown';
            if (!itemMap.has(key)) {
                itemMap.set(key, { qtyIn: 0, qtyOut: 0, valueIn: 0, valueOut: 0, items: [] });
            }
            const entry = itemMap.get(key);
            entry.qtyIn += Number(ledger.qtyIn);
            entry.qtyOut += Number(ledger.qtyOut);
            entry.items.push(ledger);
        }
        const valuation = [];
        for (const [itemId, data] of itemMap) {
            const currentQty = data.qtyIn - data.qtyOut;
            const item = data.items[0]?.item;
            const valuationMethod = item?.valuationMethod || 'MOVING_AVERAGE';
            let unitCost = 0;
            let totalValue = 0;
            if (valuationMethod === 'FIFO') {
                const receipts = data.items.filter((l) => l.qtyIn > 0);
                let remainingQty = currentQty;
                for (const receipt of receipts) {
                    if (remainingQty <= 0)
                        break;
                    const qty = Math.min(remainingQty, Number(receipt.qtyIn));
                    totalValue += qty * Number(receipt.unitCost || 0);
                    remainingQty -= qty;
                }
                unitCost = totalValue / currentQty || 0;
            }
            else {
                const layers = await this.prisma.valuationLayer.findMany({
                    where: { tenantId: req.user.tenantId, itemId },
                    orderBy: [{ postingDate: 'asc' }],
                });
                const totalValQty = layers.reduce((sum, l) => sum + Number(l.qty), 0);
                const totalValValue = layers.reduce((sum, l) => sum + Number(l.qty) * Number(l.unitCost), 0);
                unitCost = totalValQty > 0 ? totalValValue / totalValQty : 0;
                totalValue = currentQty * unitCost;
            }
            if (item) {
                valuation.push({
                    itemId: item.id,
                    itemCode: item.code,
                    itemName: item.name,
                    currentQty,
                    unitCost: Math.round(unitCost * 100) / 100,
                    totalValue: Math.round(totalValue * 100) / 100,
                    valuationMethod,
                });
            }
        }
        const grandTotal = valuation.reduce((sum, v) => sum + v.totalValue, 0);
        return { valuation, grandTotal: Math.round(grandTotal * 100) / 100 };
    }
    async getValuationByWarehouse(req) {
        const warehouses = await this.prisma.warehouse.findMany({
            where: { tenantId: req.user.tenantId },
            select: { id: true, code: true, name: true },
        });
        const result = [];
        for (const wh of warehouses) {
            const ledgers = await this.prisma.stockLedger.findMany({
                where: { tenantId: req.user.tenantId, warehouseId: wh.id },
            });
            const totalIn = ledgers.reduce((sum, l) => sum + Number(l.qtyIn), 0);
            const totalOut = ledgers.reduce((sum, l) => sum + Number(l.qtyOut), 0);
            const qty = totalIn - totalOut;
            result.push({
                warehouseId: wh.id,
                warehouseCode: wh.code,
                warehouseName: wh.name,
                currentQty: qty,
            });
        }
        return { warehouses: result };
    }
    async recalculate(req) {
        const jobId = `job_${Date.now()}`;
        this.activeJobs.set(jobId, { progress: 0, status: 'IN_PROGRESS' });
        void this.processRecalculation(jobId, req.user.tenantId);
        return { jobId, message: 'Recalculation started in background' };
    }
    async getJobStatus(jobId) {
        const job = this.activeJobs.get(jobId);
        if (!job)
            return { status: 'NOT_FOUND', progress: 0 };
        return job;
    }
    async getLayers(req, itemId, take) {
        const layers = await this.prisma.valuationLayer.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(itemId ? { itemId } : {}),
            },
            orderBy: [{ postingDate: 'desc' }],
            take: take ? parseInt(take, 10) : 50,
        });
        return { data: layers };
    }
    async processRecalculation(jobId, tenantId) {
        try {
            this.activeJobs.set(jobId, { progress: 10, status: 'IN_PROGRESS' });
            const items = await this.prisma.item.findMany({ where: { tenantId } });
            let processed = 0;
            for (const item of items) {
                await new Promise((resolve) => setTimeout(resolve, 300));
                processed++;
                const progress = Math.min(10 + Math.floor((processed / items.length) * 85), 95);
                this.activeJobs.set(jobId, { progress, status: 'IN_PROGRESS' });
            }
            this.activeJobs.set(jobId, { progress: 100, status: 'COMPLETED' });
            setTimeout(() => this.activeJobs.delete(jobId), 300000);
        }
        catch (error) {
            console.error('COGS Recalculation Error:', error);
            this.activeJobs.set(jobId, { progress: 0, status: 'FAILED' });
        }
    }
};
exports.ValuationController = ValuationController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.valuation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('warehouseId')),
    __param(2, (0, common_1.Query)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ValuationController.prototype, "getValuation", null);
__decorate([
    (0, common_1.Get)('by-warehouse'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.valuation.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ValuationController.prototype, "getValuationByWarehouse", null);
__decorate([
    (0, common_1.Post)('recalculate'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.valuation.manage'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ValuationController.prototype, "recalculate", null);
__decorate([
    (0, common_1.Get)('job-status/:jobId'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.valuation.read'),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ValuationController.prototype, "getJobStatus", null);
__decorate([
    (0, common_1.Get)('layers'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.valuation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('itemId')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ValuationController.prototype, "getLayers", null);
exports.ValuationController = ValuationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/valuation'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ValuationController);
//# sourceMappingURL=valuation.controller.js.map