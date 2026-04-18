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
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Kendali Progres Produksi</span>
          </div>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Shop Floor <span class="text-emerald-600 not-italic text-xl md:text-2xl lg:text-3xl">Control Hub</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-emerald-900/60 leading-relaxed mt-3">Monitor real-time progres perintah kerja, alokasi workstation, dan performa operator di lantai produksi untuk memastikan pencapaian target secara presisi.</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 p-1 shadow-sm">
            <button v-for="v in ['board', 'grid', 'gantt']" :key="v" @click="viewMode = v"
              :class="viewMode === v ? 'bg-white text-emerald-700 shadow-md border-emerald-100' : 'text-slate-400 border-transparent hover:text-slate-600'"
              class="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border outline-none flex items-center gap-2">
              <i :class="['pi text-[10px]', v === 'board' ? 'pi-th-large' : v === 'grid' ? 'pi-list' : 'pi-chart-bar']"></i>
              {{ v === 'board' ? 'Kanban' : v === 'grid' ? 'Tabel' : 'Gantt' }}
            </button>
          </div>
          <Button icon="pi pi-refresh" @click="load" :loading="loading" class="p-button-rounded h-12 w-12 bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 shadow-sm transition-all" />
        </div>
      </div>
    </div>

    <!-- Shop Floor Telemetry Dashboard (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-emerald-950 text-white shadow-xl flex flex-col justify-between border border-emerald-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 opacity-80">Pesanan Aktif (WIP)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">{{ stats[0].value }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-bolt text-lg text-emerald-400"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Operasi Dalam Antrean</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ stats[1].value }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 group-hover:rotate-12 transition-transform"><i class="pi pi-clock text-lg"></i></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Total Selesai (Shift)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ stats[2].value }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform"><i class="pi pi-check-circle text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-emerald-100 tracking-[0.2em] mb-4 opacity-80">Rasio Reject</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase">{{ stats[3].value }} <span class="text-emerald-300 italic text-sm">Low Rate</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-chart-bar text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Filters & Search Bar (High-Fidelity Style) -->
    <div class="mb-4 flex flex-col gap-4 md:flex-row md:items-center animate-fade-in-up mt-6">
      <div class="relative flex-1 group">
        <div class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors">
           <i class="pi pi-search text-xs"></i>
        </div>
        <input v-model="searchQuery" type="text" placeholder="Cari Kode WO, Produk, atau Referensi..." 
          class="h-14 w-full rounded-2xl border-none bg-white pl-14 pr-6 text-[11px] font-black uppercase tracking-widest shadow-sm ring-1 ring-slate-200 transition-all focus:ring-4 focus:ring-emerald-400 outline-none" />
      </div>
      <div class="flex items-center gap-3">
        <select v-model="filterWorkCenter" class="h-14 rounded-2xl border-none bg-white px-6 text-[10px] font-black uppercase tracking-widest shadow-sm ring-1 ring-slate-200 transition-all focus:ring-4 focus:ring-emerald-400 outline-none min-w-[200px] appearance-none cursor-pointer text-slate-600">
          <option value="">Semua Work Center</option>
          <option v-for="wc in workCenters" :key="wc" :value="wc">{{ wc.toUpperCase() }}</option>
        </select>
      </div>
    </div>

    <!-- Shop Floor Board (Kanban Architecture) -->
    <div v-if="viewMode === 'board'" class="flex gap-8 overflow-x-auto pb-12 snap-x scrollbar-hide animate-fade-in-up">
      <div v-for="col in columns" :key="col.id" class="flex min-w-[340px] flex-1 flex-col gap-6 snap-start">
        <div class="flex items-center justify-between px-2">
          <div class="flex items-center gap-3">
             <div :class="`h-4 w-4 rounded-full ${col.dotColor} border-4 border-white shadow-sm`" />
             <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">{{ col.label }}</h3>
             <span class="rounded-xl bg-slate-100 px-3 py-1 text-[9px] font-black text-slate-500 border border-slate-200">{{ getWoByStatus(col.id).length }}</span>
          </div>
        </div>
        
        <div class="flex flex-col gap-5 min-h-[500px]">
          <div v-for="wo in getWoByStatus(col.id)" :key="wo.id" @click="openDetails(wo)"
            class="group relative cursor-pointer rounded-[2rem] bg-white p-7 border-2 border-slate-50 shadow-sm transition-all hover:shadow-2xl hover:border-emerald-100 hover:-translate-y-2 active:scale-[0.98]">
            
            <div class="mb-5 flex items-center justify-between">
               <span class="font-mono text-[11px] font-black tracking-tight text-emerald-600 group-hover:text-emerald-800 transition-colors uppercase leading-none">{{ wo.code }}</span>
               <span :class="getPriorityClass(wo.priority)" class="flex items-center gap-2 rounded-xl px-3 py-1 text-[9px] font-black uppercase border tracking-widest">
                  <i class="pi pi-exclamation-circle text-[8px]"></i>
                  {{ wo.priority || 'NORMAL' }}
               </span>
            </div>
            
            <h4 class="text-sm font-black text-slate-900 line-clamp-2 leading-tight uppercase tracking-tight mb-4 group-hover:text-emerald-700 transition-colors">{{ wo.finishedGood?.name }}</h4>
            
            <div class="mt-4 flex flex-col gap-4 border-t border-slate-50 pt-5">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Progress Eksekusi</span>
                  <span class="text-[10px] font-black text-emerald-600 font-mono">{{ calculateProgress(wo) }}%</span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-slate-50 border border-slate-100 shadow-inner">
                  <div class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                       :style="{ width: calculateProgress(wo) + '%' }" />
                </div>
              </div>

              <div class="flex items-center justify-between mt-2">
                 <div class="flex -space-x-2">
                    <div v-for="n in 3" :key="n" class="h-8 w-8 rounded-xl border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
                       <img v-if="n === 1" src="https://ui-avatars.com/api/?name=Op+A&background=10b981&color=fff" alt="">
                       <img v-else-if="n === 2" src="https://ui-avatars.com/api/?name=Op+B&background=0f172a&color=fff" alt="">
                       <div v-else class="text-[9px] font-black text-slate-500">+{{ wo.operations?.length || 0 }}</div>
                    </div>
                 </div>
                 <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">
                    <i class="pi pi-calendar-clock mr-1 text-[10px]"></i>
                    {{ fmtDate(wo.plannedStartDate) }}
                 </div>
              </div>
            </div>
            
            <div v-if="isActive(wo)" class="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-100 ring-4 ring-white animate-fade-in-up">
              <i class="pi pi-bolt text-xs animate-pulse"></i>
            </div>
          </div>

          <div v-if="getWoByStatus(col.id).length === 0" class="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[2.5rem] opacity-30 text-slate-400 p-10 text-center">
             <i :class="col.id === 'RELEASED' ? 'pi-send' : col.id === 'IN_PROGRESS' ? 'pi-spin pi-cog' : 'pi-check-circle'" class="pi text-4xl mb-4"></i>
             <p class="text-[10px] font-black uppercase tracking-widest italic">Tidak ada antrean dalam stage ini</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Shop Floor Gantt (Timeline Visualization) -->
    <div v-else-if="viewMode === 'gantt'" class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 flex flex-col h-[600px]">
       <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0 relative overflow-hidden">
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div class="flex items-center gap-4 relative z-10">
             <div class="w-12 h-12 rounded-2xl bg-emerald-900 flex items-center justify-center text-white shadow-xl"><i class="pi pi-chart-bar text-xl"></i></div>
             <div>
                <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Penjadwalan & Visual Timeline Produksi</h3>
                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Production Gantt Interface</p>
             </div>
          </div>
          <div class="flex items-center gap-3 relative z-10">
             <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ ganttTimeline.length }} HARI TERAKOMODASI</span>
          </div>
       </div>

       <div class="flex-1 flex overflow-hidden">
          <!-- Fixed Side Info -->
          <div class="w-64 border-r border-slate-100 flex flex-col shrink-0 bg-white relative z-20 shadow-[10px_0_15px_rgba(0,0,0,0.02)]">
             <div class="h-14 border-b border-slate-50 flex items-center px-6 bg-slate-50/50">
                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Identitas Pesanan</span>
             </div>
             <div class="flex-1 overflow-y-auto custom-scrollbar">
                <div v-for="wo in filteredWorkOrders" :key="'side-'+wo.id" @click="openDetails(wo)" class="h-20 px-6 border-b border-slate-50 flex flex-col justify-center gap-1 hover:bg-emerald-50 cursor-pointer transition-colors group">
                   <p class="text-[10px] font-black text-slate-800 uppercase tracking-tight group-hover:text-emerald-700 truncate">{{ wo.code }}</p>
                   <p class="text-[8px] font-bold text-slate-400 uppercase truncate leading-none">{{ wo.finishedGood?.name }}</p>
                </div>
             </div>
          </div>

          <!-- Scrollable Gantt Canvas -->
          <div class="flex-1 overflow-auto custom-scrollbar relative bg-slate-50/20" ref="ganttCanvas">
             <div :style="{ width: (ganttTimeline.length * 100) + 'px' }" class="relative h-full">
                <!-- Timeline Header -->
                <div class="h-14 border-b border-slate-100 flex sticky top-0 bg-white/90 backdrop-blur-md z-10">
                   <div v-for="day in ganttTimeline" :key="day.id" class="flex-none w-[100px] border-r border-slate-50 flex flex-col items-center justify-center transition-colors hover:bg-emerald-50/50">
                      <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">{{ day.month }}</span>
                      <span class="text-[11px] font-black text-slate-800">{{ day.day }}</span>
                   </div>
                </div>

                <!-- Grid Vertical Lines -->
                <div class="absolute top-14 bottom-0 left-0 right-0 flex pointer-events-none">
                   <div v-for="day in ganttTimeline" :key="'grid-'+day.id" class="flex-none w-[100px] border-r border-slate-50/50"></div>
                </div>

                <!-- WO Bars -->
                <div class="pt-0">
                   <div v-for="wo in filteredWorkOrders" :key="'bar-'+wo.id" class="h-20 border-b border-slate-100/50 relative flex items-center">
                      <div @click="openDetails(wo)" 
                           :style="calculateGanttStyles(wo)"
                           class="absolute h-10 rounded-xl bg-white border-2 border-slate-100 shadow-sm flex items-center px-4 cursor-pointer transition-all hover:border-emerald-500 hover:shadow-xl hover:scale-[1.02] group overflow-hidden">
                         <div class="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         
                         <!-- Progress Overlay -->
                         <div class="absolute left-0 top-0 bottom-0 bg-emerald-600/10 border-r-2 border-emerald-500/20 shadow-inner transition-all duration-1000"
                              :style="{ width: calculateProgress(wo) + '%' }"></div>
                         
                         <div class="relative z-10 flex items-center gap-3 w-full">
                            <div class="h-2 w-2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" :class="calculateProgress(wo) >= 100 ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'"></div>
                            <span class="text-[9px] font-black text-slate-800 uppercase tracking-tight truncate">{{ calculateProgress(wo) }}% - {{ wo.code }}</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- Shop Floor Grid (High-Density Table) -->
    <div v-else class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6">
       <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center gap-4 relative overflow-hidden">
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div class="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl"><i class="pi pi-list text-xl"></i></div>
          <div>
             <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Kontrol Lantai Produksi</h3>
             <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Production Ticket Records</p>
          </div>
       </div>

      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left">
          <thead class="bg-white border-b border-slate-50">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 w-[280px]">Work Order / Identitas</th>
              <th class="px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 border-l border-slate-50">Produk Luaran (FG)</th>
              <th class="px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 border-l border-slate-50 text-center">Progress Qty</th>
              <th class="px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 border-l border-slate-50">Work Center Alokasi</th>
              <th class="px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 border-l border-slate-50 text-center">Status</th>
              <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 border-l border-slate-50 text-right w-32 font-black italic text-emerald-600">Audit Hub</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="wo in filteredWorkOrders" :key="wo.id" @click="openDetails(wo)" class="group hover:bg-slate-50/50 transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-emerald-400">
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-all shadow-inner group-hover:scale-110">
                    <i class="pi pi-box text-lg"></i>
                  </div>
                  <div>
                    <p class="text-[11px] font-black text-slate-700 uppercase tracking-tight leading-none group-hover:text-emerald-800">{{ wo.code }}</p>
                    <p class="mt-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{{ fmtDate(wo.plannedStartDate) }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-6 border-l border-slate-50">
                <p class="text-[11px] font-black text-slate-800 leading-tight uppercase tracking-tight">{{ wo.finishedGood?.name }}</p>
                <p class="text-[9px] font-bold text-slate-400 uppercase mt-1 opacity-60">{{ wo.finishedGood?.code }}</p>
              </td>
              <td class="px-6 py-6 border-l border-slate-50 align-middle">
                 <div class="flex flex-col items-center gap-2">
                    <p class="font-mono text-xs font-black text-slate-900 tracking-tighter italic">{{ wo.qtyProduced }} <span class="text-slate-300">/</span> {{ wo.qtyPlanned }}</p>
                    <div class="h-1.5 w-28 overflow-hidden rounded-full bg-slate-100 shadow-inner">
                       <div class="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" :style="{ width: calculateProgress(wo) + '%' }" />
                    </div>
                 </div>
              </td>
              <td class="px-6 py-6 border-l border-slate-50">
                <div class="flex flex-wrap gap-2">
                  <span v-for="wc in getWcsForWo(wo)" :key="wc" class="rounded-lg bg-emerald-50 px-3 py-1 text-[8px] font-black uppercase text-emerald-600 border border-emerald-100">{{ wc }}</span>
                </div>
              </td>
              <td class="px-6 py-6 border-l border-slate-50 text-center">
                <span :class="getStatusBadgeClass(wo.status)" class="rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm">
                  <i :class="getStatusDot(wo.status)" class="h-1.5 w-1.5 rounded-full mr-2"></i> {{ wo.status }}
                </span>
              </td>
              <td class="px-8 py-6 border-l border-slate-50 text-right">
                <Button label="Buka Audit" size="small" rounded outlined class="h-9 px-6 border-slate-200 text-slate-500 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Shop Floor Registry Hub (Universal Centered Dialog) -->
    <div v-if="detailOpen && selectedWo" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        
        <!-- Hub Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-desktop text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Shop Floor <span class="text-emerald-600 not-italic text-2xl">Control Hub</span></h3>
                 <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm bg-emerald-50 text-emerald-700 border-emerald-200">
                    LIVE REGISTRY: {{ selectedWo.code }}
                 </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Real-time Production Monitoring & Operational Registry Protocol</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="detailOpen = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12 cursor-pointer" />
        </div>
        
        <!-- Hub Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           
           <!-- Quick Telemetry Row -->
           <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fade-in-up">
              <div v-for="st in detailStats" :key="st.label" class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:bg-emerald-50 group">
                 <p class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-600 transition-colors mb-2">{{ st.label }}</p>
                 <p class="text-xl font-black text-slate-800 tracking-tight font-mono">{{ st.value }}</p>
              </div>
           </div>

           <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              <!-- Panel I: Production Routing (Operations) -->
              <div class="lg:col-span-8 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between">
                    <span class="flex items-center gap-2"><i class="pi pi-cog text-emerald-500"></i> I. Matriks Routing Produksi</span>
                    <span class="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 italic">LIVE OPERATIONS AUDIT</span>
                 </div>
                 <div class="bg-white p-4 rounded-[2.5rem] border-2 border-slate-100 shadow-sm relative overflow-hidden transition-all hover:border-emerald-100">
                    <div class="p-6 space-y-6">
                       <div v-for="(op, idx) in selectedWo.operations" :key="op.id" class="group/op relative flex flex-col gap-5 rounded-[2rem] border-2 border-slate-50 bg-slate-50/20 p-8 transition-all hover:bg-white hover:shadow-2xl hover:border-emerald-100">
                          
                          <div class="flex items-center justify-between">
                             <div class="flex items-center gap-6">
                                <div class="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[13px] font-black text-slate-300 group-hover/op:scale-110 group-hover/op:text-emerald-600 group-hover/op:border-emerald-200 transition-all shadow-sm">
                                   {{ op.lineNo || (idx + 1) }}
                                </div>
                                <div>
                                   <div class="flex items-center gap-3 mb-1">
                                      <h4 class="text-base font-black text-slate-900 group-hover/op:text-emerald-800 transition-colors uppercase tracking-tight">{{ op.description }}</h4>
                                      <span :class="getOpStatusClass(op.status)" class="rounded-xl px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border shadow-sm">
                                         {{ op.status === 'IN_PROGRESS' ? 'AKTIF' : op.status }}
                                      </span>
                                   </div>
                                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                                      <i class="pi pi-building text-emerald-500"></i> WORKSTATION: {{ op.workstation || 'GENERAL WS' }}
                                   </p>
                                </div>
                             </div>
                             
                             <div class="flex items-center gap-3">
                                <button v-if="op.status === 'PENDING' || op.status === 'IN_PROGRESS'" @click="toggleOperation(op)"
                                  :class="isActiveOp(op) ? 'bg-rose-600 shadow-rose-100' : 'bg-emerald-600 shadow-emerald-100'"
                                  class="h-12 px-8 rounded-xl text-[10px] font-black uppercase text-white tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all outline-none">
                                   {{ isActiveOp(op) ? 'Stop Operasi' : 'Mulai Proses' }}
                                </button>
                                <button @click="openReportDialog(op)" class="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-900 text-white shadow-xl hover:scale-105 active:scale-95 transition-all">
                                   <i class="pi pi-chart-bar"></i>
                                </button>
                             </div>
                          </div>

                          <div class="flex items-center gap-10 mt-2 bg-white/50 p-5 rounded-2xl border border-white/80">
                             <div class="flex-1">
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 italic">Total Output Selesai</p>
                                <p class="font-mono text-xl font-black text-slate-800 tracking-tight">{{ op.qtyCompleted }} <span class="text-sm text-slate-300">{{ selectedWo.finishedGood?.uomCode || 'PCS' }}</span></p>
                             </div>
                             <div class="w-px h-10 bg-slate-100"></div>
                             <div class="flex-1">
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 italic">Jam Kerja Realitas (Labor)</p>
                                <p class="font-mono text-xl font-black text-slate-800 tracking-tight">{{ Number(op.actualLaborHours || 0).toFixed(2) }} <span class="text-sm text-slate-300">Jam</span></p>
                             </div>
                             <div class="w-px h-10 bg-slate-100"></div>
                             <div class="flex-1 text-right">
                                <p class="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1.5 italic">Status Alur</p>
                                <div class="flex justify-end">
                                   <div v-if="op.status === 'IN_PROGRESS'" class="flex h-3 w-3 animate-ping rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                                   <i v-else-if="op.status === 'COMPLETED'" class="pi pi-check-circle text-emerald-500 text-xl"></i>
                                   <i v-else class="pi pi-clock text-slate-200 text-xl"></i>
                                </div>
                             </div>
                          </div>

                          <div v-if="idx < selectedWo.operations.length - 1" class="absolute left-10 -bottom-8 z-0 h-8 w-1 bg-emerald-50 group-hover/op:bg-emerald-100 transition-all"></div>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel II: Activity Timeline (Audit Logs) -->
              <div class="lg:col-span-4 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between">
                    <span class="flex items-center gap-2"><i class="pi pi-history text-amber-500"></i> II. Audit Timeline Operasional</span>
                 </div>
                 <div class="bg-indigo-950 p-8 rounded-[2.5rem] shadow-2xl border-4 border-indigo-900 relative overflow-hidden flex flex-col min-h-[600px]">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-30"></div>
                    <div class="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-8 relative z-10 p-2">
                       <div v-for="log in selectedWo.shopFloorLogs" :key="log.id" class="flex gap-6 group/log">
                          <div class="flex flex-col items-center gap-2">
                            <div :class="getLogIconClass(log.action)" class="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-xl shadow-black/20 group-hover/log:scale-110 transition-transform relative z-10 border-2 border-indigo-900/50">
                               <i :class="getLogIcon(log.action)" class="text-xs"></i>
                            </div>
                            <div class="h-full w-1 bg-white/5 group-hover/log:bg-white/10 transition-all"></div>
                          </div>
                          <div class="pb-8 pt-1">
                             <div class="flex items-center gap-4 mb-2">
                                <p class="text-[11px] font-black text-white hover:text-emerald-400 transition-colors uppercase italic tracking-tight">{{ log.operatorName }}</p>
                                <span class="px-2 py-0.5 bg-white/5 rounded-lg text-[8px] font-black text-indigo-300 uppercase italic tracking-widest">{{ fmtDateTime(log.loggedAt) }}</span>
                             </div>
                             <p class="text-[10px] font-medium text-indigo-100/60 leading-relaxed border-l-2 border-indigo-500 pr-4 italic pl-3">{{ formatLogMessage(log) }}</p>
                          </div>
                       </div>
                       
                       <div v-if="!selectedWo.shopFloorLogs?.length" class="py-24 text-center opacity-20">
                          <i class="pi pi-history text-6xl text-white mb-4"></i>
                          <p class="text-[10px] font-black text-white uppercase tracking-widest italic">Pusat Audit Teratai Belum Memiliki Rekaman Log</p>
                       </div>
                    </div>
                 </div>
              </div>

           </div>
        </div>

        <!-- Hub Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-shield-check"></i> Audit Sistem Operasi Lantai Produksi Aktif
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Tutup Sinkronisasi" severity="secondary" text @click="detailOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Report Progress Dialog (Centered Mini Registry) -->
    <transition name="modal">
      <div v-if="reportOpen && activeOp" class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <div class="relative w-full max-w-lg rounded-[2.5rem] bg-white p-12 shadow-3xl overflow-hidden animate-scale-in border-b-[12px] border-b-emerald-900 border-4 border-white">
          <div class="mb-10 text-center relative">
            <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-emerald-50 text-emerald-600 border-2 border-white shadow-xl rotate-6 transition-transform hover:rotate-0">
               <i class="pi pi-pencil text-3xl font-black"></i>
            </div>
            <h2 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Laporan <span class="text-emerald-600 not-italic text-2xl">Operasi</span></h2>
            <p class="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-[0.2em] border-l-2 border-emerald-500 px-4 ml-1/2 -translate-x-1/2 inline-block">ID OPERASI: {{ activeOp.description.toUpperCase() }}</p>
          </div>

          <div class="space-y-8">
            <div class="grid grid-cols-3 gap-4">
               <button v-for="t in [ {id:'GOOD', label:'LULUS', color:'emerald', icon:'pi-check-circle'}, {id:'REJECT', label:'REJECT', color:'rose', icon:'pi-times-circle'}, {id:'SCRAP', label:'SCRAP', color:'amber', icon:'pi-trash'} ]"
                 :key="t.id" @click="reportForm.type = t.id"
                 :class="reportForm.type === t.id ? `border-${t.color}-500 bg-${t.color}-50 text-${t.color}-700 shadow-xl scale-105` : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:bg-slate-50 hover:border-slate-100'"
                 class="flex flex-col items-center gap-3 rounded-[1.5rem] border-2 p-5 transition-all outline-none">
                 <i :class="['pi text-xl', t.icon]"></i>
                 <span class="text-[9px] font-black uppercase tracking-widest">{{ t.label }}</span>
               </button>
            </div>

            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Registrasi Kuantitas Output</label>
              <div class="relative">
                <input v-model="reportForm.qty" type="number" 
                       class="h-16 w-full rounded-2xl border-none bg-slate-50 px-6 text-center text-3xl font-black text-slate-900 shadow-inner focus:bg-white focus:ring-4 focus:ring-emerald-400 outline-none font-mono" />
                <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase italic">Units (FG)</span>
              </div>
            </div>

            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Komentar / Observasi Teknis</label>
              <textarea v-model="reportForm.notes" rows="3"
                class="w-full rounded-2xl border-none bg-slate-50 p-6 text-[11px] font-medium text-slate-700 outline-none shadow-inner focus:bg-white focus:ring-4 focus:ring-emerald-400 transition-all"
                placeholder="Catat anomali atau justifikasi pembuangan bahan..."></textarea>
            </div>
          </div>

          <div class="mt-10 flex gap-4">
            <button @click="closeReport" class="flex-1 h-16 rounded-2xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all">Batalkan</button>
            <button @click="submitReport" :disabled="!reportForm.qty || reportForm.qty < 0"
              class="flex-[2] h-16 rounded-2xl bg-slate-900 text-[11px] font-black uppercase tracking-widest text-white shadow-2xl hover:bg-emerald-600 transition-all disabled:opacity-30 disabled:grayscale">
               Posting Laporan Progres
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Global Toast -->
    <transition name="toast">
      <div v-if="toastMsg" :class="toastMsg.includes('Berhasil') ? 'bg-emerald-950 border-emerald-900' : 'bg-rose-950 border-rose-900'" 
           class="fixed bottom-10 left-1/2 z-[200] -translate-x-1/2 overflow-hidden rounded-2xl px-10 py-5 text-white shadow-3xl flex items-center gap-5 border-2 animate-fade-in-up backdrop-blur-md">
        <div :class="toastMsg.includes('Berhasil') ? 'bg-emerald-500' : 'bg-rose-500'" class="h-10 w-10 flex items-center justify-center rounded-xl shadow-lg">
           <i :class="toastMsg.includes('Berhasil') ? 'pi-check-circle' : 'pi-info-circle'" class="pi text-lg"></i>
        </div>
        <div class="flex flex-col">
           <span class="text-[10px] font-black uppercase tracking-widest opacity-50">{{ toastMsg.includes('Berhasil') ? 'Sistem Terverifikasi' : 'Notifikasi Sistem' }}</span>
           <span class="text-xs font-black uppercase tracking-tight">{{ toastMsg }}</span>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';

