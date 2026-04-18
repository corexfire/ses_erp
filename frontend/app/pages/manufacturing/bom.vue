<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6 space-y-4">
    <!-- Header (Premium Engineering Dashboard Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-indigo-100">Manufacturing Engineering Hub</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Struktur Produk (BOM)</span>
          </div>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Engineering <span class="text-indigo-600 not-italic text-xl md:text-2xl lg:text-3xl font-light">Structure</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-indigo-900/60 leading-relaxed mt-3">Sistem manajemen Bill of Materials (BOM) tingkat lanjut. Definisi struktur produk, perakitan bertingkat, dan routing operasi produksi untuk jaminan presisi manufaktur dan efisiensi rantai pasok.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button icon="pi pi-plus" label="BUAT STRUKTUR BOM" class="h-14 px-8 bg-slate-900 border-none text-white font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all rounded-xl" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Manufacturing Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 opacity-80">Total Struktur BOM</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter leading-none">{{ boms.length }}</h3>
          <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 group-hover:rotate-12 transition-transform">
            <i class="pi pi-sitemap text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-slate-950 text-white shadow-xl flex flex-col justify-between border border-slate-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-amber-500 tracking-[0.2em] mb-4">Main BOM (Primary)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">{{ boms.filter(b => b.isMain).length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-star-fill text-lg text-amber-500"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Akurasi Struktur</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-indigo-700 tracking-tighter leading-none">99.2%</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 group-hover:rotate-12 transition-transform"><i class="pi pi-verified text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-indigo-100 tracking-[0.2em] mb-4 opacity-80">Efisiensi Routing</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase italic">Optimum <span class="text-indigo-200 leading-none">94.5%</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-bolt text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Search & Engineering Filters -->
    <div class="p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden mt-6 animate-fade-in-up">
       <div class="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl"></div>
       
       <div class="relative flex items-center gap-6">
          <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100 rotate-3 transition-transform hover:rotate-0">
             <i class="pi pi-sitemap text-3xl"></i>
          </div>
          <div>
             <div class="text-[11px] font-black uppercase text-indigo-600 tracking-[0.2em] leading-none mb-2">Engineering Synchronization Ledger</div>
             <h2 class="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Daftar <span class="text-indigo-600 not-italic">Struktur BOM</span></h2>
          </div>
       </div>

       <div class="relative flex items-center gap-4">
          <div class="flex items-center bg-slate-50 rounded-2xl border border-slate-100 shadow-inner p-1">
             <i class="pi pi-search px-4 text-slate-300 text-xs shadow-sm"></i>
             <InputText v-model="q" placeholder="Cari Kode BOM / Produk..." @keyup.enter="load" class="border-none bg-transparent text-[11px] h-12 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" />
          </div>
          <select v-model="typeFilter" class="bg-white border border-slate-200 rounded-2xl h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm">
             <option value="">Semua Tipe</option>
             <option value="MANUFACTURING">Manufacturing</option>
             <option value="SUBCONTRACTING">Subcontracting</option>
             <option value="KIT">KIT / Bundle</option>
          </select>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-14 w-14 text-slate-400 hover:text-indigo-600 transition-all shadow-sm bg-white" />
       </div>
    </div>

    <!-- BOM Table -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden pb-20 mt-6 animate-fade-in-up">
       <table class="w-full text-sm">
         <thead class="bg-white text-left font-bold border-b border-slate-100 text-slate-900 uppercase">
           <tr>
             <th class="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Struktur BOM (Identity)</th>
             <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Produk Selesai (Finished Good)</th>
             <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center bg-slate-50/30">Komp. / Operasi</th>
             <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Tipe & Status</th>
             <th class="px-10 py-8 text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-indigo-50/30">Detail Hub</th>
           </tr>
         </thead>
         <tbody class="divide-y divide-slate-100">
           <tr v-if="loading">
             <td colspan="5" class="py-40 text-center text-slate-400">
                <i class="pi pi-spinner pi-spin text-5xl text-indigo-500 opacity-20"></i>
                <div class="mt-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 italic">Menganalisis Struktur Manufaktur...</div>
             </td>
           </tr>
           <tr v-if="!loading && boms.length === 0">
              <td colspan="5" class="py-40 text-center">
                 <div class="text-7xl mb-6 opacity-10 filter grayscale rotate-12 transition-transform hover:rotate-0 duration-700">📑</div>
                 <div class="text-[12px] uppercase font-black text-slate-300 tracking-[0.3em] mb-2">Riwayat BOM Tidak Ditemukan</div>
                 <div class="text-[10px] text-indigo-500/40 font-black uppercase tracking-widest italic">Manufacturing Engineering DB Reflected Null for Current Filter</div>
              </td>
           </tr>
           <tr v-for="b in boms" :key="b.id" @click="openDetail(b)" class="transition-all hover:bg-slate-50/50 cursor-pointer group border-l-4" :style="{ borderLeftColor: b.isActive ? '#6366f1' : '#94a3b8' }">
             <td class="px-10 py-10 align-middle">
               <div class="flex items-center gap-5">
                  <div class="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform relative overflow-hidden">
                     <i class="pi pi-sitemap text-xl relative z-10 group-hover:text-indigo-600"></i>
                     <div class="absolute inset-0 bg-indigo-50 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                  </div>
                  <div>
                     <div class="font-black text-slate-800 text-[13px] uppercase tracking-tight leading-none mb-2">{{ b.code }}</div>
                     <div class="flex items-center gap-2">
                        <div class="text-[9px] font-black font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded shadow-sm italic">v{{ b.version || 1 }}</div>
                        <div class="text-[10px] font-black text-slate-700 uppercase leading-none">{{ b.name }}</div>
                     </div>
                  </div>
               </div>
             </td>
             
             <td class="px-8 py-10 align-middle border-l border-slate-50">
               <div class="flex items-center gap-3">
                  <i class="pi pi-box text-slate-300"></i>
                  <div>
                     <div class="text-[11px] font-black text-slate-700 uppercase leading-none mb-1.5">{{ b.item?.name || 'Item Eksperimental' }}</div>
                     <div class="text-[9px] font-black text-indigo-600 tracking-widest uppercase italic opacity-60">{{ b.item?.code || 'SKU-NONE' }}</div>
                  </div>
               </div>
             </td>

             <td class="px-8 py-10 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors relative overflow-hidden">
                <div class="relative z-0">
                   <div class="flex items-center justify-center gap-4">
                      <div class="text-center">
                         <div class="text-xl font-black font-mono tracking-tighter leading-none mb-1 text-slate-800">{{ b.items?.length || 0 }}</div>
                         <div class="text-[7px] font-black uppercase tracking-widest text-slate-400">Komponen</div>
                      </div>
                      <div class="w-px h-6 bg-slate-200"></div>
                      <div class="text-center">
                         <div class="text-xl font-black font-mono tracking-tighter leading-none mb-1 text-indigo-600">{{ b.operations?.length || 0 }}</div>
                         <div class="text-[7px] font-black uppercase tracking-widest text-slate-400">Operasi</div>
                      </div>
                   </div>
                </div>
             </td>

             <td class="px-8 py-10 align-middle text-center border-l border-slate-50">
                <div class="flex flex-col items-center gap-2">
                   <span :class="bomTypeBadge(b.bomType || 'MANUFACTURING')" class="h-6 px-3 flex items-center shadow-sm">
                      {{ b.bomType || 'MANUFACTURING' }}
                   </span>
                   <span class="inline-flex rounded-xl px-4 py-1 text-[8px] font-black uppercase tracking-[0.2em] border shadow-sm transition-all group-hover:scale-105" :class="b.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-700 border-slate-100'">
                     {{ b.isActive ? 'AKTIF' : 'NON-AKTIF' }}
                   </span>
                </div>
             </td>
             
             <td class="px-10 py-10 align-middle text-right border-l border-slate-50 bg-indigo-50/10 group-hover:bg-indigo-50 transition-all relative overflow-hidden text-right">
                <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl"></div>
                <div class="flex items-center justify-end gap-2">
                   <Button icon="pi pi-pencil" @click.stop="openEdit(b)" outlined class="w-10 h-10 rounded-xl border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all bg-white shadow-sm" />
                   <Button icon="pi pi-arrow-right" @click.stop="openDetail(b)" class="bg-slate-900 border-none text-white font-black text-[10px] uppercase h-10 px-6 rounded-xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all" />
                </div>
             </td>
           </tr>
         </tbody>
       </table>
    </div>

    <!-- Error / Success feedback -->
    <transition name="fade">
      <div v-if="toastMsg" :class="toastType === 'error' ? 'bg-red-500' : 'bg-emerald-500'" class="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-medium text-white shadow-xl">
        <i :class="toastType === 'error' ? 'pi-times-circle' : 'pi-check-circle'" class="pi text-base" />
        {{ toastMsg }}
      </div>
    </transition>

    <!-- ============ BOM ENGINEERING HUB (3-PANEL DIALOG) ============ -->
    <transition name="modal">
      <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <!-- Non-dismissible backdrop: No @click handler -->
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-xl transition-all duration-700"></div>
        
        <div class="relative z-10 w-full max-w-[1400px] h-[90vh] bg-slate-50 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-white/20 animate-scale-in">
          <!-- Hub Header (Technical Style) -->
          <div class="bg-white px-12 py-10 flex justify-between items-center border-b border-slate-100 shrink-0">
            <div class="flex items-center gap-8">
              <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-2xl rotate-3 shadow-indigo-200">
                <i class="pi pi-sitemap text-3xl"></i>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                   <span class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] italic">Engineering Synchronization Protocol</span>
                   <span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                   <span class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">BOM Edition v{{ form.version || 1 }}</span>
                </div>
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-none uppercase italic">BOM <span class="text-indigo-600 not-italic">Engineering Hub</span></h2>
              </div>
            </div>
            <div class="flex items-center gap-4">
               <div v-if="saving" class="px-6 py-3 bg-indigo-50 rounded-2xl flex items-center gap-3 border border-indigo-100 animate-pulse">
                  <i class="pi pi-spinner pi-spin text-indigo-600"></i>
                  <span class="text-[9px] font-black uppercase text-indigo-600 tracking-widest">Sinkronisasi Data...</span>
               </div>
               <button @click="closeDialog" class="w-16 h-16 rounded-[1.5rem] hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-all hover:rotate-90 group">
                  <i class="pi pi-times text-xl group-hover:text-rose-500"></i>
               </button>
            </div>
          </div>

          <!-- Technical Hub Content (3-Panel Architecture) -->
          <div class="flex-1 overflow-hidden flex flex-col lg:flex-row p-12 gap-10">
             
             <!-- PANEL I: Induksi Parameter (Setup) -->
             <div class="flex-1 flex flex-col min-w-0">
                <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between">
                   <span class="flex items-center gap-2"><i class="pi pi-cog text-indigo-600"></i> I. Induksi Parameter</span>
                </div>
                <div class="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex-1 overflow-y-auto space-y-8 relative overflow-hidden group">
                   <div class="absolute right-[-20px] top-[-20px] w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:bg-indigo-100 transition-colors duration-700"></div>
                   
                   <div class="relative space-y-8">
                      <div class="space-y-3">
                         <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Output Produk Utama <span class="text-rose-500">*</span></label>
                         <div class="relative">
                            <i class="pi pi-box absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400"></i>
                            <select v-model="form.itemId" class="w-full h-16 bg-slate-50 border-none rounded-2xl pl-14 pr-6 text-[11px] font-black uppercase tracking-widest text-slate-800 outline-none focus:ring-4 focus:ring-indigo-100 transition-all appearance-none cursor-pointer">
                               <option value="">-- Pilih Produk Akhir --</option>
                               <option v-for="it in items" :key="it.id" :value="it.id">{{ it.code }} · {{ it.name }}</option>
                            </select>
                         </div>
                      </div>

                      <div class="grid grid-cols-2 gap-6">
                         <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">ID Struktur <span class="text-rose-500">*</span></label>
                            <InputText v-model="form.code" :disabled="Boolean(editingId)" placeholder="BOM-XXXX" class="w-full h-16 bg-slate-50 border-none rounded-2xl px-6 text-[11px] font-black tracking-[0.2em] text-indigo-700 outline-none focus:ring-4 focus:ring-indigo-100 uppercase" />
                         </div>
                         <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Label Protokol <span class="text-rose-500">*</span></label>
                            <InputText v-model="form.name" placeholder="Nama Struktur BOM..." class="w-full h-16 bg-slate-50 border-none rounded-2xl px-6 text-[11px] font-black uppercase tracking-widest text-slate-800 outline-none focus:ring-4 focus:ring-indigo-100" />
                         </div>
                      </div>

                      <div class="grid grid-cols-3 gap-6">
                         <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">BOM Type</label>
                            <select v-model="form.bomType" class="w-full h-16 bg-slate-50 border-none rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest text-slate-700 outline-none focus:ring-4 focus:ring-indigo-100 transition-all appearance-none cursor-pointer">
                               <option value="MANUFACTURING">Manufacturing</option>
                               <option value="SUBCONTRACTING">Sub-Contract</option>
                               <option value="KIT">KIT / Bundle</option>
                            </select>
                         </div>
                         <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Kuantitas Basis</label>
                            <InputNumber v-model="form.baseQty" :min="1" :useGrouping="false" class="w-full" inputClass="h-16 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black text-slate-800 outline-none focus:ring-4 focus:ring-indigo-100 w-full" />
                         </div>
                         <div class="space-y-3">
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Versi</label>
                            <InputNumber v-model="form.version" :min="1" :useGrouping="false" class="w-full" inputClass="h-16 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black text-slate-800 outline-none focus:ring-4 focus:ring-indigo-100 w-full" />
                         </div>
                      </div>

                      <div class="p-8 bg-indigo-50/50 rounded-[2rem] border border-indigo-50 space-y-4">
                         <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                               <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs shadow-lg">
                                  <i class="pi pi-star-fill"></i>
                               </div>
                               <div>
                                  <div class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Status Utama (Main BOM)</div>
                                  <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Jadikan ini sebagai referensi produksi utama</div>
                               </div>
                            </div>
                            <Checkbox v-model="form.isMain" :binary="true" />
                         </div>
                         <div class="border-t border-white/50 w-full"></div>
                         <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                               <div class="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xs shadow-lg">
                                  <i class="pi pi-check-circle"></i>
                               </div>
                               <div>
                                  <div class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Status Aktif</div>
                                  <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Izinkan struktur ini digunakan dalam WO</div>
                               </div>
                            </div>
                            <Checkbox v-model="form.isActive" :binary="true" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <!-- PANEL II: Struktur Komponen (Materials) -->
             <div class="flex-1 flex flex-col min-w-0">
                <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between">
                   <span class="flex items-center gap-2"><i class="pi pi-box text-amber-500"></i> II. Struktur Komponen</span>
                   <button @click="addItem" class="text-[9px] font-black bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-slate-900 transition-all flex items-center gap-2 shadow-lg">
                      <i class="pi pi-plus"></i> TAMBAH KOMPONEN
                   </button>
                </div>
                <div class="bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-100 flex-1 overflow-hidden flex flex-col">
                   <div class="overflow-y-auto flex-1 p-8 pt-6 space-y-4">
                      <div v-if="form.items.length === 0" class="h-full flex flex-col items-center justify-center text-center p-12 opacity-30 italic">
                         <i class="pi pi-box text-6xl mb-4"></i>
                         <div class="text-[10px] font-black uppercase tracking-[0.3em]">Komponen Dasar Belum Didefinisikan</div>
                      </div>
                      
                      <div v-for="(it, idx) in form.items" :key="idx" class="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors group relative overflow-hidden">
                         <div class="absolute left-0 top-0 w-1 h-full bg-indigo-200 group-hover:bg-indigo-600 transition-colors"></div>
                         <div class="flex items-center gap-6">
                            <div class="text-[11px] font-black text-slate-300 w-4">#{{ idx + 1 }}</div>
                            <div class="flex-1 space-y-4">
                               <div class="flex items-center gap-4">
                                  <div class="flex-1 relative">
                                     <select v-model="it.componentItemId" class="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest text-slate-700 outline-none focus:ring-4 focus:ring-indigo-100 appearance-none cursor-pointer">
                                        <option value="">-- PILIH KOMPONEN --</option>
                                        <option v-for="opt in items" :key="opt.id" :value="opt.id">{{ opt.code }} · {{ opt.name }}</option>
                                     </select>
                                  </div>
                                  <div class="w-32 relative">
                                     <InputText v-model="it.qty" placeholder="Qty" type="number" class="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-[11px] font-black text-slate-800 outline-none focus:ring-4 focus:ring-indigo-100 text-right" />
                                  </div>
                                  <div class="w-20 relative">
                                     <InputText v-model="it.uomCode" placeholder="UOM" class="w-full h-12 bg-white border border-slate-200 rounded-xl px-2 text-[10px] font-black text-center text-slate-400 outline-none focus:ring-4 focus:ring-indigo-100 uppercase" />
                                  </div>
                                  <button @click="removeItem(idx)" class="w-10 h-10 rounded-xl hover:bg-rose-50 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-colors">
                                     <i class="pi pi-times-circle"></i>
                                  </button>
                               </div>
                               <div class="flex items-center gap-4">
                                  <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shrink-0">
                                     <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Issue:</span>
                                     <select v-model="it.issueMethod" class="bg-transparent border-none text-[9px] font-black uppercase text-indigo-600 outline-none focus:ring-0">
                                        <option value="BACKFLUSH">Backflush</option>
                                        <option value="MANUAL">Manual</option>
                                     </select>
                                  </div>
                                  <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shrink-0">
                                     <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Scrap:</span>
                                     <input v-model="it.scrapPercent" type="number" class="w-10 bg-transparent border-none text-[9px] font-black text-slate-800 outline-none focus:ring-0 text-center" />
                                     <span class="text-[8px] font-black text-slate-400">%</span>
                                  </div>
                                  <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shrink-0">
                                     <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Op No:</span>
                                     <input v-model="it.operationNo" type="number" class="w-10 bg-transparent border-none text-[9px] font-black text-indigo-600 outline-none focus:ring-0 text-center" />
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <!-- PANEL III: Matriks Routing (Operations) -->
             <div class="flex-1 flex flex-col min-w-0">
                <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between">
                   <span class="flex items-center gap-2"><i class="pi pi-bolt text-violet-500"></i> III. Matriks Routing</span>
                   <button @click="addOperation" class="text-[9px] font-black bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-violet-600 transition-all flex items-center gap-2 shadow-lg">
                      <i class="pi pi-plus"></i> BARU
                   </button>
                </div>
                <div class="bg-slate-900 p-2 rounded-[2.5rem] shadow-2xl border-4 border-slate-800 relative overflow-hidden group flex-1 flex flex-col">
                   <div class="absolute right-[-20px] top-[-20px] w-48 h-48 bg-violet-500/10 rounded-full blur-3xl opacity-30 group-hover:bg-violet-500/20 transition-all duration-700"></div>
                   
                   <div class="flex-1 overflow-y-auto p-8 pt-6 space-y-4 relative z-10">
                      <div v-if="form.operations.length === 0" class="h-full flex flex-col items-center justify-center text-center p-12 opacity-30 italic text-white/40">
                         <i class="pi pi-bolt text-6xl mb-4"></i>
                         <div class="text-[10px] font-black uppercase tracking-[0.3em]">Routing Produksi Belum Diinduksi</div>
                      </div>

                      <div v-for="(op, idx) in form.operations" :key="idx" class="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group relative overflow-hidden">
                         <div class="flex items-center gap-4 mb-4">
                            <div class="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-[10px] font-black border border-indigo-500/20">
                               {{ op.operationNo || '-' }}
                            </div>
                            <div class="flex-1">
                               <input v-model="op.description" placeholder="Deskripsi Operasi..." class="w-full bg-transparent border-none text-[12px] font-black uppercase tracking-widest text-white outline-none focus:ring-0 placeholder:text-white/20" />
                            </div>
                            <button @click="removeOperation(idx)" class="w-8 h-8 rounded-lg hover:bg-rose-500/20 flex items-center justify-center text-white/20 hover:text-rose-400 transition-colors">
                               <i class="pi pi-times-circle"></i>
                            </button>
                         </div>

                         <div class="grid grid-cols-2 gap-3 mb-4">
                            <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                               <div class="text-[7px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Workstation</div>
                               <input v-model="op.workstation" class="w-full bg-transparent border-none p-0 text-[10px] font-black text-indigo-400 outline-none focus:ring-0 uppercase" />
                            </div>
                            <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                               <div class="text-[7px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Setup (Min)</div>
                               <input v-model="op.setupTime" type="number" class="w-full bg-transparent border-none p-0 text-[10px] font-black text-white outline-none focus:ring-0" />
                            </div>
                         </div>

                         <div class="flex items-center gap-3">
                            <div class="flex-1 bg-white/5 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                               <span class="text-[7px] font-black text-white/30 uppercase tracking-[0.2em]">Cycle Time</span>
                               <input v-model="op.cycleTime" type="number" class="w-16 bg-transparent border-none p-0 text-right text-[10px] font-black text-white outline-none focus:ring-0" />
                               <span class="text-[7px] font-black text-white/30 uppercase ml-1">Mins</span>
                            </div>
                            <div class="flex-1 bg-white/5 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                               <span class="text-[7px] font-black text-white/30 uppercase tracking-[0.2em]">Scrap %</span>
                               <input v-model="op.laborScrap" type="number" class="w-16 bg-transparent border-none p-0 text-right text-[10px] font-black text-amber-500 outline-none focus:ring-0" />
                            </div>
                         </div>
                      </div>
                   </div>

                   <!-- Bottom Confirmation (Inside Panel) -->
                   <div class="p-8 shrink-0 relative z-10 border-t border-white/5 bg-slate-950/40 mt-auto">
                      <button @click="save" :disabled="saving || !form.code || !form.name || !form.itemId" class="w-full h-16 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:grayscale transition-all">
                         <i :class="saving ? 'pi pi-spinner pi-spin' : 'pi pi-check-circle'" class="text-xl"></i>
                         {{ saving ? 'SINKRONISASI...' : (editingId ? 'SIMPAN PERUBAHAN' : 'VALIDASI & BUAT BOM') }}
                      </button>
                      <p v-if="dialogError" class="mt-4 text-[9px] font-black text-rose-400 uppercase tracking-widest text-center animate-bounce italic">{{ dialogError }}</p>
                   </div>
                </div>
             </div>

          </div>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation (Consistent Premium Style) -->
    <transition name="modal">
      <div v-if="deleteConfirmOpen" class="fixed inset-0 z-[120] flex items-center justify-center p-6">
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md"></div>
        <div class="relative z-10 w-full max-w-[500px] bg-white rounded-[3rem] p-12 shadow-2xl text-center border border-slate-100 overflow-hidden animate-scale-in">
           <div class="absolute right-0 top-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
           <div class="w-24 h-24 bg-rose-100 rounded-[2rem] flex items-center justify-center text-rose-500 mx-auto mb-8 shadow-xl shadow-rose-100 rotate-6 border-4 border-white">
              <i class="pi pi-trash text-4xl"></i>
           </div>
           <div class="text-[11px] font-black uppercase text-rose-500 tracking-[0.3em] mb-4">Eliminasi Data Permanen</div>
           <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase mb-4 italic">Hapus <span class="text-rose-500 not-italic">Struktur BOM?</span></h3>
           <p class="text-slate-500 text-sm font-medium mb-10 px-4 leading-relaxed italic">Protokol enkripsi akan menghapus struktur <strong>{{ deletingBom?.code }}</strong> secara permanen dari basis data manufaktur.</p>
           <div class="flex gap-4">
              <button @click="deleteConfirmOpen = false" class="flex-1 h-16 bg-slate-50 text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-all cursor-pointer">Batal</button>
              <button @click="doDelete" class="flex-1 h-16 bg-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all cursor-pointer">Ya, Hapus Struktur</button>
           </div>
        </div>
      </div>
    </transition>

    <!-- Success/Error Feedback (Premium Toast) -->
    <transition name="fade">
      <div v-if="toastMsg" class="fixed bottom-12 right-12 z-[200] flex items-center gap-6 p-8 rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] animate-fade-in-right border-l-8" :class="toastType === 'error' ? 'bg-slate-950 text-white border-rose-500' : 'bg-white text-slate-900 border-emerald-500'">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg" :class="toastType === 'error' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'">
          <i :class="toastType === 'error' ? 'pi-times-circle' : 'pi-check-circle'" class="pi" />
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1 leading-none">{{ toastType === 'error' ? 'Operation Failure' : 'Mission Successful' }}</div>
          <p class="text-[13px] font-black tracking-tight leading-none uppercase italic">{{ toastMsg }}</p>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation -->
    <transition name="modal">
      <div v-if="deleteConfirmOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="deleteConfirmOpen = false" />
        <div class="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 mx-auto">
            <i class="pi pi-trash text-xl text-red-500" />
          </div>
          <h3 class="mt-4 text-center text-base font-bold text-slate-800">Hapus BOM?</h3>
          <p class="mt-2 text-center text-sm text-slate-500">
            BOM <strong>{{ deletingBom?.code }}</strong> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
          </p>
          <div class="mt-5 flex gap-3">
            <button class="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50" @click="deleteConfirmOpen = false">Batal</button>
            <button class="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600" @click="doDelete">Hapus</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
