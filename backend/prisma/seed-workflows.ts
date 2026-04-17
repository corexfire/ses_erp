import { PrismaClient } from './generated/client';

export async function seedWorkflows(prisma: PrismaClient, tenantId: string) {
  console.log('🔄 Seeding Enterprise Workflows...');

  const roles = await prisma.role.findMany({ where: { tenantId } });
  const getRoleId = (name: string) => roles.find((r) => r.name === name)?.id;

  const workflowData = [
    {
      name: 'Standard Purchase Requisition',
      moduleKey: 'PROCUREMENT',
      docType: 'PURCHASE_REQUISITION',
      steps: [
        { name: 'Dept Head Review', roleName: 'Project Manager', slaHours: 24 },
        { name: 'Finance Audit', roleName: 'Finance Manager', slaHours: 48 },
        { name: 'Final Approval', roleName: 'Super Administrator', slaHours: 24 },
      ],
    },
    {
      name: 'High Value Purchase Order',
      moduleKey: 'PROCUREMENT',
      docType: 'PURCHASE_ORDER',
      steps: [
        { name: 'Procurement Review', roleName: 'Procurement Manager', slaHours: 24 },
        { name: 'Budget Check', roleName: 'Finance Manager', slaHours: 24 },
        { name: 'Director Approval', roleName: 'Super Administrator', slaHours: 48 },
      ],
    },
    {
      name: 'Sales Quotation Approval',
      moduleKey: 'SALES',
      docType: 'SALES_QUOTATION',
      steps: [
        { name: 'Manager Review', roleName: 'Sales Manager', slaHours: 24 },
      ],
    },
    {
      name: 'Sales Order Credit Check',
      moduleKey: 'SALES',
      docType: 'SALES_ORDER',
      steps: [
        { name: 'Credit Limit Review', roleName: 'Finance Staff', slaHours: 12 },
        { name: 'Sales Head Release', roleName: 'Sales Manager', slaHours: 12 },
      ],
    },
    {
      name: 'Stock Opname Adjustment',
      moduleKey: 'INVENTORY',
      docType: 'STOCK_COUNT',
      steps: [
        { name: 'Warehouse Mgr Review', roleName: 'Warehouse Operator', slaHours: 24 },
        { name: 'Inventory Controller', roleName: 'Procurement Manager', slaHours: 24 },
        { name: 'Finance Verification', roleName: 'Finance Manager', slaHours: 48 },
      ],
    },
    {
      name: 'Employee Leave Request',
      moduleKey: 'HRM',
      docType: 'LEAVE_REQUEST',
      steps: [
        { name: 'Direct Supervisor', roleName: 'Project Manager', slaHours: 24 },
        { name: 'HR Admin', roleName: 'HR Staff', slaHours: 24 },
        { name: 'HR Manager Final', roleName: 'HR Manager', slaHours: 24 },
      ],
    },
    {
      name: 'Quality NCR Action Plan',
      moduleKey: 'QMS',
      docType: 'NCR',
      steps: [
        { name: 'QC Manager Review', roleName: 'QMS Officer', slaHours: 24 },
        { name: 'Department Head Ack', roleName: 'Project Manager', slaHours: 24 },
      ],
    },
    {
      name: 'Expense Claim Reimbursement',
      moduleKey: 'FINANCE',
      docType: 'EXPENSE_CLAIM',
      steps: [
        { name: 'Manager Approval', roleName: 'Project Manager', slaHours: 24 },
        { name: 'Finance Verification', roleName: 'Finance Staff', slaHours: 24 },
        { name: 'Payment Approval', roleName: 'Finance Manager', slaHours: 24 },
      ],
    },
  ];

  for (const wf of workflowData) {
    const existing = await prisma.workflowDefinition.findFirst({
      where: { tenantId, name: wf.name },
    });

    if (existing) {
      console.log(`|-- Skipping existing workflow: ${wf.name}`);
      continue;
    }

    const definition = await prisma.workflowDefinition.create({
      data: {
        tenantId,
        name: wf.name,
        moduleKey: wf.moduleKey,
        docType: wf.docType,
        steps: {
          create: wf.steps.map((step, idx) => {
            const roleId = getRoleId(step.roleName);
            if (!roleId) {
              console.warn(`  ! Role not found for step ${step.name}: ${step.roleName}`);
              // We need a valid roleId to create a step according to the schema
              // If not found, skip or use a dummy
              return null;
            }
            return {
              tenantId,
              stepNo: idx + 1,
              name: step.name,
              slaHours: step.slaHours,
              roleId: roleId,
            };
          }).filter(Boolean) as any[],
        },
      },
    });

    console.log(`✅ Created Workflow: ${definition.name} (${wf.steps.length} steps)`);
  }
}
