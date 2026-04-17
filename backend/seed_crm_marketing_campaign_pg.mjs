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

  console.log(`Seeding CRM Marketing Campaigns for tenant: ${tenantId}`);

  const campaignsToSeed = [
    { name: 'Promo Ramadhan Ceria 2026', channel: 'Social Media', status: 'ACTIVE', budget: 15000000, notes: 'Fokus akuisisi F&B Catering' },
    { name: 'Email Blast - New Product', channel: 'Email', status: 'COMPLETED', budget: 500000, notes: 'Testing A/B Subject Lines' },
    { name: 'Food Expo Jakarta B2B', channel: 'Offline Event', status: 'PLANNED', budget: 35000000, notes: 'Sewa booth ukuran 3x4m' },
    { name: 'Diskon Grosir Q3', channel: 'WhatsApp', status: 'ACTIVE', budget: 2000000, notes: 'Blast ke 500 loyal customer' },
    { name: 'SEO & Ads Google Search', channel: 'Digital Ads', status: 'ACTIVE', budget: 10000000, notes: 'Maintenance traffic bulanan' },
    { name: 'Pameran franchise Jabar', channel: 'Offline Event', status: 'CANCELED', budget: 15000000, notes: 'Batal karena jadwal bentrok' },
    { name: 'Partnership GoFood/GrabFood', channel: 'Partnership', status: 'PLANNED', budget: 5000000, notes: 'Budget untuk voucher promo' },
  ];

  let inserted = 0;
  for (const c of campaignsToSeed) {
    const ex = await client.query('SELECT id FROM "MarketingCampaign" WHERE "tenantId"=$1 AND name=$2', [tenantId, c.name]);
    if (ex.rows.length === 0) {
        const code = `CAMP-${Math.floor(Math.random() * 90000) + 10000}`;
        const id = crypto.randomUUID();
        
        const sd = new Date();
        sd.setDate(sd.getDate() - Math.floor(Math.random() * 30));
        
        const ed = new Date(sd);
        ed.setDate(ed.getDate() + 30 + Math.floor(Math.random() * 60));

        await client.query(
        `INSERT INTO "MarketingCampaign" (id, "tenantId", code, name, channel, status, "startDate", "endDate", budget, notes, "createdAt", "updatedAt") 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW(),NOW())`,
        [id, tenantId, code, c.name, c.channel, c.status, sd, ed, c.budget, c.notes]
        );
        inserted++;
    }
  }

  console.log(`\n🎉 Seeded CRM Campaigns: Added ${inserted} bulk campaigns.`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
