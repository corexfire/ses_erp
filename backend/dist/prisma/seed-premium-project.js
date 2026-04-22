"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPremiumProject = seedPremiumProject;
async function seedPremiumProject(prisma, tenantId) {
    console.log('💎 Seeding High-Density Premium ERP Project Data...');
    const project = await prisma.project.upsert({
        where: { tenantId_code: { tenantId, code: 'PRJ-2026-MG-001' } },
        update: {
            totalBudget: 250000000000,
            startDate: new Date('2026-01-01'),
            endDate: new Date('2027-12-31'),
        },
        create: {
            tenantId,
            code: 'PRJ-2026-MG-001',
            name: 'Nusantara Global Hub Tower',
            description: 'Mixed-use skyscraper project in central business district. Grade A Office & Retail.',
            status: 'ACTIVE',
            totalBudget: 250000000000,
            startDate: new Date('2026-01-01'),
            endDate: new Date('2027-12-31'),
        }
    });
    await prisma.taskDependency.deleteMany({ where: { tenantId, predecessor: { projectId: project.id } } });
    await prisma.wbsTask.deleteMany({ where: { projectId: project.id, tenantId } });
    const wbsData = [
        { code: '01.01', name: 'Architectural Design Finalization', weight: 1, duration: 20, startOffset: 0, progress: 100 },
        { code: '01.02', name: 'Permit & License Approval', weight: 1, duration: 30, startOffset: 15, progress: 100 },
        { code: '01.03', name: 'Site Mobilization & Fencing', weight: 1, duration: 15, startOffset: 45, progress: 100 },
        { code: '02.01', name: 'Piling Work Zone A', weight: 4, duration: 40, startOffset: 60, progress: 100 },
        { code: '02.02', name: 'Piling Work Zone B', weight: 4, duration: 40, startOffset: 75, progress: 90 },
        { code: '02.03', name: 'Deep Excavation Main Core', weight: 5, duration: 50, startOffset: 85, progress: 85 },
        { code: '02.04', name: 'Dewatering System Setup', weight: 2, duration: 90, startOffset: 95, progress: 75 },
        { code: '02.05', name: 'Raft Foundation - Pour 1', weight: 3, duration: 10, startOffset: 110, progress: 60 },
        { code: '02.06', name: 'Raft Foundation - Pour 2', weight: 3, duration: 10, startOffset: 125, progress: 20 },
        { code: '03.01', name: 'Basement Wall Casting B1', weight: 3, duration: 25, startOffset: 115, progress: 15 },
        { code: '03.02', name: 'Basement Wall Casting B2', weight: 3, duration: 25, startOffset: 120, progress: 10 },
        { code: '03.03', name: 'Slipform System Installation', weight: 5, duration: 20, startOffset: 130, progress: 0 },
        { code: '03.04', name: 'Floor Slab L1 - Zone A', weight: 2, duration: 14, startOffset: 140, progress: 0 },
        { code: '03.05', name: 'Floor Slab L1 - Zone B', weight: 2, duration: 14, startOffset: 145, progress: 0 },
        { code: '03.06', name: 'Core Wall Casting Floor 2-5', weight: 4, duration: 60, startOffset: 150, progress: 0 },
        { code: '04.01', name: 'Plumbing Main Pipe Zone A', weight: 2, duration: 30, startOffset: 135, progress: 5 },
        { code: '04.02', name: 'Fire Protection Pipe Zone B', weight: 2, duration: 30, startOffset: 140, progress: 0 },
        { code: '04.03', name: 'Electrical Conduits Basement', weight: 2, duration: 45, startOffset: 145, progress: 0 },
        { code: '04.04', name: 'HVAC Ducting L1-L3', weight: 3, duration: 60, startOffset: 160, progress: 0 },
        { code: '05.01', name: 'Elevator System Procurement', weight: 5, duration: 180, startOffset: 90, progress: 40 },
        { code: '05.02', name: 'Facade Glass Panel Import', weight: 5, duration: 120, startOffset: 110, progress: 20 },
        { code: '05.03', name: 'Transformer Station Delivery', weight: 2, duration: 60, startOffset: 150, progress: 0 },
        { code: '06.01', name: 'Partition Wall - Zone A', weight: 3, duration: 60, startOffset: 200, progress: 0 },
        { code: '06.02', name: 'False Ceiling Installation', weight: 3, duration: 60, startOffset: 230, progress: 0 },
        { code: '06.03', name: 'Marble Flooring Lobby', weight: 5, duration: 45, startOffset: 260, progress: 0 },
        { code: '06.04', name: 'Final Wall Painting', weight: 2, duration: 30, startOffset: 300, progress: 0 },
        { code: '07.01', name: 'Fire Alarm System Test', weight: 1, duration: 14, startOffset: 350, progress: 0 },
        { code: '07.02', name: 'Vertical Transport Test', weight: 1, duration: 21, startOffset: 400, progress: 0 },
        { code: '07.03', name: 'Handover Documents', weight: 1, duration: 30, startOffset: 450, progress: 0 }
    ];
    const taskMap = {};
    for (const item of wbsData) {
        const start = new Date(project.startDate);
        start.setDate(start.getDate() + item.startOffset);
        const end = new Date(start);
        end.setDate(end.getDate() + item.duration);
        const task = await prisma.wbsTask.create({
            data: {
                tenantId,
                projectId: project.id,
                taskCode: item.code,
                taskName: item.name,
                plannedWeight: item.weight,
                actualProgress: item.progress,
                startDate: start,
                endDate: end,
                status: item.progress === 100 ? 'COMPLETED' : (item.progress > 0 ? 'IN_PROGRESS' : 'PENDING'),
                plannedCost: (Number(project.totalBudget) * item.weight) / 100
            }
        });
        taskMap[item.code] = task.id;
    }
    const dependencies = [
        { from: '01.01', to: '01.02' }, { from: '01.02', to: '01.03' }, { from: '01.03', to: '02.01' },
        { from: '02.01', to: '02.02' }, { from: '02.02', to: '02.03' }, { from: '02.03', to: '02.05' },
        { from: '02.05', to: '02.06' }, { from: '02.05', to: '03.01' }, { from: '03.01', to: '03.02' },
        { from: '03.02', to: '03.03' }, { from: '03.03', to: '03.04' }, { from: '04.01', to: '04.02' },
        { from: '05.01', to: '07.02' }, { from: '05.02', to: '06.03' }
    ];
    for (const dep of dependencies) {
        if (taskMap[dep.from] && taskMap[dep.to]) {
            await prisma.taskDependency.create({
                data: {
                    tenantId,
                    predecessorId: taskMap[dep.from],
                    successorId: taskMap[dep.to],
                    dependencyType: 'FS',
                    lag: 1
                }
            });
        }
    }
    console.log(`✅ MEGA-SEED Complete: ${project.name} (${wbsData.length} Tasks)`);
}
//# sourceMappingURL=seed-premium-project.js.map