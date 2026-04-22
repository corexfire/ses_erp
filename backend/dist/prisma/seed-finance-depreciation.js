"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDepreciation = seedDepreciation;
async function seedDepreciation(prisma, tenantId) {
    console.log('📉 Seeding Fixed Asset Depreciation History...');
    const assets = await prisma.fixedAsset.findMany({ where: { tenantId } });
    if (assets.length === 0) {
        console.log('⚠️ No assets found. Skipping depreciation seed.');
        return;
    }
    await prisma.fixedAssetDepreciation.deleteMany({ where: { tenantId } });
    for (const asset of assets) {
        console.log(`   - Processing Asset: ${asset.assetNo} (${asset.name})`);
        const annualDepr = Number(asset.purchaseCost) / Number(asset.usefulLife);
        const monthlyDepr = annualDepr / 12;
        let accumulated = 0;
        const entries = [];
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
//# sourceMappingURL=seed-finance-depreciation.js.map