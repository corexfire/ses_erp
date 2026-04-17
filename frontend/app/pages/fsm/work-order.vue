<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
    <!-- Header / Navigation Bar -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-6 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div class="relative flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-100 shrink-0">
          <i class="pi pi-map-marker text-white text-xl"></i>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
             <span class="px-2 py-0.5 bg-indigo-900 text-white text-[9px] font-black uppercase tracking-widest rounded">Field Operation</span>
             <span class="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">GPS Workspace</span>
          </div>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase tracking-tighter">Work Order <span class="text-indigo-600">Track</span></h1>
        </div>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadWorkOrders" :loading="loading" />
        <div class="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
           <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span class="text-[10px] font-black uppercase text-slate-500 tracking-widest">GPS Live Connection</span>
        </div>
      </div>
    </div>

    <main class="mx-6 p-2 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- LEFT COLUMN: Work Order List -->
      <div class="lg:col-span-4 space-y-6">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Antrian Hari Ini</h2>
          <span class="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider border border-indigo-100">
            {{ workOrders.length }} Task
          </span>
        </div>

        <div v-if="loading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="h-32 bg-slate-200/50 rounded-2xl animate-pulse"></div>
        </div>

        <div v-else-if="workOrders.length === 0" class="p-12 text-center bg-white rounded-xl border border-dashed border-slate-200">
          <i class="pi pi-calendar-minus text-4xl text-slate-200 mb-4"></i>
          <p class="text-xs font-bold text-slate-400">Tidak ada jadwal hari ini.</p>
        </div>

        <div v-else class="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
          <div v-for="wo in workOrders" :key="wo.id" 
            @click="selectWorkOrder(wo)"
            :class="['group relative p-5 rounded-xl border transition-all cursor-pointer overflow-hidden', 
              selectedWorkOrder?.id === wo.id ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-100 scale-[1.02]' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1']"
          >
            <!-- Background Decoration -->
            <div v-if="selectedWorkOrder?.id === wo.id" class="absolute -right-10 -bottom-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            
            <div class="relative flex justify-between items-start mb-3">
              <div>
                <span :class="['text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded', selectedWorkOrder?.id === wo.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500']">
                  {{ wo.serviceOrder?.code }}
                </span>
                <h3 :class="['text-xs font-black mt-2 line-clamp-1 uppercase tracking-tight', selectedWorkOrder?.id === wo.id ? 'text-white' : 'text-slate-900']">
                  {{ wo.serviceOrder?.subject }}
                </h3>
              </div>
              <div :class="['px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider', getStatusStyles(wo.status)]">
                {{ formatStatus(wo.status) }}
              </div>
            </div>

            <div class="flex items-center gap-3 mb-4">
              <i class="pi pi-map-marker text-[9px]" :class="selectedWorkOrder?.id === wo.id ? 'text-indigo-200' : 'text-slate-400'"></i>
              <span class="text-[9px] font-bold line-clamp-1" :class="selectedWorkOrder?.id === wo.id ? 'text-indigo-100' : 'text-slate-500'">
                {{ wo.serviceOrder?.locationAddress }}
              </span>
            </div>

            <div class="flex items-center justify-between pt-3 border-t" :class="selectedWorkOrder?.id === wo.id ? 'border-white/10' : 'border-slate-100'">
              <div class="flex items-center gap-2">
                <i class="pi pi-clock text-[9px]" :class="selectedWorkOrder?.id === wo.id ? 'text-indigo-200' : 'text-slate-400'"></i>
                <span class="text-[9px] font-black tracking-tight" :class="selectedWorkOrder?.id === wo.id ? 'text-white' : 'text-slate-700'">{{ formatTime(wo.scheduledStart) }} - {{ formatTime(wo.scheduledEnd) }}</span>
              </div>
              <i class="pi pi-chevron-right text-[9px] transition-transform group-hover:translate-x-1" :class="selectedWorkOrder?.id === wo.id ? 'text-white' : 'text-slate-300'"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: Detailed View & Execution -->
      <div class="lg:col-span-8 space-y-8">
        <div v-if="!selectedWorkOrder" class="h-full flex flex-col items-center justify-center p-20 bg-white border border-slate-200 border-dashed rounded-xl shadow-sm">
          <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
            <i class="pi pi-mouse-pointer text-4xl text-slate-300 translate-x-0.5"></i>
          </div>
          <h3 class="text-xl font-black text-slate-400 uppercase tracking-widest">Pilih Penugasan</h3>
          <p class="text-xs text-slate-500 font-bold mt-2 text-center max-w-sm">Pilih salah satu jadwal di sebelah kiri untuk melihat detail lokasi dan memulai eksekusi pekerjaan.</p>
        </div>

        <div v-else class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <!-- WO Info Card -->
          <div class="bg-white border border-slate-200 rounded-xl p-8 relative overflow-hidden shadow-sm">
             <!-- Status Decoration -->
             <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50/30 to-transparent pointer-events-none"></div>

             <div class="relative flex flex-col md:flex-row md:items-start justify-between gap-8">
               <div class="flex-1">
                 <div class="flex items-center gap-3 mb-4">
                  <span class="px-3 py-1 bg-indigo-50 border border-indigo-100/50 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-[0.15em]">
                    Work Order Execution Flow
                  </span>
                  <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider', getStatusStyles(selectedWorkOrder.status)]">
                    {{ formatStatus(selectedWorkOrder.status) }}
                  </span>
                 </div>
                 <h2 class="text-3xl font-black text-slate-900 leading-tight mb-3 uppercase tracking-tighter">{{ selectedWorkOrder.serviceOrder?.subject }}</h2>
                 <p class="text-slate-500 text-sm leading-relaxed max-w-2xl font-medium italic">"{{ selectedWorkOrder.serviceOrder?.description || 'Tidak ada deskripsi rinci untuk penugasan ini.' }}"</p>
               </div>
               
               <div class="flex flex-col gap-3 min-w-[200px]">
                  <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between shadow-inner">
                    <div>
                      <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Kode Order</p>
                      <p class="text-xs font-black text-slate-900 font-mono">{{ selectedWorkOrder.serviceOrder?.code }}</p>
                    </div>
                    <i class="pi pi-receipt text-slate-300 text-xl"></i>
                  </div>
                  <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-help transition-all hover:bg-white hover:shadow-md">
                    <div>
                      <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Client / Customer</p>
                      <p class="text-xs font-black text-indigo-600 truncate max-w-[120px]">{{ selectedWorkOrder.serviceOrder?.customer?.name }}</p>
                    </div>
                    <i class="pi pi-id-card text-slate-300 text-xl"></i>
                  </div>
               </div>
             </div>

             <!-- Field Details Row -->
             <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-slate-100">
               <div class="space-y-1">
                 <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <i class="pi pi-user text-[10px] text-indigo-500"></i> Kontak PIC
                 </p>
                 <p class="text-xs font-bold text-slate-800">{{ selectedWorkOrder.serviceOrder?.contactName || '-' }}</p>
                 <p class="text-[10px] font-mono font-bold text-slate-400">{{ selectedWorkOrder.serviceOrder?.contactPhone || '' }}</p>
               </div>
               <div class="space-y-1">
                 <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <i class="pi pi-box text-[10px] text-indigo-500"></i> Tipe Pekerjaan
                 </p>
                 <p class="text-xs font-bold text-slate-800 uppercase tracking-wider">{{ selectedWorkOrder.serviceOrder?.serviceType }}</p>
               </div>
               <div class="space-y-1">
                 <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <i class="pi pi-exclamation-circle text-[10px] text-indigo-500"></i> Prioritas
                 </p>
                 <div :class="['text-xs font-bold px-3 py-1 rounded-lg w-fit capitalize', getPriorityClass(selectedWorkOrder.serviceOrder?.priority)]">
                   {{ selectedWorkOrder.serviceOrder?.priority }}
                 </div>
               </div>
               <div class="space-y-1">
                 <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <i class="pi pi-clock text-[10px] text-indigo-500"></i> Estimasi Durasi
                 </p>
                 <p class="text-xs font-bold text-slate-800">{{ selectedWorkOrder.serviceOrder?.totalEstimatedDuration || 60 }} Menit</p>
               </div>
             </div>
          </div>

           <!-- Execution Panels -->
           <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
             <!-- Action Controls -->
             <div class="bg-white border border-slate-200 rounded-xl p-8 shadow-sm relative overflow-hidden">
               <div class="absolute -right-10 -top-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-50"></div>
               <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3 relative">
                 <i class="pi pi-play-circle text-indigo-600"></i> Kontrol Eksekusi
               </h3>
               
               <div class="space-y-4 relative">
                 <!-- Transition Buttons -->
                 <button v-if="selectedWorkOrder.status === 'ASSIGNED'" 
                   @click="updateStatus('EN_ROUTE')" :disabled="saving"
                   class="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-between px-6 transition-all shadow-xl shadow-indigo-100 group">
                   <div class="text-left font-black">
                     <p class="text-[10px] uppercase tracking-widest opacity-70">Langkah 1</p>
                     <p class="text-sm uppercase tracking-tighter">Mulai Perjalanan</p>
                   </div>
                   <i class="pi pi-arrow-right group-hover:translate-x-1 transition-transform text-lg"></i>
                 </button>

                 <button v-if="selectedWorkOrder.status === 'EN_ROUTE'" 
                   @click="updateStatus('ON_SITE')" :disabled="saving"
                   class="w-full h-16 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-between px-6 transition-all shadow-xl shadow-amber-100 group">
                   <div class="text-left font-black">
                     <p class="text-[10px] uppercase tracking-widest opacity-70">Langkah 2</p>
                     <p class="text-sm uppercase tracking-tighter">Tiba di Lokasi</p>
                   </div>
                   <i class="pi pi-map-marker group-hover:scale-110 transition-transform text-lg"></i>
                 </button>

                 <button v-if="selectedWorkOrder.status === 'ON_SITE'" 
                   @click="updateStatus('IN_PROGRESS')" :disabled="saving"
                   class="w-full h-16 rounded-2xl bg-indigo-900 hover:bg-slate-900 text-white flex items-center justify-between px-6 transition-all shadow-xl shadow-slate-200 group">
                   <div class="text-left font-black">
                     <p class="text-[10px] uppercase tracking-widest opacity-70">Langkah 3</p>
                     <p class="text-sm uppercase tracking-tighter">Mulai Pekerjaan</p>
                   </div>
                   <i class="pi pi-cog animate-spin-slow text-lg"></i>
                 </button>

                 <button v-if="selectedWorkOrder.status === 'IN_PROGRESS'" 
                   @click="openReportDialog" :disabled="saving"
                   class="w-full h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-between px-6 transition-all shadow-xl shadow-emerald-100 group">
                   <div class="text-left font-black">
                     <p class="text-[10px] uppercase tracking-widest opacity-70">Final Step</p>
                     <p class="text-sm uppercase tracking-tighter">Selesaikan WO</p>
                   </div>
                   <i class="pi pi-check-circle group-hover:scale-110 transition-transform text-lg"></i>
                 </button>

                 <!-- Timeline Details -->
                 <div class="mt-10 space-y-4 pt-6 border-t border-slate-100">
                   <div class="flex items-center gap-4">
                     <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                       <i class="pi pi-calendar text-slate-400"></i>
                     </div>
                     <div>
                       <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Jadwal Tugas</p>
                       <p class="text-xs font-bold text-slate-800 tracking-tight">{{ formatDateTime(selectedWorkOrder.scheduledStart) }}</p>
                     </div>
                   </div>
                   <div v-if="selectedWorkOrder.actualStart" class="flex items-center gap-4">
                     <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100/50">
                       <i class="pi pi-play-circle text-indigo-600"></i>
                     </div>
                     <div>
                       <p class="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-0.5">Check-In System</p>
                       <p class="text-xs font-black text-slate-900 tracking-tight">{{ formatDateTime(selectedWorkOrder.actualStart) }}</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             <!-- Location / GPS Context -->
             <div class="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col relative overflow-hidden">
               <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-slate-50 rounded-full blur-3xl"></div>
               <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3 relative">
                 <i class="pi pi-directions text-indigo-600"></i> Lokasi & Radar
               </h3>

               <div class="flex-1 space-y-6 relative">
                 <div class="p-8 bg-slate-900 rounded-xl flex flex-col items-center justify-center text-center shadow-inner relative group cursor-crosshair">
                   <div class="absolute inset-0 opacity-10 pointer-events-none">
                      <div class="w-full h-full border border-white/20 rounded-full scale-50"></div>
                      <div class="w-full h-full border border-white/10 rounded-full scale-75"></div>
                   </div>
                   <div class="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20 shadow-xl shadow-emerald-500/5 pulse-subtle">
                     <i class="pi pi-compass text-3xl text-emerald-500"></i>
                   </div>
                   <p class="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2 font-mono">Geospatial Coordinates</p>
                   <p class="text-lg font-black text-white font-mono tracking-tighter leading-none">
                     {{ selectedWorkOrder.serviceOrder?.coordinateLat || '-6.2088' }}, 
                     {{ selectedWorkOrder.serviceOrder?.coordinateLng || '106.8456' }}
                   </p>
                 </div>

                 <div class="space-y-4">
                   <div class="bg-indigo-50/30 p-5 rounded-2xl border border-indigo-100/50">
                     <p class="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2">Target Address</p>
                     <p class="text-xs font-bold text-slate-800 leading-relaxed">{{ selectedWorkOrder.serviceOrder?.locationAddress || 'Alamat tidak tersedia.' }}</p>
                   </div>
                   <button @click="openNavigation" class="w-full h-14 rounded-2xl bg-white border border-slate-200 text-slate-900 hover:border-indigo-400 hover:text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95">
                     <i class="pi pi-external-link"></i> Launch Navigation
                   </button>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </main>

    <!-- REPORT DIALOG -->
    <div v-if="reportDialogVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="reportDialogVisible = false"></div>
      <div class="relative bg-white rounded-xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl transition-all duration-500 scale-in-center">
        <!-- Header -->
        <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-emerald-50/20 mb-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-100">
              <i class="pi pi-check-circle text-2xl text-white"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter">Penyelesaian Kerja</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Final Service Report</p>
            </div>
          </div>
          <button @click="reportDialogVisible = false" class="text-slate-400 hover:text-slate-600 transition-colors">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>

        <div class="p-8 space-y-10 overflow-y-auto custom-scrollbar pb-32">
          <!-- Order Context -->
          <div class="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
             <div class="flex items-center gap-3 mb-2">
                <span class="px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded">{{ selectedWorkOrder?.serviceOrder?.code }}</span>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">Target Assignment</span>
             </div>
             <h4 class="text-lg font-black text-slate-800 uppercase leading-tight">{{ selectedWorkOrder?.serviceOrder?.subject }}</h4>
          </div>

          <!-- Sec 1: Work Summary -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">1</div>
              <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Ringkasan Pekerjaan</h4>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detail Kegiatan <span class="text-rose-500">*</span></label>
              <textarea v-model="reportForm.summary" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500 transition-all resize-none" placeholder="Apa saja yang telah dikerjakan di lokasi?..."></textarea>
            </div>
          </div>

          <!-- Sec 2: Resolution -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-black">2</div>
              <h4 class="text-[11px] font-black uppercase tracking-widest text-slate-900">Hasil & Resolusi</h4>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Solusi / Status Akhir <span class="text-rose-500">*</span></label>
              <textarea v-model="reportForm.resolution" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500 transition-all resize-none" placeholder="Bagaimana kondisi akhir peralatan atau masalah?..."></textarea>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="absolute bottom-0 left-0 w-full bg-white p-8 border-t border-slate-100 flex items-center justify-end gap-3 rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.05)]">
           <Button label="Batal" severity="secondary" text @click="reportDialogVisible = false" class="font-black text-[10px] uppercase" />
           <Button label="Simpan & Selesaikan Pekerjaan" icon="pi pi-check-circle" class="p-button-rounded p-button-success font-black text-[10px] uppercase px-8 shadow-xl shadow-emerald-100" @click="submitReport" :loading="saving" />
        </div>
      </div>
    </div>

    <!-- Toast Component Simulation (using PrimeVue or Custom) -->
    <div class="fixed bottom-8 right-8 z-[100] space-y-3">
      <transition-group name="toast">
        <div v-for="t in toasts" :key="t.id" 
          :class="['px-6 py-4 rounded-2xl shadow-2xl text-white text-xs font-bold flex items-center gap-3 border', 
            t.type === 'error' ? 'bg-rose-600 border-rose-400' : 'bg-emerald-600 border-emerald-400']">
          <i :class="[t.type === 'error' ? 'pi pi-times-circle' : 'pi pi-check-circle']"></i>
          {{ t.message }}
        </div>
      </transition-group>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

