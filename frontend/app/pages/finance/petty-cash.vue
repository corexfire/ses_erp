<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-teal-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Petty Cash Replenishment (Pengisian Kas Kecil)</div>
          <div class="mt-1 text-xs text-slate-600">
             Modul khusus pencatatan penggantian (reimburse) dan top-up saldo kas operasional harian / pabrik.
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Klaim Kas Baru" size="small" bg="bg-teal-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-teal-700" icon="pi pi-wallet" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-2 rounded-lg">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Dokumen / Bon..." class="w-full md:w-56 text-xs font-mono" />
          <select v-model="filterStatus" class="p-2 border rounded-md text-xs bg-white text-slate-700 w-40 outline-none focus:border-teal-500">
            <option value="">Semua Status</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
          <Button label="Muat Data" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" />
        </div>
        <div class="hidden md:flex gap-3 text-xs font-bold text-slate-500">
           Total Permohonan: <span class="bg-teal-100 text-teal-800 px-2 py-0.5 rounded">{{ replenishments.length }} Dokumen</span>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-teal-50 text-left text-[11px] text-teal-900 border-b border-teal-100 uppercase tracking-wider font-bold">
            <tr>
              <th class="px-4 py-3">No Dokumen / Referensi Fisik</th>
              <th class="px-3 py-3 border-l text-center">Tanggal (Req Date)</th>
              <th class="px-4 py-3 bg-slate-50 border-l">Keterangan / Deskripsi Klaim (Notes)</th>
              <th class="px-4 py-3 border-l text-center">Kas Asal</th>
              <th class="px-4 py-3 text-right bg-emerald-50 border-l w-32">Nominal Klaim (IDR)</th>
              <th class="px-4 py-3 text-center border-l w-28">Status</th>
              <th class="px-2 py-3 text-center border-l w-20">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="7" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-teal-500"></i> Memuat Buku Kas Kecil...
              </td>
            </tr>
            <tr v-for="doc in filteredData" v-else :key="doc.id" class="transition hover:bg-teal-50/20 group">
              <!-- No Request -->
              <td class="px-4 py-3 align-middle">
                 <div class="font-mono font-black text-slate-800">{{ doc.requestNo }}</div>
                 <div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono uppercase bg-slate-100 py-0.5 px-1.5 rounded inline-block">
                     <i class="pi pi-receipt text-[9px]"></i> Bon: {{ doc.referenceNo || 'TIDAK ADA' }}
                 </div>
              </td>

              <!-- Date -->
              <td class="px-3 py-3 align-middle text-center border-l font-bold text-slate-600">
                 {{ fmtDate(doc.requestDate) }}
              </td>
              
               <!-- Notes -->
              <td class="px-4 py-3 align-middle bg-slate-50/50 border-l">
                 <div class="text-[11px] font-medium text-slate-700 line-clamp-2 max-w-sm">{{ doc.notes || 'Tidak ada uraian pengeluaran kas.' }}</div>
              </td>

              <td class="px-4 py-3 align-middle text-center border-l">
                 <div class="text-[10px] bg-sky-50 text-sky-800 px-2 py-1 border border-sky-100 rounded shadow-sm inline-block font-black truncate max-w-[120px]">
                     {{ doc.cashAccount?.code || doc.cashAccount?.accountNo || 'Unknown' }}
                 </div>
              </td>

              <!-- Amount -->
              <td class="px-4 py-3 align-middle text-right border-l font-mono tracking-tighter bg-emerald-50/10">
                 <div class="font-black text-[13px] text-emerald-800">{{ formatRupiah(doc.amount) }}</div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-slate-100 text-slate-600 border-slate-200': doc.status === 'PENDING',
                    'bg-emerald-100 text-emerald-700 border-emerald-200': doc.status === 'APPROVED',
                    'bg-rose-100 text-rose-700 border-rose-200': doc.status === 'REJECTED'
                 }" class="px-2 py-1 rounded text-[10px] font-bold tracking-widest border inline-block uppercase shadow-sm">
                    {{ doc.status }}
                 </div>
              </td>

              <!-- Action -->
              <td class="px-2 py-3 text-center border-l">
                 <Button v-if="doc.status === 'PENDING'" icon="pi pi-check" severity="success" size="small" outlined class="h-6 w-6 mr-1" title="Approve" @click="approve(doc)" />
                 <Button v-if="doc.status === 'PENDING'" icon="pi pi-times" severity="danger" size="small" outlined class="h-6 w-6" title="Reject" @click="reject(doc)" />
                 <Button v-else icon="pi pi-lock" severity="secondary" text rounded disabled aria-label="Terkunci" class="h-6 w-6" />
              </td>
            </tr>
            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="7" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Buku pengeluaran kas kecil saat ini kosong.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Form Dialog -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-2xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up md:w-[650px]">
        
        <div class="p-6 border-b bg-teal-800 border-teal-950 relative overflow-hidden flex justify-between items-start shadow-sm rounded-t-xl">
          <div class="absolute -right-5 -top-10 opacity-10"><i class="pi pi-wallet text-[150px] text-white"></i></div>
          <div class="z-10 w-full pr-8">
             <div class="text-xl font-black text-white tracking-tight flex items-center gap-3">Klaim Pengisian Kas Kecil</div>
             <div class="text-xs font-semibold mt-1 text-teal-200/80">Dokumen reimburse (replenishment) akan menunggu approval Manager.</div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors z-20 shrink-0 shadow" @click="dialogOpen = false">✕</button>
        </div>

        <div class="px-6 py-5 bg-white flex-1 overflow-auto space-y-5">
           
           <!-- Grid 1 -->
           <div class="grid grid-cols-2 gap-4">
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Kas Induk Terkait</label>
                 <select v-model="form.cashAccountId" class="w-full border rounded px-3 py-2 text-sm font-bold text-slate-700 bg-slate-50 outline-none focus:border-teal-500 shadow-inner">
                    <option value="" disabled>-- Pilih Rekening Kas --</option>
                    <option v-for="c in cashAccounts" :key="c.id" :value="c.id">{{ c.name }} ({{ c.accountNo }})</option>
                 </select>
              </div>
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Ref. Nomor Bukti / Bon Asli</label>
                 <input type="text" v-model="form.referenceNo" class="w-full border rounded px-3 py-2 text-sm font-mono text-slate-800 bg-white outline-none focus:border-teal-500 shadow-inner" placeholder="Ex: BON-V/12/2026" />
              </div>
           </div>

           <!-- Tanggal & Uraian -->
           <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Deskripsi Pemakaian / Tujuan Klaim</label>
              <textarea v-model="form.notes" rows="2" class="w-full border rounded px-3 py-2 text-sm text-slate-700 bg-white outline-none focus:border-teal-500 shadow-inner leading-relaxed" placeholder="Rincian pembelian kopi, bensin kanvaser, biaya tol, dll..."></textarea>
           </div>

           <!-- Amount -->
           <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Nominal Rupiah (Total Reimburse)</label>
              <div class="relative">
                 <div class="absolute left-3 top-2.5 font-black text-slate-400">Rp</div>
                 <input type="number" v-model.number="form.amount" class="w-full border rounded pl-10 pr-3 py-2 text-xl font-black font-mono text-teal-700 bg-teal-50/20 outline-none focus:border-teal-500 shadow-inner" placeholder="0" />
              </div>
           </div>
        </div>

        <div class="p-4 border-t bg-white flex justify-end items-center rounded-b-xl gap-3 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] z-20">
          <Button label="Batal" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 font-bold px-4 text-xs" />
          <Button label="Ajukan Request Kas" severity="info" size="large" :loading="saving" :disabled="saving || !isValid" @click="save" class="bg-teal-600 border-none text-white font-bold tracking-wide hover:bg-teal-700 shadow-sm h-10 px-8 rounded-lg text-xs" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.pettyCash.create') || true);

