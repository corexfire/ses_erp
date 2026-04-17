-- ERP-level fields for ProductionIssue
ALTER TABLE "ProductionIssue"
  ADD COLUMN IF NOT EXISTS "issuedBy"      TEXT,
  ADD COLUMN IF NOT EXISTS "warehouseId"   TEXT,
  ADD COLUMN IF NOT EXISTS "purpose"       TEXT,
  ADD COLUMN IF NOT EXISTS "shiftNo"       INTEGER,
  ADD COLUMN IF NOT EXISTS "updatedAt"     TIMESTAMP(3);

-- ERP-level fields for ProductionIssueItem
ALTER TABLE "ProductionIssueItem"
  ADD COLUMN IF NOT EXISTS "qtyRequired"   DECIMAL(18,4),
  ADD COLUMN IF NOT EXISTS "qtyScrap"      DECIMAL(18,4) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "costPrice"     DECIMAL(18,4),
  ADD COLUMN IF NOT EXISTS "warehouseId"   TEXT,
  ADD COLUMN IF NOT EXISTS "batchId"       TEXT,
  ADD COLUMN IF NOT EXISTS "notes"         TEXT;

-- ERP-level fields for ProductionReceipt
ALTER TABLE "ProductionReceipt"
  ADD COLUMN IF NOT EXISTS "qtyRejected"   DECIMAL(18,4) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "qtyScrap"      DECIMAL(18,4) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "receivedBy"    TEXT,
  ADD COLUMN IF NOT EXISTS "warehouseId"   TEXT,
  ADD COLUMN IF NOT EXISTS "shiftNo"       INTEGER,
  ADD COLUMN IF NOT EXISTS "batchNo"       TEXT,
  ADD COLUMN IF NOT EXISTS "updatedAt"     TIMESTAMP(3);

-- ERP-level fields for InProcessQc
ALTER TABLE "InProcessQc"
  ADD COLUMN IF NOT EXISTS "inspectedBy"   TEXT,
  ADD COLUMN IF NOT EXISTS "qcDate"        TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "checkpoints"   JSONB,
  ADD COLUMN IF NOT EXISTS "disposition"   TEXT NOT NULL DEFAULT 'PENDING',
  ADD COLUMN IF NOT EXISTS "updatedAt"     TIMESTAMP(3);
