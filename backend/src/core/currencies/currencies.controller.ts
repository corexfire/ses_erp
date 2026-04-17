import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { RequirePermissions } from '../../auth/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('core')
export class CurrenciesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('currencies')
  @RequirePermissions('core.currency.read')
  async listCurrencies(@Req() req: FastifyRequest & { user: AuthUser }) {
    const currencies = await this.prisma.currency.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ isBase: 'desc' }, { code: 'asc' }],
    });
    return { currencies };
  }

  @Post('currencies')
  @RequirePermissions('core.currency.create')
  async createCurrency(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateCurrencyDto,
  ) {
    const currency = await this.prisma.currency.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        name: body.name,
        symbol: body.symbol,
        isBase: body.isBase ?? false,
      },
    });

    if (currency.isBase) {
      await this.prisma.currency.updateMany({
        where: { tenantId: req.user.tenantId, NOT: { id: currency.id } },
        data: { isBase: false },
      });
    }

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Currency',
      entityId: currency.id,
    });

    return { currency };
  }

  @Patch('currencies/:id/deactivate')
  @RequirePermissions('core.currency.deactivate')
  async deactivateCurrency(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const currency = await this.prisma.currency.update({
      where: { id },
      data: { isActive: false, isBase: false },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'deactivate',
      entity: 'Currency',
      entityId: currency.id,
    });

    return { currency };
  }

  @Get('exchange-rates')
  @RequirePermissions('core.exchange_rate.read')
  async listRates(@Req() req: FastifyRequest & { user: AuthUser }) {
    const exchangeRates = await this.prisma.exchangeRate.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ rateDate: 'desc' }],
      include: { baseCurrency: true, quoteCurrency: true },
      take: 200,
    });
    return { exchangeRates };
  }

  @Post('exchange-rates')
  @RequirePermissions('core.exchange_rate.create')
  async createRate(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateExchangeRateDto,
  ) {
    const exchangeRate = await this.prisma.exchangeRate.create({
      data: {
        tenantId: req.user.tenantId,
        baseCurrencyId: body.baseCurrencyId,
        quoteCurrencyId: body.quoteCurrencyId,
        rate: body.rate,
        rateDate: body.rateDate,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'ExchangeRate',
      entityId: exchangeRate.id,
    });

    return { exchangeRate };
  }
}
