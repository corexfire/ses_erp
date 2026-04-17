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
const issueTypes = [
    { type: 'REPAIR', desc: "Penggantian Filter Oli Mesin", priority: 'HIGH', mechanicName: 'Budi Santoso' },
    { type: 'PREVENTATIVE', desc: "Servis Rutin Berkala / Kalibrasi Mesin Kompresor", priority: 'LOW', mechanicName: 'Anton Wijaya' },
    { type: 'INSPECTION', desc: "Inspeksi Visual Sasis Kendaraan Operasional", priority: 'MEDIUM', mechanicName: 'Joko Widodo' },
    { type: 'REPAIR', desc: "Ganti Sparepart Pipa Hidrolik yg Bocor", priority: 'URGENT', mechanicName: 'Rian Hernanda' },
    { type: 'INSPECTION', desc: "Site Safety Check / Audit Kelayakan Genset", priority: 'MEDIUM', mechanicName: 'Siti Aminah' },
    { type: 'PREVENTATIVE', desc: "Pengecatan Ulang dan Las Titik Berkarat Scaffolding", priority: 'LOW', mechanicName: 'Cahyo Purnama' },
];
async function main() {
    const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';
    const tenant = await prisma.tenant.findUnique({ where: { name: tenantName } });
    if (!tenant) {
        throw new Error(`Tenant '${tenantName}' not found.`);
    }
    console.log(`🧹 Memulai proses Seeding Rental Maintenance / Servis Aset untuk tenant: ${tenantName}...`);
    const contracts = await prisma.rentalContract.findMany({
        where: { tenantId: tenant.id },
        select: { id: true, assetId: true, contractNo: true }
    });
    const allAssets = await prisma.fixedAsset.findMany({
        where: { tenantId: tenant.id },
        select: { id: true }
    });
    if (contracts.length === 0 && allAssets.length === 0) {
        console.warn("⚠️ Data Kontrak Sewa atau Fixed Asset kosong, operasional logistik belum dapat disimulasi.");
        return;
    }
    console.log(`📝 Seeding Work Order Log (Maintenance)...`);
    let createdCount = 0;
    const statuses = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'COMPLETED', 'COMPLETED', 'CANCELLED'];
    for (let i = 0; i < 40; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const issue = issueTypes[Math.floor(Math.random() * issueTypes.length)];
        let contractId = null;
        let assetId = null;
        if (Math.random() > 0.5 && contracts.length > 0) {
            const c = contracts[Math.floor(Math.random() * contracts.length)];
            contractId = c.id;
            assetId = c.assetId;
        }
        else if (allAssets.length > 0) {
            assetId = allAssets[Math.floor(Math.random() * allAssets.length)].id;
        }
        const scheduledDate = new Date();
        scheduledDate.setDate(scheduledDate.getDate() - Math.floor(Math.random() * 60) + 10);
        let completionDate = null;
        if (status === 'COMPLETED') {
            completionDate = new Date(scheduledDate);
            completionDate.setDate(completionDate.getDate() + Math.floor(Math.random() * 5));
        }
        let costAmount = 0;
        if (status === 'COMPLETED' || status === 'IN_PROGRESS') {
            costAmount = (Math.floor(Math.random() * 95) + 5) * 100000;
        }
        const ticketNo = `RWO-2026-${String(1000 + i + 1).padStart(4, '0')}`;
        let resolutionNotes = null;
        if (status === 'COMPLETED')
            resolutionNotes = `Telah ditindaklanjuti. Aset berfungsi optimal kembali. Mekanik yang bertugas: ${issue.mechanicName}`;
        try {
            await prisma.rentalMaintenance.upsert({
                where: { tenantId_ticketNo: { tenantId: tenant.id, ticketNo } },
                update: {},
                create: {
                    tenantId: tenant.id,
                    ticketNo,
                    contractId,
                    assetId,
                    type: issue.type,
                    priority: issue.priority,
                    status,
                    scheduledDate,
                    completionDate,
                    costAmount,
                    mechanicName: issue.mechanicName,
                    issueDescription: issue.desc,
                    resolutionNotes
                }
            });
            createdCount++;
        }
        catch (e) {
            console.error(e);
        }
    }
    console.log(`✅ Berhasil melakukan Seed untuk ${createdCount} Work Order Maintenance Alat/Aset.`);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed-rental-maintenance.js.map