const api = useApi();

// View State
const loading = ref(false);
const viewMode = ref('board'); // board | grid | gantt
const searchQuery = ref('');
const filterWorkCenter = ref('');
const toastMsg = ref('');

// Data
const workOrders = ref<any[]>([]);
const workCenters = ref<string[]>(['Weighing Area', 'Brewing Station', 'Mixing Line', 'Filling Station', 'QC Lab']);

// Details Hub
const detailOpen = ref(false);
const selectedWo = ref<any>(null);

// Reporting Logic
const reportOpen = ref(false);
const activeOp = ref<any>(null);
const reportForm = reactive({
  qty: 0,
  type: 'GOOD',
  notes: ''
});

// Kanban Stage Protocol
const columns = [
  { id: 'RELEASED', label: 'Rilis & Antrean', dotColor: 'bg-blue-500' },
  { id: 'IN_PROGRESS', label: 'Progres Aktif', dotColor: 'bg-emerald-500' },
  { id: 'COMPLETED', label: 'Telah Selesai', dotColor: 'bg-emerald-950' }
];

// Gantt Timeline Logic
const ganttTimeline = computed(() => {
  if (workOrders.value.length === 0) return [];
  
  const dates = workOrders.value.flatMap(wo => [
    wo.plannedStartDate ? new Date(wo.plannedStartDate) : new Date(),
    wo.plannedEndDate ? new Date(wo.plannedEndDate) : new Date(new Date().getTime() + 86400000 * 7)
  ]);
  
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
  
  // Padding 2 days
  const start = new Date(minDate); start.setDate(start.getDate() - 2);
  const end = new Date(maxDate); end.setDate(end.getDate() + 5);
  
  const timeline = [];
  const curr = new Date(start);
  while (curr <= end) {
    timeline.push({
      id: curr.toISOString().split('T')[0],
      day: curr.getDate(),
      month: curr.toLocaleDateString('id-ID', { month: 'short' }),
      date: new Date(curr)
    });
    curr.setDate(curr.getDate() + 1);
  }
  return timeline;
});

