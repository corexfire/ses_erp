import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AddWorkflowStepDto } from './dto/add-workflow-step.dto';
import { CreateWorkflowDefinitionDto } from './dto/create-workflow-definition.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/workflows')
export class WorkflowsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.workflow.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const workflows = await this.prisma.workflowDefinition.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ createdAt: 'desc' }],
      include: {
        steps: { include: { role: true }, orderBy: [{ stepNo: 'asc' }] },
      },
    });
    return { workflows };
  }

  @Post()
  @RequirePermissions('core.workflow.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateWorkflowDefinitionDto,
  ) {
    const workflow = await this.prisma.workflowDefinition.create({
      data: {
        tenantId: req.user.tenantId,
        name: body.name,
        moduleKey: body.moduleKey,
        docType: body.docType,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'WorkflowDefinition',
      entityId: workflow.id,
    });

    return { workflow };
  }

  @Post(':id/steps')
  @RequirePermissions('core.workflow.update')
  async addStep(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') workflowId: string,
    @Body() body: AddWorkflowStepDto,
  ) {
    const workflow = await this.prisma.workflowDefinition.findFirst({
      where: { id: workflowId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!workflow) return { ok: false };

    const maxStep = await this.prisma.workflowStep.aggregate({
      where: { tenantId: req.user.tenantId, definitionId: workflowId },
      _max: { stepNo: true },
    });

    const stepNo = (maxStep._max.stepNo ?? 0) + 1;
    const step = await this.prisma.workflowStep.create({
      data: {
        tenantId: req.user.tenantId,
        definitionId: workflowId,
        stepNo,
        roleId: body.roleId,
        name: body.name,
      },
      include: { role: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'add_step',
      entity: 'WorkflowStep',
      entityId: step.id,
      metadata: { workflowId, stepNo },
    });

    return { step };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('core.workflow.deactivate')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const workflow = await this.prisma.workflowDefinition.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'WorkflowDefinition',
      entityId: workflow.id,
    });

    return { workflow };
  }
}
