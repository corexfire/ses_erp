"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandedCostVoucherScalarFieldEnum = exports.PurchaseInvoiceItemScalarFieldEnum = exports.PurchaseInvoiceScalarFieldEnum = exports.PurchaseOrderItemScalarFieldEnum = exports.PurchaseOrderScalarFieldEnum = exports.RfqItemScalarFieldEnum = exports.RfqVendorScalarFieldEnum = exports.RfqScalarFieldEnum = exports.PurchaseRequisitionItemScalarFieldEnum = exports.PurchaseRequisitionScalarFieldEnum = exports.SupplierScalarFieldEnum = exports.CommissionEntryScalarFieldEnum = exports.CommissionSchemeScalarFieldEnum = exports.ShipmentScalarFieldEnum = exports.CarrierScalarFieldEnum = exports.DiscountRuleScalarFieldEnum = exports.PriceRuleScalarFieldEnum = exports.PriceListItemScalarFieldEnum = exports.PriceListScalarFieldEnum = exports.SalesReturnItemScalarFieldEnum = exports.SalesReturnScalarFieldEnum = exports.SalesInvoiceItemScalarFieldEnum = exports.SalesInvoiceScalarFieldEnum = exports.SalesOrderItemScalarFieldEnum = exports.SalesOrderScalarFieldEnum = exports.SalesQuotationItemScalarFieldEnum = exports.SalesQuotationScalarFieldEnum = exports.CustomerScalarFieldEnum = exports.LeadScalarFieldEnum = exports.UserScalarFieldEnum = exports.TenantScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
exports.FiscalYearScalarFieldEnum = exports.UomConversionScalarFieldEnum = exports.UomScalarFieldEnum = exports.ExchangeRateScalarFieldEnum = exports.CurrencyScalarFieldEnum = exports.BranchScalarFieldEnum = exports.CompanyProfileScalarFieldEnum = exports.NotificationScheduleScalarFieldEnum = exports.NotificationLogScalarFieldEnum = exports.NotificationPreferenceScalarFieldEnum = exports.NotificationChannelConfigScalarFieldEnum = exports.NotificationTemplateScalarFieldEnum = exports.AuditLogScalarFieldEnum = exports.RolePermissionScalarFieldEnum = exports.UserRoleScalarFieldEnum = exports.PermissionScalarFieldEnum = exports.RoleScalarFieldEnum = exports.ServiceTicketScalarFieldEnum = exports.MarketingCampaignScalarFieldEnum = exports.SalesActivityScalarFieldEnum = exports.OpportunityScalarFieldEnum = exports.ValuationLayerScalarFieldEnum = exports.ItemSerialScalarFieldEnum = exports.ItemBatchScalarFieldEnum = exports.QcInspectionItemScalarFieldEnum = exports.QcInspectionScalarFieldEnum = exports.PackingItemScalarFieldEnum = exports.PackingScalarFieldEnum = exports.PickingItemScalarFieldEnum = exports.PickingScalarFieldEnum = exports.PutawayItemScalarFieldEnum = exports.PutawayScalarFieldEnum = exports.GoodsIssueItemScalarFieldEnum = exports.GoodsIssueNoteScalarFieldEnum = exports.StockCountItemScalarFieldEnum = exports.StockCountScalarFieldEnum = exports.StockTransferItemScalarFieldEnum = exports.StockTransferScalarFieldEnum = exports.GoodsReceiptItemScalarFieldEnum = exports.GoodsReceiptNoteScalarFieldEnum = exports.StockLedgerScalarFieldEnum = exports.BinLocationScalarFieldEnum = exports.WarehouseScalarFieldEnum = exports.ItemBarcodeScalarFieldEnum = exports.ItemUomScalarFieldEnum = exports.ItemScalarFieldEnum = exports.ItemGroupScalarFieldEnum = exports.PurchaseReturnItemScalarFieldEnum = exports.PurchaseReturnScalarFieldEnum = exports.LandedCostAllocationScalarFieldEnum = void 0;
exports.TaxInvoiceScalarFieldEnum = exports.ProductionCostScalarFieldEnum = exports.MrpSuggestionScalarFieldEnum = exports.MrpRunScalarFieldEnum = exports.MaintenanceRequestScalarFieldEnum = exports.MaintenanceScheduleScalarFieldEnum = exports.EquipmentScalarFieldEnum = exports.InProcessQcScalarFieldEnum = exports.ProductionReceiptScalarFieldEnum = exports.ProductionIssueItemScalarFieldEnum = exports.ProductionIssueScalarFieldEnum = exports.WorkOrderOperationScalarFieldEnum = exports.WorkOrderComponentScalarFieldEnum = exports.WorkOrderScalarFieldEnum = exports.BillOfMaterialsItemScalarFieldEnum = exports.BillOfMaterialsScalarFieldEnum = exports.DelegationScalarFieldEnum = exports.ApprovalHistoryScalarFieldEnum = exports.WorkflowInstanceScalarFieldEnum = exports.WorkflowRuleScalarFieldEnum = exports.WorkflowStepScalarFieldEnum = exports.WorkflowDefinitionScalarFieldEnum = exports.BudgetScalarFieldEnum = exports.AssetDisposalScalarFieldEnum = exports.PaymentRequestScalarFieldEnum = exports.VendorPaymentScalarFieldEnum = exports.CustomerReceiptScalarFieldEnum = exports.PettyCashReplenishmentScalarFieldEnum = exports.BankReconciliationScalarFieldEnum = exports.InterCompanyTransactionScalarFieldEnum = exports.CostCenterAllocationScalarFieldEnum = exports.TaxCodeScalarFieldEnum = exports.CashTransactionScalarFieldEnum = exports.CashAccountScalarFieldEnum = exports.BankTransactionScalarFieldEnum = exports.BankAccountScalarFieldEnum = exports.FixedAssetDepreciationScalarFieldEnum = exports.FixedAssetScalarFieldEnum = exports.CustomerInvoicePaymentScalarFieldEnum = exports.CustomerInvoiceLineScalarFieldEnum = exports.CustomerInvoiceScalarFieldEnum = exports.SupplierInvoicePaymentScalarFieldEnum = exports.SupplierInvoiceLineScalarFieldEnum = exports.SupplierInvoiceScalarFieldEnum = exports.JournalEntryLineScalarFieldEnum = exports.JournalEntryScalarFieldEnum = exports.ProfitCenterScalarFieldEnum = exports.CostCenterScalarFieldEnum = exports.CoaAccountScalarFieldEnum = exports.AccountingPeriodScalarFieldEnum = void 0;
exports.ThreeWayMatchingScalarFieldEnum = exports.ProjectCommitmentScalarFieldEnum = exports.ProgressInvoiceScalarFieldEnum = exports.ProgressClaimScalarFieldEnum = exports.ResourceUsageScalarFieldEnum = exports.DailyReportScalarFieldEnum = exports.ContractTermijnScalarFieldEnum = exports.ProjectContractScalarFieldEnum = exports.TenderBidScalarFieldEnum = exports.TenderScalarFieldEnum = exports.ProjectBudgetScalarFieldEnum = exports.WbsTaskScalarFieldEnum = exports.ProjectScalarFieldEnum = exports.KitAssemblyScalarFieldEnum = exports.KitDefinitionScalarFieldEnum = exports.PartnerShipmentScalarFieldEnum = exports.PartnerRateScalarFieldEnum = exports.LogisticsPartnerScalarFieldEnum = exports.DriverAvailabilityScalarFieldEnum = exports.DriverScheduleScalarFieldEnum = exports.VehicleDocumentScalarFieldEnum = exports.VehicleMaintenanceScalarFieldEnum = exports.TripRouteTraceScalarFieldEnum = exports.TripLocationScalarFieldEnum = exports.TripCostScalarFieldEnum = exports.PackingListScalarFieldEnum = exports.StagingLoadScalarFieldEnum = exports.WavePickingScalarFieldEnum = exports.DeliveryExceptionScalarFieldEnum = exports.ProofOfDeliveryScalarFieldEnum = exports.DeliveryOrderItemScalarFieldEnum = exports.DeliveryOrderScalarFieldEnum = exports.TripCheckpointScalarFieldEnum = exports.TripPlanScalarFieldEnum = exports.RouteTemplateScalarFieldEnum = exports.TransporterScalarFieldEnum = exports.LogisticsDriverScalarFieldEnum = exports.FleetVehicleScalarFieldEnum = exports.RecruitmentCandidateScalarFieldEnum = exports.KpiEvaluationScalarFieldEnum = exports.ExpenseClaimScalarFieldEnum = exports.PayrollRunScalarFieldEnum = exports.ShiftScalarFieldEnum = exports.AttendanceScalarFieldEnum = exports.OrganizationUnitScalarFieldEnum = exports.EmployeeScalarFieldEnum = exports.IdBillingScalarFieldEnum = exports.TaxEqualizationScalarFieldEnum = exports.PphWithholdingScalarFieldEnum = exports.NsfpRangeScalarFieldEnum = void 0;
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.StockBalanceScalarFieldEnum = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.7.0",
    engine: "75cbdc1eb7150937890ad5465d861175c6624711"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Tenant: 'Tenant',
    User: 'User',
    Lead: 'Lead',
    Customer: 'Customer',
    SalesQuotation: 'SalesQuotation',
    SalesQuotationItem: 'SalesQuotationItem',
    SalesOrder: 'SalesOrder',
    SalesOrderItem: 'SalesOrderItem',
    SalesInvoice: 'SalesInvoice',
    SalesInvoiceItem: 'SalesInvoiceItem',
    SalesReturn: 'SalesReturn',
    SalesReturnItem: 'SalesReturnItem',
    PriceList: 'PriceList',
    PriceListItem: 'PriceListItem',
    PriceRule: 'PriceRule',
    DiscountRule: 'DiscountRule',
    Carrier: 'Carrier',
    Shipment: 'Shipment',
    CommissionScheme: 'CommissionScheme',
    CommissionEntry: 'CommissionEntry',
    Supplier: 'Supplier',
    PurchaseRequisition: 'PurchaseRequisition',
    PurchaseRequisitionItem: 'PurchaseRequisitionItem',
    Rfq: 'Rfq',
    RfqVendor: 'RfqVendor',
    RfqItem: 'RfqItem',
    PurchaseOrder: 'PurchaseOrder',
    PurchaseOrderItem: 'PurchaseOrderItem',
    PurchaseInvoice: 'PurchaseInvoice',
    PurchaseInvoiceItem: 'PurchaseInvoiceItem',
    LandedCostVoucher: 'LandedCostVoucher',
    LandedCostAllocation: 'LandedCostAllocation',
    PurchaseReturn: 'PurchaseReturn',
    PurchaseReturnItem: 'PurchaseReturnItem',
    ItemGroup: 'ItemGroup',
    Item: 'Item',
    ItemUom: 'ItemUom',
    ItemBarcode: 'ItemBarcode',
    Warehouse: 'Warehouse',
    BinLocation: 'BinLocation',
    StockLedger: 'StockLedger',
    GoodsReceiptNote: 'GoodsReceiptNote',
    GoodsReceiptItem: 'GoodsReceiptItem',
    StockTransfer: 'StockTransfer',
    StockTransferItem: 'StockTransferItem',
    StockCount: 'StockCount',
    StockCountItem: 'StockCountItem',
    GoodsIssueNote: 'GoodsIssueNote',
    GoodsIssueItem: 'GoodsIssueItem',
    Putaway: 'Putaway',
    PutawayItem: 'PutawayItem',
    Picking: 'Picking',
    PickingItem: 'PickingItem',
    Packing: 'Packing',
    PackingItem: 'PackingItem',
    QcInspection: 'QcInspection',
    QcInspectionItem: 'QcInspectionItem',
    ItemBatch: 'ItemBatch',
    ItemSerial: 'ItemSerial',
    ValuationLayer: 'ValuationLayer',
    Opportunity: 'Opportunity',
    SalesActivity: 'SalesActivity',
    MarketingCampaign: 'MarketingCampaign',
    ServiceTicket: 'ServiceTicket',
    Role: 'Role',
    Permission: 'Permission',
    UserRole: 'UserRole',
    RolePermission: 'RolePermission',
    AuditLog: 'AuditLog',
    NotificationTemplate: 'NotificationTemplate',
    NotificationChannelConfig: 'NotificationChannelConfig',
    NotificationPreference: 'NotificationPreference',
    NotificationLog: 'NotificationLog',
    NotificationSchedule: 'NotificationSchedule',
    CompanyProfile: 'CompanyProfile',
    Branch: 'Branch',
    Currency: 'Currency',
    ExchangeRate: 'ExchangeRate',
    Uom: 'Uom',
    UomConversion: 'UomConversion',
    FiscalYear: 'FiscalYear',
    AccountingPeriod: 'AccountingPeriod',
    CoaAccount: 'CoaAccount',
    CostCenter: 'CostCenter',
    ProfitCenter: 'ProfitCenter',
    JournalEntry: 'JournalEntry',
    JournalEntryLine: 'JournalEntryLine',
    SupplierInvoice: 'SupplierInvoice',
    SupplierInvoiceLine: 'SupplierInvoiceLine',
    SupplierInvoicePayment: 'SupplierInvoicePayment',
    CustomerInvoice: 'CustomerInvoice',
    CustomerInvoiceLine: 'CustomerInvoiceLine',
    CustomerInvoicePayment: 'CustomerInvoicePayment',
    FixedAsset: 'FixedAsset',
    FixedAssetDepreciation: 'FixedAssetDepreciation',
    BankAccount: 'BankAccount',
    BankTransaction: 'BankTransaction',
    CashAccount: 'CashAccount',
    CashTransaction: 'CashTransaction',
    TaxCode: 'TaxCode',
    CostCenterAllocation: 'CostCenterAllocation',
    InterCompanyTransaction: 'InterCompanyTransaction',
    BankReconciliation: 'BankReconciliation',
    PettyCashReplenishment: 'PettyCashReplenishment',
    CustomerReceipt: 'CustomerReceipt',
    VendorPayment: 'VendorPayment',
    PaymentRequest: 'PaymentRequest',
    AssetDisposal: 'AssetDisposal',
    Budget: 'Budget',
    WorkflowDefinition: 'WorkflowDefinition',
    WorkflowStep: 'WorkflowStep',
    WorkflowRule: 'WorkflowRule',
    WorkflowInstance: 'WorkflowInstance',
    ApprovalHistory: 'ApprovalHistory',
    Delegation: 'Delegation',
    BillOfMaterials: 'BillOfMaterials',
    BillOfMaterialsItem: 'BillOfMaterialsItem',
    WorkOrder: 'WorkOrder',
    WorkOrderComponent: 'WorkOrderComponent',
    WorkOrderOperation: 'WorkOrderOperation',
    ProductionIssue: 'ProductionIssue',
    ProductionIssueItem: 'ProductionIssueItem',
    ProductionReceipt: 'ProductionReceipt',
    InProcessQc: 'InProcessQc',
    Equipment: 'Equipment',
    MaintenanceSchedule: 'MaintenanceSchedule',
    MaintenanceRequest: 'MaintenanceRequest',
    MrpRun: 'MrpRun',
    MrpSuggestion: 'MrpSuggestion',
    ProductionCost: 'ProductionCost',
    TaxInvoice: 'TaxInvoice',
    NsfpRange: 'NsfpRange',
    PphWithholding: 'PphWithholding',
    TaxEqualization: 'TaxEqualization',
    IdBilling: 'IdBilling',
    Employee: 'Employee',
    OrganizationUnit: 'OrganizationUnit',
    Attendance: 'Attendance',
    Shift: 'Shift',
    PayrollRun: 'PayrollRun',
    ExpenseClaim: 'ExpenseClaim',
    KpiEvaluation: 'KpiEvaluation',
    RecruitmentCandidate: 'RecruitmentCandidate',
    FleetVehicle: 'FleetVehicle',
    LogisticsDriver: 'LogisticsDriver',
    Transporter: 'Transporter',
    RouteTemplate: 'RouteTemplate',
    TripPlan: 'TripPlan',
    TripCheckpoint: 'TripCheckpoint',
    DeliveryOrder: 'DeliveryOrder',
    DeliveryOrderItem: 'DeliveryOrderItem',
    ProofOfDelivery: 'ProofOfDelivery',
    DeliveryException: 'DeliveryException',
    WavePicking: 'WavePicking',
    StagingLoad: 'StagingLoad',
    PackingList: 'PackingList',
    TripCost: 'TripCost',
    TripLocation: 'TripLocation',
    TripRouteTrace: 'TripRouteTrace',
    VehicleMaintenance: 'VehicleMaintenance',
    VehicleDocument: 'VehicleDocument',
    DriverSchedule: 'DriverSchedule',
    DriverAvailability: 'DriverAvailability',
    LogisticsPartner: 'LogisticsPartner',
    PartnerRate: 'PartnerRate',
    PartnerShipment: 'PartnerShipment',
    KitDefinition: 'KitDefinition',
    KitAssembly: 'KitAssembly',
    Project: 'Project',
    WbsTask: 'WbsTask',
    ProjectBudget: 'ProjectBudget',
    Tender: 'Tender',
    TenderBid: 'TenderBid',
    ProjectContract: 'ProjectContract',
    ContractTermijn: 'ContractTermijn',
    DailyReport: 'DailyReport',
    ResourceUsage: 'ResourceUsage',
    ProgressClaim: 'ProgressClaim',
    ProgressInvoice: 'ProgressInvoice',
    ProjectCommitment: 'ProjectCommitment',
    ThreeWayMatching: 'ThreeWayMatching',
    StockBalance: 'StockBalance'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.TenantScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    isSuperAdmin: 'isSuperAdmin',
    isActive: 'isActive',
    createdAt: 'createdAt'
};
exports.LeadScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    email: 'email',
    phone: 'phone',
    source: 'source',
    status: 'status',
    assignedToUserId: 'assignedToUserId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CustomerScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    email: 'email',
    phone: 'phone',
    address1: 'address1',
    address2: 'address2',
    city: 'city',
    province: 'province',
    postalCode: 'postalCode',
    countryCode: 'countryCode',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SalesQuotationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    customerId: 'customerId',
    issueDate: 'issueDate',
    expiryDate: 'expiryDate',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SalesQuotationItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    quotationId: 'quotationId',
    lineNo: 'lineNo',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    unitPrice: 'unitPrice',
    discount: 'discount',
    taxCodeId: 'taxCodeId'
};
exports.SalesOrderScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    customerId: 'customerId',
    quotationId: 'quotationId',
    orderDate: 'orderDate',
    status: 'status',
    workflowDefinitionId: 'workflowDefinitionId',
    currentStepNo: 'currentStepNo',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SalesOrderItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    orderId: 'orderId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    unitPrice: 'unitPrice',
    discount: 'discount',
    taxCodeId: 'taxCodeId'
};
exports.SalesInvoiceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    customerId: 'customerId',
    orderId: 'orderId',
    invoiceDate: 'invoiceDate',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SalesInvoiceItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    invoiceId: 'invoiceId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    unitPrice: 'unitPrice',
    discount: 'discount',
    taxCodeId: 'taxCodeId'
};
exports.SalesReturnScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    customerId: 'customerId',
    orderId: 'orderId',
    returnDate: 'returnDate',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SalesReturnItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    returnId: 'returnId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    unitPrice: 'unitPrice',
    taxCodeId: 'taxCodeId'
};
exports.PriceListScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PriceListItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    priceListId: 'priceListId',
    itemCode: 'itemCode',
    uomCode: 'uomCode',
    unitPrice: 'unitPrice',
    effectiveDate: 'effectiveDate',
    endDate: 'endDate',
    customerId: 'customerId'
};
exports.PriceRuleScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    priority: 'priority',
    isActive: 'isActive',
    itemCode: 'itemCode',
    uomCode: 'uomCode',
    unitPrice: 'unitPrice',
    effectiveDate: 'effectiveDate',
    endDate: 'endDate',
    customerId: 'customerId',
    customerGroup: 'customerGroup',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.DiscountRuleScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    priority: 'priority',
    isActive: 'isActive',
    itemCode: 'itemCode',
    uomCode: 'uomCode',
    discountPercent: 'discountPercent',
    effectiveDate: 'effectiveDate',
    endDate: 'endDate',
    customerId: 'customerId',
    customerGroup: 'customerGroup',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CarrierScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ShipmentScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    orderId: 'orderId',
    carrierId: 'carrierId',
    trackingNo: 'trackingNo',
    shipDate: 'shipDate',
    deliveryDate: 'deliveryDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CommissionSchemeScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    rate: 'rate',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CommissionEntryScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    schemeId: 'schemeId',
    invoiceId: 'invoiceId',
    salesUserId: 'salesUserId',
    baseAmount: 'baseAmount',
    amount: 'amount',
    createdAt: 'createdAt'
};
exports.SupplierScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    email: 'email',
    phone: 'phone',
    address1: 'address1',
    address2: 'address2',
    city: 'city',
    province: 'province',
    postalCode: 'postalCode',
    countryCode: 'countryCode',
    npwp: 'npwp',
    bankName: 'bankName',
    bankAccount: 'bankAccount',
    paymentTerms: 'paymentTerms',
    vendorGroup: 'vendorGroup',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PurchaseRequisitionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    requestDate: 'requestDate',
    status: 'status',
    notes: 'notes',
    department: 'department',
    costCenterId: 'costCenterId',
    estimatedTotal: 'estimatedTotal',
    workflowDefinitionId: 'workflowDefinitionId',
    currentStepNo: 'currentStepNo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PurchaseRequisitionItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    requisitionId: 'requisitionId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    estimatedPrice: 'estimatedPrice',
    requiredDate: 'requiredDate'
};
exports.RfqScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    title: 'title',
    department: 'department',
    issueDate: 'issueDate',
    closingDate: 'closingDate',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RfqVendorScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    rfqId: 'rfqId',
    supplierId: 'supplierId',
    status: 'status',
    bidAmount: 'bidAmount',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.RfqItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    rfqId: 'rfqId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    targetPrice: 'targetPrice'
};
exports.PurchaseOrderScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    supplierId: 'supplierId',
    rfqId: 'rfqId',
    orderDate: 'orderDate',
    expectedDeliveryDate: 'expectedDeliveryDate',
    shippingAddress: 'shippingAddress',
    paymentTerms: 'paymentTerms',
    subtotal: 'subtotal',
    taxAmount: 'taxAmount',
    grandTotal: 'grandTotal',
    status: 'status',
    notes: 'notes',
    workflowDefinitionId: 'workflowDefinitionId',
    currentStepNo: 'currentStepNo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PurchaseOrderItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    orderId: 'orderId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    unitPrice: 'unitPrice',
    discount: 'discount',
    taxCodeId: 'taxCodeId',
    amount: 'amount'
};
exports.PurchaseInvoiceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    supplierId: 'supplierId',
    orderId: 'orderId',
    invoiceDate: 'invoiceDate',
    dueDate: 'dueDate',
    paymentTerms: 'paymentTerms',
    taxFacturNumber: 'taxFacturNumber',
    subtotal: 'subtotal',
    taxAmount: 'taxAmount',
    grandTotal: 'grandTotal',
    balanceDue: 'balanceDue',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PurchaseInvoiceItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    invoiceId: 'invoiceId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    unitPrice: 'unitPrice',
    discount: 'discount',
    taxCodeId: 'taxCodeId',
    amount: 'amount'
};
exports.LandedCostVoucherScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    supplierId: 'supplierId',
    orderId: 'orderId',
    invoiceId: 'invoiceId',
    costDate: 'costDate',
    status: 'status',
    apportionmentMethod: 'apportionmentMethod',
    receiptId: 'receiptId',
    totalAmount: 'totalAmount',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.LandedCostAllocationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    landedCostId: 'landedCostId',
    lineNo: 'lineNo',
    costComponent: 'costComponent',
    itemId: 'itemId',
    receiptLineNo: 'receiptLineNo',
    amount: 'amount'
};
exports.PurchaseReturnScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    supplierId: 'supplierId',
    orderId: 'orderId',
    invoiceId: 'invoiceId',
    returnDate: 'returnDate',
    reason: 'reason',
    receiptId: 'receiptId',
    subtotal: 'subtotal',
    taxAmount: 'taxAmount',
    grandTotal: 'grandTotal',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PurchaseReturnItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    returnId: 'returnId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    receiptLineNo: 'receiptLineNo',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    unitPrice: 'unitPrice',
    amount: 'amount',
    taxCodeId: 'taxCodeId'
};
exports.ItemGroupScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    description: 'description',
    itemGroupId: 'itemGroupId',
    baseUomCode: 'baseUomCode',
    trackingType: 'trackingType',
    valuationMethod: 'valuationMethod',
    reorderPoint: 'reorderPoint',
    reorderQty: 'reorderQty',
    isActive: 'isActive',
    isSalesItem: 'isSalesItem',
    isPurchaseItem: 'isPurchaseItem',
    purchaseTaxCodeId: 'purchaseTaxCodeId',
    salesTaxCodeId: 'salesTaxCodeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ItemUomScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    itemId: 'itemId',
    uomCode: 'uomCode',
    isBase: 'isBase',
    conversionRate: 'conversionRate',
    price: 'price',
    createdAt: 'createdAt'
};
exports.ItemBarcodeScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    itemId: 'itemId',
    barcode: 'barcode',
    createdAt: 'createdAt'
};
exports.WarehouseScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BinLocationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    warehouseId: 'warehouseId',
    code: 'code',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.StockLedgerScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    moveType: 'moveType',
    refType: 'refType',
    refId: 'refId',
    postingDate: 'postingDate',
    itemId: 'itemId',
    description: 'description',
    qtyIn: 'qtyIn',
    qtyOut: 'qtyOut',
    uomCode: 'uomCode',
    warehouseId: 'warehouseId',
    binLocationId: 'binLocationId',
    batchId: 'batchId',
    serialId: 'serialId',
    unitCost: 'unitCost',
    createdAt: 'createdAt'
};
exports.GoodsReceiptNoteScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    receiptDate: 'receiptDate',
    status: 'status',
    supplierId: 'supplierId',
    purchaseOrderId: 'purchaseOrderId',
    purchaseInvoiceId: 'purchaseInvoiceId',
    warehouseId: 'warehouseId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.GoodsReceiptItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    grnId: 'grnId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    warehouseId: 'warehouseId',
    binLocationId: 'binLocationId',
    batchCode: 'batchCode',
    serialNo: 'serialNo'
};
exports.StockTransferScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    transferDate: 'transferDate',
    status: 'status',
    fromWarehouseId: 'fromWarehouseId',
    toWarehouseId: 'toWarehouseId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.StockTransferItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    transferId: 'transferId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    fromBinLocationId: 'fromBinLocationId',
    toBinLocationId: 'toBinLocationId',
    batchCode: 'batchCode',
    serialNo: 'serialNo'
};
exports.StockCountScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    countDate: 'countDate',
    status: 'status',
    warehouseId: 'warehouseId',
    notes: 'notes',
    workflowDefinitionId: 'workflowDefinitionId',
    currentStepNo: 'currentStepNo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.StockCountItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    stockCountId: 'stockCountId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    systemQty: 'systemQty',
    countedQty: 'countedQty',
    varianceQty: 'varianceQty',
    uomCode: 'uomCode',
    binLocationId: 'binLocationId',
    batchCode: 'batchCode',
    serialNo: 'serialNo'
};
exports.GoodsIssueNoteScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    issueDate: 'issueDate',
    status: 'status',
    warehouseId: 'warehouseId',
    referenceType: 'referenceType',
    referenceId: 'referenceId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.GoodsIssueItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    issueId: 'issueId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    warehouseId: 'warehouseId',
    binLocationId: 'binLocationId',
    batchCode: 'batchCode',
    serialNo: 'serialNo'
};
exports.PutawayScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    putawayDate: 'putawayDate',
    status: 'status',
    warehouseId: 'warehouseId',
    grnId: 'grnId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PutawayItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    putawayId: 'putawayId',
    lineNo: 'lineNo',
    grnItemId: 'grnItemId',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    fromBinLocationId: 'fromBinLocationId',
    toBinLocationId: 'toBinLocationId',
    batchCode: 'batchCode',
    serialNo: 'serialNo'
};
exports.PickingScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    pickingDate: 'pickingDate',
    status: 'status',
    warehouseId: 'warehouseId',
    salesOrderId: 'salesOrderId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PickingItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    pickingId: 'pickingId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    fromBinLocationId: 'fromBinLocationId',
    pickedQty: 'pickedQty',
    batchCode: 'batchCode',
    serialNo: 'serialNo'
};
exports.PackingScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    packingDate: 'packingDate',
    status: 'status',
    warehouseId: 'warehouseId',
    salesOrderId: 'salesOrderId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PackingItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    packingId: 'packingId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    qty: 'qty',
    uomCode: 'uomCode',
    boxNo: 'boxNo',
    weight: 'weight',
    length: 'length',
    width: 'width',
    height: 'height',
    trackingId: 'trackingId'
};
exports.QcInspectionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    grnId: 'grnId',
    productionId: 'productionId',
    inspectionDate: 'inspectionDate',
    status: 'status',
    inspectorName: 'inspectorName',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.QcInspectionItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    qcInspectionId: 'qcInspectionId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    sampleQty: 'sampleQty',
    passedQty: 'passedQty',
    failedQty: 'failedQty',
    defectReason: 'defectReason'
};
exports.ItemBatchScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    itemId: 'itemId',
    code: 'code',
    expiryDate: 'expiryDate',
    createdAt: 'createdAt'
};
exports.ItemSerialScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    itemId: 'itemId',
    serialNo: 'serialNo',
    status: 'status',
    createdAt: 'createdAt'
};
exports.ValuationLayerScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    itemId: 'itemId',
    postingDate: 'postingDate',
    qty: 'qty',
    unitCost: 'unitCost',
    refType: 'refType',
    refId: 'refId',
    createdAt: 'createdAt'
};
exports.OpportunityScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    stage: 'stage',
    expectedValue: 'expectedValue',
    closeDate: 'closeDate',
    leadId: 'leadId',
    customerId: 'customerId',
    ownerUserId: 'ownerUserId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SalesActivityScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    type: 'type',
    subject: 'subject',
    dueAt: 'dueAt',
    status: 'status',
    leadId: 'leadId',
    customerId: 'customerId',
    opportunityId: 'opportunityId',
    assignedToId: 'assignedToId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MarketingCampaignScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    channel: 'channel',
    status: 'status',
    startDate: 'startDate',
    endDate: 'endDate',
    budget: 'budget',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ServiceTicketScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    customerId: 'customerId',
    subject: 'subject',
    priority: 'priority',
    status: 'status',
    assignedToId: 'assignedToId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RoleScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    createdAt: 'createdAt'
};
exports.PermissionScalarFieldEnum = {
    id: 'id',
    key: 'key',
    description: 'description',
    createdAt: 'createdAt'
};
exports.UserRoleScalarFieldEnum = {
    userId: 'userId',
    roleId: 'roleId'
};
exports.RolePermissionScalarFieldEnum = {
    roleId: 'roleId',
    permissionId: 'permissionId'
};
exports.AuditLogScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    actorUserId: 'actorUserId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
exports.NotificationTemplateScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    key: 'key',
    name: 'name',
    module: 'module',
    eventKey: 'eventKey',
    channel: 'channel',
    subject: 'subject',
    body: 'body',
    variables: 'variables',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationChannelConfigScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    channel: 'channel',
    provider: 'provider',
    isEnabled: 'isEnabled',
    config: 'config',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationPreferenceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    userId: 'userId',
    eventKey: 'eventKey',
    emailEnabled: 'emailEnabled',
    whatsappEnabled: 'whatsappEnabled',
    smsEnabled: 'smsEnabled',
    inAppEnabled: 'inAppEnabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationLogScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    recipientUserId: 'recipientUserId',
    templateId: 'templateId',
    channel: 'channel',
    eventKey: 'eventKey',
    title: 'title',
    message: 'message',
    payload: 'payload',
    status: 'status',
    externalId: 'externalId',
    errorMessage: 'errorMessage',
    sentAt: 'sentAt',
    readAt: 'readAt',
    createdAt: 'createdAt'
};
exports.NotificationScheduleScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    createdById: 'createdById',
    eventKey: 'eventKey',
    channel: 'channel',
    targetUserId: 'targetUserId',
    title: 'title',
    message: 'message',
    payload: 'payload',
    scheduledFor: 'scheduledFor',
    processedAt: 'processedAt',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CompanyProfileScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    legalName: 'legalName',
    tradeName: 'tradeName',
    npwp: 'npwp',
    email: 'email',
    phone: 'phone',
    address1: 'address1',
    address2: 'address2',
    city: 'city',
    province: 'province',
    postalCode: 'postalCode',
    countryCode: 'countryCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BranchScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    isActive: 'isActive',
    phone: 'phone',
    email: 'email',
    address1: 'address1',
    address2: 'address2',
    city: 'city',
    province: 'province',
    postalCode: 'postalCode',
    countryCode: 'countryCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CurrencyScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    symbol: 'symbol',
    isBase: 'isBase',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ExchangeRateScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    baseCurrencyId: 'baseCurrencyId',
    quoteCurrencyId: 'quoteCurrencyId',
    rate: 'rate',
    rateDate: 'rateDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.UomScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.UomConversionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    fromUomId: 'fromUomId',
    toUomId: 'toUomId',
    factor: 'factor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FiscalYearScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    startDate: 'startDate',
    endDate: 'endDate',
    isActive: 'isActive',
    isClosed: 'isClosed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AccountingPeriodScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    fiscalYearId: 'fiscalYearId',
    periodNo: 'periodNo',
    startDate: 'startDate',
    endDate: 'endDate',
    isOpen: 'isOpen',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CoaAccountScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    type: 'type',
    parentId: 'parentId',
    isPosting: 'isPosting',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CostCenterScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProfitCenterScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.JournalEntryScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    entryNo: 'entryNo',
    entryDate: 'entryDate',
    description: 'description',
    referenceNo: 'referenceNo',
    journalType: 'journalType',
    status: 'status',
    accountingPeriodId: 'accountingPeriodId',
    totalDebit: 'totalDebit',
    totalCredit: 'totalCredit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.JournalEntryLineScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    journalEntryId: 'journalEntryId',
    lineNo: 'lineNo',
    accountCode: 'accountCode',
    description: 'description',
    debit: 'debit',
    credit: 'credit',
    referenceType: 'referenceType',
    referenceId: 'referenceId',
    costCenterId: 'costCenterId',
    profitCenterId: 'profitCenterId'
};
exports.SupplierInvoiceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    invoiceNo: 'invoiceNo',
    supplierCode: 'supplierCode',
    invoiceDate: 'invoiceDate',
    dueDate: 'dueDate',
    status: 'status',
    description: 'description',
    totalAmount: 'totalAmount',
    taxAmount: 'taxAmount',
    paidAmount: 'paidAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SupplierInvoiceLineScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    invoiceId: 'invoiceId',
    lineNo: 'lineNo',
    description: 'description',
    qty: 'qty',
    unitPrice: 'unitPrice',
    taxCode: 'taxCode',
    amount: 'amount'
};
exports.SupplierInvoicePaymentScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    invoiceId: 'invoiceId',
    paymentDate: 'paymentDate',
    amount: 'amount',
    reference: 'reference',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.CustomerInvoiceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    invoiceNo: 'invoiceNo',
    customerCode: 'customerCode',
    invoiceDate: 'invoiceDate',
    dueDate: 'dueDate',
    status: 'status',
    description: 'description',
    totalAmount: 'totalAmount',
    taxAmount: 'taxAmount',
    paidAmount: 'paidAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CustomerInvoiceLineScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    invoiceId: 'invoiceId',
    lineNo: 'lineNo',
    description: 'description',
    qty: 'qty',
    unitPrice: 'unitPrice',
    taxCode: 'taxCode',
    amount: 'amount'
};
exports.CustomerInvoicePaymentScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    invoiceId: 'invoiceId',
    paymentDate: 'paymentDate',
    amount: 'amount',
    reference: 'reference',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.FixedAssetScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    assetNo: 'assetNo',
    name: 'name',
    category: 'category',
    purchaseDate: 'purchaseDate',
    purchaseCost: 'purchaseCost',
    usefulLife: 'usefulLife',
    salvageValue: 'salvageValue',
    depreciationMethod: 'depreciationMethod',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FixedAssetDepreciationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    assetId: 'assetId',
    periodDate: 'periodDate',
    depreciationAmount: 'depreciationAmount',
    accumulatedAmount: 'accumulatedAmount',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.BankAccountScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    accountNo: 'accountNo',
    name: 'name',
    bankName: 'bankName',
    accountType: 'accountType',
    balance: 'balance',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BankTransactionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    bankAccountId: 'bankAccountId',
    transDate: 'transDate',
    transType: 'transType',
    description: 'description',
    amount: 'amount',
    reference: 'reference',
    status: 'status',
    createdAt: 'createdAt'
};
exports.CashAccountScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    accountNo: 'accountNo',
    name: 'name',
    accountType: 'accountType',
    balance: 'balance',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CashTransactionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    cashAccountId: 'cashAccountId',
    transDate: 'transDate',
    transType: 'transType',
    description: 'description',
    amount: 'amount',
    reference: 'reference',
    status: 'status',
    createdAt: 'createdAt'
};
exports.TaxCodeScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    rate: 'rate',
    effectiveDate: 'effectiveDate',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CostCenterAllocationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    periodId: 'periodId',
    costCenterId: 'costCenterId',
    accountCode: 'accountCode',
    allocatedAmount: 'allocatedAmount',
    referenceNo: 'referenceNo',
    description: 'description',
    createdAt: 'createdAt'
};
exports.InterCompanyTransactionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    transNo: 'transNo',
    transDate: 'transDate',
    fromCompanyId: 'fromCompanyId',
    toCompanyId: 'toCompanyId',
    description: 'description',
    referenceNo: 'referenceNo',
    transactionType: 'transactionType',
    amount: 'amount',
    status: 'status',
    createdAt: 'createdAt'
};
exports.BankReconciliationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    bankAccountId: 'bankAccountId',
    reconcileDate: 'reconcileDate',
    statementDate: 'statementDate',
    statementBalance: 'statementBalance',
    bookBalance: 'bookBalance',
    difference: 'difference',
    status: 'status',
    createdAt: 'createdAt'
};
exports.PettyCashReplenishmentScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    cashAccountId: 'cashAccountId',
    requestNo: 'requestNo',
    requestDate: 'requestDate',
    referenceNo: 'referenceNo',
    amount: 'amount',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.CustomerReceiptScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    receiptNo: 'receiptNo',
    receiptDate: 'receiptDate',
    customerCode: 'customerCode',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    reference: 'reference',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt'
};
exports.VendorPaymentScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    paymentNo: 'paymentNo',
    paymentDate: 'paymentDate',
    supplierCode: 'supplierCode',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    reference: 'reference',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt'
};
exports.PaymentRequestScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    requestNo: 'requestNo',
    requestDate: 'requestDate',
    requesterId: 'requesterId',
    description: 'description',
    amount: 'amount',
    status: 'status',
    approvalStatus: 'approvalStatus',
    createdAt: 'createdAt'
};
exports.AssetDisposalScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    assetId: 'assetId',
    disposalDate: 'disposalDate',
    disposalNo: 'disposalNo',
    saleValue: 'saleValue',
    lossGain: 'lossGain',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.BudgetScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    budgetNo: 'budgetNo',
    fiscalYear: 'fiscalYear',
    periodNo: 'periodNo',
    accountCode: 'accountCode',
    costCenterId: 'costCenterId',
    amount: 'amount',
    spentAmount: 'spentAmount',
    status: 'status',
    createdAt: 'createdAt'
};
exports.WorkflowDefinitionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    moduleKey: 'moduleKey',
    docType: 'docType',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WorkflowStepScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    definitionId: 'definitionId',
    stepNo: 'stepNo',
    roleId: 'roleId',
    name: 'name',
    slaHours: 'slaHours',
    conditionType: 'conditionType',
    conditionValue: 'conditionValue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WorkflowRuleScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    stepId: 'stepId',
    ruleType: 'ruleType',
    ruleKey: 'ruleKey',
    ruleOperator: 'ruleOperator',
    ruleValue: 'ruleValue',
    createdAt: 'createdAt'
};
exports.WorkflowInstanceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    definitionId: 'definitionId',
    stepId: 'stepId',
    docType: 'docType',
    docId: 'docId',
    currentStepNo: 'currentStepNo',
    status: 'status',
    assignedToUserId: 'assignedToUserId',
    slaDueAt: 'slaDueAt',
    escalatedAt: 'escalatedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ApprovalHistoryScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    instanceId: 'instanceId',
    userId: 'userId',
    action: 'action',
    comment: 'comment',
    fromUserId: 'fromUserId',
    toUserId: 'toUserId',
    createdAt: 'createdAt'
};
exports.DelegationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    fromUserId: 'fromUserId',
    toUserId: 'toUserId',
    startDate: 'startDate',
    endDate: 'endDate',
    isActive: 'isActive',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.BillOfMaterialsScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    itemId: 'itemId',
    version: 'version',
    isActive: 'isActive',
    isMain: 'isMain',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BillOfMaterialsItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    bomId: 'bomId',
    lineNo: 'lineNo',
    componentItemId: 'componentItemId',
    qty: 'qty',
    uomCode: 'uomCode',
    scrapPercent: 'scrapPercent',
    notes: 'notes'
};
exports.WorkOrderScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    bomId: 'bomId',
    finishedGoodItemId: 'finishedGoodItemId',
    warehouseId: 'warehouseId',
    qtyPlanned: 'qtyPlanned',
    qtyProduced: 'qtyProduced',
    uomCode: 'uomCode',
    status: 'status',
    plannedStartDate: 'plannedStartDate',
    plannedEndDate: 'plannedEndDate',
    actualStartDate: 'actualStartDate',
    actualEndDate: 'actualEndDate',
    notes: 'notes',
    workflowDefinitionId: 'workflowDefinitionId',
    currentStepNo: 'currentStepNo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WorkOrderComponentScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    workOrderId: 'workOrderId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    qtyRequired: 'qtyRequired',
    qtyIssued: 'qtyIssued',
    uomCode: 'uomCode'
};
exports.WorkOrderOperationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    workOrderId: 'workOrderId',
    lineNo: 'lineNo',
    operationNo: 'operationNo',
    description: 'description',
    workstation: 'workstation',
    qtyCompleted: 'qtyCompleted',
    laborHours: 'laborHours',
    status: 'status'
};
exports.ProductionIssueScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    workOrderId: 'workOrderId',
    issueDate: 'issueDate',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.ProductionIssueItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    issueId: 'issueId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    qty: 'qty',
    uomCode: 'uomCode'
};
exports.ProductionReceiptScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    workOrderId: 'workOrderId',
    receiptDate: 'receiptDate',
    qtyProduced: 'qtyProduced',
    uomCode: 'uomCode',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.InProcessQcScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    workOrderId: 'workOrderId',
    status: 'status',
    qtyInspected: 'qtyInspected',
    qtyPassed: 'qtyPassed',
    qtyFailed: 'qtyFailed',
    notes: 'notes',
    inspectedAt: 'inspectedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EquipmentScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    type: 'type',
    status: 'status',
    location: 'location',
    installedDate: 'installedDate',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MaintenanceScheduleScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    equipmentId: 'equipmentId',
    name: 'name',
    frequency: 'frequency',
    intervalDays: 'intervalDays',
    lastDate: 'lastDate',
    nextDate: 'nextDate',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MaintenanceRequestScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    equipmentId: 'equipmentId',
    requestDate: 'requestDate',
    problem: 'problem',
    priority: 'priority',
    status: 'status',
    assignedTo: 'assignedTo',
    resolvedDate: 'resolvedDate',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MrpRunScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    runDate: 'runDate',
    status: 'status',
    demandSource: 'demandSource',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.MrpSuggestionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    mrpRunId: 'mrpRunId',
    itemId: 'itemId',
    suggestionType: 'suggestionType',
    qtyRequired: 'qtyRequired',
    qtyOnHand: 'qtyOnHand',
    qtyOnOrder: 'qtyOnOrder',
    qtySuggested: 'qtySuggested',
    dueDate: 'dueDate',
    sourceDocType: 'sourceDocType',
    sourceDocId: 'sourceDocId',
    status: 'status',
    createdAt: 'createdAt'
};
exports.ProductionCostScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    workOrderId: 'workOrderId',
    period: 'period',
    materialCost: 'materialCost',
    laborCost: 'laborCost',
    overheadCost: 'overheadCost',
    totalCost: 'totalCost',
    calculatedAt: 'calculatedAt'
};
exports.TaxInvoiceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    invoiceNo: 'invoiceNo',
    invoiceDate: 'invoiceDate',
    customerId: 'customerId',
    supplierId: 'supplierId',
    baseAmount: 'baseAmount',
    taxAmount: 'taxAmount',
    invoiceType: 'invoiceType',
    status: 'status',
    fpDate: 'fpDate',
    fpNumber: 'fpNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NsfpRangeScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    startNo: 'startNo',
    endNo: 'endNo',
    startDate: 'startDate',
    endDate: 'endDate',
    isUsed: 'isUsed',
    lastUsedNo: 'lastUsedNo',
    createdAt: 'createdAt'
};
exports.PphWithholdingScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    transNo: 'transNo',
    transDate: 'transDate',
    incomeType: 'incomeType',
    taxpayerName: 'taxpayerName',
    npwp: 'npwp',
    nik: 'nik',
    grossAmount: 'grossAmount',
    rate: 'rate',
    taxAmount: 'taxAmount',
    status: 'status',
    bupotNo: 'bupotNo',
    bupotDate: 'bupotDate',
    createdAt: 'createdAt'
};
exports.TaxEqualizationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    period: 'period',
    bookIncome: 'bookIncome',
    fiscalIncome: 'fiscalIncome',
    difference: 'difference',
    description: 'description',
    status: 'status',
    createdAt: 'createdAt'
};
exports.IdBillingScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    billingNo: 'billingNo',
    taxType: 'taxType',
    period: 'period',
    amount: 'amount',
    dueDate: 'dueDate',
    status: 'status',
    paidDate: 'paidDate',
    createdAt: 'createdAt'
};
exports.EmployeeScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    employeeNo: 'employeeNo',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    department: 'department',
    position: 'position',
    hireDate: 'hireDate',
    status: 'status',
    salary: 'salary',
    managerId: 'managerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OrganizationUnitScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    code: 'code',
    parentId: 'parentId',
    managerId: 'managerId',
    type: 'type',
    createdAt: 'createdAt'
};
exports.AttendanceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    employeeId: 'employeeId',
    date: 'date',
    checkIn: 'checkIn',
    checkOut: 'checkOut',
    workHours: 'workHours',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.ShiftScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    code: 'code',
    startTime: 'startTime',
    endTime: 'endTime',
    isFlexi: 'isFlexi',
    isActive: 'isActive',
    createdAt: 'createdAt'
};
exports.PayrollRunScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    employeeId: 'employeeId',
    period: 'period',
    basicSalary: 'basicSalary',
    allowances: 'allowances',
    deductions: 'deductions',
    grossPay: 'grossPay',
    netPay: 'netPay',
    taxAmount: 'taxAmount',
    status: 'status',
    payDate: 'payDate',
    createdAt: 'createdAt'
};
exports.ExpenseClaimScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    employeeId: 'employeeId',
    claimNo: 'claimNo',
    claimDate: 'claimDate',
    amount: 'amount',
    description: 'description',
    category: 'category',
    status: 'status',
    approvedBy: 'approvedBy',
    approvedAt: 'approvedAt',
    createdAt: 'createdAt'
};
exports.KpiEvaluationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    employeeId: 'employeeId',
    period: 'period',
    score: 'score',
    grade: 'grade',
    comments: 'comments',
    status: 'status',
    createdAt: 'createdAt'
};
exports.RecruitmentCandidateScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    candidateNo: 'candidateNo',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    position: 'position',
    status: 'status',
    appliedAt: 'appliedAt',
    createdAt: 'createdAt'
};
exports.FleetVehicleScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    plateNo: 'plateNo',
    vehicleType: 'vehicleType',
    brand: 'brand',
    model: 'model',
    year: 'year',
    ownershipType: 'ownershipType',
    capacityWeight: 'capacityWeight',
    capacityVolume: 'capacityVolume',
    status: 'status',
    transporterId: 'transporterId',
    stnkNo: 'stnkNo',
    stnkExpiry: 'stnkExpiry',
    kirNo: 'kirNo',
    kirExpiry: 'kirExpiry',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.LogisticsDriverScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    employeeId: 'employeeId',
    licenseType: 'licenseType',
    licenseNo: 'licenseNo',
    licenseExpiry: 'licenseExpiry',
    phone: 'phone',
    email: 'email',
    address: 'address',
    status: 'status',
    transporterId: 'transporterId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TransporterScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    supplierId: 'supplierId',
    contactName: 'contactName',
    phone: 'phone',
    email: 'email',
    address: 'address',
    isActive: 'isActive',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RouteTemplateScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    warehouseId: 'warehouseId',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TripPlanScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    routeDate: 'routeDate',
    vehicleId: 'vehicleId',
    driverId: 'driverId',
    routeTemplateId: 'routeTemplateId',
    status: 'status',
    departureAt: 'departureAt',
    returnAt: 'returnAt',
    actualDepartureAt: 'actualDepartureAt',
    actualReturnAt: 'actualReturnAt',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TripCheckpointScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    tripPlanId: 'tripPlanId',
    checkpointType: 'checkpointType',
    locationName: 'locationName',
    latitude: 'latitude',
    longitude: 'longitude',
    timestamp: 'timestamp',
    notes: 'notes',
    deliveryOrderId: 'deliveryOrderId',
    createdAt: 'createdAt'
};
exports.DeliveryOrderScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    shipmentId: 'shipmentId',
    salesOrderId: 'salesOrderId',
    customerId: 'customerId',
    warehouseId: 'warehouseId',
    tripPlanId: 'tripPlanId',
    status: 'status',
    priority: 'priority',
    plannedShipDate: 'plannedShipDate',
    actualShipDate: 'actualShipDate',
    deliveryAddress1: 'deliveryAddress1',
    deliveryAddress2: 'deliveryAddress2',
    deliveryCity: 'deliveryCity',
    deliveryProvince: 'deliveryProvince',
    deliveryPostalCode: 'deliveryPostalCode',
    deliveryNotes: 'deliveryNotes',
    actualDeliveredAt: 'actualDeliveredAt',
    podToken: 'podToken',
    podTokenExpiry: 'podTokenExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.DeliveryOrderItemScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    deliveryOrderId: 'deliveryOrderId',
    lineNo: 'lineNo',
    itemId: 'itemId',
    description: 'description',
    orderedQty: 'orderedQty',
    pickedQty: 'pickedQty',
    packedQty: 'packedQty',
    shippedQty: 'shippedQty',
    deliveredQty: 'deliveredQty',
    uomCode: 'uomCode',
    unitPrice: 'unitPrice',
    batchNo: 'batchNo',
    serialNo: 'serialNo'
};
exports.ProofOfDeliveryScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    deliveryOrderId: 'deliveryOrderId',
    receivedBy: 'receivedBy',
    receivedAt: 'receivedAt',
    signatureFileId: 'signatureFileId',
    photoFileIds: 'photoFileIds',
    geoLat: 'geoLat',
    geoLng: 'geoLng',
    notes: 'notes',
    status: 'status',
    verifiedBy: 'verifiedBy',
    verifiedAt: 'verifiedAt',
    createdAt: 'createdAt'
};
exports.DeliveryExceptionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    deliveryOrderId: 'deliveryOrderId',
    tripPlanId: 'tripPlanId',
    reason: 'reason',
    description: 'description',
    reportedAt: 'reportedAt',
    reportedBy: 'reportedBy',
    resolved: 'resolved',
    resolvedAt: 'resolvedAt',
    resolutionNotes: 'resolutionNotes',
    createdAt: 'createdAt'
};
exports.WavePickingScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    warehouseId: 'warehouseId',
    plannedDate: 'plannedDate',
    status: 'status',
    totalDoCount: 'totalDoCount',
    totalItemCount: 'totalItemCount',
    assignedTo: 'assignedTo',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.StagingLoadScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    waveId: 'waveId',
    tripPlanId: 'tripPlanId',
    warehouseId: 'warehouseId',
    status: 'status',
    loadedAt: 'loadedAt',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.PackingListScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    deliveryOrderId: 'deliveryOrderId',
    warehouseId: 'warehouseId',
    packingDate: 'packingDate',
    status: 'status',
    packedBy: 'packedBy',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TripCostScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    tripPlanId: 'tripPlanId',
    costType: 'costType',
    description: 'description',
    amount: 'amount',
    currencyCode: 'currencyCode',
    supplierId: 'supplierId',
    paymentRequestId: 'paymentRequestId',
    status: 'status',
    submittedBy: 'submittedBy',
    submittedAt: 'submittedAt',
    approvedBy: 'approvedBy',
    approvedAt: 'approvedAt',
    postedToFinance: 'postedToFinance',
    journalEntryId: 'journalEntryId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TripLocationScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    tripPlanId: 'tripPlanId',
    vehicleId: 'vehicleId',
    lat: 'lat',
    lng: 'lng',
    speed: 'speed',
    heading: 'heading',
    accuracy: 'accuracy',
    timestamp: 'timestamp'
};
exports.TripRouteTraceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    tripPlanId: 'tripPlanId',
    totalDistance: 'totalDistance',
    totalDuration: 'totalDuration',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status'
};
exports.VehicleMaintenanceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    vehicleId: 'vehicleId',
    maintenanceType: 'maintenanceType',
    description: 'description',
    kmInterval: 'kmInterval',
    dateInterval: 'dateInterval',
    lastServiceAt: 'lastServiceAt',
    nextServiceAt: 'nextServiceAt',
    cost: 'cost',
    vendorId: 'vendorId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.VehicleDocumentScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    vehicleId: 'vehicleId',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    issueDate: 'issueDate',
    expiryDate: 'expiryDate',
    fileId: 'fileId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.DriverScheduleScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    driverId: 'driverId',
    date: 'date',
    shiftType: 'shiftType',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    createdAt: 'createdAt'
};
exports.DriverAvailabilityScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    driverId: 'driverId',
    date: 'date',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.LogisticsPartnerScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    partnerType: 'partnerType',
    apiEndpoint: 'apiEndpoint',
    apiKey: 'apiKey',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PartnerRateScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    partnerId: 'partnerId',
    originZone: 'originZone',
    destZone: 'destZone',
    rateWeight: 'rateWeight',
    rateVolume: 'rateVolume',
    transitDays: 'transitDays',
    effectiveFrom: 'effectiveFrom',
    effectiveTo: 'effectiveTo',
    status: 'status',
    createdAt: 'createdAt'
};
exports.PartnerShipmentScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    partnerId: 'partnerId',
    deliveryOrderId: 'deliveryOrderId',
    partnerTrackingNo: 'partnerTrackingNo',
    ourDeliveryOrderId: 'ourDeliveryOrderId',
    status: 'status',
    events: 'events',
    pickedUpAt: 'pickedUpAt',
    deliveredAt: 'deliveredAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.KitDefinitionScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    description: 'description',
    itemParentId: 'itemParentId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.KitAssemblyScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    kitDefinitionId: 'kitDefinitionId',
    deliveryOrderId: 'deliveryOrderId',
    quantity: 'quantity',
    status: 'status',
    assembledBy: 'assembledBy',
    assembledAt: 'assembledAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProjectScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    name: 'name',
    customerId: 'customerId',
    description: 'description',
    contractId: 'contractId',
    startDate: 'startDate',
    endDate: 'endDate',
    totalBudget: 'totalBudget',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WbsTaskScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    taskCode: 'taskCode',
    taskName: 'taskName',
    parentTaskId: 'parentTaskId',
    level: 'level',
    plannedWeight: 'plannedWeight',
    plannedCost: 'plannedCost',
    actualProgress: 'actualProgress',
    actualCost: 'actualCost',
    status: 'status',
    createdAt: 'createdAt'
};
exports.ProjectBudgetScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    wbsTaskId: 'wbsTaskId',
    allocatedBudget: 'allocatedBudget',
    committedAmount: 'committedAmount',
    createdAt: 'createdAt'
};
exports.TenderScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    title: 'title',
    projectId: 'projectId',
    description: 'description',
    status: 'status',
    submissionDeadline: 'submissionDeadline',
    awardDate: 'awardDate',
    createdAt: 'createdAt'
};
exports.TenderBidScalarFieldEnum = {
    id: 'id',
    tenderId: 'tenderId',
    supplierId: 'supplierId',
    price: 'price',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt'
};
exports.ProjectContractScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    contractNo: 'contractNo',
    supplierId: 'supplierId',
    contractValue: 'contractValue',
    status: 'status',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt'
};
exports.ContractTermijnScalarFieldEnum = {
    id: 'id',
    contractId: 'contractId',
    termijnNo: 'termijnNo',
    description: 'description',
    dueDate: 'dueDate',
    percentage: 'percentage',
    amount: 'amount',
    status: 'status',
    paidAt: 'paidAt'
};
exports.DailyReportScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    reportDate: 'reportDate',
    weather: 'weather',
    manpowerSummary: 'manpowerSummary',
    workSummary: 'workSummary',
    issues: 'issues',
    status: 'status',
    submittedBy: 'submittedBy',
    createdAt: 'createdAt'
};
exports.ResourceUsageScalarFieldEnum = {
    id: 'id',
    dailyReportId: 'dailyReportId',
    resourceType: 'resourceType',
    quantity: 'quantity',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.ProgressClaimScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    contractTermijnId: 'contractTermijnId',
    periodFrom: 'periodFrom',
    periodTo: 'periodTo',
    percentage: 'percentage',
    amount: 'amount',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt'
};
exports.ProgressInvoiceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    progressClaimId: 'progressClaimId',
    projectId: 'projectId',
    amount: 'amount',
    status: 'status',
    invoiceNo: 'invoiceNo',
    arInvoiceId: 'arInvoiceId',
    createdAt: 'createdAt'
};
exports.ProjectCommitmentScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    projectId: 'projectId',
    wbsTaskId: 'wbsTaskId',
    commitmentType: 'commitmentType',
    referenceId: 'referenceId',
    description: 'description',
    amount: 'amount',
    status: 'status',
    createdAt: 'createdAt'
};
exports.ThreeWayMatchingScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    code: 'code',
    invoiceId: 'invoiceId',
    orderId: 'orderId',
    receiptId: 'receiptId',
    matchDate: 'matchDate',
    status: 'status',
    discrepancyNotes: 'discrepancyNotes',
    varianceAmount: 'varianceAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.StockBalanceScalarFieldEnum = {
    id: 'id',
    tenantId: 'tenantId',
    warehouseId: 'warehouseId',
    itemId: 'itemId',
    batchId: 'batchId',
    serialId: 'serialId',
    qtyOnHand: 'qtyOnHand',
    qtyAllocated: 'qtyAllocated',
    qtyAvailable: 'qtyAvailable',
    uomCode: 'uomCode',
    lastReceiptDate: 'lastReceiptDate',
    binLocationId: 'binLocationId',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map