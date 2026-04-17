import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const tenderTitles = [
  "Pengadaan Material Beton Kualitas Tinggi",
  "Penyewaan Alat Berat (Excavator & Crane)",
  "Instalasi Software Cloud ERP",
  "Jasa Konsultasi Hukum Konstruksi",
  "Pengadaan Kabel Fiber Optik Bawah Laut",
  "Layanan Keamanan (Security) Lokasi Proyek",
  "Tender Pembuatan Struktur Baja",
  "Sewa Kendaraan Operasional Lapangan",
  "Pengadaan Laptop & Perangkat IT",
  "Audit Sistem Manajemen Keamanan Informasi",
  "Suplai Solar Industri untuk Alat Berat",
  "Pengadaan Seragam & APD Pekerja",
  "Pembangunan Fasilitas Kantin Sementara",
  "Tender Jasa Asuransi Keselamatan Kerja",
  "Penyediaan Layanan Internet Satelit",
];

const supplierNames = [
  "PT Maju Jaya Konstruksi", "CV Baja Gemilang", "PT Sinar Baja Utama", "PT Sentosa Beton", 
  "TechMuda Solusi IT", "PT Amanah Security", "CV Surya Kencana", "Global Indomedia Sejahtera",
  "PT Pipa Mas Abadi", "Karya Mandiri Logistik"
];

async function main() {
  const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
  const tenant = await prisma.tenant.findUnique({ where: { name: tenantName } });

  if (!tenant) {
    throw new Error(`Tenant '${tenantName}' not found.`);
  }

  console.log(`🧹 Memulai proses Seeding Tender Management ERP untuk tenant: ${tenantName}...`);

  console.log(`🏭 Menyiapkan Data Master Suppliers...`);
  const suppliers = [];
  for (let i = 0; i < supplierNames.length; i++) {
    const code = `SUP-2026-${String(i+1).padStart(3, '0')}`;
    const name = supplierNames[i];
    const vendor = await prisma.supplier.upsert({
      where: { tenantId_code: { tenantId: tenant.id, code } },
      update: {},
      create: {
        tenantId: tenant.id,
        code,
        name,
        email: `contact@${name.replace(/ /g,'').toLowerCase()}.com`,
        phone: `021-${Math.floor(Math.random()*8000000)+1000000}`,
        address1: `Gedung ${name}, Jakarta Selatan`
      }
    });
    suppliers.push(vendor);
  }

  // Get some projects to link the tenders to
  const projects = await prisma.project.findMany({ where: { tenantId: tenant.id }, take: 20 });
  if (projects.length === 0) {
    console.warn("⚠️ Tidak ada project di database. Tenders tidak akan memiliki keterkaitan dengan Proyek.");
  }

  console.log(`📝 Seeding 30+ Tenders Pengadaan...`);
  const statuses = ['OPEN', 'EVALUATING', 'AWARDED', 'CANCELLED'];
  let createdTenders = [];

  for (let i = 0; i < 35; i++) {
    const randomTitle = tenderTitles[i % tenderTitles.length] + (i >= tenderTitles.length ? ` (Sesi ${Math.floor(i/tenderTitles.length)+1})` : '');
    const title = randomTitle;
    
    // Link to project
    const projectId = (projects.length > 0 && Math.random() > 0.3) ? projects[Math.floor(Math.random() * projects.length)].id : null;
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    let submissionDeadline: Date | null = new Date();
    submissionDeadline.setDate(submissionDeadline.getDate() + (Math.floor(Math.random() * 30) - 10)); // -10 to +20 days
    
    let awardDate: Date | null = new Date(submissionDeadline);
    awardDate.setDate(awardDate.getDate() + 14); // Award is 2 weeks after submission

    // Cancelled may not have valid dates
    if (status === 'CANCELLED') {
       if (Math.random() > 0.5) awardDate = null;
    }
    
    // For upsert, we need a unique field. Unfortunately Tender doesn't have @@unique except [tenantId, title].
    const tender = await prisma.tender.upsert({
      where: { tenantId_title: { tenantId: tenant.id, title } },
      update: { status, projectId, submissionDeadline, awardDate },
      create: {
        tenantId: tenant.id,
        title,
        projectId,
        description: `Tender pengadaan berskala besar untuk ${title}. Kandidat Supplier diharapkan melampirkan profil perusahaan, proposal penawaran, serta rincian jaminan penyelesaian.`,
        status,
        submissionDeadline,
        awardDate
      }
    });
    createdTenders.push(tender);
  }

  console.log(`🤝 Menyusun Tender Bids (Penawaran Maskapai/Supplier)...`);
  for (const tender of createdTenders) {
    if (tender.status === 'CANCELLED' || Math.random() < 0.1) continue; // Skip biding for cancelled or 10% chance
    
    const bidCount = Math.floor(Math.random() * 4) + 2; // 2 to 5 bids
    const selectedSuppliers = [...suppliers].sort(() => 0.5 - Math.random()).slice(0, bidCount);
    
    let basePrice = 100000000 + Math.floor(Math.random() * 900) * 1000000; // 100M - 1Miliar
    let winnerIndex = tender.status === 'AWARDED' ? Math.floor(Math.random() * bidCount) : -1;

    for (let j = 0; j < bidCount; j++) {
      const supp = selectedSuppliers[j];
      const variance = 1 + ((Math.random() * 0.4) - 0.2); // +/- 20%
      const price = basePrice * variance;

      let bidStatus = 'SUBMITTED';
      if (tender.status === 'EVALUATING') bidStatus = 'IN_REVIEW';
      if (tender.status === 'AWARDED') {
         bidStatus = (j === winnerIndex) ? 'WON' : 'LOST';
      }

      // Check if bid exists (no unique constraint on tenderId + supplierId sadly, we just findFirst to keep idempotent)
      const existingBid = await prisma.tenderBid.findFirst({
         where: { tenderId: tender.id, supplierId: supp.id }
      });

      if (existingBid) {
         await prisma.tenderBid.update({
            where: { id: existingBid.id },
            data: { status: bidStatus, price }
         });
      } else {
         await prisma.tenderBid.create({
            data: {
               tenderId: tender.id,
               supplierId: supp.id,
               price,
               notes: `Penawaran dari ${supp.name} include pajak dan akomodasi logistik.`,
               status: bidStatus
            }
         });
      }
    }
  }

  console.log(`✅ Tender Management Seeding Completed successfully.`);
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
