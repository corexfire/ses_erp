import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { UpdateRolePermissionsDto } from './dto/update-role-permissions.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/roles')
export class RolesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.role.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const roles = await this.prisma.role.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ name: 'asc' }],
      include: {
        permissions: {
          include: { permission: { select: { id: true, key: true } } }
        }
      }
    });
    return { roles };
  }

  @Post()
  @RequirePermissions('core.role.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateRoleDto,
  ) {
    const role = await this.prisma.role.create({
      data: { tenantId: req.user.tenantId, name: body.name },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Role',
      entityId: role.id,
    });

    return { role };
  }

  @Get(':id/permissions')
  @RequirePermissions('core.permission.read')
  async getRolePermissions(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') roleId: string,
  ) {
    const role = await this.prisma.role.findFirst({
      where: { id: roleId, tenantId: req.user.tenantId },
      select: {
        id: true,
        permissions: {
          select: { permission: { select: { id: true, key: true } } },
        },
      },
    });
    return { role };
  }

  @Put(':id/permissions')
  @RequirePermissions('core.role.assign_permission')
  async setRolePermissions(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') roleId: string,
    @Body() body: UpdateRolePermissionsDto,
  ) {
    const role = await this.prisma.role.findFirst({
      where: { id: roleId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!role) return { ok: false };

    await this.prisma.rolePermission.deleteMany({ where: { roleId } });
    if (body.permissionIds.length > 0) {
      await this.prisma.rolePermission.createMany({
        data: body.permissionIds.map((permissionId: string) => ({
          roleId,
          permissionId,
        })),
        skipDuplicates: true,
      });
    }

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'set_permissions',
      entity: 'Role',
      entityId: roleId,
      metadata: { permissionCount: body.permissionIds.length },
    });

    return { ok: true };
  }
}
