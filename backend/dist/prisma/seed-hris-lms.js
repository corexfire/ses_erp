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
const courseMocks = [
    { code: 'HSE-101', title: 'Sertifikasi K3 Keselamatan Kerja', duration: 16, category: 'SAFETY', mandatory: true, desc: 'Latihan wajib bagi seluruh staff lapangan untuk meminimalkan insiden.' },
    { code: 'ETH-200', title: 'Etika & Compliance Anti Korupsi 2026', duration: 4, category: 'COMPLIANCE', mandatory: true, desc: 'Panduan Good Corporate Governance (GCG).' },
    { code: 'ONB-001', title: 'Onboarding: Budaya Perusahaan', duration: 6, category: 'ONBOARDING', mandatory: true, desc: 'Budaya kerja dan core values ERP.' },
    { code: 'TEC-550', title: 'Pengoperasian Forklift Tingkat Lanjut', duration: 24, category: 'TECHNICAL', mandatory: false, desc: 'Sertifikasi Operator Alat Berat.' },
    { code: 'TEC-600', title: 'Cisco Networking Security Basics', duration: 40, category: 'TECHNICAL', mandatory: false, desc: 'Materi IT & Infrastruktur Jaringan.' },
    { code: 'LDR-900', title: 'Managerial & Leadership BootCamp', duration: 32, category: 'LEADERSHIP', mandatory: false, desc: 'Workshop bagi talent-talent promosi supervisor.' }
];
async function main() {
    const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
    const tenant = await prisma.tenant.findUnique({ where: { name: tenantName } });
    if (!tenant) {
        throw new Error(`Tenant '${tenantName}' not found.`);
    }
    console.log(`🧹 Memulai proses Seeding HRIS LMS untuk tenant: ${tenantName}...`);
    let courses = await prisma.course.findMany({ where: { tenantId: tenant.id } });
    if (courses.length === 0) {
        console.log('📝 Kurikulum Kosong. Menyusun Katalog Training Enterprise...');
        await prisma.course.createMany({
            data: courseMocks.map(m => ({
                tenantId: tenant.id,
                code: m.code,
                title: m.title,
                durationHours: m.duration,
                category: m.category,
                mandatory: m.mandatory,
                description: m.desc,
                status: 'ACTIVE'
            }))
        });
        courses = await prisma.course.findMany({ where: { tenantId: tenant.id } });
        console.log(`✅ ${courses.length} modul training berhasil didaftarkan.`);
    }
    await prisma.courseEnrollment.deleteMany({ where: { tenantId: tenant.id } });
    const employees = await prisma.employee.findMany({ where: { tenantId: tenant.id } });
    if (employees.length === 0) {
        console.log('⚠️ Belum ada data Karyawan untuk didaftarkan.');
        return;
    }
    console.log(`🎓 Mendaftarkan ${employees.length} Karyawan ke dalam kelas-kelas LMS...`);
    let insertedEnrollments = 0;
    const enrollmentsToInject = [];
    for (const emp of employees) {
        const classCount = Math.floor(Math.random() * 3) + 2;
        const shuffled = [...courses].sort(() => 0.5 - Math.random());
        const selectedCourses = shuffled.slice(0, classCount);
        for (const crs of selectedCourses) {
            const rand = Math.random();
            let status = 'ENROLLED';
            let score = null;
            let notes = '';
            const enrolledAt = new Date();
            enrolledAt.setDate(enrolledAt.getDate() - (Math.floor(Math.random() * 90) + 1));
            let completedAt = null;
            if (rand > 0.8) {
                status = 'IN_PROGRESS';
            }
            else if (rand > 0.15) {
                status = 'COMPLETED';
                score = Math.floor(Math.random() * 25) + 75;
                completedAt = new Date(enrolledAt);
                completedAt.setDate(completedAt.getDate() + (Math.floor(Math.random() * 14) + 1));
                notes = `Sertifikat Lulus Diterbitkan. (Scoring Otomatis)`;
            }
            else {
                status = 'FAILED';
                score = Math.floor(Math.random() * 30) + 40;
                completedAt = new Date(enrolledAt);
                completedAt.setDate(completedAt.getDate() + (Math.floor(Math.random() * 14) + 1));
                notes = `Wajib melakukan remediasi ujian bulan depan.`;
            }
            enrollmentsToInject.push({
                tenantId: tenant.id,
                courseId: crs.id,
                employeeId: emp.id,
                enrolledAt,
                completedAt,
                status,
                score,
                notes
            });
        }
    }
    const chunkSize = 100;
    for (let i = 0; i < enrollmentsToInject.length; i += chunkSize) {
        const chunk = enrollmentsToInject.slice(i, i + chunkSize);
        const output = await prisma.courseEnrollment.createMany({ data: chunk });
        insertedEnrollments += output.count;
    }
    console.log(`✅ Berhasil menyimulasikan kelulusan dan nilai untuk ${insertedEnrollments} partisipasi kelas Karyawan.`);
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
//# sourceMappingURL=seed-hris-lms.js.map