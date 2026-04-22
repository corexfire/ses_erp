import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/succession')
export class SuccessionController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.employee.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;
    const plans = await this.prisma.successionPlan.findMany({
      where: { tenantId },
      include: {
        incumbent: true,
        candidates: {
            include: { employee: true }
        }
      },
      orderBy: { priority: 'desc' }
    });
    return { plans };
  }

  @Get('stats')
  @RequirePermissions('hris.employee.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;
    
    const [totalPlans, readyNowCount, vacantRoles] = await Promise.all([
        this.prisma.successionPlan.count({ where: { tenantId } }),
        this.prisma.successionCandidate.count({ where: { tenantId, readiness: 'READY_NOW' } }),
        this.prisma.successionPlan.count({ where: { tenantId, incumbentId: null } })
    ]);

    return {
        totalPlans,
        readyNowCount,
        vacantRoles,
        averageReadiness: 68 // Mocked percentage
    };
  }

  @Post()
  @RequirePermissions('hris.employee.update')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: any) {
    const plan = await this.prisma.successionPlan.create({
      data: {
        tenantId: req.user.tenantId!,
        positionName: body.positionName,
        department: body.department,
        incumbentId: body.incumbentId,
        priority: body.priority || 'MEDIUM',
        status: 'ACTIVE'
      }
    });
    return { plan };
  }

  @Post(':id/candidates')
  @RequirePermissions('hris.employee.update')
  async addCandidate(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: any) {
    const candidate = await this.prisma.successionCandidate.create({
      data: {
        tenantId: req.user.tenantId!,
        planId: id,
        employeeId: body.employeeId,
        readiness: body.readiness,
        potentialScore: body.potentialScore || 3,
        performanceScore: body.performanceScore || 3,
        gapAnalysis: body.gapAnalysis
      }
    });
    return { candidate };
  }

  @Patch('candidates/:id')
  @RequirePermissions('hris.employee.update')
  async updateCandidate(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: any) {
    const candidate = await this.prisma.successionCandidate.update({
      where: { id },
      data: {
        readiness: body.readiness,
        potentialScore: body.potentialScore,
        performanceScore: body.performanceScore,
        gapAnalysis: body.gapAnalysis
      }
    });
    return { candidate };
  }
}
