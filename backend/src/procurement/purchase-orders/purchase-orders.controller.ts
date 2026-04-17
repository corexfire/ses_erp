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
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

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
@Controller('procurement/purchase-orders')
export class PurchaseOrdersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  private async validateTaxCodes(input: {
    tenantId: string;
    taxCodeIds: string[];
  }) {
    const ids = input.taxCodeIds.map((x) => x.trim()).filter(Boolean);
    if (ids.length === 0) return;
    const count = await this.prisma.taxCode.count({
      where: { tenantId: input.tenantId, id: { in: ids } },
    });
    if (count !== new Set(ids).size)
      throw new NotFoundException('Tax code not found');
  }

  @Get()
  @RequirePermissions('procurement.purchase_order.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('status') status?: string,
  ) {
    const purchaseOrders = await this.prisma.purchaseOrder.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(isProcurementDocStatus(status) ? { status } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { supplier: true, rfq: true },
      take: 200,
    });
    return { purchaseOrders };
  }

  @Get(':id')
  @RequirePermissions('procurement.purchase_order.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const purchaseOrder = await this.prisma.purchaseOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        supplier: true,
        rfq: true,
        workflowDef: { include: { steps: { orderBy: [{ stepNo: 'asc' }] } } },
        items: { orderBy: [{ lineNo: 'asc' }], include: { taxCode: true } },
        invoices: true,
        returns: true,
        landedCosts: true,
      },
    });
    if (!purchaseOrder) throw new NotFoundException('Purchase order not found');
    return { purchaseOrder };
  }

  @Post()
  @RequirePermissions('procurement.purchase_order.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreatePurchaseOrderDto,
  ) {
    const supplier = await this.prisma.supplier.findFirst({
      where: { id: body.supplierId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');

    if (body.rfqId) {
      const rfq = await this.prisma.rfq.findFirst({
        where: { id: body.rfqId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!rfq) throw new NotFoundException('RFQ not found');
    }

    await this.validateTaxCodes({
      tenantId: req.user.tenantId,
      taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
    });

    const purchaseOrder = await this.prisma.$transaction(async (tx) => {
      const po = await tx.purchaseOrder.create({
        data: {
          tenantId: req.user.tenantId,
          code: body.code,
          supplierId: body.supplierId,
          rfqId: body.rfqId,
          orderDate: new Date(body.orderDate),
          notes: body.notes,
        },
      });

      if (body.items.length > 0) {
        await tx.purchaseOrderItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId,
            orderId: po.id,
            lineNo: idx + 1,
            description: it.description,
            qty: it.qty,
            uomCode: it.uomCode,
            unitPrice: it.unitPrice,
            discount: it.discount,
            taxCodeId: it.taxCodeId,
          })),
        });
      }

      return po;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'PurchaseOrder',
      entityId: purchaseOrder.id,
    });

    return { purchaseOrder };
  }

  @Patch(':id')
  @RequirePermissions('procurement.purchase_order.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdatePurchaseOrderDto,
  ) {
    const exists = await this.prisma.purchaseOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Purchase order not found');

    if (body.items) {
      await this.validateTaxCodes({
        tenantId: req.user.tenantId,
        taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
      });
    }

    const purchaseOrder = await this.prisma.$transaction(async (tx) => {
      const po = await tx.purchaseOrder.update({
        where: { id },
        data: {
          orderDate: body.orderDate ? new Date(body.orderDate) : undefined,
          notes: body.notes ?? undefined,
        },
      });

      if (body.items) {
        await tx.purchaseOrderItem.deleteMany({
          where: { tenantId: req.user.tenantId, orderId: id },
        });
        if (body.items.length > 0) {
          await tx.purchaseOrderItem.createMany({
            data: body.items.map((it, idx) => ({
              tenantId: req.user.tenantId,
              orderId: id,
              lineNo: idx + 1,
              description: it.description,
              qty: it.qty,
              uomCode: it.uomCode,
              unitPrice: it.unitPrice,
              discount: it.discount,
              taxCodeId: it.taxCodeId,
            })),
          });
        }
      }

      return po;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'PurchaseOrder',
      entityId: purchaseOrder.id,
    });

    return { purchaseOrder };
  }

  @Post(':id/submit')
  @RequirePermissions('procurement.purchase_order.submit')
  async submit(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const po = await this.prisma.purchaseOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, status: true },
    });
    if (!po) throw new NotFoundException('Purchase order not found');

    const workflow = await this.prisma.workflowDefinition.findFirst({
      where: {
        tenantId: req.user.tenantId,
        moduleKey: 'procurement',
        docType: 'PURCHASE_ORDER',
        isActive: true,
      },
      select: { id: true },
    });
    const hasSteps = workflow
      ? (await this.prisma.workflowStep.count({
          where: { tenantId: req.user.tenantId, definitionId: workflow.id },
        })) > 0
      : false;

    const purchaseOrder = await this.prisma.purchaseOrder.update({
      where: { id },
      data: {
        status: hasSteps ? 'PENDING_APPROVAL' : 'SUBMITTED',
        workflowDefinitionId: hasSteps ? workflow?.id : null,
        currentStepNo: hasSteps ? 1 : null,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'submit',
      entity: 'PurchaseOrder',
      entityId: purchaseOrder.id,
      metadata: {
        workflowDefinitionId: purchaseOrder.workflowDefinitionId,
        currentStepNo: purchaseOrder.currentStepNo,
      },
    });

    return { purchaseOrder };
  }

  @Post(':id/approve')
  @RequirePermissions('procurement.purchase_order.approve')
  async approve(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const po = await this.prisma.purchaseOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: {
        id: true,
        status: true,
        workflowDefinitionId: true,
        currentStepNo: true,
      },
    });
    if (!po) throw new NotFoundException('Purchase order not found');
    if (po.status !== 'PENDING_APPROVAL')
      throw new ForbiddenException('Purchase order is not pending approval');

    if (po.workflowDefinitionId && po.currentStepNo) {
      const step = await this.prisma.workflowStep.findFirst({
        where: {
          tenantId: req.user.tenantId,
          definitionId: po.workflowDefinitionId,
          stepNo: po.currentStepNo,
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
          tenantId: req.user.tenantId,
          definitionId: po.workflowDefinitionId,
        },
        _max: { stepNo: true },
      });

      const nextStepNo = (step.stepNo ?? 0) + 1;
      const isFinal = nextStepNo > (maxStep._max.stepNo ?? 0);

      const purchaseOrder = await this.prisma.purchaseOrder.update({
        where: { id },
        data: {
          status: isFinal ? 'APPROVED' : 'PENDING_APPROVAL',
          currentStepNo: isFinal ? null : nextStepNo,
        },
      });

      await this.audit.log({
        tenantId: req.user.tenantId,
        actorUserId: req.user.id,
        action: 'approve',
        entity: 'PurchaseOrder',
        entityId: purchaseOrder.id,
        metadata: {
          approvedStepNo: step.stepNo,
          nextStepNo: purchaseOrder.currentStepNo,
        },
      });

      return { purchaseOrder };
    }

    const purchaseOrder = await this.prisma.purchaseOrder.update({
      where: { id },
      data: {
        status: 'APPROVED',
        currentStepNo: null,
        workflowDefinitionId: null,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'approve',
      entity: 'PurchaseOrder',
      entityId: purchaseOrder.id,
    });

    return { purchaseOrder };
  }

  @Post(':id/reject')
  @RequirePermissions('procurement.purchase_order.approve')
  async reject(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const po = await this.prisma.purchaseOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, status: true },
    });
    if (!po) throw new NotFoundException('Purchase order not found');
    if (po.status !== 'PENDING_APPROVAL')
      throw new ForbiddenException('Purchase order is not pending approval');

    const purchaseOrder = await this.prisma.purchaseOrder.update({
      where: { id },
      data: { status: 'REJECTED', currentStepNo: null },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'reject',
      entity: 'PurchaseOrder',
      entityId: purchaseOrder.id,
    });

    return { purchaseOrder };
  }
}
