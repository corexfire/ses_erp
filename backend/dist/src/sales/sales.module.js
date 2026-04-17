"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const carriers_controller_1 = require("./shipping/carriers.controller");
const shipments_controller_1 = require("./shipping/shipments.controller");
const commissions_controller_1 = require("./commissions/commissions.controller");
const sales_invoices_controller_1 = require("./invoices/sales-invoices.controller");
const sales_orders_controller_1 = require("./orders/sales-orders.controller");
const pricing_controller_1 = require("./pricing/pricing.controller");
const sales_quotations_controller_1 = require("./quotations/sales-quotations.controller");
const sales_returns_controller_1 = require("./returns/sales-returns.controller");
const subscriptions_controller_1 = require("./subscriptions/subscriptions.controller");
let SalesModule = class SalesModule {
};
exports.SalesModule = SalesModule;
exports.SalesModule = SalesModule = __decorate([
    (0, common_1.Module)({
        providers: [audit_service_1.AuditService],
        controllers: [
            sales_quotations_controller_1.SalesQuotationsController,
            sales_orders_controller_1.SalesOrdersController,
            pricing_controller_1.PricingController,
            sales_invoices_controller_1.SalesInvoicesController,
            sales_returns_controller_1.SalesReturnsController,
            commissions_controller_1.CommissionsController,
            carriers_controller_1.CarriersController,
            shipments_controller_1.ShipmentsController,
            subscriptions_controller_1.SubscriptionsController,
        ],
    })
], SalesModule);
//# sourceMappingURL=sales.module.js.map