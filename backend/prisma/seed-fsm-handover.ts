import { PrismaClient } from './generated/client';

export async function seedHandover(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding FSM Handover (BAST)...');

  let customers = await prisma.customer.findMany({ 
    where: { tenantId },
    take: 5 
  });
  
  if (customers.length === 0) {
    const defaultCustomer = await prisma.customer.create({
      data: {
        tenantId,
        name: 'PT. Sarana Jaya (Default Seed)',
        code: 'CUST-DEFAULT',
        email: 'info@saranajaya.test',
        phone: '021-555-1234',
        address1: 'Jl. Jendral Sudirman No. 1, Jakarta'
      }
    });
    customers = [defaultCustomer];
  }

  const equipment = await prisma.equipment.findMany({
    where: { tenantId },
    take: 5
  });

  const serviceOrders = await prisma.fsmServiceOrder.findMany({
    where: { tenantId },
    take: 5
  });

  const technician = await prisma.user.findFirst({
    where: { tenantId }
  });

  if (!technician) {
    console.error('❌ No technician user found for handover seeding.');
    return;
  }

  const handovers = [
    {
      code: 'BAST/2026/04/001',
      recipientName: 'Budi Wahyudi',
      recipientTitle: 'Facility Manager',
      status: 'FINALIZED',
      remarks: 'Pekerjaan selesai tepat waktu, semua sistem berfungsi normal.',
    },
    {
      code: 'BAST/2026/04/002',
      recipientName: 'Siti Rahmawati',
      recipientTitle: 'Operation Supervisor',
      status: 'FINALIZED',
      remarks: 'Unit telah dites dan diserahkan dalam kondisi bersih.',
    },
    {
      code: 'BAST/2026/04/003',
      recipientName: 'Agus Setiawan',
      recipientTitle: 'Chief Engineer',
      status: 'SUBMITTED',
      remarks: 'Menunggu tanda tangan dari pihak owner.',
    },
    {
      code: 'BAST/2026/04/004',
      recipientName: 'Linda Permata',
      recipientTitle: 'Procurement',
      status: 'DRAFT',
      remarks: 'Data checklist masih perlu dilengkapi.',
    },
    {
      code: 'BAST/2026/04/005',
      recipientName: 'Hendra Wijaya',
      recipientTitle: 'Site Manager',
      status: 'FINALIZED',
      remarks: 'Training user telah dilakukan.',
    },
    {
      code: 'BAST/2026/04/006',
      recipientName: 'Dewi Lestari',
      recipientTitle: 'Admin Office',
      status: 'SUBMITTED',
      remarks: 'Foto dokumentasi sudah lengkap.',
    },
    {
      code: 'BAST/2026/04/007',
      recipientName: 'Rudi Tabuti',
      recipientTitle: 'Engineering Manager',
      status: 'FINALIZED',
      remarks: 'Sparepart bekas sudah dikembalikan ke gudang customer.',
    },
  ];

  const checklistPresets = [
    { task: 'Pembersihan area kerja', status: true, remark: 'Bersih' },
    { task: 'Pengetesan alat/unit', status: true, remark: 'Berfungsi normal' },
    { task: 'Pengecekan kebocoran', status: true, remark: 'Tidak ada bocor' },
    { task: 'Edukasi pengoperasian ke user', status: true, remark: 'User sudah paham' },
    { task: 'Penyerahan kunci/akses', status: true, remark: 'Sudah diserahkan' },
  ];

  for (let i = 0; i < handovers.length; i++) {
    const h = handovers[i];
    const customer = customers[i % customers.length];
    const equip = equipment[i % equipment.length];
    const so = serviceOrders[i % serviceOrders.length];

    await prisma.fsmHandover.upsert({
      where: { 
        tenantId_code: { tenantId, code: h.code } 
      },
      update: {},
      create: {
        tenantId,
        code: h.code,
        customerId: customer.id,
        technicianId: technician.id,
        equipmentId: equip?.id,
        serviceOrderId: so?.id,
        handoverDate: new Date(),
        status: h.status,
        recipientName: h.recipientName,
        recipientTitle: h.recipientTitle,
        remarks: h.remarks,
        checklist: checklistPresets as any,
        photos: [
          { url: 'https://placehold.co/600x400/png?text=Unit+Photo+1', description: 'Kondisi Unit' },
          { url: 'https://placehold.co/600x400/png?text=Unit+Photo+2', description: 'Panel Kontrol' }
        ] as any
      }
    });
  }

  console.log('✅ FSM Handover records seeded.');
}
