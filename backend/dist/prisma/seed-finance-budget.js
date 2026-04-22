"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedFinanceBudget = seedFinanceBudget;
async function seedFinanceBudget(prisma, tenantId) {
    console.log('💰 Seeding "Full Integrated" Financial Budgets (FY2025)...');
    const fiscalYear = 2026;
    const costCenters = await prisma.costCenter.findMany({ where: { tenantId } });
    if (costCenters.length === 0)
        return;
    const centers = {
        IT: costCenters.find(c => c.code === 'CC-ITD'),
        MKT: costCenters.find(c => c.code === 'CC-MKT'),
        HR: costCenters.find(c => c.code === 'CC-HRD'),
        FIN: costCenters.find(c => c.code === 'CC-FIN'),
        OPS: costCenters.find(c => c.code === 'CC-OPS'),
        PRD: costCenters.find(c => c.code === 'CC-PRD'),
        SLS: costCenters.find(c => c.code === 'CC-SLS'),
        ADM: costCenters.find(c => c.code === 'CC-ADM')
    };
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    for (let m = 1; m <= 12; m++) {
        const monthName = months[m - 1];
        if (centers.IT) {
            const budgetNo = `BUD/2025/IT/${monthName}`;
            await prisma.budget.deleteMany({ where: { tenantId, budgetNo } });
            await prisma.budget.create({
                data: {
                    tenantId,
                    budgetNo,
                    fiscalYear,
                    periodNo: m,
                    accountCode: '6-2320-00',
                    costCenterId: centers.IT.id,
                    amount: 25000000,
                    spentAmount: m < 4 ? 24000000 + (Math.random() * 3000000) : 0,
                    status: m < 4 ? 'APPROVED' : 'DRAFT'
                }
            });
        }
        if (centers.MKT) {
            const budgetNo = `BUD/2025/MKT/${monthName}`;
            await prisma.budget.deleteMany({ where: { tenantId, budgetNo } });
            await prisma.budget.create({
                data: {
                    tenantId,
                    budgetNo,
                    fiscalYear,
                    periodNo: m,
                    accountCode: '6-3100-00',
                    costCenterId: centers.MKT.id,
                    amount: 100000000,
                    spentAmount: m < 4 ? 90000000 + (Math.random() * 20000000) : 0,
                    status: m < 4 ? 'APPROVED' : 'DRAFT'
                }
            });
        }
    }
    const annuals = [
        { cc: centers.HR, code: '6-1500-00', amt: 500000000, no: 'BUD/2025/HR/ANNUAL' },
        { cc: centers.FIN, code: '6-2100-00', amt: 2400000000, no: 'BUD/2025/FIN/RENT' },
        { cc: centers.OPS, code: '6-2200-00', amt: 600000000, no: 'BUD/2025/OPS/UTIL' },
        { cc: centers.PRD, code: '6-2310-00', amt: 1200000000, no: 'BUD/2025/PRD/MAIN' }
    ];
    for (const a of annuals) {
        if (a.cc) {
            await prisma.budget.deleteMany({ where: { tenantId, budgetNo: a.no } });
            await prisma.budget.create({
                data: {
                    tenantId,
                    budgetNo: a.no,
                    fiscalYear,
                    accountCode: a.code,
                    costCenterId: a.cc.id,
                    amount: a.amt,
                    spentAmount: a.amt * 0.25,
                    status: 'APPROVED'
                }
            });
        }
    }
    console.log('✅ "Full Integrated" Financial Budgets seeded successfully.');
}
//# sourceMappingURL=seed-finance-budget.js.map