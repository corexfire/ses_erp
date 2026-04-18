import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Query, Req, Delete, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { InventoryDocStatus } from '../../../prisma/generated/client';
import { CreateGoodsIssueDto, UpdateGoodsIssueDto } from './dto/create-issue.dto';
import { v4 as uuidv4 } from 'uuid';

const inventoryStatusSet = new Set<InventoryDocStatus>([
  'DRAFT',
  'SUBMITTED',
  'POSTED',
  'VOID',
]);
const isInventoryDocStatus = (value?: string): value is InventoryDocStatus =>
  Boolean(value) && inventoryStatusSet.has(value as InventoryDocStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/issues')
export class IssuesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('inventory.issue.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('q') q?: string, @Query('status') status?: string) {
    const issues = await this.prisma.goodsIssueNote.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(isInventoryDocStatus(status) ? { status } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { warehouse: true },
      take: 200,
    });
    return { issues };
  }

  @Get(':id')
  @RequirePermissions('inventory.issue.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const issue = await this.prisma.goodsIssueNote.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        warehouse: true,
        items: { orderBy: [{ lineNo: 'asc' }], include: { item: true, binLocation: true } },
      },
    });
    if (!issue) throw new NotFoundException('Goods Issue not found');
    return { issue };
  }

  @Post()
  @RequirePermissions('inventory.issue.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateGoodsIssueDto) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { id: body.warehouseId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    // Generate code
    const count = await this.prisma.goodsIssueNote.count({ where: { tenantId: req.user.tenantId! } });
    const code = `GI-${String(count + 1).padStart(6, '0')}`;

    const issue = await this.prisma.goodsIssueNote.create({
      data: {
        tenantId: req.user.tenantId!,
        code,
        issueDate: new Date(body.issueDate),
        warehouseId: body.warehouseId,
        referenceId: body.referenceId,
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
            warehouseId: item.warehouseId,
            binLocationId: item.binLocationId,
            batchCode: item.batchCode,
            serialNo: item.serialNo,
          })),
        },
      },
      include: { warehouse: true, items: { include: { item: true } } },
    });

    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'CREATE', entity: 'GoodsIssueNote', entityId: issue.id, metadata: { code } });
    return { issue };
  }

  @Patch(':id')
  @RequirePermissions('inventory.issue.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: UpdateGoodsIssueDto) {
    const existing = await this.prisma.goodsIssueNote.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!existing) throw new NotFoundException('Goods Issue not found');
    if (existing.status !== 'DRAFT') throw new ForbiddenException('Can only update draft documents');

    // Delete old items and recreate
    await this.prisma.goodsIssueItem.deleteMany({ where: { issueId: id } });

    const issue = await this.prisma.goodsIssueNote.update({
      where: { id },
      data: {
        ...(body.issueDate && { issueDate: new Date(body.issueDate) }),
        ...(body.warehouseId && { warehouseId: body.warehouseId }),
        ...(body.referenceId !== undefined && { referenceId: body.referenceId }),
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
              warehouseId: item.warehouseId,
              binLocationId: item.binLocationId,
              batchCode: item.batchCode,
              serialNo: item.serialNo,
            })),
          },
        }),
      },
      include: { warehouse: true, items: { include: { item: true } } },
    });

    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'UPDATE', entity: 'GoodsIssueNote', entityId: issue.id, metadata: { code: issue.code } });
    return { issue };
  }

  @Delete(':id')
  @RequirePermissions('inventory.issue.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const existing = await this.prisma.goodsIssueNote.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!existing) throw new NotFoundException('Goods Issue not found');
    if (existing.status !== 'DRAFT') throw new ForbiddenException('Can only delete draft documents');

    await this.prisma.goodsIssueNote.delete({ where: { id } });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'DELETE', entity: 'GoodsIssueNote', entityId: id, metadata: { code: existing.code } });
    return { success: true };
  }

  @Post(':id/submit')
  @RequirePermissions('inventory.issue.submit')
  async submit(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const issue = await this.prisma.goodsIssueNote.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { items: true, warehouse: true },
    });
    if (!issue) throw new NotFoundException('Goods Issue not found');
    if (issue.status !== 'DRAFT') throw new ForbiddenException('Can only submit draft documents');
    if (issue.items.length === 0) throw new ForbiddenException('Cannot submit empty document');

    // Update stock - qtyOut
    const postingDate = new Date();
    for (const item of issue.items) {
      // Create stock ledger entry
      await this.prisma.stockLedger.create({
        data: {
          tenantId: req.user.tenantId!,
          moveType: 'GOODS_ISSUE',
          refType: 'GoodsIssueNote',
          refId: issue.id,
          postingDate,
          itemId: item.itemId,
          description: `Goods Issue: ${issue.code}`,
          qtyIn: 0,
          qtyOut: item.qty,
          uomCode: item.uomCode,
          warehouseId: issue.warehouseId,
          binLocationId: item.binLocationId,
        },
      });
    }

    const updated = await this.prisma.goodsIssueNote.update({
      where: { id },
      data: { status: 'SUBMITTED' },
      include: { warehouse: true, items: { include: { item: true } } },
    });

    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'SUBMIT', entity: 'GoodsIssueNote', entityId: issue.id, metadata: { code: issue.code } });
    return { issue: updated };
  }

  @Post(':id/void')
  @RequirePermissions('inventory.issue.void')
  async void(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const issue = await this.prisma.goodsIssueNote.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { items: true, warehouse: true },
    });
    if (!issue) throw new NotFoundException('Goods Issue not found');
    if (issue.status !== 'SUBMITTED') throw new ForbiddenException('Can only void submitted documents');

    // Reverse stock
    const postingDate = new Date();
    for (const item of issue.items) {
      await this.prisma.stockLedger.create({
        data: {
          tenantId: req.user.tenantId!,
          moveType: 'MANUAL_ADJUST',
          refType: 'GoodsIssueNote',
          refId: issue.id,
          postingDate,
          itemId: item.itemId,
          description: `Void GI: ${issue.code}`,
          qtyIn: item.qty,
          qtyOut: 0,
          uomCode: item.uomCode,
          warehouseId: issue.warehouseId,
          binLocationId: item.binLocationId,
        },
      });
    }

    const updated = await this.prisma.goodsIssueNote.update({
      where: { id },
      data: { status: 'VOID' },
      include: { warehouse: true, items: { include: { item: true } } },
    });

    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'VOID', entity: 'GoodsIssueNote', entityId: issue.id, metadata: { code: issue.code } });
    return { issue: updated };
  }
}