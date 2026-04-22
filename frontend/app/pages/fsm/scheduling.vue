<template>
  <div class="min-h-screen bg-[#f5f6fa]">

    <!-- ═══════════════════════════════════ HEADER (Premium Service Engine) ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-emerald-100/50"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic text-emerald-100">Layanan Lapangan</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest text-emerald-600">Penjadwalan Teknisi</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Scheduling <span class="text-emerald-600 italic">Engine</span></h1>
        <p class="text-slate-500 text-sm font-medium max-w-2xl leading-relaxed mt-3">Kendalikan orkestrasi teknisi lapangan. Kelola service order, penugasan armada, dan sinkronisasi laporan kerja secara real-time.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadData" :loading="loading" class="h-12 w-12 text-slate-400 hover:text-emerald-600 transition-all shadow-sm bg-white" />
        <Button label="+ Service Order Baru" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-emerald-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all" @click="openCreateOrder" />
      </div>
    </div>

    <!-- Telemetry Dashboard (High-Contrast Emerald) -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mx-6 mb-8 animate-fade-in-up">
       <!-- Total Orders -->
       <div class="p-4 rounded-2xl bg-emerald-950 text-white shadow-xl flex flex-col justify-between border border-emerald-900 transition-all hover:bg-black group">
          <div class="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 opacity-80">Total Penugasan</div>
          <div class="flex items-end justify-between">
             <h3 class="text-4xl font-black text-white tracking-tighter leading-none">{{ loading ? '—' : stats?.[0]?.value }}</h3>
             <div class="p-3 bg-white/5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
                <i class="pi pi-ticket text-lg text-emerald-400"></i>
             </div>
          </div>
       </div>

       <!-- Unscheduled -->
       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">Butuh Penjadwalan</div>
          <div class="flex items-end justify-between">
             <h3 class="text-4xl font-black text-amber-700 tracking-tighter leading-none">{{ loading ? '—' : stats?.[1]?.value }}</h3>
             <div class="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 group-hover:scale-110 transition-transform"><i class="pi pi-clock text-lg"></i></div>
          </div>
       </div>

       <!-- Scheduled -->
       <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Siap Eksekusi</div>
          <div class="flex items-end justify-between">
             <h3 class="text-4xl font-black text-emerald-700 tracking-tighter leading-none">{{ loading ? '—' : stats?.[2]?.value }}</h3>
             <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:rotate-12 transition-transform"><i class="pi pi-calendar text-lg"></i></div>
          </div>
       </div>

       <!-- Active -->
       <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4 italic">Live di Lapangan</div>
          <div class="flex items-end justify-between">
             <h3 class="text-4xl font-black text-emerald-800 tracking-tighter leading-none">{{ loading ? '—' : stats?.[3]?.value }}</h3>
             <div class="p-3 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform"><i class="pi pi-bolt text-lg"></i></div>
          </div>
       </div>

       <!-- Completed -->
       <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 font-mono">Archive Selesai</div>
          <div class="flex items-end justify-between">
             <h3 class="text-4xl font-black text-slate-400 tracking-tighter leading-none">{{ loading ? '—' : stats?.[4]?.value }}</h3>
             <div class="p-3 bg-slate-200 text-slate-500 rounded-xl group-hover:grayscale-0 grayscale transition-all"><i class="pi pi-check-circle text-lg"></i></div>
          </div>
       </div>
    </div>

    <!-- Scheduling Ledger (Universal High-Density Grid) -->
    <div class="mx-6 mb-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">

      <!-- Header Control Bar -->
      <div class="p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div class="relative flex items-center gap-4">
           <div class="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl transition-transform hover:rotate-6"><i class="pi pi-calendar-plus text-xl"></i></div>
           <div>
              <h3 class="text-[11px] font-black uppercase text-slate-800 tracking-[0.2em] leading-none mb-1">Log Orkestrasi Armada Lapangan</h3>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono italic">Work Order Scheduling Matrix</p>
           </div>
        </div>

        <!-- Dynamic Filter Tabs (Integrated) -->
        <div class="relative flex gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-inner">
           <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
             :class="['h-10 px-6 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2',
               activeTab === tab.key ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600']">
             <i :class="tab.icon"></i>
             {{ tab.label }}
             <span v-if="tab.count !== undefined" :class="['ml-1 px-2 py-0.5 rounded-full text-[8px]', activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400']">{{ tab.count }}</span>
           </button>
        </div>

        <div class="relative flex items-center gap-3">
          <div class="flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm p-1">
            <i class="pi pi-search px-3 text-slate-300 text-xs"></i>
            <InputText v-model="statusFilter" placeholder="Filter Status..." class="border-none bg-transparent text-[10px] h-9 w-40 font-black uppercase tracking-widest focus:ring-0 shadow-none outline-none" />
          </div>
        </div>
      </div>

       <!-- ─── TAB 1: SERVICE ORDERS ─── -->
       <div v-show="activeTab === 'ORDERS'" class="overflow-x-auto custom-scrollbar">
          <table class="w-full text-sm">
            <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
              <tr>
                <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[280px]">Order & Klasifikasi</th>
                <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Pelanggan & Site</th>
                <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Scope Pekerjaan</th>
                <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Teknisi Armada</th>
                <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Task</th>
                <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Opsi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
               <tr v-if="loading">
                <td colspan="6" class="py-24 text-center">
                  <i class="pi pi-spinner pi-spin text-4xl text-emerald-500 opacity-20"></i>
                  <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-emerald-600">Sinkronisasi armada lapangan...</div>
                </td>
              </tr>
              
              <tr v-for="data in filteredOrders" v-else :key="data.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-emerald-400">
                 <td class="px-8 py-6 align-middle">
                    <div class="flex items-center gap-4">
                       <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-110 transition-transform">
                          <i class="pi pi-ticket text-lg"></i>
                       </div>
                       <div>
                          <div class="font-mono text-[11px] font-black text-slate-500 tracking-tight group-hover:text-emerald-700 transition-colors uppercase">
                             {{ data.code }}
                          </div>
                          <div class="mt-1 flex items-center gap-2">
                             <span :class="['text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md', getServiceTypeClass(data.serviceType)]">
                               {{ getServiceTypeLabel(data.serviceType) }}
                             </span>
                          </div>
                       </div>
                    </div>
                 </td>

                 <td class="px-6 py-6 align-middle border-l border-slate-50">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 group-hover:scale-110 transition-transform">
                         <i class="pi pi-building text-xs"></i>
                      </div>
                      <div class="max-w-[180px]">
                        <div class="text-[11px] font-black text-slate-800 uppercase tracking-tight truncate">{{ data.customer?.name || '-' }}</div>
                        <div class="text-[9px] font-bold text-slate-400 uppercase mt-0.5 truncate italic">{{ data.locationAddress || 'Lokasi belum diisi' }}</div>
                      </div>
                    </div>
                 </td>

                 <td class="px-6 py-6 align-middle border-l border-slate-50">
                    <div class="flex flex-col max-w-[220px]">
                      <span class="text-[11px] font-black text-slate-800 truncate">{{ data.subject }}</span>
                      <span class="text-[9px] text-slate-400 line-clamp-1 mt-0.5 font-medium italic">"{{ data.description }}"</span>
                    </div>
                 </td>

                 <td class="px-6 py-6 align-middle border-l border-slate-50 text-center">
                    <div v-if="data.appointments?.length > 0" class="flex flex-col items-center group/tech">
                      <div class="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-lg group-hover/tech:bg-emerald-600 transition-colors">
                        {{ data.appointments[0].technician?.name?.charAt(0) || 'T' }}
                      </div>
                      <span class="text-[9px] font-black text-slate-600 mt-2 max-w-[80px] truncate uppercase tracking-tighter">{{ data.appointments[0].technician?.name }}</span>
                    </div>
                    <div v-else class="flex flex-col items-center opacity-30">
                       <i class="pi pi-user-minus text-slate-400 mb-1"></i>
                       <span class="text-[8px] font-black text-slate-400 uppercase">Belum Ada</span>
                    </div>
                 </td>

                 <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                    <div class="relative flex flex-col items-center gap-1.5">
                       <span :class="['inline-flex rounded-full px-4 py-1.5 text-[8px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm group-hover:scale-105 transition-all', getOrderStatusClass(data.status)]">
                          <i :class="[data.status === 'COMPLETED' ? 'pi pi-check-circle animate-pulse' : 'pi pi-clock', 'text-[7px] mr-2']"></i> {{ getOrderStatusLabel(data.status) }}
                       </span>
                       <span :class="['text-[8px] font-black px-2 py-0.5 rounded italic', getPriorityClass(data.priority)]">{{ getPriorityLabel(data.priority) }}</span>
                    </div>
                 </td>

                 <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                    <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                      <Button icon="pi pi-bolt" severity="success" rounded text @click="openAssign(data)" v-if="canAssign(data.status)" class="h-9 w-9 text-emerald-600 hover:bg-emerald-50" />
                      <Button icon="pi pi-eye" severity="secondary" rounded text @click="openViewOrder(data)" class="h-9 w-9" />
                      <Button icon="pi pi-pencil" severity="secondary" rounded text @click="openEditOrder(data)" class="h-9 w-9" />
                      <Button icon="pi pi-trash" severity="danger" rounded text @click="confirmDelete(data)" v-if="['DRAFT', 'SUBMITTED', 'PENDING_SCHEDULE'].includes(data.status)" class="h-9 w-9 text-rose-500 hover:bg-rose-50" />
                    </div>
                 </td>
              </tr>

              <tr v-if="!loading && filteredOrders.length === 0">
                <td colspan="6" class="py-32 text-center text-slate-500">
                   <div class="text-6xl mb-4 opacity-10">🚛</div>
                   <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Matrix penjadwalan kosong. Tidak ada task yang perlu orkestrasi.</div>
                </td>
              </tr>
            </tbody>
          </table>
       </div>

       <!-- ─── TAB 2: APPOINTMENTS ─── -->
       <div v-show="activeTab === 'APPOINTMENTS'" class="overflow-x-auto custom-scrollbar">
          <table class="w-full text-sm">
            <thead class="bg-white text-left font-bold border-b border-slate-50 text-slate-900 uppercase">
              <tr>
                <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] w-[280px]">Personel Teknisi</th>
                <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Service Order Ref</th>
                <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Jadwal Penugasan</th>
                <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50">Waktu Aktual</th>
                <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-l border-slate-50 text-center w-40">Status Progres</th>
                <th class="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-40 border-l border-slate-50">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
               <tr v-for="data in appointments" :key="data.id" class="transition-all hover:bg-slate-50/50 group border-l-4 border-l-transparent hover:border-l-emerald-400">
                  <td class="px-8 py-6 align-middle">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-900 to-slate-900 flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:scale-110 transition-transform">
                        {{ data.technician?.name?.charAt(0) || 'T' }}
                      </div>
                      <div class="flex flex-col">
                        <span class="text-[11px] font-black text-slate-800 uppercase tracking-tight">{{ data.technician?.name }}</span>
                        <span class="text-[9px] text-slate-400 font-mono italic">{{ data.technician?.email }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-6 align-middle border-l border-slate-50">
                    <div class="flex flex-col">
                      <span class="text-[10px] font-black text-emerald-600 font-mono uppercase">{{ data.serviceOrder?.code }}</span>
                      <span class="text-[9px] text-slate-500 truncate max-w-[160px] font-medium leading-tight mt-0.5">{{ data.serviceOrder?.subject }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-6 align-middle border-l border-slate-50">
                    <div class="flex flex-col text-[10px]">
                      <span class="font-black text-slate-700">{{ formatDate(data.scheduledStart) }}</span>
                      <span class="text-slate-400 font-mono text-[9px] tracking-tighter">{{ formatTimeRange(data.scheduledStart, data.scheduledEnd) }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-6 align-middle border-l border-slate-50">
                    <div v-if="data.actualStart" class="flex flex-col text-[10px]">
                      <span class="font-black text-emerald-600">{{ formatDate(data.actualStart) }}</span>
                      <span class="text-slate-400 font-mono text-[9px] tracking-tighter">{{ formatTimeRange(data.actualStart, data.actualEnd) }}</span>
                    </div>
                    <span v-else class="text-[9px] font-black text-slate-300 italic uppercase">Belum Mulai</span>
                  </td>
                  <td class="px-6 py-6 align-middle text-center border-l border-slate-50 bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors">
                     <span :class="['inline-flex rounded-full px-4 py-1.5 text-[8px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm group-hover:scale-105 transition-all', getApptStatusClass(data.status)]">
                        {{ getApptStatusLabel(data.status) }}
                     </span>
                  </td>
                  <td class="px-8 py-6 align-middle text-right border-l border-slate-50">
                    <div class="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                      <Button icon="pi pi-play" severity="warning" rounded text @click="updateApptStatus(data, 'IN_PROGRESS')" v-if="data.status === 'ASSIGNED'" class="h-9 w-9" />
                      <Button icon="pi pi-check-circle" severity="success" rounded text @click="updateApptStatus(data, 'COMPLETED')" v-if="data.status === 'IN_PROGRESS'" class="h-9 w-9" />
                    </div>
                  </td>
               </tr>
               
               <tr v-if="!loading && appointments.length === 0">
                <td colspan="6" class="py-32 text-center text-slate-500">
                   <div class="text-6xl mb-4 opacity-10">👤</div>
                   <div class="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Belum ada penugasan teknisi yang tercatat.</div>
                </td>
              </tr>
            </tbody>
          </table>
       </div>
    </div>
    </div>

    <!-- ═══════════════════════════════════ CREATE/EDIT ORDER DIALOG ══════════════════════════════════ -->
    <div v-if="orderDialogVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-5xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-ticket text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ orderForm.id ? 'Edit' : 'Draft' }} <span class="text-emerald-600 italic text-2xl">Service Order</span></h3>
                 <span v-if="orderForm.id" class="inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase shadow-sm">{{ orderForm.code }}</span>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500">Field Service Management & Dispatch Governance</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="orderDialogVisible = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-slate-50/30 pb-32">
          <!-- Sec 1: Identification -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-lg">1</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Klasifikasi Penugasan</h4>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="space-y-2">
                <label class="px-1">Tipe Layanan <span class="text-rose-500">*</span></label>
                <select v-model="orderForm.serviceType" class="field-select h-14 bg-white border-slate-200 rounded-2xl p-4 text-[11px] font-black uppercase tracking-widest text-slate-800 w-full outline-none focus:ring-4 focus:ring-emerald-50 transition-all border">
                  <option value="REPAIR">PERBAIKAN (REPAIR)</option>
                  <option value="INSTALLATION">PEMASANGAN (INSTALLATION)</option>
                  <option value="MAINTENANCE">PERAWATAN (MAINTENANCE)</option>
                  <option value="INSPECTION">INSPEKSI (INSPECTION)</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="px-1">Prioritas Strategis <span class="text-rose-500">*</span></label>
                <select v-model="orderForm.priority" class="field-select h-14 bg-white border-slate-200 rounded-2xl p-4 text-[11px] font-black uppercase tracking-widest text-slate-800 w-full outline-none focus:ring-4 focus:ring-emerald-50 transition-all border">
                  <option value="LOW">LOW (Biasa)</option>
                  <option value="MEDIUM">MEDIUM (Menengah)</option>
                  <option value="HIGH">HIGH (Tinggi)</option>
                  <option value="URGENT">URGENT (Mendesak)</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="px-1">Kode Identitas Order</label>
                <div class="h-14 bg-slate-100 rounded-2xl p-4 text-[11px] font-black text-slate-400 flex items-center gap-3 border border-slate-200">
                   <i class="pi pi-lock text-[10px]"></i> {{ orderForm.code }}
                </div>
              </div>
            </div>
          </div>

          <!-- Sec 2: Customer -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-emerald-100">2</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Data Site & Pelanggan</h4>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="px-1">Pelanggan Entitas <span class="text-rose-500">*</span></label>
                <select v-model="orderForm.customerId" class="field-select h-14 bg-white border-slate-200 rounded-2xl p-4 text-[11px] font-black uppercase tracking-widest text-slate-800 w-full outline-none focus:ring-4 focus:ring-emerald-50 transition-all border">
                  <option value="">-- Pilih Pelanggan --</option>
                  <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="px-1">PIC Site Lapangan</label>
                <input v-model="orderForm.contactName" class="h-14 bg-white border-slate-200 rounded-2xl p-4 text-[11px] font-black text-slate-800 w-full outline-none focus:ring-4 focus:ring-emerald-50 transition-all border" placeholder="Nama kontak di lokasi..." />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="px-1">Alamat Presisi Lokasi Layanan <span class="text-rose-500">*</span></label>
                <textarea v-model="orderForm.locationAddress" rows="3" class="w-full bg-white border-slate-200 rounded-2xl p-4 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-emerald-50 transition-all border" placeholder="Alamat lengkap armada harus dikirim..."></textarea>
              </div>
            </div>
          </div>

          <!-- Sec 3: Work Details -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-100">3</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Scope & Instruksi Kerja</h4>
            </div>
            <div class="space-y-8">
              <div class="space-y-2">
                <label class="px-1">Subjek Penugasan <span class="text-rose-500">*</span></label>
                <input v-model="orderForm.subject" class="h-16 bg-white border-slate-200 rounded-[1.25rem] p-4 text-[13px] font-black text-slate-800 w-full outline-none focus:ring-4 focus:ring-indigo-50 transition-all border shadow-sm" placeholder="Judul singkat yang muncul di aplikasi teknisi..." />
              </div>
              <div class="space-y-2">
                <label class="px-1">Brief Deskripsi Lingkup Kerja</label>
                <textarea v-model="orderForm.description" rows="5" class="w-full bg-white border-slate-200 rounded-3xl p-8 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50 transition-all border shadow-inner italic" placeholder="Jelaskan detail apa yang harus dilakukan teknisi secara mendalam..."></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 rounded-b-[2.5rem] bg-slate-50 relative overflow-hidden">
           <div class="absolute top-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -ml-32 -mt-32 opacity-50"></div>
           <div class="flex items-center gap-4 relative z-10">
              <div class="px-6 py-3 bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-800 text-[10px] font-black uppercase tracking-widest italic flex items-center gap-3">
                 <i class="pi pi-shield-check text-base"></i> Validasi Integritas Penjadwalan Aktif
              </div>
           </div>
           <div class="flex items-center gap-4 relative z-10">
              <Button label="Batalkan" severity="secondary" text @click="orderDialogVisible = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 rounded-xl transition-all" />
              <Button :label="orderForm.id ? 'Perbarui Order' : 'Konfirmasi & Buat Order'" icon="pi pi-save" @click="saveOrder" :loading="saving" class="h-16 px-12 bg-emerald-600 border-none text-white font-black text-[11px] uppercase shadow-2xl shadow-emerald-200 hover:scale-105 active:scale-95 transition-all rounded-xl" />
           </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ ASSIGN TECHNICIAN DIALOG ══════════════════════════════════ -->
    <div v-if="assignDialogVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-4xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-indigo-950">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-bolt text-3xl font-black"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Penugasan <span class="text-indigo-600 not-italic text-2xl">Armada</span></h3>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-indigo-500">Service Dispatch & Technical Allocation</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="assignDialogVisible = false" class="relative z-10 hover:bg-indigo-50 h-12 w-12" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-slate-50/30 pb-32">
          <!-- Order Brief -->
          <div class="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm relative overflow-hidden group border-l-[8px] border-l-emerald-500">
             <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <i class="pi pi-receipt text-7xl text-slate-300"></i>
             </div>
             <div class="relative">
                <p class="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2 font-mono italic">{{ selectedOrder?.code }}</p>
                <h4 class="text-xl font-black text-slate-900 uppercase leading-none">{{ selectedOrder?.subject }}</h4>
                <div class="mt-4 flex items-center gap-4 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                   <div class="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100"><i class="pi pi-building text-[10px]"></i> {{ selectedOrder?.customer?.name }}</div>
                   <div class="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100"><i class="pi pi-tag text-[10px]"></i> {{ selectedOrder?.serviceType }}</div>
                </div>
             </div>
          </div>

          <!-- Sec 1: Schedule -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-lg">1</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Jendela Waktu Pelaksanaan</h4>
            </div>
            <div class="grid grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="px-1 text-slate-400">Tanggal Mulai <span class="text-rose-500">*</span></label>
                <input type="date" v-model="assignForm.scheduledStartDate" class="h-14 bg-white border-slate-200 rounded-2xl p-4 text-[11px] font-black text-slate-800 w-full outline-none focus:ring-4 focus:ring-indigo-50 transition-all border" />
              </div>
              <div class="space-y-2">
                <label class="px-1 text-slate-400">Jam Mulai <span class="text-rose-500">*</span></label>
                <input type="time" v-model="assignForm.scheduledStartTime" class="h-14 bg-white border-slate-200 rounded-2xl p-4 text-[11px] font-black text-slate-800 w-full outline-none focus:ring-4 focus:ring-indigo-50 transition-all border" />
              </div>
              <div class="space-y-2">
                <label class="px-1 text-slate-400">Tanggal Selesai (Est)</label>
                <input type="date" v-model="assignForm.scheduledEndDate" class="h-14 bg-white border-slate-200 rounded-2xl p-4 text-[11px] font-black text-slate-800 w-full outline-none focus:ring-4 focus:ring-indigo-50 transition-all border" />
              </div>
              <div class="space-y-2">
                <label class="px-1 text-slate-400">Jam Selesai (Est)</label>
                <input type="time" v-model="assignForm.scheduledEndTime" class="h-14 bg-white border-slate-200 rounded-2xl p-4 text-[11px] font-black text-slate-800 w-full outline-none focus:ring-4 focus:ring-indigo-50 transition-all border" />
              </div>
            </div>
          </div>

          <!-- Sec 2: Technician -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-100">2</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Personel Teknisi Lapangan</h4>
            </div>
            <div class="space-y-8">
              <div class="space-y-2">
                <label class="px-1 text-slate-400">Personel Tersedia (Available) <span class="text-rose-500">*</span></label>
                <select v-model="assignForm.technicianId" class="field-select h-16 bg-white border-slate-200 rounded-[1.25rem] p-4 text-[12px] font-black uppercase tracking-widest text-slate-800 w-full outline-none focus:ring-4 focus:ring-indigo-50 transition-all border shadow-sm">
                  <option value="">-- Pilih Teknisi --</option>
                  <option v-for="t in technicians" :key="t.id" :value="t.id">
                    {{ t.name }} ({{ t.email }})
                  </option>
                </select>
              </div>
              <div class="space-y-2">
                  <label class="px-1 text-slate-400">Instruksi Khusus untuk Teknisi</label>
                  <textarea v-model="assignForm.notes" rows="4" class="w-full bg-white border-slate-200 rounded-3xl p-8 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50 transition-all border shadow-inner italic" placeholder="Jelaskan instruksi teknis atau peringatan site..."></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 rounded-b-[2.5rem] bg-slate-50 relative overflow-hidden">
           <div class="absolute top-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -ml-32 -mt-32 opacity-50"></div>
           <div class="flex items-center gap-4 relative z-10">
              <div class="px-6 py-3 bg-indigo-100 border border-indigo-200 rounded-xl text-indigo-800 text-[10px] font-black uppercase tracking-widest italic flex items-center gap-3">
                 <i class="pi pi-bolt text-base animate-pulse"></i> Notifikasi Dispatch Otomatis Aktif
              </div>
           </div>
           <div class="flex items-center gap-4 relative z-10">
              <Button label="Batalkan" severity="secondary" text @click="assignDialogVisible = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 rounded-xl transition-all" />
              <Button label="Konfirmasi & Kirim Tugas" icon="pi pi-check-circle" @click="saveAssignment" :loading="saving" class="h-16 px-12 bg-indigo-950 border-none text-white font-black text-[11px] uppercase shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all rounded-xl" />
           </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ VIEW DETAIL DIALOG ══════════════════════════════════ -->
    <div v-if="viewDialogVisible && viewOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-5xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl rotate-3">
               <i class="pi pi-search text-3xl font-black"></i>
            </div>
            <div>
              <div class="flex items-center gap-3">
                 <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Audit <span class="text-emerald-600 not-italic text-2xl">Penugasan</span></h3>
                 <span :class="['inline-flex rounded-xl px-4 py-1.5 text-[9px] font-black tracking-[0.2em] border shadow-sm uppercase shadow-sm', getOrderStatusClass(viewOrder.status)]">{{ getOrderStatusLabel(viewOrder.status) }}</span>
              </div>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500">Service Life-cycle & Operational Traceability</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="viewDialogVisible = false" class="relative z-10 hover:bg-slate-100 h-12 w-12" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-slate-50/30 pb-32">
          <!-- Identity Brief -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Nomor Referensi</p>
                <p class="text-lg font-black text-slate-900 font-mono tracking-tighter">{{ viewOrder.code }}</p>
             </div>
             <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Entitas Pelanggan</p>
                <p class="text-lg font-black text-slate-900 uppercase tracking-tighter truncate">{{ viewOrder.customer?.name }}</p>
             </div>
             <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Prioritas Kerja</p>
                <p :class="['text-lg font-black uppercase tracking-tighter', getPriorityClass(viewOrder.priority)]">{{ getPriorityLabel(viewOrder.priority) }}</p>
             </div>
          </div>

          <!-- Location & PIC -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-emerald-950 text-white rounded-[2rem] p-8 relative overflow-hidden group shadow-xl">
              <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                 <i class="pi pi-map-marker text-8xl text-emerald-400"></i>
              </div>
              <p class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">Lokasi Penugasan Site</p>
              <p class="text-lg font-bold leading-relaxed italic pr-12">{{ viewOrder.locationAddress || 'Alamat belum ditentukan' }}</p>
            </div>
            <div class="bg-white border-2 border-slate-100 rounded-[2rem] p-8 relative overflow-hidden group shadow-sm">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Personel Kontak (PIC)</p>
              <div class="flex items-center gap-5">
                 <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                    <i class="pi pi-user text-2xl text-slate-400"></i>
                 </div>
                 <div>
                    <p class="text-xl font-black text-slate-800 tracking-tight">{{ viewOrder.contactName || 'N/A' }}</p>
                    <p class="text-xs text-slate-500 font-mono mt-1 font-bold">{{ viewOrder.contactPhone || '-' }}</p>
                 </div>
              </div>
            </div>
          </div>

          <!-- Work Summary -->
          <div class="space-y-6">
             <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-lg">1</div>
                <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Rincian Deskripsi Pekerjaan</h4>
             </div>
             <div class="bg-white border-2 border-slate-50 rounded-[2.5rem] p-10 shadow-inner group">
                <p class="text-lg font-black text-slate-800 mb-4 uppercase tracking-tight">{{ viewOrder.subject }}</p>
                <p class="text-sm font-medium text-slate-600 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">"{{ viewOrder.description || 'Tidak ada deskripsi rinci untuk pekerjaan ini.' }}"</p>
             </div>
          </div>
          
          <!-- Appointment History -->
          <div v-if="viewOrder.appointments?.length > 0" class="space-y-8">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-100">2</div>
               <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Log Penugasan Armada Teknisi</h4>
            </div>
            <div class="space-y-6">
              <div v-for="a in viewOrder.appointments" :key="a.id" class="group p-8 bg-white border border-slate-100 rounded-[2rem] hover:shadow-2xl hover:bg-slate-50 transition-all border-l-8 border-l-slate-200 hover:border-l-indigo-600">
                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-[1.25rem] bg-indigo-950 flex items-center justify-center text-white text-xl font-black uppercase shadow-xl group-hover:bg-indigo-600 transition-colors">
                      {{ a.technician?.name?.charAt(0) || 'T' }}
                    </div>
                    <div>
                      <p class="text-lg font-black text-slate-900 tracking-tight uppercase">{{ a.technician?.name }}</p>
                      <div class="flex items-center gap-3 mt-1.5 overflow-hidden">
                         <span class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-widest">{{ formatDate(a.scheduledStart) }}</span>
                         <span class="text-slate-200">·</span>
                         <span class="text-[11px] font-black text-indigo-600 tracking-tighter">{{ formatTimeRange(a.scheduledStart, a.scheduledEnd) }}</span>
                      </div>
                    </div>
                  </div>
                  <div :class="['px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm', getApptStatusClass(a.status)]">
                     {{ getApptStatusLabel(a.status) }}
                  </div>
                </div>

                <div v-if="a.report" class="bg-emerald-50 rounded-[1.5rem] p-4 mt-6 border border-emerald-100/50 relative overflow-hidden">
                  <div class="absolute top-0 right-0 p-4 opacity-10"><i class="pi pi-check-circle text-5xl"></i></div>
                  <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">
                    <i class="pi pi-file-check"></i> Laporan Penyelesaian Teknisi
                  </p>
                  <p class="text-[11px] text-emerald-900 leading-relaxed font-bold relative z-10 italic">"{{ a.report.summary }}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-10 border-t bg-white flex justify-between items-center shrink-0 rounded-b-[2.5rem] bg-slate-50 relative overflow-hidden">
          <div class="flex items-center gap-4">
             <Button v-if="canAssign(viewOrder?.status)" @click="openAssign(viewOrder); viewDialogVisible = false;"
                label="Tugaskan Teknisi Armada" icon="pi pi-bolt" class="h-14 px-8 bg-indigo-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all rounded-xl" />
          </div>
          <Button label="Tutup Audit" severity="secondary" text @click="viewDialogVisible = false" class="px-8 h-12 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 rounded-xl transition-all" />
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ COMPLETE REPORT DIALOG ══════════════════════════════════ -->
    <div v-if="reportDialogVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="relative w-full max-w-4xl max-h-[92vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white text-slate-900 border-b-[12px] border-b-emerald-900">
        <!-- Header -->
        <div class="p-10 border-b border-slate-100 bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-check-circle text-3xl font-black"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase italic">Laporan <span class="text-emerald-600 not-italic text-2xl">Penyelesaian</span></h3>
              <p class="text-[10px] font-black text-slate-400 font-mono uppercase tracking-[0.2em] mt-3 px-1 border-l-2 border-emerald-500">Service Resolution & Final Completion Hub</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="reportDialogVisible = false" class="relative z-10 hover:bg-emerald-50 h-12 w-12" />
        </div>

        <div class="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar bg-slate-50/30 pb-32">
          <!-- Order Summary Brief -->
          <div class="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-center justify-between group border-l-[8px] border-l-emerald-500">
             <div>
                <p class="text-[9px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2 font-mono italic">{{ selectedOrder?.code }}</p>
                <h4 class="text-xl font-black text-slate-900 uppercase leading-none">{{ selectedOrder?.subject }}</h4>
             </div>
             <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all duration-500">
                <i class="pi pi-receipt text-2xl"></i>
             </div>
          </div>

          <!-- Sec 1: Work Summary -->
          <div class="space-y-8">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-lg">1</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Ringkasan Aktivitas Lapangan</h4>
            </div>
            <div class="space-y-2 focus-within:translate-x-1 transition-transform">
              <label class="px-1 text-slate-500">Detail Pekerjaan Terlaksana <span class="text-rose-500">*</span></label>
              <textarea v-model="reportForm.summary" rows="4" class="w-full bg-white border-slate-200 rounded-3xl p-8 text-[11px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-emerald-50 transition-all border shadow-inner italic" placeholder="Deklarasikan secara transparan apa saja yang telah diselesaikan di site..."></textarea>
            </div>
          </div>

          <!-- Sec 2: Resolution -->
        <div class="absolute bottom-0 left-0 w-full bg-white p-8 border-t border-slate-100 flex items-center justify-end gap-3 rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.05)]">
           <Button label="Batal" severity="secondary" text @click="reportDialogVisible = false" class="font-black text-[10px] uppercase" />
           <Button label="Simpan Laporan & Selesaikan SO" icon="pi pi-save" class="p-button-rounded p-button-success font-black text-[10px] uppercase px-8 shadow-lg shadow-emerald-100" @click="saveReport" :loading="saving" />
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ DELETE CONFIRM ══════════════════════════════════ -->
    <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="deleteTarget = null"></div>
      <div class="relative bg-white rounded-xl w-[420px] p-8 shadow-2xl text-center">
        <div class="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="pi pi-trash text-2xl text-rose-500"></i>
        </div>
        <h3 class="text-lg font-black text-slate-900 mb-2">Hapus Service Order?</h3>
        <p class="text-sm text-slate-500 mb-6">Order <strong class="font-mono text-slate-700">{{ deleteTarget.code }}</strong> akan dihapus permanen beserta semua data terkait.</p>
        <div class="flex gap-3">
          <button @click="deleteTarget = null" class="flex-1 h-11 rounded-xl bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-wider">Batal</button>
          <button @click="executeDelete" :disabled="saving"
            class="flex-1 h-11 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider disabled:opacity-50">
            <i v-if="saving" class="pi pi-spin pi-spinner mr-1"></i>Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <div v-for="t in toasts" :key="t.id"
        :class="['flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white text-sm font-bold min-w-[280px] transition-all',
          t.type === 'success' ? 'bg-emerald-600' : t.type === 'error' ? 'bg-rose-600' : 'bg-amber-500']">
        <i :class="['mt-0.5 text-lg', t.type === 'success' ? 'pi pi-check-circle' : t.type === 'error' ? 'pi pi-times-circle' : 'pi pi-exclamation-triangle']"></i>
        <div>
          <p class="font-black text-xs uppercase tracking-wider">{{ t.type === 'success' ? 'Berhasil' : t.type === 'error' ? 'Gagal' : 'Perhatian' }}</p>
          <p class="opacity-90 text-xs font-medium mt-0.5">{{ t.message }}</p>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ DELETE CONFIRMATION DIALOG ══════════════════════════════════ -->
    <div v-if="deleteTarget" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl transition-all">
       <div class="relative w-full max-w-md bg-white shadow-2xl animate-scale-in rounded-[2.5rem] border-4 border-white overflow-hidden text-center border-b-[12px] border-b-rose-900 px-8 py-12">
          <div class="w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-8 shadow-inner border-4 border-white">
             <i class="pi pi-trash text-4xl text-rose-500 animate-bounce"></i>
          </div>
          <h3 class="text-2xl font-black text-slate-800 uppercase tracking-tight mb-3">Hapus Penugasan?</h3>
          <p class="text-[11px] font-medium text-slate-500 italic px-6 mb-10 leading-relaxed uppercase">Anda akan menghapus order <span class="text-rose-600 font-black not-italic">{{ deleteTarget.code }}</span>. Tindakan ini bersifat permanen dan tidak dapat dipulihkan.</p>
          
          <div class="flex flex-col gap-3">
             <Button label="Hapus secara Permanen" severity="danger" @click="executeDelete" :loading="saving" class="w-full h-14 bg-rose-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-rose-200 rounded-xl" />
             <Button label="Batalkan" severity="secondary" text @click="deleteTarget = null" class="w-full h-12 font-black text-[10px] uppercase tracking-widest text-slate-400" />
          </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const api = useApi();

// ─── State ────────────────────────────────────────
const loading = ref(false);
const saving = ref(false);
const activeTab = ref('ORDERS');
const statusFilter = ref('ALL');
const orderDialogVisible = ref(false);
const assignDialogVisible = ref(false);
const viewDialogVisible = ref(false);
const reportDialogVisible = ref(false);
const deleteTarget = ref<any>(null);

const serviceOrders = ref<any[]>([]);
const appointments = ref<any[]>([]);
const customers = ref<any[]>([]);
const technicians = ref<any[]>([]);
const selectedOrder = ref<any>(null);
const viewOrder = ref<any>(null);
const dashStats = ref<any>({});

const toasts = ref<any[]>([]);

// ─── Forms ────────────────────────────────────────
const orderForm = reactive({
  id: null as any,
  code: '',
  customerId: '',
  contactName: '',
  contactPhone: '',
  subject: '',
  description: '',
  serviceType: 'REPAIR',
  priority: 'MEDIUM' as any,
  locationAddress: '',
  totalEstimatedDuration: null as any,
  notes: '',
});

const assignForm = reactive({
  serviceOrderId: '',
  technicianId: '',
  scheduledStartDate: '',
  scheduledStartTime: '08:00',
  scheduledEndDate: '',
  scheduledEndTime: '17:00',
  notes: '',
});

const reportForm = reactive({
  appointmentId: '',
  summary: '',
  resolution: '',
});

// ─── Computed ─────────────────────────────────────
const tabs = computed(() => [
  { key: 'ORDERS', label: 'Service Orders', icon: 'pi pi-ticket', count: serviceOrders.value.length },
  { key: 'APPOINTMENTS', label: 'Penugasan Teknisi', icon: 'pi pi-calendar', count: appointments.value.length },
]);

const statusFilters = [
  { key: 'ALL', label: 'Semua' },
  { key: 'DRAFT', label: 'Draft' },
  { key: 'SUBMITTED', label: 'Diajukan' },
  { key: 'PENDING_SCHEDULE', label: 'Menunggu Jadwal' },
  { key: 'SCHEDULED', label: 'Terjadwal' },
  { key: 'IN_PROGRESS', label: 'Dikerjakan' },
  { key: 'COMPLETED', label: 'Selesai' },
];

const filteredOrders = computed(() => {
  if (statusFilter.value === 'ALL') return serviceOrders.value;
  return serviceOrders.value.filter(o => o.status === statusFilter.value);
});

const stats = computed(() => [
  { label: 'Total Order', value: serviceOrders.value.length, icon: 'pi pi-ticket', color: 'text-indigo-400', sub: 'Service Order', subColor: 'text-indigo-400' },
  { label: 'Belum Terjadwal', value: serviceOrders.value.filter(o => ['DRAFT', 'SUBMITTED', 'PENDING_SCHEDULE'].includes(o.status)).length, icon: 'pi pi-clock', color: 'text-amber-400', sub: 'Perlu Tindakan', subColor: 'text-amber-400' },
  { label: 'Terjadwal', value: serviceOrders.value.filter(o => o.status === 'SCHEDULED').length, icon: 'pi pi-calendar', color: 'text-blue-400', sub: 'Menunggu Eksekusi', subColor: 'text-blue-400' },
  { label: 'Aktif di Lapangan', value: serviceOrders.value.filter(o => o.status === 'IN_PROGRESS').length, icon: 'pi pi-bolt', color: 'text-emerald-400', sub: 'Live Sekarang', subColor: 'text-emerald-400' },
  { label: 'Selesai', value: serviceOrders.value.filter(o => o.status === 'COMPLETED').length, icon: 'pi pi-check-circle', color: 'text-slate-400', sub: 'Telah Diselesaikan', subColor: 'text-slate-400' },
]);

// ─── Data Loading ─────────────────────────────────
async function loadData() {
  loading.value = true;
  try {
    const [ordersRes, apptsRes] = await Promise.all([
      api.get('/fsm/service-orders'),
      api.get('/fsm/appointments'),
    ]);
    serviceOrders.value = ordersRes.data;
    appointments.value = apptsRes.data;
  } catch (e: any) {
    showToast('error', e.response?.data?.message || e.message || 'Gagal memuat data');
  } finally {
    loading.value = false;
  }
}

async function loadMasters() {
  try {
    const [custRes, techRes] = await Promise.all([
      api.get('/crm/customers'),
      api.get('/fsm/technicians'),
    ]);
    customers.value = custRes.data.customers || custRes.data;
    technicians.value = techRes.data;
  } catch {}
}

// ─── Order Actions ────────────────────────────────
function openCreateOrder() {
  const now = new Date();
  Object.assign(orderForm, {
    id: null,
    code: `SOF-${now.getFullYear()}-${String(now.getTime()).slice(-4)}`,
    customerId: '',
    contactName: '',
    contactPhone: '',
    subject: '',
    description: '',
    serviceType: 'REPAIR',
    priority: 'MEDIUM',
    locationAddress: '',
    totalEstimatedDuration: null,
    notes: '',
  });
  loadMasters();
  orderDialogVisible.value = true;
}

function openEditOrder(so: any) {
  Object.assign(orderForm, {
    id: so.id,
    code: so.code,
    customerId: so.customerId,
    contactName: so.contactName || '',
    contactPhone: so.contactPhone || '',
    subject: so.subject,
    description: so.description || '',
    serviceType: so.serviceType || 'REPAIR',
    priority: so.priority || 'MEDIUM',
    locationAddress: so.locationAddress || '',
    totalEstimatedDuration: so.totalEstimatedDuration || null,
    notes: so.notes || '',
  });
  loadMasters();
  orderDialogVisible.value = true;
}

function openViewOrder(so: any) {
  viewOrder.value = so;
  viewDialogVisible.value = true;
}

async function saveOrder() {
  if (!orderForm.customerId || !orderForm.subject || !orderForm.locationAddress) {
    showToast('warn', 'Pelanggan, subjek, dan alamat lokasi wajib diisi');
    return;
  }
  saving.value = true;
  try {
    const payload = {
      code: orderForm.code,
      customerId: orderForm.customerId,
      contactName: orderForm.contactName,
      contactPhone: orderForm.contactPhone,
      subject: orderForm.subject,
      description: orderForm.description,
      serviceType: orderForm.serviceType,
      priority: orderForm.priority,
      locationAddress: orderForm.locationAddress,
      totalEstimatedDuration: orderForm.totalEstimatedDuration || undefined,
      notes: orderForm.notes,
    };
    if (orderForm.id) {
      await api.patch(`/fsm/service-orders/${orderForm.id}`, payload);
      showToast('success', 'Service order berhasil diperbarui');
    } else {
      await api.post('/fsm/service-orders', payload);
      showToast('success', 'Service order baru berhasil dibuat');
    }
    orderDialogVisible.value = false;
    await loadData();
  } catch (e: any) {
    showToast('error', e.response?.data?.message || e.message || 'Gagal menyimpan order');
  } finally {
    saving.value = false;
  }
}

function confirmDelete(so: any) {
  deleteTarget.value = so;
}

async function executeDelete() {
  if (!deleteTarget.value) return;
  saving.value = true;
  try {
    await api.delete(`/fsm/service-orders/${deleteTarget.value.id}`);
    showToast('success', `Order ${deleteTarget.value.code} berhasil dihapus`);
    deleteTarget.value = null;
    await loadData();
  } catch (e: any) {
    showToast('error', e.response?.data?.message || 'Gagal menghapus order');
  } finally {
    saving.value = false;
  }
}

// ─── Assignment Actions ────────────────────────────
function openAssign(so: any) {
  selectedOrder.value = so;
  const tomorrow = new Date(Date.now() + 86400000);
  Object.assign(assignForm, {
    serviceOrderId: so.id,
    technicianId: '',
    scheduledStartDate: format(tomorrow, 'yyyy-MM-dd'),
    scheduledStartTime: '08:00',
    scheduledEndDate: format(tomorrow, 'yyyy-MM-dd'),
    scheduledEndTime: '17:00',
    notes: so.notes || '',
  });
  loadMasters();
  assignDialogVisible.value = true;
}

async function saveAssignment() {
  if (!assignForm.technicianId) {
    showToast('warn', 'Pilih teknisi terlebih dahulu');
    return;
  }
  if (!assignForm.scheduledStartDate) {
    showToast('warn', 'Pilih tanggal mulai penugasan');
    return;
  }
  saving.value = true;
  try {
    const start = new Date(`${assignForm.scheduledStartDate}T${assignForm.scheduledStartTime}`);
    const end = new Date(`${assignForm.scheduledEndDate || assignForm.scheduledStartDate}T${assignForm.scheduledEndTime}`);
    await api.post('/fsm/appointments', {
      serviceOrderId: assignForm.serviceOrderId,
      technicianId: assignForm.technicianId,
      scheduledStart: start.toISOString(),
      scheduledEnd: end.toISOString(),
      notes: assignForm.notes,
    });
    showToast('success', 'Teknisi berhasil ditugaskan');
    assignDialogVisible.value = false;
    await loadData();
  } catch (e: any) {
    showToast('error', e.response?.data?.message || e.message || 'Gagal menugaskan teknisi');
  } finally {
    saving.value = false;
  }
}

async function updateApptStatus(appt: any, newStatus: string) {
  try {
    await api.patch(`/fsm/appointments/${appt.id}`, { status: newStatus });
    showToast('success', `Status penugasan diperbarui ke: ${newStatus}`);
    await loadData();
  } catch (e: any) {
    showToast('error', e.response?.data?.message || 'Gagal memperbarui status');
  }
}

// ─── Report Actions ────────────────────────────────
function openCompleteReport(so: any) {
  const activeAppt = so.appointments?.find((a: any) => a.status === 'IN_PROGRESS');
  if (!activeAppt) {
    showToast('warn', 'Tidak ada penugasan aktif untuk order ini');
    return;
  }
  reportForm.appointmentId = activeAppt.id;
  reportForm.summary = '';
  reportForm.resolution = '';
  reportDialogVisible.value = true;
}

async function saveReport() {
  if (!reportForm.summary || !reportForm.resolution) {
    showToast('warn', 'Ringkasan dan resolusi penyelesaian wajib diisi');
    return;
  }
  saving.value = true;
  try {
    // Step 1: Update Appointment status to COMPLETED
    await api.patch(`/fsm/appointments/${reportForm.appointmentId}`, { status: 'COMPLETED' });
    
    // Step 2: Create Report
    await api.post(`/fsm/appointments/${reportForm.appointmentId}/report`, {
      summary: reportForm.summary,
      resolution: reportForm.resolution,
    });
    
    showToast('success', 'Laporan berhasil diposting dan tugas selesai');
    reportDialogVisible.value = false;
    await loadData();
  } catch (e: any) {
    showToast('error', e.response?.data?.message || 'Gagal menyimpan laporan penyelesaian');
  } finally {
    saving.value = false;
  }
}

// ─── Helpers ──────────────────────────────────────
function canAssign(status: string) {
  return ['DRAFT', 'SUBMITTED', 'PENDING_SCHEDULE'].includes(status);
}

function formatDate(val: any) {
  if (!val) return '-';
  try { return format(new Date(val), 'd MMM yyyy', { locale: id }); } catch { return '-'; }
}

function formatTimeRange(s: any, e: any) {
  try { return `${format(new Date(s), 'HH:mm')} – ${format(new Date(e), 'HH:mm')}`; } catch { return '-'; }
}

function formatDuration(min: number) {
  if (!min) return '-';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}j${m > 0 ? ` ${m}m` : ''}` : `${m} menit`;
}

const SERVICE_TYPE_MAP: Record<string, { label: string; cls: string }> = {
  REPAIR:         { label: 'Perbaikan',    cls: 'bg-rose-100 text-rose-700' },
  INSTALLATION:   { label: 'Pemasangan',   cls: 'bg-blue-100 text-blue-700' },
  MAINTENANCE:    { label: 'Perawatan',    cls: 'bg-amber-100 text-amber-700' },
  INSPECTION:     { label: 'Inspeksi',     cls: 'bg-purple-100 text-purple-700' },
  CONSULTATION:   { label: 'Konsultasi',   cls: 'bg-emerald-100 text-emerald-700' },
};
const getServiceTypeLabel = (t: string) => SERVICE_TYPE_MAP[t]?.label || t;
const getServiceTypeClass = (t: string) => SERVICE_TYPE_MAP[t]?.cls || 'bg-slate-100 text-slate-600';

const PRIORITY_MAP: Record<string, { label: string; cls: string }> = {
  LOW:    { label: 'Rendah',  cls: 'bg-slate-100 text-slate-400 border-slate-200' },
  MEDIUM: { label: 'Sedang',  cls: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  HIGH:   { label: 'Tinggi',  cls: 'bg-amber-50 text-amber-600 border-amber-100' },
  URGENT: { label: 'Darurat', cls: 'bg-rose-50 text-rose-600 border-rose-100' },
};
const getPriorityLabel = (p: string) => PRIORITY_MAP[p]?.label || p;
const getPriorityClass = (p: string) => PRIORITY_MAP[p]?.cls || 'bg-slate-100 text-slate-600';

const ORDER_STATUS_MAP: Record<string, { label: string; cls: string }> = {
  DRAFT:            { label: 'Draft',           cls: 'bg-slate-100 text-slate-400 border-slate-200' },
  SUBMITTED:        { label: 'Diajukan',        cls: 'bg-blue-50 text-blue-600 border-blue-100' },
  PENDING_SCHEDULE: { label: 'Butuh Jadwal',    cls: 'bg-amber-50 text-amber-600 border-amber-100' },
  SCHEDULED:        { label: 'Terjadwal',       cls: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  IN_PROGRESS:      { label: 'Dikerjakan',      cls: 'bg-emerald-600 text-white border-emerald-700 animate-pulse' },
  COMPLETED:        { label: 'Selesai',         cls: 'bg-emerald-950 text-emerald-400 border-emerald-900' },
  CANCELLED:        { label: 'Dibatalkan',      cls: 'bg-rose-100 text-rose-600 border-rose-200' },
};
const getOrderStatusLabel = (s: string) => ORDER_STATUS_MAP[s]?.label || s;
const getOrderStatusClass = (s: string) => ORDER_STATUS_MAP[s]?.cls || 'bg-slate-100 text-slate-600';

const APPT_STATUS_MAP: Record<string, { label: string; cls: string }> = {
  ASSIGNED:    { label: 'Ditugaskan',  cls: 'bg-slate-900 text-white border-slate-800' },
  IN_PROGRESS: { label: 'Dikerjakan', cls: 'bg-emerald-600 text-white border-emerald-500 animate-pulse' },
  COMPLETED:   { label: 'Selesai',    cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  CANCELLED:   { label: 'Dibatalkan', cls: 'bg-rose-100 text-rose-600 border-rose-200' },
};
const getApptStatusLabel = (s: string) => APPT_STATUS_MAP[s]?.label || s;
const getApptStatusClass = (s: string) => APPT_STATUS_MAP[s]?.cls || 'bg-slate-100 text-slate-600';

function showToast(type: 'success' | 'error' | 'warn', message: string) {
  const id = Date.now();
  toasts.value.push({ id, type, message });
  setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id); }, 4000);
}

onMounted(loadData);
</script>

<style scoped lang="postcss">
/* ────────────────────────────────────────────────────────────────────────────
   DATATABLE ALIGNMENT (TAX STYLE)
   ──────────────────────────────────────────────────────────────────────────── */
:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1.5rem !important;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(16, 185, 129, 0.04) !important; /* Subtle Emerald hover */
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1.5rem !important;
  border-bottom: 1px solid #f8fafc !important;
  @apply text-slate-700;
}

.field-input {
  @apply w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 transition-all focus:outline-none focus:border-emerald-500 focus:bg-white;
}
.field-select {
  @apply w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 transition-all focus:outline-none focus:border-emerald-500 focus:bg-white appearance-none;
}
.field-textarea {
  @apply w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 transition-all focus:outline-none focus:border-emerald-500 focus:bg-white resize-none;
}
</style>
