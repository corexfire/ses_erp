import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { BomController } from './bom/bom.controller';
import { WorkOrdersController } from './work-orders/work-orders.controller';
import { ProductionController } from './production/production.controller';
import { QualityController } from './quality/quality.controller';
import { MaintenanceController } from './maintenance/maintenance.controller';
import { PlanningController } from './planning/planning.controller';
import { ShopFloorController } from './shop-floor/shop-floor.controller';
import { CostingController } from './costing/costing.controller';

@Module({
  controllers: [
    BomController,
    WorkOrdersController,
    ProductionController,
    QualityController,
    MaintenanceController,
    PlanningController,
    ShopFloorController,
    CostingController,
  ],
  providers: [AuditService],
})
export class ManufacturingModule {}