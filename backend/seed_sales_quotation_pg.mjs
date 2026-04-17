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

  console.log(`Seeding Sales Quotation for tenant: ${tenantId}`);

  // Base Customers
  let cusRes = await client.query('SELECT "id" FROM "Customer" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let cusId = cusRes.rows.length > 0 ? cusRes.rows[0].id : null;

  if(!cusId) {
     cusId = crypto.randomUUID();
     await client.query(`
        INSERT INTO "Customer" ("id", "tenantId", "code", "name", "email", "phone", "address1", "city", "isActive", "updatedAt") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, NOW())
     `, [cusId, tenantId, 'CUS-KVJ', 'PT. Kopi Viktori Jaya', 'purchasing@viktori.co.id', '021-9876543', 'Jl. Sudirman Kav B3', 'Jakarta Pusat']);
  }

  // Quotation Documents
  const qts = [
    {
      code: "SQ-202604-001",
      issueDate: "2026-04-10",
      expiryDate: "2026-04-24",
      status: "APPROVED",
      notes: "Penawaran suplai kopi bubuk premium untuk cafe cabang Jabodetabek. Harga khusus.",
      items: [
        { desc: "Kopi Bubuk Arabica Premium 250g", qty: 1000, uomCode: "PCS", unitPrice: 120000.00, discount: 5000.00 }
      ]
    },
    {
      code: "SQ-202604-002",
      issueDate: "2026-04-13",
      expiryDate: "2026-04-30",
      status: "DRAFT",
      notes: "Penawaran awal untuk proyek ekspansi 3 outlet baru.",
      items: [
        { desc: "Biji Kopi House Blend 1KG", qty: 500, uomCode: "KG", unitPrice: 200000.00, discount: null }
      ]
    }
  ];

  for (const q of qts) {
     const sqId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "SalesQuotation" ("id", "tenantId", "code", "customerId", "issueDate", "expiryDate", "status", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [sqId, tenantId, q.code, cusId, q.issueDate, q.expiryDate, q.status, q.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "SalesQuotation" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, q.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of q.items) {
          await client.query(
             `INSERT INTO "SalesQuotationItem" ("id", "tenantId", "quotationId", "lineNo", "description", "qty", "uomCode", "unitPrice", "discount")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.desc, it.qty, it.uomCode, it.unitPrice, it.discount]
          );
       }
       console.log(`✅ Seeded Quotation: ${q.code}`);
     } catch(e) { console.error(`❌ Skipped Quotation ${q.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
