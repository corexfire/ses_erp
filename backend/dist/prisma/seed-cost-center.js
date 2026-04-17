"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCostCenter = seedCostCenter;
async function seedCostCenter(prisma, tenantId) {
    console.log('💰 Seeding Cost Centers...');
    const centers = [
        { code: 'CC-ADM', name: 'Administrative & General' },
        { code: 'CC-FIN', name: 'Finance & Accounting' },
        { code: 'CC-HRD', name: 'Human Resources' },
        { code: 'CC-ITD', name: 'Information Technology' },
        { code: 'CC-MKT', name: 'Marketing & Promotion' },
        { code: 'CC-OPS', name: 'Operations & Logistics' },
        { code: 'CC-PRD', name: 'Production' },
        { code: 'CC-SLS', name: 'Sales & Commercial' },
    ];
    for (const c of centers) {
        await prisma.costCenter.upsert({
            where: { tenantId_code: { tenantId, code: c.code } },
            update: { name: c.name, isActive: true },
            create: { tenantId, code: c.code, name: c.name }
        });
    }
    console.log('✅ Cost Centers seeded successfully.');
}
//# sourceMappingURL=seed-cost-center.js.map