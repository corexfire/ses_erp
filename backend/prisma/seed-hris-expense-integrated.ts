import { PrismaClient } from './generated/client';

export async function seedHrisExpenseIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated HRIS Expense Claim Data for FY 2026...');

  // 1. Get Representative Employees
  const employees = await prisma.employee.findMany({ 
      where: { tenantId },
      take: 5
  });

  if (employees.length === 0) {
      console.warn('⚠️ No employees found for expense seeding.');
      return;
  }

  // 2. Identify Accounts
  const pettyCashAccount = await prisma.coaAccount.findUnique({ 
    where: { tenantId_code: { tenantId, code: '1-1110-10' } } 
  });

  // Categories mapped to GL Accounts
  const categoryMap: Record<string, { name: string, account: string }> = {
    'TRAVEL': { name: 'Beban Perjalanan Dinas', account: '6-3400-00' },
    'ENTERTAINMENT': { name: 'Beban Entertainment Penjualan', account: '6-3500-00' },
    'SUPPLIES': { name: 'Beban ATK & Cetakan', account: '6-2400-00' },
    'MARKETING': { name: 'Beban Iklan & Promosi Online', account: '6-3100-00' },
  };

  const claims = [
    { empIdx: 0, no: 'CLM-202604-001', date: new Date('2026-04-05'), amount: 1250000, cat: 'TRAVEL', desc: 'Tiket Jakarta-Surabaya PP (Audit Lapangan)', status: 'PAID' },
    { empIdx: 1, no: 'CLM-202604-002', date: new Date('2026-04-06'), amount: 750000, cat: 'MEALS', desc: 'Dinner meeting with Client A (Project Site)', status: 'APPROVED' },
    { empIdx: 2, no: 'CLM-202604-003', date: new Date('2026-04-07'), amount: 250000, cat: 'SUPPLIES', desc: 'Pembelian Tinta Printer & Kertas A4', status: 'PAID' },
    { empIdx: 3, no: 'CLM-202604-004', date: new Date('2026-04-10'), amount: 5000000, cat: 'MARKETING', desc: 'Biaya Iklan Facebook (Campaign Ramadhan)', status: 'PENDING' },
    { empIdx: 4, no: 'CLM-202604-005', date: new Date('2026-04-12'), amount: 800000, cat: 'TRAVEL', desc: 'Bensin & Tol (Inspeksi Alat Berat)', status: 'PAID' },
    { empIdx: 0, no: 'CLM-202604-006', date: new Date('2026-04-15'), amount: 150000, cat: 'MEALS', desc: 'Makan siang koordinasi tim', status: 'REJECTED' },
  ];

  for (const c of claims) {
    const employee = employees[c.empIdx % employees.length];
    
    // A. Upsert Expense Claim
    await prisma.expenseClaim.upsert({
      where: { tenantId_claimNo: { tenantId, claimNo: c.no } },
      update: { status: c.status, approvedBy: 'admin', approvedAt: new Date() },
      create: {
        tenantId,
        employeeId: employee.id,
        claimNo: c.no,
        claimDate: c.date,
        amount: c.amount,
        category: c.cat,
        description: c.desc,
        status: c.status,
        approvedBy: c.status !== 'PENDING' ? 'admin' : null,
        approvedAt: c.status !== 'PENDING' ? new Date() : null,
      }
    });

    // B. Financial Integration for PAID claims
    if (c.status === 'PAID') {
      const glAccount = categoryMap[c.cat]?.account || '6-2810-00'; 
      const entryNo = `JE-CLM-${c.no}`;

      // 1. Create Journal Entry
      await prisma.journalEntry.upsert({
        where: { tenantId_entryNo: { tenantId, entryNo } },
        update: {},
        create: {
          tenantId,
          entryNo,
          entryDate: new Date(),
          description: `Reimbursement ${c.no} - ${employee.firstName} ${employee.lastName || ''}`,
          status: 'POSTED',
          totalDebit: c.amount,
          totalCredit: c.amount,
          referenceNo: c.no,
          lines: {
            create: [
              { tenantId, lineNo: 1, accountCode: glAccount, debit: c.amount, credit: 0, description: `Expense claim ${c.cat}` },
              { tenantId, lineNo: 2, accountCode: '1-1110-05', debit: 0, credit: c.amount, description: `Payment via Petty Cash` }
            ]
          }
        }
      });

      // 2. Create Cash Transaction
      await prisma.cashTransaction.create({
        data: {
          tenantId,
          cashAccountId: 'petty-cash-ops',
          transDate: new Date(),
          description: `Payout Reimbursement ${c.no}`,
          amount: c.amount,
          transType: 'DEBIT',
          status: 'POSTED',
          reference: c.no
        }
      });
    }
  }

  console.log('✅ Integrated Expense Claim Seeding Complete!');
}
