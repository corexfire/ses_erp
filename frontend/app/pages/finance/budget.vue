<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-fuchsia-600 relative overflow-hidden">
      <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
        <i class="pi pi-briefcase text-[150px] text-fuchsia-900"></i>
      </div>
      
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <i class="pi pi-calculator text-fuchsia-600"></i> Corporate Budgeting (Anggaran F&B)
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
             Perencanaan pos pembelanjaan cabang (Cost Center) tahunan dan realisasi limit biaya (Variance Analysis).
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Rencana Anggaran" size="small" bg="bg-fuchsia-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-fuchsia-700" icon="pi pi-plus" @click="showDialog = true" />
        </div>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white border rounded-lg p-4 shadow-sm relative overflow-hidden">
           <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 relative z-10">Total Anggaran Sistem</div>
           <div class="text-xl font-black font-mono text-slate-800 relative z-10">{{ budgets.length }} Pos Induk</div>
        </div>
        <div class="bg-fuchsia-50 border border-fuchsia-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-fuchsia-700 uppercase tracking-widest mb-1">Total Pagu (Limit Cost)</div>
           <div class="text-xl font-black font-mono text-fuchsia-800">{{ formatRupiah(totalBudget) }}</div>
        </div>
        <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-indigo-700 uppercase tracking-widest mb-1">Realisasi (Terpakai)</div>
           <div class="text-xl font-black font-mono text-indigo-800 flex items-center gap-2">
               {{ formatRupiah(totalSpent) }}
           </div>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Total Tersisa (Variance)</div>
           <div class="text-xl font-black font-mono text-emerald-800">{{ formatRupiah(totalBudget - totalSpent) }}</div>
        </div>
    </div>

    <!-- Master Budget List -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-3 rounded-lg">
        <div class="flex items-center gap-3 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Kode Beban..." class="w-full md:w-64 text-sm font-mono border-slate-300" />
          <select v-model="filterYear" class="p-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 w-32 outline-none focus:border-fuchsia-500 font-semibold" @change="load">
            <option value="">Semua Tahun</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
          <Button label="Sinkron Realisasi" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" />
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-slate-100 text-left text-[11px] text-slate-600 border-b border-slate-200 uppercase tracking-widest font-bold">
            <tr>
              <th class="px-4 py-3 min-w-[150px]">Ref Anggaran (ID)</th>
              <th class="px-3 py-3 border-l text-center">Tahun (FY)</th>
              <th class="px-3 py-3 border-l text-center">COA Pembebanan</th>
              <th class="px-4 py-3 bg-fuchsia-50/50 border-l text-right w-36">Batas Pagu (Amount)</th>
              <th class="px-4 py-3 bg-indigo-50/50 border-l text-right w-36">Sudah Terpakai (Spent)</th>
              <th class="px-4 py-3 border-l text-center w-48">Analisis Sisa (Variance)</th>
              <th class="px-4 py-3 text-center border-l w-28">Status</th>
              <th class="px-3 py-3 text-center border-l w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="8" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-fuchsia-500"></i> Membaca tabel Pagu Pabrik...
              </td>
            </tr>
            <tr v-for="b in filteredBudgets" v-else :key="b.id" class="transition hover:bg-slate-50">
              <td class="px-4 py-3 align-middle">
                 <div class="font-black text-slate-800 font-mono">{{ b.budgetNo }}</div>
                 <div class="text-[10px] font-bold text-slate-500 mt-0.5 truncate max-w-[120px]" :title="b.costCenter?.name || 'Kantor Pusat'">
                    {{ b.costCenter?.name || '- Kantor Pusat -' }}
                 </div>
              </td>
              <td class="px-3 py-3 align-middle text-center border-l font-bold text-slate-600">{{ b.fiscalYear }}</td>
              
              <!-- Account -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <span class="bg-slate-100 border text-slate-600 px-1 py-0.5 rounded text-[10px] font-black tracking-widest inline-block">{{ b.accountCode }}</span>
              </td>
              
              <!-- Amount -->
              <td class="px-4 py-3 align-middle text-right bg-fuchsia-50/30 border-l font-mono font-bold text-fuchsia-800">{{ formatRupiah(b.amount) }}</td>

              <!-- Spent -->
              <td class="px-4 py-3 align-middle text-right bg-indigo-50/30 border-l font-mono font-bold text-indigo-700">{{ formatRupiah(b.spentAmount) }}</td>

              <!-- Variance Bar -->
              <td class="px-4 py-3 align-middle border-l">
                  <div class="flex flex-col gap-1 w-full relative">
                      <div class="flex justify-between text-[9px] font-bold">
                          <span :class="{'text-rose-600': isOverBudget(b), 'text-emerald-600': !isOverBudget(b)}">
                              Sisa: {{ formatRupiah(Number(b.amount) - Number(b.spentAmount)) }}
                          </span>
                          <span class="text-slate-500">{{ getPercentage(b) }}%</span>
                      </div>
                      <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div class="h-full rounded-full transition-all duration-500" 
                               :class="getBarColor(b)" :style="`width: ${Math.min(100, getPercentage(b))}%`"></div>
                      </div>
                  </div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-slate-100 text-slate-600 border-slate-200': b.status === 'DRAFT',
                    'bg-emerald-100 text-emerald-800 border-emerald-200': b.status === 'APPROVED'
                 }" class="px-2 py-0.5 rounded text-[9px] font-black tracking-widest border inline-block uppercase shadow-sm">
                    {{ b.status }}
                 </div>
              </td>
              
              <!-- Action -->
              <td class="px-3 py-3 text-center border-l">
                <Button v-if="b.status === 'DRAFT'" label="Setujui" size="small" bg="bg-emerald-600" class="text-white text-[10px] border-none px-2 py-1.5 w-full font-bold hover:bg-emerald-700 shadow-sm" icon="pi pi-check" @click="approve(b)" />
                <div v-else class="text-[10px] text-slate-400 font-bold"><i class="pi pi-lock"></i> Aktif</div>
              </td>
            </tr>
            <tr v-if="!loading && filteredBudgets.length === 0">
              <td colspan="8" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Belum ada perancangan anggaran F&B yang diseminasi pada tahun yang dipilih.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Budget Dialog -->
    <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-2xl border bg-white shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
             <div class="text-lg font-black text-slate-800">Proposal Anggaran (Budget Pagu)</div>
             <div class="text-xs text-slate-500 mt-1">Buat persetujuan limit biaya baru untuk Divisi atau Cabang tertentu.</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full font-bold transition-colors shadow-inner" @click="showDialog = false">✕</button>
        </div>

        <div class="p-6 overflow-auto flex-1 space-y-4 bg-white">
          
           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nomor Master Anggaran</label>
              <input v-model="form.budgetNo" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-fuchsia-500 shadow-inner" placeholder="BUD-2026-..." />
           </div>
           
           <div class="grid grid-cols-2 gap-4">
               <div class="space-y-1">
                  <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tahun Fiskal</label>
                  <input type="number" v-model.number="form.fiscalYear" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-fuchsia-500 shadow-inner bg-slate-50" min="2020" max="2100" />
               </div>
               <div class="space-y-1">
                  <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Akun COA Biaya</label>
                  <input type="number" v-model.number="form.accountCode" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-fuchsia-500 shadow-inner" placeholder="Misal: 6100" />
               </div>
           </div>

           <div class="space-y-1 border border-fuchsia-200 bg-fuchsia-50/50 p-4 rounded-xl shadow-inner mt-2">
              <label class="text-[11px] font-bold text-fuchsia-800 uppercase tracking-widest"><i class="pi pi-database"></i> Batas Maksimal (Limit Anggaran)</label>
              <div class="relative mt-2">
                 <div class="absolute left-3 top-3.5 font-black text-fuchsia-600">Rp</div>
                 <input type="number" v-model.number="form.amount" class="w-full border-2 border-fuchsia-300 rounded-lg pl-10 pr-3 py-3 text-lg font-black font-mono text-fuchsia-800 outline-none focus:border-fuchsia-500 shadow-inner bg-white" placeholder="0" />
              </div>
              <div class="text-[10px] text-fuchsia-700 mt-2 font-medium">Ini adalah wewenang maksimal yang boleh terpakai (spent) oleh akun ini.</div>
           </div>
           
           <div class="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex items-start gap-3 mt-4">
             <i class="pi pi-check-square text-blue-600 mt-0.5"></i>
             <div class="text-[11px] text-blue-800 font-medium">
                Setelah tersimpan, Anggaran akan berstatus <b>DRAFT</b> dan memerlukan tombol "Setujui" agar di kunci dalam laporan Realisasi Pabrik.
             </div>
          </div>

        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
           <Button label="Batal" severity="secondary" @click="showDialog = false" class="bg-white text-slate-700 font-bold px-6 shadow-sm border border-slate-300" />
           <Button label="Buat Pagu Anggaran" :loading="saving" @click="save" bg="bg-fuchsia-600" class="text-white font-bold px-6 border-none shadow-sm hover:bg-fuchsia-700" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.budget.create') || true);

