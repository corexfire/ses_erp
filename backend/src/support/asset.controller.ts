import { Controller, Get, Post, Body, Param, Req, UseGuards, Query, Patch, Delete } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  assetNo: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDateString()
  @IsNotEmpty()
  purchaseDate: string;

  @IsNumber()
  @IsNotEmpty()
  purchaseCost: number;

  @IsNumber()
  @IsNotEmpty()
  usefulLife: number;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  serialNumber?: string;

  @IsString()
  @IsOptional()
  locationId?: string;

  @IsString()
  @IsOptional()
  custodianId?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  warrantyExpiry?: string;

  @IsDateString()
  @IsOptional()
  insuranceExpiry?: string;

  @IsString()
  @IsOptional()
  insurancePolicy?: string;

  @IsDateString()
  @IsOptional()
  nextMaintenanceDate?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('support/assets')
export class AssetSupportController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('fixed-asset.read')
  async listAssets(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('category') category?: string,
    @Query('status') status?: string,
  ) {
    return this.prisma.fixedAsset.findMany({
      where: { 
        tenantId: req.user.tenantId,
        ...(category ? { category } : {}),
        ...(status ? { status } : {}),
      },
      include: { 
        location: { select: { name: true, siteCode: true } },
        custodian: { select: { firstName: true, lastName: true, employeeNo: true } }
      },
      orderBy: { assetNo: 'asc' }
    });
  }

  @Get('stats')
  @RequirePermissions('fixed-asset.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const assets = await this.prisma.fixedAsset.findMany({
      where: { tenantId: req.user.tenantId }
    });

    const now = new Date();
    return {
      total: assets.length,
      active: assets.filter(a => a.status === 'ACTIVE').length,
      underMaintenance: assets.filter(a => a.status === 'UNDER_MAINTENANCE').length,
      maintenanceOverdue: assets.filter(a => a.nextMaintenanceDate && a.nextMaintenanceDate < now && a.status !== 'DISPOSED').length,
      totalCapex: assets.reduce((sum, a) => sum + Number(a.purchaseCost), 0),
    };
  }

  @Get(':id')
  @RequirePermissions('fixed-asset.read')
  async getAsset(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.fixedAsset.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { 
        location: true,
        custodian: true,
        depreciationEntries: { orderBy: { periodDate: 'desc' }, take: 5 },
        rentalContracts: true,
      }
    });
  }

  @Post()
  @RequirePermissions('fixed-asset.manage')
  async createAsset(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateAssetDto,
  ) {
    return this.prisma.fixedAsset.create({
      data: {
        tenantId: req.user.tenantId,
        assetNo: body.assetNo,
        name: body.name,
        category: body.category,
        purchaseDate: new Date(body.purchaseDate),
        purchaseCost: body.purchaseCost,
        usefulLife: body.usefulLife,
        brand: body.brand,
        model: body.model,
        serialNumber: body.serialNumber,
        locationId: body.locationId,
        custodianId: body.custodianId,
        status: body.status || 'ACTIVE',
        warrantyExpiry: body.warrantyExpiry ? new Date(body.warrantyExpiry) : undefined,
        insuranceExpiry: body.insuranceExpiry ? new Date(body.insuranceExpiry) : undefined,
        insurancePolicy: body.insurancePolicy,
        nextMaintenanceDate: body.nextMaintenanceDate ? new Date(body.nextMaintenanceDate) : undefined,
      }
    });
  }

  @Patch(':id')
  @RequirePermissions('fixed-asset.manage')
  async updateAsset(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: Partial<CreateAssetDto>,
  ) {
    const data: any = { ...body };
    if (body.purchaseDate) data.purchaseDate = new Date(body.purchaseDate);
    if (body.warrantyExpiry) data.warrantyExpiry = new Date(body.warrantyExpiry);
    if (body.insuranceExpiry) data.insuranceExpiry = new Date(body.insuranceExpiry);
    if (body.nextMaintenanceDate) data.nextMaintenanceDate = new Date(body.nextMaintenanceDate);

    return this.prisma.fixedAsset.update({
      where: { id, tenantId: req.user.tenantId },
      data
    });
  }

  @Delete(':id')
  @RequirePermissions('fixed-asset.manage')
  async deleteAsset(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.fixedAsset.delete({
      where: { id, tenantId: req.user.tenantId }
    });
  }
}
