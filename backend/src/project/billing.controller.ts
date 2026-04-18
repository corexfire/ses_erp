import { Controller, Get, Post, Patch, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

export class CreateProgressClaimDto {
  projectId!: string;
  contractTermijnId?: string;
  periodFrom!: string;
  periodTo!: string;
  percentage!: number;
  amount!: number;
  notes?: string;
}

export class CreateProgressInvoiceDto {
  projectId!: string;
  progressClaimId!: string;
  amount!: number;
  invoiceNo?: string;
  status?: string;
}

export class UpdateProgressInvoiceDto {
  invoiceNo?: string;
  status?: string;
  amount?: number;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('project')
export class BillingController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('progress-claims')
  @RequirePermissions('project.billing.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (projectId) where.projectId = projectId;

    const claims = await this.prisma.progressClaim.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return { data: claims };
  }

  @Post('progress-claims')
  @RequirePermissions('project.billing.manage')
   async create(
     @Req() req: FastifyRequest & { user: AuthUser },
     @Body() body: CreateProgressClaimDto,
   ) {
     const claim = await this.prisma.progressClaim.create({
       data: {
         tenantId: req.user.tenantId!,
         projectId: body.projectId,
         claimNo: `CL-${Date.now()}`,
         claimDate: new Date(),
         progressPercent: body.percentage,
         description: body.notes || undefined,
         status: 'DRAFT',
       },
     });
     return claim;
   }

  @Get('progress-claims/:id')
  @RequirePermissions('project.billing.read')
  async get(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const claim = await this.prisma.progressClaim.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return claim;
  }

  @Post('progress-claims/:id/submit')
  @RequirePermissions('project.billing.manage')
  async submit(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const claim = await this.prisma.progressClaim.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!claim || claim.status !== 'DRAFT') {
      throw new Error('Can only submit draft claims');
    }

    const updated = await this.prisma.progressClaim.update({
      where: { id },
      data: { status: 'SUBMITTED' },
    });
    return updated;
  }

  @Post('progress-claims/:id/approve')
  @RequirePermissions('project.billing.manage')
  async approve(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const claim = await this.prisma.progressClaim.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!claim || claim.status !== 'SUBMITTED') {
      throw new Error('Can only approve submitted claims');
    }

    const updated = await this.prisma.progressClaim.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    return updated;
  }

  @Post('progress-claims/:id/invoice')
  @RequirePermissions('project.billing.manage')
  async generateInvoice(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const claim = await this.prisma.progressClaim.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!claim || claim.status !== 'APPROVED') {
      throw new Error('Can only generate invoice from approved claims');
    }

     const invoice = await this.prisma.progressInvoice.create({
       data: {
         tenantId: req.user.tenantId!,
         progressClaimId: id,
         projectId: claim.projectId,
         grossAmount: 0, // TODO: calculate from claim
         netAmount: 0,
         status: 'DRAFT',
       },
     });

    await this.prisma.progressClaim.update({
      where: { id },
      data: { status: 'INVOICED' },
    });

    return invoice;
  }

  @Get('invoices')
  @RequirePermissions('project.billing.read')
  async listInvoices(
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const invoices = await this.prisma.progressInvoice.findMany({
      where: { tenantId: req.user.tenantId! },
      include: { project: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return { data: invoices };
  }

  @Post('invoices')
  @RequirePermissions('project.billing.manage')
  async createInvoice(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateProgressInvoiceDto,
  ) {
     const invoice = await this.prisma.progressInvoice.create({
       data: {
         tenantId: req.user.tenantId!,
         projectId: body.projectId,
         progressClaimId: body.progressClaimId,
         grossAmount: body.amount,
         netAmount: body.amount,
         invoiceNo: body.invoiceNo,
         status: body.status ?? 'DRAFT',
       },
     });

    return invoice;
  }

  @Patch('invoices/:id')
  @RequirePermissions('project.billing.manage')
  async updateInvoice(
    @Param('id') id: string,
    @Body() body: UpdateProgressInvoiceDto,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
     const invoice = await this.prisma.progressInvoice.update({
       where: { id },
       data: {
         invoiceNo: body.invoiceNo,
         grossAmount: body.amount,
         netAmount: body.amount,
         status: body.status ?? 'SUBMITTED',
       },
     });
    return invoice;
  }

  @Post('invoices/:id/export-ar')
  @RequirePermissions('project.billing.manage')
  async exportToAr(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const invoice = await this.prisma.progressInvoice.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!invoice) throw new Error('Invoice not found');

    const updated = await this.prisma.progressInvoice.update({
      where: { id },
      data: { status: 'PAID' },
    });
    return { success: true, invoice: updated };
  }
}
