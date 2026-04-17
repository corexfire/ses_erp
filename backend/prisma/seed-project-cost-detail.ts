import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const tenant = await prisma.tenant.findFirst();
  if (!tenant) throw new Error('No tenant found. Please run main seed first.');
  const tenantId = tenant.id;

  console.log('--- Seeding Project Cost Control Data ---');

  // 1. Find or create a client
  const customer = await prisma.customer.upsert({
    where: { tenantId_code: { tenantId, code: 'CUST-CITY-001' } },
    update: {},
    create: {
      tenantId,
      code: 'CUST-CITY-001',
      name: 'City Development Corp',
      email: 'client.city@example.com',
      phone: '021-999-888',
      address1: 'Sudirman Central Business District, Jakarta',
    },
  });

  // 2. Create Project
  const project = await prisma.project.create({
    data: {
      tenantId,
      code: 'PRJ-CC-2025',
      name: 'Modern Office Tower - Phase 2',
      customerId: customer.id,
      totalBudget: 5000000000, // 5B
      status: 'ACTIVE',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      billingType: 'PROGRESS',
    },
  });

  // 3. Create WBS Hierarchy
  const tasks = [
    { code: '1.0', name: 'Civil & Structural', budget: 3000000000, weight: 60 },
    { code: '1.1', name: 'Foundation', budget: 1000000000, weight: 20, parent: '1.0' },
    { code: '1.2', name: 'Superstructure', budget: 2000000000, weight: 40, parent: '1.0' },
    { code: '2.0', name: 'Architectural & Interior', budget: 1500000000, weight: 30 },
    { code: '2.1', name: 'Flooring & Walls', budget: 800000000, weight: 15, parent: '2.0' },
    { code: '2.2', name: 'Ceiling & Lighting', budget: 700000000, weight: 15, parent: '2.0' },
    { code: '3.0', name: 'M&E (Mechanical/Electrical)', budget: 500000000, weight: 10 },
  ];

  const dbTasks: any = {};
  for (const t of tasks) {
    const task = await prisma.wbsTask.create({
      data: {
        tenantId,
        projectId: project.id,
        taskCode: t.code,
        taskName: t.name,
        plannedCost: t.budget,
        plannedWeight: t.weight,
        parentTaskId: t.parent ? dbTasks[t.parent].id : null,
        actualCost: 0,
        status: 'IN_PROGRESS',
      },
    });
    dbTasks[t.code] = task;

    // Create ProjectBudget Entry
    await prisma.projectBudget.create({
      data: {
        tenantId,
        projectId: project.id,
        wbsTaskId: task.id,
        allocatedBudget: t.budget,
      },
    });
  }

  // 4. Create Commitments (Contracts/POs)
  const commitments = [
    { task: '1.1', type: 'SUBCONTRACTOR', amount: 950000000, desc: 'Piling Works Contract' },
    { task: '1.2', type: 'MATERIAL', amount: 1200000000, desc: 'Concrete Supply PO Volume 1' },
    { task: '2.1', type: 'MATERIAL', amount: 750000000, desc: 'Italian Marble Tiles Order' },
  ];

  for (const c of commitments) {
    await prisma.projectCommitment.create({
      data: {
        tenantId,
        projectId: project.id,
        wbsTaskId: dbTasks[c.task].id,
        commitmentType: c.type,
        amount: c.amount,
        description: c.desc,
        status: 'ACTIVE',
      },
    });
  }

  // 5. Create Actual Costs (Simulated via WbsTask.actualCost updates)
  // In a real system, these would come from GL/Expenses
  await prisma.wbsTask.update({
    where: { id: dbTasks['1.1'].id },
    data: { actualCost: 900000000, actualProgress: 100 },
  });

  await prisma.wbsTask.update({
    where: { id: dbTasks['1.2'].id },
    data: { actualCost: 300000000, actualProgress: 25 },
  });

  // At Risk Scenario: 2.1 is close to budget
  await prisma.wbsTask.update({
    where: { id: dbTasks['2.1'].id },
    data: { actualCost: 725000000, actualProgress: 80 },
  });

  console.log('--- Project Cost Control Data Seeded Successfully ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
