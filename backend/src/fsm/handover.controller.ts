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
import { HandoverService } from './handover.service';
import { CreateHandoverDto, UpdateHandoverDto } from './dto/handover.dto';

@UseGuards(JwtAuthGuard)
@Controller('fsm/handover')
export class HandoverController {
  constructor(private readonly handoverService: HandoverService) {}

  @Post()
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() dto: CreateHandoverDto) {
    return this.handoverService.create(req.user.tenantId, dto);
  }

  @Get()
  async findAll(@Req() req: FastifyRequest & { user: AuthUser }, @Query() filters: any) {
    return this.handoverService.findAll(req.user.tenantId, filters);
  }

  @Get('stats')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    return this.handoverService.getStats(req.user.tenantId);
  }

  @Get(':id')
  async findOne(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    return this.handoverService.findOne(req.user.tenantId, id);
  }

  @Patch(':id')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() dto: UpdateHandoverDto,
  ) {
    return this.handoverService.update(req.user.tenantId, id, dto);
  }

  @Delete(':id')
  async remove(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    return this.handoverService.remove(req.user.tenantId, id);
  }
}
