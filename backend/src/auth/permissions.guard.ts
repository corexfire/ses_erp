import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../prisma/prisma.service';
import { PERMISSIONS_KEY } from './permissions.decorator';
import type { AuthUser } from './auth.types';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required || required.length === 0) return true;

    const req = context
      .switchToHttp()
      .getRequest<FastifyRequest & { user?: AuthUser }>();
    const user = req.user;
    if (!user) return false;
    if (user.isSuperAdmin) return true;

    const rolePermissions = await this.prisma.userRole.findMany({
      where: { userId: user.id },
      select: {
        role: {
          select: {
            permissions: { select: { permission: { select: { key: true } } } },
          },
        },
      },
    });

    const keys = new Set<string>();
    for (const ur of rolePermissions) {
      for (const rp of ur.role.permissions) {
        keys.add(rp.permission.key);
      }
    }

    const ok = required.every((k) => keys.has(k));
    if (!ok) {
      throw new ForbiddenException('Forbidden');
    }
    return true;
  }
}