type BomRow = {
  id: string;
  code: string;
  name: string;
  version?: number;
  bomType?: string;
  baseQty?: number;
  costingMethod?: string;
  isMain: boolean;
  isActive: boolean;
  item?: { id: string; code: string; name: string; baseUomCode?: string } | null;
  items?: any[];
  operations?: any[];
};

type BomItemForm = {
  componentItemId: string;
  qty: string;
  uomCode: string;
  issueMethod: string;
  operationNo: string;
  scrapPercent: string;
};

type BomOperationForm = {
  operationNo: string;
  description: string;
  workstation: string;
  setupTime: string;
  cycleTime: string;
  laborScrap: string;
  notes: string;
};

const api = useApi();

// State
const q = ref('');
const typeFilter = ref('');
const activeFilter = ref('');
const loading = ref(false);
const saving = ref(false);
const boms = ref<BomRow[]>([]);
const items = ref<any[]>([]);
const dialogError = ref<string | null>(null);
const toastMsg = ref<string | null>(null);
const toastType = ref<'success' | 'error'>('success');

// Detail Drawer
const detailOpen = ref(false);
const detailBom = ref<BomRow | null>(null);
const activeDetailTab = ref('overview');
const detailTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'components', label: 'Komponen' },
  { key: 'operations', label: 'Routing' },
];

