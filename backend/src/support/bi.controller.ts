import { Controller, Get, Post, Body, Param, Req, UseGuards, Query, Patch, Delete } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

class UpsertKpiDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  period: string;

  @IsNumber()
  @IsNotEmpty()
  targetValue: number;

  @IsNumber()
  @IsOptional()
  actualValue?: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('support/bi')
export class SupportBiController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('dashboard')
  @RequirePermissions('quality.read')
  async getDashboard(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;

    const [assets, docs, compliance, kpis] = await Promise.all([
      this.prisma.fixedAsset.count({ where: { tenantId } }),
      this.prisma.supportDocument.count({ where: { tenantId } }),
      this.prisma.supportCompliance.count({ where: { tenantId } }),
      this.prisma.supportKpi.findMany({ 
        where: { tenantId },
        orderBy: { period: 'desc' }
      })
    ]);

    // Dynamically determine the latest period available in the database
    const latestPeriod = kpis.length > 0 ? kpis[0].period : null;
    const activeKpis = latestPeriod ? kpis.filter(k => k.period === latestPeriod) : [];

    return {
      summary: {
        totalAssets: assets,
        totalDocuments: docs,
        totalComplianceRecords: compliance,
        averageHealthScore: activeKpis.length > 0 
          ? activeKpis.reduce((acc, k) => acc + Number(k.actualValue), 0) / activeKpis.length 
          : 0
      },
      kpis: activeKpis,
      statusDistribution: {
        onTrack: kpis.filter(k => k.status === 'ON_TRACK').length,
        atRisk: kpis.filter(k => k.status === 'AT_RISK').length,
        behind: kpis.filter(k => k.status === 'BEHIND').length,
      }
    };
  }

  @Get('metrics')
  @RequirePermissions('quality.read')
  async getMetrics(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('category') category?: string,
  ) {
    return this.prisma.supportKpi.findMany({
      where: { 
        tenantId: req.user.tenantId!,
        ...(category ? { category } : {})
      },
      orderBy: [
        { code: 'asc' },
        { period: 'asc' }
      ]
    });
  }

  @Post()
  @RequirePermissions('quality.manage')
  async upsertKpi(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: UpsertKpiDto,
  ) {
    const status = (body.actualValue ?? 0) >= body.targetValue ? 'ON_TRACK' : 
                   (body.actualValue ?? 0) >= body.targetValue * 0.9 ? 'AT_RISK' : 'BEHIND';

    return this.prisma.supportKpi.upsert({
      where: {
        tenantId_code_period: {
          tenantId: req.user.tenantId!,
          code: body.code,
          period: body.period
        }
      },
      update: {
        ...body,
        status
      },
      create: {
        tenantId: req.user.tenantId!,
        ...body,
        status
      }
    });
  }

  @Delete(':id')
  @RequirePermissions('quality.manage')
  async deleteKpi(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.supportKpi.delete({
      where: { id, tenantId: req.user.tenantId! }
    });
  }
}
