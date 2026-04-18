"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function seedUsers(prisma, tenantId) {
    console.log('👥 Seeding Enterprise Workforce (Users)...');
    const users = [
        { email: 'finance@ses-erp.local', name: 'Ahmad Finance' },
        { email: 'hr@ses-erp.local', name: 'Budi HR' },
        { email: 'project@ses-erp.local', name: 'Citra Project' },
        { email: 'warehouse@ses-erp.local', name: 'Dedi Warehouse' },
        { email: 'sales@ses-erp.local', name: 'Eka Sales' },
        { email: 'it@ses-erp.local', name: 'Fadil IT Support' },
    ];
    const passwordHash = await bcryptjs_1.default.hash('password123', 12);
    for (const u of users) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: {
                name: u.name,
                isActive: true,
                tenantId
            },
            create: {
                tenantId,
                email: u.email,
                name: u.name,
                passwordHash,
                isActive: true
            }
        });
    }
    console.log('✅ Enterprise Workforce seeded successfully.');
}
//# sourceMappingURL=seed-users.js.map