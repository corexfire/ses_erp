-- Update Project table with billing setup fields
ALTER TABLE "Project"
  ADD COLUMN IF NOT EXISTS "retention_rate"      DECIMAL(5, 2) DEFAULT 5,
  ADD COLUMN IF NOT EXISTS "down_payment_total"  DECIMAL(18, 4) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "dp_recovery_rate"    DECIMAL(5, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "billing_type"        TEXT DEFAULT 'PROGRESS';

-- Rename existing columns if they follow camelCase in DB
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Project' AND column_name='totalBudget') THEN
    ALTER TABLE "Project" RENAME COLUMN "totalBudget" TO "total_budget";
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Project' AND column_name='createdAt') THEN
    ALTER TABLE "Project" RENAME COLUMN "createdAt" TO "created_at";
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Project' AND column_name='updatedAt') THEN
    ALTER TABLE "Project" RENAME COLUMN "updatedAt" TO "updated_at";
  END IF;
END $$;
