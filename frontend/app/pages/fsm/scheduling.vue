<template>
  <div class="min-h-screen bg-[#f5f6fa]">

    <!-- ═══════════════════════════════════ HEADER ══════════════════════════════════ -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Field Service</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Penjadwalan Teknisi</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Scheduling <span class="text-indigo-600">Engine</span></h1>
        <p class="text-slate-500 text-sm font-medium">Kelola service order, penugasan teknisi, dan laporan lapangan secara terintegrasi.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadData" :loading="loading" class="shadow-sm" />
        <Button label="Buat Service Order" icon="pi pi-plus" class="p-button-rounded font-black text-[10px] uppercase shadow-lg shadow-indigo-100 px-6 py-3" @click="openCreateOrder" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mx-6 mb-8">
       <div v-for="s in stats" :key="s.label" class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <i :class="[s.icon, 'text-6xl text-indigo-900']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900">{{ loading ? '—' : s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-500', 
               s.label === 'Aktif di Lapangan' ? 'bg-emerald-50 text-emerald-600' : 
               s.label === 'Selesai' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400']">
               {{ s.sub }}
             </span>
          </div>
       </div>
    </div>

    <!-- ═══════════════════════════════════ CONTENT TABS ══════════════════════════════════ -->
    <div class="mx-6 mb-6">
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

        <!-- Tab Bar + Filters -->
        <div class="border-b border-slate-100 px-8 pt-6 pb-0 flex flex-col md:flex-row md:items-end gap-4">
          <div class="flex gap-6">
            <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
              :class="['pb-4 text-[11px] font-black uppercase tracking-widest transition-all border-b-4',
                activeTab === tab.key ? 'border-indigo-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700']">
              <i :class="[tab.icon, 'mr-2']"></i>{{ tab.label }}
              <span v-if="tab.count !== undefined" :class="['ml-2 px-2 py-0.5 rounded-full text-[9px] font-black', activeTab === tab.key ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400']">{{ tab.count }}</span>
            </button>
          </div>
          <div class="md:ml-auto pb-4 flex items-center gap-3 flex-wrap">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter:</span>
            <div class="flex gap-2 flex-wrap">
              <button v-for="f in statusFilters" :key="f.key"
                @click="statusFilter = f.key"
                :class="['px-3 h-8 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border',
                  statusFilter === f.key ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300']">
                {{ f.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- ─── SERVICE ORDERS TAB ─── -->
        <div v-show="activeTab === 'ORDERS'">
          <DataTable :value="filteredOrders" class="p-datatable-sm w-full" :loading="loading">
            <Column header="KODE / TIPE" class="pl-8">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="text-[11px] font-black text-slate-800 font-mono">{{ data.code }}</span>
                  <span :class="['text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md w-fit', getServiceTypeClass(data.serviceType)]">
                    {{ getServiceTypeLabel(data.serviceType) }}
                  </span>
                </div>
              </template>
            </Column>
            <Column header="PELANGGAN & LOKASI">
              <template #body="{ data }">
                <div class="flex flex-col max-w-[180px]">
                  <span class="text-[11px] font-bold text-slate-700 truncate">{{ data.customer?.name || '-' }}</span>
                  <div class="flex items-center gap-1 text-slate-400 mt-0.5">
                    <i class="pi pi-map-marker text-[8px]"></i>
                    <span class="text-[9px] truncate">{{ data.locationAddress || 'Lokasi belum diisi' }}</span>
                  </div>
                </div>
              </template>
            </Column>
            <Column header="PEKERJAAN">
              <template #body="{ data }">
                <div class="flex flex-col max-w-[220px]">
                  <span class="text-[11px] font-black text-slate-800 truncate">{{ data.subject }}</span>
                  <span class="text-[9px] text-slate-400 line-clamp-1 mt-0.5">{{ data.description }}</span>
                </div>
              </template>
            </Column>
            <Column header="PRIORITAS" class="text-center">
              <template #body="{ data }">
                <span :class="['px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider', getPriorityClass(data.priority)]">
                  {{ getPriorityLabel(data.priority) }}
                </span>
              </template>
            </Column>
            <Column header="TEKNISI" class="text-center">
              <template #body="{ data }">
                <div v-if="data.appointments?.length > 0" class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-[10px] font-black">
                    {{ data.appointments[0].technician?.name?.charAt(0) || 'T' }}
                  </div>
                  <span class="text-[9px] font-bold text-slate-500 mt-1 max-w-[80px] truncate">{{ data.appointments[0].technician?.name }}</span>
                </div>
                <span v-else class="text-[9px] font-bold text-slate-300 italic">Unassigned</span>
              </template>
            </Column>
            <Column header="STATUS" class="text-center">
              <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', getOrderStatusClass(data.status)]">
                  {{ getOrderStatusLabel(data.status) }}
                </span>
              </template>
            </Column>
            <Column class="text-right pr-8">
              <template #body="{ data }">
                <div class="flex gap-1 justify-end">
                  <Button icon="pi pi-bolt" severity="primary" rounded text @click="openAssign(data)" v-if="canAssign(data.status)" />
                  <Button icon="pi pi-eye" severity="secondary" rounded text @click="openViewOrder(data)" />
                  <Button icon="pi pi-pencil" severity="secondary" rounded text @click="openEditOrder(data)" />
                </div>
              </template>
            </Column>
            <template #empty>
              <div class="p-20 text-center">
                <i class="pi pi-inbox text-4xl text-slate-200 mb-4"></i>
                <p class="text-slate-500 font-bold">Tidak ada data ditemukan</p>
              </div>
            </template>
          </DataTable>
        </div>

        <!-- ─── APPOINTMENTS TAB ─── -->
        <div v-show="activeTab === 'APPOINTMENTS'">
          <DataTable :value="appointments" class="p-datatable-sm w-full" :loading="loading">
            <Column header="TEKNISI" class="pl-8">
              <template #body="{ data }">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center text-white font-black text-sm shadow-lg">
                    {{ data.technician?.name?.charAt(0) || 'T' }}
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[11px] font-black text-slate-800">{{ data.technician?.name }}</span>
                    <span class="text-[9px] text-slate-400 font-mono">{{ data.technician?.email }}</span>
                  </div>
                </div>
              </template>
            </Column>
            <Column header="SERVICE ORDER">
              <template #body="{ data }">
                <div class="flex flex-col">
                  <span class="text-[10px] font-black text-slate-900 font-mono">{{ data.serviceOrder?.code }}</span>
                  <span class="text-[9px] text-slate-500 truncate max-w-[160px]">{{ data.serviceOrder?.subject }}</span>
                </div>
              </template>
            </Column>
            <Column header="JADWAL">
              <template #body="{ data }">
                <div class="flex flex-col text-[10px]">
                  <span class="font-bold text-slate-700">{{ formatDate(data.scheduledStart) }}</span>
                  <span class="text-slate-400 font-mono">{{ formatTimeRange(data.scheduledStart, data.scheduledEnd) }}</span>
                </div>
              </template>
            </Column>
            <Column header="WAKTU AKTUAL">
              <template #body="{ data }">
                <div v-if="data.actualStart" class="flex flex-col text-[10px]">
                  <span class="font-bold text-emerald-700">{{ formatDate(data.actualStart) }}</span>
                  <span class="text-slate-400 font-mono">{{ formatTimeRange(data.actualStart, data.actualEnd) }}</span>
                </div>
                <span v-else class="text-[9px] font-bold text-slate-300 italic">Not started</span>
              </template>
            </Column>
            <Column header="STATUS" class="text-center">
              <template #body="{ data }">
                <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', getApptStatusClass(data.status)]">
                  {{ getApptStatusLabel(data.status) }}
                </span>
              </template>
            </Column>
            <Column header="LAPORAN" class="text-center">
              <template #body="{ data }">
                <i v-if="data.report" class="pi pi-file-check text-emerald-500 text-lg"></i>
                <span v-else class="text-[9px] font-bold text-slate-300">N/A</span>
              </template>
            </Column>
            <Column class="text-right pr-8">
              <template #body="{ data }">
                <div class="flex gap-1 justify-end">
                  <Button icon="pi pi-play" severity="warning" rounded text @click="updateApptStatus(data, 'IN_PROGRESS')" v-if="data.status === 'ASSIGNED'" />
                  <Button icon="pi pi-check-circle" severity="success" rounded text @click="updateApptStatus(data, 'COMPLETED')" v-if="data.status === 'IN_PROGRESS'" />
                </div>
              </template>
            </Column>
            <template #empty>
              <div class="p-20 text-center">
                <i class="pi pi-calendar text-4xl text-slate-200 mb-4"></i>
                <p class="text-slate-500 font-bold">Belum ada penugasan teknisi</p>
              </div>
            </template>
          </DataTable>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ CREATE/EDIT ORDER DIALOG ══════════════════════════════════ -->
    <div v-if="orderDialogVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="orderDialogVisible = false"></div>
      <div class="relative bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 scale-in-center">
        <!-- Header -->
        <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50/10 mb-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-100">
              <i class="pi pi-ticket text-2xl text-white"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-slate-900">{{ orderForm.id ? 'Edit Service Order' : 'Buat Service Order Baru' }}</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">FSM Management System</p>
            </div>
          </div>
          <button @click="orderDialogVisible = false" class="text-slate-400 hover:text-slate-600 transition-colors">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>

        <div class="overflow-y-auto p-8 space-y-10 custom-scrollbar pb-32">
          <!-- Sec 1: Identification -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">1</div>
              <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Identifikasi Service Order</h4>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Order</label>
                <input v-model="orderForm.code" class="field-input" readonly />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipe Layanan <span class="text-rose-500">*</span></label>
                <select v-model="orderForm.serviceType" class="field-select">
                  <option value="REPAIR">REPAIR (Perbaikan)</option>
                  <option value="INSTALLATION">INSTALLATION (Pemasangan)</option>
                  <option value="MAINTENANCE">MAINTENANCE (Perawatan)</option>
                  <option value="INSPECTION">INSPECTION (Inspeksi)</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prioritas <span class="text-rose-500">*</span></label>
                <select v-model="orderForm.priority" class="field-select">
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Sec 2: Customer -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-black">2</div>
              <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Data Pelanggan & Lokasi</h4>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pelanggan <span class="text-rose-500">*</span></label>
                <select v-model="orderForm.customerId" class="field-select">
                  <option value="">-- Pilih Pelanggan --</option>
                  <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">PIC Lokasi / Kontak</label>
                <input v-model="orderForm.contactName" class="field-input" placeholder="Nama PIC" />
              </div>
              <div class="md:col-span-2 space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Lokasi Layanan <span class="text-rose-500">*</span></label>
                <textarea v-model="orderForm.locationAddress" rows="2" class="field-textarea" placeholder="Alamat lengkap tujuan..."></textarea>
              </div>
            </div>
          </div>

          <!-- Sec 3: Work Details -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">3</div>
              <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Rincian Pekerjaan</h4>
            </div>
            <div class="space-y-6">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subjek Pekerjaan <span class="text-rose-500">*</span></label>
                <input v-model="orderForm.subject" class="field-input font-bold" placeholder="Judul singkat pekerjaan..." />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deskripsi Lingkup Kerja</label>
                <textarea v-model="orderForm.description" rows="4" class="field-textarea" placeholder="Detail scope pekerjaan..."></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="absolute bottom-0 left-0 w-full bg-white p-8 border-t border-slate-100 flex items-center justify-between rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.05)]">
           <p class="text-[10px] text-slate-400 font-medium italic"><span class="text-rose-500">*</span> Wajib diisi</p>
           <div class="flex gap-3">
              <Button label="Batalkan" severity="secondary" text @click="orderDialogVisible = false" class="font-black text-[10px] uppercase" />
              <Button :label="orderForm.id ? 'Perbarui Order' : 'Buat Order'" icon="pi pi-check" class="p-button-rounded font-black text-[10px] uppercase px-8 shadow-lg shadow-indigo-100" @click="saveOrder" :loading="saving" />
           </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ ASSIGN TECHNICIAN DIALOG ══════════════════════════════════ -->
    <div v-if="assignDialogVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="assignDialogVisible = false"></div>
      <div class="relative bg-white rounded-xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl transition-all duration-500 scale-in-center">
        <!-- Header -->
        <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50/10 mb-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-100">
              <i class="pi pi-bolt text-2xl text-white"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-slate-900">Penugasan Teknisi</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Dispatching Assignment Flow</p>
            </div>
          </div>
          <button @click="assignDialogVisible = false" class="text-slate-400 hover:text-slate-600 transition-colors">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>

        <div class="p-8 space-y-10 overflow-y-auto custom-scrollbar pb-32">
          <!-- Order Brief -->
          <div class="p-5 bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden">
             <div class="absolute top-0 right-0 p-4 opacity-10">
                <i class="pi pi-receipt text-6xl text-slate-300"></i>
             </div>
             <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-mono">{{ selectedOrder?.code }}</p>
             <h4 class="text-sm font-black text-slate-800 uppercase">{{ selectedOrder?.subject }}</h4>
          </div>

          <!-- Sec 1: Schedule -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">1</div>
              <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Jadwal Pelaksanaan</h4>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Mulai <span class="text-rose-500">*</span></label>
                <input type="date" v-model="assignForm.scheduledStartDate" class="field-input" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jam Mulai <span class="text-rose-500">*</span></label>
                <input type="time" v-model="assignForm.scheduledStartTime" class="field-input" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Selesai (Est)</label>
                <input type="date" v-model="assignForm.scheduledEndDate" class="field-input" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jam Selesai (Est)</label>
                <input type="time" v-model="assignForm.scheduledEndTime" class="field-input" />
              </div>
            </div>
          </div>

          <!-- Sec 2: Technician -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-black">2</div>
              <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Teknisi & Instruksi</h4>
            </div>
            <div class="space-y-6">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Technicians <span class="text-rose-500">*</span></label>
                <select v-model="assignForm.technicianId" class="field-select">
                  <option value="">-- Pilih Teknisi --</option>
                  <option v-for="t in technicians" :key="t.id" :value="t.id">
                    {{ t.name }} ({{ t.email }})
                  </option>
                </select>
              </div>
              <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pesan Instruksi</label>
                  <textarea v-model="assignForm.notes" rows="3" class="field-textarea" placeholder="Instruksi khusus untuk teknisi..."></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="absolute bottom-0 left-0 w-full bg-white p-8 border-t border-slate-100 flex items-center justify-end gap-3 rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.05)]">
           <Button label="Batal" severity="secondary" text @click="assignDialogVisible = false" class="font-black text-[10px] uppercase" />
           <Button label="Konfirmasi & Kirim Tugas" icon="pi pi-bolt" class="p-button-rounded font-black text-[10px] uppercase px-8 shadow-lg shadow-indigo-100" @click="saveAssignment" :loading="saving" />
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ VIEW DETAIL DIALOG ══════════════════════════════════ -->
    <div v-if="viewDialogVisible && viewOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="viewDialogVisible = false"></div>
      <div class="relative bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 scale-in-center">
        <!-- Header -->
        <div class="flex items-center justify-between p-8 border-b border-slate-100 shrink-0">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <span class="text-[10px] font-black font-mono text-indigo-600 tracking-tighter">{{ viewOrder.code }}</span>
              <span :class="['px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest', getOrderStatusClass(viewOrder.status)]">{{ getOrderStatusLabel(viewOrder.status) }}</span>
            </div>
            <h3 class="text-xl font-black text-slate-900 tracking-tight">{{ viewOrder.subject }}</h3>
            <div class="flex items-center gap-2 mt-1">
               <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ viewOrder.customer?.name }}</span>
               <span class="text-slate-200">/</span>
               <span :class="['text-[10px] font-bold px-2 py-0.5 rounded', getPriorityClass(viewOrder.priority)]">{{ getPriorityLabel(viewOrder.priority) }}</span>
            </div>
          </div>
          <button @click="viewDialogVisible = false" class="text-slate-400 hover:text-slate-600 transition-colors">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>

        <div class="overflow-y-auto p-8 space-y-10 custom-scrollbar pb-32">
          <!-- Location & PIC -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-6 relative overflow-hidden group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Service Location</p>
              <div class="flex items-start gap-3">
                 <div class="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <i class="pi pi-map-marker text-indigo-600"></i>
                 </div>
                 <p class="text-sm font-bold text-slate-800 leading-relaxed">{{ viewOrder.locationAddress || 'Alamat belum ditentukan' }}</p>
              </div>
            </div>
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-6 relative overflow-hidden group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Contact PIC</p>
              <div class="flex items-start gap-3">
                 <div class="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center shrink-0">
                    <i class="pi pi-user text-slate-600"></i>
                 </div>
                 <div>
                    <p class="text-sm font-bold text-slate-800">{{ viewOrder.contactName || 'No Contact' }}</p>
                    <p class="text-xs text-slate-500 font-mono mt-0.5">{{ viewOrder.contactPhone || '-' }}</p>
                 </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-4">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">1</div>
                <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Deskripsi Pekerjaan</h4>
             </div>
             <div class="bg-white border border-slate-100 rounded-3xl p-8 shadow-inner font-medium text-slate-700 leading-relaxed italic text-sm">
                "{{ viewOrder.description || 'Tidak ada deskripsi rinci untuk pekerjaan ini.' }}"
             </div>
          </div>

          <div v-if="viewOrder.notes" class="bg-amber-50/50 border border-amber-200/50 rounded-3xl p-6">
            <p class="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
               <i class="pi pi-exclamation-circle"></i> Catatan Internal
            </p>
            <p class="text-sm text-amber-900 leading-relaxed">{{ viewOrder.notes }}</p>
          </div>
          
          <!-- Appointments -->
          <div v-if="viewOrder.appointments?.length > 0" class="space-y-6">
            <div class="flex items-center gap-3">
               <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-black">2</div>
               <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Riwayat Penugasan teknisi</h4>
            </div>
            <div class="space-y-4">
              <div v-for="a in viewOrder.appointments" :key="a.id" class="group p-6 bg-white border border-slate-100 rounded-xl hover:shadow-lg transition-all">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-sm font-black uppercase shadow-lg group-hover:bg-indigo-600 transition-colors">
                      {{ a.technician?.name?.charAt(0) || 'T' }}
                    </div>
                    <div>
                      <p class="text-sm font-black text-slate-900 tracking-tight">{{ a.technician?.name }}</p>
                      <div class="flex items-center gap-2 mt-0.5">
                         <span class="text-[10px] font-bold text-slate-400 font-mono">{{ formatDate(a.scheduledStart) }}</span>
                         <span class="text-slate-200">·</span>
                         <span class="text-[10px] font-mono text-indigo-600">{{ formatTimeRange(a.scheduledStart, a.scheduledEnd) }}</span>
                      </div>
                    </div>
                  </div>
                  <div :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', getApptStatusClass(a.status)]">
                     {{ getApptStatusLabel(a.status) }}
                  </div>
                </div>

                <div v-if="a.report" class="bg-emerald-50 rounded-2xl p-4 mt-2 border border-emerald-100/50">
                  <p class="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <i class="pi pi-file-check"></i> Laporan Selesai
                  </p>
                  <p class="text-xs text-emerald-800 leading-relaxed font-medium">"{{ a.report.summary }}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-8 border-t border-slate-100 flex items-center justify-end gap-3">
          <button v-if="canAssign(viewOrder?.status)" @click="openAssign(viewOrder); viewDialogVisible = false;"
            class="px-6 h-10 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-wider">
            <i class="pi pi-bolt mr-2"></i> Tugaskan Teknisi
          </button>
          <button @click="viewDialogVisible = false" class="px-6 h-10 rounded-xl bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-wider">Tutup</button>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ COMPLETE REPORT DIALOG ══════════════════════════════════ -->
    <div v-if="reportDialogVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="reportDialogVisible = false"></div>
      <div class="relative bg-white rounded-xl w-full max-w-xl overflow-hidden flex flex-col shadow-2xl transition-all duration-500 scale-in-center">
        <!-- Header -->
        <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-emerald-50/20 mb-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-100">
              <i class="pi pi-check-circle text-2xl text-white"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-slate-900">Laporan Penyelesaian</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Final Service Completion</p>
            </div>
          </div>
          <button @click="reportDialogVisible = false" class="text-slate-400 hover:text-slate-600 transition-colors">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>

        <div class="p-8 space-y-10 overflow-y-auto custom-scrollbar pb-32">
          <!-- Order Summary -->
          <div class="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
             <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-mono">{{ selectedOrder?.code }}</p>
             <h4 class="text-sm font-black text-slate-800 uppercase">{{ selectedOrder?.subject }}</h4>
          </div>

          <!-- Sec 1: Work Summary -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">1</div>
              <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Ringkasan Pekerjaan</h4>
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detail Pekerjaan <span class="text-rose-500">*</span></label>
              <textarea v-model="reportForm.summary" rows="3" class="field-textarea" placeholder="Jelaskan apa saja yang telah dikerjakan teknisi..."></textarea>
            </div>
          </div>

          <!-- Sec 2: Resolution -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-black">2</div>
              <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Hasil & Resolusi</h4>
            </div>
            <div class="space-y-1.5 focus-within:translate-x-1 transition-transform">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Solusi Akhir <span class="text-rose-500">*</span></label>
              <textarea v-model="reportForm.resolution" rows="3" class="field-textarea" placeholder="Bagaimana status akhir peralatan atau area yang dilayani?"></textarea>
            </div>
          </div>
        </div>

        <!-- Footer -->
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

async function submitReport() {
  if (!reportForm.summary || !reportForm.resolution) {
    showToast('warn', 'Ringkasan dan penyelesaian wajib diisi');
    return;
  }
  saving.value = true;
  try {
    await api.patch(`/fsm/appointments/${reportForm.appointmentId}`, { status: 'COMPLETED' });
    await api.post(`/fsm/appointments/${reportForm.appointmentId}/report`, {
      summary: reportForm.summary,
      resolution: reportForm.resolution,
    });
    showToast('success', 'Service order ditandai selesai dan laporan disimpan');
    reportDialogVisible.value = false;
    await loadData();
  } catch (e: any) {
    showToast('error', e.response?.data?.message || 'Gagal menyimpan laporan');
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
  LOW:    { label: 'Rendah',  cls: 'bg-slate-100 text-slate-600' },
  MEDIUM: { label: 'Sedang',  cls: 'bg-indigo-100 text-indigo-700' },
  HIGH:   { label: 'Tinggi',  cls: 'bg-amber-100 text-amber-700' },
  URGENT: { label: 'Darurat', cls: 'bg-rose-100 text-rose-700' },
};
const getPriorityLabel = (p: string) => PRIORITY_MAP[p]?.label || p;
const getPriorityClass = (p: string) => PRIORITY_MAP[p]?.cls || 'bg-slate-100 text-slate-600';

const ORDER_STATUS_MAP: Record<string, { label: string; cls: string }> = {
  DRAFT:            { label: 'Draft',           cls: 'bg-slate-100 text-slate-600' },
  SUBMITTED:        { label: 'Diajukan',        cls: 'bg-blue-100 text-blue-700' },
  PENDING_SCHEDULE: { label: 'Belum Terjadwal', cls: 'bg-amber-100 text-amber-700' },
  SCHEDULED:        { label: 'Terjadwal',       cls: 'bg-indigo-100 text-indigo-700' },
  IN_PROGRESS:      { label: 'Dikerjakan',      cls: 'bg-blue-100 text-blue-700 animate-pulse' },
  COMPLETED:        { label: 'Selesai',         cls: 'bg-emerald-100 text-emerald-700' },
  CANCELLED:        { label: 'Dibatalkan',      cls: 'bg-rose-100 text-rose-600' },
};
const getOrderStatusLabel = (s: string) => ORDER_STATUS_MAP[s]?.label || s;
const getOrderStatusClass = (s: string) => ORDER_STATUS_MAP[s]?.cls || 'bg-slate-100 text-slate-600';

const APPT_STATUS_MAP: Record<string, { label: string; cls: string }> = {
  ASSIGNED:    { label: 'Ditugaskan',  cls: 'bg-indigo-100 text-indigo-700' },
  IN_PROGRESS: { label: 'Dikerjakan', cls: 'bg-amber-100 text-amber-700 animate-pulse' },
  COMPLETED:   { label: 'Selesai',    cls: 'bg-emerald-100 text-emerald-700' },
  CANCELLED:   { label: 'Dibatalkan', cls: 'bg-rose-100 text-rose-600' },
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

<style scoped>
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
  background: rgba(238, 242, 255, 0.4) !important; /* Subtle Indigo hover */
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1.5rem !important;
  border-bottom: 1px solid #f8fafc !important;
  @apply text-slate-700;
}

.field-input {
  @apply w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 transition-all focus:outline-none focus:border-indigo-500 focus:bg-white;
}
.field-select {
  @apply w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 transition-all focus:outline-none focus:border-indigo-500 focus:bg-white appearance-none;
}
.field-textarea {
  @apply w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 transition-all focus:outline-none focus:border-indigo-500 focus:bg-white resize-none;
}
</style>
