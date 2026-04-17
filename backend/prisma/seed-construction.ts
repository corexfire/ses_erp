/* eslint-disable no-console */
import { PrismaClient } from './generated/client';

export async function seedConstruction(prisma: PrismaClient, tenantId: string) {
  console.log('🏗️  Seeding Advanced Construction Management Data...');

  // 1. Seed Employees (Managers & HSE)
  const managers = [
    { firstName: 'Ahmad', lastName: 'Zulkarnain', employeeNo: 'PM-001', department: 'PROJECT', position: 'Project Manager' },
    { firstName: 'Bambang', lastName: 'Hartono', employeeNo: 'PM-002', department: 'PROJECT', position: 'Site Manager' },
  ];
  const hseOfficers = [
    { firstName: 'Deny', lastName: 'Prasetyo', employeeNo: 'HSE-001', department: 'HSE', position: 'Safety Officer' },
  ];

  const managerRecords = await Promise.all(managers.map(m => 
    prisma.employee.upsert({
      where: { tenantId_employeeNo: { tenantId, employeeNo: m.employeeNo } },
      update: m,
      create: { ...m, tenantId, email: `${m.employeeNo.toLowerCase()}@ses-erp.local` }
    })
  ));

  const hseRecords = await Promise.all(hseOfficers.map(h => 
    prisma.employee.upsert({
      where: { tenantId_employeeNo: { tenantId, employeeNo: h.employeeNo } },
      update: h,
      create: { ...h, tenantId, email: `${h.employeeNo.toLowerCase()}@ses-erp.local` }
    })
  ));

  // 2. Clear existing reports for clean seed if needed
  // await prisma.dailyReport.deleteMany({ where: { tenantId } });

  let projects = await prisma.project.findMany({
    where: { tenantId },
    include: { wbsTasks: true }
  });

  if (projects.length === 0) {
    const defaultProject = await prisma.project.create({
      data: {
        tenantId,
        name: 'Pembangunan Gedung Perkantoran (Default Seed)',
        code: 'PRJ-2026-001',
        description: 'Proyek Konstruksi High-Rise Building Pusat Kota',
        status: 'IN_PROGRESS',
        totalBudget: 25000000000,
        wbsTasks: {
          create: [
            { tenantId, taskCode: 'WBS-01', taskName: 'Pekerjaan Struktur', level: 1 },
            { tenantId, taskCode: 'WBS-02', taskName: 'Pekerjaan Arsitektur', level: 1 },
            { tenantId, taskCode: 'WBS-03', taskName: 'Pekerjaan ME', level: 1 },
          ]
        }
      },
      include: { wbsTasks: true }
    });
    projects = [defaultProject];
  }

  const reports = [];
  const weatherOptions = ['Cerah', 'Cerah Berawan', 'Hujan Ringan', 'Hujan Deras', 'Mendung'];
  
  const constructionActivities = [
    { 
      summary: 'Pengecoran Plat Lantai 3 Zona A', 
      safety: 'Pemasangan safety net dan railing area void selesai. Pekerja menggunakan body harness.',
      resources: [
        { type: 'Beton K-350', qty: 45, unit: 'm3' },
        { type: 'Concrete Pump', qty: 1, unit: 'Unit' },
        { type: 'Tukang Cor', qty: 12, unit: 'Orang' }
      ],
      subcons: [{ name: 'CV. Maju Jaya Beton', workers: 8, work: 'Finishing Trowel' }]
    },
    { 
      summary: 'Pembesian Kolom Lt 4 & Bekisting', 
      safety: 'Inspeksi Scaffolding dilakukan sebelum naik. Area kerja bersih.',
      resources: [
        { type: 'Besi D22', qty: 120, unit: 'Batang' },
        { type: 'Kawat Bendrat', qty: 5, unit: 'Roll' },
        { type: 'Tukang Besi', qty: 15, unit: 'Orang' }
      ],
      subcons: [{ name: 'PT. Baja Perkasa', workers: 10, work: 'Rakitan Pembesian' }]
    },
    { 
      summary: 'Instalasi Pipa ME & Fire Alarm Lt 2', 
      safety: 'Izin kerja panas (hot work) dikeluarkan untuk pengelasan bracket.',
      resources: [
        { type: 'Pipa GIP 2"', qty: 30, unit: 'Batang' },
        { type: 'Manifold', qty: 4, unit: 'Unit' },
        { type: 'Teknisi ME', qty: 6, unit: 'Orang' }
      ],
      subcons: [{ name: 'PT. Multi Teknik', workers: 4, work: 'Instalasi Hydrant' }]
    },
    { 
      summary: 'Pekerjaan Pasangan Bata Ringan Lt 1', 
      safety: 'Pastikan debu tidak mengganggu area lain. Masker wajib digunakan.',
      resources: [
        { type: 'Bata Ringan', qty: 8, unit: 'Palet' },
        { type: 'Semen Mortar', qty: 25, unit: 'Sak' },
        { type: 'Tukang Batu', qty: 20, unit: 'Orang' }
      ],
      subcons: []
    }
  ];

  for (const project of projects) {
    // 30 days of data
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const activity = constructionActivities[i % constructionActivities.length];
      const status = i === 0 ? 'DRAFT' : (i < 5 ? 'SUBMITTED' : 'APPROVED');
      const wbs = project.wbsTasks[i % project.wbsTasks.length];

      await prisma.dailyReport.upsert({
        where: {
          tenantId_projectId_reportDate: {
            tenantId,
            projectId: project.id,
            reportDate: date,
          }
        },
        update: {},
        create: {
          tenantId,
          projectId: project.id,
          reportDate: date,
          morningWeather: weatherOptions[Math.floor(Math.random() * weatherOptions.length)],
          afternoonWeather: weatherOptions[Math.floor(Math.random() * weatherOptions.length)],
          eveningWeather: weatherOptions[Math.floor(Math.random() * weatherOptions.length)],
          workSummary: activity.summary,
          safetySummary: activity.safety,
          visitorSummary: i % 7 === 0 ? 'Owner Inspection (Bpk. Bambang)' : 'Nihil',
          issues: i % 10 === 0 ? 'Keterlambatan Logistik Pasir' : 'Nihil',
          progressPercent: (Math.random() * 5 + 0.5).toFixed(2),
          status,
          wbsTaskId: wbs?.id,
          siteManagerId: managerRecords[i % managerRecords.length].id,
          hseOfficerId: hseRecords[0].id,
          submittedBy: 'admin',
          approvedBy: status === 'APPROVED' ? 'admin' : null,
          approvedAt: status === 'APPROVED' ? new Date() : null,
          resources: {
            create: activity.resources.map(r => ({
              tenantId,
              resourceType: r.type,
              quantity: r.qty,
              unit: r.unit
            }))
          },
          subcontractors: {
            create: activity.subcons.map(s => ({
              tenantId,
              subcontractorName: s.name,
              workerCount: s.workers,
              workDescription: s.work
            }))
          }
        }
      });
    }
  }

  console.log('✅ Successfully seeded full construction lifecycle data.');
}