const calculateGanttStyles = (wo: any) => {
  if (ganttTimeline.value.length === 0) return {};
  
  const timelineStart = ganttTimeline.value[0].date.getTime();
  const woStart = wo.plannedStartDate ? new Date(wo.plannedStartDate).getTime() : new Date().getTime();
  const woEnd = wo.plannedEndDate ? new Date(wo.plannedEndDate).getTime() : woStart + 86400000;
  
  const diffStart = Math.max(0, (woStart - timelineStart) / 86400000);
  const duration = Math.max(1, (woEnd - woStart) / 86400000);
  
  return {
    left: (diffStart * 100) + 'px',
    width: (duration * 100) + 'px'
  };
};

// Telemetry Logic
const stats = computed(() => [
  { label: 'Operasi Aktif', value: workOrders.value.filter(o => o.status === 'IN_PROGRESS').length, icon: 'pi-bolt' },
  { label: 'Antrean Operasi', value: workOrders.value.reduce((acc, wo) => acc + (wo.operations?.filter((o:any) => o.status === 'PENDING').length || 0), 0), icon: 'pi-clock' },
  { label: 'Selesai (Shift)', value: workOrders.value.filter(o => o.status === 'COMPLETED').length, icon: 'pi-check-circle' },
  { label: 'Yield Accuracy', value: '98.8%', icon: 'pi-chart-bar' }
]);

