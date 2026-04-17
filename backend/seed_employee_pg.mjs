import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// Full F&B company org structure
const DEPARTMENTS = ['Direksi', 'Produksi', 'Kualitas & QC', 'Gudang & Logistik', 'Penjualan', 'Pemasaran', 'Keuangan & Akuntansi', 'HR & GA', 'IT & ERP', 'R&D & Inovasi', 'Pengadaan'];

const EMPLOYEES = [
  // === Direksi (C-Level) ===
  { employeeNo: 'EMP-001', firstName: 'Ahmad', lastName: 'Zubair', email: 'ahmad.zubair@seserp.co.id', phone: '08111000001', department: 'Direksi', position: 'Direktur Utama (CEO)', salary: 85_000_000, hireDate: '2018-01-15', status: 'ACTIVE', managerId: null },
  { employeeNo: 'EMP-002', firstName: 'Siti', lastName: 'Rahma Dewi', email: 'siti.rahma@seserp.co.id', phone: '08111000002', department: 'Direksi', position: 'Direktur Keuangan (CFO)', salary: 72_000_000, hireDate: '2018-03-01', status: 'ACTIVE', managerId: 'EMP-001' },
  { employeeNo: 'EMP-003', firstName: 'Budi', lastName: 'Santoso', email: 'budi.santoso@seserp.co.id', phone: '08111000003', department: 'Direksi', position: 'Direktur Operasional (COO)', salary: 70_000_000, hireDate: '2019-06-01', status: 'ACTIVE', managerId: 'EMP-001' },

  // === Produksi ===
  { employeeNo: 'EMP-010', firstName: 'Hendra', lastName: 'Wijaya', email: 'hendra.w@seserp.co.id', phone: '08122000010', department: 'Produksi', position: 'Kepala Pabrik (Plant Manager)', salary: 35_000_000, hireDate: '2019-08-01', status: 'ACTIVE', managerId: 'EMP-003' },
  { employeeNo: 'EMP-011', firstName: 'Agus', lastName: 'Prasetyo', email: 'agus.p@seserp.co.id', phone: '08122000011', department: 'Produksi', position: 'Supervisor Lini Bakery', salary: 18_000_000, hireDate: '2020-01-10', status: 'ACTIVE', managerId: 'EMP-010' },
  { employeeNo: 'EMP-012', firstName: 'Dewi', lastName: 'Lestari', email: 'dewi.l@seserp.co.id', phone: '08122000012', department: 'Produksi', position: 'Supervisor Lini Beverage', salary: 17_500_000, hireDate: '2020-03-15', status: 'ACTIVE', managerId: 'EMP-010' },
  { employeeNo: 'EMP-013', firstName: 'Eko', lastName: 'Budi Santoso', email: 'eko.bs@seserp.co.id', phone: '08122000013', department: 'Produksi', position: 'Operator Mesin Senior', salary: 9_500_000, hireDate: '2021-04-01', status: 'ACTIVE', managerId: 'EMP-011' },
  { employeeNo: 'EMP-014', firstName: 'Fitri', lastName: 'Handayani', email: 'fitri.h@seserp.co.id', phone: '08122000014', department: 'Produksi', position: 'Operator Mesin', salary: 7_500_000, hireDate: '2022-01-15', status: 'ACTIVE', managerId: 'EMP-012' },
  { employeeNo: 'EMP-015', firstName: 'Galih', lastName: 'Purnama', email: 'galih.p@seserp.co.id', phone: '08122000015', department: 'Produksi', position: 'Teknisi Maintenance Mesin', salary: 11_000_000, hireDate: '2020-09-01', status: 'ACTIVE', managerId: 'EMP-010' },

  // === Kualitas & QC ===
  { employeeNo: 'EMP-020', firstName: 'Indah', lastName: 'Permatasari', email: 'indah.pm@seserp.co.id', phone: '08133000020', department: 'Kualitas & QC', position: 'Kepala QC & Food Safety', salary: 25_000_000, hireDate: '2019-10-01', status: 'ACTIVE', managerId: 'EMP-003' },
  { employeeNo: 'EMP-021', firstName: 'Joko', lastName: 'Susilo', email: 'joko.s@seserp.co.id', phone: '08133000021', department: 'Kualitas & QC', position: 'Analis Lab BPOM & Halal', salary: 14_000_000, hireDate: '2021-02-15', status: 'ACTIVE', managerId: 'EMP-020' },
  { employeeNo: 'EMP-022', firstName: 'Kartini', lastName: 'Aulia', email: 'kartini.a@seserp.co.id', phone: '08133000022', department: 'Kualitas & QC', position: 'QC Inspector Produk Jadi', salary: 10_000_000, hireDate: '2022-05-01', status: 'ACTIVE', managerId: 'EMP-020' },

  // === Gudang & Logistik ===
  { employeeNo: 'EMP-030', firstName: 'Lukman', lastName: 'Hakim', email: 'lukman.h@seserp.co.id', phone: '08144000030', department: 'Gudang & Logistik', position: 'Kepala Gudang (Warehouse Manager)', salary: 22_000_000, hireDate: '2020-05-01', status: 'ACTIVE', managerId: 'EMP-003' },
  { employeeNo: 'EMP-031', firstName: 'Maya', lastName: 'Sari', email: 'maya.s@seserp.co.id', phone: '08144000031', department: 'Gudang & Logistik', position: 'Admin Gudang & WMS', salary: 9_000_000, hireDate: '2021-08-01', status: 'ACTIVE', managerId: 'EMP-030' },
  { employeeNo: 'EMP-032', firstName: 'Nanda', lastName: 'Pratama', email: 'nanda.p@seserp.co.id', phone: '08144000032', department: 'Gudang & Logistik', position: 'Driver & Koordinator Pengiriman', salary: 8_500_000, hireDate: '2021-10-01', status: 'ACTIVE', managerId: 'EMP-030' },

  // === Penjualan ===
  { employeeNo: 'EMP-040', firstName: 'Oki', lastName: 'Firmansyah', email: 'oki.f@seserp.co.id', phone: '08155000040', department: 'Penjualan', position: 'Kepala Sales Nasional (NSM)', salary: 40_000_000, hireDate: '2019-03-01', status: 'ACTIVE', managerId: 'EMP-001' },
  { employeeNo: 'EMP-041', firstName: 'Putri', lastName: 'Wulandari', email: 'putri.w@seserp.co.id', phone: '08155000041', department: 'Penjualan', position: 'Area Sales Manager (Jakarta)', salary: 22_000_000, hireDate: '2020-07-01', status: 'ACTIVE', managerId: 'EMP-040' },
  { employeeNo: 'EMP-042', firstName: 'Rizal', lastName: 'Maulana', email: 'rizal.m@seserp.co.id', phone: '08155000042', department: 'Penjualan', position: 'Sales Representative Jawa Barat', salary: 12_000_000, hireDate: '2021-04-15', status: 'ACTIVE', managerId: 'EMP-041' },
  { employeeNo: 'EMP-043', firstName: 'Sari', lastName: 'Indrayani', email: 'sari.i@seserp.co.id', phone: '08155000043', department: 'Penjualan', position: 'Key Account Modern Trade', salary: 15_000_000, hireDate: '2021-06-01', status: 'ACTIVE', managerId: 'EMP-040' },
  { employeeNo: 'EMP-044', firstName: 'Taufik', lastName: 'Hidayat', email: 'taufik.h@seserp.co.id', phone: '08155000044', department: 'Penjualan', position: 'Sales Horeca & Catering', salary: 11_000_000, hireDate: '2022-03-01', status: 'ACTIVE', managerId: 'EMP-040' },

  // === Pemasaran ===
  { employeeNo: 'EMP-050', firstName: 'Umi', lastName: 'Kalsum', email: 'umi.k@seserp.co.id', phone: '08166000050', department: 'Pemasaran', position: 'Brand Manager', salary: 28_000_000, hireDate: '2020-11-01', status: 'ACTIVE', managerId: 'EMP-001' },
  { employeeNo: 'EMP-051', firstName: 'Vicky', lastName: 'Andrianto', email: 'vicky.a@seserp.co.id', phone: '08166000051', department: 'Pemasaran', position: 'Digital Marketing Specialist', salary: 14_000_000, hireDate: '2022-01-01', status: 'ACTIVE', managerId: 'EMP-050' },

  // === Keuangan & Akuntansi ===
  { employeeNo: 'EMP-060', firstName: 'Wati', lastName: 'Sulistyowati', email: 'wati.sl@seserp.co.id', phone: '08177000060', department: 'Keuangan & Akuntansi', position: 'Kepala Keuangan (Fin. Controller)', salary: 42_000_000, hireDate: '2018-10-01', status: 'ACTIVE', managerId: 'EMP-002' },
  { employeeNo: 'EMP-061', firstName: 'Xander', lastName: 'Kurniawan', email: 'xander.k@seserp.co.id', phone: '08177000061', department: 'Keuangan & Akuntansi', position: 'Staf Akuntansi & Perpajakan', salary: 12_000_000, hireDate: '2021-03-01', status: 'ACTIVE', managerId: 'EMP-060' },
  { employeeNo: 'EMP-062', firstName: 'Yani', lastName: 'Andriyani', email: 'yani.a@seserp.co.id', phone: '08177000062', department: 'Keuangan & Akuntansi', position: 'Staf AR & AP', salary: 9_500_000, hireDate: '2022-07-01', status: 'ACTIVE', managerId: 'EMP-060' },
  { employeeNo: 'EMP-063', firstName: 'Zahra', lastName: 'Nur Afifah', email: 'zahra.na@seserp.co.id', phone: '08177000063', department: 'Keuangan & Akuntansi', position: 'Kasir & Staf Kas', salary: 7_500_000, hireDate: '2023-01-02', status: 'ACTIVE', managerId: 'EMP-060' },

  // === HR & GA ===
  { employeeNo: 'EMP-070', firstName: 'Ahmad', lastName: 'Fauzi', email: 'ahmad.fauzi@seserp.co.id', phone: '08188000070', department: 'HR & GA', position: 'HR Manager', salary: 32_000_000, hireDate: '2019-05-01', status: 'ACTIVE', managerId: 'EMP-001' },
  { employeeNo: 'EMP-071', firstName: 'Bella', lastName: 'Safitri', email: 'bella.sf@seserp.co.id', phone: '08188000071', department: 'HR & GA', position: 'HR Officer & Rekrutmen', salary: 11_000_000, hireDate: '2021-09-01', status: 'ACTIVE', managerId: 'EMP-070' },
  { employeeNo: 'EMP-072', firstName: 'Candra', lastName: 'Purnomo', email: 'candra.p@seserp.co.id', phone: '08188000072', department: 'HR & GA', position: 'GA & Office Admin', salary: 8_500_000, hireDate: '2022-02-01', status: 'ACTIVE', managerId: 'EMP-070' },

  // === IT & ERP ===
  { employeeNo: 'EMP-080', firstName: 'Dani', lastName: 'Setiawan', email: 'dani.sw@seserp.co.id', phone: '08199000080', department: 'IT & ERP', position: 'IT Manager & ERP Administrator', salary: 38_000_000, hireDate: '2020-04-01', status: 'ACTIVE', managerId: 'EMP-003' },
  { employeeNo: 'EMP-081', firstName: 'Eka', lastName: 'Pradipta', email: 'eka.pr@seserp.co.id', phone: '08199000081', department: 'IT & ERP', position: 'Fullstack Developer ERP', salary: 20_000_000, hireDate: '2021-07-01', status: 'ACTIVE', managerId: 'EMP-080' },

  // === R&D ===
  { employeeNo: 'EMP-090', firstName: 'Farid', lastName: 'Al-Amin', email: 'farid.aa@seserp.co.id', phone: '08200000090', department: 'R&D & Inovasi', position: 'R&D Manager (Food Technologist)', salary: 35_000_000, hireDate: '2020-06-01', status: 'ACTIVE', managerId: 'EMP-003' },
  { employeeNo: 'EMP-091', firstName: 'Gita', lastName: 'Puspita', email: 'gita.pp@seserp.co.id', phone: '08200000091', department: 'R&D & Inovasi', position: 'Peneliti Produk Bakery & Beverage', salary: 16_000_000, hireDate: '2022-03-15', status: 'ACTIVE', managerId: 'EMP-090' },

  // === Pengadaan ===
  { employeeNo: 'EMP-100', firstName: 'Hadi', lastName: 'Nugroho', email: 'hadi.ng@seserp.co.id', phone: '08211000100', department: 'Pengadaan', position: 'Kepala Pengadaan (Procurement Manager)', salary: 30_000_000, hireDate: '2019-09-01', status: 'ACTIVE', managerId: 'EMP-003' },
  { employeeNo: 'EMP-101', firstName: 'Ira', lastName: 'Susanti', email: 'ira.s@seserp.co.id', phone: '08211000101', department: 'Pengadaan', position: 'Staf Pengadaan & Vendor Relations', salary: 12_000_000, hireDate: '2021-11-01', status: 'ACTIVE', managerId: 'EMP-100' },

  // === Resigned / Inactive ===
  { employeeNo: 'EMP-999', firstName: 'Leo', lastName: 'Hartanto', email: 'leo.ht@seserp.co.id', phone: '08222000999', department: 'Penjualan', position: 'Sales Representative (Resigned)', salary: 10_000_000, hireDate: '2020-05-01', status: 'RESIGNED', managerId: 'EMP-040' },
];

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Employees for tenant: ${tenantId}`);

  // 1. Permissions
  const allPerms = [
    'hris.employee.read', 'hris.employee.create', 'hris.employee.update', 'hris.employee.delete',
    'hris.orgStructure.read', 'hris.orgStructure.create',
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

  // 2. Pass 1 — insert all employees (without managerId)
  const empNoToId = new Map();
  let inserted = 0;
  for (const emp of EMPLOYEES) {
    const ex = await client.query('SELECT id FROM "Employee" WHERE "tenantId"=$1 AND "employeeNo"=$2', [tenantId, emp.employeeNo]);
    if (ex.rows.length > 0) {
      empNoToId.set(emp.employeeNo, ex.rows[0].id);
      process.stdout.write('.');
      continue;
    }
    const id = crypto.randomUUID();
    await client.query(
      `INSERT INTO "Employee" ("id","tenantId","employeeNo","firstName","lastName","email","phone","department","position","hireDate","status","salary","createdAt","updatedAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW())`,
      [id, tenantId, emp.employeeNo, emp.firstName, emp.lastName ?? null, emp.email, emp.phone ?? null,
       emp.department ?? null, emp.position ?? null,
       emp.hireDate ? new Date(emp.hireDate) : null,
       emp.status, emp.salary ?? null]
    );
    empNoToId.set(emp.employeeNo, id);
    console.log(`  ✓ ${emp.employeeNo} | ${emp.firstName} ${emp.lastName ?? ''} | ${emp.position}`);
    inserted++;
  }

  // 3. Pass 2 — link managers
  let linked = 0;
  for (const emp of EMPLOYEES) {
    if (!emp.managerId) continue;
    const empId = empNoToId.get(emp.employeeNo);
    const mgrId = empNoToId.get(emp.managerId);
    if (empId && mgrId) {
      await client.query('UPDATE "Employee" SET "managerId"=$1 WHERE id=$2', [mgrId, empId]);
      linked++;
    }
  }

  const count = await client.query('SELECT count(*) as c FROM "Employee" WHERE "tenantId"=$1', [tenantId]);
  console.log(`\n🎉 Done! Inserted: ${inserted}, Linked managers: ${linked}, Total: ${count.rows[0].c}`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
