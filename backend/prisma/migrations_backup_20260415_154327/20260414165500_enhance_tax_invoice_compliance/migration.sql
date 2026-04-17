-- AlterTable
ALTER TABLE "TaxInvoice" ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "customerNpwp" TEXT,
ADD COLUMN     "customerAddress" TEXT,
ADD COLUMN     "customerNik" TEXT,
ADD COLUMN     "referenceType" TEXT,
ADD COLUMN     "referenceId" TEXT,
ADD COLUMN     "isReplacement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalFpNumber" TEXT,
ADD COLUMN     "stampDuty" DECIMAL(18,4) NOT NULL DEFAULT 0,
ADD COLUMN     "discountAmount" DECIMAL(18,4) NOT NULL DEFAULT 0,
ADD COLUMN     "taxPeriod" TEXT,
ADD COLUMN     "taxYear" INTEGER;
