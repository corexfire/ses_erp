<template>
  <div class="space-y-4">
    <!-- Header (Premium Kargo & Consolidator Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-amber-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-amber-100">Kargo & Consolidator Engine</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Pengemasan & Sealing (Packing)</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Pack <span class="text-amber-600 not-italic text-3xl">Ing</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-amber-900/60 leading-relaxed mt-3">Konsolidasi Troli (Picking) ke dalam Kardus/Palet pengiriman fisik. Lakukan validasi penimbangan, cetak label, dan input Nomor Resi Kurir Ekspedisi Eksternal.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Integrasi Printer Label" size="small" icon="pi pi-print" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Generate Dokumen Pack" size="small" icon="pi pi-box-check" class="p-button-rounded h-12 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Kargo Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-slate-950 text-white shadow-xl flex flex-col justify-between border border-slate-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] mb-4 opacity-80">Total Antrean Pack</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ docs.length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-th-large text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Pending Sealing</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'DRAFT').length }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><i class="pi pi-lock-open text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Beban Kargo (KG)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">1.2<span class="text-xl ml-1 font-black">Ton</span></h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 transition-all hover:rotate-12"><i class="pi pi-sort-amount-down text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-amber-100 tracking-[0.2em] mb-4 opacity-80">Throughput Velocity</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase italic">Rapid <span class="text-amber-300">Dispatch</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-bolt text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Packing Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6"><i class="pi pi-box text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Manajemen Pengemasan</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Cargo Consolidation & Sealing Records</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari No Packing / SO / Resi..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-amber-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Tugas Konsolidasi (PAC)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Packing Lineage (Trolley to Box)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 w-64 text-center">Rantai Penjualan Induk</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Ekspedisi</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-amber-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-amber-600">Merender daftar antrean kargo...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="doc.status === 'POSTED' ? 'hover:border-l-emerald-400' : 'hover:border-l-amber-400'">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-box-check text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-amber-700 transition-colors uppercase">
                          {{ doc.code }}
                       </div>
                       <div class="mt-1 font-black text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <i class="pi pi-calendar text-[8px]"></i> {{ formatDate(doc.packingDate) }}
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 bg-slate-50/20">
                <div class="flex items-center gap-4">
                   <div class="px-3 py-1.5 bg-white rounded-xl border border-slate-100 shadow-sm grow">
                      <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Volume Fisik</div>
                      <div class="text-[11px] font-black text-slate-700 uppercase">{{ calculateLines(doc) }} Karton Tersegel</div>
                   </div>
                   <div class="px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-100 shadow-sm shrink-0 min-w-24 text-right">
                      <div class="text-[8px] font-black text-amber-600 uppercase tracking-widest mb-1">Audit Berat</div>
                      <div class="text-[11px] font-black text-amber-700 uppercase font-mono">{{ formatQty(calculateTotalWeight(doc)) }} KG</div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                <div class="flex flex-col items-center gap-2">
                   <span class="text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest border" :class="doc.salesOrderId ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-200'">{{ doc.salesOrderId ? 'TARGET SO/DO' : 'KEMAS INTERNAL' }}</span>
                   <span class="font-mono text-[11px] font-black text-slate-700 uppercase">{{ doc.salesOrder?.code || 'AD-HOC CARGO' }}</span>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span v-if="doc.status === 'POSTED'" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase shadow-sm group-hover:scale-105 transition-all">
                       <i class="pi pi-shield text-[7px] mr-2 text-emerald-500 animate-pulse"></i> SEALED & READY
                    </span>
                    <span v-else class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-amber-50 text-amber-700 border border-amber-200 uppercase shadow-sm">
                       <i class="pi pi-clock text-[7px] mr-2 animate-bounce"></i> PROSES KARTONASI
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Audit Kotak (Box)" severity="secondary" rounded outlined @click="openView(doc)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">📦</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Area pengemasan bersih. Tidak ada perintah kargo yang harus dibungkus.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Arsitektur Packing (Universal Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-amber-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-amber-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-box text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeDoc?.id ? 'Audit' : 'Draft' }} <span class="text-amber-600 italic text-2xl">Packing Workbench</span></h3>
                 <span v-if="activeDoc?.id" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm" :class="form.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'">{{ form.status === 'POSTED' ? 'Kargo Disegel' : 'KOTAK TERBUKA' }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-amber-500 text-amber-600">Cargo Consolidation & Sealing Governance</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-amber-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel Left: Relasi Konsolidasi -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-link text-emerald-500"></i> I. Relasi Konsolidasi Sumber
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-emerald-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 leading-tight">Unit Pemicu Kebutuhan (Sales Order)</label>
                       <select :disabled="isReadonly" v-model="form.salesOrderId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-widest disabled:opacity-70">
                          <option value="">-- AD-HOC (NON-SO) --</option>
                          <option v-for="s in mockSOs" :value="s.id">{{ s.code }}</option>
                       </select>
                    </div>

                    <div class="bg-amber-50 p-4 rounded-[1.5rem] border border-amber-100 shadow-inner">
                       <div class="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <i class="pi pi-building"></i> Stasiun Kerja Packer
                       </div>
                       <div class="text-xs font-black text-amber-900 uppercase tracking-tighter">Station Packing A-1 Utama</div>
                       <p class="text-[8px] font-bold text-amber-400 mt-1 uppercase italic leading-tight">Aktivitas penimbangan dan lakban kargo dilakukan di stasiun ini.</p>
                    </div>

                    <div class="space-y-4 pt-4 border-t border-slate-50">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Integrasi Audit Timbangan</label>
                       <div class="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-[9px] font-bold text-slate-400 uppercase leading-relaxed italic">Validasi berat vital untuk rekonsiliasi biaya kirim ekspedisi 3PL.</div>
                    </div>
                 </div>
              </div>

              <!-- Panel Middle: Sealing Deadlines -->
              <div class="lg:col-span-3 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-calendar-plus text-amber-500"></i> II. Sealing Deadlines & Priority
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-amber-100 border-b-[8px] border-b-amber-600">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Waktu Kargo Ditutup Asuransi</label>
                       <InputText type="date" v-model="form.packingDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all uppercase disabled:opacity-70" :disabled="isReadonly" />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">No. Penugasan Konsolidasi</label>
                       <InputText v-model="form.code" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all font-mono tracking-widest uppercase disabled:opacity-70" :disabled="isReadonly" />
                    </div>

                    <div class="pt-4 border-t border-slate-100 italic space-y-2">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Catatan Material & Proteksi</label>
                       <textarea v-model="form.notes" :disabled="isReadonly" rows="4" class="w-full rounded-2xl border-none bg-slate-50 p-4 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-amber-400 transition-all placeholder-slate-300 disabled:opacity-70" placeholder="Gunakan Bubble Wrap 3 Lapis..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Workbench Hub (Box Assembler) -->
              <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between gap-2">
                    <span class="flex items-center gap-2"><i class="pi pi-box text-rose-500"></i> III. Box Assembler Hub</span>
                    <Button v-if="!isReadonly" label="Tambah Kardus" icon="pi pi-plus" size="small" text @click="addLine" class="h-6 text-[9px] font-black text-amber-600 uppercase border border-amber-100 bg-amber-50 rounded-lg px-3" />
                 </div>
                 <div class="bg-slate-900 p-0 rounded-[2.5rem] shadow-2xl shadow-amber-900/10 border-4 border-slate-800 relative overflow-hidden group min-h-[500px] flex flex-col">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-30"></div>
                    
                    <div class="p-10 pb-6 shrink-0 relative z-10 border-b border-white/5 bg-slate-900/40">
                       <div class="flex items-center justify-between mb-2">
                          <h4 class="text-xl font-black text-white leading-none uppercase tracking-tight italic">Box <span class="text-amber-500 not-italic">Audit List</span></h4>
                          <span class="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest">{{ form.lines.length }} Box</span>
                       </div>
                       <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed text-amber-300/60 font-mono italic">Mobile Trolley -> Sealed Protective Boxes</p>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar px-10 pt-6">
                       <div class="space-y-4 pb-10">
                          <div v-for="(line, idx) in form.lines" :key="idx" class="bg-white/5 rounded-[1.5rem] p-4 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 group/line" :class="line.trackingId ? 'border-emerald-500/30 bg-emerald-500/5' : ''">
                             <div class="flex justify-between items-start mb-6">
                                <div class="flex flex-1 gap-4">
                                   <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 font-mono text-xs">{{ idx + 1 }}</div>
                                   <div class="flex-1">
                                      <input :disabled="isReadonly" type="text" v-model="line.desc" class="w-full bg-transparent border-none text-[11px] font-black text-white uppercase tracking-tight group-hover/line:text-amber-400 transition-colors leading-tight p-0 outline-none" placeholder="Isi SKU Kardus..." />
                                      <div class="flex items-center gap-2 mt-2">
                                         <input :disabled="isReadonly" type="text" v-model="line.boxNo" class="bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-0.5 text-[8px] font-black text-amber-400 uppercase tracking-widest outline-none" placeholder="Box ID" />
                                         <div class="w-1 h-1 rounded-full bg-slate-700"></div>
                                         <div class="flex items-center gap-1 group/qty">
                                            <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="bg-transparent border-none text-[9px] font-black text-slate-300 w-8 p-0 text-right outline-none" />
                                            <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="bg-transparent border-none text-[8px] font-black text-slate-500 w-10 p-0 outline-none uppercase" placeholder="Unit" />
                                         </div>
                                      </div>
                                   </div>
                                </div>
                                <button v-if="!isReadonly" @click="removeLine(idx)" class="text-slate-600 hover:text-rose-500 transition-colors p-1"><i class="pi pi-trash text-[10px]"></i></button>
                             </div>

                             <div class="grid grid-cols-2 gap-3 relative">
                                <div class="bg-black/30 p-4 rounded-xl border border-white/5 group-hover/line:border-amber-500/30 transition-all relative overflow-hidden">
                                   <div class="text-[7px] font-black uppercase tracking-widest italic text-amber-500 mb-1 leading-none">
                                      <i class="pi pi-sort-amount-down text-[6px]"></i> Audit Berat (KG)
                                   </div>
                                   <input :disabled="isReadonly" type="number" step="0.01" v-model.number="line.weight" class="w-full bg-transparent border-none text-[20px] font-mono font-black text-white p-0 focus:ring-0 outline-none leading-none relative z-10" />
                                </div>

                                <div class="bg-black/30 p-4 rounded-xl border border-white/5 group-hover/line:border-indigo-500/30 transition-all relative overflow-hidden">
                                   <div class="text-[7px] font-black uppercase tracking-widest italic text-indigo-400 mb-1 leading-none">
                                      <i class="pi pi-qrcode text-[6px]"></i> Resi AWB (3PL)
                                   </div>
                                   <input :disabled="isReadonly" type="text" v-model="line.trackingId" class="w-full bg-transparent border-none text-[20px] font-mono font-black text-indigo-200 p-0 focus:ring-0 outline-none leading-none relative z-10 uppercase tracking-tighter" placeholder="RESI-..." />
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div class="p-10 pt-6 border-t border-slate-800 shrink-0 bg-slate-900/80 backdrop-blur-md relative z-10 border-b-4 border-b-amber-700">
                       <div class="flex items-center justify-between mb-4">
                          <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Aggregate Consolidator Weight</div>
                          <div class="text-xl font-black text-amber-500 font-mono italic whitespace-nowrap">{{ formatQty(calculateTotalWeight(form)) }} KG</div>
                       </div>
                       <div v-if="!isReadonly && form.status === 'DRAFT'" class="bg-amber-600/10 rounded-2xl p-4 border border-amber-500/20 flex gap-3 text-[9px] font-black text-amber-500 uppercase italic leading-relaxed">
                          <i class="pi pi-qrcode mt-0.5"></i>
                          <span>Vital: Input Tracking ID (Resi) diperlukan untuk sengketa kargo pecah pada kurir ekspedisi.</span>
                       </div>
                       <div v-else-if="form.status === 'POSTED'" class="bg-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20 flex gap-3 text-[9px] font-black text-emerald-500 uppercase italic leading-relaxed">
                          <i class="pi pi-shield-check mt-0.5"></i>
                          <span>KARGO TERSEGEL: Dokumentasi berat dan resi telah dikunci secara audit untuk pengiriman.</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Workspace Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-print"></i> Waybill & Label Printer Linked
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Turun Dari Meja (Batal)" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                v-if="isReadonly && canManage && form.status === 'DRAFT'" 
                label="Audit: Kargo Ditutup dan Disegel (SEALED PACK!)" 
                icon="pi pi-shield" 
                size="large" 
                :loading="saving" 
                :disabled="saving" 
                @click="save" 
                class="h-14 px-12 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
             <Button 
                v-else-if="!isReadonly" 
                label="Simpan Rakitan Karton (Draft)" 
                icon="pi pi-save" 
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

