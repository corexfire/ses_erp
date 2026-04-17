<template>
  <div class="p-6 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Project Intelligence</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Financial Control v4.0</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2">Cost Analysis & <span class="text-blue-600">Control</span></h1>
        <p class="text-slate-500 text-sm font-medium">Real-time budget vs actual performance tracking monitored across all project phases.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <div class="flex flex-col items-end mr-4">
           <span class="text-[10px] font-black text-slate-400 uppercase">Active Project</span>
            <select v-model="projectFilter" class="bg-transparent border-none text-right font-black text-slate-900 focus:ring-0 p-0 cursor-pointer" @change="load">
              <option value="">Consolidated View</option>
              <option v-for="p in projects" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
        </div>
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="New Commitment" icon="pi pi-plus" class="p-button-rounded font-black text-xs shadow-lg shadow-blue-100" @click="openCommitment" v-if="canManage" />
      </div>
    </div>

    <!-- Stats Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <!-- Budget -->
       <div class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-blue-100 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
             <i class="pi pi-briefcase text-6xl"></i>
          </div>
          <div class="flex flex-col gap-4 relative">
             <div class="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                <i class="pi pi-briefcase text-blue-600 font-bold"></i>
             </div>
             <div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Budget</p>
                <h3 class="text-2xl font-black text-slate-900">IDR {{ stats ? fmtMoney(stats.totalBudget) : '0' }}</h3>
             </div>
             <div class="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600" style="width: 100%"></div>
             </div>
          </div>
       </div>

       <!-- Actual -->
       <div class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-amber-100 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
             <i class="pi pi-wallet text-6xl"></i>
          </div>
          <div class="flex flex-col gap-4 relative">
             <div class="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                <i class="pi pi-wallet text-amber-600 font-bold"></i>
             </div>
             <div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Actual Spend</p>
                <h3 class="text-2xl font-black text-slate-800 font-mono tracking-tighter">IDR {{ stats ? fmtMoney(stats.totalActual) : '0' }}</h3>
             </div>
             <div class="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                <div class="h-full bg-amber-500" :style="{ width: stats.percentUsed + '%' }"></div>
             </div>
          </div>
       </div>

       <!-- Committed -->
       <div class="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-indigo-100 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
             <i class="pi pi-file-edit text-6xl"></i>
          </div>
          <div class="flex flex-col gap-4 relative">
             <div class="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <i class="pi pi-file-edit text-indigo-600 font-bold"></i>
             </div>
             <div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Committed PO</p>
                <h3 class="text-2xl font-black text-slate-800">IDR {{ stats ? fmtMoney(stats.totalCommitment) : '0' }}</h3>
             </div>
             <div class="flex items-center gap-2">
                <span class="text-[10px] font-black text-slate-400">{{ ((stats.totalCommitment/stats.totalBudget)*100).toFixed(1) }}% of budget</span>
             </div>
          </div>
       </div>

       <!-- Variance -->
       <div :class="['group p-6 rounded-xl bg-white border shadow-sm transition-all duration-500 hover:shadow-xl relative overflow-hidden', stats.variance < 0 ? 'border-red-100 hover:border-red-200' : 'border-emerald-100 hover:border-emerald-200']">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
             <i class="pi pi-chart-line text-6xl"></i>
          </div>
          <div class="flex flex-col gap-4 relative">
             <div :class="['w-10 h-10 rounded-2xl flex items-center justify-center', stats.variance < 0 ? 'bg-red-50' : 'bg-emerald-50']">
                <i :class="['pi pi-chart-line font-bold', stats.variance < 0 ? 'text-red-600' : 'text-emerald-600']"></i>
             </div>
             <div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Available Funds</p>
                <h3 :class="['text-2xl font-black tracking-tighter', (stats?.variance || 0) < 0 ? 'text-red-700' : 'text-emerald-700']">IDR {{ stats ? fmtMoney(stats.variance) : '0' }}</h3>
             </div>
             <div class="flex items-center gap-1">
                <i :class="['pi text-[10px]', stats.variance < 0 ? 'pi-arrow-down-right text-red-500' : 'pi-arrow-up-right text-emerald-500']"></i>
                <span :class="['text-[10px] font-black', stats.variance < 0 ? 'text-red-500' : 'text-emerald-500']">{{ (100 - stats.percentUsed).toFixed(1) }}% Remaining</span>
             </div>
          </div>
       </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
       <!-- Cost Table -->
       <div class="md:col-span-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
             <div>
                <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-widest">WBS Cost Ledger</h2>
                <p class="text-xs text-slate-500 font-medium">Task-level financial breakdown including roll-ups.</p>
             </div>
             <div class="flex items-center gap-2">
                <span class="p-input-icon-left w-64">
                   <i class="pi pi-search text-slate-400"></i>
                   <InputText v-model="q" placeholder="Quick search tasks..." class="w-full p-inputtext-sm" />
                </span>
             </div>
          </div>

          <DataTable :value="costs" class="p-datatable-sm w-full" :loading="loading" :row-hover="true">
             <Column field="project.name" header="PROJECT" class="pl-8">
                <template #body="{ data }">
                   <span class="text-[10px] font-black text-slate-500 uppercase">{{ data.project?.code }}</span>
                   <div class="text-[11px] font-bold text-slate-900">{{ data.project?.name }}</div>
                </template>
             </Column>
             <Column header="WBS TASK">
                <template #body="{ data }">
                   <div class="flex items-center gap-2">
                      <span class="font-mono text-[10px] font-black text-slate-400">{{ data.wbsTask?.taskCode }}</span>
                      <span class="text-[11px] font-bold text-slate-800">{{ data.wbsTask?.taskName }}</span>
                   </div>
                </template>
             </Column>
             <Column header="CONSUMPTION" class="w-64">
                <template #body="{ data }">
                   <div class="space-y-1">
                      <div class="flex justify-between text-[9px] font-black uppercase tracking-tighter h-[10px]">
                         <span class="text-slate-400">{{ data.percentUsed.toFixed(1) }}%</span>
                         <span :class="data.variance < 0 ? 'text-red-500' : 'text-slate-400'">Limit IDR {{ fmtMoney(data.budget) }}</span>
                      </div>
                      <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div :class="['h-full transition-all duration-700', getBarClass(data.percentUsed)]" :style="{ width: data.percentUsed + '%' }"></div>
                      </div>
                   </div>
                </template>
             </Column>
             <Column header="FINANCIALS" class="text-right">
                <template #body="{ data }">
                   <div class="flex flex-col items-end">
                      <div class="text-[11px] font-black text-slate-800">Actual: {{ fmtMoney(data.actual) }}</div>
                      <div class="text-[10px] font-bold text-amber-600">Committed: {{ fmtMoney(data.commitment) }}</div>
                   </div>
                </template>
             </Column>
             <Column header="STATUS">
                <template #body="{ data }">
                   <span :class="['px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest', getStatusClass(data.status)]">
                      {{ data.status.replace('_', ' ') }}
                   </span>
                </template>
             </Column>
             <Column class="text-right pr-8 w-[100px]">
                <template #body="{ data }">
                   <Button icon="pi pi-external-link" severity="secondary" rounded text @click="openDetail(data)" />
                </template>
             </Column>
          </DataTable>
       </div>
    </div>

    <!-- Draggable Sidebar/Drawer for Details -->
    <Drawer v-model:visible="detailVisible" position="right" class="w-[450px]" header="Cost Detail Analysis">
       <div class="space-y-8 pt-4 px-4" v-if="selectedTask">
          <div class="p-6 rounded-xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
             <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
             <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{{ selectedTask.wbsTask?.taskCode }}</p>
             <h3 class="text-xl font-bold mb-4 leading-tight">{{ selectedTask.wbsTask?.taskName }}</h3>
             <div class="grid grid-cols-2 gap-4">
                <div>
                   <p class="text-[9px] font-black text-slate-500 uppercase">Allocated Budget</p>
                   <p class="text-lg font-black font-mono tracking-tighter italic">IDR {{ fmtMoney(selectedTask.budget) }}</p>
                </div>
                <div>
                   <p class="text-[9px] font-black text-slate-500 uppercase">Total Burn</p>
                   <p class="text-lg font-black font-mono tracking-tighter text-blue-400">IDR {{ fmtMoney(selectedTask.actual + selectedTask.commitment) }}</p>
                </div>
             </div>
          </div>

          <div class="space-y-4">
             <h4 class="text-[10px] font-black text-slate-900 uppercase tracking-widest">Financial Composition</h4>
             <div class="space-y-3">
                <div class="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm" v-for="c in 2" :key="c">
                   <div class="flex items-center gap-4">
                      <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                         <i :class="c === 1 ? 'pi pi-shopping-cart' : 'pi pi-users'"></i>
                      </div>
                      <div>
                         <p class="text-[11px] font-black text-slate-800 uppercase">{{ c === 1 ? 'Purchase Orders' : 'Direct Labor' }}</p>
                         <p class="text-[10px] font-bold text-slate-400 leading-none mt-1">4 Active Documents</p>
                      </div>
                   </div>
                   <div class="text-right">
                      <p class="text-[11px] font-black text-slate-900">IDR {{ fmtMoney(c === 1 ? selectedTask.commitment : selectedTask.actual) }}</p>
                      <p class="text-[9px] font-bold text-emerald-500 uppercase">On Plan</p>
                   </div>
                </div>
             </div>
          </div>

          <div class="p-6 rounded-xl bg-blue-50/50 border border-blue-100 border-dashed">
             <div class="flex items-center gap-3 mb-3">
                <i class="pi pi-shield text-blue-600"></i>
                <h4 class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Variance Forecast</h4>
             </div>
             <p class="text-[11px] text-blue-700 font-medium leading-relaxed">
                Projected available balance is <span class="font-black text-blue-900">IDR {{ fmtMoney(selectedTask.budget - selectedTask.actual - selectedTask.commitment) }}</span> based on current WBS commitments.
             </p>
          </div>
       </div>
    </Drawer>

    <!-- Dialogs -->
    <Dialog v-model:visible="dialogOpen" header="Record New Commitment" class="p-fluid w-full max-w-lg">
      <div class="space-y-6 pt-4 px-2">
         <div class="space-y-2">
           <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project *</label>
           <Select v-model="form.projectId" :options="projects" optionLabel="name" optionValue="id" placeholder="Select Project" class="rounded-xl" @change="loadWbsTasks(form.projectId)" />
         </div>

         <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">WBS Task *</label>
              <Select v-model="form.wbsTaskId" :options="wbsTasks" optionLabel="taskName" optionValue="id" placeholder="Select Task" class="rounded-xl" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category *</label>
              <Select v-model="form.commitmentType" :options="['MATERIAL', 'SUBCONTRACTOR', 'EQUIPMENT', 'LABOR', 'OTHER']" placeholder="Category" class="rounded-xl" />
            </div>
         </div>

         <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Commitment Value (excl. VAT)</label>
            <InputNumber v-model="form.amount" mode="currency" currency="IDR" locale="id-ID" class="p-inputtext-lg" />
         </div>

         <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Description</label>
            <textarea v-model="form.description" class="w-full rounded-2xl border-slate-200 p-4 text-xs font-medium focus:ring-blue-500" rows="3" placeholder="Identify PO, Site Notice or Contract Reference..."></textarea>
         </div>
      </div>
      <template #footer>
        <div class="flex gap-2 justify-end pt-4 border-t p-4 w-full">
           <Button label="Discard" severity="secondary" @click="dialogOpen = false" class="p-button-text font-black text-xs text-slate-400" />
           <Button label="Execute Record" icon="pi pi-check" @click="save" class="p-button-rounded font-black text-xs shadow-lg" :disabled="!form.projectId || !form.amount" />
        </div>
      </template>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const api = useApi()
