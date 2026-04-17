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
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding EXTRA Cost Center Allocations for tenant: ${tenantId}`);

  const periodRes = await client.query('SELECT "id" FROM "AccountingPeriod" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
  let periods = periodRes.rows;

  const ccRes = await client.query('SELECT "id", "code", "name" FROM "CostCenter" WHERE "tenantId" = $1 LIMIT 15', [tenantId]);
  let costCenters = ccRes.rows;

  if (periods.length === 0 || costCenters.length === 0) return;

  const baseAllocations = [
      { account: "6120-100", desc: "Alokasi Overhead Gaji Karyawan Borongan", min: 10000000, max: 25000000 },
      { account: "6210-200", desc: "Alokasi Biaya Listrik & Air PAM Pabrik", min: 5000000, max: 15000000 },
      { account: "6300-300", desc: "Alokasi Biaya Pemeliharaan Mesin Boiler", min: 2000000, max: 8000000 },
      { account: "6150-100", desc: "Alokasi Lembur Produksi Shift Malam", min: 3000000, max: 10000000 },
      { account: "6400-500", desc: "Alokasi Bahan Bakar Solar Genset Pabrik", min: 4000000, max: 12000000 },
      { account: "6500-100", desc: "Alokasi Beban Asuransi Tenaga Kerja", min: 1500000, max: 5000000 },
      { account: "6600-200", desc: "Alokasi Biaya Katering & Konsumsi QC", min: 2500000, max: 7000000 },
      { account: "6700-100", desc: "Alokasi Iuran Kebersihan Lingkungan", min: 500000, max: 2000000 },
      { account: "6800-400", desc: "Alokasi Beban ATK & Perlengkapan Admin Produksi", min: 1000000, max: 3500000 },
      { account: "6900-300", desc: "Alokasi Biaya Uji Mutu Laboratorium (SGS)", min: 5000000, max: 18000000 }
  ];

  for (let i = 0; i < 40; i++) {
      const template = baseAllocations[i % baseAllocations.length];
      const amount = Math.floor(Math.random() * (template.max - template.min) + template.min);
      
      const periodId = periods[Math.floor(Math.random() * periods.length)].id;
      const cc = costCenters[Math.floor(Math.random() * costCenters.length)];
      
      const allocId = crypto.randomUUID();
      const refNo = `ALLC-2026-${String(800+i).padStart(4,'0')}`;
      
      const descLine = `Distribusi [${cc.code}] ${template.desc} (Batch ${i+1})`;

      try {
         await client.query(
           `INSERT INTO "CostCenterAllocation" ("id", "tenantId", "periodId", "costCenterId", "accountCode", "allocatedAmount", "referenceNo", "description", "updatedAt") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
           [allocId, tenantId, periodId, cc.id, template.account, amount, refNo, descLine]
         );
         
         console.log(`✅ Seeded Extra Allocation: ${refNo}`);
      } catch(e) { console.error(e.message); }
  }

  await client.end();
}

main().catch(console.error);
