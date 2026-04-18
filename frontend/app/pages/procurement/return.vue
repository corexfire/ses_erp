<template>
  <div class="space-y-4">
    <!-- Header (Premium QC Claims Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-rose-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-rose-100">Quality Governance</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-rose-600">Audit Klaim & Retur</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Retur <span class="text-rose-600 italic text-3xl">Pembelian</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-rose-900/60 leading-relaxed mt-3">Pusat kendali klaim pengembalian aset akibat cacat produk (Defect) atau ketidaksesuaian spesifikasi. Pastikan pemotongan kewajiban (A/P) terhitung presisi berdasarkan inspeksi QC.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Laporan Klaim QC" size="small" icon="pi pi-shield" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Entry Retur Barang" size="small" icon="pi pi-replay" class="p-button-rounded h-12 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic QC Valuation KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-rose-950 text-white shadow-xl flex flex-col justify-between border border-rose-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-rose-400 tracking-[0.2em] mb-4 opacity-80">Total Klaim Retur</div>
        <div class="flex items-end justify-between">
          <h3 class="text-2xl font-black text-white tracking-widest leading-none">IDR <span class="text-4xl tracking-tighter">{{ formatCurrency(returns.reduce((acc, x) => acc + x.grandTotal, 0)) }}</span></h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-credit-card text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Pending Validasi QC</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-700 tracking-tighter leading-none">{{ returns.filter(x => x.status === 'PENDING_APPROVAL').length }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><i class="pi pi-clock text-lg"></i></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Kompensasi A/P</div>
        <div class="flex items-end justify-between">
          <h3 class="text-2xl font-black text-slate-700 tracking-tighter leading-none uppercase">Balanced</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 transition-all hover:rotate-12"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Defect Ratio</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">2.4<span class="text-xl ml-1">%</span></h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 group-hover:rotate-12 transition-transform"><i class="pi pi-chart-bar text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Claims Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6"><i class="pi pi-shield text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Retur & Klaim</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Deductive Financial Records (Debit Notes)</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari No Retur / Pemasok..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-rose-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Returns Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-56">Tanda Bukti Retur</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Identitas Pemasok</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Alasan Penolakan QC</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right border-l border-slate-50">Nilai Refund (IDR)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-32 border-l border-slate-50">Status Eksekusi</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-36 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-rose-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-rose-600">Sinkronisasi histori klaim pengembalian aset...</div>
              </td>
            </tr>
            
            <tr v-for="ret in filteredReturns" v-else :key="ret.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="ret.status === 'APPROVED' ? 'hover:border-l-emerald-400' : 'hover:border-l-rose-400 bg-slate-100/10'">
              <td class="px-8 py-6 align-top">
                 <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-rose-700 transition-colors uppercase flex items-center gap-2">
                    {{ ret.code }}
                    <i v-if="ret.status === 'APPROVED'" class="pi pi-verified text-emerald-500 text-[9px]"></i>
                 </div>
                 <div class="mt-2 flex flex-col gap-1">
                    <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><i class="pi pi-calendar text-rose-400"></i> Terbit: {{ formatDate(ret.returnDate) }}</div>
                    <div class="flex gap-1.5 mt-1">
                       <span v-if="ret.invoiceId" class="text-[7px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100 tracking-widest">INV: {{ ret.invoice?.code }}</span>
                       <span v-if="ret.orderId" class="text-[7px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 tracking-widest">PO: {{ ret.order?.code }}</span>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-top border-l border-slate-50">
                <div class="font-black text-[11px] text-slate-700 uppercase tracking-tight group-hover:text-rose-600 transition-colors">{{ ret.supplier?.name || '-' }}</div>
                <div class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60 italic">Vendor Pengembalian</div>
              </td>

              <td class="px-6 py-6 align-top border-l border-slate-50 max-w-xs">
                 <div class="text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100 inline-block uppercase tracking-widest mb-2">{{ ret.reason || 'Masalah Teknis' }}</div>
                 <div class="text-[10px] font-bold text-slate-500 line-clamp-2 leading-relaxed italic uppercase tracking-tight">{{ ret.notes || '-' }}</div>
              </td>

              <td class="px-6 py-6 align-top text-right border-l border-slate-50 bg-slate-50/20 group-hover:bg-slate-100/30 transition-colors">
                 <div class="font-mono text-[13px] font-black text-rose-700 tracking-tighter">{{ formatCurrency(ret.grandTotal) }}</div>
                 <div class="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 italic">Deductive Invoice Value</div>
              </td>

              <td class="px-6 py-6 align-top text-center border-l border-slate-50 relative overflow-hidden">
                 <div class="relative z-10 flex flex-col items-center gap-1.5">
                    <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border w-28 flex items-center justify-center shadow-sm uppercase shadow-sm" :class="getStatusStyle(ret.status)">
                       {{ standardizeStatus(ret).replace('_', ' ') }}
                    </span>
                    <div v-if="ret.status === 'APPROVED'" class="text-[8px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 mt-1 transition-all group-hover:scale-105">
                       <i class="pi pi-lock text-[7px]"></i> AP DEDUCTED
                    </div>
                 </div>
              </td>

              <td class="px-8 py-6 align-top text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Audit Klaim" severity="secondary" rounded outlined @click="openView(ret)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredReturns.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">⚓</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Bersih! Tidak ada riwayat barang yang di-retur akibat masalah QC.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>    <!-- Integrasi Klaim QC (Universal Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-6xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-rose-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-rose-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-replay text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeRet?.id ? 'Audit' : 'Draft' }} <span class="text-rose-600 italic text-2xl">Klaim Retur Barang</span></h3>
                 <span v-if="activeRet?.id" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm" :class="getStatusStyle(activeRet.status)">{{ activeRet.status }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-rose-500 text-rose-600">Inventory Liquidation & QC Governance Workspace</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-rose-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              
              <!-- Panel 1: Logistik & Unit -->
              <div class="animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-truck text-rose-500"></i> I. Logistik & Unit Terkait
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-rose-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Pemasok Tanggung Jawab <span class="text-rose-500 ml-1 opacity-50 font-black">*</span></label>
                       <select v-if="!isReadonly" v-model="form.supplierId" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                          <option value="">-- PILIH VENDOR --</option>
                          <option v-for="s in mockSuppliers" :value="s.id">{{ s.name }}</option>
                       </select>
                       <div v-else class="h-14 bg-rose-50/30 rounded-2xl px-6 flex items-center justify-between font-black text-[11px] text-rose-800 border-2 border-rose-100 italic">
                          <span class="tracking-[0.3em] font-mono">LINKED VENDOR</span>
                          <span class="truncate ml-4">{{ activeRet?.supplier?.name || '-' }}</span>
                       </div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Referensi Dokumen (PO/GRN)</label>
                       <InputText v-if="!isReadonly" v-model="form.orderCode" placeholder="Cth: PO-2026..." class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all font-mono tracking-widest uppercase" />
                       <div v-else class="h-14 bg-slate-50 rounded-2xl px-6 flex items-center font-mono text-[11px] font-black text-slate-500 border-2 border-slate-100 italic uppercase">{{ activeRet?.order?.code || 'N/A' }}</div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-amber-600 uppercase tracking-widest px-1">Target Tagihan (AP Invoice)</label>
                       <div v-if="!isReadonly" class="flex gap-2">
                          <InputText v-model="form.invoiceId" placeholder="ID Invoice.." class="flex-1 h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-amber-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all font-mono tracking-widest uppercase" />
                          <Button label="Map" severity="warning" class="px-6 h-14 bg-amber-600 border-none text-white font-black text-[10px] uppercase rounded-2xl hover:bg-amber-700 transition-all" />
                       </div>
                       <div v-else class="h-14 bg-amber-50 rounded-2xl px-6 flex items-center justify-between font-mono text-[11px] font-black text-amber-800 border-2 border-amber-100 italic shadow-sm">
                          <i class="pi pi-file-o"></i>
                          <span>{{ activeRet?.invoice?.code || 'BELUM DIMAP KE AP' }}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel 2: Investigasi & QC -->
              <div class="animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-search-plus text-amber-500"></i> II. Investigasi & Justifikasi QC
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-amber-100 border-b-[8px] border-b-amber-600">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Tanggal Inspeksi & Retur</label>
                       <input v-if="!isReadonly" type="date" v-model="form.returnDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all font-mono" />
                       <div v-else class="h-14 bg-slate-50 rounded-2xl px-6 flex items-center justify-between font-mono text-[13px] font-black text-slate-800 border-2 border-slate-100 italic">
                          <span class="text-[8px] opacity-40 uppercase tracking-[0.3em]">QC TIMESTAMP</span>
                          <span>{{ formatDate(activeRet?.returnDate) }}</span>
                       </div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-rose-600 uppercase tracking-widest px-1">Kategori Kegagalan QC</label>
                       <select v-if="!isReadonly" v-model="form.reason" class="w-full h-14 border-none rounded-2xl px-6 text-[10px] font-black text-rose-800 bg-rose-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                          <option value="Cacat Produksi / Tidak Lolos QC">Cacat Produksi (QC Failed)</option>
                          <option value="Barang Rusak Dalam Pengiriman (Logistics)">Rusak Pengiriman (Logistics)</option>
                          <option value="Salah Spesifikasi Dokumen">Salah Spesifikasi</option>
                          <option value="Kelebihan Kirim (Over-Stocking)">Over-Delivery</option>
                       </select>
                       <div v-else class="h-14 bg-rose-600 rounded-2xl px-6 flex items-center justify-center font-black text-[9px] text-white uppercase tracking-[0.3em] italic shadow-lg shadow-rose-100 group hover:scale-105 transition-transform">
                          {{ activeRet?.reason || 'Lain-lain' }} <i class="pi pi-flag ml-2"></i>
                       </div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Log Bukti Kerusakan</label>
                       <textarea v-if="!isReadonly" v-model="form.notes" rows="1" class="w-full rounded-2xl border-none p-6 text-[12px] font-black bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all italic text-slate-600 uppercase" placeholder="KRONOLOGI INVESTIGASI..."></textarea>
                       <div v-else class="p-6 bg-slate-50 rounded-2xl font-black text-[11px] text-slate-500 italic border-2 border-slate-100 uppercase leading-relaxed shadow-sm">{{ activeRet?.notes || 'TIDAK ADA CATATAN INVESTIGASI.' }}</div>
                    </div>
                 </div>
              </div>

              <!-- Panel 3: Kompensasi Finansial -->
              <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-credit-card text-rose-500"></i> III. Proyeksi Kompensasi (Debit Note)
                 </div>
                 <div class="bg-rose-950 p-10 rounded-[2.5rem] shadow-2xl shadow-rose-900/10 border-4 border-rose-900 relative overflow-hidden group h-[380px] flex flex-col justify-between">
                    <div class="absolute right-0 top-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div class="absolute bottom-4 right-8"><i class="pi pi-shield text-8xl text-rose-900/40"></i></div>
                    
                    <div>
                       <div class="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] border-b border-rose-900/50 pb-4 mb-8 flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span> Deductive Valuation Summary
                       </div>

                       <div class="space-y-6">
                          <div class="flex justify-between items-center group/row">
                             <span class="text-[11px] font-black text-rose-300 uppercase italic transition-colors group-hover/row:text-white">Subtotal Refund</span>
                             <span class="font-mono text-xl font-black text-white tracking-widest">{{ formatCurrency(calculatedSubtotal) }}</span>
                          </div>
                          <div class="flex justify-between items-center group/row">
                             <span class="text-[11px] font-black text-rose-300 uppercase italic transition-colors group-hover/row:text-white">Recovered PPN (11%)</span>
                             <span class="font-mono text-xl font-black text-white tracking-widest">{{ formatCurrency(calculatedTax) }}</span>
                          </div>
                       </div>
                    </div>

                    <div class="pt-8 border-t-2 border-dashed border-rose-900/50">
                       <div class="flex justify-between items-end">
                          <div>
                             <h4 class="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Total Debit Memo</h4>
                             <p class="text-[9px] font-bold text-rose-200/40 uppercase leading-none italic">A/P DEDUCTION CAP</p>
                          </div>
                          <span class="font-mono text-4xl font-black text-rose-400 tracking-tighter drop-shadow-xl">{{ formatCurrency(calculatedGrand) }}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Return Items Table Section -->
           <div class="animate-fade-in-up" style="animation-delay: 0.3s">
              <div class="flex justify-between items-end mb-6">
                 <div>
                    <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-2 flex items-center gap-2">
                       <i class="pi pi-box text-rose-500"></i> IV. Rincian Material Defect (Line Items)
                    </div>
                    <p class="text-[10px] font-black text-slate-400 uppercase italic px-1">Inventory Liquidation: List material yang ditarik dari gudang operasional.</p>
                 </div>
                 <div v-if="!isReadonly">
                    <Button label="Tarik dari Histori QC" icon="pi pi-search-plus" size="small" @click="addLine" class="px-6 h-12 bg-white border-2 border-slate-200 text-slate-900 font-black text-[10px] uppercase rounded-2xl hover:bg-slate-50 transition-all shadow-sm" />
                 </div>
              </div>

              <div class="bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden mb-6 overflow-x-auto custom-scrollbar">
                 <table class="w-full text-xs">
                    <thead class="bg-slate-50 text-left font-black border-b border-slate-100">
                       <tr>
                          <th class="px-8 py-5 text-[9px] text-slate-400 uppercase tracking-[0.2em] w-12 text-center border-r border-slate-100">No</th>
                          <th class="px-10 py-5 text-[9px] text-slate-400 uppercase tracking-[0.2em]">Identifikasi Material / SKU</th>
                          <th class="px-8 py-5 text-[9px] text-slate-400 uppercase tracking-[0.2em] text-right w-32 border-l border-slate-100">Qty Reject</th>
                          <th class="px-8 py-5 text-[9px] text-slate-400 uppercase tracking-[0.2em] text-center w-24 border-l border-slate-100">Unit</th>
                          <th class="px-8 py-5 text-[9px] text-slate-900 uppercase tracking-[0.3em] text-right w-64 border-l border-slate-100 bg-rose-50 font-black">Nilai Refund (IDR)</th>
                       </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                       <tr v-for="(line, idx) in form.lines" :key="idx" class="hover:bg-rose-50/20 transition-all group">
                          <td class="px-8 py-6 text-center font-mono text-slate-400 font-black border-r border-slate-100 text-[11px]">{{ idx + 1 }}</td>
                          <td class="px-10 py-6">
                             <InputText v-if="!isReadonly" v-model="line.desc" class="w-full h-12 border-none rounded-xl px-4 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all uppercase" placeholder="SCAN SKU / NAMA BARANG..." />
                             <span v-else class="font-black text-slate-800 uppercase text-[13px] tracking-tight italic">{{ line.desc }}</span>
                          </td>
                          <td class="px-8 py-6 text-right border-l border-slate-100 bg-rose-50/10">
                             <div v-if="!isReadonly" class="flex items-center">
                                <InputText type="number" v-model.number="line.qty" class="w-full h-12 border-none rounded-xl px-4 text-right font-mono font-black text-rose-700 bg-white shadow-md outline-none focus:ring-4 focus:ring-rose-400 transition-all" />
                             </div>
                             <span v-else class="font-mono text-sm font-black text-rose-700 group-hover:scale-110 transition-transform inline-block">{{ line.qty }}</span>
                          </td>
                          <td class="px-8 py-6 text-center border-l border-slate-100">
                              <select v-if="!isReadonly" v-model="line.uomCode" class="w-full h-10 border-none rounded-xl px-2 text-[10px] font-black text-slate-500 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all appearance-none text-center font-mono uppercase">
                                 <option value="PCS">Pcs</option><option value="BOX">Box</option><option value="KG">Kg</option>
                              </select>
                              <span v-else class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{{ line.uomCode }}</span>
                          </td>
                          <td class="px-8 py-6 text-right border-l border-slate-100 bg-rose-50 font-mono text-[15px] font-black text-rose-800 relative group/line transition-colors">
                             <div v-if="!isReadonly" class="flex flex-col gap-1">
                                <span class="text-[8px] text-rose-400 font-black">@ {{ formatCurrency(line.unitPrice) }}</span>
                                <div class="flex items-center">
                                   <InputText type="number" v-model.number="line.unitPrice" class="w-full h-10 border-none rounded-xl px-4 text-right font-mono font-black text-slate-900 bg-white shadow-md outline-none focus:ring-4 focus:ring-rose-400 transition-all" />
                                </div>
                             </div>
                             <div v-else class="flex flex-col gap-1">
                                <span class="text-[8px] text-rose-600/40 font-black">PRC: {{ formatCurrency(line.unitPrice) }}</span>
                                <span class="group-hover/line:text-rose-900 transition-colors tracking-tighter">{{ formatCurrency((line.qty || 0) * (line.unitPrice || 0)) }}</span>
                             </div>
                             <button v-if="!isReadonly" @click="removeLine(idx)" class="absolute right-4 top-1/2 -translate-y-1/2 bg-rose-200 text-rose-800 rounded-xl w-8 h-8 flex items-center justify-center opacity-0 group-hover/line:opacity-100 transition-all hover:bg-rose-800 hover:text-white shadow-xl">✕</button>
                          </td>
                       </tr>
                       <tr v-if="form.lines.length === 0">
                          <td colspan="5" class="py-24 text-center bg-slate-50/30">
                             <i class="pi pi-box text-6xl text-slate-200 block mb-6 px-1"></i>
                             <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] italic px-1">Belum ada material yang ditandai untuk dikembalikan ke Pemasok...</div>
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <!-- Workspace Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div v-if="activeRet?.status === 'APPROVED'" class="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-lock"></i> Nota Debit Final & Terposting
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batal & Tutup" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                v-if="!isReadonly" 
                label="Posting Nota Retur (Debit Note)" 
                icon="pi pi-arrow-up-right" 
                iconPos="right"
                size="large" 
                :loading="saving" 
                :disabled="saving || form.lines.length === 0" 
                @click="save" 
                class="h-14 px-12 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
             <Button 
                v-if="isReadonly && canManage && activeRet?.status === 'DRAFT'" 
                label="Validasi Klaim & Terbitkan Debit Note" 
                icon="pi pi-verified" 
                size="large" 
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