const detailStats = computed(() => {
  if (!selectedWo.value) return [];
  return [
    { label: 'Rencana Produksi', value: `${selectedWo.value.qtyPlanned} ${selectedWo.value.finishedGood?.uomCode || 'PCS'}` },
    { label: 'Output Terlapor', value: `${selectedWo.value.qtyProduced} ${selectedWo.value.finishedGood?.uomCode || 'PCS'}` },
    { label: 'Integritas Bahan', value: selectedWo.value.components?.filter((c:any) => Number(c.qtyIssued) > 0).length + ' / ' + selectedWo.value.components?.length + ' SKU' },
    { label: 'Timer Aktif', value: (selectedWo.value.shopFloorTimers?.length || 0) + ' Sesi' }
  ];
});

const filteredWorkOrders = computed(() => {
  return workOrders.value.filter(wo => {
    const matchesSearch = !searchQuery.value || 
      wo.code?.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      wo.finishedGood?.name?.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesWc = !filterWorkCenter.value || 
      getWcsForWo(wo).includes(filterWorkCenter.value);
      
    return matchesSearch && matchesWc;
  });
});

// Operations API Hub
const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/manufacturing/shop-floor');
    workOrders.value = res.data?.workOrders ?? [];
  } catch (e) {
    showToast('Gagal memproses sinkronisasi data');
  } finally {
    loading.value = false;
  }
};

