import { PrismaClient } from './generated';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seed: Starting Comprehensive Manufacturing BOM Data (ERP Besar)...');

  // Cari Tenant dari user Zubair
  const user = await prisma.user.findUnique({
    where: { email: 'zubair.mi45@gmail.com' },
  });
  if (!user) {
    console.warn('User zubair.mi45@gmail.com tidak ditemukan. Seed dibatalkan.');
    return;
  }
  const tenantId = user.tenantId;

  // Pastikan UOM ada
  const uoms = [
    { code: 'PCS', name: 'Pieces' },
    { code: 'LTR', name: 'Liters' },
    { code: 'KG', name: 'Kilograms' },
    { code: 'GR', name: 'Grams' },
  ];
  for (const u of uoms) {
    await prisma.uom.upsert({
      where: { tenantId_code: { tenantId, code: u.code } },
      update: {},
      create: { tenantId, code: u.code, name: u.name },
    });
  }

  // Buat Item Category
  const cat = await prisma.itemGroup.upsert({
    where: { tenantId_code: { tenantId, code: 'MFG-FB' } },
    update: {},
    create: { tenantId, code: 'MFG-FB', name: 'Manufacturing F&B' },
  });

  // Data Item yang akan dibuat
  const itemsData = [
    { code: 'FG-KSGA-1000', name: 'Kopi Susu Gula Aren Kemasan (Batch 1000 Pcs)', type: 'PRODUCT', uomCode: 'PCS' },
    { code: 'SA-ESP-10L', name: 'Base Espresso 10 Liters', type: 'SEMI_FINISHED', uomCode: 'LTR' },
    { code: 'SA-SGA-5L', name: 'Syrup Gula Aren 5 Liters', type: 'SEMI_FINISHED', uomCode: 'LTR' },
    { code: 'RM-CB-5KG', name: 'Coffee Beans Kintamani 5 Kg', type: 'MATERIAL', uomCode: 'KG' },
    { code: 'RM-MILK-1L', name: 'Fresh Milk 1 Liter', type: 'MATERIAL', uomCode: 'LTR' },
    { code: 'RM-AREN-1KG', name: 'Gula Aren Bubuk 1 Kg', type: 'MATERIAL', uomCode: 'KG' },
    { code: 'RM-CUP-1PCS', name: 'Plastic Cup & Lid 1 Pcs', type: 'MATERIAL', uomCode: 'PCS' },
  ];

  const itemsMap: Record<string, string> = {};

  for (const it of itemsData) {
    const item = await prisma.item.upsert({
      where: { tenantId_code: { tenantId, code: it.code } },
      update: {},
      create: {
        tenantId,
        code: it.code,
        name: it.name,
        baseUomCode: it.uomCode,
        itemGroupId: cat.id,
        isSalesItem: true,
        isPurchaseItem: true,
        isActive: true,
      },
    });
    itemsMap[it.code] = item.id;
  }

  console.log('Seed: Items verified.');

  // === 1. BOM untuk Base Espresso
  const bomEspresso = await prisma.billOfMaterials.upsert({
    where: { tenantId_code: { tenantId, code: 'BOM-ESP-10L' } },
    update: { bomType: 'MANUFACTURING', baseQty: 10, costingMethod: 'STANDARD' },
    create: {
      tenantId,
      code: 'BOM-ESP-10L',
      name: 'BOM Espresso 10 Liters',
      itemId: itemsMap['SA-ESP-10L'],
      isMain: true,
      bomType: 'MANUFACTURING',
      baseQty: 10,
      costingMethod: 'ACTUAL',
      items: {
        create: [
          { tenantId, lineNo: 1, componentItemId: itemsMap['RM-CB-5KG'], qty: 2.5, uomCode: 'KG', issueMethod: 'BACKFLUSH', operationNo: 10 },
        ],
      },
      operations: {
        create: [
          { tenantId, operationNo: 10, description: 'Grinding Coffee Beans', workstation: 'Grinder-01', setupTime: 10, cycleTime: 20 },
          { tenantId, operationNo: 20, description: 'Brewing Espresso', workstation: 'EspressoMachine-01', setupTime: 15, cycleTime: 60 },
        ]
      }
    },
  });

  // === 2. BOM untuk Syrup Gula Aren
  const bomSyrup = await prisma.billOfMaterials.upsert({
    where: { tenantId_code: { tenantId, code: 'BOM-SGA-5L' } },
    update: { bomType: 'MANUFACTURING', baseQty: 5, costingMethod: 'STANDARD' },
    create: {
      tenantId,
      code: 'BOM-SGA-5L',
      name: 'BOM Syrup Gula Aren 5 Liters',
      itemId: itemsMap['SA-SGA-5L'],
      isMain: true,
      bomType: 'MANUFACTURING',
      baseQty: 5,
      costingMethod: 'STANDARD',
      items: {
        create: [
          { tenantId, lineNo: 1, componentItemId: itemsMap['RM-AREN-1KG'], qty: 3, uomCode: 'KG', issueMethod: 'BACKFLUSH', operationNo: 10 },
        ]
      },
      operations: {
        create: [
          { tenantId, operationNo: 10, description: 'Mixing and Boiling Gula Aren', workstation: 'Boiler-01', setupTime: 10, cycleTime: 45 },
        ]
      }
    }
  });

  // === 3. MAIN BOM Kopi Susu Gula Aren
  const bomMain = await prisma.billOfMaterials.upsert({
    where: { tenantId_code: { tenantId, code: 'BOM-KSGA-1000' } },
    update: { bomType: 'MANUFACTURING', baseQty: 1000, costingMethod: 'STANDARD' },
    create: {
      tenantId,
      code: 'BOM-KSGA-1000',
      name: 'Kopi Susu Gula Aren 1000 Pcs',
      itemId: itemsMap['FG-KSGA-1000'],
      isMain: true,
      bomType: 'MANUFACTURING',
      baseQty: 1000,
      costingMethod: 'STANDARD',
      items: {
        create: [
          { tenantId, lineNo: 1, componentItemId: itemsMap['SA-ESP-10L'], qty: 30, uomCode: 'LTR', issueMethod: 'BACKFLUSH', operationNo: 10 },
          { tenantId, lineNo: 2, componentItemId: itemsMap['RM-MILK-1L'], qty: 150, uomCode: 'LTR', issueMethod: 'BACKFLUSH', operationNo: 10 },
          { tenantId, lineNo: 3, componentItemId: itemsMap['SA-SGA-5L'], qty: 20, uomCode: 'LTR', issueMethod: 'BACKFLUSH', operationNo: 10 },
          { tenantId, lineNo: 4, componentItemId: itemsMap['RM-CUP-1PCS'], qty: 1020, uomCode: 'PCS', issueMethod: 'MANUAL', scrapPercent: 2.0, operationNo: 20 },
        ]
      },
      operations: {
        create: [
          { tenantId, operationNo: 10, description: 'Mixing Liquid Ingredients', workstation: 'MixerVat-01', setupTime: 30, cycleTime: 120, laborScrap: 1.0 },
          { tenantId, operationNo: 20, description: 'Filling and Sealing', workstation: 'FillingLine-02', setupTime: 45, cycleTime: 240, laborScrap: 0.5 },
          { tenantId, operationNo: 30, description: 'Packaging / Labeling', workstation: 'Packing-01', setupTime: 15, cycleTime: 60 }
        ]
      }
    }
  });

  console.log('Seed: Bill of Materials seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
