import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// F&B Company Cash Accounts (physical + digital cash)
const CASH_ACCOUNTS = [
  {
    accountNo: 'CASH-001',
    name: 'Kas Besar Kantor Pusat (Jakarta)',
    accountType: 'CASH',
    balance: 150_000_000,
  },
  {
    accountNo: 'CASH-002',
    name: 'Kas Kecil Produksi Pabrik Bekasi',
    accountType: 'PETTY_CASH',
    balance: 12_500_000,
  },
  {
    accountNo: 'CASH-003',
    name: 'Kas Operasional Gudang Cakung',
    accountType: 'PETTY_CASH',
    balance: 8_000_000,
  },
  {
    accountNo: 'CASH-004',
    name: 'Kas Cabang Surabaya',
    accountType: 'CASH',
    balance: 45_000_000,
  },
  {
    accountNo: 'CASH-005',
    name: 'Kas Cabang Bandung',
    accountType: 'CASH',
    balance: 22_000_000,
  },
  {
    accountNo: 'CASH-006',
    name: 'Kas Representasi & Entertainment Direksi',
    accountType: 'PETTY_CASH',
    balance: 5_000_000,
  },
  {
    accountNo: 'CASH-007',
    name: 'Dana Darurat / Emergency Fund',
    accountType: 'SAFE',
    balance: 500_000_000,
  },
];

// Petty Cash Replenishments
const REPLENISHMENTS = [
  { requestNo: 'PCR-2026/001', amount: 10_000_000, status: 'APPROVED', notes: 'Top-up rutin kas kecil pabrik Q1 2026' },
  { requestNo: 'PCR-2026/002', amount: 5_000_000, status: 'APPROVED', notes: 'Pengisian kas operasional gudang Cakung' },
  { requestNo: 'PCR-2026/003', amount: 15_000_000, status: 'PENDING', notes: 'Permintaan tambahan kas aktifitas marketing event' },
  { requestNo: 'PCR-2026/004', amount: 8_000_000, status: 'REJECTED', notes: 'Permintaan kas cabang Medan (ditolak — gunakan transfer bank)' },
];

