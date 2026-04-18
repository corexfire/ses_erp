import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AuditService } from '../audit/audit.service';
import { PrismaService } from '../prisma/prisma.service';

export class CreateProjectDto {
  code!: string;
  name!: string;
  customerId?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  totalBudget?: number;
}

export class UpdateProjectDto {
  name?: string;
  customerId?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  totalBudget?: number;
  status?: string;
}

export class UpdateProjectBillingSetupDto {
  retentionRate?: number;
  downPaymentTotal?: number;
  dpRecoveryRate?: number;
  billingType?: 'PROGRESS' | 'MILESTONE';
}

export class CreateWbsTaskDto {
  projectId!: string;
  taskCode!: string;
  taskName!: string;
  description?: string;
  priority?: string;
  parentTaskId?: string;
  assigneeId?: string;
  level!: number;
  plannedWeight?: number;
  plannedCost?: number;
  startDate?: string;
  endDate?: string;
  taskType?: string;
  tags?: string;
  status?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('project')
export class ProjectController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('projects')
  @RequirePermissions('project.setup.read')
  async listProjects(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status) where.status = status;

    const projects = await this.prisma.project.findMany({
      where,
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return { data: projects };
  }

  @Get('projects/:id')
  @RequirePermissions('project.setup.read')
  async getProject(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const project = await this.prisma.project.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        customer: true,
        wbsTasks: { 
          include: { assignee: true },
          orderBy: { level: 'asc' } 
        },
        budgets: true,
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  @Post('projects')
  @RequirePermissions('project.setup.manage')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateProjectDto,
  ) {
    const project = await this.prisma.project.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
        customerId: body.customerId,
        description: body.description,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        totalBudget: body.totalBudget,
        status: 'DRAFT',
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'Project',
      entityId: project.id,
      metadata: { code: project.code },
    });

