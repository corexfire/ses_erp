import { Controller, Get, Post, Patch, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/productivity')
export class HrisProductivityController {
  constructor(private readonly prisma: PrismaService) {}

  // --- TIMESHEETS ---
  @Get('timesheets')
  @RequirePermissions('hris.employee.read')
  async listTimesheets(@Req() req: FastifyRequest & { user: AuthUser }, @Query('employeeId') employeeId?: string, @Query('date') date?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (employeeId) where.employeeId = employeeId;
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      where.date = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }
    const timesheets = await this.prisma.timesheetEntry.findMany({
      where,
      include: { employee: true },
      orderBy: { date: 'desc' },
    });
    return { timesheets };
  }

  @Post('timesheets')
  @RequirePermissions('hris.employee.update')
  async createTimesheet(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: any) {
    const timesheet = await this.prisma.timesheetEntry.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeId: body.employeeId,
        date: new Date(body.date),
        hours: body.hours,
        description: body.description,
        project: body.project,
      },
    });
    return { timesheet };
  }

  // --- DOCUMENTS ---
  @Get('documents')
  @RequirePermissions('hris.employee.read')
  async listDocuments(@Req() req: FastifyRequest & { user: AuthUser }, @Query('employeeId') employeeId?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (employeeId) where.employeeId = employeeId;
    const documents = await this.prisma.employeeDocument.findMany({
      where,
      include: { employee: true },
      orderBy: { createdAt: 'desc' },
    });
    return { documents };
  }

  @Post('documents')
  @RequirePermissions('hris.employee.update')
  async createDocument(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: any) {
    const document = await this.prisma.employeeDocument.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeId: body.employeeId,
        name: body.name,
        fileUrl: body.fileUrl,
        type: body.type,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
      },
    });
    return { document };
  }
}
