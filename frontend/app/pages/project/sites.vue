<script setup lang="ts">
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { useApi } from '@/composables/useApi';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

const api = useApi();
const toast = useToast();
const confirm = useConfirm();

// --- State ---
const loading = ref(false);
const submitting = ref(false);
const sites = ref<any[]>([]);
const drawerVisible = ref(false);
const activeSite = ref<any>(null);
const activeTab = ref('INFO');

// Master Data
const projects = ref<any[]>([]);
const employees = ref<any[]>([]);

const form = reactive({
  id: null as string | null,
  projectId: '',
  siteCode: '',
  name: '',
  address: '',
  city: '',
  province: '',
  gpsCoords: '',
  contactName: '',
  contactPhone: '',
  status: 'ACTIVE'
});

// --- Helpers ---
const fmtDate = (d: any) => d ? format(new Date(d), 'dd MMM yyyy', { locale: localeId }) : '-';

const getStatusBadge = (s: string) => {
  if (s === 'ACTIVE') return 'bg-emerald-500 text-white';
  if (s === 'COMPLETED') return 'bg-indigo-500 text-white';
  return 'bg-slate-500 text-white';
};

// --- Calculations ---
const totalWorkforce = computed(() => sites.value.length * 15); // Mocked aggregation

const stats = computed(() => [
  { label: 'Workfront Ter-Aktivasi', value: sites.value.length, icon: 'pi pi-map-marker', color: 'indigo', sub: 'Active Sites' },
  { label: 'Agregasi Tenaga Kerja', value: totalWorkforce.value + ' Mandor', icon: 'pi pi-users', color: 'emerald', sub: 'On-Site Aggregate' },
  { label: 'Safety Performance', value: '100%', icon: 'pi pi-shield', color: 'amber', sub: 'No Incidents' },
  { label: 'Site Efficiency', value: '92%', icon: 'pi pi-bolt', color: 'indigo', sub: 'Optimal Resources' }
]);

