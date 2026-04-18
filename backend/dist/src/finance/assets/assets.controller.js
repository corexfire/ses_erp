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
exports.AssetsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let AssetsController = class AssetsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const assets = await this.prisma.fixedAsset.findMany({
            where: { tenantId: req.user.tenantId },
            include: { depreciationEntries: true },
            orderBy: [{ createdAt: 'desc' }],
        });
        return { assets };
    }
    async get(req, id) {
        const asset = await this.prisma.fixedAsset.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { depreciationEntries: { orderBy: [{ periodDate: 'desc' }] } },
        });
        return { asset };
    }
    async create(req, body) {
        const asset = await this.prisma.fixedAsset.create({
            data: {
                tenantId: req.user.tenantId,
                assetNo: body.assetNo,
                name: body.name,
                category: body.category,
                purchaseDate: new Date(body.purchaseDate),
                purchaseCost: body.purchaseCost,
                usefulLife: body.usefulLife,
                salvageValue: body.salvageValue || 0,
                depreciationMethod: body.depreciationMethod || 'STRAIGHT_LINE',
                status: 'ACTIVE',
            },
        });
        return { asset };
    }
    async addDepreciation(req, id, body) {
        const asset = await this.prisma.fixedAsset.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!asset)
            throw new Error('Asset not found');
        const existingDepr = await this.prisma.fixedAssetDepreciation.findMany({ where: { assetId: id } });
        const accumulated = existingDepr.reduce((sum, d) => sum + Number(d.depreciationAmount), 0) + body.depreciationAmount;
        const depr = await this.prisma.fixedAssetDepreciation.create({
            data: {
                tenantId: req.user.tenantId,
                assetId: id,
                periodDate: new Date(body.periodDate),
                depreciationAmount: body.depreciationAmount,
                accumulatedAmount: accumulated,
                notes: body.notes,
            },
        });
        return { depreciation: depr };
    }
};
exports.AssetsController = AssetsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.asset.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.asset.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.asset.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/depreciation'),
    (0, permissions_decorator_1.RequirePermissions)('finance.asset.depreciate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "addDepreciation", null);
exports.AssetsController = AssetsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/assets'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssetsController);
//# sourceMappingURL=assets.controller.js.map