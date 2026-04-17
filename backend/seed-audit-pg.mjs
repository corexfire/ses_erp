import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/erp_db',
});

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT id, "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) {
    console.log('No users found.');
    return;
  }
  
  const user = userRes.rows[0];
  const tenantId = user.tenantId;

  console.log(`Seeding Audit Logs for tenant: ${tenantId}`);

  const entities = ['User', 'Role', 'WorkflowDefinition', 'SalesOrder', 'PurchaseOrder', 'Item', 'CostCenter'];
  const actions = ['create', 'update', 'delete', 'login', 'approve', 'reject'];

  const logs = [];
  const now = new Date();

  for (let i = 0; i < 150; i++) {
    const action = actions[Math.floor(Math.random() * actions.length)];
    const entity = entities[Math.floor(Math.random() * entities.length)];
    const dateOffset = Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000);
    const createdAt = new Date(now.getTime() - dateOffset);

    let metadata = {};
    if (action === 'update') {
      metadata = {
        oldValue: { status: 'PENDING', amount: Math.floor(Math.random() * 5000000) },
        newValue: { status: 'APPROVED', amount: Math.floor(Math.random() * 5000000) },
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`
      };
    } else if (action === 'login') {
      metadata = { ipAddress: `10.0.0.${Math.floor(Math.random() * 255)}`, userAgent: 'Mozilla/5.0' };
    } else {
      metadata = { id: crypto.randomUUID().substring(0, 8), source: 'Web Dashboard' };
    }

    logs.push({
      id: crypto.randomUUID(),
      tenantId,
      actorUserId: ['login', 'create'].includes(action) ? null : user.id,
      action,
      entity: action === 'login' ? 'Auth' : entity,
      entityId: `ENT-${crypto.randomUUID().substring(0, 5).toUpperCase()}`,
      metadata: JSON.stringify(metadata),
      createdAt,
    });
  }

  logs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  for (const log of logs) {
    await client.query(
      `INSERT INTO "AuditLog" ("id", "tenantId", "actorUserId", "action", "entity", "entityId", "metadata", "createdAt") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [log.id, log.tenantId, log.actorUserId, log.action, log.entity, log.entityId, log.metadata, log.createdAt]
    );
  }

  console.log(`✅ Seeded 150 Audit Logs!`);
  await client.end();
}

main().catch(console.error);

