<template>
  <div class="min-h-screen bg-[#f8fafc] p-6 lg:p-8">
    
    <!-- Premium Header -->
    <div class="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex items-center gap-5">
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 shadow-xl shadow-indigo-100 transition-transform hover:scale-105">
          <i class="pi pi-desktop text-2xl text-white"></i>
        </div>
        <div>
          <h1 class="text-2xl font-black tracking-tight text-slate-900 lg:text-3xl">Shop Floor Control</h1>
          <p class="mt-1 text-sm font-medium text-slate-500 flex items-center gap-2">
            <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
            Real-time Production Monitoring & Reporting
          </p>
        </div>
      </div>
      
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-2 rounded-2xl bg-white border border-slate-200 p-1.5 shadow-sm">
          <button 
            v-for="v in ['board', 'grid']" 
            :key="v"
            @click="viewMode = v"
            :class="[
              'rounded-xl px-4 py-2 text-sm font-bold transition-all',
              viewMode === v ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            ]"
          >
            <i :class="['pi text-xs mr-2', v === 'board' ? 'pi-th-large' : 'pi-list']"></i>
            {{ v.charAt(0).toUpperCase() + v.slice(1) }}
          </button>
        </div>
        
        <button @click="load" class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600 active:scale-95">
          <i class="pi pi-refresh" :class="{ 'animate-spin': loading }"></i>
        </button>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div v-for="s in stats" :key="s.label" class="group relative flex items-center gap-5 rounded-3xl bg-white p-6 border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden">
        <div :class="`flex h-14 w-14 items-center justify-center rounded-2xl ${s.color} transition-transform group-hover:scale-110`">
          <i :class="`pi ${s.icon} text-xl text-white`"></i>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-slate-400">{{ s.label }}</p>
          <p class="mt-1 text-2xl font-black text-slate-900">{{ s.value }}</p>
        </div>
        <div class="absolute -right-4 -bottom-4 opacity-5 transition-opacity group-hover:opacity-10">
          <i :class="`pi ${s.icon} text-8xl`"></i>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
      <div class="relative flex-1">
        <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search Work Order, Item, or Project..." 
          class="h-12 w-full rounded-2xl border-none bg-white pl-12 pr-4 text-sm font-medium shadow-sm ring-1 ring-slate-100 transition-all focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div class="flex items-center gap-3">
        <select v-model="filterWorkCenter" class="h-12 rounded-2xl border-none bg-white px-4 text-sm font-bold shadow-sm ring-1 ring-slate-100 transition-all focus:ring-2 focus:ring-indigo-500 outline-none min-w-[180px]">
          <option value="">All Work Centers</option>
          <option v-for="wc in workCenters" :key="wc" :value="wc">{{ wc }}</option>
        </select>
      </div>
    </div>

    <!-- Kanban Board -->
    <div v-if="viewMode === 'board'" class="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
      <div v-for="col in columns" :key="col.id" class="flex min-w-[320px] flex-1 flex-col gap-6 snap-start">
        <div class="flex items-center justify-between px-2">
          <div class="flex items-center gap-3">
            <span :class="`h-3 w-3 rounded-full ${col.dotColor}`"></span>
            <h3 class="text-sm font-black uppercase tracking-widest text-slate-600">{{ col.label }}</h3>
            <span class="rounded-lg bg-slate-200/50 px-2 py-0.5 text-[10px] font-black text-slate-500">{{ getWoByStatus(col.id).length }}</span>
          </div>
        </div>
        
        <div class="flex flex-col gap-5">
          <div 
            v-for="wo in getWoByStatus(col.id)" 
            :key="wo.id"
            @click="openDetails(wo)"
            class="group relative cursor-pointer rounded-3xl bg-white p-6 border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-1 active:scale-[0.98]"
          >
            <div class="mb-4 flex items-center justify-between">
              <span class="font-mono text-[10px] font-bold tracking-widest text-indigo-600 uppercase">{{ wo.code }}</span>
              <span :class="`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${getPriorityClass(wo.priority)}`">
                <i class="pi pi-exclamation-circle text-[8px]"></i>
                {{ wo.priority || 'Normal' }}
              </span>
            </div>
            
            <h4 class="text-sm font-black text-slate-900 line-clamp-2 leading-tight">{{ wo.finishedGood?.name }}</h4>
            
            <div class="mt-4 flex items-center gap-4 border-t border-slate-50 pt-4">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-[10px] font-bold text-slate-400 italic">Progress</span>
                  <span class="text-[10px] font-black text-slate-900">{{ calculateProgress(wo) }}%</span>
                </div>
                <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
                  <div 
                    class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-700"
                    :style="{ width: calculateProgress(wo) + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <div class="flex -space-x-2">
                <div v-for="n in 3" :key="n" class="h-6 w-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                  <img v-if="n === 1" src="https://ui-avatars.com/api/?name=Op+1&background=6366f1&color=fff" alt="">
                  <img v-else-if="n === 2" src="https://ui-avatars.com/api/?name=Op+2&background=ec4899&color=fff" alt="">
                  <div v-else class="text-[8px] font-bold text-slate-500">+{{ wo.operations?.length || 0 }}</div>
                </div>
              </div>
              <div class="text-[10px] font-bold text-slate-400">
                <i class="pi pi-calendar mr-1"></i>
                {{ fmtDate(wo.plannedStartDate) }}
              </div>
            </div>
            
            <!-- Floating Indicator for Active Timer -->
            <div v-if="isActive(wo)" class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-4 ring-white">
              <i class="pi pi-bolt text-[10px] animate-pulse"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div v-else class="rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-slate-50 border-b border-slate-100">
          <tr>
            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Work Order / Code</th>
            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Finish Good Item</th>
            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Qty Progress</th>
            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Work Centers</th>
            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
            <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="wo in filteredWorkOrders" :key="wo.id" class="group hover:bg-slate-50/50 transition-colors cursor-pointer" @click="openDetails(wo)">
            <td class="px-6 py-5">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-600">
                  <i class="pi pi-box"></i>
                </div>
                <div>
                  <p class="text-sm font-black text-slate-900 leading-none">{{ wo.code }}</p>
                  <p class="mt-1.5 text-[10px] font-bold text-slate-400">{{ fmtDate(wo.plannedStartDate) }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-5">
              <p class="text-sm font-bold text-slate-700 leading-tight">{{ wo.finishedGood?.name }}</p>
            </td>
            <td class="px-6 py-5">
              <div class="flex flex-col items-center gap-1">
                <p class="font-mono text-sm font-black text-slate-900">{{ wo.qtyProduced }} / {{ wo.qtyPlanned }}</p>
                <div class="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                   <div class="h-full bg-indigo-500" :style="{ width: calculateProgress(wo) + '%' }"></div>
                </div>
              </div>
            </td>
            <td class="px-6 py-5">
              <div class="flex flex-wrap gap-1">
                <span v-for="wc in getWcsForWo(wo)" :key="wc" class="rounded-lg bg-slate-100 px-2 py-0.5 text-[9px] font-black uppercase text-slate-500">{{ wc }}</span>
              </div>
            </td>
            <td class="px-6 py-5">
              <span :class="getStatusBadgeClass(wo.status)" class="rounded-xl px-3 py-1 text-[10px] font-black uppercase">
                {{ wo.status }}
              </span>
            </td>
            <td class="px-6 py-5 text-right">
              <button class="rounded-xl border border-slate-200 p-2 text-slate-400 transition-all hover:bg-white hover:text-indigo-600 hover:shadow-md active:scale-95">
                <i class="pi pi-chevron-right"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Details Overlay (Fullscreen-ish Drawer) -->
    <transition name="drawer">
      <div v-if="detailOpen && selectedWo" class="fixed inset-0 z-50 flex justify-end">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="detailOpen = false"></div>
        <div class="relative flex h-full w-full max-w-4xl flex-col bg-white shadow-2xl transition-all overflow-hidden lg:rounded-l-[40px]">
          
          <!-- Drawer Header -->
          <div class="flex items-center justify-between border-b border-slate-100 px-8 py-6">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">
                <i class="pi pi-cog pi-spin-slow"></i>
              </div>
              <div>
                <h2 class="text-lg font-black text-slate-900">{{ selectedWo.code }} <span class="mx-2 text-slate-200">|</span> <span class="text-indigo-600">{{ calculateProgress(selectedWo) }}% Complete</span></h2>
                <p class="text-xs font-bold text-slate-400">{{ selectedWo.finishedGood?.name }}</p>
              </div>
            </div>
            <button @click="detailOpen = false" class="rounded-2xl bg-slate-100 p-3 text-slate-500 transition-all hover:bg-slate-200 active:scale-90">
              <i class="pi pi-times"></i>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-8 scrollbar-hide">
            
            <!-- Quick Actions Bar -->
            <div class="mb-10 flex flex-wrap gap-4">
              <div v-for="st in detailStats" :key="st.label" class="flex-1 min-w-[150px] rounded-3xl border border-slate-100 bg-slate-50/50 p-5">
                <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">{{ st.label }}</p>
                <p class="mt-1 text-xl font-black text-slate-900">{{ st.value }}</p>
              </div>
            </div>

            <!-- Operations View (The Core) -->
            <div class="mb-10 lg:grid lg:grid-cols-1 gap-8">
              <div class="rounded-3xl border border-slate-100 p-6 bg-white shadow-sm">
                <div class="mb-6 flex items-center justify-between">
                  <h3 class="text-sm font-black uppercase tracking-widest text-slate-800">Production Routing</h3>
                  <span class="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black text-emerald-700 uppercase">Live Operations</span>
                </div>

                <div class="space-y-6">
                  <div v-for="(op, idx) in selectedWo.operations" :key="op.id" class="group relative flex flex-col gap-4 rounded-2xl border border-slate-50 bg-[#fafafa] p-5 transition-all hover:bg-white hover:shadow-lg hover:border-indigo-100">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="text-xs font-black text-slate-300">#{{ op.lineNo }}</div>
                        <div>
                          <p class="text-sm font-black text-slate-900">{{ op.description }}</p>
                          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{{ op.workstation || 'General WS' }}</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <span :class="getOpStatusClass(op.status)" class="rounded-lg px-2 py-1 text-[9px] font-black uppercase tracking-wider">
                          {{ op.status }}
                        </span>
                        <div v-if="op.status === 'IN_PROGRESS'" class="flex h-1.5 w-1.5 animate-ping rounded-full bg-indigo-500"></div>
                      </div>
                    </div>

                    <div class="flex flex-wrap items-center justify-between gap-4 mt-2">
                      <div class="flex items-center gap-6">
                        <div>
                          <p class="text-[9px] font-black text-slate-400 uppercase">Completed</p>
                          <p class="font-mono text-sm font-black text-slate-700">{{ op.qtyCompleted }} {{ selectedWo.finishedGood?.uomCode || 'PCS' }}</p>
                        </div>
                        <div v-if="op.actualLaborHours > 0">
                          <p class="text-[9px] font-black text-slate-400 uppercase">Labor Hrs</p>
                          <p class="font-mono text-sm font-black text-slate-700">{{ Number(op.actualLaborHours || 0).toFixed(2) }} h</p>
                        </div>
                      </div>

                      <div class="flex items-center gap-2">
                        <button 
                          v-if="op.status === 'PENDING' || op.status === 'IN_PROGRESS'"
                          @click="toggleOperation(op)"
                          :class="[
                            'h-10 rounded-xl px-5 text-center text-xs font-black uppercase shadow-lg transition-all active:scale-95',
                            isActiveOp(op) ? 'bg-rose-500 text-white shadow-rose-200 hover:bg-rose-600' : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700'
                          ]"
                        >
                          {{ isActiveOp(op) ? 'Stop / Report' : 'Start Process' }}
                        </button>
                        <button 
                          @click="openReportDialog(op)"
                          class="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-all active:scale-95"
                        >
                          <i class="pi pi-chart-bar text-xs"></i>
                        </button>
                      </div>
                    </div>

                    <!-- Visual line connection -->
                    <div v-if="idx < selectedWo.operations.length - 1" class="absolute left-6 -bottom-6 z-0 h-6 w-0.5 bg-slate-100"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Shop Floor Activity Log -->
            <div class="rounded-3xl border border-slate-100 p-6 bg-white overflow-hidden shadow-sm">
              <h3 class="mb-6 text-sm font-black uppercase tracking-widest text-slate-800">Activity Timeline</h3>
              <div class="space-y-6">
                <div v-for="log in selectedWo.shopFloorLogs" :key="log.id" class="flex gap-4">
                  <div class="flex flex-col items-center gap-1">
                    <div :class="getLogIconClass(log.action)" class="flex h-8 w-8 items-center justify-center rounded-xl text-white">
                      <i :class="getLogIcon(log.action)" class="text-[10px]"></i>
                    </div>
                    <div class="h-full w-0.5 bg-slate-50"></div>
                  </div>
                  <div class="pb-6">
                    <div class="flex items-center gap-3">
                      <p class="text-xs font-black text-slate-900">{{ log.operatorName }}</p>
                      <span class="text-[10px] font-bold text-slate-300 italic">{{ fmtDateTime(log.loggedAt) }}</span>
                    </div>
                    <p class="mt-1 text-xs font-medium text-slate-500 leading-relaxed">{{ formatLogMessage(log) }}</p>
                  </div>
                </div>
                <div v-if="!selectedWo.shopFloorLogs?.length" class="py-12 text-center">
                  <i class="pi pi-history text-4xl text-slate-100"></i>
                  <p class="mt-4 text-xs font-bold text-slate-300 italic">No activity recorded yet for this order</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </transition>

    <!-- Report Modal (Mini) -->
    <transition name="modal">
      <div v-if="reportOpen && activeOp" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md" @click="closeReport"></div>
        <div class="relative w-full max-w-lg rounded-[40px] bg-white p-10 shadow-3xl overflow-hidden ring-1 ring-white/10">
          <div class="mb-8 text-center">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
               <i class="pi pi-pencil text-2xl"></i>
            </div>
            <h2 class="text-xl font-black text-slate-900">Operation Report</h2>
            <p class="text-xs font-bold text-slate-400 mt-1 uppercase">{{ activeOp.description }}</p>
          </div>

          <div class="space-y-6">
            <div class="grid grid-cols-3 gap-3">
               <button 
                 v-for="t in [ {id:'GOOD', label:'ACCEPTED', color:'indigo'}, {id:'REJECT', label:'REJECTED', color:'rose'}, {id:'SCRAP', label:'SCRAP', color:'amber'} ]"
                 :key="t.id"
                 @click="reportForm.type = t.id"
                 :class="[
                   'flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all',
                   reportForm.type === t.id 
                    ? `border-${t.color}-500 bg-${t.color}-50 text-${t.color}-600` 
                    : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:bg-slate-50 hover:border-slate-100'
                 ]"
               >
                 <i :class="['pi text-sm', t.id === 'GOOD' ? 'pi-check-circle' : t.id === 'REJECT' ? 'pi-times-circle' : 'pi-trash']"></i>
                 <span class="text-[9px] font-black uppercase tracking-wider">{{ t.label }}</span>
               </button>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quantity Report</label>
              <div class="relative">
                <input 
                  v-model="reportForm.qty"
                  type="number" 
                  class="h-14 w-full rounded-2xl border-none bg-slate-50 px-5 text-center text-xl font-black text-slate-900 shadow-inner focus:bg-white focus:ring-2 focus:ring-indigo-500" 
                  placeholder="0"
                />
                <span class="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase italic">Units</span>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Notes / Reason</label>
              <textarea 
                v-model="reportForm.notes"
                rows="3"
                class="w-full rounded-2xl border-none bg-slate-50 p-4 text-xs font-medium shadow-inner focus:bg-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Observed slight deviation... or reason for rejection"
              ></textarea>
            </div>
          </div>

          <div class="mt-8 flex gap-3">
            <button @click="closeReport" class="flex-1 rounded-2xl bg-slate-100 py-4 text-xs font-black uppercase text-slate-500 hover:bg-slate-200 transition-all">Cancel</button>
            <button 
              @click="submitReport"
              :disabled="!reportForm.qty || reportForm.qty <= 0"
              class="flex-[2] rounded-2xl bg-indigo-600 py-4 text-xs font-black uppercase text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:translate-y-0"
            >
              Confirm Report
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Global Toast -->
    <transition name="toast">
      <div v-if="toastMsg" class="fixed bottom-10 left-1/2 z-[200] -translate-x-1/2 overflow-hidden rounded-2xl bg-slate-900 px-6 py-3.5 text-white shadow-2xl flex items-center gap-3 ring-1 ring-white/20">
        <i class="pi pi-bell text-indigo-400"></i>
        <span class="text-xs font-bold">{{ toastMsg }}</span>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';

