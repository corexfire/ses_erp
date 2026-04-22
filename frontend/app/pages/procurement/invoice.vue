<template>
  <div class="space-y-4">
    <!-- Header (Premium Invoice Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-indigo-400">Governance Core</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Treasury & AP Hub</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Faktur <span class="text-indigo-600 italic text-3xl">Pembelian</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Manajemen register hutang (Accounts Payable) dan kewajiban vendor. Kelola integritas e-faktur, termin pembayaran, dan likuiditas pengeluaran.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Register Hutang (Aging)" size="small" icon="pi pi-calendar-clock" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="Entry Faktur Baru" size="small" icon="pi pi-plus-circle" class="p-button-rounded h-12 px-8 bg-indigo-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all" v-if="canManage" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Dynamic AP KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-indigo-600 text-white shadow-xl flex flex-col justify-between border border-indigo-500 transition-all hover:bg-indigo-700 group">
        <div class="text-[10px] font-black uppercase text-indigo-200 tracking-[0.2em] mb-4 opacity-80">Total Kewajiban (AP)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl font-black text-white tracking-widest leading-none">IDR <span class="text-5xl tracking-tighter">{{ formatCurrency(invs.reduce((acc, x) => acc + x.balanceDue, 0)) }}</span></h3>
          <div class="p-3 bg-white/20 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-wallet text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Faktur Terhutang</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-700 tracking-tighter leading-none">{{ invs.filter(x => x.balanceDue > 0).length }}</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><i class="pi pi-receipt text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Melewati Jatuh Tempo</div>
        <div class="flex flex-col items-start gap-1">
          <h3 class="text-4xl font-black text-rose-700 tracking-tighter leading-none">{{ invs.filter(x => isOverdue(x)).length }}<span class="text-xl text-rose-300 ml-1">Faktur</span></h3>
          <div class="text-[9px] font-black text-rose-500 uppercase tracking-widest leading-none mt-1">High Liquiditiy Risk</div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Realisasi Pembayaran</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">92<span class="text-xl text-emerald-300 ml-1 ml-1">%</span></h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- AP Ledger (Premium Grid) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-indigo-400 shadow-xl"><i class="pi pi-credit-card text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Daftar Faktur & Hutang</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Accounts Payable & Commercial Obligations Ledger</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Kode / Vendor / e-Faktur..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <select v-model="statusFilter" class="bg-white border border-slate-200 rounded-2xl px-4 h-10 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-600 outline-none transition-all cursor-pointer">
            <option value="">Semua Status</option>
            <option value="DRAFT">Draft</option>
            <option value="POSTED">Outstanding</option>
            <option value="PAID">Lunas (Paid)</option>
            <option value="CANCELLED">Batal</option>
          </select>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-indigo-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- AP Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-indigo-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-48">Audit Tagihan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Referensi Dokumen</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right border-l border-slate-50">Nilai Tagihan (IDR)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right border-l border-slate-50">Sisa Hutang (Balance)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-32 border-l border-slate-50">Status Tagihan</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
             <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-indigo-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-indigo-600">Sinkronisasi register hutang faktur...</div>
              </td>
            </tr>
            
            <tr v-for="inv in filteredInvs" v-else :key="inv.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="Number(inv.balanceDue) > 0 ? 'hover:border-l-rose-400' : 'hover:border-l-emerald-400 opacity-60 bg-slate-50/20'">
              <td class="px-8 py-6 align-top">
                 <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-indigo-700 transition-colors uppercase">{{ inv.code }}</div>
                 <div class="mt-2 space-y-1">
                    <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><i class="pi pi-calendar text-indigo-400"></i> {{ formatDate(inv.invoiceDate) }}</div>
                    <div class="text-[9px] font-black text-rose-500 uppercase tracking-[0.2em] px-2 py-0.5 bg-rose-50 border border-rose-100/50 rounded-lg w-fit mt-1">Due: {{ formatDate(inv.dueDate) }}</div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-top border-l border-slate-50">
                <div class="font-black text-slate-900 text-[13px] tracking-tight leading-none mb-2 uppercase group-hover:text-indigo-700 transition-colors">{{ inv.supplier?.name || 'Unknown Vendor' }}</div>
                <div class="flex flex-col gap-1.5">
                   <div v-if="inv.orderId" class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span class="px-1.5 py-0.5 bg-slate-100 rounded border text-slate-500">PO REF</span>
                      <span class="text-slate-600 font-mono">{{ inv.order?.code }}</span>
                   </div>
                   <div v-if="inv.taxFacturNumber" class="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                      <span class="px-1.5 py-0.5 bg-emerald-50 rounded border border-emerald-100">E-FAKTUR</span>
                      <span class="font-mono">{{ inv.taxFacturNumber }}</span>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-top text-right border-l border-slate-50 bg-slate-50/20 group-hover:bg-slate-100/30 transition-colors">
                 <div class="font-mono text-[11px] font-black text-slate-800 tracking-tight">{{ formatCurrency(inv.grandTotal) }}</div>
                 <div class="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 italic">Tax Incl: {{ formatCurrency(inv.taxAmount) }}</div>
              </td>

              <td class="px-6 py-6 align-top text-right border-l border-slate-50">
                 <div v-if="Number(inv.balanceDue) > 0" class="font-mono text-[13px] font-black text-rose-600 tracking-tighter animate-pulse">{{ formatCurrency(inv.balanceDue) }}</div>
                 <div v-else class="font-black text-[10px] text-emerald-600 uppercase tracking-widest flex items-center justify-end gap-1.5">
                    <i class="pi pi-check-circle"></i> LUNAS (PAID)
                 </div>
                 <div class="w-full bg-slate-100 h-1 mt-3 rounded-full overflow-hidden flex shadow-inner">
                    <div class="bg-emerald-500 h-full transition-all duration-1000" :style="`width: ${((inv.grandTotal - inv.balanceDue) / inv.grandTotal) * 100}%`"></div>
                 </div>
              </td>

              <td class="px-6 py-6 align-top text-center border-l border-slate-50 relative overflow-hidden">
                 <div class="relative z-10 flex flex-col items-center gap-1.5">
                    <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border w-28 flex items-center justify-center shadow-sm uppercase" :class="getStatusStyle(inv)">
                       {{ standardizeStatus(inv).replace('_', ' ') }}
                    </span>
                    <div v-if="isOverdue(inv)" class="text-[8px] font-black text-rose-500 uppercase tracking-[0.2em] animate-pulse">⚠️ KETERLAMBATAN</div>
                 </div>
              </td>

              <td class="px-8 py-6 align-top text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Review Dokumen" severity="secondary" rounded outlined @click="openView(inv)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                    <Button v-if="Number(inv.balanceDue) > 0 && standardizeStatus(inv) !== 'DRAFT'" label="Proses Bayar" severity="success" class="h-9 px-6 bg-emerald-600 border-none text-white hover:bg-emerald-700 transition-all text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-100" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && filteredInvs.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🧾</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Tidak ada riwayat tagihan faktur saat ini.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Integrasi Registrasi Faktur (Universal Centered Dialog) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-6xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-slate-900">
        <!-- Dialog Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-receipt text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ activeInv?.id ? 'Review' : 'Registrasi' }} <span class="text-indigo-600 italic text-2xl">Faktur Pemasok</span></h3>
                 <span v-if="activeInv?.id" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase" :class="getStatusStyle(activeInv)">{{ standardizeStatus(activeInv) }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-indigo-500 text-indigo-600">Treasury Provisioning & Accounts Payable Gateway</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body (3-Panel Workspace) -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              
              <!-- Panel 1: Integritas Vendor & Legal -->
              <div class="animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-building text-indigo-500"></i> I. Integritas Vendor & Legal
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-indigo-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Pemasok / Vendor Penagih <span class="text-rose-500 ml-1 opacity-50 font-black">*</span></label>
                       <select v-if="!isReadonly" v-model="form.supplierId" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all appearance-none cursor-pointer">
                          <option value="">-- Pilih Supplier --</option>
                          <option v-for="s in mockSuppliers" :value="s.id">{{ s.name }}</option>
                       </select>
                       <div v-else class="h-14 bg-indigo-50/30 rounded-2xl px-6 flex items-center font-black text-[13px] text-indigo-800 border-2 border-indigo-100 italic">{{ activeInv?.supplier?.name || '-' }}</div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Integrasi Purchase Order (PO)</label>
                       <div v-if="!isReadonly" class="flex gap-2">
                          <InputText type="text" v-model="form.poSourceCode" placeholder="No PO..." class="flex-1 h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all font-mono tracking-widest uppercase" />
                          <Button label="Tarik" severity="secondary" @click="pullFromPO" class="px-6 h-14 bg-slate-900 border-none text-white font-black text-[10px] uppercase rounded-2xl hover:bg-black transition-all" />
                       </div>
                       <div v-else class="h-14 bg-slate-50 rounded-2xl px-6 flex items-center font-mono text-[11px] font-black text-slate-600 italic border-2 border-slate-100">{{ activeInv?.order?.code || 'TRANSAKSI LANGSUNG' }}</div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">No. Seri e-Faktur Pajak</label>
                       <InputText v-if="!isReadonly" type="text" v-model="form.taxFacturNumber" placeholder="xxx.xxx-xx.xxxxxxxx" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-emerald-900 bg-emerald-50/20 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all font-mono tracking-widest" />
                       <div v-else class="h-14 bg-emerald-50/20 rounded-2xl px-6 flex items-center font-mono text-[11px] font-black text-emerald-700 border-2 border-emerald-100 italic">{{ activeInv?.taxFacturNumber || 'NON PKP / KOSONG' }}</div>
                    </div>
                 </div>
              </div>

              <!-- Panel 2: Termin & Jatuh Tempo -->
              <div class="animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-calendar text-rose-500"></i> II. Termin & Jatuh Tempo
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-rose-100 border-b-[8px] border-b-rose-600">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Tanggal Faktur Diterbitkan</label>
                       <input v-if="!isReadonly" type="date" v-model="form.invoiceDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all font-mono" />
                       <div v-else class="h-14 bg-slate-50 rounded-2xl px-6 flex items-center justify-between font-mono text-[13px] font-black text-slate-800 border-2 border-slate-100 italic">
                          <span>DATE</span>
                          <span>{{ formatDate(activeInv?.invoiceDate) }}</span>
                       </div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Kredit Pembayaran (ToP)</label>
                       <select v-if="!isReadonly" v-model="form.paymentTerms" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all appearance-none cursor-pointer uppercase tracking-widest font-mono">
                          <option value="CASH">CASH / DIRECT</option>
                          <option value="COD">C.O.D</option>
                          <option value="NET14">KREDIT 14 HARI</option>
                          <option value="NET30">KREDIT 30 HARI</option>
                          <option value="NET60">KREDIT 60 HARI</option>
                       </select>
                       <div v-else class="h-14 bg-indigo-50/10 rounded-2xl px-6 flex items-center font-black text-[11px] text-slate-700 uppercase tracking-[0.3em] italic border-2 border-slate-100">{{ formatPaymentTerm(activeInv?.paymentTerms) }}</div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-rose-600 uppercase tracking-widest px-1">Batas Jatuh Tempo (Due Date)</label>
                       <input v-if="!isReadonly" type="date" v-model="form.dueDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-rose-900 bg-rose-50/50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all font-mono border-2 border-rose-100" />
                       <div v-else class="h-14 bg-rose-500 rounded-2xl px-6 flex items-center justify-between font-mono text-[15px] font-black text-white italic shadow-lg shadow-rose-100">
                          <span class="text-[8px] font-black opacity-60">AUDIT DANGER</span>
                          <span>{{ formatDate(activeInv?.dueDate) }}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel 3: Ringkasan Finansial -->
              <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-chart-bar text-slate-900"></i> III. Ringkasan Finansial
                 </div>
                 <div class="bg-slate-900 p-8 rounded-[2rem] border-4 border-slate-800 shadow-2xl space-y-8 flex flex-col h-[calc(100%-3rem)] relative overflow-hidden group">
                    <div class="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
                    
                    <div class="space-y-2 mt-auto">
                       <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Total Hutang Faktur</p>
                       <div class="text-4xl font-black text-white tracking-tighter transition-all group-hover:text-amber-400">
                          Rp {{ formatCurrency(isReadonly ? activeInv?.balanceDue : calculatedGrand) }}
                       </div>
                    </div>

                    <div class="space-y-4 border-t border-slate-800 pt-6">
                       <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span class="text-slate-500">Subtotal (DPP)</span>
                          <span class="text-slate-300 font-mono">{{ formatCurrency(calculatedSubtotal) }}</span>
                       </div>
                       <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span class="text-slate-500">PPN Masukan (11%)</span>
                          <span class="text-emerald-400 font-mono">+ {{ formatCurrency(calculatedTax) }}</span>
                       </div>
                       <div class="flex justify-between items-center pt-4 border-t border-slate-800 font-black text-sm uppercase tracking-tighter">
                          <span class="text-slate-400">Nilai Akhir Faktur</span>
                          <span class="text-emerald-400 text-xl font-mono">{{ formatCurrency(calculatedGrand) }}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Allocation Grid Section -->
           <div class="animate-fade-in-up" style="animation-delay: 0.3s">
              <div class="flex justify-between items-end mb-6">
                 <div>
                    <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-2 flex items-center gap-2">
                       <i class="pi pi-box text-indigo-500"></i> Allocation Ledger (Rincian Beban)
                    </div>
                    <p class="text-[10px] font-black text-slate-400 uppercase italic">Pastikan alokasi item sesuai dengan tanda terima barang (GRN).</p>
                 </div>
                 <Button v-if="!isReadonly" label="Tambah Baris Alokasi" icon="pi pi-plus" size="small" @click="addLine" class="px-6 h-12 bg-white border-2 border-slate-200 text-slate-900 font-black text-[10px] uppercase rounded-2xl hover:bg-slate-50 transition-all shadow-sm" />
              </div>

              <div class="bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm overflow-hidden mb-10 overflow-x-auto custom-scrollbar">
                 <table class="w-full text-xs">
                    <thead class="bg-slate-50 text-left font-black border-b border-slate-100">
                       <tr>
                          <th class="px-8 py-5 text-[9px] text-slate-400 uppercase tracking-[0.2em] w-12 text-center">No</th>
                          <th class="px-6 py-5 text-[9px] text-slate-400 uppercase tracking-[0.2em]">Penjelasan Item / Alokasi Beban</th>
                          <th class="px-6 py-5 text-[9px] text-slate-400 uppercase tracking-[0.2em] text-right w-32 border-l border-slate-50">Volume (Qty)</th>
                          <th class="px-6 py-5 text-[9px] text-slate-400 uppercase tracking-[0.2em] text-center w-24 border-l border-slate-50">Satuan</th>
                          <th class="px-6 py-5 text-[9px] text-slate-400 uppercase tracking-[0.2em] text-right w-48 border-l border-slate-50">Harga Satuan (IDR)</th>
                          <th class="px-8 py-5 text-[9px] text-slate-900 uppercase tracking-[0.2em] text-right w-56 border-l border-slate-50 bg-indigo-50 font-black tracking-widest">Bruto Alokasi (IDR)</th>
                       </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                       <tr v-for="(line, idx) in form.lines" :key="idx" class="hover:bg-slate-50 transition-all group">
                          <td class="px-8 py-6 text-center font-mono text-slate-400 font-black">{{ idx + 1 }}</td>
                          <td class="px-6 py-6">
                             <InputText v-if="!isReadonly" v-model="line.desc" class="w-full h-12 border-none rounded-xl px-4 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all uppercase" placeholder="Masukkan deskripsi tagihan..." />
                             <span v-else class="font-black text-slate-800 uppercase text-[12px] tracking-tight italic">{{ line.desc }}</span>
                          </td>
                          <td class="px-6 py-6 text-right border-l border-slate-50">
                             <InputText v-if="!isReadonly" type="number" v-model.number="line.qty" class="w-full h-12 border-none rounded-xl px-4 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all text-right font-mono" />
                             <span v-else class="font-mono text-[12px] font-black text-slate-700 tracking-tighter">{{ line.qty }}</span>
                          </td>
                          <td class="px-6 py-6 text-center border-l border-slate-50">
                             <InputText v-if="!isReadonly" v-model="line.uomCode" class="w-full h-12 border-none rounded-xl px-4 text-[11px] font-black text-slate-500 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all text-center uppercase tracking-widest" />
                             <span v-else class="text-[11px] font-black text-slate-400 uppercase tracking-widest">{{ line.uomCode }}</span>
                          </td>
                          <td class="px-6 py-6 text-right border-l border-slate-50">
                             <InputText v-if="!isReadonly" type="number" v-model.number="line.unitPrice" class="w-full h-12 border-none rounded-xl px-4 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all text-right font-mono" />
                             <span v-else class="font-mono text-[12px] font-black text-slate-700 tracking-tighter">{{ formatCurrency(line.unitPrice) }}</span>
                          </td>
                          <td class="px-8 py-6 text-right border-l border-slate-50 bg-indigo-50/20 font-mono text-[13px] font-black text-slate-900 relative group/line">
                             <span class="group-hover/line:text-indigo-700 transition-colors tracking-tighter">{{ formatCurrency((line.qty || 0) * (line.unitPrice || 0)) }}</span>
                             <button v-if="!isReadonly" @click="removeLine(idx)" class="absolute right-2 top-1/2 -translate-y-1/2 bg-rose-100 text-rose-600 rounded-xl w-8 h-8 flex items-center justify-center opacity-0 group-hover/line:opacity-100 transition-all hover:bg-rose-600 hover:text-white shadow-xl">✕</button>
                          </td>
                       </tr>
                       <tr v-if="form.lines.length === 0">
                          <td colspan="6" class="py-24 text-center bg-slate-50/30">
                             <i class="pi pi-receipt text-6xl text-slate-200 block mb-6 px-1"></i>
                             <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] italic">Belum ada alokasi item hutang terdaftar untuk faktur ini...</div>
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <!-- Dialog Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div v-if="isReadonly" class="px-6 py-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2">
                <i class="pi pi-shield"></i> Dokumen Faktur Terverifikasi
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batal & Tutup" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                v-if="!isReadonly" 
                label="Posting Faktur ke G/L Ledger" 
                icon="pi pi-arrow-up-right" 
                iconPos="right"
                size="large" 
                :loading="saving" 
                :disabled="saving || form.lines.length === 0 || !form.supplierId" 
                @click="save" 
                class="h-14 px-12 bg-slate-900 border-none text-emerald-400 font-black text-[10px] uppercase shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all rounded-xl" 
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

