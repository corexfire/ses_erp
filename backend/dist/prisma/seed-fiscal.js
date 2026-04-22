"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedFiscal = seedFiscal;
async function seedFiscal(prisma, tenantId) {
    console.log('📅 Seeding Fiscal Years & Accounting Periods...');
    const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
    const years = [
        {
            code: 'FY2024',
            name: 'Fiscal Year 2024',
            startDate: new Date('2024-01-01T00:00:00Z'),
            endDate: new Date('2024-12-31T23:59:59Z'),
            isClosed: true,
            isActive: false
        },
        {
            code: 'FY2025',
            name: 'Fiscal Year 2025',
            startDate: new Date('2025-01-01T00:00:00Z'),
            endDate: new Date('2025-12-31T23:59:59Z'),
            isClosed: false,
            isActive: false
        },
        {
            code: 'FY2026',
            name: 'Fiscal Year 2026',
            startDate: new Date('2026-01-01T00:00:00Z'),
            endDate: new Date('2026-12-31T23:59:59Z'),
            isClosed: false,
            isActive: true
        }
    ];
    for (const y of years) {
        const fiscalYear = await prisma.fiscalYear.upsert({
            where: { tenantId_code: { tenantId, code: y.code } },
            update: {
                name: y.name,
                startDate: y.startDate,
                endDate: y.endDate,
                isClosed: y.isClosed,
                isActive: y.isActive
            },
            create: {
                tenantId,
                ...y
            }
        });
        const periods = [];
        let cursor = new Date(y.startDate);
        cursor = new Date(cursor.getFullYear(), cursor.getMonth(), 1, 0, 0, 0, 0);
        const end = new Date(y.endDate);
        let periodNo = 1;
        while (cursor <= end) {
            const pStart = new Date(cursor);
            const pEnd = endOfMonth(cursor);
            periods.push({
                tenantId,
                fiscalYearId: fiscalYear.id,
                periodNo,
                startDate: pStart,
                endDate: pEnd > end ? end : pEnd,
                isOpen: !y.isClosed
            });
            periodNo += 1;
            cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1, 0, 0, 0, 0);
        }
        for (const p of periods) {
            await prisma.accountingPeriod.upsert({
                where: {
                    tenantId_fiscalYearId_periodNo: {
                        tenantId,
                        fiscalYearId: fiscalYear.id,
                        periodNo: p.periodNo
                    }
                },
                update: {
                    startDate: p.startDate,
                    endDate: p.endDate,
                    isOpen: p.isOpen
                },
                create: p
            });
        }
    }
    console.log('✅ Fiscal Years and Periods seeded successfully.');
}
//# sourceMappingURL=seed-fiscal.js.map