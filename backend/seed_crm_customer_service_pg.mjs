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

  console.log(`Seeding CRM Customer Service Tickets for tenant: ${tenantId}`);

  const custRes = await client.query('SELECT id FROM "Customer" WHERE "tenantId"=$1', [tenantId]);
  const custs = custRes.rows;
  if (custs.length === 0) {
    console.log("No customers found! Please run seed_crm_customer_pg.mjs first.");
    await client.end();
    return;
  }

  const getCustomer = () => custs[Math.floor(Math.random() * custs.length)].id;

  const ticketsToSeed = [
    { subject: 'Pengiriman telat 2 hari dari jadwal SLA', priority: 'HIGH', status: 'OPEN', notes: 'Gudang transit overload' },
    { subject: 'Komplain kemasan rusak saat diterima', priority: 'URGENT', status: 'IN_PROGRESS', notes: 'Minta retur 5 karton' },
    { subject: 'Permintaan faktur pajak belum dikirim', priority: 'MEDIUM', status: 'RESOLVED', notes: 'Faktur sudah dilampirkan via email' },
    { subject: 'Revisi alamat pengiriman cabang baru', priority: 'LOW', status: 'CLOSED', notes: 'Sudah diupdate di Master Data' },
    { subject: 'Barang tidak sesuai spesifikasi PO', priority: 'URGENT', status: 'OPEN', notes: 'Menunggu konfirmasi tim produksi' },
    { subject: 'Tanya jadwal promo bulan depan', priority: 'LOW', status: 'RESOLVED', notes: 'Diberikan booklet promo' },
    { subject: 'Gagal login portal B2B', priority: 'MEDIUM', status: 'OPEN', notes: 'Reset password link expired' },
    { subject: 'Diskon kuantitas tidak memotong di invoice', priority: 'HIGH', status: 'IN_PROGRESS', notes: 'Sedang dicek oleh tim Finance' },
    { subject: 'Status pesanan tertahan di Loading Dock', priority: 'HIGH', status: 'OPEN', notes: 'Sopir belum datang' },
    { subject: 'Klaim program loyalitas / Poins', priority: 'MEDIUM', status: 'CLOSED', notes: 'Poin berhasil dicairkan' },
    { subject: 'Tanya ketersediaan stok eksklusif', priority: 'LOW', status: 'RESOLVED', notes: 'Stok kosong hingga akhir bulan' },
    { subject: 'Cancel Order sepihak', priority: 'URGENT', status: 'IN_PROGRESS', notes: 'Menunggu approval manager' },
    { subject: 'Produk expired date terlalu dekat', priority: 'HIGH', status: 'OPEN', notes: 'Minta tukar guling batch baru' },
    { subject: 'Truk logistik mogok di jalan', priority: 'URGENT', status: 'RESOLVED', notes: 'Dikirimkan truk pengganti' },
    { subject: 'Feedback positif layanan memuaskan', priority: 'LOW', status: 'CLOSED', notes: 'Diteruskan ke tim sales apresiasi' },
  ];

  let inserted = 0;
  for (const t of ticketsToSeed) {
    const ex = await client.query('SELECT id FROM "ServiceTicket" WHERE "tenantId"=$1 AND subject=$2', [tenantId, t.subject]);
    if (ex.rows.length === 0) {
        const code = `TCK-${Math.floor(Math.random() * 900000) + 100000}`;
        const id = crypto.randomUUID();
        
        const createdBackDays = Math.floor(Math.random() * 10);
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - createdBackDays);
        
        await client.query(
        `INSERT INTO "ServiceTicket" (id, "tenantId", code, "customerId", subject, priority, status, "assignedToId", notes, "createdAt", "updatedAt") 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$10)`,
        [id, tenantId, code, getCustomer(), t.subject, t.priority, t.status, userId, t.notes, createdAt]
        );
        inserted++;
    }
  }

  console.log(`\n🎉 Seeded CRM Tickets: Added ${inserted} bulk tickets.`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
