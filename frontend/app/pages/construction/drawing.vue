<template>
  <div class="space-y-4">
    <!-- Header (Premium Drawing Management Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-indigo-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-indigo-100">Construction Suite</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-600">Drawing Management</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Blueprints <span class="text-indigo-600 not-italic text-3xl">& Designs</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-indigo-900/60 leading-relaxed mt-3">Sistem manajemen gambar teknik dan revisi. Kelola shop drawings, as-built drawings, dan dokumen desain teknik lainnya dengan kontrol status dan tata kelola folder terpusat.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Audit Revisi" size="small" icon="pi pi-history" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Daftarkan Drawing" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-indigo-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Telemetry KPIs (Architecture & Engineering Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] mb-4 opacity-80">Total Master Drawings</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ (stats?.total || 0) }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-images text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-amber-500">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Pending Revisions</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-900 tracking-tighter leading-none">{{ (stats?.pending || 0) }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-refresh text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-indigo-500">
        <div class="text-[10px] font-black uppercase text-indigo-600 tracking-[0.2em] mb-4">Structural Sets</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-indigo-700 tracking-tighter leading-none">{{ (stats?.structural || 0) }}</h3>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 transition-all hover:rotate-12"><i class="pi pi-building text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-indigo-100 tracking-[0.2em] mb-4 opacity-80">Architectural Sets</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ (stats?.arch || 0) }}</h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-map text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Drawing Ledger (Premium Architecture Style) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6 shadow-indigo-200"><i class="pi pi-file-pdf text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Daftar Induk Gambar Proyek</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Drawing Control Ledger & Revision History</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center gap-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-1 pr-4">
             <i class="pi pi-filter ml-3 text-slate-400 text-xs"></i>
             <select v-model="filterDiscipline" class="border-none bg-transparent text-[11px] h-9 font-black uppercase tracking-widest focus:ring-0 outline-none appearance-none cursor-pointer text-indigo-600" @change="load">
                <option value="ALL">SEMUA DISIPLIN</option>
                <option value="ARCHITECTURAL">ARCHITECTURAL</option>
                <option value="STRUCTURAL">STRUCTURAL</option>
                <option value="MEP">MEP</option>
             </select>
          </div>
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Kode atau Judul..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-indigo-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm font-medium">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Dokumen & Kode</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 w-48">Disiplin & Ket.</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 w-40">Revisi Terakhir</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Tools</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-indigo-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-indigo-600">Sinkronisasi repositori gambar teknik...</div>
              </td>
            </tr>
            
            <tr v-for="d in docs" v-else :key="d.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="getStatusBorder(d.status)">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-file-pdf text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-indigo-700 transition-colors uppercase">
                          {{ d.code }}
                       </div>
                       <div class="mt-1 font-black text-[13px] text-slate-800 uppercase tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                          {{ d.title }}
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="space-y-1.5">
                    <div :class="getDisciplineStyle(d.discipline)" class="inline-flex rounded-md px-3 py-1 font-black text-[9px] uppercase tracking-widest shadow-sm">{{ d.discipline }}</div>
                    <div class="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[120px]">{{ d.category }}</div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="flex flex-col gap-1">
                    <div class="text-[14px] font-black text-slate-900 flex items-center gap-1.5">
                       <span class="text-indigo-600">REV</span> {{ d.revision }}
                    </div>
                    <div class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ formatDate(d.revisionDate) }}</div>
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
                    <Button label="Kelola Versi" severity="secondary" rounded outlined @click="openEdit(d)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                    <Button label="View File" icon="pi pi-external-link" text class="text-[8px] font-black uppercase tracking-widest p-0 h-6 text-indigo-500 hover:text-indigo-700" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && docs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">📐</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Repositori gambar kosong. Tidak ada blueprint yang terdaftar.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Drawing CRUD Dialog (Premium Architecture UI) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all p-4">
      <div class="w-full max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-indigo-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-indigo-200">
               <i class="pi pi-pencil text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ form.id ? 'Modify' : 'Register' }} <span class="text-indigo-600 italic text-2xl">Blueprint</span></h3>
                 <span v-if="form.id" :class="getStatusStyle(form.status)" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm">{{ form.status }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-indigo-500 text-indigo-600">Drawing Metadata & Revision Control Governance</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-amber-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              <!-- Panel Left: Drawing Identity -->
              <div class="lg:col-span-5 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-tag text-indigo-500"></i> I. Identitas & Meta-Data
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-indigo-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Judul Gambar (Drawing Title)</label>
                       <InputText v-model="form.title" class="w-full h-14 border-none rounded-2xl px-6 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all uppercase tracking-widest" placeholder="e.g., DENAH LANTAI 1 - REVISED" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Disiplin / Bidang</label>
                          <select v-model="form.discipline" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                             <option value="ARCHITECTURAL">ARCHITECTURAL</option>
                             <option value="STRUCTURAL">STRUCTURAL</option>
                             <option value="MEP">MEP</option>
                             <option value="ELECTRICAL">ELECTRICAL</option>
                             <option value="PLUMBING">PLUMBING</option>
                          </select>
                       </div>
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Kategori Dokumen</label>
                          <select v-model="form.category" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                             <option value="CONCEPTUAL">CONCEPTUAL</option>
                             <option value="FOR_CONSTRUCTION">FOR CONSTRUCTION (IFC)</option>
                             <option value="SHOP_DRAWING">SHOP DRAWING</option>
                             <option value="AS_BUILT">AS-BUILT</option>
                          </select>
                       </div>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Proyek Penugasan</label>
                       <select v-model="form.projectId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                          <option value="">-- CLIENT PROJECT --</option>
                          <option v-for="p in masterData.projects" :value="p.id">{{ p.name }}</option>
                       </select>
                    </div>

                    <div class="bg-indigo-50 p-4 rounded-[1.5rem] border border-indigo-100 shadow-inner mt-4 relative overflow-hidden group">
                       <div class="absolute right-0 bottom-0 px-4 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-tl-xl leading-none italic group-hover:scale-105 transition-transform">Document GCG</div>
                       <p class="text-[8px] font-bold text-slate-500 uppercase italic leading-loose">Setiap drawing wajib memiliki disiplin yang jelas guna memudahkan sinkronisasi antara paket konsultan arsitektur dan struktur.</p>
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Versioning & Status -->
              <div class="lg:col-span-7 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-history text-indigo-500"></i> II. Kontrol Revisi & Governance
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-10 transition-all hover:border-indigo-100 border-b-[8px] border-b-indigo-700">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div class="space-y-4">
                           <div class="flex flex-col gap-4">
                              <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Kode Dokumen</label>
                              <InputText v-model="form.code" class="w-full h-14 border-none rounded-2xl px-6 text-[12px] font-black text-slate-900 bg-slate-100 shadow-inner outline-none focus:ring-4 focus:ring-slate-400 transition-all uppercase" placeholder="e.g., ARCH-SHP-001" />
                           </div>
                           <div class="grid grid-cols-2 gap-4 mt-6">
                              <div class="flex flex-col gap-4">
                                 <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Versi Revisi</label>
                                 <InputText v-model="form.revision" class="w-full h-14 border-none rounded-2xl px-6 text-[14px] font-black text-indigo-600 bg-slate-50 shadow-inner outline-none text-center" placeholder="0 / A / B" />
                              </div>
                              <div class="flex flex-col gap-4 text-center">
                                 <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Status Drawing</label>
                                 <select v-model="form.status" class="w-full h-14 border-none rounded-2xl px-4 text-[10px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-indigo-400 transition-all appearance-none cursor-pointer uppercase text-center">
                                    <option value="APPROVED">APPROVED</option>
                                    <option value="APPROVED_WITH_COMMENTS">APP W/ COMMENTS</option>
                                    <option value="REVISED">REVISED / PENDING</option>
                                    <option value="SUPERSEDED">SUPERSEDED</option>
                                    <option value="VOID">VOID / CANCEL</option>
                                 </select>
                              </div>
                           </div>
                       </div>

                       <div class="space-y-6 flex flex-col justify-center bg-slate-50 p-4 rounded-[2rem] border border-slate-100 shadow-inner">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Digital Attachment / file Link</label>
                          <div class="flex flex-col items-center gap-4 text-center">
                             <div class="w-20 h-20 rounded-[1.5rem] bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <i class="pi pi-cloud-upload text-3xl"></i>
                             </div>
                             <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest max-w-[180px]">Link dokumen cloud atau ID file dari sistem dokumen pusat.</p>
                             <InputText v-model="form.fileId" class="w-full h-10 border-none rounded-xl px-4 text-[10px] font-black text-indigo-700 bg-white shadow-sm" placeholder="ID-DOC-XXXXX" />
                          </div>
                       </div>
                    </div>

                    <div class="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                       <div class="space-y-4">
                          <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Tanggal Revisi Efektif</label>
                          <InputText type="date" v-model="form.revisionDate" class="w-full h-14 border-none rounded-2xl px-6 text-[12px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none" />
                       </div>
                       <div class="bg-amber-50 p-4 rounded-[1.5rem] border border-amber-100 shadow-sm relative overflow-hidden group">
                          <div class="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
                          <div class="text-[10px] font-black text-amber-600 uppercase mb-2 italic tracking-widest">⚠️ Compliance Alert</div>
                          <p class="text-[8px] font-bold text-amber-900/60 leading-relaxed uppercase">Gambar berstatus 'SUPERSEDED' atau 'VOID' tidak boleh dipergunakan di lapangan sebagai acuan kerja utama.</p>
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
                <i class="pi pi-shield-check"></i> Standard Drawing Management GCG
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batal & Tutup" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button label="Simpan Master Data Drawing" icon="pi pi-save" size="large" :loading="saving" :disabled="saving" @click="save" class="h-14 px-12 bg-indigo-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all rounded-xl" />
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
const filterDiscipline = ref('ALL');

