<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5 shadow-sm border-l-4 border-l-blue-600">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Customer Receipt (Penerimaan Pembayaran)</div>
          <div class="mt-1 text-xs text-slate-600">
             Sentralisasi dokumen penerimaan pelunasan piutang (AR) dari pelanggan, distributor, atau ritel.
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Catat Penerimaan Baru" size="small" bg="bg-blue-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-blue-700" icon="pi pi-download" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-2 rounded-lg">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari No. Terima / Referensi..." class="w-full md:w-56 text-xs font-mono" />
          <select v-model="filterStatus" class="p-2 border rounded-md text-xs bg-white text-slate-700 w-40 outline-none focus:border-blue-500">
            <option value="">Semua Status</option>
            <option value="POSTED">POSTED (Masuk Kas/Bank)</option>
            <option value="CANCELLED">CANCELLED (Dibatalkan)</option>
          </select>
          <Button label="Muat Data" severity="secondary" size="small" :disabled="loading" @click="load" icon="pi pi-refresh" />
        </div>
        <div class="hidden md:flex gap-3 text-xs font-bold text-slate-500">
           Total Penerimaan: <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-black">{{ receipts.length }} Bukti</span>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-blue-50 text-left text-[11px] text-blue-900 border-b border-blue-100 uppercase tracking-wider font-bold">
            <tr>
              <th class="px-4 py-3 min-w-[200px]">No Bukti Terima & Ref. Piutang</th>
              <th class="px-3 py-3 border-l text-center">Tanggal Diterima</th>
              <th class="px-4 py-3 bg-slate-50 border-l">Detail Pelanggan (Pengirim)</th>
              <th class="px-4 py-3 border-l text-center">Metode (Penyetoran)</th>
              <th class="px-4 py-3 text-right bg-emerald-50 border-l w-32">Nominal (IDR)</th>
              <th class="px-4 py-3 text-center border-l w-24">Status</th>
              <th class="px-2 py-3 text-center border-l w-14">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="7" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-blue-500"></i> Sinkronisasi Buku Piutang / Penerimaan...
              </td>
            </tr>
            <tr v-for="rec in filteredData" v-else :key="rec.id" class="transition hover:bg-blue-50/20 group">
              
              <!-- Receipt No & Reference -->
              <td class="px-4 py-3 align-middle">
                 <div class="font-mono font-black text-slate-800">{{ rec.receiptNo }}</div>
                 <div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono uppercase bg-slate-100 py-0.5 px-1.5 rounded inline-block">
                     <i class="pi pi-file-export text-[9px]"></i> Ref Tagihan: <span class="text-blue-700 font-bold">{{ rec.reference || 'TIDAK ADA' }}</span>
                 </div>
              </td>

              <!-- Date -->
              <td class="px-3 py-3 align-middle text-center border-l font-bold text-slate-600">
                 {{ fmtDate(rec.receiptDate) }}
              </td>
              
               <!-- Customer & Notes -->
              <td class="px-4 py-3 align-middle bg-slate-50/50 border-l">
                 <div class="font-black text-[11px] text-slate-800 mb-0.5">
                     {{ getCustomerName(rec.customerCode) }}
                 </div>
                 <div class="text-[10px] text-slate-500 line-clamp-1 italic max-w-sm">{{ rec.notes || 'Pelunasan Sesuai Tagihan Piutang' }}</div>
              </td>

              <!-- Method -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div class="text-[9px] bg-slate-800 text-white px-2 py-1 border border-slate-700 rounded shadow-sm inline-block font-black tracking-widest uppercase">
                     <i :class="rec.paymentMethod === 'CASH' ? 'pi pi-money-bill' : 'pi pi-building'" class="text-[8px] mr-1"></i>{{ rec.paymentMethod }}
                 </div>
              </td>

              <!-- Amount -->
              <td class="px-4 py-3 align-middle text-right border-l font-mono tracking-tighter bg-emerald-50/10">
                 <div class="font-black text-[13px] text-emerald-800">{{ formatRupiah(rec.amount) }}</div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-emerald-100 text-emerald-700 border-emerald-200': rec.status === 'POSTED',
                    'bg-slate-100 text-slate-600 border-slate-200': rec.status === 'DRAFT',
                    'bg-rose-100 text-rose-700 border-rose-200': rec.status === 'CANCELLED'
                 }" class="px-2 py-1 rounded text-[10px] font-bold tracking-widest border inline-block uppercase shadow-sm">
                    {{ rec.status }}
                 </div>
              </td>

              <!-- Action -->
              <td class="px-2 py-3 text-center border-l">
                 <Button icon="pi pi-trash" severity="danger" size="small" text class="h-7 w-7 text-rose-400 hover:text-rose-600" title="Hapus Dokumen" @click="delReceipt(rec)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="7" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Buku transaksi penerimaan pelanggan saat ini kosong.
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
        <div class="p-6 border-b bg-blue-900 border-blue-950 relative overflow-hidden flex justify-between items-start shadow-sm rounded-t-xl">
          <div class="absolute -right-5 -top-10 opacity-10"><i class="pi pi-download text-[150px] text-white"></i></div>
          <div class="z-10 w-full pr-8">
             <div class="text-xl font-black text-white tracking-tight flex items-center gap-3">Penerbitan Receipt (Terima Dana)</div>
             <div class="text-xs font-semibold mt-1 text-blue-200/80">Dokumen tanda terima (Receipt Code) akan secara otomatis menambah Saldo Induk Kas/Bank Anda (Posted).</div>
          </div>
          <button class="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors z-20 shrink-0 shadow" @click="dialogOpen = false">✕</button>
        </div>

        <div class="px-6 py-5 bg-slate-50 flex-1 overflow-auto space-y-5">
           
           <!-- Grid Customer & Tanggal -->
           <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div>
                 <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Pilih Pelanggan / Outlet</label>
                 <select v-model="form.customerCode" class="w-full border rounded px-3 py-2 text-sm font-bold text-slate-800 bg-white outline-none focus:border-blue-500 shadow-inner">
                    <option value="" disabled>-- Daftar Master Pelanggan --</option>
                    <option v-for="c in customers" :key="c.code" :value="c.code">[{{ c.code }}] {{ c.name }}</option>
                 </select>
              </div>
              <div class="grid grid-cols-2 gap-2">
                 <div>
                     <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Tanggal Terima</label>
                     <input type="date" v-model="form.receiptDate" class="w-full border rounded px-2 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 shadow-inner" />
                 </div>
                 <div>
                     <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Metode (Penyetoran)</label>
                     <select v-model="form.paymentMethod" class="w-full border rounded px-2 py-2 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-blue-500">
                         <option value="BANK_TRANSFER">Bank Transfer (Giro/RTGS)</option>
                         <option value="CASH">Kas Tunai (PETTY CASH)</option>
                     </select>
                 </div>
              </div>
           </div>

           <!-- Reference & Amount -->
           <div class="grid grid-cols-[1fr_200px] gap-4">
               <div>
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Ref. Tagihan / Piutang (Faktur Asli)</label>
                  <input type="text" v-model="form.reference" class="w-full border rounded px-3 py-2 text-sm font-mono text-slate-800 bg-white outline-none focus:border-blue-500 shadow-inner" placeholder="Ex: AR-12345/Customer" />
               </div>
               <div>
                  <label class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 block">Nominal Dana Masuk</label>
                  <div class="relative">
                     <div class="absolute left-3 top-2.5 font-black text-slate-400">Rp</div>
                     <input type="number" v-model.number="form.amount" class="w-full border rounded pl-10 pr-3 py-2 text-xl font-black font-mono text-emerald-700 bg-emerald-50/30 border-emerald-300 outline-none focus:border-emerald-500 shadow-inner" placeholder="0" />
                  </div>
               </div>
           </div>

           <!-- Notes -->
           <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Deskripsi Transaksi Lengkap</label>
              <textarea v-model="form.notes" rows="2" class="w-full border rounded px-3 py-2 text-sm text-slate-700 bg-white outline-none focus:border-blue-500 shadow-inner leading-relaxed" placeholder="Pelunasan faktur pengiriman distributor minggu lalu..."></textarea>
           </div>
        </div>

        <div class="p-4 border-t bg-white flex justify-end items-center rounded-b-xl gap-3 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] z-20">
          <Button label="Batal" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 font-bold px-4 text-xs" />
          <Button label="Terbitkan & Tambah Kas (POST)" severity="info" size="large" :loading="saving" :disabled="saving || !isValid" @click="save" class="bg-blue-700 border-none text-white font-bold tracking-wide hover:bg-blue-800 shadow-sm h-10 px-8 rounded-lg text-xs" icon="pi pi-check-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.customerReceipt.create') || true);

