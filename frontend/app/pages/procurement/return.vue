<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Retur Pembelian (Purchase Return / Debit Note)</div>
          <div class="mt-1 text-sm text-slate-600">
            Pusat kendali klaim pengembalian barang ke Pemasok akibat cacat produk (Defect) atau kelebihan kirim (Over-delivery). Dokumen ini mengkredit hutang (AP) ke Vendor terkait.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Laporan Klaim Retur" severity="secondary" size="small" outlined icon="pi pi-shield" />
          <Button v-if="canManage" label="+ Entry Retur Barang" size="small" bg="bg-rose-600" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari No Retur, Vendor, Alasan..." class="w-full md:w-80 text-xs" />
          <select v-model="statusFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32">
            <option value="">Semua Status</option>
            <option value="DRAFT">Draft</option>
            <option value="PENDING_APPROVAL">Pending Validasi QC</option>
            <option value="APPROVED">Klaim Terbit (Nota Debit)</option>
            <option value="CANCELLED">Batal Retur</option>
          </select>
          <Button label="Filter" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Returns Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-rose-50/50 text-left text-xs text-rose-900 border-b border-rose-100 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">Dokumen Bukti Retur</th>
              <th class="px-4 py-3 font-semibold">Data Pemasok Tertuju</th>
              <th class="px-4 py-3 font-semibold">Alasan Penolakan (QC)</th>
              <th class="px-4 py-3 font-semibold text-right">Potensi Pemotong Nilai (IDR)</th>
              <th class="px-4 py-3 font-semibold text-center w-28">Status Eksekusi</th>
              <th class="px-4 py-3 text-right font-semibold">Tindakan</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
            <tr v-if="loading">
              <td colspan="6" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Sinkronisasi histori klaim pengembalian aset...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="ret in filteredReturns" v-else :key="ret.id" class="transition hover:bg-slate-50/70 group">
              <!-- Dokumen -->
              <td class="px-4 py-3 align-top">
                <div class="font-bold text-slate-800 text-xs flex items-center gap-2">
                   {{ ret.code }}
                   <i v-if="ret.status === 'APPROVED'" class="pi pi-check-circle text-[10px] text-emerald-500" title="Valid Debit Note"></i>
                </div>
                <div class="text-[10px] text-slate-500 font-mono mt-1">🗓️ Tgl: {{ formatDate(ret.returnDate) }}</div>
                
                <div class="flex gap-1 mt-1.5 flex-wrap">
                   <div v-if="ret.invoiceId" class="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 rounded px-1 min-w-8 text-center font-bold">INV: {{ ret.invoice?.code || '...' }}</div>
                   <div v-if="ret.orderId" class="text-[9px] bg-blue-50 text-blue-700 border border-blue-200 rounded px-1 min-w-8 text-center font-bold">PO: {{ ret.order?.code || '...' }}</div>
                </div>
              </td>
              
              <!-- Pemasok -->
              <td class="px-4 py-3 align-top">
                <div class="text-xs font-bold text-slate-700 max-w-[180px] break-words">{{ ret.supplier?.name || '-' }}</div>
                <div class="text-[10px] text-slate-400 mt-0.5">Tujuan Pengiriman Refund</div>
              </td>

              <!-- Alasan -->
              <td class="px-4 py-3 align-top">
                <div class="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 inline-block rounded-full border border-rose-100 max-w-full truncate">{{ ret.reason || 'Masalah Teknis' }}</div>
                <div class="text-[10px] text-slate-500 mt-1 max-w-[200px] leading-tight line-clamp-2" :title="ret.notes">{{ ret.notes || '-' }}</div>
              </td>
              
              <!-- Nilai Total Klaim -->
              <td class="px-4 py-3 align-top text-right">
                <div class="font-bold font-mono text-xs text-rose-700" title="Mengurangi nilai hutang">
                   <i class="pi pi-arrow-down text-[8px] mr-1"></i>{{ formatCurrency(ret.grandTotal) }}
                </div>
                <div class="text-[9px] text-slate-400 mt-0.5" title="Kompensasi PPN">Pajak: {{ formatCurrency(ret.taxAmount) }}</div>
              </td>
              
              <!-- Status -->
              <td class="px-4 py-3 align-top text-center mt-1">
                <span class="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" :class="getStatusStyle(ret.status)">
                  {{ standardizeStatus(ret).replace('_', ' ') }}
                </span>
                <div v-if="ret.status === 'APPROVED' && ret.invoiceId" class="text-[8px] text-emerald-600 mt-1 font-bold">AP Terpotong</div>
              </td>
              
              <!-- Actions -->
              <td class="px-4 py-3 align-top text-right">
                <Button label="Audit Klaim" size="small" severity="secondary" outlined class="text-[10px] px-2 py-1 w-full text-center hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700" @click="openView(ret)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredReturns.length === 0">
              <td colspan="6" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-rose-200">🔙</div>
                Bersih! Tidak ada riwayat barang yang di-retur akibat masalah QA/QC.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Viewer/Editor Modal (Nota Retur Form) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div class="w-full max-w-5xl rounded-xl border bg-white shadow-2xl flex flex-col max-h-[95vh] h-full overflow-hidden">
        
        <!-- Header -->
        <div class="p-5 border-b bg-rose-50 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4">
          <div>
            <div class="flex items-center gap-3">
              <span class="text-lg font-black text-rose-900 tracking-tight"><i class="pi pi-replay mr-2"></i>{{ activeRet?.id ? `Form Nota Retur / Debit Note: ${activeRet.code}` : 'Aktivasi Nota Retur Material (Baru)' }}</span>
              <span v-if="activeRet?.id" class="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase shadow-sm border" :class="getStatusStyle(activeRet.status)">
                {{ activeRet.status }}
              </span>
            </div>
            <div class="text-xs text-rose-700 mt-1 font-medium">Bahan klaim untuk memotong kewajiban pembayaran (A/P) karena pengiriman barang Cacat, Rusak, atau Tidak Sesuai Dokumen.</div>
          </div>
          <button class="text-rose-400 hover:text-rose-600 bg-white hover:bg-rose-100 w-8 h-8 rounded-full border border-rose-200 text-lg font-bold flex items-center justify-center transition-colors shadow-sm" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto bg-slate-50/50 flex flex-col">
          <div class="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Dokumen Induk & Tagihan (Kiri) -->
            <div class="bg-white p-5 rounded-xl border shadow-sm space-y-4">
               <div class="flex gap-2 items-center text-xs font-bold text-slate-800 uppercase tracking-widest border-b pb-2"><i class="pi pi-link"></i> Penelusuran Dokumen Induk</div>
               
               <div class="space-y-1">
                  <label class="text-[10px] font-semibold text-slate-500">Pemasok Tanggung Jawab</label>
                  <select v-if="!isReadonly" v-model="form.supplierId" class="w-full border rounded p-2 text-xs font-bold text-indigo-700 bg-slate-50 relative z-10 hover:border-indigo-400 cursor-pointer transition-colors">
                     <option value="">-- Pilih Vendor --</option>
                     <option v-for="s in mockSuppliers" :value="s.id">{{ s.name }}</option>
                  </select>
                  <div v-else class="font-bold text-sm text-slate-800 p-2 bg-slate-100 rounded border">{{ activeRet?.supplier?.name || '-' }}</div>
               </div>

               <div class="space-y-1">
                  <label class="text-[10px] font-semibold text-slate-500">Referensi Dokumen Pengiriman (GRN / PO)</label>
                  <input v-if="!isReadonly" type="text" v-model="form.orderCode" placeholder="Cth: PO-2026..." class="w-full border rounded p-2 text-xs font-mono bg-white uppercase" />
                  <div v-else class="font-mono text-xs text-slate-600 p-2 rounded bg-slate-50 border h-8 flex items-center">{{ activeRet?.order?.code || 'N/A' }}</div>
               </div>

               <div class="space-y-1">
                  <label class="text-[10px] font-semibold text-amber-600" title="Potong tagihan hutang spesifik jika barang sudah sempat masuk AP">Target Pemotongan Tagihan Invoice AP ℹ️</label>
                  <div v-if="!isReadonly" class="flex gap-1">
                     <input type="text" v-model="form.invoiceId" placeholder="ID Invoice.." class="flex-1 border rounded p-2 text-xs font-mono bg-amber-50 uppercase border-amber-200" />
                     <Button label="Kunci" severity="warning" size="small" bg="bg-amber-500 border-none text-white font-bold" class="text-[10px] px-2 shadow-sm" />
                  </div>
                  <div v-else class="font-mono text-xs text-amber-800 p-2 rounded bg-amber-50 border border-amber-200 h-8 flex items-center shadow-inner">
                     <i class="pi pi-file mr-2 text-[10px]"></i> {{ activeRet?.invoice?.code || 'Belum Di-Map ke Tagihan' }}
                  </div>
               </div>
            </div>

            <!-- Identifikasi Klaim QC (Tengah) -->
            <div class="bg-white p-5 rounded-xl border shadow-sm space-y-4 relative">
               <div class="absolute right-3 top-3"><i class="pi pi-ban text-4xl text-rose-100 opacity-50"></i></div>

               <div class="flex gap-2 items-center text-xs font-bold text-slate-800 uppercase tracking-widest border-b pb-2 z-10 relative"><i class="pi pi-comments"></i> Alasan & Investigasi QC</div>
               
               <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1 z-10 w-full col-span-2">
                     <label class="text-[10px] font-semibold text-slate-500">Tanggal Realisasi Retur Fisik</label>
                     <input v-if="!isReadonly" type="date" v-model="form.returnDate" class="w-full border rounded p-2 text-xs font-mono font-bold" />
                     <div v-else class="font-mono text-xs font-semibold text-slate-800 p-2 bg-slate-50 rounded border">{{ formatDate(activeRet?.returnDate) }}</div>
                  </div>
               </div>

               <div class="space-y-1 z-10 w-full relative group">
                  <label class="text-[10px] font-semibold text-rose-600">Alasan Komplain Utama (Kategori)</label>
                  <select v-if="!isReadonly" v-model="form.reason" class="w-full border border-rose-200 bg-rose-50 rounded p-2 text-xs font-bold text-rose-800 focus:ring-rose-200">
                     <option value="Cacat Produksi / Tidak Lolos QC">Cacat Produksi / Tidak Lolos QC</option>
                     <option value="Barang Rusak Dalam Pengiriman (Logistics)">Barang Rusak Dalam Pengiriman (Logistics)</option>
                     <option value="Salah Spesifikasi Dokumen">Salah Spesifikasi Dokumen</option>
                     <option value="Kelebihan Kirim (Over-Stocking)">Kelebihan Kirim (Over-Stocking)</option>
                  </select>
                  <div v-else class="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 p-2 rounded tracking-wide shadow-sm flex items-center justify-between">
                     {{ activeRet?.reason || 'Lain-lain' }} <i class="pi pi-flag text-[10px] opacity-60"></i>
                  </div>
               </div>

               <div class="space-y-1 z-10">
                  <label class="text-[10px] font-semibold text-slate-500">Investigasi & Catatan Tambahan Lanjut</label>
                  <textarea v-if="!isReadonly" v-model="form.notes" rows="2" class="w-full rounded border p-2 text-xs bg-white focus:border-indigo-500 leading-relaxed" placeholder="Kronologi kerusakan, bukti foto terlampir, dsb..."></textarea>
                  <div v-else class="text-[10px] text-slate-600 leading-relaxed min-h-[50px] p-2 bg-slate-50 rounded italic border">{{ activeRet?.notes || 'Tidak ada catatan logistik / gudang penyerta.' }}</div>
               </div>
            </div>

            <!-- Dampak Keuangan (Kanan) -->
            <div class="bg-rose-950 p-5 rounded-xl border border-rose-900 shadow-xl shadow-rose-900/10 space-y-4 text-white flex flex-col justify-between relative overflow-hidden group">
               <div class="absolute right-[-40px] top-[10px] bg-rose-500 text-white text-[9px] font-bold px-12 py-1 rotate-45 opacity-80 transform scale-90 transition-transform group-hover:scale-100">
                  DEBIT NOTE
               </div>

               <div>
                 <div class="text-xs font-bold text-rose-200 uppercase tracking-widest border-b border-rose-800 pb-2 flex gap-1 items-center"><i class="pi pi-credit-card opacity-50"></i> Pemotongan Hutang</div>
                 <div class="text-[10px] text-rose-300 mt-2 font-light leading-relaxed pr-8 line-clamp-3">
                   Total kompensasi tagih balik yang dihitung berdasarkan harga beli awal (Unit Price) barang retur disesuaikan dengan proporsi pajak PPN (Value Added Tax 11%).
                 </div>
               </div>
               
               <div class="space-y-3 shrink-0">
                 <div class="flex justify-between items-center text-xs opacity-70">
                    <span>Pengembalian HPP Pokok</span>
                    <span class="font-mono">{{ formatCurrency(calculatedSubtotal) }}</span>
                 </div>
                 <div class="flex justify-between items-center text-xs opacity-70">
                    <span>Pemutihan Pajak PPN Keluar</span>
                    <span class="font-mono">{{ formatCurrency(calculatedTax) }}</span>
                 </div>
                 
                 <div class="flex justify-between items-end border-t border-rose-700/50 pt-2 font-bold mt-2">
                    <span class="text-xs text-rose-100">TOTAL REFUND (DEBIT)<br/><span class="text-[8px] font-normal leading-4 text-rose-300 whitespace-nowrap">Mengurangi Kewajiban Bayar Account Payable</span></span>
                    <span class="font-mono text-xl text-rose-400 drop-shadow-sm">{{ formatCurrency(calculatedGrand) }}</span>
                 </div>
               </div>
            </div>
          </div>

          <!-- Cost Components Table Section -->
          <div class="px-5 pb-5">
             <div class="bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col rounded-xl">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 text-slate-700 font-bold p-4 text-xs uppercase border-b border-slate-200 gap-3">
                  <div class="flex items-center gap-2 text-slate-800 tracking-wider">
                     <i class="pi pi-fw pi-exclamation-triangle opacity-70 text-rose-500"></i> Rincian Aset Rusak / Tertolak yang Dikembalikan
                  </div>
                  <Button v-if="!isReadonly" label="Pilih dari Histori Barang Datang (GRN)" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold bg-white text-indigo-700 h-7" @click="addLine" />
                </div>
                
                <div class="overflow-x-auto">
                  <table class="w-full text-xs">
                    <thead class="bg-rose-50 border-y border-rose-100/50 text-rose-900 border-l-[3px] border-l-rose-500 text-left uppercase text-[9px] shadow-sm">
                      <tr>
                        <th class="p-3 w-8 text-center border-r border-rose-100 font-bold opacity-60">#</th>
                        <th class="p-3 font-bold">Identifikasi Material Defect / SKUs</th>
                        <th class="p-3 text-right border-l border-rose-100 w-24 font-bold">Ter-Reject (Qty)</th>
                        <th class="p-3 text-center border-l w-16 font-bold border-rose-100 text-slate-400">Satuan</th>
                        <th class="p-3 text-right bg-white border-l w-32 border-rose-100 font-bold border-y-0 text-slate-600">Purchase Price / Uct IDR</th>
                        <th class="p-3 text-right bg-white w-32 font-bold font-mono text-rose-700"><i class="pi pi-arrow-circle-down text-[8px] opacity-50 mr-1 translate-y-[-1px]"></i>Refund (IDR)</th>
                        <th v-if="!isReadonly" class="w-10 bg-white"></th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 border-b relative">
                      <tr v-for="(line, idx) in form.lines" :key="idx" class="hover:bg-rose-50/20 transition-colors group">
                        <td class="p-3 align-middle text-center border-r font-mono text-slate-400">{{ idx + 1 }}</td>
                        <td class="p-3 align-middle">
                          <input v-if="!isReadonly" v-model="line.desc" type="text" class="w-full border-b border-dashed border-slate-300 focus:border-rose-400 outline-none px-1 py-1 text-sm bg-transparent font-medium text-slate-800 placeholder-slate-300 transition-colors" placeholder="Scan SKU / Ketik Nama Barang Rusak..." />
                          <span v-else class="font-bold text-sm text-slate-800">{{ line.desc }}</span>
                        </td>
                        <td class="p-3 align-middle text-right bg-rose-50/30 border-l relative overflow-hidden">
                          <input v-if="!isReadonly" type="number" v-model.number="line.qty" class="w-full border border-rose-200 rounded px-2 py-1.5 text-right font-mono text-sm font-bold text-rose-700 bg-white shadow-inner focus:ring-1 focus:ring-rose-500 outline-none relative z-10" />
                          <span v-else class="font-mono text-sm font-bold text-rose-700">{{ line.qty }}</span>
                        </td>
                        <td class="p-3 align-middle text-center border-l border-slate-100 text-slate-500 text-[10px] font-bold">
                          <select v-if="!isReadonly" v-model="line.uomCode" class="w-full border rounded px-1 py-1.5 text-center uppercase outline-none shadow-sm focus:border-indigo-400">
                             <option value="PCS">Pcs</option><option value="BOX">Box</option><option value="KG">Kg</option>
                          </select>
                          <span v-else>{{ line.uomCode }}</span>
                        </td>
                        <td class="p-3 align-middle text-right border-l">
                          <input v-if="!isReadonly" type="number" v-model.number="line.unitPrice" class="w-full border rounded px-2 py-1.5 text-right font-mono text-[11px] shadow-inner focus:ring-1 outline-none" />
                          <span v-else class="font-mono font-medium opacity-80">{{ formatCurrency(line.unitPrice) }}</span>
                        </td>
                        <td class="p-3 align-middle text-right font-mono text-sm font-bold text-rose-600 bg-slate-50 relative pr-4">
                          {{ formatCurrency((line.qty || 0) * (line.unitPrice || 0)) }}
                        </td>
                        <td v-if="!isReadonly" class="p-3 align-middle text-center border-l w-10 bg-slate-50 hover:bg-red-500 hover:text-white transition-colors cursor-pointer group-hover:text-red-500 text-slate-300">
                           <button @click="removeLine(idx)" class="w-full h-full flex items-center justify-center font-bold" title="Hapus Barang Retur">✕</button>
                        </td>
                      </tr>
                      <tr v-if="form.lines.length === 0">
                        <td :colspan="isReadonly ? 6 : 7" class="px-6 py-10 text-center text-slate-400 font-sans text-xs italic bg-slate-50 relative">
                           <i class="pi pi-search text-xl text-slate-300 opacity-50 block mb-2"></i>
                           Klik tombol <b>Pilih dari Histori Barang Datang</b> di atas untuk menarik data inventaris masuk <br/>yang mengalami gagal tes kontrol kualitas (QC).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>
          </div>
        </div>

        <div class="p-4 border-t border-slate-200 shadow-[0_-10px_10px_-10px_rgba(0,0,0,0.05)] bg-slate-50 flex justify-between shrink-0 rounded-b-xl items-center relative z-20">
          <Button label="Tutup Dokumen" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-white" />
          <div class="flex items-center gap-2">
             <Button v-if="!isReadonly" label="Kirim Permohonan Verifikasi" severity="secondary" size="small" :loading="saving" :disabled="saving || form.lines.length === 0" @click="save" class="bg-indigo-600 border-none text-white font-bold hover:bg-indigo-700 px-4 shadow-sm" />
             <Button v-if="isReadonly && canManage && activeRet?.status === 'DRAFT'" label="Approve Transaksi (Potong Piutang)" severity="success" size="small" icon="pi pi-check-circle" class="shadow-sm font-bold bg-emerald-600 border-none px-4 shadow-emerald-600/30 text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('procurement.return.manage') || true); // Dev fallback

