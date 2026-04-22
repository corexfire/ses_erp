<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium Audit Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-teal-100/50"></div>
      
      <div class="relative text-slate-900 border-none">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-teal-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-teal-100 shadow-none border-none">Amortization Logs</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-teal-600 uppercase tracking-widest tracking-tighter">Buku Audit Penyusutan</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Histori <span class="text-teal-600 italic font-medium">Beban Aset</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70 border-l-2 border-teal-500 pl-4">Laporan komprehensif atas pengakuan beban depresiasi periodik untuk seluruh aset mesin, kendaraan, dan infrastruktur pabrik.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amortisasi (IDR)</div>
           <div class="text-2xl font-black text-teal-700 tabular-nums tracking-tighter">{{ formatRupiah(totalDepreciation) }}</div>
        </div>
        <Button label="EKSPOR LAPORAN" icon="pi pi-print" severity="help" @click="dialogOpen = true"
          class="h-14 px-8 rounded-[1.25rem] bg-teal-800 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-teal-100 hover:scale-[1.05] active:scale-95 transition-all text-teal-100" />
      </div>
    </div>

    <!-- Grouped Audit Matrix (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up uppercase tracking-tighter">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-teal-200/10 rounded-full blur-3xl text-slate-900"></div>
        
        <div class="relative flex items-center gap-4 text-slate-900">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-verified text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Log Bukti Beban Periodik</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Depreciation Audit Matrix</p>
           </div>
        </div>

        <div class="relative flex flex-wrap items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs text-slate-900"></i>
            <InputText v-model="search" placeholder="Cari Kode Aset / Catatan..." class="border-none bg-transparent text-[10px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none text-slate-900" />
          </div>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-teal-600 bg-white border shadow-sm" />
        </div>
      </div>

      <!-- Category Tabs (Premium Glassmorphism) -->
      <div class="px-8 py-4 bg-white border-b border-slate-50 flex items-center gap-2 overflow-x-auto custom-scrollbar no-scrollbar scroll-smooth">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="activeTab = cat"
            :class="[
                activeTab === cat 
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-100 scale-105' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
            ]"
            class="px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-none whitespace-nowrap"
          >
            {{ cat.replace('_', ' ') }}
          </button>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[280px]">Referensi Aset / Mesin</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40 bg-slate-50/50">Periode Jurnal</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right w-44">Beban Depresiasi</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right w-44">Akumulasi Historis</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Keterangan Memo GL</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-24 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-teal-500 opacity-20 text-slate-900"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-teal-600">Sinkronisasi log audit penyusutan...</div>
              </td>
            </tr>

            <template v-else>
                <tr v-for="d in filteredLogs" :key="d.id" class="transition-all hover:bg-teal-50/20 group border-l-4 border-l-transparent hover:border-l-teal-400 text-slate-900 border-none shadow-none">
                  <td class="px-8 py-6 align-middle border-none">
                    <div class="flex items-center gap-4">
                       <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                          <i class="pi pi-chart-bar text-sm"></i>
                       </div>
                       <div>
                          <div class="font-black text-[11px] text-slate-800 tracking-tight group-hover:text-teal-700 transition-colors uppercase italic">{{ d.asset?.name || 'Aset Terhapus' }}</div>
                          <div class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{{ d.asset?.assetNo || 'N/A' }}</div>
                       </div>
                    </div>
                  </td>

                  <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-teal-600 text-[10px] bg-slate-50/5 group-hover:bg-slate-50 transition-colors uppercase">
                     {{ fmtDate(d.periodDate) }}
                  </td>
                  
                  <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-rose-50/5 group-hover:bg-rose-50 transition-colors">
                     <div class="font-black text-rose-600 text-sm tabular-nums tracking-tighter">-{{ formatRupiah(d.depreciationAmount) }}</div>
                     <div class="text-[8px] font-black text-rose-300 font-mono mt-0.5 uppercase tracking-widest italic">Ammortization Hit</div>
                  </td>

                  <td class="px-6 py-6 align-middle border-l border-slate-50 text-right">
                     <div class="font-black text-slate-700 text-sm tabular-nums tracking-tighter">{{ formatRupiah(d.accumulatedAmount) }}</div>
                     <div class="text-[8px] font-black text-slate-300 font-mono mt-0.5 uppercase tracking-widest italic">Cumulative Balance</div>
                  </td>

                  <td class="px-6 py-6 align-middle border-l border-slate-50">
                     <div class="text-[10px] text-slate-500 font-bold italic tracking-tight uppercase leading-relaxed opacity-70 line-clamp-1 truncate">{{ d.notes || '-' }}</div>
                  </td>

                  <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                     <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                        <Button icon="pi pi-undo" severity="danger" text rounded @click="reverseEntry(d)" title="Batal Jurnal (Reverse Entry)" class="h-10 w-10 hover:bg-rose-100 transition-colors" />
                     </div>
                  </td>
                </tr>
            </template>

            <tr v-if="!loading && filteredLogs.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500 block text-slate-900 border-none shadow-none">
                 <div class="text-6xl mb-4 opacity-10">📜</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Buku audit masih bersih. Belum ada catatan penyusutan yang dibukukan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ EXPORT SETTINGS DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all text-slate-900 border-none">
      <div class="relative w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-teal-900">
        <!-- Header -->
        <div class="p-8 border-b border-slate-100 bg-teal-50 flex justify-between items-center relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-teal-800 flex items-center justify-center text-white shadow-xl rotate-6 transition-transform shadow-teal-200">
               <i class="pi pi-print text-xl font-black"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-teal-900 tracking-tight leading-none uppercase italic">Cetak <span class="text-teal-600 italic text-lg">Laporan Audit</span></h3>
              <p class="text-[8px] font-black text-teal-500 uppercase tracking-widest mt-1">Export Ledger Data Service</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-white h-10 w-10 text-teal-900" />
        </div>

        <div class="p-8 space-y-8 bg-white text-slate-900">
           <div class="p-4 bg-slate-900 text-white rounded-[2rem] flex flex-col justify-center relative overflow-hidden group">
               <div class="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform"><i class="pi pi-chart-pie text-5xl"></i></div>
               <h4 class="text-[8px] font-black text-teal-400 uppercase tracking-widest leading-none mb-1 italic">Total Akumulasi Terdeteksi</h4>
               <div class="text-2xl font-black tabular-nums tracking-tighter">{{ formatRupiah(totalDepreciation) }}</div>
               <p class="text-[7px] font-bold text-slate-400 uppercase mt-1">Berdasarkan Filter Saat Ini</p>
           </div>

           <div class="space-y-6">
              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Pilih Format Keluaran</label>
                 <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 rounded-2xl border-2 border-teal-600 bg-teal-50 flex flex-col items-center gap-3 cursor-pointer group transition-all">
                       <i class="pi pi-file-pdf text-2xl text-teal-700 group-hover:scale-110 transition-transform"></i>
                       <span class="text-[9px] font-black text-teal-800 uppercase tracking-widest">Dokumen PDF</span>
                    </div>
                    <div class="p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 flex flex-col items-center gap-3 cursor-pointer group transition-all opacity-40 grayscale">
                       <i class="pi pi-file-excel text-2xl text-slate-400"></i>
                       <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest">Laporan Excel</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex flex-col gap-3 relative z-20">
           <Button label="Generate Laporan Sekarang" icon="pi pi-check-circle"
             class="h-14 px-10 rounded-[1.25rem] bg-teal-800 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all text-teal-100" @click="dialogOpen = false" />
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-10 font-black text-[9px] uppercase tracking-widest text-slate-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();

