import { PrismaClient } from './generated';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return;
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });
  
  try {
    const permissionCount = await prisma.permission.count();
    console.log('--- PERMISSION COUNT ---');
    console.log(permissionCount);

    const permissions = await prisma.permission.findMany({ take: 20 });
    console.log('--- PERMISSIONS (First 20) ---');
    console.log(JSON.stringify(permissions, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main();
