import { PrismaClient } from './prisma/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
const adapter = new PrismaPg({ connectionString: 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public' });
const prisma = new PrismaClient({ adapter });
async function run() {
  const adminRoleId = 'cmnrxcg4v0001q50syyrif3ri';
  const extraKeys = ['manufacturing.planning.run', 'manufacturing.planning.create', 'manufacturing.planning.update'];
  for (const key of extraKeys) {
    let perm = await prisma.permission.findFirst({ where: { key } });
    if (!perm) { perm = await prisma.permission.create({ data: { key } }); }
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRoleId, permissionId: perm.id } },
      update: {}, create: { roleId: adminRoleId, permissionId: perm.id }
    });
    console.log('✅', key);
  }
  process.exit(0);
}
run();
