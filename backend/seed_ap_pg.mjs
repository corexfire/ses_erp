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

  console.log(`Seeding Finance Account Payable (AP) & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.ap.read',
    'finance.ap.create',
    'finance.ap.update',
    'finance.ap.delete',
    'finance.ap.payment'
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

  // 2. FETCH OR CREATE SUPPLIERS
  let suppRes = await client.query('SELECT "code", "name" FROM "Supplier" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
  let suppliers = suppRes.rows;

  if (suppliers.length === 0) {
      console.log('No Suppliers found. Creating default F&B Suppliers...');
      const samples = [
          { code: 'SUPP-001', name: 'PT Bogasari Flour Mills' },
          { code: 'SUPP-002', name: 'CV Logistik Packaging Indo' },
          { code: 'SUPP-003', name: 'Grosir Gula Manis Utama' }
      ];
      for(const s of samples) {
          const sId = crypto.randomUUID();
          await client.query(
            `INSERT INTO "Supplier" ("id", "tenantId", "code", "name", "isActive", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, true, NOW(), NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
            [sId, tenantId, s.code, s.name]
          );
      }
      suppRes = await client.query('SELECT "code", "name" FROM "Supplier" WHERE "tenantId" = $1 LIMIT 5', [tenantId]);
      suppliers = suppRes.rows;
  }

  // 3. SEED AP INVOICES
  for (let i = 0; i < 40; i++) {
        const s = suppliers[Math.floor(Math.random() * suppliers.length)];
        const invId = crypto.randomUUID();
        
        const year = 2026;
        const month = String((i % 12) + 1).padStart(2, '0');
        let day = Math.floor(Math.random() * 28) + 1;
        const invoiceDate = new Date(`${year}-${month}-${String(day).padStart(2, '0')}`);
        
        // Due TOP 45 days after invoice for Suppliers
        const dueDate = new Date(invoiceDate);
        dueDate.setDate(dueDate.getDate() + 45);
        
        // Random amount 5 Juta to 150 Juta (B2B usually larger)
        const totalAmount = Math.floor(Math.random() * 145000000) + 5000000;
        
        // Paid Amount Simulation
        let paidAmount = 0;
        let status = 'OPEN';
        
        const rndStatus = Math.random();
        if (rndStatus > 0.6) { 
           // 40% Lunas
           paidAmount = totalAmount;
           status = 'PAID';
        } else if (rndStatus > 0.4) {
           // 20% Dibayar Down Payment / Sebagian
           paidAmount = Math.floor(totalAmount * 0.4);
           status = 'PARTIAL';
        }

        // Check if overdue
        const today = new Date();
        if (today > dueDate && status !== 'PAID') {
           status = 'OVERDUE';
        }

        const invoiceNo = `AP-INV-${year}${month}-${String(i + 1).padStart(4, '0')}`;

        try {
            await client.query(
                `INSERT INTO "SupplierInvoice" ("id", "tenantId", "invoiceNo", "supplierCode", "invoiceDate", "dueDate", "totalAmount", "paidAmount", "status", "createdAt", "updatedAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
                [invId, tenantId, invoiceNo, s.code, invoiceDate.toISOString(), dueDate.toISOString(), totalAmount, paidAmount, status]
            );

            // Seed invoice lines
            await client.query(
               `INSERT INTO "SupplierInvoiceLine" ("id", "tenantId", "invoiceId", "lineNo", "description", "qty", "unitPrice", "amount")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
               [crypto.randomUUID(), tenantId, invId, 1, `Pengadaan Bahan Baku #${i}`, 500, (totalAmount / 500), totalAmount]
            );

            // Seed payments if there are any
            if (paidAmount > 0) {
               await client.query(
                 `INSERT INTO "SupplierInvoicePayment" ("id", "tenantId", "invoiceId", "paymentDate", "amount", "reference", "createdAt")
                  VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
                 [crypto.randomUUID(), tenantId, invId, new Date().toISOString(), paidAmount, `PAY-OUT-${invoiceNo}`]
               );
            }

            console.log(`✅ Seeded AP Invoice: ${invoiceNo} | Val: Rp${totalAmount} | Status: ${status}`);
        } catch (e) {
            console.error(`Failed on AP ${invoiceNo}:`, e.message);
        }
    }

  await client.end();
}

main().catch(console.error);
