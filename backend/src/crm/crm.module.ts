import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { CustomersController } from './customers/customers.controller';
import { LeadsController } from './leads/leads.controller';
import { OpportunitiesController } from './opportunities/opportunities.controller';
import { ActivitiesController } from './activities/activities.controller';
import { CampaignsController } from './campaigns/campaigns.controller';
import { TicketsController } from './tickets/tickets.controller';
import { CrmUsersController } from './users/crm-users.controller';
import { CrmDashboardController } from './dashboard/crm-dashboard.controller';
import { CrmMyWorkController } from './my-work/crm-my-work.controller';
import { CrmPortalController } from './portal/portal.controller';

@Module({
  providers: [AuditService],
  controllers: [
    LeadsController,
    CustomersController,
    OpportunitiesController,
    ActivitiesController,
    CampaignsController,
    TicketsController,
    CrmUsersController,
    CrmDashboardController,
    CrmMyWorkController,
    CrmPortalController,
  ],
})
export class CrmModule {}
