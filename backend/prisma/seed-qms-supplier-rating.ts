import { PrismaClient } from './generated/client';

export async function seedSupplierRating(prisma: PrismaClient, tenantId: string) {
  const suppliers = await prisma.supplier.findMany({ where: { tenantId, isActive: true } });

  if (suppliers.length === 0) {
    console.log('Skipping Supplier Rating seed: no suppliers found');
    return;
  }

  const period = '2024-Q1';
  
  for (const supplier of suppliers) {
    // Random but plausible scores for seed data
    const qualityScore = 85 + Math.random() * 15;
    const deliveryScore = 80 + Math.random() * 20;
    const ncrScore = 90 + Math.random() * 10;
    const totalScore = (qualityScore + deliveryScore + ncrScore) / 3;
    
    let grade = 'A';
    if (totalScore < 75) grade = 'C';
    else if (totalScore < 90) grade = 'B';

    await prisma.supplierRating.upsert({
      where: {
        tenantId_supplierId_period: {
          tenantId,
          supplierId: supplier.id,
          period,
        },
      },
      update: {},
      create: {
        tenantId,
        supplierId: supplier.id,
        period,
        qualityScore,
        deliveryScore,
        ncrScore,
        totalScore,
        grade,
        notes: `Penilaian otomatis periode ${period}. Performa stabil.`,
      },
    });
  }

  console.log('Seeded Supplier Rating records');
}
