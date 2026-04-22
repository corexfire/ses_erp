#!/bin/bash
export DATABASE_URL="postgresql://ses_erp:ses_erp@localhost:5432/ses_erp?schema=public"
export SEED_TENANT_NAME="Default Tenant"
export PATH="/Users/corexfire/.bun/bin:$PATH"

# Get tenant ID
TENANT_ID=$(bun -e "const { PrismaClient } = require('./prisma/generated/client'); const { PrismaPg } = require('@prisma/adapter-pg'); const { Pool } = require('pg'); const pool = new Pool({ connectionString: '$DATABASE_URL' }); const prisma = new PrismaClient({ adapter: new PrismaPg(pool) }); prisma.tenant.findUnique({ where: { name: '$SEED_TENANT_NAME' } }).then(t => { console.log(t.id); process.exit(0); });")

echo "Target Tenant ID: $TENANT_ID"

# Execute Sustainability seed
bun -e "const { PrismaClient } = require('./prisma/generated/client'); const { PrismaPg } = require('@prisma/adapter-pg'); const { Pool } = require('pg'); const { seedSupportSustainability } = require('./prisma/seed-support-sustainability'); const pool = new Pool({ connectionString: '$DATABASE_URL' }); const prisma = new PrismaClient({ adapter: new PrismaPg(pool) }); seedSupportSustainability(prisma, '$TENANT_ID').then(() => process.exit(0));"
