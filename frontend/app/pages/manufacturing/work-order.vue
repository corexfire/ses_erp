<template>
  <div class="space-y-4 font-sans text-slate-900 custom-scrollbar overflow-x-hidden">

    <!-- Header (Premium Shop Floor Operations Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0 animate-fade-in-up">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-100 font-sans">Shop Floor Hub</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Perintah Kerja Produksi</span>
          </div>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Work Order <span class="text-emerald-600 not-italic text-xl md:text-2xl lg:text-3xl">Operations Center</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-emerald-900/60 leading-relaxed mt-3">Sistem kendali perintah kerja produksi terintegrasi. Monitor alur kerja dari persiapan bahan hingga output fisik dengan presisi telemetri manufaktur.</p>
        </div>
        <div class="flex items-center gap-3">
           <div class="hidden items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-emerald-600 shadow-sm md:flex group/stats">
            <i class="pi pi-list text-emerald-500 group-hover/stats:rotate-180 transition-transform duration-700" />
            <span>{{ workOrders.length }} PRODUCTION TICKETS LOGGED</span>
          </div>
          <Button label="+ Registrasi WO Baru" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Production Telemetry Dashboard (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div @click="filterByStatus('')" class="p-6 rounded-2xl bg-emerald-950 text-white shadow-xl flex flex-col justify-between border border-emerald-900 transition-all hover:bg-black group cursor-pointer" :class="!statusFilter ? 'ring-4 ring-emerald-500 ring-offset-2' : ''">
        <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 opacity-80">Total Perintah Kerja</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">{{ workOrders.length }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-list text-lg"></i>
          </div>
        </div>
      </div>

      <div @click="filterByStatus('RELEASED')" class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group cursor-pointer" :class="statusFilter === 'RELEASED' ? 'ring-4 ring-emerald-500 ring-offset-2' : ''">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Released & In-Progress</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ workOrders.filter(x => ['RELEASED', 'IN_PROGRESS'].includes(x.status)).length }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 group-hover:rotate-12 transition-transform"><i class="pi pi-send text-lg"></i></div>
        </div>
      </div>

      <div @click="filterByStatus('COMPLETED')" class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group cursor-pointer" :class="statusFilter === 'COMPLETED' ? 'ring-4 ring-emerald-500 ring-offset-2' : ''">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Akurasi Penyelesaian</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-700 tracking-tighter leading-none">
             {{ workOrders.length > 0 ? (workOrders.filter(w => w.status === 'COMPLETED').length / workOrders.length * 100).toFixed(0) : '0' }}<span class="text-sm md:text-lg lg:text-xl ml-1 font-black">%</span>
          </h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform"><i class="pi pi-verified text-lg"></i></div>
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
              <i class="pi pi-list-check text-xl"></i>
           </div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Perintah Kerja</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Operations Tracking Record</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="q" placeholder="Cari Kode WO / Produk..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" />
          </div>
          <select v-model="statusFilter" class="h-10 w-40 bg-white border border-slate-200 rounded-xl px-4 text-[9px] font-black uppercase tracking-widest text-slate-600 outline-none focus:ring-4 focus:ring-emerald-100 transition-all appearance-none cursor-pointer">
              <option value="">Semua Status</option>
              <option value="DRAFT">Draft</option>
              <option value="RELEASED">Released</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
          </select>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-emerald-600 transition-all shadow-sm bg-white border border-slate-200" />
        </div>
      </div>

      <!-- Ledger Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Identitas WO</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Target Luaran (FG)</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Matrix Produksi</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-48">Status & Audit</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-44 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-emerald-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Sinkronisasi armada operasional...</div>
              </td>
            </tr>
            
            <tr v-for="wo in filteredWorkOrders" :key="wo.id" @click="openDetail(wo)" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-emerald-400 cursor-pointer">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div :class="priorityDot(wo.priority)" class="w-1.5 h-10 rounded-full shrink-0 shadow-sm animate-pulse"></div>
                    <div>
                       <div class="font-mono text-[12px] font-black text-slate-500 tracking-tight group-hover:text-emerald-700 transition-colors uppercase leading-none mb-1">
                          {{ wo.code }}
                       </div>
                       <div class="mt-2 flex items-center gap-2">
                          <span class="text-[8px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">REF: {{ wo.productionOrder || 'MANUAL' }}</span>
                          <span v-if="wo.scheduleType === 'URGENT'" class="text-[8px] font-black bg-rose-100 text-rose-600 px-2 py-0.5 rounded border border-rose-200 uppercase tracking-widest italic">URGENT</span>
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 group-hover:scale-110 transition-transform">
                     <i class="pi pi-box text-sm"></i>
                  </div>
                  <div>
                    <div class="text-[11px] font-black text-slate-800 uppercase tracking-tight leading-none mb-1">{{ wo.finishedGood?.code }}</div>
                    <div class="text-[9px] font-bold text-slate-400 uppercase truncate max-w-[150px]">{{ wo.finishedGood?.name }}</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="flex items-center justify-between mb-2">
                    <div class="text-[10px] font-black text-slate-700 font-mono tracking-tighter italic">
                       {{ Number(wo.qtyProduced).toLocaleString() }} <span class="text-slate-400">/</span> {{ Number(wo.qtyPlanned).toLocaleString() }} {{ wo.uomCode || 'PCS' }}
                    </div>
                    <span class="text-[10px] font-black text-emerald-600 font-mono">{{ progressPct(wo) }}%</span>
                 </div>
                 <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                    <div :class="progressColor(wo)" class="h-full shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all duration-1000 ease-out" :style="{ width: progressPct(wo) + '%' }"></div>
                 </div>
                 <div class="mt-2 flex items-center gap-2">
                    <i class="pi pi-map-marker text-[9px] text-slate-300"></i>
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{{ wo.workCenter || 'STOCK' }}</span>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors relative">
                 <div class="relative flex flex-col items-center gap-2">
                    <span :class="statusBadge(wo.status)" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm">
                       <i :class="statusDot(wo.status)" class="h-1.5 w-1.5 rounded-full mr-2"></i> {{ wo.status }}
                    </span>
                    <div v-if="wo.plannedEndDate" class="flex items-center gap-2 mt-1">
                       <i class="pi pi-calendar-clock text-[9px] opacity-40"></i>
                       <span :class="isOverdue(wo) ? 'text-rose-500 font-bold' : 'text-slate-400'" class="text-[9px] font-mono font-black uppercase">DUE: {{ fmtDate(wo.plannedEndDate) }}</span>
                    </div>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100" @click.stop>
                    <div class="flex gap-1.5">
                       <Button v-if="wo.status === 'DRAFT'" label="RELEASE" @click="release(wo)" class="p-1.5 bg-emerald-600 border-none text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-700 shadow-xl shadow-emerald-100" />
                       <Button v-if="wo.status === 'RELEASED' || wo.status === 'IN_PROGRESS'" label="COMPLETE" @click="openComplete(wo)" class="p-1.5 bg-emerald-600 border-none text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-700 shadow-xl shadow-emerald-100" />
                       <Button v-if="wo.status === 'DRAFT'" icon="pi pi-pencil" @click="openEdit(wo)" class="p-1.5 bg-slate-800 border-none text-white text-[9px] rounded-lg hover:bg-black" />
                    </div>
                    <span class="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Audit Registry</span>
                 </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredWorkOrders.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🏭</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Data perintah kerja tidak ditemukan atau belum ada aktivitas operasional.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Execution Registry (Universal Centered Dialog) Style Alignment -->
    <div v-if="dialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        
        <!-- Registry Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-list-check text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">{{ editingId ? 'Audit' : 'Registrasi' }} <span class="text-emerald-600 not-italic text-2xl">Perintah Kerja</span></h3>
                 <span v-if="editingId" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm bg-emerald-50 text-emerald-700 border-emerald-200">
                    SISTEM AUDIT AKTIF
                 </span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Work Order Registry & Manufacturing Lifecycle Governance</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="closeDialog" class="relative z-10 hover:bg-emerald-50 h-12 w-12 cursor-pointer" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel I: Penugasan & Parameter -->
              <div class="lg:col-span-3 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-shield text-emerald-500"></i> I. Parameter & Audit
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-emerald-100 min-h-[500px]">
                    <div class="space-y-3">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Kode Work Order</label>
                       <InputText v-model="form.code" :disabled="Boolean(editingId)" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black uppercase tracking-widest text-slate-900 shadow-inner focus:ring-4 focus:ring-emerald-400 font-mono" />
                    </div>

                    <div class="space-y-3">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 text-emerald-600 italic">Referensi BOM (Engineering Reference)</label>
                       <select v-model="form.bomId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-tight">
                          <option value="">-- TANPA BOM --</option>
                          <option v-for="b in boms" :key="b.id" :value="b.id">{{ b.code }} · {{ b.name }}</option>
                       </select>
                    </div>

                    <div class="space-y-3">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Prioritas Produksi</label>
                       <div class="flex items-center gap-3">
                          <input type="range" v-model="form.priority" min="1" max="100" class="flex-1 accent-emerald-600" />
                          <span class="w-12 h-12 bg-emerald-950 text-white rounded-xl flex items-center justify-center font-black font-mono text-xs">{{ form.priority }}</span>
                       </div>
                    </div>

                    <div class="pt-4 border-t border-slate-50">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Catatan Produksi</label>
                       <textarea v-model="form.notes" rows="4" class="w-full mt-3 rounded-2xl border-none bg-slate-50 p-4 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-emerald-400 transition-all placeholder-slate-300" placeholder="Instruksi khusus untuk foreman..."></textarea>
                    </div>
                 </div>
              </div>

               <!-- Panel II: Konfigurasi Luaran -->
              <div class="lg:col-span-4 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-box text-amber-500"></i> II. Alokasi Luaran & Lini
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 flex flex-col transition-all hover:border-amber-100 border-b-[8px] border-b-emerald-600 min-h-[500px]">
                    <div class="space-y-3">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Produk (Finished Good)</label>
                       <select v-model="form.finishedGoodItemId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-tight">
                          <option value="">-- PILIH PRODUK --</option>
                          <option v-for="it in items" :key="it.id" :value="it.id">{{ it.code }} · {{ it.name }}</option>
                       </select>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                       <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty Terencana</label>
                          <InputText v-model="form.qtyPlanned" type="number" class="w-full h-14 bg-slate-950 text-emerald-400 border-none rounded-2xl px-6 text-xl font-black font-mono shadow-inner focus:ring-4 focus:ring-emerald-400" />
                       </div>
                       <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Satuan (UOM)</label>
                          <InputText v-model="form.uomCode" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black uppercase tracking-widest text-slate-900 shadow-inner" placeholder="PCS" />
                       </div>
                    </div>

                    <div class="space-y-3">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lini Produksi / Work Center</label>
                       <div class="relative group/wc">
                          <i class="pi pi-building absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600"></i>
                          <InputText v-model="form.workCenter" class="w-full h-14 bg-emerald-50 text-emerald-900 border-emerald-100 border rounded-2xl pl-12 pr-6 text-[11px] font-black uppercase tracking-widest shadow-inner placeholder:text-emerald-900/30" placeholder="Line Produksi A" />
                       </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 mt-auto">
                       <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tgl Mulai Aktif</label>
                          <InputText v-model="form.plannedStartDate" type="date" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 text-[11px] font-black uppercase shadow-inner" />
                       </div>
                       <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tgl Penyelesaian</label>
                          <InputText v-model="form.plannedEndDate" type="date" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 text-[11px] font-black uppercase shadow-inner" />
                       </div>
                    </div>
                 </div>
              </div>

               <!-- Panel III: Audit Struktur & Operasi -->
              <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center justify-between">
                    <span class="flex items-center gap-2"><i class="pi pi-cog text-emerald-500"></i> III. Struktur & Routing</span>
                    <div class="flex gap-2">
                       <button @click="addComponent" class="p-2 px-4 bg-emerald-100 text-emerald-700 border-none text-[8px] font-black rounded hover:bg-emerald-200 transition-colors uppercase tracking-widest shadow-sm">
                          + Komponen
                       </button>
                       <button @click="addOperation" class="p-2 px-4 bg-emerald-950 text-white border-none text-[8px] font-black rounded hover:bg-black transition-colors uppercase tracking-widest shadow-sm">
                          + Operasi
                       </button>
                    </div>
                 </div>
                 <div class="bg-emerald-950 p-8 rounded-[2.5rem] shadow-2xl border-4 border-emerald-900 relative overflow-hidden group min-h-[500px] flex flex-col">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl opacity-30"></div>
                    
                    <div class="flex-1 overflow-y-auto custom-scrollbar">
                       <div class="space-y-8 pb-10">
                          
                          <!-- Components Section -->
                          <div v-if="form.components.length > 0">
                             <h4 class="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                                <i class="pi pi-box"></i> BOM COMPONENTS ({{ form.components.length }})
                             </h4>
                             <div class="space-y-3">
                                <div v-for="(c, idx) in form.components" :key="'c-'+idx" class="bg-white/5 rounded-2xl p-4 border border-white/10 group/line relative">
                                   <div class="flex justify-between items-start gap-4">
                                      <div class="flex-1 min-w-0">
                                         <select v-model="c.itemId" class="w-full bg-transparent border-none text-[11px] font-black text-emerald-400 uppercase tracking-tight focus:ring-0 appearance-none cursor-pointer">
                                            <option value="">-- MINTA ITEM --</option>
                                            <option v-for="it in items" :key="'it-c-'+it.id" :value="it.id">{{ it.code }} · {{ it.name }}</option>
                                         </select>
                                         <div class="flex items-center gap-4 mt-3">
                                            <div class="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                                               <span class="text-[8px] text-emerald-100/40 font-black uppercase">QTY:</span>
                                               <input v-model="c.qtyRequired" type="number" class="w-16 bg-transparent border-none text-xs font-black text-emerald-400 p-0 focus:ring-0 outline-none text-center font-mono" />
                                            </div>
                                            <div class="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                                               <span class="text-[8px] text-emerald-100/40 font-black uppercase">METHOD:</span>
                                               <select v-model="c.issueMethod" class="bg-transparent border-none text-[9px] font-black text-white p-0 focus:ring-0 focus:bg-emerald-950">
                                                  <option value="BACKFLUSH">BACKFLUSH</option>
                                                  <option value="MANUAL">MANUAL</option>
                                               </select>
                                            </div>
                                         </div>
                                      </div>
                                      <Button icon="pi pi-trash" @click="removeComponent(idx)" class="h-8 w-8 bg-rose-500/10 text-rose-400 border-none rounded-lg hover:bg-rose-500/20" />
                                   </div>
                                </div>
                             </div>
                          </div>

                          <!-- Operations Section -->
                          <div v-if="form.operations.length > 0">
                             <h4 class="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                                <i class="pi pi-cog"></i> ROUTING STEPS ({{ form.operations.length }})
                             </h4>
                             <div class="space-y-3">
                                <div v-for="(op, idx) in form.operations" :key="'op-'+idx" class="bg-white/5 rounded-2xl p-4 border border-white/5 group/op transition-all hover:bg-white/10 relative overflow-hidden">
                                   <div class="flex gap-4">
                                      <div class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-[11px] font-black border border-emerald-500/20 shadow-inner group-hover:scale-110 transition-transform">
                                         {{ op.operationNo || (idx + 1) * 10 }}
                                      </div>
                                      <div class="flex-1 space-y-4">
                                         <div class="flex gap-4">
                                            <input v-model="op.description" placeholder="Deskripsi Operasi..." class="flex-1 bg-transparent border-b border-white/10 text-[12px] font-black text-white focus:border-emerald-400 outline-none pb-1 transition-all placeholder:text-white/20" />
                                            <input v-model="op.workstation" placeholder="Workstation..." class="w-32 bg-transparent border-b border-white/10 text-[10px] font-black text-emerald-400 focus:border-emerald-400 outline-none pb-1 transition-all placeholder:text-emerald-400/20 uppercase" />
                                         </div>
                                         <div class="flex items-center gap-6">
                                            <div class="flex items-center gap-2">
                                               <i class="pi pi-clock text-[9px] text-emerald-500/60"></i>
                                               <span class="text-[8px] font-black text-emerald-100/40 uppercase">Setup:</span>
                                               <input v-model="op.setupTime" type="number" class="w-12 bg-black/40 border-none rounded-lg text-xs font-black text-white p-1 text-center font-mono outline-none focus:ring-1 focus:ring-emerald-500" />
                                            </div>
                                            <div class="flex items-center gap-2">
                                               <i class="pi pi-user text-[9px] text-emerald-500/60"></i>
                                               <span class="text-[8px] font-black text-emerald-100/40 uppercase">Labor:</span>
                                               <input v-model="op.laborHours" type="number" class="w-12 bg-black/40 border-none rounded-lg text-xs font-black text-white p-1 text-center font-mono outline-none focus:ring-1 focus:ring-emerald-500" />
                                            </div>
                                         </div>
                                      </div>
                                      <Button icon="pi pi-trash" @click="removeOperation(idx)" class="h-8 w-8 bg-rose-500/10 text-rose-400 border-none rounded-lg hover:bg-rose-500/20" />
                                   </div>
                                </div>
                             </div>
                          </div>

                          <div v-if="form.components.length === 0 && form.operations.length === 0" class="py-24 text-center text-white/10">
                             <i class="pi pi-box text-6xl mb-4"></i>
                             <div class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/40 italic">Struktur fabrikasi kosong. Tambahkan komponen atau routing untuk memulai audit teknis.</div>
                          </div>

                       </div>
                    </div>
                 </div>
              </div>

           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-shield-check"></i> Audit Integritas Registry Aktif
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batalkan Sesi" severity="secondary" text @click="closeDialog" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                label="Simpan Registrasi Produksi" 
                icon="pi pi-save" 
                size="large" 
                :loading="saving"
                :disabled="saving || !form.code || !form.finishedGoodItemId || !form.qtyPlanned"
                @click="save" 
                class="h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
          </div>
        </div>
      </div>
    </div>

    <!-- Final Output Audit Dialog (Legacy: Complete Dialog) Alignment -->
    <transition name="modal">
      <div v-if="completeDialogOpen" class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <div class="relative z-10 w-full max-w-md rounded-[2.5rem] bg-white p-12 shadow-2xl border-b-[12px] border-b-emerald-900 border-4 border-white animate-scale-in">
          <div class="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-100 mx-auto rotate-6 shadow-xl shadow-emerald-50 border-2 border-white">
            <i class="pi pi-check-circle text-3xl text-emerald-600 font-black" />
          </div>
          <h3 class="mt-8 text-center text-3xl font-black text-slate-800 uppercase tracking-tight leading-none italic">Audit Luaran <span class="text-emerald-600 not-italic text-2xl">Fisik</span></h3>
          <p class="mt-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-emerald-500 mx-auto inline-block px-4 ml-1/2 -translate-x-1/2">{{ completingWo?.code }} — Final Stage Registry</p>
          
          <div class="mt-10 space-y-6">
            <div class="space-y-3">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Kuantitas Produksi (Good)</label>
              <InputText v-model="completeForm.qtyProduced" type="number" class="w-full h-14 bg-slate-950 text-emerald-400 border-none rounded-2xl px-6 text-2xl font-black shadow-inner font-mono text-center focus:ring-4 focus:ring-emerald-400" />
            </div>
            <div class="space-y-3">
              <label class="text-[10px] font-black text-rose-500 uppercase tracking-widest px-1 italic">Kuantitas BS / Reject</label>
              <InputText v-model="completeForm.qtyRejected" type="number" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-xl font-black text-rose-700 shadow-inner font-mono text-center focus:ring-4 focus:ring-rose-400" />
            </div>
            <div class="space-y-3">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Catatan Akhir Operasi</label>
              <textarea v-model="completeForm.notes" rows="2" class="w-full rounded-2xl border-none bg-slate-50 p-4 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-emerald-400 transition-all placeholder-slate-300" placeholder="Opsional: Kualitas hasil akhir..."></textarea>
            </div>
          </div>
          
          <div class="mt-10 flex gap-4">
            <Button label="Batalkan" severity="secondary" text @click="completeDialogOpen = false" class="flex-1 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
            <Button 
               label="Posting Audit Final" 
               icon="pi pi-check-circle" 
               :loading="saving"
               :disabled="saving || !completeForm.qtyProduced"
               @click="doComplete" 
               class="flex-1 h-14 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
            />
          </div>
        </div>
      </div>
    </transition>

    <!-- Universal Toast -->
    <transition name="fade">
      <div v-if="toastMsg" :class="toastType === 'error' ? 'bg-rose-900 border-rose-800' : 'bg-emerald-950 border-emerald-900'" class="fixed bottom-10 right-10 z-[200] flex items-center gap-4 rounded-2xl border-2 px-8 py-5 text-white shadow-2xl">
        <div :class="toastType === 'error' ? 'bg-rose-500' : 'bg-emerald-500'" class="flex h-10 w-10 items-center justify-center rounded-xl">
          <i :class="toastType === 'error' ? 'pi-times-circle' : 'pi-check-circle'" class="pi text-lg font-black" />
        </div>
        <div>
          <p class="text-[10px] font-black uppercase tracking-widest opacity-60">Sistem Notifikasi Operasional</p>
          <p class="text-xs font-black uppercase tracking-tight">{{ toastMsg }}</p>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
const api = useApi();

// State
const loading = ref(false);
const saving = ref(false);
const workOrders = ref<any[]>([]);
const items = ref<any[]>([]);
const boms = ref<any[]>([]);
const q = ref('');
const statusFilter = ref('');
const dialogOpen = ref(false);
const editingId = ref<string | null>(null);
const toastMsg = ref<string | null>(null);
const toastType = ref<'success' | 'error'>('success');

// Complete dialog
const completeDialogOpen = ref(false);
const completingWo = ref<any>(null);
const completeForm = reactive({ qtyProduced: '', qtyRejected: '0', notes: '' });

const form = reactive({
  code: '', bomId: '', finishedGoodItemId: '',
  qtyPlanned: '', uomCode: '', workCenter: '',
  scheduleType: 'PLANNED', priority: '50',
  productionOrder: '', plannedStartDate: '',
  plannedEndDate: '', notes: '',
  components: [] as any[],
  operations: [] as any[],
});

// Computed
const filteredWorkOrders = computed(() => {
  return workOrders.value
    .filter(wo => !q.value || wo.code?.toLowerCase().includes(q.value.toLowerCase()) || wo.finishedGood?.code?.toLowerCase().includes(q.value.toLowerCase()))
    .filter(wo => !statusFilter.value || wo.status === statusFilter.value)
    .sort((a, b) => (b.priority || 50) - (a.priority || 50));
});

const stats = computed(() => {
  const all = workOrders.value;
  return [
    { label: 'Total WO', value: all.length, icon: 'pi-list' },
    { label: 'Released / In-Progress', value: all.filter(w => ['RELEASED', 'IN_PROGRESS'].includes(w.status)).length, icon: 'pi-send' },
    { label: 'Completed', value: all.filter(w => w.status === 'COMPLETED').length, icon: 'pi-check-circle' },
    { label: 'Yield Accuracy', value: all.length > 0 ? (all.filter(w => w.status === 'COMPLETED').length/all.length*100).toFixed(0) + '%' : '0%', icon: 'pi-verified' },
  ];
});

// Helpers
const fmtDate = (v: any) => {
  if (!v) return '—';
  const d = new Date(v);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};
const progressPct = (wo: any) => {
  if (!wo?.qtyPlanned || Number(wo.qtyPlanned) === 0) return 0;
  return Math.min(100, Math.round((Number(wo.qtyProduced) / Number(wo.qtyPlanned)) * 100));
};
const progressColor = (wo: any) => {
  const p = progressPct(wo);
  if (p >= 100) return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]';
  if (p >= 50) return 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]';
  return 'bg-slate-300';
};
const isOverdue = (wo: any) => wo.status !== 'COMPLETED' && wo.plannedEndDate && new Date(wo.plannedEndDate) < new Date();
const priorityDot = (p: number) => {
  if (!p || p < 40) return 'bg-slate-300';
  if (p < 70) return 'bg-amber-400';
  return 'bg-rose-500';
};
const statusBadge = (s: string) => ({
  DRAFT: 'bg-slate-100 text-slate-600', RELEASED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  IN_PROGRESS: 'bg-amber-50 text-amber-700 border-amber-100', COMPLETED: 'bg-emerald-950 text-emerald-400 border-emerald-800',
  CANCELED: 'bg-rose-50 text-rose-700 border-rose-100'
}[s] || 'bg-slate-100 text-slate-600');
const statusDot = (s: string) => ({
  DRAFT: 'bg-slate-400', RELEASED: 'bg-emerald-500', IN_PROGRESS: 'bg-amber-500 animate-pulse',
  COMPLETED: 'bg-emerald-400', CANCELED: 'bg-rose-500'
}[s] || 'bg-slate-400');

const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  toastMsg.value = msg; toastType.value = type;
  setTimeout(() => { toastMsg.value = null; }, 4000);
};

