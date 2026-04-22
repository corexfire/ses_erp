import { PrismaClient } from './generated/client';

export async function seedHrisAttendanceIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated HRIS Attendance & Payroll Data for April 2026...');

  // 1. Seed Shifts
  const shifts = [
    { code: 'SH-OFFICE', name: 'Regular Office Shift', start: '08:00', end: '17:00' },
    { code: 'SH-SITE', name: 'Construction Site Shift', start: '07:00', end: '16:00' },
    { code: 'SH-NIGHT', name: 'Security Night Shift', start: '19:00', end: '05:00' },
  ];

  for (const s of shifts) {
    await prisma.shift.upsert({
      where: { tenantId_code: { tenantId, code: s.code } },
      update: { name: s.name, startTime: s.start, endTime: s.end },
      create: { tenantId, code: s.code, name: s.name, startTime: s.start, endTime: s.end }
    });
  }

  // 2. Fetch Employees
  const employees = await prisma.employee.findMany({ where: { tenantId } });
  const period = '2026-04';

  for (const emp of employees) {
    let daysPresent = 0;
    let daysAbsent = 0;
    let overtimeHours = 0;
    let lateDeduction = 0;

    // April 2026 has 30 days
    for (let day = 1; day <= 30; day++) {
      const date = new Date(2026, 3, day); // April is month index 3
      const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday

      // Skip Weekends (mostly)
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      const rand = Math.random();
      
      if (rand < 0.05) {
        // 5% Absent
        daysAbsent++;
        await prisma.attendance.upsert({
           where: { tenantId_employeeId_date: { tenantId, employeeId: emp.id, date } },
           update: { status: 'ABSENT', checkIn: null, checkOut: null, workHours: 0 },
           create: { tenantId, employeeId: emp.id, date, status: 'ABSENT' }
        });
      } else {
        // Present
        daysPresent++;
        const checkIn = new Date(date);
        
        // Random lateness (10% chance to be late)
        if (Math.random() < 0.1) {
            checkIn.setHours(8, 30 + Math.floor(Math.random() * 30), 0); // 08:30 - 09:00
            lateDeduction += 50000; // Flat late fee for seed demo
        } else {
            checkIn.setHours(8, 0, 0);
        }

        const checkOut = new Date(date);
        let workHours = 8;

        // Random overtime (15% chance to have OT)
        if (Math.random() < 0.15) {
            const ot = Math.floor(Math.random() * 3) + 1; // 1-3 hours OT
            checkOut.setHours(17 + ot, 0, 0);
            overtimeHours += ot;
            workHours += ot;
        } else {
            checkOut.setHours(17, 0, 0);
        }

        await prisma.attendance.upsert({
           where: { tenantId_employeeId_date: { tenantId, employeeId: emp.id, date } },
           update: { status: 'PRESENT', checkIn, checkOut, workHours },
           create: { tenantId, employeeId: emp.id, date, status: 'PRESENT', checkIn, checkOut, workHours }
        });
      }
    }

    // 3. Create Integrated Payroll Entry for April 2026
    const basicSalary = Number(emp.salary || 8000000);
    const overtimePay = overtimeHours * 150000; // IDR 150k per hour for demo
    const absenceDeduction = daysAbsent * (basicSalary / 22); // Prorated deduction
    
    const allowances = overtimePay;
    const deductions = absenceDeduction + lateDeduction;
    const grossPay = basicSalary + allowances;
    const netPay = grossPay - deductions;

    await prisma.payrollRun.upsert({
      where: { tenantId_employeeId_period: { tenantId, employeeId: emp.id, period } },
      update: {
        basicSalary,
        allowances,
        deductions,
        grossPay,
        netPay,
        status: 'APPROVED',
        payDate: new Date(2026, 3, 28)
      },
      create: {
        tenantId,
        employeeId: emp.id,
        period,
        basicSalary,
        allowances,
        deductions,
        grossPay,
        netPay,
        status: 'APPROVED',
        payDate: new Date(2026, 3, 28)
      }
    });
  }

  console.log('✅ Integrated Attendance & Payroll Seeding Complete!');
}
