import { PrismaClient } from './generated/client';

export async function seedDepreciation(prisma: PrismaClient, tenantId: string) {
  console.log('📉 Seeding Fixed Asset Depreciation History...');

  const assets = await prisma.fixedAsset.findMany({ where: { tenantId } });
  
  if (assets.length === 0) {
    console.log('⚠️ No assets found. Skipping depreciation seed.');
    return;
  }

  // Clear existing depreciation for idempotency
  await prisma.fixedAssetDepreciation.deleteMany({ where: { tenantId } });

  for (const asset of assets) {
    console.log(`   - Processing Asset: ${asset.assetNo} (${asset.name})`);
    
    // Monthly depreciation = (Cost - Salvage) / (Life * 12)
    const annualDepr = Number(asset.purchaseCost) / Number(asset.usefulLife);
    const monthlyDepr = annualDepr / 12;
    
    let accumulated = 0;
    const entries = [];

    // Create 12 months of history starting from March 2023 to February 2024
    for (let month = 0; month < 12; month++) {
      const periodDate = new Date('2023-03-01');
      periodDate.setMonth(periodDate.getMonth() + month);
      
      accumulated += monthlyDepr;
      
      entries.push({
        tenantId,
        assetId: asset.id,
        periodDate,
        depreciationAmount: monthlyDepr,
        accumulatedAmount: accumulated,
        notes: `Penyusutan rutin Bulanan - ${periodDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}`
      });
    }

    await prisma.fixedAssetDepreciation.createMany({
      data: entries
    });
  }

  console.log(`✅ Depreciation history seeded for ${assets.length} assets.`);
}
