<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium Audit Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-teal-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-teal-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-teal-100">Audit & Assurance Core</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Bank Reconciliation Center</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Rekonsiliasi <span class="text-teal-600 italic font-medium">Bank & Kas</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Verifikasi presisi antara Saldo Buku (ERP) dengan Laporan Rekening Koran fisik untuk menjamin integritas pelaporan keuangan per periode.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Dokumen Tervalidasi</div>
           <div class="text-2xl font-black text-teal-700 tabular-nums tracking-tighter">{{ reconciliations.filter(x => x.status === 'APPROVED').length }} Records</div>
        </div>
        <Button v-if="canManage" label="+ REKONSILIASI BARU" icon="pi pi-check-square" severity="success" @click="openCreate"
          class="h-14 px-8 rounded-[1.25rem] bg-teal-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-teal-100 hover:scale-[1.05] active:scale-95 transition-all" />
      </div>
    </div>

    <!-- Main Audit Matrix (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-teal-200/10 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-chart-pie text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Log Rekonsiliasi Perbankan</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">System-to-Statement Audit Matrix</p>
           </div>
        </div>

        <div class="relative flex items-center gap-4">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Rekening / Bank..." class="border-none bg-transparent text-[10px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>

          <select v-model="filterStatus" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-teal-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Status</option>
            <option value="DRAFT">Draft (Belum Cocok)</option>
            <option value="APPROVED">Selesai (Balance)</option>
          </select>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-teal-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[280px]">Identitas Rekening Bank</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-36">Tgl Pencocokkan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-slate-50/50 w-44">Saldo Buku (ERP)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-blue-50/20 w-44">Saldo Rek. Koran</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Selisih (Variance)</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-24 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-teal-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-teal-600">Mensinkronisasi data rekonsiliasi kas...</div>
              </td>
            </tr>
            
            <tr v-for="rec in filteredData" v-else :key="rec.id" class="transition-all hover:bg-teal-50/20 group border-l-4 border-l-transparent hover:border-l-teal-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-building text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-slate-800 tracking-tight group-hover:text-teal-700 transition-colors uppercase">
                         {{ getBankName(rec.bankAccountId) }}
                      </div>
                      <div class="mt-1 flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                        <i class="pi pi-file text-[8px]"></i> Koran: <span class="text-teal-600">#{{ fmtDate(rec.statementDate) }}</span>
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-slate-500 uppercase tracking-tighter text-[10px]">
                 {{ fmtDate(rec.reconcileDate) }}
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-slate-50/30 group-hover:bg-slate-100 transition-colors">
                 <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(rec.bookBalance) }}</div>
                 <div class="text-[8px] font-black text-slate-400 font-mono mt-0.5 uppercase tracking-widest">ERP Base Value</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-blue-50/10 group-hover:bg-blue-50/30 transition-colors">
                 <div class="font-black text-blue-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(rec.statementBalance) }}</div>
                 <div class="text-[8px] font-black text-blue-300 font-mono mt-0.5 uppercase tracking-widest">Bank Final Statement</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 relative overflow-hidden" :class="Number(rec.difference) === 0 ? 'bg-emerald-50/20' : 'bg-rose-50/20'">
                 <div v-if="Number(rec.difference) === 0" class="flex flex-col items-center">
                    <span class="inline-flex rounded-full px-4 py-1.5 text-[8px] font-black tracking-[0.2em] bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase shadow-sm">Verified</span>
                    <div class="text-[8px] font-black text-emerald-400 uppercase mt-1 italic leading-none">Balanced</div>
                 </div>
                 <div v-else class="flex flex-col items-center">
                    <span class="font-black text-rose-700 text-xs tabular-nums tracking-widest">{{ formatRupiah(rec.difference) }}</span>
                    <div class="text-[8px] font-black text-rose-300 uppercase mt-0.5 italic leading-none">Un-synchronized</div>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button v-if="rec.status === 'DRAFT' && canManage" icon="pi pi-check" rounded text severity="success" class="h-10 w-10 hover:bg-emerald-50" @click="approve(rec)" />
                    <Button v-if="canManage" icon="pi pi-trash" rounded text severity="danger" class="h-10 w-10 hover:bg-rose-50" @click="delRecord(rec)" />
                    <i v-if="rec.status === 'APPROVED'" class="pi pi-lock text-slate-300"></i>
                 </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">⚓</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Buku audit bersih. Tidak ada mutasi pencocokan bank ditemukan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ RECONCILIATION FORM DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-teal-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-teal-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-teal-200">
               <i class="pi pi-chart-pie text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Entri <span class="text-teal-600 italic text-2xl">Rekonsiliasi</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-teal-500 italic">Audit Validation & Assurance Protocol</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-teal-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 pb-32">
           <!-- Form Section -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pilih Rekening Bank (Sistem ERP)</label>
                 <select v-model="form.bankAccountId" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition-all shadow-sm cursor-pointer uppercase tracking-tight" @change="onBankSelect">
                    <option value="" disabled>-- Pilih Rekening Master --</option>
                    <option v-for="b in banks" :key="b.id" :value="b.id">[{{ b.accountNo }}] {{ b.name }}</option>
                 </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Audit (Rekon)</label>
                    <input type="date" v-model="form.reconcileDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition-all font-mono shadow-sm" />
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Rekening Koran</label>
                    <input type="date" v-model="form.statementDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition-all font-mono shadow-sm" />
                 </div>
              </div>

              <!-- Comparison Block -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                 <div class="p-6 bg-slate-900 text-white rounded-3xl shadow-xl relative overflow-hidden group">
                    <div class="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform"><i class="pi pi-database text-8xl"></i></div>
                    <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Saldo Buku ERP (Current)</label>
                    <div class="flex items-center gap-2">
                       <span class="text-[10px] font-black opacity-30 italic">IDR</span>
                       <input type="number" v-model.number="form.bookBalance" readonly class="bg-transparent border-none text-xl font-black text-white focus:ring-0 outline-none w-full tabular-nums" />
                    </div>
                    <p class="text-[8px] font-bold text-slate-500 mt-2 uppercase italic tracking-widest leading-none">*Locked based on system ledger</p>
                 </div>

                 <div class="p-6 bg-teal-600 text-white rounded-3xl shadow-xl relative overflow-hidden group">
                    <div class="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform"><i class="pi pi-building text-8xl"></i></div>
                    <label class="text-[9px] font-black text-teal-200 uppercase tracking-widest mb-4 block">Saldo Rekening Koran Bank</label>
                    <div class="flex items-center gap-2">
                       <span class="text-[10px] font-black opacity-40 italic">IDR</span>
                       <input type="number" v-model.number="form.statementBalance" class="bg-transparent border-none text-xl font-black text-white focus:ring-0 outline-none w-full tabular-nums" />
                    </div>
                    <p class="text-[8px] font-black text-teal-800 mt-2 uppercase italic tracking-widest leading-none">*Input physically based on statement</p>
                 </div>
              </div>

              <!-- Variance Analysis -->
              <div class="p-8 rounded-[2rem] border-4 border-dashed flex justify-between items-center transition-all bg-white" :class="Number(variance) === 0 ? 'border-emerald-100 bg-emerald-50/10' : 'border-rose-100 bg-rose-50/10'">
                 <div>
                    <div class="text-[10px] font-black uppercase tracking-[0.2em]" :class="Number(variance) === 0 ? 'text-emerald-700' : 'text-rose-700'">Analisis Selisih (Difference)</div>
                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Real-time Synchronization Check</p>
                 </div>
                 <div class="text-3xl font-black font-mono tracking-tighter" :class="Number(variance) === 0 ? 'text-emerald-600' : 'text-rose-700'">
                    {{ formatRupiah(variance) }}
                 </div>
              </div>

              <!-- Attachment Support Placeholder -->
              <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-teal-200 transition-all cursor-pointer">
                 <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-colors shadow-sm"><i class="pi pi-paperclip text-lg"></i></div>
                    <div>
                        <div class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Lampirkan Rekening Koran</div>
                        <div class="text-[8px] font-black text-slate-400 uppercase mt-0.5 italic">Format PDF/CSV/XLSX (Maks. 5MB)</div>
                    </div>
                 </div>
                 <Button label="Pilih File" text severity="secondary" size="small" class="text-[9px] font-bold uppercase tracking-widest border px-4 h-9 rounded-xl group-hover:bg-white" />
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button label="Realisasi & Post Draf" icon="pi pi-check-circle" :loading="saving" :disabled="saving || !isValid" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-teal-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all" />
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
    const res = await api.get(`/finance/bank-reconciliation${params}`);
    
    const payload: any = res.data || res;
    reconciliations.value = payload?.reconciliations || [];
    
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
       x.bankAccount?.accountNo?.toLowerCase().includes(q) ||
       getBankName(x.bankAccountId).toLowerCase().includes(q)
    );
  }
  return list;
});

