import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// Realistic F&B company bank accounts across major Indonesian banks
const BANK_ACCOUNTS = [
  {
    accountNo: '1234-5678-901',
    name: 'Rekening Operasional Utama',
    bankName: 'BCA',
    accountType: 'CHECKING',
    balance: 4_850_000_000,
  },
  {
    accountNo: '0987-6543-210',
    name: 'Rekening Gaji & THR Karyawan',
    bankName: 'BCA',
    accountType: 'PAYROLL',
    balance: 1_200_000_000,
  },
  {
    accountNo: '1400-2888-555',
    name: 'Rekening Penerimaan Penjualan',
    bankName: 'Mandiri',
    accountType: 'CHECKING',
    balance: 3_175_500_000,
  },
  {
    accountNo: '1400-9900-771',
    name: 'Rekening Investasi & Deposito',
    bankName: 'Mandiri',
    accountType: 'SAVINGS',
    balance: 10_000_000_000,
  },
  {
    accountNo: '0111-8877-343',
    name: 'Rekening BNI Pembelian Bahan Baku',
    bankName: 'BNI',
    accountType: 'CHECKING',
    balance: 980_000_000,
  },
  {
    accountNo: '0123-9988-442',
    name: 'Rekening BRI Ekspor & Luar Negeri',
    bankName: 'BRI',
    accountType: 'CHECKING',
    balance: 2_340_000_000,
  },
  {
    accountNo: '8888-7000-123',
    name: 'Kas Kecil Kantor Pusat (Petty Cash)',
    bankName: 'BSI',
    accountType: 'PETTY_CASH',
    balance: 25_000_000,
  },
];

