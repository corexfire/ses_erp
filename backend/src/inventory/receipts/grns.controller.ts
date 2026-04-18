import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { InventoryDocStatus } from '../../../prisma/generated/client';
import { CreateGrnDto } from './dto/create-grn.dto';
import { UpdateGrnDto } from './dto/update-grn.dto';

const inventoryStatusSet = new Set<InventoryDocStatus>([
  'DRAFT',
  'SUBMITTED',
  'POSTED',
  'VOID',
]);
const isInventoryDocStatus = (value?: string): value is InventoryDocStatus =>
  Boolean(value) && inventoryStatusSet.has(value as InventoryDocStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/grns')
export class GrnsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('inventory.grn.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('q') q?: string, @Query('status') status?: string) {
    const grns = await this.prisma.goodsReceiptNote.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(isInventoryDocStatus(status) ? { status } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { supplier: true, purchaseOrder: true, purchaseInvoice: true, warehouse: true },
      take: 200,
    });
    return { grns };
  }

  @Get(':id')
  @RequirePermissions('inventory.grn.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const grn = await this.prisma.goodsReceiptNote.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        supplier: true,
        purchaseOrder: true,
        purchaseInvoice: true,
        warehouse: true,
        items: { orderBy: [{ lineNo: 'asc' }], include: { item: true, binLocation: true } },
        qcInspections: true,
      },
    });
    if (!grn) throw new NotFoundException('GRN not found');
    return { grn };
  }

  @Post()
  @RequirePermissions('inventory.grn.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateGrnDto) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { id: body.warehouseId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    if (body.supplierId) {
      const supplier = await this.prisma.supplier.findFirst({
        where: { id: body.supplierId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!supplier) throw new NotFoundException('Supplier not found');
    }

    if (body.purchaseOrderId) {
      const po = await this.prisma.purchaseOrder.findFirst({
        where: { id: body.purchaseOrderId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!po) throw new NotFoundException('Purchase order not found');
    }

    if (body.purchaseInvoiceId) {
      const inv = await this.prisma.purchaseInvoice.findFirst({
        where: { id: body.purchaseInvoiceId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!inv) throw new NotFoundException('Purchase invoice not found');
    }

    if (body.items.some((it) => it.binLocationId)) {
      const binIds = Array.from(
        new Set(body.items.map((it) => it.binLocationId).filter(Boolean) as string[]),
      );
      const count = await this.prisma.binLocation.count({
        where: { tenantId: req.user.tenantId!, warehouseId: body.warehouseId, id: { in: binIds } },
      });
      if (count !== binIds.length) throw new NotFoundException('Bin not found');
    }

    if (body.items.some((it) => it.itemId)) {
      const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean) as string[]));
      const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId!, id: { in: itemIds } } });
      if (count !== itemIds.length) throw new NotFoundException('Item not found');
    }

    const grn = await this.prisma.$transaction(async (tx) => {
      const created = await tx.goodsReceiptNote.create({
        data: {
          tenantId: req.user.tenantId!,
          code: body.code,
          receiptDate: new Date(body.receiptDate),
          warehouseId: body.warehouseId,
          supplierId: body.supplierId,
          purchaseOrderId: body.purchaseOrderId,
          purchaseInvoiceId: body.purchaseInvoiceId,
          notes: body.notes,
        },
      });

      if (body.items.length > 0) {
        await tx.goodsReceiptItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId!,
            grnId: created.id,
            lineNo: idx + 1,
            itemId: it.itemId,
            description: it.description,
            qty: it.qty,
            uomCode: it.uomCode,
            warehouseId: body.warehouseId,
            binLocationId: it.binLocationId,
            batchCode: it.batchCode,
            serialNo: it.serialNo,
          })),
        });
      }

      return created;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'GoodsReceiptNote',
      entityId: grn.id,
    });

    return { grn };
  }

  @Patch(':id')
  @RequirePermissions('inventory.grn.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: UpdateGrnDto) {
    const existing = await this.prisma.goodsReceiptNote.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, status: true, warehouseId: true },
    });
    if (!existing) throw new NotFoundException('GRN not found');
    if (existing.status === 'POSTED') throw new ForbiddenException('GRN already posted');

    const nextWarehouseId = body.warehouseId ?? existing.warehouseId;

    if (body.warehouseId) {
      const warehouse = await this.prisma.warehouse.findFirst({
        where: { id: body.warehouseId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!warehouse) throw new NotFoundException('Warehouse not found');
    }

    if (body.supplierId) {
      const supplier = await this.prisma.supplier.findFirst({
        where: { id: body.supplierId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!supplier) throw new NotFoundException('Supplier not found');
    }

    if (body.purchaseOrderId) {
      const po = await this.prisma.purchaseOrder.findFirst({
        where: { id: body.purchaseOrderId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!po) throw new NotFoundException('Purchase order not found');
    }

    if (body.purchaseInvoiceId) {
      const inv = await this.prisma.purchaseInvoice.findFirst({
        where: { id: body.purchaseInvoiceId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!inv) throw new NotFoundException('Purchase invoice not found');
    }

    if (body.items?.some((it) => it.binLocationId)) {
      const binIds = Array.from(new Set(body.items.map((it) => it.binLocationId).filter(Boolean) as string[]));
      const count = await this.prisma.binLocation.count({
        where: { tenantId: req.user.tenantId!, warehouseId: nextWarehouseId, id: { in: binIds } },
      });
      if (count !== binIds.length) throw new NotFoundException('Bin not found');
    }

    if (body.items?.some((it) => it.itemId)) {
      const itemIds = Array.from(new Set(body.items.map((it) => it.itemId).filter(Boolean) as string[]));
      const count = await this.prisma.item.count({ where: { tenantId: req.user.tenantId!, id: { in: itemIds } } });
      if (count !== itemIds.length) throw new NotFoundException('Item not found');
    }

    const grn = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.goodsReceiptNote.update({
        where: { id },
        data: {
          receiptDate: body.receiptDate ? new Date(body.receiptDate) : undefined,
          warehouseId: body.warehouseId ?? undefined,
          supplierId: body.supplierId ?? undefined,
          purchaseOrderId: body.purchaseOrderId ?? undefined,
          purchaseInvoiceId: body.purchaseInvoiceId ?? undefined,
          notes: body.notes ?? undefined,
        },
      });

      if (body.items) {
        await tx.goodsReceiptItem.deleteMany({ where: { tenantId: req.user.tenantId!, grnId: id } });
        if (body.items.length > 0) {
          await tx.goodsReceiptItem.createMany({
            data: body.items.map((it, idx) => ({
              tenantId: req.user.tenantId!,
              grnId: id,
              lineNo: idx + 1,
              itemId: it.itemId,
              description: it.description,
              qty: it.qty,
              uomCode: it.uomCode,
              warehouseId: updated.warehouseId,
              binLocationId: it.binLocationId,
              batchCode: it.batchCode,
              serialNo: it.serialNo,
            })),
          });
        }
      }

      return updated;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'GoodsReceiptNote',
      entityId: grn.id,
    });

    return { grn };
  }

@Post(':id/post')
  @RequirePermissions('inventory.grn.post')
  async post(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const grn = await this.prisma.goodsReceiptNote.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { items: true },
    });
    if (!grn) throw new NotFoundException('GRN not found');
    if (grn.status === 'POSTED') throw new ForbiddenException('GRN already posted');

     // Calculate total GRN value for JE
     let totalGrnValue = 0;
     for (const it of grn.items) {
       const qty = parseFloat(String(it.qty || 0));
       const price = 0; // Placeholder: unitPrice not on GoodsReceiptItem
       totalGrnValue += qty * price;
     }

    const posted = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.goodsReceiptNote.update({ where: { id }, data: { status: 'POSTED' } });

      for (const it of grn.items) {
        let batchId: string | undefined;
        let serialId: string | undefined;

        if (it.itemId && it.batchCode) {
          const batch = await tx.itemBatch.upsert({
            where: { tenantId_itemId_code: { tenantId: req.user.tenantId!, itemId: it.itemId, code: it.batchCode } },
            update: {},
            create: { tenantId: req.user.tenantId!, itemId: it.itemId, code: it.batchCode },
            select: { id: true },
          });
          batchId = batch.id;
        }

        if (it.itemId && it.serialNo) {
          const serial = await tx.itemSerial.upsert({
            where: { tenantId_serialNo: { tenantId: req.user.tenantId!, serialNo: it.serialNo } },
            update: { itemId: it.itemId },
            create: { tenantId: req.user.tenantId!, itemId: it.itemId, serialNo: it.serialNo },
            select: { id: true },
          });
          serialId = serial.id;
        }

        await tx.stockLedger.create({
          data: {
            tenantId: req.user.tenantId!,
            moveType: 'GRN_RECEIPT',
            refType: 'GRN',
            refId: grn.id,
            postingDate: grn.receiptDate,
            itemId: it.itemId,
            description: it.description,
            qtyIn: it.qty,
            qtyOut: '0',
            uomCode: it.uomCode,
            warehouseId: grn.warehouseId,
            binLocationId: it.binLocationId,
            batchId,
            serialId,
          },
        });
      }

      const existingQc = await tx.qcInspection.findFirst({
        where: { tenantId: req.user.tenantId!, grnId: grn.id },
        select: { id: true },
      });
      if (!existingQc) {
        await tx.qcInspection.create({
          data: { 
            tenantId: req.user.tenantId!, 
            grnId: grn.id, 
            status: 'DRAFT',
            code: `QC-${grn.code}`,
            inspectionDate: new Date()
          },
        });
      }

      // Create Journal Entry for Inventory Stock Ledger (Module → Subledger → GL pattern)
      if (totalGrnValue > 0) {
        const jeCount = await tx.journalEntry.count({ where: { tenantId: req.user.tenantId! } });
        const jeNo = `JE-GRN-${String(jeCount + 1).padStart(6, '0')}`;

         const journal = await tx.journalEntry.create({
           data: {
             tenantId: req.user.tenantId!,
             entryNo: jeNo,
             entryDate: grn.receiptDate,
             description: `GRN Receipt - ${grn.code}`,
             referenceNo: grn.code,
             journalType: 'INVENTORY',
             totalDebit: totalGrnValue,
             totalCredit: totalGrnValue,
             status: 'POSTED',
           }
         });

        await tx.journalEntryLine.createMany({
          data: [
            {
              tenantId: req.user.tenantId!,
              journalEntryId: journal.id,
              lineNo: 1,
              accountCode: '1-1310-00',
              description: 'Inventory - Stock In',
              debit: totalGrnValue,
              credit: 0,
              referenceId: grn.id,
            },
            {
              tenantId: req.user.tenantId!,
              journalEntryId: journal.id,
              lineNo: 2,
              accountCode: '2-1200-00',
              description: 'Inventory Transit / GRN',
              debit: 0,
              credit: totalGrnValue,
              referenceId: grn.id,
            }
          ]
        });
      }

      return updated;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'post',
      entity: 'GoodsReceiptNote',
      entityId: posted.id,
    });

    return { grn: posted };
  }
}
