import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/erp_db',
});

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) {
    console.log('No users found.');
    return;
  }
  const user = userRes.rows[0];
  const tenantId = user.tenantId;

  // Get PO connection
  const poRes = await client.query('SELECT "id", "code" FROM "PurchaseOrder" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  const poId = poRes.rows.length > 0 ? poRes.rows[0].id : null;

  // Get Invoice connection
  const invRes = await client.query('SELECT "id", "code" FROM "PurchaseInvoice" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  const invoiceId = invRes.rows.length > 0 ? invRes.rows[0].id : null;

  // Get Goods Receipt
  let grnRes = await client.query('SELECT "id", "code" FROM "GoodsReceiptNote" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let grnId = grnRes.rows.length > 0 ? grnRes.rows[0].id : null;
  
  if (!grnId && poId) {
      // Mock GRN to allow matching
      const supRes = await client.query('SELECT "id" FROM "Supplier" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
      const whRes = await client.query('SELECT "id" FROM "Warehouse" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
      let warehouseId = whRes.rows.length > 0 ? whRes.rows[0].id : null;
      if (!warehouseId) {
          warehouseId = crypto.randomUUID();
          await client.query(`INSERT INTO "Warehouse" ("id", "tenantId", "code", "name", "isActive", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW())`,
          [warehouseId, tenantId, "WH-MAIN", "Gudang Utama", true]);
      }
      
      if (supRes.rows.length > 0) {
        grnId = crypto.randomUUID();
        await client.query(`INSERT INTO "GoodsReceiptNote" ("id", "tenantId", "code", "supplierId", "purchaseOrderId", "warehouseId", "receiptDate", "status", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), 'DRAFT', NOW())`,
        [grnId, tenantId, "GRN-202604-001", supRes.rows[0].id, poId, warehouseId]);
      }
  }

  console.log(`Seeding Three Way Matches for tenant: ${tenantId}`);

  if (!poId || !invoiceId || !grnId) {
      console.log('Skipping seed: Needs at least 1 PO, 1 Invoice, and 1 GRN existing in the system.');
      await client.end();
      return;
  }

  const matches = [
    {
      code: "3WM-202604-001",
      invoiceId: invoiceId,
      orderId: poId,
      receiptId: grnId,
      matchDate: "2026-04-20",
      status: "APPROVED",
      discrepancyNotes: "Dokumen komplit dan nilai harga serta kuantitas presisi 100%. Sesuai antara PO (Harga), GRN (Fisik Masuk), dan Invoice (Tagihan).",
      varianceAmount: 0.00
    },
    {
      code: "3WM-202604-002",
      invoiceId: invoiceId,
      orderId: poId,
      receiptId: grnId,
      matchDate: "2026-04-21",
      status: "DISCREPANCY",
      discrepancyNotes: "Terdeteksi deviasi/perbedaan tagihan sebesar Rp 150.000 (Harga unit di Invoice lebih tinggi dari kesepakatan PO awal).",
      varianceAmount: 150000.00
    }
  ];

  for (const mw of matches) {
    const mwId = crypto.randomUUID();

    try {
      await client.query(
        `INSERT INTO "ThreeWayMatching" (
          "id", "tenantId", "code", "invoiceId", "orderId", "receiptId", 
          "matchDate", "status", "discrepancyNotes", "varianceAmount", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
        ON CONFLICT ("tenantId", "code") DO NOTHING`,
        [
          mwId, tenantId, mw.code, mw.invoiceId, mw.orderId, mw.receiptId,
          mw.matchDate, mw.status, mw.discrepancyNotes, mw.varianceAmount
        ]
      );
      
      console.log(`✅ Seeded Three-Way Match Audit: ${mw.code}`);
    } catch(e) {
        console.log(`❌ Skipped Three-Way Match: ${mw.code} (${e.message})`);
    }
  }

  await client.end();
}

main().catch(console.error);
