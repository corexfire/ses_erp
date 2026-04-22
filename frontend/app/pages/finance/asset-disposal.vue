<template>
  <div class="space-y-4 text-slate-900 border-none shadow-none">
    <!-- ═══════════════════════════════════ HEADER (Premium Disposal Engine) ══════════════════════════════════ -->
    <div v-if="success" class="mx-6 mt-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-check-circle text-xl"></i> {{ success }}
    </div>
    <div v-if="error" class="mx-6 mt-6 bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-200 text-sm font-black flex items-center gap-3 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-xl"></i> {{ error }}
    </div>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-purple-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-purple-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-purple-100 italic">Structural Exit Strategy</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-purple-600 uppercase tracking-widest tracking-tighter">Pelepasan Aset Tetap</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Penghapusan <span class="text-purple-600 italic font-medium">Inventaris</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70 italic border-l-2 border-purple-500 pl-4">Manajemen terminasi aset operasional melalui penjualan atau pemusnahan (scrap), serta pengakuan laba/rugi atas nilai buku terakhir.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="text-right mr-4 hidden lg:block">
           <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Dokumen Draft</div>
           <div class="text-2xl font-black text-purple-700 tabular-nums tracking-tighter">{{ disposals.filter(x => x.status === 'DRAFT').length }} Antrean</div>
        </div>
        <Button v-if="canManage" label="+ SURAT PELEPASAN" icon="pi pi-plus" severity="help" @click="showDialog = true"
          class="h-14 px-8 rounded-[1.25rem] bg-purple-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-purple-100 hover:scale-[1.05] active:scale-95 transition-all text-purple-100 shadow-none border-none" />
      </div>
    </div>

    <!-- Performance Insight Board (KPI Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6">
        <div class="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col justify-between group transition-all hover:bg-slate-50">
           <div class="flex justify-between items-center">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Transaksi</div>
              <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-sm"><i class="pi pi-list"></i></div>
           </div>
           <div class="mt-4 text-3xl font-black text-slate-800 tabular-nums tracking-tighter">{{ disposals.length }} Dokumen Rilis</div>
        </div>

        <div class="bg-slate-900 rounded-[2rem] p-8 shadow-xl relative overflow-hidden group transition-all hover:translate-y-[-5px]">
           <div class="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-125 transition-transform duration-700 text-purple-500"><i class="pi pi-ban text-[120px]"></i></div>
           <div class="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1 relative z-10 italic">Inbound Liquid Response</div>
           <div class="text-2xl font-black text-white tabular-nums tracking-tighter relative z-10">{{ formatRupiah(disposals.filter(x => x.status === 'APPROVED').reduce((s,c) => s + Number(c.saleValue), 0)) }}</div>
           <p class="text-[8px] font-bold text-slate-500 uppercase mt-2 relative z-10">Total Hasil Penjualan Aset</p>
        </div>

        <div class="bg-rose-50 border border-rose-100 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between group transition-all hover:bg-rose-100">
           <div class="text-[10px] font-black text-rose-700 uppercase tracking-widest mb-1 italic">Rugi Penjualan (Net Loss)</div>
           <div class="text-2xl font-black text-rose-800 tabular-nums tracking-tighter">{{ formatRupiah(totalLoss) }}</div>
           <p class="text-[8px] font-bold text-rose-600 uppercase mt-2 opacity-60">Total Write-off & Kerugian Pelepasan</p>
        </div>
    </div>

    <!-- High-Density Disposal Ledger Grid -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up uppercase tracking-tighter">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-history text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Buku Log Pelepasan Aset</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Fixed Asset Termination Register</p>
           </div>
        </div>

        <div class="relative flex flex-wrap items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Ref / Data Aset..." class="border-none bg-transparent text-[10px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" />
          </div>

          <select v-model="filterStatus" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-purple-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Dokumen</option>
            <option value="DRAFT">Status: Draft</option>
            <option value="APPROVED">Status: Disetujui</option>
          </select>
          
          <Button icon="pi pi-refresh" severity="secondary" text rounded @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-purple-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[280px]">Dokumen Pelepasan (Surat)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-36 bg-slate-50/50">Tgl Eksekusi</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right w-44">Nilai Jual (IDR)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right w-44">Rugi / Laba (Gain/Loss)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-32">Status</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-24 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-purple-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-purple-600">Sinkronisasi log terminasi aset...</div>
              </td>
            </tr>
            
            <tr v-for="d in filteredDisposals" v-else :key="d.id" class="transition-all hover:bg-purple-50/20 group border-l-4 border-l-transparent hover:border-l-purple-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-eject text-lg"></i>
                   </div>
                   <div>
                      <div class="font-black text-[11px] text-slate-800 tracking-tight group-hover:text-purple-700 transition-colors uppercase italic">{{ d.asset?.name || 'Aset Terhapus' }}</div>
                      <div class="flex items-center gap-2 mt-1">
                         <span class="font-mono text-[9px] font-black text-purple-700 uppercase tracking-widest">{{ d.disposalNo }}</span>
                         <span class="px-1.5 py-0.5 bg-slate-100 text-slate-400 text-[6px] font-black uppercase tracking-widest rounded leading-none border border-slate-200">{{ d.asset?.assetNo }}</span>
                      </div>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 font-black text-slate-500 text-[10px] bg-slate-50/5 transition-colors italic">
                 {{ fmtDate(d.disposalDate) }}
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right bg-emerald-50/5 group-hover:bg-emerald-50 transition-colors">
                 <div class="font-black text-emerald-800 text-sm tabular-nums tracking-tighter">{{ formatRupiah(d.saleValue) }}</div>
                 <div class="text-[8px] font-black text-emerald-300 font-mono mt-0.5 uppercase tracking-widest italic">Inbound Liquid Value</div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right group-hover:bg-slate-50 transition-colors">
                 <div class="font-black text-lg tabular-nums tracking-tighter group-hover:scale-105 transition-transform origin-right" :class="(Number(d.lossGain) >= 0) ? 'text-blue-700' : 'text-rose-700'">
                    {{ (Number(d.lossGain) > 0 ? '+' : '') }}{{ formatRupiah(d.lossGain) }}
                 </div>
                 <div class="text-[7px] font-black text-slate-300 font-mono mt-0.5 uppercase tracking-widest italic">Capital {{ (Number(d.lossGain) >= 0) ? 'Gain' : 'Loss' }}</div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50">
                 <div :class="{
                    'bg-slate-50 text-slate-400 border-slate-200': d.status === 'DRAFT',
                    'bg-purple-50 text-purple-700 border-purple-200': d.status === 'APPROVED'
                 }" class="px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest border inline-block uppercase shadow-sm">
                    {{ d.status }}
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button v-if="d.status === 'DRAFT' && canManage" icon="pi pi-check" rounded text severity="success" class="h-10 w-10 hover:bg-emerald-50" @click="openApprove(d)" />
                    <i v-else class="pi pi-lock text-slate-300"></i>
                 </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredDisposals.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500 block">
                 <div class="text-6xl mb-4 opacity-10">📄</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Buku log terminasi bersih. Belum ada aset yang dilepas.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ CREATE DISPOSAL DIALOG ══════════════════════════════════ -->
    <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all border-none text-slate-900">
      <div class="relative w-full max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-purple-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4 text-slate-900 border-none shadow-none">
            <div class="w-16 h-16 rounded-[1.5rem] bg-purple-700 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-purple-200">
               <i class="pi pi-eject text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3 text-slate-900">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Pelepasan <span class="text-purple-600 italic text-2xl">Aset Strategis</span></h3>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-purple-500 italic">Structural Termination Workflow</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="showDialog = false" class="relative z-10 hover:bg-purple-50 h-14 w-14" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 pb-32">
           <!-- Alert Context -->
           <div class="p-4 bg-amber-50 border border-amber-200 rounded-[2.5rem] flex items-start gap-5 group">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform shadow-amber-100"><i class="pi pi-exclamation-triangle text-xl"></i></div>
              <div class="flex-1 text-slate-900 border-none">
                 <h4 class="text-[11px] font-black text-amber-800 uppercase tracking-widest mb-1">Peringatan Audit Akuntansi</h4>
                 <p class="text-[10px] font-bold text-amber-600 uppercase leading-relaxed opacity-80 italic">Penjualan aset akan menghentikan otomatisasi penyusutan dan membandingkan hasil jual dengan sisa nilai buku (NBV) untuk mendeteksi Laba/Rugi pelepasan.</p>
              </div>
           </div>

           <!-- Form Sections -->
           <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
              <div class="space-y-4 text-slate-900">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pilih Unit Aset Fisik Aktif</label>
                 <select v-model="form.assetId" class="w-full h-16 px-6 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-purple-500 focus:bg-white transition-all shadow-sm cursor-pointer uppercase italic">
                    <option value="" disabled>-- Klik untuk Menampilkan Aset Terdaftar --</option>
                    <option v-for="a in activeAssets" :key="a.id" :value="a.id">
                       {{ a.assetNo }} - {{ a.name }} (NBV Taksiran: {{ formatRupiah(a.purchaseCost) }})
                    </option>
                 </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-4 text-slate-900">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">No. Surat Pelepasan (Ref)</label>
                    <input v-model="form.disposalNo" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-black text-slate-800 outline-none focus:border-purple-500 shadow-sm uppercase font-mono" placeholder="DISP-XXX" />
                 </div>
                 <div class="space-y-4 text-slate-900">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Eksekusi Riil</label>
                    <input type="date" v-model="form.disposalDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-purple-500 shadow-sm font-mono" />
                 </div>
              </div>

              <!-- Methods Toggle -->
              <div class="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-5">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 block text-center italic opacity-60">Metode Terminasi / Pelepasan Aset</label>
                 <div class="grid grid-cols-2 gap-4">
                    <div @click="form.method = 'SALE'" :class="form.method === 'SALE' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100 border-emerald-600' : 'bg-white text-slate-400 border-slate-100'" class="p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-3 group">
                       <i class="pi pi-money-bill text-2xl group-hover:scale-110 transition-transform"></i>
                       <span class="text-[9px] font-black uppercase tracking-widest">DIJUAL (SALE)</span>
                    </div>
                    <div @click="form.method = 'SCRAP'" :class="form.method === 'SCRAP' ? 'bg-rose-600 text-white shadow-xl shadow-rose-100 border-rose-600' : 'bg-white text-slate-400 border-slate-100'" class="p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-3 group">
                       <i class="pi pi-trash text-2xl group-hover:scale-110 transition-transform"></i>
                       <span class="text-[9px] font-black uppercase tracking-widest">DIBUANG (SCRAP)</span>
                    </div>
                 </div>
              </div>

              <div class="space-y-4 text-slate-900">
                 <label class="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-1 italic text-center block" v-if="form.method === 'SALE'">Estimasi Harga Penjualan Bersih (IDR)</label>
                 <label class="text-[10px] font-black text-rose-600 uppercase tracking-widest px-1 italic text-center block" v-else>Biaya Penghancuran / Nilai Scrap (IDR)</label>
                 <div class="relative">
                    <span class="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">RP</span>
                    <input type="number" v-model.number="form.saleValue" placeholder="0" class="w-full h-24 pl-16 pr-6 rounded-[2rem] bg-emerald-50/30 border-2 border-emerald-100 text-4xl font-black text-emerald-800 outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-xl font-mono tabular-nums" />
                 </div>
              </div>

              <div class="space-y-4 text-slate-900">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Uraian Alasan Pelepasan Secara Detail</label>
                 <textarea v-model="form.notes" rows="3" placeholder="Contoh: Unit mesin sudah mencapai batas umur teknis, dijual ke vendor pengepul..." class="w-full p-4 rounded-[2rem] bg-slate-50 border-2 border-slate-50 text-[11px] font-medium text-slate-700 outline-none focus:border-purple-500 focus:bg-white transition-all shadow-inner leading-relaxed"></textarea>
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex justify-end gap-3 relative z-20">
           <Button label="Batalkan" severity="secondary" text @click="showDialog = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600 border-none shadow-none" />
           <Button label="Kirim untuk Review (DRAFT)" icon="pi pi-send" :loading="saving" :disabled="saving || !isValid" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-purple-700 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all text-purple-100" />
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ APPROVAL REASON DIALOG ══════════════════════════════════ -->
    <div v-if="approveDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all text-slate-900 border-none">
      <div class="relative w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white border-b-[12px] border-b-emerald-900">
        <!-- Header -->
        <div class="p-8 border-b border-slate-100 bg-emerald-50 flex justify-between items-center relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div class="relative flex items-center gap-4 text-slate-900 border-none shadow-none">
            <div class="w-12 h-12 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xl rotate-6 transition-transform shadow-emerald-200">
               <i class="pi pi-check text-xl font-black"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-emerald-900 tracking-tight leading-none uppercase">Konfirmasi <span class="text-emerald-600 italic text-lg">Otorisasi</span></h3>
              <p class="text-[8px] font-black text-emerald-500 uppercase tracking-widest mt-1">Audit Termination Confirmation</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="approveDialog = false" class="relative z-10 hover:bg-white h-10 w-10 text-emerald-900" />
        </div>

        <div class="p-10 space-y-8 bg-white text-slate-900 border-none">
           <div class="p-4 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden group">
              <div class="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform"><i class="pi pi-eject text-5xl"></i></div>
              <div class="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-2 leading-none">Dokumen Terpilih</div>
              <div class="text-[11px] font-black uppercase tracking-tight line-clamp-1 group-hover:text-emerald-300 transition-colors italic">{{ activeDoc?.asset?.name }}</div>
              <div class="mt-2 font-mono text-[9px] font-black text-slate-400">{{ activeDoc?.disposalNo }}</div>
           </div>

           <div class="space-y-4 text-slate-900 border-none">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Alasan Persetujuan (Optional Opsional)</label>
              <textarea v-model="approvalReason" rows="2" placeholder="Ketik alasan otorisasi pelepasan ini jika perlu..." class="w-full p-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-[11px] font-medium text-slate-700 outline-none focus:border-emerald-500 shadow-inner"></textarea>
           </div>
        </div>

        <div class="p-8 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex flex-col gap-3 relative z-20">
           <Button label="EKSEKUSI PELEPASAN SEKARANG" icon="pi pi-verified"
             class="h-14 px-10 rounded-[1.25rem] bg-emerald-800 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all text-emerald-100" @click="confirmApprove" />
           <Button label="Batalkan" severity="secondary" text @click="approveDialog = false" class="h-10 font-black text-[9px] uppercase tracking-widest text-slate-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const auth = useAuthStore();

