"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRolesAndPermissions = seedRolesAndPermissions;
async function seedRolesAndPermissions(prisma, tenantId) {
    console.log('🔐 Seeding Roles & Permissions (RBAC)...');
    const allPermissions = [
        { key: 'core.company.read', description: 'View company profile' },
        { key: 'core.company.update', description: 'Edit company profile' },
        { key: 'core.branch.read', description: 'View branches' },
        { key: 'core.branch.create', description: 'Create branch' },
        { key: 'core.branch.update', description: 'Update branch' },
        { key: 'core.branch.deactivate', description: 'Deactivate branch' },
        { key: 'core.user.read', description: 'View users' },
        { key: 'core.user.create', description: 'Create user' },
        { key: 'core.user.update', description: 'Update user' },
        { key: 'core.user.deactivate', description: 'Deactivate user' },
        { key: 'core.user.assign_role', description: 'Assign role to user' },
        { key: 'core.role.read', description: 'View roles' },
        { key: 'core.role.create', description: 'Create role' },
        { key: 'core.role.assign_permission', description: 'Assign permission to role' },
        { key: 'core.permission.read', description: 'View permissions' },
        { key: 'core.cost_center.read', description: 'View cost centers' },
        { key: 'core.cost_center.create', description: 'Create cost center' },
        { key: 'core.cost_center.deactivate', description: 'Deactivate cost center' },
        { key: 'core.profit_center.read', description: 'View profit centers' },
        { key: 'core.profit_center.create', description: 'Create profit center' },
        { key: 'core.profit_center.deactivate', description: 'Deactivate profit center' },
        { key: 'core.tax.read', description: 'View tax codes' },
        { key: 'core.tax.create', description: 'Create tax code' },
        { key: 'core.tax.deactivate', description: 'Deactivate tax code' },
        { key: 'core.coa.read', description: 'View chart of accounts' },
        { key: 'core.coa.create', description: 'Create COA account' },
        { key: 'core.coa.update', description: 'Update COA account' },
        { key: 'core.coa.deactivate', description: 'Deactivate COA account' },
        { key: 'core.fiscal_year.read', description: 'View fiscal years' },
        { key: 'core.fiscal_year.create', description: 'Create fiscal year' },
        { key: 'core.fiscal_year.lock', description: 'Lock fiscal period' },
        { key: 'core.currency.read', description: 'View currencies' },
        { key: 'core.currency.create', description: 'Create currency rate' },
        { key: 'finance.journal.read', description: 'View journal entries' },
        { key: 'finance.journal.create', description: 'Create journal entry' },
        { key: 'finance.journal.approve', description: 'Approve journal entry' },
        { key: 'finance.ap.read', description: 'View accounts payable' },
        { key: 'finance.ar.read', description: 'View accounts receivable' },
        { key: 'finance.budget.read', description: 'View budgets' },
        { key: 'finance.budget.create', description: 'Create budget' },
        { key: 'finance.report.read', description: 'View financial reports' },
        { key: 'finance.report.export', description: 'Export financial reports' },
        { key: 'finance.reconciliation.read', description: 'View vendor reconciliation' },
        { key: 'finance.reconciliation.create', description: 'Run auto-match reconciliation' },
        { key: 'finance.assetDisposal.read', description: 'View asset disposal history' },
        { key: 'finance.assetDisposal.create', description: 'Create asset disposal record' },
        { key: 'finance.assetDisposal.approve', description: 'Approve asset disposal' },
        { key: 'finance.assetDisposal.delete', description: 'Delete asset disposal record' },
        { key: 'procurement.pr.read', description: 'View purchase requests' },
        { key: 'procurement.pr.create', description: 'Create purchase request' },
        { key: 'procurement.pr.approve', description: 'Approve purchase request' },
        { key: 'procurement.po.read', description: 'View purchase orders' },
        { key: 'procurement.po.create', description: 'Create purchase order' },
        { key: 'procurement.po.approve', description: 'Approve purchase order' },
        { key: 'procurement.po.receive', description: 'Receive purchase order' },
        { key: 'procurement.vendor.read', description: 'View vendors' },
        { key: 'procurement.vendor.create', description: 'Create vendor' },
        { key: 'sales.quotation.read', description: 'View sales quotations' },
        { key: 'sales.quotation.create', description: 'Create sales quotation' },
        { key: 'sales.order.read', description: 'View sales orders' },
        { key: 'sales.order.create', description: 'Create sales order' },
        { key: 'sales.invoice.read', description: 'View sales invoices' },
        { key: 'sales.invoice.create', description: 'Create sales invoice' },
        { key: 'crm.lead.read', description: 'View CRM leads' },
        { key: 'crm.lead.create', description: 'Create CRM lead' },
        { key: 'crm.opportunity.read', description: 'View opportunities' },
        { key: 'inventory.item.read', description: 'View inventory items' },
        { key: 'inventory.item.create', description: 'Create inventory item' },
        { key: 'inventory.item.update', description: 'Update inventory item' },
        { key: 'inventory.transfer.read', description: 'View stock transfers' },
        { key: 'inventory.transfer.create', description: 'Create stock transfer' },
        { key: 'inventory.opname.read', description: 'View stock opname' },
        { key: 'inventory.opname.create', description: 'Create stock opname' },
        { key: 'hrm.employee.read', description: 'View employee records' },
        { key: 'hrm.employee.create', description: 'Create employee record' },
        { key: 'hrm.payroll.read', description: 'View payroll data' },
        { key: 'hrm.payroll.process', description: 'Process payroll' },
        { key: 'hrm.leave.read', description: 'View leave requests' },
        { key: 'hrm.leave.approve', description: 'Approve leave requests' },
        { key: 'fsm.service_order.read', description: 'View FSM service orders' },
        { key: 'fsm.service_order.create', description: 'Create FSM service order' },
        { key: 'project.read', description: 'View projects' },
        { key: 'project.create', description: 'Create project' },
        { key: 'project.update', description: 'Update project' },
        { key: 'project.budget.read', description: 'View project financial plans' },
        { key: 'project.budget.manage', description: 'Manage project budgets and allocations' },
        { key: 'construction.read', description: 'View construction data' },
        { key: 'qms.ncr.read', description: 'View NCR records' },
        { key: 'qms.ncr.create', description: 'Create NCR' },
        { key: 'qms.ncr.approve', description: 'Approve NCR' },
        { key: 'qms.capa.read', description: 'View CAPA records' },
        { key: 'audit.log.read', description: 'View audit logs' },
    ];
    const permissionMap = {};
    for (const p of allPermissions) {
        const perm = await prisma.permission.upsert({
            where: { key: p.key },
            update: { description: p.description },
            create: { key: p.key, description: p.description }
        });
        permissionMap[p.key] = perm.id;
    }
    const roles = [
        {
            name: 'Super Administrator',
            permissions: allPermissions.map(p => p.key),
        },
        {
            name: 'Finance Manager',
            permissions: [
                'core.company.read', 'core.coa.read', 'core.coa.create', 'core.fiscal_year.read',
                'core.tax.read', 'core.currency.read', 'core.cost_center.read', 'core.profit_center.read',
                'finance.journal.read', 'finance.journal.create', 'finance.journal.approve',
                'finance.ap.read', 'finance.ar.read', 'finance.budget.read', 'finance.budget.create',
                'finance.report.read', 'finance.report.export', 'audit.log.read',
            ],
        },
        {
            name: 'Finance Staff',
            permissions: [
                'core.company.read', 'core.coa.read', 'core.tax.read', 'core.currency.read',
                'finance.journal.read', 'finance.journal.create',
                'finance.ap.read', 'finance.ar.read', 'finance.report.read',
            ],
        },
        {
            name: 'HR Manager',
            permissions: [
                'core.company.read', 'core.user.read', 'core.user.create', 'core.branch.read',
                'hrm.employee.read', 'hrm.employee.create', 'hrm.payroll.read', 'hrm.payroll.process',
                'hrm.leave.read', 'hrm.leave.approve', 'audit.log.read',
            ],
        },
        {
            name: 'HR Staff',
            permissions: [
                'core.company.read', 'core.user.read',
                'hrm.employee.read', 'hrm.payroll.read', 'hrm.leave.read',
            ],
        },
        {
            name: 'Sales Manager',
            permissions: [
                'core.company.read', 'core.branch.read', 'core.tax.read', 'core.currency.read',
                'sales.quotation.read', 'sales.quotation.create', 'sales.order.read', 'sales.order.create',
                'sales.invoice.read', 'sales.invoice.create',
                'crm.lead.read', 'crm.lead.create', 'crm.opportunity.read', 'inventory.item.read',
            ],
        },
        {
            name: 'Sales Staff',
            permissions: [
                'core.company.read', 'core.tax.read', 'core.currency.read',
                'sales.quotation.read', 'sales.quotation.create', 'sales.order.read',
                'crm.lead.read', 'crm.lead.create', 'crm.opportunity.read',
            ],
        },
        {
            name: 'Procurement Manager',
            permissions: [
                'core.company.read', 'core.branch.read', 'core.tax.read', 'core.currency.read',
                'procurement.pr.read', 'procurement.pr.create', 'procurement.pr.approve',
                'procurement.po.read', 'procurement.po.create', 'procurement.po.approve', 'procurement.po.receive',
                'procurement.vendor.read', 'procurement.vendor.create',
                'inventory.item.read', 'finance.ap.read', 'audit.log.read',
            ],
        },
        {
            name: 'Warehouse Operator',
            permissions: [
                'core.company.read', 'inventory.item.read', 'inventory.transfer.read', 'inventory.transfer.create',
                'inventory.opname.read', 'inventory.opname.create', 'procurement.po.receive',
            ],
        },
        {
            name: 'Project Manager',
            permissions: [
                'core.company.read', 'core.branch.read', 'project.read', 'project.create', 'project.update',
                'construction.read', 'inventory.item.read', 'procurement.pr.read', 'procurement.pr.create',
                'finance.report.read',
            ],
        },
        {
            name: 'Field Technician',
            permissions: [
                'core.company.read', 'fsm.service_order.read', 'fsm.service_order.create',
                'inventory.item.read', 'qms.ncr.read', 'qms.ncr.create',
            ],
        },
        {
            name: 'QMS Officer',
            permissions: [
                'core.company.read', 'qms.ncr.read', 'qms.ncr.create', 'qms.ncr.approve',
                'qms.capa.read', 'audit.log.read',
            ],
        },
        {
            name: 'Read Only',
            permissions: [
                'core.company.read', 'core.branch.read', 'inventory.item.read',
                'sales.order.read', 'procurement.po.read', 'finance.report.read',
            ],
        },
    ];
    for (const r of roles) {
        const role = await prisma.role.upsert({
            where: { tenantId_name: { tenantId, name: r.name } },
            update: { name: r.name },
            create: { tenantId, name: r.name }
        });
        await prisma.rolePermission.deleteMany({ where: { roleId: role.id } });
        const validPermIds = r.permissions
            .map(p => permissionMap[p])
            .filter(Boolean);
        if (validPermIds.length > 0) {
            await prisma.rolePermission.createMany({
                data: validPermIds.map(permissionId => ({ roleId: role.id, permissionId })),
                skipDuplicates: true,
            });
        }
    }
    console.log(`✅ RBAC seeded: ${allPermissions.length} permissions, ${roles.length} roles.`);
}
//# sourceMappingURL=seed-rbac.js.map