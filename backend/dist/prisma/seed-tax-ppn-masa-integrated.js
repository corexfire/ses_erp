"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTaxPpnMasaIntegrated = seedTaxPpnMasaIntegrated;
async function seedTaxPpnMasaIntegrated(prisma, tenantId) {
    console.log('🌱 Seeding Integrated PPN Masa (VAT Return) for FY 2026...');
    const vatOutAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1310-00' } } });
    const vatInAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '1-1510-00' } } });
    const taxPayableAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1300-00' } } });
    if (!vatOutAccount || !vatInAccount || !taxPayableAccount) {
        console.warn('⚠️  Required tax accounts are missing. Skipping settlement journals.');
    }
    const marchOutput = [
        { no: 'SI/2026/03/001', amount: 100000000, vat: 11000000 },
        { no: 'SI/2026/03/002', amount: 200000000, vat: 22000000 }
    ];
    const marchInput = [
        { no: 'PI/2026/03/501', amount: 500000000, vat: 55000000 },
        { no: 'PI/2026/03/502', amount: 300000000, vat: 33000000 }
    ];
    for (const inv of marchOutput) {
        await prisma.taxInvoice.upsert({
            where: { tenantId_invoiceNo: { tenantId, invoiceNo: inv.no } },
            update: {},
            create: {
                tenantId, invoiceNo: inv.no, invoiceDate: new Date('2026-03-15'),
                customerName: 'Customer Maret', baseAmount: inv.amount, taxAmount: inv.vat,
                invoiceType: 'OUTPUT', status: 'VERIFIED', fpNumber: '010.026-00001001',
                taxPeriod: '03', taxYear: 2026
            }
        });
    }
    for (const inv of marchInput) {
        await prisma.taxInvoice.upsert({
            where: { tenantId_invoiceNo: { tenantId, invoiceNo: inv.no } },
            update: {},
            create: {
                tenantId, invoiceNo: inv.no, invoiceDate: new Date('2026-03-20'),
                customerName: 'Supplier Maret', baseAmount: inv.amount, taxAmount: inv.vat,
                invoiceType: 'INPUT', status: 'VERIFIED', fpNumber: '010.000-26.00000001',
                taxPeriod: '03', taxYear: 2026
            }
        });
    }
    const aprilOutputExtra = [
        { no: 'SI/2026/04/901', amount: 1000000000, vat: 110000000 },
        { no: 'SI/2026/04/902', amount: 500000000, vat: 55000000 }
    ];
    for (const inv of aprilOutputExtra) {
        await prisma.taxInvoice.upsert({
            where: { tenantId_invoiceNo: { tenantId, invoiceNo: inv.no } },
            update: {},
            create: {
                tenantId, invoiceNo: inv.no, invoiceDate: new Date('2026-04-25'),
                customerName: 'Big Client April', baseAmount: inv.amount, taxAmount: inv.vat,
                invoiceType: 'OUTPUT', status: 'VERIFIED', fpNumber: '010.026-00002015',
                taxPeriod: '04', taxYear: 2026
            }
        });
    }
    if (vatOutAccount && vatInAccount && taxPayableAccount) {
        await prisma.journalEntry.upsert({
            where: { tenantId_entryNo: { tenantId, entryNo: 'JE-SETTLE-PPN-2026-03' } },
            update: {},
            create: {
                tenantId,
                entryNo: 'JE-SETTLE-PPN-2026-03',
                entryDate: new Date('2026-03-31'),
                description: 'Penyelesaian PPN Masa Maret 2026 (Lebih Bayar)',
                status: 'POSTED',
                totalDebit: 88000000,
                totalCredit: 88000000,
                lines: {
                    create: [
                        { tenantId, lineNo: 1, accountCode: vatOutAccount.code, debit: 33000000, credit: 0, description: 'Closing PPN Keluaran Maret' },
                        { tenantId, lineNo: 2, accountCode: taxPayableAccount.code, debit: 55000000, credit: 0, description: 'PPN Lebih Bayar (Piutang Pajak)' },
                        { tenantId, lineNo: 3, accountCode: vatInAccount.code, debit: 0, credit: 88000000, description: 'Closing PPN Masukan Maret' }
                    ]
                }
            }
        });
        await prisma.journalEntry.upsert({
            where: { tenantId_entryNo: { tenantId, entryNo: 'JE-SETTLE-PPN-2026-04' } },
            update: {},
            create: {
                tenantId,
                entryNo: 'JE-SETTLE-PPN-2026-04',
                entryDate: new Date('2026-04-30'),
                description: 'Penyelesaian PPN Masa April 2026 (Kurang Bayar)',
                status: 'POSTED',
                totalDebit: 200000000,
                totalCredit: 200000000,
                lines: {
                    create: [
                        { tenantId, lineNo: 1, accountCode: vatOutAccount.code, debit: 200000000, credit: 0, description: 'Closing PPN Keluaran April' },
                        { tenantId, lineNo: 2, accountCode: vatInAccount.code, debit: 0, credit: 50000000, description: 'Closing PPN Masukan April' },
                        { tenantId, lineNo: 3, accountCode: taxPayableAccount.code, debit: 0, credit: 150000000, description: 'PPN Kurang Bayar (Hutang Pajak)' }
                    ]
                }
            }
        });
    }
    console.log('✅ Integrated PPN Masa Seeding Complete!');
}
//# sourceMappingURL=seed-tax-ppn-masa-integrated.js.map