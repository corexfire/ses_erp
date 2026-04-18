import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/attendance')
export class AttendanceController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.attendance.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('date') date?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (date) where.date = { gte: new Date(date), lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) };

    const attendances = await this.prisma.attendance.findMany({
      where,
      include: { employee: true },
      orderBy: [{ date: 'desc' }],
    });
    return { attendances };
  }

  @Get('summary')
  @RequirePermissions('hris.attendance.read')
  async summary(@Req() req: FastifyRequest & { user: AuthUser }, @Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    const attendances = await this.prisma.attendance.findMany({
      where: {
        tenantId: req.user.tenantId!,
        date: { gte: new Date(startDate), lte: new Date(endDate) },
      },
      include: { employee: true },
    });

    const summary = {
      present: attendances.filter(a => a.status === 'PRESENT').length,
      absent: attendances.filter(a => a.status === 'ABSENT').length,
      late: attendances.filter(a => a.status === 'LATE').length,
      leave: attendances.filter(a => a.status === 'LEAVE').length,
    };

    return { attendances, summary };
  }

  @Post()
  @RequirePermissions('hris.attendance.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { employeeId: string; date: string; checkIn?: string; checkOut?: string; status?: string; notes?: string }) {
    const workHours = body.checkIn && body.checkOut ? 8 : 0;

    const attendance = await this.prisma.attendance.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeId: body.employeeId,
        date: new Date(body.date),
        checkIn: body.checkIn ? new Date(body.checkIn) : null,
        checkOut: body.checkOut ? new Date(body.checkOut) : null,
        workHours,
        status: body.status || 'PRESENT',
        notes: body.notes,
      },
      include: { employee: true },
    });
    return { attendance };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/shift')
export class ShiftController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.shift.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const shifts = await this.prisma.shift.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: [{ name: 'asc' }],
    });
    return { shifts };
  }

  @Post()
  @RequirePermissions('hris.shift.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { name: string; code: string; startTime: string; endTime: string; isFlexi?: boolean }) {
    const shift = await this.prisma.shift.create({
      data: {
        tenantId: req.user.tenantId!,
        name: body.name,
        code: body.code,
        startTime: body.startTime,
        endTime: body.endTime,
        isFlexi: body.isFlexi || false,
        isActive: true,
      },
    });
    return { shift };
  }

  @Post(':id')
  @RequirePermissions('hris.shift.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { isActive?: boolean }) {
    const shift = await this.prisma.shift.update({
      where: { id },
      data: { ...(body.isActive !== undefined && { isActive: body.isActive }) },
    });
    return { shift };
  }
}