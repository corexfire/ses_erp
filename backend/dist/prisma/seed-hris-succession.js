"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedHrisSuccession = seedHrisSuccession;
async function seedHrisSuccession(prisma, tenantId) {
    console.log('🧬 Seeding HRIS Succession Data...');
    const [putra, zaki, maya, rina, tiara] = await Promise.all([
        prisma.employee.findFirst({ where: { tenantId, employeeNo: 'EMP017' } }),
        prisma.employee.findFirst({ where: { tenantId, employeeNo: 'EMP001' } }),
        prisma.employee.findFirst({ where: { tenantId, employeeNo: 'EMP002' } }),
        prisma.employee.findFirst({ where: { tenantId, employeeNo: 'EMP018' } }),
        prisma.employee.findFirst({ where: { tenantId, employeeNo: 'EMP020' } }),
    ]);
    const existingEmployees = await prisma.employee.findMany({ where: { tenantId, status: 'ACTIVE' }, take: 10 });
    const plansData = [
        { pos: 'Chief Technology Officer (CTO)', dept: 'Engineering', incumbentId: putra?.id, priority: 'HIGH' },
        { pos: 'Head of People & Culture', dept: 'HR', incumbentId: maya?.id, priority: 'MEDIUM' },
        { pos: 'Chief Financial Officer (CFO)', dept: 'Finance', incumbentId: tiara?.id, priority: 'HIGH' },
        { pos: 'Engineering Lead', dept: 'Engineering', incumbentId: zaki?.id, priority: 'MEDIUM' },
        { pos: 'Marketing Manager', dept: 'Marketing', incumbentId: rina?.id, priority: 'LOW' }
    ];
    for (const pData of plansData) {
        const plan = await prisma.successionPlan.create({
            data: {
                tenantId,
                positionName: pData.pos,
                department: pData.dept,
                incumbentId: pData.incumbentId,
                priority: pData.priority,
                status: 'ACTIVE'
            }
        });
        const candidates = existingEmployees
            .filter(e => e.id !== pData.incumbentId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        for (let i = 0; i < candidates.length; i++) {
            const readiness = i === 0 ? 'READY_NOW' : (i === 1 ? 'READY_1_2_YRS' : 'READY_3_PLUS_YRS');
            await prisma.successionCandidate.create({
                data: {
                    tenantId,
                    planId: plan.id,
                    employeeId: candidates[i].id,
                    readiness,
                    potentialScore: Math.floor(Math.random() * 3) + 3,
                    performanceScore: Math.floor(Math.random() * 3) + 3,
                    gapAnalysis: 'Needs leadership training and budget management experience.'
                }
            });
        }
    }
    console.log('✅ HRIS Succession Data seeded successfully.');
}
//# sourceMappingURL=seed-hris-succession.js.map