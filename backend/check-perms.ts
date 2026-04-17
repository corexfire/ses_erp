import { PrismaClient } from './prisma/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public' });
const prisma = new PrismaClient({ adapter });

async function run() {
  const user = await prisma.user.findUnique({
    where: { email: 'zubair.mi45@gmail.com' },
    include: { roles: { include: { role: true } } }
  });
  
  console.log('User:', user?.id, 'isSuperAdmin:', user?.isSuperAdmin);
  
  const roleIds = user?.roles?.map(r => r.roleId) || [];
  console.log('Role IDs:', roleIds);
  
  const roles = await prisma.role.findMany({ where: { id: { in: roleIds } } });
  console.log('Roles:', JSON.stringify(roles, null, 2));
  
  // Check Permission model name
  const models = Object.keys(prisma).filter(k => !k.startsWith('$') && !k.startsWith('_'));
  console.log('Models containing permission:', models.filter(m => m.toLowerCase().includes('perm')));
  
  process.exit(0);
}
run();
