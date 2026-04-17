import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly Tenant: "Tenant";
    readonly User: "User";
    readonly Lead: "Lead";
    readonly Customer: "Customer";
    readonly SalesQuotation: "SalesQuotation";
    readonly SalesQuotationItem: "SalesQuotationItem";
    readonly SalesOrder: "SalesOrder";
    readonly SalesOrderItem: "SalesOrderItem";
    readonly SalesInvoice: "SalesInvoice";
    readonly SalesInvoiceItem: "SalesInvoiceItem";
    readonly SalesReturn: "SalesReturn";
    readonly SalesReturnItem: "SalesReturnItem";
    readonly PriceList: "PriceList";
    readonly PriceListItem: "PriceListItem";
    readonly PriceRule: "PriceRule";
    readonly DiscountRule: "DiscountRule";
    readonly Carrier: "Carrier";
    readonly Shipment: "Shipment";
    readonly CommissionScheme: "CommissionScheme";
    readonly CommissionEntry: "CommissionEntry";
    readonly Supplier: "Supplier";
    readonly PurchaseRequisition: "PurchaseRequisition";
    readonly PurchaseRequisitionItem: "PurchaseRequisitionItem";
    readonly Rfq: "Rfq";
    readonly RfqVendor: "RfqVendor";
    readonly RfqItem: "RfqItem";
    readonly PurchaseOrder: "PurchaseOrder";
    readonly PurchaseOrderItem: "PurchaseOrderItem";
    readonly PurchaseInvoice: "PurchaseInvoice";
    readonly PurchaseInvoiceItem: "PurchaseInvoiceItem";
    readonly LandedCostVoucher: "LandedCostVoucher";
    readonly LandedCostAllocation: "LandedCostAllocation";
    readonly PurchaseReturn: "PurchaseReturn";
    readonly PurchaseReturnItem: "PurchaseReturnItem";
    readonly ItemGroup: "ItemGroup";
    readonly Item: "Item";
    readonly ItemUom: "ItemUom";
    readonly ItemBarcode: "ItemBarcode";
    readonly Warehouse: "Warehouse";
    readonly BinLocation: "BinLocation";
    readonly StockLedger: "StockLedger";
    readonly GoodsReceiptNote: "GoodsReceiptNote";
    readonly GoodsReceiptItem: "GoodsReceiptItem";
    readonly StockTransfer: "StockTransfer";
    readonly StockTransferItem: "StockTransferItem";
    readonly StockCount: "StockCount";
    readonly StockCountItem: "StockCountItem";
    readonly GoodsIssueNote: "GoodsIssueNote";
    readonly GoodsIssueItem: "GoodsIssueItem";
    readonly Putaway: "Putaway";
    readonly PutawayItem: "PutawayItem";
    readonly Picking: "Picking";
    readonly PickingItem: "PickingItem";
    readonly Packing: "Packing";
    readonly PackingItem: "PackingItem";
    readonly QcInspection: "QcInspection";
    readonly QcInspectionItem: "QcInspectionItem";
    readonly ItemBatch: "ItemBatch";
    readonly ItemSerial: "ItemSerial";
    readonly ValuationLayer: "ValuationLayer";
    readonly Opportunity: "Opportunity";
    readonly SalesActivity: "SalesActivity";
    readonly MarketingCampaign: "MarketingCampaign";
    readonly ServiceTicket: "ServiceTicket";
    readonly Role: "Role";
    readonly Permission: "Permission";
    readonly UserRole: "UserRole";
    readonly RolePermission: "RolePermission";
    readonly AuditLog: "AuditLog";
    readonly NotificationTemplate: "NotificationTemplate";
    readonly NotificationChannelConfig: "NotificationChannelConfig";
    readonly NotificationPreference: "NotificationPreference";
    readonly NotificationLog: "NotificationLog";
    readonly NotificationSchedule: "NotificationSchedule";
    readonly CompanyProfile: "CompanyProfile";
    readonly Branch: "Branch";
    readonly Currency: "Currency";
    readonly ExchangeRate: "ExchangeRate";
    readonly Uom: "Uom";
    readonly UomConversion: "UomConversion";
    readonly FiscalYear: "FiscalYear";
    readonly AccountingPeriod: "AccountingPeriod";
    readonly CoaAccount: "CoaAccount";
    readonly CostCenter: "CostCenter";
    readonly ProfitCenter: "ProfitCenter";
    readonly JournalEntry: "JournalEntry";
    readonly JournalEntryLine: "JournalEntryLine";
    readonly SupplierInvoice: "SupplierInvoice";
    readonly SupplierInvoiceLine: "SupplierInvoiceLine";
    readonly SupplierInvoicePayment: "SupplierInvoicePayment";
    readonly CustomerInvoice: "CustomerInvoice";
    readonly CustomerInvoiceLine: "CustomerInvoiceLine";
    readonly CustomerInvoicePayment: "CustomerInvoicePayment";
    readonly FixedAsset: "FixedAsset";
    readonly FixedAssetDepreciation: "FixedAssetDepreciation";
    readonly BankAccount: "BankAccount";
    readonly BankTransaction: "BankTransaction";
    readonly CashAccount: "CashAccount";
    readonly CashTransaction: "CashTransaction";
    readonly TaxCode: "TaxCode";
    readonly CostCenterAllocation: "CostCenterAllocation";
    readonly InterCompanyTransaction: "InterCompanyTransaction";
    readonly BankReconciliation: "BankReconciliation";
    readonly PettyCashReplenishment: "PettyCashReplenishment";
    readonly CustomerReceipt: "CustomerReceipt";
    readonly VendorPayment: "VendorPayment";
    readonly PaymentRequest: "PaymentRequest";
    readonly AssetDisposal: "AssetDisposal";
    readonly Budget: "Budget";
    readonly WorkflowDefinition: "WorkflowDefinition";
    readonly WorkflowStep: "WorkflowStep";
    readonly WorkflowRule: "WorkflowRule";
    readonly WorkflowInstance: "WorkflowInstance";
    readonly ApprovalHistory: "ApprovalHistory";
    readonly Delegation: "Delegation";
    readonly BillOfMaterials: "BillOfMaterials";
    readonly BillOfMaterialsItem: "BillOfMaterialsItem";
    readonly WorkOrder: "WorkOrder";
    readonly WorkOrderComponent: "WorkOrderComponent";
    readonly WorkOrderOperation: "WorkOrderOperation";
    readonly ProductionIssue: "ProductionIssue";
    readonly ProductionIssueItem: "ProductionIssueItem";
    readonly ProductionReceipt: "ProductionReceipt";
    readonly InProcessQc: "InProcessQc";
    readonly Equipment: "Equipment";
    readonly MaintenanceSchedule: "MaintenanceSchedule";
    readonly MaintenanceRequest: "MaintenanceRequest";
    readonly MrpRun: "MrpRun";
    readonly MrpSuggestion: "MrpSuggestion";
    readonly ProductionCost: "ProductionCost";
    readonly TaxInvoice: "TaxInvoice";
    readonly NsfpRange: "NsfpRange";
    readonly PphWithholding: "PphWithholding";
    readonly TaxEqualization: "TaxEqualization";
    readonly IdBilling: "IdBilling";
    readonly Employee: "Employee";
    readonly OrganizationUnit: "OrganizationUnit";
    readonly Attendance: "Attendance";
    readonly Shift: "Shift";
    readonly PayrollRun: "PayrollRun";
    readonly ExpenseClaim: "ExpenseClaim";
    readonly KpiEvaluation: "KpiEvaluation";
    readonly RecruitmentCandidate: "RecruitmentCandidate";
    readonly FleetVehicle: "FleetVehicle";
    readonly LogisticsDriver: "LogisticsDriver";
    readonly Transporter: "Transporter";
    readonly RouteTemplate: "RouteTemplate";
    readonly TripPlan: "TripPlan";
    readonly TripCheckpoint: "TripCheckpoint";
    readonly DeliveryOrder: "DeliveryOrder";
    readonly DeliveryOrderItem: "DeliveryOrderItem";
    readonly ProofOfDelivery: "ProofOfDelivery";
    readonly DeliveryException: "DeliveryException";
    readonly WavePicking: "WavePicking";
    readonly StagingLoad: "StagingLoad";
    readonly PackingList: "PackingList";
    readonly TripCost: "TripCost";
    readonly TripLocation: "TripLocation";
    readonly TripRouteTrace: "TripRouteTrace";
    readonly VehicleMaintenance: "VehicleMaintenance";
    readonly VehicleDocument: "VehicleDocument";
    readonly DriverSchedule: "DriverSchedule";
    readonly DriverAvailability: "DriverAvailability";
    readonly LogisticsPartner: "LogisticsPartner";
    readonly PartnerRate: "PartnerRate";
    readonly PartnerShipment: "PartnerShipment";
    readonly KitDefinition: "KitDefinition";
    readonly KitAssembly: "KitAssembly";
    readonly Project: "Project";
    readonly WbsTask: "WbsTask";
    readonly ProjectBudget: "ProjectBudget";
    readonly Tender: "Tender";
    readonly TenderBid: "TenderBid";
    readonly ProjectContract: "ProjectContract";
    readonly ContractTermijn: "ContractTermijn";
    readonly DailyReport: "DailyReport";
    readonly ResourceUsage: "ResourceUsage";
    readonly ProgressClaim: "ProgressClaim";
    readonly ProgressInvoice: "ProgressInvoice";
    readonly ProjectCommitment: "ProjectCommitment";
    readonly ThreeWayMatching: "ThreeWayMatching";
    readonly StockBalance: "StockBalance";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "tenant" | "user" | "lead" | "customer" | "salesQuotation" | "salesQuotationItem" | "salesOrder" | "salesOrderItem" | "salesInvoice" | "salesInvoiceItem" | "salesReturn" | "salesReturnItem" | "priceList" | "priceListItem" | "priceRule" | "discountRule" | "carrier" | "shipment" | "commissionScheme" | "commissionEntry" | "supplier" | "purchaseRequisition" | "purchaseRequisitionItem" | "rfq" | "rfqVendor" | "rfqItem" | "purchaseOrder" | "purchaseOrderItem" | "purchaseInvoice" | "purchaseInvoiceItem" | "landedCostVoucher" | "landedCostAllocation" | "purchaseReturn" | "purchaseReturnItem" | "itemGroup" | "item" | "itemUom" | "itemBarcode" | "warehouse" | "binLocation" | "stockLedger" | "goodsReceiptNote" | "goodsReceiptItem" | "stockTransfer" | "stockTransferItem" | "stockCount" | "stockCountItem" | "goodsIssueNote" | "goodsIssueItem" | "putaway" | "putawayItem" | "picking" | "pickingItem" | "packing" | "packingItem" | "qcInspection" | "qcInspectionItem" | "itemBatch" | "itemSerial" | "valuationLayer" | "opportunity" | "salesActivity" | "marketingCampaign" | "serviceTicket" | "role" | "permission" | "userRole" | "rolePermission" | "auditLog" | "notificationTemplate" | "notificationChannelConfig" | "notificationPreference" | "notificationLog" | "notificationSchedule" | "companyProfile" | "branch" | "currency" | "exchangeRate" | "uom" | "uomConversion" | "fiscalYear" | "accountingPeriod" | "coaAccount" | "costCenter" | "profitCenter" | "journalEntry" | "journalEntryLine" | "supplierInvoice" | "supplierInvoiceLine" | "supplierInvoicePayment" | "customerInvoice" | "customerInvoiceLine" | "customerInvoicePayment" | "fixedAsset" | "fixedAssetDepreciation" | "bankAccount" | "bankTransaction" | "cashAccount" | "cashTransaction" | "taxCode" | "costCenterAllocation" | "interCompanyTransaction" | "bankReconciliation" | "pettyCashReplenishment" | "customerReceipt" | "vendorPayment" | "paymentRequest" | "assetDisposal" | "budget" | "workflowDefinition" | "workflowStep" | "workflowRule" | "workflowInstance" | "approvalHistory" | "delegation" | "billOfMaterials" | "billOfMaterialsItem" | "workOrder" | "workOrderComponent" | "workOrderOperation" | "productionIssue" | "productionIssueItem" | "productionReceipt" | "inProcessQc" | "equipment" | "maintenanceSchedule" | "maintenanceRequest" | "mrpRun" | "mrpSuggestion" | "productionCost" | "taxInvoice" | "nsfpRange" | "pphWithholding" | "taxEqualization" | "idBilling" | "employee" | "organizationUnit" | "attendance" | "shift" | "payrollRun" | "expenseClaim" | "kpiEvaluation" | "recruitmentCandidate" | "fleetVehicle" | "logisticsDriver" | "transporter" | "routeTemplate" | "tripPlan" | "tripCheckpoint" | "deliveryOrder" | "deliveryOrderItem" | "proofOfDelivery" | "deliveryException" | "wavePicking" | "stagingLoad" | "packingList" | "tripCost" | "tripLocation" | "tripRouteTrace" | "vehicleMaintenance" | "vehicleDocument" | "driverSchedule" | "driverAvailability" | "logisticsPartner" | "partnerRate" | "partnerShipment" | "kitDefinition" | "kitAssembly" | "project" | "wbsTask" | "projectBudget" | "tender" | "tenderBid" | "projectContract" | "contractTermijn" | "dailyReport" | "resourceUsage" | "progressClaim" | "progressInvoice" | "projectCommitment" | "threeWayMatching" | "stockBalance";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Tenant: {
            payload: Prisma.$TenantPayload<ExtArgs>;
            fields: Prisma.TenantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TenantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                findFirst: {
                    args: Prisma.TenantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                findMany: {
                    args: Prisma.TenantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>[];
                };
                create: {
                    args: Prisma.TenantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                createMany: {
                    args: Prisma.TenantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>[];
                };
                delete: {
                    args: Prisma.TenantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                update: {
                    args: Prisma.TenantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                deleteMany: {
                    args: Prisma.TenantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TenantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>[];
                };
                upsert: {
                    args: Prisma.TenantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenantPayload>;
                };
                aggregate: {
                    args: Prisma.TenantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTenant>;
                };
                groupBy: {
                    args: Prisma.TenantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TenantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TenantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TenantCountAggregateOutputType> | number;
                };
            };
        };
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Lead: {
            payload: Prisma.$LeadPayload<ExtArgs>;
            fields: Prisma.LeadFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LeadFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                findFirst: {
                    args: Prisma.LeadFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                findMany: {
                    args: Prisma.LeadFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>[];
                };
                create: {
                    args: Prisma.LeadCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                createMany: {
                    args: Prisma.LeadCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>[];
                };
                delete: {
                    args: Prisma.LeadDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                update: {
                    args: Prisma.LeadUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                deleteMany: {
                    args: Prisma.LeadDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LeadUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LeadUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>[];
                };
                upsert: {
                    args: Prisma.LeadUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                aggregate: {
                    args: Prisma.LeadAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLead>;
                };
                groupBy: {
                    args: Prisma.LeadGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LeadGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LeadCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LeadCountAggregateOutputType> | number;
                };
            };
        };
        Customer: {
            payload: Prisma.$CustomerPayload<ExtArgs>;
            fields: Prisma.CustomerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CustomerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload>;
                };
                findFirst: {
                    args: Prisma.CustomerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload>;
                };
                findMany: {
                    args: Prisma.CustomerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload>[];
                };
                create: {
                    args: Prisma.CustomerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload>;
                };
                createMany: {
                    args: Prisma.CustomerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload>[];
                };
                delete: {
                    args: Prisma.CustomerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload>;
                };
                update: {
                    args: Prisma.CustomerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload>;
                };
                deleteMany: {
                    args: Prisma.CustomerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CustomerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload>[];
                };
                upsert: {
                    args: Prisma.CustomerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerPayload>;
                };
                aggregate: {
                    args: Prisma.CustomerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCustomer>;
                };
                groupBy: {
                    args: Prisma.CustomerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CustomerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerCountAggregateOutputType> | number;
                };
            };
        };
        SalesQuotation: {
            payload: Prisma.$SalesQuotationPayload<ExtArgs>;
            fields: Prisma.SalesQuotationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SalesQuotationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SalesQuotationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload>;
                };
                findFirst: {
                    args: Prisma.SalesQuotationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SalesQuotationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload>;
                };
                findMany: {
                    args: Prisma.SalesQuotationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload>[];
                };
                create: {
                    args: Prisma.SalesQuotationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload>;
                };
                createMany: {
                    args: Prisma.SalesQuotationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SalesQuotationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload>[];
                };
                delete: {
                    args: Prisma.SalesQuotationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload>;
                };
                update: {
                    args: Prisma.SalesQuotationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload>;
                };
                deleteMany: {
                    args: Prisma.SalesQuotationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SalesQuotationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SalesQuotationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload>[];
                };
                upsert: {
                    args: Prisma.SalesQuotationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationPayload>;
                };
                aggregate: {
                    args: Prisma.SalesQuotationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSalesQuotation>;
                };
                groupBy: {
                    args: Prisma.SalesQuotationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesQuotationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SalesQuotationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesQuotationCountAggregateOutputType> | number;
                };
            };
        };
        SalesQuotationItem: {
            payload: Prisma.$SalesQuotationItemPayload<ExtArgs>;
            fields: Prisma.SalesQuotationItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SalesQuotationItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SalesQuotationItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload>;
                };
                findFirst: {
                    args: Prisma.SalesQuotationItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SalesQuotationItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload>;
                };
                findMany: {
                    args: Prisma.SalesQuotationItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload>[];
                };
                create: {
                    args: Prisma.SalesQuotationItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload>;
                };
                createMany: {
                    args: Prisma.SalesQuotationItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SalesQuotationItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload>[];
                };
                delete: {
                    args: Prisma.SalesQuotationItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload>;
                };
                update: {
                    args: Prisma.SalesQuotationItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload>;
                };
                deleteMany: {
                    args: Prisma.SalesQuotationItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SalesQuotationItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SalesQuotationItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload>[];
                };
                upsert: {
                    args: Prisma.SalesQuotationItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesQuotationItemPayload>;
                };
                aggregate: {
                    args: Prisma.SalesQuotationItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSalesQuotationItem>;
                };
                groupBy: {
                    args: Prisma.SalesQuotationItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesQuotationItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SalesQuotationItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesQuotationItemCountAggregateOutputType> | number;
                };
            };
        };
        SalesOrder: {
            payload: Prisma.$SalesOrderPayload<ExtArgs>;
            fields: Prisma.SalesOrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SalesOrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SalesOrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload>;
                };
                findFirst: {
                    args: Prisma.SalesOrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SalesOrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload>;
                };
                findMany: {
                    args: Prisma.SalesOrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload>[];
                };
                create: {
                    args: Prisma.SalesOrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload>;
                };
                createMany: {
                    args: Prisma.SalesOrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SalesOrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload>[];
                };
                delete: {
                    args: Prisma.SalesOrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload>;
                };
                update: {
                    args: Prisma.SalesOrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload>;
                };
                deleteMany: {
                    args: Prisma.SalesOrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SalesOrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SalesOrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload>[];
                };
                upsert: {
                    args: Prisma.SalesOrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderPayload>;
                };
                aggregate: {
                    args: Prisma.SalesOrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSalesOrder>;
                };
                groupBy: {
                    args: Prisma.SalesOrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesOrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SalesOrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesOrderCountAggregateOutputType> | number;
                };
            };
        };
        SalesOrderItem: {
            payload: Prisma.$SalesOrderItemPayload<ExtArgs>;
            fields: Prisma.SalesOrderItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SalesOrderItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SalesOrderItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload>;
                };
                findFirst: {
                    args: Prisma.SalesOrderItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SalesOrderItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload>;
                };
                findMany: {
                    args: Prisma.SalesOrderItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload>[];
                };
                create: {
                    args: Prisma.SalesOrderItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload>;
                };
                createMany: {
                    args: Prisma.SalesOrderItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SalesOrderItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload>[];
                };
                delete: {
                    args: Prisma.SalesOrderItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload>;
                };
                update: {
                    args: Prisma.SalesOrderItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload>;
                };
                deleteMany: {
                    args: Prisma.SalesOrderItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SalesOrderItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SalesOrderItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload>[];
                };
                upsert: {
                    args: Prisma.SalesOrderItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesOrderItemPayload>;
                };
                aggregate: {
                    args: Prisma.SalesOrderItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSalesOrderItem>;
                };
                groupBy: {
                    args: Prisma.SalesOrderItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesOrderItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SalesOrderItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesOrderItemCountAggregateOutputType> | number;
                };
            };
        };
        SalesInvoice: {
            payload: Prisma.$SalesInvoicePayload<ExtArgs>;
            fields: Prisma.SalesInvoiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SalesInvoiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SalesInvoiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload>;
                };
                findFirst: {
                    args: Prisma.SalesInvoiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SalesInvoiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload>;
                };
                findMany: {
                    args: Prisma.SalesInvoiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload>[];
                };
                create: {
                    args: Prisma.SalesInvoiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload>;
                };
                createMany: {
                    args: Prisma.SalesInvoiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SalesInvoiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload>[];
                };
                delete: {
                    args: Prisma.SalesInvoiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload>;
                };
                update: {
                    args: Prisma.SalesInvoiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload>;
                };
                deleteMany: {
                    args: Prisma.SalesInvoiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SalesInvoiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SalesInvoiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload>[];
                };
                upsert: {
                    args: Prisma.SalesInvoiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoicePayload>;
                };
                aggregate: {
                    args: Prisma.SalesInvoiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSalesInvoice>;
                };
                groupBy: {
                    args: Prisma.SalesInvoiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesInvoiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SalesInvoiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesInvoiceCountAggregateOutputType> | number;
                };
            };
        };
        SalesInvoiceItem: {
            payload: Prisma.$SalesInvoiceItemPayload<ExtArgs>;
            fields: Prisma.SalesInvoiceItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SalesInvoiceItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SalesInvoiceItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload>;
                };
                findFirst: {
                    args: Prisma.SalesInvoiceItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SalesInvoiceItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload>;
                };
                findMany: {
                    args: Prisma.SalesInvoiceItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload>[];
                };
                create: {
                    args: Prisma.SalesInvoiceItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload>;
                };
                createMany: {
                    args: Prisma.SalesInvoiceItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SalesInvoiceItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload>[];
                };
                delete: {
                    args: Prisma.SalesInvoiceItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload>;
                };
                update: {
                    args: Prisma.SalesInvoiceItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload>;
                };
                deleteMany: {
                    args: Prisma.SalesInvoiceItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SalesInvoiceItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SalesInvoiceItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload>[];
                };
                upsert: {
                    args: Prisma.SalesInvoiceItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesInvoiceItemPayload>;
                };
                aggregate: {
                    args: Prisma.SalesInvoiceItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSalesInvoiceItem>;
                };
                groupBy: {
                    args: Prisma.SalesInvoiceItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesInvoiceItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SalesInvoiceItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesInvoiceItemCountAggregateOutputType> | number;
                };
            };
        };
        SalesReturn: {
            payload: Prisma.$SalesReturnPayload<ExtArgs>;
            fields: Prisma.SalesReturnFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SalesReturnFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SalesReturnFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload>;
                };
                findFirst: {
                    args: Prisma.SalesReturnFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SalesReturnFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload>;
                };
                findMany: {
                    args: Prisma.SalesReturnFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload>[];
                };
                create: {
                    args: Prisma.SalesReturnCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload>;
                };
                createMany: {
                    args: Prisma.SalesReturnCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SalesReturnCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload>[];
                };
                delete: {
                    args: Prisma.SalesReturnDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload>;
                };
                update: {
                    args: Prisma.SalesReturnUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload>;
                };
                deleteMany: {
                    args: Prisma.SalesReturnDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SalesReturnUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SalesReturnUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload>[];
                };
                upsert: {
                    args: Prisma.SalesReturnUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnPayload>;
                };
                aggregate: {
                    args: Prisma.SalesReturnAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSalesReturn>;
                };
                groupBy: {
                    args: Prisma.SalesReturnGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesReturnGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SalesReturnCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesReturnCountAggregateOutputType> | number;
                };
            };
        };
        SalesReturnItem: {
            payload: Prisma.$SalesReturnItemPayload<ExtArgs>;
            fields: Prisma.SalesReturnItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SalesReturnItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SalesReturnItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload>;
                };
                findFirst: {
                    args: Prisma.SalesReturnItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SalesReturnItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload>;
                };
                findMany: {
                    args: Prisma.SalesReturnItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload>[];
                };
                create: {
                    args: Prisma.SalesReturnItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload>;
                };
                createMany: {
                    args: Prisma.SalesReturnItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SalesReturnItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload>[];
                };
                delete: {
                    args: Prisma.SalesReturnItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload>;
                };
                update: {
                    args: Prisma.SalesReturnItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload>;
                };
                deleteMany: {
                    args: Prisma.SalesReturnItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SalesReturnItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SalesReturnItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload>[];
                };
                upsert: {
                    args: Prisma.SalesReturnItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesReturnItemPayload>;
                };
                aggregate: {
                    args: Prisma.SalesReturnItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSalesReturnItem>;
                };
                groupBy: {
                    args: Prisma.SalesReturnItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesReturnItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SalesReturnItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesReturnItemCountAggregateOutputType> | number;
                };
            };
        };
        PriceList: {
            payload: Prisma.$PriceListPayload<ExtArgs>;
            fields: Prisma.PriceListFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PriceListFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PriceListFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload>;
                };
                findFirst: {
                    args: Prisma.PriceListFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PriceListFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload>;
                };
                findMany: {
                    args: Prisma.PriceListFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload>[];
                };
                create: {
                    args: Prisma.PriceListCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload>;
                };
                createMany: {
                    args: Prisma.PriceListCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PriceListCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload>[];
                };
                delete: {
                    args: Prisma.PriceListDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload>;
                };
                update: {
                    args: Prisma.PriceListUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload>;
                };
                deleteMany: {
                    args: Prisma.PriceListDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PriceListUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PriceListUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload>[];
                };
                upsert: {
                    args: Prisma.PriceListUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListPayload>;
                };
                aggregate: {
                    args: Prisma.PriceListAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePriceList>;
                };
                groupBy: {
                    args: Prisma.PriceListGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriceListGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PriceListCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriceListCountAggregateOutputType> | number;
                };
            };
        };
        PriceListItem: {
            payload: Prisma.$PriceListItemPayload<ExtArgs>;
            fields: Prisma.PriceListItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PriceListItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PriceListItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload>;
                };
                findFirst: {
                    args: Prisma.PriceListItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PriceListItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload>;
                };
                findMany: {
                    args: Prisma.PriceListItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload>[];
                };
                create: {
                    args: Prisma.PriceListItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload>;
                };
                createMany: {
                    args: Prisma.PriceListItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PriceListItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload>[];
                };
                delete: {
                    args: Prisma.PriceListItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload>;
                };
                update: {
                    args: Prisma.PriceListItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PriceListItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PriceListItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PriceListItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload>[];
                };
                upsert: {
                    args: Prisma.PriceListItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceListItemPayload>;
                };
                aggregate: {
                    args: Prisma.PriceListItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePriceListItem>;
                };
                groupBy: {
                    args: Prisma.PriceListItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriceListItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PriceListItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriceListItemCountAggregateOutputType> | number;
                };
            };
        };
        PriceRule: {
            payload: Prisma.$PriceRulePayload<ExtArgs>;
            fields: Prisma.PriceRuleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PriceRuleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PriceRuleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload>;
                };
                findFirst: {
                    args: Prisma.PriceRuleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PriceRuleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload>;
                };
                findMany: {
                    args: Prisma.PriceRuleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload>[];
                };
                create: {
                    args: Prisma.PriceRuleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload>;
                };
                createMany: {
                    args: Prisma.PriceRuleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PriceRuleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload>[];
                };
                delete: {
                    args: Prisma.PriceRuleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload>;
                };
                update: {
                    args: Prisma.PriceRuleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload>;
                };
                deleteMany: {
                    args: Prisma.PriceRuleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PriceRuleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PriceRuleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload>[];
                };
                upsert: {
                    args: Prisma.PriceRuleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriceRulePayload>;
                };
                aggregate: {
                    args: Prisma.PriceRuleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePriceRule>;
                };
                groupBy: {
                    args: Prisma.PriceRuleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriceRuleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PriceRuleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriceRuleCountAggregateOutputType> | number;
                };
            };
        };
        DiscountRule: {
            payload: Prisma.$DiscountRulePayload<ExtArgs>;
            fields: Prisma.DiscountRuleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiscountRuleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiscountRuleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload>;
                };
                findFirst: {
                    args: Prisma.DiscountRuleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiscountRuleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload>;
                };
                findMany: {
                    args: Prisma.DiscountRuleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload>[];
                };
                create: {
                    args: Prisma.DiscountRuleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload>;
                };
                createMany: {
                    args: Prisma.DiscountRuleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiscountRuleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload>[];
                };
                delete: {
                    args: Prisma.DiscountRuleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload>;
                };
                update: {
                    args: Prisma.DiscountRuleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload>;
                };
                deleteMany: {
                    args: Prisma.DiscountRuleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiscountRuleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiscountRuleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload>[];
                };
                upsert: {
                    args: Prisma.DiscountRuleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountRulePayload>;
                };
                aggregate: {
                    args: Prisma.DiscountRuleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiscountRule>;
                };
                groupBy: {
                    args: Prisma.DiscountRuleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiscountRuleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiscountRuleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiscountRuleCountAggregateOutputType> | number;
                };
            };
        };
        Carrier: {
            payload: Prisma.$CarrierPayload<ExtArgs>;
            fields: Prisma.CarrierFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CarrierFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CarrierFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload>;
                };
                findFirst: {
                    args: Prisma.CarrierFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CarrierFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload>;
                };
                findMany: {
                    args: Prisma.CarrierFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload>[];
                };
                create: {
                    args: Prisma.CarrierCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload>;
                };
                createMany: {
                    args: Prisma.CarrierCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CarrierCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload>[];
                };
                delete: {
                    args: Prisma.CarrierDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload>;
                };
                update: {
                    args: Prisma.CarrierUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload>;
                };
                deleteMany: {
                    args: Prisma.CarrierDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CarrierUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CarrierUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload>[];
                };
                upsert: {
                    args: Prisma.CarrierUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CarrierPayload>;
                };
                aggregate: {
                    args: Prisma.CarrierAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCarrier>;
                };
                groupBy: {
                    args: Prisma.CarrierGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CarrierGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CarrierCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CarrierCountAggregateOutputType> | number;
                };
            };
        };
        Shipment: {
            payload: Prisma.$ShipmentPayload<ExtArgs>;
            fields: Prisma.ShipmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ShipmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ShipmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload>;
                };
                findFirst: {
                    args: Prisma.ShipmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ShipmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload>;
                };
                findMany: {
                    args: Prisma.ShipmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload>[];
                };
                create: {
                    args: Prisma.ShipmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload>;
                };
                createMany: {
                    args: Prisma.ShipmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ShipmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload>[];
                };
                delete: {
                    args: Prisma.ShipmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload>;
                };
                update: {
                    args: Prisma.ShipmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload>;
                };
                deleteMany: {
                    args: Prisma.ShipmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ShipmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ShipmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload>[];
                };
                upsert: {
                    args: Prisma.ShipmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentPayload>;
                };
                aggregate: {
                    args: Prisma.ShipmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateShipment>;
                };
                groupBy: {
                    args: Prisma.ShipmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShipmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ShipmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShipmentCountAggregateOutputType> | number;
                };
            };
        };
        CommissionScheme: {
            payload: Prisma.$CommissionSchemePayload<ExtArgs>;
            fields: Prisma.CommissionSchemeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommissionSchemeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommissionSchemeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload>;
                };
                findFirst: {
                    args: Prisma.CommissionSchemeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommissionSchemeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload>;
                };
                findMany: {
                    args: Prisma.CommissionSchemeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload>[];
                };
                create: {
                    args: Prisma.CommissionSchemeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload>;
                };
                createMany: {
                    args: Prisma.CommissionSchemeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommissionSchemeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload>[];
                };
                delete: {
                    args: Prisma.CommissionSchemeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload>;
                };
                update: {
                    args: Prisma.CommissionSchemeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload>;
                };
                deleteMany: {
                    args: Prisma.CommissionSchemeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommissionSchemeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommissionSchemeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload>[];
                };
                upsert: {
                    args: Prisma.CommissionSchemeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionSchemePayload>;
                };
                aggregate: {
                    args: Prisma.CommissionSchemeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommissionScheme>;
                };
                groupBy: {
                    args: Prisma.CommissionSchemeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommissionSchemeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommissionSchemeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommissionSchemeCountAggregateOutputType> | number;
                };
            };
        };
        CommissionEntry: {
            payload: Prisma.$CommissionEntryPayload<ExtArgs>;
            fields: Prisma.CommissionEntryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommissionEntryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommissionEntryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload>;
                };
                findFirst: {
                    args: Prisma.CommissionEntryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommissionEntryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload>;
                };
                findMany: {
                    args: Prisma.CommissionEntryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload>[];
                };
                create: {
                    args: Prisma.CommissionEntryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload>;
                };
                createMany: {
                    args: Prisma.CommissionEntryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommissionEntryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload>[];
                };
                delete: {
                    args: Prisma.CommissionEntryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload>;
                };
                update: {
                    args: Prisma.CommissionEntryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload>;
                };
                deleteMany: {
                    args: Prisma.CommissionEntryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommissionEntryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommissionEntryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload>[];
                };
                upsert: {
                    args: Prisma.CommissionEntryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommissionEntryPayload>;
                };
                aggregate: {
                    args: Prisma.CommissionEntryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCommissionEntry>;
                };
                groupBy: {
                    args: Prisma.CommissionEntryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommissionEntryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommissionEntryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommissionEntryCountAggregateOutputType> | number;
                };
            };
        };
        Supplier: {
            payload: Prisma.$SupplierPayload<ExtArgs>;
            fields: Prisma.SupplierFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SupplierFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                findFirst: {
                    args: Prisma.SupplierFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                findMany: {
                    args: Prisma.SupplierFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>[];
                };
                create: {
                    args: Prisma.SupplierCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                createMany: {
                    args: Prisma.SupplierCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SupplierCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>[];
                };
                delete: {
                    args: Prisma.SupplierDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                update: {
                    args: Prisma.SupplierUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                deleteMany: {
                    args: Prisma.SupplierDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SupplierUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SupplierUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>[];
                };
                upsert: {
                    args: Prisma.SupplierUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierPayload>;
                };
                aggregate: {
                    args: Prisma.SupplierAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSupplier>;
                };
                groupBy: {
                    args: Prisma.SupplierGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SupplierCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseRequisition: {
            payload: Prisma.$PurchaseRequisitionPayload<ExtArgs>;
            fields: Prisma.PurchaseRequisitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseRequisitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseRequisitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseRequisitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseRequisitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseRequisitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload>[];
                };
                create: {
                    args: Prisma.PurchaseRequisitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseRequisitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseRequisitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseRequisitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload>;
                };
                update: {
                    args: Prisma.PurchaseRequisitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseRequisitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseRequisitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseRequisitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseRequisitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseRequisitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseRequisition>;
                };
                groupBy: {
                    args: Prisma.PurchaseRequisitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseRequisitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseRequisitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseRequisitionCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseRequisitionItem: {
            payload: Prisma.$PurchaseRequisitionItemPayload<ExtArgs>;
            fields: Prisma.PurchaseRequisitionItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseRequisitionItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseRequisitionItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseRequisitionItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseRequisitionItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseRequisitionItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload>[];
                };
                create: {
                    args: Prisma.PurchaseRequisitionItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseRequisitionItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseRequisitionItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseRequisitionItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload>;
                };
                update: {
                    args: Prisma.PurchaseRequisitionItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseRequisitionItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseRequisitionItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseRequisitionItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseRequisitionItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseRequisitionItemPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseRequisitionItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseRequisitionItem>;
                };
                groupBy: {
                    args: Prisma.PurchaseRequisitionItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseRequisitionItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseRequisitionItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseRequisitionItemCountAggregateOutputType> | number;
                };
            };
        };
        Rfq: {
            payload: Prisma.$RfqPayload<ExtArgs>;
            fields: Prisma.RfqFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RfqFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RfqFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                findFirst: {
                    args: Prisma.RfqFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RfqFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                findMany: {
                    args: Prisma.RfqFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>[];
                };
                create: {
                    args: Prisma.RfqCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                createMany: {
                    args: Prisma.RfqCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RfqCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>[];
                };
                delete: {
                    args: Prisma.RfqDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                update: {
                    args: Prisma.RfqUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                deleteMany: {
                    args: Prisma.RfqDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RfqUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RfqUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>[];
                };
                upsert: {
                    args: Prisma.RfqUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                aggregate: {
                    args: Prisma.RfqAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRfq>;
                };
                groupBy: {
                    args: Prisma.RfqGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RfqCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqCountAggregateOutputType> | number;
                };
            };
        };
        RfqVendor: {
            payload: Prisma.$RfqVendorPayload<ExtArgs>;
            fields: Prisma.RfqVendorFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RfqVendorFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RfqVendorFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload>;
                };
                findFirst: {
                    args: Prisma.RfqVendorFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RfqVendorFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload>;
                };
                findMany: {
                    args: Prisma.RfqVendorFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload>[];
                };
                create: {
                    args: Prisma.RfqVendorCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload>;
                };
                createMany: {
                    args: Prisma.RfqVendorCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RfqVendorCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload>[];
                };
                delete: {
                    args: Prisma.RfqVendorDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload>;
                };
                update: {
                    args: Prisma.RfqVendorUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload>;
                };
                deleteMany: {
                    args: Prisma.RfqVendorDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RfqVendorUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RfqVendorUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload>[];
                };
                upsert: {
                    args: Prisma.RfqVendorUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqVendorPayload>;
                };
                aggregate: {
                    args: Prisma.RfqVendorAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRfqVendor>;
                };
                groupBy: {
                    args: Prisma.RfqVendorGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqVendorGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RfqVendorCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqVendorCountAggregateOutputType> | number;
                };
            };
        };
        RfqItem: {
            payload: Prisma.$RfqItemPayload<ExtArgs>;
            fields: Prisma.RfqItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RfqItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RfqItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload>;
                };
                findFirst: {
                    args: Prisma.RfqItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RfqItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload>;
                };
                findMany: {
                    args: Prisma.RfqItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload>[];
                };
                create: {
                    args: Prisma.RfqItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload>;
                };
                createMany: {
                    args: Prisma.RfqItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RfqItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload>[];
                };
                delete: {
                    args: Prisma.RfqItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload>;
                };
                update: {
                    args: Prisma.RfqItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload>;
                };
                deleteMany: {
                    args: Prisma.RfqItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RfqItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RfqItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload>[];
                };
                upsert: {
                    args: Prisma.RfqItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqItemPayload>;
                };
                aggregate: {
                    args: Prisma.RfqItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRfqItem>;
                };
                groupBy: {
                    args: Prisma.RfqItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RfqItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqItemCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseOrder: {
            payload: Prisma.$PurchaseOrderPayload<ExtArgs>;
            fields: Prisma.PurchaseOrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseOrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseOrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseOrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseOrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseOrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[];
                };
                create: {
                    args: Prisma.PurchaseOrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseOrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseOrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseOrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                update: {
                    args: Prisma.PurchaseOrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseOrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseOrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseOrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseOrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseOrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseOrder>;
                };
                groupBy: {
                    args: Prisma.PurchaseOrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseOrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseOrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseOrderCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseOrderItem: {
            payload: Prisma.$PurchaseOrderItemPayload<ExtArgs>;
            fields: Prisma.PurchaseOrderItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseOrderItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseOrderItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseOrderItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseOrderItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseOrderItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>[];
                };
                create: {
                    args: Prisma.PurchaseOrderItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseOrderItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseOrderItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseOrderItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                update: {
                    args: Prisma.PurchaseOrderItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseOrderItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseOrderItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseOrderItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseOrderItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseOrderItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseOrderItem>;
                };
                groupBy: {
                    args: Prisma.PurchaseOrderItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseOrderItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseOrderItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseOrderItemCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseInvoice: {
            payload: Prisma.$PurchaseInvoicePayload<ExtArgs>;
            fields: Prisma.PurchaseInvoiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseInvoiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseInvoiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseInvoiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseInvoiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload>;
                };
                findMany: {
                    args: Prisma.PurchaseInvoiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload>[];
                };
                create: {
                    args: Prisma.PurchaseInvoiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload>;
                };
                createMany: {
                    args: Prisma.PurchaseInvoiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseInvoiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload>[];
                };
                delete: {
                    args: Prisma.PurchaseInvoiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload>;
                };
                update: {
                    args: Prisma.PurchaseInvoiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseInvoiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseInvoiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseInvoiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseInvoiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoicePayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseInvoiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseInvoice>;
                };
                groupBy: {
                    args: Prisma.PurchaseInvoiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseInvoiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseInvoiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseInvoiceCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseInvoiceItem: {
            payload: Prisma.$PurchaseInvoiceItemPayload<ExtArgs>;
            fields: Prisma.PurchaseInvoiceItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseInvoiceItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseInvoiceItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseInvoiceItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseInvoiceItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseInvoiceItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload>[];
                };
                create: {
                    args: Prisma.PurchaseInvoiceItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseInvoiceItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseInvoiceItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseInvoiceItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload>;
                };
                update: {
                    args: Prisma.PurchaseInvoiceItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseInvoiceItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseInvoiceItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseInvoiceItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseInvoiceItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseInvoiceItemPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseInvoiceItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseInvoiceItem>;
                };
                groupBy: {
                    args: Prisma.PurchaseInvoiceItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseInvoiceItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseInvoiceItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseInvoiceItemCountAggregateOutputType> | number;
                };
            };
        };
        LandedCostVoucher: {
            payload: Prisma.$LandedCostVoucherPayload<ExtArgs>;
            fields: Prisma.LandedCostVoucherFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LandedCostVoucherFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LandedCostVoucherFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload>;
                };
                findFirst: {
                    args: Prisma.LandedCostVoucherFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LandedCostVoucherFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload>;
                };
                findMany: {
                    args: Prisma.LandedCostVoucherFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload>[];
                };
                create: {
                    args: Prisma.LandedCostVoucherCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload>;
                };
                createMany: {
                    args: Prisma.LandedCostVoucherCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LandedCostVoucherCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload>[];
                };
                delete: {
                    args: Prisma.LandedCostVoucherDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload>;
                };
                update: {
                    args: Prisma.LandedCostVoucherUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload>;
                };
                deleteMany: {
                    args: Prisma.LandedCostVoucherDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LandedCostVoucherUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LandedCostVoucherUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload>[];
                };
                upsert: {
                    args: Prisma.LandedCostVoucherUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostVoucherPayload>;
                };
                aggregate: {
                    args: Prisma.LandedCostVoucherAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLandedCostVoucher>;
                };
                groupBy: {
                    args: Prisma.LandedCostVoucherGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LandedCostVoucherGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LandedCostVoucherCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LandedCostVoucherCountAggregateOutputType> | number;
                };
            };
        };
        LandedCostAllocation: {
            payload: Prisma.$LandedCostAllocationPayload<ExtArgs>;
            fields: Prisma.LandedCostAllocationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LandedCostAllocationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LandedCostAllocationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload>;
                };
                findFirst: {
                    args: Prisma.LandedCostAllocationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LandedCostAllocationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload>;
                };
                findMany: {
                    args: Prisma.LandedCostAllocationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload>[];
                };
                create: {
                    args: Prisma.LandedCostAllocationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload>;
                };
                createMany: {
                    args: Prisma.LandedCostAllocationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LandedCostAllocationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload>[];
                };
                delete: {
                    args: Prisma.LandedCostAllocationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload>;
                };
                update: {
                    args: Prisma.LandedCostAllocationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload>;
                };
                deleteMany: {
                    args: Prisma.LandedCostAllocationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LandedCostAllocationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LandedCostAllocationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload>[];
                };
                upsert: {
                    args: Prisma.LandedCostAllocationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LandedCostAllocationPayload>;
                };
                aggregate: {
                    args: Prisma.LandedCostAllocationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLandedCostAllocation>;
                };
                groupBy: {
                    args: Prisma.LandedCostAllocationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LandedCostAllocationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LandedCostAllocationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LandedCostAllocationCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseReturn: {
            payload: Prisma.$PurchaseReturnPayload<ExtArgs>;
            fields: Prisma.PurchaseReturnFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseReturnFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseReturnFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseReturnFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseReturnFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseReturnFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload>[];
                };
                create: {
                    args: Prisma.PurchaseReturnCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseReturnCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseReturnCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseReturnDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload>;
                };
                update: {
                    args: Prisma.PurchaseReturnUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseReturnDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseReturnUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseReturnUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseReturnUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseReturnAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseReturn>;
                };
                groupBy: {
                    args: Prisma.PurchaseReturnGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseReturnGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseReturnCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseReturnCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseReturnItem: {
            payload: Prisma.$PurchaseReturnItemPayload<ExtArgs>;
            fields: Prisma.PurchaseReturnItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseReturnItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseReturnItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseReturnItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseReturnItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseReturnItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload>[];
                };
                create: {
                    args: Prisma.PurchaseReturnItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseReturnItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseReturnItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseReturnItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload>;
                };
                update: {
                    args: Prisma.PurchaseReturnItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseReturnItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseReturnItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseReturnItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseReturnItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseReturnItemPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseReturnItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseReturnItem>;
                };
                groupBy: {
                    args: Prisma.PurchaseReturnItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseReturnItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseReturnItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseReturnItemCountAggregateOutputType> | number;
                };
            };
        };
        ItemGroup: {
            payload: Prisma.$ItemGroupPayload<ExtArgs>;
            fields: Prisma.ItemGroupFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ItemGroupFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ItemGroupFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload>;
                };
                findFirst: {
                    args: Prisma.ItemGroupFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ItemGroupFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload>;
                };
                findMany: {
                    args: Prisma.ItemGroupFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload>[];
                };
                create: {
                    args: Prisma.ItemGroupCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload>;
                };
                createMany: {
                    args: Prisma.ItemGroupCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ItemGroupCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload>[];
                };
                delete: {
                    args: Prisma.ItemGroupDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload>;
                };
                update: {
                    args: Prisma.ItemGroupUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload>;
                };
                deleteMany: {
                    args: Prisma.ItemGroupDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ItemGroupUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ItemGroupUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload>[];
                };
                upsert: {
                    args: Prisma.ItemGroupUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemGroupPayload>;
                };
                aggregate: {
                    args: Prisma.ItemGroupAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateItemGroup>;
                };
                groupBy: {
                    args: Prisma.ItemGroupGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemGroupGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ItemGroupCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemGroupCountAggregateOutputType> | number;
                };
            };
        };
        Item: {
            payload: Prisma.$ItemPayload<ExtArgs>;
            fields: Prisma.ItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload>;
                };
                findFirst: {
                    args: Prisma.ItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload>;
                };
                findMany: {
                    args: Prisma.ItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload>[];
                };
                create: {
                    args: Prisma.ItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload>;
                };
                createMany: {
                    args: Prisma.ItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload>[];
                };
                delete: {
                    args: Prisma.ItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload>;
                };
                update: {
                    args: Prisma.ItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload>;
                };
                deleteMany: {
                    args: Prisma.ItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload>[];
                };
                upsert: {
                    args: Prisma.ItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemPayload>;
                };
                aggregate: {
                    args: Prisma.ItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateItem>;
                };
                groupBy: {
                    args: Prisma.ItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemCountAggregateOutputType> | number;
                };
            };
        };
        ItemUom: {
            payload: Prisma.$ItemUomPayload<ExtArgs>;
            fields: Prisma.ItemUomFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ItemUomFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ItemUomFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload>;
                };
                findFirst: {
                    args: Prisma.ItemUomFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ItemUomFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload>;
                };
                findMany: {
                    args: Prisma.ItemUomFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload>[];
                };
                create: {
                    args: Prisma.ItemUomCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload>;
                };
                createMany: {
                    args: Prisma.ItemUomCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ItemUomCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload>[];
                };
                delete: {
                    args: Prisma.ItemUomDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload>;
                };
                update: {
                    args: Prisma.ItemUomUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload>;
                };
                deleteMany: {
                    args: Prisma.ItemUomDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ItemUomUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ItemUomUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload>[];
                };
                upsert: {
                    args: Prisma.ItemUomUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemUomPayload>;
                };
                aggregate: {
                    args: Prisma.ItemUomAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateItemUom>;
                };
                groupBy: {
                    args: Prisma.ItemUomGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemUomGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ItemUomCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemUomCountAggregateOutputType> | number;
                };
            };
        };
        ItemBarcode: {
            payload: Prisma.$ItemBarcodePayload<ExtArgs>;
            fields: Prisma.ItemBarcodeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ItemBarcodeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ItemBarcodeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload>;
                };
                findFirst: {
                    args: Prisma.ItemBarcodeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ItemBarcodeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload>;
                };
                findMany: {
                    args: Prisma.ItemBarcodeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload>[];
                };
                create: {
                    args: Prisma.ItemBarcodeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload>;
                };
                createMany: {
                    args: Prisma.ItemBarcodeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ItemBarcodeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload>[];
                };
                delete: {
                    args: Prisma.ItemBarcodeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload>;
                };
                update: {
                    args: Prisma.ItemBarcodeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload>;
                };
                deleteMany: {
                    args: Prisma.ItemBarcodeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ItemBarcodeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ItemBarcodeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload>[];
                };
                upsert: {
                    args: Prisma.ItemBarcodeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBarcodePayload>;
                };
                aggregate: {
                    args: Prisma.ItemBarcodeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateItemBarcode>;
                };
                groupBy: {
                    args: Prisma.ItemBarcodeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemBarcodeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ItemBarcodeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemBarcodeCountAggregateOutputType> | number;
                };
            };
        };
        Warehouse: {
            payload: Prisma.$WarehousePayload<ExtArgs>;
            fields: Prisma.WarehouseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WarehouseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WarehouseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                findFirst: {
                    args: Prisma.WarehouseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WarehouseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                findMany: {
                    args: Prisma.WarehouseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>[];
                };
                create: {
                    args: Prisma.WarehouseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                createMany: {
                    args: Prisma.WarehouseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WarehouseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>[];
                };
                delete: {
                    args: Prisma.WarehouseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                update: {
                    args: Prisma.WarehouseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                deleteMany: {
                    args: Prisma.WarehouseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WarehouseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WarehouseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>[];
                };
                upsert: {
                    args: Prisma.WarehouseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WarehousePayload>;
                };
                aggregate: {
                    args: Prisma.WarehouseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWarehouse>;
                };
                groupBy: {
                    args: Prisma.WarehouseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WarehouseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WarehouseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WarehouseCountAggregateOutputType> | number;
                };
            };
        };
        BinLocation: {
            payload: Prisma.$BinLocationPayload<ExtArgs>;
            fields: Prisma.BinLocationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BinLocationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BinLocationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload>;
                };
                findFirst: {
                    args: Prisma.BinLocationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BinLocationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload>;
                };
                findMany: {
                    args: Prisma.BinLocationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload>[];
                };
                create: {
                    args: Prisma.BinLocationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload>;
                };
                createMany: {
                    args: Prisma.BinLocationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BinLocationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload>[];
                };
                delete: {
                    args: Prisma.BinLocationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload>;
                };
                update: {
                    args: Prisma.BinLocationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload>;
                };
                deleteMany: {
                    args: Prisma.BinLocationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BinLocationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BinLocationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload>[];
                };
                upsert: {
                    args: Prisma.BinLocationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BinLocationPayload>;
                };
                aggregate: {
                    args: Prisma.BinLocationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBinLocation>;
                };
                groupBy: {
                    args: Prisma.BinLocationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BinLocationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BinLocationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BinLocationCountAggregateOutputType> | number;
                };
            };
        };
        StockLedger: {
            payload: Prisma.$StockLedgerPayload<ExtArgs>;
            fields: Prisma.StockLedgerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StockLedgerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StockLedgerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload>;
                };
                findFirst: {
                    args: Prisma.StockLedgerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StockLedgerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload>;
                };
                findMany: {
                    args: Prisma.StockLedgerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload>[];
                };
                create: {
                    args: Prisma.StockLedgerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload>;
                };
                createMany: {
                    args: Prisma.StockLedgerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StockLedgerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload>[];
                };
                delete: {
                    args: Prisma.StockLedgerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload>;
                };
                update: {
                    args: Prisma.StockLedgerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload>;
                };
                deleteMany: {
                    args: Prisma.StockLedgerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StockLedgerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StockLedgerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload>[];
                };
                upsert: {
                    args: Prisma.StockLedgerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockLedgerPayload>;
                };
                aggregate: {
                    args: Prisma.StockLedgerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStockLedger>;
                };
                groupBy: {
                    args: Prisma.StockLedgerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockLedgerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StockLedgerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockLedgerCountAggregateOutputType> | number;
                };
            };
        };
        GoodsReceiptNote: {
            payload: Prisma.$GoodsReceiptNotePayload<ExtArgs>;
            fields: Prisma.GoodsReceiptNoteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GoodsReceiptNoteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GoodsReceiptNoteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>;
                };
                findFirst: {
                    args: Prisma.GoodsReceiptNoteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GoodsReceiptNoteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>;
                };
                findMany: {
                    args: Prisma.GoodsReceiptNoteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>[];
                };
                create: {
                    args: Prisma.GoodsReceiptNoteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>;
                };
                createMany: {
                    args: Prisma.GoodsReceiptNoteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GoodsReceiptNoteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>[];
                };
                delete: {
                    args: Prisma.GoodsReceiptNoteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>;
                };
                update: {
                    args: Prisma.GoodsReceiptNoteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>;
                };
                deleteMany: {
                    args: Prisma.GoodsReceiptNoteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GoodsReceiptNoteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GoodsReceiptNoteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>[];
                };
                upsert: {
                    args: Prisma.GoodsReceiptNoteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>;
                };
                aggregate: {
                    args: Prisma.GoodsReceiptNoteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGoodsReceiptNote>;
                };
                groupBy: {
                    args: Prisma.GoodsReceiptNoteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GoodsReceiptNoteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GoodsReceiptNoteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GoodsReceiptNoteCountAggregateOutputType> | number;
                };
            };
        };
        GoodsReceiptItem: {
            payload: Prisma.$GoodsReceiptItemPayload<ExtArgs>;
            fields: Prisma.GoodsReceiptItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GoodsReceiptItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GoodsReceiptItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload>;
                };
                findFirst: {
                    args: Prisma.GoodsReceiptItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GoodsReceiptItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload>;
                };
                findMany: {
                    args: Prisma.GoodsReceiptItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload>[];
                };
                create: {
                    args: Prisma.GoodsReceiptItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload>;
                };
                createMany: {
                    args: Prisma.GoodsReceiptItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GoodsReceiptItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload>[];
                };
                delete: {
                    args: Prisma.GoodsReceiptItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload>;
                };
                update: {
                    args: Prisma.GoodsReceiptItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload>;
                };
                deleteMany: {
                    args: Prisma.GoodsReceiptItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GoodsReceiptItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GoodsReceiptItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload>[];
                };
                upsert: {
                    args: Prisma.GoodsReceiptItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsReceiptItemPayload>;
                };
                aggregate: {
                    args: Prisma.GoodsReceiptItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGoodsReceiptItem>;
                };
                groupBy: {
                    args: Prisma.GoodsReceiptItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GoodsReceiptItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GoodsReceiptItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GoodsReceiptItemCountAggregateOutputType> | number;
                };
            };
        };
        StockTransfer: {
            payload: Prisma.$StockTransferPayload<ExtArgs>;
            fields: Prisma.StockTransferFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StockTransferFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StockTransferFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload>;
                };
                findFirst: {
                    args: Prisma.StockTransferFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StockTransferFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload>;
                };
                findMany: {
                    args: Prisma.StockTransferFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload>[];
                };
                create: {
                    args: Prisma.StockTransferCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload>;
                };
                createMany: {
                    args: Prisma.StockTransferCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StockTransferCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload>[];
                };
                delete: {
                    args: Prisma.StockTransferDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload>;
                };
                update: {
                    args: Prisma.StockTransferUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload>;
                };
                deleteMany: {
                    args: Prisma.StockTransferDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StockTransferUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StockTransferUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload>[];
                };
                upsert: {
                    args: Prisma.StockTransferUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferPayload>;
                };
                aggregate: {
                    args: Prisma.StockTransferAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStockTransfer>;
                };
                groupBy: {
                    args: Prisma.StockTransferGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockTransferGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StockTransferCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockTransferCountAggregateOutputType> | number;
                };
            };
        };
        StockTransferItem: {
            payload: Prisma.$StockTransferItemPayload<ExtArgs>;
            fields: Prisma.StockTransferItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StockTransferItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StockTransferItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload>;
                };
                findFirst: {
                    args: Prisma.StockTransferItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StockTransferItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload>;
                };
                findMany: {
                    args: Prisma.StockTransferItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload>[];
                };
                create: {
                    args: Prisma.StockTransferItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload>;
                };
                createMany: {
                    args: Prisma.StockTransferItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StockTransferItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload>[];
                };
                delete: {
                    args: Prisma.StockTransferItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload>;
                };
                update: {
                    args: Prisma.StockTransferItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload>;
                };
                deleteMany: {
                    args: Prisma.StockTransferItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StockTransferItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StockTransferItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload>[];
                };
                upsert: {
                    args: Prisma.StockTransferItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockTransferItemPayload>;
                };
                aggregate: {
                    args: Prisma.StockTransferItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStockTransferItem>;
                };
                groupBy: {
                    args: Prisma.StockTransferItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockTransferItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StockTransferItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockTransferItemCountAggregateOutputType> | number;
                };
            };
        };
        StockCount: {
            payload: Prisma.$StockCountPayload<ExtArgs>;
            fields: Prisma.StockCountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StockCountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StockCountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload>;
                };
                findFirst: {
                    args: Prisma.StockCountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StockCountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload>;
                };
                findMany: {
                    args: Prisma.StockCountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload>[];
                };
                create: {
                    args: Prisma.StockCountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload>;
                };
                createMany: {
                    args: Prisma.StockCountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StockCountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload>[];
                };
                delete: {
                    args: Prisma.StockCountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload>;
                };
                update: {
                    args: Prisma.StockCountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload>;
                };
                deleteMany: {
                    args: Prisma.StockCountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StockCountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StockCountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload>[];
                };
                upsert: {
                    args: Prisma.StockCountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountPayload>;
                };
                aggregate: {
                    args: Prisma.StockCountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStockCount>;
                };
                groupBy: {
                    args: Prisma.StockCountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockCountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StockCountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockCountCountAggregateOutputType> | number;
                };
            };
        };
        StockCountItem: {
            payload: Prisma.$StockCountItemPayload<ExtArgs>;
            fields: Prisma.StockCountItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StockCountItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StockCountItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload>;
                };
                findFirst: {
                    args: Prisma.StockCountItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StockCountItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload>;
                };
                findMany: {
                    args: Prisma.StockCountItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload>[];
                };
                create: {
                    args: Prisma.StockCountItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload>;
                };
                createMany: {
                    args: Prisma.StockCountItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StockCountItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload>[];
                };
                delete: {
                    args: Prisma.StockCountItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload>;
                };
                update: {
                    args: Prisma.StockCountItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload>;
                };
                deleteMany: {
                    args: Prisma.StockCountItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StockCountItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StockCountItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload>[];
                };
                upsert: {
                    args: Prisma.StockCountItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockCountItemPayload>;
                };
                aggregate: {
                    args: Prisma.StockCountItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStockCountItem>;
                };
                groupBy: {
                    args: Prisma.StockCountItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockCountItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StockCountItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockCountItemCountAggregateOutputType> | number;
                };
            };
        };
        GoodsIssueNote: {
            payload: Prisma.$GoodsIssueNotePayload<ExtArgs>;
            fields: Prisma.GoodsIssueNoteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GoodsIssueNoteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GoodsIssueNoteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>;
                };
                findFirst: {
                    args: Prisma.GoodsIssueNoteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GoodsIssueNoteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>;
                };
                findMany: {
                    args: Prisma.GoodsIssueNoteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>[];
                };
                create: {
                    args: Prisma.GoodsIssueNoteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>;
                };
                createMany: {
                    args: Prisma.GoodsIssueNoteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GoodsIssueNoteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>[];
                };
                delete: {
                    args: Prisma.GoodsIssueNoteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>;
                };
                update: {
                    args: Prisma.GoodsIssueNoteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>;
                };
                deleteMany: {
                    args: Prisma.GoodsIssueNoteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GoodsIssueNoteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GoodsIssueNoteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>[];
                };
                upsert: {
                    args: Prisma.GoodsIssueNoteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>;
                };
                aggregate: {
                    args: Prisma.GoodsIssueNoteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGoodsIssueNote>;
                };
                groupBy: {
                    args: Prisma.GoodsIssueNoteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GoodsIssueNoteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GoodsIssueNoteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GoodsIssueNoteCountAggregateOutputType> | number;
                };
            };
        };
        GoodsIssueItem: {
            payload: Prisma.$GoodsIssueItemPayload<ExtArgs>;
            fields: Prisma.GoodsIssueItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GoodsIssueItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GoodsIssueItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload>;
                };
                findFirst: {
                    args: Prisma.GoodsIssueItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GoodsIssueItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload>;
                };
                findMany: {
                    args: Prisma.GoodsIssueItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload>[];
                };
                create: {
                    args: Prisma.GoodsIssueItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload>;
                };
                createMany: {
                    args: Prisma.GoodsIssueItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GoodsIssueItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload>[];
                };
                delete: {
                    args: Prisma.GoodsIssueItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload>;
                };
                update: {
                    args: Prisma.GoodsIssueItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload>;
                };
                deleteMany: {
                    args: Prisma.GoodsIssueItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GoodsIssueItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GoodsIssueItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload>[];
                };
                upsert: {
                    args: Prisma.GoodsIssueItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GoodsIssueItemPayload>;
                };
                aggregate: {
                    args: Prisma.GoodsIssueItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGoodsIssueItem>;
                };
                groupBy: {
                    args: Prisma.GoodsIssueItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GoodsIssueItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GoodsIssueItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GoodsIssueItemCountAggregateOutputType> | number;
                };
            };
        };
        Putaway: {
            payload: Prisma.$PutawayPayload<ExtArgs>;
            fields: Prisma.PutawayFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PutawayFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PutawayFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload>;
                };
                findFirst: {
                    args: Prisma.PutawayFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PutawayFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload>;
                };
                findMany: {
                    args: Prisma.PutawayFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload>[];
                };
                create: {
                    args: Prisma.PutawayCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload>;
                };
                createMany: {
                    args: Prisma.PutawayCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PutawayCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload>[];
                };
                delete: {
                    args: Prisma.PutawayDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload>;
                };
                update: {
                    args: Prisma.PutawayUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload>;
                };
                deleteMany: {
                    args: Prisma.PutawayDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PutawayUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PutawayUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload>[];
                };
                upsert: {
                    args: Prisma.PutawayUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayPayload>;
                };
                aggregate: {
                    args: Prisma.PutawayAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePutaway>;
                };
                groupBy: {
                    args: Prisma.PutawayGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PutawayGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PutawayCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PutawayCountAggregateOutputType> | number;
                };
            };
        };
        PutawayItem: {
            payload: Prisma.$PutawayItemPayload<ExtArgs>;
            fields: Prisma.PutawayItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PutawayItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PutawayItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload>;
                };
                findFirst: {
                    args: Prisma.PutawayItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PutawayItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload>;
                };
                findMany: {
                    args: Prisma.PutawayItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload>[];
                };
                create: {
                    args: Prisma.PutawayItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload>;
                };
                createMany: {
                    args: Prisma.PutawayItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PutawayItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload>[];
                };
                delete: {
                    args: Prisma.PutawayItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload>;
                };
                update: {
                    args: Prisma.PutawayItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PutawayItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PutawayItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PutawayItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload>[];
                };
                upsert: {
                    args: Prisma.PutawayItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PutawayItemPayload>;
                };
                aggregate: {
                    args: Prisma.PutawayItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePutawayItem>;
                };
                groupBy: {
                    args: Prisma.PutawayItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PutawayItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PutawayItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PutawayItemCountAggregateOutputType> | number;
                };
            };
        };
        Picking: {
            payload: Prisma.$PickingPayload<ExtArgs>;
            fields: Prisma.PickingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PickingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PickingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload>;
                };
                findFirst: {
                    args: Prisma.PickingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PickingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload>;
                };
                findMany: {
                    args: Prisma.PickingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload>[];
                };
                create: {
                    args: Prisma.PickingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload>;
                };
                createMany: {
                    args: Prisma.PickingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PickingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload>[];
                };
                delete: {
                    args: Prisma.PickingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload>;
                };
                update: {
                    args: Prisma.PickingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload>;
                };
                deleteMany: {
                    args: Prisma.PickingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PickingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PickingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload>[];
                };
                upsert: {
                    args: Prisma.PickingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingPayload>;
                };
                aggregate: {
                    args: Prisma.PickingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePicking>;
                };
                groupBy: {
                    args: Prisma.PickingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PickingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PickingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PickingCountAggregateOutputType> | number;
                };
            };
        };
        PickingItem: {
            payload: Prisma.$PickingItemPayload<ExtArgs>;
            fields: Prisma.PickingItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PickingItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PickingItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload>;
                };
                findFirst: {
                    args: Prisma.PickingItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PickingItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload>;
                };
                findMany: {
                    args: Prisma.PickingItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload>[];
                };
                create: {
                    args: Prisma.PickingItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload>;
                };
                createMany: {
                    args: Prisma.PickingItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PickingItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload>[];
                };
                delete: {
                    args: Prisma.PickingItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload>;
                };
                update: {
                    args: Prisma.PickingItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PickingItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PickingItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PickingItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload>[];
                };
                upsert: {
                    args: Prisma.PickingItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickingItemPayload>;
                };
                aggregate: {
                    args: Prisma.PickingItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePickingItem>;
                };
                groupBy: {
                    args: Prisma.PickingItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PickingItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PickingItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PickingItemCountAggregateOutputType> | number;
                };
            };
        };
        Packing: {
            payload: Prisma.$PackingPayload<ExtArgs>;
            fields: Prisma.PackingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PackingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PackingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload>;
                };
                findFirst: {
                    args: Prisma.PackingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PackingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload>;
                };
                findMany: {
                    args: Prisma.PackingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload>[];
                };
                create: {
                    args: Prisma.PackingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload>;
                };
                createMany: {
                    args: Prisma.PackingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PackingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload>[];
                };
                delete: {
                    args: Prisma.PackingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload>;
                };
                update: {
                    args: Prisma.PackingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload>;
                };
                deleteMany: {
                    args: Prisma.PackingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PackingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PackingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload>[];
                };
                upsert: {
                    args: Prisma.PackingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingPayload>;
                };
                aggregate: {
                    args: Prisma.PackingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePacking>;
                };
                groupBy: {
                    args: Prisma.PackingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PackingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackingCountAggregateOutputType> | number;
                };
            };
        };
        PackingItem: {
            payload: Prisma.$PackingItemPayload<ExtArgs>;
            fields: Prisma.PackingItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PackingItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PackingItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload>;
                };
                findFirst: {
                    args: Prisma.PackingItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PackingItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload>;
                };
                findMany: {
                    args: Prisma.PackingItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload>[];
                };
                create: {
                    args: Prisma.PackingItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload>;
                };
                createMany: {
                    args: Prisma.PackingItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PackingItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload>[];
                };
                delete: {
                    args: Prisma.PackingItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload>;
                };
                update: {
                    args: Prisma.PackingItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PackingItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PackingItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PackingItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload>[];
                };
                upsert: {
                    args: Prisma.PackingItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingItemPayload>;
                };
                aggregate: {
                    args: Prisma.PackingItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePackingItem>;
                };
                groupBy: {
                    args: Prisma.PackingItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackingItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PackingItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackingItemCountAggregateOutputType> | number;
                };
            };
        };
        QcInspection: {
            payload: Prisma.$QcInspectionPayload<ExtArgs>;
            fields: Prisma.QcInspectionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QcInspectionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QcInspectionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload>;
                };
                findFirst: {
                    args: Prisma.QcInspectionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QcInspectionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload>;
                };
                findMany: {
                    args: Prisma.QcInspectionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload>[];
                };
                create: {
                    args: Prisma.QcInspectionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload>;
                };
                createMany: {
                    args: Prisma.QcInspectionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QcInspectionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload>[];
                };
                delete: {
                    args: Prisma.QcInspectionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload>;
                };
                update: {
                    args: Prisma.QcInspectionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload>;
                };
                deleteMany: {
                    args: Prisma.QcInspectionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QcInspectionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QcInspectionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload>[];
                };
                upsert: {
                    args: Prisma.QcInspectionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionPayload>;
                };
                aggregate: {
                    args: Prisma.QcInspectionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQcInspection>;
                };
                groupBy: {
                    args: Prisma.QcInspectionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QcInspectionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QcInspectionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QcInspectionCountAggregateOutputType> | number;
                };
            };
        };
        QcInspectionItem: {
            payload: Prisma.$QcInspectionItemPayload<ExtArgs>;
            fields: Prisma.QcInspectionItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QcInspectionItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QcInspectionItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload>;
                };
                findFirst: {
                    args: Prisma.QcInspectionItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QcInspectionItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload>;
                };
                findMany: {
                    args: Prisma.QcInspectionItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload>[];
                };
                create: {
                    args: Prisma.QcInspectionItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload>;
                };
                createMany: {
                    args: Prisma.QcInspectionItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QcInspectionItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload>[];
                };
                delete: {
                    args: Prisma.QcInspectionItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload>;
                };
                update: {
                    args: Prisma.QcInspectionItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload>;
                };
                deleteMany: {
                    args: Prisma.QcInspectionItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QcInspectionItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QcInspectionItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload>[];
                };
                upsert: {
                    args: Prisma.QcInspectionItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QcInspectionItemPayload>;
                };
                aggregate: {
                    args: Prisma.QcInspectionItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQcInspectionItem>;
                };
                groupBy: {
                    args: Prisma.QcInspectionItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QcInspectionItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QcInspectionItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QcInspectionItemCountAggregateOutputType> | number;
                };
            };
        };
        ItemBatch: {
            payload: Prisma.$ItemBatchPayload<ExtArgs>;
            fields: Prisma.ItemBatchFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ItemBatchFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ItemBatchFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload>;
                };
                findFirst: {
                    args: Prisma.ItemBatchFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ItemBatchFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload>;
                };
                findMany: {
                    args: Prisma.ItemBatchFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload>[];
                };
                create: {
                    args: Prisma.ItemBatchCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload>;
                };
                createMany: {
                    args: Prisma.ItemBatchCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ItemBatchCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload>[];
                };
                delete: {
                    args: Prisma.ItemBatchDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload>;
                };
                update: {
                    args: Prisma.ItemBatchUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload>;
                };
                deleteMany: {
                    args: Prisma.ItemBatchDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ItemBatchUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ItemBatchUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload>[];
                };
                upsert: {
                    args: Prisma.ItemBatchUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemBatchPayload>;
                };
                aggregate: {
                    args: Prisma.ItemBatchAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateItemBatch>;
                };
                groupBy: {
                    args: Prisma.ItemBatchGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemBatchGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ItemBatchCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemBatchCountAggregateOutputType> | number;
                };
            };
        };
        ItemSerial: {
            payload: Prisma.$ItemSerialPayload<ExtArgs>;
            fields: Prisma.ItemSerialFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ItemSerialFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ItemSerialFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload>;
                };
                findFirst: {
                    args: Prisma.ItemSerialFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ItemSerialFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload>;
                };
                findMany: {
                    args: Prisma.ItemSerialFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload>[];
                };
                create: {
                    args: Prisma.ItemSerialCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload>;
                };
                createMany: {
                    args: Prisma.ItemSerialCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ItemSerialCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload>[];
                };
                delete: {
                    args: Prisma.ItemSerialDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload>;
                };
                update: {
                    args: Prisma.ItemSerialUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload>;
                };
                deleteMany: {
                    args: Prisma.ItemSerialDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ItemSerialUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ItemSerialUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload>[];
                };
                upsert: {
                    args: Prisma.ItemSerialUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSerialPayload>;
                };
                aggregate: {
                    args: Prisma.ItemSerialAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateItemSerial>;
                };
                groupBy: {
                    args: Prisma.ItemSerialGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemSerialGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ItemSerialCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemSerialCountAggregateOutputType> | number;
                };
            };
        };
        ValuationLayer: {
            payload: Prisma.$ValuationLayerPayload<ExtArgs>;
            fields: Prisma.ValuationLayerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ValuationLayerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ValuationLayerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload>;
                };
                findFirst: {
                    args: Prisma.ValuationLayerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ValuationLayerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload>;
                };
                findMany: {
                    args: Prisma.ValuationLayerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload>[];
                };
                create: {
                    args: Prisma.ValuationLayerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload>;
                };
                createMany: {
                    args: Prisma.ValuationLayerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ValuationLayerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload>[];
                };
                delete: {
                    args: Prisma.ValuationLayerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload>;
                };
                update: {
                    args: Prisma.ValuationLayerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload>;
                };
                deleteMany: {
                    args: Prisma.ValuationLayerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ValuationLayerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ValuationLayerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload>[];
                };
                upsert: {
                    args: Prisma.ValuationLayerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ValuationLayerPayload>;
                };
                aggregate: {
                    args: Prisma.ValuationLayerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateValuationLayer>;
                };
                groupBy: {
                    args: Prisma.ValuationLayerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ValuationLayerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ValuationLayerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ValuationLayerCountAggregateOutputType> | number;
                };
            };
        };
        Opportunity: {
            payload: Prisma.$OpportunityPayload<ExtArgs>;
            fields: Prisma.OpportunityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OpportunityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OpportunityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                findFirst: {
                    args: Prisma.OpportunityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OpportunityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                findMany: {
                    args: Prisma.OpportunityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>[];
                };
                create: {
                    args: Prisma.OpportunityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                createMany: {
                    args: Prisma.OpportunityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OpportunityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>[];
                };
                delete: {
                    args: Prisma.OpportunityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                update: {
                    args: Prisma.OpportunityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                deleteMany: {
                    args: Prisma.OpportunityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OpportunityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OpportunityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>[];
                };
                upsert: {
                    args: Prisma.OpportunityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OpportunityPayload>;
                };
                aggregate: {
                    args: Prisma.OpportunityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOpportunity>;
                };
                groupBy: {
                    args: Prisma.OpportunityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OpportunityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OpportunityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OpportunityCountAggregateOutputType> | number;
                };
            };
        };
        SalesActivity: {
            payload: Prisma.$SalesActivityPayload<ExtArgs>;
            fields: Prisma.SalesActivityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SalesActivityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SalesActivityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload>;
                };
                findFirst: {
                    args: Prisma.SalesActivityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SalesActivityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload>;
                };
                findMany: {
                    args: Prisma.SalesActivityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload>[];
                };
                create: {
                    args: Prisma.SalesActivityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload>;
                };
                createMany: {
                    args: Prisma.SalesActivityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SalesActivityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload>[];
                };
                delete: {
                    args: Prisma.SalesActivityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload>;
                };
                update: {
                    args: Prisma.SalesActivityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload>;
                };
                deleteMany: {
                    args: Prisma.SalesActivityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SalesActivityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SalesActivityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload>[];
                };
                upsert: {
                    args: Prisma.SalesActivityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalesActivityPayload>;
                };
                aggregate: {
                    args: Prisma.SalesActivityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSalesActivity>;
                };
                groupBy: {
                    args: Prisma.SalesActivityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesActivityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SalesActivityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalesActivityCountAggregateOutputType> | number;
                };
            };
        };
        MarketingCampaign: {
            payload: Prisma.$MarketingCampaignPayload<ExtArgs>;
            fields: Prisma.MarketingCampaignFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MarketingCampaignFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MarketingCampaignFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload>;
                };
                findFirst: {
                    args: Prisma.MarketingCampaignFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MarketingCampaignFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload>;
                };
                findMany: {
                    args: Prisma.MarketingCampaignFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload>[];
                };
                create: {
                    args: Prisma.MarketingCampaignCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload>;
                };
                createMany: {
                    args: Prisma.MarketingCampaignCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MarketingCampaignCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload>[];
                };
                delete: {
                    args: Prisma.MarketingCampaignDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload>;
                };
                update: {
                    args: Prisma.MarketingCampaignUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload>;
                };
                deleteMany: {
                    args: Prisma.MarketingCampaignDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MarketingCampaignUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MarketingCampaignUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload>[];
                };
                upsert: {
                    args: Prisma.MarketingCampaignUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarketingCampaignPayload>;
                };
                aggregate: {
                    args: Prisma.MarketingCampaignAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMarketingCampaign>;
                };
                groupBy: {
                    args: Prisma.MarketingCampaignGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MarketingCampaignGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MarketingCampaignCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MarketingCampaignCountAggregateOutputType> | number;
                };
            };
        };
        ServiceTicket: {
            payload: Prisma.$ServiceTicketPayload<ExtArgs>;
            fields: Prisma.ServiceTicketFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ServiceTicketFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ServiceTicketFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload>;
                };
                findFirst: {
                    args: Prisma.ServiceTicketFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ServiceTicketFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload>;
                };
                findMany: {
                    args: Prisma.ServiceTicketFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload>[];
                };
                create: {
                    args: Prisma.ServiceTicketCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload>;
                };
                createMany: {
                    args: Prisma.ServiceTicketCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ServiceTicketCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload>[];
                };
                delete: {
                    args: Prisma.ServiceTicketDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload>;
                };
                update: {
                    args: Prisma.ServiceTicketUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload>;
                };
                deleteMany: {
                    args: Prisma.ServiceTicketDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ServiceTicketUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ServiceTicketUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload>[];
                };
                upsert: {
                    args: Prisma.ServiceTicketUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServiceTicketPayload>;
                };
                aggregate: {
                    args: Prisma.ServiceTicketAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateServiceTicket>;
                };
                groupBy: {
                    args: Prisma.ServiceTicketGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServiceTicketGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ServiceTicketCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServiceTicketCountAggregateOutputType> | number;
                };
            };
        };
        Role: {
            payload: Prisma.$RolePayload<ExtArgs>;
            fields: Prisma.RoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                findFirst: {
                    args: Prisma.RoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                findMany: {
                    args: Prisma.RoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                create: {
                    args: Prisma.RoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                createMany: {
                    args: Prisma.RoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                delete: {
                    args: Prisma.RoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                update: {
                    args: Prisma.RoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                deleteMany: {
                    args: Prisma.RoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[];
                };
                upsert: {
                    args: Prisma.RoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>;
                };
                aggregate: {
                    args: Prisma.RoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRole>;
                };
                groupBy: {
                    args: Prisma.RoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoleCountAggregateOutputType> | number;
                };
            };
        };
        Permission: {
            payload: Prisma.$PermissionPayload<ExtArgs>;
            fields: Prisma.PermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findFirst: {
                    args: Prisma.PermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findMany: {
                    args: Prisma.PermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                create: {
                    args: Prisma.PermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                createMany: {
                    args: Prisma.PermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                delete: {
                    args: Prisma.PermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                update: {
                    args: Prisma.PermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.PermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                upsert: {
                    args: Prisma.PermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                aggregate: {
                    args: Prisma.PermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePermission>;
                };
                groupBy: {
                    args: Prisma.PermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionCountAggregateOutputType> | number;
                };
            };
        };
        UserRole: {
            payload: Prisma.$UserRolePayload<ExtArgs>;
            fields: Prisma.UserRoleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserRoleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserRoleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                findFirst: {
                    args: Prisma.UserRoleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserRoleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                findMany: {
                    args: Prisma.UserRoleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>[];
                };
                create: {
                    args: Prisma.UserRoleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                createMany: {
                    args: Prisma.UserRoleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserRoleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>[];
                };
                delete: {
                    args: Prisma.UserRoleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                update: {
                    args: Prisma.UserRoleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                deleteMany: {
                    args: Prisma.UserRoleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserRoleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserRoleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>[];
                };
                upsert: {
                    args: Prisma.UserRoleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserRolePayload>;
                };
                aggregate: {
                    args: Prisma.UserRoleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserRole>;
                };
                groupBy: {
                    args: Prisma.UserRoleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserRoleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserRoleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserRoleCountAggregateOutputType> | number;
                };
            };
        };
        RolePermission: {
            payload: Prisma.$RolePermissionPayload<ExtArgs>;
            fields: Prisma.RolePermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findFirst: {
                    args: Prisma.RolePermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findMany: {
                    args: Prisma.RolePermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                create: {
                    args: Prisma.RolePermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                createMany: {
                    args: Prisma.RolePermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RolePermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                delete: {
                    args: Prisma.RolePermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                update: {
                    args: Prisma.RolePermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RolePermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                upsert: {
                    args: Prisma.RolePermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                aggregate: {
                    args: Prisma.RolePermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRolePermission>;
                };
                groupBy: {
                    args: Prisma.RolePermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RolePermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
        NotificationTemplate: {
            payload: Prisma.$NotificationTemplatePayload<ExtArgs>;
            fields: Prisma.NotificationTemplateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationTemplateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationTemplateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                findFirst: {
                    args: Prisma.NotificationTemplateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationTemplateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                findMany: {
                    args: Prisma.NotificationTemplateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>[];
                };
                create: {
                    args: Prisma.NotificationTemplateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                createMany: {
                    args: Prisma.NotificationTemplateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationTemplateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>[];
                };
                delete: {
                    args: Prisma.NotificationTemplateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                update: {
                    args: Prisma.NotificationTemplateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationTemplateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationTemplateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationTemplateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>[];
                };
                upsert: {
                    args: Prisma.NotificationTemplateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>;
                };
                aggregate: {
                    args: Prisma.NotificationTemplateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationTemplate>;
                };
                groupBy: {
                    args: Prisma.NotificationTemplateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationTemplateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationTemplateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationTemplateCountAggregateOutputType> | number;
                };
            };
        };
        NotificationChannelConfig: {
            payload: Prisma.$NotificationChannelConfigPayload<ExtArgs>;
            fields: Prisma.NotificationChannelConfigFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationChannelConfigFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationChannelConfigFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationChannelConfigFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationChannelConfigFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload>;
                };
                findMany: {
                    args: Prisma.NotificationChannelConfigFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload>[];
                };
                create: {
                    args: Prisma.NotificationChannelConfigCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload>;
                };
                createMany: {
                    args: Prisma.NotificationChannelConfigCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationChannelConfigCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload>[];
                };
                delete: {
                    args: Prisma.NotificationChannelConfigDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload>;
                };
                update: {
                    args: Prisma.NotificationChannelConfigUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationChannelConfigDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationChannelConfigUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationChannelConfigUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationChannelConfigUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationChannelConfigPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationChannelConfigAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationChannelConfig>;
                };
                groupBy: {
                    args: Prisma.NotificationChannelConfigGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationChannelConfigGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationChannelConfigCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationChannelConfigCountAggregateOutputType> | number;
                };
            };
        };
        NotificationPreference: {
            payload: Prisma.$NotificationPreferencePayload<ExtArgs>;
            fields: Prisma.NotificationPreferenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationPreferenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                findFirst: {
                    args: Prisma.NotificationPreferenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                findMany: {
                    args: Prisma.NotificationPreferenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                create: {
                    args: Prisma.NotificationPreferenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                createMany: {
                    args: Prisma.NotificationPreferenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                delete: {
                    args: Prisma.NotificationPreferenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                update: {
                    args: Prisma.NotificationPreferenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationPreferenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationPreferenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                upsert: {
                    args: Prisma.NotificationPreferenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                aggregate: {
                    args: Prisma.NotificationPreferenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationPreference>;
                };
                groupBy: {
                    args: Prisma.NotificationPreferenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationPreferenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationPreferenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationPreferenceCountAggregateOutputType> | number;
                };
            };
        };
        NotificationLog: {
            payload: Prisma.$NotificationLogPayload<ExtArgs>;
            fields: Prisma.NotificationLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload>;
                };
                findMany: {
                    args: Prisma.NotificationLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload>[];
                };
                create: {
                    args: Prisma.NotificationLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload>;
                };
                createMany: {
                    args: Prisma.NotificationLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload>[];
                };
                delete: {
                    args: Prisma.NotificationLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload>;
                };
                update: {
                    args: Prisma.NotificationLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationLogPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationLog>;
                };
                groupBy: {
                    args: Prisma.NotificationLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationLogCountAggregateOutputType> | number;
                };
            };
        };
        NotificationSchedule: {
            payload: Prisma.$NotificationSchedulePayload<ExtArgs>;
            fields: Prisma.NotificationScheduleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationScheduleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationScheduleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload>;
                };
                findFirst: {
                    args: Prisma.NotificationScheduleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationScheduleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload>;
                };
                findMany: {
                    args: Prisma.NotificationScheduleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload>[];
                };
                create: {
                    args: Prisma.NotificationScheduleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload>;
                };
                createMany: {
                    args: Prisma.NotificationScheduleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationScheduleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload>[];
                };
                delete: {
                    args: Prisma.NotificationScheduleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload>;
                };
                update: {
                    args: Prisma.NotificationScheduleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationScheduleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationScheduleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationScheduleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload>[];
                };
                upsert: {
                    args: Prisma.NotificationScheduleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSchedulePayload>;
                };
                aggregate: {
                    args: Prisma.NotificationScheduleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationSchedule>;
                };
                groupBy: {
                    args: Prisma.NotificationScheduleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationScheduleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationScheduleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationScheduleCountAggregateOutputType> | number;
                };
            };
        };
        CompanyProfile: {
            payload: Prisma.$CompanyProfilePayload<ExtArgs>;
            fields: Prisma.CompanyProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CompanyProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CompanyProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload>;
                };
                findFirst: {
                    args: Prisma.CompanyProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CompanyProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload>;
                };
                findMany: {
                    args: Prisma.CompanyProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload>[];
                };
                create: {
                    args: Prisma.CompanyProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload>;
                };
                createMany: {
                    args: Prisma.CompanyProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CompanyProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload>[];
                };
                delete: {
                    args: Prisma.CompanyProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload>;
                };
                update: {
                    args: Prisma.CompanyProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.CompanyProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CompanyProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CompanyProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload>[];
                };
                upsert: {
                    args: Prisma.CompanyProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyProfilePayload>;
                };
                aggregate: {
                    args: Prisma.CompanyProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCompanyProfile>;
                };
                groupBy: {
                    args: Prisma.CompanyProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompanyProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CompanyProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompanyProfileCountAggregateOutputType> | number;
                };
            };
        };
        Branch: {
            payload: Prisma.$BranchPayload<ExtArgs>;
            fields: Prisma.BranchFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BranchFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BranchFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                findFirst: {
                    args: Prisma.BranchFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BranchFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                findMany: {
                    args: Prisma.BranchFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>[];
                };
                create: {
                    args: Prisma.BranchCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                createMany: {
                    args: Prisma.BranchCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BranchCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>[];
                };
                delete: {
                    args: Prisma.BranchDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                update: {
                    args: Prisma.BranchUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                deleteMany: {
                    args: Prisma.BranchDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BranchUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BranchUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>[];
                };
                upsert: {
                    args: Prisma.BranchUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BranchPayload>;
                };
                aggregate: {
                    args: Prisma.BranchAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBranch>;
                };
                groupBy: {
                    args: Prisma.BranchGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BranchGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BranchCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BranchCountAggregateOutputType> | number;
                };
            };
        };
        Currency: {
            payload: Prisma.$CurrencyPayload<ExtArgs>;
            fields: Prisma.CurrencyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CurrencyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CurrencyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload>;
                };
                findFirst: {
                    args: Prisma.CurrencyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CurrencyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload>;
                };
                findMany: {
                    args: Prisma.CurrencyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload>[];
                };
                create: {
                    args: Prisma.CurrencyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload>;
                };
                createMany: {
                    args: Prisma.CurrencyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CurrencyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload>[];
                };
                delete: {
                    args: Prisma.CurrencyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload>;
                };
                update: {
                    args: Prisma.CurrencyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload>;
                };
                deleteMany: {
                    args: Prisma.CurrencyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CurrencyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CurrencyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload>[];
                };
                upsert: {
                    args: Prisma.CurrencyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CurrencyPayload>;
                };
                aggregate: {
                    args: Prisma.CurrencyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCurrency>;
                };
                groupBy: {
                    args: Prisma.CurrencyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CurrencyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CurrencyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CurrencyCountAggregateOutputType> | number;
                };
            };
        };
        ExchangeRate: {
            payload: Prisma.$ExchangeRatePayload<ExtArgs>;
            fields: Prisma.ExchangeRateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExchangeRateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExchangeRateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                findFirst: {
                    args: Prisma.ExchangeRateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExchangeRateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                findMany: {
                    args: Prisma.ExchangeRateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>[];
                };
                create: {
                    args: Prisma.ExchangeRateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                createMany: {
                    args: Prisma.ExchangeRateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExchangeRateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>[];
                };
                delete: {
                    args: Prisma.ExchangeRateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                update: {
                    args: Prisma.ExchangeRateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                deleteMany: {
                    args: Prisma.ExchangeRateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExchangeRateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExchangeRateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>[];
                };
                upsert: {
                    args: Prisma.ExchangeRateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                aggregate: {
                    args: Prisma.ExchangeRateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExchangeRate>;
                };
                groupBy: {
                    args: Prisma.ExchangeRateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExchangeRateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExchangeRateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExchangeRateCountAggregateOutputType> | number;
                };
            };
        };
        Uom: {
            payload: Prisma.$UomPayload<ExtArgs>;
            fields: Prisma.UomFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UomFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UomFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload>;
                };
                findFirst: {
                    args: Prisma.UomFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UomFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload>;
                };
                findMany: {
                    args: Prisma.UomFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload>[];
                };
                create: {
                    args: Prisma.UomCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload>;
                };
                createMany: {
                    args: Prisma.UomCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UomCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload>[];
                };
                delete: {
                    args: Prisma.UomDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload>;
                };
                update: {
                    args: Prisma.UomUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload>;
                };
                deleteMany: {
                    args: Prisma.UomDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UomUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UomUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload>[];
                };
                upsert: {
                    args: Prisma.UomUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomPayload>;
                };
                aggregate: {
                    args: Prisma.UomAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUom>;
                };
                groupBy: {
                    args: Prisma.UomGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UomGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UomCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UomCountAggregateOutputType> | number;
                };
            };
        };
        UomConversion: {
            payload: Prisma.$UomConversionPayload<ExtArgs>;
            fields: Prisma.UomConversionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UomConversionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UomConversionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload>;
                };
                findFirst: {
                    args: Prisma.UomConversionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UomConversionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload>;
                };
                findMany: {
                    args: Prisma.UomConversionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload>[];
                };
                create: {
                    args: Prisma.UomConversionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload>;
                };
                createMany: {
                    args: Prisma.UomConversionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UomConversionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload>[];
                };
                delete: {
                    args: Prisma.UomConversionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload>;
                };
                update: {
                    args: Prisma.UomConversionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload>;
                };
                deleteMany: {
                    args: Prisma.UomConversionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UomConversionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UomConversionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload>[];
                };
                upsert: {
                    args: Prisma.UomConversionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UomConversionPayload>;
                };
                aggregate: {
                    args: Prisma.UomConversionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUomConversion>;
                };
                groupBy: {
                    args: Prisma.UomConversionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UomConversionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UomConversionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UomConversionCountAggregateOutputType> | number;
                };
            };
        };
        FiscalYear: {
            payload: Prisma.$FiscalYearPayload<ExtArgs>;
            fields: Prisma.FiscalYearFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FiscalYearFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FiscalYearFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload>;
                };
                findFirst: {
                    args: Prisma.FiscalYearFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FiscalYearFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload>;
                };
                findMany: {
                    args: Prisma.FiscalYearFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload>[];
                };
                create: {
                    args: Prisma.FiscalYearCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload>;
                };
                createMany: {
                    args: Prisma.FiscalYearCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FiscalYearCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload>[];
                };
                delete: {
                    args: Prisma.FiscalYearDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload>;
                };
                update: {
                    args: Prisma.FiscalYearUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload>;
                };
                deleteMany: {
                    args: Prisma.FiscalYearDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FiscalYearUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FiscalYearUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload>[];
                };
                upsert: {
                    args: Prisma.FiscalYearUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FiscalYearPayload>;
                };
                aggregate: {
                    args: Prisma.FiscalYearAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFiscalYear>;
                };
                groupBy: {
                    args: Prisma.FiscalYearGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FiscalYearGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FiscalYearCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FiscalYearCountAggregateOutputType> | number;
                };
            };
        };
        AccountingPeriod: {
            payload: Prisma.$AccountingPeriodPayload<ExtArgs>;
            fields: Prisma.AccountingPeriodFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AccountingPeriodFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AccountingPeriodFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload>;
                };
                findFirst: {
                    args: Prisma.AccountingPeriodFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AccountingPeriodFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload>;
                };
                findMany: {
                    args: Prisma.AccountingPeriodFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload>[];
                };
                create: {
                    args: Prisma.AccountingPeriodCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload>;
                };
                createMany: {
                    args: Prisma.AccountingPeriodCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AccountingPeriodCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload>[];
                };
                delete: {
                    args: Prisma.AccountingPeriodDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload>;
                };
                update: {
                    args: Prisma.AccountingPeriodUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload>;
                };
                deleteMany: {
                    args: Prisma.AccountingPeriodDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AccountingPeriodUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AccountingPeriodUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload>[];
                };
                upsert: {
                    args: Prisma.AccountingPeriodUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountingPeriodPayload>;
                };
                aggregate: {
                    args: Prisma.AccountingPeriodAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAccountingPeriod>;
                };
                groupBy: {
                    args: Prisma.AccountingPeriodGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountingPeriodGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AccountingPeriodCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountingPeriodCountAggregateOutputType> | number;
                };
            };
        };
        CoaAccount: {
            payload: Prisma.$CoaAccountPayload<ExtArgs>;
            fields: Prisma.CoaAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CoaAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CoaAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload>;
                };
                findFirst: {
                    args: Prisma.CoaAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CoaAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload>;
                };
                findMany: {
                    args: Prisma.CoaAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload>[];
                };
                create: {
                    args: Prisma.CoaAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload>;
                };
                createMany: {
                    args: Prisma.CoaAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CoaAccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload>[];
                };
                delete: {
                    args: Prisma.CoaAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload>;
                };
                update: {
                    args: Prisma.CoaAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.CoaAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CoaAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CoaAccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload>[];
                };
                upsert: {
                    args: Prisma.CoaAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoaAccountPayload>;
                };
                aggregate: {
                    args: Prisma.CoaAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCoaAccount>;
                };
                groupBy: {
                    args: Prisma.CoaAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CoaAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CoaAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CoaAccountCountAggregateOutputType> | number;
                };
            };
        };
        CostCenter: {
            payload: Prisma.$CostCenterPayload<ExtArgs>;
            fields: Prisma.CostCenterFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CostCenterFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CostCenterFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload>;
                };
                findFirst: {
                    args: Prisma.CostCenterFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CostCenterFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload>;
                };
                findMany: {
                    args: Prisma.CostCenterFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload>[];
                };
                create: {
                    args: Prisma.CostCenterCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload>;
                };
                createMany: {
                    args: Prisma.CostCenterCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CostCenterCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload>[];
                };
                delete: {
                    args: Prisma.CostCenterDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload>;
                };
                update: {
                    args: Prisma.CostCenterUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload>;
                };
                deleteMany: {
                    args: Prisma.CostCenterDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CostCenterUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CostCenterUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload>[];
                };
                upsert: {
                    args: Prisma.CostCenterUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterPayload>;
                };
                aggregate: {
                    args: Prisma.CostCenterAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCostCenter>;
                };
                groupBy: {
                    args: Prisma.CostCenterGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CostCenterGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CostCenterCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CostCenterCountAggregateOutputType> | number;
                };
            };
        };
        ProfitCenter: {
            payload: Prisma.$ProfitCenterPayload<ExtArgs>;
            fields: Prisma.ProfitCenterFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProfitCenterFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProfitCenterFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload>;
                };
                findFirst: {
                    args: Prisma.ProfitCenterFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProfitCenterFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload>;
                };
                findMany: {
                    args: Prisma.ProfitCenterFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload>[];
                };
                create: {
                    args: Prisma.ProfitCenterCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload>;
                };
                createMany: {
                    args: Prisma.ProfitCenterCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProfitCenterCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload>[];
                };
                delete: {
                    args: Prisma.ProfitCenterDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload>;
                };
                update: {
                    args: Prisma.ProfitCenterUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload>;
                };
                deleteMany: {
                    args: Prisma.ProfitCenterDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProfitCenterUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProfitCenterUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload>[];
                };
                upsert: {
                    args: Prisma.ProfitCenterUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProfitCenterPayload>;
                };
                aggregate: {
                    args: Prisma.ProfitCenterAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProfitCenter>;
                };
                groupBy: {
                    args: Prisma.ProfitCenterGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProfitCenterGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProfitCenterCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProfitCenterCountAggregateOutputType> | number;
                };
            };
        };
        JournalEntry: {
            payload: Prisma.$JournalEntryPayload<ExtArgs>;
            fields: Prisma.JournalEntryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JournalEntryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JournalEntryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>;
                };
                findFirst: {
                    args: Prisma.JournalEntryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JournalEntryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>;
                };
                findMany: {
                    args: Prisma.JournalEntryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>[];
                };
                create: {
                    args: Prisma.JournalEntryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>;
                };
                createMany: {
                    args: Prisma.JournalEntryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.JournalEntryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>[];
                };
                delete: {
                    args: Prisma.JournalEntryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>;
                };
                update: {
                    args: Prisma.JournalEntryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>;
                };
                deleteMany: {
                    args: Prisma.JournalEntryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JournalEntryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.JournalEntryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>[];
                };
                upsert: {
                    args: Prisma.JournalEntryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>;
                };
                aggregate: {
                    args: Prisma.JournalEntryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJournalEntry>;
                };
                groupBy: {
                    args: Prisma.JournalEntryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JournalEntryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JournalEntryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JournalEntryCountAggregateOutputType> | number;
                };
            };
        };
        JournalEntryLine: {
            payload: Prisma.$JournalEntryLinePayload<ExtArgs>;
            fields: Prisma.JournalEntryLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.JournalEntryLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.JournalEntryLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload>;
                };
                findFirst: {
                    args: Prisma.JournalEntryLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.JournalEntryLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload>;
                };
                findMany: {
                    args: Prisma.JournalEntryLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload>[];
                };
                create: {
                    args: Prisma.JournalEntryLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload>;
                };
                createMany: {
                    args: Prisma.JournalEntryLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.JournalEntryLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload>[];
                };
                delete: {
                    args: Prisma.JournalEntryLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload>;
                };
                update: {
                    args: Prisma.JournalEntryLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload>;
                };
                deleteMany: {
                    args: Prisma.JournalEntryLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.JournalEntryLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.JournalEntryLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload>[];
                };
                upsert: {
                    args: Prisma.JournalEntryLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryLinePayload>;
                };
                aggregate: {
                    args: Prisma.JournalEntryLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateJournalEntryLine>;
                };
                groupBy: {
                    args: Prisma.JournalEntryLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JournalEntryLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.JournalEntryLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.JournalEntryLineCountAggregateOutputType> | number;
                };
            };
        };
        SupplierInvoice: {
            payload: Prisma.$SupplierInvoicePayload<ExtArgs>;
            fields: Prisma.SupplierInvoiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SupplierInvoiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SupplierInvoiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>;
                };
                findFirst: {
                    args: Prisma.SupplierInvoiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SupplierInvoiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>;
                };
                findMany: {
                    args: Prisma.SupplierInvoiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>[];
                };
                create: {
                    args: Prisma.SupplierInvoiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>;
                };
                createMany: {
                    args: Prisma.SupplierInvoiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SupplierInvoiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>[];
                };
                delete: {
                    args: Prisma.SupplierInvoiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>;
                };
                update: {
                    args: Prisma.SupplierInvoiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>;
                };
                deleteMany: {
                    args: Prisma.SupplierInvoiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SupplierInvoiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SupplierInvoiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>[];
                };
                upsert: {
                    args: Prisma.SupplierInvoiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePayload>;
                };
                aggregate: {
                    args: Prisma.SupplierInvoiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSupplierInvoice>;
                };
                groupBy: {
                    args: Prisma.SupplierInvoiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierInvoiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SupplierInvoiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierInvoiceCountAggregateOutputType> | number;
                };
            };
        };
        SupplierInvoiceLine: {
            payload: Prisma.$SupplierInvoiceLinePayload<ExtArgs>;
            fields: Prisma.SupplierInvoiceLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SupplierInvoiceLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SupplierInvoiceLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload>;
                };
                findFirst: {
                    args: Prisma.SupplierInvoiceLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SupplierInvoiceLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload>;
                };
                findMany: {
                    args: Prisma.SupplierInvoiceLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload>[];
                };
                create: {
                    args: Prisma.SupplierInvoiceLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload>;
                };
                createMany: {
                    args: Prisma.SupplierInvoiceLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SupplierInvoiceLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload>[];
                };
                delete: {
                    args: Prisma.SupplierInvoiceLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload>;
                };
                update: {
                    args: Prisma.SupplierInvoiceLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload>;
                };
                deleteMany: {
                    args: Prisma.SupplierInvoiceLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SupplierInvoiceLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SupplierInvoiceLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload>[];
                };
                upsert: {
                    args: Prisma.SupplierInvoiceLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoiceLinePayload>;
                };
                aggregate: {
                    args: Prisma.SupplierInvoiceLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSupplierInvoiceLine>;
                };
                groupBy: {
                    args: Prisma.SupplierInvoiceLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierInvoiceLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SupplierInvoiceLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierInvoiceLineCountAggregateOutputType> | number;
                };
            };
        };
        SupplierInvoicePayment: {
            payload: Prisma.$SupplierInvoicePaymentPayload<ExtArgs>;
            fields: Prisma.SupplierInvoicePaymentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SupplierInvoicePaymentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SupplierInvoicePaymentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload>;
                };
                findFirst: {
                    args: Prisma.SupplierInvoicePaymentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SupplierInvoicePaymentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload>;
                };
                findMany: {
                    args: Prisma.SupplierInvoicePaymentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload>[];
                };
                create: {
                    args: Prisma.SupplierInvoicePaymentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload>;
                };
                createMany: {
                    args: Prisma.SupplierInvoicePaymentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SupplierInvoicePaymentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload>[];
                };
                delete: {
                    args: Prisma.SupplierInvoicePaymentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload>;
                };
                update: {
                    args: Prisma.SupplierInvoicePaymentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload>;
                };
                deleteMany: {
                    args: Prisma.SupplierInvoicePaymentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SupplierInvoicePaymentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SupplierInvoicePaymentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload>[];
                };
                upsert: {
                    args: Prisma.SupplierInvoicePaymentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierInvoicePaymentPayload>;
                };
                aggregate: {
                    args: Prisma.SupplierInvoicePaymentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSupplierInvoicePayment>;
                };
                groupBy: {
                    args: Prisma.SupplierInvoicePaymentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierInvoicePaymentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SupplierInvoicePaymentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierInvoicePaymentCountAggregateOutputType> | number;
                };
            };
        };
        CustomerInvoice: {
            payload: Prisma.$CustomerInvoicePayload<ExtArgs>;
            fields: Prisma.CustomerInvoiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CustomerInvoiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CustomerInvoiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload>;
                };
                findFirst: {
                    args: Prisma.CustomerInvoiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CustomerInvoiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload>;
                };
                findMany: {
                    args: Prisma.CustomerInvoiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload>[];
                };
                create: {
                    args: Prisma.CustomerInvoiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload>;
                };
                createMany: {
                    args: Prisma.CustomerInvoiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CustomerInvoiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload>[];
                };
                delete: {
                    args: Prisma.CustomerInvoiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload>;
                };
                update: {
                    args: Prisma.CustomerInvoiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload>;
                };
                deleteMany: {
                    args: Prisma.CustomerInvoiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CustomerInvoiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CustomerInvoiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload>[];
                };
                upsert: {
                    args: Prisma.CustomerInvoiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePayload>;
                };
                aggregate: {
                    args: Prisma.CustomerInvoiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCustomerInvoice>;
                };
                groupBy: {
                    args: Prisma.CustomerInvoiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerInvoiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CustomerInvoiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerInvoiceCountAggregateOutputType> | number;
                };
            };
        };
        CustomerInvoiceLine: {
            payload: Prisma.$CustomerInvoiceLinePayload<ExtArgs>;
            fields: Prisma.CustomerInvoiceLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CustomerInvoiceLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CustomerInvoiceLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload>;
                };
                findFirst: {
                    args: Prisma.CustomerInvoiceLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CustomerInvoiceLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload>;
                };
                findMany: {
                    args: Prisma.CustomerInvoiceLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload>[];
                };
                create: {
                    args: Prisma.CustomerInvoiceLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload>;
                };
                createMany: {
                    args: Prisma.CustomerInvoiceLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CustomerInvoiceLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload>[];
                };
                delete: {
                    args: Prisma.CustomerInvoiceLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload>;
                };
                update: {
                    args: Prisma.CustomerInvoiceLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload>;
                };
                deleteMany: {
                    args: Prisma.CustomerInvoiceLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CustomerInvoiceLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CustomerInvoiceLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload>[];
                };
                upsert: {
                    args: Prisma.CustomerInvoiceLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoiceLinePayload>;
                };
                aggregate: {
                    args: Prisma.CustomerInvoiceLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCustomerInvoiceLine>;
                };
                groupBy: {
                    args: Prisma.CustomerInvoiceLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerInvoiceLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CustomerInvoiceLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerInvoiceLineCountAggregateOutputType> | number;
                };
            };
        };
        CustomerInvoicePayment: {
            payload: Prisma.$CustomerInvoicePaymentPayload<ExtArgs>;
            fields: Prisma.CustomerInvoicePaymentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CustomerInvoicePaymentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CustomerInvoicePaymentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload>;
                };
                findFirst: {
                    args: Prisma.CustomerInvoicePaymentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CustomerInvoicePaymentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload>;
                };
                findMany: {
                    args: Prisma.CustomerInvoicePaymentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload>[];
                };
                create: {
                    args: Prisma.CustomerInvoicePaymentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload>;
                };
                createMany: {
                    args: Prisma.CustomerInvoicePaymentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CustomerInvoicePaymentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload>[];
                };
                delete: {
                    args: Prisma.CustomerInvoicePaymentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload>;
                };
                update: {
                    args: Prisma.CustomerInvoicePaymentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload>;
                };
                deleteMany: {
                    args: Prisma.CustomerInvoicePaymentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CustomerInvoicePaymentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CustomerInvoicePaymentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload>[];
                };
                upsert: {
                    args: Prisma.CustomerInvoicePaymentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerInvoicePaymentPayload>;
                };
                aggregate: {
                    args: Prisma.CustomerInvoicePaymentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCustomerInvoicePayment>;
                };
                groupBy: {
                    args: Prisma.CustomerInvoicePaymentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerInvoicePaymentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CustomerInvoicePaymentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerInvoicePaymentCountAggregateOutputType> | number;
                };
            };
        };
        FixedAsset: {
            payload: Prisma.$FixedAssetPayload<ExtArgs>;
            fields: Prisma.FixedAssetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FixedAssetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FixedAssetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload>;
                };
                findFirst: {
                    args: Prisma.FixedAssetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FixedAssetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload>;
                };
                findMany: {
                    args: Prisma.FixedAssetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload>[];
                };
                create: {
                    args: Prisma.FixedAssetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload>;
                };
                createMany: {
                    args: Prisma.FixedAssetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FixedAssetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload>[];
                };
                delete: {
                    args: Prisma.FixedAssetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload>;
                };
                update: {
                    args: Prisma.FixedAssetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload>;
                };
                deleteMany: {
                    args: Prisma.FixedAssetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FixedAssetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FixedAssetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload>[];
                };
                upsert: {
                    args: Prisma.FixedAssetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetPayload>;
                };
                aggregate: {
                    args: Prisma.FixedAssetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFixedAsset>;
                };
                groupBy: {
                    args: Prisma.FixedAssetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FixedAssetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FixedAssetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FixedAssetCountAggregateOutputType> | number;
                };
            };
        };
        FixedAssetDepreciation: {
            payload: Prisma.$FixedAssetDepreciationPayload<ExtArgs>;
            fields: Prisma.FixedAssetDepreciationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FixedAssetDepreciationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FixedAssetDepreciationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload>;
                };
                findFirst: {
                    args: Prisma.FixedAssetDepreciationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FixedAssetDepreciationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload>;
                };
                findMany: {
                    args: Prisma.FixedAssetDepreciationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload>[];
                };
                create: {
                    args: Prisma.FixedAssetDepreciationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload>;
                };
                createMany: {
                    args: Prisma.FixedAssetDepreciationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FixedAssetDepreciationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload>[];
                };
                delete: {
                    args: Prisma.FixedAssetDepreciationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload>;
                };
                update: {
                    args: Prisma.FixedAssetDepreciationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload>;
                };
                deleteMany: {
                    args: Prisma.FixedAssetDepreciationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FixedAssetDepreciationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FixedAssetDepreciationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload>[];
                };
                upsert: {
                    args: Prisma.FixedAssetDepreciationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FixedAssetDepreciationPayload>;
                };
                aggregate: {
                    args: Prisma.FixedAssetDepreciationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFixedAssetDepreciation>;
                };
                groupBy: {
                    args: Prisma.FixedAssetDepreciationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FixedAssetDepreciationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FixedAssetDepreciationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FixedAssetDepreciationCountAggregateOutputType> | number;
                };
            };
        };
        BankAccount: {
            payload: Prisma.$BankAccountPayload<ExtArgs>;
            fields: Prisma.BankAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BankAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BankAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload>;
                };
                findFirst: {
                    args: Prisma.BankAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BankAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload>;
                };
                findMany: {
                    args: Prisma.BankAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload>[];
                };
                create: {
                    args: Prisma.BankAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload>;
                };
                createMany: {
                    args: Prisma.BankAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BankAccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload>[];
                };
                delete: {
                    args: Prisma.BankAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload>;
                };
                update: {
                    args: Prisma.BankAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.BankAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BankAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BankAccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload>[];
                };
                upsert: {
                    args: Prisma.BankAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankAccountPayload>;
                };
                aggregate: {
                    args: Prisma.BankAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBankAccount>;
                };
                groupBy: {
                    args: Prisma.BankAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BankAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BankAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BankAccountCountAggregateOutputType> | number;
                };
            };
        };
        BankTransaction: {
            payload: Prisma.$BankTransactionPayload<ExtArgs>;
            fields: Prisma.BankTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BankTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BankTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.BankTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BankTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload>;
                };
                findMany: {
                    args: Prisma.BankTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload>[];
                };
                create: {
                    args: Prisma.BankTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload>;
                };
                createMany: {
                    args: Prisma.BankTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BankTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload>[];
                };
                delete: {
                    args: Prisma.BankTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload>;
                };
                update: {
                    args: Prisma.BankTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.BankTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BankTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BankTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.BankTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.BankTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBankTransaction>;
                };
                groupBy: {
                    args: Prisma.BankTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BankTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BankTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BankTransactionCountAggregateOutputType> | number;
                };
            };
        };
        CashAccount: {
            payload: Prisma.$CashAccountPayload<ExtArgs>;
            fields: Prisma.CashAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CashAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CashAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload>;
                };
                findFirst: {
                    args: Prisma.CashAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CashAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload>;
                };
                findMany: {
                    args: Prisma.CashAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload>[];
                };
                create: {
                    args: Prisma.CashAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload>;
                };
                createMany: {
                    args: Prisma.CashAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CashAccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload>[];
                };
                delete: {
                    args: Prisma.CashAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload>;
                };
                update: {
                    args: Prisma.CashAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.CashAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CashAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CashAccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload>[];
                };
                upsert: {
                    args: Prisma.CashAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashAccountPayload>;
                };
                aggregate: {
                    args: Prisma.CashAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCashAccount>;
                };
                groupBy: {
                    args: Prisma.CashAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CashAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CashAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CashAccountCountAggregateOutputType> | number;
                };
            };
        };
        CashTransaction: {
            payload: Prisma.$CashTransactionPayload<ExtArgs>;
            fields: Prisma.CashTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CashTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CashTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.CashTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CashTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload>;
                };
                findMany: {
                    args: Prisma.CashTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload>[];
                };
                create: {
                    args: Prisma.CashTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload>;
                };
                createMany: {
                    args: Prisma.CashTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CashTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload>[];
                };
                delete: {
                    args: Prisma.CashTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload>;
                };
                update: {
                    args: Prisma.CashTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.CashTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CashTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CashTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.CashTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.CashTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCashTransaction>;
                };
                groupBy: {
                    args: Prisma.CashTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CashTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CashTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CashTransactionCountAggregateOutputType> | number;
                };
            };
        };
        TaxCode: {
            payload: Prisma.$TaxCodePayload<ExtArgs>;
            fields: Prisma.TaxCodeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TaxCodeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TaxCodeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload>;
                };
                findFirst: {
                    args: Prisma.TaxCodeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TaxCodeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload>;
                };
                findMany: {
                    args: Prisma.TaxCodeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload>[];
                };
                create: {
                    args: Prisma.TaxCodeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload>;
                };
                createMany: {
                    args: Prisma.TaxCodeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TaxCodeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload>[];
                };
                delete: {
                    args: Prisma.TaxCodeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload>;
                };
                update: {
                    args: Prisma.TaxCodeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload>;
                };
                deleteMany: {
                    args: Prisma.TaxCodeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TaxCodeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TaxCodeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload>[];
                };
                upsert: {
                    args: Prisma.TaxCodeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxCodePayload>;
                };
                aggregate: {
                    args: Prisma.TaxCodeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTaxCode>;
                };
                groupBy: {
                    args: Prisma.TaxCodeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TaxCodeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TaxCodeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TaxCodeCountAggregateOutputType> | number;
                };
            };
        };
        CostCenterAllocation: {
            payload: Prisma.$CostCenterAllocationPayload<ExtArgs>;
            fields: Prisma.CostCenterAllocationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CostCenterAllocationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CostCenterAllocationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload>;
                };
                findFirst: {
                    args: Prisma.CostCenterAllocationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CostCenterAllocationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload>;
                };
                findMany: {
                    args: Prisma.CostCenterAllocationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload>[];
                };
                create: {
                    args: Prisma.CostCenterAllocationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload>;
                };
                createMany: {
                    args: Prisma.CostCenterAllocationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CostCenterAllocationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload>[];
                };
                delete: {
                    args: Prisma.CostCenterAllocationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload>;
                };
                update: {
                    args: Prisma.CostCenterAllocationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload>;
                };
                deleteMany: {
                    args: Prisma.CostCenterAllocationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CostCenterAllocationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CostCenterAllocationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload>[];
                };
                upsert: {
                    args: Prisma.CostCenterAllocationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CostCenterAllocationPayload>;
                };
                aggregate: {
                    args: Prisma.CostCenterAllocationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCostCenterAllocation>;
                };
                groupBy: {
                    args: Prisma.CostCenterAllocationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CostCenterAllocationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CostCenterAllocationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CostCenterAllocationCountAggregateOutputType> | number;
                };
            };
        };
        InterCompanyTransaction: {
            payload: Prisma.$InterCompanyTransactionPayload<ExtArgs>;
            fields: Prisma.InterCompanyTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InterCompanyTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InterCompanyTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.InterCompanyTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InterCompanyTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload>;
                };
                findMany: {
                    args: Prisma.InterCompanyTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload>[];
                };
                create: {
                    args: Prisma.InterCompanyTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload>;
                };
                createMany: {
                    args: Prisma.InterCompanyTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InterCompanyTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload>[];
                };
                delete: {
                    args: Prisma.InterCompanyTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload>;
                };
                update: {
                    args: Prisma.InterCompanyTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.InterCompanyTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InterCompanyTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InterCompanyTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.InterCompanyTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterCompanyTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.InterCompanyTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInterCompanyTransaction>;
                };
                groupBy: {
                    args: Prisma.InterCompanyTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InterCompanyTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InterCompanyTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InterCompanyTransactionCountAggregateOutputType> | number;
                };
            };
        };
        BankReconciliation: {
            payload: Prisma.$BankReconciliationPayload<ExtArgs>;
            fields: Prisma.BankReconciliationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BankReconciliationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BankReconciliationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload>;
                };
                findFirst: {
                    args: Prisma.BankReconciliationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BankReconciliationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload>;
                };
                findMany: {
                    args: Prisma.BankReconciliationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload>[];
                };
                create: {
                    args: Prisma.BankReconciliationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload>;
                };
                createMany: {
                    args: Prisma.BankReconciliationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BankReconciliationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload>[];
                };
                delete: {
                    args: Prisma.BankReconciliationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload>;
                };
                update: {
                    args: Prisma.BankReconciliationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload>;
                };
                deleteMany: {
                    args: Prisma.BankReconciliationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BankReconciliationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BankReconciliationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload>[];
                };
                upsert: {
                    args: Prisma.BankReconciliationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BankReconciliationPayload>;
                };
                aggregate: {
                    args: Prisma.BankReconciliationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBankReconciliation>;
                };
                groupBy: {
                    args: Prisma.BankReconciliationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BankReconciliationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BankReconciliationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BankReconciliationCountAggregateOutputType> | number;
                };
            };
        };
        PettyCashReplenishment: {
            payload: Prisma.$PettyCashReplenishmentPayload<ExtArgs>;
            fields: Prisma.PettyCashReplenishmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PettyCashReplenishmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PettyCashReplenishmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload>;
                };
                findFirst: {
                    args: Prisma.PettyCashReplenishmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PettyCashReplenishmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload>;
                };
                findMany: {
                    args: Prisma.PettyCashReplenishmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload>[];
                };
                create: {
                    args: Prisma.PettyCashReplenishmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload>;
                };
                createMany: {
                    args: Prisma.PettyCashReplenishmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PettyCashReplenishmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload>[];
                };
                delete: {
                    args: Prisma.PettyCashReplenishmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload>;
                };
                update: {
                    args: Prisma.PettyCashReplenishmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload>;
                };
                deleteMany: {
                    args: Prisma.PettyCashReplenishmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PettyCashReplenishmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PettyCashReplenishmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload>[];
                };
                upsert: {
                    args: Prisma.PettyCashReplenishmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PettyCashReplenishmentPayload>;
                };
                aggregate: {
                    args: Prisma.PettyCashReplenishmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePettyCashReplenishment>;
                };
                groupBy: {
                    args: Prisma.PettyCashReplenishmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PettyCashReplenishmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PettyCashReplenishmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PettyCashReplenishmentCountAggregateOutputType> | number;
                };
            };
        };
        CustomerReceipt: {
            payload: Prisma.$CustomerReceiptPayload<ExtArgs>;
            fields: Prisma.CustomerReceiptFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CustomerReceiptFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CustomerReceiptFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload>;
                };
                findFirst: {
                    args: Prisma.CustomerReceiptFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CustomerReceiptFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload>;
                };
                findMany: {
                    args: Prisma.CustomerReceiptFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload>[];
                };
                create: {
                    args: Prisma.CustomerReceiptCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload>;
                };
                createMany: {
                    args: Prisma.CustomerReceiptCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CustomerReceiptCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload>[];
                };
                delete: {
                    args: Prisma.CustomerReceiptDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload>;
                };
                update: {
                    args: Prisma.CustomerReceiptUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload>;
                };
                deleteMany: {
                    args: Prisma.CustomerReceiptDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CustomerReceiptUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CustomerReceiptUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload>[];
                };
                upsert: {
                    args: Prisma.CustomerReceiptUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CustomerReceiptPayload>;
                };
                aggregate: {
                    args: Prisma.CustomerReceiptAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCustomerReceipt>;
                };
                groupBy: {
                    args: Prisma.CustomerReceiptGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerReceiptGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CustomerReceiptCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CustomerReceiptCountAggregateOutputType> | number;
                };
            };
        };
        VendorPayment: {
            payload: Prisma.$VendorPaymentPayload<ExtArgs>;
            fields: Prisma.VendorPaymentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VendorPaymentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VendorPaymentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload>;
                };
                findFirst: {
                    args: Prisma.VendorPaymentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VendorPaymentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload>;
                };
                findMany: {
                    args: Prisma.VendorPaymentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload>[];
                };
                create: {
                    args: Prisma.VendorPaymentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload>;
                };
                createMany: {
                    args: Prisma.VendorPaymentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VendorPaymentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload>[];
                };
                delete: {
                    args: Prisma.VendorPaymentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload>;
                };
                update: {
                    args: Prisma.VendorPaymentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload>;
                };
                deleteMany: {
                    args: Prisma.VendorPaymentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VendorPaymentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VendorPaymentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload>[];
                };
                upsert: {
                    args: Prisma.VendorPaymentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPaymentPayload>;
                };
                aggregate: {
                    args: Prisma.VendorPaymentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVendorPayment>;
                };
                groupBy: {
                    args: Prisma.VendorPaymentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorPaymentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VendorPaymentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorPaymentCountAggregateOutputType> | number;
                };
            };
        };
        PaymentRequest: {
            payload: Prisma.$PaymentRequestPayload<ExtArgs>;
            fields: Prisma.PaymentRequestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentRequestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentRequestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentRequestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentRequestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload>;
                };
                findMany: {
                    args: Prisma.PaymentRequestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload>[];
                };
                create: {
                    args: Prisma.PaymentRequestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload>;
                };
                createMany: {
                    args: Prisma.PaymentRequestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PaymentRequestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload>[];
                };
                delete: {
                    args: Prisma.PaymentRequestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload>;
                };
                update: {
                    args: Prisma.PaymentRequestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentRequestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentRequestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PaymentRequestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload>[];
                };
                upsert: {
                    args: Prisma.PaymentRequestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentRequestPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentRequestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePaymentRequest>;
                };
                groupBy: {
                    args: Prisma.PaymentRequestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentRequestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentRequestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentRequestCountAggregateOutputType> | number;
                };
            };
        };
        AssetDisposal: {
            payload: Prisma.$AssetDisposalPayload<ExtArgs>;
            fields: Prisma.AssetDisposalFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AssetDisposalFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AssetDisposalFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload>;
                };
                findFirst: {
                    args: Prisma.AssetDisposalFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AssetDisposalFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload>;
                };
                findMany: {
                    args: Prisma.AssetDisposalFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload>[];
                };
                create: {
                    args: Prisma.AssetDisposalCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload>;
                };
                createMany: {
                    args: Prisma.AssetDisposalCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AssetDisposalCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload>[];
                };
                delete: {
                    args: Prisma.AssetDisposalDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload>;
                };
                update: {
                    args: Prisma.AssetDisposalUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload>;
                };
                deleteMany: {
                    args: Prisma.AssetDisposalDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AssetDisposalUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AssetDisposalUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload>[];
                };
                upsert: {
                    args: Prisma.AssetDisposalUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetDisposalPayload>;
                };
                aggregate: {
                    args: Prisma.AssetDisposalAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssetDisposal>;
                };
                groupBy: {
                    args: Prisma.AssetDisposalGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetDisposalGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AssetDisposalCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetDisposalCountAggregateOutputType> | number;
                };
            };
        };
        Budget: {
            payload: Prisma.$BudgetPayload<ExtArgs>;
            fields: Prisma.BudgetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BudgetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BudgetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
                };
                findFirst: {
                    args: Prisma.BudgetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BudgetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
                };
                findMany: {
                    args: Prisma.BudgetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>[];
                };
                create: {
                    args: Prisma.BudgetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
                };
                createMany: {
                    args: Prisma.BudgetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BudgetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>[];
                };
                delete: {
                    args: Prisma.BudgetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
                };
                update: {
                    args: Prisma.BudgetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
                };
                deleteMany: {
                    args: Prisma.BudgetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BudgetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BudgetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>[];
                };
                upsert: {
                    args: Prisma.BudgetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BudgetPayload>;
                };
                aggregate: {
                    args: Prisma.BudgetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBudget>;
                };
                groupBy: {
                    args: Prisma.BudgetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BudgetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BudgetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BudgetCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowDefinition: {
            payload: Prisma.$WorkflowDefinitionPayload<ExtArgs>;
            fields: Prisma.WorkflowDefinitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowDefinitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowDefinitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowDefinitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowDefinitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                findMany: {
                    args: Prisma.WorkflowDefinitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>[];
                };
                create: {
                    args: Prisma.WorkflowDefinitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                createMany: {
                    args: Prisma.WorkflowDefinitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowDefinitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>[];
                };
                delete: {
                    args: Prisma.WorkflowDefinitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                update: {
                    args: Prisma.WorkflowDefinitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowDefinitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowDefinitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowDefinitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowDefinitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowDefinitionPayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowDefinitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowDefinition>;
                };
                groupBy: {
                    args: Prisma.WorkflowDefinitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowDefinitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowDefinitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowDefinitionCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowStep: {
            payload: Prisma.$WorkflowStepPayload<ExtArgs>;
            fields: Prisma.WorkflowStepFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowStepFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowStepFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowStepFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowStepFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload>;
                };
                findMany: {
                    args: Prisma.WorkflowStepFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload>[];
                };
                create: {
                    args: Prisma.WorkflowStepCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload>;
                };
                createMany: {
                    args: Prisma.WorkflowStepCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowStepCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload>[];
                };
                delete: {
                    args: Prisma.WorkflowStepDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload>;
                };
                update: {
                    args: Prisma.WorkflowStepUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowStepDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowStepUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowStepUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowStepUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowStepPayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowStepAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowStep>;
                };
                groupBy: {
                    args: Prisma.WorkflowStepGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowStepGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowStepCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowStepCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowRule: {
            payload: Prisma.$WorkflowRulePayload<ExtArgs>;
            fields: Prisma.WorkflowRuleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowRuleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowRuleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowRuleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowRuleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload>;
                };
                findMany: {
                    args: Prisma.WorkflowRuleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload>[];
                };
                create: {
                    args: Prisma.WorkflowRuleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload>;
                };
                createMany: {
                    args: Prisma.WorkflowRuleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowRuleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload>[];
                };
                delete: {
                    args: Prisma.WorkflowRuleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload>;
                };
                update: {
                    args: Prisma.WorkflowRuleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowRuleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowRuleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowRuleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowRuleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowRulePayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowRuleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowRule>;
                };
                groupBy: {
                    args: Prisma.WorkflowRuleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowRuleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowRuleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowRuleCountAggregateOutputType> | number;
                };
            };
        };
        WorkflowInstance: {
            payload: Prisma.$WorkflowInstancePayload<ExtArgs>;
            fields: Prisma.WorkflowInstanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkflowInstanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkflowInstanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                findFirst: {
                    args: Prisma.WorkflowInstanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkflowInstanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                findMany: {
                    args: Prisma.WorkflowInstanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>[];
                };
                create: {
                    args: Prisma.WorkflowInstanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                createMany: {
                    args: Prisma.WorkflowInstanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkflowInstanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>[];
                };
                delete: {
                    args: Prisma.WorkflowInstanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                update: {
                    args: Prisma.WorkflowInstanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                deleteMany: {
                    args: Prisma.WorkflowInstanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkflowInstanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkflowInstanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>[];
                };
                upsert: {
                    args: Prisma.WorkflowInstanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkflowInstancePayload>;
                };
                aggregate: {
                    args: Prisma.WorkflowInstanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkflowInstance>;
                };
                groupBy: {
                    args: Prisma.WorkflowInstanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowInstanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkflowInstanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkflowInstanceCountAggregateOutputType> | number;
                };
            };
        };
        ApprovalHistory: {
            payload: Prisma.$ApprovalHistoryPayload<ExtArgs>;
            fields: Prisma.ApprovalHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ApprovalHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ApprovalHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.ApprovalHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ApprovalHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload>;
                };
                findMany: {
                    args: Prisma.ApprovalHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload>[];
                };
                create: {
                    args: Prisma.ApprovalHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload>;
                };
                createMany: {
                    args: Prisma.ApprovalHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ApprovalHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload>[];
                };
                delete: {
                    args: Prisma.ApprovalHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload>;
                };
                update: {
                    args: Prisma.ApprovalHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.ApprovalHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ApprovalHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ApprovalHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.ApprovalHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ApprovalHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.ApprovalHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateApprovalHistory>;
                };
                groupBy: {
                    args: Prisma.ApprovalHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ApprovalHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ApprovalHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ApprovalHistoryCountAggregateOutputType> | number;
                };
            };
        };
        Delegation: {
            payload: Prisma.$DelegationPayload<ExtArgs>;
            fields: Prisma.DelegationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DelegationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DelegationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload>;
                };
                findFirst: {
                    args: Prisma.DelegationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DelegationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload>;
                };
                findMany: {
                    args: Prisma.DelegationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload>[];
                };
                create: {
                    args: Prisma.DelegationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload>;
                };
                createMany: {
                    args: Prisma.DelegationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DelegationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload>[];
                };
                delete: {
                    args: Prisma.DelegationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload>;
                };
                update: {
                    args: Prisma.DelegationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload>;
                };
                deleteMany: {
                    args: Prisma.DelegationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DelegationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DelegationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload>[];
                };
                upsert: {
                    args: Prisma.DelegationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DelegationPayload>;
                };
                aggregate: {
                    args: Prisma.DelegationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDelegation>;
                };
                groupBy: {
                    args: Prisma.DelegationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DelegationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DelegationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DelegationCountAggregateOutputType> | number;
                };
            };
        };
        BillOfMaterials: {
            payload: Prisma.$BillOfMaterialsPayload<ExtArgs>;
            fields: Prisma.BillOfMaterialsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BillOfMaterialsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BillOfMaterialsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload>;
                };
                findFirst: {
                    args: Prisma.BillOfMaterialsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BillOfMaterialsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload>;
                };
                findMany: {
                    args: Prisma.BillOfMaterialsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload>[];
                };
                create: {
                    args: Prisma.BillOfMaterialsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload>;
                };
                createMany: {
                    args: Prisma.BillOfMaterialsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BillOfMaterialsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload>[];
                };
                delete: {
                    args: Prisma.BillOfMaterialsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload>;
                };
                update: {
                    args: Prisma.BillOfMaterialsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload>;
                };
                deleteMany: {
                    args: Prisma.BillOfMaterialsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BillOfMaterialsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BillOfMaterialsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload>[];
                };
                upsert: {
                    args: Prisma.BillOfMaterialsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsPayload>;
                };
                aggregate: {
                    args: Prisma.BillOfMaterialsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBillOfMaterials>;
                };
                groupBy: {
                    args: Prisma.BillOfMaterialsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BillOfMaterialsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BillOfMaterialsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BillOfMaterialsCountAggregateOutputType> | number;
                };
            };
        };
        BillOfMaterialsItem: {
            payload: Prisma.$BillOfMaterialsItemPayload<ExtArgs>;
            fields: Prisma.BillOfMaterialsItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BillOfMaterialsItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BillOfMaterialsItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload>;
                };
                findFirst: {
                    args: Prisma.BillOfMaterialsItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BillOfMaterialsItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload>;
                };
                findMany: {
                    args: Prisma.BillOfMaterialsItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload>[];
                };
                create: {
                    args: Prisma.BillOfMaterialsItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload>;
                };
                createMany: {
                    args: Prisma.BillOfMaterialsItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BillOfMaterialsItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload>[];
                };
                delete: {
                    args: Prisma.BillOfMaterialsItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload>;
                };
                update: {
                    args: Prisma.BillOfMaterialsItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload>;
                };
                deleteMany: {
                    args: Prisma.BillOfMaterialsItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BillOfMaterialsItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BillOfMaterialsItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload>[];
                };
                upsert: {
                    args: Prisma.BillOfMaterialsItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillOfMaterialsItemPayload>;
                };
                aggregate: {
                    args: Prisma.BillOfMaterialsItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBillOfMaterialsItem>;
                };
                groupBy: {
                    args: Prisma.BillOfMaterialsItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BillOfMaterialsItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BillOfMaterialsItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BillOfMaterialsItemCountAggregateOutputType> | number;
                };
            };
        };
        WorkOrder: {
            payload: Prisma.$WorkOrderPayload<ExtArgs>;
            fields: Prisma.WorkOrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkOrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkOrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                findFirst: {
                    args: Prisma.WorkOrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkOrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                findMany: {
                    args: Prisma.WorkOrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>[];
                };
                create: {
                    args: Prisma.WorkOrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                createMany: {
                    args: Prisma.WorkOrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkOrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>[];
                };
                delete: {
                    args: Prisma.WorkOrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                update: {
                    args: Prisma.WorkOrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkOrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkOrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkOrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>[];
                };
                upsert: {
                    args: Prisma.WorkOrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                aggregate: {
                    args: Prisma.WorkOrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkOrder>;
                };
                groupBy: {
                    args: Prisma.WorkOrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkOrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkOrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkOrderCountAggregateOutputType> | number;
                };
            };
        };
        WorkOrderComponent: {
            payload: Prisma.$WorkOrderComponentPayload<ExtArgs>;
            fields: Prisma.WorkOrderComponentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkOrderComponentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkOrderComponentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload>;
                };
                findFirst: {
                    args: Prisma.WorkOrderComponentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkOrderComponentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload>;
                };
                findMany: {
                    args: Prisma.WorkOrderComponentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload>[];
                };
                create: {
                    args: Prisma.WorkOrderComponentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload>;
                };
                createMany: {
                    args: Prisma.WorkOrderComponentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkOrderComponentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload>[];
                };
                delete: {
                    args: Prisma.WorkOrderComponentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload>;
                };
                update: {
                    args: Prisma.WorkOrderComponentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkOrderComponentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkOrderComponentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkOrderComponentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload>[];
                };
                upsert: {
                    args: Prisma.WorkOrderComponentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderComponentPayload>;
                };
                aggregate: {
                    args: Prisma.WorkOrderComponentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkOrderComponent>;
                };
                groupBy: {
                    args: Prisma.WorkOrderComponentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkOrderComponentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkOrderComponentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkOrderComponentCountAggregateOutputType> | number;
                };
            };
        };
        WorkOrderOperation: {
            payload: Prisma.$WorkOrderOperationPayload<ExtArgs>;
            fields: Prisma.WorkOrderOperationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkOrderOperationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkOrderOperationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload>;
                };
                findFirst: {
                    args: Prisma.WorkOrderOperationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkOrderOperationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload>;
                };
                findMany: {
                    args: Prisma.WorkOrderOperationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload>[];
                };
                create: {
                    args: Prisma.WorkOrderOperationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload>;
                };
                createMany: {
                    args: Prisma.WorkOrderOperationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkOrderOperationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload>[];
                };
                delete: {
                    args: Prisma.WorkOrderOperationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload>;
                };
                update: {
                    args: Prisma.WorkOrderOperationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkOrderOperationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkOrderOperationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkOrderOperationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload>[];
                };
                upsert: {
                    args: Prisma.WorkOrderOperationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderOperationPayload>;
                };
                aggregate: {
                    args: Prisma.WorkOrderOperationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkOrderOperation>;
                };
                groupBy: {
                    args: Prisma.WorkOrderOperationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkOrderOperationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkOrderOperationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkOrderOperationCountAggregateOutputType> | number;
                };
            };
        };
        ProductionIssue: {
            payload: Prisma.$ProductionIssuePayload<ExtArgs>;
            fields: Prisma.ProductionIssueFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductionIssueFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductionIssueFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload>;
                };
                findFirst: {
                    args: Prisma.ProductionIssueFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductionIssueFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload>;
                };
                findMany: {
                    args: Prisma.ProductionIssueFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload>[];
                };
                create: {
                    args: Prisma.ProductionIssueCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload>;
                };
                createMany: {
                    args: Prisma.ProductionIssueCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductionIssueCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload>[];
                };
                delete: {
                    args: Prisma.ProductionIssueDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload>;
                };
                update: {
                    args: Prisma.ProductionIssueUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload>;
                };
                deleteMany: {
                    args: Prisma.ProductionIssueDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductionIssueUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductionIssueUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload>[];
                };
                upsert: {
                    args: Prisma.ProductionIssueUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssuePayload>;
                };
                aggregate: {
                    args: Prisma.ProductionIssueAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductionIssue>;
                };
                groupBy: {
                    args: Prisma.ProductionIssueGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionIssueGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductionIssueCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionIssueCountAggregateOutputType> | number;
                };
            };
        };
        ProductionIssueItem: {
            payload: Prisma.$ProductionIssueItemPayload<ExtArgs>;
            fields: Prisma.ProductionIssueItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductionIssueItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductionIssueItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload>;
                };
                findFirst: {
                    args: Prisma.ProductionIssueItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductionIssueItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload>;
                };
                findMany: {
                    args: Prisma.ProductionIssueItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload>[];
                };
                create: {
                    args: Prisma.ProductionIssueItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload>;
                };
                createMany: {
                    args: Prisma.ProductionIssueItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductionIssueItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload>[];
                };
                delete: {
                    args: Prisma.ProductionIssueItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload>;
                };
                update: {
                    args: Prisma.ProductionIssueItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductionIssueItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductionIssueItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductionIssueItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload>[];
                };
                upsert: {
                    args: Prisma.ProductionIssueItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionIssueItemPayload>;
                };
                aggregate: {
                    args: Prisma.ProductionIssueItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductionIssueItem>;
                };
                groupBy: {
                    args: Prisma.ProductionIssueItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionIssueItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductionIssueItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionIssueItemCountAggregateOutputType> | number;
                };
            };
        };
        ProductionReceipt: {
            payload: Prisma.$ProductionReceiptPayload<ExtArgs>;
            fields: Prisma.ProductionReceiptFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductionReceiptFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductionReceiptFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload>;
                };
                findFirst: {
                    args: Prisma.ProductionReceiptFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductionReceiptFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload>;
                };
                findMany: {
                    args: Prisma.ProductionReceiptFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload>[];
                };
                create: {
                    args: Prisma.ProductionReceiptCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload>;
                };
                createMany: {
                    args: Prisma.ProductionReceiptCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductionReceiptCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload>[];
                };
                delete: {
                    args: Prisma.ProductionReceiptDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload>;
                };
                update: {
                    args: Prisma.ProductionReceiptUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductionReceiptDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductionReceiptUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductionReceiptUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload>[];
                };
                upsert: {
                    args: Prisma.ProductionReceiptUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionReceiptPayload>;
                };
                aggregate: {
                    args: Prisma.ProductionReceiptAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductionReceipt>;
                };
                groupBy: {
                    args: Prisma.ProductionReceiptGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionReceiptGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductionReceiptCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionReceiptCountAggregateOutputType> | number;
                };
            };
        };
        InProcessQc: {
            payload: Prisma.$InProcessQcPayload<ExtArgs>;
            fields: Prisma.InProcessQcFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InProcessQcFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InProcessQcFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload>;
                };
                findFirst: {
                    args: Prisma.InProcessQcFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InProcessQcFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload>;
                };
                findMany: {
                    args: Prisma.InProcessQcFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload>[];
                };
                create: {
                    args: Prisma.InProcessQcCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload>;
                };
                createMany: {
                    args: Prisma.InProcessQcCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InProcessQcCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload>[];
                };
                delete: {
                    args: Prisma.InProcessQcDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload>;
                };
                update: {
                    args: Prisma.InProcessQcUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload>;
                };
                deleteMany: {
                    args: Prisma.InProcessQcDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InProcessQcUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InProcessQcUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload>[];
                };
                upsert: {
                    args: Prisma.InProcessQcUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InProcessQcPayload>;
                };
                aggregate: {
                    args: Prisma.InProcessQcAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInProcessQc>;
                };
                groupBy: {
                    args: Prisma.InProcessQcGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InProcessQcGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InProcessQcCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InProcessQcCountAggregateOutputType> | number;
                };
            };
        };
        Equipment: {
            payload: Prisma.$EquipmentPayload<ExtArgs>;
            fields: Prisma.EquipmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EquipmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EquipmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload>;
                };
                findFirst: {
                    args: Prisma.EquipmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EquipmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload>;
                };
                findMany: {
                    args: Prisma.EquipmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload>[];
                };
                create: {
                    args: Prisma.EquipmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload>;
                };
                createMany: {
                    args: Prisma.EquipmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EquipmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload>[];
                };
                delete: {
                    args: Prisma.EquipmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload>;
                };
                update: {
                    args: Prisma.EquipmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload>;
                };
                deleteMany: {
                    args: Prisma.EquipmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EquipmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EquipmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload>[];
                };
                upsert: {
                    args: Prisma.EquipmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EquipmentPayload>;
                };
                aggregate: {
                    args: Prisma.EquipmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEquipment>;
                };
                groupBy: {
                    args: Prisma.EquipmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EquipmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EquipmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EquipmentCountAggregateOutputType> | number;
                };
            };
        };
        MaintenanceSchedule: {
            payload: Prisma.$MaintenanceSchedulePayload<ExtArgs>;
            fields: Prisma.MaintenanceScheduleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaintenanceScheduleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaintenanceScheduleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload>;
                };
                findFirst: {
                    args: Prisma.MaintenanceScheduleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaintenanceScheduleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload>;
                };
                findMany: {
                    args: Prisma.MaintenanceScheduleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload>[];
                };
                create: {
                    args: Prisma.MaintenanceScheduleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload>;
                };
                createMany: {
                    args: Prisma.MaintenanceScheduleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaintenanceScheduleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload>[];
                };
                delete: {
                    args: Prisma.MaintenanceScheduleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload>;
                };
                update: {
                    args: Prisma.MaintenanceScheduleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload>;
                };
                deleteMany: {
                    args: Prisma.MaintenanceScheduleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaintenanceScheduleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaintenanceScheduleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload>[];
                };
                upsert: {
                    args: Prisma.MaintenanceScheduleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceSchedulePayload>;
                };
                aggregate: {
                    args: Prisma.MaintenanceScheduleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaintenanceSchedule>;
                };
                groupBy: {
                    args: Prisma.MaintenanceScheduleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaintenanceScheduleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaintenanceScheduleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaintenanceScheduleCountAggregateOutputType> | number;
                };
            };
        };
        MaintenanceRequest: {
            payload: Prisma.$MaintenanceRequestPayload<ExtArgs>;
            fields: Prisma.MaintenanceRequestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaintenanceRequestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaintenanceRequestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload>;
                };
                findFirst: {
                    args: Prisma.MaintenanceRequestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaintenanceRequestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload>;
                };
                findMany: {
                    args: Prisma.MaintenanceRequestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload>[];
                };
                create: {
                    args: Prisma.MaintenanceRequestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload>;
                };
                createMany: {
                    args: Prisma.MaintenanceRequestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaintenanceRequestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload>[];
                };
                delete: {
                    args: Prisma.MaintenanceRequestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload>;
                };
                update: {
                    args: Prisma.MaintenanceRequestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload>;
                };
                deleteMany: {
                    args: Prisma.MaintenanceRequestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaintenanceRequestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaintenanceRequestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload>[];
                };
                upsert: {
                    args: Prisma.MaintenanceRequestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenanceRequestPayload>;
                };
                aggregate: {
                    args: Prisma.MaintenanceRequestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaintenanceRequest>;
                };
                groupBy: {
                    args: Prisma.MaintenanceRequestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaintenanceRequestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaintenanceRequestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaintenanceRequestCountAggregateOutputType> | number;
                };
            };
        };
        MrpRun: {
            payload: Prisma.$MrpRunPayload<ExtArgs>;
            fields: Prisma.MrpRunFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MrpRunFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MrpRunFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload>;
                };
                findFirst: {
                    args: Prisma.MrpRunFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MrpRunFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload>;
                };
                findMany: {
                    args: Prisma.MrpRunFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload>[];
                };
                create: {
                    args: Prisma.MrpRunCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload>;
                };
                createMany: {
                    args: Prisma.MrpRunCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MrpRunCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload>[];
                };
                delete: {
                    args: Prisma.MrpRunDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload>;
                };
                update: {
                    args: Prisma.MrpRunUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload>;
                };
                deleteMany: {
                    args: Prisma.MrpRunDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MrpRunUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MrpRunUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload>[];
                };
                upsert: {
                    args: Prisma.MrpRunUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpRunPayload>;
                };
                aggregate: {
                    args: Prisma.MrpRunAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMrpRun>;
                };
                groupBy: {
                    args: Prisma.MrpRunGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MrpRunGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MrpRunCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MrpRunCountAggregateOutputType> | number;
                };
            };
        };
        MrpSuggestion: {
            payload: Prisma.$MrpSuggestionPayload<ExtArgs>;
            fields: Prisma.MrpSuggestionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MrpSuggestionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MrpSuggestionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload>;
                };
                findFirst: {
                    args: Prisma.MrpSuggestionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MrpSuggestionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload>;
                };
                findMany: {
                    args: Prisma.MrpSuggestionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload>[];
                };
                create: {
                    args: Prisma.MrpSuggestionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload>;
                };
                createMany: {
                    args: Prisma.MrpSuggestionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MrpSuggestionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload>[];
                };
                delete: {
                    args: Prisma.MrpSuggestionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload>;
                };
                update: {
                    args: Prisma.MrpSuggestionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload>;
                };
                deleteMany: {
                    args: Prisma.MrpSuggestionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MrpSuggestionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MrpSuggestionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload>[];
                };
                upsert: {
                    args: Prisma.MrpSuggestionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MrpSuggestionPayload>;
                };
                aggregate: {
                    args: Prisma.MrpSuggestionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMrpSuggestion>;
                };
                groupBy: {
                    args: Prisma.MrpSuggestionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MrpSuggestionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MrpSuggestionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MrpSuggestionCountAggregateOutputType> | number;
                };
            };
        };
        ProductionCost: {
            payload: Prisma.$ProductionCostPayload<ExtArgs>;
            fields: Prisma.ProductionCostFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductionCostFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductionCostFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload>;
                };
                findFirst: {
                    args: Prisma.ProductionCostFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductionCostFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload>;
                };
                findMany: {
                    args: Prisma.ProductionCostFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload>[];
                };
                create: {
                    args: Prisma.ProductionCostCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload>;
                };
                createMany: {
                    args: Prisma.ProductionCostCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductionCostCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload>[];
                };
                delete: {
                    args: Prisma.ProductionCostDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload>;
                };
                update: {
                    args: Prisma.ProductionCostUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductionCostDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductionCostUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductionCostUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload>[];
                };
                upsert: {
                    args: Prisma.ProductionCostUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionCostPayload>;
                };
                aggregate: {
                    args: Prisma.ProductionCostAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductionCost>;
                };
                groupBy: {
                    args: Prisma.ProductionCostGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionCostGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductionCostCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionCostCountAggregateOutputType> | number;
                };
            };
        };
        TaxInvoice: {
            payload: Prisma.$TaxInvoicePayload<ExtArgs>;
            fields: Prisma.TaxInvoiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TaxInvoiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TaxInvoiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload>;
                };
                findFirst: {
                    args: Prisma.TaxInvoiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TaxInvoiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload>;
                };
                findMany: {
                    args: Prisma.TaxInvoiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload>[];
                };
                create: {
                    args: Prisma.TaxInvoiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload>;
                };
                createMany: {
                    args: Prisma.TaxInvoiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TaxInvoiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload>[];
                };
                delete: {
                    args: Prisma.TaxInvoiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload>;
                };
                update: {
                    args: Prisma.TaxInvoiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload>;
                };
                deleteMany: {
                    args: Prisma.TaxInvoiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TaxInvoiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TaxInvoiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload>[];
                };
                upsert: {
                    args: Prisma.TaxInvoiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxInvoicePayload>;
                };
                aggregate: {
                    args: Prisma.TaxInvoiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTaxInvoice>;
                };
                groupBy: {
                    args: Prisma.TaxInvoiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TaxInvoiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TaxInvoiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TaxInvoiceCountAggregateOutputType> | number;
                };
            };
        };
        NsfpRange: {
            payload: Prisma.$NsfpRangePayload<ExtArgs>;
            fields: Prisma.NsfpRangeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NsfpRangeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NsfpRangeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload>;
                };
                findFirst: {
                    args: Prisma.NsfpRangeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NsfpRangeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload>;
                };
                findMany: {
                    args: Prisma.NsfpRangeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload>[];
                };
                create: {
                    args: Prisma.NsfpRangeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload>;
                };
                createMany: {
                    args: Prisma.NsfpRangeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NsfpRangeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload>[];
                };
                delete: {
                    args: Prisma.NsfpRangeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload>;
                };
                update: {
                    args: Prisma.NsfpRangeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload>;
                };
                deleteMany: {
                    args: Prisma.NsfpRangeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NsfpRangeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NsfpRangeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload>[];
                };
                upsert: {
                    args: Prisma.NsfpRangeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NsfpRangePayload>;
                };
                aggregate: {
                    args: Prisma.NsfpRangeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNsfpRange>;
                };
                groupBy: {
                    args: Prisma.NsfpRangeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NsfpRangeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NsfpRangeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NsfpRangeCountAggregateOutputType> | number;
                };
            };
        };
        PphWithholding: {
            payload: Prisma.$PphWithholdingPayload<ExtArgs>;
            fields: Prisma.PphWithholdingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PphWithholdingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PphWithholdingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload>;
                };
                findFirst: {
                    args: Prisma.PphWithholdingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PphWithholdingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload>;
                };
                findMany: {
                    args: Prisma.PphWithholdingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload>[];
                };
                create: {
                    args: Prisma.PphWithholdingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload>;
                };
                createMany: {
                    args: Prisma.PphWithholdingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PphWithholdingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload>[];
                };
                delete: {
                    args: Prisma.PphWithholdingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload>;
                };
                update: {
                    args: Prisma.PphWithholdingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload>;
                };
                deleteMany: {
                    args: Prisma.PphWithholdingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PphWithholdingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PphWithholdingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload>[];
                };
                upsert: {
                    args: Prisma.PphWithholdingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PphWithholdingPayload>;
                };
                aggregate: {
                    args: Prisma.PphWithholdingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePphWithholding>;
                };
                groupBy: {
                    args: Prisma.PphWithholdingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PphWithholdingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PphWithholdingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PphWithholdingCountAggregateOutputType> | number;
                };
            };
        };
        TaxEqualization: {
            payload: Prisma.$TaxEqualizationPayload<ExtArgs>;
            fields: Prisma.TaxEqualizationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TaxEqualizationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TaxEqualizationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload>;
                };
                findFirst: {
                    args: Prisma.TaxEqualizationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TaxEqualizationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload>;
                };
                findMany: {
                    args: Prisma.TaxEqualizationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload>[];
                };
                create: {
                    args: Prisma.TaxEqualizationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload>;
                };
                createMany: {
                    args: Prisma.TaxEqualizationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TaxEqualizationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload>[];
                };
                delete: {
                    args: Prisma.TaxEqualizationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload>;
                };
                update: {
                    args: Prisma.TaxEqualizationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload>;
                };
                deleteMany: {
                    args: Prisma.TaxEqualizationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TaxEqualizationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TaxEqualizationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload>[];
                };
                upsert: {
                    args: Prisma.TaxEqualizationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TaxEqualizationPayload>;
                };
                aggregate: {
                    args: Prisma.TaxEqualizationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTaxEqualization>;
                };
                groupBy: {
                    args: Prisma.TaxEqualizationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TaxEqualizationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TaxEqualizationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TaxEqualizationCountAggregateOutputType> | number;
                };
            };
        };
        IdBilling: {
            payload: Prisma.$IdBillingPayload<ExtArgs>;
            fields: Prisma.IdBillingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IdBillingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IdBillingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload>;
                };
                findFirst: {
                    args: Prisma.IdBillingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IdBillingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload>;
                };
                findMany: {
                    args: Prisma.IdBillingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload>[];
                };
                create: {
                    args: Prisma.IdBillingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload>;
                };
                createMany: {
                    args: Prisma.IdBillingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IdBillingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload>[];
                };
                delete: {
                    args: Prisma.IdBillingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload>;
                };
                update: {
                    args: Prisma.IdBillingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload>;
                };
                deleteMany: {
                    args: Prisma.IdBillingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IdBillingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IdBillingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload>[];
                };
                upsert: {
                    args: Prisma.IdBillingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IdBillingPayload>;
                };
                aggregate: {
                    args: Prisma.IdBillingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIdBilling>;
                };
                groupBy: {
                    args: Prisma.IdBillingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdBillingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IdBillingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IdBillingCountAggregateOutputType> | number;
                };
            };
        };
        Employee: {
            payload: Prisma.$EmployeePayload<ExtArgs>;
            fields: Prisma.EmployeeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmployeeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                findFirst: {
                    args: Prisma.EmployeeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                findMany: {
                    args: Prisma.EmployeeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>[];
                };
                create: {
                    args: Prisma.EmployeeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                createMany: {
                    args: Prisma.EmployeeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>[];
                };
                delete: {
                    args: Prisma.EmployeeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                update: {
                    args: Prisma.EmployeeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                deleteMany: {
                    args: Prisma.EmployeeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmployeeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>[];
                };
                upsert: {
                    args: Prisma.EmployeeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmployeePayload>;
                };
                aggregate: {
                    args: Prisma.EmployeeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmployee>;
                };
                groupBy: {
                    args: Prisma.EmployeeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmployeeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmployeeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmployeeCountAggregateOutputType> | number;
                };
            };
        };
        OrganizationUnit: {
            payload: Prisma.$OrganizationUnitPayload<ExtArgs>;
            fields: Prisma.OrganizationUnitFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrganizationUnitFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrganizationUnitFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload>;
                };
                findFirst: {
                    args: Prisma.OrganizationUnitFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrganizationUnitFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload>;
                };
                findMany: {
                    args: Prisma.OrganizationUnitFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload>[];
                };
                create: {
                    args: Prisma.OrganizationUnitCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload>;
                };
                createMany: {
                    args: Prisma.OrganizationUnitCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrganizationUnitCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload>[];
                };
                delete: {
                    args: Prisma.OrganizationUnitDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload>;
                };
                update: {
                    args: Prisma.OrganizationUnitUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload>;
                };
                deleteMany: {
                    args: Prisma.OrganizationUnitDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrganizationUnitUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrganizationUnitUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload>[];
                };
                upsert: {
                    args: Prisma.OrganizationUnitUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrganizationUnitPayload>;
                };
                aggregate: {
                    args: Prisma.OrganizationUnitAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrganizationUnit>;
                };
                groupBy: {
                    args: Prisma.OrganizationUnitGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrganizationUnitGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrganizationUnitCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrganizationUnitCountAggregateOutputType> | number;
                };
            };
        };
        Attendance: {
            payload: Prisma.$AttendancePayload<ExtArgs>;
            fields: Prisma.AttendanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AttendanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload>;
                };
                findFirst: {
                    args: Prisma.AttendanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload>;
                };
                findMany: {
                    args: Prisma.AttendanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload>[];
                };
                create: {
                    args: Prisma.AttendanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload>;
                };
                createMany: {
                    args: Prisma.AttendanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AttendanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload>[];
                };
                delete: {
                    args: Prisma.AttendanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload>;
                };
                update: {
                    args: Prisma.AttendanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload>;
                };
                deleteMany: {
                    args: Prisma.AttendanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AttendanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AttendanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload>[];
                };
                upsert: {
                    args: Prisma.AttendanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AttendancePayload>;
                };
                aggregate: {
                    args: Prisma.AttendanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAttendance>;
                };
                groupBy: {
                    args: Prisma.AttendanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AttendanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AttendanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AttendanceCountAggregateOutputType> | number;
                };
            };
        };
        Shift: {
            payload: Prisma.$ShiftPayload<ExtArgs>;
            fields: Prisma.ShiftFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ShiftFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ShiftFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload>;
                };
                findFirst: {
                    args: Prisma.ShiftFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ShiftFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload>;
                };
                findMany: {
                    args: Prisma.ShiftFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload>[];
                };
                create: {
                    args: Prisma.ShiftCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload>;
                };
                createMany: {
                    args: Prisma.ShiftCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ShiftCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload>[];
                };
                delete: {
                    args: Prisma.ShiftDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload>;
                };
                update: {
                    args: Prisma.ShiftUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload>;
                };
                deleteMany: {
                    args: Prisma.ShiftDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ShiftUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ShiftUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload>[];
                };
                upsert: {
                    args: Prisma.ShiftUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShiftPayload>;
                };
                aggregate: {
                    args: Prisma.ShiftAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateShift>;
                };
                groupBy: {
                    args: Prisma.ShiftGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShiftGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ShiftCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShiftCountAggregateOutputType> | number;
                };
            };
        };
        PayrollRun: {
            payload: Prisma.$PayrollRunPayload<ExtArgs>;
            fields: Prisma.PayrollRunFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PayrollRunFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PayrollRunFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload>;
                };
                findFirst: {
                    args: Prisma.PayrollRunFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PayrollRunFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload>;
                };
                findMany: {
                    args: Prisma.PayrollRunFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload>[];
                };
                create: {
                    args: Prisma.PayrollRunCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload>;
                };
                createMany: {
                    args: Prisma.PayrollRunCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PayrollRunCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload>[];
                };
                delete: {
                    args: Prisma.PayrollRunDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload>;
                };
                update: {
                    args: Prisma.PayrollRunUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload>;
                };
                deleteMany: {
                    args: Prisma.PayrollRunDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PayrollRunUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PayrollRunUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload>[];
                };
                upsert: {
                    args: Prisma.PayrollRunUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayrollRunPayload>;
                };
                aggregate: {
                    args: Prisma.PayrollRunAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePayrollRun>;
                };
                groupBy: {
                    args: Prisma.PayrollRunGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PayrollRunGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PayrollRunCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PayrollRunCountAggregateOutputType> | number;
                };
            };
        };
        ExpenseClaim: {
            payload: Prisma.$ExpenseClaimPayload<ExtArgs>;
            fields: Prisma.ExpenseClaimFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExpenseClaimFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExpenseClaimFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload>;
                };
                findFirst: {
                    args: Prisma.ExpenseClaimFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExpenseClaimFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload>;
                };
                findMany: {
                    args: Prisma.ExpenseClaimFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload>[];
                };
                create: {
                    args: Prisma.ExpenseClaimCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload>;
                };
                createMany: {
                    args: Prisma.ExpenseClaimCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExpenseClaimCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload>[];
                };
                delete: {
                    args: Prisma.ExpenseClaimDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload>;
                };
                update: {
                    args: Prisma.ExpenseClaimUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload>;
                };
                deleteMany: {
                    args: Prisma.ExpenseClaimDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExpenseClaimUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExpenseClaimUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload>[];
                };
                upsert: {
                    args: Prisma.ExpenseClaimUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpenseClaimPayload>;
                };
                aggregate: {
                    args: Prisma.ExpenseClaimAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExpenseClaim>;
                };
                groupBy: {
                    args: Prisma.ExpenseClaimGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExpenseClaimGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExpenseClaimCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExpenseClaimCountAggregateOutputType> | number;
                };
            };
        };
        KpiEvaluation: {
            payload: Prisma.$KpiEvaluationPayload<ExtArgs>;
            fields: Prisma.KpiEvaluationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.KpiEvaluationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.KpiEvaluationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload>;
                };
                findFirst: {
                    args: Prisma.KpiEvaluationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.KpiEvaluationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload>;
                };
                findMany: {
                    args: Prisma.KpiEvaluationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload>[];
                };
                create: {
                    args: Prisma.KpiEvaluationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload>;
                };
                createMany: {
                    args: Prisma.KpiEvaluationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.KpiEvaluationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload>[];
                };
                delete: {
                    args: Prisma.KpiEvaluationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload>;
                };
                update: {
                    args: Prisma.KpiEvaluationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload>;
                };
                deleteMany: {
                    args: Prisma.KpiEvaluationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.KpiEvaluationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.KpiEvaluationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload>[];
                };
                upsert: {
                    args: Prisma.KpiEvaluationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KpiEvaluationPayload>;
                };
                aggregate: {
                    args: Prisma.KpiEvaluationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKpiEvaluation>;
                };
                groupBy: {
                    args: Prisma.KpiEvaluationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KpiEvaluationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.KpiEvaluationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KpiEvaluationCountAggregateOutputType> | number;
                };
            };
        };
        RecruitmentCandidate: {
            payload: Prisma.$RecruitmentCandidatePayload<ExtArgs>;
            fields: Prisma.RecruitmentCandidateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RecruitmentCandidateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RecruitmentCandidateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload>;
                };
                findFirst: {
                    args: Prisma.RecruitmentCandidateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RecruitmentCandidateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload>;
                };
                findMany: {
                    args: Prisma.RecruitmentCandidateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload>[];
                };
                create: {
                    args: Prisma.RecruitmentCandidateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload>;
                };
                createMany: {
                    args: Prisma.RecruitmentCandidateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RecruitmentCandidateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload>[];
                };
                delete: {
                    args: Prisma.RecruitmentCandidateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload>;
                };
                update: {
                    args: Prisma.RecruitmentCandidateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload>;
                };
                deleteMany: {
                    args: Prisma.RecruitmentCandidateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RecruitmentCandidateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RecruitmentCandidateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload>[];
                };
                upsert: {
                    args: Prisma.RecruitmentCandidateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecruitmentCandidatePayload>;
                };
                aggregate: {
                    args: Prisma.RecruitmentCandidateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRecruitmentCandidate>;
                };
                groupBy: {
                    args: Prisma.RecruitmentCandidateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecruitmentCandidateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RecruitmentCandidateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecruitmentCandidateCountAggregateOutputType> | number;
                };
            };
        };
        FleetVehicle: {
            payload: Prisma.$FleetVehiclePayload<ExtArgs>;
            fields: Prisma.FleetVehicleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FleetVehicleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FleetVehicleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload>;
                };
                findFirst: {
                    args: Prisma.FleetVehicleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FleetVehicleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload>;
                };
                findMany: {
                    args: Prisma.FleetVehicleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload>[];
                };
                create: {
                    args: Prisma.FleetVehicleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload>;
                };
                createMany: {
                    args: Prisma.FleetVehicleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FleetVehicleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload>[];
                };
                delete: {
                    args: Prisma.FleetVehicleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload>;
                };
                update: {
                    args: Prisma.FleetVehicleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload>;
                };
                deleteMany: {
                    args: Prisma.FleetVehicleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FleetVehicleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FleetVehicleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload>[];
                };
                upsert: {
                    args: Prisma.FleetVehicleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FleetVehiclePayload>;
                };
                aggregate: {
                    args: Prisma.FleetVehicleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFleetVehicle>;
                };
                groupBy: {
                    args: Prisma.FleetVehicleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FleetVehicleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FleetVehicleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FleetVehicleCountAggregateOutputType> | number;
                };
            };
        };
        LogisticsDriver: {
            payload: Prisma.$LogisticsDriverPayload<ExtArgs>;
            fields: Prisma.LogisticsDriverFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LogisticsDriverFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LogisticsDriverFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload>;
                };
                findFirst: {
                    args: Prisma.LogisticsDriverFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LogisticsDriverFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload>;
                };
                findMany: {
                    args: Prisma.LogisticsDriverFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload>[];
                };
                create: {
                    args: Prisma.LogisticsDriverCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload>;
                };
                createMany: {
                    args: Prisma.LogisticsDriverCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LogisticsDriverCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload>[];
                };
                delete: {
                    args: Prisma.LogisticsDriverDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload>;
                };
                update: {
                    args: Prisma.LogisticsDriverUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload>;
                };
                deleteMany: {
                    args: Prisma.LogisticsDriverDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LogisticsDriverUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LogisticsDriverUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload>[];
                };
                upsert: {
                    args: Prisma.LogisticsDriverUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDriverPayload>;
                };
                aggregate: {
                    args: Prisma.LogisticsDriverAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLogisticsDriver>;
                };
                groupBy: {
                    args: Prisma.LogisticsDriverGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsDriverGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LogisticsDriverCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsDriverCountAggregateOutputType> | number;
                };
            };
        };
        Transporter: {
            payload: Prisma.$TransporterPayload<ExtArgs>;
            fields: Prisma.TransporterFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TransporterFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TransporterFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload>;
                };
                findFirst: {
                    args: Prisma.TransporterFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TransporterFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload>;
                };
                findMany: {
                    args: Prisma.TransporterFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload>[];
                };
                create: {
                    args: Prisma.TransporterCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload>;
                };
                createMany: {
                    args: Prisma.TransporterCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TransporterCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload>[];
                };
                delete: {
                    args: Prisma.TransporterDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload>;
                };
                update: {
                    args: Prisma.TransporterUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload>;
                };
                deleteMany: {
                    args: Prisma.TransporterDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TransporterUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TransporterUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload>[];
                };
                upsert: {
                    args: Prisma.TransporterUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TransporterPayload>;
                };
                aggregate: {
                    args: Prisma.TransporterAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTransporter>;
                };
                groupBy: {
                    args: Prisma.TransporterGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TransporterGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TransporterCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TransporterCountAggregateOutputType> | number;
                };
            };
        };
        RouteTemplate: {
            payload: Prisma.$RouteTemplatePayload<ExtArgs>;
            fields: Prisma.RouteTemplateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RouteTemplateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RouteTemplateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload>;
                };
                findFirst: {
                    args: Prisma.RouteTemplateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RouteTemplateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload>;
                };
                findMany: {
                    args: Prisma.RouteTemplateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload>[];
                };
                create: {
                    args: Prisma.RouteTemplateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload>;
                };
                createMany: {
                    args: Prisma.RouteTemplateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RouteTemplateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload>[];
                };
                delete: {
                    args: Prisma.RouteTemplateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload>;
                };
                update: {
                    args: Prisma.RouteTemplateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload>;
                };
                deleteMany: {
                    args: Prisma.RouteTemplateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RouteTemplateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RouteTemplateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload>[];
                };
                upsert: {
                    args: Prisma.RouteTemplateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RouteTemplatePayload>;
                };
                aggregate: {
                    args: Prisma.RouteTemplateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRouteTemplate>;
                };
                groupBy: {
                    args: Prisma.RouteTemplateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RouteTemplateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RouteTemplateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RouteTemplateCountAggregateOutputType> | number;
                };
            };
        };
        TripPlan: {
            payload: Prisma.$TripPlanPayload<ExtArgs>;
            fields: Prisma.TripPlanFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TripPlanFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TripPlanFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload>;
                };
                findFirst: {
                    args: Prisma.TripPlanFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TripPlanFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload>;
                };
                findMany: {
                    args: Prisma.TripPlanFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload>[];
                };
                create: {
                    args: Prisma.TripPlanCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload>;
                };
                createMany: {
                    args: Prisma.TripPlanCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TripPlanCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload>[];
                };
                delete: {
                    args: Prisma.TripPlanDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload>;
                };
                update: {
                    args: Prisma.TripPlanUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload>;
                };
                deleteMany: {
                    args: Prisma.TripPlanDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TripPlanUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TripPlanUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload>[];
                };
                upsert: {
                    args: Prisma.TripPlanUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripPlanPayload>;
                };
                aggregate: {
                    args: Prisma.TripPlanAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTripPlan>;
                };
                groupBy: {
                    args: Prisma.TripPlanGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TripPlanGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TripPlanCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TripPlanCountAggregateOutputType> | number;
                };
            };
        };
        TripCheckpoint: {
            payload: Prisma.$TripCheckpointPayload<ExtArgs>;
            fields: Prisma.TripCheckpointFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TripCheckpointFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TripCheckpointFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload>;
                };
                findFirst: {
                    args: Prisma.TripCheckpointFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TripCheckpointFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload>;
                };
                findMany: {
                    args: Prisma.TripCheckpointFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload>[];
                };
                create: {
                    args: Prisma.TripCheckpointCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload>;
                };
                createMany: {
                    args: Prisma.TripCheckpointCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TripCheckpointCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload>[];
                };
                delete: {
                    args: Prisma.TripCheckpointDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload>;
                };
                update: {
                    args: Prisma.TripCheckpointUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload>;
                };
                deleteMany: {
                    args: Prisma.TripCheckpointDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TripCheckpointUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TripCheckpointUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload>[];
                };
                upsert: {
                    args: Prisma.TripCheckpointUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCheckpointPayload>;
                };
                aggregate: {
                    args: Prisma.TripCheckpointAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTripCheckpoint>;
                };
                groupBy: {
                    args: Prisma.TripCheckpointGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TripCheckpointGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TripCheckpointCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TripCheckpointCountAggregateOutputType> | number;
                };
            };
        };
        DeliveryOrder: {
            payload: Prisma.$DeliveryOrderPayload<ExtArgs>;
            fields: Prisma.DeliveryOrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DeliveryOrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DeliveryOrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload>;
                };
                findFirst: {
                    args: Prisma.DeliveryOrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DeliveryOrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload>;
                };
                findMany: {
                    args: Prisma.DeliveryOrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload>[];
                };
                create: {
                    args: Prisma.DeliveryOrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload>;
                };
                createMany: {
                    args: Prisma.DeliveryOrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DeliveryOrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload>[];
                };
                delete: {
                    args: Prisma.DeliveryOrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload>;
                };
                update: {
                    args: Prisma.DeliveryOrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload>;
                };
                deleteMany: {
                    args: Prisma.DeliveryOrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DeliveryOrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DeliveryOrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload>[];
                };
                upsert: {
                    args: Prisma.DeliveryOrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderPayload>;
                };
                aggregate: {
                    args: Prisma.DeliveryOrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDeliveryOrder>;
                };
                groupBy: {
                    args: Prisma.DeliveryOrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeliveryOrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DeliveryOrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeliveryOrderCountAggregateOutputType> | number;
                };
            };
        };
        DeliveryOrderItem: {
            payload: Prisma.$DeliveryOrderItemPayload<ExtArgs>;
            fields: Prisma.DeliveryOrderItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DeliveryOrderItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DeliveryOrderItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload>;
                };
                findFirst: {
                    args: Prisma.DeliveryOrderItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DeliveryOrderItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload>;
                };
                findMany: {
                    args: Prisma.DeliveryOrderItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload>[];
                };
                create: {
                    args: Prisma.DeliveryOrderItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload>;
                };
                createMany: {
                    args: Prisma.DeliveryOrderItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DeliveryOrderItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload>[];
                };
                delete: {
                    args: Prisma.DeliveryOrderItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload>;
                };
                update: {
                    args: Prisma.DeliveryOrderItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload>;
                };
                deleteMany: {
                    args: Prisma.DeliveryOrderItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DeliveryOrderItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DeliveryOrderItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload>[];
                };
                upsert: {
                    args: Prisma.DeliveryOrderItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryOrderItemPayload>;
                };
                aggregate: {
                    args: Prisma.DeliveryOrderItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDeliveryOrderItem>;
                };
                groupBy: {
                    args: Prisma.DeliveryOrderItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeliveryOrderItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DeliveryOrderItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeliveryOrderItemCountAggregateOutputType> | number;
                };
            };
        };
        ProofOfDelivery: {
            payload: Prisma.$ProofOfDeliveryPayload<ExtArgs>;
            fields: Prisma.ProofOfDeliveryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProofOfDeliveryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProofOfDeliveryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload>;
                };
                findFirst: {
                    args: Prisma.ProofOfDeliveryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProofOfDeliveryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload>;
                };
                findMany: {
                    args: Prisma.ProofOfDeliveryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload>[];
                };
                create: {
                    args: Prisma.ProofOfDeliveryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload>;
                };
                createMany: {
                    args: Prisma.ProofOfDeliveryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProofOfDeliveryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload>[];
                };
                delete: {
                    args: Prisma.ProofOfDeliveryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload>;
                };
                update: {
                    args: Prisma.ProofOfDeliveryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload>;
                };
                deleteMany: {
                    args: Prisma.ProofOfDeliveryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProofOfDeliveryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProofOfDeliveryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload>[];
                };
                upsert: {
                    args: Prisma.ProofOfDeliveryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProofOfDeliveryPayload>;
                };
                aggregate: {
                    args: Prisma.ProofOfDeliveryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProofOfDelivery>;
                };
                groupBy: {
                    args: Prisma.ProofOfDeliveryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProofOfDeliveryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProofOfDeliveryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProofOfDeliveryCountAggregateOutputType> | number;
                };
            };
        };
        DeliveryException: {
            payload: Prisma.$DeliveryExceptionPayload<ExtArgs>;
            fields: Prisma.DeliveryExceptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DeliveryExceptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DeliveryExceptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload>;
                };
                findFirst: {
                    args: Prisma.DeliveryExceptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DeliveryExceptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload>;
                };
                findMany: {
                    args: Prisma.DeliveryExceptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload>[];
                };
                create: {
                    args: Prisma.DeliveryExceptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload>;
                };
                createMany: {
                    args: Prisma.DeliveryExceptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DeliveryExceptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload>[];
                };
                delete: {
                    args: Prisma.DeliveryExceptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload>;
                };
                update: {
                    args: Prisma.DeliveryExceptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload>;
                };
                deleteMany: {
                    args: Prisma.DeliveryExceptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DeliveryExceptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DeliveryExceptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload>[];
                };
                upsert: {
                    args: Prisma.DeliveryExceptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeliveryExceptionPayload>;
                };
                aggregate: {
                    args: Prisma.DeliveryExceptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDeliveryException>;
                };
                groupBy: {
                    args: Prisma.DeliveryExceptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeliveryExceptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DeliveryExceptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeliveryExceptionCountAggregateOutputType> | number;
                };
            };
        };
        WavePicking: {
            payload: Prisma.$WavePickingPayload<ExtArgs>;
            fields: Prisma.WavePickingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WavePickingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WavePickingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload>;
                };
                findFirst: {
                    args: Prisma.WavePickingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WavePickingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload>;
                };
                findMany: {
                    args: Prisma.WavePickingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload>[];
                };
                create: {
                    args: Prisma.WavePickingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload>;
                };
                createMany: {
                    args: Prisma.WavePickingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WavePickingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload>[];
                };
                delete: {
                    args: Prisma.WavePickingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload>;
                };
                update: {
                    args: Prisma.WavePickingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload>;
                };
                deleteMany: {
                    args: Prisma.WavePickingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WavePickingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WavePickingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload>[];
                };
                upsert: {
                    args: Prisma.WavePickingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WavePickingPayload>;
                };
                aggregate: {
                    args: Prisma.WavePickingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWavePicking>;
                };
                groupBy: {
                    args: Prisma.WavePickingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WavePickingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WavePickingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WavePickingCountAggregateOutputType> | number;
                };
            };
        };
        StagingLoad: {
            payload: Prisma.$StagingLoadPayload<ExtArgs>;
            fields: Prisma.StagingLoadFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StagingLoadFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StagingLoadFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload>;
                };
                findFirst: {
                    args: Prisma.StagingLoadFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StagingLoadFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload>;
                };
                findMany: {
                    args: Prisma.StagingLoadFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload>[];
                };
                create: {
                    args: Prisma.StagingLoadCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload>;
                };
                createMany: {
                    args: Prisma.StagingLoadCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StagingLoadCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload>[];
                };
                delete: {
                    args: Prisma.StagingLoadDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload>;
                };
                update: {
                    args: Prisma.StagingLoadUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload>;
                };
                deleteMany: {
                    args: Prisma.StagingLoadDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StagingLoadUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StagingLoadUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload>[];
                };
                upsert: {
                    args: Prisma.StagingLoadUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StagingLoadPayload>;
                };
                aggregate: {
                    args: Prisma.StagingLoadAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStagingLoad>;
                };
                groupBy: {
                    args: Prisma.StagingLoadGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StagingLoadGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StagingLoadCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StagingLoadCountAggregateOutputType> | number;
                };
            };
        };
        PackingList: {
            payload: Prisma.$PackingListPayload<ExtArgs>;
            fields: Prisma.PackingListFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PackingListFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PackingListFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload>;
                };
                findFirst: {
                    args: Prisma.PackingListFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PackingListFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload>;
                };
                findMany: {
                    args: Prisma.PackingListFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload>[];
                };
                create: {
                    args: Prisma.PackingListCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload>;
                };
                createMany: {
                    args: Prisma.PackingListCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PackingListCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload>[];
                };
                delete: {
                    args: Prisma.PackingListDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload>;
                };
                update: {
                    args: Prisma.PackingListUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload>;
                };
                deleteMany: {
                    args: Prisma.PackingListDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PackingListUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PackingListUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload>[];
                };
                upsert: {
                    args: Prisma.PackingListUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PackingListPayload>;
                };
                aggregate: {
                    args: Prisma.PackingListAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePackingList>;
                };
                groupBy: {
                    args: Prisma.PackingListGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackingListGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PackingListCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PackingListCountAggregateOutputType> | number;
                };
            };
        };
        TripCost: {
            payload: Prisma.$TripCostPayload<ExtArgs>;
            fields: Prisma.TripCostFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TripCostFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TripCostFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload>;
                };
                findFirst: {
                    args: Prisma.TripCostFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TripCostFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload>;
                };
                findMany: {
                    args: Prisma.TripCostFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload>[];
                };
                create: {
                    args: Prisma.TripCostCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload>;
                };
                createMany: {
                    args: Prisma.TripCostCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TripCostCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload>[];
                };
                delete: {
                    args: Prisma.TripCostDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload>;
                };
                update: {
                    args: Prisma.TripCostUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload>;
                };
                deleteMany: {
                    args: Prisma.TripCostDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TripCostUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TripCostUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload>[];
                };
                upsert: {
                    args: Prisma.TripCostUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripCostPayload>;
                };
                aggregate: {
                    args: Prisma.TripCostAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTripCost>;
                };
                groupBy: {
                    args: Prisma.TripCostGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TripCostGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TripCostCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TripCostCountAggregateOutputType> | number;
                };
            };
        };
        TripLocation: {
            payload: Prisma.$TripLocationPayload<ExtArgs>;
            fields: Prisma.TripLocationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TripLocationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TripLocationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload>;
                };
                findFirst: {
                    args: Prisma.TripLocationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TripLocationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload>;
                };
                findMany: {
                    args: Prisma.TripLocationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload>[];
                };
                create: {
                    args: Prisma.TripLocationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload>;
                };
                createMany: {
                    args: Prisma.TripLocationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TripLocationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload>[];
                };
                delete: {
                    args: Prisma.TripLocationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload>;
                };
                update: {
                    args: Prisma.TripLocationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload>;
                };
                deleteMany: {
                    args: Prisma.TripLocationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TripLocationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TripLocationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload>[];
                };
                upsert: {
                    args: Prisma.TripLocationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripLocationPayload>;
                };
                aggregate: {
                    args: Prisma.TripLocationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTripLocation>;
                };
                groupBy: {
                    args: Prisma.TripLocationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TripLocationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TripLocationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TripLocationCountAggregateOutputType> | number;
                };
            };
        };
        TripRouteTrace: {
            payload: Prisma.$TripRouteTracePayload<ExtArgs>;
            fields: Prisma.TripRouteTraceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TripRouteTraceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TripRouteTraceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload>;
                };
                findFirst: {
                    args: Prisma.TripRouteTraceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TripRouteTraceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload>;
                };
                findMany: {
                    args: Prisma.TripRouteTraceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload>[];
                };
                create: {
                    args: Prisma.TripRouteTraceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload>;
                };
                createMany: {
                    args: Prisma.TripRouteTraceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TripRouteTraceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload>[];
                };
                delete: {
                    args: Prisma.TripRouteTraceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload>;
                };
                update: {
                    args: Prisma.TripRouteTraceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload>;
                };
                deleteMany: {
                    args: Prisma.TripRouteTraceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TripRouteTraceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TripRouteTraceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload>[];
                };
                upsert: {
                    args: Prisma.TripRouteTraceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TripRouteTracePayload>;
                };
                aggregate: {
                    args: Prisma.TripRouteTraceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTripRouteTrace>;
                };
                groupBy: {
                    args: Prisma.TripRouteTraceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TripRouteTraceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TripRouteTraceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TripRouteTraceCountAggregateOutputType> | number;
                };
            };
        };
        VehicleMaintenance: {
            payload: Prisma.$VehicleMaintenancePayload<ExtArgs>;
            fields: Prisma.VehicleMaintenanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VehicleMaintenanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VehicleMaintenanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload>;
                };
                findFirst: {
                    args: Prisma.VehicleMaintenanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VehicleMaintenanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload>;
                };
                findMany: {
                    args: Prisma.VehicleMaintenanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload>[];
                };
                create: {
                    args: Prisma.VehicleMaintenanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload>;
                };
                createMany: {
                    args: Prisma.VehicleMaintenanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VehicleMaintenanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload>[];
                };
                delete: {
                    args: Prisma.VehicleMaintenanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload>;
                };
                update: {
                    args: Prisma.VehicleMaintenanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload>;
                };
                deleteMany: {
                    args: Prisma.VehicleMaintenanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VehicleMaintenanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VehicleMaintenanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload>[];
                };
                upsert: {
                    args: Prisma.VehicleMaintenanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleMaintenancePayload>;
                };
                aggregate: {
                    args: Prisma.VehicleMaintenanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVehicleMaintenance>;
                };
                groupBy: {
                    args: Prisma.VehicleMaintenanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VehicleMaintenanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VehicleMaintenanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VehicleMaintenanceCountAggregateOutputType> | number;
                };
            };
        };
        VehicleDocument: {
            payload: Prisma.$VehicleDocumentPayload<ExtArgs>;
            fields: Prisma.VehicleDocumentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VehicleDocumentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VehicleDocumentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload>;
                };
                findFirst: {
                    args: Prisma.VehicleDocumentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VehicleDocumentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload>;
                };
                findMany: {
                    args: Prisma.VehicleDocumentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload>[];
                };
                create: {
                    args: Prisma.VehicleDocumentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload>;
                };
                createMany: {
                    args: Prisma.VehicleDocumentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VehicleDocumentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload>[];
                };
                delete: {
                    args: Prisma.VehicleDocumentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload>;
                };
                update: {
                    args: Prisma.VehicleDocumentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload>;
                };
                deleteMany: {
                    args: Prisma.VehicleDocumentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VehicleDocumentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VehicleDocumentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload>[];
                };
                upsert: {
                    args: Prisma.VehicleDocumentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicleDocumentPayload>;
                };
                aggregate: {
                    args: Prisma.VehicleDocumentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVehicleDocument>;
                };
                groupBy: {
                    args: Prisma.VehicleDocumentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VehicleDocumentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VehicleDocumentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VehicleDocumentCountAggregateOutputType> | number;
                };
            };
        };
        DriverSchedule: {
            payload: Prisma.$DriverSchedulePayload<ExtArgs>;
            fields: Prisma.DriverScheduleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DriverScheduleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DriverScheduleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload>;
                };
                findFirst: {
                    args: Prisma.DriverScheduleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DriverScheduleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload>;
                };
                findMany: {
                    args: Prisma.DriverScheduleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload>[];
                };
                create: {
                    args: Prisma.DriverScheduleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload>;
                };
                createMany: {
                    args: Prisma.DriverScheduleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DriverScheduleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload>[];
                };
                delete: {
                    args: Prisma.DriverScheduleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload>;
                };
                update: {
                    args: Prisma.DriverScheduleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload>;
                };
                deleteMany: {
                    args: Prisma.DriverScheduleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DriverScheduleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DriverScheduleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload>[];
                };
                upsert: {
                    args: Prisma.DriverScheduleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverSchedulePayload>;
                };
                aggregate: {
                    args: Prisma.DriverScheduleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDriverSchedule>;
                };
                groupBy: {
                    args: Prisma.DriverScheduleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DriverScheduleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DriverScheduleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DriverScheduleCountAggregateOutputType> | number;
                };
            };
        };
        DriverAvailability: {
            payload: Prisma.$DriverAvailabilityPayload<ExtArgs>;
            fields: Prisma.DriverAvailabilityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DriverAvailabilityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DriverAvailabilityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload>;
                };
                findFirst: {
                    args: Prisma.DriverAvailabilityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DriverAvailabilityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload>;
                };
                findMany: {
                    args: Prisma.DriverAvailabilityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload>[];
                };
                create: {
                    args: Prisma.DriverAvailabilityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload>;
                };
                createMany: {
                    args: Prisma.DriverAvailabilityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DriverAvailabilityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload>[];
                };
                delete: {
                    args: Prisma.DriverAvailabilityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload>;
                };
                update: {
                    args: Prisma.DriverAvailabilityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload>;
                };
                deleteMany: {
                    args: Prisma.DriverAvailabilityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DriverAvailabilityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DriverAvailabilityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload>[];
                };
                upsert: {
                    args: Prisma.DriverAvailabilityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DriverAvailabilityPayload>;
                };
                aggregate: {
                    args: Prisma.DriverAvailabilityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDriverAvailability>;
                };
                groupBy: {
                    args: Prisma.DriverAvailabilityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DriverAvailabilityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DriverAvailabilityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DriverAvailabilityCountAggregateOutputType> | number;
                };
            };
        };
        LogisticsPartner: {
            payload: Prisma.$LogisticsPartnerPayload<ExtArgs>;
            fields: Prisma.LogisticsPartnerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LogisticsPartnerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LogisticsPartnerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                findFirst: {
                    args: Prisma.LogisticsPartnerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LogisticsPartnerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                findMany: {
                    args: Prisma.LogisticsPartnerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>[];
                };
                create: {
                    args: Prisma.LogisticsPartnerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                createMany: {
                    args: Prisma.LogisticsPartnerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LogisticsPartnerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>[];
                };
                delete: {
                    args: Prisma.LogisticsPartnerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                update: {
                    args: Prisma.LogisticsPartnerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                deleteMany: {
                    args: Prisma.LogisticsPartnerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LogisticsPartnerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LogisticsPartnerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>[];
                };
                upsert: {
                    args: Prisma.LogisticsPartnerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                aggregate: {
                    args: Prisma.LogisticsPartnerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLogisticsPartner>;
                };
                groupBy: {
                    args: Prisma.LogisticsPartnerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsPartnerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LogisticsPartnerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsPartnerCountAggregateOutputType> | number;
                };
            };
        };
        PartnerRate: {
            payload: Prisma.$PartnerRatePayload<ExtArgs>;
            fields: Prisma.PartnerRateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PartnerRateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PartnerRateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload>;
                };
                findFirst: {
                    args: Prisma.PartnerRateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PartnerRateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload>;
                };
                findMany: {
                    args: Prisma.PartnerRateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload>[];
                };
                create: {
                    args: Prisma.PartnerRateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload>;
                };
                createMany: {
                    args: Prisma.PartnerRateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PartnerRateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload>[];
                };
                delete: {
                    args: Prisma.PartnerRateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload>;
                };
                update: {
                    args: Prisma.PartnerRateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload>;
                };
                deleteMany: {
                    args: Prisma.PartnerRateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PartnerRateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PartnerRateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload>[];
                };
                upsert: {
                    args: Prisma.PartnerRateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerRatePayload>;
                };
                aggregate: {
                    args: Prisma.PartnerRateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePartnerRate>;
                };
                groupBy: {
                    args: Prisma.PartnerRateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PartnerRateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PartnerRateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PartnerRateCountAggregateOutputType> | number;
                };
            };
        };
        PartnerShipment: {
            payload: Prisma.$PartnerShipmentPayload<ExtArgs>;
            fields: Prisma.PartnerShipmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PartnerShipmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PartnerShipmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload>;
                };
                findFirst: {
                    args: Prisma.PartnerShipmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PartnerShipmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload>;
                };
                findMany: {
                    args: Prisma.PartnerShipmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload>[];
                };
                create: {
                    args: Prisma.PartnerShipmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload>;
                };
                createMany: {
                    args: Prisma.PartnerShipmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PartnerShipmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload>[];
                };
                delete: {
                    args: Prisma.PartnerShipmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload>;
                };
                update: {
                    args: Prisma.PartnerShipmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload>;
                };
                deleteMany: {
                    args: Prisma.PartnerShipmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PartnerShipmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PartnerShipmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload>[];
                };
                upsert: {
                    args: Prisma.PartnerShipmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartnerShipmentPayload>;
                };
                aggregate: {
                    args: Prisma.PartnerShipmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePartnerShipment>;
                };
                groupBy: {
                    args: Prisma.PartnerShipmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PartnerShipmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PartnerShipmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PartnerShipmentCountAggregateOutputType> | number;
                };
            };
        };
        KitDefinition: {
            payload: Prisma.$KitDefinitionPayload<ExtArgs>;
            fields: Prisma.KitDefinitionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.KitDefinitionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.KitDefinitionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload>;
                };
                findFirst: {
                    args: Prisma.KitDefinitionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.KitDefinitionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload>;
                };
                findMany: {
                    args: Prisma.KitDefinitionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload>[];
                };
                create: {
                    args: Prisma.KitDefinitionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload>;
                };
                createMany: {
                    args: Prisma.KitDefinitionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.KitDefinitionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload>[];
                };
                delete: {
                    args: Prisma.KitDefinitionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload>;
                };
                update: {
                    args: Prisma.KitDefinitionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload>;
                };
                deleteMany: {
                    args: Prisma.KitDefinitionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.KitDefinitionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.KitDefinitionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload>[];
                };
                upsert: {
                    args: Prisma.KitDefinitionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitDefinitionPayload>;
                };
                aggregate: {
                    args: Prisma.KitDefinitionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKitDefinition>;
                };
                groupBy: {
                    args: Prisma.KitDefinitionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KitDefinitionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.KitDefinitionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KitDefinitionCountAggregateOutputType> | number;
                };
            };
        };
        KitAssembly: {
            payload: Prisma.$KitAssemblyPayload<ExtArgs>;
            fields: Prisma.KitAssemblyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.KitAssemblyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.KitAssemblyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload>;
                };
                findFirst: {
                    args: Prisma.KitAssemblyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.KitAssemblyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload>;
                };
                findMany: {
                    args: Prisma.KitAssemblyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload>[];
                };
                create: {
                    args: Prisma.KitAssemblyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload>;
                };
                createMany: {
                    args: Prisma.KitAssemblyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.KitAssemblyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload>[];
                };
                delete: {
                    args: Prisma.KitAssemblyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload>;
                };
                update: {
                    args: Prisma.KitAssemblyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload>;
                };
                deleteMany: {
                    args: Prisma.KitAssemblyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.KitAssemblyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.KitAssemblyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload>[];
                };
                upsert: {
                    args: Prisma.KitAssemblyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KitAssemblyPayload>;
                };
                aggregate: {
                    args: Prisma.KitAssemblyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKitAssembly>;
                };
                groupBy: {
                    args: Prisma.KitAssemblyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KitAssemblyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.KitAssemblyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KitAssemblyCountAggregateOutputType> | number;
                };
            };
        };
        Project: {
            payload: Prisma.$ProjectPayload<ExtArgs>;
            fields: Prisma.ProjectFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProjectFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                findFirst: {
                    args: Prisma.ProjectFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                findMany: {
                    args: Prisma.ProjectFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>[];
                };
                create: {
                    args: Prisma.ProjectCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                createMany: {
                    args: Prisma.ProjectCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>[];
                };
                delete: {
                    args: Prisma.ProjectDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                update: {
                    args: Prisma.ProjectUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                deleteMany: {
                    args: Prisma.ProjectDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProjectUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>[];
                };
                upsert: {
                    args: Prisma.ProjectUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                aggregate: {
                    args: Prisma.ProjectAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProject>;
                };
                groupBy: {
                    args: Prisma.ProjectGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProjectCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectCountAggregateOutputType> | number;
                };
            };
        };
        WbsTask: {
            payload: Prisma.$WbsTaskPayload<ExtArgs>;
            fields: Prisma.WbsTaskFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WbsTaskFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WbsTaskFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload>;
                };
                findFirst: {
                    args: Prisma.WbsTaskFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WbsTaskFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload>;
                };
                findMany: {
                    args: Prisma.WbsTaskFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload>[];
                };
                create: {
                    args: Prisma.WbsTaskCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload>;
                };
                createMany: {
                    args: Prisma.WbsTaskCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WbsTaskCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload>[];
                };
                delete: {
                    args: Prisma.WbsTaskDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload>;
                };
                update: {
                    args: Prisma.WbsTaskUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload>;
                };
                deleteMany: {
                    args: Prisma.WbsTaskDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WbsTaskUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WbsTaskUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload>[];
                };
                upsert: {
                    args: Prisma.WbsTaskUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WbsTaskPayload>;
                };
                aggregate: {
                    args: Prisma.WbsTaskAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWbsTask>;
                };
                groupBy: {
                    args: Prisma.WbsTaskGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WbsTaskGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WbsTaskCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WbsTaskCountAggregateOutputType> | number;
                };
            };
        };
        ProjectBudget: {
            payload: Prisma.$ProjectBudgetPayload<ExtArgs>;
            fields: Prisma.ProjectBudgetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProjectBudgetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProjectBudgetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload>;
                };
                findFirst: {
                    args: Prisma.ProjectBudgetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProjectBudgetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload>;
                };
                findMany: {
                    args: Prisma.ProjectBudgetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload>[];
                };
                create: {
                    args: Prisma.ProjectBudgetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload>;
                };
                createMany: {
                    args: Prisma.ProjectBudgetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProjectBudgetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload>[];
                };
                delete: {
                    args: Prisma.ProjectBudgetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload>;
                };
                update: {
                    args: Prisma.ProjectBudgetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload>;
                };
                deleteMany: {
                    args: Prisma.ProjectBudgetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProjectBudgetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProjectBudgetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload>[];
                };
                upsert: {
                    args: Prisma.ProjectBudgetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectBudgetPayload>;
                };
                aggregate: {
                    args: Prisma.ProjectBudgetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProjectBudget>;
                };
                groupBy: {
                    args: Prisma.ProjectBudgetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectBudgetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProjectBudgetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectBudgetCountAggregateOutputType> | number;
                };
            };
        };
        Tender: {
            payload: Prisma.$TenderPayload<ExtArgs>;
            fields: Prisma.TenderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TenderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TenderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload>;
                };
                findFirst: {
                    args: Prisma.TenderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TenderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload>;
                };
                findMany: {
                    args: Prisma.TenderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload>[];
                };
                create: {
                    args: Prisma.TenderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload>;
                };
                createMany: {
                    args: Prisma.TenderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TenderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload>[];
                };
                delete: {
                    args: Prisma.TenderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload>;
                };
                update: {
                    args: Prisma.TenderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload>;
                };
                deleteMany: {
                    args: Prisma.TenderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TenderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TenderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload>[];
                };
                upsert: {
                    args: Prisma.TenderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderPayload>;
                };
                aggregate: {
                    args: Prisma.TenderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTender>;
                };
                groupBy: {
                    args: Prisma.TenderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TenderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TenderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TenderCountAggregateOutputType> | number;
                };
            };
        };
        TenderBid: {
            payload: Prisma.$TenderBidPayload<ExtArgs>;
            fields: Prisma.TenderBidFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TenderBidFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TenderBidFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload>;
                };
                findFirst: {
                    args: Prisma.TenderBidFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TenderBidFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload>;
                };
                findMany: {
                    args: Prisma.TenderBidFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload>[];
                };
                create: {
                    args: Prisma.TenderBidCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload>;
                };
                createMany: {
                    args: Prisma.TenderBidCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TenderBidCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload>[];
                };
                delete: {
                    args: Prisma.TenderBidDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload>;
                };
                update: {
                    args: Prisma.TenderBidUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload>;
                };
                deleteMany: {
                    args: Prisma.TenderBidDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TenderBidUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TenderBidUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload>[];
                };
                upsert: {
                    args: Prisma.TenderBidUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TenderBidPayload>;
                };
                aggregate: {
                    args: Prisma.TenderBidAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTenderBid>;
                };
                groupBy: {
                    args: Prisma.TenderBidGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TenderBidGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TenderBidCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TenderBidCountAggregateOutputType> | number;
                };
            };
        };
        ProjectContract: {
            payload: Prisma.$ProjectContractPayload<ExtArgs>;
            fields: Prisma.ProjectContractFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProjectContractFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProjectContractFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload>;
                };
                findFirst: {
                    args: Prisma.ProjectContractFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProjectContractFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload>;
                };
                findMany: {
                    args: Prisma.ProjectContractFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload>[];
                };
                create: {
                    args: Prisma.ProjectContractCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload>;
                };
                createMany: {
                    args: Prisma.ProjectContractCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProjectContractCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload>[];
                };
                delete: {
                    args: Prisma.ProjectContractDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload>;
                };
                update: {
                    args: Prisma.ProjectContractUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload>;
                };
                deleteMany: {
                    args: Prisma.ProjectContractDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProjectContractUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProjectContractUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload>[];
                };
                upsert: {
                    args: Prisma.ProjectContractUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContractPayload>;
                };
                aggregate: {
                    args: Prisma.ProjectContractAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProjectContract>;
                };
                groupBy: {
                    args: Prisma.ProjectContractGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectContractGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProjectContractCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectContractCountAggregateOutputType> | number;
                };
            };
        };
        ContractTermijn: {
            payload: Prisma.$ContractTermijnPayload<ExtArgs>;
            fields: Prisma.ContractTermijnFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ContractTermijnFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ContractTermijnFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload>;
                };
                findFirst: {
                    args: Prisma.ContractTermijnFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ContractTermijnFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload>;
                };
                findMany: {
                    args: Prisma.ContractTermijnFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload>[];
                };
                create: {
                    args: Prisma.ContractTermijnCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload>;
                };
                createMany: {
                    args: Prisma.ContractTermijnCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ContractTermijnCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload>[];
                };
                delete: {
                    args: Prisma.ContractTermijnDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload>;
                };
                update: {
                    args: Prisma.ContractTermijnUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload>;
                };
                deleteMany: {
                    args: Prisma.ContractTermijnDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ContractTermijnUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ContractTermijnUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload>[];
                };
                upsert: {
                    args: Prisma.ContractTermijnUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractTermijnPayload>;
                };
                aggregate: {
                    args: Prisma.ContractTermijnAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateContractTermijn>;
                };
                groupBy: {
                    args: Prisma.ContractTermijnGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContractTermijnGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ContractTermijnCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContractTermijnCountAggregateOutputType> | number;
                };
            };
        };
        DailyReport: {
            payload: Prisma.$DailyReportPayload<ExtArgs>;
            fields: Prisma.DailyReportFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DailyReportFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DailyReportFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload>;
                };
                findFirst: {
                    args: Prisma.DailyReportFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DailyReportFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload>;
                };
                findMany: {
                    args: Prisma.DailyReportFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload>[];
                };
                create: {
                    args: Prisma.DailyReportCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload>;
                };
                createMany: {
                    args: Prisma.DailyReportCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DailyReportCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload>[];
                };
                delete: {
                    args: Prisma.DailyReportDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload>;
                };
                update: {
                    args: Prisma.DailyReportUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload>;
                };
                deleteMany: {
                    args: Prisma.DailyReportDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DailyReportUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DailyReportUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload>[];
                };
                upsert: {
                    args: Prisma.DailyReportUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DailyReportPayload>;
                };
                aggregate: {
                    args: Prisma.DailyReportAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDailyReport>;
                };
                groupBy: {
                    args: Prisma.DailyReportGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DailyReportGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DailyReportCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DailyReportCountAggregateOutputType> | number;
                };
            };
        };
        ResourceUsage: {
            payload: Prisma.$ResourceUsagePayload<ExtArgs>;
            fields: Prisma.ResourceUsageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ResourceUsageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ResourceUsageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload>;
                };
                findFirst: {
                    args: Prisma.ResourceUsageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ResourceUsageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload>;
                };
                findMany: {
                    args: Prisma.ResourceUsageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload>[];
                };
                create: {
                    args: Prisma.ResourceUsageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload>;
                };
                createMany: {
                    args: Prisma.ResourceUsageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ResourceUsageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload>[];
                };
                delete: {
                    args: Prisma.ResourceUsageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload>;
                };
                update: {
                    args: Prisma.ResourceUsageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload>;
                };
                deleteMany: {
                    args: Prisma.ResourceUsageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ResourceUsageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ResourceUsageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload>[];
                };
                upsert: {
                    args: Prisma.ResourceUsageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResourceUsagePayload>;
                };
                aggregate: {
                    args: Prisma.ResourceUsageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateResourceUsage>;
                };
                groupBy: {
                    args: Prisma.ResourceUsageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResourceUsageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ResourceUsageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResourceUsageCountAggregateOutputType> | number;
                };
            };
        };
        ProgressClaim: {
            payload: Prisma.$ProgressClaimPayload<ExtArgs>;
            fields: Prisma.ProgressClaimFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProgressClaimFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProgressClaimFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload>;
                };
                findFirst: {
                    args: Prisma.ProgressClaimFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProgressClaimFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload>;
                };
                findMany: {
                    args: Prisma.ProgressClaimFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload>[];
                };
                create: {
                    args: Prisma.ProgressClaimCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload>;
                };
                createMany: {
                    args: Prisma.ProgressClaimCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProgressClaimCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload>[];
                };
                delete: {
                    args: Prisma.ProgressClaimDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload>;
                };
                update: {
                    args: Prisma.ProgressClaimUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload>;
                };
                deleteMany: {
                    args: Prisma.ProgressClaimDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProgressClaimUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProgressClaimUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload>[];
                };
                upsert: {
                    args: Prisma.ProgressClaimUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressClaimPayload>;
                };
                aggregate: {
                    args: Prisma.ProgressClaimAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProgressClaim>;
                };
                groupBy: {
                    args: Prisma.ProgressClaimGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProgressClaimGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProgressClaimCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProgressClaimCountAggregateOutputType> | number;
                };
            };
        };
        ProgressInvoice: {
            payload: Prisma.$ProgressInvoicePayload<ExtArgs>;
            fields: Prisma.ProgressInvoiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProgressInvoiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProgressInvoiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload>;
                };
                findFirst: {
                    args: Prisma.ProgressInvoiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProgressInvoiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload>;
                };
                findMany: {
                    args: Prisma.ProgressInvoiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload>[];
                };
                create: {
                    args: Prisma.ProgressInvoiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload>;
                };
                createMany: {
                    args: Prisma.ProgressInvoiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProgressInvoiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload>[];
                };
                delete: {
                    args: Prisma.ProgressInvoiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload>;
                };
                update: {
                    args: Prisma.ProgressInvoiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload>;
                };
                deleteMany: {
                    args: Prisma.ProgressInvoiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProgressInvoiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProgressInvoiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload>[];
                };
                upsert: {
                    args: Prisma.ProgressInvoiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgressInvoicePayload>;
                };
                aggregate: {
                    args: Prisma.ProgressInvoiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProgressInvoice>;
                };
                groupBy: {
                    args: Prisma.ProgressInvoiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProgressInvoiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProgressInvoiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProgressInvoiceCountAggregateOutputType> | number;
                };
            };
        };
        ProjectCommitment: {
            payload: Prisma.$ProjectCommitmentPayload<ExtArgs>;
            fields: Prisma.ProjectCommitmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProjectCommitmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProjectCommitmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload>;
                };
                findFirst: {
                    args: Prisma.ProjectCommitmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProjectCommitmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload>;
                };
                findMany: {
                    args: Prisma.ProjectCommitmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload>[];
                };
                create: {
                    args: Prisma.ProjectCommitmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload>;
                };
                createMany: {
                    args: Prisma.ProjectCommitmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProjectCommitmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload>[];
                };
                delete: {
                    args: Prisma.ProjectCommitmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload>;
                };
                update: {
                    args: Prisma.ProjectCommitmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload>;
                };
                deleteMany: {
                    args: Prisma.ProjectCommitmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProjectCommitmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProjectCommitmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload>[];
                };
                upsert: {
                    args: Prisma.ProjectCommitmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectCommitmentPayload>;
                };
                aggregate: {
                    args: Prisma.ProjectCommitmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProjectCommitment>;
                };
                groupBy: {
                    args: Prisma.ProjectCommitmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectCommitmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProjectCommitmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectCommitmentCountAggregateOutputType> | number;
                };
            };
        };
        ThreeWayMatching: {
            payload: Prisma.$ThreeWayMatchingPayload<ExtArgs>;
            fields: Prisma.ThreeWayMatchingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ThreeWayMatchingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ThreeWayMatchingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload>;
                };
                findFirst: {
                    args: Prisma.ThreeWayMatchingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ThreeWayMatchingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload>;
                };
                findMany: {
                    args: Prisma.ThreeWayMatchingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload>[];
                };
                create: {
                    args: Prisma.ThreeWayMatchingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload>;
                };
                createMany: {
                    args: Prisma.ThreeWayMatchingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ThreeWayMatchingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload>[];
                };
                delete: {
                    args: Prisma.ThreeWayMatchingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload>;
                };
                update: {
                    args: Prisma.ThreeWayMatchingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload>;
                };
                deleteMany: {
                    args: Prisma.ThreeWayMatchingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ThreeWayMatchingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ThreeWayMatchingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload>[];
                };
                upsert: {
                    args: Prisma.ThreeWayMatchingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ThreeWayMatchingPayload>;
                };
                aggregate: {
                    args: Prisma.ThreeWayMatchingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateThreeWayMatching>;
                };
                groupBy: {
                    args: Prisma.ThreeWayMatchingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ThreeWayMatchingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ThreeWayMatchingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ThreeWayMatchingCountAggregateOutputType> | number;
                };
            };
        };
        StockBalance: {
            payload: Prisma.$StockBalancePayload<ExtArgs>;
            fields: Prisma.StockBalanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StockBalanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StockBalanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload>;
                };
                findFirst: {
                    args: Prisma.StockBalanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StockBalanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload>;
                };
                findMany: {
                    args: Prisma.StockBalanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload>[];
                };
                create: {
                    args: Prisma.StockBalanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload>;
                };
                createMany: {
                    args: Prisma.StockBalanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StockBalanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload>[];
                };
                delete: {
                    args: Prisma.StockBalanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload>;
                };
                update: {
                    args: Prisma.StockBalanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload>;
                };
                deleteMany: {
                    args: Prisma.StockBalanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StockBalanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StockBalanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload>[];
                };
                upsert: {
                    args: Prisma.StockBalanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StockBalancePayload>;
                };
                aggregate: {
                    args: Prisma.StockBalanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStockBalance>;
                };
                groupBy: {
                    args: Prisma.StockBalanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockBalanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StockBalanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StockBalanceCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const TenantScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly createdAt: "createdAt";
};
export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly email: "email";
    readonly name: "name";
    readonly passwordHash: "passwordHash";
    readonly isSuperAdmin: "isSuperAdmin";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const LeadScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly source: "source";
    readonly status: "status";
    readonly assignedToUserId: "assignedToUserId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum];
