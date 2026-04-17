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
import { CreateSalesReturnDto } from './dto/create-sales-return.dto';
import { UpdateSalesReturnDto } from './dto/update-sales-return.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('sales/returns')
export class SalesReturnsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('sales.return.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const returns = await this.prisma.salesReturn.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { customer: true, order: true },
      take: 200,
    });
    return { returns };
  }

  @Get(':id')
  @RequirePermissions('sales.return.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const salesReturn = await this.prisma.salesReturn.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: {
        customer: true,
        order: true,
        items: { orderBy: [{ lineNo: 'asc' }] },
      },
    });
    if (!salesReturn) throw new NotFoundException('Return not found');
    return { salesReturn };
  }

  @Post()
  @RequirePermissions('sales.return.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateSalesReturnDto,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where: { id: body.customerId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    if (body.orderId) {
      const order = await this.prisma.salesOrder.findFirst({
        where: { id: body.orderId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!order) throw new NotFoundException('Sales order not found');
    }

    const salesReturn = await this.prisma.$transaction(async (tx) => {
      const r = await tx.salesReturn.create({
        data: {
          tenantId: req.user.tenantId,
          code: body.code,
          customerId: body.customerId,
          orderId: body.orderId,
          returnDate: new Date(body.returnDate),
          notes: body.notes,
        },
      });
      if (body.items.length > 0) {
        await tx.salesReturnItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId,
            returnId: r.id,
            lineNo: idx + 1,
            description: it.description,
            qty: it.qty,
            uomCode: it.uomCode,
            unitPrice: it.unitPrice,
            taxCodeId: it.taxCodeId,
          })),
        });
      }
      return r;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'SalesReturn',
      entityId: salesReturn.id,
    });

    return { salesReturn };
  }

  @Patch(':id')
  @RequirePermissions('sales.return.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateSalesReturnDto,
  ) {
    const exists = await this.prisma.salesReturn.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Return not found');

    const salesReturn = await this.prisma.$transaction(async (tx) => {
      const r = await tx.salesReturn.update({
        where: { id },
        data: {
          returnDate: body.returnDate ? new Date(body.returnDate) : undefined,
          notes: body.notes ?? undefined,
        },
      });
      if (body.items) {
        await tx.salesReturnItem.deleteMany({
          where: { tenantId: req.user.tenantId, returnId: id },
        });
        if (body.items.length > 0) {
          await tx.salesReturnItem.createMany({
            data: body.items.map((it, idx) => ({
              tenantId: req.user.tenantId,
              returnId: id,
              lineNo: idx + 1,
              description: it.description,
              qty: it.qty,
              uomCode: it.uomCode,
              unitPrice: it.unitPrice,
              taxCodeId: it.taxCodeId,
            })),
          });
        }
      }
      return r;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'SalesReturn',
      entityId: salesReturn.id,
    });

    return { salesReturn };
  }
}
