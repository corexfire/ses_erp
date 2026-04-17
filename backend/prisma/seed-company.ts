import { PrismaClient } from './generated/client';

export async function seedCompany(prisma: PrismaClient, tenantId: string) {
  console.log('🏢 Seeding Company Profile...');

  await prisma.companyProfile.upsert({
    where: { tenantId },
    update: {},
    create: {
      tenantId,
      legalName: 'PT. Sinergi Era Solusi',
      tradeName: 'SES ERP Corporate',
      npwp: '01.234.567.8-901.000',
      email: 'corporate@ses-erp.com',
      phone: '021-8888-9999',
      address1: 'Gedung Cyber 2, Lt. 32',
      address2: 'Jl. H. R. Rasuna Said No. 13',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12950',
      countryCode: 'ID'
    }
  });

  console.log('✅ Company Profile seeded.');
}
