<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium Inter-Branch Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-orange-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-orange-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-orange-100">Konsolidasi Transaksi Silang</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Inter-Company & Branch Transfers</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Mutasi <span class="text-orange-600 italic font-medium">Antar-Unit</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Pengaturan aliran dana, alokasi biaya, dan distribusi stok secara konsolidasi antar kantor pusat dan cabang regional.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Menunggu Otorisasi</div>
           <div class="text-2xl font-black text-orange-700 tabular-nums tracking-tighter">{{ transactions.filter(x => x.status === 'PENDING').length }} Dokumen</div>
        </div>
        <Button v-if="canManage" label="+ BUAT MUTASI BARU" icon="pi pi-directions-alt" severity="warning" @click="openCreate"
          class="h-14 px-8 rounded-[1.25rem] bg-orange-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-orange-100 hover:scale-[1.05] active:scale-95 transition-all" />
      </div>
    </div>

    <!-- Main Mutation Matrix (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-orange-200/10 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-sort-alt text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Buku Mutasi Inter-Branch</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Cross-Entity Transaction Ledger</p>
           </div>
        </div>

        <div class="relative flex flex-wrap items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari No. Mutasi / Ref..." class="border-none bg-transparent text-[10px] h-9 w-40 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>

          <select v-model="filterStatus" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-orange-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Status</option>
            <option value="PENDING">Pending (Draft)</option>
            <option value="APPROVED">Aktif (Approved)</option>
            <option value="REJECTED">Ditolak (Rejected)</option>
          </select>

          <select v-model="filterType" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-orange-500 outline-none bg-white shadow-sm transition-all">
            <option value="">Semua Tipe</option>
            <option value="FUND_TRANSFER">Transfer Dana</option>
            <option value="INVENTORY_TRANSFER">Transfer Stok</option>
            <option value="COST_ALLOCATION">Alokasi Biaya</option>
          </select>

          <select v-model="filterToBranch" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-orange-500 outline-none bg-white shadow-sm transition-all">
            <option value="">Tujuan: Semua Cabang</option>
            <option v-for="b in branches" :key="b.id" :value="b.id">{{ b.name }}</option>
          </select>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-orange-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[220px]">Dokumen Mutasi</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 w-32 text-center">Tipe Aliran</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Logistik Rute (Asal -> Tujuan)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-slate-50/50">Nominal (IDR)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-36">Otorisasi</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-24 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-orange-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-orange-600">Mensinkronisasi buku mutasi antar-cabang...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredData" v-else :key="doc.id" class="transition-all hover:bg-orange-50/20 group border-l-4 border-l-transparent hover:border-l-orange-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-sort-alt text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-slate-800 tracking-tight group-hover:text-orange-700 transition-colors uppercase">
                         {{ doc.transNo }}
                      </div>
                      <div class="mt-1 flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                        <i class="pi pi-calendar-plus text-[8px]"></i> {{ fmtDate(doc.transDate) }}
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <span class="px-3 py-1 bg-slate-900 text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-sm">{{ doc.transactionType }}</span>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="flex items-center gap-4 mb-2">
                    <div class="flex flex-col">
                       <span class="text-[8px] font-black text-slate-400 uppercase mb-0.5">Asal</span>
                       <span class="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded text-[10px] font-black">{{ getBranchCode(doc.fromCompanyId) }}</span>
                    </div>
                    <i class="pi pi-arrow-right text-slate-300 text-[10px]"></i>
                    <div class="flex flex-col">
                       <span class="text-[8px] font-black text-slate-400 uppercase mb-0.5">Tujuan</span>
                       <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[10px] font-black">{{ getBranchCode(doc.toCompanyId) }}</span>
                    </div>
                 </div>
                 <div class="text-[9px] text-slate-400 font-medium line-clamp-1 italic tracking-tight uppercase leading-relaxed">{{ doc.description || 'Tidak ada uraian transaksi.' }}</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-slate-50/5 group-hover:bg-slate-100 transition-colors">
                 <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(doc.amount) }}</div>
                 <div class="text-[8px] font-black text-slate-400 font-mono mt-0.5 uppercase tracking-widest">Base Value Transfer</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <div :class="{
                    'bg-slate-50 text-slate-400 border-slate-200': doc.status === 'PENDING',
                    'bg-emerald-50 text-emerald-700 border-emerald-200': doc.status === 'APPROVED',
                    'bg-rose-50 text-rose-700 border-rose-200': doc.status === 'REJECTED'
                 }" class="px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest border inline-block uppercase shadow-sm">
                    {{ doc.status }}
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button v-if="doc.status === 'PENDING' && canManage" icon="pi pi-check" rounded text severity="success" class="h-10 w-10 hover:bg-emerald-50" @click="approve(doc)" />
                    <Button v-if="doc.status === 'PENDING' && canManage" icon="pi pi-times" rounded text severity="danger" class="h-10 w-10 hover:bg-rose-50" @click="reject(doc)" />
                    <i v-if="doc.status !== 'PENDING'" class="pi pi-lock text-slate-300"></i>
                 </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🌍</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Buku mutasi bersih. Tidak ada transaksi antar-cabang ditemukan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ MUTATION FORM DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-orange-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-orange-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-orange-200">
               <i class="pi pi-sort-alt text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Buat <span class="text-orange-600 italic text-2xl">Mutasi Baru</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-orange-500 italic">Inter-Branch Consolidation Protocol</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-orange-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 pb-32">
           <!-- Alert Logic -->
           <div v-if="form.amount > 1000000000" class="p-6 bg-amber-50 border border-amber-200 rounded-2xl flex gap-4 animate-fade-in-up">
              <i class="pi pi-exclamation-circle text-amber-600 text-xl mt-1"></i>
              <div>
                 <div class="text-[11px] font-black text-amber-800 uppercase tracking-widest">Otorisasi Level Tinggi Diperlukan</div>
                 <p class="text-[10px] font-bold text-amber-600 uppercase mt-1 leading-relaxed">Nominal mutasi melebihi 1 Miliar Rupiah. Harap sertakan adendum persetujuan direksi.</p>
              </div>
           </div>

           <div v-if="form.fromCompanyId && form.fromCompanyId === form.toCompanyId" class="p-6 bg-rose-50 border border-rose-200 rounded-2xl flex gap-4 animate-fade-in-up">
              <i class="pi pi-times-circle text-rose-600 text-xl mt-1"></i>
              <div>
                 <div class="text-[11px] font-black text-rose-800 uppercase tracking-widest">Kesalahan Rute Mutasi</div>
                 <p class="text-[10px] font-bold text-rose-600 uppercase mt-1 leading-relaxed">Cabang asal dan tujuan tidak diperbolehkan sama.</p>
              </div>
           </div>

           <!-- Form Section -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tipe Mutasi Inter-Branch</label>
                    <select v-model="form.transactionType" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-orange-500 focus:bg-white transition-all shadow-sm cursor-pointer">
                       <option value="FUND_TRANSFER">Fund Transfer (Setoran/Tarik)</option>
                       <option value="INVENTORY_TRANSFER">Inventory Transfer (Stok)</option>
                       <option value="COST_ALLOCATION">Cost/Overhead Allocation</option>
                       <option value="PROFIT_SHARE">Profit Margin Share</option>
                    </select>
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nomor Referensi Internal</label>
                    <input type="text" v-model="form.referenceNo" placeholder="Ex: R-BMT-202" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-orange-500 focus:bg-white transition-all font-mono shadow-sm" />
                 </div>
              </div>

              <!-- Route Management -->
              <div class="p-8 bg-slate-50/50 rounded-3xl border border-slate-100 mt-4">
                 <div class="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-6 flex items-center gap-2 italic">
                    <i class="pi pi-map-marker"></i> Pemetaan Rute Aliran Transaksi
                 </div>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
                    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-300 hidden md:flex border border-slate-100 animate-pulse">
                       <i class="pi pi-chevron-right"></i>
                    </div>
                    <div class="space-y-2">
                       <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Cabang Asal (Pengirim)</label>
                       <select v-model="form.fromCompanyId" class="w-full h-14 px-5 rounded-2xl bg-white border-2 border-slate-100 text-[11px] font-black text-slate-800 outline-none focus:border-orange-500 transition-all shadow-sm cursor-pointer uppercase">
                          <option value="" disabled>-- Cabang Asal --</option>
                          <option v-for="b in branches" :key="b.id" :value="b.id">[{{ b.code }}] {{ b.name }}</option>
                       </select>
                    </div>
                    <div class="space-y-2">
                       <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1 text-right block">Cabang Tujuan (Penerima)</label>
                       <select v-model="form.toCompanyId" class="w-full h-14 px-5 rounded-2xl bg-white border-2 border-slate-100 text-[11px] font-black text-slate-800 outline-none focus:border-orange-500 transition-all shadow-sm cursor-pointer uppercase">
                          <option value="" disabled>-- Cabang Tujuan --</option>
                          <option v-for="b in branches" :key="b.id" :value="b.id">[{{ b.code }}] {{ b.name }}</option>
                       </select>
                    </div>
                 </div>
              </div>

              <div class="space-y-2">
                 <label class="text-[10px] font-black text-orange-600 uppercase tracking-widest px-1 italic">Nominal Mutasi Operasional (IDR)</label>
                 <div class="relative">
                    <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">RP</span>
                    <input type="number" v-model.number="form.amount" placeholder="0" class="w-full h-24 pl-16 pr-6 rounded-[1.5rem] bg-orange-50/50 border-2 border-orange-100 text-4xl font-black text-orange-800 outline-none focus:border-orange-500 focus:bg-white transition-all shadow-xl font-mono tabular-nums" />
                 </div>
              </div>

              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Deskripsi Narasi Mutasi</label>
                 <textarea v-model="form.description" rows="4" placeholder="Ketik rincian alasan mutasi di sini..." class="w-full p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-orange-500 focus:bg-white transition-all shadow-sm leading-relaxed"></textarea>
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button label="Finalisasi Mutasi" icon="pi pi-check-circle" :loading="saving" :disabled="saving || !isValid" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-orange-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-95 transition-all" />
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

