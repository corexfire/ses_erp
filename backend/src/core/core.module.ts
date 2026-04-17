import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { CompanyProfileController } from './company-profile/company-profile.controller';
import { BranchesController } from './branches/branches.controller';
import { CurrenciesController } from './currencies/currencies.controller';
import { FiscalYearsController } from './fiscal-years/fiscal-years.controller';
import { UomsController } from './uoms/uoms.controller';
import { CoaController } from './coa/coa.controller';
import { CostCentersController } from './cost-centers/cost-centers.controller';
import { ProfitCentersController } from './profit-centers/profit-centers.controller';
import { TaxController } from './tax/tax.controller';
import { AuditLogsController } from './audit/audit-logs.controller';
import { UsersController } from './users/users.controller';
import { RolesController } from './roles/roles.controller';
import { PermissionsController } from './permissions/permissions.controller';
import { WorkflowsController } from './workflows/workflows.controller';
import { AnalyticsController } from './analytics/analytics.controller';
import { QueryController } from './query.controller';

@Module({
  providers: [AuditService],
  controllers: [
    CompanyProfileController,
    BranchesController,
    CurrenciesController,
    UomsController,
    FiscalYearsController,
    CoaController,
    CostCentersController,
    ProfitCentersController,
    TaxController,
    AuditLogsController,
    UsersController,
    RolesController,
    PermissionsController,
    WorkflowsController,
    AnalyticsController,
    QueryController,
  ],
})
export class CoreModule {}
