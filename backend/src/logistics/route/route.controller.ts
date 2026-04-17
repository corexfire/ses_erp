import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';

export class CreateRouteTemplateDto {
  code!: string;
  name!: string;
  warehouseId?: string;
  description?: string;
  origin?: string;
  destination?: string;
  distanceKm?: number;
  estDurationHours?: number;
  standardCost?: number;
  isActive?: boolean;
}

export class UpdateRouteTemplateDto {
  name?: string;
  warehouseId?: string;
  description?: string;
  origin?: string;
  destination?: string;
  distanceKm?: number;
  estDurationHours?: number;
  standardCost?: number;
  isActive?: boolean;
}

@Controller('logistics/routes')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RouteController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('logistics.route.read')
  async list(
    @Query() query: { search?: string; isActive?: string; page?: string; limit?: string },
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const where: any = {};
    where.tenantId = req.user.tenantId;

    if (query.search) {
      where.OR = [
        { code: { contains: query.search, mode: 'insensitive' } },
        { name: { contains: query.search, mode: 'insensitive' } },
        { origin: { contains: query.search, mode: 'insensitive' } },
        { destination: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    }

    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '50');
    const skip = (page - 1) * limit;

    const [routes, total] = await Promise.all([
      this.prisma.routeTemplate.findMany({ 
        where, 
        skip, 
        take: limit, 
        orderBy: { code: 'asc' },
        include: { warehouse: { select: { name: true } } }
      }),
      this.prisma.routeTemplate.count({ where }),
    ]);

    return { data: routes, total, page, limit };
  }

  @Get(':id')
  @RequirePermissions('logistics.route.read')
  async get(@Param('id') id: string, @Req() req: FastifyRequest & { user: AuthUser }) {
    const route = await this.prisma.routeTemplate.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { 
        warehouse: true,
        _count: { select: { tripPlans: true } } 
      },
    });
    if (!route) throw new NotFoundException('Route template not found');
    return route;
  }

  @Post()
  @RequirePermissions('logistics.route.manage')
  async create(@Body() body: CreateRouteTemplateDto, @Req() req: FastifyRequest & { user: AuthUser }) {
    const route = await this.prisma.routeTemplate.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        warehouseId: body.warehouseId,
        description: body.description,
        origin: body.origin,
        destination: body.destination,
        distanceKm: body.distanceKm,
        estDurationHours: body.estDurationHours,
        standardCost: body.standardCost,
        isActive: body.isActive ?? true,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'RouteTemplate',
      entityId: route.id,
      metadata: { code: route.code },
    });

    return route;
  }

  @Patch(':id')
  @RequirePermissions('logistics.route.manage')
  async update(@Param('id') id: string, @Body() body: UpdateRouteTemplateDto, @Req() req: FastifyRequest & { user: AuthUser }) {
    const existing = await this.prisma.routeTemplate.findFirst({
      where: { id, tenantId: req.user.tenantId },
    });
    if (!existing) throw new NotFoundException('Route template not found');

    const route = await this.prisma.routeTemplate.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        warehouseId: body.warehouseId !== undefined ? body.warehouseId : existing.warehouseId,
        description: body.description !== undefined ? body.description : existing.description,
        origin: body.origin !== undefined ? body.origin : existing.origin,
        destination: body.destination !== undefined ? body.destination : existing.destination,
        distanceKm: body.distanceKm !== undefined ? body.distanceKm : existing.distanceKm,
        estDurationHours: body.estDurationHours !== undefined ? body.estDurationHours : existing.estDurationHours,
        standardCost: body.standardCost !== undefined ? body.standardCost : existing.standardCost,
        isActive: body.isActive ?? existing.isActive,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'UPDATE',
      entity: 'RouteTemplate',
      entityId: route.id,
      metadata: { code: route.code },
    });

    return route;
  }
}
