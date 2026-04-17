import { PrismaClient, AccountType } from './generated/client';

export async function seedCoa(prisma: PrismaClient, tenantId: string) {
  console.log('🏛️ Seeding Enterprise-Grade Chart of Accounts (COA)...');

  const accounts = [
    // ==========================================
    // 1 - ASSETS (AKTIVA)
    // ==========================================
    { code: '1-0000-00', name: 'AKTIVA (ASSETS)', type: AccountType.ASSET, isPosting: false },
    
    // 1.1 CURRENT ASSETS
    { code: '1-1000-00', name: 'AKTIVA LANCAR', type: AccountType.ASSET, isPosting: false, parentCode: '1-0000-00' },
    
    // 1.1.1 Cash & Bank
    { code: '1-1100-00', name: 'KAS DAN SETARA KAS', type: AccountType.ASSET, isPosting: false, parentCode: '1-1000-00' },
    { code: '1-1110-00', name: 'KAS (CASH)', type: AccountType.ASSET, isPosting: false, parentCode: '1-1100-00' },
    { code: '1-1110-01', name: 'Kas Kantor Pusat', type: AccountType.ASSET, isPosting: true, parentCode: '1-1110-00' },
    { code: '1-1110-02', name: 'Kas Kecil (Petty Cash) - Jakarta', type: AccountType.ASSET, isPosting: true, parentCode: '1-1110-00' },
    { code: '1-1110-03', name: 'Kas Kecil (Petty Cash) - Surabaya', type: AccountType.ASSET, isPosting: true, parentCode: '1-1110-00' },
    { code: '1-1110-04', name: 'Kas Kecil (Petty Cash) - Medan', type: AccountType.ASSET, isPosting: true, parentCode: '1-1110-00' },
    
    { code: '1-1120-00', name: 'BANK (BANK ACCOUNTS)', type: AccountType.ASSET, isPosting: false, parentCode: '1-1100-00' },
    { code: '1-1120-01', name: 'Bank BCA IDR - 0012345678', type: AccountType.ASSET, isPosting: true, parentCode: '1-1120-00' },
    { code: '1-1120-02', name: 'Bank BCA USD - 0012345999', type: AccountType.ASSET, isPosting: true, parentCode: '1-1120-00' },
    { code: '1-1120-03', name: 'Bank Mandiri IDR - 1230008887', type: AccountType.ASSET, isPosting: true, parentCode: '1-1120-00' },
    { code: '1-1120-04', name: 'Bank Mandiri USD - 1230008889', type: AccountType.ASSET, isPosting: true, parentCode: '1-1120-00' },
    { code: '1-1120-05', name: 'Bank BNI IDR - 4455667788', type: AccountType.ASSET, isPosting: true, parentCode: '1-1120-00' },
    { code: '1-1120-06', name: 'Bank CIMB Niaga IDR', type: AccountType.ASSET, isPosting: true, parentCode: '1-1120-00' },
    
    // 1.1.2 Accounts Receivable
    { code: '1-1200-00', name: 'PIUTANG USAHA (AR)', type: AccountType.ASSET, isPosting: false, parentCode: '1-1000-00' },
    { code: '1-1210-00', name: 'Piutang Usaha - Lokal', type: AccountType.ASSET, isPosting: true, parentCode: '1-1200-00' },
    { code: '1-1220-00', name: 'Piutang Usaha - Ekspor', type: AccountType.ASSET, isPosting: true, parentCode: '1-1200-00' },
    { code: '1-1230-00', name: 'Piutang Karyawan', type: AccountType.ASSET, isPosting: true, parentCode: '1-1200-00' },
    { code: '1-1240-00', name: 'Piutang Lain-lain', type: AccountType.ASSET, isPosting: true, parentCode: '1-1200-00' },
    { code: '1-1290-00', name: 'Cadangan Kerugian Piutang', type: AccountType.ASSET, isPosting: true, parentCode: '1-1200-00' },

    // 1.1.3 Inventory
    { code: '1-1300-00', name: 'PERSEDIAAN (INVENTORY)', type: AccountType.ASSET, isPosting: false, parentCode: '1-1000-00' },
    { code: '1-1310-00', name: 'Persediaan Bahan Baku', type: AccountType.ASSET, isPosting: true, parentCode: '1-1300-00' },
    { code: '1-1320-00', name: 'Persediaan Barang Dalam Proses', type: AccountType.ASSET, isPosting: true, parentCode: '1-1300-00' },
    { code: '1-1330-00', name: 'Persediaan Barang Jadi', type: AccountType.ASSET, isPosting: true, parentCode: '1-1300-00' },
    { code: '1-1340-00', name: 'Persediaan Suku Cadang', type: AccountType.ASSET, isPosting: true, parentCode: '1-1300-00' },
    { code: '1-1350-00', name: 'Persediaan Barang Konsinyasi', type: AccountType.ASSET, isPosting: true, parentCode: '1-1300-00' },
    { code: '1-1390-00', name: 'Cadangan Penurunan Nilai Persediaan', type: AccountType.ASSET, isPosting: true, parentCode: '1-1300-00' },

    // 1.1.4 Prepaid Expenses & Taxes
    { code: '1-1400-00', name: 'BIAYA DIBAYAR DIMUKA', type: AccountType.ASSET, isPosting: false, parentCode: '1-1000-00' },
    { code: '1-1410-00', name: 'Sewa Dibayar Dimuka', type: AccountType.ASSET, isPosting: true, parentCode: '1-1400-00' },
    { code: '1-1420-00', name: 'Asuransi Dibayar Dimuka', type: AccountType.ASSET, isPosting: true, parentCode: '1-1400-00' },
    { code: '1-1430-00', name: 'Uang Muka Pembelian', type: AccountType.ASSET, isPosting: true, parentCode: '1-1400-00' },
    { code: '1-1500-00', name: 'PAJAK DIBAYAR DIMUKA (VAT/Tax In)', type: AccountType.ASSET, isPosting: false, parentCode: '1-1000-00' },
    { code: '1-1510-00', name: 'PPN Masukan', type: AccountType.ASSET, isPosting: true, parentCode: '1-1500-00' },
    { code: '1-1520-00', name: 'PPh 22 Dibayar Dimuka', type: AccountType.ASSET, isPosting: true, parentCode: '1-1500-00' },
    { code: '1-1530-00', name: 'PPh 23 Dibayar Dimuka', type: AccountType.ASSET, isPosting: true, parentCode: '1-1500-00' },
    { code: '1-1540-00', name: 'PPh 25 Dibayar Dimuka', type: AccountType.ASSET, isPosting: true, parentCode: '1-1500-00' },

    // 1.2 FIXED ASSETS
    { code: '1-2000-00', name: 'AKTIVA TETAP (FIXED ASSETS)', type: AccountType.ASSET, isPosting: false, parentCode: '1-0000-00' },
    { code: '1-2100-00', name: 'TANAH DAN BANGUNAN', type: AccountType.ASSET, isPosting: false, parentCode: '1-2000-00' },
    { code: '1-2110-00', name: 'Tanah', type: AccountType.ASSET, isPosting: true, parentCode: '1-2100-00' },
    { code: '1-2120-00', name: 'Bangunan', type: AccountType.ASSET, isPosting: true, parentCode: '1-2100-00' },
    { code: '1-2120-99', name: 'Akumulasi Penyusutan Bangunan', type: AccountType.ASSET, isPosting: true, parentCode: '1-2100-00' },
    
    { code: '1-2200-00', name: 'MESIN DAN PERALATAN', type: AccountType.ASSET, isPosting: false, parentCode: '1-2000-00' },
    { code: '1-2210-00', name: 'Mesin Produksi', type: AccountType.ASSET, isPosting: true, parentCode: '1-2200-00' },
    { code: '1-2210-99', name: 'Akumulasi Penyusutan Mesin', type: AccountType.ASSET, isPosting: true, parentCode: '1-2200-00' },
    { code: '1-2220-00', name: 'Peralatan Pabrik', type: AccountType.ASSET, isPosting: true, parentCode: '1-2200-00' },
    { code: '1-2230-00', name: 'Peralatan Kantor', type: AccountType.ASSET, isPosting: true, parentCode: '1-2200-00' },
    { code: '1-2230-99', name: 'Akumulasi Penyusutan Peralatan', type: AccountType.ASSET, isPosting: true, parentCode: '1-2200-00' },
    
    { code: '1-2300-00', name: 'KENDARAAN', type: AccountType.ASSET, isPosting: false, parentCode: '1-2000-00' },
    { code: '1-2310-00', name: 'Kendaraan Operasional', type: AccountType.ASSET, isPosting: true, parentCode: '1-2300-00' },
    { code: '1-2320-00', name: 'Kendaraan Direksi', type: AccountType.ASSET, isPosting: true, parentCode: '1-2300-00' },
    { code: '1-2300-99', name: 'Akumulasi Penyusutan Kendaraan', type: AccountType.ASSET, isPosting: true, parentCode: '1-2300-00' },

    // ==========================================
    // 2 - LIABILITIES (KEWAJIBAN)
    // ==========================================
    { code: '2-0000-00', name: 'KEWAJIBAN (LIABILITIES)', type: AccountType.LIABILITY, isPosting: false },
    
    // 2.1 SHORT TERM
    { code: '2-1000-00', name: 'KEWAJIBAN JANGKA PENDEK', type: AccountType.LIABILITY, isPosting: false, parentCode: '2-0000-00' },
    { code: '2-1100-00', name: 'HUTANG USAHA (AP)', type: AccountType.LIABILITY, isPosting: false, parentCode: '2-1000-00' },
    { code: '2-1110-00', name: 'Hutang Usaha - Lokal', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-1100-00' },
    { code: '2-1120-00', name: 'Hutang Usaha - Impor', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-1100-00' },
    
    { code: '2-1200-00', name: 'BIAYA YANG MASIH HARUS DIBAYAR', type: AccountType.LIABILITY, isPosting: false, parentCode: '2-1000-00' },
    { code: '2-1210-00', name: 'Hutang Gaji dan Upah', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-1200-00' },
    { code: '2-1220-00', name: 'Hutang Listrik dan Air', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-1200-00' },
    { code: '2-1230-00', name: 'Uang Muka Penjualan (Customer Deposit)', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-1200-00' },
    
    { code: '2-1300-00', name: 'HUTANG PAJAK (TAX PAYABLES)', type: AccountType.LIABILITY, isPosting: false, parentCode: '2-1000-00' },
    { code: '2-1310-00', name: 'PPN Keluaran', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-1300-00' },
    { code: '2-1320-00', name: 'Hutang PPh 21 (Karyawan)', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-1300-00' },
    { code: '2-1330-00', name: 'Hutang PPh 23 (Vendor Services)', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-1300-00' },
    { code: '2-1340-00', name: 'Hutang PPh 25/29 (Badan)', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-1300-00' },
    
    // 2.2 LONG TERM
    { code: '2-2000-00', name: 'KEWAJIBAN JANGKA PANJANG', type: AccountType.LIABILITY, isPosting: false, parentCode: '2-0000-00' },
    { code: '2-2100-00', name: 'Hutang Bank (Long Term)', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-2000-00' },
    { code: '2-2200-00', name: 'Hutang Sewa Guna Usaha (Lease)', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-2000-00' },
    { code: '2-2300-00', name: 'Kewajiban Imbalan Kerja (Severance)', type: AccountType.LIABILITY, isPosting: true, parentCode: '2-2000-00' },

    // ==========================================
    // 3 - EQUITY (EKUITAS)
    // ==========================================
    { code: '3-0000-00', name: 'MODAL (EQUITY)', type: AccountType.EQUITY, isPosting: false },
    { code: '3-1000-00', name: 'Modal Disetor', type: AccountType.EQUITY, isPosting: true, parentCode: '3-0000-00' },
    { code: '3-2000-00', name: 'Tambahan Modal Disetor (Agio)', type: AccountType.EQUITY, isPosting: true, parentCode: '3-0000-00' },
    { code: '3-3000-00', name: 'Laba Ditahan (Retained Earnings)', type: AccountType.EQUITY, isPosting: true, parentCode: '3-0000-00' },
    { code: '3-4000-00', name: 'Laba Tahun Berjalan', type: AccountType.EQUITY, isPosting: true, parentCode: '3-0000-00' },
    { code: '3-5000-00', name: 'Dividen', type: AccountType.EQUITY, isPosting: true, parentCode: '3-0000-00' },

    // ==========================================
    // 4 - REVENUE (PENDAPATAN)
    // ==========================================
    { code: '4-0000-00', name: 'PENDAPATAN (REVENUE)', type: AccountType.INCOME, isPosting: false },
    { code: '4-1000-00', name: 'PENDAPATAN PENJUALAN', type: AccountType.INCOME, isPosting: false, parentCode: '4-0000-00' },
    { code: '4-1100-00', name: 'Penjualan Produk A', type: AccountType.INCOME, isPosting: true, parentCode: '4-1000-00' },
    { code: '4-1200-00', name: 'Penjualan Produk B', type: AccountType.INCOME, isPosting: true, parentCode: '4-1000-00' },
    { code: '4-1300-00', name: 'Penjualan Produk C', type: AccountType.INCOME, isPosting: true, parentCode: '4-1000-00' },
    { code: '4-1400-00', name: 'Pendapatan Jasa Service', type: AccountType.INCOME, isPosting: true, parentCode: '4-1000-00' },
    { code: '4-1500-00', name: 'Pendapatan Project Construction', type: AccountType.INCOME, isPosting: true, parentCode: '4-1000-00' },
    
    { code: '4-2000-00', name: 'KONTRA PENDAPATAN', type: AccountType.INCOME, isPosting: false, parentCode: '4-0000-00' },
    { code: '4-2100-00', name: 'Retur Penjualan', type: AccountType.INCOME, isPosting: true, parentCode: '4-2000-00' },
    { code: '4-2200-00', name: 'Potongan Penjualan (Discounts)', type: AccountType.INCOME, isPosting: true, parentCode: '4-2000-00' },

    // ==========================================
    // 5 - COGS (HARGA POKOK PENJUALAN)
    // ==========================================
    { code: '5-0000-00', name: 'HARGA POKOK PENJUALAN (COGS)', type: AccountType.EXPENSE, isPosting: false },
    { code: '5-1000-00', name: 'Biaya Bahan Baku Langsung', type: AccountType.EXPENSE, isPosting: true, parentCode: '5-0000-00' },
    { code: '5-2000-00', name: 'Biaya Tenaga Kerja Langsung', type: AccountType.EXPENSE, isPosting: true, parentCode: '5-0000-00' },
    { code: '5-3000-00', name: 'Overhead Pabrik', type: AccountType.EXPENSE, isPosting: false, parentCode: '5-0000-00' },
    { code: '5-3100-00', name: 'Biaya Listrik Pabrik', type: AccountType.EXPENSE, isPosting: true, parentCode: '5-3000-00' },
    { code: '5-3200-00', name: 'Biaya Pemeliharaan Mesin', type: AccountType.EXPENSE, isPosting: true, parentCode: '5-3000-00' },
    { code: '5-3300-00', name: 'Penyusutan Aktiva Pabrik', type: AccountType.EXPENSE, isPosting: true, parentCode: '5-3000-00' },
    { code: '5-4000-00', name: 'Biaya Pengiriman & Logistik (Inbound)', type: AccountType.EXPENSE, isPosting: true, parentCode: '5-0000-00' },

    // ==========================================
    // 6 - OPERATING EXPENSES (BEBAN OPERASIONAL)
    // ==========================================
    { code: '6-0000-00', name: 'BEBAN OPERASIONAL (OPEX)', type: AccountType.EXPENSE, isPosting: false },
    
    // 6.1 PERSONNEL
    { code: '6-1000-00', name: 'BEBAN PERSONALIA (HR)', type: AccountType.EXPENSE, isPosting: false, parentCode: '6-0000-00' },
    { code: '6-1100-00', name: 'Beban Gaji & Tunjangan', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-1000-00' },
    { code: '6-1200-00', name: 'Beban Lembur', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-1000-00' },
    { code: '6-1300-00', name: 'Beban Bonus & THR', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-1000-00' },
    { code: '6-1400-00', name: 'Beban BPJS & Jamsostek', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-1000-00' },
    { code: '6-1500-00', name: 'Beban Training & Pendidikan', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-1000-00' },
    { code: '6-1600-00', name: 'Beban Recruitment', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-1000-00' },
    { code: '6-1700-00', name: 'Beban Kesejahteraan Karyawan', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-1000-00' },
    
    // 6.2 ADMINISTRATIVE & GENERAL
    { code: '6-2000-00', name: 'BEBAN UMUM DAN ADMINISTRASI', type: AccountType.EXPENSE, isPosting: false, parentCode: '6-0000-00' },
    { code: '6-2100-00', name: 'Beban Sewa Kantor', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },
    { code: '6-2200-00', name: 'Beban Listrik, Air, & Gas (Office)', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },
    { code: '6-2310-00', name: 'Beban Telepon & Fax', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },
    { code: '6-2320-00', name: 'Beban Internet & Komunikasi', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },
    { code: '6-2400-00', name: 'Beban ATK & Cetakan', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },
    { code: '6-2500-00', name: 'Beban Pos & Kurir', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },
    { code: '6-2600-00', name: 'Beban Perijinan & Legal', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },
    { code: '6-2700-00', name: 'Beban Keamanan & Kebersihan', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },
    { code: '6-2810-00', name: 'Beban Pemeliharaan Peralatan Kantor', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },
    { code: '6-2820-00', name: 'Beban Pemeliharaan Kendaraan Kantor', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },
    { code: '6-2900-00', name: 'Beban Penyusutan (Non-Pabrik)', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-2000-00' },

    // 6.3 SELLING & MARKETING
    { code: '6-3000-00', name: 'BEBAN PENJUALAN DAN PEMASARAN', type: AccountType.EXPENSE, isPosting: false, parentCode: '6-0000-00' },
    { code: '6-3100-00', name: 'Beban Iklan & Promosi Online', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-3000-00' },
    { code: '6-3200-00', name: 'Beban Pameran & Event', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-3000-00' },
    { code: '6-3300-00', name: 'Beban Komisi Penjualan', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-3000-00' },
    { code: '6-3400-00', name: 'Beban Perjalanan Dinas Marketing', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-3000-00' },
    { code: '6-3500-00', name: 'Beban Entertainment Penjualan', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-3000-00' },
    { code: '6-3600-00', name: 'Beban Pengiriman Barang (Outbound)', type: AccountType.EXPENSE, isPosting: true, parentCode: '6-3000-00' },

    // ==========================================
    // 7 - OTHER INCOME/EXPENSES
    // ==========================================
    { code: '7-0000-00', name: 'PENDAPATAN DAN BIAYA LAINNYA', type: AccountType.INCOME, isPosting: false },
    { code: '7-1100-00', name: 'Pendapatan Bunga Bank', type: AccountType.INCOME, isPosting: true, parentCode: '7-0000-00' },
    { code: '7-1200-00', name: 'Laba/Rugi Selisih Kurs (Realized)', type: AccountType.INCOME, isPosting: true, parentCode: '7-0000-00' },
    { code: '7-1300-00', name: 'Laba/Rugi Selisih Kurs (Unrealized)', type: AccountType.INCOME, isPosting: true, parentCode: '7-0000-00' },
    { code: '7-2100-00', name: 'Beban Administrasi Bank', type: AccountType.EXPENSE, isPosting: true, parentCode: '7-0000-00' },
    { code: '7-2200-00', name: 'Beban Bunga Pinjaman', type: AccountType.EXPENSE, isPosting: true, parentCode: '7-0000-00' },
    { code: '7-2300-00', name: 'Beban Pajak Penghasilan (PPh 29)', type: AccountType.EXPENSE, isPosting: true, parentCode: '7-0000-00' },
    { code: '7-9900-00', name: 'Beban/Pendapatan Luar Biasa', type: AccountType.EXPENSE, isPosting: true, parentCode: '7-0000-00' },
  ];

  const createdAccounts: Record<string, string> = {};

  // Sort by code length or hierarchy to ensure parents are created first
  const sortedAccounts = [...accounts].sort((a, b) => a.code.localeCompare(b.code));

  for (const a of sortedAccounts) {
    const parentId = a.parentCode ? createdAccounts[a.parentCode] : null;
    
    // Use upsert to be safe for re-runs
    const account = await prisma.coaAccount.upsert({
      where: { 
        tenantId_code: { 
          tenantId, 
          code: a.code 
        } 
      },
      update: {
        name: a.name,
        type: a.type,
        isPosting: a.isPosting,
        parentId: parentId,
        isActive: true // Ensure they are active on re-seed
      },
      create: {
        tenantId,
        code: a.code,
        name: a.name,
        type: a.type,
        isPosting: a.isPosting,
        parentId: parentId
      }
    });
    
    createdAccounts[a.code] = account.id;
  }

  console.log(`✅ Enterprise Chart of Accounts seeded: ${accounts.length} accounts created.`);
}
