<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-emerald-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Manajemen Alokasi Cost Center (Pusat Biaya)</div>
          <div class="mt-1 text-sm text-slate-600">
            Pendistribusian biaya overhead & operasional (BOP) pabrik ke masing-masing lini produksi dan departemen.
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Buat Alokasi Jurnal Baru" size="small" bg="bg-emerald-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-emerald-700" icon="pi pi-plus" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari No. Referensi / Deskripsi..." class="w-full md:w-64 text-xs" />
          <select v-model="filterPeriod" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-40 outline-none focus:border-emerald-500">
            <option value="">Semua Periode Fiskal</option>
            <option v-for="p in periods" :key="p.id" :value="p.id">Periode {{ p.periodNo }} / {{ p.fiscalYear?.year || new Date().getFullYear() }}</option>
          </select>
          <Button label="Filter Data" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-filter" />
        </div>
        <div class="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border">
           Total Terdistribusi: <span class="text-emerald-700">{{ formatRupiah(totalAllocated) }}</span>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-emerald-50/50 text-left text-[11px] text-emerald-900 border-b border-emerald-100 uppercase tracking-wider font-bold">
            <tr>
              <th class="px-4 py-3 w-48">No. Ref Jurnal (JV)</th>
              <th class="px-4 py-3 bg-slate-50 border-l">Pusat Biaya (Cost Center) & Deskripsi</th>
              <th class="px-4 py-3 text-center bg-slate-50 border-l w-32" title="Chart of Account">Kode Akun (COA)</th>
              <th class="px-4 py-3 text-right bg-emerald-50/50 border-l w-40">Nilai Alokasi (IDR)</th>
               <th class="px-4 py-3 text-center border-l w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="5" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-emerald-500"></i> Memuat buku besar pusat biaya...
              </td>
            </tr>
            <tr v-for="doc in filteredData" v-else :key="doc.id" class="transition hover:bg-emerald-50/20 group">
              
              <!-- Referensi -->
              <td class="px-4 py-3 align-middle">
                 <div class="font-mono font-bold text-slate-800 flex items-center gap-2 group-hover:text-emerald-700 transition">
                   <i class="pi pi-file-invoice text-slate-400"></i> {{ doc.referenceNo || 'UNREF' }}
                 </div>
                 <div class="text-[10px] text-slate-400 mt-1 uppercase">Period: <span class="font-bold text-slate-600">{{ getPeriodLabel(doc.periodId) }}</span></div>
              </td>
              
               <!-- Detail & Cost Center -->
              <td class="px-4 py-3 align-middle bg-slate-50/50 border-l">
                 <div class="flex items-center gap-2">
                     <span class="text-[9px] bg-slate-800 text-white inline-block px-1.5 py-0.5 rounded shadow-inner uppercase tracking-wider">{{ doc.costCenter?.code || 'CC-???' }}</span>
                     <span class="font-bold text-slate-700 text-[12px]">{{ doc.costCenter?.name || '- Tidak Diketahui -' }}</span>
                 </div>
                 <div class="text-[10px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed max-w-sm"><i class="pi pi-align-left text-[9px] mr-0.5 text-slate-400"></i> {{ doc.description || 'Tidak ada deskripsi distribusi biaya.' }}</div>
              </td>

              <!-- COA -->
              <td class="px-4 py-3 align-middle text-center border-l bg-slate-50">
                 <div class="font-mono font-bold text-indigo-700 tracking-wider bg-indigo-50 inline-flex px-2 py-1 rounded border border-indigo-100">{{ doc.accountCode }}</div>
              </td>

              <!-- Amount -->
              <td class="px-4 py-3 align-middle text-right border-l font-mono tracking-tighter bg-emerald-50/10">
                 <div class="font-black text-sm text-slate-800">{{ formatRupiah(doc.allocatedAmount) }}</div>
                 <div class="text-[8px] text-slate-400 font-bold mt-0.5 uppercase tracking-widest">Base Curr</div>
              </td>

              <!-- Action -->
              <td class="px-4 py-3 text-center border-l">
                 <Button icon="pi pi-search" severity="secondary" text rounded aria-label="Lihat" @click="viewAlloc(doc)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="5" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Belum ada transaksi alokasi pembebanan / distribusi jurnal yang terekam.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Allocation Form Dialog -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-2xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up md:w-[600px]">
        
        <div class="p-6 border-b bg-emerald-900 border-emerald-950 relative overflow-hidden flex justify-between items-start shadow-sm rounded-t-xl">
          <div class="absolute -left-5 -top-10 opacity-10"><i class="pi pi-calculator text-[150px] text-white"></i></div>
          <div class="z-10 w-full pr-8">
             <div class="text-xl font-black text-white tracking-tight flex items-center gap-3">
                 {{ isReadonly ? 'Rincian Jurnal Alokasi Biaya' : 'Buat Jurnal Distribusi Pembebanan' }}
             </div>
             <div class="text-xs font-semibold mt-1 text-emerald-200/80">
                 Proses pemindahan/alokasi saldo akun overhead sementara (misal: listrik, air, penyusutan) 
                 ke departemen pusat biaya (cost centers) terkait.
             </div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors z-20 shrink-0 shadow" @click="dialogOpen = false">✕</button>
        </div>

        <div class="px-6 py-5 bg-white flex-1 overflow-auto space-y-5">
           
           <!-- Grid 1 -->
           <div class="grid grid-cols-2 gap-4">
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Periode Pelaporan Lapkel</label>
                 <select :disabled="isReadonly" v-model="form.periodId" class="w-full border rounded px-3 py-2 text-sm font-bold text-slate-700 bg-slate-50/50 outline-none focus:border-emerald-500 shadow-inner cursor-pointer">
                    <option value="" disabled>-- Pilih Periode --</option>
                    <option v-for="p in periods" :key="p.id" :value="p.id">Periode {{ p.periodNo }} / {{ p.fiscalYear?.year || new Date().getFullYear() }}</option>
                 </select>
              </div>
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Departemen / Cost Center Terbebani</label>
                 <select :disabled="isReadonly" v-model="form.costCenterId" class="w-full border rounded px-3 py-2 text-sm font-bold text-slate-700 bg-slate-50/50 outline-none focus:border-emerald-500 shadow-inner cursor-pointer">
                    <option value="" disabled>-- Pilih Pusat Biaya --</option>
                    <option v-for="c in costCenters" :key="c.id" :value="c.id">[{{ c.code }}] {{ c.name }}</option>
                 </select>
              </div>
           </div>

           <!-- Grid 2 -->
           <div class="grid grid-cols-2 gap-4">
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Nomor Referensi (Bukti Memorial / JV)</label>
                 <input :disabled="isReadonly" type="text" v-model="form.referenceNo" class="w-full border rounded px-3 py-2 text-sm font-bold font-mono text-slate-800 bg-white outline-none focus:border-emerald-500 shadow-inner" placeholder="Contoh: JV-2026-088" />
              </div>
