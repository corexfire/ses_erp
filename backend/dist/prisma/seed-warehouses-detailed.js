"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedWarehousesDetailed = seedWarehousesDetailed;
async function seedWarehousesDetailed(prisma, tenantId) {
    console.log('🌱 Seeding Detailed Warehouse Topology...');
    const manager = await prisma.user.findFirst({ where: { tenantId, email: { contains: 'admin' } } });
    const dc = await prisma.warehouse.upsert({
        where: { tenantId_code: { tenantId, code: 'DC-JKT-01' } },
        update: {},
        create: {
            tenantId,
            code: 'DC-JKT-01',
            name: 'Distribution Center Jakarta Utama',
            type: 'DISTRIBUTION_CENTER',
            address1: 'Kawasan Industri Marunda, Blok C/12',
            city: 'Jakarta Utara',
            province: 'DKI Jakarta',
            postalCode: '14150',
            managerId: manager?.id,
            capacityWeight: 5000000,
            capacityVolume: 25000,
            isActive: true,
        }
    });
    const zones = [
        { code: 'Z-IN-01', name: 'Receiving Zone', description: 'Area Bongkar Muat & Inbound QC' },
        { code: 'Z-BK-01', name: 'Bulk Storage', description: 'Rak Tinggi untuk Pallet' },
        { code: 'Z-PK-01', name: 'Picking Area', description: 'Area Pengambilan Barang Kecil' },
        { code: 'Z-SH-01', name: 'Shipping Zone', description: 'Area Staging Outbound' },
    ];
    for (const z of zones) {
        const zone = await prisma.warehouseZone.upsert({
            where: { tenantId_warehouseId_code: { tenantId, warehouseId: dc.id, code: z.code } },
            update: {},
            create: {
                tenantId,
                warehouseId: dc.id,
                code: z.code,
                name: z.name,
                description: z.description,
            }
        });
        const binTypeMap = {
            'Z-IN-01': 'RECEIVING',
            'Z-BK-01': 'STORAGE',
            'Z-PK-01': 'PICKING',
            'Z-SH-01': 'SHIPPING',
        };
        const binCount = z.code === 'Z-BK-01' ? 15 : 5;
        for (let i = 1; i <= binCount; i++) {
            const idx = i.toString().padStart(2, '0');
            const binCode = `${z.code}-R${idx}`;
            await prisma.binLocation.upsert({
                where: { tenantId_warehouseId_code: { tenantId, warehouseId: dc.id, code: binCode } },
                update: { zoneId: zone.id, type: binTypeMap[z.code] },
                create: {
                    tenantId,
                    warehouseId: dc.id,
                    zoneId: zone.id,
                    code: binCode,
                    name: `${z.name} - Row ${idx}`,
                    type: binTypeMap[z.code],
                }
            });
        }
    }
    await prisma.warehouse.upsert({
        where: { tenantId_code: { tenantId, code: 'RH-SBY-01' } },
        update: {},
        create: {
            tenantId,
            code: 'RH-SBY-01',
            name: 'Regional Hub Surabaya',
            type: 'REGIONAL_HUB',
            address1: 'Jl. Rungkut Industri No. 5',
            city: 'Surabaya',
            province: 'Jawa Timur',
            postalCode: '60293',
            capacityWeight: 1000000,
            isActive: true,
        }
    });
    console.log('✅ Warehouse Topology seeded successfully.');
}
//# sourceMappingURL=seed-warehouses-detailed.js.map