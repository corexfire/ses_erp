import { PrismaClient } from './generated/client';

export async function seedTaxBuktiPotongIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated Annual Bukti Potong (1721-A1) for FY 2026...');

  // 1. Identify Employees (from previous PPh 21 seed)
  const budi = await prisma.employee.findFirst({ where: { tenantId, employeeNo: 'EMP-2026-001' } });
  const siti = await prisma.employee.findFirst({ where: { tenantId, employeeNo: 'EMP-2026-002' } });
  const andi = await prisma.employee.findFirst({ where: { tenantId, employeeNo: 'EMP-2026-003' } });

  if (!budi || !siti || !andi) {
    console.warn('⚠️  Employees from PPh 21 seed not found. Skipping A1 integration.');
    return;
  }

  const pph21Account = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1320-00' } } });
  const salaryExpenseAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '6-1100-00' } } });

  // 2. Scenario for Budi Santoso: Full Year (12 Months)
  // We'll create the remaining 11 months of payroll for Budi to make the A1 "Real"
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  let budiTotalGross = 0;
  let budiTotalTax = 0;

  for (const month of months) {
    const period = `2026-${month}`;
    const payDate = new Date(2026, parseInt(month) - 1, 28);
    const gross = Number(budi.salary) || 15000000;
    const tax = gross * 0.05;

    budiTotalGross += gross;
    budiTotalTax += tax;

    // Upsert PayrollRun (skip April if already exists)
    await prisma.payrollRun.upsert({
      where: { tenantId_employeeId_period: { tenantId, employeeId: budi.id, period } },
      update: {},
      create: {
        tenantId,
        employeeId: budi.id,
        period,
        basicSalary: gross,
        allowances: 0,
        deductions: 0,
        grossPay: gross,
        taxAmount: tax,
        netPay: gross - tax,
        status: 'POSTED',
        payDate: payDate
      }
    });
  }

  // 3. Create Annual withholding records (21-A1)
  const annualScenarios = [
    {
      emp: budi,
      gross: budiTotalGross,
      tax: budiTotalTax,
      bupotNo: '1.1-12.26-0000001'
    },
    {
      emp: siti,
      gross: Number(siti.salary) * 12, // Mock full year
      tax: Number(siti.salary) * 12 * 0.05,
      bupotNo: '1.1-12.26-0000002'
    },
    {
      emp: andi,
      gross: Number(andi.salary) * 12, // Mock full year
      tax: Number(andi.salary) * 12 * 0.05,
      bupotNo: '1.1-12.26-0000003'
    }
  ];

  const issuanceDate = new Date('2026-12-31');

  for (const s of annualScenarios) {
    await prisma.pphWithholding.upsert({
      where: { tenantId_transNo: { tenantId, transNo: `ANNUAL-A1-${s.emp.employeeNo}-2026` } },
      update: {},
      create: {
        tenantId,
        transNo: `ANNUAL-A1-${s.emp.employeeNo}-2026`,
        transDate: issuanceDate,
        incomeType: '21-A1',
        taxpayerName: `${s.emp.firstName} ${s.emp.lastName}`,
        npwp: s.emp.email.includes('siti') ? null : '01.222.333.4-001.000', // Mix of NPWP and No-NPWP
        grossAmount: s.gross,
        rate: 5,
        taxAmount: s.tax,
        status: 'POSTED',
        bupotNo: s.bupotNo,
        bupotDate: issuanceDate
      }
    });
  }

  console.log('✅ Integrated Annual Bukti Potong (1721-A1) Seeding Complete!');
}
