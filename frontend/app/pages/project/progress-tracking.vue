<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

const api = useApi();
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);
const search = ref('');

const selectedProject = ref('P-2024-X12')
const projects = ref([
  { id: 'P-2024-X12', name: 'Pembangunan Gedung SES Hub Jakarta', manager: 'Budi Santoso', budget: 12500000000 },
  { id: 'P-2024-S01', name: 'Renovasi Site Office Surabaya', manager: 'Siti Aminah', budget: 1200000000 },
])

const milestones = ref([
  { id: 1, name: 'Pondasi & Bored Pile', weight: 15, plan: '100%', actual: '100%', status: 'Completed', color: 'emerald' },
  { id: 2, name: 'Struktur Lantai 1-3', weight: 25, plan: '100%', actual: '92%', status: 'At Risk', color: 'amber' },
  { id: 3, name: 'Struktur Lantai 4-8', weight: 30, plan: '40%', actual: '35%', status: 'In Progress', color: 'indigo' },
  { id: 4, name: 'MEP (Mechanical/Electrical)', weight: 20, plan: '10%', actual: '5%', status: 'Behind', color: 'rose' },
])

const stats = ref({
  totalWeight: '82.5%',
  spi: '0.94',
  cpi: '1.02',
  safeDays: '312'
})

const siteReports = ref([
  { id: 'R-001', date: '2026-04-20', activity: 'Pengecoran plat lantai 4 zona B selesai. Sisa volume aman.', user: 'Admin Site', status: 'VERIFIED' },
  { id: 'R-002', date: '2026-04-19', activity: 'Pemasangan bekisting kolom lantai 5. Kendala cuaca hujan sore.', user: 'Supervisor A', status: 'PENDING' },
  { id: 'R-003', date: '2026-04-18', activity: 'Fabrikasi besi tulangan untuk shearwall zona C.', user: 'Admin Site', status: 'VERIFIED' },
])

const form = reactive({
  projectId: 'P-2024-X12',
  reportDate: new Date().toISOString().split('T')[0],
  progress: 82.5,
  description: '',
  attachments: []
})

// S-Curve Points (Simplified for SVG)
const planPoints = "0,200 50,195 100,180 150,150 200,100 250,60 300,30 350,15 400,10"
const actualPoints = "0,200 50,200 100,190 150,165 200,120 250,90 300,75"

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)
}

function openUpdate() {
  dialogOpen.value = true;
}

