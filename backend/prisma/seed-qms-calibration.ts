import { PrismaClient } from './generated/client';

export async function seedCalibration(prisma: PrismaClient, tenantId: string) {
  // 1. Create measurable equipment first if not exists
  const equipmentData = [
    { code: 'EQ-CAL-01', name: 'Digital Caliper 150mm', type: 'MEASURING', model: 'CD-6"CS', manufacturer: 'Mitutoyo' },
    { code: 'EQ-CAL-02', name: 'Pressure Gauge 10 Bar', type: 'MEASURING', model: '232.50', manufacturer: 'WIKA' },
  ];

  for (const eq of equipmentData) {
    await prisma.equipment.upsert({
      where: { tenantId_code: { tenantId, code: eq.code } },
      update: {},
      create: { tenantId, ...eq },
    });
  }

  const caliper = await prisma.equipment.findFirst({ where: { tenantId, code: 'EQ-CAL-01' } });
  const gauge = await prisma.equipment.findFirst({ where: { tenantId, code: 'EQ-CAL-02' } });

  if (!caliper || !gauge) return;

  const logs = [
    {
      equipmentId: caliper.id,
      calibrationDate: new Date('2024-01-10'),
      expiryDate: new Date('2025-01-10'),
      provider: 'PT. Kalibrasi Nasional',
      certificateNo: 'CERT-2024-001',
      result: 'PASS',
      status: 'COMPLETED' as const,
      notes: 'Akurasi dalam batas toleransi 0.02mm.',
    },
    {
      equipmentId: gauge.id,
      calibrationDate: new Date('2023-06-15'),
      expiryDate: new Date('2024-06-15'), // Expiring soon
      provider: 'Internal Lab',
      certificateNo: 'INT-PG-101',
      result: 'PASS',
      status: 'COMPLETED' as const,
      notes: 'Kalibrasi rutin tengah tahun.',
    },
  ];

  for (const log of logs) {
    await prisma.calibrationLog.create({
      data: {
        tenantId,
        ...log,
      },
    });
  }

  console.log('Seeded Calibration logs');
}
