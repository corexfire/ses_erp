import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Query, Req, Delete, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { InventoryDocStatus } from '../../../prisma/generated/client';
import { CreatePackingDto, UpdatePackingDto } from './dto/create-packing.dto';

const inventoryStatusSet = new Set<InventoryDocStatus>(['DRAFT', 'SUBMITTED', 'POSTED', 'VOID']);
const isInventoryDocStatus = (value?: string): value is InventoryDocStatus =>
  Boolean(value) && inventoryStatusSet.has(value as InventoryDocStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/packings')
export class PackingController {
  constructor(private readonly prisma: PrismaService, private readonly audit: AuditService) {}

  @Get()
  @RequirePermissions('inventory.packing.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('q') q?: string, @Query('status') status?: string) {
    const packings = await this.prisma.packing.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(isInventoryDocStatus(status) ? { status } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { warehouse: true, salesOrder: true },
      take: 200,
    });
    return { packings };
  }

  @Get(':id')
  @RequirePermissions('inventory.packing.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const packing = await this.prisma.packing.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        warehouse: true,
        salesOrder: true,
        items: { orderBy: [{ lineNo: 'asc' }], include: { item: true } },
      },
    });
    if (!packing) throw new NotFoundException('Packing not found');
    return { packing };
  }

  @Post()
  @RequirePermissions('inventory.packing.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreatePackingDto) {
    const warehouse = await this.prisma.warehouse.findFirst({ where: { id: body.warehouseId, tenantId: req.user.tenantId! } });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    const count = await this.prisma.packing.count({ where: { tenantId: req.user.tenantId! } });
    const code = `PKG-${String(count + 1).padStart(6, '0')}`;

    const packing = await this.prisma.packing.create({
      data: {
        tenantId: req.user.tenantId!,
        code,
        packingDate: new Date(body.packingDate),
        warehouseId: body.warehouseId,
        salesOrderId: body.salesOrderId,
        notes: body.notes,
        status: 'DRAFT',
        items: {
          create: body.items.map((item, index) => ({
            tenantId: req.user.tenantId!,
            lineNo: index + 1,
            itemId: item.itemId,
            description: item.description,
            qty: item.qty,
            uomCode: item.uomCode,
          })),
        },
      },
      include: { warehouse: true, salesOrder: true, items: { include: { item: true } } },
    });

    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'CREATE', entity: 'Packing', entityId: packing.id, metadata: { code } });
    return { packing };
  }

  @Patch(':id')
  @RequirePermissions('inventory.packing.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: UpdatePackingDto) {
    const existing = await this.prisma.packing.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!existing) throw new NotFoundException('Packing not found');
    if (existing.status !== 'DRAFT') throw new ForbiddenException('Can only update draft documents');

    await this.prisma.packingItem.deleteMany({ where: { packingId: id } });

    const packing = await this.prisma.packing.update({
      where: { id },
      data: {
        ...(body.packingDate && { packingDate: new Date(body.packingDate) }),
        ...(body.warehouseId && { warehouseId: body.warehouseId }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.items && {
          items: {
            create: body.items.map((item, index) => ({
              tenantId: req.user.tenantId!,
              lineNo: index + 1,
              itemId: item.itemId,
              description: item.description,
              qty: item.qty,
              uomCode: item.uomCode,
            })),
          },
        }),
      },
      include: { warehouse: true, items: { include: { item: true } } },
    });

    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'UPDATE', entity: 'Packing', entityId: packing.id, metadata: { code: packing.code } });
    return { packing };
  }

  @Delete(':id')
  @RequirePermissions('inventory.packing.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const existing = await this.prisma.packing.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!existing) throw new NotFoundException('Packing not found');
    if (existing.status !== 'DRAFT') throw new ForbiddenException('Can only delete draft documents');

    await this.prisma.packing.delete({ where: { id } });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'DELETE', entity: 'Packing', entityId: id, metadata: { code: existing.code } });
    return { success: true };
  }

  @Post(':id/submit')
  @RequirePermissions('inventory.packing.submit')
  async submit(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const packing = await this.prisma.packing.findFirst({ where: { id, tenantId: req.user.tenantId! }, include: { items: true, warehouse: true } });
    if (!packing) throw new NotFoundException('Packing not found');
    if (packing.status !== 'DRAFT') throw new ForbiddenException('Can only submit draft documents');

    const updated = await this.prisma.packing.update({ where: { id }, data: { status: 'SUBMITTED' }, include: { warehouse: true, items: { include: { item: true } } } });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'SUBMIT', entity: 'Packing', entityId: packing.id, metadata: { code: packing.code } });
    return { packing: updated };
  }
}