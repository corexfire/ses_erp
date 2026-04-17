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
  const user = userRes.rows[0];
  const { tenantId, id: userId } = user;

  const now = new Date();

  // Make sure we have at least one Customer
  let customerRes = await client.query('SELECT id FROM "Customer" WHERE "tenantId"=$1 LIMIT 2', [tenantId]);
  let customerId1 = null, customerId2 = null;
  if (customerRes.rows.length < 2) {
    customerId1 = crypto.randomUUID();
    customerId2 = crypto.randomUUID();
    await client.query(
      `INSERT INTO "Customer" (id, "tenantId", code, name, segment, "createdAt", "updatedAt") VALUES 
       ($1, $3, 'CUST-3001', 'Sentral Grosir F&B', 'B2B', $4, $4),
       ($2, $3, 'CUST-3002', 'MiniRitel Group', 'RETAIL', $4, $4)
       ON CONFLICT DO NOTHING`,
       [customerId1, customerId2, tenantId, now]
    );
  } else {
    customerId1 = customerRes.rows[0].id;
    customerId2 = customerRes.rows[1] ? customerRes.rows[1].id : customerId1;
  }

  // 1. LEAD
  const rawLeads = [
    { code: 'LD-101', name: 'Distributor Snack Maju Jaya', status: 'NEW' },
    { code: 'LD-102', name: 'Jaringan Minimarket 99', status: 'CONTACTED' },
    { code: 'LD-103', name: 'Hotel Grand Royal Catering', status: 'QUALIFIED' },
  ];
  
  const leadIdMap = {};
  for (const l of rawLeads) {
    const ex = await client.query('SELECT id FROM "Lead" WHERE "tenantId"=$1 AND code=$2', [tenantId, l.code]);
    let id;
    if (ex.rows.length === 0) {
      id = crypto.randomUUID();
      await client.query(
        `INSERT INTO "Lead" (id, "tenantId", code, name, status, "assignedToUserId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [id, tenantId, l.code, l.name, l.status, userId, now, now]
      );
    } else { id = ex.rows[0].id; }
    leadIdMap[l.code] = id;
  }

  // 2. OPPORTUNITY
  const rawOpps = [
    { code: 'OPP-301', name: 'Order Karton Snack Q2', stage: 'PROPOSAL', amount: 45000000, close: 10, lId: leadIdMap['LD-103'] },
    { code: 'OPP-302', name: 'Kontrak Suplai Minimarket 99', stage: 'NEGOTIATION', amount: 150000000, close: 5, lId: leadIdMap['LD-102'] },
  ];

  const oppIdMap = {};
  for (const o of rawOpps) {
    const ex = await client.query('SELECT id FROM "Opportunity" WHERE "tenantId"=$1 AND code=$2', [tenantId, o.code]);
    let id;
    const expClose = new Date(now); expClose.setDate(now.getDate() + o.close);
    if (ex.rows.length === 0) {
      id = crypto.randomUUID();
      await client.query(
        `INSERT INTO "Opportunity" (id, "tenantId", code, name, stage, "expectedValue", "closeDate", "ownerUserId", "leadId", "customerId", "createdAt", "updatedAt") 
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$11)`,
        [id, tenantId, o.code, o.name, o.stage, o.amount, expClose, userId, o.lId || null, null, now]
      );
    } else { id = ex.rows[0].id; }
    oppIdMap[o.code] = id;
  }

  // 3. SALES ACTIVITY
  const rawActs = [
    { type: 'CALL', subject: 'Follow up Penawaran Minimarket 99', status: 'OPEN', due: 0, oId: oppIdMap['OPP-302'] },
    { type: 'MEETING', subject: 'Demo Produk Variant Baru', status: 'OPEN', due: 2, lId: leadIdMap['LD-103'] },
    { type: 'EMAIL', subject: 'Kirim Profil Perusahaan', status: 'DONE', due: -1, lId: leadIdMap['LD-101'] },
  ];

  for (const a of rawActs) {
    const ex = await client.query('SELECT id FROM "SalesActivity" WHERE "tenantId"=$1 AND "subject"=$2 AND "assignedToId"=$3', [tenantId, a.subject, userId]);
    if (ex.rows.length === 0) {
      const id = crypto.randomUUID();
      const dueAt = new Date(now); dueAt.setDate(now.getDate() + a.due); dueAt.setHours(14,0,0,0);
      await client.query(
        `INSERT INTO "SalesActivity" (id, "tenantId", type, subject, status, "dueAt", "assignedToId", "leadId", "opportunityId", "customerId", "createdAt", "updatedAt") 
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$11)`,
        [id, tenantId, a.type, a.subject, a.status, dueAt, userId, a.lId || null, a.oId || null, null, now]
      );
    }
  }

  // 4. SERVICE TICKET
  const rawTickets = [
    { code: 'TCK-501', subject: 'Kemasan Plastik Sobek 5 Dus', status: 'OPEN', priority: 'HIGH', cId: customerId1 },
    { code: 'TCK-502', subject: 'Salah Kirim Varian Rasa BBQ', status: 'IN_PROGRESS', priority: 'HIGH', cId: customerId2 },
    { code: 'TCK-505', subject: 'Komplain Sopir Terlambat', status: 'RESOLVED', priority: 'MEDIUM', cId: customerId1 },
  ];

  for (const t of rawTickets) {
    const ex = await client.query('SELECT id FROM "ServiceTicket" WHERE "tenantId"=$1 AND code=$2', [tenantId, t.code]);
    if (ex.rows.length === 0) {
      const id = crypto.randomUUID();
      const createdBack = new Date(now); createdBack.setHours(createdBack.getHours() - Math.floor(Math.random() * 48));
      await client.query(
        `INSERT INTO "ServiceTicket" (id, "tenantId", code, subject, status, priority, "customerId", "assignedToId", "createdAt", "updatedAt") 
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$9)`,
        [id, tenantId, t.code, t.subject, t.status, t.priority, t.cId, userId, createdBack]
      );
    }
  }

  console.log('CRM Data Seeded!');
  client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
