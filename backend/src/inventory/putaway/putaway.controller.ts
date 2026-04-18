import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Query, Req, Delete, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { InventoryDocStatus } from '../../../prisma/generated/client';
import { CreatePutawayDto, UpdatePutawayDto } from './dto/create-putaway.dto';

const inventoryStatusSet = new Set<InventoryDocStatus>(['DRAFT', 'SUBMITTED', 'POSTED', 'VOID']);
const isInventoryDocStatus = (value?: string): value is InventoryDocStatus =>
  Boolean(value) && inventoryStatusSet.has(value as InventoryDocStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/putaways')
export class PutawayController {
  constructor(private readonly prisma: PrismaService, private readonly audit: AuditService) {}

  @Get()
  @RequirePermissions('inventory.putaway.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('q') q?: string, @Query('status') status?: string) {
    const putaways = await this.prisma.putaway.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(isInventoryDocStatus(status) ? { status } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { warehouse: true, grn: true },
      take: 200,
    });
    return { putaways };
  }

  @Get(':id')
  @RequirePermissions('inventory.putaway.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const putaway = await this.prisma.putaway.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        warehouse: true,
        grn: true,
        items: { orderBy: [{ lineNo: 'asc' }], include: { item: true, fromBinLocation: true, toBinLocation: true } },
      },
    });
    if (!putaway) throw new NotFoundException('Putaway not found');
    return { putaway };
  }

  @Post()
  @RequirePermissions('inventory.putaway.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreatePutawayDto) {
    const warehouse = await this.prisma.warehouse.findFirst({ where: { id: body.warehouseId, tenantId: req.user.tenantId! } });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    const count = await this.prisma.putaway.count({ where: { tenantId: req.user.tenantId! } });
    const code = `PA-${String(count + 1).padStart(6, '0')}`;

    const putaway = await this.prisma.putaway.create({
      data: {
        tenantId: req.user.tenantId!,
        code,
        putawayDate: new Date(body.putawayDate),
        warehouseId: body.warehouseId,
        grnId: body.grnId,
        notes: body.notes,
        status: 'DRAFT',
        items: {
          create: body.items.map((item, index) => ({
            tenantId: req.user.tenantId!,
            lineNo: index + 1,
            grnItemId: item.grnItemId,
            itemId: item.itemId,
            description: item.description,
            qty: item.qty,
            fromBinLocationId: item.fromBinLocationId,
            toBinLocationId: item.toBinLocationId,
            batchCode: item.batchCode,
            serialNo: item.serialNo,
          })),
        },
      },
      include: { warehouse: true, grn: true, items: { include: { item: true } } },
    });

    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'CREATE', entity: 'Putaway', entityId: putaway.id, metadata: { code } });
    return { putaway };
  }

  @Patch(':id')
  @RequirePermissions('inventory.putaway.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: UpdatePutawayDto) {
    const existing = await this.prisma.putaway.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!existing) throw new NotFoundException('Putaway not found');
    if (existing.status !== 'DRAFT') throw new ForbiddenException('Can only update draft documents');

    await this.prisma.putawayItem.deleteMany({ where: { putawayId: id } });

    const putaway = await this.prisma.putaway.update({
      where: { id },
      data: {
        ...(body.putawayDate && { putawayDate: new Date(body.putawayDate) }),
        ...(body.warehouseId && { warehouseId: body.warehouseId }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.items && {
          items: {
            create: body.items.map((item, index) => ({
              tenantId: req.user.tenantId!,
              lineNo: index + 1,
              grnItemId: item.grnItemId,
              itemId: item.itemId,
              description: item.description,
              qty: item.qty,
              fromBinLocationId: item.fromBinLocationId,
              toBinLocationId: item.toBinLocationId,
              batchCode: item.batchCode,
              serialNo: item.serialNo,
            })),
          },
        }),
      },
      include: { warehouse: true, items: { include: { item: true } } },
    });

    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'UPDATE', entity: 'Putaway', entityId: putaway.id, metadata: { code: putaway.code } });
    return { putaway };
  }

  @Delete(':id')
  @RequirePermissions('inventory.putaway.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const existing = await this.prisma.putaway.findFirst({ where: { id, tenantId: req.user.tenantId! } });
    if (!existing) throw new NotFoundException('Putaway not found');
    if (existing.status !== 'DRAFT') throw new ForbiddenException('Can only delete draft documents');

    await this.prisma.putaway.delete({ where: { id } });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'DELETE', entity: 'Putaway', entityId: id, metadata: { code: existing.code } });
    return { success: true };
  }

  @Post(':id/submit')
  @RequirePermissions('inventory.putaway.submit')
  async submit(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const putaway = await this.prisma.putaway.findFirst({ where: { id, tenantId: req.user.tenantId! }, include: { items: true, warehouse: true } });
    if (!putaway) throw new NotFoundException('Putaway not found');
    if (putaway.status !== 'DRAFT') throw new ForbiddenException('Can only submit draft documents');

    const updated = await this.prisma.putaway.update({ where: { id }, data: { status: 'SUBMITTED' }, include: { warehouse: true, items: { include: { item: true } } } });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'SUBMIT', entity: 'Putaway', entityId: putaway.id, metadata: { code: putaway.code } });
    return { putaway: updated };
  }
}