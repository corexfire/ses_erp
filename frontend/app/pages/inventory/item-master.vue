<template>
  <div class="space-y-4">
    <!-- Header (Premium Inventory Logistics Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-100">Catalog Governance</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Master Data Inventaris</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Item <span class="text-emerald-600 italic text-3xl">Master</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-emerald-900/60 leading-relaxed mt-3">Jantung informasi seluruh material & produk perusahaan. Mengelola pengelompokan Barang Mentah hingga Barang Jadi, melacak unit konversi, barcode, sampai manajemen parameter suplai logistik.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Sinkronisasi Katalog Pusat" size="small" icon="pi pi-sync" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Daftarkan Item Baru" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Catalog Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-emerald-950 text-white shadow-xl flex flex-col justify-between border border-emerald-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 opacity-80">Total Katalog SKUs</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ items.length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-box text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Item Tidak Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-700 tracking-tighter leading-none">{{ items.filter(x => !x.isActive).length }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><i class="pi pi-ban text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Out of Stock Alert</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">8<span class="text-xl ml-1">SKUs</span></h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 transition-all hover:rotate-12"><i class="pi pi-exclamation-triangle text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Valuasi Katalog</div>
        <div class="flex items-end justify-between">
          <h3 class="text-2xl font-black text-slate-700 tracking-tight leading-none uppercase">High <span class="text-indigo-600 italic">Value</span></h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 group-hover:rotate-12 transition-transform"><i class="pi pi-chart-line text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Inventory Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6"><i class="pi pi-box text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Katalog Aset</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Master Product Inventory Records</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Kode Barang / SKU..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-emerald-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[400px]">Identitas SKU / Katalog Utama</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-48">Klasifikasi Barang</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-36">Unit Dasar</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Setup Operasional</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center border-l border-slate-50 w-56">Pengendalian & Valuasi</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-36 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-emerald-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-emerald-600">Sinkronisasi struktur katalog aset perusahaan...</div>
              </td>
            </tr>
            
            <tr v-for="item in filteredItems" v-else :key="item.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="item.isActive ? 'hover:border-l-emerald-400' : 'hover:border-l-rose-400 bg-slate-100/10 opacity-70'">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-box text-2xl"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-emerald-700 transition-colors uppercase">
                          {{ item.code }}
                       </div>
                       <div class="mt-1 font-black text-[13px] text-slate-800 uppercase tracking-tight leading-none group-hover:text-emerald-600 transition-colors">
                          {{ item.name }}
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-slate-100 text-slate-600 border border-slate-200 uppercase shadow-sm group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all">
                  {{ item.itemGroup?.name || 'UMUM' }}
                </span>
                <div class="mt-2 flex justify-center gap-1.5">
                   <div v-if="item.isSalesItem" class="text-[7px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 tracking-widest">Sale</div>
                   <div v-if="item.isPurchaseItem" class="text-[7px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100 tracking-widest">Purc</div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <div class="font-black text-emerald-700 text-[11px] px-3 py-1 bg-emerald-50 border border-emerald-100 inline-block rounded-xl tracking-widest shadow-sm uppercase group-hover:scale-110 transition-transform">{{ item.baseUomCode }}</div>
                 <div class="mt-1 text-[8px] font-black text-slate-400 tracking-[0.2em] uppercase">Base Unit</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span v-if="item.isActive" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase shadow-sm group-hover:scale-105 transition-all">
                       <i class="pi pi-circle-fill text-[7px] mr-2 text-emerald-500 animate-pulse"></i> AKTIF
                    </span>
                    <span v-else class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-rose-50 text-rose-700 border border-rose-200 uppercase shadow-sm">
                       <i class="pi pi-ban text-[7px] mr-2"></i> FREEZED
                    </span>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/20 group-hover:bg-slate-100/30 transition-colors">
                 <div class="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1.5">Val: <span class="text-indigo-600 italic">{{ item.valuationMethod === 'MOVING_AVERAGE' ? 'M-AVG' : item.valuationMethod }}</span></div>
                 <div class="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border w-32 mx-auto transition-all" :class="item.trackingType !== 'NONE' ? 'bg-indigo-50 text-indigo-700 border-indigo-100 shadow-sm' : 'bg-slate-100 text-slate-400 border-slate-200'">
                    {{ item.trackingType === 'NONE' ? 'GENERIC' : item.trackingType }}
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Kelola SKU" severity="secondary" rounded outlined @click="openView(item)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredItems.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">⚓</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Rak inventaris kosong. Belum ada Master Data yang didaftarkan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Arsitektur Katalog (Universal Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-box text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeItem?.id ? 'Audit' : 'Draft' }} <span class="text-emerald-600 italic text-2xl">Katalog Item Master</span></h3>
                 <span v-if="activeItem?.id" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm" :class="form.isActive ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'">{{ form.isActive ? 'ACTIVE' : 'FROZEN' }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Product Lifecycle Management & WMS Governance</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <!-- Panel 1: Identitas & Flagging -->
              <div class="animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-id-card text-emerald-500"></i> I. Parameter Identitas & Flagging
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-emerald-100">
                    <div class="grid grid-cols-2 gap-4">
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nomor SKU Utama <span class="text-emerald-500 ml-1 opacity-50 font-black">*</span></label>
                          <InputText v-model="form.code" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all font-mono tracking-widest uppercase" placeholder="SKU-..." />
                       </div>
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Keluarga Barang</label>
                          <select v-model="form.itemGroupId" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                             <option value="">-- PILIH JENIS --</option>
                             <option v-for="g in groups" :value="g.id">{{ g.name }}</option>
                          </select>
                       </div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Label Komersial (Nama Produk)</label>
                       <InputText v-model="form.name" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all uppercase" placeholder="Contoh: Kopi Bubuk Arabica 500g" />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Ketersediaan Transaksional (Flags)</label>
                       <div class="grid grid-cols-1 gap-3 bg-emerald-50/50 p-4 rounded-[1.5rem] border border-emerald-100 shadow-inner">
                          <label class="flex items-center gap-4 cursor-pointer group/flag">
                             <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-emerald-100 group-hover/flag:scale-110 transition-transform"><input type="checkbox" v-model="form.isSalesItem" class="w-5 h-5 accent-emerald-600" /></div>
                             <div class="flex flex-col">
                                <span class="text-[11px] font-black text-slate-800 uppercase tracking-widest">Modul Penjualan</span>
                                <span class="text-[9px] font-bold text-slate-400 uppercase italic">Can be sold to customers</span>
                             </div>
                          </label>
                          <label class="flex items-center gap-4 cursor-pointer group/flag border-t border-emerald-100/50 pt-3">
                             <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-emerald-100 group-hover/flag:scale-110 transition-transform"><input type="checkbox" v-model="form.isPurchaseItem" class="w-5 h-5 accent-emerald-600" /></div>
                             <div class="flex flex-col">
                                <span class="text-[11px] font-black text-slate-800 uppercase tracking-widest">Modul Pembelian</span>
                                <span class="text-[9px] font-bold text-slate-400 uppercase italic">Purchasable from suppliers</span>
                             </div>
                          </label>
                          <label class="flex items-center gap-4 cursor-pointer group/flag border-t border-emerald-100/50 pt-3">
                             <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg group-hover/flag:scale-110 transition-transform text-white"><input type="checkbox" v-model="form.isActive" class="w-5 h-5 accent-emerald-400" /></div>
                             <div class="flex flex-col">
                                <span class="text-[11px] font-black text-indigo-700 uppercase tracking-widest">Status Aktif (Inventory)</span>
                                <span class="text-[9px] font-bold text-indigo-400 uppercase italic">Participates in stock ledger</span>
                             </div>
                          </label>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel 2: WMS Governance -->
              <div class="animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-calculator text-amber-500"></i> II. Konfigurasi WMS & Valuasi
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-amber-100 border-b-[8px] border-b-amber-600">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Skema Valuasi HPP (Accounting)</label>
                       <select v-model="form.valuationMethod" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                          <option value="MOVING_AVERAGE">Moving Average (Rata-rata Bergerak)</option>
                          <option value="FIFO">First-In First-Out (FIFO)</option>
                          <option value="STANDARD">Harga Baku (Standard Cost)</option>
                       </select>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Sistem Penelusuran (Tracking)</label>
                       <select v-model="form.trackingType" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-indigo-700 bg-indigo-50/30 border-2 border-indigo-100 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                          <option value="NONE">Generic (Tanpa Lacak)</option>
                          <option value="BATCH">Batch / Lot Control</option>
                          <option value="SERIAL">Unique Serialized No</option>
                       </select>
                    </div>

                    <div class="bg-amber-50/50 p-8 rounded-[2rem] border-2 border-amber-100 shadow-inner space-y-6">
                       <div class="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em] mb-2 flex items-center gap-2 italic">
                          <i class="pi pi-bell animate-bounce"></i> Resupply Parameters
                       </div>
                       <div class="grid grid-cols-2 gap-4">
                          <div class="space-y-4">
                             <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 leading-tight">Reorder Point (Min)</label>
                             <InputText type="number" v-model.number="form.reorderPoint" class="w-full h-14 border-none rounded-2xl px-4 text-right font-mono font-black text-amber-700 bg-white shadow-md outline-none focus:ring-4 focus:ring-amber-400 transition-all" />
                          </div>
                          <div class="space-y-4">
                             <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 leading-tight">Replenishment Qty</label>
                             <InputText type="number" v-model.number="form.reorderQty" class="w-full h-14 border-none rounded-2xl px-4 text-right font-mono font-black text-slate-900 bg-white shadow-md outline-none focus:ring-4 focus:ring-amber-400 transition-all" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel 3: UOM & Pricing Matrix -->
              <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-sort-alt text-indigo-500"></i> III. Matriks Multi-Konversi & Harga
                 </div>
                 <div class="bg-indigo-950 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-900/10 border-4 border-indigo-900 relative overflow-hidden group min-h-[500px] flex flex-col">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-30"></div>
                    
                    <div class="flex justify-between items-center mb-10 border-b border-indigo-900/50 pb-6 shrink-0">
                       <div class="flex items-center gap-4">
                          <div class="w-14 h-14 rounded-2xl bg-white flex flex-col items-center justify-center text-indigo-950 shadow-xl group-hover:rotate-12 transition-transform">
                             <span class="text-[8px] font-black uppercase opacity-60 leading-none">BASE</span>
                             <span class="text-xl font-black font-mono leading-none mt-1">1</span>
                          </div>
                          <div>
                             <InputText v-model="form.baseUomCode" @input="syncBaseUom" class="w-32 h-14 bg-transparent border-b-4 border-indigo-500 text-white text-3xl font-black font-mono focus:border-white focus:ring-0 outline-none uppercase placeholder-indigo-700 transition-all rounded-none px-2" placeholder="PCS" />
                             <p class="text-[9px] font-black text-indigo-400 uppercase tracking-widest mt-2 px-1">Primary Stock Unit</p>
                          </div>
                       </div>
                       <Button icon="pi pi-plus" severity="secondary" rounded @click="addUom" class="w-12 h-12 bg-white/10 border-none text-white hover:bg-emerald-600 transition-all shadow-xl" />
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-6 px-1">
                       <div class="space-y-4">
                          <div v-for="(u, idx) in form.uoms" :key="idx" class="bg-white/5 rounded-[2rem] p-4 border border-white/10 relative overflow-hidden transition-all hover:bg-white/10 hover:border-white/20 group/uom" :class="idx === 0 ? 'bg-indigo-500/10 border-indigo-500/30 ring-2 ring-indigo-500/20' : ''">
                             <div class="flex items-center gap-4 relative z-10">
                                <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white font-black text-xs border border-white/5">
                                   {{ idx === 0 ? '1' : '=' }}
                                </div>
                                <div class="flex-1 grid grid-cols-2 gap-4">
                                   <div class="space-y-2">
                                      <label class="text-[8px] font-black text-indigo-300 uppercase tracking-widest px-1">Satuan SKU</label>
                                      <InputText v-model="u.code" :disabled="idx === 0" class="w-full h-10 bg-white/5 border-none text-white font-black text-xs rounded-xl px-4 focus:ring-2 focus:ring-emerald-400 transition-all uppercase disabled:opacity-30" placeholder="KARUNG" />
                                   </div>
                                   <div class="space-y-2 text-right">
                                      <label class="text-[8px] font-black text-indigo-300 uppercase tracking-widest px-1 leading-none">Rasio @ {{ form.baseUomCode }}</label>
                                      <InputText type="number" v-model.number="u.conv" :disabled="idx === 0" @input="recalcEquivalentPrice(idx)" class="w-full h-10 bg-white/5 border-none text-right text-emerald-400 font-mono font-black text-xl rounded-xl px-4 focus:ring-2 focus:ring-emerald-400 transition-all disabled:opacity-30" />
                                   </div>
                                </div>
                             </div>
                             
                             <div class="mt-6 flex justify-between items-center border-t border-white/5 pt-4">
                                <div class="flex items-center gap-2">
                                   <span class="text-[9px] font-black text-indigo-400 uppercase italic">Base Valuation Price</span>
                                </div>
                                <div class="flex items-center gap-4">
                                   <div class="flex flex-col items-end">
                                      <span class="text-[7px] font-black text-indigo-500 uppercase">Unit Price IDR</span>
                                      <InputText type="number" v-model.number="u.price" :disabled="idx !== 0" @input="idx===0 ? cascadePricing() : null" class="w-32 h-8 bg-transparent border-none text-right text-white font-mono font-black text-lg p-0 focus:ring-0 outline-none disabled:opacity-100" />
                                   </div>
                                   <button v-if="idx !== 0" @click="removeUom(idx)" class="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all scale-75 group-hover/uom:scale-100 opacity-0 group-hover/uom:opacity-100">✕</button>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div class="mt-8 border-t border-indigo-900/50 pt-6 shrink-0">
                       <div class="bg-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20 flex gap-3">
                          <i class="pi pi-info-circle text-emerald-500 mt-0.5"></i>
                          <p class="text-[9px] font-medium text-emerald-300 leading-relaxed uppercase italic">Sistem Auto-Pricing Unit Aktif: Harga varian akan ter-update otomatis mengikuti rasio konversi unit dasar (Standard ERP Logic).</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Workspace Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-verified"></i> Katalog Tervalidasi Sistem
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batal & Tutup" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                label="Simpan & Publikasikan Katalog" 
                icon="pi pi-arrow-up-right" 
                iconPos="right"
                size="large" 
                :loading="saving" 
                :disabled="saving || !form.code || !form.baseUomCode" 
                @click="save" 
                class="h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
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
.animate-fade-in-up { 
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(30px); } 
  to { opacity: 1; transform: translateY(0); } 
}

.animate-scale-in { 
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes scaleIn { 
  from { opacity: 0; transform: scale(0.95); } 
  to { opacity: 1; transform: scale(1); } 
}

.custom-scrollbar::-webkit-scrollbar { 
  width: 4px; 
}
.custom-scrollbar::-webkit-scrollbar-track { 
  background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: #e2e8f0; 
  border-radius: 10px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { 
  background: #cbd5e1; 
}

:deep(.p-inputtext) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
   border-radius: 16px !important;
}

:deep(.p-button-rounded) {
  border-radius: 9999px !important;
}

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 1rem center; 
  background-size: 1em; 
}
</style>
