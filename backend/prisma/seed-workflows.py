import sys
import json
import urllib.request
import urllib.parse
from datetime import datetime

login_data = json.dumps({"email": "zubair.mi45@gmail.com", "password": "Zubair12345@@"}).encode('utf-8')
login_req = urllib.request.Request("http://localhost:4123/auth/login", data=login_data, headers={'Content-Type': 'application/json'})

cookie = ""
try:
    with urllib.request.urlopen(login_req) as response:
        headers = response.info()
        cookie = headers.get('Set-Cookie', '').split(';')[0]
except Exception as e:
    print(f"Login failed: {e}")
    sys.exit(1)

# Ambil roles untuk mapping role name ke role ID
roles_req = urllib.request.Request("http://localhost:4123/core/roles", headers={'Cookie': cookie})
roles_resp = urllib.request.urlopen(roles_req)
roles_data = json.loads(roles_resp.read().decode('utf-8'))['roles']
role_map = {r['name']: r['id'] for r in roles_data}

def get_role_id(name):
    return role_map.get(name, "")

workflows = [
    {
        "name": "Persetujuan Purchase Order (Standard)",
        "moduleKey": "PROCUREMENT",
        "docType": "PO",
        "steps": [
            {"roleName": "Manager Pembelian (Procurement)", "name": "Review Manager Proc"},
            {"roleName": "Manager Keuangan & Akuntansi", "name": "Review Finance"},
            {"roleName": "Direktur", "name": "Final Approval PO"}
        ]
    },
    {
        "name": "Persetujuan Sales Order (Modern Trade)",
        "moduleKey": "SALES",
        "docType": "SO",
        "steps": [
            {"roleName": "Sales Admin / SPV", "name": "Verifikasi Stok & Harga"},
            {"roleName": "Manager Penjualan", "name": "Persetujuan SO"},
            {"roleName": "Staff Keuangan (A/R & A/P)", "name": "Cek Limit Kredit"}
        ]
    },
    {
        "name": "Persetujuan Request Gudang (Transfer/Issue)",
        "moduleKey": "INVENTORY",
        "docType": "INV_REQUEST",
        "steps": [
            {"roleName": "Kepala Gudang", "name": "Persetujuan Kepala Gudang"},
            {"roleName": "Manager Gudang & Logistik", "name": "Final Approval Request"}
        ]
    },
    {
        "name": "Persetujuan Produksi (Work Order)",
        "moduleKey": "PRODUCTION",
        "docType": "WO",
        "steps": [
            {"roleName": "SPV Produksi", "name": "Pengecekan Komponen"},
            {"roleName": "Manager Produksi", "name": "Release WO"}
        ]
    },
    {
        "name": "Persetujuan Pengeluaran Kas (Payment Voucher)",
        "moduleKey": "FINANCE",
        "docType": "PV",
        "steps": [
            {"roleName": "Staff Keuangan (A/R & A/P)", "name": "Verifikasi Dokumen"},
            {"roleName": "Manager Keuangan & Akuntansi", "name": "Approve Payment"},
            {"roleName": "Direktur", "name": "Final Approve Cash Out"}
        ]
    }
]

for wf in workflows:
    # Create header
    req_data = json.dumps({
        "name": wf["name"],
        "moduleKey": wf["moduleKey"],
        "docType": wf["docType"]
    }).encode('utf-8')
    req = urllib.request.Request("http://localhost:4123/core/workflows", data=req_data, headers={'Content-Type': 'application/json', 'Cookie': cookie})
    try:
        resp = urllib.request.urlopen(req)
        def_data = json.loads(resp.read().decode('utf-8'))['workflow']
        print(f"✅ Created Workflow: {def_data['name']}")
        
        # Create steps
        for step in wf["steps"]:
            role_id = get_role_id(step["roleName"])
            if not role_id:
                print(f"  ❌ Role '{step['roleName']}' not found!")
                continue
            
            step_data = json.dumps({
                "roleId": role_id,
                "name": step["name"]
            }).encode('utf-8')
            s_req = urllib.request.Request(f"http://localhost:4123/core/workflows/{def_data['id']}/steps", data=step_data, headers={'Content-Type': 'application/json', 'Cookie': cookie})
            s_resp = urllib.request.urlopen(s_req)
            print(f"    -> Added Step: {step['name']}")
    except Exception as e:
        print(f"❌ Failed to create workflow '{wf['name']}': {e}")
