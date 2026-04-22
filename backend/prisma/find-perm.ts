import { PrismaClient } from './generated';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return;
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });
  
  try {
    const perm = await prisma.permission.findFirst({
      where: { key: 'logistics.warehouse.execute' }
    });
    console.log('--- PERMISSION CHECK ---');
    console.log(perm ? JSON.stringify(perm, null, 2) : 'NOT FOUND');
  } finally {
    await prisma.$disconnect();
  }
}

main();
