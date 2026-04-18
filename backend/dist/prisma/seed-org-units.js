"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOrganizationUnits = seedOrganizationUnits;
async function seedOrganizationUnits(prisma, tenantId) {
    console.log('🏢 Seeding Strategic Organization Units (Departments)...');
    const units = [
        { code: 'CORP', name: 'Corporate Head Office', type: 'LEGAL_ENTITY' },
        { code: 'FIN', name: 'Finance & Accounting', type: 'DEPARTMENT', parentCode: 'CORP' },
        { code: 'HRD', name: 'Human Resources & General Affairs', type: 'DEPARTMENT', parentCode: 'CORP' },
        { code: 'ITS', name: 'Information Technology Services', type: 'DEPARTMENT', parentCode: 'CORP' },
        { code: 'OPS', name: 'Operations & Production', type: 'DEPARTMENT', parentCode: 'CORP' },
        { code: 'LGL', name: 'Legal & Compliance', type: 'DEPARTMENT', parentCode: 'CORP' },
        { code: 'PRJ', name: 'Project Management Office', type: 'DEPARTMENT', parentCode: 'OPS' },
        { code: 'WMS', name: 'Warehouse & Logistics', type: 'DEPARTMENT', parentCode: 'OPS' },
        { code: 'HSE', name: 'Health, Safety & Environment', type: 'DEPARTMENT', parentCode: 'OPS' }
    ];
    for (const unit of units.filter(u => !u.parentCode)) {
        await prisma.organizationUnit.upsert({
            where: { tenantId_code: { tenantId, code: unit.code } },
            update: { name: unit.name, type: unit.type },
            create: { tenantId, code: unit.code, name: unit.name, type: unit.type }
        });
    }
    for (const unit of units.filter(u => u.parentCode)) {
        const parent = await prisma.organizationUnit.findUnique({
            where: { tenantId_code: { tenantId, code: unit.parentCode } }
        });
        await prisma.organizationUnit.upsert({
            where: { tenantId_code: { tenantId, code: unit.code } },
            update: { name: unit.name, type: unit.type, parentId: parent?.id },
            create: { tenantId, code: unit.code, name: unit.name, type: unit.type, parentId: parent?.id }
        });
    }
    console.log('✅ Organization Units seeded successfully.');
}
//# sourceMappingURL=seed-org-units.js.map