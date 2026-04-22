import { PrismaClient } from './generated/client';

export async function seedHrisAnalytics(prisma: PrismaClient, tenantId: string) {
  console.log('📊 Seeding HRIS Analytics Data...');

  const departments = [
    { code: 'ENG', name: 'Engineering' },
    { code: 'HCM', name: 'People & Culture' },
    { code: 'FIN', name: 'Finance' },
    { code: 'MKT', name: 'Marketing' },
    { code: 'OPS', name: 'Operations' }
  ];

  // 1. Check/Seed Departments (OrganizationUnits)
  for (const dept of departments) {
    await prisma.organizationUnit.upsert({
      where: { tenantId_code: { tenantId, code: dept.code } },
      update: { name: dept.name, type: 'DEPARTMENT' },
      create: { tenantId, code: dept.code, name: dept.name, type: 'DEPARTMENT' }
    });
  }

  // 2. Clear existing HR data for this tenant to avoid conflicts (Optional/Targeted)
  // await prisma.attendance.deleteMany({ where: { tenantId } });
  // await prisma.payrollRun.deleteMany({ where: { tenantId } });

  // 3. Seed Employees
  const employeesData = [
    { no: 'EMP001', first: 'Zaki', last: 'Aditya', dept: 'Engineering', pos: 'Fullstack Developer', salary: 15000000, hireDate: '2025-01-15' },
    { no: 'EMP002', first: 'Maya', last: 'Sari', dept: 'People & Culture', pos: 'HR Manager', salary: 18000000, hireDate: '2024-11-20' },
    { no: 'EMP003', first: 'Budi', last: 'Hartono', dept: 'Finance', pos: 'Accountant', salary: 12000000, hireDate: '2025-02-01' },
    { no: 'EMP004', first: 'Santi', last: 'Dewi', dept: 'Marketing', pos: 'Social Media lead', salary: 10000000, hireDate: '2025-03-10' },
    { no: 'EMP005', first: 'Rahmat', last: 'Hidayat', dept: 'Operations', pos: 'Branch Manager', salary: 20000000, hireDate: '2023-05-15' },
    { no: 'EMP006', first: 'Dian', last: 'Puspita', dept: 'Engineering', pos: 'Backend Engineer', salary: 14000000, hireDate: '2025-01-20' },
    { no: 'EMP007', first: 'Eko', last: 'Prasetyo', dept: 'Engineering', pos: 'Frontend Engineer', salary: 13000000, hireDate: '2025-01-25' },
    { no: 'EMP008', first: 'Fitri', last: 'Ani', dept: 'Engineering', pos: 'QA Tester', salary: 9000000, hireDate: '2025-02-15' },
    { no: 'EMP009', first: 'Guntur', last: 'Pamungkas', dept: 'Marketing', pos: 'Graphic Designer', salary: 8500000, hireDate: '2025-04-01' },
    { no: 'EMP010', first: 'Hani', last: 'Utami', dept: 'Finance', pos: 'Tax Specialist', salary: 11000000, hireDate: '2025-02-10' },
    { no: 'EMP011', first: 'Indra', last: 'Wijaya', dept: 'Operations', pos: 'Supervisor', salary: 12500000, hireDate: '2024-06-15' },
    { no: 'EMP012', first: 'Joko', last: 'Susilo', dept: 'Operations', pos: 'Staff', salary: 6000000, hireDate: '2024-08-20' },
    { no: 'EMP013', first: 'Kartika', last: 'Putri', dept: 'People & Culture', pos: 'Recruiter', salary: 9500000, hireDate: '2025-03-01' },
    { no: 'EMP014', first: 'Lukman', last: 'Hakim', dept: 'Marketing', pos: 'SEO Specialist', salary: 10500000, hireDate: '2025-03-15' },
    { no: 'EMP015', first: 'Nina', last: 'Kusuma', dept: 'Finance', pos: 'Finance Staff', salary: 7000000, hireDate: '2025-03-20' },
    { no: 'EMP016', first: 'Oki', last: 'Setiawan', dept: 'Engineering', pos: 'DevOps', salary: 16000000, hireDate: '2024-12-01' },
    { no: 'EMP017', first: 'Putra', last: 'Bangsa', dept: 'Engineering', pos: 'Lead Dev', salary: 25000000, hireDate: '2022-01-01' },
    { no: 'EMP018', first: 'Rina', last: 'Wati', dept: 'Marketing', pos: 'Content Writer', salary: 7500000, hireDate: '2025-04-05' },
    { no: 'EMP019', first: 'Seno', last: 'Aji', dept: 'Operations', pos: 'Staff', salary: 6000000, hireDate: '2024-09-10' },
    { no: 'EMP020', first: 'Tiara', last: 'Lestari', dept: 'Finance', pos: 'Head of Finance', salary: 22000000, hireDate: '2023-10-10' }
  ];

  const createdEmployees = [];
  for (const emp of employeesData) {
    const record = await prisma.employee.upsert({
      where: { tenantId_employeeNo: { tenantId, employeeNo: emp.no } },
      update: {
        firstName: emp.first,
        lastName: emp.last,
        email: `${emp.first.toLowerCase()}@ses-erp.local`,
        department: emp.dept,
        position: emp.pos,
        salary: emp.salary,
        hireDate: new Date(emp.hireDate),
        status: 'ACTIVE'
      },
      create: {
        tenantId,
        employeeNo: emp.no,
        firstName: emp.first,
        lastName: emp.last,
        email: `${emp.first.toLowerCase()}@ses-erp.local`,
        department: emp.dept,
        position: emp.pos,
        salary: emp.salary,
        hireDate: new Date(emp.hireDate),
        status: 'ACTIVE'
      }
    });
    createdEmployees.push(record);
  }

  // 4. Seed Attendance (Last 30 Days)
  const today = new Date();
  for (const emp of createdEmployees) {
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      // Randomize presence (95% attendance)
      if (Math.random() > 0.05) {
        const checkIn = new Date(date);
        checkIn.setHours(8, Math.floor(Math.random() * 30), 0);
        
        const checkOut = new Date(date);
        checkOut.setHours(17, Math.floor(Math.random() * 60), 0);

        await prisma.attendance.upsert({
          where: { tenantId_employeeId_date: { tenantId, employeeId: emp.id, date } },
          update: { checkIn, checkOut, status: 'PRESENT', workHours: 9 },
          create: { tenantId, employeeId: emp.id, date, checkIn, checkOut, status: 'PRESENT', workHours: 9 }
        });
      }
    }
  }

  // 5. Seed Payroll History (Last 3 Months)
  const periods = ['2026-01', '2026-02', '2026-03'];
  for (const emp of createdEmployees) {
    const salary = Number(emp.salary || 0);
    for (const period of periods) {
      await prisma.payrollRun.upsert({
        where: { tenantId_employeeId_period: { tenantId, employeeId: emp.id, period } },
        update: {
          basicSalary: salary,
          grossPay: salary,
          netPay: salary * 0.9, // Simplified tax
          taxAmount: salary * 0.1,
          status: 'PAID',
          payDate: new Date(`${period}-25`)
        },
        create: {
          tenantId,
          employeeId: emp.id,
          period,
          basicSalary: salary,
          grossPay: salary,
          netPay: salary * 0.9,
          taxAmount: salary * 0.1,
          status: 'PAID',
          payDate: new Date(`${period}-25`)
        }
      });
    }
  }

  // 6. Seed Terminations (for turnover analysis)
  const terminatedNominal = [
    { no: 'EMP-LOST-1', first: 'Andi', last: 'Mulyadi', dept: 'Operations', date: '2026-02-10' },
    { no: 'EMP-LOST-2', first: 'Bella', last: 'Sari', dept: 'Marketing', date: '2026-03-05' }
  ];

  for (const t of terminatedNominal) {
      const emp = await prisma.employee.upsert({
          where: { tenantId_employeeNo: { tenantId, employeeNo: t.no } },
          update: { status: 'TERMINATED' },
          create: { 
              tenantId, 
              employeeNo: t.no, 
              firstName: t.first, 
              lastName: t.last, 
              email: `${t.first.toLowerCase()}@lost.local`,
              department: t.dept,
              status: 'TERMINATED',
              hireDate: new Date('2024-01-01')
          }
      });

      const existingTermination = await prisma.employeeTermination.findFirst({
          where: { tenantId, employeeId: emp.id }
      });

      if (!existingTermination) {
        await prisma.employeeTermination.create({
            data: { 
                tenantId, 
                employeeId: emp.id, 
                terminationDate: new Date(t.date), 
                reason: 'RESIGNED', 
                type: 'VOLUNTARY',
                totalAmount: 0 // Required field
            }
        });
      }
  }

  console.log('✅ HRIS Analytics Data seeded successfully.');
}
