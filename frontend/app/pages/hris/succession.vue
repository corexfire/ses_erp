<template>
  <div class="space-y-6 animate-fade-in pb-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <i class="pi pi-briefcase text-indigo-600 bg-indigo-50 p-2 rounded-xl"></i>
          Succession <span class="text-indigo-600">Planning</span>
        </h1>
        <p class="text-slate-500 font-medium mt-1">Identifying future leaders and maintaining bench strength for critical roles.</p>
      </div>
      <div class="flex gap-2">
        <Button label="New Succession Plan" icon="pi pi-plus" class="font-bold text-xs rounded-xl h-11 bg-slate-900 border-none shadow-xl" @click="showCreatePlan = true" />
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in summaryStats" :key="s.label" class="bg-white p-5 rounded-2xl shadow-sm border border-slate-50 flex items-center gap-4">
          <div :class="s.color" class="w-12 h-12 rounded-xl flex items-center justify-center text-xl">
             <i :class="s.icon"></i>
          </div>
          <div>
             <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ s.label }}</div>
             <div class="text-xl font-black text-slate-800">{{ s.value }}</div>
          </div>
       </div>
    </div>

    <!-- Main Content Tabs -->
    <Tabs value="0">
      <TabList class="bg-transparent border-none">
        <Tab value="0" class="font-black text-xs uppercase tracking-widest px-6 py-4">
           <i class="pi pi-th-large mr-2"></i> Talent 9-Box Grid
        </Tab>
        <Tab value="1" class="font-black text-xs uppercase tracking-widest px-6 py-4">
           <i class="pi pi-list mr-2"></i> Succession Pipelines
        </Tab>
      </TabList>
      
      <TabPanels class="bg-transparent p-0 mt-4">
        <!-- 9-Box Grid Panel -->
        <TabPanel value="0">
          <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-50">
             <div class="flex justify-between items-end mb-8">
                <div>
                   <h2 class="text-lg font-black text-slate-800">The Performance-Potential Matrix</h2>
                   <p class="text-xs text-slate-400 font-bold uppercase mt-1">Identifying talent classification and readiness</p>
                </div>
                <div class="flex gap-4 text-[10px] font-black uppercase">
                   <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-indigo-600"></div> Ready Now</div>
                   <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-amber-500"></div> 1-2 Years</div>
                   <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-slate-300"></div> 3+ Years</div>
                </div>
             </div>

             <!-- 9-Box Grid Container -->
             <div class="grid grid-cols-3 grid-rows-3 gap-2 h-[600px] relative border-l-2 border-b-2 border-slate-200">
                <!-- Grid Labels -->
                <div class="absolute -left-12 top-1/2 -rotate-90 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Potential</div>
                <div class="absolute left-1/2 -bottom-8 -translate-x-1/2 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Performance</div>

                <!-- Box 1-9 Rendering -->
                <div v-for="box in nineBoxes" :key="box.id" 
                     :class="box.color"
                     class="relative p-4 rounded-xl border border-slate-100 flex flex-col transition-all hover:shadow-lg group">
                   <div class="text-[9px] font-black uppercase tracking-wider text-slate-500 mb-2 opacity-60 group-hover:opacity-100">{{ box.label }}</div>
                   <div class="flex flex-wrap gap-2 overflow-y-auto">
                      <div v-for="c in candidatesInBox(box.pot, box.perf)" :key="c.id" 
                           v-tooltip="`${c.employee.firstName} - ${c.plan.positionName}`"
                           class="w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] text-white shrink-0 shadow-sm border-2 border-white cursor-pointer hover:scale-110 hover:-rotate-12 transition-all"
                           :class="getReadinessColor(c.readiness)"
                           :style="{ backgroundColor: avatarColor(c.employee.firstName) }">
                         {{ initials(c.employee.firstName) }}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </TabPanel>

        <!-- Pipeline List Panel -->
        <TabPanel value="1">
          <div class="grid grid-cols-1 gap-4">
             <div v-for="plan in plans" :key="plan.id" class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden border-l-4" :class="priorityBorder(plan.priority)">
                <div class="p-4 flex flex-col md:flex-row justify-between gap-4">
                   <div class="flex-1 space-y-4">
                      <div>
                         <div class="flex items-center gap-2 mb-1">
                            <span :class="priorityBadge(plan.priority)" class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">{{ plan.priority }} Priority</span>
                            <span v-if="!plan.incumbentId" class="bg-rose-50 text-rose-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">Vacant Role</span>
                         </div>
                         <h3 class="text-xl font-black text-slate-800 tracking-tight">{{ plan.positionName }}</h3>
                         <p class="text-xs text-slate-400 font-bold uppercase">{{ plan.department }}</p>
                      </div>

                      <div class="flex items-center gap-4 bg-slate-50/50 p-4 rounded-xl">
                         <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-indigo-600">
                             <i class="pi pi-user text-lg text-slate-400"></i>
                         </div>
                         <div>
                            <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current Incumbent</div>
                            <div class="text-sm font-black text-slate-700" v-if="plan.incumbent">
                               {{ plan.incumbent.firstName }} {{ plan.incumbent.lastName }}
                            </div>
                            <div class="text-sm font-bold text-rose-500 italic" v-else>Open / Unfilled</div>
                         </div>
                      </div>
                   </div>

                   <div class="flex-1">
                      <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex justify-between">
                         <span>Successor Pipeline</span>
                         <span>{{ plan.candidates?.length ?? 0 }} Nominees</span>
                      </div>
                      <div class="space-y-2">
                         <div v-for="can in plan.candidates" :key="can.id" class="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-white hover:border-indigo-100 transition-all cursor-pointer">
                            <div class="flex items-center gap-3">
                               <div class="w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] text-white" :style="{ backgroundColor: avatarColor(can.employee.firstName) }">
                                  {{ initials(can.employee.firstName) }}
                               </div>
                               <div>
                                  <div class="text-xs font-black text-slate-800">{{ can.employee.firstName }}</div>
                                  <div class="text-[9px] font-bold text-slate-400 uppercase">{{ can.employee.position }}</div>
                               </div>
                            </div>
                            <span :class="readinessCompactBadge(can.readiness)" class="px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter">{{ can.readiness.replace('_',' ') }}</span>
                         </div>
                         <div v-if="!plan.candidates?.length" class="text-center py-6 text-[10px] font-bold text-slate-400 uppercase italic">No candidates nominated yet.</div>
                         <Button label="Nominate Successor" icon="pi pi-plus-circle" text size="small" class="w-full font-black text-[9px] uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 mt-2" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <!-- Create Plan Dialog -->
    <Dialog v-model:visible="showCreatePlan" modal header="Establish New Key Role Plan" :style="{ width: '450px' }" class="rounded-3xl overflow-hidden p-4 custom-dialog">
       <div class="space-y-6 pt-4">
          <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Position Name</label>
             <input v-model="newPlan.positionName" class="w-full h-12 border-none rounded-2xl px-4 bg-slate-50 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-100" placeholder="e.g. Chief Operating Officer" />
          </div>
          <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organization Unit (Dept)</label>
             <input v-model="newPlan.department" class="w-full h-12 border-none rounded-2xl px-4 bg-slate-50 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-100" placeholder="e.g. Operations" />
          </div>
          <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Criticality / Priority</label>
             <SelectButton v-model="newPlan.priority" :options="['LOW', 'MEDIUM', 'HIGH']" class="rounded-xl overflow-hidden text-[10px] font-black" />
          </div>
          <Button label="Initialize Program" @click="createPlan" :loading="saving" class="w-full h-14 bg-slate-900 border-none font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl mt-4" />
       </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const loading = ref(true);
