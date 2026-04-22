<template>
  <div class="space-y-6">
    <!-- ═══════════════════════════════════ HEADER (Premium Maintenance Engine) ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-slate-100">Layanan & Pemeliharaan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Maintenance Logs</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Maintenance <span class="text-indigo-600 italic font-medium">Control</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3 uppercase tracking-tight opacity-70">Kelola riwayat perbaikan, servis rutin, dan Work Order aset secara terpadu untuk menjamin *uptime* maksimal armada Anda.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" class="h-12 w-12 text-slate-400 hover:text-indigo-600 transition-all shadow-sm bg-white" />
        <Button v-if="canManage" label="+ Buat Perintah Kerja (WO)" icon="pi pi-plus" class="p-button-rounded h-14 px-8 bg-slate-800 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all" @click="openCreate" />
      </div>
    </div>

    <!-- Component Alert -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- Maintenance Telemetry (High-Contrast Slate/Indigo) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mx-6 mb-8 animate-fade-in-up">
       <!-- Scheduled -->
       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Terjadwal (Scheduled)</div>
          <div class="flex items-end justify-between">
             <h3 class="text-3xl font-black text-slate-800 tracking-tighter leading-none">{{ loading ? '—' : (summary.scheduled || 0) }}</h3>
             <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 group-hover:rotate-12 transition-transform shadow-sm"><i class="pi pi-calendar text-lg"></i></div>
          </div>
       </div>

       <!-- In Progress -->
       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group border-l-4 border-l-blue-500">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Dalam Pengerjaan</div>
          <div class="flex items-end justify-between">
             <h3 class="text-3xl font-black text-blue-600 tracking-tighter leading-none">{{ loading ? '—' : (summary.inProgress || 0) }}</h3>
             <div class="p-3 bg-blue-50 text-blue-500 rounded-xl border border-blue-100 group-hover:rotate-12 transition-transform shadow-sm"><i class="pi pi-wrench text-lg"></i></div>
          </div>
       </div>

       <!-- Completed -->
       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Selesai (Arkif)</div>
          <div class="flex items-end justify-between">
             <h3 class="text-3xl font-black text-emerald-600 tracking-tighter leading-none">{{ loading ? '—' : (summary.completed || 0) }}</h3>
             <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform shadow-sm"><i class="pi pi-check-circle text-lg"></i></div>
          </div>
       </div>

       <!-- Finance Stats -->
       <div class="p-4 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200 flex flex-col justify-between transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
          <div class="absolute right-0 bottom-0 opacity-10 -mr-4 -mb-4 group-hover:scale-110 transition-transform">
             <i class="pi pi-chart-bar text-9xl"></i>
          </div>
          <div class="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] mb-4">Akumulasi Biaya Perawatan</div>
          <div class="flex items-end justify-between relative z-10">
             <h3 class="text-2xl font-black tracking-tighter leading-none">{{ loading ? '—' : formatCurrency(summary.totalCost) }}</h3>
             <div class="flex flex-col items-end">
                <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">OpEx Maintenance</span>
                <span class="text-[10px] font-bold opacity-60">Fleet Integrity</span>
             </div>
          </div>
       </div>
    </div>

    <!-- Main Matrix Ledger (High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      <!-- Ledger Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-slate-200"><i class="pi pi-cog text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Log Pemeliharaan & Armada Terpadu</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Central Asset Workshop Ledger</p>
           </div>
        </div>

        <div class="relative flex items-center gap-4">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="q" placeholder="Cari Ticket / Isu Kerja..." class="border-none bg-transparent text-[10px] h-9 w-48 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>

          <select v-model="statusFilter" class="h-11 rounded-2xl border-slate-200 px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 focus:border-indigo-500 outline-none bg-white shadow-sm transition-all" @change="load">
            <option value="">Semua Status</option>
            <option value="SCHEDULED">Terjadwal (SCHEDULED)</option>
            <option value="IN_PROGRESS">Dikerjakan (IN_PROGRESS)</option>
            <option value="COMPLETED">Selesai (COMPLETED)</option>
            <option value="CANCELLED">Batal (CANCELLED)</option>
          </select>
          
          <Button icon="pi pi-filter" severity="secondary" text rounded class="h-10 w-10 text-slate-400 hover:text-indigo-600 bg-white border shadow-sm" />
        </div>
      </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[280px]">Tiket & Penugasan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Deskripsi Isu/Kerusakan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Referesi Dokumen</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Status & Prioritas</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Biaya (IDR)</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Opsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="6" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-indigo-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-indigo-600">Menganalisis riwayat pemeliharaan...</div>
              </td>
            </tr>
            
            <tr v-for="t in logs" v-else :key="t.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-indigo-400">
              <td class="px-8 py-6 align-middle">
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                      <i class="pi pi-ticket text-lg"></i>
                   </div>
                   <div>
                      <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-indigo-700 transition-colors uppercase cursor-pointer" @click="openEdit(t)">
                         {{ t.ticketNo }}
                      </div>
                      <div class="mt-1 flex items-center gap-2">
                        <div class="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                        <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[140px] italic">{{ t.type }}</span>
                      </div>
                   </div>
                </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="text-[11px] font-black text-slate-800 uppercase tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">{{ t.issueDescription }}</div>
                 <div class="mt-1.5 flex items-center gap-2">
                    <i class="pi pi-user text-[9px] text-slate-300"></i>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{{ t.mechanicName || 'Menunggu Teknisi' }}</span>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                 <div class="flex flex-col gap-1.5 items-center">
                    <div v-if="t.contract" class="text-[8px] font-black bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded border border-cyan-100 uppercase tracking-widest shadow-sm">Doc: {{ t.contract.contractNo }}</div>
                    <div v-if="t.asset" class="text-[8px] font-black bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-widest shadow-sm font-mono">ASN: {{ t.asset.assetNo }}</div>
                    <div v-if="!t.contract && !t.asset" class="text-[9px] font-black text-slate-300 italic uppercase">Manual Log</div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <span :class="['inline-flex rounded-full px-4 py-1.5 text-[8px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm group-hover:scale-105 transition-all outline-none']" :style="badgeStyle(t.status)">
                    {{ getStatusLabel(t.status) }}
                 </span>
                 <div class="mt-2 flex items-center justify-center gap-1.5">
                    <div class="h-1 w-1 rounded-full animate-pulse" :style="{ backgroundColor: priorityColor(t.priority) }"></div>
                    <span class="text-[8px] font-black uppercase tracking-[0.1em]" :style="{ color: priorityColor(t.priority) }">P: {{ t.priority }}</span>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50 text-right">
                <div class="font-black text-slate-800 text-sm tabular-nums tracking-tighter group-hover:text-indigo-600 transition-colors">Rp {{ formatNumber(t.costAmount) }}</div>
                <div class="text-[8px] font-black text-slate-300 font-mono mt-0.5 uppercase tracking-widest">Repair Cost</div>
              </td>
              
              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                  <Button v-if="canManage" icon="pi pi-pencil" rounded text @click="openEdit(t)" class="h-10 w-10 text-indigo-600 hover:bg-indigo-50" />
                  <Button icon="pi pi-print" rounded text class="h-10 w-10 text-slate-400 hover:text-indigo-600 transition-all" />
                </div>
              </td>
            </tr>

            <tr v-if="!loading && logs.length === 0">
              <td colspan="6" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🛠️</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Matrix pemeliharaan bersih. Tidak ada isu aset ditemukan.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════ CREATE/EDIT WORK ORDER DIALOG ══════════════════════════════════ -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-4xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-slate-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-slate-800 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-slate-200">
               <i class="pi pi-cog text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ editingId ? 'Update' : 'Dispatch' }} <span class="text-indigo-600 italic text-2xl">Work Order</span></h3>
                 <span v-if="form.ticketNo" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-slate-100 text-slate-700 border border-slate-200 uppercase shadow-sm">{{ form.ticketNo }}</span>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-indigo-500">Fleet Asset Integrity & Maintenance System</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-slate-50/30 pb-32">
          <!-- Sec 1: Identity & Reference -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-slate-200">1</div>
               <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">Identifikasi & Referensi Aset</h4>
            </div>
            
            <div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-8">
               <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nomor Tiket Pekerjaan (Ticket No)</label>
                    <input type="text" v-model="form.ticketNo" disabled class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-500 outline-none font-mono" placeholder="Otomatis" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tipe Pemeliharaan</label>
                    <select v-model="form.type" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm font-black text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-sm">
                      <option value="PREVENTATIVE">Servis Rutin (PREVENTATIVE)</option>
                      <option value="REPAIR">Perbaikan Isu (REPAIR)</option>
                      <option value="INSPECTION">Inspeksi Lapangan (INSPECTION)</option>
                    </select>
                  </div>
               </div>
               
               <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50 border-dashed">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2"><i class="pi pi-link text-[8px] text-cyan-500"></i> Kontrak Penyewaan Terkait</label>
                    <select v-model="form.contractId" class="w-full h-14 px-5 rounded-2xl bg-cyan-50/30 border-2 border-cyan-100/50 text-sm font-black text-cyan-800 outline-none focus:border-cyan-500 focus:bg-white transition-all">
                       <option value="">-- Tidak Terhubung ke Kontrak --</option>
                       <option v-for="c in contracts" :key="c.id" :value="c.id">{{ c.contractNo }} - {{ c.customer?.name }}</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2"><i class="pi pi-link text-[8px] text-indigo-500"></i> Aset / Unit Spesifik</label>
                    <select v-model="form.assetId" class="w-full h-14 px-5 rounded-2xl bg-indigo-50/30 border-2 border-indigo-100/50 text-sm font-black text-indigo-800 outline-none focus:border-indigo-500 focus:bg-white transition-all">
                       <option value="">-- Unit Belum Ditentukan --</option>
                       <option v-for="a in assets" :key="a.id" :value="a.id">{{ a.assetNo }} - {{ a.name }}</option>
                    </select>
                  </div>
               </div>
            </div>
          </div>

          <!-- Sec 2: Status & Schedule -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-100">2</div>
               <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">Jadwal & Status Penugasan</h4>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-6">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tahapan WO (Status)</label>
                    <select v-model="form.status" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm font-black text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-sm">
                      <option value="SCHEDULED">TERJADWAL (Scheduled)</option>
                      <option value="IN_PROGRESS">DIKERJAKAN (In Progress)</option>
                      <option value="COMPLETED">SELESAI (Completed)</option>
                      <option value="CANCELLED">DIBATALKAN (Cancelled)</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Prioritas Penanganan</label>
                    <select v-model="form.priority" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm font-black outline-none focus:border-indigo-500 focus:bg-white transition-all" :style="{ color: priorityColor(form.priority) }">
                      <option value="LOW">BIASA (LOW)</option>
                      <option value="MEDIUM">MENENGAH (MEDIUM)</option>
                      <option value="HIGH">TINGGI (HIGH)</option>
                      <option value="URGENT">DARURAT (URGENT)</option>
                    </select>
                  </div>
               </div>

               <div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-6">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Pelaksanaan</label>
                    <input type="date" v-model="form.scheduledDate" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Teknisi / Mekanik Penanggung Jawab</label>
                    <input type="text" v-model="form.mechanicName" placeholder="Contoh: Tim Workshop Alpha" class="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-slate-50 text-sm font-black text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                  </div>
               </div>
            </div>
          </div>

          <!-- Sec 3: Finance & Resolution -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-rose-100">3</div>
               <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">Catatan Kerusakan & Resolusi</h4>
            </div>

            <div class="bg-slate-900 border-t-8 border-t-rose-500 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden group">
               <div class="absolute right-0 top-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                  <i class="pi pi-wallet text-7xl"></i>
               </div>
               <p class="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-4">Estimasi / Biaya Aktual Perawatan (IDR)</p>
               <div class="flex items-center gap-3">
                 <span class="text-xs font-black opacity-40 italic">NOMINAL RP</span>
                 <input type="number" v-model="form.costAmount" class="bg-transparent border-none text-4xl font-black text-white focus:ring-0 outline-none w-full tabular-nums" />
               </div>
               <p class="text-[9px] font-bold opacity-30 mt-4 italic">*Input biaya sparepart, jasa, atau biaya tak terduga lainnya.</p>
            </div>

            <div class="space-y-6">
               <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Deskripsi Masalah / Indikasi Kerusakan</label>
                  <textarea v-model="form.issueDescription" rows="3" class="w-full p-8 rounded-[2.5rem] bg-white border-2 border-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 transition-all shadow-sm" placeholder="Tuliskan keluhan pengguna atau hasil temuan inspeksi..."></textarea>
               </div>
               <div class="space-y-2" v-if="form.status === 'COMPLETED' || form.status === 'IN_PROGRESS'">
                  <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1 italic">Hasil Pemeriksaan / Tindakan Resolusi</label>
                  <textarea v-model="form.resolutionNotes" rows="3" class="w-full p-8 rounded-[2.5rem] bg-indigo-950 border-2 border-indigo-900 text-sm font-bold text-indigo-100 outline-none focus:border-indigo-500 transition-all shadow-xl" placeholder="Catat komponen yang diganti atau solusi yang telah diterapkan..."></textarea>
               </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8 border-t border-slate-100 bg-white flex justify-end gap-3 relative z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
           <Button label="Batalkan" severity="secondary" text @click="dialogOpen = false" class="h-14 px-8 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600" />
           <Button :label="editingId ? 'Simpan Log WO' : 'Dispatch Order (Kirim)'" icon="pi pi-check" :loading="saving" :disabled="!form.issueDescription" @click="save"
             class="h-14 px-10 rounded-[1.25rem] bg-slate-800 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all" />
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

const canRead = auth.hasPermission('rental.maintenance.read') || true;
const canManage = auth.hasPermission('rental.maintenance.manage') || true;

const q = ref('');
const statusFilter = ref('');
const loading = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const logs = ref<any[]>([]);
const summary = ref<any>({});
const contracts = ref<any[]>([]);
const assets = ref<any[]>([]);

const form = ref({
  ticketNo: '',
  contractId: '',
  assetId: '',
  type: 'REPAIR',
  priority: 'LOW',
  status: 'SCHEDULED',
  scheduledDate: '',
  costAmount: 0,
  mechanicName: '',
  issueDescription: '',
  resolutionNotes: '',
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
function formatCurrency(num: any) {
  if (!num) return 'Rp 0';
  if (num >= 1000000) return `Rp ${(num/1000000).toFixed(1)} M`;
  return `Rp ${Number(num).toLocaleString('id-ID')}`;
}

const priorityColor = (pri: string) => {
   if (pri === 'URGENT') return '#e11d48'; // rose
   if (pri === 'HIGH') return '#ea580c'; // orange
   if (pri === 'MEDIUM') return '#ca8a04'; // yellow
   return '#64748b'; // low / slate
};

function badgeStyle(status: string) {
  const map: Record<string, any> = {
    COMPLETED: { backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    SCHEDULED: { backgroundColor: '#f8fafc', color: '#475569', borderColor: '#cbd5e1' },
    IN_PROGRESS: { backgroundColor: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' },
    CANCELLED: { backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' }
  };
  return map[status] || map['SCHEDULED'];
}

const STATUS_LABEL_MAP: Record<string, string> = {
  SCHEDULED: 'TERJADWAL',
  IN_PROGRESS: 'DIKERJAKAN',
  COMPLETED: 'SELESAI',
  CANCELLED: 'DIBATALKAN',
};
const getStatusLabel = (s: string) => STATUS_LABEL_MAP[s] || s;

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    if (statusFilter.value) params.status = statusFilter.value;
    const { data } = await api.get('/rental/maintenance', { params });
    logs.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    showMsg(error, e.message);
  } finally {
    loading.value = false;
  }
}

async function loadLookups() {
  try {
    const { data } = await api.get('/rental/maintenance/lookups'); 
    contracts.value = data.data?.contracts || [];
    assets.value = data.data?.assets || [];
  } catch (e) {}
}

function openCreate() {
  editingId.value = null;
  form.value = {
     ticketNo: '', contractId: '', assetId: '', type: 'REPAIR', priority: 'LOW',
     status: 'SCHEDULED', scheduledDate: new Date().toISOString().slice(0, 10), 
     costAmount: 0, mechanicName: '', issueDescription: '', resolutionNotes: ''
  };
  if (contracts.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

function openEdit(t: any) {
  editingId.value = t.id;
  form.value = {
    ticketNo: t.ticketNo || '',
    contractId: t.contractId || '',
    assetId: t.assetId || '',
    type: t.type || 'REPAIR',
    priority: t.priority || 'LOW',
    status: t.status || 'SCHEDULED',
    scheduledDate: t.scheduledDate?.slice(0, 10) || '',
    costAmount: parseFloat(t.costAmount || '0'),
    mechanicName: t.mechanicName || '',
    issueDescription: t.issueDescription || '',
    resolutionNotes: t.resolutionNotes || '',
  };
  if (contracts.value.length === 0) loadLookups();
  dialogOpen.value = true;
}

async function save() {
  saving.value = true;
  try {
    const payload: any = { ...form.value, costAmount: Number(form.value.costAmount) };
    if (!payload.ticketNo) delete payload.ticketNo;
    if (!payload.contractId) delete payload.contractId;
    if (!payload.assetId) delete payload.assetId;

    if (editingId.value) {
      await api.patch(`/rental/maintenance/${editingId.value}`, payload);
      showMsg(success, 'Log Maintenance berhasil diperbarui!');
    } else {
      await api.post('/rental/maintenance', payload);
      showMsg(success, 'Perintah Kerja (WO) berhasil diterbitkan!');
    }
    dialogOpen.value = false;
    load();
  } catch (e: any) {
    showMsg(error, e.response?.data?.message || 'Gagal menyimpan Work Order');
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