const api = useApi();

// View State
const loading = ref(false);
const viewMode = ref('board'); // board | grid
const searchQuery = ref('');
const filterWorkCenter = ref('');
const toastMsg = ref('');

// Data
const workOrders = ref<any[]>([]);
const workCenters = ref<string[]>(['Weighing Area', 'Brewing Station', 'Mixing Line', 'Filling Station', 'QC Lab']);

// Details
const detailOpen = ref(false);
const selectedWo = ref<any>(null);

// Reporting
const reportOpen = ref(false);
const activeOp = ref<any>(null);
const reportForm = reactive({
  qty: 0,
  type: 'GOOD',
  notes: ''
});

// Kanban Columns
const columns = [
  { id: 'RELEASED', label: 'Released', dotColor: 'bg-blue-500' },
  { id: 'IN_PROGRESS', label: 'In Progress', dotColor: 'bg-indigo-500' },
  { id: 'COMPLETED', label: 'Completed', dotColor: 'bg-emerald-500' }
];

// Computed
const stats = computed(() => [
  { label: 'Active Orders', value: workOrders.value.filter(o => o.status === 'IN_PROGRESS').length, icon: 'pi-bolt', color: 'bg-indigo-500' },
  { label: 'Operations Pnd.', value: workOrders.value.reduce((acc, wo) => acc + (wo.operations?.filter((o:any) => o.status === 'PENDING').length || 0), 0), icon: 'pi-clock', color: 'bg-amber-500' },
  { label: 'Completed WOs', value: workOrders.value.filter(o => o.status === 'COMPLETED').length, icon: 'pi-check-circle', color: 'bg-emerald-500' },
  { label: 'Reject Rate', value: '1.2%', icon: 'pi-exclamation-triangle', color: 'bg-rose-500' }
]);