const filterYear = ref(new Date().getFullYear().toString());
const search = ref('');
const loading = ref(false);

const budgets = ref<any[]>([]);

const showDialog = ref(false);
const saving = ref(false);

const form = reactive({ 
  budgetNo: '', 
  fiscalYear: new Date().getFullYear(),
  accountCode: '', 
  amount: 0,
});

const filteredBudgets = computed(() => {
   let list = budgets.value;
   if(search.value) {
      const q = search.value.toLowerCase();
      list = list.filter(x => 
         x.budgetNo?.toLowerCase().includes(q) || 
         x.accountCode?.toLowerCase().includes(q) ||
         x.costCenter?.name?.toLowerCase().includes(q)
      );
   }
   return list;
});

const getPercentage = (b: any) => {
    if(!b || Number(b.amount) <= 0) return 0;
    const pct = (Number(b.spentAmount) / Number(b.amount)) * 100;
    return Number(pct.toFixed(1));
};

const getBarColor = (b: any) => {
    const pct = getPercentage(b);
    if(pct >= 95) return 'bg-rose-600';
    if(pct >= 75) return 'bg-amber-500';
    return 'bg-emerald-500';
};

const isOverBudget = (b: any) => {
    return Number(b.amount) - Number(b.spentAmount) < 0;
}

