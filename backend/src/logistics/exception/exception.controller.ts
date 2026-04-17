import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
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

export class CreateExceptionDto {
  reason!: string;
  description?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics/exceptions')
export class ExceptionController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('delivery-order/:doId')
  @RequirePermissions('logistics.delivery.read')
  async getByDeliveryOrder(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('doId') doId: string,
  ) {
    const deliveryOrder = await this.prisma.deliveryOrder.findFirst({
      where: { id: doId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!deliveryOrder) throw new NotFoundException('Delivery order not found');

    const exceptions = await this.prisma.deliveryException.findMany({
      where: { deliveryOrderId: doId },
      orderBy: { createdAt: 'desc' },
    });
    return { exceptions };
  }

  @Get('trip/:tripId')
  @RequirePermissions('logistics.trip.read')
  async getByTrip(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('tripId') tripId: string,
  ) {
    const trip = await this.prisma.tripPlan.findFirst({
      where: { id: tripId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!trip) throw new NotFoundException('Trip not found');

    const exceptions = await this.prisma.deliveryException.findMany({
      where: { tripPlanId: tripId },
      include: { deliveryOrder: { include: { customer: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return { exceptions };
  }

  @Get()
  @RequirePermissions('logistics.delivery.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const exceptions = await this.prisma.deliveryException.findMany({
      where: { tenantId: req.user.tenantId },
      include: {
        deliveryOrder: { include: { customer: true } },
        tripPlan: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return { exceptions };
  }

  @Get(':id')
  @RequirePermissions('logistics.delivery.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const exception = await this.prisma.deliveryException.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        deliveryOrder: { include: { customer: true } },
        tripPlan: true,
      },
    });
    if (!exception) throw new NotFoundException('Exception not found');
    return { exception };
  }

  @Get('delivery-order/:doId/rto')
  @RequirePermissions('logistics.delivery.manage')
  async createRTO(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('doId') doId: string,
    @Body() body: { notes?: string },
  ) {
    const deliveryOrder = await this.prisma.deliveryOrder.findFirst({
      where: { id: doId, tenantId: req.user.tenantId },
      include: { items: true },
    });
    if (!deliveryOrder) throw new NotFoundException('Delivery order not found');

    if (!['IN_TRANSIT', 'FAILED'].includes(deliveryOrder.status)) {
      throw new Error('Can only create RTO for in-transit or failed delivery orders');
    }

    await this.prisma.deliveryOrder.update({
      where: { id: doId },
      data: { status: 'RTO' },
    });

    await this.prisma.deliveryException.create({
      data: {
        tenantId: req.user.tenantId,
        deliveryOrderId: doId,
        tripPlanId: deliveryOrder.tripPlanId,
        reason: 'RETURN_TO_ORIGIN',
        description: body.notes || 'Return to origin initiated',
        reportedAt: new Date(),
        reportedBy: req.user.id,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'RTO',
      entity: 'DeliveryOrder',
      entityId: doId,
      metadata: { code: deliveryOrder.code },
    });

    return { success: true };
  }
}
