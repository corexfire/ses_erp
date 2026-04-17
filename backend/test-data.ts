import { PrismaClient } from './prisma/generated/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
const connectionString = process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
async function run() { console.log(await prisma.billOfMaterials.findMany()); }
run();