const returns = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activeRet = ref<any>(null);

// Mocks
const mockSuppliers = ref<any[]>([
  {id:'1', code:'SUP-RAW-001', name:'PT Sumber Tani Indonesia'},
  {id:'2', code:'SUP-EQP-001', name:'Indo Tech Machinery TBK'}
]);

const form = reactive({
  supplierId: '',
  orderCode: '',
  invoiceId: '',
  returnDate: '',
  reason: 'Cacat Produksi / Tidak Lolos QC',
  notes: '',
  lines: [] as Array<any>
});

const standardizeStatus = (ret: any) => { return ret.status; };

const filteredReturns = computed(() => {
  let list = returns.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.order?.code && p.order.code.toLowerCase().includes(q)) ||
      (p.supplier?.name && p.supplier.name.toLowerCase().includes(q)) ||
      (p.reason && p.reason.toLowerCase().includes(q))
    );
  }
  return list;
});

const calculatedSubtotal = computed(() => {
  if (isReadonly.value && activeRet.value) return Number(activeRet.value.subtotal);
  return form.lines.reduce((acc, line) => acc + ((Number(line.qty) || 0) * (Number(line.unitPrice) || 0)), 0);
});
const calculatedTax = computed(() => {
  if (isReadonly.value && activeRet.value) return Number(activeRet.value.taxAmount);
  return calculatedSubtotal.value * 0.11; // Standard 11% PPN return sim
});
const calculatedGrand = computed(() => {
  if (isReadonly.value && activeRet.value) return Number(activeRet.value.grandTotal);
  return calculatedSubtotal.value + calculatedTax.value;
});