// Dialog
const dialogOpen = ref(false);
const editingId = ref<string | null>(null);

const form = reactive({
  code: '',
  name: '',
  itemId: '',
  bomType: 'MANUFACTURING',
  costingMethod: 'STANDARD',
  baseQty: '1',
  version: '1',
  isMain: false,
  isActive: true,
  items: [] as BomItemForm[],
  operations: [] as BomOperationForm[],
});

// Delete
const deleteConfirmOpen = ref(false);
const deletingBom = ref<BomRow | null>(null);

// Stats
const stats = computed(() => [
  { label: 'Total BOM', value: boms.value.length, icon: 'pi-sitemap', color: 'bg-indigo-500' },
  { label: 'Active', value: boms.value.filter(b => b.isActive).length, icon: 'pi-check-circle', color: 'bg-emerald-500' },
  { label: 'Manufacturing', value: boms.value.filter(b => !b.bomType || b.bomType === 'MANUFACTURING').length, icon: 'pi-cog', color: 'bg-violet-500' },
  { label: 'Main BOM', value: boms.value.filter(b => b.isMain).length, icon: 'pi-star', color: 'bg-amber-500' },
]);

const bomTypeBadge = (type: string) => {
  const map: Record<string, string> = {
    MANUFACTURING: 'inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700',
    SUBCONTRACTING: 'inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700',
    KIT: 'inline-flex items-center rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700',
    PHANTOM: 'inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600',
  };
  return map[type] || map.MANUFACTURING;
};

