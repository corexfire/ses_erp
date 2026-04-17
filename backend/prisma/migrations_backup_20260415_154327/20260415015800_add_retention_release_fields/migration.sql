-- Add retention release fields to ProgressInvoice
ALTER TABLE "ProgressInvoice"
  ADD COLUMN IF NOT EXISTS "is_retention_released" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "retention_released_at" TIMESTAMP(3);
