<template>
  <div class="space-y-4">
    <!-- Header (Premium HSE / Safety First Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-100">Construction Suite</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600 font-mono italic">Safety First (K3)</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">HSE <span class="text-emerald-600 not-italic text-3xl">& Compliance</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-emerald-900/60 leading-relaxed mt-3">Monitoring keselamatan dan kesehatan kerja terpadu. Kelola laporan insiden, audit lapangan, dan kepatuhan standar K3 guna menciptakan lingkungan kerja tanpa kecelakaan (Zero Accident).</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex flex-col items-end mr-4">
              <span class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Safe Man-Hours</span>
              <span class="text-2xl font-black text-slate-900 font-mono tracking-tighter">{{ stats?.safeManHours?.toLocaleString() || '125,400' }} <span class="text-[10px] text-slate-400">HRS</span></span>
          </div>
          <Button label="Audit Kepatuhan" size="small" icon="pi pi-shield" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" @click="openCreate('INSPECTION')" />
          <Button label="Lapor Insiden" size="small" icon="pi pi-exclamation-triangle" class="p-button-rounded h-12 px-8 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all outline outline-offset-4 outline-rose-50" @click="openCreate('INCIDENT')" />
        </div>
      </div>
    </div>

    <!-- Safety Telemetry (Emerald Theme) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-slate-950 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-black group border-b-4 border-b-rose-500">
        <div class="text-[10px] font-black uppercase text-rose-400 tracking-[0.2em] mb-4 opacity-80">Total Incident Cases</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ (stats?.totalIncidents || 0) }}</h3>
          <div class="p-3 bg-rose-500/10 rounded-xl text-rose-400 shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-exclamation-circle text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-rose-500">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Open Investigations</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-900 tracking-tighter leading-none">{{ (stats?.openIncidents || 0) }}</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><i class="pi pi-search-plus text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-emerald-500">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Avg. Audit Score</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-700 tracking-tighter leading-none font-mono">{{ Number(stats?.avgScore || 0).toFixed(1) }}<span class="text-xl ml-1">%</span></h3>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 transition-all hover:rotate-12"><i class="pi pi-verified text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-rose-100 tracking-[0.2em] mb-4 opacity-80">Fatalities / Major Case</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ (stats?.fatalCount || 0) }}</h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-heart text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- HSE Journal (Incident & Inspection Ledger) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-emerald-200"><i class="pi pi-book text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Jurnal Keselamatan Proyek</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Unified Incident Tracking & Safety Audits</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center gap-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-1 px-4 mr-2">
             <button @click="viewCategory = 'INCIDENT'; load()" :class="viewCategory === 'INCIDENT' ? 'bg-rose-50 text-rose-600 font-black' : 'text-slate-400'" class="px-4 py-2 rounded-xl text-[9px] uppercase tracking-widest transition-all">INCIDENTS</button>
             <button @click="viewCategory = 'INSPECTION'; load()" :class="viewCategory === 'INSPECTION' ? 'bg-emerald-50 text-emerald-600 font-black' : 'text-slate-400'" class="px-4 py-2 rounded-xl text-[9px] uppercase tracking-widest transition-all">INSPECTIONS</button>
          </div>
          <div class="flex items-center gap-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-1 pr-4">
             <i class="pi pi-filter ml-3 text-slate-400 text-xs"></i>
             <select v-model="filterProject" class="border-none bg-transparent text-[11px] h-9 font-black uppercase tracking-widest focus:ring-0 outline-none appearance-none cursor-pointer text-emerald-600" @change="load">
                <option value="ALL">SEMUA PROYEK</option>
                <option v-for="p in masterData.projects" :value="p.id">{{ p.name }}</option>
             </select>
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-emerald-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Deskripsi & Tipe</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 w-48 text-center">{{ viewCategory === 'INCIDENT' ? 'Severity' : 'Inspection Score' }}</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 w-48">Tanggal & Pelapor</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Tools</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-emerald-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-emerald-600 font-mono italic">Synchronizing K3 repository...</div>
              </td>
            </tr>
            
            <tr v-for="d in items" v-else :key="d.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="getBorderClass(d)">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform" :class="getIconBg(d)">
                       <i :class="getIcon(d)" class="text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[9px] font-bold text-slate-400 tracking-tight group-hover:text-emerald-700 transition-colors uppercase flex items-center gap-2">
                          <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600">{{ d.type }}</span>
                          <span>{{ d.project?.name }}</span>
                       </div>
                       <div class="mt-1 font-black text-[13px] text-slate-800 uppercase tracking-tight leading-none group-hover:text-emerald-600 transition-colors">
                          {{ viewCategory === 'INCIDENT' ? d.description : d.summary }}
                       </div>
                       <div v-if="viewCategory === 'INCIDENT' && d.location" class="text-[9px] font-bold text-rose-400 uppercase tracking-widest mt-1 italic"><i class="pi pi-map-marker mr-1 text-[8px]"></i>{{ d.location }}</div>
                      <div v-if="d.attachments?.length" class="flex gap-1 mt-2">
                        <span v-for="(at, idx) in d.attachments" :key="idx" class="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all cursor-pointer shadow-sm border border-slate-50" :title="at.name">
                          <i :class="at.type?.includes('image') ? 'pi pi-image' : 'pi pi-file-pdf'"></i>
                        </span>
                      </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                 <div v-if="viewCategory === 'INCIDENT'">
                    <span :class="getSeverityStyle(d.severity)" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase">{{ d.severity }}</span>
                 </div>
                 <div v-else class="flex flex-col items-center">
                    <div class="text-2xl font-black font-mono" :class="d.score >= 80 ? 'text-emerald-600' : 'text-amber-600'">{{ Number(d.score || 0).toFixed(1) }}%</div>
                    <div class="w-24 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                       <div class="h-full transition-all duration-1000" :class="d.score >= 80 ? 'bg-emerald-500' : 'bg-amber-500'" :style="{ width: d.score + '%' }"></div>
                    </div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="flex flex-col gap-1">
                    <div class="text-[12px] font-black text-slate-900 group-hover:text-emerald-600 transition-all font-mono">
                       {{ formatDate(viewCategory === 'INCIDENT' ? d.incidentDate : d.inspectionDate) }}
                    </div>
                    <div class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ viewCategory === 'INCIDENT' ? (d.reportedBy || 'SYSTEM') : (d.inspectorId || 'SAFETY OFFICER') }}</div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5 border border-slate-100 rounded-2xl p-2 bg-white shadow-inner scale-90 group-hover:scale-100 transition-transform">
                    <span :class="getStatusStyle(d.status)" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase group-hover:scale-105 transition-all w-full justify-center">
                       <i :class="getStatusIcon(d.status)" class="text-[7px] mr-2"></i> {{ d.status }}
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Kelola Report" severity="secondary" rounded outlined @click="openEdit(d)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                    <Button label="Audit Trail" icon="pi pi-history" text class="text-[8px] font-black uppercase tracking-widest p-0 h-6 text-emerald-500 hover:text-emerald-700" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && items.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🛡️</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Jurnal K3 bersih. Tidak ada {{ viewCategory.toLowerCase() }} yang tercatat.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- HSE CRUD Dialog (Premium K3/Safety Workspace) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all p-4">
      <div class="w-full max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px]" :class="formCategory === 'INCIDENT' ? 'border-b-rose-900' : 'border-b-emerald-900'">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700" :class="formCategory === 'INCIDENT' ? 'bg-rose-50' : 'bg-emerald-50'"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0" :class="formCategory === 'INCIDENT' ? 'bg-rose-600 shadow-rose-200' : 'bg-emerald-600 shadow-emerald-200'">
               <i :class="formCategory === 'INCIDENT' ? 'pi pi-exclamation-triangle' : 'pi pi-shield'" class="text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ form.id ? 'Review' : 'Log New' }} <span :class="formCategory === 'INCIDENT' ? 'text-rose-600' : 'text-emerald-600'" class="italic text-2xl">{{ formCategory === 'INCIDENT' ? 'Incident' : 'Safety Audit' }}</span></h3>
                 <span v-if="form.id" :class="getStatusStyle(form.status)" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase">{{ form.status }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 text-slate-400" :class="formCategory === 'INCIDENT' ? 'border-rose-500' : 'border-emerald-500'">HSE Compliance Journal & Safety Governance Workspace</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-amber-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              <!-- Panel Left: Event Core Data -->
              <div class="lg:col-span-5 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-info-circle"></i> I. Event Identity & Context
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-emerald-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Judul / Summary Kejadian</label>
                       <InputText v-model="form.summary" v-if="formCategory === 'INSPECTION'" class="w-full h-14 border-none rounded-2xl px-6 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all uppercase tracking-widest" placeholder="e.g., SITE AUDIT MINGGU KE-4" />
                       <InputText v-model="form.description" v-else class="w-full h-14 border-none rounded-2xl px-6 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all uppercase tracking-widest" placeholder="e.g., NEAR MISS - SCAFFOLDING TIANG GANTUNG" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                       <div class="space-y-4 font-mono italic">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Project Assignment</label>
                          <select v-model="form.projectId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                             <option value="">-- SELECT PROJECT --</option>
                             <option v-for="p in masterData.projects" :value="p.id">{{ p.name }}</option>
                          </select>
                       </div>
                       <div class="space-y-4 italic font-mono">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Case Type</label>
                          <select v-model="form.type" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                             <template v-if="formCategory === 'INCIDENT'">
                                <option value="ACCIDENT">ACCIDENT</option>
                                <option value="NEAR_MISS">NEAR MISS</option>
                                <option value="PROPERTY_DAMAGE">PROPERTY DAMAGE</option>
                                <option value="SICKNESS">SICKNESS / MEDICAL</option>
                             </template>
                             <template v-else>
                                <option value="DAILY">DAILY INSPECTION</option>
                                <option value="WEEKLY">WEEKLY AUDIT</option>
                                <option value="MONTHLY">MONTHLY AUDIT</option>
                                <option value="EXTERNAL">EXTERNAL AUDIT</option>
                             </template>
                          </select>
                       </div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Lokasi Detail (Site Location)</label>
                       <InputText v-model="form.location" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 transition-all uppercase tracking-widest" :class="formCategory === 'INCIDENT' ? 'focus:ring-rose-400' : 'focus:ring-emerald-400'" placeholder="e.g., BLOK C LANTAI 4 - AREA TANGGA" />
                    </div>

                    <div class="p-4 rounded-[1.5rem] border shadow-inner mt-4 relative overflow-hidden group" :class="formCategory === 'INCIDENT' ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'">
                       <div class="absolute right-0 bottom-0 px-4 py-1 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-tl-xl leading-none italic group-hover:scale-105 transition-transform" :class="formCategory === 'INCIDENT' ? 'bg-rose-600' : 'bg-emerald-600'">Safety First</div>
                       <p class="text-[8px] font-bold text-slate-500 uppercase italic leading-loose">Seluruh laporan K3 bersifat rahasia dan digunakan untuk perbaikan prosedur kerja di masa mendatang guna mencapai Zero Accident.</p>
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Analysis & Closure -->
              <div class="lg:col-span-7 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-verified"></i> II. Analysis & Corrective Actions
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-10 transition-all hover:border-emerald-100 border-b-[8px]" :class="formCategory === 'INCIDENT' ? 'border-b-rose-700' : 'border-b-emerald-700'">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div class="space-y-6">
                           <div v-if="formCategory === 'INCIDENT'" class="grid grid-cols-2 gap-4">
                              <div class="flex flex-col gap-4">
                                 <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Keparahan (Severity)</label>
                                 <select v-model="form.severity" class="w-full h-14 border-none rounded-2xl px-6 text-[10px] font-black text-rose-600 bg-slate-100 shadow-inner outline-none text-center appearance-none uppercase italic font-mono">
                                    <option value="MINOR">MINOR / FIRST AID</option>
                                    <option value="MEDICAL">MEDICAL TREATMENT</option>
                                    <option value="MAJOR">MAJOR / LTI</option>
                                    <option value="FATAL">FATAL CASE</option>
                                 </select>
                              </div>
                              <div class="flex flex-col gap-4">
                                 <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Current Status</label>
                                 <select v-model="form.status" class="w-full h-14 border-none rounded-2xl px-4 text-[10px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-rose-400 transition-all appearance-none cursor-pointer uppercase text-center font-mono">
                                    <option value="OPEN">OPEN / LOGGED</option>
                                    <option value="UNDER_INVESTIGATION">INVESTIGATING</option>
                                    <option value="CLOSED">CLOSED / RESOLVED</option>
                                 </select>
                              </div>
                           </div>
                           <div v-else class="grid grid-cols-2 gap-4">
                              <div class="flex flex-col gap-4">
                                 <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Compliance Score</label>
                                 <div class="relative">
                                     <InputNumber v-model="form.score" :min="0" :max="100" :minFractionDigits="1" class="w-full" inputClass="w-full h-14 border-none rounded-2xl px-6 text-[18px] font-black text-emerald-600 bg-slate-100 shadow-inner outline-none text-center font-mono" placeholder="0-100" />
                                     <span class="absolute right-12 top-1/2 -translate-y-1/2 font-black text-emerald-300 pointer-events-none">%</span>
                                 </div>
                              </div>
                              <div class="flex flex-col gap-4">
                                 <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Audit Status</label>
                                 <select v-model="form.status" class="w-full h-14 border-none rounded-2xl px-4 text-[10px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase text-center font-mono italic">
                                    <option value="DRAFT">DRAFT</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                    <option value="FAILED">FAILED AUDIT</option>
                                 </select>
                              </div>
                           </div>

                           <div class="space-y-4">
                              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Tanggal {{ formCategory === 'INCIDENT' ? 'Kejadian' : 'Audit' }}</label>
                              <InputText type="date" v-model="form.date" class="w-full h-14 border-none rounded-2xl px-6 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none" />
                           </div>
                       </div>

                       <div class="space-y-6 flex flex-col justify-center bg-slate-50 p-4 rounded-[2rem] border border-slate-100 shadow-inner">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">{{ formCategory === 'INCIDENT' ? 'Root Cause Analysis' : 'Observation Findings' }}</label>
                          <Textarea v-model="form.notes" rows="4" class="w-full border-none rounded-2xl p-4 text-[11px] font-black text-slate-700 bg-white shadow-sm outline-none uppercase placeholder:text-slate-300 font-mono italic" :placeholder="formCategory === 'INCIDENT' ? 'Jelaskan penyebab utama kejadian...' : 'Catatan temuan lapangan...'" />
                       </div>
                    </div>

                    <div v-if="formCategory === 'INCIDENT'" class="pt-6 border-t border-slate-100 italic">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Tindakan Korektif (Action Taken)</label>
                        <InputText v-model="form.actionTaken" class="w-full h-14 border-none rounded-2xl px-6 text-[12px] font-black text-emerald-700 bg-emerald-50 mt-4 outline-none uppercase tracking-widest italic" placeholder="Langkah perbaikan yang dilakukan..." />
                    </div>

                    <div class="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center italic">
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 font-mono uppercase">{{ formCategory === 'INCIDENT' ? 'Dilaporkan Oleh' : 'Inspektur K3' }}</label>
                          <InputText v-model="form.officerId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none uppercase" placeholder="Nama / ID Officer" />
                       </div>
                       <div class="p-4 rounded-[1.5rem] border shadow-sm relative overflow-hidden group" :class="formCategory === 'INCIDENT' ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'">
                          <div class="absolute right-0 top-0 w-24 h-24 rounded-full blur-2xl" :class="formCategory === 'INCIDENT' ? 'bg-rose-500/10' : 'bg-emerald-500/10'"></div>
                          <div class="text-[10px] font-black uppercase mb-2 italic tracking-widest" :class="formCategory === 'INCIDENT' ? 'text-rose-600' : 'text-emerald-600'">Compliance Audit Trail</div>
                          <p class="text-[8px] font-bold text-slate-500 leading-relaxed uppercase">Dokumen ini akan tercatat dalam log audit K3 tahunan perusahaan.</p>
                       </div>

                     <!-- Attachment Section -->
                     <div class="pt-8 border-t border-slate-100">
                        <div class="flex justify-between items-center mb-6">
                           <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Attachments & Evidence (DMS)</label>
                           <Button label="Add Evidence Link" icon="pi pi-plus" text size="small" class="text-[9px] font-black uppercase tracking-widest text-emerald-600" @click="addAttachment" />
                        </div>
                        
                        <div v-if="form.attachments?.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div v-for="(at, idx) in form.attachments" :key="idx" class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group">
                              <div class="flex items-center gap-3 overflow-hidden">
                                 <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400">
                                    <i :class="at.type?.includes('image') ? 'pi pi-image' : 'pi pi-file-pdf'"></i>
                                 </div>
                                 <div class="overflow-hidden">
                                    <div class="text-[10px] font-black text-slate-700 truncate text-left">{{ at.name }}</div>
                                    <a :href="at.url" target="_blank" class="text-[8px] font-bold text-emerald-600 truncate block hover:underline text-left">{{ at.url }}</a>
                                 </div>
                              </div>
                              <Button icon="pi pi-trash" text rounded severity="danger" class="opacity-0 group-hover:opacity-100 transition-all h-8 w-8" @click="removeAttachment(idx)" />
                           </div>
                        </div>
                        <div v-else class="py-12 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center">
                           <i class="pi pi-cloud-upload text-3xl text-slate-200 mb-2"></i>
                           <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">No evidence attached. Audit score may be affected.</p>
                        </div>
                     </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Workspace Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-b-[2.5rem]">
          <div class="flex items-center gap-4">
             <div class="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-shield"></i> Site HSE Protocol V4.2
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batalkan Sesi" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl font-mono italic" />
             <Button :label="form.id ? 'Perbarui Data K3' : 'Kirim Laporan HSE'" icon="pi pi-save" size="large" :loading="saving" :disabled="saving" @click="save" class="h-14 px-12 border-none text-white font-black text-[10px] uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all rounded-xl font-serif" :class="formCategory === 'INCIDENT' ? 'bg-rose-600 shadow-rose-100' : 'bg-emerald-600 shadow-emerald-100'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import Swal from 'sweetalert2';

