import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/tax-codes')
export class TaxCodeController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.taxcode.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const codes = await this.prisma.taxCode.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ code: 'asc' }],
    });
    return { taxCodes: codes };
  }

  @Post()
  @RequirePermissions('finance.taxcode.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { code: string; name: string; rate: number; effectiveDate: string }) {
    const taxCode = await this.prisma.taxCode.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        rate: body.rate,
        effectiveDate: new Date(body.effectiveDate),
        isActive: true,
      },
    });
    return { taxCode };
  }

  @Patch(':id')
  @RequirePermissions('finance.taxcode.update')
  async update(@Param('id') id: string, @Body() body: { name?: string; rate?: number; isActive?: boolean }) {
    const taxCode = await this.prisma.taxCode.update({
      where: { id },
      data: body,
    });
    return { taxCode };
  }

  @Delete(':id')
  @RequirePermissions('finance.taxcode.delete')
  async delete(@Param('id') id: string) {
    await this.prisma.taxCode.delete({ where: { id } });
    return { success: true };
  }
}