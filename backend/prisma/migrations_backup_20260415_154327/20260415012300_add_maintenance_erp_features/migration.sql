-- Add ERP fields to Equipment
ALTER TABLE "Equipment" 
  ADD COLUMN IF NOT EXISTS "serialNumber"      TEXT,
  ADD COLUMN IF NOT EXISTS "manufacturer"      TEXT,
  ADD COLUMN IF NOT EXISTS "model"             TEXT,
  ADD COLUMN IF NOT EXISTS "criticality"       TEXT DEFAULT 'MEDIUM',
  ADD COLUMN IF NOT EXISTS "purchaseDate"      TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "warrantyExpiryDate" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "workCenterId"      TEXT;

-- MaintenanceLog: record actual work performed
CREATE TABLE IF NOT EXISTS "MaintenanceLog" (
  "id"              TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "tenantId"        TEXT NOT NULL,
  "equipmentId"     TEXT NOT NULL,
  "requestId"       TEXT,
  "scheduleId"      TEXT,
  "logDate"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "technicianName"  TEXT NOT NULL,
  "workType"        TEXT NOT NULL, -- CORRECTIVE, PREVENTIVE, PREDICTIVE
  "durationMin"     INTEGER NOT NULL DEFAULT 0,
  "description"     TEXT NOT NULL,
  "totalCost"       DECIMAL(18,2) NOT NULL DEFAULT 0,
  "laborCost"       DECIMAL(18,2) NOT NULL DEFAULT 0,
  "partsCost"       DECIMAL(18,2) NOT NULL DEFAULT 0,
  "status"          TEXT NOT NULL DEFAULT 'COMPLETED',
  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "MaintenanceLog_tenantId_equipmentId_idx" ON "MaintenanceLog"("tenantId", "equipmentId");

-- MaintenanceLogPart: track spare parts usage
CREATE TABLE IF NOT EXISTS "MaintenanceLogPart" (
  "id"               TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "tenantId"         TEXT NOT NULL,
  "maintenanceLogId" TEXT NOT NULL,
  "itemId"           TEXT NOT NULL, -- Spare part item
  "qtyUsed"          DECIMAL(18,4) NOT NULL,
  "unitCost"         DECIMAL(18,2) NOT NULL,
  "totalCost"        DECIMAL(18,2) NOT NULL,
  "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "MaintenanceLogPart_maintenanceLogId_idx" ON "MaintenanceLogPart"("maintenanceLogId");

-- MaintenanceTask: checklist items for schedules
CREATE TABLE IF NOT EXISTS "MaintenanceTask" (
  "id"           TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "tenantId"     TEXT NOT NULL,
  "scheduleId"   TEXT NOT NULL,
  "description"  TEXT NOT NULL,
  "isMandatory"  BOOLEAN NOT NULL DEFAULT true,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "MaintenanceTask_scheduleId_idx" ON "MaintenanceTask"("scheduleId");
