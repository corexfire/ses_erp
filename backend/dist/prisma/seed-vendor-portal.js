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
    console.log(`🧹 Memulai proses Seeding B2B Vendor Portal untuk tenant: ${tenantName}...`);
    const suppliers = await prisma.supplier.findMany({ where: { tenantId: tenant.id } });
    if (suppliers.length === 0) {
        console.log('⚠️ Belum ada satupun Vendor di sistem ERP. Silakan jalankan seeder basic Supplier terlebih dahulu.');
        return;
    }
    await prisma.vendorPortalActivity.deleteMany({ where: { tenantId: tenant.id } });
    await prisma.vendorPortalUser.deleteMany({ where: { tenantId: tenant.id } });
    console.log(`🏭 Mendistribusikan kredensial e-Procurement Portal kepada database Vendor...`);
    let insertedUsers = 0;
    let insertedLogs = 0;
    for (const c of suppliers) {
        if (Math.random() > 0.6)
            continue;
        const portalEmail = c.email || `b2b@${c.code.toLowerCase()}.com`;
        const portalUser = await prisma.vendorPortalUser.upsert({
            where: { tenantId_email: { tenantId: tenant.id, email: portalEmail } },
            update: {
                portalStatus: Math.random() > 0.1 ? 'ACTIVE' : 'PENDING_INVITE',
                lastLoginAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
                inviteSentAt: new Date(Date.now() - Math.floor(Math.random() * 20000000000))
            },
            create: {
                tenantId: tenant.id,
                supplierCode: c.code,
                email: portalEmail,
                portalStatus: Math.random() > 0.1 ? 'ACTIVE' : 'PENDING_INVITE',
                lastLoginAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
                inviteSentAt: new Date(Date.now() - Math.floor(Math.random() * 20000000000))
            }
        });
        insertedUsers++;
        if (portalUser.portalStatus === 'ACTIVE') {
            const logCount = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < logCount; i++) {
                const types = ['LOGIN', 'INVOICE_VIEW', 'RFQ_BID_SUBMIT', 'INVOICE_VIEW'];
                const type = types[Math.floor(Math.random() * types.length)];
                let desc = '';
                if (type === 'LOGIN')
                    desc = 'Supplier berhasil masuk ke dalam extranet ERP.';
                else if (type === 'INVOICE_VIEW')
                    desc = `Supplier meninjau status pembayaran Invoice (AP) terbarunya.`;
                else if (type === 'RFQ_BID_SUBMIT')
                    desc = `Supplier mengunggah dan menyelesaikan penawaran harga (Bid Proposal) pada antarmuka RFQ.`;
                else
                    desc = 'Supplier memperbaharui berkas pajak perusahaan independen.';
                await prisma.vendorPortalActivity.create({
                    data: {
                        tenantId: tenant.id,
                        portalUserId: portalUser.id,
                        activityType: type,
                        description: desc,
                        ipAddress: `103.45.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                        createdAt: new Date(Date.now() - Math.floor(Math.random() * 7000000000))
                    }
                });
                insertedLogs++;
            }
        }
    }
    console.log(`✅ Berhasil meresmikan ${insertedUsers} Akun Pemasok untuk e-Procurement Portal.`);
    console.log(`✅ Menyuntikkan ${insertedLogs} riwayat Log Interaksi B2B (RFQ Bids, AP Invoices views).`);
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
//# sourceMappingURL=seed-vendor-portal.js.map