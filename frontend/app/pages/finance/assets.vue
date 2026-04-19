<template>
  <div class="space-y-4">
    <!-- ═══════════════════════════════════ HEADER (Premium Asset Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-sky-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-sky-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-sky-100">Structural Capital</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-sky-600 uppercase tracking-widest">Manajemen Aset Tetap</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Inventaris <span class="text-sky-600 italic font-medium">Aset Fisik</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Valuasi dan siklus hidup aset operasional pabrik, mulai dari kapitalisasi awal hingga otomatisasi beban penyusutan berjangka.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Nilai Buku (NBV)</div>
           <div class="text-2xl font-black text-sky-700 tabular-nums tracking-tighter">{{ formatRupiah(netBookValue) }}</div>
        </div>
        <Button v-if="canManage" label="+ DAFTARKAN ASET" icon="pi pi-plus" severity="info" @click="showDialog = true"
          class="h-14 px-8 rounded-[1.25rem] bg-sky-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-sky-100 hover:scale-[1.05] active:scale-95 transition-all text-sky-100" />
      </div>
    </div>

    <!-- Asset Performance Board (KPI Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mx-6">
        <div class="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm flex flex-col justify-between group transition-all hover:bg-slate-50">
           <div class="flex justify-between items-center">
              <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Unit Aktif</div>
              <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-sm"><i class="pi pi-box"></i></div>
           </div>
           <div class="mt-4 text-2xl font-black text-slate-800 tabular-nums tracking-tighter">{{ assets.length }} Asset Registry</div>
        </div>

        <div class="bg-slate-900 rounded-[2rem] p-6 shadow-xl relative overflow-hidden group transition-all hover:translate-y-[-5px]">
           <div class="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-125 transition-transform duration-700 text-sky-500"><i class="pi pi-wallet text-[120px]"></i></div>
           <div class="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-1 relative z-10">Nilai Perolehan (Cost)</div>
           <div class="text-xl font-black text-white tabular-nums tracking-tighter relative z-10">{{ formatRupiah(totalAssetCost) }}</div>
        </div>

        <div class="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm flex flex-col justify-between group transition-all hover:bg-slate-50">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Akumulasi Penyusutan</div>
           <div class="text-xl font-black text-amber-600 tabular-nums tracking-tighter">{{ formatRupiah(totalDepreciation) }}</div>
           <div class="mt-3 flex items-center gap-2">
              <div class="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                 <div class="bg-amber-400 h-full" :style="{ width: (totalDepreciation / totalAssetCost * 100) + '%' }"></div>
              </div>
              <span class="text-[8px] font-black text-slate-400 opacity-60">{{ Math.round(totalDepreciation / totalAssetCost * 100) }}%</span>
           </div>
        </div>

        <div class="bg-sky-50 border border-sky-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between group transition-all hover:bg-sky-100">
           <div class="text-[9px] font-black text-sky-700 uppercase tracking-widest mb-1 italic">Net Book Value (NBV)</div>
           <div class="text-xl font-black text-sky-800 tabular-nums tracking-tighter">{{ formatRupiah(netBookValue) }}</div>
           <p class="text-[8px] font-bold text-sky-600 uppercase mt-2 opacity-60">Nilai Buku Bersih Terkini</p>
        </div>
    </div>

    <!-- Asset Lexicon Grid -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up uppercase tracking-tighter">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-sky-200/10 rounded-full blur-3xl text-slate-900"></div>
        
        <div class="relative flex items-center gap-4 text-slate-900">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-book text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Buku Besar Aset Tetap</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Fixed Assets Master Lexicon</p>
           </div>
        </div>

        <div class="relative flex flex-wrap items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs text-slate-900"></i>
            <InputText v-model="search" placeholder="Cari Kode / Nama Aset..." class="border-none bg-transparent text-[10px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none text-slate-900" />
          </div>

          <select v-model="categoryFilter" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-sky-500 outline-none bg-white shadow-sm transition-all text-slate-900">
            <option value="">Semua Kategori</option>
            <option value="MACHINE">Mesin & Pabrik</option>
            <option value="VEHICLE">Kendaraan</option>
            <option value="EQUIPMENT">Peralatan</option>
            <option value="BUILDING">Bangunan</option>
            <option value="IT">Teknologi / IT</option>
          </select>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-sky-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[280px]">Identitas Aset Fisik</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-32">Tgl Akuisisi</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-slate-50/50 w-40">Nilai Beli (Cost)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right w-40">Penyusutan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-sky-50/50 w-40">Nilai Buku (NBV)</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-32 border-l border-slate-50 text-right">Opsi Operasi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-sky-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-sky-600">Sinkronisasi register inventaris...</div>
              </td>
            </tr>
            
            <tr v-for="a in filteredAssets" v-else :key="a.id" class="transition-all hover:bg-sky-50/20 group border-l-4 border-l-transparent hover:border-l-sky-400 text-slate-900">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-box text-lg"></i>
                   </div>
                   <div>
                      <div class="font-black text-[11px] text-slate-800 tracking-tight group-hover:text-sky-700 transition-colors">{{ a.name }}</div>
                      <div class="flex items-center gap-2 mt-1">
                         <span class="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ a.assetNo }}</span>
                         <span class="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[7px] font-black uppercase tracking-widest rounded leading-none border border-slate-200">{{ a.category }}</span>
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-slate-500 text-[10px] italic">
                 {{ fmtDate(a.purchaseDate) }}
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-slate-50/5 opacity-70">
                 <div class="font-black text-slate-600 text-sm tabular-nums tracking-tighter">{{ formatRupiah(a.purchaseCost) }}</div>
                 <div class="text-[8px] font-black text-slate-300 font-mono mt-0.5 uppercase tracking-widest italic">Acquisition Cost</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right group-hover:bg-amber-50/50 transition-colors">
                 <div class="font-black text-amber-600 text-sm tabular-nums tracking-tighter">{{ formatRupiah(getAccumulatedDepr(a)) }}</div>
                 <div class="text-[7px] font-black text-slate-400 uppercase mt-0.5 tracking-widest">Life: {{ a.usefulLife }} Bln</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-sky-50/10 group-hover:bg-sky-50 transition-colors">
                 <div class="font-black text-sky-800 text-lg tabular-nums tracking-tighter">{{ formatRupiah(Number(a.purchaseCost) - getAccumulatedDepr(a)) }}</div>
                 <div class="text-[7px] font-black text-sky-400 uppercase mt-0.5 tracking-widest italic">Current Book Value</div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button v-if="canManage" label="Depreciation" size="small" icon="pi pi-cog" severity="warning" outlined class="text-[9px] font-black uppercase h-9 rounded-xl border-2 tracking-widest" :disabled="Number(a.purchaseCost) - getAccumulatedDepr(a) <= Number(a.salvageValue)" @click="openDepreciate(a)" />
                 </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredAssets.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500 block">
                 <div class="text-6xl mb-4 opacity-10">🏢</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Pabrik Anda tidak memiliki inventaris aset fisik terdaftar.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ ASSET REGISTRATION DIALOG ══════════════════════════════════ -->
    <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md transition-all text-slate-900 border-none">
      <div class="relative w-full max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-sky-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-sky-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-sky-200">
               <i class="pi pi-box text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Registrasi <span class="text-sky-600 italic text-2xl">Aset Tetap</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-sky-500 italic">Structural Inventory On-boarding</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="showDialog = false" class="relative z-10 hover:bg-sky-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 pb-32">
           <!-- Form Sections -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <!-- Asset Photo Placeholder -->
                 <div class="col-span-1 md:col-span-2 p-10 border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 group hover:border-sky-200 hover:text-sky-300 transition-all cursor-pointer">
                    <i class="pi pi-camera text-5xl mb-4 group-hover:scale-110 transition-transform"></i>
                    <div class="text-[9px] font-black uppercase tracking-widest text-center">FOTO DOKUMENTASI ASET (OPTIONAL)</div>
                    <div class="text-[7px] font-bold text-slate-400 uppercase mt-2 italic shadow-none">PNG, JPG, BMP MAX 5MB</div>
                 </div>

                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kode Identitas Aset (Asset No)</label>
                    <input v-model="form.assetNo" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-sky-500 shadow-sm uppercase font-mono" placeholder="FAS-XXX-0001" />
                 </div>
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Klasifikasi Kategori</label>
                    <select v-model="form.category" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-sky-500 shadow-sm cursor-pointer uppercase">
                       <option value="" disabled>-- Pilih Kategoru --</option>
                       <option value="MACHINE">Mesin Produksi F&B</option>
                       <option value="VEHICLE">Kendaraan Operasional / Kurir</option>
                       <option value="EQUIPMENT">Peralatan Kantor / Pabrik</option>
                       <option value="BUILDING">Bangunan / Gedung / Gudang</option>
                       <option value="IT">Perangkat Keras IT / Server</option>
                    </select>
                 </div>
                 <div class="col-span-1 md:col-span-2 space-y-4">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nama Deskripsi Aset</label>
                    <input v-model="form.name" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-sky-500 shadow-sm uppercase tracking-tight" placeholder="Misal: Mesin Giling Otomatis Seri A..." />
                 </div>
              </div>

              <!-- Financial Config -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-sky-50/50 rounded-[2rem] border border-sky-100">
                 <div class="space-y-4">
                    <label class="text-[10px] font-black text-sky-700 uppercase tracking-widest px-1">Tgl Beroperasi (Commissioning)</label>
                    <input type="date" v-model="form.purchaseDate" class="w-full h-14 px-5 rounded-2xl bg-white border-2 border-white text-sm font-black text-sky-800 outline-none focus:border-sky-500 shadow-sm font-mono" />
                 </div>
                 <div class="space-y-4 text-slate-900 border-none">
                    <label class="text-[10px] font-black text-sky-700 uppercase tracking-widest px-1">Harga Perolehan (Cost - IDR)</label>
                    <div class="relative">
                       <span class="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-sky-300">RP</span>
                       <input type="number" v-model.number="form.purchaseCost" class="w-full h-14 pl-14 pr-5 rounded-2xl bg-white border-2 border-white text-lg font-black text-sky-900 outline-none focus:border-sky-500 shadow-sm font-mono tabular-nums" placeholder="0" />
                    </div>
                 </div>
                 <div class="space-y-4 text-slate-900 border-none">
                    <label class="text-[10px] font-black text-amber-700 uppercase tracking-widest px-1">Umur Ekonomis (Bulan)</label>
                    <input type="number" v-model.number="form.usefulLife" class="w-full h-14 px-5 rounded-2xl bg-white border-2 border-white text-sm font-black text-amber-800 outline-none focus:border-amber-500 shadow-sm font-mono" placeholder="60 (Bulan)" />
                 </div>
                 <div class="space-y-4 text-slate-900 border-none">
                    <label class="text-[10px] font-black text-emerald-700 uppercase tracking-widest px-1">Nilai Sisa (Salvage Value)</label>
                    <div class="relative">
                       <span class="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-300">RP</span>
                       <input type="number" v-model.number="form.salvageValue" class="w-full h-14 pl-14 pr-5 rounded-2xl bg-white border-2 border-white text-sm font-black text-emerald-800 outline-none focus:border-emerald-500 shadow-sm font-mono tabular-nums" placeholder="0" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20">
           <Button label="Batalkan" severity="secondary" text @click="showDialog = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button label="Kapitalisasi Aset" icon="pi pi-check-circle" :loading="saving" :disabled="saving" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-sky-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-sky-100 hover:scale-[1.02] active:scale-95 transition-all text-sky-100" />
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ DEPRECIATION JOB DIALOG ══════════════════════════════════ -->
    <div v-if="deprDialog" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md transition-all text-slate-900 border-none">
      <div class="relative w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-amber-900">
        <!-- Header -->
        <div class="p-8 border-b border-slate-100 bg-amber-50 flex justify-between items-center relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-amber-700 flex items-center justify-center text-white shadow-xl rotate-6 group-hover:rotate-0 transition-transform shadow-amber-200">
               <i class="pi pi-cog pi-spin text-xl font-black"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-amber-900 tracking-tight leading-none uppercase">Posting <span class="text-amber-600 italic text-lg">Penyusutan</span></h3>
              <p class="text-[8px] font-black text-amber-500 uppercase tracking-widest mt-1">Manual Amortization Ledger</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="deprDialog = false" class="relative z-10 hover:bg-white h-10 w-10 text-amber-900" />
        </div>

        <div class="p-8 space-y-8 bg-white text-slate-900">
           <!-- Asset Info Ribbon -->
           <div class="p-6 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden group">
              <div class="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform"><i class="pi pi-box text-5xl"></i></div>
              <div class="text-[8px] font-black text-sky-400 uppercase tracking-widest mb-2 leading-none">Aset Target Dikalibrasi</div>
              <div class="text-[11px] font-black uppercase tracking-tight line-clamp-1 group-hover:text-sky-300 transition-colors">{{ activeAssetObj?.name }}</div>
              <div class="mt-2 font-mono text-[9px] font-black text-slate-400 italic">ID: {{ activeAssetObj?.assetNo }}</div>
           </div>

           <!-- Depreciation Preview -->
           <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-inner text-slate-900">
                 <div class="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">NBV Sebelum</div>
                 <div class="text-xs font-black tabular-nums tracking-tighter">{{ formatRupiah(Number(activeAssetObj?.purchaseCost) - getAccumulatedDepr(activeAssetObj)) }}</div>
              </div>
              <div class="p-4 bg-sky-50 border border-sky-100 rounded-2xl shadow-inner text-slate-900">
                 <div class="text-[7px] font-black text-sky-500 uppercase tracking-widest mb-1">NBV Sesudah</div>
                 <div class="text-xs font-black tabular-nums tracking-tighter text-sky-700">{{ formatRupiah((Number(activeAssetObj?.purchaseCost) - getAccumulatedDepr(activeAssetObj)) - deprForm.depreciationAmount) }}</div>
              </div>
           </div>

           <div class="space-y-6">
              <div class="space-y-3">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Beban Penyusutan Bulan Ini (IDR)</label>
                 <div class="relative">
                    <span class="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">RP</span>
                    <input type="number" v-model.number="deprForm.depreciationAmount" class="w-full h-16 pl-14 pr-5 rounded-2xl bg-amber-50/30 border-2 border-amber-100 text-2xl font-black text-amber-800 outline-none focus:border-amber-500 shadow-xl font-mono tabular-nums transition-all" />
                 </div>
              </div>

              <div class="space-y-3">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Periode Tutup Buku (End Date)</label>
                 <input type="date" v-model="deprForm.periodDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-amber-500 shadow-sm font-mono" />
              </div>

              <div class="space-y-3">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Catatan Memo Jurnal</label>
                 <textarea v-model="deprForm.notes" rows="2" class="w-full p-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-medium text-slate-600 outline-none focus:border-amber-500 shadow-inner" placeholder="Penyusutan bulanan manual..."></textarea>
              </div>
           </div>
        </div>

        <div class="p-8 border-t border-slate-100 bg-white flex flex-col gap-3">
           <Button label="Posting Jurnal Penyusutan" icon="pi pi-check-circle" :loading="working" @click="submitDepr"
             class="h-14 px-10 rounded-[1.25rem] bg-amber-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-amber-100 hover:scale-[1.02] active:scale-95 transition-all text-amber-100" />
           <Button label="Batalkan Sesi" severity="secondary" text @click="deprDialog = false" class="h-10 font-black text-[9px] uppercase tracking-widest text-slate-400" />
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

const canManage = computed(() => auth.hasPermission('finance.asset.create') || true);

const categoryFilter = ref('');
const search = ref('');
const loading = ref(false);

const assets = ref<any[]>([]);

const showDialog = ref(false);
const deprDialog = ref(false);
const saving = ref(false);
const working = ref(false);

const activeAssetObj = ref<any>(null);

const form = reactive({ 
  assetNo: '', 
  name: '', 
  category: '', 
  purchaseDate: new Date().toISOString().slice(0,10), 
  purchaseCost: 0, 
  usefulLife: 60,
  salvageValue: 0,
  depreciationMethod: 'STRAIGHT_LINE'
});

const deprForm = reactive({ periodDate: new Date().toISOString().slice(0,10), depreciationAmount: 0, notes: 'Automated Vue Depreciation Job' });

const filteredAssets = computed(() => {
   let list = assets.value;
   if (categoryFilter.value) {
       list = list.filter(x => x.category === categoryFilter.value);
   }
   if(search.value) {
      const q = search.value.toLowerCase();
      list = list.filter(x => 
         x.assetNo?.toLowerCase().includes(q) || 
         x.name?.toLowerCase().includes(q)
      );
   }
   return list;
});

const getAccumulatedDepr = (asset: any) => {
    if (!asset || !asset.depreciationEntries) return 0;
    return asset.depreciationEntries.reduce((sum, d) => sum + Number(d.depreciationAmount), 0);
};

const totalAssetCost = computed(() => {
   return assets.value.reduce((sum, curr) => sum + Number(curr.purchaseCost), 0);
});

const totalDepreciation = computed(() => {
   return assets.value.reduce((sum, curr) => sum + getAccumulatedDepr(curr), 0);
});

const netBookValue = computed(() => {
    return totalAssetCost.value - totalDepreciation.value;
})

const formatRupiah = (val: number | string) => {
   if(!val && val !== 0) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const fmtDate = (d: string) => {
    if(!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const load = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/finance/assets`);
    // Safe Axios response handling
    const payload: any = res.data || res;
    assets.value = payload?.assets || [];
  } catch (e) {
    console.warn('Failed loading assets', e);
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  if(!form.assetNo || !form.name || !form.category || form.purchaseCost <= 0) {
      return showMsg(error, 'Mohon lengkapi seluruh field aset mandatory.');
  }
  saving.value = true;
  try {
    await api.post('/finance/assets', form);
    showMsg(success, 'Data aset tetap berhasil didaftarkan ke inventaris ERP.');
    showDialog.value = false;
    Object.assign(form, { assetNo: '', name: '', category: '', purchaseCost: 0, usefulLife: 60, salvageValue: 0 });
    await load();
  } catch(e) {
     showMsg(error, 'Gagal mendata registrasi aset. Periksa koneksi data.');
  } finally { 
     saving.value = false; 
  }
};

const openDepreciate = (a: any) => { 
  activeAssetObj.value = a;
  
  // Calculate Straight line default
  const cost = Number(a.purchaseCost);
  const salv = Number(a.salvageValue);
  const life = Number(a.usefulLife);
  const baseLineMonthly = Math.round((cost - salv) / life);

  Object.assign(deprForm, { 
    periodDate: new Date().toISOString().slice(0, 10), 
    depreciationAmount: baseLineMonthly > 0 ? baseLineMonthly : 0, 
    notes: 'Posting penyusutan manual dari dasbor Asset Register' 
  }); 
  deprDialog.value = true; 
};

const submitDepr = async () => {
  if (deprForm.depreciationAmount <= 0) {
      return showMsg(error, 'Beban penyusutan harus lebih besar dari 0 Rupiah.');
  }
  working.value = true;
  try {
    await api.post(`/finance/assets/${activeAssetObj.value.id}/depreciation`, deprForm);
    showMsg(success, `Penyusutan untuk ${activeAssetObj.value.assetNo} berhasil diposting.`);
    deprDialog.value = false;
    await load();
  } catch(e) {
    showMsg(error, 'Gagal memproses jurnal penyusutan aset.');
  } finally { 
    working.value = false; 
  }
};

onMounted(() => { load(); });
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