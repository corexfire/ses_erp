import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// Comprehensive F&B factory shifts — covering all operational patterns
const SHIFTS = [
  // ─── 3-Shift Rotasi Pabrik ───────────────────────────────────────────
  { code: 'SHIFT-A',     name: 'Shift Pagi (A)',              startTime: '06:00', endTime: '14:00', isFlexi: false, dept: 'Produksi, QC, Gudang', color: '#f59e0b', description: 'Shift rotasi pagi untuk lini produksi & gudang.' },
  { code: 'SHIFT-B',     name: 'Shift Siang (B)',             startTime: '14:00', endTime: '22:00', isFlexi: false, dept: 'Produksi, QC, Gudang', color: '#3b82f6', description: 'Shift rotasi siang untuk lini produksi & gudang.' },
  { code: 'SHIFT-C',     name: 'Shift Malam (C)',             startTime: '22:00', endTime: '06:00', isFlexi: false, dept: 'Produksi, QC, Gudang', color: '#8b5cf6', description: 'Shift rotasi malam untuk lini produksi 24 jam.' },

  // ─── Kantor Reguler ──────────────────────────────────────────────────
  { code: 'SHIFT-OFF',   name: 'Shift Reguler Kantor',        startTime: '08:00', endTime: '17:00', isFlexi: false, dept: 'Semua Departemen Kantor', color: '#10b981', description: 'Jam kerja standar HO 8 jam dengan istirahat 1 jam.' },

  // ─── Flexi / WFH ─────────────────────────────────────────────────────
  { code: 'SHIFT-FLEXI', name: 'Shift Flexi (WFH/Hybrid)',    startTime: '08:00', endTime: '17:00', isFlexi: true,  dept: 'IT, R&D, Pemasaran',    color: '#06b6d4', description: 'Jadwal fleksibel untuk posisi hybrid/remote. Kehadiran diverifikasi via sistem.' },

  // ─── Shift Khusus ────────────────────────────────────────────────────
  { code: 'SHIFT-HALF-AM', name: 'Shift Setengah Hari (Pagi)', startTime: '08:00', endTime: '12:00', isFlexi: false, dept: 'Semua (Cuti Parsial)',   color: '#f97316', description: 'Shift 4 jam—untuk karyawan cuti parsial atau hari tertentu.' },
  { code: 'SHIFT-HALF-PM', name: 'Shift Setengah Hari (Siang)', startTime: '13:00', endTime: '17:00', isFlexi: false, dept: 'Semua (Cuti Parsial)', color: '#ef4444', description: 'Shift 4 jam sore—untuk karyawan cuti parsial.' },
  { code: 'SHIFT-SPLIT',   name: 'Shift Split (Horeca/Driver)', startTime: '07:00', endTime: '20:00', isFlexi: false, dept: 'Driver, Ekspedisi, Sales', color: '#84cc16', description: 'Shift panjang dengan jeda istirahat tengah hari. Untuk sales & driver lapangan.' },
  { code: 'SHIFT-EARLY',   name: 'Shift Early Morning (QC)',   startTime: '04:00', endTime: '12:00', isFlexi: false, dept: 'QC & Penerimaan Barang',  color: '#e879f9', description: 'Shift dini hari untuk tim QC yang melakukan inspeksi bahan baku sebelum produksi.' },
  { code: 'SHIFT-LEMBUR',  name: 'Shift Lembur (Overtime)',    startTime: '17:00', endTime: '21:00', isFlexi: false, dept: 'Semua (Lembur Resmi)',    color: '#64748b', description: 'Shift tambahan setelah jam reguler. Dihitung lembur sesuai PP No. 35/2021.' },
];

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Shifts for tenant: ${tenantId}`);

  // 1. Permissions
  const allPerms = [
    'hris.shift.read', 'hris.shift.create', 'hris.shift.update', 'hris.shift.delete',
  ];
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

  // 2. Seed shifts
  let inserted = 0;
  for (const sh of SHIFTS) {
    const ex = await client.query('SELECT id FROM "Shift" WHERE "tenantId"=$1 AND code=$2', [tenantId, sh.code]);
    if (ex.rows.length > 0) {
      console.log(`  skip: ${sh.code}`);
      continue;
    }
    const id = crypto.randomUUID();
    await client.query(
      `INSERT INTO "Shift" ("id","tenantId","name","code","startTime","endTime","isFlexi","isActive","createdAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,true,NOW())`,
      [id, tenantId, sh.name, sh.code, sh.startTime, sh.endTime, sh.isFlexi]
    );
    // Calculate duration
    const [sh_h, sh_m] = sh.startTime.split(':').map(Number);
    const [en_h, en_m] = sh.endTime.split(':').map(Number);
    let dur = (en_h * 60 + en_m) - (sh_h * 60 + sh_m);
    if (dur < 0) dur += 24 * 60; // overnight
    const hours = Math.floor(dur / 60), mins = dur % 60;
    console.log(`  ✓ [${sh.isFlexi ? 'FLEXI' : '     '}] ${sh.code.padEnd(14)} | ${sh.startTime}–${sh.endTime} (${hours}j${mins > 0 ? mins + 'm' : ''}) | ${sh.dept}`);
    inserted++;
  }

  const total = await client.query('SELECT count(*) as c FROM "Shift" WHERE "tenantId"=$1', [tenantId]);
  console.log(`\n🎉 Done! Inserted: ${inserted}, Total shifts: ${total.rows[0].c}`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
