import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

const SHIFTS = [
  { code: 'SHIFT-A', name: 'Shift Pagi (A)', startTime: '06:00', endTime: '14:00', isFlexi: false },
  { code: 'SHIFT-B', name: 'Shift Siang (B)', startTime: '14:00', endTime: '22:00', isFlexi: false },
  { code: 'SHIFT-C', name: 'Shift Malam (C)', startTime: '22:00', endTime: '06:00', isFlexi: false },
  { code: 'SHIFT-OFF', name: 'Shift Reguler Kantor', startTime: '08:00', endTime: '17:00', isFlexi: false },
  { code: 'SHIFT-FLEXI', name: 'Shift Flexi (WFH/Hybrid)', startTime: '08:00', endTime: '17:00', isFlexi: true },
];

// Department to shift mapping (F&B factory realistic)
function getShiftForDept(dept) {
  const prodDepts = ['Produksi', 'Kualitas & QC', 'Gudang & Logistik'];
  if (prodDepts.includes(dept)) {
    // Production staff rotates shifts
    const shifts = ['SHIFT-A', 'SHIFT-B', 'SHIFT-C'];
    return shifts[Math.floor(Math.random() * shifts.length)];
  }
  if (dept === 'IT & ERP') return 'SHIFT-FLEXI';
  return 'SHIFT-OFF';
}

function randomCheckIn(shiftCode, date) {
  const shiftStarts = { 'SHIFT-A': 6, 'SHIFT-B': 14, 'SHIFT-C': 22, 'SHIFT-OFF': 8, 'SHIFT-FLEXI': 8 };
  const baseHour = shiftStarts[shiftCode] ?? 8;
  // Random late by 0–25 mins (80% on-time, 20% late)
  const lateMinutes = Math.random() < 0.8 ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 25) + 5;
  const d = new Date(date);
  d.setHours(baseHour, lateMinutes, Math.floor(Math.random() * 60), 0);
  return d;
}

function randomCheckOut(checkIn, shiftCode) {
  const shiftDurations = { 'SHIFT-A': 8, 'SHIFT-B': 8, 'SHIFT-C': 8, 'SHIFT-OFF': 9, 'SHIFT-FLEXI': 8.5 };
  const baseHours = shiftDurations[shiftCode] ?? 8;
  // Overtime 0–90 mins sometimes
  const overtime = Math.random() < 0.3 ? Math.floor(Math.random() * 90) : 0;
  const d = new Date(checkIn);
  d.setTime(d.getTime() + (baseHours * 60 + overtime) * 60 * 1000);
  return d;
}

function getStatus(checkIn, shiftCode) {
  const shiftStarts = { 'SHIFT-A': 6, 'SHIFT-B': 14, 'SHIFT-C': 22, 'SHIFT-OFF': 8, 'SHIFT-FLEXI': 8 };
  const baseHour = shiftStarts[shiftCode] ?? 8;
  const lateThreshold = baseHour * 60 + 15; // 15 min grace
  const actualMinutes = checkIn.getHours() * 60 + checkIn.getMinutes();
  return actualMinutes > lateThreshold ? 'LATE' : 'PRESENT';
}

