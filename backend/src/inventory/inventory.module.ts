import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { BatchesController, SerialsController } from './batches/batches.controller';
import { GrnsController } from './receipts/grns.controller';
import { IssuesController } from './issues/issues.controller';
import { ItemsController } from './items/items.controller';
import { PackingController } from './packing/packing.controller';
import { PickingController } from './picking/picking.controller';
import { PlanningController } from './planning/planning.controller';
import { AiForecastController } from './planning/ai-forecast.controller';
import { PutawayController } from './putaway/putaway.controller';
import { QcController } from './qc/qc.controller';
import { StockCountsController } from './stock-counts/stock-counts.controller';
import { StockController } from './stock/stock.controller';
import { TransfersController } from './transfers/transfers.controller';
import { ValuationController } from './valuation/valuation.controller';
import { WarehousesController } from './warehouses/warehouses.controller';
import { QmsModule } from '../qms/qms.module';

@Module({
  imports: [QmsModule],
  providers: [AuditService],
  controllers: [
    ItemsController,
    WarehousesController,
    StockController,
    GrnsController,
    IssuesController,
    PutawayController,
    PickingController,
    PackingController,
    TransfersController,
    StockCountsController,
    QcController,
    ValuationController,
    BatchesController,
    SerialsController,
    PlanningController,
    AiForecastController,
  ],
})
export class InventoryModule {}
