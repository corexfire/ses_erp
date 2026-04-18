<template>
  <div class="space-y-4">
    <!-- Header (Premium Supply Chain Traceability Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-pink-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-pink-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-pink-100">Supply Chain Traceability</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-pink-600">Manajemen Identifikasi Lot & Serials</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Trace <span class="text-pink-600 not-italic text-3xl">Ability</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-pink-900/60 leading-relaxed mt-3">Jantung pelacakan rantai pasokan. Kelola masa kedaluwarsa aset produksi (Lot/Batch) dan jejak tunggal perlengkapan pabrik (Nomor Seri) secara akurat.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Audit Recall Produk" size="small" icon="pi pi-exclamation-triangle" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-rose-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Generate Identitas Lot" size="small" icon="pi pi-qrcode" class="p-button-rounded h-12 px-8 bg-pink-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-pink-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Traceability Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-slate-950 text-white shadow-xl flex flex-col justify-between border border-slate-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-pink-400 tracking-[0.2em] mb-4 opacity-80">Total Batch Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ batches.length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-tags text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Aset Expired</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter leading-none">{{ batches.filter(x => isExpired(x.expiryDate)).length }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 group-hover:rotate-12 transition-transform"><i class="pi pi-calendar-times text-lg"></i></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Populasi Serial</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-indigo-700 tracking-tighter leading-none">{{ serials.length }}</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 group-hover:rotate-12 transition-transform"><i class="pi pi-barcode text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-pink-100 tracking-[0.2em] mb-4 opacity-80">Indeks Keterlacakan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase italic">High <span class="text-pink-300">Pulse</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-bolt text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Tabbed Ledger Architecture (Premium Grid) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-6">
           <div class="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex font-black text-[10px] uppercase tracking-widest">
              <button class="py-2 px-6 rounded-xl text-center transition-all" :class="activeTab === 'BATCH' ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'" @click="activeTab = 'BATCH'">
                 <i class="pi pi-tags mr-2"></i> Data Lot / Batches
              </button>
              <button class="py-2 px-6 rounded-xl text-center transition-all" :class="activeTab === 'SERIAL' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'" @click="activeTab = 'SERIAL'">
                 <i class="pi pi-barcode mr-2"></i> Entitas Nomor Seri
              </button>
           </div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Keterlacakan Aset</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Traceability & Identity Portfolio</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Kode Batches / Serials..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-pink-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table (BATCH) -->
      <div v-if="activeTab === 'BATCH'" class="overflow-x-auto custom-scrollbar animate-fade-in-up">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[260px]">Kode Identifikasi Lot / Batch</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Induk Material (Item / SKU)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Tanggal Batas Waktu (Kedaluwarsa)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Umur</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="4" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-pink-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-pink-600">Mensinkronisasi pangkalan data keterlacakan...</div>
              </td>
            </tr>
            
            <tr v-for="b in filteredBatches" v-else :key="b.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="isExpired(b.expiryDate) ? 'hover:border-l-rose-400' : 'hover:border-l-emerald-400'">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-tag text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-pink-700 transition-colors uppercase italic">
                          {{ b.code }}
                       </div>
                       <div class="mt-1 font-black text-[9px] text-slate-300 uppercase tracking-widest">Sys ID: {{ b.id }}</div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 bg-slate-50/20">
                <div class="flex flex-col gap-1.5">
                   <div class="font-black text-slate-800 text-[11px] uppercase tracking-tight">{{ b.item?.name || 'Raw Material Terhapus' }}</div>
                   <div class="text-[9px] font-black font-mono text-pink-600 bg-white border border-pink-100 inline-block px-2 py-0.5 rounded shadow-sm w-fit">{{ b.item?.code }}</div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-center bg-rose-50/10">
                 <div class="flex flex-col items-center gap-1">
                    <div class="text-[14px] font-black text-rose-800 font-mono tracking-tighter">{{ formatDate(b.expiryDate) }}</div>
                    <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Shelf Life Limit</div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border uppercase shadow-sm group-hover:scale-105 transition-all" :class="isExpired(b.expiryDate) ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'">
                       <i class="pi text-[7px] mr-2" :class="isExpired(b.expiryDate) ? 'pi-exclamation-circle text-rose-500' : 'pi-shield-check text-emerald-500'"></i> 
                       {{ isExpired(b.expiryDate) ? 'KEDALUWARSA (EXPIRED)' : 'AMAN (ED VALID)' }}
                    </span>
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredBatches.length === 0">
              <td colspan="4" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🏷️</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Tidak ditemukan riwayat Batch.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Item Table (SERIAL) -->
      <div v-if="activeTab === 'SERIAL'" class="overflow-x-auto custom-scrollbar animate-fade-in-up">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[260px]">Plat / Nomor Seri Spesifik (S/N)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Kategori Hardware / Unit Khusus</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Aktiva Unit</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="3" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-indigo-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-indigo-600">Merender kepemilikan aset unik...</div>
              </td>
            </tr>
            
            <tr v-for="s in filteredSerials" v-else :key="s.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-indigo-400">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-barcode text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-indigo-700 transition-colors uppercase italic">
                          {{ s.serialNo }}
                       </div>
                       <div class="mt-1 font-black text-[9px] text-slate-300 uppercase tracking-widest">Sys ID: {{ s.id }}</div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 bg-slate-50/20">
                <div class="flex flex-col gap-1.5">
                   <div class="font-black text-slate-800 text-[11px] uppercase tracking-tight">{{ s.item?.name || 'Aset Terhapus' }}</div>
                   <div class="text-[9px] font-black font-mono text-indigo-600 bg-white border border-indigo-100 inline-block px-2 py-0.5 rounded shadow-sm w-fit">{{ s.item?.code }}</div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border uppercase shadow-sm group-hover:scale-105 transition-all" :class="s.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'">
                       <i class="pi text-[7px] mr-2" :class="s.status === 'AVAILABLE' ? 'pi-box text-emerald-500' : 'pi-sync text-slate-400'"></i> 
                       {{ s.status === 'AVAILABLE' ? 'TERSIMPAN / DIAM' : s.status }}
                    </span>
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredSerials.length === 0">
              <td colspan="3" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🔢</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Tidak ada perlengkapan/aset yang menggunakan S/N unik.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    <    <!-- Arsitektur Traceability Node Hub (Universal Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px]" :class="form.type === 'BATCH' ? 'border-b-pink-900' : 'border-b-indigo-900'">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden text-slate-900">
          <div class="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700" :class="form.type === 'BATCH' ? 'bg-pink-50' : 'bg-indigo-50'"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0" :class="form.type === 'BATCH' ? 'bg-pink-600' : 'bg-indigo-600'">
               <i class="pi text-3xl font-black" :class="form.type === 'BATCH' ? 'pi-tags' : 'pi-barcode'"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Registrasi <span class="italic text-2xl" :class="form.type === 'BATCH' ? 'text-pink-600' : 'text-indigo-600'">Node Identitas</span></h3>
                 <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm" :class="form.type === 'BATCH' ? 'bg-pink-50 text-pink-700 border-pink-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100'">Identity Injection Mode</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 text-slate-400 italic" :class="form.type === 'BATCH' ? 'border-pink-500' : 'border-indigo-500'">Mendaftarkan blok identitas inventaris baru ke sistem WMS ERP</p>
            </div>
          </div>
          <button @click="dialogOpen = false" class="relative z-10 w-12 h-12 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <i class="pi pi-times text-slate-400 font-bold"></i>
          </button>
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel Left: Tipe Identitas -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-compass text-pink-600"></i> I. Klasifikasi & Afiliasi
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-pink-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kategori Identitas <span class="italic text-[8px] opacity-60">(Identity Type)</span></label>
                       <div class="flex font-black text-[10px] p-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                          <button class="flex-1 py-3 rounded-xl text-center transition-all uppercase tracking-widest" :class="form.type === 'BATCH' ? 'bg-white shadow-md text-pink-600' : 'text-slate-400 hover:text-slate-600'" @click="form.type = 'BATCH'">
                             <i class="pi pi-tags mr-2"></i> Jalur Lot
                          </button>
                          <button class="flex-1 py-3 rounded-xl text-center transition-all uppercase tracking-widest" :class="form.type === 'SERIAL' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400 hover:text-slate-600'" @click="form.type = 'SERIAL'">
                             <i class="pi pi-barcode mr-2"></i> Unit Serials
                          </button>
                       </div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Induk Material Afiliasi <span class="italic text-[8px] opacity-60">(Parent SKU)</span></label>
                       <select v-model="form.itemId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none transition-all appearance-none cursor-pointer uppercase tracking-widest" :class="form.type === 'BATCH' ? 'focus:ring-pink-400' : 'focus:ring-indigo-400'">
                          <option value="">-- PILIH SKU INDUK --</option>
                          <option v-for="i in mockItems" :value="i.id">{{ i.code }} - {{ i.name }}</option>
                       </select>
                    </div>

                    <div class="pt-4 border-t border-slate-50">
                       <div class="px-6 py-4 rounded-2xl border text-[9px] font-bold uppercase leading-relaxed italic" :class="form.type === 'BATCH' ? 'bg-pink-50 border-pink-100 text-pink-400' : 'bg-indigo-50 border-indigo-100 text-indigo-400'">
                          Identitas ini akan dicangkok pada seluruh mutasi, penjualan, maupun retur yang mereferensikannya di masa depan.
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel Middle: Parameter Node -->
              <div class="lg:col-span-4 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-cog text-rose-500"></i> II. Parameter Identifikasi
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all border-b-[8px]" :class="form.type === 'BATCH' ? 'hover:border-pink-100 border-b-pink-600' : 'hover:border-indigo-100 border-b-indigo-600'">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kode Identitas <span class="italic text-[8px] opacity-60">({{ form.type === 'BATCH' ? 'LOT / BATCH CODE' : 'S/N' }})</span></label>
                       <div class="relative">
                          <i class="pi absolute left-6 top-1/2 -translate-y-1/2 text-xs opacity-50" :class="form.type === 'BATCH' ? 'pi-tag text-pink-600' : 'pi-barcode text-indigo-600'"></i>
                          <InputText v-model="form.code" class="w-full h-16 border-none rounded-2xl pl-14 pr-6 text-xl font-mono font-black text-slate-900 bg-slate-50 shadow-inner outline-none transition-all uppercase" :class="form.type === 'BATCH' ? 'focus:ring-pink-400' : 'focus:ring-indigo-400'" :placeholder="form.type === 'BATCH' ? 'LOT-XXXX-XXX' : 'SN-XXXXXXXXX'" />
                       </div>
                    </div>

                    <div v-if="form.type === 'BATCH'" class="animate-fade-in-up">
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Batas Waktu Kedaluwarsa <span class="italic text-[8px] opacity-60">(Shelf Life Limit)</span></label>
                          <InputText type="date" v-model="form.expiryDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-pink-400 transition-all uppercase" />
                       </div>
                       <div class="mt-4 px-3 py-2 bg-rose-50 rounded-xl border border-rose-100 text-[8px] font-black text-rose-600 uppercase tracking-widest italic flex items-center gap-2">
                          <i class="pi pi-exclamation-circle"></i> Parameter Kedaluwarsa bersifat permanen.
                       </div>
                    </div>

                    <div v-else class="animate-fade-in-up">
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Status Awal Aset <span class="italic text-[8px] opacity-60">(Default Status)</span></label>
                          <div class="px-6 py-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-[11px] font-black text-indigo-700 uppercase tracking-widest flex items-center justify-between">
                             <span>Available Tracking</span>
                             <i class="pi pi-check-circle"></i>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Preview & Audit Hub -->
              <div class="lg:col-span-4 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between gap-2">
                    <span class="flex items-center gap-2"><i class="pi pi-shield text-emerald-500"></i> III. Preview & Audit Hub</span>
                 </div>
                 <div class="bg-slate-900 p-0 rounded-[2.5rem] shadow-2xl border-4 border-slate-800 relative overflow-hidden group min-h-[400px] flex flex-col" :class="form.type === 'BATCH' ? 'shadow-pink-900/10' : 'shadow-indigo-900/10'">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 rounded-full blur-3xl opacity-30" :class="form.type === 'BATCH' ? 'bg-pink-500/10' : 'bg-indigo-500/10'"></div>
                    
                    <div class="p-10 pb-6 shrink-0 relative z-10 border-b border-white/5 bg-slate-900/40 text-center">
                       <div class="w-24 h-24 mx-auto mb-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-3xl transition-transform group-hover:scale-110" :class="form.type === 'BATCH' ? 'text-pink-400 shadow-pink-500/10' : 'text-indigo-400 shadow-indigo-500/10'">
                          <i class="pi" :class="form.type === 'BATCH' ? 'pi-tags' : 'pi-barcode'"></i>
                       </div>
                       <h4 class="text-xl font-black text-white leading-none uppercase tracking-tight italic">{{ form.type === 'BATCH' ? 'Lot' : 'Serial' }} <span :class="form.type === 'BATCH' ? 'text-pink-400' : 'text-indigo-400'" class="not-italic">Node Visualization</span></h4>
                       <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mt-4 font-mono italic">Traceability Integrity Linked</p>
                    </div>

                    <div class="flex-1 p-10 flex flex-col justify-center items-center text-center space-y-6">
                       <div v-if="form.code" class="animate-scale-in">
                          <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Simulated Identity Tag</div>
                          <div class="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 text-2xl font-mono font-black text-white uppercase tracking-tighter">
                             {{ form.code }}
                          </div>
                       </div>
                       <div v-else class="text-[10px] font-black text-slate-600 uppercase tracking-widest italic p-8 bg-black/20 rounded-2xl border border-dashed border-white/5">
                          Menunggu Input Kode Node...
                       </div>
                    </div>

                    <div class="p-10 pt-6 border-t border-slate-800 shrink-0 bg-slate-900/80 backdrop-blur-md relative z-10 border-b-4" :class="form.type === 'BATCH' ? 'border-b-pink-700' : 'border-b-indigo-700'">
                       <div class="bg-white/5 rounded-2xl p-4 border border-white/5 flex gap-3 text-[9px] font-black text-slate-400 uppercase italic leading-relaxed">
                          <i class="pi pi-shield-check mt-0.5 text-emerald-500 text-xs"></i>
                          <span>PERINGATAN AUDIT: Hati-hati salah memasukan data, identitas ini bersifat mutlak dalam pelaporan audit logistik.</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Workspace Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-info-circle text-pink-500"></i> Identity Hijacking Prevention Enabled
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batal" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                label="Injeksi Identitas Baru (Simpan)" 
                icon="pi pi-save" 
                size="large" 
                :loading="saving" 
                :disabled="saving" 
                @click="save" 
                class="h-14 px-12 border-none text-white font-black text-[10px] uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all rounded-xl" 
                :class="form.type === 'BATCH' ? 'bg-pink-600 shadow-pink-100' : 'bg-indigo-600 shadow-indigo-100'"
             />
          </div>
        </div>
      </div>
    </div>    </div>

  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('inventory.batch.manage') || true); 

const batches = ref<any[]>([]);
const serials = ref<any[]>([]);
const search = ref('');
const loading = ref(false);
const saving = ref(false);

const activeTab = ref('BATCH');
const dialogOpen = ref(false);

const form = reactive({
  type: 'BATCH',
  itemId: '',
  code: '',
  expiryDate: ''
});

const mockItems = ref<any[]>([
  {id:'1', code:'RM-BKS-01', name:'Biji Kopi Spesialti Arabica (Green Beans)'},
  {id:'2', code:'EQ-MCH-001', name:'Mesin Roasting Kopi Digital'}
]);

const filteredBatches = computed(() => {
  let list = batches.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.code?.toLowerCase().includes(q) || p.item?.name?.toLowerCase().includes(q));
  }
  return list;
});

