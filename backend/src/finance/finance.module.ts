import { Module } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { ApController } from './ap/ap.controller';
import { ArController } from './ar/ar.controller';
import { AssetsController } from './assets/assets.controller';
import { AssetDisposalController } from './asset-disposal/asset-disposal.controller';
import { BankController } from './bank/bank.controller';
import { BankReconciliationController } from './bank-reconciliation/bank-reconciliation.controller';
import { BudgetController } from './budget/budget.controller';
import { CashController } from './cash/cash.controller';
import { CostCenterAllocationController } from './allocation/cost-center-allocation.controller';
import { CoaController } from './coa/coa.controller';
import { CustomerReceiptController } from './customer-receipt/customer-receipt.controller';
import { InterCompanyController } from './inter-company/inter-company.controller';
import { JournalController } from './journal/journal.controller';
import { PettyCashController } from './petty-cash/petty-cash.controller';
import { PaymentRequestController } from './payment-request/payment-request.controller';
import { VendorPaymentController } from './vendor-payment/vendor-payment.controller';
import { FiscalController, PeriodController } from './periods/fiscal.controller';
import { CostCenterController } from './periods/cost-center.controller';
import { ProfitCenterController } from './periods/profit-center.controller';
import { TaxCodeController } from './periods/tax-code.controller';
import { ReportsController } from './reports/reports.controller';
import { 
  FakturKeluaranController, 
  FakturMasukanController, 
  NsfpController, 
  PpnMasaController,
  EBupotController,
  Pph21Controller,
  BuktiPotongController,
  IdBillingController,
  EqualizationController,
  FiscalReconciliationController,
} from './tax-compliance/tax-compliance.controller';

import { ThreeWayMatchingController } from './vendor-reconciliation/three-way-matching.controller';

@Module({
  providers: [AuditService],
  controllers: [
    CoaController,
    JournalController,
    ApController,
    ArController,
    AssetsController,
    AssetDisposalController,
    BankController,
    BankReconciliationController,
    BudgetController,
    CashController,
    CostCenterAllocationController,
    CustomerReceiptController,
    InterCompanyController,
    PettyCashController,
    PaymentRequestController,
    VendorPaymentController,
    FiscalController,
    PeriodController,
    CostCenterController,
    ProfitCenterController,
    TaxCodeController,
    ReportsController,
    FakturKeluaranController,
    FakturMasukanController,
    NsfpController,
    PpnMasaController,
    EBupotController,
    Pph21Controller,
    BuktiPotongController,
    IdBillingController,
    EqualizationController,
    FiscalReconciliationController,
    ThreeWayMatchingController,
  ],
})
export class FinanceModule {}