const api = useApi();
const loading = ref(false);
const saving = ref(false);
const search = ref('');
const dialogOpen = ref(false);
const viewCategory = ref('INCIDENT'); // 'INCIDENT' | 'INSPECTION'
const filterProject = ref('ALL');

const items = ref<any[]>([]);
const stats = ref<any>({});

const masterData = reactive({
  projects: [] as any[]
});

const formCategory = ref('INCIDENT');
const form = reactive({
  id: '',
  projectId: '',
  type: 'NEAR_MISS', // or 'DAILY'
  description: '', // for incident
  summary: '',     // for inspection
  location: '',
  severity: 'MINOR',
  score: 0,
  date: new Date().toISOString().split('T')[0],
  status: 'OPEN',   // or 'COMPLETED'
  notes: '',
  actionTaken: '',
  officerId: '',
  attachments: [] as any[]
});

const loadMasterData = async () => {
  try {
    const res = await api.get('/core/query?table=Project');
    masterData.projects = res.data?.data || [];
  } catch (e) {
    console.error('Failed to load master data', e);
  }
};

const load = async () => {
  loading.value = true;
  try {
    const params: any = { category: viewCategory.value };
    if (filterProject.value !== 'ALL') params.projectId = filterProject.value;

    const [res, statsRes] = await Promise.all([
      api.get('/construction/hse', { params }),
      api.get('/construction/hse/stats')
    ]);
    items.value = res.data?.data || [];
    stats.value = statsRes.data || {};
  } catch (e) {
    console.warn('Failed to load HSE data', e);
  } finally {
    loading.value = false;
  }
};

