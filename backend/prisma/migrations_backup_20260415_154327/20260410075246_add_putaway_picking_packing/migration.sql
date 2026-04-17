-- AlterTable
ALTER TABLE "ItemBatch" ADD COLUMN     "expiryDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ItemSerial" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'AVAILABLE';

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

    CONSTRAINT "PackingItem_pkey" PRIMARY KEY ("id")
);

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
CREATE INDEX "ItemBatch_tenantId_expiryDate_idx" ON "ItemBatch"("tenantId", "expiryDate");

-- CreateIndex
CREATE INDEX "ItemSerial_tenantId_status_idx" ON "ItemSerial"("tenantId", "status");

-- AddForeignKey
ALTER TABLE "Putaway" ADD CONSTRAINT "Putaway_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Putaway" ADD CONSTRAINT "Putaway_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Putaway" ADD CONSTRAINT "Putaway_grnId_fkey" FOREIGN KEY ("grnId") REFERENCES "GoodsReceiptNote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PutawayItem" ADD CONSTRAINT "PutawayItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PutawayItem" ADD CONSTRAINT "PutawayItem_putawayId_fkey" FOREIGN KEY ("putawayId") REFERENCES "Putaway"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PutawayItem" ADD CONSTRAINT "PutawayItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PutawayItem" ADD CONSTRAINT "PutawayItem_fromBinLocationId_fkey" FOREIGN KEY ("fromBinLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PutawayItem" ADD CONSTRAINT "PutawayItem_toBinLocationId_fkey" FOREIGN KEY ("toBinLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picking" ADD CONSTRAINT "Picking_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picking" ADD CONSTRAINT "Picking_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picking" ADD CONSTRAINT "Picking_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickingItem" ADD CONSTRAINT "PickingItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickingItem" ADD CONSTRAINT "PickingItem_pickingId_fkey" FOREIGN KEY ("pickingId") REFERENCES "Picking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickingItem" ADD CONSTRAINT "PickingItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickingItem" ADD CONSTRAINT "PickingItem_fromBinLocationId_fkey" FOREIGN KEY ("fromBinLocationId") REFERENCES "BinLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_salesOrderId_fkey" FOREIGN KEY ("salesOrderId") REFERENCES "SalesOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackingItem" ADD CONSTRAINT "PackingItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackingItem" ADD CONSTRAINT "PackingItem_packingId_fkey" FOREIGN KEY ("packingId") REFERENCES "Packing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackingItem" ADD CONSTRAINT "PackingItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
