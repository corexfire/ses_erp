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

  console.log(`Seeding Rental Maintenances for tenant: ${tenantId}`);

  const contractRes = await client.query(
    'SELECT id, "contractNo" FROM "RentalContract" WHERE "tenantId" = $1 AND "status" = \'ACTIVE\'',
    [tenantId]
  );
  const assetRes = await client.query(
    'SELECT id, "assetNo" FROM "FixedAsset" WHERE "tenantId" = $1 LIMIT 10',
    [tenantId]
  );
  
  const contracts = contractRes.rows;
  const assets = assetRes.rows;

  const maintenances = [
    {
      ticketNo: 'RWO-2024-001',
      type: 'PREVENTIVE',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      scheduledDate: '2024-01-15',
      completionDate: '2024-01-16',
      costAmount: 2500000,
      mechanicName: 'Budi Santoso',
      issueDescription: 'Service rutin mesin roaster - penggantian oli dan filter',
      resolutionNotes: 'Mesin beroperasi normal setelah service',
      contractIdx: 0,
      assetIdx: 0
    },
    {
      ticketNo: 'RWO-2024-002',
      type: 'REPAIR',
      priority: 'HIGH',
      status: 'COMPLETED',
      scheduledDate: '2024-02-10',
      completionDate: '2024-02-12',
      costAmount: 8500000,
      mechanicName: 'Ahmad Wijaya',
      issueDescription: 'Perbaikan sistem pendingin truk trailer',
      resolutionNotes: 'Kompressor diganti, refrigeran diisi ulang',
      contractIdx: 1,
      assetIdx: 1
    },
    {
      ticketNo: 'RWO-2024-003',
      type: 'INSPECTION',
      priority: 'LOW',
      status: 'IN_PROGRESS',
      scheduledDate: '2024-06-01',
      completionDate: null,
      costAmount: 500000,
      mechanicName: 'Dedi Kurniawan',
      issueDescription: 'Inspeksi berkala oven rotary',
      resolutionNotes: null,
      contractIdx: 2,
      assetIdx: 2
    },
    {
      ticketNo: 'RWO-2024-004',
      type: 'PREVENTIVE',
      priority: 'LOW',
      status: 'SCHEDULED',
      scheduledDate: '2024-07-15',
      completionDate: null,
      costAmount: 1500000,
      mechanicName: null,
      issueDescription: 'Service berkala gudang - pembersihan dan pengecekan',
      resolutionNotes: null,
      contractIdx: 3,
      assetIdx: null
    },
    {
      ticketNo: 'RWO-2024-005',
      type: 'REPAIR',
      priority: 'HIGH',
      status: 'COMPLETED',
      scheduledDate: '2024-03-20',
      completionDate: '2024-03-22',
      costAmount: 4500000,
      mechanicName: 'Hendra Gunawan',
      issueDescription: 'Perbaikan kebocoran pada sistem hidrolik',
      resolutionNotes: 'Selang hidrolik diganti, oli diperbarui',
      contractIdx: 0,
      assetIdx: 0
    },
    {
      ticketNo: 'RWO-2024-006',
      type: 'EMERGENCY',
      priority: 'CRITICAL',
      status: 'IN_PROGRESS',
      scheduledDate: '2024-06-10',
      completionDate: null,
      costAmount: 12000000,
      mechanicName: 'Rudi Hermawan',
      issueDescription: 'Mesin tidak mau menyala -疑似 kerusakan motor listrik',
      resolutionNotes: 'Masih dalam pengecekan',
      contractIdx: 0,
      assetIdx: 0
    },
    {
      ticketNo: 'RWO-2024-007',
      type: 'INSPECTION',
      priority: 'LOW',
      status: 'SCHEDULED',
      scheduledDate: '2024-07-01',
      completionDate: null,
      costAmount: 350000,
      mechanicName: null,
      issueDescription: 'Inspeksi awal bulanan',
      resolutionNotes: null,
      contractIdx: 1,
      assetIdx: 1
    },
    {
      ticketNo: 'RWO-2024-008',
      type: 'PREVENTIVE',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      scheduledDate: '2024-04-05',
      completionDate: '2024-04-06',
      costAmount: 1800000,
      mechanicName: 'Budi Santoso',
      issueDescription: 'Service berkala truk pendingin',
      resolutionNotes: 'Semua sistem berjalan normal',
      contractIdx: 1,
      assetIdx: 1
    }
  ];

  for (const m of maintenances) {
    const contractId = contracts[m.contractIdx]?.id || contracts[0]?.id;
    const assetId = m.assetIdx !== null && assets[m.assetIdx] ? assets[m.assetIdx].id : null;
    
    if (!contractId) {
      console.log(`Skipping ${m.ticketNo} - no contract`);
      continue;
    }

    try {
      await client.query(
        `INSERT INTO "RentalMaintenance" (
          "id", "tenantId", "ticketNo", "contractId", "assetId",
          "type", "priority", "status", "scheduledDate", "completionDate",
          "costAmount", "mechanicName", "issueDescription", "resolutionNotes",
          "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())
        ON CONFLICT ("tenantId", "ticketNo") DO UPDATE SET
          "status" = EXCLUDED."status",
          "costAmount" = EXCLUDED."costAmount"
        `,
        [
          crypto.randomUUID(),
          tenantId,
          m.ticketNo,
          contractId,
          assetId,
          m.type,
          m.priority,
          m.status,
          m.scheduledDate,
          m.completionDate,
          m.costAmount,
          m.mechanicName,
          m.issueDescription,
          m.resolutionNotes
        ]
      );
      console.log(`Seeded: ${m.ticketNo} - ${m.status}`);
    } catch (e) {
      console.error(`Error seeding ${m.ticketNo}:`, e.message);
    }
  }

  console.log('Rental maintenance seeding complete!');
  await client.end();
}

main().catch(console.error);