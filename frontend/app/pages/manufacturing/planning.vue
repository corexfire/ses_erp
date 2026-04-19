<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6 space-y-4">
    
    <!-- Header (Premium Planning Command Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-indigo-100 italic">Material Requirements Planning</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600 font-mono tracking-tighter italic">MRP Control Panel</span>
          </div>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Planning <span class="text-indigo-600 not-italic text-xl md:text-2xl lg:text-3xl font-light">Command Center</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-indigo-900/60 leading-relaxed mt-3">Sistem sinkronisasi kebutuhan material terpadu. Analisis permintaan, optimasi stok, dan penjadwalan produksi presisi untuk menjamin ketersediaan rantai pasok manufaktur.</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="hidden items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm md:flex group/stats">
            <i class="pi pi-history text-indigo-500 group-hover/stats:rotate-180 transition-transform duration-700" />
            <span>{{ runs.length }} MRP SYNC RUNS LOGGED</span>
          </div>
          <Button
            icon="pi pi-play"
            label="JALANKAN MRP"
            class="h-14 px-8 bg-slate-900 border-none text-white font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all rounded-xl disabled:opacity-50"
            :loading="running"
            @click="openRunDialog"
          />
        </div>
      </div>
    </div>

    <!-- Planning Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
      <div v-for="stat in stats" :key="stat.label" class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 opacity-80 group-hover:text-indigo-400 transition-colors">{{ stat.label }}</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter leading-none">{{ stat.value }}</h3>
          <div :class="`p-3 ${stat.color} text-white rounded-xl shadow-lg shadow-indigo-100 group-hover:rotate-12 transition-transform`">
            <i :class="`pi ${stat.icon} text-lg`"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Planning Command Ledger (3-Panel Architecture Style) -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 flex-1 overflow-hidden">

      <!-- LEFT: MRP Run Sync Logs -->
      <div class="lg:col-span-1 flex flex-col min-w-0 h-full">
        <div class="rounded-[2.5rem] bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full group">
          <div class="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h2 class="text-sm font-black text-slate-800 uppercase tracking-widest italic">Sync Logs</h2>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Riwayat Kalkulasi MRP</p>
            </div>
            <div class="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
              <i class="pi pi-history"></i>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            <div v-if="loading" class="flex flex-col items-center py-12 gap-4">
              <i class="pi pi-spinner pi-spin text-4xl text-indigo-500 opacity-20"></i>
              <span class="text-[10px] font-black uppercase text-slate-400 tracking-widest animate-pulse">Sinkronisasi Data...</span>
            </div>
            <div v-else-if="runs.length === 0" class="flex flex-col items-center py-20 text-center space-y-6">
              <div class="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300 relative overflow-hidden group-hover:bg-indigo-50 transition-colors">
                <i class="pi pi-inbox text-4xl"></i>
              </div>
              <div>
                <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Data Kosong</p>
                <button class="mt-4 px-6 py-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl shadow-indigo-100" @click="openRunDialog">Identifikasi Demand</button>
              </div>
            </div>
            <div v-else class="space-y-3">
              <button
                v-for="r in runs"
                :key="r.id"
                :class="selectedRunId === r.id ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 -translate-y-1' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'"
                class="w-full p-6 rounded-[2rem] text-left transition-all duration-500 relative overflow-hidden group/run"
                @click="selectRun(r)"
              >
                <div v-if="selectedRunId === r.id" class="absolute right-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                
                <div class="flex items-center justify-between mb-4 relative z-10">
                  <div class="flex items-center gap-4">
                    <div :class="selectedRunId === r.id ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'" class="h-12 w-12 rounded-[1.2rem] flex items-center justify-center transition-colors">
                      <i :class="r.status === 'COMPLETED' ? 'pi-check' : 'pi-clock'" class="text-xl"></i>
                    </div>
                    <div>
                      <p :class="selectedRunId === r.id ? 'text-white' : 'text-slate-800'" class="text-xs font-black uppercase tracking-widest italic">{{ fmtDate(r.runDate) }}</p>
                      <p :class="selectedRunId === r.id ? 'text-indigo-100' : 'text-slate-400'" class="text-[10px] font-bold uppercase tracking-tighter mt-1">{{ r.planType || 'STANDARD' }} · {{ r.demandSource || 'DEMAND' }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span :class="selectedRunId === r.id ? 'bg-white/20 text-white border-white/30' : 'bg-slate-50 text-slate-500 border-slate-100'" class="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border">
                      {{ r.status }}
                    </span>
                  </div>
                </div>
                
                <div v-if="r.periodStart" class="flex items-center gap-3 relative z-10">
                   <div :class="selectedRunId === r.id ? 'bg-white/10' : 'bg-slate-50'" class="px-4 py-2 rounded-2xl flex items-center gap-3 flex-1">
                      <i class="pi pi-calendar text-xs opacity-50"></i>
                      <span class="text-[9px] font-bold uppercase tracking-widest">{{ fmtDate(r.periodStart) }} → {{ fmtDate(r.periodEnd) }}</span>
                   </div>
                   <div :class="selectedRunId === r.id ? 'bg-white/20' : 'bg-indigo-50 text-indigo-700'" class="px-4 py-2 rounded-2xl text-[9px] font-black">
                      {{ r.suggestions?.length || 0 }} ITEMS
                   </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Suggestions Matrix detail -->
      <div class="lg:col-span-2 flex flex-col min-w-0 h-full">
        <div class="rounded-[2.5rem] bg-indigo-900 border border-slate-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col h-full relative group">
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-800/20 to-transparent pointer-events-none"></div>
          
          <div class="p-8 border-b border-indigo-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <h2 class="text-sm font-black text-white uppercase tracking-widest italic">Planning Suggestions</h2>
              <div v-if="selectedRun" class="flex items-center gap-3 mt-2 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                <span class="px-3 py-1 bg-indigo-800 rounded-full border border-indigo-700 font-mono tracking-tighter">{{ selectedRun.id.slice(0,8) }}</span>
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>{{ filteredSuggestions.length }} Matrix Points Calculated</span>
              </div>
              <p v-else class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-2">Pilih log sinkronisasi untuk melihat detail matrix</p>
            </div>
            
            <div class="flex items-center gap-4">
               <div class="relative group/select">
                  <i class="pi pi-filter absolute left-5 top-1/2 -translate-y-1/2 text-indigo-400 text-xs transition-colors group-hover/select:text-indigo-300"></i>
                  <select v-model="suggestionFilter" class="h-12 w-48 bg-indigo-950/50 border border-indigo-800 rounded-2xl pl-12 pr-6 text-[10px] font-black uppercase tracking-widest text-indigo-100 outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer">
                    <option value="">Semua Tipe</option>
                    <option value="PURCHASE">Purchase Order</option>
                    <option value="MANUFACTURE">Work Order</option>
                    <option value="TRANSFER">Transfer Stock</option>
                  </select>
               </div>
               <div class="relative group/select">
                  <select v-model="statusFilter" class="h-12 w-40 bg-indigo-950/50 border border-indigo-800 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest text-indigo-100 outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer">
                    <option value="">Status: Semua</option>
                    <option value="OPEN">Open Sync</option>
                    <option value="CONVERTED">Closed Sync</option>
                  </select>
               </div>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6 relative z-10">
            <div v-if="!selectedRunId" class="flex flex-col items-center py-32 text-center">
              <div class="w-32 h-32 rounded-[3rem] bg-indigo-950/50 flex items-center justify-center text-indigo-800 mb-8 border border-indigo-900 animate-pulse">
                <i class="pi pi-database text-6xl"></i>
              </div>
              <div>
                <p class="text-[10px] font-black uppercase text-indigo-400 tracking-[0.4em]">Matrix Synchronization Pending</p>
                <p class="text-xs text-indigo-500/60 mt-4 max-w-sm font-medium">Silakan pilih salah satu MRP Run Log di bilah kiri untuk mengaktifkan sinkronisasi matrix kebutuhan material.</p>
              </div>
            </div>

            <div v-else-if="loadingSuggestions" class="flex flex-col items-center py-32 gap-6">
              <i class="pi pi-spinner pi-spin text-6xl text-indigo-500"></i>
              <span class="text-[10px] font-black uppercase text-indigo-400 tracking-[0.5em] animate-pulse">Processing Planning Matrix...</span>
            </div>

            <div v-else-if="filteredSuggestions.length === 0" class="flex flex-col items-center py-32 text-indigo-500">
              <i class="pi pi-search text-6xl opacity-20 mb-6"></i>
              <p class="text-[10px] font-black uppercase tracking-widest italic opacity-50">Matrix Point Not Found</p>
            </div>

            <div v-else class="space-y-6">
              <div
                v-for="s in filteredSuggestions"
                :key="s.id"
                class="group/item relative bg-indigo-950/30 border border-indigo-800/50 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-indigo-950/50 hover:border-indigo-500/50 hover:-translate-y-1 animate-scale-in"
              >
                <!-- Badge corner background decor -->
                <div class="absolute right-[5%] bottom-[-10px] text-indigo-900/10 text-9xl font-black italic pointer-events-none select-none uppercase tracking-tighter">{{ s.suggestionType.slice(0,3) }}</div>

                <div class="flex flex-col xl:flex-row gap-8 relative z-10">
                  <!-- Product Identity & Status -->
                  <div class="xl:w-80 space-y-4 shrink-0">
                    <div class="flex items-center gap-3">
                       <span :class="suggestionTypeBadge(s.suggestionType)" class="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest shadow-2xl">
                         <i :class="suggestionTypeIcon(s.suggestionType)" class="text-[10px]"></i>
                         {{ s.suggestionType }}
                       </span>
                       <span :class="statusBadge(s.status)" class="text-[9px] font-black uppercase tracking-widest border shadow-xl">
                         {{ s.status }}
                       </span>
                    </div>
                    
                    <div>
                       <h3 class="text-xl font-black text-white italic tracking-tight uppercase leading-none">{{ s.item?.code }}</h3>
                       <p class="text-[11px] font-bold text-indigo-300/60 uppercase tracking-widest mt-2 line-clamp-2 leading-relaxed">{{ s.item?.name }}</p>
                    </div>

                    <div class="flex items-center gap-3">
                       <div class="h-10 w-10 rounded-xl bg-indigo-900/50 border border-indigo-800 flex items-center justify-center text-indigo-400">
                          <i class="pi pi-map-marker"></i>
                       </div>
                       <div class="text-[10px] font-black uppercase tracking-widest text-indigo-300">
                          WC: {{ s.workCenter || 'STOCK' }}
                       </div>
                    </div>
                  </div>

                  <!-- Telemetry Matrix -->
                  <div class="flex-1 min-w-0">
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                       <div class="p-5 rounded-3xl bg-indigo-900/40 border border-indigo-800/50 flex flex-col justify-between group-hover/item:border-indigo-700/50 transition-colors">
                          <span class="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-3">Qty Required</span>
                          <span class="text-2xl font-black text-white font-mono tracking-tighter italic">{{ Number(s.qtyRequired).toLocaleString() }}</span>
                          <span class="text-[10px] font-bold text-indigo-400 font-mono mt-1 uppercase">{{ s.uomCode || 'UNITS' }}</span>
                       </div>
                       <div class="p-5 rounded-3xl bg-indigo-900/40 border border-indigo-800/50 flex flex-col justify-between group-hover/item:border-indigo-700/50 transition-colors">
                          <span class="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-3">On Hand</span>
                          <span :class="Number(s.qtyOnHand) < Number(s.qtyRequired) ? 'text-rose-400' : 'text-emerald-400'" class="text-2xl font-black font-mono tracking-tighter italic">{{ Number(s.qtyOnHand).toLocaleString() }}</span>
                       </div>
                       <div class="p-5 rounded-3xl bg-indigo-900/40 border border-indigo-800/50 flex flex-col justify-between group-hover/item:border-indigo-700/50 transition-colors">
                          <span class="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-3">On Order</span>
                          <span class="text-2xl font-black text-white font-mono tracking-tighter italic">{{ Number(s.qtyOnOrder).toLocaleString() }}</span>
                       </div>
                       <div class="p-5 rounded-[1.8rem] bg-indigo-600 border border-indigo-500 flex flex-col justify-between shadow-[0_15px_30px_-5px_rgba(79,70,229,0.3)]">
                          <span class="text-[9px] font-black text-indigo-100 uppercase tracking-widest mb-3">Suggested</span>
                          <span class="text-2xl font-black text-white font-mono tracking-tighter italic">{{ Number(s.qtySuggested).toLocaleString() }}</span>
                       </div>
                    </div>

                    <!-- Additional Details & Actions -->
                    <div class="mt-6 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 border-t border-indigo-800/50 pt-6">
                       <div class="flex flex-wrap items-center gap-6">
                          <div v-if="s.dueDate" class="flex items-center gap-2">
                             <div class="p-2 rounded-lg bg-indigo-950/50 border border-indigo-800 text-indigo-400">
                                <i class="pi pi-calendar-clock text-xs"></i>
                             </div>
                             <div>
                                <p class="text-[8px] font-black text-indigo-500 uppercase">Due Sync Date</p>
                                <p :class="isOverdue(s.dueDate) ? 'text-rose-400' : 'text-indigo-200'" class="text-[10px] font-black uppercase tracking-widest italic">{{ fmtDate(s.dueDate) }}</p>
                             </div>
                          </div>
                          <div v-if="s.totalCost" class="flex items-center gap-2">
                             <div class="p-2 rounded-lg bg-indigo-950/50 border border-indigo-800 text-indigo-400">
                                <i class="pi pi-dollar text-xs"></i>
                             </div>
                             <div>
                                <p class="text-[8px] font-black text-indigo-500 uppercase">Estimated Value</p>
                                <p class="text-[10px] font-black text-white uppercase tracking-widest italic">Rp {{ Number(s.totalCost).toLocaleString('id-ID') }}</p>
                             </div>
                          </div>
                          <div class="flex items-center gap-2">
                             <div :class="priorityColor(s.priority)" class="h-6 w-12 rounded-full flex items-center justify-center text-[9px] font-black text-white uppercase italic">
                                P{{ s.priority || 50 }}
                             </div>
                          </div>
                       </div>

                       <div class="flex items-center gap-3">
                          <Button
                            v-if="s.suggestionType === 'PURCHASE' && s.status === 'OPEN'"
                            label="PROSES PO"
                            icon="pi pi-shopping-cart"
                            class="px-6 h-12 bg-white border-none text-slate-900 font-black text-[9px] uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                            @click="convertToPO(s)"
                          />
                          <Button
                            v-if="s.suggestionType === 'MANUFACTURE' && s.status === 'OPEN'"
                            label="PROSES WO"
                            icon="pi pi-cog"
                            class="px-6 h-12 bg-indigo-600 border-none text-white font-black text-[9px] uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-600/20"
                            @click="convertToWO(s)"
                          />
                          <button
                            class="w-12 h-12 rounded-2xl bg-indigo-950/50 border border-indigo-800 flex items-center justify-center text-indigo-400 hover:bg-rose-500 hover:border-rose-400 hover:text-white transition-all shadow-lg"
                            @click="closeSuggestion(s)"
                          >
                            <i class="pi pi-times text-xs"></i>
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Technical Hub Footer -->
          <div v-if="filteredSuggestions.length > 0" class="p-8 border-t border-indigo-800 bg-indigo-950/50 relative z-10">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                 <div class="h-10 w-10 rounded-xl bg-indigo-800/50 flex items-center justify-center text-indigo-300">
                    <i class="pi pi-wallet"></i>
                 </div>
                 <div>
                    <p class="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em]">Total Est. Matrix Purchase Value</p>
                    <p class="text-xl font-black text-white italic tracking-tighter">Rp {{ totalEstimatedCost }}</p>
                 </div>
              </div>
              <div class="flex items-center gap-2 px-4 py-2 bg-indigo-800/30 rounded-xl border border-indigo-700/50">
                 <i class="pi pi-info-circle text-indigo-500 text-xs"></i>
                 <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Kalkulasi berdasarkan suggestion tipe PURCHASE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MRP COMMAND CENTER (CENTERED DIALOG) -->
    <transition name="modal">
      <div v-if="runDialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <!-- Non-dismissible backdrop -->
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-xl transition-all duration-700"></div>
        
        <div class="relative z-10 w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-white/20 animate-scale-in border-b-[12px] border-b-indigo-900 shadow-[0_0_50px_rgba(49,46,129,0.2)]">
          <!-- Dialog Header -->
          <div class="px-10 py-8 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
            <div class="flex items-center gap-6">
              <div class="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
                <i class="pi pi-calculator text-2xl"></i>
              </div>
              <div>
                <h2 class="text-xl font-black text-slate-800 uppercase tracking-tight italic">MRP <span class="text-indigo-600 not-italic">Command Center</span></h2>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Konfigurasi Sinkronisasi Permintaan</p>
              </div>
            </div>
            <button @click="runDialogOpen = false" class="w-12 h-12 rounded-xl hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-all hover:rotate-90 group">
              <i class="pi pi-times text-lg group-hover:text-rose-500"></i>
            </button>
          </div>

          <div class="p-10 space-y-8">
            <div class="grid grid-cols-2 gap-8">
              <div class="space-y-3">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Sumber Permintaan <span class="text-rose-500">*</span></label>
                <div class="relative group">
                   <select v-model="runForm.demandSource" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[11px] font-black uppercase tracking-widest text-slate-800 outline-none focus:ring-4 focus:ring-indigo-100 transition-all appearance-none cursor-pointer">
                      <option value="SALES_ORDER">Sales Order (Pesanan)</option>
                      <option value="FORECAST">Forecast (Prediksi)</option>
                      <option value="MANUAL">Manual Input</option>
                      <option value="ALL">Semua Sumber</option>
                   </select>
                   <i class="pi pi-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors"></i>
                </div>
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Tipe Perencanaan <span class="text-rose-500">*</span></label>
                <div class="relative group">
                   <select v-model="runForm.planType" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[11px] font-black uppercase tracking-widest text-slate-800 outline-none focus:ring-4 focus:ring-indigo-100 transition-all appearance-none cursor-pointer">
                     <option value="STANDARD">Standard Plan</option>
                     <option value="REGENERATIVE">Regenerative (Penuh)</option>
                     <option value="NET_CHANGE">Net Change (Perubahan)</option>
                   </select>
                   <i class="pi pi-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors"></i>
                </div>
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Horizon Perencanaan (Hari)</label>
                <div class="relative">
                   <InputNumber v-model="runForm.planningHorizonDays" :min="1" :max="365" class="w-full" inputClass="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[11px] font-black text-indigo-700 outline-none focus:ring-4 focus:ring-indigo-100" />
                   <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-300 uppercase">HARI</span>
                </div>
              </div>
              <div class="space-y-3">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Periode Mulai</label>
                <input v-model="runForm.periodStart" type="date" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[11px] font-black uppercase text-indigo-700 outline-none focus:ring-4 focus:ring-indigo-100" />
              </div>
            </div>

            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Catatan Strategis</label>
              <InputText v-model="runForm.notes" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[11px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-100" placeholder="Masukkan catatan perencanaan (opsional)..." />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-50 pt-8">
              <div class="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group/toggle">
                 <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Include SO</span>
                 <Checkbox v-model="runForm.includeSalesOrder" :binary="true" />
              </div>
              <div class="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group/toggle">
                 <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Include Forecast</span>
                 <Checkbox v-model="runForm.includeForecast" :binary="true" />
              </div>
              <div class="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group/toggle">
                 <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Min Stock Check</span>
                 <Checkbox v-model="runForm.includeMinStock" :binary="true" />
              </div>
            </div>
          </div>

          <div class="px-10 py-8 bg-slate-50/50 flex items-center gap-4">
            <button class="flex-1 h-14 rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white hover:text-rose-500 transition-all" @click="runDialogOpen = false">Batalkan Protokol</button>
            <Button
              class="flex-[2] h-14 bg-indigo-600 border-none text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all"
              :loading="running"
              @click="runMrp"
              label="EKSEKUSI KALKULASI MRP"
            />
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
const api = useApi();
const { $toast, $swal } = useNuxtApp();

// State
const loading = ref(false);
const running = ref(false);
const loadingSuggestions = ref(false);
const runs = ref<any[]>([]);
const suggestions = ref<any[]>([]);
const selectedRunId = ref<string | null>(null);
const selectedRun = ref<any | null>(null);
const suggestionFilter = ref('');
const statusFilter = ref('');
const runDialogOpen = ref(false);

const runForm = reactive({
  demandSource: 'SALES_ORDER',
  planType: 'STANDARD',
  planningHorizonDays: 90,
  periodStart: '',
  notes: '',
  includeSalesOrder: true,
  includeForecast: false,
  includeMinStock: true,
});

// Computed
const filteredSuggestions = computed(() => {
  return suggestions.value
    .filter(s => !suggestionFilter.value || s.suggestionType === suggestionFilter.value)
    .filter(s => !statusFilter.value || s.status === statusFilter.value)
    .sort((a, b) => (b.priority || 50) - (a.priority || 50));
});

const totalEstimatedCost = computed(() => {
  const total = filteredSuggestions.value
    .filter(s => s.suggestionType === 'PURCHASE')
    .reduce((sum, s) => sum + (Number(s.totalCost) || 0), 0);
  return total.toLocaleString('id-ID');
});

const stats = computed(() => [
  { label: 'Total Matrix Points', value: suggestions.value.length, icon: 'pi-list', color: 'bg-indigo-500' },
  { label: 'Open Syncs', value: suggestions.value.filter(s => s.status === 'OPEN').length, icon: 'pi-clock', color: 'bg-amber-500' },
  { label: 'Critical Path', value: suggestions.value.filter(s => (s.priority || 50) >= 80).length, icon: 'pi-exclamation-circle', color: 'bg-rose-500' },
  { label: 'Matrix Converted', value: suggestions.value.filter(s => s.status === 'CONVERTED').length, icon: 'pi-check-circle', color: 'bg-indigo-600' },
]);

// Helpers
const fmtDate = (v: string | Date | null | undefined) => {
  if (!v) return '—';
  const d = new Date(v as string);
  if (isNaN(d.getTime())) return '—';
  return d.toISOString().slice(0, 10);
};

const isOverdue = (date: string) => new Date(date) < new Date();

const priorityColor = (p: number) => {
  if (!p || p < 40) return 'bg-slate-400';
  if (p < 60) return 'bg-blue-500';
  if (p < 80) return 'bg-amber-500';
  return 'bg-rose-500';
};

const suggestionTypeIcon = (type: string) => {
  if (type === 'PURCHASE') return 'pi-shopping-cart';
  if (type === 'MANUFACTURE') return 'pi-cog';
  return 'pi-arrows-h';
};

const suggestionTypeBadge = (type: string) => {
  if (type === 'PURCHASE') return 'inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-violet-700';
  if (type === 'MANUFACTURE') return 'inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-indigo-700';
  return 'inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-700';
};

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    OPEN: 'inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-amber-700 border-amber-200',
    CONVERTED: 'inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-indigo-700 border-indigo-200',
    CLOSED: 'inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-500 border-slate-200',
  };
  return map[status] || map.OPEN;
};

// Methods
const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/manufacturing/planning/runs');
    runs.value = res.data?.runs ?? [];
    if (runs.value.length > 0 && !selectedRunId.value) {
      await selectRun(runs.value[0]);
    }
  } catch (e: any) {
    $toast.fire({ icon: 'error', title: e?.response?.data?.message ?? 'Gagal memuat log sinkronisasi' });
  } finally {
    loading.value = false;
  }
};

