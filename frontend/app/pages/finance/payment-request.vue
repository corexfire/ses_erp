<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium Request Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-amber-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-amber-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-amber-100">Operational Inbound Request</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Payment Request Center</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Permohonan <span class="text-amber-600 italic font-medium">Dana Internal</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Manajemen pengajuan dana operasional karyawan, pembelian darurat, pajak, dan biaya BPJS untuk kelancaran administrasi pabrik.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Permohonan Menunggu (Pending)</div>
           <div class="text-2xl font-black text-amber-700 tabular-nums tracking-tighter">{{ requests.filter(x => x.approvalStatus === 'PENDING').length }} Dokumen</div>
        </div>
        <Button v-if="canManage" label="+ AJUKAN DANA" icon="pi pi-send" severity="warning" @click="openCreate"
          class="h-14 px-8 rounded-[1.25rem] bg-amber-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-amber-100 hover:scale-[1.05] active:scale-95 transition-all text-amber-100" />
      </div>
    </div>

    <!-- Main Request Matrix (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-envelope text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Log Bukti Pengajuan Dana</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Internal Payment Request Ledger</p>
           </div>
        </div>

        <div class="relative flex flex-wrap items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari No. Request / Pemohon..." class="border-none bg-transparent text-[10px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>

          <select v-model="filterStatus" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-amber-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Status</option>
            <option value="PENDING">Pending (Draft)</option>
            <option value="APPROVED">Disetujui (Approved)</option>
            <option value="REJECTED">Ditolak (Rejected)</option>
          </select>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-amber-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[200px]">No Pengajuan (PRQ)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-32">Tgl Pengajuan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Unit Pemohon & Deskripsi Keperluan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-slate-50/50 w-44">Nominal (IDR)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-32">Otorisasi</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-24 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-amber-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-amber-600">Sinkronisasi register pengajuan dana...</div>
              </td>
            </tr>
            
            <tr v-for="req in filteredData" v-else :key="req.id" class="transition-all hover:bg-amber-50/20 group border-l-4 border-l-transparent hover:border-l-amber-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-envelope text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-slate-800 tracking-tight group-hover:text-amber-700 transition-colors uppercase">
                         {{ req.requestNo }}
                      </div>
                      <!-- Urgency Badge -->
                      <div v-if="req.isUrgent" class="mt-1 inline-flex items-center px-1.5 py-0.5 bg-rose-50 text-rose-600 border border-rose-100 rounded text-[7px] font-black uppercase tracking-widest">
                         <i class="pi pi-bolt mr-1 text-[6px]"></i> Urgent Priority
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-slate-500 uppercase tracking-tighter text-[10px]">
                 {{ fmtDate(req.requestDate) }}
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="flex items-center gap-2 mb-1">
                    <i class="pi pi-user text-[10px] text-slate-300"></i>
                    <div class="font-black text-[11px] text-slate-900 group-hover:text-amber-700 transition-colors">{{ getRequesterName(req.requesterId) }}</div>
                 </div>
                 <div class="text-[9px] text-slate-500 font-medium line-clamp-1 italic tracking-tight uppercase leading-relaxed opacity-70">{{ req.description || 'Tidak ada uraian pengajuan.' }}</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-slate-50/5 group-hover:bg-slate-100 transition-colors">
                 <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(req.amount) }}</div>
                 <div class="text-[8px] font-black text-slate-400 font-mono mt-0.5 uppercase tracking-widest">Base Amount Request</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <div :class="{
                    'bg-slate-50 text-slate-400 border-slate-200': req.approvalStatus === 'PENDING',
                    'bg-emerald-50 text-emerald-700 border-emerald-200': req.approvalStatus === 'APPROVED',
                    'bg-rose-50 text-rose-700 border-rose-200': req.approvalStatus === 'REJECTED'
                 }" class="px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest border inline-block uppercase shadow-sm">
                    {{ req.approvalStatus }}
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button v-if="req.approvalStatus === 'PENDING' && canManage" icon="pi pi-check" rounded text severity="success" class="h-10 w-10 hover:bg-emerald-50" @click="approve(req)" />
                    <Button v-if="req.approvalStatus === 'PENDING' && canManage" icon="pi pi-times" rounded text severity="danger" class="h-10 w-10 hover:bg-rose-50" @click="reject(req)" />
                    <i v-else class="pi pi-lock text-slate-300"></i>
                 </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">📄</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Buku pengajuan bersih. Tidak ada permohonan dana dalam antrean.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ REQUEST FORM DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-amber-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-amber-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-amber-200">
               <i class="pi pi-send text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Ajukan <span class="text-amber-600 italic text-2xl">Dana Baru</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-amber-500 italic">Internal Fund Management Workspace</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-amber-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 pb-32">
           <!-- Budget Status & Caution -->
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-6 bg-amber-50 border border-amber-100 rounded-[2rem] flex items-start gap-4">
                 <i class="pi pi-exclamation-circle text-amber-500 text-xl mt-1"></i>
                 <div>
                    <h4 class="text-[11px] font-black text-amber-800 uppercase tracking-widest">Verifikasi Otorisasi</h4>
                    <p class="text-[10px] font-bold text-amber-500 uppercase mt-1 leading-relaxed opacity-80">Permohonan dana akan memerlukan tanda tangan manager divisi sebelum pencairan dilakukan oleh kasir utama.</p>
                 </div>
              </div>
              <div class="p-6 bg-slate-900 text-white rounded-[2rem] flex flex-col justify-center relative overflow-hidden group">
                 <div class="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform"><i class="pi pi-chart-line text-6xl"></i></div>
                 <h4 class="text-[8px] font-black text-amber-500 uppercase tracking-widest leading-none mb-1">Status Saldo Anggaran</h4>
                 <div class="text-xl font-black tabular-nums tracking-tighter">{{ formatRupiah(85000000) }}</div>
                 <p class="text-[7px] font-bold text-slate-400 uppercase mt-1">Sisa Budget Divisi (FY 2026)</p>
              </div>
           </div>

           <!-- Form Section -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8 text-slate-900">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Unit Pemohon (Employee/Staff)</label>
                    <select v-model="form.requesterId" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-amber-500 focus:bg-white transition-all shadow-sm cursor-pointer uppercase">
                       <option value="" disabled>-- Pilih Pengguna Sistem --</option>
                       <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name || u.email }}</option>
                    </select>
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Pengajuan Resmi</label>
                    <input type="date" v-model="form.requestDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-amber-500 focus:bg-white transition-all font-mono shadow-sm" />
                 </div>
              </div>

              <!-- Urgency Toggle -->
              <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group">
                 <div class="flex items-center gap-4">
                    <div :class="form.isUrgent ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-white text-slate-400 shadow-sm'" 
                      class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl"><i class="pi pi-bolt text-lg"></i></div>
                    <div>
                        <div class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Tandai Sebagai Urgent (Prioritas)</div>
                        <div class="text-[8px] font-black text-slate-400 uppercase mt-0.5 italic">Gunakan hanya untuk kebutuhan mendesak pimpinan</div>
                    </div>
                 </div>
                 <div @click="form.isUrgent = !form.isUrgent" :class="form.isUrgent ? 'bg-amber-600' : 'bg-slate-200'" class="w-16 h-8 rounded-full relative cursor-pointer transition-colors p-1">
                    <div :class="form.isUrgent ? 'translate-x-8' : 'translate-x-0'" class="w-6 h-6 bg-white rounded-full transition-transform shadow-md"></div>
                 </div>
              </div>

              <div class="space-y-4">
                 <label class="text-[10px] font-black text-amber-600 uppercase tracking-widest px-1 italic text-center block">Nominal Dana Yang Diajukan (IDR)</label>
                 <div class="relative">
                    <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">RP</span>
                    <input type="number" v-model.number="form.amount" placeholder="0" class="w-full h-24 pl-16 pr-6 rounded-[1.5rem] bg-amber-50/50 border-2 border-amber-100 text-4xl font-black text-amber-800 outline-none focus:border-amber-500 focus:bg-white transition-all shadow-xl font-mono tabular-nums" />
                 </div>
              </div>

              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Narasi Detail Keperluan Dana</label>
                 <textarea v-model="form.description" rows="4" placeholder="Ketik rincian alasan permohonan dana secara mendalam di sini..." class="w-full p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-amber-500 focus:bg-white transition-all shadow-sm leading-relaxed"></textarea>
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button label="Submit Pengajuan" icon="pi pi-check-circle" :loading="saving" :disabled="saving || !isValid" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-amber-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-amber-100 hover:scale-[1.02] active:scale-95 transition-all text-amber-100" />
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

