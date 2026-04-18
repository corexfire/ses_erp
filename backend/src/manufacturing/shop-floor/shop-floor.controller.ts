import {
  Body,
  Controller,
  Get,
  NotFoundException,
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
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('manufacturing/shop-floor')
export class ShopFloorController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('manufacturing.shop_floor.read')
  async listActiveWorkOrders(@Req() req: FastifyRequest & { user: AuthUser }) {
    const workOrders = await this.prisma.workOrder.findMany({
      where: {
        tenantId: req.user.tenantId!,
        status: { in: ['RELEASED', 'IN_PROGRESS'] },
      },
      orderBy: [{ plannedStartDate: 'asc' }],
      include: {
        finishedGood: true,
        operations: { orderBy: { lineNo: 'asc' } },
        components: { include: { item: true } },
      },
      take: 100,
    });
    return { workOrders };
  }

  @Get(':id')
  @RequirePermissions('manufacturing.shop_floor.read')
  async getWorkOrderDetails(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const wo = await this.prisma.workOrder.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        finishedGood: true,
        operations: { orderBy: { lineNo: 'asc' } },
        components: { include: { item: true } },
        shopFloorLogs: { orderBy: { loggedAt: 'desc' }, take: 20 },
        shopFloorTimers: { where: { status: 'RUNNING' } },
      },
    });
    if (!wo) throw new NotFoundException('Work Order not found');
    return { workOrder: wo };
  }

  @Post('start-operation')
  @RequirePermissions('manufacturing.shop_floor.update')
  async startOperation(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: { workOrderId: string; operationId: string; operatorName?: string },
  ) {
    const op = await this.prisma.workOrderOperation.findFirst({
      where: { id: body.operationId, workOrderId: body.workOrderId, tenantId: req.user.tenantId! },
    });
    if (!op) throw new NotFoundException('Operation not found');

    const result = await this.prisma.$transaction(async (tx) => {
      // Create Timer
      const timer = await tx.shopFloorTimer.create({
        data: {
          tenantId: req.user.tenantId!,
          workOrderId: body.workOrderId,
          operationId: body.operationId,
          operatorName: body.operatorName || req.user.email,
          status: 'RUNNING',
          startTime: new Date(),
        },
      });

      // Update Operation status
      await tx.workOrderOperation.update({
        where: { id: body.operationId },
        data: {
          status: 'IN_PROGRESS',
          operatorName: body.operatorName || req.user.email,
          claimedAt: op.claimedAt || new Date(),
        },
      });

      // Log action
      await tx.shopFloorLog.create({
        data: {
          tenantId: req.user.tenantId!,
          workOrderId: body.workOrderId,
          operationId: body.operationId,
          operatorName: body.operatorName || req.user.email,
          action: 'CLOCK_IN',
          prevStatus: op.status,
          newStatus: 'IN_PROGRESS',
        },
      });

      return timer;
    });

    return { timer: result };
  }

  @Post('stop-operation')
  @RequirePermissions('manufacturing.shop_floor.update')
  async stopOperation(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: {
      workOrderId: string;
      operationId: string;
      timerId: string;
      qtyCompleted: number;
      rejectedQty?: number;
      scrapQty?: number;
      notes?: string;
    },
  ) {
    const timer = await this.prisma.shopFloorTimer.findFirst({
      where: { id: body.timerId, tenantId: req.user.tenantId! },
    });
    if (!timer) throw new NotFoundException('Active timer not found');

    const op = await this.prisma.workOrderOperation.findFirst({
      where: { id: body.operationId },
    });
    if (!op) throw new NotFoundException('Operation not found');

    const endTime = new Date();
    const diffMs = endTime.getTime() - timer.startTime.getTime();
    const durationMin = Math.round(diffMs / 60000);
    const laborHours = durationMin / 60;

    const result = await this.prisma.$transaction(async (tx) => {
      // Close timer
      await tx.shopFloorTimer.update({
        where: { id: body.timerId },
        data: {
          status: 'COMPLETED',
          endTime,
          durationMin,
        },
      });

      // Update Operation
      const isLastOp = await tx.workOrderOperation.count({
        where: { workOrderId: body.workOrderId, lineNo: { gt: op.lineNo } }
      }) === 0;

      const newStatus = (Number(op.qtyCompleted) + body.qtyCompleted >= Number(op.machineHours || 999999)) ? 'COMPLETED' : 'IN_PROGRESS';

      await tx.workOrderOperation.update({
        where: { id: body.operationId },
        data: {
          qtyCompleted: { increment: body.qtyCompleted },
          rejectedQty: { increment: body.rejectedQty || 0 },
          scrapQty: { increment: body.scrapQty || 0 },
          actualLaborHours: { increment: laborHours },
          status: newStatus,
          completedAt: newStatus === 'COMPLETED' ? new Date() : null,
          notes: body.notes,
        },
      });

      // Update Work Order progress if this is the last operation
      if (isLastOp && body.qtyCompleted > 0) {
        await tx.workOrder.update({
          where: { id: body.workOrderId },
          data: {
            qtyProduced: { increment: body.qtyCompleted },
            status: 'IN_PROGRESS',
          },
        });
      }

      // Log action
      await tx.shopFloorLog.create({
        data: {
          tenantId: req.user.tenantId!,
          workOrderId: body.workOrderId,
          operationId: body.operationId,
          operatorName: timer.operatorName,
          action: 'CLOCK_OUT',
          qtyReported: body.qtyCompleted,
          laborHours,
          notes: body.notes,
          newStatus,
        },
      });

      return { durationMin, laborHours };
    });

    return result;
  }

  @Post('report-qty')
  @RequirePermissions('manufacturing.shop_floor.update')
  async reportQty(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: { workOrderId: string; operationId: string; qty: number; type: 'GOOD' | 'REJECT' | 'SCRAP'; notes?: string },
  ) {
    const updateData: any = {};
    if (body.type === 'GOOD') updateData.qtyCompleted = { increment: body.qty };
    else if (body.type === 'REJECT') updateData.rejectedQty = { increment: body.qty };
    else updateData.scrapQty = { increment: body.qty };

    const op = await this.prisma.workOrderOperation.update({
      where: { id: body.operationId },
      data: updateData,
    });

    await this.prisma.shopFloorLog.create({
      data: {
        tenantId: req.user.tenantId!,
        workOrderId: body.workOrderId,
        operationId: body.operationId,
        operatorName: req.user.email,
        action: `REPORT_${body.type}`,
        qtyReported: body.qty,
        notes: body.notes,
      },
    });

    return { operation: op };
  }
}