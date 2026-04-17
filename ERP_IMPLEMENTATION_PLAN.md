# ERP Implementation Plan (By Phase)

Dokumen ini adalah rencana implementasi ERP berdasarkan struktur menu di [menu.md](file:///Users/corexfire/Documents/ses_erp/menu.md), dengan prioritas dimulai dari Core/Master Data lalu modul bisnis lainnya. Sistem dibangun modular (copot-pasang) untuk kebutuhan SaaS, memakai layered architecture, dan konsisten antara Frontend (Nuxt) dan Backend (NestJS).

## 1) Target Arsitektur

### 1.1 Prinsip Utama

- Modular: setiap domain menjadi modul yang dapat diaktifkan/nonaktifkan (feature flags + permission gating + route registration).
- Layered architecture: memisahkan Domain, Application, Infrastructure, Presentation.
- Multi-tenant ready (SaaS): tenant-aware data model dan auth context; modul bisa berbeda per tenant.
- Auditable: semua transaksi penting menghasilkan jejak audit.
- Security by default: RBAC/permission matrix wajib untuk setiap page dan endpoint.

### 1.2 Frontend Stack (Nuxt)

- Nuxt (Vite), TypeScript
- PrimeVue 4
- Pinia
- Tailwind CSS
- Axios (HTTP client)

Struktur layer FE yang disarankan:
- Presentation: pages, components, PrimeVue UI
- Application: use-cases via composables (mis. `useCreateSalesOrder`)
- State: Pinia stores per module
- Infrastructure: API clients (Axios), interceptors, auth token handling

### 1.3 Backend Stack (NestJS)

- NestJS + Fastify adapter
- Prisma ORM
- PostgreSQL
- Auth: JWT / Passport
- Validation: class-validator
- Queue: Redis + BullMQ

Struktur layer BE yang disarankan:
- Presentation: controllers (REST), DTO (class-validator)
- Application: services/use-cases (orchestrate domain)
- Domain: entities/value objects/policies (pure business rules)
- Infrastructure: Prisma repositories, external integration adapters, queues

### 1.4 Tooling & Runtime

- Gunakan Bun untuk frontend dan backend.
- Port default:
  - Backend API: `4123`
  - Frontend (Nuxt): `4124`
- Konfigurasi wajib via `.env` (per project, jangan hardcode):
  - Backend: `PORT=4123`, `DATABASE_URL=...`, `JWT_SECRET=...`, `REDIS_URL=...`
  - Frontend: `NUXT_PORT=4124` (atau `PORT=4124`), `NUXT_PUBLIC_API_BASE_URL=http://localhost:4123`
- PostgreSQL lokal:
  - db: `ses_erp`
  - user: `ses_erp`
  - pass: `ses_erp`

## 2) Standar Modular “Copot-Pasang” (SaaS)

### 2.1 Konsep Modul

Setiap modul memiliki:
- Katalog capability (fitur) + dependency antar modul.
- Permission set (action-level, bukan hanya page-level).
- Route grouping di FE + module registration.
- Endpoint grouping di BE (prefix per domain).
- Migrasi DB (Prisma schema + migration strategy).

### 2.2 Mekanisme Enable/Disable Modul

- Backend: tabel/konfigurasi `tenant_modules` (tenantId, moduleKey, enabled, configJson).
- Frontend: menu dan route guard dibentuk dari hasil “module registry” + permission user + modul tenant.
- CI/CD: build tetap include semua modul; runtime menentukan apa yang aktif.

### 2.3 Permission Model (Minimum)

- RBAC: Role -> Permissions (fine-grained).
- Permission format contoh: `inventory.item.read`, `sales.order.create`, `finance.journal.post`.
- Setiap endpoint dan page wajib menegakkan permission.

## 3) Fase Pengembangan (Urutan Sesuai Menu)

Catatan: setiap fase idealnya menghasilkan “vertical slice” yang bisa dipakai (UI + API + DB + security + audit + test).

### Phase 0 — Foundation & Platform (Wajib sebelum modul)

**Tujuan:** pondasi arsitektur, standar modul, multi-tenant, auth, dan build pipeline.

**Deliverables:**
- Repo/workspace layout (bun workspaces) untuk FE+BE (bisa mono-repo atau dua repo; standar modul tetap sama).
- Konfigurasi env lokal (Postgres + Redis), seed data minimal.
- Auth end-to-end:
  - Frontend:
    - halaman `/login` + validasi form (email/username + password)
    - Pinia auth store: `login()`, `logout()`, `restoreSession()`
    - session restore saat app start (mis. plugin/middleware global)
    - route guard: blok akses ke semua route selain publik bila belum login
    - Axios interceptor untuk attach token/cookie + handling 401 (auto logout atau refresh)
  - Backend:
    - `POST /auth/login` (issue session), `POST /auth/logout` (revoke/clear), `GET /auth/me` (session check)
    - opsional: `POST /auth/refresh` jika memakai refresh token
    - JWT/Passport guard + tenant context resolver (header/subdomain/claim sesuai desain)
  - Session strategy (pilih 1, tenant-configurable bila perlu):
    - Cookie-based (disarankan): JWT di HttpOnly cookie + CSRF protection + SameSite policy
    - Bearer token: simpan token dengan aman (hindari localStorage untuk high-risk tenant), rotasi token dan revocation list
- RBAC & permission matrix:
  - Role, Permission, RolePermission, UserRole
  - route guard FE + guard BE
- Audit trail framework:
  - event schema (who/when/what, before/after snapshot minimal)
  - hooks di use-case tertentu
- Observability minimal:
  - structured logging (tanpa secret)
  - request id, error handling standar
- Template modul:
  - FE: modul skeleton (pages, store, composables, api client)
  - BE: modul skeleton (controller, dto, service/use-case, repository)

---

### Phase 1 — Core & Master Data

Sesuai menu: **Core & Master Data** → (Master Perusahaan, Keuangan Dasar, User & Security)

#### 1A. Master Perusahaan

1) Company Profile (`/core/company-profile`)
- Data model: company, company_settings
- UI: view/edit profil perusahaan, logo, alamat, NPWP (opsional)
- API: CRUD (biasanya 1 record per tenant)
- Audit: update profile

