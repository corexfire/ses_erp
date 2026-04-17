import { PrismaClient } from './generated/client';

export async function seedCurrency(prisma: PrismaClient, tenantId: string) {
  console.log('💱 Seeding Currencies & Exchange Rates...');

  // 1. Seed Currencies
  const currencyData = [
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', isBase: true },
    { code: 'USD', name: 'US Dollar', symbol: '$', isBase: false },
    { code: 'EUR', name: 'Euro', symbol: '€', isBase: false },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', isBase: false },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', isBase: false },
  ];

  const currencies: any = {};
  for (const c of currencyData) {
    currencies[c.code] = await prisma.currency.upsert({
      where: { tenantId_code: { tenantId, code: c.code } },
      update: { name: c.name, symbol: c.symbol, isBase: c.isBase },
      create: { tenantId, ...c }
    });
  }

  const baseId = currencies['IDR'].id;

  // 2. Seed Exchange Rates (Last 5 days)
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
      // Add slight random fluctuation for realism
      const variance = (Math.random() - 0.5) * (r.value * 0.005);
      const finalRate = r.value + variance;

      await prisma.exchangeRate.upsert({
        where: {
          tenantId_baseCurrencyId_quoteCurrencyId_rateDate: {
            tenantId,
            baseCurrencyId: currencies[r.code].id,
            quoteCurrencyId: baseId, // Quoted against IDR
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
