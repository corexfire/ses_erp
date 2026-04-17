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
import type { DeliveryOrderStatus, DeliveryPriority } from '../../../prisma/generated/client';
import { randomBytes } from 'crypto';

const deliveryOrderStatusSet = new Set<DeliveryOrderStatus>([
  'DRAFT', 'PLANNED', 'RELEASED', 'PICKING', 'STAGED', 'LOADED', 'IN_TRANSIT', 'DELIVERED', 'FAILED', 'RTO', 'CANCELED',
]);
const isDeliveryOrderStatus = (value?: string): value is DeliveryOrderStatus =>
  Boolean(value) && deliveryOrderStatusSet.has(value as DeliveryOrderStatus);

export class GenerateDeliveryOrderDto {
  shipmentIds!: string[];
  plannedShipDate!: string;
  warehouseId!: string;
  priority?: DeliveryPriority;
}

export class CreateDeliveryOrderDto {
  code?: string;
  shipmentId?: string;
  salesOrderId?: string;
  customerId!: string;
  warehouseId!: string;
  plannedShipDate?: string;
  priority?: DeliveryPriority;
  deliveryAddress1?: string;
  deliveryAddress2?: string;
  deliveryCity?: string;
  deliveryProvince?: string;
  deliveryPostalCode?: string;
  deliveryNotes?: string;
  items!: { itemId?: string; description: string; orderedQty: number; uomCode?: string; unitPrice?: number; batchNo?: string; serialNo?: string }[];
}

export class UpdateDeliveryOrderDto {
  plannedShipDate?: string;
  priority?: DeliveryPriority;
  deliveryAddress1?: string;
  deliveryAddress2?: string;
  deliveryCity?: string;
  deliveryProvince?: string;
  deliveryPostalCode?: string;
  deliveryNotes?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics/delivery-orders')
export class DeliveryController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('logistics.delivery.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('status') status?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('plannedShipDate') plannedShipDate?: string,
    @Query('q') q?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId };
    if (isDeliveryOrderStatus(status)) where.status = status;
    if (warehouseId) where.warehouseId = warehouseId;
    if (plannedShipDate) where.plannedShipDate = { gte: new Date(plannedShipDate + 'T00:00:00Z'), lt: new Date(plannedShipDate + 'T23:59:59Z') };
    if (q) {
      where.OR = [
        { code: { contains: q, mode: 'insensitive' } },
        { shipmentId: { contains: q, mode: 'insensitive' } },
      ];
    }

