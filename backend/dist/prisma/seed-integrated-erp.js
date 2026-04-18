"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedIntegratedErp = seedIntegratedErp;
async function seedIntegratedErp(prisma, tenantId) {
    console.log('--- SEEDING INTEGRATED ENTERPRISE TRANSACTIONS (GOLDEN THREAD) ---');
    await prisma.taxInvoice.deleteMany({ where: { tenantId, referenceType: 'SALES_INVOICE' } });
    await prisma.journalEntryLine.deleteMany({ where: { tenantId, journalEntry: { entryNo: { in: ['JE-SAL-2024-001', 'JE-PUR-2024-001'] } } } });
    await prisma.journalEntry.deleteMany({ where: { tenantId, entryNo: { in: ['JE-SAL-2024-001', 'JE-PUR-2024-001'] } } });
    await prisma.salesInvoiceItem.deleteMany({ where: { tenantId, invoice: { code: 'INV-2024-001' } } });
    await prisma.salesInvoice.deleteMany({ where: { tenantId, code: 'INV-2024-001' } });
    await prisma.salesOrderItem.deleteMany({ where: { tenantId, order: { code: 'SO-2024-001' } } });
    await prisma.salesOrder.deleteMany({ where: { tenantId, code: 'SO-2024-001' } });
    await prisma.purchaseInvoiceItem.deleteMany({ where: { tenantId, invoice: { code: 'PINV-2024-001' } } });
    await prisma.purchaseInvoice.deleteMany({ where: { tenantId, code: 'PINV-2024-001' } });
    await prisma.goodsReceiptItem.deleteMany({ where: { tenantId, grn: { code: 'GRN-2024-001' } } });
    await prisma.goodsReceiptNote.deleteMany({ where: { tenantId, code: 'GRN-2024-001' } });
    await prisma.purchaseOrderItem.deleteMany({ where: { tenantId, order: { code: 'PO-2024-001' } } });
    await prisma.purchaseOrder.deleteMany({ where: { tenantId, code: 'PO-2024-001' } });
    const branch = await prisma.branch.findFirst({ where: { tenantId } });
    const bcaAccount = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1120-01' } });
    const arAccount = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1210-00' } });
    const apAccount = await prisma.coaAccount.findFirst({ where: { tenantId, code: '2-1110-00' } });
    const inventoryAccount = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1330-00' } });
    const revenueAccount = await prisma.coaAccount.findFirst({ where: { tenantId, code: '4-1100-00' } });
    const vatOutAccount = await prisma.coaAccount.findFirst({ where: { tenantId, code: '2-1310-00' } });
    const vatInAccount = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1510-00' } });
    const ppn11 = await prisma.taxCode.findFirst({ where: { tenantId, code: 'PPN-11' } });
    const warehouse = await prisma.warehouse.findFirst({ where: { tenantId } });
    if (!warehouse) {
        console.error('ERROR: No warehouse found for seeding integrated transactions');
        return;
    }
    const customer = await prisma.customer.upsert({
        where: { tenantId_code: { tenantId, code: 'CUST-ENT-001' } },
        update: {},
        create: {
            tenantId,
            code: 'CUST-ENT-001',
            name: 'PT Solusi Makmur Teknik',
            email: 'finance@solusimakmur.co.id',
            phone: '021-5551234',
            address1: 'Gedung Cyber 2, Kuningan',
            city: 'Jakarta Selatan',
            npwp: '01.234.567.8-012.000',
        }
    });
    const supplier = await prisma.supplier.upsert({
        where: { tenantId_code: { tenantId, code: 'VEND-TEC-001' } },
        update: {},
        create: {
            tenantId,
            code: 'VEND-TEC-001',
            name: 'PT Teknologi Digital Indonesia',
            email: 'sales@teknologi-digital.com',
            address1: 'Kawasan Industri Jababeka',
            city: 'Bekasi',
            npwp: '02.444.555.6-022.000',
        }
    });
    console.log('Executing Golden Sales Thread...');
    const soCode = 'SO-2024-001';
    const invCode = 'INV-2024-001';
    const salesOrder = await prisma.salesOrder.create({
        data: {
            tenantId,
            code: soCode,
            customerId: customer.id,
            orderDate: new Date('2024-04-01'),
            status: 'APPROVED',
            notes: 'Enterprise ERP Implementation Project',
            items: {
                create: [
                    { tenantId, lineNo: 1, description: 'License ERP Enterprise', qty: 1, unitPrice: 150000000, taxCodeId: ppn11?.id },
                    { tenantId, lineNo: 2, description: 'Consulting & Implementation', qty: 1, unitPrice: 50000000, taxCodeId: ppn11?.id }
                ]
            }
        }
    });
    const salesInvoice = await prisma.salesInvoice.create({
        data: {
            tenantId,
            code: invCode,
            customerId: customer.id,
            orderId: salesOrder.id,
            invoiceDate: new Date('2024-04-05'),
            status: 'APPROVED',
            items: {
                create: [
                    { tenantId, lineNo: 1, description: 'License ERP Enterprise', qty: 1, unitPrice: 150000000, taxCodeId: ppn11?.id },
                    { tenantId, lineNo: 2, description: 'Consulting & Implementation', qty: 1, unitPrice: 50000000, taxCodeId: ppn11?.id }
                ]
            }
        }
    });
    const baseRevenue = 200000000;
    const vatAmount = 22000000;
    const totalAr = 222000000;
    await prisma.journalEntry.create({
        data: {
            tenantId,
            entryNo: 'JE-SAL-2024-001',
            entryDate: new Date('2024-04-05'),
            description: `Journal entry for Sales Invoice ${invCode}`,
            status: 'POSTED',
            totalDebit: totalAr,
            totalCredit: totalAr,
            referenceNo: invCode,
            lines: {
                create: [
                    { tenantId, lineNo: 1, accountCode: arAccount?.code || '1-1210-00', debit: totalAr, credit: 0, description: `AR for ${invCode}` },
                    { tenantId, lineNo: 2, accountCode: revenueAccount?.code || '4-1100-00', debit: 0, credit: baseRevenue, description: `Revenue for ${invCode}` },
                    { tenantId, lineNo: 3, accountCode: vatOutAccount?.code || '2-1310-00', debit: 0, credit: vatAmount, description: `VAT Out for ${invCode}` },
                ]
            }
        }
    });
    await prisma.taxInvoice.create({
        data: {
            tenantId,
            invoiceNo: `010.000-24.00000001`,
            invoiceDate: new Date('2024-04-05'),
            customerId: customer.id,
            customerName: customer.name,
            customerNpwp: customer.npwp,
            baseAmount: baseRevenue,
            taxAmount: vatAmount,
            invoiceType: 'OUTPUT',
            status: 'VERIFIED',
            fpNumber: '010.000-24.00000001',
            referenceType: 'SALES_INVOICE',
            referenceId: salesInvoice.id
        }
    });
    console.log('Executing Golden Purchase Thread...');
    const poCode = 'PO-2024-001';
    const pinvCode = 'PINV-2024-001';
    const purchaseOrder = await prisma.purchaseOrder.create({
        data: {
            tenantId,
            code: poCode,
            supplierId: supplier.id,
            orderDate: new Date('2024-04-02'),
            status: 'APPROVED',
            items: {
                create: [
                    { tenantId, lineNo: 1, description: 'Server Workstation Pro X1', qty: 5, unitPrice: 15000000, taxCodeId: ppn11?.id }
                ]
            }
        }
    });
    const grn = await prisma.goodsReceiptNote.create({
        data: {
            tenantId,
            code: 'GRN-2024-001',
            supplierId: supplier.id,
            purchaseOrderId: purchaseOrder.id,
            receiptDate: new Date('2024-04-04'),
            status: 'POSTED',
            warehouseId: warehouse.id,
            items: {
                create: [
                    { tenantId, lineNo: 1, itemId: null, description: 'Server Workstation Pro X1', qty: 5, uomCode: 'PCS', warehouseId: warehouse.id }
                ]
            }
        }
    });
    const basePurchase = 75000000;
    const vatInAmount = 8250000;
    const totalAp = 83250000;
    const purchaseInvoice = await prisma.purchaseInvoice.create({
        data: {
            tenantId,
            code: pinvCode,
            supplierId: supplier.id,
            orderId: purchaseOrder.id,
            invoiceDate: new Date('2024-04-10'),
            status: 'APPROVED',
            items: {
                create: [
                    { tenantId, lineNo: 1, description: 'Server Workstation Pro X1', qty: 5, unitPrice: 15000000, taxCodeId: ppn11?.id }
                ]
            }
        }
    });
    await prisma.journalEntry.create({
        data: {
            tenantId,
            entryNo: 'JE-PUR-2024-001',
            entryDate: new Date('2024-04-10'),
            description: `Journal entry for Purchase Invoice ${pinvCode}`,
            status: 'POSTED',
            totalDebit: totalAp,
            totalCredit: totalAp,
            referenceNo: pinvCode,
            lines: {
                create: [
                    { tenantId, lineNo: 1, accountCode: inventoryAccount?.code || '1-1330-00', debit: basePurchase, credit: 0, description: `Inventory for ${pinvCode}` },
                    { tenantId, lineNo: 2, accountCode: vatInAccount?.code || '1-1510-00', debit: vatInAmount, credit: 0, description: `VAT In for ${pinvCode}` },
                    { tenantId, lineNo: 3, accountCode: apAccount?.code || '2-1110-00', debit: 0, credit: totalAp, description: `AP for ${pinvCode}` },
                ]
            }
        }
    });
    console.log('--- INTEGRATED ERP SEEDING COMPLETED ---');
}
//# sourceMappingURL=seed-integrated-erp.js.map