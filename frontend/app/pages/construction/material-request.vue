<template>
  <div class="space-y-4">
    <!-- Header (Premium Construction Logistics Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-amber-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-4 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-amber-100">Construction Suite</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-amber-600">Material Request</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Material <span class="text-amber-600 not-italic text-3xl">Request</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-amber-900/60 leading-relaxed mt-3">Sistem pengajuan kebutuhan material proyek. Sinkronisasikan antara Bill of Quantities (BoQ) teknis dengan pengadaan logistik pusat, pastikan aliran material berkelanjutan.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Audit Logistik" size="small" icon="pi pi-shield" class="p-button-rounded h-12 px-8 bg-slate-100 border-none text-slate-600 font-black text-[10px] uppercase hover:bg-slate-200 transition-all shadow-sm" />
          <Button label="+ Buat Permintaan Baru" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Telemetry KPIs (Construction Heavy Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up mt-4">
      <div class="p-4 rounded-2xl bg-amber-950 text-white shadow-xl flex flex-col justify-between border border-amber-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] mb-4 opacity-80">Total Pengajuan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ stats.total || 0 }}</h3>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-file text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-t-amber-500">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Pending Persetujuan</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-900 tracking-tighter leading-none">{{ stats.pending || 0 }}</h3>
          <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><i class="pi pi-clock text-lg"></i></div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Urgency Alerts</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-rose-600 tracking-tighter leading-none">0</h3>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 transition-all hover:rotate-12"><i class="pi pi-exclamation-triangle text-lg"></i></div>
        </div>
      </div>

       <div class="p-4 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-amber-100 tracking-[0.2em] mb-4 opacity-80">Total Baris Material</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-white tracking-tighter leading-none">{{ stats.itemCount || 0 }}</h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-box text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Construction Ledger (Premium Grid Architecture) -->
    <div class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up mt-6 pb-20">
      <!-- Controls Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6"><i class="pi pi-briefcase text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Daftar Pengajuan Material Lapangan</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Site-to-Warehouse Flow</p>
           </div>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="search" placeholder="Cari Kode Permintaan / Proyek..." class="border-none bg-transparent text-[11px] h-9 w-64 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" @keyup.enter="load" />
          </div>
          <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-amber-600 transition-all shadow-sm bg-white" />
        </div>
      </div>

      <!-- Item Table -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-sm">
          <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
            <tr>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[300px]">Kode & Tanggal</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Referensi Proyek & WBS</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Pemohon</th>
              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Progres</th>
              <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="5" class="py-24 text-center">
                <i class="pi pi-spinner pi-spin text-4xl text-amber-500 opacity-20"></i>
                <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-amber-600">Sinkronisasi data proyek lapangan...</div>
              </td>
            </tr>
            
            <tr v-for="doc in docs" v-else :key="doc.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent" :class="getStatusBorder(doc.status)">
              <td class="px-8 py-6 align-middle">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                       <i class="pi pi-file text-lg"></i>
                    </div>
                    <div>
                       <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-amber-700 transition-colors uppercase">
                          {{ doc.code }}
                       </div>
                       <div class="mt-1 font-black text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2 text-amber-600">
                          <i class="pi pi-calendar text-[8px]"></i> {{ formatDate(doc.requestDate) }}
                       </div>
                    </div>
                 </div>
              </td>
              
              <td class="px-6 py-6 align-middle border-l border-slate-50">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm border border-amber-100 group-hover:scale-110 transition-transform">
                     <i class="pi pi-map-marker text-xs"></i>
                  </div>
                  <div>
                    <div class="text-[11px] font-black text-slate-800 uppercase tracking-tight">{{ doc.project?.name || '-' }}</div>
                    <div class="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{{ doc.wbsTask?.taskName || 'General Site' }}</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-6 align-middle border-l border-slate-50">
                 <div class="flex items-center gap-3">
                    <Avatar :label="doc.requestedBy?.name?.[0]" shape="circle" class="bg-slate-200 text-slate-600 font-bold" />
                    <div>
                       <div class="text-[11px] font-black text-slate-700 uppercase tracking-tight">{{ doc.requestedBy?.name || 'Unknown' }}</div>
                       <div class="text-[9px] font-medium text-slate-400">{{ doc.requestedBy?.email }}</div>
                    </div>
                 </div>
              </td>

              <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                 <div class="relative flex flex-col items-center gap-1.5">
                    <span :class="getStatusStyle(doc.status)" class="inline-flex rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase group-hover:scale-105 transition-all">
                       <i :class="getStatusIcon(doc.status)" class="text-[7px] mr-2"></i> {{ doc.status }}
                    </span>
                 </div>
              </td>

              <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                 <div class="flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Button label="Audit & Edit" severity="secondary" rounded outlined @click="openEdit(doc)" class="h-9 px-6 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest" />
                 </div>
              </td>
            </tr>
            
            <tr v-if="!loading && docs.length === 0">
              <td colspan="5" class="py-32 text-center text-slate-500">
                 <div class="text-6xl mb-4 opacity-10">🚧</div>
                 <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Antrian permintaan kosong. Lapangan belum mengajukan kebutuhan material.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Construction Dialog (Premium Centered UI) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all p-4">
      <div class="w-full max-w-7xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-amber-900">
        <!-- Workspace Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-amber-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0 shadow-amber-200">
               <i class="pi pi-box text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ form.id ? 'Audit' : 'Draft' }} <span class="text-amber-600 italic text-2xl">Material Request</span></h3>
                 <span v-if="form.id" :class="getStatusStyle(form.status)" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm">{{ form.status }}</span>
              </div>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-amber-500 text-amber-600">Technical Material Procurement Flow & Site Governance</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="dialogOpen = false" class="relative z-10 hover:bg-amber-50 h-12 w-12" />
        </div>
        
        <!-- Workspace Body -->
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Panel Left: Project & Site -->
              <div class="lg:col-span-4 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-map-marker text-amber-500"></i> I. Lokasi & Penugasan
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-amber-100">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 leading-tight">Proyek Konstruksi</label>
                       <select v-model="form.projectId" @change="onProjectChange" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                          <option value="">-- PILIH PROYEK --</option>
                          <option v-for="p in masterData.projects" :value="p.id">{{ p.name }} ({{ p.code }})</option>
                       </select>
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 leading-tight">WBS Task / Area Kerja</label>
                       <select v-model="form.wbsTaskId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all appearance-none cursor-pointer uppercase tracking-widest">
                          <option value="">-- PILIH TASK / GENERAL --</option>
                          <option v-for="t in availableTasks" :value="t.id">{{ t.taskName }}</option>
                       </select>
                    </div>

                    <div class="bg-indigo-50 p-4 rounded-[1.5rem] border border-indigo-100 shadow-inner">
                       <div class="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2 text-amber-600">
                          <i class="pi pi-info-circle"></i> Kebijakan Pengadaan
                       </div>
                       <p class="text-[8px] font-bold text-slate-500 mt-1 uppercase italic leading-tight">Permintaan akan difilter sesuai Bill of Quantities (BoQ) yang telah disetujui pada project plan.</p>
                    </div>
                 </div>
              </div>

              <!-- Panel Middle: Request Metadata -->
              <div class="lg:col-span-3 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-calendar text-amber-500"></i> II. Metadata & Urgency
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-8 transition-all hover:border-amber-100 border-b-[8px] border-b-amber-600">
                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nomor Pengajuan (Otomatis)</label>
                       <InputText v-model="form.code" readonly class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-400 bg-slate-100 shadow-inner outline-none font-mono tracking-widest uppercase" />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal Dibutuhkan</label>
                       <InputText type="date" v-model="form.requestDate" class="w-full h-14 border-none rounded-2xl px-6 text-[13px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all uppercase" />
                    </div>

                    <div class="space-y-4">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Prioritas Unit</label>
                       <div class="flex gap-2">
                          <button v-for="p in ['NORMAL', 'HIGH', 'URGENT']" :key="p" @click="form.priority = p" :class="form.priority === p ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100'" class="flex-1 py-3 rounded-xl text-[9px] font-black uppercase transition-all">{{ p }}</button>
                       </div>
                    </div>

                    <div class="pt-4 border-t border-slate-100 italic space-y-2">
                       <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Justifikasi Teknis Lapangan</label>
                       <textarea v-model="form.notes" rows="3" class="w-full rounded-2xl border-none bg-slate-50 p-4 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-amber-400 transition-all placeholder-slate-300" placeholder="Contoh: Percepatan struktur pada zona A lantai 5..."></textarea>
                    </div>
                 </div>
              </div>

              <!-- Panel Right: Item Lines -->
              <div class="lg:col-span-5 animate-fade-in-up" style="animation-delay: 0.2s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                    <i class="pi pi-list text-amber-500"></i> III. Rincian Material (Bill of Items)
                 </div>
                 <div class="bg-amber-950 p-0 rounded-[2.5rem] shadow-2xl shadow-amber-900/10 border-4 border-amber-900 relative overflow-hidden group min-h-[500px] flex flex-col">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-30"></div>
                    
                    <div class="p-10 pb-6 shrink-0 relative z-10 flex justify-between items-center">
                       <div>
                          <h4 class="text-xl font-black text-white leading-none uppercase tracking-tight italic">Material <span class="text-amber-500 not-italic">Lines</span></h4>
                          <p class="text-[9px] font-bold text-amber-400 uppercase tracking-widest mt-2">Daftar item yang akan diminta ke Logistik Pusat.</p>
                       </div>
                       <Button icon="pi pi-plus" severity="warning" rounded class="h-12 w-12 shadow-xl shadow-amber-900/50" @click="addLine" />
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar px-10">
                       <div class="space-y-4 pb-10">
                          <div v-for="(line, idx) in form.items" :key="idx" class="bg-white/5 rounded-[1.5rem] p-4 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 group/line">
                             <div class="flex justify-between items-start mb-4">
                                <span class="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-[10px]">{{ idx + 1 }}</span>
                                <Button icon="pi pi-times" severity="danger" text @click="removeLine(idx)" class="h-8 w-8 text-white/20 hover:text-rose-500" />
                             </div>
                             
                             <div class="grid grid-cols-12 gap-4">
                               <div class="col-span-12">
                                  <label class="text-[8px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2 block">Cari Produk / Deskripsi Manual</label>
                                  <div class="flex items-center bg-black/30 rounded-xl border border-white/5 p-1 ring-1 ring-white/10 focus-within:ring-amber-500 transition-all">
                                    <i class="pi pi-search px-3 text-white/20"></i>
                                    <InputText v-model="line.description" class="w-full bg-transparent border-none text-[12px] font-black text-white p-2 focus:ring-0 outline-none placeholder-white/10 italic" placeholder="Contoh: Semen Holcim Premium..." />
                                  </div>
                               </div>
                               <div class="col-span-6">
                                  <label class="text-[8px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2 block">Kuantitas</label>
                                  <InputNumber v-model="line.quantity" :min="1" class="w-full custom-number-input" placeholder="0" />
                               </div>
                               <div class="col-span-6">
                                  <label class="text-[8px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2 block">Satuan (UOM)</label>
                                  <InputText v-model="line.uomCode" class="w-full bg-black/30 border border-white/10 rounded-xl text-white text-[12px] font-black uppercase p-3" placeholder="ZAK / KG" />
                               </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div class="p-10 pt-6 border-t border-amber-900 shrink-0 bg-amber-950/80 backdrop-blur-md relative z-10 flex justify-between items-center">
                       <div class="text-[10px] font-black text-white/40 uppercase tracking-widest">
                          Total Barisan: {{ form.items.length }}
                       </div>
                       <div v-if="form.status === 'SUBMITTED'" class="bg-emerald-600/10 rounded-2xl px-4 py-2 border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase italic">
                          <i class="pi pi-check mr-1"></i> Data Terkirim ke Logistic Center
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
                <i class="pi pi-shield-check"></i> Pengadaan Terproteksi SCM
             </div>
          </div>
          <div class="flex items-center gap-4">
             <Button label="Batal & Tutup" severity="secondary" text @click="dialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
             <Button 
                label="Simpan & Kirim Permintaan" 
                icon="pi pi-send" 
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
const stats = ref<any>({ total: 0, pending: 0, approved: 0, itemCount: 0 });