export declare const CustomerScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly address1: "address1";
    readonly address2: "address2";
    readonly city: "city";
    readonly province: "province";
    readonly postalCode: "postalCode";
    readonly countryCode: "countryCode";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum];
export declare const SalesQuotationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly customerId: "customerId";
    readonly issueDate: "issueDate";
    readonly expiryDate: "expiryDate";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SalesQuotationScalarFieldEnum = (typeof SalesQuotationScalarFieldEnum)[keyof typeof SalesQuotationScalarFieldEnum];
export declare const SalesQuotationItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly quotationId: "quotationId";
    readonly lineNo: "lineNo";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly unitPrice: "unitPrice";
    readonly discount: "discount";
    readonly taxCodeId: "taxCodeId";
};
export type SalesQuotationItemScalarFieldEnum = (typeof SalesQuotationItemScalarFieldEnum)[keyof typeof SalesQuotationItemScalarFieldEnum];
export declare const SalesOrderScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly customerId: "customerId";
    readonly quotationId: "quotationId";
    readonly orderDate: "orderDate";
    readonly status: "status";
    readonly workflowDefinitionId: "workflowDefinitionId";
    readonly currentStepNo: "currentStepNo";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SalesOrderScalarFieldEnum = (typeof SalesOrderScalarFieldEnum)[keyof typeof SalesOrderScalarFieldEnum];
