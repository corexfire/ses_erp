import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { AuditService } from '../../audit/audit.service';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core/branches')
export class BranchesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('core.branch.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const branches = await this.prisma.branch.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ isActive: 'desc' }, { code: 'asc' }],
    });
    return { branches };
  }

  @Post()
  @RequirePermissions('core.branch.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateBranchDto,
  ) {
    const branch = await this.prisma.branch.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
        email: body.email,
        phone: body.phone,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        countryCode: body.countryCode ?? 'ID',
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Branch',
      entityId: branch.id,
    });

    return { branch };
  }

  @Get(':id')
  @RequirePermissions('core.branch.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const branch = await this.prisma.branch.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { branch };
  }

  @Patch(':id')
  @RequirePermissions('core.branch.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateBranchDto,
  ) {
    const branch = await this.prisma.branch.update({
      where: { id },
      data: {
        code: body.code,
        name: body.name,
        isActive: body.isActive ?? undefined,
        email: body.email,
        phone: body.phone,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        countryCode: body.countryCode ?? 'ID',
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'Branch',
      entityId: branch.id,
    });

    return { branch };
  }

  @Patch(':id/deactivate')
  @RequirePermissions('core.branch.deactivate')
  async deactivate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const branch = await this.prisma.branch.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'Branch',
      entityId: branch.id,
    });

    return { branch };
  }
}
