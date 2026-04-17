import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/stock')
export class StockController {
  constructor(private readonly prisma: PrismaService) {}

  private toNumber(value: unknown) {
    const n = parseFloat(String(value ?? '0'));
    return Number.isFinite(n) ? n : 0;
  }

  @Get('ledger')
  @RequirePermissions('inventory.stock.read')
  async ledger(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('itemId') itemId?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('binLocationId') binLocationId?: string,
    @Query('refType') refType?: string,
    @Query('refId') refId?: string,
  ) {
    const lines = await this.prisma.stockLedger.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(itemId ? { itemId } : {}),
        ...(warehouseId ? { warehouseId } : {}),
        ...(binLocationId ? { binLocationId } : {}),
        ...(refType ? { refType } : {}),
        ...(refId ? { refId } : {}),
      },
      orderBy: [{ postingDate: 'desc' }, { createdAt: 'desc' }],
      include: { item: true, warehouse: true, binLocation: true },
      take: 500,
    });
    return { lines };
  }

  @Get('summary')
  @RequirePermissions('inventory.stock.read')
  async summary(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('warehouseId') warehouseId?: string,
    @Query('itemId') itemId?: string,
  ) {
    const grouped = await this.prisma.stockLedger.groupBy({
      by: ['itemId', 'warehouseId', 'binLocationId'],
      where: {
        tenantId: req.user.tenantId,
        ...(warehouseId ? { warehouseId } : {}),
        ...(itemId ? { itemId } : {}),
      },
      _sum: { qtyIn: true, qtyOut: true },
      orderBy: [{ warehouseId: 'asc' }, { itemId: 'asc' }],
      take: 500,
    });

    const itemIds = grouped.map((g) => g.itemId).filter(Boolean) as string[];
    const warehouseIds = grouped.map((g) => g.warehouseId).filter(Boolean) as string[];
    const binIds = grouped.map((g) => g.binLocationId).filter(Boolean) as string[];

    const [items, warehouses, bins] = await Promise.all([
      itemIds.length > 0
        ? this.prisma.item.findMany({
            where: { tenantId: req.user.tenantId, id: { in: Array.from(new Set(itemIds)) } },
            select: { id: true, code: true, name: true },
          })
        : Promise.resolve([]),
      warehouseIds.length > 0
        ? this.prisma.warehouse.findMany({
            where: { tenantId: req.user.tenantId, id: { in: Array.from(new Set(warehouseIds)) } },
            select: { id: true, code: true, name: true },
          })
        : Promise.resolve([]),
      binIds.length > 0
        ? this.prisma.binLocation.findMany({
            where: { tenantId: req.user.tenantId, id: { in: Array.from(new Set(binIds)) } },
            select: { id: true, code: true, name: true, warehouseId: true },
          })
        : Promise.resolve([]),
    ]);

    const itemById = new Map(items.map((x) => [x.id, x]));
    const warehouseById = new Map(warehouses.map((x) => [x.id, x]));
    const binById = new Map(bins.map((x) => [x.id, x]));

    const rows = grouped.map((g) => {
      const qtyIn = g._sum.qtyIn ?? '0';
      const qtyOut = g._sum.qtyOut ?? '0';
      const qtyOnHand = (this.toNumber(qtyIn) - this.toNumber(qtyOut)).toFixed(4);
      return {
        itemId: g.itemId,
        warehouseId: g.warehouseId,
        binLocationId: g.binLocationId,
        item: g.itemId ? itemById.get(g.itemId) ?? null : null,
        warehouse: warehouseById.get(g.warehouseId) ?? null,
        binLocation: g.binLocationId ? binById.get(g.binLocationId) ?? null : null,
        qtyIn: String(qtyIn),
        qtyOut: String(qtyOut),
        qtyOnHand,
      };
    });

    return { rows };
  }
}
