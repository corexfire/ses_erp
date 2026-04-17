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
  const supRes = await client.query('SELECT "id", "code", "name" FROM "Supplier" WHERE "tenantId" = $1', [tenantId]);
  const suppliers = supRes.rows;

  console.log(`Seeding RFQs for tenant: ${tenantId}`);

  const rfqs = [
    {
      code: "RFQ-202604-001",
      title: "Tender Suplai Kemasan Karton Q3",
      department: "Packaging",
      issueDate: "2026-04-01",
      closingDate: "2026-04-15",
      status: "APPROVED", // We use APPROVED as open actively sourcing (since RFQ status usually uses standard doc status, or custom like QUOTES_RECEIVED)
      notes: "Tender terbuka untuk supplier kemasan dengan requirement food-grade.",
      lines: [
        { desc: "Karton Box Food Grade 30x30", qty: 50000, uomCode: "PCS", targetPrice: 2000 },
        { desc: "Isolasi Packaging Custom Logo", qty: 200, uomCode: "ROLL", targetPrice: 15000 }
      ],
      vendors: suppliers.slice(0, 3) // Invite first 3
    },
    {
      code: "RFQ-202604-002",
      title: "Pengadaan Biji Kopi Robusta Tahunan",
      department: "Production",
      issueDate: "2026-04-10",
      closingDate: "2026-04-25",
      status: "DRAFT",
      notes: "Pengadaan rutin tahunan. Vendor diwajibkan mengirim sample 1KG.",
      lines: [
        { desc: "Biji Kopi Robusta Grade A", qty: 10000, uomCode: "KG", targetPrice: 38000 }
      ],
      vendors: suppliers.slice(2, 4)
    },
    {
      code: "RFQ-202604-003",
      title: "Jasa Cleaning Service & Maintenance HVAC",
      department: "General Affairs",
      issueDate: "2026-03-20",
      closingDate: "2026-03-30",
      status: "APPROVED",
      notes: "Sourcing vendor jasa cleaning service dengan kontrak tahunan.",
      lines: [
        { desc: "Basic Cleaning Service 5 Personel", qty: 12, uomCode: "MONTH", targetPrice: 25000000 },
        { desc: "Maintenance AC Central Bulanan", qty: 12, uomCode: "MONTH", targetPrice: 5000000 }
      ],
      vendors: suppliers.slice(4, 6)
    }
  ];

  for (const r of rfqs) {
    const rfqId = crypto.randomUUID();

    try {
      await client.query(
        `INSERT INTO "Rfq" (
          "id", "tenantId", "code", "title", "department", "issueDate", "closingDate", "status", "notes", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
        ON CONFLICT ("tenantId", "code") DO NOTHING`,
        [rfqId, tenantId, r.code, r.title, r.department, r.issueDate, r.closingDate, r.status, r.notes]
      );

      // Validate insertion
      const res = await client.query('SELECT id FROM "Rfq" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, r.code]);
      if (res.rows.length === 0) continue; 
      const actId = res.rows[0].id;

      // Insert Items
      let lineNo = 1;
      for (const line of r.lines) {
        await client.query(
          `INSERT INTO "RfqItem" (
            "id", "tenantId", "rfqId", "lineNo", "description",
            "qty", "uomCode", "targetPrice"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT DO NOTHING`,
          [crypto.randomUUID(), tenantId, actId, lineNo++, line.desc, line.qty, line.uomCode, line.targetPrice]
        );
      }

      // Insert Vendors
      for (const s of r.vendors) {
        if (!s) continue;
        const bidAmt = Math.random() > 0.5 ? Math.floor(Math.random() * 50000000) : null;
        const status = bidAmt ? 'RESPONSED' : 'INVITED';

        await client.query(
          `INSERT INTO "RfqVendor" (
            "id", "tenantId", "rfqId", "supplierId", "status", "bidAmount", "notes", "createdAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
          ON CONFLICT DO NOTHING`,
          [crypto.randomUUID(), tenantId, actId, s.id, status, bidAmt, bidAmt ? 'Quote attached' : null]
        );
      }

      console.log(`✅ Seeded RFQ: ${r.code}`);
    } catch(e) {
        console.log(`❌ Skipped RFQ: ${r.code} (${e.message})`);
    }
  }

  await client.end();
}

main().catch(console.error);
