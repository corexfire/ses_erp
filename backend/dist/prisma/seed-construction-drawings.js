"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDrawings = seedDrawings;
async function seedDrawings(prisma, tenantId) {
    console.log('🏗️  Seeding Construction Drawings...');
    const projects = await prisma.project.findMany({ where: { tenantId } });
    if (projects.length === 0)
        return console.log('⚠️  No projects found for seeding drawings.');
    const drawData = [
        { code: 'ARCH-001', title: 'Layout Denah Lantai 1', discipline: 'ARCHITECTURAL', category: 'SHOP_DRAWING', revision: '0' },
        { code: 'ARCH-001', title: 'Layout Denah Lantai 1', discipline: 'ARCHITECTURAL', category: 'SHOP_DRAWING', revision: 'A', status: 'REVISED' },
        { code: 'STR-001', title: 'Detail Pembesian Kolom K1', discipline: 'STRUCTURAL', category: 'FOR_CONSTRUCTION', revision: '0' },
        { code: 'MEP-001', title: 'Single Line Diagram Panel Utama', discipline: 'MEP', category: 'SHOP_DRAWING', revision: '0' },
        { code: 'ARCH-002', title: 'Potongan A-A & B-B', discipline: 'ARCHITECTURAL', category: 'FOR_CONSTRUCTION', revision: '1' },
    ];
    for (const d of drawData) {
        const proj = projects[0];
        await prisma.constructionDrawing.upsert({
            where: {
                tenantId_projectId_code_revision: {
                    tenantId,
                    projectId: proj.id,
                    code: d.code,
                    revision: d.revision,
                }
            },
            update: {},
            create: {
                tenantId,
                projectId: proj.id,
                code: d.code,
                title: d.title,
                discipline: d.discipline,
                category: d.category,
                revision: d.revision,
                revisionDate: new Date(),
                status: d.status || 'APPROVED',
            }
        });
    }
    console.log('✅ Successfully seeded Construction Drawings.');
}
//# sourceMappingURL=seed-construction-drawings.js.map