import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Finance Fiscal Years & Periods for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.fiscal.read',
    'finance.fiscal.create',
    'finance.fiscal.close',
    'finance.period.read',
    'finance.period.close',
    'finance.period.open'
  ];

  for (const key of perms) {
     const pId = crypto.randomUUID();
     await client.query(`INSERT INTO "Permission" (id, key, description, "createdAt") VALUES ($1, $2, $3, NOW()) ON CONFLICT (key) DO NOTHING`, [pId, key, 'Perm for ' + key]);
  }

  const roleRes = await client.query('SELECT id FROM "Role"');
  for (const r of roleRes.rows) {
     for (const key of perms) {
       const prps = await client.query('SELECT id FROM "Permission" WHERE key = $1', [key]);
       if (prps.rows.length > 0) {
          try {
            await client.query(`INSERT INTO "RolePermission" ("roleId", "permissionId") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [r.id, prps.rows[0].id]);
          } catch(e) {}
       }
     }
  }
  console.log('✅ Permissions injected to ALL ROLES!');

  // 2. SEED FISCAL YEARS (2024, 2025, 2026)
  const years = [2024, 2025, 2026];

  for (const year of years) {
      // Check if exists
      const existRes = await client.query('SELECT id FROM "FiscalYear" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, `FY-${year}`]);
      if (existRes.rows.length > 0) {
          console.log(`Fiscal Year FY-${year} already exists.`);
          continue;
      }

      const fyId = crypto.randomUUID();
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      
      const isClosed = year < 2026; // 2024 & 2025 are already closed

      await client.query(
          `INSERT INTO "FiscalYear" ("id", "tenantId", "code", "name", "startDate", "endDate", "isClosed", "isActive", "createdAt", "updatedAt") 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())`,
          [fyId, tenantId, `FY-${year}`, `Fiscal Year ${year}`, startDate, endDate, isClosed, true]
      );

      // Create 12 Periods for this year
      for (let i = 1; i <= 12; i++) {
          const pId = crypto.randomUUID();
          
          const pStart = new Date(`${year}-${String(i).padStart(2, '0')}-01`);
          const pEnd = new Date(pStart);
          pEnd.setMonth(pEnd.getMonth() + 1);
          pEnd.setDate(pEnd.getDate() - 1);

          // If year is closed, all periods are closed. If year is 2026, close first few months based on current month (Assuming we are in Apr 2026)
          let periodOpen = !isClosed;
          if (year === 2026 && i < 4) {
             periodOpen = false; // Jan, Feb, Mar are already calculated and closed
          }

          await client.query(
              `INSERT INTO "AccountingPeriod" ("id", "tenantId", "fiscalYearId", "periodNo", "startDate", "endDate", "isOpen", "createdAt", "updatedAt") 
               VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
              [pId, tenantId, fyId, i, pStart.toISOString(), pEnd.toISOString(), periodOpen]
          );
      }

      console.log(`✅ Seeded Fiscal Year ${year} with 12 Periods.`);
  }

  await client.end();
}

main().catch(console.error);