const totalBudget = computed(() => {
   return budgets.value.reduce((sum, curr) => sum + Number(curr.amount), 0);
});
const totalSpent = computed(() => {
   return budgets.value.reduce((sum, curr) => sum + Number(curr.spentAmount), 0);
});

const formatRupiah = (val: number | string) => {
   if(!val && val !== 0) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const load = async () => {
  loading.value = true;
  try {
    const params = filterYear.value ? `?fiscalYear=${filterYear.value}` : '';
    const res = await api.get(`/finance/budget${params}`);
    
    if (res.data?.budgets) budgets.value = res.data.budgets;
    else if (res.budgets) budgets.value = res.budgets;

  } catch (e) {
    console.warn(e);
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  if(!form.budgetNo || !form.accountCode || form.amount <= 0) return alert('Mohon lengkapi seluruh form pendataan Anggaran secara valid.');
  saving.value = true;
  try {
    await api.post('/finance/budget', form);
    showDialog.value = false;
    Object.assign(form, { budgetNo: '', accountCode: '', amount: 0 });
    await load();
  } catch(e) {
     alert('Gagal merekam proposal anggaran masuk ke arsip ERP.');
  } finally { 
     saving.value = false; 
  }
};

const approve = async (b: any) => {
    if(!confirm(`Peringatan: Persetujuan untuk Pagu Anggaran ${b.budgetNo} senilai ${formatRupiah(b.amount)} akan didistribusikan ke cabang. Lanjutkan?`)) return;
    try {
        await api.post(`/finance/budget/${b.id}/approve`);
        await load();
    } catch(e) {
        alert('Gagal menyetujui Pagu Anggaran!');
    }
}

onMounted(() => { load(); });
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>