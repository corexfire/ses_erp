import { PrismaClient } from './generated/client';

export async function seedHse(prisma: PrismaClient, tenantId: string) {
  console.log('👷 Seeding HSE (Safety) Records...');

  const projects = await prisma.project.findMany({ where: { tenantId } });
  if (projects.length === 0) return console.log('⚠️ No projects found for seeding HSE.');

  const proj = projects[0];

  // Seed Incidents
  const incidents = [
    { 
      type: 'NEAR_MISS', 
      severity: 'MINOR', 
      description: 'Lantai kerja licin di area excavation, pekerja hampir terpeleset.',
      location: 'Area Galian A',
      incidentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      status: 'CLOSED',
      actionTaken: 'Pemasangan rambu peringatan dan pembersihan genangan air.',
      attachments: [
        { name: 'slippery_floor_report.pdf', url: 'https://example.com/docs/hse/slip-1.pdf', type: 'application/pdf' }
      ]
    },
    { 
      type: 'ACCIDENT', 
      severity: 'MAJOR', 
      description: 'Pekerja terjatuh dari scaffolding ketinggian 2 meter.',
      location: 'Block C Lantai 2',
      incidentDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      status: 'CLOSED',
      rootCause: 'Safety harness tidak terpasang dengan benar pada anchor point.',
      attachments: [
        { name: 'incident_photo_1.jpg', url: 'https://example.com/images/hse/fall-1.jpg', type: 'image/jpeg' },
        { name: 'investigation_report.docx', url: 'https://example.com/docs/hse/fall-report.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
      ]
    },
    { 
      type: 'FATAL', 
      severity: 'FATAL', 
      description: 'Tenaga kerja meninggal dunia akibat tertimpa material beton pada saat unloading.',
      location: 'Area Unloading Logistik',
      incidentDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
      status: 'CLOSED',
      actionTaken: 'Audit total prosedur logistik dan kompensasi keluarga.',
      attachments: [
        { name: 'coroner_report.pdf', url: 'https://example.com/docs/hse/fatal-1.pdf', type: 'application/pdf' }
      ]
    }
  ];

  for (const inc of incidents) {
    await prisma.hseIncident.create({
      data: {
        tenantId,
        projectId: proj.id,
        ...inc
      }
    });
  }

  // Seed Inspections
  const inspections = [
    {
      type: 'WEEKLY',
      score: 85.5,
      summary: 'Inspeksi rutin site safety berjalan baik.',
      findings: 'Peralatan APD lengkap, namun penataan material di lobby perlu dirapikan.',
      inspectionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'COMPLETED',
      attachments: [
        { name: 'weekly_checklist.xlsx', url: 'https://example.com/docs/hse/weekly-1.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
      ]
    },
    {
      type: 'AUDIT',
      score: 92.0,
      summary: 'Audit internal K3 bulanan.',
      findings: 'Dokumentasi induction lengkap, hydrant berfungsi normal.',
      inspectionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      status: 'COMPLETED'
    }
  ];

  for (const insp of inspections) {
    await prisma.hseInspection.create({
      data: {
        tenantId,
        projectId: proj.id,
        ...insp
      }
    });
  }

  // Seed some subcontractor logs and attendance to make man-hours non-zero
  // Since 90 days ago (last fatal), we should have significant hours
  const dailyReports = await prisma.dailyReport.findMany({ where: { projectId: proj.id } });
  if (dailyReports.length > 0) {
    for (const dr of dailyReports) {
      await prisma.subcontractorLog.create({
        data: {
          tenantId,
          dailyReportId: dr.id,
          subcontractorName: 'PT Bangun Sejahtera',
          workerCount: 15,
          workDescription: 'Pekerjaan struktur lantai atas'
        }
      });
    }
  }

  console.log('✅ Successfully seeded HSE records.');
}
