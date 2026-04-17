/* eslint-disable no-console */
import { PrismaClient } from './generated/client';

export async function seedSiteReports(prisma: PrismaClient, tenantId: string) {
  console.log('Seeding Daily Site Reports (Phase 2)...');

  // Get existing projects
  const projects = await prisma.project.findMany({
    where: { tenantId },
    include: { wbsTasks: true },
    take: 3,
  });

  if (projects.length === 0) {
    console.log('No projects found, skipping site reports seeding.');
    return;
  }

  const reports = [];
  const statusOptions = ['DRAFT', 'SUBMITTED', 'APPROVED'];
  const weatherOptions = ['Cerah', 'Hujan Deras', 'Gerimis', 'Mendung', 'Berawan'];

  for (const project of projects) {
    // Generate reports for the last 15 days (shorter for faster seeding)
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const morningWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      const afternoonWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      const eveningWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];

      const status = i === 0 ? 'DRAFT' : (i < 3 ? 'SUBMITTED' : 'APPROVED');
      const wbsTask = project.wbsTasks[Math.floor(Math.random() * project.wbsTasks.length)];

      const civilWorks = [
        'Pekerjaan galian struktur pile cap',
        'Pengecoran kolom lantai 3',
        'Pemasangan bekisting balok',
        'Pembesian sloof gedung utama',
        'Urugan tanah kembali area parkir',
      ];
      const workSummary = civilWorks[Math.floor(Math.random() * civilWorks.length)];

      reports.push({
        tenantId,
        projectId: project.id,
        wbsTaskId: wbsTask?.id,
        reportDate: date,
        morningWeather,
        afternoonWeather,
        eveningWeather,
        manpowerSummary: 'Lihat Detail Resource Log',
        equipmentSummary: 'Lihat Detail Resource Log',
        materialSummary: 'Lihat Detail Resource Log',
        workSummary,
        progressPercent: (Math.random() * 2 + 0.1).toFixed(2),
        issues: Math.random() > 0.8 ? 'Keterlambatan pengiriman beton' : 'Nihil',
        status,
        submittedBy: 'admin',
        approvedBy: status === 'APPROVED' ? 'admin' : null,
        approvedAt: status === 'APPROVED' ? new Date() : null,
        // Detailed resources
        resources: [
          { resourceType: 'Semen Tiga Roda', quantity: 50, unit: 'Sak', tenantId },
          { resourceType: 'Pasir Cor', quantity: 2, unit: 'Truk', tenantId },
          { resourceType: 'Besi D16', quantity: 20, unit: 'Batang', tenantId },
          { resourceType: 'Tukang Besi', quantity: 5, unit: 'Orang', tenantId },
          { resourceType: 'Helper', quantity: 10, unit: 'Orang', tenantId },
        ]
      });
    }
  }

  for (const report of reports) {
    const { resources, ...reportData } = report;
    await prisma.dailyReport.upsert({
      where: {
        tenantId_projectId_reportDate: {
          tenantId: reportData.tenantId,
          projectId: reportData.projectId,
          reportDate: reportData.reportDate,
        },
      },
      update: {
        ...reportData,
        resources: {
          deleteMany: {},
          create: resources,
        }
      },
      create: {
        ...reportData,
        resources: {
          create: resources,
        }
      },
    });
  }

  console.log(`Successfully seeded ${reports.length} site reports with detailed resource logs.`);
}