2) Branch/Location Management (`/core/branch-management`)
- Data model: branch, branch_address, warehouse link placeholder (untuk WMS)
- UI: list + create/edit + status aktif/nonaktif
- API: CRUD + pagination/filtering

3) Currency & Exchange Rates (`/core/currency-rates`)
- Data model: currency, exchange_rate (date-based)
- Rules: rate by date, base currency per tenant
- UI: currency master + rate entry + import (opsional)

4) Unit of Measure (UOM) (`/core/unit-of-measure`)
- Data model: uom, uom_conversion
- UI: master UOM + konversi

5) Calendar & Fiscal Year (`/core/fiscal-year`)
- Data model: fiscal_year, accounting_period
- Rules: lock period (dipakai GL)
- UI: setup fiscal year + open/close period

#### 1B. Keuangan Dasar

1) Chart of Accounts (COA) (`/core/chart-of-accounts`)
- Data model: coa_account (tree), account_type
- Rules: posting/non-posting, parent-child validation
- UI: tree view + import template (opsional)

2) Cost Center & Profit Center (`/core/cost-center`)
- Data model: cost_center, profit_center
- Rules: mapping default (untuk posting)
- UI: master list + status

3) Tax Configuration (`/core/tax-config`)
- Data model: tax_code, tax_rate, tax_rule
- Output: dipakai modul Sales/Procurement/Tax
- UI: tax code + rate + efektif date

#### 1C. User & Security

1) User Management (`/core/user-management`)
- Data model: user, user_profile, user_status
- UI: create user, reset password, assign role

2) Role & Permission (`/core/role-permission`)
- UI: role list, permission assignment, matrix view per module
- API: CRUD roles + assign permissions

3) Workflow Designer (`/core/workflow-designer`)
- Scope awal: approval flow sederhana (draft → submit → approve/reject)
- Data model: workflow_definition, workflow_step, workflow_assignment
- Dipakai dulu untuk PR/PO/Payment Request (fase berikutnya)

4) Audit Trail (`/core/audit-trail`)
- UI: query audit log (filter by module/entity/date/user)
- API: paginated read-only

Exit criteria Phase 1:
- Tenant bisa setup master minimum (company, branch, currency, uom, fiscal year, coa, cost center, tax config).
- User/role/permission berjalan, semua page core terlindungi.

---

### Phase 2 — CRM

Sesuai menu: **CRM**

1) Lead Management (`/crm/lead-management`)
- Data model: lead, lead_source, lead_status
- UI: pipeline sederhana + list view + activity timeline (opsional)

2) Opportunity Management (`/crm/opportunity-management`)
- Data model: opportunity, stage, expected_close_date
- Rules: stage transitions

3) Customer Management (`/crm/customer-management`)
- Data model: customer, contact_person, address, credit_terms placeholder (untuk AR)
- Integrasi ke Sales Order di Phase 3

4) Sales Activity (`/crm/sales-activity`)
- Data model: activity (call/meeting/task), reminders (optional via queue)

5) Marketing Campaign (`/crm/marketing-campaign`)
- Scope awal: campaign master + simple tracking (lead attribution)

6) Customer Service (`/crm/customer-service`)
- Data model: ticket, ticket_status, SLA placeholder

---

### Phase 3 — Sales & Distribution

Sesuai menu: **Sales & Distribution**

1) Sales Quotation (`/sales/quotation`)
- Data model: sales_quotation, quotation_item
- Rules: pricing snapshot, expiry date
- PDF/print (opsional)

2) Sales Order (`/sales/order`)
- Data model: sales_order, sales_order_item
- Rules: approval workflow (pakai Workflow Designer), reserve stock hook (Phase 5)

3) Pricing Management (`/sales/pricing`)
- Data model: price_list, price_rule, discount_rule
- Rules: effective date, customer group

4) Sales Invoice (`/sales/invoice`)
- Data model: sales_invoice, invoice_item, tax breakdown
- Rules: posting to AR/GL (Phase 7) via integration layer

5) Sales Return (`/sales/return`)
- Data model: sales_return, return_item
- Rules: restock (Phase 5) + credit note (Phase 7)

6) Sales Commission (`/sales/commission`)
- Data model: commission_scheme, commission_entry

