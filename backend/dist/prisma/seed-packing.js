"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPacking = seedPacking;
async function seedPacking(prisma, tenantId) {
    console.log('📦 Seeding Packing Intelligence...');
    const warehouse = await prisma.warehouse.findFirst({ where: { tenantId, code: 'DC-JKT-01' } });
    const deliveryOrders = await prisma.deliveryOrder.findMany({
        where: { tenantId },
        take: 10,
        orderBy: { createdAt: 'desc' }
    });
    const carrier = await prisma.carrier.findFirst({ where: { tenantId } });
    if (deliveryOrders.length === 0) {
        console.log('⚠️ No delivery orders found. Skipping packing seed.');
        return;
    }
    const packingData = [
        {
            code: 'PKL-20260401-0001',
            weight: 125.5,
            volume: 0.85,
            packages: 5,
            mark: 'FRAGILE - HANDLE WITH CARE',
            seal: 'SL-99212',
            status: 'CONFIRMED'
        },
        {
            code: 'PKL-20260402-0002',
            weight: 450.0,
            volume: 2.10,
            packages: 12,
            mark: 'KEEP DRY - EXPORT TO SG',
            seal: 'SL-88310',
            status: 'DRAFT'
        },
        {
            code: 'PKL-20260403-0003',
            weight: 12.0,
            volume: 0.05,
            packages: 1,
            mark: 'EXPRESS AIRFREIGHT',
            seal: 'E-662',
            status: 'CONFIRMED'
        },
        {
            code: 'PKL-20260404-0004',
            weight: 1200.0,
            volume: 12.5,
            packages: 4,
            mark: 'HEAVY CARGO - PALLETIZED',
            seal: 'SEA-2210',
            status: 'DRAFT'
        }
    ];
    for (let i = 0; i < deliveryOrders.length; i++) {
        const data = packingData[i % packingData.length];
        const dOrder = deliveryOrders[i];
        const existing = await prisma.packingList.findUnique({
            where: { deliveryOrderId: dOrder.id }
        });
        if (existing) {
            console.log(`-- Skipping PackingList for ${dOrder.code} (exists)`);
            continue;
        }
        await prisma.packingList.upsert({
            where: { tenantId_code: { tenantId, code: `${data.code}-${i}` } },
            update: {},
            create: {
                tenantId,
                code: `${data.code}-${i}`,
                deliveryOrderId: dOrder.id,
                warehouseId: warehouse?.id || 'default-wh',
                packingDate: new Date(),
                status: data.status,
                totalWeight: data.weight,
                totalVolume: data.volume,
                packageCount: data.packages,
                shippingMark: data.mark,
                sealNumber: data.seal,
                carrierId: carrier?.id,
                packedBy: 'Admin',
                notes: `Automated packing for Order ${dOrder.code}`
            }
        });
    }
    console.log('✅ Packing Intelligence seeded successfully.');
}
//# sourceMappingURL=seed-packing.js.map