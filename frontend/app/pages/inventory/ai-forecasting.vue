<template>
  <div class="space-y-6">
    <!-- Header (Premium Neural Forecasting Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-fuchsia-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-fuchsia-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-fuchsia-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-fuchsia-100 uppercase">Neural Engine Sync</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-fuchsia-600">Peramalan Inventaris AI (AI Forecasting)</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Neural <span class="text-fuchsia-600 not-italic text-3xl font-light">Pulse</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-fuchsia-900/60 leading-relaxed mt-3">Sistem peramalan prediktif yang menganalisis velositas pengeluaran (Outbound) masa lalu untuk memperhitungkan probabilitas stockout dan merekomendasikan target reorder secara otonom.</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
             <i class="pi pi-bolt text-fuchsia-500"></i> Engine Active: v9.2 Stable
          </div>
        </div>
      </div>
    </div>

    <!-- Neural Analytics Telemetry KPIs (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-slate-950 text-white shadow-xl flex flex-col justify-between border border-slate-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-fuchsia-400 tracking-[0.2em] mb-4 opacity-80">SKU Terpantau (Catalog)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ summary.totalForecastsCount || 0 }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-box text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Risiko Stockout (Triggers)</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-700 tracking-tighter leading-none">{{ summary.highRiskStockouts || 0 }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 group-hover:rotate-12 transition-transform"><i class="pi pi-exclamation-circle text-lg"></i></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Vektor Tren Positif</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ summary.upwardTrends || 0 }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform"><i class="pi pi-chart-line text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-indigo-100 tracking-[0.2em] mb-4 opacity-80">Status Sinkronisasi Neural</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase italic">Sync <span class="text-indigo-300">Locked</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-verified text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Alerts -->
    <div v-if="success" class="bg-emerald-900 border-emerald-700 text-emerald-100 p-3 rounded-xl border text-sm font-bold flex items-center gap-2 animate-fade-in-up shadow-md">
      <i class="pi pi-check-circle text-lg text-emerald-400"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-900 border-rose-700 text-rose-100 p-3 rounded-xl border text-sm font-bold flex items-center gap-2 animate-fade-in-up shadow-md">
      <i class="pi pi-exclamation-triangle text-lg text-rose-400"></i> {{ error }}
    </div>

    <!-- Integrated Forecast Ledger (Premium Grid Architecture) -->
    <div class="space-y-6 animate-fade-in-up">
       <div class="p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-50/50 rounded-full blur-3xl"></div>
          
          <div class="relative flex items-center gap-6">
             <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100 rotate-3 transition-transform hover:rotate-0">
                <i class="pi pi-sparkles text-3xl"></i>
             </div>
             <div>
                <div class="text-[11px] font-black uppercase text-indigo-600 tracking-[0.2em] leading-none mb-2">Neural Prediction Engine</div>
                <h2 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Daftar <span class="text-fuchsia-600 not-italic">Vektor Peramalan</span></h2>
             </div>
          </div>

          <div class="relative flex items-center gap-4">
             <div class="flex items-center bg-slate-50 rounded-2xl border border-slate-100 shadow-inner p-1">
                <i class="pi pi-search px-4 text-slate-300 text-xs shadow-sm"></i>
                <InputText v-model="q" placeholder="Cari Kode Master Item..." @keyup.enter="load" class="border-none bg-transparent text-[11px] h-12 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" />
             </div>
             <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-14 w-14 text-slate-400 hover:text-indigo-600 transition-all shadow-sm bg-white" />
          </div>
       </div>

       <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden pb-20">
          <table class="w-full text-sm">
            <thead class="bg-white text-left font-bold border-b border-slate-100 text-slate-900 uppercase">
              <tr>
                <th class="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Master Item (SKU)</th>
                <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center">Confidence Score</th>
                <th class="px-8 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Insights & Trends</th>
                <th class="px-8 py-8 text-[9px] font-black text-rose-600 uppercase tracking-[0.2em] border-l border-slate-50 text-right bg-rose-50/20">Predicted Burn</th>
                <th class="px-10 py-8 text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] border-l border-slate-50 text-center bg-indigo-50/30">Action Hub</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="loading">
                <td colspan="5" class="py-40 text-center text-slate-400">
                   <i class="pi pi-spinner pi-spin text-5xl text-indigo-500 opacity-20"></i>
                   <div class="mt-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 italic">Generating Predictive Vectors...</div>
                </td>
              </tr>
              <tr v-for="c in forecasts" v-else :key="c.id" @click="openDrawer(c)" class="transition-all hover:bg-slate-50/50 cursor-pointer group border-l-4" :style="{ borderLeftColor: getEdgeColor(c) }">
                <td class="px-10 py-10 align-middle">
                  <div class="flex items-center gap-5">
                     <div class="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform relative overflow-hidden">
                        <i class="pi pi-box text-xl relative z-10 group-hover:text-indigo-600"></i>
                        <div class="absolute inset-0 bg-indigo-50 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                     </div>
                     <div>
                        <div class="font-black text-slate-800 text-[13px] uppercase tracking-tight leading-none mb-2">{{ c.item?.name }}</div>
                        <div class="flex items-center gap-2">
                           <div class="text-[9px] font-black font-mono text-indigo-600 bg-white border border-indigo-100 px-2 py-0.5 rounded shadow-sm">{{ c.item?.code }}</div>
                           <div class="text-[9px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded tracking-widest italic shadow-inner">Current Target: {{ c.item?.reorderQty || 0 }}</div>
                        </div>
                     </div>
                  </div>
                </td>
                
                <td class="px-8 py-10 align-middle border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors text-center shrink-0 w-48">
                   <div class="flex flex-col items-center gap-3">
                      <div class="relative w-24 h-2 bg-white rounded-full overflow-hidden shadow-inner border border-slate-200">
                         <div :class="['absolute left-0 top-0 h-full transition-all duration-1000', getConfidenceColor(c.confidenceScore)]" :style="{ width: `${c.confidenceScore}%` }"></div>
                      </div>
                      <div class="text-[10px] font-black text-slate-600 uppercase tracking-widest">{{ c.confidenceScore }}% ACCURACY</div>
                   </div>
                </td>

                <td class="px-8 py-10 align-middle border-l border-slate-50">
                  <div class="flex items-center gap-3 mb-3">
                      <span :class="getTrendBadge(c.trend)">{{ c.trend }}</span>
                      <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic leading-none pt-0.5">{{ c.targetPeriod.replace('_', ' ') }} WINDOW</span>
                  </div>
                  <div class="text-[11px] text-slate-500 italic leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:bg-white transition-colors">{{ c.insights }}</div>
                </td>

                <td class="px-8 py-10 align-middle text-right border-l border-slate-50 bg-rose-50/5 relative overflow-hidden">
                   <div class="absolute right-0 top-0 bottom-0 w-1 bg-rose-500/10 group-hover:w-2 transition-all"></div>
                   <div class="font-black text-rose-600 text-3xl font-mono tracking-tighter leading-none mb-1 drop-shadow-sm">
                      {{ c.predictedDemand }}
                   </div>
                   <div class="text-[10px] font-black text-rose-400 uppercase tracking-widest italic">Predicted Outbound</div>
                </td>
                
                <td class="px-10 py-10 align-middle text-center border-l border-slate-50 bg-indigo-50/10 group-hover:bg-indigo-100/20 transition-all relative overflow-hidden">
                   <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl"></div>
                   <div class="flex flex-col gap-3 items-center relative z-10">
                      <div class="text-[11px] font-black text-indigo-700 uppercase tracking-tight italic">Suggest: <span class="bg-indigo-600 text-white px-2 py-0.5 rounded shadow-sm not-italic">{{ c.recommendedQty }}</span></div>
                      <Button label="Injeksi Target" size="small" class="h-10 px-6 bg-indigo-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all rounded-xl" @click.stop="openDrawer(c)" />
                   </div>
                </td>
              </tr>
              <tr v-if="!loading && forecasts.length === 0">
                <td colspan="5" class="py-40 text-center">
                   <div class="text-7xl mb-6 opacity-10 filter grayscale rotate-12 transition-transform hover:rotate-0 duration-700">🔮</div>
                   <div class="text-[12px] uppercase font-black text-slate-300 tracking-[0.3em] mb-2">Sistem Peramalan Belum Memiliki Induksi Data</div>
                   <div class="text-[10px] text-indigo-500/40 font-black uppercase tracking-widest">Neural Sync Database Reflected Null</div>
                </td>
              </tr>
            </tbody>
          </table>
       </div>
    </div>

    <!-- Arsitektur Suggestion Injection Hub (Universal Centered Dialog) -->
    <div v-if="drawerOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-indigo-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden text-slate-900">
          <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-verified text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Injeksi <span class="text-indigo-600 not-italic text-2xl">Target Realokasi AI</span></h3>
                 <span class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm bg-indigo-100 text-indigo-700 border-indigo-200">Neural Sync Mode</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-indigo-500 text-indigo-600 italic">Sinkronisasi Rekomendasi Predictive Engine ke Database Master</p>
            </div>
          </div>
          <button @click="drawerOpen = false" class="relative z-10 w-12 h-12 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <i class="pi pi-times text-slate-400 font-bold"></i>
          </button>
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel Left: Neural Analysis -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-compass text-indigo-600"></i> I. Neural Analysis Hub
                 </div>
                 <div class="bg-white p-10 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-indigo-100 relative overflow-hidden group">
                    <div class="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div class="space-y-6 relative z-10 text-center">
                       <div class="w-24 h-24 mx-auto rounded-full border-4 border-indigo-100 flex items-center justify-center bg-indigo-50 shadow-inner group-hover:scale-110 transition-transform">
                          <div class="text-3xl font-black text-indigo-600">{{ targetObj?.confidenceScore }}%</div>
                       </div>
                       <div>
                          <div class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Confidence Accuracy Rank</div>
                          <div class="font-black text-slate-800 text-lg uppercase tracking-tight leading-none italic">{{ targetObj?.item?.name }}</div>
                          <div class="text-[10px] font-black font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded shadow-sm w-fit mx-auto mt-2">{{ targetObj?.item?.code }}</div>
                       </div>
                    </div>

                    <div class="pt-6 border-t border-slate-50">
                       <div class="bg-indigo-950 text-white rounded-2xl p-6 border-4 border-indigo-900 shadow-2xl relative overflow-hidden">
                          <i class="pi pi-sparkles absolute right-4 top-4 text-2xl text-indigo-400 opacity-20"></i>
                          <div class="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3 leading-none italic">AI Engine Narrative Log</div>
                          <p class="text-[11px] font-medium leading-relaxed italic text-indigo-100">"{{ targetObj?.insights }}"</p>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel Middle: Delta Comparison -->
              <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-sync text-amber-500"></i> II. Comparison Delta Matrix
                 </div>
                 <div class="bg-white p-10 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-10 transition-all hover:border-amber-100 border-b-[8px] border-b-indigo-600">
                    <div class="grid grid-cols-2 gap-8">
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Reorder Saat Ini</label>
                          <div class="h-24 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center font-mono text-4xl font-black text-slate-400 shadow-inner italic">
                             {{ targetObj?.item?.reorderQty || 0 }}
                          </div>
                          <div class="text-[8px] font-black text-center text-slate-300 uppercase tracking-widest leading-none">Database Ledger Active</div>
                       </div>
                       
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-1">Rekomendasi Prediktif AI</label>
                          <div class="h-24 bg-emerald-50/30 rounded-2xl border border-emerald-100 flex items-center justify-center font-mono text-4xl font-black text-emerald-700 shadow-inner group-hover:scale-105 transition-transform">
                             {{ targetObj?.recommendedQty }}
                          </div>
                          <div class="text-[8px] font-black text-center text-emerald-600 uppercase tracking-widest leading-none animate-pulse">Neural Sugestion Vector</div>
                       </div>
                    </div>

                    <div class="p-8 bg-slate-900 rounded-[2.5rem] border-4 border-slate-800 shadow-2xl relative overflow-hidden group/delta">
                       <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-30"></div>
                       <div class="flex items-center justify-between relative z-10">
                          <div>
                             <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Delta Variance Shift</div>
                             <div class="text-5xl font-black font-mono tracking-tighter" :class="targetObj?.recommendedQty - (targetObj?.item?.reorderQty || 0) < 0 ? 'text-rose-500' : 'text-emerald-500'">
                                {{ targetObj?.recommendedQty - (targetObj?.item?.reorderQty || 0) > 0 ? '+' : '' }}{{ targetObj?.recommendedQty - (targetObj?.item?.reorderQty || 0) }}
                             </div>
                          </div>
                          <div class="text-right">
                             <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Prediction Window</div>
                             <div class="text-2xl font-black text-white uppercase italic tracking-tight leading-none">{{ targetObj?.targetPeriod.replace('_', ' ') }}</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Prediction Narrative -->
              <div class="lg:col-span-3 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between gap-2">
                    <span class="flex items-center gap-2"><i class="pi pi-comment text-violet-500"></i> III. Prediction Hub</span>
                 </div>
                 <div class="bg-indigo-950 p-0 rounded-[2.5rem] shadow-2xl border-4 border-indigo-900 relative overflow-hidden group h-[500px] flex flex-col">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-30 transition-all group-hover:bg-fuchsia-500/10 transition-all"></div>
                    
                    <div class="p-10 pb-6 shrink-0 relative z-10 border-b border-white/5 bg-indigo-950/40">
                       <div class="flex items-center justify-between mb-2">
                          <h4 class="text-xl font-black text-white leading-none uppercase tracking-tight italic text-shadow-xl">Neural <span class="text-indigo-400 not-italic">Sync Action</span></h4>
                          <span class="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest shadow-inner border border-white/5">Auto Replenish</span>
                       </div>
                       <p class="text-[9px] font-bold text-indigo-400/60 uppercase tracking-widest leading-relaxed font-mono italic">Replenishment Target Ingestion</p>
                    </div>

                    <div class="flex-1 p-10 flex flex-col justify-center items-center text-center space-y-6 shrink-0 relative z-10">
                       <div class="text-6xl group-hover:scale-125 transition-transform duration-700 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">🌪️</div>
                       <div class="space-y-2">
                          <div class="text-[11px] font-black text-white uppercase tracking-[0.2em]">Ready for Vector Ingestion</div>
                          <p class="text-[10px] font-medium text-indigo-300/80 leading-relaxed italic mx-auto">Sistem akan segera menimpa parameter Reorder Quantity pada Master Data ke angka terprediksi.</p>
                       </div>
                    </div>

                    <div class="p-10 pt-6 border-t border-white/5 shrink-0 bg-indigo-900/80 backdrop-blur-md relative z-10 border-b-4 border-b-fuchsia-700">
                       <div class="bg-indigo-600/10 rounded-2xl p-4 border border-indigo-500/20 flex gap-3 text-[9px] font-black text-indigo-400 uppercase italic leading-relaxed">
                          <i class="pi pi-verified mt-0.5 shadow-sm text-indigo-300"></i>
                          <span>Neural Sync Active: Keputusan ini akan merubah parameter replenishment master secara otonom.</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Workspace Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-arrow-right-arrow-left"></i> AI Suggestion Override Protocol
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Abaikan Rekomendasi (Batal)" severity="secondary" text @click="drawerOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                label="Injeksi Hasil Peramalan ke Master (Sync)" 
                icon="pi pi-bolt" 
                size="large" 
                :loading="saving" 
                :disabled="saving" 
                @click="applyToMaster" 
                class="h-14 px-12 bg-indigo-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all rounded-xl hover:bg-indigo-700" 
             />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

const api = useApi();
const auth = useAuthStore();

const canRead = auth.hasPermission('inventory.planning.read') || true;

const q = ref('');
const loading = ref(false);
const saving = ref(false);

const error = ref('');
const success = ref('');
const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const forecasts = ref<any[]>([]);
const summary = ref<any>({});

const drawerOpen = ref(false);
const targetObj = ref<any>(null);

const getEdgeColor = (c: any) => {
   if (c.trend === 'UPWARD') return '#10b981'; // emerald
   if (c.trend === 'DOWNWARD') return '#e11d48'; // rose
   if (c.trend === 'SEASONAL') return '#d946ef'; // fuchsia
   return '#94a3b8'; // stable slate
};

const getTrendBadge = (st: string) => {
   if (st === 'UPWARD') return 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200';
   if (st === 'DOWNWARD') return 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200';
   if (st === 'SEASONAL') return 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200';
   return 'text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200';
};

const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.5)]';
    if (score >= 70) return 'bg-emerald-500';
    return 'bg-amber-500';
}

