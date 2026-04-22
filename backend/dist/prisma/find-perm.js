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
        const perm = await prisma.permission.findFirst({
            where: { key: 'logistics.warehouse.execute' }
        });
        console.log('--- PERMISSION CHECK ---');
        console.log(perm ? JSON.stringify(perm, null, 2) : 'NOT FOUND');
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=find-perm.js.map