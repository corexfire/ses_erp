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
    console.log('🌱 Seeding Tax Equalization Data...');
    const user = await prisma.user.findFirst({
        where: { email: { in: ['zubair.mi45@gmail.com', 'admin@example.com'] } }
    });
    const tenantId = user?.tenantId || (await prisma.tenant.findFirst())?.id;
    if (!tenantId) {
        console.error('❌ No tenant found.');
        return;
    }
    const equalizationData = [
        { period: '2025-11', bookIncome: 4500000000, fiscalIncome: 4500000000, difference: 0, description: 'Perfect match for November closure', status: 'APPROVED' },
        { period: '2025-12', bookIncome: 5200000000, fiscalIncome: 5185000000, difference: -15000000, description: 'Timing difference in revenue recognition (Project A)', status: 'APPROVED' },
        { period: '2026-01', bookIncome: 3800000000, fiscalIncome: 3800000000, difference: 0, description: 'Opening balance match', status: 'APPROVED' },
        { period: '2026-02', bookIncome: 4100000000, fiscalIncome: 4105000000, difference: 5000000, description: 'Exchange rate difference for export invoices', status: 'APPROVED' },
        { period: '2026-03', bookIncome: 4950000000, fiscalIncome: 4950000000, difference: 0, description: 'Verified by audit', status: 'APPROVED' },
        { period: '2026-04', bookIncome: 2500000000, fiscalIncome: 2490000000, difference: -10000000, description: 'Pending voucher adjustments', status: 'DRAFT' },
        { period: '2025 (Annual)', bookIncome: 55000000000, fiscalIncome: 55150000000, difference: 150000000, description: 'Annual Fiscal Closure 2025', status: 'APPROVED' },
        { period: '2026 (Annual)', bookIncome: 12000000000, fiscalIncome: 12025000000, difference: 25000000, description: 'Provisional Annual Closure 2026', status: 'DRAFT' }
    ];
    for (const e of equalizationData) {
        await prisma.taxEqualization.upsert({
            where: {
                tenantId_period: { tenantId, period: e.period }
            },
            update: e,
            create: {
                tenantId,
                ...e
            }
        });
    }
    const permissions = [
        { key: 'tax.equalization.read', description: 'View Tax Equalization' },
        { key: 'tax.equalization.create', description: 'Create Equalization calculation' },
        { key: 'tax.equalization.approve', description: 'Approve Equalization' }
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
    console.log('✅ Tax Equalization Seeding Complete!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-tax-equalization.js.map