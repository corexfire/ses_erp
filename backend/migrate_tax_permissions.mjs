import pg from 'pg';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

const PERMISSION_MAPPING = [
  // PPN / Faktur Pajak
  { old: 'tax.fakturKeluaran.read', new: 'finance.tax.fakturKeluaran.read' },
  { old: 'tax.fakturKeluaran.create', new: 'finance.tax.fakturKeluaran.create' },
  { old: 'tax.fakturKeluaran.update', new: 'finance.tax.fakturKeluaran.update' },
  { old: 'tax.fakturKeluaran.delete', new: 'finance.tax.fakturKeluaran.delete' },
  { old: 'tax.fakturKeluaran.issue', new: 'finance.tax.fakturKeluaran.issue' },

  { old: 'tax.fakturMasukan.read', new: 'finance.tax.fakturMasukan.read' },
  { old: 'tax.fakturMasukan.create', new: 'finance.tax.fakturMasukan.create' },
  { old: 'tax.fakturMasukan.update', new: 'finance.tax.fakturMasukan.update' },
  { old: 'tax.fakturMasukan.delete', new: 'finance.tax.fakturMasukan.delete' },

  { old: 'tax.nsfp.read', new: 'finance.tax.nsfp.read' },
  { old: 'tax.nsfp.create', new: 'finance.tax.nsfp.create' },
  { old: 'tax.nsfp.use', new: 'finance.tax.nsfp.use' },

  { old: 'tax.ppnMasa.read', new: 'finance.tax.ppnMasa.read' },

  // PPh / Withholding
  { old: 'tax.eBupot.read', new: 'finance.tax.eBupot.read' },
  { old: 'tax.eBupot.create', new: 'finance.tax.eBupot.create' },
  { old: 'tax.eBupot.update', new: 'finance.tax.eBupot.update' },
  { old: 'tax.eBupot.delete', new: 'finance.tax.eBupot.delete' },
  { old: 'tax.eBupot.issue', new: 'finance.tax.eBupot.issue' },

  { old: 'tax.pph21.read', new: 'finance.tax.pph21.read' },
  { old: 'tax.pph21.create', new: 'finance.tax.pph21.create' },
  { old: 'tax.pph21.update', new: 'finance.tax.pph21.update' },
  { old: 'tax.pph21.delete', new: 'finance.tax.pph21.delete' },
  { old: 'tax.pph21.approve', new: 'finance.tax.pph21.approve' },

  { old: 'tax.buktiPotong.read', new: 'finance.tax.buktiPotong.read' },
  { old: 'tax.buktiPotong.create', new: 'finance.tax.buktiPotong.create' },
  { old: 'tax.buktiPotong.update', new: 'finance.tax.buktiPotong.update' },
  { old: 'tax.buktiPotong.delete', new: 'finance.tax.buktiPotong.delete' },

  { old: 'tax.idBilling.read', new: 'finance.tax.idBilling.read' },
  { old: 'tax.idBilling.create', new: 'finance.tax.idBilling.create' },
  { old: 'tax.idBilling.update', new: 'finance.tax.idBilling.update' },
  { old: 'tax.idBilling.paid', new: 'finance.tax.idBilling.paid' },

  // Tax Compliance
  { old: 'tax.equalization.read', new: 'finance.tax.equalization.read' },
  { old: 'tax.equalization.create', new: 'finance.tax.equalization.create' },
  { old: 'tax.equalization.update', new: 'finance.tax.equalization.update' },
  { old: 'tax.equalization.delete', new: 'finance.tax.equalization.delete' },
  { old: 'tax.equalization.approve', new: 'finance.tax.equalization.approve' },

  { old: 'tax.fiscalReconciliation.read', new: 'finance.tax.fiscalReconciliation.read' },
  { old: 'tax.fiscalReconciliation.generate', new: 'finance.tax.fiscalReconciliation.generate' },

  // Tax Reports
  { old: 'tax.report.read', new: 'finance.tax.report.read' },
  { old: 'tax.report.export', new: 'finance.tax.report.export' },
];

async function migrate() {
  await client.connect();
  console.log('🔄 Starting tax permission migration...\n');

  let migrated = 0;
  let skipped = 0;
  let newCreated = 0;

  for (const { old: oldKey, new: newKey } of PERMISSION_MAPPING) {
    // Check if old permission exists
    const oldExists = await client.query(
      'SELECT id FROM "Permission" WHERE key = $1',
      [oldKey]
    );

    if (oldExists.rows.length === 0) {
      console.log(`⏭️  SKIP: '${oldKey}' does not exist`);
      skipped++;
      continue;
    }

    const oldPermId = oldExists.rows[0].id;

    // Check if new permission already exists
    const newExists = await client.query(
      'SELECT id FROM "Permission" WHERE key = $1',
      [newKey]
    );

    if (newExists.rows.length > 0) {
      // New permission exists - just migrate role associations
      const newPermId = newExists.rows[0].id;

      // Copy role associations
      await client.query(`
        INSERT INTO "RolePermission" ("roleId", "permissionId")
        SELECT DISTINCT "roleId", $1
        FROM "RolePermission"
        WHERE "permissionId" = $2
        ON CONFLICT DO NOTHING
      `, [newPermId, oldPermId]);

      console.log(`✅ '${oldKey}' → '${newKey}' (roles migrated, new permission existed)`);
    } else {
      // Create new permission
      await client.query(`
        INSERT INTO "Permission" (id, key, description, "createdAt")
        VALUES ($1, $2, $2, NOW())
        ON CONFLICT (key) DO NOTHING
      `, [oldPermId, newKey]);

      // Copy role associations using old permission ID
      await client.query(`
        UPDATE "Permission" SET key = $1 WHERE id = $2
      `, [newKey, oldPermId]);

      console.log(`✅ '${oldKey}' → '${newKey}' (permission key updated)`);
      newCreated++;
    }

    migrated++;
  }

  console.log(`\n📊 Migration Summary:`);
  console.log(`   • Migrated: ${migrated}`);
  console.log(`   • Skipped (not found): ${skipped}`);
  console.log(`   • New created: ${newCreated}`);

  // Verify
  const { rows } = await client.query(`
    SELECT key FROM "Permission" 
    WHERE key LIKE 'finance.tax.%' 
    ORDER BY key
  `);
  console.log(`\n📋 New permissions in database (${rows.length}):`);
  rows.forEach(r => console.log(`   • ${r.key}`));

  await client.end();
  console.log('\n✅ Migration complete!');
}

migrate().catch(e => {
  console.error('❌ Migration failed:', e.message);
  client.end();
});