export declare const SalesOrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly orderId: "orderId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly unitPrice: "unitPrice";
    readonly discount: "discount";
    readonly taxCodeId: "taxCodeId";
};
export type SalesOrderItemScalarFieldEnum = (typeof SalesOrderItemScalarFieldEnum)[keyof typeof SalesOrderItemScalarFieldEnum];
export declare const SalesInvoiceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly customerId: "customerId";
    readonly orderId: "orderId";
    readonly invoiceDate: "invoiceDate";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SalesInvoiceScalarFieldEnum = (typeof SalesInvoiceScalarFieldEnum)[keyof typeof SalesInvoiceScalarFieldEnum];
export declare const SalesInvoiceItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly invoiceId: "invoiceId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly unitPrice: "unitPrice";
    readonly discount: "discount";
    readonly taxCodeId: "taxCodeId";
};
export type SalesInvoiceItemScalarFieldEnum = (typeof SalesInvoiceItemScalarFieldEnum)[keyof typeof SalesInvoiceItemScalarFieldEnum];
export declare const SalesReturnScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly customerId: "customerId";
    readonly orderId: "orderId";
    readonly returnDate: "returnDate";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SalesReturnScalarFieldEnum = (typeof SalesReturnScalarFieldEnum)[keyof typeof SalesReturnScalarFieldEnum];
