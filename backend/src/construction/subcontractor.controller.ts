import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

export class CreateSubcontractorDto {
  code!: string;
  name!: string;
  category?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  isActive?: boolean;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('construction/subcontractors')
export class SubcontractorController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @RequirePermissions('project.site.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('category') category?: string,
    @Query('status') status?: string,
    @Query('q') q?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (category && category !== 'ALL') where.category = category;
    if (status === 'ACTIVE') where.isActive = true;
    if (status === 'INACTIVE') where.isActive = false;
    
    if (q) {
      where.OR = [
        { code: { contains: q, mode: 'insensitive' } },
        { name: { contains: q, mode: 'insensitive' } },
        { contactName: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ];
    }

    const subcontractors = await this.prisma.subcontractor.findMany({
      where,
      orderBy: { name: 'asc' },
      take: 100,
    });
    return { data: subcontractors };
  }

  @Get('stats')
  @RequirePermissions('project.site.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;
    const [total, active, categories] = await Promise.all([
      this.prisma.subcontractor.count({ where: { tenantId } }),
      this.prisma.subcontractor.count({ where: { tenantId, isActive: true } }),
      this.prisma.subcontractor.groupBy({
        by: ['category'],
        where: { tenantId },
        _count: { id: true }
      }),
    ]);

    return { 
      total, 
      active, 
      categoryCount: categories.length,
      categories: categories.map(c => ({ name: c.category || 'N/A', count: c._count.id }))
    };
  }

  @Post()
  @RequirePermissions('project.site.execute')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateSubcontractorDto,
  ) {
    const tenantId = req.user.tenantId!;
    
    // Auto-generate code if not provided
    let code = body.code;
    if (!code) {
      const count = await this.prisma.subcontractor.count({ where: { tenantId } });
      code = `SUB-${(count + 1).toString().padStart(4, '0')}`;
    }

    return this.prisma.subcontractor.create({
      data: {
        tenantId,
        code,
        name: body.name,
        category: body.category,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        taxId: body.taxId,
        isActive: body.isActive ?? true,
      }
    });
  }

  @Patch(':id')
  @RequirePermissions('project.site.execute')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateSubcontractorDto>,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.subcontractor.update({
      where: { id },
      data: {
        code: body.code,
        name: body.name,
        category: body.category,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        taxId: body.taxId,
        isActive: body.isActive,
      }
    });
  }

  @Delete(':id')
  @RequirePermissions('project.site.execute')
  async remove(@Param('id') id: string) {
    // Soft delete by deactivating or hard delete if requested
    await this.prisma.subcontractor.update({
      where: { id },
      data: { isActive: false }
    });
    return { success: true };
  }
}
