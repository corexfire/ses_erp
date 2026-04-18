"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProfitCenter = seedProfitCenter;
async function seedProfitCenter(prisma, tenantId) {
    console.log('📈 Seeding Profit Centers...');
    const centers = [
        { code: 'PC-JKE', name: 'Java Regional Profit Center' },
        { code: 'PC-SKE', name: 'Sumatra Regional Profit Center' },
        { code: 'PC-KRE', name: 'Kalimantan Regional Profit Center' },
        { code: 'PC-SRE', name: 'Sulawesi Regional Profit Center' },
        { code: 'PC-BRE', name: 'Bali & Nusa Regional Profit Center' },
    ];
    for (const c of centers) {
        await prisma.profitCenter.upsert({
            where: { tenantId_code: { tenantId, code: c.code } },
            update: { name: c.name, isActive: true },
            create: { tenantId, code: c.code, name: c.name }
        });
    }
    console.log('✅ Profit Centers seeded successfully.');
}
//# sourceMappingURL=seed-profit-center.js.map