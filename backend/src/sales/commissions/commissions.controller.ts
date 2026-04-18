import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommissionEntryDto } from './dto/create-commission-entry.dto';
import { CreateCommissionSchemeDto } from './dto/create-commission-scheme.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('sales/commissions')
export class CommissionsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('schemes')
  @RequirePermissions('sales.commission.read')
  async listSchemes(@Req() req: FastifyRequest & { user: AuthUser }) {
    const schemes = await this.prisma.commissionScheme.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: [{ createdAt: 'desc' }],
      take: 200,
    });
    return { schemes };
  }

  @Post('schemes')
  @RequirePermissions('sales.commission.create')
  async createScheme(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateCommissionSchemeDto,
  ) {
    const scheme = await this.prisma.commissionScheme.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
        rate: body.rate,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'CommissionScheme',
      entityId: scheme.id,
    });

    return { scheme };
  }

  @Get('entries')
  @RequirePermissions('sales.commission.read')
  async listEntries(@Req() req: FastifyRequest & { user: AuthUser }) {
    const entries = await this.prisma.commissionEntry.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: [{ createdAt: 'desc' }],
      include: { scheme: true, invoice: true, salesUser: true },
      take: 200,
    });
    return { entries };
  }

  @Post('entries')
  @RequirePermissions('sales.commission.create')
  async createEntry(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateCommissionEntryDto,
  ) {
    const scheme = await this.prisma.commissionScheme.findFirst({
      where: { id: body.schemeId, tenantId: req.user.tenantId!, isActive: true },
      select: { id: true },
    });
    if (!scheme) throw new NotFoundException('Scheme not found');

    if (body.invoiceId) {
      const invoice = await this.prisma.salesInvoice.findFirst({
        where: { id: body.invoiceId, tenantId: req.user.tenantId! },
        select: { id: true },
      });
      if (!invoice) throw new NotFoundException('Invoice not found');
    }

    if (body.salesUserId) {
      const user = await this.prisma.user.findFirst({
        where: {
          id: body.salesUserId,
          tenantId: req.user.tenantId!,
          isActive: true,
        },
        select: { id: true },
      });
      if (!user) throw new NotFoundException('User not found');
    }

    const entry = await this.prisma.commissionEntry.create({
      data: {
        tenantId: req.user.tenantId!,
        schemeId: body.schemeId,
        invoiceId: body.invoiceId,
        salesUserId: body.salesUserId,
        baseAmount: body.baseAmount,
        amount: body.amount,
      },
      include: { scheme: true, invoice: true, salesUser: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'CommissionEntry',
      entityId: entry.id,
    });

    return { entry };
  }
}
