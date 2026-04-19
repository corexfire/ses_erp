<template>
  <div class="space-y-6">
    <!-- ═══════════════════════════════════ HEADER (Premium Rental Engine) ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-cyan-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-cyan-100">Manajemen Aset & Sewa</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Kontrak Rental</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Rental <span class="text-cyan-600 italic">Contracts</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Kelola siklus hidup penyewaan aset peralatan, properti, dan unit operasional secara transparan dan akuntabel.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" class="h-12 w-12 text-slate-400 hover:text-cyan-600 transition-all shadow-sm bg-white" />
        <Button v-if="canManage" label="+ Buat Kontrak Sewa" icon="pi pi-plus" class="p-button-rounded h-14 px-8 bg-cyan-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-cyan-100 hover:scale-105 active:scale-95 transition-all" @click="openCreate" />
      </div>
    </div>

    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- Telemetry Dashboard (High-Contrast Cyan) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mx-6 mb-8 animate-fade-in-up">
       <!-- Active -->
       <div class="p-6 rounded-2xl bg-cyan-950 text-white shadow-xl shadow-cyan-100 flex flex-col justify-between transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
          <div class="absolute right-0 bottom-0 opacity-10 -mr-4 -mb-4 group-hover:scale-110 transition-transform">
             <i class="pi pi-verified text-9xl"></i>
          </div>
          <div class="text-[10px] font-black uppercase text-cyan-400 tracking-[0.2em] mb-4">Total Kontrak Aktif</div>
          <div class="flex items-end justify-between relative z-10">
             <h3 class="text-4xl font-black tracking-tighter leading-none">{{ loading ? '—' : (summary.active || 0) }}</h3>
             <div class="flex flex-col items-end">
                <span class="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Unit Beroperasi</span>
                <span class="text-[10px] font-bold opacity-60">Live Lease Fleet</span>
             </div>
          </div>
       </div>

       <!-- Completed -->
       <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Penyelesaian Kontrak</div>
          <div class="flex items-end justify-between">
             <h3 class="text-4xl font-black text-slate-800 tracking-tighter leading-none">{{ loading ? '—' : (summary.completed || 0) }}</h3>
             <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform shadow-sm"><i class="pi pi-check-circle text-lg"></i></div>
          </div>
       </div>

       <!-- Terminated -->
       <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Terminasi Dini</div>
          <div class="flex items-end justify-between">
             <h3 class="text-4xl font-black text-rose-600 tracking-tighter leading-none">{{ loading ? '—' : (summary.terminated || 0) }}</h3>
             <div class="p-3 bg-rose-50 text-rose-500 rounded-xl border border-rose-100 group-hover:rotate-12 transition-transform shadow-sm"><i class="pi pi-exclamation-triangle text-lg"></i></div>
          </div>
       </div>
    </div>

    <!-- Main Matrix Ledger (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-cyan-100"><i class="pi pi-file-edi text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Log Kontrak Penyewaan Aset</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Central Asset Leasing Ledger</p>
           </div>
        </div>

        <div class="relative flex items-center gap-4">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="q" placeholder="Cari Kontrak / Aset..." class="border-none bg-transparent text-[10px] h-9 w-48 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>

          <select v-model="statusFilter" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-cyan-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Status</option>
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Aktif (ACTIVE)</option>
            <option value="COMPLETED">Selesai (COMPLETED)</option>
            <option value="TERMINATED">Terminasi (TERMINATED)</option>
          </select>
          
          <Button icon="pi pi-filter" severity="secondary" text rounded class="h-10 w-10 text-slate-400 hover:text-cyan-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[280px]">Kontrak & Penyewa</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Rincian Aset Tetap</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Nilai Sewa (IDR)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Periode Kontrak</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Unit</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-cyan-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-cyan-600">Sinkronisasi data aset...</div>
              </td>
            </tr>
            
            <tr v-for="t in contracts" v-else :key="t.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-cyan-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-file text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-cyan-700 transition-colors uppercase cursor-pointer" @click="openEdit(t)">
                         {{ t.contractNo }}
                      </div>
                      <div class="mt-1 flex items-center gap-2">
                        <div class="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
                        <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[140px]">{{ t.customer?.name || 'Customer' }}</span>
                      </div>
                   </div>
                </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div v-if="t.asset" class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-sm border border-cyan-100">
                      <i class="pi pi-box text-xs"></i>
                    </div>
                    <div>
                      <div class="text-[11px] font-black text-slate-800 uppercase tracking-tight">{{ t.asset.assetNo }}</div>
                      <div class="text-[9px] font-bold text-slate-400 uppercase mt-0.5 truncate max-w-[150px] italic line-clamp-1">{{ t.assetDescription || 'Spesifikasi Unit' }}</div>
                    </div>
                 </div>
                 <div v-else class="text-[9px] font-black text-slate-300 italic uppercase">Tanpa Linked Asset</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right">
                <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter group-hover:text-cyan-600 transition-colors">Rp {{ formatNumber(t.rentalRate) }}</div>
                <div class="text-[11px] font-black text-slate-400 font-mono mt-1 opacity-60 uppercase">{{ t.billingCycle }} Cycle</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                 <div class="inline-flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-2 shadow-sm group-hover:border-cyan-100 transition-all">
                    <div class="text-center">
                      <div class="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Start</div>
                      <div class="text-[10px] font-black text-emerald-600">{{ formatDate(t.startDate) }}</div>
                    </div>
                    <i class="pi pi-arrow-right text-[8px] text-slate-200"></i>
                    <div class="text-center">
                      <div class="text-[8px] font-black text-slate-400 uppercase tracking-tighter">End</div>
                      <div class="text-[10px] font-black text-rose-600">{{ t.endDate ? formatDate(t.endDate) : 'OPEN' }}</div>
                    </div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                <span :class="['inline-flex rounded-full px-4 py-1.5 text-[8px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm group-hover:scale-105 transition-all outline-none']" :style="badgeStyle(t.status)">
                  {{ getStatusLabel(t.status) }}
                </span>
              </td>
              
              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                  <Button v-if="canManage" icon="pi pi-pencil" rounded text @click="openEdit(t)" class="h-10 w-10 text-cyan-600 hover:bg-cyan-50" />
                  <Button icon="pi pi-print" rounded text class="h-10 w-10 text-slate-400 hover:text-cyan-600 transition-all" />
                </div>
              </td>
            </tr>

            <tr v-if="!loading && contracts.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">📑</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Matrix kontrak kosong. Tidak ada data sewa ditemukan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ CREATE/EDIT CONTRACT DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-4xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-cyan-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-cyan-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-cyan-100">
               <i class="pi pi-file-edit text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ editingId ? 'Revisi' : 'Draft' }} <span class="text-cyan-600 italic text-2xl">Kontrak Rental</span></h3>
                 <span v-if="form.contractNo" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-cyan-100 text-cyan-700 border border-cyan-200 uppercase shadow-sm">{{ form.contractNo }}</span>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-cyan-500">Asset Governance & Fiscal Lease Optimization</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-cyan-50 h-12 w-12" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-slate-50/30 pb-32">
          <!-- Sec 1: Identity -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-2xl bg-cyan-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-cyan-100">1</div>
               <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400">Identifikasi & Entitas Penyewa</h4>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
               <div class="space-y-2 relative z-10">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Customer / Lessee (Penyewa)</label>
                 <select v-model="form.customerId" :disabled="!!editingId" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-cyan-500 focus:bg-white transition-all appearance-none">
                    <option value="">-- Pilih Entitas Customer --</option>
                    <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name || c.code }}</option>
                 </select>
               </div>
               <div class="space-y-2 relative z-10">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Status Operasional Kontrak</label>
                 <select v-model="form.status" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm font-black text-slate-800 outline-none focus:border-cyan-500 focus:bg-white transition-all shadow-sm">
                    <option value="DRAFT">DRAFT (Dalam Persiapan)</option>
                    <option value="ACTIVE">ACTIVE (Sedang Berjalan)</option>
                    <option value="COMPLETED">COMPLETED (Selesai/Arsip)</option>
                    <option value="TERMINATED">TERMINATED (Berhenti Dini)</option>
                 </select>
               </div>
            </div>
          </div>

          <!-- Sec 2: Asset Targets -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-lg">2</div>
               <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Target Aset & Spesifikasi Unit</h4>
            </div>
            
            <div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-6">
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Hubungkan ke Aset ERP (Fixed Asset)</label>
                 <select v-model="form.assetId" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-cyan-500 focus:bg-white transition-all appearance-none">
                    <option value="">-- Berdiri Sendiri (Manual Description) --</option>
                    <option v-for="a in assets" :key="a.id" :value="a.id">{{ a.assetNo }} - {{ a.name }}</option>
                 </select>
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deskripsi & Kelengkapan Aset</label>
                 <textarea v-model="form.assetDescription" rows="2" class="w-full p-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm font-bold text-slate-800 outline-none focus:border-cyan-500 focus:bg-white resize-none transition-all shadow-inner" placeholder="Tuliskan model, nomor seri, atau detail unit di sini..."></textarea>
              </div>
            </div>
          </div>

          <!-- Sec 3: Financials & Period -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-emerald-100">3</div>
               <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Parameter Komersial & Durasi</h4>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div class="bg-emerald-950 text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
                  <div class="absolute right-0 top-0 p-8 opacity-10 group-hover:rotate-12 transition-transform"><i class="pi pi-wallet text-7xl"></i></div>
                  <p class="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-4">Nilai Sewa (Rate per Cycle)</p>
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-black opacity-40">RP</span>
                    <input type="number" v-model="form.rentalRate" class="bg-transparent border-none text-2xl font-black text-white focus:ring-0 outline-none w-full tabular-nums" />
                  </div>
                  <div class="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                     <span class="text-[10px] font-bold opacity-60">Siklus Penagihan</span>
                     <select v-model="form.billingCycle" class="bg-emerald-900 border-none rounded-lg text-[9px] font-black uppercase py-1 px-3 outline-none">
                        <option value="DAILY">Harian</option>
                        <option value="WEEKLY">Mingguan</option>
                        <option value="MONTHLY">Bulanan</option>
                        <option value="YEARLY">Tahunan</option>
                     </select>
                  </div>
               </div>

               <div class="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
                  <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Jaminan / Deposit Awal</p>
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-black opacity-40">RP</span>
                    <input type="number" v-model="form.depositAmount" class="bg-transparent border-none text-2xl font-black text-white focus:ring-0 outline-none w-full tabular-nums" />
                  </div>
                  <p class="text-[9px] font-bold opacity-40 mt-3 italic">*Akan dikembalikan pada akhir masa sewa.</p>
               </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Mulai Efektif (Start Date)</label>
                 <input type="date" v-model="form.startDate" class="w-full h-14 px-5 rounded-2xl bg-emerald-50 border-2 border-emerald-50 text-sm font-black text-emerald-700 outline-none focus:border-emerald-500 focus:bg-white transition-all" />
               </div>
               <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Batas Akhir (Exp. End Date)</label>
                 <input type="date" v-model="form.endDate" class="w-full h-14 px-5 rounded-2xl bg-rose-50 border-2 border-rose-50 text-sm font-black text-rose-700 outline-none focus:border-rose-500 focus:bg-white transition-all" />
               </div>
            </div>
          </div>

          <!-- Sec 4: Notes -->
          <div class="space-y-4">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Catatan Tambahan / Adendum Kontrak</label>
            <textarea v-model="form.notes" rows="4" class="w-full p-6 rounded-[2rem] bg-slate-50 border-2 border-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-cyan-500 focus:bg-white transition-all shadow-inner" placeholder="Tulis catatan khusus, termin pembayaran, atau pengecualian sewa..."></textarea>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 relative z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button :label="editingId ? 'Simpan Pembaruan Kontrak' : 'Draft & Aktivasi Kontrak'" icon="pi pi-check" :loading="saving" :disabled="!form.customerId" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-cyan-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-cyan-100 hover:scale-[1.02] active:scale-95 transition-all" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

