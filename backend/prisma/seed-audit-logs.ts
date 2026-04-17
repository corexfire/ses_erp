import { PrismaClient } from './generated/client';

export async function seedAuditLogs(prisma: PrismaClient, tenantId: string) {
  console.log('📜 Seeding Audit Trail (Audit Logs)...');

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@ses-erp.local';
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  
  if (!admin) {
    console.error('Admin user not found, skipping audit log seed.');
    return;
  }

  const logs = [
    {
      action: 'LOGIN_SUCCESS',
      entity: 'USER',
      entityId: admin.id,
      metadata: { ip: '127.0.0.1', browser: 'Chrome', os: 'macOS' },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2h ago
    },
    {
      action: 'CREATE',
      entity: 'Branch',
      entityId: 'BR-001',
      metadata: { name: 'Jakarta Head Office', code: 'JKT-HO', city: 'Jakarta' },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      action: 'UPDATE',
      entity: 'WorkflowDefinition',
      entityId: 'WD-005',
      metadata: { 
        old: { name: 'Simple PO Approval', isActive: false },
        new: { name: 'Standard PO Approval Chain', isActive: true },
        changes: ['name', 'isActive']
      },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      action: 'APPROVE',
      entity: 'WorkflowInstance',
      entityId: 'WI-778',
      metadata: { docId: 'PR-2024-001', comment: 'Approved for Q3 budget' },
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12h ago
    },
    {
      action: 'DELETE',
      entity: 'NotificationTemplate',
      entityId: 'TEMP-99',
      metadata: { key: 'old_welcome_email', reason: 'Redundant with V2' },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
      action: 'UPDATE',
      entity: 'UserRole',
      entityId: 'UR-12',
      metadata: { 
        targetUser: 'finance@ses-erp.local',
        addedRole: 'Finance Manager',
        removedRole: 'Finance Staff'
      },
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6h ago
    }
  ];

  for (const log of logs) {
    await prisma.auditLog.create({
      data: {
        tenantId,
        actorUserId: admin.id,
        action: log.action,
        entity: log.entity,
        entityId: log.entityId,
        metadata: log.metadata,
        createdAt: log.createdAt
      }
    });
  }

  console.log(`✅ ${logs.length} audit logs seeded successfully.`);
}
