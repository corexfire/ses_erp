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

  console.log(`Seeding Customer Receipts & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.customerReceipt.read',
    'finance.customerReceipt.create',
    'finance.customerReceipt.approve',
    'finance.customerReceipt.delete'
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

  // 2. CHECK OR CREATE CUSTOMERS
  let custRes = await client.query('SELECT "id", "code", "name" FROM "Customer" WHERE "tenantId" = $1 LIMIT 10', [tenantId]);
  let customers = custRes.rows;

  if (customers.length === 0) {
      console.log('No Customers found. Creating default F&B Sales customers...');
      const samples = [
          { code: 'C-RTL01', name: 'PT Lion Superindo' },
          { code: 'C-DIS02', name: 'CV Makmur Jaya Distributor Jatim' },
          { code: 'C-RTL03', name: 'Alfamart (PT Sumber Alfaria Trijaya)' },
          { code: 'C-HRC04', name: 'HORECA Group - JS Luwansa Hotel' },
          { code: 'C-EXP05', name: 'Malaysian Food Import Co.' }
      ];
      for(const s of samples) {
          const sId = crypto.randomUUID();
          await client.query(
            `INSERT INTO "Customer" ("id", "tenantId", "code", "name", "isActive", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, true, NOW(), NOW())`,
            [sId, tenantId, s.code, s.name]
          );
      }
      custRes = await client.query('SELECT "id", "code", "name" FROM "Customer" WHERE "tenantId" = $1 LIMIT 10', [tenantId]);
      customers = custRes.rows;
  }

  // 3. SEED CUSTOMER RECEIPTS
  const templates = [
      { notes: "Pelunasan Tagihan Pengiriman Bulan Maret", min: 150000000, max: 850000000 },
      { notes: "Pembayaran DP 30% PO Ekspor", min: 50000000, max: 250000000 },
      { notes: "Pembayaran Tunai Cash On Delivery", min: 5000000, max: 25000000 },
      { notes: "Setoran Cicilan Piutang Tertunggak", min: 100000000, max: 350000000 },
      { notes: "Penerimaan Retensi Supermarket 5%", min: 25000000, max: 75000000 },
      { notes: "Realisasi BG (Bilyet Giro) Jatuh Tempo", min: 60000000, max: 420000000 },
      { notes: "Penerimaan Tunai Sales Kanvaser (Sore)", min: 10000000, max: 30000000 }
  ];

  for (let i = 0; i < 40; i++) {
        const template = templates[i % templates.length];
        const amount = Math.floor(Math.random() * ((template.max - template.min) / 100000)) * 100000 + template.min;
        const c = customers[Math.floor(Math.random() * customers.length)];
        
        const recId = crypto.randomUUID();
        const recNo = `CR-${String(7001 + i).padStart(4, '0')}`;
        const refNo = `AR-${Math.floor(Math.random() * 90000) + 10000}/IX/26`;

        const day = String((i % 28) + 1).padStart(2, '0');
        const date = `2026-04-${day}`;
        let method = template.notes.includes("Tunai") ? 'CASH' : 'BANK_TRANSFER';
        
        let status = 'POSTED';
        if (i % 7 === 0) status = 'CANCELLED';

        try {
            await client.query(
                `INSERT INTO "CustomerReceipt" ("id", "tenantId", "receiptNo", "receiptDate", "customerCode", "amount", "paymentMethod", "reference", "notes", "status", "createdAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) ON CONFLICT ("tenantId", "receiptNo") DO NOTHING`,
                [recId, tenantId, recNo, date, c.code, amount, method, refNo, template.notes, status]
            );
            console.log(`✅ Seeded Customer Receipt: ${recNo} | ${refNo}`);
        } catch (e) {
            console.error(`Failed ${recNo}:`, e.message);
        }
    }

  await client.end();
}

main().catch(console.error);
