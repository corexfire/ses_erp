import { PrismaClient } from './generated/client';

export async function seedPremiumProject(prisma: PrismaClient, tenantId: string) {
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

  // 35+ Granular Tasks concentrated around Q2 2026 (Now)
  const wbsData = [
    // Phase 1: Planning (COMPLETED)
    { code: '01.01', name: 'Architectural Design Finalization', weight: 1, duration: 20, startOffset: 0, progress: 100 },
    { code: '01.02', name: 'Permit & License Approval', weight: 1, duration: 30, startOffset: 15, progress: 100 },
    { code: '01.03', name: 'Site Mobilization & Fencing', weight: 1, duration: 15, startOffset: 45, progress: 100 },
    
    // Phase 2: Foundation & Substructure (IN PROGRESS)
    { code: '02.01', name: 'Piling Work Zone A', weight: 4, duration: 40, startOffset: 60, progress: 100 },
    { code: '02.02', name: 'Piling Work Zone B', weight: 4, duration: 40, startOffset: 75, progress: 90 },
    { code: '02.03', name: 'Deep Excavation Main Core', weight: 5, duration: 50, startOffset: 85, progress: 85 },
    { code: '02.04', name: 'Dewatering System Setup', weight: 2, duration: 90, startOffset: 95, progress: 75 },
    { code: '02.05', name: 'Raft Foundation - Pour 1', weight: 3, duration: 10, startOffset: 110, progress: 60 },
    { code: '02.06', name: 'Raft Foundation - Pour 2', weight: 3, duration: 10, startOffset: 125, progress: 20 },
    
    // Phase 3: Superstructure - Concentrated around TODAY (Apr 22 is day ~112)
    { code: '03.01', name: 'Basement Wall Casting B1', weight: 3, duration: 25, startOffset: 115, progress: 15 },
    { code: '03.02', name: 'Basement Wall Casting B2', weight: 3, duration: 25, startOffset: 120, progress: 10 },
    { code: '03.03', name: 'Slipform System Installation', weight: 5, duration: 20, startOffset: 130, progress: 0 },
    { code: '03.04', name: 'Floor Slab L1 - Zone A', weight: 2, duration: 14, startOffset: 140, progress: 0 },
    { code: '03.05', name: 'Floor Slab L1 - Zone B', weight: 2, duration: 14, startOffset: 145, progress: 0 },
    { code: '03.06', name: 'Core Wall Casting Floor 2-5', weight: 4, duration: 60, startOffset: 150, progress: 0 },
    
    // Phase 4: MEP Rough-in
    { code: '04.01', name: 'Plumbing Main Pipe Zone A', weight: 2, duration: 30, startOffset: 135, progress: 5 },
    { code: '04.02', name: 'Fire Protection Pipe Zone B', weight: 2, duration: 30, startOffset: 140, progress: 0 },
    { code: '04.03', name: 'Electrical Conduits Basement', weight: 2, duration: 45, startOffset: 145, progress: 0 },
    { code: '04.04', name: 'HVAC Ducting L1-L3', weight: 3, duration: 60, startOffset: 160, progress: 0 },
    
    // Phase 5: Procurement & Specialized
    { code: '05.01', name: 'Elevator System Procurement', weight: 5, duration: 180, startOffset: 90, progress: 40 },
    { code: '05.02', name: 'Facade Glass Panel Import', weight: 5, duration: 120, startOffset: 110, progress: 20 },
    { code: '05.03', name: 'Transformer Station Delivery', weight: 2, duration: 60, startOffset: 150, progress: 0 },
    
    // Phase 6: Interior & Finishing (Future)
    { code: '06.01', name: 'Partition Wall - Zone A', weight: 3, duration: 60, startOffset: 200, progress: 0 },
    { code: '06.02', name: 'False Ceiling Installation', weight: 3, duration: 60, startOffset: 230, progress: 0 },
    { code: '06.03', name: 'Marble Flooring Lobby', weight: 5, duration: 45, startOffset: 260, progress: 0 },
    { code: '06.04', name: 'Final Wall Painting', weight: 2, duration: 30, startOffset: 300, progress: 0 },
    
    // Phase 7: Commissioning
    { code: '07.01', name: 'Fire Alarm System Test', weight: 1, duration: 14, startOffset: 350, progress: 0 },
    { code: '07.02', name: 'Vertical Transport Test', weight: 1, duration: 21, startOffset: 400, progress: 0 },
    { code: '07.03', name: 'Handover Documents', weight: 1, duration: 30, startOffset: 450, progress: 0 }
  ];

  const taskMap: Record<string, string> = {};
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

  // 4. Create Overlapping Dependencies
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

  // 5. Seed New Premium EPCM Modules
  console.log('Cleaning up existing Premium Module data...');
  await prisma.projectDefect.deleteMany({ where: { tenantId, projectId: project.id } });
  await prisma.projectRFI.deleteMany({ where: { tenantId, projectId: project.id } });
  await prisma.projectEquipmentLog.deleteMany({ where: { tenantId, projectId: project.id } });
  await prisma.projectWeatherLog.deleteMany({ where: { tenantId, projectId: project.id } });
  await prisma.projectSiteInventory.deleteMany({ where: { tenantId, projectId: project.id } });

  console.log('Seeding Punch Lists (Defects)...');
  await prisma.projectDefect.createMany({

    data: [
      { tenantId, projectId: project.id, wbsTaskId: taskMap['02.01'], title: 'Slight crack on column C3', description: 'Hairline crack found after formwork removal', severity: 'MEDIUM', status: 'OPEN', assignedTo: 'PT. Beton Kuat' },
      { tenantId, projectId: project.id, wbsTaskId: taskMap['03.01'], title: 'Pipe alignment issue', description: 'HVAC duct CLashing with sprinkler pipe in lobby zone', severity: 'HIGH', status: 'IN_PROGRESS', assignedTo: 'PT. MEP Solusi' },
      { tenantId, projectId: project.id, wbsTaskId: taskMap['01.03'], title: 'Incomplete soil compaction', description: 'Density test failed at zone B', severity: 'CRITICAL', status: 'RESOLVED', resolvedAt: new Date(), assignedTo: 'PT. Tanah Mas' }
    ]
  });

  console.log('Seeding RFIs...');
  await prisma.projectRFI.createMany({
    data: [
      { tenantId, projectId: project.id, wbsTaskId: taskMap['04.01'], rfiNo: 'RFI-2026-001', subject: 'Clarification on glass curtain wall spec', description: 'Please confirm the tint color of the glass curtain on West facing facade', requestedDate: new Date(), neededByDate: new Date(new Date().setDate(new Date().getDate() + 5)), status: 'SUBMITTED', isUrgent: true },
      { tenantId, projectId: project.id, wbsTaskId: taskMap['02.03'], rfiNo: 'RFI-2026-002', subject: 'Rebar density change request', description: 'Proposing reduction of rebar diameter as per revised structural calculation', requestedDate: new Date(new Date().setDate(new Date().getDate() - 3)), status: 'APPROVED', isUrgent: false },
      { tenantId, projectId: project.id, wbsTaskId: taskMap['06.01'], rfiNo: 'RFI-2026-003', subject: 'Gypsum board thickness', description: 'Can we use 9mm instead of 12mm for partition in non-critical zones?', requestedDate: new Date(), neededByDate: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'IN_REVIEW', isUrgent: false }
    ]
  });

  console.log('Seeding Equipment Logs...');
  await prisma.projectEquipmentLog.createMany({
    data: [
      { tenantId, projectId: project.id, equipmentName: 'Tower Crane TC-01', operatorName: 'Budi Santoso', hoursOperated: 8.5, fuelConsumption: 45, logDate: new Date() },
      { tenantId, projectId: project.id, equipmentName: 'Excavator EX-02', operatorName: 'Andi M', hoursOperated: 6, fuelConsumption: 80, logDate: new Date() },
      { tenantId, projectId: project.id, equipmentName: 'Tower Crane TC-01', operatorName: 'Budi Santoso', hoursOperated: 9, fuelConsumption: 50, logDate: new Date(new Date().setDate(new Date().getDate() - 1)) }
    ]
  });

  console.log('Seeding Weather Logs...');
  await prisma.projectWeatherLog.createMany({
    data: [
      { tenantId, projectId: project.id, logDate: new Date(), morningCondition: 'Sunny', afternoonCondition: 'Cloudy', eveningCondition: 'Light Rain', isSignificantDelay: false },
      { tenantId, projectId: project.id, logDate: new Date(new Date().setDate(new Date().getDate() - 1)), morningCondition: 'Heavy Rain', afternoonCondition: 'Storm', eveningCondition: 'Heavy Rain', isSignificantDelay: true, impactDescription: 'Concrete pouring for foundation cancelled due to heavy rain and site flooding. 1 day delay.' },
      { tenantId, projectId: project.id, logDate: new Date(new Date().setDate(new Date().getDate() - 2)), morningCondition: 'Sunny', afternoonCondition: 'Sunny', eveningCondition: 'Sunny', isSignificantDelay: false }
    ]
  });

  console.log('Seeding Site Inventory...');
  await prisma.projectSiteInventory.createMany({
    data: [
      { tenantId, projectId: project.id, materialName: 'Semen Portland (PCC)', sku: 'CEM-001', quantityIn: 500, quantityOut: 0, balance: 500, uom: 'Sak', transactionDate: new Date(new Date().setDate(new Date().getDate() - 5)), notes: 'Delivery from main warehouse' },
      { tenantId, projectId: project.id, materialName: 'Semen Portland (PCC)', sku: 'CEM-001', quantityIn: 0, quantityOut: 150, balance: 350, uom: 'Sak', transactionDate: new Date(new Date().setDate(new Date().getDate() - 2)), notes: 'Used for zone A casting' },
      { tenantId, projectId: project.id, materialName: 'Besi Beton Ulir D16', sku: 'REB-D16', quantityIn: 1000, quantityOut: 0, balance: 1000, uom: 'Batang', transactionDate: new Date(new Date().setDate(new Date().getDate() - 4)), notes: 'Delivery DO-9982' },
      { tenantId, projectId: project.id, materialName: 'Besi Beton Ulir D16', sku: 'REB-D16', quantityIn: 0, quantityOut: 200, balance: 800, uom: 'Batang', transactionDate: new Date(), notes: 'Used for column C3-C5' }
    ]
  });

  console.log(`✅ MEGA-SEED Complete: ${project.name} (${wbsData.length} Tasks)`);
}
