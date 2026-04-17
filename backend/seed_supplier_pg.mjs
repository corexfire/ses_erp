import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/erp_db',
});

async function main() {
  await client.connect();

  const userRes = await client.query('SELECT "tenantId" FROM "User" LIMIT 1');
  if (userRes.rows.length === 0) {
    console.log('No users found.');
    return;
  }
  const tenantId = userRes.rows[0].tenantId;

  console.log(`Seeding Suppliers for tenant: ${tenantId}`);

  const suppliers = [
      {
          code: "SUP-RAW-001", name: "PT Sumber Tani Indonesia", email: "sales@sumbertani.id", phone: "021-1234567",
          address1: "Jl. Raya Bogor KM 30", city: "Bogor", province: "Jawa Barat", postalCode: "16110",
          vendorGroup: "RAW_MATERIALS", npwp: "45.123.456.7-432.000", bankName: "BCA", bankAccount: "0912831201", paymentTerms: "NET30", countryCode: "ID"
      },
      {
          code: "SUP-RAW-002", name: "CV Alam Segar Makmur", email: "order@alamsegar.com", phone: "021-9922334",
          address1: "Kawasan Industri Pulo Gadung Kav. 12", city: "Jakarta Timur", province: "DKI Jakarta", postalCode: "13920",
          vendorGroup: "RAW_MATERIALS", npwp: "12.333.444.1-012.000", bankName: "Mandiri", bankAccount: "119001231231", paymentTerms: "NET45", countryCode: "ID"
      },
      {
          code: "SUP-PKG-001", name: "PT Packaging Solusi Cerdas", email: "info@packagingsurabaya.co.id", phone: "031-8899011",
          address1: "Jl. Rungkut Industri Raya No 45", city: "Surabaya", province: "Jawa Timur", postalCode: "60293",
          vendorGroup: "PACKAGING", npwp: "88.991.111.4-601.000", bankName: "BNI", bankAccount: "0123912381", paymentTerms: "NET30", countryCode: "ID"
      },
      {
          code: "SUP-PKG-002", name: "PT Mega Plastik Jaya", email: "sales@megaplastik.com", phone: "021-7788112",
          address1: "Kawasan Industri MM2100", city: "Bekasi", province: "Jawa Barat", postalCode: "17530",
          vendorGroup: "PACKAGING", npwp: "02.555.333.9-432.000", bankName: "BCA", bankAccount: "8120039123", paymentTerms: "NET60", countryCode: "ID"
      },
      {
          code: "SUP-SRV-001", name: "PT Bersih Kilau Facility", email: "cs@bersihkilau.co.id", phone: "021-5551234",
          address1: "Jl. Sudirman Kav 20, Gedung A", city: "Jakarta Selatan", province: "DKI Jakarta", postalCode: "12190",
          vendorGroup: "SERVICES", npwp: "33.222.111.0-011.000", bankName: "CIMB Niaga", bankAccount: "912312411", paymentTerms: "NET14", countryCode: "ID"
      },
      {
          code: "SUP-EQP-001", name: "Indo Tech Machinery TBK", email: "sales@indotech.id", phone: "021-8822341",
          address1: "Kawasan Jababeka Tahap I Blok ABCD", city: "Cikarang", province: "Jawa Barat", postalCode: "17550",
          vendorGroup: "EQUIPMENT", npwp: "99.888.777.6-432.000", bankName: "BRI", bankAccount: "021301012381501", paymentTerms: "DP50_NET30", countryCode: "ID"
      },
      {
          code: "SUP-GEN-001", name: "CV Utama Mandiri Office Supplies", email: "office@utamamandiri.co.id", phone: "021-3311222",
          address1: "Jl. Mangga Dua Raya Blok E2", city: "Jakarta Pusat", province: "DKI Jakarta", postalCode: "10730",
          vendorGroup: "GENERAL", npwp: "11.222.333.4-021.000", bankName: "BCA", bankAccount: "1230092131", paymentTerms: "COD", countryCode: "ID"
      }
  ];

  for (const s of suppliers) {
    try {
      await client.query(
        `INSERT INTO "Supplier" (
          "id", "tenantId", "code", "name", "email", "phone", 
          "address1", "city", "province", "postalCode", "countryCode", 
          "vendorGroup", "npwp", "bankName", "bankAccount", "paymentTerms", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())`,
        [
          crypto.randomUUID(), tenantId, s.code, s.name, s.email, s.phone,
          s.address1, s.city, s.province, s.postalCode, s.countryCode,
          s.vendorGroup, s.npwp, s.bankName, s.bankAccount, s.paymentTerms
        ]
      );
      console.log(`✅ Seeded Supplier: ${s.code}`);
    } catch(e) {
      console.log(`❌ Skipped Supplier: ${s.code} (${e.message})`);
    }
  }

  await client.end();
}

main().catch(console.error);
