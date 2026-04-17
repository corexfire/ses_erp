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

  console.log(`Seeding Inventory Planning (MRP) for tenant: ${tenantId}`);

  // Base Items for Planning
  let rmRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'RM-BKS-01']);
  const rmId = rmRes.rows.length > 0 ? rmRes.rows[0].id : null;

  let fgRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'FG-KB-250']);
  const fgId = fgRes.rows.length > 0 ? fgRes.rows[0].id : null;

  if(!rmId) {
     console.error("No Items found. Please run earlier seeders.");
     await client.end();
     return;
  }

  // Generate an MRP Run
  const mrpRunId = crypto.randomUUID();
  await client.query(`
      INSERT INTO "MrpRun" ("id", "tenantId", "runDate", "status", "demandSource", "notes")
      VALUES ($1, $2, NOW(), 'COMPLETED', 'Sales Forecast & Min-Max Reorder', 'Auto MRP generation weekend run.')
  `, [mrpRunId, tenantId]);

  // MRP Suggestions
  const suggestions = [
    {
      itemId: rmId,
      suggestionType: "PURCHASE", // Need to buy Raw Material
      qtyRequired: 1000,          // Based on forecast
      qtyOnHand: 350,
      qtyOnOrder: 100,            // Pending POs
      qtySuggested: 550,          // 1000 - 350 - 100
      dueDate: "2026-05-10"
    },
    {
      itemId: fgId,
      suggestionType: "MANUFACTURE", // Need to produce Finished Good
      qtyRequired: 2000,
      qtyOnHand: 1500,
      qtyOnOrder: 0,
      qtySuggested: 500,
      dueDate: "2026-04-28"
    }
  ];

  for (const s of suggestions) {
      if(!s.itemId) continue;
      try {
          await client.query(`
             INSERT INTO "MrpSuggestion" ("id", "tenantId", "mrpRunId", "itemId", "suggestionType", "qtyRequired", "qtyOnHand", "qtyOnOrder", "qtySuggested", "dueDate", "status")
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'OPEN')
          `, [crypto.randomUUID(), tenantId, mrpRunId, s.itemId, s.suggestionType, s.qtyRequired, s.qtyOnHand, s.qtyOnOrder, s.qtySuggested, s.dueDate]);
      } catch (e) {
          console.error(`❌ Failed: ${e.message}`);
      }
  }

  console.log(`✅ Seeded MRP Run & Suggestions.`);
  await client.end();
}

main().catch(console.error);
