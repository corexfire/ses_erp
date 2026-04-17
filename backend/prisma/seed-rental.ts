import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const rentItems = [
  "Scaffolding Tower 10 Meter",
  "Komatsu PC200 Excavator",
  "Generator Set 100KVA Silent Type",
  "Toyota Hiace Commuter 15 Seat",
  "Mobil Crane 25 Ton TADANO",
  "Mess Kontainer 20 Feet Ber-AC",
  "Pompa Air Diesel Irigasi",
  "Lantai Gedung Kantor Sudirman (400m2)",
  "Forklift Diesel 3 Ton",
  "Gudang Transit Pelabuhan Tanjung Priok",
];

async function main() {
  const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
  const tenant = await prisma.tenant.findUnique({ where: { name: tenantName } });

  if (!tenant) {
    throw new Error(`Tenant '${tenantName}' not found.`);
  }

  console.log(`🧹 Memulai proses Seeding Rental Contracts ERP untuk tenant: ${tenantName}...`);

  const customers = await prisma.customer.findMany({ where: { tenantId: tenant.id }, take: 30 });
  if (customers.length === 0) {
     console.warn("⚠️ Data Customer kosong, jalankan master seeder terlebih dahulu.");
     return;
  }

  // Pre-fetch assets (if exist)
  const assets = await prisma.fixedAsset.findMany({ where: { tenantId: tenant.id }, take: 20 });

  console.log(`📝 Seeding 40+ Rental Contracts...`);
  
  let createdCount = 0;
  const statuses = ['DRAFT', 'ACTIVE', 'ACTIVE', 'COMPLETED', 'TERMINATED'];

  for (let i = 0; i < 45; i++) {
    const cust = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Distribute random assets vs generic
    let assetId = null;
    let assetDescription = null;
    
    if (assets.length > 0 && Math.random() > 0.5) {
       assetId = assets[Math.floor(Math.random() * assets.length)].id;
    } else {
       assetDescription = rentItems[Math.floor(Math.random() * rentItems.length)];
    }
    
    const cycleMap = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];
    const billingCycle = cycleMap[Math.floor(Math.random() * cycleMap.length)];
    
    let baseRate = 0;
    if (billingCycle === 'DAILY') baseRate = 2000000 + Math.random() * 3000000;
    if (billingCycle === 'WEEKLY') baseRate = 12000000 + Math.random() * 8000000;
    if (billingCycle === 'MONTHLY') baseRate = 45000000 + Math.random() * 50000000;
    if (billingCycle === 'YEARLY') baseRate = 500000000 + Math.random() * 200000000;
    
    const rentalRate = Math.floor(baseRate / 10000) * 10000;
    const depositAmount = (Math.random() > 0.6) ? Math.floor(rentalRate * 1.5) : 0;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 90));
    
    let endDate: Date | null = new Date(startDate);
    if (status === 'ACTIVE' && Math.random() > 0.3) {
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 180) + 30);
    } else if (status === 'COMPLETED' || status === 'TERMINATED') {
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 60) + 5);
    } else {
      endDate = null; // Open ended / draft
    }

    const contractNo = `RNT-2026-${String(createdCount + 1001).padStart(4, '0')}`;

    try {
        await prisma.rentalContract.upsert({
           where: { tenantId_contractNo: { tenantId: tenant.id, contractNo } },
           update: {},
           create: {
              tenantId: tenant.id,
              contractNo,
              customerId: cust.id,
              assetId,
              assetDescription,
              billingCycle,
              status,
              rentalRate,
              depositAmount,
              startDate,
              endDate,
              notes: `Syarat dan ketentuan berlaku mengikat kedua belah pihak. Deposit Rp ${depositAmount.toLocaleString()}.`
           }
        });
        createdCount++;
    } catch (e) {
       console.error(e);
    }
  }

  console.log(`✅ Berhasil melakukan Seed untuk ${createdCount} kontrak Rental & Asset Leasing.`);
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
