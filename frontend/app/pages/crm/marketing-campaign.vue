<template>
  <div class="space-y-6">
    <!-- Header (Premium Marketing Style) -->
    <div class="rounded-xl bg-white border border-slate-200 p-8 shadow-sm relative overflow-hidden group shrink-0">
      <div class="absolute top-0 right-0 w-64 h-64 bg-fuchsia-50 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:bg-fuchsia-100"></div>
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-6 relative">
        <div class="space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full italic">Campaign Hub</span>
            <span class="text-slate-300">/</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-fuchsia-600">Marketing Intelligence</span>
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Marketing <span class="text-fuchsia-600 italic text-3xl">Campaigns</span></h1>
          <p class="text-slate-500 text-sm font-medium max-w-2xl">Arsitektur rencana pemasaran terintegrasi — mulai dari alokasi budget iklan digital hingga manajemen event fisik untuk akselerasi akuisisi pelanggan.</p>
        </div>
        <div class="flex items-center gap-3">
          <Button label="Blueprint New Campaign" size="small" icon="pi pi-plus" class="p-button-rounded h-12 px-8 bg-fuchsia-600 border-none text-white font-black text-[10px] uppercase shadow-xl shadow-fuchsia-100 hover:scale-105 active:scale-95 transition-all" :disabled="loading || !canCreate" @click="openCreate" />
        </div>
      </div>
    </div>

    <!-- Alert / Notif -->
    <div v-if="success" class="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-check-circle text-lg"></i> {{ success }}
    </div>
    <div v-if="error" class="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-bold flex items-center gap-2 animate-fade-in-up">
      <i class="pi pi-exclamation-triangle text-lg"></i> {{ error }}
    </div>

    <!-- High-Contrast KPI Banners (Premium style) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
       <!-- Primary engagement banner -->
      <div class="p-6 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between border border-slate-800 transition-all hover:bg-slate-950 group">
        <div class="text-[10px] font-black uppercase text-fuchsia-400 tracking-[0.2em] mb-4 opacity-80">Total Alocation</div>
        <div class="flex items-end justify-between">
          <h3 class="text-3xl font-black text-white tracking-tighter">{{ fmtRp(totalBudget) }}</h3>
          <div class="p-3 bg-slate-700 rounded-xl text-slate-100 shadow-lg group-hover:rotate-12 transition-transform">
            <i class="pi pi-wallet text-lg"></i>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Strategic Planned</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-slate-800 tracking-tighter">{{ countStatus('PLANNED') }}</h3>
          <div class="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100"><i class="pi pi-calendar text-lg"></i></div>
        </div>
      </div>
      
      <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-fuchsia-600 tracking-[0.2em] mb-4">Live Activation</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-fuchsia-700 tracking-tighter">{{ countStatus('ACTIVE') }}</h3>
          <div class="p-3 bg-fuchsia-50 text-fuchsia-600 rounded-xl border border-fuchsia-100"><i class="pi pi-bolt text-lg"></i></div>
        </div>
      </div>

       <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] mb-4">Completed Cycles</div>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-emerald-600 tracking-tighter">{{ countStatus('COMPLETED') }}</h3>
          <div class="p-3 bg-emerald-50 text-emerald-500 rounded-xl border border-emerald-100"><i class="pi pi-flag text-lg"></i></div>
        </div>
      </div>
    </div>

    <!-- Modern Filters (Premium style) -->
    <div class="bg-fuchsia-50/50 p-1.5 rounded-3xl border border-fuchsia-100 flex flex-wrap items-center gap-2 animate-fade-in-up">
      <div class="bg-white p-1 rounded-[1.5rem] border border-slate-200 flex flex-1 items-center shadow-sm min-w-[280px]">
        <i class="pi pi-search px-4 text-slate-400 text-xs"></i>
        <InputText v-model="q" placeholder="Cari Code, Title, or Channel..." class="flex-1 h-10 border-none bg-transparent text-xs font-black uppercase tracking-widest outline-none shadow-none focus:ring-0" @keyup.enter="load" />
        <Button icon="pi pi-refresh" severity="secondary" rounded text @click="load" :loading="loading" class="h-10 w-10 text-slate-400 hover:text-fuchsia-600 transition-all shrink-0" />
      </div>

      <div class="flex bg-white/60 p-1 rounded-2xl border border-fuchsia-100 gap-1 ml-auto">
        <button v-for="s in ['ACTIVE','PLANNED','ALL']" :key="s"
          @click="statusFilter = s"
          :class="statusFilter === s ? 'bg-fuchsia-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:bg-white hover:shadow-sm'"
          class="px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300">
          {{ s }}
        </button>
      </div>
    </div>

    <!-- TABLE (Premium Modern Style) -->
    <div class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-fade-in-up">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80 text-left">
          <tr>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Campaign Blueprint</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Placement Strategy</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-44">Allocated Budget</th>
            <th class="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-44">Current Lifestyle</th>
            <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-32">Interaction</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-if="loading">
            <td colspan="5" class="py-24 text-center">
              <i class="pi pi-spinner pi-spin text-4xl text-fuchsia-600 opacity-20"></i>
              <div class="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-fuchsia-600">Calculating intelligence...</div>
            </td>
          </tr>
          
          <tr v-for="c in filteredList" v-else :key="c.id" class="transition-all hover:bg-slate-50/5 group border-l-4" :style="{ borderLeftColor: typeStyle(c.status).bg }">
            <td class="px-8 py-6 align-middle">
               <div class="flex flex-col gap-2">
                  <div class="font-black text-slate-900 text-[14px] tracking-tight leading-tight uppercase group-hover:text-fuchsia-700 transition-colors">{{ c.name?.toLowerCase() }}</div>
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-[10px] font-black text-fuchsia-600 bg-fuchsia-50 px-2.5 py-1 rounded-lg border border-fuchsia-100">
                      {{ c.code }}
                    </span>
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest"><i class="pi pi-clock text-[8px] mr-1"></i> Due: {{ c.endDate ? formatDate(c.endDate) : 'Indefinite' }}</span>
                  </div>
               </div>
            </td>
            
            <td class="px-6 py-6 align-middle border-l border-slate-50/50">
                <div class="flex flex-col gap-2">
                  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm self-start">
                    <i class="pi pr-1" :class="getChannelIcon(c.channel)"></i> {{ c.channel || 'GENERAL' }}
                  </div>
                  <div v-if="c.notes" class="text-[10px] font-medium text-slate-400 italic line-clamp-1 max-w-[200px] lowercase">{{ c.notes }}</div>
                </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-right">
              <div class="text-lg font-black font-mono tracking-tighter" :class="c.budget ? 'text-emerald-600' : 'text-slate-300'">
                {{ fmtRp(c.budget || 0) }}
              </div>
            </td>

            <td class="px-6 py-6 align-middle border-l border-slate-50/50 text-center">
               <div class="relative inline-block w-full max-w-[140px]">
                  <select v-model="statusSelection[c.id]"
                    class="w-full h-10 rounded-2xl appearance-none text-center text-[10px] font-black uppercase tracking-widest outline-none transition-all cursor-pointer border shadow-sm px-4"
                    :disabled="!canUpdate"
                    :style="typeStyle(statusSelection[c.id])"
                    @change="updateStatus(c)">
                    <option value="PLANNED" class="bg-white text-slate-800">PLANNED</option>
                    <option value="ACTIVE" class="bg-white text-slate-800">ACTIVE</option>
                    <option value="COMPLETED" class="bg-white text-slate-800">COMPLETED</option>
                    <option value="CANCELED" class="bg-white text-slate-800">CANCELED</option>
                  </select>
                  <i class="pi pi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none opacity-50"></i>
               </div>
            </td>

             <td class="px-8 py-6 align-middle border-l border-slate-50/50 text-right">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                <Button icon="pi pi-pencil" v-tooltip="'Modify Blueprint'" size="small" class="p-button-rounded h-10 w-10 bg-slate-900 border-none text-white shadow-lg hover:scale-110 active:scale-95 transition-all" @click="openEdit(c)" />
              </div>
            </td>
          </tr>

          <tr v-if="!loading && filteredList.length === 0">
            <td colspan="5" class="py-32 text-center text-slate-400 italic text-sm font-medium">
               <i class="pi pi-megaphone text-5xl mb-4 block opacity-10"></i>
               <div class="text-[10px] font-black uppercase tracking-[0.2em]">Silence in the campaign stream.</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dialog Form (Universal Centered Style) -->
    <div v-if="dialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all">
      <div class="w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in rounded-[2.5rem] border-4 border-white">
        <!-- Dialog Header -->
        <div class="p-10 border-b bg-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-fuchsia-50 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700"></div>
          <div class="relative flex items-center gap-5">
            <div class="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-xl rotate-3 transition-transform hover:rotate-0">
               <i class="pi pi-megaphone text-3xl animate-pulse text-fuchsia-400"></i>
            </div>
            <div>
              <h3 class="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">{{ editingId ? 'Optimize' : 'Blueprint' }} <span class="text-fuchsia-600 italic">Campaign</span></h3>
              <p class="text-[10px] font-black text-fuchsia-600 uppercase tracking-[0.2em] mt-2 px-1 border-l-2 border-fuchsia-500">Marketing Acquisition Hub Provisioning</p>
            </div>
          </div>
          <Button icon="pi pi-times" severity="secondary" rounded text @click="closeDialog" class="relative z-10 hover:bg-slate-50 h-12 w-12" />
        </div>
        
        <!-- Dialog Body -->
        <div class="p-12 space-y-10 flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar">
          <!-- Identitas Kampanye -->
          <div class="space-y-8">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-lg">01</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">Campaign Identity & Traceability</h4>
            </div>
            
            <div class="pl-11 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reference Code <span class="text-red-500">*</span></label>
                  <input type="text" v-model="form.code" class="w-full h-14 border-none rounded-2xl px-5 text-sm font-mono font-black text-fuchsia-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-fuchsia-100 placeholder:italic" placeholder="System Generated" :disabled="!!editingId" />
                </div>
                <div class="space-y-2 md:col-span-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Campaign Title / Event Qualifier <span class="text-red-500">*</span></label>
                   <input type="text" v-model="form.name" class="w-full h-14 border-none rounded-2xl px-5 text-sm font-bold text-slate-800 bg-white shadow-inner outline-none focus:ring-2 focus:ring-fuchsia-100" placeholder="e.g. Ramadan Special 2026 - Meta Ads" :disabled="editingId ? !canUpdate : !canCreate" />
                </div>
              </div>
            </div>
          </div>

          <!-- Specifications -->
          <div class="space-y-8 pt-10 border-t border-slate-200">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-fuchsia-600 flex items-center justify-center text-white text-[10px] font-black shadow-lg">02</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-fuchsia-900">Placement & Resource Allocation</h4>
            </div>
            
            <div class="pl-11 space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-none lowercase italic">Advertising Channel Placement</label>
                   <input type="text" v-model="form.channel" class="w-full h-14 border-none rounded-2xl px-5 text-sm font-bold text-slate-800 bg-white shadow-inner outline-none focus:ring-2 focus:ring-fuchsia-100" placeholder="Meta, Google, Offline Event..." :disabled="editingId ? !canUpdate : !canCreate" />
                 </div>
                 <div class="space-y-2">
                   <label class="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Strategic Budget Allocation (IDR)</label>
                   <input type="number" v-model="form.budget" class="w-full h-14 border-none rounded-2xl px-5 text-sm font-black font-mono text-emerald-700 bg-emerald-50/50 shadow-inner outline-none focus:ring-2 focus:ring-emerald-100 text-right" placeholder="0.00" :disabled="editingId ? !canUpdate : !canCreate" />
                 </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-dashed border-slate-200">
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Activation Date</label>
                   <input type="date" v-model="form.startDate" class="w-full h-14 border-none rounded-2xl px-5 text-sm font-bold text-slate-800 bg-white shadow-inner outline-none focus:ring-2 focus:ring-fuchsia-100" :disabled="editingId ? !canUpdate : !canCreate" />
                </div>
                <div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Termination Date (Target)</label>
                   <input type="date" v-model="form.endDate" class="w-full h-14 border-none rounded-2xl px-5 text-sm font-bold text-slate-800 bg-white shadow-inner outline-none focus:ring-2 focus:ring-fuchsia-100" :disabled="editingId ? !canUpdate : !canCreate" />
                </div>
              </div>
            </div>
          </div>

          <!-- Documentation -->
          <div class="space-y-8 pt-10 border-t border-slate-200">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-[10px] font-black shadow-lg">03</div>
              <h4 class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Strategic Goals & Field Notes</h4>
            </div>
            
            <div class="pl-11">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 lowercase">Campaign Narrative & Performance Indicators</label>
              <textarea v-model="form.notes" rows="4" class="w-full border-none rounded-3xl p-6 text-sm font-medium text-slate-700 bg-white shadow-inner outline-none focus:ring-2 focus:ring-fuchsia-100 resize-none transition-all" placeholder="Describe the core objective, targeted CPA, and any logistical requirements..."></textarea>
            </div>
          </div>

          <div v-if="dialogError" class="ml-11 rounded-2xl bg-rose-50 px-6 py-4 text-xs text-rose-600 border border-rose-100 font-bold shadow-sm animate-scale-in">
             <i class="pi pi-exclamation-circle mr-2"></i> {{ dialogError }}
          </div>
        </div>

        <!-- Dialog Footer Actions -->
        <div class="p-10 border-t bg-white flex justify-end gap-4 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <Button label="Discard blueprint" severity="secondary" text :disabled="saving" @click="closeDialog" class="px-8 h-14 font-black text-[10px] uppercase tracking-widest" />
          <Button :label="editingId ? 'Execute Update' : 'Launch Campaign'" :loading="saving" :disabled="!form.name"
            @click="save" class="p-button-rounded h-14 px-12 bg-fuchsia-600 border-none text-white font-black text-[10px] uppercase shadow-2xl shadow-fuchsia-100 hover:scale-105 active:scale-95 transition-all" icon="pi pi-bolt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type Campaign = {
  id: string; code: string; name: string;
  status: 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'CANCELED';
  budget?: string | null; channel?: string | null; notes?: string | null;
  startDate?: string | null; endDate?: string | null;
};

