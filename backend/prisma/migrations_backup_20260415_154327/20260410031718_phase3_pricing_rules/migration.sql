-- CreateTable
CREATE TABLE "PriceRule" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 100,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "itemCode" TEXT NOT NULL,
    "uomCode" TEXT,
    "unitPrice" DECIMAL(18,4) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "customerId" TEXT,
    "customerGroup" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscountRule" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 100,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "itemCode" TEXT,
    "uomCode" TEXT,
    "discountPercent" DECIMAL(9,4) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "customerId" TEXT,
    "customerGroup" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscountRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PriceRule_tenantId_isActive_idx" ON "PriceRule"("tenantId", "isActive");

-- CreateIndex
CREATE INDEX "PriceRule_tenantId_itemCode_effectiveDate_idx" ON "PriceRule"("tenantId", "itemCode", "effectiveDate");

-- CreateIndex
CREATE INDEX "PriceRule_tenantId_customerId_idx" ON "PriceRule"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "PriceRule_tenantId_customerGroup_idx" ON "PriceRule"("tenantId", "customerGroup");

-- CreateIndex
CREATE UNIQUE INDEX "PriceRule_tenantId_code_key" ON "PriceRule"("tenantId", "code");

-- CreateIndex
CREATE INDEX "DiscountRule_tenantId_isActive_idx" ON "DiscountRule"("tenantId", "isActive");

-- CreateIndex
CREATE INDEX "DiscountRule_tenantId_effectiveDate_idx" ON "DiscountRule"("tenantId", "effectiveDate");

-- CreateIndex
CREATE INDEX "DiscountRule_tenantId_itemCode_idx" ON "DiscountRule"("tenantId", "itemCode");

-- CreateIndex
CREATE INDEX "DiscountRule_tenantId_customerId_idx" ON "DiscountRule"("tenantId", "customerId");

-- CreateIndex
CREATE INDEX "DiscountRule_tenantId_customerGroup_idx" ON "DiscountRule"("tenantId", "customerGroup");

-- CreateIndex
CREATE UNIQUE INDEX "DiscountRule_tenantId_code_key" ON "DiscountRule"("tenantId", "code");

-- AddForeignKey
ALTER TABLE "PriceRule" ADD CONSTRAINT "PriceRule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceRule" ADD CONSTRAINT "PriceRule_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountRule" ADD CONSTRAINT "DiscountRule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountRule" ADD CONSTRAINT "DiscountRule_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
