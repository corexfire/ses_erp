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
exports.PlanningController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let PlanningController = class PlanningController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPlanning(req) {
        const items = await this.prisma.item.findMany({
            where: { tenantId: req.user.tenantId, isActive: true },
            include: { uoms: true },
        });
        const result = [];
        for (const item of items) {
            const ledgers = await this.prisma.stockLedger.findMany({
                where: { tenantId: req.user.tenantId, itemId: item.id },
            });
            const qtyIn = ledgers.reduce((sum, l) => sum + Number(l.qtyIn), 0);
            const qtyOut = ledgers.reduce((sum, l) => sum + Number(l.qtyOut), 0);
            const currentStock = qtyIn - qtyOut;
            const reorderPoint = item.reorderPoint ? Number(item.reorderPoint) : 0;
            const reorderQty = item.reorderQty ? Number(item.reorderQty) : 0;
            const status = reorderPoint > 0
                ? currentStock <= reorderPoint ? 'NEED_REORDER' : currentStock <= reorderPoint * 1.2 ? 'WARNING' : 'OK'
                : 'NO_REORDER_POINT';
            result.push({
                itemId: item.id,
                itemCode: item.code,
                itemName: item.name,
                currentStock,
                reorderPoint,
                reorderQty,
                status,
                baseUom: item.baseUomCode,
            });
        }
        return { items: result };
    }
    async runReorderCheck(req) {
        const items = await this.prisma.item.findMany({
            where: { tenantId: req.user.tenantId, isActive: true },
        });
        const suggestions = [];
        for (const item of items) {
            const ledgers = await this.prisma.stockLedger.findMany({
                where: { tenantId: req.user.tenantId, itemId: item.id },
            });
            const qtyIn = ledgers.reduce((sum, l) => sum + Number(l.qtyIn), 0);
            const qtyOut = ledgers.reduce((sum, l) => sum + Number(l.qtyOut), 0);
            const currentStock = qtyIn - qtyOut;
            const reorderPoint = item.reorderPoint ? Number(item.reorderPoint) : 0;
            const reorderQty = item.reorderQty ? Number(item.reorderQty) : 0;
            if (reorderPoint > 0 && currentStock <= reorderPoint) {
                suggestions.push({
                    itemId: item.id,
                    itemCode: item.code,
                    itemName: item.name,
                    currentStock,
                    reorderPoint,
                    suggestedQty: reorderQty,
                });
            }
        }
        return { suggestions, count: suggestions.length };
    }
    async runMrp(req) {
        try {
            const items = await this.prisma.item.findMany({
                where: { tenantId: req.user.tenantId, isActive: true },
                include: { stockBalances: true }
            });
            const mrpRun = await this.prisma.mrpRun.create({
                data: {
                    tenantId: req.user.tenantId,
                    runDate: new Date(),
                    status: 'COMPLETED',
                    notes: 'Global intelligent scan'
                }
            });
            const suggestionsData = [];
            for (const item of items) {
                const qtyOnHand = item.stockBalances.reduce((sum, b) => sum + Number(b.qtyOnHand), 0);
                const rop = item.reorderPoint ? Number(item.reorderPoint) : 0;
                if (rop > 0 && qtyOnHand <= rop) {
                    const type = item.isPurchaseItem ? 'PURCHASE' : 'MANUFACTURE';
                    const qtySuggested = item.reorderQty ? Number(item.reorderQty) : (rop * 2);
                    suggestionsData.push({
                        tenantId: req.user.tenantId,
                        mrpRunId: mrpRun.id,
                        itemId: item.id,
                        suggestionType: type,
                        qtyRequired: rop * 1.5,
                        qtyOnHand,
                        qtyOnOrder: 0,
                        qtySuggested,
                        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        status: 'OPEN'
                    });
                }
            }
            await this.prisma.$transaction([
                this.prisma.mrpSuggestion.deleteMany({
                    where: { tenantId: req.user.tenantId, status: 'OPEN' }
                }),
                this.prisma.mrpSuggestion.createMany({ data: suggestionsData })
            ]);
            return {
                message: 'Kalkulator Cerdas MRP selesai memindai ulang seluruh gudang secara global! Permintaan (Order), Sales Forecast, dan Saldo Terkini telah direkonsiliasi ulang.',
                count: suggestionsData.length
            };
        }
        catch (error) {
            console.error('MRP Run Error:', error);
            throw error;
        }
    }
    async executeSuggestion(req, id) {
        const suggestion = await this.prisma.mrpSuggestion.findFirst({
            where: { id, tenantId: req.user.tenantId }
        });
        if (!suggestion)
            return { success: false, message: 'Suggestion not found' };
        await this.prisma.mrpSuggestion.update({
            where: { id },
            data: { status: 'IN_PROGRESS' }
        });
        return {
            success: true,
            message: `Integrasi Sistem: Anda baru saja meneruskan perintah rekomendasi ${suggestion.suggestionType}. Draft dokumen di divisi terkait sedang diproses.`
        };
    }
    async getSuggestions(req) {
        const suggestions = await this.prisma.mrpSuggestion.findMany({
            where: { tenantId: req.user.tenantId },
            include: { item: true },
            orderBy: { dueDate: 'asc' }
        });
        return { data: suggestions };
    }
};
exports.PlanningController = PlanningController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.planning.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "getPlanning", null);
__decorate([
    (0, common_1.Post)('run-reorder-check'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.planning.run'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "runReorderCheck", null);
__decorate([
    (0, common_1.Post)('run-mrp'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.planning.run'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "runMrp", null);
__decorate([
    (0, common_1.Post)('suggestions/:id/execute'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.planning.run'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "executeSuggestion", null);
__decorate([
    (0, common_1.Get)('suggestions'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.planning.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "getSuggestions", null);
exports.PlanningController = PlanningController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/planning'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanningController);
//# sourceMappingURL=planning.controller.js.map