const api = useApi();
const auth = useAuthStore();

const canRead = computed(() => auth.hasPermission('crm.campaign.read'));
const canCreate = computed(() => auth.hasPermission('crm.campaign.create'));
const canUpdate = computed(() => auth.hasPermission('crm.campaign.update'));

const q = ref('');
const statusFilter = ref('ALL');
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const campaigns = ref<Campaign[]>([]);

const filteredList = computed(() => {
  let res = campaigns.value;
  if (statusFilter.value === 'ACTIVE') res = res.filter(c => c.status === 'ACTIVE');
  if (statusFilter.value === 'PLANNED') res = res.filter(c => c.status === 'PLANNED');
  
  if (q.value) {
    const s = q.value.toLowerCase();
    res = res.filter(c => c.name.toLowerCase().includes(s) || c.code.toLowerCase().includes(s) || 
                          (c.channel||'').toLowerCase().includes(s) || (c.notes||'').toLowerCase().includes(s));
  }
  return res;
});

const countStatus = (st: string) => campaigns.value.filter(c => c.status === st).length;
const totalBudget = computed(() => campaigns.value.reduce((sum, c) => sum + Number(c.budget ?? 0), 0));

const statusSelection = reactive<Record<string, Campaign['status']>>({});

const dialogOpen = ref(false);
const saving = ref(false);
const dialogError = ref<string | null>(null);
const editingId = ref<string | null>(null);

