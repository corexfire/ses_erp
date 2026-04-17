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
CREATE TYPE "DeliveryExceptionReason" AS ENUM ('CUSTOMER_UNAVAILABLE', 'ADDRESS_NOT_FOUND', 'GOODS_REJECTED', 'DAMAGED_IN_TRANSIT', 'WRONG_ADDRESS', 'ACCESS_DENIED', 'OTHER');

-- CreateEnum
CREATE TYPE "TripCostStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'POSTED', 'VOID');

-- CreateEnum
CREATE TYPE "TripCostType" AS ENUM ('FUEL', 'TOLL', 'PARKING', 'VENDOR_FREIGHT', 'DRIVER_OVERTIME', 'OTHER');

-- CreateEnum
CREATE TYPE "WavePickingStatus" AS ENUM ('DRAFT', 'RELEASED', 'IN_PROGRESS', 'DONE', 'CANCELED');

-- CreateTable
CREATE TABLE "CostCenterAllocation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "costCenterId" TEXT NOT NULL,
    "accountCode" TEXT NOT NULL,
    "allocatedAmount" DECIMAL(18,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE INDEX "PackingList_tenantId_status_idx" ON "PackingList"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "PackingList_tenantId_code_key" ON "PackingList"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "PackingList_deliveryOrderId_key" ON "PackingList"("deliveryOrderId");

-- CreateIndex
CREATE INDEX "TripCost_tenantId_tripPlanId_idx" ON "TripCost"("tenantId", "tripPlanId");

-- CreateIndex
CREATE INDEX "TripCost_tenantId_costType_idx" ON "TripCost"("tenantId", "costType");

-- CreateIndex
CREATE INDEX "TripCost_tenantId_status_idx" ON "TripCost"("tenantId", "status");

-- AddForeignKey
ALTER TABLE "CostCenterAllocation" ADD CONSTRAINT "CostCenterAllocation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostCenterAllocation" ADD CONSTRAINT "CostCenterAllocation_costCenterId_fkey" FOREIGN KEY ("costCenterId") REFERENCES "CostCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterCompanyTransaction" ADD CONSTRAINT "InterCompanyTransaction_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankReconciliation" ADD CONSTRAINT "BankReconciliation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankReconciliation" ADD CONSTRAINT "BankReconciliation_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PettyCashReplenishment" ADD CONSTRAINT "PettyCashReplenishment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PettyCashReplenishment" ADD CONSTRAINT "PettyCashReplenishment_cashAccountId_fkey" FOREIGN KEY ("cashAccountId") REFERENCES "CashAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerReceipt" ADD CONSTRAINT "CustomerReceipt_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPayment" ADD CONSTRAINT "VendorPayment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentRequest" ADD CONSTRAINT "PaymentRequest_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetDisposal" ADD CONSTRAINT "AssetDisposal_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetDisposal" ADD CONSTRAINT "AssetDisposal_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "FixedAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_costCenterId_fkey" FOREIGN KEY ("costCenterId") REFERENCES "CostCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "OrganizationUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRun" ADD CONSTRAINT "PayrollRun_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRun" ADD CONSTRAINT "PayrollRun_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseClaim" ADD CONSTRAINT "ExpenseClaim_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseClaim" ADD CONSTRAINT "ExpenseClaim_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KpiEvaluation" ADD CONSTRAINT "KpiEvaluation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KpiEvaluation" ADD CONSTRAINT "KpiEvaluation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "TripPlan" ADD CONSTRAINT "TripPlan_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripPlan" ADD CONSTRAINT "TripPlan_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "FleetVehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripPlan" ADD CONSTRAINT "TripPlan_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "LogisticsDriver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripPlan" ADD CONSTRAINT "TripPlan_routeTemplateId_fkey" FOREIGN KEY ("routeTemplateId") REFERENCES "RouteTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCheckpoint" ADD CONSTRAINT "TripCheckpoint_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCheckpoint" ADD CONSTRAINT "TripCheckpoint_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCheckpoint" ADD CONSTRAINT "TripCheckpoint_deliveryOrderId_fkey" FOREIGN KEY ("deliveryOrderId") REFERENCES "DeliveryOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrderItem" ADD CONSTRAINT "DeliveryOrderItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrderItem" ADD CONSTRAINT "DeliveryOrderItem_deliveryOrderId_fkey" FOREIGN KEY ("deliveryOrderId") REFERENCES "DeliveryOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrderItem" ADD CONSTRAINT "DeliveryOrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProofOfDelivery" ADD CONSTRAINT "ProofOfDelivery_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProofOfDelivery" ADD CONSTRAINT "ProofOfDelivery_deliveryOrderId_fkey" FOREIGN KEY ("deliveryOrderId") REFERENCES "DeliveryOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryException" ADD CONSTRAINT "DeliveryException_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryException" ADD CONSTRAINT "DeliveryException_deliveryOrderId_fkey" FOREIGN KEY ("deliveryOrderId") REFERENCES "DeliveryOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "PackingList" ADD CONSTRAINT "PackingList_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackingList" ADD CONSTRAINT "PackingList_deliveryOrderId_fkey" FOREIGN KEY ("deliveryOrderId") REFERENCES "DeliveryOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCost" ADD CONSTRAINT "TripCost_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCost" ADD CONSTRAINT "TripCost_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCost" ADD CONSTRAINT "TripCost_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
