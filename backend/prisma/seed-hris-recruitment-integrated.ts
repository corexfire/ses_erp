import { PrismaClient } from './generated/client';

export async function seedHrisRecruitmentIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated HRIS Recruitment Data for FY 2026...');

  // 1. Get Departments for context
  const departments = await prisma.organizationUnit.findMany({
    where: { tenantId, type: 'DEPARTMENT' }
  });

  const getDept = (code: string) => departments.find(d => d.code === code)?.name || 'General';

  // 2. Candidate Data Definitions
  const candidates = [
    { no: 'CAN-2026-001', first: 'Janice', last: 'Doe', email: 'janice.doe@example.com', pos: 'Senior DevOps Engineer', dept: 'ITS', status: 'HIRED', hireDate: new Date('2026-03-01'), salary: 18500000 },
    { no: 'CAN-2026-002', first: 'Robert', last: 'Smith', email: 'rob.smith@gmail.com', pos: 'Project Lead', dept: 'PRJ', status: 'OFFER', hireDate: new Date('2026-05-01'), salary: 15000000 },
    { no: 'CAN-2026-003', first: 'Linda', last: 'Brown', email: 'linda.b@outlook.com', pos: 'HR Executive', dept: 'HRD', status: 'INTERVIEW', hireDate: null, salary: null },
    { no: 'CAN-2026-004', first: 'Michael', last: 'Wong', email: 'm.wong88@example.com', pos: 'Site Engineer', dept: 'PRJ', status: 'HIRED', hireDate: new Date('2026-04-15'), salary: 12000000 },
    { no: 'CAN-2026-005', first: 'Siti', last: 'Aminah', email: 'siti.aminah@mail.id', pos: 'Senior Accountant', dept: 'FIN', status: 'INTERVIEW', hireDate: null, salary: null },
    { no: 'CAN-2026-006', first: 'Kevin', last: 'Tan', email: 'ktan@example.com', pos: 'Frontend Developer', dept: 'ITS', status: 'SCREENING', hireDate: null, salary: null },
    { no: 'CAN-2026-007', first: 'Anita', last: 'Wijaya', email: 'anita.w@example.com', pos: 'Legal Counsel', dept: 'LGL', status: 'REJECTED', hireDate: null, salary: null },
    { no: 'CAN-2026-008', first: 'Budi', last: 'Santoso', email: 'budi.s@outlook.com', pos: 'Warehouse Supervisor', dept: 'WMS', status: 'APPLIED', hireDate: null, salary: null },
    { no: 'CAN-2026-009', first: 'Eka', last: 'Pratama', email: 'eka.p@example.com', pos: 'HSE Coordinator', dept: 'HSE', status: 'OFFER', hireDate: new Date('2026-05-15'), salary: 11000000 },
    { no: 'CAN-2026-010', first: 'Dewi', last: 'Lestari', email: 'dewi.l@example.com', pos: 'Project Coordinator', dept: 'PRJ', status: 'APPLIED', hireDate: null, salary: null },
  ];

  for (const c of candidates) {
    // A. Upsert Candidate
    await prisma.recruitmentCandidate.upsert({
      where: { tenantId_candidateNo: { tenantId, candidateNo: c.no } },
      update: {
        firstName: c.first,
        lastName: c.last,
        email: c.email,
        position: c.pos,
        status: c.status,
      },
      create: {
        tenantId,
        candidateNo: c.no,
        firstName: c.first,
        lastName: c.last,
        email: c.email,
        position: c.pos,
        status: c.status,
      }
    });

    // B. If HIRED, ensure Employee record exists
    if (c.status === 'HIRED') {
      const empNo = c.no.replace('CAN', 'EMP-REC');
      await prisma.employee.upsert({
        where: { tenantId_employeeNo: { tenantId, employeeNo: empNo } },
        update: {
          firstName: c.first,
          lastName: c.last,
          email: c.email,
          position: c.pos,
          department: getDept(c.dept),
          hireDate: c.hireDate,
          salary: c.salary,
          status: 'ACTIVE'
        },
        create: {
          tenantId,
          employeeNo: empNo,
          firstName: c.first,
          lastName: c.last,
          email: c.email,
          position: c.pos,
          department: getDept(c.dept),
          hireDate: c.hireDate,
          salary: c.salary,
          status: 'ACTIVE'
        }
      });
    }
  }

  console.log('✅ Integrated Recruitment Seeding Complete!');
}
