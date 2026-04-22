import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

export class CreateDailyProgressDto {
  projectId!: string;
  reportDate!: string;
  morningWeather?: string;
  afternoonWeather?: string;
  eveningWeather?: string;
  workSummary?: string;
  progressPercent?: number;
  issues?: string;
  status?: string;
  wbsTaskId?: string;
  resources?: any[];
  photos?: any[];
  subcontractors?: any[];
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('construction/daily-progress')
export class DailyProgressController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @RequirePermissions('project.site.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
    @Query('status') status?: string,
    @Query('q') q?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (projectId) where.projectId = projectId;
    if (status && status !== 'ALL') where.status = status;
    if (q) {
      where.OR = [
        { workSummary: { contains: q, mode: 'insensitive' } },
        { project: { name: { contains: q, mode: 'insensitive' } } },
      ];
    }

    const reports = await this.prisma.dailyReport.findMany({
      where,
      include: { 
        project: true, 
        wbsTask: true,
        resources: true,
        photos: true,
        subcontractors: true
      },
      orderBy: { reportDate: 'desc' },
      take: 100,
    });
    return { data: reports };
  }

  @Get('stats')
  @RequirePermissions('project.site.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;
    const [total, pending, avgProgress] = await Promise.all([
      this.prisma.dailyReport.count({ where: { tenantId } }),
      this.prisma.dailyReport.count({ where: { tenantId, status: 'SUBMITTED' } }),
      this.prisma.dailyReport.aggregate({
        where: { tenantId },
        _avg: { progressPercent: true }
      }),
    ]);

    return { 
      total, 
      pending, 
      avgProgress: Number(avgProgress._avg.progressPercent || 0).toFixed(1) 
    };
  }

  @Post()
  @RequirePermissions('project.site.execute')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateDailyProgressDto,
  ) {
    return this.prisma.dailyReport.create({
      data: {
        tenantId: req.user.tenantId!,
        projectId: body.projectId,
        reportDate: new Date(body.reportDate),
        morningWeather: body.morningWeather,
        afternoonWeather: body.afternoonWeather,
        eveningWeather: body.eveningWeather,
        workSummary: body.workSummary,
        progressPercent: body.progressPercent || 0,
        issues: body.issues,
        status: body.status || 'DRAFT',
        wbsTaskId: body.wbsTaskId,
        submittedBy: req.user.id,
        resources: {
          create: body.resources?.map(r => ({
            tenantId: req.user.tenantId!,
            resourceType: r.resourceType,
            quantity: r.quantity,
            unit: r.unit,
            notes: r.notes,
          })) || [],
        },
        photos: {
          create: body.photos?.map(p => ({
            tenantId: req.user.tenantId!,
            fileId: p.fileId,
            caption: p.caption,
            category: p.category,
          })) || [],
        },
        subcontractors: {
          create: body.subcontractors?.map(s => ({
            tenantId: req.user.tenantId!,
            subcontractorId: s.subcontractorId,
            subcontractorName: s.subcontractorName,
            workerCount: s.workerCount,
            workDescription: s.workDescription,
          })) || [],
        },
      },
      include: { resources: true, photos: true, subcontractors: true },
    });
  }

  @Patch(':id')
  @RequirePermissions('project.site.execute')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateDailyProgressDto>,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.$transaction(async (tx) => {
      if (body.resources) {
        await tx.resourceUsage.deleteMany({ where: { dailyReportId: id } });
      }
      if (body.photos) {
        await tx.sitePhoto.deleteMany({ where: { dailyReportId: id } });
      }
      if (body.subcontractors) {
        await tx.subcontractorLog.deleteMany({ where: { dailyReportId: id } });
      }

      return tx.dailyReport.update({
        where: { id },
        data: {
          morningWeather: body.morningWeather,
          afternoonWeather: body.afternoonWeather,
          eveningWeather: body.eveningWeather,
          workSummary: body.workSummary,
          progressPercent: body.progressPercent,
          issues: body.issues,
          status: body.status,
          wbsTaskId: body.wbsTaskId,
          resources: body.resources ? {
            create: body.resources.map(r => ({
              tenantId: req.user.tenantId!,
              resourceType: r.resourceType,
              quantity: r.quantity,
              unit: r.unit,
              notes: r.notes,
            })),
          } : undefined,
          photos: body.photos ? {
            create: body.photos.map(p => ({
              tenantId: req.user.tenantId!,
              fileId: p.fileId,
              caption: p.caption,
              category: p.category,
            })),
          } : undefined,
          subcontractors: body.subcontractors ? {
            create: body.subcontractors.map(s => ({
              tenantId: req.user.tenantId!,
              subcontractorId: s.subcontractorId,
              subcontractorName: s.subcontractorName,
              workerCount: s.workerCount,
              workDescription: s.workDescription,
            })),
          } : undefined,
        },
        include: { resources: true, photos: true, subcontractors: true },
      });
    });
  }

  @Delete(':id')
  @RequirePermissions('project.site.execute')
  async remove(@Param('id') id: string) {
    await this.prisma.dailyReport.delete({ where: { id } });
    return { success: true };
  }
}
