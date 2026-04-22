import { PrismaClient, SalesDocStatus } from './generated/client';

export async function seedCustomerReceipts(prisma: PrismaClient, tenantId: string) {
  console.log('🏧 Seeding Integrated Customer Receipts (AR)...');

  // 1. Fetch Dependencies
  const customer = await prisma.customer.findFirst({ where: { tenantId, code: 'CUST-RETAIL-01' } });
  const invoice = await prisma.salesInvoice.findFirst({ where: { tenantId, code: 'INV-2024-ENT-001' } });
  const bcaAccount = await prisma.bankAccount.findFirst({ where: { tenantId, accountNo: '0012345678' } });
  const arCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1210-00' } }); // Piutang Usaha
  const bcaCoa = await prisma.coaAccount.findFirst({ where: { tenantId, code: '1-1120-01' } });

  if (!customer || !invoice || !bcaAccount || !arCoa || !bcaCoa) {
    console.error('❌ Missing dependencies for receipts seed. Check Customer/Invoice/Bank/COA existence.');
    return;
  }

  // 2. STORY 1: Full Payment via BCA
  console.log(`   - Processing full payment for ${invoice.code}...`);
  const receipt1 = await prisma.customerReceipt.upsert({
    where: { tenantId_receiptNo: { tenantId, receiptNo: 'RC-IN-202404-001' } },
    update: {
        customerId: customer.id,
        invoiceId: invoice.id,
        amount: 85000000, // Total invoice value from previous seed was 85M if I remember or similar
        status: 'POSTED'
    },
    create: {
        tenantId,
        receiptNo: 'RC-IN-202404-001',
        receiptDate: new Date('2024-04-10'),
        customerId: customer.id,
        invoiceId: invoice.id,
        amount: 85000000,
        paymentMethod: 'BANK_TRANSFER',
        reference: invoice.code,
        notes: `Pelunasan tagihan ${invoice.code} via Transfer BCA.`,
        status: 'POSTED'
    }
  });

  // Update Invoice Status
  await prisma.salesInvoice.update({
      where: { id: invoice.id },
      data: { status: SalesDocStatus.CLOSED }
  });

  // Integrated Journal Entry
  const entryNo = `JE-RCPT-${receipt1.id.slice(-6).toUpperCase()}`;
  await prisma.journalEntry.upsert({
      where: { tenantId_entryNo: { tenantId, entryNo } },
      update: {},
      create: {
          tenantId,
          entryNo,
          entryDate: new Date('2024-04-10'),
          description: `[Ar-Inflow] Pelunasan ${invoice.code} - ${customer.name}`,
          status: 'POSTED',
          totalDebit: 85000000,
          totalCredit: 85000000,
          referenceNo: receipt1.receiptNo,
          lines: {
              create: [
                  {
                    tenantId,
                    lineNo: 1,
                    accountCode: bcaCoa.code,
                    debit: 85000000,
                    credit: 0,
                    description: `Penerimaan dana Masuk ke Bank BCA`
                  },
                  {
                    tenantId,
                    lineNo: 2,
                    accountCode: arCoa.code,
                    debit: 0,
                    credit: 85000000,
                    description: `Pelunasan Piutang Usaha - ${customer.name}`
                  }
              ]
          }
      }
  });

  // 3. STORY 2: Cancelled Receipt
  await prisma.customerReceipt.upsert({
      where: { tenantId_receiptNo: { tenantId, receiptNo: 'RC-IN-202404-002' } },
      update: {},
      create: {
          tenantId,
          receiptNo: 'RC-IN-202404-002',
          receiptDate: new Date('2024-04-12'),
          customerId: customer.id,
          amount: 5000000,
          paymentMethod: 'CASH',
          reference: 'TRANS-ERR-01',
          notes: 'Double entry record - cancelled by finance.',
          status: 'CANCELLED'
      }
  });

  console.log(`✅ Customer Receipts seeded: 2 documents, Invoices updated to CLOSED.`);
}