const plans = ref<any[]>([]);
const stats = ref<any>({});
const showCreatePlan = ref(false);
const saving = ref(false);

const newPlan = reactive({
    positionName: '',
    department: '',
    incumbentId: null,
    priority: 'MEDIUM'
});

const summaryStats = computed(() => [
    { label: 'Key Positions', value: stats.value.totalPlans || 0, icon: 'pi pi-id-card', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Ready Now', value: stats.value.readyNowCount || 0, icon: 'pi pi-bolt', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Vacant Roles', value: stats.value.vacantRoles || 0, icon: 'pi pi-exclamation-circle', color: 'bg-rose-50 text-rose-600' },
    { label: 'Bench Strength', value: (stats.value.averageReadiness || 0) + '%', icon: 'pi pi-users', color: 'bg-blue-50 text-blue-600' }
]);

const nineBoxes = [
    { id: 9, pot: 3, perf: 3, label: '09 - Top Talent (Star)', color: 'bg-emerald-50/50' },
    { id: 8, pot: 3, perf: 2, label: '08 - Rising Star', color: 'bg-indigo-50/30' },
    { id: 7, pot: 3, perf: 1, label: '07 - Future Star', color: 'bg-sky-50/20' },
    
    { id: 6, pot: 2, perf: 3, label: '06 - High Performer', color: 'bg-indigo-50/30' },
    { id: 5, pot: 2, perf: 2, label: '05 - Core Player', color: 'bg-slate-50/50' },
    { id: 4, pot: 2, perf: 1, label: '04 - Enigma', color: 'bg-slate-50/20' },
    
    { id: 3, pot: 1, perf: 3, label: '03 - Expert', color: 'bg-sky-50/20' },
    { id: 2, pot: 1, perf: 2, label: '02 - Inconsistent', color: 'bg-slate-50/20' },
    { id: 1, pot: 1, perf: 1, label: '01 - Risk', color: 'bg-rose-50/30 font-bold text-rose-700' }
];

