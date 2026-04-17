<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-rose-600 relative overflow-hidden">
      <!-- Decorative background icon -->
      <div class="absolute right-[-20px] top-[-20px] opacity-5 pointer-events-none">
        <i class="pi pi-credit-card text-[150px] text-rose-900"></i>
      </div>
      
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <i class="pi pi-credit-card text-rose-600"></i> Accounts Payable (AP) & Pengeluaran
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
             Sistem kontrol hutang usaha (Vendor/Supplier), jadwal pembayaran jatuh tempo, dan rekonsiliasi pengeluaran kas.
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Catat Tagihan Vendor" size="small" bg="bg-rose-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-rose-700" icon="pi pi-plus" @click="showDialog = true" />
        </div>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-rose-50 border border-rose-200 rounded-lg p-4 shadow-sm relative overflow-hidden">
           <div class="text-[10px] font-bold text-rose-700 uppercase tracking-widest mb-1 relative z-10">Total Hutang Menggantung (AP)</div>
           <div class="text-xl font-black font-mono text-rose-800 relative z-10">{{ formatRupiah(totalOutstanding) }}</div>
           <i class="pi pi-exclamation-circle absolute right-[-10px] bottom-[-10px] text-[60px] opacity-10 text-rose-800"></i>
        </div>
        <div class="bg-white border rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Sudah Dibayar (Paid)</div>
           <div class="text-xl font-black font-mono text-slate-800">{{ formatRupiah(totalPaid) }}</div>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1">Menunggu Jatuh Tempo</div>
           <div class="text-xl font-black font-mono text-amber-800">{{ invoices.filter(x => x.status === 'OPEN').length }} Faktur</div>
        </div>
        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-orange-700 uppercase tracking-widest mb-1">Telat Bayar (Overdue)</div>
           <div class="text-xl font-black font-mono text-orange-800 flex items-center gap-2">
              <i class="pi pi-clock"></i> {{ invoices.filter(x => x.status === 'OVERDUE').length }} Faktur
           </div>
        </div>
    </div>

    <!-- Vendor Reconciliation / AP Grouped Mode -->
    <div v-if="reconciliation.length > 0" class="rounded-xl border border-indigo-200 bg-white shadow-sm overflow-hidden">
      <div class="bg-indigo-50 p-4 border-b border-indigo-200 flex items-center justify-between">
        <div class="flex items-center gap-2 text-indigo-800 font-black">
           <i class="pi pi-users"></i> Rekonsiliasi Hutang per Supplier
        </div>
      </div>
      <div class="p-6 overflow-hidden bg-slate-50/50">
         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="r in reconciliation" :key="r.supplierCode" class="bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow transition">
               <div class="p-4 border-b bg-indigo-900 text-white flex justify-between items-center">
                  <div>
                     <div class="text-xs text-indigo-200 font-bold uppercase tracking-widest mb-0.5">Supplier Pembebanan</div>
                     <div class="font-black text-lg">{{ r.supplierCode }}</div>
                  </div>
                  <div class="text-right">
                     <div class="text-xs text-indigo-200 font-bold uppercase tracking-widest mb-0.5">Total Tagihan Aktif</div>
                     <div class="font-black font-mono text-lg text-emerald-300">{{ formatRupiah(r.totalOutstanding) }}</div>
                  </div>
               </div>
               <div class="p-0">
                  <table class="w-full text-xs">
                     <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                        <tr>
                           <th class="p-3 text-left border-r border-b">Faktur (INV)</th>
                           <th class="p-3 text-center border-r border-b">Jatuh Tempo</th>
                           <th class="p-3 text-right border-b w-32">Outstanding</th>
                        </tr>
                     </thead>
                     <tbody class="divide-y divide-slate-100">
                        <tr v-for="inv in r.invoices" :key="'rec'+inv.invoiceNo" class="hover:bg-slate-50">
                           <td class="p-3 font-mono font-bold text-slate-700 border-r">{{ inv.invoiceNo }}</td>
                           <td class="p-3 text-center font-bold text-rose-600 border-r">{{ fmtDate(inv.dueDate) }}</td>
                           <td class="p-3 text-right font-mono font-black text-slate-800">{{ formatRupiah(inv.outstanding) }}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div class="bg-indigo-50 p-3 text-center border-t border-indigo-100 p-2 text-xs font-bold text-indigo-700">
                  ⚠️ Segera lunasi {{ r.totalInvoices }} tagihan menggantung di atas sebelum proses Procurement ditutup.
               </div>
            </div>
         </div>
      </div>
    </div>

    <!-- Master AP List -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-3 rounded-lg">
        <div class="flex items-center gap-3 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Faktur / Supplier..." class="w-full md:w-64 text-sm font-mono border-slate-300" />
          <select v-model="status" class="p-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 w-40 outline-none focus:border-rose-500 font-semibold" @change="load">
            <option value="">Semua Status</option>
            <option value="OPEN">OPEN (Menunggu Bayar)</option>
            <option value="PARTIAL">PARTIAL (Cicilan)</option>
            <option value="PAID">PAID (Lunas)</option>
            <option value="OVERDUE">OVERDUE (Telat)</option>
          </select>
          <Button label="Muat Ulang" severity="secondary" size="small" :disabled="loading" @click="loadAll" icon="pi pi-refresh" />
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-rose-50/50 text-left text-[11px] text-rose-900 border-b border-rose-100 uppercase tracking-widest font-bold">
            <tr>
              <th class="px-4 py-3 min-w-[150px]">No. Surat Jalan Vendor (AP)</th>
              <th class="px-3 py-3 border-l">Supplier</th>
              <th class="px-3 py-3 border-l text-center">Tgl Masuk</th>
              <th class="px-3 py-3 border-l text-center bg-orange-50">Tgl Jatuh Tempo</th>
              <th class="px-4 py-3 bg-slate-50 border-l text-right w-36">Total Pembelian</th>
              <th class="px-4 py-3 bg-emerald-50 border-l text-right w-36">Telah Anda Bayar</th>
              <th class="px-4 py-3 text-center border-l w-28">Status</th>
              <th class="px-3 py-3 text-center border-l w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="8" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-rose-500"></i> Memuat Buku Besar Hutang...
              </td>
            </tr>
            <tr v-for="i in filteredInvoices" v-else :key="i.id" class="transition hover:bg-rose-50/20">
              <td class="px-4 py-3 align-middle font-mono font-black text-slate-700">{{ i.invoiceNo }}</td>
              <td class="px-3 py-3 align-middle font-semibold text-slate-800 border-l">{{ i.supplierCode }}</td>
              <td class="px-3 py-3 align-middle text-center border-l font-medium text-slate-600">{{ fmtDate(i.invoiceDate) }}</td>
              <td class="px-3 py-3 align-middle text-center border-l font-bold" :class="isOverdueString(i.dueDate) && i.status !== 'PAID' ? 'text-rose-600' : 'text-slate-500'">
                 {{ i.dueDate ? fmtDate(i.dueDate) : '-' }}
              </td>
              <td class="px-4 py-3 align-middle text-right bg-slate-50 border-l font-mono font-black text-slate-800">{{ formatRupiah(i.totalAmount) }}</td>
              <td class="px-4 py-3 align-middle text-right bg-emerald-50/30 border-l font-mono font-black" :class="Number(i.paidAmount) > 0 ? 'text-emerald-700' : 'text-slate-400'">{{ formatRupiah(i.paidAmount) }}</td>
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-slate-100 text-slate-600 border-slate-200': i.status === 'OPEN',
                    'bg-rose-100 text-rose-700 border-rose-200': i.status === 'PARTIAL' || i.status === 'OVERDUE',
                    'bg-emerald-100 text-emerald-700 border-emerald-200': i.status === 'PAID'
                 }" class="px-2 py-1 rounded text-[10px] font-bold tracking-widest border inline-block uppercase shadow-sm">
                    {{ i.status }}
                 </div>
              </td>
              <td class="px-3 py-3 text-center border-l">
                <Button label="Bayar Hutang" size="small" bg="bg-rose-600" class="text-white text-[10px] border-none px-2 py-1 w-full font-bold hover:bg-rose-700 shadow-sm" :disabled="i.status === 'PAID'" @click="openPay(i)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredInvoices.length === 0">
              <td colspan="8" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Tidak ada data surat Tagihan/Hutang dari Pemasok.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Invoice Dialog -->
    <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-4xl rounded-2xl border bg-white shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
        <div class="p-5 border-b bg-slate-50 flex justify-between items-center rounded-t-2xl">
          <div>
             <div class="text-lg font-black text-slate-800">Pencatatan Tagihan Vendor Keluar (AP)</div>
             <div class="text-xs text-slate-500 mt-1">Gunakan form ini hanya jika surat tagihan biaya F&B tidak berasal dari sistem Gudang (GRN).</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full font-bold transition-colors shadow-inner" @click="showDialog = false">✕</button>
        </div>

        <div class="p-6 overflow-auto flex-1 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 px-1">
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. Invoice Supplier</label>
                <input v-model="form.invoiceNo" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-rose-500 shadow-inner" placeholder="AP-INV-..." />
             </div>
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Supplier (Vendor)</label>
                <input v-model="form.supplierCode" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-rose-500 shadow-inner" placeholder="SUPP-001" />
             </div>
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tgl Terbit Tagihan</label>
                <input type="date" v-model="form.invoiceDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-rose-500 shadow-inner" />
             </div>
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-rose-500 uppercase tracking-widest">Batas Bayar (Due Date)</label>
                <input type="date" v-model="form.dueDate" class="w-full border border-rose-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 bg-rose-50 outline-none focus:border-rose-500 shadow-inner" />
             </div>
             <div class="space-y-1 col-span-1 md:col-span-2">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Catatan / Referensi</label>
                <input v-model="form.description" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-500 shadow-inner" placeholder="Catatan pembelian..." />
             </div>
          </div>

          <div class="border rounded-xl mt-6">
            <div class="flex justify-between items-center bg-slate-50 p-3 border-b rounded-t-xl">
               <div class="text-xs font-black uppercase text-slate-700 tracking-wider">Item Hutang</div>
               <Button label="Tambah Baris" size="small" outlined class="h-7 text-[10px] px-3 font-bold" @click="addLine" />
            </div>
            <table class="w-full text-xs">
              <thead class="bg-slate-100 text-slate-600 border-b">
                 <tr>
                    <th class="p-2 text-left w-1/2">Nama Barang / Pengeluaran</th>
                    <th class="p-2 w-20 text-center">Banyak</th>
                    <th class="p-2 w-32 text-right">Harga (Rp)</th>
                    <th class="p-2 w-32 text-right">Subtotal</th>
                    <th class="p-2 w-10"></th>
                 </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="(l, idx) in form.lines" :key="idx" class="bg-white">
                  <td class="p-2"><input v-model="l.description" class="w-full border rounded p-1.5 focus:border-rose-500 outline-none" placeholder="Deskripsi F&B..." /></td>
                  <td class="p-2"><input type="number" v-model.number="l.qty" class="w-full border rounded p-1.5 text-center focus:border-rose-500 outline-none" min="1" @input="updateAmt(l)" /></td>
                  <td class="p-2"><input type="number" v-model.number="l.unitPrice" class="w-full border rounded p-1.5 text-right focus:border-rose-500 outline-none font-mono" min="0" @input="updateAmt(l)" /></td>
                  <td class="p-2"><input type="number" v-model.number="l.amount" class="w-full border rounded p-1.5 text-right bg-slate-50 font-bold font-mono outline-none" readonly /></td>
                  <td class="p-2 text-center"><button class="text-rose-400 hover:text-rose-600 hover:bg-rose-50 w-6 h-6 rounded" title="Hapus" @click="removeLine(idx)">✕</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
           <Button label="Batal" severity="secondary" @click="showDialog = false" class="bg-white text-slate-700 font-bold px-6 shadow-sm border border-slate-300" />
           <Button label="Terbitkan Hutang (AP)" :loading="saving" @click="save" bg="bg-rose-600" class="text-white font-bold px-6 border-none shadow-sm hover:bg-rose-700" icon="pi pi-save" />
        </div>
      </div>
    </div>

    <!-- Payout Dialog -->
    <div v-if="payDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-amber-50 border-amber-100 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-amber-800 flex items-center gap-2"><i class="pi pi-send"></i> Catat Pembayaran Vendor</div>
          </div>
          <button class="text-amber-500 hover:text-amber-700 bg-white shadow-sm w-8 h-8 rounded-full font-bold transition-colors" @click="payDialog = false">✕</button>
        </div>
        
        <div class="p-6 space-y-4 bg-white">
           <div class="bg-rose-50 border border-rose-100 rounded-lg p-3 text-center mb-2">
              <div class="text-[10px] uppercase font-bold text-rose-600 tracking-wider">Membayar Tagihan Outbound</div>
              <div class="font-mono font-black text-rose-900 mt-1">{{ activeInvoiceNo }}</div>
           </div>

           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Uang Kas Keluar (Rp)</label>
              <div class="relative">
                 <div class="absolute left-3 top-2.5 font-black text-amber-600">Rp</div>
                 <input type="number" v-model.number="payForm.amount" class="w-full border-2 border-amber-200 rounded-lg pl-10 pr-3 py-2 text-xl font-black font-mono text-amber-700 bg-amber-50/30 outline-none focus:border-amber-500 shadow-inner" placeholder="0" />
              </div>
           </div>
           
           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tgl Kas Keluar / Transfer</label>
              <input type="date" v-model="payForm.paymentDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-amber-500" />
           </div>

           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Referensi / Bukti Bayar</label>
              <input v-model="payForm.reference" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-amber-500" placeholder="Contoh: BKK-001..." />
           </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
           <Button label="Batal" severity="secondary" @click="payDialog = false" class="bg-white text-slate-700 font-bold px-4 shadow-sm border border-slate-300" />
           <Button label="Posting Pembayaran (KasKeluar)" :loading="paying" @click="pay" class="bg-rose-600 border-none text-white font-bold px-6 shadow-sm hover:bg-rose-700" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.ap.create') || true);

