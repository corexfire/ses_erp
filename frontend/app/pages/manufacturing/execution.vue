<template>
  <div class="space-y-4 font-sans text-slate-900 custom-scrollbar overflow-x-hidden">

    <!-- Header (Premium Shop Floor Operations Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0 animate-fade-in-up">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-100 font-sans">Shop Floor Center</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Eksekusi Manufaktur</span>
          </div>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Shop Floor <span class="text-emerald-600 not-italic text-xl md:text-2xl lg:text-3xl">Operations</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-emerald-900/60 leading-relaxed mt-3">Pusat kendali eksekusi lantai produksi: Registrasikan pengeluaran bahan baku, penerimaan produk jadi, dan audit kualitas secara real-time untuk transparansi operasional.</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex flex-wrap items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 mr-2">
             <button v-for="t in (['issues', 'receipts', 'qc'] as const)" :key="t" @click="activeTab = t"
               :class="activeTab === t ? 'bg-white text-emerald-700 shadow-md scale-105 border-emerald-100' : 'bg-transparent text-slate-400 border-transparent hover:text-slate-600'"
               class="px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border outline-none">
               {{ t === 'issues' ? 'Bahan' : t === 'receipts' ? 'Produk' : 'QC' }}
             </button>
          </div>
          <Button label="+ Registrasi Operasi" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Shop Floor Telemetry Dashboard (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-emerald-950 text-white shadow-xl flex flex-col justify-between border border-emerald-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 opacity-80">Total Pengeluaran Bahan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">{{ issues.length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-arrow-right-arrow-left text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Pending Audit Kualitas</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ qcs.filter(x => x.status === 'PENDING').length }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-search text-lg"></i></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Rasio Lulus (Yield)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-700 tracking-tighter leading-none">
             {{ qcs.length > 0 ? (qcs.filter(q => q.status === 'PASSED').length / qcs.length * 100).toFixed(0) : '0' }}<span class="text-sm md:text-lg lg:text-xl ml-1 font-black">%</span>
          </h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 transition-all hover:rotate-12"><i class="pi pi-verified text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-emerald-100 tracking-[0.2em] mb-4 opacity-80">Sistem Operasi Aktif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase">High <span class="text-emerald-300 italic">Security</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-bolt text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Shop Floor Execution Audit Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6">
              <i :class="activeTab === 'issues' ? 'pi pi-arrow-right-arrow-left' : activeTab === 'receipts' ? 'pi pi-inbox' : 'pi pi-check-square'" class="text-xl"></i>
           </div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger {{ tabLabel }}</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Operations Tracking Record</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="searchQ" placeholder="Cari Kode Eksekusi..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-emerald-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Ledger Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          
          <!-- Issues Header -->
          <thead v-if="activeTab === 'issues'" class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Identitas Eksekusi</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Referensi WO</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Waktu & Shift</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Ledger</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>

          <!-- Receipts Header -->
          <thead v-else-if="activeTab === 'receipts'" class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Identitas Eksekusi</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Luaran (Good)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">BS / Reject</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Ledger</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>

          <!-- QC Header -->
          <thead v-else class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Work Order</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-right">Lulus QC</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Indikator Mutu</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Disposisi Audit</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Status</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-emerald-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Sinkronisasi armada operasional...</div>
              </td>
            </tr>
            
            <!-- Issues Rows -->
            <template v-if="activeTab === 'issues' && !loading">
              <tr v-for="item in filteredIssues" :key="item.id" @click="openDetail(item, 'issue')" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-emerald-400 cursor-pointer">
                <td class="px-8 py-6 align-middle">
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                         <i class="pi pi-arrow-right-arrow-left text-lg"></i>
                      </div>
                      <div>
                         <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-emerald-700 transition-colors uppercase">{{ item.code }}</div>
                         <div class="mt-1 font-black text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">LOGISTIK PRODUKSI</div>
                      </div>
                   </div>
                </td>
                <td class="px-6 py-6 border-l border-slate-50 align-middle font-mono text-[11px] font-black text-slate-700 uppercase">{{ item.workOrder?.code || '—' }}</td>
                <td class="px-6 py-6 border-l border-slate-50 align-middle text-center">
                  <p class="text-[11px] font-black text-slate-800 uppercase">{{ fmtDate(item.issueDate) }}</p>
                  <span v-if="item.shiftNo" class="text-[8px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded uppercase tracking-widest border border-emerald-100 mt-1 inline-block">SHIFT {{ item.shiftNo }}</span>
                </td>
                <td class="px-6 py-6 border-l border-slate-50 align-middle text-center bg-slate-50/30 group-hover:bg-slate-100/50">
                   <span :class="item.status === 'POSTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'" 
                         class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border uppercase shadow-sm group-hover:scale-105 transition-all">
                       <i :class="item.status === 'POSTED' ? 'pi pi-check-circle animate-pulse' : 'pi pi-clock'" class="text-[7px] mr-2"></i> {{ item.status }}
                   </span>
                </td>
                <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                   <Button label="Audit Operasi" severity="secondary" rounded outlined class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100" />
                </td>
              </tr>
            </template>

            <!-- Receipts Rows -->
            <template v-else-if="activeTab === 'receipts' && !loading">
              <tr v-for="r in filteredReceipts" :key="r.id" @click="openDetail(r, 'receipt')" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-emerald-400 cursor-pointer">
                <td class="px-8 py-6 align-middle">
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                         <i class="pi pi-inbox text-lg"></i>
                      </div>
                      <div>
                         <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-emerald-700 transition-colors uppercase">{{ r.code }}</div>
                         <div class="mt-1 font-black text-[10px] text-slate-400 uppercase tracking-widest">{{ fmtDate(r.receiptDate) }}</div>
                      </div>
                   </div>
                </td>
                <td class="px-6 py-6 border-l border-slate-50 align-middle text-right font-mono text-xl font-black text-emerald-700">
                  {{ Number(r.qtyProduced).toLocaleString() }} <span class="text-[9px] text-slate-400">{{ r.uomCode || 'PCS' }}</span>
                </td>
                <td class="px-6 py-6 border-l border-slate-50 align-middle text-right font-mono text-lg font-black" :class="Number(r.qtyRejected) > 0 ? 'text-rose-600' : 'text-slate-300'">
                  {{ Number(r.qtyRejected).toLocaleString() }}
                </td>
                <td class="px-6 py-6 border-l border-slate-50 align-middle text-center bg-slate-50/30 group-hover:bg-slate-100/50">
                   <span :class="r.status === 'POSTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'" 
                         class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border uppercase shadow-sm">
                       <i :class="r.status === 'POSTED' ? 'pi pi-check-circle animate-pulse' : 'pi pi-clock'" class="text-[7px] mr-2"></i> {{ r.status }}
                   </span>
                </td>
                <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                   <Button label="Audit Operasi" severity="secondary" rounded outlined class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100" />
                </td>
              </tr>
            </template>

            <!-- QC Rows -->
            <template v-else-if="activeTab === 'qc' && !loading">
              <tr v-for="qc in qcs" :key="qc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-emerald-400">
                <td class="px-8 py-6 align-middle">
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                         <i class="pi pi-check-square text-lg"></i>
                      </div>
                      <div>
                         <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-emerald-700 transition-colors uppercase">{{ qc.workOrder?.code || '—' }}</div>
                         <div class="mt-1 font-black text-[10px] text-slate-400 uppercase tracking-widest">{{ fmtDate(qc.qcDate) }}</div>
                      </div>
                   </div>
                </td>
                <td class="px-6 py-6 border-l border-slate-50 align-middle text-right font-mono text-xl font-black text-emerald-700">
                  {{ Number(qc.qtyPassed).toLocaleString() }}
                </td>
                <td class="px-6 py-6 border-l border-slate-50 align-middle">
                  <div class="flex items-center gap-3 justify-center">
                    <div class="h-1 w-24 bg-slate-100 rounded-full overflow-hidden flex">
                       <div class="h-full shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-1000" :style="{ width: passRate(qc) + '%' }" :class="passRate(qc) >= 95 ? 'bg-emerald-500' : 'bg-rose-500'"></div>
                    </div>
                    <span class="text-[10px] font-black text-slate-500">{{ passRate(qc) }}%</span>
                  </div>
                </td>
                <td class="px-6 py-6 border-l border-slate-50 align-middle text-center">
                  <span :class="dispositionBadge(qc.disposition)" class="rounded-xl border px-3 py-1 text-[8px] font-black uppercase tracking-widest shadow-sm">{{ qc.disposition || 'PENDING' }}</span>
                </td>
                <td class="px-10 py-6 text-right border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50">
                  <span :class="qcStatusBadge(qc.status)" class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[9px] font-black uppercase tracking-widest shadow-sm">
                    <span :class="qcStatusDot(qc.status)" class="h-2 w-2 rounded-full animate-pulse" />
                    {{ qc.status }}
                  </span>
                </td>
              </tr>
            </template>

            <tr v-if="!loading && (activeTab === 'issues' ? filteredIssues.length === 0 : (activeTab === 'receipts' ? filteredReceipts.length === 0 : qcs.length === 0))">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🏭</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Data eksekusi tidak ditemukan atau belum ada aktivitas operasional.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Execution Registry (Universal Centered Dialog) Style Alignment -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900 shadow-[0_0_50px_rgba(5,150,105,0.2)]">
        
        <!-- Registry Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div :class="activeTab === 'issues' ? 'bg-slate-900' : activeTab === 'receipts' ? 'bg-emerald-600' : 'bg-indigo-600'" 
                 class="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i :class="activeTab === 'issues' ? 'pi pi-arrow-right-arrow-left' : activeTab === 'receipts' ? 'pi pi-inbox' : 'pi pi-check-square'" class="text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Registry <span class="text-emerald-600 not-italic text-2xl">Shop Floor</span></h3>
                 <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm bg-emerald-50 text-emerald-700 border-emerald-200">
                    REGISTRASI AKTIF: {{ tabLabel.toUpperCase() }}
                 </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Execution Governance & Operational Audit Registry</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="closeDialog" class="relative z-10 hover:bg-emerald-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel I: Parameter Identitas -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-shield text-emerald-500"></i> I. Identitas Operasional
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 hover:border-emerald-100 transition-all min-h-[500px]">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Kode Registrasi Eksekusi</label>
                       <InputText v-model="form.code" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black uppercase tracking-widest text-slate-900 shadow-inner focus:ring-4 focus:ring-emerald-400 font-mono" placeholder="OTOMATIS" />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 text-emerald-600 italic">Work Order Induk</label>
                       <select v-model="form.workOrderId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-tight">
                          <option value="">-- PILIH WO --</option>
                          <option v-for="wo in workOrders" :key="wo.id" :value="wo.id">{{ wo.code }} · {{ wo.finishedGood?.name }}</option>
                       </select>
                    </div>

                    <div class="space-y-4 pt-4 border-t border-slate-50">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 text-indigo-600">Integrasi Jurnal Operasional</label>
                       <div class="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 text-[9px] font-bold text-slate-400 uppercase leading-relaxed italic">Sistem akan otomatis mencatat biaya standar dan realisasi penggunaan bahan baku ke dalam buku besar produksi secara real-time.</div>
                    </div>
                 </div>
              </div>

              <!-- Panel II: Metrik & Teknis -->
              <div class="lg:col-span-4 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-cog text-amber-500"></i> II. Metrik Teknis & Output
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 hover:border-amber-100 transition-all border-b-[8px] border-b-emerald-600 min-h-[500px]">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Shift Operasional</label>
                       <select v-model="form.shiftNo" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                          <option value="">-- TANPA SHIFT --</option>
                          <option value="1">SHIFT 1 (PAGI)</option>
                          <option value="2">SHIFT 2 (SIANG)</option>
                          <option value="3">SHIFT 3 (MALAM)</option>
                       </select>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Eksekusi</label>
                       <InputText v-model="form.date" type="date" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all uppercase" />
                    </div>

                    <!-- Contextual Metrik -->
                    <div v-if="activeTab === 'receipts'" class="grid grid-cols-2 gap-4">
                       <div class="space-y-4 text-center">
                           <label class="text-[8px] font-black text-slate-400 uppercase tracking-widest">GOOD QTY</label>
                           <InputText v-model="form.qtyProduced" type="number" class="w-full h-16 bg-slate-900 text-emerald-400 border-none rounded-2xl px-4 text-2xl font-black font-mono shadow-xl text-center" />
                       </div>
                       <div class="space-y-4 text-center">
                           <label class="text-[8px] font-black text-rose-500 uppercase tracking-widest">REJECT QTY</label>
                           <InputText v-model="form.qtyRejected" type="number" class="w-full h-16 bg-slate-50 text-rose-700 border-none rounded-2xl px-4 text-2xl font-black font-mono shadow-inner text-center" />
                       </div>
                    </div>

                    <div v-if="activeTab === 'qc'" class="bg-slate-900 p-6 rounded-2xl shadow-xl">
                       <div class="flex items-center gap-2 mb-4">
                          <span class="text-[8px] font-black text-emerald-500 uppercase tracking-widest italic">Live Quality Audit Meter</span>
                       </div>
                       <div class="grid grid-cols-2 gap-3">
                          <input v-model="form.qtyPassed" type="number" class="bg-white/5 border-none rounded-xl text-2xl font-black text-emerald-400 p-2 text-center font-mono outline-none" placeholder="LULUS" />
                          <input v-model="form.qtyFailed" type="number" class="bg-white/5 border-none rounded-xl text-2xl font-black text-rose-500 p-2 text-center font-mono outline-none" placeholder="BS" />
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel III: Item Registry / Audit Notes -->
              <div class="lg:col-span-4 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between">
                    <span class="flex items-center gap-2"><i :class="activeTab === 'issues' ? 'pi pi-box text-indigo-500' : 'pi pi-info-circle text-amber-500'"></i> III. {{ activeTab === 'issues' ? 'Registry Item' : 'Observasi Audit' }}</span>
                    <Button v-if="activeTab === 'issues'" label="+ ITEM" @click="addItem" class="px-2 py-1 bg-emerald-100 text-emerald-700 border-none text-[8px] font-black rounded hover:bg-emerald-200" />
                 </div>
                 
                 <!-- Issue Panel -->
                 <div v-if="activeTab === 'issues'" class="bg-indigo-950 p-0 rounded-[2.5rem] shadow-2xl border-4 border-indigo-900 relative overflow-hidden flex flex-col min-h-[500px]">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-30"></div>
                    <div class="p-8 pb-4 shrink-0 relative z-10">
                       <div class="flex items-center justify-between mb-2">
                          <h4 class="text-xl font-black text-white uppercase tracking-tight italic">Material <span class="text-emerald-500 not-italic">Lines</span></h4>
                          <span class="px-2 py-0.5 bg-white/10 rounded-lg text-[8px] font-black text-white uppercase tracking-widest">{{ form.items.length }} SKU</span>
                       </div>
                    </div>
                    <div class="flex-1 overflow-y-auto custom-scrollbar px-8">
                       <div class="space-y-4 pb-8">
                          <div v-for="(it, idx) in form.items" :key="idx" class="bg-white/5 rounded-[1.5rem] p-5 border border-white/10 group/line">
                             <div class="flex justify-between items-start mb-4">
                                <select v-model="it.itemId" class="bg-transparent border-none text-[11px] font-black text-emerald-400 uppercase tracking-tight focus:ring-0 appearance-none cursor-pointer w-full">
                                   <option value="">-- MINTA ITEM --</option>
                                   <option v-for="opt in items" :key="opt.id" :value="opt.id">{{ opt.code }} · {{ opt.name }}</option>
                                </select>
                                <Button icon="pi pi-trash" @click="removeItem(idx)" class="h-6 w-6 bg-rose-500/10 text-rose-400 border-none rounded-full hover:bg-rose-500/20" />
                             </div>
                             <div class="flex items-center gap-4 bg-black/30 p-3 rounded-xl border border-white/5 font-mono">
                                <span class="text-[8px] font-black text-indigo-400 uppercase">VOL:</span>
                                <input v-model="it.qty" type="number" class="w-full bg-transparent border-none text-xs font-black text-white p-0 focus:ring-0 outline-none" />
                                <span class="text-[8px] font-black text-indigo-400 uppercase">UNIT:</span>
                                <input v-model="it.uomCode" class="w-12 bg-transparent border-none text-[10px] font-black text-white p-0 focus:ring-0 outline-none uppercase" placeholder="PCS" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <!-- Notes Panel for Receipt/QC -->
                 <div v-else class="bg-amber-50 p-8 rounded-[2.5rem] border-2 border-amber-100 shadow-sm space-y-6 min-h-[500px] flex flex-col">
                    <div class="flex-1">
                       <label class="text-[10px] font-black text-amber-700 uppercase tracking-widest px-1">Dokumentasi Observasi Lantai Produksi</label>
                       <textarea v-model="form.notes" rows="12" class="w-full mt-4 rounded-3xl border-none bg-white p-6 text-[11px] font-medium text-slate-700 outline-none shadow-sm" placeholder="Catat anomali proses, kendala mesin, atau temuan kualitas visual..."></textarea>
                    </div>
                    <div class="p-4 bg-white/60 rounded-2xl border border-amber-200">
                       <p class="text-[9px] font-black text-amber-800 uppercase italic leading-relaxed">Penyimpanan rekaman ini akan mengikat ledger traceability secara permanen dalam sistem.</p>
                    </div>
                 </div>
              </div>

           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-shield-check"></i> Audit Integritas Shop Floor Aktif
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batalkan Sesi" severity="secondary" text @click="closeDialog" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                label="Simpan Eksekusi Lantai Produksi" 
                icon="pi pi-save" 
                size="large" 
                :loading="saving"
                :disabled="saving || !form.code || !form.workOrderId"
                @click="save" 
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
const { $toast, $swal } = useNuxtApp();

// State
const loading = ref(false);
const saving = ref(false);
const activeTab = ref<'issues' | 'receipts' | 'qc'>('issues');
const issues = ref<any[]>([]);
const receipts = ref<any[]>([]);
const qcs = ref<any[]>([]);
const workOrders = ref<any[]>([]);
const items = ref<any[]>([]);
const searchQ = ref('');
const dialogOpen = ref(false);
const dialogError = ref<string | null>(null);

const form = reactive({
  code: '', workOrderId: '', date: new Date().toISOString().slice(0, 10),
  shiftNo: '', notes: '',
  // Receipt
  qtyProduced: '', qtyRejected: '0', uomCode: '', batchNo: '',
  // QC
  qtyInspected: '', qtyPassed: '', qtyFailed: '', disposition: 'PENDING',
  items: [] as { itemId: string; qty: string; uomCode: string }[]
});

// Computed
const tabLabel = computed(() => activeTab.value === 'issues' ? 'Bahan Produksi' : activeTab.value === 'receipts' ? 'Penerimaan Produk' : 'Hasil Audit Kualitas');

const filteredIssues = computed(() =>
  issues.value.filter(i => !searchQ.value || i.code?.toLowerCase().includes(searchQ.value.toLowerCase()))
);
const filteredReceipts = computed(() =>
  receipts.value.filter(r => !searchQ.value || r.code?.toLowerCase().includes(searchQ.value.toLowerCase()))
);

// Helpers
const fmtDate = (v: any) => {
  if (!v) return '—';
  const d = new Date(v);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};
const passRate = (qc: any) => {
  if (!qc.qtyInspected || Number(qc.qtyInspected) === 0) return 0;
  return Math.round((Number(qc.qtyPassed) / Number(qc.qtyInspected)) * 100);
};
const qcStatusBadge = (s: string) => ({
  PENDING: 'bg-slate-100 text-slate-600', IN_PROGRESS: 'bg-amber-100 text-amber-700',
  PASSED: 'bg-emerald-100 text-emerald-700', FAILED: 'bg-rose-100 text-rose-700'
}[s] || 'bg-slate-100 text-slate-600');
const qcStatusDot = (s: string) => ({
  PENDING: 'bg-slate-400', IN_PROGRESS: 'bg-amber-500', PASSED: 'bg-emerald-500', FAILED: 'bg-rose-500'
}[s] || 'bg-slate-400');
const dispositionBadge = (d: string) => ({
  PENDING: 'bg-slate-50 text-slate-500', ACCEPTED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  REJECTED: 'bg-rose-50 text-rose-700 border-rose-100', REWORK: 'bg-amber-50 text-amber-700 border-amber-100'
}[d] || 'bg-slate-50 text-slate-500');

// Load
const load = async () => {
  loading.value = true;
  try {
    const [iRes, rRes, qRes] = await Promise.all([
      api.get('/manufacturing/production/issues'),
      api.get('/manufacturing/production/receipts'),
      api.get('/manufacturing/production/qc'),
    ]);
    issues.value = iRes.data?.issues ?? [];
    receipts.value = rRes.data?.receipts ?? [];
    qcs.value = qRes.data?.qcs ?? [];
  } catch (e: any) {
    $toast.fire({ icon: 'error', title: e?.response?.data?.message ?? 'Gagal sinkronisasi data audit' });
  } finally {
    loading.value = false;
  }
};

const loadMasterData = async () => {
  const [woRes, itRes] = await Promise.all([
    api.get('/manufacturing/work-orders', { params: { status: '' } }),
    api.get('/inventory/items', { params: { take: 300 } }),
  ]);
  workOrders.value = woRes.data?.workOrders ?? [];
  items.value = itRes.data?.items ?? [];
};

const addItem = () => form.items.push({ itemId: '', qty: '1', uomCode: '' });
const removeItem = (i: number) => form.items.splice(i, 1);

const openCreate = async () => {
  form.code = ''; form.workOrderId = ''; form.date = new Date().toISOString().slice(0, 10);
  form.shiftNo = ''; form.notes = ''; form.qtyProduced = ''; form.qtyRejected = '0';
  form.uomCode = ''; form.batchNo = ''; form.qtyInspected = ''; form.qtyPassed = '';
  form.qtyFailed = ''; form.disposition = 'PENDING'; form.items = [];
  dialogError.value = null;
  await loadMasterData();
  dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const openDetail = (item: any, type: 'issue' | 'receipt') => {
   form.code = item.code;
   form.workOrderId = item.workOrderId;
   form.date = (item.issueDate || item.receiptDate || item.qcDate)?.split('T')[0] || new Date().toISOString().slice(0, 10);
   form.shiftNo = item.shiftNo?.toString() || '';
   form.notes = item.notes || '';
   form.qtyProduced = item.qtyProduced?.toString() || '';
   form.qtyRejected = item.qtyRejected?.toString() || '0';
   form.uomCode = item.uomCode || '';
   form.batchNo = item.batchNo || '';
   form.items = item.items?.map((it: any) => ({ itemId: it.itemId, qty: it.qty.toString(), uomCode: it.uomCode })) || [];
   
   activeTab.value = (type === 'issue' ? 'issues' : 'receipts');
   loadMasterData();
   dialogOpen.value = true;
};

const save = async () => {
  saving.value = true;
  try {
    if (activeTab.value === 'issues') {
      await api.post('/manufacturing/production/issues', {
        code: form.code, workOrderId: form.workOrderId,
        issueDate: form.date, notes: form.notes || undefined,
        shiftNo: form.shiftNo ? parseInt(form.shiftNo) : undefined,
        items: form.items.filter(it => it.itemId).map(it => ({
          itemId: it.itemId, qty: parseFloat(it.qty) || 0, uomCode: it.uomCode || undefined
        })),
      });
      $toast.fire({ icon: 'success', title: 'Registrasi Pengeluaran Bahan Berhasil' });
    } else if (activeTab.value === 'receipts') {
      await api.post('/manufacturing/production/receipts', {
        code: form.code, workOrderId: form.workOrderId,
        receiptDate: form.date, notes: form.notes || undefined,
        qtyProduced: parseFloat(form.qtyProduced) || 0,
        qtyRejected: parseFloat(form.qtyRejected) || 0,
        uomCode: form.uomCode || undefined,
        batchNo: form.batchNo || undefined,
        shiftNo: form.shiftNo ? parseInt(form.shiftNo) : undefined,
      });
      $toast.fire({ icon: 'success', title: 'Registrasi Penerimaan Produk Berhasil' });
    } else {
      await api.post('/manufacturing/production/qc', {
        workOrderId: form.workOrderId,
        qtyInspected: parseFloat(form.qtyInspected) || 0,
        qtyPassed: parseFloat(form.qtyPassed) || 0,
        qtyFailed: parseFloat(form.qtyFailed) || 0,
        disposition: form.disposition,
        notes: form.notes || undefined,
        qcDate: form.date,
      });
      $toast.fire({ icon: 'success', title: 'Audit Kualitas Berhasil Direkam' });
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    $toast.fire({ icon: 'error', title: e?.response?.data?.message ?? 'Gagal memproses registrasi' });
  } finally {
    saving.value = false;
  }
};

onMounted(load);
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

.custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

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

.fade-enter-active, .fade-leave-active { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(20px); }
</style>