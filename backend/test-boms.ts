import { PrismaClient } from './prisma/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public' });
const prisma = new PrismaClient({ adapter });

async function run() {
  const user = await prisma.user.findUnique({ where: { email: 'zubair.mi45@gmail.com' } });
  console.log("Tenant ID (zubair):", user?.tenantId);
  
  const boms = await prisma.billOfMaterials.findMany({ select: { id: true, tenantId: true, code: true, name: true } });
  console.log("All BOMs:", JSON.stringify(boms, null, 2));
}
run();