7) Shipping Integration (`/sales/shipping`)
- Scope awal: shipment record + carrier master; integrasi API opsional
- Queue: async label/tracking (BullMQ)

---

### Phase 4 — Procurement (Purchasing)

Sesuai menu: **Procurement (Purchasing)**

1) Purchase Requisition (PR) (`/procurement/requisition`)
- Data model: purchase_requisition, pr_item
- Workflow: submit/approve

2) Request for Quotation (RFQ) (`/procurement/rfq`)
- Data model: rfq, rfq_vendor, rfq_item

3) Purchase Order (PO) (`/procurement/purchase-order`)
- Data model: purchase_order, po_item
- Rules: vendor terms snapshot, approval

4) Supplier Management (`/procurement/supplier`)
- Data model: supplier, supplier_contact, supplier_tax

5) Purchase Invoice (`/procurement/invoice`)
- Data model: purchase_invoice, invoice_item
- Rules: posting to AP/GL (Phase 7)

6) Landed Cost Voucher (`/procurement/landed-cost`)
- Data model: landed_cost, allocation_method
- Integrasi: inventory valuation (Phase 5)

7) Purchase Return (`/procurement/return`)
- Data model: purchase_return, return_item

---

### Phase 5 — Inventory & Warehouse (WMS)

Sesuai menu: **Inventory & Warehouse (WMS)**

1) Item Master (`/inventory/item-master`)
- Data model: item, item_group, item_uom, item_barcode
- Rules: valuation method placeholder

2) Stock Management (`/inventory/stock`)
- Data model: stock_ledger, stock_balance (materialized optional)
- Transactions: receive, issue, transfer (minimal)

3) Quality Inspection on Receipt (`/inventory/qc`)
- Data model: qc_plan, qc_inspection, qc_result

4) Inventory Valuation (`/inventory/valuation`)
- Rules: FIFO/Moving Average (pilih salah satu dulu untuk MVP)
- Data model: valuation_layer

5) Batch & Serial Number (`/inventory/batch-serial`)
- Data model: batch, serial, item_tracking_policy

6) Multi-Location Inventory (`/inventory/multi-location`)
- Data model: warehouse, bin_location, stock_by_location

7) Inventory Planning (`/inventory/planning`)
- Scope awal: reorder point + suggested PO

8) Stock Opname (`/inventory/stock-opname`)
- Data model: stock_count, stock_count_item, adjustment
- Workflow: submit/approve + generate adjustment

---

### Phase 6 — Manufacturing & Production

Sesuai menu: **Manufacturing & Production**

1) Bill of Materials (BOM) (`/manufacturing/bom`)
- Data model: bom, bom_item, versioning

2) Production Planning (MPS & MRP) (`/manufacturing/planning`)
- Scope awal: simple MRP (demand from SO, supply from stock/PO)
- Queue: run planning async (BullMQ)

3) Work Order (WO) (`/manufacturing/work-order`)
- Data model: work_order, wo_component, wo_operation

4) Production Execution (`/manufacturing/execution`)
- Transactions: issue components, report production, receive FG

5) Shop Floor Control (`/manufacturing/shop-floor`)
- UI: operator view, status WO, time tracking placeholder

6) Quality In-Process (`/manufacturing/quality`)
- Data model: in_process_qc

7) Maintenance (TPM) (`/manufacturing/maintenance`)
- Data model: asset_equipment, maintenance_schedule, work_request

8) Production Costing (`/manufacturing/costing`)
- Rules: roll-up cost from components + labor/overhead placeholder
- Integrasi ke GL (Phase 7)

---

### Phase 7 — Finance & Accounting

Sesuai menu: **Finance & Accounting**

#### 7A. General Ledger

1) Journal Entry (`/finance/journal`)
- Data model: journal_header, journal_line
- Rules: balanced debit/credit, period lock, posting
- Audit: posting actions

2) Cost Center Allocation (`/finance/cost-allocation`)
- Data model: allocation_rule, allocation_run
- Queue: allocation run async

3) Inter-Company Elimination (`/finance/inter-company`)
- Scope awal: mapping inter-company account + elimination entries

#### 7B. Cash & Bank

1) Bank Reconciliation (`/finance/bank-reconciliation`)
- Data model: bank_account, bank_statement, reconciliation
- Import CSV (opsional)

2) Petty Cash & Fund Transfer (`/finance/petty-cash`)
- Data model: petty_cash_tx, fund_transfer

3) Payment Request & Approval (`/finance/payment-request`)
- Workflow: submit/approve
- Integrasi: AP payment (jika vendor) atau expense

#### 7C. AR & AP

1) Aging Report (`/finance/aging-report`)
- Output: AR aging + AP aging

2) Debt Collection (`/finance/debt-collection`)
- Data model: collection_case, follow_up_activity

3) Vendor Reconciliation (`/finance/vendor-reconciliation`)
- Report: open items, matching

#### 7D. Fixed Assets

1) Asset Registration (`/finance/asset-registration`)
- Data model: fixed_asset, asset_category

2) Depreciation (`/finance/depreciation`)
- Rules: straight-line minimal + schedule
- Queue: monthly depreciation run

