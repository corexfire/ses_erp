import { Controller, Get, Post, Body, Param, Req, UseGuards, Patch, Delete } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('tasks/categories')
export class TaskCategoryController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('project.task_category.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const categories = await this.prisma.wbsTaskCategory.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: [{ code: 'asc' }],
      include: {
        _count: {
          select: { tasks: true }
        }
      }
    });
    return { data: categories };
  }

  @Post()
  @RequirePermissions('project.task_category.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { code: string; name: string; description?: string; color?: string; icon?: string }) {
    const category = await this.prisma.wbsTaskCategory.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
        description: body.description,
        color: body.color,
        icon: body.icon,
      },
    });
    return { data: category };
  }

  @Patch(':id')
  @RequirePermissions('project.task_category.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { code?: string; name?: string; description?: string; color?: string; icon?: string }) {
    const category = await this.prisma.wbsTaskCategory.update({
      where: { id, tenantId: req.user.tenantId! },
      data: body,
    });
    return { data: category };
  }

  @Delete(':id')
  @RequirePermissions('project.task_category.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    // Check if there are tasks using this category
    const taskCount = await this.prisma.wbsTask.count({
      where: { categoryId: id, tenantId: req.user.tenantId! }
    });

    if (taskCount > 0) {
      throw new Error('Tidak dapat menghapus kategori yang masih digunakan oleh task');
    }

    await this.prisma.wbsTaskCategory.delete({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { success: true };
  }
}
