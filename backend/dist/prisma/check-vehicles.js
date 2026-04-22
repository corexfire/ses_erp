"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prisma = new client_1.PrismaClient();
    try {
        const count = await prisma.fleetVehicle.count();
        console.log(`Vehicles count: ${count}`);
        const vehicles = await prisma.fleetVehicle.findMany({ take: 5, select: { id: true, plateNo: true } });
        console.log(JSON.stringify(vehicles));
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check-vehicles.js.map