const api = useApi();

const workOrders = ref<any[]>([]);
const selectedWorkOrder = ref<any>(null);
const loading = ref(false);
const saving = ref(false);
const reportDialogVisible = ref(false);
const toasts = ref<any[]>([]);

const reportForm = reactive({
  summary: '',
  resolution: ''
});

// Load data on mount
async function loadWorkOrders() {
  loading.value = true;
  try {
    const res = await api.get('/fsm/work-orders/active');
    workOrders.value = res.data;
    
    // Auto-select the first one or maintain selection
    if (selectedWorkOrder.value) {
      const updated = workOrders.value.find(w => w.id === selectedWorkOrder.value.id);
      if (updated) selectedWorkOrder.value = updated;
    } else if (workOrders.value.length > 0) {
      selectedWorkOrder.value = workOrders.value[0];
    }
  } catch (e: any) {
    showToast('error', 'Gagal memuat jadwal.');
  } finally {
    loading.value = false;
  }
}

function selectWorkOrder(wo: any) {
  selectedWorkOrder.value = wo;
}

async function updateStatus(newStatus: string) {
  saving.value = true;
  try {
    const res = await api.patch(`/fsm/appointments/${selectedWorkOrder.value.id}/status`, { status: newStatus });
    showToast('success', `Status diperbarui ke: ${formatStatus(newStatus)}`);
    await loadWorkOrders();
  } catch (e: any) {
    showToast('error', 'Gagal memperbarui status.');
  } finally {
    saving.value = false;
  }
}