const success = ref('');
const error = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(() => { refVar.value = null; }, 3000); };

const canManage = computed(() => auth.hasPermission('finance.assetDisposal.create') || true);

const filterStatus = ref('');
const search = ref('');
const loading = ref(false);

const disposals = ref<any[]>([]);
const activeAssets = ref<any[]>([]);

const showDialog = ref(false);
const saving = ref(false);

const approveDialog = ref(false);
const activeDoc = ref<any>(null);
const approvalReason = ref('');

const form = reactive({ 
  assetId: '', 
  disposalNo: '', 
  disposalDate: new Date().toISOString().slice(0,10), 
  saleValue: 0,
  notes: '',
  method: 'SALE'
});

const isValid = computed(() => form.assetId && form.disposalNo && form.saleValue >= 0 && form.notes.length > 5);

const filteredDisposals = computed(() => {
   let list = disposals.value;
   if(search.value) {
      const q = search.value.toLowerCase();
      list = list.filter(x => 
         x.disposalNo?.toLowerCase().includes(q) || 
         x.asset?.name?.toLowerCase().includes(q) ||
         x.asset?.assetNo?.toLowerCase().includes(q)
      );
   }
   return list;
});

const totalLoss = computed(() => {
   return disposals.value.reduce((sum, curr) => {
       const gl = Number(curr.lossGain) || 0;
       return sum + (gl < 0 ? gl : 0);
   }, 0);
});

