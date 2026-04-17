-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'LOST', 'WON');

-- CreateEnum
CREATE TYPE "OpportunityStage" AS ENUM ('QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('CALL', 'EMAIL', 'MEETING', 'TASK');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('OPEN', 'DONE', 'CANCELED');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('PLANNED', 'ACTIVE', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "SalesDocStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'CLOSED', 'VOID');

-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('CREATED', 'SHIPPED', 'DELIVERED', 'CANCELED');

-- CreateEnum
CREATE TYPE "ProcurementDocStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'CLOSED', 'VOID');

-- CreateEnum
CREATE TYPE "InventoryDocStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'POSTED', 'VOID');

-- CreateEnum
CREATE TYPE "StockMoveType" AS ENUM ('GRN_RECEIPT', 'TRANSFER_OUT', 'TRANSFER_IN', 'STOCK_COUNT_ADJUST', 'MANUAL_ADJUST', 'PRODUCTION_ISSUE', 'PRODUCTION_RECEIPT', 'GOODS_ISSUE');

-- CreateEnum
CREATE TYPE "ValuationMethod" AS ENUM ('MOVING_AVERAGE', 'FIFO');

-- CreateEnum
CREATE TYPE "ItemTrackingType" AS ENUM ('NONE', 'BATCH', 'SERIAL');

-- CreateEnum
CREATE TYPE "VehicleOwnershipType" AS ENUM ('OWNED', 'LEASED', 'THIRD_PARTY');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('ACTIVE', 'ON_LEAVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "DriverLicenseType" AS ENUM ('A', 'B1', 'B2', 'C', 'D');

-- CreateEnum
CREATE TYPE "DeliveryOrderStatus" AS ENUM ('DRAFT', 'PLANNED', 'RELEASED', 'PICKING', 'STAGED', 'LOADED', 'IN_TRANSIT', 'DELIVERED', 'FAILED', 'RTO', 'CANCELED');

-- CreateEnum
CREATE TYPE "DeliveryPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "TripPlanStatus" AS ENUM ('PLANNED', 'READY', 'DISPATCHED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "TripCheckpointType" AS ENUM ('LOADED', 'DEPARTED', 'ARRIVED', 'DELIVERED', 'RETURNED', 'FAILED');

-- CreateEnum
CREATE TYPE "ProofOfDeliveryStatus" AS ENUM ('CAPTURED', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DeliveryExceptionReason" AS ENUM ('CUSTOMER_UNAVAILABLE', 'ADDRESS_NOT_FOUND', 'GOODS_REJECTED', 'DAMAGED_IN_TRANSIT', 'WRONG_ADDRESS', 'ACCESS_DENIED', 'OTHER', 'RETURN_TO_ORIGIN');

-- CreateEnum
CREATE TYPE "TripCostStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'POSTED', 'VOID');

-- CreateEnum
CREATE TYPE "TripCostType" AS ENUM ('FUEL', 'TOLL', 'PARKING', 'VENDOR_FREIGHT', 'DRIVER_OVERTIME', 'OTHER');

-- CreateEnum
CREATE TYPE "WavePickingStatus" AS ENUM ('DRAFT', 'RELEASED', 'IN_PROGRESS', 'DONE', 'CANCELED');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL', 'WHATSAPP', 'SMS', 'IN_APP');

-- CreateEnum
CREATE TYPE "NotificationTemplateStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "NotificationLogStatus" AS ENUM ('PENDING', 'QUEUED', 'SENT', 'FAILED', 'READ');

-- CreateEnum
CREATE TYPE "NotificationScheduleStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "WorkflowInstanceStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'ESCALATED', 'CANCELED');

-- CreateEnum
CREATE TYPE "ApprovalAction" AS ENUM ('APPROVE', 'REJECT', 'DELEGATE', 'ESCALATE');

-- CreateEnum
CREATE TYPE "ProductionDocStatus" AS ENUM ('DRAFT', 'RELEASED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "NcrSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "NcrDisposition" AS ENUM ('PENDING', 'USE_AS_IS', 'REWORK', 'REPAIR', 'SCRAP', 'RETURN_TO_VENDOR');

-- CreateEnum
CREATE TYPE "NcrStatus" AS ENUM ('DRAFT', 'OPEN', 'UNDER_INVESTIGATION', 'PENDING_APPROVAL', 'DISPOSITIONED', 'VERIFIED', 'CLOSED', 'VOID', 'REJECTED');

-- CreateEnum
CREATE TYPE "CapaStatus" AS ENUM ('DRAFT', 'OPEN', 'UNDER_REVIEW', 'IMPLEMENTING', 'VERIFYING', 'CLOSED', 'VOID');

-- CreateEnum
CREATE TYPE "QualityDocStatus" AS ENUM ('DRAFT', 'UNDER_REVIEW', 'PUBLISHED', 'OBSOLETE');

-- CreateEnum
CREATE TYPE "CalibrationStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "FsmServiceType" AS ENUM ('INSTALLATION', 'REPAIR', 'MAINTENANCE', 'INSPECTION', 'UPGRADE', 'OTHER');

-- CreateEnum
CREATE TYPE "FsmServiceOrderStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'PENDING_SCHEDULE', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED', 'VOID');

-- CreateEnum
CREATE TYPE "FsmAppointmentStatus" AS ENUM ('ASSIGNED', 'EN_ROUTE', 'ON_SITE', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELED');

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "source" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "assignedToUserId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "countryCode" TEXT DEFAULT 'ID',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "npwp" TEXT,
    "nik" TEXT,
    "taxAddress" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesQuotation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "status" "SalesDocStatus" NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesQuotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesQuotationItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "quotationId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "discount" DECIMAL(18,4),
    "taxCodeId" TEXT,

    CONSTRAINT "SalesQuotationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesOrder" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "quotationId" TEXT,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "status" "SalesDocStatus" NOT NULL DEFAULT 'DRAFT',
    "workflowDefinitionId" TEXT,
    "currentStepNo" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesOrderItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "discount" DECIMAL(18,4),
    "taxCodeId" TEXT,
    "itemId" TEXT,

    CONSTRAINT "SalesOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesInvoice" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "orderId" TEXT,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "status" "SalesDocStatus" NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesInvoiceItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "discount" DECIMAL(18,4),
    "taxCodeId" TEXT,
    "itemId" TEXT,

    CONSTRAINT "SalesInvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesReturn" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "orderId" TEXT,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "status" "SalesDocStatus" NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesReturn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesReturnItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "returnId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "taxCodeId" TEXT,
    "itemId" TEXT,

    CONSTRAINT "SalesReturnItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceList" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceListItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "priceListId" TEXT NOT NULL,
    "itemCode" TEXT NOT NULL,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "customerId" TEXT,

    CONSTRAINT "PriceListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceRule" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 100,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "itemCode" TEXT NOT NULL,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "customerId" TEXT,
    "customerGroup" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscountRule" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 100,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "itemCode" TEXT,
    "uomCode" TEXT,
    "discountPercent" DECIMAL(9,4) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "customerId" TEXT,
    "customerGroup" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscountRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrier" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carrier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "orderId" TEXT,
    "carrierId" TEXT,
    "trackingNo" TEXT,
    "shipDate" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "status" "ShipmentStatus" NOT NULL DEFAULT 'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionScheme" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rate" DECIMAL(18,4) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionScheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionEntry" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "schemeId" TEXT NOT NULL,
    "invoiceId" TEXT,
    "salesUserId" TEXT,
    "baseAmount" DECIMAL(18,4) NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommissionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "countryCode" TEXT DEFAULT 'ID',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bankAccount" TEXT,
    "bankName" TEXT,
    "npwp" TEXT,
    "paymentTerms" TEXT,
    "vendorGroup" TEXT,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRequisition" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "status" "ProcurementDocStatus" NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "workflowDefinitionId" TEXT,
    "currentStepNo" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "costCenterId" TEXT,
    "department" TEXT,
    "estimatedTotal" DECIMAL(18,4) NOT NULL DEFAULT 0,

    CONSTRAINT "PurchaseRequisition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRequisitionItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "requisitionId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "requiredDate" TIMESTAMP(3),
    "estimatedPrice" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "itemId" TEXT,

    CONSTRAINT "PurchaseRequisitionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rfq" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "status" "ProcurementDocStatus" NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closingDate" TIMESTAMP(3),
    "department" TEXT,
    "title" TEXT,

    CONSTRAINT "Rfq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RfqVendor" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "rfqId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bidAmount" DECIMAL(18,4),
    "status" TEXT NOT NULL DEFAULT 'INVITED',

    CONSTRAINT "RfqVendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RfqItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "rfqId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "itemId" TEXT,
    "targetPrice" DECIMAL(18,4) NOT NULL DEFAULT 0,

    CONSTRAINT "RfqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "rfqId" TEXT,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "status" "ProcurementDocStatus" NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "workflowDefinitionId" TEXT,
    "currentStepNo" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expectedDeliveryDate" TIMESTAMP(3),
    "grandTotal" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "paymentTerms" TEXT,
    "shippingAddress" TEXT,
    "subtotal" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "taxAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "discount" DECIMAL(18,4),
    "taxCodeId" TEXT,
    "amount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "itemId" TEXT,

    CONSTRAINT "PurchaseOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseInvoice" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "orderId" TEXT,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "status" "ProcurementDocStatus" NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "balanceDue" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3),
    "grandTotal" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "paymentTerms" TEXT,
    "subtotal" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "taxAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "taxFacturNumber" TEXT,

    CONSTRAINT "PurchaseInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseInvoiceItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "discount" DECIMAL(18,4),
    "taxCodeId" TEXT,
    "amount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "itemId" TEXT,

    CONSTRAINT "PurchaseInvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandedCostVoucher" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "supplierId" TEXT,
    "orderId" TEXT,
    "invoiceId" TEXT,
    "costDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DECIMAL(18,4) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "apportionmentMethod" TEXT NOT NULL DEFAULT 'qty',
    "receiptId" TEXT,
    "status" "ProcurementDocStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "LandedCostVoucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandedCostAllocation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "landedCostId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "costComponent" TEXT NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "itemId" TEXT,
    "receiptLineNo" INTEGER,

    CONSTRAINT "LandedCostAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseReturn" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "orderId" TEXT,
    "invoiceId" TEXT,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "status" "ProcurementDocStatus" NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "grandTotal" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "reason" TEXT,
    "receiptId" TEXT,
    "subtotal" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "taxAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,

    CONSTRAINT "PurchaseReturn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseReturnItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "returnId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "taxCodeId" TEXT,
    "amount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "itemId" TEXT,
    "receiptLineNo" INTEGER,

    CONSTRAINT "PurchaseReturnItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemGroup" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "itemGroupId" TEXT,
    "baseUomCode" TEXT,
    "trackingType" "ItemTrackingType" NOT NULL DEFAULT 'NONE',
    "valuationMethod" "ValuationMethod" NOT NULL DEFAULT 'MOVING_AVERAGE',
    "reorderPoint" DECIMAL(18,4),
    "reorderQty" DECIMAL(18,4),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isPurchaseItem" BOOLEAN NOT NULL DEFAULT true,
    "isSalesItem" BOOLEAN NOT NULL DEFAULT true,
    "purchaseTaxCodeId" TEXT,
    "salesTaxCodeId" TEXT,
    "brand" TEXT,
    "isSparePart" BOOLEAN NOT NULL DEFAULT false,
    "manufacturer" TEXT,
    "oemPartNumber" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemUom" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "uomCode" TEXT NOT NULL,
    "isBase" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversionRate" DECIMAL(18,4) NOT NULL DEFAULT 1,
    "price" DECIMAL(18,4),

    CONSTRAINT "ItemUom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemBarcode" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemBarcode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BinLocation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BinLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockLedger" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "moveType" "StockMoveType" NOT NULL,
    "refType" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "postingDate" TIMESTAMP(3) NOT NULL,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "qtyIn" DECIMAL(18,4) NOT NULL,
    "qtyOut" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "warehouseId" TEXT NOT NULL,
    "binLocationId" TEXT,
    "batchId" TEXT,
    "serialId" TEXT,
    "unitCost" DECIMAL(18,4),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsReceiptNote" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "receiptDate" TIMESTAMP(3) NOT NULL,
    "status" "InventoryDocStatus" NOT NULL DEFAULT 'DRAFT',
    "supplierId" TEXT,
    "purchaseOrderId" TEXT,
    "purchaseInvoiceId" TEXT,
    "warehouseId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsReceiptNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsReceiptItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "grnId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "warehouseId" TEXT NOT NULL,
    "binLocationId" TEXT,
    "batchCode" TEXT,
    "serialNo" TEXT,

    CONSTRAINT "GoodsReceiptItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockTransfer" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "transferDate" TIMESTAMP(3) NOT NULL,
    "status" "InventoryDocStatus" NOT NULL DEFAULT 'DRAFT',
    "fromWarehouseId" TEXT NOT NULL,
    "toWarehouseId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockTransferItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "transferId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "fromBinLocationId" TEXT,
    "toBinLocationId" TEXT,
    "batchCode" TEXT,
    "serialNo" TEXT,

    CONSTRAINT "StockTransferItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockCount" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "countDate" TIMESTAMP(3) NOT NULL,
    "status" "InventoryDocStatus" NOT NULL DEFAULT 'DRAFT',
    "warehouseId" TEXT NOT NULL,
    "notes" TEXT,
    "workflowDefinitionId" TEXT,
    "currentStepNo" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockCountItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "stockCountId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "countedQty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "binLocationId" TEXT,
    "batchCode" TEXT,
    "serialNo" TEXT,
    "systemQty" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "varianceQty" DECIMAL(18,4) NOT NULL DEFAULT 0,

    CONSTRAINT "StockCountItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsIssueNote" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "status" "InventoryDocStatus" NOT NULL DEFAULT 'DRAFT',
    "warehouseId" TEXT NOT NULL,
    "referenceType" TEXT,
    "referenceId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsIssueNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsIssueItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "warehouseId" TEXT NOT NULL,
    "binLocationId" TEXT,
    "batchCode" TEXT,
    "serialNo" TEXT,

    CONSTRAINT "GoodsIssueItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Putaway" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "putawayDate" TIMESTAMP(3) NOT NULL,
    "status" "InventoryDocStatus" NOT NULL DEFAULT 'DRAFT',
    "warehouseId" TEXT NOT NULL,
    "grnId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Putaway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PutawayItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "putawayId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "grnItemId" TEXT,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "fromBinLocationId" TEXT,
    "toBinLocationId" TEXT,
    "batchCode" TEXT,
    "serialNo" TEXT,

    CONSTRAINT "PutawayItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picking" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "pickingDate" TIMESTAMP(3) NOT NULL,
    "status" "InventoryDocStatus" NOT NULL DEFAULT 'DRAFT',
    "warehouseId" TEXT NOT NULL,
    "salesOrderId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Picking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickingItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "pickingId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "fromBinLocationId" TEXT,
    "pickedQty" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "batchCode" TEXT,
    "serialNo" TEXT,

    CONSTRAINT "PickingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Packing" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "packingDate" TIMESTAMP(3) NOT NULL,
    "status" "InventoryDocStatus" NOT NULL DEFAULT 'DRAFT',
    "warehouseId" TEXT NOT NULL,
    "salesOrderId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Packing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackingItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "packingId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "boxNo" TEXT,
    "height" DECIMAL(18,4),
    "length" DECIMAL(18,4),
    "trackingId" TEXT,
    "weight" DECIMAL(18,4),
    "width" DECIMAL(18,4),

    CONSTRAINT "PackingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QcInspection" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "grnId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "inspectionDate" TIMESTAMP(3) NOT NULL,
    "inspectorName" TEXT,
    "productionId" TEXT,
    "status" "InventoryDocStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "QcInspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QcInspectionItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "qcInspectionId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "sampleQty" DECIMAL(18,4) NOT NULL,
    "passedQty" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "failedQty" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "defectReason" TEXT,

    CONSTRAINT "QcInspectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemBatch" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" TIMESTAMP(3),

    CONSTRAINT "ItemBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSerial" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "ItemSerial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValuationLayer" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT,
    "postingDate" TIMESTAMP(3) NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "unitCost" DECIMAL(18,4) NOT NULL,
    "refType" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ValuationLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stage" "OpportunityStage" NOT NULL DEFAULT 'QUALIFICATION',
    "expectedValue" DECIMAL(18,2),
    "closeDate" TIMESTAMP(3),
    "leadId" TEXT,
    "customerId" TEXT,
    "ownerUserId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesActivity" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "subject" TEXT NOT NULL,
    "dueAt" TIMESTAMP(3),
    "status" "ActivityStatus" NOT NULL DEFAULT 'OPEN',
    "leadId" TEXT,
    "customerId" TEXT,
    "opportunityId" TEXT,
    "assignedToId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingCampaign" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" TEXT,
    "status" "CampaignStatus" NOT NULL DEFAULT 'PLANNED',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "budget" DECIMAL(18,2),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTicket" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "priority" "TicketPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "assignedToId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "actorUserId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationTemplate" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "module" TEXT,
    "eventKey" TEXT,
    "channel" "NotificationChannel" NOT NULL,
    "subject" TEXT,
    "body" TEXT NOT NULL,
    "variables" JSONB,
    "status" "NotificationTemplateStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationChannelConfig" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "provider" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "config" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationChannelConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationPreference" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventKey" TEXT NOT NULL,
    "emailEnabled" BOOLEAN NOT NULL DEFAULT true,
    "whatsappEnabled" BOOLEAN NOT NULL DEFAULT false,
    "smsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "inAppEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "recipientUserId" TEXT,
    "templateId" TEXT,
    "channel" "NotificationChannel" NOT NULL,
    "eventKey" TEXT,
    "title" TEXT,
    "message" TEXT NOT NULL,
    "payload" JSONB,
    "status" "NotificationLogStatus" NOT NULL DEFAULT 'PENDING',
    "externalId" TEXT,
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationSchedule" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdById" TEXT,
    "eventKey" TEXT NOT NULL,
    "channel" "NotificationChannel",
    "targetUserId" TEXT,
    "title" TEXT,
    "message" TEXT NOT NULL,
    "payload" JSONB,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "processedAt" TIMESTAMP(3),
    "status" "NotificationScheduleStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyProfile" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "tradeName" TEXT,
    "npwp" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "countryCode" TEXT DEFAULT 'ID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "phone" TEXT,
    "email" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "countryCode" TEXT DEFAULT 'ID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT,
    "isBase" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExchangeRate" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "baseCurrencyId" TEXT NOT NULL,
    "quoteCurrencyId" TEXT NOT NULL,
    "rate" DECIMAL(18,8) NOT NULL,
    "rateDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uom" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Uom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UomConversion" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "fromUomId" TEXT NOT NULL,
    "toUomId" TEXT NOT NULL,
    "factor" DECIMAL(18,8) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UomConversion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FiscalYear" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FiscalYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountingPeriod" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "fiscalYearId" TEXT NOT NULL,
    "periodNo" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountingPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoaAccount" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "parentId" TEXT,
    "isPosting" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoaAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostCenter" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CostCenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfitCenter" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfitCenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "entryNo" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "accountingPeriodId" TEXT,
    "totalDebit" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "totalCredit" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "referenceNo" TEXT,
    "journalType" TEXT NOT NULL DEFAULT 'GENERAL',

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalEntryLine" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "journalEntryId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "accountCode" TEXT NOT NULL,
    "description" TEXT,
    "debit" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "credit" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "referenceType" TEXT,
    "referenceId" TEXT,
    "costCenterId" TEXT,
    "profitCenterId" TEXT,

    CONSTRAINT "JournalEntryLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierInvoice" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "supplierCode" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "description" TEXT,
    "totalAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "taxAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "paidAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplierInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierInvoiceLine" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "taxCode" TEXT,
    "amount" DECIMAL(18,4) NOT NULL,

    CONSTRAINT "SupplierInvoiceLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierInvoicePayment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "reference" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupplierInvoicePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerInvoice" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "customerCode" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "description" TEXT,
    "totalAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "taxAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "paidAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerInvoiceLine" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "taxCode" TEXT,
    "amount" DECIMAL(18,4) NOT NULL,

    CONSTRAINT "CustomerInvoiceLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerInvoicePayment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "reference" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerInvoicePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedAsset" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "assetNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "purchaseCost" DECIMAL(18,4) NOT NULL,
    "usefulLife" INTEGER NOT NULL,
    "salvageValue" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "depreciationMethod" TEXT NOT NULL DEFAULT 'STRAIGHT_LINE',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FixedAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedAssetDepreciation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "periodDate" TIMESTAMP(3) NOT NULL,
    "depreciationAmount" DECIMAL(18,4) NOT NULL,
    "accumulatedAmount" DECIMAL(18,4) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FixedAssetDepreciation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bankName" TEXT,
    "accountType" TEXT NOT NULL DEFAULT 'CHECKING',
    "balance" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankTransaction" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "transDate" TIMESTAMP(3) NOT NULL,
    "transType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "reference" TEXT,
    "status" TEXT NOT NULL DEFAULT 'POSTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashAccount" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accountType" TEXT NOT NULL DEFAULT 'CASH',
    "balance" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashTransaction" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "cashAccountId" TEXT NOT NULL,
    "transDate" TIMESTAMP(3) NOT NULL,
    "transType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "reference" TEXT,
    "status" TEXT NOT NULL DEFAULT 'POSTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CashTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxCode" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rate" DECIMAL(18,4) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostCenterAllocation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "costCenterId" TEXT NOT NULL,
    "accountCode" TEXT NOT NULL,
    "allocatedAmount" DECIMAL(18,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referenceNo" TEXT,
    "description" TEXT,

    CONSTRAINT "CostCenterAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterCompanyTransaction" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "transNo" TEXT NOT NULL,
    "transDate" TIMESTAMP(3) NOT NULL,
    "fromCompanyId" TEXT NOT NULL,
    "toCompanyId" TEXT NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(18,4) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referenceNo" TEXT,
    "transactionType" TEXT NOT NULL DEFAULT 'FUND_TRANSFER',

    CONSTRAINT "InterCompanyTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankReconciliation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "reconcileDate" TIMESTAMP(3) NOT NULL,
    "statementDate" TIMESTAMP(3) NOT NULL,
    "statementBalance" DECIMAL(18,4) NOT NULL,
    "bookBalance" DECIMAL(18,4) NOT NULL,
    "difference" DECIMAL(18,4) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankReconciliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PettyCashReplenishment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "cashAccountId" TEXT NOT NULL,
    "requestNo" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referenceNo" TEXT,

    CONSTRAINT "PettyCashReplenishment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerReceipt" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "receiptNo" TEXT NOT NULL,
    "receiptDate" TIMESTAMP(3) NOT NULL,
    "customerCode" TEXT NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "reference" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'POSTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorPayment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "paymentNo" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "supplierCode" TEXT NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "reference" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'POSTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentRequest" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "requestNo" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "requesterId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "approvalStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetDisposal" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "disposalDate" TIMESTAMP(3) NOT NULL,
    "disposalNo" TEXT NOT NULL,
    "saleValue" DECIMAL(18,4) NOT NULL,
    "lossGain" DECIMAL(18,4) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssetDisposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "budgetNo" TEXT NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "periodNo" INTEGER,
    "accountCode" TEXT NOT NULL,
    "costCenterId" TEXT,
    "amount" DECIMAL(18,4) NOT NULL,
    "spentAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowDefinition" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "moduleKey" TEXT NOT NULL,
    "docType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowStep" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "definitionId" TEXT NOT NULL,
    "stepNo" INTEGER NOT NULL,
    "roleId" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "conditionType" TEXT,
    "conditionValue" DECIMAL(18,4),
    "slaHours" INTEGER NOT NULL DEFAULT 24,

    CONSTRAINT "WorkflowStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowRule" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "ruleKey" TEXT NOT NULL,
    "ruleOperator" TEXT NOT NULL,
    "ruleValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowInstance" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "definitionId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "docType" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "currentStepNo" INTEGER NOT NULL,
    "status" "WorkflowInstanceStatus" NOT NULL DEFAULT 'PENDING',
    "assignedToUserId" TEXT,
    "slaDueAt" TIMESTAMP(3),
    "escalatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprovalHistory" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "instanceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" "ApprovalAction" NOT NULL,
    "comment" TEXT,
    "fromUserId" TEXT,
    "toUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApprovalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delegation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Delegation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillOfMaterials" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "baseQty" DECIMAL(18,4) NOT NULL DEFAULT 1,
    "bomType" TEXT NOT NULL DEFAULT 'MANUFACTURING',
    "costingMethod" TEXT NOT NULL DEFAULT 'STANDARD',

    CONSTRAINT "BillOfMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillOfMaterialsItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "bomId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "componentItemId" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "scrapPercent" DECIMAL(5,2),
    "notes" TEXT,
    "issueMethod" TEXT NOT NULL DEFAULT 'BACKFLUSH',
    "operationNo" INTEGER,

    CONSTRAINT "BillOfMaterialsItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BomOperation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "bomId" TEXT NOT NULL,
    "operationNo" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "workstation" TEXT,
    "setupTime" DECIMAL(8,2),
    "cycleTime" DECIMAL(8,2),
    "laborScrap" DECIMAL(5,2),
    "notes" TEXT,

    CONSTRAINT "BomOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "bomId" TEXT,
    "finishedGoodItemId" TEXT NOT NULL,
    "qtyPlanned" DECIMAL(18,4) NOT NULL,
    "qtyProduced" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "uomCode" TEXT,
    "status" "ProductionDocStatus" NOT NULL DEFAULT 'DRAFT',
    "plannedStartDate" TIMESTAMP(3),
    "plannedEndDate" TIMESTAMP(3),
    "actualStartDate" TIMESTAMP(3),
    "actualEndDate" TIMESTAMP(3),
    "notes" TEXT,
    "workflowDefinitionId" TEXT,
    "currentStepNo" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "warehouseId" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 50,
    "workCenter" TEXT,
    "scheduleType" TEXT NOT NULL DEFAULT 'PLANNED',
    "mrpRunId" TEXT,
    "refDocType" TEXT,
    "refDocId" TEXT,
    "qtyRejected" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "qtyScrap" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "scrapPercent" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "targetWarehouseId" TEXT,
    "productionOrder" TEXT,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrderComponent" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,
    "qtyRequired" DECIMAL(18,4) NOT NULL,
    "qtyIssued" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "uomCode" TEXT,
    "qtyScrap" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "scrapPercent" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "issueMethod" TEXT NOT NULL DEFAULT 'BACKFLUSH',
    "operationNo" INTEGER,
    "warehouseId" TEXT,
    "notes" TEXT,

    CONSTRAINT "WorkOrderComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrderOperation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "operationNo" INTEGER NOT NULL,
    "description" TEXT,
    "workstation" TEXT,
    "qtyCompleted" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "laborHours" DECIMAL(8,2),
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "machineHours" DECIMAL(8,2),
    "setupTime" DECIMAL(8,2),
    "cycleTime" DECIMAL(8,2),
    "laborScrap" DECIMAL(8,4),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "actualLaborHours" DECIMAL(8,2),
    "notes" TEXT,
    "operatorName" TEXT,
    "claimedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "actualMachineHours" DECIMAL(8,2),
    "rejectedQty" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "scrapQty" DECIMAL(18,4) NOT NULL DEFAULT 0,

    CONSTRAINT "WorkOrderOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopFloorLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "operationId" TEXT,
    "operatorName" TEXT,
    "action" TEXT NOT NULL,
    "prevStatus" TEXT,
    "newStatus" TEXT,
    "qtyReported" DECIMAL(18,4),
    "laborHours" DECIMAL(8,2),
    "notes" TEXT,
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShopFloorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopFloorTimer" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "operationId" TEXT,
    "operatorName" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "durationMin" DECIMAL(8,2),
    "breakMin" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'RUNNING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShopFloorTimer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionIssue" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'POSTED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuedBy" TEXT,
    "warehouseId" TEXT,
    "purpose" TEXT,
    "shiftNo" INTEGER,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ProductionIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionIssueItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "qtyRequired" DECIMAL(18,4),
    "qtyScrap" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "costPrice" DECIMAL(18,4),
    "warehouseId" TEXT,
    "batchId" TEXT,
    "notes" TEXT,

    CONSTRAINT "ProductionIssueItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionReceipt" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "receiptDate" TIMESTAMP(3) NOT NULL,
    "qtyProduced" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,
    "status" TEXT NOT NULL DEFAULT 'POSTED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qtyRejected" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "qtyScrap" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "receivedBy" TEXT,
    "warehouseId" TEXT,
    "shiftNo" INTEGER,
    "batchNo" TEXT,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ProductionReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InProcessQc" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "qtyInspected" DECIMAL(18,4) NOT NULL,
    "qtyPassed" DECIMAL(18,4) NOT NULL,
    "qtyFailed" DECIMAL(18,4) NOT NULL,
    "notes" TEXT,
    "inspectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "inspectedBy" TEXT,
    "qcDate" TIMESTAMP(3),
    "disposition" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "InProcessQc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OPERATIONAL',
    "location" TEXT,
    "installedDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serialNumber" TEXT,
    "manufacturer" TEXT,
    "model" TEXT,
    "criticality" TEXT NOT NULL DEFAULT 'MEDIUM',
    "purchaseDate" TIMESTAMP(3),
    "warrantyExpiryDate" TIMESTAMP(3),
    "workCenterId" TEXT,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceSchedule" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "intervalDays" INTEGER NOT NULL,
    "lastDate" TIMESTAMP(3),
    "nextDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaintenanceSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceRequest" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "problem" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "assignedTo" TEXT,
    "resolvedDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaintenanceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "requestId" TEXT,
    "scheduleId" TEXT,
    "logDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "technicianName" TEXT NOT NULL,
    "workType" TEXT NOT NULL DEFAULT 'CORRECTIVE',
    "durationMin" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "totalCost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "laborCost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "partsCost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaintenanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceLogPart" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "maintenanceLogId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "qtyUsed" DECIMAL(18,4) NOT NULL,
    "unitCost" DECIMAL(18,2) NOT NULL,
    "totalCost" DECIMAL(18,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaintenanceLogPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceTask" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isMandatory" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaintenanceTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MrpRun" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "runDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "demandSource" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "planningHorizonDays" INTEGER NOT NULL DEFAULT 90,
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "planType" TEXT NOT NULL DEFAULT 'STANDARD',
    "includeSalesOrder" BOOLEAN NOT NULL DEFAULT true,
    "includeForecast" BOOLEAN NOT NULL DEFAULT false,
    "includeMinStock" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MrpRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MrpSuggestion" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "mrpRunId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "suggestionType" TEXT NOT NULL,
    "qtyRequired" DECIMAL(18,4) NOT NULL,
    "qtyOnHand" DECIMAL(18,4) NOT NULL,
    "qtyOnOrder" DECIMAL(18,4) NOT NULL,
    "qtySuggested" DECIMAL(18,4) NOT NULL,
    "dueDate" TIMESTAMP(3),
    "sourceDocType" TEXT,
    "sourceDocId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uomCode" TEXT,
    "unitCost" DECIMAL(18,4),
    "totalCost" DECIMAL(18,4),
    "workCenter" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 50,
    "suggestedDate" TIMESTAMP(3),
    "leadTimeDays" INTEGER,
    "bomId" TEXT,
    "workOrderId" TEXT,
    "notes" TEXT,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MrpSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionCost" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "materialCost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "laborCost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "overheadCost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "totalCost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "materialVariance" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "laborVariance" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "overheadVariance" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "standardCost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "actualCost" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "journalEntryId" TEXT,
    "isFinalized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductionCost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionCostDetail" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "productionCostId" TEXT NOT NULL,
    "costCategory" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "standardAmount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "actualAmount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "variance" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductionCostDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxInvoice" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT,
    "supplierId" TEXT,
    "baseAmount" DECIMAL(18,4) NOT NULL,
    "taxAmount" DECIMAL(18,4) NOT NULL,
    "invoiceType" TEXT NOT NULL DEFAULT 'OUTPUT',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "fpDate" TIMESTAMP(3),
    "fpNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerName" TEXT,
    "customerNpwp" TEXT,
    "customerAddress" TEXT,
    "customerNik" TEXT,
    "referenceType" TEXT,
    "referenceId" TEXT,
    "isReplacement" BOOLEAN NOT NULL DEFAULT false,
    "originalFpNumber" TEXT,
    "stampDuty" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "discountAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "taxPeriod" TEXT,
    "taxYear" INTEGER,
    "referenceNo" TEXT,

    CONSTRAINT "TaxInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NsfpRange" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "startNo" TEXT NOT NULL,
    "endNo" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "lastUsedNo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NsfpRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PphWithholding" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "transNo" TEXT NOT NULL,
    "transDate" TIMESTAMP(3) NOT NULL,
    "incomeType" TEXT NOT NULL,
    "taxpayerName" TEXT NOT NULL,
    "npwp" TEXT,
    "nik" TEXT,
    "grossAmount" DECIMAL(18,4) NOT NULL,
    "rate" DECIMAL(18,4) NOT NULL,
    "taxAmount" DECIMAL(18,4) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "bupotNo" TEXT,
    "bupotDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PphWithholding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxEqualization" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "bookIncome" DECIMAL(18,4) NOT NULL,
    "fiscalIncome" DECIMAL(18,4) NOT NULL,
    "difference" DECIMAL(18,4) NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxEqualization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdBilling" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "billingNo" TEXT NOT NULL,
    "taxType" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paidDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdBilling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeNo" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "department" TEXT,
    "position" TEXT,
    "hireDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "salary" DECIMAL(18,4),
    "managerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationUnit" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "parentId" TEXT,
    "managerId" TEXT,
    "type" TEXT NOT NULL DEFAULT 'DEPARTMENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizationUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "checkIn" TIMESTAMP(3),
    "checkOut" TIMESTAMP(3),
    "workHours" DECIMAL(5,2),
    "status" TEXT NOT NULL DEFAULT 'PRESENT',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isFlexi" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollRun" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "basicSalary" DECIMAL(18,4) NOT NULL,
    "allowances" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "deductions" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "grossPay" DECIMAL(18,4) NOT NULL,
    "netPay" DECIMAL(18,4) NOT NULL,
    "taxAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "payDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayrollRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseClaim" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "claimNo" TEXT NOT NULL,
    "claimDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpenseClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KpiEvaluation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "score" DECIMAL(5,2) NOT NULL,
    "grade" TEXT,
    "comments" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KpiEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecruitmentCandidate" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "candidateNo" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "position" TEXT,
    "status" TEXT NOT NULL DEFAULT 'APPLIED',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecruitmentCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FleetVehicle" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "plateNo" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "year" INTEGER,
    "ownershipType" "VehicleOwnershipType" NOT NULL DEFAULT 'OWNED',
    "capacityWeight" DECIMAL(18,4) NOT NULL,
    "capacityVolume" DECIMAL(18,4) NOT NULL,
    "status" "VehicleStatus" NOT NULL DEFAULT 'ACTIVE',
    "transporterId" TEXT,
    "stnkNo" TEXT,
    "stnkExpiry" TIMESTAMP(3),
    "kirNo" TEXT,
    "kirExpiry" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FleetVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogisticsDriver" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "employeeId" TEXT,
    "licenseType" "DriverLicenseType" NOT NULL,
    "licenseNo" TEXT,
    "licenseExpiry" TIMESTAMP(3),
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "status" "DriverStatus" NOT NULL DEFAULT 'ACTIVE',
    "transporterId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LogisticsDriver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transporter" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supplierId" TEXT,
    "contactName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteTemplate" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "warehouseId" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RouteTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripPlan" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "routeDate" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT,
    "driverId" TEXT,
    "routeTemplateId" TEXT,
    "status" "TripPlanStatus" NOT NULL DEFAULT 'PLANNED',
    "departureAt" TIMESTAMP(3),
    "returnAt" TIMESTAMP(3),
    "actualDepartureAt" TIMESTAMP(3),
    "actualReturnAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripCheckpoint" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "tripPlanId" TEXT NOT NULL,
    "checkpointType" "TripCheckpointType" NOT NULL,
    "locationName" TEXT,
    "latitude" DECIMAL(18,8),
    "longitude" DECIMAL(18,8),
    "timestamp" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "deliveryOrderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripCheckpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryOrder" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "shipmentId" TEXT,
    "salesOrderId" TEXT,
    "customerId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "tripPlanId" TEXT,
    "status" "DeliveryOrderStatus" NOT NULL DEFAULT 'DRAFT',
    "priority" "DeliveryPriority" NOT NULL DEFAULT 'NORMAL',
    "plannedShipDate" TIMESTAMP(3),
    "actualShipDate" TIMESTAMP(3),
    "deliveryAddress1" TEXT,
    "deliveryAddress2" TEXT,
    "deliveryCity" TEXT,
    "deliveryProvince" TEXT,
    "deliveryPostalCode" TEXT,
    "deliveryNotes" TEXT,
    "actualDeliveredAt" TIMESTAMP(3),
    "podToken" TEXT,
    "podTokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryOrderItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "deliveryOrderId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "orderedQty" DECIMAL(18,4) NOT NULL,
    "pickedQty" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "packedQty" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "shippedQty" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "deliveredQty" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "batchNo" TEXT,
    "serialNo" TEXT,

    CONSTRAINT "DeliveryOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProofOfDelivery" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "deliveryOrderId" TEXT NOT NULL,
    "receivedBy" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL,
    "signatureFileId" TEXT,
    "photoFileIds" TEXT[],
    "geoLat" DECIMAL(18,8),
    "geoLng" DECIMAL(18,8),
    "notes" TEXT,
    "status" "ProofOfDeliveryStatus" NOT NULL DEFAULT 'CAPTURED',
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProofOfDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryException" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "deliveryOrderId" TEXT NOT NULL,
    "tripPlanId" TEXT,
    "reason" "DeliveryExceptionReason" NOT NULL,
    "description" TEXT,
    "reportedAt" TIMESTAMP(3) NOT NULL,
    "reportedBy" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedAt" TIMESTAMP(3),
    "resolutionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeliveryException_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WavePicking" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "plannedDate" TIMESTAMP(3) NOT NULL,
    "status" "WavePickingStatus" NOT NULL DEFAULT 'DRAFT',
    "totalDoCount" INTEGER NOT NULL DEFAULT 0,
    "totalItemCount" INTEGER NOT NULL DEFAULT 0,
    "assignedTo" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WavePicking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StagingLoad" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "waveId" TEXT,
    "tripPlanId" TEXT,
    "warehouseId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "loadedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StagingLoad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackingList" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "deliveryOrderId" TEXT,
    "warehouseId" TEXT NOT NULL,
    "packingDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "packedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripCost" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "tripPlanId" TEXT NOT NULL,
    "costType" "TripCostType" NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(18,4) NOT NULL,
    "currencyCode" TEXT NOT NULL DEFAULT 'IDR',
    "supplierId" TEXT,
    "paymentRequestId" TEXT,
    "status" "TripCostStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedBy" TEXT,
    "submittedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "postedToFinance" BOOLEAN NOT NULL DEFAULT false,
    "journalEntryId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripCost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripLocation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "tripPlanId" TEXT NOT NULL,
    "vehicleId" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "accuracy" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripRouteTrace" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "tripPlanId" TEXT NOT NULL,
    "totalDistance" DOUBLE PRECISION,
    "totalDuration" INTEGER,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "TripRouteTrace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleMaintenance" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "maintenanceType" TEXT NOT NULL,
    "description" TEXT,
    "kmInterval" INTEGER,
    "dateInterval" INTEGER,
    "lastServiceAt" TIMESTAMP(3),
    "nextServiceAt" TIMESTAMP(3),
    "cost" DECIMAL(18,4),
    "vendorId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleMaintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleDocument" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT,
    "issueDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "fileId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverSchedule" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "shiftType" TEXT NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DriverSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverAvailability" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DriverAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogisticsPartner" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "partnerType" TEXT NOT NULL,
    "apiEndpoint" TEXT,
    "apiKey" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LogisticsPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerRate" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "originZone" TEXT,
    "destZone" TEXT,
    "rateWeight" DECIMAL(18,4) NOT NULL,
    "rateVolume" DECIMAL(18,4),
    "transitDays" INTEGER,
    "effectiveFrom" TIMESTAMP(3),
    "effectiveTo" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerShipment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "deliveryOrderId" TEXT,
    "partnerTrackingNo" TEXT,
    "ourDeliveryOrderId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "events" JSONB,
    "pickedUpAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerShipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KitDefinition" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "itemParentId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KitDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KitAssembly" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "kitDefinitionId" TEXT NOT NULL,
    "deliveryOrderId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "assembledBy" TEXT,
    "assembledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KitAssembly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "customerId" TEXT,
    "description" TEXT,
    "contractId" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "total_budget" DECIMAL(18,4),
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "retention_rate" DECIMAL(5,2) DEFAULT 5,
    "down_payment_total" DECIMAL(18,4) DEFAULT 0,
    "dp_recovery_rate" DECIMAL(5,2) DEFAULT 0,
    "billing_type" TEXT NOT NULL DEFAULT 'PROGRESS',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WbsTask" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "taskCode" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "parentTaskId" TEXT,
    "level" INTEGER NOT NULL DEFAULT 0,
    "plannedWeight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "plannedCost" DECIMAL(18,4),
    "actualProgress" DOUBLE PRECISION,
    "actualCost" DECIMAL(18,4),
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WbsTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectBudget" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "wbsTaskId" TEXT,
    "allocatedBudget" DECIMAL(18,4) NOT NULL,
    "committedAmount" DECIMAL(18,4),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tender" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "projectId" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "submissionDeadline" TIMESTAMP(3),
    "awardDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenderBid" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "price" DECIMAL(18,4) NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TenderBid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectContract" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "contractNo" TEXT NOT NULL,
    "supplierId" TEXT,
    "contractValue" DECIMAL(18,4) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractTermijn" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "termijnNo" INTEGER NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "percentage" DOUBLE PRECISION NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "ContractTermijn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyReport" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "morning_weather" TEXT,
    "afternoon_weather" TEXT,
    "evening_weather" TEXT,
    "manpower_summary" TEXT,
    "equipment_summary" TEXT,
    "material_summary" TEXT,
    "work_summary" TEXT,
    "progress_percent" DECIMAL(5,2) DEFAULT 0,
    "issues" TEXT,
    "safety_summary" TEXT,
    "incident_summary" TEXT,
    "visitor_summary" TEXT,
    "owner_instructions" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "submitted_by" TEXT,
    "approved_by" TEXT,
    "approved_at" TIMESTAMP(3),
    "wbs_task_id" TEXT,
    "site_manager_id" TEXT,
    "hse_officer_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SitePhoto" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "dailyReportId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "caption" TEXT,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SitePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubcontractorLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "dailyReportId" TEXT NOT NULL,
    "subcontractorName" TEXT NOT NULL,
    "workerCount" INTEGER NOT NULL,
    "workDescription" TEXT NOT NULL,

    CONSTRAINT "SubcontractorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceUsage" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "dailyReportId" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourceUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressInvoice" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "progress_claim_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "invoice_no" TEXT,
    "ar_invoice_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "period" TEXT,
    "progress_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "retention_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "retention_amount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "dp_deduction_amount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "vat_percent" DECIMAL(5,2) NOT NULL DEFAULT 11,
    "vat_amount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "net_amount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "gross_amount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "claim_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_retention_released" BOOLEAN NOT NULL DEFAULT false,
    "retention_released_at" TIMESTAMP(3),

    CONSTRAINT "ProgressInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressClaim" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "claim_no" TEXT NOT NULL,
    "claim_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "attachment_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgressClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCommitment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "wbsTaskId" TEXT,
    "commitmentType" TEXT NOT NULL,
    "referenceId" TEXT,
    "description" TEXT,
    "amount" DECIMAL(18,4) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectCommitment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThreeWayMatching" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "receiptId" TEXT NOT NULL,
    "matchDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'MATCHED',
    "discrepancyNotes" TEXT,
    "varianceAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThreeWayMatching_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockBalance" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "batchId" TEXT,
    "serialId" TEXT,
    "qtyOnHand" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "qtyAllocated" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "qtyAvailable" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "uomCode" TEXT,
    "lastReceiptDate" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "binLocationId" TEXT,

    CONSTRAINT "StockBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesSubscription" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "planName" TEXT NOT NULL,
    "billingCycle" TEXT NOT NULL DEFAULT 'MONTHLY',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "nextBillingDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalContract" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "contractNo" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "assetId" TEXT,
    "assetDescription" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "rentalRate" DECIMAL(18,4) NOT NULL,
    "depositAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "billingCycle" TEXT NOT NULL DEFAULT 'MONTHLY',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalBilling" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "billingNo" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "taxAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(18,4) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNPAID',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalBilling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalMaintenance" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "ticketNo" TEXT NOT NULL,
    "contractId" TEXT,
    "assetId" TEXT,
    "type" TEXT NOT NULL DEFAULT 'REPAIR',
    "priority" TEXT NOT NULL DEFAULT 'LOW',
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "completionDate" TIMESTAMP(3),
    "costAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
    "mechanicName" TEXT,
    "issueDescription" TEXT NOT NULL,
    "resolutionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalMaintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "durationHours" INTEGER NOT NULL DEFAULT 0,
    "mandatory" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseEnrollment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'ENROLLED',
    "score" INTEGER,
    "completedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerPortalUser" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "customerCode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "portalStatus" TEXT NOT NULL DEFAULT 'ACTIVE',
    "lastLoginAt" TIMESTAMP(3),
    "inviteSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerPortalUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerPortalActivity" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "portalUserId" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerPortalActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorPortalUser" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "supplierCode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "portalStatus" TEXT NOT NULL DEFAULT 'ACTIVE',
    "lastLoginAt" TIMESTAMP(3),
    "inviteSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorPortalUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorPortalActivity" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "portalUserId" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorPortalActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryForecast" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "forecastDate" TIMESTAMP(3) NOT NULL,
    "targetPeriod" TEXT NOT NULL,
    "confidenceScore" DECIMAL(5,2) NOT NULL,
    "predictedDemand" DECIMAL(18,4) NOT NULL,
    "recommendedQty" DECIMAL(18,4) NOT NULL,
    "trend" TEXT NOT NULL,
    "insights" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryForecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NonConformanceReport" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "itemId" TEXT,
    "qty" DECIMAL(18,4) NOT NULL,
    "ncrType" TEXT NOT NULL,
    "severity" "NcrSeverity" NOT NULL DEFAULT 'MEDIUM',
    "status" "NcrStatus" NOT NULL DEFAULT 'OPEN',
    "description" TEXT NOT NULL,
    "rootCause" TEXT,
    "disposition" "NcrDisposition" NOT NULL DEFAULT 'PENDING',
    "evidenceUrl" TEXT,
    "qcId" TEXT,
    "reportedById" TEXT NOT NULL,
    "assignedToId" TEXT,
    "stockJournalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NonConformanceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capa" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "sourceNcrId" TEXT,
    "description" TEXT NOT NULL,
    "rootCause" TEXT NOT NULL,
    "correctiveAction" TEXT NOT NULL,
    "preventiveAction" TEXT NOT NULL,
    "targetDate" TIMESTAMP(3),
    "status" "CapaStatus" NOT NULL DEFAULT 'DRAFT',
    "assignedToId" TEXT,
    "findings" TEXT,
    "evidenceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Capa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierRating" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "qualityScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ncrScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplierRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualityDocument" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "fileUrl" TEXT,
    "status" "QualityDocStatus" NOT NULL DEFAULT 'DRAFT',
    "effectiveDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "ownerId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QualityDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalibrationLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "calibrationDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "provider" TEXT NOT NULL,
    "certificateNo" TEXT,
    "certificateUrl" TEXT,
    "result" TEXT NOT NULL DEFAULT 'PASS',
    "status" "CalibrationStatus" NOT NULL DEFAULT 'COMPLETED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalibrationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FsmServiceOrder" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "contactName" TEXT,
    "contactPhone" TEXT,
    "serviceType" "FsmServiceType" NOT NULL DEFAULT 'MAINTENANCE',
    "priority" "TicketPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "FsmServiceOrderStatus" NOT NULL DEFAULT 'DRAFT',
    "subject" TEXT NOT NULL,
    "description" TEXT,
    "locationAddress" TEXT,
    "coordinateLat" DOUBLE PRECISION,
    "coordinateLng" DOUBLE PRECISION,
    "slaDate" TIMESTAMP(3),
    "preferredDate" TIMESTAMP(3),
    "totalEstimatedDuration" INTEGER NOT NULL DEFAULT 60,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FsmServiceOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FsmServiceOrderItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "serviceOrderId" TEXT NOT NULL,
    "lineNo" INTEGER NOT NULL,
    "itemId" TEXT,
    "description" TEXT NOT NULL,
    "qty" DECIMAL(18,4) NOT NULL,
    "uomCode" TEXT,

    CONSTRAINT "FsmServiceOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FsmServiceAppointment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "serviceOrderId" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "status" "FsmAppointmentStatus" NOT NULL DEFAULT 'ASSIGNED',
    "scheduledStart" TIMESTAMP(3) NOT NULL,
    "scheduledEnd" TIMESTAMP(3) NOT NULL,
    "actualStart" TIMESTAMP(3),
    "actualEnd" TIMESTAMP(3),
    "travelTimeMin" INTEGER,
    "workingTimeMin" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FsmServiceAppointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FsmServiceReport" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "resolution" TEXT,
    "signatureUrl" TEXT,
    "photoUrls" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FsmServiceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FsmSparePartCompatibility" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FsmSparePartCompatibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FsmHandover" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "serviceOrderId" TEXT,
    "customerId" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "equipmentId" TEXT,
    "handoverDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "recipientName" TEXT NOT NULL,
    "recipientPhone" TEXT,
    "recipientTitle" TEXT,
    "checklist" JSONB,
    "photos" JSONB,
    "clientSignature" TEXT,
    "technicianSignature" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FsmHandover_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_name_key" ON "Tenant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Lead_tenantId_status_idx" ON "Lead"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_tenantId_code_key" ON "Lead"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_tenantId_code_key" ON "Customer"("tenantId", "code");

-- CreateIndex
CREATE INDEX "SalesQuotation_tenantId_customerId_idx" ON "SalesQuotation"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "SalesQuotation_tenantId_status_idx" ON "SalesQuotation"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SalesQuotation_tenantId_code_key" ON "SalesQuotation"("tenantId", "code");

-- CreateIndex
CREATE INDEX "SalesQuotationItem_tenantId_quotationId_idx" ON "SalesQuotationItem"("tenantId", "quotationId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesQuotationItem_tenantId_quotationId_lineNo_key" ON "SalesQuotationItem"("tenantId", "quotationId", "lineNo");

-- CreateIndex
CREATE INDEX "SalesOrder_tenantId_customerId_idx" ON "SalesOrder"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "SalesOrder_tenantId_status_idx" ON "SalesOrder"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SalesOrder_tenantId_code_key" ON "SalesOrder"("tenantId", "code");

-- CreateIndex
CREATE INDEX "SalesOrderItem_tenantId_orderId_idx" ON "SalesOrderItem"("tenantId", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesOrderItem_tenantId_orderId_lineNo_key" ON "SalesOrderItem"("tenantId", "orderId", "lineNo");

-- CreateIndex
CREATE INDEX "SalesInvoice_tenantId_customerId_idx" ON "SalesInvoice"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "SalesInvoice_tenantId_status_idx" ON "SalesInvoice"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SalesInvoice_tenantId_code_key" ON "SalesInvoice"("tenantId", "code");

-- CreateIndex
CREATE INDEX "SalesInvoiceItem_tenantId_invoiceId_idx" ON "SalesInvoiceItem"("tenantId", "invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesInvoiceItem_tenantId_invoiceId_lineNo_key" ON "SalesInvoiceItem"("tenantId", "invoiceId", "lineNo");

-- CreateIndex
CREATE INDEX "SalesReturn_tenantId_customerId_idx" ON "SalesReturn"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "SalesReturn_tenantId_status_idx" ON "SalesReturn"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SalesReturn_tenantId_code_key" ON "SalesReturn"("tenantId", "code");

-- CreateIndex
CREATE INDEX "SalesReturnItem_tenantId_returnId_idx" ON "SalesReturnItem"("tenantId", "returnId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesReturnItem_tenantId_returnId_lineNo_key" ON "SalesReturnItem"("tenantId", "returnId", "lineNo");

-- CreateIndex
CREATE INDEX "PriceList_tenantId_isActive_idx" ON "PriceList"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "PriceList_tenantId_code_key" ON "PriceList"("tenantId", "code");

-- CreateIndex
CREATE INDEX "PriceListItem_tenantId_priceListId_idx" ON "PriceListItem"("tenantId", "priceListId");

-- CreateIndex
CREATE INDEX "PriceListItem_tenantId_itemCode_idx" ON "PriceListItem"("tenantId", "itemCode");

-- CreateIndex
CREATE INDEX "PriceListItem_tenantId_customerId_idx" ON "PriceListItem"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "PriceRule_tenantId_isActive_idx" ON "PriceRule"("tenantId", "isActive");

-- CreateIndex
CREATE INDEX "PriceRule_tenantId_itemCode_effectiveDate_idx" ON "PriceRule"("tenantId", "itemCode", "effectiveDate");

-- CreateIndex
CREATE INDEX "PriceRule_tenantId_customerId_idx" ON "PriceRule"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "PriceRule_tenantId_customerGroup_idx" ON "PriceRule"("tenantId", "customerGroup");

-- CreateIndex
CREATE UNIQUE INDEX "PriceRule_tenantId_code_key" ON "PriceRule"("tenantId", "code");

-- CreateIndex
CREATE INDEX "DiscountRule_tenantId_isActive_idx" ON "DiscountRule"("tenantId", "isActive");

-- CreateIndex
CREATE INDEX "DiscountRule_tenantId_effectiveDate_idx" ON "DiscountRule"("tenantId", "effectiveDate");

-- CreateIndex
CREATE INDEX "DiscountRule_tenantId_itemCode_idx" ON "DiscountRule"("tenantId", "itemCode");

-- CreateIndex
CREATE INDEX "DiscountRule_tenantId_customerId_idx" ON "DiscountRule"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "DiscountRule_tenantId_customerGroup_idx" ON "DiscountRule"("tenantId", "customerGroup");

-- CreateIndex
CREATE UNIQUE INDEX "DiscountRule_tenantId_code_key" ON "DiscountRule"("tenantId", "code");

-- CreateIndex
CREATE INDEX "Carrier_tenantId_isActive_idx" ON "Carrier"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_tenantId_code_key" ON "Carrier"("tenantId", "code");

-- CreateIndex
CREATE INDEX "Shipment_tenantId_status_idx" ON "Shipment"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_tenantId_code_key" ON "Shipment"("tenantId", "code");

-- CreateIndex
CREATE INDEX "CommissionScheme_tenantId_isActive_idx" ON "CommissionScheme"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "CommissionScheme_tenantId_code_key" ON "CommissionScheme"("tenantId", "code");

-- CreateIndex
CREATE INDEX "CommissionEntry_tenantId_schemeId_idx" ON "CommissionEntry"("tenantId", "schemeId");

-- CreateIndex
CREATE INDEX "Supplier_tenantId_isActive_idx" ON "Supplier"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_tenantId_code_key" ON "Supplier"("tenantId", "code");

-- CreateIndex
CREATE INDEX "PurchaseRequisition_tenantId_status_idx" ON "PurchaseRequisition"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseRequisition_tenantId_code_key" ON "PurchaseRequisition"("tenantId", "code");

-- CreateIndex
CREATE INDEX "PurchaseRequisitionItem_tenantId_requisitionId_idx" ON "PurchaseRequisitionItem"("tenantId", "requisitionId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseRequisitionItem_tenantId_requisitionId_lineNo_key" ON "PurchaseRequisitionItem"("tenantId", "requisitionId", "lineNo");

-- CreateIndex
CREATE INDEX "Rfq_tenantId_status_idx" ON "Rfq"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Rfq_tenantId_code_key" ON "Rfq"("tenantId", "code");

-- CreateIndex
CREATE INDEX "RfqVendor_tenantId_rfqId_idx" ON "RfqVendor"("tenantId", "rfqId");

-- CreateIndex
CREATE UNIQUE INDEX "RfqVendor_tenantId_rfqId_supplierId_key" ON "RfqVendor"("tenantId", "rfqId", "supplierId");

-- CreateIndex
CREATE INDEX "RfqItem_tenantId_rfqId_idx" ON "RfqItem"("tenantId", "rfqId");

-- CreateIndex
CREATE UNIQUE INDEX "RfqItem_tenantId_rfqId_lineNo_key" ON "RfqItem"("tenantId", "rfqId", "lineNo");

-- CreateIndex
CREATE INDEX "PurchaseOrder_tenantId_status_idx" ON "PurchaseOrder"("tenantId", "status");

-- CreateIndex
CREATE INDEX "PurchaseOrder_tenantId_supplierId_idx" ON "PurchaseOrder"("tenantId", "supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_tenantId_code_key" ON "PurchaseOrder"("tenantId", "code");

-- CreateIndex
CREATE INDEX "PurchaseOrderItem_tenantId_orderId_idx" ON "PurchaseOrderItem"("tenantId", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrderItem_tenantId_orderId_lineNo_key" ON "PurchaseOrderItem"("tenantId", "orderId", "lineNo");

-- CreateIndex
CREATE INDEX "PurchaseInvoice_tenantId_status_idx" ON "PurchaseInvoice"("tenantId", "status");

-- CreateIndex
CREATE INDEX "PurchaseInvoice_tenantId_supplierId_idx" ON "PurchaseInvoice"("tenantId", "supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseInvoice_tenantId_code_key" ON "PurchaseInvoice"("tenantId", "code");

-- CreateIndex
CREATE INDEX "PurchaseInvoiceItem_tenantId_invoiceId_idx" ON "PurchaseInvoiceItem"("tenantId", "invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseInvoiceItem_tenantId_invoiceId_lineNo_key" ON "PurchaseInvoiceItem"("tenantId", "invoiceId", "lineNo");

-- CreateIndex
CREATE INDEX "LandedCostVoucher_tenantId_costDate_idx" ON "LandedCostVoucher"("tenantId", "costDate");

-- CreateIndex
CREATE UNIQUE INDEX "LandedCostVoucher_tenantId_code_key" ON "LandedCostVoucher"("tenantId", "code");

-- CreateIndex
CREATE INDEX "LandedCostAllocation_tenantId_landedCostId_idx" ON "LandedCostAllocation"("tenantId", "landedCostId");

-- CreateIndex
CREATE UNIQUE INDEX "LandedCostAllocation_tenantId_landedCostId_lineNo_key" ON "LandedCostAllocation"("tenantId", "landedCostId", "lineNo");

-- CreateIndex
CREATE INDEX "PurchaseReturn_tenantId_status_idx" ON "PurchaseReturn"("tenantId", "status");

-- CreateIndex
CREATE INDEX "PurchaseReturn_tenantId_supplierId_idx" ON "PurchaseReturn"("tenantId", "supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseReturn_tenantId_code_key" ON "PurchaseReturn"("tenantId", "code");

-- CreateIndex
CREATE INDEX "PurchaseReturnItem_tenantId_returnId_idx" ON "PurchaseReturnItem"("tenantId", "returnId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseReturnItem_tenantId_returnId_lineNo_key" ON "PurchaseReturnItem"("tenantId", "returnId", "lineNo");

-- CreateIndex
CREATE INDEX "ItemGroup_tenantId_isActive_idx" ON "ItemGroup"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ItemGroup_tenantId_code_key" ON "ItemGroup"("tenantId", "code");

-- CreateIndex
CREATE INDEX "Item_tenantId_isActive_idx" ON "Item"("tenantId", "isActive");

-- CreateIndex
CREATE INDEX "Item_tenantId_itemGroupId_idx" ON "Item"("tenantId", "itemGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_tenantId_code_key" ON "Item"("tenantId", "code");

-- CreateIndex
CREATE INDEX "ItemUom_tenantId_itemId_idx" ON "ItemUom"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemUom_tenantId_itemId_uomCode_key" ON "ItemUom"("tenantId", "itemId", "uomCode");

-- CreateIndex
CREATE INDEX "ItemBarcode_tenantId_itemId_idx" ON "ItemBarcode"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemBarcode_tenantId_barcode_key" ON "ItemBarcode"("tenantId", "barcode");

-- CreateIndex
CREATE INDEX "Warehouse_tenantId_isActive_idx" ON "Warehouse"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_tenantId_code_key" ON "Warehouse"("tenantId", "code");

-- CreateIndex
CREATE INDEX "BinLocation_tenantId_warehouseId_idx" ON "BinLocation"("tenantId", "warehouseId");

-- CreateIndex
CREATE INDEX "BinLocation_tenantId_isActive_idx" ON "BinLocation"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "BinLocation_tenantId_warehouseId_code_key" ON "BinLocation"("tenantId", "warehouseId", "code");

-- CreateIndex
CREATE INDEX "StockLedger_tenantId_postingDate_idx" ON "StockLedger"("tenantId", "postingDate");

-- CreateIndex
CREATE INDEX "StockLedger_tenantId_itemId_idx" ON "StockLedger"("tenantId", "itemId");

-- CreateIndex
CREATE INDEX "StockLedger_tenantId_warehouseId_idx" ON "StockLedger"("tenantId", "warehouseId");

-- CreateIndex
CREATE INDEX "StockLedger_tenantId_binLocationId_idx" ON "StockLedger"("tenantId", "binLocationId");

-- CreateIndex
CREATE INDEX "GoodsReceiptNote_tenantId_status_idx" ON "GoodsReceiptNote"("tenantId", "status");

-- CreateIndex
CREATE INDEX "GoodsReceiptNote_tenantId_receiptDate_idx" ON "GoodsReceiptNote"("tenantId", "receiptDate");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsReceiptNote_tenantId_code_key" ON "GoodsReceiptNote"("tenantId", "code");

-- CreateIndex
CREATE INDEX "GoodsReceiptItem_tenantId_grnId_idx" ON "GoodsReceiptItem"("tenantId", "grnId");

-- CreateIndex
CREATE INDEX "GoodsReceiptItem_tenantId_itemId_idx" ON "GoodsReceiptItem"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsReceiptItem_tenantId_grnId_lineNo_key" ON "GoodsReceiptItem"("tenantId", "grnId", "lineNo");

-- CreateIndex
CREATE INDEX "StockTransfer_tenantId_status_idx" ON "StockTransfer"("tenantId", "status");

-- CreateIndex
CREATE INDEX "StockTransfer_tenantId_transferDate_idx" ON "StockTransfer"("tenantId", "transferDate");

-- CreateIndex
CREATE UNIQUE INDEX "StockTransfer_tenantId_code_key" ON "StockTransfer"("tenantId", "code");

-- CreateIndex
CREATE INDEX "StockTransferItem_tenantId_transferId_idx" ON "StockTransferItem"("tenantId", "transferId");

-- CreateIndex
CREATE INDEX "StockTransferItem_tenantId_itemId_idx" ON "StockTransferItem"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "StockTransferItem_tenantId_transferId_lineNo_key" ON "StockTransferItem"("tenantId", "transferId", "lineNo");

-- CreateIndex
CREATE INDEX "StockCount_tenantId_status_idx" ON "StockCount"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "StockCount_tenantId_code_key" ON "StockCount"("tenantId", "code");

-- CreateIndex
CREATE INDEX "StockCountItem_tenantId_stockCountId_idx" ON "StockCountItem"("tenantId", "stockCountId");

-- CreateIndex
CREATE INDEX "StockCountItem_tenantId_itemId_idx" ON "StockCountItem"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "StockCountItem_tenantId_stockCountId_lineNo_key" ON "StockCountItem"("tenantId", "stockCountId", "lineNo");

-- CreateIndex
CREATE INDEX "GoodsIssueNote_tenantId_status_idx" ON "GoodsIssueNote"("tenantId", "status");

-- CreateIndex
CREATE INDEX "GoodsIssueNote_tenantId_issueDate_idx" ON "GoodsIssueNote"("tenantId", "issueDate");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsIssueNote_tenantId_code_key" ON "GoodsIssueNote"("tenantId", "code");

-- CreateIndex
CREATE INDEX "GoodsIssueItem_tenantId_issueId_idx" ON "GoodsIssueItem"("tenantId", "issueId");

-- CreateIndex
CREATE INDEX "GoodsIssueItem_tenantId_itemId_idx" ON "GoodsIssueItem"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsIssueItem_tenantId_issueId_lineNo_key" ON "GoodsIssueItem"("tenantId", "issueId", "lineNo");

-- CreateIndex
CREATE INDEX "Putaway_tenantId_status_idx" ON "Putaway"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Putaway_tenantId_code_key" ON "Putaway"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "PutawayItem_tenantId_putawayId_lineNo_key" ON "PutawayItem"("tenantId", "putawayId", "lineNo");

-- CreateIndex
CREATE INDEX "Picking_tenantId_status_idx" ON "Picking"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Picking_tenantId_code_key" ON "Picking"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "PickingItem_tenantId_pickingId_lineNo_key" ON "PickingItem"("tenantId", "pickingId", "lineNo");

-- CreateIndex
CREATE INDEX "Packing_tenantId_status_idx" ON "Packing"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Packing_tenantId_code_key" ON "Packing"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "PackingItem_tenantId_packingId_lineNo_key" ON "PackingItem"("tenantId", "packingId", "lineNo");

-- CreateIndex
CREATE INDEX "QcInspection_tenantId_status_idx" ON "QcInspection"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "QcInspection_tenantId_code_key" ON "QcInspection"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "QcInspectionItem_tenantId_qcInspectionId_lineNo_key" ON "QcInspectionItem"("tenantId", "qcInspectionId", "lineNo");

-- CreateIndex
CREATE INDEX "ItemBatch_tenantId_itemId_idx" ON "ItemBatch"("tenantId", "itemId");

-- CreateIndex
CREATE INDEX "ItemBatch_tenantId_expiryDate_idx" ON "ItemBatch"("tenantId", "expiryDate");

-- CreateIndex
CREATE UNIQUE INDEX "ItemBatch_tenantId_itemId_code_key" ON "ItemBatch"("tenantId", "itemId", "code");

-- CreateIndex
CREATE INDEX "ItemSerial_tenantId_itemId_idx" ON "ItemSerial"("tenantId", "itemId");

-- CreateIndex
CREATE INDEX "ItemSerial_tenantId_status_idx" ON "ItemSerial"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ItemSerial_tenantId_serialNo_key" ON "ItemSerial"("tenantId", "serialNo");

-- CreateIndex
CREATE INDEX "ValuationLayer_tenantId_postingDate_idx" ON "ValuationLayer"("tenantId", "postingDate");

-- CreateIndex
CREATE INDEX "ValuationLayer_tenantId_itemId_idx" ON "ValuationLayer"("tenantId", "itemId");

-- CreateIndex
CREATE INDEX "Opportunity_tenantId_stage_idx" ON "Opportunity"("tenantId", "stage");

-- CreateIndex
CREATE UNIQUE INDEX "Opportunity_tenantId_code_key" ON "Opportunity"("tenantId", "code");

-- CreateIndex
CREATE INDEX "SalesActivity_tenantId_status_idx" ON "SalesActivity"("tenantId", "status");

-- CreateIndex
CREATE INDEX "SalesActivity_tenantId_type_idx" ON "SalesActivity"("tenantId", "type");

-- CreateIndex
CREATE INDEX "MarketingCampaign_tenantId_status_idx" ON "MarketingCampaign"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "MarketingCampaign_tenantId_code_key" ON "MarketingCampaign"("tenantId", "code");

-- CreateIndex
CREATE INDEX "ServiceTicket_tenantId_status_idx" ON "ServiceTicket"("tenantId", "status");

-- CreateIndex
CREATE INDEX "ServiceTicket_tenantId_priority_idx" ON "ServiceTicket"("tenantId", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTicket_tenantId_code_key" ON "ServiceTicket"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Role_tenantId_name_key" ON "Role"("tenantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_key_key" ON "Permission"("key");

-- CreateIndex
CREATE INDEX "NotificationTemplate_tenantId_module_idx" ON "NotificationTemplate"("tenantId", "module");

-- CreateIndex
CREATE INDEX "NotificationTemplate_tenantId_eventKey_idx" ON "NotificationTemplate"("tenantId", "eventKey");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationTemplate_tenantId_key_channel_key" ON "NotificationTemplate"("tenantId", "key", "channel");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationChannelConfig_tenantId_channel_key" ON "NotificationChannelConfig"("tenantId", "channel");

-- CreateIndex
CREATE INDEX "NotificationPreference_tenantId_userId_idx" ON "NotificationPreference"("tenantId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreference_userId_eventKey_key" ON "NotificationPreference"("userId", "eventKey");

-- CreateIndex
CREATE INDEX "NotificationLog_tenantId_channel_status_idx" ON "NotificationLog"("tenantId", "channel", "status");

-- CreateIndex
CREATE INDEX "NotificationLog_tenantId_recipientUserId_createdAt_idx" ON "NotificationLog"("tenantId", "recipientUserId", "createdAt");

-- CreateIndex
CREATE INDEX "NotificationLog_tenantId_eventKey_idx" ON "NotificationLog"("tenantId", "eventKey");

-- CreateIndex
CREATE INDEX "NotificationSchedule_tenantId_scheduledFor_status_idx" ON "NotificationSchedule"("tenantId", "scheduledFor", "status");

-- CreateIndex
CREATE INDEX "NotificationSchedule_tenantId_eventKey_idx" ON "NotificationSchedule"("tenantId", "eventKey");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfile_tenantId_key" ON "CompanyProfile"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_tenantId_code_key" ON "Branch"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_tenantId_code_key" ON "Currency"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeRate_tenantId_baseCurrencyId_quoteCurrencyId_rateDa_key" ON "ExchangeRate"("tenantId", "baseCurrencyId", "quoteCurrencyId", "rateDate");

-- CreateIndex
CREATE UNIQUE INDEX "Uom_tenantId_code_key" ON "Uom"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "UomConversion_tenantId_fromUomId_toUomId_key" ON "UomConversion"("tenantId", "fromUomId", "toUomId");

-- CreateIndex
CREATE UNIQUE INDEX "FiscalYear_tenantId_code_key" ON "FiscalYear"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "AccountingPeriod_tenantId_fiscalYearId_periodNo_key" ON "AccountingPeriod"("tenantId", "fiscalYearId", "periodNo");

-- CreateIndex
CREATE UNIQUE INDEX "CoaAccount_tenantId_code_key" ON "CoaAccount"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "CostCenter_tenantId_code_key" ON "CostCenter"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "ProfitCenter_tenantId_code_key" ON "ProfitCenter"("tenantId", "code");

-- CreateIndex
CREATE INDEX "JournalEntry_tenantId_entryDate_idx" ON "JournalEntry"("tenantId", "entryDate");

-- CreateIndex
CREATE INDEX "JournalEntry_tenantId_status_idx" ON "JournalEntry"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_tenantId_entryNo_key" ON "JournalEntry"("tenantId", "entryNo");

-- CreateIndex
CREATE INDEX "JournalEntryLine_tenantId_journalEntryId_idx" ON "JournalEntryLine"("tenantId", "journalEntryId");

-- CreateIndex
CREATE INDEX "JournalEntryLine_tenantId_accountCode_idx" ON "JournalEntryLine"("tenantId", "accountCode");

-- CreateIndex
CREATE INDEX "SupplierInvoice_tenantId_status_idx" ON "SupplierInvoice"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierInvoice_tenantId_invoiceNo_key" ON "SupplierInvoice"("tenantId", "invoiceNo");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierInvoiceLine_tenantId_invoiceId_lineNo_key" ON "SupplierInvoiceLine"("tenantId", "invoiceId", "lineNo");

-- CreateIndex
CREATE INDEX "SupplierInvoicePayment_tenantId_invoiceId_idx" ON "SupplierInvoicePayment"("tenantId", "invoiceId");

-- CreateIndex
CREATE INDEX "CustomerInvoice_tenantId_status_idx" ON "CustomerInvoice"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerInvoice_tenantId_invoiceNo_key" ON "CustomerInvoice"("tenantId", "invoiceNo");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerInvoiceLine_tenantId_invoiceId_lineNo_key" ON "CustomerInvoiceLine"("tenantId", "invoiceId", "lineNo");

-- CreateIndex
CREATE INDEX "CustomerInvoicePayment_tenantId_invoiceId_idx" ON "CustomerInvoicePayment"("tenantId", "invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "FixedAsset_tenantId_assetNo_key" ON "FixedAsset"("tenantId", "assetNo");

-- CreateIndex
CREATE INDEX "FixedAssetDepreciation_tenantId_assetId_idx" ON "FixedAssetDepreciation"("tenantId", "assetId");

-- CreateIndex
CREATE INDEX "BankAccount_tenantId_isActive_idx" ON "BankAccount"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_tenantId_accountNo_key" ON "BankAccount"("tenantId", "accountNo");

-- CreateIndex
CREATE INDEX "BankTransaction_tenantId_bankAccountId_idx" ON "BankTransaction"("tenantId", "bankAccountId");

-- CreateIndex
CREATE INDEX "BankTransaction_tenantId_transDate_idx" ON "BankTransaction"("tenantId", "transDate");

-- CreateIndex
CREATE UNIQUE INDEX "CashAccount_tenantId_accountNo_key" ON "CashAccount"("tenantId", "accountNo");

-- CreateIndex
CREATE INDEX "CashTransaction_tenantId_cashAccountId_idx" ON "CashTransaction"("tenantId", "cashAccountId");

-- CreateIndex
CREATE INDEX "CashTransaction_tenantId_transDate_idx" ON "CashTransaction"("tenantId", "transDate");

-- CreateIndex
CREATE UNIQUE INDEX "TaxCode_tenantId_code_key" ON "TaxCode"("tenantId", "code");

-- CreateIndex
CREATE INDEX "CostCenterAllocation_tenantId_periodId_idx" ON "CostCenterAllocation"("tenantId", "periodId");

-- CreateIndex
CREATE UNIQUE INDEX "InterCompanyTransaction_tenantId_transNo_key" ON "InterCompanyTransaction"("tenantId", "transNo");

-- CreateIndex
CREATE INDEX "BankReconciliation_tenantId_bankAccountId_idx" ON "BankReconciliation"("tenantId", "bankAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "PettyCashReplenishment_tenantId_requestNo_key" ON "PettyCashReplenishment"("tenantId", "requestNo");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerReceipt_tenantId_receiptNo_key" ON "CustomerReceipt"("tenantId", "receiptNo");

-- CreateIndex
CREATE UNIQUE INDEX "VendorPayment_tenantId_paymentNo_key" ON "VendorPayment"("tenantId", "paymentNo");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentRequest_tenantId_requestNo_key" ON "PaymentRequest"("tenantId", "requestNo");

-- CreateIndex
CREATE UNIQUE INDEX "AssetDisposal_tenantId_disposalNo_key" ON "AssetDisposal"("tenantId", "disposalNo");

-- CreateIndex
CREATE INDEX "Budget_tenantId_fiscalYear_idx" ON "Budget"("tenantId", "fiscalYear");

-- CreateIndex
CREATE INDEX "WorkflowDefinition_tenantId_moduleKey_docType_idx" ON "WorkflowDefinition"("tenantId", "moduleKey", "docType");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowDefinition_tenantId_name_key" ON "WorkflowDefinition"("tenantId", "name");

-- CreateIndex
CREATE INDEX "WorkflowStep_tenantId_definitionId_idx" ON "WorkflowStep"("tenantId", "definitionId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowStep_tenantId_definitionId_stepNo_key" ON "WorkflowStep"("tenantId", "definitionId", "stepNo");

-- CreateIndex
CREATE INDEX "WorkflowRule_tenantId_stepId_idx" ON "WorkflowRule"("tenantId", "stepId");

-- CreateIndex
CREATE INDEX "WorkflowInstance_tenantId_docType_docId_idx" ON "WorkflowInstance"("tenantId", "docType", "docId");

-- CreateIndex
CREATE INDEX "WorkflowInstance_tenantId_status_idx" ON "WorkflowInstance"("tenantId", "status");

-- CreateIndex
CREATE INDEX "WorkflowInstance_tenantId_assignedToUserId_idx" ON "WorkflowInstance"("tenantId", "assignedToUserId");

-- CreateIndex
CREATE INDEX "WorkflowInstance_tenantId_slaDueAt_idx" ON "WorkflowInstance"("tenantId", "slaDueAt");

-- CreateIndex
CREATE INDEX "ApprovalHistory_tenantId_instanceId_idx" ON "ApprovalHistory"("tenantId", "instanceId");

-- CreateIndex
CREATE INDEX "ApprovalHistory_tenantId_userId_idx" ON "ApprovalHistory"("tenantId", "userId");

-- CreateIndex
CREATE INDEX "ApprovalHistory_tenantId_createdAt_idx" ON "ApprovalHistory"("tenantId", "createdAt");

-- CreateIndex
CREATE INDEX "Delegation_tenantId_fromUserId_idx" ON "Delegation"("tenantId", "fromUserId");

-- CreateIndex
CREATE INDEX "Delegation_tenantId_toUserId_idx" ON "Delegation"("tenantId", "toUserId");

-- CreateIndex
CREATE INDEX "Delegation_tenantId_isActive_startDate_endDate_idx" ON "Delegation"("tenantId", "isActive", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "BillOfMaterials_tenantId_isActive_idx" ON "BillOfMaterials"("tenantId", "isActive");

-- CreateIndex
CREATE INDEX "BillOfMaterials_tenantId_itemId_idx" ON "BillOfMaterials"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "BillOfMaterials_tenantId_code_key" ON "BillOfMaterials"("tenantId", "code");

-- CreateIndex
CREATE INDEX "BillOfMaterialsItem_tenantId_bomId_idx" ON "BillOfMaterialsItem"("tenantId", "bomId");

-- CreateIndex
CREATE UNIQUE INDEX "BillOfMaterialsItem_tenantId_bomId_lineNo_key" ON "BillOfMaterialsItem"("tenantId", "bomId", "lineNo");

-- CreateIndex
CREATE UNIQUE INDEX "BomOperation_tenantId_bomId_operationNo_key" ON "BomOperation"("tenantId", "bomId", "operationNo");

-- CreateIndex
CREATE INDEX "WorkOrder_tenantId_status_idx" ON "WorkOrder"("tenantId", "status");

-- CreateIndex
CREATE INDEX "WorkOrder_tenantId_priority_idx" ON "WorkOrder"("tenantId", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrder_tenantId_code_key" ON "WorkOrder"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderComponent_tenantId_workOrderId_lineNo_key" ON "WorkOrderComponent"("tenantId", "workOrderId", "lineNo");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderOperation_tenantId_workOrderId_lineNo_key" ON "WorkOrderOperation"("tenantId", "workOrderId", "lineNo");

-- CreateIndex
CREATE INDEX "ShopFloorLog_tenantId_workOrderId_idx" ON "ShopFloorLog"("tenantId", "workOrderId");

-- CreateIndex
CREATE INDEX "ShopFloorTimer_tenantId_workOrderId_idx" ON "ShopFloorTimer"("tenantId", "workOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionIssue_tenantId_code_key" ON "ProductionIssue"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionIssueItem_tenantId_issueId_lineNo_key" ON "ProductionIssueItem"("tenantId", "issueId", "lineNo");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionReceipt_tenantId_code_key" ON "ProductionReceipt"("tenantId", "code");

-- CreateIndex
CREATE INDEX "InProcessQc_tenantId_workOrderId_idx" ON "InProcessQc"("tenantId", "workOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_tenantId_code_key" ON "Equipment"("tenantId", "code");

-- CreateIndex
CREATE INDEX "MaintenanceSchedule_tenantId_equipmentId_idx" ON "MaintenanceSchedule"("tenantId", "equipmentId");

-- CreateIndex
CREATE INDEX "MaintenanceRequest_tenantId_status_idx" ON "MaintenanceRequest"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "MaintenanceRequest_tenantId_code_key" ON "MaintenanceRequest"("tenantId", "code");

-- CreateIndex
CREATE INDEX "MaintenanceLog_tenantId_equipmentId_idx" ON "MaintenanceLog"("tenantId", "equipmentId");

-- CreateIndex
CREATE INDEX "MaintenanceLogPart_maintenanceLogId_idx" ON "MaintenanceLogPart"("maintenanceLogId");

-- CreateIndex
CREATE INDEX "MaintenanceTask_scheduleId_idx" ON "MaintenanceTask"("scheduleId");

-- CreateIndex
CREATE INDEX "MrpRun_tenantId_runDate_idx" ON "MrpRun"("tenantId", "runDate");

-- CreateIndex
CREATE INDEX "MrpSuggestion_tenantId_mrpRunId_idx" ON "MrpSuggestion"("tenantId", "mrpRunId");

-- CreateIndex
CREATE INDEX "MrpSuggestion_tenantId_itemId_idx" ON "MrpSuggestion"("tenantId", "itemId");

-- CreateIndex
CREATE INDEX "MrpSuggestion_tenantId_status_idx" ON "MrpSuggestion"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionCost_tenantId_workOrderId_period_key" ON "ProductionCost"("tenantId", "workOrderId", "period");

-- CreateIndex
CREATE INDEX "ProductionCostDetail_productionCostId_idx" ON "ProductionCostDetail"("productionCostId");

-- CreateIndex
CREATE INDEX "TaxInvoice_tenantId_invoiceDate_idx" ON "TaxInvoice"("tenantId", "invoiceDate");

-- CreateIndex
CREATE UNIQUE INDEX "TaxInvoice_tenantId_invoiceNo_key" ON "TaxInvoice"("tenantId", "invoiceNo");

-- CreateIndex
CREATE UNIQUE INDEX "NsfpRange_tenantId_startNo_endNo_key" ON "NsfpRange"("tenantId", "startNo", "endNo");

-- CreateIndex
CREATE INDEX "PphWithholding_tenantId_transDate_idx" ON "PphWithholding"("tenantId", "transDate");

-- CreateIndex
CREATE UNIQUE INDEX "PphWithholding_tenantId_transNo_key" ON "PphWithholding"("tenantId", "transNo");

-- CreateIndex
CREATE UNIQUE INDEX "TaxEqualization_tenantId_period_key" ON "TaxEqualization"("tenantId", "period");

-- CreateIndex
CREATE UNIQUE INDEX "IdBilling_tenantId_billingNo_key" ON "IdBilling"("tenantId", "billingNo");

-- CreateIndex
CREATE INDEX "Employee_tenantId_department_idx" ON "Employee"("tenantId", "department");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_tenantId_employeeNo_key" ON "Employee"("tenantId", "employeeNo");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUnit_tenantId_code_key" ON "OrganizationUnit"("tenantId", "code");

-- CreateIndex
CREATE INDEX "Attendance_tenantId_date_idx" ON "Attendance"("tenantId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_tenantId_employeeId_date_key" ON "Attendance"("tenantId", "employeeId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Shift_tenantId_code_key" ON "Shift"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "PayrollRun_tenantId_employeeId_period_key" ON "PayrollRun"("tenantId", "employeeId", "period");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseClaim_tenantId_claimNo_key" ON "ExpenseClaim"("tenantId", "claimNo");

-- CreateIndex
CREATE UNIQUE INDEX "KpiEvaluation_tenantId_employeeId_period_key" ON "KpiEvaluation"("tenantId", "employeeId", "period");

-- CreateIndex
CREATE UNIQUE INDEX "RecruitmentCandidate_tenantId_candidateNo_key" ON "RecruitmentCandidate"("tenantId", "candidateNo");

-- CreateIndex
CREATE INDEX "FleetVehicle_tenantId_status_idx" ON "FleetVehicle"("tenantId", "status");

-- CreateIndex
CREATE INDEX "FleetVehicle_tenantId_transporterId_idx" ON "FleetVehicle"("tenantId", "transporterId");

-- CreateIndex
CREATE UNIQUE INDEX "FleetVehicle_tenantId_code_key" ON "FleetVehicle"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "FleetVehicle_tenantId_plateNo_key" ON "FleetVehicle"("tenantId", "plateNo");

-- CreateIndex
CREATE INDEX "LogisticsDriver_tenantId_status_idx" ON "LogisticsDriver"("tenantId", "status");

-- CreateIndex
CREATE INDEX "LogisticsDriver_tenantId_transporterId_idx" ON "LogisticsDriver"("tenantId", "transporterId");

-- CreateIndex
CREATE UNIQUE INDEX "LogisticsDriver_tenantId_code_key" ON "LogisticsDriver"("tenantId", "code");

-- CreateIndex
CREATE INDEX "Transporter_tenantId_isActive_idx" ON "Transporter"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Transporter_tenantId_code_key" ON "Transporter"("tenantId", "code");

-- CreateIndex
CREATE INDEX "RouteTemplate_tenantId_isActive_idx" ON "RouteTemplate"("tenantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "RouteTemplate_tenantId_code_key" ON "RouteTemplate"("tenantId", "code");

-- CreateIndex
CREATE INDEX "TripPlan_tenantId_status_idx" ON "TripPlan"("tenantId", "status");

-- CreateIndex
CREATE INDEX "TripPlan_tenantId_routeDate_idx" ON "TripPlan"("tenantId", "routeDate");

-- CreateIndex
CREATE INDEX "TripPlan_tenantId_vehicleId_idx" ON "TripPlan"("tenantId", "vehicleId");

-- CreateIndex
CREATE INDEX "TripPlan_tenantId_driverId_idx" ON "TripPlan"("tenantId", "driverId");

-- CreateIndex
CREATE UNIQUE INDEX "TripPlan_tenantId_code_key" ON "TripPlan"("tenantId", "code");

-- CreateIndex
CREATE INDEX "TripCheckpoint_tenantId_tripPlanId_idx" ON "TripCheckpoint"("tenantId", "tripPlanId");

-- CreateIndex
CREATE INDEX "TripCheckpoint_tenantId_checkpointType_idx" ON "TripCheckpoint"("tenantId", "checkpointType");

-- CreateIndex
CREATE INDEX "DeliveryOrder_tenantId_status_idx" ON "DeliveryOrder"("tenantId", "status");

-- CreateIndex
CREATE INDEX "DeliveryOrder_tenantId_plannedShipDate_idx" ON "DeliveryOrder"("tenantId", "plannedShipDate");

-- CreateIndex
CREATE INDEX "DeliveryOrder_tenantId_shipmentId_idx" ON "DeliveryOrder"("tenantId", "shipmentId");

-- CreateIndex
CREATE INDEX "DeliveryOrder_tenantId_salesOrderId_idx" ON "DeliveryOrder"("tenantId", "salesOrderId");

-- CreateIndex
CREATE INDEX "DeliveryOrder_tenantId_tripPlanId_idx" ON "DeliveryOrder"("tenantId", "tripPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOrder_tenantId_code_key" ON "DeliveryOrder"("tenantId", "code");

-- CreateIndex
CREATE INDEX "DeliveryOrderItem_tenantId_deliveryOrderId_idx" ON "DeliveryOrderItem"("tenantId", "deliveryOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOrderItem_tenantId_deliveryOrderId_lineNo_key" ON "DeliveryOrderItem"("tenantId", "deliveryOrderId", "lineNo");

-- CreateIndex
CREATE UNIQUE INDEX "ProofOfDelivery_deliveryOrderId_key" ON "ProofOfDelivery"("deliveryOrderId");

-- CreateIndex
CREATE INDEX "ProofOfDelivery_tenantId_receivedAt_idx" ON "ProofOfDelivery"("tenantId", "receivedAt");

-- CreateIndex
CREATE INDEX "ProofOfDelivery_tenantId_status_idx" ON "ProofOfDelivery"("tenantId", "status");

-- CreateIndex
CREATE INDEX "DeliveryException_tenantId_deliveryOrderId_idx" ON "DeliveryException"("tenantId", "deliveryOrderId");

-- CreateIndex
CREATE INDEX "DeliveryException_tenantId_reason_idx" ON "DeliveryException"("tenantId", "reason");

-- CreateIndex
CREATE INDEX "WavePicking_tenantId_status_idx" ON "WavePicking"("tenantId", "status");

-- CreateIndex
CREATE INDEX "WavePicking_tenantId_plannedDate_idx" ON "WavePicking"("tenantId", "plannedDate");

-- CreateIndex
CREATE UNIQUE INDEX "WavePicking_tenantId_code_key" ON "WavePicking"("tenantId", "code");

-- CreateIndex
CREATE INDEX "StagingLoad_tenantId_status_idx" ON "StagingLoad"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "StagingLoad_tenantId_code_key" ON "StagingLoad"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "PackingList_deliveryOrderId_key" ON "PackingList"("deliveryOrderId");

-- CreateIndex
CREATE INDEX "PackingList_tenantId_status_idx" ON "PackingList"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "PackingList_tenantId_code_key" ON "PackingList"("tenantId", "code");

-- CreateIndex
CREATE INDEX "TripCost_tenantId_tripPlanId_idx" ON "TripCost"("tenantId", "tripPlanId");

-- CreateIndex
CREATE INDEX "TripCost_tenantId_costType_idx" ON "TripCost"("tenantId", "costType");

-- CreateIndex
CREATE INDEX "TripCost_tenantId_status_idx" ON "TripCost"("tenantId", "status");

-- CreateIndex
CREATE INDEX "TripLocation_tenantId_tripPlanId_timestamp_idx" ON "TripLocation"("tenantId", "tripPlanId", "timestamp");

-- CreateIndex
CREATE INDEX "TripRouteTrace_tenantId_tripPlanId_idx" ON "TripRouteTrace"("tenantId", "tripPlanId");

-- CreateIndex
CREATE INDEX "VehicleMaintenance_tenantId_vehicleId_idx" ON "VehicleMaintenance"("tenantId", "vehicleId");

-- CreateIndex
CREATE INDEX "VehicleMaintenance_tenantId_nextServiceAt_idx" ON "VehicleMaintenance"("tenantId", "nextServiceAt");

-- CreateIndex
CREATE INDEX "VehicleDocument_tenantId_vehicleId_idx" ON "VehicleDocument"("tenantId", "vehicleId");

-- CreateIndex
CREATE INDEX "VehicleDocument_tenantId_expiryDate_idx" ON "VehicleDocument"("tenantId", "expiryDate");

-- CreateIndex
CREATE INDEX "DriverSchedule_tenantId_date_idx" ON "DriverSchedule"("tenantId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DriverSchedule_tenantId_driverId_date_key" ON "DriverSchedule"("tenantId", "driverId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DriverAvailability_tenantId_driverId_date_key" ON "DriverAvailability"("tenantId", "driverId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "LogisticsPartner_tenantId_name_key" ON "LogisticsPartner"("tenantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerRate_tenantId_partnerId_originZone_destZone_key" ON "PartnerRate"("tenantId", "partnerId", "originZone", "destZone");

-- CreateIndex
CREATE INDEX "PartnerShipment_tenantId_partnerId_idx" ON "PartnerShipment"("tenantId", "partnerId");

-- CreateIndex
CREATE INDEX "PartnerShipment_tenantId_deliveryOrderId_idx" ON "PartnerShipment"("tenantId", "deliveryOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "KitDefinition_tenantId_code_key" ON "KitDefinition"("tenantId", "code");

-- CreateIndex
CREATE INDEX "KitAssembly_tenantId_status_idx" ON "KitAssembly"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "KitAssembly_tenantId_code_key" ON "KitAssembly"("tenantId", "code");

-- CreateIndex
CREATE INDEX "Project_tenantId_status_idx" ON "Project"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Project_tenantId_code_key" ON "Project"("tenantId", "code");

-- CreateIndex
CREATE INDEX "WbsTask_tenantId_projectId_idx" ON "WbsTask"("tenantId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "WbsTask_tenantId_projectId_taskCode_key" ON "WbsTask"("tenantId", "projectId", "taskCode");

-- CreateIndex
CREATE INDEX "ProjectBudget_tenantId_projectId_idx" ON "ProjectBudget"("tenantId", "projectId");

-- CreateIndex
CREATE INDEX "Tender_tenantId_status_idx" ON "Tender"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Tender_tenantId_title_key" ON "Tender"("tenantId", "title");

-- CreateIndex
CREATE INDEX "TenderBid_tenderId_idx" ON "TenderBid"("tenderId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectContract_tenantId_contractNo_key" ON "ProjectContract"("tenantId", "contractNo");

-- CreateIndex
CREATE INDEX "ContractTermijn_contractId_idx" ON "ContractTermijn"("contractId");

-- CreateIndex
CREATE INDEX "DailyReport_tenantId_projectId_idx" ON "DailyReport"("tenantId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyReport_tenantId_projectId_reportDate_key" ON "DailyReport"("tenantId", "projectId", "reportDate");

-- CreateIndex
CREATE INDEX "ResourceUsage_dailyReportId_idx" ON "ResourceUsage"("dailyReportId");

-- CreateIndex
CREATE INDEX "ProgressInvoice_tenant_id_project_id_idx" ON "ProgressInvoice"("tenant_id", "project_id");

-- CreateIndex
CREATE INDEX "ProgressClaim_project_id_idx" ON "ProgressClaim"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressClaim_tenant_id_claim_no_key" ON "ProgressClaim"("tenant_id", "claim_no");

-- CreateIndex
CREATE INDEX "ProjectCommitment_tenantId_projectId_idx" ON "ProjectCommitment"("tenantId", "projectId");

-- CreateIndex
CREATE INDEX "ThreeWayMatching_tenantId_invoiceId_idx" ON "ThreeWayMatching"("tenantId", "invoiceId");

-- CreateIndex
CREATE INDEX "ThreeWayMatching_tenantId_orderId_idx" ON "ThreeWayMatching"("tenantId", "orderId");

-- CreateIndex
CREATE INDEX "ThreeWayMatching_tenantId_receiptId_idx" ON "ThreeWayMatching"("tenantId", "receiptId");

-- CreateIndex
CREATE UNIQUE INDEX "ThreeWayMatching_tenantId_code_key" ON "ThreeWayMatching"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "StockBalance_tenantId_warehouseId_binLocationId_itemId_batc_key" ON "StockBalance"("tenantId", "warehouseId", "binLocationId", "itemId", "batchId", "serialId");

-- CreateIndex
CREATE INDEX "SalesSubscription_tenantId_customerId_idx" ON "SalesSubscription"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "SalesSubscription_tenantId_status_idx" ON "SalesSubscription"("tenantId", "status");

-- CreateIndex
CREATE INDEX "RentalContract_tenantId_customerId_idx" ON "RentalContract"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "RentalContract_tenantId_status_idx" ON "RentalContract"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "RentalContract_tenantId_contractNo_key" ON "RentalContract"("tenantId", "contractNo");

-- CreateIndex
CREATE INDEX "RentalBilling_tenantId_contractId_idx" ON "RentalBilling"("tenantId", "contractId");

-- CreateIndex
CREATE INDEX "RentalBilling_tenantId_customerId_idx" ON "RentalBilling"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "RentalBilling_tenantId_status_idx" ON "RentalBilling"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "RentalBilling_tenantId_billingNo_key" ON "RentalBilling"("tenantId", "billingNo");

-- CreateIndex
CREATE INDEX "RentalMaintenance_tenantId_contractId_idx" ON "RentalMaintenance"("tenantId", "contractId");

-- CreateIndex
CREATE INDEX "RentalMaintenance_tenantId_assetId_idx" ON "RentalMaintenance"("tenantId", "assetId");

-- CreateIndex
CREATE INDEX "RentalMaintenance_tenantId_status_idx" ON "RentalMaintenance"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "RentalMaintenance_tenantId_ticketNo_key" ON "RentalMaintenance"("tenantId", "ticketNo");

-- CreateIndex
CREATE INDEX "Course_tenantId_status_idx" ON "Course"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Course_tenantId_code_key" ON "Course"("tenantId", "code");

-- CreateIndex
CREATE INDEX "CourseEnrollment_tenantId_courseId_idx" ON "CourseEnrollment"("tenantId", "courseId");

-- CreateIndex
CREATE INDEX "CourseEnrollment_tenantId_employeeId_idx" ON "CourseEnrollment"("tenantId", "employeeId");

-- CreateIndex
CREATE INDEX "CourseEnrollment_tenantId_status_idx" ON "CourseEnrollment"("tenantId", "status");

-- CreateIndex
CREATE INDEX "CustomerPortalUser_tenantId_customerCode_idx" ON "CustomerPortalUser"("tenantId", "customerCode");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerPortalUser_tenantId_email_key" ON "CustomerPortalUser"("tenantId", "email");

-- CreateIndex
CREATE INDEX "VendorPortalUser_tenantId_supplierCode_idx" ON "VendorPortalUser"("tenantId", "supplierCode");

-- CreateIndex
CREATE UNIQUE INDEX "VendorPortalUser_tenantId_email_key" ON "VendorPortalUser"("tenantId", "email");

-- CreateIndex
CREATE INDEX "InventoryForecast_tenantId_itemId_idx" ON "InventoryForecast"("tenantId", "itemId");

-- CreateIndex
CREATE INDEX "NonConformanceReport_tenantId_status_idx" ON "NonConformanceReport"("tenantId", "status");

-- CreateIndex
CREATE INDEX "NonConformanceReport_tenantId_itemId_idx" ON "NonConformanceReport"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "NonConformanceReport_tenantId_code_key" ON "NonConformanceReport"("tenantId", "code");

-- CreateIndex
CREATE INDEX "Capa_tenantId_status_idx" ON "Capa"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Capa_tenantId_code_key" ON "Capa"("tenantId", "code");

-- CreateIndex
CREATE INDEX "SupplierRating_tenantId_period_idx" ON "SupplierRating"("tenantId", "period");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierRating_tenantId_supplierId_period_key" ON "SupplierRating"("tenantId", "supplierId", "period");

-- CreateIndex
CREATE INDEX "QualityDocument_tenantId_category_idx" ON "QualityDocument"("tenantId", "category");

-- CreateIndex
CREATE INDEX "QualityDocument_tenantId_status_idx" ON "QualityDocument"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "QualityDocument_tenantId_code_version_key" ON "QualityDocument"("tenantId", "code", "version");

-- CreateIndex
CREATE INDEX "CalibrationLog_tenantId_equipmentId_idx" ON "CalibrationLog"("tenantId", "equipmentId");

-- CreateIndex
CREATE INDEX "CalibrationLog_tenantId_status_idx" ON "CalibrationLog"("tenantId", "status");

-- CreateIndex
CREATE INDEX "FsmServiceOrder_tenantId_customerId_idx" ON "FsmServiceOrder"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "FsmServiceOrder_tenantId_status_idx" ON "FsmServiceOrder"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "FsmServiceOrder_tenantId_code_key" ON "FsmServiceOrder"("tenantId", "code");

-- CreateIndex
CREATE INDEX "FsmServiceOrderItem_tenantId_serviceOrderId_idx" ON "FsmServiceOrderItem"("tenantId", "serviceOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "FsmServiceOrderItem_tenantId_serviceOrderId_lineNo_key" ON "FsmServiceOrderItem"("tenantId", "serviceOrderId", "lineNo");

-- CreateIndex
CREATE INDEX "FsmServiceAppointment_tenantId_serviceOrderId_idx" ON "FsmServiceAppointment"("tenantId", "serviceOrderId");

-- CreateIndex
CREATE INDEX "FsmServiceAppointment_tenantId_technicianId_idx" ON "FsmServiceAppointment"("tenantId", "technicianId");

-- CreateIndex
CREATE INDEX "FsmServiceAppointment_tenantId_status_idx" ON "FsmServiceAppointment"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "FsmServiceReport_appointmentId_key" ON "FsmServiceReport"("appointmentId");

-- CreateIndex
CREATE INDEX "FsmSparePartCompatibility_tenantId_itemId_idx" ON "FsmSparePartCompatibility"("tenantId", "itemId");

-- CreateIndex
CREATE INDEX "FsmSparePartCompatibility_tenantId_equipmentId_idx" ON "FsmSparePartCompatibility"("tenantId", "equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "FsmSparePartCompatibility_tenantId_itemId_equipmentId_key" ON "FsmSparePartCompatibility"("tenantId", "itemId", "equipmentId");

-- CreateIndex
CREATE INDEX "FsmHandover_tenantId_customerId_idx" ON "FsmHandover"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "FsmHandover_tenantId_serviceOrderId_idx" ON "FsmHandover"("tenantId", "serviceOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "FsmHandover_tenantId_code_key" ON "FsmHandover"("tenantId", "code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesQuotation" ADD CONSTRAINT "SalesQuotation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesQuotation" ADD CONSTRAINT "SalesQuotation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesQuotationItem" ADD CONSTRAINT "SalesQuotationItem_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "SalesQuotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesQuotationItem" ADD CONSTRAINT "SalesQuotationItem_taxCodeId_fkey" FOREIGN KEY ("taxCodeId") REFERENCES "TaxCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesQuotationItem" ADD CONSTRAINT "SalesQuotationItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "SalesQuotation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_workflowDefinitionId_fkey" FOREIGN KEY ("workflowDefinitionId") REFERENCES "WorkflowDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrderItem" ADD CONSTRAINT "SalesOrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrderItem" ADD CONSTRAINT "SalesOrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SalesOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrderItem" ADD CONSTRAINT "SalesOrderItem_taxCodeId_fkey" FOREIGN KEY ("taxCodeId") REFERENCES "TaxCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrderItem" ADD CONSTRAINT "SalesOrderItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoice" ADD CONSTRAINT "SalesInvoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoice" ADD CONSTRAINT "SalesInvoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SalesOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoice" ADD CONSTRAINT "SalesInvoice_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoiceItem" ADD CONSTRAINT "SalesInvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "SalesInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoiceItem" ADD CONSTRAINT "SalesInvoiceItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoiceItem" ADD CONSTRAINT "SalesInvoiceItem_taxCodeId_fkey" FOREIGN KEY ("taxCodeId") REFERENCES "TaxCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoiceItem" ADD CONSTRAINT "SalesInvoiceItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturn" ADD CONSTRAINT "SalesReturn_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturn" ADD CONSTRAINT "SalesReturn_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SalesOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturn" ADD CONSTRAINT "SalesReturn_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturnItem" ADD CONSTRAINT "SalesReturnItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturnItem" ADD CONSTRAINT "SalesReturnItem_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "SalesReturn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturnItem" ADD CONSTRAINT "SalesReturnItem_taxCodeId_fkey" FOREIGN KEY ("taxCodeId") REFERENCES "TaxCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturnItem" ADD CONSTRAINT "SalesReturnItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceList" ADD CONSTRAINT "PriceList_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceListItem" ADD CONSTRAINT "PriceListItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceListItem" ADD CONSTRAINT "PriceListItem_priceListId_fkey" FOREIGN KEY ("priceListId") REFERENCES "PriceList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceListItem" ADD CONSTRAINT "PriceListItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceRule" ADD CONSTRAINT "PriceRule_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceRule" ADD CONSTRAINT "PriceRule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountRule" ADD CONSTRAINT "DiscountRule_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountRule" ADD CONSTRAINT "DiscountRule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrier" ADD CONSTRAINT "Carrier_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SalesOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionScheme" ADD CONSTRAINT "CommissionScheme_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionEntry" ADD CONSTRAINT "CommissionEntry_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "SalesInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionEntry" ADD CONSTRAINT "CommissionEntry_salesUserId_fkey" FOREIGN KEY ("salesUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionEntry" ADD CONSTRAINT "CommissionEntry_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "CommissionScheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionEntry" ADD CONSTRAINT "CommissionEntry_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequisition" ADD CONSTRAINT "PurchaseRequisition_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequisition" ADD CONSTRAINT "PurchaseRequisition_workflowDefinitionId_fkey" FOREIGN KEY ("workflowDefinitionId") REFERENCES "WorkflowDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequisitionItem" ADD CONSTRAINT "PurchaseRequisitionItem_requisitionId_fkey" FOREIGN KEY ("requisitionId") REFERENCES "PurchaseRequisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequisitionItem" ADD CONSTRAINT "PurchaseRequisitionItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rfq" ADD CONSTRAINT "Rfq_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RfqVendor" ADD CONSTRAINT "RfqVendor_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "Rfq"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RfqVendor" ADD CONSTRAINT "RfqVendor_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RfqVendor" ADD CONSTRAINT "RfqVendor_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RfqItem" ADD CONSTRAINT "RfqItem_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "Rfq"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RfqItem" ADD CONSTRAINT "RfqItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "Rfq"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_workflowDefinitionId_fkey" FOREIGN KEY ("workflowDefinitionId") REFERENCES "WorkflowDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_taxCodeId_fkey" FOREIGN KEY ("taxCodeId") REFERENCES "TaxCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoice" ADD CONSTRAINT "PurchaseInvoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PurchaseOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoice" ADD CONSTRAINT "PurchaseInvoice_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoice" ADD CONSTRAINT "PurchaseInvoice_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoiceItem" ADD CONSTRAINT "PurchaseInvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "PurchaseInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoiceItem" ADD CONSTRAINT "PurchaseInvoiceItem_taxCodeId_fkey" FOREIGN KEY ("taxCodeId") REFERENCES "TaxCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoiceItem" ADD CONSTRAINT "PurchaseInvoiceItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandedCostVoucher" ADD CONSTRAINT "LandedCostVoucher_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "PurchaseInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandedCostVoucher" ADD CONSTRAINT "LandedCostVoucher_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PurchaseOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandedCostVoucher" ADD CONSTRAINT "LandedCostVoucher_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandedCostVoucher" ADD CONSTRAINT "LandedCostVoucher_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandedCostAllocation" ADD CONSTRAINT "LandedCostAllocation_landedCostId_fkey" FOREIGN KEY ("landedCostId") REFERENCES "LandedCostVoucher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandedCostAllocation" ADD CONSTRAINT "LandedCostAllocation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturn" ADD CONSTRAINT "PurchaseReturn_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "PurchaseInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturn" ADD CONSTRAINT "PurchaseReturn_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PurchaseOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturn" ADD CONSTRAINT "PurchaseReturn_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturn" ADD CONSTRAINT "PurchaseReturn_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnItem" ADD CONSTRAINT "PurchaseReturnItem_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "PurchaseReturn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnItem" ADD CONSTRAINT "PurchaseReturnItem_taxCodeId_fkey" FOREIGN KEY ("taxCodeId") REFERENCES "TaxCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnItem" ADD CONSTRAINT "PurchaseReturnItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemGroup" ADD CONSTRAINT "ItemGroup_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_itemGroupId_fkey" FOREIGN KEY ("itemGroupId") REFERENCES "ItemGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemUom" ADD CONSTRAINT "ItemUom_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemUom" ADD CONSTRAINT "ItemUom_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBarcode" ADD CONSTRAINT "ItemBarcode_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBarcode" ADD CONSTRAINT "ItemBarcode_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinLocation" ADD CONSTRAINT "BinLocation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinLocation" ADD CONSTRAINT "BinLocation_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "ItemBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_binLocationId_fkey" FOREIGN KEY ("binLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "ItemSerial"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptNote" ADD CONSTRAINT "GoodsReceiptNote_purchaseInvoiceId_fkey" FOREIGN KEY ("purchaseInvoiceId") REFERENCES "PurchaseInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptNote" ADD CONSTRAINT "GoodsReceiptNote_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptNote" ADD CONSTRAINT "GoodsReceiptNote_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptNote" ADD CONSTRAINT "GoodsReceiptNote_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptNote" ADD CONSTRAINT "GoodsReceiptNote_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptItem" ADD CONSTRAINT "GoodsReceiptItem_binLocationId_fkey" FOREIGN KEY ("binLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptItem" ADD CONSTRAINT "GoodsReceiptItem_grnId_fkey" FOREIGN KEY ("grnId") REFERENCES "GoodsReceiptNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptItem" ADD CONSTRAINT "GoodsReceiptItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptItem" ADD CONSTRAINT "GoodsReceiptItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptItem" ADD CONSTRAINT "GoodsReceiptItem_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransfer" ADD CONSTRAINT "StockTransfer_fromWarehouseId_fkey" FOREIGN KEY ("fromWarehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransfer" ADD CONSTRAINT "StockTransfer_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransfer" ADD CONSTRAINT "StockTransfer_toWarehouseId_fkey" FOREIGN KEY ("toWarehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_fromBinLocationId_fkey" FOREIGN KEY ("fromBinLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_toBinLocationId_fkey" FOREIGN KEY ("toBinLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_transferId_fkey" FOREIGN KEY ("transferId") REFERENCES "StockTransfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCount" ADD CONSTRAINT "StockCount_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCount" ADD CONSTRAINT "StockCount_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCount" ADD CONSTRAINT "StockCount_workflowDefinitionId_fkey" FOREIGN KEY ("workflowDefinitionId") REFERENCES "WorkflowDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCountItem" ADD CONSTRAINT "StockCountItem_binLocationId_fkey" FOREIGN KEY ("binLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCountItem" ADD CONSTRAINT "StockCountItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCountItem" ADD CONSTRAINT "StockCountItem_stockCountId_fkey" FOREIGN KEY ("stockCountId") REFERENCES "StockCount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCountItem" ADD CONSTRAINT "StockCountItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueNote" ADD CONSTRAINT "GoodsIssueNote_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueNote" ADD CONSTRAINT "GoodsIssueNote_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueItem" ADD CONSTRAINT "GoodsIssueItem_binLocationId_fkey" FOREIGN KEY ("binLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueItem" ADD CONSTRAINT "GoodsIssueItem_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "GoodsIssueNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueItem" ADD CONSTRAINT "GoodsIssueItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueItem" ADD CONSTRAINT "GoodsIssueItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueItem" ADD CONSTRAINT "GoodsIssueItem_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Putaway" ADD CONSTRAINT "Putaway_grnId_fkey" FOREIGN KEY ("grnId") REFERENCES "GoodsReceiptNote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Putaway" ADD CONSTRAINT "Putaway_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Putaway" ADD CONSTRAINT "Putaway_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PutawayItem" ADD CONSTRAINT "PutawayItem_fromBinLocationId_fkey" FOREIGN KEY ("fromBinLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PutawayItem" ADD CONSTRAINT "PutawayItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PutawayItem" ADD CONSTRAINT "PutawayItem_putawayId_fkey" FOREIGN KEY ("putawayId") REFERENCES "Putaway"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PutawayItem" ADD CONSTRAINT "PutawayItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PutawayItem" ADD CONSTRAINT "PutawayItem_toBinLocationId_fkey" FOREIGN KEY ("toBinLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picking" ADD CONSTRAINT "Picking_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picking" ADD CONSTRAINT "Picking_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picking" ADD CONSTRAINT "Picking_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickingItem" ADD CONSTRAINT "PickingItem_fromBinLocationId_fkey" FOREIGN KEY ("fromBinLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickingItem" ADD CONSTRAINT "PickingItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickingItem" ADD CONSTRAINT "PickingItem_pickingId_fkey" FOREIGN KEY ("pickingId") REFERENCES "Picking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickingItem" ADD CONSTRAINT "PickingItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackingItem" ADD CONSTRAINT "PackingItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackingItem" ADD CONSTRAINT "PackingItem_packingId_fkey" FOREIGN KEY ("packingId") REFERENCES "Packing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackingItem" ADD CONSTRAINT "PackingItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcInspection" ADD CONSTRAINT "QcInspection_grnId_fkey" FOREIGN KEY ("grnId") REFERENCES "GoodsReceiptNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcInspection" ADD CONSTRAINT "QcInspection_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcInspectionItem" ADD CONSTRAINT "QcInspectionItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcInspectionItem" ADD CONSTRAINT "QcInspectionItem_qcInspectionId_fkey" FOREIGN KEY ("qcInspectionId") REFERENCES "QcInspection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcInspectionItem" ADD CONSTRAINT "QcInspectionItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBatch" ADD CONSTRAINT "ItemBatch_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBatch" ADD CONSTRAINT "ItemBatch_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSerial" ADD CONSTRAINT "ItemSerial_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSerial" ADD CONSTRAINT "ItemSerial_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValuationLayer" ADD CONSTRAINT "ValuationLayer_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValuationLayer" ADD CONSTRAINT "ValuationLayer_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesActivity" ADD CONSTRAINT "SalesActivity_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesActivity" ADD CONSTRAINT "SalesActivity_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesActivity" ADD CONSTRAINT "SalesActivity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesActivity" ADD CONSTRAINT "SalesActivity_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesActivity" ADD CONSTRAINT "SalesActivity_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingCampaign" ADD CONSTRAINT "MarketingCampaign_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTicket" ADD CONSTRAINT "ServiceTicket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTicket" ADD CONSTRAINT "ServiceTicket_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTicket" ADD CONSTRAINT "ServiceTicket_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationTemplate" ADD CONSTRAINT "NotificationTemplate_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationChannelConfig" ADD CONSTRAINT "NotificationChannelConfig_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationPreference" ADD CONSTRAINT "NotificationPreference_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationPreference" ADD CONSTRAINT "NotificationPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationLog" ADD CONSTRAINT "NotificationLog_recipientUserId_fkey" FOREIGN KEY ("recipientUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationLog" ADD CONSTRAINT "NotificationLog_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "NotificationTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationLog" ADD CONSTRAINT "NotificationLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSchedule" ADD CONSTRAINT "NotificationSchedule_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSchedule" ADD CONSTRAINT "NotificationSchedule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProfile" ADD CONSTRAINT "CompanyProfile_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeRate" ADD CONSTRAINT "ExchangeRate_baseCurrencyId_fkey" FOREIGN KEY ("baseCurrencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeRate" ADD CONSTRAINT "ExchangeRate_quoteCurrencyId_fkey" FOREIGN KEY ("quoteCurrencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeRate" ADD CONSTRAINT "ExchangeRate_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uom" ADD CONSTRAINT "Uom_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UomConversion" ADD CONSTRAINT "UomConversion_fromUomId_fkey" FOREIGN KEY ("fromUomId") REFERENCES "Uom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UomConversion" ADD CONSTRAINT "UomConversion_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UomConversion" ADD CONSTRAINT "UomConversion_toUomId_fkey" FOREIGN KEY ("toUomId") REFERENCES "Uom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiscalYear" ADD CONSTRAINT "FiscalYear_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountingPeriod" ADD CONSTRAINT "AccountingPeriod_fiscalYearId_fkey" FOREIGN KEY ("fiscalYearId") REFERENCES "FiscalYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountingPeriod" ADD CONSTRAINT "AccountingPeriod_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoaAccount" ADD CONSTRAINT "CoaAccount_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CoaAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoaAccount" ADD CONSTRAINT "CoaAccount_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostCenter" ADD CONSTRAINT "CostCenter_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfitCenter" ADD CONSTRAINT "ProfitCenter_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntryLine" ADD CONSTRAINT "JournalEntryLine_journalEntryId_fkey" FOREIGN KEY ("journalEntryId") REFERENCES "JournalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntryLine" ADD CONSTRAINT "JournalEntryLine_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInvoice" ADD CONSTRAINT "SupplierInvoice_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInvoiceLine" ADD CONSTRAINT "SupplierInvoiceLine_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "SupplierInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInvoiceLine" ADD CONSTRAINT "SupplierInvoiceLine_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInvoicePayment" ADD CONSTRAINT "SupplierInvoicePayment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "SupplierInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInvoicePayment" ADD CONSTRAINT "SupplierInvoicePayment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerInvoice" ADD CONSTRAINT "CustomerInvoice_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerInvoiceLine" ADD CONSTRAINT "CustomerInvoiceLine_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "CustomerInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerInvoiceLine" ADD CONSTRAINT "CustomerInvoiceLine_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerInvoicePayment" ADD CONSTRAINT "CustomerInvoicePayment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "CustomerInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerInvoicePayment" ADD CONSTRAINT "CustomerInvoicePayment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedAsset" ADD CONSTRAINT "FixedAsset_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedAssetDepreciation" ADD CONSTRAINT "FixedAssetDepreciation_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "FixedAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedAssetDepreciation" ADD CONSTRAINT "FixedAssetDepreciation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankTransaction" ADD CONSTRAINT "BankTransaction_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankTransaction" ADD CONSTRAINT "BankTransaction_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashAccount" ADD CONSTRAINT "CashAccount_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashTransaction" ADD CONSTRAINT "CashTransaction_cashAccountId_fkey" FOREIGN KEY ("cashAccountId") REFERENCES "CashAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashTransaction" ADD CONSTRAINT "CashTransaction_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxCode" ADD CONSTRAINT "TaxCode_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostCenterAllocation" ADD CONSTRAINT "CostCenterAllocation_costCenterId_fkey" FOREIGN KEY ("costCenterId") REFERENCES "CostCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostCenterAllocation" ADD CONSTRAINT "CostCenterAllocation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterCompanyTransaction" ADD CONSTRAINT "InterCompanyTransaction_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankReconciliation" ADD CONSTRAINT "BankReconciliation_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankReconciliation" ADD CONSTRAINT "BankReconciliation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PettyCashReplenishment" ADD CONSTRAINT "PettyCashReplenishment_cashAccountId_fkey" FOREIGN KEY ("cashAccountId") REFERENCES "CashAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PettyCashReplenishment" ADD CONSTRAINT "PettyCashReplenishment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerReceipt" ADD CONSTRAINT "CustomerReceipt_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPayment" ADD CONSTRAINT "VendorPayment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentRequest" ADD CONSTRAINT "PaymentRequest_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetDisposal" ADD CONSTRAINT "AssetDisposal_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "FixedAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetDisposal" ADD CONSTRAINT "AssetDisposal_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_costCenterId_fkey" FOREIGN KEY ("costCenterId") REFERENCES "CostCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowDefinition" ADD CONSTRAINT "WorkflowDefinition_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "WorkflowDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowRule" ADD CONSTRAINT "WorkflowRule_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "WorkflowStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowRule" ADD CONSTRAINT "WorkflowRule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowInstance" ADD CONSTRAINT "WorkflowInstance_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowInstance" ADD CONSTRAINT "WorkflowInstance_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "WorkflowDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowInstance" ADD CONSTRAINT "WorkflowInstance_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "WorkflowStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowInstance" ADD CONSTRAINT "WorkflowInstance_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalHistory" ADD CONSTRAINT "ApprovalHistory_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "WorkflowInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalHistory" ADD CONSTRAINT "ApprovalHistory_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalHistory" ADD CONSTRAINT "ApprovalHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterials" ADD CONSTRAINT "BillOfMaterials_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterials" ADD CONSTRAINT "BillOfMaterials_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterialsItem" ADD CONSTRAINT "BillOfMaterialsItem_bomId_fkey" FOREIGN KEY ("bomId") REFERENCES "BillOfMaterials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterialsItem" ADD CONSTRAINT "BillOfMaterialsItem_componentItemId_fkey" FOREIGN KEY ("componentItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterialsItem" ADD CONSTRAINT "BillOfMaterialsItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BomOperation" ADD CONSTRAINT "BomOperation_bomId_fkey" FOREIGN KEY ("bomId") REFERENCES "BillOfMaterials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BomOperation" ADD CONSTRAINT "BomOperation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_bomId_fkey" FOREIGN KEY ("bomId") REFERENCES "BillOfMaterials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_finishedGoodItemId_fkey" FOREIGN KEY ("finishedGoodItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_workflowDefinitionId_fkey" FOREIGN KEY ("workflowDefinitionId") REFERENCES "WorkflowDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderComponent" ADD CONSTRAINT "WorkOrderComponent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderComponent" ADD CONSTRAINT "WorkOrderComponent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderComponent" ADD CONSTRAINT "WorkOrderComponent_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderOperation" ADD CONSTRAINT "WorkOrderOperation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderOperation" ADD CONSTRAINT "WorkOrderOperation_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopFloorLog" ADD CONSTRAINT "ShopFloorLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopFloorLog" ADD CONSTRAINT "ShopFloorLog_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopFloorTimer" ADD CONSTRAINT "ShopFloorTimer_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopFloorTimer" ADD CONSTRAINT "ShopFloorTimer_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionIssue" ADD CONSTRAINT "ProductionIssue_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionIssue" ADD CONSTRAINT "ProductionIssue_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionIssueItem" ADD CONSTRAINT "ProductionIssueItem_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "ProductionIssue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionIssueItem" ADD CONSTRAINT "ProductionIssueItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionIssueItem" ADD CONSTRAINT "ProductionIssueItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionReceipt" ADD CONSTRAINT "ProductionReceipt_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionReceipt" ADD CONSTRAINT "ProductionReceipt_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InProcessQc" ADD CONSTRAINT "InProcessQc_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InProcessQc" ADD CONSTRAINT "InProcessQc_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceSchedule" ADD CONSTRAINT "MaintenanceSchedule_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceSchedule" ADD CONSTRAINT "MaintenanceSchedule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceLog" ADD CONSTRAINT "MaintenanceLog_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceLog" ADD CONSTRAINT "MaintenanceLog_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "MaintenanceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceLog" ADD CONSTRAINT "MaintenanceLog_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "MaintenanceSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceLog" ADD CONSTRAINT "MaintenanceLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceLogPart" ADD CONSTRAINT "MaintenanceLogPart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceLogPart" ADD CONSTRAINT "MaintenanceLogPart_maintenanceLogId_fkey" FOREIGN KEY ("maintenanceLogId") REFERENCES "MaintenanceLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceLogPart" ADD CONSTRAINT "MaintenanceLogPart_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceTask" ADD CONSTRAINT "MaintenanceTask_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "MaintenanceSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceTask" ADD CONSTRAINT "MaintenanceTask_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MrpRun" ADD CONSTRAINT "MrpRun_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MrpSuggestion" ADD CONSTRAINT "MrpSuggestion_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MrpSuggestion" ADD CONSTRAINT "MrpSuggestion_mrpRunId_fkey" FOREIGN KEY ("mrpRunId") REFERENCES "MrpRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MrpSuggestion" ADD CONSTRAINT "MrpSuggestion_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCost" ADD CONSTRAINT "ProductionCost_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCost" ADD CONSTRAINT "ProductionCost_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCostDetail" ADD CONSTRAINT "ProductionCostDetail_productionCostId_fkey" FOREIGN KEY ("productionCostId") REFERENCES "ProductionCost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCostDetail" ADD CONSTRAINT "ProductionCostDetail_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxInvoice" ADD CONSTRAINT "TaxInvoice_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NsfpRange" ADD CONSTRAINT "NsfpRange_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PphWithholding" ADD CONSTRAINT "PphWithholding_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxEqualization" ADD CONSTRAINT "TaxEqualization_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdBilling" ADD CONSTRAINT "IdBilling_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "OrganizationUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRun" ADD CONSTRAINT "PayrollRun_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRun" ADD CONSTRAINT "PayrollRun_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseClaim" ADD CONSTRAINT "ExpenseClaim_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseClaim" ADD CONSTRAINT "ExpenseClaim_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KpiEvaluation" ADD CONSTRAINT "KpiEvaluation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KpiEvaluation" ADD CONSTRAINT "KpiEvaluation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentCandidate" ADD CONSTRAINT "RecruitmentCandidate_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FleetVehicle" ADD CONSTRAINT "FleetVehicle_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FleetVehicle" ADD CONSTRAINT "FleetVehicle_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "Transporter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogisticsDriver" ADD CONSTRAINT "LogisticsDriver_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogisticsDriver" ADD CONSTRAINT "LogisticsDriver_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "Transporter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transporter" ADD CONSTRAINT "Transporter_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteTemplate" ADD CONSTRAINT "RouteTemplate_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteTemplate" ADD CONSTRAINT "RouteTemplate_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripPlan" ADD CONSTRAINT "TripPlan_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "LogisticsDriver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripPlan" ADD CONSTRAINT "TripPlan_routeTemplateId_fkey" FOREIGN KEY ("routeTemplateId") REFERENCES "RouteTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripPlan" ADD CONSTRAINT "TripPlan_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripPlan" ADD CONSTRAINT "TripPlan_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "FleetVehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCheckpoint" ADD CONSTRAINT "TripCheckpoint_deliveryOrderId_fkey" FOREIGN KEY ("deliveryOrderId") REFERENCES "DeliveryOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCheckpoint" ADD CONSTRAINT "TripCheckpoint_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCheckpoint" ADD CONSTRAINT "TripCheckpoint_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrderItem" ADD CONSTRAINT "DeliveryOrderItem_deliveryOrderId_fkey" FOREIGN KEY ("deliveryOrderId") REFERENCES "DeliveryOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrderItem" ADD CONSTRAINT "DeliveryOrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrderItem" ADD CONSTRAINT "DeliveryOrderItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProofOfDelivery" ADD CONSTRAINT "ProofOfDelivery_deliveryOrderId_fkey" FOREIGN KEY ("deliveryOrderId") REFERENCES "DeliveryOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProofOfDelivery" ADD CONSTRAINT "ProofOfDelivery_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryException" ADD CONSTRAINT "DeliveryException_deliveryOrderId_fkey" FOREIGN KEY ("deliveryOrderId") REFERENCES "DeliveryOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryException" ADD CONSTRAINT "DeliveryException_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryException" ADD CONSTRAINT "DeliveryException_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WavePicking" ADD CONSTRAINT "WavePicking_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WavePicking" ADD CONSTRAINT "WavePicking_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingLoad" ADD CONSTRAINT "StagingLoad_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StagingLoad" ADD CONSTRAINT "StagingLoad_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackingList" ADD CONSTRAINT "PackingList_deliveryOrderId_fkey" FOREIGN KEY ("deliveryOrderId") REFERENCES "DeliveryOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackingList" ADD CONSTRAINT "PackingList_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCost" ADD CONSTRAINT "TripCost_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCost" ADD CONSTRAINT "TripCost_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCost" ADD CONSTRAINT "TripCost_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WbsTask" ADD CONSTRAINT "WbsTask_parentTaskId_fkey" FOREIGN KEY ("parentTaskId") REFERENCES "WbsTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WbsTask" ADD CONSTRAINT "WbsTask_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectBudget" ADD CONSTRAINT "ProjectBudget_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectBudget" ADD CONSTRAINT "ProjectBudget_wbsTaskId_fkey" FOREIGN KEY ("wbsTaskId") REFERENCES "WbsTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tender" ADD CONSTRAINT "Tender_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderBid" ADD CONSTRAINT "TenderBid_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_wbs_task_id_fkey" FOREIGN KEY ("wbs_task_id") REFERENCES "WbsTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_site_manager_id_fkey" FOREIGN KEY ("site_manager_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_hse_officer_id_fkey" FOREIGN KEY ("hse_officer_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SitePhoto" ADD CONSTRAINT "SitePhoto_dailyReportId_fkey" FOREIGN KEY ("dailyReportId") REFERENCES "DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubcontractorLog" ADD CONSTRAINT "SubcontractorLog_dailyReportId_fkey" FOREIGN KEY ("dailyReportId") REFERENCES "DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceUsage" ADD CONSTRAINT "ResourceUsage_dailyReportId_fkey" FOREIGN KEY ("dailyReportId") REFERENCES "DailyReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressInvoice" ADD CONSTRAINT "ProgressInvoice_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressInvoice" ADD CONSTRAINT "ProgressInvoice_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressClaim" ADD CONSTRAINT "ProgressClaim_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressClaim" ADD CONSTRAINT "ProgressClaim_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCommitment" ADD CONSTRAINT "ProjectCommitment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCommitment" ADD CONSTRAINT "ProjectCommitment_wbsTaskId_fkey" FOREIGN KEY ("wbsTaskId") REFERENCES "WbsTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreeWayMatching" ADD CONSTRAINT "ThreeWayMatching_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "PurchaseInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreeWayMatching" ADD CONSTRAINT "ThreeWayMatching_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreeWayMatching" ADD CONSTRAINT "ThreeWayMatching_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "GoodsReceiptNote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreeWayMatching" ADD CONSTRAINT "ThreeWayMatching_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBalance" ADD CONSTRAINT "StockBalance_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "ItemBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBalance" ADD CONSTRAINT "StockBalance_binLocationId_fkey" FOREIGN KEY ("binLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBalance" ADD CONSTRAINT "StockBalance_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBalance" ADD CONSTRAINT "StockBalance_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "ItemSerial"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBalance" ADD CONSTRAINT "StockBalance_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBalance" ADD CONSTRAINT "StockBalance_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesSubscription" ADD CONSTRAINT "SalesSubscription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesSubscription" ADD CONSTRAINT "SalesSubscription_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalContract" ADD CONSTRAINT "RentalContract_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "FixedAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalContract" ADD CONSTRAINT "RentalContract_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalContract" ADD CONSTRAINT "RentalContract_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalBilling" ADD CONSTRAINT "RentalBilling_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "RentalContract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalBilling" ADD CONSTRAINT "RentalBilling_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalBilling" ADD CONSTRAINT "RentalBilling_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalMaintenance" ADD CONSTRAINT "RentalMaintenance_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "FixedAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalMaintenance" ADD CONSTRAINT "RentalMaintenance_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "RentalContract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalMaintenance" ADD CONSTRAINT "RentalMaintenance_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPortalUser" ADD CONSTRAINT "CustomerPortalUser_tenantId_customerCode_fkey" FOREIGN KEY ("tenantId", "customerCode") REFERENCES "Customer"("tenantId", "code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPortalUser" ADD CONSTRAINT "CustomerPortalUser_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPortalActivity" ADD CONSTRAINT "CustomerPortalActivity_portalUserId_fkey" FOREIGN KEY ("portalUserId") REFERENCES "CustomerPortalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPortalActivity" ADD CONSTRAINT "CustomerPortalActivity_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPortalUser" ADD CONSTRAINT "VendorPortalUser_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPortalUser" ADD CONSTRAINT "VendorPortalUser_tenantId_supplierCode_fkey" FOREIGN KEY ("tenantId", "supplierCode") REFERENCES "Supplier"("tenantId", "code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPortalActivity" ADD CONSTRAINT "VendorPortalActivity_portalUserId_fkey" FOREIGN KEY ("portalUserId") REFERENCES "VendorPortalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPortalActivity" ADD CONSTRAINT "VendorPortalActivity_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryForecast" ADD CONSTRAINT "InventoryForecast_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryForecast" ADD CONSTRAINT "InventoryForecast_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonConformanceReport" ADD CONSTRAINT "NonConformanceReport_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonConformanceReport" ADD CONSTRAINT "NonConformanceReport_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonConformanceReport" ADD CONSTRAINT "NonConformanceReport_qcId_fkey" FOREIGN KEY ("qcId") REFERENCES "QcInspection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonConformanceReport" ADD CONSTRAINT "NonConformanceReport_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonConformanceReport" ADD CONSTRAINT "NonConformanceReport_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capa" ADD CONSTRAINT "Capa_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capa" ADD CONSTRAINT "Capa_sourceNcrId_fkey" FOREIGN KEY ("sourceNcrId") REFERENCES "NonConformanceReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capa" ADD CONSTRAINT "Capa_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierRating" ADD CONSTRAINT "SupplierRating_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierRating" ADD CONSTRAINT "SupplierRating_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualityDocument" ADD CONSTRAINT "QualityDocument_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualityDocument" ADD CONSTRAINT "QualityDocument_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalibrationLog" ADD CONSTRAINT "CalibrationLog_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalibrationLog" ADD CONSTRAINT "CalibrationLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmServiceOrder" ADD CONSTRAINT "FsmServiceOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmServiceOrder" ADD CONSTRAINT "FsmServiceOrder_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmServiceOrderItem" ADD CONSTRAINT "FsmServiceOrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmServiceOrderItem" ADD CONSTRAINT "FsmServiceOrderItem_serviceOrderId_fkey" FOREIGN KEY ("serviceOrderId") REFERENCES "FsmServiceOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmServiceOrderItem" ADD CONSTRAINT "FsmServiceOrderItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmServiceAppointment" ADD CONSTRAINT "FsmServiceAppointment_serviceOrderId_fkey" FOREIGN KEY ("serviceOrderId") REFERENCES "FsmServiceOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmServiceAppointment" ADD CONSTRAINT "FsmServiceAppointment_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmServiceAppointment" ADD CONSTRAINT "FsmServiceAppointment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmServiceReport" ADD CONSTRAINT "FsmServiceReport_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "FsmServiceAppointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmServiceReport" ADD CONSTRAINT "FsmServiceReport_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmSparePartCompatibility" ADD CONSTRAINT "FsmSparePartCompatibility_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmSparePartCompatibility" ADD CONSTRAINT "FsmSparePartCompatibility_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmSparePartCompatibility" ADD CONSTRAINT "FsmSparePartCompatibility_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmHandover" ADD CONSTRAINT "FsmHandover_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmHandover" ADD CONSTRAINT "FsmHandover_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmHandover" ADD CONSTRAINT "FsmHandover_serviceOrderId_fkey" FOREIGN KEY ("serviceOrderId") REFERENCES "FsmServiceOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmHandover" ADD CONSTRAINT "FsmHandover_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FsmHandover" ADD CONSTRAINT "FsmHandover_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
