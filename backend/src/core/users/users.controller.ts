import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignRoleDto } from './dto/assign-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/users')
export class UsersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.user.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const users = await this.prisma.user.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ createdAt: 'desc' }],
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true,
        roles: { include: { role: true } },
      },
    });
    return { users };
  }

  @Post()
  @RequirePermissions('core.user.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateUserDto,
  ) {
    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await this.prisma.user.create({
      data: {
        tenantId: req.user.tenantId,
        email: body.email,
        name: body.name,
        passwordHash,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'User',
      entityId: user.id,
    });

    return { user };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('core.user.deactivate')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'User',
      entityId: user.id,
    });

    return { user };
  }

  @Put(':id')
  @RequirePermissions('core.user.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string },
  ) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { name: body.name, email: body.email },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'User',
      entityId: user.id,
    });

    return { user };
  }

  @Post(':id/roles')
  @RequirePermissions('core.user.assign_role')
  async assignRole(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') userId: string,
    @Body() body: AssignRoleDto,
  ) {
    const userRole = await this.prisma.userRole.upsert({
      where: { userId_roleId: { userId, roleId: body.roleId } },
      update: {},
      create: { userId, roleId: body.roleId },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'assign_role',
      entity: 'UserRole',
      entityId: `${userRole.userId}:${userRole.roleId}`,
    });

    return { userRole };
  }

  @Delete(':id/roles/:roleId')
  @RequirePermissions('core.user.assign_role')
  async removeRole(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') userId: string,
    @Param('roleId') roleId: string,
  ) {
    await this.prisma.userRole.delete({
      where: { userId_roleId: { userId, roleId } },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'remove_role',
      entity: 'UserRole',
      entityId: `${userId}:${roleId}`,
    });

    return { ok: true };
  }
}
