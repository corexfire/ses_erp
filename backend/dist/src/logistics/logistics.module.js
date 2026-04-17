"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogisticsModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const fleet_controller_1 = require("./fleet/fleet.controller");
const driver_controller_1 = require("./driver/driver.controller");
const transporter_controller_1 = require("./transporter/transporter.controller");
const route_controller_1 = require("./route/route.controller");
const trip_controller_1 = require("./trip/trip.controller");
const delivery_controller_1 = require("./delivery/delivery.controller");
const pod_controller_1 = require("./pod/pod.controller");
const exception_controller_1 = require("./exception/exception.controller");
const warehouse_controller_1 = require("./warehouse/warehouse.controller");
const packing_controller_1 = require("./packing/packing.controller");
const costing_controller_1 = require("./costing/costing.controller");
const dashboard_controller_1 = require("./dashboard/dashboard.controller");
let LogisticsModule = class LogisticsModule {
};
exports.LogisticsModule = LogisticsModule;
exports.LogisticsModule = LogisticsModule = __decorate([
    (0, common_1.Module)({
        providers: [audit_service_1.AuditService],
        controllers: [
            fleet_controller_1.FleetController,
            driver_controller_1.DriverController,
            transporter_controller_1.TransporterController,
            route_controller_1.RouteController,
            trip_controller_1.TripController,
            delivery_controller_1.DeliveryController,
            pod_controller_1.PodController,
            exception_controller_1.ExceptionController,
            warehouse_controller_1.WarehouseController,
            packing_controller_1.PackingController,
            costing_controller_1.CostingController,
            dashboard_controller_1.DashboardController,
        ],
    })
], LogisticsModule);
//# sourceMappingURL=logistics.module.js.map