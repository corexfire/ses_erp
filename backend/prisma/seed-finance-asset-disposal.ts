import { PrismaClient } from './generated/client';

export async function seedAssetDisposal(prisma: PrismaClient, tenantId: string) {
  console.log('🚮 Seeding Fixed Asset Disposal Scenarios...');

  const assets = await prisma.fixedAsset.findMany({ 
    where: { tenantId },
    include: { depreciationEntries: true }
  });

  if (assets.length === 0) {
    console.log('⚠️ No assets found for disposal. Skipping.');
    return;
  }

  // Helper to get book value
  const getBookValue = (asset: any) => {
    const cost = Number(asset.purchaseCost);
    const accumulated = asset.depreciationEntries.reduce((sum: number, d: any) => sum + Number(d.depreciationAmount), 0);
    return cost - accumulated;
  };

  // Find specific assets for scenarios
  const fortuner = assets.find(a => a.assetNo === 'VH-SUV-005');
  const macbook = assets.find(a => a.assetNo === 'IT-LPT-044');
  const excavator = assets.find(a => a.assetNo === 'HE-EXC-001');
  const genset = assets.find(a => a.assetNo === 'FC-GEN-001');

  // Idempotency: Clear existing disposal for these codes
  const disposalCodes = ['DISP-SALE-001', 'DISP-SCRP-001', 'DISP-DFT-001', 'DISP-HIST-001'];
  await prisma.assetDisposal.deleteMany({ where: { tenantId, disposalNo: { in: disposalCodes } } });

  // 1. Profitable Sale (Fortuner)
  if (fortuner) {
    const bookValue = getBookValue(fortuner);
    const saleValue = bookValue + 50000000; // 50jt gain
    await prisma.assetDisposal.create({
      data: {
        tenantId,
        assetId: fortuner.id,
        disposalNo: 'DISP-SALE-001',
        disposalDate: new Date(),
        saleValue,
        lossGain: 50000000,
        status: 'APPROVED',
        notes: 'Sold to used car dealer at premium price due to excellent condition.'
      }
    });
    // Update asset status
    await prisma.fixedAsset.update({ where: { id: fortuner.id }, data: { status: 'DISPOSED' } });
  }

  // 2. Scrapped Asset (Macbook)
  if (macbook) {
    const bookValue = getBookValue(macbook);
    await prisma.assetDisposal.create({
      data: {
        tenantId,
        assetId: macbook.id,
        disposalNo: 'DISP-SCRP-001',
        disposalDate: new Date(),
        saleValue: 0,
        lossGain: -bookValue,
        status: 'APPROVED',
        notes: 'Total loss due to severe water damage. Scrapped for components.'
      }
    });
    await prisma.fixedAsset.update({ where: { id: macbook.id }, data: { status: 'DISPOSED' } });
  }

  // 3. Pending Disposal (Draft) (Excavator)
  if (excavator) {
    const bookValue = getBookValue(excavator);
    await prisma.assetDisposal.create({
      data: {
        tenantId,
        assetId: excavator.id,
        disposalNo: 'DISP-DFT-001',
        disposalDate: new Date(),
        saleValue: bookValue * 0.8, // Pending negotiation
        lossGain: -(bookValue * 0.2), 
        status: 'DRAFT',
        notes: 'Internal survey for resale. Waiting for valuation report.'
      }
    });
  }

  // 4. Historical Disposal (6 months ago) (Genset)
  if (genset) {
    const bookValue = getBookValue(genset);
    const disposalDate = new Date();
    disposalDate.setMonth(disposalDate.getMonth() - 6);

    await prisma.assetDisposal.create({
      data: {
        tenantId,
        assetId: genset.id,
        disposalNo: 'DISP-HIST-001',
        disposalDate,
        saleValue: bookValue * 0.5,
        lossGain: -(bookValue * 0.5),
        status: 'APPROVED',
        notes: 'Replaced with newer high-capacity unit.'
      }
    });
    await prisma.fixedAsset.update({ where: { id: genset.id }, data: { status: 'DISPOSED' } });
  }

  console.log('✅ Asset Disposal scenarios seeded successfully.');
}
