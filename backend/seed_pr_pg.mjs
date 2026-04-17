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

  // Get a Cost Center if available
  const ccRes = await client.query('SELECT "id", "code" FROM "CostCenter" WHERE "tenantId" = $1 LIMIT 3', [tenantId]);
  const costCenters = ccRes.rows;

  // Get Items
  const itemRes = await client.query('SELECT "id", "code", "name" FROM "Item" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
  const items = itemRes.rows;

  console.log(`Seeding Purchase Requisitions for tenant: ${tenantId}`);

  const reqs = [
    {
      code: "PR-202604-001",
      status: "APPROVED",
      department: "Production",
      date: "2026-04-10",
      notes: "Kebutuhan bahan baku produksi Batch #04A - Urgent karena stok menipis",
      estimatedTotal: 125000000.00,
      lines: [
        { desc: "Biji Kopi Robusta Grade A", qty: 2500, uomCode: "KG", estimatedPrice: 40000 },
        { desc: "Gula Pasir Refined", qty: 1000, uomCode: "KG", estimatedPrice: 15000 },
        { desc: "Susu Evaporasi Can", qty: 500, uomCode: "CAN", estimatedPrice: 20000 }
      ]
    },
    {
      code: "PR-202604-002",
      status: "DRAFT",
      department: "Marketing",
      date: "2026-04-11",
      notes: "Pembelian materi promosi untuk event pameran kuliner JCC",
      estimatedTotal: 34500000.00,
      lines: [
        { desc: "Brosur Full Color A5", qty: 10000, uomCode: "PCS", estimatedPrice: 850 },
        { desc: "Standing Banner 60x160", qty: 20, uomCode: "PCS", estimatedPrice: 350000 },
        { desc: "Goodie Bag Custom", qty: 1000, uomCode: "PCS", estimatedPrice: 19000 }
      ]
    },
    {
      code: "PR-202604-003",
      status: "PENDING_APPROVAL",
      department: "IT & Infrastructure",
      date: "2026-04-12",
      notes: "Pengadaan hardware server baru untuk modul ERP",
      estimatedTotal: 150000000.00,
      lines: [
        { desc: "Server Dell PowerEdge R740", qty: 2, uomCode: "UNIT", estimatedPrice: 65000000 },
        { desc: "Switch Cisco 48 Port C9200", qty: 1, uomCode: "UNIT", estimatedPrice: 20000000 }
      ]
    },
    {
      code: "PR-202604-004",
      status: "PO_CREATED",
      department: "Warehouse",
      date: "2026-04-05",
      notes: "Sparepart forklift & perbaikan palet",
      estimatedTotal: 8500000.00,
      lines: [
        { desc: "Ban Forklift Toyota Komatsu", qty: 4, uomCode: "PCS", estimatedPrice: 1800000 },
        { desc: "Palet Kayu Jati", qty: 50, uomCode: "PCS", estimatedPrice: 26000 }
      ]
    }
  ];

  for (const r of reqs) {
    const prId = crypto.randomUUID();
    const ccId = costCenters.length > 0 ? costCenters[Math.floor(Math.random() * costCenters.length)].id : null;

    try {
      await client.query(
        `INSERT INTO "PurchaseRequisition" (
          "id", "tenantId", "code", "requestDate", "status", "notes", 
          "department", "costCenterId", "estimatedTotal", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
        ON CONFLICT ("tenantId", "code") DO NOTHING`,
        [prId, tenantId, r.code, r.date, r.status, r.notes, r.department, ccId, r.estimatedTotal]
      );

      // Validate insertion
      const res = await client.query('SELECT id FROM "PurchaseRequisition" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, r.code]);
      if (res.rows.length === 0) continue; // Skipped due to conflict
      
      const actId = res.rows[0].id;

      let lineNo = 1;
      for (const line of r.lines) {
        const itemId = items.length > 0 ? items[Math.floor(Math.random() * items.length)].id : null;

        await client.query(
          `INSERT INTO "PurchaseRequisitionItem" (
            "id", "tenantId", "requisitionId", "lineNo", "itemId", "description",
            "qty", "uomCode", "estimatedPrice"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT DO NOTHING`,
          [
            crypto.randomUUID(), tenantId, actId, lineNo++, itemId, line.desc,
            line.qty, line.uomCode, line.estimatedPrice
          ]
        );
      }
      console.log(`✅ Seeded PR: ${r.code}`);
    } catch(e) {
        console.log(`❌ Skipped PR: ${r.code} (${e.message})`);
    }
  }

  await client.end();
}

main().catch(console.error);
