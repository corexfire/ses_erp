import { PrismaClient, FsmServiceType, FsmServiceOrderStatus, FsmAppointmentStatus, TicketPriority } from './generated/client';

export async function seedFsm(prisma: PrismaClient, tenantId: string) {
  let admin = await prisma.user.findFirst({ where: { tenantId, isSuperAdmin: true } });
  if (!admin) {
    admin = await prisma.user.findFirst({ where: { tenantId } });
  }

  let customers = await prisma.customer.findMany({ where: { tenantId }, take: 5 });
  if (customers.length === 0) {
    const defaultCustomer = await prisma.customer.upsert({
      where: { tenantId_code: { tenantId, code: 'CUST-FSM-01' } },
      update: {},
      create: {
        tenantId,
        name: 'PT. Maintenance Service Indonesia',
        code: 'CUST-FSM-01',
        email: 'helpdesk@msi.test',
        phone: '021-999-888',
        address1: 'Sudirman Central Business District, Jakarta'
      }
    });
    customers = [defaultCustomer];
  }

  let item = await prisma.item.findFirst({ where: { tenantId } });
  if (!item) {
    item = await prisma.item.create({
      data: {
        tenantId,
        name: 'Sparepart Compressor AC 2PK',
        code: 'SP-COMP-02',
        baseUomCode: 'UNIT', // Fallback
      }
    });
  }

  if (!admin || customers.length === 0 || !item) {
    console.log('Skipping FSM seed: admin, customers, or item not found');
    return;
  }

  const users = await prisma.user.findMany({ where: { tenantId }, take: 5 });
  const tech1 = users[0];
  const tech2 = users[1] || users[0];
  const tech3 = users[2] || users[0];

  const customer1 = customers[0];
  const customer2 = customers[1] || customers[0];
  const customer3 = customers[2] || customers[0];

  // ─── Helper to safely get customer  ────────────────
  const getCustomer = (idx: number) => customers[idx] || customers[0];

  const serviceOrderData = [
    {
      code: 'SO-FSM-2024-001',
      customerId: customer1.id,
      subject: 'Pemasangan Unit AC VRV - Lantai 8 & 9',
      serviceType: FsmServiceType.INSTALLATION,
      priority: TicketPriority.HIGH,
      status: FsmServiceOrderStatus.COMPLETED,
      description: 'Instalasi sistem AC VRV Daikin kapasitas 20HP untuk area office lantai 8 dan 9. Termasuk penarikan pipa refrigerant, instalasi FCU, dan pengkabelan ke panel listrik.',
      locationAddress: 'Gedung Menara Sudirman, Jl. Jend. Sudirman Kav. 76, Jakarta Selatan 12910',
      contactName: 'Bpk. Hendro Wibowo',
      contactPhone: '0811-234-5678',
      totalEstimatedDuration: 480,
      notes: 'Akses gedung hanya weekday jam 08.00-17.00. Hubungi security lobby terlebih dahulu.',
    },
    {
      code: 'SO-FSM-2024-002',
      customerId: getCustomer(1).id,
      subject: 'Perbaikan Darurat - Lift Macet Lantai 5',
      serviceType: FsmServiceType.REPAIR,
      priority: TicketPriority.URGENT,
      status: FsmServiceOrderStatus.IN_PROGRESS,
      description: 'Lift nomor 3 tiba-tiba berhenti dan tidak bergerak di lantai 5. Sudah ada 2 penumpang yang terjebak. Emergency dispatch diperlukan.',
      locationAddress: 'Wisma GKBI, Jl. Jend. Sudirman No. 28, Jakarta Pusat 10210',
      contactName: 'Ibu Ratna Sari - Chief Engineering',
      contactPhone: '0812-876-5432',
      totalEstimatedDuration: 180,
      notes: 'PRIORITAS DARURAT! Tim harus tiba dalam 30 menit.',
    },
    {
      code: 'SO-FSM-2024-003',
      customerId: getCustomer(2).id,
      subject: 'Preventive Maintenance Genset 500kVA Berkala',
      serviceType: FsmServiceType.MAINTENANCE,
      priority: TicketPriority.MEDIUM,
      status: FsmServiceOrderStatus.SCHEDULED,
      description: 'PM rutin Q1 2024 untuk genset Caterpillar 500kVA. Meliputi: penggantian oli, filter udara, filter bahan bakar, cek kebocoran, load test, dan kalibrasi ATS.',
      locationAddress: 'PT Kawasan Berikat Nusantara, Jl. Raya Cakung Cilincing, Jakarta Utara',
      contactName: 'Sdr. Agus Prasetyo - Teknisi Lokal',
      contactPhone: '0878-123-4567',
      totalEstimatedDuration: 360,
      notes: 'Sediakan genset cadangan saat PM berlangsung. Koordinasi dengan PLN untuk shutdown sementara.',
    },
    {
      code: 'SO-FSM-2024-004',
      customerId: getCustomer(3).id,
      subject: 'Inspeksi Panel Listrik Tahunan - ISO 50001',
      serviceType: FsmServiceType.INSPECTION,
      priority: TicketPriority.LOW,
      status: FsmServiceOrderStatus.DRAFT,
      description: 'Inspeksi panel listrik MDP dan SDP dalam rangka audit ISO 50001 Energy Management. Pemeriksaan thermografi, pengukuran arus beban, pengecekan grounding, dan dokumentasi.',
      locationAddress: 'Kawasan Industri MM2100, Jl. Selayar Blok A6, Cikarang Barat, Bekasi',
      contactName: 'Sdr. Yusuf Hamdani',
      contactPhone: '0856-789-0123',
      totalEstimatedDuration: 240,
    },
    {
      code: 'SO-FSM-2024-005',
      customerId: customer1.id,
      subject: 'Komisioning Sistem BMS (Building Management System)',
      serviceType: FsmServiceType.INSTALLATION,
      priority: TicketPriority.HIGH,
      status: FsmServiceOrderStatus.SUBMITTED,
      description: 'Komisioning dan integrasi sistem BMS Siemens Desigo CC untuk kontrol HVAC, pencahayaan, dan keamanan. Termasuk programming, testing, dan pelatihan operator.',
      locationAddress: 'Graha Niaga Tower, Jl. Jend. Sudirman Kav. 58, Jakarta Selatan',
      contactName: 'Bpk. Ferdinand Lie - Project Manager',
      contactPhone: '0815-567-8901',
      totalEstimatedDuration: 720,
      notes: 'Pekerjaan dilakukan di luar jam kerja (malam hari) untuk menghindari gangguan operasional.',
    },
    {
      code: 'SO-FSM-2024-006',
      customerId: getCustomer(1).id,
      subject: 'Penggantian Pompa Booster Air Bersih',
      serviceType: FsmServiceType.REPAIR,
      priority: TicketPriority.HIGH,
      status: FsmServiceOrderStatus.PENDING_SCHEDULE,
      description: 'Pompa booster air bersih merk Grundfos 3-phase mengalami kerusakan bearing sehingga kapasitas pompa turun drastis. Perlu penggantian unit baru.',
      locationAddress: 'Apartemen Residence 8, Senopati, Jakarta Selatan',
      contactName: 'Pak Doni - Building Manager',
      contactPhone: '0819-234-5678',
      totalEstimatedDuration: 300,
    },
    {
      code: 'SO-FSM-2024-007',
      customerId: getCustomer(2).id,
      subject: 'Kalibrasi Sensor & Transmitter Sistem HVAC',
      serviceType: FsmServiceType.INSPECTION,
      priority: TicketPriority.MEDIUM,
      status: FsmServiceOrderStatus.COMPLETED,
      description: 'Kalibrasi tahunan untuk 45 sensor temperatur, 12 sensor kelembaban, dan 8 transmitter tekanan pada sistem HVAC gedung. Sesuai jadwal preventive maintenance.',
      locationAddress: 'Kantor Pusat Bank Mandiri, Jl. Gatot Subroto Kav. 36-38, Jakarta Selatan',
      contactName: 'Ibu Dewi Susanti - Facility Manager',
      contactPhone: '0821-345-6789',
      totalEstimatedDuration: 480,
    },
  ];

  const createdOrders: any[] = [];
  for (const soData of serviceOrderData) {
    const { code, ...rest } = soData;
    try {
      const so = await prisma.fsmServiceOrder.upsert({
        where: { tenantId_code: { tenantId, code } },
        update: {},
        create: {
          tenantId,
          code,
          ...rest,
          items: {
            create: [
              { tenantId, lineNo: 1, description: 'Jasa Teknisi Senior (per jam)', qty: 8 },
              { tenantId, lineNo: 2, itemId: item.id, description: 'Material & Suku Cadang', qty: 1 },
              { tenantId, lineNo: 3, description: 'Biaya Transportasi & Akomodasi', qty: 1 },
            ],
          },
        },
      });
      createdOrders.push(so);
    } catch (e: any) {
      console.log(`  Skipping SO ${code}: ${e.message}`);
    }
  }

  // ─── Create Appointments for each relevant Service Order ───────
  for (const so of createdOrders) {
    // Skip if appointment already exists
    const existingAppts = await prisma.fsmServiceAppointment.count({ where: { serviceOrderId: so.id } });
    if (existingAppts > 0) continue;

    const now = new Date();

    if (so.status === FsmServiceOrderStatus.COMPLETED) {
      const yesterday = new Date(now.getTime() - 86400000);
      const appt = await prisma.fsmServiceAppointment.create({
        data: {
          tenantId,
          serviceOrderId: so.id,
          technicianId: tech1.id,
          status: FsmAppointmentStatus.COMPLETED,
          scheduledStart: yesterday,
          scheduledEnd: new Date(yesterday.getTime() + (so.totalEstimatedDuration || 240) * 60000),
          actualStart: yesterday,
          actualEnd: new Date(yesterday.getTime() + (so.totalEstimatedDuration || 240) * 60000),
          workingTimeMin: so.totalEstimatedDuration || 240,
          travelTimeMin: 45,
          notes: 'Pekerjaan selesai tepat waktu. Semua item diperiksa dan berfungsi normal.',
        },
      });
      await prisma.fsmServiceReport.create({
        data: {
          tenantId,
          appointmentId: appt.id,
          summary: `Pekerjaan "${so.subject}" telah diselesaikan dengan baik sesuai scope of work yang telah disepakati.`,
          resolution: 'Seluruh item pekerjaan telah dikerjakan dan diuji. Peralatan berfungsi normal. Customer telah menyetujui hasil pekerjaan.',
        },
      });
    } else if (so.status === FsmServiceOrderStatus.IN_PROGRESS) {
      await prisma.fsmServiceAppointment.create({
        data: {
          tenantId,
          serviceOrderId: so.id,
          technicianId: tech2.id,
          status: FsmAppointmentStatus.IN_PROGRESS,
          scheduledStart: now,
          scheduledEnd: new Date(now.getTime() + (so.totalEstimatedDuration || 180) * 60000),
          actualStart: now,
          travelTimeMin: 30,
          notes: 'Sedang dalam proses pengerjaan di lokasi.',
        },
      });
    } else if (so.status === FsmServiceOrderStatus.SCHEDULED) {
      const tomorrow = new Date(now.getTime() + 86400000);
      await prisma.fsmServiceAppointment.create({
        data: {
          tenantId,
          serviceOrderId: so.id,
          technicianId: tech3.id,
          status: FsmAppointmentStatus.ASSIGNED,
          scheduledStart: tomorrow,
          scheduledEnd: new Date(tomorrow.getTime() + (so.totalEstimatedDuration || 360) * 60000),
          notes: so.notes || 'Harap datang tepat waktu dan bawa semua peralatan yang diperlukan.',
        },
      });
    }
  }

  console.log(`Seeded FSM: ${createdOrders.length} service orders with appointments`);
}
