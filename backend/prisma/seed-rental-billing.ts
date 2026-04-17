import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
  const tenant = await prisma.tenant.findUnique({ where: { name: tenantName } });

  if (!tenant) {
    throw new Error(`Tenant '${tenantName}' not found.`);
  }

  console.log(`🧹 Memulai proses Seeding Rental Invoices ERP untuk tenant: ${tenantName}...`);

  const contracts = await prisma.rentalContract.findMany({ 
       where: { tenantId: tenant.id },
       include: { customer: true }
  });

  if (contracts.length === 0) {
     console.warn("⚠️ Data Rental Contract kosong, mohon jalankan seed-rental.ts terlebih dahulu.");
     return;
  }

  console.log(`📝 Seeding Rental Invoices berdasarkan ${contracts.length} kontrak aktif...`);
  
  let createdCount = 0;
  const statuses = ['PAID', 'PAID', 'PAID', 'UNPAID', 'UNPAID', 'OVERDUE'];

  for (let c of contracts) {
     // Generate 1 to 3 random invoices for each contract to simulate billing history
     const numInvoices = Math.floor(Math.random() * 3) + 1;

     for (let i = 0; i < numInvoices; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        let periodStart = new Date(c.startDate);
        periodStart.setDate(periodStart.getDate() + (i * 30)); // just a dummy advancement for periods
        
        let periodEnd = new Date(periodStart);
        if (c.billingCycle === 'DAILY') periodEnd.setDate(periodEnd.getDate() + 1);
        else if (c.billingCycle === 'WEEKLY') periodEnd.setDate(periodEnd.getDate() + 7);
        else if (c.billingCycle === 'YEARLY') periodEnd.setFullYear(periodEnd.getFullYear() + 1);
        else periodEnd.setMonth(periodEnd.getMonth() + 1); // MONTHLY

        let dueDate = new Date(periodStart);
        dueDate.setDate(dueDate.getDate() + 14); // net-14 payment

        const amount = Number(c.rentalRate);
        const taxAmount = amount * 0.11; // 11% PPN
        const totalAmount = amount + taxAmount;

        const billingNo = `RB-2026-${c.contractNo.replace('RNT-2026-','')}-${String(i + 1).padStart(2, '0')}`;

        try {
            await prisma.rentalBilling.upsert({
               where: { tenantId_billingNo: { tenantId: tenant.id, billingNo } },
               update: {},
               create: {
                  tenantId: tenant.id,
                  billingNo,
                  contractId: c.id,
                  customerId: c.customerId,
                  periodStart,
                  periodEnd,
                  dueDate,
                  amount,
                  taxAmount,
                  totalAmount,
                  status,
                  notes: `Auto-generated rental invoice period ${i+1}. Include PPN 11%.`
               }
            });
            createdCount++;
        } catch (e) {
           console.error(e);
        }
     }
  }

  console.log(`✅ Berhasil melakukan Seed untuk ${createdCount} Tagihan Invoice Rental.`);
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
