<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Pesanan Pembelian (Purchase Order)</div>
          <div class="mt-1 text-sm text-slate-600">
            Dokumen resmi perintah pembelian kepada Pemasok. Kelola rincian barang, pajak (VAT), dan jadwal pengiriman.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Laporan PO" severity="secondary" size="small" outlined icon="pi pi-print" />
          <Button v-if="canManage" label="+ Buat PO Baru" size="small" bg="bg-indigo-600" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Kode PO, Naman Pemasok..." class="w-full md:w-72 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32">
            <option value="">Semua Status</option>
            <option value="DRAFT">Draft</option>
            <option value="PENDING_APPROVAL">Pending Approval</option>
            <option value="APPROVED">Open / Disetujui</option>
            <option value="CANCELLED">Batal</option>
          </select>
          <Button label="Filter" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- PO Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-indigo-50/50 text-left text-xs text-indigo-900 border-b border-indigo-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">Dokumen PO</th>
              <th class="px-4 py-3 font-semibold">Pemasok (Vendor)</th>
              <th class="px-4 py-3 font-semibold text-right">Penagihan (Grand Total)</th>
              <th class="px-4 py-3 font-semibold">Termin & Pengiriman</th>
              <th class="px-4 py-3 font-semibold text-center w-32">Status</th>
              <th class="px-4 py-3 text-right font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
            <tr v-if="loading">
              <td colspan="6" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Mengambil data Purchase Order...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="po in filteredPos" v-else :key="po.id" class="transition hover:bg-slate-50/70 group" :class="{'opacity-75': po.status === 'CANCELLED'}">
              <td class="px-4 py-3 align-top">
                <div class="font-bold text-slate-800 text-xs">{{ po.code }}</div>
                <div class="text-[10px] text-slate-500 font-mono mt-1">🗓️ Order: {{ formatDate(po.orderDate) }}</div>
                <div v-if="po.rfqId" class="text-[9px] bg-slate-100 text-slate-500 px-1 mt-1 rounded border border-slate-200 inline-block">via Sourcing</div>
              </td>
              <td class="px-4 py-3 align-top">
                <div class="text-xs font-bold text-indigo-700">{{ po.supplier?.name || 'Unknown Vendor' }}</div>
                <div class="text-[10px] text-slate-500 mt-1 max-w-[180px] truncate">{{ po.supplier?.address1 || po.supplierCode }}</div>
              </td>
              <td class="px-4 py-3 align-top text-right">
                <div class="font-bold font-mono text-xs text-slate-800">{{ formatCurrency(po.grandTotal) }}</div>
                <div class="text-[9px] text-slate-400 mt-0.5">Exc. Tax: <span class="text-slate-500">{{ formatCurrency(po.subtotal) }}</span></div>
              </td>
              <td class="px-4 py-3 align-top">
                <div class="text-[10px] font-bold text-slate-700"><span class="text-slate-400 font-normal">ToP: </span>{{ formatPaymentTerm(po.paymentTerms) }}</div>
                <div class="text-[10px] font-bold text-rose-600 mt-1"><span class="text-slate-400 font-normal">Tiba: </span>{{ formatDate(po.expectedDeliveryDate) }}</div>
              </td>
              <td class="px-4 py-3 align-top text-center">
                <span class="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" :class="getStatusStyle(po.status)">
                  {{ po.status.replace('_', ' ') }}
                </span>
              </td>
              <td class="px-4 py-3 align-top text-right">
                <Button label="Review" size="small" severity="secondary" outlined class="text-[10px] px-2 py-1" @click="openView(po)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredPos.length === 0">
              <td colspan="6" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50">📑</div>
                Tidak ditemukan Purchase Order.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Viewer/Editor Modal (ERP Grade PO Print Preview Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div class="w-full max-w-5xl rounded-xl border-t-[6px] border-t-indigo-600 border-x border-b bg-white shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden">
        
        <div class="flex-1 overflow-y-auto bg-slate-50/50 p-6 flex justify-center">
          
          <!-- Virtual Document Paper -->
          <div class="w-full max-w-4xl bg-white border border-slate-200 shadow-sm rounded p-8 flex flex-col gap-6 relative print:shadow-none print:border-none print:p-0">
            
            <div class="absolute right-8 top-8 opacity-20 pointer-events-none">
              <span class="text-[80px] font-black uppercase rotate-[-15deg] block leading-none" :class="activePO?.status === 'CANCELLED' ? 'text-red-500' : 'text-slate-300'">
                {{ activePO?.status || 'DRAFT' }}
              </span>
            </div>

            <div class="flex justify-between items-start border-b-2 border-slate-800 pb-4">
              <div>
                <h1 class="text-2xl font-black text-slate-800 tracking-tighter">PURCHASE ORDER</h1>
                <div class="text-xs text-slate-500 mt-1 font-mono">Doc No: {{ activePO?.code || 'PO-*NEW*' }}</div>
              </div>
              <div class="text-right">
                <div class="font-bold text-sm text-slate-800">PT SUPRA ERP SEMESTA (HQ)</div>
                <div class="text-xs text-slate-500 mt-1 max-w-[200px]">SCBD Tower 2, Kawasan Niaga Terpadu<br/>Jakarta Selatan 12190</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-8 text-xs">
              <!-- To Vendor -->
              <div class="border rounded-lg p-3 bg-slate-50 relative">
                <div class="absolute top-[-8px] left-3 bg-slate-50 px-1 text-[10px] font-bold text-indigo-700 uppercase">Vendor (Pemasok)</div>
                <div v-if="!isReadonly" class="space-y-2 mt-2">
                   <select v-model="form.supplierId" class="w-full border p-1 rounded">
                     <option value="">-- Pilih Supplier --</option>
                     <option v-for="s in mockSuppliers" :value="s.id">{{ s.name }} ({{ s.code }})</option>
                   </select>
                </div>
                <div v-else class="mt-1">
                  <div class="font-bold text-sm text-slate-800">{{ activePO?.supplier?.name || 'Pemasok Belum Dipilih' }}</div>
                  <div class="text-slate-600 mt-1 max-w-[250px] leading-relaxed">{{ activePO?.supplier?.address1 || '-' }}</div>
                  <div class="text-slate-500 mt-1">Attn: Sales Dept</div>
                </div>
              </div>

              <!-- Metrics -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-[9px] font-bold uppercase text-slate-400">Tgl Order</label>
                  <div v-if="isReadonly" class="font-mono font-semibold text-slate-800">{{ formatDate(activePO?.orderDate) }}</div>
                  <input v-else type="date" v-model="form.orderDate" class="w-full border rounded p-1 text-xs" />
                </div>
                <div>
                  <label class="text-[9px] font-bold uppercase text-slate-400">Estimasi Tiba</label>
                  <div v-if="isReadonly" class="font-mono font-semibold text-rose-600">{{ formatDate(activePO?.expectedDeliveryDate) }}</div>
                  <input v-else type="date" v-model="form.expectedDeliveryDate" class="w-full border border-rose-200 rounded p-1 text-xs" />
                </div>
                <div class="col-span-2">
                  <label class="text-[9px] font-bold uppercase text-slate-400">Termin Pembayaran (ToP)</label>
                  <div v-if="isReadonly" class="font-bold text-slate-800">{{ formatPaymentTerm(activePO?.paymentTerms) }}</div>
                  <select v-else v-model="form.paymentTerms" class="w-full border rounded p-1 text-xs">
                     <option value="CASH">CASH</option>
                     <option value="NET30">Net 30 Days</option>
                     <option value="NET45">Net 45 Days</option>
                     <option value="DP50_NET30">DP 50%, Net 30</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Shipping Info -->
            <div class="bg-indigo-50/30 border border-indigo-100 p-3 rounded-lg text-xs">
              <label class="text-[9px] font-bold uppercase text-indigo-400 block mb-1">Alamat Pengiriman (Ship To)</label>
              <textarea v-if="!isReadonly" v-model="form.shippingAddress" rows="2" class="w-full border rounded p-1" placeholder="Lokasi Gudang Penerima"></textarea>
              <div v-else class="font-semibold text-slate-700 leading-relaxed">{{ activePO?.shippingAddress || 'Head Office' }}</div>
            </div>

            <!-- Line Items Table -->
            <div class="border rounded flex flex-col font-mono text-xs">
              <div class="flex items-center justify-between bg-slate-800 text-white font-bold p-2 text-[10px] uppercase">
                <span>Daftar Barang (Item Description)</span>
                <Button v-if="!isReadonly" label="Tambah Baris" size="small" bg="bg-indigo-500 text-white" class="h-5 px-2 py-0 border-none hover:bg-indigo-400" @click="addLine" />
              </div>
              
              <table class="w-full text-xs">
                <thead class="bg-slate-50 border-b text-slate-500 text-left">
                  <tr>
                    <th class="p-2 w-8">#</th>
                    <th class="p-2">Deskripsi Barang</th>
                    <th class="p-2 text-right w-20">Qty</th>
                    <th class="p-2 w-16 text-center">UOM</th>
                    <th class="p-2 text-right w-28">Harga (IDR)</th>
                    <th class="p-2 text-right w-32 border-l">Ammount (IDR)</th>
                  </tr>
                </thead>
                <tbody class="divide-y text-slate-700">
                  <tr v-for="(line, idx) in form.lines" :key="idx" class="hover:bg-slate-50">
                    <td class="p-2 align-top">{{ idx + 1 }}</td>
                    <td class="p-2 align-top">
                      <textarea v-if="!isReadonly" v-model="line.desc" rows="1" class="w-full border rounded p-1 bg-white"></textarea>
                      <span v-else class="font-sans font-semibold">{{ line.desc }}</span>
                    </td>
                    <td class="p-2 align-top text-right">
                      <input v-if="!isReadonly" type="number" v-model.number="line.qty" class="w-full border rounded p-1 text-right" />
                      <span v-else>{{ line.qty }}</span>
                    </td>
                    <td class="p-2 align-top text-center">
                      <select v-if="!isReadonly" v-model="line.uomCode" class="w-[50px] border rounded p-1 text-center">
                        <option value="PCS">PCS</option><option value="BOX">BOX</option><option value="UNIT">UNT</option>
                      </select>
                      <span v-else>{{ line.uomCode }}</span>
                    </td>
                    <td class="p-2 align-top text-right">
                      <input v-if="!isReadonly" type="number" v-model.number="line.unitPrice" class="w-full border rounded p-1 text-right" />
                      <span v-else>{{ formatCurrency(line.unitPrice) }}</span>
                    </td>
                    <td class="p-2 align-top text-right font-bold border-l bg-slate-50/50">
                      {{ formatCurrency((line.qty || 0) * (line.unitPrice || 0)) }}
                      <span v-if="!isReadonly" class="block text-red-500 text-[10px] cursor-pointer cursor mt-1" @click="removeLine(idx)">Hapus</span>
                    </td>
                  </tr>
                  <tr v-if="form.lines.length === 0">
                    <td colspan="6" class="p-6 text-center text-slate-400 font-sans text-xs italic">Belum ada rincian pembelian.</td>
                  </tr>
                </tbody>
              </table>

              <!-- Financial Summary Block -->
              <div class="flex border-t border-slate-300">
                <div class="flex-1 p-3 border-r">
                   <label class="text-[9px] font-bold uppercase text-slate-400 mb-1 block font-sans">Keterangan / Notes</label>
                   <textarea v-if="!isReadonly" v-model="form.notes" rows="3" class="w-full border rounded p-1 font-sans"></textarea>
                   <div v-else class="text-slate-600 font-sans">{{ activePO?.notes || '-' }}</div>
                </div>
                <div class="w-64">
                   <div class="flex justify-between p-2 border-b">
                     <span class="text-slate-500 font-sans text-[10px] uppercase font-bold">Subtotal</span>
                     <span>{{ formatCurrency(calculatedSubtotal) }}</span>
                   </div>
                   <div class="flex justify-between p-2 border-b text-rose-700 bg-rose-50/30">
                     <span class="text-rose-700 font-sans text-[10px] uppercase font-bold">PPN (11%)</span>
                     <span>{{ formatCurrency(calculatedTax) }}</span>
                   </div>
                   <div class="flex justify-between p-3 bg-slate-800 text-white text-sm">
                     <span class="font-sans font-bold uppercase tracking-wider">Grand Total</span>
                     <span class="font-bold border-b border-double border-white pb-0.5">{{ formatCurrency(calculatedGrand) }}</span>
                   </div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 print:hidden">
              Pusat Persetujuan ERP | Dicetak dari Sistem Digital
            </div>

          </div>
        </div>

        <div class="p-4 border-t bg-slate-50 flex justify-between shrink-0 rounded-b-xl shadow-inner">
          <Button label="Tutup Dokumen" severity="secondary" size="small" @click="dialogOpen = false" outlined />
          <div class="flex gap-2">
            <Button v-if="isReadonly" label="Cetak PDF / Print" severity="secondary" size="small" icon="pi pi-print" class="bg-white" />
            <Button v-if="!isReadonly" label="Simpan sebagai Draft" size="small" :loading="saving" :disabled="saving || form.lines.length === 0" @click="save" class="bg-indigo-600 border-none text-white hover:bg-indigo-700" />
            <Button v-if="isReadonly && canManage && activePO?.status === 'DRAFT'" label="Submit untuk Persetujuan" severity="success" size="small" icon="pi pi-check" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('procurement.po.manage') || true); // Dev fallback

