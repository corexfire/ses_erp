<script setup lang="ts">
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { format, isPast, isToday, isThisWeek, addWeeks, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, addDays, differenceInDays } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

const api = useApi();
const toast = useToast();
const confirm = useConfirm();

// --- State ---
const loading = ref(false);
const submitting = ref(false);
const viewMode = ref<'GRID' | 'KANBAN' | 'GANTT'>('KANBAN');
const tasks = ref<any[]>([]);
const buckets = ref<any>({ OVERDUE: [], TODAY: [], THIS_WEEK: [], FUTURE: [] });
const drawerVisible = ref(false);

const form = ref<any>({
  id: null,
  projectId: '',
  taskCode: '',
  taskName: '',
  description: '',
  priority: 'MEDIUM',
  assigneeId: null,
  teamId: null,
  categoryId: null,
  startDate: '',
  endDate: '',
  status: 'PENDING',
  plannedWeight: 0,
});

// Master Data for Form
const projects = ref([]);
const users = ref([]);
const teams = ref([]);
const categories = ref([]);

// --- Helpers ---
const fmtDate = (d: any) => d ? format(new Date(d), 'dd MMM yyyy', { locale: localeId }) : '-';
const getPriorityBadge = (p: string) => {
  if (p === 'URGENT') return 'bg-rose-500 text-white';
  if (p === 'HIGH') return 'bg-amber-500 text-white';
  return 'bg-blue-500 text-white';
};

// --- Actions ---
const fetchData = async () => {
  loading.value = true;
  try {
    const [deadlinesRes, projectsRes, usersRes, teamsRes, categoriesRes] = await Promise.all([
      api.get('/project/tasks/deadlines'),
      api.get('/project/projects'),
      api.get('/hris/employee'),
      api.get('/hris/team'),
      api.get('/tasks/categories')
    ]);

    buckets.value = deadlinesRes.data?.data || { OVERDUE: [], TODAY: [], THIS_WEEK: [], FUTURE: [] };
    tasks.value = deadlinesRes.data?.all || [];
    
    projects.value = projectsRes.data?.data || [];
    users.value = usersRes.data?.data || [];
    teams.value = teamsRes.data?.data || [];
    categories.value = categoriesRes.data?.data || [];
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal memuat data workspace', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const openNew = () => {
  form.value = { 
    id: null, projectId: '', taskCode: 'TSK-' + Date.now().toString().slice(-4), 
    taskName: '', description: '', priority: 'MEDIUM', 
    assigneeId: null, teamId: null, categoryId: null, 
    startDate: format(new Date(), 'yyyy-MM-dd'), 
    endDate: format(new Date(), 'yyyy-MM-dd'),
    status: 'PENDING', plannedWeight: 0 
  };
  drawerVisible.value = true;
};

const editTask = (task: any) => {
  form.value = { 
    ...task, 
    startDate: task.startDate ? task.startDate.slice(0, 10) : '',
    endDate: task.endDate ? task.endDate.slice(0, 10) : ''
  };
  drawerVisible.value = true;
};

const saveTask = async () => {
  if (!form.value.projectId || !form.value.taskName || !form.value.endDate) {
    toast.add({ severity: 'warn', summary: 'Input Tidak Lengkap', detail: 'Project, Nama, dan Deadline wajib diisi', life: 3000 });
    return;
  }

  submitting.value = true;
  try {
    if (form.value.id) {
      await api.patch(`/project/wbs/${form.value.id}`, form.value);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Task diperbarui', life: 3000 });
    } else {
      await api.post('/project/wbs', form.value);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Task baru dibuat', life: 3000 });
    }
    fetchData();
    drawerVisible.value = false;
  } catch (err: any) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: err.response?.data?.message || 'Operasi gagal', life: 3000 });
  } finally {
    submitting.value = false;
  }
};

// --- Gantt Specific Logic ---
const ganttStart = computed(() => {
  const now = new Date();
  return addDays(now, -7); // Start 7 days ago
});

const ganttEnd = computed(() => {
  return addDays(ganttStart.value, 35); // Show 5 weeks
});

const ganttDays = computed(() => {
  return eachDayOfInterval({
    start: ganttStart.value,
    end: ganttEnd.value
  });
});

