"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const audit_service_1 = require("./audit/audit.service");
const core_module_1 = require("./core/core.module");
const crm_module_1 = require("./crm/crm.module");
const sales_module_1 = require("./sales/sales.module");
const procurement_module_1 = require("./procurement/procurement.module");
const inventory_module_1 = require("./inventory/inventory.module");
const manufacturing_module_1 = require("./manufacturing/manufacturing.module");
const finance_module_1 = require("./finance/finance.module");
const hris_module_1 = require("./hris/hris.module");
const logistics_module_1 = require("./logistics/logistics.module");
const project_module_1 = require("./project/project.module");
const workflow_module_1 = require("./workflow/workflow.module");
const notification_module_1 = require("./notification/notification.module");
const rental_module_1 = require("./rental/rental.module");
const qms_module_1 = require("./qms/qms.module");
const fsm_module_1 = require("./fsm/fsm.module");
const construction_module_1 = require("./construction/construction.module");
const support_module_1 = require("./support/support.module");
const ecommerce_module_1 = require("./ecommerce/ecommerce.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            core_module_1.CoreModule,
            crm_module_1.CrmModule,
            sales_module_1.SalesModule,
            procurement_module_1.ProcurementModule,
            inventory_module_1.InventoryModule,
            manufacturing_module_1.ManufacturingModule,
            finance_module_1.FinanceModule,
            hris_module_1.HrisModule,
            logistics_module_1.LogisticsModule,
            project_module_1.ProjectModule,
            workflow_module_1.WorkflowModule,
            notification_module_1.NotificationModule,
            rental_module_1.RentalModule,
            qms_module_1.QmsModule,
            fsm_module_1.FsmModule,
            construction_module_1.ConstructionModule,
            support_module_1.SupportModule,
            ecommerce_module_1.EcommerceModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, audit_service_1.AuditService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map