function isWeekend(date) {
  const d = new Date(date);
  return d.getDay() === 0 || d.getDay() === 6;
}

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Attendance for tenant: ${tenantId}`);

  // 1. Permissions
  const allPerms = [
    'hris.attendance.read', 'hris.attendance.create', 'hris.attendance.update',
    'hris.shift.read', 'hris.shift.create', 'hris.shift.update',
  ];
  for (const key of allPerms) {
    await client.query(`INSERT INTO "Permission" (id, key, description, "createdAt") VALUES ($1,$2,$3,NOW()) ON CONFLICT (key) DO NOTHING`, [crypto.randomUUID(), key, key]);
  }
  const roleRes = await client.query('SELECT id FROM "Role"');
  for (const r of roleRes.rows) {
    for (const key of allPerms) {
      const p = await client.query('SELECT id FROM "Permission" WHERE key=$1', [key]);
      if (p.rows.length > 0) {
        try { await client.query(`INSERT INTO "RolePermission" ("roleId","permissionId") VALUES ($1,$2) ON CONFLICT DO NOTHING`, [r.id, p.rows[0].id]); } catch (e) {}
      }
    }
  }
  console.log('✅ Permissions injected!');

  // 2. Shifts
  const shiftMap = new Map();
  for (const sh of SHIFTS) {
    const ex = await client.query('SELECT id FROM "Shift" WHERE "tenantId"=$1 AND code=$2', [tenantId, sh.code]);
    if (ex.rows.length > 0) { shiftMap.set(sh.code, ex.rows[0].id); console.log(`  skip shift: ${sh.code}`); continue; }
    const id = crypto.randomUUID();
    await client.query(
      `INSERT INTO "Shift" ("id","tenantId","name","code","startTime","endTime","isFlexi","isActive","createdAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,true,NOW())`,
      [id, tenantId, sh.name, sh.code, sh.startTime, sh.endTime, sh.isFlexi]
    );
    shiftMap.set(sh.code, id);
    console.log(`  ✓ Shift: ${sh.code} | ${sh.name} | ${sh.startTime}–${sh.endTime}`);
  }

  // 3. Load employees
  const empRes = await client.query('SELECT id, "firstName", department, status FROM "Employee" WHERE "tenantId"=$1 AND status=\'ACTIVE\'', [tenantId]);
  const employees = empRes.rows;
  console.log(`\nSeeding attendance for ${employees.length} employees over last 60 days...`);

  // 4. Generate 60 days of attendance
  let inserted = 0, skipped = 0;
  const now = new Date();

  for (const emp of employees) {
    const shiftCode = getShiftForDept(emp.department);

    for (let daysAgo = 60; daysAgo >= 0; daysAgo--) {
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      date.setHours(0, 0, 0, 0);

      // Skip weekends (unless production — they work some weekends)
      const isProdDept = ['Produksi', 'Kualitas & QC', 'Gudang & Logistik'].includes(emp.department);
      if (isWeekend(date) && !isProdDept) continue;
      if (isWeekend(date) && isProdDept && Math.random() < 0.5) continue;

      // Check if already exists
      const ex = await client.query(
        'SELECT id FROM "Attendance" WHERE "tenantId"=$1 AND "employeeId"=$2 AND date=$3',
        [tenantId, emp.id, date.toISOString()]
      );
      if (ex.rows.length > 0) { skipped++; continue; }

      // Random attendance status (5% absent, 3% leave, rest present/late)
      const rand = Math.random();
      let status, checkIn, checkOut, workHours, notes;

      if (rand < 0.03) {
        status = 'ABSENT'; checkIn = null; checkOut = null; workHours = 0; notes = 'Alpha tanpa keterangan';
      } else if (rand < 0.06) {
        status = 'LEAVE'; checkIn = null; checkOut = null; workHours = 0; notes = 'Cuti tahunan';
      } else if (rand < 0.08) {
        status = 'SICK'; checkIn = null; checkOut = null; workHours = 0; notes = 'Sakit — Surat Dokter';
      } else {
        const ci = randomCheckIn(shiftCode, date);
        const co = randomCheckOut(ci, shiftCode);
        const wh = (co.getTime() - ci.getTime()) / (1000 * 60 * 60);
        status = getStatus(ci, shiftCode);
        checkIn = ci; checkOut = co; workHours = Math.round(wh * 100) / 100;
        notes = status === 'LATE' ? 'Terlambat masuk' : null;
      }

      await client.query(
        `INSERT INTO "Attendance" ("id","tenantId","employeeId","date","checkIn","checkOut","workHours","status","notes","createdAt")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW()) ON CONFLICT DO NOTHING`,
        [crypto.randomUUID(), tenantId, emp.id, date.toISOString(), checkIn, checkOut, workHours, status, notes]
      );
      inserted++;
    }
    process.stdout.write('.');
  }

  const totAtt = await client.query('SELECT count(*) as c FROM "Attendance" WHERE "tenantId"=$1', [tenantId]);
  const totShift = await client.query('SELECT count(*) as c FROM "Shift" WHERE "tenantId"=$1', [tenantId]);
  console.log(`\n\n🎉 Done! Shifts: ${totShift.rows[0].c}, Attendance records: ${totAtt.rows[0].c} (inserted: ${inserted})`);
  await client.end();
}

main().catch(e => { console.error(e.message); client.end(); });
