import {
  Body,
  Controller,
  ForbiddenException,
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

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('sales/subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  //@RequirePermissions('sales.subscription.read')
  async findAll(@Req() req: FastifyRequest, @Query('search') search?: string, @Query('status') status?: string) {
    const user = req.user as AuthUser;
    
    // We parse search manually instead of validating using heavy DTOs to save boilerplate.
    const where: any = { tenantId: user.tenantId };
    
    if (search) {
      where.OR = [
        { planName: { contains: search, mode: 'insensitive' } },
        { customer: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const subscriptions = await this.prisma.salesSubscription.findMany({
      where,
      include: {
        customer: { select: { name: true, code: true } }
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Summary logic for dashboards
    const summary = {
       active: await this.prisma.salesSubscription.count({ where: { tenantId: user.tenantId, status: 'ACTIVE' } }),
       pastDue: await this.prisma.salesSubscription.count({ where: { tenantId: user.tenantId, status: 'PAST_DUE' } }),
       cancelled: await this.prisma.salesSubscription.count({ where: { tenantId: user.tenantId, status: 'CANCELLED' } })
    };

    return { data: subscriptions, summary };
  }

  @Post()
  //@RequirePermissions('sales.subscription.manage')
  async create(@Req() req: FastifyRequest, @Body() body: any) {
    const user = req.user as AuthUser;
    
    const sub = await this.prisma.salesSubscription.create({
      data: {
        tenantId: user.tenantId,
        customerId: body.customerId,
        planName: body.planName,
        billingCycle: body.billingCycle,
        status: body.status || 'ACTIVE',
        startDate: body.startDate ? new Date(body.startDate) : new Date(),
        endDate: body.endDate ? new Date(body.endDate) : null,
        nextBillingDate: new Date(body.nextBillingDate),
        amount: body.amount,
        notes: body.notes
      },
    });

    await this.audit.log(
      user.tenantId,
      user.id,
      'CREATE',
      'SalesSubscription',
      sub.id,
      null,
      sub,
    );

    return { message: 'Subscription created successfully', data: sub };
  }

  @Patch(':id')
  //@RequirePermissions('sales.subscription.manage')
  async update(
    @Req() req: FastifyRequest,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const user = req.user as AuthUser;
    const existing = await this.prisma.salesSubscription.findUnique({
      where: { id },
    });

    if (!existing || existing.tenantId !== user.tenantId) {
      throw new NotFoundException('Subscription not found');
    }

    const data: any = {};
    if (body.planName !== undefined) data.planName = body.planName;
    if (body.billingCycle !== undefined) data.billingCycle = body.billingCycle;
    if (body.status !== undefined) data.status = body.status;
    if (body.amount !== undefined) data.amount = body.amount;
    if (body.notes !== undefined) data.notes = body.notes;
    if (body.startDate) data.startDate = new Date(body.startDate);
    if (body.endDate) data.endDate = new Date(body.endDate);
    if (body.nextBillingDate) data.nextBillingDate = new Date(body.nextBillingDate);
    if (body.customerId) data.customerId = body.customerId;

    const updated = await this.prisma.salesSubscription.update({
      where: { id },
      data,
    });

    await this.audit.log(
      user.tenantId,
      user.id,
      'UPDATE',
      'SalesSubscription',
      id,
      existing,
      updated,
    );

    return { message: 'Subscription updated successfully', data: updated };
  }
}
