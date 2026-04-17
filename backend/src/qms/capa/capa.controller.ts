import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { CapaService } from './capa.service';
import { CreateCapaDto } from './dto/create-capa.dto';
import { UpdateCapaDto } from './dto/update-capa.dto';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('qms/capa')
export class CapaController {
  constructor(
    private readonly capaService: CapaService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @RequirePermissions('qms.capa.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query() query: any) {
    const list = await this.capaService.findAll(req.user.tenantId, query);
    return { list };
  }

  @Get('references/audits')
  @RequirePermissions('qms.capa.read')
  async getAuditFindings(@Req() req: FastifyRequest & { user: AuthUser }) {
    const findings = await this.capaService.getAuditFindings(req.user.tenantId);
    return { findings };
  }

  @Get('references/users')
  @RequirePermissions('qms.capa.read')
  async getUsers(@Req() req: FastifyRequest & { user: AuthUser }) {
    const users = await this.prisma.user.findMany({
      where: { tenantId: req.user.tenantId, isActive: true },
      select: { id: true, name: true, email: true },
    });
    return { users };
  }

  @Get(':id')
  @RequirePermissions('qms.capa.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const capa = await this.capaService.findOne(req.user.tenantId, id);
    return { capa };
  }

  @Post()
  @RequirePermissions('qms.capa.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateCapaDto) {
    const capa = await this.capaService.create(req.user.tenantId, body);
    return { capa };
  }

  @Patch(':id')
  @RequirePermissions('qms.capa.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateCapaDto,
  ) {
    const capa = await this.capaService.update(req.user.tenantId, id, body);
    return { capa };
  }
}
