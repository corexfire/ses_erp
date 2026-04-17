import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
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

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('rental/depreciation')
export class RentalDepreciationController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  async findAll(@Req() req: FastifyRequest, @Query('search') search?: string) {
    const user = req.user as AuthUser;
    
    // We target FixedAsset directly but attach the depreciation sub-table mapping calculation
    const where: any = { tenantId: user.tenantId };
    
    if (search) {
      where.OR = [
        { assetNo: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    // Fetch assets, ordering by recent purchases
    const assets = await this.prisma.fixedAsset.findMany({
      where,
      include: {
         _count: {
            select: { rentalContracts: true, rentalMaintenances: true }
         }
      },
      orderBy: { purchaseDate: 'desc' },
    });

    // Sub-query the depreciations and inject virtual "Net Book Value" into raw payload mapping
    const payload = await Promise.all(assets.map(async (asset) => {
        const dLogs = await this.prisma.fixedAssetDepreciation.findMany({
             where: { assetId: asset.id },
             orderBy: { periodDate: 'desc' },
             take: 1
        });
        
        let accumulated = 0;
        if (dLogs.length > 0) {
           accumulated = Number(dLogs[0].accumulatedAmount) || 0;
        }

        const netBookValue = Math.max(0, Number(asset.purchaseCost) - accumulated);

        return {
           ...asset,
           accumulatedDepreciation: accumulated,
           netBookValue
        };
    }));
    
    // Dashboard Summary
    const totalCapital = payload.reduce((sum, item) => sum + Number(item.purchaseCost), 0);
    const totalAccumulated = payload.reduce((sum, item) => sum + item.accumulatedDepreciation, 0);
    const summary = {
       totalAssets: payload.length,
       totalCapital,
       totalAccumulated,
       netBookValue: totalCapital - totalAccumulated
    };

    return { data: payload, summary };
  }

  @Get(':id/history')
  async getHistory(@Req() req: FastifyRequest, @Param('id') assetId: string) {
    const user = req.user as AuthUser;
    
    const logs = await this.prisma.fixedAssetDepreciation.findMany({
        where: { tenantId: user.tenantId, assetId },
        orderBy: { periodDate: 'desc' }
    });

    return { data: logs };
  }

  @Post()
  async logManualDepreciation(@Req() req: FastifyRequest, @Body() body: any) {
    const user = req.user as AuthUser;
    
    const asset = await this.prisma.fixedAsset.findUnique({ where: { id: body.assetId } });
    if (!asset || asset.tenantId !== user.tenantId) {
        throw new NotFoundException('Fixed Asset target not found.');
    }

    const depAmount = Number(body.depreciationAmount || 0);

    // Grab the last log to add accumulation correctly
    const lastLog = await this.prisma.fixedAssetDepreciation.findFirst({
        where: { assetId: body.assetId },
        orderBy: { periodDate: 'desc' }
    });

    const accumulatedAmount = (lastLog ? Number(lastLog.accumulatedAmount) : 0) + depAmount;

    const record = await this.prisma.fixedAssetDepreciation.create({
      data: {
        tenantId: user.tenantId,
        assetId: body.assetId,
        periodDate: body.periodDate ? new Date(body.periodDate) : new Date(),
        depreciationAmount: depAmount,
        accumulatedAmount: accumulatedAmount,
        notes: body.notes || 'Manual Jurnal / Depresiasi Sistem',
      },
    });

    await this.audit.log(
      user.tenantId,
      user.id,
      'CREATE',
      'FixedAssetDepreciation',
      record.id,
      null,
      record,
    );

    return { message: 'Asset Depreciation historical log mapped.', data: record };
  }
}