const openDetails = async (wo: any) => {
  try {
    const res = await api.get(`/manufacturing/shop-floor/${wo.id}`);
    selectedWo.value = res.data?.workOrder;
    detailOpen.value = true;
  } catch (e) {
    showToast('Gagal memuat registrasi detail');
  }
};

const toggleOperation = async (op: any) => {
  const activeTimer = selectedWo.value.shopFloorTimers?.find((t: any) => t.operationId === op.id);
  
  if (activeTimer) {
     // TERMINATION (STOP)
    activeOp.value = op;
    reportOpen.value = true;
    reportForm.type = 'GOOD';
    reportForm.qty = 0;
    reportForm.notes = '';
  } else {
    // ACTIVATION (START)
    try {
      await api.post('/manufacturing/shop-floor/start-operation', {
        workOrderId: selectedWo.value.id,
        operationId: op.id
      });
      showToast(`Aktivasi Operasi: ${op.description.toUpperCase()} BERHASIL`);
      await openDetails(selectedWo.value);
      await load();
    } catch (e: any) {
      showToast(e.response?.data?.message || 'Gagal memulai operasi');
    }
  }
};

const openReportDialog = (op: any) => {
  activeOp.value = op;
  reportOpen.value = true;
  reportForm.type = 'GOOD';
  reportForm.qty = 0;
  reportForm.notes = '';
};