    return project;
  }

  @Patch('projects/:id')
  @RequirePermissions('project.setup.manage')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProjectDto,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const existing = await this.prisma.project.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!existing) throw new NotFoundException('Project not found');

    const project = await this.prisma.project.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        customerId: body.customerId ?? existing.customerId,
        description: body.description ?? existing.description,
        startDate: body.startDate ? new Date(body.startDate) : existing.startDate,
        endDate: body.endDate ? new Date(body.endDate) : existing.endDate,
        totalBudget: body.totalBudget ?? existing.totalBudget,
        status: body.status ?? existing.status,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'UPDATE',
      entity: 'Project',
      entityId: project.id,
      metadata: { code: project.code },
    });

    return project;
  }

  @Post('projects/:id/close')
  @RequirePermissions('project.setup.manage')
  async close(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const project = await this.prisma.project.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!project) throw new NotFoundException('Project not found');

    const updated = await this.prisma.project.update({
      where: { id },
      data: { status: 'CLOSED' },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'CLOSE',
      entity: 'Project',
      entityId: id,
      metadata: { code: project.code },
    });

    return updated;
  }

  @Patch('projects/:id/billing-setup')
  @RequirePermissions('project.setup.manage')
  async updateBillingSetup(
    @Param('id') id: string,
    @Body() body: UpdateProjectBillingSetupDto,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const project = await this.prisma.project.update({
      where: { id, tenantId: req.user.tenantId! },
      data: {
        retentionRate: body.retentionRate ?? undefined,
        downPaymentTotal: body.downPaymentTotal ?? undefined,
        dpRecoveryRate: body.dpRecoveryRate ?? undefined,
        billingType: body.billingType ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'UPDATE_BILLING_SETUP',
      entity: 'Project',
      entityId: id,
    });

    return project;
  }

  @Get('projects/:id/wbs')
  @RequirePermissions('project.setup.read')
  async getProjectWbs(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const tasks = await this.prisma.wbsTask.findMany({
      where: { projectId: id, tenantId: req.user.tenantId! },
      orderBy: [{ level: 'asc' }, { taskCode: 'asc' }],
      take: 500,
    });
    return { wbsTasks: tasks };
  }

  @Get('wbs')
  @RequirePermissions('project.wbs.read')
  async listWbs(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
    @Query('assigneeId') assigneeId?: string,
    @Query('teamId') teamId?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (projectId) where.projectId = projectId;
    if (assigneeId) where.assigneeId = assigneeId;
    if (teamId) where.teamId = teamId;

    const tasks = await this.prisma.wbsTask.findMany({
      where,
      include: { assignee: true },
      orderBy: [{ level: 'asc' }, { taskCode: 'asc' }],
      take: 500,
    });
    return { data: tasks };
  }

  @Post('wbs')
  @RequirePermissions('project.wbs.manage')
  async createWbs(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateWbsTaskDto,
  ) {
    const task = await this.prisma.wbsTask.create({
      data: {
        tenantId: req.user.tenantId!,
        projectId: body.projectId,
        taskCode: body.taskCode,
        taskName: body.taskName,
        description: body.description,
        priority: body.priority || 'MEDIUM',
        parentTaskId: body.parentTaskId,
        assigneeId: body.assigneeId,
        level: body.level,
        plannedWeight: body.plannedWeight || 0,
        plannedCost: body.plannedCost,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        taskType: body.taskType || 'TASK',
        tags: body.tags,
        status: body.status || 'PENDING',
      },
    });
    return task;
  }

  @Patch('wbs/:id')
  @RequirePermissions('project.wbs.manage')
  async updateWbs(
    @Param('id') id: string,
    @Body() body: Partial<CreateWbsTaskDto>,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const task = await this.prisma.wbsTask.update({
      where: { id },
      data: {
        taskName: body.taskName,
        description: body.description,
        priority: body.priority,
        parentTaskId: body.parentTaskId,
        assigneeId: body.assigneeId,
        plannedWeight: body.plannedWeight,
        plannedCost: body.plannedCost,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        taskType: body.taskType,
        tags: body.tags,
        status: body.status,
      },
    });
    return task;
  }

  @Patch('wbs/:id/status')
  @RequirePermissions('project.wbs.manage')
  async updateWbsStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const existingTask = await this.prisma.wbsTask.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { project: true },
    });
    if (!existingTask) throw new NotFoundException('WBS Task not found');

    const plannedCost = Number(existingTask.plannedCost || 0);

    const updatedTask = await this.prisma.$transaction(async (tx) => {
      const task = await tx.wbsTask.update({
        where: { id },
        data: { status },
      });

      if (status === 'COMPLETED' && plannedCost > 0) {
        const jeCount = await tx.journalEntry.count({ where: { tenantId: req.user.tenantId! } });
        const jeNo = `JE-PRJ-${String(jeCount + 1).padStart(6, '0')}`;

         const journal = await tx.journalEntry.create({
           data: {
             tenantId: req.user.tenantId!,
             entryNo: jeNo,
             entryDate: new Date(),
             description: `Project Task Complete - ${existingTask.taskCode}: ${existingTask.taskName}`,
             referenceNo: existingTask.project?.code,
             journalType: 'PROJECT',
             totalDebit: plannedCost,
             totalCredit: plannedCost,
             status: 'POSTED',
           }
         });

        await tx.journalEntryLine.createMany({
          data: [
            {
              tenantId: req.user.tenantId!,
              journalEntryId: journal.id,
              lineNo: 1,
              accountCode: '5-2000-00',
              description: 'Project Expense',
              debit: plannedCost,
              credit: 0,
              referenceId: task.id,
            },
            {
              tenantId: req.user.tenantId!,
              journalEntryId: journal.id,
              lineNo: 2,
              accountCode: '1-1320-00',
              description: 'Project Costing - WIP',
              debit: 0,
              credit: plannedCost,
              referenceId: task.id,
            }
          ]
        });
      }

      return task;
    });

    return updatedTask;
  }

  @Get('tasks/deadlines')
  @RequirePermissions('project.wbs.read')
  async listDeadlines(
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const tasks = await this.prisma.wbsTask.findMany({
      where: { 
        tenantId: req.user.tenantId!,
        endDate: { not: null }
      },
      include: {
        project: true,
        assignee: true,
        team: true
      },
      orderBy: { endDate: 'asc' }
    });

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const buckets = {
      OVERDUE: tasks.filter(t => t.endDate && t.endDate < now && t.status !== 'COMPLETED'),
      TODAY: tasks.filter(t => t.endDate && t.endDate >= now && t.endDate < tomorrow),
      THIS_WEEK: tasks.filter(t => t.endDate && t.endDate >= tomorrow && t.endDate < nextWeek),
      FUTURE: tasks.filter(t => t.endDate && t.endDate >= nextWeek)
    };

    return { data: buckets, all: tasks };
  }
}