<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);
const search = ref('');

const risks = ref([
  { id: 'RSK-001', title: 'Volatilitas Rantai Pasok', category: 'Operasional', impact: 'High', likelihood: 'Likely', status: 'MITIGATED', owner: 'Logistik' },
  { id: 'RSK-002', title: 'Fluktuasi Mata Uang', category: 'Finansial', impact: 'High', likelihood: 'Certain', status: 'ACTIVE', owner: 'Treasury' },
  { id: 'RSK-003', title: 'Keselamatan Kerja (Site A)', category: 'Kepatuhan', impact: 'Critical', likelihood: 'Unlikely', status: 'ACTIVE', owner: 'HSE' },
  { id: 'RSK-004', title: 'Kebocoran Data Siber', category: 'Strategis', impact: 'Critical', likelihood: 'Possible', status: 'MITIGATED', owner: 'Keamanan IT' },
])

const stats = ref({
  activeRisks: '12',
  mitigated: '45',
  exposureIndex: '68%',
  resilienceScore: '8.4/10'
})

const riskMatrix = [
  { level: 'Critical', count: 2, color: 'bg-rose-600' },
  { level: 'High', count: 5, color: 'bg-orange-500' },
  { level: 'Medium', count: 12, color: 'bg-amber-400' },
  { level: 'Low', count: 24, color: 'bg-emerald-500' },
]

const form = reactive({
  title: '',
  category: 'Operasional',
  impact: 'Medium',
  likelihood: 'Possible',
  mitigationPlan: '',
  owner: 'Risk Management Dept'
})

function openUpdate() {
  dialogOpen.value = true;
}