const closeReport = () => {
  reportOpen.value = false;
  activeOp.value = null;
};

const submitReport = async () => {
  if (!activeOp.value || !selectedWo.value) return;
  
  const activeTimer = selectedWo.value.shopFloorTimers?.find((t: any) => t.operationId === activeOp.value.id);
  
  try {
    if (activeTimer) {
      await api.post('/manufacturing/shop-floor/stop-operation', {
        workOrderId: selectedWo.value.id,
        operationId: activeOp.value.id,
        timerId: activeTimer.id,
        qtyCompleted: reportForm.type === 'GOOD' ? Number(reportForm.qty) : 0,
        rejectedQty: reportForm.type === 'REJECT' ? Number(reportForm.qty) : 0,
        scrapQty: reportForm.type === 'SCRAP' ? Number(reportForm.qty) : 0,
        notes: reportForm.notes
      });
    } else {
      await api.post('/manufacturing/shop-floor/report-qty', {
        workOrderId: selectedWo.value.id,
        operationId: activeOp.value.id,
        qty: Number(reportForm.qty),
        type: reportForm.type,
        notes: reportForm.notes
      });
    }
    
    showToast('Laporan Progres Operasi Berhasil Direkam');
    closeReport();
    await openDetails(selectedWo.value);
    await load();
  } catch (e: any) {
    showToast(e.response?.data?.message || 'Registrasi laporan gagal');
  }
};