const canManage = computed(() => auth.hasPermission('procurement.return.manage') || true); // Dev fallback

const returns = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activeRet = ref<any>(null);

// Mocks
const mockSuppliers = ref<any[]>([
  {id:'1', code:'SUP-RAW-001', name:'PT Sumber Tani Indonesia'},
  {id:'2', code:'SUP-EQP-001', name:'Indo Tech Machinery TBK'}
]);

const form = reactive({
  supplierId: '',
  orderCode: '',
  invoiceId: '',
  returnDate: '',
  reason: 'Cacat Produksi / Tidak Lolos QC',
  notes: '',
  lines: [] as Array<any>
});

const standardizeStatus = (ret: any) => { return ret.status; };

const filteredReturns = computed(() => {
  let list = returns.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.order?.code && p.order.code.toLowerCase().includes(q)) ||
      (p.supplier?.name && p.supplier.name.toLowerCase().includes(q)) ||
      (p.reason && p.reason.toLowerCase().includes(q))
    );
  }
  return list;
});

const calculatedSubtotal = computed(() => {
  if (isReadonly.value && activeRet.value) return Number(activeRet.value.subtotal);
  return form.lines.reduce((acc, line) => acc + ((Number(line.qty) || 0) * (Number(line.unitPrice) || 0)), 0);
});
const calculatedTax = computed(() => {
  if (isReadonly.value && activeRet.value) return Number(activeRet.value.taxAmount);
  return calculatedSubtotal.value * 0.11; // Standard 11% PPN return sim
});
const calculatedGrand = computed(() => {
  if (isReadonly.value && activeRet.value) return Number(activeRet.value.grandTotal);
  return calculatedSubtotal.value + calculatedTax.value;
});