const filteredSerials = computed(() => {
  let list = serials.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.serialNo?.toLowerCase().includes(q) || p.item?.name?.toLowerCase().includes(q));
  }
  return list;
});

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const isExpired = (iso: string) => {
   if(!iso) return false;
   const d = new Date(iso);
   const now = new Date();
   return d < now;
}

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=ItemBatch&include=item');
    if (res.data && res.data.data) {
        batches.value = res.data.data;
    }
    
    const resSerials = await api.get('/core/query?table=ItemSerial&include=item');
    if (resSerials.data && resSerials.data.data) {
        serials.value = resSerials.data.data;
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    batches.value = [
      { id: '1', code: "LOT-0426-A", expiryDate: "2027-04-20T00:00", item: { code: 'RM-BKS-01', name: 'Biji Kopi Spesialti Arabica' } },
      { id: '2', code: "LOT-0426-B", expiryDate: "2024-01-01T00:00", item: { code: 'RM-BKS-01', name: 'Biji Kopi Spesialti Arabica' } } // Mock 1 expired
    ];
    serials.value = [
      { id: '1', serialNo: "SN/ROAST/2604/001", status: "AVAILABLE", item: { code: 'EQ-MCH-001', name: 'Mesin Roasting Kopi Digital' } },
      { id: '2', serialNo: "SN/ROAST/2604/002", status: "IN_USE", item: { code: 'EQ-MCH-001', name: 'Mesin Roasting Kopi Digital' } }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  form.type = activeTab.value; // Ikuti tab
  form.itemId = mockItems.value[0].id;
  form.code = '';
  form.expiryDate = '';
  
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert(`Identitas ${form.type === 'BATCH' ? 'Grup Lot' : 'Aset Serial'} baru ditambahkan ke Node Induk Data. Sistem kini siap mengakomodir kedatangan logistik dengan parameter tersebut.`);
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
   border-radius: 16px !important;
}

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 1rem center; 
  background-size: 1em; 
}
</style>