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
exports.AssetDisposalController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_service_1 = require("../../audit/audit.service");
let AssetDisposalController = class AssetDisposalController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        const disposals = await this.prisma.assetDisposal.findMany({
            where,
            include: { asset: true },
            orderBy: { disposalDate: 'desc' },
        });
        return { disposals };
    }
    async get(req, id) {
        const disposal = await this.prisma.assetDisposal.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { asset: true },
        });
        return { disposal };
    }
    async create(req, body) {
        const asset = await this.prisma.fixedAsset.findFirst({ where: { id: body.assetId, tenantId: req.user.tenantId } });
        if (!asset)
            throw new Error('Asset not found');
        const accumulatedDepreciation = await this.prisma.fixedAssetDepreciation.aggregate({
            where: { assetId: body.assetId },
            _sum: { depreciationAmount: true },
        });
        const bookValue = asset.purchaseCost.minus(accumulatedDepreciation._sum.depreciationAmount || 0);
        const lossGain = Number(body.saleValue) - Number(bookValue);
        const disposal = await this.prisma.assetDisposal.create({
            data: {
                tenantId: req.user.tenantId,
                assetId: body.assetId,
                disposalNo: body.disposalNo,
                disposalDate: new Date(body.disposalDate),
                saleValue: body.saleValue,
                lossGain,
                status: 'DRAFT',
                notes: body.notes,
            },
            include: { asset: true },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'AssetDisposal', entityId: disposal.id, metadata: { disposal } });
        return { disposal };
    }
    async approve(req, id) {
        const disposal = await this.prisma.assetDisposal.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!disposal)
            throw new Error('Asset disposal not found');
        await this.prisma.fixedAsset.update({
            where: { id: disposal.assetId },
            data: { status: 'DISPOSED' },
        });
        const updated = await this.prisma.assetDisposal.update({
            where: { id },
            data: { status: 'APPROVED' },
            include: { asset: true },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'APPROVE', entity: 'AssetDisposal', entityId: id, metadata: { disposal: updated } });
        return { disposal: updated };
    }
    async delete(req, id) {
        await this.prisma.assetDisposal.deleteMany({ where: { id, tenantId: req.user.tenantId } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'AssetDisposal', entityId: id, metadata: { id } });
        return { success: true };
    }
};
exports.AssetDisposalController = AssetDisposalController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.assetDisposal.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AssetDisposalController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.assetDisposal.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AssetDisposalController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.assetDisposal.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AssetDisposalController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('finance.assetDisposal.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AssetDisposalController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, permissions_decorator_1.RequirePermissions)('finance.assetDisposal.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AssetDisposalController.prototype, "delete", null);
exports.AssetDisposalController = AssetDisposalController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/asset-disposal'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], AssetDisposalController);
//# sourceMappingURL=asset-disposal.controller.js.map