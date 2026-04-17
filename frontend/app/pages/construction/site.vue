<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-6 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40"></div>
      
      <div class="relative flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-100 shrink-0">
          <i class="pi pi-building text-white text-xl"></i>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
             <span class="px-2 py-0.5 bg-blue-900 text-white text-[9px] font-black uppercase tracking-widest rounded">Construction ERP</span>
             <span class="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Site Management</span>
          </div>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase tracking-tighter">Laporan <span class="text-blue-600">Harian Proyek</span></h1>
        </div>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button v-if="canManage" label="Buat Laporan" icon="pi pi-plus" class="p-button-rounded font-black text-[10px] uppercase shadow-lg shadow-blue-100 px-6" @click="openCreate" />
      </div>
    </div>

    <!-- ═══════════════════════════════════ MAIN CONTENT ══════════════════════════════════ -->
    <main class="mx-6 p-2 grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-180px)]">
      
      <!-- LEFT COLUMN: Report List CARDS -->
      <div class="lg:col-span-4 space-y-4 flex flex-col h-full overflow-hidden">
        <div class="flex items-center justify-between mb-2 shrink-0">
          <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-mono">Log History Reports</h2>
          <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase border border-blue-100">
            {{ list.length }} Data
          </span>
        </div>

        <!-- Filters -->
        <div class="flex gap-2 mb-2 shrink-0 overflow-x-auto pb-2 scrollbar-hide">
           <button v-for="tab in tabOptions" :key="tab.key" @click="statusFilter = tab.key"
             :class="['px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shrink-0 border',
               statusFilter === tab.key ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-400 border-slate-200 hover:border-blue-300']">
             {{ tab.label }}
           </button>
        </div>

        <!-- Scrollable List -->
        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-10">
          <div v-for="item in list" :key="item.id" 
            @click="selectItem(item)"
            :class="['group relative p-5 rounded-xl border transition-all cursor-pointer overflow-hidden', 
              selectedItem?.id === item.id ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-100 scale-[1.02]' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1']"
          >
            <!-- Decoration -->
            <div v-if="selectedItem?.id === item.id" class="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            
            <div class="relative flex justify-between items-start mb-3">
              <div class="flex flex-col">
                <span :class="['text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded w-fit', selectedItem?.id === item.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 font-mono']">
                  {{ item.project?.code }}
                </span>
                <h3 :class="['text-xs font-black mt-2 uppercase tracking-tight line-clamp-1', selectedItem?.id === item.id ? 'text-white' : 'text-slate-900']">
                  {{ item.workSummary || 'Tanpa Summary' }}
                </h3>
              </div>
              <Tag :value="item.status" :severity="getStatusSeverity(item.status)" class="text-[8px] font-black uppercase tracking-wider px-2 rounded-lg" />
            </div>

            <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="pi pi-calendar text-[9px]" :class="selectedItem?.id === item.id ? 'text-blue-200' : 'text-slate-400'"></i>
                <span class="text-[9px] font-bold" :class="selectedItem?.id === item.id ? 'text-blue-100' : 'text-slate-500'">
                  {{ fmtLongDate(item.reportDate) }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-sun text-[9px]" :class="selectedItem?.id === item.id ? 'text-blue-200' : 'text-slate-400'"></i>
                <span class="text-[9px] font-bold" :class="selectedItem?.id === item.id ? 'text-blue-100' : 'text-slate-500'">
                  {{ item.morningWeather }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t" :class="selectedItem?.id === item.id ? 'border-white/10' : 'border-slate-100'">
               <div class="flex items-center gap-2">
                  <div class="h-1 flex-1 w-20 bg-slate-100 rounded-full overflow-hidden" :class="selectedItem?.id === item.id ? 'bg-white/20' : 'bg-slate-100'">
                    <div class="h-full bg-blue-400" :style="{ width: item.progressPercent + '%' }"></div>
                  </div>
                  <span class="text-[9px] font-black" :class="selectedItem?.id === item.id ? 'text-white italic' : 'text-blue-600'">{{ item.progressPercent }}%</span>
               </div>
               <i class="pi pi-chevron-right text-[9px] transition-transform group-hover:translate-x-1" :class="selectedItem?.id === item.id ? 'text-white' : 'text-slate-300'"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: Detailed View & Management -->
      <div class="lg:col-span-8 h-full overflow-hidden flex flex-col">
        
        <div v-if="!selectedItem && !isCreating" class="h-full flex flex-col items-center justify-center p-20 bg-white border border-slate-200 border-dashed rounded-xl shadow-sm">
          <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
            <i class="pi pi-mouse-pointer text-4xl text-slate-300 translate-x-0.5"></i>
          </div>
          <h3 class="text-xl font-black text-slate-400 uppercase tracking-widest">Pilih Laporan</h3>
          <p class="text-xs text-slate-500 font-bold mt-2 text-center max-w-sm italic">Klik pada kartu laporan di sebelah kiri atau buat laporan baru untuk mengelola detail progres konstruksi.</p>
        </div>

        <div v-else class="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10 space-y-6">
          
          <!-- INFO CARD (Header for Detail) -->
          <div class="bg-white border border-slate-200 rounded-xl p-8 relative overflow-hidden shadow-sm shrink-0">
             <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/20 to-transparent pointer-events-none"></div>

             <div class="relative flex flex-col md:flex-row md:items-start justify-between gap-8">
               <div class="flex-1">
                 <div class="flex items-center gap-3 mb-4">
                  <span class="px-3 py-1 bg-blue-50 border border-blue-100/50 rounded-full text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">
                    {{ selectedItem ? 'Execution Detail Log' : 'Creation Mode' }}
                  </span>
                  <Tag v-if="selectedItem" :value="selectedItem.status" :severity="getStatusSeverity(selectedItem.status)" class="text-[9px] font-black uppercase tracking-wider px-3 rounded-full" />
                 </div>
                 
                 <div v-if="isCreating || isEditing" class="space-y-4">
                    <Select v-model="form.projectId" :options="projects" optionLabel="name" optionValue="id" placeholder="Pilih Proyek Konstruksi..." class="w-full h-12 rounded-2xl border-slate-200 font-bold" @change="onProjectChange" />
                    <textarea v-model="form.workSummary" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-3xl p-4 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 transition-all resize-none uppercase italic" placeholder="Tuliskan Summary Pekerjaan Harian Hari Ini..."></textarea>
                 </div>
                 <template v-else>
                    <h2 class="text-3xl font-black text-slate-900 leading-tight mb-3 uppercase tracking-tighter">{{ selectedItem.project?.name }}</h2>
                    <p class="text-slate-500 text-sm leading-relaxed max-w-2xl font-bold uppercase italic tracking-tight">"{{ selectedItem.workSummary }}"</p>
                 </template>
               </div>
               
               <div class="flex flex-col gap-3 min-w-[200px]">
                  <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between shadow-inner">
                    <div class="flex flex-col">
                      <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tanggal Laporan</p>
                      <template v-if="isCreating || isEditing">
                        <DatePicker v-model="form.reportDate" class="h-8 text-[10px] font-black" />
                      </template>
                      <p v-else class="text-xs font-black text-slate-900 font-mono">{{ fmtFullDate(selectedItem.reportDate) }}</p>
                    </div>
                    <i class="pi pi-calendar text-slate-300 text-xl"></i>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="flex-1 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 group transition-all hover:border-blue-300">
                      <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <i class="pi pi-chart-bar text-xs"></i>
                      </div>
                      <div class="flex-1">
                        <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Progres</p>
                        <template v-if="isCreating || isEditing">
                          <InputNumber v-model="form.progressPercent" suffix="%" class="h-6 text-[10px] font-black" :minFractionDigits="2" />
                        </template>
                        <p v-else class="text-[11px] font-black text-blue-600 italic leading-none">{{ selectedItem.progressPercent || 0 }}%</p>
                      </div>
                    </div>
                  </div>
               </div>
             </div>
          </div>

          <!-- CONTROLS & STATUS -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
             <!-- LEFT: Main Controls -->
             <div class="md:col-span-8 flex flex-col gap-6">
                
                <!-- Tabbed Sections -->
                <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                   <div class="flex border-b border-slate-100 bg-slate-50/30 px-6 shrink-0">
                      <button v-for="t in detailTabs" :key="t.key" @click="activeTab = t.key"
                        :class="['px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2',
                          activeTab === t.key ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-400 hover:text-slate-600']">
                        <i :class="[t.icon, 'mr-2']"></i>{{ t.label }}
                      </button>
                   </div>

                   <div class="p-8">
                      <!-- Tab 1: Kondisi Lapangan -->
                      <div v-if="activeTab === 'GENERAL'" class="space-y-8 animate-in fade-in duration-300">
                         <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-4">
                               <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                  <i class="pi pi-sun text-blue-600"></i> Kondisi Cuaca Harian
                               </h4>
                               <div class="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-inner">
                                  <div class="text-center p-2 rounded-xl" :class="(form.morningWeather || selectedItem?.morningWeather) ? 'bg-white shadow-sm' : ''">
                                     <p class="text-[8px] font-black text-slate-400 uppercase mb-1">Pagi</p>
                                     <input v-if="isCreating || isEditing" v-model="form.morningWeather" class="w-full text-center text-[10px] font-black bg-transparent border-none p-0 uppercase focus:ring-0" placeholder="..." />
                                     <p v-else class="text-[10px] font-black uppercase text-slate-700">{{ selectedItem?.morningWeather || '-' }}</p>
                                  </div>
                                  <div class="text-center p-2 rounded-xl" :class="(form.afternoonWeather || selectedItem?.afternoonWeather) ? 'bg-white shadow-sm' : ''">
                                     <p class="text-[8px] font-black text-slate-400 uppercase mb-1">Siang</p>
                                     <input v-if="isCreating || isEditing" v-model="form.afternoonWeather" class="w-full text-center text-[10px] font-black bg-transparent border-none p-0 uppercase focus:ring-0" placeholder="..." />
                                     <p v-else class="text-[10px] font-black uppercase text-slate-700">{{ selectedItem?.afternoonWeather || '-' }}</p>
                                  </div>
                                  <div class="text-center p-2 rounded-xl" :class="(form.eveningWeather || selectedItem?.eveningWeather) ? 'bg-white shadow-sm' : ''">
                                     <p class="text-[8px] font-black text-slate-400 uppercase mb-1">Sore</p>
                                     <input v-if="isCreating || isEditing" v-model="form.eveningWeather" class="w-full text-center text-[10px] font-black bg-transparent border-none p-0 uppercase focus:ring-0" placeholder="..." />
                                     <p v-else class="text-[10px] font-black uppercase text-slate-700">{{ selectedItem?.eveningWeather || '-' }}</p>
                                  </div>
                               </div>
                            </div>
                            <div class="space-y-4">
                               <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                  <i class="pi pi-users text-blue-600"></i> Penanggung Jawab
                               </h4>
                               <div class="space-y-2">
                                  <div class="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                     <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black">PM</div>
                                     <div class="flex-1 shrink-0">
                                        <p class="text-[8px] font-black text-slate-400 uppercase leading-none mb-1">Project Manager</p>
                                        <template v-if="isCreating || isEditing">
                                           <Select v-model="form.siteManagerId" :options="employees" optionLabel="firstName" optionValue="id" placeholder="Pilih Manager" class="h-6 w-full text-[10px] font-black" />
                                        </template>
                                        <p v-else class="text-[10px] font-black text-slate-800 uppercase leading-none">{{ selectedItem?.siteManager?.firstName || '-' }}</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>

                         <div class="space-y-4">
                            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                               <i class="pi pi-info-circle text-blue-600"></i> Highlight & Kendala
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                  <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Instruksi Owner/Konsultan</p>
                                  <textarea v-if="isCreating || isEditing" v-model="form.ownerInstructions" rows="3" class="w-full text-[11px] font-bold bg-transparent border-none p-0 focus:ring-0" placeholder="Input instruksi jika ada..."></textarea>
                                  <p v-else class="text-[11px] font-bold text-slate-800 italic">{{ selectedItem.ownerInstructions || 'Tidak ada instruksi khusus.' }}</p>
                               </div>
                               <div class="bg-red-50/30 rounded-2xl p-4 border border-red-100/50">
                                  <p class="text-[9px] font-black text-red-400 uppercase tracking-widest mb-2">Kendala & Masalah Lapangan</p>
                                  <textarea v-if="isCreating || isEditing" v-model="form.issues" rows="3" class="w-full text-[11px] font-bold bg-transparent border-none p-0 focus:ring-0 text-red-900" placeholder="Penyebab delay, keterlambatan material, dll..."></textarea>
                                  <p v-else class="text-[11px] font-bold text-red-800 italic">{{ selectedItem.issues || 'Nihil.' }}</p>
                               </div>
                            </div>
                         </div>
                      </div>

                      <!-- Tab 2: Resource Management -->
                      <div v-if="activeTab === 'RESOURCES'" class="space-y-8 animate-in fade-in duration-300">
                         
                         <!-- Manpower / Tool Logs -->
                         <div class="space-y-4">
                            <div class="flex items-center justify-between">
                               <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 font-mono">
                                  <i class="pi pi-users text-blue-600"></i> Manpower & Resources Log
                               </h4>
                               <Button label="Add Entry" icon="pi pi-plus" size="small" text class="text-[9px] font-black uppercase" @click="addResourceRow" v-if="isCreating || isEditing" />
                            </div>
                            <div class="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                               <DataTable :value="isCreating || isEditing ? form.resources : selectedItem.resources" class="p-datatable-sm" responsiveLayout="scroll">
                                  <Column header="CATEGORY" class="pl-4">
                                     <template #body="{ data }">
                                        <div class="flex items-center gap-2">
                                           <i class="pi pi-box text-[10px] text-blue-500"></i>
                                           <input v-if="isCreating || isEditing" v-model="data.resourceType" class="text-[10px] font-black uppercase bg-transparent border-none p-0 focus:ring-0 w-full" placeholder="Resource Name..." />
                                           <span v-else class="text-[10px] font-black uppercase text-slate-700">{{ data.resourceType }}</span>
                                        </div>
                                     </template>
                                  </Column>
                                  <Column header="QUANTITY">
                                     <template #body="{ data }">
                                        <input v-if="isCreating || isEditing" v-model.number="data.quantity" type="number" class="w-16 text-[10px] font-black bg-slate-50 border border-slate-100 rounded px-2 py-1 focus:ring-0" />
                                        <span v-else class="text-[10px] font-black text-slate-900">{{ data.quantity }}</span>
                                     </template>
                                  </Column>
                                  <Column header="UNIT">
                                     <template #body="{ data }">
                                        <input v-if="isCreating || isEditing" v-model="data.unit" class="w-16 text-[10px] font-black uppercase bg-transparent border-none p-0 focus:ring-0" placeholder="Unit..." />
                                        <span v-else class="text-[10px] font-black uppercase text-slate-500">{{ data.unit || 'Unit' }}</span>
                                     </template>
                                  </Column>
                                  <Column v-if="isCreating || isEditing" header="X" class="pr-4 text-right">
                                     <template #body="{ index }">
                                        <Button icon="pi pi-times" severity="danger" text size="small" @click="form.resources.splice(index, 1)" />
                                     </template>
                                  </Column>
                               </DataTable>
                            </div>
                         </div>

                         <!-- Subcontractor Log -->
                         <div class="space-y-4">
                            <div class="flex items-center justify-between">
                               <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 font-mono">
                                  <i class="pi pi-briefcase text-blue-600"></i> Subcontractor Daily Log
                               </h4>
                               <Button label="Add Log" icon="pi pi-plus" size="small" text class="text-[9px] font-black uppercase" @click="addSubconRow" v-if="isCreating || isEditing" />
                            </div>
                            <div class="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                               <DataTable :value="isCreating || isEditing ? form.subcontractors : selectedItem.subcontractors" class="p-datatable-sm" responsiveLayout="scroll">
                                  <Column header="SUBCONTRACTOR" class="pl-4">
                                     <template #body="{ data }">
                                        <input v-if="isCreating || isEditing" v-model="data.subcontractorName" class="text-[10px] font-black uppercase bg-transparent border-none p-0 focus:ring-0 w-full" placeholder="Nama Subkon..." />
                                        <span v-else class="text-[10px] font-black uppercase text-slate-700">{{ data.subcontractorName }}</span>
                                     </template>
                                  </Column>
                                  <Column header="WORKERS">
                                     <template #body="{ data }">
                                        <input v-if="isCreating || isEditing" v-model.number="data.workerCount" type="number" class="w-12 text-[10px] font-black bg-slate-50 border border-slate-100 rounded px-2 py-1 focus:ring-0" />
                                        <span v-else class="text-[10px] font-black text-slate-900">{{ data.workerCount }} Org</span>
                                     </template>
                                  </Column>
                                  <Column header="DESCRIPTION">
                                     <template #body="{ data }">
                                        <input v-if="isCreating || isEditing" v-model="data.workDescription" class="text-[10px] font-bold bg-transparent border-none p-0 focus:ring-0 w-full" placeholder="Kegiatan..." />
                                        <span v-else class="text-[10px] font-bold text-slate-500 uppercase">{{ data.workDescription }}</span>
                                     </template>
                                  </Column>
                               </DataTable>
                            </div>
                         </div>
                      </div>

                      <!-- Tab 3: Documentation -->
                      <div v-if="activeTab === 'PHOTOS'" class="space-y-8 animate-in fade-in duration-300">
                         <div class="space-y-4">
                            <div class="bg-white p-6 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                               <i class="pi pi-images text-4xl text-slate-200 mb-4"></i>
                               <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Visual Documentation Gallery</p>
                               <p class="text-[8px] font-bold text-slate-400 mt-1 max-w-[200px]">Semua foto progres lapangan, safety, dan material terdokumentasi di sini.</p>
                            </div>
                            
                            <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
                               <div v-for="i in 3" :key="i" class="group relative rounded-3xl overflow-hidden bg-slate-100 aspect-square border-2 border-white shadow-sm transition-all hover:scale-[1.05] hover:shadow-xl">
                                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                  <div class="absolute bottom-4 left-4 right-4">
                                     <p class="text-[8px] font-black text-blue-400 uppercase mb-0.5">Category: Progress</p>
                                     <p class="text-[10px] font-bold text-white uppercase leading-none truncate">Dokumentasi Site Area #{{ i }}</p>
                                  </div>
                                  <i class="pi pi-image absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-slate-200 opacity-20"></i>
                               </div>
                            </div>
                         </div>

                         <div class="space-y-4 pt-6 border-t border-slate-100">
                            <h4 class="text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-2 font-mono">
                               <i class="pi pi-shield"></i> Safety & HSE Summary
                            </h4>
                            <div class="p-6 bg-red-50/20 rounded-xl border border-red-100/50">
                               <textarea v-if="isCreating || isEditing" v-model="form.safetySummary" rows="3" class="w-full text-[11px] font-bold bg-transparent border-none p-0 focus:ring-0 text-red-900" placeholder="Summary kondisi K3 hari ini..."></textarea>
                               <p v-else class="text-[11px] font-bold text-red-800 leading-relaxed italic">"{{ selectedItem.safetySummary || 'Tidak ada temuan unsafe action/condition hari ini. Semua Pekerja menggunakan APD lengkap.' }}"</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <!-- RIGHT: Sidebar Controls (Status Transitions) -->
             <div class="md:col-span-4 space-y-6">
                
                <!-- Status Action Card -->
                <div class="bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200/50">
                   <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                   
                   <h3 class="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-3">
                     <i class="pi pi-send"></i> Workflow Steering
                   </h3>

                   <div class="space-y-4">
                      <div v-if="!isCreating && !isEditing">
                        <button v-if="selectedItem?.status === 'DRAFT'" @click="updateStatus('SUBMITTED')" :disabled="saving"
                          class="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-between px-6 transition-all group active:scale-95 shadow-lg shadow-blue-500/20">
                          <span class="text-[10px] font-black uppercase tracking-widest">Kirim Laporan</span>
                          <i class="pi pi-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </button>
                        <button v-if="selectedItem?.status === 'SUBMITTED' && canManage" @click="updateStatus('APPROVED')" :disabled="saving"
                          class="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-between px-6 transition-all group active:scale-95 shadow-lg shadow-emerald-500/20">
                          <span class="text-[10px] font-black uppercase tracking-widest">Approve Laporan</span>
                          <i class="pi pi-check-circle group-hover:scale-110 transition-transform"></i>
                        </button>
                        <div v-if="selectedItem?.status === 'APPROVED'" class="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl flex flex-col items-center text-center">
                           <i class="pi pi-verified text-2xl text-emerald-400 mb-2"></i>
                           <p class="text-[10px] font-black uppercase tracking-widest text-emerald-100 leading-none">Laporan Disetujui</p>
                           <p class="text-[8px] font-bold text-emerald-500 mt-2 uppercase">Verified on System</p>
                        </div>
                      </div>

                      <div v-else class="space-y-3">
                         <button @click="save" :disabled="saving" class="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl">
                            <i class="pi pi-save"></i> {{ isCreating ? 'Save & Create' : 'Save Changes' }}
                         </button>
                         <button @click="cancelEdit" class="w-full h-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-widest">
                            Cancel
                         </button>
                      </div>
                   </div>

                   <!-- Meta Info -->
                   <div v-if="selectedItem" class="mt-8 pt-8 border-t border-white/5 space-y-4">
                      <div class="flex items-center gap-4 group">
                         <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                            <i class="pi pi-id-card text-[10px] text-blue-400"></i>
                         </div>
                         <div>
                            <p class="text-[8px] font-black text-white/40 uppercase leading-none mb-1">Submitted By</p>
                            <p class="text-[10px] font-black text-white uppercase italic leading-none">{{ selectedItem.submittedBy || 'System' }}</p>
                         </div>
                      </div>
                      <div v-if="selectedItem.approvedAt" class="flex items-center gap-4 group">
                         <div class="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shrink-0">
                            <i class="pi pi-shield text-[10px] text-emerald-400"></i>
                         </div>
                         <div>
                            <p class="text-[8px] font-black text-emerald-400 uppercase leading-none mb-1">Approved At</p>
                            <p class="text-[10px] font-black text-white uppercase italic leading-none">{{ fmtFullDate(selectedItem.approvedAt) }}</p>
                         </div>
                      </div>
                   </div>
                </div>

                <!-- Summary Chart / Context -->
                <div class="bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                   <div class="w-20 h-20 rounded-full border-8 border-blue-50 flex items-center justify-center relative scale-in-center">
                      <svg class="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="8" fill="transparent" class="text-blue-600" :stroke-dasharray="2 * Math.PI * 32" :stroke-dashoffset="2 * Math.PI * 32 * (1 - (selectedItem?.progressPercent || 0) / 100)" />
                      </svg>
                      <span class="text-[11px] font-black text-slate-800 italic">{{ selectedItem?.progressPercent || 0 }}%</span>
                   </div>
                   <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-4">Daily Milestone reached</p>
                   <p class="text-[8px] font-bold text-slate-300 mt-1 uppercase">Updated Real-Time via Construction ERP</p>
                </div>

             </div>
          </div>

        </div>
      </div>
    </main>

    <!-- Confirmation & Toast -->
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();
const api = useApi();
const auth = useAuthStore();

// Permissions
const canRead = computed(() => auth.hasPermission('project.site.read'));
const canManage = computed(() => auth.hasPermission('project.site.execute'));

// UI State
const loading = ref(false);
const saving = ref(false);
const list = ref<any[]>([]);
const projects = ref<any[]>([]);
const employees = ref<any[]>([]);
const selectedItem = ref<any>(null);
const isCreating = ref(false);
const isEditing = ref(false);
const activeTab = ref('GENERAL');
const statusFilter = ref('ALL');
const q = ref('');

const tabOptions = [
  { label: 'Semua', key: 'ALL' },
  { label: 'Draft', key: 'DRAFT' },
  { label: 'Waiting', key: 'SUBMITTED' },
  { label: 'Final', key: 'APPROVED' },
]

const detailTabs = [
  { label: 'Situasi Lapangan', key: 'GENERAL', icon: 'pi pi-sun' },
  { label: 'Log Sumber Daya', key: 'RESOURCES', icon: 'pi pi-users' },
  { label: 'HSE & Foto', key: 'PHOTOS', icon: 'pi pi-camera' },
]

// Form State
const form = ref<any>({
  projectId: null,
  reportDate: new Date(),
  morningWeather: '',
  afternoonWeather: '',
  eveningWeather: '',
  workSummary: '',
  progressPercent: 0,
  issues: '',
  safetySummary: '',
  incidentSummary: '',
  visitorSummary: '',
  ownerInstructions: '',
  siteManagerId: null,
  hseOfficerId: null,
  resources: [],
  subcontractors: [],
  photos: []
});

async function load() {
  loading.value = true;
  try {
    const { data } = await api.get('/construction/sites', {
      params: { q: q.value, status: statusFilter.value }
    });
    list.value = data.data || data;
    if (list.value.length > 0 && !selectedItem.value && !isCreating.value) {
      selectItem(list.value[0]);
    }
  } catch (e) {
  } finally {
    loading.value = false;
  }
}

async function loadHelpers() {
  try {
    const [pRes, eRes] = await Promise.all([
      api.get('/project/projects'),
      api.get('/hris/employees')
    ]);
    projects.value = pRes.data.data || pRes.data;
    employees.value = eRes.data.data || eRes.data;
  } catch (e) {}
}

function selectItem(item: any) {
  selectedItem.value = item;
  isCreating.value = false;
  isEditing.value = false;
  activeTab.value = 'GENERAL';
}

function openCreate() {
  isCreating.value = true;
  selectedItem.value = null;
  resetForm();
  loadHelpers();
}

function editItem() {
  isEditing.value = true;
  form.value = { ...selectedItem.value, reportDate: new Date(selectedItem.value.reportDate) };
  loadHelpers();
}

function resetForm() {
  form.value = {
    projectId: null, reportDate: new Date(), morningWeather: '', afternoonWeather: '', eveningWeather: '',
    workSummary: '', progressPercent: 0, issues: '', safetySummary: '', incidentSummary: '', 
    visitorSummary: '', ownerInstructions: '', siteManagerId: null, hseOfficerId: null,
    resources: [], subcontractors: [], photos: []
  }
}

function onProjectChange() {
  // Logic if needed
}

function addResourceRow() {
  form.value.resources.push({ resourceType: '', quantity: 1, unit: 'Unit', notes: '' });
}

function addSubconRow() {
  form.value.subcontractors.push({ subcontractorName: '', workerCount: 1, workDescription: '' });
}

async function updateStatus(s: string) {
  saving.value = true;
  try {
    await api.patch(`/construction/sites/${selectedItem.value.id}`, { status: s });
    load();
  } catch (e) {} finally { saving.value = false; }
}

async function save() {
  saving.value = true;
  try {
    if (isCreating.value) {
      await api.post('/construction/sites', form.value);
    } else {
      await api.patch(`/construction/sites/${selectedItem.value.id}`, form.value);
    }
    isCreating.value = false;
    isEditing.value = false;
    load();
  } catch (e) {} finally { saving.value = false; }
}

function cancelEdit() {
  isCreating.value = false;
  isEditing.value = false;
  if (list.value.length > 0) selectItem(list.value[0]);
}

// FORMATTING
function fmtLongDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : '-' }
function fmtFullDate(d: string) { return d ? new Date(d).toLocaleDateString('id-ID', { dateStyle: 'long' }) : '-' }

function getStatusSeverity(s: string) {
  const m: any = { DRAFT: 'secondary', SUBMITTED: 'warn', APPROVED: 'success' }
  return m[s] || 'info'
}

function getStatusStyles(s: string) {
  const m: any = { DRAFT: 'bg-slate-100 text-slate-500', SUBMITTED: 'bg-amber-50 text-amber-600', APPROVED: 'bg-emerald-50 text-emerald-600' }
  return m[s] || 'bg-slate-50'
}

onMounted(() => { if (canRead.value) load(); });
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.animate-in { animation: animateIn 0.5s ease-out; }
@keyframes animateIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.scale-in-center { animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
@keyframes scale-in-center {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.pulse-subtle { animation: pulse 3s infinite; }
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
