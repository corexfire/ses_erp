import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

export class CreateMaterialRequestDto {
  code!: string;
  projectId!: string;
  wbsTaskId?: string;
  requestDate!: string;
  priority?: string;
  notes?: string;
  status?: string;
  items!: {
    itemId?: string;
    description: string;
    quantity: number;
    uomCode?: string;
    requiredDate?: string;
    notes?: string;
  }[];
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('construction/material-requests')
export class MaterialRequestController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @RequirePermissions('project.site.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
    @Query('status') status?: string,
    @Query('q') q?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (projectId) where.projectId = projectId;
    if (status && status !== 'ALL') where.status = status;
    if (q) {
      where.OR = [
        { code: { contains: q, mode: 'insensitive' } },
        { project: { name: { contains: q, mode: 'insensitive' } } },
        { notes: { contains: q, mode: 'insensitive' } },
      ];
    }

    const requests = await this.prisma.constructionMaterialRequest.findMany({
      where,
      include: {
        project: true,
        wbsTask: true,
        requestedBy: {
          select: { id: true, name: true, email: true }
        },
        items: {
          include: { item: true }
        }
      },
      orderBy: { requestDate: 'desc' },
      take: 100,
    });
    return { data: requests };
  }

  @Get('stats')
  @RequirePermissions('project.site.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;
    const [total, pending, approved] = await Promise.all([
      this.prisma.constructionMaterialRequest.count({ where: { tenantId } }),
      this.prisma.constructionMaterialRequest.count({ where: { tenantId, status: 'SUBMITTED' } }),
      this.prisma.constructionMaterialRequest.count({ where: { tenantId, status: 'APPROVED' } }),
    ]);

    // Simple valuation sum for visual impact on dashboard
    const valuation = await this.prisma.constructionMaterialRequestItem.aggregate({
      where: { tenantId },
      _count: { id: true },
    });

    return { 
      total, 
      pending, 
      approved,
      itemCount: valuation._count.id
    };
  }

  @Post()
  @RequirePermissions('project.site.execute')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateMaterialRequestDto,
  ) {
    const tenantId = req.user.tenantId!;
    
    // Auto-generate code if not provided
    let code = body.code;
    if (!code) {
      const count = await this.prisma.constructionMaterialRequest.count({ where: { tenantId } });
      code = `MR-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;
    }

    return this.prisma.constructionMaterialRequest.create({
      data: {
        tenantId,
        code,
        projectId: body.projectId,
        wbsTaskId: body.wbsTaskId,
        requestDate: new Date(body.requestDate),
        priority: body.priority || 'NORMAL',
        notes: body.notes,
        status: body.status || 'DRAFT',
        requestedById: req.user.id,
        items: {
          create: body.items.map(item => ({
            tenantId,
            itemId: item.itemId,
            description: item.description,
            quantity: item.quantity,
            uomCode: item.uomCode,
            requiredDate: item.requiredDate ? new Date(item.requiredDate) : null,
            notes: item.notes,
          }))
        }
      },
      include: { items: true }
    });
  }

  @Patch(':id')
  @RequirePermissions('project.site.execute')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateMaterialRequestDto>,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const tenantId = req.user.tenantId!;

    return this.prisma.$transaction(async (tx) => {
      // If items are provided, replace them
      if (body.items) {
        await tx.constructionMaterialRequestItem.deleteMany({
          where: { requestId: id }
        });
      }

      return tx.constructionMaterialRequest.update({
        where: { id },
        data: {
          projectId: body.projectId,
          wbsTaskId: body.wbsTaskId,
          requestDate: body.requestDate ? new Date(body.requestDate) : undefined,
          priority: body.priority,
          notes: body.notes,
          status: body.status,
          items: body.items ? {
            create: body.items.map(item => ({
              tenantId,
              itemId: item.itemId,
              description: item.description,
              quantity: item.quantity,
              uomCode: item.uomCode,
              requiredDate: item.requiredDate ? new Date(item.requiredDate) : null,
              notes: item.notes,
            }))
          } : undefined
        },
        include: { items: true }
      });
    });
  }

  @Delete(':id')
  @RequirePermissions('project.site.execute')
  async remove(@Param('id') id: string) {
    await this.prisma.constructionMaterialRequest.delete({ where: { id } });
    return { success: true };
  }
}
