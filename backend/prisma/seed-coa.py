#!/usr/bin/env python3
"""
Seed full Chart of Accounts (COA) untuk PT Sarana Eka Sejahtera (F&B Manufacturer)
Standar: PSAK (Indonesian GAAP) + kebutuhan ERP manufaktur besar
"""

import json
import subprocess
import sys
import time

BASE_URL = "http://localhost:4123"
COOKIES_FILE = "/tmp/zubair_cookies.txt"

def api_post(path, data, cookies_file=COOKIES_FILE):
    cmd = [
        "curl", "-s", "-X", "POST", f"{BASE_URL}{path}",
        "-H", "Content-Type: application/json",
        "-b", cookies_file,
        "-d", json.dumps(data)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    try:
        return json.loads(result.stdout)
    except:
        return {"error": result.stdout}

def login():
    cmd = [
        "curl", "-s", "-X", "POST", f"{BASE_URL}/auth/login",
        "-H", "Content-Type: application/json",
        "-c", COOKIES_FILE, "-b", COOKIES_FILE,
        "-d", json.dumps({"email": "zubair.mi45@gmail.com", "password": "Zubair12345@@"})
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    resp = json.loads(result.stdout)
    print(f"Login: {resp.get('user', {}).get('email', 'FAIL')}")
    return resp

def create_account(code, name, acct_type, parent_id=None, is_posting=True):
    data = {"code": code, "name": name, "type": acct_type, "isPosting": is_posting}
    if parent_id:
        data["parentId"] = parent_id
    resp = api_post("/core/chart-of-accounts", data)
    acct = resp.get("account", {})
    if acct.get("id"):
        print(f"  ✅ {code:10} {name[:50]}")
        return acct["id"]
    else:
        print(f"  ❌ {code:10} {name[:50]} → {resp}")
        return None

def main():
    login()
    ids = {}

    print("\n=== 1. ASET (1xxx) ===")
    # Header
    ids["1000"] = create_account("1000", "ASET", "ASSET", is_posting=False)
    # Aset Lancar
    ids["1100"] = create_account("1100", "Aset Lancar", "ASSET", ids["1000"], False)
    ids["1101"] = create_account("1101", "Kas", "ASSET", ids["1100"])
    ids["1102"] = create_account("1102", "Kas Kecil (Petty Cash)", "ASSET", ids["1100"])
    ids["1103"] = create_account("1103", "Bank BCA - Rekening Operasional", "ASSET", ids["1100"])
    ids["1104"] = create_account("1104", "Bank Mandiri - Rekening Operasional", "ASSET", ids["1100"])
    ids["1105"] = create_account("1105", "Bank BNI - Rekening Operasional", "ASSET", ids["1100"])
    ids["1110"] = create_account("1110", "Piutang Usaha", "ASSET", ids["1100"])
    ids["1111"] = create_account("1111", "Piutang Usaha - Distributor", "ASSET", ids["1100"])
    ids["1112"] = create_account("1112", "Piutang Usaha - Modern Trade", "ASSET", ids["1100"])
    ids["1113"] = create_account("1113", "Piutang Usaha - Ekspor", "ASSET", ids["1100"])
    ids["1115"] = create_account("1115", "Cadangan Kerugian Piutang", "ASSET", ids["1100"])
    ids["1120"] = create_account("1120", "Persediaan", "ASSET", ids["1100"], False)
    ids["1121"] = create_account("1121", "Persediaan Bahan Baku", "ASSET", ids["1120"])
    ids["1122"] = create_account("1122", "Persediaan Bahan Pembantu", "ASSET", ids["1120"])
    ids["1123"] = create_account("1123", "Persediaan Bahan Pengemas", "ASSET", ids["1120"])
    ids["1124"] = create_account("1124", "Persediaan Barang Dalam Proses (WIP)", "ASSET", ids["1120"])
    ids["1125"] = create_account("1125", "Persediaan Barang Jadi", "ASSET", ids["1120"])
    ids["1126"] = create_account("1126", "Persediaan Barang Dagang", "ASSET", ids["1120"])
    ids["1127"] = create_account("1127", "Persediaan Suku Cadang & Supplies", "ASSET", ids["1120"])
    ids["1130"] = create_account("1130", "Uang Muka & Biaya Dibayar Dimuka", "ASSET", ids["1100"], False)
    ids["1131"] = create_account("1131", "Uang Muka Pembelian", "ASSET", ids["1130"])
    ids["1132"] = create_account("1132", "Uang Muka Biaya Produksi", "ASSET", ids["1130"])
    ids["1133"] = create_account("1133", "Biaya Sewa Dibayar Dimuka", "ASSET", ids["1130"])
    ids["1134"] = create_account("1134", "Biaya Asuransi Dibayar Dimuka", "ASSET", ids["1130"])
    ids["1135"] = create_account("1135", "Pajak Dibayar Dimuka (PPN Masukan)", "ASSET", ids["1130"])
    ids["1136"] = create_account("1136", "Pajak Dibayar Dimuka (PPh 22)", "ASSET", ids["1130"])
    ids["1137"] = create_account("1137", "Pajak Dibayar Dimuka (PPh 23)", "ASSET", ids["1130"])
    ids["1140"] = create_account("1140", "Piutang Lain-lain", "ASSET", ids["1100"])
    ids["1141"] = create_account("1141", "Piutang Karyawan", "ASSET", ids["1100"])
    # Aset Tidak Lancar
    ids["1200"] = create_account("1200", "Aset Tidak Lancar", "ASSET", ids["1000"], False)
    ids["1210"] = create_account("1210", "Aset Tetap", "ASSET", ids["1200"], False)
    ids["1211"] = create_account("1211", "Tanah", "ASSET", ids["1210"])
    ids["1212"] = create_account("1212", "Bangunan & Gedung", "ASSET", ids["1210"])
    ids["1213"] = create_account("1213", "Akumulasi Penyusutan Bangunan", "ASSET", ids["1210"])
    ids["1214"] = create_account("1214", "Mesin & Peralatan Produksi", "ASSET", ids["1210"])
    ids["1215"] = create_account("1215", "Akumulasi Penyusutan Mesin", "ASSET", ids["1210"])
    ids["1216"] = create_account("1216", "Kendaraan Operasional", "ASSET", ids["1210"])
    ids["1217"] = create_account("1217", "Akumulasi Penyusutan Kendaraan", "ASSET", ids["1210"])
    ids["1218"] = create_account("1218", "Peralatan Kantor & Komputer", "ASSET", ids["1210"])
    ids["1219"] = create_account("1219", "Akumulasi Penyusutan Peralatan Kantor", "ASSET", ids["1210"])
    ids["1220"] = create_account("1220", "Instalasi & Infrastruktur Pabrik", "ASSET", ids["1210"])
    ids["1221"] = create_account("1221", "Akumulasi Penyusutan Instalasi", "ASSET", ids["1210"])
    ids["1230"] = create_account("1230", "Aset Tak Berwujud", "ASSET", ids["1200"], False)
    ids["1231"] = create_account("1231", "Goodwill", "ASSET", ids["1230"])
    ids["1232"] = create_account("1232", "Merek Dagang & Lisensi", "ASSET", ids["1230"])
    ids["1233"] = create_account("1233", "Software & Sistem ERP", "ASSET", ids["1230"])
    ids["1234"] = create_account("1234", "Amortisasi Aset Tak Berwujud", "ASSET", ids["1230"])
    ids["1240"] = create_account("1240", "Investasi Jangka Panjang", "ASSET", ids["1200"], False)
    ids["1241"] = create_account("1241", "Investasi Saham Anak Perusahaan", "ASSET", ids["1240"])
    ids["1242"] = create_account("1242", "Investasi pada Entitas Asosiasi", "ASSET", ids["1240"])
    ids["1250"] = create_account("1250", "Aset Tidak Lancar Lainnya", "ASSET", ids["1200"])
    ids["1251"] = create_account("1251", "Uang Jaminan Sewa", "ASSET", ids["1200"])

    print("\n=== 2. LIABILITAS (2xxx) ===")
    ids["2000"] = create_account("2000", "LIABILITAS", "LIABILITY", is_posting=False)
    # Liabilitas Jangka Pendek
    ids["2100"] = create_account("2100", "Liabilitas Jangka Pendek", "LIABILITY", ids["2000"], False)
    ids["2101"] = create_account("2101", "Utang Usaha - Pemasok Bahan Baku", "LIABILITY", ids["2100"])
    ids["2102"] = create_account("2102", "Utang Usaha - Jasa & Overhead", "LIABILITY", ids["2100"])
    ids["2103"] = create_account("2103", "Utang Usaha - Pengemas", "LIABILITY", ids["2100"])
    ids["2110"] = create_account("2110", "Uang Muka Pelanggan", "LIABILITY", ids["2100"])
    ids["2111"] = create_account("2111", "Pendapatan Diterima Dimuka", "LIABILITY", ids["2100"])
    ids["2120"] = create_account("2120", "Utang Pajak", "LIABILITY", ids["2100"], False)
    ids["2121"] = create_account("2121", "Utang PPN Keluaran", "LIABILITY", ids["2120"])
    ids["2122"] = create_account("2122", "Utang PPh 21 (Karyawan)", "LIABILITY", ids["2120"])
    ids["2123"] = create_account("2123", "Utang PPh 23 (Jasa)", "LIABILITY", ids["2120"])
    ids["2124"] = create_account("2124", "Utang PPh 25/29 (Badan)", "LIABILITY", ids["2120"])
    ids["2130"] = create_account("2130", "Utang Gaji & Tunjangan", "LIABILITY", ids["2100"])
    ids["2131"] = create_account("2131", "Utang Gaji Karyawan", "LIABILITY", ids["2100"])
    ids["2132"] = create_account("2132", "Utang Tunjangan Hari Raya (THR)", "LIABILITY", ids["2100"])
    ids["2133"] = create_account("2133", "Utang BPJS Ketenagakerjaan", "LIABILITY", ids["2100"])
    ids["2134"] = create_account("2134", "Utang BPJS Kesehatan", "LIABILITY", ids["2100"])
    ids["2140"] = create_account("2140", "Akrual & Provisi Jangka Pendek", "LIABILITY", ids["2100"])
    ids["2141"] = create_account("2141", "Biaya Masih Harus Dibayar", "LIABILITY", ids["2100"])
    ids["2142"] = create_account("2142", "Provisi Garansi Produk", "LIABILITY", ids["2100"])
    ids["2150"] = create_account("2150", "Pinjaman Bank Jangka Pendek", "LIABILITY", ids["2100"])
    ids["2151"] = create_account("2151", "Kredit Modal Kerja - BCA", "LIABILITY", ids["2100"])
    ids["2152"] = create_account("2152", "Kredit Modal Kerja - Mandiri", "LIABILITY", ids["2100"])
    ids["2160"] = create_account("2160", "Utang Lain-lain Jangka Pendek", "LIABILITY", ids["2100"])
    # Liabilitas Jangka Panjang
    ids["2200"] = create_account("2200", "Liabilitas Jangka Panjang", "LIABILITY", ids["2000"], False)
    ids["2201"] = create_account("2201", "Pinjaman Bank Jangka Panjang", "LIABILITY", ids["2200"])
    ids["2202"] = create_account("2202", "Kredit Investasi - BCA", "LIABILITY", ids["2200"])
    ids["2203"] = create_account("2203", "Kredit Investasi - Mandiri", "LIABILITY", ids["2200"])
    ids["2210"] = create_account("2210", "Utang Sewa Pembiayaan (Finance Lease)", "LIABILITY", ids["2200"])
    ids["2220"] = create_account("2220", "Provisi Imbalan Kerja Jangka Panjang", "LIABILITY", ids["2200"])
    ids["2221"] = create_account("2221", "Provisi Pesangon & Pensiun (PSAK 24)", "LIABILITY", ids["2200"])
    ids["2230"] = create_account("2230", "Utang Lain-lain Jangka Panjang", "LIABILITY", ids["2200"])

    print("\n=== 3. EKUITAS (3xxx) ===")
    ids["3000"] = create_account("3000", "EKUITAS", "EQUITY", is_posting=False)
    ids["3010"] = create_account("3010", "Modal Saham Disetor", "EQUITY", ids["3000"])
    ids["3011"] = create_account("3011", "Modal Saham - Nominal", "EQUITY", ids["3000"])
    ids["3012"] = create_account("3012", "Agio Saham (Tambahan Modal Disetor)", "EQUITY", ids["3000"])
    ids["3020"] = create_account("3020", "Saldo Laba (Retained Earnings)", "EQUITY", ids["3000"])
    ids["3021"] = create_account("3021", "Saldo Laba Ditahan", "EQUITY", ids["3000"])
    ids["3022"] = create_account("3022", "Dividen Dibagikan", "EQUITY", ids["3000"])
    ids["3030"] = create_account("3030", "Laba Rugi Tahun Berjalan", "EQUITY", ids["3000"])
    ids["3040"] = create_account("3040", "Komponen Ekuitas Lainnya (OCI)", "EQUITY", ids["3000"])
    ids["3041"] = create_account("3041", "Selisih Kurs Translasi", "EQUITY", ids["3000"])
    ids["3042"] = create_account("3042", "Keuntungan/(Kerugian) Aktuarial", "EQUITY", ids["3000"])

    print("\n=== 4. PENDAPATAN (4xxx) ===")
    ids["4000"] = create_account("4000", "PENDAPATAN", "INCOME", is_posting=False)
    ids["4100"] = create_account("4100", "Pendapatan Penjualan", "INCOME", ids["4000"], False)
    ids["4101"] = create_account("4101", "Penjualan Produk Minuman", "INCOME", ids["4100"])
    ids["4102"] = create_account("4102", "Penjualan Produk Makanan", "INCOME", ids["4100"])
    ids["4103"] = create_account("4103", "Penjualan Produk Private Label", "INCOME", ids["4100"])
    ids["4104"] = create_account("4104", "Penjualan Ekspor", "INCOME", ids["4100"])
    ids["4110"] = create_account("4110", "Retur & Potongan Penjualan", "INCOME", ids["4100"])
    ids["4111"] = create_account("4111", "Retur Penjualan", "INCOME", ids["4100"])
    ids["4112"] = create_account("4112", "Diskon Penjualan", "INCOME", ids["4100"])
    ids["4113"] = create_account("4113", "Potongan Komisi Penjualan", "INCOME", ids["4100"])
    ids["4120"] = create_account("4120", "Pendapatan Lain-lain", "INCOME", ids["4000"], False)
    ids["4121"] = create_account("4121", "Pendapatan Jasa Maklon / Toll Manufacturing", "INCOME", ids["4120"])
    ids["4122"] = create_account("4122", "Pendapatan Bunga Bank", "INCOME", ids["4120"])
    ids["4123"] = create_account("4123", "Keuntungan Selisih Kurs", "INCOME", ids["4120"])
    ids["4124"] = create_account("4124", "Pendapatan Sewa Fasilitas", "INCOME", ids["4120"])
    ids["4125"] = create_account("4125", "Keuntungan Penjualan Aset Tetap", "INCOME", ids["4120"])
    ids["4126"] = create_account("4126", "Pendapatan Lain-lain", "INCOME", ids["4120"])

    print("\n=== 5. HARGA POKOK PENJUALAN (5xxx) ===")
    ids["5000"] = create_account("5000", "HARGA POKOK PENJUALAN (HPP)", "EXPENSE", is_posting=False)
    ids["5100"] = create_account("5100", "Harga Pokok Produksi", "EXPENSE", ids["5000"], False)
    ids["5101"] = create_account("5101", "Bahan Baku Langsung", "EXPENSE", ids["5100"])
    ids["5102"] = create_account("5102", "Bahan Pengemas Langsung", "EXPENSE", ids["5100"])
    ids["5103"] = create_account("5103", "Bahan Pembantu (Indirect Material)", "EXPENSE", ids["5100"])
    ids["5110"] = create_account("5110", "Biaya Tenaga Kerja Langsung", "EXPENSE", ids["5100"])
    ids["5111"] = create_account("5111", "Upah Buruh Produksi", "EXPENSE", ids["5100"])
    ids["5112"] = create_account("5112", "Tunjangan Tenaga Kerja Produksi", "EXPENSE", ids["5100"])
    ids["5113"] = create_account("5113", "Lembur Produksi", "EXPENSE", ids["5100"])
    ids["5120"] = create_account("5120", "Biaya Overhead Pabrik (BOP)", "EXPENSE", ids["5100"], False)
    ids["5121"] = create_account("5121", "Biaya Listrik Pabrik", "EXPENSE", ids["5120"])
    ids["5122"] = create_account("5122", "Biaya Air & BBM Pabrik", "EXPENSE", ids["5120"])
    ids["5123"] = create_account("5123", "Penyusutan Mesin & Peralatan Produksi", "EXPENSE", ids["5120"])
    ids["5124"] = create_account("5124", "Penyusutan Bangunan Pabrik", "EXPENSE", ids["5120"])
    ids["5125"] = create_account("5125", "Biaya Pemeliharaan Mesin", "EXPENSE", ids["5120"])
    ids["5126"] = create_account("5126", "Biaya Sewa Pabrik", "EXPENSE", ids["5120"])
    ids["5127"] = create_account("5127", "Biaya Quality Control & QA", "EXPENSE", ids["5120"])
    ids["5128"] = create_account("5128", "Biaya Asuransi Pabrik", "EXPENSE", ids["5120"])
    ids["5129"] = create_account("5129", "Biaya Overhead Pabrik Lainnya", "EXPENSE", ids["5120"])
    ids["5130"] = create_account("5130", "Varians Produksi", "EXPENSE", ids["5000"])
    ids["5131"] = create_account("5131", "Selisih Harga Bahan Baku", "EXPENSE", ids["5000"])
    ids["5132"] = create_account("5132", "Selisih Efisiensi Produksi", "EXPENSE", ids["5000"])
    ids["5140"] = create_account("5140", "Penyesuaian Persediaan", "EXPENSE", ids["5000"])
    ids["5141"] = create_account("5141", "Selisih Stok (Hasil Opname)", "EXPENSE", ids["5000"])
    ids["5142"] = create_account("5142", "Kerugian Barang Rusak / Kadaluarsa", "EXPENSE", ids["5000"])

    print("\n=== 6. BIAYA OPERASIONAL (6xxx) ===")
    ids["6000"] = create_account("6000", "BIAYA OPERASIONAL", "EXPENSE", is_posting=False)
    # Biaya Penjualan & Distribusi
    ids["6100"] = create_account("6100", "Biaya Penjualan & Distribusi", "EXPENSE", ids["6000"], False)
    ids["6101"] = create_account("6101", "Gaji & Tunjangan Tim Sales", "EXPENSE", ids["6100"])
    ids["6102"] = create_account("6102", "Komisi Sales & Agen", "EXPENSE", ids["6100"])
    ids["6103"] = create_account("6103", "Biaya Iklan & Promosi", "EXPENSE", ids["6100"])
    ids["6104"] = create_account("6104", "Biaya Pameran & Event Marketing", "EXPENSE", ids["6100"])
    ids["6105"] = create_account("6105", "Biaya Pengiriman & Ekspedisi", "EXPENSE", ids["6100"])
    ids["6106"] = create_account("6106", "Biaya Bahan Bakar Armada Distribusi", "EXPENSE", ids["6100"])
    ids["6107"] = create_account("6107", "Biaya Sewa Kendaraan Distribusi", "EXPENSE", ids["6100"])
    ids["6108"] = create_account("6108", "Biaya Penyusutan Kendaraan Distribusi", "EXPENSE", ids["6100"])
    ids["6109"] = create_account("6109", "Biaya Distribusi & Logistik Lainnya", "EXPENSE", ids["6100"])
    ids["6110"] = create_account("6110", "Biaya Riset Pasar & Digital Marketing", "EXPENSE", ids["6100"])
    ids["6111"] = create_account("6111", "Biaya Kemasan Promosi (Promo Pack)", "EXPENSE", ids["6100"])
    # Biaya Umum & Administrasi
    ids["6200"] = create_account("6200", "Biaya Umum & Administrasi (GA)", "EXPENSE", ids["6000"], False)
    ids["6201"] = create_account("6201", "Gaji & Tunjangan Direksi", "EXPENSE", ids["6200"])
    ids["6202"] = create_account("6202", "Gaji & Tunjangan Karyawan Kantor", "EXPENSE", ids["6200"])
    ids["6203"] = create_account("6203", "Biaya BPJS Ketenagakerjaan (Perusahaan)", "EXPENSE", ids["6200"])
    ids["6204"] = create_account("6204", "Biaya BPJS Kesehatan (Perusahaan)", "EXPENSE", ids["6200"])
    ids["6205"] = create_account("6205", "Biaya Pelatihan & Pengembangan SDM", "EXPENSE", ids["6200"])
    ids["6210"] = create_account("6210", "Biaya Sewa Kantor", "EXPENSE", ids["6200"])
    ids["6211"] = create_account("6211", "Biaya Listrik & Air Kantor", "EXPENSE", ids["6200"])
    ids["6212"] = create_account("6212", "Biaya Telekomunikasi & Internet", "EXPENSE", ids["6200"])
    ids["6213"] = create_account("6213", "Biaya ATK & Kebutuhan Kantor", "EXPENSE", ids["6200"])
    ids["6214"] = create_account("6214", "Biaya Pemeliharaan Gedung Kantor", "EXPENSE", ids["6200"])
    ids["6215"] = create_account("6215", "Biaya Keamanan & Kebersihan", "EXPENSE", ids["6200"])
    ids["6220"] = create_account("6220", "Biaya Perjalanan & Transportasi", "EXPENSE", ids["6200"])
    ids["6221"] = create_account("6221", "Biaya Perjalanan Dinas Domestik", "EXPENSE", ids["6200"])
    ids["6222"] = create_account("6222", "Biaya Perjalanan Dinas Luar Negeri", "EXPENSE", ids["6200"])
    ids["6230"] = create_account("6230", "Biaya Profesional & Konsultasi", "EXPENSE", ids["6200"])
    ids["6231"] = create_account("6231", "Biaya Konsultan Hukum", "EXPENSE", ids["6200"])
    ids["6232"] = create_account("6232", "Biaya Akuntan Publik / Audit", "EXPENSE", ids["6200"])
    ids["6233"] = create_account("6233", "Biaya Notaris & Perizinan", "EXPENSE", ids["6200"])
    ids["6240"] = create_account("6240", "Biaya Penyusutan & Amortisasi (GA)", "EXPENSE", ids["6200"])
    ids["6241"] = create_account("6241", "Penyusutan Peralatan Kantor", "EXPENSE", ids["6200"])
    ids["6242"] = create_account("6242", "Amortisasi Software & Lisensi", "EXPENSE", ids["6200"])
    ids["6250"] = create_account("6250", "Biaya Asuransi Umum", "EXPENSE", ids["6200"])
    ids["6260"] = create_account("6260", "Biaya Administrasi & Umum Lainnya", "EXPENSE", ids["6200"])
    # Biaya R&D
    ids["6300"] = create_account("6300", "Biaya Riset & Pengembangan Produk (R&D)", "EXPENSE", ids["6000"], False)
    ids["6301"] = create_account("6301", "Gaji Tim R&D", "EXPENSE", ids["6300"])
    ids["6302"] = create_account("6302", "Biaya Material Riset", "EXPENSE", ids["6300"])
    ids["6303"] = create_account("6303", "Biaya Uji Laboratorium & Sertifikasi", "EXPENSE", ids["6300"])
    ids["6304"] = create_account("6304", "Biaya R&D Lainnya", "EXPENSE", ids["6300"])

    print("\n=== 7. BIAYA KEUANGAN (7xxx) ===")
    ids["7000"] = create_account("7000", "BIAYA KEUANGAN & LAIN-LAIN", "EXPENSE", is_posting=False)
    ids["7100"] = create_account("7100", "Biaya Bunga & Keuangan", "EXPENSE", ids["7000"], False)
    ids["7101"] = create_account("7101", "Biaya Bunga Pinjaman Bank", "EXPENSE", ids["7100"])
    ids["7102"] = create_account("7102", "Biaya Bunga Leasing", "EXPENSE", ids["7100"])
    ids["7103"] = create_account("7103", "Biaya Administrasi Bank", "EXPENSE", ids["7100"])
    ids["7110"] = create_account("7110", "Kerugian Selisih Kurs", "EXPENSE", ids["7000"])
    ids["7120"] = create_account("7120", "Biaya Pajak Penghasilan (PPh Badan)", "EXPENSE", ids["7000"])
    ids["7121"] = create_account("7121", "Beban Pajak Kini", "EXPENSE", ids["7000"])
    ids["7122"] = create_account("7122", "Beban Pajak Tangguhan", "EXPENSE", ids["7000"])
    ids["7130"] = create_account("7130", "Kerugian Penurunan Nilai Aset", "EXPENSE", ids["7000"])
    ids["7140"] = create_account("7140", "Biaya Non-Operasional Lainnya", "EXPENSE", ids["7000"])
    ids["7141"] = create_account("7141", "Denda & Penalti", "EXPENSE", ids["7000"])
    ids["7142"] = create_account("7142", "Kerugian Penjualan Aset Tetap", "EXPENSE", ids["7000"])
    ids["7143"] = create_account("7143", "Biaya CSR & Donasi", "EXPENSE", ids["7000"])

    # Summary
    total = len([v for v in ids.values() if v])
    print(f"\n✅ Total akun berhasil dibuat: {total}")

if __name__ == "__main__":
    main()