const canManage = computed(() => auth.hasPermission('finance.paymentRequest.create') || true);

const requests = ref<any[]>([]);
const users = ref<any[]>([]);

const search = ref('');
const filterStatus = ref('');
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = reactive({
  requestNo: '',
  requestDate: '',
  requesterId: '',
  description: '',
  amount: 0,
  isUrgent: false
});

const isValid = computed(() => {
   return form.requesterId && form.description && form.amount > 0 && form.description.length > 5;
});

const loadDeps = async () => {
    try {
        const res = await api.get('/core/query?table=User');
        if(res.data?.data) users.value = res.data.data;
        else if (res.data) users.value = res.data;
    } catch(e) {
        console.warn('Gagal muat data karyawan (user)', e);
    }
}

const load = async () => {
  loading.value = true;
  if(users.value.length === 0) await loadDeps();

  try {
    const params = filterStatus.value ? `?status=${filterStatus.value}` : '';
    const res = await api.get(`/finance/payment-request${params}`);
    
    // Safety check for TS error reported earlier
    const payload: any = res.data || res;
    requests.value = payload?.requests || [];
    
  } catch (e: any) {
     console.error('Failed fetching data', e);
  } finally {
     loading.value = false;
  }
};

const filteredData = computed(() => {
  let list = requests.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(x => 
       x.requestNo?.toLowerCase().includes(q) || 
       x.description?.toLowerCase().includes(q) ||
       getRequesterName(x.requesterId).toLowerCase().includes(q)
    );
  }
  return list;
});

