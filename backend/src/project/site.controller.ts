import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

export class CreateDailyReportDto {
  projectId!: string;
  reportDate!: string;
  morningWeather?: string;
  afternoonWeather?: string;
  eveningWeather?: string;
  manpowerSummary?: string;
  equipmentSummary?: string;
  materialSummary?: string;
  workSummary?: string;
  progressPercent?: number;
  issues?: string;
  status?: string;
  wbsTaskId?: string;
}


@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('project')
export class SiteController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('sites')
  @RequirePermissions('project.site.read')
  async listSites(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (status) where.status = status;
    if (search) where.project = { name: { contains: search, mode: 'insensitive' } };

    const reports = await this.prisma.dailyReport.findMany({
      where,
      include: { project: true },
      orderBy: { reportDate: 'desc' },
      take: 200,
    });
    return { data: reports };
  }

  @Post('sites')
  @RequirePermissions('project.site.execute')
  async createSite(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateDailyReportDto,
  ) {
    const report = await this.prisma.dailyReport.create({
      data: {
        tenantId: req.user.tenantId!,
        projectId: body.projectId,
        reportDate: new Date(body.reportDate),
        morningWeather: body.morningWeather,
        afternoonWeather: body.afternoonWeather,
        eveningWeather: body.eveningWeather,
        manpowerSummary: body.manpowerSummary,
        equipmentSummary: body.equipmentSummary,
        materialSummary: body.materialSummary,
        workSummary: body.workSummary,
        progressPercent: body.progressPercent || 0,
        issues: body.issues,
        status: body.status || 'DRAFT',
        wbsTaskId: body.wbsTaskId,
        submittedBy: req.user.id,
        resources: {
          create: (body as any).resources?.map((r: any) => ({
            tenantId: req.user.tenantId!,
            resourceType: r.resourceType,
            quantity: r.quantity,
            unit: r.unit,
            notes: r.notes,
          })) || [],
        },
      },
      include: { resources: true },
    });
    return report;
  }

  @Patch('sites/:id')
  @RequirePermissions('project.site.execute')
  async updateSite(
    @Param('id') id: string,
    @Body() body: Partial<CreateDailyReportDto>,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const report = await this.prisma.$transaction(async (tx) => {
      if ((body as any).resources) {
        await tx.resourceUsage.deleteMany({
          where: { dailyReportId: id },
        });
      }

      return tx.dailyReport.update({
        where: { id },
        data: {
          morningWeather: body.morningWeather,
          afternoonWeather: body.afternoonWeather,
          eveningWeather: body.eveningWeather,
          manpowerSummary: body.manpowerSummary,
          equipmentSummary: body.equipmentSummary,
          materialSummary: body.materialSummary,
          workSummary: body.workSummary,
          progressPercent: body.progressPercent,
          issues: body.issues,
          status: body.status || 'SUBMITTED',
          wbsTaskId: body.wbsTaskId,
          resources: (body as any).resources
            ? {
                create: (body as any).resources.map((r: any) => ({
                  tenantId: req.user.tenantId!,
                  resourceType: r.resourceType,
                  quantity: r.quantity,
                  unit: r.unit,
                  notes: r.notes,
                })),
              }
            : undefined,
        },
        include: { resources: true },
      });
    });
    return report;
  }

  @Get('daily-reports')
  @RequirePermissions('project.site.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (projectId) where.projectId = projectId;

    const reports = await this.prisma.dailyReport.findMany({
      where,
      include: { 
        project: true, 
        wbsTask: true, 
        resources: true 
      },
      orderBy: { reportDate: 'desc' },
      take: 200,
    });
    return { data: reports };
  }

  @Post('daily-reports')
  @RequirePermissions('project.site.execute')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateDailyReportDto,
  ) {
    const report = await this.prisma.dailyReport.create({
      data: {
        tenantId: req.user.tenantId!,
        projectId: body.projectId,
        reportDate: new Date(body.reportDate),
        morningWeather: body.morningWeather,
        afternoonWeather: body.afternoonWeather,
        eveningWeather: body.eveningWeather,
        manpowerSummary: body.manpowerSummary,
        equipmentSummary: body.equipmentSummary,
        materialSummary: body.materialSummary,
        workSummary: body.workSummary,
        progressPercent: body.progressPercent || 0,
        issues: body.issues,
        status: body.status || 'DRAFT',
        wbsTaskId: body.wbsTaskId,
        siteId: (body as any).siteId,
        submittedBy: req.user.id,
        resources: {
          create: (body as any).resources?.map((r: any) => ({
            tenantId: req.user.tenantId!,
            resourceType: r.resourceType,
            quantity: r.quantity,
            unit: r.unit,
            notes: r.notes,
          })) || [],
        },
      },
      include: { resources: true },
    });
    return report;
  }

  @Get('daily-reports/:id')
  @RequirePermissions('project.site.read')
  async get(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const report = await this.prisma.dailyReport.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { resources: true, wbsTask: true },
    });
    return report;
  }

  @Patch('daily-reports/:id')
  @RequirePermissions('project.site.execute')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateDailyReportDto>,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const report = await this.prisma.$transaction(async (tx) => {
      if ((body as any).resources) {
        await tx.resourceUsage.deleteMany({
          where: { dailyReportId: id },
        });
      }

      return tx.dailyReport.update({
        where: { id },
        data: {
          morningWeather: body.morningWeather,
          afternoonWeather: body.afternoonWeather,
          eveningWeather: body.eveningWeather,
          manpowerSummary: body.manpowerSummary,
          equipmentSummary: body.equipmentSummary,
          materialSummary: body.materialSummary,
          workSummary: body.workSummary,
          progressPercent: body.progressPercent,
          issues: body.issues,
          status: body.status || 'SUBMITTED',
          wbsTaskId: body.wbsTaskId,
          resources: (body as any).resources
            ? {
                create: (body as any).resources.map((r: any) => ({
                  tenantId: req.user.tenantId!,
                  resourceType: r.resourceType,
                  quantity: r.quantity,
                  unit: r.unit,
                  notes: r.notes,
                })),
              }
            : undefined,
        },
        include: { resources: true },
      });
    });
    return report;
  }

  @Post('daily-reports/:id/resources')
  @RequirePermissions('project.site.execute')
  async addResource(
    @Param('id') id: string,
    @Body() body: { resourceType: string; quantity: number; unit?: string; notes?: string },
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const resource = await this.prisma.resourceUsage.create({
      data: {
        tenantId: req.user.tenantId!,
        dailyReportId: id,
        resourceType: body.resourceType,
        quantity: body.quantity,
        unit: body.unit,
        notes: body.notes,
      },
    });
    return resource;
  }

  @Delete('daily-reports/:id/resources/:resourceId')
  @RequirePermissions('project.site.execute')
  async removeResource(
    @Param('id') id: string,
    @Param('resourceId') resourceId: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    await this.prisma.resourceUsage.delete({
      where: { id: resourceId },
    });
    return { success: true };
  }

  @Post('daily-reports/:id/photos')
  @RequirePermissions('project.site.execute')
  async addPhoto(
    @Param('id') id: string,
    @Body() body: { fileId: string; description?: string },
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return { success: true, message: 'Photo upload endpoint - implement with file service' };
  }

  @Get('sites/:id/progress')
  @RequirePermissions('project.site.read')
  async getProgress(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const reports = await this.prisma.dailyReport.findMany({
      where: { projectId: id, tenantId: req.user.tenantId! },
      select: { reportDate: true, workSummary: true },
      orderBy: { reportDate: 'desc' },
      take: 30,
    });
    return { data: reports };
  }
}
