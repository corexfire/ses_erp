-- AlterTable
ALTER TABLE "ItemUom" ADD COLUMN     "conversionRate" DECIMAL(18,4) NOT NULL DEFAULT 1,
ADD COLUMN     "price" DECIMAL(18,4);
