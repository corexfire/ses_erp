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
import { CreateProgressClaimDto, CreateProgressInvoiceDto } from './dto/billing.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('project/billing')
export class BillingController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('claims/:projectId')
  @RequirePermissions('project.billing.read')
  async listClaims(@Req() req: FastifyRequest & { user: AuthUser }, @Param('projectId') projectId: string) {
    const claims = await this.prisma.progressClaim.findMany({
      where: { projectId, tenantId: req.user.tenantId },
      orderBy: { claimDate: 'desc' },
    });
    return { claims };
  }

  @Post('claims')
  @RequirePermissions('project.billing.create')
  async createClaim(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateProgressClaimDto) {
    const project = await this.prisma.project.findFirst({
      where: { id: body.projectId, tenantId: req.user.tenantId }
    });
    if (!project) throw new NotFoundException('Project not found');

    const claim = await this.prisma.progressClaim.create({
      data: {
        tenantId: req.user.tenantId,
        projectId: body.projectId,
        claimNo: body.claimNo,
        progressPercent: body.progressPercent,
        description: body.description,
        status: 'DRAFT'
      }
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'ProgressClaim',
      entityId: claim.id,
    });

    return { claim };
  }

  @Post('invoices')
  @RequirePermissions('project.billing.create')
  async createInvoice(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateProgressInvoiceDto) {
    const claim = await this.prisma.progressClaim.findFirst({
      where: { id: body.progressClaimId, tenantId: req.user.tenantId },
      include: { project: true }
    });
    if (!claim) throw new NotFoundException('Progress Claim not found');

    const project = claim.project;
    const contractValue = Number(project.totalBudget || 0);
    
    // Calculate Delta Progress
    // In a real ERP, we'd find the previous highest verified claim %
    const previousClaims = await this.prisma.progressClaim.findMany({
      where: { projectId: claim.projectId, tenantId: req.user.tenantId, status: 'VERIFIED', createdAt: { lt: claim.createdAt } },
      orderBy: { progressPercent: 'desc' },
      take: 1
    });
    const lastProgress = previousClaims.length > 0 ? Number(previousClaims[0].progressPercent) : 0;
    const progressDelta = Number(claim.progressPercent) - lastProgress;
    
    if (progressDelta <= 0) throw new Error('New progress and last progress mismatch');

    const grossAmount = (progressDelta / 100) * contractValue;
    const retentionPercent = body.retentionPercent || 5;
    const retentionAmount = (retentionPercent / 100) * grossAmount;
    const dpDeduction = body.dpDeductionAmount || 0;
    const vatPercent = 11;
    
    const netBeforeTax = grossAmount - retentionAmount - dpDeduction;
    const vatAmount = (vatPercent / 100) * netBeforeTax;
    const netAmount = netBeforeTax + vatAmount;

    return await this.prisma.$transaction(async (tx) => {
      // 1. Create Progress Invoice
      const invoice = await tx.progressInvoice.create({
        data: {
          tenantId: req.user.tenantId,
          projectId: claim.projectId,
          progressClaimId: claim.id,
          progressPercent: claim.progressPercent,
          retentionPercent: retentionPercent,
          retentionAmount: retentionAmount,
          dpDeductionAmount: dpDeduction,
          grossAmount: grossAmount,
          vatPercent: vatPercent,
          vatAmount: vatAmount,
          netAmount: netAmount,
          status: 'DRAFT',
          invoiceNo: `INV-PRJ-${Date.now().toString().slice(-6)}`,
          period: new Date().toISOString().slice(0, 7)
        }
      });

      // 2. Update Claim Status
      await tx.progressClaim.update({
        where: { id: claim.id },
        data: { status: 'VERIFIED' }
      });

      return { invoice };
    });
  }

  @Get('ledger/:projectId')
  @RequirePermissions('project.billing.read')
  async getProjectLedger(@Req() req: FastifyRequest & { user: AuthUser }, @Param('projectId') projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, tenantId: req.user.tenantId },
      include: {
        progressInvoices: true,
        progressClaims: true
      }
    });
    if (!project) throw new NotFoundException('Project not found');

    const totalBilled = project.progressInvoices.reduce((sum, inv) => sum + Number(inv.netAmount), 0);
    const totalRetention = project.progressInvoices
      .filter(inv => !inv.isRetentionReleased)
      .reduce((sum, inv) => sum + Number(inv.retentionAmount), 0);
    const currentProgress = project.progressClaims
      .filter(c => c.status !== 'DRAFT')
      .reduce((max, c) => Math.max(max, Number(c.progressPercent)), 0);

    return {
      summary: {
        contractValue: project.totalBudget,
        totalBilled,
        totalRetention,
        currentProgress,
        remainingBalance: Number(project.totalBudget || 0) - totalBilled,
        billingSetup: {
          retentionRate: project.retentionRate,
          downPaymentTotal: project.downPaymentTotal,
          dpRecoveryRate: project.dpRecoveryRate,
          billingType: project.billingType
        }
      },
      invoices: project.progressInvoices,
      claims: project.progressClaims
    };
  }

  @Post('release-retention/:projectId')
  @RequirePermissions('project.billing.create')
  async releaseRetention(@Req() req: FastifyRequest & { user: AuthUser }, @Param('projectId') projectId: string) {
    const invoices = await this.prisma.progressInvoice.findMany({
      where: { projectId, tenantId: req.user.tenantId, isRetentionReleased: false }
    });

    if (invoices.length === 0) throw new Error('No unreleased retention found for this project');

    return await this.prisma.$transaction(async (tx) => {
      await tx.progressInvoice.updateMany({
        where: { projectId, tenantId: req.user.tenantId, isRetentionReleased: false },
        data: {
          isRetentionReleased: true,
          retentionReleasedAt: new Date()
        }
      });

      await this.audit.log({
        tenantId: req.user.tenantId,
        actorUserId: req.user.id,
        action: 'RELEASE_RETENTION',
        entity: 'Project',
        entityId: projectId,
        metadata: { invoiceCount: invoices.length }
      });

      return { count: invoices.length };
    });
  }
}
