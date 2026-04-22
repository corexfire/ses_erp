import { PrismaClient } from './generated/client';

export async function seedProjectExpansion(prisma: PrismaClient, tenantId: string) {
  console.log('🏗️  Seeding Project Management Expansion Data...');

  const project = await prisma.project.findFirst({ where: { tenantId } });
  if (!project) {
    console.log('⚠️ No project found to seed expansion data.');
    return;
  }

  // 1. Seed Issues & Risks
  const issuesData = [
    { title: 'Material Supply Delay', type: 'RISK', severity: 'HIGH', desc: 'Global shipping issues affecting steel supply.' },
    { title: 'Permit Approval Pending', type: 'ISSUE', severity: 'CRITICAL', desc: 'Local authority still reviewing foundation permit.' },
    { title: 'Budget Overrun on Excavation', type: 'ISSUE', severity: 'MEDIUM', desc: 'Unexpected rock layers found during site prep.' }
  ];

  for (const iData of issuesData) {
    await prisma.projectIssue.create({
      data: {
        tenantId,
        projectId: project.id,
        title: iData.title,
        description: iData.desc,
        type: iData.type,
        severity: iData.severity,
        status: 'OPEN'
      }
    });
  }

  // 2. Seed Change Orders
  await prisma.projectChangeOrder.create({
    data: {
      tenantId,
      projectId: project.id,
      orderNo: 'CO-2026-001',
      title: 'Additional Foundation Reinforcement',
      description: 'Requested by structural engineer due to soil conditions.',
      amountChange: 150000000, // 150M
      scheduleImpact: 14, // 2 weeks
      status: 'APPROVED'
    }
  });

  // 3. Seed Task Dependencies
  const tasks = await prisma.wbsTask.findMany({ 
      where: { tenantId, projectId: project.id },
      take: 5
  });

  if (tasks.length >= 2) {
      await prisma.taskDependency.create({
          data: {
              tenantId,
              predecessorId: tasks[0].id,
              successorId: tasks[1].id,
              dependencyType: 'FS',
              lag: 0
          }
      });
  }

  console.log('✅ Project Expansion Data seeded successfully.');
}
