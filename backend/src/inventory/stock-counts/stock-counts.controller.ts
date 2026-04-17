import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockCountDto } from './dto/create-stock-count.dto';
import { UpdateStockCountDto } from './dto/update-stock-count.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/stock-counts')
export class StockCountsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  private toNumber(value: unknown) {
    const n = parseFloat(String(value ?? '0'));
    return Number.isFinite(n) ? n : 0;
  }

  private async currentQty(input: {
    tenantId: string;
    warehouseId: string;
    binLocationId?: string | null;
    itemId?: string | null;
    batchId?: string | null;
    serialId?: string | null;
  }) {
    const agg = await this.prisma.stockLedger.aggregate({
      where: {
        tenantId: input.tenantId,
        warehouseId: input.warehouseId,
        ...(input.binLocationId ? { binLocationId: input.binLocationId } : {}),
        ...(input.itemId ? { itemId: input.itemId } : {}),
        ...(input.batchId ? { batchId: input.batchId } : {}),
        ...(input.serialId ? { serialId: input.serialId } : {}),
      },
      _sum: { qtyIn: true, qtyOut: true },
    });
    return this.toNumber(agg._sum.qtyIn) - this.toNumber(agg._sum.qtyOut);
  }

  @Get()
  @RequirePermissions('inventory.stock_opname.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('q') q?: string, @Query('status') status?: string) {
    const stockCounts = await this.prisma.stockCount.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(status ? { status: status as any } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { warehouse: true },
      take: 200,
    });
    return { stockCounts };
  }

  @Get(':id')
  @RequirePermissions('inventory.stock_opname.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const stockCount = await this.prisma.stockCount.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { warehouse: true, items: { orderBy: [{ lineNo: 'asc' }], include: { item: true, binLocation: true } } },
    });
    if (!stockCount) throw new NotFoundException('Stock count not found');
    return { stockCount };
  }

  @Post()
  @RequirePermissions('inventory.stock_opname.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateStockCountDto) {
    const wh = await this.prisma.warehouse.findFirst({ where: { id: body.warehouseId, tenantId: req.user.tenantId }, select: { id: true } });
    if (!wh) throw new NotFoundException('Warehouse not found');

    if (body.items.some((it) => it.itemId)) {
      const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean) as string[]));
      const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId, id: { in: itemIds } } });
      if (count !== itemIds.length) throw new NotFoundException('Item not found');
    }

    const stockCount = await this.prisma.$transaction(async (tx) => {
      const sc = await tx.stockCount.create({
        data: {
          tenantId: req.user.tenantId,
          code: body.code,
          countDate: new Date(body.countDate),
          warehouseId: body.warehouseId,
          notes: body.notes,
        },
      });
      if (body.items.length > 0) {
        await tx.stockCountItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId,
            stockCountId: sc.id,
            lineNo: idx + 1,
            itemId: it.itemId,
            description: it.description,
            countedQty: it.countedQty,
            uomCode: it.uomCode,
            binLocationId: it.binLocationId,
            batchCode: it.batchCode,
            serialNo: it.serialNo,
          })),
        });
      }
      return sc;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'StockCount',
      entityId: stockCount.id,
    });

    return { stockCount };
  }

  @Patch(':id')
  @RequirePermissions('inventory.stock_opname.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: UpdateStockCountDto) {
    const existing = await this.prisma.stockCount.findFirst({ where: { id, tenantId: req.user.tenantId }, select: { id: true, status: true, warehouseId: true } });
    if (!existing) throw new NotFoundException('Stock count not found');
    if (existing.status === 'POSTED') throw new ForbiddenException('Stock count already posted');

    if (body.items?.some((it) => it.itemId)) {
      const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean) as string[]));
      const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId, id: { in: itemIds } } });
      if (count !== itemIds.length) throw new NotFoundException('Item not found');
    }

    const stockCount = await this.prisma.$transaction(async (tx) => {
      const sc = await tx.stockCount.update({
        where: { id },
        data: { countDate: body.countDate ? new Date(body.countDate) : undefined, notes: body.notes ?? undefined },
      });
      if (body.items) {
        await tx.stockCountItem.deleteMany({ where: { tenantId: req.user.tenantId, stockCountId: id } });
        if (body.items.length > 0) {
          await tx.stockCountItem.createMany({
            data: body.items.map((it, idx) => ({
              tenantId: req.user.tenantId,
              stockCountId: id,
              lineNo: idx + 1,
              itemId: it.itemId,
              description: it.description,
              countedQty: it.countedQty,
              uomCode: it.uomCode,
              binLocationId: it.binLocationId,
              batchCode: it.batchCode,
              serialNo: it.serialNo,
            })),
          });
        }
      }
      return sc;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'StockCount',
      entityId: stockCount.id,
    });

    return { stockCount };
  }

  @Post(':id/post')
  @RequirePermissions('inventory.stock_opname.post')
  async post(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const stockCount = await this.prisma.stockCount.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { items: { orderBy: [{ lineNo: 'asc' }] } },
    });
    if (!stockCount) throw new NotFoundException('Stock count not found');
    if (stockCount.status === 'POSTED') throw new ForbiddenException('Stock count already posted');

    const posted = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.stockCount.update({ where: { id }, data: { status: 'POSTED' } });

      for (const it of stockCount.items) {
        let batchId: string | undefined;
        let serialId: string | undefined;

        if (it.itemId && it.batchCode) {
          const batch = await tx.itemBatch.upsert({
            where: { tenantId_itemId_code: { tenantId: req.user.tenantId, itemId: it.itemId, code: it.batchCode } },
            update: {},
            create: { tenantId: req.user.tenantId, itemId: it.itemId, code: it.batchCode },
            select: { id: true },
          });
          batchId = batch.id;
        }

        if (it.itemId && it.serialNo) {
          const serial = await tx.itemSerial.upsert({
            where: { tenantId_serialNo: { tenantId: req.user.tenantId, serialNo: it.serialNo } },
            update: { itemId: it.itemId },
            create: { tenantId: req.user.tenantId, itemId: it.itemId, serialNo: it.serialNo },
            select: { id: true },
          });
          serialId = serial.id;
        }

        const current = await this.currentQty({
          tenantId: req.user.tenantId,
          warehouseId: stockCount.warehouseId,
          binLocationId: it.binLocationId,
          itemId: it.itemId,
          batchId,
          serialId,
        });
        const target = this.toNumber(it.countedQty);
        const diff = target - current;
        if (Math.abs(diff) < 0.0000001) continue;

        await tx.stockLedger.create({
          data: {
            tenantId: req.user.tenantId,
            moveType: 'STOCK_COUNT_ADJUST',
            refType: 'STOCK_COUNT',
            refId: stockCount.id,
            postingDate: stockCount.countDate,
            itemId: it.itemId,
            description: it.description,
            qtyIn: diff > 0 ? diff.toFixed(4) : '0',
            qtyOut: diff < 0 ? Math.abs(diff).toFixed(4) : '0',
            uomCode: it.uomCode,
            warehouseId: stockCount.warehouseId,
            binLocationId: it.binLocationId,
            batchId,
            serialId,
          },
        });
      }

      return updated;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'post',
      entity: 'StockCount',
      entityId: posted.id,
    });

    return { stockCount: posted };
  }
}
