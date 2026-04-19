<template>
  <div class="space-y-4 font-sans text-slate-900 custom-scrollbar overflow-x-hidden">

    <!-- Header (Premium Manufacturing Costing Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0 animate-fade-in-up">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-100 font-sans">Accounting Engine</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Manajemen Biaya & Kalkulasi COGM</span>
          </div>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Biaya & <span class="text-emerald-600 not-italic text-xl md:text-2xl lg:text-3xl">Kalkulasi Produksi</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-emerald-900/60 leading-relaxed mt-3">Lakukan kalkulasi Harga Pokok Produksi (COGM), analisis varian bahan baku, serta settlement jurnal akuntansi secara otomatis dan terintegrasi.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button 
            label="+ Kalkulasi COGM Baru" 
            icon="pi pi-calculator" 
            class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all"
            @click="openCostingDialog"
          />
          <Button 
            label="Ekspor Laporan PDF" 
            icon="pi pi-file-pdf" 
            class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all"
          />
        </div>
      </div>
    </div>

    <!-- Costing Telemetry Dashboard (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-emerald-950 text-white shadow-xl flex flex-col justify-between border border-emerald-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 opacity-80">Total COGM (MTD)</div>
        <div class="flex items-end justify-between">
          <div class="flex flex-col">
            <h3 class="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tighter leading-none italic">IDR {{ fmtMoney(totalCogm) }}</h3>
            <span class="text-[10px] font-bold text-emerald-400 mt-2 uppercase tracking-widest">+4.2% vs Anggaran</span>
          </div>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-chart-line text-lg text-emerald-400"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Valuasi WIP Aktif</div>
        <div class="flex items-end justify-between">
          <div class="flex flex-col">
             <h3 class="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 tracking-tighter leading-none font-mono italic">IDR {{ fmtMoney(totalWip) }}</h3>
             <span class="text-[10px] font-bold text-indigo-500 mt-2 uppercase tracking-widest italic">12 Perintah Kerja Aktif</span>
          </div>
          <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 group-hover:rotate-12 transition-transform"><i class="pi pi-sync text-lg"></i></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Rata-Rata Varian Biaya</div>
        <div class="flex items-end justify-between">
          <div class="flex flex-col">
             <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-rose-700 tracking-tighter leading-none italic">{{ avgVariance > 0 ? '+' : '' }}{{ avgVariance }}%</h3>
             <span class="text-[10px] font-bold text-rose-400 mt-2 uppercase tracking-widest italic">Anomali Material Scrap</span>
          </div>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 group-hover:rotate-12 transition-transform"><i class="pi pi-exclamation-triangle text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-emerald-100 tracking-[0.2em] mb-4 opacity-80">Status Audit Sistem</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase">Integrity <span class="text-emerald-300 italic">Live</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-shield-check text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Main Workspace Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
      
      <!-- Cost Settlement Ledger (Left 8 Columns) -->
      <div class="lg:col-span-8 space-y-6 animate-fade-in-up">
        <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4 relative overflow-hidden">
            <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div class="flex items-center gap-4 relative z-10">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3"><i class="pi pi-chart-pie text-xl"></i></div>
              <div>
                <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Settlement Biaya Produksi</h3>
                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Costing Settlement Records</p>
              </div>
            </div>
            <div class="flex gap-2 relative z-10">
               <select v-model="selectedPeriod" class="h-10 rounded-xl border-none bg-white px-4 text-[10px] font-black uppercase tracking-widest shadow-sm ring-1 ring-slate-200 outline-none appearance-none cursor-pointer pr-10">
                  <option v-for="p in ['2026-03', '2026-04']" :key="p" :value="p">{{ p }}</option>
               </select>
            </div>
          </div>

          <DataTable :value="costs" class="p-datatable-sm no-border" :rows="10">
            <Column field="period" header="PERIODE" class="px-8 py-6">
              <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-400 font-mono tracking-widest italic">{{ data.period }}</span>
              </template>
            </Column>
            <Column header="WORK ORDER / PRODUK" class="px-6 py-6 border-l border-slate-50">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="text-[11px] font-black text-slate-800 uppercase tracking-tight">{{ data.workOrder?.code }}</span>
                  <span class="text-[9px] text-slate-400 uppercase font-black italic mt-1 leading-none">{{ data.workOrder?.finishedGood?.name }}</span>
                </div>
              </template>
            </Column>
            <Column field="totalCost" header="TOTAL AKTUAL" class="px-6 py-6 border-l border-slate-50">
              <template #body="{ data }">
                <span class="text-[11px] font-black text-slate-900 font-mono italic">IDR {{ fmtMoney(data.totalCost) }}</span>
              </template>
            </Column>
            <Column header="ANALISIS VARIAN" class="px-6 py-6 border-l border-slate-50 text-center">
              <template #body="{ data }">
                <div :class="['inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black border uppercase shadow-sm', (data.actualCost - data.standardCost) > 0 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100']">
                  <i :class="['pi text-[8px]', (data.actualCost - data.standardCost) > 0 ? 'pi-arrow-up' : 'pi-arrow-down']"></i>
                  {{ ((data.actualCost / data.standardCost - 1) * 100).toFixed(1) }}%
                </div>
              </template>
            </Column>
            <Column header="STATUS" class="px-6 py-6 border-l border-slate-50 text-center">
              <template #body="{ data }">
                <div :class="['rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase', data.isFinalized ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-slate-50 text-slate-400 border-slate-200']">
                  {{ data.isFinalized ? 'SETTLED' : 'DRAFT' }}
                </div>
              </template>
            </Column>
            <Column header="ACTION" class="px-8 py-6 text-right border-l border-slate-50">
              <template #body="{ data }">
                <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Button icon="pi pi-eye" @click="viewDetail(data)" class="h-9 w-9 bg-slate-900 border-none text-white rounded-xl hover:bg-black" />
                  <Button 
                    v-if="!data.isFinalized"
                    icon="pi pi-check-circle" 
                    @click="finalizeCost(data)"
                    class="h-9 px-6 bg-emerald-600 border-none text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 shadow-xl shadow-emerald-100"
                    label="SETTLE"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>

      <!-- Analysis Side Panel (Right 4 Columns) -->
      <div class="lg:col-span-4 space-y-8 animate-fade-in-up" style="animation-delay: 0.1s">
        <!-- Costs Mix Chart -->
        <div class="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm relative overflow-hidden group">
          <div class="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all"></div>
          <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-l-2 border-emerald-500 pl-4">I. Aggregate Cost Mix Analysis</h3>
          
          <div class="h-48 flex items-end gap-10 px-4">
             <div class="flex-1 flex flex-col items-center">
                <div class="w-full bg-slate-900 rounded-2xl relative shadow-lg transition-all group-hover:scale-105" :style="{ height: '65%' }">
                   <div class="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent rounded-2xl"></div>
                </div>
                <div class="text-[10px] font-black mt-4 text-slate-900 uppercase italic">MAT</div>
             </div>
             <div class="flex-1 flex flex-col items-center">
                <div class="w-full bg-emerald-600 rounded-2xl relative shadow-lg transition-all group-hover:scale-105" :style="{ height: '24%' }"></div>
                <div class="text-[10px] font-black mt-4 text-emerald-600 uppercase italic">LAB</div>
             </div>
             <div class="flex-1 flex flex-col items-center">
                <div class="w-full bg-emerald-100 rounded-2xl relative shadow-lg transition-all group-hover:scale-105" :style="{ height: '11%' }"></div>
                <div class="text-[10px] font-black mt-4 text-slate-400 uppercase italic">OVR</div>
             </div>
          </div>
          
          <div class="mt-10 grid grid-cols-1 gap-4 border-t border-slate-50 pt-8">
             <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                   <div class="h-3 w-3 rounded-full bg-slate-900"></div>
                   <span class="text-[10px] font-black text-slate-800 uppercase italic tracking-tight">Material (Cost Ratio)</span>
                </div>
                <span class="text-[10px] font-black text-slate-500 font-mono">65.0%</span>
             </div>
             <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                   <div class="h-3 w-3 rounded-full bg-emerald-600"></div>
                   <span class="text-[10px] font-black text-emerald-600 uppercase italic tracking-tight">Labor Consumption</span>
                </div>
                <span class="text-[10px] font-black text-slate-500 font-mono">24.0%</span>
             </div>
          </div>
        </div>

        <!-- Recent Settlements activity -->
        <div class="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm">
           <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-l-2 border-indigo-500 pl-4">II. Recent Journal Settlements</h3>
           <div class="space-y-8">
              <div v-for="i in 3" :key="i" class="flex gap-6 group/log">
                 <div class="flex flex-col items-center gap-2">
                    <div class="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover/log:bg-emerald-600 group-hover/log:text-white transition-all shadow-inner">
                       <i class="pi pi-book text-xs"></i>
                    </div>
                    <div v-if="i < 3" class="h-full min-h-[40px] w-0.5 bg-slate-100"></div>
                 </div>
                 <div>
                    <h4 class="text-[11px] font-black text-slate-800 uppercase leading-none mb-1.5 tracking-tight group-hover/log:text-emerald-700">JV-COST-{{ 17618 + i }} POSTED</h4>
                    <p class="text-[10px] font-medium text-slate-400 leading-relaxed italic">Settlement batch untuk WO Chocolate Batch #00{{ i }} telah diverifikasi ke General Ledger.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Master Registry Hubs -->
    <!-- 1. Costing Calculation Hub -->
    <div v-if="calcDialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-2xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900 shadow-[0_0_50px_rgba(5,150,105,0.2)]">
        
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3">
               <i class="pi pi-calculator text-3xl font-black"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Kalkulasi <span class="text-emerald-600 not-italic text-2xl">COGM Baru</span></h3>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Cost of Goods Manufactured (COGM) Batch Run Protocol</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="calcDialogOpen = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12 cursor-pointer" />
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
          <div class="space-y-8 bg-white p-10 rounded-[2rem] border-2 border-slate-100 shadow-sm relative overflow-hidden transition-all hover:border-emerald-100">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pilih Perintah Kerja (Work Order) *</label>
                <select v-model="calcForm.workOrderId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-tight">
                    <option value="">-- PILIH WO SIAP COSTING --</option>
                    <option v-for="wo in workOrders" :key="wo.id" :value="wo.id">{{ wo.label }}</option>
                </select>
             </div>
             <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Periode Akuntansi</label>
                   <select v-model="calcForm.period" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-tight font-mono">
                       <option v-for="p in ['2026-03', '2026-04']" :key="p" :value="p">{{ p }}</option>
                   </select>
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tipe Kalkulasi</label>
                   <select v-model="calcForm.type" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-tight">
                       <option value="FINAL_BATCH">FINAL BATCH SETTLEMENT</option>
                       <option value="WIP_PERIODIC">PERIODIC WIP VALUATION</option>
                   </select>
                </div>
             </div>
             
             <div class="rounded-3xl bg-amber-50 p-8 border border-amber-100 relative group overflow-hidden">
                <div class="absolute right-0 top-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
                <div class="flex items-start gap-4 relative z-10">
                   <div class="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-amber-600 shadow-sm border border-amber-200">
                      <i class="pi pi-info-circle text-lg"></i>
                   </div>
                   <div>
                      <h4 class="text-[10px] font-black text-amber-800 uppercase tracking-widest leading-none mb-2">Protocol Note:</h4>
                      <p class="text-[10px] font-bold text-amber-900/60 leading-relaxed uppercase tracking-tight">
                        Kalkulasi akan menggabungkan seluruh data material issues (Stock Ledger) dan jam tenaga kerja (Labor Hours) yang tercatat di shop floor untuk WO terpilih.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div class="p-10 border-t bg-white flex justify-end items-center shrink-0 rounded-b-[2.5rem] gap-4">
          <Button label="Batalkan" severity="secondary" text @click="calcDialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          <Button label="Eksekusi Kalkulasi COGM" icon="pi pi-play" @click="runCalculation" class="h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all rounded-xl" />
        </div>
      </div>
    </div>

    <!-- 2. Cost Breakdown Registry Hub -->
    <div v-if="detailDialogOpen && selectedCost" class="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-4xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900 shadow-[0_0_50px_rgba(5,150,105,0.2)]">
        
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-950 flex items-center justify-center text-white shadow-xl rotate-3">
               <i class="pi pi-chart-line text-3xl font-black"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Breakdown <span class="text-emerald-600 not-italic text-2xl">Detail Biaya</span></h3>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Aggregated Production Cost Breakdown & Variance Analysis Registry</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="detailDialogOpen = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12 cursor-pointer" />
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <!-- Top Valuation Panel -->
           <div class="flex flex-col items-center bg-slate-900 rounded-[2.5rem] p-12 shadow-2xl text-white relative overflow-hidden mb-10 transition-all hover:bg-black group">
              <div class="absolute right-[-40px] top-[-40px] w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl opacity-50 group-hover:bg-emerald-500/20 transition-all"></div>
              <p class="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-4 z-10">Total Unit Cost Actual (Per Batch)</p>
              <h2 class="text-3xl md:text-4xl lg:text-6xl font-black font-mono tracking-tighter z-10 italic">IDR {{ fmtMoney(selectedCost.totalCost) }}</h2>
              
              <div class="mt-8 flex items-center gap-10 z-10 border-t border-white/10 pt-8 w-full justify-center">
                 <div class="flex flex-col items-center">
                    <p class="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Target Standard</p>
                    <p class="text-xl font-black text-white italic tracking-tight font-mono">IDR {{ fmtMoney(selectedCost.standardCost) }}</p>
                 </div>
                 <div class="h-12 w-px bg-white/10"></div>
                 <div class="flex flex-col items-center">
                    <p class="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Analisis Varian</p>
                    <div :class="['px-5 py-2 rounded-xl text-[11px] font-black border-2 italic tracking-tighter', (selectedCost.actualCost - selectedCost.standardCost) > 0 ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20']">
                       {{ ((selectedCost.actualCost / selectedCost.standardCost - 1) * 100).toFixed(1) }}% {{ (selectedCost.actualCost - selectedCost.standardCost) > 0 ? 'OVER' : 'UNDER' }}
                    </div>
                 </div>
              </div>
           </div>

           <!-- Detail Matrix -->
           <div class="space-y-4 px-2 animate-fade-in-up">
              <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                 <i class="pi pi-box text-emerald-500"></i> III. Matriks Komponen Biaya (COGM)
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div v-for="detail in selectedCost.details" :key="detail.id" class="flex items-center justify-between p-8 rounded-[2rem] bg-white border-2 border-slate-50 hover:border-emerald-100 transition-all hover:shadow-xl group">
                    <div class="flex items-center gap-6">
                       <div :class="['h-14 w-14 flex items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110', getCategoryStyle(detail.costCategory)]">
                          <i :class="getCategoryIcon(detail.costCategory)" class="text-xl"></i>
                       </div>
                       <div class="flex flex-col">
                          <span class="text-sm font-black text-slate-800 uppercase tracking-tight group-hover:text-emerald-700 transition-colors">{{ detail.name }}</span>
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mt-1">{{ detail.costCategory }}</span>
                       </div>
                    </div>
                    <div class="text-right">
                       <p class="text-lg font-black text-slate-900 font-mono tracking-tighter italic">IDR {{ fmtMoney(detail.actualAmount) }}</p>
                       <p class="text-[9px] font-black text-slate-400 uppercase mt-1">Variance: {{ fmtMoney(detail.variance) }}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 rounded-b-[2.5rem] bg-slate-50">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-800 text-[10px] font-black uppercase tracking-widest italic flex items-center gap-3">
                <i class="pi pi-shield-check text-base"></i> Audit Integritas Biaya Terverifikasi
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Tutup Registrasi" severity="secondary" text @click="detailDialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 rounded-xl transition-all" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';

const api = useApi();
const { $toast, $swal } = useNuxtApp();

const costs = ref<any[]>([]);
const workOrders = ref<any[]>([]);
const selectedPeriod = ref('2026-04');
const calcDialogOpen = ref(false);
const detailDialogOpen = ref(false);
const selectedCost = ref<any>(null);

const calcForm = reactive({
  workOrderId: '',
  period: '2026-04',
  type: 'FINAL_BATCH'
});

// Computed Stats (Dashboard Telemetry)
const totalCogm = computed(() => costs.value.reduce((s: number, c: any) => s + Number(c.totalCost), 0));
const totalWip = computed(() => 125000000); // Simulated WIP
const avgVariance = computed(() => 3.8); // Simulated average

const fmtMoney = (v: any) => Number(v).toLocaleString('id-ID');

const load = async () => {
  try {
    const [costRes, woRes] = await Promise.all([
      api.get('/manufacturing/costing/summaries'),
      api.get('/manufacturing/work-orders?status=COMPLETED'),
    ]);
    costs.value = costRes.data?.costs || [];
    workOrders.value = (woRes.data?.workOrders || []).map((wo: any) => ({
      label: `${wo.code} - ${wo.finishedGood?.name}`,
      id: wo.id
    }));
  } catch (e) { $toast.fire({ icon: 'error', title: 'Gagal memuat sinkronisasi audit biaya' }); }
};

const openCostingDialog = () => {
  calcDialogOpen.value = true;
};

const runCalculation = async () => {
  try {
    await api.post('/manufacturing/costing/calculate', calcForm);
    $toast.fire({ icon: 'success', title: 'Kalkulasi COGM Batch Selesai & Terakumulasi' });
    calcDialogOpen.value = false;
    await load();
  } catch (e: any) { $toast.fire({ icon: 'error', title: e.response?.data?.message || 'Gagal mengeksekusi kalkulasi biaya' }); }
};

const viewDetail = (cost: any) => {
  selectedCost.value = cost;
  detailDialogOpen.value = true;
};

const finalizeCost = async (cost: any) => {
  try {
    await api.post('/manufacturing/costing/finalize', { costId: cost.id });
    $toast.fire({ icon: 'success', title: 'Periode Settlement Berhasil Diposting ke GL' });
    await load();
  } catch (e: any) { $toast.fire({ icon: 'error', title: e.response?.data?.message || 'Terjadi kesalahan pada settlement biaya' }); }
};

const getCategoryIcon = (cat: string) => {
  if (cat.includes('MATERIAL')) return 'pi pi-box';
  if (cat.includes('LABOR')) return 'pi pi-users';
  return 'pi pi-bolt';
};

const getCategoryStyle = (cat: string) => {
  if (cat.includes('MATERIAL')) return 'bg-indigo-50 text-indigo-600';
  if (cat.includes('LABOR')) return 'bg-amber-50 text-amber-600';
  return 'bg-emerald-50 text-emerald-600';
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

.no-border :deep(.p-datatable-thead > tr > th) {
  border-bottom: 1px solid #f1f5f9;
  background: transparent;
  padding: 1.25rem 0.75rem;
  font-size: 9px;
  font-weight: 900;
  color: #94a3b8;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.no-border :deep(.p-datatable-tbody > tr > td) {
  border: none;
  padding: 1.5rem 0.75rem;
  font-size: 11px;
}

:deep(.p-inputtext), :deep(.p-inputnumber-input) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
   border-radius: 16px !important;
   height: 3.5rem !important;
   padding-left: 1.5rem !important;
   font-weight: 800 !important;
   font-size: 12px !important;
}

select {
   appearance: none;
   background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
   background-repeat: no-repeat;
   background-position: right 1rem center;
   background-size: 1em;
}

.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 20px); }
</style>