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
        const stagings = await prisma.stagingLoad.findMany({
            include: { warehouse: true, tripPlan: true },
            take: 20
        });
        console.log('--- STAGINGS ---');
        console.log(JSON.stringify(stagings, null, 2));
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check-stagings.js.map