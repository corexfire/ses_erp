<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium Cash Engine) ══════════════════════════════════ -->
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
           <span class="px-3 py-1 bg-teal-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-teal-100">Treasury & Liquidity</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Petty Cash Control</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Pengisian <span class="text-teal-600 italic font-medium">Kas Kecil</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Manajemen permohonan dana operasional harian (Reimbursement) untuk kelancaran aktivitas lapangan dan kantor cabang.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Permohonan Pending</div>
           <div class="text-2xl font-black text-teal-700 tabular-nums tracking-tighter">{{ replenishments.filter(x => x.status === 'PENDING').length }} Dokumen</div>
        </div>
        <Button v-if="canManage" label="+ KLAIM KAS BARU" icon="pi pi-wallet" severity="success" @click="openCreate"
          class="h-14 px-8 rounded-[1.25rem] bg-teal-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-teal-100 hover:scale-[1.05] active:scale-95 transition-all" />
      </div>
    </div>

    <!-- Main Petty Cash Matrix (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-teal-200/10 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-receipt text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Buku Log Reimbursement Kas</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Operational Fund Replenishment Matrix</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Dokumen / Bon..." class="border-none bg-transparent text-[10px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>

          <select v-model="filterStatus" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-teal-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Status</option>
            <option value="PENDING">Pending (Draft)</option>
            <option value="APPROVED">Disetujui (Paid)</option>
            <option value="REJECTED">Ditolak (Reject)</option>
          </select>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-teal-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[220px]">Dokumen & Ref Nota</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-32">Tgl Pengajuan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Keterangan Pengeluaran (Notes)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-36">Sumber Kas</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-slate-50/50 w-44">Nominal Klaim (IDR)</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-24 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-teal-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-teal-600">Mensinkronisasi buku pengeluaran kas...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredData" v-else :key="doc.id" class="transition-all hover:bg-teal-50/20 group border-l-4 border-l-transparent hover:border-l-teal-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-wallet text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-slate-800 tracking-tight group-hover:text-teal-700 transition-colors uppercase">
                         {{ doc.requestNo }}
                      </div>
                      <div class="mt-1 flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                        <i class="pi pi-ticket text-[8px]"></i> Nota: <span class="text-teal-600">{{ doc.referenceNo || 'TIDAK ADA' }}</span>
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-slate-500 uppercase tracking-tighter text-[10px]">
                 {{ fmtDate(doc.requestDate) }}
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="text-[11px] text-slate-600 font-medium line-clamp-2 italic tracking-tight uppercase leading-relaxed">{{ doc.notes || 'Tidak ada uraian pengeluaran.' }}</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <span class="inline-flex rounded-lg px-3 py-1 bg-sky-50 text-sky-700 border border-sky-100 text-[10px] font-black uppercase tracking-widest shadow-sm">
                    {{ doc.cashAccount?.code || doc.cashAccount?.accountNo || 'N/A' }}
                 </span>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-slate-50/5 group-hover:bg-slate-100 transition-colors">
                 <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(doc.amount) }}</div>
                 <div class="text-[8px] font-black text-slate-400 font-mono mt-0.5 uppercase tracking-widest">Replenishment Sum</div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button v-if="doc.status === 'PENDING' && canManage" icon="pi pi-check" rounded text severity="success" class="h-10 w-10 hover:bg-emerald-50" @click="approve(doc)" />
                    <Button v-if="doc.status === 'PENDING' && canManage" icon="pi pi-times" rounded text severity="danger" class="h-10 w-10 hover:bg-rose-50" @click="reject(doc)" />
                    <div v-else :class="doc.status === 'APPROVED' ? 'text-emerald-500' : 'text-rose-500'" class="px-2 py-1 rounded text-[8px] font-black border uppercase tracking-widest">
                       {{ doc.status }}
                    </div>
                 </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">💸</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Buku pengeluaran harian kosong. Tidak ada tagihan reimburse ditemukan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ REIMBURSEMENT FORM DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-teal-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-teal-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-teal-200">
               <i class="pi pi-wallet text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Klaim <span class="text-teal-600 italic text-2xl">Kas Kecil</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-teal-500 italic">Operational Fund Reimbursement Workspace</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-teal-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 pb-32">
           <!-- Form Section -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8 text-slate-900">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Sumber Kas Induk (Origin)</label>
                    <select v-model="form.cashAccountId" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition-all shadow-sm cursor-pointer uppercase tracking-tight">
                       <option value="" disabled>-- Pilih Rekening Kas --</option>
                       <option v-for="c in cashAccounts" :key="c.id" :value="c.id">{{ c.name }} ({{ c.accountNo }})</option>
                    </select>
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Ref. Nomor Bukti / Bon Fisik</label>
                    <input type="text" v-model="form.referenceNo" placeholder="Ex: BON-V/12/2026" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition-all font-mono shadow-sm" />
                 </div>
              </div>

              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Uraian Detail Pengeluaran</label>
                 <textarea v-model="form.notes" rows="3" placeholder="Rincian pembelian kopi, bensin kanvaser, biaya tol, dll..." class="w-full p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-teal-500 focus:bg-white transition-all shadow-sm leading-relaxed"></textarea>
              </div>

              <!-- High Value Warning -->
              <div v-if="form.amount > 5000000" class="p-6 bg-rose-50 border border-rose-100 rounded-[2rem] flex items-start gap-4 animate-fade-in-up">
                 <i class="pi pi-exclamation-triangle text-rose-500 text-xl mt-1"></i>
                 <div>
                    <h4 class="text-[11px] font-black text-rose-800 uppercase tracking-widest">Peringatan: Nominal Klaim Tinggi</h4>
                    <p class="text-[10px] font-bold text-rose-500 uppercase mt-1 leading-relaxed opacity-80">Total pengajuan melebihi ambang batas 5 Juta IDR. Verifikasi berlapis akan dilakukan oleh Departemen Keuangan.</p>
                 </div>
              </div>

              <div class="space-y-4">
                 <label class="text-[10px] font-black text-teal-600 uppercase tracking-widest px-1 italic text-center block">Total Nominal Reimbursement (IDR)</label>
                 <div class="relative">
                    <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 tracking-tighter">RP</span>
                    <input type="number" v-model.number="form.amount" placeholder="0" class="w-full h-24 pl-16 pr-6 rounded-[1.5rem] bg-teal-50/50 border-2 border-teal-100 text-4xl font-black text-teal-800 outline-none focus:border-teal-500 focus:bg-white transition-all shadow-xl font-mono tabular-nums" />
                 </div>
              </div>

              <!-- Attachment Support -->
              <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-teal-200 transition-all cursor-pointer">
                 <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-colors shadow-sm"><i class="pi pi-camera text-lg"></i></div>
                    <div>
                        <div class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Unggah Bukti Nota / Struk Fisik</div>
                        <div class="text-[8px] font-black text-slate-400 uppercase mt-0.5 italic">Format Image/PDF (Maks. 2MB)</div>
                    </div>
                 </div>
                 <Button label="Ambil Foto" text severity="secondary" size="small" class="text-[9px] font-bold uppercase tracking-widest border px-4 h-9 rounded-xl group-hover:bg-white" />
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button label="Ajukan Klaim Sekarang" icon="pi pi-check-circle" :loading="saving" :disabled="saving || !isValid" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-teal-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all text-emerald-100" />
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
   return form.cashAccountId && form.amount > 0 && form.notes.length > 5;
});

