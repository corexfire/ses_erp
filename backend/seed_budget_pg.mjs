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

  console.log(`Seeding Finance Budget & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.budget.read',
    'finance.budget.create',
    'finance.budget.update',
    'finance.budget.approve',
    'finance.budget.delete'
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

  // 2. FETCH COST CENTERS (IF ANY, from previous phases) OR CREATE THEM
  let ccRes = await client.query('SELECT "id", "code" FROM "CostCenter" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
  let costCenters = ccRes.rows;

  if (costCenters.length === 0) {
      console.log('No CostCenters found. Creating default F&B branches...');
      const branches = [
          { code: 'B-JKT-01', name: 'Cabang Jakarta Pusat' },
          { code: 'B-BDG-01', name: 'Cabang Bandung Pasteur' },
          { code: 'B-SBY-01', name: 'Pabrik Surabaya Tandes' }
      ];
      for(const b of branches) {
          const bId = crypto.randomUUID();
          await client.query(
            `INSERT INTO "CostCenter" ("id", "tenantId", "code", "name", "isActive", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, true, NOW(), NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
            [bId, tenantId, b.code, b.name]
          );
      }
      ccRes = await client.query('SELECT "id", "code" FROM "CostCenter" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
      costCenters = ccRes.rows;
  }

  // 3. SEED BUDGETS FOR FY 2026
  const fiscalYear = 2026;
  const budgetSpecs = [
      { acc: '6101', name: 'Budget Bahan Baku Produksi Roti', amount: 4500000000, spent: 1250000000, status: 'APPROVED' },
      { acc: '6201', name: 'Gaji Karyawan Pabrik', amount: 1200000000, spent: 300000000, status: 'APPROVED' },
      { acc: '6305', name: 'Beban Operasional Mesin (Maintenance)', amount: 250000000, spent: 45000000, status: 'APPROVED' },
      { acc: '7100', name: 'Beban Marketing Digital & Billboard', amount: 850000000, spent: 850000000, status: 'APPROVED' }, // Maxed Out
      { acc: '7200', name: 'Beban Sewa Gudang Tambahan', amount: 150000000, spent: 0, status: 'DRAFT' },
      { acc: '6102', name: 'Beban Riset Produk Baru (R&D)', amount: 500000000, spent: 75000000, status: 'APPROVED' }
  ];

  for (let i = 0; i < budgetSpecs.length; i++) {
        const spec = budgetSpecs[i];
        const budgetId = crypto.randomUUID();
        const budgetNo = `B-FA-${fiscalYear}-${String(i + 1).padStart(3, '0')}`;
        
        let ccId = null;
        if (costCenters.length > 0) {
            ccId = costCenters[Math.floor(Math.random() * costCenters.length)].id;
        }

        try {
            await client.query(
                `INSERT INTO "Budget" ("id", "tenantId", "budgetNo", "fiscalYear", "accountCode", "costCenterId", "amount", "spentAmount", "status", "createdAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
                [budgetId, tenantId, budgetNo, fiscalYear, spec.acc, ccId, spec.amount, spec.spent, spec.status]
            );
            console.log(`✅ Seeded Budget: ${budgetNo} | Acc: ${spec.acc} | Amount: Rp${spec.amount}`);
        } catch (e) {
            console.error(`Failed on Budget ${budgetNo}:`, e.message);
        }
  }

  await client.end();
}

main().catch(console.error);
