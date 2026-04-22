"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generated_1 = require("./generated");
const adapter_pg_1 = require("@prisma/adapter-pg");
async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString)
        return;
    const adapter = new adapter_pg_1.PrismaPg({ connectionString });
    const prisma = new generated_1.PrismaClient({ adapter });
    try {
        const tenants = await prisma.tenant.findMany();
        console.log('--- TENANTS ---');
        console.log(JSON.stringify(tenants, null, 2));
        const users = await prisma.user.findMany({ take: 5 });
        console.log('--- USERS ---');
        console.log(JSON.stringify(users, null, 2));
        const vehicles = await prisma.fleetVehicle.findMany({ take: 10 });
        console.log('--- VEHICLES ---');
        console.log(JSON.stringify(vehicles, null, 2));
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=diagnostic.js.map