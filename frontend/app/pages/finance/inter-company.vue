<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-orange-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Inter-Company & Branch Transfers</div>
          <div class="mt-1 text-sm text-slate-600">
             Konsolidasi transaksi silang pendanaan, transfer barang, atau pembebanan anggaran antar cabang.
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Buat Mutasi Baru" size="small" bg="bg-orange-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-orange-700" icon="pi pi-directions-alt" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-2 rounded-lg">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Dokumen..." class="w-full md:w-64 text-xs font-mono" />
          <select v-model="filterStatus" class="p-2 border rounded-md text-xs bg-white text-slate-700 w-40 outline-none focus:border-orange-500">
            <option value="">Semua Status</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
          <Button label="Muat Data" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" />
        </div>
        <div class="hidden md:flex gap-3 text-xs font-bold text-slate-500">
           Total Mutasi: <span class="bg-orange-100 text-orange-800 px-2 py-0.5 rounded">{{ transactions.length }} Dokumen</span>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-orange-50 text-left text-[11px] text-orange-900 border-b border-orange-100 uppercase tracking-wider font-bold">
            <tr>
              <th class="px-4 py-3">No Transaksi (Mutasi)</th>
              <th class="px-3 py-3 border-l text-center">Tipe Transaksi</th>
              <th class="px-4 py-3 bg-slate-50 border-l">Rute (Asal -> Tujuan) & Deskripsi</th>
              <th class="px-4 py-3 text-right text-emerald-800 bg-emerald-50/50 border-l w-32">Nominal (IDR)</th>
              <th class="px-4 py-3 text-center border-l w-28">Status Mutasi</th>
              <th class="px-2 py-3 text-center border-l w-20">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="6" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-orange-500"></i> Memuat Buku Inter-Company...
              </td>
            </tr>
            <tr v-for="doc in filteredData" v-else :key="doc.id" class="transition hover:bg-orange-50/20 group">
              <!-- No Transaksi -->
              <td class="px-4 py-3 align-middle">
                 <div class="font-mono font-bold text-slate-800">{{ doc.transNo }}</div>
                 <div class="text-[10px] text-slate-400 mt-1 uppercase"><i class="pi pi-calendar text-[9px] mr-0.5"></i> {{ fmtDate(doc.transDate) }}</div>
                 <div class="text-[10px] text-slate-400 mt-0.5 max-w-[150px] truncate"><i class="pi pi-link text-[9px] mr-0.5"></i> {{ doc.referenceNo || 'N/A' }}</div>
              </td>

              <!-- Tipe -->
              <td class="px-3 py-3 align-middle text-center border-l">
                 <span class="text-[9px] bg-slate-800 text-white px-2 py-1 rounded shadow-inner uppercase tracking-wider">{{ doc.transactionType }}</span>
              </td>
              
               <!-- Detail Cabang & Deskripsi -->
              <td class="px-4 py-3 align-middle bg-slate-50/50 border-l">
                 <div class="flex items-center gap-2 mb-1.5 font-bold text-[11px]">
                     <span class="text-rose-700 bg-rose-50 px-1.5 py-0.5 border border-rose-100 rounded">Asal: {{ getBranchCode(doc.fromCompanyId) }}</span>
                     <i class="pi pi-arrow-right text-slate-400 text-[10px]"></i>
                     <span class="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-100 rounded">Tujuan: {{ getBranchCode(doc.toCompanyId) }}</span>
                 </div>
                 <div class="text-[11px] text-slate-600 line-clamp-2 max-w-sm">{{ doc.description || 'Tidak ada deskripsi rinci.' }}</div>
              </td>

              <!-- Amount -->
              <td class="px-4 py-3 align-middle text-right border-l font-mono tracking-tighter bg-emerald-50/10">
                 <div class="font-black text-[13px] text-emerald-800">{{ formatRupiah(doc.amount) }}</div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-slate-100 text-slate-600': doc.status === 'PENDING',
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
              <td colspan="6" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Data / dokumen mutasi inter-company tidak ditemukan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Form Dialog -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm shadow-xl">
      <div class="w-full max-w-2xl rounded-xl border bg-slate-50 shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up md:w-[650px]">
        
        <div class="p-6 border-b bg-orange-800 border-orange-950 relative overflow-hidden flex justify-between items-start shadow-sm rounded-t-xl">
          <div class="absolute -right-5 -top-10 opacity-10"><i class="pi pi-sort-alt text-[150px] text-white transform rotate-90"></i></div>
          <div class="z-10 w-full pr-8">
             <div class="text-xl font-black text-white tracking-tight flex items-center gap-3">Buat Mutasi Inter-Branch</div>
             <div class="text-xs font-semibold mt-1 text-orange-200/80">Dokumen mutasi akan otomatis tercatat sebagai PENDING dan butuh otorisasi (Post).</div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors z-20 shrink-0 shadow" @click="dialogOpen = false">✕</button>
        </div>

        <div class="px-6 py-5 bg-white flex-1 overflow-auto space-y-5">
           
           <!-- Grid 1 -->
           <div class="grid grid-cols-2 gap-4">
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Tipe Mutasi Keuangan</label>
                 <select v-model="form.transactionType" class="w-full border rounded px-3 py-2 text-sm font-bold text-slate-700 bg-slate-50 outline-none focus:border-orange-500 shadow-inner">
                    <option value="FUND_TRANSFER">Fund Transfer (Setoran/Tarik Tunai)</option>
                    <option value="INVENTORY_TRANSFER">Inventory Transfer (Persediaan)</option>
                    <option value="COST_ALLOCATION">Cost/Overhead Allocation (BOP)</option>
                    <option value="PROFIT_SHARE">Profit Margin Share (Laba)</option>
                 </select>
              </div>
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Nomor Referensi Internal (Titipan)</label>
                 <input type="text" v-model="form.referenceNo" class="w-full border rounded px-3 py-2 text-sm font-mono text-slate-800 bg-white outline-none focus:border-orange-500 shadow-inner" placeholder="Ex: R-BMT-202" />
              </div>
           </div>

           <!-- Grid Rute Cabang -->
           <div class="p-4 bg-orange-50/50 border border-orange-100 rounded-lg">
             <div class="text-[11px] font-bold text-orange-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                 <i class="pi pi-map-marker"></i> Rute Aliran Transaksi
             </div>
             <div class="grid grid-cols-2 gap-6 relative">
                 <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-1 rounded-full bg-orange-100 p-1 border text-orange-400 z-10 hidden md:block">
                    <i class="pi pi-arrow-right"></i>
                 </div>
                 <div>
                     <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Cabang Asal (Pengirim)</label>
                     <select v-model="form.fromCompanyId" class="w-full border rounded px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-orange-500">
                        <option value="" disabled>-- Cabang Asal --</option>
                        <option v-for="b in branches" :key="b.id" :value="b.id">[{{ b.code }}] {{ b.name }}</option>
                     </select>
                 </div>
                 <div>
                     <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Cabang Tujuan (Penerima)</label>
                     <select v-model="form.toCompanyId" class="w-full border rounded px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-orange-500">
                        <option value="" disabled>-- Cabang Tujuan --</option>
                        <option v-for="b in branches" :key="b.id" :value="b.id">[{{ b.code }}] {{ b.name }}</option>
                     </select>
                 </div>
             </div>
             <div v-if="form.fromCompanyId && form.fromCompanyId === form.toCompanyId" class="mt-2 text-[10px] font-bold text-red-500">
                <i class="pi pi-exclamation-triangle"></i> Peringatan: Cabang asal dan tujuan tidak boleh sama!
             </div>
           </div>

           <!-- Amount -->
           <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Nominal Rupiah (Nilai Mutasi)</label>
              <div class="relative">
                 <div class="absolute left-3 top-2.5 font-black text-slate-400">Rp</div>
                 <input type="number" v-model.number="form.amount" class="w-full border rounded pl-10 pr-3 py-2 text-xl font-black font-mono text-orange-700 bg-orange-50/20 outline-none focus:border-orange-500 shadow-inner" placeholder="0" />
              </div>
           </div>

           <!-- Notes -->
           <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Deskripsi Pencatatan Lengkap</label>
              <textarea v-model="form.description" rows="2" class="w-full border rounded px-3 py-2 text-sm text-slate-700 bg-white outline-none focus:border-orange-500 shadow-inner leading-relaxed" placeholder="Rincian transfer antar kantor..."></textarea>
           </div>
        </div>

        <div class="p-4 border-t bg-white flex justify-end items-center rounded-b-xl gap-3 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] z-20">
          <Button label="Batalkan" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 font-bold px-4 text-xs" />
          <Button label="Buat Jurnal Mutasi" severity="info" size="large" :loading="saving" :disabled="saving || !isValid" @click="save" class="bg-orange-600 border-none text-white font-bold tracking-wide hover:bg-orange-700 shadow-sm h-10 px-8 rounded-lg text-xs" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.interCompany.create') || true);