// Governance Utils
const calculateProgress = (wo: any) => {
  if (!wo.qtyPlanned || wo.qtyPlanned === 0) return 0;
  return Math.round((Number(wo.qtyProduced) / Number(wo.qtyPlanned)) * 100);
};

const getWoByStatus = (status: string) => {
  return filteredWorkOrders.value.filter(wo => wo.status === status);
};

const getWcsForWo = (wo: any) => {
  if (!wo.operations) return [];
  return [...new Set(wo.operations.map((o: any) => o.workstation).filter(Boolean))];
};

const isActive = (wo: any) => {
  return wo.operations?.some((o: any) => o.status === 'IN_PROGRESS');
};

const isActiveOp = (op: any) => {
  return selectedWo.value?.shopFloorTimers?.some((t: any) => t.operationId === op.id);
};

const showToast = (msg: string) => {
  toastMsg.value = msg;
  setTimeout(() => toastMsg.value = '', 4000);
};

const fmtDate = (v: any) => v ? new Date(v).toLocaleDateString('id-ID', { day:'2-digit', month:'2-digit', year:'numeric' }) : '-';
const fmtDateTime = (v: any) => v ? new Date(v).toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' }) : '-';

const getPriorityClass = (p: string) => {
  if (p === 'URGENT' || p === 'Urgent' || p === 'High') return 'bg-rose-50 text-rose-700 border-rose-100';
  if (p === 'Medium' || p === 'NORMAL') return 'bg-amber-50 text-amber-700 border-amber-100';
  return 'bg-slate-50 text-slate-500 border-slate-100';
};

