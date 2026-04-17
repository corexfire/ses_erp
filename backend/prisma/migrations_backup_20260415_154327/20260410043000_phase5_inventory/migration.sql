-- CreateEnum
CREATE TYPE "InventoryDocStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'POSTED', 'VOID');

-- CreateEnum
CREATE TYPE "StockMoveType" AS ENUM ('GRN_RECEIPT', 'TRANSFER_OUT', 'TRANSFER_IN', 'STOCK_COUNT_ADJUST', 'MANUAL_ADJUST');

-- CreateEnum
CREATE TYPE "ValuationMethod" AS ENUM ('MOVING_AVERAGE', 'FIFO');

-- CreateEnum
CREATE TYPE "ItemTrackingType" AS ENUM ('NONE', 'BATCH', 'SERIAL');

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

    CONSTRAINT "StockCountItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QcInspection" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "grnId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QcInspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemBatch" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSerial" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE INDEX "QcInspection_tenantId_grnId_idx" ON "QcInspection"("tenantId", "grnId");

-- CreateIndex
CREATE INDEX "ItemBatch_tenantId_itemId_idx" ON "ItemBatch"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemBatch_tenantId_itemId_code_key" ON "ItemBatch"("tenantId", "itemId", "code");

-- CreateIndex
CREATE INDEX "ItemSerial_tenantId_itemId_idx" ON "ItemSerial"("tenantId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemSerial_tenantId_serialNo_key" ON "ItemSerial"("tenantId", "serialNo");

-- CreateIndex
CREATE INDEX "ValuationLayer_tenantId_postingDate_idx" ON "ValuationLayer"("tenantId", "postingDate");

-- CreateIndex
CREATE INDEX "ValuationLayer_tenantId_itemId_idx" ON "ValuationLayer"("tenantId", "itemId");

-- AddForeignKey
ALTER TABLE "ItemGroup" ADD CONSTRAINT "ItemGroup_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_itemGroupId_fkey" FOREIGN KEY ("itemGroupId") REFERENCES "ItemGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemUom" ADD CONSTRAINT "ItemUom_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemUom" ADD CONSTRAINT "ItemUom_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBarcode" ADD CONSTRAINT "ItemBarcode_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBarcode" ADD CONSTRAINT "ItemBarcode_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinLocation" ADD CONSTRAINT "BinLocation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinLocation" ADD CONSTRAINT "BinLocation_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_binLocationId_fkey" FOREIGN KEY ("binLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "ItemBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_serialId_fkey" FOREIGN KEY ("serialId") REFERENCES "ItemSerial"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptNote" ADD CONSTRAINT "GoodsReceiptNote_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptNote" ADD CONSTRAINT "GoodsReceiptNote_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptNote" ADD CONSTRAINT "GoodsReceiptNote_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptNote" ADD CONSTRAINT "GoodsReceiptNote_purchaseInvoiceId_fkey" FOREIGN KEY ("purchaseInvoiceId") REFERENCES "PurchaseInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptNote" ADD CONSTRAINT "GoodsReceiptNote_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptItem" ADD CONSTRAINT "GoodsReceiptItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptItem" ADD CONSTRAINT "GoodsReceiptItem_grnId_fkey" FOREIGN KEY ("grnId") REFERENCES "GoodsReceiptNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptItem" ADD CONSTRAINT "GoodsReceiptItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptItem" ADD CONSTRAINT "GoodsReceiptItem_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsReceiptItem" ADD CONSTRAINT "GoodsReceiptItem_binLocationId_fkey" FOREIGN KEY ("binLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransfer" ADD CONSTRAINT "StockTransfer_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransfer" ADD CONSTRAINT "StockTransfer_fromWarehouseId_fkey" FOREIGN KEY ("fromWarehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransfer" ADD CONSTRAINT "StockTransfer_toWarehouseId_fkey" FOREIGN KEY ("toWarehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_transferId_fkey" FOREIGN KEY ("transferId") REFERENCES "StockTransfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_fromBinLocationId_fkey" FOREIGN KEY ("fromBinLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferItem" ADD CONSTRAINT "StockTransferItem_toBinLocationId_fkey" FOREIGN KEY ("toBinLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCount" ADD CONSTRAINT "StockCount_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCount" ADD CONSTRAINT "StockCount_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCount" ADD CONSTRAINT "StockCount_workflowDefinitionId_fkey" FOREIGN KEY ("workflowDefinitionId") REFERENCES "WorkflowDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCountItem" ADD CONSTRAINT "StockCountItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCountItem" ADD CONSTRAINT "StockCountItem_stockCountId_fkey" FOREIGN KEY ("stockCountId") REFERENCES "StockCount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCountItem" ADD CONSTRAINT "StockCountItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockCountItem" ADD CONSTRAINT "StockCountItem_binLocationId_fkey" FOREIGN KEY ("binLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcInspection" ADD CONSTRAINT "QcInspection_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcInspection" ADD CONSTRAINT "QcInspection_grnId_fkey" FOREIGN KEY ("grnId") REFERENCES "GoodsReceiptNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBatch" ADD CONSTRAINT "ItemBatch_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBatch" ADD CONSTRAINT "ItemBatch_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSerial" ADD CONSTRAINT "ItemSerial_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSerial" ADD CONSTRAINT "ItemSerial_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValuationLayer" ADD CONSTRAINT "ValuationLayer_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValuationLayer" ADD CONSTRAINT "ValuationLayer_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
