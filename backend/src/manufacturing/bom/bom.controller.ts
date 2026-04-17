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
import { CreateBomDto, UpdateBomDto } from './dto/bom.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('manufacturing/bom')
export class BomController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('manufacturing.bom.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('isActive') isActive?: string,
  ) {
    const boms = await this.prisma.billOfMaterials.findMany({
      where: {
        tenantId: req.user.tenantId,
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
      include: { item: true, items: { include: { componentItem: true }, orderBy: { lineNo: 'asc' } }, operations: { orderBy: { operationNo: 'asc' } } },
      take: 200,
    });
    return { boms };
  }

  @Get(':id')
  @RequirePermissions('manufacturing.bom.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const bom = await this.prisma.billOfMaterials.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { item: true, items: { include: { componentItem: true }, orderBy: { lineNo: 'asc' } }, operations: { orderBy: { operationNo: 'asc' } } },
    });
    if (!bom) throw new NotFoundException('BOM not found');
    return { bom };
  }

  @Post()
  @RequirePermissions('manufacturing.bom.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateBomDto) {
    const item = await this.prisma.item.findFirst({
      where: { id: body.itemId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!item) throw new NotFoundException('Item not found');

    const bom = await this.prisma.$transaction(async (tx) => {
      const created = await tx.billOfMaterials.create({
        data: {
          tenantId: req.user.tenantId,
          code: body.code,
          name: body.name,
          itemId: body.itemId,
          bomType: body.bomType ?? 'MANUFACTURING',
          baseQty: body.baseQty ?? 1,
          costingMethod: body.costingMethod ?? 'STANDARD',
          version: body.version ?? 1,
          isActive: body.isActive ?? true,
          isMain: body.isMain ?? false,
          notes: body.notes,
        },
      });

      if (body.items && body.items.length > 0) {
        await tx.billOfMaterialsItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId,
            bomId: created.id,
            lineNo: idx + 1,
            componentItemId: it.componentItemId,
            qty: it.qty,
            uomCode: it.uomCode,
            issueMethod: it.issueMethod ?? 'BACKFLUSH',
            operationNo: it.operationNo,
            scrapPercent: it.scrapPercent,
            notes: it.notes,
          })),
        });
      }

      if (body.operations && body.operations.length > 0) {
        await tx.bomOperation.createMany({
          data: body.operations.map((op) => ({
            tenantId: req.user.tenantId,
            bomId: created.id,
            operationNo: op.operationNo,
            description: op.description,
            workstation: op.workstation,
            setupTime: op.setupTime,
            cycleTime: op.cycleTime,
            laborScrap: op.laborScrap,
            notes: op.notes,
          })),
        });
      }

      return created;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'BillOfMaterials',
      entityId: bom.id,
    });

    return { bom };
  }

  @Patch(':id')
  @RequirePermissions('manufacturing.bom.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateBomDto,
  ) {
    const existing = await this.prisma.billOfMaterials.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('BOM not found');

    const bom = await this.prisma.billOfMaterials.update({
      where: { id },
      data: {
        name: body.name ?? undefined,
        isActive: body.isActive ?? undefined,
        isMain: body.isMain ?? undefined,
        notes: body.notes ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'BillOfMaterials',
      entityId: bom.id,
    });

    return { bom };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('manufacturing.bom.deactivate')
  async deactivate(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const existing = await this.prisma.billOfMaterials.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('BOM not found');

    const bom = await this.prisma.billOfMaterials.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'BillOfMaterials',
      entityId: bom.id,
    });

    return { bom };
  }
}