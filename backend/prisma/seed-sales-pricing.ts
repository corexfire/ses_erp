import { PrismaClient } from './generated';

export async function seedSalesPricing(prismaInstance: PrismaClient, tenantId: string) {
  console.log('💲 Seeding Comprehensive Sales Pricing...');

  // Get some reference items
  const items = await prismaInstance.item.findMany({
    where: { tenantId, isSalesItem: true },
    take: 5
  });

  const customers = await prismaInstance.customer.findMany({
    where: { tenantId },
    take: 2
  });

  if (items.length === 0) {
    console.log('No sales items found, skipping generic pricing setup.');
    return;
  }

  // 1. PRICE LISTS (Tiers)
  console.log('  -> Creating Price Lists (Retail, Wholesale, Distributor)...');
  
  const retailList = await prismaInstance.priceList.upsert({
    where: { tenantId_code: { tenantId, code: 'PL-RETAIL-STD' } },
    update: {},
    create: { tenantId, code: 'PL-RETAIL-STD', name: 'Standard Retail Prices' }
  });

  const wholesaleList = await prismaInstance.priceList.upsert({
    where: { tenantId_code: { tenantId, code: 'PL-WHOLESALE-T1' } },
    update: {},
    create: { tenantId, code: 'PL-WHOLESALE-T1', name: 'Wholesale Tier 1' }
  });

  const distributorList = await prismaInstance.priceList.upsert({
    where: { tenantId_code: { tenantId, code: 'PL-DISTRIBUTOR-EXC' } },
    update: {},
    create: { tenantId, code: 'PL-DISTRIBUTOR-EXC', name: 'Exclusive Distributor Prices' }
  });

  // 2. PRICE LIST ITEMS (Progressive discounts per tier)
  console.log('  -> Populating Price List Items...');
  
  const basePrice = 50000;
  for (const item of items) {
    const itemCode = item.code;
    const uom = item.baseUomCode;

    // Retail: 100% of Base Price
    const existingRetailItem = await prismaInstance.priceListItem.findFirst({
      where: { tenantId, priceListId: retailList.id, itemCode }
    });
    if (!existingRetailItem) {
      await prismaInstance.priceListItem.create({
        data: {
          tenantId, priceListId: retailList.id, itemCode, uomCode: uom,
          unitPrice: basePrice, effectiveDate: new Date('2024-01-01')
        }
      });
    }

    // Wholesale: 85% of Base Price
    const existingWholesaleItem = await prismaInstance.priceListItem.findFirst({
      where: { tenantId, priceListId: wholesaleList.id, itemCode }
    });
    if (!existingWholesaleItem) {
      await prismaInstance.priceListItem.create({
        data: {
          tenantId, priceListId: wholesaleList.id, itemCode, uomCode: uom,
          unitPrice: basePrice * 0.85, effectiveDate: new Date('2024-01-01')
        }
      });
    }

    // Distributor: 70% of Base Price
    const existingDistItem = await prismaInstance.priceListItem.findFirst({
      where: { tenantId, priceListId: distributorList.id, itemCode }
    });
    if (!existingDistItem) {
      await prismaInstance.priceListItem.create({
        data: {
          tenantId, priceListId: distributorList.id, itemCode, uomCode: uom,
          unitPrice: basePrice * 0.70, effectiveDate: new Date('2024-01-01')
        }
      });
    }
  }

  // 3. DISCOUNT RULES (Volume/Promo)
  console.log('  -> Creating Discount Rules...');
  await prismaInstance.discountRule.upsert({
    where: { tenantId_code: { tenantId, code: 'DR-HOLIDAY-10' } },
    update: {},
    create: {
      tenantId, code: 'DR-HOLIDAY-10', name: 'Holiday Season Discount 10%',
      priority: 50, discountPercent: 10.0,
      effectiveDate: new Date('2024-12-01'), endDate: new Date('2024-12-31')
    }
  });

  await prismaInstance.discountRule.upsert({
    where: { tenantId_code: { tenantId, code: 'DR-LOYALTY-5' } },
    update: {},
    create: {
      tenantId, code: 'DR-LOYALTY-5', name: 'Loyalty Program 5%',
      priority: 80, discountPercent: 5.0,
      customerGroup: 'VIP', effectiveDate: new Date('2024-01-01')
    }
  });

  if (customers.length > 0) {
    const loyalCust = customers[0];
    await prismaInstance.discountRule.upsert({
      where: { tenantId_code: { tenantId, code: `DR-CUST-${loyalCust.code}` } },
      update: {},
      create: {
        tenantId, code: `DR-CUST-${loyalCust.code}`, name: `Special Agreement - ${loyalCust.name}`,
        priority: 10, discountPercent: 15.0, // High priority 10
        customerId: loyalCust.id, effectiveDate: new Date('2024-01-01')
      }
    });

    // 4. PRICE RULES (Specific Overrides)
    console.log('  -> Creating Price Rules...');
    const targetItem = items[0];
    await prismaInstance.priceRule.upsert({
      where: { tenantId_code: { tenantId, code: 'PR-FLASH-SALE' } },
      update: {},
      create: {
        tenantId, code: 'PR-FLASH-SALE', name: 'Flash Sale (Specific Item)',
        priority: 5, // Trumps almost everything
        itemCode: targetItem.code, uomCode: targetItem.baseUomCode,
        unitPrice: 15000, 
        effectiveDate: new Date('2024-06-01'), endDate: new Date('2024-06-05')
      }
    });

    await prismaInstance.priceRule.upsert({
      where: { tenantId_code: { tenantId, code: `PR-${loyalCust.code}-LOCK` } },
      update: {},
      create: {
        tenantId, code: `PR-${loyalCust.code}-LOCK`, name: `Price Lock - ${loyalCust.name}`,
        priority: 1, // Highest priority
        itemCode: targetItem.code, uomCode: targetItem.baseUomCode,
        unitPrice: 20000, customerId: loyalCust.id,
        effectiveDate: new Date('2024-01-01')
      }
    });
  }

  console.log('💲 --- SALES PRICING SEEDING COMPLETED ---');
}
