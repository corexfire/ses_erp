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
  Delete,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { FleetVehicle, VehicleOwnershipType, VehicleStatus } from '../../../prisma/generated/client';
import { CreateFleetVehicleDto } from './dto/create-fleet-vehicle.dto';
import { UpdateFleetVehicleDto } from './dto/update-fleet-vehicle.dto';

const vehicleOwnershipTypeSet = new Set<VehicleOwnershipType>(['OWNED', 'LEASED', 'THIRD_PARTY']);
const isVehicleOwnershipType = (value?: string): value is VehicleOwnershipType =>
  Boolean(value) && vehicleOwnershipTypeSet.has(value as VehicleOwnershipType);

const vehicleStatusSet = new Set<VehicleStatus>(['ACTIVE', 'MAINTENANCE', 'INACTIVE']);
const isVehicleStatus = (value?: string): value is VehicleStatus =>
  Boolean(value) && vehicleStatusSet.has(value as VehicleStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics/fleet')
export class FleetController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('logistics.fleet.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('status') status?: string,
  ) {
    const vehicles = await this.prisma.fleetVehicle.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { plateNo: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
        ...(isVehicleStatus(status) ? { status } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { transporter: true },
      take: 200,
    });
    return { vehicles };
  }

  @Get(':id')
  @RequirePermissions('logistics.fleet.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const vehicle = await this.prisma.fleetVehicle.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { transporter: true, tripPlans: { take: 10, orderBy: { routeDate: 'desc' } } },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return { vehicle };
  }

  @Post()
  @RequirePermissions('logistics.fleet.manage')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateFleetVehicleDto,
  ) {
    if (body.transporterId) {
      const transporter = await this.prisma.transporter.findFirst({
        where: { id: body.transporterId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!transporter) throw new NotFoundException('Transporter not found');
    }

    const count = await this.prisma.fleetVehicle.count({ where: { tenantId: req.user.tenantId! } });
    const code = `VEH-${String(count + 1).padStart(6, '0')}`;

    const vehicle = await this.prisma.fleetVehicle.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code || code,
        plateNo: body.plateNo,
        vehicleType: body.vehicleType,
        brand: body.brand,
        model: body.model,
        year: body.year,
        ownershipType: body.ownershipType as VehicleOwnershipType || 'OWNED',
        capacityWeight: body.capacityWeight,
        capacityVolume: body.capacityVolume,
        status: body.status as VehicleStatus || 'ACTIVE',
        transporterId: body.transporterId,
        stnkNo: body.stnkNo,
        stnkExpiry: body.stnkExpiry ? new Date(body.stnkExpiry) : undefined,
        kirNo: body.kirNo,
        kirExpiry: body.kirExpiry ? new Date(body.kirExpiry) : undefined,
        notes: body.notes,
      },
      include: { transporter: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'FleetVehicle',
      entityId: vehicle.id,
      metadata: { code: vehicle.code, plateNo: vehicle.plateNo, status: vehicle.status },
    });

    return { vehicle };
  }

  @Patch(':id')
  @RequirePermissions('logistics.fleet.manage')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateFleetVehicleDto,
  ) {
    const exists = await this.prisma.fleetVehicle.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Vehicle not found');

    if (body.transporterId) {
      const transporter = await this.prisma.transporter.findFirst({
        where: { id: body.transporterId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!transporter) throw new NotFoundException('Transporter not found');
    }

    const vehicle = await this.prisma.fleetVehicle.update({
      where: { id },
      data: {
        ...(body.plateNo && { plateNo: body.plateNo }),
        ...(body.vehicleType && { vehicleType: body.vehicleType }),
        ...(body.brand !== undefined && { brand: body.brand }),
        ...(body.model !== undefined && { model: body.model }),
        ...(body.year !== undefined && { year: body.year }),
        ...(body.ownershipType && { ownershipType: body.ownershipType as VehicleOwnershipType }),
        ...(body.capacityWeight !== undefined && { capacityWeight: body.capacityWeight }),
        ...(body.capacityVolume !== undefined && { capacityVolume: body.capacityVolume }),
        ...(body.status && { status: body.status as VehicleStatus }),
        ...(body.transporterId !== undefined && { transporterId: body.transporterId }),
        ...(body.stnkNo !== undefined && { stnkNo: body.stnkNo }),
        ...(body.stnkExpiry && { stnkExpiry: new Date(body.stnkExpiry) }),
        ...(body.kirNo !== undefined && { kirNo: body.kirNo }),
        ...(body.kirExpiry && { kirExpiry: new Date(body.kirExpiry) }),
        ...(body.notes !== undefined && { notes: body.notes }),
      },
      include: { transporter: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'UPDATE',
      entity: 'FleetVehicle',
      entityId: vehicle.id,
      metadata: { code: vehicle.code, plateNo: vehicle.plateNo, status: vehicle.status },
    });

    return { vehicle };
  }

  @Post(':id/deactivate')
  @RequirePermissions('logistics.fleet.manage')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const vehicle = await this.prisma.fleetVehicle.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, code: true },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    const updated = await this.prisma.fleetVehicle.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'DEACTIVATE',
      entity: 'FleetVehicle',
      entityId: id,
      metadata: { code: vehicle.code },
    });

    return { vehicle: updated };
  }
}
