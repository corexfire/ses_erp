import { Controller, Get, Post, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

export class CreateCommitmentDto {
  projectId!: string;
  wbsTaskId?: string;
  commitmentType!: string;
  referenceId?: string;
  description!: string;
  amount!: number;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('project')
export class CostController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('costs')
  @RequirePermissions('project.cost.read')
  async listCosts(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (projectId) where.projectId = projectId;

    // Get WBS Tasks which are the source of truth for budget and actuals
    const tasks = await this.prisma.wbsTask.findMany({
      where,
      include: { 
        project: true, 
        commitments: { where: { status: 'ACTIVE' } } 
      },
      orderBy: [{ project: { name: 'asc' } }, { taskCode: 'asc' }],
    });

    return {
      data: tasks.map((task) => {
        const budget = Number(task.plannedCost || 0);
        const actual = Number(task.actualCost || 0);
        const commitment = task.commitments.reduce((sum, c) => sum + Number(c.amount), 0);
        const totalCost = actual + commitment;
        
        let status = 'ON_BUDGET';
        if (budget > 0) {
          if (totalCost > budget) status = 'OVER_BUDGET';
          else if (totalCost > budget * 0.9) status = 'AT_RISK';
        }

        return {
          id: task.id,
          project: task.project,
          wbsTask: { id: task.id, taskName: task.taskName, taskCode: task.taskCode },
          budget,
          actual,
          commitment,
          status,
          variance: budget - totalCost,
          percentUsed: budget > 0 ? (totalCost / budget) * 100 : 0
        };
      }),
    };
  }

  @Get('cost/:projectId')
  @RequirePermissions('project.cost.read')
  async getCostSummary(
    @Param('projectId') projectId: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, tenantId: req.user.tenantId! },
      include: { 
        wbsTasks: { 
          include: { commitments: { where: { status: 'ACTIVE' } } } 
        } 
      },
    });
    
    if (!project) throw new Error('Project not found');

    let totalBudget = 0;
    let totalActual = 0;
    let totalCommitted = 0;

    const byType: Record<string, number> = {};

    project.wbsTasks.forEach(task => {
      totalBudget += Number(task.plannedCost || 0);
      totalActual += Number(task.actualCost || 0);
      
      task.commitments.forEach(c => {
        const amt = Number(c.amount);
        totalCommitted += amt;
        byType[c.commitmentType] = (byType[c.commitmentType] || 0) + amt;
      });
    });

    const totalCost = totalActual + totalCommitted;

    return {
      project,
      summary: {
        totalBudget,
        totalCommitted,
        totalActual,
        totalCost,
        variance: totalBudget - totalCost,
        percentUsed: totalBudget > 0 ? (totalCost / totalBudget) * 100 : 0,
        byType,
      },
    };
  }

  @Get('cost/:projectId/detail')
  @RequirePermissions('project.cost.read')
  async getCostDetail(
    @Param('projectId') projectId: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const commitments = await this.prisma.projectCommitment.findMany({
      where: { projectId, tenantId: req.user.tenantId! },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    return { data: commitments };
  }

  @Get('commitments')
  @RequirePermissions('project.cost.read')
  async listCommitments(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (projectId) where.projectId = projectId;

    const commitments = await this.prisma.projectCommitment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return { data: commitments };
  }

  @Post('commitments')
  @RequirePermissions('project.cost.manage')
  async createCommitment(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateCommitmentDto,
  ) {
    const commitment = await this.prisma.projectCommitment.create({
      data: {
        tenantId: req.user.tenantId!,
        projectId: body.projectId,
        wbsTaskId: body.wbsTaskId,
        commitmentType: body.commitmentType,
        referenceId: body.referenceId,
        description: body.description,
        amount: body.amount,
        status: 'ACTIVE',
      },
    });
    return commitment;
  }

  @Get('variance/:projectId')
  @RequirePermissions('project.cost.read')
  async getVariance(
    @Param('projectId') projectId: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, tenantId: req.user.tenantId! },
      include: { budgets: { include: { wbsTask: true } } },
    });

    const commitments = await this.prisma.projectCommitment.findMany({
      where: { projectId },
      select: { amount: true, commitmentType: true },
    });

    const totalBudget = Number(project?.totalBudget || 0);
    const totalCommitted = commitments.reduce((sum, c) => sum + Number(c.amount), 0);

    const budgetByTask = project?.budgets.map(b => ({
      taskCode: b.wbsTask?.taskCode,
      allocated: Number(b.allocatedBudget),
      committed: b.committedAmount ? Number(b.committedAmount) : 0,
    })) || [];

    return {
      projectId,
      totalBudget,
      totalCommitted,
      available: totalBudget - totalCommitted,
      percentUsed: totalBudget > 0 ? (totalCommitted / totalBudget) * 100 : 0,
      budgetByTask,
    };
  }
}
