import { PrismaClient } from './generated/client';

export async function seedSubcontractors(prisma: PrismaClient, tenantId: string) {
  console.log('🏗️  Seeding Subcontractors...');

  const subcontractors = [
    {
      code: 'SUB-001',
      name: 'PT Pondasi Jaya Perkasa',
      category: 'CIVIL',
      contactName: 'Budi Santoso',
      email: 'budi@pondasijaya.co.id',
      phone: '08123456789',
      address: 'Jl. Industri Utama No. 45, Jakarta',
      taxId: '01.234.567.8.910.000',
    },
    {
      code: 'SUB-002',
      name: 'PT Elektrikal Mandiri',
      category: 'ELECTRICAL',
      contactName: 'Andi Wijaya',
      email: 'andi@elektrikalmandiri.com',
      phone: '08122233344',
      address: 'Kawasan Niaga Sudirman Lt. 12, Jakarta',
      taxId: '02.345.678.9.123.000',
    },
    {
      code: 'SUB-003',
      name: 'CV Mekanika HVAC',
      category: 'MEP',
      contactName: 'Setyo Pratama',
      email: 'setyo@mekanikahvac.id',
      phone: '08133344455',
      address: 'Ruko Emerald Blok B-12, Bekasi',
      taxId: '03.456.789.0.123.000',
    },
    {
      code: 'SUB-004',
      name: 'PT Lanskap Hijau Lestari',
      category: 'LANDSCAPE',
      contactName: 'Dewi Lestari',
      email: 'dewi@lanskaphijau.co.id',
      phone: '08155566677',
      address: 'Jl. Taman Bunga No. 8, Bogor',
      taxId: '04.567.890.1.234.000',
    },
    {
      code: 'SUB-005',
      name: 'PT Interior Minimalis',
      category: 'INTERIOR',
      contactName: 'Rina Kartika',
      email: 'rina@interiorminimalis.com',
      phone: '08188877766',
      address: 'Kebayoran Arcade II, Jakarta Selatan',
      taxId: '05.678.901.2.345.000',
    },
  ];

  for (const sub of subcontractors) {
    await prisma.subcontractor.upsert({
      where: {
        tenantId_code: {
          tenantId,
          code: sub.code,
        },
      },
      update: {},
      create: {
        tenantId,
        ...sub,
      },
    });
  }

  console.log('✅ Successfully seeded Subcontractors.');
}
