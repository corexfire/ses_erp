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

  console.log(`Seeding EXTRA General Journals for tenant: ${tenantId}`);

  const periodRes = await client.query('SELECT "id" FROM "AccountingPeriod" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
  let periods = periodRes.rows;

  const ccRes = await client.query('SELECT "id" FROM "CostCenter" WHERE "tenantId" = $1 LIMIT 10', [tenantId]);
  let costCenters = ccRes.rows;

  if (periods.length === 0) return;

  const templates = [
      { type: "ACCRUAL", desc: "Pencadangan Beban Gaji & THR Karyawan", debitAccount: "6120-100", creditAccount: "2120-100", min: 50000000, max: 200000000 },
      { type: "DEPRECIATION", desc: "Penyusutan Mesin Ekstraksi & Boiler", debitAccount: "6500-200", creditAccount: "1600-201", min: 10000000, max: 40000000 },
      { type: "ADJUSTMENT", desc: "Penyesuaian Stok Gudang Barang Jadi", debitAccount: "5100-300", creditAccount: "1400-300", min: 2000000, max: 15000000 },
      { type: "RECLASS", desc: "Reklasifikasi Biaya Pemasaran Jabar", debitAccount: "6300-100", creditAccount: "6300-101", min: 8000000, max: 35000000 },
      { type: "GENERAL", desc: "Pembayaran Premi Asuransi Gudang", debitAccount: "1250-100", creditAccount: "1110-105", min: 12000000, max: 80000000 },
      { type: "ADJUSTMENT", desc: "Koreksi Retur Pembelian Bahan Baku Tepung", debitAccount: "2110-100", creditAccount: "1300-100", min: 5000000, max: 25000000 },
      { type: "ACCRUAL", desc: "Akrual Beban Bunga Bank BCA", debitAccount: "6800-100", creditAccount: "2130-100", min: 1000000, max: 5000000 },
      { type: "GENERAL", desc: "Setoran Kas Kecil Pabrik Utama", debitAccount: "1110-100", creditAccount: "1110-105", min: 3000000, max: 15000000 }
  ];

  for (let i = 0; i < 35; i++) {
      const template = templates[i % templates.length];
      const amount = Math.floor(Math.random() * (template.max - template.min) + template.min);
      
      const periodId = periods[i % periods.length].id;
      const ccId = costCenters.length > 0 ? costCenters[i % costCenters.length].id : null;
      
      const headerId = crypto.randomUUID();
      const entryNo = `JRN-2026-${String(200+i).padStart(4,'0')}`;
      const refNo = `${template.type.substring(0,3)}-${String(400+i).padStart(4,'0')}`;
      
      const day = String((i % 28) + 1).padStart(2, '0');
      const date = `2026-04-${day}`;

      try {
         await client.query(
           `INSERT INTO "JournalEntry" ("id", "tenantId", "entryNo", "entryDate", "description", "status", "accountingPeriodId", "totalDebit", "totalCredit", "referenceNo", "journalType", "updatedAt") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW()) ON CONFLICT ("tenantId", "entryNo") DO NOTHING`,
           [headerId, tenantId, entryNo, date, `${template.desc} #${i+1}`, "POSTED", periodId, amount, amount, refNo, template.type]
         );
         
         const checkHdr = await client.query('SELECT id FROM "JournalEntry" WHERE "tenantId" = $1 AND "entryNo" = $2', [tenantId, entryNo]);
         if (checkHdr.rows.length === 0) continue;
         const finalHeaderId = checkHdr.rows[0].id;

         // Line 1: Debit
         await client.query(
             `INSERT INTO "JournalEntryLine" ("id", "tenantId", "journalEntryId", "lineNo", "accountCode", "description", "debit", "credit", "costCenterId") 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
             [crypto.randomUUID(), tenantId, finalHeaderId, 1, template.debitAccount, `[DB] ${template.desc}`, amount, 0, ccId]
         );

         // Line 2: Credit
         await client.query(
             `INSERT INTO "JournalEntryLine" ("id", "tenantId", "journalEntryId", "lineNo", "accountCode", "description", "debit", "credit", "costCenterId") 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
             [crypto.randomUUID(), tenantId, finalHeaderId, 2, template.creditAccount, `[CR] ${template.desc}`, 0, amount, null]
         );

         console.log(`✅ Seeded Extra Journal: ${entryNo} | ${refNo}`);
      } catch(e) {}
  }

  await client.end();
}

main().catch(console.error);
