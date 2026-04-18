import {
  Body,
  Controller,
  Delete,
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
import { CreateItemGroupDto } from './dto/create-item-group.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemGroupDto } from './dto/update-item-group.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemUomDto, UpdateItemUomDto } from './dto/item-uom.dto';
import { CreateItemBarcodeDto } from './dto/item-barcode.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory')
export class ItemsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('item-groups')
  @RequirePermissions('inventory.item_group.read')
  async listItemGroups(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const itemGroups = await this.prisma.itemGroup.findMany({
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
      take: 200,
    });
    return { itemGroups };
  }

  @Post('item-groups')
  @RequirePermissions('inventory.item_group.create')
  async createItemGroup(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateItemGroupDto,
  ) {
    const itemGroup = await this.prisma.itemGroup.create({
      data: { tenantId: req.user.tenantId!, code: body.code, name: body.name },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'ItemGroup',
      entityId: itemGroup.id,
    });

    return { itemGroup };
  }

  @Patch('item-groups/:id')
  @RequirePermissions('inventory.item_group.update')
  async updateItemGroup(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateItemGroupDto,
  ) {
    const exists = await this.prisma.itemGroup.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Item group not found');

    const itemGroup = await this.prisma.itemGroup.update({
      where: { id },
      data: { name: body.name ?? undefined },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'ItemGroup',
      entityId: itemGroup.id,
    });

    return { itemGroup };
  }

  @Patch('item-groups/:id/deactivate')
  @RequirePermissions('inventory.item_group.deactivate')
  async deactivateItemGroup(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const exists = await this.prisma.itemGroup.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Item group not found');

    const itemGroup = await this.prisma.itemGroup.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'ItemGroup',
      entityId: itemGroup.id,
    });

    return { itemGroup };
  }

  @Get('items')
  @RequirePermissions('inventory.item.read')
  async listItems(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('isActive') isActive?: string,
  ) {
    const items = await this.prisma.item.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(typeof isActive === 'string' ? { isActive: isActive === 'true' } : {}),
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
      include: { itemGroup: true, uoms: true, barcodes: true, stockBalances: true },
      take: 200,
    });
    return { items };
  }

  @Get('items/:id')
  @RequirePermissions('inventory.item.read')
  async getItem(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const item = await this.prisma.item.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { itemGroup: true, uoms: true, barcodes: true },
    });
    if (!item) throw new NotFoundException('Item not found');
    return { item };
  }

  @Post('items')
  @RequirePermissions('inventory.item.create')
  async createItem(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateItemDto) {
    if (body.itemGroupId) {
      const group = await this.prisma.itemGroup.findFirst({
        where: { id: body.itemGroupId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!group) throw new NotFoundException('Item group not found');
    }

    const item = await this.prisma.item.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
        description: body.description,
        itemGroupId: body.itemGroupId,
        baseUomCode: body.baseUomCode,
        trackingType: (body.trackingType as any) ?? undefined,
        valuationMethod: (body.valuationMethod as any) ?? undefined,
        reorderPoint: body.reorderPoint,
        reorderQty: body.reorderQty,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Item',
      entityId: item.id,
    });

    return { item };
  }

  @Patch('items/:id')
  @RequirePermissions('inventory.item.update')
  async updateItem(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateItemDto,
  ) {
    const exists = await this.prisma.item.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Item not found');

    if (body.itemGroupId) {
      const group = await this.prisma.itemGroup.findFirst({
        where: { id: body.itemGroupId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!group) throw new NotFoundException('Item group not found');
    }

    const item = await this.prisma.item.update({
      where: { id },
      data: {
        name: body.name ?? undefined,
        description: body.description ?? undefined,
        itemGroupId: body.itemGroupId ?? undefined,
        baseUomCode: body.baseUomCode ?? undefined,
        trackingType: (body.trackingType as any) ?? undefined,
        valuationMethod: (body.valuationMethod as any) ?? undefined,
        reorderPoint: body.reorderPoint ?? undefined,
        reorderQty: body.reorderQty ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'Item',
      entityId: item.id,
    });

    return { item };
  }

  @Patch('items/:id/deactivate')
  @RequirePermissions('inventory.item.deactivate')
  async deactivateItem(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const exists = await this.prisma.item.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Item not found');

    const item = await this.prisma.item.update({ where: { id }, data: { isActive: false } });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'Item',
      entityId: item.id,
    });

    return { item };
  }

  // ========== ItemUom CRUD ==========

  @Get('items/:itemId/uoms')
  @RequirePermissions('inventory.item.read')
  async listItemUoms(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('itemId') itemId: string,
  ) {
    const item = await this.prisma.item.findFirst({
      where: { id: itemId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!item) throw new NotFoundException('Item not found');

    const uoms = await this.prisma.itemUom.findMany({
      where: { itemId, tenantId: req.user.tenantId! },
      orderBy: [{ isBase: 'desc' }, { uomCode: 'asc' }],
    });
    return { uoms };
  }

  @Post('items/:itemId/uoms')
  @RequirePermissions('inventory.item.update')
  async createItemUom(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('itemId') itemId: string,
    @Body() body: CreateItemUomDto,
  ) {
    const item = await this.prisma.item.findFirst({
      where: { id: itemId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!item) throw new NotFoundException('Item not found');

    if (body.isBase) {
      await this.prisma.itemUom.updateMany({
        where: { itemId, tenantId: req.user.tenantId! },
        data: { isBase: false },
      });
    }

    const uom = await this.prisma.itemUom.create({
      data: {
        tenantId: req.user.tenantId!,
        itemId,
        uomCode: body.uomCode,
        isBase: body.isBase ?? false,
        conversionRate: body.conversionRate ?? 1,
        price: body.price,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'ItemUom',
      entityId: uom.id,
    });

    return { uom };
  }

  @Patch('items/:itemId/uoms/:uomId')
  @RequirePermissions('inventory.item.update')
  async updateItemUom(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('itemId') itemId: string,
    @Param('uomId') uomId: string,
    @Body() body: UpdateItemUomDto,
  ) {
    const uom = await this.prisma.itemUom.findFirst({
      where: { id: uomId, itemId, tenantId: req.user.tenantId! },
    });
    if (!uom) throw new NotFoundException('ItemUom not found');

    if (body.isBase === true && !uom.isBase) {
      await this.prisma.itemUom.updateMany({
        where: { itemId, tenantId: req.user.tenantId! },
        data: { isBase: false },
      });
    }

    const updated = await this.prisma.itemUom.update({
      where: { id: uomId },
      data: {
        isBase: body.isBase ?? undefined,
        conversionRate: body.conversionRate ?? undefined,
        price: body.price ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'ItemUom',
      entityId: uomId,
    });

    return { uom: updated };
  }

  @Delete('items/:itemId/uoms/:uomId')
  @RequirePermissions('inventory.item.update')
  async deleteItemUom(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('itemId') itemId: string,
    @Param('uomId') uomId: string,
  ) {
    const uom = await this.prisma.itemUom.findFirst({
      where: { id: uomId, itemId, tenantId: req.user.tenantId! },
    });
    if (!uom) throw new NotFoundException('ItemUom not found');

    await this.prisma.itemUom.delete({ where: { id: uomId } });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'delete',
      entity: 'ItemUom',
      entityId: uomId,
    });

    return { success: true };
  }

  // ========== ItemBarcode CRUD ==========

  @Get('items/:itemId/barcodes')
  @RequirePermissions('inventory.item.read')
  async listItemBarcodes(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('itemId') itemId: string,
  ) {
    const item = await this.prisma.item.findFirst({
      where: { id: itemId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!item) throw new NotFoundException('Item not found');

    const barcodes = await this.prisma.itemBarcode.findMany({
      where: { itemId, tenantId: req.user.tenantId! },
      orderBy: { createdAt: 'desc' },
    });
    return { barcodes };
  }

  @Post('items/:itemId/barcodes')
  @RequirePermissions('inventory.item.update')
  async createItemBarcode(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('itemId') itemId: string,
    @Body() body: CreateItemBarcodeDto,
  ) {
    const item = await this.prisma.item.findFirst({
      where: { id: itemId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!item) throw new NotFoundException('Item not found');

    const existing = await this.prisma.itemBarcode.findFirst({
      where: { tenantId: req.user.tenantId!, barcode: body.barcode },
    });
    if (existing) throw new NotFoundException('Barcode already exists for this tenant');

    const barcode = await this.prisma.itemBarcode.create({
      data: {
        tenantId: req.user.tenantId!,
        itemId,
        barcode: body.barcode,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'ItemBarcode',
      entityId: barcode.id,
    });

    return { barcode };
  }

  @Delete('items/:itemId/barcodes/:barcodeId')
  @RequirePermissions('inventory.item.update')
  async deleteItemBarcode(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('itemId') itemId: string,
    @Param('barcodeId') barcodeId: string,
  ) {
    const barcode = await this.prisma.itemBarcode.findFirst({
      where: { id: barcodeId, itemId, tenantId: req.user.tenantId! },
    });
    if (!barcode) throw new NotFoundException('ItemBarcode not found');

    await this.prisma.itemBarcode.delete({ where: { id: barcodeId } });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'delete',
      entity: 'ItemBarcode',
      entityId: barcodeId,
    });

    return { success: true };
  }
}