export declare const SalesReturnItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly returnId: "returnId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly unitPrice: "unitPrice";
    readonly taxCodeId: "taxCodeId";
};
export type SalesReturnItemScalarFieldEnum = (typeof SalesReturnItemScalarFieldEnum)[keyof typeof SalesReturnItemScalarFieldEnum];
export declare const PriceListScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PriceListScalarFieldEnum = (typeof PriceListScalarFieldEnum)[keyof typeof PriceListScalarFieldEnum];
export declare const PriceListItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly priceListId: "priceListId";
    readonly itemCode: "itemCode";
    readonly uomCode: "uomCode";
    readonly unitPrice: "unitPrice";
    readonly effectiveDate: "effectiveDate";
    readonly endDate: "endDate";
    readonly customerId: "customerId";
};
export type PriceListItemScalarFieldEnum = (typeof PriceListItemScalarFieldEnum)[keyof typeof PriceListItemScalarFieldEnum];
export declare const PriceRuleScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly priority: "priority";
    readonly isActive: "isActive";
    readonly itemCode: "itemCode";
    readonly uomCode: "uomCode";
    readonly unitPrice: "unitPrice";
    readonly effectiveDate: "effectiveDate";
    readonly endDate: "endDate";
    readonly customerId: "customerId";
    readonly customerGroup: "customerGroup";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PriceRuleScalarFieldEnum = (typeof PriceRuleScalarFieldEnum)[keyof typeof PriceRuleScalarFieldEnum];