// Generate realistic F&B transactions for a bank account
function generateTransactions(accountId, tenantId, bankName) {
  const txns = [];
  const now = new Date();

  const templates = {
    BCA: [
      { type: 'CREDIT', desc: 'Transfer Masuk - Distributor Maju Jaya Jakarta', range: [50_000_000, 500_000_000] },
      { type: 'CREDIT', desc: 'Pembayaran INV-2026/Alfamart', range: [100_000_000, 800_000_000] },
      { type: 'DEBIT', desc: 'Pembelian Tepung Terigu PT Bogasari', range: [-150_000_000, -50_000_000] },
      { type: 'DEBIT', desc: 'Biaya Listrik Pabrik PT PLN', range: [-45_000_000, -25_000_000] },
      { type: 'DEBIT', desc: 'Pembayaran Gaji Karyawan', range: [-350_000_000, -200_000_000] },
      { type: 'CREDIT', desc: 'Pembayaran Indomaret - Tagihan Bulanan', range: [200_000_000, 600_000_000] },
    ],
    Mandiri: [
      { type: 'CREDIT', desc: 'Hasil Penjualan Bakery Online - Shopee', range: [25_000_000, 120_000_000] },
      { type: 'CREDIT', desc: 'Piutang Cair - Hypermart Surabaya', range: [80_000_000, 300_000_000] },
      { type: 'DEBIT', desc: 'Bayar Supplier Kemasan PT Indopack', range: [-75_000_000, -30_000_000] },
      { type: 'DEBIT', desc: 'Sewa Gudang Logistik Cakung', range: [-30_000_000, -15_000_000] },
      { type: 'DEBIT', desc: 'Biaya Transport & Ekspedisi Armada', range: [-20_000_000, -8_000_000] },
    ],
    BNI: [
      { type: 'DEBIT', desc: 'Bayar PO Bahan Baku - PT Wilmar Indonesia', range: [-200_000_000, -80_000_000] },
      { type: 'DEBIT', desc: 'Bayar PPN & PPh ke DJP', range: [-120_000_000, -40_000_000] },
      { type: 'CREDIT', desc: 'Retur Lebih Bayar Pajak KPP', range: [10_000_000, 50_000_000] },
    ],
    BRI: [
      { type: 'CREDIT', desc: 'Ekspor ke Malaysia - L/C BRI', range: [300_000_000, 900_000_000] },
      { type: 'DEBIT', desc: 'Bea Masuk Impor Flavoring', range: [-50_000_000, -15_000_000] },
    ],
    BSI: [
      { type: 'DEBIT', desc: 'Pengeluaran Petty Cash ATK & Kebutuhan Kantor', range: [-5_000_000, -500_000] },
      { type: 'DEBIT', desc: 'Biaya Tamu & Representasi Direksi', range: [-3_000_000, -1_000_000] },
      { type: 'CREDIT', desc: 'Top-Up Kas Kecil dari Rekening Utama', range: [10_000_000, 5_000_000] },
    ],
  };

  const pool = templates[bankName] || templates['BCA'];

  // Generate 15 transactions over last 90 days
  for (let i = 0; i < 15; i++) {
    const tmpl = pool[Math.floor(Math.random() * pool.length)];
    const daysAgo = Math.floor(Math.random() * 90);
    const transDate = new Date(now);
    transDate.setDate(transDate.getDate() - daysAgo);

    const range = tmpl.range;
    const amount = range[0] > 0
      ? Math.floor(Math.random() * (range[1] - range[0]) + range[0])
      : Math.floor(Math.random() * (range[0] - range[1]) + range[1]);

    const ref = `TXN-${bankName.toUpperCase().slice(0,3)}-${String(i + 1).padStart(4, '0')}`;
    txns.push({
      id: crypto.randomUUID(),
      tenantId,
      bankAccountId: accountId,
      transDate: transDate.toISOString(),
      transType: amount >= 0 ? 'CREDIT' : 'DEBIT',
      description: tmpl.desc,
      amount,
      reference: ref,
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

  console.log(`Seeding Bank Accounts & Transactions for tenant: ${tenantId}`);

  // 1. Inject permissions
  const allPerms = [
    'finance.bank.read', 'finance.bank.create', 'finance.bank.update',
    'finance.bank.transaction', 'finance.bank.delete',
  ];
  for (const key of allPerms) {
    await client.query(
      `INSERT INTO "Permission" (id, key, description, "createdAt") VALUES ($1, $2, $3, NOW()) ON CONFLICT (key) DO NOTHING`,
      [crypto.randomUUID(), key, key]
    );
  }
  const roleRes = await client.query('SELECT id FROM "Role"');
  for (const r of roleRes.rows) {
    for (const key of allPerms) {
      const p = await client.query('SELECT id FROM "Permission" WHERE key = $1', [key]);
      if (p.rows.length > 0) {
        try { await client.query(`INSERT INTO "RolePermission" ("roleId","permissionId") VALUES ($1,$2) ON CONFLICT DO NOTHING`, [r.id, p.rows[0].id]); } catch (e) {}
      }
    }
  }
  console.log('✅ Permissions injected!');

  // 2. Seed bank accounts + transactions
  let acctInserted = 0, txnInserted = 0;
  for (const acct of BANK_ACCOUNTS) {
    const exists = await client.query('SELECT id FROM "BankAccount" WHERE "tenantId"=$1 AND "accountNo"=$2', [tenantId, acct.accountNo]);
    let accountId;
    if (exists.rows.length > 0) {
      accountId = exists.rows[0].id;
      console.log(`  skip account: ${acct.accountNo} (${acct.bankName})`);
    } else {
      accountId = crypto.randomUUID();
      await client.query(
        `INSERT INTO "BankAccount" ("id","tenantId","accountNo","name","bankName","accountType","balance","isActive","createdAt","updatedAt")
         VALUES ($1,$2,$3,$4,$5,$6,$7,true,NOW(),NOW())`,
        [accountId, tenantId, acct.accountNo, acct.name, acct.bankName, acct.accountType, acct.balance]
      );
      console.log(`  ✓ Account: ${acct.accountNo} | ${acct.bankName} | ${acct.name} | Rp${acct.balance.toLocaleString('id-ID')}`);
      acctInserted++;
    }

    // Always seed transactions (check if any exist first)
    const txnCount = await client.query('SELECT count(*) as c FROM "BankTransaction" WHERE "bankAccountId"=$1', [accountId]);
    if (Number(txnCount.rows[0].c) < 5) {
      const txns = generateTransactions(accountId, tenantId, acct.bankName);
      for (const t of txns) {
        await client.query(
          `INSERT INTO "BankTransaction" ("id","tenantId","bankAccountId","transDate","transType","description","amount","reference","status","createdAt")
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
          [t.id, t.tenantId, t.bankAccountId, t.transDate, t.transType, t.description, t.amount, t.reference, t.status, t.createdAt]
        );
        txnInserted++;
      }
      console.log(`    → Seeded ${txns.length} transactions for ${acct.bankName}`);
    }
  }

  const totAcct = await client.query('SELECT count(*) as c FROM "BankAccount" WHERE "tenantId"=$1', [tenantId]);
  const totTxn = await client.query('SELECT count(*) as c FROM "BankTransaction" WHERE "tenantId"=$1', [tenantId]);
  console.log(`\n🎉 Done! Bank Accounts: ${totAcct.rows[0].c}, Transactions: ${totTxn.rows[0].c}`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
