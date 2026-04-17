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
import { CreateDiscountRuleDto } from './dto/create-discount-rule.dto';
import { CreatePriceListDto } from './dto/create-price-list.dto';
import { CreatePriceRuleDto } from './dto/create-price-rule.dto';
import { UpdateDiscountRuleDto } from './dto/update-discount-rule.dto';
import { UpdatePriceListDto } from './dto/update-price-list.dto';
import { UpdatePriceRuleDto } from './dto/update-price-rule.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('sales/pricing')
export class PricingController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('price-lists')
  @RequirePermissions('sales.pricing.read')
  async listPriceLists(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const priceLists = await this.prisma.priceList.findMany({
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
      include: { items: { orderBy: [{ effectiveDate: 'desc' }] } },
      take: 200,
    });
    return { priceLists };
  }

  @Get('price-lists/:id')
  @RequirePermissions('sales.pricing.read')
  async getPriceList(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const priceList = await this.prisma.priceList.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { items: { orderBy: [{ effectiveDate: 'desc' }] } },
    });
    if (!priceList) throw new NotFoundException('Price list not found');
    return { priceList };
  }

  @Post('price-lists')
  @RequirePermissions('sales.pricing.create')
  async createPriceList(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreatePriceListDto,
  ) {
    const priceList = await this.prisma.$transaction(async (tx) => {
      const pl = await tx.priceList.create({
        data: { tenantId: req.user.tenantId, code: body.code, name: body.name },
      });
      if (body.items && body.items.length > 0) {
        await tx.priceListItem.createMany({
          data: body.items.map((it) => ({
            tenantId: req.user.tenantId,
            priceListId: pl.id,
            itemCode: it.itemCode,
            uomCode: it.uomCode,
            unitPrice: it.unitPrice,
            effectiveDate: new Date(it.effectiveDate),
            endDate: it.endDate ? new Date(it.endDate) : undefined,
            customerId: it.customerId,
          })),
        });
      }
      return pl;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'PriceList',
      entityId: priceList.id,
    });

    return { priceList };
  }

  @Patch('price-lists/:id')
  @RequirePermissions('sales.pricing.update')
  async updatePriceList(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdatePriceListDto,
  ) {
    const exists = await this.prisma.priceList.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Price list not found');

    const priceList = await this.prisma.$transaction(async (tx) => {
      const pl = await tx.priceList.update({
        where: { id },
        data: { name: body.name ?? undefined },
      });
      if (body.items) {
        await tx.priceListItem.deleteMany({
          where: { tenantId: req.user.tenantId, priceListId: id },
        });
        if (body.items.length > 0) {
          await tx.priceListItem.createMany({
            data: body.items.map((it) => ({
              tenantId: req.user.tenantId,
              priceListId: id,
              itemCode: it.itemCode,
              uomCode: it.uomCode,
              unitPrice: it.unitPrice,
              effectiveDate: new Date(it.effectiveDate),
              endDate: it.endDate ? new Date(it.endDate) : undefined,
              customerId: it.customerId,
            })),
          });
        }
      }
      return pl;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'PriceList',
      entityId: priceList.id,
    });

    return { priceList };
  }

  @Get('price-rules')
  @RequirePermissions('sales.pricing.read')
  async listPriceRules(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('isActive') isActive?: string,
  ) {
    const priceRules = await this.prisma.priceRule.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(typeof isActive === 'string'
          ? { isActive: isActive === 'true' }
          : {}),
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
                { itemCode: { contains: q, mode: 'insensitive' } },
                { customerGroup: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [
        { isActive: 'desc' },
        { priority: 'asc' },
        { createdAt: 'desc' },
      ],
      include: { customer: true },
      take: 200,
    });
    return { priceRules };
  }

  @Get('price-rules/:id')
  @RequirePermissions('sales.pricing.read')
  async getPriceRule(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const priceRule = await this.prisma.priceRule.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { customer: true },
    });
    if (!priceRule) throw new NotFoundException('Price rule not found');
    return { priceRule };
  }

  @Post('price-rules')
  @RequirePermissions('sales.pricing.create')
  async createPriceRule(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreatePriceRuleDto,
  ) {
    if (body.customerId) {
      const customer = await this.prisma.customer.findFirst({
        where: { id: body.customerId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!customer) throw new NotFoundException('Customer not found');
    }

    const priceRule = await this.prisma.priceRule.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        priority: body.priority ? parseInt(body.priority, 10) : undefined,
        itemCode: body.itemCode,
        uomCode: body.uomCode,
        unitPrice: body.unitPrice,
        effectiveDate: new Date(body.effectiveDate),
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        customerId: body.customerId,
        customerGroup: body.customerGroup,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'PriceRule',
      entityId: priceRule.id,
    });

    return { priceRule };
  }

  @Patch('price-rules/:id')
  @RequirePermissions('sales.pricing.update')
  async updatePriceRule(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdatePriceRuleDto,
  ) {
    const exists = await this.prisma.priceRule.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Price rule not found');

    if (body.customerId) {
      const customer = await this.prisma.customer.findFirst({
        where: { id: body.customerId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!customer) throw new NotFoundException('Customer not found');
    }

    const priceRule = await this.prisma.priceRule.update({
      where: { id },
      data: {
        name: body.name ?? undefined,
        priority: body.priority ? parseInt(body.priority, 10) : undefined,
        itemCode: body.itemCode ?? undefined,
        uomCode: body.uomCode ?? undefined,
        unitPrice: body.unitPrice ?? undefined,
        effectiveDate: body.effectiveDate
          ? new Date(body.effectiveDate)
          : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        customerId: body.customerId ?? undefined,
        customerGroup: body.customerGroup ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'PriceRule',
      entityId: priceRule.id,
    });

    return { priceRule };
  }

  @Patch('price-rules/:id/deactivate')
  @RequirePermissions('sales.pricing.update')
  async deactivatePriceRule(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const exists = await this.prisma.priceRule.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, isActive: true },
    });
    if (!exists) throw new NotFoundException('Price rule not found');

    const priceRule = await this.prisma.priceRule.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'PriceRule',
      entityId: priceRule.id,
    });

    return { priceRule };
  }

  @Get('discount-rules')
  @RequirePermissions('sales.pricing.read')
  async listDiscountRules(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('isActive') isActive?: string,
  ) {
    const discountRules = await this.prisma.discountRule.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(typeof isActive === 'string'
          ? { isActive: isActive === 'true' }
          : {}),
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
                { itemCode: { contains: q, mode: 'insensitive' } },
                { customerGroup: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [
        { isActive: 'desc' },
        { priority: 'asc' },
        { createdAt: 'desc' },
      ],
      include: { customer: true },
      take: 200,
    });
    return { discountRules };
  }

  @Get('discount-rules/:id')
  @RequirePermissions('sales.pricing.read')
  async getDiscountRule(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const discountRule = await this.prisma.discountRule.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { customer: true },
    });
    if (!discountRule) throw new NotFoundException('Discount rule not found');
    return { discountRule };
  }

  @Post('discount-rules')
  @RequirePermissions('sales.pricing.create')
  async createDiscountRule(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateDiscountRuleDto,
  ) {
    if (body.customerId) {
      const customer = await this.prisma.customer.findFirst({
        where: { id: body.customerId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!customer) throw new NotFoundException('Customer not found');
    }

    const discountRule = await this.prisma.discountRule.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        priority: body.priority ? parseInt(body.priority, 10) : undefined,
        itemCode: body.itemCode,
        uomCode: body.uomCode,
        discountPercent: body.discountPercent,
        effectiveDate: new Date(body.effectiveDate),
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        customerId: body.customerId,
        customerGroup: body.customerGroup,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'DiscountRule',
      entityId: discountRule.id,
    });

    return { discountRule };
  }

  @Patch('discount-rules/:id')
  @RequirePermissions('sales.pricing.update')
  async updateDiscountRule(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateDiscountRuleDto,
  ) {
    const exists = await this.prisma.discountRule.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Discount rule not found');

    if (body.customerId) {
      const customer = await this.prisma.customer.findFirst({
        where: { id: body.customerId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!customer) throw new NotFoundException('Customer not found');
    }

    const discountRule = await this.prisma.discountRule.update({
      where: { id },
      data: {
        name: body.name ?? undefined,
        priority: body.priority ? parseInt(body.priority, 10) : undefined,
        itemCode: body.itemCode ?? undefined,
        uomCode: body.uomCode ?? undefined,
        discountPercent: body.discountPercent ?? undefined,
        effectiveDate: body.effectiveDate
          ? new Date(body.effectiveDate)
          : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        customerId: body.customerId ?? undefined,
        customerGroup: body.customerGroup ?? undefined,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'DiscountRule',
      entityId: discountRule.id,
    });

    return { discountRule };
  }

  @Patch('discount-rules/:id/deactivate')
  @RequirePermissions('sales.pricing.update')
  async deactivateDiscountRule(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const exists = await this.prisma.discountRule.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true, isActive: true },
    });
    if (!exists) throw new NotFoundException('Discount rule not found');

    const discountRule = await this.prisma.discountRule.update({
      where: { id },
      data: { isActive: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'DiscountRule',
      entityId: discountRule.id,
    });

    return { discountRule };
  }
}
