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
import { CreatePurchaseReturnDto } from './dto/create-purchase-return.dto';
import { UpdatePurchaseReturnDto } from './dto/update-purchase-return.dto';

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
@Controller('procurement/returns')
export class PurchaseReturnsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  private async validateTaxCodes(input: {
    tenantId: string;
    taxCodeIds: string[];
  }) {
    const ids = input.taxCodeIds.map((x) => x.trim()).filter(Boolean);
    if (ids.length === 0) return;
    const uniqueCount = new Set(ids).size;
    const count = await this.prisma.taxCode.count({
      where: { tenantId: input.tenantId, id: { in: ids } },
    });
    if (count !== uniqueCount)
      throw new NotFoundException('Tax code not found');
  }

  @Get()
  @RequirePermissions('procurement.return.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('status') status?: string,
  ) {
    const purchaseReturns = await this.prisma.purchaseReturn.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(isProcurementDocStatus(status) ? { status } : {}),
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { supplier: true, order: true, invoice: true },
      take: 200,
    });
    return { purchaseReturns };
  }

  @Get(':id')
  @RequirePermissions('procurement.return.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const purchaseReturn = await this.prisma.purchaseReturn.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        supplier: true,
        order: true,
        invoice: true,
        items: { orderBy: [{ lineNo: 'asc' }], include: { taxCode: true } },
      },
    });
    if (!purchaseReturn)
      throw new NotFoundException('Purchase return not found');
    return { purchaseReturn };
  }

  @Post()
  @RequirePermissions('procurement.return.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreatePurchaseReturnDto,
  ) {
    const supplier = await this.prisma.supplier.findFirst({
      where: { id: body.supplierId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');

    if (body.orderId) {
      const po = await this.prisma.purchaseOrder.findFirst({
        where: { id: body.orderId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!po) throw new NotFoundException('Purchase order not found');
    }
    if (body.invoiceId) {
      const inv = await this.prisma.purchaseInvoice.findFirst({
        where: { id: body.invoiceId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!inv) throw new NotFoundException('Purchase invoice not found');
    }

    await this.validateTaxCodes({
      tenantId: req.user.tenantId!,
      taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
    });

    const purchaseReturn = await this.prisma.$transaction(async (tx) => {
      const pr = await tx.purchaseReturn.create({
        data: {
          tenantId: req.user.tenantId!,
          code: body.code,
          supplierId: body.supplierId,
          orderId: body.orderId,
          invoiceId: body.invoiceId,
          returnDate: new Date(body.returnDate),
          notes: body.notes,
        },
      });
      if (body.items.length > 0) {
        await tx.purchaseReturnItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId!,
            returnId: pr.id,
            lineNo: idx + 1,
            description: it.description,
            qty: it.qty,
            uomCode: it.uomCode,
            unitPrice: it.unitPrice,
            taxCodeId: it.taxCodeId,
          })),
        });
      }
      return pr;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'PurchaseReturn',
      entityId: purchaseReturn.id,
    });

    return { purchaseReturn };
  }

  @Patch(':id')
  @RequirePermissions('procurement.return.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdatePurchaseReturnDto,
  ) {
    const exists = await this.prisma.purchaseReturn.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Purchase return not found');

    if (body.items) {
      await this.validateTaxCodes({
        tenantId: req.user.tenantId!,
        taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
      });
    }

    const purchaseReturn = await this.prisma.$transaction(async (tx) => {
      const pr = await tx.purchaseReturn.update({
        where: { id },
        data: {
          returnDate: body.returnDate ? new Date(body.returnDate) : undefined,
          notes: body.notes ?? undefined,
        },
      });
      if (body.items) {
        await tx.purchaseReturnItem.deleteMany({
          where: { tenantId: req.user.tenantId!, returnId: id },
        });
        if (body.items.length > 0) {
          await tx.purchaseReturnItem.createMany({
            data: body.items.map((it, idx) => ({
              tenantId: req.user.tenantId!,
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
      return pr;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'PurchaseReturn',
      entityId: purchaseReturn.id,
    });

    return { purchaseReturn };
  }
}
