import { PrismaClient } from './generated';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return;
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });
  
  try {
    const waves = await prisma.wavePicking.findMany({ take: 10 });
    const trips = await prisma.tripPlan.findMany({ take: 10 });
    console.log('--- WAVES ---');
    console.log(JSON.stringify(waves, null, 2));
    console.log('--- TRIPS ---');
    console.log(JSON.stringify(trips, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main();
