"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedHrisTimesheets = seedHrisTimesheets;
async function seedHrisTimesheets(prisma, tenantId) {
    console.log('⏱️ Seeding 200+ Realistic Timesheet Records...');
    const employees = await prisma.employee.findMany({
        where: { tenantId, status: 'ACTIVE' },
        take: 10
    });
    if (employees.length < 1) {
        console.warn('⚠️ No active employees found for timesheet seeding.');
        return;
    }
    const projects = [
        { name: 'ERP Core Phase 2', tags: ['Development', 'Logic', 'Testing'] },
        { name: 'API Security Audit', tags: ['Security', 'Vulnerability Scan', 'Compliance'] },
        { name: 'Frontend UX Refactor', tags: ['UI/UX', 'Component Library', 'Tailwind'] },
        { name: 'Database Optimization', tags: ['SQL', 'Indexing', 'Query Tuning'] },
        { name: 'Customer Training', tags: ['Onboarding', 'Documentation', 'Live Session'] }
    ];
    const daysInApril = 30;
    const year = 2026;
    const month = 3;
    for (const emp of employees) {
        let recordsCreated = 0;
        for (let d = 1; d <= daysInApril; d++) {
            const date = new Date(year, month, d);
            const dayOfWeek = date.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6)
                continue;
            const numTasks = Math.floor(Math.random() * 2) + 1;
            let dailyHoursLeft = 8 + (Math.random() > 0.8 ? 2 : 0);
            for (let t = 0; t < numTasks; t++) {
                const project = projects[Math.floor(Math.random() * projects.length)];
                const tag = project.tags[Math.floor(Math.random() * project.tags.length)];
                const taskHours = t === numTasks - 1 ? dailyHoursLeft : Math.floor(dailyHoursLeft / 2);
                if (taskHours <= 0)
                    continue;
                await prisma.timesheetEntry.create({
                    data: {
                        tenantId,
                        employeeId: emp.id,
                        date,
                        hours: taskHours,
                        project: project.name,
                        description: `${tag}: ${project.name} detailed task for day ${d}.`,
                    }
                });
                dailyHoursLeft -= taskHours;
                recordsCreated++;
            }
        }
        console.log(`   - Seeded ${recordsCreated} entries for ${emp.firstName}`);
    }
    console.log('✅ HRIS Timesheet Seeding Complete!');
}
//# sourceMappingURL=seed-hris-timesheets.js.map