const load = async () => {
  loading.value = true;
  try {
    const params = filterStatus.value ? `?status=${filterStatus.value}` : '';
    
    const [r, c] = await Promise.all([
      api.get(`/finance/petty-cash${params}`),
      api.get('/finance/cash'),
    ]);
    
    const rBody: any = r.data || r;
    replenishments.value = rBody?.replenishment || [];

    const cBody: any = c.data || c;
    cashAccounts.value = cBody?.accounts || [];
    
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

const fmtDate = (d: string) => {
    if(!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatRupiah = (val: number | string) => {
   if(!val && val !== 0) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

function openCreate() {
  const rnd = String(Math.floor(Math.random()*10000)).padStart(4,'0');
  Object.assign(form, {
      cashAccountId: cashAccounts.value.length >= 1 ? cashAccounts.value[0].id : '',
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
     showMsg(success, 'Permohonan klaim kas kecil berhasil diajukan untuk disetujui.');
     dialogOpen.value = false;
     load();
  } catch(e) {
     showMsg(error, 'Gagal memproses klaim. Periksa koneksi atau data mandatori.');
  } finally {
     saving.value = false;
  }
}

async function approve(doc: any) {
   if(!confirm(`Setujui reimburse kas kecil ${doc.requestNo}? Dana akan mutasi langsung dari Master Cash.`)) return;
   try {
     await api.post(`/finance/petty-cash/${doc.id}/approve`);
     showMsg(success, 'Dana berhasil dicairkan ke kas kecil unit/operasional.');
     load();
   } catch(e) { showMsg(error, 'Pencairan gagal. Periksa saldo master bank atau otorisasi.'); }
}

async function reject(doc: any) {
   if(!confirm(`Tolak permohonan klaim ${doc.requestNo} ini?`)) return;
   try {
     await api.post(`/finance/petty-cash/${doc.id}/reject`);
     showMsg(error, 'Permohonan klaim telah ditolak.');
     load();
   } catch(e) { showMsg(error, 'Gagal menolak dokumen.'); }
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