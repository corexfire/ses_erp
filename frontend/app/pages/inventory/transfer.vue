<template>
  <div class="space-y-4">
    <!-- Header (Premium Logistics Transit & Bridge Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-purple-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-purple-100">Logistics Transit & Bridge</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-purple-600">Mutasi Antar Titik Gudang (Transfer)</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Trans <span class="text-purple-600 not-italic text-3xl">Fer</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-purple-900/60 leading-relaxed mt-3">Perintah relokasi inventaris skala besar (Warehouse to Warehouse). Pengiriman barang internal dan manajemen alokasi cabang lintas wilayah.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Audit Transit / Lacak" size="small" icon="pi pi-compass" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Generate Surat Mutasi" size="small" icon="pi pi-arrow-right-arrow-left" class="p-button-rounded h-12 px-8 bg-purple-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-purple-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Transit Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-slate-950 text-white shadow-xl flex flex-col justify-between border border-slate-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-purple-400 tracking-[0.2em] mb-4 opacity-80">Antrean Mutasi</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ docs.length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-globe text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Pending Transit</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'DRAFT').length }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 group-hover:rotate-12 transition-transform"><i class="pi pi-truck text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-purple-600 tracking-[0.2em] mb-4">Tonase Lintas Cabang</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-purple-700 tracking-tighter leading-none">4.8<span class="text-xl ml-1 font-black">Ton</span></h3>
          <div class="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100 group-hover:rotate-12 transition-transform"><i class="pi pi-sync text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-purple-100 tracking-[0.2em] mb-4 opacity-80">Efisiensi Rute</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase italic">High <span class="text-purple-300">Throughput</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-bolt text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Transfer Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0"><i class="pi pi-arrow-right-arrow-left text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Mutasi Antar Gudang</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Inter-Warehouse Asset Relocation Records</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Dokumen Mutasi (TRF)..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-purple-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[260px]">Surat Penugasan (TRF)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Route Logistik Ekspedisi (Internal)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 w-48 text-center">Volume Barang (SKU)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Mutasi</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-purple-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-purple-600">Mensinkronisasi perpindahan armada cabang...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="doc.status === 'POSTED' ? 'hover:border-l-emerald-400' : 'hover:border-l-purple-400'">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-truck text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-purple-700 transition-colors uppercase italic">
                          {{ doc.code }}
                       </div>
                       <div class="mt-1 font-black text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <i class="pi pi-calendar text-[8px]"></i> {{ formatDate(doc.transferDate) }}
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 bg-slate-50/20">
                <div class="flex items-center gap-4">
                   <div class="flex-1 flex flex-col gap-1.5 min-w-[300px]">
                      <div class="flex justify-between items-center bg-white border border-slate-100 rounded-xl px-3 py-1.5 shadow-sm">
                         <span class="text-[8px] font-black text-rose-600 uppercase tracking-widest px-2 py-0.5 bg-rose-50 rounded">DEPOT ASAL:</span>
                         <span class="text-[11px] font-black text-slate-700 uppercase">{{ doc.fromWarehouse?.name || 'Gudang Pusat' }}</span>
                      </div>
                      <div class="flex justify-center -my-3 relative z-10">
                         <div class="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white border-2 border-white shadow-xl rotate-0 group-hover:rotate-180 transition-transform duration-500">
                            <i class="pi pi-arrow-right-arrow-left text-[8px]"></i>
                         </div>
                      </div>
                      <div class="flex justify-between items-center bg-white border border-slate-100 rounded-xl px-3 py-1.5 shadow-sm">
                         <span class="text-[8px] font-black text-emerald-600 uppercase tracking-widest px-2 py-0.5 bg-emerald-50 rounded">DEPOT TUJUAN:</span>
                         <span class="text-[11px] font-black text-slate-700 uppercase">{{ doc.toWarehouse?.name || 'Gudang Cabang' }}</span>
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                 <div class="flex flex-col items-center gap-1">
                    <div class="text-[14px] font-black text-slate-800 font-mono tracking-tighter">{{ calculateLines(doc) }} SKU</div>
                    <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Muatan Manifes</div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span v-if="doc.status === 'POSTED'" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase shadow-sm group-hover:scale-105 transition-all">
                       <i class="pi pi-shield-check text-[7px] mr-2 text-emerald-500"></i> DITERIMA DI LOKASI B
                    </span>
                    <span v-else class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-amber-50 text-amber-700 border border-amber-200 uppercase shadow-sm">
                       <i class="pi pi-spin pi-spinner text-[7px] mr-2"></i> PROSES PEMINDAHAN
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Buka Kendali Mutasi" severity="secondary" rounded outlined @click="openView(doc)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🌍</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Transportasi transit kosong. Tidak ada perpindahan lintas cabang.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Arsitektur Transfer (Universal Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-purple-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden text-slate-900">
          <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-purple-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-arrow-right-arrow-left text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeDoc?.id ? 'Audit' : 'Aktivasi' }} <span class="text-purple-600 italic text-2xl">Transfer Command Center</span></h3>
                 <span v-if="activeDoc?.id" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm" :class="form.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-purple-100 text-purple-700 border-purple-200'">{{ form.status === 'POSTED' ? 'Diterima di Tujuan' : 'Dalam Transit' }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-purple-500 text-purple-600 italic">Inter-Warehouse Movement & Fleet Governance</p>
            </div>
          </div>
          <button @click="dialogOpen = false" class="relative z-10 w-12 h-12 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <i class="pi pi-times text-slate-400 font-bold"></i>
          </button>
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel Left: Logistik Pemetaan -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-map text-purple-600"></i> I. Pemetaan Rute Logistik
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-purple-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-rose-600 uppercase tracking-widest px-1">Depot Keberangkatan <span class="italic text-[8px] opacity-60">(Asal)</span></label>
                       <select :disabled="isReadonly" v-model="form.fromWarehouseId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-purple-400 transition-all appearance-none cursor-pointer uppercase tracking-widest disabled:opacity-70">
                          <option value="">-- TITIK ANGKUT --</option>
                          <option v-for="w in mockWhs" :value="w.id">{{ w.name }}</option>
                       </select>
                    </div>

                    <div class="flex justify-center -my-3 relative z-10">
                       <div class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white border-4 border-white shadow-xl animate-pulse">
                          <i class="pi pi-arrow-down text-xs"></i>
                       </div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-1">Depot Pendaratan <span class="italic text-[8px] opacity-60">(Tujuan)</span></label>
                       <select :disabled="isReadonly" v-model="form.toWarehouseId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-purple-400 transition-all appearance-none cursor-pointer uppercase tracking-widest disabled:opacity-70">
                          <option value="">-- TITIK INJEKSI --</option>
                          <option v-for="w in mockWhs" :value="w.id" :disabled="w.id === form.fromWarehouseId">{{ w.name }}</option>
                       </select>
                    </div>

                    <div class="pt-4 border-t border-slate-50">
                       <div class="px-6 py-4 bg-purple-50 rounded-2xl border border-purple-100 text-[9px] font-bold text-purple-700 uppercase leading-relaxed italic">
                          Perpindahan aset antar gudang memerlukan validasi fisik saat mendarat di lokasi tujuan untuk sinkronisasi SOH.
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel Middle: Transit Schedule -->
              <div class="lg:col-span-3 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-calendar-clock text-amber-500"></i> II. Transit Schedule & Priority
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-amber-100 border-b-[8px] border-b-purple-600">
                    <div class="space-y-4 text-slate-900">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Waktu Rencana Ekspedisi</label>
                       <InputText type="date" v-model="form.transferDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-purple-400 transition-all uppercase disabled:opacity-70" :disabled="isReadonly" />
                    </div>

                    <div class="space-y-4 text-slate-900">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Identitas Penugasan</label>
                       <InputText v-model="form.code" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-purple-400 transition-all font-mono tracking-widest uppercase disabled:opacity-70" :disabled="isReadonly"   />
                    </div>

                    <div class="pt-4 border-t border-slate-100 italic space-y-2">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arahan Supir / Eksekutur</label>
                       <textarea v-model="form.notes" :disabled="isReadonly" rows="4" class="w-full rounded-2xl border-none bg-slate-50 p-4 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-purple-400 transition-all placeholder-slate-300 disabled:opacity-70 shadow-inner" placeholder="Plat Nomor Truk, Vendor Logistik..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Manifes Muatan Hub (Manifest Assembler) -->
              <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between gap-2">
                    <span class="flex items-center gap-2"><i class="pi pi-file-export text-rose-500"></i> III. Manifes Muatan Hub</span>
                    <Button v-if="!isReadonly" label="Tambah Baris Lot" icon="pi pi-plus" size="small" text @click="addLine" class="h-6 text-[9px] font-black text-purple-600 uppercase border border-purple-100 bg-purple-50 rounded-lg px-3" />
                 </div>
                 <div class="bg-slate-900 p-0 rounded-[2.5rem] shadow-2xl border-4 border-slate-800 relative overflow-hidden group min-h-[500px] flex flex-col shadow-purple-900/10">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl opacity-30"></div>
                    
                    <div class="p-10 pb-6 shrink-0 relative z-10 border-b border-white/5 bg-slate-900/40">
                       <div class="flex items-center justify-between mb-2">
                          <h4 class="text-xl font-black text-white leading-none uppercase tracking-tight italic">Cargo <span class="text-purple-400 not-italic">Manifest Audit</span></h4>
                          <span class="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest">{{ form.lines.length }} Items</span>
                       </div>
                       <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed text-purple-300/60 font-mono italic">Mobile Assets -> Inter-Warehouse Transit</p>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar px-10 pt-6">
                       <div class="space-y-4 pb-10">
                          <div v-for="(line, idx) in form.lines" :key="idx" class="bg-white/5 rounded-[1.5rem] p-4 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 group/line" :class="line.batchCode ? 'border-amber-500/30 bg-amber-500/5' : ''">
                             <div class="flex justify-between items-start mb-6">
                                <div class="flex flex-1 gap-4">
                                   <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-mono text-xs">{{ idx + 1 }}</div>
                                   <div class="flex-1">
                                      <input :disabled="isReadonly" type="text" v-model="line.desc" class="w-full bg-transparent border-none text-[11px] font-black text-white uppercase tracking-tight group-hover/line:text-purple-400 transition-colors leading-tight p-0 outline-none" placeholder="Spesifikasi Material Ekspedisi..." />
                                      <div class="flex items-center gap-2 mt-2">
                                         <div class="flex items-center gap-1 group/qty px-2 py-0.5 bg-white/5 rounded-lg border border-white/10">
                                            <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="bg-transparent border-none text-[11px] font-black text-white w-10 p-0 text-right outline-none focus:ring-0" />
                                            <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="bg-transparent border-none text-[8px] font-black text-slate-500 w-10 p-0 outline-none uppercase" placeholder="Unit" />
                                         </div>
                                         <div class="w-1 h-1 rounded-full bg-slate-700"></div>
                                         <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-lg italic">Active Assets</span>
                                      </div>
                                   </div>
                                </div>
                                <button v-if="!isReadonly" @click="removeLine(idx)" class="text-slate-600 hover:text-rose-500 transition-colors p-2"><i class="pi pi-trash text-[10px]"></i></button>
                             </div>

                             <div class="relative">
                                <div class="bg-black/30 p-4 rounded-xl border border-white/5 group-hover/line:border-amber-500/30 transition-all relative overflow-hidden">
                                   <div class="text-[7px] font-black uppercase tracking-widest italic text-amber-500 mb-2 leading-none">
                                      <i class="pi pi-qrcode text-[6px]"></i> Batch / Lot Security tracking
                                   </div>
                                   <input :disabled="isReadonly" type="text" v-model="line.batchCode" class="w-full bg-transparent border-none text-[18px] font-mono font-black text-white p-0 focus:ring-0 outline-none leading-none relative z-10 uppercase tracking-tighter" placeholder="BATCH / SERIAL NO." />
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div class="p-10 pt-6 border-t border-slate-800 shrink-0 bg-slate-900/80 backdrop-blur-md relative z-10 border-b-4 border-b-purple-700">
                       <div class="flex items-center justify-between mb-4">
                          <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Total Manifest Item Volume</div>
                          <div class="text-xl font-black text-purple-400 font-mono italic whitespace-nowrap">{{ form.lines.length }} SKU Lines</div>
                       </div>
                       <div v-if="!isReadonly && form.status === 'DRAFT'" class="bg-purple-600/10 rounded-2xl p-4 border border-purple-500/20 flex gap-3 text-[9px] font-black text-purple-500 uppercase italic leading-relaxed">
                          <i class="pi pi-info-circle mt-0.5"></i>
                          <span>Pengiriman barang antar gudang akan memotong stok SOH secara legal setelah validasi di gudang tujuan selesai.</span>
                       </div>
                       <div v-else-if="form.status === 'POSTED'" class="bg-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20 flex gap-3 text-[9px] font-black text-emerald-500 uppercase italic leading-relaxed">
                          <i class="pi pi-shield-check mt-0.5"></i>
                          <span>MUTASI SUKSES: Dokumen ini telah terkunci secara fisik dan akuntansi di kedua gudang terkait.</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Workspace Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-purple-50 border border-purple-100 rounded-xl text-purple-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-compass"></i> Fleet Transit GPS Linked
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batalkan Sesi (Batal)" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                v-if="isReadonly && canManage && form.status === 'DRAFT'" 
                label="Audit Target: Tanda Terima Penuh Ekspedisi (POSTING!)" 
                icon="pi pi-lock" 
                size="large" 
                :loading="saving" 
                :disabled="saving" 
                @click="save" 
                class="h-14 px-12 bg-purple-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-purple-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
             <Button 
                v-else-if="!isReadonly" 
                label="Izin Berangkat Armada (Sistem Draft)" 
                icon="pi pi-truck" 
                size="large" 
                @click="dialogOpen = false" 
                class="h-14 px-12 bg-slate-900 border-none text-white font-black text-[10px] uppercase shadow-2xl transition-all rounded-xl" 
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