const getGanttStyle = (task: any) => {
  if (!task.startDate || !task.endDate) return { display: 'none' };
  
  const start = new Date(task.startDate);
  const end = new Date(task.endDate);
  
  // Calculate relative to ganttStart
  const startOffset = differenceInDays(start, ganttStart.value);
  const duration = differenceInDays(end, start) + 1;
  const dayWidth = 48; // Width in px for each day

  return {
    left: `${Math.max(0, startOffset * dayWidth)}px`,
    width: `${duration * dayWidth}px`,
    backgroundColor: task.status === 'COMPLETED' ? '#10b981' : (task.priority === 'URGENT' ? '#f43f5e' : (task.priority === 'HIGH' ? '#f59e0b' : '#6366f1'))
  };
};

const calculateDuration = (task: any) => {
  if (!task.startDate || !task.endDate) return 0;
  return differenceInDays(new Date(task.endDate), new Date(task.startDate)) + 1;
};

// --- Lifecycle ---
onMounted(fetchData);

// Stats Ribbon
const stats = computed(() => [
  { label: 'Terlambat', value: buckets.value.OVERDUE.length, icon: 'pi pi-exclamation-circle', color: 'rose' },
  { label: 'Deadline Hari Ini', value: buckets.value.TODAY.length, icon: 'pi pi-calendar-plus', color: 'amber' },
  { label: 'Minggu Ini', value: buckets.value.THIS_WEEK.length, icon: 'pi pi-calendar', color: 'indigo' },
]);
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans">
    <!-- Header Section (Work Order Style) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 m-6 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div class="relative flex items-center gap-5">
        <div class="w-16 h-16 rounded-2xl bg-indigo-950 flex items-center justify-center shadow-xl shadow-indigo-100 shrink-0">
          <i class="pi pi-clock text-white text-3xl"></i>
        </div>
        <div>
          <div class="flex items-center gap-3 mb-2">
             <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Task Tracker</span>
             <span class="text-indigo-200">/</span>
             <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Workspace Deadline</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tighter leading-none uppercase">Deadline <span class="text-indigo-600">Control</span></h1>
        </div>
      </div>

      <div class="flex items-center gap-4 relative">
        <div class="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
           <button v-for="v in ['KANBAN', 'GRID', 'GANTT']" :key="v"
             @click="viewMode = v"
             :class="['px-6 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all', 
               viewMode === v ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600']">
             {{ v }}
           </button>
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="fetchData" :loading="loading" class="border-indigo-100 text-indigo-400" />
        <Button label="Buat Task" icon="pi pi-plus" class="p-button-rounded bg-indigo-600 border-none font-black text-xs shadow-xl shadow-indigo-100 px-8 py-3" @click="openNew" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="mx-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
       <div v-for="s in stats" :key="s.label" class="group p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div :class="['absolute top-0 right-0 p-6 opacity-10 transition-opacity translate-x-4 -translate-y-4', `text-${s.color}-600`]">
             <i :class="[s.icon, 'text-8xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-4xl font-black text-slate-900 tracking-tight">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-4">
             <span :class="['text-[10px] font-extrabold px-3 py-1 rounded-full', `bg-${s.color}-50 text-${s.color}-600 border border-${s.color}-100`]">
               Kritis
             </span>
          </div>
       </div>
    </div>

    <!-- MAIN VIEW AREA -->
    <div class="mx-8 mb-12">
      <!-- KANBAN VIEW -->
      <div v-if="viewMode === 'KANBAN'" class="flex gap-8 overflow-x-auto pb-8 snap-x custom-scrollbar">
        <div v-for="(list, key) in buckets" :key="key" class="min-w-[350px] flex flex-col snap-start">
          <div class="flex items-center justify-between px-4 mb-4">
             <div class="flex items-center gap-3">
                <div :class="['w-2 h-8 rounded-full shadow-sm', 
                  key === 'OVERDUE' ? 'bg-rose-500' : key === 'TODAY' ? 'bg-amber-500' : key === 'THIS_WEEK' ? 'bg-indigo-500' : 'bg-slate-300']"></div>
                <h2 class="text-[13px] font-black uppercase tracking-widest text-slate-900">{{ key.replace('_', ' ') }}</h2>
             </div>
             <span class="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">{{ list.length }}</span>
          </div>

          <div class="flex-grow space-y-4 max-h-[calc(100vh-450px)] overflow-y-auto pr-2 custom-scrollbar p-2">
            <div v-for="task in list" :key="task.id" 
              @click="editTask(task)"
              class="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              
              <div class="relative">
                <div class="flex justify-between items-start gap-4 mb-4">
                  <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-50 border border-slate-100 rounded">
                    {{ task.taskCode }}
                  </span>
                  <span :class="['text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider', getPriorityBadge(task.priority)]">
                    {{ task.priority }}
                  </span>
                </div>
                
                <h3 class="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-tight mb-2">
                  {{ task.taskName }}
                </h3>
                
                <div class="flex items-center gap-2 mb-4">
                  <i class="pi pi-folder text-[10px] text-slate-400"></i>
                  <span class="text-[10px] font-bold text-slate-500 italic truncate">{{ task.project?.name }}</span>
                </div>

                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                   <div class="flex items-center gap-2">
                      <Avatar :image="task.assignee?.avatar" :label="task.assignee?.name?.[0]" shape="circle" size="small" class="bg-indigo-100 text-indigo-600 font-bold border-2 border-white shadow-sm" />
                      <span class="text-[10px] font-black text-slate-600">{{ task.assignee?.name || 'Unassigned' }}</span>
                   </div>
                   <div class="flex items-center gap-2">
                      <i class="pi pi-calendar text-[10px]" :class="key === 'OVERDUE' ? 'text-rose-500' : 'text-slate-400'"></i>
                      <span :class="['text-[11px] font-black tracking-tight', key === 'OVERDUE' ? 'text-rose-600' : 'text-slate-900']">{{ format(new Date(task.endDate), 'd MMM') }}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- GRID VIEW -->
      <div v-else-if="viewMode === 'GRID'" class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
         <DataTable :value="tasks" responsive-layout="scroll" class="p-datatable-sm w-full" :loading="loading">
            <template #empty>
              <div class="p-20 text-center text-slate-400 flex flex-col items-center">
                 <i class="pi pi-search text-6xl mb-4 opacity-20"></i>
                 <p class="font-bold">Tidak ada task yang ditemukan.</p>
              </div>
            </template>
            <Column field="taskCode" header="KODE" class="pl-8">
               <template #body="{ data }">
                  <span class="text-[11px] font-black text-slate-800">{{ data.taskCode }}</span>
               </template>
            </Column>
            <Column field="taskName" header="NAMA TUGAS">
               <template #body="{ data }">
                  <div class="flex flex-col">
                     <span class="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{{ data.taskName }}</span>
                     <span class="text-[9px] font-black text-slate-400 italic">{{ data.project?.name }}</span>
                  </div>
               </template>
            </Column>
            <Column header="ASSIGNEE">
               <template #body="{ data }">
                  <div class="flex items-center gap-2">
                     <Avatar :image="data.assignee?.avatar" :label="data.assignee?.name?.[0]" shape="circle" size="small" class="bg-slate-100 text-slate-600 font-bold border border-slate-200" />
                     <span class="text-[11px] font-bold">{{ data.assignee?.name || '-' }}</span>
                  </div>
               </template>
            </Column>
            <Column header="DEADLINE" sortable field="endDate">
               <template #body="{ data }">
                  <div class="flex items-center gap-3">
                     <span v-if="isPast(new Date(data.endDate)) && data.status !== 'COMPLETED'" class="px-2 py-0.5 bg-rose-50 text-rose-600 rounded text-[9px] font-black uppercase">Overdue</span>
                     <span class="text-[11px] font-black font-mono" :class="isPast(new Date(data.endDate)) && data.status !== 'COMPLETED' ? 'text-rose-600' : 'text-slate-800'">{{ fmtDate(data.endDate) }}</span>
                  </div>
               </template>
            </Column>
            <Column header="PRIORITAS">
               <template #body="{ data }">
                  <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', getPriorityBadge(data.priority)]">
                    {{ data.priority }}
                  </span>
               </template>
            </Column>
            <Column header="PROGRES" class="text-right">
               <template #body="{ data }">
                  <div class="flex items-center gap-4 justify-end">
                     <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div class="h-full bg-indigo-600 transition-all rounded-full" :style="{ width: (data.actualProgress || 0) + '%' }"></div>
                     </div>
                     <span class="text-[10px] font-black w-8">{{ data.actualProgress || 0 }}%</span>
                  </div>
               </template>
            </Column>
            <Column class="text-right pr-8">
               <template #body="{ data }">
                  <Button icon="pi pi-pencil" severity="secondary" rounded text @click="editTask(data)" />
               </template>
            </Column>
         </DataTable>
      </div>

      <!-- GANTT VIEW (Rich Implementation) -->
      <div v-else-if="viewMode === 'GANTT'" class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-420px)]">
         <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
            <div>
               <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">Chronological Timeline</h2>
               <p class="text-xs text-slate-500 font-medium">Monitoring durasi dan sekuens pekerjaan.</p>
            </div>
            <div class="flex items-center gap-4">
               <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded bg-indigo-600"></div>
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Planned</span>
               </div>
               <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded bg-emerald-500"></div>
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Done</span>
               </div>
            </div>
         </div>

         <div class="flex-grow overflow-auto custom-scrollbar relative">
            <div class="min-w-max relative">
               <!-- Gantt Header -->
               <div class="sticky top-0 z-20 flex bg-white border-b border-slate-200">
                  <div class="w-64 shrink-0 p-4 border-r border-slate-200 bg-white sticky left-0 z-30">
                     <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">WBS Artifact</span>
                  </div>
                  <div class="flex">
                     <div v-for="day in ganttDays" :key="day.toISOString()" 
                        :class="['w-12 h-14 shrink-0 flex flex-col items-center justify-center border-r border-slate-100 transition-colors', 
                          isToday(day) ? 'bg-indigo-50 border-indigo-200' : '']">
                        <span class="text-[8px] font-black uppercase tracking-tighter" :class="isToday(day) ? 'text-indigo-600' : 'text-slate-400'">{{ format(day, 'EEE') }}</span>
                        <span class="text-[13px] font-black" :class="isToday(day) ? 'text-indigo-900' : 'text-slate-900'">{{ format(day, 'dd') }}</span>
                     </div>
                  </div>
               </div>

               <!-- Gantt Rows -->
               <div class="relative bg-slate-50/5">
                  <div v-for="task in tasks" :key="task.id" class="flex border-b border-slate-100 group">
                     <div class="w-64 shrink-0 p-4 border-r border-slate-200 bg-white sticky left-0 z-10 flex flex-col justify-center">
                        <p class="text-[10px] font-black text-slate-900 uppercase tracking-tight truncate">{{ task.taskName }}</p>
                        <p class="text-[8px] font-bold text-slate-400">{{ task.taskCode }}</p>
                     </div>
                     <div class="flex relative h-16 w-full">
                        <!-- Grid lines -->
                        <div v-for="day in ganttDays" :key="'grid-'+day.toISOString()" 
                           :class="['w-12 shrink-0 border-r border-slate-50', isToday(day) ? 'bg-indigo-50/20' : '']"></div>
                        
                        <!-- Task Bar -->
                        <div v-if="task.startDate && task.endDate" 
                           :style="getGanttStyle(task)"
                           class="absolute top-4 h-8 rounded-xl shadow-lg shadow-indigo-100/20 flex items-center justify-between px-4 transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer group/bar z-1"
                           @click="editTask(task)">
                           <div class="flex flex-col">
                              <span class="text-[8px] text-white/90 font-black uppercase tracking-tighter opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">
                                 {{ calculateDuration(task) }} Hari
                              </span>
                              <span class="text-[9px] text-white font-black truncate max-w-[120px]">{{ task.taskName }}</span>
                           </div>
                           <i v-if="task.status === 'COMPLETED'" class="pi pi-check-circle text-white text-xs"></i>
                        </div>
                     </div>
                  </div>

                  <!-- Today Vertical Marker -->
                  <div class="absolute top-0 bottom-0 pointer-events-none z-10 w-0.5 bg-indigo-500/30" 
                    :style="{ left: `${(differenceInDays(new Date(), ganttStart) * 48) + 256 + 24}px` }">
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>

    <!-- TASK FORM DRAWER (ERP SCALE) -->
    <Drawer v-model:visible="drawerVisible" position="right" class="w-full md:w-[650px]" :header="form.id ? 'Edit Assignment' : 'Penugasan Baru'">
       <div class="p-8 space-y-10 pb-32 overflow-y-auto h-full pr-4 custom-scrollbar">
          <!-- Section 1: Core Context -->
          <div class="space-y-6">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-white text-[10px] font-black">1</div>
                <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Core Assignment Context</h4>
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-50/50 border border-slate-100 rounded-xl">
               <div class="flex flex-col gap-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Parent Project <span class="text-rose-500">*</span></label>
                  <Dropdown v-model="form.projectId" :options="projects" optionLabel="name" optionValue="id" placeholder="Pilih Proyek..." class="w-full rounded-2xl border-slate-200" />
               </div>
               <div class="flex flex-col gap-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">ID Tugas <span class="text-rose-500">*</span></label>
                  <InputText v-model="form.taskCode" placeholder="TSK-001" class="w-full rounded-2xl border-slate-200 font-mono font-bold" />
               </div>
               <div class="md:col-span-2 flex flex-col gap-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Subject / Nama Tugas <span class="text-rose-500">*</span></label>
                  <InputText v-model="form.taskName" placeholder="Contoh: Submit Laporan Kemajuan Phase 1" class="w-full rounded-2xl border-slate-200 text-lg font-black" />
               </div>
             </div>
          </div>

          <!-- Section 2: Planning & Deadline -->
          <div class="space-y-6">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black">2</div>
                <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Timeline & Monitoring</h4>
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-indigo-50/20 border border-indigo-100/30 rounded-xl">
                <div class="flex flex-col gap-2 relative">
                   <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest pl-1">Start Date</label>
                   <InputText v-model="form.startDate" type="date" class="w-full rounded-2xl border-indigo-100 bg-white shadow-sm font-bold" />
                </div>
                <div class="flex flex-col gap-2">
                   <label class="text-[10px] font-black text-rose-400 uppercase tracking-widest pl-1">Hard Deadline <span class="text-rose-500">*</span></label>
                   <InputText v-model="form.endDate" type="date" class="w-full rounded-2xl border-rose-100 bg-white shadow-sm font-bold text-rose-600" />
                </div>
                <div class="flex flex-col gap-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Prioritas Kerja</label>
                   <Dropdown v-model="form.priority" :options="['URGENT', 'HIGH', 'MEDIUM', 'LOW']" placeholder="Pilih..." class="w-full rounded-2xl" />
                </div>
             </div>
          </div>

          <!-- Section 3: Distribution -->
          <div class="space-y-6">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-black">3</div>
                <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Workforce & Ownership</h4>
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-50 border border-slate-100 rounded-xl">
               <div class="flex flex-col gap-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Assignee Persona</label>
                  <Dropdown v-model="form.assigneeId" :options="users" optionLabel="name" optionValue="id" filter placeholder="Cari User..." class="w-full rounded-2xl" />
               </div>
               <div class="flex flex-col gap-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Team Unit</label>
                  <Dropdown v-model="form.teamId" :options="teams" optionLabel="name" optionValue="id" placeholder="Pilih Tim..." class="w-full rounded-2xl" />
               </div>
               <div class="flex flex-col gap-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori Task</label>
                  <Dropdown v-model="form.categoryId" :options="categories" optionLabel="name" optionValue="id" placeholder="Pilih Kategori..." class="w-full rounded-2xl" />
               </div>
             </div>
          </div>

          <!-- Actions -->
          <div class="fixed bottom-0 left-0 w-full bg-white p-8 border-t border-slate-100 flex items-center justify-end gap-3 rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.05)] z-20">
             <Button label="Batalkan" severity="secondary" text @click="drawerVisible = false" class="font-black text-[10px] uppercase" />
             <Button label="Simpan Penugasan" icon="pi pi-check-circle" class="p-button-rounded bg-indigo-600 border-none font-black text-[10px] uppercase px-12 shadow-xl shadow-indigo-100" @click="saveTask" :loading="submitting" />
          </div>
       </div>
    </Drawer>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}

:deep(.p-datatable-thead > tr > th) {
  background: transparent !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: #94a3b8 !important;
  border-bottom: 2px solid #f1f5f9 !important;
  padding: 1.5rem 1rem !important;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.2s ease;
}

:deep(.p-datatable-tbody > tr:hover) {
  @apply bg-indigo-50/30 !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.p-drawer-content) {
  padding: 0 !important;
  overflow: hidden !important;
}

:deep(.p-inputtext), :deep(.p-select) {
  @apply bg-slate-50/50 border-slate-200 focus:bg-white focus:border-indigo-400 transition-all;
}

.snap-x {
  scroll-snap-type: x mandatory;
}
.snap-start {
  scroll-snap-align: start;
}
</style>
