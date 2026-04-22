import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { UpsertPrintFormatDto } from './dto/upsert-print-format.dto';
import { AuditService } from '../../audit/audit.service';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/print-formats')
export class PrintFormatsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.printFormat.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const formats = await this.prisma.printFormat.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: [{ module: 'asc' }, { name: 'asc' }],
    });
    return { formats };
  }

  @Get(':id')
  @RequirePermissions('core.printFormat.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const format = await this.prisma.printFormat.findUnique({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { format };
  }

  @Put()
  @RequirePermissions('core.printFormat.update')
  async upsert(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: UpsertPrintFormatDto,
  ) {
    // If isDefault is true, unset other defaults for the same docType
    if (body.isDefault) {
      await this.prisma.printFormat.updateMany({
        where: {
          tenantId: req.user.tenantId!,
          docType: body.docType,
          isDefault: true,
        },
        data: { isDefault: false },
      });
    }

    const format = await this.prisma.printFormat.upsert({
      where: {
        tenantId_name: {
          tenantId: req.user.tenantId!,
          name: body.name,
        },
      },
      update: {
        ...body,
      },
      create: {
        tenantId: req.user.tenantId!,
        ...body,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'upsert',
      entity: 'PrintFormat',
      entityId: format.id,
    });

    return { format };
  }

  @Delete(':id')
  @RequirePermissions('core.printFormat.delete')
  async remove(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const format = await this.prisma.printFormat.delete({
      where: { id, tenantId: req.user.tenantId! },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'delete',
      entity: 'PrintFormat',
      entityId: format.id,
    });

    return { success: true };
  }
}
