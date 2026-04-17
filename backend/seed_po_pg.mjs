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

  // Get Suppliers
  const supRes = await client.query('SELECT "id", "code", "name" FROM "Supplier" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
  const suppliers = supRes.rows;
  if (suppliers.length === 0) {
    console.log('No suppliers found to associate PO. Run supplier seed first.');
    return;
  }

  // Get RFQs (optional relation)
  const rfqRes = await client.query('SELECT "id" FROM "Rfq" WHERE "tenantId" = $1 AND "status" = \'APPROVED\' LIMIT 1', [tenantId]);
  const rfqId = rfqRes.rows.length > 0 ? rfqRes.rows[0].id : null;

  console.log(`Seeding Purchase Orders for tenant: ${tenantId}`);

  const pos = [
    {
      code: "PO-202604-001",
      supplierId: suppliers[0].id,
      rfqId: rfqId,
      orderDate: "2026-04-05",
      expectedDeliveryDate: "2026-04-12",
      status: "COMPLETED",
      paymentTerms: "NET30",
      shippingAddress: "Gudang Utama - Kawasan Industri MM2100",
      notes: "Telah diterima dengan baik oleh QC",
      subtotal: 95000000.00,
      taxAmount: 10450000.00, // 11%
      grandTotal: 105450000.00,
      lines: [
        { desc: "Karton Box Food Grade 30x30", qty: 50000, uomCode: "PCS", unitPrice: 1900, amount: 95000000 }
      ]
    },
    {
      code: "PO-202604-002",
      supplierId: suppliers.length > 1 ? suppliers[1].id : suppliers[0].id,
      rfqId: null,
      orderDate: "2026-04-12",
      expectedDeliveryDate: "2026-04-20",
      status: "APPROVED",
      paymentTerms: "DP50_NET30",
      shippingAddress: "Pabrik Baru - Cikarang",
      notes: "Order mesin packing otomatis. Instruksi pembayaran menyusul PPN.",
      subtotal: 250000000.00,
      taxAmount: 27500000.00, 
      grandTotal: 277500000.00,
      lines: [
        { desc: "Mesin Packing Sachet Otomatis SS-304", qty: 2, uomCode: "UNIT", unitPrice: 125000000, amount: 250000000 }
      ]
    },
    {
      code: "PO-202604-003",
      supplierId: suppliers[0].id,
      rfqId: null,
      orderDate: "2026-04-13",
      expectedDeliveryDate: "2026-04-15",
      status: "DRAFT",
      paymentTerms: "COD",
      shippingAddress: "Head Office PT SES",
      notes: "Pengadaan rutin bulanan ATK",
      subtotal: 4500000.00,
      taxAmount: 495000.00,
      grandTotal: 4995000.00,
      lines: [
        { desc: "Kertas HVS A4 80gr Sinar Dunia", qty: 50, uomCode: "BOX", unitPrice: 45000, amount: 2250000 },
        { desc: "Tinta Printer Epson T664 Black", qty: 30, uomCode: "BTL", unitPrice: 75000, amount: 2250000 }
      ]
    }
  ];

  for (const po of pos) {
    const poId = crypto.randomUUID();

    try {
      await client.query(
        `INSERT INTO "PurchaseOrder" (
          "id", "tenantId", "code", "supplierId", "rfqId", "orderDate", 
          "expectedDeliveryDate", "status", "paymentTerms", "shippingAddress",
          "subtotal", "taxAmount", "grandTotal", "notes", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
        ON CONFLICT ("tenantId", "code") DO NOTHING`,
        [
          poId, tenantId, po.code, po.supplierId, po.rfqId, po.orderDate,
          po.expectedDeliveryDate, po.status, po.paymentTerms, po.shippingAddress,
          po.subtotal, po.taxAmount, po.grandTotal, po.notes
        ]
      );

      // Validate insertion
      const res = await client.query('SELECT id FROM "PurchaseOrder" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, po.code]);
      if (res.rows.length === 0) continue; 
      const actId = res.rows[0].id;

      // Insert Items
      let lineNo = 1;
      for (const line of po.lines) {
        await client.query(
          `INSERT INTO "PurchaseOrderItem" (
            "id", "tenantId", "orderId", "lineNo", "description",
            "qty", "uomCode", "unitPrice", "amount"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT DO NOTHING`,
          [crypto.randomUUID(), tenantId, actId, lineNo++, line.desc, line.qty, line.uomCode, line.unitPrice, line.amount]
        );
      }
      
      console.log(`✅ Seeded Purchase Order: ${po.code}`);
    } catch(e) {
        console.log(`❌ Skipped PO: ${po.code} (${e.message})`);
    }
  }

  await client.end();
}

main().catch(console.error);
