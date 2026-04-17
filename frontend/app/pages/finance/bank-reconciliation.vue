<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-teal-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Bank Reconciliation (Rekonsiliasi Bank)</div>
          <div class="mt-1 text-xs text-slate-600">
             Sentralisasi pencocokan saldo buku Kas/Bank sistem (ERP) terhadap laporan rekening koran fisik bank Anda.
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Catat Rekonsiliasi Baru" size="small" bg="bg-teal-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-teal-700" icon="pi pi-check-square" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-2 rounded-lg">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Bank / Tanggal..." class="w-full md:w-56 text-xs font-mono" />
          <select v-model="filterStatus" class="p-2 border rounded-md text-xs bg-white text-slate-700 w-40 outline-none focus:border-teal-500">
            <option value="">Semua Status</option>
            <option value="DRAFT">DRAFT (Belum Dicek)</option>
            <option value="APPROVED">APPROVED (Cocok)</option>
          </select>
          <Button label="Muat Data" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" />
        </div>
        <div class="hidden md:flex gap-3 text-xs font-bold text-slate-500">
           Total Catatan Rekonsiliasi: <span class="bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-black">{{ reconciliations.length }} Dokumen</span>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-teal-50 text-left text-[11px] text-teal-900 border-b border-teal-100 uppercase tracking-wider font-bold">
            <tr>
              <th class="px-4 py-3 min-w-[200px]">Rekening Bank (Fisik)</th>
              <th class="px-3 py-3 border-l text-center">Tgl Pencocokkan</th>
              <th class="px-4 py-3 bg-slate-50 border-l text-right w-36">Saldo Sistem (ERP)</th>
              <th class="px-4 py-3 bg-blue-50 border-l text-right w-36">Saldo Rek. Koran Bank</th>
              <th class="px-4 py-3 text-center bg-rose-50 border-l w-32">Selisih Mutasi (Diff)</th>
              <th class="px-4 py-3 text-center border-l w-24">Status</th>
              <th class="px-2 py-3 text-center border-l w-14">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="7" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-teal-500"></i> Memuat Laporan Rekonsiliasi Bank...
              </td>
            </tr>
            <tr v-for="rec in filteredData" v-else :key="rec.id" class="transition hover:bg-teal-50/20 group">
              
              <!-- Bank Account -->
              <td class="px-4 py-3 align-middle">
                 <div class="font-mono font-black text-slate-800">{{ getBankName(rec.bankAccountId) }}</div>
                 <div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono uppercase bg-slate-100 py-0.5 px-1.5 rounded inline-block">
                     <i class="pi pi-calendar text-[9px]"></i> Tgl Rekening Koran: <span class="text-teal-700 font-bold">{{ fmtDate(rec.statementDate) }}</span>
                 </div>
              </td>

              <!-- Date -->
              <td class="px-3 py-3 align-middle text-center border-l font-bold text-slate-600">
                 {{ fmtDate(rec.reconcileDate) }}
              </td>
              
               <!-- System Balance -->
              <td class="px-4 py-3 align-middle text-right bg-slate-50 border-l">
                 <div class="font-black text-[12px] text-slate-700">
                     {{ formatRupiah(rec.bookBalance) }}
                 </div>
              </td>

               <!-- Bank Balance -->
              <td class="px-4 py-3 align-middle text-right bg-blue-50/30 border-l">
                 <div class="font-black text-[12px] text-blue-800">
                     {{ formatRupiah(rec.statementBalance) }}
                 </div>
              </td>

              <!-- Difference -->
              <td class="px-4 py-3 align-middle text-center border-l tracking-tighter" :class="Number(rec.difference) === 0 ? 'bg-emerald-50/30' : 'bg-rose-50/50'">
                 <div v-if="Number(rec.difference) === 0" class="font-black text-[12px] text-emerald-600"><i class="pi pi-check-circle mr-1"></i> Balance (0)</div>
                 <div v-else class="font-black text-[13px] text-rose-700">{{ formatRupiah(rec.difference) }}</div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-slate-100 text-slate-600 border-slate-200': rec.status === 'DRAFT',
                    'bg-emerald-100 text-emerald-700 border-emerald-200': rec.status === 'APPROVED'
                 }" class="px-2 py-1 rounded text-[10px] font-bold tracking-widest border inline-block uppercase shadow-sm">
                    {{ rec.status }}
                 </div>
              </td>

              <!-- Action -->
              <td class="px-2 py-3 text-center border-l">
                 <Button v-if="rec.status === 'DRAFT'" icon="pi pi-check" severity="success" size="small" text class="h-7 w-7 text-emerald-500 hover:text-emerald-700" title="Validasi (Approve)" @click="approve(rec)" />
                 <Button icon="pi pi-trash" severity="danger" size="small" text class="h-7 w-7 text-rose-400 hover:text-rose-600" title="Hapus Dokumen" @click="delRecord(rec)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="7" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Laporan catatan rekonsiliasi saat ini kosong.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Form Dialog -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-2xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up md:w-[680px]">
        
        <!-- Header Dialog -->
        <div class="p-6 border-b bg-teal-900 border-teal-950 relative overflow-hidden flex justify-between items-start shadow-sm rounded-t-xl">
          <div class="absolute -right-5 -top-10 opacity-10"><i class="pi pi-chart-pie text-[150px] text-white"></i></div>
          <div class="z-10 w-full pr-8">
             <div class="text-xl font-black text-white tracking-tight flex items-center gap-3">Entri Rekonsiliasi Kas / Bank</div>
             <div class="text-xs font-semibold mt-1 text-teal-200/80">Masukkan mutasi akhir bulan (End of Month) atau laporan harian rekening koran Bank untuk dicocokkan dengan Buku Besar ERP.</div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors z-20 shrink-0 shadow" @click="dialogOpen = false">✕</button>
        </div>

        <div class="px-6 py-5 bg-slate-50 flex-1 overflow-auto space-y-5">
           
           <!-- Grid Bank & Tanggal -->
           <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Rekening Bank Fisik</label>
                 <select v-model="form.bankAccountId" class="w-full border rounded px-3 py-2 text-sm font-bold text-slate-800 bg-white outline-none focus:border-teal-500 shadow-inner" @change="onBankSelect">
                    <option value="" disabled>-- Pilih Akun Bank ERP --</option>
                    <option v-for="b in banks" :key="b.id" :value="b.id">[{{ b.accountNo }}] {{ b.name }}</option>
                 </select>
              </div>
              <div class="grid grid-cols-2 gap-2">
                 <div>
                     <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Tgl Rekonsiliasi</label>
                     <input type="date" v-model="form.reconcileDate" class="w-full border rounded px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-teal-500 shadow-inner" />
                 </div>
                 <div>
                     <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Tgl Rek. Koran</label>
                     <input type="date" v-model="form.statementDate" class="w-full border rounded px-2 py-2 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-teal-500" />
                 </div>
              </div>
           </div>

           <!-- Amount Comparisons -->
           <div class="grid grid-cols-2 gap-4">
               <div>
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Saldo Sistem (ERP Book Balance)</label>
                  <div class="relative">
                     <div class="absolute left-3 top-2.5 font-black text-slate-400">Rp</div>
                     <input type="number" v-model.number="form.bookBalance" class="w-full border rounded pl-10 pr-3 py-2 text-lg font-black font-mono text-slate-700 bg-slate-100 border-slate-300 outline-none cursor-not-allowed shadow-inner" readonly placeholder="0" />
                  </div>
                  <div class="text-[10px] text-slate-400 mt-1 italic">*Tercatat otomatis sesuai saldo ERP hari ini</div>
               </div>
               <div>
                  <label class="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1 block">Saldo Rekening Koran Bank</label>
                  <div class="relative">
                     <div class="absolute left-3 top-2.5 font-black text-slate-400">Rp</div>
                     <input type="number" v-model.number="form.statementBalance" class="w-full border rounded pl-10 pr-3 py-2 text-lg font-black font-mono text-blue-700 bg-blue-50 border-blue-300 outline-none focus:border-blue-500 shadow-inner" placeholder="0" />
                  </div>
               </div>
           </div>

           <!-- Variance Live Calc -->
           <div class="bg-white border rounded-lg p-4 flex justify-between items-center shadow-sm" :class="Number(variance) === 0 ? 'border-emerald-200' : 'border-rose-200'">
               <div class="text-xs font-bold uppercase tracking-widest text-slate-500">Selisih (Variance):</div>
               <div class="text-xl font-black font-mono" :class="Number(variance) === 0 ? 'text-emerald-500' : 'text-rose-600'">
                   {{ formatRupiah(variance) }}
               </div>
           </div>
        </div>

        <div class="p-4 border-t bg-white flex justify-end items-center rounded-b-xl gap-3 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] z-20">
          <Button label="Batal" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 font-bold px-4 text-xs" />
          <Button label="Buat Draft Rekonsiliasi (POST)" severity="info" size="large" :loading="saving" :disabled="saving || !isValid" @click="save" class="bg-teal-700 border-none text-white font-bold tracking-wide hover:bg-teal-800 shadow-sm h-10 px-8 rounded-lg text-xs" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.bankReconciliation.create') || true);

