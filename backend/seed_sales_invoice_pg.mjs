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

  console.log(`Seeding Sales Invoice for tenant: ${tenantId}`);

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

  // Invoice Documents (AR / Faktur Jual)
  const invs = [
    {
      code: "INV-202604-001",
      customerId: cusId,
      orderId: soId,
      invoiceDate: "2026-04-16",
      status: "APPROVED", // Approved artinya diposting jadi Piutang (AR) aktif. Jika lunas -> CLOSED
      notes: "Invoice Tagihan Pengiriman Parsial SO-202604-001. Jatuh tempo 30 Hari (End of Month).",
      items: [
        { itemId: fgId, desc: "Kopi Bubuk Arabica Premium 250g", qty: 250, uomCode: "PCS", unitPrice: 115000.00, discount: 0 }
      ]
    },
    {
      code: "INV-202604-002",
      customerId: cusId,
      orderId: null,
      invoiceDate: "2026-04-20",
      status: "DRAFT", // Masih dirancang staf finance, belum mendebit jurnal AR.
      notes: "Tagihan Layanan Ad-Hoc.",
      items: [
        { itemId: null, desc: "Sewa Mesin Espresso Tambahan (Event April)", qty: 1, uomCode: "DAY", unitPrice: 1500000.00, discount: 50000.00 }
      ]
    }
  ];

  for (const iv of invs) {
     const ivId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "SalesInvoice" ("id", "tenantId", "code", "customerId", "orderId", "invoiceDate", "status", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [ivId, tenantId, iv.code, iv.customerId, iv.orderId, iv.invoiceDate, iv.status, iv.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "SalesInvoice" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, iv.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of iv.items) {
          await client.query(
             `INSERT INTO "SalesInvoiceItem" ("id", "tenantId", "invoiceId", "lineNo", "itemId", "description", "qty", "uomCode", "unitPrice", "discount")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.qty, it.uomCode, it.unitPrice, it.discount]
          );
       }
       console.log(`✅ Seeded Sales Invoice: ${iv.code}`);
     } catch(e) { console.error(`❌ Skipped Invoice ${iv.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
