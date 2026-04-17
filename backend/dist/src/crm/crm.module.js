"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const customers_controller_1 = require("./customers/customers.controller");
const leads_controller_1 = require("./leads/leads.controller");
const opportunities_controller_1 = require("./opportunities/opportunities.controller");
const activities_controller_1 = require("./activities/activities.controller");
const campaigns_controller_1 = require("./campaigns/campaigns.controller");
const tickets_controller_1 = require("./tickets/tickets.controller");
const crm_users_controller_1 = require("./users/crm-users.controller");
const crm_dashboard_controller_1 = require("./dashboard/crm-dashboard.controller");
const crm_my_work_controller_1 = require("./my-work/crm-my-work.controller");
const portal_controller_1 = require("./portal/portal.controller");
let CrmModule = class CrmModule {
};
exports.CrmModule = CrmModule;
exports.CrmModule = CrmModule = __decorate([
    (0, common_1.Module)({
        providers: [audit_service_1.AuditService],
        controllers: [
            leads_controller_1.LeadsController,
            customers_controller_1.CustomersController,
            opportunities_controller_1.OpportunitiesController,
            activities_controller_1.ActivitiesController,
            campaigns_controller_1.CampaignsController,
            tickets_controller_1.TicketsController,
            crm_users_controller_1.CrmUsersController,
            crm_dashboard_controller_1.CrmDashboardController,
            crm_my_work_controller_1.CrmMyWorkController,
            portal_controller_1.CrmPortalController,
        ],
    })
], CrmModule);
//# sourceMappingURL=crm.module.js.map