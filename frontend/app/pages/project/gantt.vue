<template>
  <div class="h-screen flex flex-col -m-6 animate-fade-in overflow-hidden">
    <!-- Gantt Toolbar -->
    <div class="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
      <div class="flex items-center gap-4">
        <div>
          <h1 class="text-xl font-black text-slate-800 tracking-tight">Project <span class="text-indigo-600">Gantt</span> Planner</h1>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ selectedProject?.name || 'Select Project' }}</p>
        </div>
        <div class="h-8 w-px bg-slate-100"></div>
        <Select v-model="selectedProjectId" :options="projects" optionLabel="name" optionValue="id" placeholder="Switch Project" class="w-48 rounded-xl border-none bg-slate-50 font-bold text-xs" @change="loadGantt" />
      </div>

      <div class="flex items-center gap-3">
        <div class="flex bg-slate-100 p-1 rounded-xl mr-4">
           <button @click="showCriticalPath = !showCriticalPath"
                   :class="showCriticalPath ? 'bg-rose-500 text-white shadow-lg' : 'bg-transparent text-slate-400'"
                   class="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
             <i class="pi pi-bolt"></i>
             Critical Path
           </button>
        </div>
        <div class="flex bg-slate-100 p-1 rounded-xl">
           <button v-for="v in ['Day', 'Week', 'Month']" :key="v" 
                   @click="viewMode = v"
                   :class="viewMode === v ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'"
                   class="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
             {{ v }}
           </button>
        </div>
        <Button icon="pi pi-plus" label="Add Task" class="bg-indigo-600 border-none rounded-xl font-black text-xs h-10 px-4" />
      </div>
    </div>

    <!-- Main Gantt Area -->
    <div class="flex-1 flex overflow-hidden">
       <!-- Left Side: Task List -->
       <div class="w-80 border-r border-slate-100 bg-white overflow-y-auto shrink-0 z-10 shadow-xl">
          <div class="sticky top-0 bg-slate-50/80 backdrop-blur-sm h-10 flex items-center px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
             Task Name
          </div>
          <div v-for="task in tasks" :key="task.id" 
               class="h-12 flex items-center px-4 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group">
             <div class="w-4 flex-shrink-0">
                <i v-if="task.childTasks?.length" class="pi pi-chevron-right text-[10px] text-slate-300"></i>
             </div>
             <span class="text-[11px] font-black text-slate-700 truncate group-hover:text-indigo-600">{{ task.taskName }}</span>
          </div>
       </div>

       <!-- Right Side: Timeline SVG -->
       <div class="flex-1 bg-slate-50/50 relative overflow-x-auto overflow-y-auto scroll-smooth" ref="timelineContainer">
          <!-- Timeline Header -->
          <div class="sticky top-0 h-10 bg-white/80 backdrop-blur-sm flex border-b border-slate-100 z-20">
             <div v-for="day in timelineDays" :key="day.getTime()" 
                  class="shrink-0 border-r border-slate-50 flex items-center justify-center text-[9px] font-black text-slate-400 uppercase"
                  :class="isWeekend(day) ? 'bg-slate-50/50' : ''"
                  :style="{ width: colWidth + 'px' }">
                {{ formatDay(day) }}
             </div>
          </div>

          <!-- SVG Layer -->
          <ClientOnly>
            <svg :width="timelineTotalWidth" :height="tasks.length * 48 + 40" class="absolute top-10 left-0">
               <!-- Weekend Backgrounds -->
               <template v-for="(day, idx) in timelineDays" :key="'bg-'+idx">
                  <rect v-if="day && isWeekend(day)"
                        :x="idx * colWidth" y="0" :width="colWidth" height="100%"
                        fill="rgba(241, 245, 249, 0.5)" />
               </template>

               <!-- Horizontal Grid Lines -->
               <line v-for="(_, idx) in tasks" :key="'line-'+idx"
                     x1="0" :y1="idx * 48 + 48" :x2="timelineTotalWidth" :y2="idx * 48 + 48"
                     stroke="#f1f5f9" stroke-width="1" />

               <!-- Task Bars -->
               <g v-for="(task, idx) in tasks" :key="'task-'+task.id" class="group cursor-pointer">
                  <!-- Shadow/Glow on hover -->
                  <rect v-if="taskPosition(task)" :x="taskPosition(task).x" :y="idx * 48 + 12" 
                        :width="taskPosition(task).w" height="24"
                        rx="8" fill="rgba(79, 70, 229, 0.1)" class="opacity-0 group-hover:opacity-100 transition-all" />
                  
                  <!-- Main Bar -->
                  <rect v-if="taskPosition(task)" :x="taskPosition(task).x" :y="idx * 48 + 14" 
                        :width="taskPosition(task).w" height="20"
                        rx="6" :fill="taskColor(task)"
                        :stroke="showCriticalPath && task.isCritical ? '#f43f5e' : 'none'"
                        :stroke-width="showCriticalPath && task.isCritical ? 2 : 0"
                        class="transition-all hover:brightness-110 drop-shadow-sm"
                        v-tooltip="taskTooltip(task)" />
                  
                  <!-- Progress Indicator -->
                  <rect v-if="taskPosition(task)" :x="taskPosition(task).x" :y="idx * 48 + 14" 
                        :width="taskPosition(task).w * (task.actualProgress || 0) / 100" height="20"
                        rx="6" fill="rgba(255,255,255,0.2)" />

                  <!-- Task Label next to bar -->
                  <text v-if="taskPosition(task)" :x="taskPosition(task).x + taskPosition(task).w + 8" :y="idx * 48 + 28" 
                        class="text-[9px] font-black text-slate-400 pointer-events-none uppercase tracking-tighter">
                     {{ Math.round(task.actualProgress || 0) }}%
                  </text>
               </g>

               <!-- Dependency Lines (Arrows) -->
               <template v-for="dep in dependencies" :key="dep.id">
                  <path v-if="dep && generateDependencyPath(dep)"
                        :d="generateDependencyPath(dep)"
                        fill="none" 
                        :stroke="showCriticalPath && isCriticalDependency(dep) ? '#f43f5e' : '#818cf8'" 
                        :stroke-width="showCriticalPath && isCriticalDependency(dep) ? 2 : 1.5" 
                        :marker-end="showCriticalPath && isCriticalDependency(dep) ? 'url(#arrowhead-critical)' : 'url(#arrowhead)'" />
               </template>

               <!-- Marker Defs -->
               <defs>
                 <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                   <polygon points="0 0, 10 3.5, 0 7" fill="#818cf8" />
                 </marker>
                 <marker id="arrowhead-critical" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                   <polygon points="0 0, 10 3.5, 0 7" fill="#f43f5e" />
                 </marker>
               </defs>
            </svg>
          </ClientOnly>
       </div>
    </div>
    
    <!-- Legend Footer -->
    <div class="h-10 bg-white border-t border-slate-100 flex items-center px-8 gap-4 shrink-0">
        <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-indigo-600"></div>
            <span class="text-[9px] font-black text-slate-400 uppercase">Critical Path</span>
        </div>
        <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-sky-400"></div>
            <span class="text-[9px] font-black text-slate-400 uppercase">On Track</span>
        </div>
        <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-rose-500"></div>
            <span class="text-[9px] font-black text-slate-400 uppercase">Overdue</span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const tasks = ref<any[]>([]);
