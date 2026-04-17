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
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('procurement/suppliers')
export class SuppliersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('procurement.supplier.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const suppliers = await this.prisma.supplier.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
                { email: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
      take: 200,
    });
    return { suppliers };
  }

  @Get(':id')
  @RequirePermissions('procurement.supplier.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const supplier = await this.prisma.supplier.findFirst({
      where: { id, tenantId: req.user.tenantId },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return { supplier };
  }

  @Post()
  @RequirePermissions('procurement.supplier.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateSupplierDto,
  ) {
    const supplier = await this.prisma.supplier.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        email: body.email,
        phone: body.phone,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        countryCode: body.countryCode,
        npwp: body.npwp,
        vendorGroup: body.vendorGroup,
        bankName: body.bankName,
        bankAccount: body.bankAccount,
        paymentTerms: body.paymentTerms,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Supplier',
      entityId: supplier.id,
    });

    return { supplier };
  }

  @Patch(':id')
  @RequirePermissions('procurement.supplier.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateSupplierDto,
  ) {
    const exists = await this.prisma.supplier.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Supplier not found');

    const supplier = await this.prisma.supplier.update({
      where: { id },
      data: {
        name: body.name ?? undefined,
        email: body.email ?? undefined,
        phone: body.phone ?? undefined,
        address1: body.address1 ?? undefined,
        address2: body.address2 ?? undefined,
        city: body.city ?? undefined,
        province: body.province ?? undefined,
        postalCode: body.postalCode ?? undefined,
        countryCode: body.countryCode ?? undefined,
        npwp: body.npwp ?? undefined,
        vendorGroup: body.vendorGroup ?? undefined,
        bankName: body.bankName ?? undefined,
        bankAccount: body.bankAccount ?? undefined,
        paymentTerms: body.paymentTerms ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'Supplier',
      entityId: supplier.id,
    });

    return { supplier };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('procurement.supplier.deactivate')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const exists = await this.prisma.supplier.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Supplier not found');

    const supplier = await this.prisma.supplier.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'Supplier',
      entityId: supplier.id,
    });

    return { supplier };
  }
}
