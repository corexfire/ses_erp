"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const batches_controller_1 = require("./batches/batches.controller");
const grns_controller_1 = require("./receipts/grns.controller");
const issues_controller_1 = require("./issues/issues.controller");
const items_controller_1 = require("./items/items.controller");
const packing_controller_1 = require("./packing/packing.controller");
const picking_controller_1 = require("./picking/picking.controller");
const planning_controller_1 = require("./planning/planning.controller");
const ai_forecast_controller_1 = require("./planning/ai-forecast.controller");
const putaway_controller_1 = require("./putaway/putaway.controller");
const qc_controller_1 = require("./qc/qc.controller");
const stock_counts_controller_1 = require("./stock-counts/stock-counts.controller");
const stock_controller_1 = require("./stock/stock.controller");
const transfers_controller_1 = require("./transfers/transfers.controller");
const valuation_controller_1 = require("./valuation/valuation.controller");
const warehouses_controller_1 = require("./warehouses/warehouses.controller");
const qms_module_1 = require("../qms/qms.module");
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [qms_module_1.QmsModule],
        providers: [audit_service_1.AuditService],
        controllers: [
            items_controller_1.ItemsController,
            warehouses_controller_1.WarehousesController,
            stock_controller_1.StockController,
            grns_controller_1.GrnsController,
            issues_controller_1.IssuesController,
            putaway_controller_1.PutawayController,
            picking_controller_1.PickingController,
            packing_controller_1.PackingController,
            transfers_controller_1.TransfersController,
            stock_counts_controller_1.StockCountsController,
            qc_controller_1.QcController,
            valuation_controller_1.ValuationController,
            batches_controller_1.BatchesController,
            batches_controller_1.SerialsController,
            planning_controller_1.PlanningController,
            ai_forecast_controller_1.AiForecastController,
        ],
    })
], InventoryModule);
//# sourceMappingURL=inventory.module.js.map