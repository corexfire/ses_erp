<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

const api = useApi();
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);
const search = ref('');

const stats = ref({
  co2Footprint: '0 T',
  energyIntensity: '0',
  recycleRate: '0%',
  renewableMix: '0%'
})

const initiatives = ref([])

const form = reactive({
  code: '',
  title: '', // Mapping to description in backend to keep it simple or just adding metadata
  type: 'ENERGY',
  indicator: 'Carbon Offset',
  period: new Date().toISOString().slice(0, 7), // 2024-04
  value: 0,
  target: 0,
  unit: 'tCO2e',
  description: ''
})

async function fetchData() {
  loading.value = true;
  try {
    const [statsRes, recordsRes] = await Promise.all([
      api.get('/support/sustainability/stats'),
      api.get('/support/sustainability')
    ]);
    
    // Map stats
    stats.value = {
      co2Footprint: `${statsRes.data.carbonPulse.totalEmissions.toFixed(1)} T`,
      energyIntensity: (statsRes.data.energyMix.renewableKwh / 1000).toFixed(1),
      recycleRate: `${statsRes.data.verificationStatus.verified > 0 ? (statsRes.data.verificationStatus.verified / (statsRes.data.verificationStatus.verified + statsRes.data.verificationStatus.submitted + statsRes.data.verificationStatus.draft) * 100).toFixed(1) : 0}%`,
      renewableMix: `${statsRes.data.energyMix.targetKwh > 0 ? (statsRes.data.energyMix.renewableKwh / statsRes.data.energyMix.targetKwh * 100).toFixed(1) : 0}%`
    };

    // Map records to "initiatives" table
    initiatives.value = recordsRes.data.map((r: any) => ({
      id: r.code,
      title: r.indicator,
      category: r.type,
      status: r.status,
      progress: r.target > 0 ? Math.round((Number(r.value) / Number(r.target)) * 100) : 0,
      impact: Number(r.value) > Number(r.target) ? 'High' : 'Medium'
    }));
  } catch (err) {
    console.error('Failed to fetch sustainability data', err);
  } finally {
    loading.value = false;
  }
}

