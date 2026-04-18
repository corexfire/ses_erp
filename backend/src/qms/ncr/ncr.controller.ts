import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { NcrService } from './ncr.service';
import { CreateNcrDto } from './dto/create-ncr.dto';
import { UpdateNcrDto } from './dto/update-ncr.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('qms/ncr')
export class NcrController {
  constructor(private readonly ncrService: NcrService) {}

  @Get()
  @RequirePermissions('qms.ncr.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query() query: any) {
    const list = await this.ncrService.findAll(req.user.tenantId!, query);
    return { list };
  }

  @Get(':id')
  @RequirePermissions('qms.ncr.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const ncr = await this.ncrService.findOne(req.user.tenantId!, id);
    return { ncr };
  }

  @Post()
  @RequirePermissions('qms.ncr.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateNcrDto) {
    const ncr = await this.ncrService.create(req.user.tenantId!, req.user.id, body);
    return { ncr };
  }

  @Patch(':id')
  @RequirePermissions('qms.ncr.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateNcrDto,
  ) {
    const ncr = await this.ncrService.update(req.user.tenantId!, id, body);
    return { ncr };
  }

  @Post(':id/submit')
  @RequirePermissions('qms.ncr.update')
  async submit(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const instance = await this.ncrService.submitToWorkflow(req.user.tenantId!, req.user.id, id);
    return { instance };
  }
}
