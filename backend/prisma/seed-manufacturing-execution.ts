import { PrismaClient } from './generated';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🏭 Seed: Manufacturing Execution (Issues, Receipts, QC)...');
  const user = await prisma.user.findUnique({ where: { email: 'zubair.mi45@gmail.com' } });
  if (!user) throw new Error('User not found');
  const tenantId = user.tenantId;

  // Load existing WOs
  const workOrders = await prisma.workOrder.findMany({ where: { tenantId }, include: { components: true, finishedGood: true } });
  const woMap = Object.fromEntries(workOrders.map(wo => [wo.code, wo]));
  const warehouse = await prisma.warehouse.findFirst({ where: { tenantId } });
  if (!warehouse) throw new Error('No warehouse found');

  const wo2601 = woMap['WO-KSGA-2601']; // COMPLETED
  const wo2602 = woMap['WO-SGA-2602'];  // COMPLETED
  const wo2603 = woMap['WO-KSGA-2603']; // IN_PROGRESS

  console.log(`✅ Found ${workOrders.length} work orders, warehouse: ${warehouse.name}`);

  // Grant permissions
  const adminRoleId = 'cmnrxcg4v0001q50syyrif3ri';
  const execPerms = [
    'manufacturing.production_issue.read', 'manufacturing.production_issue.create',
    'manufacturing.production_receipt.read', 'manufacturing.production_receipt.create',
    'manufacturing.qc.read', 'manufacturing.qc.create', 'manufacturing.qc.update',
  ];
  for (const key of execPerms) {
    let perm = await prisma.permission.findFirst({ where: { key } });
    if (!perm) { perm = await prisma.permission.create({ data: { key } }); }
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRoleId, permissionId: perm.id } },
      update: {}, create: { roleId: adminRoleId, permissionId: perm.id }
    });
  }
  console.log('✅ Execution permissions assigned');

  // ======================================================================
  // PRODUCTION ISSUES — WO-KSGA-2601 (COMPLETED, 3 months ago)
  // ======================================================================
  if (wo2601) {
    const issueDate1 = new Date(wo2601.actualStartDate ?? Date.now());

    const issue1 = await prisma.productionIssue.upsert({
      where: { tenantId_code: { tenantId, code: 'PI-2601-001' } },
      update: {},
      create: {
        tenantId, code: 'PI-2601-001',
        workOrderId: wo2601.id,
        issueDate: issueDate1,
        status: 'POSTED',
        notes: 'Issue Batch 1 - Kopi Susu Gula Aren 1000 PCS',
        issuedBy: 'zubair.mi45@gmail.com',
        warehouseId: warehouse.id,
        purpose: 'PRODUCTION',
        shiftNo: 1,
      } as any
    });

    // Issue items from WO components
    const issueItems = wo2601.components.slice(0, 4);
    for (let i = 0; i < issueItems.length; i++) {
      const comp = issueItems[i];
      const existing = await prisma.productionIssueItem.findFirst({ where: { issueId: issue1.id, lineNo: i + 1 } });
      if (!existing) {
        await prisma.productionIssueItem.create({
          data: {
            tenantId, issueId: issue1.id,
            lineNo: i + 1, itemId: comp.itemId,
            qty: Number(comp.qtyIssued) > 0 ? comp.qtyIssued : comp.qtyRequired,
            uomCode: comp.uomCode ?? 'PCS',
            qtyRequired: comp.qtyRequired,
            costPrice: 5000,
          } as any
        });
      }
    }
    console.log(`✅ ProductionIssue PI-2601-001 created`);

    // PRODUCTION RECEIPT — WO-KSGA-2601
    const receiptDate1 = new Date(wo2601.actualEndDate ?? Date.now());
    await prisma.productionReceipt.upsert({
      where: { tenantId_code: { tenantId, code: 'PR-2601-001' } },
      update: {},
      create: {
        tenantId, code: 'PR-2601-001',
        workOrderId: wo2601.id,
        receiptDate: receiptDate1,
        qtyProduced: 1000, qtyRejected: 15, qtyScrap: 5,
        uomCode: 'PCS',
        status: 'POSTED',
        notes: 'Receipt 1000 PCS Kopi Susu Gula Aren - QC passed',
        receivedBy: 'zubair.mi45@gmail.com',
        warehouseId: warehouse.id,
        shiftNo: 1,
        batchNo: 'BATCH-KSGA-2601-01',
      } as any
    });
    console.log(`✅ ProductionReceipt PR-2601-001 created`);

    // IN-PROCESS QC — WO-KSGA-2601
    await prisma.inProcessQc.upsert({
      where: { id: 'seed-qc-2601' },
      update: {},
      create: {
        id: 'seed-qc-2601',
        tenantId, workOrderId: wo2601.id,
        status: 'PASSED',
        qtyInspected: 1000, qtyPassed: 985, qtyFailed: 15,
        inspectedBy: 'QC-Team',
        qcDate: receiptDate1,
        disposition: 'ACCEPTED',
        notes: '985 PCS lolos QC, 15 PCS reject karena seal bocor',
      } as any
    });
    console.log(`✅ InProcessQC for WO-KSGA-2601 created`);
  }

  // ======================================================================
  // PRODUCTION ISSUES — WO-SGA-2602 (COMPLETED)
  // ======================================================================
  if (wo2602) {
    const issueDate2 = new Date(wo2602.actualStartDate ?? Date.now());

    const issue2 = await prisma.productionIssue.upsert({
      where: { tenantId_code: { tenantId, code: 'PI-2602-001' } },
      update: {},
      create: {
        tenantId, code: 'PI-2602-001',
        workOrderId: wo2602.id,
        issueDate: issueDate2,
        status: 'POSTED',
        notes: 'Issue bahan syrup gula aren 5L',
        issuedBy: 'zubair.mi45@gmail.com',
        warehouseId: warehouse.id,
        purpose: 'PRODUCTION',
        shiftNo: 1,
      } as any
    });

    for (let i = 0; i < wo2602.components.length; i++) {
      const comp = wo2602.components[i];
      const existing = await prisma.productionIssueItem.findFirst({ where: { issueId: issue2.id, lineNo: i + 1 } });
      if (!existing) {
        await prisma.productionIssueItem.create({
          data: {
            tenantId, issueId: issue2.id,
            lineNo: i + 1, itemId: comp.itemId,
            qty: comp.qtyRequired,
            uomCode: comp.uomCode ?? 'KG',
            qtyRequired: comp.qtyRequired,
          } as any
        });
      }
    }
    console.log(`✅ ProductionIssue PI-2602-001 created`);

    const receiptDate2 = new Date(wo2602.actualEndDate ?? Date.now());
    await prisma.productionReceipt.upsert({
      where: { tenantId_code: { tenantId, code: 'PR-2602-001' } },
      update: {},
      create: {
        tenantId, code: 'PR-2602-001',
        workOrderId: wo2602.id,
        receiptDate: receiptDate2,
        qtyProduced: 5, qtyRejected: 0, qtyScrap: 0,
        uomCode: 'LTR',
        status: 'POSTED',
        notes: 'Receipt 5L Syrup Gula Aren - batch March',
        receivedBy: 'Warehouse-Team',
        warehouseId: warehouse.id,
        shiftNo: 1,
        batchNo: 'BATCH-SGA-2602-01',
      } as any
    });
    console.log(`✅ ProductionReceipt PR-2602-001 created`);
  }

  // ======================================================================
  // PRODUCTION ISSUES — WO-KSGA-2603 (IN_PROGRESS, partial)
  // ======================================================================
  if (wo2603) {
    const issueDate3 = new Date(wo2603.actualStartDate ?? Date.now());

    const issue3a = await prisma.productionIssue.upsert({
      where: { tenantId_code: { tenantId, code: 'PI-2603-001' } },
      update: {},
      create: {
        tenantId, code: 'PI-2603-001',
        workOrderId: wo2603.id,
        issueDate: issueDate3,
        status: 'POSTED',
        notes: 'Issue Shift 1 - Batch Pertama (850 PCS)',
        issuedBy: 'zubair.mi45@gmail.com',
        warehouseId: warehouse.id,
        purpose: 'PRODUCTION',
        shiftNo: 1,
      } as any
    });

    for (let i = 0; i < wo2603.components.length && i < 3; i++) {
      const comp = wo2603.components[i];
      const existing = await prisma.productionIssueItem.findFirst({ where: { issueId: issue3a.id, lineNo: i + 1 } });
      if (!existing) {
        await prisma.productionIssueItem.create({
          data: {
            tenantId, issueId: issue3a.id,
            lineNo: i + 1, itemId: comp.itemId,
            qty: comp.qtyIssued,
            uomCode: comp.uomCode ?? 'PCS',
            qtyRequired: comp.qtyRequired,
          } as any
        });
      }
    }
    console.log(`✅ ProductionIssue PI-2603-001 (partial) created`);

    // Partial receipt for in-progress WO
    await prisma.productionReceipt.upsert({
      where: { tenantId_code: { tenantId, code: 'PR-2603-001' } },
      update: {},
      create: {
        tenantId, code: 'PR-2603-001',
        workOrderId: wo2603.id,
        receiptDate: new Date(),
        qtyProduced: 850, qtyRejected: 0, qtyScrap: 0,
        uomCode: 'PCS',
        status: 'POSTED',
        notes: 'Partial receipt 850 PCS - produksi berlanjut',
        receivedBy: 'Production-Team',
        warehouseId: warehouse.id,
        shiftNo: 1,
        batchNo: 'BATCH-KSGA-2603-01',
      } as any
    });
    console.log(`✅ ProductionReceipt PR-2603-001 (partial) created`);

    // In-Process QC for current WO
    await prisma.inProcessQc.upsert({
      where: { id: 'seed-qc-2603' },
      update: {},
      create: {
        id: 'seed-qc-2603',
        tenantId, workOrderId: wo2603.id,
        status: 'IN_PROGRESS',
        qtyInspected: 850, qtyPassed: 850, qtyFailed: 0,
        inspectedBy: 'QC-Tim',
        qcDate: new Date(),
        disposition: 'PENDING',
        notes: 'QC batch pertama 850 PCS — sedang berjalan',
      } as any
    });
    console.log(`✅ InProcessQC for WO-KSGA-2603 created`);
  }

  // Summary
  const totalIssues = await prisma.productionIssue.count({ where: { tenantId } });
  const totalReceipts = await prisma.productionReceipt.count({ where: { tenantId } });
  const totalQc = await prisma.inProcessQc.count({ where: { tenantId } });

  console.log(`\n✅ Seed completed!`);
  console.log(`   Production Issues:   ${totalIssues}`);
  console.log(`   Production Receipts: ${totalReceipts}`);
  console.log(`   In-Process QC:       ${totalQc}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