const masterData = reactive({
  projects: [] as any[],
  items: [] as any[]
});

const form = reactive({
  id: '',
  code: '',
  projectId: '',
  wbsTaskId: '',
  requestDate: new Date().toISOString().split('T')[0],
  priority: 'NORMAL',
  notes: '',
  status: 'DRAFT',
  items: [] as any[]
});

const availableTasks = computed(() => {
  if (!form.projectId) return [];
  const proj = masterData.projects.find(p => p.id === form.projectId);
  return proj?.wbsTasks || [];
});

const loadMasterData = async () => {
  try {
    const [projRes, itemRes] = await Promise.all([
      api.get('/core/query?table=Project&include=wbsTasks'),
      api.get('/core/query?table=Item&take=50')
    ]);
    masterData.projects = projRes.data?.data || [];
    masterData.items = itemRes.data?.data || [];
  } catch (e) {
    console.error('Failed to load master data', e);
  }
};

const load = async () => {
  loading.value = true;
  try {
    const [res, statsRes] = await Promise.all([
      api.get('/construction/material-requests'),
      api.get('/construction/material-requests/stats')
    ]);
    docs.value = res.data?.data || [];
    stats.value = statsRes.data || {};
  } catch (e) {
    console.warn('Failed to load data', e);
  } finally {
    loading.value = false;
  }
};

