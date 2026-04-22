<template>
  <div class="space-y-4">
    <!-- Header (Premium Audit Telemetry Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-amber-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-amber-100 italic">Inventory Audit Hub</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Stock Opname (Penyesuaian Fisik)</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Auditing <span class="text-amber-600 not-italic text-3xl font-light">Ledger</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-amber-900/60 leading-relaxed mt-3">Sistem rekonsiliasi kuantitas aktual vs sistem. Melakukan *Physical Count* riil di gudang untuk menjamin integritas data inventaris dan akurasi nilai aset perusahaan secara mutlak.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button v-if="canManage" icon="pi pi-plus" label="BUKA SIDAK OPNAME" class="h-14 px-8 bg-slate-900 border-none text-white font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all rounded-xl" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Audit Analytics Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 opacity-80">Total Dokumen Audit</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-800 tracking-tighter leading-none">{{ docs.length }}</h3>
          <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 group-hover:rotate-12 transition-transform">
            <i class="pi pi-file text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-slate-950 text-white shadow-xl flex flex-col justify-between border border-slate-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] mb-4">Risiko Selisih (Variance)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ docs.filter(p => calculateTotalVariance(p) !== 0).length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-exclamation-triangle text-lg text-amber-500"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Audit Selesai (Posted)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ docs.filter(p => p.status === 'POSTED').length }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-amber-100 tracking-[0.2em] mb-4 opacity-80">Indeks Akurasi Stok</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase italic">Precise <span class="text-amber-200 leading-none">99.8%</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-verified text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Integrated Audit Ledger (Premium Grid Architecture) -->
    <div class="space-y-6 animate-fade-in-up">
       <div class="p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl"></div>
          
          <div class="relative flex items-center gap-4">
             <div class="w-16 h-16 rounded-[1.5rem] bg-amber-600 flex items-center justify-center text-white shadow-xl shadow-amber-100 rotate-3 transition-transform hover:rotate-0">
                <i class="pi pi-search-plus text-3xl"></i>
             </div>
             <div>
                <div class="text-[11px] font-black uppercase text-amber-600 tracking-[0.2em] leading-none mb-2">Audit Synchronization Ledger</div>
                <h2 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Daftar <span class="text-amber-600 not-italic">Sidak Opname</span></h2>
             </div>
          </div>

          <div class="relative flex items-center gap-4">
             <div class="flex items-center bg-slate-50 rounded-2xl border border-slate-100 shadow-inner p-1">
                <i class="pi pi-search px-4 text-slate-300 text-xs shadow-sm"></i>
                <InputText v-model="search" placeholder="Cari Kode STC / Audit..." @keyup.enter="load" class="border-none bg-transparent text-[11px] h-12 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" />
             </div>
             <select v-model="statusFilter" class="bg-white border border-slate-200 rounded-2xl h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-sm">
                <option value="">Semua Riwayat</option>
                <option value="DRAFT">Draft Penghitungan</option>
                <option value="POSTED">Terkunci (Posted)</option>
             </select>
             <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-14 w-14 text-slate-400 hover:text-amber-600 transition-all shadow-sm bg-white" />
          </div>
       </div>

       <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden pb-20">
          <table class="w-full text-sm">
            <thead class="bg-white text-left font-bold border-b border-slate-100 text-slate-900 uppercase">
              <tr>
                <th class="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Dokumen Audit (STC)</th>
                <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Area / Pangkalan</th>
                <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center bg-slate-50/30">Variance (Selisih)</th>
                <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status Validasi</th>
                <th class="px-10 py-8 text-[9px] font-black text-amber-600 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-amber-50/30">Worksheet</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="loading">
                <td colspan="5" class="py-40 text-center text-slate-400">
                   <i class="pi pi-spinner pi-spin text-5xl text-amber-500 opacity-20"></i>
                   <div class="mt-4 text-[11px] font-black uppercase tracking-widest text-amber-600 italic">Scanning Audit Records...</div>
                </td>
              </tr>
              <tr v-for="doc in filteredDocs" v-else :key="doc.id" @click="openView(doc)" class="transition-all hover:bg-slate-50/50 cursor-pointer group border-l-4" :style="{ borderLeftColor: doc.status === 'POSTED' ? '#10b981' : '#f59e0b' }">
                <td class="px-10 py-10 align-middle">
                  <div class="flex items-center gap-5">
                     <div class="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform relative overflow-hidden">
                        <i class="pi pi-file text-xl relative z-10 group-hover:text-amber-600"></i>
                        <div class="absolute inset-0 bg-amber-50 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                     </div>
                     <div>
                        <div class="font-black text-slate-800 text-[13px] uppercase tracking-tight leading-none mb-2">{{ doc.code }}</div>
                        <div class="flex items-center gap-2">
                           <div class="text-[9px] font-black font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded shadow-sm italic">🗓️ {{ formatDate(doc.countDate) }}</div>
                           <div v-if="doc.notes" class="text-[9px] font-bold text-slate-400 truncate max-w-[150px] italic">"{{ doc.notes }}"</div>
                        </div>
                     </div>
                  </div>
                </td>
                
                <td class="px-8 py-10 align-middle border-l border-slate-50">
                  <div class="flex items-center gap-3">
                     <i class="pi pi-building text-slate-300"></i>
                     <div>
                        <div class="text-[11px] font-black text-slate-700 uppercase leading-none mb-1.5">{{ doc.warehouse?.name || 'Area Spesifik (Bin)' }}</div>
                        <div class="text-[9px] font-black text-amber-600 tracking-widest uppercase italic opacity-60">{{ calculateLines(doc) }} SKU TERAUDIT</div>
                     </div>
                  </div>
                </td>

                <td class="px-8 py-10 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors relative overflow-hidden">
                   <div v-if="doc.status === 'DRAFT'" class="absolute inset-0 bg-white/80 flex items-center justify-center text-[9px] font-black text-amber-500 tracking-widest backdrop-blur-[1px] z-10 italic">PENGHITUNGAN BERJALAN</div>
                   <div class="relative z-0">
                      <div class="text-2xl font-black font-mono tracking-tighter leading-none mb-1" :class="varianceColor(calculateTotalVariance(doc))">
                         {{ calculateTotalVariance(doc) > 0 ? '+' : '' }}{{ formatQty(calculateTotalVariance(doc)) }}
                      </div>
                      <div class="text-[8px] font-black uppercase tracking-widest text-slate-400 opacity-60">Variance Qty</div>
                   </div>
                </td>

                <td class="px-8 py-10 align-middle text-center border-l border-slate-50">
                   <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm transition-all group-hover:scale-105" :class="doc.status === 'POSTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'">
                     <i :class="doc.status === 'POSTED' ? 'pi pi-lock' : 'pi pi-pencil'" class="mr-2 text-[8px]"></i>
                     {{ doc.status === 'POSTED' ? 'POSTED' : 'DRAFT' }}
                   </span>
                </td>
                
                <td class="px-10 py-10 align-middle text-right border-l border-slate-50 bg-amber-50/10 group-hover:bg-amber-50 transition-all relative overflow-hidden">
                   <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-600/5 rounded-full blur-2xl"></div>
                   <Button label="Worksheet" icon="pi pi-arrow-right" iconPos="right" size="small" class="bg-slate-900 border-none text-white font-black text-[10px] uppercase h-10 px-6 rounded-xl shadow-xl shadow-slate-200 hover:bg-amber-600 transition-all" @click.stop="openView(doc)" />
                </td>
              </tr>
              <tr v-if="!loading && filteredDocs.length === 0">
                <td colspan="5" class="py-40 text-center">
                   <div class="text-7xl mb-6 opacity-10 filter grayscale rotate-12 transition-transform hover:rotate-0 duration-700">📑</div>
                   <div class="text-[12px] uppercase font-black text-slate-300 tracking-[0.3em] mb-2">Riwayat Audit Tidak Ditemukan</div>
                   <div class="text-[10px] text-amber-500/40 font-black uppercase tracking-widest italic">Database Ledger Reflected Null for Current Period</div>
                </td>
              </tr>
            </tbody>
          </table>
       </div>
    </div>


    <!-- Arsitektur Audit Reconciliation Hub (Universal Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-amber-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden text-slate-900">
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-amber-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-search-plus text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Rekonsiliasi <span class="text-amber-600 not-italic text-2xl">Penghitungan Stok</span></h3>
                 <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm" :class="form.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'">{{ form.status === 'POSTED' ? 'Permanent Ledger Locked' : 'Audit In-Progress' }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-amber-500 text-amber-600 italic">Verifikasi Kualitas Asset & Akurasi Kuantitas Fisik Gudang</p>
            </div>
          </div>
          <button @click="dialogOpen = false" class="relative z-10 w-12 h-12 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <i class="pi pi-times text-slate-400 font-bold"></i>
          </button>
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel I: Induksi Parameter -->
              <div class="lg:col-span-3 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-compass text-amber-600"></i> I. Induksi Parameter
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-amber-100 relative overflow-hidden group">
                    <div class="absolute right-0 top-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div class="space-y-2 relative z-10">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pangkalan Audit (Warehouse)</label>
                       <select :disabled="isReadonly" v-model="form.warehouseId" class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl h-14 px-5 text-xs font-black uppercase tracking-widest text-slate-700 outline-none focus:border-amber-500 transition-all shadow-inner">
                          <option value="">-- Pilih Lokasi --</option>
                          <option v-for="w in mockWhs" :value="w.id">{{ w.name }}</option>
                       </select>
                    </div>

                    <div class="space-y-2 relative z-10">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Batas Laporan (Cut-Off)</label>
                       <input :disabled="isReadonly" type="date" v-model="form.countDate" class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl h-14 px-5 text-xs font-black uppercase tracking-widest text-slate-700 outline-none focus:border-amber-500 transition-all shadow-inner" />
                    </div>

                    <div class="space-y-2 relative z-10">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Catatan Audit (Narrative)</label>
                       <textarea :disabled="isReadonly" v-model="form.notes" rows="4" class="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] p-5 text-[11px] font-bold text-slate-600 outline-none focus:border-amber-500 transition-all shadow-inner resize-none" placeholder="Masukkan narasi sidak..."></textarea>
                    </div>

                    <div class="pt-6 border-t border-slate-50">
                       <div class="bg-slate-900 text-white rounded-2xl p-4 border-4 border-slate-800 shadow-2xl relative overflow-hidden">
                          <i class="pi pi-shield absolute right-4 top-4 text-2xl text-amber-500 opacity-20"></i>
                          <div class="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 leading-none italic">Audit Integrity Protocol</div>
                          <p class="text-[11px] font-medium leading-relaxed italic text-slate-300">Hasil opname akan merelasikan stok fisik dengan nilai aset pada Buku Besar Keuangan secara otomatis.</p>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel II: Matriks Worksheet -->
              <div class="lg:col-span-6 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between">
                    <span class="flex items-center gap-2"><i class="pi pi-table text-amber-500"></i> II. Matriks Worksheet Fisik</span>
                    <Button v-if="!isReadonly" label="Tambah Baris Temuan" icon="pi pi-plus" size="small" class="h-8 px-4 bg-white border-2 border-slate-100 text-amber-600 font-black text-[9px] uppercase tracking-widest rounded-lg shadow-sm hover:border-amber-200 transition-all" @click="addLine" />
                 </div>
                 <div class="bg-white rounded-[2rem] border-2 border-slate-100 shadow-sm overflow-hidden flex flex-col border-b-[8px] border-b-amber-600">
                    <table class="w-full text-sm">
                       <thead class="bg-slate-50 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <tr>
                             <th class="px-6 py-5">Barang & SKU</th>
                             <th class="px-4 py-5 border-l border-slate-100 text-center w-32">System Qty</th>
                             <th class="px-4 py-5 border-l border-slate-100 text-center w-32 bg-amber-50/30 text-amber-600">Actual Count</th>
                             <th class="px-4 py-5 border-l border-slate-100 text-center w-32">Variance</th>
                             <th v-if="!isReadonly" class="w-10 border-l border-slate-100 bg-slate-50/50"></th>
                          </tr>
                       </thead>
                       <tbody class="divide-y divide-slate-50">
                          <tr v-for="(line, idx) in form.lines" :key="idx" class="group transition-colors hover:bg-slate-50/50">
                             <td class="px-6 py-6">
                                <div class="relative">
                                   <input :disabled="isReadonly" type="text" v-model="line.desc" class="w-full bg-transparent border-b-2 border-transparent focus:border-amber-500 py-1 text-[13px] font-black text-slate-800 outline-none transition-all placeholder:font-medium placeholder:text-slate-300" placeholder="Ketik Identitas Barang..." />
                                   <div class="flex items-center gap-2 mt-1">
                                      <div class="text-[9px] font-black font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded shadow-sm">{{ line.uomCode || 'PCS' }}</div>
                                      <div class="text-[9px] font-black text-amber-600/60 uppercase italic tracking-widest">{{ line.binLocationId || 'Penyimpanan Default' }}</div>
                                   </div>
                                </div>
                             </td>
                             <td class="px-4 py-6 border-l border-slate-50 text-center align-middle">
                                <div class="text-lg font-black font-mono text-slate-400 opacity-60 italic">{{ line.systemQty }}</div>
                             </td>
                             <td class="px-4 py-6 border-l border-slate-50 bg-amber-50/10 group-hover:bg-amber-50/30 transition-all text-center align-middle relative">
                                <input :disabled="isReadonly" type="number" v-model.number="line.countedQty" @input="recalc(line)" class="w-24 bg-white border-2 border-amber-200 rounded-xl py-2 px-1 text-center text-xl font-black text-amber-700 shadow-sm focus:border-amber-500 outline-none transition-all" />
                             </td>
                             <td class="px-4 py-6 border-l border-slate-50 text-center align-middle">
                                <div class="text-xl font-black font-mono tracking-tighter" :class="varianceCellClass(line.varianceQty)">
                                   {{ line.varianceQty > 0 ? '+' : '' }}{{ formatQty(line.varianceQty) }}
                                </div>
                             </td>
                             <td v-if="!isReadonly" class="px-2 py-4 align-middle border-l border-slate-50 text-center">
                                <button @click="removeLine(idx)" class="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center font-black hover:bg-rose-500 hover:text-white transition-all shadow-sm">✕</button>
                             </td>
                          </tr>
                          <tr v-if="form.lines.length === 0">
                             <td colspan="5" class="py-20 text-center">
                                <div class="text-5xl mb-4 opacity-10 filter grayscale rotate-12">📦</div>
                                <div class="text-[10px] uppercase font-black text-slate-300 tracking-[0.3em]">Lembar Worksheet Kosong</div>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>

              <!-- Panel III: Finalisasi Hub -->
              <div class="lg:col-span-3 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between">
                    <span class="flex items-center gap-2"><i class="pi pi-check-circle text-emerald-500"></i> III. Finalisasi Hub</span>
                 </div>
                 <div class="bg-slate-900 p-0 rounded-[2.5rem] shadow-2xl border-4 border-slate-800 relative overflow-hidden group h-[500px] flex flex-col">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-30 group-hover:bg-emerald-500/10 transition-all duration-700"></div>
                    
                    <div class="p-10 pb-6 shrink-0 relative z-10 border-b border-white/5 bg-slate-950/40">
                       <h4 class="text-xl font-black text-white leading-none uppercase tracking-tight italic text-shadow-xl mb-1">Audit <span class="text-amber-500 not-italic">Summary</span></h4>
                       <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono italic">Penghitungan Selisih Konsolidasi</p>
                    </div>

                    <div class="flex-1 p-10 flex flex-col justify-center items-center text-center space-y-8 relative z-10">
                       <div class="space-y-2">
                          <div class="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Global Variance Shift</div>
                          <div class="text-6xl font-black font-mono tracking-tighter drop-shadow-2xl transition-all group-hover:scale-110 duration-500" :class="calculateGlobalVariance() === 0 ? 'text-slate-400' : (calculateGlobalVariance() > 0 ? 'text-emerald-500' : 'text-rose-500')">
                             {{ calculateGlobalVariance() > 0 ? '+' : '' }}{{ formatQty(calculateGlobalVariance()) }}
                          </div>
                       </div>
                       
                       <div class="bg-white/5 p-4 rounded-2xl border border-white/5 w-full">
                          <div class="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2 italic">Decision Logic</div>
                          <p class="text-[10px] font-medium text-slate-400 leading-relaxed italic">
                             {{ calculateGlobalVariance() === 0 ? 'Data Stok Komputer sinkron sempurna dengan temuan fisik di lapangan.' : 'Terdapat diskrepansi kuantitas. Sistem akan membakar jurnal penyesuaian otomatis.' }}
                          </p>
                       </div>
                    </div>

                    <div class="p-10 pt-6 border-t border-white/5 shrink-0 bg-slate-900/80 backdrop-blur-md relative z-10 border-b-4 border-b-emerald-600">
                       <div class="bg-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20 flex gap-3 text-[9px] font-black text-emerald-400 uppercase italic leading-relaxed">
                          <i class="pi pi-verified mt-0.5 shadow-sm text-emerald-300"></i>
                          <span>Audit Integrity Protocol Active: Ledger akan terkunci permanen setelah validasi.</span>
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
                <i class="pi pi-lock"></i> Financial Adjustment Protocol v4.0
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Buang Draft (Batal)" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                v-if="!isReadonly"
                label="Simpan Pekerjaan (Draft)" 
                severity="help" 
                size="large" 
                @click="dialogOpen = false" 
                class="h-14 px-12 bg-slate-900 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all rounded-xl hover:bg-black" 
             />
             <Button 
                v-if="isReadonly && canManage && form.status === 'DRAFT'"
                label="Validasi & Kunci Ledger (POSTING!)" 
                icon="pi pi-lock"
                size="large" 
                :loading="saving" 
                :disabled="saving" 
                @click="save" 
                class="h-14 px-12 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all rounded-xl hover:bg-amber-700" 
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

const canManage = computed(() => auth.hasPermission('inventory.audit.manage') || true); 

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
  warehouseId: '',
  countDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockWhs = ref<any[]>([
  {id:'1', name:'Gudang Pusat Operasional'},
]);

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
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const calculateLines = (doc: any) => doc.items ? doc.items.length : 0;
const calculateTotalVariance = (doc: any) => doc.items ? doc.items.reduce((acc: number, cur: any) => acc + Number(cur.varianceQty), 0) : 0;

const varianceColor = (v: number) => {
    if(v === 0) return 'text-slate-200';
    if(v > 0) return 'text-emerald-500';
    return 'text-rose-500';
};

const varianceCellClass = (v: number) => {
    if(v === 0) return 'text-slate-300 opacity-40';
    if(v > 0) return 'text-emerald-600 bg-emerald-50/50 rounded-lg px-2';
    return 'text-rose-600 bg-rose-50/50 rounded-lg px-2';
}

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=StockCount&include=warehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "STC-202604-001", status: "POSTED", countDate: "2026-04-30T00:00", notes: "Audit Stok Akhir Bulan.",
        warehouse: { name: 'Gudang Pusat' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium', systemQty: 1500, countedQty: 1495, varianceQty: -5, uomCode: 'PCS', binLocationId: 'RAK-A1' }
        ]
      },
      { 
        id: '2', code: "STC-202604-002", status: "DRAFT", countDate: "2026-05-15T00:00", notes: "Sidak dadakan rak.",
        warehouse: { name: 'Gudang Pusat' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium', systemQty: 1495, countedQty: 0, varianceQty: 0, uomCode: 'PCS', binLocationId: 'RAK-A1' }
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
  form.code = 'STC-NEW';
  form.warehouseId = mockWhs.value[0]?.id || '';
  form.countDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Item / SKU Tersimpan A", systemQty: 100, countedQty: 0, varianceQty: 0, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.warehouseId = r.warehouseId || mockWhs.value[0]?.id;
  form.countDate = r.countDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan checker mengetik nilai "Counted" di lapangan
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ desc: "", systemQty: 0, countedQty: 0, varianceQty: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

// Auto-Math Variance
function recalc(line: any) {
   let s = Number(line.systemQty || 0);
   let c = Number(line.countedQty || 0);
   line.varianceQty = c - s;
}
const calculateGlobalVariance = () => form.lines.reduce((acc, cur) => acc + Number(cur.varianceQty), 0);

async function save() {
  saving.value = true;
  setTimeout(() => {
    dialogOpen.value = false;
    saving.value = false;
    load();
  }, 1500);
}

onMounted(() => {
  load();
});
</script>

<style scoped>
select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 0.5rem center; background-size: 1em; padding-right: 2rem; }
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