const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  toastMsg.value = msg;
  toastType.value = type;
  setTimeout(() => { toastMsg.value = null; }, 3000);
};

const load = async () => {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.q = q.value;
    if (typeFilter.value) params.bomType = typeFilter.value;
    if (activeFilter.value !== '') params.isActive = activeFilter.value;
    const res = await api.get('/manufacturing/bom', { params });
    boms.value = res.data?.boms ?? [];
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal memuat data BOM', 'error');
  } finally {
    loading.value = false;
  }
};

const loadItems = async () => {
  try {
    const res = await api.get('/inventory/items', { params: { take: 300 } });
    items.value = res.data?.items ?? [];
  } catch { items.value = []; }
};

const resetForm = () => {
  form.code = '';
  form.name = '';
  form.itemId = '';
  form.bomType = 'MANUFACTURING';
  form.costingMethod = 'STANDARD';
  form.baseQty = '1';
  form.version = '1';
  form.isMain = false;
  form.isActive = true;
  form.items = [];
  form.operations = [];
};

const openCreate = async () => {
  editingId.value = null;
  dialogError.value = null;
  resetForm();
  await loadItems();
  dialogOpen.value = true;
};

const openEdit = async (b: BomRow) => {
  editingId.value = b.id;
  dialogError.value = null;
  form.code = b.code;
  form.name = b.name;
  form.itemId = b.item?.id ?? '';
  form.bomType = b.bomType || 'MANUFACTURING';
  form.costingMethod = b.costingMethod || 'STANDARD';
  form.baseQty = String(b.baseQty || 1);
  form.version = String(b.version || 1);
  form.isMain = b.isMain;
  form.isActive = b.isActive;
  form.items = (b.items || []).map((it) => ({
    componentItemId: it.componentItemId ?? it.componentItem?.id ?? '',
    qty: String(it.qty),
    uomCode: it.uomCode || '',
    issueMethod: it.issueMethod || 'BACKFLUSH',
    operationNo: it.operationNo != null ? String(it.operationNo) : '',
    scrapPercent: it.scrapPercent != null ? String(it.scrapPercent) : '',
  }));
  form.operations = (b.operations || []).map((op) => ({
    operationNo: String(op.operationNo),
    description: op.description,
    workstation: op.workstation || '',
    setupTime: op.setupTime != null ? String(op.setupTime) : '',
    cycleTime: op.cycleTime != null ? String(op.cycleTime) : '',
    laborScrap: op.laborScrap != null ? String(op.laborScrap) : '',
    notes: op.notes || '',
  }));
  await loadItems();
  dialogOpen.value = true;
};

