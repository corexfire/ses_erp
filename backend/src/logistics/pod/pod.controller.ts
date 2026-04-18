import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
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

export class SubmitPodDto {
  receivedBy!: string;
  receivedAt!: string;
  notes?: string;
  signatureFileId?: string;
  photoFileIds?: string[];
  geoLat?: number;
  geoLng?: number;
}

export class MobileSubmitPodDto {
  receivedBy!: string;
  receivedAt!: string;
  notes?: string;
  signatureFileId?: string;
  photoFileIds?: string[];
  geoLat?: number;
  geoLng?: number;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics')
export class PodController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Post('delivery-orders/:id/pod')
  @RequirePermissions('logistics.pod.capture')
  async submitPod(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: SubmitPodDto,
  ) {
    const deliveryOrder = await this.prisma.deliveryOrder.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, code: true, status: true },
    });
    if (!deliveryOrder) throw new NotFoundException('Delivery order not found');

    if (deliveryOrder.status !== 'IN_TRANSIT') {
      throw new Error('Can only submit POD for delivery orders in transit');
    }

    const existingPod = await this.prisma.proofOfDelivery.findFirst({
      where: { deliveryOrderId: id },
      select: { id: true },
    });
    if (existingPod) {
      throw new Error('POD already exists for this delivery order');
    }

    const pod = await this.prisma.proofOfDelivery.create({
      data: {
        tenantId: req.user.tenantId!,
        deliveryOrderId: id,
        receivedBy: body.receivedBy,
        receivedAt: new Date(body.receivedAt),
        notes: body.notes,
        signatureFileId: body.signatureFileId,
        photoFileIds: body.photoFileIds || [],
        geoLat: body.geoLat,
        geoLng: body.geoLng,
        status: 'CAPTURED',
      },
    });

    await this.prisma.deliveryOrder.update({
      where: { id },
      data: { status: 'DELIVERED', actualDeliveredAt: new Date(body.receivedAt) },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'SUBMIT_POD',
      entity: 'ProofOfDelivery',
      entityId: pod.id,
      metadata: { deliveryOrderCode: deliveryOrder.code, receivedBy: body.receivedBy },
    });

    return { pod };
  }

  @Post('pod/:token')
  async mobileSubmitPod(
    @Param('token') token: string,
    @Body() body: MobileSubmitPodDto,
  ) {
    const deliveryOrder = await this.prisma.deliveryOrder.findFirst({
      where: {
        podToken: token,
        podTokenExpiry: { gte: new Date() },
      },
      select: { id: true, code: true, tenantId: true, status: true },
    });
    if (!deliveryOrder) throw new NotFoundException('Invalid or expired POD token');

    if (deliveryOrder.status !== 'IN_TRANSIT') {
      throw new Error('Can only submit POD for delivery orders in transit');
    }

    const existingPod = await this.prisma.proofOfDelivery.findFirst({
      where: { deliveryOrderId: deliveryOrder.id },
      select: { id: true },
    });
    if (existingPod) {
      throw new Error('POD already exists for this delivery order');
    }

    const pod = await this.prisma.proofOfDelivery.create({
      data: {
        tenantId: deliveryOrder.tenantId,
        deliveryOrderId: deliveryOrder.id,
        receivedBy: body.receivedBy,
        receivedAt: new Date(body.receivedAt),
        notes: body.notes,
        signatureFileId: body.signatureFileId,
        photoFileIds: body.photoFileIds || [],
        geoLat: body.geoLat,
        geoLng: body.geoLng,
        status: 'CAPTURED',
      },
    });

    await this.prisma.deliveryOrder.update({
      where: { id: deliveryOrder.id },
      data: { status: 'DELIVERED', actualDeliveredAt: new Date(body.receivedAt) },
    });

    await this.audit.log({
      tenantId: deliveryOrder.tenantId,
      actorUserId: 'MOBILE_DRIVER',
      action: 'SUBMIT_POD_MOBILE',
      entity: 'ProofOfDelivery',
      entityId: pod.id,
      metadata: { deliveryOrderCode: deliveryOrder.code, receivedBy: body.receivedBy },
    });

    return { success: true, podId: pod.id };
  }

  @Post('delivery-orders/:id/fail')
  @RequirePermissions('logistics.pod.capture')
  async markFailed(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: { reason: string; description?: string },
  ) {
    const deliveryOrder = await this.prisma.deliveryOrder.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, code: true, status: true, tripPlanId: true },
    });
    if (!deliveryOrder) throw new NotFoundException('Delivery order not found');

    if (deliveryOrder.status !== 'IN_TRANSIT') {
      throw new Error('Can only mark failed for delivery orders in transit');
    }

    await this.prisma.deliveryException.create({
      data: {
        tenantId: req.user.tenantId!,
        deliveryOrderId: id,
        tripPlanId: deliveryOrder.tripPlanId,
        reason: body.reason as any,
        description: body.description,
        reportedAt: new Date(),
        reportedBy: req.user.id,
      },
    });

    await this.prisma.deliveryOrder.update({
      where: { id },
      data: { status: 'FAILED' },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'MARK_FAILED',
      entity: 'DeliveryOrder',
      entityId: id,
      metadata: { code: deliveryOrder.code, reason: body.reason },
    });

    return { success: true };
  }

  @Post('delivery-orders/:id/redelivery')
  @RequirePermissions('logistics.delivery.manage')
  async createRedelivery(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const original = await this.prisma.deliveryOrder.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { items: true },
    });
    if (!original) throw new NotFoundException('Delivery order not found');

    if (original.status !== 'FAILED') {
      throw new Error('Can only create redelivery for failed delivery orders');
    }

    const count = await this.prisma.deliveryOrder.count({ where: { tenantId: req.user.tenantId! } });
    const code = `DO-RD-${String(count + 1).padStart(6, '0')}`;

    const redelivery = await this.prisma.deliveryOrder.create({
      data: {
        tenantId: req.user.tenantId!,
        code,
        shipmentId: original.shipmentId,
        salesOrderId: original.salesOrderId,
        customerId: original.customerId,
        warehouseId: original.warehouseId,
        priority: 'HIGH',
        plannedShipDate: undefined,
        deliveryAddress1: original.deliveryAddress1,
        deliveryAddress2: original.deliveryAddress2,
        deliveryCity: original.deliveryCity,
        deliveryProvince: original.deliveryProvince,
        deliveryPostalCode: original.deliveryPostalCode,
        status: 'DRAFT',
        items: {
          create: original.items.map((item, idx) => ({
            tenantId: req.user.tenantId!,
            lineNo: idx + 1,
            itemId: item.itemId,
            description: item.description,
            orderedQty: item.orderedQty,
            uomCode: item.uomCode,
            unitPrice: item.unitPrice,
          })),
        },
      },
      include: { items: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'CREATE_REDELIVERY',
      entity: 'DeliveryOrder',
      entityId: redelivery.id,
      metadata: { originalDoId: id, redeliveryCode: code },
    });

    return { deliveryOrder: redelivery };
  }
}
