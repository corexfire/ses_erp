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

  // Since Landed Cost often connects to POs
  const poRes = await client.query('SELECT "id", "code" FROM "PurchaseOrder" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  const poId = poRes.rows.length > 0 ? poRes.rows[0].id : null;
  const poCode = poRes.rows.length > 0 ? poRes.rows[0].code : 'TBD';

  // Goods Receipt Note (if we have one, otherwise null)
  const grnRes = await client.query('SELECT "id" FROM "GoodsReceiptNote" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  const grnId = grnRes.rows.length > 0 ? grnRes.rows[0].id : null;

  console.log(`Seeding Landed Costs for tenant: ${tenantId}`);

  const lcs = [
    {
      code: "LCV-202604-001",
      orderId: poId,
      receiptId: grnId,
      costDate: "2026-04-18",
      status: "APPROVED",
      apportionmentMethod: "Amount", // By amount is very common for customs
      notes: `Alokasi biaya Bea Cukai & Freight Inward dari transaksi ${poCode}. Distribusi beban dibagi berdasarkan Proporsi Nilai Barang.`,
      totalAmount: 12500000.00,
      lines: [
        { costComponent: "Shipping & Forwarding (Freight In)", amount: 5000000 },
        { costComponent: "Pajak Impor (Bea Masuk Tambahan)", amount: 7500000 }
      ]
    },
    {
      code: "LCV-202604-002",
      orderId: poId,
      receiptId: grnId,
      costDate: "2026-04-20",
      status: "DRAFT",
      apportionmentMethod: "Quantity", // By quantity is common for uniform physical units
      notes: "Biaya transport truk lokal (Ekspedisi Darat) pengiriman dari Pelabuhan ke Gudang Cikarang.",
      totalAmount: 1800000.00,
      lines: [
        { costComponent: "Ekspedisi Truk Lokal (Logistics)", amount: 1800000 }
      ]
    }
  ];

  for (const lc of lcs) {
    const lcvId = crypto.randomUUID();

    try {
      await client.query(
        `INSERT INTO "LandedCostVoucher" (
          "id", "tenantId", "code", "orderId", "receiptId", "costDate", 
          "status", "apportionmentMethod", "notes", "totalAmount", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
        ON CONFLICT ("tenantId", "code") DO NOTHING`,
        [
          lcvId, tenantId, lc.code, lc.orderId, lc.receiptId, lc.costDate,
          lc.status, lc.apportionmentMethod, lc.notes, lc.totalAmount
        ]
      );

      // Validate insertion
      const res = await client.query('SELECT id FROM "LandedCostVoucher" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, lc.code]);
      if (res.rows.length === 0) continue; 
      const actId = res.rows[0].id;

      // Insert Items
      let lineNo = 1;
      for (const line of lc.lines) {
        await client.query(
          `INSERT INTO "LandedCostAllocation" (
            "id", "tenantId", "landedCostId", "lineNo", "costComponent", "amount"
          ) VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT DO NOTHING`,
          [crypto.randomUUID(), tenantId, actId, lineNo++, line.costComponent, line.amount]
        );
      }
      
      console.log(`✅ Seeded Landed Cost: ${lc.code}`);
    } catch(e) {
        console.log(`❌ Skipped Landed Cost: ${lc.code} (${e.message})`);
    }
  }

  await client.end();
}

main().catch(console.error);