3) Asset Revaluation & Disposal (`/finance/asset-disposal`)
- Transactions: revalue, dispose, gain/loss posting

#### 7E. Financial Reporting (`/finance/reporting`)
- Laporan: trial balance, P&L, balance sheet (basic)
- Export: PDF/Excel (opsional)

Exit criteria Phase 7:
- Semua transaksi Sales/Procurement/Inventory/Manufacturing bisa menghasilkan jurnal (at least minimal postings).
- Period lock bekerja, laporan dasar tersedia.

---

### Phase 8 — Indonesia Tax Management

Sesuai menu: **Indonesia Tax Management**

#### 8A. PPN (Value Added Tax)

1) Faktur Pajak Keluaran (`/tax/faktur-keluaran`)
- Data: output tax invoices, mapping ke Sales Invoice

2) Faktur Pajak Masukan (`/tax/faktur-masukan`)
- Data: input tax invoices, mapping ke Purchase Invoice

3) NSFP Management (`/tax/nsfp`)
- Data model: nsfp_range, nsfp_usage, validation

4) PPN Masa Summary (`/tax/ppn-masa`)
- Report: summary per masa pajak

#### 8B. PPh (Withholding Tax)

1) e-Bupot Unifikasi (`/tax/e-bupot`)
- Data: bukti potong, export format sesuai kebutuhan

2) PPh 21 Payroll Integration (`/tax/pph21`)
- Integrasi dari modul Payroll (Phase 9)

3) Bukti Potong 1721-A1 (`/tax/bukti-potong`)
- Output: slip A1 per employee (dari payroll)

4) ID Billing Generator (`/tax/id-billing`)
- Scope: generate data untuk billing; integrasi API opsional

#### 8C. Compliance

1) Tax Equalization (`/tax/equalization`)
- Report: rekonsiliasi pajak vs pembukuan

2) Fiscal Reconciliation (`/tax/fiscal-reconciliation`)
- Report: koreksi fiskal, mapping akun

---

### Phase 9 — HRIS & Productivity

Sesuai menu: **HRIS & Productivity**

1) Employee Database (`/hris/employee`)
- Data model: employee, job, grade, status, bank info (sensitif)

2) Organization Structure (`/hris/org-structure`)
- Data model: org_unit, hierarchy

3) Recruitment (ATS) (`/hris/recruitment`)
- Data model: candidate, pipeline stage

4) Attendance (`/hris/attendance`)
- Data model: attendance_log, leave_request
- Queue: import attendance (opsional)

5) Shift Management (`/hris/shift`)
- Data model: shift, roster

6) Payroll (`/hris/payroll`)
- Data model: payroll_run, payroll_item, component, tax/benefit
- Queue: payroll run async

7) Employee Self-Service (ESS) (`/hris/ess`)
- UI: profile, leave request, payslip

8) KPI & Performance Review (`/hris/kpi`)
- Data model: kpi_template, kpi_review

9) Expense Claims (`/hris/expense`)
- Data model: expense_claim, claim_item
- Integrasi ke GL (Phase 7)

---

### Phase 10 — Logistics & Supply Chain

Sesuai menu: **Logistics & Supply Chain**

1) Fleet Management (`/logistics/fleet`)
- Data model: vehicle, driver, maintenance link

2) Route Optimization (`/logistics/route`)
- Scope awal: route planning manual + stop sequence
- Integrasi algoritma/3rd party opsional

3) Delivery Order & Digital POD (`/logistics/delivery`)
- Data model: delivery_order, pod, signature/photo (storage strategy)

4) Warehouse Operations (`/logistics/warehouse`)
- Scope: picking/packing wave (minimal)

5) Packing & Kitting (`/logistics/packing`)
- Data model: packing_list, kit_definition

---

### Phase 11 — Project & Construction

Sesuai menu: **Project & Construction**

1) Project Setup (WBS) (`/project/setup`)
- Data model: project, wbs_task, budget lines

2) Tender & Contract Management (`/project/tender`)
- Data model: tender, bid, contract

3) Progress Billing (`/project/billing`)
- Data model: progress_claim, progress_invoice
- Integrasi AR/GL (Phase 7)

4) Site Management (`/project/site`)
- Data model: site_daily_report, resource_usage

5) Cost Control (`/project/cost-control`)
- Report: budget vs actual, commitments (PO/WO)

---

### Phase 12 — Support & Maintenance

Sesuai menu: **Support & Maintenance**

1) POS (Point of Sale) (`/support/pos`)
- Scope awal: simple POS (item, price, payment, receipt)
- Integrasi inventory + sales invoice

2) Asset Management (`/support/asset`)
- Sinkron dengan Fixed Assets (Phase 7) atau operational asset

3) Document Management (DMS) (`/support/document`)
- Storage: pilih local/dev dulu; production bisa S3 compatible
- Entity attachments reusable di semua modul

4) Compliance & Audit (`/support/compliance`)
- Control checklist + evidence link (reuse DMS)

5) Business Intelligence (BI) (`/support/bi`)
- Data mart minimal + dashboard KPI (read-only)

6) Sustainability (ESG) (`/support/sustainability`)
- Data capture ESG + reporting baseline

---

### Phase 13 — Settings & Tools

