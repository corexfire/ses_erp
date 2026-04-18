import {
  Body,
  Controller,
  ForbiddenException,
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
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { ProcurementDocStatus } from '../../../prisma/generated/client';
import { CreatePurchaseRequisitionDto } from './dto/create-purchase-requisition.dto';
import { UpdatePurchaseRequisitionDto } from './dto/update-purchase-requisition.dto';

const procurementStatusSet = new Set<ProcurementDocStatus>([
  'DRAFT',
  'SUBMITTED',
  'PENDING_APPROVAL',
  'APPROVED',
  'REJECTED',
  'CLOSED',
  'VOID',
]);
const isProcurementDocStatus = (
  value?: string,
): value is ProcurementDocStatus =>
  Boolean(value) && procurementStatusSet.has(value as ProcurementDocStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('procurement/requisitions')
export class PurchaseRequisitionsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('procurement.requisition.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('status') status?: string,
  ) {
    const requisitions = await this.prisma.purchaseRequisition.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(isProcurementDocStatus(status) ? { status } : {}),
        ...(q
          ? {
              OR: [{ code: { contains: q, mode: 'insensitive' } }],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { items: { orderBy: [{ lineNo: 'asc' }] } },
      take: 200,
    });
    return { requisitions };
  }

  @Get(':id')
  @RequirePermissions('procurement.requisition.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const requisition = await this.prisma.purchaseRequisition.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        items: { orderBy: [{ lineNo: 'asc' }] },
        workflowDef: { include: { steps: { orderBy: [{ stepNo: 'asc' }] } } },
      },
    });
    if (!requisition)
      throw new NotFoundException('Purchase requisition not found');
    return { requisition };
  }

  @Post()
  @RequirePermissions('procurement.requisition.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreatePurchaseRequisitionDto,
  ) {
    const requisition = await this.prisma.$transaction(async (tx) => {
      const pr = await tx.purchaseRequisition.create({
        data: {
          tenantId: req.user.tenantId!,
          code: body.code,
          requestDate: new Date(body.requestDate),
          notes: body.notes,
        },
      });

      if (body.items.length > 0) {
        await tx.purchaseRequisitionItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId!,
            requisitionId: pr.id,
            lineNo: idx + 1,
            description: it.description,
            qty: it.qty,
            uomCode: it.uomCode,
            requiredDate: it.requiredDate
              ? new Date(it.requiredDate)
              : undefined,
          })),
        });
      }

      return pr;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'PurchaseRequisition',
      entityId: requisition.id,
    });

    return { requisition };
  }

  @Patch(':id')
  @RequirePermissions('procurement.requisition.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdatePurchaseRequisitionDto,
  ) {
    const exists = await this.prisma.purchaseRequisition.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Purchase requisition not found');

    const requisition = await this.prisma.$transaction(async (tx) => {
      const pr = await tx.purchaseRequisition.update({
        where: { id },
        data: {
          requestDate: body.requestDate
            ? new Date(body.requestDate)
            : undefined,
          notes: body.notes ?? undefined,
        },
      });

      if (body.items) {
        await tx.purchaseRequisitionItem.deleteMany({
          where: { tenantId: req.user.tenantId!, requisitionId: id },
        });
        if (body.items.length > 0) {
          await tx.purchaseRequisitionItem.createMany({
            data: body.items.map((it, idx) => ({
              tenantId: req.user.tenantId!,
              requisitionId: id,
              lineNo: idx + 1,
              description: it.description,
              qty: it.qty,
              uomCode: it.uomCode,
              requiredDate: it.requiredDate
                ? new Date(it.requiredDate)
                : undefined,
            })),
          });
        }
      }

      return pr;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'PurchaseRequisition',
      entityId: requisition.id,
    });

    return { requisition };
  }

  @Post(':id/submit')
  @RequirePermissions('procurement.requisition.submit')
  async submit(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const pr = await this.prisma.purchaseRequisition.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, status: true },
    });
    if (!pr) throw new NotFoundException('Purchase requisition not found');

    const workflow = await this.prisma.workflowDefinition.findFirst({
      where: {
        tenantId: req.user.tenantId!,
        moduleKey: 'procurement',
        docType: 'PURCHASE_REQUISITION',
        isActive: true,
      },
      select: { id: true },
    });
    const hasSteps = workflow
      ? (await this.prisma.workflowStep.count({
          where: { tenantId: req.user.tenantId!, definitionId: workflow.id },
        })) > 0
      : false;

    const requisition = await this.prisma.purchaseRequisition.update({
      where: { id },
      data: {
        status: hasSteps ? 'PENDING_APPROVAL' : 'SUBMITTED',
        workflowDefinitionId: hasSteps ? workflow?.id : null,
        currentStepNo: hasSteps ? 1 : null,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'submit',
      entity: 'PurchaseRequisition',
      entityId: requisition.id,
      metadata: {
        workflowDefinitionId: requisition.workflowDefinitionId,
        currentStepNo: requisition.currentStepNo,
      },
    });

    return { requisition };
  }

  @Post(':id/approve')
  @RequirePermissions('procurement.requisition.approve')
  async approve(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const pr = await this.prisma.purchaseRequisition.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: {
        id: true,
        status: true,
        workflowDefinitionId: true,
        currentStepNo: true,
      },
    });
    if (!pr) throw new NotFoundException('Purchase requisition not found');
    if (pr.status !== 'PENDING_APPROVAL')
      throw new ForbiddenException('Requisition is not pending approval');

    if (pr.workflowDefinitionId && pr.currentStepNo) {
      const step = await this.prisma.workflowStep.findFirst({
        where: {
          tenantId: req.user.tenantId!,
          definitionId: pr.workflowDefinitionId,
          stepNo: pr.currentStepNo,
        },
        select: { roleId: true, stepNo: true },
      });
      if (!step) throw new NotFoundException('Workflow step not found');

      const roles = await this.prisma.userRole.findMany({
        where: { userId: req.user.id },
        select: { roleId: true },
      });
      const roleIds = new Set(roles.map((r) => r.roleId));
      if (!roleIds.has(step.roleId))
        throw new ForbiddenException('Not allowed for this approval step');

      const maxStep = await this.prisma.workflowStep.aggregate({
        where: {
          tenantId: req.user.tenantId!,
          definitionId: pr.workflowDefinitionId,
        },
        _max: { stepNo: true },
      });

      const nextStepNo = (step.stepNo ?? 0) + 1;
      const isFinal = nextStepNo > (maxStep._max.stepNo ?? 0);

      const requisition = await this.prisma.purchaseRequisition.update({
        where: { id },
        data: {
          status: isFinal ? 'APPROVED' : 'PENDING_APPROVAL',
          currentStepNo: isFinal ? null : nextStepNo,
        },
      });

      await this.audit.log({
        tenantId: req.user.tenantId!,
        actorUserId: req.user.id,
        action: 'approve',
        entity: 'PurchaseRequisition',
        entityId: requisition.id,
        metadata: {
          approvedStepNo: step.stepNo,
          nextStepNo: requisition.currentStepNo,
        },
      });

      return { requisition };
    }

    const requisition = await this.prisma.purchaseRequisition.update({
      where: { id },
      data: {
        status: 'APPROVED',
        currentStepNo: null,
        workflowDefinitionId: null,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'approve',
      entity: 'PurchaseRequisition',
      entityId: requisition.id,
    });

    return { requisition };
  }

  @Post(':id/reject')
  @RequirePermissions('procurement.requisition.approve')
  async reject(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const pr = await this.prisma.purchaseRequisition.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, status: true },
    });
    if (!pr) throw new NotFoundException('Purchase requisition not found');
    if (pr.status !== 'PENDING_APPROVAL')
      throw new ForbiddenException('Requisition is not pending approval');

    const requisition = await this.prisma.purchaseRequisition.update({
      where: { id },
      data: { status: 'REJECTED', currentStepNo: null },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'reject',
      entity: 'PurchaseRequisition',
      entityId: requisition.id,
    });

    return { requisition };
  }
}
