<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium AR Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-blue-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-blue-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-blue-100">Account Receivable (AR)</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Inflow Management</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Penerimaan <span class="text-blue-600 italic font-medium">Pembayaran</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Otorisasi pencatatan masuknya likuiditas dari piutang pelanggan, outlet, dan distributor ke dalam Kas/Bank utama.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Likuiditas Terverifikasi</div>
           <div class="text-2xl font-black text-blue-700 tabular-nums tracking-tighter">{{ formatRupiah(receipts.reduce((acc, x) => acc + (x.status === 'POSTED' ? x.amount : 0), 0)) }}</div>
        </div>
        <Button v-if="canManage" label="+ CATAT PENERIMAAN" icon="pi pi-download" severity="info" @click="openCreate"
          class="h-14 px-8 rounded-[1.25rem] bg-blue-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-blue-100 hover:scale-[1.05] active:scale-95 transition-all text-blue-100" />
      </div>
    </div>

    <!-- Main Receipt Matrix (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-file-export text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Buku Penerimaan Dana (AR)</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Customer Payment Inbound Ledger</p>
           </div>
        </div>

        <div class="relative flex flex-wrap items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari No. Terima / Customer..." class="border-none bg-transparent text-[10px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>

          <select v-model="filterStatus" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-blue-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Status</option>
            <option value="DRAFT">Draft (Belum Masuk)</option>
            <option value="POSTED">Selesai (Posted)</option>
            <option value="CANCELLED">Batal (Cancelled)</option>
          </select>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-blue-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[220px]">Bukti Terima & Ref Ref</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-32">Tgl Diterima</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Identitas Pelanggan & Catatan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-36">Media Setor</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-slate-50/50 w-44">Nominal (IDR)</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-24 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-blue-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-blue-600">Sinkronisasi log penerimaan piutang...</div>
              </td>
            </tr>
            
            <tr v-for="rec in filteredData" :key="rec.id" class="transition-all hover:bg-blue-50/20 group border-l-4 border-l-transparent hover:border-l-blue-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-download text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-slate-800 tracking-tight group-hover:text-blue-700 transition-colors uppercase">
                         {{ rec.receiptNo }}
                      </div>
                      <div class="mt-1 flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">
                        <i class="pi pi-file-export text-[8px]"></i> Ref: <span class="text-blue-600">{{ rec.reference || 'N/A' }}</span>
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-slate-500 uppercase tracking-tighter text-[10px]">
                 {{ fmtDate(rec.receiptDate) }}
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="font-black text-[11px] text-slate-900 group-hover:text-blue-700 transition-colors">{{ getCustomerName(rec) }}</div>
                 <div class="text-[9px] text-slate-500 font-medium line-clamp-1 italic tracking-tight uppercase leading-relaxed mt-1 opacity-70">{{ rec.notes || 'Pelunasan Faktur Piutang' }}</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <span :class="rec.paymentMethod === 'BANK_TRANSFER' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'" 
                   class="inline-flex rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm border">
                    <i :class="rec.paymentMethod === 'BANK_TRANSFER' ? 'pi pi-building' : 'pi pi-money-bill'" class="mr-1.5 text-[9px]"></i>
                    {{ rec.paymentMethod === 'BANK_TRANSFER' ? 'Transfer' : 'Tunai' }}
                 </span>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-slate-50/5 group-hover:bg-slate-100 transition-colors">
                 <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(rec.amount) }}</div>
                 <div class="text-[8px] font-black text-slate-400 font-mono mt-0.5 uppercase tracking-widest">Inflow Settlement</div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button v-if="canManage" icon="pi pi-trash" rounded text severity="danger" class="h-10 w-10 hover:bg-rose-50" @click="delReceipt(rec)" />
                    <div v-if="rec.status === 'POSTED'" class="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-black rounded uppercase tracking-[0.2em] shadow-sm">Posted</div>
                    <div v-if="rec.status === 'CANCELLED'" class="px-3 py-1 bg-rose-50 text-rose-600 border border-rose-100 text-[8px] font-black rounded uppercase tracking-[0.2em] shadow-sm">Batal</div>
                 </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🏧</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Buku penerimaan bersih. Tidak ada mutasi pelunasan ditemukan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ RECEIPT FORM DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-blue-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-blue-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-blue-200">
               <i class="pi pi-download text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Bukti <span class="text-blue-600 italic text-2xl">Terima Dana</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-blue-500 italic">Account Receivable Liquidity Protocol</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-blue-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 pb-32">
           <!-- Alert Context -->
           <div class="p-4 bg-indigo-50 border border-indigo-100 rounded-[2rem] flex items-start gap-4">
              <i class="pi pi-info-circle text-indigo-500 text-xl mt-1"></i>
              <div>
                 <h4 class="text-[11px] font-black text-indigo-800 uppercase tracking-widest">Otomatisasi Ledger</h4>
                 <p class="text-[10px] font-bold text-indigo-500 uppercase mt-1 leading-relaxed opacity-80">Menyimpan dokumen ini akan secara otomatis menambah saldo Kas/Bank utama per tanggal mutasi yang dipilih.</p>
              </div>
           </div>

           <!-- Form Section -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8 text-slate-900">
              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pilih Master Pelanggan / Outlet</label>
                 <select v-model="form.customerId" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm cursor-pointer uppercase">
                    <option value="" disabled>-- Daftar Master Pelanggan --</option>
                    <option v-for="c in customers" :key="c.id" :value="c.id">[{{ c.code }}] {{ c.name }}</option>
                 </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Terima Dana</label>
                    <input type="date" v-model="form.receiptDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-mono shadow-sm" />
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Metode Setoran (Penyetoran)</label>
                    <select v-model="form.paymentMethod" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm cursor-pointer uppercase">
                       <option value="BANK_TRANSFER">Bank Transfer (Giro/RTGS)</option>
                       <option value="CASH">Kas Tunai (PETTY CASH)</option>
                    </select>
                 </div>
              </div>

              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic leading-none">Ref. Nomor Tagihan / Faktur Piutang</label>
                 <input type="text" v-model="form.reference" placeholder="Ex: AR-12345/CustomerName" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-mono shadow-sm uppercase tabular-nums" />
              </div>

              <div class="space-y-4">
                 <label class="text-[10px] font-black text-blue-600 uppercase tracking-widest px-1 italic text-center block">Nominal Dana Diterima (IDR)</label>
                 <div class="relative">
                    <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">RP</span>
                    <input type="number" v-model.number="form.amount" placeholder="0" class="w-full h-24 pl-16 pr-6 rounded-[1.5rem] bg-blue-50/50 border-2 border-blue-100 text-4xl font-black text-blue-800 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xl font-mono tabular-nums" />
                 </div>
              </div>

              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Catatan Penjelasan Transaksi</label>
                 <textarea v-model="form.notes" rows="3" placeholder="Isi rincian pelunasan, diskon, atau info transfer khusus..." class="w-full p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm leading-relaxed"></textarea>
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button label="Finalisasi & Tambah Saldo" icon="pi pi-check-circle" :loading="saving" :disabled="saving || !isValid" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-blue-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all text-blue-100" />
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
  customerId: '',
  amount: 0,
  paymentMethod: 'BANK_TRANSFER',
  reference: '',
  notes: '',
  invoiceId: ''
});

