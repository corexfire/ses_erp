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

export class CreatePackingListDto {
  deliveryOrderId?: string;
  warehouseId!: string;
  notes?: string;
  totalWeight?: number;
  totalVolume?: number;
  packageCount?: number;
  shippingMark?: string;
  sealNumber?: string;
  carrierId?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics')
export class PackingController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('packing-lists')
  @RequirePermissions('logistics.packing.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId };
    
    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { shippingMark: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const packingLists = await this.prisma.packingList.findMany({
      where,
      include: {
        deliveryOrder: { include: { customer: true } },
        carrier: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    return { data: packingLists };
  }

  @Get('packing-lists/:id')
  @RequirePermissions('logistics.packing.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const packing = await this.prisma.packingList.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        deliveryOrder: {
          include: {
            customer: true,
            items: { include: { item: true } },
          },
        },
        carrier: true,
      },
    });
    if (!packing) throw new NotFoundException('Packing list not found');
    return packing;
  }

  @Post('packing-lists')
  @RequirePermissions('logistics.warehouse.execute')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreatePackingListDto,
  ) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { id: body.warehouseId, tenantId: req.user.tenantId },
      select: { id: true, name: true },
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    const count = await this.prisma.packingList.count({ where: { tenantId: req.user.tenantId } });
    const code = `PKL-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(count + 1).padStart(4, '0')}`;

    const packing = await this.prisma.packingList.create({
      data: {
        tenantId: req.user.tenantId,
        code,
        deliveryOrderId: body.deliveryOrderId,
        warehouseId: body.warehouseId,
        packingDate: new Date(),
        notes: body.notes,
        status: 'DRAFT',
        totalWeight: body.totalWeight,
        totalVolume: body.totalVolume,
        packageCount: body.packageCount,
        shippingMark: body.shippingMark,
        sealNumber: body.sealNumber,
        carrierId: body.carrierId,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'PackingList',
      entityId: packing.id,
      metadata: { code, warehouseId: body.warehouseId },
    });

    return { packing };
  }

  @Post('packing-lists/:id/confirm')
  @RequirePermissions('logistics.warehouse.execute')
  async confirm(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const packing = await this.prisma.packingList.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, code: true, status: true },
    });
    if (!packing) throw new NotFoundException('Packing list not found');

    if (packing.status !== 'DRAFT') {
      throw new Error('Can only confirm draft packing');
    }

    const updated = await this.prisma.packingList.update({
      where: { id },
      data: {
        status: 'CONFIRMED',
        packedBy: req.user.id,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'CONFIRM',
      entity: 'PackingList',
      entityId: id,
      metadata: { code: packing.code },
    });

    return { packing: updated };
  }
}