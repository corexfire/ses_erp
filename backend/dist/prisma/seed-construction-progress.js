"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDailyProgress = seedDailyProgress;
async function seedDailyProgress(prisma, tenantId) {
    console.log('🏗️  Seeding Daily Progress Reports...');
    const projects = await prisma.project.findMany({ where: { tenantId } });
    const subcontractors = await prisma.subcontractor.findMany({ where: { tenantId } });
    if (projects.length === 0)
        return console.log('⚠️  No projects found for seeding progress.');
    const weatherOptions = ['CERAH', 'BERAWAN', 'Hujan Ringan', 'HUJAN LEBAT'];
    const startDay = new Date();
    startDay.setDate(startDay.getDate() - 5);
    for (let i = 0; i < projects.length; i++) {
        const proj = projects[i];
        for (let d = 0; d < 3; d++) {
            const reportDate = new Date(startDay);
            reportDate.setDate(reportDate.getDate() + d);
            await prisma.dailyReport.upsert({
                where: {
                    tenantId_projectId_reportDate: {
                        tenantId,
                        projectId: proj.id,
                        reportDate,
                    }
                },
                update: {},
                create: {
                    tenantId,
                    projectId: proj.id,
                    reportDate,
                    morningWeather: weatherOptions[Math.floor(Math.random() * weatherOptions.length)],
                    afternoonWeather: weatherOptions[Math.floor(Math.random() * weatherOptions.length)],
                    eveningWeather: weatherOptions[Math.floor(Math.random() * weatherOptions.length)],
                    workSummary: `Melanjutkan pekerjaan struktur pada zona ${i + 1}. Pengecoran kolom lantai ${d + 1}.`,
                    progressPercent: (d + 1) * 15,
                    status: d === 2 ? 'SUBMITTED' : 'APPROVED',
                    resources: {
                        create: [
                            { tenantId, resourceType: 'MANPOWER', quantity: 15, unit: 'ORANG', notes: 'Tukang & Helper' },
                            { tenantId, resourceType: 'EQUIPMENT', quantity: 1, unit: 'UNIT', notes: 'Excavator Mini' },
                        ]
                    },
                    subcontractors: {
                        create: subcontractors.slice(0, 2).map(s => ({
                            tenantId,
                            subcontractorId: s.id,
                            subcontractorName: s.name,
                            workerCount: 5,
                            workDescription: 'Pekerjaan galian dan persiapan lahan.'
                        }))
                    }
                }
            });
        }
    }
    console.log('✅ Successfully seeded Daily Progress Reports.');
}
//# sourceMappingURL=seed-construction-progress.js.map