Sesuai menu: **Settings & Tools**

1) System Configuration (`/settings/system`)
- Tenant settings, localization, numbering series, period locks

2) Integration (API) (`/settings/integration`)
- API keys (tenant-scoped), webhook, rate limit policy

3) Data Management (`/settings/data`)
- Import/export master, backup/restore (admin only)

4) Print Format Designer (`/settings/print-format`)
- Template engine untuk invoice/PO/quotation

5) Help & Support (`/settings/help`)
- Knowledge base link + ticket routing

## 4) Cross-Cutting Checklist (Wajib per Modul)

- Data model Prisma + migrations + seed minimal
- CRUD API standar (pagination, filtering, sorting)
- DTO validation (class-validator) + error format konsisten
- Permission enforcement (page + endpoint)
- Audit events untuk create/update/post/approve
- Workflow integration bila dokumen butuh approval
- Dokumentasi modul (MD):
  - ringkasan scope, route, endpoint, schema data, permission, workflow
  - contoh payload + contoh error + contoh audit event
- UI:
  - list view + filter
  - form create/edit + validation
  - detail view (read-only)
- Testing minimal:
  - unit test untuk rules penting
  - integration test untuk 1–2 endpoint kritikal
- Performance:
  - query index untuk kolom pencarian utama
  - background jobs untuk proses berat (BullMQ)

## 5) Definisi “Done” (MVP per Fase)

- Semua menu pada fase tersebut:
  - sudah punya page FE (list + form minimal)
  - endpoint BE siap pakai
  - data tersimpan di PostgreSQL
  - RBAC/permission lengkap
  - audit trail aktif
- Minimal 1 skenario end-to-end tervalidasi:
  - contoh: (Sales Order → Delivery → Invoice → Journal) untuk fase yang relevan

## 6) Development Checklist (Compliance Indonesia)

Checklist ini dipakai sebagai “gate” sebelum fitur dipromosikan ke staging/production. Regulasi dapat berubah, jadi implementasi harus configurable (rate pajak, format dokumen, aturan validasi) dan mudah di-update.

### 6.1 Legal/Regulatory Baseline (Wajib dipertimbangkan)

- UU 27/2022 Perlindungan Data Pribadi (UU PDP)
- UU ITE (UU 11/2008 jo. UU 19/2016) dan aturan turunannya (termasuk ketentuan Penyelenggara Sistem Elektronik/PSE dan tata kelola sistem elektronik)
- Aturan perpajakan terkait pembukuan dan dokumen pajak (mis. UU KUP dan peraturan DJP yang berlaku untuk e-Faktur/e-Bupot/format pelaporan)
- Ketenagakerjaan dan aturan turunannya untuk HR/Payroll (termasuk BPJS Kesehatan & BPJS Ketenagakerjaan, THR, lembur, dan ketentuan upah minimum yang berlaku setempat)
- Standar akuntansi yang dipakai (PSAK/IFRS) dan kebijakan perusahaan (chart of accounts, periode, dan closing)

### 6.2 Checklist Platform (Phase 0)

- Identitas tenant & data isolation:
  - tenantId wajib ada di semua tabel transaksional & master yang tenant-scoped
  - query selalu tenant-aware (no cross-tenant leakage)
- Auth & session:
  - JWT strategy dengan rotasi/expiry jelas
  - revoke/blacklist strategy untuk user dinonaktifkan
  - brute-force protection (rate limit + lockout) untuk login
  - session check endpoint (`/auth/me`) dipakai FE untuk restore session
  - logout wajib menghapus session server-side (revoke) dan client-side (clear state/cookie)
  - bila cookie-based: CSRF token + SameSite/secure flag sesuai environment
- RBAC/permission:
  - permission naming konsisten per modul (read/create/update/delete/approve/post/export)
  - FE route guard dan BE guard sama-sama enforce
- Audit trail (WORM-like):
  - log minimal: actor, timestamp, tenant, entity, action, before/after (atau delta)
  - proteksi integritas (append-only di level aplikasi; tidak bisa edit via UI)
- Data retention:
  - retensi pembukuan/dokumen keuangan minimal mengikuti ketentuan perpajakan (umumnya 10 tahun) dan bisa dikonfigurasi per tenant
  - mekanisme purge/anonymize untuk data personal sesuai UU PDP (berbasis policy)
- Security baseline:
  - secret management (tidak hardcode, tidak log token/password)
  - encryption in transit (HTTPS) dan encryption at rest (disk/DB level bila tersedia)
  - password hashing strong (argon2/bcrypt) + password policy
  - input validation (class-validator) + output encoding
  - file upload rules (size/type scanning strategy)
- Observability:
  - structured log tanpa data pribadi sensitif (masking)
  - request id traceable untuk audit & troubleshooting
  - error response konsisten (tanpa leak stack trace di production)
- Internationalization Indonesia:
  - timezone default `Asia/Jakarta`
  - format tanggal `DD/MM/YYYY` (display), ISO untuk storage/transmission
  - default currency `IDR`, thousand separator sesuai lokal

### 6.3 Checklist Data Pribadi (UU PDP)

- Data classification:
  - tandai field PII (nama, email, telp, alamat, NIK/NPWP, rekening bank, data payroll) dan batasi akses via permission
