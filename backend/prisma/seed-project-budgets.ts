import type { PrismaClient } from './generated/client';

export async function seedProjectBudgets(prisma: PrismaClient, tenantId: string) {
  console.log('🏗️ Seeding Strategic Project Budgets...');

  const projects = await prisma.project.findMany({
    where: { tenantId },
    include: { wbsTasks: true }
  });

  if (projects.length === 0) {
    console.log('⚠️ No projects found. Skipping budget seed.');
    return;
  }

  for (const project of projects) {
    const isConstruction = project.name.toLowerCase().includes('construction') || project.name.toLowerCase().includes('bridge');
    
    // Create Budget Header
    const budget = await prisma.projectBudget.upsert({
      where: { id: `budget-${project.id}` },
      update: {},
      create: {
        id: `budget-${project.id}`,
        tenantId,
        projectId: project.id,
        budgetNo: `BUD-${project.code}-${new Date().getFullYear()}`,
        status: 'APPROVED',
        description: `Anggaran strategi utama untuk ${project.name}`,
        totalAmount: isConstruction ? 2500000000 : 850000000, // 2.5B or 850M
        allocatedBudget: isConstruction ? 2500000000 : 850000000,
        createdAt: new Date(),
      }
    });

    // Create Lines
    const categories = ['MATERIAL', 'LABOR', 'EQUIP', 'SUBCO', 'OTHER'];
    const linesData = [];

    if (isConstruction) {
      linesData.push(
        { category: 'MATERIAL', desc: 'Beton Ready Mix K-350', price: 1200000, qty: 500, uom: 'M3' },
        { category: 'MATERIAL', desc: 'Baja Tulangan U-40', price: 15000, qty: 25000, uom: 'KG' },
        { category: 'LABOR', desc: 'Mandor Lapangan Professional', price: 250000, qty: 180, uom: 'MD' },
        { category: 'EQUIP', desc: 'Sewa Excavator PC200', price: 350000, qty: 120, uom: 'JAM' },
        { category: 'SUBCO', desc: 'Pekerjaan Bored Pile (Vendor)', price: 850000000, qty: 1, uom: 'LS' },
        { category: 'OTHER', desc: 'K3 & Safety Mobilization', price: 50000000, qty: 1, uom: 'LS' }
      );
    } else {
      linesData.push(
        { category: 'LABOR', desc: 'Senior Software Architect', price: 45000000, qty: 6, uom: 'MONTH' },
        { category: 'LABOR', desc: 'Fullstack Developers (3 Pax)', price: 75000000, qty: 6, uom: 'MONTH' },
        { category: 'EQUIP', desc: 'Cloud Infrastructure (AWS/Azure)', price: 12000000, qty: 12, uom: 'MONTH' },
        { category: 'EQUIP', desc: 'Dev Container Licenses', price: 500000, qty: 10, uom: 'PCS' },
        { category: 'OTHER', desc: 'Quality Assurance & Testing Tools', price: 25000000, qty: 1, uom: 'LS' }
      );
    }

    for (const [index, line] of linesData.entries()) {
      const task = project.wbsTasks[index % project.wbsTasks.length];
      await prisma.projectBudgetLine.upsert({
        where: { id: `line-${budget.id}-${index}` },
        update: {},
        create: {
          id: `line-${budget.id}-${index}`,
          tenantId,
          budgetId: budget.id,
          wbsTaskId: task?.id,
          costCategory: line.category,
          description: line.desc,
          unitPrice: line.price,
          qty: line.qty,
          totalAmount: line.price * line.qty,
          uom: line.uom,
        }
      });
    }

    // Update Header Total
    const total = linesData.reduce((acc, l) => acc + (l.price * l.qty), 0);
    await prisma.projectBudget.update({
      where: { id: budget.id },
      data: { totalAmount: total, allocatedBudget: total }
    });
  }

  console.log('✅ Strategic Project Budgets seeded successfully.');
}
