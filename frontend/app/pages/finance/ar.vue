<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-blue-600 relative overflow-hidden">
      <!-- Decorative background icon -->
      <div class="absolute right-[-20px] top-[-20px] opacity-5 pointer-events-none">
        <i class="pi pi-wallet text-[150px] text-blue-900"></i>
      </div>
      
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
        <div>
          <div class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             <i class="pi pi-file-invoice text-blue-600"></i> Accounts Receivable (AR) & Penagihan
          </div>
          <div class="mt-1 text-sm text-slate-600 font-medium">
             Kelola data piutang pelanggan, lacak tunggakan (aging), dan catat penerimaan kasir faktur pembayaran.
          </div>
        </div>
        <div class="flex gap-2">
           <Button v-if="canManage" label="+ Faktur AR Baru" size="small" bg="bg-blue-600" class="text-white font-bold border-none shrink-0 cursor-pointer shadow-sm hover:bg-blue-700" icon="pi pi-plus" @click="showDialog = true" />
        </div>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white border rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Outstanding (AR)</div>
           <div class="text-xl font-black font-mono text-slate-800">{{ formatRupiah(totalOutstanding) }}</div>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Lunas (Paid)</div>
           <div class="text-xl font-black font-mono text-emerald-800">{{ formatRupiah(totalPaid) }}</div>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1">Terutang Berjalan (Open)</div>
           <div class="text-xl font-black font-mono text-amber-800">{{ invoices.filter(x => x.status === 'OPEN').length }} Faktur</div>
        </div>
        <div class="bg-rose-50 border border-rose-200 rounded-lg p-4 shadow-sm">
           <div class="text-[10px] font-bold text-rose-700 uppercase tracking-widest mb-1">Jatuh Tempo (Overdue)</div>
           <div class="text-xl font-black font-mono text-rose-800">{{ invoices.filter(x => x.status === 'OVERDUE').length }} Faktur</div>
        </div>
    </div>

    <!-- Debt Collection (Priority Area) -->
    <div v-if="collection.length > 0" class="rounded-xl border border-rose-200 bg-white shadow-sm overflow-hidden">
      <div class="bg-rose-50 p-4 border-b border-rose-200 flex items-center justify-between">
        <div class="flex items-center gap-2 text-rose-800 font-black">
           <i class="pi pi-exclamation-triangle"></i> Prioritas Penagihan (Debt Collection)
        </div>
        <div class="text-xs font-bold text-rose-700 bg-rose-200/50 px-2 py-1 rounded">
           Terdapat {{ collection.length }} faktur macet
        </div>
      </div>
      <div class="overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-rose-100/30 text-left text-[11px] text-rose-900 font-bold uppercase tracking-wide">
            <tr>
              <th class="px-4 py-2 border-r border-rose-100">Mitra Cabang (Customer)</th>
              <th class="px-3 py-2 border-r border-rose-100">No. Tagihan</th>
              <th class="px-3 py-2 border-r border-rose-100 text-center">Jatuh Tempo</th>
              <th class="px-3 py-2 border-r border-rose-100 text-right">Outstanding (Sisa Hutang)</th>
              <th class="px-3 py-2 border-r border-rose-100 text-center">Telat (Hari)</th>
              <th class="px-4 py-2 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-rose-100 text-xs">
            <tr v-for="c in collection" :key="'col'+c.id" class="transition hover:bg-rose-50/50">
              <td class="px-4 py-3 font-bold text-slate-800 border-r border-rose-50">{{ c.customerCode }}</td>
              <td class="px-3 py-3 font-mono text-slate-600 border-r border-rose-50">{{ c.invoiceNo }}</td>
              <td class="px-3 py-3 text-center text-rose-600 font-bold border-r border-rose-50">{{ fmtDate(c.dueDate) }}</td>
              <td class="px-3 py-3 text-right font-mono font-black text-rose-700 border-r border-rose-50">{{ formatRupiah(c.outstanding) }}</td>
              <td class="px-3 py-3 text-center border-r border-rose-50 flex justify-center items-center h-full">
                 <div :class="{'bg-rose-200 text-rose-900': c.priority === 'HIGH', 'bg-orange-200 text-orange-900': c.priority === 'MEDIUM', 'bg-amber-100 text-amber-800': c.priority === 'LOW'}" 
                      class="px-2 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                    +{{ c.daysOverdue }} Hr
                 </div>
              </td>
              <td class="px-4 py-3 text-center">
                 <Button label="Bayar" size="small" outlined class="text-[10px] h-7 px-2 font-bold text-rose-600 border-rose-300 hover:bg-rose-600 hover:text-white transition-colors" @click="openReceive(c)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Master Invoice List -->
    <div class="rounded-xl border bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border p-3 rounded-lg">
        <div class="flex items-center gap-3 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Faktur / Mitra..." class="w-full md:w-64 text-sm font-mono border-slate-300" />
          <select v-model="status" class="p-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 w-40 outline-none focus:border-blue-500 font-semibold" @change="load">
            <option value="">Semua Status</option>
            <option value="OPEN">OPEN (Belum Bayar)</option>
            <option value="PARTIAL">PARTIAL (Cicilan)</option>
            <option value="PAID">PAID (Lunas)</option>
            <option value="OVERDUE">OVERDUE (Jatuh Tempo)</option>
          </select>
          <Button label="Muat Ulang" severity="secondary" size="small" :disabled="loading" @click="loadAll" icon="pi pi-refresh" />
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-blue-50 text-left text-[11px] text-blue-900 border-b border-blue-100 uppercase tracking-widest font-bold">
            <tr>
              <th class="px-4 py-3 min-w-[150px]">No. Tagihan (AR)</th>
              <th class="px-3 py-3 border-l">Mitra Bisnis</th>
              <th class="px-3 py-3 border-l text-center">Tgl Terbit</th>
              <th class="px-3 py-3 border-l text-center bg-rose-50/50">Tgl Tempo</th>
              <th class="px-4 py-3 bg-slate-50 border-l text-right w-36">Total Tagihan</th>
              <th class="px-4 py-3 bg-emerald-50 border-l text-right w-36">Telah Diklaim</th>
              <th class="px-4 py-3 text-center border-l w-28">Status</th>
              <th class="px-3 py-3 text-center border-l w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative text-[12px]">
             <tr v-if="loading">
              <td colspan="8" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2 text-blue-500"></i> Memuat Laporan Piutang...
              </td>
            </tr>
            <tr v-for="i in filteredInvoices" v-else :key="i.id" class="transition hover:bg-blue-50/20">
              <td class="px-4 py-3 align-middle font-mono font-black text-slate-700">{{ i.invoiceNo }}</td>
              <td class="px-3 py-3 align-middle font-semibold text-slate-800 border-l">{{ i.customerCode }}</td>
              <td class="px-3 py-3 align-middle text-center border-l font-medium text-slate-600">{{ fmtDate(i.invoiceDate) }}</td>
              <td class="px-3 py-3 align-middle text-center border-l font-bold" :class="isOverdueString(i.dueDate) && i.status !== 'PAID' ? 'text-rose-600' : 'text-slate-500'">
                 {{ i.dueDate ? fmtDate(i.dueDate) : '-' }}
              </td>
              <td class="px-4 py-3 align-middle text-right bg-slate-50 border-l font-mono font-black text-slate-800">{{ formatRupiah(i.totalAmount) }}</td>
              <td class="px-4 py-3 align-middle text-right bg-emerald-50/30 border-l font-mono font-black" :class="Number(i.paidAmount) > 0 ? 'text-emerald-700' : 'text-slate-400'">{{ formatRupiah(i.paidAmount) }}</td>
              <td class="px-4 py-3 align-middle text-center border-l">
                 <div :class="{
                    'bg-slate-100 text-slate-600 border-slate-200': i.status === 'OPEN',
                    'bg-blue-100 text-blue-700 border-blue-200': i.status === 'PARTIAL',
                    'bg-emerald-100 text-emerald-700 border-emerald-200': i.status === 'PAID',
                    'bg-rose-100 text-rose-700 border-rose-200': i.status === 'OVERDUE'
                 }" class="px-2 py-1 rounded text-[10px] font-bold tracking-widest border inline-block uppercase shadow-sm">
                    {{ i.status }}
                 </div>
              </td>
              <td class="px-3 py-3 text-center border-l">
                <Button label="Terima Uang" size="small" bg="bg-blue-600" class="text-white text-[10px] border-none px-2 py-1 w-full font-bold hover:bg-blue-700 shadow-sm" :disabled="i.status === 'PAID'" @click="openReceive(i)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredInvoices.length === 0">
              <td colspan="8" class="px-4 py-16 text-center text-slate-400 border-t italic">
                Tidak ada data surat Piutang.
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
             <div class="text-lg font-black text-slate-800">Pembuatan Piutang Manual (AR)</div>
             <div class="text-xs text-slate-500 mt-1">Gunakan form ini hanya jika tagihan tidak turun dari modul Sales Order.</div>
          </div>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full font-bold transition-colors shadow-inner" @click="showDialog = false">✕</button>
        </div>

        <div class="p-6 overflow-auto flex-1 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 px-1">
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">No. Invoice AR</label>
                <input v-model="form.invoiceNo" class="w-full border rounded-lg px-3 py-2 text-sm font-black font-mono text-slate-800 outline-none focus:border-blue-500 shadow-inner" placeholder="AR-INV-..." />
             </div>
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kode Pelanggan (Customer)</label>
                <input v-model="form.customerCode" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 shadow-inner" placeholder="CUST-001" />
             </div>
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tgl Terbit Invoice</label>
                <input type="date" v-model="form.invoiceDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 shadow-inner" />
             </div>
             <div class="space-y-1">
                <label class="text-[11px] font-bold text-rose-500 uppercase tracking-widest">Batas Waktu (Due Date)</label>
                <input type="date" v-model="form.dueDate" class="w-full border border-rose-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 bg-rose-50 outline-none focus:border-rose-500 shadow-inner" />
             </div>
             <div class="space-y-1 col-span-1 md:col-span-2">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Catatan / Deskripsi</label>
                <input v-model="form.description" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 shadow-inner" placeholder="Catatan tagihan..." />
             </div>
          </div>

          <div class="border rounded-xl mt-6">
            <div class="flex justify-between items-center bg-slate-50 p-3 border-b rounded-t-xl">
               <div class="text-xs font-black uppercase text-slate-700 tracking-wider">Item Penagihan</div>
               <Button label="Tambah Baris" size="small" outlined class="h-7 text-[10px] px-3 font-bold" @click="addLine" />
            </div>
            <table class="w-full text-xs">
              <thead class="bg-slate-100 text-slate-600 border-b">
                 <tr>
                    <th class="p-2 text-left w-1/2">Keterangan Item</th>
                    <th class="p-2 w-20 text-center">Qty</th>
                    <th class="p-2 w-32 text-right">Harga (Rp)</th>
                    <th class="p-2 w-32 text-right">Subtotal</th>
                    <th class="p-2 w-10"></th>
                 </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="(l, idx) in form.lines" :key="idx" class="bg-white">
                  <td class="p-2"><input v-model="l.description" class="w-full border rounded p-1.5 focus:border-blue-500 outline-none" placeholder="Deskripsi..." /></td>
                  <td class="p-2"><input type="number" v-model.number="l.qty" class="w-full border rounded p-1.5 text-center focus:border-blue-500 outline-none" min="1" @input="updateAmt(l)" /></td>
                  <td class="p-2"><input type="number" v-model.number="l.unitPrice" class="w-full border rounded p-1.5 text-right focus:border-blue-500 outline-none font-mono" min="0" @input="updateAmt(l)" /></td>
                  <td class="p-2"><input type="number" v-model.number="l.amount" class="w-full border rounded p-1.5 text-right bg-slate-50 font-bold font-mono outline-none" readonly /></td>
                  <td class="p-2 text-center"><button class="text-rose-400 hover:text-rose-600 hover:bg-rose-50 w-6 h-6 rounded" title="Hapus" @click="removeLine(idx)">✕</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl z-20 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
           <Button label="Batal" severity="secondary" @click="showDialog = false" class="bg-white text-slate-700 font-bold px-6 shadow-sm border border-slate-300" />
           <Button label="Terbitkan AR Invoice" :loading="saving" @click="save" bg="bg-blue-600" class="text-white font-bold px-6 border-none shadow-sm hover:bg-blue-700" icon="pi pi-save" />
        </div>
      </div>
    </div>

    <!-- Receive Payment Dialog -->
    <div v-if="receiveDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border bg-white shadow-2xl flex flex-col animate-fade-in-up">
        <div class="p-5 border-b bg-emerald-50 border-emerald-100 flex justify-between items-center rounded-t-2xl">
          <div>
            <div class="text-lg font-black text-emerald-800 flex items-center gap-2"><i class="pi pi-receipt"></i> Terima Kas Pelanggan</div>
          </div>
          <button class="text-emerald-500 hover:text-emerald-700 bg-white shadow-sm w-8 h-8 rounded-full font-bold transition-colors" @click="receiveDialog = false">✕</button>
        </div>
        
        <div class="p-6 space-y-4 bg-white">
           <div class="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center mb-2">
              <div class="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Mencairkan Tagihan</div>
              <div class="font-mono font-black text-blue-900 mt-1">{{ activeInvoiceNo }}</div>
           </div>

           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nominal Diterima (Rp)</label>
              <div class="relative">
                 <div class="absolute left-3 top-2.5 font-black text-emerald-600">Rp</div>
                 <input type="number" v-model.number="receiveForm.amount" class="w-full border-2 border-emerald-200 rounded-lg pl-10 pr-3 py-2 text-xl font-black font-mono text-emerald-700 bg-emerald-50/30 outline-none focus:border-emerald-500 shadow-inner" placeholder="0" />
              </div>
           </div>
           
           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tgl Masuk Bank/Kas</label>
              <input type="date" v-model="receiveForm.paymentDate" class="w-full border rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500" />
           </div>

           <div class="space-y-1">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Referensi / Bukti Transfer</label>
              <input v-model="receiveForm.reference" class="w-full border rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500" placeholder="Contoh: TRF BCA 1209..." />
           </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
           <Button label="Batal" severity="secondary" @click="receiveDialog = false" class="bg-white text-slate-700 font-bold px-4 shadow-sm border border-slate-300" />
           <Button label="Catat Pembayaran (Receive)" :loading="receiving" @click="receive" class="bg-emerald-600 border-none text-white font-bold px-6 shadow-sm hover:bg-emerald-700" icon="pi pi-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('finance.ar.create') || true);

