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
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/cost-centers')
export class CostCentersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.cost_center.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const costCenters = await this.prisma.costCenter.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ isActive: 'desc' }, { code: 'asc' }],
    });
    return { costCenters };
  }

  @Post()
  @RequirePermissions('core.cost_center.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateCostCenterDto,
  ) {
    const costCenter = await this.prisma.costCenter.create({
      data: { tenantId: req.user.tenantId, code: body.code, name: body.name },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'CostCenter',
      entityId: costCenter.id,
    });

    return { costCenter };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('core.cost_center.deactivate')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const costCenter = await this.prisma.costCenter.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'CostCenter',
      entityId: costCenter.id,
    });

    return { costCenter };
  }
}
