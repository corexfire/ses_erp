import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const tenant = await prisma.tenant.findFirst();
  if (!tenant) return;

  console.log('--- Seeding Manufacturing Costing ---');

  // 1. Find a Completed Work Order
  const wo = await prisma.workOrder.findFirst({
    where: { tenantId: tenant.id },
    include: { finishedGood: true }
  });

  if (!wo) {
    console.log('No Work Order found to seed costing. Please run WO seed first.');
    return;
  }

  // 2. Sample Cost Record for last month (March 2026)
  const cost = await prisma.productionCost.upsert({
    where: {
      tenantId_workOrderId_period: {
        tenantId: tenant.id,
        workOrderId: wo.id,
        period: '2026-03'
      }
    },
    update: {},
    create: {
      tenantId: tenant.id,
      workOrderId: wo.id,
      period: '2026-03',
      materialCost: 12500000,
      laborCost: 4500000,
      overheadCost: 2000000,
      totalCost: 19000000,
      standardCost: 18000000,
      actualCost: 19000000,
      materialVariance: 500000,
      laborVariance: 200000,
      overheadVariance: 300000,
      isFinalized: true,
      calculatedAt: new Date('2026-03-31T23:59:59'),
      details: {
        create: [
          {
            tenantId: tenant.id,
            costCategory: 'MATERIAL',
            name: 'Raw Material Consumption (Cocoa Powder, Sugar)',
            standardAmount: 12000000,
            actualAmount: 12500000,
            variance: 500000
          },
          {
            tenantId: tenant.id,
            costCategory: 'LABOR',
            name: 'Direct Labor - Mixing & Packaging',
            standardAmount: 4300000,
            actualAmount: 4500000,
            variance: 200000
          },
          {
            tenantId: tenant.id,
            costCategory: 'OVERHEAD_FIXED',
            name: 'Factory Rental Allocation',
            standardAmount: 1000000,
            actualAmount: 1000000,
            variance: 0
          },
          {
            tenantId: tenant.id,
            costCategory: 'OVERHEAD_VARIABLE',
            name: 'Electricity & Maintenance',
            standardAmount: 700000,
            actualAmount: 1000000,
            variance: 300000
          }
        ]
      }
    }
  });

  // 3. Current Month (In Progress / Calculated but not Finalized)
  const currentWo = await prisma.workOrder.findFirst({
     where: { tenantId: tenant.id, status: 'IN_PROGRESS' }
  }) || wo;

  await prisma.productionCost.upsert({
    where: {
        tenantId_workOrderId_period: {
          tenantId: tenant.id,
          workOrderId: currentWo.id,
          period: '2026-04'
        }
      },
      update: {},
      create: {
        tenantId: tenant.id,
        workOrderId: currentWo.id,
        period: '2026-04',
        materialCost: 5500000,
        laborCost: 1200000,
        overheadCost: 800000,
        totalCost: 7500000,
        standardCost: 7000000,
        actualCost: 7500000,
        isFinalized: false,
        calculatedAt: new Date()
      }
  });

  console.log('Seeded Costing: 1 Finalized (March) and 1 In-Progress (April) records.');
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
