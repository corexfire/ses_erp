<template>
  <div class="space-y-4">
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-sky-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Settings & Tools</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-sky-600 uppercase tracking-widest">Modules & Feature Flags</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Modules <span class="text-sky-600 not-italic text-3xl">& Feature Flags</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3">Aktifkan atau nonaktifkan modul ERP dan fitur eksperimental secara granular per tenant.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Deploy Changes" size="small" icon="pi pi-send" class="p-button-rounded h-12 px-8 bg-sky-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-sky-100 hover:scale-105 transition-all" @click="deploy" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <div class="p-4 rounded-2xl bg-sky-950 text-white shadow-xl flex flex-col justify-between border border-sky-900 hover:bg-black group transition-all">
        <div class="text-[10px] font-black uppercase text-sky-400 tracking-[0.2em] mb-4 opacity-80">Total Modul</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ modules.length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl group-hover:rotate-12 transition-transform"><i class="pi pi-th-large text-lg"></i></div>
        </div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ modules.filter(m => m.enabled).length }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Nonaktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter leading-none">{{ modules.filter(m => !m.enabled).length }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><i class="pi pi-times-circle text-lg"></i></div>
        </div>
      </div>
      <div class="p-4 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-sky-100 tracking-[0.2em] mb-4 opacity-80">Feature Flags</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight uppercase">Beta <span class="text-sky-300 italic">Active</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-flag text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Modules Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
      <div v-for="mod in filteredModules" :key="mod.key" 
        class="rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
        <!-- Card Header -->
        <div class="p-8 pb-4 relative overflow-hidden">
          <div :class="['absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-20 transition-all group-hover:opacity-40', mod.enabled ? 'bg-emerald-400' : 'bg-slate-400']"></div>
          <div class="flex justify-between items-start relative z-10">
            <div :class="['w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl shadow-xl transition-all group-hover:rotate-6', mod.enabled ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-400']">
              <i :class="mod.icon"></i>
            </div>
            <button @click="toggleModule(mod)" :class="['relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none', mod.enabled ? 'bg-emerald-500' : 'bg-slate-200']">
              <span :class="['absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300', mod.enabled ? 'translate-x-7' : 'translate-x-0']"></span>
            </button>
          </div>
          <div class="mt-6">
            <div class="flex items-center gap-2 mb-1">
              <span :class="['px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border', mod.type === 'MODULE' ? 'bg-sky-50 text-sky-600 border-sky-100' : 'bg-orange-50 text-orange-600 border-orange-100']">{{ mod.type }}</span>
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">{{ mod.key }}</span>
            </div>
            <h3 class="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">{{ mod.name }}</h3>
          </div>
        </div>

        <!-- Card Body -->
        <div class="px-8 pb-4 flex-1">
          <p class="text-[11px] text-slate-500 font-medium leading-relaxed mb-6">{{ mod.description }}</p>
          
          <!-- Sub Modules Section -->
          <div class="space-y-3">
            <div class="flex items-center gap-2 mb-2">
              <div class="h-px bg-slate-100 flex-1"></div>
              <span class="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Sub-Modules / Features</span>
              <div class="h-px bg-slate-100 flex-1"></div>
            </div>
            
            <div v-for="sub in mod.subModules" :key="sub.name" 
              class="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-200 hover:bg-white transition-all group/sub">
              <div class="flex-1 pr-4">
                <div class="text-[10px] font-black text-slate-700 uppercase leading-none mb-1 group-hover/sub:text-sky-600 transition-colors">{{ sub.name }}</div>
                <div class="text-[9px] text-slate-400 font-medium italic leading-tight">{{ sub.desc }}</div>
              </div>
              <button @click="sub.enabled = !sub.enabled" :class="['w-8 h-4 rounded-full relative transition-all duration-300', sub.enabled ? 'bg-emerald-400' : 'bg-slate-200']">
                <span :class="['absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-all duration-300', sub.enabled ? 'translate-x-4' : 'translate-x-0']"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="flex -space-x-2">
              <div v-for="i in 3" :key="i" class="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center">
                <i class="pi pi-user text-[8px] text-slate-400"></i>
              </div>
            </div>
            <span class="text-[9px] font-bold text-slate-400 uppercase">Used by 12+ Users</span>
          </div>
          <span :class="['text-[9px] font-black tracking-widest uppercase', mod.enabled ? 'text-emerald-600' : 'text-slate-400']">{{ mod.enabled ? 'System Ready' : 'Standby' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const filterType = ref('');

const modules = ref([
  { 
    key: 'CORE', name: 'Core & Master Data', type: 'MODULE', enabled: true, icon: 'pi pi-database', 
    description: 'Fondasi dasar sistem yang mengelola profil perusahaan, cabang, mata uang, dan infrastruktur data master.',
    subModules: [
      { name: 'Company Profile & Branches', desc: 'Profil pusat, cabang, dan lokasi', enabled: true },
      { name: 'Currency & UOM', desc: 'Mata uang, kurs, dan satuan ukuran', enabled: true },
      { name: 'Fiscal & Calendar', desc: 'Tahun fiskal dan kalender kerja', enabled: true },
      { name: 'Basic Finance Config', desc: 'COA, cost center, dan pajak dasar', enabled: true },
      { name: 'User Management', desc: 'Data pengguna dan otentikasi', enabled: true },
      { name: 'Access Control (RBAC)', desc: 'Manajemen role dan permission', enabled: true },
      { name: 'System Governance', desc: 'Workflow designer dan audit trail', enabled: true }
    ]
  },
  { 
    key: 'CRM', name: 'CRM & Customer Excellence', type: 'MODULE', enabled: true, icon: 'pi pi-users', 
    description: 'Manajemen hubungan pelanggan end-to-end, dari manajemen lead hingga layanan purna jual.',
    subModules: [
      { name: 'Lead & Opportunity', desc: 'Pencatatan prospek and pipeline', enabled: true },
      { name: 'Customer & B2B Portal', desc: 'Database pelanggan and portal mandiri', enabled: true },
      { name: 'Sales Activity', desc: 'Monitoring log aktivitas penjualan', enabled: true },
      { name: 'Marketing Campaign', desc: 'Manajemen kampanye pemasaran', enabled: true },
      { name: 'Customer Service', desc: 'Helpdesk and ticketing support', enabled: true }
    ]
  },
  { 
    key: 'ECOMMERCE', name: 'E-Commerce & Omnichannel', type: 'MODULE', enabled: true, icon: 'pi pi-globe', 
    description: 'Integrasi marketplace dan manajemen penjualan online secara terpusat untuk efisiensi stok.',
    subModules: [
      { name: 'Marketplace Sync', desc: 'Tokopedia, Shopee, TikTok Shop integration', enabled: true },
      { name: 'Webstore Engine', desc: 'Manajemen toko online internal', enabled: true },
      { name: 'Order Aggregator', desc: 'Omnichannel order consolidation', enabled: true },
      { name: 'Stock Sync', desc: 'Real-time stock synchronization', enabled: true }
    ]
  },
  { 
    key: 'RETAIL', name: 'Retail & POS (Advanced)', type: 'MODULE', enabled: true, icon: 'pi pi-shop', 
    description: 'Solusi Point of Sale modern untuk toko retail dengan fitur shift dan integrasi printer fiskal.',
    subModules: [
      { name: 'POS Terminal', desc: 'Antarmuka kasir and payment processing', enabled: true },
      { name: 'Shift Management', desc: 'Manajemen shift kasir and closing', enabled: true },
      { name: 'Loyalty & Rewards', desc: 'Poin pelanggan and rewards program', enabled: true },
      { name: 'Fiscal Integration', desc: 'Printer fiskal and tax receipts', enabled: true }
    ]
  },
  { 
    key: 'SALES', name: 'Sales & Distribution', type: 'MODULE', enabled: true, icon: 'pi pi-shopping-cart', 
    description: 'Otomasi alur penjualan dari penawaran harga hingga faktur dan komisi tenaga penjual.',
    subModules: [
      { name: 'Sales Orders', desc: 'Quotation and Sales Order (SO)', enabled: true },
      { name: 'Delivery & Logistics', desc: 'Delivery Order (DO) and Shipping integration', enabled: true },
      { name: 'Pricing & Subs', desc: 'Pricing engine and Subscription billing', enabled: true },
      { name: 'Invoicing & Commission', desc: 'Tax invoice and Sales Commission', enabled: true },
      { name: 'Sales Returns', desc: 'Pemrosesan retur penjualan', enabled: true }
    ]
  },
  { 
    key: 'PROCUREMENT', name: 'Procurement (Purchasing)', type: 'MODULE', enabled: true, icon: 'pi pi-shopping-bag', 
    description: 'Sistem pengadaan barang dengan alur persetujuan ketat dan manajemen hubungan supplier.',
    subModules: [
      { name: 'Purhase Requests', desc: 'Internal PR and RFQ flow', enabled: true },
      { name: 'Purchase Orders', desc: 'Purchasing and Purchase Order (PO)', enabled: true },
      { name: 'Supplier Portal', desc: 'Vendor database and collaboration portal', enabled: true },
      { name: '3-Way Match', desc: 'Verification of PO, GRN, and Invoice', enabled: true },
      { name: 'Cost Optimization', desc: 'Landed cost allocation and returns', enabled: true }
    ]
  },
  { 
    key: 'INVENTORY', name: 'Inventory & WMS Engine', type: 'MODULE', enabled: true, icon: 'pi pi-box', 
    description: 'Pengendalian stok tingkat lanjut dengan manajemen bin gudang dan pelacakan batch/seri.',
    subModules: [
      { name: 'Item Master', desc: 'Database produk and SKU management', enabled: true },
      { name: 'Warehouse Ops (WMS)', desc: 'GRN, Putaway, Picking, and Packing', enabled: true },
      { name: 'In-Transit & QC', desc: 'Stock Transfer and Quality Control', enabled: true },
      { name: 'Advanced Tracking', desc: 'Batch, Serial Number, and Multi-location', enabled: true },
      { name: 'Planning & Forecast', desc: 'Inventory Planning and AI Forecasting', enabled: true },
      { name: 'Stock Integrity', desc: 'Valuation and Stock Opname', enabled: true }
    ]
  },
  { 
    key: 'QMS', name: 'Quality Management (QMS)', type: 'MODULE', enabled: true, icon: 'pi pi-verified', 
    description: 'Standarisasi kualitas operasional melalui manajemen NCR, CAPA, dan kontrol dokumen ISO.',
    subModules: [
      { name: 'Non-Conformance', desc: 'NCR and CAPA management', enabled: true },
      { name: 'Supplier Rating', desc: 'Quality rating for suppliers', enabled: true },
      { name: 'Doc & Calibration', desc: 'SOP, ISO control, and calibration', enabled: true }
    ]
  },
  { 
    key: 'MANUFACTURING', name: 'Manufacturing & Engineering', type: 'MODULE', enabled: true, icon: 'pi pi-cog', 
    description: 'Perencanaan dan pelaksanaan produksi dengan kontrol shop floor dan perhitungan biaya HPP.',
    subModules: [
      { name: 'Design & BOM', desc: 'Bill of Materials and formulation', enabled: true },
      { name: 'Planning (MRP)', desc: 'MPS and Master Requirement Planning', enabled: true },
      { name: 'Production Control', desc: 'Work Order and Execution', enabled: true },
      { name: 'Shop Floor & TPM', desc: 'Shop Floor log and Maintenance', enabled: true },
      { name: 'Production Costing', desc: 'Real-time production cost analysis', enabled: true }
    ]
  },
  { 
    key: 'FSM', name: 'Field Service Management', type: 'MODULE', enabled: true, icon: 'pi pi-map-marker', 
    description: 'Pengelolaan teknisi lapangan dengan jadwal kunjungan dan konsumsi suku cadang servis.',
    subModules: [
      { name: 'Scheduling & GPS', desc: 'Technician scheduling and GPS tracking', enabled: true },
      { name: 'Field Operations', desc: 'Work execution and parts consumption', enabled: true },
      { name: 'Digital Handover', desc: 'Electronic BAST and signature', enabled: true }
    ]
  },
  { 
    key: 'RENTAL', name: 'Rental & Asset Leasing', type: 'MODULE', enabled: true, icon: 'pi pi-key', 
    description: 'Sistem penyewaan aset dengan tagihan periodik dan pemeliharaan aset yang disewakan.',
    subModules: [
      { name: 'Rental Contracts', desc: 'Agreement and contract management', enabled: true },
      { name: 'Periodic Billing', desc: 'Automated recurring billing', enabled: true },
      { name: 'Asset Health', desc: 'Rental maintenance and depreciation', enabled: true }
    ]
  },
  { 
    key: 'FINANCE', name: 'Finance & Accounting', type: 'MODULE', enabled: true, icon: 'pi pi-dollar', 
    description: 'Pusat integrasi keuangan dengan konsolidasi antar-perusahaan dan pelaporan fiskal.',
    subModules: [
      { name: 'General Ledger', desc: 'Journals, CoC, and Consolidation', enabled: true },
      { name: 'Cash & Bank', desc: 'Bank Recon, Petty Cash, Pymnt Request', enabled: true },
      { name: 'AR & AP Control', desc: 'Aging and Vendor Reconciliation', enabled: true },
      { name: 'Fixed Assets', desc: 'Asset Registry, Depr, and Disposal', enabled: true },
      { name: 'Budget & Close', desc: 'Budget control and Period closing', enabled: true },
      { name: 'Financial Reporting', desc: 'Financial reports and Analysis', enabled: true }
    ]
  },
  { 
    key: 'TAX', name: 'Indonesia Tax Management', type: 'MODULE', enabled: true, icon: 'pi pi-receipt', 
    description: 'Lokalisasi perpajakan Indonesia mencakup manajemen Faktur Pajak (PPN) dan e-Bupot (PPh).',
    subModules: [
      { name: 'VAT (PPN)', desc: 'Faktur Pajak, NSFP, and PPN Masa', enabled: true },
      { name: 'Withholding (PPh)', desc: 'e-Bupot, PPh 21, and 1721-A1', enabled: true },
      { name: 'ID Billing', desc: 'Automatic ID Billing generator', enabled: true },
      { name: 'Tax Compliance', desc: 'Equalization and Fiscal reconciliation', enabled: true }
    ]
  },
  { 
    key: 'HRIS', name: 'HRIS & Human Capital', type: 'MODULE', enabled: true, icon: 'pi pi-id-card', 
    description: 'Pengelolaan modal manusia lengkap dengan rekrutmen, payroll, dan penilaian kinerja.',
    subModules: [
      { name: 'Personnel & Org', desc: 'Employee Database and Org Structure', enabled: true },
      { name: 'Recruit & Talent', desc: 'ATS and Learning (LMS)', enabled: true },
      { name: 'Time & Attendance', desc: 'Attendance management and Shift', enabled: true },
      { name: 'Payroll & Tax', desc: 'Payroll engine and integration', enabled: true },
      { name: 'ESS & Requests', desc: 'Employee Self-Service and Claims', enabled: true },
      { name: 'Performance', desc: 'KPI and Performance reviews', enabled: true }
    ]
  },
  { 
    key: 'LOGISTICS', name: 'Logistics Supply Chain', type: 'MODULE', enabled: true, icon: 'pi pi-truck', 
    description: 'Optimasi rute pengiriman dan manajemen armada untuk menjamin ketepatan waktu logistik.',
    subModules: [
      { name: 'Fleet & Dispatch', desc: 'Vehicle and Driver management', enabled: true },
      { name: 'Route Analytics', desc: 'AI-based route optimization', enabled: true },
      { name: 'Digital POD', desc: 'Proof of Delivery and Delivery log', enabled: true },
      { name: 'Whse Fulfillment', desc: 'Warehouse logistics and Packing', enabled: true }
    ]
  },
  { 
    key: 'PROJECT', name: 'Project & Portfolio Mgmt', type: 'MODULE', enabled: true, icon: 'pi pi-folder-open', 
    description: 'Kontrol penuh proyek konstruksi dan EPC dengan monitoring anggaran dan progress billing.',
    subModules: [
      { name: 'Project Planning', desc: 'Budget, Sites, and Teams setup', enabled: true },
      { name: 'Bid & Tender', desc: 'Tender and contract management', enabled: true },
      { name: 'Progress Billing', desc: 'Milestone and Termin billing', enabled: true },
      { name: 'Cost Control', desc: 'Financial cost control vs budget', enabled: true }
    ]
  },
  { 
    key: 'CONSTRUCTION', name: 'Construction Management', type: 'MODULE', enabled: true, icon: 'pi pi-building', 
    description: 'Solusi lapangan konstruksi untuk tracking material site dan laporan harian kerja.',
    subModules: [
      { name: 'Site Progress', desc: 'S-Curve and Daily Site Report', enabled: true },
      { name: 'Construction Ops', desc: 'Material Request and Subcon mgmt', enabled: true },
      { name: 'Technical Docs', desc: 'Drawing and Document Control', enabled: true },
      { name: 'Safety / HSE', desc: 'Safety checklist and Incident log', enabled: true }
    ]
  },
  { 
    key: 'TASKS', name: 'Task & Collaboration', type: 'MODULE', enabled: true, icon: 'pi pi-check-square', 
    description: 'Pusat kolaborasi tim untuk manajemen tugas harian, kanban board, dan pelacakan deadline.',
    subModules: [
      { name: 'Work Visualization', desc: 'Kanban Board and Work planning', enabled: true },
      { name: 'Productivity', desc: 'My Tasks and Personal tracking', enabled: true },
      { name: 'Team Alignment', desc: 'Team tasks and categories', enabled: true },
      { name: 'Deadline Radar', desc: 'Cross-project deadline tracker', enabled: true }
    ]
  },
  { 
    key: 'SUPPORT', name: 'Support, GRC & Data', type: 'MODULE', enabled: true, icon: 'pi pi-wrench', 
    description: 'Modul pendukung integrasi data (BI) dan kepatuhan lingkungan/sosial (Sustainability).',
    subModules: [
      { name: 'Asset Support', desc: 'Internal support asset management', enabled: true },
      { name: 'Digital DMS', desc: 'Document Management System', enabled: true },
      { name: 'GRC & Risk', desc: 'Governance, Risk, and Compliance', enabled: true },
      { name: 'BI & Analytics', desc: 'Business Intelligence and BI', enabled: true },
      { name: 'Sustainability', desc: 'ESG Reporting and Social impact', enabled: true }
    ]
  },
  { 
    key: 'AI_LABS', name: 'Enterprise AI Labs', type: 'FEATURE', enabled: false, icon: 'pi pi-bolt', 
    description: 'Inovasi kecerdasan buatan untuk otomatisasi rekonsiliasi dan prediksi permintaan stok.',
    subModules: [
      { name: 'Predictive Demand', desc: 'AI-based inventory forecasting', enabled: false },
      { name: 'Pattern Recon', desc: 'AI-driven finance reconciliation', enabled: false }
    ]
  }
]);

const filteredModules = computed(() =>
  filterType.value ? modules.value.filter(m => m.type === filterType.value) : modules.value
);

function toggleModule(mod: any) {
  mod.enabled = !mod.enabled;
  toast.add({ severity: mod.enabled ? 'success' : 'warn', summary: mod.enabled ? 'Diaktifkan' : 'Dinonaktifkan', detail: `${mod.name} berhasil di-${mod.enabled ? 'aktifkan' : 'nonaktifkan'}.`, life: 3000 });
}
function deploy() {
  toast.add({ severity: 'success', summary: 'Deploy Berhasil', detail: 'Perubahan module & feature flags berhasil dideploy ke sistem.', life: 3000 });
}
</script>
