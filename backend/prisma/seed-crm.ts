import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const b2bCompanies = [
  { name: 'PT Indofood Sukses Makmur Tbk', city: 'Jakarta Selatan', prov: 'DKI Jakarta' },
  { name: 'PT Astra International Tbk', city: 'Jakarta Pusat', prov: 'DKI Jakarta' },
  { name: 'PT Telkom Indonesia Tbk', city: 'Bandung', prov: 'Jawa Barat' },
  { name: 'PT Bank Central Asia Tbk', city: 'Jakarta Pusat', prov: 'DKI Jakarta' },
  { name: 'PT Gudang Garam Tbk', city: 'Kediri', prov: 'Jawa Timur' },
  { name: 'PT Unilever Indonesia Tbk', city: 'Tangerang', prov: 'Banten' },
  { name: 'PT Semen Indonesia Tbk', city: 'Gresik', prov: 'Jawa Timur' },
  { name: 'PT Kalbe Farma Tbk', city: 'Jakarta Utara', prov: 'DKI Jakarta' },
  { name: 'PT Adaro Energy Tbk', city: 'Jakarta Selatan', prov: 'DKI Jakarta' },
  { name: 'PT United Tractors Tbk', city: 'Jakarta Timur', prov: 'DKI Jakarta' },
  { name: 'CV Makmur Sejahtera', city: 'Surabaya', prov: 'Jawa Timur' },
  { name: 'CV Bintang Abadi', city: 'Semarang', prov: 'Jawa Tengah' },
  { name: 'PT Sumber Alfaria Trijaya Tbk', city: 'Tangerang', prov: 'Banten' },
  { name: 'PT Charoen Pokphand Indonesia', city: 'Jakarta Utara', prov: 'DKI Jakarta' },
  { name: 'PT Mayora Indah Tbk', city: 'Tangerang', prov: 'Banten' },
  { name: 'PT Sinar Mas Land', city: 'Tangerang Selatan', prov: 'Banten' },
  { name: 'PT Chandra Asri Petrochemical', city: 'Cilegon', prov: 'Banten' },
  { name: 'PT Indofood CBP Sukses Makmur', city: 'Jakarta Selatan', prov: 'DKI Jakarta' },
  { name: 'PT Vale Indonesia Tbk', city: 'Jakarta Selatan', prov: 'DKI Jakarta' },
  { name: 'PT Aneka Tambang Tbk', city: 'Jakarta Selatan', prov: 'DKI Jakarta' },
  { name: 'PT Perusahaan Gas Negara Tbk', city: 'Jakarta Barat', prov: 'DKI Jakarta' },
  { name: 'PT Bukalapak.com Tbk', city: 'Jakarta Selatan', prov: 'DKI Jakarta' },
  { name: 'PT GoTo Gojek Tokopedia Tbk', city: 'Jakarta Selatan', prov: 'DKI Jakarta' },
  { name: 'PT Indah Kiat Pulp & Paper', city: 'Serang', prov: 'Banten' },
  { name: 'PT Barito Pacific Tbk', city: 'Jakarta Barat', prov: 'DKI Jakarta' },
  { name: 'PT Bumi Resources Tbk', city: 'Jakarta Selatan', prov: 'DKI Jakarta' },
  { name: 'PT Tower Bersama Infrastructure', city: 'Jakarta', prov: 'DKI Jakarta' },
  { name: 'PT Japfa Comfeed Indonesia', city: 'Jakarta Selatan', prov: 'DKI Jakarta' },
  { name: 'PT Media Nusantara Citra Tbk', city: 'Jakarta Pusat', prov: 'DKI Jakarta' },
  { name: 'PT Sarana Menara Nusantara', city: 'Kudus', prov: 'Jawa Tengah' },
  { name: 'PT Pakuwon Jati Tbk', city: 'Surabaya', prov: 'Jawa Timur' },
  { name: 'PT Waskita Karya Tbk', city: 'Jakarta Timur', prov: 'DKI Jakarta' },
  { name: 'PT Wijaya Karya Tbk', city: 'Jakarta Timur', prov: 'DKI Jakarta' },
  { name: 'PT Pembangunan Perumahan Tbk', city: 'Jakarta Timur', prov: 'DKI Jakarta' },
  { name: 'PT Garuda Indonesia Tbk', city: 'Tangerang', prov: 'Banten' },
  { name: 'PT Jasa Marga Tbk', city: 'Jakarta Timur', prov: 'DKI Jakarta' },
  { name: 'PT Krakatau Steel Tbk', city: 'Cilegon', prov: 'Banten' },
  { name: 'PT Timah Tbk', city: 'Pangkal Pinang', prov: 'Bangka Belitung' },
  { name: 'CV Karya Bersama', city: 'Malang', prov: 'Jawa Timur' },
  { name: 'Toko Surya Mas', city: 'Denpasar', prov: 'Bali' },
  { name: 'PT Mitra Adiperkasa Tbk', city: 'Jakarta Pusat', prov: 'DKI Jakarta' },
  { name: 'PT Ace Hardware Indonesia Tbk', city: 'Jakarta Barat', prov: 'DKI Jakarta' },
  { name: 'PT Erajaya Swasembada Tbk', city: 'Jakarta Barat', prov: 'DKI Jakarta' },
  { name: 'PT AKR Corporindo Tbk', city: 'Jakarta Barat', prov: 'DKI Jakarta' },
  { name: 'PT Ciputra Development Tbk', city: 'Jakarta Selatan', prov: 'DKI Jakarta' },
  { name: 'PT Summarecon Agung Tbk', city: 'Jakarta Timur', prov: 'DKI Jakarta' },
  { name: 'PT Bumi Serpong Damai Tbk', city: 'Tangerang', prov: 'Banten' },
  { name: 'PT Surya Citra Media Tbk', city: 'Jakarta Pusat', prov: 'DKI Jakarta' },
  { name: 'PT Elang Mahkota Teknologi Tbk', city: 'Jakarta Pusat', prov: 'DKI Jakarta' },
  { name: 'PT Matahari Department Store', city: 'Tangerang', prov: 'Banten' }
];

