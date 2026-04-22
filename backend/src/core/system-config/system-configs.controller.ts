import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { UpsertSystemConfigDto } from './dto/upsert-system-config.dto';
import { AuditService } from '../../audit/audit.service';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/system-configs')
export class SystemConfigsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.systemConfig.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const configs = await this.prisma.systemConfig.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    });
    return { configs };
  }

  @Get(':key')
  @RequirePermissions('core.systemConfig.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('key') key: string,
  ) {
    const config = await this.prisma.systemConfig.findUnique({
      where: {
        tenantId_key: {
          tenantId: req.user.tenantId!,
          key,
        },
      },
    });
    return { config };
  }

  @Put()
  @RequirePermissions('core.systemConfig.update')
  async upsert(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: UpsertSystemConfigDto,
  ) {
    const config = await this.prisma.systemConfig.upsert({
      where: {
        tenantId_key: {
          tenantId: req.user.tenantId!,
          key: body.key,
        },
      },
      update: {
        group: body.group,
        value: body.value,
        description: body.description,
        status: body.status ?? 'ACTIVE',
      },
      create: {
        tenantId: req.user.tenantId!,
        key: body.key,
        group: body.group,
        value: body.value,
        description: body.description,
        status: body.status ?? 'ACTIVE',
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'upsert',
      entity: 'SystemConfig',
      entityId: config.id,
    });

    return { config };
  }

  @Delete(':key')
  @RequirePermissions('core.systemConfig.delete')
  async remove(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('key') key: string,
  ) {
    const config = await this.prisma.systemConfig.delete({
      where: {
        tenantId_key: {
          tenantId: req.user.tenantId!,
          key,
        },
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'delete',
      entity: 'SystemConfig',
      entityId: config.id,
    });

    return { success: true };
  }
}