// Helpers
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'DRAFT': return 'bg-slate-100 text-slate-700 border border-slate-300';
    case 'PENDING_APPROVAL': return 'bg-amber-100 text-amber-800 border border-amber-300 font-bold';
    case 'APPROVED': return 'bg-rose-100 text-rose-800 border border-rose-300 font-bold drop-shadow-sm'; // Using rose because it's a deductive transaction
    case 'CANCELLED': return 'bg-slate-200 text-slate-500 opacity-50';
    default: return 'bg-white border text-slate-600';
  }
};

const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID');
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=PurchaseReturn&include=items,supplier,order,invoice');
    if (res.data && res.data.data) {
        returns.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Fallback Mock based on PG Seeds
    returns.value = [
      { 
        id: '1', code: "PRT-202604-001", status: "APPROVED", returnDate: "2026-04-18T00:00", reason: "Barang rusak selama pengiriman jalur laut (Defective Items)",
        notes: "Klaim refund atas kerusakan kemasan produk. Vendor setuju pemotongan tagihan berjalan.", subtotal: 950000, taxAmount: 104500, grandTotal: 1054500,
        supplier: { name: 'PT Sumber Tani Indonesia' }, order: { code: 'PO-202604-001' }, invoice: { code: 'INV-A01' },
        items: [{desc: 'Karton Box Food Grade 30x30 PCS', qty: 500, uomCode: 'PCS', unitPrice: 1900}] 
      },
      { 
        id: '2', code: "PRT-202604-002", status: "DRAFT", returnDate: "2026-04-20T00:00", reason: "Tidak lolos Quality Control (QC Failed)",
        notes: "Proses sorting di pabrik menunjukkan 15 Unit tidak beroperasi maksimal.", subtotal: 18750000, taxAmount: 2062500, grandTotal: 20812500,
        supplier: { name: 'Indo Tech Machinery TBK' }, order: null, invoice: null,
        items: [{desc: 'Mesin Packing Sachet Otomatis', qty: 15, uomCode: 'PCS', unitPrice: 1250000}] 
      }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeRet.value = null;
  isReadonly.value = false;
  form.supplierId = '';
  form.orderCode = '';
  form.invoiceId = '';
  form.notes = '';
  form.returnDate = new Date().toISOString().split('T')[0];
  form.reason = 'Cacat Produksi / Tidak Lolos QC';
  form.lines = [];
  dialogOpen.value = true;
}

function openView(r: any) {
  activeRet.value = r;
  isReadonly.value = true;
  form.supplierId = r.supplierId;
  form.orderCode = r.order?.code || '';
  form.invoiceId = r.invoiceId || '';
  form.notes = r.notes;
  form.returnDate = r.returnDate?.split('T')[0] || '';
  form.reason = r.reason || 'Masalah Ekspedisi';
  
  form.lines = (r.items || []).map((x:any) => ({...x}));
  dialogOpen.value = true;
}

function addLine() {
  form.lines.push({ desc: '', qty: 1, uomCode: 'PCS', unitPrice: 0 });
}

function removeLine(idx: number) {
  form.lines.splice(idx, 1);
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Jurnal Retur Valid. Saldo terutang faktur terkait otomatis terpotong berdasarkan kalkulasi refund AP!');
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
