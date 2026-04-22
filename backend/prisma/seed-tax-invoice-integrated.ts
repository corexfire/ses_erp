import { PrismaClient, AccountType } from './generated/client';

export async function seedTaxInvoiceIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated Tax Invoice (Faktur Keluaran) for FY 2026...');

  // 1. Ensure Dependencies Exist (Accounts)
  const arAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '1-1210-00' } } });
  const revenueAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '4-1100-00' } } });
  const vatOutAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1310-00' } } });
  const taxCodePpn11 = await prisma.taxCode.findFirst({ where: { tenantId, code: 'PPN-11' } });

  if (!arAccount || !revenueAccount || !vatOutAccount || !taxCodePpn11) {
    console.warn('⚠️  Some required accounts/tax codes are missing. Skipping detailed integration.');
    // Fallback or skip
  }

  // 2. Setup BSFP Range for 2026
  const nsfpRange = await prisma.nsfpRange.upsert({
    where: {
      tenantId_startNo_endNo: {
        tenantId,
        startNo: '000.26-00002001',
        endNo: '000.26-00003000'
      }
    },
    update: {},
    create: {
      tenantId,
      startNo: '000.26-00002001',
      endNo: '000.26-00003000',
      startDate: new Date('2026-01-01'),
      isUsed: true,
      lastUsedNo: '000.26-00002010'
    }
  });

  // 3. Customers Data
  const customers = [
    { code: 'CUST-INT-TAX-01', name: 'PT Surya Kencana Abadi', npwp: '01.555.666.7-012.000', address: 'Kawasan Industri Pulogadung, Jakarta' },
    { code: 'CUST-INT-TAX-02', name: 'PT Konstruksi Nusantara', npwp: '02.777.888.9-044.000', address: 'Jl. Pemuda No. 12, Surabaya' },
    { code: 'CUST-INT-TAX-03', name: 'Budi Santoso (Personal)', nik: '3171234567890001', address: 'Kavling DKI, Meruya, Jakarta' }
  ];

  const seededCustomers = [];
  for (const c of customers) {
    const cust = await prisma.customer.upsert({
      where: { tenantId_code: { tenantId, code: c.code } },
      update: { npwp: (c as any).npwp, nik: (c as any).nik, taxAddress: c.address },
      create: {
        tenantId,
        code: c.code,
        name: c.name,
        npwp: (c as any).npwp,
        nik: (c as any).nik,
        taxAddress: c.address,
        email: `${c.code.toLowerCase()}@example.com`
      }
    });
    seededCustomers.push(cust);
  }

  // 4. Seeding Scenarios
  const scenarios = [
    {
      invNo: 'SI/2026/04/101',
      date: new Date('2026-04-20'),
      customer: seededCustomers[0],
      amount: 250000000,
      vat: 27500000,
      status: 'POSTED',
      fpNumber: '010.026-00002001'
    },
    {
      invNo: 'SI/2026/04/102',
      date: new Date('2026-04-21'),
      customer: seededCustomers[1],
      amount: 150000000,
      vat: 16500000,
      status: 'POSTED',
      fpNumber: '010.026-00002002'
    },
    {
       invNo: 'SI/2026/04/103',
       date: new Date('2026-04-22'),
       customer: seededCustomers[2],
       amount: 10000000,
       vat: 1100000,
       status: 'DRAFT',
       fpNumber: null
    }
  ];

  for (const s of scenarios) {
    // A. Create Sales Invoice
    const salesInv = await prisma.salesInvoice.upsert({
      where: { tenantId_code: { tenantId, code: s.invNo } },
      update: {},
      create: {
        tenantId,
        code: s.invNo,
        customerId: s.customer.id,
        invoiceDate: s.date,
        status: s.status === 'POSTED' ? 'APPROVED' : 'DRAFT',
        items: {
          create: [{
            tenantId,
            lineNo: 1,
            description: 'Penjualan Barang Kena Pajak',
            qty: 1,
            unitPrice: s.amount,
            taxCodeId: taxCodePpn11?.id
          }]
        }
      }
    });

    // B. Create Journal Entry
    await prisma.journalEntry.upsert({
      where: { tenantId_entryNo: { tenantId, entryNo: `JE-TAX-${s.invNo.replace(/\//g, '-')}` } },
      update: {},
      create: {
        tenantId,
        entryNo: `JE-TAX-${s.invNo.replace(/\//g, '-')}`,
        entryDate: s.date,
        description: `Piutang & PPN Keluaran - ${s.invNo}`,
        status: 'POSTED',
        totalDebit: s.amount + s.vat,
        totalCredit: s.amount + s.vat,
        referenceNo: s.invNo,
        lines: {
          create: [
            { tenantId, lineNo: 1, accountCode: arAccount?.code || '1-1210-00', debit: s.amount + s.vat, credit: 0, description: `AR ${s.customer.name}` },
            { tenantId, lineNo: 2, accountCode: revenueAccount?.code || '4-1100-00', debit: 0, credit: s.amount, description: `Revenue ${s.invNo}` },
            { tenantId, lineNo: 3, accountCode: vatOutAccount?.code || '2-1310-00', debit: 0, credit: s.vat, description: `VAT Out ${s.invNo}` }
          ]
        }
      }
    });

    // C. Create Tax Invoice (Faktur Keluaran)
    await prisma.taxInvoice.upsert({
      where: { tenantId_invoiceNo: { tenantId, invoiceNo: s.invNo } },
      update: {
          status: s.status,
          fpNumber: s.fpNumber,
          fpDate: s.fpNumber ? s.date : null,
      },
      create: {
        tenantId,
        invoiceNo: s.invNo,
        invoiceDate: s.date,
        customerId: s.customer.id,
        customerName: s.customer.name,
        customerNpwp: s.customer.npwp || '00.000.000.0-000.000',
        customerNik: s.customer.nik,
        customerAddress: s.customer.taxAddress || s.customer.address1 || 'Jakarta',
        baseAmount: s.amount,
        taxAmount: s.vat,
        invoiceType: 'OUTPUT',
        status: s.status,
        fpNumber: s.fpNumber,
        fpDate: s.fpNumber ? s.date : null,
        taxPeriod: '04',
        taxYear: 2026,
        referenceType: 'SALES_INVOICE',
        referenceId: salesInv.id,
        referenceNo: s.invNo
      }
    });
  }

  // 5. Special Case: Replacement Faktur
  const originalNo = 'SI/2026/03/999';
  const replacementNo = 'SI/2026/03/999-REV';
  const origFp = '010.026-00001999';
  const replFp = '011.026-00001999';

  // Seed original first if not exists
  await prisma.taxInvoice.upsert({
      where: { tenantId_invoiceNo: { tenantId, invoiceNo: originalNo } },
      update: { status: 'REPLACED' },
      create: {
          tenantId, invoiceNo: originalNo, invoiceDate: new Date('2026-03-25'),
          customerName: 'PT Lama Sekali', baseAmount: 50000000, taxAmount: 5500000,
          invoiceType: 'OUTPUT', status: 'REPLACED', fpNumber: origFp, taxPeriod: '03', taxYear: 2026
      }
  });

  await prisma.taxInvoice.upsert({
      where: { tenantId_invoiceNo: { tenantId, invoiceNo: replacementNo } },
      update: {},
      create: {
          tenantId, invoiceNo: replacementNo, invoiceDate: new Date('2026-04-05'),
          customerName: 'PT Lama Sekali', baseAmount: 50000000, taxAmount: 5500000,
          invoiceType: 'OUTPUT', status: 'POSTED', fpNumber: replFp, fpDate: new Date('2026-04-05'),
          taxPeriod: '04', taxYear: 2026, isReplacement: true, originalFpNumber: origFp
      }
  });

  console.log('✅ Integrated Tax Invoice Seeding Complete!');
}