const docs = ref<any[]>([]);
const stats = ref<any>({ total: 0, pending: 0, structural: 0, arch: 0 });

const masterData = reactive({
  projects: [] as any[]
});

const form = reactive({
  id: '',
  projectId: '',
  code: '',
  title: '',
  category: 'SHOP_DRAWING',
  discipline: 'ARCHITECTURAL',
  revision: '0',
  revisionDate: new Date().toISOString().split('T')[0],
  status: 'APPROVED',
  fileId: ''
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
    const params: any = {};
    if (search.value) params.q = search.value;
    if (filterDiscipline.value !== 'ALL') params.discipline = filterDiscipline.value;

    const [res, statsRes] = await Promise.all([
      api.get('/construction/drawings', { params }),
      api.get('/construction/drawings/stats')
    ]);
    docs.value = res.data?.data || [];
    stats.value = statsRes.data || {};
  } catch (e) {
    console.warn('Failed to load drawings', e);
  } finally {
    loading.value = false;
  }
};

const openCreate = () => {
  Object.assign(form, {
    id: '',
    projectId: '',
    code: '',
    title: '',
    category: 'SHOP_DRAWING',
    discipline: 'ARCHITECTURAL',
    revision: '0',
    revisionDate: new Date().toISOString().split('T')[0],
    status: 'APPROVED',
    fileId: ''
  });
  dialogOpen.value = true;
};

