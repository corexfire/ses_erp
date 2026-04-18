<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
    <!-- Header / Navigation Bar -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-6 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div class="relative flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-100 shrink-0">
          <i class="pi pi-user text-white text-xl"></i>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
             <span class="px-2 py-0.5 bg-indigo-900 text-white text-[9px] font-black uppercase tracking-widest rounded">Personal Workspace</span>
             <span class="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">My Assignments</span>
          </div>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">Tugas <span class="text-indigo-600">Saya</span></h1>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3 relative">
        <div class="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 mr-4">
          <button v-for="v in views" :key="v.id" 
            @click="activeView = v.id"
            :class="['px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all', 
              activeView === v.id ? 'bg-white text-indigo-600 shadow-sm scale-105' : 'text-slate-400 hover:text-slate-600']">
            <i :class="[v.icon, 'mr-2']"></i> {{ v.name }}
          </button>
        </div>
        
        <Button label="Task Baru" icon="pi pi-plus" class="p-button-rounded p-button-indigo font-black text-[10px] uppercase px-6" @click="openCreateDialog" />
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadTasks" :loading="loading" />
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <main class="mx-6 p-2 h-[calc(100vh-200px)] overflow-hidden">
      
      <!-- 1. KANBAN VIEW -->
      <div v-if="activeView === 'kanban'" class="h-full flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
        <div v-for="column in columns" :key="column.status" class="flex-shrink-0 w-80 flex flex-col gap-4">
          <div class="flex items-center justify-between px-2">
            <div class="flex items-center gap-3">
              <div :class="['w-2 h-2 rounded-full', column.color]"></div>
              <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{{ column.name }}</h3>
            </div>
            <span class="px-2 py-0.5 bg-slate-200 text-slate-600 text-[9px] font-black rounded-full">{{ tasksByStatus[column.status]?.length || 0 }}</span>
          </div>

          <draggable
            :list="tasksByStatus[column.status]"
            group="tasks"
            item-key="id"
            class="flex-1 space-y-4 p-2 bg-slate-100/50 rounded-xl border border-dashed border-slate-200 min-h-[200px] overflow-y-auto custom-scrollbar"
            @change="(e) => onDragChange(e, column.status)"
          >
            <template #item="{ element: task }">
              <div @click="editTask(task)" class="group bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing relative overflow-hidden">
                <!-- Priority Badge -->
                <div v-if="task.priority === 'URGENT'" class="absolute -top-1 -right-1 w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center">
                  <i class="pi pi-exclamation-circle text-rose-500 text-[10px] animate-pulse"></i>
                </div>

                <div class="flex flex-col gap-3">
                  <div class="flex justify-between items-start">
                    <span class="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-500 text-[8px] font-black uppercase tracking-widest rounded-lg">
                      {{ task.taskCode }}
                    </span>
                    <div :class="['px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider', getPriorityStyle(task.priority)]">
                      {{ task.priority }}
                    </div>
                  </div>

                  <h4 class="text-xs font-black text-slate-900 leading-snug line-clamp-2 uppercase">
                    {{ task.taskName }}
                  </h4>

                  <p v-if="task.description" class="text-[10px] text-slate-500 line-clamp-2 italic font-medium leading-relaxed">
                    "{{ task.description }}"
                  </p>

                  <div class="flex items-center justify-between pt-3 border-t border-slate-50 mt-1">
                    <div class="flex items-center gap-2">
                       <span class="text-[8px] font-black px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded uppercase tracking-tighter">
                         {{ task.project?.name || 'No Project' }}
                       </span>
                    </div>
                    <div class="flex items-center gap-2 text-slate-400">
                       <i class="pi pi-calendar text-[10px]"></i>
                       <span class="text-[9px] font-bold">{{ formatDate(task.startDate) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <!-- 2. GANTT VIEW -->
      <div v-else-if="activeView === 'gantt'" class="h-full bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
        <div class="flex items-center gap-8 p-6 border-b border-slate-100 bg-slate-50/50">
           <div class="flex items-center gap-3">
              <i class="pi pi-calendar-times text-indigo-600"></i>
              <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Linimasa Tugas Saya</span>
           </div>
           <div class="flex gap-4">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded bg-indigo-600"></div>
                <span class="text-[9px] font-bold uppercase text-slate-500">Tugas</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded bg-emerald-500"></div>
                <span class="text-[9px] font-bold uppercase text-slate-500">Selesai</span>
              </div>
           </div>
        </div>

        <div class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar p-6">
          <div class="min-w-[1200px]">
            <!-- Timeline Header -->
            <div class="grid grid-cols-[250px_1fr] border-b border-slate-200 pb-4">
              <div class="text-[10px] font-black uppercase text-slate-400">Nama Tugas</div>
              <div class="flex justify-between px-4">
                <div v-for="month in months" :key="month" class="text-[10px] font-black uppercase text-slate-400 w-[100px] text-center border-l first:border-0">{{ month }}</div>
              </div>
            </div>

            <!-- Gantt Rows -->
            <div v-for="task in tasks" :key="task.id" class="grid grid-cols-[250px_1fr] border-b border-slate-50 group hover:bg-slate-50/50 transition-all py-3">
              <div class="flex items-center gap-3">
                <div :class="['w-1 h-6 rounded-full', task.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-indigo-300']"></div>
                <div>
                   <p class="text-[10px] font-black text-slate-800 line-clamp-1 truncate w-48 uppercase tracking-tight">{{ task.taskName }}</p>
                   <p class="text-[8px] font-bold text-slate-400">{{ task.project?.name }}</p>
                </div>
              </div>
              <div class="relative h-10 w-full flex items-center">
                 <div :style="getGanttStyle(task)" 
                   :class="['absolute h-6 rounded-lg shadow-sm flex items-center justify-between px-3 group/bar hover:scale-[1.02] transition-all cursor-pointer', 
                    task.status === 'COMPLETED' ? 'bg-emerald-500 shadow-emerald-100' : 'bg-indigo-600 shadow-indigo-100']"
                   @click="editTask(task)">
                    <span class="text-[8px] text-white font-black whitespace-nowrap overflow-hidden opacity-0 group-hover/bar:opacity-100 transition-opacity">
                      {{ calculateDuration(task) }} Hari
                    </span>
                    <i v-if="task.status === 'COMPLETED'" class="pi pi-check-circle text-white text-[10px]"></i>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. GRID VIEW -->
      <div v-else class="h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <DataTable :value="tasks" size="small" scrollable scrollHeight="flex" class="p-4" :loading="loading">
          <Column field="taskCode" header="KODE" class="text-[10px] font-black"></Column>
          <Column field="taskName" header="NAMA TUGAS" class="text-[10px] font-black uppercase">
            <template #body="{ data }">
              <span class="font-bold text-slate-800">{{ data.taskName }}</span>
            </template>
          </Column>
          <Column field="project.name" header="PROJECT" class="text-[10px] font-bold text-slate-500"></Column>
          <Column field="status" header="STATUS">
            <template #body="{ data }">
              <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider', getStatusStyle(data.status)]">
                {{ formatStatus(data.status) }}
              </span>
            </template>
          </Column>
          <Column field="priority" header="PRIORITAS">
            <template #body="{ data }">
              <span :class="['px-2 py-1 rounded-lg text-[8px] font-black uppercase', getPriorityStyle(data.priority)]">
                {{ data.priority }}
              </span>
            </template>
          </Column>
          <Column field="startDate" header="TGL MULAI">
            <template #body="{ data }">
              <span class="text-[10px] font-mono font-bold text-slate-500">{{ formatDate(data.startDate) }}</span>
            </template>
          </Column>
          <Column header="AKSI">
             <template #body="{ data }">
               <div class="flex gap-2">
                  <Button icon="pi pi-pencil" severity="secondary" rounded text @click="editTask(data)" />
                  <Button icon="pi pi-trash" severity="danger" rounded text @click="confirmDelete(data)" />
               </div>
             </template>
          </Column>
        </DataTable>
      </div>

    </main>

    <!-- TASK DIALOG (Reuse same form as kanban) -->
    <Dialog v-model:visible="dialogVisible" :header="editingTask ? 'Edit Tugas' : 'Tugas Baru'" modal class="p-fluid rounded-xl overflow-hidden" :style="{ width: '50rem' }">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 pt-8">
        <div class="space-y-6">
           <div class="field">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Nama Tugas <span class="text-rose-500">*</span></label>
             <InputText v-model="form.taskName" class="p-inputtext-lg rounded-2xl bg-slate-50 border-slate-200" placeholder="Contoh: Analisa Desain..." />
           </div>
           <div class="field">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Kode <span class="text-rose-500">*</span></label>
             <InputText v-model="form.taskCode" class="rounded-2xl bg-slate-50 border-slate-200" placeholder="WBS-001" />
           </div>
           <div class="field">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Deskripsi</label>
             <textarea v-model="form.description" rows="3" class="w-full rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm focus:border-indigo-500 outline-none transition-all" placeholder="Detail pekerjaan..."></textarea>
           </div>
           <div class="grid grid-cols-2 gap-4">
             <div class="field">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Prioritas</label>
                <SelectButton v-model="form.priority" :options="['LOW', 'MEDIUM', 'HIGH', 'URGENT']" class="text-[9px]" />
             </div>
             <div class="field">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Tipe</label>
                <Select v-model="form.taskType" :options="['TASK', 'MILESTONE', 'BUG']" class="rounded-xl bg-slate-50 border-slate-200" />
             </div>
           </div>
        </div>

        <div class="space-y-6">
           <div class="field">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Project <span class="text-rose-500">*</span></label>
             <Select v-model="form.projectId" :options="projects" optionLabel="name" optionValue="id" placeholder="Pilih Project" class="rounded-2xl bg-slate-50 border-slate-200" />
           </div>
           <div class="field">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Assignee</label>
             <InputText :value="authStore.user?.email" disabled class="rounded-2xl bg-slate-100 border-slate-200 text-slate-400" />
             <p class="text-[8px] mt-1 text-slate-400 italic">Otomatis ditugaskan kepada Anda</p>
           </div>
           <div class="grid grid-cols-2 gap-4">
              <div class="field">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Mulai</label>
                <DatePicker v-model="form.startDate" dateFormat="dd/mm/yy" class="rounded-2xl" />
              </div>
              <div class="field">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Selesai</label>
                <DatePicker v-model="form.endDate" dateFormat="dd/mm/yy" class="rounded-2xl" />
              </div>
           </div>
           <div class="field">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Tags (Koma pisah)</label>
              <InputText v-model="form.tags" class="rounded-2xl bg-slate-50 border-slate-200" placeholder="my-tasks, personal" />
           </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3 p-4">
          <Button label="Batal" icon="pi pi-times" text @click="dialogVisible = false" class="text-[10px] uppercase font-black" />
          <Button :label="editingTask ? 'Simpan' : 'Buat'" icon="pi pi-check" @click="saveTask" :loading="saving" class="p-button-indigo rounded-2xl px-8 shadow-xl shadow-indigo-100 text-[10px] uppercase font-black" />
        </div>
      </template>
    </Dialog>

    <!-- ALERT COMPONENT SIMULATION -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { useToast } from 'primevue/usetoast';
import { format, differenceInDays, startOfMonth, addMonths } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import draggable from 'vuedraggable';
import { useAuthStore } from '@/stores/auth';

const api = useApi();
const toast = useToast();
const authStore = useAuthStore();

const tasks = ref<any[]>([]);
const projects = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const activeView = ref('kanban'); // kanban, gantt, grid
const dialogVisible = ref(false);
const editingTask = ref<any>(null);

const views = [
  { id: 'kanban', name: 'Kanban', icon: 'pi pi-th-large' },
  { id: 'gantt', name: 'Gantt', icon: 'pi pi-calendar-times' },
  { id: 'grid', name: 'Grid', icon: 'pi pi-list' }
];

const columns = [
  { status: 'PENDING', name: 'Antrian Bakalog', color: 'bg-slate-400' },
  { status: 'IN_PROGRESS', name: 'Sedang Berjalan', color: 'bg-indigo-500' },
  { status: 'REVIEW', name: 'Tahap Review', color: 'bg-amber-500' },
  { status: 'COMPLETED', name: 'Selesai / Done', color: 'bg-emerald-500' }
];

const form = reactive<any>({
  taskName: '',
  taskCode: '',
  description: '',
  priority: 'MEDIUM',
  taskType: 'TASK',
  projectId: null,
  assigneeId: null,
  startDate: null,
  endDate: null,
  tags: '',
  status: 'PENDING',
  level: 0
});

// Data Loading
async function loadTasks() {
  if (!authStore.user?.id) return;
  
  loading.value = true;
  try {
    const res = await api.get('/project/wbs', {
      params: { 
         assigneeId: authStore.user.id,
         includeProjects: true // Implicitly include relation if backend supports or just ensure it is fetched
      }
    });
    tasks.value = Array.isArray(res.data) ? res.data : (res.data?.data || []);
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal memuat task Anda', life: 3000 });
  } finally {
    loading.value = false;
  }
}

async function loadMasterData() {
  try {
    const prjRes = await api.get('/project/projects');
    projects.value = Array.isArray(prjRes.data) ? prjRes.data : (prjRes.data?.data || []);
  } catch (e) {}
}

const tasksByStatus = computed(() => {
  const groups: any = { PENDING: [], IN_PROGRESS: [], REVIEW: [], COMPLETED: [] };
  if (Array.isArray(tasks.value)) {
    tasks.value.forEach(t => {
      if (groups[t.status]) groups[t.status].push(t);
    });
  }
  return groups;
});

async function onDragChange(event: any, newStatus: string) {
  if (event.added) {
    const task = event.added.element;
    const oldStatus = task.status;
    task.status = newStatus;
    
    try {
      await api.patch(`/project/wbs/${task.id}/status`, { status: newStatus });
      toast.add({ severity: 'success', summary: 'Berhasil', detail: `Status diperbarui`, life: 2000 });
    } catch (e) {
      task.status = oldStatus;
      await loadTasks();
    }
  }
}

// CRUD
function openCreateDialog() {
  editingTask.value = null;
  Object.assign(form, {
    taskName: '',
    taskCode: `MYT-${Date.now().toString().slice(-4)}`,
    projectId: projects.value.length > 0 ? projects.value[0].id : null,
    assigneeId: authStore.user?.id,
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000 * 3),
    priority: 'MEDIUM',
    taskType: 'TASK',
    status: 'PENDING',
    description: '',
    tags: 'my-tasks'
  });
  dialogVisible.value = true;
}

