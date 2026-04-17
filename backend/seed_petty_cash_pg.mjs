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

  console.log(`Seeding Petty Cash Replenishments & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.pettyCash.read',
    'finance.pettyCash.create',
    'finance.pettyCash.approve',
    'finance.pettyCash.delete'
  ];

  for (const key of perms) {
     const pId = crypto.randomUUID();
     await client.query(`INSERT INTO "Permission" (id, key, description, "createdAt") VALUES ($1, $2, $3, NOW()) ON CONFLICT (key) DO NOTHING`, [pId, key, 'Perm for ' + key]);
  }

  const roleRes = await client.query('SELECT id FROM "Role"');
  for (const r of roleRes.rows) {
     for (const key of perms) {
       const prps = await client.query('SELECT id FROM "Permission" WHERE key = $1', [key]);
       if (prps.rows.length > 0) {
          try {
            await client.query(`INSERT INTO "RolePermission" ("roleId", "permissionId") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [r.id, prps.rows[0].id]);
          } catch(e) {}
       }
     }
  }
  console.log('✅ Permissions injected to ALL ROLES!');

  // 2. SEED PETTY CASH
  const caRes = await client.query('SELECT "id", "accountNo", "name" FROM "CashAccount" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
  let cashAccounts = caRes.rows;

  if (cashAccounts.length === 0) {
      console.log('No Cash Accounts found. Creating a default Petty Cash account...');
      const pcaId = crypto.randomUUID();
      await client.query(
        `INSERT INTO "CashAccount" ("id", "tenantId", "accountType", "name", "accountNo", "balance", "isActive", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
        [pcaId, tenantId, 'CASH', 'Kas Kecil Cabang Operasional', 'CASH-001', 50000000, true]
      );
      cashAccounts = [{ id: pcaId, accountNo: 'CASH-001', name: 'Kas Kecil Cabang Operasional' }];
  }

  // ERP F&B Petty Cash Templates
  const templates = [
      { notes: "Reimburse Uang Makan SPV Produksi Shift Malam Tgl 12-14 Apr", min: 150000, max: 450000 },
      { notes: "Beli ATK Pabrik & Fotocopy Dokumen QA", min: 50000, max: 250000 },
      { notes: "Bayar Kuli Panggul Ekstra Bongkar Muat Tepung", min: 300000, max: 800000 },
      { notes: "Klaim Bensin Motor Kanvaser Area Jaktim (Bpk Rudi)", min: 100000, max: 350000 },
      { notes: "Iuran Dadakan Sampah Regional Kawasan Industri", min: 50000, max: 150000 },
      { notes: "Pembelian Galon Air Minum Karyawan Gudang Jadi", min: 60000, max: 200000 },
      { notes: "Biaya Tol & Parkir Kurir Keliling Cikarang", min: 100000, max: 300000 },
      { notes: "Reimburse Takjil Ramadhan Operator Pabrik", min: 250000, max: 750000 },
      { notes: "Pembelian Tester Wadah Bahan Kimia Laboratorium", min: 150000, max: 450000 },
      { notes: "Servis AC Ruangan R&D Darurat", min: 400000, max: 950000 }
  ];

  for (let i = 0; i < 40; i++) {
        const template = templates[i % templates.length];
        const amount = Math.floor(Math.random() * ((template.max - template.min) / 5000)) * 5000 + template.min;
        const ca = cashAccounts[Math.floor(Math.random() * cashAccounts.length)];
        
        const replId = crypto.randomUUID();
        const requestNo = `PCR-${String(1001 + i).padStart(4, '0')}`;
        const refNo = `BON-${Math.floor(Math.random() * 9000) + 1000}/IV/26`;

        const day = String((i % 28) + 1).padStart(2, '0');
        const date = `2026-04-${day}`;
        let status = 'APPROVED';
        if (i % 5 === 0) status = 'PENDING';
        if (i % 13 === 0) status = 'REJECTED';

        try {
            await client.query(
                `INSERT INTO "PettyCashReplenishment" ("id", "tenantId", "cashAccountId", "requestNo", "requestDate", "referenceNo", "amount", "status", "notes", "createdAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) ON CONFLICT ("tenantId", "requestNo") DO NOTHING`,
                [replId, tenantId, ca.id, requestNo, date, refNo, amount, status, template.notes]
            );
            console.log(`✅ Seeded Petty Cash Replenishment: ${requestNo} | ${refNo}`);
        } catch (e) {
            console.error(`Failed ${requestNo}:`, e.message);
        }
    }

  await client.end();
}

main().catch(console.error);