// --- Actions ---
const fetchData = async () => {
  loading.value = true;
  try {
    const [sitesRes, projectsRes] = await Promise.all([
      api.get('/project/site-master'),
      api.get('/project/projects')
    ]);
    sites.value = sitesRes.data || [];
    projects.value = projectsRes.data?.data || [];
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal memuat data infrastruktur site', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const openNew = () => {
  form.id = null;
  form.projectId = '';
  form.siteCode = `SITE-${Math.floor(100 + Math.random() * 900)}`;
  form.name = '';
  form.address = '';
  form.city = '';
  form.province = '';
  form.gpsCoords = '';
  form.contactName = '';
  form.contactPhone = '';
  form.status = 'ACTIVE';
  drawerVisible.value = true;
};

const viewSite = async (site: any) => {
  loading.value = true;
  try {
    const res = await api.get(`/project/site-master/${site.id}`);
    activeSite.value = res.data;
    Object.assign(form, res.data);
    activeTab.value = 'INFO';
    drawerVisible.value = true;
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal memuat detail site', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const saveSite = async () => {
  if (!form.projectId || !form.name) {
    toast.add({ severity: 'warn', summary: 'Cek Input', detail: 'Proyek dan Nama Site wajib diisi', life: 3000 });
    return;
  }

  submitting.value = true;
  try {
    if (form.id) {
      await api.patch(`/project/site-master/${form.id}`, form);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Data site diperbarui', life: 3000 });
    } else {
      await api.post('/project/site-master', form);
      toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Site baru didaftarkan', life: 3000 });
    }
    fetchData();
    drawerVisible.value = false;
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menyimpan data site', life: 3000 });
  } finally {
    submitting.value = false;
  }
};

const openMaps = (coords: string) => {
  if (!coords) return;
  window.open(`https://www.google.com/maps?q=${coords}`, '_blank');
};

onMounted(fetchData);
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
    <!-- Premium Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative p-12 mb-10 rounded-[3.5rem] bg-indigo-950 border border-white/10 shadow-2xl">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] opacity-20 -mr-64 -mt-64"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500 rounded-full blur-[100px] opacity-10 -ml-32 -mb-32"></div>
      
      <div class="relative flex items-center gap-8">
        <div class="w-24 h-24 rounded-xl bg-white/5 backdrop-blur-3xl flex items-center justify-center shadow-inner border border-white/10 shrink-0 transform rotate-3">
          <i class="pi pi-map-marker text-white text-5xl"></i>
        </div>
        <div>
          <div class="flex items-center gap-3 mb-3">
             <span class="px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-emerald-500/20">Operational Control</span>
             <span class="text-white/20">/</span>
             <span class="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Infrastructure Master</span>
          </div>
          <h1 class="text-6xl font-black text-white tracking-tighter leading-none uppercase">Strategic Site <span class="text-indigo-400">Command</span></h1>
          <p class="text-indigo-200 mt-3 text-sm font-medium tracking-wide opacity-60 italic max-w-xl">Manajemen infrastruktur lapangan dan mobilisasi aset secara terintegrasi di seluruh workfront.</p>
        </div>
      </div>

      <div class="flex items-center gap-4 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="fetchData" :loading="loading" class="border-white/20 text-white hover:bg-white/5 h-14 w-14" />
        <Button label="Registrasi Site Baru" icon="pi pi-plus" class="p-button-rounded bg-white text-indigo-900 border-none font-black text-xs shadow-2xl px-10 py-5 hover:scale-105 transition-transform" @click="openNew" />
      </div>
    </div>

    <!-- Stats Ribbon -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
       <div v-for="s in stats" :key="s.label" class="group p-10 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10 translate-x-4 -translate-y-4">
             <i :class="[s.icon, 'text-9xl', `text-${s.color}-600`]"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-5xl font-black text-slate-900 tracking-tighter">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-4">
             <div :class="['w-2 h-2 rounded-full', `bg-${s.color}-500`]"></div>
             <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Site Intelligence Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
       <div v-for="site in sites" :key="site.id" class="group bg-white rounded-[3.5rem] border border-slate-200 shadow-sm overflow-hidden hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 cursor-pointer" @click="viewSite(site)">
          <div class="p-10 space-y-6">
             <div class="flex items-start justify-between">
                <div>
                   <span class="px-4 py-1.5 bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">{{ site.siteCode }}</span>
                   <h4 class="text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase group-hover:text-indigo-600 transition-colors">{{ site.name }}</h4>
                </div>
                <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg', getStatusBadge(site.status)]">
                   <i class="pi pi-map text-2xl"></i>
                </div>
             </div>

             <div class="space-y-4 pt-4 border-t border-slate-50">
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
                      <i class="pi pi-building text-sm"></i>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Proyek</span>
                      <span class="text-[13px] font-bold text-slate-800 uppercase leading-none mt-1">{{ site.project?.name }}</span>
                   </div>
                </div>
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
                      <i class="pi pi-map-marker text-sm"></i>
                   </div>
                   <div class="flex flex-col flex-1">
                      <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Infrastruktur & Lokasi</span>
                      <span class="text-[11px] font-medium text-slate-500 line-clamp-1 mt-1">{{ site.address || '-' }}, {{ site.city }}</span>
                   </div>
                   <Button icon="pi pi-directions" text rounded severity="secondary" @click.stop="openMaps(site.gpsCoords)" v-if="site.gpsCoords" />
                </div>
             </div>

             <div class="flex items-center justify-between pt-6">
                <div class="flex -space-x-3">
                   <div v-for="i in 3" :key="i" class="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 capitalize">
                      {{ ['Sup', 'HSE', 'Log'][i-1] }}
                   </div>
                </div>
                <div class="flex items-center gap-2">
                   <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{{ site._count.dailyReports }} Reports</span>
                   <i class="pi pi-arrow-right text-indigo-400 group-hover:translate-x-2 transition-transform"></i>
                </div>
             </div>
          </div>
       </div>

       <!-- Empty State Card -->
       <div v-if="sites.length === 0" class="md:col-span-3 py-32 flex flex-col items-center justify-center text-slate-300">
           <i class="pi pi-inbox text-9xl opacity-20 mb-8"></i>
           <p class="text-xl font-black uppercase tracking-[0.2em] text-center">Belum ada infrastruktur site terdaftar</p>
           <Button label="Launch Site Baru" text icon="pi pi-plus" class="mt-4 font-black text-indigo-600 uppercase tracking-widest text-xs" @click="openNew" />
       </div>
    </div>

    <!-- Master Command Drawer -->
    <Drawer v-model:visible="drawerVisible" position="right" class="w-full md:w-[900px]" header="Infrastructure & Strategic Master">
       <div class="flex flex-col h-full bg-slate-50/50">
          <!-- Sidebar Tabs -->
          <div class="flex border-b border-slate-100 bg-white px-10 pt-10">
             <button v-for="t in ['INFO', 'REPORTS', 'ASSETS']" :key="t" @click="activeTab = t"
                :class="['px-8 pb-6 text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-4',
                  activeTab === t ? 'border-indigo-600 text-slate-900 translate-y-[2px]' : 'border-transparent text-slate-400 hover:text-slate-600']">
                {{ t === 'INFO' ? 'Master Specs' : (t === 'REPORTS' ? 'Historical Logs' : 'Site Inventory') }}
             </button>
          </div>

          <div class="flex-1 overflow-y-auto p-12 pr-8 custom-scrollbar pb-32">
             <!-- TAB: INFO -->
             <div v-if="activeTab === 'INFO'" class="space-y-12">
                <div class="space-y-6">
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-2xl bg-indigo-950 flex items-center justify-center text-white text-[10px] font-black shadow-xl shadow-indigo-500/20 shadow-indigo-500/10">01</div>
                      <div>
                         <h4 class="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Primary Identity</h4>
                         <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Penentuan kode aset lapangan dan target proyek.</p>
                      </div>
                   </div>
                   
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <div class="flex flex-col gap-3">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Associated Project <span class="text-rose-500">*</span></label>
                         <Select v-model="form.projectId" :options="projects" optionLabel="name" optionValue="id" filter placeholder="Search Project..." class="w-full rounded-2xl border-slate-100" />
                      </div>
                      <div class="flex flex-col gap-3">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Unique Site Code <span class="text-rose-500">*</span></label>
                         <InputText v-model="form.siteCode" placeholder="SITE-XX" class="w-full rounded-2xl border-slate-100 font-mono font-bold" />
                      </div>
                      <div class="md:col-span-2 flex flex-col gap-3">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Site Designation / Name <span class="text-rose-500">*</span></label>
                         <InputText v-model="form.name" placeholder="e.g. South Zone Construction Front" class="w-full rounded-2xl border-slate-100 font-bold" />
                      </div>
                   </div>
                </div>

                <div class="space-y-6">
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black shadow-xl shadow-indigo-500/10 text-xs">02</div>
                      <div>
                         <h4 class="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Geospatial & Infrastructure</h4>
                         <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Detail alamat fisik dan koordinat navigasi lapangan.</p>
                      </div>
                   </div>
                   
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <div class="md:col-span-2 flex flex-col gap-3">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Full Address</label>
                         <Textarea v-model="form.address" rows="2" placeholder="Street, Industrial Area, etc..." class="w-full rounded-2xl border-slate-100 p-6" />
                      </div>
                      <div class="flex flex-col gap-3">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">City / Regency</label>
                         <InputText v-model="form.city" class="w-full rounded-2xl border-slate-100 h-14" />
                      </div>
                      <div class="flex flex-col gap-3">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">GPS Coordinates (LAT, LON)</label>
                         <div class="flex gap-2">
                           <InputText v-model="form.gpsCoords" placeholder="-6.234, 106.987" class="flex-1 rounded-2xl border-slate-100 font-mono" />
                           <Button icon="pi pi-external-link" severity="secondary" rounded outlined @click="openMaps(form.gpsCoords)" v-if="form.gpsCoords" />
                         </div>
                      </div>
                   </div>
                </div>

                <div class="space-y-6">
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-[10px] font-black shadow-xl shadow-emerald-500/10 text-xs">03</div>
                      <div>
                         <h4 class="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Leadership & Management</h4>
                         <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Penanggung jawab personil dan kontak operasional.</p>
                      </div>
                   </div>
                   
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <div class="flex flex-col gap-3">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Contact Person / Site Manager</label>
                         <InputText v-model="form.contactName" placeholder="Full Name" class="w-full rounded-2xl border-slate-100 h-14" />
                      </div>
                      <div class="flex flex-col gap-3">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Mobile Phone</label>
                         <InputText v-model="form.contactPhone" placeholder="08xxxx" class="w-full rounded-2xl border-slate-100 h-14" />
                      </div>
                   </div>
                </div>
             </div>

             <!-- TAB: REPORTS -->
             <div v-if="activeTab === 'REPORTS'" class="space-y-8">
                <div v-if="activeSite?.dailyReports?.length" class="space-y-4">
                   <div v-for="report in activeSite.dailyReports" :key="report.id" class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-indigo-300 transition-all group">
                      <div class="flex items-center justify-between mb-4">
                         <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-2xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100">
                               <span class="text-[8px] font-black text-slate-400 uppercase">{{ format(new Date(report.reportDate), 'MMM') }}</span>
                               <span class="text-[14px] font-black text-slate-800">{{ format(new Date(report.reportDate), 'dd') }}</span>
                            </div>
                            <div>
                               <h5 class="text-sm font-black text-slate-900 uppercase tracking-tight">{{ report.workSummary || 'Laporan Lapangan' }}</h5>
                               <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ report.status }}</span>
                            </div>
                         </div>
                         <div class="flex items-center gap-2">
                            <span class="text-[11px] font-black text-indigo-600 italic bg-indigo-50 px-3 py-1 rounded-full">{{ report.progressPercent }}%</span>
                         </div>
                      </div>
                      <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{{ report.manpowerSummary }} | {{ report.equipmentSummary }}</p>
                   </div>
                </div>
                <div v-else class="py-20 text-center text-slate-300">
                   <i class="pi pi-calendar-times text-6xl opacity-20 mb-4"></i>
                   <p class="text-[11px] font-black uppercase tracking-widest">Belum ada history laporan untuk site ini.</p>
                </div>
             </div>

             <!-- TAB: ASSETS -->
             <div v-if="activeTab === 'ASSETS'" class="py-20 text-center text-slate-300">
               <i class="pi pi-box text-7xl opacity-20 mb-6"></i>
               <p class="text-[11px] font-black uppercase tracking-widest italic opacity-60">Master Site Inventory Integration Coming Soon...</p>
             </div>
          </div>

          <!-- Bottom Actions -->
          <div class="absolute bottom-0 left-0 w-full bg-white p-10 border-t border-slate-100 flex items-center justify-between rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.06)] z-20">
             <Button icon="pi pi-trash" severity="danger" text rounded @click="drawerVisible = false" v-if="form.id" />
             <div class="flex-1"></div>
             <div class="flex gap-4">
                <Button label="Batalkan" severity="secondary" text @click="drawerVisible = false" class="font-black text-xs uppercase tracking-widest" />
                <Button label="Update Site Infra" icon="pi pi-check-circle" class="p-button-rounded bg-indigo-600 border-none font-black text-xs uppercase tracking-widest px-12 py-5 shadow-2xl shadow-indigo-100" @click="saveSite" :loading="submitting" />
             </div>
          </div>
       </div>
    </Drawer>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

:deep(.p-drawer-content) {
  padding: 0 !important;
}

:deep(.p-inputtext), :deep(.p-select), :deep(.p-textarea) {
  @apply bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-400 focus:ring-0 transition-all !important;
}

:deep(.p-select-panel) {
  @apply rounded-2xl shadow-2xl border-slate-100 p-2;
}

:deep(.p-button.p-button-secondary.p-button-outlined) {
  @apply border-slate-200 text-slate-500 hover:bg-slate-50;
}
</style>
