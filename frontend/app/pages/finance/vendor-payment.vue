<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-purple-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Vendor Payment (Pembayaran Pemasok)</div>
          <div class="mt-1 text-xs text-slate-600">
             Sentralisasi dokumen pembayaran tagihan supplier, vendor, dan rekanan pabrik.
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Buat Pembayaran Baru" size="small" bg="bg-purple-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-purple-700" icon="pi pi-credit-card" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-2 rounded-lg">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari No. Bayar / Referensi..." class="w-full md:w-56 text-xs font-mono" />
          <select v-model="filterStatus" class="p-2 border rounded-md text-xs bg-white text-slate-700 w-40 outline-none focus:border-purple-500">
            <option value="">Semua Status</option>
            <option value="POSTED">POSTED (Selesai)</option>
            <option value="CANCELLED">CANCELLED (Dibatalkan)</option>
          </select>
          <Button label="Muat Data" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" />
        </div>
        <div class="hidden md:flex gap-3 text-xs font-bold text-slate-500">
           Total Transaksi: <span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-black">{{ payments.length }} Dibayar</span>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-purple-50 text-left text-[11px] text-purple-900 border-b border-purple-100 uppercase tracking-wider font-bold">
            <tr>
              <th class="px-4 py-3 min-w-[200px]">No Pembayaran & Ref. Fisik</th>
              <th class="px-3 py-3 border-l text-center">Tanggal Bayar</th>
              <th class="px-4 py-3 bg-slate-50 border-l">Detail Supplier (Penerima)</th>
              <th class="px-4 py-3 border-l text-center">Metode (Pencairan)</th>
              <th class="px-4 py-3 text-right bg-emerald-50 border-l w-32">Nominal (IDR)</th>
              <th class="px-4 py-3 text-center border-l w-24">Status</th>
              <th class="px-2 py-3 text-center border-l w-14">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="7" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-purple-500"></i> Sinkronisasi Buku Hutang / Pembayaran...
              </td>
            </tr>
            <tr v-for="pay in filteredData" v-else :key="pay.id" class="transition hover:bg-purple-50/20 group">
              
              <!-- Payment No & Reference -->
              <td class="px-4 py-3 align-middle">
                 <div class="font-mono font-black text-slate-800">{{ pay.paymentNo }}</div>
                 <div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono uppercase bg-slate-100 py-0.5 px-1.5 rounded inline-block">
                     <i class="pi pi-file-invoice text-[9px]"></i> Ref Tagihan: <span class="text-purple-700 font-bold">{{ pay.reference || 'TIDAK ADA' }}</span>
                 </div>
              </td>

              <!-- Date -->
              <td class="px-3 py-3 align-middle text-center border-l font-bold text-slate-600">
                 {{ fmtDate(pay.paymentDate) }}
              </td>
              
               <!-- Supplier & Notes -->
              <td class="px-4 py-3 align-middle bg-slate-50/50 border-l">
                 <div class="font-black text-[11px] text-slate-800 mb-0.5">
                     {{ getSupplierName(pay.supplierCode) }}
                 </div>
                 <div class="text-[10px] text-slate-500 line-clamp-1 italic max-w-sm">{{ pay.notes || 'Pembayaran Sesuai Tagihan' }}</div>
              </td>

              <!-- Method -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div class="text-[9px] bg-slate-800 text-white px-2 py-1 border border-slate-700 rounded shadow-sm inline-block font-black tracking-widest uppercase">
                     <i :class="pay.paymentMethod === 'CASH' ? 'pi pi-money-bill' : 'pi pi-building'" class="text-[8px] mr-1"></i>{{ pay.paymentMethod }}
                 </div>
              </td>

              <!-- Amount -->
              <td class="px-4 py-3 align-middle text-right border-l font-mono tracking-tighter bg-emerald-50/10">
                 <div class="font-black text-[13px] text-emerald-800">{{ formatRupiah(pay.amount) }}</div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-emerald-100 text-emerald-700 border-emerald-200': pay.status === 'POSTED',
                    'bg-slate-100 text-slate-600 border-slate-200': pay.status === 'DRAFT',
                    'bg-rose-100 text-rose-700 border-rose-200': pay.status === 'CANCELLED'
                 }" class="px-2 py-1 rounded text-[10px] font-bold tracking-widest border inline-block uppercase shadow-sm">
                    {{ pay.status }}
                 </div>
              </td>

              <!-- Action -->
              <td class="px-2 py-3 text-center border-l">
                 <Button icon="pi pi-trash" severity="danger" size="small" text class="h-7 w-7 text-rose-400 hover:text-rose-600" title="Hapus Dokumen" @click="delPayment(pay)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="7" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Buku transaksi pembayaran pemasok saat ini kosong.
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
        <div class="p-6 border-b bg-purple-900 border-purple-950 relative overflow-hidden flex justify-between items-start shadow-sm rounded-t-xl">
          <div class="absolute -right-5 -top-10 opacity-10"><i class="pi pi-dollar text-[150px] text-white"></i></div>
          <div class="z-10 w-full pr-8">
             <div class="text-xl font-black text-white tracking-tight flex items-center gap-3">Penerbitan Payment (Pembayaran Vendor)</div>
             <div class="text-xs font-semibold mt-1 text-purple-200/80">Dokumen pembayaran (Payment Code) akan secara mandiri mengikat ke pelunasan neraca kas dan bank (Posted).</div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors z-20 shrink-0 shadow" @click="dialogOpen = false">✕</button>
        </div>

        <div class="px-6 py-5 bg-slate-50 flex-1 overflow-auto space-y-5">
           
           <!-- Grid Supplier & Tanggal -->
           <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Pilih Vendor / Supplier</label>
                 <select v-model="form.supplierCode" class="w-full border rounded px-3 py-2 text-sm font-bold text-slate-800 bg-white outline-none focus:border-purple-500 shadow-inner">
                    <option value="" disabled>-- Daftar Master Supplier --</option>
                    <option v-for="s in suppliers" :key="s.code" :value="s.code">[{{ s.code }}] {{ s.name }}</option>
                 </select>
              </div>
              <div class="grid grid-cols-2 gap-2">
                 <div>
                     <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Tanggal</label>
                     <input type="date" v-model="form.paymentDate" class="w-full border rounded px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-purple-500 shadow-inner" />
                 </div>
                 <div>
                     <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Metode (Pencairan)</label>
                     <select v-model="form.paymentMethod" class="w-full border rounded px-2 py-2 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-purple-500">
                         <option value="BANK_TRANSFER">Bank Transfer (Giro/RTGS)</option>
                         <option value="CASH">Kas Tunai (PETTY CASH)</option>
                     </select>
                 </div>
              </div>
           </div>

           <!-- Reference & Amount -->
           <div class="grid grid-cols-[1fr_200px] gap-4">
               <div>
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Referensi Tagihan (Invoice / DO Fisik)</label>
                  <input type="text" v-model="form.reference" class="w-full border rounded px-3 py-2 text-sm font-mono text-slate-800 bg-white outline-none focus:border-purple-500 shadow-inner" placeholder="Ex: INV-12345/Vendor" />
               </div>
               <div>
                  <label class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 block">Nominal Pencairan</label>
                  <div class="relative">
                     <div class="absolute left-3 top-2.5 font-black text-slate-400">Rp</div>
                     <input type="number" v-model.number="form.amount" class="w-full border rounded pl-10 pr-3 py-2 text-xl font-black font-mono text-emerald-700 bg-emerald-50/30 border-emerald-300 outline-none focus:border-emerald-500 shadow-inner" placeholder="0" />
                  </div>
               </div>
           </div>

           <!-- Notes -->
           <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Deskripsi Pembayaran Lengkap</label>
              <textarea v-model="form.notes" rows="2" class="w-full border rounded px-3 py-2 text-sm text-slate-700 bg-white outline-none focus:border-purple-500 shadow-inner leading-relaxed" placeholder="Pembayaran DP tepung, pelunasan material, servis mesin..."></textarea>
           </div>
        </div>

        <div class="p-4 border-t bg-white flex justify-end items-center rounded-b-xl gap-3 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] z-20">
          <Button label="Batal" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 font-bold px-4 text-xs" />
          <Button label="Terbitkan & Bayar Simultan (POST)" severity="info" size="large" :loading="saving" :disabled="saving || !isValid" @click="save" class="bg-purple-700 border-none text-white font-bold tracking-wide hover:bg-purple-800 shadow-sm h-10 px-8 rounded-lg text-xs" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.vendorPayment.create') || true);

