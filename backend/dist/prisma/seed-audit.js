"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/client");
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
async function main() {
    const users = await prisma.user.findMany({ select: { id: true, tenantId: true } });
    if (users.length === 0) {
        console.log('No users found. Run other seeds first.');
        return;
    }
    const zubair = users.find(u => u.id) || users[0];
    const tenantId = zubair.tenantId;
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
        }
        else if (action === 'login') {
            metadata = { ipAddress: `10.0.0.${Math.floor(Math.random() * 255)}`, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
        }
        else {
            metadata = { id: (0, crypto_1.randomUUID)().substring(0, 8), source: 'Web Dashboard' };
        }
        logs.push({
            tenantId,
            actorUserId: ['login', 'create'].includes(action) ? null : zubair.id,
            action,
            entity: action === 'login' ? 'Auth' : entity,
            entityId: `ENT-${(0, crypto_1.randomUUID)().substring(0, 5).toUpperCase()}`,
            metadata,
            createdAt,
        });
    }
    logs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    await prisma.auditLog.createMany({
        data: logs,
    });
    console.log(`✅ Seeded 150 Audit Logs!`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-audit.js.map