"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generated_1 = require("./generated");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public';
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new generated_1.PrismaClient({ adapter });
async function main() {
    console.log('🏭 Seed: Manufacturing Shop Floor (Logs & Timers)...');
    const user = await prisma.user.findUnique({ where: { email: 'zubair.mi45@gmail.com' } });
    if (!user)
        throw new Error('User not found');
    const tenantId = user.tenantId;
    const workOrders = await prisma.workOrder.findMany({
        where: { tenantId },
        include: { operations: true, finishedGood: true }
    });
    if (workOrders.length === 0) {
        console.log('⚠️ No Work Orders found. Run Work Order seeder first.');
        return;
    }
    const adminRoleId = 'cmnrxcg4v0001q50syyrif3ri';
    const sfPerms = [
        'manufacturing.shop_floor.read',
        'manufacturing.shop_floor.update',
        'manufacturing.shop_floor.delete'
    ];
    for (const key of sfPerms) {
        let perm = await prisma.permission.findFirst({ where: { key } });
        if (!perm)
            perm = await prisma.permission.create({ data: { key } });
        await prisma.rolePermission.upsert({
            where: { roleId_permissionId: { roleId: adminRoleId, permissionId: perm.id } },
            update: {}, create: { roleId: adminRoleId, permissionId: perm.id }
        });
    }
    const woCompleted = workOrders.find(wo => wo.code === 'WO-KSGA-2601');
    if (woCompleted && woCompleted.operations.length > 0) {
        const op1 = woCompleted.operations[0];
        const opLast = woCompleted.operations[woCompleted.operations.length - 1];
        await prisma.shopFloorLog.createMany({
            data: [
                {
                    tenantId,
                    workOrderId: woCompleted.id,
                    operationId: op1.id,
                    operatorName: 'Ahmad Operator',
                    action: 'CLOCK_IN',
                    prevStatus: 'PENDING',
                    newStatus: 'IN_PROGRESS',
                    loggedAt: new Date(Date.now() - 3600000 * 24 * 7),
                },
                {
                    tenantId,
                    workOrderId: woCompleted.id,
                    operationId: op1.id,
                    operatorName: 'Ahmad Operator',
                    action: 'CLOCK_OUT',
                    qtyReported: 1000,
                    laborHours: 2.5,
                    newStatus: 'COMPLETED',
                    loggedAt: new Date(Date.now() - 3600000 * 24 * 7 + 9000000),
                },
                {
                    tenantId,
                    workOrderId: woCompleted.id,
                    operationId: opLast.id,
                    operatorName: 'Budi Supervisor',
                    action: 'REPORT_GOOD',
                    qtyReported: 1000,
                    notes: 'Final step completed with high precision',
                    loggedAt: new Date(Date.now() - 3600000 * 24 * 6),
                }
            ]
        });
    }
    const woInProgress = workOrders.find(wo => wo.code === 'WO-KSGA-2603');
    if (woInProgress && woInProgress.operations.length > 1) {
        const activeOp = woInProgress.operations[1];
        await prisma.workOrderOperation.update({
            where: { id: activeOp.id },
            data: { status: 'IN_PROGRESS', operatorName: 'zubair.mi45@gmail.com', claimedAt: new Date(Date.now() - 1800000) }
        });
        await prisma.shopFloorTimer.create({
            data: {
                tenantId,
                workOrderId: woInProgress.id,
                operationId: activeOp.id,
                operatorName: 'zubair.mi45@gmail.com',
                status: 'RUNNING',
                startTime: new Date(Date.now() - 1800000),
            }
        });
        await prisma.shopFloorLog.create({
            data: {
                tenantId,
                workOrderId: woInProgress.id,
                operationId: activeOp.id,
                operatorName: 'zubair.mi45@gmail.com',
                action: 'CLOCK_IN',
                prevStatus: 'PENDING',
                newStatus: 'IN_PROGRESS',
                loggedAt: new Date(Date.now() - 1800000),
            }
        });
    }
    console.log('✅ Shop Floor Seeding Completed');
}
main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed-manufacturing-shop-floor.js.map