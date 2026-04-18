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
import { CreateSalesQuotationDto } from './dto/create-sales-quotation.dto';
import { UpdateSalesQuotationDto } from './dto/update-sales-quotation.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('sales/quotations')
export class SalesQuotationsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('sales.quotation.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const quotations = await this.prisma.salesQuotation.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(q
          ? {
              OR: [{ code: { contains: q, mode: 'insensitive' } }],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { customer: true },
      take: 200,
    });
    return { quotations };
  }

  @Get(':id')
  @RequirePermissions('sales.quotation.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const quotation = await this.prisma.salesQuotation.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        customer: true,
        items: { orderBy: [{ lineNo: 'asc' }] },
        orders: true,
      },
    });
    if (!quotation) throw new NotFoundException('Quotation not found');
    return { quotation };
  }

  @Post()
  @RequirePermissions('sales.quotation.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateSalesQuotationDto,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where: { id: body.customerId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    const quotation = await this.prisma.$transaction(async (tx) => {
      const q = await tx.salesQuotation.create({
        data: {
          tenantId: req.user.tenantId!,
          code: body.code,
          customerId: body.customerId,
          issueDate: new Date(body.issueDate),
          expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
          notes: body.notes,
        },
      });

      if (body.items.length > 0) {
        await tx.salesQuotationItem.createMany({
          data: body.items.map((it, idx) => ({
            tenantId: req.user.tenantId!,
            quotationId: q.id,
            lineNo: idx + 1,
            description: it.description,
            qty: it.qty,
            uomCode: it.uomCode,
            unitPrice: it.unitPrice,
            discount: it.discount,
            taxCodeId: it.taxCodeId,
          })),
        });
      }
      return q;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'SalesQuotation',
      entityId: quotation.id,
    });

    return { quotation };
  }

  @Patch(':id')
  @RequirePermissions('sales.quotation.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateSalesQuotationDto,
  ) {
    const exists = await this.prisma.salesQuotation.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Quotation not found');

    const quotation = await this.prisma.$transaction(async (tx) => {
      const q = await tx.salesQuotation.update({
        where: { id },
        data: {
          issueDate: body.issueDate ? new Date(body.issueDate) : undefined,
          expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
          notes: body.notes ?? undefined,
        },
      });

      if (body.items) {
        await tx.salesQuotationItem.deleteMany({
          where: { tenantId: req.user.tenantId!, quotationId: id },
        });
        if (body.items.length > 0) {
          await tx.salesQuotationItem.createMany({
            data: body.items.map((it, idx) => ({
              tenantId: req.user.tenantId!,
              quotationId: id,
              lineNo: idx + 1,
              description: it.description,
              qty: it.qty,
              uomCode: it.uomCode,
              unitPrice: it.unitPrice,
              discount: it.discount,
              taxCodeId: it.taxCodeId,
            })),
          });
        }
      }

      return q;
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'SalesQuotation',
      entityId: quotation.id,
    });

    return { quotation };
  }

  @Post(':id/submit')
  @RequirePermissions('sales.quotation.submit')
  async submit(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const quotation = await this.prisma.salesQuotation.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, status: true },
    });
    if (!quotation) throw new NotFoundException('Quotation not found');

    const updated = await this.prisma.salesQuotation.update({
      where: { id },
      data: { status: 'SUBMITTED' },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'submit',
      entity: 'SalesQuotation',
      entityId: updated.id,
    });

    return { quotation: updated };
  }
}
