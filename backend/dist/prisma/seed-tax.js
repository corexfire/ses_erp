"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTax = seedTax;
async function seedTax(prisma, tenantId) {
    console.log('🏛️ Seeding Tax Configurations (PPN & PPh)...');
    const taxCodes = [
        { code: 'PPN-11', name: 'Pajak Pertambahan Nilai 11%', rate: 11.0 },
        { code: 'PPN-0', name: 'PPN Bebas/Ekspor 0%', rate: 0.0 },
        { code: 'PPh-21', name: 'Pajak Penghasilan Pasal 21', rate: 0.0 },
        { code: 'PPh-23-S', name: 'PPh Pasal 23 - Jasa (2%)', rate: 2.0 },
        { code: 'PPh-23-R', name: 'PPh Pasal 23 - Royalti (15%)', rate: 15.0 },
        { code: 'PPh-4-2', name: 'PPh Pasal 4 Ayat 2 (Final)', rate: 0.5 },
    ];
    const now = new Date();
    for (const t of taxCodes) {
        await prisma.taxCode.upsert({
            where: { tenantId_code: { tenantId, code: t.code } },
            update: {
                name: t.name,
                rate: t.rate,
                effectiveDate: now,
                isActive: true
            },
            create: {
                tenantId,
                code: t.code,
                name: t.name,
                rate: t.rate,
                effectiveDate: now
            }
        });
    }
    console.log('✅ Tax Configurations seeded successfully.');
}
//# sourceMappingURL=seed-tax.js.map