- Consent & purpose limitation:
  - tujuan pemrosesan data dicatat (purpose) untuk fitur yang relevan (HR/CRM)
  - minimization: hanya simpan data yang diperlukan untuk proses bisnis
- Data subject rights readiness:
  - export data personal (DSAR) berbasis tenant
  - koreksi data, pembatasan pemrosesan, dan penghapusan sesuai policy (bila tidak bertentangan dengan kewajiban retensi hukum)
- Breach response:
  - audit dan monitoring untuk indikasi akses tidak sah
  - mekanisme notifikasi internal dan pelacakan insiden (ticket + log)

### 6.4 Checklist Finance & Accounting (PSAK + kontrol)

- Fiscal year & period lock:
  - periode bisa dibuka/ditutup; transaksi posting menolak periode tertutup
- COA integrity:
  - akun posting/non-posting tervalidasi
  - mapping default untuk modul (Sales, Procurement, Inventory, Payroll) tersimpan per tenant
- Journal posting:
  - debit/credit harus balance
  - no edit setelah posted (gunakan reversal/adjustment entry)
- Numbering series:
  - penomoran dokumen unik per tenant, per tipe dokumen, dan period-aware
  - no gap policy (jika dibutuhkan) harus jelas dan teruji

### 6.5 Checklist Pajak Indonesia (PPN/PPh)

- Tax master:
  - tarif pajak tidak hardcoded; selalu configurable dan date-effective
  - dukung pembulatan sesuai aturan/perusahaan (rounding policy)
- PPN:
  - pemetaan Sales Invoice/Purchase Invoice ke dokumen pajak (keluaran/masukan)
  - dukung referensi NSFP (range + usage tracking) bila tenant memakai mekanisme itu
  - validasi field pajak penting (NPWP/NIK sesuai kebutuhan bisnis, alamat, tanggal, masa pajak)
- PPh (withholding):
  - dukung multiple jenis potong dan dasar pengenaan; konfigurasi rule
  - audit trail untuk perhitungan potongan
- Reporting & export:
  - semua laporan pajak harus punya “source trace” ke transaksi asal (drill-down)
  - format export dibuat sebagai template versioned (karena aturan DJP bisa berubah)

### 6.6 Checklist HR/Payroll Indonesia

- Payroll components:
  - komponen gaji configurable (tunjangan, potongan, lembur, THR)
  - simulasi payroll sebelum finalize/posting
- Kepatuhan:
  - dukung BPJS Kesehatan & BPJS Ketenagakerjaan (rate/configurable, ceiling rules jika diperlukan)
  - dukung PPh 21 (metode gross/gross-up/net sesuai kebijakan)
  - dukung pengaturan upah minimum per wilayah (UMR/UMK) sebagai validasi opsional
- Data sensitivity:
  - akses payroll dibatasi ketat (least privilege)
  - masking rekening bank/NIK di UI dan log

### 6.7 Checklist Dokumen Elektronik (UU ITE)

- Validitas dokumen:
  - semua dokumen bisnis (PO/SO/Invoice/Journal/Approval) memiliki jejak audit dan identitas penandatangan/approver
  - bila memakai e-signature, siapkan integrasi ke penyedia tanda tangan elektronik tersertifikasi (PSrE) sesuai kebutuhan
- Non-repudiation:
  - simpan hash dokumen/printout versi final (opsional) untuk menguatkan integritas dokumen

### 6.8 Checklist Operasional (SaaS)

- Multi-tenant configuration:
  - modul per tenant (enable/disable) + configJson tervalidasi schema-nya
- Backup & restore:
  - backup database terjadwal + uji restore secara rutin (di staging)
- DR/BCP readiness:
  - RPO/RTO target ditetapkan dan bisa dipenuhi oleh prosedur operasional
- Queue jobs:
  - BullMQ jobs idempotent + retry policy jelas + dead letter handling
- Hardening:
  - rate limiting, CORS policy, file upload policy, CSP (FE)

## 7) Kelengkapan ERP (Scope Tambahan Agar “Komplit”)

Bagian ini merangkum capability yang umumnya wajib ada pada ERP produksi (enterprise-ready) tetapi belum tertulis eksplisit di fase-fase menu.

### 7.1 Cross-Cutting Modules (Wajib untuk semua domain)

- Document Numbering & Series:
  - nomor dokumen per tipe (SO/PO/INV/JE/DO/GRN) dengan aturan per cabang/periode
  - policy untuk pembatalan (void) tanpa menghapus nomor yang sudah keluar
- Document Lifecycle:
  - status standar: draft → submitted → approved → posted → closed/void
  - revisi dokumen: versioning + reason + audit
- Approval & Delegation:
  - delegation (cuti, pengalihan approver), escalation, SLA approval
  - approval limit (berdasarkan nilai, cost center, cabang)
- Notification & Reminder:
  - notifikasi in-app + email/WA gateway opsional (tenant-config)
  - reminder jatuh tempo (AR/AP), kontrak, maintenance, renewal
- Attachments & DMS:
  - attachment untuk setiap entity dengan policy (file type/size/retention)
  - metadata dokumen (kategori, tag, nomor dokumen, tanggal)