const auth = useAuthStore()
const toast = useToast()

const canRead = computed(() => auth.hasPermission('project.cost.read'))
const canManage = computed(() => auth.hasPermission('project.cost.manage'))

const q = ref('')
const projectFilter = ref('')
const loading = ref(false)
const dialogOpen = ref(false)
const detailVisible = ref(false)
const costs = ref<any[]>([])
const projects = ref<any[]>([])
const wbsTasks = ref<any[]>([])
const selectedTask = ref<any>(null)

const stats = ref({ totalBudget: 0, totalActual: 0, totalCommitment: 0, variance: 0, percentUsed: 0 })

const form = ref({
  projectId: '',
  wbsTaskId: '',
  commitmentType: 'MATERIAL',
  description: '',
  amount: 0,
})

function fmtMoney(v: number) {
  if (!v) return '0'
  return new Intl.NumberFormat('id-ID').format(v)
}

function getBarClass(percent: number) {
  if (percent > 100) return 'bg-rose-500'
  if (percent > 90) return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
  return 'bg-blue-600'
}

function getStatusClass(status: string) {
  const m: Record<string, string> = {
    ON_BUDGET: 'bg-emerald-50 text-emerald-700',
    AT_RISK: 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse',
    OVER_BUDGET: 'bg-rose-50 text-rose-700 border border-rose-200 shadow-sm shadow-rose-100',
  }
  return m[status] || 'bg-slate-50 text-slate-600'
}

