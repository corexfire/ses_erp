import sys
import json
import urllib.request
import urllib.parse
import time

login_data = json.dumps({"email": "zubair.mi45@gmail.com", "password": "Zubair12345@@"}).encode('utf-8')
login_req = urllib.request.Request("http://localhost:4123/auth/login", data=login_data, headers={'Content-Type': 'application/json'})

cookie = ""
try:
    with urllib.request.urlopen(login_req) as response:
        cookie = response.info().get('Set-Cookie', '').split(';')[0]
except Exception as e:
    print(f"Login failed: {e}")
    sys.exit(1)

# Get current user
user_req = urllib.request.Request("http://localhost:4123/core/users", headers={'Cookie': cookie})
users_resp = urllib.request.urlopen(user_req)
users = json.loads(users_resp.read().decode('utf-8'))['users']
zubair = next((u for u in users if u['email'] == 'zubair.mi45@gmail.com'), None)
if not zubair:
    print("User zubair not found")
    sys.exit(1)

# Get roles
roles_req = urllib.request.Request("http://localhost:4123/core/roles", headers={'Cookie': cookie})
roles_resp = urllib.request.urlopen(roles_req)
roles = json.loads(roles_resp.read().decode('utf-8'))['roles']

# Assign all roles to zubair so he appears as the approver
existing_role_ids = set(r['role']['id'] for r in zubair.get('roles', []))
for r in roles:
    if r['id'] not in existing_role_ids:
        try:
            req = urllib.request.Request(
                f"http://localhost:4123/core/users/{zubair['id']}/roles",
                data=json.dumps({"roleId": r['id']}).encode('utf-8'),
                headers={'Content-Type': 'application/json', 'Cookie': cookie}
            )
            urllib.request.urlopen(req)
            print(f"Assigned role {r['name']} to Zubair")
        except:
            pass

# Get workflows
wf_req = urllib.request.Request("http://localhost:4123/core/workflows", headers={'Cookie': cookie})
wf_resp = urllib.request.urlopen(wf_req)
workflows = json.loads(wf_resp.read().decode('utf-8')).get('workflows', [])

print("Triggering dummy workflows...")
dummy_docs = [
    {"docType": "PO", "docId": "PO-2026-0001", "moduleKey": "PROCUREMENT"},
    {"docType": "PO", "docId": "PO-2026-0002", "moduleKey": "PROCUREMENT"},
    {"docType": "SO", "docId": "SO-2026-0001", "moduleKey": "SALES"},
    {"docType": "SO", "docId": "SO-2026-0002", "moduleKey": "SALES"},
    {"docType": "INV_REQUEST", "docId": "TF-2026-0001", "moduleKey": "INVENTORY"},
    {"docType": "WO", "docId": "WO-2026-0001", "moduleKey": "PRODUCTION"},
    {"docType": "PV", "docId": "PV-2026-0001", "moduleKey": "FINANCE"},
    {"docType": "PV", "docId": "PV-2026-0002", "moduleKey": "FINANCE"}
]

for doc in dummy_docs:
    # Find active workflow definition for docType
    wDef = next((w for w in workflows if w['docType'] == doc['docType'] and w['isActive']), None)
    if wDef:
        req = urllib.request.Request(
            "http://localhost:4123/workflow/trigger",
            data=json.dumps({"docType": doc["docType"], "docId": doc["docId"]}).encode('utf-8'),
            headers={'Content-Type': 'application/json', 'Cookie': cookie}
        )
        try:
            resp = urllib.request.urlopen(req)
            print(f"✅ Triggered {doc['docId']} via {wDef['name']}")
        except Exception as e:
            print(f"❌ Failed triggering {doc['docId']}: {e}")