const status = ref('');
const search = ref('');
const loading = ref(false);

const invoices = ref<any[]>([]);
const collection = ref<any[]>([]);

const showDialog = ref(false);
const receiveDialog = ref(false);
const saving = ref(false);
const receiving = ref(false);

const currentInvoiceId = ref('');
const activeInvoiceNo = ref('');

const form = reactive({ 
  invoiceNo: '', 
  customerCode: '', 
  invoiceDate: new Date().toISOString().slice(0,10), 
  dueDate: '', 
  description: '', 
  lines: [{ description: '', qty: 1, unitPrice: 0, amount: 0 }] 
});

const receiveForm = reactive({ paymentDate: new Date().toISOString().slice(0,10), amount: 0, reference: '' });

const filteredInvoices = computed(() => {
   let list = invoices.value;
   if(search.value) {
      const q = search.value.toLowerCase();
      list = list.filter(x => 
         x.invoiceNo?.toLowerCase().includes(q) || 
         x.customerCode?.toLowerCase().includes(q) ||
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
    const res = await api.get(`/finance/ar${params}`);
    if (res.data?.invoices) invoices.value = res.data.invoices;
    else if (res.invoices) invoices.value = res.invoices;
  } catch (e) {
    console.warn(e);
  } finally {
    loading.value = false;
  }
};

const loadCollection = async () => { 
  try {
    const res = await api.get('/finance/ar/debt-collection'); 
    if (res.data?.collection) collection.value = res.data.collection;
    else if (res.collection) collection.value = res.collection;
  } catch(e) {}
};

const loadAll = async () => {
    await Promise.all([load(), loadCollection()]);
}

const addLine = () => form.lines.push({ description: '', qty: 1, unitPrice: 0, amount: 0 });
const removeLine = (idx: number) => form.lines.splice(idx, 1);

const save = async () => {
  saving.value = true;
  try {
    // Generik payload
    await api.post('/finance/ar', form);
    showDialog.value = false;
    Object.assign(form, { invoiceNo: '', customerCode: '', description: '', lines: [{ description: '', qty: 1, unitPrice: 0, amount: 0 }] });
    await loadAll();
  } catch(e) {
     alert('Gagal menerbitkan faktur AR');
  } finally { 
     saving.value = false; 
  }
};

const openReceive = (inv: any) => { 
  currentInvoiceId.value = inv.id; 
  activeInvoiceNo.value = inv.invoiceNo;
  Object.assign(receiveForm, { 
    paymentDate: new Date().toISOString().slice(0, 10), 
    amount: Number(inv.totalAmount) - Number(inv.paidAmount) || Number(inv.outstanding), 
    reference: '' 
  }); 
  receiveDialog.value = true; 
};

const receive = async () => {
  receiving.value = true;
  try {
    await api.post(`/finance/ar/${currentInvoiceId.value}/payment`, receiveForm);
    receiveDialog.value = false;
    await loadAll();
  } catch(e) {
    alert('Gagal memproses penerimaan kasir.');
  } finally { 
    receiving.value = false; 
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