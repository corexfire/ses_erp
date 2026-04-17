"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionDocStatus = exports.ApprovalAction = exports.WorkflowInstanceStatus = exports.NotificationScheduleStatus = exports.NotificationLogStatus = exports.NotificationTemplateStatus = exports.NotificationChannel = exports.WavePickingStatus = exports.TripCostType = exports.TripCostStatus = exports.DeliveryExceptionReason = exports.ProofOfDeliveryStatus = exports.TripCheckpointType = exports.TripPlanStatus = exports.DeliveryPriority = exports.DeliveryOrderStatus = exports.DriverLicenseType = exports.DriverStatus = exports.VehicleStatus = exports.VehicleOwnershipType = exports.ItemTrackingType = exports.ValuationMethod = exports.StockMoveType = exports.InventoryDocStatus = exports.ProcurementDocStatus = exports.ShipmentStatus = exports.SalesDocStatus = exports.TicketStatus = exports.TicketPriority = exports.CampaignStatus = exports.ActivityStatus = exports.ActivityType = exports.OpportunityStage = exports.LeadStatus = exports.AccountType = void 0;
exports.AccountType = {
    ASSET: 'ASSET',
    LIABILITY: 'LIABILITY',
    EQUITY: 'EQUITY',
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE'
};
exports.LeadStatus = {
    NEW: 'NEW',
    CONTACTED: 'CONTACTED',
    QUALIFIED: 'QUALIFIED',
    LOST: 'LOST',
    WON: 'WON'
};
exports.OpportunityStage = {
    QUALIFICATION: 'QUALIFICATION',
    PROPOSAL: 'PROPOSAL',
    NEGOTIATION: 'NEGOTIATION',
    CLOSED_WON: 'CLOSED_WON',
    CLOSED_LOST: 'CLOSED_LOST'
};
exports.ActivityType = {
    CALL: 'CALL',
    EMAIL: 'EMAIL',
    MEETING: 'MEETING',
    TASK: 'TASK'
};
exports.ActivityStatus = {
    OPEN: 'OPEN',
    DONE: 'DONE',
    CANCELED: 'CANCELED'
};
exports.CampaignStatus = {
    PLANNED: 'PLANNED',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED'
};
exports.TicketPriority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    URGENT: 'URGENT'
};
exports.TicketStatus = {
    OPEN: 'OPEN',
    IN_PROGRESS: 'IN_PROGRESS',
    RESOLVED: 'RESOLVED',
    CLOSED: 'CLOSED'
};
exports.SalesDocStatus = {
    DRAFT: 'DRAFT',
    SUBMITTED: 'SUBMITTED',
    PENDING_APPROVAL: 'PENDING_APPROVAL',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    CLOSED: 'CLOSED',
    VOID: 'VOID'
};
exports.ShipmentStatus = {
    CREATED: 'CREATED',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELED: 'CANCELED'
};
exports.ProcurementDocStatus = {
    DRAFT: 'DRAFT',
    SUBMITTED: 'SUBMITTED',
    PENDING_APPROVAL: 'PENDING_APPROVAL',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    CLOSED: 'CLOSED',
    VOID: 'VOID'
};
exports.InventoryDocStatus = {
    DRAFT: 'DRAFT',
    SUBMITTED: 'SUBMITTED',
    POSTED: 'POSTED',
    VOID: 'VOID'
};
exports.StockMoveType = {
    GRN_RECEIPT: 'GRN_RECEIPT',
    GOODS_ISSUE: 'GOODS_ISSUE',
    TRANSFER_OUT: 'TRANSFER_OUT',
    TRANSFER_IN: 'TRANSFER_IN',
    STOCK_COUNT_ADJUST: 'STOCK_COUNT_ADJUST',
    MANUAL_ADJUST: 'MANUAL_ADJUST',
    PRODUCTION_ISSUE: 'PRODUCTION_ISSUE',
    PRODUCTION_RECEIPT: 'PRODUCTION_RECEIPT'
};
exports.ValuationMethod = {
    MOVING_AVERAGE: 'MOVING_AVERAGE',
    FIFO: 'FIFO'
};
exports.ItemTrackingType = {
    NONE: 'NONE',
    BATCH: 'BATCH',
    SERIAL: 'SERIAL'
};
exports.VehicleOwnershipType = {
    OWNED: 'OWNED',
    LEASED: 'LEASED',
    THIRD_PARTY: 'THIRD_PARTY'
};
exports.VehicleStatus = {
    ACTIVE: 'ACTIVE',
    MAINTENANCE: 'MAINTENANCE',
    INACTIVE: 'INACTIVE'
};
exports.DriverStatus = {
    ACTIVE: 'ACTIVE',
    ON_LEAVE: 'ON_LEAVE',
    INACTIVE: 'INACTIVE'
};
exports.DriverLicenseType = {
    A: 'A',
    B1: 'B1',
    B2: 'B2',
    C: 'C',
    D: 'D'
};
exports.DeliveryOrderStatus = {
    DRAFT: 'DRAFT',
    PLANNED: 'PLANNED',
    RELEASED: 'RELEASED',
    PICKING: 'PICKING',
    STAGED: 'STAGED',
    LOADED: 'LOADED',
    IN_TRANSIT: 'IN_TRANSIT',
    DELIVERED: 'DELIVERED',
    FAILED: 'FAILED',
    RTO: 'RTO',
    CANCELED: 'CANCELED'
};
exports.DeliveryPriority = {
    LOW: 'LOW',
    NORMAL: 'NORMAL',
    HIGH: 'HIGH',
    URGENT: 'URGENT'
};
exports.TripPlanStatus = {
    PLANNED: 'PLANNED',
    READY: 'READY',
    DISPATCHED: 'DISPATCHED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED'
};
exports.TripCheckpointType = {
    LOADED: 'LOADED',
    DEPARTED: 'DEPARTED',
    ARRIVED: 'ARRIVED',
    DELIVERED: 'DELIVERED',
    RETURNED: 'RETURNED',
    FAILED: 'FAILED'
};
exports.ProofOfDeliveryStatus = {
    CAPTURED: 'CAPTURED',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED'
};
exports.DeliveryExceptionReason = {
    CUSTOMER_UNAVAILABLE: 'CUSTOMER_UNAVAILABLE',
    ADDRESS_NOT_FOUND: 'ADDRESS_NOT_FOUND',
    GOODS_REJECTED: 'GOODS_REJECTED',
    DAMAGED_IN_TRANSIT: 'DAMAGED_IN_TRANSIT',
    WRONG_ADDRESS: 'WRONG_ADDRESS',
    ACCESS_DENIED: 'ACCESS_DENIED',
    RETURN_TO_ORIGIN: 'RETURN_TO_ORIGIN',
    OTHER: 'OTHER'
};
exports.TripCostStatus = {
    DRAFT: 'DRAFT',
    SUBMITTED: 'SUBMITTED',
    APPROVED: 'APPROVED',
    POSTED: 'POSTED',
    VOID: 'VOID'
};
exports.TripCostType = {
    FUEL: 'FUEL',
    TOLL: 'TOLL',
    PARKING: 'PARKING',
    VENDOR_FREIGHT: 'VENDOR_FREIGHT',
    DRIVER_OVERTIME: 'DRIVER_OVERTIME',
    OTHER: 'OTHER'
};
exports.WavePickingStatus = {
    DRAFT: 'DRAFT',
    RELEASED: 'RELEASED',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
    CANCELED: 'CANCELED'
};
exports.NotificationChannel = {
    EMAIL: 'EMAIL',
    WHATSAPP: 'WHATSAPP',
    SMS: 'SMS',
    IN_APP: 'IN_APP'
};
exports.NotificationTemplateStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
};
exports.NotificationLogStatus = {
    PENDING: 'PENDING',
    QUEUED: 'QUEUED',
    SENT: 'SENT',
    FAILED: 'FAILED',
    READ: 'READ'
};
exports.NotificationScheduleStatus = {
    ACTIVE: 'ACTIVE',
    PAUSED: 'PAUSED',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
};
exports.WorkflowInstanceStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    ESCALATED: 'ESCALATED',
    CANCELED: 'CANCELED'
};
exports.ApprovalAction = {
    APPROVE: 'APPROVE',
    REJECT: 'REJECT',
    DELEGATE: 'DELEGATE',
    ESCALATE: 'ESCALATE'
};
exports.ProductionDocStatus = {
    DRAFT: 'DRAFT',
    RELEASED: 'RELEASED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED'
};
//# sourceMappingURL=enums.js.map