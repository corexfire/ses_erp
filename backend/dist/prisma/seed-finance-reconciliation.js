"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedReconciliation = seedReconciliation;
async function seedReconciliation(prisma, tenantId) {
    console.log('⚓ Seeding Bank & Cash Reconciliation Center...');
    const bcaCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1120-01' } });
    const mandiriCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1120-03' } });
    const cashCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1110-01' } });
    if (!bcaCoa || !mandiriCoa || !cashCoa) {
        console.error('❌ COA accounts not found. Aborting reconciliation seed.');
        return;
    }
    const accounts = [
        {
            accountNo: '0012345678',
            name: 'Bank BCA IDR - Main Corporate',
            bankName: 'BCA',
            coaId: bcaCoa.id,
            initialBalance: 125000000
        },
        {
            accountNo: '1230008887',
            name: 'Bank Mandiri IDR - HR Payroll',
            bankName: 'Mandiri',
            coaId: mandiriCoa.id,
            initialBalance: 75000000
        }
    ];
    const bankIds = {};
    for (const acc of accounts) {
        const bank = await prisma.bankAccount.upsert({
            where: { tenantId_accountNo: { tenantId, accountNo: acc.accountNo } },
            update: { coaAccountId: acc.coaId, balance: acc.initialBalance },
            create: {
                tenantId,
                accountNo: acc.accountNo,
                name: acc.name,
                bankName: acc.bankName,
                coaAccountId: acc.coaId,
                balance: acc.initialBalance
            }
        });
        bankIds[acc.accountNo] = bank.id;
    }
    console.log('   - Processing Bank Mandiri (Balanced Scenario)...');
    const mandiriId = bankIds['1230008887'];
    const mandiriTrans = [
        { date: '2024-03-05', type: 'CREDIT', amount: 100000000, desc: 'Deposit: Payment from Customer Alfamart (SO-2024-001)', ref: 'B-MND-01' },
        { date: '2024-03-15', type: 'DEBIT', amount: 25000000, desc: 'Transfer: Payment to Vendor Agro Jati (PO-2024-001)', ref: 'B-MND-02' }
    ];
    for (const t of mandiriTrans) {
        const trans = await prisma.bankTransaction.create({
            data: {
                tenantId,
                bankAccountId: mandiriId,
                transDate: new Date(t.date),
                transType: t.type,
                amount: t.amount,
                description: t.desc,
                reference: t.ref,
                status: 'POSTED'
            }
        });
        await prisma.journalEntry.create({
            data: {
                tenantId,
                entryNo: `JE-BANK-${trans.id.slice(-6).toUpperCase()}`,
                entryDate: new Date(t.date),
                description: `[Bank-Sync] ${t.desc}`,
                status: 'POSTED',
                totalDebit: t.amount,
                totalCredit: t.amount,
                referenceNo: t.ref,
                lines: {
                    create: [
                        {
                            tenantId,
                            lineNo: 1,
                            accountCode: mandiriCoa.code,
                            debit: t.type === 'CREDIT' ? t.amount : 0,
                            credit: t.type === 'DEBIT' ? t.amount : 0,
                            description: t.desc
                        },
                        {
                            tenantId,
                            lineNo: 2,
                            accountCode: t.type === 'CREDIT' ? '1-1210-00' : '2-1110-00',
                            debit: t.type === 'DEBIT' ? t.amount : 0,
                            credit: t.type === 'CREDIT' ? t.amount : 0,
                            description: `Offsetting ledger for bank movement`
                        }
                    ]
                }
            }
        });
    }
    await prisma.bankReconciliation.create({
        data: {
            tenantId,
            bankAccountId: mandiriId,
            reconcileDate: new Date('2024-03-31'),
            statementDate: new Date('2024-03-31'),
            statementBalance: 75000000,
            bookBalance: 75000000,
            difference: 0,
            status: 'APPROVED'
        }
    });
    console.log('   - Processing Bank BCA (Discrepancy Scenario)...');
    const bcaId = bankIds['0012345678'];
    await prisma.bankReconciliation.create({
        data: {
            tenantId,
            bankAccountId: bcaId,
            reconcileDate: new Date('2024-04-20'),
            statementDate: new Date('2024-04-20'),
            statementBalance: 124750000,
            bookBalance: 125000000,
            difference: -250000,
            status: 'DRAFT'
        }
    });
    console.log('   - Processing Cash Accounts...');
    const cashAccount = await prisma.cashAccount.upsert({
        where: { id: 'cash-local-hq' },
        update: { coaAccountId: cashCoa.id, balance: 5000000 },
        create: {
            id: 'cash-local-hq',
            tenantId,
            accountNo: 'CASH-001',
            name: 'Kas Kantor Pusat (Petty Cash)',
            coaAccountId: cashCoa.id,
            balance: 5000000
        }
    });
    await prisma.bankReconciliation.create({
        data: {
            tenantId,
            bankAccountId: '',
            bankAccountId: bcaId,
            reconcileDate: new Date('2024-04-10'),
            statementDate: new Date('2024-04-10'),
            statementBalance: 5000000,
            bookBalance: 5000000,
            difference: 0,
            status: 'APPROVED'
        }
    });
    console.log(`✅ Bank & Cash Reconciliation seeded: 2 Bank Accounts, 2 Transactions, 3 Reconciliations.`);
}
//# sourceMappingURL=seed-finance-reconciliation.js.map