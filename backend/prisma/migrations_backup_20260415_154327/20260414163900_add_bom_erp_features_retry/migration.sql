-- AlterTable
ALTER TABLE "BillOfMaterials" ADD COLUMN "baseQty" DECIMAL(18,4) NOT NULL DEFAULT 1,
ADD COLUMN "bomType" TEXT NOT NULL DEFAULT 'MANUFACTURING',
ADD COLUMN "costingMethod" TEXT NOT NULL DEFAULT 'STANDARD';

-- AlterTable
ALTER TABLE "BillOfMaterialsItem" ADD COLUMN "issueMethod" TEXT NOT NULL DEFAULT 'BACKFLUSH',
ADD COLUMN "operationNo" INTEGER;

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

-- CreateIndex
CREATE UNIQUE INDEX "BomOperation_tenantId_bomId_operationNo_key" ON "BomOperation"("tenantId", "bomId", "operationNo");

-- AddForeignKey
ALTER TABLE "BomOperation" ADD CONSTRAINT "BomOperation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BomOperation" ADD CONSTRAINT "BomOperation_bomId_fkey" FOREIGN KEY ("bomId") REFERENCES "BillOfMaterials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
