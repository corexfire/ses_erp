import { PrismaClient } from './generated/client';

export async function seedTaxPph21Integrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated PPh 21 (Employee Tax) for FY 2026...');

  // 1. Ensure Dependencies Exist
  const salaryPayableAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1210-00' } } });
  const pph21Account = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1320-00' } } });
  const salaryExpenseAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '6-1100-00' } } });

  if (!salaryPayableAccount || !pph21Account || !salaryExpenseAccount) {
    console.warn('⚠️  Required accounts for PPh 21 are missing. Skipping detailed integration.');
  }

  // 2. Employees Data
  const employees = [
    { no: 'EMP-2026-001', first: 'Budi', last: 'Santoso', email: 'budi.s@example.com', sal: 15000000, dept: 'Engineering' },
    { no: 'EMP-2026-002', first: 'Siti', last: 'Aminah', email: 'siti.a@example.com', sal: 10000000, dept: 'Finance' },
    { no: 'EMP-2026-003', first: 'Andi', last: 'Wijaya', email: 'andi.w@example.com', sal: 8000000, dept: 'Operations' }
  ];

  const seededEmployees = [];
  for (const e of employees) {
    const emp = await prisma.employee.upsert({
      where: { tenantId_employeeNo: { tenantId, employeeNo: e.no } },
      update: { salary: e.sal, department: e.dept },
      create: {
        tenantId,
        employeeNo: e.no,
        firstName: e.first,
        lastName: e.last,
        email: e.email,
        salary: e.sal,
        department: e.dept,
        status: 'ACTIVE'
      }
    });
    seededEmployees.push(emp);
  }

  // 3. Payroll & Withholding Scenarios (Period: 2026-04)
  const period = '2026-04';
  const payDate = new Date('2026-04-28');
  let totalGross = 0;
  let totalTax = 0;
  let totalNet = 0;

  for (const emp of seededEmployees) {
    const gross = Number(emp.salary) || 0;
    const tax = gross * 0.05; // Simplified PPh 21 (5%)
    const net = gross - tax;

    totalGross += gross;
    totalTax += tax;
    totalNet += net;

    // A. Create Payroll Run
    await prisma.payrollRun.upsert({
      where: { tenantId_employeeId_period: { tenantId, employeeId: emp.id, period } },
      update: {},
      create: {
        tenantId,
        employeeId: emp.id,
        period,
        basicSalary: gross,
        allowances: 0,
        deductions: 0,
        grossPay: gross,
        taxAmount: tax,
        netPay: net,
        status: 'POSTED',
        payDate: payDate
      }
    });

    // B. Create PphWithholding record (Individual Detail)
    await prisma.pphWithholding.upsert({
      where: { tenantId_transNo: { tenantId, transNo: `PAYROLL-21-${emp.employeeNo}-${period}` } },
      update: {},
      create: {
        tenantId,
        transNo: `PAYROLL-21-${emp.employeeNo}-${period}`,
        transDate: payDate,
        incomeType: '21',
        taxpayerName: `${emp.firstName} ${emp.lastName}`,
        grossAmount: gross,
        rate: 5,
        taxAmount: tax,
        status: 'POSTED',
        bupotNo: `21-2026-04-${emp.employeeNo.slice(-3)}`,
        bupotDate: payDate
      }
    });
  }

  // 4. Financial Journalization (Consolidated)
  if (salaryPayableAccount && pph21Account && salaryExpenseAccount) {
    await prisma.journalEntry.upsert({
      where: { tenantId_entryNo: { tenantId, entryNo: `JE-PAYROLL-${period}` } },
      update: {},
      create: {
        tenantId,
        entryNo: `JE-PAYROLL-${period}`,
        entryDate: payDate,
        description: `Pengakuan Gaji & PPh 21 - Periode ${period}`,
        status: 'POSTED',
        totalDebit: totalGross,
        totalCredit: totalGross,
        lines: {
          create: [
            { tenantId, lineNo: 1, accountCode: salaryExpenseAccount.code, debit: totalGross, credit: 0, description: `Total Beban Gaji ${period}` },
            { tenantId, lineNo: 2, accountCode: salaryPayableAccount.code, debit: 0, credit: totalNet, description: `Total Gaji Bersih Terhutang` },
            { tenantId, lineNo: 3, accountCode: pph21Account.code, debit: 0, credit: totalTax, description: `Total Pemotongan PPh 21` }
          ]
        }
      }
    });
  }

  console.log('✅ Integrated PPh 21 Seeding Complete!');
}