const selectRun = async (r: any) => {
  selectedRunId.value = r.id;
  selectedRun.value = r;
  loadingSuggestions.value = true;
  suggestionFilter.value = '';
  statusFilter.value = '';
  try {
    const res = await api.get(`/manufacturing/planning/runs/${r.id}`);
    suggestions.value = res.data?.run?.suggestions ?? [];
  } catch (e: any) {
    $toast.fire({ icon: 'error', title: 'Gagal memproses matrix perencanaan' });
  } finally {
    loadingSuggestions.value = false;
  }
};

const openRunDialog = () => {
  runForm.demandSource = 'SALES_ORDER';
  runForm.planType = 'STANDARD';
  runForm.planningHorizonDays = 90;
  runForm.periodStart = new Date().toISOString().slice(0, 10);
  runForm.notes = '';
  runForm.includeSalesOrder = true;
  runForm.includeForecast = false;
  runForm.includeMinStock = true;
  runDialogOpen.value = true;
};

const runMrp = async () => {
  running.value = true;
  try {
    await api.post('/manufacturing/planning/run', {
      demandSource: runForm.demandSource,
      planType: runForm.planType,
      planningHorizonDays: runForm.planningHorizonDays,
      periodStart: runForm.periodStart || undefined,
      notes: runForm.notes || undefined,
      includeSalesOrder: runForm.includeSalesOrder,
      includeForecast: runForm.includeForecast,
      includeMinStock: runForm.includeMinStock,
    });
    $toast.fire({ icon: 'success', title: 'Sinkronisasi MRP Berhasil Dieksekusi!' });
    runDialogOpen.value = false;
    selectedRunId.value = null;
    selectedRun.value = null;
    suggestions.value = [];
    await load();
  } catch (e: any) {
    $toast.fire({ icon: 'error', title: e?.response?.data?.message ?? 'Gagal mengeksekusi protokol MRP' });
  } finally {
    running.value = false;
  }
};

const convertToPO = async (s: any) => {
  $toast.fire({ icon: 'success', title: `Matrix ${s.item?.code} Sedang Dikonversi ke Purchase Order` });
};

const convertToWO = async (s: any) => {
  $toast.fire({ icon: 'success', title: `Matrix ${s.item?.code} Sedang Dikonversi ke Work Order` });
};

const closeSuggestion = async (s: any) => {
  $toast.fire({ icon: 'success', title: `Log Matrix ${s.item?.code} Ditutup` });
};

onMounted(load);
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes fade-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-fade-in-right { animation: fade-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

.modal-enter-active { transition: all 0.4s ease; }
.modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from :deep(.relative) { transform: scale(0.9) translateY(20px); opacity: 0; }

.fade-enter-active, .fade-leave-active { transition: all 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(20px); }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.1); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.3); }

select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.5rem center;
  background-size: 1rem;
}
</style>
/style>