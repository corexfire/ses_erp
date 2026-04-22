"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProjectBudgets = seedProjectBudgets;
async function seedProjectBudgets(prisma, tenantId) {
    console.log('🏗️ Seeding "Massive" Project Budgets (60 Projects)...');
    const projects = await prisma.project.findMany({
        where: { tenantId },
        include: { wbsTasks: true }
    });
    if (projects.length === 0)
        return;
    for (const project of projects) {
        const isConstruction = project.name.toLowerCase().includes('construction') ||
            project.name.toLowerCase().includes('bridge') ||
            project.name.toLowerCase().includes('bangunan');
        const budgetId = `budget-${project.id}`;
        await prisma.projectBudgetLine.deleteMany({ where: { budgetId, tenantId } });
        await prisma.projectBudget.deleteMany({ where: { id: budgetId, tenantId } });
        const totalAmount = Number(project.totalBudget);
        const budget = await prisma.projectBudget.create({
            data: {
                id: budgetId,
                tenantId,
                projectId: project.id,
                budgetNo: `BUD-${project.code}/2025`,
                status: project.status === 'COMPLETED' ? 'APPROVED' : (Math.random() > 0.3 ? 'APPROVED' : 'DRAFT'),
                description: `Financial allocation for ${project.name}`,
                totalAmount,
                allocatedBudget: totalAmount
            }
        });
        const categories = ['MATERIAL', 'LABOR', 'EQUIP', 'SUBCO', 'OTHER'];
        for (let i = 0; i < project.wbsTasks.length; i++) {
            const task = project.wbsTasks[i];
            const baseTaskAmt = Number(task.plannedCost);
            const splittedLines = [
                { cat: 'MATERIAL', pct: 0.4 },
                { cat: 'LABOR', pct: 0.3 },
                { cat: 'EQUIP', pct: 0.2 },
                { cat: 'OTHER', pct: 0.1 }
            ];
            for (const split of splittedLines) {
                const lineAmt = baseTaskAmt * split.pct;
                await prisma.projectBudgetLine.create({
                    data: {
                        tenantId,
                        budgetId: budget.id,
                        wbsTaskId: task.id,
                        costCategory: split.cat,
                        description: `${split.cat} for ${task.taskName}`,
                        unitPrice: lineAmt,
                        qty: 1,
                        totalAmount: lineAmt,
                        uom: 'LS'
                    }
                });
            }
        }
    }
    console.log('✅ "Massive" Project Budgets seeded successfully.');
}
//# sourceMappingURL=seed-project-budgets.js.map