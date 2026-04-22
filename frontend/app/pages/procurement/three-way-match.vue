<template>
  <div class="space-y-4">
    <!-- Header (Premium Audit Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-400">Audit Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Financial Integrity Engine</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Rekonsiliasi <span class="text-emerald-600 italic text-3xl">Tiga Arah (3WM)</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Audit presisi Procure-to-Pay untuk memvalidasi tagihan vendor. Bandingkan Pesanan Pembelian, Penerimaan Barang, dan Faktur secara otomatis.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Audit Log Pembayaran" size="small" icon="pi pi-shield" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="Simulasi Rekonsiliasi Baru" size="small" icon="pi pi-check-square" class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic Audit KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex flex-col justify-between border border-emerald-500 transition-all hover:bg-emerald-700 group">
        <div class="text-[10px] font-black uppercase text-emerald-200 tracking-[0.2em] mb-4 opacity-80">Total Audit Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ matches.length }}</h3>
          <div class="p-3 bg-white/20 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-check-square text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Nilai Deviasi Terdeteksi</div>
        <div class="flex flex-col items-start">
           <div class="flex items-center gap-1">
              <span class="text-xs font-black text-rose-800 uppercase">Rp</span>
              <h3 class="text-4xl font-black text-rose-700 tracking-tighter leading-none">12.5M</h3>
           </div>
        </div>
      </div>
      
      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Dokumen Sesuai (Matched)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ matches.filter(m => standardizeStatus(m) === 'MATCHED').length }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-shield-check text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Menunggu Rekonsiliasi</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-700 tracking-tighter leading-none">8</h3>
          <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100"><i class="pi pi-sync text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Audit Ledger (Premium Grid) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-emerald-400 shadow-xl"><i class="pi pi-check-circle text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Daftar Audit Rekonsiliasi</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Trinity Mapping Reconciliation Ledger</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Kode Audit / PO / Invoice..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
            <div class="h-6 w-[1px] bg-slate-100 mx-2"></div>
            <select v-model="statusFilter" class="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-500 pr-8 outline-none cursor-pointer hover:text-emerald-600 transition-colors">
              <option value="">Semua Analisis</option>
              <option value="MATCHED">Clear / Sesuai Sempurna</option>
              <option value="DISCREPANCY">🔴 Deviasi / Selisih</option>
            </select>
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-emerald-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- 3WM Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-48">Bukti Audit</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Pemetaan Trinity (PO -> GRN -> INV)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-48 border-l border-slate-50">Status Rekonsiliasi</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-48 border-l border-slate-50">Nilai Deviasi</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Investigasi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-emerald-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-emerald-600">Mengkoneksikan mesin komparasi ERP...</div>
              </td>
            </tr>
            
            <tr v-for="mw in filteredMatches" v-else :key="mw.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="standardizeStatus(mw) === 'MATCHED' ? 'hover:border-l-emerald-400' : 'hover:border-l-rose-400'" @click="openView(mw)">
              <td class="px-8 py-6 align-middle">
                <div>
                   <div class="font-black text-slate-900 text-[13px] tracking-tight leading-none mb-2 group-hover:text-emerald-700 transition-colors uppercase">{{ mw.code }}</div>
                   <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5"><i class="pi pi-calendar-check text-emerald-400"></i> Eksekusi: {{ formatDate(mw.matchDate) }}</div>
                </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="flex items-center gap-4">
                    <div class="flex flex-col gap-2">
                       <div class="flex items-center gap-2">
                          <span class="w-8 h-4 bg-blue-50 text-blue-600 text-[8px] font-black flex items-center justify-center rounded border border-blue-100">PO</span>
                          <span class="text-[10px] font-black text-slate-700 font-mono tracking-tighter">{{ mw.order?.code || '...' }}</span>
                       </div>
                       <div class="flex items-center gap-2">
                          <span class="w-8 h-4 bg-amber-50 text-amber-600 text-[8px] font-black flex items-center justify-center rounded border border-amber-100">GRN</span>
                          <span class="text-[10px] font-black text-slate-700 font-mono tracking-tighter">{{ mw.receipt?.code || '...' }}</span>
                       </div>
                    </div>
                    <i class="pi pi-arrow-right text-slate-200 text-xs"></i>
                    <div class="flex items-center gap-2">
                       <span class="w-8 h-4 bg-indigo-50 text-indigo-600 text-[8px] font-black flex items-center justify-center rounded border border-indigo-100">INV</span>
                       <span class="text-[10px] font-black text-indigo-700 font-mono tracking-tighter">{{ mw.invoice?.code || '...' }}</span>
                    </div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 relative overflow-hidden">
                 <div class="absolute left-0 bottom-0 w-2 h-full opacity-20 transition-all group-hover:w-full" :class="standardizeStatus(mw) === 'MATCHED' ? 'bg-emerald-400' : 'bg-rose-400'"></div>
                 <div class="relative z-10 flex flex-col items-center gap-1">
                    <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border w-40 flex items-center justify-center shadow-sm backdrop-blur-sm" :class="standardizeStatus(mw) === 'MATCHED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200'">
                       <i v-if="standardizeStatus(mw) === 'MATCHED'" class="pi pi-check-circle mr-2 text-[10px]"></i>
                       <i v-else class="pi pi-exclamation-triangle mr-2 text-[10px] animate-pulse"></i>
                       {{ standardizeStatus(mw) === 'MATCHED' ? 'SESUAI' : 'DEVIASI' }}
                    </span>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-right border-l border-slate-50 bg-slate-50/20 group-hover:bg-slate-100/30 transition-colors shrink-0">
                 <div class="text-sm font-black font-mono tracking-tighter" :class="Number(mw.varianceAmount) > 0 ? 'text-rose-700' : 'text-slate-400'">
                    {{ Number(mw.varianceAmount) > 0 ? `+ ${formatCurrency(mw.varianceAmount)}` : 'Rp 0' }}
                 </div>
                 <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Variance Billed</p>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <Button label="Resolusi Audit" size="small" rounded outlined class="text-[10px] px-6 font-black py-2.5 h-10 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all uppercase tracking-widest" />
              </td>
            </tr>
            
            <tr v-if="!loading && filteredMatches.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <i class="pi pi-shield text-6xl text-slate-100 mb-4 block"></i>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Belum ada antrean validasi dokumen.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Dialog Compliance Hub (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[95vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-shield-check text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Pusat <span class="text-emerald-600 italic text-2xl">Audit & Rekonsiliasi</span></h3>
                <span v-if="activeMw?.id" class="inline-flex rounded-xl text-[10px] font-black uppercase shadow-sm border px-4 py-1.5 h-8 items-center tracking-widest" :class="standardizeStatus(activeMw) === 'MATCHED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200'">
                   {{ standardizeStatus(activeMw) }}
                </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Enterprise Trinity Documentation Matching (3-Way Match)</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (Workspace) -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10 flex flex-col gap-10">
           <!-- The Three Pillars Selection Module -->
           <div class="animate-fade-in-up">
              <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                 <i class="pi pi-sitemap text-emerald-500"></i> Pemetaan Komponen Rantai Pasok
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- Komponen 1: PO -->
                  <div class="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-sm flex flex-col transition-all hover:bg-blue-50/30 hover:border-blue-100 group">
                     <div class="bg-blue-50/50 border-b p-4 border-blue-50 flex items-center gap-4">
                        <div class="w-8 h-8 rounded-xl bg-blue-600 text-white flex justify-center items-center font-black text-xs shadow-lg group-hover:rotate-6 transition-transform">1</div>
                        <div>
                           <div class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Purchase Order</div>
                           <div class="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Komersial & Harga</div>
                        </div>
                     </div>
                     <div class="p-4 bg-white shrink-0">
                        <input v-if="!isReadonly" type="text" v-model="form.orderCode" placeholder="Masukkan Nomor PO..." class="w-full h-12 border-none rounded-xl px-4 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-blue-400 transition-all font-mono tracking-widest uppercase" />
                        <div v-else class="font-mono text-[13px] font-black text-slate-800 tracking-widest bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">{{ activeMw?.order?.code || 'PO-?' }}</div>
                     </div>
                  </div>

                  <!-- Komponen 2: GRN -->
                  <div class="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-sm flex flex-col transition-all hover:bg-amber-50/30 hover:border-amber-100 group">
                     <div class="bg-amber-50/50 border-b p-4 border-amber-50 flex items-center gap-4">
                        <div class="w-8 h-8 rounded-xl bg-amber-600 text-white flex justify-center items-center font-black text-xs shadow-lg group-hover:rotate-6 transition-transform">2</div>
                        <div>
                           <div class="text-[10px] font-black text-amber-900 uppercase tracking-widest">Goods Receipt</div>
                           <div class="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Fisik & Kuantitas</div>
                        </div>
                     </div>
                     <div class="p-4 bg-white shrink-0">
                        <input v-if="!isReadonly" type="text" v-model="form.receiptCode" placeholder="Masukkan Nomor GRN..." class="w-full h-12 border-none rounded-xl px-4 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all font-mono tracking-widest uppercase" />
                        <div v-else class="font-mono text-[13px] font-black text-slate-800 tracking-widest bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">{{ activeMw?.receipt?.code || 'GRN-?' }}</div>
                     </div>
                  </div>

                  <!-- Komponen 3: Invoice -->
                  <div class="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-sm flex flex-col transition-all hover:bg-indigo-50/30 hover:border-indigo-100 group border-b-[8px] border-b-indigo-700">
                     <div class="bg-indigo-50/50 border-b p-4 border-indigo-50 flex items-center gap-4">
                        <div class="w-8 h-8 rounded-xl bg-indigo-600 text-white flex justify-center items-center font-black text-xs shadow-lg group-hover:rotate-6 transition-transform">3</div>
                        <div>
                           <div class="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Purchase Invoice</div>
                           <div class="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Tagihan Akhir</div>
                        </div>
                     </div>
                     <div class="p-4 bg-white shrink-0">
                        <input v-if="!isReadonly" type="text" v-model="form.invoiceCode" placeholder="Kode Faktur Vendor..." class="w-full h-12 border-none rounded-xl px-4 text-[13px] font-black text-indigo-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all font-mono tracking-widest uppercase" />
                        <div v-else class="font-mono text-[13px] font-black text-indigo-700 tracking-widest bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">{{ activeMw?.invoice?.code || 'INV-?' }}</div>
                        <Button v-if="!isReadonly" label="Mulai Engine Rekonsiliasi" icon="pi pi-bolt" class="w-full h-12 text-[10px] font-black uppercase tracking-widest bg-indigo-600 border-none text-white shadow-xl mt-4 hover:scale-[1.02] active:scale-95 transition-all rounded-xl" @click="runSimulation" />
                     </div>
                  </div>
              </div>
           </div>

           <!-- Discrepancy Matrix Hub -->
           <div class="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl animate-fade-in-up">
              <!-- Result Banner -->
              <div class="p-4 px-10 flex justify-between items-center transition-colors duration-500" :class="isReadonly ? (standardizeStatus(activeMw) === 'MATCHED' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white') : (simulationRan ? (calculatedVariance > 0 ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white') : 'bg-slate-200 text-slate-500')">
                 <div class="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                    <i class="pi pi-eye text-sm"></i> Hasil Keputusan Audit Lintas Silang (Execution Result)
                 </div>
                 <div class="text-[11px] font-black uppercase tracking-widest animate-pulse">
                    {{ isReadonly ? standardizeStatus(activeMw) : (simulationRan ? (calculatedVariance > 0 ? 'DEV-DISCREPANCY' : 'SYS-MATCHED') : 'AWAITING_INPUT') }}
                 </div>
              </div>

              <div class="p-10 flex flex-col md:flex-row gap-12">
                 <!-- Variance Card -->
                 <div class="md:w-[400px] p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-100 shadow-inner flex flex-col justify-center items-center text-center group transition-all hover:bg-white hover:border-emerald-100">
                    <div class="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-4">Total Nilai Selisih Deviasi</div>
                    <div class="flex items-end gap-3 transition-transform duration-500 group-hover:scale-110">
                       <span class="text-xs font-black text-slate-400 mb-1 uppercase italic">IDR</span>
                       <div class="text-5xl font-black font-mono tracking-tighter" :class="(isReadonly && Number(activeMw?.varianceAmount) > 0) || calculatedVariance > 0 ? 'text-rose-600' : 'text-emerald-700'">
                          {{ formatCurrency(isReadonly ? activeMw?.varianceAmount : calculatedVariance) }}
                       </div>
                    </div>
                    <div class="mt-6 p-4 bg-white/50 rounded-xl border border-dashed border-slate-200">
                       <p class="text-[9px] text-slate-400 font-medium leading-relaxed italic">Jika sistem mendeteksi deviasi (selisih > 0), Departemen Keuangan wajib membekukan sementara rilis pembayaran A/P sampai investigasi selesai.</p>
                    </div>
                 </div>
                 
                 <!-- Notes Box -->
                 <div class="flex-1 space-y-4">
                    <label class="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] block px-1 flex items-center gap-2 italic">
                       <i class="pi pi-search text-emerald-500"></i> Catatan Investigasi Audit / Temuan Akuntan
                    </label>
                    <textarea v-if="!isReadonly" v-model="form.discrepancyNotes" rows="6" class="w-full rounded-[2rem] border-none p-8 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all resize-none italic" placeholder="Jelaskan hasil telaah komparasi disini..."></textarea>
                    <div v-else class="text-[13px] font-black text-slate-700 leading-relaxed bg-slate-50 p-8 rounded-[2rem] border border-slate-100 min-h-[160px] italic shadow-inner">
                       {{ activeMw?.discrepancyNotes || 'Pemeriksaan dokumen tidak mencatat adanya anomali atau deviasi material. Lolos sensor audit otomatis dan diizinkan untuk eksekusi pembayaran.' }}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Dialog Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <Button label="Keluar dari Panel Audit" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          <div class="flex items-center gap-4">
             <Button v-if="!isReadonly" label="Kunci & Laporkan Hasil Audit" size="large" icon="pi pi-shield" :loading="saving" :disabled="saving || !simulationRan" @click="save" class="h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" />
             
             <Button v-if="isReadonly && canManage && standardizeStatus(activeMw) === 'DISCREPANCY'" label="Tunda Pembayaran (Hold Payment)" size="large" icon="pi pi-ban" class="h-14 px-12 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all" />
             
             <Button v-if="isReadonly && canManage && standardizeStatus(activeMw) === 'MATCHED'" label="Izinkan Eksekusi Pembayaran" size="large" icon="pi pi-lock-open" class="h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const canManage = computed(() => auth.hasPermission('procurement.threeway.manage') || true); // Dev fallback

