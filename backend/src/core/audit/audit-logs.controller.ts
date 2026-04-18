import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/audit-logs')
export class AuditLogsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('core.audit.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('take') take?: string,
  ) {
    const n = Math.min(Math.max(Number(take ?? 200), 1), 500);
    const auditLogs = await this.prisma.auditLog.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: [{ createdAt: 'desc' }],
      take: n,
    });
    return { auditLogs };
  }
}
