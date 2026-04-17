import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { SupplierRatingService } from './supplier-rating.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('qms/supplier-rating')
export class SupplierRatingController {
  constructor(private readonly ratingService: SupplierRatingService) {}

  @Get()
  @RequirePermissions('qms.supplier_rating.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period: string) {
    const list = await this.ratingService.findAll(req.user.tenantId, period || '2024-Q2');
    return { list };
  }

  @Post('calculate')
  @RequirePermissions('qms.supplier_rating.update')
  async calculate(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period: string) {
    return this.ratingService.calculateRatings(req.user.tenantId, period || '2024-Q2');
  }
}
