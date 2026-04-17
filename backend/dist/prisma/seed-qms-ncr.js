"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedNcr = seedNcr;
async function seedNcr(prisma, tenantId) {
    const admin = await prisma.user.findFirst({ where: { tenantId, isSuperAdmin: true } });
    const item = await prisma.item.findFirst({ where: { tenantId } });
    const qc = await prisma.qcInspection.findFirst({ where: { tenantId } });
    if (!admin || !item) {
        console.log('Skipping NCR seed: admin or item not found');
        return;
    }
    const ncrs = [
        {
            code: 'NCR-2024-001',
            sourceType: 'QC',
            itemId: item.id,
            qty: 10,
            ncrType: 'MATERIAL',
            severity: 'HIGH',
            status: 'OPEN',
            description: 'Kerusakan komponen IC pada batch penerimaan GRN-001.',
            reportedById: admin.id,
            qcId: qc?.id,
        },
        {
            code: 'NCR-2024-002',
            sourceType: 'PRODUCTION',
            itemId: item.id,
            qty: 5,
            ncrType: 'PROCESS',
            severity: 'CRITICAL',
            status: 'UNDER_INVESTIGATION',
            description: 'Kontaminasi bahan kimia pada lining produksi A.',
            rootCause: 'Kebocoran seal pada tangki pencampur.',
            reportedById: admin.id,
        },
        {
            code: 'NCR-2024-003',
            sourceType: 'WAREHOUSE',
            itemId: item.id,
            qty: 2,
            ncrType: 'FINISHED_GOOD',
            severity: 'LOW',
            status: 'CLOSED',
            description: 'Goresan ringan pada casing produk saat pemindahan pallet.',
            disposition: 'USE_AS_IS',
            reportedById: admin.id,
        },
    ];
    for (const ncr of ncrs) {
        await prisma.nonConformanceReport.upsert({
            where: { tenantId_code: { tenantId, code: ncr.code } },
            update: {},
            create: {
                tenantId,
                ...ncr,
            },
        });
    }
    console.log('Seeded NCR records');
}
//# sourceMappingURL=seed-qms-ncr.js.map