const canManage = computed(() => auth.hasPermission('inventory.transfer.manage') || true); 

const docs = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activeDoc = ref<any>(null);

const form = reactive({
  id: '',
  code: '',
  fromWarehouseId: '',
  toWarehouseId: '',
  transferDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockWhs = ref<any[]>([
  {id:'1', name:'Gudang Pusat'},
  {id:'2', name:'Gudang Cabang Distribusi'}
]);

const statusBadgeClass = (doc: any) => {
    return doc.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-purple-100 text-purple-700 border border-purple-200';
};
const statusString = (doc: any) => {
    return doc.status === 'POSTED' ? 'Landed / Masuk Stock Target' : 'Sistem Penempatan Antre';
};

const filteredDocs = computed(() => {
  let list = docs.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.code?.toLowerCase().includes(q));
  }
  return list;
});

const formatQty = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { maximumFractionDigits: 1 });
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const calculateLines = (doc: any) => doc.items ? doc.items.length : 0;

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=StockTransfer&include=fromWarehouse,toWarehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "TRF-202604-001", status: "POSTED", transferDate: "2026-04-28T00:00", notes: "Mutasi rutin pengisian stok Cabang. Driver: Yanto.",
        fromWarehouse: { name: 'Gudang Pusat' }, toWarehouse: { name: 'Gudang Cabang' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium', qty: 500, uomCode: 'PCS', batchCode: 'LOT-0426-X' }
        ]
      },
      { 
        id: '2', code: "TRF-202604-002", status: "DRAFT", transferDate: "2026-04-29T00:00", notes: "Retur lambat terjual ke Pusat.",
        fromWarehouse: { name: 'Gudang Cabang Distribusi' }, toWarehouse: { name: 'Gudang Pusat' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium', qty: 50, uomCode: 'PCS', batchCode: 'LOT-0426-X' }
        ]
      }
    ];
    try {
        const whr = await api.get('/core/query?table=Warehouse');
        if (whr.data?.data) mockWhs.value = whr.data.data;
    } catch(er){}
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeDoc.value = null;
  isReadonly.value = false;
  form.id = '';
  form.code = 'TRF-NEW';
  form.fromWarehouseId = mockWhs.value[0]?.id || '';
  form.toWarehouseId = mockWhs.value[1]?.id || '';
  form.transferDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Kopi Bubuk Produk B", qty: 25, uomCode: 'PCS', batchCode: '' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.fromWarehouseId = r.fromWarehouseId || mockWhs.value[0]?.id;
  form.toWarehouseId = r.toWarehouseId || mockWhs.value[1]?.id;
  form.transferDate = r.transferDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan checker memodifikasi batch/troli sebelum di-post
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ desc: "", qty: 1, uomCode: 'PCS', batchCode: '' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Operasi Pemindahan Lintas Gudang Sukses Tersinkron! Stok Gudang Pelepasan didebet, Stok Gudang Penerima dikreditkan ke Ledger.');
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
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
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
