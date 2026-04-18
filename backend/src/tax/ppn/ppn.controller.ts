import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('tax/faktur-keluaran')
export class FakturKeluaranController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('tax.fakturKeluaran.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId!, invoiceType: 'OUTPUT' };
    
    if (period) {
      const [year, month] = period.split('-');
      where.taxYear = parseInt(year);
      where.taxPeriod = month;
    }
    if (status && status !== 'ALL') where.status = status;

    const invoices = await this.prisma.taxInvoice.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    return { invoices };
  }

  @Get(':id')
  @RequirePermissions('tax.fakturKeluaran.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const invoice = await this.prisma.taxInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { invoice };
  }

  @Post()
  @RequirePermissions('tax.fakturKeluaran.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: any) {
    const invoice = await this.prisma.taxInvoice.create({
      data: {
        tenantId: req.user.tenantId!,
        invoiceNo: body.invoiceNo,
        invoiceDate: new Date(body.invoiceDate),
        customerId: body.customerId,
        customerName: body.customerName,
        customerNpwp: body.customerNpwp,
        customerAddress: body.customerAddress,
        customerNik: body.customerNik,
        baseAmount: body.baseAmount,
        taxAmount: body.taxAmount,
        discountAmount: body.discountAmount || 0,
        stampDuty: body.stampDuty || 0,
        referenceNo: body.referenceNo,
        taxPeriod: body.taxPeriod || (new Date().getMonth() + 1).toString().padStart(2, '0'),
        taxYear: body.taxYear || new Date().getFullYear(),
        invoiceType: 'OUTPUT',
        status: 'DRAFT',
      },
    });
    return { invoice };
  }

  @Post('auto-generate-from-sales/:invoiceId')
  @RequirePermissions('tax.fakturKeluaran.create')
  async autoGenerate(@Req() req: FastifyRequest & { user: AuthUser }, @Param('invoiceId') invoiceId: string) {
    const salesInvoice = await this.prisma.salesInvoice.findFirst({
      where: { id: invoiceId, tenantId: req.user.tenantId! },
      include: { customer: true, items: true }
    });
    if (!salesInvoice) throw new Error('Sales Invoice not found');

    const baseAmount = salesInvoice.items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.unitPrice)), 0);
    const taxAmount = baseAmount * 0.11; // Standard VAT 11%

    const invoice = await this.prisma.taxInvoice.create({
      data: {
        tenantId: req.user.tenantId!,
        invoiceNo: `TAX-${salesInvoice.code}`,
        invoiceDate: new Date(),
        customerId: salesInvoice.customerId,
        customerName: salesInvoice.customer.name,
        customerNpwp: (salesInvoice.customer as any).npwp,
        customerAddress: (salesInvoice.customer as any).taxAddress || salesInvoice.customer.address1,
        baseAmount,
        taxAmount,
        referenceNo: salesInvoice.code,
        taxPeriod: (new Date().getMonth() + 1).toString().padStart(2, '0'),
        taxYear: new Date().getFullYear(),
        invoiceType: 'OUTPUT',
        status: 'DRAFT',
      },
    });
    return { invoice };
  }

  @Post(':id/issue-fp')
  @RequirePermissions('tax.fakturKeluaran.issue')
  async issueFp(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const invoice = await this.prisma.taxInvoice.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!invoice) throw new Error('Invoice not found');

    // Logic to find available NSFP
    const nsfpRange = await this.prisma.nsfpRange.findFirst({
      where: { tenantId: req.user.tenantId!, endDate: null },
      orderBy: { startNo: 'asc' }
    });
    if (!nsfpRange) throw new Error('No active NSFP range found. Please upload NSFP range first.');

    // Simple auto-increment for NSFP (simplified for this context)
    let nextNo = nsfpRange.lastUsedNo ? (parseInt(nsfpRange.lastUsedNo.slice(-8)) + 1).toString() : nsfpRange.startNo.slice(-8);
    const fpNumber = nsfpRange.startNo.slice(0, 7) + '.' + nextNo.padStart(8, '0');

    const updated = await this.prisma.taxInvoice.update({
      where: { id },
      data: { 
        fpNumber, 
        fpDate: new Date(), 
        status: 'POSTED' 
      },
    });

    await this.prisma.nsfpRange.update({
      where: { id: nsfpRange.id },
      data: { lastUsedNo: fpNumber, isUsed: true }
    });

    return { invoice: updated };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('tax/faktur-masukan')
