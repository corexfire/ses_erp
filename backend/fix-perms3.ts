import { PrismaClient } from './prisma/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public' });
const prisma = new PrismaClient({ adapter });

async function run() {
  const adminRoleId = 'cmnrxcg4v0001q50syyrif3ri'; // 'admin' role
  
  // Check existing manufacturing permissions (key not action, no tenantId)
  const existingMfgPerms = await prisma.permission.findMany({
    where: { key: { startsWith: 'manufacturing' } }
  });
  console.log('Existing manufacturing permissions:', existingMfgPerms.map(p => p.key));
  
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
  
  let createdCount = 0;
  let assignedCount = 0;
  
  for (const key of mfgKeys) {
    let perm = await prisma.permission.findFirst({ where: { key } });
    if (!perm) {
      perm = await prisma.permission.create({ data: { key } });
      createdCount++;
    }
    
    // Assign to admin role
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRoleId, permissionId: perm.id } },
      update: {},
      create: { roleId: adminRoleId, permissionId: perm.id }
    });
    assignedCount++;
  }
  
  console.log(`Created: ${createdCount}, Assigned: ${assignedCount}`);
  
  // Also check how the backend reads permissions
  const rolePerms = await prisma.rolePermission.findMany({
    where: { roleId: adminRoleId },
    include: { permission: true }
  });
  console.log('Admin role permissions count:', rolePerms.length);
  
  process.exit(0);
}
run();
