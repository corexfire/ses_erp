"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedFleet = seedFleet;
async function seedFleet(prisma, tenantId) {
    const transporters = [
        { code: 'TRP-001', name: 'PT. Lintas Logistik Nusantara', isExternal: true, address: 'Jakarta' },
        { code: 'TRP-002', name: 'CV. Bintang Angkutan Raya', isExternal: true, address: 'Surabaya' },
        { code: 'TRP-003', name: 'PT. Mandiri Jaya Express', isExternal: false, address: 'Bandung' },
    ];
    for (const t of transporters) {
        await prisma.transporter.upsert({
            where: { tenantId_code: { tenantId, code: t.code } },
            update: { notes: t.isExternal ? 'EXTERNAL' : 'INTERNAL' },
            create: {
                tenantId,
                code: t.code,
                name: t.name,
                notes: t.isExternal ? 'EXTERNAL' : 'INTERNAL',
                address: t.address,
                isActive: true,
            },
        });
    }
    const allTransporters = await prisma.transporter.findMany({ where: { tenantId } });
    const internalTransporter = allTransporters.find(t => t.notes === 'INTERNAL');
    const externalTransporters = allTransporters.filter(t => t.notes === 'EXTERNAL');
    const vehicles = [
        {
            code: 'VEH-001',
            plateNo: 'B 1234 ABC',
            vehicleType: 'TRUCK CDE',
            brand: 'Isuzu',
            model: 'ELF NMR 71',
            year: 2021,
            ownershipType: 'OWNED',
            capacityWeight: 2500,
            capacityVolume: 10,
            status: 'ACTIVE',
            stnkNo: '12345678',
            stnkExpiry: new Date('2026-10-20'),
            kirNo: 'KIR-9001',
            kirExpiry: new Date('2026-05-15'),
            notes: 'Main distribution vehicle',
            transporterId: internalTransporter?.id,
        },
        {
            code: 'VEH-002',
            plateNo: 'B 5678 XYZ',
            vehicleType: 'TRUCK CDD',
            brand: 'Hino',
            model: 'Dutro 130 HD',
            year: 2022,
            ownershipType: 'OWNED',
            capacityWeight: 4500,
            capacityVolume: 18,
            status: 'ACTIVE',
            stnkNo: '87654321',
            stnkExpiry: new Date('2027-01-10'),
            kirNo: 'KIR-9002',
            kirExpiry: new Date('2026-08-12'),
            transporterId: internalTransporter?.id,
        },
        {
            code: 'VEH-003',
            plateNo: 'D 9999 DEF',
            vehicleType: 'BLIND VAN',
            brand: 'Daihatsu',
            model: 'Gran Max',
            year: 2020,
            ownershipType: 'OWNED',
            capacityWeight: 800,
            capacityVolume: 4,
            status: 'MAINTENANCE',
            stnkNo: '11223344',
            stnkExpiry: new Date('2025-12-05'),
            kirNo: 'KIR-1122',
            kirExpiry: new Date('2024-03-01'),
            notes: 'Sedang servis rutin di bengkel resmi',
            transporterId: internalTransporter?.id,
        },
        {
            code: 'VEH-004',
            plateNo: 'L 2211 GHI',
            vehicleType: 'TRUCK TRONTON',
            brand: 'Mitsubishi',
            model: 'Fuso Fighter',
            year: 2023,
            ownershipType: 'THIRD_PARTY',
            capacityWeight: 15000,
            capacityVolume: 45,
            status: 'ACTIVE',
            stnkNo: '44556677',
            stnkExpiry: new Date('2028-06-25'),
            kirNo: 'KIR-4455',
            kirExpiry: new Date('2026-12-10'),
            transporterId: externalTransporters[0]?.id,
        },
        {
            code: 'VEH-005',
            plateNo: 'B 3322 JKL',
            vehicleType: 'WINGBOX',
            brand: 'Hino',
            model: 'Ranger FL',
            year: 2022,
            ownershipType: 'THIRD_PARTY',
            capacityWeight: 20000,
            capacityVolume: 55,
            status: 'ACTIVE',
            stnkNo: '99887766',
            stnkExpiry: new Date('2027-04-15'),
            kirNo: 'KIR-9988',
            kirExpiry: new Date('2026-09-30'),
            transporterId: externalTransporters[1]?.id,
        },
        {
            code: 'VEH-006',
            plateNo: 'F 7788 PQR',
            vehicleType: 'PICKUP',
            brand: 'Suzuki',
            model: 'Carry',
            year: 2018,
            ownershipType: 'OWNED',
            capacityWeight: 1000,
            capacityVolume: 5,
            status: 'INACTIVE',
            stnkNo: '55664433',
            stnkExpiry: new Date('2023-01-01'),
            kirNo: 'KIR-5566',
            kirExpiry: new Date('2022-12-15'),
            notes: 'Unit standby reposisi',
            transporterId: internalTransporter?.id,
        },
    ];
    for (const v of vehicles) {
        await prisma.fleetVehicle.upsert({
            where: { tenantId_code: { tenantId, code: v.code } },
            update: {
                ...v,
                ownershipType: v.ownershipType,
                status: v.status,
            },
            create: {
                tenantId,
                ...v,
                ownershipType: v.ownershipType,
                status: v.status,
            },
        });
    }
    const drivers = [
        { code: 'DRV-001', name: 'Agus Setiawan', licenseType: 'B2', phone: '08123456789', status: 'ACTIVE' },
        { code: 'DRV-002', name: 'Budi Raharjo', licenseType: 'B1', phone: '08129876543', status: 'ACTIVE' },
        { code: 'DRV-003', name: 'Slamet Mulyono', licenseType: 'B2', phone: '08134567890', status: 'ACTIVE' },
        { code: 'DRV-004', name: 'Dedi Kurniawan', licenseType: 'A', phone: '08156789012', status: 'INACTIVE' },
    ];
    for (const d of drivers) {
        await prisma.logisticsDriver.upsert({
            where: { tenantId_code: { tenantId, code: d.code } },
            update: {},
            create: {
                tenantId,
                code: d.code,
                name: d.name,
                licenseType: d.licenseType,
                phone: d.phone,
                status: d.status,
                transporterId: internalTransporter?.id,
            },
        });
    }
    console.log('Seeded Fleet module: 6 Vehicles, 4 Drivers, 3 Transporters');
}
//# sourceMappingURL=seed-fleet.js.map