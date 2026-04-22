import { PrismaClient } from './generated/client';

export async function seedProjectTenderIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated Project Tender Data for FY 2026...');

  // 1. Prerequisites: Ensure we have a Customer and Suppliers
  const customer = await prisma.customer.findFirst({ where: { tenantId } }) || 
    await prisma.customer.create({
      data: {
        tenantId,
        code: 'CUST-IP-001',
        name: 'PT. Infrastruktur Properti Indonesia',
        email: 'info@ptip-properti.co.id',
        status: 'ACTIVE'
      }
    });

  const suppliers = await prisma.supplier.findMany({ where: { tenantId }, take: 3 });
  if (suppliers.length < 3) {
      const names = ['PT. Beton Jaya Abadi', 'CV. Konstruksi Nusantara', 'PT. Baja Steel Indonesia'];
      for (let i = 0; i < 3; i++) {
          await prisma.supplier.upsert({
              where: { tenantId_code: { tenantId, code: `SUP-TND-${i+1}` } },
              update: {},
              create: {
                  tenantId,
                  code: `SUP-TND-${i+1}`,
                  name: names[i],
                  email: `sales@${names[i].toLowerCase().replace(/\s/g, '')}.com`,
                  status: 'ACTIVE'
              }
          });
      }
  }
  const dbSuppliers = await prisma.supplier.findMany({ where: { tenantId, code: { startsWith: 'SUP-TND-' } } });

  // 2. Scenario 1: TENDER-AWARDED -> Converts to PROJECT
  const tender1Title = 'Pembangunan Jembatan Layang Simpang Lima (TND-2026-001)';
  const tender1 = await prisma.tender.upsert({
    where: { tenantId_title: { tenantId, title: tender1Title } },
    update: { status: 'AWARDED', awardDate: new Date('2026-04-10') },
    create: {
      tenantId,
      title: tender1Title,
      description: 'Proyek strategis nasional untuk mengurai kemacetan flyover utama di area pusat bisnis.',
      status: 'AWARDED',
      submissionDeadline: new Date('2026-03-25'),
      awardDate: new Date('2026-04-10')
    }
  });

  // Create Bids for Tender 1
  const bidPrices = [45000000000, 42500000000, 48000000000];
  for (let i = 0; i < dbSuppliers.length; i++) {
    const isWinner = bidPrices[i] === 42500000000; // Mock winner
    await prisma.tenderBid.create({
      data: {
        tenderId: tender1.id,
        supplierId: dbSuppliers[i].id,
        price: bidPrices[i],
        notes: isWinner ? 'Proposal teknis terbaik dan biaya kompetitif.' : 'Penawaran reguler.',
        status: isWinner ? 'WON' : 'LOST'
      }
    });
  }

  // INTEGRATION: Convert WON tender to ACTIVE project
  const projectCode = 'PRJ-FLY-2026';
  const project = await prisma.project.upsert({
    where: { tenantId_code: { tenantId, code: projectCode } },
    update: { totalBudget: 42500000000, status: 'IN_PROGRESS' },
    create: {
      tenantId,
      code: projectCode,
      name: 'Pembangunan Flyover Simpang Lima',
      description: 'Proyek hasil tender TND-2026-001.',
      customerId: customer.id,
      status: 'IN_PROGRESS',
      startDate: new Date('2026-05-01'),
      endDate: new Date('2027-05-01'),
      totalBudget: 42500000000,
    }
  });

  // Link Tender to Project
  await prisma.tender.update({
    where: { id: tender1.id },
    data: { projectId: project.id }
  });

  // Create WBS Tasks for the new project
  const tasks = [
    { code: 'WBS-PRE-01', name: 'Mobilisasi & Pembersihan Lahan', weight: 5, price: 1000000000 },
    { code: 'WBS-STR-01', name: 'Pekerjaan Pondasi Bore Pile', weight: 25, price: 12000000000 },
    { code: 'WBS-STR-02', name: 'Pekerjaan Struktur Atas (Pilar & Girder)', weight: 50, price: 21250000000 },
    { code: 'WBS-FIN-01', name: 'Pengaspalan & Marka Jalan', weight: 20, price: 8250000000 },
  ];

  for (const t of tasks) {
    await prisma.wbsTask.upsert({
      where: { tenantId_projectId_taskCode: { tenantId, projectId: project.id, taskCode: t.code } },
      update: { plannedCost: t.price, plannedWeight: t.weight },
      create: {
        tenantId,
        projectId: project.id,
        taskCode: t.code,
        taskName: t.name,
        plannedWeight: t.weight,
        plannedCost: t.price,
        status: 'PENDING'
      }
    });
  }

  // Create Project Budget
  await prisma.projectBudget.upsert({
    where: { id: `BUD-${project.id}` },
    update: { totalAmount: 42500000000, status: 'APPROVED' },
    create: {
        id: `BUD-${project.id}`,
        tenantId,
        projectId: project.id,
        budgetNo: `BUD-${projectCode}-01`,
        description: 'Original Project Budget from Tender Winner',
        totalAmount: 42500000000,
        status: 'APPROVED',
        allocatedBudget: 42500000000
    }
  });

  // 3. Scenario 2: OPEN Tender
  await prisma.tender.upsert({
    where: { tenantId_title: { tenantId, title: 'Renovasi Atap Pabrik Area B (TND-2026-002)' } },
    update: { status: 'OFFERED' },
    create: {
      tenantId,
      title: 'Renovasi Atap Pabrik Area B (TND-2026-002)',
      description: 'Penggantian atap seng ke atap ramah lingkungan (Solar Panel ready).',
      status: 'OFFERED',
      submissionDeadline: new Date('2026-06-30'),
    }
  });

  console.log('✅ Integrated Project Tender Seeding Complete!');
}
