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
exports.AssetSupportController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class CreateAssetDto {
    assetNo;
    name;
    category;
    purchaseDate;
    purchaseCost;
    usefulLife;
    brand;
    model;
    serialNumber;
    locationId;
    custodianId;
    status;
    warrantyExpiry;
    insuranceExpiry;
    insurancePolicy;
    nextMaintenanceDate;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "assetNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAssetDto.prototype, "purchaseCost", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAssetDto.prototype, "usefulLife", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "serialNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "locationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "custodianId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "warrantyExpiry", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "insuranceExpiry", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "insurancePolicy", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "nextMaintenanceDate", void 0);
let AssetSupportController = class AssetSupportController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listAssets(req, category, status) {
        return this.prisma.fixedAsset.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(category ? { category } : {}),
                ...(status ? { status } : {}),
            },
            include: {
                location: { select: { name: true, siteCode: true } },
                custodian: { select: { firstName: true, lastName: true, employeeNo: true } }
            },
            orderBy: { assetNo: 'asc' }
        });
    }
    async getStats(req) {
        const assets = await this.prisma.fixedAsset.findMany({
            where: { tenantId: req.user.tenantId }
        });
        const now = new Date();
        return {
            total: assets.length,
            active: assets.filter(a => a.status === 'ACTIVE').length,
            underMaintenance: assets.filter(a => a.status === 'UNDER_MAINTENANCE').length,
            maintenanceOverdue: assets.filter(a => a.nextMaintenanceDate && a.nextMaintenanceDate < now && a.status !== 'DISPOSED').length,
            totalCapex: assets.reduce((sum, a) => sum + Number(a.purchaseCost), 0),
        };
    }
    async getAsset(id, req) {
        return this.prisma.fixedAsset.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                location: true,
                custodian: true,
                depreciationEntries: { orderBy: { periodDate: 'desc' }, take: 5 },
                rentalContracts: true,
            }
        });
    }
    async createAsset(req, body) {
        return this.prisma.fixedAsset.create({
            data: {
                tenantId: req.user.tenantId,
                assetNo: body.assetNo,
                name: body.name,
                category: body.category,
                purchaseDate: new Date(body.purchaseDate),
                purchaseCost: body.purchaseCost,
                usefulLife: body.usefulLife,
                brand: body.brand,
                model: body.model,
                serialNumber: body.serialNumber,
                locationId: body.locationId,
                custodianId: body.custodianId,
                status: body.status || 'ACTIVE',
                warrantyExpiry: body.warrantyExpiry ? new Date(body.warrantyExpiry) : undefined,
                insuranceExpiry: body.insuranceExpiry ? new Date(body.insuranceExpiry) : undefined,
                insurancePolicy: body.insurancePolicy,
                nextMaintenanceDate: body.nextMaintenanceDate ? new Date(body.nextMaintenanceDate) : undefined,
            }
        });
    }
    async updateAsset(id, req, body) {
        const data = { ...body };
        if (body.purchaseDate)
            data.purchaseDate = new Date(body.purchaseDate);
        if (body.warrantyExpiry)
            data.warrantyExpiry = new Date(body.warrantyExpiry);
        if (body.insuranceExpiry)
            data.insuranceExpiry = new Date(body.insuranceExpiry);
        if (body.nextMaintenanceDate)
            data.nextMaintenanceDate = new Date(body.nextMaintenanceDate);
        return this.prisma.fixedAsset.update({
            where: { id, tenantId: req.user.tenantId },
            data
        });
    }
    async deleteAsset(id, req) {
        return this.prisma.fixedAsset.delete({
            where: { id, tenantId: req.user.tenantId }
        });
    }
};
exports.AssetSupportController = AssetSupportController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('fixed-asset.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AssetSupportController.prototype, "listAssets", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('fixed-asset.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssetSupportController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('fixed-asset.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssetSupportController.prototype, "getAsset", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('fixed-asset.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateAssetDto]),
    __metadata("design:returntype", Promise)
], AssetSupportController.prototype, "createAsset", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('fixed-asset.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AssetSupportController.prototype, "updateAsset", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('fixed-asset.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssetSupportController.prototype, "deleteAsset", null);
exports.AssetSupportController = AssetSupportController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('support/assets'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssetSupportController);
//# sourceMappingURL=asset.controller.js.map