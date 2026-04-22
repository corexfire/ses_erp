import { PrismaClient } from './generated/client';

export async function seedHrisProductivity(prisma: PrismaClient, tenantId: string) {
  console.log('🧬 Seeding Comprehensive HRIS Productivity Data...');

  const employees = await prisma.employee.findMany({
    where: { tenantId, status: 'ACTIVE' },
    take: 12
  });

  if (employees.length < 5) {
    console.warn('⚠️ Too few active employees found to seed realistic HRIS data. Skipping detailed seeding.');
    return;
  }

  const period = '2026';
  const currentDate = new Date();

  for (let i = 0; i < employees.length; i++) {
    const emp = employees[i];

    // 1. Leave Balances & Requests
    await prisma.leaveBalance.upsert({
      where: { id: `bal-${emp.id}-${period}` },
      update: {},
      create: {
        id: `bal-${emp.id}-${period}`,
        tenantId,
        employeeId: emp.id,
        leaveType: 'ANNUAL',
        allowance: 12,
        used: i % 3,
        period
      }
    });

    if (i % 2 === 0) {
      await prisma.leaveRequest.create({
        data: {
          tenantId,
          employeeId: emp.id,
          leaveType: 'ANNUAL',
          startDate: new Date(2026, 3, 10 + i),
          endDate: new Date(2026, 3, 11 + i),
          reason: 'Keperluan Keluarga',
          status: i % 4 === 0 ? 'APPROVED' : 'PENDING'
        }
      });
    }

    // 2. Overtime Requests
    await prisma.overtimeRequest.create({
      data: {
        tenantId,
        employeeId: emp.id,
        date: new Date(2026, 3, 5 + i),
        hours: (2 + (i % 3)),
        reason: 'Kejar deadline laporan bulanan',
        status: 'APPROVED'
      }
    });

    // 3. Loans (for selected employees)
    if (i < 5) {
      const loanAmount = 5000000 + (i * 1000000);
      const installmentAmount = Math.round(loanAmount / 5);
      
      await prisma.employeeLoan.create({
        data: {
          tenantId,
          employeeId: emp.id,
          amount: loanAmount,
          reason: 'Renovasi Rumah / Biaya Sekolah',
          status: 'APPROVED',
          installments: {
            create: [
              { tenantId, amount: installmentAmount, dueDate: new Date(2026, 3, 25), status: 'UNPAID' },
              { tenantId, amount: installmentAmount, dueDate: new Date(2026, 4, 25), status: 'UNPAID' },
              { tenantId, amount: installmentAmount, dueDate: new Date(2026, 5, 25), status: 'UNPAID' },
              { tenantId, amount: installmentAmount, dueDate: new Date(2026, 6, 25), status: 'UNPAID' },
              { tenantId, amount: installmentAmount, dueDate: new Date(2026, 7, 25), status: 'UNPAID' },
            ]
          }
        }
      });
    }

    // 4. Timesheet Entries
    const projects = ['Project Alpha', 'Internal Audit', 'System Migration', 'Client Support'];
    for (let day = 1; day <= 3; day++) {
       await prisma.timesheetEntry.create({
         data: {
           tenantId,
           employeeId: emp.id,
           date: new Date(2026, 3, 20 + day),
           hours: 8,
           project: projects[i % projects.length],
           description: `Working on module ${day} details.`
         }
       });
    }

    // 5. Movements & Disciplinary (for some)
    if (i === 1) {
      await prisma.employeeMovement.create({
        data: {
          tenantId,
          employeeId: emp.id,
          type: 'PROMOTION',
          fromDept: emp.department || 'Operational',
          toDept: emp.department || 'Operational',
          fromPos: emp.position || 'Staff',
          toPos: 'Senior Lead',
          effectiveDate: new Date(2026, 0, 1),
          reason: 'High performance in Q4'
        }
      });
    }

    if (i === 3) {
      await prisma.disciplinaryAction.create({
        data: {
          tenantId,
          employeeId: emp.id,
          type: 'SP1',
          issueDate: new Date(2026, 2, 15),
          expiryDate: new Date(2026, 8, 15),
          reason: 'Keterlambatan berulang tanpa keterangan',
          status: 'ACTIVE'
        }
      });
    }

    // 6. Documents
    await prisma.employeeDocument.create({
      data: {
        tenantId,
        employeeId: emp.id,
        name: `KTP_${emp.firstName}.pdf`,
        type: 'ID_CARD',
        fileUrl: 'https://placehold.co/400?text=Document+Preview'
      }
    });

  }

  // 7. Termination (1 record for history)
  const inactiveEmp = await prisma.employee.findFirst({ where: { tenantId, status: 'INACTIVE' } });
  if (inactiveEmp) {
     await prisma.employeeTermination.create({
       data: {
         tenantId,
         employeeId: inactiveEmp.id,
         terminationDate: new Date(2026, 1, 28),
         type: 'RESIGNATION',
         reason: 'Mendapat tawaran di luar negeri',
         severanceAmount: 15000000,
         servicePayAmount: 5000000,
         compensationPayAmount: 3000000,
         totalAmount: 23000000,
         status: 'PAID'
       }
     });
  }

  console.log(`✅ HRIS Productivity data seeded for ${employees.length} employees.`);
}
