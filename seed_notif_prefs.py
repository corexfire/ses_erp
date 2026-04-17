import sys
import json
import urllib.request
import urllib.parse

login_data = json.dumps({"email": "zubair.mi45@gmail.com", "password": "Zubair12345@@"}).encode('utf-8')
login_req = urllib.request.Request("http://localhost:4123/auth/login", data=login_data, headers={'Content-Type': 'application/json'})

cookie = ""
try:
    with urllib.request.urlopen(login_req) as response:
        cookie = response.info().get('Set-Cookie', '').split(';')[0]
except Exception as e:
    print(f"Login failed: {e}")
    sys.exit(1)

prefs = [
    {"eventKey": "WORKFLOW_APPROVAL_REQUEST", "inAppEnabled": True, "emailEnabled": True, "whatsappEnabled": True, "smsEnabled": False},
    {"eventKey": "WORKFLOW_APPROVED", "inAppEnabled": True, "emailEnabled": False, "whatsappEnabled": False, "smsEnabled": False},
    {"eventKey": "WORKFLOW_REJECTED", "inAppEnabled": True, "emailEnabled": True, "whatsappEnabled": True, "smsEnabled": False},
    {"eventKey": "WORKFLOW_SLA_WARNING", "inAppEnabled": True, "emailEnabled": True, "whatsappEnabled": True, "smsEnabled": True},
    {"eventKey": "STOCK_LOW_ALERT", "inAppEnabled": True, "emailEnabled": True, "whatsappEnabled": False, "smsEnabled": False},
    {"eventKey": "PAYMENT_OVERDUE", "inAppEnabled": True, "emailEnabled": True, "whatsappEnabled": True, "smsEnabled": False},
    {"eventKey": "SYSTEM_ANNOUNCEMENT", "inAppEnabled": True, "emailEnabled": True, "whatsappEnabled": False, "smsEnabled": False},
    {"eventKey": "NEW_TENDER_INVITATION", "inAppEnabled": True, "emailEnabled": True, "whatsappEnabled": False, "smsEnabled": False}
]

req = urllib.request.Request(
    "http://localhost:4123/notifications/preferences",
    data=json.dumps({"items": prefs}).encode('utf-8'),
    headers={'Content-Type': 'application/json', 'Cookie': cookie},
    method='PUT'
)

try:
    urllib.request.urlopen(req)
    print("✅ Notification Preferences Seeded")
except Exception as e:
    print(f"Failed: {e}")

