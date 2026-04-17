import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Finance Fixed Assets & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.asset.read',
    'finance.asset.create',
    'finance.asset.update',
    'finance.asset.delete',
    'finance.asset.depreciate'
  ];

  for (const key of perms) {
     const pId = crypto.randomUUID();
     await client.query(`INSERT INTO "Permission" (id, key, description, "createdAt") VALUES ($1, $2, $3, NOW()) ON CONFLICT (key) DO NOTHING`, [pId, key, 'Perm for ' + key]);
  }

  const roleRes = await client.query('SELECT id FROM "Role"');
  for (const r of roleRes.rows) {
     for (const key of perms) {
       const prps = await client.query('SELECT id FROM "Permission" WHERE key = $1', [key]);
       if (prps.rows.length > 0) {
          try {
            await client.query(`INSERT INTO "RolePermission" ("roleId", "permissionId") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [r.id, prps.rows[0].id]);
          } catch(e) {}
       }
     }
  }
  console.log('✅ Permissions injected to ALL ROLES!');

  // 2. SEED FIXED ASSETS (Pabrik F&B Equipment, Vehicles, Buildings)
  const samples = [
     { name: 'Mesin Giling Kopi Industri (Roaster)', cat: 'MACHINE', cost: 150000000, life: 60, date: '2024-01-15' },
     { name: 'Truk Pendingin (Isotta Trailer)', cat: 'VEHICLE', cost: 450000000, life: 120, date: '2023-06-10' },
     { name: 'Oven Roti Rotary Listrik Kapasitas Besar', cat: 'EQUIPMENT', cost: 85000000, life: 60, date: '2025-02-20' },
     { name: 'Bangunan Gudang Bahan Baku Kavling B', cat: 'BUILDING', cost: 1200000000, life: 240, date: '2022-11-01' },
     { name: 'Genset Cummins 150KVA', cat: 'EQUIPMENT', cost: 120000000, life: 120, date: '2024-05-18' },
     { name: 'MacBook Pro M3 Max - Server Data', cat: 'IT', cost: 65000000, life: 36, date: '2025-10-15' },
     { name: 'Rak Susun Baja (Heavy Duty - 10 Baris)', cat: 'EQUIPMENT', cost: 45000000, life: 120, date: '2023-08-05' },
     { name: 'Motor Operasional Kurir B', cat: 'VEHICLE', cost: 22000000, life: 60, date: '2024-09-12' }
  ];

  for (let i = 0; i < samples.length; i++) {
        const s = samples[i];
        const assetId = crypto.randomUUID();
        const assetNo = `FAS-${s.cat.substring(0,3)}-${String(i + 1).padStart(4, '0')}`;

        try {
            await client.query(
                `INSERT INTO "FixedAsset" ("id", "tenantId", "assetNo", "name", "category", "purchaseDate", "purchaseCost", "usefulLife", "salvageValue", "depreciationMethod", "status", "createdAt", "updatedAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())`,
                [assetId, tenantId, assetNo, s.name, s.cat, s.date, s.cost, s.life, s.cost * 0.1, 'STRAIGHT_LINE', 'ACTIVE']
            );

            console.log(`✅ Seeded Fixed Asset: ${assetNo} | ${s.name} | Val: Rp${s.cost}`);

            // Simulate Depreciation runs
            // How many months have passed since purchaseDate?
            const pDate = new Date(s.date);
            const now = new Date();
            let monthsPassed = (now.getFullYear() - pDate.getFullYear()) * 12 + now.getMonth() - pDate.getMonth();
            if (monthsPassed < 0) monthsPassed = 0;
            if (monthsPassed > s.life) monthsPassed = s.life; // Fully Depreciated

            if (monthsPassed > 0) {
               const depreciationPerMonth = (s.cost - (s.cost * 0.1)) / s.life;
               let accumulated = 0;
               
               // We won't insert 60 entries (too much data), let's just insert the last 3-4 months 
               // and maybe an initial big chunk to simulate accumulated depreciation if it's old
               const monthsToSimulate = Math.min(3, monthsPassed);
               const preAccumulated = depreciationPerMonth * (monthsPassed - monthsToSimulate);
               accumulated = preAccumulated;

               for (let m = 0; m < monthsToSimulate; m++) {
                   const deprDate = new Date();
                   deprDate.setMonth(now.getMonth() - (monthsToSimulate - m - 1));
                   deprDate.setDate(28); // end of month run

                   accumulated += depreciationPerMonth;

                   await client.query(
                       `INSERT INTO "FixedAssetDepreciation" ("id", "tenantId", "assetId", "periodDate", "depreciationAmount", "accumulatedAmount", "notes", "createdAt")
                        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
                       [crypto.randomUUID(), tenantId, assetId, deprDate.toISOString(), depreciationPerMonth, accumulated, 'Auto-Depreciation Monthly Run 🤖']
                   );
               }
            }

        } catch (e) {
            console.error(`Failed on Asset ${assetNo} / ${e.message}`);
        }
    }

  const countRes = await client.query('SELECT count(*) as count FROM "FixedAsset" WHERE "tenantId" = $1', [tenantId]);
  console.log(`\n🎉 Process finished. Total Assets: ${countRes.rows[0].count}`);

  await client.end();
}

main().catch(console.error);