const openCreate = (cat: string) => {
  formCategory.value = cat;
  Object.assign(form, {
    id: '',
    projectId: '',
    type: cat === 'INCIDENT' ? 'NEAR_MISS' : 'DAILY',
    description: '',
    summary: '',
    location: '',
    severity: 'MINOR',
    score: 80,
    date: new Date().toISOString().split('T')[0],
    status: cat === 'INCIDENT' ? 'OPEN' : 'COMPLETED',
    notes: '',
    actionTaken: '',
    officerId: '',
    attachments: []
  });
  dialogOpen.value = true;
};

const openEdit = (d: any) => {
  formCategory.value = viewCategory.value;
  Object.assign(form, d);
  form.date = (viewCategory.value === 'INCIDENT' ? d.incidentDate : d.inspectionDate).split('T')[0];
  form.summary = d.summary || '';
  form.notes = viewCategory.value === 'INCIDENT' ? (d.rootCause || '') : (d.findings || '');
  form.officerId = viewCategory.value === 'INCIDENT' ? (d.reportedBy || '') : (d.inspectorId || '');
  form.attachments = d.attachments || [];
  dialogOpen.value = true;
};

const addAttachment = async () => {
  const { value: url } = await Swal.fire({
    title: 'Add Evidence Link',
    input: 'text',
    inputLabel: 'File URL (DMS Link)',
    inputPlaceholder: 'https://...',
    showCancelButton: true
  });

  if (url) {
    const name = url.split('/').pop() || 'document';
    const type = name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg';
    form.attachments.push({ name, url, type });
  }
};

