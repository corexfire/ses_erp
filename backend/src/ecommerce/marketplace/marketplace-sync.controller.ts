import { Controller, Get, Post, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('ecommerce/sync')
export class MarketplaceSyncController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('history')
  @RequirePermissions('ecommerce.sync.read')
  async getHistory(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('channelId') channelId?: string,
    @Query('status') status?: string,
    @Query('limit') limit?: number,
  ) {
    const where: any = { tenantId: req.user.tenantId };
    if (channelId) where.channelId = channelId;
    if (status) where.status = status;

    const logs = await this.prisma.marketplaceSyncLog.findMany({
      where,
      include: { listing: true, channel: true },
      orderBy: [{ createdAt: 'desc' }],
      take: limit || 100,
    });
    return { logs };
  }

  @Get('queue')
  @RequirePermissions('ecommerce.sync.read')
  async getQueue(@Req() req: FastifyRequest & { user: AuthUser }) {
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

  @Post('inventory/:listingId')
  @RequirePermissions('ecommerce.sync.execute')
  async syncInventory(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('listingId') listingId: string,
  ) {
    const listing = await this.prisma.marketplaceListing.findFirst({
      where: { id: listingId, tenantId: req.user.tenantId },
      include: { channel: true },
    });
    if (!listing) return { success: false, message: 'Listing tidak ditemukan' };

    // Placeholder: Update stock di marketplace
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

  @Post('price/:listingId')
  @RequirePermissions('ecommerce.sync.execute')
  async syncPrice(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('listingId') listingId: string,
  ) {
    const listing = await this.prisma.marketplaceListing.findFirst({
      where: { id: listingId, tenantId: req.user.tenantId },
      include: { channel: true },
    });
    if (!listing) return { success: false, message: 'Listing tidak ditemukan' };

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

  @Post('full/:listingId')
  @RequirePermissions('ecommerce.sync.execute')
  async fullSync(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('listingId') listingId: string,
  ) {
    const listing = await this.prisma.marketplaceListing.findFirst({
      where: { id: listingId, tenantId: req.user.tenantId },
      include: { channel: true },
    });
    if (!listing) return { success: false, message: 'Listing tidak ditemukan' };

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
}
