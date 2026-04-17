import { PrismaClient } from './generated';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🏭 Seed: Starting Manufacturing Planning (MRP) Data...');

  // Find tenant
  const user = await prisma.user.findUnique({ where: { email: 'zubair.mi45@gmail.com' } });
  if (!user) throw new Error('User not found');
  const tenantId = user.tenantId;
  console.log(`✅ Tenant: ${tenantId}`);

  // Find BOMs that already exist
  const boms = await prisma.billOfMaterials.findMany({
    where: { tenantId },
    include: { item: true, items: { include: { componentItem: true } } }
  });
  console.log(`✅ Found ${boms.length} BOMs`);

  // Find items
  const items = await prisma.item.findMany({ where: { tenantId } });
  const itemMap = Object.fromEntries(items.map(i => [i.code, i]));
  console.log(`✅ Found ${items.length} items`);

  // Create stock ledger entries (for realistic MRP - some items need replenishment)
  const warehouse = await prisma.warehouse.findFirst({ where: { tenantId } });
  if (warehouse) {
    const stockData = [
      { itemCode: 'RM-CB-5KG', qtyIn: 50, qtyOut: 35 },     // 15 KG on hand
      { itemCode: 'RM-MILK-1L', qtyIn: 200, qtyOut: 180 },   // 20 LTR on hand
      { itemCode: 'RM-AREN-1KG', qtyIn: 30, qtyOut: 28 },    // 2 KG on hand (LOW!)
      { itemCode: 'RM-CUP-1PCS', qtyIn: 2000, qtyOut: 800 }, // 1200 PCS on hand
    ];

    for (const s of stockData) {
      const item = itemMap[s.itemCode];
      if (!item) continue;

      const existing = await prisma.stockLedger.findFirst({
        where: { tenantId, refType: 'SEED', refId: `seed-stock-${item.code}` }
      });
      if (!existing) {
        await prisma.stockLedger.create({
          data: {
            tenantId,
            itemId: item.id,
            warehouseId: warehouse.id,
            moveType: 'MANUAL_ADJUST',
            refType: 'SEED',
            refId: `seed-stock-${item.code}`,
            qtyIn: s.qtyIn,
            qtyOut: s.qtyOut,
            postingDate: new Date(),
            description: `Opening stock for ${item.code}`,
          }
        });
      }
      console.log(`  📦 Stock: ${s.itemCode} => ${s.qtyIn - s.qtyOut} on hand`);
    }
  }

  // ============================================================
  // MRP RUN 1: Regular Monthly Plan - 3 months ago
  // ============================================================
  const run1Date = new Date();
  run1Date.setMonth(run1Date.getMonth() - 3);

  const run1 = await prisma.mrpRun.upsert({
    where: { id: 'seed-mrp-run-001' } as any,
    update: {},
    create: {
      id: 'seed-mrp-run-001',
      tenantId,
      runDate: run1Date,
      status: 'COMPLETED',
      demandSource: 'SALES_ORDER',
      notes: 'MRP Run Bulan Januari - Perencanaan Kebutuhan Material Rutin',
      planType: 'STANDARD',
      planningHorizonDays: 90,
      periodStart: new Date(run1Date.getFullYear(), run1Date.getMonth(), 1),
      periodEnd: new Date(run1Date.getFullYear(), run1Date.getMonth() + 3, 0),
      includeSalesOrder: true,
      includeForecast: false,
      includeMinStock: true,
    } as any
  });

  // Suggestions for Run 1
  const suggestions1 = [
    {
      itemCode: 'RM-CB-5KG',
      suggestionType: 'PURCHASE',
      qtyRequired: 150,
      qtyOnHand: 10,
      qtyOnOrder: 0,
      qtySuggested: 140,
      priority: 80,
      unitCost: 85000,
      leadTimeDays: 7,
      status: 'CONVERTED',
      workCenter: 'Gudang Bahan Baku',
      uomCode: 'KG',
      notes: 'Stok kritis, perlu segera dipesan untuk produksi batch Januari',
    },
    {
      itemCode: 'RM-MILK-1L',
      suggestionType: 'PURCHASE',
      qtyRequired: 500,
      qtyOnHand: 45,
      qtyOnOrder: 100,
      qtySuggested: 355,
      priority: 70,
      unitCost: 18000,
      leadTimeDays: 3,
      status: 'CONVERTED',
      workCenter: 'Gudang Bahan Baku',
      uomCode: 'LTR',
      notes: 'Ada PO on-order 100 LTR, perlu tambahan untuk cover demand',
    },
    {
      itemCode: 'RM-AREN-1KG',
      suggestionType: 'PURCHASE',
      qtyRequired: 75,
      qtyOnHand: 5,
      qtyOnOrder: 0,
      qtySuggested: 70,
      priority: 90,
      unitCost: 45000,
      leadTimeDays: 5,
      status: 'CONVERTED',
      workCenter: 'Gudang Bahan Baku',
      uomCode: 'KG',
      notes: 'CRITICAL: Gula Aren hampir habis, prioritas tertinggi',
    },
    {
      itemCode: 'RM-CUP-1PCS',
      suggestionType: 'PURCHASE',
      qtyRequired: 3000,
      qtyOnHand: 800,
      qtyOnOrder: 500,
      qtySuggested: 1700,
      priority: 40,
      unitCost: 1200,
      leadTimeDays: 14,
      status: 'CLOSED',
      workCenter: 'Gudang Kemasan',
      uomCode: 'PCS',
      notes: 'Lead time panjang, order jauh-jauh hari',
    },
  ];

  for (const s of suggestions1) {
    const item = itemMap[s.itemCode];
    if (!item) continue;
    await prisma.mrpSuggestion.upsert({
      where: { id: `seed-sug-1-${s.itemCode}` } as any,
      update: {},
      create: {
        id: `seed-sug-1-${s.itemCode}`,
        tenantId,
        mrpRunId: run1.id,
        itemId: item.id,
        suggestionType: s.suggestionType,
        qtyRequired: s.qtyRequired,
        qtyOnHand: s.qtyOnHand,
        qtyOnOrder: s.qtyOnOrder,
        qtySuggested: s.qtySuggested,
        status: s.status,
        priority: s.priority,
        unitCost: s.unitCost,
        totalCost: s.qtySuggested * s.unitCost,
        leadTimeDays: s.leadTimeDays,
        workCenter: s.workCenter,
        uomCode: s.uomCode,
        notes: s.notes,
        dueDate: new Date(run1Date.getTime() + (s.leadTimeDays * 24 * 60 * 60 * 1000)),
        suggestedDate: new Date(run1Date.getTime() + ((s.leadTimeDays - 1) * 24 * 60 * 60 * 1000)),
      } as any
    });
  }
  console.log(`✅ Run 1 (Jan) created with ${suggestions1.length} suggestions`);

  // ============================================================
  // MRP RUN 2: Last Month - Partially Converted
  // ============================================================
  const run2Date = new Date();
  run2Date.setMonth(run2Date.getMonth() - 1);

  const run2 = await prisma.mrpRun.upsert({
    where: { id: 'seed-mrp-run-002' } as any,
    update: {},
    create: {
      id: 'seed-mrp-run-002',
      tenantId,
      runDate: run2Date,
      status: 'COMPLETED',
      demandSource: 'FORECAST',
      notes: 'MRP Run Maret - Forecast-Based Planning untuk Q2',
      planType: 'REGENERATIVE',
      planningHorizonDays: 60,
      periodStart: new Date(run2Date.getFullYear(), run2Date.getMonth(), 1),
      periodEnd: new Date(run2Date.getFullYear(), run2Date.getMonth() + 2, 0),
      includeSalesOrder: true,
      includeForecast: true,
      includeMinStock: true,
    } as any
  });

  const suggestions2 = [
    {
      itemCode: 'RM-CB-5KG',
      suggestionType: 'PURCHASE',
      qtyRequired: 200,
      qtyOnHand: 15,
      qtyOnOrder: 50,
      qtySuggested: 135,
      priority: 85,
      unitCost: 87000,
      leadTimeDays: 7,
      status: 'OPEN',
      workCenter: 'Gudang Bahan Baku',
      uomCode: 'KG',
      notes: 'Forecast menunjukkan peningkatan demand Q2 — tambah stok buffer',
    },
    {
      itemCode: 'RM-MILK-1L',
      suggestionType: 'PURCHASE',
      qtyRequired: 600,
      qtyOnHand: 20,
      qtyOnOrder: 0,
      qtySuggested: 580,
      priority: 75,
      unitCost: 18500,
      leadTimeDays: 3,
      status: 'OPEN',
      workCenter: 'Gudang Bahan Baku',
      uomCode: 'LTR',
      notes: 'Kapasitas produksi meningkat 20% di Q2',
    },
    {
      itemCode: 'RM-AREN-1KG',
      suggestionType: 'PURCHASE',
      qtyRequired: 100,
      qtyOnHand: 2,
      qtyOnOrder: 0,
      qtySuggested: 98,
      priority: 95,
      unitCost: 47000,
      leadTimeDays: 5,
      status: 'OPEN',
      workCenter: 'Gudang Bahan Baku',
      uomCode: 'KG',
      notes: '⚠️ CRITICAL: Stok tinggal 2 KG — segera beli!',
    },
    {
      itemCode: 'FG-KSGA-1000',
      suggestionType: 'MANUFACTURE',
      qtyRequired: 5000,
      qtyOnHand: 0,
      qtyOnOrder: 0,
      qtySuggested: 5000,
      priority: 60,
      unitCost: 0,
      leadTimeDays: 3,
      status: 'OPEN',
      workCenter: 'Line Produksi A',
      uomCode: 'PCS',
      notes: 'Buat WO untuk Kopi Susu Gula Aren — target delivery akhir bulan',
    },
    {
      itemCode: 'SA-ESP-10L',
      suggestionType: 'MANUFACTURE',
      qtyRequired: 30,
      qtyOnHand: 0,
      qtyOnOrder: 0,
      qtySuggested: 30,
      priority: 55,
      unitCost: 0,
      leadTimeDays: 1,
      status: 'OPEN',
      workCenter: 'Line Brewing',
      uomCode: 'LTR',
      notes: 'Sub-assembly espresso untuk Kopi Susu Gula Aren batch Q2',
    },
    {
      itemCode: 'SA-SGA-5L',
      suggestionType: 'MANUFACTURE',
      qtyRequired: 15,
      qtyOnHand: 0,
      qtyOnOrder: 0,
      qtySuggested: 15,
      priority: 55,
      unitCost: 0,
      leadTimeDays: 1,
      status: 'OPEN',
      workCenter: 'Line Syrup',
      uomCode: 'LTR',
      notes: 'Sub-assembly syrup gula aren',
    },
  ];

  for (const s of suggestions2) {
    const item = itemMap[s.itemCode];
    if (!item) continue;
    await prisma.mrpSuggestion.upsert({
      where: { id: `seed-sug-2-${s.itemCode}` } as any,
      update: {},
      create: {
        id: `seed-sug-2-${s.itemCode}`,
        tenantId,
        mrpRunId: run2.id,
        itemId: item.id,
        suggestionType: s.suggestionType,
        qtyRequired: s.qtyRequired,
        qtyOnHand: s.qtyOnHand,
        qtyOnOrder: s.qtyOnOrder,
        qtySuggested: s.qtySuggested,
        status: s.status,
        priority: s.priority,
        unitCost: s.unitCost,
        totalCost: s.qtySuggested * s.unitCost,
        leadTimeDays: s.leadTimeDays,
        workCenter: s.workCenter,
        uomCode: s.uomCode,
        notes: s.notes,
        dueDate: new Date(Date.now() + (s.leadTimeDays * 24 * 60 * 60 * 1000)),
        suggestedDate: new Date(Date.now() + ((s.leadTimeDays - 1) * 24 * 60 * 60 * 1000)),
      } as any
    });
  }
  console.log(`✅ Run 2 (Mar) created with ${suggestions2.length} suggestions`);

  // Final counts
  const totalRuns = await prisma.mrpRun.count({ where: { tenantId } });
  const totalSuggestions = await prisma.mrpSuggestion.count({ where: { tenantId } });

  console.log(`\n✅ Seed completed!`);
  console.log(`   MRP Runs: ${totalRuns}`);
  console.log(`   MRP Suggestions: ${totalSuggestions}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
