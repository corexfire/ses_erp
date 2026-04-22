import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { ProjectController } from './project.controller';
import { TenderController } from './tender.controller';
import { BillingController } from './billing/billing.controller';
import { SiteController } from './site.controller';
import { CostController } from './cost.controller';

import { TaskCategoryController } from './task-category.controller';
import { ProjectBudgetController } from './budget.controller';
import { ProjectSiteController } from './site-master.controller';
import { ProjectExpansionController } from './expansion.controller';

@Module({
  providers: [AuditService],
  controllers: [
    ProjectController,
    TenderController,
    BillingController,
    SiteController,
    CostController,
    TaskCategoryController,
    ProjectBudgetController,
    ProjectSiteController,
    ProjectExpansionController,
  ],
})
export class ProjectModule {}