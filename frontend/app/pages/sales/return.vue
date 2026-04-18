<template>
  <div class="space-y-4">
    <!-- Header (Premium Resolution Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-orange-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Resolution Hub</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-orange-600">Reverse Logistics</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Retur <span class="text-orange-600 italic text-3xl">& RMA</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Pusat resolusi sengketa B2B — menangani klaim kerusakan barang, validasi inspeksi QC, dan penerbitan Nota Kredit (Credit Memo).</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Rilis Dokumen RMA" size="small" icon="pi pi-receipt" class="p-button-rounded h-12 px-8 bg-orange-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-orange-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- High-Contrast KPI Banners (Premium style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
       <!-- Primary engagement banner -->
      <div class="p-6 rounded-2xl bg-orange-600 text-white shadow-xl flex flex-col justify-between border border-orange-500 transition-all hover:bg-orange-700 group">
        <div class="text-[10px] font-black uppercase text-orange-200 tracking-[0.2em] mb-4 opacity-80">Total Klaim Masuk</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ docs.length }}</h3>
          <div class="p-3 bg-white/20 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-box text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Menunggu Inspeksi QC</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'DRAFT' || x.status === 'PENDING_APPROVAL').length }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-shield text-lg"></i></div>
        </div>
      </div>
      
      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">RMA Disahkan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'APPROVED').length }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-verified text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Klaim Ditolak</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter leading-none">{{ docs.filter(x => x.status === 'REJECTED').length }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><i class="pi pi-times-circle text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Data List and Filters -->
    <!-- Modern Filters (Premium style) -->
    <div class="bg-orange-50/50 p-1.5 rounded-3xl border border-orange-100 flex flex-wrap items-center gap-2 animate-fade-in-up">
      <div class="bg-white p-1 rounded-[1.5rem] border border-slate-200 flex flex-1 items-center shadow-sm min-w-[280px]">
        <i class="pi pi-search px-4 text-slate-400 text-xs"></i>
        <InputText v-model="search" placeholder="Cari Kode RMA, Klien, or Alasan Sengketa..." class="flex-1 h-10 border-none bg-transparent text-xs font-black uppercase tracking-widest outline-none shadow-none focus:ring-0" @keyup.enter="load" />
        <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-orange-600 transition-all shrink-0" />
      </div>

      <div class="flex bg-white/60 p-1 rounded-2xl border border-orange-100 gap-1 ml-auto">
        <button v-for="s in [{v:'',l:'SEMUA'}, {v:'DRAFT',l:'DRAFT'}, {v:'PENDING_APPROVAL',l:'QC'}, {v:'APPROVED',l:'DISAHKAN'}, {v:'REJECTED',l:'DITOLAK'}]" :key="s.v"
          @click="statusFilter = s.v"
          :class="statusFilter === s.v ? 'bg-orange-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:bg-white hover:shadow-sm'"
          class="px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300">
          {{ s.l }}
        </button>
      </div>
    </div>

      <!-- TABLE (Premium Modern Style) -->
      <div class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
        <table class="w-full text-sm">
          <thead class="bg-slate-50/80 text-left">
            <tr>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Otorisasi Retur (RMA)</th>
              <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pemohon & Kronologi</th>
              <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-48">Nilai Kredit (IDR)</th>
              <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-48">Status Investigasi</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-44">Resolusi Sengketa</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-orange-600 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-orange-600">Membaca log reverse logistics...</div>
              </td>
            </tr>
            
            <tr v-for="doc in filteredDocs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/5 group border-l-4" :style="{ borderLeftColor: statusColor(doc.status) }" @click="openView(doc)">
              <td class="px-8 py-6 align-middle">
                 <div class="flex flex-col gap-2">
                    <div class="font-black text-slate-900 text-[14px] tracking-tight leading-tight uppercase group-hover:text-orange-700 transition-colors flex items-center gap-2">
                      {{ doc.code }}
                      <i v-if="doc.status === 'APPROVED'" class="pi pi-check-circle text-emerald-500 shadow-sm"></i>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5"><i class="pi pi-link text-[8px]"></i> REF: {{ doc.order?.code || 'Manual Entry' }}</span>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50/50">
                  <div class="flex flex-col gap-2">
                    <div class="font-black text-orange-900 text-[11px] uppercase tracking-tight flex items-center gap-1.5 transition-colors group-hover:text-orange-700 leading-none">
                      <i class="pi pi-building text-[10px]"></i> {{ doc.customer?.name }}
                    </div>
                    <div class="text-[9px] bg-slate-100 px-2 py-1 text-slate-500 mt-1 border border-slate-200 rounded-lg italic shadow-inner w-56 truncate font-medium">"{{ doc.notes || 'Tanpa keterangan keluhan' }}"</div>
                  </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-right">
                <div class="flex flex-col">
                  <div class="text-[17px] font-black font-mono tracking-tighter text-slate-900 leading-none" :class="doc.status === 'APPROVED' ? 'text-orange-600' : 'text-slate-400 opacity-50'">
                    <span class="text-[10px] text-slate-400 mr-1 font-sans">Rp</span>-{{ formatCurrency(calculateGrandTotal(doc)) }}
                  </div>
                  <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 whitespace-nowrap">{{ doc.status === 'APPROVED' ? 'MEMOTONG INVOICE' : 'ANGKA SEMENTARA' }}</div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
                 <div :class="['inline-flex rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-sm whitespace-nowrap', statusBadgeClasses(doc.status)]">
                   <i class="pi pi-shield mr-2"></i> {{ statusMapper(doc.status) }}
                 </div>
              </td>

               <td class="px-8 py-6 align-middle border-l border-slate-50/50 text-right">
                <div class="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                  <Button v-if="doc.status === 'APPROVED'" label="Nota Kredit" size="small" class="p-button-rounded h-9 px-6 bg-slate-900 border-none text-white font-black text-[9px] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all w-full" icon="pi pi-file-pdf" />
                  <Button label="Sidang RMA" size="small" class="p-button-rounded h-9 px-6 bg-orange-600 border-none text-white font-black text-[9px] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all w-full" @click.stop="openView(doc)" />
                </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredDocs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-400 italic text-sm font-medium">
                 <i class="pi pi-shield text-5xl mb-4 block opacity-10"></i>
                 <div class="text-[10px] font-black uppercase tracking-[0.2em]">Tidak ditemukan dokumen pengembalian / komplain barang.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- Dialog RMA Hub (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-orange-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-sync text-3xl animate-spin-slow"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeDoc?.id ? 'Dokumen' : 'Provisioning' }} <span class="text-orange-600 italic">RMA Sengketa</span></h3>
                <span v-if="activeDoc?.id" class="inline-flex rounded-2xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm" :class="statusBadgeClasses(form.status)">
                   {{ statusMapper(form.status) }}
                </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-orange-500 text-orange-600">RMA Resolution Hub / Reverse Logistics Ledger</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (RMA Workpad) -->
        <div class="p-10 space-y-8 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
           <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <!-- Left: Customer Meta -->
              <div class="lg:col-span-1 space-y-6">
                 <div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                    <div class="space-y-6">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-orange-600"></div>
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Identitas Pelapor</h4>
                      </div>
                      <div class="space-y-4">
                        <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Klien Pemohon <span class="text-red-500">*</span></label>
                          <select :disabled="isReadonly" v-model="form.customerId" class="w-full h-14 border-none rounded-2xl px-5 text-xs font-black text-orange-900 bg-orange-50/50 shadow-inner outline-none focus:ring-2 focus:ring-orange-100 appearance-none">
                              <option value="">-- Pemohon Retur --</option>
                              <option v-for="c in mockCustomers" :value="c.id">{{ c.code }} - {{ c.name }}</option>
                          </select>
                        </div>
                        <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-3 lowercase">Ref. Transaksi Asal (SO)</label>
                          <input :disabled="isReadonly" type="text" v-model="form.orderId" class="w-full h-12 border-none rounded-2xl px-5 text-xs font-black text-slate-600 bg-slate-100/50 shadow-inner outline-none focus:ring-2 focus:ring-orange-100 font-mono" placeholder="SO-XXXX-XXXX" />
                        </div>
                      </div>
                    </div>

                    <div class="space-y-6 pt-6 border-t border-slate-100">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-slate-400"></div>
                        <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Timeline Sengketa</h4>
                      </div>
                      <div class="space-y-4">
                        <div class="space-y-2">
                           <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold mb-2 lowercase">Tgl Laporan Diterima</label>
                           <input :disabled="isReadonly" type="date" v-model="form.returnDate" class="w-full h-12 border-none rounded-2xl px-5 text-xs font-black text-slate-700 bg-white border border-slate-100 shadow-inner outline-none" />
                        </div>
                      </div>
                    </div>

                    <div class="space-y-2 pt-6 border-t border-slate-100">
                      <label class="text-[10px] font-black text-rose-500 uppercase tracking-widest block font-bold mb-3 lowercase">Kronologi Kerusakan / QC Info</label>
                      <textarea :disabled="isReadonly" v-model="form.notes" rows="4" class="w-full border-none rounded-2xl p-5 text-[11px] font-medium text-slate-700 bg-rose-50 shadow-inner outline-none focus:ring-2 focus:ring-rose-100 resize-none transition-all placeholder:italic" placeholder="Laporkan detail kerusakan fisik..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Right: Items Payload -->
              <div class="lg:col-span-3">
                 <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full border-b-[8px] border-b-slate-900">
                    <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-white relative shrink-0">
                       <div class="absolute left-8 bottom-0 w-32 h-1 bg-orange-600 rounded-full"></div>
                       <div class="flex items-center gap-4">
                          <div class="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg"><i class="pi pi-box text-xl"></i></div>
                          <div>
                            <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 font-bold">Benda Bukti SKU (Reverse Move)</h4>
                            <p class="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest font-mono">Inventory Withdrawal / Credit Return Record</p>
                          </div>
                       </div>
                       <div class="flex items-center gap-3">
                          <Button v-if="!isReadonly" label="Panggil dari SO" icon="pi pi-undo" size="small" class="h-10 px-6 rounded-xl bg-slate-100 border-none text-slate-600 text-[10px] font-black uppercase hover:bg-slate-200 transition-all font-bold" />
                          <Button v-if="!isReadonly" label="Tambah SKU Rusak" icon="pi pi-plus" size="small" class="h-10 px-6 rounded-xl bg-slate-900 border-none text-white text-[10px] font-black uppercase shadow-lg hover:scale-105 transition-all font-bold" @click="addLine" />
                       </div>
                    </div>

                    <div class="flex-1 overflow-x-auto custom-scrollbar">
                      <table class="w-full text-sm">
                        <thead class="bg-slate-50/50 text-left">
                          <tr>
                            <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 border-r">WMS Withdrawal Target / SKU Description</th>
                            <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center w-32 border-r">Qty Rusak</th>
                            <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right w-44 border-r">Tarif Asli @</th>
                            <th class="px-6 py-5 text-[9px] font-black text-orange-600 uppercase tracking-widest text-right w-56 bg-orange-50/30">KREDIT RUPIAH (-)</th>
                            <th v-if="!isReadonly" class="w-20"></th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                           <tr v-for="(line, idx) in form.lines" :key="idx" class="transition-all hover:bg-slate-50/30 group">
                              <td class="px-8 py-6 align-middle border-r">
                                 <div class="flex flex-col gap-2">
                                    <textarea :disabled="isReadonly" v-model="line.desc" rows="1" class="w-full text-[11px] font-black text-slate-800 bg-white border-none rounded-xl p-3 shadow-inner outline-none focus:ring-2 focus:ring-orange-100 resize-none transition-all placeholder:italic leading-none" placeholder="Deskripsi kerusakan..." />
                                    <div class="flex gap-2" v-if="line.itemId">
                                      <span class="text-[8px] font-black bg-orange-50 text-orange-600 px-2 py-0.5 rounded border border-orange-100 flex items-center gap-1 uppercase tracking-widest shadow-sm"><i class="pi pi-arrow-down-left text-[7px]"></i> WMS Return Target Entry</span>
                                    </div>
                                 </div>
                              </td>
                              
                              <td class="px-6 py-6 align-middle text-center border-r bg-slate-50/30 h-full">
                                 <div class="flex flex-col items-center gap-1">
                                    <input :disabled="isReadonly" type="number" v-model.number="line.qty" class="w-24 h-11 border-none rounded-2xl px-2 text-center text-sm font-black text-slate-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-orange-500 font-mono" placeholder="0" />
                                    <input :disabled="isReadonly" type="text" v-model="line.uomCode" class="w-12 text-[9px] font-black uppercase text-center outline-none bg-transparent text-slate-400 border-b border-dashed border-slate-200 mt-1" placeholder="UOM" />
                                 </div>
                              </td>
                              
                              <td class="px-6 py-6 align-middle text-right border-r relative h-full">
                                 <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] text-slate-300 font-sans font-bold">Rp</span>
                                 <input :disabled="isReadonly" type="number" v-model.number="line.unitPrice" class="w-full h-11 border-none rounded-2xl px-3 text-right text-sm font-black text-slate-400 bg-transparent shadow-none outline-none focus:ring-2 focus:ring-orange-500 font-mono opacity-50" placeholder="0" />
                              </td>
                              
                              <td class="px-6 py-6 align-middle bg-orange-50/20 text-right h-full relative">
                                 <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-orange-400 font-sans font-black">Rp</span>
                                 <div class="text-[17px] font-black font-mono tracking-tighter text-orange-900 drop-shadow-sm pr-1">
                                    -{{ formatCurrency(calculateLineTotal(line)) }}
                                 </div>
                              </td>
                              
                              <td v-if="!isReadonly" class="px-6 py-6 align-middle text-center">
                                  <button @click="removeLine(idx)" class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black hover:bg-rose-600 hover:text-white transition-all shadow-sm">✕</button>
                              </td>
                           </tr>
                           <tr v-if="form.lines.length === 0">
                              <td :colspan="isReadonly ? 4 : 5" class="py-24 text-center">
                                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] italic">Tidak ada daftar komplain dalam sengketa ini.</div>
                              </td>
                           </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- Gross Total Bar -->
                    <div class="p-10 border-t border-slate-100 bg-slate-900 shrink-0 flex flex-col md:flex-row justify-between items-center gap-8 rounded-b-[1.5rem] relative overflow-hidden">
                       <div class="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center rotate-12">
                          <i class="pi pi-sync text-[200px] text-white font-black animate-spin-slow"></i>
                       </div>
                       <div class="z-10 text-left text-white">
                          <div class="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 mb-2">Biaya Piutang Hilang (Credit Return)</div>
                          <div class="text-5xl font-black text-white tracking-tighter font-mono flex items-start leading-none group">
                             <span class="text-xl text-orange-500 mr-3 mt-1 font-sans opacity-50">Rp</span>-{{ formatCurrency(calcGross()) }}<span class="text-sm font-sans ml-3 mt-2 text-slate-400 uppercase tracking-widest">Memotong Laba Bersih</span>
                          </div>
                       </div>
                       <div class="z-10 hidden lg:block text-right">
                          <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest line-clamp-2 max-w-[200px] leading-tight lowercase">Statistik negatif ini akan mendepresiasi laba rugi bulanan sebagai 'Sales Return'.</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Dialog Footer Gates -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <Button label="Kembali" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          
          <div class="flex items-center gap-4">
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="Tolak Klaim & Batalkan RMA" severity="danger" text :loading="saving" :disabled="saving" @click="saveAction('REJECTED')" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-rose-600 hover:bg-rose-50 rounded-xl" />
             <Button v-if="isReadonly && canManage && form.status === 'DRAFT'" label="SAHKAN: TERBITKAN NOTA KREDIT & WMS!" severity="warning" :loading="saving" :disabled="saving" @click="saveAction('APPROVED')" class="p-button-rounded h-14 px-12 bg-orange-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-orange-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-exclamation-triangle" />
             <Button v-else-if="!isReadonly" label="Kunci Investigasi (Save Draft)" severity="info" @click="saveAction('DRAFT')" class="p-button-rounded h-14 px-14 bg-slate-900 border-none text-white font-black text-[10px] uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all" icon="pi pi-lock-open" />
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('sales.return.manage') || true); 

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
  customerId: '',
  orderId: '',
  returnDate: '',
  notes: '',
  status: 'DRAFT',
  lines: [] as Array<any>
});

