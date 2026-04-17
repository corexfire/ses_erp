import pg from 'pg';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public',
});

const REVERSE_MAPPING = [
  // PPN / Faktur Pajak
  { old: 'finance.tax.fakturKeluaran.read', new: 'tax.fakturKeluaran.read' },
  { old: 'finance.tax.fakturKeluaran.create', new: 'tax.fakturKeluaran.create' },
  { old: 'finance.tax.fakturKeluaran.update', new: 'tax.fakturKeluaran.update' },
  { old: 'finance.tax.fakturKeluaran.delete', new: 'tax.fakturKeluaran.delete' },
  { old: 'finance.tax.fakturKeluaran.issue', new: 'tax.fakturKeluaran.issue' },

  { old: 'finance.tax.fakturMasukan.read', new: 'tax.fakturMasukan.read' },
  { old: 'finance.tax.fakturMasukan.create', new: 'tax.fakturMasukan.create' },
  { old: 'finance.tax.fakturMasukan.update', new: 'tax.fakturMasukan.update' },
  { old: 'finance.tax.fakturMasukan.delete', new: 'tax.fakturMasukan.delete' },

  { old: 'finance.tax.nsfp.read', new: 'tax.nsfp.read' },
  { old: 'finance.tax.nsfp.create', new: 'tax.nsfp.create' },
  { old: 'finance.tax.nsfp.use', new: 'tax.nsfp.use' },

  { old: 'finance.tax.ppnMasa.read', new: 'tax.ppnMasa.read' },

  // PPh / Withholding
  { old: 'finance.tax.eBupot.read', new: 'tax.eBupot.read' },
  { old: 'finance.tax.eBupot.create', new: 'tax.eBupot.create' },
  { old: 'finance.tax.eBupot.update', new: 'tax.eBupot.update' },
  { old: 'finance.tax.eBupot.delete', new: 'tax.eBupot.delete' },
  { old: 'finance.tax.eBupot.issue', new: 'tax.eBupot.issue' },

  { old: 'finance.tax.pph21.read', new: 'tax.pph21.read' },
  { old: 'finance.tax.pph21.create', new: 'tax.pph21.create' },
  { old: 'finance.tax.pph21.update', new: 'tax.pph21.update' },
  { old: 'finance.tax.pph21.delete', new: 'tax.pph21.delete' },
  { old: 'finance.tax.pph21.approve', new: 'tax.pph21.approve' },

  { old: 'finance.tax.buktiPotong.read', new: 'tax.buktiPotong.read' },
  { old: 'finance.tax.buktiPotong.create', new: 'tax.buktiPotong.create' },
  { old: 'finance.tax.buktiPotong.update', new: 'tax.buktiPotong.update' },
  { old: 'finance.tax.buktiPotong.delete', new: 'tax.buktiPotong.delete' },

  { old: 'finance.tax.idBilling.read', new: 'tax.idBilling.read' },
  { old: 'finance.tax.idBilling.create', new: 'tax.idBilling.create' },
  { old: 'finance.tax.idBilling.update', new: 'tax.idBilling.update' },
  { old: 'finance.tax.idBilling.paid', new: 'tax.idBilling.paid' },

  // Tax Compliance
  { old: 'finance.tax.equalization.read', new: 'tax.equalization.read' },
  { old: 'finance.tax.equalization.create', new: 'tax.equalization.create' },
  { old: 'finance.tax.equalization.update', new: 'tax.equalization.update' },
  { old: 'finance.tax.equalization.delete', new: 'tax.equalization.delete' },
  { old: 'finance.tax.equalization.approve', new: 'tax.equalization.approve' },

  { old: 'finance.tax.fiscalReconciliation.read', new: 'tax.fiscalReconciliation.read' },
  { old: 'finance.tax.fiscalReconciliation.generate', new: 'tax.fiscalReconciliation.generate' },

  // Tax Reports
  { old: 'finance.tax.report.read', new: 'tax.report.read' },
  { old: 'finance.tax.report.export', new: 'tax.report.export' },
];

async function rollback() {
  await client.connect();
  console.log('🔄 Starting ROLLBACK - reverting to tax.* permissions...\n');

  let migrated = 0;
  let skipped = 0;

  for (const { old: oldKey, new: newKey } of REVERSE_MAPPING) {
    const oldExists = await client.query(
      'SELECT id FROM "Permission" WHERE key = $1',
      [oldKey]
    );

    if (oldExists.rows.length === 0) {
      console.log(`⏭️  SKIP: '${oldKey}' does not exist`);
      skipped++;
      continue;
    }

    const permId = oldExists.rows[0].id;

    // Update permission key
    await client.query(`
      UPDATE "Permission" SET key = $1 WHERE id = $2
    `, [newKey, permId]);

    console.log(`✅ '${oldKey}' → '${newKey}'`);
    migrated++;
  }

  console.log(`\n📊 Rollback Summary:`);
  console.log(`   • Migrated: ${migrated}`);
  console.log(`   • Skipped: ${skipped}`);

  await client.end();
  console.log('\n✅ Rollback complete!');
}

rollback().catch(e => {
  console.error('❌ Rollback failed:', e.message);
  client.end();
});
