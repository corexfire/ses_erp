import type { PrismaClient } from './generated/client';

export async function seedRoutes(prisma: PrismaClient, tenantId: string) {
  const routes = [
    {
      code: 'R-001',
      name: 'Jakarta - Surabaya Express',
      origin: 'Jakarta (JKT)',
      destination: 'Surabaya (SUB)',
      distanceKm: 780.5,
      estDurationHours: 14,
      description: 'Layanan logistik ekspres lintas Jawa via Trans Jawa.',
      standardCost: 4500000,
    },
    {
      code: 'R-002',
      name: 'Jakarta - Bandung Reguler',
      origin: 'Jakarta (JKT)',
      destination: 'Bandung (BDG)',
      distanceKm: 155.0,
      estDurationHours: 4.5,
      description: 'Distribusi rutin area Jawa Barat.',
      standardCost: 1200000,
    },
    {
      code: 'R-003',
      name: 'Semarang - Yogyakarta Hub',
      origin: 'Semarang (SRG)',
      destination: 'Yogyakarta (YOG)',
      distanceKm: 128.0,
      estDurationHours: 3.5,
      description: 'Koneksi antar hub Jawa Tengah.',
      standardCost: 950000,
    },
    {
      code: 'R-004',
      name: 'Medan - Pekanbaru Trans Sumatra',
      origin: 'Medan (MED)',
      destination: 'Pekanbaru (PKU)',
      distanceKm: 650.0,
      estDurationHours: 18,
      description: 'Rute utama Trans Sumatra bagian Utara.',
      standardCost: 6800000,
    },
    {
      code: 'R-005',
      name: 'Jabodetabek Distribution Loop',
      origin: 'Bekasi (BKS)',
      destination: 'Tangerang (TNG)',
      distanceKm: 65.0,
      estDurationHours: 2.5,
      description: 'Distribusi last-mile area Jabodetabek.',
      standardCost: 650000,
    },
    {
      code: 'R-006',
      name: 'Makassar - Parepare Coastal',
      origin: 'Makassar (MKS)',
      destination: 'Parepare (PRE)',
      distanceKm: 155.0,
      estDurationHours: 4,
      description: 'Rute logistik Sulawesi Selatan.',
      standardCost: 1800000,
    },
  ];

  for (const r of routes) {
    await prisma.routeTemplate.upsert({
      where: { tenantId_code: { tenantId, code: r.code } },
      update: {
        ...r,
        distanceKm: r.distanceKm,
        estDurationHours: r.estDurationHours,
        standardCost: r.standardCost,
      },
      create: {
        tenantId,
        ...r,
        distanceKm: r.distanceKm,
        estDurationHours: r.estDurationHours,
        standardCost: r.standardCost,
      },
    });
  }

  console.log(`Seeded Logistics Routes: ${routes.length} professional trayeks`);
}