const form = reactive({ code: '', name: '', channel: '', budget: '', notes: '', startDate: '', endDate: '' });

const fmtRp = (v: any) => {
   const val = Number(v);
   if (val === 0) return 'Rp 0';
   return `Rp ${val.toLocaleString('id-ID')}`;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
};

const getChannelIcon = (c?: string | null) => {
  if (!c) return 'pi-hashtag';
  const l = c.toLowerCase();
  if (l.includes('email')) return 'pi-envelope text-indigo-500';
  if (l.includes('event') || l.includes('offline')) return 'pi-map-marker text-rose-500';
  if (l.includes('social') || l.includes('ads') || l.includes('meta')) return 'pi-thumbs-up text-blue-500';
  if (l.includes('whatsapp') || l.includes('wa')) return 'pi-whatsapp text-emerald-500';
  return 'pi-megaphone text-amber-500';
};

const typeStyle = (st: string) => {
  if (st === 'PLANNED') return { backgroundColor: '#e0f2fe', color: '#0284c7', borderColor: '#7dd3fc', bg: '#0ea5e9' }; // sky 
  if (st === 'ACTIVE') return { backgroundColor: '#d1fae5', color: '#059669', borderColor: '#6ee7b7', bg: '#10b981' }; // emerald
  if (st === 'COMPLETED') return { backgroundColor: '#f1f5f9', color: '#475569', borderColor: '#cbd5e1', bg: '#64748b' }; // slate
  return { backgroundColor: '#fee2e2', color: '#e11d48', borderColor: '#fda4af', bg: '#f43f5e' }; // canceled rose
};

