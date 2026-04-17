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
exports.AiForecastController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let AiForecastController = class AiForecastController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getForecasts(req, search) {
        const user = req.user;
        const where = { tenantId: user.tenantId };
        if (search) {
            where.item = {
                OR: [
                    { code: { contains: search, mode: 'insensitive' } },
                    { name: { contains: search, mode: 'insensitive' } },
                ]
            };
        }
        const models = await this.prisma.inventoryForecast.findMany({
            where,
            include: {
                item: {
                    select: {
                        code: true,
                        name: true,
                        reorderPoint: true,
                        reorderQty: true,
                        uoms: true
                    }
                }
            },
            orderBy: { confidenceScore: 'desc' },
            take: 100
        });
        const highRiskCount = models.filter(m => Number(m.predictedDemand) > Number(m.item.reorderQty || 0)).length;
        const upwardTrends = models.filter(m => m.trend === 'UPWARD' || m.trend === 'SEASONAL').length;
        const summary = {
            totalForecastsCount: models.length,
            highRiskStockouts: highRiskCount,
            upwardTrends
        };
        return { data: models, summary };
    }
    async applyRestockParams(req, body) {
        const user = req.user;
        const item = await this.prisma.item.update({
            where: { id: body.itemId, tenantId: user.tenantId },
            data: { reorderQty: Number(body.recommendedQty) }
        });
        return { message: 'Master Item Target Reorder Quantity adjusted by AI Recommendation!', data: item };
    }
};
exports.AiForecastController = AiForecastController;
__decorate([
    (0, common_1.Get)('forecasts'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiForecastController.prototype, "getForecasts", null);
__decorate([
    (0, common_1.Post)('apply-restock'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AiForecastController.prototype, "applyRestockParams", null);
exports.AiForecastController = AiForecastController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/planning/ai'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AiForecastController);
//# sourceMappingURL=ai-forecast.controller.js.map