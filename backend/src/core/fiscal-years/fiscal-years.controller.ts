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
import { CreateFiscalYearDto } from './dto/create-fiscal-year.dto';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

const endOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/fiscal-years')
export class FiscalYearsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.fiscal_year.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const fiscalYears = await this.prisma.fiscalYear.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ startDate: 'desc' }],
      include: { periods: true },
    });
    return { fiscalYears };
  }

  @Post()
  @RequirePermissions('core.fiscal_year.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateFiscalYearDto,
  ) {
    const fiscalYear = await this.prisma.fiscalYear.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        startDate: body.startDate,
        endDate: body.endDate,
      },
    });

    const periods: {
      tenantId: string;
      fiscalYearId: string;
      periodNo: number;
      startDate: Date;
      endDate: Date;
    }[] = [];

    let cursor = new Date(body.startDate);
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), 1, 0, 0, 0, 0);
    const end = new Date(body.endDate);
    let periodNo = 1;

    while (cursor <= end) {
      const pStart = new Date(cursor);
      const pEnd = endOfMonth(cursor);
      periods.push({
        tenantId: req.user.tenantId,
        fiscalYearId: fiscalYear.id,
        periodNo,
        startDate: pStart,
        endDate: pEnd > end ? end : pEnd,
      });
      periodNo += 1;
      cursor = new Date(
        cursor.getFullYear(),
        cursor.getMonth() + 1,
        1,
        0,
        0,
        0,
        0,
      );
    }

    if (periods.length > 0) {
      await this.prisma.accountingPeriod.createMany({ data: periods });
    }

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'FiscalYear',
      entityId: fiscalYear.id,
      metadata: { periods: periods.length },
    });

    return { fiscalYear };
  }

  @Patch(':id/close')
  @RequirePermissions('core.fiscal_year.close')
  async close(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const fiscalYear = await this.prisma.fiscalYear.update({
      where: { id },
      data: { isClosed: true, isActive: false },
    });

    await this.prisma.accountingPeriod.updateMany({
      where: { tenantId: req.user.tenantId, fiscalYearId: id },
      data: { isOpen: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'close',
      entity: 'FiscalYear',
      entityId: fiscalYear.id,
    });

    return { fiscalYear };
  }
}