function openUpdate() {
  dialogOpen.value = true;
  form.code = `SUST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

async function saveInitiative() {
  saving.value = true;
  try {
    await api.post('/support/sustainability', {
      code: form.code,
      type: form.type,
      indicator: form.indicator,
      period: form.period,
      value: form.value,
      target: form.target,
      unit: form.unit,
      description: `${form.title}: ${form.description}`
    });
    dialogOpen.value = false;
    await fetchData();
  } catch (err) {
    console.error('Failed to save initiative', err);
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-10 space-y-8 font-sans">
    
    <!-- Header (ESG Intelligence Hub Style) -->
    <div class="rounded-[2rem] bg-white border border-slate-200 p-10 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl -mr-40 -mt-40 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-3">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Sustainability Bridge</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Enterprise ESG Intelligence</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Pusat <span class="text-emerald-600 not-italic text-3xl">Intelijen Keberlanjutan & ESG</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-2 uppercase tracking-wide">Monitoring metrik ESG, Intensitas Karbon, dan Dampak Lingkungan secara real-time untuk audit keberlanjutan.</p>
        </div>
        <div class="flex items-center gap-3">
           <button class="h-12 border-none rounded-xl px-6 text-[10px] font-black text-slate-700 bg-slate-100 italic transition-all hover:bg-slate-200 uppercase tracking-widest">
             <i class="pi pi-download mr-2"></i> Unduh Laporan ESG
           </button>
           <Button label="+ Inisiatif Baru" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" @click="openUpdate" />
        </div>
      </div>
    </div>

    <!-- Telemetry KPIs (High-Contrast ESG Matrix) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
      <div class="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-black group border-b-8 border-b-emerald-600">
        <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 opacity-80">Jejak Karbon (CO2e)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ stats.co2Footprint }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-cloud text-lg text-emerald-500"></i>
          </div>
        </div>
      </div>

      <div class="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Intensitas Energi</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-indigo-700 tracking-tighter leading-none">{{ stats.energyIntensity }}</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><i class="pi pi-bolt text-lg"></i></div>
        </div>
      </div>

      <div class="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Laju Daur Ulang</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ stats.recycleRate }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 transition-all hover:rotate-12"><i class="pi pi-sync text-lg"></i></div>
        </div>
      </div>

       <div class="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-emerald-100 tracking-[0.2em] mb-4 opacity-80">Bauran Terbarukan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ stats.renewableMix }}</h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-sun text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Analytics Landscape (Distribution & Compliance) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Scope 1-3 Distribution Card -->
      <div class="lg:col-span-8 bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden flex flex-col">
        <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
        
        <div class="flex items-center justify-between mb-10 relative z-10 shrink-0">
          <div>
            <h3 class="text-xl font-black text-slate-800 uppercase tracking-tight italic">Distribusi <span class="text-emerald-600 not-italic">Emisi Lingkup 1-3</span></h3>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Analisis emisi operasional vs rantai pasokan</p>
          </div>
          <div class="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
            <div class="flex items-center gap-2">
              <span class="text-[9px] font-black uppercase text-emerald-600 tracking-widest">Efficiency: 75%</span>
            </div>
          </div>
        </div>

        <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
           <div class="md:col-span-1 flex flex-col items-center justify-center text-center relative py-8">
              <svg class="w-48 h-48 -rotate-90 overflow-visible">
                <circle cx="96" cy="96" r="88" fill="none" stroke="#f1f5f9" stroke-width="14" />
                <circle cx="96" cy="96" r="88" fill="none" stroke="#10b981" stroke-width="14" stroke-dasharray="552" stroke-dashoffset="138" stroke-linecap="round" class="transition-all duration-1000" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                 <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Skor</span>
                 <span class="text-5xl font-black text-slate-800 tracking-tighter">75<span class="text-xl text-emerald-500 font-bold ml-1">%</span></span>
              </div>
           </div>
           <div class="md:col-span-2 space-y-8 pr-4">
              <div class="space-y-3 group">
                 <div class="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none">
                    <span class="text-slate-500 group-hover:text-emerald-600 transition-colors">Lingkup 1 (Emisi Langsung)</span>
                    <span class="text-emerald-600 group-hover:scale-110 transition-transform">112T</span>
                 </div>
                 <div class="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div class="h-full bg-emerald-500 w-[45%] rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all duration-1000"></div>
                 </div>
              </div>
              <div class="space-y-3 group">
                 <div class="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none">
                    <span class="text-slate-500 group-hover:text-indigo-600 transition-colors">Lingkup 2 (Energi Tidak Langsung)</span>
                    <span class="text-indigo-600 group-hover:scale-110 transition-transform">88T</span>
                 </div>
                 <div class="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div class="h-full bg-indigo-500 w-[30%] rounded-full shadow-[0_0_12px_rgba(99,102,241,0.2)] transition-all duration-1000"></div>
                 </div>
              </div>
              <div class="space-y-3 group">
                 <div class="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none">
                    <span class="text-slate-500 group-hover:text-amber-600 transition-colors">Lingkup 3 (Rantai Pasokan)</span>
                    <span class="text-amber-600 group-hover:scale-110 transition-transform">212T</span>
                 </div>
                 <div class="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div class="h-full bg-amber-500 w-[25%] rounded-full shadow-[0_0_12px_rgba(245,158,11,0.2)] transition-all duration-1000"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <!-- Compliance Sidebar Card -->
      <div class="lg:col-span-4 bg-emerald-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-emerald-200/50 relative overflow-hidden group flex flex-col">
          <div class="absolute left-[-20px] bottom-[-20px] w-48 h-48 bg-white/10 rounded-full blur-3xl transition-all group-hover:bg-white/20"></div>
          <h4 class="text-[10px] font-black uppercase tracking-[0.25em] mb-10 text-emerald-100 flex items-center gap-2 relative z-10 shrink-0">
             <i class="pi pi-verified"></i> Status Kepatuhan & Sertifikasi
          </h4>
          
          <div class="space-y-10 flex-1 relative z-10">
             <div class="flex items-center gap-4 group/item">
                <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 transition-transform group-hover/item:rotate-12">
                   <i class="pi pi-shield text-2xl"></i>
                </div>
                <div>
                   <p class="text-sm font-black italic tracking-tight">ISO 14001:2015</p>
                   <p class="text-[9px] text-emerald-100 font-bold uppercase tracking-widest opacity-80 mt-1">Aktif & Terverifikasi</p>
                </div>
                <div class="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
             </div>
             
             <div class="flex items-center gap-4 group/item">
                <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 transition-transform group-hover/item:rotate-12">
                   <i class="pi pi-award text-2xl"></i>
                </div>
                <div>
                   <p class="text-sm font-black italic tracking-tight">Standar GRI</p>
                   <p class="text-[9px] text-emerald-100 font-bold uppercase tracking-widest opacity-80 mt-1">Pelaporan Mandiri</p>
                </div>
             </div>
          </div>

          <div class="mt-auto pt-8 border-t border-white/20 relative z-10 shrink-0">
             <div class="flex items-center justify-between font-black text-[10px] uppercase tracking-widest">
                <span class="text-emerald-100 opacity-60">ESG Risk Rating</span>
                <span class="bg-white text-emerald-600 px-4 py-2 rounded-xl shadow-lg">Low Risk (8.2)</span>
             </div>
          </div>
      </div>
    </div>

    <!-- Initiatives Ledger (Premium Structured Table) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <div class="p-10 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden shrink-0">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl hover:rotate-6 transition-transform"><i class="pi pi-history text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Daftar Inisiatif Strategis</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Sustainability Project Tracking Ledger</p>
           </div>
        </div>
        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari inisiatif..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" />
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">ID Inisiatif</th>
              <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Kategori & Judul Proyek</th>
              <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Dampak</th>
              <th class="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Progres (%)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 text-emerald-600 italic">
            <tr v-for="init in initiatives" :key="init.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-emerald-500">
              <td class="px-10 py-6 align-middle">
                 <div class="font-mono text-[11px] font-black text-slate-500 group-hover:text-emerald-700 transition-colors uppercase italic">{{ init.id }}</div>
                 <div class="text-[8px] font-black text-slate-400 uppercase mt-1">FY 2026 AUDIT</div>
              </td>
              <td class="px-8 py-6 align-middle border-l border-slate-50">
                 <div class="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{{ init.category }}</div>
                 <div class="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">{{ init.title }}</div>
              </td>
              <td class="px-8 py-6 align-middle border-l border-slate-50">
                 <div class="flex items-center gap-2">
                    <span :class="[init.impact === 'Very High' ? 'bg-amber-500' : 'bg-emerald-500']" class="w-2 h-2 rounded-full"></span>
                    <span class="text-[10px] font-black text-slate-800 uppercase tracking-widest">{{ init.impact }} Impact</span>
                 </div>
              </td>
              <td class="px-8 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30">
                 <div class="flex items-center gap-4">
                    <div class="flex-1 h-1.5 bg-white rounded-full overflow-hidden border border-slate-200">
                       <div class="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-1000" :style="{ width: `${init.progress}%` }"></div>
                    </div>
                    <span class="text-[11px] font-black font-mono text-emerald-600 w-10">{{ init.progress }}%</span>
                 </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Arsitektur Inisiatif Baru (Non-Dismissible Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-4xl bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-emerald-600">
        <!-- Dialog Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-leaf text-3xl font-black"></i>
            </div>
            <div>
               <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Tambah <span class="text-emerald-600 italic text-2xl">Inisiatif ESG Baru</span></h3>
               <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600 italic">Formulir Perekaman Inisiatif Strategis & Target Reduksi Karbon</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10 font-mono text-emerald-600 italic">
           <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-6">
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Judul Inisiatif / Indikator</label>
                    <InputText v-model="form.title" placeholder="Contoh: Optimasi Efisiensi HVAC..." class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all uppercase tracking-wider" />
                 </div>
                 <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kategori Utama</label>
                       <select v-model="form.type" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 appearance-none uppercase tracking-widest cursor-pointer">
                          <option value="ENERGY">Energi</option>
                          <option value="WASTE">Limbah</option>
                          <option value="EMISSION">Emisi</option>
                          <option value="WATER">Air</option>
                          <option value="SOCIAL">Sosial</option>
                       </select>
                    </div>
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Periode (YYYY-MM)</label>
                       <InputText v-model="form.period" placeholder="2024-04" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-white shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all text-center" />
                    </div>
                 </div>
                 <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nilai Aktual (Value)</label>
                       <InputNumber v-model="form.value" :min="0" class="w-full" inputClass="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-white shadow-inner outline-none text-center font-mono" />
                    </div>
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target</label>
                       <InputNumber v-model="form.target" :min="0" class="w-full" inputClass="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-white shadow-inner outline-none text-center font-mono" />
                    </div>
                 </div>
                 <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Indikator Metrik</label>
                       <InputText v-model="form.indicator" placeholder="kWh / tCO2e / m3" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-white shadow-inner outline-none text-center" />
                    </div>
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Satuan (Unit)</label>
                       <InputText v-model="form.unit" placeholder="Tons / Gallons" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-white shadow-inner outline-none text-center" />
                    </div>
                 </div>
              </div>
              <div class="flex flex-col">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 mb-4">Detailed Impact Assessment</label>
                 <textarea v-model="form.description" rows="12" class="flex-1 w-full rounded-3xl border-2 border-slate-100 bg-white p-8 text-[11px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-emerald-400 transition-all placeholder:text-slate-300 uppercase tracking-wider leading-relaxed" placeholder="Deskripsikan dampak lingkungan dan sosial dari inisiatif ini secara komprehensif..."></textarea>
              </div>
           </div>
        </div>

        <!-- Dialog Footer -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0">
           <div class="flex items-center gap-4">
              <div class="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2">
                 <i class="pi pi-info-circle"></i> Inisiatif akan terdaftar dalam Audit Tahunan ESG
              </div>
           </div>
           <div class="flex items-center gap-4">
              <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest rounded-xl" />
              <Button label="Simpan & Jalankan Inisiatif" icon="pi pi-play" size="large" :loading="saving" :disabled="saving" @click="saveInitiative" class="h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all rounded-xl" />
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
