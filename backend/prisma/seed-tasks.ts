import { PrismaClient } from './generated/client';

export async function seedTasks(prisma: PrismaClient, tenantId: string) {
  // 1. Get some users to assign as task owners/assignees
  const users = await prisma.user.findMany({ where: { tenantId } });
  if (users.length === 0) return;

  const adminUser = users[0];
  const staffUsers = users.length > 1 ? users.slice(1) : [adminUser];
  
  // 1b. Seed Task Categories
  const categoryData = [
    { code: 'TECH', name: 'Technical', color: '#3B82F6', icon: 'pi pi-cog', desc: 'Pekerjaan teknis dan engineering' },
    { code: 'ADMIN', name: 'Administrative', color: '#10B981', icon: 'pi pi-file', desc: 'Pekerjaan administratif dan dokumen' },
    { code: 'OPS', name: 'Operational', color: '#F59E0B', icon: 'pi pi-calendar', desc: 'Pekerjaan operasional harian' },
    { code: 'MGT', name: 'Management', color: '#8B5CF6', icon: 'pi pi-briefcase', desc: 'Pekerjaan koordinasi dan manajemen' },
    { code: 'PROC', name: 'Procurement', color: '#EF4444', icon: 'pi pi-shopping-cart', desc: 'Pekerjaan pengadaan barang dan jasa' },
  ];

  const seededCategories = [];
  for (const c of categoryData) {
    const category = await prisma.wbsTaskCategory.upsert({
      where: { tenantId_code: { tenantId, code: c.code } },
      update: { name: c.name, color: c.color, icon: c.icon, description: c.desc },
      create: { 
        tenantId, 
        code: c.code, 
        name: c.name, 
        color: c.color, 
        icon: c.icon, 
        description: c.desc 
      },
    });
    seededCategories.push(category);
  }

  // 2. Create Projects
  const projects = [
    {
      code: 'PRJ-24-001',
      name: 'Implementasi ERP Phase 2',
      description: 'Lanjutan implementasi modul produksi dan manajemen proyek.',
      status: 'IN_PROGRESS',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
    },
    {
      code: 'PRJ-24-002',
      name: 'Pembangunan Site Menteng',
      description: 'Pembangunan gedung perkantoran 10 lantai di kawasan Menteng.',
      status: 'DRAFT',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-12-31'),
    },
     {
      code: 'PRJ-24-003',
      name: 'Audit Sistem Tahunan',
      description: 'Audit menyeluruh untuk sistem keuangan dan operasional.',
      status: 'COMPLETED',
      startDate: new Date('2023-10-01'),
      endDate: new Date('2023-12-31'),
    }
  ];

  let firstProject: any = null;
  for (const pData of projects) {
    const project = await prisma.project.upsert({
      where: { tenantId_code: { tenantId, code: pData.code } },
      update: {},
      create: { ...pData, tenantId },
    });
    if (!firstProject) firstProject = project;

    // 3. Create Tasks for each project
    if (pData.code === 'PRJ-24-001') {
      const topLevelTasks = [
        { code: 'WBS-01', name: 'Analisa Kebutuhan', type: 'MILESTONE', weight: 10 },
        { code: 'WBS-02', name: 'Konfigurasi Sistem', type: 'TASK', weight: 40 },
        { code: 'WBS-03', name: 'User Acceptance Test (UAT)', type: 'TASK', weight: 30 },
        { code: 'WBS-04', name: 'Go-Live', type: 'MILESTONE', weight: 20 },
      ];

      for (const t of topLevelTasks) {
        const parent = await prisma.wbsTask.upsert({
          where: { tenantId_projectId_taskCode: { tenantId, projectId: project.id, taskCode: t.code } },
          update: {},
          create: {
            tenantId,
            projectId: project.id,
            taskCode: t.code,
            taskName: t.name,
            taskType: t.type,
            plannedWeight: t.weight,
            status: t.code === 'WBS-01' ? 'COMPLETED' : t.code === 'WBS-02' ? 'IN_PROGRESS' : 'PENDING',
            priority: t.code === 'WBS-04' ? 'URGENT' : 'MEDIUM',
            assigneeId: adminUser.id,
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-02-15'),
            description: `Pekerjaan untuk fase ${t.name}`,
          }
        });

        // Add sub-tasks for WBS-02
        if (t.code === 'WBS-02') {
           const subTasks = [
             { code: 'WBS-02-01', name: 'Setup Modul Produksi', status: 'COMPLETED' },
             { code: 'WBS-02-02', name: 'Data Migration - Items', status: 'IN_PROGRESS' },
             { code: 'WBS-02-03', name: 'Data Migration - Warehouse', status: 'PENDING' },
           ];
           for (const st of subTasks) {
             await prisma.wbsTask.upsert({
               where: { tenantId_projectId_taskCode: { tenantId, projectId: project.id, taskCode: st.code } },
               update: {},
               create: {
                 tenantId,
                 projectId: project.id,
                 taskCode: st.code,
                 taskName: st.name,
                 parentTaskId: parent.id,
                 level: 1,
                 status: st.status,
                 priority: 'HIGH',
                 assigneeId: staffUsers[Math.floor(Math.random() * staffUsers.length)].id,
                 startDate: new Date('2024-02-16'),
                 endDate: new Date('2024-03-30'),
               }
             });
           }
        }
      }
    } else if (pData.code === 'PRJ-24-002') {
      const constructionTasks = [
        { code: 'C-01', name: 'Pembersihan Lahan', status: 'COMPLETED', priority: 'LOW' },
        { code: 'C-02', name: 'Pondasi Borpile', status: 'IN_PROGRESS', priority: 'HIGH' },
        { code: 'C-03', name: 'Struktur Lantai 1', status: 'PENDING', priority: 'MEDIUM' },
        { code: 'C-04', name: 'Pengadaan Lift', status: 'PENDING', priority: 'URGENT' },
        { code: 'C-05', name: 'Instalasi Listrik Dasar', status: 'REVIEW', priority: 'MEDIUM' },
      ];
      for (const ct of constructionTasks) {
        await prisma.wbsTask.upsert({
          where: { tenantId_projectId_taskCode: { tenantId, projectId: project.id, taskCode: ct.code } },
          update: {},
          create: {
            tenantId,
            projectId: project.id,
            taskCode: ct.code,
            taskName: ct.name,
            status: ct.status,
            priority: ct.priority,
            taskType: 'TASK',
            assigneeId: ct.code === 'C-05' ? staffUsers[0].id : adminUser.id,
            startDate: new Date('2024-06-10'),
            endDate: new Date('2024-08-20'),
          }
        });
      }
    } else if (pData.code === 'PRJ-24-003') {
      const auditTasks = [
        { code: 'AUD-01', name: 'Review Ledger Keuangan', status: 'COMPLETED', priority: 'HIGH' },
        { code: 'AUD-02', name: 'Wawancara Departemen HR', status: 'COMPLETED', priority: 'MEDIUM' },
        { code: 'AUD-03', name: 'Penyusunan Laporan Akhir', status: 'REVIEW', priority: 'URGENT' },
      ];
      for (const at of auditTasks) {
        await prisma.wbsTask.upsert({
          where: { tenantId_projectId_taskCode: { tenantId, projectId: project.id, taskCode: at.code } },
          update: {},
          create: {
            tenantId,
            projectId: project.id,
            taskCode: at.code,
            taskName: at.name,
            status: at.status,
            priority: at.priority,
            taskType: 'TASK',
            assigneeId: adminUser.id,
            startDate: new Date('2023-10-15'),
            endDate: new Date('2023-11-30'), // OVERDUE
          }
        });
      }
    }
  }

  // 4. Create explicitly varied Deadline tasks
  if (firstProject) {
     const now = new Date();
     const deadlineScenarios = [
       { code: 'DL-01', name: 'Submit Final Report', offset: -5, status: 'IN_PROGRESS' }, // Overdue
       { code: 'DL-02', name: 'Client Presentation', offset: 0, status: 'PENDING' },    // Today
       { code: 'DL-03', name: 'Internal Audit Review', offset: 3, status: 'PENDING' },  // This Week
       { code: 'DL-04', name: 'Resource Allocation Planning', offset: 15, status: 'PENDING' }, // Future
     ];

     for (const s of deadlineScenarios) {
       const date = new Date(now);
       date.setDate(date.getDate() + s.offset);
       
       await prisma.wbsTask.upsert({
         where: { tenantId_projectId_taskCode: { tenantId, projectId: firstProject.id, taskCode: s.code } },
         update: { endDate: date, status: s.status },
         create: {
           tenantId,
           projectId: firstProject.id,
           taskCode: s.code,
           taskName: s.name,
           status: s.status,
           startDate: new Date(date.getTime() - 86400000 * 5),
           endDate: date,
           priority: s.offset <= 0 ? 'URGENT' : 'HIGH',
           assigneeId: adminUser.id,
         }
       });
     }
  }

  // 4. Create Teams and Members
  const teamsData = [
    { name: 'Engineering Team', desc: 'Tim pengembang backend dan infra' },
    { name: 'Site Operations', desc: 'Tim lapangan proyek konstruksi' },
    { name: 'Management Review', desc: 'Tim audit dan manajemen level atas' },
  ];

  const seededTeams = [];
  for (const t of teamsData) {
    const team = await prisma.team.upsert({
      where: { tenantId_name: { tenantId, name: t.name } },
      update: {},
      create: { 
        tenantId, 
        name: t.name, 
        description: t.desc 
      },
    });
    seededTeams.push(team);

    // Add Admin and random Staff to each team
    await prisma.teamMember.upsert({
      where: { tenantId_teamId_userId: { tenantId, teamId: team.id, userId: adminUser.id } },
      update: {},
      create: { tenantId, teamId: team.id, userId: adminUser.id, role: 'LEAD' }
    });

    if (staffUsers.length > 0) {
      const randomStaff = staffUsers[Math.floor(Math.random() * staffUsers.length)];
      await prisma.teamMember.upsert({
        where: { tenantId_teamId_userId: { tenantId, teamId: team.id, userId: randomStaff.id } },
        update: {},
        create: { tenantId, teamId: team.id, userId: randomStaff.id, role: 'MEMBER' }
      });
    }
  }

  // 5. Update some existing tasks or create new ones for Teams
  const teamTasks = [
    { code: 'ENG-01', name: 'Refactoring Database Schema', team: seededTeams[0] },
    { code: 'SITE-01', name: 'Inspeksi K3 Mingguan', team: seededTeams[1] },
    { code: 'MGT-01', name: 'Final Review Q3', team: seededTeams[2] },
  ];

  if (firstProject) {
    for (const tt of teamTasks) {
      await prisma.wbsTask.upsert({
        where: { tenantId_projectId_taskCode: { tenantId, projectId: firstProject.id, taskCode: tt.code } },
        update: { teamId: tt.team.id },
        create: {
          tenantId,
          projectId: firstProject.id,
          taskCode: tt.code,
          taskName: tt.name,
          teamId: tt.team.id,
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          startDate: new Date(),
          endDate: new Date(Date.now() + 86400000 * 14)
        }
      });
    }
  }

  console.log('Seeded Projects, WBS Tasks, Teams, and Team Memberships');
}