const showMsg = (refVar: any, msg: string) => { refVar.value = msg; setTimeout(()=> { refVar.value = null; }, 3000); };

const load = async () => {
  loading.value = true; error.value = null; success.value = null;
  try {
    if (!canRead.value) { campaigns.value = []; return; }
    const res = await api.get('/crm/campaigns');
    campaigns.value = res.data?.campaigns ?? res.campaigns ?? [];
    for (const c of campaigns.value) statusSelection[c.id] = c.status;
  } catch (e: any) { error.value = e?.response?.data?.message ?? 'Gagal load Master Campaign'; } 
  finally { loading.value = false; }
};

const openCreate = () => {
  editingId.value = null;
  form.code = `CAMP-${Math.floor(Math.random()*90000)+10000}`;
  form.name = ''; form.channel = ''; form.budget = ''; form.notes = '';
  form.startDate = new Date().toISOString().slice(0,10);
  
  const end = new Date(); end.setDate(end.getDate() + 30);
  form.endDate = end.toISOString().slice(0,10);
  
  dialogError.value = null; dialogOpen.value = true;
};

const openEdit = (c: Campaign) => {
  editingId.value = c.id; form.code = c.code; form.name = c.name;
  form.channel = c.channel ?? ''; form.budget = c.budget ?? ''; form.notes = c.notes ?? '';
  form.startDate = c.startDate ? c.startDate.slice(0,10) : '';
  form.endDate = c.endDate ? c.endDate.slice(0,10) : '';
  dialogError.value = null; dialogOpen.value = true;
};

