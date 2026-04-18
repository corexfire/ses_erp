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
exports.MarketplaceController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
let MarketplaceController = class MarketplaceController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, channelId, status) {
        const where = { tenantId: req.user.tenantId };
        if (q) {
            where.OR = [
                { productName: { contains: q, mode: 'insensitive' } },
                { productSku: { contains: q, mode: 'insensitive' } },
                { marketplaceProductId: { contains: q, mode: 'insensitive' } },
            ];
        }
        if (channelId)
            where.channelId = channelId;
        if (status)
            where.syncStatus = status;
        const listings = await this.prisma.marketplaceListing.findMany({
            where,
            include: { channel: true },
            orderBy: [{ createdAt: 'desc' }],
            take: 500,
        });
        return { listings };
    }
    async listChannels(req) {
        const channels = await this.prisma.marketplaceChannel.findMany({
            where: { tenantId: req.user.tenantId, isActive: true },
            orderBy: { name: 'asc' },
        });
        return { channels };
    }
    async getSyncLog(req, listingId) {
        const where = { tenantId: req.user.tenantId };
        if (listingId)
            where.listingId = listingId;
        const logs = await this.prisma.marketplaceSyncLog.findMany({
            where,
            include: { listing: true, channel: true },
            orderBy: [{ createdAt: 'desc' }],
            take: 200,
        });
        return { logs };
    }
    async getStats(req) {
        const tenantId = req.user.tenantId;
        const [total, synced, pending, failed, byChannel] = await Promise.all([
            this.prisma.marketplaceListing.count({ where: { tenantId } }),
            this.prisma.marketplaceListing.count({ where: { tenantId, syncStatus: 'SYNCED' } }),
            this.prisma.marketplaceListing.count({ where: { tenantId, syncStatus: 'PENDING' } }),
            this.prisma.marketplaceListing.count({ where: { tenantId, syncStatus: 'FAILED' } }),
            this.prisma.marketplaceChannel.findMany({
                where: { tenantId, isActive: true },
                include: {
                    _count: { select: { listings: true } },
                    listings: {
                        where: { syncStatus: 'SYNCED' },
                        select: { lastSyncAt: true, lastSyncError: true }
                    }
                },
            }),
        ]);
        const channelStats = byChannel.map(ch => ({
            id: ch.id,
            name: ch.name,
            icon: ch.iconUrl,
            totalListings: ch._count.listings,
            lastSync: ch.listings[0]?.lastSyncAt || null,
            status: ch.listings[0]?.lastSyncError ? 'ERROR' : 'OK',
        }));
        return {
            stats: { total, synced, pending, failed },
            byChannel: channelStats
        };
    }
    async get(req, id) {
        const listing = await this.prisma.marketplaceListing.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { channel: true, item: true },
        });
        if (!listing)
            throw new common_1.NotFoundException('Listing tidak ditemukan');
        return { listing };
    }
    async create(req, body) {
        const listing = await this.prisma.marketplaceListing.create({
            data: {
                tenantId: req.user.tenantId,
                channelId: body.channelId,
                itemId: body.itemId,
                productName: body.productName,
                productSku: body.productSku,
                marketplaceProductId: body.marketplaceProductId,
                marketplaceUrl: body.marketplaceUrl,
                sellingPrice: body.sellingPrice,
                stockQty: body.stockQty,
                syncStock: body.syncStock,
                syncPrice: body.syncPrice,
                notes: body.notes,
                syncStatus: body.marketplaceProductId ? 'SYNCED' : 'PENDING',
            },
            include: { channel: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'MarketplaceListing',
            entityId: listing.id,
        });
        return { listing };
    }
    async update(req, id, body) {
        const exists = await this.prisma.marketplaceListing.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!exists)
            throw new common_1.NotFoundException('Listing tidak ditemukan');
        const listing = await this.prisma.marketplaceListing.update({
            where: { id },
            data: {
                channelId: body.channelId,
                productName: body.productName,
                productSku: body.productSku,
                marketplaceProductId: body.marketplaceProductId,
                marketplaceUrl: body.marketplaceUrl,
                sellingPrice: body.sellingPrice,
                stockQty: body.stockQty,
                syncStock: body.syncStock,
                syncPrice: body.syncPrice,
                notes: body.notes,
                isActive: body.isActive,
            },
            include: { channel: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'MarketplaceListing',
            entityId: listing.id,
        });
        return { listing };
    }
    async sync(req, id) {
        const listing = await this.prisma.marketplaceListing.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { channel: true },
        });
        if (!listing)
            throw new common_1.NotFoundException('Listing tidak ditemukan');
        const success = Math.random() > 0.1;
        const syncResult = {
            success,
            message: success ? 'Sinkronisasi berhasil' : 'Gagal terhubung ke marketplace',
            timestamp: new Date(),
        };
        await this.prisma.marketplaceListing.update({
            where: { id },
            data: {
                syncStatus: success ? 'SYNCED' : 'FAILED',
                lastSyncAt: new Date(),
                lastSyncError: success ? null : syncResult.message,
            },
        });
        await this.prisma.marketplaceSyncLog.create({
            data: {
                tenantId: req.user.tenantId,
                listingId: id,
                channelId: listing.channelId,
                syncType: 'MANUAL',
                status: success ? 'SUCCESS' : 'FAILED',
                message: syncResult.message,
                details: JSON.stringify({
                    sellingPrice: listing.sellingPrice,
                    stockQty: listing.stockQty
                }),
            },
        });
        return { result: syncResult };
    }
    async syncAll(req) {
        const pending = await this.prisma.marketplaceListing.findMany({
            where: { tenantId: req.user.tenantId, isActive: true },
            include: { channel: true },
        });
        let success = 0, failed = 0;
        const results = [];
        for (const listing of pending) {
            const syncSuccess = Math.random() > 0.15;
            if (syncSuccess)
                success++;
            else
                failed++;
            await this.prisma.marketplaceListing.update({
                where: { id: listing.id },
                data: {
                    syncStatus: syncSuccess ? 'SYNCED' : 'FAILED',
                    lastSyncAt: new Date(),
                    lastSyncError: syncSuccess ? null : 'Timeout saat sinkronisasi',
                },
            });
            await this.prisma.marketplaceSyncLog.create({
                data: {
                    tenantId: req.user.tenantId,
                    listingId: listing.id,
                    channelId: listing.channelId,
                    syncType: 'BULK',
                    status: syncSuccess ? 'SUCCESS' : 'FAILED',
                    message: syncSuccess ? 'Sinkronisasi bulk berhasil' : 'Gagal sinkronisasi',
                },
            });
            results.push({ listingId: listing.id, success: syncSuccess });
        }
        return {
            summary: { total: pending.length, success, failed },
            results
        };
    }
    async delete(req, id) {
        const exists = await this.prisma.marketplaceListing.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!exists)
            throw new common_1.NotFoundException('Listing tidak ditemukan');
        await this.prisma.marketplaceListing.delete({ where: { id } });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'delete',
            entity: 'MarketplaceListing',
            entityId: id,
        });
        return { success: true };
    }
};
exports.MarketplaceController = MarketplaceController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.marketplace.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('channelId')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], MarketplaceController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('channels'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.marketplace.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarketplaceController.prototype, "listChannels", null);
__decorate([
    (0, common_1.Get)('sync-log'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.marketplace.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('listingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarketplaceController.prototype, "getSyncLog", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.marketplace.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarketplaceController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.marketplace.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarketplaceController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.marketplace.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarketplaceController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.marketplace.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarketplaceController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/sync'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.marketplace.sync'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarketplaceController.prototype, "sync", null);
__decorate([
    (0, common_1.Post)('sync-all'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.marketplace.sync'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarketplaceController.prototype, "syncAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('ecommerce.marketplace.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarketplaceController.prototype, "delete", null);
exports.MarketplaceController = MarketplaceController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('ecommerce/marketplace'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], MarketplaceController);
//# sourceMappingURL=marketplace.controller.js.map