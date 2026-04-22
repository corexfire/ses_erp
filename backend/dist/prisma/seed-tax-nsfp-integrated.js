"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTaxNsfpIntegrated = seedTaxNsfpIntegrated;
async function seedTaxNsfpIntegrated(prisma, tenantId) {
    console.log('🌱 Seeding Integrated NSFP Range Data for FY 2024-2026...');
    const nsfpData = [
        {
            startNo: '000.24-10000001',
            endNo: '000.24-10000500',
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-12-31'),
            isUsed: true,
            lastUsedNo: '000.24-10000500'
        },
        {
            startNo: '000.25-20000001',
            endNo: '000.25-20001000',
            startDate: new Date('2025-01-10'),
            isUsed: true,
            lastUsedNo: '000.25-20000450'
        },
        {
            startNo: '000.26-00002001',
            endNo: '000.26-00003000',
            startDate: new Date('2026-01-01'),
            isUsed: true,
            lastUsedNo: '000.26-00002012'
        },
        {
            startNo: '000.26-00003001',
            endNo: '000.26-00004000',
            startDate: new Date('2026-04-15'),
            isUsed: false,
            lastUsedNo: null
        }
    ];
    for (const r of nsfpData) {
        await prisma.nsfpRange.upsert({
            where: {
                tenantId_startNo_endNo: {
                    tenantId,
                    startNo: r.startNo,
                    endNo: r.endNo
                }
            },
            update: {
                isUsed: r.isUsed,
                lastUsedNo: r.lastUsedNo,
                startDate: r.startDate,
                endDate: r.endDate || null
            },
            create: {
                tenantId,
                startNo: r.startNo,
                endNo: r.endNo,
                startDate: r.startDate,
                endDate: r.endDate || null,
                isUsed: r.isUsed,
                lastUsedNo: r.lastUsedNo
            }
        });
    }
    console.log('✅ Integrated NSFP Seeding Complete!');
}
//# sourceMappingURL=seed-tax-nsfp-integrated.js.map