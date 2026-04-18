"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generated_1 = require("./generated");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public';
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new generated_1.PrismaClient({ adapter });
async function main() {
    console.log('🏭 Seed: Manufacturing Work Orders...');
    const user = await prisma.user.findUnique({ where: { email: 'zubair.mi45@gmail.com' } });
    if (!user)
        throw new Error('User not found');
    const tenantId = user.tenantId;
    const boms = await prisma.billOfMaterials.findMany({
        where: { tenantId },
        include: { item: true, items: { include: { componentItem: true } } }
    });
    const warehouse = await prisma.warehouse.findFirst({ where: { tenantId } });
    const items = await prisma.item.findMany({ where: { tenantId } });
    const itemMap = Object.fromEntries(items.map(i => [i.code, i]));
    if (!warehouse)
        throw new Error('No warehouse found');
    console.log(`✅ Found ${boms.length} BOMs, warehouse: ${warehouse.name}`);
    const bomMap = Object.fromEntries(boms.map(b => [b.code, b]));
    const ksgaBom = bomMap['BOM-KSGA-1000'];
    const espBom = bomMap['BOM-ESP-10L'];
    const sgaBom = bomMap['BOM-SGA-5L'];
    const wo1StartDate = new Date();
    wo1StartDate.setMonth(wo1StartDate.getMonth() - 3);
    const wo1EndDate = new Date(wo1StartDate);
    wo1EndDate.setDate(wo1EndDate.getDate() + 3);
    const wo1 = await prisma.workOrder.upsert({
        where: { tenantId_code: { tenantId, code: 'WO-KSGA-2601' } },
        update: {},
        create: {
            tenantId, code: 'WO-KSGA-2601',
            bomId: ksgaBom?.id,
            finishedGoodItemId: ksgaBom?.itemId ?? items[0].id,
            warehouseId: warehouse.id,
            qtyPlanned: 1000, qtyProduced: 1000, qtyRejected: 15, qtyScrap: 5,
            uomCode: 'PCS',
            status: 'COMPLETED',
            priority: 80,
            workCenter: 'Line Produksi A',
            scheduleType: 'PLANNED',
            productionOrder: 'PO-JAN-001',
            plannedStartDate: wo1StartDate, plannedEndDate: wo1EndDate,
            actualStartDate: wo1StartDate, actualEndDate: wo1EndDate,
            notes: 'Batch produksi Kopi Susu Gula Aren Januari 2026 - selesai tepat waktu'
        }
    });
    if (ksgaBom?.items && ksgaBom.items.length > 0) {
        for (let i = 0; i < ksgaBom.items.length; i++) {
            const bi = ksgaBom.items[i];
            const existing = await prisma.workOrderComponent.findFirst({ where: { workOrderId: wo1.id, lineNo: i + 1 } });
            if (!existing) {
                await prisma.workOrderComponent.create({
                    data: {
                        tenantId, workOrderId: wo1.id,
                        lineNo: i + 1, itemId: bi.componentItemId,
                        qtyRequired: Number(bi.qty) * 1000,
                        qtyIssued: Number(bi.qty) * 1000,
                        uomCode: bi.uomCode ?? 'PCS',
                        issueMethod: 'BACKFLUSH',
                        operationNo: 10,
                    }
                });
            }
        }
    }
    const wo1Ops = [
        { lineNo: 1, operationNo: 10, description: 'Persiapan & Weighing Bahan Baku', workstation: 'Timbangan A', laborHours: 1.5, machineHours: 0, setupTime: 15, cycleTime: 60, status: 'COMPLETED', actualLaborHours: 1.5 },
        { lineNo: 2, operationNo: 20, description: 'Brewing Espresso', workstation: 'Mesin Espresso 1', laborHours: 2, machineHours: 2, setupTime: 20, cycleTime: 90, status: 'COMPLETED', actualLaborHours: 2.2 },
        { lineNo: 3, operationNo: 30, description: 'Mixing & Blending', workstation: 'Mixer Industrial A', laborHours: 1, machineHours: 1, setupTime: 10, cycleTime: 45, status: 'COMPLETED', actualLaborHours: 1 },
        { lineNo: 4, operationNo: 40, description: 'Filling & Sealing', workstation: 'Mesin Cup Sealer', laborHours: 3, machineHours: 3, setupTime: 30, cycleTime: 180, status: 'COMPLETED', actualLaborHours: 3.5 },
        { lineNo: 5, operationNo: 50, description: 'Quality Control & Packing', workstation: 'QC Station', laborHours: 1, machineHours: 0, setupTime: 5, cycleTime: 30, status: 'COMPLETED', actualLaborHours: 1 },
    ];
    for (const op of wo1Ops) {
        const existing = await prisma.workOrderOperation.findFirst({ where: { workOrderId: wo1.id, lineNo: op.lineNo } });
        if (!existing) {
            await prisma.workOrderOperation.create({
                data: { tenantId, workOrderId: wo1.id, ...op, startDate: wo1StartDate, endDate: wo1EndDate }
            });
        }
    }
    console.log(`✅ WO-KSGA-2601 (COMPLETED) created`);
    const wo2StartDate = new Date();
    wo2StartDate.setMonth(wo2StartDate.getMonth() - 1);
    const wo2EndDate = new Date(wo2StartDate);
    wo2EndDate.setDate(wo2EndDate.getDate() + 1);
    const wo2 = await prisma.workOrder.upsert({
        where: { tenantId_code: { tenantId, code: 'WO-SGA-2602' } },
        update: {},
        create: {
            tenantId, code: 'WO-SGA-2602',
            bomId: sgaBom?.id,
            finishedGoodItemId: sgaBom?.itemId ?? items[0].id,
            warehouseId: warehouse.id,
            qtyPlanned: 5, qtyProduced: 5, qtyRejected: 0, qtyScrap: 0,
            uomCode: 'LTR',
            status: 'COMPLETED',
            priority: 60,
            workCenter: 'Line Syrup',
            scheduleType: 'URGENT',
            productionOrder: 'PO-MAR-002',
            plannedStartDate: wo2StartDate, plannedEndDate: wo2EndDate,
            actualStartDate: wo2StartDate, actualEndDate: wo2EndDate,
            notes: 'Sub-assembly syrup gula aren untuk batch Maret'
        }
    });
    const wo2Ops = [
        { lineNo: 1, operationNo: 10, description: 'Pemasakan Gula Aren', workstation: 'Kompor Industrial', laborHours: 2, machineHours: 0, setupTime: 10, cycleTime: 90, status: 'COMPLETED', actualLaborHours: 2 },
        { lineNo: 2, operationNo: 20, description: 'Filtrasi & Pendinginan', workstation: 'Filter Tank', laborHours: 1, machineHours: 1, setupTime: 5, cycleTime: 60, status: 'COMPLETED', actualLaborHours: 1 },
    ];
    for (const op of wo2Ops) {
        const existing = await prisma.workOrderOperation.findFirst({ where: { workOrderId: wo2.id, lineNo: op.lineNo } });
        if (!existing) {
            await prisma.workOrderOperation.create({
                data: { tenantId, workOrderId: wo2.id, ...op, startDate: wo2StartDate, endDate: wo2EndDate }
            });
        }
    }
    console.log(`✅ WO-SGA-2602 (COMPLETED) created`);
    const wo3Start = new Date();
    wo3Start.setDate(wo3Start.getDate() - 2);
    const wo3End = new Date();
    wo3End.setDate(wo3End.getDate() + 1);
    const wo3 = await prisma.workOrder.upsert({
        where: { tenantId_code: { tenantId, code: 'WO-KSGA-2603' } },
        update: {},
        create: {
            tenantId, code: 'WO-KSGA-2603',
            bomId: ksgaBom?.id,
            finishedGoodItemId: ksgaBom?.itemId ?? items[0].id,
            warehouseId: warehouse.id,
            qtyPlanned: 2000, qtyProduced: 850, qtyRejected: 0, qtyScrap: 0,
            uomCode: 'PCS',
            status: 'IN_PROGRESS',
            priority: 90,
            workCenter: 'Line Produksi A',
            scheduleType: 'URGENT',
            productionOrder: 'PO-APR-003',
            plannedStartDate: wo3Start, plannedEndDate: wo3End,
            actualStartDate: wo3Start,
            notes: '⚠️ URGENT: Batch April — target 2000 cup, sudah progress 850 cup'
        }
    });
    if (ksgaBom?.items && ksgaBom.items.length > 0) {
        for (let i = 0; i < ksgaBom.items.length; i++) {
            const bi = ksgaBom.items[i];
            const existing = await prisma.workOrderComponent.findFirst({ where: { workOrderId: wo3.id, lineNo: i + 1 } });
            if (!existing) {
                await prisma.workOrderComponent.create({
                    data: {
                        tenantId, workOrderId: wo3.id,
                        lineNo: i + 1, itemId: bi.componentItemId,
                        qtyRequired: Number(bi.qty) * 2000,
                        qtyIssued: Number(bi.qty) * 850,
                        uomCode: bi.uomCode ?? 'PCS',
                        issueMethod: 'BACKFLUSH',
                        operationNo: 10,
                    }
                });
            }
        }
    }
    const wo3Ops = [
        { lineNo: 1, operationNo: 10, description: 'Persiapan & Weighing Bahan Baku', workstation: 'Timbangan A', laborHours: 1.5, machineHours: 0, setupTime: 15, cycleTime: 60, status: 'COMPLETED', actualLaborHours: 1.5 },
        { lineNo: 2, operationNo: 20, description: 'Brewing Espresso', workstation: 'Mesin Espresso 1', laborHours: 2, machineHours: 2, setupTime: 20, cycleTime: 90, status: 'IN_PROGRESS', actualLaborHours: 1 },
        { lineNo: 3, operationNo: 30, description: 'Mixing & Blending', workstation: 'Mixer Industrial A', laborHours: 1, machineHours: 1, setupTime: 10, cycleTime: 45, status: 'PENDING' },
        { lineNo: 4, operationNo: 40, description: 'Filling & Sealing', workstation: 'Mesin Cup Sealer', laborHours: 3, machineHours: 3, setupTime: 30, cycleTime: 180, status: 'PENDING' },
        { lineNo: 5, operationNo: 50, description: 'Quality Control & Packing', workstation: 'QC Station', laborHours: 1, machineHours: 0, setupTime: 5, cycleTime: 30, status: 'PENDING' },
    ];
    for (const op of wo3Ops) {
        const existing = await prisma.workOrderOperation.findFirst({ where: { workOrderId: wo3.id, lineNo: op.lineNo } });
        if (!existing) {
            await prisma.workOrderOperation.create({
                data: { tenantId, workOrderId: wo3.id, ...op, startDate: wo3Start }
            });
        }
    }
    console.log(`✅ WO-KSGA-2603 (IN_PROGRESS) created`);
    const wo4Start = new Date();
    wo4Start.setDate(wo4Start.getDate() + 1);
    const wo4End = new Date();
    wo4End.setDate(wo4End.getDate() + 2);
    const wo4 = await prisma.workOrder.upsert({
        where: { tenantId_code: { tenantId, code: 'WO-ESP-2604' } },
        update: {},
        create: {
            tenantId, code: 'WO-ESP-2604',
            bomId: espBom?.id,
            finishedGoodItemId: espBom?.itemId ?? items[0].id,
            warehouseId: warehouse.id,
            qtyPlanned: 20, qtyProduced: 0,
            uomCode: 'LTR',
            status: 'RELEASED',
            priority: 70,
            workCenter: 'Line Brewing',
            scheduleType: 'PLANNED',
            productionOrder: 'PO-APR-004',
            plannedStartDate: wo4Start, plannedEndDate: wo4End,
            actualStartDate: new Date(),
            notes: 'Sub-assembly espresso untuk mendukung WO-KSGA-2605'
        }
    });
    console.log(`✅ WO-ESP-2604 (RELEASED) created`);
    const wo5Start = new Date();
    wo5Start.setDate(wo5Start.getDate() + 7);
    const wo5End = new Date();
    wo5End.setDate(wo5End.getDate() + 10);
    const wo5 = await prisma.workOrder.upsert({
        where: { tenantId_code: { tenantId, code: 'WO-KSGA-2605' } },
        update: {},
        create: {
            tenantId, code: 'WO-KSGA-2605',
            bomId: ksgaBom?.id,
            finishedGoodItemId: ksgaBom?.itemId ?? items[0].id,
            warehouseId: warehouse.id,
            qtyPlanned: 3000, qtyProduced: 0,
            uomCode: 'PCS',
            status: 'DRAFT',
            priority: 60,
            workCenter: 'Line Produksi A',
            scheduleType: 'PLANNED',
            productionOrder: 'PO-APR-005',
            plannedStartDate: wo5Start, plannedEndDate: wo5End,
            notes: 'Rencana produksi akhir April - menunggu stock bahan baku'
        }
    });
    console.log(`✅ WO-KSGA-2605 (DRAFT) created`);
    const adminRoleId = 'cmnrxcg4v0001q50syyrif3ri';
    const woPerms = ['manufacturing.work_order.read', 'manufacturing.work_order.create', 'manufacturing.work_order.update', 'manufacturing.work_order.release', 'manufacturing.work_order.complete'];
    for (const key of woPerms) {
        let perm = await prisma.permission.findFirst({ where: { key } });
        if (!perm) {
            perm = await prisma.permission.create({ data: { key } });
        }
        await prisma.rolePermission.upsert({
            where: { roleId_permissionId: { roleId: adminRoleId, permissionId: perm.id } },
            update: {}, create: { roleId: adminRoleId, permissionId: perm.id }
        });
    }
    console.log('✅ Work Order permissions assigned to admin role');
    const totalWo = await prisma.workOrder.count({ where: { tenantId } });
    console.log(`\n✅ Seed complete! Total Work Orders: ${totalWo}`);
}
main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed-manufacturing-workorder.js.map