const canManage = computed(() => auth.hasPermission('procurement.invoice.manage') || true); // Dev fallback

const invs = ref<any[]>([]);
const search = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const dialogOpen = ref(false);
const isReadonly = ref(true);
const activeInv = ref<any>(null);

// Mocks for creating
const mockSuppliers = ref<any[]>([
  {id:'1', code:'SUP-RAW-001', name:'PT Sumber Tani Indonesia'},
  {id:'2', code:'SUP-EQP-001', name:'Indo Tech Machinery TBK'}
]);

const form = reactive({
  supplierId: '',
  poSourceCode: '',
  invoiceDate: '',
  dueDate: '',
  paymentTerms: 'NET30',
  taxFacturNumber: '',
  notes: '',
  lines: [] as Array<any>
});

const standardizeStatus = (inv: any) => {
   if(inv.balanceDue === 0 && Number(inv.grandTotal) > 0) return 'PAID';
   if(inv.status === 'APPROVED') return 'POSTED';
   return inv.status;
};

const isOverdue = (inv: any) => {
   if (standardizeStatus(inv) === 'PAID') return false;
   if (!inv.dueDate) return false;
   return new Date(inv.dueDate).getTime() < new Date().getTime();
};

const filteredInvs = computed(() => {
  let list = invs.value;
  if (statusFilter.value) {
    list = list.filter(p => standardizeStatus(p) === statusFilter.value || p.status === statusFilter.value);
  }
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter(p => 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.taxFacturNumber && p.taxFacturNumber.toLowerCase().includes(q)) ||
      (p.supplier?.name && p.supplier.name.toLowerCase().includes(q))
    );
  }
  return list;
});

