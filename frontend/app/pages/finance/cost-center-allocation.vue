<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium Costing Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-emerald-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-100">Optimasi Pusat Biaya & BOP</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Cost Center Allocation Matrix</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Alokasi <span class="text-emerald-600 italic font-medium">Beban Biaya</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Pendistribusian Biaya Overhead Pabrik (BOP) & biaya operasional ke departemen pusat biaya produksi maupun jasa.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Terdistribusi</div>
           <div class="text-2xl font-black text-emerald-700 tabular-nums tracking-tighter">{{ formatRupiah(totalAllocated) }}</div>
        </div>
        <Button v-if="canManage" label="BUAT ALOKASI BARU" icon="pi pi-plus" severity="success" @click="openCreate"
          class="h-14 px-8 rounded-[1.25rem] bg-emerald-800 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-[1.05] active:scale-95 transition-all" />
      </div>
    </div>

    <!-- Main Allocation Matrix (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-calculator text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Log Jurnal Alokasi & Distribusi</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Operational Overhead Ledger</p>
           </div>
        </div>

        <div class="relative flex items-center gap-4">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari No. Referensi / Deskripsi..." class="border-none bg-transparent text-[10px] h-9 w-48 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>

          <select v-model="filterPeriod" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-emerald-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Periode Fiskal</option>
            <option v-for="p in periods" :key="p.id" :value="p.id">Periode {{ p.periodNo }} / {{ p.fiscalYear?.year || new Date().getFullYear() }}</option>
          </select>

          <select v-model="filterType" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-emerald-500 outline-none bg-white shadow-sm transition-all">
            <option value="">Semua Tipe</option>
            <option value="PRODUCTION">Departemen Produksi</option>
            <option value="SERVICE">Departemen Jasa/Umum</option>
          </select>
          
          <Button icon="pi pi-filter" severity="secondary" text rounded class="h-10 w-10 text-slate-400 hover:text-emerald-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[260px]">No. Ref Jurnal (JV)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Analisa Pusat Biaya (Cost Center)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Rekening (COA)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-slate-50/50">Nilai Alokasi (IDR)</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-32 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-emerald-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-emerald-600">Menganalisis distribusi pusat biaya...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredData" v-else :key="doc.id" class="transition-all hover:bg-emerald-50/20 group border-l-4 border-l-transparent hover:border-l-emerald-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-file-invoice text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-emerald-900 tracking-tight group-hover:text-emerald-600 transition-colors uppercase">
                         {{ doc.referenceNo || 'UNREF' }}
                      </div>
                      <div class="mt-1 flex items-center gap-2">
                        <div class="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                        <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic truncate max-w-[140px]">{{ getPeriodLabel(doc.periodId) }}</span>
                      </div>
                   </div>
                </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="flex items-center gap-3">
                    <span class="px-3 py-1 bg-slate-900 text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-lg">{{ doc.costCenter?.code || 'CC-???' }}</span>
                    <span class="text-[11px] font-black text-slate-800 uppercase tracking-tight group-hover:text-emerald-700 transition-colors uppercase">{{ doc.costCenter?.name || '- Tidak Diketahui -' }}</span>
                 </div>
                 <div class="text-[9px] text-slate-400 font-medium mt-1.5 line-clamp-1 max-w-sm italic tracking-tight">{{ doc.description || 'Tidak ada deskripsi distribusi biaya.' }}</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <div class="inline-flex px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 font-mono text-[10px] font-black shadow-sm">{{ doc.accountCode }}</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-slate-50/5 group-hover:bg-slate-100 transition-colors">
                 <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(doc.allocatedAmount) }}</div>
                 <div class="mt-1 flex items-center justify-end gap-2">
                    <span class="text-[8px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shadow-sm border border-emerald-100">{{ ((Number(doc.allocatedAmount) / totalAllocated) * 100).toFixed(1) }}% Ratio</span>
                    <span class="text-[8px] font-black text-slate-400 font-mono uppercase tracking-widest">Base Allocation</span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                <Button icon="pi pi-search" rounded text @click="viewAlloc(doc)" class="h-10 w-10 text-slate-300 hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100" />
              </td>
            </tr>

            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">📂</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Buku alokasi masih bersih. Tidak ada transaksi ditemukan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ ALLOCATION FORM DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-800 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-emerald-200">
               <i class="pi pi-calculator text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Alokasi <span class="text-emerald-600 italic text-2xl">Pusat Biaya</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 italic">Service Department Cost Distribution Protocol</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 pb-32">
           <!-- Form Section -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Periode Pelaporan Lapkel</label>
                    <select :disabled="isReadonly" v-model="form.periodId" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm font-black text-slate-800 outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm cursor-pointer">
                       <option value="" disabled>-- Pilih Periode --</option>
                       <option v-for="p in periods" :key="p.id" :value="p.id">Periode {{ p.periodNo }} / {{ p.fiscalYear?.year || new Date().getFullYear() }}</option>
                    </select>
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Departemen / Cost Center Terbebani</label>
                    <select :disabled="isReadonly" v-model="form.costCenterId" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm font-black text-slate-800 outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm cursor-pointer">
                       <option value="" disabled>-- Pilih Pusat Biaya --</option>
                       <option v-for="c in costCenters" :key="c.id" :value="c.id">[{{ c.code }}] {{ c.name }}</option>
                    </select>
                 </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nomor Referensi (Bukti JV)</label>
                    <input :disabled="isReadonly" type="text" v-model="form.referenceNo" placeholder="No. Dokumen Asli" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-emerald-500 focus:bg-white transition-all font-mono shadow-sm" />
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Chart of Account (Rekening)</label>
                    <select :disabled="isReadonly" v-model="form.accountCode" class="w-full h-14 px-5 rounded-2xl bg-indigo-50 border-2 border-indigo-100 text-[11px] font-black text-indigo-700 outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono shadow-sm cursor-pointer">
                       <option value="" disabled>-- Pilih Akun COA --</option>
                       <option v-for="c in coaAccounts" :key="c.id" :value="c.code">{{ c.code }} - {{ c.name }}</option>
                    </select>
                 </div>
              </div>

              <div class="space-y-2">
                 <label class="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-1 italic">Total Nilai Alokasi Terdistribusi (IDR)</label>
                 <div class="relative">
                    <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">RP</span>
                    <input :disabled="isReadonly" type="number" v-model.number="form.allocatedAmount" placeholder="0" class="w-full h-24 pl-16 pr-6 rounded-[1.5rem] bg-emerald-50/50 border-2 border-emerald-100 text-4xl font-black text-emerald-800 outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-xl font-mono tabular-nums" />
                 </div>
              </div>

              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Rincian Narasi / Deskripsi Analisa Alokasi</label>
                 <textarea :disabled="isReadonly" v-model="form.description" rows="4" placeholder="Rincian lengkap perhitungan BOP..." class="w-full p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm leading-relaxed"></textarea>
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button v-if="!isReadonly && canManage" label="Post Jurnal Distribusi" icon="pi pi-check" :loading="saving" :disabled="saving || !form.costCenterId || !form.periodId || form.allocatedAmount <= 0" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-emerald-800 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const success = ref('');
const error = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(() => { refVar.value = null; }, 3000); };

