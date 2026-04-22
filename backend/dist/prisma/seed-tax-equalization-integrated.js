"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTaxEqualizationIntegrated = seedTaxEqualizationIntegrated;
async function seedTaxEqualizationIntegrated(prisma, tenantId) {
    console.log('🌱 Seeding Integrated Tax Equalization (Revenue Recon) for FY 2026...');
    const revenueAccount = await prisma.coaAccount.findUnique({
        where: { tenantId_code: { tenantId, code: '4-1100-00' } }
    });
    if (!revenueAccount) {
        console.warn('⚠️  Revenue account 4-1100-00 not found. Using zero baseline for book income.');
    }
    const months = [
        '2026-01', '2026-02', '2026-03', '2026-04',
        '2026-05', '2026-06', '2026-07', '2026-08',
        '2026-09', '2026-10', '2026-11', '2026-12'
    ];
    for (const period of months) {
        const [year, month] = period.split('-').map(Number);
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        const bookLines = await prisma.journalEntryLine.findMany({
            where: {
                tenantId,
                accountCode: '4-1100-00',
                journalEntry: {
                    entryDate: { gte: startDate, lte: endDate },
                    status: 'POSTED'
                }
            }
        });
        let bookIncome = bookLines.reduce((sum, line) => sum + Number(line.credit), 0);
        const fiscalInvoices = await prisma.taxInvoice.findMany({
            where: {
                tenantId,
                invoiceType: 'OUTPUT',
                invoiceDate: { gte: startDate, lte: endDate },
                status: 'POSTED'
            }
        });
        let fiscalIncome = fiscalInvoices.reduce((sum, inv) => sum + Number(inv.baseAmount), 0);
        if (bookIncome === 0 && fiscalIncome === 0) {
            bookIncome = 500000000 + (Math.random() * 100000000);
            fiscalIncome = bookIncome;
        }
        let description = 'Rekonsiliasi rutin bulanan';
        let difference = fiscalIncome - bookIncome;
        if (period === '2026-06') {
            const adjustment = 50000000;
            bookIncome += adjustment;
            difference = fiscalIncome - bookIncome;
            description = 'Varians: Hibah Pemerintah (Pendapatan Bukan Objek Pajak)';
        }
        await prisma.taxEqualization.upsert({
            where: {
                tenantId_period: { tenantId, period }
            },
            update: {
                bookIncome,
                fiscalIncome,
                difference,
                description,
                status: (month < 4) ? 'APPROVED' : 'DRAFT'
            },
            create: {
                tenantId,
                period,
                bookIncome,
                fiscalIncome,
                difference,
                description,
                status: (month < 4) ? 'APPROVED' : 'DRAFT'
            }
        });
    }
    console.log('✅ Integrated Tax Equalization Seeding Complete!');
}
//# sourceMappingURL=seed-tax-equalization-integrated.js.map