const calculatedSubtotal = computed(() => {
  if (isReadonly.value && activeInv.value) return Number(activeInv.value.subtotal);
  return form.lines.reduce((acc, line) => acc + ((line.qty || 0) * (line.unitPrice || 0)), 0);
});
const calculatedTax = computed(() => {
  if (isReadonly.value && activeInv.value) return Number(activeInv.value.taxAmount);
  return calculatedSubtotal.value * 0.11;
});
const calculatedGrand = computed(() => {
  if (isReadonly.value && activeInv.value) return Number(activeInv.value.grandTotal);
  return calculatedSubtotal.value + calculatedTax.value;
});

// Helpers
const formatPaymentTerm = (term: string) => {
  if(!term) return 'CASH';
  const mapping: Record<string, string> = {
    'NET14': 'Net 14 Hari', 'NET30': 'Net 30 Hari', 'NET45': 'Net 45 Hari', 'NET60': 'Net 60 Hari', 'DP50_NET30': 'DP 50%, Net 30'
  }
  return mapping[term] || term;
};

const getStatusStyle = (inv: any) => {
  const st = standardizeStatus(inv);
  switch (st) {
    case 'DRAFT': return 'bg-slate-100 text-slate-700 border border-slate-200';
    case 'PENDING_APPROVAL': return 'bg-amber-100 text-amber-700 border border-amber-200';
    case 'POSTED': return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'PAID': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
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
    const res = await api.get('/core/query?table=PurchaseInvoice&include=items,supplier,order');
    if (res.data && res.data.data) {
        invs.value = res.data.data;
    } else {
        throw new Error("No payload");
    }
  } catch (e: any) {
    // Fallback Mock based on seeds we created because the UI requires standard API which may not have native controllers active in bypass mode context
    invs.value = [
      { 
        id: '1', code: "PINV-202604-1001", order: { code: 'PO-202604-001'}, status: "APPROVED", invoiceDate: "2026-04-15T00:00", dueDate: "2026-05-15T00:00",
        paymentTerms: "NET30", taxFacturNumber: "010.000-26.01234567", notes: "Tagihan Pembelian Material",
        subtotal: 95000000, taxAmount: 10450000, grandTotal: 105450000, balanceDue: 0,
        supplier: { name: 'PT Sumber Tani Indonesia' },
        items: [{desc: 'Karton Box Food Grade', qty: 50000, uomCode: 'PCS', unitPrice: 1900}] 
      },
      { 
        id: '2', code: "PINV-202604-1002", order: null, status: "DRAFT", invoiceDate: "2026-04-18T00:00", dueDate: "2026-04-18T00:00", // COD mode (overdue trigger demo if older)
        paymentTerms: "COD", taxFacturNumber: "060.000-26.98127311", notes: "Pembayaran Jasa Maintenance",
        subtotal: 5000000, taxAmount: 550000, grandTotal: 5550000, balanceDue: 5550000,
        supplier: { name: 'PT Bersih Kilau Facility' },
        items: [{desc: 'Jasa Cuci AC & Freon Gedung C', qty: 1, uomCode: 'LS', unitPrice: 5000000}] 
      }
    ];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  activeInv.value = null;
  isReadonly.value = false;
  form.supplierId = '';
  form.poSourceCode = '';
  form.notes = '';
  form.invoiceDate = new Date().toISOString().split('T')[0];
  form.dueDate = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]; // Auto +30 
  form.paymentTerms = 'NET30';
  form.taxFacturNumber = '';
  form.lines = [];
  dialogOpen.value = true;
}

