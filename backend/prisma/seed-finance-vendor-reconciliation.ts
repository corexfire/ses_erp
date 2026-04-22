import { PrismaClient, ProcurementDocStatus } from './generated/client';

export async function seedVendorReconciliation(prisma: PrismaClient, tenantId: string) {
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

  // 1. STORY 1: PERFECT MATCH (PO-MATCH-001)
  console.log('   - Case 1: Perfect Match (PO/GRN/Invoice Balanced)');
  const po1 = await createFullProcurementCycle(prisma, tenantId, supplier.id, warehouse.id, {
    code: 'PO-MATCH-001',
    grnCode: 'GRN-MATCH-001',
    invCode: 'PINV-MATCH-001',
    qty: 10,
    price: 1500000,
    matchStatus: 'MATCHED'
  });

  // 2. STORY 2: QUANTITY MISMATCH (PO-MIS-QTY-001)
  console.log('   - Case 2: Quantity Mismatch (Short Shipment)');
  const po2 = await createFullProcurementCycle(prisma, tenantId, supplier.id, warehouse.id, {
    code: 'PO-MIS-QTY-002',
    grnCode: 'GRN-MIS-QTY-002',
    invCode: 'PINV-MIS-QTY-002',
    qty: 50,
    grnQty: 45, // Under-shipped
    invQty: 50, // Billed full
    price: 200000,
    matchStatus: 'QTY_MISMATCH'
  });

  // 3. STORY 3: PRICE MISMATCH (PO-MIS-PRC-001)
  console.log('   - Case 3: Price Mismatch (Over-billed)');
  const po3 = await createFullProcurementCycle(prisma, tenantId, supplier.id, warehouse.id, {
    code: 'PO-MIS-PRC-003',
    grnCode: 'GRN-MIS-PRC-003',
    invCode: 'PINV-MIS-PRC-003',
    qty: 100,
    price: 5000,
    invPrice: 5500, // Over-billed
    matchStatus: 'PRICE_MISMATCH'
  });

  console.log(`✅ Vendor Reconciliation seeded: 3 Scenarios created.`);
}

async function createFullProcurementCycle(
  prisma: PrismaClient, 
  tenantId: string, 
  supplierId: string, 
  warehouseId: string,
  config: { 
    code: string, 
    grnCode: string, 
    invCode: string, 
    qty: number, 
    price: number, 
    grnQty?: number, 
    invQty?: number, 
    invPrice?: number,
    matchStatus: string
  }
) {
  const grnQty = config.grnQty ?? config.qty;
  const invQty = config.invQty ?? config.qty;
  const invPrice = config.invPrice ?? config.price;

  // Cleanup existing to ensure fresh start for these specific codes
  await prisma.threeWayMatching.deleteMany({ where: { tenantId, code: `MATCH-${config.code}` } });
  await prisma.purchaseInvoice.deleteMany({ where: { tenantId, code: config.invCode } });
  await prisma.goodsReceiptNote.deleteMany({ where: { tenantId, code: config.grnCode } });
  await prisma.purchaseOrder.deleteMany({ where: { tenantId, code: config.code } });

  // PO
  const po = await prisma.purchaseOrder.create({
    data: {
      tenantId,
      code: config.code,
      supplierId,
      orderDate: new Date(),
      status: ProcurementDocStatus.CLOSED,
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

  // GRN
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

  // Invoice
  const inv = await prisma.purchaseInvoice.create({
    data: {
      tenantId,
      code: config.invCode,
      orderId: po.id,
      supplierId,
      invoiceDate: new Date(),
      status: ProcurementDocStatus.POSTED,
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

  // Three-way Match record
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
