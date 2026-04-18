import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { CalibrationService } from './calibration.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('qms/calibration')
export class CalibrationController {
  constructor(private readonly calibrationService: CalibrationService) {}

  @Get()
  @RequirePermissions('qms.calibration.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query() query: any) {
    const list = await this.calibrationService.findAll(req.user.tenantId!, query);
    return { list };
  }

  @Get('equipment')
  @RequirePermissions('qms.calibration.read')
  async searchEquipment(@Req() req: FastifyRequest & { user: AuthUser }, @Query('q') q?: string) {
    const equipment = await this.calibrationService.searchEquipment(req.user.tenantId!, q);
    return { equipment };
  }

  @Get(':id')
  @RequirePermissions('qms.calibration.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const log = await this.calibrationService.findOne(req.user.tenantId!, id);
    return { log };
  }

  @Post()
  @RequirePermissions('qms.calibration.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: any) {
    const log = await this.calibrationService.create(req.user.tenantId!, body);
    return { log };
  }

  @Patch(':id')
  @RequirePermissions('qms.calibration.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const log = await this.calibrationService.update(req.user.tenantId!, id, body);
    return { log };
  }
}
