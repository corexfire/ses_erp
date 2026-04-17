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

  console.log(`Seeding CRM Leads Data for tenant: ${tenantId}`);

  const sources = ['Website Contact Form', 'Referral', 'Trade Show 2026', 'Cold Call', 'Social Media Campaign'];
  const phonePrefixes = ['0811', '0812', '0813', '0852', '0857', '0878', '0896'];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.co.id'];

  const leadsToSeed = [
    { name: 'Kopitiam Sahabat', status: 'NEW' },
    { name: 'PT Gizi Pangan (Distributor)', status: 'NEW' },
    { name: 'CV Berkah Rasa Toserba', status: 'NEW' },
    { name: 'Rumah Makan Anggrek', status: 'NEW' },
    
    { name: 'Jaringan Resto Steak 45', status: 'CONTACTED' },
    { name: 'Koperasi Karyawan Sejahtera', status: 'CONTACTED' },
    { name: 'Kafetaria UMN', status: 'CONTACTED' },
    
    { name: 'Bazaar Ramadhan Penyelenggara', status: 'QUALIFIED' },
    { name: 'Distributor Minuman Dingin Jabar', status: 'QUALIFIED' },
    { name: 'Hotel Melati Jaya Indah', status: 'QUALIFIED' },
    { name: 'Catering Pernikahan Ibu Asri', status: 'QUALIFIED' },
    
    { name: 'Suplier Bahan Roti Jakarta', status: 'LOST' },
    { name: 'Mini Market Mandiri (Bangkrut)', status: 'LOST' },
    { name: 'Kedai Kopi Hits BSD', status: 'LOST' },
    
    { name: 'Toko Sumber Rezeki Utama', status: 'WON' },
    { name: 'Restoran Masakan Padang Salero', status: 'WON' },
    { name: 'Grosir Telur & Sembako', status: 'WON' }
  ];

  let inserted = 0;
  for (const l of leadsToSeed) {
    const code = `LD-${Math.floor(Math.random() * 90000) + 10000}`;
    const source = sources[Math.floor(Math.random() * sources.length)];
    const phone = `${phonePrefixes[Math.floor(Math.random() * phonePrefixes.length)]}${Math.floor(Math.random() * 9000000) + 1000000}`;
    const emailStr = l.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const email = `${emailStr.substring(0, 8)}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const isAssigned = Math.random() > 0.3; // 70% chance assigned to the current user

    const id = crypto.randomUUID();
    const createdBackDays = Math.floor(Math.random() * 60); // 0 to 60 days ago
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - createdBackDays);

    await client.query(
      `INSERT INTO "Lead" (id, "tenantId", code, name, email, phone, source, status, notes, "assignedToUserId", "createdAt", "updatedAt") 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$11)`,
      [
        id, tenantId, code, l.name, email, phone, source, l.status,
        `Didapatkan dari ${source} pada ${createdAt.toISOString().slice(0,10)}`,
        isAssigned ? userId : null,
        createdAt
      ]
    );
    inserted++;
  }

  console.log(`\n🎉 Seeded CRM Leads: Added ${inserted} bulk Leads.`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
