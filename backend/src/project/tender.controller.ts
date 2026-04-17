import { Controller, Get, Post, Patch, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

export class CreateTenderDto {
  title!: string;
  projectId?: string;
  description?: string;
  submissionDeadline?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('project')
export class TenderController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('tenders')
  @RequirePermissions('project.tender.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('status') status?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId };
    if (status) where.status = status;

    const tenders = await this.prisma.tender.findMany({
      where,
      include: { project: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return { data: tenders };
  }

  @Post('tenders')
  @RequirePermissions('project.tender.manage')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateTenderDto,
  ) {
    const tender = await this.prisma.tender.create({
      data: {
        tenantId: req.user.tenantId,
        title: body.title,
        projectId: body.projectId,
        description: body.description,
        submissionDeadline: body.submissionDeadline ? new Date(body.submissionDeadline) : undefined,
        status: 'DRAFT',
      },
    });
    return tender;
  }

  @Get('tenders/:id')
  @RequirePermissions('project.tender.read')
  async get(
    @Param('id') id: string,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const tender = await this.prisma.tender.findFirst({
      where: { id, tenantId: req.user.tenantId },
    });
    return tender;
  }

  @Post('tenders/:id/bids')
  @RequirePermissions('project.tender.manage')
  async submitBid(
    @Param('id') id: string,
    @Body() body: { supplierId: string; price: number; notes?: string },
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const bid = await this.prisma.tenderBid.create({
      data: {
        tenderId: id,
        supplierId: body.supplierId,
        price: body.price,
        notes: body.notes,
        status: 'SUBMITTED',
      },
    });
    return bid;
  }

  @Patch('tenders/:id')
  @RequirePermissions('project.tender.manage')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateTenderDto>,
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const tender = await this.prisma.tender.update({
      where: { id },
      data: {
        title: body.title,
        projectId: body.projectId,
        description: body.description,
        submissionDeadline: body.submissionDeadline ? new Date(body.submissionDeadline) : undefined,
        status: 'OPEN',
      },
    });
    return tender;
  }

  @Post('tenders/:id/award')
  @RequirePermissions('project.tender.manage')
  async award(
    @Param('id') id: string,
    @Body() body: { supplierId: string },
    @Req() req: FastifyRequest & { user: AuthUser },
  ) {
    const tender = await this.prisma.tender.update({
      where: { id },
      data: { status: 'AWARDED', awardDate: new Date() },
    });
    return tender;
  }
}