const success = ref('');
const error = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(() => { refVar.value = null; }, 3000); };

const search = ref('');
const loading = ref(false);
const dialogOpen = ref(false);
const activeTab = ref('ALL');

const assets = ref<any[]>([]);
const depreciationLogs = ref<any[]>([]);

const totalDepreciation = computed(() => {
    return depreciationLogs.value.reduce((sum, item) => sum + Number(item.depreciationAmount), 0);
});

const categories = computed(() => {
    const cats = [...new Set(depreciationLogs.value.map(l => l.asset?.category))].filter(Boolean).sort();
    return ['ALL', ...cats];
});

const filteredLogs = computed(() => {
    let list = depreciationLogs.value;
    
    // Tab Filter
    if (activeTab.value !== 'ALL') {
        list = list.filter(item => item.asset?.category === activeTab.value);
    }

    // Search Filter
    if(search.value) {
       const q = search.value.toLowerCase();
       list = list.filter(x => 
          x.asset?.assetNo?.toLowerCase().includes(q) || 
          x.asset?.name?.toLowerCase().includes(q) ||
          x.notes?.toLowerCase().includes(q)
       );
    }

    return list;
});

const formatRupiah = (val: number | string) => {
   if(!val && val !== 0) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const fmtDate = (d: string) => {
    if(!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/finance/assets`);
    // Safe Axios response handling
    const payload: any = res.data || res;
    const asst = payload?.assets || [];
    
    assets.value = asst;
    
    // Flat map all depreciation entries exactly like original author intended
    // But sorted logically by periodDate descending
    depreciationLogs.value = assets.value.flatMap((a: any) => 
       (a.depreciationEntries || []).map((d: any) => ({ 
           ...d, 
           asset: { assetNo: a.assetNo, name: a.name, category: a.category } 
       }))
    ).sort((a: any, b: any) => new Date(b.periodDate).getTime() - new Date(a.periodDate).getTime());

  } catch (e) {
    console.warn('Failed loading depreciation history', e);
  } finally {
    loading.value = false;
  }
};

const reverseEntry = async (doc: any) => {
    if(!confirm(`Apakah Anda yakin ingin melakukan REVERSE ENTRY (Batal Jurnal) untuk penyusutan ${doc.asset?.assetNo} periode ${fmtDate(doc.periodDate)}?\n\nTindakan ini akan mengembalikan nilai buku aset.`)) return;
    
    try {
        await api.send('DELETE', `/finance/assets/depreciation/${doc.id}`);
        showMsg(success, `Penyusutan ${doc.asset?.assetNo} berhasil dibatalkan.`);
        load();
    } catch(e) {
        showMsg(error, 'Gagal melakukan pembatalan jurnal. Jurnal mungkin sudah terkunci.');
    }
}

onMounted(() => { load(); });
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