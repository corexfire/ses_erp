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

  console.log(`Seeding Finance Asset Disposal & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.assetDisposal.read',
    'finance.assetDisposal.create',
    'finance.assetDisposal.approve',
    'finance.assetDisposal.delete'
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

  // 2. FETCH SOME ASSETS TO DISPOSE
  // We seeded assets in the previous module, we'll pick 3 of them and dispose them.
  const assetRes = await client.query('SELECT * FROM "FixedAsset" WHERE "tenantId" = $1 LIMIT 4', [tenantId]);
  const assets = assetRes.rows;

  if (assets.length === 0) {
      console.log('No FixedAssets found to dispose. Please seed assets first.');
      await client.end();
      return;
  }

  console.log(`Found ${assets.length} Assets. Simulating disposals...`);

  for (let i = 0; i < Math.min(3, assets.length); i++) {
        const a = assets[i];
        
        // Calculate Accumulated Depreciation
        const deprRes = await client.query(
            'SELECT SUM("depreciationAmount") as sum FROM "FixedAssetDepreciation" WHERE "assetId" = $1',
            [a.id]
        );
        const accumulated = Number(deprRes.rows[0].sum) || 0;
        const bookValue = Number(a.purchaseCost) - accumulated;

        const disposalId = crypto.randomUUID();
        const disposalNo = `DISP-FAS-${2026}${String(i+1).padStart(3, '0')}`;
        const saleValue = bookValue * 0.8; // Simulating a loss of 20% from NBV
        const lossGain = saleValue - bookValue;
        
        const isApproved = i % 2 !== 0; 
        const status = isApproved ? 'APPROVED' : 'DRAFT';

        try {
            await client.query(
                `INSERT INTO "AssetDisposal" ("id", "tenantId", "assetId", "disposalDate", "disposalNo", "saleValue", "lossGain", "status", "notes", "createdAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
                [disposalId, tenantId, a.id, new Date().toISOString(), disposalNo, saleValue, lossGain, status, `Pelepasan aset rusak / usang: ${a.name}`]
            );

            if (isApproved) {
                await client.query(
                   `UPDATE "FixedAsset" SET "status" = 'DISPOSED' WHERE "id" = $1`,
                   [a.id]
                );
            }

            console.log(`✅ Seeded Disposal: ${disposalNo} | Asset: ${a.name} | Status: ${status} | Loss/Gain: ${lossGain}`);
        } catch (e) {
            console.error(`Failed on Disposal ${disposalNo}:`, e.message);
        }
    }

  await client.end();
}

main().catch(console.error);
