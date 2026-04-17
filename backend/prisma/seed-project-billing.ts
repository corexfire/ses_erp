import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const tenant = await prisma.tenant.findFirst();
  if (!tenant) return;

  console.log('--- Seeding Project Billing (ERP Standard) ---');

  // 1. Find or Create a Construction Project
  const project = await prisma.project.upsert({
    where: { tenantId_code: { tenantId: tenant.id, code: 'PRJ-CON-001' } },
    update: { totalBudget: 5000000000 }, // 5 Billion IDR
    create: {
      tenantId: tenant.id,
      code: 'PRJ-CON-001',
      name: 'Pembangunan Gudang Logistik Tahap II',
      description: 'Project pembangunan gudang dengan struktur baja dan lantai beton.',
      totalBudget: 5000000000,
      status: 'IN_PROGRESS',
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31')
    }
  });

  // 2. Physical Progress Claims
  // Claim 1: Month 1 (15%)
  const claim1 = await prisma.progressClaim.upsert({
    where: { tenantId_claimNo: { tenantId: tenant.id, claimNo: 'BA-001/PRJ/2026' } },
    update: {},
    create: {
      tenantId: tenant.id,
      projectId: project.id,
      claimNo: 'BA-001/PRJ/2026',
      claimDate: new Date('2026-02-05'),
      progressPercent: 15,
      description: 'Pekerjaan pondasi dan persiapan lahan 100%',
      status: 'VERIFIED'
    }
  });

  // Claim 2: Month 2 (35%)
  const claim2 = await prisma.progressClaim.upsert({
    where: { tenantId_claimNo: { tenantId: tenant.id, claimNo: 'BA-002/PRJ/2026' } },
    update: {},
    create: {
      tenantId: tenant.id,
      projectId: project.id,
      claimNo: 'BA-002/PRJ/2026',
      claimDate: new Date('2026-03-10'),
      progressPercent: 35,
      description: 'Pekerjaan struktur baja dan dinding',
      status: 'DRAFT'
    }
  });

  // 3. Progress Invoices
  // Invoice for Claim 1 (15%)
  // Contract: 5B. 15% = 750M.
  // Retention 5% = 37.5M.
  // DP Deduction (say 10% of gross) = 75M.
  // Net Before Tax = 750M - 37.5M - 75M = 637.5M
  // VAT 11% = 70.125M
  // Total Net = 707.625M
  await prisma.progressInvoice.upsert({
    where: { id: 'seed-prj-inv-001' },
    update: {},
    create: {
      id: 'seed-prj-inv-001',
      tenantId: tenant.id,
      projectId: project.id,
      progressClaimId: claim1.id,
      progressPercent: 15,
      retentionPercent: 5,
      retentionAmount: 37500000,
      dpDeductionAmount: 75000000,
      grossAmount: 750000000,
      vatPercent: 11,
      vatAmount: 70125000,
      netAmount: 707625000,
      invoiceNo: 'INV/2026/02/001',
      period: '2026-02',
      status: 'VERIFIED'
    } as any
  });

  // 4. Update Permissions in seed-project-billing.ts scope
  // We'll trust the main seed for this but let's ensure billing exists in permission table if we were to run this isolated.

  console.log('Seeded Project: PRJ-CON-001 with 2 Claims and 1 Invoice.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
