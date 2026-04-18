import { Body, Controller, Get, NotFoundException, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NcrService } from '../../qms/ncr/ncr.service';
import { UpdateQcDto } from './dto/update-qc.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/qc')
export class QcController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly ncrService: NcrService,
  ) {}

  @Get()
  @RequirePermissions('inventory.qc.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const inspections = await this.prisma.qcInspection.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(status && ['DRAFT', 'SUBMITTED', 'POSTED', 'VOID'].includes(status)
          ? { status: status as any }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { grn: { include: { supplier: true, warehouse: true } } },
      take: 200,
    });
    return { inspections };
  }

  @Get(':id')
  @RequirePermissions('inventory.qc.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const inspection = await this.prisma.qcInspection.findUnique({
      where: { id, tenantId: req.user.tenantId! },
      include: { grn: { include: { supplier: true, warehouse: true } }, items: true },
    });
    if (!inspection) throw new NotFoundException('QC inspection not found');
    return { inspection };
  }

  @Patch(':id')
  @RequirePermissions('inventory.qc.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateQcDto,
  ) {
    const exists = await this.prisma.qcInspection.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('QC inspection not found');

    const inspection = await this.prisma.qcInspection.update({
      where: { id },
      data: { status: (body.status as any) ?? undefined, notes: body.notes ?? undefined },
    });

    if (body.status === 'POSTED') {
      await this.ncrService.generateFromQc(req.user.tenantId!, req.user.id, id);
    }

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'QcInspection',
      entityId: inspection.id,
    });

    return { inspection };
  }
}
