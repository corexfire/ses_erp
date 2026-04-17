import { PrismaClient } from './prisma/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public' });
const prisma = new PrismaClient({ adapter });

async function run() {
  // 1. Set zubair as superAdmin
  const user = await prisma.user.update({
    where: { email: 'zubair.mi45@gmail.com' },
    data: { isSuperAdmin: true }
  });
  console.log('✅ User set as superAdmin:', user.email, 'isSuperAdmin:', user.isSuperAdmin);
  
  // 2. Also add all manufacturing permissions to admin role
  const adminRoleId = 'cmnrxcg4v0001q50syyrif3ri';
  
  const mfgKeys = [
    'manufacturing.bom.read', 'manufacturing.bom.create', 'manufacturing.bom.update', 'manufacturing.bom.delete',
    'manufacturing.workorder.read', 'manufacturing.workorder.create', 'manufacturing.workorder.update',
    'manufacturing.planning.read', 'manufacturing.planning.create',
    'manufacturing.quality.read', 'manufacturing.quality.create',
    'manufacturing.execution.read', 'manufacturing.execution.create',
    'manufacturing.costing.read', 'manufacturing.costing.create',
    'manufacturing.shopfloor.read', 'manufacturing.shopfloor.create',
    'manufacturing.maintenance.read', 'manufacturing.maintenance.create',
  ];
  
  for (const key of mfgKeys) {
    let perm = await prisma.permission.findFirst({ where: { key } });
    if (!perm) {
      perm = await prisma.permission.create({ data: { key } });
    }
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRoleId, permissionId: perm.id } },
      update: {},
      create: { roleId: adminRoleId, permissionId: perm.id }
    });
  }
  console.log('✅ All manufacturing permissions assigned to admin role');
  
  // 3. Verify the BOM data
  const boms = await prisma.billOfMaterials.findMany({ select: { code: true, name: true, tenantId: true } });
  console.log('BOM data in DB:', JSON.stringify(boms, null, 2));
  
  process.exit(0);
}
run();