const canManage = computed(() => auth.hasPermission('finance.interCompany.create') || true);

const transactions = ref<any[]>([]);
const branches = ref<any[]>([]);

const search = ref('');
const filterStatus = ref('');
const filterType = ref('');
const filterToBranch = ref('');
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
  if (filterType.value) {
    list = list.filter(x => x.transactionType === filterType.value);
  }
  if (filterToBranch.value) {
    list = list.filter(x => x.toCompanyId === filterToBranch.value);
  }
  return list;
});

const getBranchCode = (id: string) => {
    const b = branches.value.find(x => x.id === id);
    return b ? b.name : 'Unknown';
}

const fmtDate = (d: string) => {
    if(!d) return '-';
    const date = new Date(d);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

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
  if (form.transactionType === 'FUND_TRANSFER') {
      showMsg(success, 'Memeriksa ketersediaan saldo di cabang asal...');
  }
  saving.value = true;
  try {
     await api.post('/finance/inter-company', form);
     showMsg(success, 'Transaksi Mutasi Inter-Branch berhasil dibuat!');
     dialogOpen.value = false;
     load();
  } catch(e) {
     showMsg(error, 'Gagal memproses mutasi. Pastikan rute dan nominal valid.');
  } finally {
     saving.value = false;
  }
}

async function approve(doc: any) {
   if(!confirm(`Otorisasi mutasi ${doc.transNo} ini? Transaksi akan langsung dibukukan ke Ledger Pusat.`)) return;
   try {
     await api.post(`/finance/inter-company/${doc.id}/approve`);
     showMsg(success, `Dokumen ${doc.transNo} telah di-Post ke sistem.`);
     load();
   } catch(e) { showMsg(error, 'Otorisasi gagal.'); }
}

async function reject(doc: any) {
   if(!confirm(`Tolak mutasi ${doc.transNo} ini?`)) return;
   try {
     await api.post(`/finance/inter-company/${doc.id}/reject`);
     showMsg(error, `Dokumen ${doc.transNo} telah dibatalkan.`);
     load();
   } catch(e) { showMsg(error, 'Reject gagal.'); }
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