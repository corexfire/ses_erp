import { PrismaClient, ProcurementDocStatus } from './generated/client';

export async function seedTaxEbupotIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated e-Bupot (Withholding Tax) for FY 2026...');

  // 1. Ensure Dependencies Exist
  const apAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1110-00' } } });
  const pph23Account = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '2-1330-00' } } });
  const serviceExpenseAccount = await prisma.coaAccount.findUnique({ where: { tenantId_code: { tenantId, code: '6-2200-00' } } });

  if (!apAccount || !pph23Account) {
    console.warn('⚠️  Required accounts for PPh 23 are missing. Skipping detailed integration.');
  }

  // 2. Service Suppliers
  const serviceSuppliers = [
    { code: 'VEND-SVC-001', name: 'PT Konsultan IT Sejahtera', npwp: '01.555.666.7-011.000', address: 'Cyber 2 Tower, Jakarta' },
    { code: 'VEND-SVC-002', name: 'CV Maintenance Jaya', npwp: '02.777.888.9-022.000', address: 'Jl. Industri, Bekasi' }
  ];

  const seededVendors = [];
  for (const v of serviceSuppliers) {
    const supp = await prisma.supplier.upsert({
      where: { tenantId_code: { tenantId, code: v.code } },
      update: { npwp: v.npwp, address1: v.address },
      create: {
        tenantId,
        code: v.code,
        name: v.name,
        npwp: v.npwp,
        address1: v.address,
        email: `${v.code.toLowerCase()}@example.com`
      }
    });
    seededVendors.push(supp);
  }

  // 3. Transactions & Withholdings
  const scenarios = [
    {
      invNo: 'SINV/2026/04/WH-001',
      date: new Date('2026-04-05'),
      supplier: seededVendors[0],
      gross: 25000000,
      rate: 2, // 2% for NPWP
      status: 'POSTED',
      bupotNo: '23-00000551',
      desc: 'Jasa Konsultasi Implementasi Modul Tax'
    },
    {
      invNo: 'SINV/2026/04/WH-002',
      date: new Date('2026-04-12'),
      supplier: seededVendors[1],
      gross: 10000000,
      rate: 2,
      status: 'DRAFT',
      bupotNo: null,
      desc: 'Jasa Pemeliharaan AC Kantor'
    }
  ];

  for (const s of scenarios) {
    const taxAmount = s.gross * (s.rate / 100);
    const netPayable = s.gross - taxAmount;

    // A. Create Purchase Invoice (for service)
    await prisma.purchaseInvoice.upsert({
      where: { tenantId_code: { tenantId, code: s.invNo } },
      update: {},
      create: {
        tenantId,
        code: s.invNo,
        supplierId: s.supplier.id,
        invoiceDate: s.date,
        status: 'APPROVED' as ProcurementDocStatus,
        subtotal: s.gross,
        taxAmount: 0, // Assuming non-VAT for this specific withholding example simplification
        grandTotal: s.gross, 
        notes: s.desc
      }
    });

    // B. Create Journal Entry (Withholding Split)
    await prisma.journalEntry.upsert({
      where: { tenantId_entryNo: { tenantId, entryNo: `JE-WHT-${s.invNo.replace(/\//g, '-')}` } },
      update: {},
      create: {
        tenantId,
        entryNo: `JE-WHT-${s.invNo.replace(/\//g, '-')}`,
        entryDate: s.date,
        description: `Withholding Tax PPh 23 - ${s.invNo}`,
        status: 'POSTED',
        totalDebit: s.gross,
        totalCredit: s.gross,
        lines: {
          create: [
            { tenantId, lineNo: 1, accountCode: serviceExpenseAccount?.code || '6-2200-00', debit: s.gross, credit: 0, description: s.desc },
            { tenantId, lineNo: 2, accountCode: apAccount?.code || '2-1110-00', debit: 0, credit: netPayable, description: `Hutang Bersih ke ${s.supplier.name}` },
            { tenantId, lineNo: 3, accountCode: pph23Account?.code || '2-1330-00', debit: 0, credit: taxAmount, description: `Hutang PPh 23 ${s.invNo}` }
          ]
        }
      }
    });

    // C. Create PphWithholding record (e-Bupot)
    await prisma.pphWithholding.upsert({
      where: { tenantId_transNo: { tenantId, transNo: s.invNo } },
      update: {},
      create: {
        tenantId,
        transNo: s.invNo,
        transDate: s.date,
        incomeType: '23',
        taxpayerName: s.supplier.name,
        npwp: s.supplier.npwp,
        grossAmount: s.gross,
        rate: s.rate,
        taxAmount: taxAmount,
        status: s.status,
        bupotNo: s.bupotNo,
        bupotDate: s.bupotNo ? s.date : null
      }
    });
  }

  console.log('✅ Integrated e-Bupot Seeding Complete!');
}