const closeDialog = () => { if (!saving.value) dialogOpen.value = false; };

const save = async () => {
  saving.value = true; dialogError.value = null;
  try {
    const payload = {
      name: form.name, channel: form.channel || undefined, budget: form.budget || undefined,
      startDate: form.startDate ? new Date(form.startDate).toISOString() : undefined,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
      notes: form.notes || undefined,
    };
    if (editingId.value) {
      await api.patch(`/crm/campaigns/${editingId.value}`, payload);
      showMsg(success, `Campaign ${form.name} berhasil diperbarui.`);
    } else {
      await api.post('/crm/campaigns', { code: form.code, ...payload });
      showMsg(success, `Campaign ${form.name} ditambahkan!`);
    }
    dialogOpen.value = false;
    await load();
  } catch (e: any) { dialogError.value = e?.response?.data?.message ?? 'Gagal menyimpan rencana kampanye'; } 
  finally { saving.value = false; }
};

const updateStatus = async (c: Campaign) => {
  const oldVal = c.status;
  try {
    await api.patch(`/crm/campaigns/${c.id}`, { status: statusSelection[c.id] });
    showMsg(success, `Berhasil mengalihkan kampanye ke mode ${statusSelection[c.id]}.`);
    c.status = statusSelection[c.id];
  } catch (e: any) {
    statusSelection[c.id] = oldVal;
    showMsg(error, e?.response?.data?.message ?? 'Gagal memperbarui status');
  }
};

onMounted(load);
</script>

<style scoped>
.animate-fade-in-up { 
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(30px); } 
  to { opacity: 1; transform: translateY(0); } 
}

.animate-scale-in { 
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes scaleIn { 
  from { opacity: 0; transform: scale(0.95) translateY(10px); } 
  to { opacity: 1; transform: scale(1) translateY(0); } 
}

.custom-scrollbar::-webkit-scrollbar { 
  width: 4px; 
}
.custom-scrollbar::-webkit-scrollbar-track { 
  background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: #e2e8f0; 
  border-radius: 10px; 
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { 
  background: #cbd5e1; 
}

:deep(.p-inputtext) {
   border-color: #f1f5f9 !important;
   box-shadow: none !important;
   background-color: #f8fafc !important;
   border-radius: 16px !important;
}

:deep(.p-button-rounded) {
  border-radius: 9999px !important;
}
</style>
