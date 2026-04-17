"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const company_profile_controller_1 = require("./company-profile/company-profile.controller");
const branches_controller_1 = require("./branches/branches.controller");
const currencies_controller_1 = require("./currencies/currencies.controller");
const fiscal_years_controller_1 = require("./fiscal-years/fiscal-years.controller");
const uoms_controller_1 = require("./uoms/uoms.controller");
const coa_controller_1 = require("./coa/coa.controller");
const cost_centers_controller_1 = require("./cost-centers/cost-centers.controller");
const profit_centers_controller_1 = require("./profit-centers/profit-centers.controller");
const tax_controller_1 = require("./tax/tax.controller");
const audit_logs_controller_1 = require("./audit/audit-logs.controller");
const users_controller_1 = require("./users/users.controller");
const roles_controller_1 = require("./roles/roles.controller");
const permissions_controller_1 = require("./permissions/permissions.controller");
const workflows_controller_1 = require("./workflows/workflows.controller");
const query_controller_1 = require("./query.controller");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        providers: [audit_service_1.AuditService],
        controllers: [
            company_profile_controller_1.CompanyProfileController,
            branches_controller_1.BranchesController,
            currencies_controller_1.CurrenciesController,
            uoms_controller_1.UomsController,
            fiscal_years_controller_1.FiscalYearsController,
            coa_controller_1.CoaController,
            cost_centers_controller_1.CostCentersController,
            profit_centers_controller_1.ProfitCentersController,
            tax_controller_1.TaxController,
            audit_logs_controller_1.AuditLogsController,
            users_controller_1.UsersController,
            roles_controller_1.RolesController,
            permissions_controller_1.PermissionsController,
            workflows_controller_1.WorkflowsController,
            query_controller_1.QueryController,
        ],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map