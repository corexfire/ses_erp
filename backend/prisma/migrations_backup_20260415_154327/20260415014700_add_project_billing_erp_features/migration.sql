-- Create ProgressInvoice table if missing (Fix for broken migration history)
CREATE TABLE IF NOT EXISTS "ProgressInvoice" (
  "id"                TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "tenant_id"         TEXT NOT NULL,
  "project_id"        TEXT NOT NULL,
  "progress_claim_id" TEXT NOT NULL,
  "status"            TEXT NOT NULL DEFAULT 'DRAFT',
  "amount"            DECIMAL(18, 4) DEFAULT 0,
  "invoice_no"        TEXT,
  "ar_invoice_id"     TEXT,
  "created_at"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Drop existing table to clean up failed migration artifacts
DROP TABLE IF EXISTS "ProgressClaim";

-- Update ProgressInvoice table
ALTER TABLE "ProgressInvoice" 
  DROP COLUMN IF EXISTS "amount",
  ADD COLUMN IF NOT EXISTS "progress_percent"   DECIMAL(5, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "retention_percent"  DECIMAL(5, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "retention_amount"   DECIMAL(18, 4) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "dp_deduction_amount" DECIMAL(18, 4) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "gross_amount"       DECIMAL(18, 4) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "vat_percent"        DECIMAL(5, 2) DEFAULT 11,
  ADD COLUMN IF NOT EXISTS "vat_amount"         DECIMAL(18, 4) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "net_amount"         DECIMAL(18, 4) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "period"             TEXT,
  ADD COLUMN IF NOT EXISTS "claim_date"         TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- Rename standard columns to snake_case if they were created as camelCase
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ProgressInvoice' AND column_name='tenantId') THEN
    ALTER TABLE "ProgressInvoice" RENAME COLUMN "tenantId" TO "tenant_id";
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ProgressInvoice' AND column_name='projectId') THEN
    ALTER TABLE "ProgressInvoice" RENAME COLUMN "projectId" TO "project_id";
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ProgressInvoice' AND column_name='progressClaimId') THEN
    ALTER TABLE "ProgressInvoice" RENAME COLUMN "progressClaimId" TO "progress_claim_id";
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ProgressInvoice' AND column_name='invoiceNo') THEN
    ALTER TABLE "ProgressInvoice" RENAME COLUMN "invoiceNo" TO "invoice_no";
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ProgressInvoice' AND column_name='arInvoiceId') THEN
    ALTER TABLE "ProgressInvoice" RENAME COLUMN "arInvoiceId" TO "ar_invoice_id";
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ProgressInvoice' AND column_name='createdAt') THEN
    ALTER TABLE "ProgressInvoice" RENAME COLUMN "createdAt" TO "created_at";
  END IF;
END $$;

-- Create ProgressClaim table
CREATE TABLE "ProgressClaim" (
  "id"               TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "tenant_id"        TEXT NOT NULL,
  "project_id"       TEXT NOT NULL,
  "claim_no"         TEXT NOT NULL,
  "claim_date"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "progress_percent" DECIMAL(5, 2) NOT NULL DEFAULT 0,
  "description"      TEXT,
  "status"           TEXT NOT NULL DEFAULT 'DRAFT', -- DRAFT, VERIFIED, INVOICED
  "attachment_url"   TEXT,
  "created_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "ProgressClaim_project_id_idx" ON "ProgressClaim"("project_id");
CREATE UNIQUE INDEX "ProgressClaim_tenant_id_claim_no_key" ON "ProgressClaim"("tenant_id", "claim_no");
