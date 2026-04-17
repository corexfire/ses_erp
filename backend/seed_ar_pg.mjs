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

  console.log(`Seeding Finance Account Receivable (AR) & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.ar.read',
    'finance.ar.create',
    'finance.ar.update',
    'finance.ar.delete',
    'finance.ar.payment'
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

  // 2. FETCH OR CREATE CUSTOMERS
  let custRes = await client.query('SELECT "code", "name" FROM "Customer" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
  let customers = custRes.rows;

  if (customers.length === 0) {
      console.log('No Customers found. Creating default F&B Customers...');
      const samples = [
          { code: 'CUST-001', name: 'PT Distributor Pangan Nusantara' },
          { code: 'CUST-002', name: 'CV Makmur Jaya Retail' },
          { code: 'CUST-003', name: 'Toko Agen Sumber Rezeki' }
      ];
      for(const s of samples) {
          const sId = crypto.randomUUID();
          await client.query(
            `INSERT INTO "Customer" ("id", "tenantId", "code", "name", "isActive", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, true, NOW(), NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
            [sId, tenantId, s.code, s.name]
          );
      }
      custRes = await client.query('SELECT "code", "name" FROM "Customer" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
      customers = custRes.rows;
  }

  // 3. SEED AR INVOICES
  for (let i = 0; i < 40; i++) {
        const c = customers[Math.floor(Math.random() * customers.length)];
        const invId = crypto.randomUUID();
        
        const year = 2026;
        const month = String((i % 12) + 1).padStart(2, '0');
        let day = Math.floor(Math.random() * 28) + 1;
        const invoiceDate = new Date(`${year}-${month}-${String(day).padStart(2, '0')}`);
        
        // Due 30 days after invoice
        const dueDate = new Date(invoiceDate);
        dueDate.setDate(dueDate.getDate() + 30);
        
        // Random amount 1 Juta to 50 Juta
        const totalAmount = Math.floor(Math.random() * 50000000) + 1000000;
        
        // Paid Amount Simulation
        let paidAmount = 0;
        let status = 'OPEN';
        
        const rndStatus = Math.random();
        if (rndStatus > 0.7) { 
           // 30% Lunas
           paidAmount = totalAmount;
           status = 'PAID';
        } else if (rndStatus > 0.4) {
           // 30% Partial DP
           paidAmount = Math.floor(totalAmount * 0.3);
           status = 'PARTIAL';
        }

        // If today is past due date and it's not paid...
        const today = new Date();
        if (today > dueDate && status !== 'PAID') {
           status = 'OVERDUE';
        }

        const invoiceNo = `AR-INV-${year}${month}-${String(i + 1).padStart(4, '0')}`;

        try {
            await client.query(
                `INSERT INTO "CustomerInvoice" ("id", "tenantId", "invoiceNo", "customerCode", "invoiceDate", "dueDate", "totalAmount", "paidAmount", "status", "createdAt", "updatedAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
                [invId, tenantId, invoiceNo, c.code, invoiceDate.toISOString(), dueDate.toISOString(), totalAmount, paidAmount, status]
            );

            // Seed invoice lines
            await client.query(
               `INSERT INTO "CustomerInvoiceLine" ("id", "tenantId", "invoiceId", "lineNo", "description", "qty", "unitPrice", "amount")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
               [crypto.randomUUID(), tenantId, invId, 1, `Pengiriman Barang Jadi Batch #${i}`, 50, (totalAmount / 50), totalAmount]
            );

            // Seed payments if there are any
            if (paidAmount > 0) {
               await client.query(
                 `INSERT INTO "CustomerInvoicePayment" ("id", "tenantId", "invoiceId", "paymentDate", "amount", "reference", "createdAt")
                  VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
                 [crypto.randomUUID(), tenantId, invId, new Date().toISOString(), paidAmount, `PAY-${invoiceNo}`]
               );
            }

            console.log(`✅ Seeded AR Invoice: ${invoiceNo} | Val: Rp${totalAmount} | Status: ${status}`);
        } catch (e) {
            console.error(`Failed on AR ${invoiceNo}:`, e.message);
        }
    }

  await client.end();
}

main().catch(console.error);
