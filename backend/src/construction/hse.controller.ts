import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('construction/hse')
export class HseController {
  constructor(
    private prisma: PrismaService,
    private notification: NotificationService,
  ) {}

  @Get()
  @RequirePermissions('project.site.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
    @Query('type') type?: string,
    @Query('category') category?: string, // 'INCIDENT' or 'INSPECTION'
  ) {
    const tenantId = req.user.tenantId!;
    const where: any = { tenantId };
    if (projectId) where.projectId = projectId;

    if (category === 'INSPECTION') {
      const data = await this.prisma.hseInspection.findMany({
        where,
        include: { project: true },
        orderBy: { inspectionDate: 'desc' },
      });
      return { data };
    }

    // Default or category === 'INCIDENT'
    const data = await this.prisma.hseIncident.findMany({
      where,
      include: { project: true },
      orderBy: { incidentDate: 'desc' },
    });
    return { data };
  }

  @Get('stats')
  @RequirePermissions('project.site.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;
    
    const [totalIncidents, openIncidents, avgScore, fatalIncidents] = await Promise.all([
      this.prisma.hseIncident.count({ where: { tenantId } }),
      this.prisma.hseIncident.count({ where: { tenantId, status: 'OPEN' } }),
      this.prisma.hseInspection.aggregate({ 
        where: { tenantId }, 
        _avg: { score: true } 
      }),
      this.prisma.hseIncident.findMany({ 
        where: { tenantId, severity: 'FATAL' },
        orderBy: { incidentDate: 'desc' },
        take: 1,
      }),
    ]);

    const lastFatalDate = fatalIncidents.length > 0 ? fatalIncidents[0].incidentDate : new Date(0);

    const [attendanceHours, subconLogs] = await Promise.all([
      this.prisma.attendance.aggregate({
        where: { tenantId, date: { gt: lastFatalDate } },
        _sum: { workHours: true },
      }),
      this.prisma.subcontractorLog.aggregate({
        where: { tenantId, dailyReport: { reportDate: { gt: lastFatalDate } } },
        _sum: { workerCount: true },
      }),
    ]);

    const totalAttendance = Number(attendanceHours._sum.workHours || 0);
    const totalSubcon = Number(subconLogs._sum.workerCount || 0) * 8; // Standard 8h shift estimate

    return {
      totalIncidents,
      openIncidents,
      avgScore: Number(avgScore._avg.score || 0),
      fatalCount: await this.prisma.hseIncident.count({ where: { tenantId, severity: 'FATAL' } }),
      safeManHours: totalAttendance + totalSubcon,
    };
  }

  @Post('incident')
  @RequirePermissions('project.site.execute')
  async createIncident(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: any,
  ) {
    const incident = await this.prisma.hseIncident.create({
      data: {
        ...body,
        tenantId: req.user.tenantId!,
        incidentDate: new Date(body.incidentDate),
      },
    });

    if (['FATAL', 'MAJOR'].includes(incident.severity)) {
      await this.notification.triggerEvent({
        tenantId: req.user.tenantId!,
        actorUserId: req.user.id,
        eventKey: 'hse.incident_high_severity',
        recipients: [{ 
          title: `⚠️ CRITICAL HSE INCIDENT: ${incident.type}`,
          message: `A ${incident.severity} incident has been reported: ${incident.description}. Location: ${incident.location || 'N/A'}`
        }],
        payload: { incidentId: incident.id, severity: incident.severity }
      });
    }

    return incident;
  }

  @Post('inspection')
  @RequirePermissions('project.site.execute')
  async createInspection(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: any,
  ) {
    return this.prisma.hseInspection.create({
      data: {
        ...body,
        tenantId: req.user.tenantId!,
        inspectionDate: new Date(body.inspectionDate),
      },
    });
  }

  @Patch('incident/:id')
  @RequirePermissions('project.site.execute')
  async updateIncident(@Param('id') id: string, @Body() body: any) {
    return this.prisma.hseIncident.update({
      where: { id },
      data: {
        ...body,
        incidentDate: body.incidentDate ? new Date(body.incidentDate) : undefined,
      },
    });
  }

  @Patch('inspection/:id')
  @RequirePermissions('project.site.execute')
  async updateInspection(@Param('id') id: string, @Body() body: any) {
    return this.prisma.hseInspection.update({
      where: { id },
      data: {
        ...body,
        inspectionDate: body.inspectionDate ? new Date(body.inspectionDate) : undefined,
      },
    });
  }

  @Delete('incident/:id')
  @RequirePermissions('project.site.execute')
  async removeIncident(@Param('id') id: string) {
    return this.prisma.hseIncident.delete({ where: { id } });
  }

  @Delete('inspection/:id')
  @RequirePermissions('project.site.execute')
  async removeInspection(@Param('id') id: string) {
    return this.prisma.hseInspection.delete({ where: { id } });
  }
}
