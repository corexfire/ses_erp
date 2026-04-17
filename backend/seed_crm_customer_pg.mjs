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
  const { tenantId } = userRes.rows[0];

  console.log(`Seeding CRM Customers Data for tenant: ${tenantId}`);

  const phonePrefixes = ['0811', '0812', '0813', '0852', '021'];
  const domains = ['business.co.id', 'group.com', 'hotel.id', 'corp.net'];
  const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Semarang', 'Medan', 'Bali'];

  const customersToSeed = [
    { name: 'Hotel Grand Hyatt', active: true },
    { name: 'PT Surya Citra Distributor', active: true },
    { name: 'Kopitiam Sahabat Group', active: true },
    { name: 'Minimarket Nusantara', active: true },
    { name: 'Koperasi Karyawan Astra', active: true },
    { name: 'Kafe Bintang Tujuh', active: false },
    { name: 'Supermarket Makmur Jaya', active: true },
    { name: 'Distributor Sembako Medan', active: true },
    { name: 'Catering Pernikahan Ibu Asri', active: true },
    { name: 'Toko Kelontong Berkah', active: true },
    { name: 'Rumah Makan Padang Salero', active: true },
    { name: 'Pabrik Roti Sari Mewah', active: true },
  ];

  let inserted = 0;
  for (const c of customersToSeed) {
    const ex = await client.query('SELECT id FROM "Customer" WHERE "tenantId"=$1 AND name=$2', [tenantId, c.name]);
    if (ex.rows.length === 0) {
        const code = `CUST-${Math.floor(Math.random() * 90000) + 10000}`;
        const phone = `${phonePrefixes[Math.floor(Math.random() * phonePrefixes.length)]}${Math.floor(Math.random() * 900000) + 100000}`;
        const emailStr = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const email = `purchasing@${emailStr.substring(0, 8)}.${domains[Math.floor(Math.random() * domains.length)]}`;
        
        const city = cities[Math.floor(Math.random() * cities.length)];
        const address1 = `Jl. Jend. Sudirman Blok ${Math.floor(Math.random() * 20)+1}`;
        const address2 = `${city}, Indonesia`;

        const id = crypto.randomUUID();
        const createdBackDays = Math.floor(Math.random() * 300); // Up to 10 months ago
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - createdBackDays);

        await client.query(
        `INSERT INTO "Customer" (id, "tenantId", code, name, email, phone, address1, address2, city, "isActive", "createdAt", "updatedAt") 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$11)`,
        [id, tenantId, code, c.name, email, phone, address1, address2, city, c.active, createdAt]
        );
        inserted++;
    }
  }

  console.log(`\n🎉 Seeded CRM Customers: Added ${inserted} bulk Customers.`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