function editTask(task: any) {
  editingTask.value = task;
  Object.assign(form, {
    ...task,
    startDate: task.startDate ? new Date(task.startDate) : null,
    endDate: task.endDate ? new Date(task.endDate) : null
  });
  dialogVisible.value = true;
}

async function saveTask() {
  saving.value = true;
  try {
    const payload = { ...form, assigneeId: authStore.user?.id };
    if (editingTask.value) {
      await api.patch(`/project/wbs/${editingTask.value.id}`, payload);
    } else {
      await api.post('/project/wbs', payload);
    }
    dialogVisible.value = false;
    await loadTasks();
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Data disimpan', life: 3000 });
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal simpan task', life: 3000 });
  } finally {
    saving.value = false;
  }
}

async function confirmDelete(task: any) {
  if (confirm(`Hapus tugas ${task.taskName}?`)) {
    try {
      await api.delete(`/project/wbs/${task.id}`);
      await loadTasks();
    } catch (e) {}
  }
}

// Helpers
function formatStatus(s: string) {
  const map: any = { 'PENDING': 'Backlog', 'IN_PROGRESS': 'In Progress', 'REVIEW': 'Review', 'COMPLETED': 'Done' };
  return map[s] || s;
}

function getStatusStyle(s: string) {
  const map: any = {
    'PENDING': 'bg-slate-100 text-slate-500',
    'IN_PROGRESS': 'bg-indigo-50 text-indigo-600',
    'REVIEW': 'bg-amber-50 text-amber-600',
    'COMPLETED': 'bg-emerald-50 text-emerald-600'
  };
  return map[s] || 'bg-slate-100';
}

