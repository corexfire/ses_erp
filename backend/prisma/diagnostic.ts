import { PrismaClient } from './generated';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return;
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });
  
  try {
    const tenants = await prisma.tenant.findMany();
    console.log('--- TENANTS ---');
    console.log(JSON.stringify(tenants, null, 2));

    const users = await prisma.user.findMany({ take: 5 });
    console.log('--- USERS ---');
    console.log(JSON.stringify(users, null, 2));

    const vehicles = await prisma.fleetVehicle.findMany({ take: 10 });
    console.log('--- VEHICLES ---');
    console.log(JSON.stringify(vehicles, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main();
