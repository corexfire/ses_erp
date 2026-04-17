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

  console.log(`Seeding Sales Order for tenant: ${tenantId}`);

  // Base Customer
  let cusRes = await client.query('SELECT "id" FROM "Customer" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'CUS-KVJ']);
  let cusId = cusRes.rows.length > 0 ? cusRes.rows[0].id : null;

  if(!cusId) {
     cusId = crypto.randomUUID();
     await client.query(`
        INSERT INTO "Customer" ("id", "tenantId", "code", "name", "email", "phone", "address1", "city", "isActive", "updatedAt") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, NOW())
     `, [cusId, tenantId, 'CUS-KVJ', 'PT. Kopi Viktori Jaya', 'purchasing@viktori.co.id', '021-9876543', 'Jl. Sudirman', 'Jakarta']);
  }

  // Base Item
  let fgRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'FG-KB-250']);
  const fgId = fgRes.rows.length > 0 ? fgRes.rows[0].id : null;

  // SO Documents
  const orders = [
    {
      code: "SO-202604-001",
      orderDate: "2026-04-15",
      status: "APPROVED",
      notes: "Pesanan masuk dari Kopi Viktori Jaya. Harap segera dikemas.",
      items: [
        { itemId: fgId, desc: "Kopi Bubuk Arabica Premium 250g", qty: 250, uomCode: "PCS", unitPrice: 115000.00, discount: 0 }
      ]
    },
    {
      code: "SO-202604-002",
      orderDate: "2026-04-18",
      status: "DRAFT",
      notes: "Menunggu pembayaran DP 50%.",
      items: [
        { itemId: null, desc: "Jasa Konsultasi Roasting System", qty: 1, uomCode: "JOB", unitPrice: 5000000.00, discount: 0 }
      ]
    }
  ];

  for (const o of orders) {
     const soId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "SalesOrder" ("id", "tenantId", "code", "customerId", "orderDate", "status", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [soId, tenantId, o.code, cusId, o.orderDate, o.status, o.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "SalesOrder" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, o.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of o.items) {
          await client.query(
             `INSERT INTO "SalesOrderItem" ("id", "tenantId", "orderId", "lineNo", "itemId", "description", "qty", "uomCode", "unitPrice", "discount")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.qty, it.uomCode, it.unitPrice, it.discount]
          );
       }
       console.log(`✅ Seeded Sales Order: ${o.code}`);
     } catch(e) { console.error(`❌ Skipped Sales Order ${o.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