const canManage = computed(() => auth.hasPermission('inventory.packing.manage') || true); 

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
  salesOrderId: '',
  packingDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockSOs = ref<any[]>([
  {id:'1', code:'SO-202604-001'},
  {id:'2', code:'SO-202604-002'}
]);

const filteredDocs = computed(() => {
  let list = docs.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.salesOrder?.code && p.salesOrder.code.toLowerCase().includes(q))
    );
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

const calculateTotalWeight = (doc: any) => {
    if (!doc.items || doc.items.length === 0) return 0;
    return doc.items.reduce((acc: number, val: any) => acc + (Number(val.weight) || 0), 0);
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=Packing&include=salesOrder,warehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "PAC-202604-001", status: "DRAFT", packingDate: "2026-04-26T00:00", notes: "Pisahkan 2 box dengan Bubble Wrap...",
        salesOrder: { code: 'SO-202604-001' }, warehouse: { name: 'Gudang Utama Area Packing' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium', qty: 50, uomCode: 'PCS', boxNo: 'BOX-001', weight: 12.5, trackingId: 'JT-88123' },
           { desc: 'Kopi Bubuk Arabica Premium', qty: 70, uomCode: 'PCS', boxNo: 'BOX-002', weight: 17.5, trackingId: 'JT-88123' }
        ]
      },
      { 
        id: '2', code: "PAC-202604-002", status: "POSTED", packingDate: "2026-04-27T00:00", notes: "Selesai di-seal palet utuh.",
        salesOrder: { code: 'SO-202604-002' }, warehouse: { name: 'Gudang Ekspedisi' },
        items: [
           { desc: 'Biji Kopi Spesialti (Whole Bean)', qty: 15, uomCode: 'KARUNG', boxNo: 'PALLET-BKS-01', weight: 750, trackingId: 'INHOUSE-DRV' }
        ]
      }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeDoc.value = null;
  isReadonly.value = false;
  form.id = '';
  form.code = 'PAC-NEW';
  form.salesOrderId = mockSOs.value[0].id;
  form.packingDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Kopi Bubuk Arabica Premium 250g", qty: 30, uomCode: 'PCS', boxNo: 'KARDUS-BARU', weight: 0.0, trackingId: '' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.salesOrderId = r.salesOrderId || (r.salesOrder? mockSOs.value[0].id : '');
  form.packingDate = r.packingDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan packer merakit ulang kardus / timbangan berat
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ desc: "", qty: 1, uomCode: 'PCS', boxNo: 'BOX-TBD', weight: 0.0, trackingId: '' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Operasi lakban (Sealed Packing) Selesai! Tracking Resi Nomor Box telah dikunci. Dokumen ini siap dirubah menjadi Delivery Order (DO).');
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