export declare const DiscountRuleScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly priority: "priority";
    readonly isActive: "isActive";
    readonly itemCode: "itemCode";
    readonly uomCode: "uomCode";
    readonly discountPercent: "discountPercent";
    readonly effectiveDate: "effectiveDate";
    readonly endDate: "endDate";
    readonly customerId: "customerId";
    readonly customerGroup: "customerGroup";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DiscountRuleScalarFieldEnum = (typeof DiscountRuleScalarFieldEnum)[keyof typeof DiscountRuleScalarFieldEnum];
export declare const CarrierScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CarrierScalarFieldEnum = (typeof CarrierScalarFieldEnum)[keyof typeof CarrierScalarFieldEnum];
export declare const ShipmentScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly orderId: "orderId";
    readonly carrierId: "carrierId";
    readonly trackingNo: "trackingNo";
    readonly shipDate: "shipDate";
    readonly deliveryDate: "deliveryDate";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ShipmentScalarFieldEnum = (typeof ShipmentScalarFieldEnum)[keyof typeof ShipmentScalarFieldEnum];
export declare const CommissionSchemeScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly rate: "rate";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommissionSchemeScalarFieldEnum = (typeof CommissionSchemeScalarFieldEnum)[keyof typeof CommissionSchemeScalarFieldEnum];
export declare const CommissionEntryScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly schemeId: "schemeId";
    readonly invoiceId: "invoiceId";
    readonly salesUserId: "salesUserId";
    readonly baseAmount: "baseAmount";
    readonly amount: "amount";
    readonly createdAt: "createdAt";
};
export type CommissionEntryScalarFieldEnum = (typeof CommissionEntryScalarFieldEnum)[keyof typeof CommissionEntryScalarFieldEnum];
export declare const SupplierScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly address1: "address1";
    readonly address2: "address2";
    readonly city: "city";
    readonly province: "province";
    readonly postalCode: "postalCode";
    readonly countryCode: "countryCode";
    readonly npwp: "npwp";
    readonly bankName: "bankName";
    readonly bankAccount: "bankAccount";
    readonly paymentTerms: "paymentTerms";
    readonly vendorGroup: "vendorGroup";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum];
