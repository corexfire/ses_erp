import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// Full F&B org hierarchy:
// COMPANY → DIVISION → DEPARTMENT → TEAM/UNIT
const ORG_STRUCTURE = [
  // ─── Level 0: Company ───────────────────────────────────────────────
  { code: 'SES-CORP', name: 'PT Sumber Energi Snack (SES ERP)', type: 'COMPANY', parentCode: null, managerEmpNo: 'EMP-001' },

  // ─── Level 1: Divisions ─────────────────────────────────────────────
  { code: 'DIV-OPS', name: 'Divisi Operasional', type: 'DIVISION', parentCode: 'SES-CORP', managerEmpNo: 'EMP-003' },
  { code: 'DIV-COM', name: 'Divisi Komersial', type: 'DIVISION', parentCode: 'SES-CORP', managerEmpNo: 'EMP-040' },
  { code: 'DIV-FIN', name: 'Divisi Keuangan & Akuntansi', type: 'DIVISION', parentCode: 'SES-CORP', managerEmpNo: 'EMP-002' },
  { code: 'DIV-SUP', name: 'Divisi Dukungan Bisnis', type: 'DIVISION', parentCode: 'SES-CORP', managerEmpNo: 'EMP-070' },

  // ─── Level 2: Departments under Operasional ─────────────────────────
  { code: 'DEPT-PROD', name: 'Departemen Produksi', type: 'DEPARTMENT', parentCode: 'DIV-OPS', managerEmpNo: 'EMP-010' },
  { code: 'DEPT-QC', name: 'Departemen Kualitas & Food Safety', type: 'DEPARTMENT', parentCode: 'DIV-OPS', managerEmpNo: 'EMP-020' },
  { code: 'DEPT-WH', name: 'Departemen Gudang & Logistik', type: 'DEPARTMENT', parentCode: 'DIV-OPS', managerEmpNo: 'EMP-030' },
  { code: 'DEPT-RD', name: 'Departemen R&D & Inovasi Produk', type: 'DEPARTMENT', parentCode: 'DIV-OPS', managerEmpNo: 'EMP-090' },
  { code: 'DEPT-PROC', name: 'Departemen Pengadaan (Procurement)', type: 'DEPARTMENT', parentCode: 'DIV-OPS', managerEmpNo: 'EMP-100' },

  // ─── Level 2: Departments under Komersial ───────────────────────────
  { code: 'DEPT-SALES', name: 'Departemen Penjualan Nasional', type: 'DEPARTMENT', parentCode: 'DIV-COM', managerEmpNo: 'EMP-040' },
  { code: 'DEPT-MKT', name: 'Departemen Pemasaran & Brand', type: 'DEPARTMENT', parentCode: 'DIV-COM', managerEmpNo: 'EMP-050' },

  // ─── Level 2: Departments under Keuangan ────────────────────────────
  { code: 'DEPT-FIN', name: 'Departemen Keuangan & Treasury', type: 'DEPARTMENT', parentCode: 'DIV-FIN', managerEmpNo: 'EMP-060' },
  { code: 'DEPT-ACC', name: 'Departemen Akuntansi & Perpajakan', type: 'DEPARTMENT', parentCode: 'DIV-FIN', managerEmpNo: 'EMP-060' },

  // ─── Level 2: Departments under Dukungan ────────────────────────────
  { code: 'DEPT-HR', name: 'Departemen Human Resources', type: 'DEPARTMENT', parentCode: 'DIV-SUP', managerEmpNo: 'EMP-070' },
  { code: 'DEPT-GA', name: 'Departemen General Affairs & Fasilitas', type: 'DEPARTMENT', parentCode: 'DIV-SUP', managerEmpNo: 'EMP-070' },
  { code: 'DEPT-IT', name: 'Departemen IT & Sistem ERP', type: 'DEPARTMENT', parentCode: 'DIV-SUP', managerEmpNo: 'EMP-080' },

  // ─── Level 3: Teams / Units ─────────────────────────────────────────
  { code: 'TEAM-BAKERY', name: 'Lini Produksi Bakery & Roti', type: 'TEAM', parentCode: 'DEPT-PROD', managerEmpNo: 'EMP-011' },
  { code: 'TEAM-BEV', name: 'Lini Produksi Beverage & Minuman', type: 'TEAM', parentCode: 'DEPT-PROD', managerEmpNo: 'EMP-012' },
  { code: 'TEAM-MAINT', name: 'Unit Maintenance & Engineering', type: 'UNIT', parentCode: 'DEPT-PROD', managerEmpNo: 'EMP-015' },
  { code: 'TEAM-QCLAB', name: 'Unit Lab QC & Analisis BPOM', type: 'UNIT', parentCode: 'DEPT-QC', managerEmpNo: 'EMP-021' },
  { code: 'TEAM-WHIN', name: 'Unit Penerimaan & Putaway Barang', type: 'UNIT', parentCode: 'DEPT-WH', managerEmpNo: 'EMP-031' },
  { code: 'TEAM-WHOUT', name: 'Unit Pengiriman & Ekspedisi', type: 'UNIT', parentCode: 'DEPT-WH', managerEmpNo: 'EMP-032' },
  { code: 'TEAM-SALES-MT', name: 'Unit Penjualan Modern Trade (Alfamart/Indomaret)', type: 'UNIT', parentCode: 'DEPT-SALES', managerEmpNo: 'EMP-043' },
  { code: 'TEAM-SALES-JKT', name: 'Area Sales Jakarta & Jabodetabek', type: 'TEAM', parentCode: 'DEPT-SALES', managerEmpNo: 'EMP-041' },
  { code: 'TEAM-SALES-HORECA', name: 'Unit Penjualan HoReCa & Catering', type: 'UNIT', parentCode: 'DEPT-SALES', managerEmpNo: 'EMP-044' },
  { code: 'TEAM-DIGITAL', name: 'Unit Pemasaran Digital & E-Commerce', type: 'UNIT', parentCode: 'DEPT-MKT', managerEmpNo: 'EMP-051' },
  { code: 'TEAM-AR', name: 'Unit Piutang Usaha (AR)', type: 'UNIT', parentCode: 'DEPT-ACC', managerEmpNo: 'EMP-062' },
  { code: 'TEAM-AP', name: 'Unit Hutang Usaha (AP)', type: 'UNIT', parentCode: 'DEPT-ACC', managerEmpNo: 'EMP-062' },
  { code: 'TEAM-TAX', name: 'Unit Perpajakan & Pelaporan DJP', type: 'UNIT', parentCode: 'DEPT-ACC', managerEmpNo: 'EMP-061' },
  { code: 'TEAM-REC', name: 'Unit Rekrutmen & Talent Acquisition', type: 'UNIT', parentCode: 'DEPT-HR', managerEmpNo: 'EMP-071' },
  { code: 'TEAM-ERP', name: 'Unit Implementasi & Support ERP', type: 'UNIT', parentCode: 'DEPT-IT', managerEmpNo: 'EMP-081' },
];

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Organization Units for tenant: ${tenantId}`);

  // 1. Permissions
  const allPerms = ['hris.orgStructure.read', 'hris.orgStructure.create', 'hris.orgStructure.update', 'hris.orgStructure.delete'];
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

  // 2. Load employee map (EmpNo → ID)
  const empRes = await client.query('SELECT id, "employeeNo" FROM "Employee" WHERE "tenantId"=$1', [tenantId]);
  const empMap = new Map(empRes.rows.map(e => [e.employeeNo, e.id]));

  // 3. Pass 1 — insert all without parentId (to get IDs first)
  const codeToId = new Map();
  let inserted = 0;
  for (const unit of ORG_STRUCTURE) {
    const ex = await client.query('SELECT id FROM "OrganizationUnit" WHERE "tenantId"=$1 AND code=$2', [tenantId, unit.code]);
    if (ex.rows.length > 0) {
      codeToId.set(unit.code, ex.rows[0].id);
      console.log(`  skip: ${unit.code}`);
      continue;
    }
    const id = crypto.randomUUID();
    const managerId = unit.managerEmpNo ? empMap.get(unit.managerEmpNo) ?? null : null;
    await client.query(
      `INSERT INTO "OrganizationUnit" ("id","tenantId","name","code","type","managerId","createdAt")
       VALUES ($1,$2,$3,$4,$5,$6,NOW())`,
      [id, tenantId, unit.name, unit.code, unit.type, managerId]
    );
    codeToId.set(unit.code, id);
    console.log(`  ✓ [${unit.type.padEnd(10)}] ${unit.code} — ${unit.name}`);
    inserted++;
  }

  // 4. Pass 2 — link parentId
  let linked = 0;
  for (const unit of ORG_STRUCTURE) {
    if (!unit.parentCode) continue;
    const unitId = codeToId.get(unit.code);
    const parentId = codeToId.get(unit.parentCode);
    if (unitId && parentId) {
      await client.query('UPDATE "OrganizationUnit" SET "parentId"=$1 WHERE id=$2', [parentId, unitId]);
      linked++;
    }
  }

  const count = await client.query('SELECT count(*) as c FROM "OrganizationUnit" WHERE "tenantId"=$1', [tenantId]);
  console.log(`\n🎉 Done! Inserted: ${inserted}, Linked: ${linked}, Total: ${count.rows[0].c}`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
