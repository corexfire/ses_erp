-- ShopFloorLog: track every operator action on the shop floor
CREATE TABLE IF NOT EXISTS "ShopFloorLog" (
  "id"            TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "tenantId"      TEXT NOT NULL,
  "workOrderId"   TEXT NOT NULL,
  "operationId"   TEXT,
  "operatorName"  TEXT,
  "action"        TEXT NOT NULL,
  "prevStatus"    TEXT,
  "newStatus"     TEXT,
  "qtyReported"   DECIMAL(18,4),
  "laborHours"    DECIMAL(8,2),
  "notes"         TEXT,
  "loggedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "ShopFloorLog_tenantId_workOrderId_idx" ON "ShopFloorLog"("tenantId","workOrderId");

-- ShopFloorTimer: track time per operator per operation (clock-in/out)
CREATE TABLE IF NOT EXISTS "ShopFloorTimer" (
  "id"            TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "tenantId"      TEXT NOT NULL,
  "workOrderId"   TEXT NOT NULL,
  "operationId"   TEXT,
  "operatorName"  TEXT NOT NULL,
  "startTime"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "endTime"       TIMESTAMP(3),
  "durationMin"   DECIMAL(8,2),
  "breakMin"      DECIMAL(8,2) NOT NULL DEFAULT 0,
  "status"        TEXT NOT NULL DEFAULT 'RUNNING',
  "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "ShopFloorTimer_tenantId_workOrderId_idx" ON "ShopFloorTimer"("tenantId","workOrderId");

-- Add columns to WorkOrderOperation that shop floor needs
ALTER TABLE "WorkOrderOperation"
  ADD COLUMN IF NOT EXISTS "operatorName"   TEXT,
  ADD COLUMN IF NOT EXISTS "claimedAt"      TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "completedAt"    TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "actualMachineHours" DECIMAL(8,2),
  ADD COLUMN IF NOT EXISTS "rejectedQty"    DECIMAL(18,4) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "scrapQty"       DECIMAL(18,4) NOT NULL DEFAULT 0;