const getStatusBadgeClass = (s: string) => {
  if (s === 'COMPLETED') return 'bg-emerald-950 text-emerald-400 border-emerald-800 shadow-xl';
  if (s === 'IN_PROGRESS') return 'bg-amber-50 text-amber-700 border-amber-100';
  if (s === 'RELEASED') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  return 'bg-slate-100 text-slate-500 border-slate-100';
};

const getStatusDot = (s: string) => {
  if (s === 'COMPLETED') return 'bg-emerald-400';
  if (s === 'IN_PROGRESS') return 'bg-amber-500 animate-pulse';
  if (s === 'RELEASED') return 'bg-emerald-500 shadow-sm';
  return 'bg-slate-400';
};

const getOpStatusClass = (s: string) => {
  if (s === 'COMPLETED') return 'bg-emerald-100 text-emerald-700 border-emerald-100';
  if (s === 'IN_PROGRESS') return 'bg-emerald-950 text-emerald-400 border-emerald-800 shadow-2xl animate-pulse';
  return 'bg-slate-50 text-slate-300 border-slate-100 italic';
};

const getLogIconClass = (a: string) => {
  if (a.includes('CLOCK_IN')) return 'bg-emerald-600';
  if (a.includes('CLOCK_OUT')) return 'bg-emerald-950';
  if (a.includes('REJECT') || a.includes('SCRAP')) return 'bg-rose-600';
  return 'bg-indigo-600';
};

const getLogIcon = (a: string) => {
  if (a.includes('CLOCK_IN')) return 'pi-sign-in';
  if (a.includes('CLOCK_OUT')) return 'pi-sign-out';
  if (a.includes('REJECT')) return 'pi-times-circle';
  if (a.includes('SCRAP')) return 'pi-trash';
  return 'pi-info-circle';
};

const formatLogMessage = (log: any) => {
  const t = log.action;
  if (t === 'CLOCK_IN') return `Operator melakukan audit presensi pada workstation. Status operasi aktif ke IN_PROGRESS.`;
  if (t === 'CLOCK_OUT') return `Operasi selesai. Laporan output akhir: ${log.qtyReported} unit. Estimasi durasi labor: ${log.laborHours?.toFixed(2)} jam.`;
  if (t.includes('REPORT_GOOD')) return `Laporan luaran berkualitas (Good) tercantum: ${log.qtyReported} unit. Integrasi inventory diproses.`;
  if (t.includes('REPORT_REJECT')) return `Eksklusi produk reject terdeteksi: ${log.qtyReported} unit. Memerlukan audit kualitas lanjutan.`;
  return log.notes || 'Aktivitas terekam dalam audit integrasi shop floor.';
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

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

.modal-enter-active, .modal-leave-active { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }

.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 20px); }

.snap-x { scroll-snap-type: x mandatory; }
.snap-start { scroll-snap-align: start; }

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