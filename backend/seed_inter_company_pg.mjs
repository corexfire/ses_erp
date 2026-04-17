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

  console.log(`Seeding EXTRA Inter-Company (Branch) Transactions for tenant: ${tenantId}`);

  const branchRes = await client.query('SELECT "id", "code", "name" FROM "Branch" WHERE "tenantId" = $1', [tenantId]);
  let branches = branchRes.rows;

  if (branches.length < 2) {
      console.log("Not enough branches to do inter-branch transfers.");
      return;
  }

  const templates = [
      { type: "FUND_TRANSFER", desc: "Mutasi Modal Kerja ke Cabang", min: 50000000, max: 200000000 },
      { type: "INVENTORY_TRANSFER", desc: "Transfer Biaya Stok Barang Jadi", min: 10000000, max: 50000000 },
      { type: "COST_ALLOCATION", desc: "Pembebanan Overhead Kantor Pusat", min: 5000000, max: 15000000 },
      { type: "FUND_TRANSFER", desc: "Setoran Penerimaan Kas Cabang ke Pusat", min: 80000000, max: 250000000 },
      { type: "COST_ALLOCATION", desc: "Penagihan Silang Biaya Pemasaran Jabar", min: 8000000, max: 35000000 },
      { type: "PROFIT_SHARE", desc: "Pembagian Margin Laba Cabang Q1", min: 15000000, max: 60000000 }
  ];

  for (let i = 0; i < 40; i++) {
      const template = templates[i % templates.length];
      const amount = Math.floor(Math.random() * (template.max - template.min) + template.min);
      
      let fromB = branches[Math.floor(Math.random() * branches.length)];
      let toB = branches[Math.floor(Math.random() * branches.length)];
      
      // Ensure they are different
      while (fromB.id === toB.id) {
          toB = branches[Math.floor(Math.random() * branches.length)];
      }

      const transId = crypto.randomUUID();
      const refNo = `IC-${template.type.substring(0,3)}-2026-${String(800+i).padStart(4,'0')}`;
      const transNo = `ICT-${String(5000+i).padStart(5,'0')}`;
      const descLine = `[${fromB.code} -> ${toB.code}] ${template.desc}`;

      const day = String((i % 28) + 1).padStart(2, '0');
      const date = `2026-04-${day}`;

      try {
         await client.query(
           `INSERT INTO "InterCompanyTransaction" ("id", "tenantId", "transNo", "transDate", "fromCompanyId", "toCompanyId", "description", "referenceNo", "transactionType", "amount", "status", "createdAt") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW()) ON CONFLICT ("tenantId", "transNo") DO NOTHING`,
           [transId, tenantId, transNo, date, fromB.id, toB.id, descLine, refNo, template.type, amount, (i % 3 === 0 ? 'PENDING' : 'APPROVED')]
         );
         
         console.log(`✅ Seeded Inter-Company: ${transNo} | ${refNo}`);
      } catch(e) {
          console.error(`Failed ${refNo}:`, e.message);
      }
  }

  await client.end();
}

main().catch(console.error);