const formatRupiah = (val: number | string) => {
   if(!val && val !== 0) return 'Rp 0';
   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
};

const fmtDate = (d: string) => {
    if(!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const load = async () => {
  loading.value = true;
  try {
    const params = filterStatus.value ? `?status=${filterStatus.value}` : '';
    const [resD, resA] = await Promise.all([
        api.get(`/finance/asset-disposal${params}`),
        api.get(`/finance/assets`)
    ]);
    
    // Robust Extraction
    const assetPayload: any = resA.data || resA;
    const asList = assetPayload?.assets || [];
    activeAssets.value = asList.filter((x: any) => x.status === 'ACTIVE');

    const dispPayload: any = resD.data || resD;
    disposals.value = dispPayload?.disposals || [];

  } catch (e) {
    console.warn('Failed loading disposal data', e);
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  saving.value = true;
  try {
    await api.post('/finance/asset-disposal', form);
    showMsg(success, 'Dokumen pelepasan aset berhasil dibuat dalam status DRAFT.');
    showDialog.value = false;
    Object.assign(form, { assetId: '', disposalNo: '', saleValue: 0, notes: '', method: 'SALE' });
    await load();
  } catch(e) {
     showMsg(error, 'Gagal mendata surat pelepasan. Periksa mandatori data.');
  } finally { 
     saving.value = false; 
  }
};

const openApprove = (doc: any) => {
    activeDoc.value = doc;
    approvalReason.value = '';
    approveDialog.value = true;
};

const confirmApprove = async () => {
    if(!activeDoc.value) return;
    try {
        await api.post(`/finance/asset-disposal/${activeDoc.value.id}/approve`, { reason: approvalReason.value });
        showMsg(success, `Pelepasan aset ${activeDoc.value.asset?.name} telah disetujui & dibukukan.`);
        approveDialog.value = false;
        await load();
    } catch(e) {
        showMsg(error, 'Gagal memproses otorisasi pelepasan.');
    }
}

onMounted(() => { load(); });
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