const canManage = computed(() => auth.hasPermission('finance.cost-center.manage') || true);

const data = ref<any[]>([]);
const periods = ref<any[]>([]);
const costCenters = ref<any[]>([]);
const coaAccounts = ref<any[]>([]);

const search = ref('');
const filterPeriod = ref('');
const filterType = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(false);

const form = reactive({
  id: '',
  periodId: '',
  costCenterId: '',
  referenceNo: '',
  accountCode: '',
  allocatedAmount: 0,
  description: ''
});

// Load core dependent data
const loadDependencies = async () => {
    try {
        const pRes = await api.get('/finance/periods');
        if(pRes.data?.periods) periods.value = pRes.data.periods;
        
        const ccRes = await api.get('/core/cost-centers');
        if(ccRes.data?.costCenters) costCenters.value = ccRes.data.costCenters;
        
        const coaRes = await api.get('/core/chart-of-accounts');
        if(coaRes.data?.accounts) {
            // Filter to show only expense accounts (5-series) for allocation
            coaAccounts.value = coaRes.data.accounts.filter((c: any) => c.code?.startsWith('5'));
        }
    } catch(e) {
        console.warn('Dependency load error:', e);
    }
};

const load = async () => {
  loading.value = true;
  if(periods.value.length === 0) await loadDependencies();

  try {
    const params = filterPeriod.value ? `?periodId=${filterPeriod.value}` : '';
    const res = await api.get(`/finance/cost-center-allocation${params}`);
    if (res.data?.allocations) {
        data.value = res.data.allocations;
    }
  } catch (e: any) {
     console.error('Failed fetching data', e);
  } finally {
     loading.value = false;
  }
};

const filteredData = computed(() => {
  let list = data.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(x => 
       x.referenceNo?.toLowerCase().includes(q) || 
       x.description?.toLowerCase().includes(q) ||
       x.costCenter?.name?.toLowerCase().includes(q)
    );
  }
  if (filterType.value) {
    list = list.filter(x => x.costCenter?.type === filterType.value);
  }
  return list;
});

const totalAllocated = computed(() => {
   return filteredData.value.reduce((acc, curr) => acc + Number(curr.allocatedAmount || 0), 0);
});

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const getPeriodLabel = (pid: string) => {
   const p = periods.value.find(x => x.id === pid);
   if(p) return `Per. ${p.periodNo}/${p.fiscalYear?.year || new Date().getFullYear()}`;
   return 'Unknown';
}

function openCreate() {
  isReadonly.value = false;
  Object.assign(form, {
      id: '',
      periodId: periods.value[0]?.id || '',
      costCenterId: costCenters.value[0]?.id || '',
      referenceNo: `JV-${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,'0')}-${String(Math.floor(Math.random()*1000)).padStart(3,'0')}`,
      accountCode: '',
      allocatedAmount: 0,
      description: ''
  });
  dialogOpen.value = true;
}

function viewAlloc(row: any) {
  isReadonly.value = true;
  Object.assign(form, {
      id: row.id,
      periodId: row.periodId,
      costCenterId: row.costCenterId,
      referenceNo: row.referenceNo || '',
      accountCode: row.accountCode || '',
      allocatedAmount: Number(row.allocatedAmount) || 0,
      description: row.description || ''
  });
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
     await api.post('/finance/cost-center-allocation', {
         periodId: form.periodId,
         costCenterId: form.costCenterId,
         accountCode: form.accountCode,
         allocatedAmount: Number(form.allocatedAmount),
         referenceNo: form.referenceNo,
         description: form.description
     });
     showMsg(success, 'Alokasi Biaya berhasil didistribusikan ke jurnal pusat!');
     dialogOpen.value = false;
     await load();
  } catch(e) {
     showMsg(error, 'Gagal memproses alokasi. Harap perhatikan input form.');
  } finally {
     saving.value = false;
  }
}

onMounted(() => {
  load();
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>