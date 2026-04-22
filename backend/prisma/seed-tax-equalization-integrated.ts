import { PrismaClient } from './generated/client';

export async function seedTaxEqualizationIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated Tax Equalization (Revenue Recon) for FY 2026...');

  // 1. Identify Revenue Account
  const revenueAccount = await prisma.coaAccount.findUnique({
    where: { tenantId_code: { tenantId, code: '4-1100-00' } }
  });

  if (!revenueAccount) {
    console.warn('⚠️  Revenue account 4-1100-00 not found. Using zero baseline for book income.');
  }

  // 2. Loop through 2026 months
  const months = [
    '2026-01', '2026-02', '2026-03', '2026-04', 
    '2026-05', '2026-06', '2026-07', '2026-08', 
    '2026-09', '2026-10', '2026-11', '2026-12'
  ];

  for (const period of months) {
    const [year, month] = period.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // A. Aggregate Book Income (from Journal Entry Lines)
    const bookLines = await prisma.journalEntryLine.findMany({
      where: {
        tenantId,
        accountCode: '4-1100-00',
        journalEntry: {
          entryDate: { gte: startDate, lte: endDate },
          status: 'POSTED'
        }
      }
    });
    let bookIncome = bookLines.reduce((sum, line) => sum + Number(line.credit), 0);

    // B. Aggregate Fiscal Income (from Output Tax Invoices)
    const fiscalInvoices = await prisma.taxInvoice.findMany({
      where: {
        tenantId,
        invoiceType: 'OUTPUT',
        invoiceDate: { gte: startDate, lte: endDate },
        status: 'POSTED' // Only reconciliation for posted invoices
      }
    });
    let fiscalIncome = fiscalInvoices.reduce((sum, inv) => sum + Number(inv.baseAmount), 0);

    // C. Add Artificial Data if zero (for seeding visibility)
    // Most months should match exactly for a clean baseline
    if (bookIncome === 0 && fiscalIncome === 0) {
      // Seed some base values if nothing exists in transactional data yet
      bookIncome = 500000000 + (Math.random() * 100000000); // 500M baseline
      fiscalIncome = bookIncome; 
    }

    // D. Introduce Variance in June 2026 (as per plan)
    let description = 'Rekonsiliasi rutin bulanan';
    let difference = fiscalIncome - bookIncome;

    if (period === '2026-06') {
      const adjustment = 50000000; // 50M
      bookIncome += adjustment; // Add non-taxable grant to accounting books
      difference = fiscalIncome - bookIncome; // Now it's -50M
      description = 'Varians: Hibah Pemerintah (Pendapatan Bukan Objek Pajak)';
    }

    // E. Upsert Equalization Record
    await prisma.taxEqualization.upsert({
      where: {
        tenantId_period: { tenantId, period }
      },
      update: {
        bookIncome,
        fiscalIncome,
        difference,
        description,
        status: (month < 4) ? 'APPROVED' : 'DRAFT' // Q1 approved, rest draft
      },
      create: {
        tenantId,
        period,
        bookIncome,
        fiscalIncome,
        difference,
        description,
        status: (month < 4) ? 'APPROVED' : 'DRAFT'
      }
    });
  }

  console.log('✅ Integrated Tax Equalization Seeding Complete!');
}
