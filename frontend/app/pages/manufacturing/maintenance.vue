<template>
  <div class="space-y-4 font-sans text-slate-900 custom-scrollbar overflow-x-hidden">

    <!-- Header (Premium Maintenance Operations Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0 animate-fade-in-up">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-100 font-sans">Maintenance Hub</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-emerald-600">Manajemen Aset & CMMS Engine</span>
          </div>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Aset & <span class="text-emerald-600 not-italic text-xl md:text-2xl lg:text-3xl">Peralatan Produksi</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl text-emerald-900/60 leading-relaxed mt-3">Sistem terintegrasi untuk pemeliharaan fasilitas, pencegahan kerusakan, dan pencatatan riwayat pekerjaan teknis secara real-time.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button 
            v-if="activeTab === 'assets'" 
            label="+ Registrasi Aset Baru" 
            icon="pi pi-plus" 
            class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all"
            @click="openEquipmentCreate"
          />
          <Button 
            v-if="activeTab === 'requests'" 
            label="+ Permintaan Perbaikan" 
            icon="pi pi-bolt" 
            class="p-button-rounded h-12 px-8 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all"
            @click="openRequestCreate"
          />
          <Button 
            v-if="activeTab === 'logs'" 
            label="+ Log Pekerjaan Manual" 
            icon="pi pi-file-edit" 
            class="p-button-rounded h-12 px-8 bg-slate-900 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-slate-100 hover:scale-105 active:scale-95 transition-all"
            @click="openLogCreate(null)"
          />
        </div>
      </div>
    </div>

    <!-- Maintenance Telemetry Dashboard (High-Contrast Style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up mt-4">
      <div class="p-6 rounded-2xl bg-emerald-950 text-white shadow-xl flex flex-col justify-between border border-emerald-900 transition-all hover:bg-black group">
        <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 opacity-80">Reliabilitas Peralatan</div>
        <div class="flex items-end justify-between">
          <div class="flex flex-col">
            <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">{{ stats[0].value }}</h3>
            <span class="text-[10px] font-bold text-emerald-400 mt-2 uppercase tracking-widest">{{ stats[0].trend }} vs Bulan Lalu</span>
          </div>
          <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-check-circle text-lg text-emerald-400"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-4">Kerusakan Aktif (Breakdown)</div>
        <div class="flex items-end justify-between">
          <div class="flex flex-col">
             <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-rose-700 tracking-tighter leading-none">{{ stats[1].value }}</h3>
             <span class="text-[10px] font-bold text-rose-400 mt-2 uppercase tracking-widest">Memerlukan Audit Teknis</span>
          </div>
          <div class="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 group-hover:rotate-12 transition-transform"><i class="pi pi-exclamation-triangle text-lg"></i></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Urutan Antrean Preventif</div>
        <div class="flex items-end justify-between">
          <div class="flex flex-col">
             <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-700 tracking-tighter leading-none">{{ stats[2].value }}</h3>
             <span class="text-[10px] font-bold text-emerald-400 mt-2 uppercase tracking-widest">Sesi Terjadwal</span>
          </div>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform"><i class="pi pi-calendar text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
        <div class="text-[10px] font-black uppercase text-emerald-100 tracking-[0.2em] mb-4 opacity-80">Inventori Suku Cadang</div>
        <div class="flex items-end justify-between">
          <h3 class="text-xl font-black text-white tracking-tight leading-none uppercase">System <span class="text-emerald-300 italic">Live</span></h3>
          <div class="p-3 bg-white/10 text-white rounded-xl border border-white/10 group-hover:rotate-12 transition-transform"><i class="pi pi-box text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs (Logistics Hub Style) -->
    <div class="flex items-center gap-2 rounded-2xl bg-slate-100 p-1.5 w-fit shadow-inner mt-6 animate-fade-in-up">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'flex items-center gap-2 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all',
          activeTab === tab.id ? 'bg-white text-emerald-700 shadow-md border border-emerald-50' : 'text-slate-500 hover:text-slate-800'
        ]"
      >
        <i :class="tab.icon"></i>
        {{ tab.label }}
      </button>
    </div>

    <!-- Content Sections -->
    <div class="space-y-6 mt-4 pb-20">
      
      <!-- 1. Assets / Peralatan -->
      <div v-if="activeTab === 'assets'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        <div v-for="eq in filteredEquipment" :key="eq.id" 
          class="group relative flex flex-col rounded-[2.5rem] bg-white p-10 border-2 border-slate-50 shadow-sm transition-all hover:shadow-2xl hover:border-emerald-100 hover:-translate-y-2 overflow-hidden">
          
          <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all"></div>
          
          <div class="flex items-center justify-between mb-8 z-10">
             <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner group-hover:scale-110">
                <i class="pi pi-server text-lg"></i>
             </div>
             <span :class="['rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase', statusColors[eq.status]]">
                {{ eq.status }}
             </span>
          </div>
          
          <div class="mb-6 z-10">
            <h3 class="text-lg font-black text-slate-800 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{{ eq.name }}</h3>
            <p class="text-[10px] font-black text-slate-400 uppercase leading-relaxed font-mono mt-1 italic tracking-widest">{{ eq.code }} • {{ eq.type }}</p>
          </div>

          <div class="mb-8 grid grid-cols-2 gap-6 rounded-3xl bg-slate-50 p-6 z-10">
            <div class="border-l-2 border-emerald-400 pl-4">
              <p class="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Kekritisan</p>
              <p :class="['text-[11px] font-black', criticalityColors[eq.criticality]]">{{ eq.criticality }}</p>
            </div>
            <div>
              <p class="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Pabrikan</p>
              <p class="text-[11px] font-black text-slate-700 uppercase">{{ eq.manufacturer || 'N/A' }}</p>
            </div>
          </div>

          <div class="mt-auto flex items-center justify-between border-t border-slate-100 pt-6 z-10">
            <div class="flex -space-x-3">
              <div v-for="i in 3" :key="i" class="h-9 w-9 rounded-xl border-4 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                <img :src="`https://ui-avatars.com/api/?name=Tech+${i}&background=10b981&color=fff`" alt="Avatar" />
              </div>
              <div class="h-9 w-9 rounded-xl border-4 border-white bg-emerald-50 flex items-center justify-center text-[10px] font-black text-emerald-600 shadow-sm">+1</div>
            </div>
            <div class="flex gap-2">
              <Button icon="pi pi-history" text rounded class="h-10 w-10 text-slate-300 hover:text-emerald-600 transition-all" />
              <Button icon="pi pi-pencil" text rounded class="h-10 w-10 text-slate-300 hover:text-emerald-600 transition-all" @click="openEquipmentEdit(eq)" />
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Permintaan Perbaikan -->
      <div v-if="activeTab === 'requests'" class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
        <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center gap-4 relative overflow-hidden">
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div class="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3"><i class="pi pi-bolt text-xl"></i></div>
          <div>
             <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Permintaan Perbaikan</h3>
             <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Maintenance Request Records</p>
          </div>
        </div>
        
        <DataTable :value="requests" class="p-datatable-sm no-border" :rows="10" stripedRows sortField="requestDate" :sortOrder="-1">
          <Column field="code" header="KODE AUDIT" class="px-8 py-6">
             <template #body="{ data }">
                <span class="font-mono text-[11px] font-black text-emerald-600 uppercase tracking-tight">{{ data.code }}</span>
             </template>
          </Column>
          <Column field="equipment.name" header="ASET / PERALATAN" class="px-6 py-6 border-l border-slate-50">
            <template #body="{ data }">
              <div class="flex flex-col">
                <span class="text-[11px] font-black text-slate-800 uppercase tracking-tight">{{ data.equipment?.name }}</span>
                <span class="text-[9px] text-slate-400 uppercase font-black italic mt-1 leading-none">{{ data.equipment?.code }}</span>
              </div>
            </template>
          </Column>
          <Column field="requestDate" header="TANGGAL PERMOHONAN" class="px-6 py-6 border-l border-slate-50">
            <template #body="{ data }">
              <span class="text-[10px] font-black text-slate-600 font-mono">{{ fmtDate(data.requestDate) }}</span>
            </template>
          </Column>
          <Column field="priority" header="PRIORITAS" class="px-6 py-6 border-l border-slate-50">
            <template #body="{ data }">
              <span :class="['rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border shadow-sm', priorityColors[data.priority]]">
                {{ data.priority }}
              </span>
            </template>
          </Column>
          <Column field="status" header="STATUS AUDIT" class="px-6 py-6 border-l border-slate-50">
            <template #body="{ data }">
              <span :class="['flex items-center gap-2 text-[10px] font-black uppercase tracking-widest', data.status === 'OPEN' ? 'text-rose-600' : 'text-emerald-600']">
                <i :class="['pi text-[10px] animate-pulse', data.status === 'OPEN' ? 'pi-exclamation-circle' : 'pi-check-circle']"></i>
                {{ data.status.replace('_', ' ') }}
              </span>
            </template>
          </Column>
          <Column header="ACTION" class="px-8 py-6 text-right border-l border-slate-50">
            <template #body="{ data }">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <Button icon="pi pi-check" v-if="data.status !== 'COMPLETED'" @click="openLogCreate(data)" class="h-9 px-6 bg-emerald-600 border-none text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 shadow-xl shadow-emerald-100" label="LOG" />
                <Button icon="pi pi-pencil" @click="openRequestEdit(data)" class="h-9 w-9 bg-slate-900 border-none text-white rounded-xl hover:bg-black transition-all" />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- 3. Jadwal Perawatan Preventif -->
      <div v-if="activeTab === 'schedules'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        <div v-for="sch in schedules" :key="sch.id" class="rounded-[2.5rem] bg-white p-10 border-2 border-slate-50 shadow-sm transition-all hover:shadow-2xl hover:border-emerald-100 hover:-translate-y-2 relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all"></div>
          
          <div class="mb-4 flex items-center justify-between">
            <div class="h-12 w-12 flex items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-inner group-hover:scale-110 transition-all">
              <i class="pi pi-calendar-times text-xl"></i>
            </div>
            <div class="text-right">
              <p class="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic leading-none">Jatuh Tempo</p>
              <p class="text-[11px] font-black text-rose-600 font-mono italic">{{ fmtDate(sch.nextDate) }}</p>
            </div>
          </div>
          <h4 class="text-sm font-black text-slate-800 uppercase tracking-tight group-hover:text-emerald-700 transition-colors">{{ sch.name }}</h4>
          <p class="text-[10px] font-black text-slate-400 uppercase italic tracking-widest mt-1">{{ sch.equipment?.name }}</p>
          
          <div class="mt-8 space-y-3 bg-slate-50/50 p-6 rounded-3xl border border-slate-50">
            <p class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Daftar Cek Teknis</p>
            <div v-for="task in sch.maintenanceTasks" :key="task.id" class="flex items-start gap-3 group-hover:translate-x-1 transition-transform">
              <i class="pi pi-check-square mt-0.5 text-[11px] text-emerald-500"></i>
              <span class="text-[11px] font-black text-slate-500 leading-tight italic">{{ task.description }}</span>
            </div>
          </div>

          <div class="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
            <span class="px-4 py-1.5 bg-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">{{ sch.frequency }}</span>
            <Button label="GENERASI PERINTAH" icon="pi pi-file-export" class="p-button-sm p-button-text text-emerald-600 font-black p-0 h-auto text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>

      <!-- 4. Log Pekerjaan -->
      <div v-if="activeTab === 'logs'" class="rounded-[2.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
         <div class="p-8 bg-slate-50 border-b border-slate-100 flex items-center gap-4 relative overflow-hidden">
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div class="w-12 h-12 rounded-2xl bg-emerald-900 flex items-center justify-center text-white shadow-xl rotate-3"><i class="pi pi-history text-xl"></i></div>
          <div>
             <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Audit Ledger Riwayat Pekerjaan</h3>
             <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Work History Logs</p>
          </div>
        </div>

        <DataTable :value="logs" class="p-datatable-sm no-border" :rows="10" stripedRows sortField="logDate" :sortOrder="-1">
          <Column field="logDate" header="TANGGAL AUDIT" class="px-8 py-6">
            <template #body="{ data }">
              <span class="text-[10px] font-black text-slate-500 font-mono tracking-tighter">{{ fmtDate(data.logDate) }}</span>
            </template>
          </Column>
          <Column field="technicianName" header="TEKNISI" class="px-6 py-6 border-l border-slate-50">
            <template #body="{ data }">
              <span class="text-[11px] font-black text-slate-700 uppercase tracking-tight">{{ data.technicianName }}</span>
            </template>
          </Column>
          <Column field="equipment.name" header="ASET TERDAMPAK" class="px-6 py-6 border-l border-slate-50">
            <template #body="{ data }">
              <span class="text-[11px] font-black uppercase text-emerald-600 tracking-tight">{{ data.equipment?.name }}</span>
            </template>
          </Column>
          <Column field="workType" header="TIPE PEKERJAAN" class="px-6 py-6 border-l border-slate-50 text-center">
            <template #body="{ data }">
              <span :class="['rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border shadow-sm', data.workType === 'CORRECTIVE' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100']">
                {{ data.workType }}
              </span>
            </template>
          </Column>
          <Column field="totalCost" header="ESTIMASI BIAYA" class="text-right px-6 py-6 border-l border-slate-50">
            <template #body="{ data }">
              <span class="font-mono text-[11px] font-black text-slate-800 italic">IDR {{ fmtMoney(data.totalCost) }}</span>
            </template>
          </Column>
          <Column header="SUKU CADANG TERPAKAI" class="px-8 py-6 border-l border-slate-50">
            <template #body="{ data }">
              <div class="flex flex-wrap gap-2">
                <span v-for="p in data.parts" :key="p.id" class="text-[9px] bg-slate-100 px-3 py-1 rounded-lg text-slate-500 font-black border border-slate-200 uppercase italic">
                  {{ p.item?.code }} ×{{ p.qtyUsed }}
                </span>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!-- Master Registry Hubs -->
    <!-- 1. Equipment Registry -->
    <div v-if="equipmentDialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-2xl bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3">
               <i class="pi pi-server text-3xl font-black"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">{{ equipmentEditingId ? 'Audit' : 'Registrasi' }} <span class="text-emerald-600 not-italic text-2xl">Aset Produksi</span></h3>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Equipment Asset Lifecycle & Reliability Registry</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="equipmentDialogOpen = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12 cursor-pointer" />
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
          <div class="space-y-8 bg-white p-10 rounded-[2rem] border-2 border-slate-100 shadow-sm relative overflow-hidden transition-all hover:border-emerald-100">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kode Aset *</label>
                <InputText v-model="equipmentForm.code" :disabled="Boolean(equipmentEditingId)" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black uppercase tracking-widest text-slate-900 shadow-inner focus:ring-4 focus:ring-emerald-400 font-mono" placeholder="EQP-XXX" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nama Peralatan *</label>
                <InputText v-model="equipmentForm.name" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black uppercase tracking-widest text-slate-900 shadow-inner focus:ring-4 focus:ring-emerald-400" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Serial Number</label>
                <InputText v-model="equipmentForm.serialNumber" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black uppercase tracking-widest text-slate-900 shadow-inner" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Criticality Protocol</label>
                <select v-model="equipmentForm.criticality" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-emerald-400 transition-all appearance-none cursor-pointer uppercase tracking-tight">
                    <option v-for="c in ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 text-emerald-600">Pabrikan (Manufacturer)</label>
                <InputText v-model="equipmentForm.manufacturer" class="w-full h-14 bg-emerald-50 border-emerald-100 border rounded-2xl px-6 text-[12px] font-black uppercase tracking-widest text-emerald-900 shadow-inner" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Model / Tipe</label>
                <InputText v-model="equipmentForm.model" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black uppercase tracking-widest text-slate-900 shadow-inner" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lokasi Instalasi</label>
              <InputText v-model="equipmentForm.location" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black uppercase tracking-widest text-slate-900 shadow-inner" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Catatan Teknis Registry</label>
              <textarea v-model="equipmentForm.notes" rows="3" class="w-full rounded-2xl border-none bg-slate-50 p-6 text-[11px] font-medium text-slate-700 outline-none shadow-inner focus:bg-white focus:ring-4 focus:ring-emerald-400 transition-all placeholder-slate-300" placeholder="Informasi tambahan terkait pemeliharaan khusus..."></textarea>
            </div>
          </div>
        </div>

        <div class="p-10 border-t bg-white flex justify-end items-center shrink-0 rounded-b-[2.5rem] gap-4">
          <Button label="Batalkan" severity="secondary" text @click="equipmentDialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          <Button label="Simpan Registrasi Aset" icon="pi pi-save" @click="saveEquipment" class="h-14 px-12 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all rounded-xl" />
        </div>
      </div>
    </div>

    <!-- 2. Request Registry -->
    <div v-if="requestDialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-xl bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-amber-600 flex items-center justify-center text-white shadow-xl rotate-3">
               <i class="pi pi-bolt text-3xl font-black"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Audit <span class="text-amber-600 not-italic text-2xl">Perbaikan</span></h3>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-amber-500 text-amber-600">Breakdown Incident & Corrective Request Hub</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="requestDialogOpen = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12 cursor-pointer" />
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
          <div class="space-y-8 bg-white p-10 rounded-[2rem] border-2 border-slate-100 shadow-sm relative overflow-hidden transition-all hover:border-amber-100">
             <div v-if="!requestEditingId" class="space-y-8">
               <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Identitas Aset *</label>
                  <select v-model="requestForm.equipmentId" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all appearance-none cursor-pointer uppercase tracking-tight">
                      <option value="">-- PILIH PERALATAN --</option>
                      <option v-for="eq in equipment" :key="eq.id" :value="eq.id">{{ eq.code }} · {{ eq.name }}</option>
                  </select>
               </div>
               <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kode Permintaan</label>
                  <InputText v-model="requestForm.code" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black uppercase tracking-widest text-slate-900 shadow-inner font-mono" />
               </div>
               <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deskripsi Kerusakan / Problem</label>
                  <textarea v-model="requestForm.problem" rows="4" class="w-full rounded-2xl border-none bg-slate-50 p-6 text-[11px] font-medium text-slate-700 outline-none shadow-inner focus:bg-white focus:ring-4 focus:ring-amber-400 transition-all placeholder-slate-300" placeholder="Jelaskan secara detail kegagalan operasional yang terjadi..."></textarea>
               </div>
               <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tingkat Urgensi (Priority)</label>
                  <select v-model="requestForm.priority" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all appearance-none cursor-pointer uppercase tracking-tight">
                    <option v-for="p in ['LOW', 'MEDIUM', 'HIGH']" :key="p" :value="p">{{ p }}</option>
                  </select>
               </div>
             </div>
             
             <div v-else class="space-y-8">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Update Status Registrasi</label>
                  <select v-model="requestForm.status" class="w-full h-14 border-none rounded-2xl px-6 text-[11px] font-black text-slate-900 bg-slate-50 shadow-inner outline-none focus:ring-4 focus:ring-amber-400 transition-all appearance-none cursor-pointer uppercase tracking-tight">
                      <option v-for="s in ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']" :key="s" :value="s">{{ s.replace('_', ' ') }}</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 text-emerald-600">Catatan Audit Respon</label>
                  <textarea v-model="requestForm.notes" rows="4" class="w-full mt-3 rounded-2xl border-none bg-emerald-50/50 p-6 text-[11px] font-medium text-emerald-900 outline-none focus:ring-4 focus:ring-emerald-400 transition-all placeholder-slate-300" placeholder="Tindak lanjut atau keputusan penanganan..."></textarea>
                </div>
             </div>
          </div>
        </div>

        <div class="p-10 border-t bg-white flex justify-end items-center shrink-0 rounded-b-[2.5rem] gap-4">
          <Button label="Batalkan" severity="secondary" text @click="requestDialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl" />
          <Button label="Simpan Laporan" icon="pi pi-save" @click="saveRequest" class="h-14 px-12 bg-amber-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all rounded-xl" />
        </div>
      </div>
    </div>

    <!-- 3. Work Order Execution Registry (Premium) -->
    <div v-if="logDialogOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-4xl bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-950 flex items-center justify-center text-white shadow-xl rotate-3">
               <i class="pi pi-briefcase text-3xl font-black"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Registrasi <span class="text-emerald-600 not-italic text-2xl">Penanganan</span></h3>
              <p class="text-[10px] font-black uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500 text-emerald-600">Maintenance Work Execution & Spare Part Audit Registry</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="logDialogOpen = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12 cursor-pointer" />
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-10">
           <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              <!-- Left Panel: Task Parameters -->
              <div class="space-y-8 animate-fade-in-up">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-4 flex items-center gap-2">
                    <i class="pi pi-shield text-emerald-500"></i> I. Parameter Penugasan
                 </div>
                 <div class="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6 transition-all hover:border-emerald-100">
                     <div class="flex items-center gap-5 border-b border-slate-50 pb-6 mb-6">
                        <div class="h-14 w-14 flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                           <i class="pi pi-server text-2xl"></i>
                        </div>
                        <div>
                           <h3 class="text-base font-black text-slate-800 uppercase leading-none mb-1">{{ logForm.equipmentName || 'MANUAL MAINTENANCE' }}</h3>
                           <p class="text-[10px] font-black text-emerald-600 uppercase italic tracking-widest">{{ logForm.workType }} WORKS PROTOCOL</p>
                        </div>
                     </div>
                     
                     <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nama Teknisi Pelaksana *</label>
                          <InputText v-model="logForm.technicianName" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-[12px] font-black uppercase text-slate-900 shadow-inner focus:ring-4 focus:ring-emerald-400" />
                        </div>
                        <div class="space-y-2">
                          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Durasi Pekerjaan (Menit)</label>
                          <InputNumber v-model="logForm.durationMin" showButtons class="w-full font-mono font-black" />
                        </div>
                     </div>

                     <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Estimasi Biaya Tenaga Kerja (IDR)</label>
                        <InputNumber v-model="logForm.laborCost" mode="currency" currency="IDR" locale="id-ID" class="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 font-mono font-black text-emerald-700" />
                     </div>

                     <div class="space-y-2">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deskripsi & Solusi Penanganan</label>
                        <textarea v-model="logForm.description" rows="4" class="w-full rounded-2xl border-none bg-slate-50 p-6 text-[11px] font-medium text-slate-700 outline-none shadow-inner focus:bg-white focus:ring-4 focus:ring-emerald-400 transition-all placeholder-slate-300" placeholder="Jelaskan tindakan perbaikan yang telah dilakukan secara teknis..."></textarea>
                     </div>
                 </div>
              </div>

              <!-- Right Panel: Spares & Audit -->
              <div class="space-y-8 animate-fade-in-up" style="animation-delay: 0.1s">
                 <div class="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase mb-4 flex items-center justify-between">
                    <span class="flex items-center gap-2"><i class="pi pi-box text-emerald-500"></i> II. Audit Suku Cadang & Biaya</span>
                    <Button label="+ Suku Cadang" @click="addPartRow" class="p-2 px-4 bg-emerald-950 text-white border-none text-[8px] font-black rounded-lg hover:bg-black transition-colors uppercase tracking-widest shadow-sm" />
                 </div>
                 
                 <div class="bg-emerald-950 p-8 rounded-[2rem] shadow-2xl border-4 border-emerald-900 relative overflow-hidden flex flex-col min-h-[500px]">
                    <div class="absolute right-[-20px] top-[-20px] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl opacity-30"></div>
                    
                    <div class="flex-1 overflow-y-auto custom-scrollbar space-y-4 mb-8">
                       <div v-for="(p, idx) in logForm.parts" :key="idx" class="bg-white/5 rounded-2xl p-5 border border-white/5 group/part relative transition-all hover:bg-white/10">
                          <div class="grid grid-cols-12 gap-4 items-center">
                             <div class="col-span-12">
                                <select v-model="p.itemId" @change="updatePartCost(idx)" class="w-full bg-transparent border-none text-[11px] font-black text-emerald-400 uppercase tracking-tight focus:ring-0 appearance-none cursor-pointer">
                                   <option value="">-- PILIH SUKU CADANG --</option>
                                   <option v-for="o in partOptions" :key="o.value" :value="o.value" class="bg-slate-900">{{ o.label }}</option>
                                </select>
                             </div>
                             <div class="col-span-8 flex items-center gap-6 mt-2">
                                <div class="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                                   <span class="text-[8px] text-emerald-100/40 font-black uppercase">QTY:</span>
                                   <input v-model="p.qtyUsed" type="number" class="w-16 bg-transparent border-none text-xs font-black text-emerald-400 p-0 focus:ring-0 outline-none text-center font-mono" />
                                </div>
                                <div class="text-[10px] font-black text-emerald-100/40 italic">@IDR {{ fmtMoney(p.unitCost) }}</div>
                             </div>
                             <div class="col-span-4 text-right mt-2">
                                <Button icon="pi pi-trash" @click="logForm.parts.splice(idx, 1)" class="h-8 w-8 bg-rose-500/10 text-rose-400 border-none rounded-lg hover:bg-rose-500/20" />
                             </div>
                          </div>
                       </div>
                       
                       <div v-if="logForm.parts.length === 0" class="flex flex-col items-center justify-center py-20 text-white/10">
                          <i class="pi pi-box text-6xl mb-4"></i>
                          <p class="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400/40 italic text-center">Audit Suku Cadang Kosong.<br/>Gunakan tombol di atas jika ada penggantian komponen.</p>
                       </div>
                    </div>

                    <div class="rounded-3xl bg-black/40 p-8 border border-white/10 shadow-inner mt-auto">
                       <div class="flex items-center justify-between text-white/30 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                          <span>Estimasi Akumulasi Biaya Pekerjaan</span>
                          <span class="italic">Labor + Material Audit</span>
                       </div>
                       <div class="flex items-center justify-between">
                          <span class="text-4xl font-black text-white italic tracking-tighter uppercase px-2 bg-emerald-600 rounded-xl shadow-lg border-b-4 border-emerald-800">IDR</span>
                          <span class="text-4xl font-black text-white font-mono tracking-tighter">{{ fmtMoney(computedTotalCost) }}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 rounded-b-[2.5rem] bg-slate-50 overflow-hidden">
           <div class="flex items-center gap-4 relative z-10">
              <div class="px-6 py-3 bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-800 text-[10px] font-black uppercase tracking-widest italic flex items-center gap-3 transition-all">
                 <i class="pi pi-shield-check text-base"></i> Audit Integritas Pekerjaan Aktif
              </div>
           </div>
           <div class="flex items-center gap-4 relative z-10">
              <Button label="Batalkan Sesi" severity="secondary" text @click="logDialogOpen = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 rounded-xl transition-all" />
              <Button label="Konfirmasi & Posting Audit" icon="pi pi-save" @click="saveLog" class="h-16 px-12 bg-emerald-600 border-none text-white font-black text-[11px] uppercase shadow-2xl shadow-emerald-200 hover:scale-105 active:scale-95 transition-all rounded-xl" />
           </div>
        </div>
      </div>
    </div>

    <!-- Final Toast Notification System -->
    <transition name="toast">
      <div v-if="toastActive" class="fixed bottom-10 left-1/2 z-[200] -translate-x-1/2 overflow-hidden rounded-2xl bg-emerald-950 border-emerald-900 border-2 px-10 py-5 text-white shadow-3xl flex items-center gap-5 animate-fade-in-up backdrop-blur-md">
        <div class="bg-emerald-500 h-10 w-10 flex items-center justify-center rounded-xl shadow-lg shadow-emerald-500/20">
           <i class="pi pi-check-circle text-lg font-black"></i>
        </div>
        <div class="flex flex-col">
           <span class="text-[10px] font-black uppercase tracking-widest opacity-50">Sistem CMMS Terverifikasi</span>
           <span class="text-xs font-black uppercase tracking-tight">{{ toastMsg }}</span>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';

const api = useApi();

const activeTab = ref('assets');
const tabs = [
  { id: 'assets', label: 'ASET & PERALATAN', icon: 'pi pi-server' },
  { id: 'requests', label: 'PERMINTAAN PERBAIKAN', icon: 'pi pi-bolt' },
  { id: 'schedules', label: 'JADWAL PREVENTIF', icon: 'pi pi-calendar' },
  { id: 'logs', label: 'LOG PEKERJAAN', icon: 'pi pi-history' },
];

// Operational Status Data
const equipment = ref<any[]>([]);
const filteredEquipment = computed(() => equipment.value);
const requests = ref<any[]>([]);
const schedules = ref<any[]>([]);
const logs = ref<any[]>([]);
const partOptions = ref<any[]>([]);

// Logistics Dashboard Stats
const stats = ref([
  { label: 'Overall Reliability', value: '96.4%', icon: 'pi-check-circle', trend: '+1.2%' },
  { label: 'Breakdown Aktif', value: '0', icon: 'pi-exclamation-triangle' },
  { label: 'Preventive Pending', value: '0', icon: 'pi-calendar' },
  { label: 'Critical Assets', value: '5', icon: 'pi-server' },
]);

// Final Toast State
const toastActive = ref(false);
const toastMsg = ref('');
const showToast = (msg: string) => {
  toastMsg.value = msg; toastActive.value = true;
  setTimeout(() => { toastActive.value = false; }, 4000);
};

// Aesthetics & Badges
const statusColors: any = { 
  OPERATIONAL: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-50/50', 
  REPAIRING: 'bg-amber-50 text-amber-600 border-amber-100', 
  BREAKDOWN: 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' 
};
const criticalityColors: any = { LOW: 'text-slate-400', MEDIUM: 'text-emerald-600', HIGH: 'text-amber-600', CRITICAL: 'text-rose-600 font-black uppercase' };
const priorityColors: any = { LOW: 'bg-slate-50 text-slate-500 border-slate-100', MEDIUM: 'bg-emerald-50 text-emerald-600 border-emerald-100', HIGH: 'bg-amber-50 text-amber-600 border-amber-100 font-bold' };

// Dialog Logic
const equipmentDialogOpen = ref(false);
const equipmentEditingId = ref<string | null>(null);
const equipmentForm = reactive({
  code: '', name: '', type: '', location: '', serialNumber: '', manufacturer: '', model: '', criticality: 'MEDIUM', notes: ''
});

const requestDialogOpen = ref(false);
const requestEditingId = ref<string | null>(null);
const requestForm = reactive({
  code: '', equipmentId: '', problem: '', priority: 'MEDIUM', status: 'OPEN', notes: ''
});

const logDialogOpen = ref(false);
const logForm = reactive({
  equipmentId: '', equipmentName: '', requestId: '', scheduleId: '', technicianName: '', workType: 'CORRECTIVE',
  durationMin: 60, description: '', laborCost: 150000, parts: [] as any[]
});

// Implementation Logic
const fmtDate = (v: any) => v ? new Date(v).toLocaleDateString('id-ID', { day:'2-digit', month:'2-digit', year:'numeric' }) : '-';
const fmtMoney = (v: any) => Number(v).toLocaleString('id-ID');

const load = async () => {
  try {
    const [eqRes, reqRes, schRes, logRes, partRes] = await Promise.all([
      api.get('/manufacturing/maintenance/equipment'),
      api.get('/manufacturing/maintenance/requests'),
      api.get('/manufacturing/maintenance/schedules'),
      api.get('/manufacturing/maintenance/logs'),
      api.get('/inventory/items', { params: { take: 100 } }),
    ]);
    equipment.value = eqRes.data?.equipment ?? [];
    requests.value = reqRes.data?.requests ?? [];
    schedules.value = schRes.data?.schedules ?? [];
    logs.value = logRes.data?.logs ?? [];
    partOptions.value = (partRes.data?.items ?? []).map((i: any) => ({ 
      label: `${i.code} - ${i.name}`, 
      value: i.id, 
      cost: i.stockBalances?.[0]?.unitCost || 50000 
    }));
    
    stats.value[1].value = String(requests.value.filter(r => r.status === 'OPEN').length);
    stats.value[2].value = String(schedules.value.length);
  } catch (e) { showToast('Gagal memuat audit data teknis'); }
};

const openEquipmentCreate = () => {
  equipmentEditingId.value = null;
  Object.keys(equipmentForm).forEach((k: any) => (equipmentForm as any)[k] = '');
  equipmentForm.criticality = 'MEDIUM'; equipmentDialogOpen.value = true;
};

const openEquipmentEdit = (eq: any) => {
  equipmentEditingId.value = eq.id;
  Object.keys(equipmentForm).forEach((k: any) => (equipmentForm as any)[k] = eq[k] || '');
  equipmentDialogOpen.value = true;
};

const saveEquipment = async () => {
  try {
    if (equipmentEditingId.value) {
      await api.patch(`/manufacturing/maintenance/equipment/${equipmentEditingId.value}`, equipmentForm);
      showToast('Data Aset Berhasil Diperbarui');
    } else {
      await api.post('/manufacturing/maintenance/equipment', equipmentForm);
      showToast('Registrasi Aset Baru Berhasil');
    }
    equipmentDialogOpen.value = false; await load();
  } catch (e: any) { showToast('Terjadi kesalahan pada registrasi aset'); }
};

const openRequestCreate = () => {
  requestEditingId.value = null;
  requestForm.code = `REQ-${Date.now().toString().slice(-4)}`;
  requestForm.equipmentId = ''; requestForm.problem = '';
  requestForm.priority = 'MEDIUM'; requestForm.status = 'OPEN';
  requestDialogOpen.value = true;
};

const openRequestEdit = (r: any) => {
  requestEditingId.value = r.id; requestForm.status = r.status;
  requestForm.notes = r.notes || ''; requestDialogOpen.value = true;
};

const saveRequest = async () => {
  try {
    if (requestEditingId.value) {
      await api.patch(`/manufacturing/maintenance/requests/${requestEditingId.value}`, requestForm);
      showToast('Status Perbaikan Berhasil Diperbarui');
    } else {
      await api.post('/manufacturing/maintenance/requests', { ...requestForm, requestDate: new Date() });
      showToast('Laporan Kerusakan Baru Telah Diposting');
    }
    requestDialogOpen.value = false; await load();
  } catch (e) { showToast('Gagal memproses laporan kerusakan'); }
};

const openLogCreate = (request: any) => {
  logForm.technicianName = 'Zubair - Maintenance Team';
  logForm.durationMin = 60; logForm.description = ''; logForm.parts = []; logForm.laborCost = 150000;
  if (request) {
    logForm.equipmentId = request.equipmentId;
    logForm.equipmentName = request.equipment?.name;
    logForm.requestId = request.id;
    logForm.workType = 'CORRECTIVE';
    logForm.description = `Tindakan lanjut report ${request.code}: ${request.problem}`;
  } else {
    logForm.equipmentId = ''; logForm.requestId = ''; logForm.workType = 'PREVENTIVE';
  }
  logDialogOpen.value = true;
};

const addPartRow = () => logForm.parts.push({ itemId: '', warehouseId: 'WH-01', qtyUsed: 1, unitCost: 0 });
const updatePartCost = (idx: number) => {
  const part = partOptions.value.find(o => o.value === logForm.parts[idx].itemId);
  if (part) logForm.parts[idx].unitCost = part.cost || 0;
};
const computedTotalCost = computed(() => {
  const partsTotal = logForm.parts.reduce((sum, p) => sum + (p.qtyUsed * (p.unitCost || 0)), 0);
  return (logForm.laborCost || 0) + partsTotal;
});

const saveLog = async () => {
  try {
    await api.post('/manufacturing/maintenance/logs', logForm);
    logDialogOpen.value = false;
    showToast('Log Pekerjaan Selesai & Terverifikasi');
    await load();
  } catch (e) { showToast('Gagal memproses posting audit pekerjaan'); }
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