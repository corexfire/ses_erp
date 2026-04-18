"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSupportSustainability = seedSupportSustainability;
async function seedSupportSustainability(prisma, tenantId) {
    console.log('--- SEEDING SUPPORT SUSTAINABILITY (ESG) ---');
    const employees = await prisma.employee.findMany({ where: { tenantId }, take: 2 });
    const recorderId = employees[0]?.id;
    const verifierId = employees[1]?.id;
    const data = [
        { code: 'SUST-2024-EM-01', type: 'EMISSION', indicator: 'Scope 2 Emissions', period: '2024-01', value: 45.2, target: 40.0, unit: 'tCO2e' },
        { code: 'SUST-2024-EM-02', type: 'EMISSION', indicator: 'Scope 2 Emissions', period: '2024-02', value: 42.8, target: 40.0, unit: 'tCO2e' },
        { code: 'SUST-2024-EM-03', type: 'EMISSION', indicator: 'Scope 2 Emissions', period: '2024-03', value: 39.5, target: 40.0, unit: 'tCO2e' },
        { code: 'SUST-2024-EN-01', type: 'ENERGY', indicator: 'Renewable Production', period: '2024-01', value: 12500, target: 12000, unit: 'kWh' },
        { code: 'SUST-2024-EN-02', type: 'ENERGY', indicator: 'Renewable Production', period: '2024-02', value: 13200, target: 12000, unit: 'kWh' },
        { code: 'SUST-2024-EN-03', type: 'ENERGY', indicator: 'Renewable Production', period: '2024-03', value: 14800, target: 12000, unit: 'kWh' },
        { code: 'SUST-2024-WA-01', type: 'WATER', indicator: 'Water Recycled', period: '2024-01', value: 850, target: 1000, unit: 'm3' },
        { code: 'SUST-2024-WA-02', type: 'WATER', indicator: 'Water Recycled', period: '2024-02', value: 920, target: 1000, unit: 'm3' },
        { code: 'SUST-2024-WA-03', type: 'WATER', indicator: 'Water Recycled', period: '2024-03', value: 1100, target: 1000, unit: 'm3' },
        { code: 'SUST-2024-WS-01', type: 'WASTE', indicator: 'Recycled Waste', period: '2024-01', value: 2400, target: 2000, unit: 'kg' },
        { code: 'SUST-2024-WS-02', type: 'WASTE', indicator: 'Recycled Waste', period: '2024-02', value: 2650, target: 2000, unit: 'kg' },
        { code: 'SUST-2024-WS-03', type: 'WASTE', indicator: 'Recycled Waste', period: '2024-03', value: 2100, target: 2000, unit: 'kg' },
        { code: 'SUST-2024-SO-01', type: 'SOCIAL', indicator: 'CSR Impact Hours', period: '2024-01', value: 120, target: 100, unit: 'Hours' },
        { code: 'SUST-2024-SO-02', type: 'SOCIAL', indicator: 'CSR Impact Hours', period: '2024-02', value: 85, target: 100, unit: 'Hours' },
        { code: 'SUST-2024-SO-03', type: 'SOCIAL', indicator: 'CSR Impact Hours', period: '2024-03', value: 310, target: 100, unit: 'Hours' },
    ];
    for (const item of data) {
        await prisma.supportSustainability.upsert({
            where: {
                tenantId_code: {
                    tenantId,
                    code: item.code
                }
            },
            update: {},
            create: {
                tenantId,
                ...item,
                status: 'VERIFIED',
                recordedById: recorderId,
                verifiedById: verifierId,
                description: `Monthly performance tracking for ${item.indicator} - ${item.period}`
            }
        });
    }
    console.log('--- SUPPORT SUSTAINABILITY SEEDING COMPLETED ---');
}
//# sourceMappingURL=seed-support-sustainability.js.map