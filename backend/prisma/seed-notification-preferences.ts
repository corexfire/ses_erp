import { PrismaClient } from './generated/client';

export async function seedNotificationPreferences(prisma: PrismaClient, tenantId: string) {
  console.log('🔔 Seeding Notification Preferences...');

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@ses-erp.local';
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  
  if (!admin) {
    console.error('Admin user not found, skipping notification preference seed.');
    return;
  }

  const events = [
    // Workflow
    { key: 'workflow.new_request', email: true, inApp: true, sms: false, whatsapp: true },
    { key: 'workflow.approved', email: true, inApp: true, sms: false, whatsapp: false },
    { key: 'workflow.rejected', email: true, inApp: true, sms: true, whatsapp: true },
    { key: 'workflow.overdue', email: true, inApp: true, sms: true, whatsapp: true },
    
    // Security
    { key: 'security.new_login', email: true, inApp: true, sms: false, whatsapp: false },
    { key: 'security.password_changed', email: true, inApp: true, sms: false, whatsapp: false },
    { key: 'security.role_assigned', email: true, inApp: true, sms: false, whatsapp: false },
    
    // Operations
    { key: 'procurement.pr_created', email: true, inApp: true, sms: false, whatsapp: false },
    { key: 'inventory.low_stock', email: true, inApp: true, sms: true, whatsapp: true },
    { key: 'sales.order_confirmed', email: true, inApp: true, sms: false, whatsapp: false }
  ];

  for (const event of events) {
    await prisma.notificationPreference.upsert({
      where: {
        userId_eventKey: {
          userId: admin.id,
          eventKey: event.key
        }
      },
      update: {
        emailEnabled: event.email,
        inAppEnabled: event.inApp,
        smsEnabled: event.sms,
        whatsappEnabled: event.whatsapp
      },
      create: {
        tenantId,
        userId: admin.id,
        eventKey: event.key,
        emailEnabled: event.email,
        inAppEnabled: event.inApp,
        smsEnabled: event.sms,
        whatsappEnabled: event.whatsapp
      }
    });
  }

  console.log(`✅ Notification preferences seeded for ${admin.email}.`);
}
