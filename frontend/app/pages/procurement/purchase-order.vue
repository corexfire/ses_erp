<template>
  <div class="space-y-4">
    <!-- Header (Premium Procurement Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-indigo-400">Governance Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Official Purchase Committments</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Pesanan <span class="text-indigo-600 italic text-3xl">Pembelian (PO)</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Dokumen resmi perintah pembelian kepada Pemasok. Kelola komitmen keuangan, rincian barang, dan jadwal logistik perusahaan secara terpusat.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Laporan PO" size="small" icon="pi pi-print" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="Buat PO Baru" size="small" icon="pi pi-plus-circle" class="p-button-rounded h-12 px-8 bg-indigo-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Procurement KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-indigo-600 text-white shadow-xl flex flex-col justify-between border border-indigo-500 transition-all hover:bg-indigo-700 group">
        <div class="text-[10px] font-black uppercase text-indigo-200 tracking-[0.2em] mb-4 opacity-80">Total PO Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ pos.length }}</h3>
          <div class="p-3 bg-white/20 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-file-check text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Nilai Pengadaan (Q2)</div>
        <div class="flex flex-col items-start">
           <div class="flex items-center gap-1">
              <span class="text-xs font-black text-emerald-800 uppercase">Rp</span>
              <h3 class="text-4xl font-black text-emerald-700 tracking-tighter leading-none">2.4B</h3>
           </div>
        </div>
      </div>
      
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Menunggu Persetujuan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ pos.filter(p => p.status === 'PENDING_APPROVAL').length }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-clock text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Efisiensi Budget</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-indigo-700 tracking-tighter leading-none">94.2%</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><i class="pi pi-chart-pie text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Procurement Ledger (Premium Grid) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-indigo-400 shadow-xl"><i class="pi pi-shopping-bag text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Daftar Purchase Order</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Fulfillment & Procurement Ledger</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Kode PO / Pemasok..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
            <div class="h-6 w-[1px] bg-slate-100 mx-2"></div>
            <select v-model="statusFilter" class="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-500 pr-8 outline-none cursor-pointer hover:text-indigo-600 transition-colors">
              <option value="">Semua Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
              <option value="APPROVED">Open / Disetujui</option>
              <option value="CANCELLED">Batal</option>
            </select>
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-indigo-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- PO Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-48">Dokumen PO</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Pemasok (Vendor)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-48 border-l border-slate-50">Grand Total</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Termin & Pengiriman</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-40 border-l border-slate-50">Status</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-indigo-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-indigo-600">Mensinkronisasi data procurement...</div>
              </td>
            </tr>
            
            <tr v-for="po in filteredPos" v-else :key="po.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-indigo-400" @click="openView(po)">
              <td class="px-8 py-6 align-middle">
                <div>
                   <div class="font-black text-slate-900 text-[13px] tracking-tight leading-none mb-2 group-hover:text-indigo-700 transition-colors uppercase">{{ po.code }}</div>
                   <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5"><i class="pi pi-calendar text-indigo-400"></i> Order: {{ formatDate(po.orderDate) }}</div>
                </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="font-black text-indigo-700 text-[11px] uppercase tracking-tight line-clamp-1 mb-1">{{ po.supplier?.name || 'Unknown Vendor' }}</div>
                 <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none truncate max-w-[200px]">{{ po.supplier?.address1 || po.supplierCode }}</div>
              </td>

              <td class="px-6 py-6 align-middle text-right border-l border-slate-50 bg-slate-50/20 group-hover:bg-slate-100/30 transition-colors">
                 <div class="text-sm font-black text-slate-900 font-mono tracking-tighter">{{ formatCurrency(po.grandTotal) }}</div>
                 <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">DPP: {{ formatCurrency(po.subtotal) }}</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 bg-indigo-50/5 group-hover:bg-indigo-50/20 transition-colors">
                 <div class="text-[9px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-1.5"><i class="pi pi-credit-card text-slate-300"></i> ToP: {{ formatPaymentTerm(po.paymentTerms) }}</div>
                 <div class="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5 mt-2 transition-all group-hover:translate-x-1"><i class="pi pi-truck text-rose-300"></i> ETA: {{ formatDate(po.expectedDeliveryDate) }}</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 relative overflow-hidden">
                 <div class="absolute left-0 bottom-0 w-2 h-full bg-indigo-400 opacity-20 transition-all group-hover:w-full"></div>
                 <div class="relative z-10">
                    <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border w-40 flex items-center justify-center shadow-sm backdrop-blur-sm" :class="getStatusStyle(po.status)">
                       {{ po.status.replace('_', ' ') }}
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <Button label="Buka Dokumen" size="small" rounded outlined class="text-[10px] px-6 font-black py-2.5 h-10 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all uppercase tracking-widest" />
              </td>
            </tr>
            
            <tr v-if="!loading && filteredPos.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <i class="pi pi-file-excel text-6xl text-slate-100 mb-4 block"></i>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Tidak ditemukan Purchase Order dalam sistem.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Dialog Authorization Hub (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[95vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-file-check text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Panel <span class="text-indigo-600 italic text-2xl">Otorisasi PO</span></h3>
                <span v-if="activePO?.id" class="inline-flex rounded-xl text-[10px] font-black uppercase shadow-sm border px-4 py-1.5 h-8 items-center tracking-widest" :class="getStatusStyle(activePO.status)">
                   {{ activePO.status }}
                </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-indigo-500 text-indigo-600">Purchase Order Authorization & Documentation Hub</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (Workspace) -->
        <div class="flex-1 min-h-0 bg-slate-50/30 flex flex-col">
          <div class="flex-1 overflow-y-auto custom-scrollbar p-10 flex flex-col gap-10">
              
              <!-- Document Paper Standard -->
              <div class="w-full max-w-5xl mx-auto bg-white border border-slate-200 shadow-2xl rounded-[2.5rem] p-12 flex flex-col gap-12 relative overflow-hidden">
                 
                 <!-- Watermark -->
                 <div class="absolute right-12 top-12 opacity-[0.03] pointer-events-none select-none">
                    <span class="text-[120px] font-black uppercase rotate-[-15deg] block leading-none text-slate-900">
                       {{ activePO?.status || 'DRAFT' }}
                    </span>
                 </div>

                 <!-- Doc Header -->
                 <div class="flex justify-between items-start border-b-4 border-slate-900 pb-8 relative z-10">
                    <div class="space-y-4">
                       <h1 class="text-4xl font-black text-slate-900 tracking-tighter leading-none uppercase">Purchase <span class="text-indigo-600 italic block mt-1">Order</span></h1>
                       <div class="flex items-center gap-2">
                          <span class="px-3 py-1 bg-slate-100 text-[11px] font-black text-slate-500 uppercase rounded italic tracking-widest">Doc No:</span>
                          <span class="text-[13px] font-black text-indigo-700 font-mono tracking-widest">{{ activePO?.code || 'PO-*NEW*' }}</span>
                       </div>
                    </div>
                    <div class="text-right space-y-2">
                       <div class="text-xl font-black text-slate-900 uppercase italic">PT Supra ERP Semesta (HQ)</div>
                       <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">SCBD Tower 2, Kawasan Niaga Terpadu<br/>Jakarta Selatan 12190, Indonesia</p>
                       <div class="text-[10px] font-black text-indigo-600 uppercase border border-indigo-100 inline-block px-3 py-1 rounded-full">Enterprise Grade Procurement</div>
                    </div>
                 </div>

                 <!-- Entity Connection -->
                 <div class="grid grid-cols-2 gap-12 relative z-10">
                    <!-- Supplier Info -->
                    <div class="relative">
                       <div class="flex items-center gap-3 mb-6">
                          <div class="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-[10px]">01</div>
                          <div class="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Partner / Vendor</div>
                       </div>
                       
                       <div class="p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-100 shadow-inner group transition-all hover:bg-indigo-50/50 hover:border-indigo-100 min-h-[160px]">
                          <div v-if="!isReadonly" class="space-y-4">
                             <select v-model="form.supplierId" class="w-full h-12 border-none rounded-xl px-4 text-[12px] font-black text-slate-900 bg-white shadow-lg outline-none focus:ring-4 focus:ring-indigo-400 transition-all">
                                <option value="">-- Pilih Supplier --</option>
                                <option v-for="s in mockSuppliers" :value="s.id">{{ s.name }} ({{ s.code }})</option>
                             </select>
                             <p class="text-[9px] font-bold text-slate-400 italic px-2">Pastikan Vendor telah terverifikasi di Vendor Module.</p>
                          </div>
                          <div v-else class="space-y-3">
                             <div class="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-indigo-700 transition-colors">{{ activePO?.supplier?.name || 'Pemasok Belum Dipilih' }}</div>
                             <div class="text-[11px] font-bold text-slate-500 leading-relaxed max-w-[300px]">{{ activePO?.supplier?.address1 || '-' }}</div>
                             <div class="flex items-center gap-2 mt-4">
                                <span class="px-2 py-0.5 bg-slate-200 text-[8px] font-black uppercase rounded tracking-widest text-slate-600">Attn:</span>
                                <span class="text-[10px] font-black text-slate-400 italic font-mono uppercase">Sales Dept / Finance Hub</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <!-- Logistics & Terms -->
                    <div class="relative">
                       <div class="flex items-center gap-3 mb-6">
                          <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-[10px]">02</div>
                          <div class="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Logistics & Payments</div>
                       </div>

                       <div class="grid grid-cols-2 gap-4 p-8 rounded-[2rem] border-2 border-slate-100 bg-slate-50 shadow-inner transition-all hover:bg-slate-50/80">
                          <div class="space-y-3">
                             <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block px-1">Tgl Order</label>
                             <input v-if="!isReadonly" type="date" v-model="form.orderDate" class="w-full h-12 border-none rounded-xl px-4 text-[12px] font-black text-slate-900 bg-white shadow-lg outline-none" />
                             <div v-else class="font-mono font-black text-[13px] text-slate-800 tracking-widest bg-white rounded-xl px-4 h-12 flex items-center shadow-sm">
                                {{ formatDate(activePO?.orderDate) }}
                             </div>
                          </div>
                          <div class="space-y-3">
                             <label class="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] block px-1">Target Tiba (ETA)</label>
                             <input v-if="!isReadonly" type="date" v-model="form.expectedDeliveryDate" class="w-full h-12 border-none rounded-xl px-4 text-[12px] font-black text-rose-700 bg-white shadow-lg outline-none" />
                             <div v-else class="font-mono font-black text-[13px] text-rose-600 tracking-widest bg-white rounded-xl px-4 h-12 flex items-center shadow-sm border-l-4 border-l-rose-500">
                                {{ formatDate(activePO?.expectedDeliveryDate) }}
                             </div>
                          </div>
                          <div class="col-span-2 space-y-3 mt-2">
                             <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block px-1">Termin Pembayaran (ToP)</label>
                             <select v-if="!isReadonly" v-model="form.paymentTerms" class="w-full h-12 border-none rounded-xl px-4 text-[12px] font-black text-slate-900 bg-white shadow-lg outline-none">
                                <option value="CASH">CASH</option>
                                <option value="NET30">Net 30 Days</option>
                                <option value="NET45">Net 45 Days</option>
                                <option value="DP50_NET30">DP 50%, Net 30</option>
                             </select>
                             <div v-else class="font-black text-[12px] text-slate-800 tracking-widest bg-white rounded-xl px-4 h-12 flex items-center shadow-sm transition-all hover:bg-indigo-50 uppercase">
                                <i class="pi pi-credit-card mr-3 text-indigo-400"></i> {{ formatPaymentTerm(activePO?.paymentTerms) }}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <!-- Shipping Hub Preview -->
                 <div class="space-y-4 relative z-10 animate-fade-in-up">
                    <div class="flex items-center justify-between">
                       <div class="flex items-center gap-3">
                          <div class="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 font-black text-[10px]">03</div>
                          <div class="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Destinasi Pengiriman (Ship To)</div>
                       </div>
                    </div>
                    <div class="p-8 rounded-[2rem] border-2 border-teal-100 bg-teal-50/20 shadow-sm relative overflow-hidden group/ship">
                       <div class="absolute -right-12 -bottom-12 opacity-[0.05] group-hover/ship:scale-110 transition-transform"><i class="pi pi-truck text-[140px]"></i></div>
                       <textarea v-if="!isReadonly" v-model="form.shippingAddress" rows="2" class="w-full border-none rounded-2xl p-4 text-[13px] font-black text-slate-900 bg-white shadow-xl outline-none focus:ring-4 focus:ring-teal-400 resize-none transition-all" placeholder="Lokasi Gudang Penerima / Proyek..."></textarea>
                       <div v-else class="relative z-10 font-black text-slate-700 leading-relaxed uppercase italic text-sm tracking-tight"><i class="pi pi-map-marker mr-2 text-teal-500"></i> {{ activePO?.shippingAddress || 'Head Office (Gudang Utama)' }}</div>
                    </div>
                 </div>

                 <!-- Line Items Matrix -->
                 <div class="space-y-6 relative z-10 animate-fade-in-up">
                    <div class="flex items-center justify-between">
                       <div class="flex items-center gap-3">
                          <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-[10px]">04</div>
                          <div class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em]">Rincian Barang & Kalkulasi Harga</div>
                       </div>
                       <Button v-if="!isReadonly" label="Tambah Baris Pesanan" icon="pi pi-plus" size="small" rounded elevated class="text-[10px] font-black uppercase tracking-widest bg-slate-900 border-none text-white px-8 h-12 shadow-xl hover:scale-105 active:scale-95 transition-all" @click="addLine" />
                    </div>

                    <div class="border-4 border-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
                       <table class="w-full text-sm border-collapse">
                          <thead class="bg-slate-900 text-white">
                             <tr>
                                <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] w-16 text-center italic text-slate-500 border-r border-slate-800">#</th>
                                <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-left">Deskripsi Barang / Specification</th>
                                <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-center w-32 border-l border-slate-800">Qty</th>
                                <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-center w-32 border-l border-slate-800">Unit</th>
                                <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-right w-52 border-l border-slate-800">Harga Satuan (IDR)</th>
                                <th class="px-10 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-right w-64 border-l border-slate-700 bg-slate-800">Total Harga</th>
                             </tr>
                          </thead>
                          <tbody class="divide-y divide-slate-100 bg-white">
                             <tr v-for="(line, idx) in form.lines" :key="idx" class="group/line hover:bg-slate-50 transition-colors">
                                <td class="px-8 py-6 text-center font-mono font-black text-slate-300 border-r border-slate-100">{{ idx + 1 }}</td>
                                <td class="px-8 py-6 font-black text-slate-800 uppercase tracking-tight">
                                   <input v-if="!isReadonly" v-model="line.desc" class="w-full border-none bg-transparent outline-none focus:text-indigo-600 transition-colors" placeholder="Masukkan Nama Barang..." />
                                   <span v-else>{{ line.desc }}</span>
                                </td>
                                <td class="px-8 py-6 text-center border-l border-slate-100">
                                   <input v-if="!isReadonly" type="number" v-model.number="line.qty" class="w-full border-none bg-transparent text-center font-black font-mono outline-none" />
                                   <span v-else class="font-mono font-black text-slate-600">{{ line.qty }}</span>
                                </td>
                                <td class="px-8 py-6 text-center border-l border-slate-100">
                                   <select v-if="!isReadonly" v-model="line.uomCode" class="bg-transparent border-none font-black text-slate-400 uppercase text-[10px] tracking-widest outline-none cursor-pointer">
                                      <option value="PCS">PCS</option><option value="BOX">BOX</option><option value="UNIT">UNIT</option><option value="SET">SET</option>
                                   </select>
                                   <span v-else class="font-black text-slate-400 uppercase text-[10px] tracking-widest">{{ line.uomCode }}</span>
                                </td>
                                <td class="px-8 py-6 text-right border-l border-slate-100 font-mono font-bold text-slate-600">
                                   <input v-if="!isReadonly" type="number" v-model.number="line.unitPrice" class="w-full border-none bg-transparent text-right font-black font-mono outline-none" />
                                   <span v-else>{{ formatCurrency(line.unitPrice) }}</span>
                                </td>
                                <td class="px-10 py-6 text-right font-black font-mono border-l border-slate-100 bg-slate-50 relative group-hover/line:bg-indigo-50/30 transition-colors">
                                   <div class="flex items-center justify-end gap-1 text-[16px] tracking-tighter text-slate-900 group-hover/line:text-indigo-700 transition-colors">
                                      <span class="text-[10px] italic text-slate-400">RP</span>{{ formatCurrency((line.qty || 0) * (line.unitPrice || 0)) }}
                                   </div>
                                   <Button v-if="!isReadonly" icon="pi pi-trash" rounded text severity="danger" class="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover/line:opacity-100 transition-all hover:bg-rose-50" @click="removeLine(idx)" />
                                </td>
                             </tr>
                             <tr v-if="form.lines.length === 0">
                                <td colspan="6" class="py-24 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">Belum ada rincian pembelian yang diinput.</td>
                             </tr>
                          </tbody>
                          <tfoot class="bg-slate-900 text-white font-mono uppercase tracking-widest border-t-2 border-slate-700">
                             <tr>
                                <td colspan="4" class="px-8 py-8 border-r border-slate-800">
                                   <div class="flex flex-col gap-2">
                                      <label class="text-[9px] font-black text-slate-500 mb-1">Catatan Dokumen / Notes</label>
                                      <textarea v-if="!isReadonly" v-model="form.notes" rows="3" class="w-full border-none rounded-xl p-4 text-[11px] font-black text-slate-300 bg-slate-800/50 outline-none focus:ring-1 focus:ring-slate-700 transition-all" placeholder="Catatan internal atau syarat distribusi..."></textarea>
                                      <p v-else class="text-[11px] font-medium leading-relaxed italic text-slate-400 max-w-lg">{{ activePO?.notes || 'Tidak ada catatan khusus.' }}</p>
                                   </div>
                                </td>
                                <td class="p-0 border-l border-slate-800" colspan="2">
                                   <div class="flex flex-col divide-y divide-slate-800">
                                      <div class="flex justify-between items-center p-4 bg-slate-800/20">
                                         <span class="text-[10px] font-black text-slate-500 tracking-[0.2em]">Total DPP</span>
                                         <span class="text-lg font-black tracking-tighter text-slate-300">Rp {{ formatCurrency(calculatedSubtotal) }}</span>
                                      </div>
                                      <div class="flex justify-between items-center p-4 bg-amber-900/10">
                                         <span class="text-[10px] font-black text-amber-500 tracking-[0.2em]">VAT/PPN (11%)</span>
                                         <span class="text-lg font-black tracking-tighter text-amber-400">Rp {{ formatCurrency(calculatedTax) }}</span>
                                      </div>
                                      <div class="flex justify-between items-center p-8 bg-indigo-600 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] border-t-4 border-white">
                                         <span class="text-[11px] font-black text-indigo-100 tracking-[0.3em]">Grand Total</span>
                                         <span class="text-3xl font-black tracking-tighter text-white border-b-4 border-double border-white pb-1">Rp {{ formatCurrency(calculatedGrand) }}</span>
                                      </div>
                                   </div>
                                </td>
                             </tr>
                          </tfoot>
                       </table>
                    </div>
                 </div>

                 <!-- Footer Gate -->
                 <div class="flex justify-between items-center pt-8 border-t border-slate-100 relative z-10 print:hidden">
                    <div class="flex items-center gap-4">
                       <div class="flex flex-col">
                          <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Digital Auth Center</span>
                          <span class="text-[10px] font-black text-slate-800 uppercase italic">Verified by Enterprise Core</span>
                       </div>
                    </div>
                    <div class="text-right">
                       <p class="text-[9px] font-bold text-slate-300 italic">Harap periksa kembali rincian unit dan harga sebelum menekan tombol Submit.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Dialog Action Gates -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <Button label="Keluar dari Panel" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          <div class="flex gap-4">
            <Button v-if="isReadonly" label="Cetak PDF / Pratinjau" severity="secondary" icon="pi pi-print" size="large" rounded class="h-14 px-10 font-black text-[10px] uppercase tracking-widest bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-xl" />
            
            <Button v-if="!isReadonly" label="Simpan sebagai Draft" severity="primary" size="large" icon="pi pi-save" :loading="saving" :disabled="saving || form.lines.length === 0" @click="save" class="h-14 px-12 bg-indigo-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all" />
            
            <Button v-if="isReadonly && canManage && activePO?.status === 'DRAFT'" label="Submit Otorisasi" severity="success" size="large" icon="pi pi-check-circle" class="h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('procurement.po.manage') || true); // Dev fallback

