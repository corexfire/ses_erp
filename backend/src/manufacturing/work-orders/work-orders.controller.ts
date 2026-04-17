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
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorkOrderDto, UpdateWorkOrderDto } from './dto/work-order.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('manufacturing/work-orders')
export class WorkOrdersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('manufacturing.work_order.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('status') status?: string,
  ) {
    const workOrders = await this.prisma.workOrder.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(status ? { status: status as any } : {}),
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { bom: true, finishedGood: true, components: { include: { item: true } } },
      take: 200,
    });
    return { workOrders };
  }

  @Get(':id')
  @RequirePermissions('manufacturing.work_order.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const wo = await this.prisma.workOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        bom: { include: { items: { include: { componentItem: true } } } },
        finishedGood: true,
        components: { include: { item: true } },
        operations: { orderBy: { lineNo: 'asc' } },
      },
    });
    if (!wo) throw new NotFoundException('Work Order not found');
    return { workOrder: wo };
  }

  @Post()
  @RequirePermissions('manufacturing.work_order.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateWorkOrderDto) {
    const item = await this.prisma.item.findFirst({
      where: { id: body.finishedGoodItemId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!item) throw new NotFoundException('Finished good item not found');

    let bomId: string | undefined;
    if (body.bomId) {
      const bom = await this.prisma.billOfMaterials.findFirst({
        where: { id: body.bomId, tenantId: req.user.tenantId, isActive: true },
        select: { id: true },
      });
      if (bom) bomId = bom.id;
    }

    const wo = await this.prisma.$transaction(async (tx) => {
      const created = await tx.workOrder.create({
        data: {
          tenantId: req.user.tenantId,
          code: body.code,
          bomId,
          finishedGoodItemId: body.finishedGoodItemId,
          warehouseId: body.warehouseId,
          qtyPlanned: body.qtyPlanned,
          uomCode: body.uomCode,
          priority: (body as any).priority ?? 50,
          workCenter: (body as any).workCenter,
          scheduleType: (body as any).scheduleType ?? 'PLANNED',
          productionOrder: (body as any).productionOrder,
          plannedStartDate: body.plannedStartDate ? new Date(body.plannedStartDate) : undefined,
          plannedEndDate: body.plannedEndDate ? new Date(body.plannedEndDate) : undefined,
          notes: body.notes,
        } as any,
      });

      if (body.components && body.components.length > 0) {
        await tx.workOrderComponent.createMany({
          data: body.components.map((it, idx) => ({
            tenantId: req.user.tenantId,
            workOrderId: created.id,
            lineNo: it.lineNo ?? idx + 1,
            itemId: it.itemId,
            qtyRequired: it.qtyRequired,
            uomCode: it.uomCode,
            issueMethod: (it as any).issueMethod ?? 'BACKFLUSH',
            operationNo: (it as any).operationNo,
          })),
        });
      }

      if (body.operations && body.operations.length > 0) {
        await tx.workOrderOperation.createMany({
          data: body.operations.map((it, idx) => ({
            tenantId: req.user.tenantId,
            workOrderId: created.id,
            lineNo: it.lineNo ?? idx + 1,
            operationNo: it.operationNo,
            description: it.description,
            workstation: it.workstation,
            laborHours: it.laborHours,
            setupTime: (it as any).setupTime,
            machineHours: (it as any).machineHours,
            notes: (it as any).notes,
          })),
        });
      }

      return created;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'WorkOrder',
      entityId: wo.id,
    });

    return { workOrder: wo };
  }


  @Patch(':id')
  @RequirePermissions('manufacturing.work_order.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateWorkOrderDto,
  ) {
    const existing = await this.prisma.workOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, status: true },
    });
    if (!existing) throw new NotFoundException('Work Order not found');

    const wo = await this.prisma.workOrder.update({
      where: { id },
      data: {
        qtyPlanned: body.qtyPlanned ?? undefined,
        plannedStartDate: body.plannedStartDate ? new Date(body.plannedStartDate) : undefined,
        plannedEndDate: body.plannedEndDate ? new Date(body.plannedEndDate) : undefined,
        notes: body.notes ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'WorkOrder',
      entityId: wo.id,
    });

    return { workOrder: wo };
  }

  @Patch(':id/release')
  @RequirePermissions('manufacturing.work_order.release')
  async release(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const wo = await this.prisma.workOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, status: true },
    });
    if (!wo) throw new NotFoundException('Work Order not found');
    if (wo.status !== 'DRAFT') throw new NotFoundException('Can only release DRAFT work orders');

    const updated = await this.prisma.workOrder.update({
      where: { id },
      data: { status: 'RELEASED', actualStartDate: new Date() },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'release',
      entity: 'WorkOrder',
      entityId: id,
    });

    return { workOrder: updated };
  }

  @Patch(':id/complete')
  @RequirePermissions('manufacturing.work_order.complete')
  async complete(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: { qtyProduced: number; unitCost?: number },
  ) {
    const wo = await this.prisma.workOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { components: { include: { item: true } } },
    });
    if (!wo) throw new NotFoundException('Work Order not found');
    if (wo.status === 'COMPLETED') throw new NotFoundException('Work Order already completed');

    const unitCost = body.unitCost || 0;
    const totalCost = (body.qtyProduced || 0) * unitCost;

    const updated = await this.prisma.$transaction(async (tx) => {
      const updatedWo = await tx.workOrder.update({
        where: { id },
        data: {
          status: 'COMPLETED',
          qtyProduced: body.qtyProduced,
          actualEndDate: new Date(),
        },
      });

      if (totalCost > 0) {
        const jeCount = await tx.journalEntry.count({ where: { tenantId: req.user.tenantId } });
        const jeNo = `JE-WO-${String(jeCount + 1).padStart(6, '0')}`;

        const journal = await tx.journalEntry.create({
          data: {
            tenantId: req.user.tenantId,
            entryNo: jeNo,
            entryDate: new Date(),
            description: `Work Order Completion - ${wo.code}`,
            referenceNo: wo.code,
            journalType: 'MANUFACTURING',
            referenceType: 'WorkOrder',
            referenceId: wo.id,
            totalDebit: totalCost,
            totalCredit: totalCost,
            status: 'POSTED',
          }
        });

        await tx.journalEntryLine.createMany({
          data: [
            {
              tenantId: req.user.tenantId,
              journalEntryId: journal.id,
              lineNo: 1,
              accountCode: '1-1330-00',
              description: 'Finished Goods Inventory',
              debit: totalCost,
              credit: 0,
              referenceType: 'WorkOrder',
              referenceId: wo.id,
            },
            {
              tenantId: req.user.tenantId,
              journalEntryId: journal.id,
              lineNo: 2,
              accountCode: '1-1320-00',
              description: 'Work In Process (WIP)',
              debit: 0,
              credit: totalCost,
              referenceType: 'WorkOrder',
              referenceId: wo.id,
            }
          ]
        });
      }

      return updatedWo;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'complete',
      entity: 'WorkOrder',
      entityId: id,
    });

    return { workOrder: updated };
  }
}