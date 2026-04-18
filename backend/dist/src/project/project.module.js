"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const project_controller_1 = require("./project.controller");
const tender_controller_1 = require("./tender.controller");
const billing_controller_1 = require("./billing/billing.controller");
const site_controller_1 = require("./site.controller");
const cost_controller_1 = require("./cost.controller");
const task_category_controller_1 = require("./task-category.controller");
const budget_controller_1 = require("./budget.controller");
const site_master_controller_1 = require("./site-master.controller");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        providers: [audit_service_1.AuditService],
        controllers: [
            project_controller_1.ProjectController,
            tender_controller_1.TenderController,
            billing_controller_1.BillingController,
            site_controller_1.SiteController,
            cost_controller_1.CostController,
            task_category_controller_1.TaskCategoryController,
            budget_controller_1.ProjectBudgetController,
            site_master_controller_1.ProjectSiteController,
        ],
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map