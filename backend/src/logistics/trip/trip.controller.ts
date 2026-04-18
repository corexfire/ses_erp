import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
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
import type { TripPlanStatus } from '../../../prisma/generated/client';

const tripStatusSet = new Set<TripPlanStatus>(['PLANNED', 'READY', 'DISPATCHED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED']);
const isTripStatus = (value?: string): value is TripPlanStatus =>
  Boolean(value) && tripStatusSet.has(value as TripPlanStatus);

export class CreateRouteTemplateDto {
  code?: string;
  name!: string;
  warehouseId?: string;
  description?: string;
}

export class CreateTripDto {
  routeDate!: string;
  vehicleId?: string;
  driverId?: string;
  routeTemplateId?: string;
  notes?: string;
}

export class AssignDeliveriesDto {
  deliveryOrderIds!: string[];
}

export class DispatchTripDto {
  vehicleId!: string;
  driverId!: string;
  loaderUserIds?: string[];
  departureAt!: string;
}

export class AddCheckpointDto {
  checkpointType!: 'LOADED' | 'DEPARTED' | 'ARRIVED' | 'DELIVERED' | 'RETURNED' | 'FAILED';
  locationName?: string;
  latitude?: number;
  longitude?: number;
  deliveryOrderId?: string;
  notes?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics/routes')
export class RouteController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('logistics.route.read')
  async listRoutes(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const routes = await this.prisma.routeTemplate.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { warehouse: true },
      take: 200,
    });
    return { routes };
  }

  @Get('route/:id')
  @RequirePermissions('logistics.route.read')
  async getRoute(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const route = await this.prisma.routeTemplate.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { warehouse: true, tripPlans: { take: 20, orderBy: { routeDate: 'desc' } } },
    });
    if (!route) throw new NotFoundException('Route template not found');
    return { route };
  }

  @Post()
  @RequirePermissions('logistics.route.manage')
  async createRoute(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateRouteTemplateDto,
  ) {
    const count = await this.prisma.routeTemplate.count({ where: { tenantId: req.user.tenantId! } });
    const code = `RTE-${String(count + 1).padStart(6, '0')}`;

    const route = await this.prisma.routeTemplate.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code || code,
        name: body.name,
        warehouseId: body.warehouseId,
        description: body.description,
      },
      include: { warehouse: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'RouteTemplate',
      entityId: route.id,
      metadata: { code: route.code, name: route.name },
    });

    return { route };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics/trips')
