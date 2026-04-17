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

  console.log(`Seeding Sales Pricing Rules & Lists for tenant: ${tenantId}`);

  // Base Customer
  let cusRes = await client.query('SELECT "id" FROM "Customer" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'CUS-KVJ']);
  let cusId = cusRes.rows.length > 0 ? cusRes.rows[0].id : null;

  // Base Item
  let fgCode = 'FG-KB-250';

  // 1. Core Price List (Brosur Standar)
  const plId = crypto.randomUUID();
  await client.query(`
    INSERT INTO "PriceList" ("id", "tenantId", "code", "name", "isActive", "updatedAt") 
    VALUES ($1, $2, 'PL-STD-2026', 'Harga Retail Standar Nasional 2026', true, NOW()) 
    ON CONFLICT ("tenantId", "code") DO NOTHING
  `, [plId, tenantId]);

  const pRes = await client.query(`SELECT "id" FROM "PriceList" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, 'PL-STD-2026']);
  if(pRes.rows.length > 0) {
      const activePl = pRes.rows[0].id;
      // Normal price 120.000
      await client.query(`
        INSERT INTO "PriceListItem" ("id", "tenantId", "priceListId", "itemCode", "uomCode", "unitPrice", "effectiveDate")
        VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING
      `, [crypto.randomUUID(), tenantId, activePl, fgCode, 'PCS', 120000.00, '2026-01-01']);
  }

  // 2. Dynamic Pricing Rule (Engine Diskon Bersyarat)
  const prs = [
    {
      code: "PR-PROMO-RAMADHAN",
      name: "Promo Bulan Ramadhan Pihak Ketiga",
      priority: 10, // Higher priority overrides PriceList
      itemCode: fgCode,
      unitPrice: 110000.00, // Diskon 10k
      effectiveDate: "2026-03-01",
      endDate: "2026-04-30",
      customerId: null
    },
    {
      code: "PR-VIP-VIKTORI",
      name: "Kontrak Eksklusif PT. Viktori Jaya (Lifetime)",
      priority: 1, // Highest priority absolute
      itemCode: fgCode,
      unitPrice: 105000.00, // Diskon bandar 15k!
      effectiveDate: "2026-01-01",
      endDate: null,
      customerId: cusId  // Hanya berlaku kalau PO datang dari CUS-KVJ
    }
  ];

  for (const r of prs) {
     const prId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "PriceRule" ("id", "tenantId", "code", "name", "priority", "isActive", "itemCode", "uomCode", "unitPrice", "effectiveDate", "endDate", "customerId", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, true, $6, 'PCS', $7, $8, $9, $10, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [prId, tenantId, r.code, r.name, r.priority, r.itemCode, r.unitPrice, r.effectiveDate, r.endDate, r.customerId]
       );
       console.log(`✅ Seeded Priority Pricing Rule: ${r.code}`);
     } catch(e) { console.error(`❌ Skipped Rule ${r.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
