import { PrismaClient, SalesDocStatus, ProcurementDocStatus } from './generated/client';

export async function seedFullFinanceFlow(prisma: PrismaClient, tenantId: string) {
  console.log('🔗 Seeding End-to-End "Golden Thread" Finance Lifecycles...');

  // 1. Fetch COA dependencies
  const bcaCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1120-01' } });
  const mandiriCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1120-03' } });
  const pettyCashCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1110-01' } });
  const arCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1210-00' } });
  const apCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '2-1110-00' } });
  const salesCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '4-1000-00' } });
  const purchaseCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '5-1000-00' } });

  // 2. Setup Cash/Bank Accounts
  const mainPettyCash = await prisma.cashAccount.upsert({
      where: { tenantId_accountNo: { tenantId, accountNo: 'CASH-MAIN' } },
      update: {},
      create: {
          tenantId,
          accountNo: 'CASH-MAIN',
          name: 'Main Office Petty Cash',
          balance: 25000000,
          coaAccountId: pettyCashCoa?.id
      }
  });

  const bcaBank = await prisma.bankAccount.upsert({
      where: { tenantId_accountNo: { tenantId, accountNo: 'BANK-BCA-001' } },
      update: {},
      create: {
          tenantId,
          accountNo: 'BANK-BCA-001',
          name: 'BCA Operasional',
          bankName: 'BCA',
          balance: 500000000,
          coaAccountId: bcaCoa?.id
      }
  });

  // --- STORY A: THE SALES LIFECYCLE (AR) ---
  console.log('   - Processing Sales Story: SES-CLIENT-BCA...');

  const customer = await prisma.customer.upsert({
      where: { tenantId_code: { tenantId, code: 'SES-CL-BCA' } },
      update: {},
      create: {
          tenantId,
          code: 'SES-CL-BCA',
          name: 'Bank BCA (Corporate Division)',
          email: 'finance@bca.co.id'
      }
  });

  // Sales Order -> Sales Invoice -> Customer Receipt
  const salesOrder = await prisma.salesOrder.upsert({
      where: { tenantId_code: { tenantId, code: 'SO-2024-BCA-001' } },
      update: { status: SalesDocStatus.CLOSED },
      create: {
          tenantId,
          code: 'SO-2024-BCA-001',
          customerId: customer.id,
          orderDate: new Date('2024-02-15'),
          status: SalesDocStatus.CLOSED,
          notes: 'Enterprise Cloud Integration Phase 1'
      }
  });

  const salesInvoice = await prisma.salesInvoice.upsert({
      where: { tenantId_code: { tenantId, code: 'INV-2024-BCA-001' } },
      update: { status: SalesDocStatus.CLOSED },
      create: {
          tenantId,
          code: 'INV-2024-BCA-001',
          customerId: customer.id,
          orderId: salesOrder.id,
          invoiceDate: new Date('2024-02-28'),
          status: SalesDocStatus.CLOSED,
          notes: 'Billed upon deployment'
      }
  });

  const receipt = await prisma.customerReceipt.upsert({
      where: { tenantId_receiptNo: { tenantId, receiptNo: 'RC-BCA-202403-01' } },
      update: { status: 'POSTED' },
      create: {
          tenantId,
          receiptNo: 'RC-BCA-202403-01',
          receiptDate: new Date('2024-03-15'),
          customerId: customer.id,
          invoiceId: salesInvoice.id,
          amount: 150000000,
          paymentMethod: 'BANK_TRANSFER',
          reference: salesInvoice.code,
          status: 'POSTED',
          notes: 'Full payment received.'
      }
  });

  // --- STORY B: THE PURCHASE LIFECYCLE (AP) ---
  console.log('   - Processing Purchase Story: SES-VENDOR-MSFT...');

  const supplier = await prisma.supplier.upsert({
      where: { tenantId_code: { tenantId, code: 'SES-VN-MSFT' } },
      update: {},
      create: {
          tenantId,
          code: 'SES-VN-MSFT',
          name: 'Microsoft Indonesia',
          email: 'billing@microsoft.com'
      }
  });

  const purchaseOrder = await prisma.purchaseOrder.upsert({
      where: { tenantId_code: { tenantId, code: 'PO-2024-MSFT-001' } },
      update: { status: ProcurementDocStatus.CLOSED },
      create: {
          tenantId,
          code: 'PO-2024-MSFT-001',
          supplierId: supplier.id,
          orderDate: new Date('2024-03-01'),
          status: ProcurementDocStatus.CLOSED,
          notes: 'Surface Hub Hardware Purchase'
      }
  });

  const purchaseInvoice = await prisma.purchaseInvoice.upsert({
      where: { tenantId_code: { tenantId, code: 'PINV-2024-MSFT-001' } },
      update: { status: ProcurementDocStatus.CLOSED },
      create: {
          tenantId,
          code: 'PINV-2024-MSFT-001',
          supplierId: supplier.id,
          orderId: purchaseOrder.id,
          invoiceDate: new Date('2024-03-10'),
          status: ProcurementDocStatus.CLOSED,
          notes: 'Hardware received with good condition.'
      }
  });

  const payment = await prisma.vendorPayment.upsert({
      where: { tenantId_paymentNo: { tenantId, paymentNo: 'PAY-MSFT-202404-01' } },
      update: { status: 'POSTED' },
      create: {
          tenantId,
          paymentNo: 'PAY-MSFT-202404-01',
          paymentDate: new Date('2024-04-05'),
          supplierId: supplier.id,
          invoiceId: purchaseInvoice.id,
          amount: 75000000,
          paymentMethod: 'BANK_TRANSFER',
          reference: purchaseInvoice.code,
          status: 'POSTED',
          notes: 'Disbursement from Mandiri main account.'
      }
  });

  // --- STORY C: STANDALONE AR/AP & PETTY CASH ---
  console.log('   - Seeding Standalone AR/AP & Petty Cash...');

  // Standalone Customer Invoice (Using model from line 2125)
  const standaloneAr = await prisma.customerInvoice.upsert({
      where: { tenantId_invoiceNo: { tenantId, invoiceNo: 'INV-EXT-2024-001' } },
      update: {},
      create: {
          tenantId,
          invoiceNo: 'INV-EXT-2024-001',
          customerId: customer.id,
          invoiceDate: new Date('2024-04-10'),
          totalAmount: 5000000,
          status: 'OPEN',
          description: 'Consultancy Service (Hourly)'
      }
  });

  // Standalone Supplier Invoice (Using model from line 2070)
  const standaloneAp = await prisma.supplierInvoice.upsert({
      where: { tenantId_invoiceNo: { tenantId, invoiceNo: 'INV-SUP-2024-001' } },
      update: {},
      create: {
          tenantId,
          invoiceNo: 'INV-SUP-2024-001',
          supplierId: supplier.id,
          invoiceDate: new Date('2024-04-12'),
          totalAmount: 1200000,
          status: 'OPEN',
          description: 'Office Stationery Supply'
      }
  });

  // Petty Cash Movements
  await prisma.cashTransaction.create({
      data: {
          tenantId,
          cashAccountId: mainPettyCash.id,
          transDate: new Date('2024-04-15'),
          transType: 'OUTFLOW',
          description: 'Refreshment for Board Meeting',
          amount: 450000,
          reference: 'PETTY-001',
          status: 'POSTED'
      }
  });

  await prisma.cashTransaction.create({
      data: {
          tenantId,
          cashAccountId: mainPettyCash.id,
          transDate: new Date('2024-04-01'),
          transType: 'INFLOW',
          description: 'Monthly Replenishment from Bank',
          amount: 10000000,
          reference: 'REPL-001',
          status: 'POSTED'
      }
  });

  // 4. Update Balances
  await prisma.cashAccount.update({
      where: { id: mainPettyCash.id },
      data: { balance: { increment: 9550000 } }
  });

  console.log(`✅ "Golden Thread" fully integrated: AR Flow, AP Flow, Standalone Docs, and Petty Cash.`);
}
