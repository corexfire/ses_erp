import { PrismaClient } from './generated/client';

export async function seedTaxIdBillingIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated ID Billing (Tax Payments) for FY 2026...');

  // 1. Ensure Dependencies Exist (Accounts)
  const bankAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '1-1110-00' } } }); // Bank Mandiri
  const pph21Account = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1320-00' } } });
  const pph23Account = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1330-00' } } });
  const ppnPayableAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1300-00' } } });

  // 2. Scenarios
  const scenarios = [
    {
      billingNo: 'IDB-2026-04-21-001',
      taxType: 'PPh 21 (Masa April 2026)',
      period: '2026-04',
      amount: 1650000, // Consolidated from PPh 21 seed
      status: 'PAID',
      paidDate: new Date('2026-04-30'),
      dueDate: new Date('2026-05-10'),
      settleAccount: pph21Account
    },
    {
      billingNo: 'IDB-2026-04-23-002',
      taxType: 'PPh 23 (Masa April 2026)',
      period: '2026-04',
      amount: 700000, // Consolidated from e-Bupot seed
      status: 'PENDING',
      paidDate: null,
      dueDate: new Date('2026-05-10'),
      settleAccount: pph23Account
    },
    {
      billingNo: 'IDB-2026-04-PPN-003',
      taxType: 'PPN Masa (April 2026)',
      period: '2026-04',
      amount: 150000000, // From PPN Masa seed (KB)
      status: 'PENDING',
      paidDate: null,
      dueDate: new Date('2026-05-15'),
      settleAccount: ppnPayableAccount
    }
  ];

  for (const s of scenarios) {
    // A. Create ID Billing record
    await prisma.idBilling.upsert({
      where: { tenantId_billingNo: { tenantId, billingNo: s.billingNo } },
      update: {},
      create: {
        tenantId,
        billingNo: s.billingNo,
        taxType: s.taxType,
        period: s.period,
        amount: s.amount,
        dueDate: s.dueDate,
        status: s.status,
        paidDate: s.paidDate
      }
    });

    // B. If PAID, create Tax Settlement Journal
    if (s.status === 'PAID' && s.paidDate && s.settleAccount && bankAccount) {
      const entryNo = `JE-TAX-PAY-${s.billingNo}`;
      await prisma.journalEntry.upsert({
        where: { tenantId_entryNo: { tenantId, entryNo } },
        update: {},
        create: {
          tenantId,
          entryNo,
          entryDate: s.paidDate,
          description: `Pembayaran Pajak: ${s.taxType} - ${s.billingNo}`,
          status: 'POSTED',
          totalDebit: s.amount,
          totalCredit: s.amount,
          lines: {
            create: [
              { tenantId, lineNo: 1, accountCode: s.settleAccount.code, debit: s.amount, credit: 0, description: `Pelunasan Hutang Pajak ${s.taxType}` },
              { tenantId, lineNo: 2, accountCode: bankAccount.code, debit: 0, credit: s.amount, description: `Pembayaran via Bank ${bankAccount.name}` }
            ]
          }
        }
      });
    }
  }

  console.log('✅ Integrated ID Billing Seeding Complete!');
}
