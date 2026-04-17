import { Controller, Get, Post, Body, Param, Query, Req, UseGuards, Patch } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('tax/e-bupot')
export class EBupotController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('tax.eBupot.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string) {
    const where: any = { tenantId: req.user.tenantId };
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
  @RequirePermissions('tax.eBupot.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const withholding = await this.prisma.pphWithholding.findFirst({
      where: { id, tenantId: req.user.tenantId },
    });
    return { withholding };
  }

  @Post()
  @RequirePermissions('tax.eBupot.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { transNo: string; transDate: string; incomeType: string; taxpayerName: string; npwp?: string; nik?: string; grossAmount: number; rate: number }) {
    const taxAmount = body.grossAmount * (body.rate / 100);

    const withholding = await this.prisma.pphWithholding.create({
      data: {
        tenantId: req.user.tenantId,
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
  @RequirePermissions('tax.eBupot.issue')
  async issueBupot(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { bupotNo: string; bupotDate: string }) {
    const withholding = await this.prisma.pphWithholding.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!withholding) throw new Error('Withholding not found');

    const updated = await this.prisma.pphWithholding.update({
      where: { id },
      data: { bupotNo: body.bupotNo, bupotDate: new Date(body.bupotDate), status: 'POSTED' },
    });
    return { withholding: updated };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('tax/pph21')
export class Pph21Controller {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('tax.pph21.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string) {
    const where: any = { tenantId: req.user.tenantId, incomeType: '21' };
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
  @RequirePermissions('tax.pph21.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { transNo: string; transDate: string; taxpayerName: string; npwp?: string; nik?: string; grossAmount: number; rate: number }) {
    const taxAmount = body.grossAmount * (body.rate / 100);

    const withholding = await this.prisma.pphWithholding.create({
      data: {
        tenantId: req.user.tenantId,
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
@Controller('tax/bukti-potong')
export class BuktiPotongController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('tax.buktiPotong.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('year') year?: string) {
    const where: any = { 
      tenantId: req.user.tenantId, 
      status: 'POSTED',
      incomeType: '21-A1' // Specialized annual type
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
  @RequirePermissions('tax.buktiPotong.read')
  async print(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const withholding = await this.prisma.pphWithholding.findFirst({
      where: { id, tenantId: req.user.tenantId },
    });
    return { withholding };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('tax/id-billing')
export class IdBillingController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('tax.idBilling.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const billings = await this.prisma.idBilling.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: { createdAt: 'desc' },
    });
    return { billings };
  }

  @Post()
  @RequirePermissions('tax.idBilling.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { billingNo: string; taxType: string; period: string; amount: number; dueDate: string }) {
    const billing = await this.prisma.idBilling.create({
      data: {
        tenantId: req.user.tenantId,
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
  @RequirePermissions('tax.idBilling.paid')
  async markPaid(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const billing = await this.prisma.idBilling.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!billing) throw new Error('Billing not found');

    const updated = await this.prisma.idBilling.update({
      where: { id },
      data: { status: 'PAID', paidDate: new Date() },
    });
    return { billing: updated };
  }
}