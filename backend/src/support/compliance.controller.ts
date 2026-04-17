import { Controller, Get, Post, Body, Param, Req, UseGuards, Query, Patch, Delete } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';
import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

class CreateComplianceDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  issuingBody?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  effectiveDate?: string;

  @IsDateString()
  @IsOptional()
  expiryDate?: string;

  @IsDateString()
  @IsOptional()
  lastAuditDate?: string;

  @IsDateString()
  @IsOptional()
  nextAuditDate?: string;

  @IsString()
  @IsOptional()
  riskLevel?: string;

  @IsString()
  @IsOptional()
  ownerId?: string;

  @IsString()
  @IsOptional()
  departmentId?: string;

  @IsString()
  @IsOptional()
  documentId?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('support/compliance')
export class SupportComplianceController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('quality.read')
  async listCompliance(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('riskLevel') riskLevel?: string,
  ) {
    return this.prisma.supportCompliance.findMany({
      where: { 
        tenantId: req.user.tenantId,
        ...(type ? { type } : {}),
        ...(status ? { status } : {}),
        ...(riskLevel ? { riskLevel } : {}),
      },
      include: { 
        owner: { select: { firstName: true, lastName: true, employeeNo: true } },
        department: { select: { name: true, code: true } }
      },
      orderBy: { code: 'asc' }
    });
  }

  @Get('stats')
  @RequirePermissions('quality.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const records = await this.prisma.supportCompliance.findMany({
      where: { tenantId: req.user.tenantId }
    });

    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return {
      total: records.length,
      active: records.filter(r => r.status === 'ACTIVE').length,
      expiringSoon: records.filter(r => r.expiryDate && r.expiryDate > now && r.expiryDate <= thirtyDaysFromNow).length,
      expired: records.filter(r => r.expiryDate && r.expiryDate <= now).length,
      highRisk: records.filter(r => r.riskLevel === 'HIGH' || r.riskLevel === 'CRITICAL').length,
    };
  }

  @Get(':id')
  @RequirePermissions('quality.read')
  async getRecord(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.supportCompliance.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { 
        owner: true,
        department: true,
      }
    });
  }

  @Post()
  @RequirePermissions('quality.manage')
  async createRecord(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateComplianceDto,
  ) {
    return this.prisma.supportCompliance.create({
      data: {
        tenantId: req.user.tenantId,
        ...body,
        effectiveDate: body.effectiveDate ? new Date(body.effectiveDate) : undefined,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
        lastAuditDate: body.lastAuditDate ? new Date(body.lastAuditDate) : undefined,
        nextAuditDate: body.nextAuditDate ? new Date(body.nextAuditDate) : undefined,
      } as any
    });
  }

  @Patch(':id')
  @RequirePermissions('quality.manage')
  async updateRecord(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: Partial<CreateComplianceDto>,
  ) {
    const data: any = { ...body };
    if (body.effectiveDate) data.effectiveDate = new Date(body.effectiveDate);
    if (body.expiryDate) data.expiryDate = new Date(body.expiryDate);
    if (body.lastAuditDate) data.lastAuditDate = new Date(body.lastAuditDate);
    if (body.nextAuditDate) data.nextAuditDate = new Date(body.nextAuditDate);

    return this.prisma.supportCompliance.update({
      where: { id, tenantId: req.user.tenantId },
      data
    });
  }

  @Delete(':id')
  @RequirePermissions('quality.manage')
  async deleteRecord(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.supportCompliance.delete({
      where: { id, tenantId: req.user.tenantId }
    });
  }
}
