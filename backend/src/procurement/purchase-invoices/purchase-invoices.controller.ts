import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { ProcurementDocStatus } from '../../../prisma/generated/client';
import { CreatePurchaseInvoiceDto } from './dto/create-purchase-invoice.dto';
import { UpdatePurchaseInvoiceDto } from './dto/update-purchase-invoice.dto';

const procurementStatusSet = new Set<ProcurementDocStatus>([
  'DRAFT',
  'SUBMITTED',
  'PENDING_APPROVAL',
  'APPROVED',
  'REJECTED',
  'CLOSED',
  'VOID',
]);
const isProcurementDocStatus = (
  value?: string,
): value is ProcurementDocStatus =>
  Boolean(value) && procurementStatusSet.has(value as ProcurementDocStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('procurement/invoices')
export class PurchaseInvoicesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  private async validateTaxCodes(input: {
    tenantId: string;
    taxCodeIds: string[];
  }) {
    const ids = input.taxCodeIds.map((x) => x.trim()).filter(Boolean);
    if (ids.length === 0) return;
    const uniqueCount = new Set(ids).size;
    const count = await this.prisma.taxCode.count({
      where: { tenantId: input.tenantId, id: { in: ids } },
    });
    if (count !== uniqueCount)
      throw new NotFoundException('Tax code not found');
  }

  @Get()
  @RequirePermissions('procurement.invoice.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('status') status?: string,
  ) {
    const purchaseInvoices = await this.prisma.purchaseInvoice.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(isProcurementDocStatus(status) ? { status } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { supplier: true, order: true },
      take: 200,
    });
    return { purchaseInvoices };
  }

  @Get(':id')
  @RequirePermissions('procurement.invoice.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const purchaseInvoice = await this.prisma.purchaseInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        supplier: true,
        order: true,
        items: { orderBy: [{ lineNo: 'asc' }], include: { taxCode: true } },
        landedCosts: true,
        returns: true,
      },
    });
    if (!purchaseInvoice)
      throw new NotFoundException('Purchase invoice not found');
    return { purchaseInvoice };
  }

  @Post()
  @RequirePermissions('procurement.invoice.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreatePurchaseInvoiceDto,
  ) {
    const supplier = await this.prisma.supplier.findFirst({
      where: { id: body.supplierId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');

    if (body.orderId) {
      const po = await this.prisma.purchaseOrder.findFirst({
        where: { id: body.orderId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!po) throw new NotFoundException('Purchase order not found');
    }

    await this.validateTaxCodes({
      tenantId: req.user.tenantId!,
      taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
    });

    const purchaseInvoice = await this.prisma.$transaction(async (tx) => {
      const inv = await tx.purchaseInvoice.create({
        data: {
          tenantId: req.user.tenantId!,
          code: body.code,
          supplierId: body.supplierId,
          orderId: body.orderId,
          invoiceDate: new Date(body.invoiceDate),
          notes: body.notes,
        },
      });
      if (body.items.length > 0) {
        await tx.purchaseInvoiceItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId!,
            invoiceId: inv.id,
            lineNo: idx + 1,
            description: it.description,
            qty: it.qty,
            uomCode: it.uomCode,
            unitPrice: it.unitPrice,
            discount: it.discount,
            taxCodeId: it.taxCodeId,
          })),
        });
      }
      return inv;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'PurchaseInvoice',
      entityId: purchaseInvoice.id,
    });

    return { purchaseInvoice };
  }

  @Patch(':id')
  @RequirePermissions('procurement.invoice.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdatePurchaseInvoiceDto,
  ) {
    const exists = await this.prisma.purchaseInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Purchase invoice not found');

    if (body.items) {
      await this.validateTaxCodes({
        tenantId: req.user.tenantId!,
        taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
      });
    }

    const purchaseInvoice = await this.prisma.$transaction(async (tx) => {
      const inv = await tx.purchaseInvoice.update({
        where: { id },
        data: {
          invoiceDate: body.invoiceDate
            ? new Date(body.invoiceDate)
            : undefined,
          notes: body.notes ?? undefined,
        },
      });
      if (body.items) {
        await tx.purchaseInvoiceItem.deleteMany({
          where: { tenantId: req.user.tenantId!, invoiceId: id },
        });
        if (body.items.length > 0) {
          await tx.purchaseInvoiceItem.createMany({
            data: body.items.map((it, idx) => ({
              tenantId: req.user.tenantId!,
              invoiceId: id,
              lineNo: idx + 1,
              description: it.description,
              qty: it.qty,
              uomCode: it.uomCode,
              unitPrice: it.unitPrice,
              discount: it.discount,
              taxCodeId: it.taxCodeId,
            })),
          });
        }
      }
      return inv;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'PurchaseInvoice',
      entityId: purchaseInvoice.id,
    });

    return { purchaseInvoice };
  }

  @Post(':id/submit')
  @RequirePermissions('procurement.invoice.submit')
  async submit(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const purchaseInvoice = await this.prisma.purchaseInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { 
        items: { include: { taxCode: true } },
        supplier: true,
      },
    });
    if (!purchaseInvoice) throw new NotFoundException('Purchase invoice not found');

    let subTotal = 0;
    let totalTax = 0;
    const lineBreakdown: { description: string; baseAmount: number; taxAmount: number; taxCodeId: string | null }[] = [];

    for (const it of purchaseInvoice.items) {
      const qty = Number(it.qty) || 0;
      const price = Number(it.unitPrice) || 0;
      const disc = Number(it.discount) || 0;
      const baseAmount = (qty * price) * (1 - disc / 100);

      let taxAmount = 0;
      if (it.taxCodeId && it.taxCode) {
        const rate = Number(it.taxCode.rate) || 0;
        taxAmount = baseAmount * (rate > 1 ? rate / 100 : rate);
      }

      subTotal += baseAmount;
      totalTax += taxAmount;
      lineBreakdown.push({
        description: it.description,
        baseAmount,
        taxAmount,
        taxCodeId: it.taxCodeId,
      });
    }

    const cTot = subTotal + totalTax;

    const updatedInvoice = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.purchaseInvoice.update({
        where: { id },
        data: { status: 'SUBMITTED' },
      });

      const rnd = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
      const jeNo = `JE-PI-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${rnd}`;

       const journal = await tx.journalEntry.create({
         data: {
           tenantId: req.user.tenantId!,
           entryNo: jeNo,
           entryDate: new Date(),
           description: `Purchase Invoice Posting for ${purchaseInvoice.code} - ${purchaseInvoice.supplier?.name || 'Supplier'}`,
           referenceNo: purchaseInvoice.code,
           journalType: 'PURCHASE',
           status: 'POSTED',
           totalDebit: cTot,
           totalCredit: cTot,
         }
       });

      const journalLines: any[] = [];
      let lineNo = 1;

      // Debit: Inventory/Expense
      journalLines.push({
        tenantId: req.user.tenantId!,
        journalEntryId: journal.id,
        lineNo: lineNo++,
        accountCode: '1-1310-00',
        description: `Pembelian - ${purchaseInvoice.code}`,
        debit: subTotal,
        credit: 0,
        referenceId: purchaseInvoice.id,
      });

      // Debit: PPN Masukan (VAT Input) - 进项税
      if (totalTax > 0) {
        journalLines.push({
          tenantId: req.user.tenantId!,
          journalEntryId: journal.id,
          lineNo: lineNo++,
          accountCode: '1-1510-00',
          description: `PPN Masukan 11% - ${purchaseInvoice.code}`,
          debit: totalTax,
          credit: 0,
          referenceId: purchaseInvoice.id,
        });
      }

      // Credit: AP (Hutang Usaha)
      journalLines.push({
        tenantId: req.user.tenantId!,
        journalEntryId: journal.id,
        lineNo: lineNo++,
        accountCode: '2-1100-00',
        description: `Hutang Usaha - ${purchaseInvoice.supplier?.name || 'Supplier'}`,
        debit: 0,
        credit: cTot,
        referenceId: purchaseInvoice.id,
      });

      await tx.journalEntryLine.createMany({ data: journalLines });

      return updated;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'submit',
      entity: 'PurchaseInvoice',
      entityId: purchaseInvoice.id,
    });

    return { 
      purchaseInvoice: updatedInvoice,
      journal: {
        subTotal,
        totalTax,
        grandTotal: cTot,
        lines: lineBreakdown,
      }
    };
  }
}
