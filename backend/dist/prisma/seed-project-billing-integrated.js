"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProjectBillingIntegrated = seedProjectBillingIntegrated;
async function seedProjectBillingIntegrated(prisma, tenantId) {
    console.log('🌱 Seeding 10+ Integrated Project Billing Records for FY 2026...');
    const projects = await prisma.project.findMany({
        where: { tenantId, code: { in: ['PRJ-FLY-2026', 'PRJ-2026-001'] } },
        include: { customer: true }
    });
    if (projects.length === 0) {
        console.warn('⚠️ Target projects not found. Skipping billing seed.');
        return;
    }
    for (const project of projects) {
        const isBridge = project.code === 'PRJ-FLY-2026';
        const totalBudget = Number(project.totalBudget || (isBridge ? 42500000000 : 25000000000));
        const dpPercent = isBridge ? 10 : 20;
        console.log(`   - Generating Billing lifecycle for project: ${project.code}`);
        const dpGross = totalBudget * (dpPercent / 100);
        const dpVat = dpGross * 0.11;
        const dpNet = dpGross + dpVat;
        const dpInvNo = `INV/${project.code}/DP/2026`;
        await seedSingleBilling(prisma, tenantId, project, {
            id: `INV-DP-${project.id}`,
            invoiceNo: dpInvNo,
            description: `Down Payment ${dpPercent}%`,
            progressPercent: 0,
            grossAmount: dpGross,
            vatAmount: dpVat,
            netAmount: dpNet,
            dpRecovery: 0,
            retention: 0,
            status: 'PAID',
            date: new Date('2026-04-05'),
            isDP: true
        });
        const stages = isBridge
            ? [20, 40, 60, 80]
            : [15, 30, 50, 70];
        for (let i = 0; i < stages.length; i++) {
            const currentProgress = stages[i];
            const prevProgress = i === 0 ? 0 : stages[i - 1];
            const workDonePercent = currentProgress - prevProgress;
            const grossAmount = totalBudget * (workDonePercent / 100);
            const dpRecovery = grossAmount * (dpPercent / 100);
            const retention = grossAmount * 0.05;
            const taxableAmount = grossAmount - dpRecovery;
            const vatAmount = taxableAmount * 0.11;
            const netAmount = (grossAmount - dpRecovery - retention) + vatAmount;
            const stageNo = i + 1;
            const invNo = `INV/${project.code}/MC-0${stageNo}/2026`;
            const claimNo = `BAP/${project.code}/MC-0${stageNo}/2026`;
            await seedSingleBilling(prisma, tenantId, project, {
                id: `INV-MC${stageNo}-${project.id}`,
                claimId: `CLM-MC${stageNo}-${project.id}`,
                claimNo,
                invoiceNo: invNo,
                description: `Progress Claim MC-0${stageNo} (${currentProgress}%)`,
                progressPercent: currentProgress,
                grossAmount,
                vatAmount,
                netAmount,
                dpRecovery,
                retention,
                status: i < stages.length - 1 ? 'PAID' : 'SUBMITTED',
                date: new Date(2026, 4 + stageNo, 25),
                isDP: false
            });
        }
    }
    console.log('✅ 10+ Integrated Project Billing Records Seeded Successfully!');
}
async function seedSingleBilling(prisma, tenantId, project, data) {
    let claimId = data.claimId || 'N/A';
    if (!data.isDP) {
        const claim = await prisma.progressClaim.upsert({
            where: { tenantId_claimNo: { tenantId, claimNo: data.claimNo } },
            update: { status: 'APPROVED' },
            create: {
                id: data.claimId,
                tenantId,
                projectId: project.id,
                claimNo: data.claimNo,
                claimDate: data.date,
                progressPercent: data.progressPercent,
                description: `Berita Acara Kemajuan Pekerjaan ${data.progressPercent}%`,
                status: 'APPROVED'
            }
        });
        claimId = claim.id;
    }
    await prisma.progressInvoice.upsert({
        where: { id: data.id },
        update: { status: data.status },
        create: {
            id: data.id,
            tenantId,
            projectId: project.id,
            progressClaimId: claimId,
            invoiceNo: data.invoiceNo,
            status: data.status,
            period: `${data.date.getFullYear()}-${String(data.date.getMonth() + 1).padStart(2, '0')}`,
            progressPercent: data.progressPercent,
            retentionPercent: data.isDP ? 0 : 5,
            retentionAmount: data.retention,
            dpDeductionAmount: data.dpRecovery,
            vatPercent: 11,
            vatAmount: data.vatAmount,
            grossAmount: data.grossAmount,
            netAmount: data.netAmount,
            claimDate: data.date
        }
    });
    const fpNo = `010.026.${data.id.slice(-8).toUpperCase().replace(/[^0-9]/g, '0').padEnd(8, '0')}`;
    await prisma.taxInvoice.upsert({
        where: { tenantId_invoiceNo: { tenantId, invoiceNo: fpNo } },
        update: {},
        create: {
            tenantId,
            invoiceNo: fpNo,
            invoiceType: 'OUTPUT',
            status: 'NORMAL',
            customerName: project.customer?.name || 'Customer',
            customerNpwp: '01.234.567.8-012.000',
            baseAmount: data.grossAmount - data.dpRecovery,
            taxAmount: data.vatAmount,
            invoiceDate: data.date
        }
    });
    if (data.status === 'PAID') {
        const jeNo = `JE-BILL-${data.id.slice(-6).toUpperCase()}`;
        await prisma.journalEntry.upsert({
            where: { tenantId_entryNo: { tenantId, entryNo: jeNo } },
            update: { status: 'POSTED' },
            create: {
                tenantId,
                entryNo: jeNo,
                entryDate: data.date,
                description: `Posting ${data.description} Proyek ${project.code}`,
                status: 'POSTED',
                totalDebit: data.netAmount,
                totalCredit: data.netAmount,
                referenceNo: data.invoiceNo,
                lines: {
                    create: [
                        { tenantId, lineNo: 1, accountCode: '1-1210-10', debit: data.netAmount, credit: 0, description: 'AR Construction' },
                        { tenantId, lineNo: 2, accountCode: data.isDP ? '2-1600-00' : '4-1100-00', debit: 0, credit: data.grossAmount - data.dpRecovery, description: 'Revenue/Unearned' },
                        { tenantId, lineNo: 3, accountCode: '2-1710-00', debit: 0, credit: data.vatAmount, description: 'VAT Output Liability' }
                    ]
                }
            }
        });
    }
}
//# sourceMappingURL=seed-project-billing-integrated.js.map