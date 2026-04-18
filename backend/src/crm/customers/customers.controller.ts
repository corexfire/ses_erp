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
import { computeTicketSlaDueAt, isTicketOverdue } from '../shared/crm-sla';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('crm/customers')
export class CustomersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('crm.customer.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const customers = await this.prisma.customer.findMany({
      where: {
        tenantId: req.user.tenantId!,
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
    return { customers };
  }

  @Get(':id')
  @RequirePermissions('crm.customer.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: {
        opportunities: {
          include: { lead: true, owner: true },
          orderBy: [{ createdAt: 'desc' }],
        },
        activities: {
          include: { lead: true, opportunity: true, assignedTo: true },
          orderBy: [{ createdAt: 'desc' }],
        },
        tickets: {
          include: { assignedTo: true },
          orderBy: [{ createdAt: 'desc' }],
        },
      },
    });
    if (!customer) throw new NotFoundException('Customer not found');
    const now = new Date();
    return {
      customer: {
        ...customer,
        tickets: customer.tickets.map((t) => {
          const slaDueAt = computeTicketSlaDueAt(t.createdAt, t.priority);
          return {
            ...t,
            slaDueAt,
            isOverdue: isTicketOverdue({
              now,
              status: t.status,
              slaDueAt,
            }),
          };
        }),
      },
    };
  }

  @Post()
  @RequirePermissions('crm.customer.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateCustomerDto,
  ) {
    const customer = await this.prisma.customer.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
        email: body.email,
        phone: body.phone,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        countryCode: 'ID',
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Customer',
      entityId: customer.id,
    });

    return { customer };
  }

  @Patch(':id')
  @RequirePermissions('crm.customer.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateCustomerDto,
  ) {
    const exists = await this.prisma.customer.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Customer not found');

    const customer = await this.prisma.customer.update({
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
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'Customer',
      entityId: customer.id,
    });

    return { customer };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('crm.customer.deactivate')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const exists = await this.prisma.customer.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Customer not found');

    const customer = await this.prisma.customer.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'Customer',
      entityId: customer.id,
    });

    return { customer };
  }
}