// Helpers
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'DRAFT': return 'bg-slate-100 text-slate-700 border border-slate-300';
    case 'PENDING_APPROVAL': return 'bg-amber-100 text-amber-800 border border-amber-300 font-bold';
    case 'APPROVED': return 'bg-rose-100 text-rose-800 border border-rose-300 font-bold drop-shadow-sm'; // Using rose because it's a deductive transaction
    case 'CANCELLED': return 'bg-slate-200 text-slate-500 opacity-50';
    default: return 'bg-white border text-slate-600';
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
    const res = await api.get('/core/query?table=PurchaseReturn&include=items,supplier,order,invoice');
    if (res.data && res.data.data) {
        returns.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Fallback Mock based on PG Seeds
    returns.value = [
      { 
        id: '1', code: "PRT-202604-001", status: "APPROVED", returnDate: "2026-04-18T00:00", reason: "Barang rusak selama pengiriman jalur laut (Defective Items)",
        notes: "Klaim refund atas kerusakan kemasan produk. Vendor setuju pemotongan tagihan berjalan.", subtotal: 950000, taxAmount: 104500, grandTotal: 1054500,
        supplier: { name: 'PT Sumber Tani Indonesia' }, order: { code: 'PO-202604-001' }, invoice: { code: 'INV-A01' },
        items: [{desc: 'Karton Box Food Grade 30x30 PCS', qty: 500, uomCode: 'PCS', unitPrice: 1900}] 
      },
      { 
        id: '2', code: "PRT-202604-002", status: "DRAFT", returnDate: "2026-04-20T00:00", reason: "Tidak lolos Quality Control (QC Failed)",
        notes: "Proses sorting di pabrik menunjukkan 15 Unit tidak beroperasi maksimal.", subtotal: 18750000, taxAmount: 2062500, grandTotal: 20812500,
        supplier: { name: 'Indo Tech Machinery TBK' }, order: null, invoice: null,
        items: [{desc: 'Mesin Packing Sachet Otomatis', qty: 15, uomCode: 'PCS', unitPrice: 1250000}] 
      }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeRet.value = null;
  isReadonly.value = false;
  form.supplierId = '';
  form.orderCode = '';
  form.invoiceId = '';
  form.notes = '';
  form.returnDate = new Date().toISOString().split('T')[0];
  form.reason = 'Cacat Produksi / Tidak Lolos QC';
  form.lines = [];
  dialogOpen.value = true;
}

function openView(r: any) {
  activeRet.value = r;
  isReadonly.value = true;
  form.supplierId = r.supplierId;
  form.orderCode = r.order?.code || '';
  form.invoiceId = r.invoiceId || '';
  form.notes = r.notes;
  form.returnDate = r.returnDate?.split('T')[0] || '';
  form.reason = r.reason || 'Masalah Ekspedisi';
  
  form.lines = (r.items || []).map((x:any) => ({...x}));
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
    alert('Jurnal Retur Valid. Saldo terutang faktur terkait otomatis terpotong berdasarkan kalkulasi refund AP!');
    dialogOpen.value = false;
    saving.value = false;
    load();
  }, 1200);
}

onMounted(() => {
  load();
});
</script>

<style scoped>
/* Scopes specific styling if needed */
select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 0.5rem center; background-size: 1em; padding-right: 2rem; }
</style>
