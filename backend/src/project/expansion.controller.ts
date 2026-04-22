import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('project/expansion')
export class ProjectExpansionController {
  constructor(private readonly prisma: PrismaService) {}

  // --- GANTT & DEPENDENCIES ---
  @Get(':id/gantt')
  @RequirePermissions('project.read')
  async getGanttData(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') projectId: string) {
    const tenantId = req.user.tenantId!;
    const tasks = await this.prisma.wbsTask.findMany({
      where: { tenantId, projectId },
      include: {
        successorTasks: true,
        predecessorTasks: true,
        assignee: { select: { name: true, email: true } }
      },
      orderBy: { startDate: 'asc' }
    });

    const enrichedTasks = this.calculateCriticalPath(tasks);
    return { tasks: enrichedTasks };
  }

  private calculateCriticalPath(tasks: any[]) {
    if (!tasks.length) return [];

    // 1. Prepare data structures
    const taskMap = new Map();
    tasks.forEach(t => {
      const duration = Math.max(1, Math.ceil((new Date(t.endDate).getTime() - new Date(t.startDate).getTime()) / (1000 * 60 * 60 * 24)));
      taskMap.set(t.id, { 
        ...t, 
        duration,
        es: 0, ef: 0, ls: 0, lf: 0, slack: 0,
        predecessors: t.predecessorTasks.map(p => p.predecessorId),
        successors: t.successorTasks.map(s => s.successorId)
      });
    });

    const enriched = Array.from(taskMap.values());

    // 2. Forward Pass (Early Start, Early Finish)
    let maxEF = 0;
    enriched.forEach(t => {
      if (t.predecessors.length === 0) {
        t.es = 0;
      } else {
        t.es = Math.max(...t.predecessors.map(pId => taskMap.get(pId)?.ef || 0));
      }
      t.ef = t.es + t.duration;
      if (t.ef > maxEF) maxEF = t.ef;
    });

    // 3. Backward Pass (Late Finish, Late Start)
    // Process in reverse because tasks are sorted by startDate asc
    for (let i = enriched.length - 1; i >= 0; i--) {
      const t = enriched[i];
      if (t.successors.length === 0) {
        t.lf = maxEF;
      } else {
        t.lf = Math.min(...t.successors.map(sId => taskMap.get(sId)?.ls ?? maxEF));
      }
      t.ls = t.lf - t.duration;
      t.slack = t.lf - t.ef;
      t.isCritical = t.slack <= 0;
    }

    return enriched;
  }

  @Post(':id/dependencies')
  @RequirePermissions('project.update')
  async createDependency(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: any) {
    const dep = await this.prisma.taskDependency.create({
      data: {
        tenantId: req.user.tenantId!,
        predecessorId: body.predecessorId,
        successorId: body.successorId,
        dependencyType: body.dependencyType || 'FS',
        lag: body.lag || 0
      }
    });
    return { dependency: dep };
  }

  // --- ISSUES & RISKS ---
  @Get(':id/issues')
  @RequirePermissions('project.read')
  async getIssues(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') projectId: string) {
    const tenantId = req.user.tenantId!;
    const issues = await this.prisma.projectIssue.findMany({
      where: { tenantId, projectId },
      include: { assignee: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    return { issues };
  }

  @Post(':id/issues')
  @RequirePermissions('project.update')
  async createIssue(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') projectId: string, @Body() body: any) {
    const issue = await this.prisma.projectIssue.create({
      data: {
        tenantId: req.user.tenantId!,
        projectId,
        title: body.title,
        description: body.description,
        type: body.type || 'ISSUE',
        severity: body.severity || 'MEDIUM',
        status: 'OPEN',
        assignedToId: body.assignedToId
      }
    });
    return { issue };
  }

  // --- CHANGE ORDERS ---
  @Get(':id/change-orders')
  @RequirePermissions('project.read')
  async getChangeOrders(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') projectId: string) {
    const tenantId = req.user.tenantId!;
    const cos = await this.prisma.projectChangeOrder.findMany({
      where: { tenantId, projectId },
      orderBy: { createdAt: 'desc' }
    });
    return { changeOrders: cos };
  }

  @Post(':id/change-orders')
  @RequirePermissions('project.update')
  async createCO(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') projectId: string, @Body() body: any) {
    const co = await this.prisma.projectChangeOrder.create({
      data: {
        tenantId: req.user.tenantId!,
        projectId,
        orderNo: `CO-${Date.now()}`,
        title: body.title,
        description: body.description,
        amountChange: body.amountChange || 0,
        scheduleImpact: body.scheduleImpact || 0,
        status: 'DRAFT'
      }
    });
    return { changeOrder: co };
  }

  // --- HEALTH DASHBOARD STATS ---
  @Get(':id/health-stats')
  @RequirePermissions('project.read')
  async getHealthStats(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') projectId: string) {
    const tenantId = req.user.tenantId!;
    
    const [project, issuesCount, coStats] = await Promise.all([
        this.prisma.project.findUnique({ 
            where: { id: projectId },
            include: { wbsTasks: true }
        }),
        this.prisma.projectIssue.groupBy({
            by: ['severity'],
            where: { tenantId, projectId, status: { not: 'CLOSED' } },
            _count: true
        }),
        this.prisma.projectChangeOrder.aggregate({
            where: { tenantId, projectId, status: 'APPROVED' },
            _sum: { amountChange: true }
        })
    ]);

    if (!project) return { error: 'Project not found' };

    const totalWeight = project.wbsTasks.reduce((acc, t) => acc + (t.plannedWeight || 0), 0);
    const actualProgress = project.wbsTasks.reduce((acc, t) => acc + ((t.actualProgress || 0) * (t.plannedWeight || 0) / (totalWeight || 1)), 0);

    return {
        financials: {
            originalBudget: Number(project.totalBudget || 0),
            coApproved: Number(coStats._sum.amountChange || 0),
            currentBudget: Number(project.totalBudget || 0) + Number(coStats._sum.amountChange || 0)
        },
        progress: {
            planned: 75, // Mocked overall plan
            actual: actualProgress
        },
        risks: issuesCount.map(i => ({ severity: i.severity, count: i._count }))
    };
  }
}