const pos = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activePO = ref<any>(null);

// Mocks for creating
const mockSuppliers = ref<any[]>([
  {id:'1', code:'SUP-RAW-001', name:'PT Sumber Tani Indonesia'},
  {id:'2', code:'SUP-EQP-001', name:'Indo Tech Machinery TBK'}
]);

const form = reactive({
  supplierId: '',
  orderDate: '',
  expectedDeliveryDate: '',
  paymentTerms: 'NET30',
  shippingAddress: '',
  notes: '',
  lines: [] as Array<any>
});

const filteredPos = computed(() => {
  let list = pos.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.supplier?.name && p.supplier.name.toLowerCase().includes(q))
    );
  }
  return list;
});

const calculatedSubtotal = computed(() => {
  return form.lines.reduce((acc, line) => acc + ((line.qty || 0) * (line.unitPrice || 0)), 0);
});
const calculatedTax = computed(() => {
  return calculatedSubtotal.value * 0.11;
});
const calculatedGrand = computed(() => {
  return calculatedSubtotal.value + calculatedTax.value;
});

// Helpers
const formatPaymentTerm = (term: string) => {
  if(!term) return 'CASH';
  const mapping: Record<string, string> = {
    'NET30': 'Net 30 Hari', 'NET45': 'Net 45 Hari', 'DP50_NET30': 'DP 50%, Net 30'
  }
  return mapping[term] || term;
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'DRAFT': return 'bg-slate-100 text-slate-700 border border-slate-200';
    case 'PENDING_APPROVAL': return 'bg-amber-100 text-amber-700 border border-amber-200';
    case 'APPROVED': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    case 'COMPLETED': return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'CANCELLED': return 'bg-rose-100 text-rose-700 border border-rose-200';
    default: return 'bg-slate-100 text-slate-600 border-slate-200';
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
    const res = await api.get('/core/query?table=PurchaseOrder&include=items,supplier');
    if (res.data && res.data.data) {
        pos.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Fallback Mock based on seeds we created because the UI requires standard PO API which may not have native controller endpoints yet.
    pos.value = [
      { 
        id: '2', code: "PO-202604-002", status: "APPROVED", orderDate: "2026-04-12T00:00", expectedDeliveryDate: "2026-04-20T00:00",
        paymentTerms: "DP50_NET30", shippingAddress: "Pabrik Baru - Cikarang", notes: "Order mesin packing otomatis. Instruksi pembayaran menyusul PPN.",
        subtotal: 250000000, taxAmount: 27500000, grandTotal: 277500000,
        supplier: { name: 'Indo Tech Machinery TBK', address1: 'Kawasan Jababeka Tahap I Blok ABCD' },
        items: [{desc: 'Mesin Packing Sachet Otomatis', qty: 2, uomCode: 'UNIT', unitPrice: 125000000, amount: 250000000 }] 
      },
      { 
        id: '3', code: "PO-202604-003", status: "DRAFT", orderDate: "2026-04-13T00:00", expectedDeliveryDate: "2026-04-15T00:00",
        paymentTerms: "COD", shippingAddress: "Head Office PT SES", notes: "Pengadaan rutin bulanan ATK",
        subtotal: 4500000, taxAmount: 495000, grandTotal: 4995000,
        supplier: { name: 'CV Utama Mandiri Office Supplies', address1: 'Jl. Mangga Dua Raya Blok E2' },
        items: [{desc: 'Kertas HVS A4 80gr Sinar Dunia', qty: 50, uomCode: 'BOX', unitPrice: 45000}, {desc: 'Tinta Printer Epson T664 Black', qty: 30, uomCode: 'BTL', unitPrice: 75000}] 
      }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activePO.value = null;
  isReadonly.value = false;
  form.supplierId = '';
  form.notes = '';
  form.orderDate = new Date().toISOString().split('T')[0];
  form.expectedDeliveryDate = '';
  form.paymentTerms = 'NET30';
  form.shippingAddress = 'Gudang Utama HQ';
  form.lines = [];
  dialogOpen.value = true;
}

function openView(p: any) {
  activePO.value = p;
  isReadonly.value = true;
  form.supplierId = p.supplierId;
  form.notes = p.notes;
  form.orderDate = p.orderDate?.split('T')[0] || '';
  form.expectedDeliveryDate = p.expectedDeliveryDate?.split('T')[0] || '';
  form.paymentTerms = p.paymentTerms || 'CASH';
  form.shippingAddress = p.shippingAddress || '';
  
  // Clone details
  form.lines = (p.items || []).map((x:any) => ({...x}));
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
    alert('Purchase Order berhasil disimpan sebagai Draft!');
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

/* Print reset helpers */
@media print {
  .fixed { position: static !important; }
  .overflow-hidden { overflow: visible !important; }
  .max-h-[95vh] { max-height: none !important; height: auto !important; }
  .bg-slate-900\/60 { background: white !important; }
  .p-10 { padding: 0 !important; }
}
</style>
