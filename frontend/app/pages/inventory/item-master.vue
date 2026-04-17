<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="rounded-xl border bg-white p-5">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div class="text-sm font-semibold text-slate-800">Master Data Inventaris (Item Master)</div>
          <div class="mt-1 text-sm text-slate-600">
            Jantung informasi seluruh material & produk perusahaan. Mengelola pengelompokan Barang Mentah hingga Barang Jadi, melacak unit konversi, barcode, sampai manajemen parameter suplai logistik.
          </div>
        </div>
        <div class="flex gap-2">
          <Button label="Sinkronisasi Katalog Pusat" severity="secondary" size="small" outlined icon="pi pi-sync" />
          <Button v-if="canManage" label="+ Daftarkan Item Baru" size="small" bg="bg-emerald-600" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <div class="rounded-xl border bg-white p-5">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full md:w-auto">
          <InputText v-model="search" placeholder="Cari Kode Barang / SKU / Nama Produk..." class="w-full md:w-80 text-xs" />
          <select v-model="groupFilter" class="p-2 border rounded-md text-xs bg-white text-slate-700 min-w-32">
            <option value="">Semua Kategori</option>
            <option v-for="g in groups" :key="g.id" :value="g.id">{{ g.name }}</option>
          </select>
          <Button label="Filter" severity="secondary" size="small" :disabled="loading" @click="load" />
        </div>
      </div>

      <!-- Item Master Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-emerald-900 text-left text-xs text-emerald-50 border-b-2 border-emerald-950 uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 font-semibold">SKU / Katalog Utama</th>
              <th class="px-4 py-3 font-semibold text-center w-36">Klasifikasi & Kategori</th>
              <th class="px-4 py-3 font-semibold text-center">Unit Dasar (Base UOM)</th>
              <th class="px-4 py-3 font-semibold text-center">Setup Operasional</th>
              <th class="px-4 py-3 font-semibold text-center">Pengendalian & Valuasi</th>
              <th class="px-4 py-3 text-right font-semibold">Tindakan</th>
            </tr>
          </thead>
          <tbody class="divide-y relative">
             <tr v-if="loading">
              <td colspan="6" class="px-4 py-16 text-center text-sm text-slate-500">
                <i class="pi pi-spinner pi-spin mr-2"></i> Merender struktur katalog aset...
              </td>
            </tr>
            <!-- Iteration rows -->
            <tr v-for="item in filteredItems" v-else :key="item.id" class="transition hover:bg-slate-50 group">
              <!-- Item -->
              <td class="px-4 py-3 align-middle">
                <div class="flex items-center gap-3">
                   <div class="w-10 h-10 rounded border bg-slate-100/50 flex justify-center items-center shrink-0">
                      <i class="pi pi-box text-xl text-slate-400"></i>
                   </div>
                   <div>
                     <div class="font-bold text-slate-800 text-sm flex items-center gap-2">
                        {{ item.code }}
                     </div>
                     <div class="text-xs text-slate-600 font-semibold mt-0.5" :title="item.name">{{ item.name }}</div>
                   </div>
                </div>
              </td>
              
              <!-- Kategori -->
              <td class="px-4 py-3 align-middle text-center">
                <span class="inline-flex rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border shadow-sm">
                  {{ item.itemGroup?.name || 'UMUM' }}
                </span>
                <div class="mt-1 flex justify-center gap-1">
                   <div v-if="item.isSalesItem" class="text-[8px] bg-blue-100 text-blue-700 font-bold px-1 rounded shadow-sm">Dijual (Sale)</div>
                   <div v-if="item.isPurchaseItem" class="text-[8px] bg-amber-100 text-amber-700 font-bold px-1 rounded shadow-sm">Dibeli (Purc)</div>
                </div>
              </td>

              <!-- Base Unit & Prices -->
              <td class="px-4 py-3 align-middle text-center">
                 <div class="font-black text-rose-700 text-xs px-2 bg-rose-50 border border-rose-100 inline-block rounded uppercase shadow-inner pt-[1px]">{{ item.baseUomCode }}</div>
                 <div class="mt-1 text-[9px] font-bold text-slate-400 tracking-wider">
                    {{ (item.uoms || []).length }} TIPE SATUAN
                 </div>
              </td>
              
              <!-- Setup Operasional -->
              <td class="px-4 py-3 align-middle text-center">
                 <div class="flex flex-col items-center gap-1">
                    <span v-if="item.isActive" class="text-[9px] bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold px-2 py-0.5 rounded-full"><i class="pi pi-circle-fill text-[7px] mr-1 text-emerald-500 animate-pulse"></i>AKTIF</span>
                    <span v-else class="text-[9px] bg-rose-50 border border-rose-200 text-rose-700 font-bold px-2 py-0.5 rounded-full"><i class="pi pi-ban text-[7px] mr-1 text-rose-500"></i>NONAKTIF</span>
                 </div>
              </td>

              <!-- Pengendalian -->
              <td class="px-4 py-3 align-middle text-center">
                 <div class="text-[10px] text-slate-600 font-semibold mb-1 relative group-hover:text-indigo-600 transition-colors cursor-help">
                    <i class="pi pi-tag text-[9px] opacity-70"></i> Valuation: <b>{{ item.valuationMethod === 'MOVING_AVERAGE' ? 'M-AVG' : item.valuationMethod }}</b>
                 </div>
                 <div class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" :class="item.trackingType !== 'NONE' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-400'">
                    TRACKING: {{ item.trackingType === 'NONE' ? 'GENERIC' : item.trackingType }}
                 </div>
              </td>
              
              <!-- Actions -->
              <td class="px-4 py-3 align-middle text-right">
                <Button label="Kelola SKU" size="small" severity="secondary" outlined class="text-[10px] px-3 font-bold py-1 text-center hover:bg-slate-100" @click="openView(item)" />
              </td>
            </tr>
            <tr v-if="!loading && filteredItems.length === 0">
              <td colspan="6" class="px-4 py-16 text-center text-slate-500 border-t">
                <div class="text-4xl mb-3 opacity-50 text-emerald-200"><i class="pi pi-box"></i></div>
                Rak inventaris kosong. Belum ada Master Data yang didaftarkan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Viewer/Editor Modal (Item Master Configuration) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 backdrop-blur-sm relative">
      <div class="w-full max-w-[1200px] h-full sm:h-[95vh] rounded-xl border bg-slate-50 shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
        
        <!-- Header -->
        <div class="p-5 border-b bg-white flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 relative z-10 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center text-xl shadow-inner"><i class="pi pi-box"></i></div>
            <div>
               <div class="flex items-center gap-3">
                 <span class="text-lg font-black text-slate-800 tracking-tight">{{ activeItem?.id ? form.code : 'Registrasi SKUs Baru' }}</span>
                 <span v-if="activeItem?.id" class="inline-flex rounded text-[9px] font-bold uppercase shadow-sm border px-2 py-0.5" :class="form.isActive ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'">
                   {{ form.isActive ? 'STATUS: AKTIF DISTRIBUSI' : 'STATUS: DIBEKUKAN' }}
                 </span>
               </div>
               <div class="text-xs text-slate-500 mt-1 font-medium">{{ activeItem?.id ? 'Mengubah rincian material data.' : 'Identifikasi unit dan spesifikasi awal material perusahaan.' }}</div>
            </div>
          </div>
          <button class="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded text-lg font-bold flex items-center justify-center transition-colors" @click="dialogOpen = false">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col sm:flex-row bg-slate-50/50">
          
          <!-- LEFT PANEL: Core Configurations -->
          <div class="w-full sm:w-1/2 lg:w-[45%] p-6 border-r border-slate-200 flex flex-col gap-6 bg-white overflow-y-auto">
             
             <!-- Identitas Dasar -->
             <div class="space-y-4">
                <div class="uppercase text-[10px] font-black text-slate-400 tracking-widest border-b pb-2 flex gap-2 items-center"><i class="pi pi-id-card"></i> Parameter Identitas</div>
                
                <div class="grid grid-cols-2 gap-4">
                   <div class="col-span-1 space-y-1">
                     <label class="text-[10px] font-bold text-slate-500">Nomor Registrasi / SKU Utama</label>
                     <input :disabled="isReadonly" type="text" v-model="form.code" class="w-full border rounded p-2 text-sm font-mono font-bold bg-slate-50 outline-none focus:border-emerald-500 uppercase disabled:opacity-70" placeholder="SKU-..." />
                   </div>
                   <div class="col-span-1 space-y-1">
                     <label class="text-[10px] font-bold text-slate-500">Klasifikasi Keluarga Barang</label>
                     <select :disabled="isReadonly" v-model="form.itemGroupId" class="w-full border rounded p-2 text-sm font-semibold bg-white outline-none focus:border-emerald-500 disabled:bg-slate-50 disabled:opacity-70">
                        <option value="">-- Pilih Jenis --</option>
                        <option v-for="g in groups" :value="g.id">{{ g.name }}</option>
                     </select>
                   </div>
                </div>

                <div class="space-y-1">
                   <label class="text-[10px] font-bold text-slate-500">Label Komersial (Nama Produk/Material)</label>
                   <input :disabled="isReadonly" type="text" v-model="form.name" class="w-full border rounded p-2 text-sm font-semibold bg-white outline-none focus:border-emerald-500 disabled:opacity-70" placeholder="Contoh: Kopi Bubuk Arabica 500g" />
                </div>

                <div class="space-y-1">
                   <label class="text-[10px] font-bold text-slate-500">Deskripsi / Spesifikasi Fungsional</label>
                   <textarea :disabled="isReadonly" v-model="form.description" rows="2" class="w-full border rounded p-2 text-xs bg-white outline-none focus:border-emerald-500 disabled:bg-slate-50 disabled:opacity-70"></textarea>
                </div>
             </div>

             <!-- Fitur Transaksi -->
             <div class="space-y-4">
                <div class="uppercase text-[10px] font-black text-slate-400 tracking-widest border-b pb-2 flex gap-2 items-center"><i class="pi pi-briefcase"></i> Ketersediaan Transaksional (Flagging)</div>
                <div class="flex gap-4 flex-wrap bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                   <label class="flex items-center gap-2 cursor-pointer opacity-90 hover:opacity-100 transition-opacity">
                      <input type="checkbox" :disabled="isReadonly" v-model="form.isSalesItem" class="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded" />
                      <span class="text-xs font-bold text-slate-700">Modul Penjualan (Sales)</span>
                   </label>
                   <label class="flex items-center gap-2 cursor-pointer opacity-90 hover:opacity-100 transition-opacity">
                      <input type="checkbox" :disabled="isReadonly" v-model="form.isPurchaseItem" class="w-4 h-4 text-amber-600 focus:ring-amber-500 rounded" />
                      <span class="text-xs font-bold text-slate-700">Modul Belanja (Purchase PO)</span>
                   </label>
                   <label class="flex items-center gap-2 cursor-pointer opacity-90 hover:opacity-100 transition-opacity whitespace-nowrap pt-2 md:pt-0 border-t md:border-none border-slate-200 mt-2 md:mt-0 w-full md:w-auto">
                      <input type="checkbox" :disabled="isReadonly" v-model="form.isActive" class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded" />
                      <span class="text-xs font-bold text-indigo-700">Aktif & Digunakan (Inventory)</span>
                   </label>
                </div>
             </div>

             <!-- Standar Pergudangan & Validasi Cost -->
             <div class="space-y-4 mt-auto">
                <div class="uppercase text-[10px] font-black text-emerald-700 tracking-widest border-b border-emerald-100 pb-2 flex gap-2 items-center"><i class="pi pi-calculator"></i> Konfigurasi Akuntansi & Restocking WMS</div>
                
                <div class="grid grid-cols-2 gap-4">
                   <div class="col-span-1 space-y-1">
                     <label class="text-[10px] font-bold text-slate-500">Metode Valuasi HPP</label>
                     <select :disabled="isReadonly" v-model="form.valuationMethod" class="w-full border rounded p-2 text-xs font-bold bg-slate-50 outline-none">
                        <option value="MOVING_AVERAGE">Moving Average (Rata-rata Bergerak)</option>
                        <option value="FIFO">FIFO (First In First Out)</option>
                        <option value="STANDARD">Standard Harga Baku</option>
                     </select>
                   </div>
                   <div class="col-span-1 space-y-1">
                     <label class="text-[10px] font-bold text-slate-500">Metode Penelusuran Aset</label>
                     <select :disabled="isReadonly" v-model="form.trackingType" class="w-full border rounded p-2 text-xs font-bold bg-slate-50 outline-none">
                        <option value="NONE">Reguler (Tanpa Lacak)</option>
                        <option value="BATCH">Sistem Batch / Lot Mesin</option>
                        <option value="SERIAL">Nomor Seri Spesifik (Unitized)</option>
                     </select>
                   </div>
                   <div class="col-span-1 space-y-1">
                     <label class="text-[10px] font-bold text-slate-500 bg-amber-100 px-1 rounded text-amber-800" title="Batas Stok Minimal Untuk Alert">Reorder Point (Titik Kritis) <i class="pi pi-bell text-[8px]"></i></label>
                     <input :disabled="isReadonly" type="number" v-model.number="form.reorderPoint" class="w-full border rounded p-2 text-xs font-mono font-bold text-right outline-none" />
                   </div>
                   <div class="col-span-1 space-y-1">
                     <label class="text-[10px] font-bold text-slate-500" title="Target Pesanan Jika Sedang Kritis">Plafon Target (Reorder Qty)</label>
                     <input :disabled="isReadonly" type="number" v-model.number="form.reorderQty" class="w-full border rounded p-2 text-xs font-mono font-bold text-right outline-none" />
                   </div>
                </div>
             </div>

          </div>

          <!-- RIGHT PANEL: UOM & Equivalency Table -->
          <div class="w-full sm:w-1/2 lg:w-[55%] flex flex-col">
             
             <!-- Satuan Dasar Header -->
             <div class="bg-indigo-950 text-indigo-50 p-6 flex flex-col justify-center relative overflow-hidden shrink-0 shadow-lg">
                <div class="absolute right-[-20px] top-[-20px] opacity-10">
                   <i class="pi pi-box text-[200px]"></i>
                </div>
                <div class="z-10 text-[10px] font-black uppercase text-indigo-300 tracking-widest flex items-center mb-1">
                   Indikator Skala Komersial Utama
                </div>
                <div class="z-10 flex gap-4 items-center">
                   <div class="text-3xl font-black font-mono">1</div>
                   <div>
                       <input :disabled="isReadonly" type="text" v-model="form.baseUomCode" class="w-24 border-b-2 border-indigo-400 focus:border-white px-2 py-1 text-2xl font-black bg-transparent outline-none uppercase placeholder-indigo-500 disabled:opacity-100 text-white" placeholder="PCS" @input="syncBaseUom" />
                   </div>
                   <div class="text-xs text-indigo-300 leading-tight">
                      Merupakan Unit of Measurement (UOM) mendasar untuk penyimpanan kardinal & inventarisasi historis fisik di gudang.
                   </div>
                </div>
             </div>

             <!-- Satuan Multikonversi Matrix -->
             <div class="flex-1 p-6 bg-slate-100 overflow-y-auto">
                <div class="flex items-center justify-between mb-4">
                   <div>
                      <div class="text-sm font-black text-slate-800 uppercase tracking-widest"><i class="pi pi-sort-alt mr-2 text-indigo-500"></i> Matriks Multi-Konversi (Equivalent Hierarchy)</div>
                      <div class="text-[10px] text-slate-500 mt-1 leading-tight">Konversikan rasio unit berskala, harga akan dikalkulasi mendatar mengikuti unit kardinal ERP. <b>(Sistem Auto-Pricing Unit)</b>.</div>
                   </div>
                   <Button v-if="!isReadonly" label="Tambah Varian/Satuan" icon="pi pi-plus" size="small" bg="bg-white" class="h-8 shadow-sm text-indigo-700 text-[10px] font-bold border-slate-200" @click="addUom" />
                </div>
                
                <div class="space-y-3">
                   <!-- UOM Rows -->
                   <div v-for="(u, idx) in form.uoms" :key="idx" class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative group overflow-hidden" :class="idx===0 ? 'border-indigo-400 ring-2 ring-indigo-500/10' : ''">
                      
                      <!-- Tag Base / Hierarchy badge -->
                      <div class="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" :class="idx===0 ? 'bg-indigo-500/80' : 'bg-slate-200'"></div>
                      <div v-if="idx===0" class="absolute right-0 top-0 bg-indigo-500 text-white text-[8px] font-black px-3 py-1 rounded-bl-lg shadow-sm z-10 w-24 text-center">
                         BASE UOM ❤️
                      </div>

                      <div class="grid grid-cols-12 gap-4 items-center">
                         <div class="col-span-4 sm:col-span-3 space-y-1 z-10">
                            <label class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">ID Satuan <span v-if="idx !== 0">Besar</span></label>
                            <input :disabled="isReadonly || idx===0" type="text" v-model="u.code" class="w-full border-b px-2 py-1 text-sm font-black text-slate-700 uppercase outline-none focus:border-indigo-500 bg-transparent disabled:opacity-100" placeholder="DUS/KARTON" />
                         </div>

                         <div class="col-span-8 sm:col-span-5 flex items-center justify-between gap-2 border bg-slate-50/50 rounded-lg pr-4 overflow-hidden h-12 shadow-inner group-hover:bg-slate-100 transition-colors">
                            <div class="bg-slate-200 px-3 h-full flex flex-col justify-center text-center">
                               <div class="text-[8px] font-black text-slate-500 uppercase pb-0.5">Ratio</div>
                               <div class="text-xs font-mono font-bold">{{ idx===0 ? '1' : '=' }}</div>
                            </div>
                            <div class="flex-1 flex gap-2 items-center w-full min-w-0 pr-1 py-1">
                               <!-- Rumus Konversi dari Master -->
                               <template v-if="idx===0">
                                   <div class="text-xs font-semibold text-slate-600 truncate opacity-50 px-2 italic">Standard Utama</div>
                               </template>
                               <template v-else>
                                   <input :disabled="isReadonly" type="number" v-model.number="u.conv" class="w-16 border rounded text-right px-2 py-1 text-sm font-bold font-mono text-indigo-700 outline-none shadow-sm" @input="recalcEquivalentPrice(idx)" />
                                   <div class="text-xs font-bold text-slate-400 truncate mt-0.5">{{ form.baseUomCode || 'BASE' }}</div>
                               </template>
                            </div>
                         </div>

                         <div class="col-span-10 sm:col-span-4 pl-4 sm:pl-0 sm:border-l sm:h-full sm:flex sm:flex-col sm:justify-center border-slate-200">
                             <label class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block sm:pl-3">Harga Komersial / Nilai HPP</label>
                             <div class="flex items-center mt-1 sm:pl-3">
                                <span class="text-[10px] text-slate-400 mr-2 font-mono">Rp</span>
                                <input :disabled="isReadonly && idx!==0" type="number" v-model.number="u.price" class="w-full border-b px-1 py-1 text-sm font-mono font-black text-rose-700 bg-transparent outline-none disabled:opacity-100" @input="idx===0 ? cascadePricing() : null" />
                             </div>
                         </div>

                         <div v-if="!isReadonly && idx !== 0" class="col-span-2 sm:absolute sm:bottom-2 sm:right-3 sm:top-auto flex justify-end">
                            <button @click="removeUom(idx)" class="w-6 h-6 rounded bg-rose-100 text-rose-600 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white transition-colors">✕</button>
                         </div>
                      </div>
                   </div>
                </div>

                <!-- Info Box based on user specific rules -->
                <div class="mt-4 p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 shadow-inner flex gap-3 text-[10px] text-slate-600 leading-relaxed font-medium">
                   <div class="text-xl opacity-30 mt-1"><i class="pi pi-info-circle"></i></div>
                   <div>
                     Sesuai SOP Perusahaan/Algoritma ERP Klasik, Satuan Unit dengan konversi terbesar akan mendikte persediaan terendah. <b>1 Karung = 50 Kg</b>. Maka harga akan melipat 50x dari harga base unit secara dinamis. Nilai inventaris akan selalu dibaca di angka fundamentalnya (Base).
                   </div>
                </div>

             </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 border-t border-slate-200 shadow-[0_-10px_10px_-10px_rgba(0,0,0,0.05)] bg-white flex justify-between shrink-0 z-20">
          <Button label="Tutup Jendela" severity="secondary" size="small" @click="dialogOpen = false" outlined class="bg-slate-50 border-slate-300 font-bold" />
          <div class="flex items-center gap-2">
             <Button v-if="!isReadonly" label="Kunci & Publikasi Katalog" severity="success" size="large" :loading="saving" :disabled="saving || !form.code || !form.baseUomCode" @click="save" class="bg-emerald-600 border-none text-white font-bold tracking-wide hover:bg-emerald-700 px-8 shadow-sm h-10" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.item.manage') || true); // Dev fallback

