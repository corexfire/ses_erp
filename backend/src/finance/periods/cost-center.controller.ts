import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/cost-centers')
export class CostCenterController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('finance.costcenter.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const centers = await this.prisma.costCenter.findMany({
      where: { tenantId: req.user.tenantId! },
    });
    return { costCenters: centers };
  }

  @Post()
  @RequirePermissions('finance.costcenter.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { code: string; name: string }) {
    const center = await this.prisma.costCenter.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
      },
    });
    return { costCenter: center };
  }

  @Patch(':id')
  @RequirePermissions('finance.costcenter.update')
  async update(@Param('id') id: string, @Body() body: { name?: string; isActive?: boolean }) {
    const center = await this.prisma.costCenter.update({
      where: { id },
      data: body,
    });
    return { costCenter: center };
  }

  @Delete(':id')
  @RequirePermissions('finance.costcenter.delete')
  async delete(@Param('id') id: string) {
    await this.prisma.costCenter.delete({ where: { id } });
    return { success: true };
  }
}