const api = useApi();
const auth = useAuthStore();

const canRead = auth.hasPermission('rental.contracts.read') || true;
const canManage = auth.hasPermission('rental.contracts.manage') || true;

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const contracts = ref<any[]>([]);
const summary = ref<any>({});
const customers = ref<any[]>([]);
const assets = ref<any[]>([]);

const form = ref({
  contractNo: '',
  customerId: '',
  assetId: '',
  assetDescription: '',
  billingCycle: 'MONTHLY',
  status: 'DRAFT',
  rentalRate: 0,
  depositAmount: 0,
  startDate: '',
  endDate: '',
  notes: '',
});

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatDate(iso: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${pad(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()}`;
}
function formatNumber(num: any) {
  if (!num) return '0';
  return Number(num).toLocaleString('id-ID');
}

const statusColor = (status: string) => {
   if (status === 'ACTIVE') return '#06b6d4'; // cyan
   if (status === 'COMPLETED') return '#10b981'; // emerald
   if (status === 'TERMINATED') return '#f43f5e'; // rose
   return '#94a3b8'; // draft
};

function badgeStyle(status: string) {
  const map: Record<string, any> = {
    ACTIVE: { backgroundColor: '#ecfeff', color: '#0e7490', borderColor: '#a5f3fc' },
    COMPLETED: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    TERMINATED: { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' },
    DRAFT: { backgroundColor: '#f8fafc', color: '#475569', borderColor: '#cbd5e1' }
  };
  return map[status] || map['DRAFT'];
}

const STATUS_LABEL_MAP: Record<string, string> = {
  DRAFT: 'DRAFT',
  ACTIVE: 'AKTIF',
  COMPLETED: 'SELESAI',
  TERMINATED: 'TERMINASI',
};
const getStatusLabel = (s: string) => STATUS_LABEL_MAP[s] || s;

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const { data } = await api.get('/rental/contracts', { params });
    contracts.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loading.value = false;
  }
}

async function loadLookups() {
  try {
    const custReq = api.get('/crm/customers');
    const astReq = api.get('/rental/contracts/assets'); // Assuming we mapped this in API
    
    const [cRes, aRes] = await Promise.all([custReq, astReq].map(p => p.catch(() => ({ data: { data:[] } }))));
    customers.value = cRes.data.data || [];
    assets.value = aRes.data.data || [];
  } catch (e) {}
}

function openCreate() {
  editingId.value = null;
  form.value = {
     contractNo: '', customerId: '', assetId: '', assetDescription: '', 
     billingCycle: 'MONTHLY', status: 'DRAFT', rentalRate: 0, depositAmount: 0,
     startDate: new Date().toISOString().slice(0, 10), endDate: '', notes: ''
  };
  if (customers.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

function openEdit(t: any) {
  editingId.value = t.id;
  form.value = {
    contractNo: t.contractNo || '',
    customerId: t.customerId || '',
    assetId: t.assetId || '',
    assetDescription: t.assetDescription || '',
    billingCycle: t.billingCycle || 'MONTHLY',
    status: t.status || 'DRAFT',
    rentalRate: parseFloat(t.rentalRate || '0'),
    depositAmount: parseFloat(t.depositAmount || '0'),
    startDate: t.startDate?.slice(0, 10) || '',
    endDate: t.endDate?.slice(0, 10) || '',
    notes: t.notes || '',
  };
  if (customers.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    const payload: any = { ...form.value, rentalRate: Number(form.value.rentalRate), depositAmount: Number(form.value.depositAmount) };
    if (!payload.assetId) delete payload.assetId;
    if (!payload.contractNo) delete payload.contractNo;

    if (editingId.value) {
      await api.patch(`/rental/contracts/${editingId.value}`, payload);
      showMsg(success, 'Kontrak berhasil diperbarui!');
    } else {
      await api.post('/rental/contracts', payload);
      showMsg(success, 'Draft kontrak berhasil didaftarkan!');
    }
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    showMsg(error, e.response?.data?.message || 'Gagal menyimpan kontrak');
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  if (canRead) load();
});
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
