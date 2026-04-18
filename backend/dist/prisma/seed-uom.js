"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUom = seedUom;
async function seedUom(prisma, tenantId) {
    console.log('⚖️ Seeding Unit of Measures (UOM)...');
    const uomsData = [
        { code: 'PCS', name: 'Pieces' },
        { code: 'BOX', name: 'Box' },
        { code: 'KG', name: 'Kilogram' },
        { code: 'MTR', name: 'Meter' },
        { code: 'SET', name: 'Set' },
        { code: 'UNIT', name: 'Unit' },
        { code: 'ROLL', name: 'Roll' },
        { code: 'PACK', name: 'Pack' },
        { code: 'DRUM', name: 'Drum' },
        { code: 'LTR', name: 'Liter' },
    ];
    const uoms = {};
    for (const u of uomsData) {
        uoms[u.code] = await prisma.uom.upsert({
            where: { tenantId_code: { tenantId, code: u.code } },
            update: { name: u.name },
            create: { tenantId, ...u }
        });
    }
    const conversions = [
        { from: 'BOX', to: 'PCS', factor: 12 },
        { from: 'PACK', to: 'PCS', factor: 10 },
        { from: 'SET', to: 'UNIT', factor: 1 },
        { from: 'DRUM', to: 'LTR', factor: 200 },
        { from: 'PCS', to: 'SET', factor: 1 },
    ];
    for (const c of conversions) {
        const fromUomId = uoms[c.from].id;
        const toUomId = uoms[c.to].id;
        await prisma.uomConversion.upsert({
            where: {
                tenantId_fromUomId_toUomId: {
                    tenantId,
                    fromUomId,
                    toUomId
                }
            },
            update: { factor: c.factor },
            create: {
                tenantId,
                fromUomId,
                toUomId,
                factor: c.factor
            }
        });
    }
    console.log('✅ UOM and Conversions seeded successfully.');
}
//# sourceMappingURL=seed-uom.js.map