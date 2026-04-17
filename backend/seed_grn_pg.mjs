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

  // Retrieve Warehouse
  let whRes = await client.query('SELECT "id" FROM "Warehouse" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let warehouseId = whRes.rows.length > 0 ? whRes.rows[0].id : null;
  if (!warehouseId) {
     warehouseId = crypto.randomUUID();
     await client.query(`INSERT INTO "Warehouse" ("id", "tenantId", "code", "name", "isActive", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW())`,
     [warehouseId, tenantId, "WH-MAIN", "Gudang Utama Persediaan", true]);
  }

  // Pick Item / PO / Vendor
  let supplierRes = await client.query('SELECT "id" FROM "Supplier" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  const supplierId = supplierRes.rows.length > 0 ? supplierRes.rows[0].id : null;

  let poRes = await client.query('SELECT "id" FROM "PurchaseOrder" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  const poId = poRes.rows.length > 0 ? poRes.rows[0].id : null;

  let itemRes = await client.query('SELECT "id", "baseUomCode" FROM "Item" WHERE "tenantId" = $1 AND "code" = $2 LIMIT 1', [tenantId, 'RM-BKS-01']);
  const itemId = itemRes.rows.length > 0 ? itemRes.rows[0].id : null;
  const uom = itemRes.rows.length > 0 ? itemRes.rows[0].baseUomCode : 'PCS';

  console.log(`Seeding Goods Receipt Note for tenant: ${tenantId}`);

  const grns = [
    {
      code: "GRN-202604-002",
      supplierId: supplierId,
      purchaseOrderId: poId,
      warehouseId: warehouseId,
      receiptDate: "2026-04-20",
      status: "POSTED",
      notes: "Pengiriman via ekspedisi laut. Kondisi segel aman.",
      items: [
        { desc: "Biji Kopi Spesialti Arabica (Green Beans)", itemId: itemId, qty: 100, uomCode: uom, batchCode: "LOT-0426-A" },
        { desc: "Karung Goni Kualitas A (Packaging)", itemId: null, qty: 50, uomCode: "PCS", batchCode: null }
      ]
    },
    {
      code: "GRN-202604-003",
      supplierId: supplierId,
      purchaseOrderId: poId,
      warehouseId: warehouseId,
      receiptDate: "2026-04-22",
      status: "DRAFT",
      notes: "Pengiriman barang parsial tahap kedua. Menunggu QC lolos.",
      items: [
         { desc: "Biji Kopi Spesialti Arabica (Green Beans)", itemId: itemId, qty: 250, uomCode: uom, batchCode: "LOT-0426-B" }
      ]
    }
  ];

  for (const grn of grns) {
     const grnId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "GoodsReceiptNote" ("id", "tenantId", "code", "supplierId", "purchaseOrderId", "warehouseId", "receiptDate", "status", "notes", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [grnId, tenantId, grn.code, grn.supplierId, grn.purchaseOrderId, grn.warehouseId, grn.receiptDate, grn.status, grn.notes]
       );

       const checkRes = await client.query(`SELECT "id" FROM "GoodsReceiptNote" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, grn.code]);
       if(checkRes.rows.length === 0) continue;
       const actualId = checkRes.rows[0].id;

       let lineNo = 1;
       for (const it of grn.items) {
          await client.query(
             `INSERT INTO "GoodsReceiptItem" ("id", "tenantId", "grnId", "lineNo", "itemId", "description", "qty", "uomCode", "warehouseId", "batchCode")
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING`,
             [crypto.randomUUID(), tenantId, actualId, lineNo++, it.itemId, it.desc, it.qty, it.uomCode, warehouseId, it.batchCode]
          );
       }
       console.log(`✅ Seeded GRN: ${grn.code}`);
     } catch(e) { console.error(`❌ Skipped GRN ${grn.code}: ${e.message}`); }
  }

  await client.end();
}

main().catch(console.error);
