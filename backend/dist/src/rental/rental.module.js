"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const contracts_controller_1 = require("./contracts/contracts.controller");
const billing_controller_1 = require("./billing/billing.controller");
const maintenance_controller_1 = require("./maintenance/maintenance.controller");
const depreciation_controller_1 = require("./depreciation/depreciation.controller");
let RentalModule = class RentalModule {
};
exports.RentalModule = RentalModule;
exports.RentalModule = RentalModule = __decorate([
    (0, common_1.Module)({
        providers: [audit_service_1.AuditService],
        controllers: [contracts_controller_1.RentalContractsController, billing_controller_1.RentalBillingController, maintenance_controller_1.RentalMaintenanceController, depreciation_controller_1.RentalDepreciationController],
    })
], RentalModule);
//# sourceMappingURL=rental.module.js.map