const candidatesInBox = (pot: number, perf: number) => {
    const list: any[] = [];
    plans.value.forEach(p => {
        p.candidates?.forEach((c: any) => {
            // Mapping 1-5 to 1-3 for 9-box
            const pBox = c.potentialScore >= 5 ? 3 : (c.potentialScore >= 4 ? 2 : 1);
            const rBox = c.performanceScore >= 5 ? 3 : (c.performanceScore >= 4 ? 2 : 1);
            if (pBox === pot && rBox === perf) {
                list.push({ ...c, plan: p });
            }
        });
    });
    return list;
};

const avatarColor = (name: string) => {
  const colors = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899'];
  return colors[name.charCodeAt(0) % colors.length];
};
const initials = (n: string) => n?.[0]?.toUpperCase() ?? '?';

const priorityBadge = (p: string) => ({
    'bg-rose-500 text-white': p === 'HIGH',
    'bg-amber-500 text-white': p === 'MEDIUM',
    'bg-slate-100 text-slate-500': p === 'LOW'
});

const priorityBorder = (p: string) => ({
    'border-l-rose-500': p === 'HIGH',
    'border-l-amber-500': p === 'MEDIUM',
    'border-l-slate-400': p === 'LOW'
});

const getReadinessColor = (r: string) => ({
    'bg-emerald-500 ring-emerald-200': r === 'READY_NOW',
    'bg-amber-500 ring-amber-100': r === 'READY_1_2_YRS',
    'bg-slate-400 ring-slate-100': r === 'READY_3_PLUS_YRS'
});

const readinessCompactBadge = (r: string) => ({
    'bg-emerald-50 text-emerald-600': r === 'READY_NOW',
    'bg-amber-50 text-amber-600': r === 'READY_1_2_YRS',
    'bg-slate-50 text-slate-500': r === 'READY_3_PLUS_YRS'
});

const load = async () => {
  loading.value = true;
  try {
    const [plansRes, statsRes] = await Promise.all([
      api.get('/hris/succession'),
      api.get('/hris/succession/stats')
    ]);
    plans.value = plansRes.data.plans;
    stats.value = statsRes.data;
  } catch (e) {
    console.warn('Succession load failed:', e);
  } finally {
    loading.value = false;
  }
};

const createPlan = async () => {
    saving.value = true;
    try {
        await api.post('/hris/succession', newPlan);
        showCreatePlan.value = false;
        await load();
    } catch (e) {
        console.warn(e);
    } finally {
        saving.value = false;
    }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(.p-tablist-tab-list) {
    background: transparent !important;
}

:deep(.p-tab) {
    border: none !important;
    border-radius: 12px;
    margin-right: 8px;
    transition: all 0.3s;
}

:deep(.p-tab-active) {
    background: #f8fafc !important;
    color: #4f46e5 !important;
}

:deep(.p-selectbutton) {
    border: none;
    background: transparent;
}
</style>