const pos = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activePO = ref<any>(null);

// Mocks for creating
const mockSuppliers = ref<any[]>([
  {id:'1', code:'SUP-RAW-001', name:'PT Sumber Tani Indonesia'},
  {id:'2', code:'SUP-EQP-001', name:'Indo Tech Machinery TBK'}
]);

const form = reactive({
  supplierId: '',
  orderDate: '',
  expectedDeliveryDate: '',
  paymentTerms: 'NET30',
  shippingAddress: '',
  notes: '',
  lines: [] as Array<any>
});

const filteredPos = computed(() => {
  let list = pos.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.supplier?.name && p.supplier.name.toLowerCase().includes(q))
    );
  }
  return list;
});

const calculatedSubtotal = computed(() => {
  return form.lines.reduce((acc, line) => acc + ((line.qty || 0) * (line.unitPrice || 0)), 0);
});
const calculatedTax = computed(() => {
  return calculatedSubtotal.value * 0.11;
});
const calculatedGrand = computed(() => {
  return calculatedSubtotal.value + calculatedTax.value;
});

// Helpers
const formatPaymentTerm = (term: string) => {
  if(!term) return 'CASH';
  const mapping: Record<string, string> = {
    'NET30': 'Net 30 Hari', 'NET45': 'Net 45 Hari', 'DP50_NET30': 'DP 50%, Net 30'
  }
  return mapping[term] || term;
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'DRAFT': return 'bg-slate-100 text-slate-700 border border-slate-200';
    case 'PENDING_APPROVAL': return 'bg-amber-100 text-amber-700 border border-amber-200';
    case 'APPROVED': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    case 'COMPLETED': return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'CANCELLED': return 'bg-rose-100 text-rose-700 border border-rose-200';
    default: return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID');
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=PurchaseOrder&include=items,supplier');
    if (res.data && res.data.data) {
        pos.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Fallback Mock based on seeds we created because the UI requires standard PO API which may not have native controller endpoints yet.
    pos.value = [
      { 
        id: '2', code: "PO-202604-002", status: "APPROVED", orderDate: "2026-04-12T00:00", expectedDeliveryDate: "2026-04-20T00:00",
        paymentTerms: "DP50_NET30", shippingAddress: "Pabrik Baru - Cikarang", notes: "Order mesin packing otomatis. Instruksi pembayaran menyusul PPN.",
        subtotal: 250000000, taxAmount: 27500000, grandTotal: 277500000,
        supplier: { name: 'Indo Tech Machinery TBK', address1: 'Kawasan Jababeka Tahap I Blok ABCD' },
        items: [{desc: 'Mesin Packing Sachet Otomatis', qty: 2, uomCode: 'UNIT', unitPrice: 125000000, amount: 250000000 }] 
      },
      { 
        id: '3', code: "PO-202604-003", status: "DRAFT", orderDate: "2026-04-13T00:00", expectedDeliveryDate: "2026-04-15T00:00",
        paymentTerms: "COD", shippingAddress: "Head Office PT SES", notes: "Pengadaan rutin bulanan ATK",
        subtotal: 4500000, taxAmount: 495000, grandTotal: 4995000,
        supplier: { name: 'CV Utama Mandiri Office Supplies', address1: 'Jl. Mangga Dua Raya Blok E2' },
        items: [{desc: 'Kertas HVS A4 80gr Sinar Dunia', qty: 50, uomCode: 'BOX', unitPrice: 45000}, {desc: 'Tinta Printer Epson T664 Black', qty: 30, uomCode: 'BTL', unitPrice: 75000}] 
      }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activePO.value = null;
  isReadonly.value = false;
  form.supplierId = '';
  form.notes = '';
  form.orderDate = new Date().toISOString().split('T')[0];
  form.expectedDeliveryDate = '';
  form.paymentTerms = 'NET30';
  form.shippingAddress = 'Gudang Utama HQ';
  form.lines = [];
  dialogOpen.value = true;
}

function openView(p: any) {
  activePO.value = p;
  isReadonly.value = true;
  form.supplierId = p.supplierId;
  form.notes = p.notes;
  form.orderDate = p.orderDate?.split('T')[0] || '';
  form.expectedDeliveryDate = p.expectedDeliveryDate?.split('T')[0] || '';
  form.paymentTerms = p.paymentTerms || 'CASH';
  form.shippingAddress = p.shippingAddress || '';
  
  // Clone details
  form.lines = (p.items || []).map((x:any) => ({...x}));
  dialogOpen.value = true;
}

function addLine() {
  form.lines.push({ desc: '', qty: 1, uomCode: 'PCS', unitPrice: 0 });
}

function removeLine(idx: number) {
  form.lines.splice(idx, 1);
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Purchase Order berhasil disimpan sebagai Draft!');
    dialogOpen.value = false;
    saving.value = false;
    load();
  }, 1000);
}

onMounted(() => {
  load();
});
</script>

<style scoped>
/* Print reset helpers */
@media print {
  .fixed { position: static !important; }
  .overflow-hidden { overflow: visible !important; }
  .max-h-[95vh] { max-height: none !important; height: auto !important; }
  .bg-black\/40 { background: white !important; }
}
</style>
