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

  // Documents Reference
  let grnRes = await client.query('SELECT "id", "code" FROM "GoodsReceiptNote" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let grnId = grnRes.rows.length > 0 ? grnRes.rows[0].id : null;

  // Items
  let rmRes = await client.query('SELECT "id" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'RM-BKS-01']);
  const rmId = rmRes.rows.length > 0 ? rmRes.rows[0].id : null;

  console.log(`Seeding QC Inspection Log for tenant: ${tenantId}`);

  const inspections = [
    {
      code: "QCI-202604-001",
      grnId: grnId,
      inspectionDate: "2026-04-20",
      status: "POSTED",
      inspectorName: "Andi Saputra (Tim QA)",
      notes: "Inspeksi kedatangan green beans impor.",
      items: [
        { desc: "Biji Kopi Spesialti Arabica", itemId: rmId, sampleQty: 10, passedQty: 9, failedQty: 1, defectReason: "1 sample berkutu/busuk" }
      ]
    },
    {
      code: "QCI-202604-002",
      grnId: null,
      inspectionDate: "2026-04-22",
      status: "DRAFT",
      inspectorName: "Siti Rahma",
      notes: "Pemeriksaan acak lot gudang (Cycle Count QC).",
      items: [
         { desc: "Biji Kopi Spesialti Arabica", itemId: rmId, sampleQty: 50, passedQty: 0, failedQty: 0, defectReason: null }
      ]
    }
  ];

  for (const ins of inspections) {
     const iId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "QcInspection" ("id", "tenantId", "code", "grnId", "inspectionDate", "status", "inspectorName", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [iId, tenantId, ins.code, ins.grnId, ins.inspectionDate, ins.status, ins.inspectorName, ins.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "QcInspection" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, ins.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of ins.items) {
          await client.query(
             `INSERT INTO "QcInspectionItem" ("id", "tenantId", "qcInspectionId", "lineNo", "itemId", "description", "sampleQty", "passedQty", "failedQty", "defectReason")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.sampleQty, it.passedQty, it.failedQty, it.defectReason]
          );
       }
       console.log(`✅ Seeded QC Inspection: ${ins.code}`);
     } catch(e) { console.error(`❌ Skipped QC ${ins.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
