"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTaxInvoiceInputIntegrated = seedTaxInvoiceInputIntegrated;
async function seedTaxInvoiceInputIntegrated(prisma, tenantId) {
    console.log('🌱 Seeding Integrated Tax Invoice Input (Faktur Masukan) for FY 2026...');
    const apAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1110-00' } } });
    const inventoryAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '1-1330-00' } } });
    const opexAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '6-2200-00' } } });
    const vatInAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '1-1510-00' } } });
    const taxCodePpn11 = await prisma.taxCode.findFirst({ where: { tenantId, code: 'PPN-11' } });
    if (!apAccount || !vatInAccount || !taxCodePpn11) {
        console.warn('⚠️  Some required accounts/tax codes are missing. Skipping detailed integration.');
    }
    const suppliers = [
        { code: 'VEND-INT-TAX-01', name: 'PT Global Tech Supply', npwp: '01.111.222.3-012.000', address: 'Kawasan Industri Jababeka, Cikarang' },
        { code: 'VEND-INT-TAX-02', name: 'Kantor Hukum Widjojo', npwp: '02.333.444.5-045.000', address: 'Sudirman Central Business District, Jakarta' },
        { code: 'VEND-INT-TAX-03', name: 'Global Logistics Ltd (Overseas)', npwp: null, address: 'Changi Business Park, Singapore' }
    ];
    const seededSuppliers = [];
    for (const s of suppliers) {
        const supp = await prisma.supplier.upsert({
            where: { tenantId_code: { tenantId, code: s.code } },
            update: { npwp: s.npwp, address1: s.address },
            create: {
                tenantId,
                code: s.code,
                name: s.name,
                npwp: s.npwp,
                address1: s.address,
                email: `${s.code.toLowerCase()}@example.com`
            }
        });
        seededSuppliers.push(supp);
    }
    const scenarios = [
        {
            invNo: 'PINV/2026/04/501',
            date: new Date('2026-04-10'),
            supplier: seededSuppliers[0],
            amount: 100000000,
            vat: 11000000,
            status: 'APPROVED',
            fpNumber: '010.000-26.00001001',
            accountCode: inventoryAccount?.code || '1-1330-00',
            description: 'Pembelian Spareparts Produksi'
        },
        {
            invNo: 'PINV/2026/04/502',
            date: new Date('2026-04-12'),
            supplier: seededSuppliers[1],
            amount: 45000000,
            vat: 4950000,
            status: 'APPROVED',
            fpNumber: '010.000-26.00005001',
            accountCode: opexAccount?.code || '6-2200-00',
            description: 'Biaya Konsultasi Hukum Bulanan'
        }
    ];
    for (const s of scenarios) {
        const purchaseInv = await prisma.purchaseInvoice.upsert({
            where: { tenantId_code: { tenantId, code: s.invNo } },
            update: {},
            create: {
                tenantId,
                code: s.invNo,
                supplierId: s.supplier.id,
                invoiceDate: s.date,
                status: s.status,
                subtotal: s.amount,
                taxAmount: s.vat,
                grandTotal: s.amount + s.vat,
                taxFacturNumber: s.fpNumber,
                items: {
                    create: [{
                            tenantId,
                            lineNo: 1,
                            description: s.description,
                            qty: 1,
                            unitPrice: s.amount,
                            taxCodeId: taxCodePpn11?.id,
                            amount: s.amount
                        }]
                }
            }
        });
        await prisma.journalEntry.upsert({
            where: { tenantId_entryNo: { tenantId, entryNo: `JE-TAX-P-${s.invNo.replace(/\//g, '-')}` } },
            update: {},
            create: {
                tenantId,
                entryNo: `JE-TAX-P-${s.invNo.replace(/\//g, '-')}`,
                entryDate: s.date,
                description: `Hutang & PPN Masukan - ${s.invNo}`,
                status: 'POSTED',
                totalDebit: s.amount + s.vat,
                totalCredit: s.amount + s.vat,
                referenceNo: s.invNo,
                lines: {
                    create: [
                        { tenantId, lineNo: 1, accountCode: s.accountCode, debit: s.amount, credit: 0, description: s.description },
                        { tenantId, lineNo: 2, accountCode: vatInAccount?.code || '1-1510-00', debit: s.vat, credit: 0, description: `VAT In ${s.invNo}` },
                        { tenantId, lineNo: 3, accountCode: apAccount?.code || '2-1110-00', debit: 0, credit: s.amount + s.vat, description: `AP ${s.supplier.name}` }
                    ]
                }
            }
        });
        await prisma.taxInvoice.upsert({
            where: { tenantId_invoiceNo: { tenantId, invoiceNo: s.invNo } },
            update: {
                status: 'VERIFIED',
                fpNumber: s.fpNumber,
                fpDate: s.date,
            },
            create: {
                tenantId,
                invoiceNo: s.invNo,
                invoiceDate: s.date,
                supplierId: s.supplier.id,
                customerName: s.supplier.name,
                customerNpwp: s.supplier.npwp || '00.000.000.0-000.000',
                customerAddress: s.supplier.taxAddress || s.supplier.address1 || 'Alamat Vendor',
                baseAmount: s.amount,
                taxAmount: s.vat,
                invoiceType: 'INPUT',
                status: 'VERIFIED',
                fpNumber: s.fpNumber,
                fpDate: s.date,
                taxPeriod: '04',
                taxYear: 2026,
                referenceType: 'PURCHASE_INVOICE',
                referenceId: purchaseInv.id,
                referenceNo: s.invNo
            }
        });
    }
    const importInvNo = 'PIB-2026-008899';
    const importDate = new Date('2026-04-14');
    const importAmount = 500000000;
    const importVat = 55000000;
    await prisma.taxInvoice.upsert({
        where: { tenantId_invoiceNo: { tenantId, invoiceNo: importInvNo } },
        update: {},
        create: {
            tenantId,
            invoiceNo: importInvNo,
            invoiceDate: importDate,
            customerName: 'Dirjen Bea Cukai (Impor)',
            customerNpwp: '00.000.000.0-000.000',
            baseAmount: importAmount,
            taxAmount: importVat,
            invoiceType: 'INPUT',
            status: 'VERIFIED',
            fpNumber: importInvNo,
            fpDate: importDate,
            taxPeriod: '04',
            taxYear: 2026,
            referenceType: 'MANUAL',
            referenceNo: importInvNo
        }
    });
    console.log('✅ Integrated Tax Invoice Input Seeding Complete!');
}
//# sourceMappingURL=seed-tax-invoice-input-integrated.js.map