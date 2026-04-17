import { PrismaClient } from './generated/client';

export async function seedProfitCenter(prisma: PrismaClient, tenantId: string) {
  console.log('📈 Seeding Profit Centers...');

  const centers = [
    { code: 'PC-JKE', name: 'Java Regional Profit Center' },
    { code: 'PC-SKE', name: 'Sumatra Regional Profit Center' },
    { code: 'PC-KRE', name: 'Kalimantan Regional Profit Center' },
    { code: 'PC-SRE', name: 'Sulawesi Regional Profit Center' },
    { code: 'PC-BRE', name: 'Bali & Nusa Regional Profit Center' },
  ];

  for (const c of centers) {
    await prisma.profitCenter.upsert({
      where: { tenantId_code: { tenantId, code: c.code } },
      update: { name: c.name, isActive: true },
      create: { tenantId, code: c.code, name: c.name }
    });
  }

  console.log('✅ Profit Centers seeded successfully.');
}
