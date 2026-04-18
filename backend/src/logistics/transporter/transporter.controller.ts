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

export class CreateTransporterDto {
  code?: string;
  name!: string;
  supplierId?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

export class UpdateTransporterDto {
  name?: string;
  supplierId?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
  isActive?: boolean;
  notes?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics/transporters')
export class TransporterController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('logistics.fleet.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const transporters = await this.prisma.transporter.findMany({
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
      orderBy: [{ createdAt: 'desc' }],
      include: { _count: { select: { vehicles: true, drivers: true } } },
      take: 200,
    });
    return { transporters };
  }

  @Get(':id')
  @RequirePermissions('logistics.fleet.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const transporter = await this.prisma.transporter.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { vehicles: true, drivers: true },
    });
    if (!transporter) throw new NotFoundException('Transporter not found');
    return { transporter };
  }

  @Post()
  @RequirePermissions('logistics.fleet.manage')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateTransporterDto,
  ) {
    const count = await this.prisma.transporter.count({ where: { tenantId: req.user.tenantId! } });
    const code = `TRN-${String(count + 1).padStart(6, '0')}`;

    const transporter = await this.prisma.transporter.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code || code,
        name: body.name,
        supplierId: body.supplierId,
        contactName: body.contactName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        notes: body.notes,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'Transporter',
      entityId: transporter.id,
      metadata: { code: transporter.code, name: transporter.name },
    });

    return { transporter };
  }

  @Patch(':id')
  @RequirePermissions('logistics.fleet.manage')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateTransporterDto,
  ) {
    const exists = await this.prisma.transporter.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Transporter not found');

    const transporter = await this.prisma.transporter.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.supplierId !== undefined && { supplierId: body.supplierId }),
        ...(body.contactName !== undefined && { contactName: body.contactName }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.address !== undefined && { address: body.address }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
        ...(body.notes !== undefined && { notes: body.notes }),
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'UPDATE',
      entity: 'Transporter',
      entityId: transporter.id,
      metadata: { code: transporter.code, name: transporter.name },
    });

    return { transporter };
  }
}
