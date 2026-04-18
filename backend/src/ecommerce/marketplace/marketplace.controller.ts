import { Body, Controller, Get, Post, Put, Patch, Delete, Param, Query, Req, NotFoundException, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('ecommerce/marketplace')
export class MarketplaceController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('ecommerce.marketplace.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('channelId') channelId?: string,
    @Query('status') status?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    
    if (q) {
      where.OR = [
        { productName: { contains: q, mode: 'insensitive' } },
        { productSku: { contains: q, mode: 'insensitive' } },
        { marketplaceProductId: { contains: q, mode: 'insensitive' } },
      ];
    }
    if (channelId) where.channelId = channelId;
    if (status) where.syncStatus = status;

    const listings = await this.prisma.marketplaceListing.findMany({
      where,
      include: { channel: true },
      orderBy: [{ createdAt: 'desc' }],
      take: 500,
    });
    return { listings };
  }

  @Get('channels')
  @RequirePermissions('ecommerce.marketplace.read')
  async listChannels(@Req() req: FastifyRequest & { user: AuthUser }) {
    const channels = await this.prisma.marketplaceChannel.findMany({
      where: { tenantId: req.user.tenantId!, isActive: true },
      orderBy: { name: 'asc' },
    });
    return { channels };
  }

  @Get('sync-log')
  @RequirePermissions('ecommerce.marketplace.read')
  async getSyncLog(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('listingId') listingId?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (listingId) where.listingId = listingId;

    const logs = await this.prisma.marketplaceSyncLog.findMany({
      where,
      include: { listing: true, channel: true },
      orderBy: [{ createdAt: 'desc' }],
      take: 200,
    });
    return { logs };
  }

  @Get('stats')
  @RequirePermissions('ecommerce.marketplace.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;

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

  @Get(':id')
  @RequirePermissions('ecommerce.marketplace.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const listing = await this.prisma.marketplaceListing.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { channel: true, item: true },
    });
    if (!listing) throw new NotFoundException('Listing tidak ditemukan');
    return { listing };
  }

  @Post()
  @RequirePermissions('ecommerce.marketplace.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: {
      channelId: string;
      itemId?: string;
      productName: string;
      productSku: string;
      marketplaceProductId?: string;
      marketplaceUrl?: string;
      sellingPrice: number;
      stockQty: number;
      syncStock: boolean;
      syncPrice: boolean;
      notes?: string;
    },
  ) {
    const listing = await this.prisma.marketplaceListing.create({
      data: {
        tenantId: req.user.tenantId!,
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
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'MarketplaceListing',
      entityId: listing.id,
    });

    return { listing };
  }

  @Put(':id')
  @RequirePermissions('ecommerce.marketplace.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: {
      channelId?: string;
      productName?: string;
      productSku?: string;
      marketplaceProductId?: string;
      marketplaceUrl?: string;
      sellingPrice?: number;
      stockQty?: number;
      syncStock?: boolean;
      syncPrice?: boolean;
      notes?: string;
      isActive?: boolean;
    },
  ) {
    const exists = await this.prisma.marketplaceListing.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!exists) throw new NotFoundException('Listing tidak ditemukan');

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
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'MarketplaceListing',
      entityId: listing.id,
    });

    return { listing };
  }

  @Post(':id/sync')
  @RequirePermissions('ecommerce.marketplace.sync')
  async sync(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const listing = await this.prisma.marketplaceListing.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { channel: true },
    });
    if (!listing) throw new NotFoundException('Listing tidak ditemukan');

    // Simulate sync to marketplace
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
        tenantId: req.user.tenantId!,
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

  @Post('sync-all')
  @RequirePermissions('ecommerce.marketplace.sync')
  async syncAll(@Req() req: FastifyRequest & { user: AuthUser }) {
    const pending = await this.prisma.marketplaceListing.findMany({
      where: { tenantId: req.user.tenantId!, isActive: true },
      include: { channel: true },
    });

    let success = 0, failed = 0;
    const results = [];

    for (const listing of pending) {
      const syncSuccess = Math.random() > 0.15;
      if (syncSuccess) success++;
      else failed++;

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
          tenantId: req.user.tenantId!,
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

  @Delete(':id')
  @RequirePermissions('ecommerce.marketplace.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const exists = await this.prisma.marketplaceListing.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!exists) throw new NotFoundException('Listing tidak ditemukan');

    await this.prisma.marketplaceListing.delete({ where: { id } });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'delete',
      entity: 'MarketplaceListing',
      entityId: id,
    });

    return { success: true };
  }
}
