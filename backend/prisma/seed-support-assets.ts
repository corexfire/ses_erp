import type { PrismaClient } from './generated/client';

export async function seedSupportAssets(prisma: PrismaClient, tenantId: string) {
  console.log('📦 Seeding Professional Support Assets...');

  const employees = await prisma.employee.findMany({ where: { tenantId } });
  const sites = await prisma.projectSite.findMany({ where: { tenantId } });

  if (employees.length === 0 || sites.length === 0) {
    console.log('⚠️ Missing prerequisites (Employees/Sites). Skipping asset seed.');
    return;
  }

  const assetsData = [
    // Heavy Equipment
    {
      assetNo: 'HE-EXC-001',
      name: 'Excavator Komatsu PC200-8',
      category: 'HEAVY_EQUIPMENT',
      brand: 'Komatsu',
      model: 'PC200-8',
      serialNumber: 'KMTS-99281-EX',
      purchaseCost: 1250000000,
      usefulLife: 10,
      status: 'ACTIVE',
      nextMaintenanceDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      assetNo: 'HE-EXC-002',
      name: 'Excavator Caterpillar 320D',
      category: 'HEAVY_EQUIPMENT',
      brand: 'Caterpillar',
      model: '320D',
      serialNumber: 'CAT-320D-7761',
      purchaseCost: 1450000000,
      usefulLife: 10,
      status: 'UNDER_MAINTENANCE',
      lastMaintenanceDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      nextMaintenanceDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    // IT Hardware
    {
      assetNo: 'IT-LPT-044',
      name: 'MacBook Pro M3 Max 16"',
      category: 'IT_HARDWARE',
      brand: 'Apple',
      model: 'M3 Max 16/64/1TB',
      serialNumber: 'APL-M3M-X982',
      purchaseCost: 55000000,
      usefulLife: 4,
      status: 'ACTIVE',
      warrantyExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    {
      assetNo: 'IT-LPT-089',
      name: 'Dell Precision 7780 Workstation',
      category: 'IT_HARDWARE',
      brand: 'Dell',
      model: 'Precision 7780',
      serialNumber: 'DELL-P8-Y71',
      purchaseCost: 62000000,
      usefulLife: 4,
      status: 'ACTIVE',
      warrantyExpiry: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    },
    // Vehicles
    {
      assetNo: 'VH-TRK-010',
      name: 'Hino Ranger FL 235 JW',
      category: 'VEHICLE',
      brand: 'Hino',
      model: 'FL 235',
      serialNumber: 'HINO-9918-TRK',
      purchaseCost: 850000000,
      usefulLife: 8,
      status: 'ACTIVE',
      insurancePolicy: 'MAG-88271-XYZ',
      insuranceExpiry: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    },
    {
      assetNo: 'VH-SUV-005',
      name: 'Toyota Fortuner 2.8 GR Sport',
      category: 'VEHICLE',
      brand: 'Toyota',
      model: 'Fortuner 2.8',
      serialNumber: 'TYT-GR-5512',
      purchaseCost: 680000000,
      usefulLife: 7,
      status: 'ACTIVE',
      insuranceExpiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
    // Facilities
    {
      assetNo: 'FC-GEN-001',
      name: 'Genset Cummins 500kVA',
      category: 'FACILITIES',
      brand: 'Cummins',
      model: '500kVA Standby',
      serialNumber: 'CMNS-500K-991',
      purchaseCost: 750000000,
      usefulLife: 15,
      status: 'ACTIVE',
      nextMaintenanceDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    }
  ];

  for (let i = 0; i < assetsData.length; i++) {
    const data = assetsData[i];
    const employee = employees[i % employees.length];
    const site = sites[i % sites.length];

    await prisma.fixedAsset.upsert({
      where: { tenantId_assetNo: { tenantId, assetNo: data.assetNo } },
      update: {
        brand: data.brand,
        model: data.model,
        serialNumber: data.serialNumber,
        locationId: site.id,
        custodianId: employee.id,
        nextMaintenanceDate: (data as any).nextMaintenanceDate,
        lastMaintenanceDate: (data as any).lastMaintenanceDate,
        warrantyExpiry: (data as any).warrantyExpiry,
        insurancePolicy: data.insurancePolicy,
        insuranceExpiry: (data as any).insuranceExpiry,
      },
      create: {
        tenantId,
        assetNo: data.assetNo,
        name: data.name,
        category: data.category,
        purchaseDate: new Date('2023-01-01'),
        purchaseCost: data.purchaseCost,
        usefulLife: data.usefulLife,
        salvageValue: 0,
        status: data.status,
        brand: data.brand,
        model: data.model,
        serialNumber: data.serialNumber,
        locationId: site.id,
        custodianId: employee.id,
        nextMaintenanceDate: (data as any).nextMaintenanceDate,
        lastMaintenanceDate: (data as any).lastMaintenanceDate,
        warrantyExpiry: (data as any).warrantyExpiry,
        insurancePolicy: data.insurancePolicy,
        insuranceExpiry: (data as any).insuranceExpiry,
      }
    });
  }

  console.log('✅ Professional Support Assets seeded successfully.');
}