async function load() {
  loading.value = true
  try {
    const { data } = await api.get('/project/costs', { params: { projectId: projectFilter.value } })
    costs.value = (data.data || data).filter((c: any) => 
        !q.value || c.wbsTask?.taskName.toLowerCase().includes(q.value.toLowerCase()) || 
        c.wbsTask?.taskCode.includes(q.value)
    )
    calcStats()
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Sync Failed', detail: e.message })
  } finally {
    loading.value = false
  }
}

async function loadProjects() {
  try {
    const { data } = await api.get('/project/projects')
    projects.value = data.data || data
  } catch (e) {}
}

async function loadWbsTasks(projectId: string) {
  if (!projectId) {
    wbsTasks.value = []
    return
  }
  try {
    const { data } = await api.get(`/project/projects/${projectId}/wbs`)
    wbsTasks.value = data.wbsTasks || []
  } catch (e) {}
}

function calcStats() {
  let totalBudget = 0, totalActual = 0, totalCommitment = 0
  for (const c of costs.value) {
    totalBudget += Number(c.budget || 0)
    totalActual += Number(c.actual || 0)
    totalCommitment += Number(c.commitment || 0)
  }
  const totalCost = totalActual + totalCommitment
  stats.value = {
    totalBudget,
    totalActual,
    totalCommitment,
    variance: totalBudget - totalCost,
    percentUsed: totalBudget > 0 ? (totalCost / totalBudget) * 100 : 0,
  }
}

function openDetail(c: any) {
  selectedTask.value = c
  detailVisible.value = true
}

function openCommitment() {
  form.value = { projectId: '', wbsTaskId: '', commitmentType: 'MATERIAL', description: '', amount: 0 }
  loadProjects()
  dialogOpen.value = true
}

async function save() {
  try {
    await api.post('/project/commitments', form.value)
    toast.add({ severity: 'success', summary: 'Committed', detail: 'Financial obligation record successfully executed.' })
    dialogOpen.value = false
    load()
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Execution Error', detail: e.message })
  }
}

watch(() => q.value, () => load())
watch(() => form.value.projectId, (v) => loadWbsTasks(v))

onMounted(() => {
  loadProjects()
  if (canRead.value) load()
})
</script>

<style scoped>
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
  background: rgba(248, 250, 252, 0.5) !important;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f8fafc !important;
}
</style>
