import { Controller, Get, Post, Body, Param, Req, UseGuards, Patch, Delete } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/team')
export class TeamController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('my')
  async listMyTeams(@Req() req: FastifyRequest & { user: AuthUser }) {
    const memberships = await this.prisma.teamMember.findMany({
      where: { 
        tenantId: req.user.tenantId!,
        userId: req.user.id 
      },
      include: { team: true },
    });
    return { data: memberships.map(m => m.team) };
  }

  @Get()
  @RequirePermissions('hris.team.read')
  async listAll(@Req() req: FastifyRequest & { user: AuthUser }) {
    const teams = await this.prisma.team.findMany({
      where: { tenantId: req.user.tenantId! },
      include: { members: { include: { user: true } } },
    });
    return { data: teams };
  }

   @Post()
   @RequirePermissions('hris.team.create')
   async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { name: string; description?: string }) {
     const team = await this.prisma.team.create({
       data: {
         tenantId: req.user.tenantId!,
         name: body.name,
         description: body.description ?? null,
       },
     });
     return { data: team };
   }

  @Post(':id/members')
  @RequirePermissions('hris.team.update')
  async addMember(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { userId: string; role?: string }) {
    const member = await this.prisma.teamMember.create({
      data: {
        tenantId: req.user.tenantId!,
        teamId: id,
        userId: body.userId,
        role: body.role || 'MEMBER',
      },
    });
    return { data: member };
  }

  @Patch(':id')
  @RequirePermissions('hris.team.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { name?: string; description?: string }) {
    const team = await this.prisma.team.update({
      where: { id, tenantId: req.user.tenantId! },
      data: body,
    });
    return { data: team };
  }

  @Delete(':id')
  @RequirePermissions('hris.team.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.team.delete({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { success: true };
  }

  @Delete(':id/members/:memberId')
  @RequirePermissions('hris.team.update')
  async removeMember(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') teamId: string, @Param('memberId') memberId: string) {
    await this.prisma.teamMember.delete({
      where: { 
        id: memberId,
        teamId: teamId,
        tenantId: req.user.tenantId! 
      },
    });
    return { success: true };
  }
}
