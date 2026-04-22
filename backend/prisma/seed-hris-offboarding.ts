import { PrismaClient } from './generated/client';

export async function seedHrisOffboarding(prisma: PrismaClient, tenantId: string) {
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

    // 1. Create/Update Employee
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

    // 2. Clean up existing termination for this employee to avoid duplicates
    await prisma.employeeTermination.deleteMany({
      where: { tenantId, employeeId: emp.id }
    });

    // 3. Calculate Severance
    const base = Number(emp.salary || 8000000);
    const severance = base * 7;
    const servicePay = base * 3;
    const compensation = (severance + servicePay) * 0.15;
    const total = severance + servicePay + compensation;

    // 4. Create Termination Record
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
