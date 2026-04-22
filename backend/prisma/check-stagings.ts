import { PrismaClient } from './generated';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return;
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });
  
  try {
    const stagings = await prisma.stagingLoad.findMany({
      include: { warehouse: true, tripPlan: true },
      take: 20
    });
    console.log('--- STAGINGS ---');
    console.log(JSON.stringify(stagings, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main();