- Import/Export & Migration Tools:
  - template import master (COA, item, customer, supplier, opening balance)
  - data validation preview sebelum commit
- Audit, Compliance, dan “Traceability”:
  - drill-down laporan → transaksi → audit log
  - audit export (untuk pemeriksaan internal/eksternal)
- Localization Indonesia:
  - format NPWP/NIK configurable (tanpa hard-fail bila tenant ingin longgar)
  - timezone, bahasa, format angka/tanggal, rounding policy

### 7.2 Data Master Tambahan (Umumnya dibutuhkan ERP)

- Business Partner:
  - customer group/supplier group, payment terms, credit limit, contact & address book
  - bank account master (untuk pembayaran/receipt)
- Item & Inventory:
  - item category, brand, attributes/variants, expiry date, shelf life
  - barcode/QR policy, batch/serial policy per item
- Price & Tax:
  - multi price list, customer-specific pricing, promo rule
  - tax mapping per item/customer/vendor + effective date
- Organization:
  - multi-company/multi-branch support (jika tenant butuh)
  - inter-branch transfer rules dan numbering

### 7.3 Reporting & Analytics (Komplit)

- Report engine:
  - filter builder (date range, branch, cost center, partner, item group)
  - export PDF/Excel, scheduling report (via queue)
- Finance:
  - trial balance, GL detail, cashflow (direct/indirect), budget vs actual
  - aging AR/AP, reconciliation report
- Inventory:
  - stock card (kartu stok), valuation report, slow moving, expiry aging
- Sales/Procurement:
  - sales by customer/item, margin, purchase analysis, vendor performance
- Tax Indonesia:
  - ringkasan PPN/potput per masa, rekonsiliasi pajak vs pembukuan
- HR:
  - payroll register, BPJS summary, PPh21 summary, headcount

### 7.4 Integrations (Agar siap produksi)

- Bank:
  - import statement (CSV/MT940 format yang tenant gunakan), auto-matching rules
- e-Tax:
  - export/bridge untuk e-Faktur/e-Bupot sesuai ketentuan DJP yang berlaku (format versioned)
- e-Signature:
  - integrasi PSrE tersertifikasi bila dibutuhkan (kontrak, PO, invoice)
- Shipping/Carrier:
  - tracking, label printing, webhook status (opsional)
- SSO:
  - SAML/OIDC (opsional enterprise)

### 7.5 Controls & Security (Enterprise)

- Segregation of Duties (SoD):
  - pemisahan hak create/approve/post/pay untuk mencegah konflik kepentingan
- 2FA / MFA:
  - minimal untuk admin/finance/HR (opsional namun sangat disarankan)
- Data masking:
  - masking field sensitif (rekening, NIK) berdasarkan role
- Access review:
  - fitur review akses periodik + export untuk audit internal

## 8) Checklist “Komplit” per Domain (Tambahan di atas Menu)

### 8.1 Sales & Distribution (Tambahan penting)

- Delivery Order (DO) dan shipment lifecycle (walau menu menyebut shipping, DO perlu sebagai dokumen internal)
- Credit management:
  - credit limit, credit hold, overdue check sebelum SO/Invoice
- Receipts:
  - customer receipt & allocation (apply payment ke invoice) terhubung ke bank reconciliation
- Returns:
  - return authorization (opsional), stock/finance impact jelas (restock/scrap)

### 8.2 Procurement (Tambahan penting)

- 3-way match:
  - PO vs GRN (goods receipt) vs Invoice untuk kontrol AP
- Vendor contract & price agreement (opsional)
- Supplier portal (opsional) untuk RFQ/PO confirmation

### 8.3 Inventory & WMS (Tambahan penting)

- Receiving & Putaway:
  - Goods Receipt Note (GRN), putaway ke bin, label printing
- Picking & Packing:
  - pick list, packing list, partial pick/ship, backorder
- Transfer:
  - inter-warehouse/inter-branch transfer dengan in-transit stock
- Barcode workflow:
  - scan to receive/pick/transfer (opsional mobile)

### 8.4 Manufacturing (Tambahan penting)

- Routing & Work Center:
  - work center, routing steps, capacity, calendar produksi
- Subcontracting (opsional):
  - kirim material ke vendor, terima hasil, costing
- Scrap & Rework:
  - pencatatan scrap, rework order, reason code

### 8.5 Finance (Tambahan penting)

- Closing process:
  - month-end checklist, accrual/deferral, reversal automation
- Multi-currency:
  - revaluation, realized/unrealized gain-loss
- Budgeting:
  - budget master, budget control (hard/soft), variance report
- Consolidation (opsional multi-company):
  - eliminasi, konsolidasi laporan, inter-company settlement

### 8.6 Indonesia Tax (Tambahan penting)

- Tax invoice numbering & controls:
  - kontrol penggunaan nomor (range/sequence) dan audit perubahan
- Rate change readiness:
  - semua tarif dan aturan pajak harus date-effective dan bisa berubah tanpa deploy
- Withholding coverage:
  - jenis PPh yang umum dipakai dibuat rule-driven (bukan hardcode) dan dapat ditambah tenant

### 8.7 HRIS & Payroll (Tambahan penting)

