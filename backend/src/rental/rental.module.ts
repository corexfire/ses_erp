import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { RentalContractsController } from './contracts/contracts.controller';
import { RentalBillingController } from './billing/billing.controller';
import { RentalMaintenanceController } from './maintenance/maintenance.controller';
import { RentalDepreciationController } from './depreciation/depreciation.controller';

@Module({
  providers: [AuditService],
  controllers: [RentalContractsController, RentalBillingController, RentalMaintenanceController, RentalDepreciationController],
})
export class RentalModule {}
