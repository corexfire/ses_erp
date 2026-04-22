import { PrismaClient } from './generated/client';

export async function seedPettyCash(prisma: PrismaClient, tenantId: string) {
  console.log('💸 Seeding Petty Cash & Operational Reimbursements...');

  // 1. Fetch COA for integration
  const pettyCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1110-05' } });
  const bcaCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1120-01' } });
  const opexCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '6-2400-00' } }); // ATK & Cetakan

  if (!pettyCoa) {
    console.error('❌ Petty Cash COA not found. Aborting seed.');
    return;
  }

  // 2. Initialize Petty Cash Account
  const pettyAccount = await prisma.cashAccount.upsert({
    where: { id: 'petty-cash-ops' },
    update: { coaAccountId: pettyCoa.id, balance: 1500000 }, // 1.5M current balance
    create: {
      id: 'petty-cash-ops',
      tenantId,
      accountNo: 'PC-OPS-001',
      name: 'Kas Kecil - Operations HQ',
      coaAccountId: pettyCoa.id,
      balance: 1500000
    }
  });

  // 3. STORY 1: Operational Expenses (History)
  console.log('   - Seeding Historical Expenses...');
  const expenses = [
    { date: '2024-04-05', amount: 150000, desc: 'Pembelian Kertas A4 & Materai (ATK)', ref: 'PC-EXP-001' },
    { date: '2024-04-08', amount: 45000, desc: 'Biaya Grab/Gojek antar dokumen legal', ref: 'PC-EXP-002' },
    { date: '2024-04-12', amount: 325000, desc: 'Snack & Konsumsi Rapat Koordinasi Mingguan', ref: 'PC-EXP-003' }
  ];

  for(const e of expenses) {
      const trans = await prisma.cashTransaction.create({
          data: {
              tenantId,
              cashAccountId: pettyAccount.id,
              transDate: new Date(e.date),
              transType: 'DEBIT', // Expense
              amount: e.amount,
              description: e.desc,
              reference: e.ref,
              status: 'POSTED'
          }
      });

      // Journal Entry
      await prisma.journalEntry.create({
          data: {
              tenantId,
              entryNo: `JE-PCASH-${trans.id.slice(-6).toUpperCase()}`,
              entryDate: new Date(e.date),
              description: `[PettyCash] ${e.desc}`,
              status: 'POSTED',
              totalDebit: e.amount,
              totalCredit: e.amount,
              referenceNo: e.ref,
              lines: {
                  create: [
                      {
                        tenantId,
                        lineNo: 1,
                        accountCode: opexCoa?.code || '6-2400-00',
                        debit: e.amount,
                        credit: 0,
                        description: e.desc
                      },
                      {
                        tenantId,
                        lineNo: 2,
                        accountCode: pettyCoa.code,
                        debit: 0,
                        credit: e.amount,
                        description: `Payment from Petty Cash`
                      }
                  ]
              }
          }
      });
  }

  // 4. STORY 2: Replenishment Requests
  console.log('   - Seeding Replenishment Requests...');

  // REQ 1: APPROVED (Already processed)
  await prisma.pettyCashReplenishment.upsert({
      where: { tenantId_requestNo: { tenantId, requestNo: 'REQ-PC-202403-001' } },
      update: {},
      create: {
          tenantId,
          requestNo: 'REQ-PC-202403-001',
          requestDate: new Date('2024-03-25'),
          amount: 5000000,
          status: 'APPROVED',
          notes: 'Pengisian Kas Kecil awal periode Q2.',
          referenceNo: 'JE-BANK-BCA-01',
          cashAccountId: pettyAccount.id
      }
  });

  // REQ 2: PENDING (Needs approval)
  await prisma.pettyCashReplenishment.upsert({
      where: { tenantId_requestNo: { tenantId, requestNo: 'REQ-PC-202404-002' } },
      update: {},
      create: {
          tenantId,
          requestNo: 'REQ-PC-202404-002',
          requestDate: new Date('2024-04-18'),
          amount: 2850000,
          status: 'PENDING',
          notes: 'Reimbursement biaya operasional survey lapangan site Balikpapan.',
          referenceNo: 'BON-LOG-04',
          cashAccountId: pettyAccount.id
      }
  });

  // REQ 3: REJECTED
  await prisma.pettyCashReplenishment.upsert({
      where: { tenantId_requestNo: { tenantId, requestNo: 'REQ-PC-202404-003' } },
      update: {},
      create: {
          tenantId,
          requestNo: 'REQ-PC-202404-003',
          requestDate: new Date('2024-04-19'),
          amount: 750000,
          status: 'REJECTED',
          notes: 'Klaim biaya parkir & bensin tanpa struk valid (Out of policy).',
          cashAccountId: pettyAccount.id
      }
  });

  console.log(`✅ Petty Cash seeded: 1 Account, 3 Expenses, 3 Replenishment documents.`);
}
