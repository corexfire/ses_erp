
const { PrismaClient } = require('../prisma/generated/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = "postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const tenants = await prisma.tenant.findMany();
  console.log('Tenants:', tenants.map(t => ({ id: t.id, name: t.name })));

  for (const tenant of tenants) {
    console.log(`\nTenant: ${tenant.name} (${tenant.id})`);
    const leadCount = await prisma.lead.count({ where: { tenantId: tenant.id } });
    const oppCount = await prisma.opportunity.count({ where: { tenantId: tenant.id } });
    const customerCount = await prisma.customer.count({ where: { tenantId: tenant.id } });
    const activityCount = await prisma.salesActivity.count({ where: { tenantId: tenant.id } });
    const ticketCount = await prisma.serviceTicket.count({ where: { tenantId: tenant.id } });

    console.log(`  Leads: ${leadCount}`);
    console.log(`  Opportunities: ${oppCount}`);
    console.log(`  Customers: ${customerCount}`);
    console.log(`  Activities: ${activityCount}`);
    console.log(`  Tickets: ${ticketCount}`);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
