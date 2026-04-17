import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { CarriersController } from './shipping/carriers.controller';
import { ShipmentsController } from './shipping/shipments.controller';
import { CommissionsController } from './commissions/commissions.controller';
import { SalesInvoicesController } from './invoices/sales-invoices.controller';
import { SalesOrdersController } from './orders/sales-orders.controller';
import { PricingController } from './pricing/pricing.controller';
import { SalesQuotationsController } from './quotations/sales-quotations.controller';
import { SalesReturnsController } from './returns/sales-returns.controller';
import { SubscriptionsController } from './subscriptions/subscriptions.controller';

@Module({
  providers: [AuditService],
  controllers: [
    SalesQuotationsController,
    SalesOrdersController,
    PricingController,
    SalesInvoicesController,
    SalesReturnsController,
    CommissionsController,
    CarriersController,
    ShipmentsController,
    SubscriptionsController,
  ],
})
export class SalesModule {}
