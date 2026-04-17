<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-amber-500">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Payment Request (Permohonan Dana Internal)</div>
          <div class="mt-1 text-xs text-slate-600">
             Sentralisasi dokumen pengajuan dana operasional karyawan, pembelian mendesak, pajak, dan BPJS pabrik.
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Ajukan Dana" size="small" bg="bg-amber-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-amber-700" icon="pi pi-send" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-2 rounded-lg">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari No. Request / Deskripsi..." class="w-full md:w-56 text-xs font-mono" />
          <select v-model="filterStatus" class="p-2 border rounded-md text-xs bg-white text-slate-700 w-40 outline-none focus:border-amber-500">
            <option value="">Semua Status</option>
            <option value="PENDING">PENDING (Tunggu Appv)</option>
            <option value="APPROVED">APPROVED (Selesai)</option>
            <option value="REJECTED">REJECTED (Ditolak)</option>
          </select>
          <Button label="Muat Data" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" />
        </div>
        <div class="hidden md:flex gap-3 text-xs font-bold text-slate-500">
           Total Permohonan: <span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-black">{{ requests.length }} Pengajuan</span>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-amber-50 text-left text-[11px] text-amber-900 border-b border-amber-100 uppercase tracking-wider font-bold">
            <tr>
              <th class="px-4 py-3 min-w-[130px]">No Pengajuan</th>
              <th class="px-3 py-3 border-l text-center">Tgl Request</th>
              <th class="px-4 py-3 bg-slate-50 border-l">Pemohon (Karyawan) & Deskripsi Keperluan</th>
              <th class="px-4 py-3 text-right text-emerald-800 bg-emerald-50/50 border-l w-32">Nominal (IDR)</th>
              <th class="px-4 py-3 text-center border-l w-24">Approval</th>
              <th class="px-2 py-3 text-center border-l w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="6" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-amber-500"></i> Memuat Laporan Permintaan Dana...
              </td>
            </tr>
            <tr v-for="req in filteredData" v-else :key="req.id" class="transition hover:bg-amber-50/20 group">
              
              <!-- Payment No & Reference -->
              <td class="px-4 py-3 align-middle">
                 <div class="font-mono font-black text-slate-800">{{ req.requestNo }}</div>
              </td>

              <!-- Date -->
              <td class="px-3 py-3 align-middle text-center border-l font-bold text-slate-600">
                 {{ fmtDate(req.requestDate) }}
              </td>
              
               <!-- Requester & Notes -->
              <td class="px-4 py-3 align-middle bg-slate-50/50 border-l">
                 <div class="font-black text-[11px] text-slate-800 mb-0.5 flex items-center gap-1">
                     <i class="pi pi-user text-[9px] text-slate-400"></i> {{ getRequesterName(req.requesterId) }}
                 </div>
                 <div class="text-[10px] text-slate-600 line-clamp-1 max-w-md">{{ req.description || '-' }}</div>
              </td>

              <!-- Amount -->
              <td class="px-4 py-3 align-middle text-right border-l font-mono tracking-tighter bg-emerald-50/10">
                 <div class="font-black text-[13px] text-emerald-800">{{ formatRupiah(req.amount) }}</div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-slate-100 text-slate-600 border-slate-200': req.approvalStatus === 'PENDING',
                    'bg-emerald-100 text-emerald-700 border-emerald-200': req.approvalStatus === 'APPROVED',
                    'bg-rose-100 text-rose-700 border-rose-200': req.approvalStatus === 'REJECTED'
                 }" class="px-2 py-1 rounded text-[10px] font-bold tracking-widest border inline-block uppercase shadow-sm">
                    {{ req.approvalStatus }}
                 </div>
              </td>

              <!-- Action -->
              <td class="px-2 py-3 text-center border-l">
                 <div class="flex gap-1 justify-center">
                    <Button v-if="req.approvalStatus === 'PENDING'" icon="pi pi-check" severity="success" size="small" outlined class="h-6 w-6" title="Approve" @click="approve(req)" />
                    <Button v-if="req.approvalStatus === 'PENDING'" icon="pi pi-times" severity="danger" size="small" outlined class="h-6 w-6" title="Reject" @click="reject(req)" />
                    <Button v-else icon="pi pi-lock" severity="secondary" text rounded disabled aria-label="Terkunci" class="h-6 w-6" />
                 </div>
              </td>
            </tr>
            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="6" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Buku register permohonan dana saat ini kosong.
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
        <div class="p-6 border-b bg-amber-800 border-amber-950 relative overflow-hidden flex justify-between items-start shadow-sm rounded-t-xl">
          <div class="absolute -right-5 -top-10 opacity-10"><i class="pi pi-send text-[150px] text-white"></i></div>
          <div class="z-10 w-full pr-8">
             <div class="text-xl font-black text-white tracking-tight flex items-center gap-3">Penerbitan Payment Request</div>
             <div class="text-xs font-semibold mt-1 text-amber-200/80">Dokumen pengajuan dana akan dikirim ke pimpinan/manager untuk otorisasi (Approval).</div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors z-20 shrink-0 shadow" @click="dialogOpen = false">✕</button>
        </div>

        <div class="px-6 py-5 bg-slate-50 flex-1 overflow-auto space-y-5">
           
           <!-- Grid User & Tanggal -->
           <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Pemohon Dana (Karyawan / Divisi)</label>
                 <select v-model="form.requesterId" class="w-full border rounded px-3 py-2 text-sm font-bold text-slate-800 bg-white outline-none focus:border-amber-500 shadow-inner">
                    <option value="" disabled>-- Pilih Pengguna Sistem --</option>
                    <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name || u.email }}</option>
                 </select>
              </div>
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Tanggal Pengajuan</label>
                 <input type="date" v-model="form.requestDate" class="w-full border rounded px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-amber-500 shadow-inner" />
              </div>
           </div>

           <!-- Amount -->
           <div>
              <label class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 block">Nominal Dana Yang Dibutuhkan</label>
              <div class="relative">
                 <div class="absolute left-3 top-2.5 font-black text-slate-400">Rp</div>
                 <input type="number" v-model.number="form.amount" class="w-full border rounded pl-10 pr-3 py-2 text-xl font-black font-mono text-emerald-700 bg-emerald-50/30 border-emerald-300 outline-none focus:border-emerald-500 shadow-inner" placeholder="0" />
              </div>
           </div>

           <!-- Description -->
           <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Rincian / Alasan Permohonan Dana Lengkap</label>
              <textarea v-model="form.description" rows="3" class="w-full border rounded px-3 py-2 text-sm text-slate-700 bg-white outline-none focus:border-amber-500 shadow-inner leading-relaxed" placeholder="Pembeliaan alat tulis pabrik, biaya perjalanan dinas, pembayaran BPJS..."></textarea>
           </div>
        </div>

        <div class="p-4 border-t bg-white flex justify-end items-center rounded-b-xl gap-3 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] z-20">
          <Button label="Batal" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 font-bold px-4 text-xs" />
          <Button label="Ajukan Keuangan (POST)" severity="info" size="large" :loading="saving" :disabled="saving || !isValid" @click="save" class="bg-amber-600 border-none text-white font-bold tracking-wide hover:bg-amber-700 shadow-sm h-10 px-8 rounded-lg text-xs" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

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
  amount: 0
});