async function saveProgress() {
  saving.value = true;
  // Mock save
  setTimeout(() => {
    saving.value = false;
    dialogOpen.value = false;
  }, 1000);
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-10 space-y-8 font-sans">
    
    <!-- Header (Premium Execution Hub Style) -->
    <div class="rounded-[2rem] bg-white border border-slate-200 p-10 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-80 h-80 bg-amber-50 rounded-full blur-3xl -mr-40 -mt-40 transition-all duration-500 group-hover:bg-amber-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-3">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Execution Bridge</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Site Progress Intelligence</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Pusat <span class="text-amber-600 not-italic text-3xl">Eksekusi Proyek</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-2 uppercase tracking-wide">Monitoring real-time progres konstruksi, analitik Kurva-S, dan tata kelola BAST progres lapangan.</p>
        </div>
        <div class="flex items-center gap-3">
           <select v-model="selectedProject" class="h-12 border-none rounded-xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
             <option v-for="p in projects" :key="p.id" :value="p.id">[{{ p.id }}] {{ p.name }}</option>
           </select>
           <Button label="+ Update Progres" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all" @click="openUpdate" />
        </div>
      </div>
    </div>

    <!-- Telemetry KPIs (High-Contrast Intelligence) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
      <div class="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] mb-4 opacity-80">Progres Kontrak (Actual)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ stats.totalWeight }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-chart-line text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Schedule Performance (SPI)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-indigo-700 tracking-tighter leading-none">{{ stats.spi }}</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><i class="pi pi-clock text-lg"></i></div>
        </div>
      </div>

      <div class="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 border-b-8 border-b-amber-500">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Cost Efficiency (CPI)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ stats.cpi }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 transition-all hover:rotate-12"><i class="pi pi-wallet text-lg"></i></div>
        </div>
      </div>

       <div class="p-8 rounded-[2.5rem] bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-amber-100 tracking-[0.2em] mb-4 opacity-80">Safe Man-Hours (Days)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ stats.safeDays }}</h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-shield text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Visualization Grid (S-Curve & Milestones) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- S-Curve Card -->
      <div class="lg:col-span-8 bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
        <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50"></div>
        
        <div class="flex items-center justify-between mb-10 relative z-10">
          <div>
            <h3 class="text-xl font-black text-slate-800 uppercase tracking-tight italic">Analitik <span class="text-amber-600 not-italic">Kurva-S</span></h3>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Perbandingan Akumulasi Rencana vs Aktual</p>
          </div>
          <div class="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-slate-300"></div>
              <span class="text-[9px] font-black uppercase text-slate-400 tracking-widest">Rencana</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-amber-500"></div>
              <span class="text-[9px] font-black uppercase text-amber-500 tracking-widest">Aktual (Selisih 5.2%)</span>
            </div>
          </div>
        </div>

        <div class="relative h-72 mb-8 pr-12">
           <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
            <line x1="0" y1="0" x2="400" y2="0" stroke="#f1f5f9" stroke-width="1" />
            <line x1="0" y1="50" x2="400" y2="50" stroke="#f1f5f9" stroke-width="1" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" stroke-width="1" />
            <line x1="0" y1="150" x2="400" y2="150" stroke="#f1f5f9" stroke-width="1" />
            <polyline :points="planPoints" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 4" />
            <polyline :points="actualPoints" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="300" cy="75" r="5" fill="#f59e0b" />
          </svg>
           <div class="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-[8px] font-black text-slate-300 uppercase tracking-widest">
            <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
          </div>
        </div>
        <div class="flex justify-between px-2 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] font-mono">
          <span>Januari</span><span>Maret</span><span>Mei</span><span>Juli</span><span>September</span><span>November</span>
        </div>
      </div>

      <!-- Execution Milestones -->
      <div class="lg:col-span-4 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-200/50 relative overflow-hidden flex flex-col">
          <div class="absolute left-[-20px] bottom-[-20px] w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div class="flex items-center justify-between mb-10 relative z-10">
             <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-amber-500 bg-amber-500/10 px-4 py-2 rounded-xl">Execution Milestones</h4>
             <i class="pi pi-list text-slate-600"></i>
          </div>
          
          <div class="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2 relative z-10">
             <div v-for="m in milestones" :key="m.id" class="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                <div class="flex items-center justify-between mb-4">
                   <div class="flex items-center gap-4">
                      <div class="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white font-black shadow-lg">{{ m.id }}</div>
                      <div>
                         <div class="text-[11px] font-black uppercase text-white group-hover:text-amber-400 transition-colors">{{ m.name }}</div>
                         <div class="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1 italic">Bobot: {{ m.weight }}%</div>
                      </div>
                   </div>
                   <div class="text-right">
                      <div class="text-[7px] font-black text-slate-500 uppercase mb-1">Aktual</div>
                      <div class="text-sm font-black text-amber-500 font-mono">{{ m.actual }}</div>
                   </div>
                </div>
                <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div class="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-1000" :style="{ width: m.actual }"></div>
                </div>
             </div>
          </div>
      </div>
    </div>

    <!-- Audit Ledger Progres (Premium Ledger Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <div class="p-10 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl hover:rotate-6 transition-transform"><i class="pi pi-history text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Progres Proyek</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Site Reports & Governance Logs</p>
           </div>
        </div>
        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari laporan harian..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" />
          </div>
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">ID Laporan</th>
              <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Log Aktivitas Site</th>
              <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Pelapor</th>
              <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="r in siteReports" :key="r.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-amber-500">
              <td class="px-10 py-6 align-middle">
                 <div class="font-mono text-[11px] font-black text-slate-500 group-hover:text-amber-700 transition-colors uppercase italic">{{ r.id }}</div>
                 <div class="text-[8px] font-black text-slate-400 uppercase mt-1">{{ r.date }}</div>
              </td>
              <td class="px-8 py-6 align-middle border-l border-slate-50">
                 <div class="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">{{ r.activity }}</div>
              </td>
              <td class="px-8 py-6 align-middle border-l border-slate-50">
                 <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black text-[10px] uppercase">{{ r.user[0] }}</div>
                    <div class="text-[9px] font-black text-slate-800 uppercase tracking-widest">{{ r.user }}</div>
                 </div>
              </td>
              <td class="px-8 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30">
                 <span class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-white border border-slate-200 shadow-sm uppercase group-hover:bg-amber-600 group-hover:text-white transition-all cursor-crosshair">
                   {{ r.status }}
                 </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Arsitektur Progress Update (Non-Dismissible Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <!-- Backdrop not clickable per requirements -->
      <div class="w-[calc(100%-2rem)] max-w-4xl bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-amber-600">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-amber-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-chart-line text-3xl font-black"></i>
            </div>
            <div>
               <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">BAST <span class="text-amber-600 italic text-2xl">Progres Lapangan</span></h3>
               <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-amber-500 text-amber-600 italic">Formulir Rekam Progres Fisik & Aktualisasi Kurva-S</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-amber-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-6">
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">ID Proyek Terpilih</label>
                    <div class="h-14 bg-white rounded-2xl px-6 flex items-center text-[13px] font-black text-slate-900 border-2 border-slate-100 shadow-sm uppercase font-mono tracking-widest">{{ form.projectId }}</div>
                 </div>
                 <div class="space-y-4 text-emerald-600 italic">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Estimasi Capaian Aktual (%)</label>
                    <div class="relative">
                       <InputNumber v-model="form.progress" :min="0" :max="100" class="w-full" inputClass="w-full h-14 border-none rounded-2xl px-6 text-2xl font-black text-amber-600 bg-white shadow-inner outline-none text-center font-mono" />
                       <span class="absolute right-12 top-1/2 -translate-y-1/2 font-black text-amber-300 text-xl">%</span>
                    </div>
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Laporan (Record Date)</label>
                    <InputText type="date" v-model="form.reportDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all uppercase" />
                 </div>
              </div>
              <div class="flex flex-col">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 mb-4">Catatan Aktivitas Lapangan</label>
                 <textarea v-model="form.description" rows="10" class="flex-1 w-full rounded-3xl border-2 border-slate-100 bg-white p-8 text-[11px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-amber-400 transition-all placeholder:text-slate-300 uppercase tracking-wider" placeholder="Tuliskan detail pekerjaan hari ini (Contoh: Pemasangan keramik lantai 2 selesai 100%)..."></textarea>
              </div>
           </div>
        </div>

        <!-- Workspace Footer -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0">
           <div class="flex items-center gap-4">
              <div class="px-6 py-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2">
                 <i class="pi pi-lock"></i> Record data bersifat final untuk audit harian
              </div>
           </div>
           <div class="flex items-center gap-4">
              <Button label="Batalkan Sesi" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest rounded-xl" />
              <Button label="Simpan & Aktualisasi Kurva-S" icon="pi pi-save" size="large" :loading="saving" :disabled="saving" @click="saveProgress" class="h-14 px-12 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all rounded-xl" />
           </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in-up { 
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(30px); } 
  to { opacity: 1; transform: translateY(0); } 
}

.animate-scale-in { 
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes scaleIn { 
  from { opacity: 0; transform: scale(0.95); } 
  to { opacity: 1; transform: scale(1); } 
}

.custom-scrollbar::-webkit-scrollbar { 
  width: 4px; 
}
.custom-scrollbar::-webkit-scrollbar-track { 
  background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: #e2e8f0; 
  border-radius: 10px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { 
  background: #cbd5e1; 
}

:deep(.p-inputtext), :deep(.p-inputnumber-input) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
   border-radius: 16px !important;
}

:deep(.p-button-rounded) {
  border-radius: 9999px !important;
}

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 1rem center; 
  background-size: 1em; 
}
</style>