<div>
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Kode Chart of Account (Rekening)</label>
                  <select :disabled="isReadonly" v-model="form.accountCode" class="w-full border rounded px-3 py-2 text-sm font-bold font-mono text-indigo-700 bg-indigo-50/30 border-indigo-200 outline-none focus:border-indigo-500 shadow-inner cursor-pointer">
                     <option value="" disabled>-- Pilih Akun COA --</option>
                     <option v-for="c in coaAccounts" :key="c.id" :value="c.code">{{ c.code }} - {{ c.name }}</option>
                  </select>
               </div>
           </div>

           <!-- Amount -->
           <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Total Nilai Alokasi Terdistribusi (Rp)</label>
              <div class="relative">
                 <div class="absolute left-3 top-2.5 font-black text-slate-400">Rp</div>
                 <input :disabled="isReadonly" type="number" v-model.number="form.allocatedAmount" class="w-full border rounded pl-10 pr-3 py-2 text-xl font-black font-mono text-emerald-800 bg-emerald-50/30 border-emerald-200 outline-none focus:border-emerald-500 shadow-inner" placeholder="0" />
              </div>
           </div>

           <!-- Notes -->
           <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Rincian Narasi / Deskripsi Analisa</label>
              <textarea :disabled="isReadonly" v-model="form.description" rows="3" class="w-full border rounded px-3 py-2 text-sm text-slate-700 bg-white outline-none focus:border-emerald-500 shadow-inner leading-relaxed" placeholder="Rincian lengkap perhitungan BOP dan rasio yang digunakan..."></textarea>
           </div>
        </div>

        <div class="p-4 border-t bg-white flex justify-end items-center rounded-b-xl gap-3 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] z-20">
          <Button label="Tutup Dialog" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold px-4" />
          <Button v-if="!isReadonly && canManage" label="Post Jurnal Distribusi" severity="info" size="large" :loading="saving" :disabled="saving || !form.costCenterId || !form.periodId || form.allocatedAmount <= 0" @click="save" class="bg-emerald-600 border-none text-white font-bold tracking-wide hover:bg-emerald-700 shadow-sm h-10 px-8 rounded-lg" icon="pi pi-check" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.cost-center.manage') || true);

const data = ref<any[]>([]);
const periods = ref<any[]>([]);
const costCenters = ref<any[]>([]);
const coaAccounts = ref<any[]>([]);

const search = ref('');
const filterPeriod = ref('');
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
     alert('Alokasi Biaya berhasil didistribusikan ke jurnal pusat!');
     dialogOpen.value = false;
     load();
  } catch(e) {
     alert('Gagal memproses alokasi. Harap perhatikan input form.');
  } finally {
     saving.value = false;
  }
}

onMounted(() => {
  load();
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>