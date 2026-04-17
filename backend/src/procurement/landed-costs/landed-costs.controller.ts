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
import { CreateLandedCostDto } from './dto/create-landed-cost.dto';
import { UpdateLandedCostDto } from './dto/update-landed-cost.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('procurement/landed-costs')
export class LandedCostsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('procurement.landed_cost.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const landedCosts = await this.prisma.landedCostVoucher.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { supplier: true, order: true, invoice: true },
      take: 200,
    });
    return { landedCosts };
  }

  @Get(':id')
  @RequirePermissions('procurement.landed_cost.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const landedCost = await this.prisma.landedCostVoucher.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        supplier: true,
        order: true,
        invoice: true,
        allocations: { orderBy: [{ lineNo: 'asc' }] },
      },
    });
    if (!landedCost)
      throw new NotFoundException('Landed cost voucher not found');
    return { landedCost };
  }

  @Post()
  @RequirePermissions('procurement.landed_cost.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateLandedCostDto,
  ) {
    if (body.supplierId) {
      const supplier = await this.prisma.supplier.findFirst({
        where: { id: body.supplierId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!supplier) throw new NotFoundException('Supplier not found');
    }
    if (body.orderId) {
      const po = await this.prisma.purchaseOrder.findFirst({
        where: { id: body.orderId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!po) throw new NotFoundException('Purchase order not found');
    }
    if (body.invoiceId) {
      const inv = await this.prisma.purchaseInvoice.findFirst({
        where: { id: body.invoiceId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!inv) throw new NotFoundException('Purchase invoice not found');
    }

    const landedCost = await this.prisma.$transaction(async (tx) => {
      const lc = await tx.landedCostVoucher.create({
        data: {
          tenantId: req.user.tenantId,
          code: body.code,
          supplierId: body.supplierId,
          orderId: body.orderId,
          invoiceId: body.invoiceId,
          costDate: new Date(body.costDate),
          totalAmount: body.totalAmount,
          notes: body.notes,
        },
      });

      if (body.allocations && body.allocations.length > 0) {
        await tx.landedCostAllocation.createMany({
          data: body.allocations.map((a, idx) => ({
            tenantId: req.user.tenantId,
            landedCostId: lc.id,
            lineNo: idx + 1,
            costComponent: a.costComponent,
            amount: a.amount,
          })),
        });
      }

      return lc;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'LandedCostVoucher',
      entityId: landedCost.id,
    });

    return { landedCost };
  }

  @Patch(':id')
  @RequirePermissions('procurement.landed_cost.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateLandedCostDto,
  ) {
    const exists = await this.prisma.landedCostVoucher.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Landed cost voucher not found');

    if (body.supplierId) {
      const supplier = await this.prisma.supplier.findFirst({
        where: { id: body.supplierId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!supplier) throw new NotFoundException('Supplier not found');
    }
    if (body.orderId) {
      const po = await this.prisma.purchaseOrder.findFirst({
        where: { id: body.orderId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!po) throw new NotFoundException('Purchase order not found');
    }
    if (body.invoiceId) {
      const inv = await this.prisma.purchaseInvoice.findFirst({
        where: { id: body.invoiceId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!inv) throw new NotFoundException('Purchase invoice not found');
    }

    const landedCost = await this.prisma.$transaction(async (tx) => {
      const lc = await tx.landedCostVoucher.update({
        where: { id },
        data: {
          supplierId: body.supplierId ?? undefined,
          orderId: body.orderId ?? undefined,
          invoiceId: body.invoiceId ?? undefined,
          costDate: body.costDate ? new Date(body.costDate) : undefined,
          totalAmount: body.totalAmount ?? undefined,
          notes: body.notes ?? undefined,
        },
      });

      if (body.allocations) {
        await tx.landedCostAllocation.deleteMany({
          where: { tenantId: req.user.tenantId, landedCostId: id },
        });
        if (body.allocations.length > 0) {
          await tx.landedCostAllocation.createMany({
            data: body.allocations.map((a, idx) => ({
              tenantId: req.user.tenantId,
              landedCostId: id,
              lineNo: idx + 1,
              costComponent: a.costComponent,
              amount: a.amount,
            })),
          });
        }
      }

      return lc;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'LandedCostVoucher',
      entityId: landedCost.id,
    });

    return { landedCost };
  }
}
