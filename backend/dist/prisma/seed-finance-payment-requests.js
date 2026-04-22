"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPaymentRequests = seedPaymentRequests;
async function seedPaymentRequests(prisma, tenantId) {
    console.log('💸 Seeding High-Fidelity Payment Requests...');
    const admin = await prisma.user.findFirst({ where: { tenantId, email: 'admin@ses-erp.local' } });
    const supplierBca = await prisma.supplier.findFirst({ where: { tenantId, code: 'SES-VN-MSFT' } });
    const projectA = await prisma.project.findFirst({ where: { tenantId, code: 'PRJ-2024-ENT-001' } });
    const invoiceA = await prisma.purchaseInvoice.findFirst({ where: { tenantId, code: 'PINV-2024-MSFT-001' } });
    if (!admin) {
        console.warn('⚠️ Admin user not found, skipping Payment Request seeding.');
        return;
    }
    const requestsData = [
        {
            requestNo: 'REQ-2024-04-001',
            requestDate: new Date('2024-04-01'),
            requesterId: admin.id,
            description: 'Office Internet Subscription (Indihome)',
            amount: 1500000,
            status: 'APPROVED',
            approvalStatus: 'APPROVED',
        },
        {
            requestNo: 'REQ-2024-04-002',
            requestDate: new Date('2024-04-05'),
            requesterId: admin.id,
            supplierId: supplierBca?.id,
            description: 'Vendor Prepayment for Azure Subscription 2024',
            amount: 25000000,
            status: 'PENDING',
            approvalStatus: 'PENDING',
        },
        {
            requestNo: 'REQ-2024-04-003',
            requestDate: new Date('2024-04-10'),
            requesterId: admin.id,
            projectId: projectA?.id,
            description: 'Travel Reimbursement for Site Survey (Project A)',
            amount: 3500000,
            status: 'PENDING',
            approvalStatus: 'PENDING',
        },
        {
            requestNo: 'REQ-2024-04-004',
            requestDate: new Date('2024-04-15'),
            requesterId: admin.id,
            supplierId: supplierBca?.id,
            invoiceId: invoiceA?.id,
            description: 'Balance Payment for Microsoft Surface Hub hardware',
            amount: 12500000,
            status: 'REJECTED',
            approvalStatus: 'REJECTED',
        },
        {
            requestNo: 'REQ-2024-04-005',
            requestDate: new Date('2024-04-20'),
            requesterId: admin.id,
            description: 'Marketing Collateral Printing (Brochures)',
            amount: 5000000,
            status: 'APPROVED',
            approvalStatus: 'APPROVED',
        },
    ];
    for (const data of requestsData) {
        await prisma.paymentRequest.upsert({
            where: {
                tenantId_requestNo: {
                    tenantId,
                    requestNo: data.requestNo,
                },
            },
            update: data,
            create: {
                tenantId,
                ...data,
            },
        });
    }
    console.log(`✅ Seeded ${requestsData.length} Payment Requests across multiple integration scenarios.`);
}
//# sourceMappingURL=seed-finance-payment-requests.js.map