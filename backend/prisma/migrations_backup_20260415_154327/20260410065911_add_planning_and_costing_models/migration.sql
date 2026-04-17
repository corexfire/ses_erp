-- CreateTable
CREATE TABLE "MrpRun" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "runDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "demandSource" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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

    CONSTRAINT "ProductionCost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MrpRun_tenantId_runDate_idx" ON "MrpRun"("tenantId", "runDate");

-- CreateIndex
CREATE INDEX "MrpSuggestion_tenantId_mrpRunId_idx" ON "MrpSuggestion"("tenantId", "mrpRunId");

-- CreateIndex
CREATE INDEX "MrpSuggestion_tenantId_itemId_idx" ON "MrpSuggestion"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionCost_tenantId_workOrderId_period_key" ON "ProductionCost"("tenantId", "workOrderId", "period");

-- AddForeignKey
ALTER TABLE "MrpRun" ADD CONSTRAINT "MrpRun_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MrpSuggestion" ADD CONSTRAINT "MrpSuggestion_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MrpSuggestion" ADD CONSTRAINT "MrpSuggestion_mrpRunId_fkey" FOREIGN KEY ("mrpRunId") REFERENCES "MrpRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MrpSuggestion" ADD CONSTRAINT "MrpSuggestion_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCost" ADD CONSTRAINT "ProductionCost_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCost" ADD CONSTRAINT "ProductionCost_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
