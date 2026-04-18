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
import { CreateTaxCodeDto } from './dto/create-tax-code.dto';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/tax-codes')
export class TaxController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.tax.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const taxCodes = await this.prisma.taxCode.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: [{ isActive: 'desc' }, { code: 'asc' }],
    });
    return { taxCodes };
  }

  @Post()
  @RequirePermissions('core.tax.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateTaxCodeDto,
  ) {
    const taxCode = await this.prisma.taxCode.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
        rate: body.rate,
        effectiveDate: body.effectiveDate,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'TaxCode',
      entityId: taxCode.id,
    });

    return { taxCode };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('core.tax.deactivate')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const taxCode = await this.prisma.taxCode.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'TaxCode',
      entityId: taxCode.id,
    });

    return { taxCode };
  }
}
