import sys
import json
import urllib.request
import urllib.parse
from datetime import datetime, timedelta
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

# We want to inject raw Audit Logs into DB directly if the API doesn't have an endpoint for seeding them.
# The `/core/audit-logs` endpoint is typically only for GET. We already have `AuditLog` Prisma model accessible via our previous backend Python DB scripts? Nonono we don't have python-prisma setup. But we have `AuditService.log` in nestjs. Let's just create a quick TS script and run it via ts-node, OR better yet, we can write a tiny seeder script to insert directly into PostgreSQL using psql or raw SQL if needed. Wait, we can hit the local PostgreSQL database because we know the URL. Or simpler: make a temp JS script using prisma client.

