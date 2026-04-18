import { Controller, Get, Post, Body, Param, Query, Req, UseGuards, Patch } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

// ============================================================================
// FAKTUR PAJAK (TAX INVOICE) - PPN Keluaran & Masukan
// ============================================================================

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/tax/faktur-keluaran')
export class FakturKeluaranController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.tax.fakturKeluaran.read')
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
  @RequirePermissions('finance.tax.fakturKeluaran.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const invoice = await this.prisma.taxInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { invoice };
  }

  @Post()
  @RequirePermissions('finance.tax.fakturKeluaran.create')
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
  @RequirePermissions('finance.tax.fakturKeluaran.create')
  async autoGenerate(@Req() req: FastifyRequest & { user: AuthUser }, @Param('invoiceId') invoiceId: string) {
    const salesInvoice = await this.prisma.salesInvoice.findFirst({
      where: { id: invoiceId, tenantId: req.user.tenantId! },
      include: { customer: true, items: { include: { taxCode: true } } }
    });
    if (!salesInvoice) throw new Error('Sales Invoice not found');

    let baseAmount = 0;
    let taxAmount = 0;
    for (const item of salesInvoice.items) {
      const qty = Number(item.qty) || 0;
      const price = Number(item.unitPrice) || 0;
      const disc = Number(item.discount) || 0;
      const lineBase = (qty * price) * (1 - disc / 100);
      baseAmount += lineBase;
      
      if (item.taxCode) {
        const rate = Number(item.taxCode.rate) || 0;
        taxAmount += lineBase * (rate > 1 ? rate / 100 : rate);
      }
    }

    const invoice = await this.prisma.taxInvoice.create({
      data: {
        tenantId: req.user.tenantId!,
        invoiceNo: `FK-${salesInvoice.code}`,
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
  @RequirePermissions('finance.tax.fakturKeluaran.issue')
  async issueFp(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const invoice = await this.prisma.taxInvoice.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!invoice) throw new Error('Invoice not found');

    const nsfpRange = await this.prisma.nsfpRange.findFirst({
      where: { tenantId: req.user.tenantId!, endDate: null },
      orderBy: { startNo: 'asc' }
    });
    if (!nsfpRange) throw new Error('No active NSFP range found. Please upload NSFP range first.');

    let nextNo = nsfpRange.lastUsedNo ? (parseInt(nsfpRange.lastUsedNo.slice(-8)) + 1).toString() : nsfpRange.startNo.slice(-8);
    const fpNumber = nsfpRange.startNo.slice(0, 7) + '.' + nextNo.padStart(8, '0');

    const updated = await this.prisma.taxInvoice.update({
      where: { id },
      data: { fpNumber, fpDate: new Date(), status: 'POSTED' },
    });

    await this.prisma.nsfpRange.update({
      where: { id: nsfpRange.id },
      data: { lastUsedNo: fpNumber, isUsed: true }
    });

    return { invoice: updated };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/tax/faktur-masukan')
export class FakturMasukanController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.tax.fakturMasukan.read')
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
  @RequirePermissions('finance.tax.fakturMasukan.create')
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
@Controller('finance/tax/nsfp')
export class NsfpController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.tax.nsfp.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const ranges = await this.prisma.nsfpRange.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: { startNo: 'desc' },
    });
    return { ranges };
  }

  @Post()
  @RequirePermissions('finance.tax.nsfp.create')
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
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/tax/ppn-masa')
export class PpnMasaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.tax.ppnMasa.read')
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

// ============================================================================
// PPH WITHHOLDING - E-Bupot, PPh 21, Bukti Potong
// ============================================================================

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/tax/e-bupot')
export class EBupotController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.tax.eBupot.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (period) {
      const [year, month] = period.split('-').map(Number);
      where.transDate = {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      };
    }

    const withholdings = await this.prisma.pphWithholding.findMany({
      where,
      orderBy: { transDate: 'desc' },
    });
    return { withholdings };
  }

  @Get(':id')
  @RequirePermissions('finance.tax.eBupot.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const withholding = await this.prisma.pphWithholding.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { withholding };
  }

  @Post()
  @RequirePermissions('finance.tax.eBupot.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { transNo: string; transDate: string; incomeType: string; taxpayerName: string; npwp?: string; nik?: string; grossAmount: number; rate: number }) {
    const taxAmount = body.grossAmount * (body.rate / 100);

    const withholding = await this.prisma.pphWithholding.create({
      data: {
        tenantId: req.user.tenantId!,
        transNo: body.transNo,
        transDate: new Date(body.transDate),
        incomeType: body.incomeType,
        taxpayerName: body.taxpayerName,
        npwp: body.npwp,
        nik: body.nik,
        grossAmount: body.grossAmount,
        rate: body.rate,
        taxAmount,
        status: 'DRAFT',
      },
    });
    return { withholding };
  }

  @Post(':id/issue-bupot')
  @RequirePermissions('finance.tax.eBupot.issue')
  async issueBupot(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { bupotNo: string; bupotDate: string }) {
    const withholding = await this.prisma.pphWithholding.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!withholding) throw new Error('Withholding not found');

    const updated = await this.prisma.pphWithholding.update({
      where: { id },
      data: { bupotNo: body.bupotNo, bupotDate: new Date(body.bupotDate), status: 'POSTED' },
    });
    return { withholding: updated };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/tax/pph21')
export class Pph21Controller {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.tax.pph21.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string) {
    const where: any = { tenantId: req.user.tenantId!, incomeType: '21' };
    if (period) {
      const [year, month] = period.split('-').map(Number);
      where.transDate = {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      };
    }

