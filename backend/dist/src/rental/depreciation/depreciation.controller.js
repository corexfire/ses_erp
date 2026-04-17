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
exports.RentalDepreciationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let RentalDepreciationController = class RentalDepreciationController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async findAll(req, search) {
        const user = req.user;
        const where = { tenantId: user.tenantId };
        if (search) {
            where.OR = [
                { assetNo: { contains: search, mode: 'insensitive' } },
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }
        const assets = await this.prisma.fixedAsset.findMany({
            where,
            include: {
                _count: {
                    select: { rentalContracts: true, rentalMaintenances: true }
                }
            },
            orderBy: { purchaseDate: 'desc' },
        });
        const payload = await Promise.all(assets.map(async (asset) => {
            const dLogs = await this.prisma.fixedAssetDepreciation.findMany({
                where: { assetId: asset.id },
                orderBy: { periodDate: 'desc' },
                take: 1
            });
            let accumulated = 0;
            if (dLogs.length > 0) {
                accumulated = Number(dLogs[0].accumulatedAmount) || 0;
            }
            const netBookValue = Math.max(0, Number(asset.purchaseCost) - accumulated);
            return {
                ...asset,
                accumulatedDepreciation: accumulated,
                netBookValue
            };
        }));
        const totalCapital = payload.reduce((sum, item) => sum + Number(item.purchaseCost), 0);
        const totalAccumulated = payload.reduce((sum, item) => sum + item.accumulatedDepreciation, 0);
        const summary = {
            totalAssets: payload.length,
            totalCapital,
            totalAccumulated,
            netBookValue: totalCapital - totalAccumulated
        };
        return { data: payload, summary };
    }
    async getHistory(req, assetId) {
        const user = req.user;
        const logs = await this.prisma.fixedAssetDepreciation.findMany({
            where: { tenantId: user.tenantId, assetId },
            orderBy: { periodDate: 'desc' }
        });
        return { data: logs };
    }
    async logManualDepreciation(req, body) {
        const user = req.user;
        const asset = await this.prisma.fixedAsset.findUnique({ where: { id: body.assetId } });
        if (!asset || asset.tenantId !== user.tenantId) {
            throw new common_1.NotFoundException('Fixed Asset target not found.');
        }
        const depAmount = Number(body.depreciationAmount || 0);
        const lastLog = await this.prisma.fixedAssetDepreciation.findFirst({
            where: { assetId: body.assetId },
            orderBy: { periodDate: 'desc' }
        });
        const accumulatedAmount = (lastLog ? Number(lastLog.accumulatedAmount) : 0) + depAmount;
        const record = await this.prisma.fixedAssetDepreciation.create({
            data: {
                tenantId: user.tenantId,
                assetId: body.assetId,
                periodDate: body.periodDate ? new Date(body.periodDate) : new Date(),
                depreciationAmount: depAmount,
                accumulatedAmount: accumulatedAmount,
                notes: body.notes || 'Manual Jurnal / Depresiasi Sistem',
            },
        });
        await this.audit.log(user.tenantId, user.id, 'CREATE', 'FixedAssetDepreciation', record.id, null, record);
        return { message: 'Asset Depreciation historical log mapped.', data: record };
    }
};
exports.RentalDepreciationController = RentalDepreciationController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RentalDepreciationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RentalDepreciationController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RentalDepreciationController.prototype, "logManualDepreciation", null);
exports.RentalDepreciationController = RentalDepreciationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('rental/depreciation'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], RentalDepreciationController);
//# sourceMappingURL=depreciation.controller.js.map