export class FakturMasukanController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('tax.fakturMasukan.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string) {
    const where: any = { tenantId: req.user.tenantId!, invoiceType: 'INPUT' };
    if (period) {
      const [year, month] = period.split('-');
      where.taxYear = parseInt(year);
      where.taxPeriod = month;
    }

    const invoices = await this.prisma.taxInvoice.findMany({
      where,
      orderBy: { invoiceDate: 'desc' },
    });
    return { invoices };
  }

  @Post()
  @RequirePermissions('tax.fakturMasukan.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { invoiceNo: string; invoiceDate: string; supplierId?: string; baseAmount: number; taxAmount: number; fpNumber?: string; fpDate?: string }) {
    const invoice = await this.prisma.taxInvoice.create({
      data: {
        tenantId: req.user.tenantId!,
        invoiceNo: body.invoiceNo,
        invoiceDate: new Date(body.invoiceDate),
        supplierId: body.supplierId,
        baseAmount: body.baseAmount,
        taxAmount: body.taxAmount,
        invoiceType: 'INPUT',
        fpNumber: body.fpNumber,
        fpDate: body.fpDate ? new Date(body.fpDate) : null,
        status: body.fpNumber ? 'POSTED' : 'DRAFT',
      },
    });
    return { invoice };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('tax/nsfp')
export class NsfpController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('tax.nsfp.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const ranges = await this.prisma.nsfpRange.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: { startNo: 'desc' },
    });
    return { ranges };
  }

  @Post()
  @RequirePermissions('tax.nsfp.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { startNo: string; endNo: string; startDate: string }) {
    const range = await this.prisma.nsfpRange.create({
      data: {
        tenantId: req.user.tenantId!,
        startNo: body.startNo,
        endNo: body.endNo,
        startDate: new Date(body.startDate),
        isUsed: false,
      },
    });
    return { range };
  }

  @Post(':id/use')
  @RequirePermissions('tax.nsfp.use')
  async useNsfp(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { usedNo: string }) {
    const range = await this.prisma.nsfpRange.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!range) throw new Error('NSFP range not found');

    const updated = await this.prisma.nsfpRange.update({
      where: { id },
      data: { lastUsedNo: body.usedNo, isUsed: true },
    });
    return { range: updated };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('tax/ppn-masa')
export class PpnMasaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('tax.ppnMasa.read')
  async summary(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period: string) {
    const [year, month] = period.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const outputInvoices = await this.prisma.taxInvoice.findMany({
      where: {
        tenantId: req.user.tenantId!,
        invoiceType: 'OUTPUT',
        invoiceDate: { gte: startDate, lte: endDate },
        status: 'POSTED',
      },
    });

    const inputInvoices = await this.prisma.taxInvoice.findMany({
      where: {
        tenantId: req.user.tenantId!,
        invoiceType: 'INPUT',
        invoiceDate: { gte: startDate, lte: endDate },
        status: 'POSTED',
      },
    });

    const summary = {
      period,
      totalOutput: outputInvoices.reduce((sum, inv) => sum + Number(inv.taxAmount), 0),
      totalInput: inputInvoices.reduce((sum, inv) => sum + Number(inv.taxAmount), 0),
      netPpn: 0,
    };
    summary.netPpn = summary.totalOutput - summary.totalInput;

    return { summary, outputInvoices, inputInvoices };
  }
}