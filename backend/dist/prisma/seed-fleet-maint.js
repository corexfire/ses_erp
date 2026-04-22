"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generated_1 = require("./generated");
const adapter_pg_1 = require("@prisma/adapter-pg");
async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error('DATABASE_URL is required');
    }
    const adapter = new adapter_pg_1.PrismaPg({ connectionString });
    const prisma = new generated_1.PrismaClient({ adapter });
    try {
        const tenant = await prisma.tenant.findFirst();
        if (!tenant) {
            console.log('No tenant found. Seed tenant first.');
            return;
        }
        const tenantId = tenant.id;
        console.log(`Using tenant: ${tenant.name} (${tenantId})`);
        const vehicleTypeOptions = ['TRUCK', 'VAN', 'MOTORCYCLE', 'CAR'];
        const platePrefixes = ['B', 'D', 'L', 'F'];
        for (let i = 1; i <= 3; i++) {
            const plateNo = `${platePrefixes[i % 4]} ${1000 + i} ${String.fromCharCode(65 + i)}${String.fromCharCode(66 + i)}`;
            let vehicle = await prisma.fleetVehicle.findFirst({
                where: { plateNo, tenantId }
            });
            if (!vehicle) {
                vehicle = await prisma.fleetVehicle.create({
                    data: {
                        tenantId,
                        code: `VEH-${String(i).padStart(6, '0')}`,
                        plateNo,
                        vehicleType: vehicleTypeOptions[i % 4],
                        brand: 'Toyota',
                        model: i % 2 === 0 ? 'Dyna' : 'Hiace',
                        year: 2020 + i,
                        ownershipType: 'OWNED',
                        status: 'ACTIVE',
                        capacityWeight: 2000 + (i * 100),
                        capacityVolume: 10 + i,
                    }
                });
                console.log(`Created vehicle: ${vehicle.plateNo}`);
            }
            const maintenanceLogs = [
                {
                    maintenanceType: 'ROUTINE',
                    description: 'Ganti oli mesin dan filter udara berkala',
                    cost: 1500000,
                    lastServiceAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    nextServiceAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
                    status: 'COMPLETED',
                    kmInterval: 5000,
                },
                {
                    maintenanceType: 'TIRE',
                    description: 'Spooring & Balancing ban depan',
                    cost: 450000,
                    lastServiceAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                    status: 'COMPLETED',
                },
                {
                    maintenanceType: 'REPAIR',
                    description: 'Perbaikan Rem Belakang',
                    cost: 1200000,
                    nextServiceAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                    status: 'SCHEDULED',
                }
            ];
            for (const log of maintenanceLogs) {
                await prisma.vehicleMaintenance.create({
                    data: {
                        ...log,
                        tenantId,
                        vehicleId: vehicle.id,
                    }
                });
            }
            const documents = [
                {
                    documentType: 'STNK',
                    documentNumber: `STNK-00${i}-882`,
                    issueDate: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000),
                    expiryDate: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000),
                    status: 'ACTIVE',
                },
                {
                    documentType: 'KIR',
                    documentNumber: `KIR-XJ-${i}-91`,
                    issueDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
                    expiryDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                    status: 'EXPIRED',
                }
            ];
            for (const doc of documents) {
                await prisma.vehicleDocument.create({
                    data: {
                        ...doc,
                        tenantId,
                        vehicleId: vehicle.id,
                    }
                });
            }
        }
        console.log('Seed completed successfully');
    }
    catch (e) {
        console.error('Seed failed:', e);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=seed-fleet-maint.js.map