// Generate realistic F&B cash transactions
function generateTransactions(accountId, tenantId, accountType) {
  const txns = [];
  const now = new Date();

  const pettyTemplates = [
    { type: 'DEBIT', descs: ['Pembelian ATK & Perlengkapan Kantor', 'Biaya Ongkos Kirim Dokumen Internal', 'Konsumsi Rapat Divisi Produksi', 'Biaya Parkir & Tol Dinas', 'Pembelian Alat Kebersihan Pabrik'] },
    { type: 'CREDIT', descs: ['Top-Up Dari Rekening Operasional (BCA)', 'Pengembalian Sisa Panjar Perjalanan Dinas', 'Reimbursement Biaya Karyawan Dikembalikan'] },
  ];

  const cashTemplates = [
    { type: 'CREDIT', descs: ['Penerimaan Tunai Penjualan Langsung HO', 'Setoran Tunai Dari Kasir Pabrik', 'Transfer Kas Antar Cabang', 'Penerimaan Hasil Penjualan Outlet Modern Trade'] },
    { type: 'DEBIT', descs: ['Pembayaran Gaji Harian Buruh Produksi', 'Pembelian Bahan Bakar Armada', 'Biaya Utilitas Gas Pabrik (Tunai)', 'Pengeluaran Operasional Tidak Terduga', 'Penyetoran Kas ke Rekening BCA'] },
  ];

  const templates = accountType === 'PETTY_CASH' ? pettyTemplates : cashTemplates;
  const count = accountType === 'PETTY_CASH' ? 10 : 15;

  for (let i = 0; i < count; i++) {
    const pool = templates[Math.floor(Math.random() * templates.length)];
    const desc = pool.descs[Math.floor(Math.random() * pool.descs.length)];
    const daysAgo = Math.floor(Math.random() * 90);
    const transDate = new Date(now);
    transDate.setDate(transDate.getDate() - daysAgo);

    const isCredit = pool.type === 'CREDIT';
    const minAmt = accountType === 'PETTY_CASH' ? 100_000 : 1_000_000;
    const maxAmt = accountType === 'PETTY_CASH' ? 5_000_000 : 50_000_000;
    const rawAmt = Math.floor(Math.random() * (maxAmt - minAmt) + minAmt);
    const amount = isCredit ? rawAmt : -rawAmt;

    txns.push({
      id: crypto.randomUUID(),
      tenantId,
      cashAccountId: accountId,
      transDate: transDate.toISOString(),
      transType: isCredit ? 'CREDIT' : 'DEBIT',
      description: desc,
      amount,
      reference: `CTX-${String(i + 1).padStart(4, '0')}`,
      status: 'POSTED',
      createdAt: transDate.toISOString(),
    });
  }
  return txns;
}

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Cash Accounts & Transactions for tenant: ${tenantId}`);

  // 1. Permissions
  const allPerms = [
    'finance.cash.read', 'finance.cash.create', 'finance.cash.update',
    'finance.cash.transaction', 'finance.cash.replenish',
  ];
  for (const key of allPerms) {
    await client.query(
      `INSERT INTO "Permission" (id, key, description, "createdAt") VALUES ($1,$2,$3,NOW()) ON CONFLICT (key) DO NOTHING`,
      [crypto.randomUUID(), key, key]
    );
  }
  const roleRes = await client.query('SELECT id FROM "Role"');
  for (const r of roleRes.rows) {
    for (const key of allPerms) {
      const p = await client.query('SELECT id FROM "Permission" WHERE key=$1', [key]);
      if (p.rows.length > 0) {
        try { await client.query(`INSERT INTO "RolePermission" ("roleId","permissionId") VALUES ($1,$2) ON CONFLICT DO NOTHING`, [r.id, p.rows[0].id]); } catch (e) {}
      }
    }
  }
  console.log('✅ Permissions injected!');

  // 2. Cash Accounts + Transactions
  let acctInserted = 0, txnInserted = 0;
  const acctIds = [];
  for (const acct of CASH_ACCOUNTS) {
    const exists = await client.query('SELECT id FROM "CashAccount" WHERE "tenantId"=$1 AND "accountNo"=$2', [tenantId, acct.accountNo]);
    let accountId;
    if (exists.rows.length > 0) {
      accountId = exists.rows[0].id;
      console.log(`  skip: ${acct.accountNo}`);
    } else {
      accountId = crypto.randomUUID();
      await client.query(
        `INSERT INTO "CashAccount" ("id","tenantId","accountNo","name","accountType","balance","isActive","createdAt","updatedAt")
         VALUES ($1,$2,$3,$4,$5,$6,true,NOW(),NOW())`,
        [accountId, tenantId, acct.accountNo, acct.name, acct.accountType, acct.balance]
      );
      console.log(`  ✓ ${acct.accountNo} | ${acct.accountType} | ${acct.name} | Rp${acct.balance.toLocaleString('id-ID')}`);
      acctInserted++;
    }
    acctIds.push({ id: accountId, type: acct.accountType });

    // Transactions
    const txnCount = await client.query('SELECT count(*) as c FROM "CashTransaction" WHERE "cashAccountId"=$1', [accountId]);
    if (Number(txnCount.rows[0].c) < 5) {
      const txns = generateTransactions(accountId, tenantId, acct.accountType);
      for (const t of txns) {
        await client.query(
          `INSERT INTO "CashTransaction" ("id","tenantId","cashAccountId","transDate","transType","description","amount","reference","status","createdAt")
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
          [t.id, t.tenantId, t.cashAccountId, t.transDate, t.transType, t.description, t.amount, t.reference, t.status, t.createdAt]
        );
        txnInserted++;
      }
      console.log(`    → ${txns.length} transactions`);
    }
  }

  // 3. Petty Cash Replenishments
  const pettyAcctId = acctIds.find(a => a.type === 'PETTY_CASH')?.id;
  if (pettyAcctId) {
    for (const rep of REPLENISHMENTS) {
      const exists = await client.query('SELECT id FROM "PettyCashReplenishment" WHERE "tenantId"=$1 AND "requestNo"=$2', [tenantId, rep.requestNo]);
      if (exists.rows.length > 0) { console.log(`  skip replenishment: ${rep.requestNo}`); continue; }
      const reqDate = new Date();
      reqDate.setDate(reqDate.getDate() - Math.floor(Math.random() * 60));
      await client.query(
        `INSERT INTO "PettyCashReplenishment" ("id","tenantId","cashAccountId","requestNo","requestDate","amount","status","notes","createdAt")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())`,
        [crypto.randomUUID(), tenantId, pettyAcctId, rep.requestNo, reqDate.toISOString(), rep.amount, rep.status, rep.notes]
      );
      console.log(`  ✓ Replenishment: ${rep.requestNo} | ${rep.status} | Rp${rep.amount.toLocaleString('id-ID')}`);
    }
  }

  const totAcct = await client.query('SELECT count(*) as c FROM "CashAccount" WHERE "tenantId"=$1', [tenantId]);
  const totTxn = await client.query('SELECT count(*) as c FROM "CashTransaction" WHERE "tenantId"=$1', [tenantId]);
  console.log(`\n🎉 Done! Cash Accounts: ${totAcct.rows[0].c}, Transactions: ${totTxn.rows[0].c}`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
