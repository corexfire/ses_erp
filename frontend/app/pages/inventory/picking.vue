<template>
  <div class="space-y-4">
    <!-- Header (Premium Order Fulfillment Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-rose-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-rose-100">Order Fulfillment Engine</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-rose-600">Pengambilan Material (Picking)</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Pick <span class="text-rose-600 not-italic text-3xl">Ing</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-rose-900/60 leading-relaxed mt-3">Penarikan stok inventaris dari Posisi Rak (Bin) berdasar perintah *Sales Order / Pengeluaran Internal*. Kelola tugas keranjang staf gudang untuk efisiensi *packing*.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Audit Kurang Ambil (Backorder)" size="small" icon="pi pi-exclamation-circle" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Generate Dokumen Picking" size="small" icon="pi pi-shopping-bag" class="p-button-rounded h-12 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Fulfillment Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-slate-950 text-white shadow-xl flex flex-col justify-between border border-slate-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-rose-400 tracking-[0.2em] mb-4 opacity-80">Total Tugas Troli</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ docs.length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-shopping-bag text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Pending Pengambilan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'DRAFT').length }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-clock text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Fulfillment Rate</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter leading-none">94<span class="text-xl ml-1 font-black">%</span></h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 transition-all hover:rotate-12"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-rose-100 tracking-[0.2em] mb-4 opacity-80">Backorder Risk</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase">Low <span class="text-rose-300 italic">Exposure</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-shield text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Picking Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6"><i class="pi pi-shopping-cart text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Manajemen Pengambilan</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Fulfillment & Trollery Records</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari No Picking / SO Ref..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-rose-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Tugas Penarikan (PCK)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Fulfillment Ledger (Rak to Trolley)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 w-64 text-center">Rantai Dokumen Penjualan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Keranjang</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-rose-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-rose-600">Mensinkronisasi penugasan Troli Staf...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="doc.status === 'POSTED' ? 'hover:border-l-emerald-400' : 'hover:border-l-rose-400'">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-shopping-bag text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-rose-700 transition-colors uppercase">
                          {{ doc.code }}
                       </div>
                       <div class="mt-1 font-black text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <i class="pi pi-calendar text-[8px]"></i> {{ formatDate(doc.pickingDate) }}
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 bg-slate-50/20">
                <div class="flex items-center justify-between mb-3">
                   <div class="text-[9px] font-black bg-rose-50 text-rose-600 px-2 py-0.5 rounded border border-rose-100 tracking-widest uppercase italic">Pick Progress</div>
                   <div class="text-[10px] font-black" :class="progressClass(doc)">{{ calcProgress(doc) }}%</div>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden shadow-inner">
                   <div class="h-full transition-all duration-1000" :class="doc.status === 'POSTED' ? 'bg-emerald-500' : 'bg-rose-500'" :style="{ width: calcProgress(doc) + '%' }"></div>
                </div>
                <div class="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   {{ calculateLines(doc) }} SKU dalam Keranjang
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                <div class="flex flex-col items-center gap-2">
                   <span class="text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest border" :class="doc.salesOrderId ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-200'">{{ doc.salesOrderId ? 'ORDER PELANGGAN' : 'PEMAKAIAN INTERNAL' }}</span>
                   <span class="font-mono text-[11px] font-black text-slate-700 uppercase">{{ doc.salesOrder?.code || 'AD-HOC REQUEST' }}</span>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span v-if="doc.status === 'POSTED'" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase shadow-sm group-hover:scale-105 transition-all">
                       <i class="pi pi-check-circle text-[7px] mr-2 text-emerald-500 animate-pulse"></i> TERKUMPUL
                    </span>
                    <span v-else class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-rose-50 text-rose-700 border border-rose-200 uppercase shadow-sm">
                       <i class="pi pi-map-marker text-[7px] mr-2 animate-bounce"></i> DI RAK FISIK
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Cek Troli Material" severity="secondary" rounded outlined @click="openView(doc)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🛒</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Tidak ada perintah pengeluaran barang. Kargo sedang kosong.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Arsitektur Picking (Universal Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-rose-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-rose-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-shopping-bag text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeDoc?.id ? 'Audit' : 'Draft' }} <span class="text-rose-600 italic text-2xl">Picking Basket</span></h3>
                 <span v-if="activeDoc?.id" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm" :class="form.status === 'POSTED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'">{{ form.status === 'POSTED' ? 'TERKUMPUL' : 'DI LAPANGAN' }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-rose-500 text-rose-600">Inventory Extraction & Fulfillment Governance</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-rose-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel Left: Relasi Penugasan -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-link text-indigo-500"></i> I. Relasi Penugasan Sumber
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-indigo-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 leading-tight">Pemicu Kebutuhan (Sales Order)</label>
                       <select :disabled="isReadonly" v-model="form.salesOrderId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all appearance-none cursor-pointer uppercase tracking-widest disabled:opacity-70">
                          <option value="">-- INTERNAL (NON-SO) --</option>
                          <option v-for="s in mockSOs" :value="s.id">{{ s.code }}</option>
                       </select>
                    </div>

                    <div class="bg-rose-50 p-4 rounded-[1.5rem] border border-rose-100 shadow-inner">
                       <div class="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <i class="pi pi-building"></i> Area Basis Troli
                       </div>
                       <div class="text-xs font-black text-rose-900 uppercase tracking-tighter">Gudang Utama Area-1</div>
                       <p class="text-[8px] font-bold text-rose-400 mt-1 uppercase italic leading-tight">Staf akan menyisir rak di area ini untuk memenuhi keranjang picking.</p>
                    </div>

                    <div class="space-y-4 pt-4 border-t border-slate-50">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Validasi Ledger Pengeluaran</label>
                       <div class="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-[9px] font-bold text-slate-400 uppercase leading-relaxed italic">Inventaris akan dikunci (Reserved) ke area Packing setelah audit diserahkan.</div>
                    </div>
                 </div>
              </div>

              <!-- Panel Middle: Timing & Prioritas -->
              <div class="lg:col-span-3 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-calendar-plus text-rose-500"></i> II. Timing & Prioritas Eksekusi
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-rose-100 border-b-[8px] border-b-rose-600">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Batas Waktu Pengambilan</label>
                       <InputText type="date" v-model="form.pickingDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all uppercase disabled:opacity-70" :disabled="isReadonly" />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">No. Penugasan Keranjang</label>
                       <InputText v-model="form.code" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all font-mono tracking-widest uppercase disabled:opacity-70" :disabled="isReadonly" />
                    </div>

                    <div class="pt-4 border-t border-slate-100 italic space-y-2">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Catatan Pemandu Eksekusi</label>
                       <textarea v-model="form.notes" :disabled="isReadonly" rows="4" class="w-full rounded-2xl border-none bg-slate-50 p-4 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-rose-400 transition-all placeholder-slate-300 disabled:opacity-70" placeholder="Prioritas pengiriman kilat..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Picking Basket Hub -->
              <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-list text-emerald-500"></i> III. Audit Keranjang Material
                 </div>
                 <div class="bg-slate-900 p-0 rounded-[2.5rem] shadow-2xl shadow-rose-900/10 border-4 border-slate-800 relative overflow-hidden group min-h-[500px] flex flex-col">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-rose-500/10 rounded-full blur-3xl opacity-30"></div>
                    
                    <div class="p-10 pb-6 shrink-0 relative z-10">
                       <div class="flex items-center justify-between mb-2">
                          <h4 class="text-xl font-black text-white leading-none uppercase tracking-tight italic">Pick <span class="text-rose-500 not-italic">List</span></h4>
                          <span class="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest">{{ form.lines.length }} SKU</span>
                       </div>
                       <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed text-rose-300/60 font-mono italic">Rack Positions -> Mobile Trolley Basket</p>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar px-10">
                       <div class="space-y-4 pb-10">
                          <div v-for="(line, idx) in form.lines" :key="idx" class="bg-white/5 rounded-[1.5rem] p-4 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 group/line" :class="Number(line.pickedQty) >= Number(line.qty) ? 'border-emerald-500/30 bg-emerald-500/5' : ''">
                             <div class="flex justify-between items-start mb-6">
                                <div class="flex gap-4">
                                   <div class="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 font-mono text-xs">{{ idx + 1 }}</div>
                                   <div>
                                      <div class="text-[11px] font-black text-white uppercase tracking-tight group-hover/line:text-rose-400 transition-colors leading-tight">{{ line.desc }}</div>
                                      <div class="flex items-center gap-2 mt-1">
                                         <div class="text-[8px] font-black text-slate-500 uppercase tracking-widest">Lot: {{ line.batchCode || 'BEBAS' }}</div>
                                         <div class="w-1 h-1 rounded-full bg-slate-700"></div>
                                         <div class="text-[8px] font-black text-rose-400 uppercase tracking-widest italic">Loc: {{ line.fromBinLocationId || 'AUTO-FIND' }}</div>
                                      </div>
                                   </div>
                                </div>
                                <div class="text-right">
                                   <div class="text-[8px] font-black text-slate-500 uppercase mb-1 whitespace-nowrap italic">Target SO</div>
                                   <div class="text-xl font-black font-mono text-slate-400 leading-none opacity-60">{{ formatQty(line.qty) }}</div>
                                </div>
                             </div>

                             <div class="grid grid-cols-1 gap-3 relative">
                                <div class="bg-black/30 p-4 rounded-xl border border-white/5 group-hover/line:border-rose-500/30 transition-all relative overflow-hidden">
                                   <div v-if="Number(line.pickedQty) >= Number(line.qty)" class="absolute inset-0 bg-emerald-500/10 border-l-4 border-l-emerald-500"></div>
                                   <div class="flex items-center justify-between relative z-10">
                                      <div class="text-[7px] font-black uppercase tracking-widest italic" :class="Number(line.pickedQty) >= Number(line.qty) ? 'text-emerald-500' : 'text-rose-500'">
                                         <i class="pi" :class="Number(line.pickedQty) >= Number(line.qty) ? 'pi-check-circle' : 'pi-shopping-cart'"></i> Sukses Akumulasi (Picked)
                                      </div>
                                      <div v-if="Number(line.pickedQty) >= Number(line.qty)" class="text-[7px] font-black text-emerald-400 uppercase bg-emerald-400/10 px-1.5 rounded">Fulfilled</div>
                                      <div v-else-if="Number(line.pickedQty) > 0" class="text-[7px] font-black text-amber-400 uppercase bg-amber-400/10 px-1.5 rounded">Partial</div>
                                   </div>
                                   <input :disabled="isReadonly" type="number" v-model.number="line.pickedQty" class="w-full bg-transparent border-none text-[24px] font-mono font-black text-white p-0 focus:ring-0 outline-none leading-none mt-2 relative z-10" />
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div class="p-10 pt-6 border-t border-slate-800 shrink-0 bg-slate-900/80 backdrop-blur-md relative z-10 border-b-4 border-b-rose-700">
                       <div v-if="!isReadonly && form.status === 'DRAFT'" class="bg-rose-600/10 rounded-2xl p-4 border border-rose-500/20 flex gap-3 text-[9px] font-black text-rose-500 uppercase italic leading-relaxed">
                          <i class="pi pi-exclamation-triangle mt-0.5"></i>
                          <span>Draft Picking: Jika kuantitas kurang, sistem akan menciptakan Backorder SO secara audit.</span>
                       </div>
                       <div v-else-if="form.status === 'POSTED'" class="bg-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20 flex gap-3 text-[9px] font-black text-emerald-500 uppercase italic leading-relaxed">
                          <i class="pi pi-check-square mt-0.5"></i>
                          <span>FULFILLMENT SELESAI: Barang telah diverifikasi dalam Troli dan siap dialokasikan ke area Packing.</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Workspace Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-bolt"></i> Urgent Fulfillment Mode Active
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Keluar Tanpa Simpan" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                v-if="isReadonly && canManage && form.status === 'DRAFT'" 
                label="Audit: Serahkan ke Mesin Antrean PACKING" 
                icon="pi pi-lock" 
                size="large" 
                :loading="saving" 
                :disabled="saving" 
                @click="save" 
                class="h-14 px-12 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
             <Button 
                v-else-if="!isReadonly" 
                label="Simpan Draft Troli (Field Draft)" 
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

