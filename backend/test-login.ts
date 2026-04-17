import { PrismaClient } from './prisma/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import jwt from 'jsonwebtoken';

const adapter = new PrismaPg({ connectionString: 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public' });
const prisma = new PrismaClient({ adapter });

async function run() {
  const user = await prisma.user.findUnique({ where: { email: 'zubair.mi45@gmail.com' } });
  const token = jwt.sign(
    { sub: user.id, email: user.email, tenantId: user.tenantId },
    process.env.JWT_SECRET || 'CHANGE_ME_DEV_ONLY',
    { expiresIn: '1h' }
  );
  console.log("Token:", token);
  process.exit(0);
}
run();
