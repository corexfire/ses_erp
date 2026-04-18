import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/ar')
export class ArController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.ar.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const invoices = await this.prisma.customerInvoice.findMany({
      where: { tenantId: req.user.tenantId!, ...(status ? { status } : {}) },
      include: { payments: true, lines: true },
      orderBy: [{ invoiceDate: 'desc' }],
      take: 200,
    });
    return { invoices };
  }

  @Get(':id')
  @RequirePermissions('finance.ar.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const invoice = await this.prisma.customerInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { payments: true, lines: { orderBy: [{ lineNo: 'asc' }] } },
    });
    return { invoice };
  }

  @Post()
  @RequirePermissions('finance.ar.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { invoiceNo: string; customerCode: string; invoiceDate: string; dueDate?: string; description?: string; lines: { description: string; qty: number; unitPrice: number; taxCode?: string; amount: number }[] }) {
    const totalAmount = body.lines.reduce((sum, l) => sum + (l.amount || 0), 0);

    const invoice = await this.prisma.customerInvoice.create({
      data: {
        tenantId: req.user.tenantId!,
        invoiceNo: body.invoiceNo,
        customerCode: body.customerCode,
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
  @RequirePermissions('finance.ar.payment')
  async addPayment(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { paymentDate: string; amount: number; reference?: string; notes?: string }) {
    const invoice = await this.prisma.customerInvoice.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!invoice) throw new Error('Invoice not found');

    await this.prisma.customerInvoicePayment.create({
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

    const updated = await this.prisma.customerInvoice.update({
      where: { id },
      data: { paidAmount: newPaidAmount, status: newStatus },
    });
    return { invoice: updated };
  }

  @Get('debt-collection')
  @RequirePermissions('finance.ar.read')
  async debtCollection(@Req() req: FastifyRequest & { user: AuthUser }) {
    const overdueInvoices = await this.prisma.customerInvoice.findMany({
      where: { tenantId: req.user.tenantId!, status: { in: ['OPEN', 'OVERDUE'] } },
      include: { payments: true },
    });

    const collectionItems = [];
    for (const inv of overdueInvoices) {
      const dueDate = inv.dueDate ? new Date(inv.dueDate) : new Date(inv.invoiceDate);
      const daysOverdue = Math.floor((new Date().getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysOverdue < 1) continue;

      const outstanding = Number(inv.totalAmount) - Number(inv.paidAmount);
      collectionItems.push({
        id: inv.id,
        invoiceNo: inv.invoiceNo,
        customerCode: inv.customerCode,
        invoiceDate: inv.invoiceDate,
        dueDate: inv.dueDate,
        totalAmount: inv.totalAmount,
        paidAmount: inv.paidAmount,
        outstanding,
        daysOverdue,
        priority: daysOverdue > 90 ? 'HIGH' : daysOverdue > 60 ? 'MEDIUM' : 'LOW',
      });
    }

    collectionItems.sort((a, b) => b.daysOverdue - a.daysOverdue);

    return { collection: collectionItems, total: collectionItems.length };
  }
}