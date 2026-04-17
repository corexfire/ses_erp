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

  console.log(`Seeding Sales Return (RMA) for tenant: ${tenantId}`);

  // Base Customer
  let cusRes = await client.query('SELECT "id" FROM "Customer" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'CUS-KVJ']);
  let cusId = cusRes.rows.length > 0 ? cusRes.rows[0].id : null;

  // Base Item
  let fgRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'FG-KB-250']);
  const fgId = fgRes.rows.length > 0 ? fgRes.rows[0].id : null;

  // SO
  let soRes = await client.query('SELECT "id" FROM "SalesOrder" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  const soId = soRes.rows.length > 0 ? soRes.rows[0].id : null;

  if(!cusId) {
     console.error("Missing Customer. Run previous PG seeders.");
     await client.end();
     return;
  }

  // Sales Return Documents (RMA / Retur Jual)
  const rets = [
    {
      code: "RMA-202604-001",
      customerId: cusId,
      orderId: soId,
      returnDate: "2026-04-18",
      status: "DRAFT", // Masih diinspeksi gudang apakah layak diretur
      notes: "Klaim Retur (RMA): 5 bungkus kemasan kopi bocor/sobek saat pengiriman.",
      items: [
        { itemId: fgId, desc: "Kopi Bubuk Arabica Premium 250g (Kemasan Rusak)", qty: 5, uomCode: "PCS", unitPrice: 115000.00 }
      ]
    }
  ];

  for (const rt of rets) {
     const rtId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "SalesReturn" ("id", "tenantId", "code", "customerId", "orderId", "returnDate", "status", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [rtId, tenantId, rt.code, rt.customerId, rt.orderId, rt.returnDate, rt.status, rt.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "SalesReturn" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, rt.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of rt.items) {
          await client.query(
             `INSERT INTO "SalesReturnItem" ("id", "tenantId", "returnId", "lineNo", "itemId", "description", "qty", "uomCode", "unitPrice")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.qty, it.uomCode, it.unitPrice]
          );
       }
       console.log(`✅ Seeded Sales Return: ${rt.code}`);
     } catch(e) { console.error(`❌ Skipped Sales Return ${rt.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
