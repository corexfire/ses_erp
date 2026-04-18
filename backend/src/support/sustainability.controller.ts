import { Controller, Get, Post, Body, Param, Req, UseGuards, Query, Patch, Delete } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

class CreateSustRecordDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  indicator: string;

  @IsString()
  @IsNotEmpty()
  period: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNumber()
  @IsNotEmpty()
  target: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsString()
  @IsOptional()
  description?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('support/sustainability')
export class SupportSustainabilityController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('quality.read')
  async listRecords(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('type') type?: string,
    @Query('period') period?: string,
  ) {
    return this.prisma.supportSustainability.findMany({
      where: { 
        tenantId: req.user.tenantId!,
        ...(type ? { type } : {}),
        ...(period ? { period } : {}),
      },
      include: { 
        recordedBy: { select: { firstName: true, lastName: true, employeeNo: true } },
        verifiedBy: { select: { firstName: true, lastName: true, employeeNo: true } }
      },
      orderBy: { period: 'desc' }
    });
  }

  @Get('stats')
  @RequirePermissions('quality.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;
    const records = await this.prisma.supportSustainability.findMany({
      where: { tenantId }
    });

    const carbonRecords = records.filter(r => r.type === 'EMISSION');
    const energyRecords = records.filter(r => r.type === 'ENERGY');

    return {
      carbonPulse: {
        totalEmissions: carbonRecords.reduce((sum, r) => sum + Number(r.value), 0),
        targetEmissions: carbonRecords.reduce((sum, r) => sum + Number(r.target), 0),
        trend: carbonRecords.length > 1 ? 'DECREASING' : 'STABLE'
      },
      energyMix: {
        renewableKwh: energyRecords.reduce((sum, r) => sum + Number(r.value), 0),
        targetKwh: energyRecords.reduce((sum, r) => sum + Number(r.target), 0),
      },
      verificationStatus: {
        verified: records.filter(r => r.status === 'VERIFIED').length,
        submitted: records.filter(r => r.status === 'SUBMITTED').length,
        draft: records.filter(r => r.status === 'DRAFT').length,
      }
    };
  }

  @Post()
  @RequirePermissions('quality.manage')
  async createRecord(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateSustRecordDto,
  ) {
     return this.prisma.supportSustainability.create({
       data: {
         tenantId: req.user.tenantId!,
         ...body,
         // recordedById: req.user.employeeId, // TODO: link employee to user
         status: 'SUBMITTED'
       }
     });
  }

  @Patch(':id/verify')
  @RequirePermissions('quality.manage')
  async verifyRecord(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
     return this.prisma.supportSustainability.update({
       where: { id, tenantId: req.user.tenantId! },
       data: {
         status: 'VERIFIED',
         // verifiedById: req.user.employeeId, // TODO: link employee to user
       }
     });
  }

  @Patch(':id')
  @RequirePermissions('quality.manage')
  async updateRecord(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: Partial<CreateSustRecordDto>,
  ) {
    return this.prisma.supportSustainability.update({
      where: { id, tenantId: req.user.tenantId! },
      data: body
    });
  }

  @Delete(':id')
  @RequirePermissions('quality.manage')
  async deleteRecord(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.supportSustainability.delete({
      where: { id, tenantId: req.user.tenantId! }
    });
  }
}