const removeAttachment = (idx: number) => {
  form.attachments.splice(idx, 1);
};

const save = async () => {
  if (!form.projectId || (!form.description && !form.summary)) {
    return Swal.fire('Error', 'Mohon lengkapi data proyek dan deskripsi!', 'error');
  }

  saving.value = true;
  try {
    const endpoint = formCategory.value === 'INCIDENT' ? 'incident' : 'inspection';
    const payload: any = { ...form };
    
    // Map internal form to API fields
    if (formCategory.value === 'INCIDENT') {
      payload.incidentDate = form.date;
      payload.rootCause = form.notes;
      payload.reportedBy = form.officerId;
    } else {
      payload.inspectionDate = form.date;
      payload.findings = form.notes;
      payload.inspectorId = form.officerId;
    }

    if (form.id) {
      await api.patch(`/construction/hse/${endpoint}/${form.id}`, payload);
    } else {
      await api.post(`/construction/hse/${endpoint}`, payload);
    }

    Swal.fire({
      icon: 'success',
      title: 'HSE Log Sync',
      text: 'Data K3 berhasil disinkronisasi ke server!',
      timer: 1500,
      showConfirmButton: false
    });

    dialogOpen.value = false;
    load();
  } catch (e) {
    Swal.fire('Error', 'Gagal memproses data HSE ke server.', 'error');
  } finally {
    saving.value = false;
  }
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('id-ID', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'OPEN': return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'CLOSED': 
    case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'UNDER_INVESTIGATION': return 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse';
    case 'FAILED': return 'bg-rose-50 text-rose-700 border-rose-200 italic strike';
    default: return 'bg-slate-50 text-slate-500 border-slate-200';
  }
};