const transactions = ref<any[]>([]);
const branches = ref<any[]>([]);

const search = ref('');
const filterStatus = ref('');
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = reactive({
  transNo: '',
  transDate: '',
  fromCompanyId: '',
  toCompanyId: '',
  referenceNo: '',
  transactionType: 'FUND_TRANSFER',
  amount: 0,
  description: ''
});

const isValid = computed(() => {
   return form.fromCompanyId && form.toCompanyId && (form.fromCompanyId !== form.toCompanyId) && form.amount > 0;
});

const loadDeps = async () => {
    try {
        const res = await api.get('/core/branches');
        if(res.data?.branches) branches.value = res.data.branches;
    } catch(e) {
        console.warn(e);
    }
}

const load = async () => {
  loading.value = true;
  if(branches.value.length === 0) await loadDeps();

  try {
    const params = filterStatus.value ? `?status=${filterStatus.value}` : '';
    const res = await api.get(`/finance/inter-company${params}`);
    if (res.data?.transactions) {
        transactions.value = res.data.transactions;
    } else if (res.transactions) {
        // fallback robust implementation
        transactions.value = res.transactions;
    }
  } catch (e: any) {
     console.error('Failed fetching', e);
  } finally {
     loading.value = false;
  }
};

const filteredData = computed(() => {
  let list = transactions.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(x => 
       x.transNo?.toLowerCase().includes(q) || 
       x.referenceNo?.toLowerCase().includes(q) ||
       x.description?.toLowerCase().includes(q)
    );
  }
  return list;
});

const getBranchCode = (id: string) => {
    const b = branches.value.find(x => x.id === id);
    return b ? b.name : 'Unknown';
}

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

function openCreate() {
  const rnd = String(Math.floor(Math.random()*10000)).padStart(4,'0');
  Object.assign(form, {
      transNo: `BM-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${rnd}`,
      transDate: new Date().toISOString().slice(0, 10),
      fromCompanyId: '',
      toCompanyId: '',
      referenceNo: '',
      transactionType: 'FUND_TRANSFER',
      amount: 0,
      description: ''
  });
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
     await api.post('/finance/inter-company', form);
     dialogOpen.value = false;
     load();
  } catch(e) {
     alert('Gagal membuat transaksi inter-branch');
  } finally {
     saving.value = false;
  }
}

async function approve(doc: any) {
   if(!confirm(`Otorisasi mutasi ${doc.transNo} ini?`)) return;
   try {
     await api.post(`/finance/inter-company/${doc.id}/approve`);
     load();
   } catch(e) { alert('Approval gagal.'); }
}

async function reject(doc: any) {
   if(!confirm(`Tolak mutasi ${doc.transNo} ini?`)) return;
   try {
     await api.post(`/finance/inter-company/${doc.id}/reject`);
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