const leadNames = [
  "Budi Santoso", "Andi Pratama", "Siti Aminah", "Dewi Lestari", "Agus Setiawan",
  "Ilham Syah", "Rina Marlina", "Tono Kurniawan", "Eka Putri", "Yudi Wahyudi",
  "Wahyu Hidayat", "Nina Rosalina", "Hendro Saputro", "Dian Sastrowardoyo", "Rizky Febian",
  "Ahmad Dhani", "Sheila Majid", "Bunga Citra", "Reza Rahadian", "Tara Basro",
  "Resto Amarta", "Cafe Kopi Senja", "Warung Bali Makmur", "Supermarket Rezeki", "Toko Bangunan Jaya",
  "Boutique Anisa", "Klinik Sehat", "Apotek Kimia", "Salon Cantik", "Bengkel Motor Top"
];

const leadSources = ["Website", "Referral", "Cold Call", "Social Media", "Exhibition", "Email Campaign"];

async function main() {
  const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
  const tenant = await prisma.tenant.findUnique({ where: { name: tenantName } });

  if (!tenant) {
    throw new Error(`Tenant '${tenantName}' not found. Please run seed.ts first.`);
  }

  const users = await prisma.user.findMany({ where: { tenantId: tenant.id } });
  const adminUsers = users.filter(u => u.isActive);
  const randomAssignee = () => adminUsers.length > 0 ? adminUsers[Math.floor(Math.random() * adminUsers.length)].id : null;

  console.log(`🧹 Appending CRM data for tenant: ${tenantName}...`);

  console.log(`🏢 Seeding Customers...`);
  const createdCustomers = [];
  for (let i = 0; i < b2bCompanies.length; i++) {
    const comp = b2bCompanies[i];
    const code = `CUS-CRM-${1000 + i}`;
    const customer = await prisma.customer.upsert({
      where: { tenantId_code: { tenantId: tenant.id, code } },
      update: { name: comp.name, city: comp.city, province: comp.prov },
      create: {
        tenantId: tenant.id,
        code,
        name: comp.name,
        email: `info@${comp.name.toLowerCase().replace(/ /g, '').replace(/pt/g, '').replace(/tbk/g, '')}.co.id`,
        phone: `021-${Math.floor(8000000 + Math.random() * 1000000)}`,
        address1: `Jl. Jend. Sudirman No. ${Math.floor(Math.random() * 100)}`,
        city: comp.city,
        province: comp.prov,
        countryCode: "ID",
        isActive: Math.random() > 0.1, // 90% active
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
      }
    });
    createdCustomers.push(customer);
  }

  console.log(`👤 Seeding Leads...`);
  const createdLeads = [];
  const leadStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'LOST', 'WON'];
  for (let i = 0; i < 60; i++) {
    const name = leadNames[i % leadNames.length] + (i >= leadNames.length ? ` ${i}` : '');
    const code = `LD-CRM-${10000 + i}`;
    const lead = await prisma.lead.upsert({
      where: { tenantId_code: { tenantId: tenant.id, code } },
      update: { name },
      create: {
        tenantId: tenant.id,
        code,
        name: name,
        email: `${name.split(' ')[0].toLowerCase()}@example.com`,
        phone: `0812${Math.floor(10000000 + Math.random() * 90000000)}`,
        source: leadSources[Math.floor(Math.random() * leadSources.length)],
        status: leadStatuses[Math.floor(Math.random() * leadStatuses.length)] as any,
        notes: "Minat prospek tinggi, perlu di follow up segera.",
        assignedToUserId: randomAssignee(),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 5000000000))
      }
    });
    createdLeads.push(lead);
  }

  console.log(`📢 Seeding Marketing Campaigns...`);
  const campaignsData = [
    { name: "Promo Akhir Tahun F&B", budget: 50000000 },
    { name: "Expo Manufaktur 2026", budget: 150000000 },
    { name: "Digital Ads Q1", budget: 25000000 },
    { name: "Sponsorship Event Lokal", budget: 10000000 },
    { name: "Email Newsletter Series", budget: 5000000 }
  ];
  const createdCampaigns = [];
  for (let i = 0; i < campaignsData.length; i++) {
    const code = `CMP-CRM-${2026}-${i + 1}`;
    const camp = await prisma.marketingCampaign.upsert({
      where: { tenantId_code: { tenantId: tenant.id, code } },
      update: { name: campaignsData[i].name },
      create: {
        tenantId: tenant.id,
        code,
        name: campaignsData[i].name,
        channel: i % 2 === 0 ? "Digital" : "Offline",
        status: i === 0 ? "COMPLETED" : "ACTIVE",
        budget: campaignsData[i].budget,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });
    createdCampaigns.push(camp);
  }

  console.log(`💼 Seeding Opportunities...`);
  const oppStages = ['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];
  const createdOpps = [];
  for (let i = 0; i < 40; i++) {
    const isCustomer = Math.random() > 0.4; // 60% chance it belongs to a customer
    const c = isCustomer ? createdCustomers[Math.floor(Math.random() * createdCustomers.length)] : null;
    const l = !isCustomer ? createdLeads[Math.floor(Math.random() * createdLeads.length)] : null;
    
    const stage = oppStages[Math.floor(Math.random() * oppStages.length)];
    const expectedVal = Math.floor(Math.random() * 500) * 1000000 + 10000000; // 10M to 510M
    const code = `OPP-CRM-${10000 + i}`;

    const opp = await prisma.opportunity.upsert({
      where: { tenantId_code: { tenantId: tenant.id, code } },
      update: { expectedValue: expectedVal },
      create: {
        tenantId: tenant.id,
        code,
        name: `Deal dengan ${c ? c.name : l?.name}`,
        stage: stage as any,
        expectedValue: expectedVal,
        closeDate: new Date(Date.now() + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000),
        customerId: c?.id,
        leadId: l?.id,
        ownerUserId: randomAssignee(),
        notes: `Peluang besar dari ${c ? "client" : "lead"}.`
      }
    });
    createdOpps.push(opp);
  }

  console.log(`🎟️ Seeding Service Tickets...`);
  const ticketSubjects = ["Barang rusak saat pengiriman", "Kesalahan faktur", "Pertanyaan teknis", "Komplain layanan", "Request penawaran baru"];
  const ticketStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  for (let i = 0; i < 30; i++) {
    const c = createdCustomers[Math.floor(Math.random() * createdCustomers.length)];
    const code = `TCK-CRM-${10000 + i}`;
    await prisma.serviceTicket.upsert({
      where: { tenantId_code: { tenantId: tenant.id, code } },
      update: { status: ticketStatuses[Math.floor(Math.random() * ticketStatuses.length)] as any },
      create: {
        tenantId: tenant.id,
        code,
        customerId: c.id,
        subject: ticketSubjects[Math.floor(Math.random() * ticketSubjects.length)],
        priority: Math.random() > 0.7 ? "HIGH" : (Math.random() > 0.5 ? "MEDIUM" : "LOW"),
        status: ticketStatuses[Math.floor(Math.random() * ticketStatuses.length)] as any,
        assignedToId: randomAssignee(),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      }
    });
  }

  console.log(`🗓️ Seeding Sales Activities...`);
  const actTypes = ['CALL', 'MEETING', 'EMAIL', 'TASK'];
  const actStatuses = ['OPEN', 'DONE', 'CANCELED'];
  for (let i = 0; i < 50; i++) {
    const type = actTypes[Math.floor(Math.random() * actTypes.length)];
    const isFuture = Math.random() > 0.5;
    const dueAt = new Date(Date.now() + (isFuture ? 1 : -1) * Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000);
    
    let relId = {};
    const relRnd = Math.random();
    if (relRnd < 0.3) {
        relId = { customerId: createdCustomers[Math.floor(Math.random() * createdCustomers.length)].id };
    } else if (relRnd < 0.6) {
        relId = { leadId: createdLeads[Math.floor(Math.random() * createdLeads.length)].id };
    } else {
        relId = { opportunityId: createdOpps[Math.floor(Math.random() * createdOpps.length)].id };
    }

    await prisma.salesActivity.create({
      data: {
        tenantId: tenant.id,
        type: type as any,
        subject: `${type} Follow up`,
        dueAt: dueAt,
        status: actStatuses[Math.floor(Math.random() * actStatuses.length)] as any,
        assignedToId: randomAssignee(),
        ...relId
      }
    });
  }

  console.log(`✅ CRM Seeding Completed successfully.`);
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