const receipts = ref<any[]>([]);
const customers = ref<any[]>([]);

const search = ref('');
const filterStatus = ref('');
const loading = ref(false);
const saving = ref(false);
const dialogOpen = ref(false);

const form = reactive({
  receiptNo: '',
  receiptDate: '',
  customerCode: '',
  amount: 0,
  paymentMethod: 'BANK_TRANSFER',
  reference: '',
  notes: ''
});

const isValid = computed(() => {
   return form.customerCode && form.amount > 0;
});

const loadDeps = async () => {
    try {
        const res = await api.get('/core/query?table=Customer');
        if(res.data?.data) customers.value = res.data.data;
        else if (res.data) customers.value = res.data;
    } catch(e) {
        console.warn('Gagal muat master pelanggan', e);
    }
}

const load = async () => {
  loading.value = true;
  if(customers.value.length === 0) await loadDeps();

  try {
    const params = filterStatus.value ? `?status=${filterStatus.value}` : '';
    
    // Resolve wrapped data structure safely depending on axios interceptor
    const res = await api.get(`/finance/customer-receipt${params}`);
    
    // Extract payload
    if (res.data?.receipts) receipts.value = res.data.receipts;
    else if (res.receipts) receipts.value = res.receipts;
    
  } catch (e: any) {
     console.error('Failed fetching data', e);
  } finally {
     loading.value = false;
  }
};

const filteredData = computed(() => {
  let list = receipts.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(x => 
       x.receiptNo?.toLowerCase().includes(q) || 
       x.reference?.toLowerCase().includes(q) ||
       x.customerCode?.toLowerCase().includes(q) ||
       x.notes?.toLowerCase().includes(q)
    );
  }
  return list;
});

const getCustomerName = (code: string) => {
    const c = customers.value.find(x => x.code === code);
    return c ? `[${c.code}] ${c.name}` : code;
}

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

function openCreate() {
  const rnd = String(Math.floor(Math.random()*10000)).padStart(4,'0');
  Object.assign(form, {
      receiptNo: `RC-IN-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${rnd}`,
      receiptDate: new Date().toISOString().slice(0, 10),
      customerCode: '',
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
     await api.post('/finance/customer-receipt', form);
     dialogOpen.value = false;
     load();
  } catch(e) {
     alert('Gagal merekam invoice receipt.');
  } finally {
     saving.value = false;
  }
}

async function delReceipt(doc: any) {
   if(!confirm(`Menghapus histori bukti terima bayar dari pelanggan [${doc.receiptNo}]?`)) return;
   try {
     await api.post(`/finance/customer-receipt/${doc.id}/delete`);
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