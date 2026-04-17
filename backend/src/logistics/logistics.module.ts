import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { FleetController } from './fleet/fleet.controller';
import { DriverController } from './driver/driver.controller';
import { TransporterController } from './transporter/transporter.controller';
import { RouteController } from './route/route.controller';
import { TripController } from './trip/trip.controller';
import { DeliveryController } from './delivery/delivery.controller';
import { PodController } from './pod/pod.controller';
import { ExceptionController } from './exception/exception.controller';
import { WarehouseController } from './warehouse/warehouse.controller';
import { PackingController } from './packing/packing.controller';
import { CostingController } from './costing/costing.controller';
import { DashboardController } from './dashboard/dashboard.controller';

@Module({
  providers: [AuditService],
  controllers: [
    FleetController,
    DriverController,
    TransporterController,
    RouteController,
    TripController,
    DeliveryController,
    PodController,
    ExceptionController,
    WarehouseController,
    PackingController,
    CostingController,
    DashboardController,
  ],
})
export class LogisticsModule {}
