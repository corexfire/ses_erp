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

  console.log(`Seeding Finance Reports Data & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.report.read'
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

  // 2. ENSURE CHART OF ACCOUNTS (COA)
  const defaultCoas = [
    { code: '1110-00', name: 'Cash on Hand', type: 'ASSET' },
    { code: '1120-00', name: 'Bank Account - Operasional', type: 'ASSET' },
    { code: '1140-00', name: 'Account Receivable (AR)', type: 'ASSET' },
    { code: '1150-00', name: 'Inventory Assets', type: 'ASSET' },
    { code: '1180-00', name: 'Input VAT / Tax', type: 'ASSET' },
    { code: '2110-00', name: 'Account Payable (AP)', type: 'LIABILITY' },
    { code: '2130-00', name: 'Value Added Tax (VAT)', type: 'LIABILITY' },
    { code: '3110-00', name: 'Retained Earnings', type: 'EQUITY' },
    { code: '4110-00', name: 'Sales Revenue', type: 'INCOME' },
    { code: '4120-00', name: 'Other Income', type: 'INCOME' },
    { code: '5110-00', name: 'Inventory / Purchase Expense', type: 'EXPENSE' },
    { code: '6110-00', name: 'Operational Utilities', type: 'EXPENSE' },
    { code: '6120-00', name: 'Payroll Expense', type: 'EXPENSE' },
    { code: '6130-00', name: 'Marketing Expense', type: 'EXPENSE' }
  ];

  for (const coa of defaultCoas) {
      if (!coa.id) coa.id = crypto.randomUUID();
      try {
        await client.query(
            `INSERT INTO "CoaAccount" ("id", "tenantId", "code", "name", "type", "isPosting", "isActive", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, true, true, NOW(), NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
            [coa.id, tenantId, coa.code, coa.name, coa.type]
        );
      } catch (e) {
          console.log(`Failed inserting COA ${coa.code}`);
      }
  }

  // 3. SEED JOURNAL ENTRIES FOR REPORTING (Balance Sheet & Profit Loss)
  // Check if we already have enough Journal Entries
  const jeCheck = await client.query('SELECT count(*) as count FROM "JournalEntry" WHERE "tenantId" = $1', [tenantId]);
  
  if (parseInt(jeCheck.rows[0].count) < 20) {
      console.log('Seeding 40 Synthetic Journal Entries for Reports...');
      for (let i = 0; i < 40; i++) {
          const isSale = i % 2 !== 0;
          const jeId = crypto.randomUUID();
          
          let month = Math.floor(Math.random() * 12) + 1;
          let year = 2026;
          // Mostly recent months
          if (i > 10) month = new Date().getMonth() + 1;
          
          const entryDate = `${year}-${String(month).padStart(2, '0')}-` + String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
          const amount = Math.floor(Math.random() * 50000000) + 1000000;
          const rndNo = String(Math.floor(Math.random() * 9000) + 1000);
          
          let type = isSale ? 'SALES' : 'PURCHASE';
          if (i % 5 === 0) type = 'GENERAL';
          
          const entryNo = `JE-${type.substring(0, 2)}-${year}${String(month).padStart(2, '0')}-${rndNo}`;

          await client.query(
            `INSERT INTO "JournalEntry" ("id", "tenantId", "entryNo", "entryDate", "description", "journalType", "status", "totalDebit", "totalCredit", "createdAt", "updatedAt") 
             VALUES ($1, $2, $3, $4, $5, $6, 'POSTED', $7, $8, NOW(), NOW())
             ON CONFLICT ("tenantId", "entryNo") DO NOTHING`,
            [jeId, tenantId, entryNo, `Report Seeder ${type} Activity`, type, amount, amount]
          );

          if (isSale) {
             // Debit AR (1140-00), Credit Sales Rev (4110-00)
             await client.query(
                `INSERT INTO "JournalEntryLine" ("id", "tenantId", "journalEntryId", "lineNo", "accountCode", "debit", "credit") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [crypto.randomUUID(), tenantId, jeId, 1, '1140-00', amount, 0]
             );
             await client.query(
                `INSERT INTO "JournalEntryLine" ("id", "tenantId", "journalEntryId", "lineNo", "accountCode", "debit", "credit") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [crypto.randomUUID(), tenantId, jeId, 2, '4110-00', 0, amount]
             );
          } else if (type === 'PURCHASE') {
             // Debit Exp (5110-00), Credit AP (2110-00)
             await client.query(
                `INSERT INTO "JournalEntryLine" ("id", "tenantId", "journalEntryId", "lineNo", "accountCode", "debit", "credit") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [crypto.randomUUID(), tenantId, jeId, 1, '5110-00', amount, 0]
             );
             await client.query(
                `INSERT INTO "JournalEntryLine" ("id", "tenantId", "journalEntryId", "lineNo", "accountCode", "debit", "credit") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [crypto.randomUUID(), tenantId, jeId, 2, '2110-00', 0, amount]
             );
          } else {
             // Payroll / Operation. Debit Exp (6120-00), Credit Cash (1110-00)
             await client.query(
                `INSERT INTO "JournalEntryLine" ("id", "tenantId", "journalEntryId", "lineNo", "accountCode", "debit", "credit") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [crypto.randomUUID(), tenantId, jeId, 1, '6120-00', amount, 0]
             );
             await client.query(
                `INSERT INTO "JournalEntryLine" ("id", "tenantId", "journalEntryId", "lineNo", "accountCode", "debit", "credit") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [crypto.randomUUID(), tenantId, jeId, 2, '1110-00', 0, amount]
             );
          }
      }
      console.log('✅ Seeded 40 Synthetic Journal Entries for Reports!');
  } else {
      console.log('✅ Journal Entries already exist. Skipping payload generation.');
  }

  await client.end();
}

main().catch(console.error);
