import pg from 'pg';
const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/ses_erp',
});

async function main() {
  await client.connect();
  const tenantRes = await client.query('SELECT "id" FROM "Tenant" LIMIT 1');
  const warehouseRes = await client.query('SELECT "id", "name" FROM "Warehouse" LIMIT 2');
  const equipmentRes = await client.query('SELECT "id", "name" FROM "Equipment" LIMIT 10');
  
  console.log('--- FOUND DATA ---');
  console.log('Tenant:', tenantRes.rows[0]);
  console.log('Warehouses:', warehouseRes.rows);
  console.log('Equipment IDs:', equipmentRes.rows.map(r => r.id));
  await client.end();
}
main().catch(console.error);