const openEdit = (d: any) => {
  Object.assign(form, d);
  form.revisionDate = d.revisionDate?.split('T')[0];
  dialogOpen.value = true;
};

const save = async () => {
  if (!form.code || !form.title || !form.projectId) {
    return Swal.fire('Error', 'Mohon lengkapi kode, judul, dan proyek!', 'error');
  }
  
  saving.value = true;
  try {
    if (form.id) {
      await api.patch(`/construction/drawings/${form.id}`, form);
    } else {
      await api.post('/construction/drawings', form);
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Data gambar teknik berhasil disinkronisasi!',
      timer: 2000,
      showConfirmButton: false
    });
    
    dialogOpen.value = false;
    load();
  } catch (e) {
    Swal.fire('Error', 'Gagal memproses data gambar ke server.', 'error');
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
    case 'APPROVED_WITH_COMMENTS': return 'bg-blue-50 text-blue-700 border-blue-200 uppercase';
    case 'REVISED': return 'bg-amber-50 text-amber-700 border-amber-200 uppercase';
    case 'SUPERSEDED': return 'bg-slate-100 text-slate-500 border-slate-300 uppercase opacity-50';
    case 'VOID': return 'bg-rose-50 text-rose-700 border-rose-200 uppercase strike';
    default: return 'bg-slate-50 text-slate-500 border-slate-200 uppercase';
  }
};

const getStatusIcon = (status: string) => {
  if (status === 'APPROVED') return 'pi pi-check-circle animate-pulse';
  if (status === 'REVISED') return 'pi pi-refresh';
  return 'pi pi-info-circle';
};

const getStatusBorder = (status: string) => status === 'APPROVED' ? 'hover:border-l-emerald-400' : 'hover:border-l-indigo-400';

const getDisciplineStyle = (d: string) => {
  switch (d?.toUpperCase()) {
    case 'ARCHITECTURAL': return 'bg-blue-100 text-blue-800';
    case 'STRUCTURAL': return 'bg-indigo-100 text-indigo-800';
    case 'MEP': return 'bg-emerald-100 text-emerald-800';
    case 'ELECTRICAL': return 'bg-amber-100 text-amber-800';
    default: return 'bg-slate-100 text-slate-800';
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

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 1rem center; 
  background-size: 1em; 
}

.strike {
  text-decoration: line-through;
}
</style>
