"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedWorkflowInstances = seedWorkflowInstances;
const client_1 = require("./generated/client");
async function seedWorkflowInstances(prisma, tenantId) {
    console.log('📬 Seeding Approval Inbox (Workflow Instances)...');
    const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@ses-erp.local';
    const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!admin) {
        console.error('Admin user not found, skipping workflow instance seed.');
        return;
    }
    const definitions = await prisma.workflowDefinition.findMany({
        where: { tenantId, isActive: true },
        include: { steps: { orderBy: { stepNo: 'asc' } } }
    });
    const findDef = (key) => definitions.find(d => d.moduleKey === key || d.name.includes(key));
    const prDef = findDef('PURCHASE_REQUISITION');
    if (prDef && prDef.steps.length > 0) {
        const firstStep = prDef.steps[0];
        await prisma.workflowInstance.create({
            data: {
                tenantId,
                definitionId: prDef.id,
                stepId: firstStep.id,
                docType: 'PURCHASE_REQUISITION',
                docId: 'PR-2024-0001',
                currentStepNo: 1,
                status: client_1.WorkflowInstanceStatus.PENDING,
                assignedToUserId: admin.id,
                slaDueAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }
        });
        console.log('✅ Seeded: Pending PR Approval for Admin');
    }
    const soDef = findDef('SALES');
    if (soDef && soDef.steps.length > 0) {
        const firstStep = soDef.steps[0];
        await prisma.workflowInstance.create({
            data: {
                tenantId,
                definitionId: soDef.id,
                stepId: firstStep.id,
                docType: 'SALES_ORDER',
                docId: 'SO-2024-9999',
                currentStepNo: 1,
                status: client_1.WorkflowInstanceStatus.PENDING,
                assignedToUserId: admin.id,
                slaDueAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
            }
        });
        console.log('✅ Seeded: Overdue SO Approval for Admin');
    }
    const invDef = findDef('INVENTORY');
    if (invDef && invDef.steps.length > 0) {
        const firstStep = invDef.steps[0];
        await prisma.workflowInstance.create({
            data: {
                tenantId,
                definitionId: invDef.id,
                stepId: firstStep.id,
                docType: 'STOCK_COUNT',
                docId: 'SC-2024-101',
                currentStepNo: 1,
                status: client_1.WorkflowInstanceStatus.PENDING,
                assignedToUserId: admin.id,
                slaDueAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
            }
        });
        console.log('✅ Seeded: Stock Opname Approval for Admin');
    }
    const hrUser = await prisma.user.findUnique({ where: { email: 'hr@ses-erp.local' } });
    if (hrUser) {
        await prisma.delegation.create({
            data: {
                tenantId,
                fromUserId: hrUser.id,
                toUserId: admin.id,
                startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                isActive: true,
                notes: 'Delegated during vacation'
            }
        });
        const hrDef = findDef('Employee Leave');
        if (hrDef && hrDef.steps.length > 0) {
            const firstStep = hrDef.steps[0];
            await prisma.workflowInstance.create({
                data: {
                    tenantId,
                    definitionId: hrDef.id,
                    stepId: firstStep.id,
                    docType: 'LEAVE_REQUEST',
                    docId: 'LV-BUDI-001',
                    currentStepNo: 1,
                    status: client_1.WorkflowInstanceStatus.PENDING,
                    assignedToUserId: hrUser.id,
                    slaDueAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
                }
            });
            console.log('✅ Seeded: Delegated Leave Request for Admin');
        }
    }
    console.log('✅ Approval Inbox seeded successfully.');
}
//# sourceMappingURL=seed-workflow-instances.js.map