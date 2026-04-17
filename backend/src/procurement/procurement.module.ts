import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { LandedCostsController } from './landed-costs/landed-costs.controller';
import { PurchaseInvoicesController } from './purchase-invoices/purchase-invoices.controller';
import { PurchaseOrdersController } from './purchase-orders/purchase-orders.controller';
import { PurchaseRequisitionsController } from './purchase-requisitions/purchase-requisitions.controller';
import { PurchaseReturnsController } from './purchase-returns/purchase-returns.controller';
import { RfqsController } from './rfqs/rfqs.controller';
import { SuppliersController } from './suppliers/suppliers.controller';
import { VendorPortalController } from './portal/vendor-portal.controller';

@Module({
  providers: [AuditService],
  controllers: [
    SuppliersController,
    PurchaseRequisitionsController,
    RfqsController,
    PurchaseOrdersController,
    PurchaseInvoicesController,
    LandedCostsController,
    PurchaseReturnsController,
    VendorPortalController,
  ],
})
export class ProcurementModule {}
