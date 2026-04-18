import { Body, Controller, Get, Post, Put, Delete, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('ecommerce/channels')
export class MarketplaceChannelController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('ecommerce.channel.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const channels = await this.prisma.marketplaceChannel.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: { name: 'asc' },
    });
    return { channels };
  }

  @Post()
  @RequirePermissions('ecommerce.channel.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: {
      name: string;
      code: string;
      type: string;
      iconUrl?: string;
      apiEndpoint?: string;
      clientId?: string;
      clientSecret?: string;
      isActive?: boolean;
    },
  ) {
    const channel = await this.prisma.marketplaceChannel.create({
      data: {
        tenantId: req.user.tenantId!,
        name: body.name,
        code: body.code,
        type: body.type,
        iconUrl: body.iconUrl,
        apiEndpoint: body.apiEndpoint,
        clientId: body.clientId,
        clientSecret: body.clientSecret,
        isActive: body.isActive ?? true,
      },
    });
    return { channel };
  }

  @Put(':id')
  @RequirePermissions('ecommerce.channel.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: Partial<{
      name: string;
      code: string;
      type: string;
      iconUrl: string;
      apiEndpoint: string;
      clientId: string;
      clientSecret: string;
      isActive: boolean;
    }>,
  ) {
    const channel = await this.prisma.marketplaceChannel.update({
      where: { id },
      data: body,
    });
    return { channel };
  }

  @Delete(':id')
  @RequirePermissions('ecommerce.channel.delete')
  async delete(@Param('id') id: string) {
    await this.prisma.marketplaceChannel.delete({ where: { id } });
    return { success: true };
  }

  @Post(':id/test-connection')
  @RequirePermissions('ecommerce.channel.update')
  async testConnection(@Param('id') id: string) {
    const channel = await this.prisma.marketplaceChannel.findUnique({ where: { id } });
    if (!channel) return { success: false, message: 'Channel tidak ditemukan' };

    // Simulasi test koneksi
    const success = Math.random() > 0.2;
    return { 
      success, 
      message: success 
        ? `Koneksi ke ${channel.name} berhasil` 
        : `Gagal terhubung ke ${channel.name}. Periksa API credentials.`
    };
  }
}
