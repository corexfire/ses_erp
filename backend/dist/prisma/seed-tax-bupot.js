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
    console.log('🌱 Seeding Comprehensive Tax compliance Data (Bupot & Billing)...');
    const user = await prisma.user.findFirst({
        where: { email: { in: ['zubair.mi45@gmail.com', 'admin@example.com'] } }
    });
    const tenantId = user?.tenantId || (await prisma.tenant.findFirst())?.id;
    if (!tenantId) {
        console.error('❌ No tenant found.');
        return;
    }
    const permissions = [
        { key: 'tax.eBupot.read', group: 'Tax', description: 'View e-Bupot list' },
        { key: 'tax.eBupot.create', group: 'Tax', description: 'Create e-Bupot transaction' },
        { key: 'tax.eBupot.issue', group: 'Tax', description: 'Issue official Bupot certificate' },
        { key: 'tax.pph21.read', group: 'Tax', description: 'View PPh 21 reports' },
        { key: 'tax.pph21.create', group: 'Tax', description: 'Create PPh 21 transaction' },
        { key: 'tax.idBilling.read', group: 'Tax', description: 'View Tax Billings' },
        { key: 'tax.idBilling.create', group: 'Tax', description: 'Create ID Billing' },
        { key: 'tax.idBilling.paid', group: 'Tax', description: 'Mark Billing as Paid' }
    ];
    for (const p of permissions) {
        await prisma.permission.upsert({
            where: { key: p.key },
            update: {},
            create: {
                key: p.key,
                description: p.description
            }
        });
    }
    const dbPermissions = await prisma.permission.findMany({
        where: { key: { in: permissions.map(p => p.key) } }
    });
    const roles = await prisma.role.findMany();
    for (const role of roles) {
        for (const perm of dbPermissions) {
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: { roleId: role.id, permissionId: perm.id }
                },
                update: {},
                create: { roleId: role.id, permissionId: perm.id }
            });
        }
    }
    const withholdingData = [
        {
            transNo: 'WHT/2026/04/001', transDate: new Date('2026-04-05'), incomeType: '23',
            taxpayerName: 'PT Teknologi Digital Indonesia', npwp: '01.234.567.8-012.000',
            grossAmount: 50000000, rate: 2, taxAmount: 1000000, status: 'POSTED',
            bupotNo: '23-00000012', bupotDate: new Date('2026-04-10')
        },
        {
            transNo: 'WHT/2026/04/002', transDate: new Date('2026-04-08'), incomeType: '23',
            taxpayerName: 'CV Jasa Konsultan Mandiri', npwp: '02.456.789.0-045.000',
            grossAmount: 12500000, rate: 2, taxAmount: 250000, status: 'DRAFT'
        },
        {
            transNo: 'WHT/2026/04/003', transDate: new Date('2026-04-12'), incomeType: '4(2)',
            taxpayerName: 'Gedung Perkantoran Sudirman', npwp: '31.987.654.3-031.000',
            grossAmount: 75000000, rate: 10, taxAmount: 7500000, status: 'POSTED',
            bupotNo: '42-00000088', bupotDate: new Date('2026-04-14')
        },
        {
            transNo: 'WHT/2026/04/004', transDate: new Date('2026-04-15'), incomeType: '22',
            taxpayerName: 'Importir Barang Mewah PT', npwp: '01.222.333.4-055.000',
            grossAmount: 500000000, rate: 1.5, taxAmount: 7500000, status: 'POSTED',
            bupotNo: '22-00000005', bupotDate: new Date('2026-04-15')
        }
    ];
    for (const w of withholdingData) {
        await prisma.pphWithholding.upsert({
            where: {
                tenantId_transNo: { tenantId, transNo: w.transNo }
            },
            update: {
                status: w.status,
                bupotNo: w.bupotNo,
                bupotDate: w.bupotDate
            },
            create: {
                tenantId,
                ...w
            }
        });
    }
    const billingData = [
        {
            billingNo: '123456789012345', taxType: 'PPh 23', period: '2026-04',
            amount: 1250000, dueDate: new Date('2026-05-10'), status: 'PENDING'
        },
        {
            billingNo: '987654321098765', taxType: 'PPh 4(2)', period: '2026-04',
            amount: 7500000, dueDate: new Date('2026-05-10'), status: 'PAID',
            paidDate: new Date('2026-04-20')
        },
        {
            billingNo: '111222333444555', taxType: 'PPh 21', period: '2026-04',
            amount: 4500000, dueDate: new Date('2026-05-10'), status: 'PENDING'
        }
    ];
    for (const b of billingData) {
        await prisma.idBilling.upsert({
            where: {
                tenantId_billingNo: { tenantId, billingNo: b.billingNo }
            },
            update: { status: b.status, paidDate: b.paidDate },
            create: { tenantId, ...b }
        });
    }
    const pph21Data = [
        { transNo: 'PAY/2026/04/01', transDate: new Date('2026-04-25'), taxpayerName: 'Ahmad Subagja', npwp: '01.222.333.4-012.000', grossAmount: 15000000, rate: 5, taxAmount: 750000 },
        { transNo: 'PAY/2026/04/02', transDate: new Date('2026-04-25'), taxpayerName: 'Siti Aminah', npwp: '02.444.555.6-045.000', grossAmount: 8500000, rate: 5, taxAmount: 425000 },
        { transNo: 'PAY/2026/04/03', transDate: new Date('2026-04-25'), taxpayerName: 'Budi Santoso', npwp: '31.987.654.3-031.000', grossAmount: 25000000, rate: 15, taxAmount: 3750000 },
        { transNo: 'PAY/2026/04/04', transDate: new Date('2026-04-25'), taxpayerName: 'Lina Marlina', npwp: null, grossAmount: 6000000, rate: 6, taxAmount: 360000 },
        { transNo: 'PAY/2026/04/05', transDate: new Date('2026-04-25'), taxpayerName: 'Zubair Al-Fatih', npwp: '12.345.678.9-001.000', grossAmount: 12000000, rate: 5, taxAmount: 600000 }
    ];
    for (const p of pph21Data) {
        await prisma.pphWithholding.upsert({
            where: {
                tenantId_transNo: { tenantId, transNo: p.transNo }
            },
            update: {},
            create: {
                tenantId,
                ...p,
                incomeType: '21',
                status: 'POSTED'
            }
        });
    }
    const a1Data = [
        { transNo: '1721-A1/2025/001', transDate: new Date('2025-12-31'), taxpayerName: 'Ahmad Subagja', npwp: '01.222.333.4-012.000', grossAmount: 180000000, rate: 0, taxAmount: 9000000, bupotNo: '1.1-12.25-00001', status: 'POSTED' },
        { transNo: '1721-A1/2026/001', transDate: new Date('2026-12-31'), taxpayerName: 'Ahmad Subagja', npwp: '01.222.333.4-012.000', grossAmount: 195000000, rate: 0, taxAmount: 10500000, bupotNo: '1.1-12.26-00001', status: 'POSTED' },
        { transNo: '1721-A1/2025/002', transDate: new Date('2025-12-31'), taxpayerName: 'Siti Aminah', npwp: '02.444.555.6-045.000', grossAmount: 102000000, rate: 0, taxAmount: 5100000, bupotNo: '1.1-12.25-00002', status: 'POSTED' },
        { transNo: '1721-A1/2026/002', transDate: new Date('2026-12-31'), taxpayerName: 'Siti Aminah', npwp: '02.444.555.6-045.000', grossAmount: 110000000, rate: 0, taxAmount: 5500000, bupotNo: '1.1-12.26-00002', status: 'POSTED' },
        { transNo: '1721-A1/2025/003', transDate: new Date('2025-12-31'), taxpayerName: 'Budi Santoso', npwp: '31.987.654.3-031.000', grossAmount: 300000000, rate: 0, taxAmount: 45000000, bupotNo: '1.1-12.25-00003', status: 'POSTED' },
        { transNo: '1721-A1/2026/003', transDate: new Date('2026-12-31'), taxpayerName: 'Budi Santoso', npwp: '31.987.654.3-031.000', grossAmount: 320000000, rate: 0, taxAmount: 48000000, bupotNo: '1.1-12.26-00003', status: 'POSTED' }
    ];
    for (const a of a1Data) {
        await prisma.pphWithholding.upsert({
            where: {
                tenantId_transNo: { tenantId, transNo: a.transNo }
            },
            update: {},
            create: {
                tenantId,
                ...a,
                incomeType: '21-A1'
            }
        });
    }
    console.log('✅ Tax Bupot, Billing, PPh 21, & 1721-A1 Seeding Complete!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-tax-bupot.js.map