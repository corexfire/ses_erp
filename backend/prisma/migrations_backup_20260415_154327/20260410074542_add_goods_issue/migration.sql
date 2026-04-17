-- AlterEnum
ALTER TYPE "StockMoveType" ADD VALUE 'GOODS_ISSUE';

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

-- AddForeignKey
ALTER TABLE "GoodsIssueNote" ADD CONSTRAINT "GoodsIssueNote_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueNote" ADD CONSTRAINT "GoodsIssueNote_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueItem" ADD CONSTRAINT "GoodsIssueItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueItem" ADD CONSTRAINT "GoodsIssueItem_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "GoodsIssueNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueItem" ADD CONSTRAINT "GoodsIssueItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueItem" ADD CONSTRAINT "GoodsIssueItem_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssueItem" ADD CONSTRAINT "GoodsIssueItem_binLocationId_fkey" FOREIGN KEY ("binLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
