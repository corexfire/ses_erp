"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturingModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const bom_controller_1 = require("./bom/bom.controller");
const work_orders_controller_1 = require("./work-orders/work-orders.controller");
const production_controller_1 = require("./production/production.controller");
const quality_controller_1 = require("./quality/quality.controller");
const maintenance_controller_1 = require("./maintenance/maintenance.controller");
const planning_controller_1 = require("./planning/planning.controller");
const shop_floor_controller_1 = require("./shop-floor/shop-floor.controller");
const costing_controller_1 = require("./costing/costing.controller");
let ManufacturingModule = class ManufacturingModule {
};
exports.ManufacturingModule = ManufacturingModule;
exports.ManufacturingModule = ManufacturingModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            bom_controller_1.BomController,
            work_orders_controller_1.WorkOrdersController,
            production_controller_1.ProductionController,
            quality_controller_1.QualityController,
            maintenance_controller_1.MaintenanceController,
            planning_controller_1.PlanningController,
            shop_floor_controller_1.ShopFloorController,
            costing_controller_1.CostingController,
        ],
        providers: [audit_service_1.AuditService],
    })
], ManufacturingModule);
//# sourceMappingURL=manufacturing.module.js.map