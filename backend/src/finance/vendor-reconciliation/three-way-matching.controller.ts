import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/vendor-reconciliation')
export class ThreeWayMatchingController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('finance.reconciliation.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (status) where.status = status;

    const matches = await this.prisma.threeWayMatching.findMany({
      where,
      include: {
        order: {
          select: {
            code: true,
            supplier: { select: { name: true, code: true } },
          },
        },
        invoice: {
          select: {
            code: true,
            grandTotal: true,
          },
        },
        receipt: {
          select: {
            code: true,
          },
        },
      },
      orderBy: { matchDate: 'desc' },
    });

    return { matches };
  }

  @Get(':id')
  @RequirePermissions('finance.reconciliation.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const match = await this.prisma.threeWayMatching.findFirst({
      where: {
        id,
        tenantId: req.user.tenantId!,
      },
      include: {
        order: {
          include: {
            items: true,
            supplier: true,
          },
        },
        receipt: {
          include: {
            items: true,
          },
        },
        invoice: {
          include: {
            items: true,
          },
        },
      },
    });

    return { match };
  }

  @Post('auto-match')
  @RequirePermissions('finance.reconciliation.create')
  async autoMatch(@Req() req: FastifyRequest & { user: AuthUser }) {
    // Placeholder logic for auto-matching pending documents
    // In a real scenario, this would iterate through un-reconciled POs/GRNs/Invoices
    return { 
      message: 'Auto-match trigger executed. Processing un-reconciled documents.',
      processedCount: 0 
    };
  }
}
