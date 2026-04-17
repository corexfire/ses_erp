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
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('crm/campaigns')
export class CampaignsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('crm.campaign.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const campaigns = await this.prisma.marketingCampaign.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      take: 200,
    });
    return { campaigns };
  }

  @Post()
  @RequirePermissions('crm.campaign.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateCampaignDto,
  ) {
    const campaign = await this.prisma.marketingCampaign.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        channel: body.channel,
        status: body.status ?? 'PLANNED',
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        budget: body.budget,
        notes: body.notes,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'MarketingCampaign',
      entityId: campaign.id,
    });

    return { campaign };
  }

  @Patch(':id')
  @RequirePermissions('crm.campaign.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateCampaignDto,
  ) {
    const exists = await this.prisma.marketingCampaign.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Campaign not found');

    const campaign = await this.prisma.marketingCampaign.update({
      where: { id },
      data: {
        name: body.name ?? undefined,
        channel: body.channel ?? undefined,
        status: body.status ?? undefined,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        budget: body.budget ?? undefined,
        notes: body.notes ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'MarketingCampaign',
      entityId: campaign.id,
    });

    return { campaign };
  }
}