const status = ref('');
const search = ref('');
const loading = ref(false);

const invoices = ref<any[]>([]);
const reconciliation = ref<any[]>([]);

const showDialog = ref(false);
const payDialog = ref(false);
const saving = ref(false);
const paying = ref(false);

const currentInvoiceId = ref('');
const activeInvoiceNo = ref('');

const form = reactive({ 
  invoiceNo: '', 
  supplierCode: '', 
  invoiceDate: new Date().toISOString().slice(0,10), 
  dueDate: '', 
  description: '', 
  lines: [{ description: '', qty: 1, unitPrice: 0, amount: 0 }] 
});

const payForm = reactive({ paymentDate: new Date().toISOString().slice(0,10), amount: 0, reference: '' });

const filteredInvoices = computed(() => {
   let list = invoices.value;
   if(search.value) {
      const q = search.value.toLowerCase();
      list = list.filter(x => 
         x.invoiceNo?.toLowerCase().includes(q) || 
         x.supplierCode?.toLowerCase().includes(q) ||
         x.status?.toLowerCase().includes(q)
      );
   }
   return list;
});

const totalOutstanding = computed(() => {
   return invoices.value.reduce((sum, curr) => sum + (Number(curr.totalAmount) - Number(curr.paidAmount)), 0);
});

