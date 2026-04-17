import { PrismaClient } from './prisma/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
const adapter = new PrismaPg({ connectionString: 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public' });
const prisma = new PrismaClient({ adapter });
async function run() {
  const r = await prisma.mrpRun.findFirst();
  console.log('MrpRun fields:', Object.keys(r || {}));
  const s = await prisma.mrpSuggestion.findFirst();
  console.log('MrpSuggestion fields:', Object.keys(s || {}));
  process.exit(0);
}
run();
