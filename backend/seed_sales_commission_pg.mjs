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

  console.log(`Seeding Sales Commission Scheme & Entries for tenant: ${tenantId}`);

  // Sales User
  const salesUserId = userRes.rows[0].id; // Assign to super admin for testing

  // Active Invoice
  let invRes = await client.query('SELECT "id", "code" FROM "SalesInvoice" WHERE "tenantId" = $1 AND "status" != \'VOID\' LIMIT 1', [tenantId]);
  let invId = invRes.rows.length > 0 ? invRes.rows[0].id : null;
  let invCode = invRes.rows.length > 0 ? invRes.rows[0].code : null;

  // 1. Commission Scheme (Aturan Bagi Hasil)
  const schemes = [
    { code: "COM-B2B-STD", name: "Komisi Sales B2B Standar (2.5%)", rate: 0.025 },
    { code: "COM-HORECA", name: "Komisi Khusus Kafe/Horeca (5%)", rate: 0.05 },
  ];

  let stdSchemeId = null;
  for (const s of schemes) {
     const sId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "CommissionScheme" ("id", "tenantId", "code", "name", "rate", "isActive", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, true, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [sId, tenantId, s.code, s.name, s.rate]
       );
       const sRes = await client.query(`SELECT "id" FROM "CommissionScheme" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, s.code]);
       if(s.code === "COM-B2B-STD" && sRes.rows.length > 0) stdSchemeId = sRes.rows[0].id;
       console.log(`✅ Seeded Commission Scheme: ${s.code}`);
     } catch(e) { console.error(`❌ Skipped Scheme ${s.code}: ${e.message}`); }
  }

  // 2. Commission Entry (Pencairan Hasil Keringat / Komisi Cair dari Invoice)
  if(invId && stdSchemeId) {
      const entrId = crypto.randomUUID();
      const baseAmount = 28750000; // Asumsi invoice INV-202604-001 (250 qty * 115k)
      const commissionAmount = baseAmount * 0.025; // 2.5%

      try {
         await client.query(
         `INSERT INTO "CommissionEntry" ("id", "tenantId", "schemeId", "invoiceId", "salesUserId", "baseAmount", "amount", "createdAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) ON CONFLICT DO NOTHING`,
         [entrId, tenantId, stdSchemeId, invId, salesUserId, baseAmount, commissionAmount]
         );
         console.log(`✅ Seeded Commission Entry for Invoice ${invCode}. Amount: Rp ${commissionAmount}`);
      } catch(e) { console.error(`❌ Skipped Entry: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