export declare const PurchaseRequisitionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly requestDate: "requestDate";
    readonly status: "status";
    readonly notes: "notes";
    readonly department: "department";
    readonly costCenterId: "costCenterId";
    readonly estimatedTotal: "estimatedTotal";
    readonly workflowDefinitionId: "workflowDefinitionId";
    readonly currentStepNo: "currentStepNo";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PurchaseRequisitionScalarFieldEnum = (typeof PurchaseRequisitionScalarFieldEnum)[keyof typeof PurchaseRequisitionScalarFieldEnum];
export declare const PurchaseRequisitionItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly requisitionId: "requisitionId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly estimatedPrice: "estimatedPrice";
    readonly requiredDate: "requiredDate";
};
export type PurchaseRequisitionItemScalarFieldEnum = (typeof PurchaseRequisitionItemScalarFieldEnum)[keyof typeof PurchaseRequisitionItemScalarFieldEnum];
export declare const RfqScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly title: "title";
    readonly department: "department";
    readonly issueDate: "issueDate";
    readonly closingDate: "closingDate";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RfqScalarFieldEnum = (typeof RfqScalarFieldEnum)[keyof typeof RfqScalarFieldEnum];
export declare const RfqVendorScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly rfqId: "rfqId";
    readonly supplierId: "supplierId";
    readonly status: "status";
    readonly bidAmount: "bidAmount";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type RfqVendorScalarFieldEnum = (typeof RfqVendorScalarFieldEnum)[keyof typeof RfqVendorScalarFieldEnum];
export declare const RfqItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly rfqId: "rfqId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly targetPrice: "targetPrice";
};
export type RfqItemScalarFieldEnum = (typeof RfqItemScalarFieldEnum)[keyof typeof RfqItemScalarFieldEnum];
export declare const PurchaseOrderScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly supplierId: "supplierId";
    readonly rfqId: "rfqId";
    readonly orderDate: "orderDate";
    readonly expectedDeliveryDate: "expectedDeliveryDate";
    readonly shippingAddress: "shippingAddress";
    readonly paymentTerms: "paymentTerms";
    readonly subtotal: "subtotal";
    readonly taxAmount: "taxAmount";
    readonly grandTotal: "grandTotal";
    readonly status: "status";
    readonly notes: "notes";
    readonly workflowDefinitionId: "workflowDefinitionId";
    readonly currentStepNo: "currentStepNo";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PurchaseOrderScalarFieldEnum = (typeof PurchaseOrderScalarFieldEnum)[keyof typeof PurchaseOrderScalarFieldEnum];
export declare const PurchaseOrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly orderId: "orderId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly unitPrice: "unitPrice";
    readonly discount: "discount";
    readonly taxCodeId: "taxCodeId";
    readonly amount: "amount";
};
export type PurchaseOrderItemScalarFieldEnum = (typeof PurchaseOrderItemScalarFieldEnum)[keyof typeof PurchaseOrderItemScalarFieldEnum];
export declare const PurchaseInvoiceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly supplierId: "supplierId";
    readonly orderId: "orderId";
    readonly invoiceDate: "invoiceDate";
    readonly dueDate: "dueDate";
    readonly paymentTerms: "paymentTerms";
    readonly taxFacturNumber: "taxFacturNumber";
    readonly subtotal: "subtotal";
    readonly taxAmount: "taxAmount";
    readonly grandTotal: "grandTotal";
    readonly balanceDue: "balanceDue";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PurchaseInvoiceScalarFieldEnum = (typeof PurchaseInvoiceScalarFieldEnum)[keyof typeof PurchaseInvoiceScalarFieldEnum];
export declare const PurchaseInvoiceItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly invoiceId: "invoiceId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly unitPrice: "unitPrice";
    readonly discount: "discount";
    readonly taxCodeId: "taxCodeId";
    readonly amount: "amount";
};
export type PurchaseInvoiceItemScalarFieldEnum = (typeof PurchaseInvoiceItemScalarFieldEnum)[keyof typeof PurchaseInvoiceItemScalarFieldEnum];
export declare const LandedCostVoucherScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly supplierId: "supplierId";
    readonly orderId: "orderId";
    readonly invoiceId: "invoiceId";
    readonly costDate: "costDate";
    readonly status: "status";
    readonly apportionmentMethod: "apportionmentMethod";
    readonly receiptId: "receiptId";
    readonly totalAmount: "totalAmount";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LandedCostVoucherScalarFieldEnum = (typeof LandedCostVoucherScalarFieldEnum)[keyof typeof LandedCostVoucherScalarFieldEnum];
export declare const LandedCostAllocationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly landedCostId: "landedCostId";
    readonly lineNo: "lineNo";
    readonly costComponent: "costComponent";
    readonly itemId: "itemId";
    readonly receiptLineNo: "receiptLineNo";
    readonly amount: "amount";
};
export type LandedCostAllocationScalarFieldEnum = (typeof LandedCostAllocationScalarFieldEnum)[keyof typeof LandedCostAllocationScalarFieldEnum];
export declare const PurchaseReturnScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly supplierId: "supplierId";
    readonly orderId: "orderId";
    readonly invoiceId: "invoiceId";
    readonly returnDate: "returnDate";
    readonly reason: "reason";
    readonly receiptId: "receiptId";
    readonly subtotal: "subtotal";
    readonly taxAmount: "taxAmount";
    readonly grandTotal: "grandTotal";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PurchaseReturnScalarFieldEnum = (typeof PurchaseReturnScalarFieldEnum)[keyof typeof PurchaseReturnScalarFieldEnum];
export declare const PurchaseReturnItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly returnId: "returnId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly receiptLineNo: "receiptLineNo";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly unitPrice: "unitPrice";
    readonly amount: "amount";
    readonly taxCodeId: "taxCodeId";
};
export type PurchaseReturnItemScalarFieldEnum = (typeof PurchaseReturnItemScalarFieldEnum)[keyof typeof PurchaseReturnItemScalarFieldEnum];
export declare const ItemGroupScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ItemGroupScalarFieldEnum = (typeof ItemGroupScalarFieldEnum)[keyof typeof ItemGroupScalarFieldEnum];
export declare const ItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly description: "description";
    readonly itemGroupId: "itemGroupId";
    readonly baseUomCode: "baseUomCode";
    readonly trackingType: "trackingType";
    readonly valuationMethod: "valuationMethod";
    readonly reorderPoint: "reorderPoint";
    readonly reorderQty: "reorderQty";
    readonly isActive: "isActive";
    readonly isSalesItem: "isSalesItem";
    readonly isPurchaseItem: "isPurchaseItem";
    readonly purchaseTaxCodeId: "purchaseTaxCodeId";
    readonly salesTaxCodeId: "salesTaxCodeId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum];
export declare const ItemUomScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly itemId: "itemId";
    readonly uomCode: "uomCode";
    readonly isBase: "isBase";
    readonly conversionRate: "conversionRate";
    readonly price: "price";
    readonly createdAt: "createdAt";
};
export type ItemUomScalarFieldEnum = (typeof ItemUomScalarFieldEnum)[keyof typeof ItemUomScalarFieldEnum];
export declare const ItemBarcodeScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly itemId: "itemId";
    readonly barcode: "barcode";
    readonly createdAt: "createdAt";
};
export type ItemBarcodeScalarFieldEnum = (typeof ItemBarcodeScalarFieldEnum)[keyof typeof ItemBarcodeScalarFieldEnum];
export declare const WarehouseScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WarehouseScalarFieldEnum = (typeof WarehouseScalarFieldEnum)[keyof typeof WarehouseScalarFieldEnum];
export declare const BinLocationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly warehouseId: "warehouseId";
    readonly code: "code";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BinLocationScalarFieldEnum = (typeof BinLocationScalarFieldEnum)[keyof typeof BinLocationScalarFieldEnum];
