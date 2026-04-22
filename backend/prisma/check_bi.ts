import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
async function main() {
  const tenants = await prisma.tenant.findMany({ select: { id: true, name: true } });
  console.log('All tenants:', JSON.stringify(tenants));
  
  const users = await prisma.user.findMany({ select: { id: true, email: true, tenantId: true }, take: 3 });
  console.log('Admin users:', JSON.stringify(users));

  // check docs per tenant
  for (const t of tenants) {
    const docs = await prisma.supportDocument.count({ where: { tenantId: t.id } });
    const comply = await prisma.supportCompliance.count({ where: { tenantId: t.id } });
    const fa = await prisma.fixedAsset.count({ where: { tenantId: t.id } });
    const kpi = await prisma.supportKpi.count({ where: { tenantId: t.id } });
    console.log(`Tenant [${t.name}] docs=${docs} compliance=${comply} fixedAssets=${fa} kpis=${kpi}`);
  }
}
main().finally(() => prisma.$disconnect());