function openReportDialog() {
  reportForm.summary = '';
  reportForm.resolution = '';
  reportDialogVisible.value = true;
}

async function submitReport() {
  if (!reportForm.summary || !reportForm.resolution) {
    showToast('error', 'Lengkapi summary dan resolusi.');
    return;
  }
  
  saving.value = true;
  try {
    // 1. Submit the report
    await api.post(`/fsm/appointments/${selectedWorkOrder.value.id}/report`, {
      summary: reportForm.summary,
      resolution: reportForm.resolution
    });
    
    // 2. Mark as completed
    await api.patch(`/fsm/appointments/${selectedWorkOrder.value.id}/status`, { status: 'COMPLETED' });
    
    showToast('success', 'Laporan berhasil disimpan dan Work Order selesai.');
    reportDialogVisible.value = false;
    selectedWorkOrder.value = null;
    await loadWorkOrders();
  } catch (e: any) {
    showToast('error', 'Gagal mengirim laporan.');
  } finally {
    saving.value = false;
  }
}

function openNavigation() {
  const lat = selectedWorkOrder.value.serviceOrder?.coordinateLat || -6.2088;
  const lng = selectedWorkOrder.value.serviceOrder?.coordinateLng || 106.8456;
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}

// Helpers
function formatStatus(status: string) {
  const map: Record<string, string> = {
    'ASSIGNED': 'Ditugaskan',
    'EN_ROUTE': 'Dalam Perjalanan',
    'ON_SITE': 'Tiba di Lokasi',
    'IN_PROGRESS': 'Sedang Kerja',
    'COMPLETED': 'Selesai',
    'FAILED': 'Gagal',
    'CANCELED': 'Dibatalkan'
  };
  return map[status] || status;
}

