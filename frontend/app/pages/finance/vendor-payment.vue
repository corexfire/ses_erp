<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium AP Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-purple-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-purple-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-purple-100">Accounts Payable (AP)</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-purple-600 uppercase tracking-widest">Outbound Liquidity</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Pembayaran <span class="text-purple-600 italic font-medium">Hutang Vendor</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Otorisasi pencairan dana untuk pelunasan tagihan supplier, vendor material, dan mitra strategis operasional pabrik.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Pencairan (Posted)</div>
           <div class="text-2xl font-black text-purple-700 tabular-nums tracking-tighter">{{ formatRupiah(payments.reduce((acc, x) => acc + (x.status === 'POSTED' ? x.amount : 0), 0)) }}</div>
        </div>
        <Button v-if="canManage" label="+ CATAT PEMBAYARAN" icon="pi pi-credit-card" severity="help" @click="openCreate"
          class="h-14 px-8 rounded-[1.25rem] bg-purple-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-purple-100 hover:scale-[1.05] active:scale-95 transition-all text-purple-100" />
      </div>
    </div>

    <!-- Main Payment Matrix (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-truck text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Buku Pelunasan Hutang (AP)</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Vendor Payment Outbound Ledger</p>
           </div>
        </div>

        <div class="relative flex flex-wrap items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari No. Bayar / Vendor..." class="border-none bg-transparent text-[10px] h-9 w-56 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>

          <select v-model="filterSupplier" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-purple-500 outline-none bg-white shadow-sm transition-all">
            <option value="">Semua Supplier</option>
            <option v-for="s in suppliers" :key="s.code" :value="s.code">{{ s.name }}</option>
          </select>

          <select v-model="filterStatus" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-purple-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Status</option>
            <option value="DRAFT">Draft (Antrean)</option>
            <option value="WAITING_SIGNATURE">Menunggu TTD</option>
            <option value="READY_PICKUP">Siap Diambil</option>
            <option value="POSTED">Selesai (Posted)</option>
            <option value="CANCELLED">Batal (Cancelled)</option>
          </select>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-purple-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[220px]">Bukti Bayar & Ref Tags</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-32">Tgl Dibayar</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Identitas Vendor & Keterangan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-36">Media Pencairan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-slate-50/50 w-44">Nominal (IDR)</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-24 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-purple-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-purple-600">Sinkronisasi log pembayaran vendor...</div>
              </td>
            </tr>
            
            <tr v-for="pay in filteredData" v-else :key="pay.id" class="transition-all hover:bg-purple-50/20 group border-l-4 border-l-transparent hover:border-l-purple-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-credit-card text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-slate-800 tracking-tight group-hover:text-purple-700 transition-colors uppercase">
                         {{ pay.paymentNo }}
                      </div>
                      <div class="mt-1 flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">
                        <i class="pi pi-file-invoice text-[8px]"></i> Ref: <span class="text-purple-600">{{ pay.reference || 'N/A' }}</span>
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-slate-500 uppercase tracking-tighter text-[10px]">
                 {{ fmtDate(pay.paymentDate) }}
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="font-black text-[11px] text-slate-900 group-hover:text-purple-700 transition-colors">{{ getSupplierName(pay.supplierCode) }}</div>
                 <div class="text-[9px] text-slate-500 font-medium line-clamp-1 italic tracking-tight uppercase leading-relaxed mt-1 opacity-70">{{ pay.notes || 'Pelunasan Tagihan Operasional' }}</div>
                 <!-- Workflow Status Ribbon -->
                 <div class="mt-2 flex gap-1">
                    <span v-if="pay.status === 'WAITING_SIGNATURE'" class="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 text-[7px] font-black rounded uppercase tracking-widest shadow-sm">Audit Signature Needed</span>
                    <span v-if="pay.status === 'READY_PICKUP'" class="px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-100 text-[7px] font-black rounded uppercase tracking-widest shadow-sm">Ready for Pickup</span>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <span :class="pay.paymentMethod === 'BANK_TRANSFER' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'" 
                   class="inline-flex rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm border">
                    <i :class="pay.paymentMethod === 'BANK_TRANSFER' ? 'pi pi-building' : 'pi pi-money-bill'" class="mr-1.5 text-[9px]"></i>
                    {{ pay.paymentMethod === 'BANK_TRANSFER' ? 'Transfer' : 'Tunai' }}
                 </span>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-slate-50/5 group-hover:bg-slate-100 transition-colors">
                 <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(pay.amount) }}</div>
                 <div class="text-[8px] font-black text-slate-400 font-mono mt-0.5 uppercase tracking-widest">Outbound Settlement</div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button v-if="canManage" icon="pi pi-trash" rounded text severity="danger" class="h-10 w-10 hover:bg-rose-50" @click="delPayment(pay)" />
                    <div v-if="pay.status === 'POSTED'" class="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-black rounded uppercase tracking-[0.2em] shadow-sm">Posted</div>
                    <div v-if="pay.status === 'CANCELLED'" class="px-3 py-1 bg-rose-50 text-rose-600 border border-rose-100 text-[8px] font-black rounded uppercase tracking-[0.2em] shadow-sm">Batal</div>
                 </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredData.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">💳</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Buku pencairan bersih. Tidak ada mutasi pelunasan ditemukan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ PAYMENT FORM DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-purple-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-purple-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-purple-200">
               <i class="pi pi-credit-card text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Bukti <span class="text-purple-600 italic text-2xl">Keluar Dana</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-purple-500 italic">Account Payable Liquidity Protocol</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-purple-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 pb-32">
           <!-- Alert Context -->
           <div class="p-6 bg-purple-50 border border-purple-100 rounded-[2rem] flex items-start gap-4">
              <i class="pi pi-shield text-purple-500 text-xl mt-1"></i>
              <div>
                 <h4 class="text-[11px] font-black text-purple-800 uppercase tracking-widest">Kontrol Audit Pencairan</h4>
                 <p class="text-[10px] font-bold text-purple-500 uppercase mt-1 leading-relaxed opacity-80">Pastikan invoice fisik supplier telah terverifikasi oleh departemen Purchasing sebelum menerbitkan bukti pembayaran ini.</p>
              </div>
           </div>

           <!-- Form Section -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8 text-slate-900">
              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pilih Master Vendor / Rekanan</label>
                 <select v-model="form.supplierCode" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-purple-500 focus:bg-white transition-all shadow-sm cursor-pointer uppercase tracking-tight">
                    <option value="" disabled>-- Daftar Master Supplier --</option>
                    <option v-for="s in suppliers" :key="s.code" :value="s.code">[{{ s.code }}] {{ s.name }}</option>
                 </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Keluar Dana</label>
                    <input type="date" v-model="form.paymentDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-purple-500 focus:bg-white transition-all font-mono shadow-sm" />
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Media Pencairan (Penyetoran)</label>
                    <select v-model="form.paymentMethod" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-purple-500 focus:bg-white transition-all shadow-sm cursor-pointer uppercase">
                       <option value="BANK_TRANSFER">Bank Transfer (Giro/RTGS)</option>
                       <option value="CASH">Kas Tunai (PETTY CASH)</option>
                    </select>
                 </div>
              </div>

              <!-- Workflow Status -->
              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Status Alur Dokumen (Workflow)</label>
                 <select v-model="form.status" class="w-full h-14 px-5 rounded-2xl bg-white border-2 border-slate-100 text-[11px] font-black text-slate-800 outline-none focus:border-purple-500 transition-all shadow-sm cursor-pointer uppercase">
                    <option value="DRAFT">Draft / Antrean Cek</option>
                    <option value="WAITING_SIGNATURE">Menunggu TTD Direksi</option>
                    <option value="READY_PICKUP">Siap Diambil Vendor</option>
                    <option value="POSTED">Final / Sudah Cair</option>
                 </select>
              </div>

              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic leading-none">Ref. Nomor Invoice / Nota Penagihan Vendor</label>
                 <input type="text" v-model="form.reference" placeholder="Ex: INV-PUR-12345/VendorName" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-purple-500 focus:bg-white transition-all font-mono shadow-sm uppercase tabular-nums" />
              </div>

              <div class="space-y-4">
                 <label class="text-[10px] font-black text-purple-600 uppercase tracking-widest px-1 italic text-center block">Nominal Dana Dicairkan (IDR)</label>
                 <div class="relative">
                    <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">RP</span>
                    <input type="number" v-model.number="form.amount" placeholder="0" class="w-full h-24 pl-16 pr-6 rounded-[1.5rem] bg-purple-50/50 border-2 border-purple-100 text-4xl font-black text-purple-800 outline-none focus:border-purple-500 focus:bg-white transition-all shadow-xl font-mono tabular-nums" />
                 </div>
              </div>

              <div class="space-y-4">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Catatan Pembayaran & Adendum</label>
                 <textarea v-model="form.notes" rows="3" placeholder="Isi rincian pelunasan, diskon termin, atau info bank vendor..." class="w-full p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-purple-500 focus:bg-white transition-all shadow-sm leading-relaxed"></textarea>
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button label="Finalisasi & Cairkan Dana" icon="pi pi-check-circle" :loading="saving" :disabled="saving || !isValid" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-purple-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all text-purple-100" />
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