const getBankName = (id: string) => {
    const b = banks.value.find(x => x.id === id);
    return b ? `[${b.accountNo}] ${b.name}` : 'Unknown Bank Account';
}

const onBankSelect = () => {
    const sel = banks.value.find(b => b.id === form.bankAccountId);
    if(sel) {
        form.bookBalance = Number(sel.balance) || 0;
        form.statementBalance = Number(sel.balance) || 0;
    }
}

const fmtDate = (d: string) => {
    if(!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatRupiah = (val: number | string) => {
   if(!val && val !== 0) return 'Rp 0';
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
     showMsg(success, 'Data rekonsiliasi berhasil disimpan sebagai draf audit.');
     dialogOpen.value = false;
     load();
  } catch(e) {
     showMsg(error, 'Gagal menyimpan catatan rekonsiliasi. Periksa koneksi atau data mandatori.');
  } finally {
     saving.value = false;
  }
}

async function approve(doc: any) {
   if(!confirm(`Menyetujui validasi pencocokan rekening koran ${fmtDate(doc.statementDate)}? Dokumen akan dikunci.`)) return;
   try {
     await api.post(`/finance/bank-reconciliation/${doc.id}/approve`);
     showMsg(success, `Rekonsiliasi #${doc.id} telah disetujui dan diaudit.`);
     load();
   } catch(e) { showMsg(error, 'Otorisasi gagal.'); }
}

async function delRecord(doc: any) {
   if(!confirm(`Menghapus histori rekonsiliasi Bank ini secara permanen?`)) return;
   try {
     await api.post(`/finance/bank-reconciliation/${doc.id}/delete`);
     showMsg(error, 'Dokumen rekonsiliasi telah dihapus dari sistem.');
     load();
   } catch(e) { showMsg(error, 'Gagal menghapus catatan audit.'); }
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