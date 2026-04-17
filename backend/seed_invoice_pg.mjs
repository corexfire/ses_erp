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
  if (suppliers.length === 0) return;

  // Get POs (optional relation)
  const poRes = await client.query('SELECT "id", "code", "grandTotal" FROM "PurchaseOrder" WHERE "tenantId" = $1 AND "status" = \'APPROVED\' LIMIT 1', [tenantId]);
  const poId = poRes.rows.length > 0 ? poRes.rows[0].id : null;

  console.log(`Seeding Purchase Invoices for tenant: ${tenantId}`);

  const invs = [
    {
      code: "PINV-202604-1001",
      supplierId: suppliers[0].id,
      orderId: poId,
      invoiceDate: "2026-04-15",
      dueDate: "2026-05-15",
      status: "APPROVED", // AP Approved & Posted (using standard status APPROVED for posted since POSTED might not be in enum)
      paymentTerms: "NET30",
      taxFacturNumber: "010.000-26.01234567",
      notes: "Tagihan Pembelian Material per PO",
      subtotal: 95000000.00,
      taxAmount: 10450000.00, // 11%
      grandTotal: 105450000.00,
      balanceDue: 0, // Fully Paid
      lines: [
        { desc: "Karton Box Food Grade 30x30", qty: 50000, uomCode: "PCS", unitPrice: 1900, amount: 95000000 }
      ]
    },
    {
      code: "PINV-202604-1002",
      supplierId: suppliers.length > 1 ? suppliers[1].id : suppliers[0].id,
      orderId: null, // Direct AP Invoice
      invoiceDate: "2026-04-18",
      dueDate: "2026-04-18", // COD
      status: "DRAFT",
      paymentTerms: "COD",
      taxFacturNumber: "060.000-26.98127311",
      notes: "Pembayaran langsung Jasa Konsultan Maintenance AC",
      subtotal: 5000000.00,
      taxAmount: 550000.00, 
      grandTotal: 5550000.00,
      balanceDue: 5550000.00,
      lines: [
        { desc: "Jasa Cuci AC & Freon Gedung C", qty: 1, uomCode: "LS", unitPrice: 5000000, amount: 5000000 }
      ]
    }
  ];

  for (const inv of invs) {
    const invId = crypto.randomUUID();

    try {
      await client.query(
        `INSERT INTO "PurchaseInvoice" (
          "id", "tenantId", "code", "supplierId", "orderId", "invoiceDate", 
          "dueDate", "paymentTerms", "taxFacturNumber", "status", "notes",
          "subtotal", "taxAmount", "grandTotal", "balanceDue", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())
        ON CONFLICT ("tenantId", "code") DO NOTHING`,
        [
          invId, tenantId, inv.code, inv.supplierId, inv.orderId, inv.invoiceDate,
          inv.dueDate, inv.paymentTerms, inv.taxFacturNumber, inv.status, inv.notes,
          inv.subtotal, inv.taxAmount, inv.grandTotal, inv.balanceDue
        ]
      );

      // Validate insertion
      const res = await client.query('SELECT id FROM "PurchaseInvoice" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, inv.code]);
      if (res.rows.length === 0) continue; 
      const actId = res.rows[0].id;

      // Insert Items
      let lineNo = 1;
      for (const line of inv.lines) {
        await client.query(
          `INSERT INTO "PurchaseInvoiceItem" (
            "id", "tenantId", "invoiceId", "lineNo", "description",
            "qty", "uomCode", "unitPrice", "amount"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT DO NOTHING`,
          [crypto.randomUUID(), tenantId, actId, lineNo++, line.desc, line.qty, line.uomCode, line.unitPrice, line.amount]
        );
      }
      
      console.log(`✅ Seeded Purchase Invoice: ${inv.code}`);
    } catch(e) {
        console.log(`❌ Skipped Invoice: ${inv.code} (${e.message})`);
    }
  }

  await client.end();
}

main().catch(console.error);
