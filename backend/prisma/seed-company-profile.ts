import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Find the tenant (use first available or match by name)
  const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
  const tenant = await prisma.tenant.findFirst({
    where: { name: tenantName },
  });

  if (!tenant) {
    throw new Error(`Tenant "${tenantName}" not found. Run seed.ts first.`);
  }

  const companyProfile = await prisma.companyProfile.upsert({
    where: { tenantId: tenant.id },
    update: {
      legalName: 'PT Sarana Eka Sejahtera',
      tradeName: 'SES Food & Beverage',
      npwp: '01.234.567.8-901.000',
      email: 'info@ses-fnb.co.id',
      phone: '+62-21-12345678',
      address1: 'Jl. Industri Raya No. 88',
      address2: 'Kawasan Industri Pulogadung',
      city: 'Jakarta Timur',
      province: 'DKI Jakarta',
      postalCode: '13920',
      countryCode: 'ID',
    },
    create: {
      tenantId: tenant.id,
      legalName: 'PT Sarana Eka Sejahtera',
      tradeName: 'SES Food & Beverage',
      npwp: '01.234.567.8-901.000',
      email: 'info@ses-fnb.co.id',
      phone: '+62-21-12345678',
      address1: 'Jl. Industri Raya No. 88',
      address2: 'Kawasan Industri Pulogadung',
      city: 'Jakarta Timur',
      province: 'DKI Jakarta',
      postalCode: '13920',
      countryCode: 'ID',
    },
  });

  console.log(`✅ Company profile seeded for tenant: ${tenant.name} (${tenant.id})`);
  console.log(`   Legal Name : ${companyProfile.legalName}`);
  console.log(`   Trade Name : ${companyProfile.tradeName}`);
  console.log(`   NPWP       : ${companyProfile.npwp}`);
  console.log(`   Email      : ${companyProfile.email}`);
  console.log(`   Phone      : ${companyProfile.phone}`);
  console.log(`   Address    : ${companyProfile.address1}, ${companyProfile.address2}`);
  console.log(`   City       : ${companyProfile.city}, ${companyProfile.province} ${companyProfile.postalCode}`);
  console.log(`   Country    : ${companyProfile.countryCode}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