const filterByStatus = (val: string) => { statusFilter.value = val; };

// Data loading
const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/manufacturing/work-orders');
    workOrders.value = res.data?.workOrders ?? [];
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal sinkronisasi data audit', 'error');
  } finally {
    loading.value = false;
  }
};

const loadMasterData = async () => {
  const [iRes, bRes] = await Promise.all([
    api.get('/inventory/items', { params: { take: 300 } }),
    api.get('/manufacturing/bom', { params: { isActive: 'true' } }),
  ]);
  items.value = iRes.data?.items ?? [];
  boms.value = bRes.data?.boms ?? [];
};

// Form
const openCreate = async () => {
  editingId.value = null;
  form.code = ''; form.bomId = ''; form.finishedGoodItemId = '';
  form.qtyPlanned = ''; form.uomCode = ''; form.workCenter = '';
  form.priority = '50'; form.notes = ''; form.components = []; form.operations = [];
  form.plannedStartDate = new Date().toISOString().slice(0, 10);
  form.plannedEndDate = '';
  await loadMasterData();
  dialogOpen.value = true;
};

const openEdit = async (wo: any) => {
  editingId.value = wo.id;
  form.code = wo.code; form.bomId = wo.bomId ?? '';
  form.finishedGoodItemId = wo.finishedGoodItemId ?? '';
  form.qtyPlanned = String(wo.qtyPlanned); form.uomCode = wo.uomCode ?? '';
  form.workCenter = wo.workCenter ?? ''; form.priority = String(wo.priority ?? 50);
  form.plannedStartDate = wo.plannedStartDate ? wo.plannedStartDate.split('T')[0] : '';
  form.plannedEndDate = wo.plannedEndDate ? wo.plannedEndDate.split('T')[0] : '';
  form.notes = wo.notes ?? '';
  form.components = (wo.components || []).map((c: any) => ({
    itemId: c.itemId, qtyRequired: String(c.qtyRequired), uomCode: c.uomCode ?? '',
    issueMethod: c.issueMethod ?? 'BACKFLUSH', operationNo: c.operationNo ? String(c.operationNo) : ''
  }));
  form.operations = (wo.operations || []).map((op: any) => ({
    lineNo: op.lineNo, operationNo: op.operationNo, description: op.description ?? '',
    workstation: op.workstation ?? '', laborHours: op.laborHours ? String(op.laborHours) : '',
    setupTime: op.setupTime ? String(op.setupTime) : '', notes: op.notes ?? ''
  }));
  await loadMasterData();
  dialogOpen.value = true;
};

