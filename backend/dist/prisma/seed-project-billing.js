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
    const tenant = await prisma.tenant.findFirst();
    if (!tenant)
        return;
    console.log('--- Seeding Project Billing (ERP Standard) ---');
    const project = await prisma.project.upsert({
        where: { tenantId_code: { tenantId: tenant.id, code: 'PRJ-CON-001' } },
        update: { totalBudget: 5000000000 },
        create: {
            tenantId: tenant.id,
            code: 'PRJ-CON-001',
            name: 'Pembangunan Gudang Logistik Tahap II',
            description: 'Project pembangunan gudang dengan struktur baja dan lantai beton.',
            totalBudget: 5000000000,
            status: 'IN_PROGRESS',
            startDate: new Date('2026-01-01'),
            endDate: new Date('2026-12-31')
        }
    });
    const claim1 = await prisma.progressClaim.upsert({
        where: { tenantId_claimNo: { tenantId: tenant.id, claimNo: 'BA-001/PRJ/2026' } },
        update: {},
        create: {
            tenantId: tenant.id,
            projectId: project.id,
            claimNo: 'BA-001/PRJ/2026',
            claimDate: new Date('2026-02-05'),
            progressPercent: 15,
            description: 'Pekerjaan pondasi dan persiapan lahan 100%',
            status: 'VERIFIED'
        }
    });
    const claim2 = await prisma.progressClaim.upsert({
        where: { tenantId_claimNo: { tenantId: tenant.id, claimNo: 'BA-002/PRJ/2026' } },
        update: {},
        create: {
            tenantId: tenant.id,
            projectId: project.id,
            claimNo: 'BA-002/PRJ/2026',
            claimDate: new Date('2026-03-10'),
            progressPercent: 35,
            description: 'Pekerjaan struktur baja dan dinding',
            status: 'DRAFT'
        }
    });
    await prisma.progressInvoice.upsert({
        where: { id: 'seed-prj-inv-001' },
        update: {},
        create: {
            id: 'seed-prj-inv-001',
            tenantId: tenant.id,
            projectId: project.id,
            progressClaimId: claim1.id,
            progressPercent: 15,
            retentionPercent: 5,
            retentionAmount: 37500000,
            dpDeductionAmount: 75000000,
            grossAmount: 750000000,
            vatPercent: 11,
            vatAmount: 70125000,
            netAmount: 707625000,
            invoiceNo: 'INV/2026/02/001',
            period: '2026-02',
            status: 'VERIFIED'
        }
    });
    console.log('Seeded Project: PRJ-CON-001 with 2 Claims and 1 Invoice.');
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
//# sourceMappingURL=seed-project-billing.js.map