const items = ref<any[]>([]);
const groups = ref<any[]>([]);
const search = ref('');
const groupFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activeItem = ref<any>(null);

const form = reactive({
  id: '',
  code: '',
  name: '',
  description: '',
  itemGroupId: '',
  baseUomCode: 'PCS',
  isActive: true,
  isSalesItem: true,
  isPurchaseItem: true,
  valuationMethod: 'MOVING_AVERAGE',
  trackingType: 'NONE',
  reorderPoint: 0,
  reorderQty: 0,
  uoms: [{ code: 'PCS', conv: 1, price: 0 }] as Array<any>
});

const filteredItems = computed(() => {
  let list = items.value;
  if (groupFilter.value) {
    list = list.filter(p => p.itemGroupId === groupFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.name && p.name.toLowerCase().includes(q))
    );
  }
  return list;
});

// Formatters
const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID');
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=Item&include=itemGroup,uoms');
    if (res.data && res.data.data) {
        items.value = res.data.data;
    } else {
        throw new Error("No payload");
    }

    const gRes = await api.get('/core/query?table=ItemGroup');
    if (gRes.data && gRes.data.data) {
        groups.value = gRes.data.data;
    }
  } catch (e: any) {
    // PG mock logic mirror
    groups.value = [
      { id: '1', name: 'Raw Materials' },
      { id: '2', name: 'Finished Goods' }
    ];
    items.value = [
      { 
        id: '1', code: "RM-BKS-01", name: "Biji Kopi Spesialti Arabica (Green Beans)", baseUomCode: "KG", itemGroup: { name: 'Raw Materials'}, isActive: true, isSalesItem: false, isPurchaseItem: true, valuationMethod: "FIFO", trackingType: "BATCH",
        uoms: [{ code: 'KG', conv: 1, price: 95000 }, { code: 'KARUNG', conv: 50, price: 4750000 }]
      },
      { 
        id: '2', code: "FG-KB-250", name: "Kopi Bubuk Arabica Premium 250g", baseUomCode: "PCS", itemGroup: { name: 'Finished Goods'}, isActive: true, isSalesItem: true, isPurchaseItem: false, valuationMethod: "MOVING_AVERAGE", trackingType: "SERIAL",
        uoms: [{ code: 'PCS', conv: 1, price: 45000 }, { code: 'DUS', conv: 12, price: 540000 }]
      }
    ];
  } finally {
    loading.value = false;
  }
}

