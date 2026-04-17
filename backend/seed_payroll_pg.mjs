import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

// Indonesian Payroll component rates (realistic F&B 2025)
const BPJS_KES_EMP = 0.01;      // 1% employee
const BPJS_KES_EMP_MAX = 12_000_000; // max salary cap for BPJS KES employee
const BPJS_TK_JHT_EMP = 0.02;   // 2% JHT employee
const BPJS_TK_JP_EMP = 0.01;    // 1% JP employee (Jaminan Pensiun)
const TRANSPORT_ALLOWANCE = 900_000;   // Uang transport standard
const MEAL_ALLOWANCE = 1_500_000;      // Uang makan
const PHONE_ALLOWANCE_MGMT = 500_000; // Pulsa untuk manager ke atas

// UMR DKI Jakarta 2025
const UMR_DKI = 5_396_761;

function calcPPh21TER(grossPay) {
  // TER (Tarif Efektif Rata-rata) PP 58/2023 simplified:
  if (grossPay <= 5_400_000) return 0;
  if (grossPay <= 5_650_000) return grossPay * 0.0025;
  if (grossPay <= 5_950_000) return grossPay * 0.005;
  if (grossPay <= 6_300_000) return grossPay * 0.0075;
  if (grossPay <= 6_750_000) return grossPay * 0.01;
  if (grossPay <= 7_500_000) return grossPay * 0.0125;
  if (grossPay <= 8_550_000) return grossPay * 0.015;
  if (grossPay <= 9_650_000) return grossPay * 0.0175;
  if (grossPay <= 10_050_000) return grossPay * 0.02;
  if (grossPay <= 10_350_000) return grossPay * 0.0225;
  if (grossPay <= 10_700_000) return grossPay * 0.025;
  if (grossPay <= 11_050_000) return grossPay * 0.03;
  if (grossPay <= 11_600_000) return grossPay * 0.035;
  if (grossPay <= 12_500_000) return grossPay * 0.04;
  if (grossPay <= 14_150_000) return grossPay * 0.05;
  if (grossPay <= 16_000_000) return grossPay * 0.06;
  if (grossPay <= 18_450_000) return grossPay * 0.07;
  if (grossPay <= 21_850_000) return grossPay * 0.08;
  if (grossPay <= 26_000_000) return grossPay * 0.09;
  if (grossPay <= 27_700_000) return grossPay * 0.10;
  if (grossPay <= 29_350_000) return grossPay * 0.11;
  if (grossPay <= 31_450_000) return grossPay * 0.12;
  if (grossPay <= 33_950_000) return grossPay * 0.13;
  if (grossPay <= 37_100_000) return grossPay * 0.14;
  if (grossPay <= 41_100_000) return grossPay * 0.15;
  if (grossPay <= 45_800_000) return grossPay * 0.16;
  if (grossPay <= 51_400_000) return grossPay * 0.17;
  if (grossPay <= 58_500_000) return grossPay * 0.18;
  if (grossPay <= 67_900_000) return grossPay * 0.19;
  if (grossPay <= 80_200_000) return grossPay * 0.20;
  return grossPay * 0.34; // bracket tertinggi
}

function buildPayroll(emp, period, status) {
  const basic = Number(emp.salary);
  const isManager = basic >= 20_000_000;
  const isDirector = basic >= 50_000_000;

  // Allowances
  const transport = TRANSPORT_ALLOWANCE;
  const meal = MEAL_ALLOWANCE;
  const phone = (isManager || isDirector) ? PHONE_ALLOWANCE_MGMT : 0;
  const positionAllowance = isDirector ? 5_000_000 : isManager ? 2_500_000 : 0;
  const nightShiftAllowance = emp.department === 'Produksi' ? 300_000 : 0;
  const allowances = transport + meal + phone + positionAllowance + nightShiftAllowance;

  const grossPay = basic + allowances;

  // Deductions
  const bpjsKes = Math.min(basic, BPJS_KES_EMP_MAX) * BPJS_KES_EMP;
  const bpjsJHT = basic * BPJS_TK_JHT_EMP;
  const bpjsJP = Math.min(basic, 9_559_600) * BPJS_TK_JP_EMP; // JP cap 2025
  const taxAmount = Math.round(calcPPh21TER(grossPay));
  const totalDeductions = bpjsKes + bpjsJHT + bpjsJP;
  const netPay = grossPay - totalDeductions - taxAmount;

  return { basic, allowances, grossPay, deductions: totalDeductions, taxAmount, netPay, status };
}

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (!userRes.rows.length) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Payroll for tenant: ${tenantId}`);

  // 1. Permissions
  const allPerms = [
    'hris.payroll.read', 'hris.payroll.create', 'hris.payroll.approve',
    'hris.payroll.delete', 'hris.ess.read',
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

  // 2. Load employees with salary
  const empRes = await client.query(
    'SELECT id, "employeeNo", "firstName", department, salary FROM "Employee" WHERE "tenantId"=$1 AND status=\'ACTIVE\' AND salary IS NOT NULL',
    [tenantId]
  );
  const employees = empRes.rows;

  // 3. Generate 6 months of payroll (Jan–Jun 2026) for all employees
  const PERIODS = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'];
  let inserted = 0;

  for (const emp of employees) {
    for (let i = 0; i < PERIODS.length; i++) {
      const period = PERIODS[i];
      const ex = await client.query(
        'SELECT id FROM "PayrollRun" WHERE "tenantId"=$1 AND "employeeId"=$2 AND period=$3',
        [tenantId, emp.id, period]
      );
      if (ex.rows.length > 0) continue;

      const isCurrentMonth = period === '2026-06';
      const status = isCurrentMonth ? 'DRAFT' : (i < 4 ? 'APPROVED' : 'PROCESSED');
      const pay = buildPayroll(emp, period, status);

      // payDate = last day of month for approved
      let payDate = null;
      if (status !== 'DRAFT') {
        const [y, m] = period.split('-').map(Number);
        payDate = new Date(y, m, 0); // last day of month
      }

      await client.query(
        `INSERT INTO "PayrollRun"
         ("id","tenantId","employeeId","period","basicSalary","allowances","deductions","grossPay","netPay","taxAmount","status","payDate","createdAt")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW())`,
        [
          crypto.randomUUID(), tenantId, emp.id, period,
          pay.basic, pay.allowances, pay.deductions,
          pay.grossPay, pay.netPay, pay.taxAmount,
          pay.status, payDate
        ]
      );
      inserted++;
    }
    process.stdout.write('.');
  }

  const total = await client.query('SELECT count(*) as c, sum("netPay") as total FROM "PayrollRun" WHERE "tenantId"=$1', [tenantId]);
  const byStatus = await client.query('SELECT status, count(*) as c FROM "PayrollRun" WHERE "tenantId"=$1 GROUP BY status', [tenantId]);
  console.log(`\n\n🎉 Done! Inserted: ${inserted}`);
  console.log(`📊 Total records: ${total.rows[0].c}, Total NetPay all time: Rp${Number(total.rows[0].total).toLocaleString('id-ID')}`);
  for (const r of byStatus.rows) console.log(`  ${r.status}: ${r.c}`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
