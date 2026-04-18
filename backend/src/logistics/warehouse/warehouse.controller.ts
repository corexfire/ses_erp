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

export class CreateWavePickingDto {
  warehouseId!: string;
  plannedDate!: string;
  deliveryOrderIds!: string[];
  notes?: string;
}

export class CreateStagingLoadDto {
  waveId?: string;
  tripPlanId?: string;
  warehouseId!: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics')
export class WarehouseController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('waves')
  @RequirePermissions('logistics.warehouse.read')
  async listWaves(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('status') status?: string,
    @Query('warehouseId') warehouseId?: string,
  ) {
    const waves = await this.prisma.wavePicking.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(status && { status: status as any }),
        ...(warehouseId && { warehouseId }),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { warehouse: true },
      take: 200,
    });
    return { waves };
  }

  @Get('waves/:id')
  @RequirePermissions('logistics.warehouse.read')
  async getWave(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const wave = await this.prisma.wavePicking.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        warehouse: true,
      },
    });
    if (!wave) throw new NotFoundException('Wave picking not found');

    const deliveryOrders = await this.prisma.deliveryOrder.findMany({
      where: {
        tenantId: req.user.tenantId!,
        warehouseId: wave.warehouseId,
        status: 'RELEASED',
        plannedShipDate: { gte: new Date(wave.plannedDate + 'T00:00:00Z'), lt: new Date(wave.plannedDate + 'T23:59:59Z') },
      },
      include: { customer: true, items: true },
      take: 100,
    });

    return { wave, deliveryOrders };
  }

  @Post('waves')
  @RequirePermissions('logistics.warehouse.execute')
  async createWave(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateWavePickingDto,
  ) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { id: body.warehouseId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    const deliveryOrders = await this.prisma.deliveryOrder.findMany({
      where: {
        id: { in: body.deliveryOrderIds },
        tenantId: req.user.tenantId!,
        status: 'RELEASED',
      },
      select: { id: true, _count: { select: { items: true } } },
    });

    if (deliveryOrders.length !== body.deliveryOrderIds.length) {
      throw new Error('Some delivery orders not found or not eligible');
    }

    const count = await this.prisma.wavePicking.count({ where: { tenantId: req.user.tenantId! } });
    const code = `WAVE-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(count + 1).padStart(4, '0')}`;

    const totalItemCount = deliveryOrders.reduce((sum, do_) => sum + do_._count.items, 0);

    const wave = await this.prisma.wavePicking.create({
      data: {
        tenantId: req.user.tenantId!,
        code,
        warehouseId: body.warehouseId,
        plannedDate: new Date(body.plannedDate),
        status: 'DRAFT',
        totalDoCount: deliveryOrders.length,
        totalItemCount,
        notes: body.notes,
      },
      include: { warehouse: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'WavePicking',
      entityId: wave.id,
      metadata: { code, deliveryOrderCount: deliveryOrders.length },
    });

    return { wave };
  }

  @Post('waves/:id/release')
  @RequirePermissions('logistics.warehouse.execute')
  async releaseWave(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const wave = await this.prisma.wavePicking.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, code: true, status: true },
    });
    if (!wave) throw new NotFoundException('Wave picking not found');

    if (wave.status !== 'DRAFT') {
      throw new Error('Can only release draft waves');
    }

    const updated = await this.prisma.wavePicking.update({
      where: { id },
      data: { status: 'RELEASED' },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'RELEASE',
      entity: 'WavePicking',
      entityId: id,
      metadata: { code: wave.code },
    });

    return { wave: updated };
  }

  @Post('waves/:id/complete-picking')
  @RequirePermissions('logistics.warehouse.execute')
  async completePicking(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const wave = await this.prisma.wavePicking.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, code: true, status: true },
    });
    if (!wave) throw new NotFoundException('Wave picking not found');

    if (wave.status !== 'RELEASED' && wave.status !== 'IN_PROGRESS') {
      throw new Error('Can only complete released or in-progress waves');
    }

    const updated = await this.prisma.wavePicking.update({
      where: { id },
      data: { status: 'DONE' },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'COMPLETE_PICKING',
      entity: 'WavePicking',
      entityId: id,
      metadata: { code: wave.code },
    });

    return { wave: updated };
  }

  @Get('staging')
  @RequirePermissions('logistics.warehouse.read')
  async listStaging(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('status') status?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (status) where.status = status;

    const stagings = await this.prisma.stagingLoad.findMany({
      where,
      include: { warehouse: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return { stagings };
  }

  @Post('staging')
  @RequirePermissions('logistics.warehouse.execute')
  async createStaging(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateStagingLoadDto,
  ) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { id: body.warehouseId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    const count = await this.prisma.stagingLoad.count({ where: { tenantId: req.user.tenantId! } });
    const code = `STG-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(count + 1).padStart(4, '0')}`;

    const staging = await this.prisma.stagingLoad.create({
      data: {
        tenantId: req.user.tenantId!,
        code,
        waveId: body.waveId,
        tripPlanId: body.tripPlanId,
        warehouseId: body.warehouseId,
        status: 'PENDING',
      },
    });

    return { staging };
  }

  @Post('staging/:id/confirm')
  @RequirePermissions('logistics.warehouse.execute')
  async confirmStaging(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const staging = await this.prisma.stagingLoad.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, status: true },
    });
    if (!staging) throw new NotFoundException('Staging load not found');

    const updated = await this.prisma.stagingLoad.update({
      where: { id },
      data: { status: 'CONFIRMED', loadedAt: new Date() },
    });

    return { staging: updated };
  }

  @Get('staging/:id')
  @RequirePermissions('logistics.warehouse.read')
  async getStaging(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const staging = await this.prisma.stagingLoad.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { warehouse: true },
    });
    if (!staging) throw new NotFoundException('Staging load not found');
    return { staging };
  }

  @Post('loading/:tripId/confirm')
  @RequirePermissions('logistics.dispatch.execute')
  async confirmLoading(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('tripId') tripId: string,
  ) {
    const trip = await this.prisma.tripPlan.findFirst({
      where: { id: tripId, tenantId: req.user.tenantId! },
      select: { id: true, status: true },
    });
    if (!trip) throw new NotFoundException('Trip not found');

    await this.prisma.deliveryOrder.updateMany({
      where: { tripPlanId: tripId, status: 'STAGED' },
      data: { status: 'LOADED' },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'CONFIRM_LOADING',
      entity: 'TripPlan',
      entityId: tripId,
      metadata: { tripId },
    });

    return { success: true };
  }
}
