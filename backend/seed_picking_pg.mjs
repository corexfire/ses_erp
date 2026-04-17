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

  // Retrieve Target Sales Order
  let orderRes = await client.query('SELECT "id", "code" FROM "SalesOrder" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let orderId = orderRes.rows.length > 0 ? orderRes.rows[0].id : null;

  // Items
  let fgRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'FG-KB-250']);
  const fgId = fgRes.rows.length > 0 ? fgRes.rows[0].id : null;

  // Bin
  let binRes = await client.query('SELECT "id" FROM "BinLocation" WHERE "warehouseId" = $1 LIMIT 1', [warehouseId]);
  let fromBinId = binRes.rows.length > 0 ? binRes.rows[0].id : null;

  console.log(`Seeding Picking Log for tenant: ${tenantId}`);

  const picks = [
    {
      code: "PCK-202604-001",
      salesOrderId: orderId,
      warehouseId: warehouseId,
      pickingDate: "2026-04-25",
      status: "DRAFT",
      notes: "Ambil dari Rak Barang Jadi. Prioritas jalur pengiriman Sore.",
      items: [
        { desc: "Kopi Bubuk Arabica Premium 250g", itemId: fgId, qty: 120, pickedQty: 0, batchCode: "LOT-0426-X", fromBinId }
      ]
    },
    {
      code: "PCK-202604-002",
      salesOrderId: null,
      warehouseId: warehouseId,
      pickingDate: "2026-04-26",
      status: "POSTED",
      notes: "Selesai diambil untuk pengeluaran ke divisi Internal (Ad-Hoc).",
      items: [
         { desc: "Biji Kopi Spesialti Arabica (AdHoc Keluar)", itemId: null, qty: 15, pickedQty: 15, batchCode: "", fromBinId }
      ]
    }
  ];

  for (const pk of picks) {
     const pkId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "Picking" ("id", "tenantId", "code", "salesOrderId", "warehouseId", "pickingDate", "status", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [pkId, tenantId, pk.code, pk.salesOrderId, pk.warehouseId, pk.pickingDate, pk.status, pk.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "Picking" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, pk.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of pk.items) {
          await client.query(
             `INSERT INTO "PickingItem" ("id", "tenantId", "pickingId", "lineNo", "itemId", "description", "qty", "pickedQty", "fromBinLocationId", "batchCode")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.qty, it.pickedQty, it.fromBinId, it.batchCode]
          );
       }
       console.log(`✅ Seeded Picking: ${pk.code}`);
     } catch(e) { console.error(`❌ Skipped Picking ${pk.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
