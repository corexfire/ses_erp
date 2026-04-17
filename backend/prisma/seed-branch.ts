import { PrismaClient } from './generated/client';

export async function seedBranch(prisma: PrismaClient, tenantId: string) {
  console.log('🏢 Seeding Branch Management...');

  const branches = [
    {
      code: 'KPO-JKT',
      name: 'Kantor Pusat Operasional - Jakarta',
      email: 'jkt.office@ses-erp.local',
      phone: '021-8888-0001',
      address1: 'Gedung Cyber 2, Lt. 32',
      address2: 'Kuningan, Jakarta Selatan',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12950',
      isActive: true
    },
    {
      code: 'BR-SBY',
      name: 'Cabang Surabaya - Jawa Timur',
      email: 'sby.office@ses-erp.local',
      phone: '031-7777-1234',
      address1: 'Pakuwon Center, Lt. 10',
      address2: 'Jl. Embong Malang No. 1-5',
      city: 'Surabaya',
      province: 'Jawa Timur',
      postalCode: '60261',
      isActive: true
    },
    {
      code: 'BR-MDN',
      name: 'Cabang Medan - Sumatera Utara',
      email: 'mdn.office@ses-erp.local',
      phone: '061-4444-5678',
      address1: 'Podomoro City Deli Medan',
      address2: 'Jl. Putri Hijau No. 1',
      city: 'Medan',
      province: 'Sumatera Utara',
      postalCode: '20111',
      isActive: true
    },
    {
      code: 'BR-BPN',
      name: 'Cabang Balikpapan - Kalimantan Timur',
      email: 'bpn.office@ses-erp.local',
      phone: '0542-333-222',
      address1: 'Grand City Balikpapan',
      address2: 'Blok A/12, Ring Road',
      city: 'Balikpapan',
      province: 'Kalimantan Timur',
      postalCode: '76114',
      isActive: true
    }
  ];

  for (const b of branches) {
    await prisma.branch.upsert({
      where: { tenantId_code: { tenantId, code: b.code } },
      update: {
        name: b.name,
        email: b.email,
        phone: b.phone,
        address1: b.address1,
        address2: b.address2,
        city: b.city,
        province: b.province,
        postalCode: b.postalCode,
        isActive: b.isActive
      },
      create: {
        tenantId,
        ...b
      }
    });
  }

  console.log('✅ Branch Management seeded successfully.');
}
