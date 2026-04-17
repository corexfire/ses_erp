import sys
import json
import urllib.request
import urllib.parse
import random

login_data = json.dumps({"email": "zubair.mi45@gmail.com", "password": "Zubair12345@@"}).encode('utf-8')
login_req = urllib.request.Request("http://localhost:4123/auth/login", data=login_data, headers={'Content-Type': 'application/json'})

cookie = ""
try:
    with urllib.request.urlopen(login_req) as response:
        cookie = response.info().get('Set-Cookie', '').split(';')[0]
except Exception as e:
    print(f"Login failed: {e}")
    sys.exit(1)

suppliers = [
    {
        "code": "SUP-RAW-001", "name": "PT Sumber Tani Indonesia", "email": "sales@sumbertani.id", "phone": "021-1234567",
        "address1": "Jl. Raya Bogor KM 30", "city": "Bogor", "province": "Jawa Barat", "postalCode": "16110",
        "vendorGroup": "RAW_MATERIALS", "npwp": "45.123.456.7-432.000", "bankName": "BCA", "bankAccount": "0912831201", "paymentTerms": "NET30"
    },
    {
        "code": "SUP-RAW-002", "name": "CV Alam Segar Makmur", "email": "order@alamsegar.com", "phone": "021-9922334",
        "address1": "Kawasan Industri Pulo Gadung Kav. 12", "city": "Jakarta Timur", "province": "DKI Jakarta", "postalCode": "13920",
        "vendorGroup": "RAW_MATERIALS", "npwp": "12.333.444.1-012.000", "bankName": "Mandiri", "bankAccount": "119001231231", "paymentTerms": "NET45"
    },
    {
        "code": "SUP-PKG-001", "name": "PT Packaging Solusi Cerdas", "email": "info@packagingsurabaya.co.id", "phone": "031-8899011",
        "address1": "Jl. Rungkut Industri Raya No 45", "city": "Surabaya", "province": "Jawa Timur", "postalCode": "60293",
        "vendorGroup": "PACKAGING", "npwp": "88.991.111.4-601.000", "bankName": "BNI", "bankAccount": "0123912381", "paymentTerms": "NET30"
    },
    {
        "code": "SUP-PKG-002", "name": "PT Mega Plastik Jaya", "email": "sales@megaplastik.com", "phone": "021-7788112",
        "address1": "Kawasan Industri MM2100", "city": "Bekasi", "province": "Jawa Barat", "postalCode": "17530",
        "vendorGroup": "PACKAGING", "npwp": "02.555.333.9-432.000", "bankName": "BCA", "bankAccount": "8120039123", "paymentTerms": "NET60"
    },
    {
        "code": "SUP-SRV-001", "name": "PT Bersih Kilau Facility", "email": "cs@bersihkilau.co.id", "phone": "021-5551234",
        "address1": "Jl. Sudirman Kav 20, Gedung A", "city": "Jakarta Selatan", "province": "DKI Jakarta", "postalCode": "12190",
        "vendorGroup": "SERVICES", "npwp": "33.222.111.0-011.000", "bankName": "CIMB Niaga", "bankAccount": "912312411", "paymentTerms": "NET14"
    },
    {
        "code": "SUP-EQP-001", "name": "Indo Tech Machinery TBK", "email": "sales@indotech.id", "phone": "021-8822341",
        "address1": "Kawasan Jababeka Tahap I Blok ABCD", "city": "Cikarang", "province": "Jawa Barat", "postalCode": "17550",
        "vendorGroup": "EQUIPMENT", "npwp": "99.888.777.6-432.000", "bankName": "BRI", "bankAccount": "021301012381501", "paymentTerms": "DP50_NET30"
    },
    {
        "code": "SUP-GEN-001", "name": "CV Utama Mandiri Office Supplies", "email": "office@utamamandiri.co.id", "phone": "021-3311222",
        "address1": "Jl. Mangga Dua Raya Blok E2", "city": "Jakarta Pusat", "province": "DKI Jakarta", "postalCode": "10730",
        "vendorGroup": "GENERAL", "npwp": "11.222.333.4-021.000", "bankName": "BCA", "bankAccount": "1230092131", "paymentTerms": "COD"
    }
]

for s in suppliers:
    req = urllib.request.Request(
        "http://localhost:4123/procurement/suppliers",
        data=json.dumps(s).encode('utf-8'),
        headers={'Content-Type': 'application/json', 'Cookie': cookie},
        method='POST'
    )
    try:
        urllib.request.urlopen(req)
        print(f"✅ Created Supplier: {s['code']} - {s['name']}")
    except Exception as e:
        if hasattr(e, 'read'):
            print(f"❌ Failed to create {s['code']}: {e.read().decode('utf-8')}")
        else:
            print(f"❌ Failed to create {s['code']}: {e}")