const detailStats = computed(() => {
  if (!selectedWo.value) return [];
  return [
    { label: 'Total Planned', value: `${selectedWo.value.qtyPlanned} ${selectedWo.value.finishedGood?.uomCode || 'PCS'}` },
    { label: 'Total Produced', value: `${selectedWo.value.qtyProduced} ${selectedWo.value.finishedGood?.uomCode || 'PCS'}` },
    { label: 'Materials Issued', value: selectedWo.value.components?.filter((c:any) => Number(c.qtyIssued) > 0).length + '/' + selectedWo.value.components?.length },
    { label: 'Active Timers', value: selectedWo.value.shopFloorTimers?.length || 0 }
  ];
});

const filteredWorkOrders = computed(() => {
  return workOrders.value.filter(wo => {
    const matchesSearch = !searchQuery.value || 
      wo.code?.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      wo.finishedGood?.name?.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesWc = !filterWorkCenter.value || 
      getWcsForWo(wo).includes(filterWorkCenter.value);
      
    return matchesSearch && matchesWc;
  });
});

// Methods
const load = async () => {
  loading.value = true;
  try {
    const res = await api.get('/manufacturing/shop-floor');
    workOrders.value = res.data?.workOrders ?? [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const openDetails = async (wo: any) => {
  try {
    const res = await api.get(`/manufacturing/shop-floor/${wo.id}`);
    selectedWo.value = res.data?.workOrder;
    detailOpen.value = true;
  } catch (e) {
    showToast('Failed to load details');
  }
};

const toggleOperation = async (op: any) => {
  const activeTimer = selectedWo.value.shopFloorTimers?.find((t: any) => t.operationId === op.id);
  
  if (activeTimer) {
    // STOP FLOW (CLOCK OUT)
    activeOp.value = op;
    reportOpen.value = true;
    reportForm.type = 'GOOD';
    reportForm.qty = 0;
  } else {
    // START FLOW (CLOCK IN)
    try {
      await api.post('/manufacturing/shop-floor/start-operation', {
        workOrderId: selectedWo.value.id,
        operationId: op.id
      });
      showToast(`Clocked into ${op.description}`);
      await openDetails(selectedWo.value);
      await load();
    } catch (e: any) {
      showToast(e.response?.data?.message || 'Failed to start');
    }
  }
};

const openReportDialog = (op: any) => {
  activeOp.value = op;
  reportOpen.value = true;
  reportForm.type = 'GOOD';
  reportForm.qty = 0;
};

const closeReport = () => {
  reportOpen.value = false;
  activeOp.value = null;
};

const submitReport = async () => {
  if (!activeOp.value || !selectedWo.value) return;
  
  const activeTimer = selectedWo.value.shopFloorTimers?.find((t: any) => t.operationId === activeOp.value.id);
  
  try {
    if (activeTimer) {
      // It's a stop operation call
      await api.post('/manufacturing/shop-floor/stop-operation', {
        workOrderId: selectedWo.value.id,
        operationId: activeOp.value.id,
        timerId: activeTimer.id,
        qtyCompleted: reportForm.type === 'GOOD' ? Number(reportForm.qty) : 0,
        rejectedQty: reportForm.type === 'REJECT' ? Number(reportForm.qty) : 0,
        scrapQty: reportForm.type === 'SCRAP' ? Number(reportForm.qty) : 0,
        notes: reportForm.notes
      });
    } else {
      // It's a mid-process report call
      await api.post('/manufacturing/shop-floor/report-qty', {
        workOrderId: selectedWo.value.id,
        operationId: activeOp.value.id,
        qty: Number(reportForm.qty),
        type: reportForm.type,
        notes: reportForm.notes
      });
    }
    
    showToast('Progress reported successfully');
    closeReport();
    await openDetails(selectedWo.value);
    await load();
  } catch (e: any) {
    showToast(e.response?.data?.message || 'Report failed');
  }
};

// Utils
const calculateProgress = (wo: any) => {
  if (!wo.qtyPlanned || wo.qtyPlanned === 0) return 0;
  return Math.round((Number(wo.qtyProduced) / Number(wo.qtyPlanned)) * 100);
};

const getWoByStatus = (status: string) => {
  return filteredWorkOrders.value.filter(wo => wo.status === status);
};

const getWcsForWo = (wo: any) => {
  if (!wo.operations) return [];
  return [...new Set(wo.operations.map((o: any) => o.workstation).filter(Boolean))];
};

const isActive = (wo: any) => {
  // Check if any operation has a status and it's currently IN_PROGRESS
  return wo.operations?.some((o: any) => o.status === 'IN_PROGRESS');
};

const isActiveOp = (op: any) => {
  return selectedWo.value?.shopFloorTimers?.some((t: any) => t.operationId === op.id);
};

const showToast = (msg: string) => {
  toastMsg.value = msg;
  setTimeout(() => toastMsg.value = '', 4000);
};

const fmtDate = (v: any) => v ? new Date(v).toLocaleDateString('id-ID', { day:'2-digit', month:'short' }) : '-';
const fmtDateTime = (v: any) => v ? new Date(v).toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' }) : '-';

const getPriorityClass = (p: string) => {
  if (p === 'Urgent' || p === 'High') return 'bg-rose-100 text-rose-700';
  if (p === 'Medium') return 'bg-amber-100 text-amber-700';
  return 'bg-slate-100 text-slate-500';
};

const getStatusBadgeClass = (s: string) => {
  if (s === 'COMPLETED') return 'bg-emerald-100 text-emerald-700';
  if (s === 'IN_PROGRESS') return 'bg-indigo-100 text-indigo-700';
  if (s === 'RELEASED') return 'bg-blue-100 text-blue-700';
  return 'bg-slate-100 text-slate-500';
};

const getOpStatusClass = (s: string) => {
  if (s === 'COMPLETED') return 'bg-emerald-100 text-emerald-700';
  if (s === 'IN_PROGRESS') return 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-100';
  return 'bg-slate-100 text-slate-400';
};

const getLogIconClass = (a: string) => {
  if (a.includes('CLOCK_IN')) return 'bg-indigo-500';
  if (a.includes('CLOCK_OUT')) return 'bg-emerald-500';
  if (a.includes('REJECT')) return 'bg-rose-500';
  return 'bg-slate-400';
};

const getLogIcon = (a: string) => {
  if (a.includes('CLOCK_IN')) return 'pi-sign-in';
  if (a.includes('CLOCK_OUT')) return 'pi-sign-out';
  if (a.includes('REJECT')) return 'pi-times';
  return 'pi-info-circle';
};

const formatLogMessage = (log: any) => {
  if (log.action === 'CLOCK_IN') return `System clock-in for task. Initial status set to IN_PROGRESS.`;
  if (log.action === 'CLOCK_OUT') return `Task completed with ${log.qtyReported} units reported. Time taken: ${log.laborHours?.toFixed(2)} hours.`;
  if (log.action.includes('REPORT_GOOD')) return `Reported ${log.qtyReported} good units.`;
  if (log.action.includes('REPORT_REJECT')) return `Scrapped ${log.qtyReported} units. Audit required.`;
  return log.notes || 'Activity recorded.';
};

onMounted(load);
</script>

<style scoped>
.pi-spin-slow { animation: spin 4s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* Transitions */
.drawer-enter-active, .drawer-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.drawer-enter-from, .drawer-leave-to { transform: translateX(100%); opacity: 0; }

.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }

.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 20px); }

.snap-x { scroll-snap-type: x mandatory; }
.snap-start { scroll-snap-align: start; }
</style>