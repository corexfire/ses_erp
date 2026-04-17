import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// Full F&B Manufacturing COA based on PSAK (Indonesian GAAP) standards
const COA_STRUCTURE = [
  // ============================================================
  // 1. ASET (ASSET) - 1xxx
  // ============================================================
  { code: '1000', name: 'ASET', type: 'ASSET', isPosting: false, parentCode: null },
  { code: '1100', name: 'Aset Lancar', type: 'ASSET', isPosting: false, parentCode: '1000' },
  { code: '1101', name: 'Kas dan Setara Kas', type: 'ASSET', isPosting: false, parentCode: '1100' },
  { code: '1101.1', name: 'Kas Kecil (Petty Cash)', type: 'ASSET', isPosting: true, parentCode: '1101' },
  { code: '1101.2', name: 'Kas Bank BCA Operasional', type: 'ASSET', isPosting: true, parentCode: '1101' },
  { code: '1101.3', name: 'Kas Bank Mandiri Produksi', type: 'ASSET', isPosting: true, parentCode: '1101' },
  { code: '1101.4', name: 'Kas Bank BNI Penerimaan', type: 'ASSET', isPosting: true, parentCode: '1101' },
  { code: '1102', name: 'Piutang Usaha (AR)', type: 'ASSET', isPosting: false, parentCode: '1100' },
  { code: '1102.1', name: 'Piutang Distributor Regional', type: 'ASSET', isPosting: true, parentCode: '1102' },
  { code: '1102.2', name: 'Piutang Modern Trade / Retail', type: 'ASSET', isPosting: true, parentCode: '1102' },
  { code: '1102.9', name: 'Cadangan Piutang Tak Tertagih', type: 'ASSET', isPosting: true, parentCode: '1102' },
  { code: '1103', name: 'Persediaan', type: 'ASSET', isPosting: false, parentCode: '1100' },
  { code: '1103.1', name: 'Persediaan Bahan Baku', type: 'ASSET', isPosting: true, parentCode: '1103' },
  { code: '1103.2', name: 'Persediaan Barang Dalam Proses (WIP)', type: 'ASSET', isPosting: true, parentCode: '1103' },
  { code: '1103.3', name: 'Persediaan Barang Jadi (Finished Goods)', type: 'ASSET', isPosting: true, parentCode: '1103' },
  { code: '1103.4', name: 'Persediaan Bahan Kemasan & Packaging', type: 'ASSET', isPosting: true, parentCode: '1103' },
  { code: '1104', name: 'Pajak Dibayar Dimuka', type: 'ASSET', isPosting: false, parentCode: '1100' },
  { code: '1104.1', name: 'PPN Masukan', type: 'ASSET', isPosting: true, parentCode: '1104' },
  { code: '1104.2', name: 'PPh Pasal 22 Dibayar Dimuka', type: 'ASSET', isPosting: true, parentCode: '1104' },
  { code: '1105', name: 'Biaya Dibayar Dimuka', type: 'ASSET', isPosting: false, parentCode: '1100' },
  { code: '1105.1', name: 'Asuransi Dibayar Dimuka', type: 'ASSET', isPosting: true, parentCode: '1105' },
  { code: '1105.2', name: 'Sewa Gudang Dibayar Dimuka', type: 'ASSET', isPosting: true, parentCode: '1105' },
  { code: '1200', name: 'Aset Tetap', type: 'ASSET', isPosting: false, parentCode: '1000' },
  { code: '1201', name: 'Tanah', type: 'ASSET', isPosting: true, parentCode: '1200' },
  { code: '1202', name: 'Bangunan dan Gedung', type: 'ASSET', isPosting: true, parentCode: '1200' },
  { code: '1202.1', name: 'Akumulasi Penyusutan - Bangunan', type: 'ASSET', isPosting: true, parentCode: '1200' },
  { code: '1203', name: 'Mesin dan Peralatan Produksi', type: 'ASSET', isPosting: true, parentCode: '1200' },
  { code: '1203.1', name: 'Akumulasi Penyusutan - Mesin', type: 'ASSET', isPosting: true, parentCode: '1200' },
  { code: '1204', name: 'Kendaraan Operasional', type: 'ASSET', isPosting: true, parentCode: '1200' },
  { code: '1204.1', name: 'Akumulasi Penyusutan - Kendaraan', type: 'ASSET', isPosting: true, parentCode: '1200' },
  { code: '1205', name: 'Peralatan IT / Kantor', type: 'ASSET', isPosting: true, parentCode: '1200' },
  { code: '1205.1', name: 'Akumulasi Penyusutan - Peralatan IT', type: 'ASSET', isPosting: true, parentCode: '1200' },

  // ============================================================
  // 2. LIABILITAS (LIABILITY) - 2xxx
  // ============================================================
  { code: '2000', name: 'LIABILITAS', type: 'LIABILITY', isPosting: false, parentCode: null },
  { code: '2100', name: 'Liabilitas Jangka Pendek', type: 'LIABILITY', isPosting: false, parentCode: '2000' },
  { code: '2101', name: 'Hutang Usaha (AP)', type: 'LIABILITY', isPosting: false, parentCode: '2100' },
  { code: '2101.1', name: 'Hutang Supplier Bahan Baku', type: 'LIABILITY', isPosting: true, parentCode: '2101' },
  { code: '2101.2', name: 'Hutang Supplier Kemasan & Packaging', type: 'LIABILITY', isPosting: true, parentCode: '2101' },
  { code: '2102', name: 'Hutang Pajak', type: 'LIABILITY', isPosting: false, parentCode: '2100' },
  { code: '2102.1', name: 'PPN Keluaran', type: 'LIABILITY', isPosting: true, parentCode: '2102' },
  { code: '2102.2', name: 'PPh Pasal 21 Terutang', type: 'LIABILITY', isPosting: true, parentCode: '2102' },
  { code: '2102.3', name: 'PPh Pasal 25 Terutang', type: 'LIABILITY', isPosting: true, parentCode: '2102' },
  { code: '2103', name: 'Beban Akrual (Accrued Expenses)', type: 'LIABILITY', isPosting: false, parentCode: '2100' },
  { code: '2103.1', name: 'Akrual Gaji dan Tunjangan', type: 'LIABILITY', isPosting: true, parentCode: '2103' },
  { code: '2103.2', name: 'Akrual Biaya Utilitas', type: 'LIABILITY', isPosting: true, parentCode: '2103' },
  { code: '2200', name: 'Liabilitas Jangka Panjang', type: 'LIABILITY', isPosting: false, parentCode: '2000' },
  { code: '2201', name: 'Pinjaman Bank Jangka Panjang', type: 'LIABILITY', isPosting: true, parentCode: '2200' },
  { code: '2202', name: 'Obligasi Korporasi', type: 'LIABILITY', isPosting: true, parentCode: '2200' },

  // ============================================================
  // 3. EKUITAS (EQUITY) - 3xxx
  // ============================================================
  { code: '3000', name: 'EKUITAS', type: 'EQUITY', isPosting: false, parentCode: null },
  { code: '3100', name: 'Modal dan Ekuitas Pemegang Saham', type: 'EQUITY', isPosting: false, parentCode: '3000' },
  { code: '3101', name: 'Modal Disetor', type: 'EQUITY', isPosting: true, parentCode: '3100' },
  { code: '3102', name: 'Tambahan Modal Disetor (APIC)', type: 'EQUITY', isPosting: true, parentCode: '3100' },
  { code: '3201', name: 'Saldo Laba Ditahan (Retained Earnings)', type: 'EQUITY', isPosting: true, parentCode: '3000' },
  { code: '3202', name: 'Laba / Rugi Tahun Berjalan', type: 'EQUITY', isPosting: true, parentCode: '3000' },

  // ============================================================
  // 4. PENDAPATAN (INCOME) - 4xxx
  // ============================================================
  { code: '4000', name: 'PENDAPATAN USAHA', type: 'INCOME', isPosting: false, parentCode: null },
  { code: '4100', name: 'Penjualan Produk F&B', type: 'INCOME', isPosting: false, parentCode: '4000' },
  { code: '4101', name: 'Penjualan Produk Roti & Bakery', type: 'INCOME', isPosting: true, parentCode: '4100' },
  { code: '4102', name: 'Penjualan Produk Minuman (Beverage)', type: 'INCOME', isPosting: true, parentCode: '4100' },
  { code: '4103', name: 'Penjualan Produk Snack & Confectionery', type: 'INCOME', isPosting: true, parentCode: '4100' },
  { code: '4104', name: 'Pendapatan Catering & B2B Horeca', type: 'INCOME', isPosting: true, parentCode: '4100' },
  { code: '4200', name: 'Pendapatan Lain-Lain', type: 'INCOME', isPosting: false, parentCode: '4000' },
  { code: '4201', name: 'Pendapatan Bunga Bank', type: 'INCOME', isPosting: true, parentCode: '4200' },
  { code: '4202', name: 'Laba Penjualan Aset', type: 'INCOME', isPosting: true, parentCode: '4200' },
  { code: '4203', name: 'Subsidi Pemerintah / Grant', type: 'INCOME', isPosting: true, parentCode: '4200' },

  // ============================================================
  // 5. HPP - 5xxx
  // ============================================================
  { code: '5000', name: 'HARGA POKOK PENJUALAN (HPP)', type: 'EXPENSE', isPosting: false, parentCode: null },
  { code: '5100', name: 'Biaya Bahan Baku', type: 'EXPENSE', isPosting: false, parentCode: '5000' },
  { code: '5101', name: 'Bahan Baku Tepung & Gula', type: 'EXPENSE', isPosting: true, parentCode: '5100' },
  { code: '5102', name: 'Bahan Baku Lemak & Minyak Nabati', type: 'EXPENSE', isPosting: true, parentCode: '5100' },
  { code: '5103', name: 'Bahan Baku Rasa & Aroma (Flavoring)', type: 'EXPENSE', isPosting: true, parentCode: '5100' },
  { code: '5104', name: 'Kemasan Produk (Packaging Material)', type: 'EXPENSE', isPosting: true, parentCode: '5100' },
  { code: '5200', name: 'Biaya Tenaga Kerja Langsung', type: 'EXPENSE', isPosting: false, parentCode: '5000' },
  { code: '5201', name: 'Gaji Operator Mesin Produksi', type: 'EXPENSE', isPosting: true, parentCode: '5200' },
  { code: '5202', name: 'Upah Lembur & Shift Malam', type: 'EXPENSE', isPosting: true, parentCode: '5200' },
  { code: '5300', name: 'Biaya Overhead Pabrik', type: 'EXPENSE', isPosting: false, parentCode: '5000' },
  { code: '5301', name: 'Beban Utilitas Listrik Pabrik', type: 'EXPENSE', isPosting: true, parentCode: '5300' },
  { code: '5302', name: 'Beban Gas / Bahan Bakar Produksi', type: 'EXPENSE', isPosting: true, parentCode: '5300' },
  { code: '5303', name: 'Penyusutan Mesin dan Peralatan', type: 'EXPENSE', isPosting: true, parentCode: '5300' },
  { code: '5304', name: 'Pemeliharaan & Perbaikan Mesin', type: 'EXPENSE', isPosting: true, parentCode: '5300' },

  // ============================================================
  // 6. BIAYA OPERASIONAL - 6xxx
  // ============================================================
  { code: '6000', name: 'BIAYA OPERASIONAL', type: 'EXPENSE', isPosting: false, parentCode: null },
  { code: '6100', name: 'Biaya Penjualan & Distribusi', type: 'EXPENSE', isPosting: false, parentCode: '6000' },
  { code: '6101', name: 'Gaji Sales Representative', type: 'EXPENSE', isPosting: true, parentCode: '6100' },
  { code: '6102', name: 'Komisi Penjualan', type: 'EXPENSE', isPosting: true, parentCode: '6100' },
  { code: '6103', name: 'Biaya Pengiriman & Logistik', type: 'EXPENSE', isPosting: true, parentCode: '6100' },
  { code: '6104', name: 'Promosi & Iklan (Marketing)', type: 'EXPENSE', isPosting: true, parentCode: '6100' },
  { code: '6200', name: 'Biaya Administrasi Umum', type: 'EXPENSE', isPosting: false, parentCode: '6000' },
  { code: '6201', name: 'Gaji Karyawan Kantor & Manajemen', type: 'EXPENSE', isPosting: true, parentCode: '6200' },
  { code: '6202', name: 'Tunjangan dan BPJS Ketenagakerjaan', type: 'EXPENSE', isPosting: true, parentCode: '6200' },
  { code: '6203', name: 'Sewa Kantor & Operasional', type: 'EXPENSE', isPosting: true, parentCode: '6200' },
  { code: '6204', name: 'Perlengkapan ATK & Kantor', type: 'EXPENSE', isPosting: true, parentCode: '6200' },
  { code: '6205', name: 'Biaya Telekomunikasi & Internet', type: 'EXPENSE', isPosting: true, parentCode: '6200' },
  { code: '6206', name: 'Biaya Perjalanan Dinas', type: 'EXPENSE', isPosting: true, parentCode: '6200' },
  { code: '6207', name: 'Biaya Representasi & Jamuan', type: 'EXPENSE', isPosting: true, parentCode: '6200' },
  { code: '6208', name: 'Penyusutan Peralatan Kantor & IT', type: 'EXPENSE', isPosting: true, parentCode: '6200' },
  { code: '6300', name: 'Biaya Riset dan Pengembangan (R&D)', type: 'EXPENSE', isPosting: false, parentCode: '6000' },
  { code: '6301', name: 'Gaji Tim Riset Produk F&B', type: 'EXPENSE', isPosting: true, parentCode: '6300' },
  { code: '6302', name: 'Biaya Uji Lab & Sertifikasi BPOM', type: 'EXPENSE', isPosting: true, parentCode: '6300' },

  // ============================================================
  // 7. BIAYA KEUANGAN - 7xxx
  // ============================================================
  { code: '7000', name: 'BIAYA KEUANGAN & LAIN-LAIN', type: 'EXPENSE', isPosting: false, parentCode: null },
  { code: '7101', name: 'Beban Bunga Pinjaman Bank', type: 'EXPENSE', isPosting: true, parentCode: '7000' },
  { code: '7102', name: 'Beban Administrasi Bank', type: 'EXPENSE', isPosting: true, parentCode: '7000' },
  { code: '7103', name: 'Rugi Selisih Kurs (Exchange Loss)', type: 'EXPENSE', isPosting: true, parentCode: '7000' },
  { code: '7104', name: 'Rugi Penjualan Aset Tetap', type: 'EXPENSE', isPosting: true, parentCode: '7000' },
  { code: '7105', name: 'Sanksi dan Denda Pajak', type: 'EXPENSE', isPosting: true, parentCode: '7000' },
  { code: '7200', name: 'Pajak Penghasilan (PPh) Badan', type: 'EXPENSE', isPosting: true, parentCode: '7000' },
];

