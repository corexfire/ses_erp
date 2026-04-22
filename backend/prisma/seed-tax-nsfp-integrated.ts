import { PrismaClient } from './generated/client';

export async function seedTaxNsfpIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated NSFP Range Data for FY 2024-2026...');

  const nsfpData = [
    // --- FY 2024 (Historical & Exhausted) ---
    {
      startNo: '000.24-10000001',
      endNo: '000.24-10000500',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-12-31'),
      isUsed: true,
      lastUsedNo: '000.24-10000500' // Fully consumed
    },
    // --- FY 2025 (Historical & Partial) ---
    {
      startNo: '000.25-20000001',
      endNo: '000.25-20001000',
      startDate: new Date('2025-01-10'),
      isUsed: true,
      lastUsedNo: '000.25-20000450' // Partially consumed
    },
    // --- FY 2026 (Active - April Context) ---
    {
      startNo: '000.26-00002001',
      endNo: '000.26-00003000',
      startDate: new Date('2026-01-01'),
      isUsed: true,
      lastUsedNo: '000.26-00002012' // Matching invoices created in previous seeds
    },
    // --- FY 2026 (Fresh - Reserved) ---
    {
      startNo: '000.26-00003001',
      endNo: '000.26-00004000',
      startDate: new Date('2026-04-15'),
      isUsed: false,
      lastUsedNo: null // New allotment
    }
  ];

  for (const r of nsfpData) {
    await prisma.nsfpRange.upsert({
      where: {
        tenantId_startNo_endNo: {
          tenantId,
          startNo: r.startNo,
          endNo: r.endNo
        }
      },
      update: {
        isUsed: r.isUsed,
        lastUsedNo: r.lastUsedNo,
        startDate: r.startDate,
        endDate: r.endDate || null
      },
      create: {
        tenantId,
        startNo: r.startNo,
        endNo: r.endNo,
        startDate: r.startDate,
        endDate: r.endDate || null,
        isUsed: r.isUsed,
        lastUsedNo: r.lastUsedNo
      }
    });
  }

  // Verification Step: Ensure at least one TaxInvoice exists that uses Range 2026
  // (This was mostly done in seed-tax-invoice-integrated, but we can verify/link here if needed)
  
  console.log('✅ Integrated NSFP Seeding Complete!');
}
