import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { InventoryDocStatus } from '../../../prisma/generated/client';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';

const inventoryStatusSet = new Set<InventoryDocStatus>([
  'DRAFT',
  'SUBMITTED',
  'POSTED',
  'VOID',
]);
const isInventoryDocStatus = (value?: string): value is InventoryDocStatus =>
  Boolean(value) && inventoryStatusSet.has(value as InventoryDocStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/transfers')
export class TransfersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('inventory.transfer.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('q') q?: string, @Query('status') status?: string) {
    const transfers = await this.prisma.stockTransfer.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(isInventoryDocStatus(status) ? { status } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { fromWarehouse: true, toWarehouse: true },
      take: 200,
    });
    return { transfers };
  }

  @Get(':id')
  @RequirePermissions('inventory.transfer.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const transfer = await this.prisma.stockTransfer.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        fromWarehouse: true,
        toWarehouse: true,
        items: {
          orderBy: [{ lineNo: 'asc' }],
          include: { item: true, fromBinLocation: true, toBinLocation: true },
        },
      },
    });
    if (!transfer) throw new NotFoundException('Transfer not found');
    return { transfer };
  }

  @Post()
  @RequirePermissions('inventory.transfer.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateTransferDto) {
    const fromWh = await this.prisma.warehouse.findFirst({ where: { id: body.fromWarehouseId, tenantId: req.user.tenantId }, select: { id: true } });
    if (!fromWh) throw new NotFoundException('From warehouse not found');
    const toWh = await this.prisma.warehouse.findFirst({ where: { id: body.toWarehouseId, tenantId: req.user.tenantId }, select: { id: true } });
    if (!toWh) throw new NotFoundException('To warehouse not found');

    if (body.items.some((it) => it.itemId)) {
      const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean) as string[]));
      const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId, id: { in: itemIds } } });
      if (count !== itemIds.length) throw new NotFoundException('Item not found');
    }

    const transfer = await this.prisma.$transaction(async (tx) => {
      const tr = await tx.stockTransfer.create({
        data: {
          tenantId: req.user.tenantId,
          code: body.code,
          transferDate: new Date(body.transferDate),
          fromWarehouseId: body.fromWarehouseId,
          toWarehouseId: body.toWarehouseId,
          notes: body.notes,
        },
      });
      if (body.items.length > 0) {
        await tx.stockTransferItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId,
            transferId: tr.id,
            lineNo: idx + 1,
            itemId: it.itemId,
            description: it.description,
            qty: it.qty,
            uomCode: it.uomCode,
            fromBinLocationId: it.fromBinLocationId,
            toBinLocationId: it.toBinLocationId,
            batchCode: it.batchCode,
            serialNo: it.serialNo,
          })),
        });
      }
      return tr;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'StockTransfer',
      entityId: transfer.id,
    });

    return { transfer };
  }

  @Patch(':id')
  @RequirePermissions('inventory.transfer.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: UpdateTransferDto) {
    const existing = await this.prisma.stockTransfer.findFirst({ where: { id, tenantId: req.user.tenantId }, select: { id: true, status: true } });
    if (!existing) throw new NotFoundException('Transfer not found');
    if (existing.status === 'POSTED') throw new ForbiddenException('Transfer already posted');

    if (body.items?.some((it) => it.itemId)) {
      const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean) as string[]));
      const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId, id: { in: itemIds } } });
      if (count !== itemIds.length) throw new NotFoundException('Item not found');
    }

    const transfer = await this.prisma.$transaction(async (tx) => {
      const tr = await tx.stockTransfer.update({
        where: { id },
        data: { transferDate: body.transferDate ? new Date(body.transferDate) : undefined, notes: body.notes ?? undefined },
      });
      if (body.items) {
        await tx.stockTransferItem.deleteMany({ where: { tenantId: req.user.tenantId, transferId: id } });
        if (body.items.length > 0) {
          await tx.stockTransferItem.createMany({
            data: body.items.map((it, idx) => ({
              tenantId: req.user.tenantId,
              transferId: id,
              lineNo: idx + 1,
              itemId: it.itemId,
              description: it.description,
              qty: it.qty,
              uomCode: it.uomCode,
              fromBinLocationId: it.fromBinLocationId,
              toBinLocationId: it.toBinLocationId,
              batchCode: it.batchCode,
              serialNo: it.serialNo,
            })),
          });
        }
      }
      return tr;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'StockTransfer',
      entityId: transfer.id,
    });

    return { transfer };
  }

  @Post(':id/post')
  @RequirePermissions('inventory.transfer.post')
  async post(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const transfer = await this.prisma.stockTransfer.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { items: { orderBy: [{ lineNo: 'asc' }] } },
    });
    if (!transfer) throw new NotFoundException('Transfer not found');
    if (transfer.status === 'POSTED') throw new ForbiddenException('Transfer already posted');

    const posted = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.stockTransfer.update({ where: { id }, data: { status: 'POSTED' } });

      for (const it of transfer.items) {
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

        await tx.stockLedger.create({
          data: {
            tenantId: req.user.tenantId,
            moveType: 'TRANSFER_OUT',
            refType: 'TRANSFER',
            refId: transfer.id,
            postingDate: transfer.transferDate,
            itemId: it.itemId,
            description: it.description,
            qtyIn: '0',
            qtyOut: it.qty,
            uomCode: it.uomCode,
            warehouseId: transfer.fromWarehouseId,
            binLocationId: it.fromBinLocationId,
            batchId,
            serialId,
          },
        });

        await tx.stockLedger.create({
          data: {
            tenantId: req.user.tenantId,
            moveType: 'TRANSFER_IN',
            refType: 'TRANSFER',
            refId: transfer.id,
            postingDate: transfer.transferDate,
            itemId: it.itemId,
            description: it.description,
            qtyIn: it.qty,
            qtyOut: '0',
            uomCode: it.uomCode,
            warehouseId: transfer.toWarehouseId,
            binLocationId: it.toBinLocationId,
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
      entity: 'StockTransfer',
      entityId: posted.id,
    });

    return { transfer: posted };
  }
}