const canManage = computed(() => auth.hasPermission('finance.vendorPayment.create') || true);

const payments = ref<any[]>([]);
const suppliers = ref<any[]>([]);

const search = ref('');
const filterStatus = ref('');
const filterSupplier = ref('');
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
  notes: '',
  status: 'DRAFT'
});

const isValid = computed(() => {
   return form.supplierCode && form.amount > 0 && form.paymentDate;
});

const loadDeps = async () => {
    try {
        const res = await api.get('/core/query?table=Supplier');
        if(res.data?.data) suppliers.value = res.data.data;
        else if (res.data) suppliers.value = res.data;
    } catch(e) {
        console.warn('Gagal muat master supplier', e);
    }
}

const load = async () => {
  loading.value = true;
  if(suppliers.value.length === 0) await loadDeps();

  try {
    const params = filterStatus.value ? `?status=${filterStatus.value}` : '';
    const res = await api.get(`/finance/vendor-payment${params}`);
    
    // Safety check for TS error reported earlier
    const payload: any = res.data || res;
    payments.value = payload?.payments || [];
    
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
  if (filterSupplier.value) {
    list = list.filter(x => x.supplierCode === filterSupplier.value);
  }
  return list;
});

const getSupplierName = (code: string) => {
    const s = suppliers.value.find(x => x.code === code);
    return s ? `[${s.code}] ${s.name}` : code;
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
      paymentNo: `PAY-PBL-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${rnd}`,
      paymentDate: new Date().toISOString().slice(0, 10),
      supplierCode: '',
      amount: 0,
      paymentMethod: 'BANK_TRANSFER',
      reference: '',
      notes: '',
      status: 'DRAFT'
  });
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
     await api.post('/finance/vendor-payment', form);
     showMsg(success, 'Pencairan dana vendor berhasil dibukukan ke Ledger.');
     dialogOpen.value = false;
     load();
  } catch(e) {
     showMsg(error, 'Gagal merekam invoice payment. Periksa koneksi atau data mandatori.');
  } finally {
     saving.value = false;
  }
}

async function delPayment(doc: any) {
   if(!confirm(`Menghapus histori bukti keluar dana ke vendor [${doc.paymentNo}] secara permanen?`)) return;
   try {
     await api.post(`/finance/vendor-payment/${doc.id}/delete`);
     showMsg(error, 'Dokumen pembayaran hutang telah dihapus dari sistem.');
     load();
   } catch(e) { showMsg(error, 'Gagal menghapus catatan pembayaran.'); }
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