function getPriorityStyle(p: string) {
  const map: any = { 'LOW': 'text-slate-400', 'MEDIUM': 'text-blue-500', 'HIGH': 'text-amber-500', 'URGENT': 'text-rose-500 font-bold' };
  return map[p] || '';
}

function formatDate(d: string) {
  if (!d) return '-';
  return format(new Date(d), 'dd/MM/yy', { locale: localeId });
}

// Gantt
const months = computed(() => {
  const start = startOfMonth(new Date());
  return Array.from({ length: 6 }).map((_, i) => format(addMonths(start, i), 'MMMM', { locale: localeId }));
});

function getGanttStyle(task: any) {
  if (!task.startDate || !task.endDate) return { display: 'none' };
  try {
    const start = new Date(task.startDate);
    const end = new Date(task.endDate);
    const ganttStart = startOfMonth(new Date());
    const offsetDays = differenceInDays(start, ganttStart);
    const duration = differenceInDays(end, start) + 1;
    const scale = 3.33;
    return {
      left: `${(offsetDays < 0 ? 0 : offsetDays) * scale}px`,
      width: `${(duration < 1 ? 1 : duration) * scale}px`,
      minWidth: '20px'
    };
  } catch (e) { return { display: 'none' }; }
}

function calculateDuration(task: any) {
  if (!task.startDate || !task.endDate) return 0;
  return differenceInDays(new Date(task.endDate), new Date(task.startDate)) + 1;
}

onMounted(() => {
  loadTasks();
  loadMasterData();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full; }
.p-button-indigo { @apply bg-indigo-600 border-indigo-600 text-white; }
:deep(.p-datatable-header) { @apply bg-transparent border-none; }
:deep(.p-datatable-thead > tr > th) { @apply bg-slate-50/50 text-slate-400 font-black uppercase text-[9px] py-4; }
</style>