async function insertAccount(acct, parentId, tenantId) {
  const existing = await client.query('SELECT id FROM "CoaAccount" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, acct.code]);
  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }
  const id = crypto.randomUUID();
  await client.query(
    `INSERT INTO "CoaAccount" ("id", "tenantId", "code", "name", "type", "parentId", "isPosting", "isActive", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW(), NOW())`,
    [id, tenantId, acct.code, acct.name, acct.type, parentId, acct.isPosting]
  );
  return id;
}

async function main() {
  await client.connect();
  console.log('Connected to database.');

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) { console.log('No user found.'); return; }
  const tenantId = userRes.rows[0].tenantId;
  console.log(`Seeding Full F&B PSAK COA for tenant: ${tenantId}`);

  // 1. Inject Permissions
  const allPerms = [
    'finance.coa.read', 'finance.coa.create', 'finance.coa.update', 'finance.coa.delete',
    'core.coa.read', 'core.coa.create', 'core.coa.deactivate'
  ];
  for (const key of allPerms) {
    await client.query(`INSERT INTO "Permission" (id, key, description, "createdAt") VALUES ($1, $2, $3, NOW()) ON CONFLICT (key) DO NOTHING`, [crypto.randomUUID(), key, key]);
  }
  const roleRes = await client.query('SELECT id FROM "Role"');
  for (const r of roleRes.rows) {
    for (const key of allPerms) {
      const p = await client.query('SELECT id FROM "Permission" WHERE key = $1', [key]);
      if (p.rows.length > 0) {
        try { await client.query(`INSERT INTO "RolePermission" ("roleId", "permissionId") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [r.id, p.rows[0].id]); } catch(e) {}
      }
    }
  }
  console.log('✅ Permissions done!');

  // 2. Seed: first build a map for all insertions
  const codeToId = new Map();

  // two-pass: parents first then children sorted by level
  const byLevel = [...COA_STRUCTURE].sort((a, b) => {
    const aDepth = a.code.split('.').length + (a.code.includes('.') ? 10 : 0);
    const bDepth = b.code.split('.').length + (b.code.includes('.') ? 10 : 0);
    return aDepth - bDepth || a.code.localeCompare(b.code);
  });

  for (const acct of byLevel) {
    const parentId = acct.parentCode ? (codeToId.get(acct.parentCode) || null) : null;
    const id = await insertAccount(acct, parentId, tenantId);
    codeToId.set(acct.code, id);
    const marker = acct.isPosting ? '●' : '◎';
    console.log(`  ${marker} ${acct.code.padEnd(10)} ${acct.name}`);
  }

  const c = await client.query('SELECT count(*) as n FROM "CoaAccount" WHERE "tenantId" = $1', [tenantId]);
  console.log(`\n🎉 Done! Total COA accounts: ${c.rows[0].n}`);
  await client.end();
}

main().catch(e => { console.error(e); client.end(); });
