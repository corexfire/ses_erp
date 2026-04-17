import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

async function main() {
  await client.connect();

  const rootUserRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (rootUserRes.rows.length === 0) return;
  const tenantId = rootUserRes.rows[0].tenantId;

  console.log(`Seeding Payment Requests & Permissions for tenant: ${tenantId}`);

  // 1. INJECT PERMISSIONS
  const perms = [
    'finance.paymentRequest.read',
    'finance.paymentRequest.create',
    'finance.paymentRequest.approve',
    'finance.paymentRequest.delete'
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

  // 2. GET SYSTEM USERS (Requestors)
  const usersRes = await client.query('SELECT "id", "name", "email" FROM "User" WHERE "tenantId" = $1 LIMIT 10', [tenantId]);
  const users = usersRes.rows;
  if(users.length === 0) {
      console.error("No users found to act as requestors!");
      await client.end();
      return;
  }

  // 3. SEED PAYMENT REQUESTS
  const templates = [
      { notes: "Permohonan Dana: Pembelian 12 Tabung Gas Elpiji 50kg Pabrik", min: 12000000, max: 25000000 },
      { notes: "Pembayaran BPJS Ketenagakerjaan & Kesehatan Karyawan Pabrik", min: 45000000, max: 80000000 },
      { notes: "Permintaan Kas: Perbaikan Darurat Mesin Sealer Kemasan", min: 5000000, max: 15000000 },
      { notes: "Pembelian Suku Cadang Forklift Gudang Bahan Baku", min: 8000000, max: 35000000 },
      { notes: "Panjar Biaya Perjalanan Dinas Tim Audit ke Cabang Surabaya", min: 3000000, max: 12000000 },
      { notes: "Pembayaran Pemeliharaan & Kuras Tandon Air Industri", min: 2000000, max: 6000000 },
      { notes: "Pengadaan Seragam APD (Alat Pelindung Diri) Ruang Produksi", min: 15000000, max: 40000000 },
      { notes: "Biaya Sertifikasi Halal & BPOM Varian Produk Baru", min: 25000000, max: 60000000 }
  ];

  for (let i = 0; i < 40; i++) {
        const template = templates[i % templates.length];
        const amount = Math.floor(Math.random() * ((template.max - template.min) / 100000)) * 100000 + template.min;
        const u = users[Math.floor(Math.random() * users.length)];
        
        const reqId = crypto.randomUUID();
        const reqNo = `PRQ-${String(8001 + i).padStart(4, '0')}`;

        const day = String((i % 28) + 1).padStart(2, '0');
        const date = `2026-04-${day}`;
        
        let status = 'APPROVED';
        if (i % 6 === 0) status = 'PENDING';
        if (i % 11 === 0) status = 'REJECTED';

        try {
            await client.query(
                `INSERT INTO "PaymentRequest" ("id", "tenantId", "requestNo", "requestDate", "requesterId", "description", "amount", "status", "approvalStatus", "createdAt") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8, NOW()) ON CONFLICT ("tenantId", "requestNo") DO NOTHING`,
                [reqId, tenantId, reqNo, date, u.id, template.notes, amount, status]
            );
            console.log(`✅ Seeded Payment Request: ${reqNo} for ${amount}`);
        } catch (e) {
            console.error(`Failed ${reqNo}:`, e.message);
        }
    }

  await client.end();
}

main().catch(console.error);
