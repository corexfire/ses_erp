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

  // Get PO connection
  const poRes = await client.query('SELECT "id", "code" FROM "PurchaseOrder" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  const poId = poRes.rows.length > 0 ? poRes.rows[0].id : null;

  // Get Invoice connection
  const invRes = await client.query('SELECT "id", "code" FROM "PurchaseInvoice" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  const invoiceId = invRes.rows.length > 0 ? invRes.rows[0].id : null;

  console.log(`Seeding Purchase Returns for tenant: ${tenantId}`);

  const returns = [
    {
      code: "PRT-202604-001",
      supplierId: suppliers[0].id,
      orderId: poId,
      invoiceId: invoiceId, // Linking to Invoice creates a Debit Note scenario
      returnDate: "2026-04-18",
      reason: "Barang rusak selama pengiriman jalur laut (Defective Items)",
      status: "APPROVED",
      notes: "Klaim refund atas kerusakan kemasan produk. Vendor setuju pemotongan tagihan berjalan.",
      subtotal: 950000.00,
      taxAmount: 104500.00,
      grandTotal: 1054500.00,
      lines: [
        { desc: "Karton Box Food Grade 30x30", qty: 500, uomCode: "PCS", unitPrice: 1900, amount: 950000 }
      ]
    },
    {
      code: "PRT-202604-002",
      supplierId: suppliers.length > 1 ? suppliers[1].id : suppliers[0].id,
      orderId: null,
      invoiceId: null, // Return based on raw material failing QC independently
      returnDate: "2026-04-20",
      reason: "Tidak lolos Quality Control (QC Failed)",
      status: "DRAFT",
      notes: "Proses sorting di pabrik menunjukkan 15 Unit tidak beroperasi maksimal.",
      subtotal: 18750000.00,
      taxAmount: 2062500.00,
      grandTotal: 20812500.00,
      lines: [
        { desc: "Mesin Packing Sachet Otomatis", qty: 15, uomCode: "PCS", unitPrice: 1250000, amount: 18750000 }
      ]
    }
  ];

  for (const pr of returns) {
    const prtId = crypto.randomUUID();

    try {
      await client.query(
        `INSERT INTO "PurchaseReturn" (
          "id", "tenantId", "code", "supplierId", "orderId", "invoiceId", 
          "returnDate", "reason", "status", "notes", "subtotal", "taxAmount", "grandTotal", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
        ON CONFLICT ("tenantId", "code") DO NOTHING`,
        [
          prtId, tenantId, pr.code, pr.supplierId, pr.orderId, pr.invoiceId,
          pr.returnDate, pr.reason, pr.status, pr.notes, pr.subtotal, pr.taxAmount, pr.grandTotal
        ]
      );

      const res = await client.query('SELECT id FROM "PurchaseReturn" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, pr.code]);
      if (res.rows.length === 0) continue; 
      const actId = res.rows[0].id;

      let lineNo = 1;
      for (const line of pr.lines) {
        await client.query(
          `INSERT INTO "PurchaseReturnItem" (
            "id", "tenantId", "returnId", "lineNo", "description",
            "qty", "uomCode", "unitPrice", "amount"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT DO NOTHING`,
          [crypto.randomUUID(), tenantId, actId, lineNo++, line.desc, line.qty, line.uomCode, line.unitPrice, line.amount]
        );
      }
      
      console.log(`✅ Seeded Purchase Return: ${pr.code}`);
    } catch(e) {
        console.log(`❌ Skipped Return: ${pr.code} (${e.message})`);
    }
  }

  await client.end();
}

main().catch(console.error);
