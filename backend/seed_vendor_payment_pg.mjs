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

  console.log(`Seeding Vendor Payment & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.vendorPayment.read',
    'finance.vendorPayment.create',
    'finance.vendorPayment.approve',
    'finance.vendorPayment.delete'
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

  // 2. CHECK OR CREATE SUPPLIERS
  let supRes = await client.query('SELECT "id", "code", "name" FROM "Supplier" WHERE "tenantId" = $1 LIMIT 10', [tenantId]);
  let suppliers = supRes.rows;

  if (suppliers.length === 0) {
      console.log('No Suppliers found. Creating default F&B suppliers...');
      const samples = [
          { code: 'V-BBM01', name: 'PT Bogasari Flour Mills' },
          { code: 'V-PKG02', name: 'PT Indah Kiat Pulp & Paper (Kemasan)' },
          { code: 'V-SGR03', name: 'PT Sugar Group Companies (Gulaku)' },
          { code: 'V-LOG04', name: 'CV Armada Logistik Mandiri' },
          { code: 'V-MTC05', name: 'PT Teknik Mesin Boiler Nusantara' }
      ];
      for(const s of samples) {
          const sId = crypto.randomUUID();
          await client.query(
            `INSERT INTO "Supplier" ("id", "tenantId", "code", "name", "isActive", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, true, NOW(), NOW())`,
            [sId, tenantId, s.code, s.name]
          );
      }
      supRes = await client.query('SELECT "id", "code", "name" FROM "Supplier" WHERE "tenantId" = $1 LIMIT 10', [tenantId]);
      suppliers = supRes.rows;
  }

  // 3. SEED VENDOR PAYMENTS
  const templates = [
      { notes: "Pelunasan Tagihan Tepung Terigu Q1", min: 150000000, max: 450000000 },
      { notes: "Pembayaran DP 50% Kemasan Karton Dus", min: 50000000, max: 250000000 },
      { notes: "Pembayaran Retensi Maintenance Mesin Pabrik", min: 30000000, max: 80000000 },
      { notes: "Pelunasan Gula Kristal Rafinasi (50 Ton)", min: 100000000, max: 350000000 },
      { notes: "Tagihan Ongkos Kirim Antar Cabang Jawa Timur", min: 25000000, max: 75000000 },
      { notes: "Pembayaran Bahan Baku Perasa Vanila Sintetis", min: 60000000, max: 120000000 },
      { notes: "Pelunasan Tali Strapping & Plastik Wrap Gudang", min: 10000000, max: 30000000 }
  ];

  for (let i = 0; i < 40; i++) {
        const template = templates[i % templates.length];
        const amount = Math.floor(Math.random() * ((template.max - template.min) / 100000)) * 100000 + template.min;
        const s = suppliers[Math.floor(Math.random() * suppliers.length)];
        
        const payId = crypto.randomUUID();
        const payNo = `PAY-${String(6001 + i).padStart(4, '0')}`;
        const refNo = `INV-${Math.floor(Math.random() * 90000) + 10000}/IX/26`;

        const day = String((i % 28) + 1).padStart(2, '0');
        const date = `2026-04-${day}`;
        let method = i % 3 === 0 ? 'CASH' : 'BANK_TRANSFER';
        
        try {
            await client.query(
                `INSERT INTO "VendorPayment" ("id", "tenantId", "paymentNo", "paymentDate", "supplierCode", "amount", "paymentMethod", "reference", "notes", "status", "createdAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) ON CONFLICT ("tenantId", "paymentNo") DO NOTHING`,
                [payId, tenantId, payNo, date, s.code, amount, method, refNo, template.notes, 'POSTED']
            );
            console.log(`✅ Seeded Vendor Payment: ${payNo} | ${refNo}`);
        } catch (e) {
            console.error(`Failed ${payNo}:`, e.message);
        }
    }

  await client.end();
}

main().catch(console.error);
