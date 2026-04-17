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
  const { tenantId } = userRes.rows[0];

  console.log(`Seeding Cost Center Allocations for tenant: ${tenantId}`);

  const periodRes = await client.query(
    'SELECT id, "periodNo", "startDate" FROM "AccountingPeriod" WHERE "tenantId" = $1 AND "isOpen" = true ORDER BY "startDate" DESC LIMIT 12',
    [tenantId]
  );
  const ccRes = await client.query(
    'SELECT id, code, name FROM "CostCenter" WHERE "tenantId" = $1 AND "isActive" = true LIMIT 10',
    [tenantId]
  );

  const periods = periodRes.rows;
  const costCenters = ccRes.rows;

  if (periods.length === 0) {
    console.log('No open accounting periods found. Please run seed_fiscal_pg.mjs first.');
    await client.end();
    return;
  }
  if (costCenters.length === 0) {
    console.log('No cost centers found. Please run seed_cost_profit_center_pg.mjs first.');
    await client.end();
    return;
  }

  const allocations = [];
  const accountCodes = ['5000', '5100', '5200', '6000', '6100', '6200'];
  const now = new Date();

  for (let month = 0; month < Math.min(periods.length, 6); month++) {
    const period = periods[month];
    
    for (const cc of costCenters.slice(0, 5)) {
      const allocatedAmount = Math.floor((Math.random() * 50000000 + 10000000) / 1000) * 1000;
      const accountCode = accountCodes[Math.floor(Math.random() * accountCodes.length)];
      
      allocations.push({
        periodId: period.id,
        costCenterId: cc.id,
        accountCode,
        allocatedAmount,
        referenceNo: `CCA-${period.periodNo}-${cc.code}`,
        description: `Alokasi biaya ${cc.name} periode ${period.periodNo}`
      });
    }
  }

  let seeded = 0;
  for (const a of allocations) {
    try {
      await client.query(
        `INSERT INTO "CostCenterAllocation" (
          "id", "tenantId", "periodId", "costCenterId", "accountCode",
          "allocatedAmount", "referenceNo", "description", "createdAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
        ON CONFLICT DO NOTHING
        `,
        [
          crypto.randomUUID(),
          tenantId,
          a.periodId,
          a.costCenterId,
          a.accountCode,
          a.allocatedAmount,
          a.referenceNo,
          a.description
        ]
      );
      seeded++;
    } catch (e) {
      console.error('Error:', e.message);
    }
  }

  console.log(`Seeded ${seeded} cost center allocations!`);
  await client.end();
}

main().catch(console.error);