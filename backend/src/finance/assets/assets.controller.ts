import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/assets')
export class AssetsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.asset.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const assets = await this.prisma.fixedAsset.findMany({
      where: { tenantId: req.user.tenantId },
      include: { depreciationEntries: true },
      orderBy: [{ createdAt: 'desc' }],
    });
    return { assets };
  }

  @Get(':id')
  @RequirePermissions('finance.asset.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const asset = await this.prisma.fixedAsset.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { depreciationEntries: { orderBy: [{ periodDate: 'desc' }] } },
    });
    return { asset };
  }

  @Post()
  @RequirePermissions('finance.asset.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { assetNo: string; name: string; category: string; purchaseDate: string; purchaseCost: number; usefulLife: number; salvageValue?: number; depreciationMethod?: string }) {
    const asset = await this.prisma.fixedAsset.create({
      data: {
        tenantId: req.user.tenantId,
        assetNo: body.assetNo,
        name: body.name,
        category: body.category,
        purchaseDate: new Date(body.purchaseDate),
        purchaseCost: body.purchaseCost,
        usefulLife: body.usefulLife,
        salvageValue: body.salvageValue || 0,
        depreciationMethod: body.depreciationMethod || 'STRAIGHT_LINE',
        status: 'ACTIVE',
      },
    });
    return { asset };
  }

  @Post(':id/depreciation')
  @RequirePermissions('finance.asset.depreciate')
  async addDepreciation(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { periodDate: string; depreciationAmount: number; notes?: string }) {
    const asset = await this.prisma.fixedAsset.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!asset) throw new Error('Asset not found');

    const existingDepr = await this.prisma.fixedAssetDepreciation.findMany({ where: { assetId: id } });
    const accumulated = existingDepr.reduce((sum, d) => sum + Number(d.depreciationAmount), 0) + body.depreciationAmount;

    const depr = await this.prisma.fixedAssetDepreciation.create({
      data: {
        tenantId: req.user.tenantId,
        assetId: id,
        periodDate: new Date(body.periodDate),
        depreciationAmount: body.depreciationAmount,
        accumulatedAmount: accumulated,
        notes: body.notes,
      },
    });
    return { depreciation: depr };
  }
}