const reconciliations = ref<any[]>([]);
const banks = ref<any[]>([]);

const search = ref('');
const filterStatus = ref('');
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = reactive({
  bankAccountId: '',
  reconcileDate: '',
  statementDate: '',
  statementBalance: 0,
  bookBalance: 0
});

const variance = computed(() => {
    return form.statementBalance - form.bookBalance;
});

const isValid = computed(() => {
   return form.bankAccountId && form.reconcileDate && form.statementDate;
});

const loadDeps = async () => {
    try {
        const res = await api.get('/core/query?table=BankAccount');
        if(res.data?.data) banks.value = res.data.data;
        else if (res.data) banks.value = res.data;
    } catch(e) {
        console.warn('Gagal muat master Rekening', e);
    }
}

const load = async () => {
  loading.value = true;
  if(banks.value.length === 0) await loadDeps();

  try {
    const params = filterStatus.value ? `?status=${filterStatus.value}` : '';
    
    // Resolve wrapped data structure safely depending on axios interceptor
    const res = await api.get(`/finance/bank-reconciliation${params}`);
    
    // Extract payload
    if (res.data?.reconciliations) reconciliations.value = res.data.reconciliations;
    else if (res.reconciliations) reconciliations.value = res.reconciliations;
    
  } catch (e: any) {
     console.error('Failed fetching data', e);
  } finally {
     loading.value = false;
  }
};

