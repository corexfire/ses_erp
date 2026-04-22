#!/bin/bash
export DATABASE_URL="postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public"
export SEED_TENANT_NAME="Default Tenant"
export PATH="/Users/corexfire/.bun/bin:$PATH"

cd "$(dirname "$0")/.."
bun prisma/seed-crm.ts