const mockCustomers = ref<any[]>([
  {id:'1', code: 'CUS-KVJ', name:'PT. Kopi Viktori Jaya'},
]);

const filteredDocs = computed(() => {
  let list = docs.value;
  if (statusFilter.value) {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => p.code?.toLowerCase().includes(q) || p.customer?.name?.toLowerCase().includes(q));
  }
  return list;
});

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const formatCurrency = (val: any) => {
  if (!val && val !== 0 || isNaN(val)) return '0';
  return Number(val).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const calculateLineTotal = (line: any) => (Number(line.qty||0) * Number(line.unitPrice||0));
const calcGross = () => form.lines.reduce((a,c) => a + calculateLineTotal(c), 0);

const calculateGrandTotal = (doc: any) => {
    if(!doc.items) return 0;
    return doc.items.reduce((acc: number, cur: any) => acc + calculateLineTotal(cur), 0);
}

const statusMapper = (s: string) => {
    if(s === 'APPROVED') return 'RMA DISAHKAN';
    if(s === 'REJECTED') return 'RETUR DITOLAK';
    if(s === 'DRAFT') return 'INVESTIGASI (DRAFT)';
    if(s === 'PENDING_APPROVAL') return 'INSPEKSI QC';
    return s;
}

const statusBadgeClasses = (s: string) => {
    if(s === 'REJECTED') return 'bg-rose-50 text-rose-700 border border-rose-100 opacity-50';
    if(s === 'DRAFT') return 'bg-slate-50 text-slate-400 border border-slate-200';
    if(s === 'PENDING_APPROVAL') return 'bg-amber-50 text-amber-600 border border-amber-100';
    return 'bg-orange-50 text-orange-600 border border-orange-100';
};

const statusColor = (s: string) => {
    if(s === 'REJECTED') return '#f43f5e';
    if(s === 'DRAFT') return '#94a3b8';
    if(s === 'PENDING_APPROVAL') return '#f59e0b';
    return '#ea580c';
};

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/core/query?table=SalesReturn&include=customer,order,items');
    if (res.data && res.data.data) {
        docs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Mock Data based on postgres seeded data
    docs.value = [
      { 
        id: '1', code: "RMA-202604-001", status: "DRAFT", returnDate: "2026-04-18T00:00", notes: "Klaim Retur (RMA): 5 bungkus kemasan kopi bocor/sobek saat pengiriman transit.",
        customer: { code: 'CUS-KVJ', name: 'PT. Kopi Viktori Jaya' },
        order: { code: 'SO-202604-001' },
        items: [
           { itemId: 'wms-key', desc: 'Kopi Bubuk Arabica Premium 250g (Kemasan Rusak)', qty: 5, unitPrice: 115000, uomCode: 'PCS' }
        ]
      }
    ];
    try {
        const cs = await api.get('/core/query?table=Customer');
        if (cs.data?.data) mockCustomers.value = cs.data.data;
    } catch(er){}
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeDoc.value = null;
  isReadonly.value = false;
  form.id = '';
  form.code = 'RMA-NEW';
  form.customerId = mockCustomers.value[0]?.id || '';
  form.orderId = '';
  form.returnDate = new Date().toISOString().split('T')[0];
  form.status = 'DRAFT';
  form.notes = '';
  form.lines = [{ itemId: 'wms-key', desc: "Kopi Arabica Rusak", qty: 2, unitPrice: 120000, uomCode: 'PCS' }];
  
  dialogOpen.value = true;
}

function openView(r: any) {
  activeDoc.value = r;
  isReadonly.value = true; 
  
  form.id = r.id;
  form.code = r.code;
  form.customerId = r.customerId || mockCustomers.value[0]?.id;
  form.orderId = r.orderId || '';
  form.returnDate = r.returnDate?.split('T')[0] || '';
  form.notes = r.notes || '';
  form.status = r.status;
  
  if (r.items && r.items.length > 0) {
      form.lines = r.items.map((x:any) => ({...x}));
  } else {
      form.lines = [];
  }

  if (r.status === 'DRAFT') {
      isReadonly.value = false;
  }

  dialogOpen.value = true;
}

function addLine() {
   form.lines.push({ itemId: null, desc: "", qty: 1, unitPrice: 0, discount: 0, uomCode: 'PCS' });
}

function removeLine(idx: number) {
   form.lines.splice(idx, 1);
}

async function saveAction(targetStatus: string) {
  saving.value = true;
  form.status = targetStatus;
  
  let msg = "RMA baru berhasil dikunci sebagai DRAFT. Tunggu QC melakukan inspeksi barang cacat.";
  if(targetStatus === 'REJECTED') msg = "RMA DITOLAK. Sengketa dibatalkan. Klien tidak berhak mendapat pengurangan tagihan AR.";
  if(targetStatus === 'APPROVED') msg = "RMA DISAHKAN! SIKLUS NEGATIF DIJALANKAN : (1) Secara fisik, Gudang WMS di-'Receive In' untuk menampung stok reject ini. (2) Secara keuangan, Nota Kredit (Credit Memo) diluncurkan untuk memotong utang Invoice Klien berdasar Nominal Merah ini!";

  setTimeout(() => {
    alert(msg);
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
  from { opacity: 0; transform: scale(0.95) translateY(10px); } 
  to { opacity: 1; transform: scale(1) translateY(0); } 
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
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
</style>