const isValid = computed(() => {
   return form.requesterId && form.description && form.amount > 0;
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
    
    // Resolve wrapped data structure safely depending on axios interceptor
    const res = await api.get(`/finance/payment-request${params}`);
    
    // Extract payload
    if (res.data?.requests) requests.value = res.data.requests;
    else if (res.requests) requests.value = res.requests;
    
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
       x.description?.toLowerCase().includes(q)
    );
  }
  return list;
});

const getRequesterName = (id: string) => {
    const u = users.value.find(x => x.id === id);
    return u ? (u.name || u.email) : 'Unknown User';
}

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

function openCreate() {
  const rnd = String(Math.floor(Math.random()*10000)).padStart(4,'0');
  Object.assign(form, {
      requestNo: `PRQ-FNB-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${rnd}`,
      requestDate: new Date().toISOString().slice(0, 10),
      requesterId: users.value.length > 0 ? users.value[0].id : '',
      description: '',
      amount: 0
  });
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
     await api.post('/finance/payment-request', form);
     dialogOpen.value = false;
     load();
  } catch(e) {
     alert('Gagal membuat pengajuan dana.');
  } finally {
     saving.value = false;
  }
}

async function approve(doc: any) {
   if(!confirm(`Setujui permohonan dana ${doc.requestNo} senilai ${formatRupiah(doc.amount)}?`)) return;
   try {
     await api.post(`/finance/payment-request/${doc.id}/approve`);
     load();
   } catch(e) { alert('Approval gagal.'); }
}

async function reject(doc: any) {
   if(!confirm(`Tolak pengajuan dana ini?`)) return;
   try {
     await api.post(`/finance/payment-request/${doc.id}/reject`);
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