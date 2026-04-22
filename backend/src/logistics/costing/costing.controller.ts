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
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { TripCostType, TripCostStatus } from '../../../prisma/generated/client';

const tripCostStatusSet = new Set<TripCostStatus>(['DRAFT', 'SUBMITTED', 'APPROVED', 'POSTED', 'VOID']);
const isTripCostStatus = (value?: string): value is TripCostStatus =>
  Boolean(value) && tripCostStatusSet.has(value as TripCostStatus);

export class CreateTripCostDto {
  @IsString()
  @IsNotEmpty()
  tripPlanId!: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['FUEL', 'TOLL', 'PARKING', 'MEAL', 'REPAIR', 'OTHER'])
  costType!: TripCostType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsString()
  @IsOptional()
  currencyCode?: string;

  @IsString()
  @IsOptional()
  supplierId?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateTripCostDto {
  @IsString()
  @IsOptional()
  @IsEnum(['FUEL', 'TOLL', 'PARKING', 'MEAL', 'REPAIR', 'OTHER'])
  costType?: TripCostType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics/costs')
export class CostingController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('logistics.cost.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('tripPlanId') tripPlanId?: string,
    @Query('status') status?: string,
    @Query('costType') costType?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (tripPlanId) where.tripPlanId = tripPlanId;
    if (isTripCostStatus(status)) where.status = status;
    if (costType) where.costType = costType;

    const costs = await this.prisma.tripCost.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
      include: { tripPlan: true, supplier: true },
      take: 200,
    });
    return { costs };
  }

  @Get(':id')
  @RequirePermissions('logistics.cost.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const cost = await this.prisma.tripCost.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { tripPlan: true, supplier: true },
    });
    if (!cost) throw new NotFoundException('Trip cost not found');
    return { cost };
  }

  @Post()
  @RequirePermissions('logistics.cost.manage')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateTripCostDto,
  ) {
    const trip = await this.prisma.tripPlan.findFirst({
      where: { id: body.tripPlanId, tenantId: req.user.tenantId! },
      select: { id: true, code: true },
    });
    if (!trip) throw new NotFoundException('Trip plan not found');

    const cost = await this.prisma.tripCost.create({
      data: {
        tenantId: req.user.tenantId!,
        tripPlanId: body.tripPlanId,
        costType: body.costType,
        description: body.description,
        amount: body.amount,
        currencyCode: body.currencyCode || 'IDR',
        supplierId: body.supplierId,
        notes: body.notes,
        status: 'DRAFT',
      },
      include: { tripPlan: true, supplier: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'TripCost',
      entityId: cost.id,
      metadata: { tripCode: trip.code, costType: body.costType, amount: body.amount },
    });

    return { cost };
  }

  @Patch(':id')
  @RequirePermissions('logistics.cost.manage')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateTripCostDto,
  ) {
    const existing = await this.prisma.tripCost.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, status: true },
    });
    if (!existing) throw new NotFoundException('Trip cost not found');

    if (existing.status !== 'DRAFT') {
      throw new Error('Can only update draft trip costs');
    }

    const cost = await this.prisma.tripCost.update({
      where: { id },
      data: {
        ...(body.costType && { costType: body.costType }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.amount !== undefined && { amount: body.amount }),
        ...(body.notes !== undefined && { notes: body.notes }),
      },
      include: { tripPlan: true, supplier: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'UPDATE',
      entity: 'TripCost',
      entityId: id,
      metadata: { amount: body.amount },
    });

    return { cost };
  }

  @Post(':id/submit')
  @RequirePermissions('logistics.cost.manage')
  async submit(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const cost = await this.prisma.tripCost.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, status: true },
    });
    if (!cost) throw new NotFoundException('Trip cost not found');

    if (cost.status !== 'DRAFT') {
      throw new Error('Can only submit draft trip costs');
    }

    const updated = await this.prisma.tripCost.update({
      where: { id },
      data: { status: 'SUBMITTED', submittedBy: req.user.id, submittedAt: new Date() },
      include: { tripPlan: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'SUBMIT',
      entity: 'TripCost',
      entityId: id,
    });

    return { cost: updated };
  }

  @Post(':id/approve')
  @RequirePermissions('logistics.cost.manage')
  async approve(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const cost = await this.prisma.tripCost.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      select: { id: true, status: true },
    });
    if (!cost) throw new NotFoundException('Trip cost not found');

    if (cost.status !== 'SUBMITTED') {
      throw new Error('Can only approve submitted trip costs');
    }

    const updated = await this.prisma.tripCost.update({
      where: { id },
      data: { status: 'APPROVED', approvedBy: req.user.id, approvedAt: new Date() },
      include: { tripPlan: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'APPROVE',
      entity: 'TripCost',
      entityId: id,
    });

    return { cost: updated };
  }

  @Post(':id/post')
  @RequirePermissions('logistics.cost.manage')
  async post(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const cost = await this.prisma.tripCost.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { tripPlan: true },
    });
    if (!cost) throw new NotFoundException('Trip cost not found');

    if (cost.status !== 'APPROVED') {
      throw new Error('Can only post approved trip costs');
    }

    const updated = await this.prisma.tripCost.update({
      where: { id },
      data: { status: 'POSTED', postedToFinance: true },
      include: { tripPlan: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'POST',
      entity: 'TripCost',
      entityId: id,
      metadata: { amount: cost.amount, tripPlanId: cost.tripPlanId },
    });

    return { cost: updated };
  }
}