export declare const StockLedgerScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly moveType: "moveType";
    readonly refType: "refType";
    readonly refId: "refId";
    readonly postingDate: "postingDate";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qtyIn: "qtyIn";
    readonly qtyOut: "qtyOut";
    readonly uomCode: "uomCode";
    readonly warehouseId: "warehouseId";
    readonly binLocationId: "binLocationId";
    readonly batchId: "batchId";
    readonly serialId: "serialId";
    readonly unitCost: "unitCost";
    readonly createdAt: "createdAt";
};
export type StockLedgerScalarFieldEnum = (typeof StockLedgerScalarFieldEnum)[keyof typeof StockLedgerScalarFieldEnum];
export declare const GoodsReceiptNoteScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly receiptDate: "receiptDate";
    readonly status: "status";
    readonly supplierId: "supplierId";
    readonly purchaseOrderId: "purchaseOrderId";
    readonly purchaseInvoiceId: "purchaseInvoiceId";
    readonly warehouseId: "warehouseId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type GoodsReceiptNoteScalarFieldEnum = (typeof GoodsReceiptNoteScalarFieldEnum)[keyof typeof GoodsReceiptNoteScalarFieldEnum];
export declare const GoodsReceiptItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly grnId: "grnId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly warehouseId: "warehouseId";
    readonly binLocationId: "binLocationId";
    readonly batchCode: "batchCode";
    readonly serialNo: "serialNo";
};
export type GoodsReceiptItemScalarFieldEnum = (typeof GoodsReceiptItemScalarFieldEnum)[keyof typeof GoodsReceiptItemScalarFieldEnum];
export declare const StockTransferScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly transferDate: "transferDate";
    readonly status: "status";
    readonly fromWarehouseId: "fromWarehouseId";
    readonly toWarehouseId: "toWarehouseId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type StockTransferScalarFieldEnum = (typeof StockTransferScalarFieldEnum)[keyof typeof StockTransferScalarFieldEnum];
export declare const StockTransferItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly transferId: "transferId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly fromBinLocationId: "fromBinLocationId";
    readonly toBinLocationId: "toBinLocationId";
    readonly batchCode: "batchCode";
    readonly serialNo: "serialNo";
};
export type StockTransferItemScalarFieldEnum = (typeof StockTransferItemScalarFieldEnum)[keyof typeof StockTransferItemScalarFieldEnum];
export declare const StockCountScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly countDate: "countDate";
    readonly status: "status";
    readonly warehouseId: "warehouseId";
    readonly notes: "notes";
    readonly workflowDefinitionId: "workflowDefinitionId";
    readonly currentStepNo: "currentStepNo";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type StockCountScalarFieldEnum = (typeof StockCountScalarFieldEnum)[keyof typeof StockCountScalarFieldEnum];
export declare const StockCountItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly stockCountId: "stockCountId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly systemQty: "systemQty";
    readonly countedQty: "countedQty";
    readonly varianceQty: "varianceQty";
    readonly uomCode: "uomCode";
    readonly binLocationId: "binLocationId";
    readonly batchCode: "batchCode";
    readonly serialNo: "serialNo";
};
export type StockCountItemScalarFieldEnum = (typeof StockCountItemScalarFieldEnum)[keyof typeof StockCountItemScalarFieldEnum];
export declare const GoodsIssueNoteScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly issueDate: "issueDate";
    readonly status: "status";
    readonly warehouseId: "warehouseId";
    readonly referenceType: "referenceType";
    readonly referenceId: "referenceId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type GoodsIssueNoteScalarFieldEnum = (typeof GoodsIssueNoteScalarFieldEnum)[keyof typeof GoodsIssueNoteScalarFieldEnum];
export declare const GoodsIssueItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly issueId: "issueId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly warehouseId: "warehouseId";
    readonly binLocationId: "binLocationId";
    readonly batchCode: "batchCode";
    readonly serialNo: "serialNo";
};
export type GoodsIssueItemScalarFieldEnum = (typeof GoodsIssueItemScalarFieldEnum)[keyof typeof GoodsIssueItemScalarFieldEnum];
export declare const PutawayScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly putawayDate: "putawayDate";
    readonly status: "status";
    readonly warehouseId: "warehouseId";
    readonly grnId: "grnId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PutawayScalarFieldEnum = (typeof PutawayScalarFieldEnum)[keyof typeof PutawayScalarFieldEnum];
export declare const PutawayItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly putawayId: "putawayId";
    readonly lineNo: "lineNo";
    readonly grnItemId: "grnItemId";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly fromBinLocationId: "fromBinLocationId";
    readonly toBinLocationId: "toBinLocationId";
    readonly batchCode: "batchCode";
    readonly serialNo: "serialNo";
};
export type PutawayItemScalarFieldEnum = (typeof PutawayItemScalarFieldEnum)[keyof typeof PutawayItemScalarFieldEnum];
export declare const PickingScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly pickingDate: "pickingDate";
    readonly status: "status";
    readonly warehouseId: "warehouseId";
    readonly salesOrderId: "salesOrderId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PickingScalarFieldEnum = (typeof PickingScalarFieldEnum)[keyof typeof PickingScalarFieldEnum];
export declare const PickingItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly pickingId: "pickingId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly fromBinLocationId: "fromBinLocationId";
    readonly pickedQty: "pickedQty";
    readonly batchCode: "batchCode";
    readonly serialNo: "serialNo";
};
export type PickingItemScalarFieldEnum = (typeof PickingItemScalarFieldEnum)[keyof typeof PickingItemScalarFieldEnum];
export declare const PackingScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly packingDate: "packingDate";
    readonly status: "status";
    readonly warehouseId: "warehouseId";
    readonly salesOrderId: "salesOrderId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PackingScalarFieldEnum = (typeof PackingScalarFieldEnum)[keyof typeof PackingScalarFieldEnum];
export declare const PackingItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly packingId: "packingId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly boxNo: "boxNo";
    readonly weight: "weight";
    readonly length: "length";
    readonly width: "width";
    readonly height: "height";
    readonly trackingId: "trackingId";
};
export type PackingItemScalarFieldEnum = (typeof PackingItemScalarFieldEnum)[keyof typeof PackingItemScalarFieldEnum];
export declare const QcInspectionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly grnId: "grnId";
    readonly productionId: "productionId";
    readonly inspectionDate: "inspectionDate";
    readonly status: "status";
    readonly inspectorName: "inspectorName";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type QcInspectionScalarFieldEnum = (typeof QcInspectionScalarFieldEnum)[keyof typeof QcInspectionScalarFieldEnum];
export declare const QcInspectionItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly qcInspectionId: "qcInspectionId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly sampleQty: "sampleQty";
    readonly passedQty: "passedQty";
    readonly failedQty: "failedQty";
    readonly defectReason: "defectReason";
};
export type QcInspectionItemScalarFieldEnum = (typeof QcInspectionItemScalarFieldEnum)[keyof typeof QcInspectionItemScalarFieldEnum];
export declare const ItemBatchScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly itemId: "itemId";
    readonly code: "code";
    readonly expiryDate: "expiryDate";
    readonly createdAt: "createdAt";
};
export type ItemBatchScalarFieldEnum = (typeof ItemBatchScalarFieldEnum)[keyof typeof ItemBatchScalarFieldEnum];
export declare const ItemSerialScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly itemId: "itemId";
    readonly serialNo: "serialNo";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type ItemSerialScalarFieldEnum = (typeof ItemSerialScalarFieldEnum)[keyof typeof ItemSerialScalarFieldEnum];
export declare const ValuationLayerScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly itemId: "itemId";
    readonly postingDate: "postingDate";
    readonly qty: "qty";
    readonly unitCost: "unitCost";
    readonly refType: "refType";
    readonly refId: "refId";
    readonly createdAt: "createdAt";
};
export type ValuationLayerScalarFieldEnum = (typeof ValuationLayerScalarFieldEnum)[keyof typeof ValuationLayerScalarFieldEnum];
export declare const OpportunityScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly stage: "stage";
    readonly expectedValue: "expectedValue";
    readonly closeDate: "closeDate";
    readonly leadId: "leadId";
    readonly customerId: "customerId";
    readonly ownerUserId: "ownerUserId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OpportunityScalarFieldEnum = (typeof OpportunityScalarFieldEnum)[keyof typeof OpportunityScalarFieldEnum];
export declare const SalesActivityScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly type: "type";
    readonly subject: "subject";
    readonly dueAt: "dueAt";
    readonly status: "status";
    readonly leadId: "leadId";
    readonly customerId: "customerId";
    readonly opportunityId: "opportunityId";
    readonly assignedToId: "assignedToId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SalesActivityScalarFieldEnum = (typeof SalesActivityScalarFieldEnum)[keyof typeof SalesActivityScalarFieldEnum];
export declare const MarketingCampaignScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly channel: "channel";
    readonly status: "status";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly budget: "budget";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MarketingCampaignScalarFieldEnum = (typeof MarketingCampaignScalarFieldEnum)[keyof typeof MarketingCampaignScalarFieldEnum];
export declare const ServiceTicketScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly customerId: "customerId";
    readonly subject: "subject";
    readonly priority: "priority";
    readonly status: "status";
    readonly assignedToId: "assignedToId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ServiceTicketScalarFieldEnum = (typeof ServiceTicketScalarFieldEnum)[keyof typeof ServiceTicketScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly name: "name";
    readonly createdAt: "createdAt";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const PermissionScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum];
export declare const UserRoleScalarFieldEnum: {
    readonly userId: "userId";
    readonly roleId: "roleId";
};
export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum];
export declare const RolePermissionScalarFieldEnum: {
    readonly roleId: "roleId";
    readonly permissionId: "permissionId";
};
export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly actorUserId: "actorUserId";
    readonly action: "action";
    readonly entity: "entity";
    readonly entityId: "entityId";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const NotificationTemplateScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly key: "key";
    readonly name: "name";
    readonly module: "module";
    readonly eventKey: "eventKey";
    readonly channel: "channel";
    readonly subject: "subject";
    readonly body: "body";
    readonly variables: "variables";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationTemplateScalarFieldEnum = (typeof NotificationTemplateScalarFieldEnum)[keyof typeof NotificationTemplateScalarFieldEnum];
export declare const NotificationChannelConfigScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly channel: "channel";
    readonly provider: "provider";
    readonly isEnabled: "isEnabled";
    readonly config: "config";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationChannelConfigScalarFieldEnum = (typeof NotificationChannelConfigScalarFieldEnum)[keyof typeof NotificationChannelConfigScalarFieldEnum];
export declare const NotificationPreferenceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly userId: "userId";
    readonly eventKey: "eventKey";
    readonly emailEnabled: "emailEnabled";
    readonly whatsappEnabled: "whatsappEnabled";
    readonly smsEnabled: "smsEnabled";
    readonly inAppEnabled: "inAppEnabled";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationPreferenceScalarFieldEnum = (typeof NotificationPreferenceScalarFieldEnum)[keyof typeof NotificationPreferenceScalarFieldEnum];
export declare const NotificationLogScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly recipientUserId: "recipientUserId";
    readonly templateId: "templateId";
    readonly channel: "channel";
    readonly eventKey: "eventKey";
    readonly title: "title";
    readonly message: "message";
    readonly payload: "payload";
    readonly status: "status";
    readonly externalId: "externalId";
    readonly errorMessage: "errorMessage";
    readonly sentAt: "sentAt";
    readonly readAt: "readAt";
    readonly createdAt: "createdAt";
};
export type NotificationLogScalarFieldEnum = (typeof NotificationLogScalarFieldEnum)[keyof typeof NotificationLogScalarFieldEnum];
export declare const NotificationScheduleScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly createdById: "createdById";
    readonly eventKey: "eventKey";
    readonly channel: "channel";
    readonly targetUserId: "targetUserId";
    readonly title: "title";
    readonly message: "message";
    readonly payload: "payload";
    readonly scheduledFor: "scheduledFor";
    readonly processedAt: "processedAt";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationScheduleScalarFieldEnum = (typeof NotificationScheduleScalarFieldEnum)[keyof typeof NotificationScheduleScalarFieldEnum];
export declare const CompanyProfileScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly legalName: "legalName";
    readonly tradeName: "tradeName";
    readonly npwp: "npwp";
    readonly email: "email";
    readonly phone: "phone";
    readonly address1: "address1";
    readonly address2: "address2";
    readonly city: "city";
    readonly province: "province";
    readonly postalCode: "postalCode";
    readonly countryCode: "countryCode";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CompanyProfileScalarFieldEnum = (typeof CompanyProfileScalarFieldEnum)[keyof typeof CompanyProfileScalarFieldEnum];
export declare const BranchScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly phone: "phone";
    readonly email: "email";
    readonly address1: "address1";
    readonly address2: "address2";
    readonly city: "city";
    readonly province: "province";
    readonly postalCode: "postalCode";
    readonly countryCode: "countryCode";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BranchScalarFieldEnum = (typeof BranchScalarFieldEnum)[keyof typeof BranchScalarFieldEnum];
export declare const CurrencyScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly symbol: "symbol";
    readonly isBase: "isBase";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CurrencyScalarFieldEnum = (typeof CurrencyScalarFieldEnum)[keyof typeof CurrencyScalarFieldEnum];
export declare const ExchangeRateScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly baseCurrencyId: "baseCurrencyId";
    readonly quoteCurrencyId: "quoteCurrencyId";
    readonly rate: "rate";
    readonly rateDate: "rateDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ExchangeRateScalarFieldEnum = (typeof ExchangeRateScalarFieldEnum)[keyof typeof ExchangeRateScalarFieldEnum];
export declare const UomScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UomScalarFieldEnum = (typeof UomScalarFieldEnum)[keyof typeof UomScalarFieldEnum];
export declare const UomConversionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly fromUomId: "fromUomId";
    readonly toUomId: "toUomId";
    readonly factor: "factor";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UomConversionScalarFieldEnum = (typeof UomConversionScalarFieldEnum)[keyof typeof UomConversionScalarFieldEnum];
export declare const FiscalYearScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isActive: "isActive";
    readonly isClosed: "isClosed";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FiscalYearScalarFieldEnum = (typeof FiscalYearScalarFieldEnum)[keyof typeof FiscalYearScalarFieldEnum];
export declare const AccountingPeriodScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly fiscalYearId: "fiscalYearId";
    readonly periodNo: "periodNo";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isOpen: "isOpen";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountingPeriodScalarFieldEnum = (typeof AccountingPeriodScalarFieldEnum)[keyof typeof AccountingPeriodScalarFieldEnum];
export declare const CoaAccountScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly type: "type";
    readonly parentId: "parentId";
    readonly isPosting: "isPosting";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CoaAccountScalarFieldEnum = (typeof CoaAccountScalarFieldEnum)[keyof typeof CoaAccountScalarFieldEnum];
export declare const CostCenterScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CostCenterScalarFieldEnum = (typeof CostCenterScalarFieldEnum)[keyof typeof CostCenterScalarFieldEnum];
export declare const ProfitCenterScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProfitCenterScalarFieldEnum = (typeof ProfitCenterScalarFieldEnum)[keyof typeof ProfitCenterScalarFieldEnum];
export declare const JournalEntryScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly entryNo: "entryNo";
    readonly entryDate: "entryDate";
    readonly description: "description";
    readonly referenceNo: "referenceNo";
    readonly journalType: "journalType";
    readonly status: "status";
    readonly accountingPeriodId: "accountingPeriodId";
    readonly totalDebit: "totalDebit";
    readonly totalCredit: "totalCredit";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type JournalEntryScalarFieldEnum = (typeof JournalEntryScalarFieldEnum)[keyof typeof JournalEntryScalarFieldEnum];
export declare const JournalEntryLineScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly journalEntryId: "journalEntryId";
    readonly lineNo: "lineNo";
    readonly accountCode: "accountCode";
    readonly description: "description";
    readonly debit: "debit";
    readonly credit: "credit";
    readonly referenceType: "referenceType";
    readonly referenceId: "referenceId";
    readonly costCenterId: "costCenterId";
    readonly profitCenterId: "profitCenterId";
};
export type JournalEntryLineScalarFieldEnum = (typeof JournalEntryLineScalarFieldEnum)[keyof typeof JournalEntryLineScalarFieldEnum];
export declare const SupplierInvoiceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly invoiceNo: "invoiceNo";
    readonly supplierCode: "supplierCode";
    readonly invoiceDate: "invoiceDate";
    readonly dueDate: "dueDate";
    readonly status: "status";
    readonly description: "description";
    readonly totalAmount: "totalAmount";
    readonly taxAmount: "taxAmount";
    readonly paidAmount: "paidAmount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SupplierInvoiceScalarFieldEnum = (typeof SupplierInvoiceScalarFieldEnum)[keyof typeof SupplierInvoiceScalarFieldEnum];
export declare const SupplierInvoiceLineScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly invoiceId: "invoiceId";
    readonly lineNo: "lineNo";
    readonly description: "description";
    readonly qty: "qty";
    readonly unitPrice: "unitPrice";
    readonly taxCode: "taxCode";
    readonly amount: "amount";
};
export type SupplierInvoiceLineScalarFieldEnum = (typeof SupplierInvoiceLineScalarFieldEnum)[keyof typeof SupplierInvoiceLineScalarFieldEnum];
export declare const SupplierInvoicePaymentScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly invoiceId: "invoiceId";
    readonly paymentDate: "paymentDate";
    readonly amount: "amount";
    readonly reference: "reference";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type SupplierInvoicePaymentScalarFieldEnum = (typeof SupplierInvoicePaymentScalarFieldEnum)[keyof typeof SupplierInvoicePaymentScalarFieldEnum];
export declare const CustomerInvoiceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly invoiceNo: "invoiceNo";
    readonly customerCode: "customerCode";
    readonly invoiceDate: "invoiceDate";
    readonly dueDate: "dueDate";
    readonly status: "status";
    readonly description: "description";
    readonly totalAmount: "totalAmount";
    readonly taxAmount: "taxAmount";
    readonly paidAmount: "paidAmount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CustomerInvoiceScalarFieldEnum = (typeof CustomerInvoiceScalarFieldEnum)[keyof typeof CustomerInvoiceScalarFieldEnum];
export declare const CustomerInvoiceLineScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly invoiceId: "invoiceId";
    readonly lineNo: "lineNo";
    readonly description: "description";
    readonly qty: "qty";
    readonly unitPrice: "unitPrice";
    readonly taxCode: "taxCode";
    readonly amount: "amount";
};
export type CustomerInvoiceLineScalarFieldEnum = (typeof CustomerInvoiceLineScalarFieldEnum)[keyof typeof CustomerInvoiceLineScalarFieldEnum];
export declare const CustomerInvoicePaymentScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly invoiceId: "invoiceId";
    readonly paymentDate: "paymentDate";
    readonly amount: "amount";
    readonly reference: "reference";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type CustomerInvoicePaymentScalarFieldEnum = (typeof CustomerInvoicePaymentScalarFieldEnum)[keyof typeof CustomerInvoicePaymentScalarFieldEnum];
export declare const FixedAssetScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly assetNo: "assetNo";
    readonly name: "name";
    readonly category: "category";
    readonly purchaseDate: "purchaseDate";
    readonly purchaseCost: "purchaseCost";
    readonly usefulLife: "usefulLife";
    readonly salvageValue: "salvageValue";
    readonly depreciationMethod: "depreciationMethod";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FixedAssetScalarFieldEnum = (typeof FixedAssetScalarFieldEnum)[keyof typeof FixedAssetScalarFieldEnum];
export declare const FixedAssetDepreciationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly assetId: "assetId";
    readonly periodDate: "periodDate";
    readonly depreciationAmount: "depreciationAmount";
    readonly accumulatedAmount: "accumulatedAmount";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type FixedAssetDepreciationScalarFieldEnum = (typeof FixedAssetDepreciationScalarFieldEnum)[keyof typeof FixedAssetDepreciationScalarFieldEnum];
export declare const BankAccountScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly accountNo: "accountNo";
    readonly name: "name";
    readonly bankName: "bankName";
    readonly accountType: "accountType";
    readonly balance: "balance";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BankAccountScalarFieldEnum = (typeof BankAccountScalarFieldEnum)[keyof typeof BankAccountScalarFieldEnum];
export declare const BankTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly bankAccountId: "bankAccountId";
    readonly transDate: "transDate";
    readonly transType: "transType";
    readonly description: "description";
    readonly amount: "amount";
    readonly reference: "reference";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type BankTransactionScalarFieldEnum = (typeof BankTransactionScalarFieldEnum)[keyof typeof BankTransactionScalarFieldEnum];
export declare const CashAccountScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly accountNo: "accountNo";
    readonly name: "name";
    readonly accountType: "accountType";
    readonly balance: "balance";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CashAccountScalarFieldEnum = (typeof CashAccountScalarFieldEnum)[keyof typeof CashAccountScalarFieldEnum];
export declare const CashTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly cashAccountId: "cashAccountId";
    readonly transDate: "transDate";
    readonly transType: "transType";
    readonly description: "description";
    readonly amount: "amount";
    readonly reference: "reference";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type CashTransactionScalarFieldEnum = (typeof CashTransactionScalarFieldEnum)[keyof typeof CashTransactionScalarFieldEnum];
export declare const TaxCodeScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly rate: "rate";
    readonly effectiveDate: "effectiveDate";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TaxCodeScalarFieldEnum = (typeof TaxCodeScalarFieldEnum)[keyof typeof TaxCodeScalarFieldEnum];
export declare const CostCenterAllocationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly periodId: "periodId";
    readonly costCenterId: "costCenterId";
    readonly accountCode: "accountCode";
    readonly allocatedAmount: "allocatedAmount";
    readonly referenceNo: "referenceNo";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type CostCenterAllocationScalarFieldEnum = (typeof CostCenterAllocationScalarFieldEnum)[keyof typeof CostCenterAllocationScalarFieldEnum];
export declare const InterCompanyTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly transNo: "transNo";
    readonly transDate: "transDate";
    readonly fromCompanyId: "fromCompanyId";
    readonly toCompanyId: "toCompanyId";
    readonly description: "description";
    readonly referenceNo: "referenceNo";
    readonly transactionType: "transactionType";
    readonly amount: "amount";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type InterCompanyTransactionScalarFieldEnum = (typeof InterCompanyTransactionScalarFieldEnum)[keyof typeof InterCompanyTransactionScalarFieldEnum];
export declare const BankReconciliationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly bankAccountId: "bankAccountId";
    readonly reconcileDate: "reconcileDate";
    readonly statementDate: "statementDate";
    readonly statementBalance: "statementBalance";
    readonly bookBalance: "bookBalance";
    readonly difference: "difference";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type BankReconciliationScalarFieldEnum = (typeof BankReconciliationScalarFieldEnum)[keyof typeof BankReconciliationScalarFieldEnum];
export declare const PettyCashReplenishmentScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly cashAccountId: "cashAccountId";
    readonly requestNo: "requestNo";
    readonly requestDate: "requestDate";
    readonly referenceNo: "referenceNo";
    readonly amount: "amount";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type PettyCashReplenishmentScalarFieldEnum = (typeof PettyCashReplenishmentScalarFieldEnum)[keyof typeof PettyCashReplenishmentScalarFieldEnum];
export declare const CustomerReceiptScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly receiptNo: "receiptNo";
    readonly receiptDate: "receiptDate";
    readonly customerCode: "customerCode";
    readonly amount: "amount";
    readonly paymentMethod: "paymentMethod";
    readonly reference: "reference";
    readonly notes: "notes";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type CustomerReceiptScalarFieldEnum = (typeof CustomerReceiptScalarFieldEnum)[keyof typeof CustomerReceiptScalarFieldEnum];
export declare const VendorPaymentScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly paymentNo: "paymentNo";
    readonly paymentDate: "paymentDate";
    readonly supplierCode: "supplierCode";
    readonly amount: "amount";
    readonly paymentMethod: "paymentMethod";
    readonly reference: "reference";
    readonly notes: "notes";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type VendorPaymentScalarFieldEnum = (typeof VendorPaymentScalarFieldEnum)[keyof typeof VendorPaymentScalarFieldEnum];
export declare const PaymentRequestScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly requestNo: "requestNo";
    readonly requestDate: "requestDate";
    readonly requesterId: "requesterId";
    readonly description: "description";
    readonly amount: "amount";
    readonly status: "status";
    readonly approvalStatus: "approvalStatus";
    readonly createdAt: "createdAt";
};
export type PaymentRequestScalarFieldEnum = (typeof PaymentRequestScalarFieldEnum)[keyof typeof PaymentRequestScalarFieldEnum];
export declare const AssetDisposalScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly assetId: "assetId";
    readonly disposalDate: "disposalDate";
    readonly disposalNo: "disposalNo";
    readonly saleValue: "saleValue";
    readonly lossGain: "lossGain";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type AssetDisposalScalarFieldEnum = (typeof AssetDisposalScalarFieldEnum)[keyof typeof AssetDisposalScalarFieldEnum];
export declare const BudgetScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly budgetNo: "budgetNo";
    readonly fiscalYear: "fiscalYear";
    readonly periodNo: "periodNo";
    readonly accountCode: "accountCode";
    readonly costCenterId: "costCenterId";
    readonly amount: "amount";
    readonly spentAmount: "spentAmount";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type BudgetScalarFieldEnum = (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum];
export declare const WorkflowDefinitionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly name: "name";
    readonly moduleKey: "moduleKey";
    readonly docType: "docType";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkflowDefinitionScalarFieldEnum = (typeof WorkflowDefinitionScalarFieldEnum)[keyof typeof WorkflowDefinitionScalarFieldEnum];
export declare const WorkflowStepScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly definitionId: "definitionId";
    readonly stepNo: "stepNo";
    readonly roleId: "roleId";
    readonly name: "name";
    readonly slaHours: "slaHours";
    readonly conditionType: "conditionType";
    readonly conditionValue: "conditionValue";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkflowStepScalarFieldEnum = (typeof WorkflowStepScalarFieldEnum)[keyof typeof WorkflowStepScalarFieldEnum];
export declare const WorkflowRuleScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly stepId: "stepId";
    readonly ruleType: "ruleType";
    readonly ruleKey: "ruleKey";
    readonly ruleOperator: "ruleOperator";
    readonly ruleValue: "ruleValue";
    readonly createdAt: "createdAt";
};
export type WorkflowRuleScalarFieldEnum = (typeof WorkflowRuleScalarFieldEnum)[keyof typeof WorkflowRuleScalarFieldEnum];
export declare const WorkflowInstanceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly definitionId: "definitionId";
    readonly stepId: "stepId";
    readonly docType: "docType";
    readonly docId: "docId";
    readonly currentStepNo: "currentStepNo";
    readonly status: "status";
    readonly assignedToUserId: "assignedToUserId";
    readonly slaDueAt: "slaDueAt";
    readonly escalatedAt: "escalatedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkflowInstanceScalarFieldEnum = (typeof WorkflowInstanceScalarFieldEnum)[keyof typeof WorkflowInstanceScalarFieldEnum];
export declare const ApprovalHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly instanceId: "instanceId";
    readonly userId: "userId";
    readonly action: "action";
    readonly comment: "comment";
    readonly fromUserId: "fromUserId";
    readonly toUserId: "toUserId";
    readonly createdAt: "createdAt";
};
export type ApprovalHistoryScalarFieldEnum = (typeof ApprovalHistoryScalarFieldEnum)[keyof typeof ApprovalHistoryScalarFieldEnum];
export declare const DelegationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly fromUserId: "fromUserId";
    readonly toUserId: "toUserId";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isActive: "isActive";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type DelegationScalarFieldEnum = (typeof DelegationScalarFieldEnum)[keyof typeof DelegationScalarFieldEnum];
export declare const BillOfMaterialsScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly itemId: "itemId";
    readonly version: "version";
    readonly isActive: "isActive";
    readonly isMain: "isMain";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BillOfMaterialsScalarFieldEnum = (typeof BillOfMaterialsScalarFieldEnum)[keyof typeof BillOfMaterialsScalarFieldEnum];
export declare const BillOfMaterialsItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly bomId: "bomId";
    readonly lineNo: "lineNo";
    readonly componentItemId: "componentItemId";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
    readonly scrapPercent: "scrapPercent";
    readonly notes: "notes";
};
export type BillOfMaterialsItemScalarFieldEnum = (typeof BillOfMaterialsItemScalarFieldEnum)[keyof typeof BillOfMaterialsItemScalarFieldEnum];
export declare const WorkOrderScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly bomId: "bomId";
    readonly finishedGoodItemId: "finishedGoodItemId";
    readonly warehouseId: "warehouseId";
    readonly qtyPlanned: "qtyPlanned";
    readonly qtyProduced: "qtyProduced";
    readonly uomCode: "uomCode";
    readonly status: "status";
    readonly plannedStartDate: "plannedStartDate";
    readonly plannedEndDate: "plannedEndDate";
    readonly actualStartDate: "actualStartDate";
    readonly actualEndDate: "actualEndDate";
    readonly notes: "notes";
    readonly workflowDefinitionId: "workflowDefinitionId";
    readonly currentStepNo: "currentStepNo";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkOrderScalarFieldEnum = (typeof WorkOrderScalarFieldEnum)[keyof typeof WorkOrderScalarFieldEnum];
export declare const WorkOrderComponentScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly workOrderId: "workOrderId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly qtyRequired: "qtyRequired";
    readonly qtyIssued: "qtyIssued";
    readonly uomCode: "uomCode";
};
export type WorkOrderComponentScalarFieldEnum = (typeof WorkOrderComponentScalarFieldEnum)[keyof typeof WorkOrderComponentScalarFieldEnum];
export declare const WorkOrderOperationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly workOrderId: "workOrderId";
    readonly lineNo: "lineNo";
    readonly operationNo: "operationNo";
    readonly description: "description";
    readonly workstation: "workstation";
    readonly qtyCompleted: "qtyCompleted";
    readonly laborHours: "laborHours";
    readonly status: "status";
};
export type WorkOrderOperationScalarFieldEnum = (typeof WorkOrderOperationScalarFieldEnum)[keyof typeof WorkOrderOperationScalarFieldEnum];
export declare const ProductionIssueScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly workOrderId: "workOrderId";
    readonly issueDate: "issueDate";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type ProductionIssueScalarFieldEnum = (typeof ProductionIssueScalarFieldEnum)[keyof typeof ProductionIssueScalarFieldEnum];
export declare const ProductionIssueItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly issueId: "issueId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly qty: "qty";
    readonly uomCode: "uomCode";
};
export type ProductionIssueItemScalarFieldEnum = (typeof ProductionIssueItemScalarFieldEnum)[keyof typeof ProductionIssueItemScalarFieldEnum];
export declare const ProductionReceiptScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly workOrderId: "workOrderId";
    readonly receiptDate: "receiptDate";
    readonly qtyProduced: "qtyProduced";
    readonly uomCode: "uomCode";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type ProductionReceiptScalarFieldEnum = (typeof ProductionReceiptScalarFieldEnum)[keyof typeof ProductionReceiptScalarFieldEnum];
export declare const InProcessQcScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly workOrderId: "workOrderId";
    readonly status: "status";
    readonly qtyInspected: "qtyInspected";
    readonly qtyPassed: "qtyPassed";
    readonly qtyFailed: "qtyFailed";
    readonly notes: "notes";
    readonly inspectedAt: "inspectedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InProcessQcScalarFieldEnum = (typeof InProcessQcScalarFieldEnum)[keyof typeof InProcessQcScalarFieldEnum];
export declare const EquipmentScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly type: "type";
    readonly status: "status";
    readonly location: "location";
    readonly installedDate: "installedDate";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EquipmentScalarFieldEnum = (typeof EquipmentScalarFieldEnum)[keyof typeof EquipmentScalarFieldEnum];
export declare const MaintenanceScheduleScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly equipmentId: "equipmentId";
    readonly name: "name";
    readonly frequency: "frequency";
    readonly intervalDays: "intervalDays";
    readonly lastDate: "lastDate";
    readonly nextDate: "nextDate";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MaintenanceScheduleScalarFieldEnum = (typeof MaintenanceScheduleScalarFieldEnum)[keyof typeof MaintenanceScheduleScalarFieldEnum];
export declare const MaintenanceRequestScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly equipmentId: "equipmentId";
    readonly requestDate: "requestDate";
    readonly problem: "problem";
    readonly priority: "priority";
    readonly status: "status";
    readonly assignedTo: "assignedTo";
    readonly resolvedDate: "resolvedDate";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MaintenanceRequestScalarFieldEnum = (typeof MaintenanceRequestScalarFieldEnum)[keyof typeof MaintenanceRequestScalarFieldEnum];
export declare const MrpRunScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly runDate: "runDate";
    readonly status: "status";
    readonly demandSource: "demandSource";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type MrpRunScalarFieldEnum = (typeof MrpRunScalarFieldEnum)[keyof typeof MrpRunScalarFieldEnum];
export declare const MrpSuggestionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly mrpRunId: "mrpRunId";
    readonly itemId: "itemId";
    readonly suggestionType: "suggestionType";
    readonly qtyRequired: "qtyRequired";
    readonly qtyOnHand: "qtyOnHand";
    readonly qtyOnOrder: "qtyOnOrder";
    readonly qtySuggested: "qtySuggested";
    readonly dueDate: "dueDate";
    readonly sourceDocType: "sourceDocType";
    readonly sourceDocId: "sourceDocId";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type MrpSuggestionScalarFieldEnum = (typeof MrpSuggestionScalarFieldEnum)[keyof typeof MrpSuggestionScalarFieldEnum];
export declare const ProductionCostScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly workOrderId: "workOrderId";
    readonly period: "period";
    readonly materialCost: "materialCost";
    readonly laborCost: "laborCost";
    readonly overheadCost: "overheadCost";
    readonly totalCost: "totalCost";
    readonly calculatedAt: "calculatedAt";
};
export type ProductionCostScalarFieldEnum = (typeof ProductionCostScalarFieldEnum)[keyof typeof ProductionCostScalarFieldEnum];
export declare const TaxInvoiceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly invoiceNo: "invoiceNo";
    readonly invoiceDate: "invoiceDate";
    readonly customerId: "customerId";
    readonly supplierId: "supplierId";
    readonly baseAmount: "baseAmount";
    readonly taxAmount: "taxAmount";
    readonly invoiceType: "invoiceType";
    readonly status: "status";
    readonly fpDate: "fpDate";
    readonly fpNumber: "fpNumber";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TaxInvoiceScalarFieldEnum = (typeof TaxInvoiceScalarFieldEnum)[keyof typeof TaxInvoiceScalarFieldEnum];
export declare const NsfpRangeScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly startNo: "startNo";
    readonly endNo: "endNo";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isUsed: "isUsed";
    readonly lastUsedNo: "lastUsedNo";
    readonly createdAt: "createdAt";
};
export type NsfpRangeScalarFieldEnum = (typeof NsfpRangeScalarFieldEnum)[keyof typeof NsfpRangeScalarFieldEnum];
export declare const PphWithholdingScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly transNo: "transNo";
    readonly transDate: "transDate";
    readonly incomeType: "incomeType";
    readonly taxpayerName: "taxpayerName";
    readonly npwp: "npwp";
    readonly nik: "nik";
    readonly grossAmount: "grossAmount";
    readonly rate: "rate";
    readonly taxAmount: "taxAmount";
    readonly status: "status";
    readonly bupotNo: "bupotNo";
    readonly bupotDate: "bupotDate";
    readonly createdAt: "createdAt";
};
export type PphWithholdingScalarFieldEnum = (typeof PphWithholdingScalarFieldEnum)[keyof typeof PphWithholdingScalarFieldEnum];
export declare const TaxEqualizationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly period: "period";
    readonly bookIncome: "bookIncome";
    readonly fiscalIncome: "fiscalIncome";
    readonly difference: "difference";
    readonly description: "description";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type TaxEqualizationScalarFieldEnum = (typeof TaxEqualizationScalarFieldEnum)[keyof typeof TaxEqualizationScalarFieldEnum];
