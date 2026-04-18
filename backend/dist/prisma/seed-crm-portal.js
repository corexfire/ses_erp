"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is required');
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
    const tenant = await prisma.tenant.findUnique({ where: { name: tenantName } });
    if (!tenant) {
        throw new Error(`Tenant '${tenantName}' not found.`);
    }
    console.log(`🧹 Memulai proses Seeding B2B Customer Portal untuk tenant: ${tenantName}...`);
    const customers = await prisma.customer.findMany({ where: { tenantId: tenant.id } });
    if (customers.length === 0) {
        console.log('⚠️ Belum ada satupun Customer di sistem ERP. Silakan jalankan seeder basic Customer terlebih dahulu.');
        return;
    }
    await prisma.customerPortalActivity.deleteMany({ where: { tenantId: tenant.id } });
    await prisma.customerPortalUser.deleteMany({ where: { tenantId: tenant.id } });
    console.log(`🌍 Mendistribusikan kredensial B2B Portal kepada database Pelanggan...`);
    let insertedUsers = 0;
    let insertedLogs = 0;
    for (const c of customers) {
        if (Math.random() > 0.7)
            continue;
        const portalEmail = c.email || `contact@${c.code.toLowerCase()}.com`;
        const portalUser = await prisma.customerPortalUser.upsert({
            where: { tenantId_email: { tenantId: tenant.id, email: portalEmail } },
            update: {
                portalStatus: Math.random() > 0.1 ? 'ACTIVE' : 'PENDING_INVITE',
                lastLoginAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
                inviteSentAt: new Date(Date.now() - Math.floor(Math.random() * 20000000000))
            },
            create: {
                tenantId: tenant.id,
                customerCode: c.code,
                email: portalEmail,
                portalStatus: Math.random() > 0.1 ? 'ACTIVE' : 'PENDING_INVITE',
                lastLoginAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
                inviteSentAt: new Date(Date.now() - Math.floor(Math.random() * 20000000000))
            }
        });
        insertedUsers++;
        if (portalUser.portalStatus === 'ACTIVE') {
            const logCount = Math.floor(Math.random() * 4) + 1;
            for (let i = 0; i < logCount; i++) {
                const types = ['LOGIN', 'INVOICE_VIEW', 'QUOTE_VIEW', 'PROFILE_UPDATE'];
                const type = types[Math.floor(Math.random() * types.length)];
                let desc = '';
                if (type === 'LOGIN')
                    desc = 'Client berhasil masuk ke antarmuka B2B ERP.';
                else if (type === 'INVOICE_VIEW')
                    desc = `Client mengunduh/melihat digital Invoice terkait transaksi bulan ini.`;
                else if (type === 'QUOTE_VIEW')
                    desc = `Client mengeksplorasi penawaran/draft Sales Quotation yang diajukan sistem.`;
                else
                    desc = 'Client melakukan sinkronisasi data NPWP / alamat tagihan.';
                await prisma.customerPortalActivity.create({
                    data: {
                        tenantId: tenant.id,
                        portalUserId: portalUser.id,
                        activityType: type,
                        description: desc,
                        ipAddress: `114.120.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                        createdAt: new Date(Date.now() - Math.floor(Math.random() * 5000000000))
                    }
                });
                insertedLogs++;
            }
        }
    }
    console.log(`✅ Berhasil meresmikan ${insertedUsers} Client Accounts untuk self-service Portal.`);
    console.log(`✅ Menyuntikkan ${insertedLogs} riwayat Log Interaksi B2B (Invoices, Quotation views).`);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed-crm-portal.js.map