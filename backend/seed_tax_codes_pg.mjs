import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// Full Indonesian tax codes for F&B Manufacturing - PSAK & DJP compliant
const TAX_CODES = [
  // === PPN (Pajak Pertambahan Nilai) ===
  {
    code: 'PPN12', name: 'PPN 12% (Berlaku 2025)',
    rate: 12, effectiveDate: '2025-01-01', isActive: true,
    category: 'PPN', description: 'Tarif PPN standar berlaku sejak 1 Jan 2025 per PMK-131/2024'
  },
  {
    code: 'PPN11', name: 'PPN 11% (2022-2024)',
    rate: 11, effectiveDate: '2022-04-01', isActive: false,
    category: 'PPN', description: 'Tarif PPN lama yang berlaku 1 Apr 2022 s/d 31 Des 2024'
  },
  {
    code: 'PPN0', name: 'PPN 0% / Bebas',
    rate: 0, effectiveDate: '2022-04-01', isActive: true,
    category: 'PPN', description: 'Untuk ekspor barang/jasa dan transaksi tertentu yang dibebaskan'
  },
  {
    code: 'PPN-BKP-TERTENTU', name: 'PPN Barang Kena Pajak Tertentu (1.1%)',
    rate: 1.1, effectiveDate: '2025-01-01', isActive: true,
    category: 'PPN', description: 'DPP 11/12 dari harga jual untuk masa transisi PPN'
  },

  // === PPh Pasal 21 ===
  {
    code: 'PPH21-5', name: 'PPh Pasal 21 - Pegawai Tetap 5%',
    rate: 5, effectiveDate: '2024-01-01', isActive: true,
    category: 'PPh21', description: 'Penghasilan Kena Pajak s/d Rp60 juta/tahun'
  },
  {
    code: 'PPH21-15', name: 'PPh Pasal 21 - Pegawai Tetap 15%',
    rate: 15, effectiveDate: '2024-01-01', isActive: true,
    category: 'PPh21', description: 'PKP Rp60 juta s/d Rp250 juta/tahun (TER Tarif Efektif Rata-rata)'
  },
  {
    code: 'PPH21-25', name: 'PPh Pasal 21 - Tarif 25%',
    rate: 25, effectiveDate: '2024-01-01', isActive: true,
    category: 'PPh21', description: 'PKP Rp250 juta s/d Rp500 juta/tahun'
  },

  // === PPh Pasal 22 ===
  {
    code: 'PPH22-15', name: 'PPh Pasal 22 (1.5%)',
    rate: 1.5, effectiveDate: '2020-01-01', isActive: true,
    category: 'PPh22', description: 'Pembelian barang dari badan usaha industri oleh BUMN/Bendaharawan'
  },
  {
    code: 'PPH22-30', name: 'PPh Pasal 22 Tanpa NPWP (3%)',
    rate: 3, effectiveDate: '2020-01-01', isActive: true,
    category: 'PPh22', description: 'Vendor tidak memiliki NPWP, tarif 2x lipat (3% = 1.5% x 200%)'
  },

  // === PPh Pasal 23 ===
  {
    code: 'PPH23-2', name: 'PPh Pasal 23 - Jasa (2%)',
    rate: 2, effectiveDate: '2020-01-01', isActive: true,
    category: 'PPh23', description: 'Pemotongan atas jasa teknik, manajemen, konsultan, dan jasa lainnya'
  },
  {
    code: 'PPH23-15', name: 'PPh Pasal 23 - Dividen/Bunga/Royalti (15%)',
    rate: 15, effectiveDate: '2020-01-01', isActive: true,
    category: 'PPh23', description: 'Pemotongan atas dividen, bunga, dan royalti dari dalam negeri'
  },
  {
    code: 'PPH23-4', name: 'PPh Pasal 23 Tanpa NPWP (4%)',
    rate: 4, effectiveDate: '2020-01-01', isActive: true,
    category: 'PPh23', description: 'Tarif 2x untuk penerima jasa yang tidak ber-NPWP'
  },

  // === PPh Pasal 4 ayat 2 (Final) ===
  {
    code: 'PPH42-05', name: 'PPh Final 4(2) - Konstruksi (0.5%)',
    rate: 0.5, effectiveDate: '2020-01-01', isActive: true,
    category: 'PPh42', description: 'Jasa konstruksi sederhana yang memiliki sertifikat kompetensi'
  },
  {
    code: 'PPH42-10', name: 'PPh Final 4(2) - Sewa Bangunan (10%)',
    rate: 10, effectiveDate: '2020-01-01', isActive: true,
    category: 'PPh42', description: 'Penghasilan dari persewaan tanah dan/atau bangunan (Final)'
  },
  {
    code: 'PPH42-25', name: 'PPh Final 4(2) - Konstruksi Level Menengah (2.65%)',
    rate: 2.65, effectiveDate: '2022-01-01', isActive: true,
    category: 'PPh42', description: 'PP 9 Tahun 2022 - Jasa konstruksi oleh non-kualifikasi kecil'
  },

  // === PPh Badan (UMKM & Usaha Biasa) ===
  {
    code: 'PPH-BADAN-22', name: 'PPh Badan Tarif Normal (22%)',
    rate: 22, effectiveDate: '2022-01-01', isActive: true,
    category: 'PPh Badan', description: 'Tarif Pajak Penghasilan Badan umum per UU HPP'
  },
  {
    code: 'PPH-UMKM-05', name: 'PPh UMKM Final (0.5%)',
    rate: 0.5, effectiveDate: '2018-07-01', isActive: true,
    category: 'PPh Badan', description: 'PP 55/2022 - Omzet s/d Rp4,8 Miliar/tahun dikenakan tarif 0.5%'
  },

  // === Khusus F&B ===
  {
    code: 'CUKAI-MINUMAN', name: 'Cukai Minuman Mengandung Etanol (MMEA)',
    rate: 0, effectiveDate: '2020-01-01', isActive: false,
    category: 'Cukai', description: 'Tarif cukai khusus berdasarkan kadar etanol (referensi saja, tarif spesifik)'
  },
  {
    code: 'BEA-MASUK-5', name: 'Bea Masuk Impor Bahan Baku (5%)',
    rate: 5, effectiveDate: '2024-01-01', isActive: true,
    category: 'Bea Masuk', description: 'Bea masuk untuk imported raw materials: tepung gandum, lemak, dll'
  },
  {
    code: 'TAX-EXEMPT', name: 'Bebas Pajak (Tax Exempt)',
    rate: 0, effectiveDate: '2020-01-01', isActive: true,
    category: 'Lainnya', description: 'Transaksi dibebaskan dari pajak: ekspor, subsidi pemerintah'
  },
];

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Tax Codes for tenant: ${tenantId}`);

  // 1. Inject permissions
  const allPerms = [
    'finance.taxcode.read', 'finance.taxcode.create', 'finance.taxcode.update', 'finance.taxcode.delete',
    'core.tax.read', 'core.tax.create', 'core.tax.deactivate',
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
        try { await client.query(`INSERT INTO "RolePermission" ("roleId", "permissionId") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [r.id, p.rows[0].id]); } catch (e) {}
      }
    }
  }
  console.log('✅ Permissions injected!');

  // 2. Seed tax codes
  let inserted = 0, skipped = 0;
  for (const t of TAX_CODES) {
    const exists = await client.query('SELECT id FROM "TaxCode" WHERE "tenantId" = $1 AND code = $2', [tenantId, t.code]);
    if (exists.rows.length > 0) {
      console.log(`  skip: ${t.code}`);
      skipped++;
      continue;
    }
    await client.query(
      `INSERT INTO "TaxCode" ("id", "tenantId", "code", "name", "rate", "effectiveDate", "isActive", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
      [crypto.randomUUID(), tenantId, t.code, t.name, t.rate, new Date(t.effectiveDate), t.isActive]
    );
    console.log(`  ✓ ${t.code} | ${t.rate}% | ${t.name}`);
    inserted++;
  }

  const count = await client.query('SELECT count(*) as c FROM "TaxCode" WHERE "tenantId" = $1', [tenantId]);
  console.log(`\n🎉 Done! Inserted: ${inserted}, Skipped: ${skipped}, Total: ${count.rows[0].c}`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
