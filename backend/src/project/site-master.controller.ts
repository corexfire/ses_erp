import { Controller, Get, Post, Body, Param, Req, UseGuards, Query, Patch, Delete } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

class CreateProjectSiteDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  siteCode: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  gpsCoords?: string;

  @IsString()
  @IsOptional()
  contactName?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;

  @IsString()
  @IsOptional()
  status?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('project/site-master')
export class ProjectSiteController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('project.site.read')
  async listSites(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
  ) {
    return this.prisma.projectSite.findMany({
      where: { 
        tenantId: req.user.tenantId,
        ...(projectId ? { projectId } : {})
      },
      include: { 
        project: { select: { name: true, code: true } },
        _count: { select: { dailyReports: true } }
      },
      orderBy: { siteCode: 'asc' }
    });
  }

  @Get(':id')
  @RequirePermissions('project.site.read')
  async getSite(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.projectSite.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { 
        project: true,
        dailyReports: {
          orderBy: { reportDate: 'desc' },
          take: 10
        }
      }
    });
  }

  @Post()
  @RequirePermissions('project.site.execute')
  async createSite(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateProjectSiteDto,
  ) {
    return this.prisma.projectSite.create({
      data: {
        tenantId: req.user.tenantId,
        projectId: body.projectId,
        siteCode: body.siteCode,
        name: body.name,
        address: body.address,
        city: body.city,
        province: body.province,
        gpsCoords: body.gpsCoords,
        contactName: body.contactName,
        contactPhone: body.contactPhone,
        status: body.status || 'ACTIVE',
      }
    });
  }

  @Patch(':id')
  @RequirePermissions('project.site.execute')
  async updateSite(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: Partial<CreateProjectSiteDto>,
  ) {
    return this.prisma.projectSite.update({
      where: { id, tenantId: req.user.tenantId },
      data: body
    });
  }

  @Delete(':id')
  @RequirePermissions('project.site.execute')
  async deleteSite(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.projectSite.delete({
      where: { id, tenantId: req.user.tenantId }
    });
  }
}