const replenishments = ref<any[]>([]);
const cashAccounts = ref<any[]>([]);

const search = ref('');
const filterStatus = ref('');
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = reactive({
  cashAccountId: '',
  requestNo: '',
  requestDate: '',
  referenceNo: '',
  notes: '',
  amount: 0
});

const isValid = computed(() => {
   return form.cashAccountId && form.amount > 0 && form.notes.length > 0;
});

const load = async () => {
  loading.value = true;
  try {
    const params = filterStatus.value ? `?status=${filterStatus.value}` : '';
    
    // Resolve wrapped data structure safely depending on axios interceptor
    const [r, c] = await Promise.all([
      api.get(`/finance/petty-cash${params}`),
      api.get('/finance/cash'),
    ]);
    
    // Extract replenishment payload
    if (r.data?.replenishment) replenishments.value = r.data.replenishment;
    else if (r.replenishment) replenishments.value = r.replenishment;

    // Extract cash accounts
    if (c.data?.accounts) cashAccounts.value = c.data.accounts;
    else if (c.accounts) cashAccounts.value = c.accounts;
    
  } catch (e: any) {
     console.error('Failed fetching data', e);
  } finally {
     loading.value = false;
  }
};

const filteredData = computed(() => {
  let list = replenishments.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(x => 
       x.requestNo?.toLowerCase().includes(q) || 
       x.referenceNo?.toLowerCase().includes(q) ||
       x.notes?.toLowerCase().includes(q)
    );
  }
  return list;
});

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

function openCreate() {
  const rnd = String(Math.floor(Math.random()*10000)).padStart(4,'0');
  Object.assign(form, {
      cashAccountId: cashAccounts.value.length === 1 ? cashAccounts.value[0].id : '',
      requestNo: `REQ-PC-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${rnd}`,
      requestDate: new Date().toISOString().slice(0, 10),
      referenceNo: '',
      notes: '',
      amount: 0
  });
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
     await api.post('/finance/petty-cash', form);
     dialogOpen.value = false;
     load();
  } catch(e) {
     alert('Gagal membuat request petty cash.');
  } finally {
     saving.value = false;
  }
}

async function approve(doc: any) {
   if(!confirm(`Setujui reimburse kas kecil ${doc.requestNo}? Dana akan mutasi langsung dari Master Cash.`)) return;
   try {
     await api.post(`/finance/petty-cash/${doc.id}/approve`);
     load();
   } catch(e) { alert('Sistem gagal mencairkan dana. Cek saldo master bank.'); }
}

async function reject(doc: any) {
   if(!confirm(`Tolak permohonan klaim ${doc.requestNo} ini?`)) return;
   try {
     await api.post(`/finance/petty-cash/${doc.id}/reject`);
     load();
   } catch(e) { alert('Reject gagal.'); }
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