const filteredData = computed(() => {
  let list = reconciliations.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(x => 
       x.bankAccount?.name?.toLowerCase().includes(q) || 
       x.bankAccount?.accountNo?.toLowerCase().includes(q)
    );
  }
  return list;
});

const getBankName = (id: string) => {
    const b = banks.value.find(x => x.id === id);
    return b ? `[${b.accountNo}] ${b.name}` : 'Unknown Bank';
}

const onBankSelect = () => {
    const sel = banks.value.find(b => b.id === form.bankAccountId);
    if(sel) {
        form.bookBalance = Number(sel.balance) || 0;
        form.statementBalance = Number(sel.balance) || 0;
    }
}

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

function openCreate() {
  Object.assign(form, {
      bankAccountId: '',
      reconcileDate: new Date().toISOString().slice(0, 10),
      statementDate: new Date().toISOString().slice(0, 10),
      statementBalance: 0,
      bookBalance: 0
  });
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
     await api.post('/finance/bank-reconciliation', form);
     dialogOpen.value = false;
     load();
  } catch(e) {
     alert('Gagal merekam rekonsiliasi kas bank.');
  } finally {
     saving.value = false;
  }
}

async function approve(doc: any) {
   if(!confirm(`Menyetujui pencocokan rekening koran ${fmtDate(doc.statementDate)}?`)) return;
   try {
     await api.post(`/finance/bank-reconciliation/${doc.id}/approve`);
     load();
   } catch(e) { alert('Approval gagal.'); }
}

async function delRecord(doc: any) {
   if(!confirm(`Menghapus histori rekonsiliasi buku besar ini?`)) return;
   try {
     await api.post(`/finance/bank-reconciliation/${doc.id}/delete`);
     load();
   } catch(e) { alert('Hapus gagal.'); }
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