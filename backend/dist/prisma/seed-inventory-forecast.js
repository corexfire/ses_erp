"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is required');
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
    const tenant = await prisma.tenant.findUnique({ where: { name: tenantName } });
    if (!tenant) {
        throw new Error(`Tenant '${tenantName}' not found.`);
    }
    console.log(`🧹 Memulai proses Seeding Predictive AI Inventory Forecasting untuk tenant: ${tenantName}...`);
    const items = await prisma.item.findMany({ where: { tenantId: tenant.id } });
    if (items.length === 0) {
        console.log('⚠️ Belum ada satupun Master Item di sistem ERP. Silakan jalankan seeder Item terlebih dahulu.');
        return;
    }
    await prisma.inventoryForecast.deleteMany({ where: { tenantId: tenant.id } });
    console.log(`🧠 Melewati ribuan data stock ledger historikal menggunakan Neural Sim...`);
    let inserted = 0;
    const forecastsToInject = [];
    for (const item of items) {
        if (Math.random() > 0.75)
            continue;
        const baseBurn = Math.floor(Math.random() * 500) + 10;
        const trendTypes = ['STABLE', 'UPWARD', 'DOWNWARD', 'SEASONAL'];
        const hitTrend = trendTypes[Math.floor(Math.random() * trendTypes.length)];
        let actualDemand = baseBurn;
        let insights = '';
        if (hitTrend === 'UPWARD') {
            actualDemand = Math.floor(baseBurn * 1.6);
            insights = `Trajektori pergerakan barang sangat positif. Rekomendasi peningkatan target stok aman.`;
        }
        else if (hitTrend === 'DOWNWARD') {
            actualDemand = Math.floor(baseBurn * 0.4);
            insights = `Minat pasar lesu. Turunkan parameter reorder untuk mencegah Dead Stock (Barang Mats).`;
        }
        else if (hitTrend === 'SEASONAL') {
            actualDemand = Math.floor(baseBurn * 2.2);
            insights = `Mendekati fase Q4 Peak Season. Sistem mengonfirmasi anomali positif, siap-siap lonjakan pesanan.`;
        }
        else {
            insights = `Kecepatan keluar (Velocity) stabil mengacu pada kurun pemesanan standar Q3.`;
        }
        const dev = Math.random() * 15;
        const confidenceScore = (98 - dev).toFixed(2);
        const recommendedQty = Math.floor(actualDemand * 1.15);
        forecastsToInject.push({
            tenantId: tenant.id,
            itemId: item.id,
            forecastDate: new Date(),
            targetPeriod: 'NEXT_30_DAYS',
            confidenceScore: Number(confidenceScore),
            predictedDemand: actualDemand,
            recommendedQty: recommendedQty,
            trend: hitTrend,
            insights: insights
        });
    }
    const chunkSize = 100;
    for (let i = 0; i < forecastsToInject.length; i += chunkSize) {
        const chunk = forecastsToInject.slice(i, i + chunkSize);
        const output = await prisma.inventoryForecast.createMany({ data: chunk });
        inserted += output.count;
    }
    console.log(`✅ Berhasil mencetak ${inserted} Vektor Prediksi AI ke dalam Engine Planning.`);
    console.log(`✅ Forecasting Engine siap melayani operator e-Logistics ERP!`);
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
//# sourceMappingURL=seed-inventory-forecast.js.map