const openDetail = (wo: any) => { editingId.value = wo.id; openEdit(wo); };

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };
const addComponent = () => form.components.push({ itemId: '', qtyRequired: '1', uomCode: '', issueMethod: 'BACKFLUSH', operationNo: '' });
const removeComponent = (i: number) => form.components.splice(i, 1);
const addOperation = () => {
  const nextNo = form.operations.length > 0 ? Math.max(...form.operations.map(o => parseInt(o.operationNo) || 0)) + 10 : 10;
  form.operations.push({ lineNo: form.operations.length + 1, operationNo: String(nextNo), description: '', workstation: '', laborHours: '', setupTime: '', notes: '' });
};
const removeOperation = (i: number) => form.operations.splice(i, 1);

const save = async () => {
  saving.value = true;
  try {
    const payload: any = {
      code: form.code, bomId: form.bomId || undefined,
      finishedGoodItemId: form.finishedGoodItemId,
      qtyPlanned: parseFloat(form.qtyPlanned) || 0,
      uomCode: form.uomCode || undefined, workCenter: form.workCenter || undefined,
      priority: parseInt(form.priority) || 50,
      plannedStartDate: form.plannedStartDate || undefined,
      plannedEndDate: form.plannedEndDate || undefined,
      notes: form.notes || undefined,
      components: form.components.filter(c => c.itemId).map((c, idx) => ({
        itemId: c.itemId, qtyRequired: parseFloat(c.qtyRequired) || 0,
        uomCode: c.uomCode || undefined, issueMethod: c.issueMethod, lineNo: idx + 1
      })),
      operations: form.operations.filter(op => op.description).map((op, idx) => ({
        lineNo: idx + 1, operationNo: parseInt(op.operationNo) || (idx + 1) * 10,
        description: op.description, workstation: op.workstation || undefined,
        laborHours: op.laborHours ? parseFloat(op.laborHours) : undefined,
        setupTime: op.setupTime ? parseFloat(op.setupTime) : undefined,
        notes: op.notes || undefined,
      })),
    };
    if (editingId.value) {
      await api.patch(`/manufacturing/work-orders/${editingId.value}`, payload);
      showToast('Perintah Kerja Berhasil Diperbarui');
    } else {
      await api.post('/manufacturing/work-orders', payload);
      showToast('Registrasi Perintah Kerja Baru Berhasil');
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal memproses registrasi', 'error');
  } finally {
    saving.value = false;
  }
};

const release = async (wo: any) => {
  try {
    await api.patch(`/manufacturing/work-orders/${wo.id}/release`);
    showToast(`WO ${wo.code} Berhasil Dirilis ke Produksi`);
    await load();
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal merilis WO', 'error');
  }
};

const openComplete = (wo: any) => {
  completingWo.value = wo;
  completeForm.qtyProduced = String(wo.qtyPlanned);
  completeForm.qtyRejected = '0';
  completeForm.notes = '';
  completeDialogOpen.value = true;
};

const doComplete = async () => {
  if (!completingWo.value) return;
  saving.value = true;
  try {
    await api.patch(`/manufacturing/work-orders/${completingWo.value.id}/complete`, {
      qtyProduced: parseFloat(completeForm.qtyProduced) || 0,
    });
    showToast(`Audit Selesai: WO ${completingWo.value.code} Telah Diposting!`);
    completeDialogOpen.value = false;
    await load();
  } catch (e: any) {
    showToast(e?.response?.data?.message ?? 'Gagal posting penyelesaian', 'error');
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

.modal-enter-active, .modal-leave-active { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; }

input[type="range"] {
  @apply h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer;
}
input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-emerald-600 rounded-full shadow-lg border-2 border-white;
}
</style>