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

  console.log(`Seeding Packing/Consolidation Log for tenant: ${tenantId}`);

  const packs = [
    {
      code: "PAC-202604-001",
      salesOrderId: orderId,
      warehouseId: warehouseId,
      packingDate: "2026-04-26",
      status: "DRAFT",
      notes: "Pisahkan menjadi 2 Box. Box 1: 50 PCS. Box 2: 70 PCS. Gunakan Bubble Wrap.",
      items: [
        { desc: "Kopi Bubuk Arabica Premium 250g", itemId: fgId, qty: 50, uomCode: "PCS", boxNo: "BOX-001", weight: 12.5, trackingId: "JT-88123" },
        { desc: "Kopi Bubuk Arabica Premium 250g", itemId: fgId, qty: 70, uomCode: "PCS", boxNo: "BOX-002", weight: 17.5, trackingId: "JT-88123" }
      ]
    },
    {
      code: "PAC-202604-002",
      salesOrderId: orderId,
      warehouseId: warehouseId,
      packingDate: "2026-04-27",
      status: "POSTED",
      notes: "Selesai di-seal dan masuk antrean Delivery. Palet Kayu utuh.",
      items: [
         { desc: "Biji Kopi Spesialti Arabica (Whole Bean)", itemId: null, qty: 15, uomCode: "KARUNG", boxNo: "PALLET-BKS-01", weight: 750.0, trackingId: "INHOUSE-DRV" }
      ]
    }
  ];

  for (const pack of packs) {
     const pkId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "Packing" ("id", "tenantId", "code", "salesOrderId", "warehouseId", "packingDate", "status", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [pkId, tenantId, pack.code, pack.salesOrderId, pack.warehouseId, pack.packingDate, pack.status, pack.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "Packing" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, pack.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of pack.items) {
          await client.query(
             `INSERT INTO "PackingItem" ("id", "tenantId", "packingId", "lineNo", "itemId", "description", "qty", "uomCode", "boxNo", "weight", "trackingId")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.qty, it.uomCode, it.boxNo, it.weight, it.trackingId]
          );
       }
       console.log(`✅ Seeded Packing: ${pack.code}`);
     } catch(e) { console.error(`❌ Skipped Packing ${pack.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
