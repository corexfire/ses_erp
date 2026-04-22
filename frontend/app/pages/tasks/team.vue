<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
    <!-- Header / Navigation Bar -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-4 m-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div class="relative flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-100 shrink-0">
          <i class="pi pi-users text-white text-xl"></i>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
             <span class="px-2 py-0.5 bg-indigo-900 text-white text-[9px] font-black uppercase tracking-widest rounded">Team Workspace</span>
             <span class="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Kolaborasi Grup</span>
          </div>
          <div class="flex items-center gap-4">
            <h1 class="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">Team <span class="text-indigo-600">Tasks</span></h1>
            
            <div class="ml-4 flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 min-w-[200px]">
              <i class="pi pi-filter text-[10px] text-slate-400 ml-2"></i>
              <Select v-model="selectedTeamId" :options="myTeams" optionLabel="name" optionValue="id" placeholder="Pilih Tim Anda" @change="loadTasks" class="w-64 border-none shadow-none bg-transparent text-[10px] font-black uppercase" />
            </div>
          </div>
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
        
        <Button label="Task Baru" icon="pi pi-plus" class="p-button-rounded p-button-indigo font-black text-[10px] uppercase px-6" @click="openCreateDialog" :disabled="!selectedTeamId" />
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="loadTasks" :loading="loading" :disabled="!selectedTeamId" />
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <main v-if="selectedTeamId" class="mx-6 p-2 h-[calc(100vh-200px)] overflow-hidden">
      
      <!-- 1. KANBAN VIEW -->
      <div v-if="activeView === 'kanban'" class="h-full flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
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
            @change="onDragChange($event, column.status)"
          >
            <template #item="{ element: task }">
              <div @click="editTask(task)" class="group bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing relative overflow-hidden">
                <div v-if="task.priority === 'URGENT'" class="absolute -top-1 -right-1 w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center">
                  <i class="pi pi-exclamation-circle text-rose-500 text-[10px] animate-pulse"></i>
                </div>

                <div class="flex flex-col gap-3">
                  <div class="flex justify-between items-start">
                    <span class="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-500 text-[8px] font-black uppercase tracking-widest rounded-lg">
                      {{ task.taskCode }}
                    </span>
                    <div :class="['px-2 py-0.5 rounded text-[8px] font-black uppercase', getPriorityStyle(task.priority)]">
                      {{ task.priority }}
                    </div>
                  </div>

                  <h4 class="text-xs font-black text-slate-900 leading-snug uppercase">{{ task.taskName }}</h4>

                  <div class="flex items-center justify-between pt-3 border-t border-slate-50 mt-1">
                    <div class="flex items-center gap-2">
                       <Avatar v-if="task.assignee" :label="getInitials(task.assignee.name)" shape="circle" size="small" class="bg-indigo-100 text-indigo-600 text-[8px] font-black border-2 border-white" />
                       <span class="text-[8px] font-bold text-slate-500 truncate w-24 uppercase tracking-tighter">{{ task.assignee?.name || 'BELUM DITUNJUK' }}</span>
                    </div>
                    <div class="flex items-center gap-1 text-slate-400">
                       <i class="pi pi-calendar text-[10px]"></i>
                       <span class="text-[8px] font-black uppercase">{{ formatDate(task.startDate) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <!-- 2. GANTT VIEW -->
      <div v-else-if="activeView === 'gantt'">
          <!-- Gantt UI (Simplified as in main module) -->
          <div class="h-full bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
            <div class="flex-1 overflow-x-auto p-4 min-h-[400px]">
               <div class="text-[10px] font-black text-slate-400 mb-4 px-4 uppercase tracking-[0.2em] italic">Timeline Kegiatan Tim</div>
               <!-- Simplified Gantt Mock for display as in previous iterations -->
               <div class="space-y-4">
                  <div v-for="task in tasks" :key="task.id" class="grid grid-cols-[200px_1fr] items-center gap-4">
                      <span class="text-[10px] font-bold text-slate-600 truncate">{{ task.taskName }}</span>
                      <div class="relative h-6 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                         <div :style="getGanttStyle(task)" class="absolute h-full bg-indigo-600 rounded-full"></div>
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
          <Column field="taskName" header="NAMA TUGAS" class="text-[10px] font-bold uppercase"></Column>
          <Column field="assignee.name" header="ASSIGNEE" class="text-[10px]"></Column>
          <Column field="status" header="STATUS">
            <template #body="{ data }">
              <span :class="['px-3 py-1 rounded-full text-[9px] font-black uppercase', getStatusStyle(data.status)]">{{ formatStatus(data.status) }}</span>
            </template>
          </Column>
          <Column header="AKSI">
             <template #body="{ data }">
                <Button icon="pi pi-pencil" text rounded severity="secondary" @click="editTask(data)" />
             </template>
          </Column>
        </DataTable>
      </div>

    </main>

    <div v-else class="flex flex-col items-center justify-center h-[calc(100vh-250px)] gap-4 opacity-30 select-none">
       <i class="pi pi-users text-[8rem] text-indigo-100"></i>
       <div class="text-center">
         <p class="text-2xl font-black text-slate-300 uppercase tracking-widest leading-none">Pilih Tim</p>
         <p class="text-sm font-bold text-slate-300 uppercase mt-2">Pilih salah satu tim Anda pada dropdown di atas</p>
       </div>
    </div>

    <!-- TASK DIALOG -->
    <Dialog v-model:visible="dialogVisible" :header="editingTask ? 'Edit Tugas Tim' : 'Tugas Tim Baru'" modal class="p-fluid rounded-xl overflow-hidden" :style="{ width: '50rem' }">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 pt-8">
        <div class="space-y-6">
           <div class="field">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Nama Tugas <span class="text-rose-500">*</span></label>
             <InputText v-model="form.taskName" class="p-inputtext-lg rounded-2xl bg-slate-50" placeholder="Deskripsi tugas.." />
           </div>
           <div class="field">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Kode</label>
             <InputText v-model="form.taskCode" class="rounded-2xl" />
           </div>
           <div class="field">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Project <span class="text-rose-500">*</span></label>
             <Select v-model="form.projectId" :options="projects" optionLabel="name" optionValue="id" placeholder="Asosiasi Project" class="rounded-2xl" />
           </div>
        </div>

        <div class="space-y-6">
           <div class="field">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Penanggung Jawab (Pilihan)</label>
             <Select v-model="form.assigneeId" :options="users" optionLabel="name" optionValue="id" placeholder="Pilih Personel" class="rounded-2xl" />
           </div>
           <div class="field">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Prioritas</label>
             <SelectButton v-model="form.priority" :options="['LOW', 'MEDIUM', 'HIGH', 'URGENT']" />
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
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3 p-4">
          <Button label="Batal" text @click="dialogVisible = false" class="text-[10px] font-black" />
          <Button label="Simpan" icon="pi pi-check" @click="saveTask" :loading="saving" class="p-button-indigo rounded-2xl px-8" />
        </div>
      </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { useToast } from 'primevue/usetoast';
import { format, differenceInDays, startOfMonth } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import draggable from 'vuedraggable';

const api = useApi();
const toast = useToast();

const tasks = ref<any[]>([]);
const myTeams = ref<any[]>([]);
const projects = ref<any[]>([]);
const users = ref<any[]>([]);
const selectedTeamId = ref<string | null>(null);
const loading = ref(false);
const saving = ref(false);
const activeView = ref('kanban');
const dialogVisible = ref(false);
const editingTask = ref<any>(null);

const views = [
  { id: 'kanban', name: 'Kanban', icon: 'pi pi-th-large' },
  { id: 'gantt', name: 'Gantt', icon: 'pi pi-calendar-times' },
  { id: 'grid', name: 'Grid', icon: 'pi pi-list' }
];

const columns = [
  { status: 'PENDING', name: 'Backlog', color: 'bg-slate-400' },
  { status: 'IN_PROGRESS', name: 'Proses', color: 'bg-indigo-500' },
  { status: 'REVIEW', name: 'Review', color: 'bg-amber-500' },
  { status: 'COMPLETED', name: 'Done', color: 'bg-emerald-500' }
];

const form = reactive<any>({
  taskName: '',
  taskCode: '',
  projectId: null,
  assigneeId: null,
  priority: 'MEDIUM',
  startDate: null,
  endDate: null,
  status: 'PENDING'
});

async function loadMyTeams() {
  try {
    const res = await api.get('/hris/team/my');
    myTeams.value = res.data?.data || [];
    if (myTeams.value.length > 0) {
      selectedTeamId.value = myTeams.value[0].id;
      loadTasks();
    }
  } catch (e) {}
}

async function loadTasks() {
  if (!selectedTeamId.value) return;
  loading.value = true;
  try {
    const res = await api.get('/project/wbs', { params: { teamId: selectedTeamId.value } });
    tasks.value = Array.isArray(res.data) ? res.data : (res.data?.data || []);
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal memuat tugas tim', life: 3000 });
  } finally {
    loading.value = false;
  }
}

async function loadMasterData() {
  try {
    const [prjRes, usrRes] = await Promise.all([
      api.get('/project/projects'),
      api.get('/core/users')
    ]);
    projects.value = prjRes.data?.data || [];
    users.value = usrRes.data?.data || [];
  } catch (e) {}
}

const tasksByStatus = computed(() => {
  const groups: any = { PENDING: [], IN_PROGRESS: [], REVIEW: [], COMPLETED: [] };
  if (Array.isArray(tasks.value)) {
    tasks.value.forEach(t => { if (groups[t.status]) groups[t.status].push(t); });
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
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Status tim diperbarui', life: 2000 });
    } catch (e) {
      task.status = oldStatus;
      await loadTasks();
    }
  }
}

function openCreateDialog() {
  editingTask.value = null;
  Object.assign(form, {
    taskName: '',
    taskCode: `TEAM-${Date.now().toString().slice(-4)}`,
    projectId: projects.value.length > 0 ? projects.value[0].id : null,
    assigneeId: null,
    priority: 'MEDIUM',
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000 * 7),
    status: 'PENDING'
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
    const payload = { ...form, teamId: selectedTeamId.value };
    if (editingTask.value) {
      await api.patch(`/project/wbs/${editingTask.value.id}`, payload);
    } else {
      await api.post('/project/wbs', payload);
    }
    dialogVisible.value = false;
    await loadTasks();
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Simpan gagal', life: 3000 });
  } finally {
    saving.value = false;
  }
}

function formatStatus(s: string) {
  const map: any = { 'PENDING': 'Backlog', 'IN_PROGRESS': 'Proses', 'REVIEW': 'Review', 'COMPLETED': 'Selesai' };
  return map[s] || s;
}

function getStatusStyle(s: string) {
  const map: any = { 'PENDING': 'bg-slate-100 text-slate-500', 'IN_PROGRESS': 'bg-indigo-50 text-indigo-600', 'REVIEW': 'bg-amber-50 text-amber-600', 'COMPLETED': 'bg-emerald-50 text-emerald-600' };
  return map[s] || 'bg-slate-100';
}

function getPriorityStyle(p: string) {
  const map: any = { 'LOW': 'text-slate-400', 'MEDIUM': 'text-blue-500', 'HIGH': 'text-amber-500', 'URGENT': 'text-rose-500 font-black tracking-widest' };
  return map[p] || '';
}

function getInitials(name: string) {
  return name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??';
}

function formatDate(d: string) {
  if (!d) return '-';
  return format(new Date(d), 'dd/MM/yy', { locale: localeId });
}

function getGanttStyle(task: any) {
  if (!task.startDate || !task.endDate) return { display: 'none' };
  try {
    const start = new Date(task.startDate);
    const end = new Date(task.endDate);
    const offset = differenceInDays(start, startOfMonth(new Date()));
    const duration = differenceInDays(end, start) + 1;
    return { left: `${(offset < 0 ? 0 : offset) * 3}px`, width: `${duration * 3}px` };
  } catch (e) { return { display: 'none' }; }
}

onMounted(() => {
  loadMyTeams();
  loadMasterData();
});
</script>

<style scoped lang="postcss">
.custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full; }
.p-button-indigo { @apply bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700; }
:deep(.p-select) { @apply bg-transparent; }
</style>