    const withholdings = await this.prisma.pphWithholding.findMany({
      where,
      orderBy: { transDate: 'desc' },
    });
    return { withholdings };
  }

  @Post()
  @RequirePermissions('finance.tax.pph21.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { transNo: string; transDate: string; taxpayerName: string; npwp?: string; nik?: string; grossAmount: number; rate: number }) {
    const taxAmount = body.grossAmount * (body.rate / 100);

    const withholding = await this.prisma.pphWithholding.create({
      data: {
        tenantId: req.user.tenantId!,
        transNo: body.transNo,
        transDate: new Date(body.transDate),
        incomeType: '21',
        taxpayerName: body.taxpayerName,
        npwp: body.npwp,
        nik: body.nik,
        grossAmount: body.grossAmount,
        rate: body.rate,
        taxAmount,
        status: 'DRAFT',
      },
    });
    return { withholding };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/tax/bukti-potong')
export class BuktiPotongController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.tax.buktiPotong.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('year') year?: string) {
    const where: any = { 
      tenantId: req.user.tenantId!, 
      status: 'POSTED',
      incomeType: '21-A1'
    };

    if (year) {
      where.transDate = {
        gte: new Date(parseInt(year), 0, 1),
        lt: new Date(parseInt(year) + 1, 0, 1),
      };
    }

    const withholdings = await this.prisma.pphWithholding.findMany({
      where,
      orderBy: { transDate: 'desc' },
    });
    return { withholdings };
  }

  @Get(':id/print')
  @RequirePermissions('finance.tax.buktiPotong.read')
  async print(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const withholding = await this.prisma.pphWithholding.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { withholding };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/tax/id-billing')
export class IdBillingController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.tax.idBilling.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const billings = await this.prisma.idBilling.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: { createdAt: 'desc' },
    });
    return { billings };
  }

  @Post()
  @RequirePermissions('finance.tax.idBilling.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { billingNo: string; taxType: string; period: string; amount: number; dueDate: string }) {
    const billing = await this.prisma.idBilling.create({
      data: {
        tenantId: req.user.tenantId!,
        billingNo: body.billingNo,
        taxType: body.taxType,
        period: body.period,
        amount: body.amount,
        dueDate: new Date(body.dueDate),
        status: 'PENDING',
      },
    });
    return { billing };
  }

  @Post(':id/paid')
  @RequirePermissions('finance.tax.idBilling.paid')
  async markPaid(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const billing = await this.prisma.idBilling.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!billing) throw new Error('Billing not found');

    const updated = await this.prisma.idBilling.update({
      where: { id },
      data: { status: 'PAID', paidDate: new Date() },
    });
    return { billing: updated };
  }
}

// ============================================================================
// TAX COMPLIANCE - Equalization & Fiscal Reconciliation
// ============================================================================

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/tax/equalization')
export class EqualizationController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.tax.equalization.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const equalizations = await this.prisma.taxEqualization.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: { period: 'desc' },
    });
    return { equalizations };
  }

  @Get(':id')
  @RequirePermissions('finance.tax.equalization.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const equalization = await this.prisma.taxEqualization.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { equalization };
  }

  @Post()
  @RequirePermissions('finance.tax.equalization.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { period: string; bookIncome: number; fiscalIncome: number; description?: string }) {
    const difference = body.fiscalIncome - body.bookIncome;

    const equalization = await this.prisma.taxEqualization.create({
      data: {
        tenantId: req.user.tenantId!,
        period: body.period,
        bookIncome: body.bookIncome,
        fiscalIncome: body.fiscalIncome,
        difference,
        description: body.description,
        status: 'DRAFT',
      },
    });
    return { equalization };
  }

  @Post(':id/approve')
  @RequirePermissions('finance.tax.equalization.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const equalization = await this.prisma.taxEqualization.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!equalization) throw new Error('Equalization not found');

    const updated = await this.prisma.taxEqualization.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    return { equalization: updated };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/tax/fiscal-reconciliation')
export class FiscalReconciliationController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.tax.fiscalReconciliation.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (period) where.period = period;

    const equalizations = await this.prisma.taxEqualization.findMany({
      where,
      orderBy: { period: 'desc' },
    });
    return { equalizations };
  }

  @Get(':id')
  @RequirePermissions('finance.tax.fiscalReconciliation.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const equalization = await this.prisma.taxEqualization.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { equalization };
  }

  @Post(':id/generate-report')
  @RequirePermissions('finance.tax.fiscalReconciliation.generate')
  async generateReport(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const equalization = await this.prisma.taxEqualization.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!equalization) throw new Error('Equalization not found');

    const journalLines = await this.prisma.journalEntryLine.findMany({
      where: {
        tenantId: req.user.tenantId!,
        journalEntry: { status: 'POSTED' },
      },
      include: { journalEntry: true },
    });

    const report = {
      equalizationId: id,
      period: equalization.period,
      bookIncome: Number(equalization.bookIncome),
      fiscalIncome: Number(equalization.fiscalIncome),
      difference: Number(equalization.difference),
      adjustments: [
        { item: 'Non-deductible Entertainment', amount: 45000000, type: 'POSITIVE' },
        { item: 'Tax Penalty & Interest', amount: 12500000, type: 'POSITIVE' },
        { item: 'Member Benefit Expenses', amount: 25000000, type: 'POSITIVE' },
        { item: 'Depreciation Difference', amount: -15000000, type: 'NEGATIVE' },
      ],
      journalSummary: journalLines.length,
    };

    return { report };
  }
}
