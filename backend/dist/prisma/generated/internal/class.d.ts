import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get tenant(): Prisma.TenantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get lead(): Prisma.LeadDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get customer(): Prisma.CustomerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get salesQuotation(): Prisma.SalesQuotationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get salesQuotationItem(): Prisma.SalesQuotationItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get salesOrder(): Prisma.SalesOrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get salesOrderItem(): Prisma.SalesOrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get salesInvoice(): Prisma.SalesInvoiceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get salesInvoiceItem(): Prisma.SalesInvoiceItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get salesReturn(): Prisma.SalesReturnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get salesReturnItem(): Prisma.SalesReturnItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get priceList(): Prisma.PriceListDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get priceListItem(): Prisma.PriceListItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get priceRule(): Prisma.PriceRuleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get discountRule(): Prisma.DiscountRuleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get carrier(): Prisma.CarrierDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get shipment(): Prisma.ShipmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get commissionScheme(): Prisma.CommissionSchemeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get commissionEntry(): Prisma.CommissionEntryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get supplier(): Prisma.SupplierDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get purchaseRequisition(): Prisma.PurchaseRequisitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get purchaseRequisitionItem(): Prisma.PurchaseRequisitionItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rfq(): Prisma.RfqDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rfqVendor(): Prisma.RfqVendorDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rfqItem(): Prisma.RfqItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get purchaseOrder(): Prisma.PurchaseOrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get purchaseOrderItem(): Prisma.PurchaseOrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get purchaseInvoice(): Prisma.PurchaseInvoiceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get purchaseInvoiceItem(): Prisma.PurchaseInvoiceItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get landedCostVoucher(): Prisma.LandedCostVoucherDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get landedCostAllocation(): Prisma.LandedCostAllocationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get purchaseReturn(): Prisma.PurchaseReturnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get purchaseReturnItem(): Prisma.PurchaseReturnItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get itemGroup(): Prisma.ItemGroupDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get item(): Prisma.ItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get itemUom(): Prisma.ItemUomDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get itemBarcode(): Prisma.ItemBarcodeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get warehouse(): Prisma.WarehouseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get binLocation(): Prisma.BinLocationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get stockLedger(): Prisma.StockLedgerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get goodsReceiptNote(): Prisma.GoodsReceiptNoteDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get goodsReceiptItem(): Prisma.GoodsReceiptItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get stockTransfer(): Prisma.StockTransferDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get stockTransferItem(): Prisma.StockTransferItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get stockCount(): Prisma.StockCountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get stockCountItem(): Prisma.StockCountItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get goodsIssueNote(): Prisma.GoodsIssueNoteDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get goodsIssueItem(): Prisma.GoodsIssueItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get putaway(): Prisma.PutawayDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get putawayItem(): Prisma.PutawayItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get picking(): Prisma.PickingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pickingItem(): Prisma.PickingItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get packing(): Prisma.PackingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get packingItem(): Prisma.PackingItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get qcInspection(): Prisma.QcInspectionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get qcInspectionItem(): Prisma.QcInspectionItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get itemBatch(): Prisma.ItemBatchDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get itemSerial(): Prisma.ItemSerialDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get valuationLayer(): Prisma.ValuationLayerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get opportunity(): Prisma.OpportunityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get salesActivity(): Prisma.SalesActivityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get marketingCampaign(): Prisma.MarketingCampaignDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get serviceTicket(): Prisma.ServiceTicketDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get role(): Prisma.RoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get permission(): Prisma.PermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userRole(): Prisma.UserRoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationTemplate(): Prisma.NotificationTemplateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationChannelConfig(): Prisma.NotificationChannelConfigDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationPreference(): Prisma.NotificationPreferenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationLog(): Prisma.NotificationLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationSchedule(): Prisma.NotificationScheduleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get companyProfile(): Prisma.CompanyProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get branch(): Prisma.BranchDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get currency(): Prisma.CurrencyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get exchangeRate(): Prisma.ExchangeRateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get uom(): Prisma.UomDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get uomConversion(): Prisma.UomConversionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get fiscalYear(): Prisma.FiscalYearDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get accountingPeriod(): Prisma.AccountingPeriodDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get coaAccount(): Prisma.CoaAccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get costCenter(): Prisma.CostCenterDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get profitCenter(): Prisma.ProfitCenterDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get journalEntry(): Prisma.JournalEntryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get journalEntryLine(): Prisma.JournalEntryLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get supplierInvoice(): Prisma.SupplierInvoiceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get supplierInvoiceLine(): Prisma.SupplierInvoiceLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get supplierInvoicePayment(): Prisma.SupplierInvoicePaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get customerInvoice(): Prisma.CustomerInvoiceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get customerInvoiceLine(): Prisma.CustomerInvoiceLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get customerInvoicePayment(): Prisma.CustomerInvoicePaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get fixedAsset(): Prisma.FixedAssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get fixedAssetDepreciation(): Prisma.FixedAssetDepreciationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get bankAccount(): Prisma.BankAccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get bankTransaction(): Prisma.BankTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get cashAccount(): Prisma.CashAccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get cashTransaction(): Prisma.CashTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get taxCode(): Prisma.TaxCodeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get costCenterAllocation(): Prisma.CostCenterAllocationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get interCompanyTransaction(): Prisma.InterCompanyTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get bankReconciliation(): Prisma.BankReconciliationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pettyCashReplenishment(): Prisma.PettyCashReplenishmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get customerReceipt(): Prisma.CustomerReceiptDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get vendorPayment(): Prisma.VendorPaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get paymentRequest(): Prisma.PaymentRequestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get assetDisposal(): Prisma.AssetDisposalDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get budget(): Prisma.BudgetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workflowDefinition(): Prisma.WorkflowDefinitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workflowStep(): Prisma.WorkflowStepDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workflowRule(): Prisma.WorkflowRuleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workflowInstance(): Prisma.WorkflowInstanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get approvalHistory(): Prisma.ApprovalHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get delegation(): Prisma.DelegationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get billOfMaterials(): Prisma.BillOfMaterialsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get billOfMaterialsItem(): Prisma.BillOfMaterialsItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workOrder(): Prisma.WorkOrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workOrderComponent(): Prisma.WorkOrderComponentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get workOrderOperation(): Prisma.WorkOrderOperationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productionIssue(): Prisma.ProductionIssueDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productionIssueItem(): Prisma.ProductionIssueItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productionReceipt(): Prisma.ProductionReceiptDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get inProcessQc(): Prisma.InProcessQcDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get equipment(): Prisma.EquipmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get maintenanceSchedule(): Prisma.MaintenanceScheduleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get maintenanceRequest(): Prisma.MaintenanceRequestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get mrpRun(): Prisma.MrpRunDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get mrpSuggestion(): Prisma.MrpSuggestionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productionCost(): Prisma.ProductionCostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get taxInvoice(): Prisma.TaxInvoiceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get nsfpRange(): Prisma.NsfpRangeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pphWithholding(): Prisma.PphWithholdingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get taxEqualization(): Prisma.TaxEqualizationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get idBilling(): Prisma.IdBillingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get employee(): Prisma.EmployeeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get organizationUnit(): Prisma.OrganizationUnitDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get attendance(): Prisma.AttendanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get shift(): Prisma.ShiftDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get payrollRun(): Prisma.PayrollRunDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get expenseClaim(): Prisma.ExpenseClaimDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get kpiEvaluation(): Prisma.KpiEvaluationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get recruitmentCandidate(): Prisma.RecruitmentCandidateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get fleetVehicle(): Prisma.FleetVehicleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get logisticsDriver(): Prisma.LogisticsDriverDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get transporter(): Prisma.TransporterDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get routeTemplate(): Prisma.RouteTemplateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tripPlan(): Prisma.TripPlanDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tripCheckpoint(): Prisma.TripCheckpointDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get deliveryOrder(): Prisma.DeliveryOrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get deliveryOrderItem(): Prisma.DeliveryOrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get proofOfDelivery(): Prisma.ProofOfDeliveryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get deliveryException(): Prisma.DeliveryExceptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get wavePicking(): Prisma.WavePickingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get stagingLoad(): Prisma.StagingLoadDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get packingList(): Prisma.PackingListDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tripCost(): Prisma.TripCostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tripLocation(): Prisma.TripLocationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tripRouteTrace(): Prisma.TripRouteTraceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get vehicleMaintenance(): Prisma.VehicleMaintenanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get vehicleDocument(): Prisma.VehicleDocumentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get driverSchedule(): Prisma.DriverScheduleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get driverAvailability(): Prisma.DriverAvailabilityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get logisticsPartner(): Prisma.LogisticsPartnerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get partnerRate(): Prisma.PartnerRateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get partnerShipment(): Prisma.PartnerShipmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get kitDefinition(): Prisma.KitDefinitionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get kitAssembly(): Prisma.KitAssemblyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get project(): Prisma.ProjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get wbsTask(): Prisma.WbsTaskDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get projectBudget(): Prisma.ProjectBudgetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tender(): Prisma.TenderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tenderBid(): Prisma.TenderBidDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get projectContract(): Prisma.ProjectContractDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get contractTermijn(): Prisma.ContractTermijnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get dailyReport(): Prisma.DailyReportDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get resourceUsage(): Prisma.ResourceUsageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get progressClaim(): Prisma.ProgressClaimDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get progressInvoice(): Prisma.ProgressInvoiceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get projectCommitment(): Prisma.ProjectCommitmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get threeWayMatching(): Prisma.ThreeWayMatchingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get stockBalance(): Prisma.StockBalanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
