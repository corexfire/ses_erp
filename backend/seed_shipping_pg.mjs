import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/erp_db',
});

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "id", "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) return;
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Carrier & Shipping (Freight) for tenant: ${tenantId}`);

  // 1. Carriers (Armada Ekspedisi Pihak Ketiga)
  const carriers = [
    { code: "CAR-JNE", name: "PT. JNE Express / Logistik Nusantara" },
    { code: "CAR-SICEPAT", name: "SiCepat Ekspres" },
    { code: "CAR-JNT", name: "J&T Express" },
    { code: "CAR-FEDEX", name: "FedEx Indonesia" },
    { code: "CAR-DHL", name: "DHL Express" },
    { code: "CAR-MAERSK", name: "Maersk Line (Sea Freight)" },
    { code: "CAR-INT", name: "Armada Internal Pabrik (Truk Engkel)" },
    { code: "CAR-INT-FUSO", name: "Armada Internal (Truk Fuso)" },
    { code: "CAR-INT-VAN", name: "Armada Internal (Blind Van)" },
  ];

  let carrierIds = {};

  for (const c of carriers) {
     const cId = crypto.randomUUID();
     try {
       await client.query(
         `INSERT INTO "Carrier" ("id", "tenantId", "code", "name", "isActive", "updatedAt") 
          VALUES ($1, $2, $3, $4, true, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
         [cId, tenantId, c.code, c.name]
       );
       const sRes = await client.query(`SELECT "id" FROM "Carrier" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, c.code]);
       if(sRes.rows.length > 0) {
           carrierIds[c.code] = sRes.rows[0].id;
       }
       console.log(`✅ Seeded Carrier: ${c.code}`);
     } catch(e) { console.error(`❌ Skipped Carrier ${c.code}: ${e.message}`); }
  }

  // Active DO
  let doRes = await client.query('SELECT "id", "code" FROM "DeliveryOrder" WHERE "tenantId" = $1', [tenantId]);
  let doRows = doRes.rows;

  let soRes = await client.query('SELECT "id", "code" FROM "SalesOrder" WHERE "tenantId" = $1', [tenantId]);
  let soRows = soRes.rows;

  // 2. Shipment Documents (Manifest Ekspedisi Gabungan)
  if(Object.keys(carrierIds).length > 0) {
      const shps = [
        { code: "SHP-202604-001", carrierId: carrierIds["CAR-JNE"], trackingNo: "JNE-TANGERANG-88221", status: "SHIPPED", shipDate: "2026-04-18", deliveryDate: "2026-04-20" },
        { code: "SHP-202604-002", carrierId: carrierIds["CAR-INT"], trackingNo: "INTERNAL-TRUK-B2211XX", status: "CREATED", shipDate: "2026-04-20", deliveryDate: null },
        { code: "SHP-202604-003", carrierId: carrierIds["CAR-SICEPAT"], trackingNo: "001928374829", status: "DELIVERED", shipDate: "2026-04-01", deliveryDate: "2026-04-03" },
        { code: "SHP-202604-004", carrierId: carrierIds["CAR-FEDEX"], trackingNo: "FDX-99882277", status: "SHIPPED", shipDate: "2026-04-19", deliveryDate: "2026-04-25" },
        { code: "SHP-202604-005", carrierId: carrierIds["CAR-MAERSK"], trackingNo: "MRK-SEA-112233", status: "CREATED", shipDate: "2026-05-01", deliveryDate: "2026-05-15" },
        { code: "SHP-202604-006", carrierId: carrierIds["CAR-DHL"], trackingNo: "DHL-9876543210", status: "CANCELED", shipDate: "2026-04-10", deliveryDate: null },
        { code: "SHP-202604-007", carrierId: carrierIds["CAR-JNT"], trackingNo: "JP9988776655", status: "DELIVERED", shipDate: "2026-04-05", deliveryDate: "2026-04-07" },
      ];

      for (let i = 0; i < shps.length; i++) {
         const s = shps[i];
         const sId = crypto.randomUUID();
         const orderId = soRows.length > i ? soRows[i].id : null;
         const shipDateVal = s.shipDate ? `'${s.shipDate}'` : 'NULL';
         const deliveryDateVal = s.deliveryDate ? `'${s.deliveryDate}'` : 'NULL';

         try {
           await client.query(
             `INSERT INTO "Shipment" ("id", "tenantId", "code", "carrierId", "trackingNo", "status", "shipDate", "deliveryDate", "orderId", "updatedAt") 
              VALUES ($1, $2, $3, $4, $5, $6, ${shipDateVal}, ${deliveryDateVal}, $7, NOW()) ON CONFLICT ("tenantId", "code") DO NOTHING`,
             [sId, tenantId, s.code, s.carrierId, s.trackingNo, s.status, orderId]
           );
           
           const sr = await client.query(`SELECT "id" FROM "Shipment" WHERE "tenantId"=$1 AND "code"=$2`, [tenantId, s.code]);
           if(sr.rows.length > 0) {
               const shipmentId = sr.rows[0].id;
               if (doRows.length > 0) {
                   const numDOs = Math.floor(Math.random() * 2) + 1;
                   for (let j = 0; j < numDOs; j++) {
                       if (doRows.length > 0) {
                           const doItem = doRows.pop();
                           await client.query(`UPDATE "DeliveryOrder" SET "shipmentId" = $1 WHERE "id" = $2`, [shipmentId, doItem.id]);
                           console.log(`✅ Linked DO ${doItem.code} to Shipment ${s.code}.`);
                       }
                   }
               }
           }
           console.log(`✅ Seeded Shipment: ${s.code}`);
         } catch(e) { console.error(`❌ Skipped Shipment: ${e.message}`); }
      }
  }

  await client.end();
}

main().catch(console.error);
