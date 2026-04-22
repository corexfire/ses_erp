"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedHrisOffboarding = seedHrisOffboarding;
async function seedHrisOffboarding(prisma, tenantId) {
    console.log('🚪 Seeding 10+ Offboarding & Severance Records...');
    const reasons = [
        'Resign - Pindah ke perusahaan lain',
        'Pensiun Normal',
        'Efisiensi Perusahaan (Layoff)',
        'Habis Masa Kontrak',
        'Pelanggaran Berat (Disiplin)'
    ];
    const types = ['RESIGNATION', 'RETIREMENT', 'LAYOFF', 'TERMINATION', 'EXPIRATION'];
    for (let i = 1; i <= 10; i++) {
        const employeeNo = `ALUM-${i.toString().padStart(3, '0')}`;
        const lastName = `Ex-Employee ${i}`;
        const email = `ex.emp${i}@ses-erp.local`;
        const emp = await prisma.employee.upsert({
            where: { tenantId_employeeNo: { tenantId, employeeNo } },
            update: { status: 'INACTIVE', salary: 8000000 + (i * 500000) },
            create: {
                tenantId,
                employeeNo,
                firstName: 'Alumni',
                lastName,
                email,
                position: 'Former Staff',
                department: 'General',
                hireDate: new Date(2020, 0, 1),
                status: 'INACTIVE',
                salary: 8000000 + (i * 500000)
            }
        });
        await prisma.employeeTermination.deleteMany({
            where: { tenantId, employeeId: emp.id }
        });
        const base = Number(emp.salary || 8000000);
        const severance = base * 7;
        const servicePay = base * 3;
        const compensation = (severance + servicePay) * 0.15;
        const total = severance + servicePay + compensation;
        await prisma.employeeTermination.create({
            data: {
                tenantId,
                employeeId: emp.id,
                terminationDate: new Date(2026, i % 4, 15),
                type: types[i % types.length],
                reason: reasons[i % reasons.length],
                severanceAmount: severance,
                servicePayAmount: servicePay,
                compensationPayAmount: compensation,
                totalAmount: total,
                status: i % 3 === 0 ? 'PENDING' : 'PAID'
            }
        });
    }
    console.log('✅ HRIS Offboarding Seeding Complete!');
}
//# sourceMappingURL=seed-hris-offboarding.js.map