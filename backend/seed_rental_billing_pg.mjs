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

  console.log(`Seeding Rental Billings for tenant: ${tenantId}`);

  const contractRes = await client.query(
    'SELECT id, "contractNo", "customerId" FROM "RentalContract" WHERE "tenantId" = $1 AND "status" = \'ACTIVE\'',
    [tenantId]
  );
  const contracts = contractRes.rows;

  if (contracts.length === 0) {
    console.log('No active contracts found. Please run seed_rental_contracts_pg.mjs first.');
    await client.end();
    return;
  }

  const billings = [];
  const now = new Date();
  
  for (const contract of contracts) {
    const customerId = contract.customerId;
    let rentalRate = 15000000;
    if (contract.contractNo.includes('002')) rentalRate = 25000000;
    else if (contract.contractNo.includes('003')) rentalRate = 8500000;
    else if (contract.contractNo.includes('004')) rentalRate = 50000000;
    
    for (let month = 0; month < 6; month++) {
      const periodStart = new Date(now.getFullYear(), now.getMonth() - month, 1);
      const periodEnd = new Date(now.getFullYear(), now.getMonth() - month + 1, 0);
      const dueDate = new Date(periodEnd);
      dueDate.setDate(dueDate.getDate() + 7);
      
      let status = 'UNPAID';
      if (month > 2) status = 'PAID';
      else if (month === 2 && Math.random() > 0.5) status = 'PAID';
      else if (month < 2 && dueDate < now) status = 'OVERDUE';
      
      const amount = rentalRate;
      const taxAmount = Math.round(amount * 0.11);
      const totalAmount = amount + taxAmount;
      
      billings.push({
        contractId: contract.id,
        contractNo: contract.contractNo,
        customerId,
        periodStart,
        periodEnd,
        dueDate,
        amount,
        taxAmount,
        totalAmount,
        status,
        month
      });
    }
  }

  for (const b of billings) {
    const billingNo = `RB-${now.getFullYear()}-${String(b.month + 1).padStart(2, '0')}-${b.contractNo.split('-')[2]}`;
    
    try {
      const id = crypto.randomUUID();
      await client.query(
        `INSERT INTO "RentalBilling" (
          "id", "tenantId", "billingNo", "contractId", "customerId",
          "periodStart", "periodEnd", "dueDate", "amount", "taxAmount",
          "totalAmount", "status", "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
        ON CONFLICT ("tenantId", "billingNo") DO UPDATE SET
          "status" = EXCLUDED."status",
          "totalAmount" = EXCLUDED."totalAmount"
        `,
        [
          id,
          tenantId,
          billingNo,
          b.contractId,
          b.customerId,
          b.periodStart,
          b.periodEnd,
          b.dueDate,
          b.amount,
          b.taxAmount,
          b.totalAmount,
          b.status
        ]
      );
      console.log(`Seeded: ${billingNo} - ${b.status} - Rp ${b.totalAmount}`);
    } catch (e) {
      console.error(`Error seeding ${billingNo}:`, e.message);
    }
  }

  console.log('Rental billing seeding complete!');
  await client.end();
}

main().catch(console.error);