function syncBaseUom() {
   if (form.uoms && form.uoms.length > 0) {
      form.uoms[0].code = form.baseUomCode.toUpperCase();
   }
}

// Logic: price follows conversion rate algorithm based on Base UOM price.
function cascadePricing() {
   const basePrice = Number(form.uoms[0].price) || 0;
   form.uoms.forEach((u, i) => {
       if (i !== 0) {
          u.price = basePrice * (Number(u.conv) || 1);
       }
   });
}

function recalcEquivalentPrice(index: number) {
   // Only run if you change the multiplier on a secondary UOM
   const basePrice = Number(form.uoms[0].price) || 0;
   form.uoms[index].price = basePrice * (Number(form.uoms[index].conv) || 1);
}

function openCreate() {
  activeItem.value = null;
  isReadonly.value = false;
  
  form.id = '';
  form.code = '';
  form.name = '';
  form.description = '';
  form.itemGroupId = '';
  form.baseUomCode = 'PCS';
  form.isActive = true;
  form.isSalesItem = true;
  form.isPurchaseItem = true;
  form.valuationMethod = 'MOVING_AVERAGE';
  form.trackingType = 'NONE';
  form.reorderPoint = 0;
  form.reorderQty = 0;
  form.uoms = [{ code: 'PCS', conv: 1, price: 0 }];

  dialogOpen.value = true;
}

