"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seed_hris_analytics_1 = require("./seed-hris-analytics");
const seed_hris_succession_1 = require("./seed-hris-succession");
const seed_project_expansion_1 = require("./seed-project-expansion");
const seed_premium_project_1 = require("./seed-premium-project");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is required');
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new client_1.PrismaClient({ adapter });
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
    const passwordHash = await bcryptjs_1.default.hash(adminPassword, 12);
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
        'core.systemConfig.read',
        'core.systemConfig.update',
        'core.systemConfig.delete',
        'core.printFormat.read',
        'core.printFormat.update',
        'core.printFormat.delete',
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
    ];
    const permissions = await Promise.all(permissionKeys.map((key) => prisma.permission.upsert({
        where: { key },
        update: {},
        create: { key },
    })));
    await Promise.all(permissions.map((p) => prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: adminRole.id, permissionId: p.id } },
        update: {},
        create: { roleId: adminRole.id, permissionId: p.id },
    })));
    console.log(`Seeded tenant=${tenant.id} admin=${adminEmail}`);
    const { seedNcr } = await Promise.resolve().then(() => __importStar(require('./seed-qms-ncr')));
    await seedNcr(prisma, tenant.id);
    const { seedCapa } = await Promise.resolve().then(() => __importStar(require('./seed-qms-capa')));
    await seedCapa(prisma, tenant.id);
    const { seedSupplierRating } = await Promise.resolve().then(() => __importStar(require('./seed-qms-supplier-rating')));
    await seedSupplierRating(prisma, tenant.id);
    const { seedQualityDocuments } = await Promise.resolve().then(() => __importStar(require('./seed-qms-documents')));
    await seedQualityDocuments(prisma, tenant.id);
    const { seedCalibration } = await Promise.resolve().then(() => __importStar(require('./seed-qms-calibration')));
    await seedCalibration(prisma, tenant.id);
    const { seedFsm } = await Promise.resolve().then(() => __importStar(require('./seed-fsm')));
    await seedFsm(prisma, tenant.id);
    const { seedHandover } = await Promise.resolve().then(() => __importStar(require('./seed-fsm-handover')));
    await seedHandover(prisma, tenant.id);
    const { seedConstruction } = await Promise.resolve().then(() => __importStar(require('./seed-construction')));
    await seedConstruction(prisma, tenant.id);
    const { seedCompany } = await Promise.resolve().then(() => __importStar(require('./seed-company')));
    await seedCompany(prisma, tenant.id);
    const { seedBranch } = await Promise.resolve().then(() => __importStar(require('./seed-branch')));
    await seedBranch(prisma, tenant.id);
    const { seedCurrency } = await Promise.resolve().then(() => __importStar(require('./seed-currency')));
    await seedCurrency(prisma, tenant.id);
    const { seedUom } = await Promise.resolve().then(() => __importStar(require('./seed-uom')));
    await seedUom(prisma, tenant.id);
    const { seedFiscal } = await Promise.resolve().then(() => __importStar(require('./seed-fiscal')));
    await seedFiscal(prisma, tenant.id);
    const { seedCoa } = await Promise.resolve().then(() => __importStar(require('./seed-coa')));
    await seedCoa(prisma, tenant.id);
    const { seedCostCenter } = await Promise.resolve().then(() => __importStar(require('./seed-cost-center')));
    await seedCostCenter(prisma, tenant.id);
    const { seedProfitCenter } = await Promise.resolve().then(() => __importStar(require('./seed-profit-center')));
    await seedProfitCenter(prisma, tenant.id);
    const { seedTax } = await Promise.resolve().then(() => __importStar(require('./seed-tax')));
    await seedTax(prisma, tenant.id);
    const { seedRolesAndPermissions } = await Promise.resolve().then(() => __importStar(require('./seed-rbac')));
    await seedRolesAndPermissions(prisma, tenant.id);
    const { seedUsers } = await Promise.resolve().then(() => __importStar(require('./seed-users')));
    await seedUsers(prisma, tenant.id);
    const { seedWorkflows } = await Promise.resolve().then(() => __importStar(require('./seed-workflows')));
    await seedWorkflows(prisma, tenant.id);
    const { seedWorkflowInstances } = await Promise.resolve().then(() => __importStar(require('./seed-workflow-instances')));
    await seedWorkflowInstances(prisma, tenant.id);
    const { seedNotificationPreferences } = await Promise.resolve().then(() => __importStar(require('./seed-notification-preferences')));
    await seedNotificationPreferences(prisma, tenant.id);
    const { seedAuditLogs } = await Promise.resolve().then(() => __importStar(require('./seed-audit-logs')));
    await seedAuditLogs(prisma, tenant.id);
    const { seedOrganizationUnits } = await Promise.resolve().then(() => __importStar(require('./seed-org-units')));
    await seedOrganizationUnits(prisma, tenant.id);
    const { seedTasks } = await Promise.resolve().then(() => __importStar(require('./seed-tasks')));
    await seedTasks(prisma, tenant.id);
    const { seedFleet } = await Promise.resolve().then(() => __importStar(require('./seed-fleet')));
    await seedFleet(prisma, tenant.id);
    const { seedRoutes } = await Promise.resolve().then(() => __importStar(require('./seed-routes')));
    await seedRoutes(prisma, tenant.id);
    const { seedDelivery } = await Promise.resolve().then(() => __importStar(require('./seed-delivery')));
    await seedDelivery(prisma, tenant.id);
    const { seedWarehousesDetailed } = await Promise.resolve().then(() => __importStar(require('./seed-warehouses-detailed')));
    await seedWarehousesDetailed(prisma, tenant.id);
    const { seedPacking } = await Promise.resolve().then(() => __importStar(require('./seed-packing')));
    await seedPacking(prisma, tenant.id);
    const { seedSiteInfrastructure } = await Promise.resolve().then(() => __importStar(require('./seed-site-infrastructure')));
    await seedSiteInfrastructure(prisma, tenant.id);
    const { seedSupportAssets } = await Promise.resolve().then(() => __importStar(require('./seed-support-assets')));
    await seedSupportAssets(prisma, tenant.id);
    const { seedSupportDocuments } = await Promise.resolve().then(() => __importStar(require('./seed-support-documents')));
    await seedSupportDocuments(prisma, tenant.id);
    const { seedSupportCompliance } = await Promise.resolve().then(() => __importStar(require('./seed-support-compliance')));
    await seedSupportCompliance(prisma, tenant.id);
    const { seedSupportBi } = await Promise.resolve().then(() => __importStar(require('./seed-support-bi')));
    await seedSupportBi(prisma, tenant.id);
    const { seedSupportSustainability } = await Promise.resolve().then(() => __importStar(require('./seed-support-sustainability')));
    await seedSupportSustainability(prisma, tenant.id);
    const { seedSalesPricing } = await Promise.resolve().then(() => __importStar(require('./seed-sales-pricing')));
    await seedSalesPricing(prisma, tenant.id);
    const { seedIntegratedErp } = await Promise.resolve().then(() => __importStar(require('./seed-integrated-erp')));
    await seedIntegratedErp(prisma, tenant.id);
    const { seedEnterpriseFull } = await Promise.resolve().then(() => __importStar(require('./seed-enterprise-full')));
    await seedEnterpriseFull(prisma, tenant.id);
    const { seedConstructionMR } = await Promise.resolve().then(() => __importStar(require('./seed-construction-mr')));
    await seedConstructionMR(prisma, tenant.id);
    const { seedSubcontractors } = await Promise.resolve().then(() => __importStar(require('./seed-construction-subcontractors')));
    await seedSubcontractors(prisma, tenant.id);
    const { seedDailyProgress } = await Promise.resolve().then(() => __importStar(require('./seed-construction-progress')));
    await seedDailyProgress(prisma, tenant.id);
    const { seedDrawings } = await Promise.resolve().then(() => __importStar(require('./seed-construction-drawings')));
    await seedDrawings(prisma, tenant.id);
    const { seedHse } = await Promise.resolve().then(() => __importStar(require('./seed-construction-hse')));
    await seedHse(prisma, tenant.id);
    const { seedInterCompany } = await Promise.resolve().then(() => __importStar(require('./seed-finance-intercompany')));
    await seedInterCompany(prisma, tenant.id);
    const { seedReconciliation } = await Promise.resolve().then(() => __importStar(require('./seed-finance-reconciliation')));
    await seedReconciliation(prisma, tenant.id);
    const { seedPettyCash } = await Promise.resolve().then(() => __importStar(require('./seed-finance-petty-cash')));
    await seedPettyCash(prisma, tenant.id);
    const { seedCustomerReceipts } = await Promise.resolve().then(() => __importStar(require('./seed-finance-receipts')));
    await seedCustomerReceipts(prisma, tenant.id);
    const { seedFullFinanceFlow } = await Promise.resolve().then(() => __importStar(require('./seed-finance-full-flow')));
    await seedFullFinanceFlow(prisma, tenant.id);
    const { seedPaymentRequests } = await Promise.resolve().then(() => __importStar(require('./seed-finance-payment-requests')));
    await seedPaymentRequests(prisma, tenant.id);
    const { seedVendorReconciliation } = await Promise.resolve().then(() => __importStar(require('./seed-finance-vendor-reconciliation')));
    await seedVendorReconciliation(prisma, tenant.id);
    const { seedDepreciation } = await Promise.resolve().then(() => __importStar(require('./seed-finance-depreciation')));
    await seedDepreciation(prisma, tenant.id);
    const { seedAssetDisposal } = await Promise.resolve().then(() => __importStar(require('./seed-finance-asset-disposal')));
    await seedAssetDisposal(prisma, tenant.id);
    const { seedFinanceBudget } = await Promise.resolve().then(() => __importStar(require('./seed-finance-budget')));
    await seedFinanceBudget(prisma, tenant.id);
    const { seedProjectBudgets } = await Promise.resolve().then(() => __importStar(require('./seed-project-budgets')));
    await seedProjectBudgets(prisma, tenant.id);
    const { seedTaxInvoiceIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-tax-invoice-integrated')));
    await seedTaxInvoiceIntegrated(prisma, tenant.id);
    const { seedTaxInvoiceInputIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-tax-invoice-input-integrated')));
    await seedTaxInvoiceInputIntegrated(prisma, tenant.id);
    const { seedTaxNsfpIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-tax-nsfp-integrated')));
    await seedTaxNsfpIntegrated(prisma, tenant.id);
    const { seedTaxPpnMasaIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-tax-ppn-masa-integrated')));
    await seedTaxPpnMasaIntegrated(prisma, tenant.id);
    const { seedTaxEbupotIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-tax-ebupot-integrated')));
    await seedTaxEbupotIntegrated(prisma, tenant.id);
    const { seedTaxPph21Integrated } = await Promise.resolve().then(() => __importStar(require('./seed-tax-pph21-integrated')));
    await seedTaxPph21Integrated(prisma, tenant.id);
    const { seedTaxBuktiPotongIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-tax-bukti-potong-integrated')));
    await seedTaxBuktiPotongIntegrated(prisma, tenant.id);
    const { seedTaxIdBillingIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-tax-id-billing-integrated')));
    await seedTaxIdBillingIntegrated(prisma, tenant.id);
    const { seedTaxEqualizationIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-tax-equalization-integrated')));
    await seedTaxEqualizationIntegrated(prisma, tenant.id);
    const { seedHrisRecruitmentIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-hris-recruitment-integrated')));
    await seedHrisRecruitmentIntegrated(prisma, tenant.id);
    const { seedHrisLmsIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-hris-lms-integrated')));
    await seedHrisLmsIntegrated(prisma, tenant.id);
    const { seedHrisAttendanceIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-hris-attendance-integrated')));
    await seedHrisAttendanceIntegrated(prisma, tenant.id);
    const { seedHrisShiftIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-hris-shift-integrated')));
    await seedHrisShiftIntegrated(prisma, tenant.id);
    const { seedHrisExpenseIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-hris-expense-integrated')));
    await seedHrisExpenseIntegrated(prisma, tenant.id);
    const { seedProjectTenderIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-project-tender-integrated')));
    await seedProjectTenderIntegrated(prisma, tenant.id);
    const { seedProjectBillingIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-project-billing-integrated')));
    await seedProjectBillingIntegrated(prisma, tenant.id);
    const { seedSupportBiIntegrated } = await Promise.resolve().then(() => __importStar(require('./seed-support-bi-integrated')));
    await seedSupportBiIntegrated(prisma, tenant.id);
    const { seedSystemSettings } = await Promise.resolve().then(() => __importStar(require('./seed-system-settings')));
    await seedSystemSettings(prisma, tenant.id);
    const { seedHrisProductivity } = await Promise.resolve().then(() => __importStar(require('./seed-hris-productivity')));
    await seedHrisProductivity(prisma, tenant.id);
    const { seedHrisTimesheets } = await Promise.resolve().then(() => __importStar(require('./seed-hris-timesheets')));
    await seedHrisTimesheets(prisma, tenant.id);
    const { seedHrisOffboarding } = await Promise.resolve().then(() => __importStar(require('./seed-hris-offboarding')));
    await seedHrisOffboarding(prisma, tenant.id);
    const { seedLogisticsExpansion } = await Promise.resolve().then(() => __importStar(require('./seed-logistics-expansion')));
    await seedLogisticsExpansion(prisma, tenant.id);
    await (0, seed_hris_analytics_1.seedHrisAnalytics)(prisma, tenant.id);
    await (0, seed_hris_succession_1.seedHrisSuccession)(prisma, tenant.id);
    await (0, seed_project_expansion_1.seedProjectExpansion)(prisma, tenant.id);
    await (0, seed_premium_project_1.seedPremiumProject)(prisma, tenant.id);
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
//# sourceMappingURL=seed.js.map