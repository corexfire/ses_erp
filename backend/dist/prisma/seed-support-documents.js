"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSupportDocuments = seedSupportDocuments;
async function seedSupportDocuments(prisma, tenantId) {
    console.log('📜 Seeding Professional Support Documents (DMS)...');
    const employees = await prisma.employee.findMany({ where: { tenantId } });
    const depts = await prisma.organizationUnit.findMany({ where: { tenantId } });
    if (employees.length === 0 || depts.length === 0) {
        console.log('⚠️ Missing prerequisites (Employees/Depts). Skipping document seed.');
        return;
    }
    const docsData = [
        {
            code: 'LGL-SIUP-001',
            title: 'Surat Izin Usaha Perdagangan (SIUP)',
            category: 'LEGAL',
            version: '1.0',
            status: 'PUBLISHED',
            effectiveDate: new Date('2024-01-01'),
            expiryDate: new Date('2029-01-01'),
            description: 'Izin usaha utama perusahaan untuk operasional perdagangan umum.',
        },
        {
            code: 'LGL-NIB-001',
            title: 'Nomor Induk Berusaha (NIB)',
            category: 'LEGAL',
            version: '1.2',
            status: 'PUBLISHED',
            effectiveDate: new Date('2024-02-15'),
            expiryDate: null,
            description: 'Identitas pelaku usaha resmi OSS RBA.',
        },
        {
            code: 'HR-SOP-011',
            title: 'SOP Proses Rekrutmen & Onboarding',
            category: 'HR',
            version: '2.0',
            status: 'PUBLISHED',
            effectiveDate: new Date('2024-03-01'),
            expiryDate: new Date('2025-03-01'),
            description: 'Prosedur standar penerimaan karyawan baru.',
        },
        {
            code: 'HR-HB-2024',
            title: 'Employee Handbook 2024',
            category: 'HR',
            version: '1.0',
            status: 'UNDER_REVIEW',
            description: 'Buku panduan hak dan kewajiban karyawan.',
        },
        {
            code: 'TEC-DWG-BRG-01',
            title: 'Site Layout Plan - Bridge Site A',
            category: 'TECHNICAL',
            version: '4.1',
            status: 'PUBLISHED',
            effectiveDate: new Date('2024-05-10'),
            description: 'Gambar teknis tata letak area konstruksi jembatan.',
        },
        {
            code: 'TEC-MSR-005',
            title: 'Method Statement: Bored Pile Installation',
            category: 'TECHNICAL',
            version: '1.0',
            status: 'PUBLISHED',
            description: 'Metode kerja pemasangan bored pile pada area lunak.',
        },
        {
            code: 'OPS-INS-FLEET',
            title: 'Polis Asuransi Armada Kendaraan 2024',
            category: 'OPERATIONAL',
            version: '1.0',
            status: 'PUBLISHED',
            effectiveDate: new Date('2024-01-01'),
            expiryDate: new Date('2024-12-31'),
            description: 'Dokumen asuransi komprehensif untuk seluruh unit kendaraan.',
        },
        {
            code: 'OPS-TEN-099',
            title: 'Dokumen Tender: Pengadaan Material Beton',
            category: 'OPERATIONAL',
            version: '1.5',
            status: 'ARCHIVED',
            effectiveDate: new Date('2023-11-20'),
            expiryDate: new Date('2024-05-20'),
            description: 'Arsip penawaran harga dan spesifikasi material beton.',
        }
    ];
    for (let i = 0; i < docsData.length; i++) {
        const doc = docsData[i];
        const employee = employees[i % employees.length];
        const dept = depts[i % depts.length];
        await prisma.supportDocument.upsert({
            where: {
                tenantId_code_version: {
                    tenantId,
                    code: doc.code,
                    version: doc.version
                }
            },
            update: {
                title: doc.title,
                status: doc.status,
                authorId: employee.id,
                departmentId: dept.id,
                effectiveDate: doc.effectiveDate,
                expiryDate: doc.expiryDate,
                description: doc.description,
            },
            create: {
                tenantId,
                code: doc.code,
                title: doc.title,
                category: doc.category,
                version: doc.version,
                status: doc.status,
                authorId: employee.id,
                departmentId: dept.id,
                effectiveDate: doc.effectiveDate,
                expiryDate: doc.expiryDate,
                description: doc.description,
            }
        });
    }
    console.log('✅ Professional Support Documents seeded successfully.');
}
//# sourceMappingURL=seed-support-documents.js.map