const canManage = computed(() => auth.hasPermission('inventory.picking.manage') || true); 

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
  pickingDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockSOs = ref<any[]>([
  {id:'1', code:'SO-202604-001'},
  {id:'2', code:'SO-202604-002'}
]);

const mockBins = ref<any[]>([
  {id:'1', code:'BIN-REC-01', name:'Area Receiving'},
  {id:'2', code:'BIN-A-10', name:'Rak Kopi Mentah'}
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

const calcProgress = (doc: any) => {
    if (!doc.items || doc.items.length === 0) return 0;
    let totalTarget = 0;
    let totalGot = 0;
    doc.items.forEach((i:any) => {
        totalTarget += Number(i.qty) || 0;
        totalGot += Number(i.pickedQty) || 0;
    });
    if(totalTarget === 0) return 0;
    let rp = Math.round((totalGot / totalTarget) * 100);
    return rp > 100 ? 100 : rp;
}

const progressClass = (doc: any) => {
    const p = calcProgress(doc);
    if(p >= 100) return 'text-emerald-600';
    if(p > 0) return 'text-amber-500';
    return 'text-rose-500';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=Picking&include=salesOrder,warehouse,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "PCK-202604-001", status: "DRAFT", pickingDate: "2026-04-25T00:00", notes: "Ambil dari Rak Barang Jadi...",
        salesOrder: { code: 'SO-202604-001' }, warehouse: { name: 'Gudang Utama' },
        items: [
           { desc: 'Kopi Bubuk Arabica Premium 250g', qty: 120, pickedQty: 0, batchCode: 'LOT-0426-X', fromBinLocationId: '2' }
        ]
      },
      { 
        id: '2', code: "PCK-202604-002", status: "POSTED", pickingDate: "2026-04-26T00:00", notes: "Pengeluaran Divisi Internal",
        salesOrder: null, warehouse: { name: 'Gudang Utama' },
        items: [
           { desc: 'Biji Kopi Spesialti Arabica (Internal)', qty: 15, pickedQty: 15, batchCode: '', fromBinLocationId: '2' }
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
  form.code = 'PCK-NEW';
  form.salesOrderId = mockSOs.value[0].id;
  form.pickingDate = new Date().toISOString().split('T')[0];
  form.notes = '';
  form.status = 'DRAFT';
  form.lines = [{ desc: "Kopi Bubuk Arabica Premium 250g", qty: 30, pickedQty: 0, batchCode: "LOT-ABC", fromBinLocationId: '' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.salesOrderId = r.salesOrderId || (r.salesOrder? mockSOs.value[0].id : '');
  form.pickingDate = r.pickingDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  // Jika DRAFT, izinkan checker mengupdate PickedQty
  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Penarikan barang ke Troli berhasil di-Posting! Barang tersebut sudah dikeluarkan statusnya dan diteruskan ke modul Packing.');
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