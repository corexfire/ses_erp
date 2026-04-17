import { PrismaClient } from './generated/client';

export async function seedCapa(prisma: PrismaClient, tenantId: string) {
  const admin = await prisma.user.findFirst({ where: { tenantId, isSuperAdmin: true } });
  const ncr = await prisma.nonConformanceReport.findFirst({ where: { tenantId, code: 'NCR-2024-002' } });

  if (!admin || !ncr) {
    console.log('Skipping CAPA seed: admin or source NCR not found');
    return;
  }

  const capas = [
    {
      code: 'CAPA-2024-001',
      sourceNcrId: ncr.id,
      description: 'Kegagalan struktural pada tangki pencampur di Lini A.',
      rootCause: 'Korosi pada seal internal yang tidak terdeteksi selama pemeliharaan rutin 6 bulanan.',
      correctiveAction: 'Penggantian seluruh seal set pada tangki pencampur dan pembersihan area lining produksi.',
      preventiveAction: 'Revisi SOP pemeliharaan preventif menjadi setiap 3 bulan dan pemasangan sensor deteksi kebocoran otomatis.',
      status: 'IMPLEMENTING' as const,
      assignedToId: admin.id,
      targetDate: new Date('2024-06-30'),
    },
    {
      code: 'CAPA-2024-002',
      sourceNcrId: undefined,
      description: 'Audit Kepatuhan: Dokumentasi sertifikasi operator alat berat kadaluarsa.',
      rootCause: 'Sistem pengingat (reminder) manual tidak berjalan efektif.',
      correctiveAction: 'Sertifikasi ulang untuk 5 operator di gudang utama.',
      preventiveAction: 'Implementasi fitur notifikasi otomatis di modu HRIS untuk masa berlaku sertifikat.',
      status: 'CLOSED' as const,
      assignedToId: admin.id,
      targetDate: new Date('2024-05-15'),
      findings: 'Seluruh operator telah tersertifikasi standar ISO 9001:2015.',
    },
  ];

  for (const capa of capas) {
    await prisma.capa.upsert({
      where: { tenantId_code: { tenantId, code: capa.code } },
      update: {},
      create: {
        tenantId,
        ...capa,
      },
    });
  }

  console.log('Seeded CAPA records');
}
