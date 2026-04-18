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
import type { ShipmentStatus } from '../../../prisma/generated/client';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';

const shipmentStatusSet = new Set<ShipmentStatus>([
  'CREATED',
  'SHIPPED',
  'DELIVERED',
  'CANCELED',
]);
const isShipmentStatus = (value?: string): value is ShipmentStatus =>
  Boolean(value) && shipmentStatusSet.has(value as ShipmentStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('sales/shipping/shipments')
export class ShipmentsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('sales.shipping.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('status') status?: string,
  ) {
    const shipments = await this.prisma.shipment.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { trackingNo: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
        ...(isShipmentStatus(status) ? { status } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { carrier: true, order: { include: { customer: true } } },
      take: 200,
    });
    return { shipments };
  }

  @Get(':id')
  @RequirePermissions('sales.shipping.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const shipment = await this.prisma.shipment.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        carrier: true,
        order: {
          include: { customer: true, items: { orderBy: [{ lineNo: 'asc' }] } },
        },
      },
    });
    if (!shipment) throw new NotFoundException('Shipment not found');
    return { shipment };
  }

  @Post()
  @RequirePermissions('sales.shipping.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateShipmentDto,
  ) {
    if (body.orderId) {
      const order = await this.prisma.salesOrder.findFirst({
        where: { id: body.orderId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!order) throw new NotFoundException('Sales order not found');
    }

    if (body.carrierId) {
      const carrier = await this.prisma.carrier.findFirst({
        where: { id: body.carrierId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!carrier) throw new NotFoundException('Carrier not found');
    }

    const shipment = await this.prisma.shipment.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        orderId: body.orderId,
        carrierId: body.carrierId,
        trackingNo: body.trackingNo,
        shipDate: body.shipDate ? new Date(body.shipDate) : undefined,
        deliveryDate: body.deliveryDate
          ? new Date(body.deliveryDate)
          : undefined,
        status: body.status ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Shipment',
      entityId: shipment.id,
    });

    return { shipment };
  }

  @Patch(':id')
  @RequirePermissions('sales.shipping.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateShipmentDto,
  ) {
    const exists = await this.prisma.shipment.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Shipment not found');

    if (body.orderId) {
      const order = await this.prisma.salesOrder.findFirst({
        where: { id: body.orderId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!order) throw new NotFoundException('Sales order not found');
    }

    if (body.carrierId) {
      const carrier = await this.prisma.carrier.findFirst({
        where: { id: body.carrierId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!carrier) throw new NotFoundException('Carrier not found');
    }

    const shipment = await this.prisma.shipment.update({
      where: { id },
      data: {
        orderId: body.orderId ?? undefined,
        carrierId: body.carrierId ?? undefined,
        trackingNo: body.trackingNo ?? undefined,
        shipDate: body.shipDate ? new Date(body.shipDate) : undefined,
        deliveryDate: body.deliveryDate
          ? new Date(body.deliveryDate)
          : undefined,
        status: body.status ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'Shipment',
      entityId: shipment.id,
    });

    return { shipment };
  }
}