const totalPaid = computed(() => {
   return invoices.value.reduce((sum, curr) => sum + Number(curr.paidAmount), 0);
});

const formatRupiah = (val: number | string) => {
   if(!val) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const fmtDate = (d: string) => d?.slice(0, 10) ?? '-';

const isOverdueString = (dueDateStr: string) => {
   if(!dueDateStr) return false;
   return new Date(dueDateStr).getTime() < new Date().getTime();
}

const updateAmt = (line: any) => {
   line.amount = (Number(line.qty) || 0) * (Number(line.unitPrice) || 0);
}

const load = async () => {
  loading.value = true;
  try {
    const params = status.value ? `?status=${status.value}` : '';
    const res = await api.get(`/finance/ap${params}`);
    if (res.data?.invoices) invoices.value = res.data.invoices;
    else if (res.invoices) invoices.value = res.invoices;
  } catch (e) {
    console.warn(e);
  } finally {
    loading.value = false;
  }
};

const loadReconciliation = async () => { 
  try {
    const res = await api.get('/finance/ap/reconciliation'); 
    if (res.data?.reconciliation) reconciliation.value = res.data.reconciliation;
    else if (res.reconciliation) reconciliation.value = res.reconciliation;
  } catch(e) {}
};

const loadAll = async () => {
    await Promise.all([load(), loadReconciliation()]);
}

const addLine = () => form.lines.push({ description: '', qty: 1, unitPrice: 0, amount: 0 });
const removeLine = (idx: number) => form.lines.splice(idx, 1);

const save = async () => {
  saving.value = true;
  try {
    await api.post('/finance/ap', form);
    showDialog.value = false;
    Object.assign(form, { invoiceNo: '', supplierCode: '', description: '', lines: [{ description: '', qty: 1, unitPrice: 0, amount: 0 }] });
    await loadAll();
  } catch(e) {
     alert('Gagal menerbitkan faktur biaya (AP)');
  } finally { 
     saving.value = false; 
  }
};

const openPay = (inv: any) => { 
  currentInvoiceId.value = inv.id; 
  activeInvoiceNo.value = inv.invoiceNo;
  Object.assign(payForm, { 
    paymentDate: new Date().toISOString().slice(0, 10), 
    amount: Number(inv.totalAmount) - Number(inv.paidAmount) || Number(inv.outstanding), 
    reference: '' 
  }); 
  payDialog.value = true; 
};

const pay = async () => {
  paying.value = true;
  try {
    await api.post(`/finance/ap/${currentInvoiceId.value}/payment`, payForm);
    payDialog.value = false;
    await loadAll();
  } catch(e) {
    alert('Gagal mengeksekusi transfer dari kas Bank.');
  } finally { 
    paying.value = false; 
  }
};

onMounted(() => { loadAll(); });
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>