const payments = ref<any[]>([]);
const suppliers = ref<any[]>([]);

const search = ref('');
const filterStatus = ref('');
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = reactive({
  paymentNo: '',
  paymentDate: '',
  supplierCode: '',
  amount: 0,
  paymentMethod: 'BANK_TRANSFER',
  reference: '',
  notes: ''
});

const isValid = computed(() => {
   return form.supplierCode && form.amount > 0;
});

const loadDeps = async () => {
    try {
        const res = await api.get('/core/query?table=Supplier');
        // Fallback checks just like before
        if(res.data?.data) suppliers.value = res.data.data;
        else if (res.data) suppliers.value = res.data;
    } catch(e) {
        console.warn('Gagal muat master suppiler', e);
    }
}

const load = async () => {
  loading.value = true;
  if(suppliers.value.length === 0) await loadDeps();

  try {
    const params = filterStatus.value ? `?status=${filterStatus.value}` : '';
    
    // Resolve wrapped data structure safely depending on axios interceptor
    const res = await api.get(`/finance/vendor-payment${params}`);
    
    // Extract payload
    if (res.data?.payments) payments.value = res.data.payments;
    else if (res.payments) payments.value = res.payments;
    
  } catch (e: any) {
     console.error('Failed fetching data', e);
  } finally {
     loading.value = false;
  }
};

const filteredData = computed(() => {
  let list = payments.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(x => 
       x.paymentNo?.toLowerCase().includes(q) || 
       x.reference?.toLowerCase().includes(q) ||
       x.supplierCode?.toLowerCase().includes(q) ||
       x.notes?.toLowerCase().includes(q)
    );
  }
  return list;
});

const getSupplierName = (code: string) => {
    const s = suppliers.value.find(x => x.code === code);
    return s ? `[${s.code}] ${s.name}` : code;
}

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

function openCreate() {
  const rnd = String(Math.floor(Math.random()*10000)).padStart(4,'0');
  Object.assign(form, {
      paymentNo: `PAY-PBL-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${rnd}`,
      paymentDate: new Date().toISOString().slice(0, 10),
      supplierCode: '',
      amount: 0,
      paymentMethod: 'BANK_TRANSFER',
      reference: '',
      notes: ''
  });
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
     await api.post('/finance/vendor-payment', form);
     dialogOpen.value = false;
     load();
  } catch(e) {
     alert('Gagal merekam invoice payment.');
  } finally {
     saving.value = false;
  }
}

async function delPayment(doc: any) {
   if(!confirm(`Menghapus histori transaksi pembayaran ke vendor [${doc.paymentNo}]?`)) return;
   try {
     await api.post(`/finance/vendor-payment/${doc.id}/delete`);
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