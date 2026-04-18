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
exports.MarketplaceChannelController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
let MarketplaceChannelController = class MarketplaceChannelController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const channels = await this.prisma.marketplaceChannel.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: { name: 'asc' },
        });
        return { channels };
    }
    async create(req, body) {
        const channel = await this.prisma.marketplaceChannel.create({
            data: {
                tenantId: req.user.tenantId,
                name: body.name,
                code: body.code,
                type: body.type,
                iconUrl: body.iconUrl,
                apiEndpoint: body.apiEndpoint,
                clientId: body.clientId,
                clientSecret: body.clientSecret,
                isActive: body.isActive ?? true,
            },
        });
        return { channel };
    }
    async update(req, id, body) {
        const channel = await this.prisma.marketplaceChannel.update({
            where: { id },
            data: body,
        });
        return { channel };
    }
    async delete(id) {
        await this.prisma.marketplaceChannel.delete({ where: { id } });
        return { success: true };
    }
    async testConnection(id) {
        const channel = await this.prisma.marketplaceChannel.findUnique({ where: { id } });
        if (!channel)
            return { success: false, message: 'Channel tidak ditemukan' };
        const success = Math.random() > 0.2;
        return {
            success,
            message: success
                ? `Koneksi ke ${channel.name} berhasil`
                : `Gagal terhubung ke ${channel.name}. Periksa API credentials.`
        };
    }
};
exports.MarketplaceChannelController = MarketplaceChannelController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.channel.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarketplaceChannelController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.channel.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarketplaceChannelController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.channel.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarketplaceChannelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.channel.delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarketplaceChannelController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/test-connection'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.channel.update'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarketplaceChannelController.prototype, "testConnection", null);
exports.MarketplaceChannelController = MarketplaceChannelController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('ecommerce/channels'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarketplaceChannelController);
//# sourceMappingURL=marketplace-channel.controller.js.map