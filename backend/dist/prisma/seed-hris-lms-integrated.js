"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedHrisLmsIntegrated = seedHrisLmsIntegrated;
async function seedHrisLmsIntegrated(prisma, tenantId) {
    console.log('🌱 Seeding Integrated HRIS LMS Data for FY 2026...');
    const courses = [
        { code: 'HSE-101', title: 'Sertifikasi K3 Keselamatan Kerja', duration: 16, category: 'SAFETY', mandatory: true, desc: 'Latihan wajib bagi staf operasional lapangan.' },
        { code: 'ETH-200', title: 'Compliance & GCG 2026', duration: 4, category: 'COMPLIANCE', mandatory: true, desc: 'Panduan tata kelola perusahaan yang baik.' },
        { code: 'TEC-550', title: 'Advanced Forklift & Heavy Equipment', duration: 24, category: 'TECHNICAL', mandatory: false, desc: 'Sertifikasi operator alat berat.' },
        { code: 'ONB-001', title: 'Company Onboarding & Culture', duration: 8, category: 'ONBOARDING', mandatory: true, desc: 'Pengenalan budaya dan nilai inti perusahaan.' }
    ];
    const dbCourses = [];
    for (const c of courses) {
        const course = await prisma.course.upsert({
            where: { tenantId_code: { tenantId, code: c.code } },
            update: { title: c.title, durationHours: c.duration, category: c.category, mandatory: c.mandatory, description: c.desc },
            create: { tenantId, code: c.code, title: c.title, durationHours: c.duration, category: c.category, mandatory: c.mandatory, description: c.desc }
        });
        dbCourses.push(course);
    }
    const employees = await prisma.employee.findMany({ where: { tenantId } });
    for (const emp of employees) {
        const universalMandatory = dbCourses.filter(c => ['ETH-200', 'ONB-001'].includes(c.code));
        const dept = (emp.department || '').toUpperCase();
        const safetyMandatory = (dept.includes('PROJECT') || dept.includes('HSE') || dept.includes('OPS'))
            ? dbCourses.filter(c => c.code === 'HSE-101')
            : [];
        const targetedCourses = [...universalMandatory, ...safetyMandatory];
        let completedCount = 0;
        let totalScore = 0;
        for (const crs of targetedCourses) {
            const isCompleted = Math.random() > 0.15;
            const status = isCompleted ? 'COMPLETED' : 'IN_PROGRESS';
            const score = isCompleted ? Math.floor(Math.random() * 20) + 81 : null;
            const completedAt = isCompleted ? new Date('2026-03-15') : null;
            const existing = await prisma.courseEnrollment.findFirst({
                where: { tenantId, courseId: crs.id, employeeId: emp.id }
            });
            if (existing) {
                await prisma.courseEnrollment.update({
                    where: { id: existing.id },
                    data: { status, score, completedAt }
                });
            }
            else {
                await prisma.courseEnrollment.create({
                    data: {
                        tenantId,
                        courseId: crs.id,
                        employeeId: emp.id,
                        status,
                        score,
                        completedAt,
                        enrolledAt: new Date('2026-01-10')
                    }
                });
            }
            if (isCompleted && score) {
                completedCount++;
                totalScore += score;
            }
        }
        if (completedCount === targetedCourses.length && targetedCourses.length > 0) {
            const avgScore = totalScore / completedCount;
            if (avgScore > 90) {
                await prisma.kpiEvaluation.upsert({
                    where: { tenantId_employeeId_period: { tenantId, employeeId: emp.id, period: '2026-Q1' } },
                    update: {
                        score: 95.00,
                        grade: 'A+',
                        comments: `Top Learner - Menyelesaikan seluruh training wajib dengan predikat sangat baik (Avg: ${avgScore.toFixed(2)}).`,
                        status: 'APPROVED'
                    },
                    create: {
                        tenantId,
                        employeeId: emp.id,
                        period: '2026-Q1',
                        score: 95.00,
                        grade: 'A+',
                        comments: `Top Learner - Menyelesaikan seluruh training wajib dengan predikat sangat baik (Avg: ${avgScore.toFixed(2)}).`,
                        status: 'APPROVED'
                    }
                });
            }
        }
    }
    console.log('✅ Integrated LMS Seeding Complete!');
}
//# sourceMappingURL=seed-hris-lms-integrated.js.map