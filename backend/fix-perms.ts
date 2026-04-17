import { PrismaClient } from './prisma/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public' });
const prisma = new PrismaClient({ adapter });

async function run() {
  const tenantId = 'cmnrxcg4n0000q50sqdh8vx4j';
  
  // Check existing manufacturing permissions
  const existingMfgPerms = await prisma.permission.findMany({
    where: { tenantId, action: { startsWith: 'manufacturing' } }
  });
  console.log('Existing manufacturing permissions:', existingMfgPerms.length);
  
  // Check which role has manufacturing permissions
  const adminRoleId = 'cmnrxcg4v0001q50syyrif3ri'; // 'admin' role
  
  // Create manufacturing permissions if missing
  const mfgActions = [
    'manufacturing.bom.read', 'manufacturing.bom.create', 'manufacturing.bom.update', 'manufacturing.bom.delete',
    'manufacturing.bom.manage',
    'manufacturing.workorder.read', 'manufacturing.workorder.create', 'manufacturing.workorder.update',
    'manufacturing.planning.read', 'manufacturing.planning.create', 'manufacturing.planning.update',
    'manufacturing.quality.read', 'manufacturing.quality.create', 'manufacturing.quality.update',
    'manufacturing.execution.read', 'manufacturing.execution.create', 'manufacturing.execution.update',
    'manufacturing.costing.read', 'manufacturing.costing.create', 'manufacturing.costing.update',
  ];
  
  let createdCount = 0;
  for (const action of mfgActions) {
    const existing = await prisma.permission.findFirst({ where: { tenantId, action } });
    if (!existing) {
      const perm = await prisma.permission.create({
        data: { tenantId, action, description: `Permission: ${action}` }
      });
      
      // Assign to admin role
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: adminRoleId, permissionId: perm.id } },
        update: {},
        create: { roleId: adminRoleId, permissionId: perm.id }
      });
      createdCount++;
      console.log('Created:', action);
    } else {
      // Make sure admin role has it
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: adminRoleId, permissionId: existing.id } },
        update: {},
        create: { roleId: adminRoleId, permissionId: existing.id }
      });
    }
  }
  
  console.log(`\nCreated ${createdCount} new permissions, assigned all to 'admin' role`);
  process.exit(0);
}
run();
