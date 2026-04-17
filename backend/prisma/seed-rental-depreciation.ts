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

  console.log(`🧹 Memulai proses Seeding Asset Depreciation untuk tenant: ${tenantName}...`);

  // First check if FixedAssets exist.
  let assets = await prisma.fixedAsset.findMany({ where: { tenantId: tenant.id } });

  let insertedAssets = 0;
  if (assets.length === 0) {
     console.log('⚠️ Belum ada Fixed Asset. Membuat 10 aset logistik Enterprise baru...');
     const assetMocks = [
        { no: 'FA-26-001', name: 'Komatsu PC200 Excavator', cost: 1200000000, life: 60, cat: 'Heavy Equipment' },
        { no: 'FA-26-002', name: 'Tadano RT Crane 25t', cost: 2500000000, life: 120, cat: 'Heavy Equipment' },
        { no: 'FA-26-003', name: 'Toyota Hiace Commuter', cost: 550000000, life: 60, cat: 'Vehicle' },
        { no: 'FA-26-004', name: 'Gudang Transit Priok 500m2', cost: 3500000000, life: 240, cat: 'Property' },
        { no: 'FA-26-005', name: 'Scaffolding Tower System (10 Sets)', cost: 150000000, life: 48, cat: 'Tools' },
        { no: 'FA-26-006', name: 'Mitsubishi Triton 4x4', cost: 450000000, life: 60, cat: 'Vehicle' },
        { no: 'FA-26-007', name: 'Caterpillar Generator 200kVA', cost: 300000000, life: 84, cat: 'Equipment' },
        { no: 'FA-26-008', name: 'Hino Dutro Cargo Truck', cost: 380000000, life: 84, cat: 'Vehicle' },
        { no: 'FA-26-009', name: 'Welding Machine Lincoln Electric', cost: 85000000, life: 36, cat: 'Tools' },
        { no: 'FA-26-010', name: 'Forklift Toyota 3-Ton', cost: 420000000, life: 60, cat: 'Heavy Equipment' },
     ];

     for (const mk of assetMocks) {
        // Buy dates from 1 to 4 years ago
        const pDate = new Date();
        pDate.setMonth(pDate.getMonth() - (Math.floor(Math.random() * 36) + 12)); 
        
        await prisma.fixedAsset.create({
           data: {
              tenantId: tenant.id,
              assetNo: mk.no,
              name: mk.name,
              category: mk.cat,
              purchaseDate: pDate,
              purchaseCost: mk.cost,
              usefulLife: mk.life,
              salvageValue: mk.cost * 0.1, // 10% salvage 
              depreciationMethod: 'STRAIGHT_LINE',
              status: 'ACTIVE'
           }
        });
        insertedAssets++;
     }
     console.log(`✅ ${insertedAssets} Fixed Assets buatan berhasil disuntikan.`);
     // Re-fetch
     assets = await prisma.fixedAsset.findMany({ where: { tenantId: tenant.id } });
  }

  // Generate Depreciation History
  let loggedEntries = 0;
  console.log(`📝 Merangkai histori depresiasi untuk ${assets.length} aset...`);

  // Clear past history first to prevent runaway infinite generation if seeded twice
  await prisma.fixedAssetDepreciation.deleteMany({ where: { tenantId: tenant.id } });

  const currentDate = new Date();

  for (const asset of assets) {
      const pCost = Number(asset.purchaseCost);
      const sValue = Number(asset.salvageValue);
      const lifeMonths = asset.usefulLife || 60;
      
      const depreciableAmount = pCost - sValue;
      if (depreciableAmount <= 0) continue;

      const monthlyDepreciation = depreciableAmount / lifeMonths;

      // Calculate how many months have passed since purchase
      const startD = new Date(asset.purchaseDate);
      
      let monthsPassed = (currentDate.getFullYear() - startD.getFullYear()) * 12;
      monthsPassed -= startD.getMonth();
      monthsPassed += currentDate.getMonth();

      // Cap at useful life
      if (monthsPassed > lifeMonths) monthsPassed = lifeMonths;
      if (monthsPassed <= 0) continue;

      let accumulated = 0;
      let logDate = new Date(startD);

      const entries = [];
      for (let i = 1; i <= monthsPassed; i++) {
          logDate.setMonth(logDate.getMonth() + 1);
          accumulated += monthlyDepreciation;

          entries.push({
             tenantId: tenant.id,
             assetId: asset.id,
             periodDate: new Date(logDate),
             depreciationAmount: monthlyDepreciation,
             accumulatedAmount: accumulated,
             notes: `Jurnal Depresiasi Bulan ke-${i} (Garis Lurus)`
          });
      }

      if (entries.length > 0) {
         await prisma.fixedAssetDepreciation.createMany({
             data: entries
         });
         loggedEntries += entries.length;
      }
  }

  console.log(`✅ Berhasil merangkai ${loggedEntries} jurnal riwayat penyusutan mesin/properti ERP.`);
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
