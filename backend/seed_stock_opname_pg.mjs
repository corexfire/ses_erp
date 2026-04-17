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

  console.log(`Seeding Stock Count (Opname) for tenant: ${tenantId}`);

  // Base Items
  let fgRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'FG-KB-250']);
  const fgId = fgRes.rows.length > 0 ? fgRes.rows[0].id : null;

  // Warehouses and Bins
  let whRes = await client.query('SELECT "id" FROM "Warehouse" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let whId = whRes.rows.length > 0 ? whRes.rows[0].id : null;

  let binRes = await client.query('SELECT "id" FROM "BinLocation" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let binId = binRes.rows.length > 0 ? binRes.rows[0].id : null;

  if(!whId) {
     console.error("No Warehouses found.");
     await client.end();
     return;
  }

  // Generate an Opname count
  const opnames = [
    {
      code: "STC-202604-001",
      warehouseId: whId,
      countDate: "2026-04-30",
      status: "POSTED", // Artinya nilai variance sudah disuntik ke ledger
      notes: "Stock Opname Akhir Bulan.",
      items: [
        { itemId: fgId, desc: "Kopi Bubuk Arabica Premium 250g", binLocationId: binId, systemQty: 1500, countedQty: 1495, varianceQty: -5, uomCode: 'PCS' }
      ]
    },
    {
      code: "STC-202604-002",
      warehouseId: whId,
      countDate: "2026-05-15",
      status: "DRAFT", // Sedang dihitung oleh checker
      notes: "Audit ad-hoc parsial.",
      items: [
        { itemId: fgId, desc: "Kopi Bubuk Arabica Premium 250g", binLocationId: null, systemQty: 1495, countedQty: 0, varianceQty: 0, uomCode: 'PCS' }
      ]
    }
  ];

  for (const op of opnames) {
     const stcId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "StockCount" ("id", "tenantId", "code", "warehouseId", "countDate", "status", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [stcId, tenantId, op.code, op.warehouseId, op.countDate, op.status, op.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "StockCount" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, op.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of op.items) {
          if(!it.itemId) continue;
          await client.query(
             `INSERT INTO "StockCountItem" ("id", "tenantId", "stockCountId", "lineNo", "itemId", "description", "systemQty", "countedQty", "varianceQty", "uomCode", "binLocationId")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.systemQty, it.countedQty, it.varianceQty, it.uomCode, it.binLocationId]
          );
       }
       console.log(`✅ Seeded Opname: ${op.code}`);
     } catch(e) { console.error(`❌ Skipped Opname ${op.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
