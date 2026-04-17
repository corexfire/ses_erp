"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is required');
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new client_1.PrismaClient({ adapter });
const projectNames = [
    "Pembangunan Fasilitas Pabrik Gula",
    "Implementasi Sistem ERP SAP",
    "Renovasi Gedung Utama Kantor",
    "Instalasi Jaringan Fiber Optik Nasional",
    "Pengembangan Aplikasi Mobile Banking",
    "Pembangunan Jembatan Gantung Makmur",
    "Modernisasi Infrastruktur Data Center",
    "Desain & Konstruksi Gudang Logistik Balaraja",
    "Konstruksi Jalan Tol Sesi 4",
    "Pengadaan Fleet Kendaraan Operasional",
    "Migrasi Cloud Infrastructure AWS",
    "Konsultasi Manajemen Risiko Tahunan",
    "Pembuatan Fitur AI pada Produk E-commerce",
    "Instalasi Panel Surya Skala Besar (PLTS)",
    "Pemasangan Pipa Gas Sektor Industri",
    "Pembersihan Area Pelabuhan Ekspor",
    "Perencanaan Kota Cerdas (Smart City)",
    "Pengadaan Alat Berat Pertambangan",
    "Audit Keamanan Cyber ISO 27001",
    "Pengembangan Modul WMS & SCM",
    "Rehabilitasi Lahan Kritis",
    "Pembangunan RS Ibu dan Anak (RSIA)",
    "Eksplorasi Tambang Emas Blok C",
    "Konstruksi Bendungan Pengairan",
    "Pembangunan Apartemen Tower Alpha",
    "Pemeliharaan Sarana Kereta Api LRT",
    "Renovasi Fasilitas Olahraga Nasional",
    "Kampanye Pemasaran Digital Internasional",
    "Event Organizer Pameran Otomotif 2026",
    "Pengembangan Platform E-Learning Corporate"
];
async function main() {
    const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
    const tenant = await prisma.tenant.findUnique({ where: { name: tenantName } });
    if (!tenant) {
        throw new Error(`Tenant '${tenantName}' not found.`);
    }
    const customers = await prisma.customer.findMany({ where: { tenantId: tenant.id } });
    console.log(`🧹 Memulai proses Seeding Project Management ERP untuk tenant: ${tenantName}...`);
    if (customers.length === 0) {
        console.warn("⚠️ Tidak ada customer di database. Silakan jalankan seed-crm.ts terlebih dahulu jika ingin menautkan proyek ke customer.");
    }
    console.log(`🏢 Seeding 50+ Projects...`);
    const statuses = ['DRAFT', 'SETUP', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CLOSED'];
    let createdProjects = [];
    for (let i = 0; i < 60; i++) {
        const code = `PRJ-XR-${2026}${String(i).padStart(3, '0')}`;
        const name = projectNames[i % projectNames.length] + (i >= projectNames.length ? ` Fase ${Math.floor(i / projectNames.length) + 1}` : '');
        const custId = (Math.random() > 0.3 && customers.length > 0) ? customers[Math.floor(Math.random() * customers.length)].id : null;
        const budget = 50000000 + Math.floor(Math.random() * 5000) * 1000000;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const startOffset = Math.floor(Math.random() * 60) - 30;
        const duration = 30 + Math.floor(Math.random() * 300);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + startOffset);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration);
        const project = await prisma.project.upsert({
            where: { tenantId_code: { tenantId: tenant.id, code } },
            update: { name, totalBudget: budget, status, customerId: custId },
            create: {
                tenantId: tenant.id,
                code,
                name,
                description: `Proyek strategis untuk ${name} beserta rincian scope work dan persetujuan eksekutif. Dokumen ini merepresentasikan kontrak kerja dan deliverable utama proyek.`,
                totalBudget: budget,
                status,
                customerId: custId,
                startDate,
                endDate
            }
        });
        createdProjects.push(project);
    }
    console.log(`📋 Seeding WBS Tasks (Work Breakdown Structure)...`);
    for (const project of createdProjects) {
        if (Math.random() > 0.8)
            continue;
        const baseBudget = Number(project.totalBudget);
        const phases = [
            { name: "Phase 1: Planning & Design", weight: 20, codeSuffix: "P1" },
            { name: "Phase 2: Execution & Implementation", weight: 50, codeSuffix: "P2" },
            { name: "Phase 3: Testing & QA", weight: 20, codeSuffix: "P3" },
            { name: "Phase 4: Handover & Closure", weight: 10, codeSuffix: "P4" }
        ];
        let accruedCost = 0;
        for (const phase of phases) {
            const taskCode = `${project.code}-WBS-${phase.codeSuffix}`;
            const plannedCst = (baseBudget * phase.weight) / 100;
            let actualProgress = 0;
            let actualCost = 0;
            let wbsStatus = 'PENDING';
            if (project.status === 'COMPLETED' || project.status === 'CLOSED') {
                actualProgress = 100;
                actualCost = plannedCst * (0.9 + Math.random() * 0.2);
                wbsStatus = 'COMPLETED';
            }
            else if (project.status === 'IN_PROGRESS') {
                if (phase.codeSuffix === 'P1') {
                    actualProgress = 100;
                    wbsStatus = 'COMPLETED';
                    actualCost = plannedCst;
                }
                else if (phase.codeSuffix === 'P2') {
                    actualProgress = Math.floor(Math.random() * 80);
                    wbsStatus = 'IN_PROGRESS';
                    actualCost = plannedCst * (actualProgress / 100);
                }
            }
            await prisma.wbsTask.upsert({
                where: { tenantId_projectId_taskCode: { tenantId: tenant.id, projectId: project.id, taskCode } },
                update: { actualProgress, actualCost, status: wbsStatus },
                create: {
                    tenantId: tenant.id,
                    projectId: project.id,
                    taskCode,
                    taskName: phase.name,
                    level: 1,
                    plannedWeight: phase.weight,
                    plannedCost: plannedCst,
                    actualProgress: actualProgress,
                    actualCost: actualCost === 0 ? null : actualCost,
                    status: wbsStatus
                }
            });
        }
    }
    console.log(`✅ Project Management Seeding Completed successfully.`);
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
//# sourceMappingURL=seed-project.js.map