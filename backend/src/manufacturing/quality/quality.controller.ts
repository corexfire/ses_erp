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
import { CreateInProcessQcDto, UpdateInProcessQcDto } from './dto/quality.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('manufacturing/quality')
export class QualityController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('manufacturing.quality.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('status') status?: string,
  ) {
    const inspections = await this.prisma.inProcessQc.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(status ? { status } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { workOrder: { include: { finishedGood: true } } },
      take: 200,
    });
    return { inspections };
  }

  @Get(':id')
  @RequirePermissions('manufacturing.quality.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const inspection = await this.prisma.inProcessQc.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { workOrder: { include: { finishedGood: true } } },
    });
    if (!inspection) throw new NotFoundException('Quality inspection not found');
    return { inspection };
  }

  @Post()
  @RequirePermissions('manufacturing.quality.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateInProcessQcDto) {
    const wo = await this.prisma.workOrder.findFirst({
      where: { id: body.workOrderId, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!wo) throw new NotFoundException('Work Order not found');

    const inspection = await this.prisma.inProcessQc.create({
      data: {
        tenantId: req.user.tenantId!,
        workOrderId: body.workOrderId,
        qtyInspected: body.qtyInspected,
        qtyPassed: body.qtyPassed,
        qtyFailed: body.qtyFailed,
        notes: body.notes,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'InProcessQc',
      entityId: inspection.id,
    });

    return { inspection };
  }

  @Patch(':id')
  @RequirePermissions('manufacturing.quality.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateInProcessQcDto,
  ) {
    const existing = await this.prisma.inProcessQc.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('Quality inspection not found');

    const inspection = await this.prisma.inProcessQc.update({
      where: { id },
      data: {
        status: body.status ?? undefined,
        qtyInspected: body.qtyInspected ?? undefined,
        qtyPassed: body.qtyPassed ?? undefined,
        qtyFailed: body.qtyFailed ?? undefined,
        notes: body.notes ?? undefined,
        inspectedAt: body.status ? new Date() : undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'InProcessQc',
      entityId: id,
    });

    return { inspection };
  }
}