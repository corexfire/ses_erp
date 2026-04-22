import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/ap')
export class ApController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.ap.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const invoices = await this.prisma.supplierInvoice.findMany({
      where: { tenantId: req.user.tenantId!, ...(status ? { status } : {}) },
      include: { supplier: true, payments: true, lines: true },
      orderBy: [{ invoiceDate: 'desc' }],
      take: 200,
    });
    return { invoices };
  }

  @Get(':id')
  @RequirePermissions('finance.ap.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const invoice = await this.prisma.supplierInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { supplier: true, payments: true, lines: { orderBy: [{ lineNo: 'asc' }] } },
    });
    return { invoice };
  }

  @Post()
  @RequirePermissions('finance.ap.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { invoiceNo: string; supplierId: string; invoiceDate: string; dueDate?: string; description?: string; lines: { description: string; qty: number; unitPrice: number; taxCode?: string; amount: number }[] }) {
    const totalAmount = body.lines.reduce((sum, l) => sum + (l.amount || 0), 0);

    const invoice = await this.prisma.supplierInvoice.create({
      data: {
        tenantId: req.user.tenantId!,
        invoiceNo: body.invoiceNo,
        supplierId: body.supplierId,
        invoiceDate: new Date(body.invoiceDate),
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        description: body.description,
        totalAmount,
        taxAmount: 0,
        paidAmount: 0,
        status: 'OPEN',
        lines: {
          create: body.lines.map((line, idx) => ({
            tenantId: req.user.tenantId!,
            lineNo: idx + 1,
            description: line.description,
            qty: line.qty,
            unitPrice: line.unitPrice,
            taxCode: line.taxCode || null,
            amount: line.amount,
          })),
        },
      },
      include: { lines: true },
    });
    return { invoice };
  }

  @Post(':id/payment')
  @RequirePermissions('finance.ap.payment')
  async addPayment(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { paymentDate: string; amount: number; reference?: string; notes?: string }) {
    const invoice = await this.prisma.supplierInvoice.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!invoice) throw new Error('Invoice not found');

    await this.prisma.supplierInvoicePayment.create({
      data: {
        tenantId: req.user.tenantId!,
        invoiceId: id,
        paymentDate: new Date(body.paymentDate),
        amount: body.amount,
        reference: body.reference,
        notes: body.notes,
      },
    });

    const newPaidAmount = Number(invoice.paidAmount) + body.amount;
    const newStatus = newPaidAmount >= Number(invoice.totalAmount) ? 'PAID' : 'OPEN';

    const updated = await this.prisma.supplierInvoice.update({
      where: { id },
      data: { paidAmount: newPaidAmount, status: newStatus },
    });
    return { invoice: updated };
  }

  @Get('reconciliation')
  @RequirePermissions('finance.ap.read')
  async vendorReconciliation(@Req() req: FastifyRequest & { user: AuthUser }, @Query('supplierCode') supplierCode?: string) {
    const where: any = { tenantId: req.user.tenantId!, status: { in: ['OPEN', 'OVERDUE'] } };
    if (supplierCode) where.supplier = { code: supplierCode }; // Using relation filter

    const invoices = await this.prisma.supplierInvoice.findMany({
      where,
      include: { supplier: true, payments: true },
    });

    const reconciliationBySupplier = new Map();

    for (const inv of invoices) {
      const outstanding = Number(inv.totalAmount) - Number(inv.paidAmount);
      if (outstanding <= 0) continue;

      const sCode = (inv as any).supplier?.code || 'N/A';
      if (!reconciliationBySupplier.has(sCode)) {
        reconciliationBySupplier.set(sCode, {
          supplierCode: sCode,
          invoices: [],
          totalInvoices: 0,
          totalOutstanding: 0,
        });
      }

      const entry = reconciliationBySupplier.get(sCode);
      entry.invoices.push({
        invoiceNo: inv.invoiceNo,
        invoiceDate: inv.invoiceDate,
        dueDate: inv.dueDate,
        totalAmount: inv.totalAmount,
        paidAmount: inv.paidAmount,
        outstanding,
      });
      entry.totalInvoices++;
      entry.totalOutstanding += outstanding;
    }

    return { reconciliation: Array.from(reconciliationBySupplier.values()) };
  }
}