function getStatusStyles(status: string) {
  const map: Record<string, string> = {
    'ASSIGNED': 'bg-slate-100 text-slate-500 border border-slate-200',
    'EN_ROUTE': 'bg-amber-50 text-amber-600 border border-amber-100',
    'ON_SITE': 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    'IN_PROGRESS': 'bg-blue-50 text-blue-600 border border-blue-100',
    'COMPLETED': 'bg-emerald-50 text-emerald-600 border border-emerald-100'
  };
  return map[status] || 'bg-slate-100 text-slate-400';
}

function getPriorityClass(priority: string) {
  if (priority === 'URGENT') return 'bg-rose-50 text-rose-600 border border-rose-100';
  if (priority === 'HIGH') return 'bg-amber-50 text-amber-600 border border-amber-100';
  return 'bg-blue-50 text-blue-600 border border-blue-100';
}

function formatTime(date: string) {
  if (!date) return '-';
  return format(new Date(date), 'HH:mm');
}

function formatDateTime(date: string) {
  if (!date) return '-';
  return format(new Date(date), 'd MMM, HH:mm', { locale: localeId });
}

function showToast(type: 'error' | 'success', message: string) {
  const id = Date.now();
  toasts.value.push({ id, type, message });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, 4000);
}

onMounted(() => {
  loadWorkOrders();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
</style>