- Payroll to Finance posting:
  - mapping akun biaya dan kewajiban (BPJS, pajak) + posting otomatis
- Leave & overtime policy:
  - policy per cabang, cut-off payroll, approval workflow

## 9) Standar Data & Akuntansi (Agar aman untuk audit)

- Immutability untuk transaksi posted:
  - edit via reversal/credit note/debit note, bukan overwrite data
- Master data governance:
  - status aktif/nonaktif, effective date, dan “do-not-delete” untuk data yang sudah dipakai transaksi
- Referential integrity:
  - hard delete dilarang untuk transaksi; gunakan soft delete bila perlu untuk master tertentu
- Posting rules:
  - setiap modul punya “posting profile” yang bisa diatur tenant (account mapping per jenis transaksi)

## 10) DevOps & Quality Gates (Agar siap produksi)

- Environments:
  - local → dev → staging → production (dengan migrasi DB yang jelas)
- CI quality gates:
  - lint + typecheck + test (unit/integration) wajib lulus
  - database migration validation (Prisma migrate)
- Release safety:
  - feature flags per tenant
  - backward-compatible migrations (khusus SaaS)
- Data backup:
  - jadwal backup + uji restore
- Security testing:
  - dependency audit, basic pentest checklist (authz, injection, SSRF)

## 11) Dokumentasi Setelah Development (By Phase)

Setelah setiap phase selesai dikembangkan, wajib dibuat dokumen MD untuk memastikan knowledge transfer, audit readiness, dan memudahkan deployment SaaS. Dokumen dibuat per phase dan per modul yang selesai pada phase tersebut.

### 11.1 Struktur File (Disarankan)

- `docs/phase-00-foundation.md`
- `docs/phase-01-core-master-data.md`
- `docs/phase-02-crm.md`
- `docs/phase-03-sales.md`
- `docs/phase-04-procurement.md`
- `docs/phase-05-inventory-wms.md`
- `docs/phase-06-manufacturing.md`
- `docs/phase-07-finance.md`
- `docs/phase-08-indonesia-tax.md`
- `docs/phase-09-hris.md`
- `docs/phase-10-logistics.md`
- `docs/phase-11-project.md`
- `docs/phase-12-support.md`
- `docs/phase-13-settings.md`

### 11.2 Template Konten (Wajib)

- Ringkasan phase:
  - tujuan, modul yang tercakup, dependency ke phase lain
- Routes UI:
  - daftar route + status (public/protected) + permission yang dibutuhkan
- API endpoints:
  - daftar endpoint (method + path) + auth requirement + permission
  - contoh request/response (minimal 1 contoh per endpoint penting)
- Data model:
  - tabel/entity utama + relasi
  - field penting + constraint (tenantId, unique index, status/lifecycle)
- Workflow & approval:
  - diagram status (draft→submit→approve→post→close/void)
  - aturan approval limit, delegation, escalation (jika ada)
- Accounting posting (bila relevan):
  - mapping akun default + aturan posting + reversal rule
- Audit trail:
  - event yang dicatat + contoh payload audit
- Reporting:
  - daftar report + filter + drill-down source
- Operasional:
  - job queue yang dipakai + retry policy + idempotency notes
  - konfigurasi `.env` yang dibutuhkan untuk phase tersebut
- Testing:
  - skenario E2E utama + cara menjalankan test/lint/typecheck

### 11.3 Template Konten (Indonesia Compliance)

Tambahkan bagian ini pada phase yang relevan:

- Pajak (Phase 8, dan phase transaksi yang mempengaruhi pajak):
  - pemetaan transaksi ke dokumen pajak (PPN keluaran/masukan, pemotongan PPh)
  - konfigurasi tarif/rule yang date-effective (tidak hardcode)
  - jejak audit perhitungan pajak (traceable ke transaksi)
- HR/Payroll (Phase 9):
  - komponen payroll + konfigurasi BPJS + konfigurasi PPh21
  - kontrol akses data sensitif (masking + least privilege)
- UU PDP:
  - daftar PII yang disimpan pada phase tersebut
  - hak subjek data yang didukung (export/koreksi/penghapusan sesuai policy)
  - retensi data dan pengecualian retensi untuk pembukuan/dokumen pajak

---

## 12) Gap Analysis & Enhancement Roadmap

Dokumen terpisah yang berisi analisis kekurangan (gap) sistem ERP saat ini dan rekomendasi penambahan modul untuk mencapai level **enterprise SaaS-ready ERP**, lengkap dengan checklist implementasi dan prioritas pengerjaan per tier.

📄 **[ERP_GAP_ANALYSIS_ROADMAP.md](./ERP_GAP_ANALYSIS_ROADMAP.md)**

### Ringkasan Tier Prioritas

| Tier | Level | Modul |
|------|-------|-------|
| **Tier 1** 🔴 | Critical | Task Management · Approval Engine · Notification Center · SaaS Management · Security & Governance · Indonesia Tax Advanced |
| **Tier 2** 🟠 | High Value | CRM Enhancements · Warehouse Advanced · Finance & Treasury · Integration Hub |
| **Tier 3** 🟡 | Scaling | Advanced Manufacturing · HR Advanced · Construction Advanced · Advanced Analytics |
