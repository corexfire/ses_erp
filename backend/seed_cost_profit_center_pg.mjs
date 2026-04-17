import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// Full F&B Cost Centers — Kategorikal: Pabrik, Distribusi, Kantor, R&D, Marketing
const COST_CENTERS = [
  // === PRODUKSI / PABRIK ===
  { code: 'CC-PROD-01', name: 'Lini Produksi Bakery (Roti & Kue)', group: 'PRODUKSI' },
  { code: 'CC-PROD-02', name: 'Lini Produksi Minuman & Beverage', group: 'PRODUKSI' },
  { code: 'CC-PROD-03', name: 'Lini Produksi Snack & Confectionery', group: 'PRODUKSI' },
  { code: 'CC-PROD-04', name: 'Departemen Quality Control (QC Lab)', group: 'PRODUKSI' },
  { code: 'CC-PROD-05', name: 'Maintenance Mesin & Engineering', group: 'PRODUKSI' },

  // === GUDANG & LOGISTIK ===
  { code: 'CC-WHS-01', name: 'Gudang Bahan Baku (Raw Material)', group: 'GUDANG' },
  { code: 'CC-WHS-02', name: 'Gudang Barang Jadi (Finished Goods)', group: 'GUDANG' },
  { code: 'CC-WHS-03', name: 'Armada Pengiriman & Distribusi', group: 'GUDANG' },

  // === PENJUALAN ===
  { code: 'CC-SALES-01', name: 'Sales Wilayah Jakarta & Jabodetabek', group: 'PENJUALAN' },
  { code: 'CC-SALES-02', name: 'Sales Wilayah Jawa Barat & Tengah', group: 'PENJUALAN' },
  { code: 'CC-SALES-03', name: 'Sales Wilayah Jawa Timur & Bali', group: 'PENJUALAN' },
  { code: 'CC-SALES-04', name: 'Key Account Modern Trade (Indomaret, Alfamart)', group: 'PENJUALAN' },
  { code: 'CC-SALES-05', name: 'Horeca & Catering B2B', group: 'PENJUALAN' },

  // === ADMINISTRASI & UMUM ===
  { code: 'CC-ADM-01', name: 'HR & Penggajian Kantor Pusat', group: 'ADMINISTRASI' },
  { code: 'CC-ADM-02', name: 'Keuangan, Akuntansi & Perpajakan', group: 'ADMINISTRASI' },
  { code: 'CC-ADM-03', name: 'IT & Infrastruktur ERP', group: 'ADMINISTRASI' },
  { code: 'CC-ADM-04', name: 'Direksi & Manajemen Strategis', group: 'ADMINISTRASI' },

  // === R&D & INOVASI ===
  { code: 'CC-RND-01', name: 'Riset & Pengembangan Produk Baru', group: 'R&D' },
  { code: 'CC-RND-02', name: 'Uji Klinis & Sertifikasi BPOM/Halal', group: 'R&D' },

  // === MARKETING ===
  { code: 'CC-MKT-01', name: 'Marketing Digital & Sosial Media', group: 'MARKETING' },
  { code: 'CC-MKT-02', name: 'Iklan & Promosi Offline / OOH', group: 'MARKETING' },
  { code: 'CC-MKT-03', name: 'Event & Pameran Produk', group: 'MARKETING' },
];

// Full F&B Profit Centers — Segmen Bisnis menghasilkan revenue
const PROFIT_CENTERS = [
  { code: 'PC-BAKERY', name: 'Segmen Bakery & Roti Artisan' },
  { code: 'PC-BEVERAGE', name: 'Segmen Minuman & Beverage RTD' },
  { code: 'PC-SNACK', name: 'Segmen Snack, Cookies & Confectionery' },
  { code: 'PC-FROZEN', name: 'Segmen Produk Beku (Frozen Food)' },
  { code: 'PC-CATERING', name: 'Segmen Katering Horeca & Sipil B2B' },
  { code: 'PC-EXPORT', name: 'Segmen Ekspor (Malaysia, Singapura, Timteng)' },
  { code: 'PC-ECOMMERCE', name: 'Segmen Penjualan E-Commerce (Tokopedia, Shopee)' },
  { code: 'PC-FRANCHISE', name: 'Segmen Waralaba & Cabang Franchise' },
];

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Cost Centers & Profit Centers for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const allPerms = [
    'finance.costcenter.read', 'finance.costcenter.create', 'finance.costcenter.update', 'finance.costcenter.delete',
    'finance.profitcenter.read', 'finance.profitcenter.create', 'finance.profitcenter.update', 'finance.profitcenter.delete',
    'core.costcenter.read', 'core.costcenter.create', 'core.costcenter.edit', 'core.costcenter.deactivate',
    'core.profitcenter.read', 'core.profitcenter.create', 'core.profitcenter.edit', 'core.profitcenter.deactivate'
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
        try { await client.query(`INSERT INTO "RolePermission" ("roleId", "permissionId") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [r.id, p.rows[0].id]); } catch(e){}
      }
    }
  }
  console.log('✅ Permissions injected!');

  // 2. SEED COST CENTERS
  let ccInserted = 0;
  for (const cc of COST_CENTERS) {
    const exists = await client.query('SELECT id FROM "CostCenter" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, cc.code]);
    if (exists.rows.length > 0) { console.log(`  skip CC: ${cc.code}`); continue; }
    await client.query(
      `INSERT INTO "CostCenter" ("id", "tenantId", "code", "name", "isActive", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, true, NOW(), NOW())`,
      [crypto.randomUUID(), tenantId, cc.code, cc.name]
    );
    console.log(`  ✓ CC: ${cc.code} | ${cc.name}`);
    ccInserted++;
  }

  // 3. SEED PROFIT CENTERS
  let pcInserted = 0;
  for (const pc of PROFIT_CENTERS) {
    const exists = await client.query('SELECT id FROM "ProfitCenter" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, pc.code]);
    if (exists.rows.length > 0) { console.log(`  skip PC: ${pc.code}`); continue; }
    await client.query(
      `INSERT INTO "ProfitCenter" ("id", "tenantId", "code", "name", "isActive", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, true, NOW(), NOW())`,
      [crypto.randomUUID(), tenantId, pc.code, pc.name]
    );
    console.log(`  ✓ PC: ${pc.code} | ${pc.name}`);
    pcInserted++;
  }

  console.log(`\n🎉 Done! Inserted ${ccInserted} Cost Centers, ${pcInserted} Profit Centers.`);
  await client.end();
}

main().catch(e => { console.error(e); client.end(); });
