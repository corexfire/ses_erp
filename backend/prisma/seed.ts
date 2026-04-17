import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@ses-erp.local';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'admin123';
  const adminName = process.env.SEED_ADMIN_NAME ?? 'Admin';

  const tenant = await prisma.tenant.upsert({
    where: { name: tenantName },
    update: {},
    create: { name: tenantName },
  });

  const adminRole = await prisma.role.upsert({
    where: { tenantId_name: { tenantId: tenant.id, name: 'admin' } },
    update: {},
    create: { tenantId: tenant.id, name: 'admin' },
  });

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      tenantId: tenant.id,
      name: adminName,
      passwordHash,
      isSuperAdmin: true,
      isActive: true,
    },
    create: {
      tenantId: tenant.id,
      email: adminEmail,
      name: adminName,
      passwordHash,
      isSuperAdmin: true,
      isActive: true,
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
    update: {},
    create: { userId: adminUser.id, roleId: adminRole.id },
  });

  const permissionKeys = [
    'core.company.read',
    'core.company.update',
    'core.branch.read',
    'core.branch.create',
    'core.branch.update',
    'core.branch.deactivate',
    'core.currency.read',
    'core.currency.create',
    'core.currency.deactivate',
    'core.exchange_rate.read',
    'core.exchange_rate.create',
    'core.uom.read',
    'core.uom.create',
    'core.uom.deactivate',
    'core.uom_conversion.read',
    'core.uom_conversion.create',
    'core.uom_conversion.delete',
    'core.fiscal_year.read',
    'core.fiscal_year.create',
    'core.fiscal_year.close',
    'core.coa.read',
    'core.coa.create',
    'core.coa.deactivate',
    'core.cost_center.read',
    'core.cost_center.create',
    'core.cost_center.deactivate',
    'core.profit_center.read',
    'core.profit_center.create',
    'core.profit_center.deactivate',
    'core.tax.read',
    'core.tax.create',
    'core.tax.deactivate',
    'core.user.read',
    'core.user.create',
    'core.user.deactivate',
    'core.user.assign_role',
    'core.role.read',
    'core.role.create',
    'core.role.assign_permission',
    'core.permission.read',
    'core.audit.read',
    'core.workflow.read',
    'core.workflow.create',
    'core.workflow.update',
    'core.workflow.deactivate',
    'crm.lead.read',
    'crm.lead.create',
    'crm.lead.update',
    'crm.lead.convert',
    'crm.lead.assign',
    'crm.customer.read',
    'crm.customer.create',
    'crm.customer.update',
    'crm.customer.deactivate',
    'crm.user.read',
    'crm.dashboard.read',
    'crm.my_work.read',
    'crm.opportunity.read',
    'crm.opportunity.create',
    'crm.opportunity.update',
    'crm.opportunity.assign',
    'crm.activity.read',
    'crm.activity.create',
    'crm.activity.update',
    'crm.activity.assign',
    'crm.campaign.read',
    'crm.campaign.create',
    'crm.campaign.update',
    'crm.ticket.read',
    'crm.ticket.create',
    'crm.ticket.update',
    'crm.ticket.assign',
    'sales.quotation.read',
    'sales.quotation.create',
    'sales.quotation.update',
    'sales.quotation.submit',
    'sales.order.read',
    'sales.order.create',
    'sales.order.update',
    'sales.order.submit',
    'sales.order.approve',
    'sales.pricing.read',
    'sales.pricing.create',
    'sales.pricing.update',
    'sales.invoice.read',
    'sales.invoice.create',
    'sales.invoice.update',
    'sales.invoice.submit',
    'sales.return.read',
    'sales.return.create',
    'sales.return.update',
    'sales.commission.read',
    'sales.commission.create',
    'sales.shipping.read',
    'sales.shipping.create',
    'sales.shipping.update',
    'procurement.supplier.read',
    'procurement.supplier.create',
    'procurement.supplier.update',
    'procurement.supplier.deactivate',
    'procurement.requisition.read',
    'procurement.requisition.create',
    'procurement.requisition.update',
    'procurement.requisition.submit',
    'procurement.requisition.approve',
    'procurement.rfq.read',
    'procurement.rfq.create',
    'procurement.rfq.update',
    'procurement.purchase_order.read',
    'procurement.purchase_order.create',
    'procurement.purchase_order.update',
    'procurement.purchase_order.submit',
    'procurement.purchase_order.approve',
    'procurement.invoice.read',
    'procurement.invoice.create',
    'procurement.invoice.update',
    'procurement.invoice.submit',
    'procurement.landed_cost.read',
    'procurement.landed_cost.create',
    'procurement.landed_cost.update',
    'procurement.return.read',
    'procurement.return.create',
    'procurement.return.update',
    'inventory.item_group.read',
    'inventory.item_group.create',
    'inventory.item_group.update',
    'inventory.item_group.deactivate',
    'inventory.item.read',
    'inventory.item.create',
    'inventory.item.update',
    'inventory.item.deactivate',
    'inventory.warehouse.read',
    'inventory.warehouse.create',
    'inventory.warehouse.update',
    'inventory.warehouse.deactivate',
    'inventory.bin.read',
    'inventory.bin.create',
    'inventory.bin.update',
    'inventory.bin.deactivate',
    'inventory.stock.read',
    'inventory.grn.read',
    'inventory.grn.create',
    'inventory.grn.update',
    'inventory.grn.post',
    'inventory.transfer.read',
    'inventory.transfer.create',
    'inventory.transfer.update',
    'inventory.transfer.post',
    'inventory.stock_opname.read',
    'inventory.stock_opname.create',
    'inventory.stock_opname.update',
    'inventory.stock_opname.post',
    'inventory.qc.read',
    'inventory.qc.update',
    // Logistics & Supply Chain
    'logistics.dashboard.read',
    'logistics.fleet.read',
    'logistics.fleet.manage',
    'logistics.driver.read',
    'logistics.driver.manage',
    'logistics.route.read',
    'logistics.route.manage',
    'logistics.trip.read',
    'logistics.trip.manage',
    'logistics.dispatch.execute',
    'logistics.delivery.read',
    'logistics.delivery.manage',
    'logistics.pod.capture',
    'logistics.warehouse.read',
    'logistics.warehouse.execute',
    'logistics.cost.read',
    'logistics.cost.manage',
    'logistics.settings.manage',
    // Project Management
    'project.setup.read',
    'project.setup.manage',
    'project.tender.read',
    'project.tender.manage',
    'project.billing.read',
    'project.billing.manage',
    'project.site.read',
    'project.site.execute',
    'project.cost.read',
    'project.cost.manage',
    'project.task_category.read',
    'project.task_category.create',
    'project.task_category.update',
    'project.task_category.delete',
    // Notification Center
    'notification.read',
    'notification.manage',
    'notification.preference.manage',
    'manufacturing.equipment.read',
    'manufacturing.equipment.create',
    'manufacturing.equipment.update',
    'manufacturing.maintenance.update',
    'manufacturing.costing.read',
    'manufacturing.costing.create',
    'manufacturing.costing.update',
    'qms.ncr.read',
    'qms.ncr.create',
    'qms.ncr.update',
    'qms.ncr.delete',
    'qms.capa.read',
    'qms.capa.create',
    'qms.capa.update',
    'qms.capa.delete',
    'qms.supplier_rating.read',
    'qms.supplier_rating.update',
    'qms.documents.read',
    'qms.documents.create',
    'qms.documents.update',
    'qms.documents.delete',
    'qms.calibration.read',
    'qms.calibration.create',
    'qms.calibration.update',
  ] as const;

  const permissions = await Promise.all(
    permissionKeys.map((key) =>
      prisma.permission.upsert({
        where: { key },
        update: {},
        create: { key },
      }),
    ),
  );

  await Promise.all(
    permissions.map((p) =>
      prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: adminRole.id, permissionId: p.id } },
        update: {},
        create: { roleId: adminRole.id, permissionId: p.id },
      }),
    ),
  );

  console.log(`Seeded tenant=${tenant.id} admin=${adminEmail}`);

  // Modular seeds
  const { seedNcr } = await import('./seed-qms-ncr');
  await seedNcr(prisma, tenant.id);
  const { seedCapa } = await import('./seed-qms-capa');
  await seedCapa(prisma, tenant.id);
  const { seedSupplierRating } = await import('./seed-qms-supplier-rating');
  await seedSupplierRating(prisma, tenant.id);
  const { seedQualityDocuments } = await import('./seed-qms-documents');
  await seedQualityDocuments(prisma, tenant.id);
  const { seedCalibration } = await import('./seed-qms-calibration');
  await seedCalibration(prisma, tenant.id);
  const { seedFsm } = await import('./seed-fsm');
  await seedFsm(prisma, tenant.id);
  const { seedHandover } = await import('./seed-fsm-handover');
  await seedHandover(prisma, tenant.id);
  const { seedConstruction } = await import('./seed-construction');
  await seedConstruction(prisma, tenant.id);
  const { seedCompany } = await import('./seed-company');
  await seedCompany(prisma, tenant.id);
  const { seedBranch } = await import('./seed-branch');
  await seedBranch(prisma, tenant.id);
  const { seedCurrency } = await import('./seed-currency');
  await seedCurrency(prisma, tenant.id);
  const { seedUom } = await import('./seed-uom');
  await seedUom(prisma, tenant.id);
  const { seedFiscal } = await import('./seed-fiscal');
  await seedFiscal(prisma, tenant.id);
  const { seedCoa } = await import('./seed-coa');
  await seedCoa(prisma, tenant.id);
  const { seedCostCenter } = await import('./seed-cost-center');
  await seedCostCenter(prisma, tenant.id);
  const { seedProfitCenter } = await import('./seed-profit-center');
  await seedProfitCenter(prisma, tenant.id);
  const { seedTax } = await import('./seed-tax');
  await seedTax(prisma, tenant.id);
  const { seedRolesAndPermissions } = await import('./seed-rbac');
  await seedRolesAndPermissions(prisma, tenant.id);
  const { seedUsers } = await import('./seed-users');
  await seedUsers(prisma, tenant.id);

  const { seedWorkflows } = await import('./seed-workflows');
  await seedWorkflows(prisma, tenant.id);

  const { seedWorkflowInstances } = await import('./seed-workflow-instances');
  await seedWorkflowInstances(prisma, tenant.id);

  const { seedNotificationPreferences } = await import('./seed-notification-preferences');
  await seedNotificationPreferences(prisma, tenant.id);

  const { seedAuditLogs } = await import('./seed-audit-logs');
  await seedAuditLogs(prisma, tenant.id);

  const { seedOrganizationUnits } = await import('./seed-org-units');
  await seedOrganizationUnits(prisma, tenant.id);

  const { seedTasks } = await import('./seed-tasks');
  await seedTasks(prisma, tenant.id);

  const { seedFleet } = await import('./seed-fleet');
  await seedFleet(prisma, tenant.id);

  const { seedRoutes } = await import('./seed-routes');
  await seedRoutes(prisma, tenant.id);

  const { seedDelivery } = await import('./seed-delivery');
  await seedDelivery(prisma, tenant.id);

  const { seedWarehousesDetailed } = await import('./seed-warehouses-detailed');
  await seedWarehousesDetailed(prisma, tenant.id);

  const { seedPacking } = await import('./seed-packing');
  await seedPacking(prisma, tenant.id);

  const { seedProjectBudgets } = await import('./seed-project-budgets');
  await seedProjectBudgets(prisma, tenant.id);

  const { seedSiteInfrastructure } = await import('./seed-site-infrastructure');
  await seedSiteInfrastructure(prisma, tenant.id);

  const { seedSupportAssets } = await import('./seed-support-assets');
  await seedSupportAssets(prisma, tenant.id);

  const { seedSupportDocuments } = await import('./seed-support-documents');
  await seedSupportDocuments(prisma, tenant.id);

  const { seedSupportCompliance } = await import('./seed-support-compliance');
  await seedSupportCompliance(prisma, tenant.id);

  const { seedSupportBi } = await import('./seed-support-bi');
  await seedSupportBi(prisma, tenant.id);

  const { seedSupportSustainability } = await import('./seed-support-sustainability');
  await seedSupportSustainability(prisma, tenant.id);

  const { seedSalesPricing } = await import('./seed-sales-pricing');
  await seedSalesPricing(prisma, tenant.id);

  const { seedIntegratedErp } = await import('./seed-integrated-erp');
  await seedIntegratedErp(prisma, tenant.id);

  const { seedEnterpriseFull } = await import('./seed-enterprise-full');
  await seedEnterpriseFull(prisma, tenant.id);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
