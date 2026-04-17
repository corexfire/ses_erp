import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/asset-disposal')
export class AssetDisposalController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('finance.assetDisposal.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId };
    if (status) where.status = status;

    const disposals = await this.prisma.assetDisposal.findMany({
      where,
      include: { asset: true },
      orderBy: { disposalDate: 'desc' },
    });
    return { disposals };
  }

  @Get(':id')
  @RequirePermissions('finance.assetDisposal.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const disposal = await this.prisma.assetDisposal.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { asset: true },
    });
    return { disposal };
  }

  @Post()
  @RequirePermissions('finance.assetDisposal.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { assetId: string; disposalNo: string; disposalDate: string; saleValue: number; notes?: string }) {
    const asset = await this.prisma.fixedAsset.findFirst({ where: { id: body.assetId, tenantId: req.user.tenantId } });
    if (!asset) throw new Error('Asset not found');

    const accumulatedDepreciation = await this.prisma.fixedAssetDepreciation.aggregate({
      where: { assetId: body.assetId },
      _sum: { depreciationAmount: true },
    });
    const bookValue = asset.purchaseCost.minus(accumulatedDepreciation._sum.depreciationAmount || 0);
    const lossGain = Number(body.saleValue) - Number(bookValue);

    const disposal = await this.prisma.assetDisposal.create({
      data: {
        tenantId: req.user.tenantId,
        assetId: body.assetId,
        disposalNo: body.disposalNo,
        disposalDate: new Date(body.disposalDate),
        saleValue: body.saleValue,
        lossGain,
        status: 'DRAFT',
        notes: body.notes,
      },
      include: { asset: true },
    });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'AssetDisposal', entityId: disposal.id, metadata: { disposal } });
    return { disposal };
  }

  @Post(':id/approve')
  @RequirePermissions('finance.assetDisposal.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const disposal = await this.prisma.assetDisposal.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!disposal) throw new Error('Asset disposal not found');

    await this.prisma.fixedAsset.update({
      where: { id: disposal.assetId },
      data: { status: 'DISPOSED' },
    });

    const updated = await this.prisma.assetDisposal.update({
      where: { id },
      data: { status: 'APPROVED' },
      include: { asset: true },
    });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'APPROVE', entity: 'AssetDisposal', entityId: id, metadata: { disposal: updated } });
    return { disposal: updated };
  }

  @Post(':id/delete')
  @RequirePermissions('finance.assetDisposal.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.assetDisposal.deleteMany({ where: { id, tenantId: req.user.tenantId } });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'AssetDisposal', entityId: id, metadata: { id } });
    return { success: true };
  }
}