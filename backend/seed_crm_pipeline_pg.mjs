import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (!userRes.rows.length) return;
  const { tenantId, id: userId } = userRes.rows[0];

  console.log(`Seeding CRM Pipeline for tenant: ${tenantId}`);

  // Need customers
  let customerRes = await client.query('SELECT id, name FROM "Customer" WHERE "tenantId"=$1 LIMIT 3', [tenantId]);
  let custIds = customerRes.rows.map(r => r.id);
  if (custIds.length === 0) {
    // Generate dummy customer
    const cid = crypto.randomUUID();
    await client.query(`INSERT INTO "Customer" (id, "tenantId", code, name, segment, "createdAt", "updatedAt") VALUES ($1, $2, 'CUST-OPP', 'Modern Market Nusantara', 'B2B', NOW(), NOW())`, [cid, tenantId]);
    custIds.push(cid);
  }

  // Define 15 realistic F&B Sales Pipeline deals
  const deals = [
    { name: 'Pengadaan Sirup Pasokan Cafe Jaktim', stage: 'QUALIFICATION', val: 12000000, c: 30 },
    { name: 'Biji Kopi Roasting (120 Kg) Resto', stage: 'QUALIFICATION', val: 24000000, c: 45 },
    { name: 'Supply Bumbu Dapur Hotel Bintang 4', stage: 'QUALIFICATION', val: 55000000, c: 60 },
    { name: 'Order Tepung Terigu Q3', stage: 'QUALIFICATION', val: 18000000, c: 20 },

    { name: 'Distribusi Snack Sekolah Premium', stage: 'PROPOSAL', val: 35000000, c: 15 },
    { name: 'Pengiriman Susu UHT Grosir', stage: 'PROPOSAL', val: 82000000, c: 25 },
    { name: 'Sponsorship Merchant F&B Event', stage: 'PROPOSAL', val: 15000000, c: 10 },

    { name: 'Kontrak Ekstrak Buah (Tahunan)', stage: 'NEGOTIATION', val: 250000000, c: 5 },
    { name: 'Kerjasama Eksklusif Minuman Kaleng', stage: 'NEGOTIATION', val: 175000000, c: 14 },
    { name: 'Bundling Paket Lebaran Karyawan', stage: 'NEGOTIATION', val: 45000000, c: 7 },

    { name: 'Suplai Daging Wagyu 100Kg', stage: 'CLOSED_WON', val: 120000000, c: -5 },
    { name: 'Pembelian Packaging Kotak Makan', stage: 'CLOSED_WON', val: 32000000, c: -10 },
    { name: 'Saus Tomat & Sambal Sachet Fastfood', stage: 'CLOSED_WON', val: 85000000, c: -2 },

    { name: 'Proyek Katering Pabrik (Kalah Tender)', stage: 'CLOSED_LOST', val: 400000000, c: -15 },
    { name: 'Pasokan Bahan Baku Es Krim', stage: 'CLOSED_LOST', val: 25000000, c: -30 }
  ];

  let cOpps = 0;
  for (const d of deals) {
    const code = `OPP-${Math.floor(Math.random() * 90000) + 10000}`;
    const expClose = new Date();
    expClose.setDate(expClose.getDate() + d.c);

    const cId = custIds[Math.floor(Math.random() * custIds.length)];

    const id = crypto.randomUUID();
    await client.query(
      `INSERT INTO "Opportunity" (id, "tenantId", code, name, stage, "expectedValue", "closeDate", "ownerUserId", "customerId", "createdAt", "updatedAt") 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, NOW(), NOW())`,
      [id, tenantId, code, d.name, d.stage, d.val, expClose, userId, cId]
    );
    cOpps++;
  }

  console.log(`\n🎉 Seeded CRM Pipeline: Added ${cOpps} new Deals.`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
