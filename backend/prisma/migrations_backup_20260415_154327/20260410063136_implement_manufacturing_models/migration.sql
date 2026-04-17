-- CreateEnum
CREATE TYPE "ProductionDocStatus" AS ENUM ('DRAFT', 'RELEASED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

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

    CONSTRAINT "BillOfMaterialsItem_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "WorkOrderOperation_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "WorkOrder_tenantId_status_idx" ON "WorkOrder"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrder_tenantId_code_key" ON "WorkOrder"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderComponent_tenantId_workOrderId_lineNo_key" ON "WorkOrderComponent"("tenantId", "workOrderId", "lineNo");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderOperation_tenantId_workOrderId_lineNo_key" ON "WorkOrderOperation"("tenantId", "workOrderId", "lineNo");

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

-- AddForeignKey
ALTER TABLE "BillOfMaterials" ADD CONSTRAINT "BillOfMaterials_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterials" ADD CONSTRAINT "BillOfMaterials_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterialsItem" ADD CONSTRAINT "BillOfMaterialsItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterialsItem" ADD CONSTRAINT "BillOfMaterialsItem_bomId_fkey" FOREIGN KEY ("bomId") REFERENCES "BillOfMaterials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterialsItem" ADD CONSTRAINT "BillOfMaterialsItem_componentItemId_fkey" FOREIGN KEY ("componentItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_bomId_fkey" FOREIGN KEY ("bomId") REFERENCES "BillOfMaterials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_finishedGoodItemId_fkey" FOREIGN KEY ("finishedGoodItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_workflowDefinitionId_fkey" FOREIGN KEY ("workflowDefinitionId") REFERENCES "WorkflowDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderComponent" ADD CONSTRAINT "WorkOrderComponent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderComponent" ADD CONSTRAINT "WorkOrderComponent_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderComponent" ADD CONSTRAINT "WorkOrderComponent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderOperation" ADD CONSTRAINT "WorkOrderOperation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderOperation" ADD CONSTRAINT "WorkOrderOperation_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionIssue" ADD CONSTRAINT "ProductionIssue_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionIssue" ADD CONSTRAINT "ProductionIssue_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionIssueItem" ADD CONSTRAINT "ProductionIssueItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionIssueItem" ADD CONSTRAINT "ProductionIssueItem_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "ProductionIssue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionIssueItem" ADD CONSTRAINT "ProductionIssueItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "MaintenanceSchedule" ADD CONSTRAINT "MaintenanceSchedule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceSchedule" ADD CONSTRAINT "MaintenanceSchedule_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
