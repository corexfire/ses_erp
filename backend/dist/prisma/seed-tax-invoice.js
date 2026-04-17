"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is required');
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Seeding Tax Faktur Keluaran Compliance Data...');
    const user = await prisma.user.findFirst({
        where: { email: { in: ['zubair.mi45@gmail.com', 'admin@example.com'] } }
    });
    const tenant = user
        ? await prisma.tenant.findFirst({ where: { id: user.tenantId } })
        : await prisma.tenant.findFirst({ where: { name: { contains: 'Zubair' } } })
            || await prisma.tenant.findFirst();
    if (!tenant) {
        console.error('❌ No tenant found. Please run main seed first.');
        return;
    }
    const tenantId = tenant.id;
    const nsfpData = [
        {
            startNo: '000.25-00000001',
            endNo: '000.25-00000500',
            startDate: new Date('2025-01-10'),
            isUsed: true,
            lastUsedNo: '000.25-00000500'
        },
        {
            startNo: '000.26-00000001',
            endNo: '000.26-00001000',
            startDate: new Date('2026-01-01'),
            isUsed: true,
            lastUsedNo: '000.26-00000125'
        },
        {
            startNo: '000.26-00001001',
            endNo: '000.26-00001500',
            startDate: new Date('2026-04-15'),
            isUsed: false,
            lastUsedNo: null
        }
    ];
    for (const r of nsfpData) {
        await prisma.nsfpRange.upsert({
            where: {
                tenantId_startNo_endNo: {
                    tenantId,
                    startNo: r.startNo,
                    endNo: r.endNo
                }
            },
            update: {
                isUsed: r.isUsed,
                lastUsedNo: r.lastUsedNo
            },
            create: {
                tenantId,
                startNo: r.startNo,
                endNo: r.endNo,
                startDate: r.startDate,
                isUsed: r.isUsed,
                lastUsedNo: r.lastUsedNo
            }
        });
    }
    const customers = [
        { code: 'CUST-SES-001', name: 'PT Surya Energi Semesta', npwp: '01.234.567.8-012.000', address: 'Kawasan Industri Jababeka, Bekasi' },
        { code: 'CUST-SES-002', name: 'PT Bangun Konstruksi Jaya', npwp: '02.456.789.0-045.000', address: 'Jl. Sudirman Kav 52-53, Jakarta Selatan' },
        { code: 'CUST-SES-003', name: 'CV Makmur Sejahtera', npwp: '31.987.654.3-031.000', address: 'Ruko Artha Gading, Kelapa Gading' },
        { code: 'CUST-SES-004', name: 'Zubair Personal Tech', nik: '3275012345670001', address: 'Graha Raya Bintaro, Tangerang Selatan' }
    ];
    for (const c of customers) {
        await prisma.customer.updateMany({
            where: { tenantId, code: c.code },
            data: {
                npwp: c.npwp || null,
                nik: c.nik || null,
                taxAddress: c.address
            }
        });
    }
    const invoiceData = [
        {
            invoiceNo: 'SI/2026/04/001', customerCode: 'CUST-SES-001',
            baseAmount: 500000000, taxAmount: 55000000,
            status: 'POSTED', fpNumber: '010.026-00000001', fpDate: new Date('2026-04-10'),
            period: '04', year: 2026, type: 'OUTPUT'
        },
        {
            invoiceNo: 'SI/2026/04/002', customerCode: 'CUST-SES-002',
            baseAmount: 1250000000, taxAmount: 137500000,
            status: 'POSTED', fpNumber: '010.026-00000002', fpDate: new Date('2026-04-12'),
            period: '04', year: 2026, type: 'OUTPUT'
        },
        {
            invoiceNo: 'SI/2026/04/003', customerCode: 'CUST-SES-003',
            baseAmount: 75000000, taxAmount: 8250000,
            status: 'DRAFT', period: '04', year: 2026, type: 'OUTPUT'
        },
        {
            invoiceNo: 'PC/OFFICE/PROG-01', customerCode: 'CUST-SES-001',
            baseAmount: 3450000000, taxAmount: 379500000, stampDuty: 10000,
            status: 'DRAFT', period: '04', year: 2026, referenceType: 'PROGRESS_CLAIM', type: 'OUTPUT'
        },
        {
            invoiceNo: 'SI/2026/03/099', customerCode: 'CUST-SES-002',
            baseAmount: 45000000, taxAmount: 4950000,
            status: 'POSTED', fpNumber: '011.026-00000045', fpDate: new Date('2026-04-14'),
            period: '04', year: 2026, isReplacement: true, originalFpNumber: '010.026-00000032', type: 'OUTPUT'
        },
        {
            invoiceNo: 'INV/VND/001', customerName: 'PT Global Supply Co',
            baseAmount: 200000000, taxAmount: 22000000,
            status: 'POSTED', fpNumber: '010.000-24.11112222', fpDate: new Date('2026-04-05'),
            period: '04', year: 2026, type: 'INPUT'
        },
        {
            invoiceNo: 'INV/OFFICE/RENT-04', customerName: 'Graha Office Management',
            baseAmount: 50000000, taxAmount: 5500000,
            status: 'POSTED', fpNumber: '010.000-24.33334444', fpDate: new Date('2026-04-01'),
            period: '04', year: 2026, type: 'INPUT'
        },
        {
            invoiceNo: 'BILL/PLN/202604', customerName: 'PLN Persero',
            baseAmount: 12500000, taxAmount: 1375000,
            status: 'POSTED', fpNumber: '010.000-24.55556666', fpDate: new Date('2026-04-14'),
            period: '04', year: 2026, type: 'INPUT'
        },
        {
            invoiceNo: 'PO/MAT/2026/015', customerName: 'PT Baja Perkasa Utama',
            baseAmount: 850000000, taxAmount: 93500000,
            status: 'POSTED', fpNumber: '010.000-24.88889999', fpDate: new Date('2026-04-08'),
            period: '04', year: 2026, type: 'INPUT'
        },
        {
            invoiceNo: 'INV/LOG/SEA-09', customerName: 'Samudera Indonesia Logistics',
            baseAmount: 15000000, taxAmount: 1650000,
            status: 'POSTED', fpNumber: '010.000-24.77770000', fpDate: new Date('2026-04-11'),
            period: '04', year: 2026, type: 'INPUT'
        },
        {
            invoiceNo: 'IT/HW/2026042', customerName: 'PT Bhineka Mentari Dimensi',
            baseAmount: 45000000, taxAmount: 4950000,
            status: 'POSTED', fpNumber: '010.000-24.12344321', fpDate: new Date('2026-04-15'),
            period: '04', year: 2026, type: 'INPUT'
        },
        {
            invoiceNo: 'SRV/CONS/2026-11', customerName: 'Deloitte Consulting',
            baseAmount: 1200000000, taxAmount: 132000000,
            status: 'POSTED', fpNumber: '010.000-24.99991111', fpDate: new Date('2026-04-02'),
            period: '04', year: 2026, type: 'INPUT'
        },
        {
            invoiceNo: 'MKT/ADS/FB-04', customerName: 'Meta Platforms (Facebook)',
            baseAmount: 35000000, taxAmount: 3850000,
            status: 'DRAFT', period: '04', year: 2026, type: 'INPUT'
        },
        {
            invoiceNo: 'STATIONERY/OFF/67', customerName: 'PT Gramedia Asri Media',
            baseAmount: 2500000, taxAmount: 275000,
            status: 'DRAFT', period: '04', year: 2026, type: 'INPUT'
        }
    ];
    for (const inv of invoiceData) {
        const cust = inv.customerCode
            ? await prisma.customer.findFirst({ where: { tenantId, code: inv.customerCode } })
            : null;
        await prisma.taxInvoice.upsert({
            where: {
                tenantId_invoiceNo: { tenantId, invoiceNo: inv.invoiceNo }
            },
            update: {},
            create: {
                tenantId,
                invoiceNo: inv.invoiceNo,
                invoiceDate: new Date(),
                customerId: cust?.id,
                customerName: inv.customerName || cust?.name,
                customerNpwp: cust?.npwp || '01.000.000.0-000.000',
                customerAddress: cust?.taxAddress || cust?.address1 || 'Alamat Supplier Default',
                customerNik: cust?.nik,
                baseAmount: inv.baseAmount,
                taxAmount: inv.taxAmount,
                stampDuty: inv.stampDuty || 0,
                invoiceType: inv.type,
                status: inv.status,
                fpNumber: inv.fpNumber || null,
                fpDate: inv.fpDate || null,
                taxPeriod: inv.period,
                taxYear: inv.year,
                isReplacement: inv.isReplacement || false,
                originalFpNumber: inv.originalFpNumber || null,
                referenceNo: inv.invoiceNo,
                referenceType: inv.referenceType || 'MANUAL'
            }
        });
    }
    console.log('✅ Tax Faktur Keluaran Seeding Complete!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-tax-invoice.js.map