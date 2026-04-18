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
exports.MarketplaceSyncController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
let MarketplaceSyncController = class MarketplaceSyncController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getHistory(req, channelId, status, limit) {
        const where = { tenantId: req.user.tenantId };
        if (channelId)
            where.channelId = channelId;
        if (status)
            where.status = status;
        const logs = await this.prisma.marketplaceSyncLog.findMany({
            where,
            include: { listing: true, channel: true },
            orderBy: [{ createdAt: 'desc' }],
            take: limit || 100,
        });
        return { logs };
    }
    async getQueue(req) {
        const pending = await this.prisma.marketplaceListing.findMany({
            where: {
                tenantId: req.user.tenantId,
                syncStatus: { in: ['PENDING', 'FAILED'] },
                isActive: true,
            },
            include: { channel: true },
            orderBy: [{ lastSyncAt: 'asc' }],
        });
        return { queue: pending };
    }
    async syncInventory(req, listingId) {
        const listing = await this.prisma.marketplaceListing.findFirst({
            where: { id: listingId, tenantId: req.user.tenantId },
            include: { channel: true },
        });
        if (!listing)
            return { success: false, message: 'Listing tidak ditemukan' };
        const success = Math.random() > 0.1;
        await this.prisma.marketplaceListing.update({
            where: { id: listingId },
            data: {
                syncStatus: success ? 'SYNCED' : 'FAILED',
                lastSyncAt: new Date(),
                lastSyncError: success ? null : 'Gagal update inventory',
            },
        });
        await this.prisma.marketplaceSyncLog.create({
            data: {
                tenantId: req.user.tenantId,
                listingId,
                channelId: listing.channelId,
                syncType: 'INVENTORY',
                status: success ? 'SUCCESS' : 'FAILED',
                message: success ? 'Inventory berhasil disinkronkan' : 'Gagal sinkronkan inventory',
            },
        });
        return { success, message: success ? 'Stock berhasil diupdate' : 'Gagal update stock' };
    }
    async syncPrice(req, listingId) {
        const listing = await this.prisma.marketplaceListing.findFirst({
            where: { id: listingId, tenantId: req.user.tenantId },
            include: { channel: true },
        });
        if (!listing)
            return { success: false, message: 'Listing tidak ditemukan' };
        const success = Math.random() > 0.1;
        await this.prisma.marketplaceListing.update({
            where: { id: listingId },
            data: {
                syncStatus: success ? 'SYNCED' : 'FAILED',
                lastSyncAt: new Date(),
                lastSyncError: success ? null : 'Gagal update harga',
            },
        });
        await this.prisma.marketplaceSyncLog.create({
            data: {
                tenantId: req.user.tenantId,
                listingId,
                channelId: listing.channelId,
                syncType: 'PRICE',
                status: success ? 'SUCCESS' : 'FAILED',
                message: success ? 'Harga berhasil disinkronkan' : 'Gagal sinkronkan harga',
            },
        });
        return { success, message: success ? 'Harga berhasil diupdate' : 'Gagal update harga' };
    }
    async fullSync(req, listingId) {
        const listing = await this.prisma.marketplaceListing.findFirst({
            where: { id: listingId, tenantId: req.user.tenantId },
            include: { channel: true },
        });
        if (!listing)
            return { success: false, message: 'Listing tidak ditemukan' };
        const success = Math.random() > 0.1;
        await this.prisma.marketplaceListing.update({
            where: { id: listingId },
            data: {
                syncStatus: success ? 'SYNCED' : 'FAILED',
                lastSyncAt: new Date(),
                lastSyncError: success ? null : 'Gagal sinkronisasi penuh',
            },
        });
        await this.prisma.marketplaceSyncLog.create({
            data: {
                tenantId: req.user.tenantId,
                listingId,
                channelId: listing.channelId,
                syncType: 'FULL',
                status: success ? 'SUCCESS' : 'FAILED',
                message: success ? 'Sinkronisasi penuh berhasil' : 'Gagal sinkronisasi penuh',
            },
        });
        return { success, message: success ? 'Sinkronisasi penuh berhasil' : 'Gagal sinkronisasi' };
    }
};
exports.MarketplaceSyncController = MarketplaceSyncController;
__decorate([
    (0, common_1.Get)('history'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.sync.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('channelId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number]),
    __metadata("design:returntype", Promise)
], MarketplaceSyncController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Get)('queue'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.sync.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarketplaceSyncController.prototype, "getQueue", null);
__decorate([
    (0, common_1.Post)('inventory/:listingId'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.sync.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('listingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarketplaceSyncController.prototype, "syncInventory", null);
__decorate([
    (0, common_1.Post)('price/:listingId'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.sync.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('listingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarketplaceSyncController.prototype, "syncPrice", null);
__decorate([
    (0, common_1.Post)('full/:listingId'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.sync.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('listingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarketplaceSyncController.prototype, "fullSync", null);
exports.MarketplaceSyncController = MarketplaceSyncController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('ecommerce/sync'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarketplaceSyncController);
//# sourceMappingURL=marketplace-sync.controller.js.map