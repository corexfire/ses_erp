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
import { CreateProfitCenterDto } from './dto/create-profit-center.dto';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/profit-centers')
export class ProfitCentersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.profit_center.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const profitCenters = await this.prisma.profitCenter.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: [{ isActive: 'desc' }, { code: 'asc' }],
    });
    return { profitCenters };
  }

  @Post()
  @RequirePermissions('core.profit_center.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateProfitCenterDto,
  ) {
    const profitCenter = await this.prisma.profitCenter.create({
      data: { tenantId: req.user.tenantId!, code: body.code, name: body.name },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'ProfitCenter',
      entityId: profitCenter.id,
    });

    return { profitCenter };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('core.profit_center.deactivate')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const profitCenter = await this.prisma.profitCenter.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'ProfitCenter',
      entityId: profitCenter.id,
    });

    return { profitCenter };
  }
}
