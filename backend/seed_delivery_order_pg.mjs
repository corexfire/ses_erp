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

  console.log(`Seeding Delivery Order for tenant: ${tenantId}`);

  // Base Customer
  let cusRes = await client.query('SELECT "id" FROM "Customer" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'CUS-KVJ']);
  let cusId = cusRes.rows.length > 0 ? cusRes.rows[0].id : null;

  // Base Warehouse
  let whRes = await client.query('SELECT "id" FROM "Warehouse" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let whId = whRes.rows.length > 0 ? whRes.rows[0].id : null;

  // Base Item
  let fgRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'FG-KB-250']);
  const fgId = fgRes.rows.length > 0 ? fgRes.rows[0].id : null;

  if(!cusId || !whId) {
     console.error("Missing Warehouse or Customer. Please run earlier seeders.");
     await client.end();
     return;
  }

  // Delivery Document (DO / Surat Jalan)
  const dos = [
    {
      code: "DO-202604-001",
      customerId: cusId,
      warehouseId: whId,
      status: "IN_TRANSIT", // Sedang di dalam truk
      priority: "HIGH",
      plannedShipDate: "2026-04-16",
      actualShipDate: "2026-04-16",
      deliveryAddress1: "Jl. Jenderal Sudirman Kav B3",
      deliveryCity: "Jakarta Pusat",
      deliveryNotes: "Awas pecah transit, instruksi supir via Tol Dalam Kota.",
      items: [
        { itemId: fgId, desc: "Kopi Bubuk Arabica Premium 250g", orderedQty: 250, shippedQty: 250, uomCode: "PCS" }
      ]
    },
    {
      code: "DO-202604-002",
      customerId: cusId,
      warehouseId: whId,
      status: "DRAFT", // Sedang di-*picking* oleh gudang
      priority: "NORMAL",
      plannedShipDate: "2026-04-20",
      actualShipDate: null,
      deliveryAddress1: "Cabang Gudang Viktori Selatan",
      deliveryCity: "Jakarta Selatan",
      deliveryNotes: "",
      items: [
        { itemId: fgId, desc: "Kopi Bubuk Arabica Premium 250g", orderedQty: 100, shippedQty: 0, uomCode: "PCS" }
      ]
    }
  ];

  for (const d of dos) {
     const doId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "DeliveryOrder" ("id", "tenantId", "code", "customerId", "warehouseId", "status", "priority", "plannedShipDate", "actualShipDate", "deliveryAddress1", "deliveryCity", "deliveryNotes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [doId, tenantId, d.code, d.customerId, d.warehouseId, d.status, d.priority, d.plannedShipDate, d.actualShipDate, d.deliveryAddress1, d.deliveryCity, d.deliveryNotes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "DeliveryOrder" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, d.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of d.items) {
          await client.query(
             `INSERT INTO "DeliveryOrderItem" ("id", "tenantId", "deliveryOrderId", "lineNo", "itemId", "description", "orderedQty", "shippedQty", "uomCode", "unitPrice")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 0) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.orderedQty, it.shippedQty, it.uomCode]
          );
       }
       console.log(`✅ Seeded Delivery Order: ${d.code}`);
     } catch(e) { console.error(`❌ Skipped DO ${d.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
