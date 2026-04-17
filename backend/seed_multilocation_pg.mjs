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

  console.log(`Seeding Multi-Location Stock Balances for tenant: ${tenantId}`);

  // Warehouses
  let wh1Res = await client.query('SELECT "id", "name" FROM "Warehouse" WHERE "tenantId" = $1 LIMIT 2', [tenantId]);
  let whPusatId = wh1Res.rows.length > 0 ? wh1Res.rows[0].id : null;
  let whCabangId = wh1Res.rows.length > 1 ? wh1Res.rows[1].id : null;

  if (!whCabangId) {
     whCabangId = crypto.randomUUID();
     await client.query(`INSERT INTO "Warehouse" ("id", "tenantId", "code", "name", "isActive", "updatedAt") VALUES ($1, $2, $3, $4, true, NOW())`,
     [whCabangId, tenantId, "WH-CABANG2", "Gudang Cabang Distribusi 2"]);
  }

  // Items
  let fgRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'FG-KB-250']);
  const fgId = fgRes.rows.length > 0 ? fgRes.rows[0].id : null;

  let rmRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'RM-BKS-01']);
  const rmId = rmRes.rows.length > 0 ? rmRes.rows[0].id : null;

  // Bins
  let bin1Id = crypto.randomUUID();
  await client.query(`INSERT INTO "BinLocation" ("id", "tenantId", "warehouseId", "code", "name", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW()) ON CONFLICT DO NOTHING`,
    [bin1Id, tenantId, whPusatId, "BIN-PST-A1", "Rak A1 Barang Jadi (Pusat)"]);
  
  let bin2Id = crypto.randomUUID();
  await client.query(`INSERT INTO "BinLocation" ("id", "tenantId", "warehouseId", "code", "name", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW()) ON CONFLICT DO NOTHING`,
    [bin2Id, tenantId, whPusatId, "BIN-PST-B2", "Rak B2 Bahan Baku (Pusat)"]);

  let bin3Id = crypto.randomUUID();
  await client.query(`INSERT INTO "BinLocation" ("id", "tenantId", "warehouseId", "code", "name", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW()) ON CONFLICT DO NOTHING`,
    [bin3Id, tenantId, whCabangId, "BIN-CBN-A1", "Rak Depan (Cabang)"]);

  // We ensure there's a StockBalance on these bins
  const balances = [
    { wh: whPusatId, bin: bin1Id, item: fgId, qty: 1500, uom: 'PCS' },
    { wh: whPusatId, bin: bin2Id, item: rmId, qty: 350, uom: 'KG' },
    { wh: whCabangId, bin: bin3Id, item: fgId, qty: 500, uom: 'PCS' }
  ];

  for (const bal of balances) {
     if(!bal.item) continue;
     try {
       await client.query(
         `INSERT INTO "StockBalance" ("id", "tenantId", "warehouseId", "binLocationId", "itemId", "qtyOnHand", "qtyAvailable", "uomCode", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) ON CONFLICT DO NOTHING`,
         [crypto.randomUUID(), tenantId, bal.wh, bal.bin, bal.item, bal.qty, bal.qty, bal.uom]
       );
       console.log(`✅ Allocated ${bal.qty} ${bal.uom} to Bin/WH`);
     } catch(e) { console.error(`❌ Failed: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
