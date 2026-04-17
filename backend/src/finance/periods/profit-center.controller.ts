import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/profit-centers')
export class ProfitCenterController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.profitcenter.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const centers = await this.prisma.profitCenter.findMany({
      where: { tenantId: req.user.tenantId },
    });
    return { profitCenters: centers };
  }

  @Post()
  @RequirePermissions('finance.profitcenter.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { code: string; name: string }) {
    const center = await this.prisma.profitCenter.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
      },
    });
    return { profitCenter: center };
  }

  @Patch(':id')
  @RequirePermissions('finance.profitcenter.update')
  async update(@Param('id') id: string, @Body() body: { name?: string; isActive?: boolean }) {
    const center = await this.prisma.profitCenter.update({
      where: { id },
      data: body,
    });
    return { profitCenter: center };
  }

  @Delete(':id')
  @RequirePermissions('finance.profitcenter.delete')
  async delete(@Param('id') id: string) {
    await this.prisma.profitCenter.delete({ where: { id } });
    return { success: true };
  }
}