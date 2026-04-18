"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcurementModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const landed_costs_controller_1 = require("./landed-costs/landed-costs.controller");
const purchase_invoices_controller_1 = require("./purchase-invoices/purchase-invoices.controller");
const purchase_orders_controller_1 = require("./purchase-orders/purchase-orders.controller");
const purchase_requisitions_controller_1 = require("./purchase-requisitions/purchase-requisitions.controller");
const purchase_returns_controller_1 = require("./purchase-returns/purchase-returns.controller");
const rfqs_controller_1 = require("./rfqs/rfqs.controller");
const suppliers_controller_1 = require("./suppliers/suppliers.controller");
const vendor_portal_controller_1 = require("./portal/vendor-portal.controller");
let ProcurementModule = class ProcurementModule {
};
exports.ProcurementModule = ProcurementModule;
exports.ProcurementModule = ProcurementModule = __decorate([
    (0, common_1.Module)({
        providers: [audit_service_1.AuditService],
        controllers: [
            suppliers_controller_1.SuppliersController,
            purchase_requisitions_controller_1.PurchaseRequisitionsController,
            rfqs_controller_1.RfqsController,
            purchase_orders_controller_1.PurchaseOrdersController,
            purchase_invoices_controller_1.PurchaseInvoicesController,
            landed_costs_controller_1.LandedCostsController,
            purchase_returns_controller_1.PurchaseReturnsController,
            vendor_portal_controller_1.VendorPortalController,
        ],
    })
], ProcurementModule);
//# sourceMappingURL=procurement.module.js.map