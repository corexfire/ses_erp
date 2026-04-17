export declare const AccountType: {
    readonly ASSET: "ASSET";
    readonly LIABILITY: "LIABILITY";
    readonly EQUITY: "EQUITY";
    readonly INCOME: "INCOME";
    readonly EXPENSE: "EXPENSE";
};
export type AccountType = (typeof AccountType)[keyof typeof AccountType];
export declare const LeadStatus: {
    readonly NEW: "NEW";
    readonly CONTACTED: "CONTACTED";
    readonly QUALIFIED: "QUALIFIED";
    readonly LOST: "LOST";
    readonly WON: "WON";
};
export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];
export declare const OpportunityStage: {
    readonly QUALIFICATION: "QUALIFICATION";
    readonly PROPOSAL: "PROPOSAL";
    readonly NEGOTIATION: "NEGOTIATION";
    readonly CLOSED_WON: "CLOSED_WON";
    readonly CLOSED_LOST: "CLOSED_LOST";
};
export type OpportunityStage = (typeof OpportunityStage)[keyof typeof OpportunityStage];
export declare const ActivityType: {
    readonly CALL: "CALL";
    readonly EMAIL: "EMAIL";
    readonly MEETING: "MEETING";
    readonly TASK: "TASK";
};
export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];
export declare const ActivityStatus: {
    readonly OPEN: "OPEN";
    readonly DONE: "DONE";
    readonly CANCELED: "CANCELED";
};
export type ActivityStatus = (typeof ActivityStatus)[keyof typeof ActivityStatus];
export declare const CampaignStatus: {
    readonly PLANNED: "PLANNED";
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELED: "CANCELED";
};
export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus];
export declare const TicketPriority: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority];
export declare const TicketStatus: {
    readonly OPEN: "OPEN";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly RESOLVED: "RESOLVED";
    readonly CLOSED: "CLOSED";
};
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];
export declare const SalesDocStatus: {
    readonly DRAFT: "DRAFT";
    readonly SUBMITTED: "SUBMITTED";
    readonly PENDING_APPROVAL: "PENDING_APPROVAL";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly CLOSED: "CLOSED";
    readonly VOID: "VOID";
};
export type SalesDocStatus = (typeof SalesDocStatus)[keyof typeof SalesDocStatus];
export declare const ShipmentStatus: {
    readonly CREATED: "CREATED";
    readonly SHIPPED: "SHIPPED";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELED: "CANCELED";
};
export type ShipmentStatus = (typeof ShipmentStatus)[keyof typeof ShipmentStatus];
export declare const ProcurementDocStatus: {
    readonly DRAFT: "DRAFT";
    readonly SUBMITTED: "SUBMITTED";
    readonly PENDING_APPROVAL: "PENDING_APPROVAL";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly CLOSED: "CLOSED";
    readonly VOID: "VOID";
};
export type ProcurementDocStatus = (typeof ProcurementDocStatus)[keyof typeof ProcurementDocStatus];
export declare const InventoryDocStatus: {
    readonly DRAFT: "DRAFT";
    readonly SUBMITTED: "SUBMITTED";
    readonly POSTED: "POSTED";
    readonly VOID: "VOID";
};
export type InventoryDocStatus = (typeof InventoryDocStatus)[keyof typeof InventoryDocStatus];
export declare const StockMoveType: {
    readonly GRN_RECEIPT: "GRN_RECEIPT";
    readonly GOODS_ISSUE: "GOODS_ISSUE";
    readonly TRANSFER_OUT: "TRANSFER_OUT";
    readonly TRANSFER_IN: "TRANSFER_IN";
    readonly STOCK_COUNT_ADJUST: "STOCK_COUNT_ADJUST";
    readonly MANUAL_ADJUST: "MANUAL_ADJUST";
    readonly PRODUCTION_ISSUE: "PRODUCTION_ISSUE";
    readonly PRODUCTION_RECEIPT: "PRODUCTION_RECEIPT";
};
export type StockMoveType = (typeof StockMoveType)[keyof typeof StockMoveType];
export declare const ValuationMethod: {
    readonly MOVING_AVERAGE: "MOVING_AVERAGE";
    readonly FIFO: "FIFO";
};
export type ValuationMethod = (typeof ValuationMethod)[keyof typeof ValuationMethod];
export declare const ItemTrackingType: {
    readonly NONE: "NONE";
    readonly BATCH: "BATCH";
    readonly SERIAL: "SERIAL";
};
export type ItemTrackingType = (typeof ItemTrackingType)[keyof typeof ItemTrackingType];
export declare const VehicleOwnershipType: {
    readonly OWNED: "OWNED";
    readonly LEASED: "LEASED";
    readonly THIRD_PARTY: "THIRD_PARTY";
};
export type VehicleOwnershipType = (typeof VehicleOwnershipType)[keyof typeof VehicleOwnershipType];
export declare const VehicleStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly MAINTENANCE: "MAINTENANCE";
    readonly INACTIVE: "INACTIVE";
};
export type VehicleStatus = (typeof VehicleStatus)[keyof typeof VehicleStatus];
export declare const DriverStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly ON_LEAVE: "ON_LEAVE";
    readonly INACTIVE: "INACTIVE";
};
export type DriverStatus = (typeof DriverStatus)[keyof typeof DriverStatus];
export declare const DriverLicenseType: {
    readonly A: "A";
    readonly B1: "B1";
    readonly B2: "B2";
    readonly C: "C";
    readonly D: "D";
};
export type DriverLicenseType = (typeof DriverLicenseType)[keyof typeof DriverLicenseType];
export declare const DeliveryOrderStatus: {
    readonly DRAFT: "DRAFT";
    readonly PLANNED: "PLANNED";
    readonly RELEASED: "RELEASED";
    readonly PICKING: "PICKING";
    readonly STAGED: "STAGED";
    readonly LOADED: "LOADED";
    readonly IN_TRANSIT: "IN_TRANSIT";
    readonly DELIVERED: "DELIVERED";
    readonly FAILED: "FAILED";
    readonly RTO: "RTO";
    readonly CANCELED: "CANCELED";
};
export type DeliveryOrderStatus = (typeof DeliveryOrderStatus)[keyof typeof DeliveryOrderStatus];
export declare const DeliveryPriority: {
    readonly LOW: "LOW";
    readonly NORMAL: "NORMAL";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type DeliveryPriority = (typeof DeliveryPriority)[keyof typeof DeliveryPriority];
export declare const TripPlanStatus: {
    readonly PLANNED: "PLANNED";
    readonly READY: "READY";
    readonly DISPATCHED: "DISPATCHED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELED: "CANCELED";
};
export type TripPlanStatus = (typeof TripPlanStatus)[keyof typeof TripPlanStatus];
export declare const TripCheckpointType: {
    readonly LOADED: "LOADED";
    readonly DEPARTED: "DEPARTED";
    readonly ARRIVED: "ARRIVED";
    readonly DELIVERED: "DELIVERED";
    readonly RETURNED: "RETURNED";
    readonly FAILED: "FAILED";
};
export type TripCheckpointType = (typeof TripCheckpointType)[keyof typeof TripCheckpointType];
export declare const ProofOfDeliveryStatus: {
    readonly CAPTURED: "CAPTURED";
    readonly VERIFIED: "VERIFIED";
    readonly REJECTED: "REJECTED";
};
export type ProofOfDeliveryStatus = (typeof ProofOfDeliveryStatus)[keyof typeof ProofOfDeliveryStatus];
export declare const DeliveryExceptionReason: {
    readonly CUSTOMER_UNAVAILABLE: "CUSTOMER_UNAVAILABLE";
    readonly ADDRESS_NOT_FOUND: "ADDRESS_NOT_FOUND";
    readonly GOODS_REJECTED: "GOODS_REJECTED";
    readonly DAMAGED_IN_TRANSIT: "DAMAGED_IN_TRANSIT";
    readonly WRONG_ADDRESS: "WRONG_ADDRESS";
    readonly ACCESS_DENIED: "ACCESS_DENIED";
    readonly RETURN_TO_ORIGIN: "RETURN_TO_ORIGIN";
    readonly OTHER: "OTHER";
};
export type DeliveryExceptionReason = (typeof DeliveryExceptionReason)[keyof typeof DeliveryExceptionReason];
export declare const TripCostStatus: {
    readonly DRAFT: "DRAFT";
    readonly SUBMITTED: "SUBMITTED";
    readonly APPROVED: "APPROVED";
    readonly POSTED: "POSTED";
    readonly VOID: "VOID";
};
export type TripCostStatus = (typeof TripCostStatus)[keyof typeof TripCostStatus];
export declare const TripCostType: {
    readonly FUEL: "FUEL";
    readonly TOLL: "TOLL";
    readonly PARKING: "PARKING";
    readonly VENDOR_FREIGHT: "VENDOR_FREIGHT";
    readonly DRIVER_OVERTIME: "DRIVER_OVERTIME";
    readonly OTHER: "OTHER";
};
export type TripCostType = (typeof TripCostType)[keyof typeof TripCostType];
export declare const WavePickingStatus: {
    readonly DRAFT: "DRAFT";
    readonly RELEASED: "RELEASED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly DONE: "DONE";
    readonly CANCELED: "CANCELED";
};
export type WavePickingStatus = (typeof WavePickingStatus)[keyof typeof WavePickingStatus];
export declare const NotificationChannel: {
    readonly EMAIL: "EMAIL";
    readonly WHATSAPP: "WHATSAPP";
    readonly SMS: "SMS";
    readonly IN_APP: "IN_APP";
};
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];
export declare const NotificationTemplateStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
};
export type NotificationTemplateStatus = (typeof NotificationTemplateStatus)[keyof typeof NotificationTemplateStatus];
export declare const NotificationLogStatus: {
    readonly PENDING: "PENDING";
    readonly QUEUED: "QUEUED";
    readonly SENT: "SENT";
    readonly FAILED: "FAILED";
    readonly READ: "READ";
};
export type NotificationLogStatus = (typeof NotificationLogStatus)[keyof typeof NotificationLogStatus];
export declare const NotificationScheduleStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly PAUSED: "PAUSED";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type NotificationScheduleStatus = (typeof NotificationScheduleStatus)[keyof typeof NotificationScheduleStatus];
export declare const WorkflowInstanceStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly ESCALATED: "ESCALATED";
    readonly CANCELED: "CANCELED";
};
export type WorkflowInstanceStatus = (typeof WorkflowInstanceStatus)[keyof typeof WorkflowInstanceStatus];
export declare const ApprovalAction: {
    readonly APPROVE: "APPROVE";
    readonly REJECT: "REJECT";
    readonly DELEGATE: "DELEGATE";
    readonly ESCALATE: "ESCALATE";
};
export type ApprovalAction = (typeof ApprovalAction)[keyof typeof ApprovalAction];
export declare const ProductionDocStatus: {
    readonly DRAFT: "DRAFT";
    readonly RELEASED: "RELEASED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELED: "CANCELED";
};
export type ProductionDocStatus = (typeof ProductionDocStatus)[keyof typeof ProductionDocStatus];
