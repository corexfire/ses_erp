"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedInterCompany = seedInterCompany;
async function seedInterCompany(prisma, tenantId) {
    console.log('🏦 Seeding Integrated Inter-Company Transactions...');
    const hq = await prisma.branch.findFirst({ where: { tenantId, code: 'KPO-JKT' } });
    const sby = await prisma.branch.findFirst({ where: { tenantId, code: 'BR-SBY' } });
    const mdn = await prisma.branch.findFirst({ where: { tenantId, code: 'BR-MDN' } });
    if (!hq || !sby || !mdn) {
        console.error('❌ Branches not fully seeded. Aborting inter-company seed.');
        return;
    }
    const cashHq = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1110-01' } });
    const arSby = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1610-00' } });
    const apHq = await prisma.coaAccount.findFirst({ where: { tenantId, code: '2-1410-00' } });
    const trans1No = 'BM-202404-001';
    const trans1 = await prisma.interCompanyTransaction.upsert({
        where: { tenantId_transNo: { tenantId, transNo: trans1No } },
        update: {},
        create: {
            tenantId,
            transNo: trans1No,
            transDate: new Date('2024-04-10'),
            fromCompanyId: hq.id,
            toCompanyId: sby.id,
            transactionType: 'FUND_TRANSFER',
            amount: 500000000,
            description: 'Transfer Modal Kerja (Initial OPEX) pembukaan Cabang Surabaya Q2.',
            status: 'APPROVED',
            referenceNo: 'REF-IC-101'
        }
    });
    await prisma.journalEntry.upsert({
        where: { tenantId_entryNo: { tenantId, entryNo: `JE-${trans1No}` } },
        update: {},
        create: {
            tenantId,
            entryNo: `JE-${trans1No}`,
            entryDate: new Date('2024-04-10'),
            description: `[INTER-COMPANY] ${trans1.description}`,
            status: 'POSTED',
            totalDebit: 500000000,
            totalCredit: 500000000,
            referenceNo: trans1No,
            lines: {
                create: [
                    {
                        tenantId,
                        lineNo: 1,
                        accountCode: arSby?.code || '1-1610-00',
                        debit: 500000000,
                        credit: 0,
                        description: `Piutang kpd Cabang Surabaya (Tf Modal Kerja)`
                    },
                    {
                        tenantId,
                        lineNo: 2,
                        accountCode: cashHq?.code || '1-1110-01',
                        debit: 0,
                        credit: 500000000,
                        description: `Kas Kantor Pusat (Tf Modal Kerja ke SBY)`
                    }
                ]
            }
        }
    });
    const trans2No = 'BM-202404-002';
    await prisma.interCompanyTransaction.upsert({
        where: { tenantId_transNo: { tenantId, transNo: trans2No } },
        update: {},
        create: {
            tenantId,
            transNo: trans2No,
            transDate: new Date('2024-04-15'),
            fromCompanyId: hq.id,
            toCompanyId: mdn.id,
            transactionType: 'COST_ALLOCATION',
            amount: 45000000,
            description: 'Alokasi Biaya Rekrutmen & Training Karyawan Regional Medan April 2024.',
            status: 'PENDING',
            referenceNo: 'HR-AL-04'
        }
    });
    const trans3No = 'BM-202404-003';
    await prisma.interCompanyTransaction.upsert({
        where: { tenantId_transNo: { tenantId, transNo: trans3No } },
        update: {},
        create: {
            tenantId,
            transNo: trans3No,
            transDate: new Date('2024-04-20'),
            fromCompanyId: sby.id,
            toCompanyId: hq.id,
            transactionType: 'INVENTORY_TRANSFER',
            amount: 125000000,
            description: 'Pemindahan Stok Berlebih Signature Beans (BATCH-002) kembali ke HQ.',
            status: 'PENDING'
        }
    });
    const trans4No = 'BM-202404-004';
    await prisma.interCompanyTransaction.upsert({
        where: { tenantId_transNo: { tenantId, transNo: trans4No } },
        update: {},
        create: {
            tenantId,
            transNo: trans4No,
            transDate: new Date('2024-04-21'),
            fromCompanyId: mdn.id,
            toCompanyId: hq.id,
            transactionType: 'PROFIT_SHARE',
            amount: 1500000000,
            description: 'Setoran Laba Bersih Q1 Medan ke Rekening Konsolidasi Pusat.',
            status: 'REJECTED'
        }
    });
    console.log(`✅ Inter-Company Transactions seeded: 4 documents created.`);
}
//# sourceMappingURL=seed-finance-intercompany.js.map