export class TripController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('logistics.trip.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('status') status?: string,
    @Query('routeDate') routeDate?: string,
    @Query('vehicleId') vehicleId?: string,
    @Query('driverId') driverId?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (isTripStatus(status)) where.status = status;
    if (routeDate) where.routeDate = { gte: new Date(routeDate + 'T00:00:00Z'), lt: new Date(routeDate + 'T23:59:59Z') };
    if (vehicleId) where.vehicleId = vehicleId;
    if (driverId) where.driverId = driverId;

    const trips = await this.prisma.tripPlan.findMany({
      where,
      orderBy: [{ routeDate: 'desc' }],
      include: { vehicle: true, driver: true, routeTemplate: true, _count: { select: { deliveryOrders: true } } },
      take: 200,
    });
    return { trips };
  }

  @Get(':id')
  @RequirePermissions('logistics.trip.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const trip = await this.prisma.tripPlan.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        vehicle: true,
        driver: true,
        routeTemplate: true,
        checkpoints: { orderBy: { timestamp: 'asc' } },
        deliveryOrders: { include: { customer: true, proofOfDelivery: true } },
        costs: true,
      },
    });
    if (!trip) throw new NotFoundException('Trip not found');
    return { trip };
  }

  @Post()
  @RequirePermissions('logistics.trip.manage')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateTripDto,
  ) {
    if (body.vehicleId) {
      const vehicle = await this.prisma.fleetVehicle.findFirst({
        where: { id: body.vehicleId, tenantId: req.user.tenantId!, status: 'ACTIVE' },
        select: { id: true },
      });
      if (!vehicle) throw new NotFoundException('Vehicle not found or inactive');
    }

    if (body.driverId) {
      const driver = await this.prisma.logisticsDriver.findFirst({
        where: { id: body.driverId, tenantId: req.user.tenantId!, status: 'ACTIVE' },
        select: { id: true },
      });
      if (!driver) throw new NotFoundException('Driver not found or inactive');
    }

    const count = await this.prisma.tripPlan.count({ where: { tenantId: req.user.tenantId! } });
    const code = `TRP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(count + 1).padStart(4, '0')}`;

    const trip = await this.prisma.tripPlan.create({
      data: {
        tenantId: req.user.tenantId!,
        code,
        routeDate: new Date(body.routeDate),
        vehicleId: body.vehicleId,
        driverId: body.driverId,
        routeTemplateId: body.routeTemplateId,
        notes: body.notes,
        status: 'PLANNED',
      },
      include: { vehicle: true, driver: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'TripPlan',
      entityId: trip.id,
      metadata: { code: trip.code, routeDate: body.routeDate },
    });

    return { trip };
  }

  @Post(':id/assign-deliveries')
  @RequirePermissions('logistics.trip.manage')
  async assignDeliveries(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: AssignDeliveriesDto,
  ) {
    const trip = await this.prisma.tripPlan.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, code: true, status: true },
    });
    if (!trip) throw new NotFoundException('Trip not found');

    if (trip.status !== 'PLANNED') {
      throw new Error('Can only assign deliveries to planned trips');
    }

    // Validate delivery orders exist and belong to tenant
    const deliveryOrders = await this.prisma.deliveryOrder.findMany({
      where: {
        id: { in: body.deliveryOrderIds },
        tenantId: req.user.tenantId!,
        status: { in: ['PLANNED', 'RELEASED'] },
      },
      select: { id: true },
    });

    if (deliveryOrders.length !== body.deliveryOrderIds.length) {
      throw new Error('Some delivery orders not found or not eligible');
    }

    // Update delivery orders with tripId
    await this.prisma.deliveryOrder.updateMany({
      where: { id: { in: body.deliveryOrderIds } },
      data: { tripPlanId: id },
    });

    // Update trip status to READY
    await this.prisma.tripPlan.update({
      where: { id },
      data: { status: 'READY' },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'ASSIGN_DELIVERIES',
      entity: 'TripPlan',
      entityId: id,
      metadata: { tripCode: trip.code, deliveryOrderCount: body.deliveryOrderIds.length },
    });

    return { success: true, assignedCount: deliveryOrders.length };
  }

  @Post(':id/dispatch')
  @RequirePermissions('logistics.dispatch.execute')
  async dispatch(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: DispatchTripDto,
  ) {
    const trip = await this.prisma.tripPlan.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, code: true, status: true },
    });
    if (!trip) throw new NotFoundException('Trip not found');

    if (!['PLANNED', 'READY'].includes(trip.status)) {
      throw new Error('Can only dispatch planned or ready trips');
    }

    if (!body.vehicleId || !body.driverId) {
      throw new Error('Vehicle and Driver are required for dispatch');
    }

    const updated = await this.prisma.tripPlan.update({
      where: { id },
      data: {
        vehicleId: body.vehicleId,
        driverId: body.driverId,
        status: 'DISPATCHED',
        departureAt: new Date(body.departureAt),
        actualDepartureAt: new Date(body.departureAt),
      },
      include: { vehicle: true, driver: true },
    });

    // Update all assigned DOs to IN_TRANSIT
    await this.prisma.deliveryOrder.updateMany({
      where: { tripPlanId: id, status: { in: ['RELEASED', 'LOADED'] } },
      data: { status: 'IN_TRANSIT', actualShipDate: new Date() },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'DISPATCH',
      entity: 'TripPlan',
      entityId: id,
      metadata: { tripCode: trip.code, vehicleId: body.vehicleId, driverId: body.driverId, departureAt: body.departureAt },
    });

    return { trip: updated };
  }

  @Post(':id/checkpoints')
  @RequirePermissions('logistics.dispatch.execute')
  async addCheckpoint(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: AddCheckpointDto,
  ) {
    const trip = await this.prisma.tripPlan.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, status: true },
    });
    if (!trip) throw new NotFoundException('Trip not found');

    const checkpoint = await this.prisma.tripCheckpoint.create({
      data: {
        tenantId: req.user.tenantId!,
        tripPlanId: id,
        checkpointType: body.checkpointType,
        locationName: body.locationName,
        latitude: body.latitude,
        longitude: body.longitude,
        timestamp: new Date(),
        notes: body.notes,
        deliveryOrderId: body.deliveryOrderId,
      },
    });

    // Update trip status based on checkpoint type
    if (body.checkpointType === 'DEPARTED') {
      await this.prisma.tripPlan.update({
        where: { id },
        data: { status: 'IN_PROGRESS' },
      });
    } else if (body.checkpointType === 'RETURNED' || body.checkpointType === 'DELIVERED') {
      await this.prisma.tripPlan.update({
        where: { id },
        data: { status: 'COMPLETED', actualReturnAt: new Date() },
      });
    }

    // Update DO status if delivery checkpoint
    if (body.deliveryOrderId) {
      if (body.checkpointType === 'DELIVERED') {
        await this.prisma.deliveryOrder.update({
          where: { id: body.deliveryOrderId },
          data: { status: 'DELIVERED', actualDeliveredAt: new Date() },
        });
      } else if (body.checkpointType === 'FAILED') {
        await this.prisma.deliveryOrder.update({
          where: { id: body.deliveryOrderId },
          data: { status: 'FAILED' },
        });
      }
    }

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'ADD_CHECKPOINT',
      entity: 'TripCheckpoint',
      entityId: checkpoint.id,
      metadata: { tripId: id, checkpointType: body.checkpointType },
    });

    return { checkpoint };
  }

  @Post(':id/complete')
  @RequirePermissions('logistics.dispatch.execute')
  async complete(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const trip = await this.prisma.tripPlan.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, code: true, status: true },
    });
    if (!trip) throw new NotFoundException('Trip not found');

    if (!['DISPATCHED', 'IN_PROGRESS'].includes(trip.status)) {
      throw new Error('Can only complete dispatched or in-progress trips');
    }

    const updated = await this.prisma.tripPlan.update({
      where: { id },
      data: { status: 'COMPLETED', actualReturnAt: new Date() },
      include: { vehicle: true, driver: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'COMPLETE',
      entity: 'TripPlan',
      entityId: id,
      metadata: { tripCode: trip.code },
    });

    return { trip: updated };
  }
}
