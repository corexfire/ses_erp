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
import type { ProcurementDocStatus } from '../../../prisma/generated/client';
import { CreateRfqDto } from './dto/create-rfq.dto';
import { UpdateRfqDto } from './dto/update-rfq.dto';

const procurementStatusSet = new Set<ProcurementDocStatus>([
  'DRAFT',
  'SUBMITTED',
  'PENDING_APPROVAL',
  'APPROVED',
  'REJECTED',
  'CLOSED',
  'VOID',
]);
const isProcurementDocStatus = (
  value?: string,
): value is ProcurementDocStatus =>
  Boolean(value) && procurementStatusSet.has(value as ProcurementDocStatus);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('procurement/rfqs')
export class RfqsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('procurement.rfq.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('status') status?: string,
  ) {
    const rfqs = await this.prisma.rfq.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(isProcurementDocStatus(status) ? { status } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: {
        vendors: { include: { supplier: true } },
        items: { orderBy: [{ lineNo: 'asc' }] },
      },
      take: 200,
    });
    return { rfqs };
  }

  @Get(':id')
  @RequirePermissions('procurement.rfq.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const rfq = await this.prisma.rfq.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        vendors: { include: { supplier: true } },
        items: { orderBy: [{ lineNo: 'asc' }] },
        purchaseOrders: true,
      },
    });
    if (!rfq) throw new NotFoundException('RFQ not found');
    return { rfq };
  }

  @Post()
  @RequirePermissions('procurement.rfq.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateRfqDto,
  ) {
    const supplierIds = (body.supplierIds ?? [])
      .map((x) => x.trim())
      .filter(Boolean);
    if (supplierIds.length > 0) {
      const count = await this.prisma.supplier.count({
        where: { tenantId: req.user.tenantId!, id: { in: supplierIds } },
      });
      if (count !== supplierIds.length)
        throw new NotFoundException('Supplier not found');
    }

    const rfq = await this.prisma.$transaction(async (tx) => {
      const r = await tx.rfq.create({
        data: {
          tenantId: req.user.tenantId!,
          code: body.code,
          issueDate: new Date(body.issueDate),
          notes: body.notes,
        },
      });

      if (supplierIds.length > 0) {
        await tx.rfqVendor.createMany({
          data: supplierIds.map((supplierId) => ({
            tenantId: req.user.tenantId!,
            rfqId: r.id,
            supplierId,
          })),
        });
      }

      if (body.items.length > 0) {
        await tx.rfqItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId!,
            rfqId: r.id,
            lineNo: idx + 1,
            description: it.description,
            qty: it.qty,
            uomCode: it.uomCode,
          })),
        });
      }

      return r;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Rfq',
      entityId: rfq.id,
    });

    return { rfq };
  }

  @Patch(':id')
  @RequirePermissions('procurement.rfq.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateRfqDto,
  ) {
    const exists = await this.prisma.rfq.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('RFQ not found');

    const supplierIds = body.supplierIds
      ? body.supplierIds.map((x) => x.trim()).filter(Boolean)
      : null;
    if (supplierIds && supplierIds.length > 0) {
      const count = await this.prisma.supplier.count({
        where: { tenantId: req.user.tenantId!, id: { in: supplierIds } },
      });
      if (count !== supplierIds.length)
        throw new NotFoundException('Supplier not found');
    }

    const rfq = await this.prisma.$transaction(async (tx) => {
      const r = await tx.rfq.update({
        where: { id },
        data: {
          issueDate: body.issueDate ? new Date(body.issueDate) : undefined,
          notes: body.notes ?? undefined,
        },
      });

      if (supplierIds) {
        await tx.rfqVendor.deleteMany({
          where: { tenantId: req.user.tenantId!, rfqId: id },
        });
        if (supplierIds.length > 0) {
          await tx.rfqVendor.createMany({
            data: supplierIds.map((supplierId) => ({
              tenantId: req.user.tenantId!,
              rfqId: id,
              supplierId,
            })),
          });
        }
      }

      if (body.items) {
        await tx.rfqItem.deleteMany({
          where: { tenantId: req.user.tenantId!, rfqId: id },
        });
        if (body.items.length > 0) {
          await tx.rfqItem.createMany({
            data: body.items.map((it, idx) => ({
              tenantId: req.user.tenantId!,
              rfqId: id,
              lineNo: idx + 1,
              description: it.description,
              qty: it.qty,
              uomCode: it.uomCode,
            })),
          });
        }
      }

      return r;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'Rfq',
      entityId: rfq.id,
    });

    return { rfq };
  }
}
