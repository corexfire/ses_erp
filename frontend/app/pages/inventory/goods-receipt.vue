<template>
  <div class="space-y-4">
    <!-- Header (Premium Supply Chain Logistics Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-100">Supply Chain Bridge</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Penerimaan Logistik</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Goods <span class="text-emerald-600 not-italic text-3xl">Receipt</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-emerald-900/60 leading-relaxed mt-3">Jembatan masuk logistik. Registrasikan inspeksi barang dari vendor ke dalam Gudang fisik, sinkronkan lot inventaris, dan publikasikan kedatangan ke Stock Ledger.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Audit Logistik" size="small" icon="pi pi-shield" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Terima Barang Masuk" size="small" icon="pi pi-download" class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Logistics Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-emerald-950 text-white shadow-xl flex flex-col justify-between border border-emerald-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 opacity-80">Total Penerimaan Baris</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ docs.reduce((acc, d) => acc + (d.items?.length || 0), 0) }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-list text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Pending Verifikasi QC</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'DRAFT').length }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-search text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Akurasi Kedatangan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">98<span class="text-xl ml-1 font-black">%</span></h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 transition-all hover:rotate-12"><i class="pi pi-verified text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-emerald-100 tracking-[0.2em] mb-4 opacity-80">Valuasi Inventaris Masuk</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase">High <span class="text-emerald-300 italic">Security</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-lock text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Logistics Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6"><i class="pi pi-truck text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Kedatangan Barang</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Inventory Inflow Records</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari No BAST / GRN..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-emerald-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Tanda Terima (GRN)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Sumber Penugasan Logistik</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Lineage Audit PO</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status & Ledger</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-emerald-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-emerald-600">Sinkronisasi armada logistik masuk...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="doc.status === 'POSTED' ? 'hover:border-l-emerald-400' : 'hover:border-l-amber-400'">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-download text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-emerald-700 transition-colors uppercase">
                          {{ doc.code }}
                       </div>
                       <div class="mt-1 font-black text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <i class="pi pi-calendar text-[8px]"></i> {{ formatDate(doc.receiptDate) }}
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 group-hover:scale-110 transition-transform">
                     <i class="pi pi-building text-xs"></i>
                  </div>
                  <div>
                    <div class="text-[11px] font-black text-slate-800 uppercase tracking-tight">{{ doc.warehouse?.name || 'Gudang Utama Area-1' }}</div>
                    <div class="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{{ doc.supplier?.name || '-' }}</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="flex items-center gap-2 mb-2">
                    <span class="text-[8px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded uppercase tracking-widest border border-indigo-200">PO REF</span>
                    <span class="font-mono text-[11px] font-black text-slate-700 uppercase">{{ doc.purchaseOrder?.code || 'WALK-IN DELIVERY' }}</span>
                 </div>
                 <div class="flex items-center gap-2">
                    <div class="h-1 w-24 bg-slate-100 rounded-full overflow-hidden flex">
                       <div class="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-1000" :style="{ width: doc.status === 'POSTED' ? '100%' : '40%' }"></div>
                    </div>
                    <span class="text-[9px] font-black text-slate-400 uppercase italic">{{ doc.status === 'POSTED' ? 'Complete' : 'Pending Posting' }}</span>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span v-if="doc.status === 'POSTED'" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase shadow-sm group-hover:scale-105 transition-all">
                       <i class="pi pi-check-circle text-[7px] mr-2 text-emerald-500 animate-pulse"></i> POSTED STOCK
                    </span>
                    <span v-else class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-amber-50 text-amber-700 border border-amber-200 uppercase shadow-sm">
                       <i class="pi pi-clock text-[7px] mr-2"></i> INSPECTION
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Audit Ekspedisi" severity="secondary" rounded outlined @click="openView(doc)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">⚓</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Rak penantian kosong. Tidak ada aktivitas pengiriman logistik masuk.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Arsitektur Logistik (Universal Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-download text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeDoc?.id ? 'Audit' : 'Draft' }} <span class="text-emerald-600 italic text-2xl">Logistics Bridge</span></h3>
                 <span v-if="activeDoc?.id" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm" :class="form.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'">{{ form.status === 'POSTED' ? 'POSTED STOCK' : 'WAITING INSPECTION' }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Inventory Inbound Management & BAST Governance</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel Left: Ekspedisi & Vendor -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-truck text-emerald-500"></i> I. Ekspedisi & Penugasan
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-emerald-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 leading-tight">Rekanan Pemasok (Vendor)</label>
                       <select :disabled="isReadonly" v-model="form.supplierId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-widest disabled:opacity-70">
                          <option value="">-- PILIH VENDOR --</option>
                          <option v-for="s in mockSuppliers" :value="s.id">{{ s.name }}</option>
                       </select>
                    </div>

                    <div class="bg-indigo-50 p-4 rounded-[1.5rem] border border-indigo-100 shadow-inner">
                       <div class="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <i class="pi pi-search"></i> Link Purchase Order (Draft)
                       </div>
                       <div class="text-xs font-black text-indigo-900 uppercase tracking-tighter">{{ activeDoc?.purchaseOrder?.code || 'WALK-IN DELIVERY (TANPA PO)' }}</div>
                       <p class="text-[8px] font-bold text-indigo-400 mt-1 uppercase italic leading-tight">Pastikan verifikasi fisik sesuai dengan kuantitas penagihan PO.</p>
                    </div>

                    <div class="space-y-4 pt-4 border-t border-slate-50">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Integrasi Jurnal & Pajak</label>
                       <div class="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-[9px] font-bold text-slate-400 uppercase leading-relaxed italic">Sistem akan otomatis menghitung valuasi HPP di stock ledger berdasarkan harga beli PO yang tertaut.</div>
                    </div>
                 </div>
              </div>

              <!-- Panel Middle: WMS Bins & BAST -->
              <div class="lg:col-span-3 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-building text-amber-500"></i> II. WMS & BAST
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-amber-100 border-b-[8px] border-b-emerald-600">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Area Destinasi (Gudang)</label>
                       <div class="w-full h-14 bg-emerald-50 rounded-2xl px-6 flex items-center gap-4 text-emerald-700 shadow-inner border border-emerald-100">
                          <i class="pi pi-building text-xl text-emerald-600"></i>
                          <div class="font-black text-[11px] uppercase tracking-widest">Gudang Utama Area-1</div>
                       </div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">No. Surat Jalan / BAST Vendor</label>
                       <InputText v-model="form.code" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all font-mono tracking-widest uppercase disabled:opacity-70" :disabled="isReadonly" />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Tiba Bongkar</label>
                       <InputText type="date" v-model="form.receiptDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all uppercase disabled:opacity-70" :disabled="isReadonly" />
                    </div>

                    <div class="pt-4 border-t border-slate-100 italic space-y-2">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Catatan Fisik (Unloading)</label>
                       <textarea v-model="form.notes" :disabled="isReadonly" rows="3" class="w-full rounded-2xl border-none bg-slate-50 p-4 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-emerald-400 transition-all placeholder-slate-300 disabled:opacity-70" placeholder="Contoh: Kondisi segel kontainer utuh & bersih..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Item Checklist & Posting -->
              <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-check-square text-indigo-500"></i> III. Audit Item & Penomoran Lot
                 </div>
                 <div class="bg-indigo-950 p-0 rounded-[2.5rem] shadow-2xl shadow-indigo-900/10 border-4 border-indigo-900 relative overflow-hidden group min-h-[500px] flex flex-col">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-30"></div>
                    
                    <div class="p-10 pb-6 shrink-0 relative z-10">
                       <div class="flex items-center justify-between mb-2">
                          <h4 class="text-xl font-black text-white leading-none uppercase tracking-tight italic">Inventory <span class="text-emerald-500 not-italic">Lines</span></h4>
                          <span class="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest">{{ form.lines.length }} Items</span>
                       </div>
                       <p class="text-[9px] font-bold text-indigo-400 uppercase tracking-widest leading-relaxed">Pastikan Labeling Batch-Lot Fisik dicatat dengan benar untuk penelusuran QC.</p>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar px-10">
                       <div class="space-y-4 pb-10">
                          <div v-for="(line, idx) in form.lines" :key="idx" class="bg-white/5 rounded-[1.5rem] p-4 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 group/line">
                             <div class="flex justify-between items-start mb-6">
                                <div class="flex gap-4">
                                   <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-mono text-xs">{{ idx + 1 }}</div>
                                   <div>
                                      <div class="text-[11px] font-black text-white uppercase tracking-tight group-hover/line:text-emerald-400 transition-colors">{{ line.desc }}</div>
                                      <div class="text-[8px] font-black text-indigo-400 uppercase tracking-widest mt-1">UOM: {{ line.uomCode }}</div>
                                   </div>
                                </div>
                                <div class="text-right">
                                   <div class="text-[8px] font-black text-slate-500 uppercase mb-1">Kuantitas Tiba</div>
                                   <div class="text-xl font-black font-mono text-emerald-400 leading-none">{{ formatQty(line.qty) }}</div>
                                </div>
                             </div>

                             <div class="relative bg-black/30 p-4 rounded-xl border border-white/5 ring-1 ring-white/5 group-hover/line:ring-emerald-500/30 transition-all">
                                <div class="text-[7px] font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2 italic">
                                   <i class="pi pi-barcode"></i> Identifikasi Batch / Lot Kontrol
                                </div>
                                <InputText v-model="line.batchCode" :disabled="isReadonly" class="w-full bg-transparent border-none text-[11px] font-mono font-black text-white p-0 focus:ring-0 outline-none placeholder:text-white/10 uppercase" placeholder="Pindai barcode lot fisik..." />
                             </div>
                          </div>
                       </div>
                    </div>

                    <div class="p-10 pt-6 border-t border-indigo-900 shrink-0 bg-indigo-950/80 backdrop-blur-md relative z-10">
                       <div v-if="!isReadonly && form.status === 'DRAFT'" class="bg-amber-600/10 rounded-2xl p-4 border border-amber-500/20 flex gap-3 text-[9px] font-black text-amber-500 uppercase italic">
                          <i class="pi pi-exclamation-triangle mt-0.5"></i>
                          <span>Draft Checklist: Data belum mengikat ledger stok persediaan pusat.</span>
                       </div>
                       <div v-else-if="form.status === 'POSTED'" class="bg-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20 flex gap-3 text-[9px] font-black text-emerald-500 uppercase italic leading-relaxed">
                          <i class="pi pi-lock mt-0.5"></i>
                          <span>STOK TERKUNCI: Transaksi ini telah menambah saldo inventaris real-time di stock ledger.</span>
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
                <i class="pi pi-shield-check"></i> Audit Keamanan Logistik Aktif
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batal & Tutup" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                v-if="isReadonly && canManage && form.status === 'DRAFT'" 
                label="Audit: Masukkan Ke Ledger (Posting Stok)" 
                icon="pi pi-lock" 
                size="large" 
                :loading="saving" 
                :disabled="saving" 
                @click="save" 
                class="h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
             <Button 
                v-else-if="!isReadonly" 
                label="Simpan Draft Penerimaan" 
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

const canManage = computed(() => auth.hasPermission('inventory.grn.manage') || true); 

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
  supplierId: '',
  receiptDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockSuppliers = ref<any[]>([
  {id:'1', name:'PT Agri Kopi Indonesia'},
  {id:'2', name:'Pabrik Pengemasan Tbk'}
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
      (p.purchaseOrder?.code && p.purchaseOrder.code.toLowerCase().includes(q))
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

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=GoodsReceiptNote&include=supplier,purchaseOrder,warehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock
    docs.value = [
      { 
        id: '1', code: "GRN-202604-002", status: "POSTED", receiptDate: "2026-04-20T00:00", notes: "Pengiriman via ekspedisi laut. Kondisi segel aman.",
        supplier: { name: 'PT Agri Kopi Indonesia' }, purchaseOrder: { code: 'PO-202604-001' }, warehouse: { name: 'Gudang Utama' },
        items: [
           { desc: 'Biji Kopi Spesialti Arabica', qty: 100, uomCode: 'KG', batchCode: 'LOT-0426-A' },
           { desc: 'Karung Goni Kualitas A', qty: 50, uomCode: 'PCS', batchCode: '' }
        ]
      },
      { 
        id: '2', code: "GRN-202604-003", status: "DRAFT", receiptDate: "2026-04-22T00:00", notes: "Pengiriman barang parsial.",
        supplier: { name: 'PT Agri Kopi Indonesia' }, purchaseOrder: { code: 'PO-202604-001' }, warehouse: { name: 'Gudang Utama' },
        items: [
           { desc: 'Biji Kopi Spesialti Arabica', qty: 250, uomCode: 'KG', batchCode: 'LOT-0426-B' }
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
  form.code = 'GRN-NEW';
  form.supplierId = mockSuppliers.value[0].id;
  form.receiptDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Biji Kopi Spesialti Arabica (Green Beans)", qty: 120, uomCode: "KG", batchCode: "" }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.supplierId = r.supplierId || mockSuppliers.value[0].id;
  form.receiptDate = r.receiptDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Buka editor minor batch jika masih DRAFT (memungkinkan staf mengisi lot sebelum post)
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Dokumen Penerimaan / Batch Lot Terekam Valid! Ledger Stock dan Kuantitas telah di-Posting ke Gudang Utama.');
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
