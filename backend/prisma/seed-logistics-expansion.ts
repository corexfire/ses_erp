import { PrismaClient } from './generated/client';

export async function seedLogisticsExpansion(prisma: PrismaClient, tenantId: string) {
  console.log('--- Seeding Logistics Expansion ---');

  // 1. Seed Transporters (3PL Partners)
  const transporters = await Promise.all([
    prisma.transporter.upsert({
      where: { tenantId_code: { tenantId, code: 'TRN-001' } },
      update: {},
      create: {
        tenantId,
        code: 'TRN-001',
        name: 'PT. Logistik Jaya Abadi',
        contactName: 'Budi Santoso',
        phone: '081234567890',
        email: 'budi@logistikjaya.com',
        address: 'Jl. Industri No. 12, Jakarta',
        isActive: true,
      },
    }),
    prisma.transporter.upsert({
      where: { tenantId_code: { tenantId, code: 'TRN-002' } },
      update: {},
      create: {
        tenantId,
        code: 'TRN-002',
        name: 'CepatExpress 3PL',
        contactName: 'Siti Aminah',
        phone: '081298765432',
        email: 'siti@cepatexpress.id',
        address: 'Kawasan Pergudangan Bitung Kav. 5',
        isActive: true,
      },
    }),
    prisma.transporter.upsert({
      where: { tenantId_code: { tenantId, code: 'TRN-003' } },
      update: {},
      create: {
        tenantId,
        code: 'TRN-003',
        name: 'Global Freight Solutions',
        contactName: 'John Doe',
        phone: '081122334455',
        email: 'john@globalfreight.com',
        isActive: true,
      },
    }),
  ]);

  // 2. Seed Fleet Vehicles
  const vehicles = await Promise.all([
    prisma.fleetVehicle.upsert({
      where: { tenantId_code: { tenantId, code: 'VEH-001' } },
      update: {},
      create: {
        tenantId,
        code: 'VEH-001',
        plateNo: 'B 1234 ABC',
        vehicleType: 'WINGBOX',
        brand: 'Hino',
        model: 'Ranger',
        year: 2022,
        capacityWeight: 15000,
        capacityVolume: 45,
        status: 'ACTIVE',
      },
    }),
    prisma.fleetVehicle.upsert({
      where: { tenantId_code: { tenantId, code: 'VEH-002' } },
      update: {},
      create: {
        tenantId,
        code: 'VEH-002',
        plateNo: 'B 5678 DEF',
        vehicleType: 'CDE',
        brand: 'Isuzu',
        model: 'Elf',
        year: 2021,
        capacityWeight: 2500,
        capacityVolume: 9,
        status: 'ACTIVE',
      },
    }),
    prisma.fleetVehicle.upsert({
      where: { tenantId_code: { tenantId, code: 'VEH-003' } },
      update: {},
      create: {
        tenantId,
        code: 'VEH-003',
        plateNo: 'B 9012 GHI',
        vehicleType: 'VAN',
        brand: 'Daihatsu',
        model: 'GranMax',
        year: 2023,
        capacityWeight: 1000,
        capacityVolume: 4,
        status: 'MAINTENANCE',
      },
    }),
  ]);

  // 3. Seed Maintenance Records
  await prisma.vehicleMaintenance.deleteMany({ where: { tenantId } });
  await prisma.vehicleMaintenance.createMany({
    data: [
      {
        tenantId,
        vehicleId: vehicles[0].id,
        maintenanceType: 'ROUTINE',
        description: 'Ganti Oli & Filter Mesin',
        lastServiceAt: new Date('2024-03-01'),
        nextServiceAt: new Date('2024-06-01'),
        cost: 1500000,
        status: 'COMPLETED',
      },
      {
        tenantId,
        vehicleId: vehicles[0].id,
        maintenanceType: 'TIRE',
        description: 'Rotasi Ban & Spooring',
        lastServiceAt: new Date('2024-04-15'),
        nextServiceAt: new Date('2024-10-15'),
        cost: 850000,
        status: 'COMPLETED',
      },
      {
        tenantId,
        vehicleId: vehicles[1].id,
        maintenanceType: 'REPAIR',
        description: 'Perbaikan Lampu Depan',
        lastServiceAt: new Date('2024-04-20'),
        cost: 450000,
        status: 'COMPLETED',
      },
      {
        tenantId,
        vehicleId: vehicles[2].id,
        maintenanceType: 'ROUTINE',
        description: 'Servis Turun Mesin Ringan',
        nextServiceAt: new Date('2024-05-10'),
        status: 'SCHEDULED',
      },
    ],
  });

  // 4. Seed Vehicle Documents
  await prisma.vehicleDocument.deleteMany({ where: { tenantId } });
  await prisma.vehicleDocument.createMany({
    data: [
      {
        tenantId,
        vehicleId: vehicles[0].id,
        documentType: 'STNK',
        documentNumber: '12345678',
        expiryDate: new Date('2025-05-20'),
        status: 'ACTIVE',
      },
      {
        tenantId,
        vehicleId: vehicles[0].id,
        documentType: 'KIR',
        documentNumber: 'KIR-88899',
        expiryDate: new Date('2024-04-01'), // Expired
        status: 'EXPIRED',
      },
      {
        tenantId,
        vehicleId: vehicles[1].id,
        documentType: 'STNK',
        documentNumber: '87654321',
        expiryDate: new Date('2024-12-30'),
        status: 'ACTIVE',
      },
    ],
  });

  // 5. Seed Trip Plans & Costs
  await prisma.tripCost.deleteMany({ where: { tenantId } });
  await prisma.tripPlan.deleteMany({ where: { tenantId } });

  const trip = await prisma.tripPlan.create({
    data: {
      tenantId,
      code: 'TRP-20240421-001',
      routeDate: new Date(),
      status: 'DISPATCHED',
      vehicleId: vehicles[0].id,
      notes: 'Pengiriman lintas jawa',
      costs: {
        create: [
          {
            tenantId,
            costType: 'FUEL',
            amount: 1200000,
            description: 'BBM Pertamina Dex',
            status: 'APPROVED',
          },
          {
            tenantId,
            costType: 'TOLL',
            amount: 450000,
            description: 'Tol Trans Jawa',
            status: 'SUBMITTED',
          },
          {
            tenantId,
            costType: 'PARKING',
            amount: 50000,
            status: 'DRAFT',
          },
        ],
      },
    },
  });

  console.log('Logistics expansion seeding completed!');
}