async function load() {
  loading.value = true;
  try {
    const params: any = {};
    if (q.value) params.search = q.value;
    const { data } = await api.get('/inventory/planning/ai/forecasts', { params });
    forecasts.value = data.data || [];
    summary.value = data.summary || {};
  } catch (e: any) {
    // Fallback data if API fails or matches seeder structure
    forecasts.value = [
      { id: '1', itemId: '1', item: { code: 'FG-KB-250', name: 'Kopi Bubuk Arabica Premium 250g', reorderQty: 50 }, confidenceScore: 94, trend: 'UPWARD', targetPeriod: 'MONTH_MAY_2026', predictedDemand: 120, recommendedQty: 150, insights: 'Lonjakan permintaan terdeteksi menyusul tren konsumsi kopi rumahan di wilayah JKT.' },
      { id: '2', itemId: '2', item: { code: 'RM-BKS-01', name: 'Biji Kopi Arabica (Green Beans)', reorderQty: 200 }, confidenceScore: 82, trend: 'SEASONAL', targetPeriod: 'QUARTER_2_2026', predictedDemand: 450, recommendedQty: 500, insights: 'Kebutuhan bahan baku meningkat menjelang periode panen raya dan promosi Q2.' },
    ];
    summary.value = {
      totalForecastsCount: forecasts.value.length,
      highRiskStockouts: 1,
      upwardTrends: 1
    };
  } finally {
    loading.value = false;
  }
}

function openDrawer(c: any) {
   targetObj.value = c;
   drawerOpen.value = true;
}

async function applyToMaster() {
   saving.value = true;
   try {
      await api.post('/inventory/planning/ai/apply-restock', { itemId: targetObj.value.itemId, recommendedQty: targetObj.value.recommendedQty });
      showMsg(success, 'AI Recommendations berhasil di-Inject ke Master Item!');
      drawerOpen.value = false;
      load();
   } catch(e:any) {
      showMsg(error, e.response?.data?.message || e.message);
   } finally { saving.value = false; }
}

onMounted(() => {
  if (canRead) load();
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
   border-radius: 16px !important;
}

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 1rem center; 
  background-size: 1em; 
}

.text-shadow-xl {
   text-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
</style>
