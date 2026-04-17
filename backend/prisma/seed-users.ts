import { PrismaClient } from './generated/client';
import bcrypt from 'bcryptjs';

export async function seedUsers(prisma: PrismaClient, tenantId: string) {
  console.log('👥 Seeding Enterprise Workforce (Users)...');

  const users = [
    { email: 'finance@ses-erp.local', name: 'Ahmad Finance' },
    { email: 'hr@ses-erp.local', name: 'Budi HR' },
    { email: 'project@ses-erp.local', name: 'Citra Project' },
    { email: 'warehouse@ses-erp.local', name: 'Dedi Warehouse' },
    { email: 'sales@ses-erp.local', name: 'Eka Sales' },
    { email: 'it@ses-erp.local', name: 'Fadil IT Support' },
  ];

  const passwordHash = await bcrypt.hash('password123', 12);

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        isActive: true,
        tenantId // Ensure they belong to the correct tenant
      },
      create: {
        tenantId,
        email: u.email,
        name: u.name,
        passwordHash,
        isActive: true
      }
    });
  }

  console.log('✅ Enterprise Workforce seeded successfully.');
}