async function saveRisk() {
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
    
    <!-- Header (GRC Intelligence Hub Style) -->
    <div class="rounded-[2rem] bg-white border border-slate-200 p-10 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-80 h-80 bg-rose-50 rounded-full blur-3xl -mr-40 -mt-40 transition-all duration-500 group-hover:bg-rose-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-3">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Governance Bridge</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-rose-600">Enterprise Risk Intelligence</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Pusat <span class="text-rose-600 not-italic text-3xl">Manajemen Risiko & GRC</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-2 uppercase tracking-wide">Analitik risiko prediktif, pemantauan mitigasi, dan tata kelola ketahanan organisasional secara real-time.</p>
        </div>
        <div class="flex items-center gap-3">
           <button class="h-12 border-none rounded-xl px-6 text-[10px] font-black text-slate-700 bg-slate-100 italic transition-all hover:bg-slate-200 uppercase tracking-widest">
             <i class="pi pi-map mr-2"></i> Heatmap Risiko
           </button>
           <Button label="+ Asesmen Risiko" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all" @click="openUpdate" />
        </div>
      </div>
    </div>

    <!-- Telemetry KPIs (High-Contrast GRC Matrix) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
      <div class="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-black group border-b-8 border-b-rose-600">
        <div class="text-[10px] font-black uppercase text-rose-400 tracking-[0.2em] mb-4 opacity-80">Total Risiko Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ stats.activeRisks }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-shield text-lg text-rose-500"></i>
          </div>
        </div>
      </div>

      <div class="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Mitigasi Terverifikasi</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ stats.mitigated }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>

      <div class="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Indeks Eksposur (Global)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-indigo-700 tracking-tighter leading-none">{{ stats.exposureIndex }}</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 transition-all hover:rotate-12"><i class="pi pi-chart-bar text-lg"></i></div>
        </div>
      </div>

       <div class="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-amber-100 tracking-[0.2em] mb-4 opacity-80">GRC Resilience Score</div>
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-black text-white tracking-tighter leading-none">{{ stats.resilienceScore }}</h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-verified text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Main Landscape (Ledger & Analytics) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Risk Ledger (Structured Table) -->
      <div class="lg:col-span-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
          <div class="p-10 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4 relative overflow-hidden shrink-0">
             <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"></div>
             <div class="relative flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl hover:rotate-6 transition-transform"><i class="pi pi-list text-xl"></i></div>
                <div>
                   <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Daftar Risiko Aktif (Registry)</h3>
                   <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Monitoring & Audit Compliance Logs</p>
                </div>
             </div>
             <div class="relative flex items-center gap-3">
               <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
                 <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
                 <InputText v-model="search" placeholder="Cari risiko..." class="border-none bg-transparent text-[11px] h-9 w-48 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" />
               </div>
             </div>
          </div>

          <div class="flex-1 overflow-x-auto custom-scrollbar">
            <table class="w-full text-sm">
              <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
                <tr>
                  <th class="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Ref ID</th>
                  <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Kategori & Judul Risiko</th>
                  <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Impact</th>
                  <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="r in risks" :key="r.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-rose-500">
                  <td class="px-10 py-6 align-middle">
                     <div class="font-mono text-[11px] font-black text-slate-500 group-hover:text-rose-700 transition-colors uppercase italic">{{ r.id }}</div>
                     <div class="text-[8px] font-black text-slate-400 uppercase mt-1">{{ r.owner }}</div>
                  </td>
                  <td class="px-8 py-6 align-middle border-l border-slate-50">
                     <div class="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">{{ r.category }}</div>
                     <div class="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">{{ r.title }}</div>
                  </td>
                  <td class="px-8 py-6 align-middle border-l border-slate-50">
                     <div class="flex items-center gap-2">
                        <span :class="[r.impact === 'Critical' ? 'bg-rose-500' : 'bg-amber-500']" class="w-2 h-2 rounded-full"></span>
                        <span class="text-[10px] font-black text-slate-800 uppercase tracking-widest">{{ r.impact }}</span>
                     </div>
                  </td>
                  <td class="px-8 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30">
                     <span class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-white border border-slate-200 shadow-sm uppercase group-hover:bg-rose-600 group-hover:text-white transition-all cursor-crosshair" :class="r.status === 'MITIGATED' ? 'text-emerald-600' : 'text-rose-600'">
                       {{ r.status }}
                     </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>

      <!-- Right Analytics Stack -->
      <div class="lg:col-span-4 space-y-8">
         <!-- Exposure Meter -->
         <div class="bg-rose-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-rose-200/50 relative overflow-hidden group">
            <div class="absolute right-[-20px] top-[-20px] w-48 h-48 bg-white/10 rounded-full blur-3xl transition-all group-hover:bg-white/20"></div>
            <h4 class="text-[10px] font-black uppercase tracking-[0.25em] mb-10 text-rose-100 flex items-center gap-2">
               <i class="pi pi-bolt"></i> Risk Exposure Index
            </h4>
            <div class="flex items-center gap-4 mb-10">
               <h2 class="text-7xl font-black italic tracking-tighter">68<span class="text-2xl not-italic font-bold ml-1 text-rose-200">%</span></h2>
               <div class="flex flex-col">
                  <span class="text-xs font-black uppercase text-white">ELEVATED RISK</span>
                  <span class="text-[9px] font-bold text-rose-200 italic mt-1">+12% DARI AUDIT TERAKHIR</span>
               </div>
            </div>
            <div class="h-3 w-full bg-white/20 rounded-full overflow-hidden mb-4">
               <div class="h-full bg-white w-[68%] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-1000"></div>
            </div>
            <p class="text-[9px] font-bold text-rose-100 uppercase tracking-widest text-center opacity-60">Status: Memerlukan Perhatian Manajemen</p>
         </div>

         <!-- Impact Matrix -->
         <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 text-center italic">Matriks <span class="text-rose-600 not-italic">Dampak Risiko</span></h4>
            <div class="space-y-6">
               <div v-for="m in riskMatrix" :key="m.level" class="flex items-center gap-4 group">
                  <div :class="[m.color, 'w-12 h-12 rounded-2xl flex items-center justify-center text-[13px] font-black text-white shadow-lg transition-transform group-hover:rotate-12 group-hover:scale-110']">{{ m.count }}</div>
                  <div class="flex-1">
                     <div class="flex justify-between items-center mb-2">
                        <span class="text-[10px] font-black uppercase text-slate-500 tracking-widest">{{ m.level }} Impact</span>
                        <span class="text-[9px] font-bold text-slate-400 font-mono">{{ Math.round((m.count / 43) * 100) }}%</span>
                     </div>
                     <div class="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                        <div :class="[m.color]" :style="{ width: `${(m.count / 43) * 300}%` }" class="h-full rounded-full transition-all duration-1000"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>

    <!-- Footer Summary -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm animate-fade-in-up">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-inner">
           <i class="pi pi-verified text-2xl"></i>
        </div>
        <div>
          <h4 class="text-sm font-black text-slate-800 uppercase tracking-tighter">Skor Ketahanan Organisasional: <span class="text-emerald-600">Kuat (8.4/10)</span></h4>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Dihitung berdasarkan 42 alur kerja mitigasi aktif yang terverifikasi.</p>
        </div>
      </div>
      <button class="text-[10px] font-black uppercase text-rose-600 flex items-center gap-3 group tracking-[0.2em] italic">
        FULL GRC AUDIT LOG <i class="pi pi-arrow-right group-hover:translate-x-2 transition-transform"></i>
      </button>
    </div>

    <!-- Arsitektur Asesmen Risiko (Non-Dismissible Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-4xl bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-rose-600">
        <!-- Dialog Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-rose-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-exclamation-triangle text-3xl font-black"></i>
            </div>
            <div>
               <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Asesmen <span class="text-rose-600 italic text-2xl">Risiko Baru</span></h3>
               <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-rose-500 text-rose-600 italic">Formulir Identifikasi Risiko & Perencanaan Mitigasi Enterprise</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-rose-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-6">
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Judul / Deskripsi Singkat Risiko</label>
                    <InputText v-model="form.title" placeholder="Contoh: Interupsi Server Data Center..." class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all uppercase tracking-wider" />
                 </div>
                 <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kategori</label>
                       <select v-model="form.category" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-rose-400 appearance-none uppercase tracking-widest cursor-pointer">
                          <option>Operasional</option>
                          <option>Finansial</option>
                          <option>Kepatuhan</option>
                          <option>Strategis</option>
                       </select>
                    </div>
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Impact Level</label>
                       <select v-model="form.impact" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-rose-400 appearance-none uppercase tracking-widest cursor-pointer">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Critical</option>
                       </select>
                    </div>
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Risk Owner / Penanggung Jawab</label>
                    <div class="h-14 bg-white rounded-2xl px-6 flex items-center text-[11px] font-black text-slate-500 border-2 border-slate-100 shadow-sm uppercase tracking-widest">
                       <i class="pi pi-user mr-3"></i> {{ form.owner }}
                    </div>
                 </div>
              </div>
              <div class="flex flex-col">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 mb-4">Rencana Mitigasi & Kontrol Kontingensi</label>
                 <textarea v-model="form.mitigationPlan" rows="10" class="flex-1 w-full rounded-3xl border-2 border-slate-100 bg-white p-8 text-[11px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-rose-400 transition-all placeholder:text-slate-300 uppercase tracking-wider leading-relaxed" placeholder="Tuliskan langkah-langkah preventif dan mitigasi yang akan diambil..."></textarea>
              </div>
           </div>
        </div>

        <!-- Dialog Footer -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0">
           <div class="flex items-center gap-4">
              <div class="px-6 py-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2">
                 <i class="pi pi-info-circle"></i> Data akan divalidasi oleh Komite GRC
              </div>
           </div>
           <div class="flex items-center gap-4">
              <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest rounded-xl" />
              <Button label="Simpan & Publikasi Risiko" icon="pi pi-save" size="large" :loading="saving" :disabled="saving" @click="saveRisk" class="h-14 px-12 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all rounded-xl" />
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
