"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSupportCompliance = seedSupportCompliance;
async function seedSupportCompliance(prisma, tenantId) {
    console.log('🛡️ Seeding Professional Support Compliance (CMS)...');
    const employees = await prisma.employee.findMany({ where: { tenantId } });
    const depts = await prisma.organizationUnit.findMany({ where: { tenantId } });
    if (employees.length === 0 || depts.length === 0) {
        console.log('⚠️ Missing prerequisites (Employees/Depts). Skipping compliance seed.');
        return;
    }
    const complianceData = [
        {
            code: 'CMP-SMK3-001',
            title: 'Sertifikasi SMK3 (Health & Safety)',
            type: 'CERTIFICATION',
            category: 'HSE',
            issuingBody: 'Kemenaker RI',
            status: 'ACTIVE',
            effectiveDate: new Date('2024-01-01'),
            expiryDate: new Date('2027-01-01'),
            riskLevel: 'CRITICAL',
            description: 'Sistem Manajemen Keselamatan dan Kesehatan Kerja tingkat nasional.',
        },
        {
            code: 'CMP-SIO-EXC',
            title: 'SIO Operator Excavator (Standard)',
            type: 'CERTIFICATION',
            category: 'HSE',
            issuingBody: 'Sucofindo / Kemenaker',
            status: 'ACTIVE',
            effectiveDate: new Date('2024-02-10'),
            expiryDate: new Date('2025-02-10'),
            riskLevel: 'HIGH',
            description: 'Lisensi operator alat berat untuk unit proyek jembatan.',
        },
        {
            code: 'CMP-NIB-2024',
            title: 'Nomor Induk Berusaha (NIB 2024)',
            type: 'PERMIT',
            category: 'LEGAL',
            issuingBody: 'OSS RBA - Mandiri',
            status: 'ACTIVE',
            effectiveDate: new Date('2024-01-15'),
            expiryDate: null,
            riskLevel: 'CRITICAL',
            description: 'Izin dasar operasional perusahaan di wilayah NKRI.',
        },
        {
            code: 'CMP-AMDAL-01',
            title: 'Izin Lingkungan (AMDAL) - Site A',
            type: 'PERMIT',
            category: 'LEGAL',
            issuingBody: 'Dinas Lingkungan Hidup',
            status: 'ACTIVE',
            effectiveDate: new Date('2023-11-20'),
            expiryDate: new Date('2026-11-20'),
            riskLevel: 'HIGH',
            description: 'Dokumen kelayakan lingkungan untuk area konstruksi zona utara.',
        },
        {
            code: 'CMP-ISO-9001',
            title: 'ISO 9001:2015 Quality Management',
            type: 'CERTIFICATION',
            category: 'QUALITY',
            issuingBody: 'BSI (British Standards Institution)',
            status: 'ACTIVE',
            effectiveDate: new Date('2024-03-01'),
            expiryDate: new Date('2027-03-01'),
            riskLevel: 'MEDIUM',
            description: 'Standar internasional untuk sistem manajemen mutu perusahaan.',
        },
        {
            code: 'CMP-ISO-45001',
            title: 'ISO 45001 Occupational Health & Safety',
            type: 'CERTIFICATION',
            category: 'QUALITY',
            issuingBody: 'TÜV Rheinland',
            status: 'ACTIVE',
            effectiveDate: new Date('2024-05-15'),
            expiryDate: new Date('2027-05-15'),
            riskLevel: 'HIGH',
            description: 'Standar kesehatan dan keselamatan kerja internasional.',
        },
        {
            code: 'CMP-PKP-001',
            title: 'Sertifikat Pengukuhan PKP',
            type: 'REGISTRATION',
            category: 'FINANCE',
            issuingBody: 'Direktorat Jenderal Pajak',
            status: 'ACTIVE',
            effectiveDate: new Date('2022-01-01'),
            expiryDate: null,
            riskLevel: 'HIGH',
            description: 'Surat resmi sebagai Pengusaha Kena Pajak.',
        },
        {
            code: 'CMP-AUDIT-2023',
            title: 'Laporan Audit Akuntan Publik 2023',
            type: 'REGISTRATION',
            category: 'FINANCE',
            issuingBody: 'KAP Tanudiredja Wibisana',
            status: 'ACTIVE',
            effectiveDate: new Date('2024-04-15'),
            expiryDate: new Date('2025-04-15'),
            riskLevel: 'MEDIUM',
            description: 'Arsip opini audit tahunan untuk kepatuhan stakeholder.',
        },
        {
            code: 'CMP-SLF-GUDANG',
            title: 'Sertifikat Laik Fungsi (SLF) - Gudang B',
            type: 'PERMIT',
            category: 'TECHNICAL',
            issuingBody: 'DPMPTSP / Dinas Tata Kota',
            status: 'ACTIVE',
            effectiveDate: new Date('2024-06-01'),
            expiryDate: new Date('2029-06-01'),
            riskLevel: 'MEDIUM',
            description: 'Izin pemakaian bangunan gedung untuk operasional logistik.',
        }
    ];
    for (let i = 0; i < complianceData.length; i++) {
        const data = complianceData[i];
        const employee = employees[i % employees.length];
        const dept = depts[i % depts.length];
        await prisma.supportCompliance.upsert({
            where: { tenantId_code: { tenantId, code: data.code } },
            update: {
                title: data.title,
                status: data.status,
                ownerId: employee.id,
                departmentId: dept.id,
                effectiveDate: data.effectiveDate,
                expiryDate: data.expiryDate,
                description: data.description,
                riskLevel: data.riskLevel,
            },
            create: {
                tenantId,
                code: data.code,
                title: data.title,
                type: data.type,
                category: data.category,
                issuingBody: data.issuingBody,
                status: data.status,
                ownerId: employee.id,
                departmentId: dept.id,
                effectiveDate: data.effectiveDate,
                expiryDate: data.expiryDate,
                description: data.description,
                riskLevel: data.riskLevel,
            }
        });
    }
    console.log('✅ Professional Support Compliance records seeded successfully.');
}
//# sourceMappingURL=seed-support-compliance.js.map