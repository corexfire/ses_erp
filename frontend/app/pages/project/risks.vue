<template>
  <div class="space-y-6 animate-fade-in pb-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <i class="pi pi-shield text-indigo-600 bg-indigo-50 p-2 rounded-xl"></i>
          Issues <span class="text-indigo-600">& Risks</span>
        </h1>
        <p class="text-slate-500 font-medium mt-1">Proactive contingency management and incident resolution.</p>
      </div>
      <div class="flex gap-2">
        <Button label="Report New Issue" icon="pi pi-plus" class="font-bold text-xs rounded-xl h-11 bg-slate-900 border-none shadow-xl" @click="showReportIssue = true" />
      </div>
    </div>

    <!-- Project Selector -->
    <div class="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex items-center justify-between">
       <div class="flex items-center gap-4">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Project</label>
          <Select v-model="selectedProjectId" :options="projects" optionLabel="name" optionValue="id" placeholder="Select Project" class="w-64 rounded-xl border-slate-100 shadow-sm" @change="loadIssues" />
       </div>
       <div class="flex gap-4">
          <div class="text-center">
             <div class="text-lg font-black text-rose-600">{{ openCriticalIssues }}</div>
             <div class="text-[8px] font-black text-slate-400 uppercase">Critical Risks</div>
          </div>
          <div class="text-center">
             <div class="text-lg font-black text-amber-500">{{ openIssues }}</div>
             <div class="text-[8px] font-black text-slate-400 uppercase">Pending Issues</div>
          </div>
       </div>
    </div>

    <!-- Issues Board -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
       <div v-for="status in ['OPEN', 'IN_PROGRESS', 'RESOLVED']" :key="status" class="space-y-4">
          <div class="flex items-center justify-between px-2">
             <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{{ status.replace('_',' ') }}</h3>
             <span class="bg-slate-100 text-slate-500 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{{ filteredIssues(status).length }}</span>
          </div>

          <div class="bg-slate-50/50 p-3 rounded-2xl min-h-[400px] space-y-3">
             <div v-for="issue in filteredIssues(status)" :key="issue.id" 
                  class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                <div class="flex justify-between items-start mb-2">
                   <span :class="typeBadge(issue.type)" class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">{{ issue.type }}</span>
                   <div class="flex gap-0.5">
                      <div v-for="i in 3" :key="i" class="w-1 h-3 rounded-full" :class="i <= severityLevel(issue.severity) ? severityColor(issue.severity) : 'bg-slate-100'"></div>
                   </div>
                </div>
                <h4 class="text-sm font-black text-slate-800 leading-snug group-hover:text-indigo-600 mb-1">{{ issue.title }}</h4>
                <p class="text-[10px] text-slate-400 font-medium line-clamp-2">{{ issue.description }}</p>
                
                <div class="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                   <div class="flex items-center gap-1.5">
                      <div class="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400">
                         {{ issue.assignee?.name?.[0] || '?' }}
                      </div>
                      <span class="text-[9px] font-bold text-slate-500">{{ issue.assignee?.name || 'Unassigned' }}</span>
                   </div>
                   <span class="text-[8px] font-black text-slate-400 uppercase">{{ timeAgo(issue.createdAt) }}</span>
                </div>
             </div>

             <button v-if="status === 'OPEN'" @click="showReportIssue = true" class="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[9px] font-black text-slate-300 uppercase tracking-widest hover:border-indigo-200 hover:text-indigo-300 transition-all">
                + Report Issue
             </button>
          </div>
       </div>
    </div>

    <!-- Report Issue Dialog -->
    <Dialog v-model:visible="showReportIssue" modal header="Report Project Issue/Risk" :style="{ width: '450px' }" class="rounded-3xl p-4 custom-dialog">
       <div class="space-y-6 pt-4">
          <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</label>
             <input v-model="newIssue.title" class="w-full h-12 border-none rounded-2xl px-4 bg-slate-50 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Summarize the problem" />
          </div>
          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</label>
                <Select v-model="newIssue.type" :options="['ISSUE', 'RISK']" class="w-full rounded-2xl border-none bg-slate-50 font-bold text-sm" />
             </div>
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Severity</label>
                <Select v-model="newIssue.severity" :options="['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']" class="w-full rounded-2xl border-none bg-slate-50 font-bold text-sm" />
             </div>
          </div>
          <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detailed Description</label>
             <Textarea v-model="newIssue.description" rows="3" class="w-full border-none rounded-2xl p-4 bg-slate-50 font-bold text-sm" placeholder="Explain the impact and context..." />
          </div>
          <Button label="Submit Report" @click="submitIssue" :loading="saving" class="w-full h-14 bg-slate-900 border-none font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl" />
       </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const api = useApi();
const projects = ref<any[]>([]);
const selectedProjectId = ref<string | null>(null);
const issues = ref<any[]>([]);
const showReportIssue = ref(false);
const saving = ref(false);

const newIssue = reactive({
    title: '',
    type: 'ISSUE',
    severity: 'MEDIUM',
    description: ''
});

const loadProjects = async () => {
    try {
        const res = await api.get('/project/projects');
        projects.value = res.data.data || [];
        if (projects.value.length > 0) {
            const premiumPrj = projects.value.find((p: any) => p.code === 'PRJ-2026-MG-001');
            selectedProjectId.value = premiumPrj ? premiumPrj.id : projects.value[0].id;
            await loadIssues();
        }
    } catch (e) { console.error(e); }
};

const loadIssues = async () => {
    if (!selectedProjectId.value) return;
    const res = await api.get(`/project/expansion/${selectedProjectId.value}/issues`);
    issues.value = res.data.issues;
};

const filteredIssues = (status: string) => {
    return issues.value.filter(i => i.status === status);
};

const openCriticalIssues = computed(() => {
    return issues.value.filter(i => i.status !== 'RESOLVED' && (i.severity === 'CRITICAL' || i.severity === 'HIGH')).length;
});

const openIssues = computed(() => {
    return issues.value.filter(i => i.status !== 'RESOLVED').length;
});

const typeBadge = (t: string) => ({
    'bg-indigo-50 text-indigo-600': t === 'ISSUE',
    'bg-amber-50 text-amber-600': t === 'RISK'
});

const severityLevel = (s: string) => {
    if (s === 'CRITICAL') return 3;
    if (s === 'HIGH') return 2;
    if (s === 'MEDIUM') return 1;
    return 0;
};

const severityColor = (s: string) => ({
    'bg-rose-500': s === 'CRITICAL' || s === 'HIGH',
    'bg-amber-500': s === 'MEDIUM',
    'bg-slate-300': s === 'LOW'
});

const timeAgo = (date: string) => {
    const hours = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
};

const submitIssue = async () => {
    if (!selectedProjectId.value) return;
    saving.value = true;
    try {
        await api.post(`/project/expansion/${selectedProjectId.value}/issues`, newIssue);
        showReportIssue.value = false;
        await loadIssues();
    } catch (e) { console.error(e); }
    finally { saving.value = false; }
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
</style>
