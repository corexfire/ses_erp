import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
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
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('sales/shipping/carriers')
export class CarriersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('sales.shipping.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const carriers = await this.prisma.carrier.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
      take: 200,
    });
    return { carriers };
  }

  @Post()
  @RequirePermissions('sales.shipping.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateCarrierDto,
  ) {
    const carrier = await this.prisma.carrier.create({
      data: { tenantId: req.user.tenantId, code: body.code, name: body.name },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Carrier',
      entityId: carrier.id,
    });

    return { carrier };
  }

  @Patch(':id')
  @RequirePermissions('sales.shipping.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateCarrierDto,
  ) {
    const exists = await this.prisma.carrier.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Carrier not found');

    const carrier = await this.prisma.carrier.update({
      where: { id },
      data: { name: body.name ?? undefined },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'Carrier',
      entityId: carrier.id,
    });

    return { carrier };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('sales.shipping.update')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const exists = await this.prisma.carrier.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Carrier not found');

    const carrier = await this.prisma.carrier.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'Carrier',
      entityId: carrier.id,
    });

    return { carrier };
  }
}
