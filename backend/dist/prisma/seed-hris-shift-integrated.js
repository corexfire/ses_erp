"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedHrisShiftIntegrated = seedHrisShiftIntegrated;
async function seedHrisShiftIntegrated(prisma, tenantId) {
    console.log('🌱 Seeding Advanced Integrated HRIS Shift Data for FY 2026...');
    const advancedShifts = [
        { code: 'SH-MORNING', name: 'Shift Pagi (Lini Produksi)', start: '08:00', end: '16:00', flexi: false },
        { code: 'SH-AFTERNOON', name: 'Shift Sore (Lini Produksi)', start: '16:00', end: '00:00', flexi: false },
        { code: 'SH-NIGHT-ADV', name: 'Shift Malam (Keamanan & Ops)', start: '00:00', end: '08:00', flexi: false },
        { code: 'SH-FLEXI-CORP', name: 'Corporate Flexible Shift', start: '09:00', end: '18:00', flexi: true },
        { code: 'SH-SPLIT-RETAIL', name: 'Split Shift (Service Center)', start: '10:00', end: '21:00', flexi: false },
    ];
    for (const s of advancedShifts) {
        await prisma.shift.upsert({
            where: { tenantId_code: { tenantId, code: s.code } },
            update: { name: s.name, startTime: s.start, endTime: s.end, isFlexi: s.flexi },
            create: { tenantId, code: s.code, name: s.name, startTime: s.start, endTime: s.end, isFlexi: s.flexi }
        });
    }
    const rotatingEmployees = await prisma.employee.findMany({
        where: {
            tenantId,
            OR: [
                { department: { contains: 'OPS', mode: 'insensitive' } },
                { department: { contains: 'WMS', mode: 'insensitive' } },
                { department: { contains: 'HSE', mode: 'insensitive' } },
            ]
        }
    });
    console.log(`🔄 Applying shift rotations to ${rotatingEmployees.length} operational staff...`);
    for (const emp of rotatingEmployees) {
        for (let day = 1; day <= 30; day++) {
            const date = new Date(2026, 3, day);
            let shiftCode = 'SH-MORNING';
            if (day > 7 && day <= 14)
                shiftCode = 'SH-AFTERNOON';
            else if (day > 14 && day <= 21)
                shiftCode = 'SH-NIGHT-ADV';
            else if (day > 21)
                shiftCode = 'SH-MORNING';
            const existingAtnd = await prisma.attendance.findUnique({
                where: { tenantId_employeeId_date: { tenantId, employeeId: emp.id, date } }
            });
            if (existingAtnd) {
                await prisma.attendance.update({
                    where: { id: existingAtnd.id },
                    data: { notes: `[Roster Shift: ${shiftCode}] ${existingAtnd.notes || ''}`.trim() }
                });
                const checkIn = new Date(existingAtnd.checkIn || date);
                const checkOut = new Date(existingAtnd.checkOut || date);
                if (shiftCode === 'SH-AFTERNOON') {
                    checkIn.setHours(16, 0, 0);
                    checkOut.setHours(0, 0, 0);
                    await prisma.attendance.update({
                        where: { id: existingAtnd.id },
                        data: { checkIn, checkOut }
                    });
                }
                else if (shiftCode === 'SH-NIGHT-ADV') {
                    checkIn.setHours(0, 0, 0);
                    checkOut.setHours(8, 0, 0);
                    await prisma.attendance.update({
                        where: { id: existingAtnd.id },
                        data: { checkIn, checkOut }
                    });
                }
            }
        }
    }
    console.log('✅ Integrated Shift Seeding Complete!');
}
//# sourceMappingURL=seed-hris-shift-integrated.js.map