import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/erp_db',
});

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) {
    console.log('No users found.');
    return;
  }
  const user = userRes.rows[0];
  const tenantId = user.tenantId;

  // Let's create Item Group
  let grpRes = await client.query('SELECT "id" FROM "ItemGroup" WHERE "tenantId" = $1 LIMIT 1', [tenantId]);
  let itemGroupRawId = grpRes.rows.length > 0 ? grpRes.rows[0].id : null;
  if (!itemGroupRawId) {
     itemGroupRawId = crypto.randomUUID();
     await client.query(`INSERT INTO "ItemGroup" ("id", "tenantId", "code", "name", "updatedAt") VALUES ($1, $2, $3, $4, NOW())`,
     [itemGroupRawId, tenantId, "GRP-RAW", "Raw Materials"]);
  }

  let grpFF = crypto.randomUUID();
  await client.query(`INSERT INTO "ItemGroup" ("id", "tenantId", "code", "name", "updatedAt") VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING`,
  [grpFF, tenantId, "GRP-FG", "Finished Goods"]);

  console.log(`Seeding Item Master for tenant: ${tenantId}`);

  const items = [
    {
      code: "RM-BKS-01",
      name: "Biji Kopi Spesialti Arabica (Green Beans)",
      description: "Biji kopi Arabica Gayo mentah untuk bahan sangrai.",
      itemGroupId: itemGroupRawId,
      baseUomCode: "KG",
      trackingType: "BATCH", // Coffee uses batch tracking
      valuationMethod: "FIFO",
      reorderPoint: 50.00,
      reorderQty: 200.00,
      isSalesItem: false,
      isPurchaseItem: true,
      uoms: [
        { code: "KG", isBase: true, conv: 1.0000, price: 95000.00 },
        { code: "KARUNG", isBase: false, conv: 50.0000, price: 4750000.00 } // 1 Karung = 50 KG -> 50 * 95k
      ],
      barcodes: [
        { code: "8901234567890", uom: "KG" },
        { code: "8901234567891", uom: "KARUNG" }
      ]
    },
    {
      code: "FG-KB-250",
      name: "Kopi Bubuk Arabica Premium 250g",
      description: "Produk Kopi Bubuk Arabica Siap Seduh Kemasan 250 gram.",
      itemGroupId: grpFF,
      baseUomCode: "PCS",
      trackingType: "SERIAL", // Premium product tracked individually
      valuationMethod: "MOVING_AVERAGE",
      reorderPoint: 100.00,
      reorderQty: 500.00,
      isSalesItem: true,
      isPurchaseItem: false,
      uoms: [
        { code: "PCS", isBase: true, conv: 1.0000, price: 45000.00 },
        { code: "DUS", isBase: false, conv: 12.0000, price: 540000.00 } // 1 DUS = 12 PCS -> Conv rate according to rule 'harga mengikuti konversi'
      ],
      barcodes: [
        { code: "8999991234123", uom: "PCS" },
        { code: "8999991234124", uom: "DUS" }
      ]
    }
  ];

  for (const it of items) {
    const itId = crypto.randomUUID();

    try {
      await client.query(
        `INSERT INTO "Item" (
          "id", "tenantId", "code", "name", "description", "itemGroupId", "baseUomCode", 
          "trackingType", "valuationMethod", "reorderPoint", "reorderQty", 
          "isActive", "isSalesItem", "isPurchaseItem", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true, $12, $13, NOW())
        ON CONFLICT ("tenantId", "code") DO NOTHING`,
        [
          itId, tenantId, it.code, it.name, it.description, it.itemGroupId, it.baseUomCode,
          it.trackingType, it.valuationMethod, it.reorderPoint, it.reorderQty,
          it.isSalesItem, it.isPurchaseItem
        ]
      );

      const res = await client.query('SELECT id FROM "Item" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, it.code]);
      if (res.rows.length === 0) continue; 
      const actId = res.rows[0].id;

      // Ensure Base UOM exists first or whatever order
      for (const u of it.uoms) {
        await client.query(
          `INSERT INTO "ItemUom" (
            "id", "tenantId", "itemId", "uomCode", "isBase", "conversionRate", "price"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT ("tenantId", "itemId", "uomCode") DO NOTHING`,
          [crypto.randomUUID(), tenantId, actId, u.code, u.isBase, u.conv, u.price]
        );
      }

      for (const b of it.barcodes) {
        await client.query(
          `INSERT INTO "ItemBarcode" (
            "id", "tenantId", "itemId", "barcode"
          ) VALUES ($1, $2, $3, $4)
          ON CONFLICT ("tenantId", "barcode") DO NOTHING`, // assuming barcode globally unique
          [crypto.randomUUID(), tenantId, actId, b.code]
        );
      }
      
      console.log(`✅ Seeded Item Master: ${it.code}`);
    } catch(e) {
        console.log(`❌ Skipped Item: ${it.code} (${e.message})`);
    }
  }

  await client.end();
}

main().catch(console.error);
