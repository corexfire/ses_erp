import { PrismaClient } from './prisma/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public' });
const prisma = new PrismaClient({ adapter });

async function run() {
  const tenantId = 'cmnrxcg4n0000q50sqdh8vx4j';
  const adminRoleId = 'cmnrxcg4v0001q50syyrif3ri'; // 'admin' role
  
  // Check permission model structure
  const sample = await prisma.permission.findFirst();
  console.log('Permission sample:', JSON.stringify(sample));
  process.exit(0);
}
run();
