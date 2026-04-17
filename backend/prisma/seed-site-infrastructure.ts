import type { PrismaClient } from './generated/client';

export async function seedSiteInfrastructure(prisma: PrismaClient, tenantId: string) {
  console.log('🏗️ Seeding Strategic Site Infrastructure...');

  const projects = await prisma.project.findMany({
    where: { tenantId },
    include: { wbsTasks: true }
  });

  if (projects.length === 0) {
    console.log('⚠️ No projects found. Skipping site seed.');
    return;
  }

  const reportsToCreate = [];

  for (const project of projects) {
    const isConstruction = project.name.toLowerCase().includes('construction') || project.name.toLowerCase().includes('bridge');
    
    // Create 2-3 Sites per project
    const zones = ['Zona Utara', 'Zona Selatan', 'Zona Pusat'];
    for (const [i, zone] of zones.entries()) {
      const siteCode = `${project.code}-S${i+1}`;
      const site = await prisma.projectSite.upsert({
        where: { tenantId_siteCode: { tenantId, siteCode } },
        update: {},
        create: {
          tenantId,
          projectId: project.id,
          siteCode,
          name: `${project.name} - ${zone}`,
          address: isConstruction ? `Jl. Raya Proyek No. ${10 + i}, Bekasi` : `Kawasan Industri Sentul Kav. ${5 + i}`,
          city: isConstruction ? 'Bekasi' : 'Bogor',
          province: 'Jawa Barat',
          gpsCoords: isConstruction ? `-6.234${i}, 106.98${i+2}` : `-6.589${i}, 106.84${i+5}`, // Realistic ID coordinates
          contactName: i === 0 ? 'Bapak Wijaya' : 'Ibu Ratna',
          contactPhone: `0812345678${i}`,
          status: 'ACTIVE'
        }
      });

      // Create 3-5 Daily Reports per site
      for (let j = 0; j < 5; j++) {
        const reportDate = new Date();
        reportDate.setDate(reportDate.getDate() - j);
        
        const task = project.wbsTasks[j % project.wbsTasks.length];
        
        await prisma.dailyReport.upsert({
          where: { tenantId_projectId_reportDate: { tenantId, projectId: project.id, reportDate } },
          update: { siteId: site.id },
          create: {
            tenantId,
            projectId: project.id,
            siteId: site.id,
            reportDate,
            morningWeather: j % 2 === 0 ? 'Cerah' : 'Mendung',
            afternoonWeather: j % 3 === 0 ? 'Hujan Ringan' : 'Cerah Berawan',
            eveningWeather: 'Berawan',
            manpowerSummary: isConstruction ? '2 Supervisor, 10 Tukang Besi, 5 Helper' : '1 Manager, 4 SysOps, 2 QA',
            equipmentSummary: isConstruction ? '1 Excavator PC200, 2 Dump Truck' : 'AWS Cloud, Jenkins Runner, Docker Swarm',
            materialSummary: isConstruction ? '50 Zak Semen, 12 Lonjor Besi 12mm' : 'API License, Jira Subscription',
            workSummary: isConstruction ? `Melanjutkan pengecoran kolom pada ${zone} blok ${j+1}.` : `Sprint ${j+1}: Bug fixing and deployment optimization.`,
            progressPercent: 10 + (j * 5),
            issues: j === 2 ? 'Keterlambatan material semen dari vendor.' : 'Normal.',
            status: j === 0 ? 'SUBMITTED' : 'APPROVED',
            wbsTaskId: task?.id,
            createdAt: new Date(),
          }
        });
      }
    }
  }

  console.log('✅ Strategic Site Infrastructure seeded successfully.');
}