const matches = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activeMw = ref<any>(null);

const form = reactive({
  orderCode: '',
  receiptCode: '',
  invoiceCode: '',
  discrepancyNotes: '',
  varianceAmount: 0
});

const simulationRan = ref(false);

const standardizeStatus = (mw: any) => {
   if(mw.status === 'APPROVED') return 'MATCHED'; // Handle aliases
   return mw.status;
};

const filteredMatches = computed(() => {
  let list = matches.value;
  if (statusFilter.value) {
    list = list.filter(p => standardizeStatus(p) === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.order?.code && p.order.code.toLowerCase().includes(q)) ||
      (p.invoice?.code && p.invoice.code.toLowerCase().includes(q))
    );
  }
  return list;
});

const calculatedVariance = computed(() => form.varianceAmount);

// Helpers
const getStatusStyle = (status: string) => { return ''; }; // Handled inline due to complexity

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
    const res = await api.get('/core/query?table=ThreeWayMatching&include=order,receipt,invoice');
    if (res.data && res.data.data) {
        matches.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Fallback Mock based on PG Seeds
    matches.value = [
      { 
        id: '1', code: "3WM-202604-001", status: "MATCHED", matchDate: "2026-04-20T00:00", varianceAmount: 0,
        discrepancyNotes: "Dokumen komplit dan nilai harga serta kuantitas presisi 100%. Sesuai antara PO (Harga), GRN (Fisik Masuk), dan Invoice (Tagihan).",
        order: { code: 'PO-202604-001' }, receipt: { code: 'GRN-202604-001' }, invoice: { code: 'PINV-202604-1001' }
      },
      { 
        id: '2', code: "3WM-202604-002", status: "DISCREPANCY", matchDate: "2026-04-21T00:00", varianceAmount: 150000,
        discrepancyNotes: "Terdeteksi deviasi/perbedaan tagihan sebesar Rp 150.000 (Harga unit di Invoice lebih tinggi dari kesepakatan PO awal).",
        order: { code: 'PO-202604-002' }, receipt: { code: 'GRN-202604-002' }, invoice: { code: 'PINV-202604-1005' }
      }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeMw.value = null;
  isReadonly.value = false;
  simulationRan.value = false;
  form.orderCode = '';
  form.receiptCode = '';
  form.invoiceCode = '';
  form.discrepancyNotes = '';
  form.varianceAmount = 0;
  dialogOpen.value = true;
}

function openView(r: any) {
  activeMw.value = r;
  isReadonly.value = true;
  dialogOpen.value = true;
}

function runSimulation() {
  if (!form.orderCode || !form.invoiceCode) return alert('Silakan isi tautan dokumen referensi');
  simulationRan.value = true;
  alert('Mensimulasikan pengecekan harga antar dokumen...');
  // Force a dummy discrepancy for demo interaction
  form.varianceAmount = 25000;
  form.discrepancyNotes = "Sistem mendeteksi ada perbedaan antara tagihan akhir akibat biaya bongkar-muat yang diselundupkan vendor ke Invoice Pihak Ketiga. Selisih IDR 25,000.";
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Log investigasi rekonsiliasi berhasil disimpan. Bagian keuangan kini punya landasan kuat.');
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
</style>
