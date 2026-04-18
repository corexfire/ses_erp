"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedQualityDocuments = seedQualityDocuments;
async function seedQualityDocuments(prisma, tenantId) {
    const admin = await prisma.user.findFirst({ where: { tenantId, isSuperAdmin: true } });
    if (!admin) {
        console.log('Skipping Quality Document seed: admin user not found');
        return;
    }
    const documents = [
        {
            code: 'SOP-QA-001',
            title: 'Prosedur Pengendalian Produk Tidak Sesuai',
            category: 'SOP',
            version: '1.0',
            status: 'PUBLISHED',
            effectiveDate: new Date('2024-01-01'),
            ownerId: admin.id,
            notes: 'Dokumen utama untuk alur NCR dan CAPA.',
        },
        {
            code: 'ISO-9001-2015',
            title: 'Sertifikat ISO 9001:2015 - Sistem Manajemen Mutu',
            category: 'ISO',
            version: '2015',
            status: 'PUBLISHED',
            effectiveDate: new Date('2023-05-20'),
            expiryDate: new Date('2026-05-20'),
            ownerId: admin.id,
            notes: 'Sertifikasi eksternal oleh TUV Rheinland.',
        },
        {
            code: 'WI-PROD-05',
            title: 'Instruksi Kerja Pengoperasian Mesin CNC',
            category: 'WI',
            version: '2.1',
            status: 'UNDER_REVIEW',
            ownerId: admin.id,
            notes: 'Sedang direvisi untuk menyesuaikan model mesin baru.',
        },
        {
            code: 'FORM-QC-LOG',
            title: 'Formulir Log Inspeksi Harian',
            category: 'FORM',
            version: '1.2',
            status: 'PUBLISHED',
            effectiveDate: new Date('2024-02-15'),
            ownerId: admin.id,
        },
    ];
    for (const doc of documents) {
        await prisma.qualityDocument.upsert({
            where: {
                tenantId_code_version: {
                    tenantId,
                    code: doc.code,
                    version: doc.version,
                },
            },
            update: {},
            create: {
                tenantId,
                ...doc,
            },
        });
    }
    console.log('Seeded Quality Documents');
}
//# sourceMappingURL=seed-qms-documents.js.map