const projects = ref<any[]>([]);
const selectedProjectId = ref<string | null>(null);
const viewMode = ref('Day');
const colWidth = ref(60);
const showCriticalPath = ref(false);

const timelineDays = computed(() => {
    const days = [];
    const start = new Date();
    // Start 30 days ago to see recent history, and show 180 days ahead
    start.setDate(start.getDate() - 30);
    for (let i = 0; i < 180; i++) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        days.push(d);
    }
    return days;
});

const timelineTotalWidth = computed(() => timelineDays.value.length * colWidth.value);
const selectedProject = computed(() => projects.value.find(p => p.id === selectedProjectId.value));

const loadProjects = async () => {
    try {
        const res = await api.get('/project/projects');
        projects.value = res.data.data || [];
        if (projects.value.length > 0) {
            // Priority for premium project
            const premiumPrj = projects.value.find((p: any) => p.code === 'PRJ-2026-MG-001');
            selectedProjectId.value = premiumPrj ? premiumPrj.id : projects.value[0].id;
            await loadGantt();
        }
    } catch (e) { console.error(e); }
};

const loadGantt = async () => {
    if (!selectedProjectId.value) return;
    const res = await api.get(`/project/expansion/${selectedProjectId.value}/gantt`);
    tasks.value = res.data.tasks;
};

const taskPosition = (task: any) => {
    const start = new Date(task.startDate || new Date());
    const end = new Date(task.endDate || new Date());
    const timelineStart = timelineDays.value[0];
    
    const diffStart = (start.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24);
    const diffEnd = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    
    return {
        x: diffStart * colWidth.value,
        w: Math.max(diffEnd * colWidth.value, colWidth.value)
    };
};

const taskColor = (task: any) => {
    if (showCriticalPath.value && task.isCritical) return '#4f46e5'; // Keep Indigo but highlight with stroke
    if (task.actualProgress < 100 && new Date(task.endDate) < new Date()) return '#f43f5e';
    if (task.actualProgress > 80) return '#10b981';
    return '#4f46e5';
};

const taskTooltip = (task: any) => {
    let t = `${task.taskName} (${task.actualProgress}%)\n`;
    t += `Slack: ${task.slack} days`;
    if (task.isCritical) t += ' [CRITICAL]';
    return t;
};

const isCriticalDependency = (dep: any) => {
    if (!dep) return false;
    const from = tasks.value.find(t => t.id === dep.from);
    const to = tasks.value.find(t => t.id === dep.to);
    return !!(from?.isCritical && to?.isCritical);
};

const isWeekend = (d: any) => d && typeof d.getDay === 'function' && (d.getDay() === 0 || d.getDay() === 6);
const formatDay = (d: any) => {
    if (!d || typeof d.getDate !== 'function') return '';
    if (viewMode.value === 'Day') return d.getDate();
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const dependencies = computed(() => {
    const deps: any[] = [];
    tasks.value.forEach(t => {
        t.successorTasks?.forEach((s: any) => {
            deps.push({ id: s.id, from: t.id, to: s.successorId });
        });
    });
    return deps;
});

const generateDependencyPath = (dep: any) => {
    if (!dep || !dep.from || !dep.to) return '';
    const fromIdx = tasks.value.findIndex(t => t.id === dep.from);
    const toIdx = tasks.value.findIndex(t => t.id === dep.to);
    if (fromIdx === -1 || toIdx === -1) return '';

    const fromTask = tasks.value[fromIdx];
    const toTask = tasks.value[toIdx];
    const fromPos = taskPosition(fromTask);
    const toPos = taskPosition(toTask);

    const startX = fromPos.x + fromPos.w;
    const startY = fromIdx * 48 + 24 + 10; // offset from top
    const endX = toPos.x;
    const endY = toIdx * 48 + 24 + 10;

    return `M ${startX} ${startY} L ${startX + 10} ${startY} L ${startX + 10} ${endY} L ${endX} ${endY}`;
};

onMounted(loadProjects);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
