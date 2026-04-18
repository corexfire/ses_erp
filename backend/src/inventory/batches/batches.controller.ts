import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/batches')
export class BatchesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('inventory.batch.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('itemId') itemId?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (itemId) where.itemId = itemId;

    const batches = await this.prisma.itemBatch.findMany({
      where,
      include: { item: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return { batches };
  }

  @Get(':id')
  @RequirePermissions('inventory.batch.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const batch = await this.prisma.itemBatch.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { item: true, stockLedgers: { include: { warehouse: true, binLocation: true } } },
    });
    return { batch };
  }

  @Post()
  @RequirePermissions('inventory.batch.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { itemId: string; code: string; expiryDate?: string }) {
    const item = await this.prisma.item.findFirst({ where: { id: body.itemId, tenantId: req.user.tenantId! } });
    if (!item) throw new Error('Item not found');

    const existing = await this.prisma.itemBatch.findFirst({
      where: { tenantId: req.user.tenantId!, itemId: body.itemId, code: body.code },
    });
    if (existing) throw new Error('Batch code already exists');

    const batch = await this.prisma.itemBatch.create({
      data: {
        tenantId: req.user.tenantId!,
        itemId: body.itemId,
        code: body.code,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
      },
      include: { item: true },
    });
    return { batch };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/serials')
export class SerialsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('inventory.serial.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('itemId') itemId?: string, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (itemId) where.itemId = itemId;
    if (status) where.status = status;

    const serials = await this.prisma.itemSerial.findMany({
      where,
      include: { item: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return { serials };
  }

  @Get(':id')
  @RequirePermissions('inventory.serial.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const serial = await this.prisma.itemSerial.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { item: true, stockLedgers: { include: { warehouse: true, binLocation: true } } },
    });
    return { serial };
  }

  @Post()
  @RequirePermissions('inventory.serial.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { itemId: string; serialNo: string; status?: string }) {
    const item = await this.prisma.item.findFirst({ where: { id: body.itemId, tenantId: req.user.tenantId! } });
    if (!item) throw new Error('Item not found');

    const existing = await this.prisma.itemSerial.findFirst({
      where: { tenantId: req.user.tenantId!, serialNo: body.serialNo },
    });
    if (existing) throw new Error('Serial number already exists');

    const serial = await this.prisma.itemSerial.create({
      data: {
        tenantId: req.user.tenantId!,
        itemId: body.itemId,
        serialNo: body.serialNo,
        status: body.status || 'AVAILABLE',
      },
      include: { item: true },
    });
    return { serial };
  }
}