const getRequesterName = (id: string) => {
    const u = users.value.find(x => x.id === id);
    return u ? (u.name || u.email) : 'Unknown User';
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
  const rnd = String(Math.floor(Math.random()*10000)).padStart(4,'0');
  Object.assign(form, {
      requestNo: `PRQ-FNB-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${rnd}`,
      requestDate: new Date().toISOString().slice(0, 10),
      requesterId: users.value.length > 0 ? users.value[0].id : '',
      description: '',
      amount: 0,
      isUrgent: false
  });
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
     await api.post('/finance/payment-request', form);
     showMsg(success, 'Permohonan dana internal berhasil dikirim ke pimpinan untuk otorisasi.');
     dialogOpen.value = false;
     load();
  } catch(e) {
     showMsg(error, 'Gagal memproses pengajuan. Periksa koneksi atau data mandatori.');
  } finally {
     saving.value = false;
  }
}

async function approve(doc: any) {
   if(!confirm(`Setujui permohonan dana ${doc.requestNo} senilai ${formatRupiah(doc.amount)}?`)) return;
   try {
     await api.post(`/finance/payment-request/${doc.id}/approve`);
     showMsg(success, `Dokumen ${doc.requestNo} telah disetujui (Approved).`);
     load();
   } catch(e) { showMsg(error, 'Otorisasi gagal.'); }
}

async function reject(doc: any) {
   if(!confirm(`Tolak pengajuan dana ${doc.requestNo} ini?`)) return;
   try {
     await api.post(`/finance/payment-request/${doc.id}/reject`);
     showMsg(error, 'Permohonan dana telah ditolak (Rejected).');
     load();
   } catch(e) { showMsg(error, 'Gagal mereject dokumen.'); }
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