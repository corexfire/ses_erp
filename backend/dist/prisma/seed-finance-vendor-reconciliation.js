"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedVendorReconciliation = seedVendorReconciliation;
const client_1 = require("./generated/client");
async function seedVendorReconciliation(prisma, tenantId) {
    console.log('🔄 Seeding Vendor Reconciliation (3-Way Matching)...');
    const supplier = await prisma.supplier.findFirst({ where: { tenantId, code: 'SES-VN-MSFT' } }) ||
        await prisma.supplier.create({
            data: {
                tenantId,
                code: 'SES-VN-MSFT',
                name: 'Microsoft Indonesia',
                email: 'billing@microsoft.com'
            }
        });
    const warehouse = await prisma.warehouse.findFirst({ where: { tenantId } });
    if (!warehouse) {
        console.error('❌ No warehouse found. Aborting reconciliation seed.');
        return;
    }
    console.log('   - Case 1: Perfect Match (PO/GRN/Invoice Balanced)');
    const po1 = await createFullProcurementCycle(prisma, tenantId, supplier.id, warehouse.id, {
        code: 'PO-MATCH-001',
        grnCode: 'GRN-MATCH-001',
        invCode: 'PINV-MATCH-001',
        qty: 10,
        price: 1500000,
        matchStatus: 'MATCHED'
    });
    console.log('   - Case 2: Quantity Mismatch (Short Shipment)');
    const po2 = await createFullProcurementCycle(prisma, tenantId, supplier.id, warehouse.id, {
        code: 'PO-MIS-QTY-002',
        grnCode: 'GRN-MIS-QTY-002',
        invCode: 'PINV-MIS-QTY-002',
        qty: 50,
        grnQty: 45,
        invQty: 50,
        price: 200000,
        matchStatus: 'QTY_MISMATCH'
    });
    console.log('   - Case 3: Price Mismatch (Over-billed)');
    const po3 = await createFullProcurementCycle(prisma, tenantId, supplier.id, warehouse.id, {
        code: 'PO-MIS-PRC-003',
        grnCode: 'GRN-MIS-PRC-003',
        invCode: 'PINV-MIS-PRC-003',
        qty: 100,
        price: 5000,
        invPrice: 5500,
        matchStatus: 'PRICE_MISMATCH'
    });
    console.log(`✅ Vendor Reconciliation seeded: 3 Scenarios created.`);
}
async function createFullProcurementCycle(prisma, tenantId, supplierId, warehouseId, config) {
    const grnQty = config.grnQty ?? config.qty;
    const invQty = config.invQty ?? config.qty;
    const invPrice = config.invPrice ?? config.price;
    await prisma.threeWayMatching.deleteMany({ where: { tenantId, code: `MATCH-${config.code}` } });
    await prisma.purchaseInvoice.deleteMany({ where: { tenantId, code: config.invCode } });
    await prisma.goodsReceiptNote.deleteMany({ where: { tenantId, code: config.grnCode } });
    await prisma.purchaseOrder.deleteMany({ where: { tenantId, code: config.code } });
    const po = await prisma.purchaseOrder.create({
        data: {
            tenantId,
            code: config.code,
            supplierId,
            orderDate: new Date(),
            status: client_1.ProcurementDocStatus.CLOSED,
            items: {
                create: [
                    {
                        tenantId,
                        lineNo: 1,
                        description: `Items for ${config.code}`,
                        qty: config.qty,
                        unitPrice: config.price,
                        amount: config.qty * config.price
                    }
                ]
            }
        }
    });
    const grn = await prisma.goodsReceiptNote.create({
        data: {
            tenantId,
            code: config.grnCode,
            purchaseOrderId: po.id,
            supplierId,
            warehouseId,
            receiptDate: new Date(),
            status: 'POSTED',
            items: {
                create: [
                    {
                        tenantId,
                        lineNo: 1,
                        description: `Items for ${config.code}`,
                        qty: grnQty,
                        warehouseId
                    }
                ]
            }
        }
    });
    const inv = await prisma.purchaseInvoice.create({
        data: {
            tenantId,
            code: config.invCode,
            orderId: po.id,
            supplierId,
            invoiceDate: new Date(),
            status: client_1.ProcurementDocStatus.POSTED,
            items: {
                create: [
                    {
                        tenantId,
                        lineNo: 1,
                        description: `Items for ${config.code}`,
                        qty: invQty,
                        unitPrice: invPrice,
                        amount: invQty * invPrice
                    }
                ]
            }
        }
    });
    await prisma.threeWayMatching.create({
        data: {
            tenantId,
            code: `MATCH-${config.code}`,
            orderId: po.id,
            receiptId: grn.id,
            invoiceId: inv.id,
            status: config.matchStatus,
            varianceAmount: (invQty * invPrice) - (config.qty * config.price),
            discrepancyNotes: config.matchStatus !== 'MATCHED' ? `Discrepancy detected in ${config.matchStatus.toLowerCase()}` : null
        }
    });
    return po;
}
//# sourceMappingURL=seed-finance-vendor-reconciliation.js.map