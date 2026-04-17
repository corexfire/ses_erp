import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/ses_erp',
});

async function main() {
  await client.connect();
  
  const tenantId = "cmnrxcg4n0000q50sqdh8vx4j"; // From query_fsm_ids.mjs
  const warehouseId = "a335e2c4-e2b5-49ce-aad1-0110180648c2"; // "Gudang Utama"
  const equipmentIds = [
    "cmnyyesb60007hn0srsvs6yzd",
    "cmnyyesb80008hn0ss4zu1gjk",
    "cmnyyesb90009hn0sqf8svhoz",
  ];

  console.log(`🚀 Seeding Spare Parts for tenant: ${tenantId}`);

  // 1. Ensure Item Group "Spare Parts (FSM)" exists
  let grpId = crypto.randomUUID();
  await client.query(
    `INSERT INTO "ItemGroup" ("id", "tenantId", "code", "name", "isActive", "updatedAt") 
     VALUES ($1, $2, $3, $4, true, NOW()) 
     ON CONFLICT ("tenantId", "code") DO UPDATE SET "name" = EXCLUDED."name"`,
    [grpId, tenantId, "FSM-SPARE", "Spare Parts (FSM)"]
  );
  
  const grpRes = await client.query('SELECT id FROM "ItemGroup" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, "FSM-SPARE"]);
  grpId = grpRes.rows[0].id;

  const spareParts = [
    {
      code: "SP-FA-001",
      name: "Filter Air Industri 10 Inch",
      description: "Filter air presisi untuk sistem pendingin mesin industri.",
      oem: "FA-IND-99",
      manufacturer: "Aquapure",
      brand: "industrial-grade",
      uom: "PCS",
      reorderPoint: 10,
      reorderQty: 50,
      qty: 25,
      equipIndex: [0, 1]
    },
    {
      code: "SP-BR-002",
      name: "Bearing Peluncur NSK 6205-ZZ",
      description: "Bearing baja karbon tinggi untuk motor listrik.",
      oem: "BRG-6205-NSK",
      manufacturer: "NSK Japan",
      brand: "NSK",
      uom: "PCS",
      reorderPoint: 20,
      reorderQty: 100,
      qty: 45,
      equipIndex: [1, 2]
    },
    {
      code: "SP-SN-003",
      name: "Sensor Tekanan Hidrolik 400 Bar",
      description: "Sensor tekanan analog untuk sistem kontrol hidrolik.",
      oem: "HYD-SNS-PX4",
      manufacturer: "Bosch Rexroth",
      brand: "Bosch",
      uom: "UNIT",
      reorderPoint: 5,
      reorderQty: 20,
      qty: 8,
      equipIndex: [0, 2]
    },
    {
      code: "SP-FB-004",
      name: "Fan Belt Kompresor D-50",
      description: "Tali kipas transmisi daya untuk kompresor udara besar.",
      oem: "FB-CMP-V-BELT",
      manufacturer: "Bando Indonesia",
      brand: "Bando",
      uom: "PCS",
      reorderPoint: 15,
      reorderQty: 40,
      qty: 12, // Initially low stock to test alerts
      equipIndex: [0]
    },
    {
      code: "SP-PR-005",
      name: "Piston Ring Set Caterpillar 320",
      description: "Ring piston set lengkap untuk mesin Caterpillar model 320.",
      oem: "PRS-CAT-320-GEN",
      manufacturer: "Caterpillar Inc.",
      brand: "CAT",
      uom: "SET",
      reorderPoint: 3,
      reorderQty: 10,
      qty: 5,
      equipIndex: [2]
    }
  ];

  for (const p of spareParts) {
    const itemId = crypto.randomUUID();
    try {
      // Create Item
      await client.query(
        `INSERT INTO "Item" (
          "id", "tenantId", "code", "name", "description", "itemGroupId", "baseUomCode",
          "reorderPoint", "reorderQty", "isSparePart", "oemPartNumber", "manufacturer", "brand",
          "isActive", "isSalesItem", "isPurchaseItem", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, $10, $11, $12, true, true, true, NOW())
        ON CONFLICT ("tenantId", "code") DO UPDATE SET "isSparePart" = true, "oemPartNumber" = EXCLUDED."oemPartNumber"`,
        [itemId, tenantId, p.code, p.name, p.description, grpId, p.uom, p.reorderPoint, p.reorderQty, p.oem, p.manufacturer, p.brand]
      );

      const actualItemRes = await client.query('SELECT id FROM "Item" WHERE "tenantId" = $1 AND "code" = $2', [tenantId, p.code]);
      const actualItemId = actualItemRes.rows[0].id;

      // Add Stock Balance
      await client.query(
        `INSERT INTO "StockBalance" (
          "id", "tenantId", "warehouseId", "binLocationId", "itemId", "batchId", "serialId", "qtyOnHand", "qtyAvailable", "updatedAt"
        ) VALUES ($1, $2, $3, NULL, $4, NULL, NULL, $5, $5, NOW())
        ON CONFLICT ("tenantId", "warehouseId", "binLocationId", "itemId", "batchId", "serialId") 
        DO UPDATE SET "qtyOnHand" = EXCLUDED."qtyOnHand", "qtyAvailable" = EXCLUDED."qtyAvailable"`,
        [crypto.randomUUID(), tenantId, warehouseId, actualItemId, p.qty]
      );

      // Add Compatibility
      for (const idx of p.equipIndex) {
        if (equipmentIds[idx]) {
          await client.query(
            `INSERT INTO "FsmSparePartCompatibility" (
              "id", "tenantId", "itemId", "equipmentId", "createdAt"
            ) VALUES ($1, $2, $3, $4, NOW())
            ON CONFLICT ("tenantId", "itemId", "equipmentId") DO NOTHING`,
            [crypto.randomUUID(), tenantId, actualItemId, equipmentIds[idx]]
          );
        }
      }

      console.log(`✅ Seeded Spare Part: ${p.code} - ${p.name}`);
    } catch (e) {
      console.error(`❌ Error seeding ${p.code}:`, e.message);
    }
  }

  await client.end();
  console.log('✨ Seeding complete.');
}

main().catch(console.error);
