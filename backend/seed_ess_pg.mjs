import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// KPI Grading logic
function getGrade(score) {
  if (score >= 90) return 'A (Sangat Baik)';
  if (score >= 80) return 'B (Baik)';
  if (score >= 70) return 'C (Cukup)';
  if (score >= 60) return 'D (Kurang)';
  return 'E (Buruk)';
}

function generateKpiComments(grade, dept) {
  if (grade.startsWith('A')) return 'Pencapaian luar biasa. Target ' + dept + ' terlampaui dengan efisiensi tinggi.';
  if (grade.startsWith('B')) return 'Kinerja baik dan stabil. Terus pertahankan konsistensi operasional.';
  if (grade.startsWith('C')) return 'Kinerja standar. Perlu peningkatan inisiatif dan manajemen waktu.';
  return 'Perlu evaluasi kinerja dan pembinaan (coaching) intensif.';
}

const EXPENSE_CATEGORIES = ['MEDICAL', 'TRANSPORT', 'ENTERTAINMENT', 'SUPPLIES', 'TRAVEL'];

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (!userRes.rows.length) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding KPI and Expenses for tenant: ${tenantId}`);

  // 1. Permissions
  const allPerms = [
    'hris.kpi.read', 'hris.kpi.create', 'hris.kpi.approve',
    'hris.expense.read', 'hris.expense.create', 'hris.expense.approve',
    'hris.ess.read'
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

  // Load employees
  const empRes = await client.query('SELECT id, "employeeNo", "firstName", department FROM "Employee" WHERE "tenantId"=$1 AND status=\'ACTIVE\'', [tenantId]);
  const employees = empRes.rows;

  let kpiCount = 0;
  let expCount = 0;

  // 2. Seed KPI Evaluations (2 periods: 2025-H2, 2026-Q1)
  const PERIODS = ['2025-H2', '2026-Q1'];
  for (const emp of employees) {
    for (const period of PERIODS) {
      const ex = await client.query('SELECT id FROM "KpiEvaluation" WHERE "tenantId"=$1 AND "employeeId"=$2 AND period=$3', [tenantId, emp.id, period]);
      if (ex.rows.length > 0) continue;

      const score = Math.floor(Math.random() * 25 + 72); // 72 to 96
      const grade = getGrade(score);
      const comments = generateKpiComments(grade, emp.department);

      await client.query(
        `INSERT INTO "KpiEvaluation" ("id","tenantId","employeeId","period","score","grade","comments","status","createdAt")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())`,
        [crypto.randomUUID(), tenantId, emp.id, period, score, grade, comments, 'APPROVED']
      );
      kpiCount++;
    }

    // 3. Seed Expense Claims
    // 1–3 claims per employee
    const numClaims = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numClaims; i++) {
      const claimNo = `EXP-${periodNumber()}-${Math.floor(Math.random() * 9000 + 1000)}`;
      
      const ex = await client.query('SELECT id FROM "ExpenseClaim" WHERE "tenantId"=$1 AND "claimNo"=$2', [tenantId, claimNo]);
      if (ex.rows.length > 0) continue;

      const claimsStatusArr = ['APPROVED', 'APPROVED', 'PENDING', 'REJECTED'];
      const st = claimsStatusArr[Math.floor(Math.random() * claimsStatusArr.length)];
      
      let amount = 0;
      let cat = EXPENSE_CATEGORIES[Math.floor(Math.random() * EXPENSE_CATEGORIES.length)];
      let desc = '';

      if (cat === 'MEDICAL') { amount = Math.floor(Math.random() * 20) * 50000 + 100000; desc = 'Klaim rawat jalan RS/Klinik'; }
      if (cat === 'TRANSPORT') { amount = Math.floor(Math.random() * 10) * 20000 + 50000; desc = 'Taksi/Bensin visit outlet lapangan'; }
      if (cat === 'ENTERTAINMENT') { amount = Math.floor(Math.random() * 10) * 100000 + 500000; desc = 'Meeting klien / vendor F&B di restoran'; }
      if (cat === 'SUPPLIES') { amount = Math.floor(Math.random() * 5) * 50000 + 50000; desc = 'Beli perlengkapan lab/produksi mendesak'; }
      if (cat === 'TRAVEL') { amount = Math.floor(Math.random() * 20) * 100000 + 1000000; desc = 'Perjalanan dinas ke luar kota'; }

      const daysAgo = Math.floor(Math.random() * 60);
      const claimDate = new Date();
      claimDate.setDate(claimDate.getDate() - daysAgo);

      await client.query(
        `INSERT INTO "ExpenseClaim" ("id","tenantId","employeeId","claimNo","claimDate","amount","description","category","status","createdAt")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())`,
        [crypto.randomUUID(), tenantId, emp.id, claimNo, claimDate.toISOString(), amount, desc, cat, st]
      );
      expCount++;
    }
  }

  console.log(`\n🎉 Done! Seeded ${kpiCount} KPI Evaluations and ${expCount} Expense Claims.`);
  await client.end();
}

function periodNumber() {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}`;
}

main().catch(e => { console.error(e.message); client.end(); });
