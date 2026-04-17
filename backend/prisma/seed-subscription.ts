import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const planTitles = [
  "Enterprise ERP Cloud Hosted Server (Annual)",
  "SaaS Maintenance & VIP Support",
  "Sewa Alat Berat Bulldozer D-50 (Retainer Bulanan)",
  "Layanan Keamanan Tambang Tipe A",
  "Langganan Dashboard Analitik AI Plus",
  "Fleet Managemet GPS Tracker Subs",
  "Konsultan Pajak & Pembukuan Finansial",
  "Managed IT Services Level 3",
  "Sewa Server Rack Data Center Bintaro",
  "Dedicated Internet Access 1Gbps Corporate",
];

async function main() {
  const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
  const tenant = await prisma.tenant.findUnique({ where: { name: tenantName } });

  if (!tenant) {
    throw new Error(`Tenant '${tenantName}' not found.`);
  }

  console.log(`🧹 Memulai proses Seeding Subscription & Recurring Billing ERP untuk tenant: ${tenantName}...`);

  const customers = await prisma.customer.findMany({ where: { tenantId: tenant.id }, take: 30 });
  if (customers.length === 0) {
     console.warn("⚠️ Data Customer kosong, mohon jalankan seed-crm.ts terlebih dahulu.");
     return;
  }

  console.log(`📝 Seeding 50+ Subscription & Leasing Contracts...`);
  
  let createdCount = 0;

  for (let i = 0; i < 50; i++) {
    const cust = customers[Math.floor(Math.random() * customers.length)];
    const planName = planTitles[Math.floor(Math.random() * planTitles.length)];
    
    // Distribute status
    const randStatus = Math.random();
    const status = randStatus > 0.8 ? 'PAST_DUE' : (randStatus > 0.7 ? 'CANCELLED' : 'ACTIVE');
    
    // Detail cycle
    const cycleMap = ['MONTHLY', 'MONTHLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'];
    const billingCycle = cycleMap[Math.floor(Math.random() * cycleMap.length)];
    
    // Range of pricing: 5 Juta - 100 Juta
    const amount = 5000000 + Math.floor(Math.random() * 95000) * 1000;

    // Dates
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 12) - 1); // 1 to 13 months ago
    
    const nextBillingDate = new Date();
    if (status === 'ACTIVE') {
       nextBillingDate.setDate(nextBillingDate.getDate() + Math.floor(Math.random() * 30));
    } else if (status === 'PAST_DUE') {
       nextBillingDate.setDate(nextBillingDate.getDate() - Math.floor(Math.random() * 20) - 1);
    } else {
       // CANCELLED
       nextBillingDate.setDate(nextBillingDate.getDate() - 30);
    }

    try {
        await prisma.salesSubscription.create({
           data: {
              tenantId: tenant.id,
              customerId: cust.id,
              planName,
              billingCycle,
              status,
              amount,
              startDate,
              endDate: status === 'CANCELLED' ? new Date() : null,
              nextBillingDate,
              notes: `Auto-generated contract for ${cust.name}. SLA 99.9%. Payment Terms: Net-30.`
           }
        });
        createdCount++;
    } catch (e) {
        // Just ignore exact duplicates or constraint errors
    }
  }

  console.log(`✅ Berhasil melakukan Seed untuk ${createdCount} kontrak Subscription. Seeding Selesai.`);
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
