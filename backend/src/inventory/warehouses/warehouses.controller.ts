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
import { CreateBinLocationDto } from './dto/create-bin-location.dto';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateBinLocationDto } from './dto/update-bin-location.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/warehouses')
export class WarehousesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('inventory.warehouse.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('q') q?: string) {
    const warehouses = await this.prisma.warehouse.findMany({
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
      orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
      include: { 
        binLocations: { take: 10 },
        manager: { select: { id: true, name: true, email: true } },
        _count: { select: { binLocations: true, zones: true } }
      },
      take: 200,
    });
    return { warehouses };
  }

  @Get(':id')
  @RequirePermissions('inventory.warehouse.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { 
        binLocations: { orderBy: [{ code: 'asc' }] },
        zones: { include: { bins: true } },
        manager: { select: { id: true, name: true, email: true } }
      },
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found');
    return { warehouse };
  }

  @Post()
  @RequirePermissions('inventory.warehouse.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateWarehouseDto) {
    const warehouse = await this.prisma.warehouse.create({
      data: { 
        tenantId: req.user.tenantId!, 
        code: body.code, 
        name: body.name,
        type: body.type,
        address1: body.address1,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        managerId: body.managerId,
        capacityWeight: body.capacityWeight,
        capacityVolume: body.capacityVolume,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Warehouse',
      entityId: warehouse.id,
    });

    return { warehouse };
  }

  @Patch(':id')
  @RequirePermissions('inventory.warehouse.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateWarehouseDto,
  ) {
    const exists = await this.prisma.warehouse.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Warehouse not found');

    const warehouse = await this.prisma.warehouse.update({
      where: { id },
      data: { 
        name: body.name ?? undefined,
        type: body.type ?? undefined,
        address1: body.address1 ?? undefined,
        city: body.city ?? undefined,
        province: body.province ?? undefined,
        postalCode: body.postalCode ?? undefined,
        managerId: body.managerId ?? undefined,
        capacityWeight: body.capacityWeight ?? undefined,
        capacityVolume: body.capacityVolume ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'Warehouse',
      entityId: warehouse.id,
    });

    return { warehouse };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('inventory.warehouse.deactivate')
  async deactivate(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const exists = await this.prisma.warehouse.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Warehouse not found');

    const warehouse = await this.prisma.warehouse.update({ where: { id }, data: { isActive: false } });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'Warehouse',
      entityId: warehouse.id,
    });

    return { warehouse };
  }

  // --- Zones Management ---

  @Get(':id/zones')
  @RequirePermissions('inventory.warehouse.read')
  async listZones(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const zones = await this.prisma.warehouseZone.findMany({
      where: { tenantId: req.user.tenantId!, warehouseId: id },
      include: { _count: { select: { bins: true } } },
    });
    return { zones };
  }

  @Post(':id/zones')
  @RequirePermissions('inventory.warehouse.update')
  async createZone(
    @Req() req: FastifyRequest & { user: AuthUser }, 
    @Param('id') id: string, 
    @Body() body: { code: string; name: string; description?: string }
  ) {
    const zone = await this.prisma.warehouseZone.create({
      data: {
        tenantId: req.user.tenantId!,
        warehouseId: id,
        code: body.code,
        name: body.name,
        description: body.description,
      }
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'WarehouseZone',
      entityId: zone.id,
      metadata: { warehouseId: id },
    });

    return { zone };
  }

  // --- Bins Management ---

  @Get(':id/bins')
  @RequirePermissions('inventory.bin.read')
  async listBins(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const bins = await this.prisma.binLocation.findMany({
      where: { tenantId: req.user.tenantId!, warehouseId: id },
      include: { zone: true },
      orderBy: [{ isActive: 'desc' }, { code: 'asc' }],
      take: 500,
    });
    return { bins };
  }

  @Post(':id/bins')
  @RequirePermissions('inventory.bin.create')
  async createBin(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: CreateBinLocationDto) {
    const bin = await this.prisma.binLocation.create({
      data: { 
        tenantId: req.user.tenantId!, 
        warehouseId: id, 
        code: body.code, 
        name: body.name,
        zoneId: body.zoneId,
        type: body.type,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'BinLocation',
      entityId: bin.id,
      metadata: { warehouseId: id },
    });

    return { bin };
  }

  @Patch('/bins/:binId')
  @RequirePermissions('inventory.bin.update')
  async updateBin(@Req() req: FastifyRequest & { user: AuthUser }, @Param('binId') binId: string, @Body() body: UpdateBinLocationDto) {
    const bin = await this.prisma.binLocation.update({
      where: { id: binId, tenantId: req.user.tenantId! },
      data: { 
        name: body.name ?? undefined,
        zoneId: body.zoneId ?? undefined,
        type: body.type ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'BinLocation',
      entityId: bin.id,
    });

    return { bin };
  }

  @Patch('/bins/:binId/deactivate')
  @RequirePermissions('inventory.bin.deactivate')
  async deactivateBin(@Req() req: FastifyRequest & { user: AuthUser }, @Param('binId') binId: string) {
    const bin = await this.prisma.binLocation.update({
      where: { id: binId, tenantId: req.user.tenantId! },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'BinLocation',
      entityId: bin.id,
    });

    return { bin };
  }
}
