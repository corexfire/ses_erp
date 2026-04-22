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
        const waves = await prisma.wavePicking.findMany({ take: 10 });
        const trips = await prisma.tripPlan.findMany({ take: 10 });
        console.log('--- WAVES ---');
        console.log(JSON.stringify(waves, null, 2));
        console.log('--- TRIPS ---');
        console.log(JSON.stringify(trips, null, 2));
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check-data.js.map