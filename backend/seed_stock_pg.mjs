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

  // Retrieve Warehouse
  let whRes = await client.query('SELECT "id" FROM "Warehouse" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let warehouseId = whRes.rows.length > 0 ? whRes.rows[0].id : null;
  if (!warehouseId) {
      warehouseId = crypto.randomUUID();
      await client.query(`INSERT INTO "Warehouse" ("id", "tenantId", "code", "name", "isActive", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW())`,
      [warehouseId, tenantId, "WH-01", "Gudang Utama", true]);
  }

  // Retrieve Items
  const rmRes = await client.query('SELECT "id", "code", "baseUomCode" FROM "Item" WHERE "tenantId" = $1 AND "code" LIKE $2 LIMIT 1', [tenantId, 'RM%']);
  const fgRes = await client.query('SELECT "id", "code", "baseUomCode" FROM "Item" WHERE "tenantId" = $1 AND "code" LIKE $2 LIMIT 1', [tenantId, 'FG%']);
  
  if (rmRes.rows.length === 0 || fgRes.rows.length === 0) {
     console.log('Skipping Stock seed. Make sure to run seed_itemmaster_pg.mjs first so Items exist.');
     await client.end();
     return;
  }
  
  const rmItem = rmRes.rows[0];
  const fgItem = fgRes.rows[0];

  console.log(`Seeding Stock/Inventory Data for tenant: ${tenantId}`);

  // 1. Give Raw Material some stock
  const rmBalId = crypto.randomUUID();
  try {
     await client.query(
      `INSERT INTO "StockBalance" ("id", "tenantId", "warehouseId", "itemId", "qtyOnHand", "qtyAllocated", "qtyAvailable", "uomCode", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      ON CONFLICT DO NOTHING`,
      [rmBalId, tenantId, warehouseId, rmItem.id, 500, 50, 450, rmItem.baseUomCode]
     );

     await client.query(
        `INSERT INTO "StockLedger" ("id", "tenantId", "warehouseId", "itemId", "moveType", "refType", "refId", "postingDate", "description", "qtyIn", "qtyOut", "uomCode", "createdAt") 
         VALUES ($1, $2, $3, $4, 'GRN_RECEIPT', 'GRN', 'REF-GRN-1011', NOW(), 'Penerimaan Awal Pabrik', 500, 0, $5, NOW())`,
        [crypto.randomUUID(), tenantId, warehouseId, rmItem.id, rmItem.baseUomCode]
     );
     console.log(`✅ Seeded logic for ${rmItem.code}`);
  } catch(e) { console.error('RM Insert Failed:', e.message); }

  // 2. Give Finished Goods some stock
  const fgBalId = crypto.randomUUID();
  try {
     await client.query(
      `INSERT INTO "StockBalance" ("id", "tenantId", "warehouseId", "itemId", "qtyOnHand", "qtyAllocated", "qtyAvailable", "uomCode", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      ON CONFLICT DO NOTHING`,
      [fgBalId, tenantId, warehouseId, fgItem.id, 1500, 200, 1300, fgItem.baseUomCode]
     );

     await client.query(
        `INSERT INTO "StockLedger" ("id", "tenantId", "warehouseId", "itemId", "moveType", "refType", "refId", "postingDate", "description", "qtyIn", "qtyOut", "uomCode", "createdAt") 
         VALUES ($1, $2, $3, $4, 'PRODUCTION_RECEIPT', 'MANUFACTURE', 'REF-WO-2022', NOW(), 'Barang Jadi Turun dari Produksi', 1500, 0, $5, NOW())`,
        [crypto.randomUUID(), tenantId, warehouseId, fgItem.id, fgItem.baseUomCode]
     );
     console.log(`✅ Seeded logic for ${fgItem.code}`);
  } catch(e) { console.error('FG Insert Failed:', e.message); }

  await client.end();
}

main().catch(console.error);