const openCreate = () => {
  form.id = '';
  form.code = '(AUTO-GENERATED)';
  form.projectId = '';
  form.wbsTaskId = '';
  form.requestDate = new Date().toISOString().split('T')[0];
  form.priority = 'NORMAL';
  form.notes = '';
  form.status = 'DRAFT';
  form.items = [{ description: '', quantity: 0, uomCode: 'PCS' }];
  dialogOpen.value = true;
};

const openEdit = (d: any) => {
  form.id = d.id;
  form.code = d.code;
  form.projectId = d.projectId;
  form.wbsTaskId = d.wbsTaskId || '';
  form.requestDate = d.requestDate?.split('T')[0];
  form.priority = d.priority;
  form.notes = d.notes;
  form.status = d.status;
  form.items = d.items?.map((it: any) => ({
    itemId: it.itemId,
    description: it.description,
    quantity: Number(it.quantity),
    uomCode: it.uomCode,
    notes: it.notes
  })) || [];
  dialogOpen.value = true;
};

const addLine = () => {
  form.items.push({ description: '', quantity: 0, uomCode: 'PCS' });
};

const removeLine = (idx: number) => {
  form.items.splice(idx, 1);
};

const onProjectChange = () => {
  form.wbsTaskId = '';
};

const save = async () => {
  if (!form.projectId) {
    return Swal.fire('Error', 'Silakan pilih proyek!', 'error');
  }
  if (form.items.length === 0) {
    return Swal.fire('Error', 'Minimal satu item harus ditambahkan!', 'error');
  }

  saving.value = true;
  try {
    const payload = { ...form };
    if (form.id) {
      await api.patch(`/construction/material-requests/${form.id}`, payload);
    } else {
      await api.post('/construction/material-requests', payload);
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Permintaan material telah disimpan dan diajukan!',
      timer: 2000,
      showConfirmButton: false
    });
    
    dialogOpen.value = false;
    load();
  } catch (e) {
    Swal.fire('Gagal', 'Gagal menyimpan permintaan material.', 'error');
  } finally {
    saving.value = false;
  }
};

