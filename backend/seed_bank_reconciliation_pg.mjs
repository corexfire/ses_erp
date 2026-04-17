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

  console.log(`Seeding Bank Reconciliations & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.bankReconciliation.read',
    'finance.bankReconciliation.create',
    'finance.bankReconciliation.approve',
    'finance.bankReconciliation.delete'
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

  // 2. CHECK OR CREATE BANK ACCOUNTS
  let bankRes = await client.query('SELECT "id", "name", "balance" FROM "BankAccount" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
  let banks = bankRes.rows;

  if (banks.length === 0) {
      console.log('No BankAccounts found. Creating default Corporate Bank Accounts...');
      const samples = [
          { name: 'BCA Giro Utama Pabrik', balance: 500000000 },
          { name: 'Mandiri Operasional', balance: 150000000 },
          { name: 'BNI Payroll Karyawan', balance: 250000000 }
      ];
      for(const s of samples) {
          const sId = crypto.randomUUID();
          await client.query(
            `INSERT INTO "BankAccount" ("id", "tenantId", "name", "accountNo", "bankName", "balance", "isActive", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $6, true, NOW(), NOW())`,
            [sId, tenantId, s.name, String(Math.floor(Math.random() * 90000000) + 10000000), s.name.split(' ')[0], s.balance]
          );
      }
      bankRes = await client.query('SELECT "id", "name", "balance" FROM "BankAccount" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
      banks = bankRes.rows;
  }

  // 3. SEED BANK RECONCILIATIONS
  for (let i = 0; i < 40; i++) {
        const b = banks[Math.floor(Math.random() * banks.length)];
        
        const recId = crypto.randomUUID();
        
        // Month end dates for realistic reconciliation
        const year = 2026;
        const month = String((i % 12) + 1).padStart(2, '0');
        const reconcileDate = `${year}-${month}-28`;
        const statementDate = `${year}-${month}-28`;

        // Create realistic balances based on the current system balance
        const bookBalance = Number(b.balance);
        let statementBalance = bookBalance;
        
        // Introduce variances 40% of the time (Unrecorded bank fees, pending clearing)
        if (i % 3 === 0) {
            const variance = Math.floor(Math.random() * 500000) + 50000;
            // Statement balance might be lower due to bank admin fees, or higher due to interest
            statementBalance = i % 2 === 0 ? bookBalance - variance : bookBalance + variance;
        }

        const difference = statementBalance - bookBalance;
        let status = 'APPROVED';
        if (i % 4 === 0) status = 'DRAFT';

        try {
            await client.query(
                `INSERT INTO "BankReconciliation" ("id", "tenantId", "bankAccountId", "reconcileDate", "statementDate", "statementBalance", "bookBalance", "difference", "status", "createdAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
                [recId, tenantId, b.id, reconcileDate, statementDate, statementBalance, bookBalance, difference, status]
            );
            console.log(`✅ Seeded Bank Reconciliation: ${b.name} | Diff: ${difference}`);
        } catch (e) {
            console.error(`Failed:`, e.message);
        }
    }

  await client.end();
}

main().catch(console.error);
