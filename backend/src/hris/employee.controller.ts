import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/employees')
export class EmployeeController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.employee.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('department') department?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (department) where.department = department;

    const employees = await this.prisma.employee.findMany({
      where,
      include: { manager: true, reports: true },
      orderBy: [{ firstName: 'asc' }],
    });
    return { employees };
  }

  @Get(':id')
  @RequirePermissions('hris.employee.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { manager: true, reports: true, attendances: { orderBy: [{ date: 'desc' }], take: 10 } },
    });
    return { employee };
  }

  @Post()
  @RequirePermissions('hris.employee.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { employeeNo: string; firstName: string; lastName?: string; email: string; phone?: string; department?: string; position?: string; hireDate?: string; salary?: number; managerId?: string }) {
    const employee = await this.prisma.employee.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeNo: body.employeeNo,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        department: body.department,
        position: body.position,
        hireDate: body.hireDate ? new Date(body.hireDate) : null,
        salary: body.salary,
        managerId: body.managerId,
        status: 'ACTIVE',
      },
    });
    return { employee };
  }

  @Post(':id')
  @RequirePermissions('hris.employee.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { firstName?: string; lastName?: string; email?: string; phone?: string; department?: string; position?: string; status?: string; salary?: number }) {
    const employee = await this.prisma.employee.update({
      where: { id },
      data: {
        ...(body.firstName && { firstName: body.firstName }),
        ...(body.lastName && { lastName: body.lastName }),
        ...(body.email && { email: body.email }),
        ...(body.phone && { phone: body.phone }),
        ...(body.department && { department: body.department }),
        ...(body.position && { position: body.position }),
        ...(body.status && { status: body.status }),
        ...(body.salary && { salary: body.salary }),
      },
    });
    return { employee };
  }

  // --- MOVEMENTS & DISCIPLINARY ---
  @Get(':id/movements')
  @RequirePermissions('hris.orgStructure.read')
  async listMovements(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const movements = await this.prisma.employeeMovement.findMany({
      where: { employeeId: id, tenantId: req.user.tenantId! },
      orderBy: { effectiveDate: 'desc' },
    });
    return { movements };
  }

  @Post(':id/movements')
  @RequirePermissions('hris.orgStructure.update')
  async createMovement(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: any) {
    return await this.prisma.$transaction(async (tx) => {
      const movement = await tx.employeeMovement.create({
        data: {
          tenantId: req.user.tenantId!,
          employeeId: id,
          type: body.type,
          fromDept: body.fromDept,
          toDept: body.toDept,
          fromPos: body.fromPos,
          toPos: body.toPos,
          effectiveDate: new Date(body.effectiveDate),
          reason: body.reason,
        },
      });

      // Update employee record
      await tx.employee.update({
        where: { id },
        data: {
          ...(body.toDept && { department: body.toDept }),
          ...(body.toPos && { position: body.toPos }),
        },
      });

      return { movement };
    });
  }

  @Get(':id/disciplinary')
  @RequirePermissions('hris.employee.read')
  async listDisciplinary(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const actions = await this.prisma.disciplinaryAction.findMany({
      where: { employeeId: id, tenantId: req.user.tenantId! },
      orderBy: { issueDate: 'desc' },
    });
    return { actions };
  }

  @Post(':id/disciplinary')
  @RequirePermissions('hris.employee.update')
  async createDisciplinary(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: any) {
    const action = await this.prisma.disciplinaryAction.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeId: id,
        type: body.type,
        issueDate: new Date(body.issueDate),
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
        reason: body.reason,
        status: 'ACTIVE',
      },
    });
    return { action };
  }

  // --- OFFBOARDING & SEVERANCE ---
  @Get(':id/termination-calc')
  @RequirePermissions('hris.employee.read')
  async calcTermination(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const emp = await this.prisma.employee.findFirst({
      where: { id, tenantId: req.user.tenantId! }
    });
    if (!emp) throw new NotFoundException('Employee not found');

    const hireDate = emp.hireDate || new Date();
    const now = new Date();
    const serviceYears = (now.getTime() - hireDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    const salary = Number(emp.salary || 0);

    // 1. Severance (Pesangon)
    let sevMultiplier = 1;
    if (serviceYears >= 8) sevMultiplier = 9;
    else if (serviceYears >= 7) sevMultiplier = 8;
    else if (serviceYears >= 6) sevMultiplier = 7;
    else if (serviceYears >= 5) sevMultiplier = 6;
    else if (serviceYears >= 4) sevMultiplier = 5;
    else if (serviceYears >= 3) sevMultiplier = 4;
    else if (serviceYears >= 2) sevMultiplier = 3;
    else if (serviceYears >= 1) sevMultiplier = 2;

    const severance = salary * sevMultiplier;

    // 2. Service Pay (UPMK)
    let upmkMultiplier = 0;
    if (serviceYears >= 24) upmkMultiplier = 10;
    else if (serviceYears >= 21) upmkMultiplier = 8;
    else if (serviceYears >= 18) upmkMultiplier = 7;
    else if (serviceYears >= 15) upmkMultiplier = 6;
    else if (serviceYears >= 12) upmkMultiplier = 5;
    else if (serviceYears >= 9) upmkMultiplier = 4;
    else if (serviceYears >= 6) upmkMultiplier = 3;
    else if (serviceYears >= 3) upmkMultiplier = 2;

    const servicePay = salary * upmkMultiplier;

    // 3. Compensation (UPH) - Simplified 15%
    const compensation = (severance + servicePay) * 0.15;

    return {
      serviceYears: serviceYears.toFixed(2),
      salary,
      severance,
      servicePay,
      compensation,
      total: severance + servicePay + compensation
    };
  }

  @Post(':id/terminate')
  @RequirePermissions('hris.employee.update')
  async terminate(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: any) {
    return await this.prisma.$transaction(async (tx) => {
      const termination = await tx.employeeTermination.create({
        data: {
          tenantId: req.user.tenantId!,
          employeeId: id,
          terminationDate: new Date(body.terminationDate),
          reason: body.reason,
          type: body.type,
          severanceAmount: body.severanceAmount,
          servicePayAmount: body.servicePayAmount,
          compensationPayAmount: body.compensationPayAmount,
          totalAmount: body.totalAmount,
          status: 'PENDING',
          notes: body.notes,
        },
      });

      await tx.employee.update({
        where: { id },
        data: { status: 'INACTIVE' },
      });

      return { termination };
    });
  }

  @Get('terminations')
  @RequirePermissions('hris.employee.read')
  async listTerminations(@Req() req: FastifyRequest & { user: AuthUser }) {
    const terminations = await this.prisma.employeeTermination.findMany({
      where: { tenantId: req.user.tenantId! },
      include: { employee: true },
      orderBy: { terminationDate: 'desc' },
    });
    return { terminations };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/org-structure')
export class OrgStructureController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.orgStructure.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const units = await this.prisma.organizationUnit.findMany({
      where: { tenantId: req.user.tenantId! },
      include: { parent: true, children: true },
      orderBy: [{ name: 'asc' }],
    });
    return { units };
  }

  @Post()
  @RequirePermissions('hris.orgStructure.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { name: string; code: string; parentId?: string; managerId?: string; type?: string }) {
    const unit = await this.prisma.organizationUnit.create({
      data: {
        tenantId: req.user.tenantId!,
        name: body.name,
        code: body.code,
        parentId: body.parentId,
        managerId: body.managerId,
        type: body.type || 'DEPARTMENT',
      },
    });
    return { unit };
  }

  @Get(':id')
  @RequirePermissions('hris.orgStructure.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const unit = await this.prisma.organizationUnit.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { parent: true, children: true, manager: true },
    });
    return { unit };
  }

  @Patch(':id')
  @RequirePermissions('hris.orgStructure.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { name?: string; code?: string; parentId?: string; managerId?: string; type?: string }) {
    const unit = await this.prisma.organizationUnit.update({
      where: { id, tenantId: req.user.tenantId! },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.code && { code: body.code }),
        ...(body.parentId !== undefined && { parentId: body.parentId }),
        ...(body.managerId !== undefined && { managerId: body.managerId }),
        ...(body.type && { type: body.type }),
      },
    });
    return { unit };
  }

  @Delete(':id')
  @RequirePermissions('hris.orgStructure.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.organizationUnit.delete({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { success: true };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/recruitment')
export class RecruitmentController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.recruitment.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (status) where.status = status;

    const candidates = await this.prisma.recruitmentCandidate.findMany({
      where,
      orderBy: [{ appliedAt: 'desc' }],
    });
    return { candidates };
  }

  @Post()
  @RequirePermissions('hris.recruitment.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { candidateNo: string; firstName: string; lastName?: string; email: string; phone?: string; position?: string }) {
    const candidate = await this.prisma.recruitmentCandidate.create({
      data: {
        tenantId: req.user.tenantId!,
        candidateNo: body.candidateNo,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        position: body.position,
        status: 'APPLIED',
      },
    });
    return { candidate };
  }

  @Post(':id/advance')
  @RequirePermissions('hris.recruitment.update')
  async advance(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { status: string }) {
    const candidate = await this.prisma.recruitmentCandidate.update({
      where: { id },
      data: { status: body.status },
    });
    return { candidate };
  }
}
