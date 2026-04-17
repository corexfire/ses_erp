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
    const tenant = await prisma.tenant.findFirst();
    if (!tenant)
        return;
    console.log('--- Seeding Maintenance Module ---');
    const warehouse = await prisma.warehouse.upsert({
        where: { tenantId_code: { tenantId: tenant.id, code: 'WH-MAIN' } },
        update: {},
        create: {
            tenantId: tenant.id,
            code: 'WH-MAIN',
            name: 'Main Factory Warehouse',
        }
    });
    const group = await prisma.itemGroup.upsert({
        where: { tenantId_code: { tenantId: tenant.id, code: 'SPARE-PARTS' } },
        update: {},
        create: { tenantId: tenant.id, code: 'SPARE-PARTS', name: 'Spare Parts' }
    });
    const spareParts = [
        { code: 'SP-FILT-01', name: 'Industrial Oil Filter', cost: 150000 },
        { code: 'SP-BELT-V2', name: 'Conveyor Drive Belt V2', cost: 450000 },
        { code: 'SP-VALV-PNEU', name: 'Pneumatic Control Valve', cost: 1250000 },
        { code: 'SP-LUBE-G1', name: 'High-Temp Grease G1', cost: 85000 },
    ];
    const partItems = [];
    for (const p of spareParts) {
        const item = await prisma.item.upsert({
            where: { tenantId_code: { tenantId: tenant.id, code: p.code } },
            update: {},
            create: {
                tenantId: tenant.id,
                itemGroupId: group.id,
                code: p.code,
                name: p.name,
                baseUomCode: 'PCS',
                isPurchaseItem: true,
                isSalesItem: false,
            }
        });
        await prisma.stockLedger.create({
            data: {
                tenantId: tenant.id,
                itemId: item.id,
                moveType: 'MANUAL_ADJUST',
                refType: 'INITIAL_SEED',
                refId: 'SEED_001',
                postingDate: new Date(),
                description: 'Initial seed stock',
                qtyIn: 100,
                qtyOut: 0,
                warehouseId: warehouse.id,
                unitCost: p.cost,
            }
        });
        partItems.push(item);
    }
    const machines = [
        { code: 'EQP-BREW-01', name: 'Industrial Brewing System Stage A', type: 'PROCESSING', serial: 'SN-BREW-2501-001', mfr: 'TetraPak', model: 'TP-A2000', crit: 'HIGH', loc: 'Area 1 - Production Line 1' },
        { code: 'EQP-FILL-02', name: 'High-Speed Bottle Filling Machine', type: 'PACKAGING', serial: 'SN-FILL-2409-112', mfr: 'Krones', model: 'K-ModFill-X', crit: 'CRITICAL', loc: 'Area 2 - Bottling' },
        { code: 'EQP-BOIL-01', name: 'Main Steam Boiler 50TPH', type: 'UTILITY', serial: 'SN-BOIL-2200-99', mfr: 'Bosch', model: 'UniConcept', crit: 'HIGH', loc: 'Boiler Room House A' }
    ];
    const equipmentBatch = [];
    for (const m of machines) {
        const eq = await prisma.equipment.upsert({
            where: { tenantId_code: { tenantId: tenant.id, code: m.code } },
            update: {},
            create: {
                tenantId: tenant.id,
                code: m.code,
                name: m.name,
                type: m.type,
                serialNumber: m.serial,
                manufacturer: m.mfr,
                model: m.model,
                criticality: m.crit,
                location: m.loc,
                installedDate: new Date('2025-01-10'),
                purchaseDate: new Date('2024-12-01'),
                warrantyExpiryDate: new Date('2026-12-01'),
                status: 'OPERATIONAL'
            }
        });
        equipmentBatch.push(eq);
    }
    for (const eq of equipmentBatch) {
        await prisma.maintenanceSchedule.create({
            data: {
                tenantId: tenant.id,
                equipmentId: eq.id,
                name: `Monthly Preventive - ${eq.name}`,
                frequency: 'MONTHLY',
                intervalDays: 30,
                nextDate: new Date('2026-05-01'),
                maintenanceTasks: {
                    create: [
                        { tenantId: tenant.id, description: 'Check lubrication points and top up oil' },
                        { tenantId: tenant.id, description: 'Inspect drive belts for wear and tension' },
                        { tenantId: tenant.id, description: 'Test safety emergency stop switches' },
                    ]
                }
            }
        });
    }
    await prisma.maintenanceRequest.create({
        data: {
            tenantId: tenant.id,
            code: 'REQ-260415-001',
            equipmentId: equipmentBatch[1].id,
            requestDate: new Date('2026-04-14T08:00:00'),
            problem: 'Sudden pressure drop in pneumatic lines during filling cycle.',
            priority: 'HIGH',
            status: 'OPEN',
            notes: 'Filling speed reduced to 50% capacity.'
        }
    });
    await prisma.maintenanceLog.create({
        data: {
            tenantId: tenant.id,
            equipmentId: equipmentBatch[2].id,
            logDate: new Date('2026-04-01T10:00:00'),
            technicianName: 'Budi Santoso',
            workType: 'PREVENTIVE',
            durationMin: 120,
            description: 'Scheduled boiler scale inspection and burner cleaning.',
            laborCost: 500000,
            partsCost: 85000,
            totalCost: 585000,
            status: 'COMPLETED',
            parts: {
                create: [
                    {
                        tenantId: tenant.id,
                        itemId: partItems[3].id,
                        qtyUsed: 1,
                        unitCost: 85000,
                        totalCost: 85000
                    }
                ]
            }
        }
    });
    console.log('Seeded Maintenance: 1 Warehouse, 4 Spare Parts, 3 Machines, 3 Schedules, 1 Request, 1 Log.');
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
//# sourceMappingURL=seed-manufacturing-maintenance.js.map