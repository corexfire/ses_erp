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
        const permissionCount = await prisma.permission.count();
        console.log('--- PERMISSION COUNT ---');
        console.log(permissionCount);
        const permissions = await prisma.permission.findMany({ take: 20 });
        console.log('--- PERMISSIONS (First 20) ---');
        console.log(JSON.stringify(permissions, null, 2));
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check-perms.js.map