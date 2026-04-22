"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedConstructionMR = seedConstructionMR;
async function seedConstructionMR(prisma, tenantId) {
    console.log('🏗️  Seeding Construction Material Requests...');
    const projects = await prisma.project.findMany({
        where: { tenantId },
        include: { wbsTasks: true }
    });
    const admins = await prisma.user.findMany({
        where: { tenantId, isSuperAdmin: true }
    });
    if (projects.length === 0 || admins.length === 0) {
        console.log('⚠️ Missing projects or admin users. Skipping MR seed.');
        return;
    }
    const items = await prisma.item.findMany({
        where: { tenantId },
        take: 10
    });
    const statuses = ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'FULFILLED'];
    const priorities = ['LOW', 'NORMAL', 'HIGH', 'URGENT'];
    for (const project of projects) {
        const wbsTasks = project.wbsTasks;
        for (let i = 0; i < 3; i++) {
            const requestDate = new Date();
            requestDate.setDate(requestDate.getDate() - (i * 2));
            const status = statuses[i % statuses.length];
            const priority = priorities[i % priorities.length];
            const wbsTask = wbsTasks[i % wbsTasks.length];
            await prisma.constructionMaterialRequest.upsert({
                where: {
                    tenantId_code: {
                        tenantId,
                        code: `MR-${project.code}-${(i + 1).toString().padStart(3, '0')}`
                    }
                },
                update: {},
                create: {
                    tenantId,
                    code: `MR-${project.code}-${(i + 1).toString().padStart(3, '0')}`,
                    projectId: project.id,
                    wbsTaskId: wbsTask?.id,
                    requestDate,
                    status,
                    priority,
                    notes: `Material request for ${wbsTask?.taskName || 'general site use'}.`,
                    requestedById: admins[0].id,
                    items: {
                        create: [
                            {
                                tenantId,
                                itemId: items[0]?.id,
                                description: items[0]?.name || 'Semen Holcim 50kg',
                                quantity: 100,
                                uomCode: 'ZAK',
                                requiredDate: new Date(),
                                notes: 'Beli yang grade A'
                            },
                            {
                                tenantId,
                                itemId: items[1]?.id,
                                description: items[1]?.name || 'Pasir Cor',
                                quantity: 5,
                                uomCode: 'M3',
                                requiredDate: new Date(),
                                notes: 'Pasir hitam'
                            }
                        ]
                    }
                }
            });
        }
    }
    console.log('✅ Successfully seeded Construction Material Requests.');
}
//# sourceMappingURL=seed-construction-mr.js.map