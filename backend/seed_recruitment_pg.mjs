import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// Realistic F&B company open positions + candidates
const CANDIDATES = [
  // ─── APPLIED ─────────────────────────────────────────────────────────
  { no: 'REC-2026/001', first: 'Andika', last: 'Surya Pratama', email: 'andika.sp@gmail.com', phone: '08119001001', position: 'Operator Mesin Produksi', status: 'APPLIED', source: 'Jobstreet', education: 'SMK Teknik Mesin', experience: '2 tahun', expectedSalary: 7_500_000 },
  { no: 'REC-2026/002', first: 'Bunga', last: 'Maharani', email: 'bunga.mhr@gmail.com', phone: '08119002002', position: 'Staff Akuntansi & Perpajakan', status: 'APPLIED', source: 'LinkedIn', education: 'S1 Akuntansi Universitas Indonesia', experience: '3 tahun', expectedSalary: 12_000_000 },
  { no: 'REC-2026/003', first: 'Cahyo', last: 'Wibisono', email: 'cahyo.wb@outlook.com', phone: '08119003003', position: 'QC Inspector Produk Jadi', status: 'APPLIED', source: 'Indeed', education: 'D3 Teknologi Pangan', experience: '1 tahun', expectedSalary: 9_000_000 },
  { no: 'REC-2026/004', first: 'Dinda', last: 'Amelia Putri', email: 'dinda.am@gmail.com', phone: '08119004004', position: 'Digital Marketing Specialist', status: 'APPLIED', source: 'Glints', education: 'S1 Ilmu Komunikasi Unpad', experience: '2 tahun', expectedSalary: 11_000_000 },
  { no: 'REC-2026/005', first: 'Erwin', last: 'Saputro', email: 'erwin.sp@yahoo.com', phone: '08119005005', position: 'Driver & Kurir Ekspedisi', status: 'APPLIED', source: 'Kalibrr', education: 'SMA', experience: '4 tahun', expectedSalary: 6_500_000 },

  // ─── SCREENING ───────────────────────────────────────────────────────
  { no: 'REC-2026/006', first: 'Fajar', last: 'Nugroho', email: 'fajar.ng@gmail.com', phone: '08119006006', position: 'Sales Representative Jawa Tengah', status: 'SCREENING', source: 'Jobstreet', education: 'S1 Manajemen', experience: '3 tahun FMCG', expectedSalary: 12_000_000 },
  { no: 'REC-2026/007', first: 'Gita', last: 'Kusuma Wardani', email: 'gita.kw@gmail.com', phone: '08119007007', position: 'HR Officer & Rekrutmen', status: 'SCREENING', source: 'LinkedIn', education: 'S1 Psikologi UGM', experience: '2 tahun', expectedSalary: 10_000_000 },
  { no: 'REC-2026/008', first: 'Hasan', last: 'Al-Farouq', email: 'hasan.af@gmail.com', phone: '08119008008', position: 'Teknisi Maintenance Mesin', status: 'SCREENING', source: 'JobFair Bekasi', education: 'SMK Listrik', experience: '5 tahun pabrik', expectedSalary: 10_500_000 },
  { no: 'REC-2026/009', first: 'Ika', last: 'Rahmawati', email: 'ika.rm@gmail.com', phone: '08119009009', position: 'Staff AR & AP', status: 'SCREENING', source: 'Indeed', education: 'D3 Akuntansi Politeknik UI', experience: '1 tahun', expectedSalary: 8_000_000 },

  // ─── INTERVIEW ───────────────────────────────────────────────────────
  { no: 'REC-2026/010', first: 'Johan', last: 'Prasetyo Adi', email: 'johan.pa@gmail.com', phone: '08119010010', position: 'Kepala Gudang (Warehouse Manager)', status: 'INTERVIEW', source: 'LinkedIn', education: 'S1 Manajemen Logistik Undip', experience: '7 tahun WMS/ERP', expectedSalary: 22_000_000 },
  { no: 'REC-2026/011', first: 'Kiki', last: 'Andriani', email: 'kiki.an@gmail.com', phone: '08119011011', position: 'Food Technologist R&D', status: 'INTERVIEW', source: 'Jobstreet', education: 'S2 Teknologi Pangan IPB', experience: '4 tahun R&D F&B', expectedSalary: 18_000_000 },
  { no: 'REC-2026/012', first: 'Ligan', last: 'Santika', email: 'ligan.st@gmail.com', phone: '08119012012', position: 'Key Account Manager Modern Trade', status: 'INTERVIEW', source: 'Referral Internal (Pak Oki)', education: 'S1 Ekonomi UI', experience: '5 tahun Indomaret/Alfamart', expectedSalary: 18_000_000 },
  { no: 'REC-2026/013', first: 'Mira', last: 'Dewi Santoso', email: 'mira.ds@outlook.com', phone: '08119013013', position: 'Brand Manager Junior', status: 'INTERVIEW', source: 'LinkedIn', education: 'S1 Pemasaran Prasetiya Mulya', experience: '3 tahun FMCG', expectedSalary: 16_000_000 },

  // ─── OFFER ───────────────────────────────────────────────────────────
  { no: 'REC-2026/014', first: 'Noval', last: 'Firmansyah', email: 'noval.fm@gmail.com', phone: '08119014014', position: 'Fullstack Developer ERP (NestJS/Vue)', status: 'OFFER', source: 'LinkedIn', education: 'S1 Teknik Informatika ITS', experience: '4 tahun Node.js/Vue', expectedSalary: 20_000_000 },
  { no: 'REC-2026/015', first: 'Oktaviani', last: 'Rahma Sari', email: 'okta.rs@gmail.com', phone: '08119015015', position: 'Staff Pengadaan & Vendor Relations', status: 'OFFER', source: 'Kalibrr', education: 'S1 Manajemen Unibraw', experience: '2 tahun procurement', expectedSalary: 10_000_000 },

  // ─── HIRED ───────────────────────────────────────────────────────────
  { no: 'REC-2026/016', first: 'Puji', last: 'Lestari', email: 'puji.lt@gmail.com', phone: '08119016016', position: 'Analis Lab QC & Food Safety', status: 'HIRED', source: 'Jobstreet', education: 'S1 Kimia UNJ', experience: '3 tahun lab BPOM', expectedSalary: 13_000_000 },
  { no: 'REC-2026/017', first: 'Qori', last: 'Handayani', email: 'qori.hd@gmail.com', phone: '08119017017', position: 'GA & Office Admin', status: 'HIRED', source: 'Internal Referral', education: 'S1 Administrasi Bisnis', experience: '2 tahun GA', expectedSalary: 8_000_000 },
  { no: 'REC-2026/018', first: 'Rizky', last: 'Muhammad Fauzi', email: 'rizky.mf@gmail.com', phone: '08119018018', position: 'Supervisor Lini Produksi Bakery', status: 'HIRED', source: 'JobFair UGM', education: 'D3 Teknologi Pangan', experience: '5 tahun', expectedSalary: 15_000_000 },

  // ─── REJECTED ────────────────────────────────────────────────────────
  { no: 'REC-2026/019', first: 'Santi', last: 'Dewi', email: 'santi.dw@gmail.com', phone: '08119019019', position: 'Sales Representative Jakarta', status: 'REJECTED', source: 'Indeed', education: 'SMA', experience: '0 tahun', expectedSalary: 4_000_000, notes: 'Pengalaman kurang; tidak memenuhi syarat minimum 2 tahun FMCG' },
  { no: 'REC-2026/020', first: 'Tito', last: 'Prasetyo', email: 'tito.pr@gmail.com', phone: '08119020020', position: 'IT Manager', status: 'REJECTED', source: 'LinkedIn', education: 'S1 Sistem Informasi', experience: '2 tahun', expectedSalary: 50_000_000, notes: 'Ekspektasi gaji tidak sesuai (Rp50jt vs budget Rp38jt)' },
  { no: 'REC-2026/021', first: 'Umar', last: 'Hamid', email: 'umar.hm@gmail.com', phone: '08119021021', position: 'Operator Mesin Beverage', status: 'REJECTED', source: 'Walk-in', education: 'SD', experience: '1 tahun', expectedSalary: 5_000_000, notes: 'Tidak memenuhi syarat pendidikan minimum (SMK/SMA)' },
];

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (!userRes.rows.length) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Recruitment Candidates for tenant: ${tenantId}`);

  // 1. Permissions
  const allPerms = ['hris.recruitment.read', 'hris.recruitment.create', 'hris.recruitment.update', 'hris.recruitment.delete'];
  for (const key of allPerms) {
    await client.query(`INSERT INTO "Permission" (id, key, description, "createdAt") VALUES ($1,$2,$3,NOW()) ON CONFLICT (key) DO NOTHING`, [crypto.randomUUID(), key, key]);
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

  // 2. Seed candidates
  let inserted = 0;
  const STATUS_ORDER = ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED'];

  for (const c of CANDIDATES) {
    const ex = await client.query('SELECT id FROM "RecruitmentCandidate" WHERE "tenantId"=$1 AND "candidateNo"=$2', [tenantId, c.no]);
    if (ex.rows.length > 0) { console.log(`  skip: ${c.no}`); continue; }

    // Stagger appliedAt for realism
    const statusIdx = STATUS_ORDER.indexOf(c.status);
    const daysAgo = Math.max(3, (STATUS_ORDER.length - statusIdx) * 7 + Math.floor(Math.random() * 5));
    const appliedAt = new Date();
    appliedAt.setDate(appliedAt.getDate() - daysAgo);

    await client.query(
      `INSERT INTO "RecruitmentCandidate" ("id","tenantId","candidateNo","firstName","lastName","email","phone","position","status","appliedAt","createdAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW())`,
      [crypto.randomUUID(), tenantId, c.no, c.first, c.last, c.email, c.phone, c.position, c.status, appliedAt.toISOString()]
    );
    const icon = { APPLIED:'📥', SCREENING:'🔍', INTERVIEW:'💬', OFFER:'📄', HIRED:'✅', REJECTED:'❌' }[c.status] ?? '—';
    console.log(`  ${icon} ${c.no} | ${c.status.padEnd(9)} | ${c.first} ${c.last} | ${c.position}`);
    inserted++;
  }

  const totals = await client.query('SELECT status, count(*) as c FROM "RecruitmentCandidate" WHERE "tenantId"=$1 GROUP BY status', [tenantId]);
  console.log('\n📊 Summary:');
  for (const r of totals.rows) console.log(`  ${r.status}: ${r.c}`);
  console.log(`\n🎉 Done! Inserted: ${inserted}`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
