import { PrismaClient } from './generated/client';

export async function seedSupportBiIntegrated(prisma: PrismaClient, tenantId: string) {
  console.log('🌱 Seeding Integrated Support BI (10+ Records) for FY 2026...');

  // Pre-requisites: Get an employee to be document author / compliance owner
  const employee = await prisma.employee.findFirst({ where: { tenantId } });
  const department = await prisma.organizationUnit.findFirst({ where: { tenantId } });

  // ──────────────────────────────────────────────────────────────
  // 1. SUPPORT DOCUMENTS (4 records - feeds `totalDocuments`)
  // ──────────────────────────────────────────────────────────────
  console.log('   📄 Seeding Support Documents...');
  const documents = [
    { code: 'DOC-LEGAL-001', title: 'Akta Pendirian PT & Anggaran Dasar', category: 'LEGAL', status: 'PUBLISHED', version: '3.0' },
    { code: 'DOC-HR-001', title: 'Peraturan Perusahaan (PP) FY 2026', category: 'HR', status: 'PUBLISHED', version: '2.1' },
    { code: 'DOC-TECH-001', title: 'SOP Operasional Alat Berat - Crane Tower', category: 'TECHNICAL', status: 'PUBLISHED', version: '1.5' },
    { code: 'DOC-HSE-001', title: 'Emergency Response Plan (ERP) 2026', category: 'OPERATIONAL', status: 'PUBLISHED', version: '1.2' },
    { code: 'DOC-QA-001', title: 'Quality Manual ISO 9001:2015', category: 'TECHNICAL', status: 'UNDER_REVIEW', version: '4.0' },
  ];

  for (const d of documents) {
    await prisma.supportDocument.upsert({
      where: { tenantId_code_version: { tenantId, code: d.code, version: d.version } },
      update: { status: d.status },
      create: {
        tenantId,
        code: d.code,
        title: d.title,
        category: d.category,
        version: d.version,
        status: d.status,
        effectiveDate: new Date('2026-01-01'),
        expiryDate: new Date('2027-12-31'),
        authorId: employee?.id,
        departmentId: department?.id,
        description: `Dokumen resmi perusahaan kategori ${d.category}.`
      }
    });
  }

  // ──────────────────────────────────────────────────────────────
  // 2. SUPPORT COMPLIANCE (4 records - feeds `totalComplianceRecords`)
  // ──────────────────────────────────────────────────────────────
  console.log('   🛡️  Seeding Support Compliance / Certifications...');
  const compliances = [
    { code: 'COMP-ISO9001', title: 'Sertifikasi ISO 9001:2015 (Quality)', type: 'CERTIFICATION', category: 'QUALITY', issuingBody: 'TUV Rheinland', status: 'ACTIVE', riskLevel: 'MEDIUM', expiry: '2026-06-30' },
    { code: 'COMP-ISO14001', title: 'Sertifikasi ISO 14001:2015 (Environment)', type: 'CERTIFICATION', category: 'HSE', issuingBody: 'SGS Indonesia', status: 'ACTIVE', riskLevel: 'HIGH', expiry: '2027-03-15' },
    { code: 'COMP-SMK3', title: 'Sertifikat SMK3 (Sistem Manajemen K3)', type: 'CERTIFICATION', category: 'HSE', issuingBody: 'Kementerian Ketenagakerjaan RI', status: 'ACTIVE', riskLevel: 'HIGH', expiry: '2026-11-01' },
    { code: 'COMP-NIB', title: 'Nomor Induk Berusaha (NIB)', type: 'PERMIT', category: 'LEGAL', issuingBody: 'OSS / BKPM', status: 'ACTIVE', riskLevel: 'LOW', expiry: '2099-12-31' },
    { code: 'COMP-SPPKP', title: 'Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)', type: 'REGISTRATION', category: 'FINANCIAL', issuingBody: 'Direktorat Jenderal Pajak', status: 'ACTIVE', riskLevel: 'HIGH', expiry: '2099-12-31' },
  ];

  for (const c of compliances) {
    await prisma.supportCompliance.upsert({
      where: { tenantId_code: { tenantId, code: c.code } },
      update: { status: c.status },
      create: {
        tenantId,
        code: c.code,
        title: c.title,
        type: c.type,
        category: c.category,
        issuingBody: c.issuingBody,
        status: c.status,
        riskLevel: c.riskLevel,
        effectiveDate: new Date('2024-01-01'),
        expiryDate: new Date(c.expiry),
        nextAuditDate: new Date('2026-10-01'),
        ownerId: employee?.id,
        departmentId: department?.id,
        description: `Dokumen kepatuhan regulasi: ${c.title}.`
      }
    });
  }

  // ──────────────────────────────────────────────────────────────
  // 3. SUPPORT KPI (10+ records - Core of the BI Dashboard)
  // ──────────────────────────────────────────────────────────────
  console.log('   📊 Seeding Support KPIs (10+ records)...');

  const periods = ['2026-Q1', '2026-Q2'];
  const kpiDefinitions = [
    // ASSET KPIs
    { code: 'KPI-ASSET-UTIL', name: 'Utilisasi Aset Produksi', category: 'ASSET', unit: 'PERCENT', target: 85, actuals: [78, 83] },
    { code: 'KPI-ASSET-MAINT', name: 'Maintenance On-Time Rate', category: 'ASSET', unit: 'PERCENT', target: 95, actuals: [92, 97] },
    // COMPLIANCE KPIs
    { code: 'KPI-COMP-CERT', name: 'Compliance Certificate Validity', category: 'COMPLIANCE', unit: 'PERCENT', target: 100, actuals: [80, 100] },
    { code: 'KPI-COMP-AUDIT', name: 'Audit Finding Closure Rate', category: 'COMPLIANCE', unit: 'PERCENT', target: 90, actuals: [75, 88] },
    // DOCUMENT KPIs
    { code: 'KPI-DOC-REVIEW', name: 'Document Review On-Time (%)', category: 'DOCUMENT', unit: 'PERCENT', target: 95, actuals: [90, 94] },
    { code: 'KPI-DOC-VERSION', name: 'Obsolete Document Clearance', category: 'DOCUMENT', unit: 'PERCENT', target: 100, actuals: [85, 100] },
    // HSE KPIs
    { code: 'KPI-HSE-LTIFR', name: 'Lost Time Injury Frequency Rate', category: 'HSE', unit: 'COUNT', target: 0, actuals: [2, 0] },
    { code: 'KPI-HSE-TRAINING', name: 'HSE Training Completion Rate', category: 'HSE', unit: 'PERCENT', target: 100, actuals: [82, 100] },
  ];

  for (const kpi of kpiDefinitions) {
    for (let pi = 0; pi < periods.length; pi++) {
      const actual = kpi.actuals[pi];
      const status = kpi.code.includes('LTIFR')
        ? (actual === 0 ? 'ON_TRACK' : actual <= 2 ? 'AT_RISK' : 'BEHIND')
        : (actual >= kpi.target ? 'ON_TRACK' : actual >= kpi.target * 0.9 ? 'AT_RISK' : 'BEHIND');

      await prisma.supportKpi.upsert({
        where: { tenantId_code_period: { tenantId, code: kpi.code, period: periods[pi] } },
        update: { actualValue: actual, status },
        create: {
          tenantId,
          code: kpi.code,
          name: kpi.name,
          category: kpi.category,
          period: periods[pi],
          targetValue: kpi.target,
          actualValue: actual,
          unit: kpi.unit,
          status,
          notes: `Auto-seeded for BI Dashboard FY 2026.`
        }
      });
    }
  }

  // ──────────────────────────────────────────────────────────────
  // 4. SUSTAINABILITY METRICS (Integration with BI trend/analytics)
  // ──────────────────────────────────────────────────────────────
  console.log('   ♻️  Seeding Sustainability Metrics...');
  const employee2 = await prisma.employee.findFirst({ where: { tenantId }, skip: 1 });
  const sustainabilityData = [
    { code: 'SUST-EMIS-Q1', type: 'EMISSION', indicator: 'Total GHG Emission', period: '2026-Q1', value: 124.5, target: 100, unit: 'tCO2e', status: 'VERIFIED' },
    { code: 'SUST-ENERGY-Q1', type: 'ENERGY', indicator: 'Konsumsi Listrik', period: '2026-Q1', value: 48000, target: 50000, unit: 'kWh', status: 'VERIFIED' },
    { code: 'SUST-WATER-Q1', type: 'WATER', indicator: 'Penggunaan Air Bersih', period: '2026-Q1', value: 850, target: 1000, unit: 'm3', status: 'SUBMITTED' },
    { code: 'SUST-WASTE-Q1', type: 'WASTE', indicator: 'Limbah B3 Terkelola', period: '2026-Q1', value: 12.3, target: 10, unit: 'ton', status: 'SUBMITTED' },
    { code: 'SUST-SOCIAL-Q1', type: 'SOCIAL', indicator: 'Jam Pelatihan Karyawan', period: '2026-Q1', value: 320, target: 300, unit: 'Hours', status: 'VERIFIED' },
  ];

  for (const s of sustainabilityData) {
    await prisma.supportSustainability.upsert({
      where: { tenantId_code: { tenantId, code: s.code } },
      update: { value: s.value, status: s.status },
      create: {
        tenantId,
        code: s.code,
        type: s.type,
        indicator: s.indicator,
        period: s.period,
        value: s.value,
        target: s.target,
        unit: s.unit,
        status: s.status,
        recordedById: employee?.id,
        verifiedById: s.status === 'VERIFIED' ? (employee2?.id ?? employee?.id) : undefined,
        description: `Pengukuran ${s.indicator} Periode ${s.period}.`
      }
    });
  }

  const totalKpis = kpiDefinitions.length * periods.length;
  console.log(`✅ Integrated Support BI Seeding Complete! (Documents: ${documents.length}, Compliance: ${compliances.length}, KPIs: ${totalKpis}, Sustainability: ${sustainabilityData.length})`);
}
