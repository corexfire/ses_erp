import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('crm/users')
export class CrmUsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('crm.user.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const users = await this.prisma.user.findMany({
      where: { tenantId: req.user.tenantId!, isActive: true },
      orderBy: [{ createdAt: 'desc' }],
      select: { id: true, email: true, name: true },
      take: 500,
    });
    return { users };
  }
}
