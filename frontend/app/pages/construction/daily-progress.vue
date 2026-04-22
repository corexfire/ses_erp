<template>
  <div class="space-y-4">
    <!-- Header (Premium Daily Progress Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-amber-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-amber-100">Construction Suite</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Daily Progress</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Site <span class="text-amber-600 not-italic text-3xl">Progress</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-amber-900/60 leading-relaxed mt-3">Sistem pelaporan harian (Site Journal). Pantau progres pekerjaan, kondisi cuaca, pemakaian sumber daya, dan kendala lapangan secara real-time guna akurasi jadwal proyek.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Analitik Progres" size="small" icon="pi pi-chart-bar" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Buat Laporan Harian" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Telemetry KPIs (Construction Heavy Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-amber-950 text-white shadow-xl flex flex-col justify-between border border-amber-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] mb-4 opacity-80">Total Laporan Harian</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ stats?.total || 0 }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-file-edit text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-amber-500">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Pending Review</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-900 tracking-tighter leading-none">{{ stats?.pending || 0 }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-clock text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Avg. Progress Completion</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-amber-700 tracking-tighter leading-none">{{ stats?.avgProgress || 0 }}<span class="text-xl ml-1">%</span></h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 transition-all hover:rotate-12"><i class="pi pi-info-circle text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-amber-100 tracking-[0.2em] mb-4 opacity-80">Weather Stability</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">94<span class="text-xl ml-1 font-black">%</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-sun text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Construction Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-amber-200"><i class="pi pi-calendar-plus text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Journal Harian Proyek Konstruksi</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Consolidated Work Execution Logs</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Konten / Nama Proyek..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-amber-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Tanggal & Proyek</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Kondisi Cuaca</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Progres Pekerjaan</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Review</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-amber-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-amber-600">Sinkronisasi journal harian lapangan...</div>
              </td>
            </tr>
            
            <tr v-for="sc in docs" v-else :key="sc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="getStatusBorder(sc.status)">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-id-card text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-amber-700 transition-colors uppercase">
                          {{ formatDate(sc.reportDate) }}
                       </div>
                       <div class="mt-1 font-black text-[13px] text-slate-800 uppercase tracking-tight leading-none group-hover:text-amber-600 transition-colors">
                          {{ sc.project?.name || 'General Project' }}
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                <div class="flex items-center gap-4">
                   <div class="flex flex-col items-center gap-1">
                      <i :class="getWeatherIcon(sc.morningWeather)" class="text-amber-500 text-lg"></i>
                      <span class="text-[8px] font-black uppercase text-slate-400">AM</span>
                   </div>
                   <div class="flex flex-col items-center gap-1 border-l border-slate-100 pl-4">
                      <i :class="getWeatherIcon(sc.afternoonWeather)" class="text-orange-500 text-lg"></i>
                      <span class="text-[8px] font-black uppercase text-slate-400">PM</span>
                   </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="space-y-3">
                    <div class="flex justify-between items-end">
                       <span class="text-[10px] font-black text-slate-700 uppercase tracking-tight truncate max-w-[200px]">{{ sc.workSummary || 'No technical summary provided' }}</span>
                       <span class="text-[10px] font-black text-amber-600">{{ sc.progressPercent }}%</span>
                    </div>
                    <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                       <div class="bg-amber-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(245,158,11,0.5)]" :style="{ width: sc.progressPercent + '%' }"></div>
                    </div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span :class="getStatusStyle(sc.status)" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase group-hover:scale-105 transition-all">
                       <i :class="getStatusIcon(sc.status)" class="text-[7px] mr-2"></i> {{ sc.status }}
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Audit Laporan" severity="secondary" rounded outlined @click="openEdit(sc)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && docs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🚧</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Journal lapangan masih kosong. Belum ada aktivitas yang tercatat.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Daily Progress Dialog (Premium Workspace UI) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all p-4">
      <div class="w-full max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-amber-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-amber-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-amber-200">
               <i class="pi pi-calendar-plus text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ form.id ? 'Audit' : 'Draft' }} <span class="text-amber-600 italic text-2xl">Daily Report</span></h3>
                 <span v-if="form.id" :class="getStatusStyle(form.status)" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm">{{ form.status }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-amber-500 text-amber-600">Site Governance & Daily Work Verification Flow</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-amber-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel Left: Project & Weather -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-map-marker text-amber-500"></i> I. Lokasi & Kondisi
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-amber-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Proyek Konstruksi</label>
                       <select v-model="form.projectId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                          <option value="">-- PILIH PROYEK --</option>
                          <option v-for="p in masterData.projects" :value="p.id">{{ p.name }}</option>
                       </select>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Tanggal Laporan</label>
                          <InputText type="date" v-model="form.reportDate" class="w-full h-14 border-none rounded-2xl px-6 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none" />
                       </div>
                       <div class="space-y-4 text-center">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Avg. Progress %</label>
                          <div class="flex items-center justify-center p-3 h-14 bg-amber-950 rounded-2xl text-amber-400 font-black text-lg shadow-inner">{{ form.progressPercent }}%</div>
                       </div>
                    </div>

                    <div class="space-y-4 mt-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 mb-2 block text-center italic border-b border-slate-100 pb-2">Log Cuaca Harian</label>
                       <div class="grid grid-cols-3 gap-2">
                          <div v-for="slot in ['morning', 'afternoon', 'evening']" :key="slot" class="space-y-2">
                             <div class="text-[8px] font-black text-slate-300 uppercase text-center">{{ slot }}</div>
                             <select v-model="(form as any)[slot + 'Weather']" class="w-full h-10 border-none rounded-xl px-2 text-[9px] font-black text-slate-700 bg-slate-50 shadow-inner outline-none focus:ring-2 focus:ring-amber-400 transition-all appearance-none cursor-pointer uppercase">
                                <option value="CERAH">Cerah</option>
                                <option value="BERAWAN">Berawan</option>
                                <option value="HUJAN">Hujan</option>
                             </select>
                          </div>
                       </div>
                    </div>

                    <div class="bg-indigo-50 p-4 rounded-[1.5rem] border border-indigo-100 shadow-inner">
                       <p class="text-[8px] font-bold text-slate-500 uppercase italic leading-tight">Data cuaca penting untuk analisis keterlambatan akibat force majeure atau kendala alam.</p>
                    </div>
                 </div>
              </div>

              <!-- Panel Middle: Work Summary -->
              <div class="lg:col-span-8 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-pencil text-amber-500"></i> II. Aktivitas & Progres Lapangan
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-amber-100 border-b-[8px] border-b-amber-600">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Ringkasan Pekerjaan Teknis (Summary)</label>
                       <textarea v-model="form.workSummary" rows="4" class="w-full rounded-[1.5rem] border-none bg-slate-50 p-4 text-[12px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-amber-400 transition-all placeholder-slate-300 shadow-inner" placeholder="Tulis rincian aktivitas hari ini..."></textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-rose-600 uppercase tracking-widest px-1">Kendala / Isu Lapangan</label>
                          <textarea v-model="form.issues" rows="3" class="w-full rounded-[1.5rem] border-none bg-rose-50 p-4 text-[12px] font-medium text-rose-800 outline-none focus:ring-4 focus:ring-rose-400 transition-all placeholder-rose-200 shadow-inner" placeholder="Masalah material, alat, atau teknis..."></textarea>
                       </div>
                       <div class="space-y-6">
                           <div class="flex justify-between items-center px-1">
                              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Update Capaian Progres (%)</label>
                              <span class="text-2xl font-black text-amber-600 italic">{{ form.progressPercent }}%</span>
                           </div>
                           <div class="px-2">
                             <Slider v-model="form.progressPercent" :min="0" :max="100" class="custom-amber-slider" />
                           </div>
                           <div class="grid grid-cols-4 gap-2">
                              <button v-for="v in [25, 50, 75, 100]" :key="v" @click="form.progressPercent = v" class="py-2 bg-slate-50 hover:bg-amber-600 hover:text-white rounded-lg text-[10px] font-black transition-all border border-slate-100 italic">{{ v }}%</button>
                           </div>
                       </div>
                    </div>
                 </div>
                 
                 <!-- Embedded Logs Section (Manpower & Subcon) -->
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div class="bg-amber-950 rounded-[2rem] p-8 border-4 border-amber-900 shadow-xl overflow-hidden relative group">
                        <div class="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                        <div class="flex justify-between items-center mb-6">
                           <h4 class="text-white text-[12px] font-black uppercase tracking-widest leading-none italic"><span class="text-amber-500 not-italic">Manpower</span> Logs</h4>
                           <Button icon="pi pi-plus" severity="warning" rounded class="h-8 w-8 shadow-lg" @click="addResource" />
                        </div>
                        <div class="space-y-3 max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
                           <div v-for="(r, idx) in form.resources" :key="idx" class="flex gap-2 items-center">
                              <InputText v-model="r.notes" class="flex-1 bg-white/5 border-white/10 text-white text-[10px] p-2" placeholder="Tukang / Helper..." />
                              <InputNumber v-model="r.quantity" class="w-16 bg-white/5 text-white text-[10px] p-2" />
                              <Button icon="pi pi-times" severity="danger" text @click="removeResource(idx)" class="text-white/20 hover:text-rose-500" />
                           </div>
                        </div>
                    </div>

                    <div class="bg-slate-900 rounded-[2rem] p-8 border-4 border-slate-800 shadow-xl overflow-hidden relative group">
                        <div class="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                        <div class="flex justify-between items-center mb-6">
                           <h4 class="text-white text-[12px] font-black uppercase tracking-widest leading-none italic"><span class="text-indigo-400 not-italic">Subcon</span> Activity</h4>
                           <Button icon="pi pi-plus" severity="secondary" rounded class="h-8 w-8 shadow-lg" @click="addSubcon" />
                        </div>
                        <div class="space-y-3 max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
                           <div v-for="(s, idx) in form.subcontractors" :key="idx" class="flex gap-2 items-center">
                              <InputText v-model="s.subcontractorName" class="flex-1 bg-white/5 border-white/10 text-white text-[10px] p-2" placeholder="Nama Subkon..." />
                              <InputNumber v-model="s.workerCount" class="w-16 bg-white/5 text-white text-[10px] p-2" />
                              <Button icon="pi pi-times" severity="danger" text @click="removeSubcon(idx)" class="text-white/20 hover:text-rose-500" />
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
             <div class="px-6 py-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 transition-all hover:scale-105">
                <i class="pi pi-shield-check"></i> Standard Site Reporting GCG
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batal & Tutup" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                label="Simpan & Submit Laporan" 
                icon="pi pi-verified" 
                size="large" 
                :loading="saving" 
                :disabled="saving" 
                @click="save" 
                class="h-14 px-12 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all rounded-xl" 
             />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';

const api = useApi();
const loading = ref(false);
const saving = ref(false);
const search = ref('');
const dialogOpen = ref(false);

const docs = ref<any[]>([]);
const stats = ref<any>({ total: 0, pending: 0, avgProgress: 0 });

const masterData = reactive({
  projects: [] as any[]
});

const form = reactive({
  id: '',
  projectId: '',
  reportDate: new Date().toISOString().split('T')[0],
  morningWeather: 'CERAH',
  afternoonWeather: 'CERAH',
  eveningWeather: 'CERAH',
  workSummary: '',
  progressPercent: 0,
  issues: '',
  status: 'DRAFT',
  resources: [] as any[],
  subcontractors: [] as any[]
});

const loadMasterData = async () => {
  try {
    const res = await api.get('/core/query?table=Project');
    masterData.projects = res.data?.data || [];
  } catch (e) {
    console.error('Failed to load projects', e);
  }
};

const load = async () => {
  loading.value = true;
  try {
    const [res, statsRes] = await Promise.all([
      api.get('/construction/daily-progress'),
      api.get('/construction/daily-progress/stats')
    ]);
    docs.value = res.data?.data || [];
    stats.value = statsRes.data || {};
  } catch (e) {
    console.warn('Failed to load reports', e);
  } finally {
    loading.value = false;
  }
};

const openCreate = () => {
  Object.assign(form, {
    id: '',
    projectId: '',
    reportDate: new Date().toISOString().split('T')[0],
    morningWeather: 'CERAH',
    afternoonWeather: 'CERAH',
    eveningWeather: 'CERAH',
    workSummary: '',
    progressPercent: 0,
    issues: '',
    status: 'DRAFT',
    resources: [],
    subcontractors: []
  });
  dialogOpen.value = true;
};

const openEdit = (d: any) => {
  Object.assign(form, d);
  form.reportDate = d.reportDate?.split('T')[0];
  dialogOpen.value = true;
};

const addResource = () => form.resources.push({ resourceType: 'MANPOWER', quantity: 1, unit: 'ORANG', notes: '' });
const removeResource = (idx: number) => form.resources.splice(idx, 1);
const addSubcon = () => form.subcontractors.push({ subcontractorName: '', workerCount: 1, workDescription: '' });
const removeSubcon = (idx: number) => form.subcontractors.splice(idx, 1);

const save = async () => {
  if (!form.projectId) return Swal.fire('Error', 'Pilih proyek koordinat!', 'error');
  
  saving.value = true;
  try {
    if (form.id) {
      await api.patch(`/construction/daily-progress/${form.id}`, form);
    } else {
      await api.post('/construction/daily-progress', form);
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Journal laporan harian berhasil diproses!',
      timer: 2000,
      showConfirmButton: false
    });
    
    dialogOpen.value = false;
    load();
  } catch (e) {
    Swal.fire('Error', 'Gagal sinkronisasi data ke cloud.', 'error');
  } finally {
    saving.value = false;
  }
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'APPROVED': return 'bg-emerald-50 text-emerald-700 border-emerald-200 uppercase';
    case 'SUBMITTED': return 'bg-amber-50 text-amber-700 border-amber-200 uppercase';
    default: return 'bg-slate-50 text-slate-500 border-slate-200 uppercase';
  }
};

const getStatusIcon = (status: string) => status === 'APPROVED' ? 'pi pi-check-circle animate-pulse' : 'pi pi-clock';

const getStatusBorder = (status: string) => status === 'APPROVED' ? 'hover:border-l-emerald-400' : 'hover:border-l-amber-400';

const getWeatherIcon = (w: string) => {
  switch (w?.toUpperCase()) {
    case 'CERAH': return 'pi pi-sun';
    case 'BERAWAN': return 'pi pi-cloud';
    case 'HUJAN': return 'pi pi-cloud-download';
    default: return 'pi pi-sun';
  }
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

:deep(.p-inputtext), :deep(.p-inputnumber-input) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
   border-radius: 16px !important;
   font-size: 11px !important;
   font-weight: 900 !important;
   text-transform: uppercase !important;
   padding: 1rem 1.5rem !important;
}

:deep(.custom-amber-slider .p-slider-range) {
  background: #d97706 !important;
}

:deep(.custom-amber-slider .p-slider-handle) {
  border: 4px solid #d97706 !important;
  background: #fff !important;
}

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 1rem center; 
  background-size: 1em; 
}
</style>
