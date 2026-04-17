import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

async function seedFiscalYear(tenantId, code, name, year) {
  const existing = await client.query('SELECT id FROM "FiscalYear" WHERE "tenantId" = $1 AND code = $2', [tenantId, code]);
  if (existing.rows.length > 0) {
    console.log(`  skip: ${code} already exists`);
    return existing.rows[0].id;
  }
  const id = crypto.randomUUID();
  const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
  const isClosed = year < 2026;
  const isActive = !isClosed;

  await client.query(
    `INSERT INTO "FiscalYear" ("id", "tenantId", "code", "name", "startDate", "endDate", "isClosed", "isActive", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())`,
    [id, tenantId, code, name, startDate, endDate, isClosed, isActive]
  );

  // Generate 12 monthly periods
  let cursor = new Date(year, 0, 1, 0, 0, 0, 0); // Jan 1
  let periodNo = 1;
  const currentMonth = new Date().getMonth() + 1; // 1-based

  while (cursor <= endDate) {
    const pStart = new Date(cursor);
    const pEnd = endOfMonth(cursor);
    const finalEnd = pEnd > endDate ? endDate : pEnd;

    // For current year: close past months (before current month), keep current + future open
    let isOpen = isActive;
    if (year === 2026) {
      isOpen = periodNo >= currentMonth; // Apr (4) onwards are open
    }

    const pid = crypto.randomUUID();
    await client.query(
      `INSERT INTO "AccountingPeriod" ("id", "tenantId", "fiscalYearId", "periodNo", "startDate", "endDate", "isOpen", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
      [pid, tenantId, id, periodNo, pStart, finalEnd, isOpen]
    );

    periodNo++;
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }

  console.log(`  ✓ ${code} | ${name} | isClosed: ${isClosed} | ${periodNo - 1} periods`);
  return id;
}

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Fiscal Years & Accounting Periods for tenant: ${tenantId}`);

  // 1. Inject permissions
  const allPerms = [
    'core.fiscal_year.read', 'core.fiscal_year.create', 'core.fiscal_year.close',
    'finance.fiscal.read', 'finance.fiscal.create', 'finance.fiscal.close',
    'finance.period.read', 'finance.period.open', 'finance.period.close',
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

  // 2. Seed FY2021–FY2027 (canonical format FY+YEAR)
  const years = [
    { code: 'FY2021', name: 'Tahun Fiskal 2021', year: 2021 },
    { code: 'FY2022', name: 'Tahun Fiskal 2022', year: 2022 },
    { code: 'FY2023', name: 'Tahun Fiskal 2023', year: 2023 },
    { code: 'FY2024', name: 'Tahun Fiskal 2024', year: 2024 },
    { code: 'FY2025', name: 'Tahun Fiskal 2025', year: 2025 },
    { code: 'FY2026', name: 'Tahun Fiskal 2026', year: 2026 },
    { code: 'FY2027', name: 'Tahun Fiskal 2027', year: 2027 },
  ];

  for (const fy of years) {
    await seedFiscalYear(tenantId, fy.code, fy.name, fy.year);
  }

  const count = await client.query('SELECT count(*) as c FROM "FiscalYear" WHERE "tenantId" = $1', [tenantId]);
  const pcount = await client.query('SELECT count(*) as c FROM "AccountingPeriod" WHERE "tenantId" = $1', [tenantId]);
  console.log(`\n🎉 Done! Total FiscalYears: ${count.rows[0].c}, AccountingPeriods: ${pcount.rows[0].c}`);

  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
