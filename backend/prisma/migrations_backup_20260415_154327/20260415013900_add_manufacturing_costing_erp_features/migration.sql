-- Update ProductionCost table
ALTER TABLE "ProductionCost" 
  ADD COLUMN IF NOT EXISTS "materialVariance" DECIMAL(18,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "laborVariance"    DECIMAL(18,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "overheadVariance" DECIMAL(18,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "standardCost"     DECIMAL(18,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "actualCost"       DECIMAL(18,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "journalEntryId"   TEXT,
  ADD COLUMN IF NOT EXISTS "isFinalized"      BOOLEAN DEFAULT false;

-- Create ProductionCostDetail table
CREATE TABLE IF NOT EXISTS "ProductionCostDetail" (
  "id"               TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "tenantId"         TEXT NOT NULL,
  "productionCostId" TEXT NOT NULL,
  "costCategory"     TEXT NOT NULL, -- MATERIAL, LABOR, OVERHEAD_FIXED, OVERHEAD_VARIABLE
  "name"             TEXT NOT NULL,
  "standardAmount"   DECIMAL(18,2) NOT NULL DEFAULT 0,
  "actualAmount"     DECIMAL(18,2) NOT NULL DEFAULT 0,
  "variance"         DECIMAL(18,2) NOT NULL DEFAULT 0,
  "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "ProductionCostDetail_productionCostId_idx" ON "ProductionCostDetail"("productionCostId");
