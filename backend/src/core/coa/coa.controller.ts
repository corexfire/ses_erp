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
import { CreateCoaAccountDto } from './dto/create-coa-account.dto';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/chart-of-accounts')
export class CoaController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.coa.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const accounts = await this.prisma.coaAccount.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ code: 'asc' }],
    });
    return { accounts };
  }

  @Post()
  @RequirePermissions('core.coa.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateCoaAccountDto,
  ) {
    const account = await this.prisma.coaAccount.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        type: body.type,
        parentId: body.parentId,
        isPosting: body.isPosting ?? true,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'CoaAccount',
      entityId: account.id,
    });

    return { account };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('core.coa.deactivate')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const account = await this.prisma.coaAccount.update({
      where: { id },
      data: { isActive: false, isPosting: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'CoaAccount',
      entityId: account.id,
    });

    return { account };
  }
}
