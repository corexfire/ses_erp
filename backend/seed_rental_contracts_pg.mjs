import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const { tenantId } = userRes.rows[0];

  console.log(`Seeding Rental Contracts for tenant: ${tenantId}`);

  const customerRes = await client.query('SELECT id, name FROM "Customer" WHERE "tenantId" = $1 LIMIT 10', [tenantId]);
  const assetRes = await client.query('SELECT id, "assetNo", name FROM "FixedAsset" WHERE "tenantId" = $1 LIMIT 10', [tenantId]);

  const customers = customerRes.rows;
  const assets = assetRes.rows;

  if (customers.length === 0) {
    console.log('No customers found. Please run seed_crm_customer_pg.mjs first.');
    await client.end();
    return;
  }

  const contracts = [
    {
      contractNo: 'RNT-2024-001',
      customer: customers[0]?.name || 'Hotel Grand Hyatt',
      assetDesc: 'Mesin Giling Kopi Industri (Roaster)',
      status: 'ACTIVE',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      rentalRate: 15000000,
      depositAmount: 45000000,
      billingCycle: 'MONTHLY',
      notes: 'Sewa mesin roaster untuk pabrik kopi'
    },
    {
      contractNo: 'RNT-2024-002',
      customer: customers[1]?.name || 'PT Surya Citra Distributor',
      assetDesc: 'Truk Pendingin (Isotta Trailer)',
      status: 'ACTIVE',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      rentalRate: 25000000,
      depositAmount: 75000000,
      billingCycle: 'MONTHLY',
      notes: 'Sewa truk pendingin untuk distribusi'
    },
    {
      contractNo: 'RNT-2024-003',
      customer: customers[2]?.name || 'Kopitiam Sahabat Group',
      assetDesc: 'Oven Roti Rotary Listrik Kapasitas Besar',
      status: 'ACTIVE',
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      rentalRate: 8500000,
      depositAmount: 25500000,
      billingCycle: 'MONTHLY',
      notes: 'Sewa oven untuk produksi roti'
    },
    {
      contractNo: 'RNT-2024-004',
      customer: customers[3]?.name || 'Minimarket Nusantara',
      assetDesc: 'Bangunan Gudang Bahan Baku Kavling B',
      status: 'ACTIVE',
      startDate: '2024-02-01',
      endDate: '2026-01-31',
      rentalRate: 50000000,
      depositAmount: 150000000,
      billingCycle: 'MONTHLY',
      notes: 'Sewa gudang untuk storage'
    },
    {
      contractNo: 'RNT-2024-005',
      customer: customers[4]?.name || 'Koperasi Karyawan Astra',
      assetDesc: null,
      status: 'COMPLETED',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      rentalRate: 12000000,
      depositAmount: 36000000,
      billingCycle: 'MONTHLY',
      notes: 'Kontrak selesai'
    },
    {
      contractNo: 'RNT-2024-006',
      customer: customers[5]?.name || 'Supermarket Makmur Jaya',
      assetDesc: 'Mesin Giling Kopi Industri (Roaster)',
      status: 'TERMINATED',
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      rentalRate: 15000000,
      depositAmount: 45000000,
      billingCycle: 'MONTHLY',
      notes: 'Kontrak diakhiri sebelum masa berlaku'
    }
  ];

  for (const c of contracts) {
    let customerId = null;
    const custMatch = customers.find(x => x.name === c.customer);
    if (custMatch) {
      customerId = custMatch.id;
    } else if (customers.length > 0) {
      customerId = customers[0].id;
      c.customer = customers[0].name;
    }

    if (!customerId) {
      console.log(`Skipping ${c.contractNo} - no customer`);
      continue;
    }

    try {
      await client.query(
        `INSERT INTO "RentalContract" (
          "id", "tenantId", "contractNo", "customerId", "assetDescription",
          "status", "startDate", "endDate", "rentalRate", "depositAmount",
          "billingCycle", "notes", "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
        ON CONFLICT ("tenantId", "contractNo") DO UPDATE SET
          "status" = EXCLUDED."status",
          "rentalRate" = EXCLUDED."rentalRate"
        `,
        [
          crypto.randomUUID(),
          tenantId,
          c.contractNo,
          customerId,
          c.assetDesc,
          c.status,
          c.startDate,
          c.endDate,
          c.rentalRate,
          c.depositAmount,
          c.billingCycle,
          c.notes
        ]
      );
      console.log(`Seeded: ${c.contractNo} - ${c.customer}`);
    } catch (e) {
      console.error(`Error seeding ${c.contractNo}:`, e.message);
    }
  }

  console.log('Rental contracts seeding complete!');
  await client.end();
}

main().catch(console.error);