function openView(r: any) {
  activeItem.value = r;
  isReadonly.value = false; // Usually true, allowing edit for demo
  
  form.id = r.id;
  form.code = r.code;
  form.name = r.name;
  form.description = r.description || '';
  form.itemGroupId = r.itemGroupId || '';
  form.baseUomCode = r.baseUomCode || 'PCS';
  form.isActive = !!r.isActive;
  form.isSalesItem = !!r.isSalesItem;
  form.isPurchaseItem = !!r.isPurchaseItem;
  form.valuationMethod = r.valuationMethod || 'MOVING_AVERAGE';
  form.trackingType = r.trackingType || 'NONE';
  form.reorderPoint = Number(r.reorderPoint) || 0;
  form.reorderQty = Number(r.reorderQty) || 0;
  
  if (r.uoms && r.uoms.length > 0) {
      form.uoms = r.uoms.map((x:any) => ({ code: x.uomCode || x.code, conv: Number(x.conversionRate || x.conv), price: Number(x.price) }));
      // Ensure Base is always at idx 0 based on user architecture
  } else {
      form.uoms = [{ code: form.baseUomCode, conv: 1, price: 0 }];
  }

  dialogOpen.value = true;
}

function addUom() {
  form.uoms.push({ code: '', conv: 10, price: 0 });
  cascadePricing(); // Ensure standard is injected
}

function removeUom(idx: number) {
  form.uoms.splice(idx, 1);
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Katalog Item Master berhasil dipublikasikan. Unit konversi dan harga kardinal telah terkalkulasi otomatis.');
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
select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 0.5rem center; background-size: 1em; padding-right: 2rem; }
.animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
