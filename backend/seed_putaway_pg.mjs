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

  let whRes = await client.query('SELECT "id" FROM "Warehouse" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let warehouseId = whRes.rows.length > 0 ? whRes.rows[0].id : null;

  // Let's create some Bin Locations if they don't exist
  let binRes = await client.query('SELECT "id", "code" FROM "BinLocation" WHERE "warehouseId" = $1 AND "code" IN ($2, $3)', [warehouseId, "BIN-REC-01", "BIN-A-10"]);
  let binRecId = null;
  let binA10Id = null;

  for(const r of binRes.rows) {
      if(r.code === 'BIN-REC-01') binRecId = r.id;
      if(r.code === 'BIN-A-10') binA10Id = r.id;
  }

  if (!binRecId) {
      binRecId = crypto.randomUUID();
      await client.query(`INSERT INTO "BinLocation" ("id", "tenantId", "warehouseId", "code", "name", "isActive", "updatedAt") VALUES ($1, $2, $3, $4, $5, true, NOW())`,
      [binRecId, tenantId, warehouseId, "BIN-REC-01", "Area Receiving / Transit"]);
  }
  if (!binA10Id) {
      binA10Id = crypto.randomUUID();
      await client.query(`INSERT INTO "BinLocation" ("id", "tenantId", "warehouseId", "code", "name", "isActive", "updatedAt") VALUES ($1, $2, $3, $4, $5, true, NOW())`,
      [binA10Id, tenantId, warehouseId, "BIN-A-10", "Rak Utama Kopi Mentah A-10"]);
  }

  // Find GRNs to link
  let grnRes = await client.query('SELECT "id", "code" FROM "GoodsReceiptNote" WHERE "tenantId" = $1 LIMIT 2', [tenantId]);
  if(grnRes.rows.length === 0) {
      console.log('Skipping Putaway seed. Please run seed_grn_pg.mjs first.');
      await client.end();
      return;
  }
  
  const grn1 = grnRes.rows[0];
  const grn2 = grnRes.rows.length > 1 ? grnRes.rows[1] : grnRes.rows[0];

  let itemRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'RM-BKS-01']);
  const itemId = itemRes.rows.length > 0 ? itemRes.rows[0].id : null;

  console.log(`Seeding Putaway Log for tenant: ${tenantId}`);

  const putaways = [
    {
      code: "PTW-202604-001",
      grnId: grn1.id,
      warehouseId: warehouseId,
      putawayDate: "2026-04-20",
      status: "POSTED",
      notes: "Pemindahan fisik dari Area Penerimaan ke Rak A-10",
      items: [
        { desc: "Biji Kopi Spesialti Arabica", itemId: itemId, qty: 100, batchCode: "LOT-0426-A", fromBin: binRecId, toBin: binA10Id }
      ]
    },
    {
      code: "PTW-202604-002",
      grnId: grn2.id,
      warehouseId: warehouseId,
      putawayDate: "2026-04-22",
      status: "DRAFT",
      notes: "Sedang dikerjakan oleh Tim Forklift",
      items: [
         { desc: "Biji Kopi Spesialti Arabica", itemId: itemId, qty: 250, batchCode: "LOT-0426-B", fromBin: binRecId, toBin: null }
      ]
    }
  ];

  for (const pw of putaways) {
     const pwId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "Putaway" ("id", "tenantId", "code", "grnId", "warehouseId", "putawayDate", "status", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [pwId, tenantId, pw.code, pw.grnId, pw.warehouseId, pw.putawayDate, pw.status, pw.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "Putaway" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, pw.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of pw.items) {
          await client.query(
             `INSERT INTO "PutawayItem" ("id", "tenantId", "putawayId", "lineNo", "itemId", "description", "qty", "fromBinLocationId", "toBinLocationId", "batchCode")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.qty, it.fromBin, it.toBin, it.batchCode]
          );
       }
       console.log(`✅ Seeded Putaway: ${pw.code}`);
     } catch(e) { console.error(`❌ Skipped Putaway ${pw.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
