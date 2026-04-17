import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../auth/auth.types';
import { SparePartsService } from './spare-parts.service';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';

@UseGuards(JwtAuthGuard)
@Controller('fsm/spare-parts')
export class SparePartsController {
  constructor(private readonly sparePartsService: SparePartsService) {}

  @Get()
  async findAll(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') query?: string,
  ) {
    const { tenantId, isSuperAdmin } = req.user;
    return this.sparePartsService.findAll(tenantId, query, isSuperAdmin);
  }

  @Get('stats')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const { tenantId, isSuperAdmin } = req.user;
    return this.sparePartsService.getStats(tenantId, isSuperAdmin);
  }

  @Get(':id')
  async findOne(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const { tenantId, isSuperAdmin } = req.user;
    return this.sparePartsService.findOne(tenantId, id, isSuperAdmin);
  }

  @Post()
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() dto: CreateSparePartDto,
  ) {
    if (!req.user.tenantId && req.user.isSuperAdmin) {
      throw new Error('Superadmin harus memilih tenant terlebih dahulu');
    }
    return this.sparePartsService.create(req.user.tenantId, dto);
  }

  @Patch(':id')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() dto: UpdateSparePartDto,
  ) {
    if (!req.user.tenantId && req.user.isSuperAdmin) {
      throw new Error('Superadmin harus memilih tenant terlebih dahulu');
    }
    return this.sparePartsService.update(req.user.tenantId, id, dto);
  }

  @Delete(':id')
  async remove(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    if (!req.user.tenantId && req.user.isSuperAdmin) {
      throw new Error('Superadmin harus memilih tenant terlebih dahulu');
    }
    return this.sparePartsService.remove(req.user.tenantId, id);
  }
}
