import { PrismaClient } from './generated/client';

export async function seedFiscal(prisma: PrismaClient, tenantId: string) {
  console.log('📅 Seeding Fiscal Years & Accounting Periods...');

  const endOfMonth = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

  const years = [
    {
      code: 'FY2024',
      name: 'Fiscal Year 2024',
      startDate: new Date('2024-01-01T00:00:00Z'),
      endDate: new Date('2024-12-31T23:59:59Z'),
      isClosed: true,
      isActive: false
    },
    {
      code: 'FY2025',
      name: 'Fiscal Year 2025',
      startDate: new Date('2025-01-01T00:00:00Z'),
      endDate: new Date('2025-12-31T23:59:59Z'),
      isClosed: false,
      isActive: true
    }
  ];

  for (const y of years) {
    const fiscalYear = await prisma.fiscalYear.upsert({
      where: { tenantId_code: { tenantId, code: y.code } },
      update: {
        name: y.name,
        startDate: y.startDate,
        endDate: y.endDate,
        isClosed: y.isClosed,
        isActive: y.isActive
      },
      create: {
        tenantId,
        ...y
      }
    });

    // Generate monthly periods
    const periods: any[] = [];
    let cursor = new Date(y.startDate);
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), 1, 0, 0, 0, 0);
    const end = new Date(y.endDate);
    let periodNo = 1;

    while (cursor <= end) {
      const pStart = new Date(cursor);
      const pEnd = endOfMonth(cursor);
      
      periods.push({
        tenantId,
        fiscalYearId: fiscalYear.id,
        periodNo,
        startDate: pStart,
        endDate: pEnd > end ? end : pEnd,
        isOpen: !y.isClosed // Closed years have closed periods
      });
      
      periodNo += 1;
      cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1, 0, 0, 0, 0);
    }

    // Bulk upsert periods (using createMany since it's a seed, but for re-run safety we check existence)
    for (const p of periods) {
      await prisma.accountingPeriod.upsert({
        where: {
          tenantId_fiscalYearId_periodNo: {
            tenantId,
            fiscalYearId: fiscalYear.id,
            periodNo: p.periodNo
          }
        },
        update: {
          startDate: p.startDate,
          endDate: p.endDate,
          isOpen: p.isOpen
        },
        create: p
      });
    }
  }

  console.log('✅ Fiscal Years and Periods seeded successfully.');
}
