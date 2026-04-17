"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCurrency = seedCurrency;
async function seedCurrency(prisma, tenantId) {
    console.log('💱 Seeding Currencies & Exchange Rates...');
    const currencyData = [
        { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', isBase: true },
        { code: 'USD', name: 'US Dollar', symbol: '$', isBase: false },
        { code: 'EUR', name: 'Euro', symbol: '€', isBase: false },
        { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', isBase: false },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥', isBase: false },
    ];
    const currencies = {};
    for (const c of currencyData) {
        currencies[c.code] = await prisma.currency.upsert({
            where: { tenantId_code: { tenantId, code: c.code } },
            update: { name: c.name, symbol: c.symbol, isBase: c.isBase },
            create: { tenantId, ...c }
        });
    }
    const baseId = currencies['IDR'].id;
    const rates = [
        { code: 'USD', value: 16250 },
        { code: 'EUR', value: 17500 },
        { code: 'SGD', value: 11950 },
        { code: 'JPY', value: 105.2 },
    ];
    for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        for (const r of rates) {
            const variance = (Math.random() - 0.5) * (r.value * 0.005);
            const finalRate = r.value + variance;
            await prisma.exchangeRate.upsert({
                where: {
                    tenantId_baseCurrencyId_quoteCurrencyId_rateDate: {
                        tenantId,
                        baseCurrencyId: currencies[r.code].id,
                        quoteCurrencyId: baseId,
                        rateDate: date
                    }
                },
                update: { rate: finalRate },
                create: {
                    tenantId,
                    baseCurrencyId: currencies[r.code].id,
                    quoteCurrencyId: baseId,
                    rate: finalRate,
                    rateDate: date
                }
            });
        }
    }
    console.log('✅ Currencies and Rates seeded successfully.');
}
//# sourceMappingURL=seed-currency.js.map