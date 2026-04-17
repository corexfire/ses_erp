import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/erp_db',
});

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Batch & Serial Identifiers for tenant: ${tenantId}`);

  // Items
  let rmRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'RM-BKS-01']);
  const rmId = rmRes.rows.length > 0 ? rmRes.rows[0].id : null;

  let eqRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'EQ-MCH-001']);
  let eqId = eqRes.rows.length > 0 ? eqRes.rows[0].id : null;

  if(!eqId) {
      eqId = rmId; // Fallback
  }

  // Seed Batches
  const batches = [
    { code: "LOT-0426-A", itemId: rmId, expiryDate: "2027-04-20" },
    { code: "LOT-0426-B", itemId: rmId, expiryDate: "2027-05-15" }
  ];

  for (const b of batches) {
     if(!b.itemId) continue;
     try {
       await client.query(
         `INSERT INTO "ItemBatch" ("id", "tenantId", "itemId", "code", "expiryDate") 
          VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`,
         [crypto.randomUUID(), tenantId, b.itemId, b.code, b.expiryDate]
       );
       console.log(`✅ Seeded Batch: ${b.code}`);
     } catch(e) { console.error(`❌ Skipped Batch ${b.code}: ${e.message}`); }
  }

  // Seed Serials
  const serials = [
    { serialNo: "SN/ROAST/2604/001", itemId: eqId, status: "AVAILABLE" },
    { serialNo: "SN/ROAST/2604/002", itemId: eqId, status: "IN_USE" }
  ];

  for (const s of serials) {
     if(!s.itemId) continue;
     try {
       await client.query(
         `INSERT INTO "ItemSerial" ("id", "tenantId", "itemId", "serialNo", "status") 
          VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`,
         [crypto.randomUUID(), tenantId, s.itemId, s.serialNo, s.status]
       );
       console.log(`✅ Seeded Serial: ${s.serialNo}`);
     } catch(e) { console.error(`❌ Skipped Serial ${s.serialNo}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