const closeDialog = () => {
  if (saving.value) return;
  dialogOpen.value = false;
};

const addItem = () => {
  form.items.push({ componentItemId: '', qty: '1', uomCode: '', issueMethod: 'BACKFLUSH', operationNo: '', scrapPercent: '' });
};

const removeItem = (idx: number) => { form.items.splice(idx, 1); };

const addOperation = () => {
  const nextNo = form.operations.length > 0 ? Math.max(...form.operations.map(o => parseInt(o.operationNo) || 0)) + 10 : 10;
  form.operations.push({ operationNo: String(nextNo), description: '', workstation: '', setupTime: '', cycleTime: '', laborScrap: '', notes: '' });
};

const removeOperation = (idx: number) => { form.operations.splice(idx, 1); };

const save = async () => {
  saving.value = true;
  dialogError.value = null;
  try {
    const payload: any = {
      code: form.code,
      name: form.name,
      itemId: form.itemId || undefined,
      bomType: form.bomType,
      costingMethod: form.costingMethod,
      baseQty: parseFloat(form.baseQty) || 1,
      version: parseInt(form.version) || 1,
      isMain: form.isMain,
      isActive: form.isActive,
      items: form.items.map((it, idx) => ({
        lineNo: idx + 1,
        componentItemId: it.componentItemId,
        qty: parseFloat(it.qty) || 1,
        uomCode: it.uomCode || undefined,
        issueMethod: it.issueMethod,
        operationNo: it.operationNo ? parseInt(it.operationNo) : undefined,
        scrapPercent: it.scrapPercent ? parseFloat(it.scrapPercent) : undefined,
      })).filter(it => it.componentItemId),
      operations: form.operations.map(op => ({
        operationNo: parseInt(op.operationNo) || 0,
        description: op.description,
        workstation: op.workstation || undefined,
        setupTime: op.setupTime ? parseFloat(op.setupTime) : undefined,
        cycleTime: op.cycleTime ? parseFloat(op.cycleTime) : undefined,
        laborScrap: op.laborScrap ? parseFloat(op.laborScrap) : undefined,
        notes: op.notes || undefined,
      })).filter(op => op.description),
    };

    if (editingId.value) {
      await api.patch(`/manufacturing/bom/${editingId.value}`, payload);
      showToast('Struktur BOM Berhasil Diperbarui');
    } else {
      await api.post('/manufacturing/bom', payload);
      showToast('Struktur BOM Berhasil Diinduksi');
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    dialogError.value = e?.response?.data?.message ?? 'Gagal Menyinkronkan Data BOM';
  } finally {
    saving.value = false;
  }
};

const openDetail = (b: BomRow) => {
  // Opening Hub in edit mode for simplicity, as per "unified hub" transition
  openEdit(b);
};

const confirmDelete = (b: BomRow) => {
  deletingBom.value = b;
  deleteConfirmOpen.value = true;
};

const doDelete = async () => {
  if (!deletingBom.value) return;
  try {
    await api.delete(`/manufacturing/bom/${deletingBom.value.id}`);
    showToast(`BOM ${deletingBom.value.code} Berhasil Dieliminasi`);
    deleteConfirmOpen.value = false;
    deletingBom.value = null;
    await load();
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal Mengeliminasi BOM', 'error');
    deleteConfirmOpen.value = false;
  }
};

onMounted(load);
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes fade-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-fade-in-right { animation: fade-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

.modal-enter-active { transition: all 0.4s ease; }
.modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from :deep(.relative) { transform: scale(0.9) translateY(20px); opacity: 0; }

.fade-enter-active, .fade-leave-active { transition: all 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(20px); }

/* Custom Scrollbar for Hub */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.1); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.3); }
</style>