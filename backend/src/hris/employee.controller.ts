import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
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
