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

  console.log(`Seeding CRM Sales Activities for tenant: ${tenantId}`);

  const leadRes = await client.query('SELECT id FROM "Lead" WHERE "tenantId"=$1 LIMIT 3', [tenantId]);
  const leads = leadRes.rows;

  const custRes = await client.query('SELECT id FROM "Customer" WHERE "tenantId"=$1 LIMIT 3', [tenantId]);
  const custs = custRes.rows;

  const oppRes = await client.query('SELECT id FROM "Opportunity" WHERE "tenantId"=$1 LIMIT 3', [tenantId]);
  const opps = oppRes.rows;

  const getRnd = (arr) => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)].id : null;

  const activitiesToSeed = [
    { type: 'CALL', subject: 'Follow up Penawaran Negosiasi Q2', status: 'OPEN', oId: getRnd(opps) },
    { type: 'MEETING', subject: 'Presentasi Sample Produk Baru', status: 'DONE', lId: getRnd(leads) },
    { type: 'EMAIL', subject: 'Mengirimkan Company Profile (PDF)', status: 'DONE', lId: getRnd(leads) },
    { type: 'TASK', subject: 'Cek Ketersediaan Stok Gudang', status: 'OPEN', cId: getRnd(custs) },
    { type: 'CALL', subject: 'Telepon Konfirmasi Pemesanan Bulanan', status: 'CANCELED', cId: getRnd(custs) },
    { type: 'MEETING', subject: 'Makan Siang & Negosiasi Kontrak Berjangka', status: 'OPEN', oId: getRnd(opps) },
    { type: 'TASK', subject: 'Draft Proposal PDF untuk dikirim', status: 'DONE', oId: getRnd(opps) },
    { type: 'EMAIL', subject: 'Undangan Event Pameran Kuliner', status: 'DONE', lId: getRnd(leads) },
    { type: 'CALL', subject: 'Cek Kepuasan Produk (After Sales)', status: 'OPEN', cId: getRnd(custs) },
    { type: 'MEETING', subject: 'Tinjauan Kinerja Triwulan', status: 'OPEN', cId: getRnd(custs) }
  ];

  let inserted = 0;
  for (const a of activitiesToSeed) {
    // Basic deduplication
    const ex = await client.query('SELECT id FROM "SalesActivity" WHERE "tenantId"=$1 AND subject=$2', [tenantId, a.subject]);
    if (ex.rows.length === 0) {
        const id = crypto.randomUUID();
        const createdBackDays = Math.floor(Math.random() * 15); // past 15 days
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - createdBackDays);
        
        let dueAt = new Date(createdAt);
        dueAt.setDate(dueAt.getDate() + Math.floor(Math.random() * 5)); // due 0-5 days after creation

        await client.query(
        `INSERT INTO "SalesActivity" (id, "tenantId", type, subject, status, "dueAt", "leadId", "customerId", "opportunityId", "assignedToId", "createdAt", "updatedAt") 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$11)`,
        [id, tenantId, a.type, a.subject, a.status, dueAt, a.lId || null, a.cId || null, a.oId || null, userId, createdAt]
        );
        inserted++;
    }
  }

  console.log(`\n🎉 Seeded CRM Activities: Added ${inserted} bulk activities.`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
