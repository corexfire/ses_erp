import { Controller, Get, Post, Body, Param, Req, UseGuards, Query, Patch, Delete } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BudgetLineDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  wbsTaskId?: string;

  @IsString()
  @IsNotEmpty()
  costCategory: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  qty: number;

  @IsString()
  @IsOptional()
  uom?: string;
}

class CreateProjectBudgetDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  budgetNo: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetLineDto)
  lines: BudgetLineDto[];
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('project/budgets')
export class ProjectBudgetController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('project.budget.read')
  async listBudgets(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('projectId') projectId?: string,
  ) {
    return this.prisma.projectBudget.findMany({
      where: { 
        tenantId: req.user.tenantId!,
        ...(projectId ? { projectId } : {})
      },
      include: { 
        project: { select: { name: true, code: true } },
        _count: { select: { lines: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  @Get(':id')
  @RequirePermissions('project.budget.read')
  async getBudget(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.projectBudget.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { 
        project: true,
        lines: { include: { wbsTask: true } }
      }
    });
  }

  @Post()
  @RequirePermissions('project.budget.manage')
  async createBudget(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateProjectBudgetDto,
  ) {
    const totalAmount = body.lines.reduce((sum, line) => sum + (line.unitPrice * line.qty), 0);

    return this.prisma.projectBudget.create({
      data: {
        tenantId: req.user.tenantId!,
        projectId: body.projectId,
        budgetNo: body.budgetNo,
        description: body.description,
        status: 'DRAFT',
        totalAmount,
        allocatedBudget: totalAmount,
        lines: {
          create: body.lines.map(line => ({
            tenantId: req.user.tenantId!,
            wbsTaskId: line.wbsTaskId,
            costCategory: line.costCategory,
            description: line.description,
            unitPrice: line.unitPrice,
            qty: line.qty,
            totalAmount: line.unitPrice * line.qty,
            uom: line.uom,
          }))
        }
      },
      include: { lines: true }
    });
  }

  @Patch(':id')
  @RequirePermissions('project.budget.manage')
  async updateBudget(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: Partial<CreateProjectBudgetDto>,
  ) {
    // Basic implementation: replace lines if provided
    if (body.lines) {
      const totalAmount = body.lines.reduce((sum, line) => sum + (line.unitPrice * line.qty), 0);
      
      // Delete old lines
      await this.prisma.projectBudgetLine.deleteMany({
        where: { budgetId: id, tenantId: req.user.tenantId! }
      });

      return this.prisma.projectBudget.update({
        where: { id },
        data: {
          description: body.description,
          totalAmount,
          allocatedBudget: totalAmount,
          lines: {
            create: body.lines.map(line => ({
              tenantId: req.user.tenantId!,
              wbsTaskId: line.wbsTaskId,
              costCategory: line.costCategory,
              description: line.description,
              unitPrice: line.unitPrice,
              qty: line.qty,
              totalAmount: line.unitPrice * line.qty,
              uom: line.uom,
            }))
          }
        },
        include: { lines: true }
      });
    }

    return this.prisma.projectBudget.update({
      where: { id },
      data: { description: body.description }
    });
  }

  @Patch(':id/status')
  @RequirePermissions('project.budget.manage')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.projectBudget.update({
      where: { id, tenantId: req.user.tenantId! },
      data: { status }
    });
  }

  @Delete(':id')
  @RequirePermissions('project.budget.manage')
  async deleteBudget(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    return this.prisma.projectBudget.delete({
      where: { id, tenantId: req.user.tenantId! }
    });
  }
}
