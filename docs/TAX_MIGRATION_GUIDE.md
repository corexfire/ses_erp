# Tax Module Migration Guide

## Overview
Tax compliance modules have been moved from standalone `src/tax/` to `src/finance/tax-compliance/`.

## Backend Changes

### API Routes Changed
| Old Route | New Route |
|-----------|-----------|
| `GET /tax/faktur-keluaran` | `GET /finance/tax/faktur-keluaran` |
| `POST /tax/faktur-keluaran` | `POST /finance/tax/faktur-keluaran` |
| `POST /tax/faktur-keluaran/auto-generate-from-sales/:id` | `POST /finance/tax/faktur-keluaran/auto-generate-from-sales/:id` |
| `POST /tax/faktur-keluaran/:id/issue-fp` | `POST /finance/tax/faktur-keluaran/:id/issue-fp` |
| `GET /tax/faktur-masukan` | `GET /finance/tax/faktur-masukan` |
| `POST /tax/faktur-masukan` | `POST /finance/tax/faktur-masukan` |
| `GET /tax/nsfp` | `GET /finance/tax/nsfp` |
| `POST /tax/nsfp` | `POST /finance/tax/nsfp` |
| `GET /tax/ppn-masa` | `GET /finance/tax/ppn-masa` |
| `GET /tax/e-bupot` | `GET /finance/tax/e-bupot` |
| `POST /tax/e-bupot` | `POST /finance/tax/e-bupot` |
| `POST /tax/e-bupot/:id/issue-bupot` | `POST /finance/tax/e-bupot/:id/issue-bupot` |
| `GET /tax/pph21` | `GET /finance/tax/pph21` |
| `POST /tax/pph21` | `POST /finance/tax/pph21` |
| `GET /tax/bukti-potong` | `GET /finance/tax/bukti-potong` |
| `GET /tax/bukti-potong/:id/print` | `GET /finance/tax/bukti-potong/:id/print` |
| `GET /tax/id-billing` | `GET /finance/tax/id-billing` |
| `POST /tax/id-billing` | `POST /finance/tax/id-billing` |
| `POST /tax/id-billing/:id/paid` | `POST /finance/tax/id-billing/:id/paid` |
| `GET /tax/equalization` | `GET /finance/tax/equalization` |
| `POST /tax/equalization` | `POST /finance/tax/equalization` |
| `POST /tax/equalization/:id/approve` | `POST /finance/tax/equalization/:id/approve` |
| `GET /tax/fiscal-reconciliation` | `GET /finance/tax/fiscal-reconciliation` |
| `POST /tax/fiscal-reconciliation/:id/generate-report` | `POST /finance/tax/fiscal-reconciliation/:id/generate-report` |

## Permissions Changed

Run the migration script to update permissions:
```bash
cd backend
node migrate_tax_permissions.mjs
```

To rollback if needed:
```bash
node rollback_tax_permissions.mjs
```

### Permission Key Changes
| Old Permission | New Permission |
|----------------|----------------|
| `tax.fakturKeluaran.*` | `finance.tax.fakturKeluaran.*` |
| `tax.fakturMasukan.*` | `finance.tax.fakturMasukan.*` |
| `tax.nsfp.*` | `finance.tax.nsfp.*` |
| `tax.ppnMasa.*` | `finance.tax.ppnMasa.*` |
| `tax.eBupot.*` | `finance.tax.eBupot.*` |
| `tax.pph21.*` | `finance.tax.pph21.*` |
| `tax.buktiPotong.*` | `finance.tax.buktiPotong.*` |
| `tax.idBilling.*` | `finance.tax.idBilling.*` |
| `tax.equalization.*` | `finance.tax.equalization.*` |
| `tax.fiscalReconciliation.*` | `finance.tax.fiscalReconciliation.*` |

## Frontend Updates Required

### 1. Update API Service File
```typescript
// Before
const TAX_API = '/api/tax'

// After
const TAX_API = '/api/finance/tax'
```

### 2. Update Menu Structure
Move Tax menu items under Finance menu:
```
Finance
├── Chart of Accounts
├── Journal Entries
├── Accounts Payable
├── Accounts Receivable
├── ...
├── Tax Compliance          ← Previously under separate Tax menu
│   ├── Faktur Pajak
│   ├── PPN Masa
│   ├── E-Bupot
│   ├── PPh 21
│   ├── Bukti Potong
│   └── ...
```

### 3. Update Route Guards
```typescript
// Before
{ permission: 'tax.fakturKeluaran.read' }

// After
{ permission: 'finance.tax.fakturKeluaran.read' }
```

## Database Migration
No schema changes required - only permission keys are being updated.
