import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

export class CreateDrawingDto {
  projectId!: string;
  wbsTaskId?: string;
  code!: string;
  title!: string;
  category?: string;
  discipline?: string;
  revision?: string;
  revisionDate?: string;
  status?: string;
  fileId?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('construction/drawings')
export class DrawingController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @RequirePermissions('project.site.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
    @Query('discipline') discipline?: string,
    @Query('q') q?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (projectId) where.projectId = projectId;
    if (discipline && discipline !== 'ALL') where.discipline = discipline;
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { code: { contains: q, mode: 'insensitive' } },
      ];
    }

    const drawings = await this.prisma.constructionDrawing.findMany({
      where,
      include: { project: true, wbsTask: true },
      orderBy: [{ code: 'asc' }, { revision: 'desc' }],
    });
    return { data: drawings };
  }

  @Get('stats')
  @RequirePermissions('project.site.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;
    const [total, pending, structural, arch] = await Promise.all([
      this.prisma.constructionDrawing.count({ where: { tenantId } }),
      this.prisma.constructionDrawing.count({ where: { tenantId, status: 'REVISED' } }),
      this.prisma.constructionDrawing.count({ where: { tenantId, discipline: 'STRUCTURAL' } }),
      this.prisma.constructionDrawing.count({ where: { tenantId, discipline: 'ARCHITECTURAL' } }),
    ]);

    return { total, pending, structural, arch };
  }

  @Post()
  @RequirePermissions('project.site.execute')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateDrawingDto,
  ) {
    return this.prisma.constructionDrawing.create({
      data: {
        ...body,
        tenantId: req.user.tenantId!,
        revisionDate: body.revisionDate ? new Date(body.revisionDate) : null,
      },
    });
  }

  @Patch(':id')
  @RequirePermissions('project.site.execute')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateDrawingDto>,
  ) {
    return this.prisma.constructionDrawing.update({
      where: { id },
      data: {
        ...body,
        revisionDate: body.revisionDate ? new Date(body.revisionDate) : undefined,
      },
    });
  }

  @Delete(':id')
  @RequirePermissions('project.site.execute')
  async remove(@Param('id') id: string) {
    await this.prisma.constructionDrawing.delete({ where: { id } });
    return { success: true };
  }
}
