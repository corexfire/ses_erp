"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceModule = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../audit/audit.service");
const ap_controller_1 = require("./ap/ap.controller");
const ar_controller_1 = require("./ar/ar.controller");
const assets_controller_1 = require("./assets/assets.controller");
const asset_disposal_controller_1 = require("./asset-disposal/asset-disposal.controller");
const bank_controller_1 = require("./bank/bank.controller");
const bank_reconciliation_controller_1 = require("./bank-reconciliation/bank-reconciliation.controller");
const budget_controller_1 = require("./budget/budget.controller");
const cash_controller_1 = require("./cash/cash.controller");
const cost_center_allocation_controller_1 = require("./allocation/cost-center-allocation.controller");
const coa_controller_1 = require("./coa/coa.controller");
const customer_receipt_controller_1 = require("./customer-receipt/customer-receipt.controller");
const inter_company_controller_1 = require("./inter-company/inter-company.controller");
const journal_controller_1 = require("./journal/journal.controller");
const petty_cash_controller_1 = require("./petty-cash/petty-cash.controller");
const payment_request_controller_1 = require("./payment-request/payment-request.controller");
const vendor_payment_controller_1 = require("./vendor-payment/vendor-payment.controller");
const fiscal_controller_1 = require("./periods/fiscal.controller");
const cost_center_controller_1 = require("./periods/cost-center.controller");
const profit_center_controller_1 = require("./periods/profit-center.controller");
const tax_code_controller_1 = require("./periods/tax-code.controller");
const reports_controller_1 = require("./reports/reports.controller");
const tax_compliance_controller_1 = require("./tax-compliance/tax-compliance.controller");
let FinanceModule = class FinanceModule {
};
exports.FinanceModule = FinanceModule;
exports.FinanceModule = FinanceModule = __decorate([
    (0, common_1.Module)({
        providers: [audit_service_1.AuditService],
        controllers: [
            coa_controller_1.CoaController,
            journal_controller_1.JournalController,
            ap_controller_1.ApController,
            ar_controller_1.ArController,
            assets_controller_1.AssetsController,
            asset_disposal_controller_1.AssetDisposalController,
            bank_controller_1.BankController,
            bank_reconciliation_controller_1.BankReconciliationController,
            budget_controller_1.BudgetController,
            cash_controller_1.CashController,
            cost_center_allocation_controller_1.CostCenterAllocationController,
            customer_receipt_controller_1.CustomerReceiptController,
            inter_company_controller_1.InterCompanyController,
            petty_cash_controller_1.PettyCashController,
            payment_request_controller_1.PaymentRequestController,
            vendor_payment_controller_1.VendorPaymentController,
            fiscal_controller_1.FiscalController,
            fiscal_controller_1.PeriodController,
            cost_center_controller_1.CostCenterController,
            profit_center_controller_1.ProfitCenterController,
            tax_code_controller_1.TaxCodeController,
            reports_controller_1.ReportsController,
            tax_compliance_controller_1.FakturKeluaranController,
            tax_compliance_controller_1.FakturMasukanController,
            tax_compliance_controller_1.NsfpController,
            tax_compliance_controller_1.PpnMasaController,
            tax_compliance_controller_1.EBupotController,
            tax_compliance_controller_1.Pph21Controller,
            tax_compliance_controller_1.BuktiPotongController,
            tax_compliance_controller_1.IdBillingController,
            tax_compliance_controller_1.EqualizationController,
            tax_compliance_controller_1.FiscalReconciliationController,
        ],
    })
], FinanceModule);
//# sourceMappingURL=finance.module.js.map