const formatDate = (iso: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'APPROVED': return 'bg-emerald-50 text-emerald-700 border-emerald-200 uppercase';
    case 'FULFILLED': return 'bg-blue-50 text-blue-700 border-blue-200 uppercase';
    case 'REJECTED': return 'bg-rose-50 text-rose-700 border-rose-200 uppercase';
    case 'SUBMITTED': return 'bg-amber-50 text-amber-700 border-amber-200 uppercase';
    default: return 'bg-slate-50 text-slate-500 border-slate-200 uppercase';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'APPROVED': return 'pi pi-check-circle animate-pulse';
    case 'FULFILLED': return 'pi pi-verified';
    case 'REJECTED': return 'pi pi-times-circle';
    default: return 'pi pi-clock';
  }
};

const getStatusBorder = (status: string) => {
  switch (status) {
    case 'APPROVED': return 'hover:border-l-emerald-400';
    case 'SUBMITTED': return 'hover:border-l-amber-400';
    default: return 'hover:border-l-slate-400';
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
.custom-scrollbar::-webkit-scrollbar-thumb:hover { 
  background: #cbd5e1; 
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

:deep(.custom-number-input .p-inputnumber-input) {
  background-color: rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
  text-align: center;
}

select { 
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
  background-repeat: no-repeat; 
  background-position: right 1rem center; 
  background-size: 1em; 
}
</style>
