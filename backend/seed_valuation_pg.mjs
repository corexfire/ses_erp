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

  console.log(`Seeding Valuation Layers for tenant: ${tenantId}`);

  // Items
  let rmRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'RM-BKS-01']);
  const rmId = rmRes.rows.length > 0 ? rmRes.rows[0].id : null;

  let fgRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'FG-KB-250']);
  const fgId = fgRes.rows.length > 0 ? fgRes.rows[0].id : null;

  // Find GRNs and POs as References
  let grnRes = await client.query('SELECT "id", "code" FROM "GoodsReceiptNote" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let grnId = grnRes.rows.length > 0 ? grnRes.rows[0].id : null;
  let grnCode = grnRes.rows.length > 0 ? grnRes.rows[0].code : 'GRN-MANUAL';

  const layers = [
    {
      itemId: rmId,
      postingDate: "2026-04-01",
      qty: 500,
      unitCost: 154000.00,
      refType: "OpeningBalance",
      refId: "OB-2026-001"
    },
    {
      itemId: rmId,
      postingDate: "2026-04-20",
      qty: 100,
      unitCost: 160000.00,
      refType: "GoodsReceiptNote",
      refId: grnCode
    },
    {
      itemId: fgId,
      postingDate: "2026-04-10",
      qty: 2500,
      unitCost: 75000.00,
      refType: "ProductionReceipt",
      refId: "PRD-202604-001"
    }
  ];

  for (const layer of layers) {
     const vId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "ValuationLayer" ("id", "tenantId", "itemId", "postingDate", "qty", "unitCost", "refType", "refId") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING`,
         [vId, tenantId, layer.itemId, layer.postingDate, layer.qty, layer.unitCost, layer.refType, layer.refId]
       );
       console.log(`✅ Seeded Valuation Layer: ${layer.refId} (Item: ${layer.itemId})`);
     } catch(e) { console.error(`❌ Skipped Valuation ${layer.refId}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
