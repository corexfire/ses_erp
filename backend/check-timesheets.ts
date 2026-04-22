import { PrismaClient } from './prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function checkData() {
  const count = await prisma.timesheetEntry.count();
  console.log(`Total TimesheetEntries: ${count}`);

  if (count > 0) {
    const samples = await prisma.timesheetEntry.findMany({
      take: 5,
      include: { employee: true },
      orderBy: { date: 'desc' }
    });
    console.log('Sample Data:');
    console.log(JSON.stringify(samples, null, 2));
  }
}

checkData().catch(console.error).finally(() => prisma.$disconnect());