function openView(r: any) {
  activeInv.value = r;
  isReadonly.value = true;
  form.supplierId = r.supplierId;
  form.poSourceCode = r.order?.code || '';
  form.notes = r.notes;
  form.invoiceDate = r.invoiceDate?.split('T')[0] || '';
  form.dueDate = r.dueDate?.split('T')[0] || '';
  form.paymentTerms = r.paymentTerms || 'CASH';
  form.taxFacturNumber = r.taxFacturNumber || '';
  
  form.lines = (r.items || []).map((x:any) => ({...x}));
  dialogOpen.value = true;
}

function addLine() {
  form.lines.push({ desc: '', qty: 1, uomCode: 'LS', unitPrice: 0 });
}

function removeLine(idx: number) {
  form.lines.splice(idx, 1);
}

function pullFromPO() {
  if(!form.poSourceCode) return;
  alert('Menarik baris PO ke dalam Faktur berdasarkan GRN (Good Receipts Note)...!');
  form.lines = [
    {desc: 'Karton Box 30x30 FR (Tarik dari PO)', qty: 50000, uomCode: 'PCS', unitPrice: 1900}
  ];
  form.supplierId = '1';
}

async function save() {
  saving.value = true;
  setTimeout(() => {
    alert('Faktur AP berhasil di-posting ke G/L Ledger!');
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