const isValid = computed(() => {
   return form.customerId && form.amount > 0 && form.receiptDate;
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
    const res = await api.get(`/finance/customer-receipt${params}`);
    
    // Safety check for TS error reported earlier
    const payload: any = res.data || res;
    receipts.value = payload?.receipts || [];
    
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
       x.customer?.name?.toLowerCase().includes(q) ||
       x.customer?.code?.toLowerCase().includes(q) ||
       x.notes?.toLowerCase().includes(q)
    );
  }
  return list;
});

const getCustomerName = (rec: any) => {
    if (rec.customer) return `[${rec.customer.code}] ${rec.customer.name}`;
    const c = customers.value.find(x => x.id === rec.customerId);
    return c ? `[${c.code}] ${c.name}` : rec.customerId;
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
      receiptNo: `RC-IN-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${rnd}`,
      receiptDate: new Date().toISOString().slice(0, 10),
      customerId: '',
      amount: 0,
      paymentMethod: 'BANK_TRANSFER',
      reference: '',
      notes: '',
      invoiceId: ''
  });
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
     await api.post('/finance/customer-receipt', form);
     showMsg(success, 'Penerimaan dana kustomer berhasil dibukukan ke Ledger.');
     dialogOpen.value = false;
     load();
  } catch(e) {
     showMsg(error, 'Gagal merekam invoice receipt. Periksa koneksi atau data mandatori.');
  } finally {
     saving.value = false;
  }
}

async function delReceipt(doc: any) {
   if(!confirm(`Menghapus histori bukti terima bayar pelanggan [${doc.receiptNo}] secara permanen?`)) return;
   try {
     await api.post(`/finance/customer-receipt/${doc.id}/delete`);
     showMsg(error, 'Dokumen penerimaan piutang telah dihapus dari sistem.');
     load();
   } catch(e) { showMsg(error, 'Gagal menghapus catatan penerimaan.'); }
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