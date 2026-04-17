import { PrismaClient } from './prisma/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public' });
const prisma = new PrismaClient({ adapter });

async function run() {
  const user = await prisma.user.findUnique({
    where: { email: 'zubair.mi45@gmail.com' },
    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: true
            }
          }
        }
      }
    }
  });
  
  console.log('User ID:', user?.id, 'Tenant:', user?.tenantId);
  
  const roles = user?.roles || [];
  const permissions = roles.flatMap(r => r.role?.permissions || []);
  const mfgPerms = permissions.filter(p => p.action.includes('manufacturing'));
  console.log('Manufacturing permissions:', mfgPerms.map(p => p.action));
  
  if (mfgPerms.length === 0) {
    console.log('NO manufacturing permissions found — that is the problem!');
    
    // Check roles
    const roleNames = roles.map(r => r.role?.name);
    console.log('User roles:', roleNames);
    
    // Find all roles 
    const allRoles = await prisma.role.findMany({ where: { tenantId: user!.tenantId }, include: { permissions: true } });
    console.log('All roles in tenant:', allRoles.map(r => ({ name: r.name, permCount: r.permissions.length })));
  }
  
  process.exit(0);
}
run();
