import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUomDto } from './dto/create-uom.dto';
import { CreateUomConversionDto } from './dto/create-uom-conversion.dto';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/uoms')
export class UomsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.uom.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const uoms = await this.prisma.uom.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ isActive: 'desc' }, { code: 'asc' }],
    });
    return { uoms };
  }

  @Get('conversions')
  @RequirePermissions('core.uom_conversion.read')
  async listConversions(@Req() req: FastifyRequest & { user: AuthUser }) {
    const conversions = await this.prisma.uomConversion.findMany({
      where: { tenantId: req.user.tenantId },
      include: { fromUom: true, toUom: true },
      orderBy: [{ createdAt: 'desc' }],
      take: 500,
    });
    return { conversions };
  }

  @Post('conversions')
  @RequirePermissions('core.uom_conversion.create')
  async createConversion(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateUomConversionDto,
  ) {
    const conversion = await this.prisma.uomConversion.create({
      data: {
        tenantId: req.user.tenantId,
        fromUomId: body.fromUomId,
        toUomId: body.toUomId,
        factor: body.factor,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'UomConversion',
      entityId: conversion.id,
    });

    return { conversion };
  }

  @Patch('conversions/:id/delete')
  @RequirePermissions('core.uom_conversion.delete')
  async deleteConversion(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const conversion = await this.prisma.uomConversion.delete({
      where: { id },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'delete',
      entity: 'UomConversion',
      entityId: conversion.id,
    });

    return { ok: true };
  }

  @Post()
  @RequirePermissions('core.uom.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateUomDto,
  ) {
    const uom = await this.prisma.uom.create({
      data: { tenantId: req.user.tenantId, code: body.code, name: body.name },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Uom',
      entityId: uom.id,
    });

    return { uom };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('core.uom.deactivate')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const uom = await this.prisma.uom.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'Uom',
      entityId: uom.id,
    });

    return { uom };
  }
}