const getStatusIcon = (status: string) => {
  if (status === 'COMPLETED' || status === 'CLOSED') return 'pi pi-check-circle animate-shimmer';
  if (status === 'OPEN') return 'pi pi-exclamation-circle';
  return 'pi pi-info-circle';
};

const getSeverityStyle = (sev: string) => {
  switch (sev) {
    case 'FATAL': return 'bg-rose-600 text-white border-rose-800 shadow-rose-200';
    case 'MAJOR': return 'bg-rose-100 text-rose-700 border-rose-200';
    case 'MINOR': return 'bg-amber-100 text-amber-700 border-amber-200';
    default: return 'bg-emerald-100 text-emerald-700 border-emerald-200 text-emerald-600';
  }
};

const getIcon = (d: any) => {
  if (viewCategory.value === 'INSPECTION') return 'pi pi-shield';
  if (d.type === 'ACCIDENT') return 'pi pi-heart';
  if (d.type === 'NEAR_MISS') return 'pi pi-refresh';
  return 'pi pi-info-circle';
};

const getIconBg = (d: any) => {
  if (viewCategory.value === 'INSPECTION') return 'bg-emerald-100 text-emerald-600';
  if (d.type === 'ACCIDENT') return 'bg-rose-100 text-rose-600 animate-pulse';
  return 'bg-amber-100 text-amber-600';
};

const getBorderClass = (d: any) => {
  if (viewCategory.value === 'INCIDENT') {
    return d.severity === 'FATAL' || d.severity === 'MAJOR' ? 'hover:border-l-rose-500' : 'hover:border-l-amber-400';
  }
  return 'hover:border-l-emerald-500';
};

onMounted(() => {
  load();
  loadMasterData();
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

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

:deep(.p-inputtext), :deep(.p-textarea) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
   border-radius: 16px !important;
   font-size: 11px !important;
   font-weight: 900 !important;
   text-transform: uppercase !important;
   padding: 1rem 1.5rem !important;
}

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 1rem center; 
  background-size: 1em; 
}

.strike { text-decoration: line-through; }

@keyframes shimmer { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
.animate-shimmer { animation: shimmer 2s infinite ease-in-out; }
</style>
