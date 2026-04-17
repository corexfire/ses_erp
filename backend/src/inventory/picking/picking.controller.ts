import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Query, Req, Delete, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { InventoryDocStatus } from '../../../prisma/generated/client';
import { CreatePickingDto, UpdatePickingDto } from './dto/create-picking.dto';

const inventoryStatusSet = new Set<InventoryDocStatus>(['DRAFT', 'SUBMITTED', 'POSTED', 'VOID']);
const isInventoryDocStatus = (value?: string): value is InventoryDocStatus =>
  Boolean(value) && inventoryStatusSet.has(value as InventoryDocStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/pickings')
export class PickingController {
  constructor(private readonly prisma: PrismaService, private readonly audit: AuditService) {}

  @Get()
  @RequirePermissions('inventory.picking.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('q') q?: string, @Query('status') status?: string) {
    const pickings = await this.prisma.picking.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(isInventoryDocStatus(status) ? { status } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { warehouse: true, salesOrder: true },
      take: 200,
    });
    return { pickings };
  }

  @Get(':id')
  @RequirePermissions('inventory.picking.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const picking = await this.prisma.picking.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        warehouse: true,
        salesOrder: true,
        items: { orderBy: [{ lineNo: 'asc' }], include: { item: true, fromBinLocation: true } },
      },
    });
    if (!picking) throw new NotFoundException('Picking not found');
    return { picking };
  }

  @Post()
  @RequirePermissions('inventory.picking.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreatePickingDto) {
    const warehouse = await this.prisma.warehouse.findFirst({ where: { id: body.warehouseId, tenantId: req.user.tenantId } });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    const count = await this.prisma.picking.count({ where: { tenantId: req.user.tenantId } });
    const code = `PK-${String(count + 1).padStart(6, '0')}`;

    const picking = await this.prisma.picking.create({
      data: {
        tenantId: req.user.tenantId,
        code,
        pickingDate: new Date(body.pickingDate),
        warehouseId: body.warehouseId,
        salesOrderId: body.salesOrderId,
        notes: body.notes,
        status: 'DRAFT',
        items: {
          create: body.items.map((item, index) => ({
            tenantId: req.user.tenantId,
            lineNo: index + 1,
            itemId: item.itemId,
            description: item.description,
            qty: item.qty,
            fromBinLocationId: item.fromBinLocationId,
            batchCode: item.batchCode,
            serialNo: item.serialNo,
          })),
        },
      },
      include: { warehouse: true, salesOrder: true, items: { include: { item: true } } },
    });

    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'Picking', entityId: picking.id, metadata: { code } });
    return { picking };
  }

  @Patch(':id')
  @RequirePermissions('inventory.picking.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: UpdatePickingDto) {
    const existing = await this.prisma.picking.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!existing) throw new NotFoundException('Picking not found');
    if (existing.status !== 'DRAFT') throw new ForbiddenException('Can only update draft documents');

    await this.prisma.pickingItem.deleteMany({ where: { pickingId: id } });

    const picking = await this.prisma.picking.update({
      where: { id },
      data: {
        ...(body.pickingDate && { pickingDate: new Date(body.pickingDate) }),
        ...(body.warehouseId && { warehouseId: body.warehouseId }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.items && {
          items: {
            create: body.items.map((item, index) => ({
              tenantId: req.user.tenantId,
              lineNo: index + 1,
              itemId: item.itemId,
              description: item.description,
              qty: item.qty,
              fromBinLocationId: item.fromBinLocationId,
              batchCode: item.batchCode,
              serialNo: item.serialNo,
            })),
          },
        }),
      },
      include: { warehouse: true, items: { include: { item: true } } },
    });

    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'UPDATE', entity: 'Picking', entityId: picking.id, metadata: { code: picking.code } });
    return { picking };
  }

  @Delete(':id')
  @RequirePermissions('inventory.picking.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const existing = await this.prisma.picking.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!existing) throw new NotFoundException('Picking not found');
    if (existing.status !== 'DRAFT') throw new ForbiddenException('Can only delete draft documents');

    await this.prisma.picking.delete({ where: { id } });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'Picking', entityId: id, metadata: { code: existing.code } });
    return { success: true };
  }

  @Post(':id/submit')
  @RequirePermissions('inventory.picking.submit')
  async submit(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const picking = await this.prisma.picking.findFirst({ where: { id, tenantId: req.user.tenantId }, include: { items: true, warehouse: true } });
    if (!picking) throw new NotFoundException('Picking not found');
    if (picking.status !== 'DRAFT') throw new ForbiddenException('Can only submit draft documents');

    const updated = await this.prisma.picking.update({ where: { id }, data: { status: 'SUBMITTED' }, include: { warehouse: true, items: { include: { item: true } } } });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'SUBMIT', entity: 'Picking', entityId: picking.id, metadata: { code: picking.code } });
    return { picking: updated };
  }
}