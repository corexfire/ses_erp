const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function check() {
  const count = await prisma.budget.count();
  console.log('Total Budgets:', count);
  
  const budgets26 = await prisma.budget.findMany({
    where: { fiscalYear: 2026 },
    take: 5
  });
  console.log('FY 2026 Sample:', budgets26.map(b => b.budgetNo));
  
  const distinctYears = await prisma.budget.findMany({
    select: { fiscalYear: true },
    distinct: ['fiscalYear']
  });
  console.log('Distinct Years in DB:', distinctYears.map(y => y.fiscalYear));
}

check().catch(console.error).finally(() => prisma.$disconnect());
