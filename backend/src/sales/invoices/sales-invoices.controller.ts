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
import { CreateSalesInvoiceDto } from './dto/create-sales-invoice.dto';
import { UpdateSalesInvoiceDto } from './dto/update-sales-invoice.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('sales/invoices')
export class SalesInvoicesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  private toNumber(value: unknown) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    if (typeof value === 'string') {
      const n = parseFloat(value);
      return Number.isFinite(n) ? n : 0;
    }
    if (typeof value === 'bigint') return Number(value);
    if (typeof value === 'object' && value !== null) {
      const maybeToString = (value as { toString?: () => string }).toString;
      if (typeof maybeToString === 'function') {
        const n = parseFloat(maybeToString.call(value));
        return Number.isFinite(n) ? n : 0;
      }
    }
    return 0;
  }

  @Get()
  @RequirePermissions('sales.invoice.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const invoices = await this.prisma.salesInvoice.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { customer: true, order: true },
      take: 200,
    });
    return { invoices };
  }

  @Get(':id')
  @RequirePermissions('sales.invoice.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const invoice = await this.prisma.salesInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        customer: true,
        order: true,
        items: {
          orderBy: [{ lineNo: 'asc' }],
          include: { taxCode: true },
        },
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');

    const taxBreakdownMap = new Map<
      string,
      {
        taxCodeId: string | null;
        code: string;
        rate: string;
        baseAmount: number;
        taxAmount: number;
      }
    >();
    let subTotal = 0;
    let taxTotal = 0;

    for (const it of invoice.items) {
      const qty = this.toNumber(it.qty);
      const unitPrice = this.toNumber(it.unitPrice);
      const discountPct = this.toNumber(it.discount);
      const netUnitPrice = unitPrice * (1 - discountPct / 100);
      const baseAmount = qty * netUnitPrice;

      const rawRate = this.toNumber(it.taxCode?.rate ?? 0);
      const rate = rawRate > 1 ? rawRate / 100 : rawRate;
      const taxAmount = baseAmount * rate;

      subTotal += baseAmount;
      taxTotal += taxAmount;

      const key = it.taxCodeId ?? 'NO_TAX';
      const existing = taxBreakdownMap.get(key);
      const code = it.taxCode?.code ?? 'NO_TAX';
      const rateLabel = String(rawRate);
      if (existing) {
        existing.baseAmount += baseAmount;
        existing.taxAmount += taxAmount;
      } else {
        taxBreakdownMap.set(key, {
          taxCodeId: it.taxCodeId,
          code,
          rate: rateLabel,
          baseAmount,
          taxAmount,
        });
      }
    }

    const grandTotal = subTotal + taxTotal;
    const taxBreakdown = Array.from(taxBreakdownMap.values()).map((x) => ({
      ...x,
      baseAmount: x.baseAmount.toFixed(4),
      taxAmount: x.taxAmount.toFixed(4),
    }));

    return {
      invoice: {
        ...invoice,
        totals: {
          subTotal: subTotal.toFixed(4),
          taxTotal: taxTotal.toFixed(4),
          grandTotal: grandTotal.toFixed(4),
        },
        taxBreakdown,
      },
    };
  }

  @Post()
  @RequirePermissions('sales.invoice.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateSalesInvoiceDto,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where: { id: body.customerId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    if (body.orderId) {
      const order = await this.prisma.salesOrder.findFirst({
        where: { id: body.orderId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!order) throw new NotFoundException('Sales order not found');
    }

    const invoice = await this.prisma.$transaction(async (tx) => {
      const inv = await tx.salesInvoice.create({
        data: {
          tenantId: req.user.tenantId!,
          code: body.code,
          customerId: body.customerId,
          orderId: body.orderId,
          invoiceDate: new Date(body.invoiceDate),
          notes: body.notes,
        },
      });
      if (body.items.length > 0) {
        await tx.salesInvoiceItem.createMany({
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
      entity: 'SalesInvoice',
      entityId: invoice.id,
    });

    return { invoice };
  }

  @Patch(':id')
  @RequirePermissions('sales.invoice.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateSalesInvoiceDto,
  ) {
    const exists = await this.prisma.salesInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Invoice not found');

    const invoice = await this.prisma.$transaction(async (tx) => {
      const inv = await tx.salesInvoice.update({
        where: { id },
        data: {
          invoiceDate: body.invoiceDate
            ? new Date(body.invoiceDate)
            : undefined,
          notes: body.notes ?? undefined,
        },
      });
      if (body.items) {
        await tx.salesInvoiceItem.deleteMany({
          where: { tenantId: req.user.tenantId!, invoiceId: id },
        });
        if (body.items.length > 0) {
          await tx.salesInvoiceItem.createMany({
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
      entity: 'SalesInvoice',
      entityId: invoice.id,
    });

    return { invoice };
  }

  @Post(':id/submit')
  @RequirePermissions('sales.invoice.submit')
  async submit(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const invoice = await this.prisma.salesInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { 
        items: { include: { taxCode: true } },
        customer: true,
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');

    // Calculate subtotal and tax per line item
    let subTotal = 0;
    let totalTax = 0;
    const lineBreakdown: { 
      description: string; 
      baseAmount: number; 
      taxAmount: number; 
      taxCodeId: string | null;
    }[] = [];

    for (const it of invoice.items) {
      const qty = Number(it.qty) || 0;
      const price = Number(it.unitPrice) || 0;
      const disc = Number(it.discount) || 0;
      const baseAmount = (qty * price) * (1 - disc / 100);
      
      // Calculate tax from taxCode rate
      let taxAmount = 0;
      if (it.taxCodeId && it.taxCode) {
        const rate = Number(it.taxCode.rate) || 0;
        // Rate can be stored as 11 or 0.11 - normalize it
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

    const dTot = subTotal + totalTax;

    const updatedInvoice = await this.prisma.$transaction(async (tx) => {
      // Update invoice status
      const updated = await tx.salesInvoice.update({
        where: { id },
        data: { status: 'SUBMITTED' },
      });

      // Generate Journal Entry number
      const rnd = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
      const jeNo = `JE-SI-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${rnd}`;

      // Create Journal Entry
       const journal = await tx.journalEntry.create({
         data: {
           tenantId: req.user.tenantId!,
           entryNo: jeNo,
           entryDate: new Date(),
           description: `Sales Invoice Posting for ${invoice.code} - ${invoice.customer?.name || 'Customer'}`,
           referenceNo: invoice.code,
           journalType: 'SALES',
           status: 'POSTED',
           totalDebit: dTot,
           totalCredit: dTot,
         }
       });

      // Build journal lines dynamically
      const journalLines: any[] = [];
      let lineNo = 1;

      // Line 1: AR (Piutang Usaha) - Debit
      journalLines.push({
        tenantId: req.user.tenantId!,
        journalEntryId: journal.id,
        lineNo: lineNo++,
        accountCode: '1-1210-00',
        description: `Piutang Usaha - ${invoice.customer?.name || 'Customer'}`,
        debit: dTot,
        credit: 0,
        referenceId: invoice.id,
      });

      // Line 2: Sales Revenue - Credit
      journalLines.push({
        tenantId: req.user.tenantId!,
        journalEntryId: journal.id,
        lineNo: lineNo++,
        accountCode: '4-1100-00',
        description: `Penjualan - ${invoice.code}`,
        debit: 0,
        credit: subTotal,
        referenceId: invoice.id,
      });

      // Line 3: PPN Keluaran (VAT Payable) - Credit (only if there's tax)
      if (totalTax > 0) {
        journalLines.push({
          tenantId: req.user.tenantId!,
          journalEntryId: journal.id,
          lineNo: lineNo++,
          accountCode: '2-1300-00',
          description: `PPN Keluaran 11% - ${invoice.code}`,
          debit: 0,
          credit: totalTax,
          referenceId: invoice.id,
        });
      }

      await tx.journalEntryLine.createMany({ data: journalLines });

      return updated;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'submit',
      entity: 'SalesInvoice',
      entityId: invoice.id,
    });

    return { 
      invoice: updatedInvoice,
      journal: {
        subTotal,
        totalTax,
        grandTotal: dTot,
        lines: lineBreakdown,
      }
    };
  }
}
