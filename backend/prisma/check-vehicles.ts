import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  try {
    const count = await prisma.fleetVehicle.count();
    console.log(`Vehicles count: ${count}`);
    const vehicles = await prisma.fleetVehicle.findMany({ take: 5, select: { id: true, plateNo: true } });
    console.log(JSON.stringify(vehicles));
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