export declare const IdBillingScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly billingNo: "billingNo";
    readonly taxType: "taxType";
    readonly period: "period";
    readonly amount: "amount";
    readonly dueDate: "dueDate";
    readonly status: "status";
    readonly paidDate: "paidDate";
    readonly createdAt: "createdAt";
};
export type IdBillingScalarFieldEnum = (typeof IdBillingScalarFieldEnum)[keyof typeof IdBillingScalarFieldEnum];
export declare const EmployeeScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly employeeNo: "employeeNo";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly email: "email";
    readonly phone: "phone";
    readonly department: "department";
    readonly position: "position";
    readonly hireDate: "hireDate";
    readonly status: "status";
    readonly salary: "salary";
    readonly managerId: "managerId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum];
export declare const OrganizationUnitScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly name: "name";
    readonly code: "code";
    readonly parentId: "parentId";
    readonly managerId: "managerId";
    readonly type: "type";
    readonly createdAt: "createdAt";
};
export type OrganizationUnitScalarFieldEnum = (typeof OrganizationUnitScalarFieldEnum)[keyof typeof OrganizationUnitScalarFieldEnum];
export declare const AttendanceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly employeeId: "employeeId";
    readonly date: "date";
    readonly checkIn: "checkIn";
    readonly checkOut: "checkOut";
    readonly workHours: "workHours";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum];
export declare const ShiftScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly name: "name";
    readonly code: "code";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly isFlexi: "isFlexi";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type ShiftScalarFieldEnum = (typeof ShiftScalarFieldEnum)[keyof typeof ShiftScalarFieldEnum];
export declare const PayrollRunScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly employeeId: "employeeId";
    readonly period: "period";
    readonly basicSalary: "basicSalary";
    readonly allowances: "allowances";
    readonly deductions: "deductions";
    readonly grossPay: "grossPay";
    readonly netPay: "netPay";
    readonly taxAmount: "taxAmount";
    readonly status: "status";
    readonly payDate: "payDate";
    readonly createdAt: "createdAt";
};
export type PayrollRunScalarFieldEnum = (typeof PayrollRunScalarFieldEnum)[keyof typeof PayrollRunScalarFieldEnum];
export declare const ExpenseClaimScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly employeeId: "employeeId";
    readonly claimNo: "claimNo";
    readonly claimDate: "claimDate";
    readonly amount: "amount";
    readonly description: "description";
    readonly category: "category";
    readonly status: "status";
    readonly approvedBy: "approvedBy";
    readonly approvedAt: "approvedAt";
    readonly createdAt: "createdAt";
};
export type ExpenseClaimScalarFieldEnum = (typeof ExpenseClaimScalarFieldEnum)[keyof typeof ExpenseClaimScalarFieldEnum];
export declare const KpiEvaluationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly employeeId: "employeeId";
    readonly period: "period";
    readonly score: "score";
    readonly grade: "grade";
    readonly comments: "comments";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type KpiEvaluationScalarFieldEnum = (typeof KpiEvaluationScalarFieldEnum)[keyof typeof KpiEvaluationScalarFieldEnum];
export declare const RecruitmentCandidateScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly candidateNo: "candidateNo";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly email: "email";
    readonly phone: "phone";
    readonly position: "position";
    readonly status: "status";
    readonly appliedAt: "appliedAt";
    readonly createdAt: "createdAt";
};
export type RecruitmentCandidateScalarFieldEnum = (typeof RecruitmentCandidateScalarFieldEnum)[keyof typeof RecruitmentCandidateScalarFieldEnum];
export declare const FleetVehicleScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly plateNo: "plateNo";
    readonly vehicleType: "vehicleType";
    readonly brand: "brand";
    readonly model: "model";
    readonly year: "year";
    readonly ownershipType: "ownershipType";
    readonly capacityWeight: "capacityWeight";
    readonly capacityVolume: "capacityVolume";
    readonly status: "status";
    readonly transporterId: "transporterId";
    readonly stnkNo: "stnkNo";
    readonly stnkExpiry: "stnkExpiry";
    readonly kirNo: "kirNo";
    readonly kirExpiry: "kirExpiry";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FleetVehicleScalarFieldEnum = (typeof FleetVehicleScalarFieldEnum)[keyof typeof FleetVehicleScalarFieldEnum];
export declare const LogisticsDriverScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly employeeId: "employeeId";
    readonly licenseType: "licenseType";
    readonly licenseNo: "licenseNo";
    readonly licenseExpiry: "licenseExpiry";
    readonly phone: "phone";
    readonly email: "email";
    readonly address: "address";
    readonly status: "status";
    readonly transporterId: "transporterId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LogisticsDriverScalarFieldEnum = (typeof LogisticsDriverScalarFieldEnum)[keyof typeof LogisticsDriverScalarFieldEnum];
export declare const TransporterScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly supplierId: "supplierId";
    readonly contactName: "contactName";
    readonly phone: "phone";
    readonly email: "email";
    readonly address: "address";
    readonly isActive: "isActive";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TransporterScalarFieldEnum = (typeof TransporterScalarFieldEnum)[keyof typeof TransporterScalarFieldEnum];
export declare const RouteTemplateScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly warehouseId: "warehouseId";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RouteTemplateScalarFieldEnum = (typeof RouteTemplateScalarFieldEnum)[keyof typeof RouteTemplateScalarFieldEnum];
export declare const TripPlanScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly routeDate: "routeDate";
    readonly vehicleId: "vehicleId";
    readonly driverId: "driverId";
    readonly routeTemplateId: "routeTemplateId";
    readonly status: "status";
    readonly departureAt: "departureAt";
    readonly returnAt: "returnAt";
    readonly actualDepartureAt: "actualDepartureAt";
    readonly actualReturnAt: "actualReturnAt";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TripPlanScalarFieldEnum = (typeof TripPlanScalarFieldEnum)[keyof typeof TripPlanScalarFieldEnum];
export declare const TripCheckpointScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly tripPlanId: "tripPlanId";
    readonly checkpointType: "checkpointType";
    readonly locationName: "locationName";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly timestamp: "timestamp";
    readonly notes: "notes";
    readonly deliveryOrderId: "deliveryOrderId";
    readonly createdAt: "createdAt";
};
export type TripCheckpointScalarFieldEnum = (typeof TripCheckpointScalarFieldEnum)[keyof typeof TripCheckpointScalarFieldEnum];
export declare const DeliveryOrderScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly shipmentId: "shipmentId";
    readonly salesOrderId: "salesOrderId";
    readonly customerId: "customerId";
    readonly warehouseId: "warehouseId";
    readonly tripPlanId: "tripPlanId";
    readonly status: "status";
    readonly priority: "priority";
    readonly plannedShipDate: "plannedShipDate";
    readonly actualShipDate: "actualShipDate";
    readonly deliveryAddress1: "deliveryAddress1";
    readonly deliveryAddress2: "deliveryAddress2";
    readonly deliveryCity: "deliveryCity";
    readonly deliveryProvince: "deliveryProvince";
    readonly deliveryPostalCode: "deliveryPostalCode";
    readonly deliveryNotes: "deliveryNotes";
    readonly actualDeliveredAt: "actualDeliveredAt";
    readonly podToken: "podToken";
    readonly podTokenExpiry: "podTokenExpiry";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DeliveryOrderScalarFieldEnum = (typeof DeliveryOrderScalarFieldEnum)[keyof typeof DeliveryOrderScalarFieldEnum];
export declare const DeliveryOrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly deliveryOrderId: "deliveryOrderId";
    readonly lineNo: "lineNo";
    readonly itemId: "itemId";
    readonly description: "description";
    readonly orderedQty: "orderedQty";
    readonly pickedQty: "pickedQty";
    readonly packedQty: "packedQty";
    readonly shippedQty: "shippedQty";
    readonly deliveredQty: "deliveredQty";
    readonly uomCode: "uomCode";
    readonly unitPrice: "unitPrice";
    readonly batchNo: "batchNo";
    readonly serialNo: "serialNo";
};
export type DeliveryOrderItemScalarFieldEnum = (typeof DeliveryOrderItemScalarFieldEnum)[keyof typeof DeliveryOrderItemScalarFieldEnum];
export declare const ProofOfDeliveryScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly deliveryOrderId: "deliveryOrderId";
    readonly receivedBy: "receivedBy";
    readonly receivedAt: "receivedAt";
    readonly signatureFileId: "signatureFileId";
    readonly photoFileIds: "photoFileIds";
    readonly geoLat: "geoLat";
    readonly geoLng: "geoLng";
    readonly notes: "notes";
    readonly status: "status";
    readonly verifiedBy: "verifiedBy";
    readonly verifiedAt: "verifiedAt";
    readonly createdAt: "createdAt";
};
export type ProofOfDeliveryScalarFieldEnum = (typeof ProofOfDeliveryScalarFieldEnum)[keyof typeof ProofOfDeliveryScalarFieldEnum];
export declare const DeliveryExceptionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly deliveryOrderId: "deliveryOrderId";
    readonly tripPlanId: "tripPlanId";
    readonly reason: "reason";
    readonly description: "description";
    readonly reportedAt: "reportedAt";
    readonly reportedBy: "reportedBy";
    readonly resolved: "resolved";
    readonly resolvedAt: "resolvedAt";
    readonly resolutionNotes: "resolutionNotes";
    readonly createdAt: "createdAt";
};
export type DeliveryExceptionScalarFieldEnum = (typeof DeliveryExceptionScalarFieldEnum)[keyof typeof DeliveryExceptionScalarFieldEnum];
export declare const WavePickingScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly warehouseId: "warehouseId";
    readonly plannedDate: "plannedDate";
    readonly status: "status";
    readonly totalDoCount: "totalDoCount";
    readonly totalItemCount: "totalItemCount";
    readonly assignedTo: "assignedTo";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WavePickingScalarFieldEnum = (typeof WavePickingScalarFieldEnum)[keyof typeof WavePickingScalarFieldEnum];
export declare const StagingLoadScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly waveId: "waveId";
    readonly tripPlanId: "tripPlanId";
    readonly warehouseId: "warehouseId";
    readonly status: "status";
    readonly loadedAt: "loadedAt";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type StagingLoadScalarFieldEnum = (typeof StagingLoadScalarFieldEnum)[keyof typeof StagingLoadScalarFieldEnum];
export declare const PackingListScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly deliveryOrderId: "deliveryOrderId";
    readonly warehouseId: "warehouseId";
    readonly packingDate: "packingDate";
    readonly status: "status";
    readonly packedBy: "packedBy";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PackingListScalarFieldEnum = (typeof PackingListScalarFieldEnum)[keyof typeof PackingListScalarFieldEnum];
export declare const TripCostScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly tripPlanId: "tripPlanId";
    readonly costType: "costType";
    readonly description: "description";
    readonly amount: "amount";
    readonly currencyCode: "currencyCode";
    readonly supplierId: "supplierId";
    readonly paymentRequestId: "paymentRequestId";
    readonly status: "status";
    readonly submittedBy: "submittedBy";
    readonly submittedAt: "submittedAt";
    readonly approvedBy: "approvedBy";
    readonly approvedAt: "approvedAt";
    readonly postedToFinance: "postedToFinance";
    readonly journalEntryId: "journalEntryId";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TripCostScalarFieldEnum = (typeof TripCostScalarFieldEnum)[keyof typeof TripCostScalarFieldEnum];
export declare const TripLocationScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly tripPlanId: "tripPlanId";
    readonly vehicleId: "vehicleId";
    readonly lat: "lat";
    readonly lng: "lng";
    readonly speed: "speed";
    readonly heading: "heading";
    readonly accuracy: "accuracy";
    readonly timestamp: "timestamp";
};
export type TripLocationScalarFieldEnum = (typeof TripLocationScalarFieldEnum)[keyof typeof TripLocationScalarFieldEnum];
export declare const TripRouteTraceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly tripPlanId: "tripPlanId";
    readonly totalDistance: "totalDistance";
    readonly totalDuration: "totalDuration";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly status: "status";
};
export type TripRouteTraceScalarFieldEnum = (typeof TripRouteTraceScalarFieldEnum)[keyof typeof TripRouteTraceScalarFieldEnum];
export declare const VehicleMaintenanceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly vehicleId: "vehicleId";
    readonly maintenanceType: "maintenanceType";
    readonly description: "description";
    readonly kmInterval: "kmInterval";
    readonly dateInterval: "dateInterval";
    readonly lastServiceAt: "lastServiceAt";
    readonly nextServiceAt: "nextServiceAt";
    readonly cost: "cost";
    readonly vendorId: "vendorId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VehicleMaintenanceScalarFieldEnum = (typeof VehicleMaintenanceScalarFieldEnum)[keyof typeof VehicleMaintenanceScalarFieldEnum];
export declare const VehicleDocumentScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly vehicleId: "vehicleId";
    readonly documentType: "documentType";
    readonly documentNumber: "documentNumber";
    readonly issueDate: "issueDate";
    readonly expiryDate: "expiryDate";
    readonly fileId: "fileId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VehicleDocumentScalarFieldEnum = (typeof VehicleDocumentScalarFieldEnum)[keyof typeof VehicleDocumentScalarFieldEnum];
export declare const DriverScheduleScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly driverId: "driverId";
    readonly date: "date";
    readonly shiftType: "shiftType";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type DriverScheduleScalarFieldEnum = (typeof DriverScheduleScalarFieldEnum)[keyof typeof DriverScheduleScalarFieldEnum];
export declare const DriverAvailabilityScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly driverId: "driverId";
    readonly date: "date";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type DriverAvailabilityScalarFieldEnum = (typeof DriverAvailabilityScalarFieldEnum)[keyof typeof DriverAvailabilityScalarFieldEnum];
export declare const LogisticsPartnerScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly name: "name";
    readonly partnerType: "partnerType";
    readonly apiEndpoint: "apiEndpoint";
    readonly apiKey: "apiKey";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LogisticsPartnerScalarFieldEnum = (typeof LogisticsPartnerScalarFieldEnum)[keyof typeof LogisticsPartnerScalarFieldEnum];
export declare const PartnerRateScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly partnerId: "partnerId";
    readonly originZone: "originZone";
    readonly destZone: "destZone";
    readonly rateWeight: "rateWeight";
    readonly rateVolume: "rateVolume";
    readonly transitDays: "transitDays";
    readonly effectiveFrom: "effectiveFrom";
    readonly effectiveTo: "effectiveTo";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type PartnerRateScalarFieldEnum = (typeof PartnerRateScalarFieldEnum)[keyof typeof PartnerRateScalarFieldEnum];
export declare const PartnerShipmentScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly partnerId: "partnerId";
    readonly deliveryOrderId: "deliveryOrderId";
    readonly partnerTrackingNo: "partnerTrackingNo";
    readonly ourDeliveryOrderId: "ourDeliveryOrderId";
    readonly status: "status";
    readonly events: "events";
    readonly pickedUpAt: "pickedUpAt";
    readonly deliveredAt: "deliveredAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PartnerShipmentScalarFieldEnum = (typeof PartnerShipmentScalarFieldEnum)[keyof typeof PartnerShipmentScalarFieldEnum];
export declare const KitDefinitionScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly description: "description";
    readonly itemParentId: "itemParentId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type KitDefinitionScalarFieldEnum = (typeof KitDefinitionScalarFieldEnum)[keyof typeof KitDefinitionScalarFieldEnum];
export declare const KitAssemblyScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly kitDefinitionId: "kitDefinitionId";
    readonly deliveryOrderId: "deliveryOrderId";
    readonly quantity: "quantity";
    readonly status: "status";
    readonly assembledBy: "assembledBy";
    readonly assembledAt: "assembledAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type KitAssemblyScalarFieldEnum = (typeof KitAssemblyScalarFieldEnum)[keyof typeof KitAssemblyScalarFieldEnum];
export declare const ProjectScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly name: "name";
    readonly customerId: "customerId";
    readonly description: "description";
    readonly contractId: "contractId";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly totalBudget: "totalBudget";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum];
export declare const WbsTaskScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly taskCode: "taskCode";
    readonly taskName: "taskName";
    readonly parentTaskId: "parentTaskId";
    readonly level: "level";
    readonly plannedWeight: "plannedWeight";
    readonly plannedCost: "plannedCost";
    readonly actualProgress: "actualProgress";
    readonly actualCost: "actualCost";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type WbsTaskScalarFieldEnum = (typeof WbsTaskScalarFieldEnum)[keyof typeof WbsTaskScalarFieldEnum];
export declare const ProjectBudgetScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly wbsTaskId: "wbsTaskId";
    readonly allocatedBudget: "allocatedBudget";
    readonly committedAmount: "committedAmount";
    readonly createdAt: "createdAt";
};
export type ProjectBudgetScalarFieldEnum = (typeof ProjectBudgetScalarFieldEnum)[keyof typeof ProjectBudgetScalarFieldEnum];
export declare const TenderScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly title: "title";
    readonly projectId: "projectId";
    readonly description: "description";
    readonly status: "status";
    readonly submissionDeadline: "submissionDeadline";
    readonly awardDate: "awardDate";
    readonly createdAt: "createdAt";
};
export type TenderScalarFieldEnum = (typeof TenderScalarFieldEnum)[keyof typeof TenderScalarFieldEnum];
export declare const TenderBidScalarFieldEnum: {
    readonly id: "id";
    readonly tenderId: "tenderId";
    readonly supplierId: "supplierId";
    readonly price: "price";
    readonly notes: "notes";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type TenderBidScalarFieldEnum = (typeof TenderBidScalarFieldEnum)[keyof typeof TenderBidScalarFieldEnum];
export declare const ProjectContractScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly contractNo: "contractNo";
    readonly supplierId: "supplierId";
    readonly contractValue: "contractValue";
    readonly status: "status";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly createdAt: "createdAt";
};
export type ProjectContractScalarFieldEnum = (typeof ProjectContractScalarFieldEnum)[keyof typeof ProjectContractScalarFieldEnum];
export declare const ContractTermijnScalarFieldEnum: {
    readonly id: "id";
    readonly contractId: "contractId";
    readonly termijnNo: "termijnNo";
    readonly description: "description";
    readonly dueDate: "dueDate";
    readonly percentage: "percentage";
    readonly amount: "amount";
    readonly status: "status";
    readonly paidAt: "paidAt";
};
export type ContractTermijnScalarFieldEnum = (typeof ContractTermijnScalarFieldEnum)[keyof typeof ContractTermijnScalarFieldEnum];
export declare const DailyReportScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly reportDate: "reportDate";
    readonly weather: "weather";
    readonly manpowerSummary: "manpowerSummary";
    readonly workSummary: "workSummary";
    readonly issues: "issues";
    readonly status: "status";
    readonly submittedBy: "submittedBy";
    readonly createdAt: "createdAt";
};
export type DailyReportScalarFieldEnum = (typeof DailyReportScalarFieldEnum)[keyof typeof DailyReportScalarFieldEnum];
export declare const ResourceUsageScalarFieldEnum: {
    readonly id: "id";
    readonly dailyReportId: "dailyReportId";
    readonly resourceType: "resourceType";
    readonly quantity: "quantity";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type ResourceUsageScalarFieldEnum = (typeof ResourceUsageScalarFieldEnum)[keyof typeof ResourceUsageScalarFieldEnum];
export declare const ProgressClaimScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly contractTermijnId: "contractTermijnId";
    readonly periodFrom: "periodFrom";
    readonly periodTo: "periodTo";
    readonly percentage: "percentage";
    readonly amount: "amount";
    readonly notes: "notes";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type ProgressClaimScalarFieldEnum = (typeof ProgressClaimScalarFieldEnum)[keyof typeof ProgressClaimScalarFieldEnum];
export declare const ProgressInvoiceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly progressClaimId: "progressClaimId";
    readonly projectId: "projectId";
    readonly amount: "amount";
    readonly status: "status";
    readonly invoiceNo: "invoiceNo";
    readonly arInvoiceId: "arInvoiceId";
    readonly createdAt: "createdAt";
};
export type ProgressInvoiceScalarFieldEnum = (typeof ProgressInvoiceScalarFieldEnum)[keyof typeof ProgressInvoiceScalarFieldEnum];
export declare const ProjectCommitmentScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly projectId: "projectId";
    readonly wbsTaskId: "wbsTaskId";
    readonly commitmentType: "commitmentType";
    readonly referenceId: "referenceId";
    readonly description: "description";
    readonly amount: "amount";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type ProjectCommitmentScalarFieldEnum = (typeof ProjectCommitmentScalarFieldEnum)[keyof typeof ProjectCommitmentScalarFieldEnum];
export declare const ThreeWayMatchingScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly code: "code";
    readonly invoiceId: "invoiceId";
    readonly orderId: "orderId";
    readonly receiptId: "receiptId";
    readonly matchDate: "matchDate";
    readonly status: "status";
    readonly discrepancyNotes: "discrepancyNotes";
    readonly varianceAmount: "varianceAmount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ThreeWayMatchingScalarFieldEnum = (typeof ThreeWayMatchingScalarFieldEnum)[keyof typeof ThreeWayMatchingScalarFieldEnum];
export declare const StockBalanceScalarFieldEnum: {
    readonly id: "id";
    readonly tenantId: "tenantId";
    readonly warehouseId: "warehouseId";
    readonly itemId: "itemId";
    readonly batchId: "batchId";
    readonly serialId: "serialId";
    readonly qtyOnHand: "qtyOnHand";
    readonly qtyAllocated: "qtyAllocated";
    readonly qtyAvailable: "qtyAvailable";
    readonly uomCode: "uomCode";
    readonly lastReceiptDate: "lastReceiptDate";
    readonly binLocationId: "binLocationId";
    readonly updatedAt: "updatedAt";
};
export type StockBalanceScalarFieldEnum = (typeof StockBalanceScalarFieldEnum)[keyof typeof StockBalanceScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumLeadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadStatus'>;
export type ListEnumLeadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadStatus[]'>;
export type EnumSalesDocStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SalesDocStatus'>;
export type ListEnumSalesDocStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SalesDocStatus[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type EnumShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentStatus'>;
export type ListEnumShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentStatus[]'>;
export type EnumProcurementDocStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcurementDocStatus'>;
export type ListEnumProcurementDocStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcurementDocStatus[]'>;
export type EnumItemTrackingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemTrackingType'>;
export type ListEnumItemTrackingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemTrackingType[]'>;
export type EnumValuationMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ValuationMethod'>;
export type ListEnumValuationMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ValuationMethod[]'>;
export type EnumStockMoveTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockMoveType'>;
export type ListEnumStockMoveTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockMoveType[]'>;
export type EnumInventoryDocStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InventoryDocStatus'>;
export type ListEnumInventoryDocStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InventoryDocStatus[]'>;
export type EnumOpportunityStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OpportunityStage'>;
export type ListEnumOpportunityStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OpportunityStage[]'>;
export type EnumActivityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityType'>;
export type ListEnumActivityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityType[]'>;
export type EnumActivityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityStatus'>;
export type ListEnumActivityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityStatus[]'>;
export type EnumCampaignStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignStatus'>;
export type ListEnumCampaignStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignStatus[]'>;
export type EnumTicketPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketPriority'>;
export type ListEnumTicketPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketPriority[]'>;
export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>;
export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel'>;
export type ListEnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel[]'>;
export type EnumNotificationTemplateStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationTemplateStatus'>;
export type ListEnumNotificationTemplateStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationTemplateStatus[]'>;
export type EnumNotificationLogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationLogStatus'>;
export type ListEnumNotificationLogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationLogStatus[]'>;
export type EnumNotificationScheduleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationScheduleStatus'>;
export type ListEnumNotificationScheduleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationScheduleStatus[]'>;
export type EnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType'>;
export type ListEnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType[]'>;
export type EnumWorkflowInstanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowInstanceStatus'>;
export type ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowInstanceStatus[]'>;
export type EnumApprovalActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalAction'>;
export type ListEnumApprovalActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApprovalAction[]'>;
export type EnumProductionDocStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductionDocStatus'>;
export type ListEnumProductionDocStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductionDocStatus[]'>;
export type EnumVehicleOwnershipTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleOwnershipType'>;
export type ListEnumVehicleOwnershipTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleOwnershipType[]'>;
export type EnumVehicleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleStatus'>;
export type ListEnumVehicleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleStatus[]'>;
export type EnumDriverLicenseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DriverLicenseType'>;
export type ListEnumDriverLicenseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DriverLicenseType[]'>;
export type EnumDriverStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DriverStatus'>;
export type ListEnumDriverStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DriverStatus[]'>;
export type EnumTripPlanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripPlanStatus'>;
export type ListEnumTripPlanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripPlanStatus[]'>;
export type EnumTripCheckpointTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripCheckpointType'>;
export type ListEnumTripCheckpointTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripCheckpointType[]'>;
export type EnumDeliveryOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryOrderStatus'>;
export type ListEnumDeliveryOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryOrderStatus[]'>;
export type EnumDeliveryPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryPriority'>;
export type ListEnumDeliveryPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryPriority[]'>;
export type EnumProofOfDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProofOfDeliveryStatus'>;
export type ListEnumProofOfDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProofOfDeliveryStatus[]'>;
export type EnumDeliveryExceptionReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryExceptionReason'>;
export type ListEnumDeliveryExceptionReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryExceptionReason[]'>;
export type EnumWavePickingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WavePickingStatus'>;
export type ListEnumWavePickingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WavePickingStatus[]'>;
export type EnumTripCostTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripCostType'>;
export type ListEnumTripCostTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripCostType[]'>;
export type EnumTripCostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripCostStatus'>;
export type ListEnumTripCostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripCostStatus[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    tenant?: Prisma.TenantOmit;
    user?: Prisma.UserOmit;
    lead?: Prisma.LeadOmit;
    customer?: Prisma.CustomerOmit;
    salesQuotation?: Prisma.SalesQuotationOmit;
    salesQuotationItem?: Prisma.SalesQuotationItemOmit;
    salesOrder?: Prisma.SalesOrderOmit;
    salesOrderItem?: Prisma.SalesOrderItemOmit;
    salesInvoice?: Prisma.SalesInvoiceOmit;
    salesInvoiceItem?: Prisma.SalesInvoiceItemOmit;
    salesReturn?: Prisma.SalesReturnOmit;
    salesReturnItem?: Prisma.SalesReturnItemOmit;
    priceList?: Prisma.PriceListOmit;
    priceListItem?: Prisma.PriceListItemOmit;
    priceRule?: Prisma.PriceRuleOmit;
    discountRule?: Prisma.DiscountRuleOmit;
    carrier?: Prisma.CarrierOmit;
    shipment?: Prisma.ShipmentOmit;
    commissionScheme?: Prisma.CommissionSchemeOmit;
    commissionEntry?: Prisma.CommissionEntryOmit;
    supplier?: Prisma.SupplierOmit;
    purchaseRequisition?: Prisma.PurchaseRequisitionOmit;
    purchaseRequisitionItem?: Prisma.PurchaseRequisitionItemOmit;
    rfq?: Prisma.RfqOmit;
    rfqVendor?: Prisma.RfqVendorOmit;
    rfqItem?: Prisma.RfqItemOmit;
    purchaseOrder?: Prisma.PurchaseOrderOmit;
    purchaseOrderItem?: Prisma.PurchaseOrderItemOmit;
    purchaseInvoice?: Prisma.PurchaseInvoiceOmit;
    purchaseInvoiceItem?: Prisma.PurchaseInvoiceItemOmit;
    landedCostVoucher?: Prisma.LandedCostVoucherOmit;
    landedCostAllocation?: Prisma.LandedCostAllocationOmit;
    purchaseReturn?: Prisma.PurchaseReturnOmit;
    purchaseReturnItem?: Prisma.PurchaseReturnItemOmit;
    itemGroup?: Prisma.ItemGroupOmit;
    item?: Prisma.ItemOmit;
    itemUom?: Prisma.ItemUomOmit;
    itemBarcode?: Prisma.ItemBarcodeOmit;
    warehouse?: Prisma.WarehouseOmit;
    binLocation?: Prisma.BinLocationOmit;
    stockLedger?: Prisma.StockLedgerOmit;
    goodsReceiptNote?: Prisma.GoodsReceiptNoteOmit;
    goodsReceiptItem?: Prisma.GoodsReceiptItemOmit;
    stockTransfer?: Prisma.StockTransferOmit;
    stockTransferItem?: Prisma.StockTransferItemOmit;
    stockCount?: Prisma.StockCountOmit;
    stockCountItem?: Prisma.StockCountItemOmit;
    goodsIssueNote?: Prisma.GoodsIssueNoteOmit;
    goodsIssueItem?: Prisma.GoodsIssueItemOmit;
    putaway?: Prisma.PutawayOmit;
    putawayItem?: Prisma.PutawayItemOmit;
    picking?: Prisma.PickingOmit;
    pickingItem?: Prisma.PickingItemOmit;
    packing?: Prisma.PackingOmit;
    packingItem?: Prisma.PackingItemOmit;
    qcInspection?: Prisma.QcInspectionOmit;
    qcInspectionItem?: Prisma.QcInspectionItemOmit;
    itemBatch?: Prisma.ItemBatchOmit;
    itemSerial?: Prisma.ItemSerialOmit;
    valuationLayer?: Prisma.ValuationLayerOmit;
    opportunity?: Prisma.OpportunityOmit;
    salesActivity?: Prisma.SalesActivityOmit;
    marketingCampaign?: Prisma.MarketingCampaignOmit;
    serviceTicket?: Prisma.ServiceTicketOmit;
    role?: Prisma.RoleOmit;
    permission?: Prisma.PermissionOmit;
    userRole?: Prisma.UserRoleOmit;
    rolePermission?: Prisma.RolePermissionOmit;
    auditLog?: Prisma.AuditLogOmit;
    notificationTemplate?: Prisma.NotificationTemplateOmit;
    notificationChannelConfig?: Prisma.NotificationChannelConfigOmit;
    notificationPreference?: Prisma.NotificationPreferenceOmit;
    notificationLog?: Prisma.NotificationLogOmit;
    notificationSchedule?: Prisma.NotificationScheduleOmit;
    companyProfile?: Prisma.CompanyProfileOmit;
    branch?: Prisma.BranchOmit;
    currency?: Prisma.CurrencyOmit;
    exchangeRate?: Prisma.ExchangeRateOmit;
    uom?: Prisma.UomOmit;
    uomConversion?: Prisma.UomConversionOmit;
    fiscalYear?: Prisma.FiscalYearOmit;
    accountingPeriod?: Prisma.AccountingPeriodOmit;
    coaAccount?: Prisma.CoaAccountOmit;
    costCenter?: Prisma.CostCenterOmit;
    profitCenter?: Prisma.ProfitCenterOmit;
    journalEntry?: Prisma.JournalEntryOmit;
    journalEntryLine?: Prisma.JournalEntryLineOmit;
    supplierInvoice?: Prisma.SupplierInvoiceOmit;
    supplierInvoiceLine?: Prisma.SupplierInvoiceLineOmit;
    supplierInvoicePayment?: Prisma.SupplierInvoicePaymentOmit;
    customerInvoice?: Prisma.CustomerInvoiceOmit;
    customerInvoiceLine?: Prisma.CustomerInvoiceLineOmit;
    customerInvoicePayment?: Prisma.CustomerInvoicePaymentOmit;
    fixedAsset?: Prisma.FixedAssetOmit;
    fixedAssetDepreciation?: Prisma.FixedAssetDepreciationOmit;
    bankAccount?: Prisma.BankAccountOmit;
    bankTransaction?: Prisma.BankTransactionOmit;
    cashAccount?: Prisma.CashAccountOmit;
    cashTransaction?: Prisma.CashTransactionOmit;
    taxCode?: Prisma.TaxCodeOmit;
    costCenterAllocation?: Prisma.CostCenterAllocationOmit;
    interCompanyTransaction?: Prisma.InterCompanyTransactionOmit;
    bankReconciliation?: Prisma.BankReconciliationOmit;
    pettyCashReplenishment?: Prisma.PettyCashReplenishmentOmit;
    customerReceipt?: Prisma.CustomerReceiptOmit;
    vendorPayment?: Prisma.VendorPaymentOmit;
    paymentRequest?: Prisma.PaymentRequestOmit;
    assetDisposal?: Prisma.AssetDisposalOmit;
    budget?: Prisma.BudgetOmit;
    workflowDefinition?: Prisma.WorkflowDefinitionOmit;
    workflowStep?: Prisma.WorkflowStepOmit;
    workflowRule?: Prisma.WorkflowRuleOmit;
    workflowInstance?: Prisma.WorkflowInstanceOmit;
    approvalHistory?: Prisma.ApprovalHistoryOmit;
    delegation?: Prisma.DelegationOmit;
    billOfMaterials?: Prisma.BillOfMaterialsOmit;
    billOfMaterialsItem?: Prisma.BillOfMaterialsItemOmit;
    workOrder?: Prisma.WorkOrderOmit;
    workOrderComponent?: Prisma.WorkOrderComponentOmit;
    workOrderOperation?: Prisma.WorkOrderOperationOmit;
    productionIssue?: Prisma.ProductionIssueOmit;
    productionIssueItem?: Prisma.ProductionIssueItemOmit;
    productionReceipt?: Prisma.ProductionReceiptOmit;
    inProcessQc?: Prisma.InProcessQcOmit;
    equipment?: Prisma.EquipmentOmit;
    maintenanceSchedule?: Prisma.MaintenanceScheduleOmit;
    maintenanceRequest?: Prisma.MaintenanceRequestOmit;
    mrpRun?: Prisma.MrpRunOmit;
    mrpSuggestion?: Prisma.MrpSuggestionOmit;
    productionCost?: Prisma.ProductionCostOmit;
    taxInvoice?: Prisma.TaxInvoiceOmit;
    nsfpRange?: Prisma.NsfpRangeOmit;
    pphWithholding?: Prisma.PphWithholdingOmit;
    taxEqualization?: Prisma.TaxEqualizationOmit;
    idBilling?: Prisma.IdBillingOmit;
    employee?: Prisma.EmployeeOmit;
    organizationUnit?: Prisma.OrganizationUnitOmit;
    attendance?: Prisma.AttendanceOmit;
    shift?: Prisma.ShiftOmit;
    payrollRun?: Prisma.PayrollRunOmit;
    expenseClaim?: Prisma.ExpenseClaimOmit;
    kpiEvaluation?: Prisma.KpiEvaluationOmit;
    recruitmentCandidate?: Prisma.RecruitmentCandidateOmit;
    fleetVehicle?: Prisma.FleetVehicleOmit;
    logisticsDriver?: Prisma.LogisticsDriverOmit;
    transporter?: Prisma.TransporterOmit;
    routeTemplate?: Prisma.RouteTemplateOmit;
    tripPlan?: Prisma.TripPlanOmit;
    tripCheckpoint?: Prisma.TripCheckpointOmit;
    deliveryOrder?: Prisma.DeliveryOrderOmit;
    deliveryOrderItem?: Prisma.DeliveryOrderItemOmit;
    proofOfDelivery?: Prisma.ProofOfDeliveryOmit;
    deliveryException?: Prisma.DeliveryExceptionOmit;
    wavePicking?: Prisma.WavePickingOmit;
    stagingLoad?: Prisma.StagingLoadOmit;
    packingList?: Prisma.PackingListOmit;
    tripCost?: Prisma.TripCostOmit;
    tripLocation?: Prisma.TripLocationOmit;
    tripRouteTrace?: Prisma.TripRouteTraceOmit;
    vehicleMaintenance?: Prisma.VehicleMaintenanceOmit;
    vehicleDocument?: Prisma.VehicleDocumentOmit;
    driverSchedule?: Prisma.DriverScheduleOmit;
    driverAvailability?: Prisma.DriverAvailabilityOmit;
    logisticsPartner?: Prisma.LogisticsPartnerOmit;
    partnerRate?: Prisma.PartnerRateOmit;
    partnerShipment?: Prisma.PartnerShipmentOmit;
    kitDefinition?: Prisma.KitDefinitionOmit;
    kitAssembly?: Prisma.KitAssemblyOmit;
    project?: Prisma.ProjectOmit;
    wbsTask?: Prisma.WbsTaskOmit;
    projectBudget?: Prisma.ProjectBudgetOmit;
    tender?: Prisma.TenderOmit;
    tenderBid?: Prisma.TenderBidOmit;
    projectContract?: Prisma.ProjectContractOmit;
    contractTermijn?: Prisma.ContractTermijnOmit;
    dailyReport?: Prisma.DailyReportOmit;
    resourceUsage?: Prisma.ResourceUsageOmit;
    progressClaim?: Prisma.ProgressClaimOmit;
    progressInvoice?: Prisma.ProgressInvoiceOmit;
    projectCommitment?: Prisma.ProjectCommitmentOmit;
    threeWayMatching?: Prisma.ThreeWayMatchingOmit;
    stockBalance?: Prisma.StockBalanceOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
