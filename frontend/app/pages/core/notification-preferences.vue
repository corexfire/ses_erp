<template>
  <div class="p-4 space-y-8 bg-slate-50/50 min-h-screen">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 overflow-hidden relative p-8 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div class="relative">
        <div class="flex items-center gap-3 mb-2">
           <span class="px-3 py-1 bg-indigo-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Core Management</span>
           <span class="text-slate-300">/</span>
           <span class="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Notification Channels</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-tighter">Atur <span class="text-indigo-600">Notifikasi</span></h1>
        <p class="text-slate-500 text-sm font-medium uppercase italic tracking-tight italic">Personalisasi saluran komunikasi untuk setiap aktivitas sistem dan alur kerja approval.</p>
      </div>

      <div class="flex items-center gap-3 relative">
        <Button icon="pi pi-refresh" severity="secondary" rounded outlined @click="load" :loading="loading" />
        <Button label="Simpan Perubahan" icon="pi pi-check" class="p-button-rounded font-black text-xs shadow-lg shadow-indigo-100 px-6" @click="save" :loading="saving" />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="s in stats" :key="s.label" class="group p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <i :class="[s.icon, 'text-6xl']"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
          <h3 class="text-2xl font-black text-slate-900 tracking-tighter">{{ s.value }}</h3>
          <div class="flex items-center gap-2 mt-2">
             <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', s.color]">{{ s.sub }}</span>
          </div>
       </div>
    </div>

    <!-- Preferences categories -->
    <div v-for="cat in categories" :key="cat.name" class="space-y-4">
       <div class="flex items-center gap-3 px-4">
          <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white', cat.theme]">
             <i :class="cat.icon"></i>
          </div>
          <h2 class="text-[13px] font-black text-slate-900 uppercase tracking-[0.2em]">{{ cat.name }}</h2>
       </div>

       <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div v-for="pref in cat.prefs" :key="pref.eventKey" class="group relative p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-lg flex items-center justify-between">
             <div class="space-y-1 pr-4">
                <p class="text-[11px] font-black text-slate-900 uppercase tracking-tight">{{ formatKey(pref.eventKey) }}</p>
                <p class="text-[10px] font-bold text-slate-400 italic">ID: {{ pref.eventKey }}</p>
             </div>
             
             <div class="flex items-center gap-4 shrink-0">
                <div class="flex flex-col items-center gap-2">
                   <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Email</span>
                   <ToggleSwitch v-model="pref.emailEnabled" />
                </div>
                <div class="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                   <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest text-emerald-600">App</span>
                   <ToggleSwitch v-model="pref.inAppEnabled" />
                </div>
                <div class="flex flex-col items-center gap-2">
                   <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest text-indigo-500">WA</span>
                   <ToggleSwitch v-model="pref.whatsappEnabled" />
                </div>
                <div class="flex flex-col items-center gap-2">
                   <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest text-rose-400">SMS</span>
                   <ToggleSwitch v-model="pref.smsEnabled" />
                </div>
             </div>
          </div>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const api = useApi();
const toast = useToast();

const rawPreferences = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);

const stats = computed(() => {
  const activeEvents = rawPreferences.value.filter(p => p.emailEnabled || p.inAppEnabled || p.whatsappEnabled || p.smsEnabled).length;
  const emailTotal = rawPreferences.value.filter(p => p.emailEnabled).length;
  const waTotal = rawPreferences.value.filter(p => p.whatsappEnabled).length;
  const total = rawPreferences.value.length;

  return [
    { label: 'Active Channels', value: activeEvents, sub: 'Request(s)', icon: 'pi pi-bell', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'System Reach', value: emailTotal + waTotal, sub: 'Email & WhatsApp', icon: 'pi pi-send', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Silence Policy', value: total - activeEvents, sub: 'No Notifications', icon: 'pi pi-bell-slash', color: 'bg-slate-50 text-slate-400' },
    { label: 'System Priority', value: 'High', sub: 'Reliability 99.9%', icon: 'pi pi-shield', color: 'bg-blue-50 text-blue-600' }
  ];
});

const categories = computed(() => {
  const cats = [
    { name: 'Workflow & Approval', icon: 'pi pi-sync', theme: 'bg-emerald-600', module: 'workflow' },
    { name: 'Keamanan & Akses', icon: 'pi pi-lock', theme: 'bg-slate-900', module: 'security' },
    { name: 'Operasional Bisnis', icon: 'pi pi-briefcase', theme: 'bg-indigo-600', module: 'operations' },
    { name: 'Lainnya', icon: 'pi pi-ellipsis-h', theme: 'bg-slate-400', module: 'other' }
  ];

  return cats.map(c => ({
    ...c,
    prefs: rawPreferences.value.filter(p => {
       if (c.module === 'other') {
          return !['workflow', 'security', 'procurement', 'inventory', 'sales'].some(m => p.eventKey.startsWith(m));
       }
       if (c.module === 'operations') {
          return ['procurement', 'inventory', 'sales'].some(m => p.eventKey.startsWith(m));
       }
       return p.eventKey.startsWith(c.module);
    })
  })).filter(c => c.prefs.length > 0);
});

async function load() {
  loading.value = true;
  try {
    const res = await api.get('/notifications/preferences');
    rawPreferences.value = res.data.data || [];
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Load Failed', detail: e.message });
  } finally {
    loading.value = false;
  }
}

async function save() {
  saving.value = true;
  try {
    const payload = rawPreferences.value.map(p => ({
        eventKey: p.eventKey,
        emailEnabled: p.emailEnabled,
        inAppEnabled: p.inAppEnabled,
        whatsappEnabled: p.whatsappEnabled,
        smsEnabled: p.smsEnabled
    }));
    await api.put('/notifications/preferences', { items: payload });
    toast.add({ severity: 'success', summary: 'Success', detail: 'Notification preferences saved successfully.' });
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Save Failed', detail: e.message });
  } finally {
    saving.value = false;
  }
}

function formatKey(key: string) {
    const parts = key.split('.');
    const label = parts[parts.length - 1] || key;
    return label.replace(/_/g, ' ');
}

onMounted(load);
</script>

<style scoped>
:deep(.p-toggleswitch) {
    transform: scale(0.85);
}

:deep(.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider) {
    background: #4f46e5;
}

:deep(.p-toast) {
    border-radius: 1.5rem !important;
}
</style>
