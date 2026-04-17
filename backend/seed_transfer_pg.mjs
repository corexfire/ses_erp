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

  // Retrieve Warehouses
  let whRes = await client.query('SELECT "id", "code" FROM "Warehouse" WHERE "tenantId" = $1 LIMIT 2', [tenantId]);
  
  if (whRes.rows.length === 0) {
      console.log('Skipping Transfer seed. Please run previous seeders first.');
      await client.end();
      return; 
  }
  
  let fromWhId = whRes.rows[0].id;
  let toWhId = whRes.rows.length > 1 ? whRes.rows[1].id : null;

  // If only 1 warehouse exists, create a second one for mocking
  if (!toWhId) {
     toWhId = crypto.randomUUID();
     await client.query(`INSERT INTO "Warehouse" ("id", "tenantId", "code", "name", "isActive", "updatedAt") VALUES ($1, $2, $3, $4, true, NOW())`,
     [toWhId, tenantId, "WH-CABANG", "Gudang Cabang Distribusi"]);
  }

  // Items
  let fgRes = await client.query('SELECT "id", "baseUomCode" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'FG-KB-250']);
  const fgId = fgRes.rows.length > 0 ? fgRes.rows[0].id : null;
  const fgUom = fgRes.rows.length > 0 ? fgRes.rows[0].baseUomCode : 'PCS';

  console.log(`Seeding Stock Transfer Log for tenant: ${tenantId}`);

  const transfers = [
    {
      code: "TRF-202604-001",
      fromWarehouseId: fromWhId,
      toWarehouseId: toWhId,
      transferDate: "2026-04-28",
      status: "POSTED",
      notes: "Mutasi rutin pengisian stok Gudang Cabang Distribusi. Driver: Bp. Yanto.",
      items: [
        { desc: "Kopi Bubuk Arabica Premium 250g", itemId: fgId, qty: 500, uomCode: fgUom, batchCode: "LOT-0426-X" }
      ]
    },
    {
      code: "TRF-202604-002",
      fromWarehouseId: toWhId,
      toWarehouseId: fromWhId,
      transferDate: "2026-04-29",
      status: "DRAFT",
      notes: "Retur stok lambat terjual (Slow Moving) kembali ke Gudang Pusat.",
      items: [
         { desc: "Kopi Bubuk Arabica Premium 250g", itemId: fgId, qty: 50, uomCode: fgUom, batchCode: "LOT-0426-X" }
      ]
    }
  ];

  for (const trf of transfers) {
     const tfId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "StockTransfer" ("id", "tenantId", "code", "fromWarehouseId", "toWarehouseId", "transferDate", "status", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [tfId, tenantId, trf.code, trf.fromWarehouseId, trf.toWarehouseId, trf.transferDate, trf.status, trf.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "StockTransfer" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, trf.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of trf.items) {
          await client.query(
             `INSERT INTO "StockTransferItem" ("id", "tenantId", "transferId", "lineNo", "itemId", "description", "qty", "uomCode", "batchCode")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.qty, it.uomCode, it.batchCode]
          );
       }
       console.log(`✅ Seeded Transfer: ${trf.code}`);
     } catch(e) { console.error(`❌ Skipped Transfer ${trf.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
