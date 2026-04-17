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
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('sales/orders')
export class SalesOrdersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('sales.order.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const orders = await this.prisma.salesOrder.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(q
          ? {
              OR: [{ code: { contains: q, mode: 'insensitive' } }],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { customer: true, quotation: true },
      take: 200,
    });
    return { orders };
  }

  @Get(':id')
  @RequirePermissions('sales.order.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const order = await this.prisma.salesOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        customer: true,
        quotation: true,
        workflowDef: { include: { steps: { orderBy: [{ stepNo: 'asc' }] } } },
        items: { orderBy: [{ lineNo: 'asc' }] },
        shipments: true,
        invoices: true,
        returns: true,
      },
    });
    if (!order) throw new NotFoundException('Sales order not found');
    return { order };
  }

  @Post()
  @RequirePermissions('sales.order.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateSalesOrderDto,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where: { id: body.customerId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    if (body.quotationId) {
      const quotation = await this.prisma.salesQuotation.findFirst({
        where: { id: body.quotationId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!quotation) throw new NotFoundException('Quotation not found');
    }

    const order = await this.prisma.$transaction(async (tx) => {
      const o = await tx.salesOrder.create({
        data: {
          tenantId: req.user.tenantId,
          code: body.code,
          customerId: body.customerId,
          quotationId: body.quotationId,
          orderDate: new Date(body.orderDate),
          notes: body.notes,
        },
      });
      if (body.items.length > 0) {
        await tx.salesOrderItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId,
            orderId: o.id,
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
      return o;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'SalesOrder',
      entityId: order.id,
    });

    return { order };
  }

  @Patch(':id')
  @RequirePermissions('sales.order.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateSalesOrderDto,
  ) {
    const exists = await this.prisma.salesOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Sales order not found');

    const order = await this.prisma.$transaction(async (tx) => {
      const o = await tx.salesOrder.update({
        where: { id },
        data: {
          orderDate: body.orderDate ? new Date(body.orderDate) : undefined,
          notes: body.notes ?? undefined,
        },
      });

      if (body.items) {
        await tx.salesOrderItem.deleteMany({
          where: { tenantId: req.user.tenantId, orderId: id },
        });
        if (body.items.length > 0) {
          await tx.salesOrderItem.createMany({
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
      return o;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'SalesOrder',
      entityId: order.id,
    });

    return { order };
  }

  @Post(':id/submit')
  @RequirePermissions('sales.order.submit')
  async submit(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const order = await this.prisma.salesOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, status: true },
    });
    if (!order) throw new NotFoundException('Sales order not found');

    const workflow = await this.prisma.workflowDefinition.findFirst({
      where: {
        tenantId: req.user.tenantId,
        moduleKey: 'sales',
        docType: 'SALES_ORDER',
        isActive: true,
      },
      select: { id: true },
    });
    const hasSteps = workflow
      ? (await this.prisma.workflowStep.count({
          where: { tenantId: req.user.tenantId, definitionId: workflow.id },
        })) > 0
      : false;

    const updated = await this.prisma.salesOrder.update({
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
      entity: 'SalesOrder',
      entityId: updated.id,
      metadata: {
        workflowDefinitionId: updated.workflowDefinitionId,
        currentStepNo: updated.currentStepNo,
      },
    });

    return { order: updated };
  }

  @Post(':id/approve')
  @RequirePermissions('sales.order.approve')
  async approve(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const order = await this.prisma.salesOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: {
        id: true,
        status: true,
        workflowDefinitionId: true,
        currentStepNo: true,
      },
    });
    if (!order) throw new NotFoundException('Sales order not found');

    if (order.status !== 'PENDING_APPROVAL')
      throw new ForbiddenException('Order is not pending approval');

    if (order.workflowDefinitionId && order.currentStepNo) {
      const step = await this.prisma.workflowStep.findFirst({
        where: {
          tenantId: req.user.tenantId,
          definitionId: order.workflowDefinitionId,
          stepNo: order.currentStepNo,
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
          definitionId: order.workflowDefinitionId,
        },
        _max: { stepNo: true },
      });

      const nextStepNo = (step.stepNo ?? 0) + 1;
      const isFinal = nextStepNo > (maxStep._max.stepNo ?? 0);

      const updated = await this.prisma.salesOrder.update({
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
        entity: 'SalesOrder',
        entityId: updated.id,
        metadata: {
          approvedStepNo: step.stepNo,
          nextStepNo: updated.currentStepNo,
        },
      });

      return { order: updated };
    }

    const updated = await this.prisma.salesOrder.update({
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
      entity: 'SalesOrder',
      entityId: updated.id,
    });

    return { order: updated };
  }

  @Post(':id/reject')
  @RequirePermissions('sales.order.approve')
  async reject(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const order = await this.prisma.salesOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, status: true },
    });
    if (!order) throw new NotFoundException('Sales order not found');
    if (order.status !== 'PENDING_APPROVAL')
      throw new ForbiddenException('Order is not pending approval');

    const updated = await this.prisma.salesOrder.update({
      where: { id },
      data: { status: 'REJECTED', currentStepNo: null },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'reject',
      entity: 'SalesOrder',
      entityId: updated.id,
    });

    return { order: updated };
  }
}
