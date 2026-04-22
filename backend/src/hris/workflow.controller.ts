import { Controller, Get, Post, Patch, Body, Param, Query, Req, UseGuards, NotFoundException } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/workflow')
export class HrisWorkflowController {
  constructor(private readonly prisma: PrismaService) {}

  // --- LEAVE REQUESTS ---
  @Get('leave')
  @RequirePermissions('hris.leave.read')
  async listLeaves(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (status) where.status = status;
    const leaves = await this.prisma.leaveRequest.findMany({
      where,
      include: { employee: true },
      orderBy: { startDate: 'desc' },
    });
    return { leaves };
  }

  @Post('leave')
  @RequirePermissions('hris.leave.create')
  async createLeave(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: any) {
    const leave = await this.prisma.leaveRequest.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeId: body.employeeId,
        leaveType: body.leaveType,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        reason: body.reason,
        status: 'PENDING',
      },
    });
    return { leave };
  }

  @Patch('leave/:id/status')
  @RequirePermissions('hris.leave.approve')
  async updateLeaveStatus(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { status: string }) {
    const leave = await this.prisma.leaveRequest.update({
      where: { id, tenantId: req.user.tenantId! },
      data: { 
        status: body.status,
        approvedById: body.status === 'APPROVED' ? req.user.id : undefined 
      },
      include: { employee: true },
    });

    // If approved, update LeaveBalance
    if (body.status === 'APPROVED') {
      const days = Math.ceil((leave.endDate.getTime() - leave.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      await this.prisma.leaveBalance.updateMany({
        where: { 
          employeeId: leave.employeeId, 
          leaveType: leave.leaveType,
          period: String(leave.startDate.getFullYear())
        },
        data: { used: { increment: days } }
      });
    }

    return { leave };
  }

  @Get('leave/balances')
  @RequirePermissions('hris.leave.read')
  async listBalances(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string) {
    const balances = await this.prisma.leaveBalance.findMany({
      where: { 
        tenantId: req.user.tenantId!,
        period: period || String(new Date().getFullYear())
      },
      include: { employee: true }
    });
    return { balances };
  }

  @Post('leave/init-balances')
  @RequirePermissions('hris.leave.update')
  async initBalances(@Req() req: FastifyRequest & { user: AuthUser }) {
    const employees = await this.prisma.employee.findMany({
      where: { tenantId: req.user.tenantId!, status: 'ACTIVE' }
    });
    const period = String(new Date().getFullYear());
    const data = employees.map(emp => ({
      tenantId: req.user.tenantId!,
      employeeId: emp.id,
      leaveType: 'ANNUAL',
      allowance: 12,
      period,
    }));
    await this.prisma.leaveBalance.createMany({ data, skipDuplicates: true });
    return { success: true, count: data.length };
  }

  // --- OVERTIME REQUESTS ---
  @Get('overtime')
  @RequirePermissions('hris.overtime.read')
  async listOvertime(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (status) where.status = status;
    const overtimes = await this.prisma.overtimeRequest.findMany({
      where,
      include: { employee: true },
      orderBy: { date: 'desc' },
    });
    return { overtimes };
  }

  @Post('overtime')
  @RequirePermissions('hris.overtime.create')
  async createOvertime(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: any) {
    const overtime = await this.prisma.overtimeRequest.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeId: body.employeeId,
        date: new Date(body.date),
        hours: body.hours,
        reason: body.reason,
        status: 'PENDING',
      },
    });
    return { overtime };
  }

  @Patch('overtime/:id/status')
  @RequirePermissions('hris.overtime.approve')
  async updateOvertimeStatus(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { status: string }) {
    const overtime = await this.prisma.overtimeRequest.update({
      where: { id, tenantId: req.user.tenantId! },
      data: { 
        status: body.status,
        approvedById: body.status === 'APPROVED' ? req.user.id : undefined 
      },
    });
    return { overtime };
  }
}