    const deliveryOrders = await this.prisma.deliveryOrder.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
      include: { customer: true, warehouse: true, tripPlan: true, proofOfDelivery: true, _count: { select: { items: true } } },
      take: 200,
    });
    return { deliveryOrders };
  }

  @Get(':id')
  @RequirePermissions('logistics.delivery.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const do_ = await this.prisma.deliveryOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        customer: true,
        warehouse: true,
        tripPlan: true,
        proofOfDelivery: true,
        items: { orderBy: { lineNo: 'asc' }, include: { item: true } },
        exceptions: true,
      },
    });
    if (!do_) throw new NotFoundException('Delivery order not found');
    return { deliveryOrder: do_ };
  }

  @Post('generate')
  @RequirePermissions('logistics.delivery.manage')
  async generate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: GenerateDeliveryOrderDto,
  ) {
    // Validate shipments
    const shipments = await this.prisma.shipment.findMany({
      where: {
        id: { in: body.shipmentIds },
        tenantId: req.user.tenantId,
        status: 'CREATED',
      },
      include: { order: { include: { customer: true, items: true } }, carrier: true },
    });

    if (shipments.length !== body.shipmentIds.length) {
      throw new Error('Some shipments not found or not eligible for delivery order generation');
    }

    // Check warehouse
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { id: body.warehouseId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    const deliveryOrders = [];
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    for (let i = 0; i < shipments.length; i++) {
      const shipment = shipments[i];
      const order = shipment.order;

      // Check if DO already exists for this shipment
      const existingDo = await this.prisma.deliveryOrder.findFirst({
        where: { shipmentId: shipment.id, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (existingDo) continue;

      const count = await this.prisma.deliveryOrder.count({ where: { tenantId: req.user.tenantId } });
      const code = `DO-${today}-${String(count + 1 + i).padStart(4, '0')}`;

      // Generate pod token
      const podToken = randomBytes(32).toString('hex');
      const podTokenExpiry = new Date();
      podTokenExpiry.setDate(podTokenExpiry.getDate() + 7);

      const deliveryOrder = await this.prisma.deliveryOrder.create({
        data: {
          tenantId: req.user.tenantId,
          code,
          shipmentId: shipment.id,
          salesOrderId: order?.id,
          customerId: order?.customerId || shipment.orderId || '',
          warehouseId: body.warehouseId,
          priority: body.priority || 'NORMAL',
          plannedShipDate: new Date(body.plannedShipDate),
          deliveryAddress1: order?.customer?.address1,
          deliveryAddress2: order?.customer?.address2,
          deliveryCity: order?.customer?.city,
          deliveryProvince: order?.customer?.province,
          deliveryPostalCode: order?.customer?.postalCode,
          status: 'PLANNED',
          podToken,
          podTokenExpiry,
          items: order?.items ? {
            create: order.items.map((item, idx) => ({
              tenantId: req.user.tenantId,
              lineNo: idx + 1,
              description: item.description,
              orderedQty: item.qty,
              uomCode: item.uomCode,
              unitPrice: item.unitPrice,
            })),
          } : undefined,
        },
        include: { customer: true, items: true },
      });

      deliveryOrders.push(deliveryOrder);

      await this.audit.log({
        tenantId: req.user.tenantId,
        actorUserId: req.user.id,
        action: 'GENERATE',
        entity: 'DeliveryOrder',
        entityId: deliveryOrder.id,
        metadata: { code, shipmentId: shipment.id, warehouseId: body.warehouseId },
      });
    }

    return { deliveryOrders, generated: deliveryOrders.length, skipped: body.shipmentIds.length - deliveryOrders.length };
  }

  @Post()
  @RequirePermissions('logistics.delivery.manage')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateDeliveryOrderDto,
  ) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { id: body.warehouseId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    const customer = await this.prisma.customer.findFirst({
      where: { id: body.customerId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    const count = await this.prisma.deliveryOrder.count({ where: { tenantId: req.user.tenantId } });
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const code = body.code || `DO-${today}-${String(count + 1).padStart(4, '0')}`;

    const podToken = randomBytes(32).toString('hex');
    const podTokenExpiry = new Date();
    podTokenExpiry.setDate(podTokenExpiry.getDate() + 7);

    const deliveryOrder = await this.prisma.deliveryOrder.create({
      data: {
        tenantId: req.user.tenantId,
        code,
        shipmentId: body.shipmentId,
        salesOrderId: body.salesOrderId,
        customerId: body.customerId,
        warehouseId: body.warehouseId,
        priority: body.priority || 'NORMAL',
        plannedShipDate: body.plannedShipDate ? new Date(body.plannedShipDate) : undefined,
        deliveryAddress1: body.deliveryAddress1,
        deliveryAddress2: body.deliveryAddress2,
        deliveryCity: body.deliveryCity,
        deliveryProvince: body.deliveryProvince,
        deliveryPostalCode: body.deliveryPostalCode,
        deliveryNotes: body.deliveryNotes,
        status: 'DRAFT',
        podToken,
        podTokenExpiry,
        items: body.items ? {
          create: body.items.map((item, idx) => ({
            tenantId: req.user.tenantId,
            lineNo: idx + 1,
            itemId: item.itemId,
            description: item.description,
            orderedQty: item.orderedQty,
            uomCode: item.uomCode,
            unitPrice: item.unitPrice || 0,
            batchNo: item.batchNo,
            serialNo: item.serialNo,
          })),
        } : undefined,
      },
      include: { customer: true, items: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'DeliveryOrder',
      entityId: deliveryOrder.id,
      metadata: { code },
    });

    return { deliveryOrder };
  }

  @Patch(':id')
  @RequirePermissions('logistics.delivery.manage')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateDeliveryOrderDto,
  ) {
    const existing = await this.prisma.deliveryOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, status: true },
    });
    if (!existing) throw new NotFoundException('Delivery order not found');

    if (existing.status !== 'DRAFT' && existing.status !== 'PLANNED') {
      throw new Error('Can only update draft or planned delivery orders');
    }

    const updated = await this.prisma.deliveryOrder.update({
      where: { id },
      data: {
        ...(body.plannedShipDate && { plannedShipDate: new Date(body.plannedShipDate) }),
        ...(body.priority && { priority: body.priority }),
        ...(body.deliveryAddress1 !== undefined && { deliveryAddress1: body.deliveryAddress1 }),
        ...(body.deliveryAddress2 !== undefined && { deliveryAddress2: body.deliveryAddress2 }),
        ...(body.deliveryCity !== undefined && { deliveryCity: body.deliveryCity }),
        ...(body.deliveryProvince !== undefined && { deliveryProvince: body.deliveryProvince }),
        ...(body.deliveryPostalCode !== undefined && { deliveryPostalCode: body.deliveryPostalCode }),
        ...(body.deliveryNotes !== undefined && { deliveryNotes: body.deliveryNotes }),
      },
      include: { customer: true, items: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'UPDATE',
      entity: 'DeliveryOrder',
      entityId: id,
      metadata: { code: updated.code },
    });

    return { deliveryOrder: updated };
  }

  @Post(':id/release')
  @RequirePermissions('logistics.delivery.manage')
  async release(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const existing = await this.prisma.deliveryOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, code: true, status: true, items: { select: { id: true } } },
    });
    if (!existing) throw new NotFoundException('Delivery order not found');

    if (existing.status !== 'DRAFT' && existing.status !== 'PLANNED') {
      throw new Error('Can only release draft or planned delivery orders');
    }

    if (existing.items.length === 0) {
      throw new Error('Cannot release delivery order without items');
    }

    const updated = await this.prisma.deliveryOrder.update({
      where: { id },
      data: { status: 'RELEASED' },
      include: { customer: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'RELEASE',
      entity: 'DeliveryOrder',
      entityId: id,
      metadata: { code: existing.code },
    });

    return { deliveryOrder: updated };
  }

  @Post(':id/cancel')
  @RequirePermissions('logistics.delivery.manage')
  async cancel(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const existing = await this.prisma.deliveryOrder.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, code: true, status: true, tripPlanId: true },
    });
    if (!existing) throw new NotFoundException('Delivery order not found');

    if (['IN_TRANSIT', 'DELIVERED', 'RTO'].includes(existing.status)) {
      throw new Error('Cannot cancel delivery order that is in transit or already delivered');
    }

    // If assigned to trip, unassign
    if (existing.tripPlanId) {
      await this.prisma.deliveryOrder.update({
        where: { id },
        data: { tripPlanId: null },
      });
    }

    const updated = await this.prisma.deliveryOrder.update({
      where: { id },
      data: { status: 'CANCELED', tripPlanId: null },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'CANCEL',
      entity: 'DeliveryOrder',
      entityId: id,
      metadata: { code: existing.code },
    });

    return { deliveryOrder: updated };
  }
}
